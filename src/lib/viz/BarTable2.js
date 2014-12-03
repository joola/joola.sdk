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
  $ = require('jquery'),
  _ = require('underscore');

var BarTable = module.exports = function (options, callback) {
  var self = this;

  this.type = 'bartable';
  this.uuid = joola.common.uuid();
  this.initialized = false;
  this.data = [];
  this.options = {
    container: null,
    template: '<div class="bartable-caption"></div>' +
    '<table class="jio bartable table">' +
    '<thead>' +
    '</thead>' +
    '<tbody>' +
    '</tbody>' +
    '</table>',
    query: null,
    strings: {
      nodata: 'No data available.',
      not_shown: 'Not shown'
    },
    legend: true,
    limit: 10,
    headers: true
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
    var metricname = _query.metrics[0].name || _query.metrics[0];
    var metrickey = _query.metrics[0].key || _query.metrics[0];

    function addRow(point, total, shown, notshown) {
      var $table = $($(self.options.container).find('table')[0]);
      var $tbody = $($table.find('tbody')[0]);
      var percentage, $tr;
      if (point.length === 1) {
        point = point[0];
        //we have a simple row
        $tr = $('<tr></tr>');
        var index = 0;
        percentage = parseFloat(point.metrics[metrickey]) / total[index] * 100;
        _query.metrics.forEach(function (m) {
          var $td = $('<td class="jio bartable value">' +
          '<div class="barwrapper">' +
          '<div class="tablebar" style="width:' + percentage + '%"></div>' +
          '</div>' +
          '</td>');
          $tr.append($td);
        });

        _query.dimensions.forEach(function (d) {
          var $td = $('<td class="jio bartable value dimension">' +
          '<div class="caption" title="Other"></div>' +
          '<div class="subcaption"></div>' +
          '</td>');

          $td.find('.caption').text(joola.common.ensureLength(percentage.toFixed(2) + '% ' + point.dimensions[dimensionkey], 23));
          $td.find('.subcaption').text(point.metrics[metrickey] + ' ' + metricname);
          $tr.append($td);
        });
        $tbody.append($tr);
      }
      else {
        //we have a comparison
        var base = point[0];
        var compare = point[1];
        //we have a simple row
        $tr = $('<tr></tr>');
        if (compare.missing)
          percentage = null;
        else
          percentage = ((compare.metrics[metrickey] - base.metrics[metrickey]) / base.metrics[metrickey] * 100);

        _query.metrics.forEach(function (m) {
          var $td = $('<td class="jio bartable value">' +
          '<div class="barwrapper">' +
          '<div class="tablebar" style="width:' + (percentage ? percentage + '%' : 'N/A') + '"></div>' +
          '</div>' +
          '</td>');
          $tr.append($td);
        });
        _query.dimensions.forEach(function (d) {
          var $td = $('<td class="jio bartable value dimension">' +
          '<div class="caption" title="Other"></div>' +
          '<div class="subcaption"></div>' +
          '</td>');

          var text;
          if (percentage)
            text = joola.common.ensureLength(percentage.toFixed(2) + '% ' + base.dimensions[dimensionkey], 23);
          else
            text = joola.common.ensureLength('N/A ' + base.dimensions[dimensionkey], 23);
          $td.find('.caption').text(text);
          if (!compare.missing)
            $td.find('.subcaption').text(base.metrics[metrickey] + ' vs. ' + compare.metrics[metrickey]);
          else
            $td.find('.subcaption').text(base.metrics[metrickey] + ' vs. N/A');
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

  this.render = function (data) {
    //console.log(data);
    var $container = $(self.options.container);
    var $table = $($container.find('table')[0]);
    var $tbody = $($table.find('tbody')[0]);
    if (data.length === 0) {
      var $tr = $('<tr></tr>');
      var $td = $('<td colspan="' + (self.options.query.dimensions.length + self.options.query.metrics.length + 1) + '" class="jio bartable nodata">' +
      self.options.strings.nodata +
      '</td>');
      $tr.append($td);
      $tbody.append($tr);
      return;
    }

    var total = 0;
    var shown = 0;
    var notshown = 0;
    var dimensionkey = self.options.query.dimensions[0].key || self.options.query.dimensions[0];
    var metricname = self.options.query.metrics[0].name || self.options.query.metrics[0];
    var metrickey = self.options.query.metrics[0].key || self.options.query.metrics[0];
    data.forEach(function (point, i) {
      total += point[metrickey];
      if (i < (self.options.limit && self.options.limit < data.length ? self.options.limit - 1 : self.options.limit ))
        shown += point[metrickey];
      else
        notshown += point[metrickey];
    });
    data.forEach(function (point, i) {
      if (i < (self.options.limit && self.options.limit < data.length ? self.options.limit - 1 : self.options.limit )) {
        var $tr = $('<tr></tr>');
        var index = 0;
        var percentage = parseFloat(point[metrickey]) / total * 100;
        self.options.query.metrics.forEach(function (m) {
          var $td = $('<td class="jio bartable value">' +
          '<div class="barwrapper">' +
          '<div class="tablebar" style="width:' + percentage + '%"></div>' +
          '</div>' +
          '</td>');
          $tr.append($td);
        });

        self.options.query.dimensions.forEach(function (d) {
          var $td = $('<td class="jio bartable value dimension">' +
          '<div class="caption" title="Other"></div>' +
          '<div class="subcaption"></div>' +
          '</td>');

          $td.find('.caption').text(joola.common.ensureLength(percentage.toFixed(2) + '% ' + point[dimensionkey], 23));
          $td.find('.subcaption').text(point[metrickey] + ' ' + metricname);
          $tr.append($td);
        });

        $tbody.append($tr);
      }
    });
    if (self.options.limit && self.options.limit < data.length) {
      var $tr = $('<tr></tr>');
      var index = 0;
      var percentage = parseFloat(notshown) / total * 100;
      self.options.query.metrics.forEach(function (m) {
        var $td = $('<td class="jio bartable value metric">' +
        '<div class="barwrapper">' +
        '<div class="tablebar" style="width:' + percentage + '%"></div>' +
        '</div>' +
        '</td>');
        $td.find('.tablebar').css({'background-color': joola.colors[11]});
        $tr.append($td);
      });

      self.options.query.dimensions.forEach(function (d) {
        var $td = $('<td class="jio bartable value dimension notshown">' +
        '<div class="caption" title="Other"></div>' +
        '<div class="subcaption"></div>' +
        '</td>');

        $td.find('.caption').text(percentage.toFixed(2) + '% ' + self.options.strings.not_shown || 'Not shown');
        $td.find('.subcaption').text(notshown + ' ' + self.options.query.metrics[0].name);
        $tr.append($td);
      });

      $tbody.append($tr);
    }
  };
  this.draw = function (options, callback) {
    return;
    //return joola.viz.initialize(self, options || {},callback);
  };

  if (options && options.query && !Array.isArray(options.query))
    options.query = [options.query];
  //we call the core initialize option
  joola.viz.initialize(self, options || {});
  //we draw the template into the container
  var $html = $(self.options.template);
  $(self.options.container).html($html);
  //visualization specific drawing
  if (self.options.headers) {
    var $thead = $($html.find('thead'));
    var $head_tr = $('<tr class="jio bartable captions"></tr>');
    self.options.query[0].metrics.forEach(function (m) {
      var $th = $('<th class="jio bartable caption metric"></th>');
      //$th.text(m.name || m.key || m);
      $head_tr.append($th);
    });
    self.options.query[0].dimensions.forEach(function (d) {
      var $th = $('<th class="jio bartable caption dimension"></th>');
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