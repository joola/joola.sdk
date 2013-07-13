jarvis.provide('jarvis.tests.Base');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.tests');

jarvis.tests.Log = function (message, type) {
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

jarvis.tests.updateDisplay = function () {
    if (!jarvis.tests.base.end)
        $('.base_txt_exec').html(jarvis.tests.base.executingcounter);
    else {
        $('.base_caption_exec').html('Queries Executed');
        $('.base_txt_exec').html(jarvis.tests.base.totalcounter);
    }

    $('.base_txt_failed').html(jarvis.tests.base.failedcounter);
    $('.base_txt_success').html(jarvis.string.roundNumber(jarvis.tests.base.successcounter / jarvis.tests.base.totalcounter * 100, 0, false) + '%');

    if (!jarvis.tests.deep.end)
        $('.deep_txt_exec').html(jarvis.tests.deep.executingcounter);
    else {
        $('.deep_caption_exec').html('Queries Executed');
        $('.deep_txt_exec').html(jarvis.tests.deep.totalcounter);
    }

    $('.deep_txt_failed').html(jarvis.tests.deep.failedcounter);
    $('.deep_txt_success').html(jarvis.string.roundNumber(jarvis.tests.deep.successcounter / jarvis.tests.deep.totalcounter * 100, 0, false) + '%');

    if (!jarvis.tests.filters.end)
        $('.filters_txt_exec').html(jarvis.tests.filters.executingcounter);
    else {
        $('.filters_caption_exec').html('Queries Executed');
        $('.filters_txt_exec').html(jarvis.tests.filters.totalcounter);
    }

    $('.filters_txt_failed').html(jarvis.tests.filters.failedcounter);
    $('.filters_txt_success').html(jarvis.string.roundNumber(jarvis.tests.filters.successcounter / jarvis.tests.filters.totalcounter * 100, 0, false) + '%');


    if (!timerset) {
        timerset = true;

        intervaltoken = setInterval(function () {
            if (!jarvis.tests.base.end)
                $('.base_txt_duration').html(jarvis.string.formatNumber((new Date() - jarvis.tests.base.start) / 1000, 0) + ' sec.');
            else {
                $('.base_txt_duration').html(jarvis.string.formatNumber((jarvis.tests.base.end - jarvis.tests.base.start) / 1000, 0) + ' sec.');

            }

            if (!jarvis.tests.deep.end)
                $('.deep_txt_duration').html(jarvis.string.formatNumber((new Date() - jarvis.tests.deep.start) / 1000, 0) + ' sec.');
            else {
                $('.deep_txt_duration').html(jarvis.string.formatNumber((jarvis.tests.deep.end - jarvis.tests.deep.start) / 1000, 0) + ' sec.');

            }

            if (!jarvis.tests.filters.end)
                $('.filters_txt_duration').html(jarvis.string.formatNumber((new Date() - jarvis.tests.filters.start) / 1000, 0) + ' sec.');
            else {
                $('.filters_txt_duration').html(jarvis.string.formatNumber((jarvis.tests.filters.end - jarvis.tests.filters.start) / 1000, 0) + ' sec.');

            }

            if (jarvis.tests.base.end && jarvis.tests.deep.end && jarvis.tests.filters.end)
                window.clearInterval(intervaltoken);
        }, 1000);
    }
}

jarvis.tests.base = {};
jarvis.tests.deep = {};
jarvis.tests.filters = {};

jarvis.tests.base.start = null;
jarvis.tests.base.end = null;

jarvis.tests.deep.start = null;
jarvis.tests.deep.end = null;

jarvis.tests.filters.start = null;
jarvis.tests.filters.end = null;

jarvis.tests.base.totalcounter = 0;
jarvis.tests.base.executingcounter = 0;
jarvis.tests.base.failedcounter = 0;
jarvis.tests.base.successcounter = 0;

jarvis.tests.deep.totalcounter = 0;
jarvis.tests.deep.executingcounter = 0;
jarvis.tests.deep.failedcounter = 0;
jarvis.tests.deep.successcounter = 0;

jarvis.tests.filters.totalcounter = 0;
jarvis.tests.filters.executingcounter = 0;
jarvis.tests.filters.failedcounter = 0;
jarvis.tests.filters.successcounter = 0;

jarvis.tests.startdate = new Date(2013, 0, 1);
jarvis.tests.enddate = new Date(2013, 0, 1);

jarvis.tests.servers= ['']

jarvis.tests.fetch = function (group, title, options) {
    try {
        switch (group) {
            case 'base':
                if (jarvis.tests.base.executingcounter == 0)
                    jarvis.tests.base.start = new Date();
                jarvis.tests.base.totalcounter++;
                jarvis.tests.base.executingcounter++;
                break;
            case 'deep':
                if (jarvis.tests.deep.executingcounter == 0)
                    jarvis.tests.deep.start = new Date();
                jarvis.tests.deep.totalcounter++;
                jarvis.tests.deep.executingcounter++;

                break;
            case 'filters':
                if (jarvis.tests.filters.executingcounter == 0)
                    jarvis.tests.filters.start = new Date();
                jarvis.tests.filters.totalcounter++;
                jarvis.tests.filters.executingcounter++;

                break;
            default:
                break;
        }

        jarvis.dataaccess.fetch(this, jarvis.tests.servers[0]+'/engine/Query.svc/fetch', options, function (sender, result, error) {
            title = title.replace('#URL', error.url);
            title = group + '::' + title;
            if (result.resultcode == "200") {
                //jarvis.tests.Log(title + ':: SUCCESS</a>');

                switch (group) {
                    case 'base':
                        jarvis.tests.base.executingcounter--;
                        jarvis.tests.base.successcounter++;

                        if (jarvis.tests.base.executingcounter == 0)
                            jarvis.tests.base.end = new Date();
                        break;
                    case 'deep':
                        jarvis.tests.deep.executingcounter--;
                        jarvis.tests.deep.successcounter++;

                        if (jarvis.tests.deep.executingcounter == 0)
                            jarvis.tests.deep.end = new Date();
                        break;
                    case 'filters':
                        jarvis.tests.filters.executingcounter--;
                        jarvis.tests.filters.successcounter++;

                        if (jarvis.tests.filters.executingcounter == 0)
                            jarvis.tests.filters.end = new Date();
                        break;
                    default:
                        break;
                }

                jarvis.tests.updateDisplay();
            }
            else {
                jarvis.tests.Log(title + ':: FAIL</a>', 'error');

                switch (group) {
                    case 'base':
                        jarvis.tests.base.executingcounter--;
                        jarvis.tests.base.failedcounter++;

                        if (jarvis.tests.base.executingcounter == 0)
                            jarvis.tests.base.end = new Date();
                        break;
                    case 'deep':
                        jarvis.tests.deep.executingcounter--;
                        jarvis.tests.deep.failedcounter++;

                        if (jarvis.tests.deep.executingcounter == 0)
                            jarvis.tests.deep.end = new Date();
                        break;
                    case 'filters':
                        jarvis.tests.filters.executingcounter--;
                        jarvis.tests.filters.failedcounter++;

                        if (jarvis.tests.filters.executingcounter == 0)
                            jarvis.tests.filters.end = new Date();
                        break;
                    default:
                        break;
                }

                jarvis.tests.updateDisplay();
            }
        });
    }
    catch (e) {
        switch (group) {
            case 'base':
                jarvis.tests.base.executingcounter--;
                jarvis.tests.base.failedcounter++;

                if (jarvis.tests.base.executingcounter == 0)
                    jarvis.tests.base.end = new Date();
                break;
            case 'deep':
                jarvis.tests.deep.executingcounter--;
                jarvis.tests.deep.failedcounter++;

                if (jarvis.tests.deep.executingcounter == 0)
                    jarvis.tests.deep.end = new Date();
                break;
            case 'filters':
                jarvis.tests.filters.executingcounter--;
                jarvis.tests.filters.failedcounter++;

                if (jarvis.tests.filters.executingcounter == 0)
                    jarvis.tests.filters.end = new Date();
                break;
            default:
                break;
        }
        jarvis.tests.Log(title + ':: EXCEPTION</a>', 'error');
        jarvis.tests.Log(e.message, 'error');
    }

    if (jarvis.tests.executingcounter == 0)
        jarvis.tests.end = new Date();

    jarvis.tests.updateDisplay();
}

jarvis.tests.Base.RunAll = function (sender, options, callback) {
    var result = false;

    jarvis.inSaveState = true;

    //new jarvis.objects.Cache().PurgeResults();

    jarvis.objects.Dimensions.List();

    var startdate = jarvis.tests.startdate;
    var enddate = jarvis.tests.enddate;

    var reports = jarvis.objects.Reports.List();
    jarvis.tests.Log('Found ' + reports.length + ' reports...','header');
    $(reports).each(function (rid, report) {
        //jarvis.tests.Log('Inspecting report "' + report.Name + '".', 'header');
        //console.log(report);
        $(report.Tabs).each(function (tid, tab) {
            //jarvis.tests.Log('Inspecting report tab "' + tab.Name + '".','header');
            //console.log(tab);

            //console.log('Drawing metrics');
            $(tab.MetricGroups).each(function (mgid, mg) {
                var _metrics = [];
                //jarvis.tests.Log('Inspecting metric group "' + mg.Name + '".','header');
                $(mg.Metrics).each(function (mid, metric) {
                    _metrics.push(metric);
                    // console.log('Checking metric "' + metric.Name + '"...');
                    var _queryOptions = {
                        id:'primary',
                        FromDate:jarvis.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                        ToDate:jarvis.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                        Dimensions:'',
                        Metrics:metric.Name,
                        Resolution:'Day',
                        omitDate:true,
                        Filter:''
                    };
                    try {
                        var title = '<a target="_blank" href="#URL">TEST RESULT: ' + 'Report: ' + report.Name + ', Tab: ' + tab.Name + ', MG: ' + mg.Name + ', Metric: ' + metric.Name;
                        jarvis.tests.fetch('base', title, _queryOptions);
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
                    FromDate:jarvis.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                    ToDate:jarvis.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                    Dimensions:'',
                    Metrics:metricslist,
                    Resolution:'Day',
                    omitDate:true,
                    Filter:''
                };
                try {
                    var title = '<a target="_blank" href="#URL">TEST RESULT: ' + 'Report: ' + report.Name + ', Tab: ' + tab.Name + ', MG: ' + mg.Name + ', Metrics: ALL';
                    jarvis.tests.fetch('base', title, _queryOptions);
                }
                catch (e) {
                    throw e;
                }

                var _dimensions = [];
                $(tab.Dimensions).each(function (did, dimension) {
                    _dimensions.push(dimension);
                    var _queryOptions = {
                        id:'primary',
                        FromDate:jarvis.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                        ToDate:jarvis.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                        Dimensions:dimension.Name,
                        Metrics:metricslist,
                        Resolution:'Day',
                        omitDate:true,
                        Filter:''
                    };
                    try {
                        var title = '<a target="_blank" href="#URL">TEST RESULT: ' + 'Report: ' + report.Name + ', Tab: ' + tab.Name + ', MG: ' + mg.Name + ', Metrics: ALL, Dimension: ' + dimension.Name;
                        jarvis.tests.fetch('base', title, _queryOptions);
                    }
                    catch (e) {
                        throw e;
                    }

                    $(jarvis.objects.Dimensions).each(function (sdid, sdimension) {
                        if (sdimension.ColumnName != sdimension.DictionaryTable_Column && dimension.Name != sdimension.Name) {
                            var _queryOptions = {
                                id:'primary',
                                FromDate:jarvis.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                                ToDate:jarvis.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                                Dimensions:dimension.Name + ',' + sdimension.Name,
                                Metrics:metricslist,
                                Resolution:'Day',
                                omitDate:true,
                                Filter:''
                            };
                            try {
                                var title = '<a target="_blank" href="#URL">TEST RESULT: ' + 'Report: ' + report.Name + ', Tab: ' + tab.Name + ', MG: ' + mg.Name + ', Metrics: ALL, Dimensions: ' + dimension.Name + ',' + sdimension.Name;
                                //jarvis.tests.fetch('deep', title, _queryOptions);
                            }
                            catch (e) {
                                throw e;
                            }
                        }
                    });

                    $(jarvis.objects.Dimensions).each(function (sdid, sdimension) {
                        if (sdimension.ColumnName != sdimension.DictionaryTable_Column && dimension.Name != sdimension.Name) {
                            var _queryOptions = {
                                id:'primary',
                                FromDate:jarvis.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                                ToDate:jarvis.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                                Dimensions:dimension.Name,
                                Metrics:metricslist,
                                Resolution:'Day',
                                omitDate:true,
                                Filter:sdimension.Name + '=' + 'abc'
                            };
                            try {
                                var title = '<a target="_blank" href="#URL">TEST RESULT: ' + 'Report: ' + report.Name + ', Tab: ' + tab.Name + ', MG: ' + mg.Name + ', Metrics: ALL, Dimension: ' + dimension.Name + ',  Filter: ' + sdimension.Name + '="abc"';
                                //jarvis.tests.fetch('filters', title, _queryOptions);

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
                    FromDate:jarvis.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                    ToDate:jarvis.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                    Dimensions:dimlist,
                    Metrics:metricslist,
                    Resolution:'Day',
                    omitDate:true,
                    Filter:''
                };
                try {
                    var title = '<a target="_blank" href="#URL">TEST RESULT: ' + 'Report: ' + report.Name + ', Tab: ' + tab.Name + ', MG: ' + mg.Name + ', Metrics: ALL, Dimension: ALL';
                    jarvis.tests.fetch('base', title, _queryOptions);
                }
                catch (e) {
                    throw e;
                }


            });
        });
    });

    return result;
};


jarvis.tests.Base.RunTopLevel = function (sender, options, callback) {
    var result = false;

    jarvis.inSaveState = true;

    new jarvis.objects.Cache().PurgeResults();

    jarvis.objects.Dimensions.List();

    var startdate = options.startdate;
    var enddate = options.enddate;

    var reports = jarvis.objects.Reports.List();
    //jarvis.tests.Log('Found ' + reports.length + ' reports...','header');
    $(reports).each(function (rid, report) {
        //jarvis.tests.Log('Inspecting report "' + report.Name + '".', 'header');
        //console.log(report);
        $(report.Tabs).each(function (tid, tab) {
            //jarvis.tests.Log('Inspecting report tab "' + tab.Name + '".','header');
            //console.log(tab);

            //console.log('Drawing metrics');
            $(tab.MetricGroups).each(function (mgid, mg) {
                var _metrics = [];
                //jarvis.tests.Log('Inspecting metric group "' + mg.Name + '".','header');
                $(mg.Metrics).each(function (mid, metric) {
                    _metrics.push(metric);
                    // console.log('Checking metric "' + metric.Name + '"...');
                    var _queryOptions = {
                        id:'primary',
                        FromDate:jarvis.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                        ToDate:jarvis.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                        Dimensions:'',
                        Metrics:metric.Name,
                        Resolution:'Day',
                        omitDate:true,
                        Filter:''
                    };
                    try {
                        var title = '<a target="_blank" href="#URL">TEST RESULT: ' + 'Report: ' + report.Name + ', Tab: ' + tab.Name + ', MG: ' + mg.Name + ', Metric: ' + metric.Name;
                        jarvis.tests.fetch('base', title, _queryOptions);
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
                        FromDate:jarvis.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                        ToDate:jarvis.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                        Dimensions:dimension.Name,
                        Metrics:metricslist,
                        Resolution:'Day',
                        omitDate:true,
                        Filter:''
                    };
                    try {
                        var title = '<a target="_blank" href="#URL">TEST RESULT: ' + 'Report: ' + report.Name + ', Tab: ' + tab.Name + ', MG: ' + mg.Name + ', Metrics: ALL, Dimension: ' + dimension.Name;
                        jarvis.tests.fetch('base', title, _queryOptions);
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

jarvis.loaded.push('jarvis.tests.Base');
jarvis.debug.log('INFO', 'jarvis.tests.Base', 6, 'JS source loaded');
