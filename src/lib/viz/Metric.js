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

var Metric = module.exports = function (options, callback) {
  var self = this;

  this.type = 'metric';
  this.uuid = joola.common.uuid();
  this.initialized = false;
  this.data = [];
  this.options = {
    container: null,
    caption: '',
    template: '<div class="jio metricbox">' +
    '<div class="value"></div>' +
    '<div class="summary" style="display:none;">' +
    '<span class="base"></span>' +
    '<span class="sep">vs.</span>' +
    '<span class="compare"></span>' +
    '</div>' +
    '<div class="caption"></div>' +
    '</div>',
    query: null,
    strings: {
      loading: '---',
      nodata: '---'
    }
  };
  this.verify = function (options) {
    if (!self.options)
      return 'Failed to verify [options].';
    if (self.options.query) {
      if (!Array.isArray(self.options.query))
        self.options.query = [self.options.query];
      if (self.options.query[0].dimensions && self.options.query[0].dimensions.length > 0)
        return 'Please specify a single dimension.';
      if (self.options.query[0].metrics && (self.options.query[0].metrics.length === 0 || self.options.query[0].metrics.length > 1) || !self.options.query[0].metrics)
        return 'Please specify a single metric.';
    }
    return null;
  };

  this.enter = function (data, alldata) {
    var _query = self.options.query;
    if (Array.isArray(self.options.query))
      _query = _query[0];

    var metrickey = _query.metrics[0].key || _query.metrics[0];
    var metric = data[0].meta[metrickey];
    var metricname = metric.name || _query.metrics[0].name || _query.metrics[0];
    if (self.options.enter)
      self.options.enter.apply(self, [data, alldata]);

    if (data.length === 1) {
      $$(self.options.container).find('.summary').hide();
      var value = data[0].metrics[metrickey];
      $$(self.options.container).find('.value').html(joola.common.formatMetric(value, metric));
    }
    else {
      $$(self.options.container).find('.summary').show();
      var base = data[0].metrics[metrickey];
      var compare = null;
      var change = 0;
      if (!data[1].missing) {
        compare = data[1].metrics[metrickey];
        change = joola.common.percentageChange(compare, base) + '%';
      }
      else {
        change = 'N/A';
      }
      $$(self.options.container).find('.value').html(change);
      $$(self.options.container).find('.base').html(joola.common.formatMetric(base, metric));
      if (compare) {
        $$(self.options.container).find('.compare').html(joola.common.formatMetric(compare, metric));
      }
      else {
        $$(self.options.container).find('.compare').html('N/A');
      }
    }
  };

  this.exit = function (data) {
    $$(self.options.container).find('.value').html(self.options.strings.nodata);
  };

  this.update = function (data, alldata) {
    var _query = self.options.query;
    if (Array.isArray(self.options.query))
      _query = _query[0];

    var metrickey = _query.metrics[0].key || _query.metrics[0];
    var metric = data[0].meta[metrickey];
    var metricname = metric.name || _query.metrics[0].name || _query.metrics[0];

    if (self.options.update)
      self.options.update.apply(self, [data, alldata]);

    var value = data[0].metrics[metrickey];
    $$(self.options.container).find('.value').html(joola.common.formatMetric(value, metric));
  };

  this.destroy = function () {
    $$(self.options.container).empty();
  };

  this.draw = function (options) {
    //we draw the template into the container
    var $html = $$(self.options.template);
    $$(self.options.container).html($html);
    if (self.options.caption) {
      $html.find('.caption').html(self.options.caption);
    }
    $html.find('.value').html(self.options.strings.nodata);
    //visualization specific drawing
  };

  if (options && options.query && !Array.isArray(options.query))
    options.query = [options.query];
  //we call the core initialize option
  joola.viz.initialize(self, options || {});

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
    $.fn.Metric = function (options, callback) {
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
        result = new joola.viz.Metric(options, function (err, metric) {
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