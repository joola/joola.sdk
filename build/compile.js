var
    ClosureCompiler = require("closurecompiler"),
    fs = require('fs'),
    path = require('path'),
    logger = require('./lib/shared/logger');

var libDir = path.join(__dirname, '../lib');
var fileList = [];

logger.info('Starting compile SDK script...');
logger.info('Working dir: ' + libDir);

fileList.push(libDir + '/3rd/highcharts.3.0.2.js');
fileList.push(libDir + '/3rd/jquery.ba-hashchange.min.js');
fileList.push(libDir + '/3rd/jquery.ba-resize.js');
fileList.push(libDir + '/3rd/jquery.mousewheel.js');
fileList.push(libDir + '/3rd/underscore-min.js');
fileList.push(libDir + '/3rd/xregexp-min.js');
fileList.push(libDir + '/3rd/bootstrap-tooltip.js');
fileList.push(libDir + '/3rd/bootstrap-popover.js');
fileList.push(libDir + '/3rd/bootstrapx-clickover.js');


fileList.push(libDir + '/jarvis.js');
fileList.push(libDir + '/jarvis.deps.js');

fileList.push(libDir + '/jarvis.string.js');
fileList.push(libDir + '/jarvis.date.js');
fileList.push(libDir + '/jarvis.array.js');
fileList.push(libDir + '/jarvis.debug.js');
fileList.push(libDir + '/jarvis.dataaccess.js');
fileList.push(libDir + '/jarvis.Console.js');

fileList.push(libDir + '/jarvis.tests.js');
fileList.push(libDir + '/jarvis.tests.Base.js');

fileList.push(libDir + '/jarvis.objects.js');
fileList.push(libDir + '/jarvis.objects.Auth.js');
fileList.push(libDir + '/jarvis.objects.Auth.Roles.js');
fileList.push(libDir + '/jarvis.objects.Auth.Organizations.js');
fileList.push(libDir + '/jarvis.objects.Auth.Users.js');
fileList.push(libDir + '/jarvis.objects.Auth.Permissions.js');
fileList.push(libDir + '/jarvis.objects.APITokens.js');
fileList.push(libDir + '/jarvis.objects.UserTokens.js');
fileList.push(libDir + '/jarvis.objects.WebOrigins.js');
fileList.push(libDir + '/jarvis.objects.Config.js');
fileList.push(libDir + '/jarvis.objects.Cache.js');
fileList.push(libDir + '/jarvis.objects.Query.js');
fileList.push(libDir + '/jarvis.objects.State.js');
fileList.push(libDir + '/jarvis.objects.Realtime.js');
fileList.push(libDir + '/jarvis.objects.DataSources.js');
fileList.push(libDir + '/jarvis.objects.DataTables.js');
fileList.push(libDir + '/jarvis.objects.Dimensions.js');
fileList.push(libDir + '/jarvis.objects.Metrics.js');
fileList.push(libDir + '/jarvis.objects.Dashboards.js');
fileList.push(libDir + '/jarvis.objects.RealtimePanels.js');
fileList.push(libDir + '/jarvis.objects.Reports.js');
fileList.push(libDir + '/jarvis.objects.Update.js');

fileList.push(libDir + '/jarvis.visualisation.notice.js');
fileList.push(libDir + '/jarvis.visualisation.notice.Session.js');
fileList.push(libDir + '/jarvis.visualisation.notice.Loading.js');

fileList.push(libDir + '/jarvis.visualisation.picker.js');
fileList.push(libDir + '/jarvis.visualisation.picker.DateBox.js');
fileList.push(libDir + '/jarvis.visualisation.picker.Metrics.js');
fileList.push(libDir + '/jarvis.visualisation.picker.Dimensions.js');
fileList.push(libDir + '/jarvis.visualisation.container.js');
fileList.push(libDir + '/jarvis.visualisation.container.Metrics.js');
fileList.push(libDir + '/jarvis.visualisation.container.Dimensions.js');
fileList.push(libDir + '/jarvis.visualisation.container.Filter.js');

