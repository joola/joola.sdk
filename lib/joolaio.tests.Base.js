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

joolaio.provide('joolaio.tests.Base');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

joolaio.require('joolaio.tests');

joolaio.tests.Log = function (message, type) {
    var $logger = $('.testlogger');

    var $message = $('<div class="message"></div>');
    if (type == 'header')
        $message.addClass('header');

    if (type == 'error')
        $message.addClass('error');
    $message.html(message);
    $logger.append($message);
}

var timerset = false;
var intervaltoken = 0;

joolaio.tests.updateDisplay = function () {
    if (!joolaio.tests.base.end)
        $('.base_txt_exec').html(joolaio.tests.base.executingcounter);
    else {
        $('.base_caption_exec').html('Queries Executed');
        $('.base_txt_exec').html(joolaio.tests.base.totalcounter);
    }

    $('.base_txt_failed').html(joolaio.tests.base.failedcounter);
    $('.base_txt_success').html(joolaio.string.roundNumber(joolaio.tests.base.successcounter / joolaio.tests.base.totalcounter * 100, 0, false) + '%');

    if (!joolaio.tests.deep.end)
        $('.deep_txt_exec').html(joolaio.tests.deep.executingcounter);
    else {
        $('.deep_caption_exec').html('Queries Executed');
        $('.deep_txt_exec').html(joolaio.tests.deep.totalcounter);
    }

    $('.deep_txt_failed').html(joolaio.tests.deep.failedcounter);
    $('.deep_txt_success').html(joolaio.string.roundNumber(joolaio.tests.deep.successcounter / joolaio.tests.deep.totalcounter * 100, 0, false) + '%');

    if (!joolaio.tests.filters.end)
        $('.filters_txt_exec').html(joolaio.tests.filters.executingcounter);
    else {
        $('.filters_caption_exec').html('Queries Executed');
        $('.filters_txt_exec').html(joolaio.tests.filters.totalcounter);
    }

    $('.filters_txt_failed').html(joolaio.tests.filters.failedcounter);
    $('.filters_txt_success').html(joolaio.string.roundNumber(joolaio.tests.filters.successcounter / joolaio.tests.filters.totalcounter * 100, 0, false) + '%');


    if (!timerset) {
        timerset = true;

        intervaltoken = setInterval(function () {
            if (!joolaio.tests.base.end)
                $('.base_txt_duration').html(joolaio.string.formatNumber((new Date() - joolaio.tests.base.start) / 1000, 0) + ' sec.');
            else {
                $('.base_txt_duration').html(joolaio.string.formatNumber((joolaio.tests.base.end - joolaio.tests.base.start) / 1000, 0) + ' sec.');

            }

            if (!joolaio.tests.deep.end)
                $('.deep_txt_duration').html(joolaio.string.formatNumber((new Date() - joolaio.tests.deep.start) / 1000, 0) + ' sec.');
            else {
                $('.deep_txt_duration').html(joolaio.string.formatNumber((joolaio.tests.deep.end - joolaio.tests.deep.start) / 1000, 0) + ' sec.');

            }

            if (!joolaio.tests.filters.end)
                $('.filters_txt_duration').html(joolaio.string.formatNumber((new Date() - joolaio.tests.filters.start) / 1000, 0) + ' sec.');
            else {
                $('.filters_txt_duration').html(joolaio.string.formatNumber((joolaio.tests.filters.end - joolaio.tests.filters.start) / 1000, 0) + ' sec.');

            }

            if (joolaio.tests.base.end && joolaio.tests.deep.end && joolaio.tests.filters.end)
                window.clearInterval(intervaltoken);
        }, 1000);
    }
}

joolaio.tests.base = {};
joolaio.tests.deep = {};
joolaio.tests.filters = {};

joolaio.tests.base.start = null;
joolaio.tests.base.end = null;

joolaio.tests.deep.start = null;
joolaio.tests.deep.end = null;

joolaio.tests.filters.start = null;
joolaio.tests.filters.end = null;

joolaio.tests.base.totalcounter = 0;
joolaio.tests.base.executingcounter = 0;
joolaio.tests.base.failedcounter = 0;
joolaio.tests.base.successcounter = 0;

joolaio.tests.deep.totalcounter = 0;
joolaio.tests.deep.executingcounter = 0;
joolaio.tests.deep.failedcounter = 0;
joolaio.tests.deep.successcounter = 0;

joolaio.tests.filters.totalcounter = 0;
joolaio.tests.filters.executingcounter = 0;
joolaio.tests.filters.failedcounter = 0;
joolaio.tests.filters.successcounter = 0;

