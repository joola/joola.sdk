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

  //mixin
  this._super = {};
  for (var x in require('./_proto')) {
    this[x] = require('./_proto')[x];
    this._super[x] = require('./_proto')[x];
  }

  this.type = 'metric';
  this.uuid = joola.common.uuid();
  this.initialized = false;
  this.data = [];
  this.options = {
    container: null,
    caption: '',
    template: '<div class="jio metricbox">' +
      '<div class="jio metricbox value"></div>' +
      '<div class="jio metricbox caption"></div>' +
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
    var metricname = data[0].meta[metrickey].name || _query.metrics[0].name || _query.metrics[0];

    var value = data[0].metrics[metrickey];
    $$(self.options.container).find('.value').html(value);
  };
  this.exit = function (data) {
    console.log('exit', data);
  };
  this.update = function (data) {
    //console.log('update', data);
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