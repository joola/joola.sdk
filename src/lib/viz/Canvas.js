/**
 *  @title joola.io
 *  @overview the open-source data analytics framework
 *  @copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 **/

var
  EventEmitter2 = require('eventemitter2').EventEmitter2;

var
  ce = require('cloneextend'),
  _events = new EventEmitter2({wildcard: true, newListener: true});

var Canvas = module.exports = function (options, callback) {
  if (!callback)
    callback = function () {
    };
  joolaio.events.emit('canvas.init.start');

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
  this.uuid = joolaio.common.uuid();
  this.options = {
    container: null,
    $container: null,
    visualizations: {},
    state: {}
  };

  this.verify = function (options, callback) {
    return this._super.verify(options, callback);
  };

  this.prepareQuery = function (query) {
    var _query = ce.extend({}, query);
    if (self.options.query) {
      _query = joolaio.common.extend(self.options.query, _query);
    }
    if (self.options.datepicker && self.options.datepicker.container) {
      var _datepicker = $(self.options.datepicker.container).DatePicker();
      _query.timeframe = {};
      _query.timeframe.start = _datepicker.base_fromdate;
      _query.timeframe.end = _datepicker.base_todate;
      _query.interval = 'day';
    }

    return _query;
  };

  this.draw = function (options, callback) {
    var self = this;

    console.log('draw canvas', options);

    if (self.options.datepicker && self.options.datepicker.container)
      $(self.options.datepicker.container).DatePicker({});

    if (self.options.visualizations && self.options.visualizations) {
      Object.keys(self.options.visualizations).forEach(function (key) {
        var viz = self.options.visualizations[key];
        if (viz.container) {
          viz.query = self.prepareQuery(viz.query);
          viz.force = true;
          switch (viz.type.toLowerCase()) {
            case 'timeline':
              $(viz.container).Timeline(viz);
              break;
            case 'metric':
              $(viz.container).Metric(viz);
              break;
            default:
              break;
          }
        }
      });
    }

    if (typeof callback === 'function')
      return callback(null, self);
  };

  this.addVisualization = function (viz) {
    this.options.visualizations[viz.uuid] = viz;
  };

  //here we go
  try {
    joolaio.common.mixin(self.options, options, true);
    self.verify(self.options, function (err) {
      if (err)
        return callback(err);

      self.options.$container = $(self.options.container);
      self.markContainer(self.options.$container, [
        {'type': 'canvas'},
        {'uuid': self.uuid}
      ], function (err) {
        if (err)
          return callback(err);

        joolaio.viz.onscreen.push(self);
        joolaio.events.emit('canvas.init.finish', self);
        if (typeof callback === 'function') {
          return callback(null, self);
        }
      });
    });
  }
  catch (err) {
    return self.onError(err, callback);
  }
  return self;
};

joolaio.events.on('core.init.finish', function () {
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

        result = new joolaio.viz.Canvas(options, function (err, canvas) {
          if (err)
            throw new Error('Failed to initialize canvas.', err);
          canvas.draw(options, callback);
        }).options.$container;
      }
      else {
        //return existing
        var found = false;
        joolaio.viz.onscreen.forEach(function (viz) {
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