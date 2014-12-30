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

var Sparkline = module.exports = function (options, callback) {
  if (!callback)
    callback = function () {
    };
  joola.events.emit('sparkline.init.start');

  var self = this;

  this._id = '_sparkline';
  this.uuid = joola.common.uuid();
  this.options = {
    legend: true,
    canvas: null,
    container: null,
    $container: null,
    query: null
  };
  this.chartDrawn = false;
  this.realtimeQueries = [];

  this.verify = function (options, callback) {
    return this._super.verify(options, callback);
  };

  this.draw = function (options, callback) {
    self.stop();
    return this._super.fetch(self, this.options.query, function (err, message) {
      if (err) {
        console.log('err', err);
        if (typeof callback === 'function')
          return callback(err);
        //else
        //throw err;

        return;
      }

      if (message.realtime && self.realtimeQueries.indexOf(message.realtime) == -1)
        self.realtimeQueries.push(message.realtime);

      var series = self._super.makeChartTimelineSeries(message.dimensions, message.metrics, message.documents);
      if (!self.chartDrawn) {
        var chartOptions = joola.common.mixin({
          title: {
            text: null
          },
          chart: {
            marginTop: 0,
            marginBottom: (message.dimensions[0].datatype === 'date' ? 0 : 20),
            marginLeft: 0,
            marginRight: 0,
            spacingTop: 0,
            spacingBottom: 0,
            spacingLeft: 0,
            spacingRight: 0,
            borderWidth: 0,
            plotBorderWidth: 0,
            type: 'area'
          },
          series: series,
          xAxis: {
            type: (message.dimensions[0].datatype === 'date' ? 'datetime' : 'category'),
            labels: {
              enabled: (message.dimensions[0].datatype !== 'date')
            }
          },
          yAxis: {
            title: {
              text: null
            },
            labels: {
              enabled: false
            }
          },
          legend: {enabled: false},
          credits: {enabled: false},
          exporting: {enabled: true},
          plotOptions: {
            column: {allowPointSelect: true},
            series: {
              turboThreshold: message.documents.length + 1000,
              color: '#333333',
              fillOpacity: 0.1,
              lineWidth: 3,
              connectNulls: true,
              marker: {
                enabled: false,
                symbol: 'circle',
                states: {
                  hover: {
                    enabled: true
                  }
                }
              }
            }
          }
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
          ser.data.forEach(function (datapoint) {
            var found = false;
            var nameBased = false;
            var y;
            self.chart.series[serIndex].points.forEach(function (point, pIndex) {
              if (point) {
                if (datapoint.x) {
                  if (point.x.getTime() == datapoint.x.getTime()) {
                    y = self.chart.series[serIndex].data[pIndex].y;
                    found = true;
                    if (y != datapoint.y)
                      self.chart.series[serIndex].data[pIndex].update(datapoint.y);
                  }
                }
                else {
                  nameBased = true;
                  if (point.name == datapoint.name) {
                    y = self.chart.series[serIndex].data[pIndex].y;
                    found = true;
                    if (y != datapoint.y)
                      self.chart.series[serIndex].data[pIndex].update(datapoint.y);
                  }
                }
              }
            });
            if (!found) {
              if (nameBased)
                self.chart.series[serIndex].addPoint({name: datapoint.name, y: datapoint.y}, true);
              else
                self.chart.series[serIndex].addPoint({x: datapoint.x, y: datapoint.y}, true, true);
            }
          });
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
        {'type': 'sparkline'},
        {'uuid': self.uuid}
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
          self.options.canvas.on('datechange', function (dates) {
            console.log('sparkline', 'datechange', dates);

            //let's change our query and fetch again
            self.options.query.timeframe = {};
            self.options.query.timeframe.start = new Date(dates.base_fromdate);
            self.options.query.timeframe.end = new Date(dates.base_todate);

            self.draw(self.options);
          });
        }

        joola.events.emit('sparkline.init.finish', self);
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
    $.fn.Sparkline = function (options, callback) {
      var result = null;
      var uuid = this.attr('jio-uuid');
      if (!uuid || options.force) {
        if (options.force && uuid) {
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
        result = new joola.viz.Sparkline(options, function (err, sparkline) {
          if (err)
            throw err;
          sparkline.draw(options, callback);
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
  }
});