joolaio.tests.startdate = new Date(2013, 0, 1);
joolaio.tests.enddate = new Date(2013, 0, 1);

joolaio.tests.servers= ['']

joolaio.tests.fetch = function (group, title, options) {
    try {
        switch (group) {
            case 'base':
                if (joolaio.tests.base.executingcounter == 0)
                    joolaio.tests.base.start = new Date();
                joolaio.tests.base.totalcounter++;
                joolaio.tests.base.executingcounter++;
                break;
            case 'deep':
                if (joolaio.tests.deep.executingcounter == 0)
                    joolaio.tests.deep.start = new Date();
                joolaio.tests.deep.totalcounter++;
                joolaio.tests.deep.executingcounter++;

                break;
            case 'filters':
                if (joolaio.tests.filters.executingcounter == 0)
                    joolaio.tests.filters.start = new Date();
                joolaio.tests.filters.totalcounter++;
                joolaio.tests.filters.executingcounter++;

                break;
            default:
                break;
        }

        joolaio.dataaccess.fetch(this, joolaio.tests.servers[0]+'/engine/Query.svc/fetch', options, function (sender, result, error) {
            title = title.replace('#URL', error.url);
            title = group + '::' + title;
            if (result.resultcode == "200") {
                //joolaio.tests.Log(title + ':: SUCCESS</a>');

                switch (group) {
                    case 'base':
                        joolaio.tests.base.executingcounter--;
                        joolaio.tests.base.successcounter++;

                        if (joolaio.tests.base.executingcounter == 0)
                            joolaio.tests.base.end = new Date();
                        break;
                    case 'deep':
                        joolaio.tests.deep.executingcounter--;
                        joolaio.tests.deep.successcounter++;

                        if (joolaio.tests.deep.executingcounter == 0)
                            joolaio.tests.deep.end = new Date();
                        break;
                    case 'filters':
                        joolaio.tests.filters.executingcounter--;
                        joolaio.tests.filters.successcounter++;

                        if (joolaio.tests.filters.executingcounter == 0)
                            joolaio.tests.filters.end = new Date();
                        break;
                    default:
                        break;
                }

                joolaio.tests.updateDisplay();
            }
            else {
                joolaio.tests.Log(title + ':: FAIL</a>', 'error');

                switch (group) {
                    case 'base':
                        joolaio.tests.base.executingcounter--;
                        joolaio.tests.base.failedcounter++;

                        if (joolaio.tests.base.executingcounter == 0)
                            joolaio.tests.base.end = new Date();
                        break;
                    case 'deep':
                        joolaio.tests.deep.executingcounter--;
                        joolaio.tests.deep.failedcounter++;

                        if (joolaio.tests.deep.executingcounter == 0)
                            joolaio.tests.deep.end = new Date();
                        break;
                    case 'filters':
                        joolaio.tests.filters.executingcounter--;
                        joolaio.tests.filters.failedcounter++;

                        if (joolaio.tests.filters.executingcounter == 0)
                            joolaio.tests.filters.end = new Date();
                        break;
                    default:
                        break;
                }

                joolaio.tests.updateDisplay();
            }
        });
    }
    catch (e) {
        switch (group) {
            case 'base':
                joolaio.tests.base.executingcounter--;
                joolaio.tests.base.failedcounter++;

                if (joolaio.tests.base.executingcounter == 0)
                    joolaio.tests.base.end = new Date();
                break;
            case 'deep':
                joolaio.tests.deep.executingcounter--;
                joolaio.tests.deep.failedcounter++;

                if (joolaio.tests.deep.executingcounter == 0)
                    joolaio.tests.deep.end = new Date();
                break;
            case 'filters':
                joolaio.tests.filters.executingcounter--;
                joolaio.tests.filters.failedcounter++;

                if (joolaio.tests.filters.executingcounter == 0)
                    joolaio.tests.filters.end = new Date();
                break;
            default:
                break;
        }
        joolaio.tests.Log(title + ':: EXCEPTION</a>', 'error');
        joolaio.tests.Log(e.message, 'error');
    }

    if (joolaio.tests.executingcounter == 0)
        joolaio.tests.end = new Date();

    joolaio.tests.updateDisplay();
}

