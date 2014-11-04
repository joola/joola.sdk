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
  EventEmitter2 = require('eventemitter2').EventEmitter2,

  _ = require('underscore'),
  ce = require('cloneextend'),
  _events = new EventEmitter2({wildcard: true, newListener: true});

var Canvas = module.exports = function (options, callback) {
  if (!callback)
    callback = function () {
    };
  joola.events.emit('canvas.init.start');

  //mixin
  this._super = {};
  for (var x in require('./_proto')) {
    this[x] = require('./_proto')[x];
    this._super[x] = require('./_proto')[x];
  }
  for (var y in _events) {
    this[y] = _events[y];
    this._super[y] = _events[y];
  }

  var self = this;

  this._id = '_canvas';
  this.uuid = joola.common.uuid();
  this.options = {
    container: null,
    $container: null,
    visualizations: {},
    metrics: [],
    dimensions: [],
    state: {}
  };

  this.verify = function (options, callback) {
    return this._super.verify(options, callback);
  };

  this.prepareQuery = function (query) {
    var _query = ce.extend({}, query);
    if (self.options.query) {
      _query = joola.common.extend(self.options.query, _query);
    }
    if (self.options.dimensions && self.options.dimensions.length > 0 && query.dimensions && query.dimensions.length > 0) {
      _query.dimensions.forEach(function (dimension, i) {
        var key;
        if (typeof dimension === 'string')
          key = dimension;
        else if (typeof dimension === 'object')
          key = dimension.key;

        if (key) {
          var exist = _.find(self.options.dimensions, function (m) {
            return m.key === key;
          });
          if (exist)
            _query.dimensions[i] = exist;
        }
      });
    }
    if (self.options.metrics && self.options.metrics.length > 0 && query.metrics && query.metrics.length > 0) {
      _query.metrics.forEach(function (metric, i) {
        var key;
        if (typeof metric === 'string')
          key = metric;
        else if (typeof metric === 'object')
          key = metric.key;

        if (key) {
          var exist = _.find(self.options.metrics, function (m) {
            return m.key === key;
          });
          if (exist) 
            _query.metrics[i] = exist;
        }
      });
    }
    if (!query.timeframe && self.options.datepicker && self.options.datepicker.container) {
      var _datepicker = $(self.options.datepicker.container).DatePicker({}, function (err) {
        if (err)
          throw err;
      });
      _query.timeframe = {};
      _query.timeframe.start = _datepicker.base_fromdate;
      _query.timeframe.end = _datepicker.base_todate;
      _query.interval = 'day';
      if (self.options.datepicker && self.options.datepicker._interval)
        _query.interval = self.options.datepicker._interval;
    }
    return _query;
  };

  this.parseInterval = function ($container) {
    return $container.find('.active').attr('data-id');
  };

  this.draw = function (options, callback) {
    var self = this;
    if (self.options.onDraw)
      window[self.options.onDraw](self);
    if (self.options.datepicker && self.options.datepicker.container) {
      self.options.datepicker.canvas = self;
      $(self.options.datepicker.container).DatePicker(self.options.datepicker, function (err) {
        if (err)
          throw err;
      });
    }
    if (self.options.datepicker && self.options.datepicker.interval) {
      self.options.datepicker.$interval = $(self.options.datepicker.interval);
      self.options.datepicker._interval = self.parseInterval(self.options.datepicker.$interval);

      self.options.datepicker.$interval.on('change', function (e, data) {
        self.options.datepicker._interval = data.$container.attr('data-id');
        self.emit('intervalchange', data.dataId);

        self.options.datepicker.$interval.find('button').removeClass('active');
        data.$container.addClass('active');
      });
    }

    if (self.options.visualizations && self.options.visualizations) {
      Object.keys(self.options.visualizations).forEach(function (key) {
        var viz = self.options.visualizations[key];
        if (viz.container) {
          viz.query = self.prepareQuery(viz.query);
          viz.force = true;
          viz.canvas = self;
          switch (viz.type.toLowerCase()) {
            case 'timeline':
              $(viz.container).Timeline(viz);
              break;
            case 'metric':
              $(viz.container).Metric(viz);
              break;
            case 'table':
              $(viz.container).Table(viz);
              break;
            case 'minitable':
              $(viz.container).MiniTable(viz);
              break;
            case 'bartable':
              $(viz.container).BarTable(viz);
              break;
            case 'pie':
              $(viz.container).Pie(viz);
              break;
            case 'geo':
              $(viz.container).Geo(viz);
              break;
            default:
              break;
          }
        }
      });
    }

    if (typeof callback === 'function') {
      return callback(null, self);
    }
  };

  this.addVisualization = function (viz) {
    if (!this.options.visualizations)
      this.options.visualizations = {};
    this.options.visualizations[viz.uuid] = viz;
  };

  //here we go
  joola.common.mixin(self.options, options, true);
  self.verify(self.options, function (err) {
    if (err) {
      return callback(err);
    }

    self.options.$container = $(self.options.container);
    self.markContainer(self.options.$container, {
      attr: [
        {'type': 'canvas'},
        {'uuid': self.uuid},
        {css: self.options.css}
      ],
      css: self.options.css
    }, function (err) {
      if (err) {
        return callback(err);
      }

      joola.viz.onscreen.push(self);
      joola.events.emit('canvas.init.finish', self);
      if (typeof callback === 'function') {
        return callback(null, self);
      }
    });
  });

  return self;
};

joola.events.on('core.init.finish', function () {
  if (typeof (jQuery) != 'undefined') {
    $.fn.Canvas = function (options, callback) {
      if (!options)
        options = {force: false};
      else if (!options.hasOwnProperty('force'))
        options.force = true;
      var result = null;
      var uuid = this.attr('jio-uuid');
      if (!uuid || options.force) {
        //create new
        if (!options)
          options = {};
        options.container = this.get(0);
        result = new joola.viz.Canvas(options, function (err, canvas) {
          if (err)
            throw new Error('Failed to initialize canvas.', err);
          canvas.draw(options, callback);
        }).options.$container;
      }
      else {
        //return existing
        var found = false;
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