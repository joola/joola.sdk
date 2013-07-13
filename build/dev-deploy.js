var
    logger = require('./lib/shared/logger'),
    path = require('path'),
    ncp = require('ncp');

logger.info('Starting build development environment deploy script...');

var basePath = path.join(__dirname + '/..');
var targetDirectory = path.join(basePath + '/../joola-analytics/node_modules/joola-sdk');

logger.info('Base path: ' + basePath);
logger.info('Target path: ' + targetDirectory);

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

    ncp(basePath, targetDirectory, options, function (err) {
        if (err)
            logger.error('Failed: ' + err);
        else
            logger.info('...Files copied');
    });

    logger.info('Build script finished');
});