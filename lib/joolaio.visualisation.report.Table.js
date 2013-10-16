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


joolaio.provide('joolaio.visualisation.report.Table');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

joolaio.require('joolaio.visualisation.report');

joolaio.visualisation.report.Table = function (options, container) {
  var _this = this;
  var start = new Date().getMilliseconds();

  this._this = this;
  this.ChartType = 'line';
  this.Resolution = 'Day';
  this.primaryMetric = null; //joolaio.dataaccess.metrics[0];
  this.secondaryMetric = null;
  this.Filters = [];

  this.drilldownlevel = 0;
  this.isother = false;
  this.levels = [];

  this.sortColumnIndex = -1;
  this.ColumnIndex = -1;
  this.compareColumnIndex = -1;
  this.sortDir = 'DESC';
  this.currentPage = 1;
  this.pageSize = 10;

  this.mode = 'table';

  this.dimensions = [];
  this.metrics = [];
  this.Container = null;

  this.Filters = [];

  this.colors = joolaio.colors; //['#058DC7', '#ED7E17', '#50B432', '#AF49C5', '#EDEF00', '#8080FF', '#A0A424', '#E3071C', '#6AF9C4', '#B2DEFF', '#64E572', '#CCCCCC' ];

  this.DateBox = joolaio.visualisation.picker.DateBox;
  this.initialLoad = 0;

  joolaio.objects.Dimensions.List();
  joolaio.objects.Metrics.List();

  _this.getState(_this);
  var executionTime = new Date().getMilliseconds() - start;
  joolaio.debug.log('INFO', 'joolaio.visualisation.report.Table', 5, '...init (' + executionTime + 'ms)');

  return this;

}

/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
joolaio.visualisation.report.Table.prototype.init = function (options, container) {
  var _this = this;
  var start = new Date().getMilliseconds();

  //this._this = this;

  //lookup any containers relevant for the timeline
  var matchedContainers = null;
  if (container)
    matchedContainers = $(container);
  else
    matchedContainers = $('.joolaio.report.jtable');
  if (matchedContainers.length == 0)
    return;

  this.options = $.extend({
    pageSize: 10,
    minSelected: 0,
    maxSelected: 3,
    defaultSelected: 0,
    excludeDimensions: []
  }, options);

  _this.pageSize = this.options.pageSize;
  _this.excludeDimensions = this.options.excludeDimensions;
  $('.joolaio.breadcrumbs').empty();
  $(matchedContainers).each(function (index, item) {
    if (!$(this).parent().hasClass('prettyprint')) {
      joolaio.debug.log('INFO', 'joolaio.visualisation.report.Table', 6, 'Applying to container (\'' + this.id + '\')');

      //apply html and bind methods/events
      _this.Container = item;

      if (_this.dimensions.length == 0) {

        var _dimensions = $(item).attr('data-dimensions');
        if (!_dimensions)
          return;

        try {

          _this.levels = eval(_dimensions);
          $(_this.levels).each(function (index, level) {
            $(level).each(function (index2, dimension) {
              $(joolaio.objects.Dimensions).each(function (index3, item) {
                if (dimension == item.id) {
                  if (index == _this.drilldownlevel) {
                    _this.dimensions.push(item);
                  }
                  _this.levels[index][index2] = item;
                }
              });
            });
          });


        }
        catch (e) {
          _this.levels = [];
          _this.levels.push([_dimensions]);

          _dimensions = _dimensions.split(',');
          $(_dimensions).each(function (index, item) {
            _dimensions[index] = $.trim(_dimensions[index]);
            _this.dimensions.push(_dimensions[index]);
          });
          $(joolaio.objects.Dimensions).each(function (index, item) {
            if (_dimensions.indexOf(item.id) > -1)
              _this.dimensions[_dimensions.indexOf(item.id)] = item;
          });
        }
      }
      else {

      }

      _.each(_this.levels, function (level, ilevel) {
        _.each(level, function (d, id) {

          if (typeof(d) != 'object') {
            d = _.find(joolaio.objects.Dimensions, function (_d) {
              return _d.id == d;
            });
            if (d) {
              _this.levels[ilevel][id] = d;
            }

          }
        })
      });

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

      var _pageSize = $(item).attr('data-pagesize');
      if (_pageSize)
        _this.pageSize = _pageSize;

      $(item).empty();
      _this.draw(item);
      _this.fetch(_this, item);

      $(_this).unbind('data');
      $(_this).bind('data', function (evt, ret) {
        ret.data = $(_this).data().data;
      });

      $(_this).unbind('click');
      $(_this).bind('click', function (evt) {
        $(_this).trigger('clicked', $(this).data().data);
      });

      //$(_this.DateBox).unbind('datechange');
      $(_this.DateBox).bind('datechange', function () {
        //joolaio.visualisation.report.clearFilter();
        _this.fetch(_this);

        if (_this.DateBox.comparePeriod) {
          $('button.btn_pie').attr('disabled', 'true');
          $('button.btn_pie').addClass('disabled');
          $('button.btn_perf').attr('disabled', 'true');
          $('button.btn_perf').addClass('disabled');

          _this.mode = 'table';
        }
        else {
          $('button.btn_pie').removeAttr('disabled');
          $('button.btn_pie').removeClass('disabled');
          $('button.btn_perf').removeAttr('disabled');
          $('button.btn_perf').removeClass('disabled');

        }
      });

      $(joolaio.visualisation.report).bind('filter', function (e, options) {

        if (!options || (options && !options.dontrunfetch))
          _this.fetch(_this);

      });

      _this.destroy = function () {
        $(_this.DateBox).unbind('datechange');
        $(_this).unbind('data');
        $(_this).unbind('click');
        $(joolaio.visualisation.report).unbind('filter');

        try {
          joolaio.state[_this.uid()].Filters = [];
        }
        catch (e) {
        }
      }
    }
  });

  $(joolaio.visualisation.report).bind('filter', function (e, options) {

    var parts = joolaio.visualisation.report.globalfilter.split('[AND]');
    var path = [];
    $(parts).each(function (index, part) {
      if (part != '') {

        if (part.indexOf('*=') > -1) {
          var dID = part.split('*=')[0];
          var value = part.split('*=')[1];
          var dim;

          var _d = _.filter(joolaio.objects.Dimensions, function (d) {
            return d.id == dID;
          });
          if (_d) {
            _d = _d[0];
            dim = _d.name;
          }
          else
            throw 'Dimension not found';

          path.push({name: dim, value: value, filter: part});
        } else {
          var dID = part.split('=')[0];
          var value = part.split('=')[1];
          var dim;

          var _d = _.filter(joolaio.objects.Dimensions, function (d) {
            return d.id == dID;
          });
          if (_d) {
            _d = _d[0];
            dim = _d.name;//$('.dimension[data-sortindex="0"]').text();
          }
          else
            throw 'Dimension not found';
          path.push({name: dim, value: value, filter: part});
        }
      }
    });

    if ($('.joolaio.breadcrumbs').length == 0) {
      var $breadcrumbsAppend = $('.secondary.btn-group').after('<div class="joolaio breadcrumbs offset3"></div>');
      //$('.tablecontrol').append('<div class="joolaio breadcrumbs offset3"></div>');
    }
    var $breadcrumbs = $('.joolaio.breadcrumbs');
    $breadcrumbs.empty();

    if (path.length > 0) {
      var $crumb = $('<div class="crumb"></div>');
      var $caption = $('<span class="caption"></span>');
      var $value = $('<span class="value"></span>');
      var $sep = $('<span class="sep">/</span>');
      var filter = '';

      $value.text('ALL');

      //$crumb.append($caption);
      $crumb.append($value);
      $crumb.append($sep);

      $breadcrumbs.append($crumb);
      $crumb.attr('data-filter', filter);
    }
    $(path).each(function (index, item) {
      var $crumb = $('<div class="crumb"></div>');
      var $caption = $('<span class="caption"></span>');
      var $value = $('<span class="value"></span>');

      var $sep = $('<span class="sep">/</span>');
      $caption.text(item.name + ': ');
      $value.text(item.value);

      filter += item.filter + '[AND]';

      $crumb.append($caption);
      $crumb.append($value);

      if (index < path.length - 1)
        $crumb.append($sep);

      $crumb.attr('data-filter', filter);

      $breadcrumbs.append($crumb);
    });


    $('.joolaio.breadcrumbs .crumb').each(function (index, item) {
      if (index < $('.joolaio.breadcrumbs .crumb').length - 1) {
        var $this = $(item);
        var $link = $($this.find('.value'));
        $link.off('click');
        $link.on('click', function (e) {
          if ($this.attr('data-filter') == '') {
            if (joolaio.visualisation.report.table)
              joolaio.visualisation.report.table.Filters = [];
            if (joolaio.visualisation.report.timeline)
              joolaio.visualisation.report.timeline.Filters = [];
          }
          joolaio.visualisation.report.setFilter($this.attr('data-filter'));
        });
      }
    });
  });
  var executionTime = new Date().getMilliseconds() - start;
  joolaio.debug.log('INFO', 'joolaio.visualisation.report.Table', 5, '...init (' + executionTime + 'ms)');

  return this;
};

