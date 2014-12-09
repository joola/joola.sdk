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
  d3 = require('d3'),
  $$ = require('jquery'),
  _ = require('underscore');

var BarTable = module.exports = function (options, callback) {
  var self = this;

  //mixin
  this._super = {};
  for (var x in require('./_proto')) {
    this[x] = require('./_proto')[x];
    this._super[x] = require('./_proto')[x];
  }

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
    legend: true,
    limit: 10,
    headers: false,
    include_not_shown: true
  };
  this.verify = function (options) {
    if (!self.options)
      return 'Failed to verify [options].';
    if (self.options.query) {
      if (self.options.dimensions.length === 0 || self.options.dimensions.length > 1)
        return 'Please specify a single dimension.';
      if (self.options.metrics.length === 0 || self.options.metrics.length > 1)
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
          $tr = $('<tr></tr>');
          percentage = parseFloat(notshown[0]) / total[0] * 100;
          if (percentage > 100)
            percentage = 100;
          Object.keys(point.metrics).forEach(function (m) {
            var $td = $('<td class="jio bartable value metric">' +
              '<div class="barwrapper">' +
              '<div class="tablebar" style="width:' + percentage + '%" title="' + notshown[0].commas() + ' ' + metricname + ' (' + percentage.toFixed(2) + '%)"></div>' +
              '</div>' +
              '</td>');
            $td.find('.tablebar').css({'background-color': self.options.colors[11]});
            $tr.append($td);
          });

          Object.keys(point.dimensions).forEach(function (d) {
            var $td = $$('<td class="jio bartable value dimension notshown">' +
              '<div class="caption"></div>' +
              '<div class="subcaption"></div>' +
              '</td>');

            $td.find('.caption').text(percentage.toFixed(2) + '% ' + (self.options.strings.not_shown || 'Not shown'));
            $td.find('.subcaption').text(notshown[0].commas() + ' ' + metricname);
            $tr.append($td);
          });

          $tbody.append($tr);
          return;
        }

        //we have a simple row
        $tr = $$('<tr></tr>');
        var index = 0;
        percentage = parseFloat(point.metrics[metrickey]) / total[index] * 100;
        _query.metrics.forEach(function (m) {
          var $td = $$('<td class="jio bartable value">' +
            '<div class="barwrapper">' +
            '<div class="tablebar" style="width:' + percentage + '%;background-color:' + self.options.colors[0] + '" title="' + point.metrics[metrickey].commas() + ' ' + metricname + ' (' + percentage.toFixed(2) + '%)"></div>' +
            '</div>' +
            '</td>');
          $tr.append($td);
        });

        _query.dimensions.forEach(function (d) {
          var dimensionkey = d.key||d;
          var title = point.meta[dimensionkey];
          if (title)
            title = title.title || title.name || title.key;
          else
            title = d.name || d.key;
          var $td = $$('<td class="jio bartable value dimension">' +
            '<div class="caption" title="' + title + '"></div>' +
            '<div class="subcaption"></div>' +
            '</td>');

          $td.find('.caption').text(joola.common.ensureLength(percentage.toFixed(2) + '% ' + point.dimensions[dimensionkey], 23));
          $td.find('.subcaption').text(point.metrics[metrickey].commas() + ' ' + metricname);
          $tr.append($td);
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
                  '<div class="tablebar" style="width:' + (joola.common.isNumeric(base_percentage) ? (base_percentage > 100 ? '100%' : base_percentage + '%') : 0) + ';background-color: ' + self.options.colors[0] + ';" title="' + base.metrics[metrickey].commas() + ' ' + metricname + ' (' + base_percentage.toFixed(2) + '%)"></div>' +
                  '<div style="clear:both"></div>' +
                  '<div class="tablebar compare_ratio" style="width:' + (joola.common.isNumeric(compare_percentage) ? (compare_percentage > 100 ? '100%' : compare_percentage + '%') : 0) + ';background-color: ' + self.options.offcolors[0] + '"  title="' + (compare.metrics && compare.metrics[metrickey] ? compare.metrics[metrickey].commas() : 'N/A') + ' ' + metricname + ' (' + (compare_percentage ? compare_percentage.toFixed(2) + '%' : 'N/A') + ')">&nbsp;</div>' +
                  '</div>' +
                  '</td>'
              )
              ;
            $tr.append($td);
          });

          Object.keys(base.dimensions).forEach(function (d) {
            var $td = $$('<td class="jio bartable value dimension notshown">' +
              '<div class="caption"></div>' +
              '<div class="subcaption"></div>' +
              '</td>');

            $td.find('.caption').text('N/A ' + (self.options.strings.not_shown || 'Not shown'));
            $td.find('.subcaption').text(notshown[0] + ' vs. ' + (compare.missing ? 'N/A' : notshown[1]));
            $tr.append($td);
          });

          $tbody.append($tr);
          return;
        }

        $tr = $$('<tr></tr>');
        if (compare.missing)
          percentage = null;
        else
          percentage = ((base.metrics[metrickey] - compare.metrics[metrickey]) / compare.metrics[metrickey] * 100);

        base_percentage = parseFloat(base.metrics[metrickey]) / total[0] * 100;
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
            '<div class="tablebar" style="width:' + (joola.common.isNumeric(base_percentage) ? (base_percentage > 100 ? '100%' : base_percentage + '%') : 0) + ';background-color: ' + self.options.colors[0] + ';" title="' + base.metrics[metrickey].commas() + ' ' + metricname + ' (' + base_percentage.toFixed(2) + '%)"></div>' +
            '<div style="clear:both"></div>' +
            '<div class="tablebar compare_ratio" style="width:' + (joola.common.isNumeric(compare_percentage) ? (compare_percentage > 100 ? '100%' : compare_percentage + '%') : 0) + ';background-color: ' + self.options.offcolors[0] + '" title="' + (compare.metrics && compare.metrics[metrickey] ? compare.metrics[metrickey].commas() : 'N/A') + ' ' + metricname + ' (' + (compare_percentage ? compare_percentage.toFixed(2) + '%' : 'N/A') + ')">&nbsp;</div>' +
            '</div>' +
            '</td>');
          $tr.append($td);
        });
        _query.dimensions.forEach(function (d) {
          var $td = $$('<td class="jio bartable value dimension">' +
            '<div class="caption" title="' + d.name + '"></div>' +
            '<div class="subcaption"></div>' +
            '</td>');

          var text;
          if (joola.common.isNumeric(percentage))
            text = joola.common.ensureLength(percentage.toFixed(2) + '% ' + base.dimensions[dimensionkey], 23);
          else
            text = joola.common.ensureLength('N/A ' + base.dimensions[dimensionkey], 23);
          $td.find('.caption').text(text);
          if (!compare.missing)
            $td.find('.subcaption').text(base.metrics[metrickey].commas() + ' vs. ' + compare.metrics[metrickey].commas());
          else
            $td.find('.subcaption').text(base.metrics[metrickey].commas() + ' vs. N/A');
          $tr.append($td);
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
    addRow(data, total, shown, notshown);
  };
  this.exit = function (data) {
    //console.log('exit', data);
  };
  this.update = function (data) {
    //console.log('update', data);
  };

  this.draw = function (options) {
    if (!options)
      options = {};
    var $html = $$(self.options.template);
    $$(self.options.container).html($html);
    if (self.options.caption)
      $$(self.options.container).find('.bartable-caption').text(self.options.caption);

    if (!self.data || (self.data && self.data.length === 0)) {
      var $tr;
      var $td;
      if (options.loading) {
        $tr = $$('<tr class="loading"></tr>');
        $td = $$('<td colspan="2" class="jio bartable loading">' +
          self.options.strings.loading +
          '</td>');
      }
      else {
        $tr = $$('<tr class="nodata"></tr>');
        $td = $$('<td colspan="2" class="jio bartable nodata">' +
          self.options.strings.nodata +
          '</td>');
      }
      $tr.append($td);
      $html.find('tbody').append($tr);
    }
  };

  this.destroy = function () {
    $$(self.options.container).find('table').empty();
  };

  if (options && options.query && !Array.isArray(options.query))
    options.query = [options.query];
  //we call the core initialize option
  joola.viz.initialize(self, options || {});

  if (self.options.colors.length === 0)
    self.options.colors = joola.colors;
  if (self.options.offcolors.length === 0)
    self.options.offcolors = joola.offcolors;

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
          bartable.draw(options, callback);
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