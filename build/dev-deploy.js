var
    logger = require('./lib/shared/logger'),
    path = require('path'),
    ncp = require('ncp');

logger.info('Starting build development environment deploy script...');

var basePath = path.join(__dirname + '/..');
var targetDirectory = path.join(basePath + '/../joola.io.analytics/node_modules/joola.io.sdk', '/bin/joola.js');
var serverDirectory = path.join(basePath + '/../joola.io/node_modules/joola.io.sdk', '/bin/joola.js');

var sourceFile = path.join(basePath + '/bin/joola.js');

logger.info('Base path: ' + basePath);
logger.info('Target path: ' + targetDirectory);
logger.info('Server path: ' + serverDirectory);

logger.info('Running compiler...');
var compilerBin = path.join(basePath, './build/compile.js')
var spawn = require('child_process').spawn;
var prc = spawn('node', [compilerBin], {stdio: 'inherit', cwd: basePath});

prc.on('close', function (code) {
    logger.info('Compiler finished with code [' + code + ']');
    logger.info('Copying files...');

    ncp.limit = 10;
    var options = {
        filter: function (filename) {
            return filename.indexOf('git') == -1 && filename.indexOf('.idea') == -1;
        }
    };
    var calls = [];

    var call = function (callback) {
        ncp(sourceFile, targetDirectory, options, function (err) {
            if (err)
                logger.error('Failed: ' + err);
            else
                logger.info('...Files copied');
            callback();
        });
    };
    calls.push(call);
    call = function (callback) {
        ncp(sourceFile, serverDirectory, options, function (err) {
            if (err)
                logger.error('Failed: ' + err);
            else
                logger.info('...Files copied');
        });
        callback();
    };
    calls.push(call);
    fork(calls, function () {
        logger.info('Build script finished');
    })
});


//ncp.limit = 10;
var options = {
  filter: function (filename) {
    return filename.indexOf('git') == -1 && filename.indexOf('.idea') == -1 && filename.indexOf('node_modules');
  }
};

var targetDirectory = path.join(basePath + '/../joola.io.analytics/node_modules/joola.io.sdk/');
ncp(basePath, targetDirectory, options, function (err) {
  if (err)
    logger.error('Failed: ' + err);
  else
    logger.info('...Files copied');
  logger.info('Build script finished');
});

var targetDirectory = path.join(basePath + '/../joola.io/node_modules/joola.io.sdk');
ncp(basePath, targetDirectory, options, function (err) {
  if (err)
    logger.error('Failed: ' + err);
  else
    logger.info('...Files copied');
  logger.info('Build script finished');
});

