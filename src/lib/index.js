/**
 *  @title joola
 *  @overview the open-source data analytics framework
 *  @copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 **/


//THE OBJECT
var joola = exports;

//try injecting global
if (!global.joola) {
  global.joola = joola;
}

//base options
joola.options = {
  token: null,
  host: null,
  skipcss: false,
  cssHost: '',
  APIToken: null,
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
  },
  timezoneOffset: null

};
joola.connected = false;
//libraries
joola.globals = require('./common/globals');
joola.logger = require('./common/logger');
joola.dispatch = require('./common/dispatch');
joola.common = require('./common/index');
joola.events = require('./common/events');
joola.events.setMaxListeners(1000);
joola.on = function (event, cb) {
  joola.events.on(event, cb);
};
joola.emit = function (event, message) {
  joola.events.emit(event, message);
};
joola.api = require('./common/api');
joola.state = {};
joola.viz = require('./viz/index');

joola.VERSION = require('./../../package.json').version;
joola._token = null;
joola._apitoken = null;

Object.defineProperty(joola, 'TOKEN', {
  get: function () {
    return joola._token;
  },
  set: function (value) {
    joola._token = value;
    joola.events.emit('core.init.finish');
    joola.events.emit('ready');
  }
});

Object.defineProperty(joola, 'APITOKEN', {
  get: function () {
    return joola._apitoken;
  },
  set: function (value) {
    joola._apitoken = value;
    joola.USER = null;
    joola._token = null;

    joola.dispatch.users.verifyAPIToken(joola.APITOKEN, function (err, user) {
      joola.USER = user;
      //joola.TOKEN = user.token._;
    });
  }
});

require('./common/globals');

//parse the querystring if browser for default options
function isBrowser() {
  return typeof(window) !== 'undefined';
}

if (isBrowser()) {
  var elems = document.getElementsByTagName('script');

  Object.keys(elems).forEach(function (key) {
    var scr = elems[key];
    if (scr.src) {
      if (scr.src.indexOf('joola.js') > -1 || scr.src.indexOf('joola.min.js') > -1) {
        var parts = require('url').parse(scr.src);
        var protocol = parts.protocol;
        var host = parts.host;
        var port = 443;
        if (protocol !== 'https:')
          port = 80;
        joola.options.host = parts.protocol + '//' + host + ':' + port;
        if (parts.query) {
          var qs = require('querystring').parse(parts.query);
          if (qs && qs.APIToken) {
            joola.options.APIToken = qs.APIToken;
          }
          if (qs && qs.token) {
            joola.options.token = qs.token;
          }
          if (qs && qs.host) {
            parts = require('url').parse(qs.host);
            protocol = parts.protocol;
            host = parts.host;
            port = 443;
            if (protocol !== 'https:')
              port = 80;
            joola.options.host = parts.protocol + '//' + host + ':' + port;
          }
        }
      }
    }
  });
}

joola.dispatch.buildstub();

