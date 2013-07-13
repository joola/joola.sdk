var utils = require('./utils');
var winston = require('winston');
var storm = require('./storm');
var process = require('process');
//Ensure we can write to logs
/*var fs = require('fs');
 if (!fs.existsSync(global.basePath + '/logs')) {
 fs.mkdirSync(global.basePath + '/logs');
 }
 */

if (global.thisisatestrun == true) {
    console.log('Silencing console');
    var logger = {};
    logger.silly = function () {
    };
    logger.debug = function () {
    };
    logger.info = function () {
    };
    logger.error = function () {
    };
}

else {

    var api_key = 'zsFx_WJ_9fZeMiqvmqMaCiVvH_O5_bWypo7gby3tLTlrHl7a3OFbO60gNugo58jkkDEDIruMZmI=';
    var project_id = 'b6b875ece31111e297ae22000a1fd1d2';

    var log = new storm.Log(api_key, project_id);
    //log.send("Mar 8 2012 21:37:00 MST test log data", "syslog");

    var lastLog = new Date();
    var options = {};
    options.splunkHost = 'joo.la';
    options.splunkPort = 7001;

    /*
     var logger = {};
     logger.silly = function (message) {
     log.send(JSON.stringify(message));
     };
     logger.debug = function (message) {
     log.send(JSON.stringify(message));
     };
     logger.info = function (message) {
     log.send(JSON.stringify(message));
     };
     logger.error = function (message) {
     log.send(JSON.stringify(message));
     };
     logger.warn = function (message) {
     log.send(JSON.stringify(message));
     };
     */

    //winston.add(require('winston-splunk').splunk, options);
    var logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({ level: 'info', json: false, colorize: true, timestamp: function () {
                var tsStart = new Date();
                try {

                    if (joola)
                        tsStart = joola.timestamps.start.getTime();
                }
                catch (ex) {
                }
                var output = '[' + process.pid + '] ' + utils.formatDate(new Date(), 'yyyy-mm-dd hh:nn:ss', false) + ', ' + (new Date().getTime() - tsStart).toString() + ' ms, ' + (new Date().getTime() - lastLog.getTime()) + ' ms';
                lastLog = new Date();
                return output;
            } })//,
            //new winston.add(require('winston-splunk').splunk, options)
            //new winston.transports.File({ filename: global.basePath + '/logs/debug.log', json: false })
        ],
        exceptionHandlers: [
            new (winston.transports.Console)({ json: false, timestamp: true})
            //new winston.transports.File({ filename: global.basePath + '/logs/exceptions.log', json: false })
        ],
        exitOnError: false
    });

}
module.exports = logger;