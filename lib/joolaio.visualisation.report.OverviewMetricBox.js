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


joolaio.provide('joolaio.visualisation.report.OverviewMetricBox');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

//joolaio.require('joolaio.dashboard');
joolaio.require('joolaio.visualisation.report');

/**
 * Create and install a realtime timeline handler.
 * @constructor
 * @param {string=} options optional options to be passed to class
 */

joolaio.visualisation.report.OverviewMetricBox = function (options) {
    var start = new Date().getMilliseconds();

    this._this = this;
    this.options = options;

    this.default_caption = 'Right now';
    this.default_subcaption = 'Events per Second';
    this.default_useAverage = true;

    this.key = '';

    this.initialized = false;
    this.gettingBackData = false;
    this.initialCallbacks = [];
    this.initialTimestamp = null;
    this.Resolution = 'Day';
    this.containers = [];

    this.DateBox = joolaio.visualisation.picker.DateBox;

    joolaio.objects.Dimensions.List();
    joolaio.objects.Metrics.List();

    var executionTime = new Date().getMilliseconds() - start;
    //joolaio.debug.log('INFO', 'joolaio.visualisation.report.OverviewMetricBox', 5, '...Constructor (' + executionTime + 'ms)');
};


/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
joolaio.visualisation.report.OverviewMetricBox.prototype.init = function (options, container) {
    var _this = this;
    var start = new Date().getMilliseconds();

    this._this = this;
    this.options = options;

    this.containers = this.containers || [];
    this.metrics = [];

    //this.DateBox = joolaio.visualisation.picker.DateBox;

    //lookup any containers relevant for the timeline
    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.joolaio.report.overviewmetricbox');
    if (matchedContainers.length == 0)
        return;

    //_this.Container = matchedContainers;

    $(matchedContainers).each(function (index, item) {
        if (!$(this).parent().hasClass('prettyprint')) {
            joolaio.debug.log('INFO', 'joolaio.visualisation.report.OverviewMetricBox', 6, 'Applying to container (\'' + this.id + '\')');

            var _metrics = $(item).attr('data-metrics');
            if (!_metrics)
                return;
            _metrics = _metrics.split(',');
            $(_metrics).each(function (index, item) {
                _metrics[index] = $.trim(_metrics[index]);
                _this.metrics.push(_metrics[index]);
            });

            $(joolaio.dataaccess.metrics).each(function (index, item) {
                if (_metrics.indexOf(item.Name) > -1)
                    _this.metrics[_metrics.indexOf(item.Name)] = item;
            });

            $(this).bind('data', function (evt, ret) {
                ret.data = $(this).data().data;
            });

            $(this).bind('click', function (evt) {
                $(this).trigger('clicked', $(this).data().data);
            });

            $(joolaio.visualisation.report).bind('filter', function (filter) {
                _this.fetch(_this);
            });

            $(item).empty();
            _this.draw(item);
            _this.fetch(_this, item);

            $(this).find('.settings').off('click');
            $(this).find('.settings').on('click', function (e) {
                joolaio.getDashboard().showEditWidget({_this:joolaio.getDashboard(), container:joolaio.getDashboard().container, addNew:false, widgetID:$(item).attr('data-widgetid'), sender:_this, sendercontainer:item });
            });

            _this.containers.push(item);
        }
    });

    $(_this.DateBox).bind('datechange', function () {
        //console.log('datachange');
        $(_this.containers).each(function (i, container) {
            _this.fetch(_this, container);
        })
    });

    var executionTime = new Date().getMilliseconds() - start;
    joolaio.debug.log('INFO', 'joolaio.Visualisation.report.OverviewMetricBox', 5, '...init (' + executionTime + 'ms)');
};

/**
 * Inits the class and builds the base html for it.
 * @return (string) returns the base html to be applied in the container
 */

