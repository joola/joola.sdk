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



joolaio.addDependency('joolaio.string.js', ['joolaio.string'], []);
joolaio.addDependency('joolaio.date.js', ['joolaio.date'], []);
joolaio.addDependency('joolaio.array.js', ['joolaio.array'], []);

joolaio.addDependency('joolaio.debug.js', ['joolaio.debug'], ['joolaio.string', 'joolaio.date']);

joolaio.addDependency('joolaio.DataAccess.js', ['joolaio.dataaccess'], ['joolaio.string', 'joolaio.date', 'joolaio.debug']);


joolaio.addDependency('joolaio.objects.js', ['joolaio.objects'], []);
joolaio.addDependency('joolaio.objects.DataSources.js', ['joolaio.objects.DataSources'], ['joolaio.objects']);
joolaio.addDependency('joolaio.objects.DataTables.js', ['joolaio.objects.DataTables'], ['joolaio.objects', 'joolaio.objects.DataSources']);
joolaio.addDependency('joolaio.objects.Dimensions.js', ['joolaio.objects.Dimensions'], ['joolaio.objects', 'joolaio.objects.DataSources']);

//joolaio.addDependency('joolaio.Realtime.js', ['joolaio.realtime'], [ 'joolaio.debug', 'joolaio.string', 'joolaio.date', 'joolaio.dataaccess']);
joolaio.addDependency('joolaio.visualisation.realtime.js', ['joolaio.visualisation.realtime'], ['highcharts', 'timeago']);
joolaio.addDependency('joolaio.visualisation.realtime.Panel.js', ['joolaio.visualisation.realtime.Panel'], ['joolaio.visualisation.realtime']);
joolaio.addDependency('joolaio.visualisation.realtime.Status.js', ['joolaio.visualisation.realtime.Status'], ['joolaio.visualisation.realtime']);
joolaio.addDependency('joolaio.visualisation.realtime.StartStop.js', ['joolaio.visualisation.realtime.StartStop'], ['joolaio.visualisation.realtime']);
joolaio.addDependency('joolaio.visualisation.realtime.DateBox.js', ['joolaio.visualisation.realtime.DateBox'], ['joolaio.visualisation.realtime']);
joolaio.addDependency('joolaio.visualisation.realtime.Timeline.js', ['joolaio.visualisation.realtime.Timeline'], ['joolaio.visualisation.realtime']);
joolaio.addDependency('joolaio.visualisation.realtime.MetricBox.js', ['joolaio.visualisation.realtime.MetricBox'], ['joolaio.visualisation.realtime']);
joolaio.addDependency('joolaio.visualisation.realtime.Table.js', ['joolaio.visualisation.realtime.Table'], ['joolaio.visualisation.realtime']);
joolaio.addDependency('joolaio.visualisation.realtime.Geo.js', ['joolaio.visualisation.realtime.Geo'], ['joolaio.visualisation.realtime']);

//joolaio.addDependency('joolaio.Dashboard.js', ['joolaio.dashboard'], [ 'joolaio.debug', 'joolaio.string', 'joolaio.date', 'joolaio.dataaccess']);
joolaio.addDependency('joolaio.visualisation.dashboard.js', ['joolaio.visualisation.dashboard'], ['highcharts', 'timeago', 'joolaio.visualisation.picker.DateBox']);
joolaio.addDependency('joolaio.visualisation.dashboard.Panel.js', ['joolaio.visualisation.dashboard.Panel'], ['joolaio.visualisation.dashboard']);
joolaio.addDependency('joolaio.visualisation.dashboard.Timeline.js', ['joolaio.visualisation.dashboard.Timeline'], ['joolaio.visualisation.dashboard']);
joolaio.addDependency('joolaio.visualisation.dashboard.MetricBox.js', ['joolaio.visualisation.dashboard.MetricBox'], ['joolaio.visualisation.dashboard']);
joolaio.addDependency('joolaio.visualisation.dashboard.Table.js', ['joolaio.visualisation.dashboard.Table'], ['joolaio.visualisation.dashboard']);
joolaio.addDependency('joolaio.visualisation.dashboard.Pie.js', ['joolaio.visualisation.dashboard.Pie'], ['joolaio.visualisation.dashboard']);

//joolaio.addDependency('joolaio.Report.js', ['joolaio.report'], [ 'joolaio.debug', 'joolaio.string', 'joolaio.date', 'joolaio.dataaccess']);
joolaio.addDependency('joolaio.visualisation.report.js', ['joolaio.visualisation.report'], ['joolaio.visualisation', 'highcharts', 'timeago']);
joolaio.addDependency('joolaio.visualisation.report.Panel.js', ['joolaio.visualisation.report.Panel'], ['joolaio.visualisation.report']);
joolaio.addDependency('joolaio.visualisation.report.Timeline.js', ['joolaio.visualisation.report.Timeline'], ['joolaio.visualisation.report']);
joolaio.addDependency('joolaio.visualisation.report.MetricBox.js', ['joolaio.visualisation.report.MetricBox'], ['joolaio.visualisation.report']);
joolaio.addDependency('joolaio.visualisation.report.Table.js', ['joolaio.visualisation.report.Table'], ['joolaio.visualisation.report']);
joolaio.addDependency('joolaio.visualisation.report.Tabs.js', ['joolaio.visualisation.report.Tabs'], ['joolaio.visualisation.report']);
joolaio.addDependency('joolaio.visualisation.report.MetricGroup.js', ['joolaio.visualisation.report.MetricGroup'], ['joolaio.visualisation.report']);

