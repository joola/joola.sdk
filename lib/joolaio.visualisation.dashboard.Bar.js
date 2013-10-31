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

joolaio.provide('joolaio.visualisation.dashboard.Bar');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

//joolaio.require('joolaio.dashboard');
joolaio.require('joolaio.visualisation.dashboard');

/**
 * Initializes a new dashboard visualisation object.
 * @class Implements a visualisation dashboard Timeline
 * @requires joolaio.debug
 * @requires joolaio.date
 * @requires joolaio.string
 * @requires joolaio.visualisation.dashboard
 * @param options {object} base settings for the object.
 * @constructor
 */
joolaio.visualisation.dashboard.Bar = function (options) {
    var start = new Date().getMilliseconds();
    this._this = this;
    this.options = options;

    this.default_caption = 'Right now';
    this.default_subcaption = 'Events per Second';
    this.default_useAverage = true;

    this.key = '';
    this.itemCount = 10;
    this.initialized = false;
    this.gettingBackData = false;
    this.initialCallbacks = [];
    this.initialTimestamp = null;
    this.Resolution = 'Day';
    this.containers = [];

    joolaio.objects.Dimensions.List();
    joolaio.objects.Metrics.List();

    var executionTime = new Date().getMilliseconds() - start;
    //joolaio.debug.log('INFO', 'joolaio.visualisation.dashboard.Bar', 5, '...Constructor (' + executionTime + 'ms)');
};


