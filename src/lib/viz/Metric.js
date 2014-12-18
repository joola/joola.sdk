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
  ce = require('cloneextend');

var Metric = module.exports = function (options, callback) {
  if (!callback)
    callback = function () {
    };
  joola.events.emit('metric.init.start');

  //mixin
  this._super = {};
  for (var x in require('./_proto')) {
    this[x] = ce.clone(require('./_proto')[x]);
    this._super[x] = ce.clone(require('./_proto')[x]);
  }

  var self = this;

  this._id = '_metric';
  this.uuid = joola.common.uuid();
  this.options = {
    canvas: null,
    legend: true,
    container: null,
    $container: null,
    query: null,
    allowSelect: true
  };
  this.drawn = false;
  this.realtimeQueries = [];

  this.verify = function (options, callback) {
    return this._super.verify(options, callback);
  };

  this.template = function () {
    var $html = $('<div class="jio metricbox value"></div>' +
    '<div class="jio metricbox caption"></div>');
    return $html;
  };
  this.draw = function (options, callback) {
    if (!Array.isArray(this.options.query))
      this.options.query = [this.options.query];
    self.stop();
    this.options.query[0].dimensions = [];
    this.options.query[0].metrics = this.options.query[0].metrics.splice(0, 1);
    return this._super.fetch(this.options.query, function (err, message) {
      if (Array.isArray(message))
        message = message[0];
      if (err) {
        if (typeof callback === 'function')
          return callback(err);
        return;
      }
      if (message.realtime && self.realtimeQueries.indexOf(message.realtime) == -1)
        self.realtimeQueries.push(message.realtime);

      var value;
      if (message.documents && message.documents.length > 0)
        value = message.documents[0].fvalues[message.metrics[0].key];
      else
        value = 0;

      if (!value)
        value = 0;

      /*
       var decimals = 2;
       if (message.metrics[0].decimals)
       decimals = message.metrics[0].decimals
       value = Math.round(value * (Math.pow(10, decimals))) / (Math.pow(10, decimals));
       */
      if (!self.drawn) {
        self.options.$container.data(self);
        self.options.$container.append(self.options.template || self.template());
        self.options.$container.find('.caption').text(self.options.caption || '');
        self.drawn = true;

        if (self.options.onDraw)
          window[self.options.onDraw](self.options.$container, self);

        if (self.options.allowSelect)
          self.options.$container.css('cursor', 'pointer');
        if (self.options.allowSelect && self.options.onSelect)
          self.options.$container.on('click', window[self.options.onSelect]);
        if (self.options.allowSelect && self.options.canvas) {
          self.options.$container.on('click', function () {
            self.options.canvas.emit('metricselect', self, self.options.query[0].metrics[0]);
          });
        }
        self.options.$container.find('.value').text(value);
        if (typeof callback === 'function')
          return callback(null, self);
      }
      else if (self.options.query[0].realtime) {
        if (self.options.onUpdate)
          window[self.options.onUpdate](self);
        //we're dealing with realtime

        self.options.$container.find('.value').text(value);
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
        {'type': 'metric'},
        {'uuid': self.uuid},
        {css: self.options.css}
      ], function (err) {
        if (err)
          return callback(err);

        joola.viz.onscreen.push(self);

        if (!self.options.canvas) {
          var elem = self.options.$container.parent();
          if (elem.attr('jio-type') == 'canvas') {
            self.options.canvas = $(elem).Canvas();
          }
        }

        if (self.options.canvas) {
          self.options.canvas.addVisualization(self);

          //subscribe to default events
          self.options.canvas.on('datechange', function (dates) {
            //let's change our query and fetch again
            if (!Array.isArray(self.options.query))
              self.options.query = [self.options.query];
            //let's change our query and fetch again
            self.options.query[0].timeframe = {};
            self.options.query[0].timeframe.start = new Date(dates.base_fromdate);
            self.options.query[0].timeframe.end = new Date(dates.base_todate);


            self.destroy();
            self.draw(self.options);
          });
        }

        joola.events.emit('metric.init.finish', self);

        //if (self.options.query) {
        //  return self.draw(options, callback);
        //}
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
  var found;
  if (typeof (jQuery) != 'undefined') {
    $.fn.Metric = function (options, callback) {
      if (!options)
        options = {force: false};
      else if (!options.hasOwnProperty('force'))
        options.force = true;
      var result = null;
      var uuid = this.attr('jio-uuid');
      if (!uuid || (options && options.force)) {
        if (options && options.force && uuid) {
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
          metric.draw(options, callback);
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

    /*
     joola.events.on('core.ready', function () {
     if (typeof (jQuery) != 'undefined') {
     $.find('.jio.metric').forEach(function (container) {
     var $container = $(container);

     var caption = $container.attr('data-caption') || '';
     var timeframe = $container.attr('data-timeframe');
     var metrics = $container.attr('data-metrics');
     metrics = eval("(" + metrics + ')');

     var query = {
     timeframe: timeframe,
     metrics: [metrics]
     };
     $container.Metric({caption: caption, query: query});
     });
     }
     });
     */
  }
});

Metric.template = function (options) {
  var html = '<div id="example" jio-domain="joola" jio-type="table" jio-uuid="25TnLNzFe">\n' +
    ' <div class="jio metricbox wrapper">\n' +
    '   <div class="jio metricbox caption"></div>\n' +
    '   <div class="jio metricbox value"></div>\n' +
    ' </div>\n' +
    '</div>';
  return html;
};
