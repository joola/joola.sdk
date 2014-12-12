/**
 *  joola
 *
 *  Copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 *
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 */

var
  joola = require('../index'),
  ce = require('cloneextend');

var dispatch = exports;
dispatch._id = 'dispatch';

dispatch.fetchMeta = function (callback) {
  var meta = require('../../../build/temp/meta.json');
  return callback(null, meta);
};

dispatch.buildstub = function (callback) {
  callback = callback || emptyfunc;

  var self = this;

  dispatch.fetchMeta(function (err, result) {
    joola.api.describe = {};
    Object.keys(result).forEach(function (endpoints) {
      dispatch[endpoints] = {};
      Object.keys(result[endpoints]).forEach(function (fn) {
        if (!joola.api.describe[endpoints])
          joola.api.describe[endpoints] = {};
        joola.api.describe[endpoints][fn] = ce.cloneextend(result[endpoints][fn]);

        var _fn = result[endpoints][fn];
        dispatch[endpoints][fn] = function () {
          var tokens = {
            _: null,
            __: null
          };
          var args = Array.prototype.slice.call(arguments);
          if (args && args.length > 0 && args[0] && (args[0]._ || args[0].__)) {
            tokens._ = args[0]._;
            tokens.__ = args[0].__;
            args.splice(0, 1);
          }

          callback = emptyfunc;
          if (typeof args[Object.keys(args).length - 1] === 'function') {
            callback = args[Object.keys(args).length - 1];
          }
          if (['verifyAPIToken', 'getByToken'].indexOf(fn) === -1) {
            if (!joola.connected)
              return callback(new Error('Joola not connected.'));
            if (!joola.USER) {
              console.log(fn);
              return callback(new Error('Joola not connected, invalid user.'));
            }
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
            _args[_fn.inputs[0]] = joola.USER.workspace;
          Object.keys(args).forEach(function (arg) {
            if (argCounter < _fn.inputs.length - shouldAppendWorkspace) {
              args[_fn.inputs[argCounter + shouldAppendWorkspace]] = args[arg];
              _args[_fn.inputs[argCounter + shouldAppendWorkspace]] = args[arg];
            }

            delete args[arg];
            argCounter++;
          });

          args = _args;
          joola.logger.debug('[' + endpoints + ':' + fn + '] called with: ' + JSON.stringify(args));

          var _callback = ce.clone(callback);//.clone();
          try {
            joola.api.fetch(tokens, _fn.name, args, function (err, result, headers) {
              if (result) {
                return _callback(err, result, headers);
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
        if (!joola[endpoints])
          joola[endpoints] = {};
        if (!joola[endpoints][fn])
          joola[endpoints][fn] = dispatch[endpoints][fn];
      });
    });

    //map aliases
    joola.insert = joola.beacon.insert;
    joola.fetch = joola.query.fetch;

    return callback(null);
  });
};