/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
joolaio.visualisation.dashboard.Bar.prototype.init = function (options, container) {

    //console.log('draw chart');

    var _this = this;
    var start = new Date().getMilliseconds();

    this._this = this;
    this.options = $.extend({
        height: 235
    }, options);
    this.containers = this.containers || [];
    this.dimensions = [];
    this.metrics = [];

    this.DateBox = joolaio.visualisation.picker.DateBox;

    $(joolaio.realtime).bind('filterchange', function (e) {

    });

    //lookup any containers relevant for the timeline
    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.joolaio.dashboard.bar');
    if (matchedContainers.length == 0)
        return;

    //_this.Container = matchedContainers;

    $(matchedContainers).each(function (index, item) {
        if (!$(this).parent().hasClass('prettyprint')) {
            joolaio.debug.log('INFO', 'joolaio.visualisation.dashboard.Bar', 6, 'Applying to container (\'' + this.id + '\')');

            var _height = $(item).attr('data-height');
            if (_height)
                _this.options.height = _height;
            var _itemcount = $(item).attr('data-limit');
            if (_itemcount)
                _this.itemCount = _itemcount;

            //console.log('item count', _this.itemCount);


            var _metrics = $(item).attr('data-metrics');
            if (!_metrics)
                return;
            _metrics = _metrics.split(',');
            $(_metrics).each(function (index, item) {
                _metrics[index] = $.trim(_metrics[index]);
                _this.metrics.push(_metrics[index]);
            });

            $(joolaio.objects.Metrics).each(function (index, item) {
                if (_metrics.indexOf(item.id) > -1)
                    _this.metrics[_metrics.indexOf(item.id)] = item;
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
                joolaio.getDashboard().showEditWidget({_this: joolaio.getDashboard(), container: joolaio.getDashboard().container, addNew: false, widgetID: $(item).attr('data-widgetid'), sender: _this, sendercontainer: item });
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
    joolaio.debug.log('INFO', 'joolaio.visualisation.dashboard.Bar', 5, '...init (' + executionTime + 'ms)');
};

/**
 * Inits the class and builds the base html for it.
 * @return (string) returns the base html to be applied in the container
 */

joolaio.visualisation.dashboard.Bar.prototype.fetch = function (sender, container) {
    if (!sender)
        sender = joolaio.dashboard.visualisation.Pie;

    var _this = sender;

    var startdate = joolaio.visualisation.picker.DateBox.getDate().base_fromdate;
    var enddate = joolaio.visualisation.picker.DateBox.getDate().base_todate;
    if (_this.DateBox.comparePeriod) {
        //console.log('compare');
        var compare_startdate = joolaio.visualisation.picker.DateBox.getDate().compare_fromdate;
        var compare_enddate = joolaio.visualisation.picker.DateBox.getDate().compare_todate;
    }

    var _metrics = $(container).attr('data-metrics');
    var _metricslist = _metrics;

    var _dimensions = $(container).attr('data-dimensions');
    var _dimensionslist = _dimensions;


    if (!_metrics)
        return '';
    _metrics = _metrics.split(',');
    $(_metrics).each(function (index, item) {
        var mindex = -1;
        $(joolaio.objects.Metrics).each(function (mi, mo) {
            if (mo.id == $.trim(item))
                mindex = mi;
        });
        _metrics[index] = joolaio.objects.Metrics[mindex];
        _this.metrics.push(_metrics[index]);
    });

    $(joolaio.objects.Metrics).each(function (index, item) {
        if (_metrics.indexOf(item.id) > -1)
            _this.metrics[_metrics.indexOf(item.id)] = item;
    });


    if (!_metrics)
        return '';


    if (!_dimensions)
        return '';
    _dimensions = _dimensions.split(',');
    $(_dimensions).each(function (index, item) {
        var mindex = -1;
        $(joolaio.objects.Dimensions).each(function (mi, mo) {
            if (mo.id == $.trim(item))
                mindex = mi;
        });
        _dimensions[index] = joolaio.objects.Dimensions[mindex];
        _this.dimensions.push(_dimensions[index]);
    });

    $(joolaio.objects.Dimensions).each(function (index, item) {
        if (_dimensions.indexOf(item.id) > -1)
            _this.dimensions[_dimensions.indexOf(item.id)] = item;
    });


    if (!_dimensions)
        return '';

    /*
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
     */
    //$(_metrics).each(function (index, metric) {
    var queryOptions = [];
    var _queryOptions = {
        id: 'primary',
        startdate: joolaio.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
        enddate: joolaio.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
        dimensions: _dimensionslist,
        metrics: _metricslist,
        resolution: _this.Resolution,
        omitDate: true,
        filter: joolaio.visualisation.dashboard.globalfilter,
        sortKey: _metrics[_metrics.length - 1].id,
        sortDir: 'DESC'
    };
    queryOptions.push(_queryOptions);

    //console.log(_metrics[_metrics.length - 1].Name);

    if (_this.DateBox.comparePeriod) {
        _queryOptions = {
            id: 'compare_primary',
            startdate: joolaio.date.formatDate(compare_startdate, 'yyyy-mm-dd hh:nn:ss.000'),
            enddate: joolaio.date.formatDate(compare_enddate, 'yyyy-mm-dd hh:nn:ss.999'),
            dimensions: _dimensionslist,
            metrics: _metricslist,
            resolution: _this.Resolution,
            omitDate: true,
            filter: joolaio.visualisation.dashboard.globalfilter,
            sortKey: _metrics[_metrics.length - 1].id,
            sortDir: 'DESC'
        };
        queryOptions.push(_queryOptions);
    }

    //console.log(queryOptions);
    joolaio.dataaccess.multifetch(_this, '/query/fetch', queryOptions, function (sender, data, error) {
        var series = [];
        $(data).each(function (index, item) {
            try {
                var result = item.data.Result;
                var request = item.data.Request;
                var data = item.data.Result;
                var _data = item.data.Result.Rows;

                if (data.Columns.length == 2) {
                    //var localdata = {};
                    //jQuery.extend(true, localdata, data);
                    //localdata.Columns.splice(2, 1);
                    item.data.Result.id = item.id;
                    series.push(item.data.Result);
                }
                else {
                    var localdata = {};
                    jQuery.extend(true, localdata, data);
                    localdata.Columns.splice(2, 1);
                    localdata.id = item.id;
                    $(localdata.Rows).each(function (i, row) {
                        var point = row;
                        localdata.Rows[i].FormattedValues.splice(2, 1);
                        localdata.Rows[i].Values.splice(2, 1);
                    });
                    series.push(localdata);

                    localdata = {};
                    jQuery.extend(true, localdata, data);
                    localdata.Columns.splice(1, 1);
                    localdata.id = item.id;
                    $(localdata.Rows).each(function (i, row) {
                        var point = row;
                        localdata.Rows[i].FormattedValues.splice(1, 1);
                        localdata.Rows[i].Values.splice(1, 1);
                    });
                    series.push(localdata);
                }
            }
            catch (ex) {

            }
        });

        _this.update(sender, _metrics, series, container);
    });
};

joolaio.visualisation.dashboard.Bar.prototype.update = function (sender, metrics, series, container) {
    var _this = sender;

    // console.log(series);
    //return;
    if (!series[0])
        return;

    var $wrapper = $(container);
    var _itemcount = $(container).attr('data-limit');
    if (_itemcount)
        _this.itemCount = _itemcount;

    //console.log(_itemcount);

    var $container = $($(container).find('.chart'));

    //console.log($container);

    var columns = series[0].Columns;
    var data = series[0].Rows;

    var _totalsum = 0;
    $(data).each(function (index, row) {
        _totalsum += parseFloat(row.Values[row.Values.length - 1]);
    });

    //console.log($container.get(0));
    var chart = new Highcharts.Chart({
        chart: {
            height: _this.options.height,
            marginTop: 0,
            marginLeft: -15, //0
            marginRight: -20, //0
            marginBottom: 50, //25
            spacingLeft: 0,
            spacingTop: 15,
            spacingRight: 0,
            spacingBottom: 0,
            renderTo: $container.get(0),
            animation: false,
            type: 'column',
            //zoomType: 'x',
            events: {
                load: function () {

                },
                redraw: function () {
                    $wrapper.find('.joolaio.legend').empty();

                    var _series = chart.series;
                    //console.log('_series', _series);
                    $(_series).each(function (index, series) {
                        var seriesname = '';
                        var _html = '';

                        seriesname = series.name;
                        _html = '<span style="border: 5px solid white; border-color: ' + series.color + '; border-radius: 5px;height: 0px; display: inline-block; width: 0px;margin-left:10px;"></span>&nbsp;';
                        _html += '<span class="joolaio legendseries" data-id="0">' + seriesname + '</span>';
                        $wrapper.find('.joolaio.legend').append(_html);
                    });
                },
                selection: function (event) {
                }
            }
        },
        title: {text: null},
        xAxis: {
            categories: function () {
                var result = [];
                var totalsum = 0;
                var sum = 0;
                $(data).each(function (index, item) {
                    var y = parseFloat(item.Values[item.Values.length - 1]);
                    totalsum += y;
                });

                $(data).each(function (index, item) {
                    if (index < _this.itemCount) {
                        var x = item.FormattedValues[0];
                        var y = parseFloat(item.Values[item.Values.length - 1]);
                        sum += y;
                        result.push(x);
                    }
                });
                //console.log('sum', sum, 'total', totalsum);

                if (totalsum - sum > 0) {
                    //console.log('not shown from xaxis');
                    result.push('Not shown');
                }
                //console.log('result', result);
                return result;
            }(),
            /*
             type: 'datetime',
             dateTimeLabelFormats: {
             day: '%e %b' //%b %e
             },
             */
            labels: {
                fontFamily: 'Signika',
                enabled: true,
                style: { fontSize: '11px;', color: '#999'}, //10px, #333
                y: 30 //removed
            },
            tickLength: 0,
            startOnTick: false,
            endOnTick: false
        },
        yAxis: [
            {
                gridLineColor: '#efefef', //#ddd
                min: 0,
                //max:100000,
                showFirstLabel: false,
                showLastLabel: true,
                endOnTick: true,
                title: {text: null},
                labels: {
                    style: {
                        fontFamily: 'Signika', //Arial
                        fontSize: '11px', //19ox
                        color: '#999', //#666
                        textShadow: '-1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff'
                    },
                    align: 'left',
                    x: 20,
                    y: 15 //15
                },
                plotLines: [
                    {
                        value: 0,
                        width: 1,
                        color: '#ffffff'
                    }
                ]
            }/*,
             { // secondary
             gridLineColor: '#efefef',
             min: 0,
             showFirstLabel: false,
             showLastLabel: true,
             endOnTick: true,
             title: {text: null},
             labels: {
             style: {
             fontFamily: 'Signika', //Arial
             fontSize: '11px', //19ox
             color: '#999', //#666
             textShadow: '-1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff'
             },
             x: -25,//-5
             y: 15,
             align: 'right'
             },
             opposite: true
             }*/
        ],
        tooltip: {
            shared: true,
            useHTML: true,
            borderColor: '#333333',
            formatter: function () {
                //console.log('resolution', _this.Resolution);
                var points = this.points;
                var formattedDate = '';

                if (this.points.length == 1) {
                    var nextindex = 0;
                    if (_this.Resolution == 'hour' || _this.Resolution == 'minute') {
                        formattedDate = Highcharts.dateFormat('%A, %B %d, %Y %H:%M', this.points[0].point.x);
                    }
                    else if (_this.Resolution == 'month') {
                        $(points[0].series.xData).each(function (index, item) {
                            if (item == points[0].point.x) {
                                nextindex = index + 1;
                            }
                        });

                        if (nextindex < points[0].series.xData.length) {
                            if (nextindex == points[0].series.xData.length - 1) {
                                //one before last point
                                formattedDate = Highcharts.dateFormat('%b %d, %Y', joolaio.date.flatDate(points[0].point.x));
                                var sDate = joolaio.date.flatDate(points[0].series.xData[nextindex]);
                                sDate = joolaio.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth(), 0));
                                formattedDate += ' - ' + Highcharts.dateFormat('%b %d, %Y', sDate);
                            }
                            else {
                                formattedDate = Highcharts.dateFormat('%b %d, %Y', joolaio.date.flatDate(points[0].point.x));
                                var sDate = joolaio.date.flatDate(points[0].series.xData[nextindex]);
                                sDate.setDate(sDate.getDate() - 1);
                                formattedDate += ' - ' + Highcharts.dateFormat('%b %d, %Y', sDate);
                            }
                        }
                        else {
                            var sDate = joolaio.date.flatDate(points[0].point.x);
                            sDate.setDate(1);
                            formattedDate = Highcharts.dateFormat('%b %d, %Y', sDate);
                            formattedDate += ' - ' + Highcharts.dateFormat('%b %d, %Y', points[0].point.x);
                        }
                    }
                    else if (_this.Resolution == 'Week') {
                        $(points[0].series.xData).each(function (index, item) {
                            if (item == points[0].point.x) {
                                nextindex = index + 1;
                            }
                        });
                        if (nextindex < points[0].series.xData.length) {
                            formattedDate = Highcharts.dateFormat('%b %d, %Y', joolaio.date.flatDate(points[0].point.x));
                            var sDate = joolaio.date.flatDate(points[0].series.xData[nextindex]);
                            sDate.setDate(sDate.getDate() - 1);
                            formattedDate += ' - ' + Highcharts.dateFormat('%b %d, %Y', sDate);
                        }
                        else {
                            var sDate = joolaio.date.flatDate(points[0].point.x);
                            //sDate.setDate(1);
                            formattedDate = Highcharts.dateFormat('%b %d, %Y', sDate);
                            formattedDate += ' - ' + Highcharts.dateFormat('%b %d, %Y', _this.DateBox.base_todate);
                        }
                    }
                    else {
                        formattedDate = Highcharts.dateFormat('%A, %B %d, %Y', points[0].point.x);
                    }

                    formattedDate = joolaio.date.formatDate(_this.DateBox.getDate().base_fromdate);
                    formattedDate += ' - ';
                    formattedDate += joolaio.date.formatDate(_this.DateBox.getDate().base_todate);

                    return '<div style="padding-bottom:5px;"><b>' +
                        formattedDate +
                        '</b></div><div><div style="border: 3px solid white; border-color: #058DC7; border-radius: 3px;height: 0px; display: inline-block; width: 0px;position:relative;top:-1px;">' +
                        '</div><div style="padding-left:3px;display:inline">' + this.points[0].point.name.replace('_x0020_', ' ') + ': ' + this.points[0].point.formattedy + '</div>' +
                        '</div>';
                } else {
                    //console.log(this.points);
                    if (this.points[1].point.compare) {
                        //console.log('test');
                        if (_this.Resolution == 'month') {
                            $(points[0].series.xData).each(function (index, item) {
                                if (item == points[0].point.x) {
                                    nextindex = index + 1;
                                }
                            });

                            if (nextindex < points[0].series.xData.length) {
                                if (nextindex == points[0].series.xData.length - 1) {
                                    //one before last point
                                    formattedDate = Highcharts.dateFormat('%b %d, %Y', joolaio.date.flatDate(points[0].point.x));
                                    var sDate = joolaio.date.flatDate(points[0].series.xData[nextindex]);
                                    sDate = joolaio.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth(), 0));
                                    formattedDate += ' - ' + Highcharts.dateFormat('%b %d, %Y', sDate);
                                }
                                else {
                                    formattedDate = Highcharts.dateFormat('%b %d, %Y', joolaio.date.flatDate(points[0].point.x));
                                    var sDate = joolaio.date.flatDate(points[0].series.xData[nextindex]);
                                    sDate.setDate(sDate.getDate() - 1);
                                    formattedDate += ' - ' + Highcharts.dateFormat('%b %d, %Y', sDate);
                                }
                            }
                            else {
                                var sDate = joolaio.date.flatDate(points[0].point.x);
                                sDate.setDate(1);
                                formattedDate = Highcharts.dateFormat('%b %d, %Y', sDate);
                                formattedDate += ' - ' + Highcharts.dateFormat('%b %d, %Y', points[0].point.x);
                            }
                        }
                        else if (_this.Resolution == 'week') {
                            $(points[0].series.xData).each(function (index, item) {
                                if (item == points[0].point.x) {
                                    nextindex = index + 1;
                                }
                            });
                            if (nextindex < points[0].series.xData.length) {
                                formattedDate = Highcharts.dateFormat('%b %d, %Y', joolaio.date.flatDate(points[0].point.x));
                                var sDate = joolaio.date.flatDate(points[0].series.xData[nextindex]);
                                sDate.setDate(sDate.getDate() - 1);
                                formattedDate += ' - ' + Highcharts.dateFormat('%b %d, %Y', sDate);
                            }
                            else {
                                var sDate = joolaio.date.flatDate(points[0].point.x);
                                //sDate.setDate(1);
                                formattedDate = Highcharts.dateFormat('%b %d, %Y', sDate);
                                formattedDate += ' - ' + Highcharts.dateFormat('%b %d, %Y', _this.DateBox.base_todate);
                            }
                        }
                        else {
                            //console.log('test2');
                            formattedDate = Highcharts.dateFormat('%A, %B %d, %Y', points[0].point.x);
                        }
                        formattedDate = joolaio.date.formatDate(_this.DateBox.getDate().base_fromdate);
                        formattedDate += ' - ';
                        formattedDate += joolaio.date.formatDate(_this.DateBox.getDate().base_todate);

                        var _html = '<div style="padding-bottom:5px;"><b>' + formattedDate + '</b></div>';
                        _html += '<div>';
                        var _points = _.sortBy(this.points, function (item) {
                            return item.series.options.ordinal
                        });


                        $.each(_points, function (i, point) {
                            if (!point.point.compare) {
                                _html += '<div><div style="border: 3px solid white; border-color: ' + point.series.color + '; border-radius: 3px;height: 0px; display: inline-block; width: 0px;position:relative;top:-1px;">';
                                _html += '</div><div style="padding-left:3px;display:inline">' + point.series.options.name + ': ' + point.point.formattedy + '</div></div>';
                            }
                        });

                        _html += '</div>';
                        //console.log(this.points);
                        var nextindex = 0;
                        if (_this.Resolution == 'month') {
                            //console.log(this);
                            //console.log(points[1].series.xData);
                            $(points[1].series.points).each(function (index, item) {
                                //console.log(item, points[1].point.actualdate);
                                if (item.actualdate == points[1].point.actualdate) {
                                    nextindex = index + 1;
                                }
                            });

                            if (nextindex < points[1].series.points.length) {
                                if (nextindex == points[1].series.points.length - 1) {
                                    //one before last point
                                    //console.log(points[1].point);
                                    formattedDate = Highcharts.dateFormat('%b %d, %Y', joolaio.date.flatDate(points[1].point.actualdate));
                                    var sDate = joolaio.date.flatDate(points[1].series.points[nextindex].actualdate);
                                    sDate = joolaio.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth(), 0));
                                    //console.log(sDate);
                                    formattedDate += ' - ' + Highcharts.dateFormat('%b %d, %Y', sDate);
                                }
                                else {
                                    formattedDate = Highcharts.dateFormat('%b %d, %Y', joolaio.date.flatDate(points[1].point.actualdate));
                                    var sDate = joolaio.date.flatDate(points[1].series.points[nextindex].actualdate);
                                    //console.log(sDate);
                                    sDate.setDate(sDate.getDate() - 1);
                                    formattedDate += ' - ' + Highcharts.dateFormat('%b %d, %Y', sDate);
                                }
                            }
                            else {
                                var sDate = joolaio.date.flatDate(points[1].point.actualdate);
                                sDate.setDate(1);
                                formattedDate = Highcharts.dateFormat('%b %d, %Y', sDate);
                                sDate = joolaio.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth() + 1, 0));
                                formattedDate += ' - ' + Highcharts.dateFormat('%b %d, %Y', sDate);
                            }
                        }
                        else if (_this.Resolution == 'Week') {
                            $(points[1].series.points).each(function (index, item) {
                                if (item.actualdate == points[1].point.actualdate) {
                                    nextindex = index + 1;
                                }
                            });
                            if (nextindex < points[1].series.points.length) {
                                formattedDate = Highcharts.dateFormat('%b %d, %Y', joolaio.date.flatDate(points[1].point.actualdate));
                                var sDate = joolaio.date.flatDate(points[1].series.points[nextindex].actualdate);
                                sDate.setDate(sDate.getDate() - 1);
                                formattedDate += ' - ' + Highcharts.dateFormat('%b %d, %Y', sDate);
                            }
                            else {
                                var sDate = joolaio.date.flatDate(points[1].point.actualdate);
                                //sDate.setDate(1);
                                formattedDate = Highcharts.dateFormat('%b %d, %Y', sDate);
                                formattedDate += ' - ' + Highcharts.dateFormat('%b %d, %Y', _this.DateBox.compare_todate);
                            }
                        }
                        else {
                            formattedDate = Highcharts.dateFormat('%A, %B %d, %Y', points[1].point.actualdate);
                        }

                        formattedDate = joolaio.date.formatDate(_this.DateBox.compare_fromdate);
                        formattedDate += ' - ';
                        formattedDate += joolaio.date.formatDate(_this.DateBox.compare_todate);

                        _html += '<div style="padding-bottom:5px;margin-top:10px;"><b>' + formattedDate + '</b></div>';
                        _html += '<div>';
                        _points = _.sortBy(this.points, function (item) {
                            return item.series.options.ordinal
                        });

                        $.each(_points, function (i, point) {
                            if (point.point.compare) {
                                _html += '<div><div style="border: 3px solid white; border-color: ' + point.series.color + '; border-radius: 3px;height: 0px; display: inline-block; width: 0px;position:relative;top:-1px;">';
                                _html += '</div><div style="padding-left:3px;display:inline">' + point.series.options.name + ': ' + point.point.formattedy + '</div></div>';
                            }
                        });
                        _html += '</div>';
                    }
                    else {
                        //console.log('test4');
                        if (_this.Resolution == 'month') {
                            $(points[0].series.xData).each(function (index, item) {
                                if (item == points[0].point.x) {
                                    nextindex = index + 1;
                                }
                            });

                            if (nextindex < points[0].series.xData.length) {
                                if (nextindex == points[0].series.xData.length - 1) {
                                    //one before last point
                                    formattedDate = Highcharts.dateFormat('%b %d, %Y', joolaio.date.flatDate(points[0].point.x));
                                    var sDate = joolaio.date.flatDate(points[0].series.xData[nextindex]);
                                    sDate = joolaio.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth(), 0));
                                    formattedDate += ' - ' + Highcharts.dateFormat('%b %d, %Y', sDate);
                                }
                                else {
                                    formattedDate = Highcharts.dateFormat('%b %d, %Y', joolaio.date.flatDate(points[0].point.x));
                                    var sDate = joolaio.date.flatDate(points[0].series.xData[nextindex]);
                                    sDate.setDate(sDate.getDate() - 1);
                                    formattedDate += ' - ' + Highcharts.dateFormat('%b %d, %Y', sDate);
                                }
                            }
                            else {
                                var sDate = joolaio.date.flatDate(points[0].point.x);
                                sDate.setDate(1);
                                formattedDate = Highcharts.dateFormat('%b %d, %Y', sDate);
                                formattedDate += ' - ' + Highcharts.dateFormat('%b %d, %Y', points[0].point.x);
                            }
                        }
                        else if (_this.Resolution == 'week') {
                            $(points[0].series.xData).each(function (index, item) {
                                if (item == points[0].point.x) {
                                    nextindex = index + 1;
                                }
                            });
                            if (nextindex < points[0].series.xData.length) {
                                formattedDate = Highcharts.dateFormat('%b %d, %Y', joolaio.date.flatDate(points[0].point.x));
                                var sDate = joolaio.date.flatDate(points[0].series.xData[nextindex]);
                                sDate.setDate(sDate.getDate() - 1);
                                formattedDate += ' - ' + Highcharts.dateFormat('%b %d, %Y', sDate);
                            }
                            else {
                                var sDate = joolaio.date.flatDate(points[0].point.x);
                                //sDate.setDate(1);
                                formattedDate = Highcharts.dateFormat('%b %d, %Y', sDate);
                                formattedDate += ' - ' + Highcharts.dateFormat('%b %d, %Y', _this.DateBox.base_todate);
                            }
                        }
                        else {
                            //console.log('test5');
                            formattedDate = Highcharts.dateFormat('%A, %B %d, %Y', points[0].point.x);
                        }

                        formattedDate = joolaio.date.formatDate(_this.DateBox.getDate().base_fromdate);
                        formattedDate += ' - ';
                        formattedDate += joolaio.date.formatDate(_this.DateBox.getDate().base_todate);

                        _html = '<div style="padding-bottom:5px;"><b>' + formattedDate + '</b></div>';
                        _html += '<div>';
                        _points = _.sortBy(this.points, function (item) {
                            // console.log(item.series);

                            return item.series.options.ordinal
                        });


                        $.each(this.points, function (i, point) {
                            _html += '<div><div style="border: 3px solid white; border-color: ' + point.series.color + '; border-radius: 3px;height: 0px; display: inline-block; width: 0px;position:relative;top:-1px;">';
                            _html += '</div><div style="padding-left:3px;display:inline">' + point.series.options.name + ': ' + point.point.formattedy + '</div></div>';
                        });

                        _html += '</div>';
                    }

                    return _html;
                }
            }
        },
        legend: {enabled: false},
        credits: {enabled: false},
        exporting: {enabled: true},
        plotOptions: {
            column: {allowPointSelect: true, shadow: false},
            line: {       shadow: false},
            series: {
                shadow: false,
                connectNulls: true,
                //color:'#058DC7',
                fillOpacity: 0.1,
                //fillColor:'#E9F1FA',
                marker: {
                    symbol: 'circle',
                    enabled: (Math.abs(Date.dateDiff('d', _this.DateBox.getDate().base_fromdate, _this.DateBox.getDate().base_todate)) > 90 ? 'false' : 'true'),
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [
            {
                pointPadding: 0,
                groupPadding: 0.2,
                name: function () {
                    var name = '';
                    name = columns[columns.length - 1].name;
                    return name;
                }(),
                data: function () {
                    var result = [];
                    var sum = 0;
                    var totalsum = 0;

                    $(data).each(function (index, item) {
                        var y = parseFloat(item.Values[item.Values.length - 1]);
                        totalsum += y;
                    });

                    $(data).each(function (index, item) {
                        if (index < _this.itemCount) {
                            var x = item.FormattedValues[0];
                            var y = parseFloat(item.Values[item.Values.length - 1]);

                            sum += y;

                            result.push({y: y, name: x, formattedy: item.FormattedValues[1], compare: false});
                            //result.push(y);
                        }
                    });
                    //console.log('result', result);

                    if (totalsum - sum > 0) {
                        var name = 'Not Shown';
                        var y = totalsum - sum;
                        result.push({name: name, y: y, formattedy: 0, color: joolaio.colors[11]});

                        //result.push(y);
                    }

                    return result;
                }(),
                yAxis: 0
            }
        ]
    });

    //console.log(chart);


    var _seriesholder = [];
    $(series).each(function (index, _series) {
            //console.log(_series);
            if (index > 0) {
                var result = [];
                var sum = 0;
                var totalsum = 0;
                $(_series.Rows).each(function (index, item) {
                    var y = parseFloat(item.Values[item.Values.length - 1]);
                    totalsum += y;
                });
                var usedindex = 0;
                $(_series.Rows).each(function (index, item) {
                    if (usedindex < _this.itemCount) {
                        //console.log(item, chart.options.series[0].data[index]);
                        if (index < chart.options.series[0].data.length) {
                            if (item.Values[0] == chart.options.series[0].data[index].name) {
                                //var x = chart.options.series[0].data[index].x;
                                var name = item.Values[0];
                                var y = parseFloat(item.Values[item.Values.length - 1]);
                                var actualdate = item.FormattedValues[0];
                                sum += y;
                                result.push({ y: y, name: name, formattedy: item.FormattedValues[1], compare: (_series.id.indexOf('compare') > -1 ? true : false), actualdate: actualdate});
                                usedindex += 1;
                            }
                        }

                    }
                });

                for (var i = result.length ; i < chart.options.series[0].data.length-1;i++){
                    var item = chart.options.series[0].data[i];
                    var name = item.name;
                    var y = 0;
                    var actualdate = item.name;
                    sum += y;
                    result.push({ y: y, name: name, formattedy: 0, compare: (_series.id.indexOf('compare') > -1 ? true : false), actualdate: actualdate});
                    usedindex += 1;
                }

                if (totalsum - sum > 0) {
                    var name = 'Not shown';
                    var y = totalsum - sum;

                    //console.log(y);

                    result.push({name: name, y: y, formattedy: y,color: joolaio.colors[11]});

                    //result.push(y);
                }


                var _color;
                var _yaxis = 0;
                var _seriesindex = 1;
                if (index > 1 && series.length == 4) {
                    if (index == 3)
                        _yaxis = 1;
                    else
                        _yaxis = 0;

                    _color = joolaio.offcolors[index - 2];
                }
                else if (index == 1 && series.length == 2) {
                    if (_this.DateBox.comparePeriod) {
                        _yaxis = 1;
                        _color = joolaio.offcolors[index - 1];
                    }
                    else {
                        _yaxis = 1;
                        _color = joolaio.colors[index];
                    }
                }
                else {
                    _yaxis = 1;
                    _color = joolaio.colors[index];
                }
                var chartSeries = {
                    name: _series.Columns[1].name,
                    lineWidth: 2,
                    type: 'column',
                    yAxis: 0,
                    shadow: false,
                    data: result,
                    color: _color,
                    pointPadding: 0,
                    groupPadding: 0.2
                };
                //console.log(chartSeries);
                _seriesholder.push(chartSeries);
            }
        }
    );
    if (series.length == 4) {
        //chart.addSeries(series[0], false);
        chart.addSeries(_seriesholder[1], false);
        chart.addSeries(_seriesholder[0], false);
        chart.addSeries(_seriesholder[2], false);
    }
    else {
        $(_seriesholder).each(function (index, _series) {
            chart.addSeries(_series, false);
        });
    }

    chart.redraw();
};

