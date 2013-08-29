// Copyright 2013 Joola. All Rights Reserved.
//
// Licensed under the Jarvis License Agreement (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://jarvis.joo.la/license
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview File for Jarvis Client SDK JS Library (Jarvis).
 * This class implements a visualisation dashboard Timeline.
 * @author itay@joo.la (itay weinberger)
 */

jarvis.provide('jarvis.visualisation.dashboard.Timeline');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

//jarvis.require('jarvis.dashboard');
jarvis.require('jarvis.visualisation.dashboard');

/**
 * Initializes a new dashboard visualisation object.
 * @class Implements a visualisation dashboard Timeline
 * @requires jarvis.debug
 * @requires jarvis.date
 * @requires jarvis.string
 * @requires jarvis.visualisation.dashboard
 * @param options {object} base settings for the object.
 * @constructor
 */
jarvis.visualisation.dashboard.Timeline = function (options) {
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

    jarvis.objects.Dimensions.List();
    jarvis.objects.Metrics.List();

    var executionTime = new Date().getMilliseconds() - start;
    //jarvis.debug.log('INFO', 'jarvis.visualisation.dashboard.Timeline', 5, '...Constructor (' + executionTime + 'ms)');
};


/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
jarvis.visualisation.dashboard.Timeline.prototype.init = function (options, container) {
    var _this = this;
    var start = new Date().getMilliseconds();

    this._this = this;
    this.options = $.extend({
        height: 235
    }, options);
    this.containers = this.containers || [];
    this.dimensions = [];
    this.metrics = [];

    this.DateBox = jarvis.visualisation.picker.DateBox;

    $(jarvis.realtime).bind('filterchange', function (e) {

    });

    //lookup any containers relevant for the timeline
    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.jarvis.dashboard.timeline');
    if (matchedContainers.length == 0)
        return;

    //_this.Container = matchedContainers;

    $(matchedContainers).each(function (index, item) {
        if (!$(this).parent().hasClass('prettyprint')) {
            jarvis.debug.log('INFO', 'jarvis.visualisation.dashboard.Timeline', 6, 'Applying to container (\'' + this.id + '\')');

            var _height = $(item).attr('data-height');
            if (_height)
                _this.options.height = _height;
            var _itemcount = $(item).attr('data-limit');
            if (_itemcount)
                _this.itemCount = _itemcount;


            var _metrics = $(item).attr('data-metrics');
            if (!_metrics)
                return;
            _metrics = _metrics.split(',');
            $(_metrics).each(function (index, item) {
                _metrics[index] = $.trim(_metrics[index]);
                _this.metrics.push(_metrics[index]);
            });

            $(jarvis.objects.Metrics).each(function (index, item) {
                if (_metrics.indexOf(item.id) > -1)
                    _this.metrics[_metrics.indexOf(item.id)] = item;
            });


            $(this).bind('data', function (evt, ret) {
                ret.data = $(this).data().data;
            });

            $(this).bind('click', function (evt) {
                $(this).trigger('clicked', $(this).data().data);
            });

            $(jarvis.visualisation.report).bind('filter', function (filter) {
                _this.fetch(_this);
            });

            $(item).empty();
            _this.draw(item);
            _this.fetch(_this, item);

            $(this).find('.settings').off('click');
            $(this).find('.settings').on('click', function (e) {
                jarvis.getDashboard().showEditWidget({_this: jarvis.getDashboard(), container: jarvis.getDashboard().container, addNew: false, widgetID: $(item).attr('data-widgetid'), sender: _this, sendercontainer: item });
            });

            _this.containers.push(item);
        }
    });

    $(_this.DateBox).bind('datechange', function () {
        $(_this.containers).each(function (i, container) {
            _this.fetch(_this, container);
        })
    });

    var executionTime = new Date().getMilliseconds() - start;
    jarvis.debug.log('INFO', 'Jarvis.Visualisation.Dashboard.Timeline', 5, '...init (' + executionTime + 'ms)');
};

/**
 * Inits the class and builds the base html for it.
 * @return (string) returns the base html to be applied in the container
 */

