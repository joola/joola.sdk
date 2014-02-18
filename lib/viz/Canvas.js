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

var _events = new EventEmitter2({wildcard: true, newListener: true});

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

  this.draw = function (options, callback) {
    var self = this;
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
      var result = null;
      var uuid = this.attr('jio-uuid');
      if (!uuid) {
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