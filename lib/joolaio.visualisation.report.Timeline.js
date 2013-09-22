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


joolaio.provide('joolaio.visualisation.report.Timeline');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

//joolaio.require('joolaio.report');
joolaio.require('joolaio.visualisation.report');

Highcharts.setOptions({
    colors: ['#058DC7', '#ED7E17', '#50B432', '#AF49C5', '#EDEF00', '#8080FF', '#A0A424', '#E3071C', '#6AF9C4', '#B2DEFF', '#64E572', '#CCCCCC' ],
    offcolors: ['#AADFF3', '#F2D5BD', '#C9E7BE', '#E1C9E8', '#F6F3B1', '#DADBFB', '#E7E6B4', '#F4B3BC', '#AADFF3', '#F2D5BD', '#C9E7BE']
});

/**
 * Initializes a new report visualisation object.
 * @class Implements a visualisation report Timeline
 * @requires joolaio.debug
 * @requires joolaio.date
 * @requires joolaio.string
 * @requires joolaio.visualisation.report
 * @param options {object} base settings for the object.
 * @constructor
 */
joolaio.visualisation.report.Timeline = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;
    this.type = 'timeline';
    this._this = this;
    this.ChartType = 'line';
    this.Resolution = 'Day';
    this.primaryMetric = null;// joolaio.dataaccess.metrics[0];
    this.secondaryMetric = null; //joolaio.dataaccess.metrics[1];
    this.Filters = [];

    this.metrics = [];
    this.height = 235;
    //for (i = 0 ; i < 250 ; i++)
    //    this.Filters.push(joolaio.dataaccess.dimensions[0].Name + '=' + 'filter value' + i);

    this.DateBox = joolaio.visualisation.picker.DateBox;

    $(this.DateBox).unbind('datechange');
    $(this.DateBox).bind('datechange', function () {
        _this.fetch(_this);
    });

    $(joolaio.visualisation.report).unbind('filter');
    //$(joolaio.visualisation.report).unbind('filter');
    $(joolaio.visualisation.report).bind('filter', function () {
        _this.fetch(_this);
    });

    $(joolaio.visualisation.report).unbind('joolaio-clearfilter');
    //$(joolaio.visualisation.report).unbind('filter');
    $(joolaio.visualisation.report).bind('joolaio-clearfilter', function () {
        _this.Filters = [];
        _this.fetch(_this);
    });

    $(joolaio.visualisation.report).unbind('addpartialfilter-quick');
    $(joolaio.visualisation.report).bind('addpartialfilter-quick', function (e, partial) {
        _this.Filters.push(partial);
    });

    $(joolaio.visualisation.report).unbind('addpartialfilter');
    $(joolaio.visualisation.report).bind('addpartialfilter', function (e, partial) {
        _this.Filters.push(partial);
        _this.fetch(_this);
    });

    $(joolaio.visualisation.report).unbind('removepartialfilter');
    $(joolaio.visualisation.report).bind('removepartialfilter', function (e, partial) {
        if (_this.Filters.indexOf(partial) > -1) {
            _this.Filters.splice(_this.Filters.indexOf(partial), 1);
            _this.fetch(_this);
        }
    });

    $(joolaio).unbind('report-timeline-switch-resolution');
    $(joolaio).bind('report-timeline-switch-resolution', function (e, resolution) {
        _this.switchResolution(_this, resolution, this);
    });

    $(window).resize(function () {
        _this.Chart.setSize(
            0,
            _this.Chart.height,
            false);

        _this.Chart.setSize(
            $('.joolaio.report.timeline').width(),
            _this.Chart.height,
            false);
    });

    joolaio.objects.Dimensions.List();
    joolaio.objects.Metrics.List();

    _this.getState(_this);

    var executionTime = new Date().getMilliseconds() - start;
    //joolaio.debug.log('INFO', 'joolaio.Visualisation.Report.Timeline', 5, '...Constructor (' + executionTime + 'ms)');
};

/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
joolaio.visualisation.report.Timeline.prototype.init = function (options, container) {
    var _this = this;
    var start = new Date().getMilliseconds();

    this._this = this;
    /*this.ChartType = 'line';
     this.Resolution = 'Day';
     this.primaryMetric = null;
     this.secondaryMetric = null;
     this.Filters = [];

     this.metrics = [];
     this.DateBox = joolaio.visualisation.picker.DateBox;
     */
    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.joolaio.report.timeline');
    if (matchedContainers.length == 0)
        return;

    this.options = $.extend({
        height: 235,
        excludeMetrics: [],
        showPrimary: true
    }, options);


    _this.height = this.options.height;
    _this.excludeMetrics = this.options.excludeMetrics;
    _this.showPrimary = this.options.showPrimary;


    $(matchedContainers).each(function (index, item) {
        joolaio.debug.log('INFO', 'joolaio.visualisation.report.Timeline', 6, 'Applying to container (\'' + this.id + '\')');
        if (_this.primaryMetric == null || typeof(_this.primaryMetric) == 'undefined') {
            if (options != null && options.primaryMetric && typeof(options.primaryMetric) != 'undefined') {
                _this.primaryMetric = options.primaryMetric;
                _this.metrics.push(options.primaryMetric);
                $(joolaio.objects.Metrics).each(function (i, o) {
                    if (o.id == _this.metrics[0]) {
                        _this.primaryMetric = o;
                    }
                });
            }
            else if ($(item).attr('data-metrics')) {
                var _metrics = $(item).attr('data-metrics');
                _metrics = _metrics.split(',');
                $(_metrics).each(function (index, item) {
                    _metrics[index] = $.trim(_metrics[index]);
                    _this.metrics.push(_metrics[index]);
                });

                _this.primaryMetric = _this.metrics[0];
                $(joolaio.objects.Metrics).each(function (i, o) {
                    if (o.id == _this.metrics[0])
                        _this.primaryMetric = o;
                });
            }
            else {

                _this.primaryMetric = joolaio.objects.Metrics[0];
                _this.metrics = [];
                _this.metrics.push(_this.primaryMetric);
                $(item).attr('data-metrics', _this.primaryMetric.id);
            }
        }
        else {
            _this.metrics = [];
            _this.metrics.push(_this.primaryMetric);
            $(item).attr('data-metrics', _this.primaryMetric.name);
        }
        _this.drawChart(item);
        _this.fetch(_this);

        $(this).unbind('data');
        $(this).bind('data', function (evt, ret) {
            ret.data = $(this).data().data;
        });

        $(this).unbind('click');
        $(this).bind('click', function (evt) {
            $(this).trigger('clicked', $(this).data().data);
        });
    });


    var executionTime = new Date().getMilliseconds() - start;
    joolaio.debug.log('INFO', 'joolaio.visualisation.report.Timeline', 5, '...init (' + executionTime + 'ms)');

    joolaio.visualisation.primarymetric = _this.primaryMetric;
    joolaio.visualisation.secondarymetric = _this.secondaryMetric;

    return this;
};