//init procedure
joola.init = function (options, callback) {
  callback = callback || emptyfunc;
  joola.options = joola.common._mixin(joola.options, options);
  joola.options.isBrowser = isBrowser();

  function browser3rd(callback) {
    var expected = 0;

    function done(which) {
      expected--;
      if (expected <= 0) {
        return callback(null);
      }
    }

    var script;
    if (joola.options.isBrowser) {
      if (typeof (jQuery) === 'undefined') {
        script = document.createElement('script');
        expected++;

        script.onload = function () {
          //jQuery.noConflict(true);

          script = document.createElement('script');
          expected++;
          script.onload = function () {

            var script = document.createElement('script');
            expected++;
            script.onload = function () {
              var script = document.createElement('script');
              expected++;
              script.onload = function () {
                done('highcharts-nodata');
              };
              script.src = (location.protocol === 'file:' ? 'http://' : '') + '//code.highcharts.com/modules/no-data-to-display.js';
              document.head.appendChild(script);

              done('highcharts');
            };
            script.src = (location.protocol === 'file:' ? 'http://' : '') + '//code.highcharts.com/highcharts.js';
            document.head.appendChild(script);


            done('jquery-ui');
          };
          script.src = (location.protocol === 'file:' ? 'http://' : '') + '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/jquery-ui.min.js';
          document.head.appendChild(script);

          done('jquery');
        };
        script.src = (location.protocol === 'file:' ? 'http://' : '') + '//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js';
        document.head.appendChild(script);
      }
      else if (typeof (Highcharts) === 'undefined') {
        script = document.createElement('script');
        expected++;
        script.onload = function () {
          var script = document.createElement('script');
          expected++;
          script.onload = function () {
            done('highcharts-nodata-2');
          };
          script.src = (location.protocol === 'file:' ? 'http://' : '') + '//code.highcharts.com/modules/no-data-to-display.js';
          document.head.appendChild(script);

          done('highcharts-2');
        };
        script.src = (location.protocol === 'file:' ? 'http://' : '') + '//code.highcharts.com/highcharts.js';
        document.head.appendChild(script);
      }

      if (typeof (Tablesort) === 'undefined') {
        script = document.createElement('script');
        expected++;
        script.onload = function () {
          done('tablesort');
        };
        script.src = (location.protocol === 'file:' ? 'http://' : '') + '//cdn.rawgit.com/tristen/tablesort/gh-pages/tablesort.min.js';
        document.head.appendChild(script);
      }

      //css
      if (!joola.options.skipcss) {
        var css = document.createElement('link');
        expected++;
        css.onload = function () {
          //jQuery.noConflict(true);
          //done('css');
        };
        css.rel = 'stylesheet';
        css.href = joola.options.host + '/joola.min.css';
        document.head.appendChild(css);
        done('css');
      }
      if (expected === 0)
        return done('none');
    }
    else {
      return done('not browser');
    }
  }
  if (options.token) {
    joola._token = options.token;
  }
  else {
    if (typeof location !== 'undefined') {
      var qs = require('querystring');
      var parts = qs.parse(location.search.substring(1, location.search.length));
      if (parts.token)
        joola._token = parts.token;
    }
  }
  joola.events.emit('core.init.start');
  joola.logger.info('Starting joola client SDK, version ' + joola.VERSION);

  //else if (joola.options.isBrowser) {
  if (!joola.options.host && joola.options.isBrowser) {
    joola.options.host = location.protocol + '//' + location.host;
  }

  if (!joola.options.host)
    throw new Error('joola host not specified');

  //var io = require('socket.io-browserify');
  var io = require('socket.io-client');
  joola.io = io;
  joola.io.socket = joola.io.connect(joola.options.host);

  joola.io.socket.on('SIG_HUP', function () {
    console.log('SIG_HUP');
  });

  //}
  //joola.config.init(function (err) {
  // if (err)
  //   return callback(err);
  //joola.dispatch.buildstub(function (err) {
  //  if (err)
  //    return callback(err);
  browser3rd(function () {
  });
  if (joola.options.token) {
    joola.dispatch.users.getByToken(joola._token, function (err, user) {
      if (err)
        return callback(err);

      joola.USER = user;
      joola.TOKEN = joola._token;
      joola.events.emit('core.init.finish');
      if (callback)
        return callback(null, joola);

    });
  }
  else if (joola.options.APIToken) {
    joola._apitoken = joola.options.APIToken;
    joola.USER = null;
    joola._token = null;

    joola.dispatch.users.verifyAPIToken(joola._apitoken, function (err, user) {
      if (err)
        return callback(err);
      joola.USER = user;
      joola.events.emit('core.init.finish');
      joola.events.emit('ready');
      if (typeof callback === 'function')
        return callback(null, joola);
    });
  }
  else {
    joola.events.emit('core.init.finish');
    joola.events.emit('ready');
    if (typeof callback === 'function')
      return callback(null, joola);
  }
  //});
  //});

  //global function hook (for debug)
  if (joola.options.debug && joola.options.debug.functions && joola.options.debug.functions.enabled)
    [joola].forEach(function (obj) {
      joola.common.hookEvents(obj, function (event) {
      });
    });

  //global event catcher (for debug)
  if (joola.options.debug.enabled && joola.options.debug.events)
    joola.events.onAny(function () {
      if (joola.options.debug.events.enabled)
        joola.logger.debug('Event raised: ' + this.event);
      if (joola.options.debug.events.enabled && joola.options.debug.events.trace)
        console.trace();
    });
  //});
};

if (joola.options.APIToken || joola.options.token) {
  joola.init({});
}


joola.set = function (key, value, callback) {
  joola.options[key] = value;
  if (key === 'APIToken') {
    joola._apitoken = joola.options.APIToken;
    joola.USER = null;
    joola._token = null;

    joola.dispatch.users.verifyAPIToken(joola._apitoken, function (err, user) {
      if (err)
        return callback(err);
      if (!user)
        return callback(new Error('Failed to verify API Token'));

      joola.USER = user;
      if (typeof callback === 'function') {
        return callback(null);
      }
    });
  }
  else if (key === 'token') {
    joola._token = joola.options._token;
    joola.USER = null;
    joola.APIToken = null;

    joola.dispatch.users.getByToken(joola._token, function (err, user) {
      joola.USER = user;
      joola.TOKEN = user.token._;
      if (typeof callback === 'function')
        return callback(null);
    });
  }
};

joola.get = function (key) {
  return joola.options[key];
};

joola.colors = ['#058DC7', '#50B432', '#ED7E17', '#AF49C5', '#EDEF00', '#8080FF', '#A0A424', '#E3071C', '#6AF9C4', '#B2DEFF', '#64E572', '#CCCCCC' ];
joola.offcolors = ['#AADFF3', '#C9E7BE', '#F2D5BD', '#E1C9E8', '#F6F3B1', '#DADBFB', '#E7E6B4', '#F4B3BC', '#AADFF3', '#F2D5BD', '#C9E7BE', '#EEEEEE'];

var start = new Date().getTime();
joola.on('ready', function () {
  joola.connected = true;
  var end = new Date().getTime();
  console.log('loaded in ', end - start, 'ms.');
});
