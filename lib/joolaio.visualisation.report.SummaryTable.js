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

joolaio.provide('joolaio.visualisation.report.SummaryTable');

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

joolaio.visualisation.report.SummaryTable = function (options) {
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

    joolaio.objects.Dimensions.List();
    joolaio.objects.Metrics.List();

    var executionTime = new Date().getMilliseconds() - start;
    //joolaio.debug.log('INFO', 'joolaio.visualisation.report.SummaryTable', 5, '...Constructor (' + executionTime + 'ms)');
};


/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
joolaio.visualisation.report.SummaryTable.prototype.init = function (options, container) {
    var _this = this;
    var start = new Date().getMilliseconds();

    this._this = this;
    this.options = options;

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
        matchedContainers = $('.joolaio.report.summarytable');
    if (matchedContainers.length == 0)
        return;

    //_this.Container = matchedContainers;

    $(matchedContainers).each(function (index, item) {
        if (!$(this).parent().hasClass('prettyprint')) {
            joolaio.debug.log('INFO', 'joolaio.visualisation.report.SummaryTable', 6, 'Applying to container (\'' + this.id + '\')');

            var _metrics = $(item).attr('data-metrics');
            if (!_metrics)
                return;

            _this.itemCount = $(item).attr('data-limit');
            if (!_this.itemCount)
                _this.itemCount = 10;

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


            //_this.fetch(_this, item);

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

    $('.reportlist li')[0].click();


    var executionTime = new Date().getMilliseconds() - start;
    joolaio.debug.log('INFO', 'joolaio.Visualisation.Realtime.MetricBox', 5, '...init (' + executionTime + 'ms)');
};

joolaio.visualisation.report.SummaryTable.prototype.buildReportList = function (sender, container) {
    var _this = sender;

    var report = joolaio.objects.Reports.Get(null, {id:joolaio.visualisation.reportWrapper.reportID});
    var catforlookup = report.Category.Name;

    var categories = _.groupBy(joolaio.objects.Reports, function (obj) {
        if (!obj.Category)
            return '(not set)';
        return obj.Category.Name;
    });
    // console.log(categories);

    categories = _.sortBy(categories, function (obj) {
        if (!obj[0].Category)
            return -1;
        return obj[0].Category.Ordinal;
    });

    var $html = $('<div><table class="thelist"></table></div>');
    var $table = $($html.find('.thelist'));
    var firstth = true;
    var firstreport = true;
    _.each(categories, function (category, i) {
        if ((category[0].Category.Name == catforlookup || catforlookup == '(not set)') && category[0].Category.Name != '(not set)') {
            $table.append('<tr><th ' + (firstth ? 'style="padding-top:0;"' : '') + '>' + category[0].Category.Name + '</th></tr>');

            var $tr = $('<tr><td></td></tr>');
            $tr.find('td').append('<ul></ul>');
            _.each(category, function (lreport, i2) {
                if (lreport.ID != report.ID) {
                    //console.log(lreport);
                    var $li = null;
                    if (firstth && firstreport)
                        $li = $('<li class="active"><div class="name">' + lreport.Name + '</div><div class="expand"></div>&nbsp;</li>');
                    else
                        $li = $('<li class=""><div class="name">' + lreport.Name + '</div><div class="expand"></div>&nbsp;</li>');

                    $li.off('click');
                    $li.on('click', function (e) {
                        //console.log('click');
                        $('.thelist li.active').removeClass('active');
                        $(this).addClass('active');

                        var container = _this.containers[0];

                        $(container).attr('data-dimensions', lreport.Tabs[0].Dimensions[0].Name);
                        $(container).attr('data-metrics', lreport.Tabs[0].MetricGroups[0].Metrics[0].Name);
                        _this.fetch(_this, container);

                        $('.seefullreport').off('click');
                        $('.seefullreport').on('click', function (e) {
                            $(joolaio).trigger('reportchange', lreport.ID);
                        });

                    });
                    $tr.find('ul').append($li);

                    if (firstreport)
                        firstreport = false;
                }
            });
            $table.append($tr);
            if (firstth)
                firstth = false;
        }

    });
    //console.log($html);
    $(container).find('.reportlist').append($html);
};

/**
 * Inits the class and builds the base html for it.
 * @return (string) returns the base html to be applied in the container
 */

joolaio.visualisation.report.SummaryTable.prototype.fetch = function (sender, container) {
    if (!sender)
        sender = joolaio.visualisation.report.SummaryTable;

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

    var _metrics = $(container).attr('data-metrics');
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


    if (!_metrics)
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
        sortDir:'DESC',
        Limit:_this.itemCount
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
            sortDir:'DESC',
            Limit:_this.itemCount
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

        if (_this.DateBox.comparePeriod == false) {
            _this.update(sender, _dimensions, _metrics, series, container);
        }
        else
            _this.updateCompare(sender, _dimensions, _metrics, series, container);
    });
    //});
};

joolaio.visualisation.report.SummaryTable.prototype.update = function (sender, dimensions, metrics, series, container) {
    var _this = sender;

    if (!series[0])
        return;

    var $table = $($(container).find('.table'));
    $table.empty();

    var $tr = $('<tr></tr>');
    $(series[0].Columns).each(function (index, col) {
        var $th = $('<th class="nopaddingtop">' + col.Name + '</th>');
        if (col.aggregation)
            $th.addClass('metric');
        else
            $th.addClass('dimension');
        $tr.append($th);
    });

    var $th = $('<th class="nopaddingtop">% ' + series[0].Columns[1].Name + '</th>');

    $th.addClass('dimension');
    $tr.append($th);

    $table.append($tr);

    var totalsum = 0;
    $(series[0].Rows).each(function (index, row) {
        totalsum += parseFloat(row.Values[1]);
    });

    $(series[0].Rows).each(function (index, row) {

        var $tr = $('<tr></tr>');

        $(row.FormattedValues).each(function (i, v) {

            var $td = $('<td>' + v + '</td>');
            if (series[0].Columns[i].aggregation)
                $td.addClass('metric');
            else
                $td.addClass('dimension');

            $tr.append($td);
        });

        var $td = $('<td class="" style="min-width: 100px;"></td>');
        $td.addClass('dimension');

        //console.log(row.Values[1], totalsum);
        var v = row.Values[1] / totalsum * 100;
        var width = (Math.ceil(v)) + '%';
        var $_bar = $('<div class="barwrapper"><span class="barvalue">' + joolaio.string.formatNumber(v, 2) + '%</span><div class="percentagebar" style="width:' + width + '"></div>' +
            '<td class="percentagecaption"></div>');

        $td.html($_bar);
        $tr.append($td);

        $table.append($tr);
    });
};

joolaio.visualisation.report.SummaryTable.prototype.updateCompare = function (sender, dimensions, metrics, series, container) {
    var _this = sender;

    if (!series[0])
        return;

    var datebox = _this.DateBox;

    var $table = $($(container).find('.table'));
    $table.empty();

    var $tr = $('<tr></tr>');
    $(series[0].Columns).each(function (index, col) {
        var $th = $('<th class="nopaddingtop">' + col.Name + '</th>');
        if (col.aggregation)
            $th.addClass('metric');
        else
            $th.addClass('dimension');
        $tr.append($th);
    });
    $table.append($tr);

    $(series[0].Rows).each(function (index, row) {
        var $tr = $('<tr></tr>');
        var lookupdimension = '';

        var base_value = 0;
        var compare_value = 0;

        $(row.FormattedValues).each(function (i, v) {
            if (series[0].Columns[i].aggregation) {
                var $td = $('<td></td>');
                $td.addClass('metric empty');
            }
            else {
                var $td = $('<td>' + v + '</td>');
                $td.addClass('dimension strong');
                lookupdimension = v;
            }
            $tr.append($td);
        });
        $table.append($tr);

        var $tr = $('<tr></tr>');
        $(row.FormattedValues).each(function (i, v) {
            if (series[0].Columns[i].aggregation) {
                var $td = $('<td>' + v + '</td>');
                $td.addClass('metric empty');
            }
            else {
                var $td = $('<td class="daterange">' + datebox.formatDate(datebox.getDate().base_fromdate) + ' - ' + datebox.formatDate(datebox.getDate().base_todate) + '</td>');
                $td.addClass('dimension');
            }
            $tr.append($td);
        });
        $table.append($tr);

        var $tr = $('<tr></tr>');
        $(row.FormattedValues).each(function (i, v) {
            if (series[0].Columns[i].aggregation) {
                var $td;
                $(series[1].Rows).each(function (compareindex, comparerow) {
                    //console.log(comparerow);
                    if (comparerow.FormattedValues[0] == lookupdimension)
                        $td = $('<td>' + comparerow.FormattedValues[i] + '</td>');
                })
                if ($td)
                    $td.addClass('metric');
                else {
                    $td = $('<td>N/A</td>');
                    $td.addClass('metric');
                }
            }
            else {
                var $td = $('<td class="daterange">' + datebox.formatDate(datebox.compare_fromdate) + ' - ' + datebox.formatDate(datebox.compare_todate) + '</td>');
                $td.addClass('dimension');
            }
            $tr.append($td);
        });
        $table.append($tr);

        var $tr = $('<tr></tr>');
        base_value = 0;
        compare_value = 0;
        $(row.Values).each(function (i, v) {
            if (series[0].Columns[i].aggregation) {
                var $td;
                base_value = v;
                $(series[1].Rows).each(function (compareindex, comparerow) {
                    if (comparerow.FormattedValues[0] == lookupdimension)
                        compare_value = comparerow.Values[i];
                });
                if (compare_value > 0) {
                    var ratio = percentageChange(compare_value, base_value);
                    ratio = joolaio.string.formatNumber(ratio, 2);
                    $td = $('<td>' + ratio + '%</td>');
                    $td.addClass('metric strong');

                    var _class = '';
                    var metric = series[0].Columns[i];
                    if (metric.RatioDirection == -1 && ratio < 0)
                        _class = 'positive';
                    if (metric.RatioDirection == -1 && ratio > 0)
                        _class = 'negative';
                    if (metric.RatioDirection == 1 && ratio > 0)
                        _class = 'positive';
                    if (metric.RatioDirection == 1 && ratio < 0)
                        _class = 'negative';
                    if (_class == '')
                        _class = 'neutral';
                    $td.addClass(_class);
                }
                else {
                    $td = $('<td>N/A</td>');
                    $td.addClass('metric strong');
                    var _class = 'neutral';
                    $td.addClass(_class);
                }
            }
            else {
                var $td = $('<td>% Change</td>');
                $td.addClass('dimension strong');
            }
            $tr.append($td);
        });
        $table.append($tr);
    });
};

joolaio.visualisation.report.SummaryTable.prototype.draw = function (container) {
    var _this = this;

    //var metrics = _this.metrics;//$(Container).attr('data-metrics');
    //metrics = metrics.split(',');
    //$(metrics).each(function (index, item) {
    //item = $.trim(item);
    //console.log(item);

    var title = 'Widget Title';
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

    var $html = $('<div class="wrapper"><div class="reportlist"></div><div class="reporttable"></div></div>');
    $html.find('.reporttable').append('<div class="">' +
        '</div>' +
        '<div class="content">' +
        '<table class="table table-striped"></table>' +
        '<div class="seefullreport">view full report</div>' +
        '</div>' +
        '</div>');
    $();

    _this.buildReportList(_this, $html);

    $(container).append($html);
};

joolaio.debug.log('INFO', 'joolaio.Visualisation.Realtime.MetricBox', 6, 'JS source loaded');

/**
 * init the Timeline and look for containers
 */
//new joolaio.visualisation.report.SummaryTable().init();
