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
 * @fileoverview Provides a report visualisation to display current server date and time.
 *
 */


jarvis.provide('jarvis.visualisation.report.MetricBox');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

//jarvis.require('jarvis.report');
jarvis.require('jarvis.visualisation.report');

/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
jarvis.visualisation.report.MetricBox = function (options, container) {
    var _this = this;
    var start = new Date().getMilliseconds();

    this._this = this;
    this.ChartType = 'line';
    this.Resolution = 'Day';
    this.primaryMetric = jarvis.objects.Metrics[0];
    this.secondaryMetric = null;
    this.Filters = [];

    this.metrics = [];
    this.Container = null;

    //this.Filters.push(jarvis.dataaccess.dimensions[0].Name + '=' + 'ABCD');
    //this.Filters.push(jarvis.dataaccess.dimensions[2].Name + '=' + 'ABCD');

    this.DateBox = jarvis.visualisation.picker.DateBox;

    jarvis.objects.Dimensions.List();
    jarvis.objects.Metrics.List();

    var executionTime = new Date().getMilliseconds() - start;

    return this;
}

jarvis.visualisation.report.MetricBox.prototype.init = function (options, container) {
    var _this = this;
    var start = new Date().getMilliseconds();

    //lookup any containers relevant for the timeline
    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.jarvis.report.metricbox');
    if (matchedContainers.length == 0)
        return;

    $(matchedContainers).each(function (index, item) {
        if (!$(this).parent().hasClass('prettyprint')) {
            jarvis.debug.log('INFO', 'jarvis.visualisation.report.MetricBox', 6, 'Applying to container (\'' + this.id + '\')');

            //apply html and bind methods/events
            _this.Container = item;
            var _metrics = $(item).attr('data-metrics');
            if (!_metrics) {
                _metrics = jarvis.objects.Metrics[0].id;
                //return;
            }
            _metrics = _metrics.split(',');
            $(_metrics).each(function (index, item) {
                _metrics[index] = $.trim(_metrics[index]);
                _this.metrics.push(_metrics[index]);
            });

            $(jarvis.objects.Metrics).each(function (index, item) {
                if (_metrics.indexOf(item.id) > -1)
                    _this.metrics[_metrics.indexOf(item.id)] = item;
            });

            $(item).empty();
            _this.draw(item);
            _this.fetch(_this, item);

            $(this).bind('data', function (evt, ret) {
                ret.data = $(this).data().data;
            });

            $(this).bind('click', function (evt) {
                $(this).trigger('clicked', $(this).data().data);
            });

            $(_this.DateBox).bind('datechange', function () {
                _this.fetch(_this);
            });

            $(jarvis.visualisation.report).bind('filter', function (filter) {
                _this.fetch(_this);
            });

            $(jarvis.visualisation).bind('timeline-primarymetric', function (e, sender, metric) {
                $('.jmetricbox').removeClass('primaryactive');
                var $metric = $(_this.Container).find('.jmetricbox[data-metric="' + metric.id + '"]');
                $metric.addClass('primaryactive');
                $metric.find('.legendmark').css({'border-color': jarvis.colors[0] });
                $(jarvis).trigger('report-metricbox-draw', [$metric, true]);
            });

            $(jarvis.visualisation).bind('timeline-secondarymetric', function (e, sender, metric) {
                $('.jmetricbox').removeClass('secondaryactive');
                var $metric = $(_this.Container).find('.jmetricbox[data-metric="' + metric.id + '"]');

                if (metric) {
                    $metric.addClass('secondaryactive');
                    $metric.find('.legendmark').css({'border-color': jarvis.colors[1] });
                }
                $(jarvis).trigger('report-metricbox-draw', [$metric, false]);
            });
        }
    });

    var executionTime = new Date().getMilliseconds() - start;
    jarvis.debug.log('INFO', 'jarvis.visualisation.report.MetricBox', 5, '...init (' + executionTime + 'ms)');

    return this;
};

