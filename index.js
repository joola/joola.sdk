/**
 *  @title joola.io
 *  @overview the open-source data analytics framework
 *  @copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 **/


var
  async = require('async'),
  path = require('path'),
  EventEmitter2 = require('eventemitter2').EventEmitter2;

this._id = 'core';

//THE OBJECT
var joolaio = global.joolaio = exports;

//base options
joolaio.options = {
  token: null,
  host: null,
  logouturl: null,
  isBrowser: function isBrowser() {
    return typeof(window) !== 'undefined';
  }(),
  maxRequests: 1000,
  debug: {
    enabled: false,
    events: {
      enabled: false,
      trace: false
    },
    functions: {
      enabled: false
    }
  }
};

//libraries
joolaio.globals = require('./lib/common/globals');
//joolaio.config = require('./common/config');
joolaio.logger = require('./lib/common/logger');
joolaio.dispatch = require('./lib/common/dispatch');
joolaio.common = require('./lib/common/index');
joolaio.events = require('./lib/common/events');
joolaio.api = require('./lib/common/api');
joolaio.state = {};
//joolaio.stats = require('./common/stats');
joolaio.viz = require('./lib/viz/index');

joolaio.VERSION = require('./package.json').version;
joolaio._token = null;

Object.defineProperty(joolaio, 'TOKEN', {
  get: function () {
    return joolaio._token;
  },
  set: function (value) {
    joolaio._token = value;
    joolaio.events.emit('core.ready');
  }
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

require('./lib/common/globals');

//init procedure
joolaio.init = function (options, callback) {
  joolaio.options = joolaio.common.extend(joolaio.options, options);

  if (options.token) {
    joolaio._token = options.token;
  }
  else {
    if (typeof location !== 'undefined') {
      var qs = require('querystring');
      var parts = qs.parse(location.search.substring(1, location.search.length));
      if (parts.token)
        joolaio._token = parts.token;
    }
  }
  joolaio.events.emit('core.init.start');
  joolaio.logger.info('Starting joola.io client SDK, version ' + joolaio.VERSION);

  //jQuery bypass for non-browser execution
  if (!joolaio.options.isBrowser && typeof $ !== 'undefined') {
    $ = function () {
      return null;
    };
    $.prototype.fn = function () {
      return null;
    };
  }
  //else if (joolaio.options.isBrowser) {
  if (!joolaio.options.host && joolaio.options.isBrowser) {
    joolaio.options.host = location.protocol + '//' + location.host;
  }

  if (!joolaio.options.host)
    throw new Error('joola.io host not specified');

  var io = require('socket.io-browserify');
  joolaio.io = io;
  joolaio.io.socket = joolaio.io.connect(joolaio.options.host);
  //}
  //joolaio.config.init(function (err) {
  // if (err)
  //   return callback(err);

  joolaio.dispatch.buildstub(function (err) {
    if (err)
      return callback(err);

    if (joolaio.options.token) {
      joolaio.dispatch.users.getByToken(joolaio._token, function (err, user) {
        if (err)
          return callback(err);

        joolaio.USER = user;
        joolaio.TOKEN = joolaio._token;
        joolaio.events.emit('core.init.finish');
        if (callback)
          return callback(null, joolaio);

      });
    }
    else {
      joolaio.events.emit('core.init.finish');
      if (typeof callback === 'function')
        return callback(null, joolaio);
    }
  });
  //});

  //global function hook (for debug)
  if (joolaio.options.debug && joolaio.options.debug.functions && joolaio.options.debug.functions.enabled)
    [joolaio].forEach(function (obj) {
      joolaio.common.hookEvents(obj, function (event) {
      });
    });

  //global event catcher (for debug)
  if (joolaio.options.debug.enabled && joolaio.options.debug.events)
    joolaio.events.onAny(function () {
      if (joolaio.options.debug.events.enabled)
        joolaio.logger.debug('Event raised: ' + this.event);
      if (joolaio.options.debug.events.enabled && joolaio.options.debug.events.trace)
        console.trace();
    });
};
