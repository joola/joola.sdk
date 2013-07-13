// Copyright 2012 Joola. All Rights Reserved.
//
// Licensed under the Jarvis License Agreement (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://jarvis.joo.la/client/license
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Deps file for Jarvis
 *
 */


jarvis.addDependency('jarvis.string.js', ['jarvis.string'], []);
jarvis.addDependency('jarvis.date.js', ['jarvis.date'], []);
jarvis.addDependency('jarvis.array.js', ['jarvis.array'], []);

jarvis.addDependency('jarvis.debug.js', ['jarvis.debug'], ['jarvis.string', 'jarvis.date']);

jarvis.addDependency('jarvis.DataAccess.js', ['jarvis.dataaccess'], ['jarvis.string', 'jarvis.date', 'jarvis.debug']);


jarvis.addDependency('jarvis.objects.js', ['jarvis.objects'], []);
jarvis.addDependency('jarvis.objects.DataSources.js', ['jarvis.objects.DataSources'], ['jarvis.objects']);
jarvis.addDependency('jarvis.objects.DataTables.js', ['jarvis.objects.DataTables'], ['jarvis.objects', 'jarvis.objects.DataSources']);
jarvis.addDependency('jarvis.objects.Dimensions.js', ['jarvis.objects.Dimensions'], ['jarvis.objects', 'jarvis.objects.DataSources']);

//jarvis.addDependency('Jarvis.Realtime.js', ['jarvis.realtime'], [ 'jarvis.debug', 'jarvis.string', 'jarvis.date', 'jarvis.dataaccess']);
jarvis.addDependency('jarvis.visualisation.realtime.js', ['jarvis.visualisation.realtime'], ['highcharts', 'timeago']);
jarvis.addDependency('jarvis.visualisation.realtime.Panel.js', ['jarvis.visualisation.realtime.Panel'], ['jarvis.visualisation.realtime']);
jarvis.addDependency('jarvis.visualisation.realtime.Status.js', ['jarvis.visualisation.realtime.Status'], ['jarvis.visualisation.realtime']);
jarvis.addDependency('jarvis.visualisation.realtime.StartStop.js', ['jarvis.visualisation.realtime.StartStop'], ['jarvis.visualisation.realtime']);
jarvis.addDependency('jarvis.visualisation.realtime.DateBox.js', ['jarvis.visualisation.realtime.DateBox'], ['jarvis.visualisation.realtime']);
jarvis.addDependency('jarvis.visualisation.realtime.Timeline.js', ['jarvis.visualisation.realtime.Timeline'], ['jarvis.visualisation.realtime']);
jarvis.addDependency('jarvis.visualisation.realtime.MetricBox.js', ['jarvis.visualisation.realtime.MetricBox'], ['jarvis.visualisation.realtime']);
jarvis.addDependency('jarvis.visualisation.realtime.Table.js', ['jarvis.visualisation.realtime.Table'], ['jarvis.visualisation.realtime']);
jarvis.addDependency('jarvis.visualisation.realtime.Geo.js', ['jarvis.visualisation.realtime.Geo'], ['jarvis.visualisation.realtime']);

//jarvis.addDependency('Jarvis.Dashboard.js', ['jarvis.dashboard'], [ 'jarvis.debug', 'jarvis.string', 'jarvis.date', 'jarvis.dataaccess']);
jarvis.addDependency('jarvis.visualisation.dashboard.js', ['jarvis.visualisation.dashboard'], ['highcharts', 'timeago', 'jarvis.visualisation.picker.DateBox']);
jarvis.addDependency('jarvis.visualisation.dashboard.Panel.js', ['jarvis.visualisation.dashboard.Panel'], ['jarvis.visualisation.dashboard']);
jarvis.addDependency('jarvis.visualisation.dashboard.Timeline.js', ['jarvis.visualisation.dashboard.Timeline'], ['jarvis.visualisation.dashboard']);
jarvis.addDependency('jarvis.visualisation.dashboard.MetricBox.js', ['jarvis.visualisation.dashboard.MetricBox'], ['jarvis.visualisation.dashboard']);
jarvis.addDependency('jarvis.visualisation.dashboard.Table.js', ['jarvis.visualisation.dashboard.Table'], ['jarvis.visualisation.dashboard']);
jarvis.addDependency('jarvis.visualisation.dashboard.Pie.js', ['jarvis.visualisation.dashboard.Pie'], ['jarvis.visualisation.dashboard']);

//jarvis.addDependency('Jarvis.Report.js', ['jarvis.report'], [ 'jarvis.debug', 'jarvis.string', 'jarvis.date', 'jarvis.dataaccess']);
jarvis.addDependency('jarvis.visualisation.report.js', ['jarvis.visualisation.report'], ['jarvis.visualisation', 'highcharts', 'timeago']);
jarvis.addDependency('jarvis.visualisation.report.Panel.js', ['jarvis.visualisation.report.Panel'], ['jarvis.visualisation.report']);
jarvis.addDependency('jarvis.visualisation.report.Timeline.js', ['jarvis.visualisation.report.Timeline'], ['jarvis.visualisation.report']);
jarvis.addDependency('jarvis.visualisation.report.MetricBox.js', ['jarvis.visualisation.report.MetricBox'], ['jarvis.visualisation.report']);
jarvis.addDependency('jarvis.visualisation.report.Table.js', ['jarvis.visualisation.report.Table'], ['jarvis.visualisation.report']);
jarvis.addDependency('jarvis.visualisation.report.Tabs.js', ['jarvis.visualisation.report.Tabs'], ['jarvis.visualisation.report']);
jarvis.addDependency('jarvis.visualisation.report.MetricGroup.js', ['jarvis.visualisation.report.MetricGroup'], ['jarvis.visualisation.report']);

