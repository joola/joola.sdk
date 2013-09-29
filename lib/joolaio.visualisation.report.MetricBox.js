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

joolaio.provide('joolaio.visualisation.report.MetricBox');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

//joolaio.require('joolaio.report');
joolaio.require('joolaio.visualisation.report');

/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
joolaio.visualisation.report.MetricBox = function (options, container) {
    var _this = this;
    var start = new Date().getMilliseconds();

    this._this = this;
    this.ChartType = 'line';
    this.Resolution = 'Day';
    this.primaryMetric = joolaio.objects.Metrics[0];
    this.secondaryMetric = null;
    this.Filters = [];

    this.metrics = [];
    this.Container = null;

    //this.Filters.push(joolaio.dataaccess.dimensions[0].Name + '=' + 'ABCD');
    //this.Filters.push(joolaio.dataaccess.dimensions[2].Name + '=' + 'ABCD');

    this.DateBox = joolaio.visualisation.picker.DateBox;

    joolaio.objects.Dimensions.List();
    joolaio.objects.Metrics.List();

    var executionTime = new Date().getMilliseconds() - start;

    return this;
}

joolaio.visualisation.report.MetricBox.prototype.init = function (options, container) {
    var _this = this;
    var start = new Date().getMilliseconds();

    //lookup any containers relevant for the timeline
    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.joolaio.report.metricbox');
    if (matchedContainers.length == 0)
        return;

    $(matchedContainers).each(function (index, item) {
        if (!$(this).parent().hasClass('prettyprint')) {
            joolaio.debug.log('INFO', 'joolaio.visualisation.report.MetricBox', 6, 'Applying to container (\'' + this.id + '\')');

            //apply html and bind methods/events
            _this.Container = item;
            var _metrics = $(item).attr('data-metrics');
            if (!_metrics) {
                _metrics = joolaio.objects.Metrics[0].id;
                //return;
            }
            _metrics = _metrics.split(',');
            $(_metrics).each(function (index, item) {
                _metrics[index] = $.trim(_metrics[index]);
                _this.metrics.push(_metrics[index]);
            });

            $(joolaio.objects.Metrics).each(function (index, item) {
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

            $(joolaio.visualisation.report).bind('filter', function (filter) {
                _this.fetch(_this);
            });

            $(joolaio.visualisation).bind('timeline-primarymetric', function (e, sender, metric) {
                $('.jmetricbox').removeClass('primaryactive');
                var $metric = $(_this.Container).find('.jmetricbox[data-metric="' + metric.id + '"]');
                $metric.addClass('primaryactive');
                $metric.find('.legendmark').css({'border-color': joolaio.colors[0] });
                $(joolaio).trigger('report-metricbox-draw', [$metric, true]);
            });

            $(joolaio.visualisation).bind('timeline-secondarymetric', function (e, sender, metric) {
                $('.jmetricbox').removeClass('secondaryactive');
                var $metric = $(_this.Container).find('.jmetricbox[data-metric="' + metric.id + '"]');

                if (metric) {
                    $metric.addClass('secondaryactive');
                    $metric.find('.legendmark').css({'border-color': joolaio.colors[1] });
                }
                $(joolaio).trigger('report-metricbox-draw', [$metric, false]);
            });
        }
    });

    var executionTime = new Date().getMilliseconds() - start;
    joolaio.debug.log('INFO', 'joolaio.visualisation.report.MetricBox', 5, '...init (' + executionTime + 'ms)');

    return this;
};

joolaio.visualisation.report.MetricBox.prototype.fetch = function (sender, container) {
    if (!sender)
        sender = joolaio.visualisation.report.MetricBox;

    var _this = sender;

    var startdate = joolaio.visualisation.picker.DateBox.getDate().base_fromdate;
    var enddate = joolaio.visualisation.picker.DateBox.getDate().base_todate;
    if (_this.DateBox.comparePeriod) {

        var compare_startdate = joolaio.visualisation.picker.DateBox.getDate().compare_fromdate;
        var compare_enddate = joolaio.visualisation.picker.DateBox.getDate().compare_todate;
    }


    $(_this.metrics).each(function (index, metric) {
        var queryOptions = [];
        var _queryOptions = {
            id: 'primary',
            startdate: joolaio.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
            enddate: joolaio.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
            dimensions: '',
            metrics: metric.id,
            resolution: _this.Resolution,
            omitDate: true,
            filter: joolaio.visualisation.report.globalfilter
        };
        queryOptions.push(_queryOptions);

        if (_this.DateBox.comparePeriod) {
            _queryOptions = {
                id: 'compare_primary',
                startdate: joolaio.date.formatDate(compare_startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                enddate: joolaio.date.formatDate(compare_enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                dimensions: '',
                metrics: metric.id,
                resolution: _this.Resolution,
                omitDate: true,
                filter: joolaio.visualisation.report.globalfilter
            };
            queryOptions.push(_queryOptions);
        }

        if (!_this.DateBox.comparePeriod && joolaio.visualisation.report.globalfilter && joolaio.visualisation.report.globalfilter != '') {
            var _queryOptions = {
                id: 'total',
                startdate: joolaio.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
                enddate: joolaio.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
                dimensions: '',
                metrics: metric.id,
                resolution: _this.Resolution,
                omitDate: true,
                filter: ''
            };
            queryOptions.push(_queryOptions);
        }

        joolaio.dataaccess.multifetch(_this, '/query.fetch', queryOptions, function (sender, data, error) {
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
            if (joolaio.visualisation.secondarymetric && joolaio.visualisation.secondarymetric.id == metric.id)
                primary = false;
            else
                primary = true;
            $(joolaio).trigger('report-metricbox-draw', [_this, primary ]);
        });
    });
};

joolaio.visualisation.report.MetricBox.prototype.update = function (sender, metric, series) {
    var _this = sender;
    var $metric = $(_this.Container).find('.jmetricbox[data-metric="' + metric.id + '"]');

    var displayValue = series[0].value;
    if (displayValue > 1000000 || displayValue < -1000000) {
        displayValue = joolaio.string.shortenNumber(displayValue);
        if (metric.suffix != null)
            displayValue += metric.suffix;
        if (metric.prefix != null)
            displayValue = metric.prefix + displayValue;
    }
    else
        displayValue = series[0].fvalue;

    $metric.find('.value').html(displayValue);
    $metric.find('.value').attr('title', series[0].fvalue);
    $metric.find('.value').removeClass('neutral');
    $metric.find('.value').removeClass('negative');
    $metric.find('.value').removeClass('positive');

    var ratio;

    if (metric.aggregation == "sum" || metric.aggregation == "count") {
        ratio = 100;
        if (series[0].totalvalue > 0)
            ratio = series[0].value / (series.length == 1 ? series[0].value : series[1].value) * 100;
        if (series.length == 1)
            $metric.find('.summary').html('<span class="summaryvalue">' + joolaio.string.formatNumber(ratio, 2) + '%</span> of Total<br>(' + series[0].ftotalvalue + ')');
        else {
            $metric.find('.summary').html('<span class="summaryvalue">' + joolaio.string.formatNumber(ratio, 2) + '%</span> of Total<br>(' + series[1].ftotalvalue + ')');
        }
    }
    else if (metric.aggregation == "avg") {
        ratio = 0;
        if (series[0].totalvalue > 0)
            ratio = percentageChange((series.length == 1 ? series[0].value : series[1].value), series[0].totalvalue);
        if (series.length == 1)
            $metric.find('.summary').html('Overall Avg: <span class="summaryvalue">' + series[0].ftotalvalue + '</span><br>(' + joolaio.string.formatNumber(ratio, 2) + '%)');
        else {
            $metric.find('.summary').html('<span class="summaryvalue">' + joolaio.string.formatNumber(ratio, 2) + '%</span> change<br>(' + series[1].ftotalvalue + ')');
        }
    }

    if (joolaio.visualisation.primarymetric && joolaio.visualisation.primarymetric.id == metric.id) {
        $metric.addClass('primaryactive');
    }
    else
        $metric.removeClass('primaryactive');
    if (joolaio.visualisation.secondarymetric && joolaio.visualisation.secondarymetric.id == metric.id) {
        $metric.addClass('secondaryactive');
    }
    else
        $metric.removeClass('secondaryactive');

    $metric.off('click');
    $metric.on('click', function () {

        // $('.jmetricbox').removeClass('active');
        //$metric.addClass('active');
        // $metric.find('.legendmark').css({'border-color':joolaio.colors[0] });
        try {
            $(joolaio.visualisation).trigger('metricbox-primarymetric', [_this, metric]);
        }
        catch (ex) {
            //ignore
        }
    });

};

joolaio.visualisation.report.MetricBox.prototype.updateCompare = function (sender, metric, series) {
    var _this = sender;
    var $metric = $(_this.Container).find('.jmetricbox[data-metric="' + metric.id + '"]');


    var value = percentageChange(series[1].value, series[0].value);

    $metric.find('.value').removeClass('negative');
    $metric.find('.value').removeClass('neutral');
    $metric.find('.value').removeClass('positive');

    var _class = 'neutral';

    if (metric.ratiodirection == -1 && Math.round(parseFloat(value)) < 0)
        _class = 'positive';
    if (metric.ratiodirection == -1 && Math.round(parseFloat(value)) > 0)
        _class = 'negative';
    if (metric.ratiodirection == 1 && Math.round(parseFloat(value)) > 0)
        _class = 'positive';
    if (metric.ratiodirection == 1 && Math.round(parseFloat(value)) < 0)
        _class = 'negative';
    //if (_class == '')
    // _class = 'neutral';

    value = joolaio.string.formatNumber(value, 2) + '%';


    
    $metric.find('.value').html(value);
    $metric.find('.value').addClass(_class);
    $metric.find('.summary').html(series[0].fvalue + ' vs ' + series[1].fvalue);
    //$metric.find('.value').html(series[0].value);

    if (joolaio.visualisation.primarymetric && joolaio.visualisation.primarymetric.id == metric.id) {

        $metric.addClass('primaryactive');
        //$(joolaio).trigger('report-metricbox-draw', [_this, true, joolaio.colors[0]]);
    }
    else
        $metric.removeClass('primaryactive');
    if (joolaio.visualisation.secondarymetric && joolaio.visualisation.secondarymetric.id == metric.id) {
        $metric.addClass('secondaryactive');

    }
    else
        $metric.removeClass('secondaryactive');

    $metric.off('click');
    $metric.on('click', function () {

        // $('.jmetricbox').removeClass('active');
        //$metric.addClass('active');
        // $metric.find('.legendmark').css({'border-color':joolaio.colors[0] });
        try {
            $(joolaio.visualisation).trigger('metricbox-primarymetric', [_this, metric]);
        }
        catch (ex) {
            //ignore
        }
    });
};

joolaio.visualisation.report.MetricBox.prototype.baseHTML = function (item) {
    return '<div class="caption">' + item.name + '</div>' +
        '<div class="valuewrapper"><span class="legendmark" style=""></span><div class="value"></div></div>' +
        '<div class="summary"></div>';
}

joolaio.visualisation.report.MetricBox.prototype.draw = function (Container) {
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

    if (joolaio.visualisation.primarymetric != null) {
        var metric = joolaio.visualisation.primarymetric;
        var $metric = $(_this.Container).find('.jmetricbox[data-metric="' + metric.id + '"]');
        $('.jmetricbox').removeClass('primaryactive');
        $metric.addClass('primaryactive');
        $metric.find('.legendmark').css({'border-color': joolaio.colors[0] });
        $(joolaio).trigger('report-metricbox-draw', [$metric, true, joolaio.colors[0]]);
    }

    if (joolaio.visualisation.report.timeline.secondaryMetric != null) {
        var metric = joolaio.visualisation.report.timeline.secondaryMetric;
        var $metric = $(_this.Container).find('.jmetricbox[data-metric="' + metric.id + '"]');
        $('.jmetricbox').removeClass('secondaryactive');
        $metric.addClass('secondaryactive');
        $metric.find('.legendmark').css({'border-color': joolaio.colors[1] });
        $(joolaio).trigger('report-metricbox-draw', [$metric, false, joolaio.colors[1]]);
    }
};

joolaio.debug.log('INFO', 'joolaio.visualisation.report.MetricBox', 6, 'JS source loaded');

/**
 * init the Datebox and look for containers
 */
/*
 if ($('.joolaio.report.panel').length == 0)
 joolaio.visualisation.report.MetricBox.init();
 */