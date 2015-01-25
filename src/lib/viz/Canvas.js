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
  events = require('events'),
  util = require('util'),
  _ = require('underscore'),
  ce = require('cloneextend'),
  $$ = require('jquery');

var Canvas = module.exports = function (options, callback) {
  if (!callback)
    callback = function () {
    };
  joola.events.emit('canvas.init.start');
  var self = this;

  this._id = '_canvas';
  this.uuid = joola.common.uuid();
  this.options = {
    container: null,
    $container: null,
    visualizations: {},
    metrics: [],
    dimensions: [],
    filters: [],
    state: {}
  };

  this.verify = function (options) {
    return null;
  };

  this.prepareQuery = function (query, dates) {
    var _query;
    if (!dates)
      dates = {};
    if (Array.isArray(query))
      _query = [ce.extend({}, query[0])];
    else {
      _query = ce.extend({}, query);
      _query = [_query];
    }
    if (self.options.query) {
      _query[0] = joola.common._extend(ce.clone(self.options.query), _query[0]);
    }

    if (_query[0].dimensions && _query[0].dimensions.length > 0 && _query[0].dimensions && _query[0].dimensions.length > 0) {
      _query[0].dimensions.forEach(function (dimension, i) {
        var key;
        if (typeof dimension === 'string')
          key = dimension;
        else if (typeof dimension === 'object')
          key = dimension.key;

        if (key) {
          var exist = _.find(_query[0].dimensions, function (m) {
            return (m.key || m) === key;
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
            return (m.key || m) === key;
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
    _query[0].realtime = _query[0].realtime || self.options.realtime || false;
    if (self._datepicker && self._datepicker.comparePeriod) {
      _query[0].realtime = false;
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

  this.buildFilter = function (point, dimensionkey) {
    var filters = [];
    Object.keys(point.dimensions).forEach(function (key) {
      if (dimensionkey && dimensionkey === key || !dimensionkey) {
        var dimension = point.meta[key];
        var value = point.dimensions[key];
        var filter = [dimension.key, 'eq', dimension.datatype === 'date' ? new Date(value) : value];
        filters.push(filter);
      }
    });
    return filters;
  };

  this.draw = function (options, callback) {
    var self = this;
    if (self.options.onDraw)
      window[self.options.onDraw](self);
    if (self.options.filterbox && self.options.filterbox.container) {
      self.options.filterbox.canvas = self;
      new joola.viz.FilterBox(self.options.filterbox, function (err, ref) {
        self.options.filterbox.ref = ref;
      });
    }
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
                new joola.viz.Table(viz).on('select', function (point, dimensionkey) {
                  var filter = self.buildFilter(point, dimensionkey);
                  var exist = _.find(self.options.filters, function (filter) {
                    return filter.key === point.key + dimensionkey;
                  });
                  if (exist)
                    self.emit('removefilter', point.key + dimensionkey);
                  else {
                    self.emit('addfilter', point.key + dimensionkey, point.meta, filter);
                  }
                });
                break;
              case 'minitable':
                new joola.viz.MiniTable(viz);
                break;
              case 'bartable':
                new joola.viz.BarTable(viz).on('select', function (point, dimensionkey) {
                  if (Array.isArray(point))
                    point = point[0];
                  var filter = self.buildFilter(point, dimensionkey);
                  var exist = _.find(self.options.filters, function (filter) {
                    return filter.key === point.key + dimensionkey;
                  });
                  if (exist)
                    self.emit('removefilter', point.key + dimensionkey);
                  else {
                    self.emit('addfilter', point.key + dimensionkey, point.meta, filter);
                  }
                });
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
    else {
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
              new joola.viz.Table(viz).on('select', function (point, dimensionkey) {
                var filter = self.buildFilter(point, dimensionkey);
                var exist = _.find(self.options.filters, function (filter) {
                  return filter.key === point.key + dimensionkey;
                });
                if (exist)
                  self.emit('removefilter', point.key + dimensionkey);
                else {
                  self.emit('addfilter', point.key + dimensionkey, point.meta, filter);
                }
              });
              break;
            case 'minitable':
              new joola.viz.MiniTable(viz);
              break;
            case 'bartable':
              new joola.viz.BarTable(viz).on('select', function (point, dimensionkey) {
                if (Array.isArray(point))
                  point = point[0];
                var filter = self.buildFilter(point, dimensionkey);
                var exist = _.find(self.options.filters, function (filter) {
                  return filter.key === point.key + dimensionkey;
                });
                if (exist)
                  self.emit('removefilter', point.key + dimensionkey);
                else {
                  self.emit('addfilter', point.key + dimensionkey, point.meta, filter);
                }
              });
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
    }

    self.on('addfilter', function (key, meta, filter) {
      var found = false;
      for (var i = 0; i < self.options.filters.length; i++) {
        if (self.options.filters[i].key === key) {
          found = true;
        }
      }
      if (!found) {
        self.options.filters.push({key: key, filters: filter});
        filter.forEach(function (f) {
          var $filter = $$('<div data-id="' + key + '" class="filter"></div>');
          var text = meta[f[0]].name + ': <strong class="value">' + f[2] + '</strong>';
          var $inner = $$('<span class="caption">' + text + '</span>');
          var $close = $$('<span class="close icon-close"></span>');
          $close.on('click', function () {
            self.emit('removefilter', key);
          });
          $filter.append($inner);
          $filter.append($close);
          if (self.options.filterbox && self.options.filterbox.ref)
            self.options.filterbox.ref.options.$container.find('.filterbox').append($filter);
          self.emit('filterchange');
        });
      }
    });
    self.on('removefilter', function (key) {
      for (var i = 0; i < self.options.filters.length; i++) {
        if (self.options.filters[i].key === key) {
          self.options.filters.splice(i, 1);
          if (self.options.filterbox && self.options.filterbox.ref)
            self.options.filterbox.ref.options.$container.find('[data-id="' + key + '"]').remove();
          i = self.options.filters.length;
          self.emit('filterchange');
        }
      }
    });
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
  joola.viz.initialize(self, options || {});

  self.draw(null, function (err, ref) {
    if (err)
      return callback(err);
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
      return callback(null, ref);
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
          //canvas.draw(options, callback);
          if (callback)
            return callback(null, canvas);
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

util.inherits(Canvas, events.EventEmitter);