joolaio.addDependency('joolaio.Visualisation.js', ['joolaio.visualisation'], []);
joolaio.addDependency('joolaio.visualisation.picker.js', ['joolaio.visualisation.picker'], ['joolaio.visualisation']);
joolaio.addDependency('joolaio.visualisation.picker.DateBox.js', ['joolaio.visualisation.picker.DateBox'], ['joolaio.visualisation.picker']);
joolaio.addDependency('joolaio.visualisation.picker.Metrics.js', ['joolaio.visualisation.picker.metrics'], ['joolaio.visualisation.picker']);
joolaio.addDependency('joolaio.visualisation.picker.Dimensions.js', ['joolaio.visualisation.picker.dimensions'], ['joolaio.visualisation.picker']);

joolaio.addDependency('joolaio.visualisation.notice.js', ['joolaio.visualisation.notice'], ['joolaio.visualisation']);
joolaio.addDependency('joolaio.visualisation.notice.Session.js', ['joolaio.visualisation.notice.Session'], ['joolaio.visualisation.notice']);


joolaio.addDependency('joolaio.visualisation.container.js', ['joolaio.visualisation.container'], ['joolaio.visualisation']);
joolaio.addDependency('joolaio.visualisation.container.Metrics.js', ['joolaio.visualisation.container.metrics'], ['joolaio.visualisation.container']);
joolaio.addDependency('joolaio.visualisation.container.Dimensions.js', ['joolaio.visualisation.container.dimensions'], ['joolaio.visualisation.container']);

joolaio.addDependency('joolaio-3rd.min.js', ['joolaio_3rd'], []);

/*
joolaio.addDependency('3rd/jquery-1.7.2.min.js', ['jquery'], []);
joolaio.addDependency('3rd/jquery-ui.min.js', ['jquery-ui'], []);
joolaio.addDependency('3rd/highcharts.2.2.3.js', ['highcharts'], []);
//joolaio.addDependency('3rd/highstock.src.js', ['highcharts-highstock'], []);
//joolaio.addDependency('3rd/highcharts-more.src.js', ['highcharts-more'], ['highcharts']);
joolaio.addDependency('3rd/jquery.timeago.js', ['timeago'], []);
joolaio.addDependency('3rd/jquery.console.js', ['jconsole'], []);
joolaio.addDependency('3rd/xregexp-min.js', ['xregexp'], []);
joolaio.addDependency('goog/base.js', ['google.base'], []);
joolaio.addDependency('3rd/jquery.ba-hashchange.min.js', ['hashchange'], []);
joolaio.addDependency('3rd/underscore-min.js', ['underscore'], []);
joolaio.addDependency('3rd/jquery.mousewheel.js', ['mousewheel'], []);

joolaio.addDependency('3rd/jsapi.js', ['jsapi'], []);
*/

//joolaio.require('jquery');
//joolaio.require('jquery-ui');
//joolaio.require('hashchange');
//joolaio.require('underscore');
//joolaio.require('mousewheel');
joolaio.require('joolaio_3rd');

joolaio.require('joolaio.dataaccess');

joolaio.require('joolaio.objects');
joolaio.require('joolaio.objects.DataSources');
joolaio.require('joolaio.objects.DataTables');
joolaio.require('joolaio.objects.Dimensions');
joolaio.require('joolaio.objects.Cache');
joolaio.require('joolaio.objects.Auth');



//joolaio.require('joolaio.realtime');
joolaio.require('joolaio.visualisation.realtime');
joolaio.require('joolaio.visualisation.realtime.Panel');
joolaio.require('joolaio.visualisation.realtime.Status');
joolaio.require('joolaio.visualisation.realtime.StartStop');
joolaio.require('joolaio.visualisation.realtime.DateBox');
joolaio.require('joolaio.visualisation.realtime.Timeline');
joolaio.require('joolaio.visualisation.realtime.MetricBox');
joolaio.require('joolaio.visualisation.realtime.Table');
joolaio.require('joolaio.visualisation.realtime.Geo');

//joolaio.require('joolaio.dashboard');

joolaio.require('joolaio.visualisation.dashboard');
joolaio.require('joolaio.visualisation.dashboard.Panel');
joolaio.require('joolaio.visualisation.dashboard.Timeline');
joolaio.require('joolaio.visualisation.dashboard.MetricBox');
joolaio.require('joolaio.visualisation.dashboard.Table');
joolaio.require('joolaio.visualisation.dashboard.Pie');

joolaio.require('joolaio.visualisation.notice.Session');
joolaio.require('joolaio.visualisation.notice.Loading');
joolaio.require('joolaio.visualisation.picker.DateBox');

//joolaio.require('joolaio.report');
joolaio.require('joolaio.visualisation.report');

joolaio.require('joolaio.visualisation.report.Timeline');
joolaio.require('joolaio.visualisation.report.MetricBox');
joolaio.require('joolaio.visualisation.report.Table');
joolaio.require('joolaio.visualisation.report.Tabs');
joolaio.require('joolaio.visualisation.report.MetricGroup');
joolaio.require('joolaio.visualisation.report.Panel');

joolaio.require('joolaio.visualisation');

