/**
 *  @title joola.io
 *  @overview the open-source data analytics framework
 *  @copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 **/

var moment = require('moment');
var _ = require('underscore');

var Timeline = module.exports = function (options, callback) {
  if (!callback)
    callback = function () {
    };
  joolaio.events.emit('timeline.init.start');

  //mixin
  this._super = {};
  for (var x in require('./_proto')) {
    this[x] = require('./_proto')[x];
    this._super[x] = require('./_proto')[x];
  }

  var self = this;

  this._id = '_timeline';
  this.uuid = joolaio.common.uuid();
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
        var chartOptions = joolaio.common.extend({
          title: {
            text: null
          },
          chart: {
            marginTop: 0,
            marginBottom: 0,
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
            type: 'datetime',
            endOnTick: false,
            tickWidth: 0,
            dateTimeLabelFormats: {
              day: '%B %e'
            },
            labels: {
              enabled: true,
              style: {
                color: '#b3b3b1'
              }
            }
          },
          yAxis: {
            endOnTick: false,
            title: {
              text: null
            },
            labels: {
              enabled: true,
              style: {
                color: '#b3b3b1'
              }
            },
            gridLineDashStyle: 'Dot'
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
            self.chart.series[serIndex].points.forEach(function (point) {
              if (point) {
                if (point.x.getTime() == datapoint.x.getTime()) {
                  var y = self.chart.series[serIndex].data[self.chart.series[serIndex].data.length - 1].y;
                  found = true;
                  if (y != datapoint.y)
                    self.chart.series[serIndex].data[self.chart.series[serIndex].data.length - 1].update(datapoint.y);
                }
              }
            });
            if (!found) {
              self.chart.series[serIndex].addPoint({x: datapoint.x, y: datapoint.y}, true, true);
            }
          });
        });
      }
    });
  };

  //here we go
  try {
    joolaio.common.mixin(self.options, options, true);
    self.verify(self.options, function (err) {
      if (err)
        return callback(err);

      self.options.$container = $(self.options.container);
      self.markContainer(self.options.$container, [
        {'type': 'timeline'},
        {'uuid': self.uuid}
      ], function (err) {
        if (err)
          return callback(err);

        joolaio.viz.onscreen.push(self);

        if (!self.options.canvas) {
          var elem = self.options.$container.parent();
          if (elem.attr('jio-type') == 'canvas') {
            self.options.canvas = $(elem).Canvas();
          }
        }

        if (self.options.canvas) {
          self.options.canvas.addVisualization(self);
          self.options.canvas.on('datechange', function (dates) {
            //let's change our query and fetch again
            self.options.query.timeframe = {};
            self.options.query.timeframe.start = new Date(dates.base_fromdate);
            self.options.query.timeframe.end = new Date(dates.base_todate);

            self.draw(self.options);
          });
        }

        joolaio.events.emit('timeline.init.finish', self);
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
  var found;
  if (typeof (jQuery) != 'undefined') {
    $.fn.Timeline = function (options, callback) {
      var result = null;
      var uuid = this.attr('jio-uuid');
      if (!uuid || options.force) {
        if (options.force && uuid) {
          var existing = null;
          found = false;
          joolaio.viz.onscreen.forEach(function (viz) {
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
        result = new joolaio.viz.Timeline(options, function (err, timeline) {
          if (err)
            throw err;
          timeline.draw(options, callback);
        }).options.$container;
      }
      else {
        //return existing
        found = false;
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