joolaio.visualisation.report.Table.prototype.fetch = function (sender, container) {
  if (!sender) {
    sender = joolaio.visualisation.report.Table;
  }

  var _this = sender;
  _this.currentPage = 1;
  var startdate = joolaio.visualisation.picker.DateBox.getDate().base_fromdate;
  var enddate = joolaio.visualisation.picker.DateBox.getDate().base_todate;
  if (_this.DateBox.comparePeriod) {
    var compare_startdate = joolaio.visualisation.picker.DateBox.getDate().compare_fromdate;
    var compare_enddate = joolaio.visualisation.picker.DateBox.getDate().compare_todate;
  }

  var dimensionslist = '';
  $(_this.dimensions).each(function (index, item) {
    dimensionslist += item.id + ', ';
  });
  dimensionslist = dimensionslist.substring(0, dimensionslist.length - 2);

  var metricslist = '';
  $(_this.metrics).each(function (index, item) {
    metricslist += item.id + ', ';
  });
  metricslist = metricslist.substring(0, metricslist.length - 2);


  var queryOptions = [];
  var _queryOptions = {
    id: 'primary',
    startdate: joolaio.date.formatDate(startdate, 'yyyy-mm-dd hh:nn:ss.000'),
    enddate: joolaio.date.formatDate(enddate, 'yyyy-mm-dd hh:nn:ss.999'),
    dimensions: dimensionslist,
    metrics: metricslist,
    resolution: _this.Resolution,
    omitDate: true,
    filter: joolaio.visualisation.report.globalfilter,
    sortKey: _this.metrics[0].id,
    sortDir: 'DESC'
  };
  queryOptions.push(_queryOptions);

  if (_this.DateBox.comparePeriod) {
    _queryOptions = {
      id: 'compare_primary',
      startdate: joolaio.date.formatDate(compare_startdate, 'yyyy-mm-dd hh:nn:ss.000'),
      enddate: joolaio.date.formatDate(compare_enddate, 'yyyy-mm-dd hh:nn:ss.999'),
      dimensions: dimensionslist,
      metrics: metricslist,
      resolution: _this.Resolution,
      omitDate: true,
      filter: joolaio.visualisation.report.globalfilter,
      sortKey: _this.metrics[0].id,
      sortDir: 'DESC'
    };
    queryOptions.push(_queryOptions);
  }


  joolaio.dataaccess.multifetch(_this, '/query/fetch', queryOptions, function (sender, data, error) {

    var series = [];
    $(data).each(function (index, item) {
      var result = item.data.Result;
      var request = item.data.Request;
      var _data = item.data.Result.Rows;
      if (index == 0) {
        if (_this.initialLoad == 0)
          _this.initialLoad = 1;

        if (_this.options.defaultSelected && _this.initialLoad == 1) {
          var _limit = _this.options.defaultSelected;
          if (_limit > _data.length)
            _limit = _data.length;
          for (var i = 0; i < _limit; i++) {
            var filter = '';
            _.each(_this.dimensions, function (d, di) {
              filter += d.id + '=' + [_data[i].Values[di]] + '[AND]';
            });

            $(joolaio.visualisation.report).trigger('addpartialfilter-quick', filter);
            _this.Filters.push(filter);
          }

          $(joolaio.visualisation.report).trigger('filter', [
            {dontrunfetch: true}
          ]);
          _this.initialLoad = 2;
        }


      }
      //
      // }

      series.push({dimensions: _this.dimensions, metrics: _this.metrics, data: result});
    });

    sender.datatable = series;

    _this.update(sender, dimensionslist, metricslist, series);
  });
};

