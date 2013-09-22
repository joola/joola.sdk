if (global.test) {
  var logger = {};
  logger.silly =
    logger.debug =
      logger.info =
        logger.error =
          logger.warn =
            logger.notice = function () {
            };
  module.exports = logger;
}
else {
  var
    utils = require('./utils'),
    winston = require('winston'),
    process = require('process'),
    path = require('path'),
    _ = require('underscore');

  var lastLog = new Date();

  var baseDir = path.join(__dirname, '/../../../../');
  var logDir = path.join(baseDir, '/log');

  var self = this;

  var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ level: 'debug', json: false, colorize: true, timestamp: function () {
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
      } })
    ],
    exitOnError: false
  });

  _.each(logger.transports, function (t) {
    t.logException = function (err) {
      logger.error(err);
    }
  });

  module.exports = logger;
}