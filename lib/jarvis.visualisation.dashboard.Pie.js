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
 * @fileoverview Provides a realtime visualisation to display current server date and time.
 *
 */

jarvis.provide('jarvis.visualisation.dashboard.Pie');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

//jarvis.require('jarvis.dashboard');
jarvis.require('jarvis.visualisation.dashboard');

/**
 * Create and install a realtime timeline handler.
 * @constructor
 * @param {string=} options optional options to be passed to class
 */

jarvis.visualisation.dashboard.Pie = function (options) {
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
    //jarvis.debug.log('INFO', 'jarvis.visualisation.dashboard.Pie', 5, '...Constructor (' + executionTime + 'ms)');
};


/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
jarvis.visualisation.dashboard.Pie.prototype.init = function (options, container) {

    var _this = this;
    var start = new Date().getMilliseconds();

    this._this = this;
    //this.options = options;
    this.options = $.extend({
        legend: true
    }, options);
    this.containers = this.containers || [];
    this.dimensions = [];
    this.metrics = [];

    this.DateBox = jarvis.visualisation.picker.DateBox;

    //$(jarvis.realtime).bind('filterchange', function (e) {

    //});

    //lookup any containers relevant for the timeline
    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.jarvis.dashboard.pie');
    if (matchedContainers.length == 0)
        return;

    //_this.Container = matchedContainers;

    $(matchedContainers).each(function (index, item) {
        if (!$(this).parent().hasClass('prettyprint')) {
            jarvis.debug.log('INFO', 'jarvis.visualisation.dashboard.Pie', 6, 'Applying to container (\'' + this.id + '\')');

            var _legend = $(item).attr('data-legend');
            if (_legend)
                _this.options.legend = eval(_legend);

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
    jarvis.debug.log('INFO', 'Jarvis.Dashboard.Visualisation.Pie', 5, '...init (' + executionTime + 'ms)');
};

/**
 * Inits the class and builds the base html for it.
 * @return (string) returns the base html to be applied in the container
 */

jarvis.visualisation.dashboard.Pie.prototype.fetch = function (sender, container) {
    if (!sender)
        sender = jarvis.visualisation.dashboard.Pie;

    var _this = sender;

    var startdate = jarvis.visualisation.picker.DateBox.getDate().base_fromdate;
    var enddate = jarvis.visualisation.picker.DateBox.getDate().base_todate;
    if (_this.DateBox.comparePeriod) {

        var compare_startdate = jarvis.visualisation.picker.DateBox.getDate().compare_fromdate;
        var compare_enddate = jarvis.visualisation.picker.DateBox.getDate().compare_todate;
    }

    var _dimensions = $(container).attr('data-dimensions');
    var _dimensionslist = _dimensions;
    if (!_dimensions)
        return '';
    _dimensions = _dimensions.split(',');
    $(_dimensions).each(function (index, item) {
        var dindex = -1;
        $(jarvis.objects.Dimensions).each(function (mi, mo) {
            if (mo.id == $.trim(item))
                dindex = mi;
        });
        _dimensions[index] = jarvis.objects.Dimensions[dindex];
        //_dimensions[index] = $.trim(_dimensions[index]);
        _this.dimensions.push(_dimensions[index]);
    });
    $(jarvis.objects.Dimensions).each(function (index, item) {
        if (_dimensions.indexOf(item.id) > -1)
            _this.dimensions[_dimensions.indexOf(item.id)] = item;
    });

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
        dimensions: _dimensionslist,
        metrics: _metricslist,
        resolution: _this.Resolution,
        omitDate: true,
        filter: jarvis.visualisation.dashboard.globalfilter,
        sortKey: _metrics[_metrics.length - 1].id,
        sortDir: 'DESC'
    };
    queryOptions.push(_queryOptions);


    if (_this.DateBox.comparePeriod) {
        _queryOptions = {
            id: 'compare_primary',
            startdate: jarvis.date.formatDate(compare_startdate, 'yyyy-mm-dd hh:nn:ss.000'),
            enddate: jarvis.date.formatDate(compare_enddate, 'yyyy-mm-dd hh:nn:ss.999'),
            dimensions: _dimensionslist,
            metrics: _metricslist,
            resolution: _this.Resolution,
            omitDate: true,
            filter: jarvis.visualisation.dashboard.globalfilter,
            sortKey: _metrics[_metrics.length - 1].id,
            sortDir: 'DESC'
        };
        queryOptions.push(_queryOptions);
    }

    jarvis.dataaccess.multifetch(_this, '/query.fetch', queryOptions, function (sender, data, error) {
        var series = [];
        $(data).each(function (index, item) {
            try {
                var result = item.data.Result;
                var request = item.data.Request;
                var _data = item.data.Result.Rows;


                /*
                 var points = {
                 total:0,
                 ftotal:0,
                 data:[],
                 id:data.id
                 };
                 $(_data).each(function (i, row) {
                 var point = row;
                 points.total += parseFloat(point.value);
                 points.data.push(point);
                 });*/
                series.push(item.data.Result);
            }
            catch (ex) {

            }
        });

        // if (_this.DateBox.comparePeriod == false) {
        _this.update(sender, _dimensions, _metrics, series, container);
        // }
        // else
        //    _this.updateCompare(sender, _dimensions, _metrics, series, container);
    });
    //});
};

jarvis.visualisation.dashboard.Pie.prototype.update = function (sender, dimensions, metrics, series, container) {


    var _this = sender;


    if (!series[0])
        return;

    var _itemcount = $(container).attr('data-limit');
    if (_itemcount)
        _this.itemCount = _itemcount;


    var $container = $($(container).find('.piechart'));
    var columns = series[0].Columns;
    var data = series[0].Rows;

    var _totalsum = 0;
    $(data).each(function (index, row) {
        _totalsum += parseFloat(row.Values[row.Values.length - 1]);
    });

    var chart = new Highcharts.Chart({
        chart: {
            animation: false,
            renderTo: $container.get(0),
            backgroundColor: null,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            width: '230',
            height: '230',
            marginTop: 0,
            marginLeft: 0,
            marginRight: 5,
            marginBottom: 0,
            spacingLeft: 0,
            spacingTop: 0,
            spacingRight: 0,
            spacingBottom: 0
        },
        title: {
            text: null
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.point.name + '</b><br/>' + this.series.name + ': ' + jarvis.string.formatNumber(this.percentage, 2) + ' %';
            }
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        plotOptions: {
            pie: {
                showInLegend: true,
                size: '100%',
                animation: false
            }
        },
        series: [
            {
                name: function () {
                    var name = '';
                    name = columns[columns.length - 1].name;
                    return name;
                }(),
                type: 'pie',
                data: function () {
                    var result = [];
                    var sum = 0;

                    $(data).each(function (index, item) {
                        if (index < _this.itemCount) {

                            var name = '';
                            $(columns).each(function (ci, co) {
                                if (co.aggregation) {

                                }
                                else
                                    name += columns[ci].name + ': ' + item.FormattedValues[ci];
                            });
                            name = name.substring(0, name.length - 5);
                            var y = 0;
                            y = item.Values[item.Values.length - 1] / _totalsum * 100;
                            sum += y;
                            result.push({name: name, y: y, color: jarvis.colors[index]});
                        }
                    });

                    if (100 - Math.floor(sum) > 0) {
                        var name = 'Other';
                        var y = 100 - sum;
                        result.push({name: name, y: y, color: jarvis.colors[11]});
                    }

                    return result;
                }(),
                dataLabels: {
                    formatter: function () {
                        return this.y > 5 ? this.point.name : null;
                    },
                    color: 'white',
                    distance: -30,
                    enabled: false
                }
            },
            {
                name: function () {
                    var name = 'inner';
                    name = columns[columns.length - 1].name;
                    return name;
                }(),
                type: 'pie',
                innerSize: '70%',
                data: function () {
                    var result = [];
                    if (series.length > 1) {
                        var sum = 0;
                        var _totalsum_compare = 0;
                        var compare_data = series[1].Rows;
                        $(compare_data).each(function (index, row) {
                            _totalsum_compare += parseFloat(row.Values[row.Values.length - 1]);
                        });


                        $(data).each(function (datai, datao) {
                            if (datai < _this.itemCount) {
                                var key = datao.FormattedValues[0];
                                $(compare_data).each(function (index, item) {
                                    if (item.FormattedValues[0] == key) {
                                        var name = '';
                                        $(columns).each(function (ci, co) {
                                            if (co.aggregation) {

                                            }
                                            else
                                                name += columns[ci].name + ': ' + item.FormattedValues[ci];
                                        });
                                        var y = 0;
                                        y = item.Values[item.Values.length - 1] / _totalsum_compare * 100;
                                        sum += y;
                                        result.push({name: name, y: y});
                                    }
                                });
                            }
                        });

                        if (100 - Math.floor(sum) > 0) {
                            var name = 'Other';
                            var y = 100 - sum;
                            result.push({name: name, y: y, color: jarvis.colors[11]});
                        }
                    }
                    return result;
                }(),
                dataLabels: {
                    formatter: function () {
                        // display only if larger than 1
                        return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                    },
                    enabled: false
                }
            }
        ]
    });


    var sum = 0;
    var result = [];
    var shownsum = 0;
    var totalsum = 0;

    $(data).each(function (index, item) {
        if (index < _this.itemCount) {
            var name = '';
            $(columns).each(function (ci, co) {
                if (co.aggregation) {

                }
                else {
                    name += item.FormattedValues[ci] + '<br/>';
                }
            });
            name = name.substring(0, name.length - 5);
            var y = 0;
            y = item.Values[item.Values.length - 1] / _totalsum * 100;
            sum += y;

            shownsum += parseFloat(item.Values[item.Values.length - 1]);

            result.push({seriesname: columns[columns.length - 1].name, name: name, y: y, value: item.FormattedValues[item.Values.length - 1], color: jarvis.colors[index]});
        }
        totalsum += parseFloat(item.Values[item.Values.length - 1]);
    });


    if (totalsum - shownsum > 0) {
        var name = 'Other';
        var y = 100 - sum;
        result.push({name: name, y: y, color: jarvis.colors[11], value: jarvis.string.formatNumber(totalsum - shownsum, 0, true), seriesname: columns[columns.length - 1].name});
    }

    var compare_shownsum = 0;
    var compare_totalsum = 0;
    if (_this.options.legend) {
        var $legend = $($(container).find('.legend'));
        $legend.empty();
        if (series.length > 1) {
            var compare_data = series[1].Rows;
            result = [];
            $(data).each(function (index, item) {
                if (index < _this.itemCount) {
                    var key = item.FormattedValues[0];
                    $(compare_data).each(function (cindex, citem) {
                        if (citem.FormattedValues[0] == key) {

                            var base_value = item.Values[1];
                            var compare_value = citem.Values[1];

                            var diff = percentageChange(compare_value, base_value);

                            compare_shownsum += parseFloat(citem.Values[citem.Values.length - 1]);


                            result.push({name: key, base: item.FormattedValues[1], compare: citem.FormattedValues[1], diff: diff});
                        }
                    });
                }
                compare_totalsum += parseFloat(item.Values[item.Values.length - 1]);
            });

            $(result).each(function (index, item) {
                var _class = '';
                var metric = series[0].Columns[1];
                if (metric.RatioDirection == -1 && item.diff < 0)
                    _class = 'positive';
                if (metric.RatioDirection == -1 && item.diff > 0)
                    _class = 'negative';
                if (metric.RatioDirection == 1 && item.diff > 0)
                    _class = 'positive';
                if (metric.RatioDirection == 1 && item.diff < 0)
                    _class = 'negative';
                if (_class == '')
                    _class = 'neutral';

                var $div = $('<div class="legenditem"></div>');
                $div.append('<div class="caption"><div class="colorbox" style="background-color: ' + jarvis.colors[index] + '"></div>' +
                    '<span class="' + _class + '">' + jarvis.string.formatNumber(item.diff, 2) + '%</span> ' + item.name + '</div>' +
                    '<div class="summary">' + item.base + ' vs ' + item.compare + '</div>' +
                    '');
                $legend.append($div);
            });
            /*
             if (compare_notshown - base_notshown > 0) {
             var name = 'Not shown';
             var y = 100 - sum;
             result.push({name:name, y:y, color:colors[11], value:jarvis.string.formatNumber(totalsum - shownsum, 0, true), seriesname:columns[columns.length - 1].Name});

             var compare_notshown = compare_totalsum - compare_shownsum;
             var base_notshown = totalsum - shownsum;
             var diff = percentageChange(compare_notshown, base_notshown);



             var $div = $('<div class="legenditem"></div>');
             $div.append('<div class="caption"><div class="colorbox" style="background-color: ' + colors[11] + '"></div>' +
             '<span class="' + 'neutral' + '">' + jarvis.string.formatNumber(diff, 2) + '%</span> ' + 'Not shown' + '</div>' +
             '<div class="summary">' + jarvis.string.formatNumber(base_notshown, 0, true) + ' vs ' + jarvis.string.formatNumber(compare_notshown, 0, true) + '</div>' +
             '');
             $legend.append($div);
             }*/
        }
        else {
            $(result).each(function (index, item) {
                var $div = $('<div class="legenditem"></div>');
                $div.append('<div class="caption"><div class="colorbox" style="background-color: ' + item.color + '"></div>' +
                    jarvis.string.formatNumber(item.y, 2) + '% ' + item.name + '</div>' +
                    '<div class="summary">' + item.value + ' ' + item.seriesname + '</div>' +
                    '');
                $legend.append($div);
            });
        }
    }
};

jarvis.visualisation.dashboard.Pie.prototype.draw = function (container) {
    var _this = this;

    //var metrics = _this.metrics;//$(Container).attr('data-metrics');
    //metrics = metrics.split(',');
    //$(metrics).each(function (index, item) {
    //item = $.trim(item);

    var title = 'TITLE';
    var dimensions = 'DIMENSION';
    var metrics = this.default_subcaption;


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

    if ($($(container).parent()).attr('class').indexOf('span5') > -1) {
        $html.append('<div class="row-fluid">' +
            '<div class="header">' +
            '<div class="settings"></div>' +
            '<div class="move"></div>' +
            '<h3>' + title + '</h3>' +
            '</div>' +
            '<div class="content">' +
            '<table class="table" ><tr class="row row-fluid">' +
            '<td class="span6"><div class="piechart"></div></td>' +
            '<td class="span6"><div class="legend"></div></td>' +
            '</tr></table>' +
            '</div>' +
            '</div>');
    }
    else {
        $html.append('<div class="row-fluid">' +
            '<div class="header">' +
            '<div class="settings"></div>' +
            '<div class="move"></div>' +
            '<h3>' + title + '</h3>' +
            '</div>' +
            '<div class="content">' +
            '<table class="table" >' +
            '<tr class="row row-fluid"><td class="span12"><div class="piechart"></div></td></tr>' +
            '<tr class="row row-fluid"><td class="span12" style="padding-left:10px;"><div class="legend"></div></td></table>' +
            '</table>' +
            '</div>' +
            '</div>');
    }

    $(container).append($html);
};

jarvis.debug.log('INFO', 'Jarvis.Dashboard.Visualisation.Pie', 6, 'JS source loaded');

/**
 * init the Timeline and look for containers
 */
//new jarvis.visualisation.dashboard.Pie().init();
