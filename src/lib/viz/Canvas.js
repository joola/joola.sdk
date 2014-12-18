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
  $$ = require('jquery');
  
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
  _events = new EventEmitter2({wildcard: true, newListener: true});
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

  this.prepareQuery = function (query, dates) {
    if (!dates)
      dates = {};
    var _query = ce.extend({}, query);
    if (self.options.query) {
      _query = joola.common.extend(self.options.query, _query);
    }
    if (!Array.isArray(_query))
      _query = [_query];
    if (_query[0].dimensions && _query[0].dimensions.length > 0 && _query[0].dimensions && _query[0].dimensions.length > 0) {
      _query[0].dimensions.forEach(function (dimension, i) {
        var key;
        if (typeof dimension === 'string')
          key = dimension;
        else if (typeof dimension === 'object')
          key = dimension.key;

        if (key) {
          var exist = _.find(_query[0].dimensions, function (m) {
            return m.key === key;
          });
          if (exist)
            _query[0].dimensions[i] = exist;
        }
      });
    }

    if (_query[0].metrics && _query[0].metrics.length > 0 && _query[0].metrics && _query[0].metrics.length > 0) {
      _query[0].metrics.forEach(function (metric, i) {
        var key;
        if (typeof metric === 'string')
          key = metric;
        //else if (typeof metric === 'object')
        //  key = metric.key;

        if (key) {
          var exist = _.find(self.options.metrics, function (m) {
            return m.key === key;
          });
          if (exist)
            _query[0].metrics[i] = exist;
        }
      });
    }
    _query[0].type = 'base';
    _query[0].hash = '';
    if (_query[0].dimensions && Array.isArray(_query[0].dimensions)) {
      _query[0].dimensions.forEach(function (d) {
        _query[0].hash += d.key || d;
      });
    }
    if (_query[0].metrics && Array.isArray(_query[0].metrics))
      _query[0].metrics.forEach(function (m) {
        _query[0].hash += m.key || m;
      });
    _query[0].hash = joola.common.hash(_query[0].hash);
    if (self.options.datepicker && self.options.datepicker.container) {
      dates = {
        base_fromdate: self.options.$datepicker.base_fromdate,
        base_todate: self.options.$datepicker.base_todate,
        compare_fromdate: self.options.$datepicker.compare_fromdate,
        compare_todate: self.options.$datepicker.compare_todate
      };
      _query[0].timeframe = {};
      _query[0].timeframe.start = dates.base_fromdate || self._datepicker.base_fromdate;
      _query[0].timeframe.end = dates.base_todate || self._datepicker.base_todate;
      _query[0].interval = 'day';
      if (self.options.datepicker && self.options.datepicker._interval)
        _query[0].interval = self.options.datepicker._interval;
    }
    if (self._datepicker.comparePeriod) {
      var cquery = ce.clone(_query[0]);
      cquery.type = 'compare';
      cquery.timeframe = {};
      cquery.timeframe.start = dates.compare_fromdate || self._datepicker.compare_fromdate;
      cquery.timeframe.end = dates.compare_todate || self._datepicker.compare_todate;
      cquery.interval = 'day';
      if (self.options.datepicker && self.options.datepicker._interval)
        cquery.interval = self.options.datepicker._interval;
      _query = [_query[0], cquery];
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
      new joola.viz.DatePicker(self.options.datepicker, function (err, ref) {
        if (err)
          throw err;
        self._datepicker = ref;
        self.options.$datepicker = ref;
        if (self.options.datepicker.interval) {
          self.options.datepicker.$interval = $$(self.options.datepicker.interval);
          self.options.datepicker._interval = self.parseInterval(self.options.datepicker.$interval);
          self.options.datepicker.$interval.find('.btn').on('click', function () {
            var $this = $$(this);
            self.options.datepicker.$interval.find('.btn').removeClass('active');
            $this.addClass('active');

            self.options.datepicker._interval = $this.attr('data-id');
            self.emit('intervalchange', self.options.datepicker._interval);
          });
        }

        Object.keys(self.options.visualizations).forEach(function (key) {
          var viz = self.options.visualizations[key];
          if (viz.container) {
            viz.query = self.prepareQuery(viz.query);
            viz.force = true;
            viz.canvas = self;
            switch (viz.type.toLowerCase()) {
              case 'timeline':
                new joola.viz.Timeline(viz);
                break;
              case 'metric':
                new joola.viz.Metric(viz);
                break;
              case 'table':
                new joola.viz.Table(viz);
                break;
              case 'minitable':
                new joola.viz.MiniTable(viz);
                break;
              case 'bartable':
                new joola.viz.BarTable(viz);
                break;
              case 'pie':
                new joola.viz.Pie(viz);
                break;
              case 'geo':
                new joola.viz.Geo(viz);
                break;
              default:
                break;
            }
          }
        });
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

    self.options.$container = $$(self.options.container);
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
      self.draw(options, function () {
        if (typeof callback === 'function') {
          return callback(null, self);
        }
      });
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