joolaio.visualisation.report.Timeline.prototype.fetch = function (sender) {
    if (!sender)
        sender = joolaio.visualisation.report.Timeline;

    var _this = sender;
    var startdate = joolaio.visualisation.picker.DateBox.getDate().base_fromdate;
    var enddate = joolaio.visualisation.picker.DateBox.getDate().base_todate;


    if (joolaio.visualisation.picker.DateBox.comparePeriod) {
        var compare_startdate = joolaio.visualisation.picker.DateBox.getDate().compare_fromdate;
        var compare_enddate = joolaio.visualisation.picker.DateBox.getDate().compare_todate;
    }
    var queryOptions = [];

    var _queryOptions = {
        id: 'primary',
        startdate: joolaio.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
        enddate: joolaio.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
        dimensions: 'date.date',
        metrics: _this.primaryMetric.id,
        resolution: _this.Resolution,
        omitDate: false,
        filter: joolaio.visualisation.report.globalfilter
    };
    queryOptions.push(_queryOptions);

    if (_this.DateBox.comparePeriod) {
        _queryOptions = {
            id: 'compare_primary',
            startdate: joolaio.date.formatDate(compare_startdate, 'yyyy-mm-dd hh:nn:ss.000'),
            enddate: joolaio.date.formatDate(compare_enddate, 'yyyy-mm-dd hh:nn:ss.999'),
            dimensions: 'date.date',
            metrics: _this.primaryMetric.id,
            resolution: _this.Resolution,
            omitDate: false,
            filter: joolaio.visualisation.report.globalfilter
        };
        queryOptions.push(_queryOptions);
    }

    if (_this.secondaryMetric) {
        _queryOptions = {
            id: 'secondary',
            startdate: joolaio.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
            enddate: joolaio.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
            dimensions: 'date.date',
            metrics: _this.secondaryMetric.id,
            resolution: _this.Resolution,
            omitDate: false,
            filter: joolaio.visualisation.report.globalfilter
        };
        queryOptions.push(_queryOptions);

        if (_this.DateBox.comparePeriod) {
            _queryOptions = {
                id: 'compare_secondary',
                startdate: joolaio.date.formatDate(compare_startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                enddate: joolaio.date.formatDate(compare_enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                dimensions: 'date.date',
                metrics: _this.secondaryMetric.id,
                resolution: _this.Resolution,
                omitDate: false,
                filter: joolaio.visualisation.report.globalfilter
            };
            queryOptions.push(_queryOptions);
        }
    }
    if (_this.Filters.length > 0) {
        $(_this.Filters).each(function (i, dimension) {
            _queryOptions = {
                id: 'filter',
                startdate: joolaio.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                enddate: joolaio.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                dimensions: 'date.date',
                metrics: _this.primaryMetric.id,
                resolution: _this.Resolution,
                omitDate: false,
                filter: dimension
            };
            queryOptions.push(_queryOptions);

            if (_this.DateBox.comparePeriod) {
                _queryOptions = {
                    id: 'compare_filter',
                    startdate: joolaio.date.formatDate(compare_startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                    enddate: joolaio.date.formatDate(compare_enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                    dimensions: 'date.date',
                    metrics: _this.primaryMetric.id,
                    resolution: _this.Resolution,
                    omitDate: false,
                    filter: dimension
                };
                queryOptions.push(_queryOptions);
            }

            if (_this.secondaryMetric) {
                _queryOptions = {
                    id: 'filter_secondary',
                    startdate: joolaio.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                    enddate: joolaio.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                    dimensions: 'date.date',
                    metrics: _this.secondaryMetric.id,
                    resolution: _this.Resolution,
                    omitDate: false,
                    filter: dimension
                };
                queryOptions.push(_queryOptions);

                if (_this.DateBox.comparePeriod) {
                    _queryOptions = {
                        id: 'compare_filter_secondary',
                        startdate: joolaio.date.formatDate(compare_startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                        enddate: joolaio.date.formatDate(compare_enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                        dimensions: 'date.date',
                        metrics: _this.secondaryMetric.id,
                        resolution: _this.Resolution,
                        omitDate: false,
                        filter: dimension
                    };
                    queryOptions.push(_queryOptions);
                }
            }
        })
    }

    var first = true;
    var baseSeries = [];

    var nextcolor = 2;
    if (!_this.options.showPrimary)
        nextcolor = 0;


    joolaio.dataaccess.multifetch(_this, '/query.fetch', queryOptions, function (sender, data, error) {
        var yaxismin = [];
        $(data).each(function (index, item) {

            var series = [];
            var options = {};

            var result = item.data.Result;

            var request = item.data.Request;
            var _data = item.data.Result.Rows;


            var _series = [];

            if (_this.Resolution == 'Month') {
                _data[0].Values[0] = _this.DateBox.getDate().base_fromdate;
                _data[_data.length - 1].Values[0] = _this.DateBox.getDate().base_todate;
            }
            else if (_this.Resolution == 'Week') {
                _data[0].Values[0] = _this.DateBox.getDate().base_fromdate;
                //_data[_data.length - 1].Values[0] = _this.DateBox.base_todate;
            }

            $(_data).each(function (oindex, point) {

                var y = parseFloat(point.Values[1]);

                if (item.id == 'primary') {
                    //var x = new Date(point.Values[0]);

                    var x = new Date(point.Values[0]).fixDate(true,false);
                    //if (oindex < 200)


                    _series.push({x: x, y: y, name: result.Columns[1].name, formattedy: point.FormattedValues[1], compare: false});
                    baseSeries.push(x);
                }
                else {
                    var x = baseSeries[oindex];

                    var actualdate = joolaio.date.flatDate(point.FormattedValues[0]);

                    if (typeof x != 'undefined')
                        _series.push({x: x, y: y, name: result.Columns[1].name, formattedy: point.FormattedValues[1], compare: (item.id.indexOf('compare') > -1 ? true : false), actualdate: actualdate});
                }
            });

            var _name = '';
            var _color = '';
            var _lineWidth = 3;
            var _type = 'area';
            var _yAxis = 0;
            var _shadow = true;
            var _ordinal = 0;
            var _ytype = result.Columns[1].suffix;


            if (item.id == 'primary') {
                _name = result.Columns[1].name;
                _color = joolaio.colors[0];

                yaxismin[0] = _.min(_series,function (item) {
                    return item.y;
                }).y;
            }
            if (item.id == 'secondary') {
                _name = result.Columns[1].name;
                _color = joolaio.colors[1];

                _lineWidth = 2;
                _type = 'line';
                _yAxis = 1;
                _shadow = false;

                _ordinal = 1;

                yaxismin[1] = _.min(_series,function (item) {
                    return item.y;
                }).y;
            }
            if (item.id == 'filter') {

                var filtername = request.Filter;
                filtername = filtername.replace(/\[AND\]/g, ', ');
                filtername = filtername.substring(0, filtername.length - 2);

                $(filtername.split(',')).each(function (si, s) {
                    var _value = s.split('=')[1];
                    var _dimension = s.split('=')[0];

                    if ($.trim(_dimension) == 'date.date') {

                        try {
                            _value = new Date(_value);
                            if (_value == 'Invalid Date')
                                throw 'failed conversion';

                            _value = joolaio.date.formatDate(_value);
                        }
                        catch (ex) {
                            _value = s.split('=')[1];
                        }
                    }

                    _name += _value + ', ';
                });
                _name = _name.substring(0, _name.length - 2);
                _name += ': ' + result.Columns[1].name;

                _lineWidth = 2;
                _type = 'line';
                _yAxis = 0;
                _shadow = false;

                _color = joolaio.colors[nextcolor];
                if (!_this.DateBox.comparePeriod)
                    nextcolor++;

                _ordinal = 2;
            }
            if (item.id == 'filter_secondary') {
                var filtername = request.Filter;
                filtername = filtername.replace(/\[AND\]/g, ', ');
                filtername = filtername.substring(0, filtername.length - 2);

                $(filtername.split(',')).each(function (si, s) {
                    _name += s.split('=')[1] + ', ';
                });
                _name = _name.substring(0, _name.length - 2);
                _name += ': ' + result.Columns[1].name;


                _lineWidth = 2;
                _type = 'line';
                _yAxis = 1;
                _shadow = false;
                _color = joolaio.colors[nextcolor];
                if (!_this.DateBox.comparePeriod)
                    nextcolor++;

                _ordinal = 3;
            }
            if (item.id == 'compare_primary') {
                _name = result.Columns[1].name;
                _color = joolaio.offcolors[0];

                _lineWidth = 2;
                _type = 'line';
                _yAxis = 0;
                _shadow = false;

                _ordinal = 4;
            }
            if (item.id == 'compare_secondary') {
                _name = result.Columns[1].name;
                _color = joolaio.offcolors[1];

                _lineWidth = 2;
                _type = 'line';
                _yAxis = 1;
                _shadow = false;

                _ordinal = 5;
            }
            if (item.id == 'compare_filter') {


                var filtername = request.Filter;
                filtername = filtername.replace(/\[AND\]/g, ', ');
                filtername = filtername.substring(0, filtername.length - 2);

                $(filtername.split(',')).each(function (si, s) {
                    var _value = s.split('=')[1];
                    var _dimension = s.split('=')[0];

                    if ($.trim(_dimension) == 'date.date') {

                        try {
                            _value = new Date(_value);
                            if (_value == 'Invalid Date')
                                throw 'failed conversion';

                            _value = joolaio.date.formatDate(_value);
                        }
                        catch (ex) {
                            _value = s.split('=')[1];
                        }
                    }

                    _name += _value + ', ';
                });
                _name = _name.substring(0, _name.length - 2);
                _name += ': ' + result.Columns[1].name;


                _lineWidth = 2;
                _type = 'line';
                _yAxis = 0;
                _shadow = false;

                _color = joolaio.offcolors[nextcolor];
                nextcolor++;

                _ordinal = 6;
            }
            if (item.id == 'compare_filter_secondary') {
                var filtername = request.Filter;
                filtername = filtername.replace(/\[AND\]/g, ', ');
                filtername = filtername.substring(0, filtername.length - 2);

                $(filtername.split(',')).each(function (si, s) {
                    _name += s.split('=')[1] + ', ';
                });
                _name = _name.substring(0, _name.length - 2);
                _name += ': ' + result.Columns[1].name;

                _lineWidth = 2;
                _type = 'line';
                _yAxis = 1;
                _shadow = false;

                _color = joolaio.offcolors[nextcolor];
                nextcolor++;

                _ordinal = 7;
            }

            series.push({name: _name, color: _color, lineWidth: _lineWidth, shadow: _shadow, yaxis: _yAxis, type: _type, data: _series, ordinal: _ordinal, ytype: _ytype});


            joolaio.debug.log('INFO', 'joolaio.visualisation.report.Timeline', 5, 'Plotting ' + _series.length + ' points.');
            if (first) {
                _this.clearPlot(_this);
                first = false;
            }


            _this.plot(_this, queryOptions, series);
        });


        /*
         $(yaxismin).each(function (index, item) {

         _this.Chart.options.yAxis[index].min = item;
         });
         */


        var series = _this.Chart.series;
        var baseSuffix = (series[0].options.ytype == '' ? series[0].options.name : series[0].options.ytype);
        $(series).each(function (index, s) {
            if (index > 0) {
                //if ((s.options.ytype == '' ? s.options.name : s.options.ytype) == baseSuffix)
                //s.`update({yAxis: 0}, false);
            }
        });

        _this.Chart.redraw();
        if (_this.Chart.xAxis[0] && _this.Chart.xAxis[0].series[0] && _this.Chart.xAxis[0].series[0].points) {
            if (_this.Chart.xAxis[0].series[0].points.length == 1) {
                _this.Chart.xAxis[0].update({
                    startOnTick: true,
                    endOnTick: true,
                    showFirstLabel: true,
                    showLastLabel: true,
                    labels: {
                        y: 25 //removed
                    }
                }, false);
            }
        }

        if (_this.Chart.yAxis[0].dataMax === 0) {
            _this.Chart.yAxis[0].setExtremes(0, 5, false);
        }

        _this.Chart.redraw();

        /*
         if (yaxismin.length > 1 && _this.primaryMetric == _this.secondaryMetric) {

         _this.Chart.yAxis[1].setExtremes(_this.Chart.yAxis[1].getExtremes().min - _this.Chart.yAxis[1].translate(_this.Chart.yAxis[0].translate(0), true));
         }
         else if (yaxismin.length > 1 && _.min(_this.Chart.series[1], function(item){return item.y)}).y > 0)
         {
         _this.Chart.yAxis[1].setExtremes(_this.Chart.yAxis[1].getExtremes().min - _this.Chart.yAxis[1].translate(_this.Chart.yAxis[0].translate(0), true));
         }
         else {
         _this.Chart.yAxis[0].setExtremes(_this.Chart.yAxis[0].getExtremes().min - _this.Chart.yAxis[0].translate((0), true));
         }
         */
    });
    try {
        $(joolaio.visualisation).trigger('timeline-primarymetric', [_this, _this.primaryMetric]);
        $(joolaio.visualisation).trigger('timeline-secondarymetric', [_this, _this.secondaryMetric]);
    }
    catch (ex) {//ignore
    }
    //$(joolaio.visualisation).trigger('secondarymetric', [_this, _this.secondaryMetric]);
}

joolaio.visualisation.report.Timeline.prototype.clearPlot = function (sender) {

    if (!sender)
        sender = joolaio.visualisation.report.Timeline;
    $(sender.Chart.series).each(function (index, item) {
        this.remove(false);
    })

    //sender.Chart.xAxis[0].setExtremes(null, null, false);
    //sender.zoomButton.hide();

    sender.Chart.redraw();
};

joolaio.visualisation.report.Timeline.prototype.plot = function (sender, options, series) {
    var _this = sender;
    //if (!_this.options.showPrimary)
//        series.splice(0, 1);

    $(series).each(function (index, item) {

        var visible = true;
        if ((item.ordinal == 0 || item.ordinal == 4 || item.ordinal == 1 || item.ordinal == 5) && !_this.options.showPrimary)
            visible = false;

        sender.Chart.addSeries({visible: visible, turboThreshold: item.data.length, name: item.name, color: item.color, lineWidth: item.lineWidth, type: item.type, shadow: item.shadow, yAxis: item.yaxis, data: item.data, ordinal: item.ordinal, ytype: item.ytype}, false);
    });


    /*
     var min = sender.Chart.yAxis[0].getExtremes().dataMin;
     var max = sender.Chart.yAxis[0].getExtremes().max;

     if (min != null && max != null) {


     if (min < 0)
     sender.Chart.yAxis[0].setExtremes(0, max);
     else
     sender.Chart.yAxis[0].setExtremes(0, max);

     if (sender.Chart.yAxis.length > 1) {
     min = sender.Chart.yAxis[1].getExtremes().dataMin;
     max = sender.Chart.yAxis[1].getExtremes().max;
     if (min < 0)
     sender.Chart.yAxis[1].setExtremes(0, max);
     else
     sender.Chart.yAxis[1].setExtremes(0, max);
     }
     }
     */

};

joolaio.visualisation.report.Timeline.prototype.drawChart = function (Container) {
    var _this = this;
    //if (!this.Chart) {
    var _html = '';
    _html += '';
    _html += '<div class="chartcontrol" >'; //style="display: inline-block; width: 100%; padding-top: 10px;"
    _html += '<div class="metricpickers btn-group">';
    _html += '<table border="0" cellpadding="0" cellspacing="0">';
    _html += '<tbody><tr>';
    _html += '<td>';
    _html += '<div class="btn-group">';
    _html += '<div class="mainmetricwrapper"></div><!--<button class="btn mainmetricwrapper dropdown-toggle dropdown" data-toggle="dropdown">';
    _html += '<span class="joolaio metricname"></span>&nbsp;<span class="caret"></span>';
    _html += '</button>-->';
    _html += '<div class="joolaio metriccontainer current">';
    _html += '</div>';
    _html += '</div>';
    _html += '</td>';
    _html += '<td class="andbox" style="padding-left: 10px; padding-right: 10px;padding-top:2px;">';
    _html += 'and';
    _html += '</td>';
    _html += '<td>';
    _html += '<div>';
    _html += '<div class="joolaio comparemetricpicker btn-group" style="float: left"><div class="comparemetricwrapper"></div><!--';
    _html += '<a class="joolaio comparemetricwrapper btn dropdown-toggle dropdown" data-toggle="dropdown">';
    _html += '<span class="joolaio secondarymetricname">Select a metric...</span>&nbsp;<span class="caret"></span></a>-->';
    _html += '<div class="joolaio metriccontainer alltabs">';
    _html += '</div>';
    _html += '</div>';
    _html += '<i class="joolaio removecomparemetric icon-remove" style="float: right; margin-top: 8px;margin-left: 5px; cursor: pointer; display: none;"></i>';
    _html += '</div>';
    _html += '</td>';
    _html += '</tr>';
    _html += '</tbody></table>';
    _html += '</div>';
    _html += '<!--';
    _html += '<div class="btn-group charttype" data-toggle="buttons-radio" style="float: right;';
    _html += 'padding-left: 20px;">';
    _html += '<button class="btn active" data-id="area">';
    _html += '<img src="' + joolaio.hostname + '/assets//img/glyphicons_040_stats.png" height="17" width="17" />';
    _html += '</button>';
    _html += '<button class="btn" data-id="column">';
    _html += '<img src="' + joolaio.hostname + '/assets//img/glyphicons_041_charts.png" height="17" width="17" />';
    _html += '</button>';
    _html += '<button class="btn disabled" data-id="motion">';
    _html += '<img src="' + joolaio.hostname + '/assets//img/glyphicons_042_motion.png" height="21" width="21" />';
    _html += '</button>';
    _html += '</div>-->';
    _html += '<div class="btn-group resolutionpicker" data-toggle="buttons-radio">';
    _html += '<!--<button class="btn" data-id="Timeline">';
    _html += 'Timeline</button>';
    _html += '<button class="btn" data-id="Minute">';
    _html += 'Minute</button>';
    _html += '<button class="btn" data-id="Hour">';
    _html += 'Hour</button>-->';
    _html += '<button class="btn" data-id="Day">';
    _html += 'Day</button>';
    _html += '<button class="btn " data-id="Week">';
    _html += 'Week</button>';
    _html += '<button class="btn" data-id="Month">';
    _html += 'Month</button>';
    _html += '</div>';
    _html += '</div>';

    _html += '<div class="chartlegend">';
    _html += '<div class="legend">';
    _html += '</div>';
    _html += '</div>';

    $(Container).empty();
    $(Container).append(_html);

    switch (_this.Resolution) {
        case 'Day':
            $('.btn[data-id="Day"]').addClass('active');
            break;
        case 'Week':
            $('.btn[data-id="Week"]').addClass('active');
            break;
        case 'Month':
            $('.btn[data-id="Month"]').addClass('active');
            break;
        default:
            break;
    }

    var $item = $('<div class="joolaio picker metrics" data-type="button"></div>');
    //$(Container).find('.btn-group').empty();
    $(Container).find('.mainmetricwrapper').append($item);

    var _metrics = [];


    if (joolaio.visualisation.reportWrapper) {
        var reportID = joolaio.visualisation.reportWrapper.reportID;
        var report = joolaio.objects.Reports.Get(_this, {id: reportID});
        var tabID = joolaio.visualisation.reportWrapper.tabID;


        var tab = report.tabs[tabID];
        var mgs = tab.metricgroups;


        $(mgs).each(function (index, mg) {
            var metrics = mg.metrics;

            $(metrics).each(function (index, metric) {
                metric.Category = mg.name;
                _metrics.push(metric);
            });
        });
    }
    else
        _metrics = joolaio.objects.Metrics;


    var picker_metrics = new joolaio.visualisation.picker.Metrics({
        container: $item,
        exclude: _this.options.excludeMetrics,
        selected: _this.primaryMetric.name//,

        //metrics: _metrics
    });

    _this.selectedMetric = picker_metrics.selectedMetric;


    $(picker_metrics).bind('select', function (data, metric) {
        metric = _.find(joolaio.objects.Metrics, function (item) {
            return item.name == metric
        });
        _this.primaryMetric = metric;
        _this.fetch(_this);
        _this.setState(_this);

        picker_secondary.disableMetric(picker_secondary, metric);


    });

    $(joolaio.visualisation).unbind('metricbox-primarymetric');
    $(joolaio.visualisation).bind('metricbox-primarymetric', function (e, sender, metric) {
        if (sender.type != _this.type) {


            picker_metrics.setSelected(_this, metric.name);

            _this.primaryMetric = metric;
            _this.fetch(_this);
            _this.setState(_this);
            picker_secondary.disableMetric(picker_secondary, metric);
        }
    });


    var $item = $('<div class="joolaio picker metrics" data-type="button"></div>');
    //$(Container).find('.btn-group').empty();
    $(Container).find('.comparemetricwrapper').append($item);
    var picker_secondary = new joolaio.visualisation.picker.Metrics({
        container: $item,
        allowremove: true,
        exclude: _this.options.excludeMetrics,
        selected: (_this.secondaryMetric ? _this.secondaryMetric.name : '')//,
        //metrics: _metrics
    });

    picker_secondary.disableMetric(picker_secondary, _this.primaryMetric);

    $(picker_secondary).bind('select', function (data, metric) {
        metric = _.find(joolaio.objects.Metrics, function (item) {
            return item.name == metric
        });

        _this.secondaryMetric = metric;
        _this.fetch(_this);
        _this.setState(_this);

        //$(joolaio.visualisation).trigger('secondarymetric', _this, metric);
        picker_metrics.disableMetric(picker_metrics, _this.secondaryMetric);
    });
    $(joolaio.visualisation).unbind('secondarymetric');
    $(joolaio.visualisation).bind('secondarymetric', function (e, sender, metric) {
        if (sender.type != _this.type) {
            metric = _.find(joolaio.objects.Metrics, function (item) {
                return item.id == metric
            });

            _this.secondaryMetric = metric;
            _this.fetch(_this);
            _this.setState(_this);
        }
    });


    var $metlist = '<ul class="joolaio metriccontainer dropdown-menu">';
    $metlist += '</ul>';
    $metlist = $($metlist);

    //$metlist.append($('<li class="nav-header">' + joolaio.dataaccess.metrics[0].Name + '</li>'));

    //fill metric lists
    $(joolaio.objects.Metrics).each(function (index, metric) {
        var item = $('<li class="joolaio metriclink" data-id="' + metric.id + '"><a >' + metric.name + '</a></li>');

        item.off('click');
        item.click(function (e) {
            //alert('test');
            //_this.switchMetric(metric);

            var $parent = $($(this).parent());
            var _primaryMetric = !$($parent.parent()).parent().hasClass('comparemetricpicker');

            if (_primaryMetric) {
                _this.primaryMetric = metric;
                $('.joolaio.metricname').html(metric.name);
            }
            else {
                _this.secondaryMetric = metric;
                $('.joolaio.secondarymetricname').html(metric.name);
                $('.joolaio.removecomparemetric.icon-remove').show();

                $('.joolaio.comparemetricwrapper.btn.dropdown-toggle.dropdown').addClass('selected');
            }

            try {
                //_this.clearPlot();
                _this.fetch(_this);
                _this.setState(_this);
            }
            catch (e) {
            }


            $parent.children().each(function (a, b) {
                $(this).removeClass('active');
            });

            $(this).addClass('active');
        });
        $($metlist).append(item);
    });

    //$('.joolaio.metricname').html(joolaio.dataaccess.metrics[0].Name);

    $('.joolaio.metricname').html(_this.primaryMetric.name);
    $(Container).find('.joolaio.metriccontainer.current').append($metlist);
    $(Container).find('.joolaio.metriccontainer.alltabs').append($metlist.clone(true));
    $(Container).append('<div class="chart" style="width:100%;display:block;"></div>');

    //$($(Container).find('.joolaio.metriccontainer.current')).find('.metriclink')[0].click();
    //$($(Container).find('.joolaio.metriccontainer.alltabs')).find('.metriclink')[1].click();

    $('.joolaio.removecomparemetric.icon-remove').off('click');
    $('.joolaio.removecomparemetric.icon-remove').on('click', function () {
        _this.secondaryMetric = null;

        try {
            //_this.clearPlot();
            _this.fetch(_this);
        }
        catch (e) {
        }

        $('.joolaio.secondarymetricname').html('Select a metric...');
        $(this).hide();
        $('.joolaio.comparemetricwrapper.btn.dropdown-toggle.dropdown').removeClass('selected');
        $('.joolaio.metriccontainer.alltabs li').each(function (index, item) {
            $(item).removeClass('active');
        })
    });


    _this.Chart = new Highcharts.Chart({
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
            renderTo: $(Container).find('.chart').get(0),
            animation: false, /*{
             duration:200,
             transition:'easeOutBounce'
             },*/
            //type:_this.ChartType,
            type: 'area',
            alignTicks: true,
            //zoomType:'x',
            events: {
                load: function (event) {

                },
                redraw: function () {
                    $(Container).find('.legend').empty();

                    var _series = _this.Chart.series;
                    $(joolaio).trigger('report-timeline-redraw', [_series]);
                    $(_series).each(function (index, series) {

                        var seriesname = '';
                        var _html = '';

                        if (series.visible) {
                            seriesname = series.name;

                            _html = '<span class="legendmark" style="border-color: ' + series.color + ';"></span>&nbsp;';
                            _html += '<span class="legendseries" data-id="0">' + seriesname + '</span>';
                            $(Container).find('.legend').append(_html);
                        }
                    });
                },
                selection: function (event) {
                    if (event.xAxis) {

                        var fromdate = new Date(event.xAxis[0].min);
                        var todate = new Date(event.xAxis[0].max);


                        var diff = todate - fromdate;

                        //if (_this.Resolution != 'Hour') {
                        var resolution = '';

                        if (_this.Resolution == 'Month') {
                            resolution = 'Day';
                        }
                        if (_this.Resolution == 'Day' && diff <= 2592000000) {
                            resolution = 'Hour';
                        }
                        if (_this.Resolution == 'Hour' && diff <= 86400000) {
                            resolution = 'Minute';
                        }
                        if (_this.Resolution == 'Minute' && diff <= 3600000) {
                            //resolution = 'Timeline';
                        }

                        if (_this.Resolution != resolution && resolution != '') {
                            fromdate.setMinutes(0);
                            fromdate.setSeconds(0);
                            fromdate.setMilliseconds(0);

                            todate.setMinutes(0);
                            todate.setSeconds(0);
                            todate.setMilliseconds(0);

                            _this.DateBox.setDate(_this.DateBox, fromdate, todate);

                            var $button = $('.resolutionpicker').find('.btn[data-id="' + resolution + '"]');
                            _this.switchResolution(_this, resolution, $button);

                            //event.preventDefault();
                        }
                        else {
                            var fromMillis = Math.floor(event.xAxis[0].min);
                            var toMillis = Math.ceil(event.xAxis[0].max);

                            _this.Chart.xAxis[0].setExtremes(fromMillis, toMillis, false);
                            _this.Chart.redraw();

                            _this.zoomButton.show();
                        }
                        event.preventDefault();

                        // }
                    } else {

                    }
                }
            }
        },
        title: {text: null},
        xAxis: {
            type: (this.ChartType == 'column' ? 'linear' : 'datetime'),
            dateTimeLabelFormats: {
                day: '%b %e'
            },
            labels: {
                formatter: function () {
                    var date = new Date(this.value);
                    var sDate = '';

                    var dayDiff = (_this.DateBox.getDate().base_fromdate.getTime() - _this.DateBox.getDate().base_todate.getTime()) / 1000 / 60 / 60 / 24;
                    dayDiff = Math.round(Math.abs(dayDiff));

                    if (date.getHours() != 0) {
                        sDate = joolaio.date.formatDate(date, 'mmm dd'); // hh:nn
                    }
                    else {
                        sDate = joolaio.date.formatDate(date, 'mmm dd');
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
                //min:0,
                //max:100000,
                showFirstLabel: false,
                showLastLabel: true,
                endOnTick: true,
                title: {text: null},
                labels: {
                    formatter: function () {
                        var ytype = '';
                        try {
                            ytype = this.chart.series[0].options.ytype;
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
                                return joolaio.string.formatNumber(this.value, 0, true);
                            }
                            else {
                                return joolaio.string.formatNumber(this.value, 1, true);
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
                    y: 15
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
                //min:0,
                gridLineColor: '#efefef', //#ddd

                showFirstLabel: false,
                showLastLabel: true,
                endOnTick: true,
                title: {text: null},
                labels: {
                    formatter: function () {
                        var ytype = '';
                        try {
                            ytype = this.chart.series[this.chart.series.length - 1].options.ytype;
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
                                return joolaio.string.formatNumber(this.value, 0, true);
                            }
                            else {
                                return joolaio.string.formatNumber(this.value, 1, true);
                            }
                        }
                    },
                    style: {
                        fontFamily: 'Signika', //Arial
                        fontSize: '11px', //19ox
                        color: '#999', //#666
                        textShadow: '-1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff'
                    },
                    x: -25,
                    y: 15,
                    align: 'right'
                },
                opposite: true
            }
        ],
        tooltip: {
            borderColor: '#333333',
            shared: true,
            useHTML: true,
            formatter: function () {


                var points = this.points;
                var formattedDate = '';

                if (this.points.length == 1) {
                    var nextindex = 0;
                    if (_this.Resolution == 'Hour' || _this.Resolution == 'Minute') {
                        formattedDate = joolaio.date.formatDate(this.points[0].point.x);
                    }
                    else if (_this.Resolution == 'Month') {
                        $(points[0].series.xData).each(function (index, item) {
                            if (item == points[0].point.x) {
                                nextindex = index + 1;
                            }
                        });

                        if (nextindex < points[0].series.xData.length) {
                            if (nextindex == points[0].series.xData.length - 1) {
                                //one before last point
                                formattedDate = joolaio.date.formatDate(joolaio.date.flatDate(points[0].point.x));
                                var sDate = joolaio.date.flatDate(points[0].series.xData[nextindex]);
                                sDate = joolaio.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth(), 0));
                                formattedDate += ' - ' + joolaio.date.formatDate(sDate);
                            }
                            else {
                                formattedDate = joolaio.date.formatDate(joolaio.date.flatDate(points[0].point.x));
                                var sDate = joolaio.date.flatDate(points[0].series.xData[nextindex]);
                                sDate.setDate(sDate.getDate() - 1);
                                formattedDate += ' - ' + joolaio.date.formatDate(sDate);
                            }
                        }
                        else {
                            var sDate = joolaio.date.flatDate(points[0].point.x);
                            sDate.setDate(1);
                            formattedDate = joolaio.date.formatDate(sDate);
                            formattedDate += ' - ' + joolaio.date.formatDate(points[0].point.x);
                        }
                    }
                    else if (_this.Resolution == 'Week') {
                        $(points[0].series.xData).each(function (index, item) {
                            if (item == points[0].point.x) {
                                nextindex = index + 1;
                            }
                        });
                        if (nextindex < points[0].series.xData.length) {
                            formattedDate = joolaio.date.formatDate(joolaio.date.flatDate(points[0].point.x));
                            var sDate = joolaio.date.flatDate(points[0].series.xData[nextindex]);
                            sDate.setDate(sDate.getDate() - 1);
                            formattedDate += ' - ' + joolaio.date.formatDate(sDate);
                        }
                        else {
                            var sDate = joolaio.date.flatDate(points[0].point.x);
                            //sDate.setDate(1);
                            formattedDate = joolaio.date.formatDate(sDate);
                            formattedDate += ' - ' + joolaio.date.formatDate(_this.DateBox.base_todate);
                        }
                    }
                    else {
                        formattedDate = joolaio.date.formatDate(points[0].point.x);
                    }

                    return '<div style="padding-bottom:5px;"><b>' +
                        formattedDate +
                        '</b></div><div><div style="border: 3px solid white; border-color: ' + joolaio.colors[0] + '; border-radius: 3px;height: 0px; display: inline-block; width: 0px;position:relative;top:-1px;">' +
                        '</div><div style="padding-left:3px;display:inline">' + this.points[0].point.name.replace('_x0020_', ' ') + ': ' + this.points[0].point.formattedy + '</div>' +
                        '</div>';
                } else {

                    if (this.points[1].point.compare) {
                        if (_this.Resolution == 'Month') {
                            $(points[0].series.xData).each(function (index, item) {
                                if (item == points[0].point.x) {
                                    nextindex = index + 1;
                                }
                            });

                            if (nextindex < points[0].series.xData.length) {
                                if (nextindex == points[0].series.xData.length - 1) {
                                    //one before last point
                                    formattedDate = joolaio.date.formatDate(joolaio.date.flatDate(points[0].point.x));
                                    var sDate = joolaio.date.flatDate(points[0].series.xData[nextindex]);
                                    sDate = joolaio.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth(), 0));
                                    formattedDate += ' - ' + joolaio.date.formatDate(sDate);
                                }
                                else {
                                    formattedDate = joolaio.date.formatDate(joolaio.date.flatDate(points[0].point.x));
                                    var sDate = joolaio.date.flatDate(points[0].series.xData[nextindex]);
                                    sDate.setDate(sDate.getDate() - 1);
                                    formattedDate += ' - ' + joolaio.date.formatDate(sDate);
                                }
                            }
                            else {
                                var sDate = joolaio.date.flatDate(points[0].point.x);
                                sDate.setDate(1);
                                formattedDate = joolaio.date.formatDate(sDate);
                                formattedDate += ' - ' + joolaio.date.formatDate(points[0].point.x);
                            }
                        }
                        else if (_this.Resolution == 'Week') {
                            $(points[0].series.xData).each(function (index, item) {
                                if (item == points[0].point.x) {
                                    nextindex = index + 1;
                                }
                            });
                            if (nextindex < points[0].series.xData.length) {
                                formattedDate = joolaio.date.formatDate(joolaio.date.flatDate(points[0].point.x));
                                var sDate = joolaio.date.flatDate(points[0].series.xData[nextindex]);
                                sDate.setDate(sDate.getDate() - 1);
                                formattedDate += ' - ' + joolaio.date.formatDate(sDate);
                            }
                            else {
                                var sDate = joolaio.date.flatDate(points[0].point.x);
                                //sDate.setDate(1);
                                formattedDate = joolaio.date.formatDate(sDate);
                                formattedDate += ' - ' + joolaio.date.formatDate(_this.DateBox.base_todate);
                            }
                        }
                        else {
                            formattedDate = joolaio.date.formatDate(points[0].point.x);
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
                        if (_this.Resolution == 'Month') {


                            $(points[1].series.points).each(function (index, item) {

                                if (item.actualdate == points[1].point.actualdate) {
                                    nextindex = index + 1;
                                }
                            });

                            if (nextindex < points[1].series.points.length) {
                                if (nextindex == points[1].series.points.length - 1) {
                                    //one before last point
                                    formattedDate = joolaio.date.formatDate(joolaio.date.flatDate(points[1].point.actualdate));
                                    var sDate = joolaio.date.flatDate(points[1].series.points[nextindex].actualdate);
                                    sDate = joolaio.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth(), 0));

                                    formattedDate += ' - ' + joolaio.date.formatDate(sDate);
                                }
                                else {
                                    formattedDate = joolaio.date.formatDate(joolaio.date.flatDate(points[1].point.actualdate));
                                    var sDate = joolaio.date.flatDate(points[1].series.points[nextindex].actualdate);

                                    sDate.setDate(sDate.getDate() - 1);
                                    formattedDate += ' - ' + joolaio.date.formatDate(sDate);
                                }
                            }
                            else {
                                var sDate = joolaio.date.flatDate(points[1].point.actualdate);
                                sDate.setDate(1);
                                formattedDate = joolaio.date.formatDate(sDate);
                                sDate = joolaio.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth() + 1, 0));
                                formattedDate += ' - ' + joolaio.date.formatDate(sDate);
                            }
                        }
                        else if (_this.Resolution == 'Week') {
                            $(points[1].series.points).each(function (index, item) {
                                if (item.actualdate == points[1].point.actualdate) {
                                    nextindex = index + 1;
                                }
                            });
                            if (nextindex < points[1].series.points.length) {
                                formattedDate = joolaio.date.formatDate(joolaio.date.flatDate(points[1].point.actualdate));
                                var sDate = joolaio.date.flatDate(points[1].series.points[nextindex].actualdate);
                                sDate.setDate(sDate.getDate() - 1);
                                formattedDate += ' - ' + joolaio.date.formatDate(sDate);
                            }
                            else {
                                var sDate = joolaio.date.flatDate(points[1].point.actualdate);
                                //sDate.setDate(1);
                                formattedDate = joolaio.date.formatDate(sDate);
                                formattedDate += ' - ' + joolaio.date.formatDate(_this.DateBox.compare_todate);
                            }
                        }
                        else {
                            formattedDate = joolaio.date.formatDate(points[1].point.actualdate);
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
                        if (_this.Resolution == 'Month') {
                            $(points[0].series.xData).each(function (index, item) {
                                if (item == points[0].point.x) {
                                    nextindex = index + 1;
                                }
                            });

                            if (nextindex < points[0].series.xData.length) {
                                if (nextindex == points[0].series.xData.length - 1) {
                                    //one before last point
                                    formattedDate = joolaio.date.formatDate(joolaio.date.flatDate(points[0].point.x));
                                    var sDate = joolaio.date.flatDate(points[0].series.xData[nextindex]);
                                    sDate = joolaio.date.flatDate(new Date(sDate.getFullYear(), sDate.getMonth(), 0));
                                    formattedDate += ' - ' + joolaio.date.formatDate(sDate);
                                }
                                else {
                                    formattedDate = joolaio.date.formatDate(joolaio.date.flatDate(points[0].point.x));
                                    var sDate = joolaio.date.flatDate(points[0].series.xData[nextindex]);
                                    sDate.setDate(sDate.getDate() - 1);
                                    formattedDate += ' - ' + joolaio.date.formatDate(sDate);
                                }
                            }
                            else {
                                var sDate = joolaio.date.flatDate(points[0].point.x);
                                sDate.setDate(1);
                                formattedDate = joolaio.date.formatDate(sDate);
                                formattedDate += ' - ' + joolaio.date.formatDate(points[0].point.x);
                            }
                        }
                        else if (_this.Resolution == 'Week') {
                            $(points[0].series.xData).each(function (index, item) {
                                if (item == points[0].point.x) {
                                    nextindex = index + 1;
                                }
                            });
                            if (nextindex < points[0].series.xData.length) {
                                formattedDate = joolaio.date.formatDate(joolaio.date.flatDate(points[0].point.x));
                                var sDate = joolaio.date.flatDate(points[0].series.xData[nextindex]);
                                sDate.setDate(sDate.getDate() - 1);
                                formattedDate += ' - ' + joolaio.date.formatDate(sDate);
                            }
                            else {
                                var sDate = joolaio.date.flatDate(points[0].point.x);
                                //sDate.setDate(1);
                                formattedDate = joolaio.date.formatDate(sDate);
                                formattedDate += ' - ' + joolaio.date.formatDate(_this.DateBox.base_todate);
                            }
                        }
                        else {
                            formattedDate = joolaio.date.formatDate(points[0].point.x);
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
            series: {
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
        }/*,
         series:[
         {
         data:[]
         }
         ]*/
    });

    _this.zoomButton = _this.Chart.renderer.button('Reset zoom', _this.Chart.chartWidth - 90, 10, function () {
        _this.Chart.xAxis[0].setExtremes(null, null, false);
        _this.Chart.redraw();
        _this.zoomButton.hide();
    });
    _this.zoomButton.hide().add();

    $('.charttype').find('.btn').each(function () {
        $(this).off('click');
        $(this).click(function () {
            //_this.switchChartType($(this).attr('data-id'));
        });
    });

    $('.resolutionpicker').find('.btn').each(function () {
        $(this).off('click');
        $(this).click(function () {

            //_this.Resolution = $(this).attr('data-id');
            //_this.clearPlot();
            //_this.fetch();

            _this.switchResolution(_this, $(this).attr('data-id'), this);
        });
    });


    $(joolaio).trigger('report-timeline-loaded', [_this.Resolution]);
};

joolaio.visualisation.report.Timeline.prototype.switchResolution = function (sender, resolution, button) {
    sender.Resolution = resolution;
    sender.fetch(sender);

    $('.resolutionpicker').find('.btn').each(function () {

        $(this).removeClass('active');
    });
    $(button).addClass('active');

    sender.setState(sender);
};

joolaio.visualisation.report.Timeline.prototype.uid = function (sender) {
    return 'timeline-1234';
}

joolaio.visualisation.report.Timeline.prototype.setState = function (sender) {
    var _this = sender;

    if (!joolaio.state[_this.uid()])
        joolaio.state[_this.uid()] = {};
    joolaio.debug.log('INFO', 'joolaio.visualisation.report.Timeline', 6, 'Timeline "' + _this.uid() + '" saving state.');
    joolaio.state[_this.uid()].primaryMetric = _this.primaryMetric;
    joolaio.state[_this.uid()].secondaryMetric = _this.secondaryMetric;
    joolaio.state[_this.uid()].Resolution = _this.Resolution;
    //joolaio.saveState('Timeline "' + _this.uid() + '" change');
};

joolaio.visualisation.report.Timeline.prototype.getState = function (sender) {
    var _this = sender;

    joolaio.debug.log('INFO', 'joolaio.visualisation.report.Timeline', 6, 'Timeline "' + _this.uid() + '" loading state.');
    if (joolaio.state[_this.uid()] != null) {

        _this.primaryMetric = joolaio.state[_this.uid()].primaryMetric;
        _this.secondaryMetric = joolaio.state[_this.uid()].secondaryMetric;
        _this.Resolution = joolaio.state[_this.uid()].Resolution;
    }
};

joolaio.debug.log('INFO', 'joolaio.visualisation.report.Timeline', 6, 'JS source loaded');

/**
 * init the Datebox and look for containers
 */
/*
 if ($('.joolaio.report.panel').length == 0)
 new joolaio.visualisation.report.Timeline().init();
 */