/**
 *  @title joola.io
 *  @overview the open-source data analytics framework
 *  @copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 **/


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
    enabled: true,
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
joolaio.logger = require('./lib/common/logger');
joolaio.dispatch = require('./lib/common/dispatch');
joolaio.common = require('./lib/common/index');
joolaio.events = require('./lib/common/events');
joolaio.api = require('./lib/common/api');
joolaio.state = {};
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
  joolaio.options.isBrowser = function isBrowser() {
    return typeof(window) !== 'undefined';
  }();

  function browser3rd(callback) {
    var expected = 0;

    function done() {
      expected--;
      if (expected <= 0)
        return callback(null);
    }

    if (joolaio.options.isBrowser) {
      if (typeof (jQuery) === 'undefined') {
        var script = document.createElement('script');
        expected++;
        script.onload = function () {
          //jQuery.noConflict(true);

          script = document.createElement('script');
          expected++;
          script.onload = function () {

            var script = document.createElement('script');
            expected++;
            script.onload = function () {
              done();
            };
            script.src = 'http://code.highcharts.com/highcharts.js';
            document.head.appendChild(script);
            
            done();
          };
          script.src = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/jquery-ui.min.js';
          document.head.appendChild(script);

          done();
        };
        script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js';
        document.head.appendChild(script);
      }
      else if (typeof (Highcharts) === 'undefined') {
        script = document.createElement('script');
        expected++;
        script.onload = function () {
          done();
        };
        script.src = 'http://code.highcharts.com/highcharts.js';
        document.head.appendChild(script);
      }
      var elems = document.getElementsByTagName('script');
      var cssHost = '';
      Object.keys(elems).forEach(function (key) {
        var scr = elems[key];
        if (scr.src) {
          if (scr.src.indexOf('joola.io.js') > -1) {
            cssHost = scr.src.replace('/joola.io.js', '');
          }
        }
      });


      //css
      var css = document.createElement('link');
      expected++;
      css.onload = function () {
        //jQuery.noConflict(true);
        done();
      };
      css.rel = 'stylesheet';
      css.href = cssHost + '/joola.io.css';
      document.head.appendChild(css);

      if (expected === 0)
        return done();
    }
    else {
      return done();
    }
  }

  browser3rd(function () {
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
      else if (joolaio.options.APIToken) {
        joolaio.dispatch.users.verifyAPIToken(joolaio.options.APIToken, function (err, user) {
          if (err)
            return callback(err);

          joolaio.USER = user;

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
  });
};