joolaio.visualisation.report.OverviewMetricBox.prototype.fetch = function (sender, container) {
    if (!sender)
        sender = joolaio.visualisation.report.OverviewMetricBox;

    var _this = sender;

    var startdate = joolaio.visualisation.picker.DateBox.getDate().base_fromdate;
    var enddate = joolaio.visualisation.picker.DateBox.getDate().base_todate;
    if (_this.DateBox.comparePeriod) {
        //console.log('compare');
        var compare_startdate = joolaio.visualisation.picker.DateBox.getDate().compare_fromdate;
        var compare_enddate = joolaio.visualisation.picker.DateBox.getDate().compare_todate;
    }

    var _metrics = $(container).attr('data-metrics');
    //console.log(_metrics);
    if (!_metrics)
        return '';
    _metrics = _metrics.split(',');
    $(_metrics).each(function (index, item) {
        var imetric = -1;
        $(joolaio.dataaccess.metrics).each(function (i, o) {
            //console.log(o.Name);
            if (o.Name == $.trim(item))
                imetric = i;
        })
        //console.log('found ' + imetric);
        _metrics[index] = joolaio.dataaccess.metrics[imetric];
    });

    if (typeof _metrics[0] == 'undefined')
        return '';

    $(_metrics).each(function (index, metric) {
        var queryOptions = [];
        var _queryOptions = {
            id:'primary',
            FromDate:joolaio.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
            ToDate:joolaio.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
            Dimensions:'',
            Metrics:metric.Name,
            Resolution:_this.Resolution,
            omitDate:false,
            Filter:joolaio.visualisation.dashboard.globalfilter
        };
        queryOptions.push(_queryOptions);

        _queryOptions = {
            id:'primary_total',
            FromDate:joolaio.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
            ToDate:joolaio.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
            Dimensions:'',
            Metrics:metric.Name,
            Resolution:_this.Resolution,
            omitDate:true,
            Filter:joolaio.visualisation.dashboard.globalfilter
        };
        queryOptions.push(_queryOptions);

        if (_this.DateBox.comparePeriod) {
            _queryOptions = {
                id:'compare_primary',
                FromDate:joolaio.date.formatDate(compare_startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                ToDate:joolaio.date.formatDate(compare_enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                Dimensions:'',
                Metrics:metric.Name,
                Resolution:_this.Resolution,
                omitDate:false,
                Filter:joolaio.visualisation.dashboard.globalfilter
            };
            queryOptions.push(_queryOptions);

            _queryOptions = {
                id:'compare_primary_total',
                FromDate:joolaio.date.formatDate(compare_startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                ToDate:joolaio.date.formatDate(compare_enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                Dimensions:'',
                Metrics:metric.Name,
                Resolution:_this.Resolution,
                omitDate:true,
                Filter:joolaio.visualisation.dashboard.globalfilter
            };
            queryOptions.push(_queryOptions);
        }

        if (joolaio.visualisation.dashboard.globalfilter && joolaio.visualisation.dashboard.globalfilter != '') {
            var _queryOptions = {
                id:'total',
                FromDate:joolaio.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                ToDate:joolaio.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                Dimensions:'',
                Metrics:metric.Name,
                Resolution:_this.Resolution,
                omitDate:false,
                Filter:''
            };
            queryOptions.push(_queryOptions);
        }
        if (_this.DateBox.comparePeriod && joolaio.visualisation.dashboard.globalfilter && joolaio.visualisation.dashboard.globalfilter != '') {
            _queryOptions = {
                id:'compare_total',
                FromDate:joolaio.date.formatDate(compare_startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                ToDate:joolaio.date.formatDate(compare_enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                Dimensions:'',
                Metrics:metric.Name,
                Resolution:_this.Resolution,
                omitDate:false,
                Filter:''
            };
            queryOptions.push(_queryOptions);
        }

        joolaio.dataaccess.multifetch(_this, '/engine/Query.svc/fetch', queryOptions, function (sender, data, error) {
            var series = [];
            $(data).each(function (index, item) {
                try {
                    //var result = $.parseJSON(item.data).Result;
                    //var request = $.parseJSON(item.data).Request;
                    //var _data = $.parseJSON(item.data).Result.Rows;
                    //console.log(item);
                    if (item.id == 'primary' || item.id == 'compare_primary') {
                        var result = item.data.Result;
                        var request = item.data.Request;
                        var _data = item.data.Result.Rows;

                        var points = {
                            total:0,
                            ftotal:0,
                            data:[],
                            id:data.id
                        };
                        $(_data).each(function (i, row) {
                            var point = {
                                value:row.Values[1],
                                fvalue:row.FormattedValues[1]
                            };
                            points.total += parseFloat(point.value);
                            points.data.push(point);
                        });

                        if (metric.aggregation == "AVG") {
                            points.avg = points.total / _data.length;
                        }

                        $(data).each(function (i, o) {
                            if (o.id.indexOf(item.id + '_total') == 0) {
                                //console.log(o.id,'1');
                                var _data = o.data.Result.Rows;
                                //console.log(_data);
                                //console.log(series[0]);
                                $(_data[0]).each(function (i, row) {
                                    points.total = parseFloat(row.Values[0]);
                                    points.ftotal = row.FormattedValues[0];
                                    //console.log(points.total);
                                })
                            }
                        });

                        series.push(points);
                    }

                }
                catch (ex) {

                }
            });

            //console.log(series);

            if (_this.DateBox.comparePeriod == false) {
                _this.update(sender, metric, series, container);
            }
            else
                _this.updateCompare(sender, metric, series, container);
        });
    });
};

joolaio.visualisation.report.OverviewMetricBox.prototype.update = function (sender, metric, series, container) {
    var _this = sender;

    //$('.overviewmetricbox.widget').css('height','45px');
    //console.log(series);

    if (!series[0])
        return;

    /*
     $(series).each(function (si, so) {
     if (metric.DataType == 'INT')
     so.ftotal = joolaio.string.formatNumber(so.total, 0, true);
     else if (metric.DataType == 'FLOAT')
     so.ftotal = joolaio.string.formatNumber(so.total, 2, true);
     else
     so.ftotal = joolaio.string.formatNumber(so.total, 0, true);

     if (metric.Suffix && metric.Suffix != '')
     so.ftotal += metric.Suffix;
     if (metric.Prefix && metric.Prefix != '')
     so.ftotal = metric.Prefix + so.ftotal;
     });*/

    $(series[0]).each(function (si, so) {
        ($(container).find('.compare')).hide();
        var $metric = ($(container).find('.base'));

        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn('number');
        dataTable.addRows(so.data.length);

        var totalsum = so.total;
        $(so.data).each(function (i, row) {
            //totalsum += parseInt(row.value);
            dataTable.setValue(i, 0, Math.round(parseFloat(row.value)));
        });

        var datebox = joolaio.visualisation.picker.DateBox;
        var ratio;
        //console.log(metric);

        /*
        if (metric.AggregationType == "AVG") {
            ratio = 0;
            if (series[0].total > 0)
                ratio = percentageChange((series.length == 1 ? series[0].total : series[1].total), series[0].total);
            if (series.length == 1)
                $metric.find('.site').html('Overall Avg: <span class="summaryvalue">' + so.ftotal + '</span> (' + joolaio.string.formatNumber(ratio, 2) + '%)');
            else {
                $metric.find('.site').html('% of Total: <span class="summaryvalue">' + joolaio.string.formatNumber(ratio, 2) + '%</span> (' + series[1].ftotal + ')');
            }
        }
        else {
            ratio = 100;
            if (totalsum > 0)
                ratio = series[0].total / (series.length == 1 ? series[0].total : series[1].total) * 100;
            if (!joolaio.visualisation.dashboard.globalfilter || joolaio.visualisation.dashboard.globalfilter == '')
                $metric.find('.site').html('% of Total: <span class="summaryvalue">' + joolaio.string.formatNumber(ratio, 2) + '%</span> (' + so.ftotal + ')');
            else {
                $metric.find('.site').html('% of Total: <span class="summaryvalue">' + joolaio.string.formatNumber(ratio, 2) + '%</span> (' + series[1].ftotal + ')');
            }
        }*/

        if (metric.DataType == 'INT')
            totalsum = joolaio.string.formatNumber(totalsum, 0, true);
        else if (metric.DataType == 'FLOAT')
            totalsum = joolaio.string.formatNumber(totalsum, 2, true);
        else
            totalsum = joolaio.string.formatNumber(totalsum, 0, true);

        if (metric.suffix && metric.suffix != '')
            totalsum += metric.suffix;
        if (metric.prefix && metric.prefix != '')
            totalsum = metric.prefix + totalsum;

        $metric.find('.daterange').html(datebox.formatDate(datebox.getDate().base_fromdate) + ' - ' + datebox.formatDate(datebox.getDate().base_todate));


        //if (metric.AggregationType == "AVG") {

        //console.log('avg');
        //       $metric.find('.value').html(joolaio.string.formatNumber(so.avg, 2) + '%');
        //}
        // else {
        $metric.find('.value').removeClass('positive');
        $metric.find('.value').removeClass('negative');
        $metric.find('.value').html(so.ftotal);
        //}

        $metric.find('.site').empty();

        try {
            //console.log(dataTable);
            var vis = new google.visualization.ImageChart($($metric.find('.minichart')).get(0));
            var goptions = {
                cht:'ls',
                chs:'75x18',
                chco:'0077CC',
                chdlp:'b',
                chls:'2',
                chm:'B,E6F2FA,0,0,0',
                chxt:'',
                chxr:''
            };
            vis.draw(dataTable, goptions);
        }
        catch (ex) {
            throw '(drawSpark) ' + 'Exception: ' + ex.message;
        }
    });
};

joolaio.visualisation.report.OverviewMetricBox.prototype.updateCompare = function (sender, metric, series, container) {

    //console.log('updatecompare');

    //$('.overviewmetricbox.widget').css('height','65px');

    var _this = sender;
    if (!series[0])
        return;

    /*
     $(series).each(function (si, so) {
     if (metric.DataType == 'INT')
     so.ftotal = joolaio.string.formatNumber(so.total, 0, true);
     else if (metric.DataType == 'FLOAT')
     so.ftotal = joolaio.string.formatNumber(so.total, 2, true);
     else
     so.ftotal = joolaio.string.formatNumber(so.total, 0, true);

     if (metric.Suffix && metric.Suffix != '')
     so.ftotal += metric.Suffix;
     if (metric.Prefix && metric.Prefix != '')
     so.ftotal = metric.Prefix + so.ftotal;
     });
     */

    var si = 0;
    var so = series[0];
    var $metric = $(container);
    $metric = ($(container).find('.base'));
    ($(container).find('.compare')).hide();

    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn('number');
    dataTable.addColumn('number');
    dataTable.addRows(series[0].data.length);

    var totalsum = so.total;
    var compare_totalsum = series[1].total;
    $(so.data).each(function (i, row) {
        dataTable.setValue(i, 0, Math.round(parseFloat(row.value), Math.round(parseFloat(series[1].data[i].value))));
        dataTable.setValue(i, 1, Math.round(parseFloat(series[1].data[i].value)));
    });
    var datebox = joolaio.visualisation.picker.DateBox;
    var ratio;

    ratio = percentageChange(compare_totalsum, totalsum);
    //console.log(totalsum, compare_totalsum, ratio);

    $metric.find('.value').removeClass('positive');
    $metric.find('.value').removeClass('negative');

    var _class = '';
    if (metric.RatioDirection == -1 && ratio < 0)
        _class = 'positive';
    if (metric.RatioDirection == -1 && ratio > 0)
        _class = 'negative';
    if (metric.RatioDirection == 1 && ratio > 0)
        _class = 'positive';
    if (metric.RatioDirection == 1 && ratio < 0)
        _class = 'negative';

    ratio = joolaio.string.formatNumber(ratio, 2, true) + '%';

    $metric.find('.value').html(ratio);
    $metric.find('.value').addClass(_class);
    // if (_this.DateBox.comparePeriod)
    //     $metric.find('.daterange').show();

    $metric.find('.site').html('<span class="summaryvalue">' + series[0].ftotal + ' vs. ' + series[1].ftotal + '</span>');

    try {
        var vis = new google.visualization.ImageChart($($metric.find('.minichart')).get(0));
        var goptions = {
            cht:'ls',
            chs:'75x18',
            chco:'0077CC,AADFF3',
            chdlp:'b',
            chls:'2|1',
            chm:'B,E6F2FA,0,0,0',
            chxt:'',
            chxr:''
        };
        vis.draw(dataTable, goptions);
    }
    catch (ex) {
        throw '(drawSpark:compare) ' + 'Exception: ' + ex.message;
    }
};

joolaio.visualisation.report.OverviewMetricBox.prototype.draw = function (container) {
    var _this = this;

    //var metrics = _this.metrics;//$(Container).attr('data-metrics');
    //metrics = metrics.split(',');
    //$(metrics).each(function (index, item) {
    //item = $.trim(item);
    //console.log(item);

    var title = 'TITLE';
    var dimensions = 'DIMENSION';
    var metrics = this.default_subcaption;

    //console.log(container);

    if ($(container).attr('data-title')) {
        title = $(container).attr('data-title');
    }
    if ($(container).attr('data-dimensions')) {
        dimensions = $(container).attr('data-dimensions');
    }
    if ($(container).attr('data-metrics')) {
        metrics = $(container).attr('data-metrics');
    }

    var $html = $('<div class="wrapper"></div>');
    $html.append('<div class="">' +
        '<div class="content">' +
        '<div class="base">' +
        '<div class="minichart"></div>' +
        '<div class="metricname">' + _this.metrics[0].Name + ':</div>' +
        '<div class="value"></div>' +
        '<div class="site"></div>' +
        '</div>' +
        '</div>' +
        '' +
        '</div>');
    $();

    var _metric = _this.metrics[0];

    $($html).off('click');
    $($html).on('click', function (e) {
        try {
            $(joolaio.visualisation).trigger('metricbox-primarymetric', [_this, _metric]);
        }
        catch (ex) {
            //ignore
        }
    });

    $(container).append($html);


    return;

    var _html = '<div class="dashboard_metricbox"  data-metric="' + 0 + '"></div>';
    var $html = $(_html);
    $(Container).append($html);

    _html = '<div class="caption">asd' + 'asd' + '</div>' +
        '<div class="value">asd</div>' +
        '<div class="summary">asd</div>' +
        '<div class="minichart">asd</div>';

    $html.append(_html);

    //console.log($($(Container).find('.minichart')).get(0));

    try {
        var vis = new google.visualization.ImageChart($($(Container).find('.minichart')).get(0));
        var goptions = {
            cht:'ls',
            chs:'75x18',
            chco:'0077CC',
            chdlp:'b',
            chls:'2',
            chm:'B,E6F2FA,0,0,0',
            chxt:'',
            chxr:''
        };
        vis.draw(dataTable, goptions);
    }
    catch (ex) {
        throw '(' + _this._moduleName + '.drawSpark) ' + 'Exception: ' + ex.message;
    }

    // });
};

joolaio.debug.log('INFO', 'joolaio.Visualisation.report.OverviewMetricBox', 6, 'JS source loaded');

/**
 * init the Timeline and look for containers
 */
//new joolaio.visualisation.report.OverviewMetricBox().init();