joolaio.tests.Base.RunAll = function (sender, options, callback) {
    var result = false;

    joolaio.inSaveState = true;

    //new joolaio.objects.Cache().PurgeResults();

    joolaio.objects.Dimensions.List();

    var startdate = joolaio.tests.startdate;
    var enddate = joolaio.tests.enddate;

    var reports = joolaio.objects.Reports.List();
    joolaio.tests.Log('Found ' + reports.length + ' reports...','header');
    $(reports).each(function (rid, report) {
        //joolaio.tests.Log('Inspecting report "' + report.Name + '".', 'header');
        //console.log(report);
        $(report.Tabs).each(function (tid, tab) {
            //joolaio.tests.Log('Inspecting report tab "' + tab.Name + '".','header');
            //console.log(tab);

            //console.log('Drawing metrics');
            $(tab.MetricGroups).each(function (mgid, mg) {
                var _metrics = [];
                //joolaio.tests.Log('Inspecting metric group "' + mg.Name + '".','header');
                $(mg.Metrics).each(function (mid, metric) {
                    _metrics.push(metric);
                    // console.log('Checking metric "' + metric.Name + '"...');
                    var _queryOptions = {
                        id:'primary',
                        FromDate:joolaio.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                        ToDate:joolaio.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                        Dimensions:'',
                        Metrics:metric.Name,
                        Resolution:'Day',
                        omitDate:true,
                        Filter:''
                    };
                    try {
                        var title = '<a target="_blank" href="#URL">TEST RESULT: ' + 'Report: ' + report.Name + ', Tab: ' + tab.Name + ', MG: ' + mg.Name + ', Metric: ' + metric.Name;
                        joolaio.tests.fetch('base', title, _queryOptions);
                    }
                    catch (e) {
                        throw e;
                    }
                });

                //check entire mg
                var metricslist = '';
                $(_metrics).each(function (i, o) {
                    metricslist += o.Name + ',';
                });
                if (metricslist.length > 0)
                    metricslist = metricslist.substr(0, metricslist.length - 1);

                var _queryOptions = {
                    id:'primary',
                    FromDate:joolaio.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                    ToDate:joolaio.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                    Dimensions:'',
                    Metrics:metricslist,
                    Resolution:'Day',
                    omitDate:true,
                    Filter:''
                };
                try {
                    var title = '<a target="_blank" href="#URL">TEST RESULT: ' + 'Report: ' + report.Name + ', Tab: ' + tab.Name + ', MG: ' + mg.Name + ', Metrics: ALL';
                    joolaio.tests.fetch('base', title, _queryOptions);
                }
                catch (e) {
                    throw e;
                }

                var _dimensions = [];
                $(tab.Dimensions).each(function (did, dimension) {
                    _dimensions.push(dimension);
                    var _queryOptions = {
                        id:'primary',
                        FromDate:joolaio.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                        ToDate:joolaio.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                        Dimensions:dimension.Name,
                        Metrics:metricslist,
                        Resolution:'Day',
                        omitDate:true,
                        Filter:''
                    };
                    try {
                        var title = '<a target="_blank" href="#URL">TEST RESULT: ' + 'Report: ' + report.Name + ', Tab: ' + tab.Name + ', MG: ' + mg.Name + ', Metrics: ALL, Dimension: ' + dimension.Name;
                        joolaio.tests.fetch('base', title, _queryOptions);
                    }
                    catch (e) {
                        throw e;
                    }

                    $(joolaio.objects.Dimensions).each(function (sdid, sdimension) {
                        if (sdimension.ColumnName != sdimension.DictionaryTable_Column && dimension.Name != sdimension.Name) {
                            var _queryOptions = {
                                id:'primary',
                                FromDate:joolaio.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                                ToDate:joolaio.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                                Dimensions:dimension.Name + ',' + sdimension.Name,
                                Metrics:metricslist,
                                Resolution:'Day',
                                omitDate:true,
                                Filter:''
                            };
                            try {
                                var title = '<a target="_blank" href="#URL">TEST RESULT: ' + 'Report: ' + report.Name + ', Tab: ' + tab.Name + ', MG: ' + mg.Name + ', Metrics: ALL, Dimensions: ' + dimension.Name + ',' + sdimension.Name;
                                //joolaio.tests.fetch('deep', title, _queryOptions);
                            }
                            catch (e) {
                                throw e;
                            }
                        }
                    });

                    $(joolaio.objects.Dimensions).each(function (sdid, sdimension) {
                        if (sdimension.ColumnName != sdimension.DictionaryTable_Column && dimension.Name != sdimension.Name) {
                            var _queryOptions = {
                                id:'primary',
                                FromDate:joolaio.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                                ToDate:joolaio.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                                Dimensions:dimension.Name,
                                Metrics:metricslist,
                                Resolution:'Day',
                                omitDate:true,
                                Filter:sdimension.Name + '=' + 'abc'
                            };
                            try {
                                var title = '<a target="_blank" href="#URL">TEST RESULT: ' + 'Report: ' + report.Name + ', Tab: ' + tab.Name + ', MG: ' + mg.Name + ', Metrics: ALL, Dimension: ' + dimension.Name + ',  Filter: ' + sdimension.Name + '="abc"';
                                //joolaio.tests.fetch('filters', title, _queryOptions);

                            }
                            catch (e) {
                                throw e;
                            }
                        }
                    });
                });

                var dimlist = '';
                $(_dimensions).each(function (i, o) {
                    dimlist += o.Name + ',';
                });
                if (dimlist.length > 0)
                    dimlist = dimlist.substr(0, dimlist.length - 1);

                var _queryOptions = {
                    id:'primary',
                    FromDate:joolaio.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                    ToDate:joolaio.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                    Dimensions:dimlist,
                    Metrics:metricslist,
                    Resolution:'Day',
                    omitDate:true,
                    Filter:''
                };
                try {
                    var title = '<a target="_blank" href="#URL">TEST RESULT: ' + 'Report: ' + report.Name + ', Tab: ' + tab.Name + ', MG: ' + mg.Name + ', Metrics: ALL, Dimension: ALL';
                    joolaio.tests.fetch('base', title, _queryOptions);
                }
                catch (e) {
                    throw e;
                }


            });
        });
    });

    return result;
};


