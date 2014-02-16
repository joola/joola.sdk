/**
 *  @title joola.io
 *  @overview the open-source data analytics framework
 *  @copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 **/

var _ = require('underscore');


var DatePicker = module.exports = function (options, callback) {
  if (!callback)
    callback = function () {
    };
  joolaio.events.emit('datepicker.init.start');

  //mixin
  this._super = {};
  for (var x in require('./_proto')) {
    this[x] = require('./_proto')[x];
    this._super[x] = require('./_proto')[x];
  }

  var self = this;

  this._id = '_datepicker';
  this.uuid = joolaio.common.uuid();
  this.options = {
    container: null,
    $container: null,
  };

  this.verify = function (options, callback) {
    return this._super.verify(options, callback);
  };

  this.draw = function (options, callback) {
  };

  //here we go
  try {
    joolaio.common.mixin(self.options, options, true);
    self.verify(self.options, function (err) {
      if (err)
        return callback(err);

      self.options.$container = $(self.options.container);
      self.markContainer(self.options.$container, [
        {'type': 'datepicker'},
        {'uuid': self.uuid}
      ], function (err) {
        if (err)
          return callback(err);

        joolaio.viz.onscreen.push(self);

        joolaio.events.emit('datepicker.init.finish', self);
        if (typeof callback === 'function')
          return callback(null, self);
      });
    });
  }
  catch (err) {
    callback(err);
    return self.onError(err, callback);
  }

  //callback(null, self);
  return self;
};

joolaio.events.on('core.init.finish', function () {
  if (typeof (jQuery) != 'undefined') {
    $.fn.DatePicker = function (options, callback) {
      var result = null;
      var uuid = this.attr('jio-uuid');
      if (!uuid) {
        //create new
        if (!options)
          options = {};
        options.container = this.get(0);
        result = new joolaio.viz.DatePicker(options, function (err, datepicker) {
          datepicker.draw(options, callback);
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