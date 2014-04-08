/**
 *  joola.io
 *
 *  Copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 *
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 */

var ce = require('cloneextend');

var dispatch = exports;
dispatch._id = 'dispatch';

dispatch.buildstub = function (callback) {
  callback = callback || emptyfunc;

  var self = this;

  try {
    var parts = require('url').parse(joolaio.options.host);
    var port = parts.port;
    if (!port)
      port = parts.protocol === 'http:' ? 80 : 443;
    var options = {
      host: parts.hostname,
      port: port,
      secure: parts.protocol !== 'http:',
      path: '/api.js',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      ajax: true
    };

    joolaio.api.getJSON(options, {}, function (err, result) {
      if (err)
        return callback(err);

      joolaio.api.describe = {};
      Object.keys(result).forEach(function (endpoints) {
        dispatch[endpoints] = {};
        Object.keys(result[endpoints]).forEach(function (fn) {
          if (!joolaio.api.describe[endpoints])
            joolaio.api.describe[endpoints] = {};
          joolaio.api.describe[endpoints][fn] = ce.cloneextend(result[endpoints][fn]);

          var _fn = result[endpoints][fn];
          dispatch[endpoints][fn] = function () {
            var args = arguments;
            callback = emptyfunc;
            if (typeof args[Object.keys(args).length - 1] === 'function') {
              callback = args[Object.keys(args).length - 1];
            }
            var argCounter = 0;
            var _args = {};
            if (_fn.inputs.required)
              _fn.inputs = _fn.inputs.required.concat(_fn.inputs.optional);

            var shouldAppendWorkspace = 0;

            //if ((args.length - 1 == _fn.inputs.length - 1 || (args.length - 1 == _fn.inputs.length - 2 && _fn.inputs[_fn.inputs.length - 1] == 'options')) && _fn.inputs[0] && (_fn.inputs[0] === 'workspace')) {
            if (_fn.inputs[0] === 'workspace' && args.length - 1 < _fn.inputs.length) {
              shouldAppendWorkspace = 1;
            }
            if (shouldAppendWorkspace > 0)
              _args[_fn.inputs[0]] = joolaio.USER.workspace;
            Object.keys(args).forEach(function (arg) {
              if (argCounter < _fn.inputs.length - shouldAppendWorkspace) {
                args[_fn.inputs[argCounter + shouldAppendWorkspace]] = args[arg];
                _args[_fn.inputs[argCounter + shouldAppendWorkspace]] = args[arg];
              }

              delete args[arg];
              argCounter++;
            });

            args = _args;
            joolaio.logger.debug('[' + endpoints + ':' + fn + '] called with: ' + JSON.stringify(args));

            var _callback = ce.clone(callback);//.clone();
            try {
              joolaio.api.fetch(_fn.name, args, function (err, result) {
                if (result && result.result) {
                  return _callback(err, result.result);
                }
                else {
                  return _callback(err);
                }
              });
            }
            catch (ex) {
              return _callback(ex);
            }
          };
          if (!joolaio[endpoints])
            joolaio[endpoints] = {};
          if (!joolaio[endpoints][fn])
            joolaio[endpoints][fn] = dispatch[endpoints][fn];
        });
      });
      return callback(null);
    });
  }
  catch (ex) {
    return callback(ex);
  }
};

