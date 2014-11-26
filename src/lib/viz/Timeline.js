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
  moment = require('moment'),
  _ = require('underscore');

var Timeline = module.exports = function (options, callback) {
    if (!callback)
      callback = function () {
      };
    joola.events.emit('timeline.init.start');

    //mixin
    this._super = {};
    for (var x in require('./_proto')) {
      this[x] = require('./_proto')[x];
      this._super[x] = require('./_proto')[x];
    }

    var self = this;

    this._id = '_timeline';
    this.uuid = joola.common.uuid();
    this.options = {
      legend: true,
      canvas: null,
      container: null,
      $container: null,
      query: null,
      pickers: {
        main: {enabled: false},
        secondary: {enabled: false}
      }
    };
    this.chartDrawn = false;
    this.realtimeQueries = [];

    this.verify = function (options, callback) {
      return this._super.verify(options, callback);
    };

    this.template = function () {
      var $html = $('<div class="jio timeline caption"></div>' +
        '<div class="jio timeline chartwrapper">' +
        ' <div class="jio timeline controls">' +
        '     <div class="jio timeline primary-metric-picker"></div>' +
        '     <div class="jio timeline secondary-metric-picker"></div>' +
        '   </div>' +
        '<div class="jio timeline thechart" style="width:100%;margin:0 auto"></div> </div > ');
      return $html;
    };

    this.draw = function (options, callback) {
      self.stop();
      var extremes_0, extremes_1;
      if (!self.options.query.dimensions)
        self.options.query.dimensions = [];
      if (self.options.query.dimensions.length === 0)
        self.options.query.dimensions.push('timestamp');

      return this._super.fetch(self, this.options.query, function (err, message) {
        if (err) {
          if (typeof callback === 'function')
            return callback(err);
          return;
        }
        if (!Array.isArray(message)) {
          message = [message];
        }
        if (message[0].realtime && self.realtimeQueries.indexOf(message[0].realtime) == -1)
          self.realtimeQueries.push(message[0].realtime);
        var series = self._super.makeChartTimelineSeries.call(self, message);
        var linear = (message[0].dimensions && message[0].dimensions.length > 0 && message[0].dimensions[0].datatype == 'date');
        if (!self.chartDrawn) {
          var chartOptions = joola.common._mixin({
            title: {
              text: null
            },
            chart: {
              backgroundColor: 'transparent',
              /*marginTop: 0,
               marginBottom: 0,
               marginLeft: 0,
               marginRight: 0,
               spacingTop: 0,
               spacingBottom: 0,
               spacingLeft: 0,
               spacingRight: 0,*/
              borderWidth: 0,
              plotBorderWidth: 0,
              type: 'area',
              height: self.options.height || self.options.$container.height() || 250
            },
            lang: {
              noData: 'No data to display'
            },
            noData: {
              style: {
                fontWeight: 'bold',
                fontSize: '15px',
                color: '#303030'
              }
            },
            series: series,
            xAxis: {
              type: (linear ? 'datetime' : 'category'),
              endOnTick: false,

              tickWidth: 0,
              dateTimeLabelFormats: {
                day: '%B %e'
              },
              labels: {
                enabled: true,
                staggerLines: 1,
                style: {
                  color: '#b3b3b1'
                }
              }
            },
            yAxis: [
              {
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
              {
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
                gridLineDashStyle: 'Dot',
                gridLineWidth: 0,
                opposite: true
              }
            ],
            legend: {enabled: false},
            credits: {enabled: false},
            exporting: {enabled: true},
            plotOptions: {
              column: {allowPointSelect: true},
              line: {
                turboThreshold: message.documents ? message.documents.length + 1000 : 0,
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
          self.options.$container.append(self.options.template || self.template());
          self.options.$container.find('.caption').text(self.options.caption || '');

          //pickers
          if (self.options.pickers && self.options.pickers.main && self.options.pickers.main.enabled) {
            var $primary_metric_container;
            if (self.options.pickers.main.container)
              $primary_metric_container = $(self.options.pickers.main.container);
            else
              $primary_metric_container = $(self.options.$container.find('.primary-metric-picker')[0]);

            if ($primary_metric_container) {
              $primary_metric_container.MetricPicker({canvas: self.options.canvas}, function (err, _picker) {
                if (err)
                  throw err;
                _picker.on('change', function (metric) {
                  if (Array.isArray(self.options.query)) {
                    self.options.query.forEach(function (query) {
                      query.metrics[0] = metric;
                    });
                  }
                  else
                    self.options.query.metrics[0] = metric;

                  self.destroy();
                  self.draw(self.options);
                });
              });
            }
          }

          if (self.options.pickers && self.options.pickers.secondary && self.options.pickers.secondary.enabled) {
            var $secondary_metric_container;
            if (self.options.pickers.secondary.container)
              $secondary_metric_container = $(self.options.pickers.secondary.container);
            else
              $secondary_metric_container = $(self.options.$container.find('.secondary-metric-picker')[0]);

            if ($secondary_metric_container) {
              $secondary_metric_container.MetricPicker({canvas: self.options.canvas}, function (err, _picker) {
                if (err)
                  throw err;
                _picker.on('change', function (metric) {
                  if (Array.isArray(self.options.query)) {
                    self.options.query.forEach(function (query) {
                      query.metrics[1] = metric;
                    });
                  }
                  else
                    self.options.query.metrics[1] = metric;

                  self.destroy();
                  self.draw(self.options);
                });
              });
            }
          }
          self.chart = self.options.$container.find('.thechart').highcharts(chartOptions);
          self.chart = self.chart.highcharts();

          extremes_0 = self.chart.yAxis[0].getExtremes();
          extremes_0.min = 0;
          extremes_0.max = extremes_0.dataMax * 1.1;
          if (extremes_0.dataMin === 0 && extremes_0.dataMax === 0) {
            extremes_0.min = 0;
            extremes_0.max = 1;
          }

          self.chart.yAxis[0].setExtremes(extremes_0.min, extremes_0.max);
          if (self.chart.yAxis.length > 1) {
            extremes_1 = self.chart.yAxis[1].getExtremes();
            extremes_1.min = 0;
            extremes_1.max = extremes_1.dataMax * 1.1;
            if (extremes_1.dataMin === 0 && extremes_1.dataMax === 0) {
              extremes_1.min = 0;
              extremes_1.max = 1;
            }
            self.chart.yAxis[1].setExtremes(extremes_1.min, extremes_1.max);
          }
          self.chartDrawn = true;
          if (self.options.onDraw)
            window[self.options.onDraw](self.options.container, self);

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

        extremes_0 = self.chart.yAxis[0].getExtremes();
        extremes_0.min = 0;
        extremes_0.max = extremes_0.dataMax * 1.1;
        if (extremes_0.dataMin === 0 && extremes_0.dataMax === 0) {
          extremes_0.min = 0;
          extremes_0.max = 1;
        }

        self.chart.yAxis[0].setExtremes(extremes_0.min, extremes_0.max);
        if (self.chart.yAxis.length > 1) {
          extremes_1 = self.chart.yAxis[1].getExtremes();
          extremes_1.min = 0;
          extremes_1.max = extremes_1.dataMax * 1.1;
          if (extremes_1.dataMin === 0 && extremes_1.dataMax === 0) {
            extremes_1.min = 0;
            extremes_1.max = 1;
          }
          self.chart.yAxis[1].setExtremes(extremes_1.min, extremes_1.max);
        }
        if (self.options.onUpdate)
          window[self.options.onUpdate](self.options.container, self, series);

      });
    };


    this.hasData = function () {
      var self = this;
      return self.chart.hasData();
    };

    //here we go
    try {
      joola.common.mixin(self.options, options, true);
      self.verify(self.options, function (err) {
          if (err)
            return callback(err);

          self.options.$container = $(self.options.container);
          self.markContainer(self.options.$container, [
            {'type': 'timeline'},
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
              self.options.canvas.on('datechange', function (dates) {
                //let's change our query and fetch again
                self.options.query.timeframe = {};
                self.options.query.timeframe.start = new Date(dates.base_fromdate);
                self.options.query.timeframe.end = new Date(dates.base_todate);

                self.destroy();
                self.draw(self.options);
              });
              self.options.canvas.on('intervalchange', function (interval) {
                //let's change our query and fetch again
                self.options.query.interval = interval;

                self.destroy();
                self.draw(self.options);
              });
              self.options.canvas.on('addplot', function (sender, filter) {
                if (!Array.isArray(self.options.query))
                  self.options.query = [self.options.query];
                var query = joola.common.extend({}, self.options.query[0]);
                self.options.query.push(query);
                query.reason = 'added_plot';
                query.abc = 'abc';
                query.filter = filter;
                console.log(query);
                self.destroy();
                self.draw(self.options);
              });
              self.options.canvas.on('removeplot', function (sender, filter) {
                var _queries = [];
                self.options.query.forEach(function (query) {
                  if (query.filter) {
                    if (_.isEqual(query.filter, filter)) {
                      //console.log('removing filter');
                    }
                    else
                      _queries.push(query);
                  }
                  else
                    _queries.push(query);
                });
                self.options.query = _queries;
                self.destroy();
                self.draw(self.options);
              });
              self.options.canvas.on('metricselect', function (sender, metric) {
                self.options.query.metrics[0] = metric;
                self.destroy();
                self.draw(self.options);
              });
            }

            joola.events.emit('timeline.init.finish', self);
            if (typeof callback === 'function')
              return callback(null, self);
          });
        }
      );
    }
    catch
      (err) {
      callback(err);
      return self.onError(err, callback);
    }

//callback(null, self);
    return self;
  }
  ;

joola.events.on('core.init.finish', function () {
  var found;
  if (typeof (jQuery) != 'undefined') {
    $.fn.Timeline = function (options, callback) {
      if (!options)
        options = {force: false};
      else if (!options.hasOwnProperty('force'))
        options.force = true;
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
        options.container = this.get(0);
        result = new joola.viz.Timeline(options, function (err, timeline) {
          if (err)
            throw err;
          timeline.draw(options, callback);
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

Timeline.template = function (options) {
  var html = '<div id="example" jio-domain="joola" jio-type="timeline" jio-uuid="25TnLNzFe">\n' +
    '  <div class="jio timeline caption"></div>\n' +
    '  <div class="jio timeline chartwrapper">\n' +
    '    <div class="jio timeline thechart"></div>\n' +
    '  </div>\n' +
    '</div>';
  return html;
};