joolaio.visualisation.report.Table.prototype.update = function (sender) {

  var _this = sender;

  var series = _this.datatable[0];//series[0];
  var series_compare;
  var _data_compare;
  var _data_compare_toshow;
  if (_this.DateBox.comparePeriod) {
    series_compare = _this.datatable[1];
    _data_compare = series_compare.data.Rows;
  }

  var _columns = series.data.Columns;
  var _allcolumns = _columns;
  var _data = series.data.Rows;
  var _totalsum_base = 0;
  var _totalsumcompare_base = 0;
  var _totalsum = 0;
  var _totalsumcompare = 0;

  var $table = $($(_this.Container).find('.table'));
  $table.find('tr').remove();

  if (_this.sortColumnIndex == -1) {
    $(_columns).each(function (index, column) {
      if (column.aggregation) {
      } else
        _this.sortColumnIndex = index + 1;
    });

  }
  if (_this.ColumnIndex == -1) {
    $(_columns).each(function (index, column) {
      if (column.aggregation) {
      } else
        _this.ColumnIndex = index + 1;
    });
    _this.compareColumnIndex = _this.ColumnIndex;

  }
//    if (_this.mode == 'pie')
//        _this.sortColumnIndex = 1;


  _data = $(_data).sort(function (a, b) {
    var valuea = a.Values[_this.sortColumnIndex];
    var valueb = b.Values[_this.sortColumnIndex];
    if (_columns[_this.sortColumnIndex].aggregation) {
      valuea = parseFloat(valuea);
      valueb = parseFloat(valueb)
    }

    if (_this.sortDir == 'DESC')
      return valuea < valueb ? 1 : -1;
    else
      return valuea > valueb ? 1 : -1;
  });

  _data_compare = $(_data_compare).sort(function (a, b) {
    var valuea = a.Values[_this.sortColumnIndex];
    var valueb = b.Values[_this.sortColumnIndex];
    if (_columns[_this.sortColumnIndex].aggregation) {
      valuea = parseFloat(valuea);
      valueb = parseFloat(valueb)
    }

    if (_this.sortDir == 'DESC')
      return valuea < valueb ? 1 : -1;
    else
      return valuea > valueb ? 1 : -1;
  });

  var _datatoshow = _data;
  _datatoshow = _datatoshow.slice((_this.currentPage - 1) * (_this.pageSize), _this.currentPage * _this.pageSize);

  _data_compare_toshow = _data_compare;
  if (_this.mode == 'pie' || _this.mode == 'perf' || _this.mode == 'compare') {
    var _temp2 = [];
    var comparecolumnname = '';
    $(_datatoshow).each(function (pi, po) {
      var point = {
        FormattedValues: [],
        Values: []
      };

      $(_columns).each(function (ci, co) {
        if (!co.aggregation) {
          point.FormattedValues.push(po.FormattedValues[ci]);
          point.Values.push(po.Values[ci]);
        }
      });

      $(_columns).each(function (ci, co) {
        if (co.aggregation && ci == _this.ColumnIndex) {
          point.FormattedValues.push(po.FormattedValues[ci]);
          point.Values.push(po.Values[ci]);
          //_totalsum += parseFloat(po.Values[ci]);
        }
      });


      $(_columns).each(function (ci, co) {
        if (co.aggregation && ci == _this.compareColumnIndex) {
          comparecolumnname = co.name;

          point.FormattedValues.push(po.FormattedValues[ci]);
          point.Values.push(po.Values[ci]);

          //_totalsumcompare += parseFloat(po.Values[ci]);
          //point.FormattedValues.push(-1);
          //point.Values.push(-1);
          //_temp.push(point);

        }
      });

      _temp2.push(point);
    });
    _datatoshow = _temp2;
    $(_data).each(function (pi, po) {
      var point = {
        FormattedValues: [],
        Values: []
      };
      $(_columns).each(function (ci, co) {
        if (co.aggregation && ci == _this.ColumnIndex) {
          _totalsum += parseFloat(po.Values[ci]);
        }
        if (co.aggregation && ci == _this.compareColumnIndex) {
          comparecolumnname = co.name;
          _totalsumcompare += parseFloat(po.Values[ci]);
        }
      });
    });

    $(_datatoshow).each(function (pi, po) {
      _datatoshow[pi].FormattedValues[po.FormattedValues.length - 1] = po.Values[po.FormattedValues.length - 1] / _totalsumcompare * 100;
      _datatoshow[pi].Values[po.Values.length - 1] = po.Values[po.Values.length - 1] / _totalsumcompare * 100;
    });
    //_datatoshow = _temp;
  }

  _totalsum_base = _totalsum;
  _totalsumcompare_base = _totalsumcompare;

  if ((_this.mode == 'pie' || _this.mode == 'perf' || _this.mode == 'compare' ) && _this.DateBox.comparePeriod) {
    var _temp = [];
    var comparecolumnname = '';
    $(_data_compare_toshow).each(function (pi, po) {
      var point = {
        FormattedValues: [],
        Values: []
      };
      $(_columns).each(function (ci, co) {
        if (!co.aggregation) {
          point.FormattedValues.push(po.FormattedValues[ci]);
          point.Values.push(po.Values[ci]);
        }
      });

      $(_columns).each(function (ci, co) {
        if (co.aggregation && ci == _this.ColumnIndex) {
          point.FormattedValues.push(po.FormattedValues[ci]);
          point.Values.push(po.Values[ci]);
          //_totalsum += parseFloat(po.Values[ci]);
        }
      });


      $(_columns).each(function (ci, co) {
        if (co.aggregation && ci == _this.compareColumnIndex) {
          comparecolumnname = co.name;

          point.FormattedValues.push(po.FormattedValues[ci]);
          point.Values.push(po.Values[ci]);

          //_totalsumcompare += parseFloat(po.Values[ci]);
          //point.FormattedValues.push(-1);
          //point.Values.push(-1);
          //_temp.push(point);

        }
      });

      _temp.push(point);
    });
    _data_compare_toshow = _temp;


    _totalsum = 0;
    _totalsumcompare = 0;

    $(_data_compare).each(function (pi, po) {
      var point = {
        FormattedValues: [],
        Values: []
      };
      $(_columns).each(function (ci, co) {
        if (co.aggregation && ci == _this.ColumnIndex) {
          _totalsum += parseFloat(po.Values[ci]);
        }
        if (co.aggregation && ci == _this.compareColumnIndex) {
          comparecolumnname = co.name;
          _totalsumcompare += parseFloat(po.Values[ci]);
        }
      });
    });

    $(_data_compare_toshow).each(function (pi, po) {
      if (_totalsumcompare == 0) {
        _data_compare_toshow[pi].FormattedValues[po.FormattedValues.length - 1] = 0;
        _data_compare_toshow[pi].Values[po.Values.length - 1] = 0;
      }
      else {
        _data_compare_toshow[pi].FormattedValues[po.FormattedValues.length - 1] = po.Values[po.FormattedValues.length - 1] / _totalsumcompare * 100;
        _data_compare_toshow[pi].Values[po.Values.length - 1] = po.Values[po.Values.length - 1] / _totalsumcompare * 100;
      }


    });
  }
  if (_this.mode == 'pie' || _this.mode == 'perf' || _this.mode == 'compare') {
    _temp = [];
    $(_columns).each(function (ci, co) {
      if (co.aggregation && ci == _this.ColumnIndex) {
        _temp.push(co);
      }
      else if (!co.aggregation) {
        _temp.push(co);
      }
    });
    _columns = _temp;
    _columns.push({name: comparecolumnname, aggregation: 'Special'})
  }

  //build columns
  var $tr = $("<tr></tr>");
  var $th = $('<th class="check"></th>');
  $tr.append($th);

  $th = $('<th class="id"></th>');
  $tr.append($th);

  var sortIndex = 0;
  $(_columns).each(function (index, column) {
    if (column.aggregation) {
      var metric = column;
      if (_this.mode == 'pie' || _this.mode == 'perf' || _this.mode == 'compare') {
        if (index == _columns.length - 2) {
          $th = $('<th class="metric" data-sortindex="' + sortIndex + '">' +
            '<span class="selectWrapper"><select class="input-medium metricpicker">' +
            '</select></span></th>');

          $(_allcolumns).each(function (ai, ao) {
            if (ao.aggregation && (ao.aggregation == 'sum' || ao.aggregation == 'count')) {
              $th.find('.metricpicker').append('<option value="' + ao.name + '" ' + (ai == _this.ColumnIndex ? 'selected' : '') + '>' + ao.name + '</option>')

              $th.addClass('sortkey');
              $th.addClass(_this.sortDir);
            }
          });

          $th.find('.metricpicker').off('click');
          $th.find('.metricpicker').on('click', function (e) {


            e.stopPropagation();
          });
          $th.find('.metricpicker').on('change', function (e) {
            var selected = $(this).val();
            $(_allcolumns).each(function (ai, ao) {
              if (ao.name == selected) {
                _this.ColumnIndex = ai;
              }
            });
            _this.update(_this);
          });

        }
        else {
          $th = $('<th class="metric" data-sortindex="' + sortIndex + '">' + _columns[_columns.length - 1].name + '</th>');
        }
      }
      else if (_this.mode != 'pie') {
        $th = $('<th class="metric" data-sortindex="' + sortIndex + '">' + metric.name + '</th>');
        if (sortIndex == _this.sortColumnIndex) {
          $th.addClass('sortkey');
          $th.addClass(_this.sortDir);
        }
      }

      if ($th) {
        if ((_this.mode != 'pie' && _this.mode != 'perf' && _this.mode != 'compare') ||
          ((_this.mode == 'pie' && index < _columns.length - 1) ||
            ((_this.mode == 'perf' || _this.mode == 'compare') && index < _columns.length - 1))) {
          $th.off('click');
          $th.on('click', function (e) {
            e.stopPropagation();
            if (_this.sortColumnIndex == $(this).attr('data-sortindex'))
              _this.sortDir = (_this.sortDir == 'DESC' ? 'ASC' : 'DESC');
            else
              _this.sortDir = 'DESC';
            _this.sortColumnIndex = $(this).attr('data-sortindex');

            $tr.find('th').removeClass('sortkey');
            $tr.find('th').removeClass('ASC');
            $tr.find('th').removeClass('DESC');

            $(this).addClass('sortkey');
            $(this).addClass(_this.sortDir);


            _this.update(_this);
          });
        }
        else
          $th.addClass('special');
        $tr.append($th);

      }
      sortIndex++;
    }
    else {
      var dimension = column;

      if (index == 0)
        $th = $('<th class="dimension" data-sortindex="' + sortIndex + '">' + dimension.name + '</th>');
      else {
        $th = $('<th class="dimension" data-sortindex="' + sortIndex + '">' + dimension.name + '' +
          '<i class="joolaio removesecondarydimension icon-remove" style=" margin-top: 2px; margin-left: 5px; cursor: pointer; "></i>' +
          '' +
          '</th>');
        $($th.find('.removesecondarydimension')).off('click');
        $($th.find('.removesecondarydimension')).on('click', function (e) {

          _this.Filters = [];
          $(joolaio.visualisation.report).trigger('joolaio-clearfilter');

          var dindex = -1;
          $(_this.dimensions).each(function (i, d) {


            if (d.name == dimension.name) {
              dindex = i;
            }
          });
          if (dindex > -1) {

            _this.dimensions.splice(dindex, 1);

            _this.sortColumnIndex = parseInt(_this.sortColumnIndex) - 1;
            _this.ColumnIndex = parseInt(_this.ColumnIndex) - 1;
            _this.compareColumnIndex = parseInt(_this.compareColumnIndex) - 1;

            _this.currentPage = 1;

            _this.fetch(_this);

          }
          e.stopPropagation();
        });
      }

      if (sortIndex == _this.sortColumnIndex) {
        $th.addClass('sortkey');
        $th.addClass(_this.sortDir);
      }
      $th.off('click');
      $th.on('click', function (e) {
        e.stopPropagation();
        if (_this.sortColumnIndex == $(this).attr('data-sortindex'))
          _this.sortDir = (_this.sortDir == 'DESC' ? 'ASC' : 'DESC');
        else
          _this.sortDir = 'DESC';
        _this.sortColumnIndex = $(this).attr('data-sortindex');

        $tr.find('th').removeClass('sortkey');
        $tr.find('th').removeClass('ASC');
        $tr.find('th').removeClass('DESC');

        $(this).addClass('sortkey');
        $(this).addClass(_this.sortDir);


        _this.update(_this);
      });
      $tr.append($th);
      sortIndex++;
    }

  });
  $table.append($tr);

  if (_data.length == 0) {
    $table.append('<tr class="empty"><td style="text-align: center;" colspan="' + parseInt(_columns.length + 2) + '">There is no data to display.</td></tr>');
  }

  if (!_this.DateBox.comparePeriod) {
    $(_datatoshow).each(function (index, row) {

      var allowCheck = true;
      //if (_this.dimensions[1] && _this.dimensions[1].type == 'date')
      //allowCheck = false;
      $tr = $('<tr ></tr>');
      $td = $('<td class="check" style="vertical-align: middle;"></td>');
      if (_this.mode == 'pie')
        $td.append('<div style="height:11px;width:11px;background-color: ' + (index >= 10 ? joolaio.colors[11] : joolaio.colors[index]) + ';"></div>');
      else
        $td.append('<input class="checkfilter" type="checkbox" ' + (allowCheck ? '' : 'disabled="disabled"') + '>');

      $tr.append($td);
      $td = $('<td class="id">' + parseInt((_this.currentPage - 1) * (_this.pageSize) + index + 1) + '.</td>');
      $tr.append($td);

      var filter = '';
      var shortfilter = '';

      $(_columns).each(function (i, cell) {
        $td = $('<td></td>');
        if (_columns[i].aggregation)
          $td.addClass('metricvalue');
        else {
          if (i == 0) {
            $td.addClass('dimensionvalue');
            shortfilter = _columns[i].id + '=' + row.Values[i] + '[AND]';
          }
          filter += _columns[i].id + '=' + row.Values[i] + '[AND]'
        }
        if (i == _this.sortColumnIndex)
          $td.addClass('sortkey');

        if (_this.mode != 'pie')
          $td.html('<span class="drilldownlink a">' + row.FormattedValues[i] + '</span>');
        else if (_this.mode == 'pie' && i != _columns.length - 1)
          $td.html('<span class="drilldownlink b">' + row.FormattedValues[i] + '</span>');
        else if (_this.mode == 'pie' && i == _columns.length - 1) {
          $td.html('<span class="">' + joolaio.string.formatNumber(row.FormattedValues[i], 2) + '%</span>');
        }

        $tr.append($td);
      });

      var $checkbox = $tr.find('.checkfilter');

      $checkbox.attr('data-filter', filter);
      $checkbox.off('click');
      $checkbox.on('click', function (e) {
        
        if ($checkbox.is(':checked')) {
          $(joolaio).trigger('joolaio-report-filter-applied');
           
          joolaio.visualisation.report.addPartial(joolaio.visualisation.report.globalfilter + filter);
          _this.Filters.push(joolaio.visualisation.report.globalfilter + filter);
        }
        else {
          if ($('.checkfilter:checked').length == 0) {
            $(joolaio).trigger('joolaio-report-filter-removed');  
          }
          
          joolaio.visualisation.report.removePartial(joolaio.visualisation.report.globalfilter + filter);
          if (_this.Filters.indexOf(joolaio.visualisation.report.globalfilter + filter) > -1) {
            _this.Filters.splice(_this.Filters.indexOf(joolaio.visualisation.report.globalfilter + filter), 1);
            //_this.fetch(_this);
          }
        }

        if (_this.options.minSelected > 0) {
          var count = $('.checkfilter:checked').length;
          if (count <= _this.options.minSelected)
            $('.checkfilter:checked').attr('disabled', 'disabled');
          else
            $('.checkfilter:checked').removeAttr('disabled');
        }

      });
      if (_this.options.minSelected > 0) {
        var count = $('.checkfilter:checked').length;

        if (count <= _this.options.minSelected)
          $('.checkfilter:checked').attr('disabled', 'disabled');
        else
          $('.checkfilter:checked').removeAttr('disabled');
      }


      if (_this.Filters.indexOf(filter) > -1)
        $checkbox.attr('checked', true);
      else
        $checkbox.attr('checked', false);


      if (_this.drilldownlevel <= _this.levels.length - 1) {
        $tr.find('.drilldownlink').attr('data-filter', shortfilter);
        $tr.find('.dimensionvalue .drilldownlink').off('click');
        $tr.find('.dimensionvalue .drilldownlink').on('click', function (e) {
          $(this).off('click');

          if (_this.drilldownlevel < _this.levels.length - 1)
            _this.drilldownlevel++;

          _this.dimensions.splice(0, _this.dimensions.length);

          $(_this.levels[_this.drilldownlevel]).each(function (index, dimension) {
            _this.dimensions.push(dimension);
          });

          /*
           $(_this.Filters).each(function (fi, f) {
           joolaio.visualisation.report.removePartial(f);
           });
           */
          _this.Filters = [];

          joolaio.debug.log('INFO', 'joolaio.visualisation.report.Table', 6, 'Drilldown to level ' + _this.drilldownlevel + ': ' + shortfilter);
          joolaio.visualisation.report.setFilter(joolaio.visualisation.report.globalfilter + shortfilter);
        });
      }

      if (_this.drilldownlevel == _this.levels.length - 1 && joolaio.visualisation.report.globalfilter != '' && (_datatoshow.length == 1 || (_datatoshow.length > 1 && _datatoshow[0].FormattedValues[0] == _datatoshow[1].FormattedValues[0]))) {
        var $td = $tr.find('.dimensionvalue');
        var $link = $tr.find('.dimensionvalue .drilldownlink')
        $link.off('click');
        $link.removeClass('drilldownlink');
        $td.removeClass('dimensionvalue');
      }

      if (_this.mode == 'pie') {
        if (index == 0) {
          //add the
          var $th = $('<th class="special pie">Contribution to total: <span class="selectWrapper"><select class="input-medium comparemetricpicker"></select></span></th>');

          $(_allcolumns).each(function (ai, ao) {
            if (ao.aggregation && (ao.aggregation == 'sum' || ao.aggregation == 'count')) {
              $th.find('.comparemetricpicker').append('<option value="' + ao.name + '" ' + (ai == _this.compareColumnIndex ? 'selected' : '') + '>' + ao.name + '</option>')
            }
          });

          $th.find('.comparemetricpicker').off('click');
          $th.find('.comparemetricpicker').on('click', function (e) {
            e.stopPropagation();
          });
          $th.find('.comparemetricpicker').on('change', function (e) {
            var selected = $(this).val();
            $(_allcolumns).each(function (ai, ao) {
              if (ao.name == selected) {
                _this.compareColumnIndex = ai;
              }

            });
            _this.update(_this);
          });

          $($table.find('tr')[0]).append($th);


          //special cell
          $td = $('<td class="special"></td>');
          if (!_this.DateBox.comparePeriod)
            $td.attr('rowspan', _this.pageSize);
          else
            $td.attr('rowspan', _this.pageSize * 3);

          $tr.append($td);

          _this.drawPieChart(_this, $td, _columns, _datatoshow, _data, _totalsum_base, _totalsumcompare_base);
        }
      }
      else if (_this.mode == 'perf') {
        if (index == 0) {
          //add the
          var $th = $('<th class="special perf"><span class="selectWrapper"><select class="input-medium comparemetricpicker"></select></span></th>');

          $(_allcolumns).each(function (ai, ao) {
            if (ao.aggregation) {
              $th.find('.comparemetricpicker').append('<option value="' + ao.name + '" ' + (ai == _this.compareColumnIndex ? 'selected' : '') + '>' + ao.name + '</option>')
            }
          });

          $th.find('.comparemetricpicker').off('click');
          $th.find('.comparemetricpicker').on('click', function (e) {
            e.stopPropagation();
          });
          $th.find('.comparemetricpicker').on('change', function (e) {
            var selected = $(this).val();
            $(_allcolumns).each(function (ai, ao) {
              if (ao.name == selected) {
                _this.compareColumnIndex = ai;
              }

            });
            _this.update(_this);
          });
          $($table.find('tr')[0]).append($th);
          var $header = $($table.find('tr')[0]);
          $($header.find('th')[$header.find('th').length - 2]).remove();
        }
        //special cell

        $($tr.find('td')[$tr.find('td').length - 1]).remove();

        var valIndex = row.FormattedValues.length - 1;
        $td = $('<td class="special bar">' + row.FormattedValues[valIndex] + '</td>');

        var value = +row.Values[valIndex];

        var width = (Math.floor(row.Values[valIndex]) ) + '%';
        var $_bar = $('<div class="barwrapper"><div class="percentagebar" style="width:' + width + '"></div>' +
          '<td class="percentagecaption"><span >' + joolaio.string.formatNumber(row.Values[valIndex], 2) + '%</span></div>');

        $td.html($_bar);

        //_this.drawBar(_this, $td, value,  _data, _totalsum_base, _totalsumcompare_base);
        $tr.append($td);
      }
      else if (_this.mode == 'compare') {
        if (index == 0) {
          //add the
          var $th = $('<th class="special pie"><span class="selectWrapper"><select class="input-medium comparemetricpicker"></select></span></th>');

          $(_allcolumns).each(function (ai, ao) {
            if (ao.aggregation) {
              $th.find('.comparemetricpicker').append('<option value="' + ao.name + '" ' + (ai == _this.compareColumnIndex ? 'selected' : '') + '>' + ao.name + '</option>')
            }
          });

          $th.find('.comparemetricpicker').off('click');
          $th.find('.comparemetricpicker').on('click', function (e) {
            e.stopPropagation();
          });
          $th.find('.comparemetricpicker').on('change', function (e) {
            var selected = $(this).val();
            $(_allcolumns).each(function (ai, ao) {
              if (ao.name == selected) {
                _this.compareColumnIndex = ai;
              }

            });
            _this.update(_this);
          });
          $($table.find('tr')[0]).append($th);
          var $header = $($table.find('tr')[0]);
          $($header.find('th')[$header.find('th').length - 2]).remove();
        }
        //special cell

        $($tr.find('td')[$tr.find('td').length - 1]).remove();

        var valIndex = row.FormattedValues.length - 1;
        $td = $('<td class="special bar">' + row.FormattedValues[valIndex] + '</td>');

        var value = +row.Values[valIndex];


        var width = (Math.floor(row.Values[valIndex]) - 5) + 'px';
        var $_bar = $('<div class="barwrapper"><div class="percentagebar" style="width:' + width + '"></div>' +
          '<td class="percentagecaption"><span >' + joolaio.string.formatNumber(row.Values[valIndex], 2) + '%</span></div>');

        $td.html($_bar);

        //_this.drawBar(_this, $td, value,  _data, _totalsum_base, _totalsumcompare_base);
        $tr.append($td);
      }
      else {
        $($table.find('tr')[0]).find('.special').remove();
      }

      $table.append($tr);
    });
  }
  else {
    $(_datatoshow).each(function (index, row) {
        $tr = $('<tr ></tr>');
        $td = $('<td class="check" style="vertical-align: middle;"></td>');
        if (_this.mode == 'pie')
          $td.append('<div style="height:11px;width:11px;background-color: ' + (index >= 10 ? joolaio.colors[11] : joolaio.colors[index]) + ';"></div>');
        else
          $td.append('<input class="checkfilter" type=checkbox>');
        $tr.append($td);
        $td = $('<td class="id">' + parseInt((_this.currentPage - 1) * (_this.pageSize) + index + 1) + '.</td>');
        $tr.append($td);

        var filter = '';
        var shortfilter = '';

        $(_columns).each(function (i, cell) {
          $td = $('<td></td>');

          if (_columns[i].aggregation)
            $td.addClass('metricvalue');
          else {
            //$td.html(row.FormattedValues[i]);
            $td.html('<span class="drilldownlink c">' + row.FormattedValues[i] + '</span>');

            if (_this.mode != 'pie')
              $td.html('<span class="drilldownlink c">' + row.FormattedValues[i] + '</span>');
            else if (_this.mode == 'pie' && i != _columns.length - 1)
              $td.html('<span class="drilldownlink c">' + row.FormattedValues[i] + '</span>');
            else if (_this.mode == 'pie' && i == _columns.length - 1) {
              $td.html('<span class="">' + joolaio.string.formatNumber(row.FormattedValues[i], 2) + '%</span>');
            }
            if (i == 0) {
              $td.addClass('dimensionvalue');
              shortfilter = _columns[i].id + '=' + row.Values[i] + '[AND]';
            }

            filter += _columns[i].id + '=' + row.Values[i] + '[AND]'
          }

          if (i == _this.sortColumnIndex)
            $td.addClass('sortkey');

          $tr.append($td);
        });

        if (_this.mode == 'pie') {
          if (index == 0) {
            var $th = $('<th class="special pie">Contribution to total: <span class="selectWrapper"><select class="input-medium comparemetricpicker"></select></span></th>');

            $(_allcolumns).each(function (ai, ao) {
              if (ao.aggregation) {
                $th.find('.comparemetricpicker').append('<option value="' + ao.name + '" ' + (ai == _this.compareColumnIndex ? 'selected' : '') + '>' + ao.name + '</option>')
              }
            });

            $th.find('.comparemetricpicker').off('click');
            $th.find('.comparemetricpicker').on('click', function (e) {
              e.stopPropagation();
            });
            $th.find('.comparemetricpicker').on('change', function (e) {
              var selected = $(this).val();
              $(_allcolumns).each(function (ai, ao) {
                if (ao.name == selected) {
                  _this.compareColumnIndex = ai;
                }

              });
              _this.update(_this);
            });

            $($table.find('tr')[0]).append($th);

            //special cell
            $td = $('<td class="special"></td>');
            if (!_this.DateBox.comparePeriod)
              $td.attr('rowspan', _this.pageSize);
            else
              $td.attr('rowspan', _this.pageSize * 3);
            $tr.append($td);

            _this.drawPieChart(_this, $td, _columns, _datatoshow, _data, _totalsum_base, _totalsumcompare_base);
            //_this.drawPieChart($td);
          }
        }
        else if (_this.mode == 'perf') {
          if (index == 0) {
            //add the
            var $th = $('<th class="special pie"><span class="selectWrapper"><select class="input-medium comparemetricpicker"></select></span></th>');

            $(_allcolumns).each(function (ai, ao) {
              if (ao.aggregation) {
                $th.find('.comparemetricpicker').append('<option value="' + ao.name + '" ' + (ai == _this.compareColumnIndex ? 'selected' : '') + '>' + ao.name + '</option>')
              }
            });

            $th.find('.comparemetricpicker').off('click');
            $th.find('.comparemetricpicker').on('click', function (e) {
              e.stopPropagation();
            });
            $th.find('.comparemetricpicker').on('change', function (e) {
              var selected = $(this).val();
              $(_allcolumns).each(function (ai, ao) {
                if (ao.name == selected) {
                  _this.compareColumnIndex = ai;
                }

              });
              _this.update(_this);
            });
            $($table.find('tr')[0]).append($th);
            var $header = $($table.find('tr')[0]);
            $($header.find('th')[$header.find('th').length - 2]).remove();
          }
          //special cell

          $($tr.find('td')[$tr.find('td').length - 1]).remove();

        }
        else if (_this.mode == 'compare') {
          if (index == 0) {
            //add the
            var $th = $('<th class="special pie"><span class="selectWrapper"><select class="input-medium comparemetricpicker"></select></span></th>');

            $(_allcolumns).each(function (ai, ao) {
              if (ao.aggregation) {
                $th.find('.comparemetricpicker').append('<option value="' + ao.name + '" ' + (ai == _this.compareColumnIndex ? 'selected' : '') + '>' + ao.name + '</option>')
              }
            });

            $th.find('.comparemetricpicker').off('click');
            $th.find('.comparemetricpicker').on('click', function (e) {
              e.stopPropagation();
            });
            $th.find('.comparemetricpicker').on('change', function (e) {
              var selected = $(this).val();
              $(_allcolumns).each(function (ai, ao) {
                if (ao.name == selected) {
                  _this.compareColumnIndex = ai;
                }

              });
              _this.update(_this);
            });
            $($table.find('tr')[0]).append($th);
            var $header = $($table.find('tr')[0]);
            $($header.find('th')[$header.find('th').length - 2]).remove();
          }
          //special cell

          $($tr.find('td')[$tr.find('td').length - 1]).remove();

        }

        var $checkbox = $tr.find('.checkfilter');

        $checkbox.attr('data-filter', filter);
        $checkbox.off('click');
        $checkbox.on('click', function (e) {

          if ($checkbox.is(':checked')) {
            $(joolaio).trigger('joolaio-report-filter-applied');
            joolaio.visualisation.report.addPartial(joolaio.visualisation.report.globalfilter + filter);
            _this.Filters.push(joolaio.visualisation.report.globalfilter + filter);
          }
          else {
            if ($('.checkfilter:checked').length == 0) {
              $(joolaio).trigger('joolaio-report-filter-removed');
            }
            joolaio.visualisation.report.removePartial(joolaio.visualisation.report.globalfilter + filter);
            if (_this.Filters.indexOf(joolaio.visualisation.report.globalfilter + filter) > -1) {
              _this.Filters.splice(_this.Filters.indexOf(joolaio.visualisation.report.globalfilter + filter), 1);
              //_this.fetch(_this);
            }
          }

          /*

           if ($checkbox.is(':checked')) {
           joolaio.visualisation.report.addPartial(filter);
           _this.Filters.push(filter);
           }
           else {
           joolaio.visualisation.report.removePartial(filter);
           if (_this.Filters.indexOf(filter) > -1) {
           _this.Filters.splice(_this.Filters.indexOf(filter), 1);
           //_this.fetch(_this);
           }
           }
           */
        });
        if (_this.Filters.indexOf(filter) > -1)
          $checkbox.attr('checked', true);
        else
          $checkbox.attr('checked', false);

        $tr.find('.drilldownlink').attr('data-filter', shortfilter);
        $tr.find('.dimensionvalue .drilldownlink').off('click');
        $tr.find('.dimensionvalue .drilldownlink').on('click', function (e) {
          $(this).off('click');
          if (_this.drilldownlevel < _this.levels.length - 1)
            _this.drilldownlevel++;

          _this.dimensions.splice(0, _this.dimensions.length);
          $(_this.levels[_this.drilldownlevel]).each(function (index, dimension) {
            _this.dimensions.push(dimension);
          });

          $(_this.Filters).each(function (fi, f) {
            joolaio.visualisation.report.removePartial(f);
          });
          _this.Filters = [];
          joolaio.debug.log('INFO', 'joolaio.visualisation.report.Table', 6, 'Drilldown to level ' + _this.drilldownlevel + ': ' + shortfilter);
          joolaio.visualisation.report.setFilter(joolaio.visualisation.report.globalfilter + shortfilter);
        });

        if (_this.drilldownlevel == _this.levels.length - 1 && joolaio.visualisation.report.globalfilter != '' && (_datatoshow.length == 1 || (_datatoshow.length > 1 && _datatoshow[0].FormattedValues[0] == _datatoshow[1].FormattedValues[0]))) {
          var $td = $tr.find('.dimensionvalue');
          var $link = $tr.find('.dimensionvalue .drilldownlink')
          $link.off('click');
          $link.removeClass('drilldownlink');
          $td.removeClass('dimensionvalue');
        }

        $table.append($tr);

        $tr = $('<tr></tr>');
        $td = $('<td class="check"></td>');
        $tr.append($td);
        $td = $('<td class="id"></td>');
        $tr.append($td);

        $(_columns).each(function (i, cell) {
          $td = $('<td></td>');

          if (_columns[i].aggregation) {
            $td.addClass('metricvalue');
            //$td.html(row.FormattedValues[i]);

            if (_this.mode != 'pie')
              $td.html('<span class="drilldownlink d">' + row.FormattedValues[i] + '</span>');
            else if (_this.mode == 'pie' && i != _columns.length - 1)
              $td.html('<span class="drilldownlink d">' + row.FormattedValues[i] + '</span>');
            else if (_this.mode == 'pie' && i == _columns.length - 1) {
              $td.html('<span class="">' + joolaio.string.formatNumber(row.FormattedValues[i], 2) + '%</span>');
            }

          }
          else {
            $td.addClass('compare-daterange');
            $td.attr('colspan', _this.dimensions.length);
            if (i == 0)
              $td.html(joolaio.date.formatDate(_this.DateBox.getDate().base_fromdate) + ' - ' + joolaio.date.formatDate(_this.DateBox.getDate().base_todate));
            else
              $td = null;
          }

          if (i == _this.sortColumnIndex && _columns[i].aggregation)
            $td.addClass('sortkey');

          $tr.append($td);
        });

        if (_this.mode == 'perf') {
          $($tr.find('td')[$tr.find('td').length - 1]).remove();
          var valIndex = row.FormattedValues.length - 1;
          $td = $('<td class="special bar">' + row.FormattedValues[valIndex] + '</td>');

          var value = +row.Values[valIndex];

          var width = (Math.floor(row.Values[valIndex]) - 5) + 'px';
          var $_bar = $('<div class="barwrapper"><div class="percentagebar" style="width:' + width + '"></div>' +
            '<td class="percentagecaption"><span >' + joolaio.string.formatNumber(row.Values[valIndex], 2) + '%</span></div>');

          $td.html($_bar);

          //_this.drawBar(_this, $td, value,  _data, _totalsum_base, _totalsumcompare_base);
          $tr.append($td);

        }
        else if (_this.mode == 'compare') {
          $($tr.find('td')[$tr.find('td').length - 1]).remove();
          var valIndex = row.FormattedValues.length - 1;
          $td = $('<td class="special bar">' + row.FormattedValues[valIndex] + '</td>');

          var value = +row.Values[valIndex];

          var width = (Math.floor(row.Values[valIndex]) - 5) + 'px';
          var $_bar = $('<div class="barwrapper"><div class="percentagebar" style="width:' + width + '"></div>' +
            '<td class="percentagecaption"><span >' + joolaio.string.formatNumber(row.Values[valIndex], 2) + '%</span></div>');

          $td.html($_bar);

          //_this.drawBar(_this, $td, value,  _data, _totalsum_base, _totalsumcompare_base);
          $tr.append($td);

        }

        $table.append($tr);

        //Compared row
        $tr = $('<tr></tr>');
        $td = $('<td class="check"></td>');
        $tr.append($td);
        $td = $('<td class="id"></td>');
        $tr.append($td);

        var key = '';
        $(_columns).each(function (i, cell) {
          if (_columns[i].aggregation == null) {
            key += row.Values[i];
          }
        });

        var row_compare;
        $(_data_compare_toshow).each(function (icompare, checkrow) {
          var key_compare = '';

          $(_columns).each(function (i, cell) {
            if (_columns[i].aggregation == null) {
              key_compare += checkrow.Values[i];
            }
          });


          if (key == key_compare)
            row_compare = checkrow;
        });
        $(_columns).each(function (i, cell) {
          $td = $('<td></td>');

          if (_columns[i].aggregation) {
            $td.addClass('metricvalue');
            try {
              //$td.html(row_compare.FormattedValues[i]);
              if (_this.mode != 'pie')
                $td.html('<span class="drilldownlink e">' + row_compare.FormattedValues[i] + '</span>');
              else if (_this.mode == 'pie' && i != _columns.length - 1)
                $td.html('<span class="drilldownlink e">' + row_compare.FormattedValues[i] + '</span>');
              else if (_this.mode == 'pie' && i == _columns.length - 1) {
                $td.html('<span class="">' + joolaio.string.formatNumber(row_compare.FormattedValues[i], 2) + '%</span>');
              }
            }
            catch (ex) {
              if (_this.mode != 'pie')
                $td.html('<span class="drilldownlink f">N/A</span>');
              else if (_this.mode == 'pie' && i != _columns.length - 1)
                $td.html('<span class="drilldownlink f">N/A</span>');
              else if (_this.mode == 'pie' && i == _columns.length - 1) {
                $td.html('<span class="">N/A</span>');
              }
            }
          }
          else {
            $td.addClass('compare-daterange');
            $td.attr('colspan', _this.dimensions.length);
            if (i == 0)
              $td.html(joolaio.date.formatDate(_this.DateBox.getDate().compare_fromdate) + ' - ' + joolaio.date.formatDate(_this.DateBox.getDate().compare_todate));
            else
              $td = null;
          }

          if (i == _this.sortColumnIndex && _columns[i].aggregation)
            $td.addClass('sortkey');

          $tr.append($td);
        });
        if (_this.mode == 'perf') {
          var $_bar;
          try {
            $($tr.find('td')[$tr.find('td').length - 1]).remove();
            var valIndex = row.FormattedValues.length - 1;
            $td = $('<td class="special bar">' + row_compare.FormattedValues[valIndex] + '</td>');

            var value = +row_compare.Values[valIndex];

            var width = (Math.floor(row_compare.Values[valIndex]) - 5) + 'px';
            $_bar = $('<div class="barwrapper"><div class="percentagebar" style="width:' + width + '"></div>' +
              '<td class="percentagecaption"><span >' + joolaio.string.formatNumber(row_compare.Values[valIndex], 2) + '%</span></div>');
          }
          catch (ex) {
            $td = $('<td class="special bar">0</td>');
            $_bar = $('<div class="barwrapper"><div class="percentagebar" style="width:' + 0 + 'px"></div>' +
              '<td class="percentagecaption"><span >' + joolaio.string.formatNumber(0, 2) + '%</span></div>');
          }
          $td.html($_bar);

          //_this.drawBar(_this, $td, value,  _data, _totalsum_base, _totalsumcompare_base);
          $tr.append($td);

        }
        else if (_this.mode == 'compare') {
          var $_bar;
          try {
            $($tr.find('td')[$tr.find('td').length - 1]).remove();
            var valIndex = row.FormattedValues.length - 1;
            $td = $('<td class="special bar">' + row_compare.FormattedValues[valIndex] + '</td>');

            var value = +row_compare.Values[valIndex];

            var width = (Math.floor(row_compare.Values[valIndex]) - 5) + 'px';
            $_bar = $('<div class="barwrapper"><div class="percentagebar" style="width:' + width + '"></div>' +
              '<td class="percentagecaption"><span >' + joolaio.string.formatNumber(row_compare.Values[valIndex], 2) + '%</span></div>');
          }
          catch (ex) {
            $td = $('<td class="special bar">0</td>');
            $_bar = $('<div class="barwrapper"><div class="percentagebar" style="width:' + 0 + 'px"></div>' +
              '<td class="percentagecaption"><span >' + joolaio.string.formatNumber(0, 2) + '%</span></div>');
          }
          $td.html($_bar);

          //_this.drawBar(_this, $td, value,  _data, _totalsum_base, _totalsumcompare_base);
          $tr.append($td);

        }
        $table.append($tr);

        if (_this.mode == 'table') {
          //Summary row
          $tr = $('<tr></tr>');
          $td = $('<td class="check"></td>');
          $tr.append($td);
          $td = $('<td class="id"></td>');
          $tr.append($td);

          $(_columns).each(function (i, cell) {
            $td = $('<td></td>');

            if (_columns[i].aggregation) {
              var useNA = false;
              $td.addClass('metricvalue comparison');

              try {
                var value = percentageChange(row_compare.Values[i], row.Values [i]);
              }
              catch (ex) {
                value = 0;
                useNA = true;
              }

              var _class = '';
              var metric = cell;
              if (metric.ratiodirection == -1 && value < 0)
                _class = 'positive';
              if (metric.ratiodirection == -1 && value > 0)
                _class = 'negative';
              if (metric.ratiodirection == 1 && value > 0)
                _class = 'positive';
              if (metric.ratiodirection == 1 && value < 0)
                _class = 'negative';
              if (_class == '')
                _class = 'neutral';

              if (_this.mode != 'pie')
              //$td.html(joolaio.string.formatNumber(value, 2) + '%');
                if (useNA)
                  $td.html('N/A');
                else
                  $td.html(joolaio.string.formatNumber(value, 2) + '%');
              else if (_this.mode == 'pie' && i != _columns.length - 1)
              //$td.html(joolaio.string.formatNumber(value, 2) + '%');
                if (useNA)
                  $td.html('N/A');
                else
                  $td.html(joolaio.string.formatNumber(value, 2) + '%');
              else if (_this.mode == 'pie' && i == _columns.length - 1) {
                //$td.html('N/A');

                if (useNA)
                  $td.html('N/A');
                else
                  $td.html(joolaio.string.formatNumber(value, 2) + '%');
              }

              $td.addClass(_class);
            }
            else {
              $td.addClass('comparison');
              $td.attr('colspan', _this.dimensions.length);
              if (i == 0)
                $td.html('% Change');
              else
                $td = null;
            }

            if (i == _this.sortColumnIndex && _columns[i].aggregation)
              $td.addClass('sortkey');

            $tr.append($td);
          });
          $table.append($tr);
        }
      }
    );
  }


  var first = (_this.currentPage - 1) * (_this.pageSize) + 1;
  var last = _this.currentPage * _this.pageSize;

  if (last > _data.length)
    last = _data.length;

  if (_this.mode == 'pie' && _datatoshow.length < _this.pageSize) {
    for (i = _datatoshow.length; i < _this.pageSize; i++) {
      var $tr = $('<tr class="emptyrowfiller ' + (i == _datatoshow.length ? 'first' : '') + '"></tr>');
      var $td = $('<td colspan="' + parseInt(_columns.length + 2) + '">&nbsp;</td>');
      $tr.append($td);
      $table.append($tr);

      if ($table.find('tr').length > 10)
        break;
    }
  }

  var $footer = $($(_this.Container).find('.bottomfooter'));
  var $pager = $footer.find('.pager .pageinfoselect');

  $pager.val(_this.pageSize);


  var $pageinfo = $footer.find('.pageinfo');
  $pageinfo.html(first + ' - ' + last + ' of ' + _data.length);

  var $pagecontrol = $footer.find('.pagecontrol');

  if (_this.currentPage > 1) {
    $($pagecontrol).find('.prev').removeClass('disabled');
  }
  else {
    $($pagecontrol).find('.prev').addClass('disabled');
  }

  if (last < _data.length) {
    $($pagecontrol).find('.next').removeClass('disabled');
  }
  else {
    $($pagecontrol).find('.next').addClass('disabled');
  }

  var $charttype = $(_this.Container).find('.tabletype');
  $charttype.find('button').each(function (i, o) {
    $(this).removeClass('active');
  });
  $charttype.find('.btn_' + this.mode).addClass('active');

  var $tablecontrol = $(_this.Container).find('.tablecontrol');
  if (_this.dimensions.length > 1) {
    var _html = 'Secondary dimension' + (_this.dimensions.length > 2 ? 's' : '') + ': ';
    $(_this.dimensions).each(function (i, d) {
      if (i > 0)
        _html += d.name + ', ';
    });
    _html = _html.substring(0, _html.length - 2);
    $($tablecontrol).find('.secondarybutton').html(_html);

    var o = new joolaio.visualisation.picker.Dimensions({
      container: $item,
      prefix: 'Secondary dimension: ',
      placeholdertext: 'Add secondary dimension...',
      exclude: _this.options.excludeDimensions,
      selected: (_this.dimensions.length == 1 ? '' : _this.dimensions[1].name)
    });

  }
  else {
    //$($tablecontrol).find('.secondarybutton').html('Secondary dimension...');
    var $item = $('<div class="joolaio picker dimensions" data-type="button"></div>');
    $($tablecontrol).find('.secondary').empty();
    $($tablecontrol).find('.secondary').append($item);
    var o = new joolaio.visualisation.picker.Dimensions({
      container: $item,
      prefix: 'Secondary dimension: ',
      placeholdertext: 'Add secondary dimension...',
      exclude: _this.options.excludeDimensions,
      selected: (_this.dimensions.length == 1 ? '' : _this.dimensions[1].name)
    });

    _this.dimensionPicker.disableDimension(o, _this.dimensions[0]);
    $(o).bind('select', function (data, dimension) {
      if (joolaio.visualisation.report.table)
        joolaio.visualisation.report.table.Filters = [];
      dimension = _.find(joolaio.objects.Dimensions, function (item) {
        return item.name == dimension
      });
      if (_this.dimensions.indexOf(dimension) == -1) {
        /*$dimlist.find('li').each(function (i, o) {
         $(this).removeClass('active');
         });*/
        //$(this).addClass('active');
        if (_this.dimensions.length == 1) {
          _this.sortColumnIndex = parseInt(_this.sortColumnIndex) + 1;
          _this.ColumnIndex = parseInt(_this.ColumnIndex) + 1;
          _this.compareColumnIndex = parseInt(_this.compareColumnIndex) + 1;
        }
        else {
          _this.dimensions.splice(1, 1);
        }
        _this.dimensions.push(dimension);
        _this.fetch(_this);

      }
    })
  }

  if (!_this.isother) {
    $('.japi.primarydimension').html(_this.levels[_this.drilldownlevel][0].name);
    $('.japi.primarydimension').addClass('on');
    $('.japi.other.picker').removeClass('on');
    $('.japi.other.picker .jbtn').html('Other <span class="caret"></span>');
  }

  else {
    $('.japi.primarydimension').removeClass('on');
    $('.drilldownlink').off('click');
    $('.drilldownlink').addClass('disabled');
    $('.drilldownlink').parent().addClass('disabled');

  }

  if (_this.drilldownlevel > 0 || (_this.drilldownlevel == 0 && _this.levels.length == 1))
    $('.japi.other.picker').css('visibility', 'visible');
  else
    $('.japi.other.picker').css('visibility', 'hidden');
  _this.setState(_this);

  //$(joolaio).unbind('joolaio-reportTable-update');
  //$(joolaio).bind('joolaio-reportTable-update', function () {

  if (_this.options.defaultSelected > 0 && _this.Filters == '') {
    for (var i = 0; i < _this.options.defaultSelected; i++) {
      $($('.checkfilter')[i]).attr('checked', 'true');
      var _filter = $($('.checkfilter')[i]).attr('data-filter');
      if (typeof _filter != 'undefined') {
        $(joolaio.visualisation.report).trigger('addpartialfilter', _filter);
        _this.Filters.push(_filter);
      }
    }

    //console.log('filters',_this.Filters);
  }

  //});
  //$(joolaio).trigger('joolaio-reportTable-update');
  $(joolaio).trigger('tableresize');
};

