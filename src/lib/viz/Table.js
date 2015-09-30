/**
 *  @title joola
 *  @overview the open-source data analytics framework
 *  @copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 **/

var
  joola = require('../index'),
  $$ = require('jquery'),
  events = require('events'),
  ce = require('cloneextend'),
  util = require('util'),
  async = require('async'),
  _ = require('underscore');

var Table = module.exports = function(options, callback) {
  var self = this;

  this.type = 'table';
  this.uuid = joola.common.uuid();
  this.initialized = false;
  this.data = [];
  this.sortIndex = -1;
  this.options = {
    container: null,
    colors: [],
    offcolors: [],
    paging: {
      currentPage: 1,
      sizes: [10, 25, 50, 100, 250, 500, 1000],
      currentSize: 50
    },
    template: '<div class="table-caption"></div>' +
      '<div class="controls">' +
      ' <div class="primary-dimension-picker"></div>' +
      ' <div class="add-dimension-picker"></div>' +
      ' <div class="add-metric-picker"></div>' +
      ' <button class="btn export" style="float:right">' +
      '   <span class="icon icon-download"></span>' +
      ' </button>' +

      ' <div class="search-wrapper">' +
      '   <input class="search" type="text" placeholder="Search..."/>' +
      ' </div>' +
      ' <div class="clearfix"></div>' +
      '</div>' +
      '<div class="table-wrapper">' +
      ' <table class="jio table">' +
      '   <thead></thead>' +
      '   <tbody></tbody>' +
      ' </table>' +
      '</div>' +
      '<div class="paging">' +
      ' <div class="paging-wrapper">' +
      '   <div class="page-size">' +
      '     <span class="caption">Show rows: </span>' +
      '     <select>' +
      '     </select>' +
      '   </div>' +
      ' </div>' +
      ' <div class="showing"></div>' +
      ' <div class="navigation">' +
      '   <div class="prev chevron before left"></div>' +
      '   <div class="next chevron before right"></div>' +
      ' </div>' +
      '</div>',
    query: null,
    strings: {
      loading: 'No data available.',
      nodata: 'No data available.',
      not_shown: 'Not shown'
    },
    limit: 1000,
    headers: false,
    include_not_shown: true,
    summary: {
      enabled: true,
      placement: 'top'
    },
    checkboxes: false,
    onCheck: function() {

    }
  };
  this.verify = function(options) {
    if (!self.options)
      return 'Failed to verify [options].';
    if (self.options.query) {
      if (!Array.isArray(self.options.query))
        self.options.query = [self.options.query];

    }
    return null;
  };

  this.enter = function(data, alldata) {

  };
  this.exit = function(data, alldata) {

  };
  this.update = function(data, alldata) {

  };

  this.export = function(canvas) {
    var data = [];
    var dimensions = [self.options.query[0].dimensions[0]];
    var collection = [self.options.query[0].collection];
    var metrics = [];
    var headers = [];
    self.options.query[0].dimensions.forEach(function(d) {
      headers.push(d.name || d.key || d);
      dimensions.push(d);
    });
    self.options.query[0].metrics.forEach(function(m) {
      headers.push(m.name || m.key || m);
      metrics.push(m);
    });
    joola.query.fetch(self.options.query, function(err, results) {
      var csvContent = "data:text/csv;charset=utf-8,";
      var dataString = '';
      data.push(headers);
      results[0].documents.forEach(function(doc) {
        var row = [];
        dimensions.forEach(function(d) {
          if (doc[d.key])
            row.push(doc[d.key]);
          else
            row.push('n/a');
        });
        metrics.forEach(function(m) {
          if (doc[m.key])
            row.push(doc[m.key]);
          else
            row.push(0);
        });
        data.push(row);
      });
      data.forEach(function(infoArray, index) {
        dataString = infoArray.join(",");
        csvContent += dataString + '\n'; //index < infoArray.length ? dataString + "\n" : dataString;
      });

      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "Odobo_Analytics.csv");
      link.click(); // This will download the data file named "my_data.csv".
    });
  };

  this.destroy = function() {
    joola.viz.stop(self);
    if (self.summaries) {
      Object.keys(self.summaries).forEach(function(key, index) {
        var summary = self.summaries[key];
        summary.destroy();
      });
    }
    if (self.primary_dimension_picker)
      self.primary_dimension_picker.destroy();
    if (self.add_metric_picker)
      self.add_metric_picker.destroy();
    if (self.add_dimension_picker)
      self.add_dimension_picker.destroy();
    $$(self.options.container).find('table').empty();
  };

  this.filter = function(data, filter) {
    return _.filter(data, function(item) {
      var found = false;
      Object.keys(item.dimensions).forEach(function(key) {
        if (item.dimensions[key].toLowerCase().indexOf(filter.toLowerCase()) > -1)
          found = true;
      });
      return found;
    });
  };

  this.paint = function() {
    var _query = self.options.query[0];
    var $table = $$($$(self.options.container).find('table')[0]);
    var $search = $$($$(self.options.container).find('input.search')[0]);
    var $tbody = $$($table.find('tbody')[0]);
    if (self.data[0].length > 0 || (self.data.length > 1 && self.data[1].length > 0)) {
      $tbody.find('tr.data-row').remove();
    } else {

    }

    if (self.sortIndex === -1) {
      self.sortIndex = self.options.query[0].dimensions.length + 1;
      self.sortDir = 'desc';
    }

    var start = ((self.options.paging.currentPage - 1) * self.options.paging.currentSize) + 1;
    var length = self.options.paging.currentSize;
    var search, text;

    if (self.data.length === 1) {
      var _data;
      var _total = [];
      search = $search.val();
      if (search && search.length > 2)
        _data = self.filter(self.data[0], search);
      else
        _data = self.data[0];
      self._data = [];
      self._data[0] = _data.slice(0);
      _data = _data.slice(start - 1, (start - 1) + length);
      _data.forEach(function(point) {
        //we have a simple row
        var $tr = $$('<tr class="data-row" data-id="' + point.key + '"></tr>');
        var lastIndex = 0;
        var $td, uuid;
        //checkbox
        if (self.options.checkboxes) {
          $td = $$('<td class="checkbox"><input type="checkbox"></td>');
          $tr.append($td);
          uuid = joola.common.uuid();
          $td.data('uuid', uuid);
          $td.attr('data-uuid', uuid);
          $td.find('input[type="checkbox"]').on('click', function() {
            var filters = [];
            var action = 'add';
            if (!this.checked)
              action = 'remove';

            self.options.canvas.options.filters.forEach(function(f) {
              f.filters.forEach(function(filter) {
                filters.push(filter);
              });
            });

            self.options.query[0].dimensions.forEach(function(d) {
              var filter = [];
              var dimensionkey = (d.key || d).replace(/\./ig, '_');
              filter.push(dimensionkey);
              filter.push('eq');
              filter.push(point.dimensions[dimensionkey]);
              filter.push('--table-checkbox');
              filter.push(uuid);
              filters.push(filter);
            });

            if (self.options.onCheck)
              self.options.onCheck.apply(this, [point, filters, action]);

            self.emit('check', [point, filters, action]);
            if (self.options.canvas) {
              self.options.canvas.emit('table-checkbox', point, filters, action);
            }
          });
        }

        _query.dimensions.forEach(function(d, di) {
          lastIndex++;
          var dimensionkey = (d.key || d).replace(/\./ig, '_');

          $td = $$('<td class="value dimension"><a href="javascript:void(0);" class="filter">' + point.dimensions[dimensionkey] + '</a></td>');
          $td.find('.filter').on('click', function() {
            self.options.canvas.emit('table-checkbox-clear', true);
            self.emit('select', point, dimensionkey);
          });
          if (di === self.sortIndex)
            $td.addClass('sorted');
          $tr.append($td);
        });
        $tbody.append($tr);
        _query.metrics.forEach(function(m, mi) {
          var metrickey = m.key || m;
          var $td = $$('<td class="value metric" data-key="' + metrickey + '" data-value="' + point.metrics[metrickey] + '">' + joola.common.formatMetric(point.metrics[metrickey], point.meta[metrickey]) + '' +
            '<span class="summary"></span>' +
            '</td>');
          if (lastIndex + mi === self.sortIndex)
            $td.addClass('sorted');
          $tr.append($td);
        });
      });
    } else if (self.data.length === 2) {
      var _comparequery = self.options.query[1];
      var base;
      var compare;
      search = $search.val();
      if (search && search.length > 2) {
        base = self.filter(self.data[0], search);
        compare = self.filter(self.data[1], search);
      } else {
        base = self.data[0];
        compare = self.data[1];
      }
      self._data = [];
      self._data[0] = self.data[0].slice(0);
      self._data[1] = self.data[1].slice(0);
      base = base.slice(start - 1, (start - 1) + length);
      var handled = [];
      base.forEach(function(point, index) {
        handled.push(point.key);
        var $tr = $$('<tr class="data-row" data-id="' + point.key + '"></tr>');
        var lastIndex = 0;

        var $td, uuid;
        //checkbox
        if (self.options.checkboxes) {
          $td = $$('<td class="checkbox"><input type="checkbox"></td>');
          uuid = joola.common.uuid();
          $td.find('input[type="checkbox"]').on('click', function() {
            var filters = [];
            var action = 'add';
            if (!this.checked)
              action = 'remove';

            self.options.canvas.options.filters.forEach(function(f) {
              f.filters.forEach(function(filter) {
                filters.push(filter);
              });
            });

            self.options.query[0].dimensions.forEach(function(d) {
              var filter = [];
              var dimensionkey = (d.key || d).replace(/\./ig, '_');
              filter.push(dimensionkey);
              filter.push('eq');
              filter.push(point.dimensions[dimensionkey]);
              filter.push('--table-checkbox');
              filter.push(uuid);
              filters.push(filter);
            });

            if (self.options.onCheck)
              self.options.onCheck.apply(this, [point, filters, action]);

            self.emit('check', [point, filters, action]);
            if (self.options.canvas) {
              self.options.canvas.emit('table-checkbox', point, filters, action);
            }
          });
          $tr.append($td);
        }

        _query.dimensions.forEach(function(d, di) {
          var dimensionkey = d.key || d;
          $td = $$('<td class="value dimension"><a href="javascript:void(0);" class="filter">' + point.dimensions[dimensionkey] + '</a></td>');
          lastIndex++;
          if (di === self.sortIndex)
            $td.addClass('sorted');
          $td.find('.filter').on('click', function() {
            self.options.canvas.emit('table-checkbox-clear', true);
            self.emit('select', point, dimensionkey);
          });
          $tr.append($td);
        });
        _query.metrics.forEach(function(m, mi) {
          var $td = $$('<td class="value metric empty"></td>');
          if (lastIndex + mi === self.sortIndex)
            $td.addClass('sorted');
          $tr.append($td);
        });
        $tbody.append($tr);

        text = joola.common.formatDate(_query.timeframe.start) + ' - ';
        text += joola.common.formatDate(_query.timeframe.end);
        $tr = $$('<tr class="data-row" data-id="' + point.key + '"></tr>');

        if (self.options.checkboxes) {
          $td = $$('<td class="checkbox"></td>');
          $tr.append($td);
        }

        $td = $$('<td class="value dimension" colspan="' + _query.dimensions.length + '">' + text + '</td>');
        $tr.append($td);

        $tbody.append($tr);
        lastIndex = _query.dimensions.length;
        _query.metrics.forEach(function(m, mi) {
          var metrickey = m.key || m;
          var $td = $$('<td class="value metric" data-key="' + metrickey + '" data-value="' + point.metrics[metrickey] + '">' + joola.common.formatMetric(point.metrics[metrickey], point.meta[metrickey]) + '' +
            '<span class="summary"></span>' +
            '</td>');
          if (lastIndex + mi === self.sortIndex)
            $td.addClass('sorted');
          $tr.append($td);
        });

        var comparePoint = compare[index];
        text = joola.common.formatDate(_comparequery.timeframe.start) + ' - ';
        text += joola.common.formatDate(_comparequery.timeframe.end);
        $tr = $$('<tr class="data-row" data-id="' + (comparePoint ? comparePoint.key : 'missing') + '"></tr>');

        if (self.options.checkboxes) {
          $td = $$('<td class="checkbox"></td>');
          $tr.append($td);
        }

        $td = $$('<td class="value dimension" colspan="' + _query.dimensions.length + '">' + text + '</td>');
        $tr.append($td);

        $tbody.append($tr);
        _query.metrics.forEach(function(m, mi) {
          var metrickey = m.key || m;
          var $td = $$('<td class="value metric compare" data-key="' + metrickey + '" data-value="' + (comparePoint ? comparePoint.metrics[metrickey] : 'N/A') + '">' + (comparePoint ? joola.common.formatMetric(comparePoint.metrics[metrickey], comparePoint.meta[metrickey]) : 'N/A') + '' +
            '<span class="summary"></span></td>');
          if (lastIndex + mi === self.sortIndex)
            $td.addClass('sorted');
          $tr.append($td);
        });

        $tr = $$('<tr class="data-row" data-id="' + point.key + '"></tr>');

        if (self.options.checkboxes) {
          $td = $$('<td class="checkbox"></td>');
          $tr.append($td);
        }

        $td = $$('<td class="caption change" colspan="' + _query.dimensions.length + '">% Change</td>');
        $tr.append($td);

        _query.metrics.forEach(function(m, mi) {
          var metrickey = m.key || m;
          var value, cssClass;

          if (point && comparePoint) {
            value = joola.common.percentageChange(comparePoint.metrics[metrickey], point.metrics[metrickey]);
            if (value < 0)
              cssClass = 'negative';
            else if (value > 0)
              cssClass = 'positive';
            else
              cssClass = 'neutral';
            value += '%';
          } else
            value = 'N/A';
          var $td = $$('<td class="value change ' + cssClass + '">' + value + '</td>');
          if (lastIndex + mi === self.sortIndex)
            $td.addClass('sorted');
          $tr.append($td);
        });
        $tbody.append($tr);
      });

      compare.forEach(function(comparePoint, index) {
        var lastIndex = 0;
        if (handled.indexOf(comparePoint.key) === -1) {
          var $tr = $$('<tr class="data-row" data-id="' + comparePoint.key + '"></tr>');
          var $td, uuid;

          //checkbox
          if (self.options.checkboxes) {
            $td = $$('<td class="checkbox"><input type="checkbox"></td>');
            uuid = joola.common.uuid();
            $td.find('input[type="checkbox"]').on('click', function() {
              var filters = [];
              var action = 'add';
              if (!this.checked)
                action = 'remove';

              self.options.canvas.options.filters.forEach(function(f) {
                f.filters.forEach(function(filter) {
                  filters.push(filter);
                });
              });

              self.options.query[0].dimensions.forEach(function(d) {
                var filter = [];
                var dimensionkey = (d.key || d).replace(/\./ig, '_');
                filter.push(dimensionkey);
                filter.push('eq');
                filter.push(comparePoint.dimensions[dimensionkey]);
                filter.push('--table-checkbox');
                filter.push(uuid);
                filters.push(filter);
              });

              if (self.options.onCheck)
                self.options.onCheck.apply(this, [comparePoint, filters, action]);

              self.emit('check', [comparePoint, filters, action]);
              if (self.options.canvas) {
                self.options.canvas.emit('table-checkbox', comparePoint, filters, action);
              }
            });
            $tr.append($td);
          }
          _query.dimensions.forEach(function(d, di) {
            var dimensionkey = d.key || d;
            $td = $$('<td class="value dimension"><a href="javascript:void(0);" class="filter">' + comparePoint.dimensions[dimensionkey] + '</a></td>');
            $td.find('.filter').on('click', function() {
              self.options.canvas.emit('table-checkbox-clear', true);
              self.emit('select', comparePoint, dimensionkey);
            });
            lastIndex++;
            if (di === self.sortIndex)
              $td.addClass('sorted');
            $tr.append($td);
          });
          _query.metrics.forEach(function(m, mi) {
            $td = $$('<td class="value metric empty"></td>');
            if (lastIndex + mi === self.sortIndex)
              $td.addClass('sorted');
            $tr.append($td);
          });
          $tbody.append($tr);

          text = joola.common.formatDate(_query.timeframe.start) + ' - ';
          text += joola.common.formatDate(_query.timeframe.end);
          $tr = $$('<tr class="data-row" data-id="' + comparePoint.key + '"></tr>');
          if (self.options.checkboxes) {
            $td = $$('<td class="checkbox"></td>');
            uuid = joola.common.uuid();
            $td.find('input[type="checkbox"]').on('click', function() {
              var filters = [];
              var action = 'add';
              if (!this.checked)
                action = 'remove';

              self.options.canvas.options.filters.forEach(function(f) {
                f.filters.forEach(function(filter) {
                  filters.push(filter);
                });
              });

              self.options.query[0].dimensions.forEach(function(d) {
                var filter = [];
                var dimensionkey = (d.key || d).replace(/\./ig, '_');
                filter.push(dimensionkey);
                filter.push('eq');
                filter.push(point.dimensions[dimensionkey]);
                filter.push('--table-checkbox');
                filter.push(uuid);
                filters.push(filter);
              });

              if (self.options.onCheck)
                self.options.onCheck.apply(this, [point, filters, action]);

              self.emit('check', [point, filters, action]);
              if (self.options.canvas) {
                self.options.canvas.emit('table-checkbox', point, filters, action);
              }
            });
            $tr.append($td);
          }
          $td = $$('<td class="value dimension" colspan="' + _query.dimensions.length + '">' + text + '</td>');
          $tr.append($td);

          $tbody.append($tr);
          _query.metrics.forEach(function(m, mi) {
            var metrickey = m.key || m;
            $td = $$('<td class="value metric" data-key="' + metrickey + '" data-value="' + 'N/A' + '">' + 'N/A' + '' +
              '<span class="summary"></span>' +
              '</td>');
            if (lastIndex + mi === self.sortIndex)
              $td.addClass('sorted');
            $tr.append($td);
          });

          text = joola.common.formatDate(_comparequery.timeframe.start) + ' - ';
          text += joola.common.formatDate(_comparequery.timeframe.end);
          $tr = $$('<tr class="data-row" data-id="' + (comparePoint ? comparePoint.key : 'missing') + '"></tr>');
          if (self.options.checkboxes) {
            $td = $$('<td class="checkbox"></td>');
            $tr.append($td);
          }
          $td = $$('<td class="value dimension" colspan="' + _query.dimensions.length + '">' + text + '</td>');
          $tr.append($td);

          $tbody.append($tr);
          _query.metrics.forEach(function(m, mi) {
            var metrickey = m.key || m;
            $td = $$('<td class="value metric compare" data-key="' + metrickey + '" data-value="' + (comparePoint ? comparePoint.metrics[metrickey] : 'N/A') + '">' + (comparePoint ? joola.common.formatMetric(comparePoint.metrics[metrickey], comparePoint.meta[metrickey]) : 'N/A') + '' +
              '<span class="summary"></span></td>');
            if (lastIndex + mi === self.sortIndex)
              $td.addClass('sorted');
            $tr.append($td);
          });

          $tr = $$('<tr class="data-row" data-id="' + comparePoint.key + '"></tr>');
          if (self.options.checkboxes) {
            $td = $$('<td class="checkbox"></td>');
            $tr.append($td);
          }
          $td = $$('<td class="caption change" colspan="' + _query.dimensions.length + '">% Change</td>');
          $tr.append($td);

          _query.metrics.forEach(function(m, mi) {
            var metrickey = m.key || m;
            $td = $$('<td class="value change">N/A</td>');
            if (lastIndex + mi === self.sortIndex)
              $td.addClass('sorted');
            $tr.append($td);
          });
          $tbody.append($tr);
        }
      });
    }

    self.handleHeaders();
    self.summarize();
    self.handlePaging();
  };

  this.done = function(ctx, messages) {
    messages.forEach(function(message, messageIndex) {
      message.metrics.forEach(function(metric, metricIndex) {
        self.options.query[messageIndex].metrics[metricIndex] = metric;
      });
    });
    if (self.add_metric_picker) {
      self.options.query[0].metrics.forEach(function(m, i) {
        if (typeof m !== 'object')
          m = {
            key: m
          };
        m.collection = m.collection || self.options.query[0].collection;
        self.options.query[0].metrics[i] = m;
      });
      self.add_metric_picker.options.disabled = self.options.query[0].metrics;
      self.add_metric_picker.markSelected();
    }
    self.paint();
  };

  this.handleHeaders = function() {
    var lastIndex = 0;
    self.options.query[0].dimensions.forEach(function(d, i) {
      var name = d.name || d.key || d;
      var $th = $$(self.options.$container.find('table th')[i]);
      if (!$th.hasClass('dimension')) {
        $th.after($th.clone(true));
      }
      $th.find('.name').text(name);
      if (!d.description)
        $th.find('.icon-help').hide();
      else {
        $th.find('.icon-help').show();
        $th.find('.icon-help span').text(d.description);
      }
      lastIndex++;
    });
    self.options.query[0].metrics.forEach(function(m, i) {
      var name = m.name || m.key || m;
      var $th = $$(self.options.$container.find('table th')[i + lastIndex]);
      if (!m.description)
        $th.find('.icon-help').hide();
      else {
        $th.find('.icon-help').show();
        $th.find('.icon-help span').text(m.description);
      }
      $th.find('.name').text(name);
    });

    var $html = self.options.$container;
    var $thead = $$($html.find('thead'));
    var $head_tr = $$('<tr class="captions"></tr>');
    lastIndex = 0;

    var $th;

    if (self.options.checkboxes) {
      $th = $$('<th class="caption checkbox"><span class="name"></span></th>');
      $head_tr.append($th);
    }

    self.options.query[0].dimensions.forEach(function(d, di) {
      lastIndex++;

      $th = $$('<th class="caption dimension"><span class="name"></span><span class="icon-help"><span></span></span><span class="icon-close"></span><span class="caret-sort"></span></th>');
      $th.find('.name').text(d.name || d.key || d);
      if (d.allowremove) {
        $th.find('.icon-close').off('click');
        $th.find('.icon-close').on('click', function(e) {
          e.stopPropagation();
          self.options.query.forEach(function(q) {
            var index = -1;
            q.dimensions.forEach(function(item, i) {
              if (item.key === d.key)
                index = i;
            });
            if (index > -1)
              q.dimensions.splice(index, 1);
          });
          self.data = [];
          self.options.paging.currentPage = 1;
          self.sortIndex--;
          self.handleMetricBoxes();
          self.options.canvas.emit('table-checkbox-clear');
          joola.viz.initialize(self, self.options);
        });
      } else
        $th.find('.icon-close').remove();
      if (!d.description)
        $th.find('.icon-help').hide();
      else {
        $th.find('.icon-help').show();
        $th.find('.icon-help span').text(d.description);
      }
      $th.find('.icon-help').on('click', function(e) {
        e.stopPropagation();
      });
      $th.attr('data-sort-dir', null);
      $th.attr('data-sort', null);
      $th.find('.caret-sort').removeClass('icon-sort-desc');
      $th.find('.caret-sort').removeClass('icon-sort-asc');
      if (di === self.sortIndex) {
        $th.attr('data-sort', true);
        $th.attr('data-sort-dir', self.sortDir);
        $th.find('.caret-sort').addClass('icon-sort-' + self.sortDir);
      }
      $th.on('click', function() {
        self.sortIndex = di;
        if (self.summaries) {
          Object.keys(self.summaries).forEach(function(key, index) {
            var summary = self.summaries[key];
            summary.options.$container.removeClass('sorted');
          });
        }

        self.data[0] = _.sortBy(self.data[0], function(item) {
          return item.dimensions[d.key || d];
        });
        var sortDir = $th.attr('data-sort-dir') || 'desc';
        if (sortDir === 'desc') {
          sortDir = 'asc';
        } else {
          self.data[0] = _.sortBy(self.data[0], function(item) {
            return item.dimensions[d.key || d];
          });
          self.data[0].reverse();
          sortDir = 'desc';
        }
        self.sortDir = sortDir;
        $head_tr.find('th').attr('data-sort-dir', null);
        $head_tr.find('th').attr('data-sort', null);
        $head_tr.find('th .caret-sort').removeClass('icon-sort-desc');
        $head_tr.find('th .caret-sort').removeClass('icon-sort-asc');
        $th.attr('data-sort', true);
        $th.attr('data-sort-dir', self.sortDir);
        $th.find('.caret-sort').addClass('icon-sort-' + self.sortDir);
        self.paint();
      });
      $head_tr.append($th);
    });
    self.options.query[0].metrics.forEach(function(m, mi) {
      var $th = $$('<th class="caption metric"><span class="name"></span><span class="icon-help"><span></span></span><span class="icon-close"></span><span class="caret-sort"></span></th>');
      $th.find('.name').text(m.name || m.key || m);
      if (m.allowremove) {
        $th.find('.icon-close').off('click');
        $th.find('.icon-close').on('click', function(e) {
          e.stopPropagation();
          self.options.query.forEach(function(q) {
            var index = -1;
            q.metrics.forEach(function(item, i) {
              if (item.key === m.key)
                index = i;
            });
            if (index > -1)
              q.metrics.splice(index, 1);
          });
          var _summaries = {};
          if (self.summaries) {
            Object.keys(self.summaries).forEach(function(key) {
              item = self.summaries[key];
              if ((item.options.query[0].metrics[0].key || item.options.query[0].metrics[0]) === m.key) {} else
                _summaries[key] = self.summaries[key];
            });
            self.summaries = _summaries;
            self.data = [];
            self.options.paging.currentPage = 1;
            self.sortIndex--;
            self.handleMetricBoxes();
          }
          self.options.canvas.emit('table-checkbox-clear');
          joola.viz.initialize(self, self.options);
        });
      } else
        $th.find('.icon-close').remove();
      if (!m.description)
        $th.find('.icon-help').hide();
      else {
        $th.find('.icon-help').show();
        $th.find('.icon-help span').text(m.description);
      }
      if (self.sortIndex === -1) {
        self.sortIndex = lastIndex;
        self.sortDir = 'desc';
      }

      $th.attr('data-sort-dir', null);
      $th.attr('data-sort', null);
      $th.find('.caret-sort').removeClass('icon-sort-desc');
      $th.find('.caret-sort').removeClass('icon-sort-asc');
      if (lastIndex + mi === self.sortIndex) {
        $th.attr('data-sort', true);
        $th.attr('data-sort-dir', self.sortDir);
        $th.find('.caret-sort').addClass('icon-sort-' + self.sortDir);
      }

      $th.on('click', function() {
        self.sortIndex = lastIndex + mi;
        if (self.summaries) {
          Object.keys(self.summaries).forEach(function(key) {
            var summary = self.summaries[key];
            summary.options.$container.removeClass('sorted');
            if (key === (m.key || m))
              summary.options.$container.addClass('sorted');
          });
        }
        self.data[0] = _.sortBy(self.data[0], function(item) {
          return item.metrics[m.key || m];
        });
        var sortDir = $th.attr('data-sort-dir') || 'desc';
        if (sortDir === 'desc') {
          sortDir = 'asc';
        } else {
          self.data[0] = _.sortBy(self.data[0], function(item) {
            return item.metrics[m.key || m];
          });
          self.data[0].reverse();
          sortDir = 'desc';
        }
        self.sortDir = sortDir;
        $head_tr.find('th').attr('data-sort-dir', null);
        $head_tr.find('th').attr('data-sort', null);
        $head_tr.find('th .caret-sort').removeClass('icon-sort-desc');
        $head_tr.find('th .caret-sort').removeClass('icon-sort-asc');
        $th.attr('data-sort', true);
        $th.attr('data-sort-dir', self.sortDir);
        $th.find('.caret-sort').addClass('icon-sort-' + self.sortDir);
        self.paint();
      });
      $head_tr.append($th);
    });
    $thead.html($head_tr);
    $html.find('table tbody').before($thead);
  };

  this.handleMetricBoxes = function() {
    if (!self.options.summary.enabled)
      return;

    var $html = self.options.$container;
    var $tbody = $html.find('tbody');
    $tbody = $$($tbody);
    var $metric_tr = $$('<tr class="metricboxes"></tr>');
    var lastIndex = 0;
    self.options.query[0].dimensions.forEach(function(d) {
      var $td = $$('<td class="metricbox dimension"></td>');
      $metric_tr.append($td);
      lastIndex++;
    });

    var index = 0;
    async.mapSeries(self.options.query[0].metrics, function(m, cb) {
      var $td = $$('<td class="metricbox metric"></td>');
      $metric_tr.append($td);
      var _query = ce.clone(self.options.query);

      _query.forEach(function(q) {
        delete q.sort;
        delete q.order;
        delete q.orderby;
        q.dimensions = [];
        q.metrics = [m];
        if (!q.filter)
          q.filter = [];
        if (q.filter.length > 0 && (_query.length < 2 || (_query.length === 2 && _query[1].type !== 'compare'))) {
          var _q = ce.clone(q);
          _q.filter = [];
          _q.type = 'overall';
          _query.push(_q);
        }
      });

      if (!self.summaries)
        self.summaries = {};
      self.summaries[m.key] = new joola.viz.Metric({
        container: $td.get(0),
        css: lastIndex + index === self.sortIndex ? 'sorted' : '',
        query: _query
      });
      self.summaries[m.key].on('done', function() {
        self.summaries[m.key].options.$container.addClass(lastIndex + index === self.sortIndex ? 'sorted' : '');
        self.summarize();
        return cb(null);
      });
      index++;
    }, function(err, results) {});
    if ($tbody.find('.metricboxes').length > 0)
      $tbody.find('.metricboxes').replaceWith($metric_tr);
    else
      $$($tbody.find('tr.data-row')[0]).before($metric_tr);
  };

  this.handlePaging = function() {

    var $showing = $$(self.options.$container.find('.showing'));

    var total = self._data[0].length;
    var to = self.options.paging.currentPage * self.options.paging.currentSize;
    if (to > total)
      to = total;
    var showingText = ((self.options.paging.currentPage - 1) * self.options.paging.currentSize + 1) + ' - ' + to + ' of ' + total;

    $showing.text(showingText);

    var $prev = $$(self.options.$container.find('.prev'));
    var $next = $$(self.options.$container.find('.next'));
    if (self.options.paging.currentPage > 1) {
      $prev.removeClass('disabled');
      $prev.off('click');
      $prev.on('click', function() {
        if (self.options.paging.currentPage > 1) {
          self.options.paging.currentPage--;
          self.paint();
        }
      });
    } else {
      $prev.addClass('disabled');
      $prev.off('click');
    }
    var nextIndex = ((self.options.paging.currentPage) * self.options.paging.currentSize);
    if (nextIndex < self._data[0].length) {
      $next.removeClass('disabled');
      $next.off('click');
      $next.on('click', function() {
        var nextIndex = ((self.options.paging.currentPage) * self.options.paging.currentSize);
        if (nextIndex < self._data[0].length) {
          self.options.paging.currentPage++;
          self.paint();
        }
      });
    } else {
      $next.addClass('disabled');
      $next.off('click');
    }
  };

  this.sort = function() {

  };

  this.summarize = function() {
    if (!self.options.summary.enabled)
      return;
    Object.keys(self.summaries).forEach(function(key, mindex) {
      var ref = self.summaries[key];
      var m = self.options.query[0].metrics[mindex];

      if ((m.aggregation || 'sum') === 'sum' && ref.data.length > 0) {
        var total, comparetotal;
        if (ref.data[0].length > 0)
          total = ref.data[0][0].metrics[m.key];
        if (ref.data.length > 1 && ref.data[1].length > 0 && ref.data[1].type !== 'overall') {
          comparetotal = ref.data[1][0].metrics[m.key];
        }
        var $summaries = $$('.value.metric[data-key="' + m.key + '"]');
        $summaries.each(function(index, summary) {
          var $summary = $$(summary);
          var value = $summary.attr('data-value');
          if (value === 'N/A') {
            $summary.find('span.summary').text(' (N/A)');
          } else {
            if ($summary.hasClass('compare'))
              value = (value / comparetotal * 100).toFixed(2) + '%';
            else
              value = (value / total * 100).toFixed(2) + '%';
            $summary.find('span.summary').text(' (' + value + ')');
          }
        });
      }
    });
  };

  this.draw = function(options) {
    //we draw the template into the container
    var $html = $$(self.options.template);
    $$(self.options.container).html($html);

    var $export = $html.find('.export .icon-download');
    $export.off('click');
    $export.on('click', function(e) {
      self.export();
    });

    if (self.options.caption)
      $$(self.options.container).find('.table-caption').text(self.options.caption);
    //visualization specific drawing
    if (self.options.pickers && self.options.pickers.primary && self.options.pickers.primary.enabled) {
      var $primary_dimension_picker = $$($html.find('.primary-dimension-picker'));
      self.options.pickers.primary.css = 'table-picker';
      self.options.pickers.primary.container = $primary_dimension_picker.get(0);
      var dimension = self.options.query[0].dimensions[0];
      if (!dimension.key)
        dimension = {
          key: dimension
        };
      if (!dimension.collection)
        dimension.collection = self.options.query[0].collection;
      self.options.pickers.primary.selected = dimension;
      self.options.pickers.primary.disabled = self.options.query[0].dimensions;
      self.options.pickers.primary.prefix = 'Primary dimension: ';
      new joola.viz.DimensionPicker(self.options.pickers.primary, function(err, ref) {
        if (err)
          throw err;
        self.primary_dimension_picker = ref;
      }).on('change', function(dimension) {
        self.options.query.forEach(function(q) {
          if (dimension)
            q.dimensions[0] = dimension;
          else
            q.dimensions.splice(0, 1);
        });
        self.options.paging.currentPage = 1;
        self.data = [];
        self.options.canvas.emit('table-checkbox-clear');
        joola.viz.initialize(self, self.options);
      });
    }
    if (self.options.pickers && self.options.pickers.add_dimension && self.options.pickers.add_dimension.enabled) {
      var $add_dimension_picker = $$($html.find('.add-dimension-picker'));
      self.options.pickers.add_dimension.css = 'table-picker';
      self.options.pickers.add_dimension.container = $add_dimension_picker.get(0);
      self.options.pickers.add_dimension.caption = self.options.pickers.add_dimension.caption || 'Add dimension...';
      self.options.pickers.add_dimension.disabled = self.options.query[0].dimensions;
      new joola.viz.DimensionPicker(self.options.pickers.add_dimension, function(err, ref) {
        if (err)
          throw err;
        self.add_dimension_picker = ref;
      }).on('change', function(dimension) {
        self.options.query.forEach(function(q) {
          if (dimension) {
            dimension.allowremove = true;
            q.dimensions.push(dimension);
          }
        });
        self.data = [];
        self.options.paging.currentPage = 1;
        self.sortIndex++;
        self.handleMetricBoxes();
        self.options.canvas.emit('table-checkbox-clear');
        joola.viz.initialize(self, self.options);
      });
    }
    if (self.options.pickers && self.options.pickers.add_metric && self.options.pickers.add_metric.enabled) {
      var $add_metric_picker = $$($html.find('.add-metric-picker'));
      self.options.pickers.add_metric.css = 'table-picker';
      self.options.pickers.add_metric.container = $add_metric_picker.get(0);
      self.options.pickers.add_metric.caption = self.options.pickers.add_metric.caption || 'Add metric...';
      self.options.query[0].metrics.forEach(function(m, i) {
        if (typeof m !== 'object')
          m = {
            key: m
          };
        m.collection = m.collection || self.options.query[0].collection;
        self.options.query[0].metrics[i] = m;
      });
      self.options.pickers.add_metric.disabled = self.options.query[0].metrics;
      new joola.viz.MetricPicker(self.options.pickers.add_metric, function(err, ref) {
        if (err)
          throw err;
        self.add_metric_picker = ref;
      }).on('change', function(metric) {
        self.options.query.forEach(function(q) {
          if (metric) {
            metric.allowremove = true;
            q.metrics.push(metric);
          }
        });
        self.data = [];
        self.options.paging.currentPage = 1;
        self.sortIndex++;
        self.handleMetricBoxes();
        self.options.canvas.emit('table-checkbox-clear');
        joola.viz.initialize(self, self.options);
      });
    }
    var $thead = $$($html.find('thead'));
    $html.find('table').append($thead);


    var $tbody = $html.find('tbody');
    $tbody = $$($tbody);
    $tbody.empty();

    var $metric_tr = $$('<tr class="metricboxes"></tr>');
    $tbody.append($metric_tr);
    self.handleHeaders();
    self.handleMetricBoxes();
    var $tr = $$('<tr class="data-row loading"></tr>');
    var $td = $$('<td class="loading" colspan="' + (self.options.query[0].dimensions.length + self.options.query[0].metrics.length + (self.options.checkboxes ? 1 : 0)) + '">' + self.options.strings.loading + '</td>');
    $tr.append($td);
    $tbody.append($tr);
    $html.find('table').append($tbody);

    var $pageSize = $$($html.find('.page-size select'));
    self.options.paging.sizes.forEach(function(size) {
      var $option;
      if (size === self.options.paging.currentSize)
        $option = $$('<option value="' + size + '" selected>' + size + '</option>');
      else
        $option = $$('<option value="' + size + '">' + size + '</option>');
      $pageSize.append($option);
    });

    $pageSize.on('change', function() {
      self.options.paging.currentPage = 1;
      self.options.paging.currentSize = parseInt($pageSize.val(), 10);
      self.paint();
    });

    var $search = $$($html.find('input.search'));
    $search.on('keyup', function() {
      if ($search.val().length > 2)
        self.options.paging.currentPage = 1;
      self.paint();
    });
  };

  if (options && options.query && !Array.isArray(options.query))
    options.query = [options.query];

  options.query[0].sort = [
    [options.query[0].metrics[0].key || options.query[0].metrics[0], 'DESC']
  ];
  //we call the core initialize option
  joola.viz.initialize(self, options || {});

  if (self.options.colors.length === 0)
    self.options.colors = joola.colors;
  if (self.options.offcolors.length === 0)
    self.options.offcolors = joola.offcolors;

  self.draw();

  joola.viz.onscreen.push(self);
  if (!self.options.canvas) {
    var elem = $$(self.options.$container).parent();
    if (elem.attr('jio-type') == 'canvas') {
      self.options.canvas = $$(elem).Canvas();
    }
  }
  if (self.options.canvas) {
    self.options.canvas.addVisualization(self);
  }

  //wrap up
  self.initialized = true;
  if (typeof callback === 'function')
    return callback(null, self);

  return self;
};

joola.events.on('core.init.finish', function() {
  var found;
  if (typeof(jQuery) != 'undefined') {
    $.fn.Table = function(options, callback) {
      if (!options)
        options = {
          force: false
        };
      else if (!options.hasOwnProperty('force'))
        options.force = true;
      var result = null;
      var uuid = this.attr('jio-uuid');
      if (!uuid || options.force) {
        if (options.force && uuid) {
          var existing = null;
          found = false;
          joola.viz.onscreen.forEach(function(viz) {
            if (viz.uuid == uuid && !found) {
              found = true;
              existing = viz;
            }
          });

          if (found && existing) {
            existing.destroy();
          }
        }
        //create new
        if (!options)
          options = {};
        options.container = this.get(0);
        result = new joola.viz.Table(options, function(err, table) {
          if (err)
            throw err;
        }).options.$container;
      } else {
        //return existing
        found = false;
        joola.viz.onscreen.forEach(function(viz) {
          if (viz.uuid == uuid && !found) {
            found = true;
            result = viz;
          }
        });
      }
      return result;
    };
  }
});

util.inherits(Table, events.EventEmitter);