fileList.push(libDir + '/jarvis.visualisation.realtime.js');
fileList.push(libDir + '/jarvis.visualisation.realtime.Status.js');
fileList.push(libDir + '/jarvis.visualisation.realtime.StartStop.js');
fileList.push(libDir + '/jarvis.visualisation.realtime.DateBox.js');
fileList.push(libDir + '/jarvis.visualisation.realtime.Timeline.js');
fileList.push(libDir + '/jarvis.visualisation.realtime.MetricBox.js');
fileList.push(libDir + '/jarvis.visualisation.realtime.Table.js');
fileList.push(libDir + '/jarvis.visualisation.realtime.Geo.js');
fileList.push(libDir + '/jarvis.visualisation.realtime.Panel.js');

fileList.push(libDir + '/jarvis.visualisation.dashboard.js');
fileList.push(libDir + '/jarvis.visualisation.dashboard.Timeline.js');
fileList.push(libDir + '/jarvis.visualisation.dashboard.MetricBox.js');
fileList.push(libDir + '/jarvis.visualisation.dashboard.Table.js');
fileList.push(libDir + '/jarvis.visualisation.dashboard.Pie.js');
fileList.push(libDir + '/jarvis.visualisation.dashboard.Panel.js');
fileList.push(libDir + '/jarvis.visualisation.dashboard.Bar.js');
fileList.push(libDir + '/jarvis.visualisation.dashboard.BarTable.js');

fileList.push(libDir + '/jarvis.visualisation.report.js');
fileList.push(libDir + '/jarvis.visualisation.report.Timeline.js');
fileList.push(libDir + '/jarvis.visualisation.report.MetricBox.js');
fileList.push(libDir + '/jarvis.visualisation.report.OverviewMetricBox.js');
fileList.push(libDir + '/jarvis.visualisation.report.OverviewPie.js');
fileList.push(libDir + '/jarvis.visualisation.report.SummaryTable.js');
fileList.push(libDir + '/jarvis.visualisation.report.Table.js');
fileList.push(libDir + '/jarvis.visualisation.report.TableEx.js');
fileList.push(libDir + '/jarvis.visualisation.report.Histogram.js');
fileList.push(libDir + '/jarvis.visualisation.report.Tabs.js');
fileList.push(libDir + '/jarvis.visualisation.report.MetricGroup.js');
fileList.push(libDir + '/jarvis.visualisation.report.Panel.js');
fileList.push(libDir + '/jarvis.visualisation.report.Editor.js');

fileList.push(libDir + '/jarvis.visualisation.js');
fileList.push(libDir + '/jarvis.tail.js');

if (fileList) {
    ClosureCompiler.compile(
        fileList,
        {
            // Options in the API exclude the "--" prefix
            compilation_level: "ADVANCED_OPTIMIZATIONS", //"WHITESPACE_ONLY"

            // If you specify a directory here, all files inside are used
            externs: []

            // ^ As you've seen, multiple options with the same name are
            //   specified using an array.

        },
        function (error, result) {
            if (result) {
                // Write result to file
                // Display error (warnings from stderr)
                fs.writeFile("./bin/joola.min.js", result, function (err) {
                    if (err) {
                        logger.error('Failed to save min file: ' + err)
                    } else {
                        logger.info('Min file saved [./bin/joola.min.js]');
                    }
                });

            } else {
                // Display error...
                console.log(error);
            }
        }
    );


    ClosureCompiler.compile(
        fileList,
        {
            // Options in the API exclude the "--" prefix
            compilation_level: "WHITESPACE_ONLY", //"WHITESPACE_ONLY"

            // Capitalization does not matter
            Formatting: "PRETTY_PRINT",

            // If you specify a directory here, all files inside are used
            externs: []

            // ^ As you've seen, multiple options with the same name are
            //   specified using an array.

        },
        function (error, result) {
            if (result) {
                // Write result to file
                // Display error (warnings from stderr)
                fs.writeFile("./bin/joola.js", result, function (err) {
                    if (err) {
                        logger.error('Failed to save whitespace file: ' + err)
                    } else {
                        logger.info('Whitespace file saved [./bin/joola.js]');
                    }
                });

            } else {
                // Display error...
                console.log(error);
            }
        }
    );
}