jarvis.visualisation.dashboard.Timeline.prototype.fetch = function (sender, container) {
    if (!sender)
        sender = jarvis.dashboard.visualisation.Pie;

    var _this = sender;

    var startdate = jarvis.visualisation.picker.DateBox.getDate().base_fromdate;
    var enddate = jarvis.visualisation.picker.DateBox.getDate().base_todate;
    if (_this.DateBox.comparePeriod) {
        var compare_startdate = jarvis.visualisation.picker.DateBox.getDate().compare_fromdate;
        var compare_enddate = jarvis.visualisation.picker.DateBox.getDate().compare_todate;
    }

    var _metrics = $(container).attr('data-metrics');
    var _metricslist = _metrics;


    if (!_metrics)
        return '';
    _metrics = _metrics.split(',');
    $(_metrics).each(function (index, item) {
        var mindex = -1;
        $(jarvis.objects.Metrics).each(function (mi, mo) {
            if (mo.id == $.trim(item))
                mindex = mi;
        });
        _metrics[index] = jarvis.objects.Metrics[mindex];
        _this.metrics.push(_metrics[index]);
    });

    $(jarvis.objects.Metrics).each(function (index, item) {
        if (_metrics.indexOf(item.id) > -1)
            _this.metrics[_metrics.indexOf(item.id)] = item;
    });


    if (!_metrics)
        return '';
    /*
     _metrics = _metrics.split(',');
     $(_metrics).each(function (index, item) {
     var imetric = -1;
     $(jarvis.dataaccess.metrics).each(function (i, o) {

     if (o.Name == $.trim(item))
     imetric = i;
     })

     _metrics[index] = jarvis.dataaccess.metrics[imetric];
     });

     if (typeof _metrics[0] == 'undefined')
     return '';
     */
    //$(_metrics).each(function (index, metric) {
    var queryOptions = [];
    var _queryOptions = {
        id: 'primary',
        startdate: jarvis.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
        enddate: jarvis.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
        dimensions: 'date.date',
        metrics: _metricslist,
        resolution: _this.Resolution,
        omitDate: false,
        filter: jarvis.visualisation.dashboard.globalfilter
        //sortKey: _metrics[_metrics.length - 1].id,
        //sortDir: 'DESC'
    };
    queryOptions.push(_queryOptions);

    if (_this.DateBox.comparePeriod) {
        _queryOptions = {
            id: 'compare_primary',
            startdate: jarvis.date.formatDate(compare_startdate, 'yyyy-mm-dd hh:nn:ss.000'),
            enddate: jarvis.date.formatDate(compare_enddate, 'yyyy-mm-dd hh:nn:ss.999'),
            dimensions: 'date.date',
            metrics: _metricslist,
            resolution: _this.Resolution,
            omitDate: false,
            filter: jarvis.visualisation.dashboard.globalfilter
            //sortKey: _metrics[_metrics.length - 1].id,
            //sortDir: 'DESC'
        };
        queryOptions.push(_queryOptions);
    }


    jarvis.dataaccess.multifetch(_this, '/query.fetch', queryOptions, function (sender, data, error) {
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

        fixdate(series);

        _this.update(sender, _metrics, series, container);
    });
};

function fixdate(series) {
    var cols = [];
    $(series).each(function (i, series) {
        $(series.Columns).each(function (index, col) {
            if (col == 'Date') {
                cols.push(index);
            }
        });

        if (cols.length == 0) return series;
        $(series.Rows).each(function (index, row) {
            var value = row.Values[cols[0]];
            value = jarvis.date.flatDate(value);
            row.Values[cols[0]] = value;
            row.FormattedValues[cols[0]] = value;
        });
    });
};

