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
  EventEmitter2 = require('eventemitter2').EventEmitter2;

var
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
    if (self.options.datepicker) {
      var _datepicker = $(self.options.datepicker).DatePicker();
      _query.timeframe = {};
      _query.timeframe.start = _datepicker.base_fromdate;
      _query.timeframe.end = _datepicker.base_todate;
    }

    return _query;
  };

  this.draw = function (options, callback) {
    var self = this;

    if (self.options.datepicker)
      $(self.options.datepicker).DatePicker({});

    if (self.options.viz && self.options.viz.length > 0) {
      self.options.viz.forEach(function (viz) {
        viz.query = self.prepareQuery(viz.query);
        switch (viz.type) {
          case 'Metric':
            $(viz.container).Metric(viz);
            break;
          default:
            break;
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
    joola.common.mixin(self.options, options, true);
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

        joola.viz.onscreen.push(self);
        joola.events.emit('canvas.init.finish', self);
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

joola.events.on('core.init.finish', function () {
  if (typeof (jQuery) != 'undefined') {
    $.fn.Canvas = function (options, callback) {
      var result = null;
      var uuid = this.attr('jio-uuid');
      if (!uuid) {
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