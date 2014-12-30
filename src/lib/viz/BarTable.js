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
  events = require('events'),
  util = require('util'),

  joola = require('../index'),
  $$ = require('jquery'),
  _ = require('underscore');

var BarTable = module.exports = function (options, callback) {
  var self = this;

  //mixin
  this.type = 'bartable';
  this.uuid = joola.common.uuid();
  this.initialized = false;
  this.data = [];
  this.options = {
    container: null,
    colors: [],
    offcolors: [],
    template: '<div class="bartable-caption"></div>' +
      '<table class="jio bartable table">' +
      '<thead>' +
      '</thead>' +
      '<tbody>' +
      '</tbody>' +
      '</table>',
    query: null,
    strings: {
      loading: 'No data available.',
      nodata: 'No data available.',
      not_shown: 'Not shown'
    },
    limit: 10,
    headers: false,
    include_not_shown: true,
    allowSelect: true
  };
  this.verify = function (options) {
    if (!self.options)
      return 'Failed to verify [options].';
    if (self.options.query) {
      if (!Array.isArray(self.options.query))
        self.options.query = [self.options.query];
      if (self.options.query[0].dimensions.length === 0 || self.options.query[0].dimensions.length > 1)
        return 'Please specify a single dimension.';
      if (self.options.query[0].metrics.length === 0 || self.options.query[0].metrics.length > 1)
        return 'Please specify a single metric.';
    }
    return null;
  };

  this.enter = function (data, alldata) {
    var _query = self.options.query;
    if (Array.isArray(self.options.query))
      _query = _query[0];
    var dimensionkey = _query.dimensions[0].key || _query.dimensions[0];
    var metrickey = _query.metrics[0].key || _query.metrics[0];
    var metricname = data[0].meta[metrickey].name || _query.metrics[0].name || _query.metrics[0];

    function addRow(point, total, shown, notshown) {
      var $table = $$($$(self.options.container).find('table')[0]);
      var $tbody = $$($table.find('tbody')[0]);
      var percentage, $tr;
      if ($tbody.find('tr.nodata').length > 0)
        $tbody.find('tr.nodata').remove();
      if ($tbody.find('tr.loading').length > 0)
        $tbody.find('tr.loading').remove();
      if (point.length === 1) {
        point = point[0];
        if ($tbody.find('tr').length >= self.options.limit) {
          if ($tbody.find('td.notshown').length > 0 || !self.options.include_not_shown)
            return;

          percentage = parseFloat(notshown[0]) / total[0] * 100;
          if (percentage > 100)
            percentage = 100;
          $tr = $$('<tr data-id="other" data-value="' + notshown[0] + '" data-name="' + self.options.strings.not_shown + '" data-value-sort="' + percentage + '"></tr>');
          Object.keys(point.metrics).forEach(function (m) {
            var $td = $$('<td class="jio bartable value metric">' +
              '<div class="barwrapper">' +
              '<div class="tablebar" style="width:' + percentage + '%" title="' + joola.common.formatMetric(notshown[0], data[0].meta[metrickey]) + ' ' + metricname + ' (' + percentage.toFixed(2) + '%)"></div>' +
              '</div>' +
              '</td>');
            $td.find('.tablebar').css({'background-color': self.options.colors[11]});
            $tr.append($td);
          });

          Object.keys(point.dimensions).forEach(function (d) {
            var dimensionkey = d.key || d;
            var title = point.meta[dimensionkey];
            if (title)
              title = title.title || title.name || title.key;
            else
              title = d.name || d.key;
            var $td = $$('<td class="jio bartable value dimension notshown">' +
              '<div class="caption" title="' + title + '"></div>' +
              '<div class="subcaption"></div>' +
              '</td>');

            $td.find('.caption').text(percentage.toFixed(2) + '% ' + (self.options.strings.not_shown || 'Not shown'));
            $td.find('.subcaption').text(joola.common.formatMetric(notshown[0], point.meta[metrickey]) + ' ' + metricname);
            $tr.append($td);
          });

          $tbody.append($tr);
          return;
        }

        //we have a simple row
        var index = 0;
        percentage = parseFloat(point.metrics[metrickey]) / total[index] * 100;
        $tr = $$('<tr data-id="' + point.key + '" data-value="' + point.metrics[metrickey] + '" data-name="' + point.dimensions[dimensionkey] + '" data-value-sort="' + percentage + '" data-selectable="' + (self.options.allowSelect !== false ) + '"></tr>');

        //should we mark this row as active?
        if (self.options.canvas && self.options.canvas.options.filters.length > 0) {
          self.options.canvas.options.filters.forEach(function (filter) {
            if (filter.key === point.key)
              $tr.addClass('active');
          });
        }

        _query.metrics.forEach(function (m) {
          var $td = $$('<td class="jio bartable value">' +
            '<div class="barwrapper">' +
            '<div class="tablebar" style="width:' + percentage + '%;background-color:' + self.options.colors[0] + '" title="' + joola.common.formatMetric(point.metrics[metrickey], point.meta[metrickey]) + ' ' + metricname + ' (' + percentage.toFixed(2) + '%)"></div>' +
            '</div>' +
            '</td>');
          $tr.append($td);
          if (self.options.allowSelect) {
            $td.on('click', function () {
              if ($tr.hasClass('active'))
                $tr.removeClass('active');
              else
                $tr.addClass('active');
              self.emit('select', [point]);
              if (self.options.select)
                self.options.select.apply(this, [point]);
            });
          }
        });

        _query.dimensions.forEach(function (d) {
          var dimensionkey = d.key || d;
          var title = point.meta[dimensionkey];
          if (title)
            title = title.title || title.name || title.key;
          else
            title = d.name || d.key;
          var $td = $$('<td class="jio bartable value dimension">' +
            '<div class="caption" title="' + title + '"></div>' +
            '<div class="subcaption"></div>' +
            '</td>');

          $td.find('.caption').text(joola.common.ensureLength(percentage.toFixed(2) + '% ' + (point.dimensions[dimensionkey] || '(not set)'), 23));
          $td.find('.subcaption').text(joola.common.formatMetric(point.metrics[metrickey], point.meta[metrickey]) + ' ' + metricname);
          $tr.append($td);
          if (self.options.allowSelect) {
            $td.on('click', function () {
              if ($tr.hasClass('active'))
                $tr.removeClass('active');
              else
                $tr.addClass('active');
              console.log('emit');
              self.emit('select', [point]);
              if (self.options.select)
                self.options.select.apply(this, [point]);
            });
          }
        });
        $tbody.append($tr);
      }
      else {
        //we have a comparison
        var base = point[0];
        var compare = point[1];

        var base_percentage, compare_percentage;

        if ($tbody.find('tr').length >= self.options.limit) {
          if ($tbody.find('td.notshown').length > 0 || !self.options.include_not_shown)
            return;
          $tr = $$('<tr></tr>');
          base_percentage = parseFloat(notshown[0]) / total[0] * 100;
          if (base_percentage > 100)
            base_percentage = 100;
          compare_percentage = parseFloat(notshown[1]) / total[1] * 100;
          if (compare_percentage > 100)
            compare_percentage = 100;
          Object.keys(base.metrics).forEach(function (m) {
            var $td = $$('<td class="jio bartable value">' +
                  '<div class="barwrapper compare">' +
                  '<div class="tablebar" style="width:' + (joola.common.isNumeric(base_percentage) ? (base_percentage > 100 ? '100%' : base_percentage + '%') : 0) + ';background-color: ' + self.options.colors[0] + ';" title="' + joola.common.formatMetric(base.metrics[metrickey], base.meta[metrickey]) + ' ' + metricname + ' (' + base_percentage.toFixed(2) + '%)"></div>' +
                  '<div style="clear:both"></div>' +
                  '<div class="tablebar compare_ratio" style="width:' + (joola.common.isNumeric(compare_percentage) ? (compare_percentage > 100 ? '100%' : compare_percentage + '%') : 0) + ';background-color: ' + self.options.offcolors[0] + '"  title="' + (compare.metrics && compare.metrics[metrickey] ? joola.common.formatMetric(compare.metrics[metrickey], compare.meta[metrickey]) : 'N/A') + ' ' + metricname + ' (' + (compare_percentage ? compare_percentage.toFixed(2) + '%' : 'N/A') + ')">&nbsp;</div>' +
                  '</div>' +
                  '</td>'
              )
              ;
            $tr.append($td);
          });

          Object.keys(base.dimensions).forEach(function (d) {
            var dimensionkey = d.key || d;
            var title = base.meta[dimensionkey];
            if (title)
              title = title.title || title.name || title.key;
            else
              title = d.name || d.key;
            var $td = $$('<td class="jio bartable value dimension notshown">' +
              '<div class="caption" title="' + title + '"></div>' +
              '<div class="subcaption"></div>' +
              '</td>');

            $td.find('.caption').text('N/A ' + (self.options.strings.not_shown || 'Not shown'));
            $td.find('.subcaption').text(joola.common.formatMetric(notshown[0], base.meta[metrickey]) + ' vs. ' + (compare.missing ? 'N/A' : joola.common.formatMetric(notshown[1], beta.meta[metrickey])));
            $tr.append($td);
          });

          $tbody.append($tr);
          return;
        }

        if (base.missing || compare.missing)
          percentage = null;
        else
          percentage = ((base.metrics[metrickey] - compare.metrics[metrickey]) / compare.metrics[metrickey] * 100);

        if (!base.missing)
          $tr = $$('<tr data-id="' + base.key + '" data-value="' + base.metrics[metrickey] + '" data-name="' + base.dimensions[dimensionkey] + '" data-value-sort="' + percentage + '" data-selectable="' + (self.options.allowSelect !== false ) + '"></tr>');
        else
          $tr = $$('<tr data-id="' + compare.key + '" data-value="' + compare.metrics[metrickey] + '" data-name="' + compare.dimensions[dimensionkey] + '" data-value-sort="' + percentage + '" data-selectable="' + (self.options.allowSelect !== false ) + '"></tr>');
        //should we mark this row as active?
        if (self.options.canvas && self.options.canvas.options.filters.length > 0) {
          self.options.canvas.options.filters.forEach(function (filter) {
            if (filter.key === base.key)
              $tr.addClass('active');
          });
        }
        if (!base.missing)
          base_percentage = parseFloat(base.metrics[metrickey]) / total[0] * 100;
        else
          base_percentage = null;
        if (base_percentage > 100)
          base_percentage = 100;
        if (!compare.missing) {
          compare_percentage = parseFloat(compare.metrics[metrickey]) / total[1] * 100;
          if (compare_percentage > 100) {
            compare_percentage = 100;
          }
        }
        else
          compare_percentage = null;
        _query.metrics.forEach(function (m) {
          var $td = $$('<td class="jio bartable value">' +
                '<div class="barwrapper compare">' +
                '<div class="tablebar" style="width:' + (joola.common.isNumeric(base_percentage) ? (base_percentage > 100 ? '100%' : base_percentage + '%') : 0) + ';background-color: ' + self.options.colors[0] + ';" title="' + (!base.missing ? joola.common.formatMetric(base.metrics[metrickey], base.meta[metrickey]) : 'N/A') + ' ' + metricname + ' (' + (base_percentage ? base_percentage.toFixed(2) + '%' : 'N/A') + ')"></div>' +
                '<div style="clear:both"></div>' +
                '<div class="tablebar compare_ratio" style="width:' + (joola.common.isNumeric(compare_percentage) ? (compare_percentage > 100 ? '100%' : compare_percentage + '%') : 0) + ';background-color: ' + self.options.offcolors[0] + '" title="' + (compare.metrics && compare.metrics[metrickey] ? joola.common.formatMetric(compare.metrics[metrickey], compare.meta[metrickey]) : 'N/A') + ' ' + metricname + ' (' + (compare_percentage ? compare_percentage.toFixed(2) + '%' : 'N/A') + ')">&nbsp;</div>' +
                '</div>' +
                '</td>'
            )
            ;
          $tr.append($td);
          if (self.options.allowSelect) {
            $td.on('click', function () {
              if ($tr.hasClass('active'))
                $tr.removeClass('active');
              else
                $tr.addClass('active');
              self.emit('select', [base, compare]);
              if (self.options.select)
                self.options.select.apply(this, [base, compare]);
            });
          }
        });
        _query.dimensions.forEach(function (d) {
          var dimensionkey = d.key || d;
          var title = base.meta[dimensionkey];
          if (title)
            title = title.title || title.name || title.key;
          else
            title = d.name || d.key;
          var $td = $$('<td class="jio bartable value dimension">' +
            '<div class="caption" title="' + title + '"></div>' +
            '<div class="subcaption"></div>' +
            '</td>');

          var text;
          if (joola.common.isNumeric(percentage))
            text = joola.common.ensureLength(percentage.toFixed(2) + '% ' + (!base.missing ? base.dimensions[dimensionkey] : (compare.dimensions[dimensionkey] || '(not set)')), 23);
          else
            text = joola.common.ensureLength('N/A ' + (!base.missing ? base.dimensions[dimensionkey] : (compare.dimensions[dimensionkey] || '(not set)')), 23);
          $td.find('.caption').text(text);
          if (!base.missing && !compare.missing)
            $td.find('.subcaption').text(joola.common.formatMetric(base.metrics[metrickey], base.meta[metrickey]) + ' vs. ' + joola.common.formatMetric(compare.metrics[metrickey], compare.meta[metrickey]));
          else if (base.missing)
            $td.find('.subcaption').text('N/A vs. ' + joola.common.formatMetric(compare.metrics[metrickey], compare.meta[metrickey]));
          else if (compare.missing)
            $td.find('.subcaption').text(joola.common.formatMetric(base.metrics[metrickey], base.meta[metrickey]) + ' vs. N/A');
          $tr.append($td);
          if (self.options.allowSelect) {
            $td.on('click', function () {
              if ($tr.hasClass('active'))
                $tr.removeClass('active');
              else
                $tr.addClass('active');
              self.emit('select', [base, compare]);
              if (self.options.select)
                self.options.select.apply(this, [base, compare]);
            });
          }
        });
        $tbody.append($tr);
      }
    }

    var total = [0, 0];
    var shown = [0, 0];
    var notshown = [0, 0];

    data.forEach(function (point, index) {
      alldata[index].forEach(function (point, i) {
        total[index] += point.metrics[metrickey];
        if (i < (self.options.limit && self.options.limit < data.length ? self.options.limit - 1 : self.options.limit ))
          shown[index] += point.metrics[metrickey];
        else
          notshown[index] += point.metrics[metrickey];
      });
    });
    if (!self.options.include_not_shown) {
      total = shown;
      notshown = [0, 0];
    }
    addRow(data, total, shown, notshown);
    //self.sort();
  };
  this.exit = function (data, alldata) {
    var _query = self.options.query;
    if (Array.isArray(self.options.query))
      _query = _query[0];
    var dimensionkey = _query.dimensions[0].key || _query.dimensions[0];
    var metrickey = _query.metrics[0].key || _query.metrics[0];
    var metricname = data[0].meta[metrickey].name || _query.metrics[0].name || _query.metrics[0];

    var total = [0, 0];
    var shown = [0, 0];
    var notshown = [0, 0];

    data.forEach(function (point, index) {
      alldata[index].forEach(function (point, i) {
        total[index] += point.metrics[metrickey];
        if (i < (self.options.limit && self.options.limit < data.length ? self.options.limit - 1 : self.options.limit ))
          shown[index] += point.metrics[metrickey];
        else
          notshown[index] += point.metrics[metrickey];
      });
    });
    if (!self.options.include_not_shown) {
      total = shown;
      notshown = [0, 0];
    }

    if (data.length === 1) {
      var point = data[0];
      var found = false;
      $$(self.options.container).find('tr').each(function (index, elem) {
        //var elem = $$(self.options.container).find('[data-id="' + point.key + '"]')[0];
        var $elem = $$(elem);
        var percentage, text;
        var name = $elem.attr('data-name');
        var value = parseFloat($elem.attr('data-value'));
        if ($elem.attr('data-id') === point.key) {
          $elem.remove();
        }
        else if ($elem.attr('data-id') === 'other') {
          value = notshown[0];
          $elem.attr('data-value', value);
        }
        percentage = parseFloat(value / total[0] * 100);
        $elem.attr('data-value-sort', percentage);

        if (joola.common.isNumeric(percentage))
          text = joola.common.ensureLength(percentage.toFixed(2) + '% ' + (name || '(not set)'), 23);
        else
          text = joola.common.ensureLength('N/A ' + (name || '(not set)'), 23);
        $elem.find('.tablebar').css('width', (joola.common.isNumeric(percentage) ? (percentage > 100 ? '100%' : percentage + '%') : 0));
        if ($elem.attr('data-id') === 'other')
          $elem.find('.caption').text(percentage.toFixed(2) + '% ' + (self.options.strings.not_shown || 'Not shown'));
        else
          $elem.find('.caption').text(text);
        $elem.find('.subcaption').text(joola.common.formatMetric(value, point.meta[metrickey]) + ' ' + metricname);
      });
    }
    self.sort();
    if (self.data[0].length === 0) {
      var $tbody = $$(self.options.container).find('tbody');
      $tbody = $$($tbody);
      $tbody.empty();
      var $tr = $$('<tr class="nodata"></tr>');
      var $td = $$('<td colspan="2">' + self.options.strings.nodata + '</td>');
      $tr.append($td);
      $tbody.append($tr);
    }
  };
  this.update = function (data, alldata) {
    var _query = self.options.query;
    if (Array.isArray(self.options.query))
      _query = _query[0];
    var dimensionkey = _query.dimensions[0].key || _query.dimensions[0];
    var metrickey = _query.metrics[0].key || _query.metrics[0];
    var metricname = data[0].meta[metrickey].name || _query.metrics[0].name || _query.metrics[0];

    var total = [0, 0];
    var shown = [0, 0];
    var notshown = [0, 0];

    data.forEach(function (point, index) {
      alldata[index].forEach(function (point, i) {
        total[index] += point.metrics[metrickey];
        if (i < (self.options.limit && self.options.limit < data.length ? self.options.limit - 1 : self.options.limit ))
          shown[index] += point.metrics[metrickey];
        else
          notshown[index] += point.metrics[metrickey];
      });
    });
    if (!self.options.include_not_shown) {
      total = shown;
      notshown = [0, 0];
    }

    if (data.length === 1) {
      var point = data[0];
      $$(self.options.container).find('tr').each(function (index, elem) {
        //var elem = $$(self.options.container).find('[data-id="' + point.key + '"]')[0];
        var $elem = $$(elem);
        var percentage, text;
        var name = $elem.attr('data-name');
        var value = parseFloat($elem.attr('data-value'));
        if ($elem.attr('data-id') === point.key) {
          value = point.metrics[metrickey];
          $elem.attr('data-value', value);
        }
        else if ($elem.attr('data-id') === 'other') {
          value = notshown[0];
          $elem.attr('data-value', value);
        }
        percentage = parseFloat(value / total[0] * 100);
        $elem.attr('data-value-sort', percentage);

        if (joola.common.isNumeric(percentage))
          text = joola.common.ensureLength(percentage.toFixed(2) + '% ' + (name || '(not set)'), 23);
        else
          text = joola.common.ensureLength('N/A ' + (name || '(not set)'), 23);
        $elem.find('.tablebar').css('width', (joola.common.isNumeric(percentage) ? (percentage > 100 ? '100%' : percentage + '%') : 0));
        if ($elem.attr('data-id') === 'other')
          $elem.find('.caption').text(percentage.toFixed(2) + '% ' + (self.options.strings.not_shown || 'Not shown'));
        else
          $elem.find('.caption').text(text);
        $elem.find('.subcaption').text(joola.common.formatMetric(value, point.meta[metrickey]) + ' ' + metricname);
      });
    }
    self.sort();
    if (self.data.length === 0) {
      var $tbody = $$(self.options.container).find('tbody');
      $tbody = $$($tbody);
      $tbody.empty();
      var $tr = $('<tr class="nodata"></tr>');
      var $td = $('<td colspan="2">' + self.options.strings.nodata + '</td>');
      $tr.append($td);
      $tbody.append($tr);
    }
  };

  this.destroy = function () {
    joola.viz.stop(self);
    $$(self.options.container).find('table').empty();
  };

  this.sort = function () {
    var $tbody = $$($$(self.options.container).find('tbody')[0]);
    var $rows = $tbody.find('tr');
    for (var i = 0; i < $rows.length - 1; i++) {
      for (var j = 0; j < $rows.length - (i + 1); j++) {
        var $row = $$($rows[j]);
        var value = $row.attr('data-value-sort');
        var $nextrow = $$($rows[j + 1]);
        var nextvalue = $nextrow.attr('data-value-sort');

        if ($nextrow.attr('data-name') !== self.options.strings.not_shown) {
          if (parseFloat(nextvalue) > parseFloat(value))
            $row.before($nextrow);
        }
      }
    }
  };

  this.draw = function (options) {
    //we draw the template into the container
    var $html = $$(self.options.template);
    $$(self.options.container).html($html);
    if (self.options.caption)
      $$(self.options.container).find('.bartable-caption').text(self.options.caption);
    //visualization specific drawing
    if (self.options.headers) {
      var $thead = $$($html.find('thead'));
      var $head_tr = $$('<tr class="jio bartable captions"></tr>');
      self.options.query[0].metrics.forEach(function (m) {
        var $th = $$('<th class="jio bartable caption metric"></th>');
        //$th.text(m.name || m.key || m);
        $head_tr.append($th);
      });
      self.options.query[0].dimensions.forEach(function (d) {
        var $th = $$('<th class="jio bartable caption dimension"></th>');
        $th.text(d.name || d.key || d);
        $head_tr.append($th);
      });

      $thead.append($head_tr);
      $html.find('table').append($thead);
    }
    var $tbody = $html.find('tbody');
    $tbody = $$($tbody);
    $tbody.empty();
    var $tr = $$('<tr class="loading"></tr>');
    var $td = $$('<td class="loading" colspan="2">' + self.options.strings.loading + '</td>');
    $tr.append($td);
    $tbody.append($tr);
    $html.find('table').append($tbody);
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
};

joola.events.on('core.init.finish', function () {
  var found;
  if (typeof (jQuery) != 'undefined') {
    $.fn.BarTable = function (options, callback) {
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
        result = new joola.viz.BarTable(options, function (err, bartable) {
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

util.inherits(BarTable, events.EventEmitter);