joolaio.tests.Base.RunTopLevel = function (sender, options, callback) {
    var result = false;

    joolaio.inSaveState = true;

    new joolaio.objects.Cache().PurgeResults();

    joolaio.objects.Dimensions.List();

    var startdate = options.startdate;
    var enddate = options.enddate;

    var reports = joolaio.objects.Reports.List();
    //joolaio.tests.Log('Found ' + reports.length + ' reports...','header');
    $(reports).each(function (rid, report) {
        //joolaio.tests.Log('Inspecting report "' + report.Name + '".', 'header');
        //console.log(report);
        $(report.Tabs).each(function (tid, tab) {
            //joolaio.tests.Log('Inspecting report tab "' + tab.Name + '".','header');
            //console.log(tab);

            //console.log('Drawing metrics');
            $(tab.MetricGroups).each(function (mgid, mg) {
                var _metrics = [];
                //joolaio.tests.Log('Inspecting metric group "' + mg.Name + '".','header');
                $(mg.Metrics).each(function (mid, metric) {
                    _metrics.push(metric);
                    // console.log('Checking metric "' + metric.Name + '"...');
                    var _queryOptions = {
                        id:'primary',
                        FromDate:joolaio.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                        ToDate:joolaio.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                        Dimensions:'',
                        Metrics:metric.Name,
                        Resolution:'Day',
                        omitDate:true,
                        Filter:''
                    };
                    try {
                        var title = '<a target="_blank" href="#URL">TEST RESULT: ' + 'Report: ' + report.Name + ', Tab: ' + tab.Name + ', MG: ' + mg.Name + ', Metric: ' + metric.Name;
                        joolaio.tests.fetch('base', title, _queryOptions);
                    }
                    catch (e) {
                        throw e;
                    }
                });

                //check entire mg
                var metricslist = '';
                $(_metrics).each(function (i, o) {
                    metricslist += o.Name + ',';
                });
                if (metricslist.length > 0)
                    metricslist = metricslist.substr(0, metricslist.length - 1);

                var _dimensions = [];
                $(tab.Dimensions).each(function (did, dimension) {
                    _dimensions.push(dimension);
                    var _queryOptions = {
                        id:'primary',
                        FromDate:joolaio.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                        ToDate:joolaio.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                        Dimensions:dimension.Name,
                        Metrics:metricslist,
                        Resolution:'Day',
                        omitDate:true,
                        Filter:''
                    };
                    try {
                        var title = '<a target="_blank" href="#URL">TEST RESULT: ' + 'Report: ' + report.Name + ', Tab: ' + tab.Name + ', MG: ' + mg.Name + ', Metrics: ALL, Dimension: ' + dimension.Name;
                        joolaio.tests.fetch('base', title, _queryOptions);
                    }
                    catch (e) {
                        throw e;
                    }

                });


            });
        });
    });

    return result;
};

joolaio.loaded.push('joolaio.tests.Base');
joolaio.debug.log('INFO', 'joolaio.tests.Base', 6, 'JS source loaded');