jarvis.addDependency('jarvis.Visualisation.js', ['jarvis.visualisation'], []);
jarvis.addDependency('jarvis.visualisation.picker.js', ['jarvis.visualisation.picker'], ['jarvis.visualisation']);
jarvis.addDependency('jarvis.visualisation.picker.DateBox.js', ['jarvis.visualisation.picker.DateBox'], ['jarvis.visualisation.picker']);
jarvis.addDependency('jarvis.visualisation.picker.Metrics.js', ['jarvis.visualisation.picker.metrics'], ['jarvis.visualisation.picker']);
jarvis.addDependency('jarvis.visualisation.picker.Dimensions.js', ['jarvis.visualisation.picker.dimensions'], ['jarvis.visualisation.picker']);

jarvis.addDependency('jarvis.visualisation.notice.js', ['jarvis.visualisation.notice'], ['jarvis.visualisation']);
jarvis.addDependency('jarvis.visualisation.notice.Session.js', ['jarvis.visualisation.notice.Session'], ['jarvis.visualisation.notice']);


jarvis.addDependency('jarvis.visualisation.container.js', ['jarvis.visualisation.container'], ['jarvis.visualisation']);
jarvis.addDependency('jarvis.visualisation.container.Metrics.js', ['jarvis.visualisation.container.metrics'], ['jarvis.visualisation.container']);
jarvis.addDependency('jarvis.visualisation.container.Dimensions.js', ['jarvis.visualisation.container.dimensions'], ['jarvis.visualisation.container']);

jarvis.addDependency('jarvis.Console.js', ['jarvis.Console'], ['jarvis.visualisation.realtime', 'jconsole', 'xregexp', 'google.base']);


jarvis.addDependency('jarvis-3rd.min.js', ['jarvis_3rd'], []);

/*
jarvis.addDependency('3rd/jquery-1.7.2.min.js', ['jquery'], []);
jarvis.addDependency('3rd/jquery-ui.min.js', ['jquery-ui'], []);
jarvis.addDependency('3rd/highcharts.2.2.3.js', ['highcharts'], []);
//jarvis.addDependency('3rd/highstock.src.js', ['highcharts-highstock'], []);
//jarvis.addDependency('3rd/highcharts-more.src.js', ['highcharts-more'], ['highcharts']);
jarvis.addDependency('3rd/jquery.timeago.js', ['timeago'], []);
jarvis.addDependency('3rd/jquery.console.js', ['jconsole'], []);
jarvis.addDependency('3rd/xregexp-min.js', ['xregexp'], []);
jarvis.addDependency('goog/base.js', ['google.base'], []);
jarvis.addDependency('3rd/jquery.ba-hashchange.min.js', ['hashchange'], []);
jarvis.addDependency('3rd/underscore-min.js', ['underscore'], []);
jarvis.addDependency('3rd/jquery.mousewheel.js', ['mousewheel'], []);

jarvis.addDependency('3rd/jsapi.js', ['jsapi'], []);
*/

//jarvis.require('jquery');
//jarvis.require('jquery-ui');
//jarvis.require('hashchange');
//jarvis.require('underscore');
//jarvis.require('mousewheel');
jarvis.require('jarvis_3rd');

jarvis.require('jarvis.dataaccess');

jarvis.require('jarvis.objects');
jarvis.require('jarvis.objects.DataSources');
jarvis.require('jarvis.objects.DataTables');
jarvis.require('jarvis.objects.Dimensions');
jarvis.require('jarvis.objects.Cache');
jarvis.require('jarvis.objects.Auth');



//jarvis.require('jarvis.realtime');
jarvis.require('jarvis.visualisation.realtime');
jarvis.require('jarvis.visualisation.realtime.Panel');
jarvis.require('jarvis.visualisation.realtime.Status');
jarvis.require('jarvis.visualisation.realtime.StartStop');
jarvis.require('jarvis.visualisation.realtime.DateBox');
jarvis.require('jarvis.visualisation.realtime.Timeline');
jarvis.require('jarvis.visualisation.realtime.MetricBox');
jarvis.require('jarvis.visualisation.realtime.Table');
jarvis.require('jarvis.visualisation.realtime.Geo');

//jarvis.require('jarvis.dashboard');

jarvis.require('jarvis.visualisation.dashboard');
jarvis.require('jarvis.visualisation.dashboard.Panel');
jarvis.require('jarvis.visualisation.dashboard.Timeline');
jarvis.require('jarvis.visualisation.dashboard.MetricBox');
jarvis.require('jarvis.visualisation.dashboard.Table');
jarvis.require('jarvis.visualisation.dashboard.Pie');

jarvis.require('jarvis.visualisation.notice.Session');
jarvis.require('jarvis.visualisation.notice.Loading');
jarvis.require('jarvis.visualisation.picker.DateBox');

//jarvis.require('jarvis.report');
jarvis.require('jarvis.visualisation.report');

jarvis.require('jarvis.visualisation.report.Timeline');
jarvis.require('jarvis.visualisation.report.MetricBox');
jarvis.require('jarvis.visualisation.report.Table');
jarvis.require('jarvis.visualisation.report.Tabs');
jarvis.require('jarvis.visualisation.report.MetricGroup');
jarvis.require('jarvis.visualisation.report.Panel');

jarvis.require('jarvis.visualisation');