joolaio.visualisation.dashboard.Bar.prototype.baseHTML = function (sender) {
    var _this = sender;
    //console.log('drawing timeline html with base');
    var $html = $('<div class="wrapper"></div>');

    $html.append('<div class="row-fluid">' +
        '<div class="header">' +
        '<div class="settings"></div>' +
        '<div class="move"></div>' +
        '<h3>' + _this.title + '</h3>' +
        '</div>' +
        '<div class="content">' +
        '<div class="joolaio legend"></div>' +
        '<div class="chart"></div>' +
        '</div>' +
        '</div>');

    return $html;
}

joolaio.visualisation.dashboard.Bar.prototype.draw = function (container) {
    var _this = this;

    //var metrics = _this.metrics;//$(Container).attr('data-metrics');
    //metrics = metrics.split(',');
    //$(metrics).each(function (index, item) {
    //item = $.trim(item);
    //console.log(item);

    var title = 'TITLE';
    var metrics = this.default_subcaption;
    var dimensions = '';

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
    _this.title = title;
    var $html = _this.baseHTML(_this);

    $(container).append($html);
};

joolaio.debug.log('INFO', 'joolaio.visualisation.dashboard.Bar', 6, 'JS source loaded');

/**
 * init the Timeline and look for containers
 */
//new joolaio.visualisation.dashboard.Bar().init();