joolaio.visualisation.report.Table.prototype.updateCompare = function (sender, metric, series) {
  var _this = sender;
};

joolaio.visualisation.report.Table.prototype.drawPieChart = function (sender, Container, columns, data, alldata, _totalsum, _totalsumcompare) {
  var _this = sender;
  var chart = new Highcharts.Chart({
    chart: {
      renderTo: $(Container).get(0),
      backgroundColor: null,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      width: 300,
      height: 300,
      type: 'pie',
      marginTop: 0,
      marginLeft: 0,
      marginRight: 0,
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
        return '<b>' + this.point.name + '</b><br/>' + this.series.name + ': ' + joolaio.string.formatNumber(this.percentage, 2) + ' %';
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
        size: '90%'
      }
    },
    series: [
      {
        name: function () {
          //var name = 'test';
          //$(columns).each(function (ci, co) {
          //   if (co.aggregation) {
          var name = columns[columns.length - 2].name;
          //   }
          //});
          return name;
        }(),
        type: 'pie',
        data: function () {
          var result = [];
          var sum = 0;

          $(data).each(function (index, item) {
            if (index < 10) {
              var name = '';
              $(columns).each(function (ci, co) {
                if (co.aggregation) {

                }
                else
                  name += columns[ci].name + ': ' + item.FormattedValues[ci] + '<br/>';
              });
              name = name.substring(0, name.length - 5);
              var y = item.Values[item.Values.length - 2] / _totalsum * 100;
              sum += y;
              result.push({name: name, y: y, color: joolaio.colors[index]});
            }
          });

          if (100 - Math.floor(sum) > 0) {
            var name = 'Other';
            var y = 100 - sum;
            result.push({name: name, y: y, color: joolaio.colors[11]});
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
          //var name = 'test';
          //$(columns).each(function (ci, co) {
          //   if (co.aggregation) {
          var name = columns[columns.length - 1].name;
          //   }
          //});
          return name;
        }(),
        type: 'pie',
        innerSize: '70%',
        data: function () {
          var result = [];
          if (_this.ColumnIndex != _this.compareColumnIndex) {
            var sum = 0;

            $(data).each(function (index, item) {

              if (index < 10) {
                var name = '';
                $(columns).each(function (ci, co) {
                  if (co.aggregation) {

                  }
                  else
                    name += columns[ci].name + ': ' + item.FormattedValues[ci] + '<br/>';
                });
                name = name.substring(0, name.length - 5);
                y = item.Values[item.Values.length - 1];
                sum += y;
                result.push({name: name, y: y, color: joolaio.colors[index]});
              }
            });

            if (100 - Math.floor(sum) > 0) {
              var name = 'Other';
              var y = 100 - sum;
              result.push({name: name, y: y, color: joolaio.colors[11]});
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
};

joolaio.visualisation.report.Table.prototype.draw = function (Container) {
  var _this = this;

  var _html = '<table class="table table-striped"></table>';
  var $table = $(_html);
  $(Container).append($table);

  //paging
  //_html = '<tr'


  var $header = $('<div class="topheader"></div>');
  var $headercontent = $('<div class="headercontent"></div>');
  $header.append($headercontent);
  $(Container).prepend($header);

  var $footer = $('<div class="bottomfooter"></div>');
  var $footer_content = $('<div class="footercontent"></div>');

  $footer_content.append('<div class="pagecontrol"></div><div class="pageinfo"></div><div class="pager"></div>')

  _html = 'Show rows: <span class="selectWrapper"><select id="rowselect" class="pageinfoselect input-mini">' +
    '<option value=10 ' + (_this.pageSize == 10 ? 'selected' : '') + ' >10</option>' +
    '<option value=25 ' + (_this.pageSize == 25 ? 'selected' : '') + ' >25</option>' +
    '<option value=50 ' + (_this.pageSize == 50 ? 'selected' : '') + ' >50</option>' +
    '<option value=100 ' + (_this.pageSize == 100 ? 'selected' : '') + ' >100</option>' +
    '<option value=250 ' + (_this.pageSize == 250 ? 'selected' : '') + ' >250</option>' +
    '<option value=500 ' + (_this.pageSize == 500 ? 'selected' : '') + ' >500</option>' +
    '</select></span>';

  $footer_content.find('.pager').html(_html);
  $footer_content.find('.pager .pageinfoselect').off('change');
  $footer_content.find('.pager .pageinfoselect').on('change', function (e) {
    _this.pageSize = $(this).val();
    _this.update(_this);
  });

  _html = '';//'x - y of ' + 'z';
  $footer_content.find('.pageinfo').html(_html);
  $footer.append($footer_content);

  _html = '<div class="btn-group"><button class="btn prev disabled"></button><button class="btn next disabled"></button></div>';
  $footer_content.find('.pagecontrol').html(_html);
  $footer_content.find('.pagecontrol .prev').off('click');
  $footer_content.find('.pagecontrol .prev').on('click', function (e) {
    if (!$(this).hasClass('disabled')) {
      _this.currentPage -= 1;
      _this.update(_this);
    }
  });
  $footer_content.find('.pagecontrol .next').off('click');
  $footer_content.find('.pagecontrol .next').on('click', function (e) {
    if (!$(this).hasClass('disabled')) {
      _this.currentPage += 1;
      _this.update(_this);
    }
  });

  $footer.append($footer_content);

  $(Container).append($footer);

  _html = '<div class="drilldownwrapper"><span class="japi dimensionpickerlabel" style="display: inline-block;font: normal 12px Arial;height: 22px;vertical-align: middle;">Primary Dimension: </span>';
  _html += '<li class="japi primarydimension" data-id="' + 'Name' + '" style="">';
  _html += 'Name' + '</li>';
  _html += '<div class="japi other picker btn-group  joolaio dimensions" style="display:inline;">';
  _html += '<li class="japi other picker dropdown" data-type="button" data-toggle="dropdown" style="background-color:white;position: absolute;display: inline-block; margin-left:5px;color:#08C;cursor:pointer;" onclick="">';
  _html += 'Other';
  _html += '<span class="caret" style=""></span></li>' +
    '<div class="japi otherlist"></div></div>' +
    '</div></div></div></div>';

  $header.append(_html);

  var $tablecontrol = $('<div class="tablecontrol"></div>');
  $tablecontrol.append('<div class="secondary btn-group"><button class="btn secondarywrapper dropdown-toggle dropdown" data-toggle="dropdown"><span class="secondarybutton">Add secondary dimension...</span>&nbsp;<span class="caret"></span></button><div class="secondarylist"><ul class="joolaio secondarylistcontainer dropdown-menu"></ul></div></div>');
  $tablecontrol.append('<div class="toolbar"><div class="tabletype"></div><div class="search input-prepend"><input type="text" class="quicksearch span2" placeholder="Search..."><span class="add-on"><i class="searchicon icon-search"></i></span></div><span class="advancedcaption">Advanced</span></div></div>');

  var $charttype = $('<div class="toolbaroptions btn-group" data-toggle="buttons-radio" ></div>');
  $charttype.append('<button rel="tooltip" title="Table" class="btn btn_table active">' +
    '<img src="' + joolaio.contenthost + '/assets/img/glyphicons_114_list.png""/>' +
    '</i></button>');
  $charttype.append('<button rel="tooltip" title="Pie chart" class="btn btn_pie ' + (_this.DateBox.comparePeriod ? 'disabled' : '') + '" ' + (_this.DateBox.comparePeriod ? 'disabled="disabled"' : '') + '>' +
    '<img src="' + joolaio.contenthost + '/assets/img/glyphicons_042_pie_chart.png"/>' +
    '</button>');
  $charttype.append('<button rel="tooltip" title="Performance" class="btn btn_perf ' + (_this.DateBox.comparePeriod ? 'disabled' : '') + '" ' + (_this.DateBox.comparePeriod ? 'disabled="disabled"' : '') + '>' +
    '<img src="' + joolaio.contenthost + '/assets/img/glyphicons_110_align_left.png"/>' +
    '</button>');
  /* $charttype.append('<button rel="tooltip" title="Comparison" class="btn btn_compare">' +
   '<img src="../framework/assets/img/glyphicons_108_left_indent.png" height="17" width="17" style="margin-top:-3px;"/>' +
   '</button>');*/


  $tablecontrol.find('.add-on').off('click');
  $tablecontrol.find('.add-on').on('click', function (e) {

    var $search = $($tablecontrol.find('.quicksearch')[$tablecontrol.find('.quicksearch').length - 1]);

    $(_this.Filters).each(function (fi, f) {
      joolaio.visualisation.report.removePartial(f);
    });
    _this.Filters = [];

    if ($search.val() == '') {
      joolaio.visualisation.report.setFilter('');
    }
    else {
      var shortfilter = _this.dimensions[0].id + '*=' + $search.val() + '[AND]';
      joolaio.visualisation.report.setFilter(shortfilter);
    }
  });

  $tablecontrol.find('.quicksearch').keypress(function (e) {
    if (e.which == 13) {
      $tablecontrol.find('.add-on').click();
    }
  });

  $charttype.find('.btn_table').off('click');
  $charttype.find('.btn_table').on('click', function (e) {
    _this.mode = 'table';
    _this.update(_this);
  });

  $charttype.find('.btn_pie').off('click');
  $charttype.find('.btn_pie').on('click', function (e) {
    _this.mode = 'pie';
    _this.sortColumnIndex = -1;
    _this.update(_this);
  });

  $charttype.find('.btn_perf').off('click');
  $charttype.find('.btn_perf').on('click', function (e) {
    _this.mode = 'perf';
    _this.sortColumnIndex = -1;
    _this.update(_this);
  });

  $charttype.find('.btn_compare').off('click');
  $charttype.find('.btn_compare').on('click', function (e) {
    _this.mode = 'compare';
    _this.sortColumnIndex = -1;
    _this.update(_this);
  });

  $tablecontrol.find('.tabletype').html($charttype);


  var $dimlist = $($tablecontrol.find('.joolaio.secondarylistcontainer'));
  $dimlist.append($('<li class="nav-header">' + _this.dimensions[0].name + '</li>'));


  var $item = $('<div class="joolaio picker dimensions" data-type="button"></div>');
  $($tablecontrol).find('.secondary').empty();
  $($tablecontrol).find('.secondary').append($item);
  var o = new joolaio.visualisation.picker.Dimensions({
    container: $item,
    prefix: 'Secondary dimension: ',
    placeholdertext: 'Add secondary dimension...',
    selected: (_this.dimensions.length == 1 ? '' : _this.dimensions[1].name)
  });
  _this.dimensionPicker = o;
  $(o).bind('select', function (data, dimension) {
    dimension = _.find(joolaio.objects.Dimensions, function (item) {
      return item.name == dimension
    });
    if (_this.dimensions.indexOf(dimension) == -1) {
      /*$dimlist.find('li').each(function (i, o) {
       $(this).removeClass('active');
       });*/
      //$(this).addClass('active');
      if (_this.dimensions.length == 1) {
        _this.sortColumnIndex = parseInt(_this.sortColumnIndex) + 1;
        _this.ColumnIndex = parseInt(_this.ColumnIndex) + 1;
        _this.compareColumnIndex = parseInt(_this.compareColumnIndex) + 1;
      }
      else {
        _this.dimensions.splice(1, 1);
      }
      _this.dimensions.push(dimension);
      _this.fetch(_this);

    }
  });

  $item = $($header.find('.japi.other.picker.dropdown'));
  o = new joolaio.visualisation.picker.Dimensions({
    container: $item,
    prefix: '',
    placeholdertext: 'Other',
    type: 'none',
    exclude: _this.options.excludeDimensions,
    selected: (_this.isother ? _this.dimensions[0].name : '')
  });

  $(o).bind('select', function (data, dimension) {
    dimension = _.find(joolaio.objects.Dimensions, function (item) {
      return item.name == dimension
    });
    if (_this.dimensions.indexOf(dimension) == -1) {
      /*$dimlist.find('li').each(function (i, o) {
       $(this).removeClass('active');
       });*/
      //$(this).addClass('active');
      /*
       if (_this.dimensions.length == 1) {
       _this.sortColumnIndex = parseInt(_this.sortColumnIndex) + 1;
       _this.ColumnIndex = parseInt(_this.ColumnIndex) + 1;
       _this.compareColumnIndex = parseInt(_this.compareColumnIndex) + 1;
       }
       else {
       _this.dimensions.splice(1, 1);
       }*/
      _this.dimensions[0] = dimension;
      _this.isother = true;
      _this.fetch(_this);

    }
  });

  $('.japi.primarydimension').off('click');
  $('.japi.primarydimension').on('click', function (e) {

    var dimension = $('.japi.primarydimension').text();
    dimension = _.find(joolaio.objects.Dimensions, function (item) {

      return item.name == dimension
    });
    _this.dimensions[0] = dimension;
    _this.isother = false;
    _this.fetch(_this);
  });

  $header.append($tablecontrol);

  var $advancedsearch = $('<div class="advancedsearch"><div class="advancedsearch_container"></div></div>');

  var o = new joolaio.visualisation.container.Filter({
    container: $advancedsearch
  });


  $header.append($advancedsearch);

  $('.advancedcaption').off('click');
  $('.advancedcaption').on('click', function () {

    $('#modal-notimplemented').modal('show');
    return;
    if ($advancedsearch.is(':visible')) {
      $advancedsearch.hide();
    }
    else {
      $advancedsearch.show();
    }
  });


  $('.japi.primarydimension').html(_this.levels[_this.drilldownlevel][0].name);

  if (!_this.isother) {

    $('.japi.primarydimension').addClass('on');
    $('.japi.other.picker').removeClass('on');
    $('.japi.other.picker .jbtn').html('Other <span class="caret"></span>');


  }

  else {
    $('.japi.primarydimension').removeClass('on');
    $('.drilldownlink').off('click');
    $('.drilldownlink').addClass('disabled');
    $('.drilldownlink').parent().addClass('disabled');


  }

  if (_this.drilldownlevel > 0 || (_this.drilldownlevel == 0 && _this.levels.length == 1))
    $('.japi.other.picker').css('visibility', 'visible');
  else
    $('.japi.other.picker').css('visibility', 'hidden');
};


joolaio.visualisation.report.Table.prototype.uid = function (sender) {
  return 'table-1234';
}

joolaio.visualisation.report.Table.prototype.setState = function (sender) {
  var _this = sender;

  if (!joolaio.state[_this.uid()])
    joolaio.state[_this.uid()] = {};

  joolaio.debug.log('INFO', 'joolaio.visualisation.report.Table', 6, 'Table "' + _this.uid() + '" saving state.');
  joolaio.state[_this.uid()].ChartType = _this.ChartType;
  joolaio.state[_this.uid()].Resolution = _this.Resolution;
  joolaio.state[_this.uid()].primaryMetric = _this.primaryMetric;
  joolaio.state[_this.uid()].secondaryMetric = _this.secondaryMetric;

  joolaio.state[_this.uid()].sortColumnIndex = _this.sortColumnIndex;
  joolaio.state[_this.uid()].ColumnIndex = _this.ColumnIndex;
  joolaio.state[_this.uid()].compareColumnIndex = _this.compareColumnIndex;
  joolaio.state[_this.uid()].sortDir = _this.sortDir;
  joolaio.state[_this.uid()].currentPage = _this.currentPage;
  joolaio.state[_this.uid()].pageSize = _this.pageSize;

  joolaio.state[_this.uid()].mode = _this.mode;

  //joolaio.state[_this.uid()].dimensions = _this.dimensions;
  //joolaio.state[_this.uid()].levels = _this.levels;
  joolaio.state[_this.uid()].drilldownlevel = _this.drilldownlevel;
  joolaio.state[_this.uid()].isother = _this.isother;
  //joolaio.state[_this.uid()].globalfilter = joolaio.visualisation.report.globalfilter;

  //joolaio.state[_this.uid()].metrics = _this.metrics;
  joolaio.state[_this.uid()].Filters = _this.Filters;
  //onsole.log(_this.mode);
  //joolaio.saveState('Table "' + _this.uid() + '" change');
};

joolaio.visualisation.report.Table.prototype.getState = function (sender) {
  var _this = sender;

  joolaio.debug.log('INFO', 'joolaio.visualisation.report.Table', 6, 'Table "' + _this.uid() + '" loading state.');
  if (joolaio.state[_this.uid()] != null) {
    _this.ChartType = joolaio.state[_this.uid()].ChartType;
    _this.Resolution = joolaio.state[_this.uid()].Resolution;
    _this.primaryMetric = joolaio.state[_this.uid()].primaryMetric;
    _this.secondaryMetric = joolaio.state[_this.uid()].secondaryMetric;

    _this.sortColumnIndex = joolaio.state[_this.uid()].sortColumnIndex;
    _this.ColumnIndex = joolaio.state[_this.uid()].ColumnIndex;
    _this.compareColumnIndex = joolaio.state[_this.uid()].compareColumnIndex;
    _this.sortDir = joolaio.state[_this.uid()].sortDir;
    _this.currentPage = joolaio.state[_this.uid()].currentPage;
    _this.pageSize = joolaio.state[_this.uid()].pageSize;

    _this.mode = joolaio.state[_this.uid()].mode;

    //_this.dimensions = joolaio.state[_this.uid()].dimensions;
    //_this.levels = joolaio.state[_this.uid()].levels;
    _this.drilldownlevel = joolaio.state[_this.uid()].drilldownlevel;
    _this.isother = joolaio.state[_this.uid()].isother;
    //_this.metrics = joolaio.state[_this.uid()].metrics;
    //_this.Container = joolaio.state[_this.uid()].Container;

    //joolaio.visualisation.report.globalfilter = joolaio.state[_this.uid()].globalfilter;

    _this.Filters = joolaio.state[_this.uid()].Filters;
  }
};

joolaio.debug.log('INFO', 'joolaio.visualisation.report.Table', 6, 'JS source loaded');

/**
 * init the Datebox and look for containers
 */
/*
 if ($('.joolaio.report.panel').length == 0)
 joolaio.visualisation.report.Table.init();
 */