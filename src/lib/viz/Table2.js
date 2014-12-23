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

var Table = module.exports = function (options, callback) {
    var self = this;

    //mixin
    this._super = {};
    for (var x in require('./_proto')) {
      this[x] = require('./_proto')[x];
      this._super[x] = require('./_proto')[x];
    }

    this.type = 'table';
    this.uuid = joola.common.uuid();
    this.initialized = false;
    this.data = [];
    this.options = {
      container: null,
      colors: [],
      offcolors: [],
      paging: {
        currentPage: 1,
        sizes: [10, 25, 50, 100, 250, 500, 1000],
        currentSize: 10
      },
      template: '<div class="table-caption"></div>' +
        '<div class="controls">' +
        ' <div class="primary-dimension-picker">Primary dimension picker</div>' +
        ' <div class="add-dimension-picker">Add dimension...</div>' +
        ' <div class="add-metric-picker">Add metric...</div>' +
        ' <div class="search-wrapper">' +
        '   <input class="search" type="text" placeholder="Search..."/>' +
        ' </div>' +
        '</div>' +
        '<table class="jio table">' +
        ' <thead></thead>' +
        ' <tbody></tbody>' +
        '</table>' +
        '<div class="paging">' +
        ' <div class="paging-wrapper">' +
        '   <div class="page-size">' +
        '     <span class="caption">Page size: </span>' +
        '     <select>' +
        '     </select>' +
        '   </div>' +
        ' </div>' +
        ' <div class="showing"></div>' +
        ' <div class="navigation">' +
        '   <div class="prev chevron left"></div>' +
        '   <div class="next chevron right"></div>' +
        ' </div>' +
        '</div>',
      query: null,
      strings: {
        loading: 'No data available.',
        nodata: 'No data available.',
        not_shown: 'Not shown'
      },
      limit: 10,
      headers: false,
      include_not_shown: true,
      summary: {
        enabled: true,
        placement: 'top'
      },
    };
    this.verify = function (options) {
      if (!self.options)
        return 'Failed to verify [options].';
      if (self.options.query) {
        if (!Array.isArray(self.options.query))
          self.options.query = [self.options.query];

      }
      return null;
    };

    this.enter = function (data, alldata) {

    }
    ;
    this.exit = function (data, alldata) {

    };
    this.update = function (data, alldata) {

    };

    this.destroy = function () {
      $$(self.options.container).find('table').empty();
    };

    this.filter = function (data, filter) {
      return _.filter(data, function (item) {
        var found = false;
        Object.keys(item.dimensions).forEach(function (key) {
          if (item.dimensions[key].toLowerCase().indexOf(filter.toLowerCase()) > -1)
            found = true;
        });
        return found;
      });
    };

    this.paint = function () {
      var _query = self.options.query[0];
      var $table = $$($$(self.options.container).find('table')[0]);
      var $search = $$($$(self.options.container).find('input.search')[0]);
      var $tbody = $$($table.find('tbody')[0]);
      if (self.data[0].length > 0 || (self.data.length > 1 && self.data[1].length > 0)) {
        $tbody.find('tr.data-row').remove();
      }
      else {

      }

      var start = ((self.options.paging.currentPage - 1) * self.options.paging.currentSize) + 1;
      var length = self.options.paging.currentSize;
      if (self.data.length === 1) {
        var _data;
        var _total = [];
        var search = $search.val();
        if (search && search.length > 2)
          _data = self.filter(self.data[0], search);
        else
          _data = self.data[0];
        self._data = [];
        self._data[0] = _data.slice(0);
        _data = _data.slice(start - 1, (start - 1) + length);
        _data.forEach(function (point) {
          //we have a simple row
          var $tr = $$('<tr class="data-row" data-id="' + point.key + '"></tr>');
          _query.dimensions.forEach(function (d) {
            var dimensionkey = d.key || d;
            var $td = $$('<td class="value dimension"><a href="javascript:void(0);" class="filter">' + point.dimensions[dimensionkey] + '</a></td>');
            $td.find('.filter').on('click', function () {
              self.emit('select', point, dimensionkey);
            });
            $tr.append($td);
          });
          $tbody.append($tr);
          _query.metrics.forEach(function (m) {
            var metrickey = m.key || m;
            var $td = $$('<td class="value metric" data-key="' + metrickey + '" data-value="' + point.metrics[metrickey] + '">' + joola.common.formatMetric(point.metrics[metrickey], point.meta[metrickey]) + '' +
              '<span class="summary"></span>' +
              '</td>');
            $tr.append($td);
          });
        });
      }
      else if (self.data.length === 2) {
        var _comparequery = self.options.query[1];
        var base;
        var compare;
        base = self.data[0];
        compare = self.data[1];
        self._data = [];
        self._data[0] = self.data[0].slice(0);
        self._data[1] = self.data[1].slice(0);
        base = base.slice(start - 1, (start - 1) + length);
        var handled = [];
        base.forEach(function (point, index) {
          handled.push(point.key);
          var $tr = $$('<tr data-id="' + point.key + '"></tr>');
          _query.dimensions.forEach(function (d) {
            var dimensionkey = d.key || d;
            var $td = $$('<td class="value dimension"><a href="javascript:void(0);" class="filter">' + point.dimensions[dimensionkey] + '</a></td>');
            $td.find('.filter').on('click', function () {
              self.emit('select', point, dimensionkey);
            });
            $tr.append($td);
          });
          _query.metrics.forEach(function (m) {
            var $td = $$('<td class="value metric empty"></td>');
            $tr.append($td);
          });
          $tbody.append($tr);

          var text = joola.common.formatDate(_query.timeframe.start) + ' - ';
          text += joola.common.formatDate(_query.timeframe.end);
          $tr = $$('<tr data-id="' + point.key + '"></tr>');
          var $td = $$('<td class="value dimension" colspan="' + _query.dimensions.length + '">' + text + '</td>');
          $tr.append($td);

          $tbody.append($tr);
          _query.metrics.forEach(function (m) {
            var metrickey = m.key || m;
            var $td = $$('<td class="value metric" data-key="' + metrickey + '" data-value="' + point.metrics[metrickey] + '">' + joola.common.formatMetric(point.metrics[metrickey], point.meta[metrickey]) + '' +
              '<span class="summary"></span>' +
              '</td>');
            $tr.append($td);
          });

          var comparePoint = compare[index];
          var text = joola.common.formatDate(_comparequery.timeframe.start) + ' - ';
          text += joola.common.formatDate(_comparequery.timeframe.end);
          $tr = $$('<tr data-id="' + (comparePoint ? comparePoint.key : 'missing') + '"></tr>');
          $td = $$('<td class="value dimension" colspan="' + _query.dimensions.length + '">' + text + '</td>');
          $tr.append($td);

          $tbody.append($tr);
          _query.metrics.forEach(function (m) {
            var metrickey = m.key || m;
            var $td = $$('<td class="value metric compare" data-key="' + metrickey + '" data-value="' + (comparePoint ? comparePoint.metrics[metrickey] : 'N/A') + '">' + (comparePoint ? joola.common.formatMetric(comparePoint.metrics[metrickey], comparePoint.meta[metrickey]) : 'N/A') + '' +
              '<span class="summary"></span></td>');
            $tr.append($td);
          });

          $tr = $$('<tr data-id="' + point.key + '"></tr>');
          $td = $$('<td class="caption change" colspan="' + _query.dimensions.length + '">% Change</td>');
          $tr.append($td);

          _query.metrics.forEach(function (m) {
            var metrickey = m.key || m;
            var $td = $$('<td class="value change">' + (point && comparePoint ? joola.common.percentageChange(comparePoint.metrics[metrickey], point.metrics[metrickey]) : 'N/A') + '%</td>');
            $tr.append($td);
          });
          $tbody.append($tr);
        });

        compare.forEach(function (comparePoint, index) {
          if (handled.indexOf(comparePoint.key) === -1) {
            var $tr = $$('<tr data-id="' + comparePoint.key + '"></tr>');
            _query.dimensions.forEach(function (d) {
              var dimensionkey = d.key || d;
              var $td = $$('<td class="value dimension"><a href="javascript:void(0);" class="filter">' + comparePoint.dimensions[dimensionkey] + '</a></td>');
              $td.find('.filter').on('click', function () {
                self.emit('select', comparePoint, dimensionkey);
              });
              $tr.append($td);
            });
            _query.metrics.forEach(function (m) {
              var $td = $$('<td class="value metric empty"></td>');
              $tr.append($td);
            });
            $tbody.append($tr);

            var text = joola.common.formatDate(_query.timeframe.start) + ' - ';
            text += joola.common.formatDate(_query.timeframe.end);
            $tr = $$('<tr data-id="' + comparePoint.key + '"></tr>');
            var $td = $$('<td class="value dimension" colspan="' + _query.dimensions.length + '">' + text + '</td>');
            $tr.append($td);

            $tbody.append($tr);
            _query.metrics.forEach(function (m) {
              var metrickey = m.key || m;
              var $td = $$('<td class="value metric" data-key="' + metrickey + '" data-value="' + 'N/A' + '">' + 'N/A' + '' +
                '<span class="summary"></span>' +
                '</td>');
              $tr.append($td);
            });

            var text = joola.common.formatDate(_comparequery.timeframe.start) + ' - ';
            text += joola.common.formatDate(_comparequery.timeframe.end);
            $tr = $$('<tr data-id="' + (comparePoint ? comparePoint.key : 'missing') + '"></tr>');
            $td = $$('<td class="value dimension" colspan="' + _query.dimensions.length + '">' + text + '</td>');
            $tr.append($td);

            $tbody.append($tr);
            _query.metrics.forEach(function (m) {
              var metrickey = m.key || m;
              var $td = $$('<td class="value metric compare" data-key="' + metrickey + '" data-value="' + (comparePoint ? comparePoint.metrics[metrickey] : 'N/A') + '">' + (comparePoint ? joola.common.formatMetric(comparePoint.metrics[metrickey], comparePoint.meta[metrickey]) : 'N/A') + '' +
                '<span class="summary"></span></td>');
              $tr.append($td);
            });

            $tr = $$('<tr data-id="' + comparePoint.key + '"></tr>');
            $td = $$('<td class="caption change" colspan="' + _query.dimensions.length + '">% Change</td>');
            $tr.append($td);

            _query.metrics.forEach(function (m) {
              var metrickey = m.key || m;
              var $td = $$('<td class="value change">N/A</td>');
              $tr.append($td);
            });
            $tbody.append($tr);
          }
        });
      }

      this.summarize();
      self.handlePaging();
    };

    this.done = function () {
      self.paint();
    };

    this.handlePaging = function () {
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
        $prev.on('click', function () {
          if (self.options.paging.currentPage > 1) {
            self.options.paging.currentPage--;
            self.paint();
          }
        });
      }
      else {
        $prev.addClass('disabled');
        $prev.off('click');
      }
      var nextIndex = ((self.options.paging.currentPage ) * self.options.paging.currentSize) + 1;
      if (nextIndex < self._data[0].length) {
        $next.removeClass('disabled');
        $next.off('click');
        $next.on('click', function () {
          var nextIndex = ((self.options.paging.currentPage ) * self.options.paging.currentSize) + 1;
          if (nextIndex < self._data[0].length) {
            self.options.paging.currentPage++;
            self.paint();
          }
        });
      }
      else {
        $next.addClass('disabled');
        $next.off('click');
      }
    };

    this.sort = function () {

    };

    this.summarize = function () {
      Object.keys(self.summaries).forEach(function (key, mindex) {
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
          $summaries.each(function (index, summary) {
            var $summary = $$(summary);
            var value = $summary.attr('data-value');
            if (value === 'N/A') {
              $summary.find('span.summary').text(' (N/A)');
            }
            else {
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

    this.draw = function (options) {
      //we draw the template into the container
      var $html = $$(self.options.template);
      $$(self.options.container).html($html);
      if (self.options.caption)
        $$(self.options.container).find('.table-caption').text(self.options.caption);
      //visualization specific drawing
      var $thead = $$($html.find('thead'));
      var $head_tr = $$('<tr class="captions"></tr>');
      self.options.query[0].dimensions.forEach(function (d) {
        var $th = $$('<th class="caption dimension"></th>');
        $th.text(d.name || d.key || d);
        $head_tr.append($th);
      });
      self.options.query[0].metrics.forEach(function (m) {
        var $th = $$('<th class="caption metric"></th>');
        $th.text(m.name || m.key || m);
        $head_tr.append($th);
      });
      $thead.append($head_tr);
      $html.find('table').append($thead);

      var $tbody = $html.find('tbody');
      $tbody = $$($tbody);
      $tbody.empty();

      var $metric_tr = $$('<tr class="metricboxes"></tr>');
      self.options.query[0].dimensions.forEach(function (d) {
        var $td = $$('<td class="metricbox dimension"></td>');
        $metric_tr.append($td);
      });

      async.map(self.options.query[0].metrics, function (m, cb) {
        var $td = $$('<td class="metricbox metric"></td>');
        $metric_tr.append($td);
        var _query = ce.clone(self.options.query);
        _query.forEach(function (q) {
          q.dimensions = [];
          q.metrics = [m];
          if (!q.filter)
            q.filter = [];
          if (q.filter.length > 0) {
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
          //canvas: self.options.canvas,
          query: _query
        });
        self.summaries[m.key].on('done', function () {
          self.summarize();
          return cb(null);
        });
      }, function (err, results) {
      });
      $tbody.append($metric_tr);

      var $tr = $$('<tr class="data-row loading"></tr>');
      var $td = $$('<td class="loading" colspan="' + (self.options.query[0].dimensions.length + self.options.query[0].metrics.length) + '">' + self.options.strings.loading + '</td>');
      $tr.append($td);
      $tbody.append($tr);
      $html.find('table').append($tbody);

      var $pageSize = $$($html.find('.page-size select'));
      self.options.paging.sizes.forEach(function (size) {
        var $option = $$('<option value="' + size + '">' + size + '</option>');
        $pageSize.append($option);
      });
      $pageSize.on('change', function () {
        self.options.paging.currentPage = 1;
        self.options.paging.currentSize = parseInt($pageSize.val(), 10);
        self.paint();
      });

      var $search = $$($html.find('input.search'));
      $search.on('keyup', function () {
        if ($search.val().length > 2) {
          self.options.paging.currentPage = 1;
          self.paint();
        }
        else
          self.paint();
      });
    };

    if (options && options.query && !Array.isArray(options.query))
      options.query = [options.query];
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
  }
  ;

joola.events.on('core.init.finish', function () {
  var found;
  if (typeof (jQuery) != 'undefined') {
    $.fn.Table = function (options, callback) {
      if (!options)
        options = {force: false};
      else if (!options.hasOwnProperty('force'))
        options.force = true;
      var result = null;
      var uuid = this.attr('jio-uuid');
      if (!uuid || options.force) {
        if (options.force && uuid) {
          var existing = null;
          found = false;
          joola.viz.onscreen.forEach(function (viz) {
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
        result = new joola.viz.Table(options, function (err, table) {
          if (err)
            throw err;
        }).options.$container;
      }
      else {
        //return existing
        found = false;
        joola.viz.onscreen.forEach(function (viz) {
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