/**
 *  @title joola
 *  @overview the open-source data analytics framework
 *  @copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 **/

var joola = require('../index');

var logger = exports;
logger._id = 'logger';

logger._log = function (level, message, callback) {
  var iLevel = 0;
  switch (level) {
    case 'debug':
      iLevel = 0;
      break;
    case 'info':
      iLevel = 1;
      break;
    case 'warn':
      iLevel = 2;
      break;
    case 'error':
      iLevel = 3;
      break;
    case 'silly':
      iLevel = 0;
      level = 'debug';
      break;
    case 'trace':
      iLevel = 0;
      level = 'debug';
      break;
    default:
      break;
  }

  var logLevel = 0;
  switch (joola.options.debug.level) {
    case 'debug':
      logLevel = 0;
      break;
    case 'info':
      logLevel = 1;
      break;
    case 'warn':
      logLevel = 2;
      break;
    case 'error':
      logLevel = 3;
      break;
    case 'silly':
      logLevel = 0;
      level = 'debug';
      break;
    case 'trace':
      logLevel = 0;
      level = 'debug';
      break;
    default:
      break;
  }

  if (!joola.options.debug.enabled)
    return;
  if (iLevel < logLevel)
    return;

  if (typeof message === 'object')
    message = '[' + new Date().format('hh:nn:ss.fff') + '] ' + JSON.stringify(message);
  else
    message = '[' + new Date().format('hh:nn:ss.fff') + '] ' + message;

  if (joola.options.isBrowser && console.debug) {
    if (['silly', 'debug'].indexOf(level) == -1)
      console[level](message);
    else if (joola.options.debug.enabled && ['silly', 'debug'].indexOf(level) > -1)
      console[level](message);
  }
  else
    console.log(message);

  if (callback)
    return callback(null);
};

logger.trace = function (message, callback) {
  return this._log('trace', message, callback);
};

logger.silly = function (message, callback) {
  return this._log('silly', message, callback);
};

logger.info = function (message, callback) {
  return this._log('info', message, callback);
};

logger.debug = function (message, callback) {
  return this._log('debug', message, callback);
};

logger.warn = function (message, callback) {
  return this._log('warn', message, callback);
};

logger.error = function (message, callback) {
  return this._log('error', message, callback);
};

