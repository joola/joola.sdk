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



joolaio.provide('joolaio.visualisation.dashboard.BarTable');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

//joolaio.require('joolaio.dashboard');
joolaio.require('joolaio.visualisation.dashboard');

/**
 * Create and install a realtime timeline handler.
 * @constructor
 * @param {string=} options optional options to be passed to class
 */

joolaio.visualisation.dashboard.BarTable = function (options) {
    var start = new Date().getMilliseconds();

    this._this = this;
    this.options = options;

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
    //joolaio.debug.log('INFO', 'joolaio.visualisation.dashboard.BarTable', 5, '...Constructor (' + executionTime + 'ms)');
};


/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
joolaio.visualisation.dashboard.BarTable.prototype.init = function (options, container) {
    var _this = this;
    var start = new Date().getMilliseconds();

    //this._this = this;
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
        matchedContainers = $('.joolaio.dashboard.bartable');
    if (matchedContainers.length == 0)
        return;

    //_this.Container = matchedContainers;

    $(matchedContainers).each(function (index, item) {
        if (!$(this).parent().hasClass('prettyprint')) {
            joolaio.debug.log('INFO', 'joolaio.visualisation.dashboard.BarTable', 6, 'Applying to container (\'' + this.id + '\')');

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
        $(_this.containers).each(function (i, container) {
            _this.fetch(_this, container);
        })
    });

    var executionTime = new Date().getMilliseconds() - start;
    joolaio.debug.log('INFO', 'joolaio.Visualisation.Dashboard.BarTable', 5, '...init (' + executionTime + 'ms)');
};

/**
 * Inits the class and builds the base html for it.
 * @return (string) returns the base html to be applied in the container
 */

joolaio.visualisation.dashboard.BarTable.prototype.fetch = function (sender, container) {
    //if (!sender)
    //    sender = joolaio.visualisation.dashboard.BarTable;

    var _this = sender;

    var startdate = joolaio.visualisation.picker.DateBox.getDate().base_fromdate;
    var enddate = joolaio.visualisation.picker.DateBox.getDate().base_todate;
    if (_this.DateBox.comparePeriod) {
        var compare_startdate = joolaio.visualisation.picker.DateBox.getDate().compare_fromdate;
        var compare_enddate = joolaio.visualisation.picker.DateBox.getDate().compare_todate;
    }

    var _dimensions = $(container).attr('data-dimensions');
    var _dimensionslist = _dimensions;
    if (!_dimensions)
        return '';

    var _itemCount = $(container).attr('data-limit');
    if (!_itemCount)
        _itemCount = 10;

    _dimensions = _dimensions.split(',');
    $(_dimensions).each(function (index, item) {
        var dindex = -1;
        $(joolaio.objects.Dimensions).each(function (mi, mo) {
            if (mo.id == $.trim(item))
                dindex = mi;
        });
        _dimensions[index] = joolaio.objects.Dimensions[dindex];
        //_dimensions[index] = $.trim(_dimensions[index]);
        _this.dimensions.push(_dimensions[index]);
    });
    $(joolaio.objects.Dimensions).each(function (index, item) {
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
    /*
     _metrics = _metrics.split(',');
     $(_metrics).each(function (index, item) {
     var imetric = -1;
     $(joolaio.dataaccess.metrics).each(function (i, o) {

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
        sortDir: 'DESC'//,
        //Limit: _this.itemCount
    };
    queryOptions.push(_queryOptions);


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
            sortDir: 'DESC'//,
            //Limit: _this.itemCount
        };
        queryOptions.push(_queryOptions);
    }

    joolaio.dataaccess.multifetch(_this, '/query/fetch', queryOptions, function (sender, data, error) {
        var series = [];
        $(data).each(function (index, item) {
            try {
                if (item.data.Result.Rows.length > _itemCount - 1) {
                    //console.log('need to refit');

                    var sum1 = 0;
                    var sum2 = 0;

                    var lastRow = clone(item.data.Result.Rows[item.data.Result.Rows.length - 1]);

                    for (var i = _itemCount; i < item.data.Result.Rows.length; i++) {
                        sum1 += parseFloat(item.data.Result.Rows[i].Values[1]);
                        if (lastRow.Values.length > 2)
                            sum2 += parseFloat(item.data.Result.Rows[i].Values[2]);
                    }

                    lastRow.Values[0] = 'Not shown';
                    lastRow.FormattedValues[0] = 'Not shown';

                    lastRow.Values[1] = sum1;
                    lastRow.FormattedValues[1] = joolaio.string.formatNumber(sum1, 0, true);

                    if (lastRow.Values.length > 2) {
                        lastRow.Values[2] = sum2;
                        lastRow.FormattedValues[2] = joolaio.string.formatNumber(sum2, 0, true);
                    }

                    item.data.Result.Rows.splice(_itemCount - 1, item.data.Result.Rows.length);
                    item.data.Result.Rows.push(lastRow);
                }

                //if (index < _itemCount-1) {
                series.push(item.data.Result);
                //}
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
};

joolaio.visualisation.dashboard.BarTable.prototype.update = function (sender, dimensions, metrics, series, container) {
    var _this = sender;

    if (!series[0])
        return;

    var $table = $($(container).find('.table'));
    $table.removeClass('compareperiod');
    $table.empty();
    /*
     var $tr = $('<tr></tr>');
     $(series[0].Columns).each(function (index, col) {
     var $th = $('<th>' + col.Name + '</th>');
     if (col.AggregationType)
     $th.addClass('metric');
     else
     $th.addClass('dimension');
     $tr.append($th);
     });
     $table.append($tr);
     */
    var totalSum = 0;

    $(series[0].Rows).each(function (index, row) {
        if (series[0].Columns[1].aggregation)
            totalSum += parseFloat(row.Values[1]);
    });
    $(series[0].Rows).each(function (index, row) {
        if (series[0].Columns[1].aggregation)
            row.percentage = parseFloat(row.Values[1]) / totalSum;
    });

    if (series[0].Rows.length == 0) {
        var $tr = $('<tr class="empty"><td style="text-align: center;" colspan="8">There is no data to display.</td></tr>');
        $table.append($tr);
        return;
    }

    $(series[0].Rows).each(function (index, row) {
        var $tr = $('<tr></tr>');

        var $td = $('<td></td>');

        var $barwrapper = $('<div class="barwrapper"><div class="tablebarwrapper"></div></div>');
        var $bar = $('<div class="tablebar" style="width:' + row.percentage * 100 + '%"></div>');
        $barwrapper.append($bar);

        if (row.FormattedValues[0] == 'Not shown' && index == series[0].Rows.length - 1)
            $bar.css({'background-color': joolaio.colors[11]});
        else
            $bar.css({'background-color': joolaio.colors[0]});
        var $caption = $('<div class="barcaption"><div class="caption"></div><div class="subcaption"></div></div>')
        $caption.find('.caption').text(joolaio.string.formatNumber(row.percentage * 100, 2) + '% ' + row.FormattedValues[0]);
        $caption.find('.caption').attr('title', row.FormattedValues[0]);
        $caption.find('.subcaption').text(row.FormattedValues[1] + ' ' + series[0].Columns[1].name);

        $td.append($barwrapper)
        $td.append($caption)

        $tr.append($td);
        $table.append($tr);

        var maxlength = row.FormattedValues[0].length;
        while ($tr.height() > 60 && maxlength > 5) {
            $caption.find('.caption').text(joolaio.string.formatNumber(row.percentage * 100, 2) + '% ' + row.FormattedValues[0].substring(0, maxlength) + '...');
            maxlength -= 1;
        }
    });
};

joolaio.visualisation.dashboard.BarTable.prototype.updateCompare = function (sender, dimensions, metrics, series, container) {
    var _this = sender;

    if (!series[0])
        return;

    var datebox = _this.DateBox;

    var $table = $($(container).find('.table'));
    $table.addClass('compareperiod');
    $table.empty();
    /*
     var $tr = $('<tr></tr>');
     $(series[0].Columns).each(function (index, col) {
     var $th = $('<th>' + col.Name + '</th>');
     if (col.AggregationType)
     $th.addClass('metric');
     else
     $th.addClass('dimension');
     $tr.append($th);
     });
     $table.append($tr);*/
    var _maxvalue_total = 0;


    $(series[0].Rows).each(function (index, row) {
        var lookupdimension = row.FormattedValues[0];
        var base_value = 0;
        var compare_value = 0;
        var compare_value_formatted = 0;

        base_value = row.Values[1];
        $(series[1].Rows).each(function (compareindex, comparerow) {

            if (comparerow.FormattedValues[0] == lookupdimension) {
                compare_value = comparerow.Values[1];
                compare_value_formatted = comparerow.FormattedValues[1];
            }
        });

        if (compare_value > base_value)
            var maxvalue = compare_value;
        else
            var maxvalue = base_value;

        if (maxvalue > _maxvalue_total)
            _maxvalue_total = maxvalue;
    });

    $(series[0].Rows).each(function (index, row) {


        var $tr = $('<tr></tr>');
        var lookupdimension = row.FormattedValues[0];

        var base_value = 0;
        var compare_value = 0;
        var compare_value_formatted = 0;
        var $td;
        base_value = row.Values[1];
        $(series[1].Rows).each(function (compareindex, comparerow) {

            if (comparerow.FormattedValues[0] == lookupdimension) {
                compare_value = comparerow.Values[1];
                compare_value_formatted = comparerow.FormattedValues[1];
            }
        });

        var ratio = percentageChange(compare_value, base_value);
        ratio = joolaio.string.formatNumber(ratio, 2);

        if (compare_value > base_value)
            var maxvalue = compare_value;
        else
            var maxvalue = base_value;

        var base_ratio = (base_value / _maxvalue_total * 100).toFixed(0);
        var compare_ratio = (compare_value / _maxvalue_total * 100).toFixed(0);

        var $td = $('<td></td>');


        var $comparebarwrapper = $('<div class="barwrapper"></div>');
        var $barwrapper = $('<div class="tablebarwrapper tablebarwrappercompare"></div>');
        $barwrapper.append($comparebarwrapper);

        var $bar = $('<div class="tablebar base_ratio" style="width:' + base_ratio + '%">&nbsp;</div><div style="clear:both"></div>');
        var $comparebar = $('<div class="tablebar compare_ratio" style="width:' + compare_ratio + '%">&nbsp;</div>');

        $comparebarwrapper.append($bar);
        $comparebarwrapper.append($comparebar);

        $bar.css({'background-color': joolaio.colors[0]});
        $comparebar.css({'background-color': joolaio.offcolors[0]});

        var $caption = $('<div class="barcaption"><div class="caption"><span class="thevalue"></span><span class="thetext"></span></div><div class="subcaption"></div></div>')

        $caption.find('.caption .thevalue').text(ratio + '% ');
        $caption.find('.caption .thetext').text(row.FormattedValues[0]);
        $caption.find('.caption .thetext').attr('title', row.FormattedValues[0]);
        $caption.find('.subcaption').text(compare_value_formatted + ' vs. ' + row.FormattedValues[1]);

        $td.append($barwrapper)
        $td.append($caption)

        $tr.append($td);
        $table.append($tr);

        var maxlength = row.FormattedValues[0].length;
        while ($tr.height() > 60 && maxlength > 5) {
            $caption.find('.caption .thetext').text(row.FormattedValues[0].substring(0, maxlength) + '...');
            maxlength -= 1;
        }

        var _class = '';
        var metric = series[0].Columns[1];
        if (metric.ratiodirection == -1 && ratio < 0)
            _class = 'positive';
        if (metric.ratiodirection == -1 && ratio > 0)
            _class = 'negative';
        if (metric.ratiodirection == 1 && ratio > 0)
            _class = 'positive';
        if (metric.ratiodirection == 1 && ratio < 0)
            _class = 'negative';
        if (_class == '')
            _class = 'neutral';

        $caption.find('.caption .thevalue').addClass(_class);

        /*}
         else {
         var $td = $('<td><div class="">' + v + '</div></td>');
         lookupdimension = v;
         //console.log(series);
         var base_value = row.FormattedValues[1];
         var compare_value = 0;
         $(series[1].Rows).each(function (compareindex, comparerow) {
         if (comparerow.FormattedValues[0] == lookupdimension)
         compare_value = comparerow.FormattedValues[1];
         })
         $td.append('<div class="values">' + compare_value + ' vs ' + base_value + '</div>');
         $td.addClass('dimension');
         }*/
        //$tr.append($td);
        //});
        $table.append($tr);
        /*
         var $tr = $('<tr></tr>');
         $(row.FormattedValues).each(function (i, v) {
         if (series[0].Columns[i].AggregationType) {
         var $td = $('<td>' + v + '</td>');
         $td.addClass('metric empty');
         }
         else {
         var $td = $('<td>' + datebox.formatDate(datebox.base_fromdate) + ' - ' + datebox.formatDate(datebox.base_todate) + '</td>');
         $td.addClass('dimension');
         }
         $tr.append($td);
         });
         $table.append($tr);

         var $tr = $('<tr></tr>');
         $(row.FormattedValues).each(function (i, v) {
         if (series[0].Columns[i].AggregationType) {
         var $td;
         $(series[1].Rows).each(function (compareindex, comparerow) {

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
         var $td = $('<td>' + datebox.formatDate(datebox.compare_fromdate) + ' - ' + datebox.formatDate(datebox.compare_todate) + '</td>');
         $td.addClass('dimension');
         }
         $tr.append($td);
         });
         $table.append($tr);*/
        /*
         var $tr = $('<tr></tr>');
         base_value = 0;
         compare_value = 0;
         $(row.Values).each(function (i, v) {
         if (series[0].Columns[i].AggregationType) {
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
         */
    });
};

joolaio.visualisation.dashboard.BarTable.prototype.draw = function (container) {
    var _this = this;

    //var metrics = _this.metrics;//$(Container).attr('data-metrics');
    //metrics = metrics.split(',');
    //$(metrics).each(function (index, item) {
    //item = $.trim(item);


    var title = 'Widget Title';
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
    $html.append('<div class="row-fluid">' +
        '<div class="header">' +
        '<div class="settings"></div>' +
        '<div class="move"></div>' +
        '<h3>' + title + '</h3>' +
        '</div>' +
        '<div class="content">' +
        '<table class="table table-striped widgettable"></table>' +
        '</div>' +
        '</div>');
    $();

    $(container).append($html);
};

joolaio.debug.log('INFO', 'joolaio.Visualisation.Dashboard.BarTable', 6, 'JS source loaded');

/**
 * init the Timeline and look for containers
 */
//new joolaio.visualisation.dashboard.BarTable().init();
