/*jshint -W083 */

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
  _ = require('underscore');

var PunchCard = module.exports = function (options, callback) {
  if (!callback)
    callback = function () {
    };
  joola.events.emit('punchcard.init.start');

  var self = this;

  this._id = '_punchcard';
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

  this.makeSeries = function (dimensions, metrics, documents) {
    var maxValue;
    var minValue;

    documents.forEach(function (document) {
      var value = document.values[metrics[0].key];
      if (!maxValue)
        maxValue = value;
      if (!minValue)
        minValue = value;
      if (value > maxValue)
        maxValue = value;
      if (value < minValue)
        minValue = value;
    });

    var scaleSize = function (min, max, targetmin, targetmax, x) {
      var result = (((targetmax - targetmin) * (x - min)) / (max - min)) + targetmin;
      if (isNaN(result))
        result = x;
      return result;
    };

    var series = [
      {
        name: metrics[0].name,
        data: function () {
          var _data = [];
          for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 24; j++) {
              var point = {
                y: i,
                x: 3600000 * j,

                marker: {radius: 0 }
              };

              var exists = _.find(documents, function (document) {
                return document.values[dimensions[0].key] === i && document.values[dimensions[1].key] === j;
              });

              if (exists)
                point.marker = { radius: scaleSize(minValue, maxValue, 3, 11, exists.values[metrics[0].key]) };

              _data.push(point);
            }
          }
          return _data;

        }()
      }
    ];

    return series;
  };

  this.draw = function (options, callback) {
    return this._super.fetch(this.options.query, function (err, message) {
      if (err) {
        if (typeof callback === 'function')
          return callback(err);

        return;
      }
      var series = self.makeSeries(message.dimensions, message.metrics, message.documents);
      if (!self.chartDrawn) {
        var chartOptions = joola.common.mixin({
          title: {
            text: null
          },
          chart: {

            defaultSeriesType: 'scatter'
          },
          series: series,
          xAxis: {
            title: {
              text: null
            },
            type: "datetime",
            dateTimeLabelFormats: {
              hour: '%I %P'
            },
            tickInterval: 3600000 * 1
          },
          yAxis: {
            title: {
              text: null
            },
            categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          },
          legend: {enabled: false},
          credits: {enabled: false},
          exporting: {enabled: true}
        }, self.options.chart);
        self.chart = self.options.$container.highcharts(chartOptions);

        self.chart = self.chart.highcharts();
        self.chartDrawn = true;
        if (typeof callback === 'function')
          return callback(null);
      }
      else if (self.options.query.realtime) {
        //we're dealing with realtime
        series.forEach(function (ser, serIndex) {
          ser.data.splice(0, ser.data.length - 1);

          var point = self.chart.series[serIndex].points[self.chart.series[serIndex].points.length - 1];
          if (point) {
            if (point.x.getTime() == ser.data[0].x.getTime())
              self.chart.series[serIndex].data[self.chart.series[serIndex].data.length - 1].update(ser.data[0].y);
            else
              self.chart.series[serIndex].addPoint({x: ser.data[0].x, y: ser.data[0].y}, true, true);
          }
        });
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
        {'type': 'punchcard'},
        {'uuid': self.uuid}
      ], function (err) {
        if (err)
          return callback(err);

        joola.viz.onscreen.push(self);

        joola.events.emit('punchcard.init.finish', self);
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
    $.fn.PunchCard = function (options, callback) {
      var result = null;
      var uuid = this.attr('jio-uuid');
      if (!uuid) {
        //create new
        if (!options)
          options = {};
        options.container = this.get(0);
        result = new joola.viz.PunchCard(options, function (err, punchcard) {
          punchcard.draw(options, callback);
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

