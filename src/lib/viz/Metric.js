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
  ce = require('cloneextend'),
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
        return 'Please don\'t specify a dimension.';
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

    var value, $$summary, total;
    if (data.length === 1) {
      if (self.options.query[0].filter && self.options.query[0].filter.length > 0)
        $$(self.options.container).find('.summary').show();
      value = data[0].metrics[metrickey];
      $$(self.options.container).find('.value').html(joola.common.formatMetric(value, metric));
      $$summary = $$($$(self.options.container).find('.summary'));
      total = data[0].metrics[metrickey];
      if (metric.aggregation === 'sum')
        $$summary.html('% of total: 100% (' + joola.common.formatMetric(total, metric) + ')');
      else if (metric.aggregation === 'avg')
        $$summary.html('Overall avg: ' + joola.common.formatMetric(total, metric) + ' (0%)');
    }
    else if (data.length === 2 && data[1].type === 'overall') {
      $$(self.options.container).find('.summary').show();
      if (!data[0].missing)
        value = data[0].metrics[metrickey];
      else
        value = 0;
      $$(self.options.container).find('.value').html(joola.common.formatMetric(value, metric));
      $$summary = $$($$(self.options.container).find('.summary'));
      if (data[1].type === 'overall') {
        total = data[1].metrics[metrickey];
        var percentage;
        if (metric.aggregation === 'sum') {
          percentage = (value / total * 100).toFixed() + '%';
          $$summary.html('% of total: ' + percentage + ' (' + joola.common.formatMetric(total, metric) + ')');
        }
        else if (metric.aggregation === 'avg') {
          percentage = joola.common.percentageChange(total, value);
          $$summary.html('Overall avg: ' + joola.common.formatMetric(total, metric) + ' (' + percentage + '%)');
        }
        self.options.query.splice(1, 1);
      }
    }
    else {
      $$(self.options.container).find('.summary').show();
      var base, compare, change = 0;
      if (!data[0].missing)
        base = data[0].metrics[metrickey];
      if (!data[1].missing)
        compare = data[1].metrics[metrickey];
      if (base && compare)
        change = joola.common.percentageChange(compare, base) + '%';
      else
        change = 'N/A';

      $$summary = $$($$(self.options.container).find('.summary'));
      $$summary.html('<span class="base"></span>' +
      '<span class="sep">vs.</span>' +
      '<span class="compare"></span>');
      $$(self.options.container).find('.value').html(change);
      $$(self.options.container).find('.base').html(base ? joola.common.formatMetric(base, metric) : 'N/A');

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

  this.done = function () {
    self.emit('done');
  };

  this.destroy = function () {
    joola.viz.stop(self);
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
    //if we have a filter, let's add a query for the overall
    if (self.options.query.length === 1) {
      var q = self.options.query[0];
      if (!q.filter)
        q.filter = [];
      if (q.filter.length > 0) {
        var _q = ce.clone(q);
        _q.filter = [];
        _q.type = 'overall';
        self.options.query.push(_q);
      }
    }
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

util.inherits(Metric, events.EventEmitter);