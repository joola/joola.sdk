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


joolaio.provide('joolaio.visualisation.report.OverviewPie');

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

joolaio.visualisation.report.OverviewPie = function (options) {
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
    //joolaio.debug.log('INFO', 'joolaio.visualisation.report.OverviewPie', 5, '...Constructor (' + executionTime + 'ms)');
};


/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
joolaio.visualisation.report.OverviewPie.prototype.init = function (options, container) {
    var _this = this;
    var start = new Date().getMilliseconds();

    this._this = this;
    this.options = options;

    this.containers = this.containers || [];
    this.dimensions = [];
    this.metrics = [];

    this.DateBox = joolaio.visualisation.picker.DateBox;

    //$(joolaio.realtime).bind('filterchange', function (e) {

    //});

    //lookup any containers relevant for the timeline
    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.joolaio.report.overviewpie');
    if (matchedContainers.length == 0)
        return;

    //_this.Container = matchedContainers;

    $(matchedContainers).each(function (index, item) {
        if (!$(this).parent().hasClass('prettyprint')) {
            joolaio.debug.log('INFO', 'joolaio.visualisation.report.OverviewPie', 6, 'Applying to container (\'' + this.id + '\')');

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

    $(joolaio.visualisation).bind('metricbox-primarymetric', function (e, sender, metric) {
        _this.metrics[0] = metric;
        _this.fetch(_this,_this.containers[0]);
    });

    var executionTime = new Date().getMilliseconds() - start;
    joolaio.debug.log('INFO', 'joolaio.Dashboard.Visualisation.Pie', 5, '...init (' + executionTime + 'ms)');
};

/**
 * Inits the class and builds the base html for it.
 * @return (string) returns the base html to be applied in the container
 */

joolaio.visualisation.report.OverviewPie.prototype.fetch = function (sender, container) {

    if (!sender)
        sender = joolaio.visualisation.report.OverviewPie;
    var _this = sender;

    var startdate = joolaio.visualisation.picker.DateBox.getDate().base_fromdate;
    var enddate = joolaio.visualisation.picker.DateBox.getDate().base_todate;
    if (_this.DateBox.comparePeriod) {
        //console.log('compare');
        var compare_startdate = joolaio.visualisation.picker.DateBox.getDate().compare_fromdate;
        var compare_enddate = joolaio.visualisation.picker.DateBox.getDate().compare_todate;
    }

    var _dimensions = $(container).attr('data-dimensions');
    var _dimensionslist = _dimensions;
    if (!_dimensions)
        return '';

    _dimensions = _dimensions.split(',');
    $(_dimensions).each(function (index, item) {
        var dindex = -1;
        $(joolaio.dataaccess.dimensions).each(function (mi, mo) {
            if (mo.Name == $.trim(item))
                dindex = mi;
        });
        _dimensions[index] = joolaio.dataaccess.dimensions[dindex];
        //_dimensions[index] = $.trim(_dimensions[index]);
        _this.dimensions.push(_dimensions[index]);
    });
    $(joolaio.dataaccess.dimensions).each(function (index, item) {
        if (_dimensions.indexOf(item.Name) > -1)
            _this.dimensions[_dimensions.indexOf(item.Name)] = item;
    });

    //console.log(_this.metrics);

    var _metrics = '';
    if (_this.metrics.length > 0){
        _metrics = _this.metrics[0].Name;
        _this.metrics.splice(0,_this.metrics.length);
    }
    else
        _metrics = $(container).attr('data-metrics');
    var _metricslist = _metrics;
    if (!_metrics)
        return '';

    _metrics = _metrics.split(',');
    $(_metrics).each(function (index, item) {
        var mindex = -1;
        $(joolaio.dataaccess.metrics).each(function (mi, mo) {
            if (mo.Name == $.trim(item))
                mindex = mi;
        });
        _metrics[index] = joolaio.dataaccess.metrics[mindex];
        _this.metrics.push(_metrics[index]);
    });

    $(joolaio.dataaccess.metrics).each(function (index, item) {
        if (_metrics.indexOf(item.Name) > -1)
            _this.metrics[_metrics.indexOf(item.Name)] = item;
    });

    if (_this.metrics.length == 0)
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
        id:'primary',
        FromDate:joolaio.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
        ToDate:joolaio.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
        Dimensions:_dimensionslist,
        Metrics:_metricslist,
        Resolution:_this.Resolution,
        omitDate:true,
        Filter:joolaio.visualisation.dashboard.globalfilter,
        sortKey:_metrics[_metrics.length - 1].Name,
        sortDir:'DESC'
    };
    queryOptions.push(_queryOptions);

//console.log(_metrics[_metrics.length - 1].Name);

    if (_this.DateBox.comparePeriod) {
        _queryOptions = {
            id:'compare_primary',
            FromDate:joolaio.date.formatDate(compare_startdate, 'yyyy-mm-dd hh:nn:ss.000'),
            ToDate:joolaio.date.formatDate(compare_enddate, 'yyyy-mm-dd hh:nn:ss.999'),
            Dimensions:_dimensionslist,
            Metrics:_metricslist,
            Resolution:_this.Resolution,
            omitDate:true,
            Filter:joolaio.visualisation.dashboard.globalfilter,
            sortKey:_metrics[_metrics.length - 1].Name,
            sortDir:'DESC'
        };
        queryOptions.push(_queryOptions);
    }

//console.log(queryOptions);
    joolaio.dataaccess.multifetch(_this, '/engine/Query.svc/fetch', queryOptions, function (sender, data, error) {
        var series = [];
        $(data).each(function (index, item) {
            try {
                var result = item.data.Result;
                var request = item.data.Request;
                var _data = item.data.Result.Rows;

                //console.log(_data);
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
}
;

joolaio.visualisation.report.OverviewPie.prototype.update = function (sender, dimensions, metrics, series, container) {

    //console.log('update');


    var _this = sender;

    //console.log(series [0]);

    if (!series[0])
        return;

    var _itemcount = $(container).attr('data-limit');
    if (_itemcount)
        _this.itemCount = _itemcount;

    //console.log(_itemcount);

    var $container = $($(container).find('.piechart'));
    var columns = series[0].Columns;
    var data = series[0].Rows;

    var _totalsum = 0;
    $(data).each(function (index, row) {
        _totalsum += parseFloat(row.Values[row.Values.length - 1]);
    });

    var chart = new Highcharts.Chart({
        chart:{
            animation:true,
            renderTo:$container.get(0),
            backgroundColor:null,
            plotBackgroundColor:null,
            plotBorderWidth:null,
            plotShadow:false,
            type:'pie',
            width:'230',
            height:'230',
            marginTop:0,
            marginLeft:0,
            marginRight:5,
            marginBottom:0,
            spacingLeft:0,
            spacingTop:0,
            spacingRight:0,
            spacingBottom:0
        },
        title:{
            text:null
        },
        tooltip:{
            formatter:function () {
                return '<b>' + this.point.name + '</b><br/>' + this.series.name + ': ' + joolaio.string.formatNumber(this.percentage, 2) + ' %';
            }
        },
        legend:{
            enabled:false
        },
        credits:{
            enabled:false
        },
        exporting:{
            enabled:false
        },
        plotOptions:{
            pie:{
                showInLegend:true,
                size:'100%',
                animation:true
            }
        },
        series:[
            {
                name:function () {
                    var name = '';
                    name = columns[columns.length - 1].Name;
                    return name;
                }(),
                type:'pie',
                data:function () {
                    var result = [];
                    var sum = 0;

                    $(data).each(function (index, item) {
                        if (index < _this.itemCount) {
                            //console.log(index);
                            var name = '';
                            $(columns).each(function (ci, co) {
                                if (co.aggregation) {

                                }
                                else
                                    name += columns[ci].Name + ': ' + item.FormattedValues[ci];
                            });
                            name = name.substring(0, name.length - 5);
                            var y = 0;
                            y = item.Values[item.Values.length - 1] / _totalsum * 100;
                            sum += y;
                            result.push({name:name, y:y, color:joolaio.colors[index]});
                        }
                    });

                    if (100 - Math.floor(sum) > 0) {
                        var name = 'Other';
                        var y = 100 - sum;
                        result.push({name:name, y:y, color:joolaio.colors[11]});
                    }
                    //console.log(result);
                    return result;
                }(),
                dataLabels:{
                    formatter:function () {
                        return this.y > 5 ? this.point.name : null;
                    },
                    color:'white',
                    distance:-30,
                    enabled:false
                }
            },
            {
                name:function () {
                    var name = 'inner';
                    name = columns[columns.length - 1].Name;
                    return name;
                }(),
                type:'pie',
                innerSize:'70%',
                data:function () {
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
                                                name += columns[ci].Name + ': ' + item.FormattedValues[ci];
                                        });
                                        var y = 0;
                                        y = item.Values[item.Values.length - 1] / _totalsum_compare * 100;
                                        sum += y;
                                        result.push({name:name, y:y});
                                    }
                                });
                            }
                        });

                        if (100 - Math.floor(sum) > 0) {
                            var name = 'Other';
                            var y = 100 - sum;
                            result.push({name:name, y:y, color:joolaio.colors[11]});
                        }
                    }
                    return result;
                }(),
                dataLabels:{
                    formatter:function () {
                        // display only if larger than 1
                        return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                    },
                    enabled:false
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

            result.push({seriesname:columns[columns.length - 1].Name, name:name, y:y, value:item.FormattedValues[item.Values.length - 1], color:joolaio.colors[index]});
        }
        totalsum += parseFloat(item.Values[item.Values.length - 1]);
    });

    //console.log(totalsum - shownsum)
    if (totalsum - shownsum > 0) {
        var name = 'Other';
        var y = 100 - sum;
        result.push({name:name, y:y, color:joolaio.colors[11], value:joolaio.string.formatNumber(totalsum - shownsum, 0, true), seriesname:columns[columns.length - 1].Name});
    }

    var compare_shownsum = 0;
    var compare_totalsum = 0;

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

                        //console.log(key, base_value, compare_value, diff);
                        result.push({name:key, base:item.FormattedValues[1], compare:citem.FormattedValues[1], diff:diff});
                    }
                });
            }
            compare_totalsum += parseFloat(item.Values[item.Values.length - 1]);
        });

        $(result).each(function (index, item) {
            //console.log(item);

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
            $div.append('<div class="caption"><div class="colorbox" style="background-color: ' + joolaio.colors[index] + '"></div>' +
                '<span class="' + _class + '">' + joolaio.string.formatNumber(item.diff, 2) + '%</span> ' + item.name + '</div>' +
                '<div class="summary">' + item.base + ' vs ' + item.compare + '</div>' +
                '');
            $legend.append($div);
        });
        /*
         if (compare_notshown - base_notshown > 0) {
         var name = 'Not shown';
         var y = 100 - sum;
         result.push({name:name, y:y, color:colors[11], value:joolaio.string.formatNumber(totalsum - shownsum, 0, true), seriesname:columns[columns.length - 1].Name});

         var compare_notshown = compare_totalsum - compare_shownsum;
         var base_notshown = totalsum - shownsum;
         var diff = percentageChange(compare_notshown, base_notshown);



         var $div = $('<div class="legenditem"></div>');
         $div.append('<div class="caption"><div class="colorbox" style="background-color: ' + colors[11] + '"></div>' +
         '<span class="' + 'neutral' + '">' + joolaio.string.formatNumber(diff, 2) + '%</span> ' + 'Not shown' + '</div>' +
         '<div class="summary">' + joolaio.string.formatNumber(base_notshown, 0, true) + ' vs ' + joolaio.string.formatNumber(compare_notshown, 0, true) + '</div>' +
         '');
         $legend.append($div);
         }*/
    }
    else {
        $(result).each(function (index, item) {
            var $div = $('<div class="legenditem"></div>');
            $div.append('<div class="caption"><div class="colorbox" style="background-color: ' + item.color + '"></div>' +
                joolaio.string.formatNumber(item.y, 2) + '% ' + item.name + '</div>' +
                '<div class="summary">' + item.value + ' ' + item.seriesname + '</div>' +
                '');
            $legend.append($div);
        });
    }
};

joolaio.visualisation.report.OverviewPie.prototype.draw = function (container) {
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
    else if ($($(container).parent()).attr('class').indexOf('span') == -1) {
        $html.append('<div class="">' +

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

joolaio.debug.log('INFO', 'joolaio.Dashboard.Visualisation.Pie', 6, 'JS source loaded');

/**
 * init the Timeline and look for containers
 */
//new joolaio.visualisation.report.OverviewPie().init();
