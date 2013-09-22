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

var
  fs = require('fs'),
  logger = require('./lib/shared/logger'),
  http = require('http'),
  express = require('express');

var configFile = './config/joola.sdk.sample.js';
if (process.env.JOOLA_CONFIG_ANALYTICS && process.env.JOOLA_CONFIG_ANALYTICS !== '') {
  logger.info('Loading configuration file from [' + process.env.JOOLA_CONFIG_ANALYTICS + ']');
  configFile = process.env.JOOLA_CONFIG_ANALYTICS;
}
else {
  logger.warn('Using sample configuration file from [' + configFile + ']');
}

global.joola = {};
joola.config = {};
joola.config.general = require(configFile).configData.general;

var app = global.app = express();

// all environments
//app.set('port', joola.config.general.port || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session({expires: new Date(Date.now() + 1200000)}));

var winstonStream = {
  write: function (message, encoding) {
    logger.info(message);
  }
};
app.use(express.logger((global.test ? function (req, res) {
} : {stream: winstonStream})));

app.get('/', function (req, res) {
  res.render('index');
});
app.get('/joola*.js', function (req, res) {
  res.sendfile('./joola.js', {root: './bin'});
});

var status = '';
var httpServer, httpsServer;

var startHTTP = function (callback) {
  var result = {};
  try {
    var _httpServer = http.createServer(app).listen(joola.config.general.port || 42112,function (err) {
      if (err) {
        result.status = 'Failed: ' + ex.message;
        return callback(result);
      }
      status = 'Running';
      logger.info('Joola Analytics HTTP server listening on port ' + joola.config.general.port || 42112);
      result.status = 'Success';
      httpServer = _httpServer;
      return callback(result);
    }).on('error',function (ex) {
        result.status = 'Failed: ' + ex.message;
        return callback(result);
      }).on('close', function () {
        status = 'Stopped';
        logger.warn('Joola Analytics HTTP server listening on port ' + (joola.config.general.port || 42112).toString() + ' received a CLOSE command.');
      });
  }
  catch (ex) {
    result.status = 'Failed: ' + ex.message;
    return callback(result);
  }
  return null;
};

var startHTTPS = function (callback) {
  console.log('test1');
  var result = {};
  try {
    var secureOptions = {
      key: fs.readFileSync(joola.config.general.keyFile),
      cert: fs.readFileSync(joola.config.general.certFile)
    };
    var _httpsServer = https.createServer(secureOptions, app).listen(joola.config.general.securePort || 443,function (err) {
      if (err) {
        result.status = 'Failed: ' + ex.message;
        return callback(result);
      }
      logger.info('Joola Analytics HTTPS server listening on port ' + joola.config.general.port || 80);
      result.status = 'Success';
      httpsServer = _httpsServer;
      return callback(result);
    }).on('error',function (ex) {
        result.status = 'Failed: ' + ex.message;
        return callback(result);
      }).on('close', function () {
        logger.warn('Joola Analytics HTTPS server listening on port ' + (joola.config.general.port || 80).toString() + ' received a CLOSE command.');
      });
  }
  catch (ex) {
    result.status = 'Failed: ' + ex.message;
    return callback(result);
  }
  return null;
};

startHTTP(function () {

});
if (joola.config.general.secure)
  startHTTPS(function () {
  });

//Control Port
var cp = require('node-controlport');
var cp_endpoints = [];

cp_endpoints.push({
  endpoint: 'status',
  exec: function (callback) {
    callback({status: status, pid: process.pid});
  }
});

cp_endpoints.push({
    endpoint: 'start',
    exec: function (callback) {
      if (joola.config.general.secure) {
        startHTTP(function () {
          startHTTPS(callback);
        });
      }
      else {
        startHTTP(callback);
      }
    }
  }
);

cp_endpoints.push({
  endpoint: 'stop',
  exec: function (callback) {
    var result = {};
    result.status = 'Success';
    try {
      httpServer.close();
      if (joola.config.general.secure)
        httpsServer.close();

      process.exit(0);
    }
    catch (ex) {
      console.log(ex);
      result.status = 'Failed: ' + ex.message;
      return callback(result);
    }
    return callback(result);
  }
});

cp.start(42102, cp_endpoints);
