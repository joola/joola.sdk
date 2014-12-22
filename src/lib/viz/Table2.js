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
      sizes: [10, 50, 100, 500, 1000],
      currentSize: 10
    },
    template: '<div class="table-caption"></div>' +
    '<div class="controls">' +
    ' <div class="primary-dimension-picker">Primary dimension picker</div>' +
    ' <div class="add-dimension-picker">Add dimension...</div>' +
    ' <div class="add-metric-picker">Add metric...</div>' +
    ' <div class="search-wrapper">' +
    '   <input type="text" placeholder="Search..."/>' +
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
    include_not_shown: true
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
    var _query = self.options.query;
    if (Array.isArray(self.options.query))
      _query = _query[0];

    var $table = $$($$(self.options.container).find('table')[0]);
    var $tbody = $$($table.find('tbody')[0]);
    var percentage, $tr;
    if ($tbody.find('tr.nodata').length > 0)
      $tbody.find('tr.nodata').remove();
    if ($tbody.find('tr.loading').length > 0)
      $tbody.find('tr.loading').remove();
    if (data.length === 1) {
      var point = data[0];
      //we have a simple row
      $tr = $$('<tr data-id="' + point.key + '"></tr>');
      _query.dimensions.forEach(function (d) {
        var dimensionkey = d.key || d;
        var $td = $$('<td class="value dimension">' + point.dimensions[dimensionkey] + '</td>');
        $tr.append($td);
      });
      $tbody.append($tr);
      _query.metrics.forEach(function (m) {
        var metrickey = m.key || m;
        var $td = $$('<td class="value metric">' + joola.common.formatMetric(point.metrics[metrickey], point.meta[metrickey]) + '</td>');
        $tr.append($td);
      });
    }
    self.handlePaging();
  }
  ;
  this.exit = function (data, alldata) {

  };
  this.update = function (data, alldata) {

  };

  this.destroy = function () {
    $$(self.options.container).find('table').empty();
  };

  this.handlePaging = function () {
    var page = 1;
    var pageSize = 10;

    var $showing = $$(self.options.$container.find('.showing'));

    var total = self.data[0].length;
    var to = page * pageSize;
    if (to > total)
      to = total;
    var showingText = ((page - 1) * 10 + 1) + ' - ' + to + ' of ' + total;
    $showing.text(showingText);
  };

  this.sort = function () {

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
    var $tr = $$('<tr class="loading"></tr>');
    var $td = $$('<td class="loading" colspan="' + (self.options.query[0].dimensions.length + self.options.query[0].metrics.length) + '">' + self.options.strings.loading + '</td>');
    $tr.append($td);
    $tbody.append($tr);
    $html.find('table').append($tbody);

    var $pageSize = $$($html.find('.page-size select'));
    self.options.paging.sizes.forEach(function (size) {
      var $option = $$('<option value="' + size + '">' + size + '</option>');
      $pageSize.append($option);
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
};

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