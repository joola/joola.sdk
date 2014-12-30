/**
 *  @title joola
 *  @overview the open-source data analytics framework
 *  @copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 **/

var joola = require('../index');
  
var Geo = module.exports = function (options, callback) {
  if (!callback)
    callback = function () {
    };
  joola.events.emit('geo.init.start');
  var self = this;

  this._id = '_geo';
  this.uuid = joola.common.uuid();
  this.options = {
    legend: true,
    container: null,
    $container: null,
    query: null
  };
  this.chartDrawn = false;

  this.verify = function (options, callback) {
    return this._super.verify(options, callback);
  };

  this.draw = function (options, callback) {
    return this._super.fetch(this.options.query, function (err, message) {
      if (err) {
        if (typeof callback === 'function')
          return callback(err);

        return;
        //else
        //  throw err;
      }
      var options = {
        keepAspectRatio: true,
        backgroundColor: {
          fill: 'transparent'
        },
        datalessRegionColor: 'white'

      };

      var series = self._super.makeGeoSeries(message.dimensions, message.metrics, message.documents);
      if (!self.drawn) {


        self.drawn = true;
        self.chart = new google.visualization.GeoChart(document.getElementById(self.options.$container.attr('id')));
        self.chart.draw(series, options);

        if (typeof callback === 'function')
          return callback(null);
      }
      else if (self.options.query.realtime) {
        //we're dealing with realtime

        self.chart.draw(series, options);
      }
    });
  };

  //here we go
  try {
    joola.common.mixin(self.options, options, true);
    self.verify(self.options, function (err) {
      if (err)
        return callback(err);

      self.options.$container = $(self.options.container);
      self.markContainer(self.options.$container, [
        {'type': 'geo'},
        {'uuid': self.uuid}
      ], function (err) {
        if (err)
          return callback(err);

        joola.viz.onscreen.push(self);

        joola.events.emit('geo.init.finish', self);
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

joola.events.on('core.init.finish', function () {
  if (typeof (jQuery) != 'undefined') {
    $.fn.Geo = function (options, callback) {
      var result = null;
      var uuid = this.attr('jio-uuid');
      if (!uuid) {
        //create new
        if (!options)
          options = {};
        options.container = this.get(0);
        result = new joola.viz.Geo(options, function (err, geo) {
          geo.draw(options, callback);
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