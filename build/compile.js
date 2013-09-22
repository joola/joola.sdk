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


fileList.push(libDir + '/joolaio.js');
fileList.push(libDir + '/joolaio.deps.js');

fileList.push(libDir + '/joolaio.string.js');
fileList.push(libDir + '/joolaio.date.js');
fileList.push(libDir + '/joolaio.array.js');
fileList.push(libDir + '/joolaio.debug.js');
fileList.push(libDir + '/joolaio.dataaccess.js');

fileList.push(libDir + '/joolaio.tests.js');
fileList.push(libDir + '/joolaio.tests.Base.js');

fileList.push(libDir + '/joolaio.objects.js');
fileList.push(libDir + '/joolaio.objects.Auth.js');
fileList.push(libDir + '/joolaio.objects.Auth.Roles.js');
fileList.push(libDir + '/joolaio.objects.Auth.Organizations.js');
fileList.push(libDir + '/joolaio.objects.Auth.Users.js');
fileList.push(libDir + '/joolaio.objects.Auth.Permissions.js');
fileList.push(libDir + '/joolaio.objects.APITokens.js');
fileList.push(libDir + '/joolaio.objects.UserTokens.js');
fileList.push(libDir + '/joolaio.objects.WebOrigins.js');
fileList.push(libDir + '/joolaio.objects.Config.js');
fileList.push(libDir + '/joolaio.objects.Cache.js');
fileList.push(libDir + '/joolaio.objects.Query.js');
fileList.push(libDir + '/joolaio.objects.State.js');
fileList.push(libDir + '/joolaio.objects.Realtime.js');
fileList.push(libDir + '/joolaio.objects.DataSources.js');
fileList.push(libDir + '/joolaio.objects.DataTables.js');
fileList.push(libDir + '/joolaio.objects.Dimensions.js');
fileList.push(libDir + '/joolaio.objects.Metrics.js');
fileList.push(libDir + '/joolaio.objects.Dashboards.js');
fileList.push(libDir + '/joolaio.objects.RealtimePanels.js');
fileList.push(libDir + '/joolaio.objects.Reports.js');
fileList.push(libDir + '/joolaio.objects.Update.js');

fileList.push(libDir + '/joolaio.visualisation.notice.js');
fileList.push(libDir + '/joolaio.visualisation.notice.Session.js');
fileList.push(libDir + '/joolaio.visualisation.notice.Loading.js');

fileList.push(libDir + '/joolaio.visualisation.picker.js');
fileList.push(libDir + '/joolaio.visualisation.picker.DateBox.js');
fileList.push(libDir + '/joolaio.visualisation.picker.Metrics.js');
fileList.push(libDir + '/joolaio.visualisation.picker.Dimensions.js');
fileList.push(libDir + '/joolaio.visualisation.container.js');
fileList.push(libDir + '/joolaio.visualisation.container.Metrics.js');
fileList.push(libDir + '/joolaio.visualisation.container.Dimensions.js');
fileList.push(libDir + '/joolaio.visualisation.container.Filter.js');

fileList.push(libDir + '/joolaio.visualisation.realtime.js');
fileList.push(libDir + '/joolaio.visualisation.realtime.Status.js');
fileList.push(libDir + '/joolaio.visualisation.realtime.StartStop.js');
fileList.push(libDir + '/joolaio.visualisation.realtime.DateBox.js');
fileList.push(libDir + '/joolaio.visualisation.realtime.Timeline.js');
fileList.push(libDir + '/joolaio.visualisation.realtime.MetricBox.js');
fileList.push(libDir + '/joolaio.visualisation.realtime.Table.js');
fileList.push(libDir + '/joolaio.visualisation.realtime.Geo.js');
fileList.push(libDir + '/joolaio.visualisation.realtime.Panel.js');

fileList.push(libDir + '/joolaio.visualisation.dashboard.js');
fileList.push(libDir + '/joolaio.visualisation.dashboard.Timeline.js');
fileList.push(libDir + '/joolaio.visualisation.dashboard.MetricBox.js');
fileList.push(libDir + '/joolaio.visualisation.dashboard.Table.js');
fileList.push(libDir + '/joolaio.visualisation.dashboard.Pie.js');
fileList.push(libDir + '/joolaio.visualisation.dashboard.Panel.js');
fileList.push(libDir + '/joolaio.visualisation.dashboard.Bar.js');
fileList.push(libDir + '/joolaio.visualisation.dashboard.BarTable.js');

fileList.push(libDir + '/joolaio.visualisation.report.js');
fileList.push(libDir + '/joolaio.visualisation.report.Timeline.js');
fileList.push(libDir + '/joolaio.visualisation.report.MetricBox.js');
fileList.push(libDir + '/joolaio.visualisation.report.OverviewMetricBox.js');
fileList.push(libDir + '/joolaio.visualisation.report.OverviewPie.js');
fileList.push(libDir + '/joolaio.visualisation.report.SummaryTable.js');
fileList.push(libDir + '/joolaio.visualisation.report.Table.js');
fileList.push(libDir + '/joolaio.visualisation.report.TableEx.js');
fileList.push(libDir + '/joolaio.visualisation.report.Histogram.js');
fileList.push(libDir + '/joolaio.visualisation.report.Tabs.js');
fileList.push(libDir + '/joolaio.visualisation.report.MetricGroup.js');
fileList.push(libDir + '/joolaio.visualisation.report.Panel.js');
fileList.push(libDir + '/joolaio.visualisation.report.Editor.js');

fileList.push(libDir + '/joolaio.visualisation.js');
fileList.push(libDir + '/joolaio.visualisation.Template.js');
fileList.push(libDir + '/joolaio.tail.js');

if (fileList) {
    /*
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
    */

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
                fs.writeFile("./bin/joolaio.js", result, function (err) {
                    if (err) {
                        logger.error('Failed to save whitespace file: ' + err)
                    } else {
                        logger.info('Whitespace file saved [./bin/joolaio.js]');
                    }
                });

            } else {
                // Display error...
                console.log(error);
            }
        }
    );
}