jarvis.visualisation.report.MetricBox.prototype.fetch = function (sender, container) {
    if (!sender)
        sender = jarvis.visualisation.report.MetricBox;

    var _this = sender;

    var startdate = jarvis.visualisation.picker.DateBox.getDate().base_fromdate;
    var enddate = jarvis.visualisation.picker.DateBox.getDate().base_todate;
    if (_this.DateBox.comparePeriod) {

        var compare_startdate = jarvis.visualisation.picker.DateBox.getDate().compare_fromdate;
        var compare_enddate = jarvis.visualisation.picker.DateBox.getDate().compare_todate;
    }


    $(_this.metrics).each(function (index, metric) {
        var queryOptions = [];
        var _queryOptions = {
            id: 'primary',
            startdate: jarvis.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
            enddate: jarvis.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
            dimensions: '',
            metrics: metric.id,
            resolution: _this.Resolution,
            omitDate: true,
            filter: jarvis.visualisation.report.globalfilter
        };
        queryOptions.push(_queryOptions);

        if (_this.DateBox.comparePeriod) {
            _queryOptions = {
                id: 'compare_primary',
                startdate: jarvis.date.formatDate(compare_startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                enddate: jarvis.date.formatDate(compare_enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                dimensions: '',
                metrics: metric.id,
                resolution: _this.Resolution,
                omitDate: true,
                filter: jarvis.visualisation.report.globalfilter
            };
            queryOptions.push(_queryOptions);
        }

        if (!_this.DateBox.comparePeriod && jarvis.visualisation.report.globalfilter && jarvis.visualisation.report.globalfilter != '') {
            var _queryOptions = {
                id: 'total',
                startdate: jarvis.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                enddate: jarvis.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                dimensions: '',
                metrics: metric.id,
                resolution: _this.Resolution,
                omitDate: true,
                filter: ''
            };
            queryOptions.push(_queryOptions);
        }

        jarvis.dataaccess.multifetch(_this, '/query.fetch', queryOptions, function (sender, data, error) {
            var series = [];
            $(data).each(function (index, item) {

                var result = item.data.Result;
                var request = item.data.Request;
                var _data = item.data.Result.Rows;

                try {
                    var point = {
                        value: _data[0].Values[0],
                        fvalue: _data[0].FormattedValues[0],
                        totalvalue: _data[0].Values[0],
                        ftotalvalue: _data[0].FormattedValues[0]
                    };
                }
                catch (ex) {
                    var point = {
                        value: 0,
                        fvalue: 0,
                        totalvalue: 0,
                        ftotalvalue: 0
                    };
                }
                series.push(point);
            });



            if (_this.DateBox.comparePeriod == false) {
                _this.update(sender, metric, series);
            }
            else
                _this.updateCompare(sender, metric, series);

            var primary;
            if (jarvis.visualisation.secondarymetric && jarvis.visualisation.secondarymetric.id == metric.id)
                primary = false;
            else
                primary = true;
            $(jarvis).trigger('report-metricbox-draw', [_this, primary ]);
        });
    });
};

jarvis.visualisation.report.MetricBox.prototype.update = function (sender, metric, series) {
    var _this = sender;
    var $metric = $(_this.Container).find('.jmetricbox[data-metric="' + metric.id + '"]');

    var displayValue = series[0].value;
    if (displayValue > 1000000 || displayValue < -1000000) {
        displayValue = jarvis.string.shortenNumber(displayValue);
        if (metric.suffix != '')
            displayValue += metric.suffix;
        if (metric.prefix != '')
            displayValue = metric.prefix + displayValue;
    }
    else
        displayValue = series[0].fvalue;

    $metric.find('.value').html(displayValue);
    $metric.find('.value').attr('title', series[0].fvalue);

    $metric.find('.value').removeClass('negative');
    $metric.find('.value').removeClass('positive');

    var ratio;

    if (metric.aggregation == "sum" || metric.aggregation == "count") {
        ratio = 100;
        if (series[0].totalvalue > 0)
            ratio = series[0].value / (series.length == 1 ? series[0].value : series[1].value) * 100;
        if (series.length == 1)
            $metric.find('.summary').html('<span class="summaryvalue">' + jarvis.string.formatNumber(ratio, 2) + '%</span> of Total<br>(' + series[0].ftotalvalue + ')');
        else {
            $metric.find('.summary').html('<span class="summaryvalue">' + jarvis.string.formatNumber(ratio, 2) + '%</span> of Total<br>(' + series[1].ftotalvalue + ')');
        }
    }
    else if (metric.aggregation == "avg") {
        ratio = 0;
        if (series[0].totalvalue > 0)
            ratio = percentageChange((series.length == 1 ? series[0].value : series[1].value), series[0].totalvalue);
        if (series.length == 1)
            $metric.find('.summary').html('Overall Avg: <span class="summaryvalue">' + series[0].ftotalvalue + '</span><br>(' + jarvis.string.formatNumber(ratio, 2) + '%)');
        else {
            $metric.find('.summary').html('<span class="summaryvalue">' + jarvis.string.formatNumber(ratio, 2) + '%</span> change<br>(' + series[1].ftotalvalue + ')');
        }
    }

    if (jarvis.visualisation.primarymetric && jarvis.visualisation.primarymetric.id == metric.id) {
        $metric.addClass('primaryactive');
    }
    else
        $metric.removeClass('primaryactive');
    if (jarvis.visualisation.secondarymetric && jarvis.visualisation.secondarymetric.id == metric.id) {
        $metric.addClass('secondaryactive');
    }
    else
        $metric.removeClass('secondaryactive');

    $metric.off('click');
    $metric.on('click', function () {

        // $('.jmetricbox').removeClass('active');
        //$metric.addClass('active');
        // $metric.find('.legendmark').css({'border-color':jarvis.colors[0] });
        try {
            $(jarvis.visualisation).trigger('metricbox-primarymetric', [_this, metric]);
        }
        catch (ex) {
            //ignore
        }
    });

    //TO DO: remove this
    //$($metric).popover({placement:'top', trigger:'hover', delay:{ show: 1000, hide: 100 }, title:'<strong>' + metric.Name + '</strong>', content:metric.HelpText});
};

jarvis.visualisation.report.MetricBox.prototype.updateCompare = function (sender, metric, series) {
    var _this = sender;
    var $metric = $(_this.Container).find('.jmetricbox[data-metric="' + metric.id + '"]');


    var value = percentageChange(series[1].value, series[0].value);

    $metric.find('.value').removeClass('negative');
    $metric.find('.value').removeClass('positive');

    var _class = 'neutral';

    if (metric.RatioDirection == -1 && Math.round(parseFloat(value)) < 0)
        _class = 'positive';
    if (metric.RatioDirection == -1 && Math.round(parseFloat(value)) > 0)
        _class = 'negative';
    if (metric.RatioDirection == 1 && Math.round(parseFloat(value)) > 0)
        _class = 'positive';
    if (metric.RatioDirection == 1 && Math.round(parseFloat(value)) < 0)
        _class = 'negative';
    //if (_class == '')
    // _class = 'neutral';

    value = jarvis.string.formatNumber(value, 2) + '%';

    $metric.find('.value').html(value);
    $metric.find('.value').addClass(_class);
    $metric.find('.summary').html(series[0].fvalue + ' vs ' + series[1].fvalue);
    //$metric.find('.value').html(series[0].value);

    if (jarvis.visualisation.primarymetric && jarvis.visualisation.primarymetric.id == metric.id) {

        $metric.addClass('primaryactive');
        //$(jarvis).trigger('report-metricbox-draw', [_this, true, jarvis.colors[0]]);
    }
    else
        $metric.removeClass('primaryactive');
    if (jarvis.visualisation.secondarymetric && jarvis.visualisation.secondarymetric.id == metric.id) {
        $metric.addClass('secondaryactive');

    }
    else
        $metric.removeClass('secondaryactive');

    $metric.off('click');
    $metric.on('click', function () {

        // $('.jmetricbox').removeClass('active');
        //$metric.addClass('active');
        // $metric.find('.legendmark').css({'border-color':jarvis.colors[0] });
        try {
            $(jarvis.visualisation).trigger('metricbox-primarymetric', [_this, metric]);
        }
        catch (ex) {
            //ignore
        }
    });
};

jarvis.visualisation.report.MetricBox.prototype.baseHTML = function (item) {
    return '<div class="caption">' + item.name + '</div>' +
        '<div class="valuewrapper"><span class="legendmark" style=""></span><div class="value"></div></div>' +
        '<div class="summary"></div>';
}

jarvis.visualisation.report.MetricBox.prototype.draw = function (Container) {
    var _this = this;

    var metrics = _this.metrics;//$(Container).attr('data-metrics');
    //metrics = metrics.split(',');
    $(metrics).each(function (index, item) {
        //item = $.trim(item);


        var _html = '<div class="jmetricbox" style="width:' + Math.floor(100 / metrics.length) + '%" data-metric="' + item.id + '"></div>';
        var $html = $(_html);
        $(Container).append($html);

        _html = _this.baseHTML(item);

        $html.append(_html);


    });

    if (jarvis.visualisation.primarymetric != null) {
        var metric = jarvis.visualisation.primarymetric;
        var $metric = $(_this.Container).find('.jmetricbox[data-metric="' + metric.id + '"]');
        $('.jmetricbox').removeClass('primaryactive');
        $metric.addClass('primaryactive');
        $metric.find('.legendmark').css({'border-color': jarvis.colors[0] });
        $(jarvis).trigger('report-metricbox-draw', [$metric, true, jarvis.colors[0]]);
    }

    if (jarvis.visualisation.report.timeline.secondaryMetric != null) {
        var metric = jarvis.visualisation.report.timeline.secondaryMetric;
        var $metric = $(_this.Container).find('.jmetricbox[data-metric="' + metric.id + '"]');
        $('.jmetricbox').removeClass('secondaryactive');
        $metric.addClass('secondaryactive');
        $metric.find('.legendmark').css({'border-color': jarvis.colors[1] });
        $(jarvis).trigger('report-metricbox-draw', [$metric, false, jarvis.colors[1]]);
    }
};

jarvis.debug.log('INFO', 'jarvis.visualisation.report.MetricBox', 6, 'JS source loaded');

/**
 * init the Datebox and look for containers
 */
/*
 if ($('.jarvis.report.panel').length == 0)
 jarvis.visualisation.report.MetricBox.init();
 */