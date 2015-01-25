/**
 *  @title joola/lib/sdk/common/api
 *  @copyright (c) Joola Smart Solutions, Ltd. <info@joo.la>
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>. Some rights reserved. See LICENSE, AUTHORS
 *
 *  Provides the SDK with a centralized management for consuming data from a joola
 *  node. All API calls are routed through this interface.
 **/

var
  joola = require('../index'),


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

function lengthInUtf8Bytes(str) {
  // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
  var m = encodeURIComponent(str).match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
}
/* END OF Add support for JSON parsing of query string */


api.requestCount = 0;
api.waitingRequests = [];

/**
 * Consumes an API endpoint based on options passed.
 * @param {string} endpoint the endpoint to consume
 * @param {object} objOptions options for the actual endpoint parameters
 * @param {function} callback called when the result arrives/error
 */
api.fetch = function (tokens, endpoint, objOptions, callback) {
  var self = api;
  if (!callback) {
    callback = objOptions;
    objOptions = endpoint;
    endpoint = tokens;
    tokens = {_: null, __: null};
  }

  if (api.requestCount < (joola.options.maxRequests || 100)) {
    api.requestCount++;
    try {
      var parts = require('url').parse(joola.options.host);
      var options = {
        tokens: tokens,
        host: parts.hostname,
        port: parts.port,
        secure: parts.protocol !== 'http:',
        path: endpoint,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      };

      self.getJSON(options, objOptions, function (err, result, headers) {
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

        return callback(err, result, headers);
      });
    }
    catch (ex) {
      console.log(ex);
      console.log(ex.stack);
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
  joola.logger.silly('[api] Fetching JSON from ' + options.host + ':' + options.port + options.path + '@' + (joola.APITOKEN || joola.TOKEN ));

  if (!joola.io || joola.options.ajax || options.ajax) {
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
              joola.logger.error('[api] Error: ' + options.host + ':' + options.port + options.path + '. Error: ' + ex.message);
              return callback(new Error('[api] Error: ' + options.host + ':' + options.port + options.path + '. Error: ' + ex.message));
            }
          }
          if (res.statusCode == 200) {
            return callback(null, obj);
          }
          else if (res.statusCode == 302) {
            return callback(new Error('Failed to execute request [' + res.statusCode + ']: Authentication Failed'));
          }
          else if (res.statusCode == 401) {
            //let's redirect to login
            if (joola.options.logouturl)
              location.href = joola.options.logouturl;

            return callback(new Error('Failed to execute request [' + res.statusCode + ']: ' + (obj && obj.message !== 'undefined' ? obj.message : 'Unauthorized')));
          }
          else {
            return callback(new Error('Failed to execute request [' + res.statusCode + ']: ' + (obj && obj.message ? obj.message : obj || 'n/a')));
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
      }, options.timeout || joola.options.timeout || 15000);

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

      if (message && !message.hasOwnProperty('realtime')) {
        joola.events.emit('rpc:done', 1);
        //joola.events.emit('bandwidth', lengthInUtf8Bytes(JSON.stringify(objOptions)));
        if (headers && headers['X-joola-Duration'])
          joola.events.emit('waittime', headers['X-joola-Duration']);
        if (headers && headers['X-joola-Duration-Fulfilled'] && headers['X-joola-Duration'])
          joola.events.emit('latency', headers['X-joola-Duration'] - headers['X-joola-Duration-Fulfilled']);
      }
      else if (!message) {
        joola.events.emit('rpc:done', 1);
        //joola.events.emit('bandwidth', lengthInUtf8Bytes(JSON.stringify(objOptions)));
        if (headers && headers['X-joola-Duration'])
          joola.events.emit('waittime', headers['X-joola-Duration']);
        if (headers && headers['X-joola-Duration-Fulfilled'] && headers['X-joola-Duration'])
          joola.events.emit('latency', headers['X-joola-Duration'] - headers['X-joola-Duration-Fulfilled']);
      }

      if (headers && headers.StatusCode && headers.StatusCode == 401) {
        //let's redirect to login
        if (joola.options.logouturl)
          location.href = joola.options.logouturl;

        return callback(new Error('Failed to execute request: ' + data.message.message));
      }
      else if (headers && headers.StatusCode && headers.StatusCode == 500)
        return callback(message.message ? message.message : 'unknown error');

      return callback(null, message, headers);
    };


    var routeID = options.path + '-' + joola.common.uuid();

    if (joola.TOKEN)
      objOptions._token = joola.TOKEN;
    if (!objOptions._token)
      objOptions.APIToken = joola.APITOKEN;

    if (options.tokens && (options.tokens._ || options.tokens.__)) {
      objOptions._token = null;
      objOptions.APIToken = null;
      if (options.tokens._)
        objOptions._token = options.tokens._;
      if (options.tokens.__)
        objOptions.APIToken = options.tokens.__;
    }

    objOptions._path = options.path;

    joola.io.socket.emit(routeID, objOptions);
    joola.events.emit('rpc:start', 1);
    joola.events.emit('bandwidth', lengthInUtf8Bytes(JSON.stringify(objOptions)));
    var shouldOn = objOptions && (objOptions.realtime || (objOptions.options && Array.isArray(objOptions.options) && objOptions.options.length > 0 && objOptions.options[0].realtime));
    if (objOptions && objOptions.options && objOptions.options.realtime)
      shouldOn = true;
    if (shouldOn) {
      joola.io.socket.on(routeID + ':done', processResponse);
    }
    else {
      joola.io.socket.once(routeID + ':done', processResponse);
    }
  }
};

joola.events.on('rpc:start', function () {
  if (!joola.usage)
    joola.usage = {currentCalls: 0};
  joola.usage.currentCalls++;
});

joola.events.on('rpc:done', function () {
  if (!joola.usage)
    joola.usage = {currentCalls: 0};
  joola.usage.currentCalls--;
});