jarvis.visualisation.dashboard.Timeline.prototype.update = function (sender, metrics, series, container) {
    var _this = sender;


    //return;
    if (!series[0])
        return;

    var $wrapper = $(container);
    var _itemcount = $(container).attr('data-limit');
    if (_itemcount)
        _this.itemCount = _itemcount;


    var $container = $($(container).find('.chart'));


    var columns = series[0].Columns;
    var data = series[0].Rows;

    var _totalsum = 0;
    $(data).each(function (index, row) {
        _totalsum += parseFloat(row.Values[row.Values.length - 1]);
    });

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
            type: 'area',
            //zoomType: 'x',
            events: {
                load: function () {/*
                 $(window).resize(function(e){
                 var _width = ($container.width() > $(window).width() ? $(window).width() : $container.width());

                 chart.setSize(_width, _this.options.height);
                 });*/
                },
                redraw: function () {

                    $wrapper.find('.jarvis.legend').empty();

                    var _series = chart.series;
                    $(jarvis).trigger('dashboard-timeline-redraw', [_series]);
                    $(_series).each(function (index, series) {
                        var seriesname = '';
                        var _html = '';


                        seriesname = series.name;
                        _html = '<span style="border: 5px solid white; border-color: ' + series.color + '; border-radius: 5px;height: 0px; display: inline-block; width: 0px;margin-left:10px;"></span>&nbsp;';
                        _html += '<span class="jarvis legendseries" data-id="0">' + seriesname + '</span>';
                        $wrapper.find('.jarvis.legend').append(_html);
                    });
                },
                selection: function (event) {
                }
            }
        },
        title: {text: null},
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%e %b'
            },
            labels: {
                formatter: function () {
                    var date = new Date(this.value);
                    var sDate = '';

                    if (date.getHours() != 0) {
                        sDate = jarvis.date.formatDate(date, 'mmm dd'); // hh:nn
                    }
                    else {
                        sDate = jarvis.date.formatDate(date, 'mmm dd');
                    }

                    return sDate;
                },
                fontFamily: 'Signika',
                enabled: true,
                style: { fontSize: '11px;', color: '#999'}, //10px, #333
                y: 30 //removed
            },
            tickLength: 0,
            startOnTick: false,
            endOnTick: false,
            showFirstLabel: false,
            showLastLabel: false
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
                    formatter: function () {
                        var ytype = '';
                        try {
                            ytype = series[0].Columns[1].suffix;
                        }
                        catch (e) {
                            ytype = '';
                        }

                        if (ytype == 'seconds') {
                            var TimeInSeconds = this.value;
                            var sHours = (Math.round(((TimeInSeconds / 60.0) / 60) - 0.5, 0));
                            var sMinutes = (Math.round((TimeInSeconds / 60.0) - 0.5, 0) % 60);
                            var sSeconds = (TimeInSeconds % 60);

                            if (sHours < 10)
                                sHours = "0" + sHours;
                            if (sMinutes < 10)
                                sMinutes = "0" + sMinutes;
                            if (sSeconds < 10)
                                sSeconds = "0" + sSeconds;

                            return sHours + ":" + sMinutes + ":" + sSeconds;
                        }
                        else {

                            if (this.value % Math.round(this.value) == 0) {
                                return jarvis.string.formatNumber(this.value, 0, true);
                            }
                            else {
                                return jarvis.string.formatNumber(this.value, 1, true);
                            }
                        }
                    },
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
            },
            { // secondary
                gridLineColor: '#efefef',
                min: 0,
                showFirstLabel: false,
                showLastLabel: true,
                endOnTick: true,
                title: {text: null},
                labels: {
                    formatter: function () {
                        var ytype = '';
                        try {
                            ytype = series[1].Columns[1].suffix;
                        }
                        catch (e) {
                            ytype = '';
                        }

                        if (ytype == 'seconds') {
                            var TimeInSeconds = this.value;
                            var sHours = (Math.round(((TimeInSeconds / 60.0) / 60) - 0.5, 0));
                            var sMinutes = (Math.round((TimeInSeconds / 60.0) - 0.5, 0) % 60);
                            var sSeconds = (TimeInSeconds % 60);

                            if (sHours < 10)
                                sHours = "0" + sHours;
                            if (sMinutes < 10)
                                sMinutes = "0" + sMinutes;
                            if (sSeconds < 10)
                                sSeconds = "0" + sSeconds;

                            return sHours + ":" + sMinutes + ":" + sSeconds;
                        }
                        else {
                            if (this.value % Math.round(this.value) == 0) {
                                return jarvis.string.formatNumber(this.value, 0, true);
                            }
                            else {
                                return jarvis.string.formatNumber(this.value, 1, true);
                            }
                        }
                    },
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
            }
        ],
        tooltip: {
            shared: true,
            useHTML: true,
            borderColor: '#333333',
            formatter: function () {

                var points = this.points;
                var formattedDate = '';

                if (this.points.length == 1) {
                    var nextindex = 0;
                    if (_this.Resolution == 'hour' || _this.Resolution == 'minute') {
                        formattedDate = Highcharts.dateFormat('%A, %B %d, %Y %H:%M', this.points[0].point.x);
                        //formattedDate = jarvis.date.formatDate(this.points[0].point.x);
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

                                formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
                                var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
                                sDate = jarvis.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth(), 0));

                                formattedDate += ' - ' + jarvis.date.formatDate(sDate);
                            }
                            else {

                                formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
                                var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
                                sDate.setDate(sDate.getDate() - 1);

                                formattedDate += ' - ' + jarvis.date.formatDate(sDate);
                            }
                        }
                        else {
                            var sDate = jarvis.date.flatDate(points[0].point.x);
                            sDate.setDate(1);

                            formattedDate = jarvis.date.formatDate(sDate);

                            formattedDate += ' - ' + jarvis.date.formatDate(points[0].point.x);
                        }
                    }
                    else if (_this.Resolution == 'week') {
                        $(points[0].series.xData).each(function (index, item) {
                            if (item == points[0].point.x) {
                                nextindex = index + 1;
                            }
                        });
                        if (nextindex < points[0].series.xData.length) {

                            formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
                            var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
                            sDate.setDate(sDate.getDate() - 1);

                            formattedDate += ' - ' + jarvis.date.formatDate(sDate);
                        }
                        else {
                            var sDate = jarvis.date.flatDate(points[0].point.x);
                            //sDate.setDate(1);

                            formattedDate = jarvis.date.formatDate(sDate);

                            formattedDate += ' - ' + jarvis.date.formatDate(_this.DateBox.base_todate);
                        }
                    }
                    else {

                        formattedDate = jarvis.date.formatDate(points[0].point.x);
                    }

                    return '<div style="padding-bottom:5px;"><b>' +
                        formattedDate +
                        '</b></div><div><div style="border: 3px solid white; border-color: #058DC7; border-radius: 3px;height: 0px; display: inline-block; width: 0px;position:relative;top:-1px;">' +
                        '</div><div style="padding-left:3px;display:inline">' + this.points[0].point.name.replace('_x0020_', ' ') + ': ' + this.points[0].point.formattedy + '</div>' +
                        '</div>';
                } else {

                    if (this.points[1].point.compare) {

                        if (_this.Resolution == 'month') {
                            $(points[0].series.xData).each(function (index, item) {
                                if (item == points[0].point.x) {
                                    nextindex = index + 1;
                                }
                            });

                            if (nextindex < points[0].series.xData.length) {
                                if (nextindex == points[0].series.xData.length - 1) {
                                    //one before last point

                                    formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
                                    var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
                                    sDate = jarvis.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth(), 0));

                                    formattedDate += ' - ' + jarvis.date.formatDate(sDate);
                                }
                                else {

                                    formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
                                    var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
                                    sDate.setDate(sDate.getDate() - 1);

                                    formattedDate += ' - ' + jarvis.date.formatDate(sDate);
                                }
                            }
                            else {
                                var sDate = jarvis.date.flatDate(points[0].point.x);
                                sDate.setDate(1);

                                formattedDate = jarvis.date.formatDate(sDate);

                                formattedDate += ' - ' + jarvis.date.formatDate(points[0].point.x);
                            }
                        }
                        else if (_this.Resolution == 'week') {
                            $(points[0].series.xData).each(function (index, item) {
                                if (item == points[0].point.x) {
                                    nextindex = index + 1;
                                }
                            });
                            if (nextindex < points[0].series.xData.length) {

                                formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
                                var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
                                sDate.setDate(sDate.getDate() - 1);

                                formattedDate += ' - ' + jarvis.date.formatDate(sDate);
                            }
                            else {
                                var sDate = jarvis.date.flatDate(points[0].point.x);
                                //sDate.setDate(1);

                                formattedDate = jarvis.date.formatDate(sDate);

                                formattedDate += ' - ' + jarvis.date.formatDate(_this.DateBox.base_todate);
                            }
                        }
                        else {


                            formattedDate = jarvis.date.formatDate(points[0].point.x);
                        }

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

                        var nextindex = 0;
                        if (_this.Resolution == 'month') {


                            $(points[1].series.points).each(function (index, item) {

                                if (item.actualdate == points[1].point.actualdate) {
                                    nextindex = index + 1;
                                }
                            });

                            if (nextindex < points[1].series.points.length) {
                                if (nextindex == points[1].series.points.length - 1) {
                                    //one before last point


                                    formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[1].point.actualdate));
                                    var sDate = jarvis.date.flatDate(points[1].series.points[nextindex].actualdate);
                                    sDate = jarvis.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth(), 0));


                                    formattedDate += ' - ' + jarvis.date.formatDate(sDate);
                                }
                                else {

                                    formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[1].point.actualdate));
                                    var sDate = jarvis.date.flatDate(points[1].series.points[nextindex].actualdate);

                                    sDate.setDate(sDate.getDate() - 1);

                                    formattedDate += ' - ' + jarvis.date.formatDate(sDate);
                                }
                            }
                            else {
                                var sDate = jarvis.date.flatDate(points[1].point.actualdate);
                                sDate.setDate(1);

                                formattedDate = jarvis.date.formatDate(sDate);
                                sDate = jarvis.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth() + 1, 0));

                                formattedDate += ' - ' + jarvis.date.formatDate(sDate);
                            }
                        }
                        else if (_this.Resolution == 'week') {
                            $(points[1].series.points).each(function (index, item) {
                                if (item.actualdate == points[1].point.actualdate) {
                                    nextindex = index + 1;
                                }
                            });
                            if (nextindex < points[1].series.points.length) {

                                formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[1].point.actualdate));
                                var sDate = jarvis.date.flatDate(points[1].series.points[nextindex].actualdate);
                                sDate.setDate(sDate.getDate() - 1);

                                formattedDate += ' - ' + jarvis.date.formatDate(sDate);
                            }
                            else {
                                var sDate = jarvis.date.flatDate(points[1].point.actualdate);
                                //sDate.setDate(1);

                                formattedDate = jarvis.date.formatDate(sDate);

                                formattedDate += ' - ' + jarvis.date.formatDate(_this.DateBox.compare_todate);
                            }
                        }
                        else {


                            formattedDate = jarvis.date.formatDate(points[1].point.actualdate);
                        }

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

                        if (_this.Resolution == 'month') {
                            $(points[0].series.xData).each(function (index, item) {
                                if (item == points[0].point.x) {
                                    nextindex = index + 1;
                                }
                            });

                            if (nextindex < points[0].series.xData.length) {
                                if (nextindex == points[0].series.xData.length - 1) {
                                    //one before last point

                                    formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
                                    var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
                                    sDate = jarvis.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth(), 0));

                                    formattedDate += ' - ' + jarvis.date.formatDate(sDate);
                                }
                                else {

                                    formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
                                    var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
                                    sDate.setDate(sDate.getDate() - 1);

                                    formattedDate += ' - ' + jarvis.date.formatDate(sDate);
                                }
                            }
                            else {
                                var sDate = jarvis.date.flatDate(points[0].point.x);
                                sDate.setDate(1);

                                formattedDate = jarvis.date.formatDate(sDate);

                                formattedDate += ' - ' + jarvis.date.formatDate(points[0].point.x);
                            }
                        }
                        else if (_this.Resolution == 'week') {
                            $(points[0].series.xData).each(function (index, item) {
                                if (item == points[0].point.x) {
                                    nextindex = index + 1;
                                }
                            });
                            if (nextindex < points[0].series.xData.length) {

                                formattedDate = jarvis.date.formatDate(jarvis.date.flatDate(points[0].point.x));
                                var sDate = jarvis.date.flatDate(points[0].series.xData[nextindex]);
                                sDate.setDate(sDate.getDate() - 1);

                                formattedDate += ' - ' + jarvis.date.formatDate(sDate);
                            }
                            else {
                                var sDate = jarvis.date.flatDate(points[0].point.x);
                                //sDate.setDate(1);

                                formattedDate = jarvis.date.formatDate(sDate);

                                formattedDate += ' - ' + jarvis.date.formatDate(_this.DateBox.base_todate);
                            }
                        }
                        else {

                            formattedDate = jarvis.date.formatDate(points[0].point.x);
                        }

                        _html = '<div style="padding-bottom:5px;"><b>' + formattedDate + '</b></div>';
                        _html += '<div>';
                        _points = _.sortBy(this.points, function (item) {

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
            column: {allowPointSelect: true},
            line: {       shadow: true},
            series: {
                shadow: true,
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
                name: function () {
                    var name = '';
                    name = columns[columns.length - 1].name;
                    return name;
                }(),
                data: function () {
                    var result = [];
                    var sum = 0;

                    $(data).each(function (index, item) {
                        var x = new Date(item.FormattedValues[0]);
                        var y = parseFloat(item.Values[item.Values.length - 1]);
                        result.push({x: x, y: y, name: columns[columns.length - 1].name, formattedy: item.FormattedValues[1], compare: false});
                    });
                    return result;
                }(),
                yAxis: 0
            }
        ]
    });

    var _seriesholder = [];
    $(series).each(function (index, _series) {

            if (index > 0) {
                var result = [];
                $(_series.Rows).each(function (index, item) {

                    try {
                        var x = chart.options.series[0].data[index].x;
                        var y = parseFloat(item.Values[item.Values.length - 1]);
                        var actualdate = jarvis.date.flatDate(item.FormattedValues[0]);
                        result.push({x: x, y: y, name: columns[columns.length - 1].name, formattedy: item.FormattedValues[1], compare: (_series.id.indexOf('compare') > -1 ? true : false), actualdate: actualdate});
                    }
                    catch (ex) {
                        jarvis.debug.log('ERROR', 'jarvis.visualisation.dashboard.Timeline', 6, 'Failed to draw x point: ' + ex.message);
                    }
                });

                var _color;
                var _yaxis = 0;
                var _seriesindex = 1;
                if (index > 1 && series.length == 4) {
                    if (index == 3)
                        _yaxis = 1;
                    else
                        _yaxis = 0;

                    _color = jarvis.offcolors[index - 2];
                }
                else if (index == 1 && series.length == 2) {
                    if (_this.DateBox.comparePeriod) {
                        _yaxis = 1;
                        _color = jarvis.offcolors[index - 1];
                    }
                    else {
                        _yaxis = 1;
                        _color = jarvis.colors[index];
                    }
                }
                else {
                    _yaxis = 1;
                    _color = jarvis.colors[index];
                }
                var chartSeries = {
                    name: _series.Columns[1].name,
                    lineWidth: 2,
                    type: 'line',
                    yAxis: _yaxis,
                    shadow: true,
                    data: result,
                    color: _color
                };

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
    if (chart.xAxis[0].series[0].points.length == 1) {
        chart.xAxis[0].update({
            startOnTick: true,
            endOnTick: true,
            showFirstLabel: true,
            showLastLabel: true,
            labels: {
                y: 25 //removed
            }
        }, false);
    }

    if (chart.yAxis[0].dataMax === 0) {
        chart.yAxis[0].setExtremes(0, 5, false);
    }

    chart.redraw();
};

jarvis.visualisation.dashboard.Timeline.prototype.baseHTML = function (sender) {
    var _this = sender;

    var $html = $('<div class="wrapper"></div>');

    $html.append('<div class="row-fluid">' +
        '<div class="header">' +
        '<div class="settings"></div>' +
        '<div class="move"></div>' +
        '<h3>' + _this.title + '</h3>' +
        '</div>' +
        '<div class="content">' +
        '<div class="jarvis legend"></div>' +
        '<div class="chart"></div>' +
        '</div>' +
        '</div>');

    return $html;
}

jarvis.visualisation.dashboard.Timeline.prototype.draw = function (container) {
    var _this = this;

    //var metrics = _this.metrics;//$(Container).attr('data-metrics');
    //metrics = metrics.split(',');
    //$(metrics).each(function (index, item) {
    //item = $.trim(item);


    var title = 'TITLE';
    var metrics = this.default_subcaption;


    if ($(container).attr('data-title')) {
        title = $(container).attr('data-title');

    }
    if ($(container).attr('data-metrics')) {
        metrics = $(container).attr('data-metrics');
    }
    _this.title = title;
    var $html = _this.baseHTML(_this);

    $(container).append($html);
};

jarvis.debug.log('INFO', 'Jarvis.Visualisation.Dashboard.Timeline', 6, 'JS source loaded');

/**
 * init the Timeline and look for containers
 */
//new jarvis.visualisation.dashboard.Timeline().init();
