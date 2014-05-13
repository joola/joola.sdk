/**
 *  @title joola.io/lib/sdk/common/api
 *  @copyright (c) Joola Smart Solutions, Ltd. <info@joo.la>
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>. Some rights reserved. See LICENSE, AUTHORS
 *
 *  Provides the SDK with a centralized management for consuming data from a joola.io
 *  node. All API calls are routed through this interface.
 **/

var
  http = require('http'),
  https = require('https'),
  querystring = require('querystring');

var api = exports;
api._id = 'api';

/* Add support for JSON parsing of query string */
querystring.escape = function (str) {
  return encodeURIComponent(str);
};

var stringifyPrimitive = function (v) {
  switch (typeof v) {
    case 'string':
      return v;
    case 'boolean':
      return v ? 'true' : 'false';
    case 'number':
      return isFinite(v) ? v : '';
    case 'object':
      return JSON.stringify(v);
    /* istanbul ignore next */
    default:
      return '';
  }
};

querystring.stringify = querystring.encode = function (obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  obj = (obj === null) ? undefined : obj;

  try {
    switch (typeof obj) {
      case 'object':
        return Object.keys(obj).map(function (k) {
          if (Array.isArray(obj[k])) {
            return obj[k].map(function (v) {
              return querystring.escape(stringifyPrimitive(k)) +
                eq +
                querystring.escape(stringifyPrimitive(v));
            }).join(sep);
          } else {
            var result = querystring.escape(stringifyPrimitive(k)) +
              eq +
              querystring.escape(stringifyPrimitive(obj[k]));
            return result;
          }
        }).join(sep);

      default:
        if (!name) return '';
        return querystring.escape(stringifyPrimitive(name)) + eq +
          querystring.escape(stringifyPrimitive(obj));
    }
  }
  catch (ex) {
    /* istanbul ignore next */
    console.log(ex);
  }
};
/* END OF Add support for JSON parsing of query string */


api.requestCount = 0;
api.waitingRequests = [];

/**
 * Consumes an API endpoint based on options passed.
 * @param {string} endpoint the endpoint to consume
 * @param {object} objOptions options for the actual endpoint parameters
 * @param {function} callback called when the result arrives/error
 */
api.fetch = function (endpoint, objOptions, callback) {
  var self = api;

  if (api.requestCount < (joolaio.options.maxRequests || 100)) {
    api.requestCount++;
    try {
      var parts = require('url').parse(joolaio.options.host);
      var options = {
        host: parts.hostname,
        port: parts.port,
        secure: parts.protocol !== 'http:',
        path: endpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      self.getJSON(options, objOptions, function (err, result) {
        if (result) {
          if (!result.realtime)
            api.requestCount--;
        }
        else
          api.requestCount--;

        if (self.requestCount < 0)
          self.requestCount = 0;

        if (api.waitingRequests.length)
          api.fetch.apply(null, api.waitingRequests.shift());

        return callback(err, result);
      });
    }
    catch (ex) {
      console.log('ex', ex);
      return callback(ex);
    }
  }
  else {
    /* istanbul ignore next */
    api.waitingRequests.push(arguments);
  }
};

/**
 * The actual worker for getting a json object from the API service based on the options passed.
 * @param {object} options options relating to the connection and endpoint
 * @param {object} objOptions options for the actual endpoint parameters
 * @param {function} callback called when the result arrives/error
 */
api.getJSON = function (options, objOptions, callback) {
  var prot = options.secure ? https : http;
  joolaio.logger.silly('[api] Fetching JSON from ' + options.host + ':' + options.port + options.path + '@' + (joolaio.APITOKEN || joolaio.TOKEN));

  if (!joolaio.io || joolaio.options.ajax || options.ajax) {
    var qs = querystring.stringify(objOptions);
    options.path += '?' + qs;
    var timerID, aborted;
    try {
      var req = prot.request(options, function (res) {
        var output = '';
        res.on('data', function (chunk) {
          output += chunk;
        });

        res.on('end', function () {
          clearTimeout(timerID);
          if (aborted)
            return callback(new Error('[api] Timeout while fetching: ' + options.host + ':' + options.port + options.path));

          var obj;

          if (typeof output === 'object') {

          }
          else if (res.statusCode == 200) {
            try {
              obj = JSON.parse(output);
            }
            catch (ex) {
              joolaio.logger.error('[api] Error: ' + options.host + ':' + options.port + options.path + '. Error: ' + ex.message);
              return callback(new Error('[api] Error: ' + options.host + ':' + options.port + options.path + '. Error: ' + ex.message));
            }
          }
          if (res.statusCode == 200) {
            return callback(null, obj);
          }
          else if (res.statusCode == 302) {
            return callback(new Error('Failed to execute request: Authentication Failed'));
          }
          else if (res.statusCode == 401) {
            //let's redirect to login
            if (joolaio.options.logouturl)
              location.href = joolaio.options.logouturl;

            return callback(new Error('Failed to execute request: ' + (obj && obj.message !== 'undefined' ? obj.message : 'Unauthorized')));
          }
          else {
            return callback(new Error('Failed to execute request: ' + (obj && obj.message ? obj.message : obj || 'n/a')));
          }
        });
      });

      timerID = setTimeout(function () {
        aborted = true;
        //Aborting the xhr of http(s)-browserify
        if (req.xhr)
          req.xhr.abort();
        else
          req.abort();
      }, options.timeout || joolaio.options.timeout || 15000);

      req.on('error', function (err) {
        return callback(err);
      });

      //req.write(qs);
      req.end();
    }
    catch (ex) {
      console.log(ex);
    }
  }
  else {
    options.path = options.path.substring(1);

    var processResponse = function (data) {
      var headers = data.headers;
      var message = data.message;

      if (headers && headers.StatusCode && headers.StatusCode == 401) {
        //let's redirect to login
        if (joolaio.options.logouturl)
          location.href = joolaio.options.logouturl;

        return callback(new Error('Failed to execute request: ' + data.message.message));
      }
      else if (headers && headers.StatusCode && headers.StatusCode == 500)
        return callback(message.message ? message.message : 'unknown error');

      return callback(null, message);
    };


    var routeID = options.path + '-' + joolaio.common.uuid();

    if (joolaio.TOKEN)
      objOptions._token = joolaio.TOKEN;
    if (!objOptions._token)
      objOptions.APIToken = joolaio.APITOKEN;
    objOptions._path = options.path;
    joolaio.io.socket.emit(routeID, objOptions);

    if (objOptions && (objOptions.realtime || (objOptions.options && objOptions.options.realtime)))
      joolaio.io.socket.on(routeID + ':done', processResponse);
    else
      joolaio.io.socket.once(routeID + ':done', processResponse);
  }
};
