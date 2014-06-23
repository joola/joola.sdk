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
    query: null,
    pickers: {
      main: {
        enabled: false
      },
      secondary: {
        enabled: false
      }
    }
  };
  this.chartDrawn = false;
  this.realtimeQueries = [];

  this.verify = function (options, callback) {
    return this._super.verify(options, callback);
  };

  this.template = function () {
    var self = this;

    var $html = $('' +
      '<div class="jio timeline caption"></div>' +
      '<div class="jio timeline chartwrapper">' +
      '  <div class="jio timeline controls"></div>' +
      '  <div class="clear"></div>' +
      '  <div class="jio timeline thechart"></div>' +
      '  <div class="clear"></div>' +
      '</div>');

    var $container = $($html.find('.controls'));
    if ((self.options.pickers && self.options.pickers.main && self.options.pickers.main.enabled)) {
      var $picker = $('<div class="jio timeline metric picker"></div>');
      var pickerOptions = {
        selected: self.options.query.metrics[0]
      };
      $picker.MetricPicker(pickerOptions);
      $container.append($picker);
    }
    if ((self.options.pickers && self.options.pickers.secondary && self.options.pickers.secondary.enabled)) {
      $container.append('<span class="jio-timeline-metric-picker-sep">and</span>');
      var $secondaryPicker = $('<div class="jio timeline metric picker secondarypicker"></div>');
      var secondaryPickerOptions = {};
      $secondaryPicker.MetricPicker(secondaryPickerOptions);

      $container.append($secondaryPicker);
    }
    return $html;
  };

  this.formatSeries = function (series) {
    series.forEach(function (ser, index) {
      series[index].color = joolaio.colors[index];
    });
    return series;
  };

  this.draw = function (options, callback) {
    self.stop();
    return this._super.fetch(self, this.options.query, function (err, message) {
      if (err) {
        if (typeof callback === 'function')
          return callback(err);

        return;
      }
      message = message[0];
      if (message.realtime && self.realtimeQueries.indexOf(message.realtime) == -1)
        self.realtimeQueries.push(message.realtime);
      var series = null;
      if (!self.chartDrawn) { //initial draw
        var chartOptions = joolaio.common.extend({
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
            alignTicks: true,
            animation: false
          },
          //series: series,
          xAxis: {
            type: (message.dimensions[0].datatype === 'date' ? 'datetime' : 'category'),
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
              opposite: true
            },
            {
              endOnTick: false,
              title: {
                text: null
              },
              labels: {
                enabled: true,
                style: {
                  color: 'red'
                }
              },
              gridLineDashStyle: 'Dot',
              opposite: true
            }
          ],
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

        self.options.$container.append(self.options.template || self.template());
        self.options.$container.find('.caption').text(self.options.caption || '');
        self.chart = self.options.$container.find('.thechart').highcharts(chartOptions);

        self.chart = self.chart.highcharts();
        self.chartDrawn = true;

        series = self._super.makeChartTimelineSeries(message.dimensions, message.metrics, message.documents, self.chart);
        series = self.formatSeries(series);
        var linear = !(message.dimensions && message.dimensions.length > 0 && message.dimensions[0].datatype == 'date');

        series.forEach(function (ser) {
          self.chart.addSeries(ser, false, false);
        });
        self.chart.redraw();
        self.chart.reflow();


        if (self.options.onDraw) {
          joola.logger.debug('Calling user-defined onDraw [' + self.options.onDraw + ']');
          window[self.options.onDraw](self.options.$container, self);
        }

        if (typeof callback === 'function')
          return callback(null);
      }
      else if (self.options.query.realtime) { //we're dealing with realtime
        series = self._super.makeChartTimelineSeries(message.dimensions, message.metrics, message.documents, self.chart);
        series = self.formatSeries(series);
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
      else { //new data, draw from scretch'
        series = self._super.makeChartTimelineSeries(message.dimensions, message.metrics, message.documents, self.chart);
        series = self.formatSeries(series);
        series.forEach(function (ser, index) {
          if (self.chart.series[index])
            self.chart.series[index].update(ser, false);
          else
            self.chart.addSeries(ser, false, false);
        });
        while (self.chart.series.length > series.length) {
          self.chart.series[self.chart.series.length - 1].remove(false);
        }
        self.chart.redraw();
        self.chart.reflow();
      }
      if (self.options.onUpdate) {
        joola.logger.debug('Calling user-defined onUpdate [' + self.options.onUpdate + ']');
        window[self.options.onUpdate](self.options.$container, self, series);
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
      self.markContainer(self.options.$container, {
        attr: [
          {'type': 'timeline'},
          {'uuid': self.uuid}
        ],
        css: self.options.css}, function (err) {
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

          self.options.canvas.on('intervalchange', function () {
            self.options.query.interval = self.options.canvas.options.datepicker._interval;
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

Timeline.template = function (options) {
  var html = '<div id="example" jio-domain="joolaio" jio-type="timeline" jio-uuid="25TnLNzFe">\n' +
    '  <div class="jio timeline caption"></div>\n' +
    '  <div class="jio timeline chartwrapper">\n' +
    '    <div class="jio timeline thechart"></div>\n' +
    '  </div>\n' +
    '</div>';
  return html;
};

Timeline.meta = {
  key: 'timeline',
  title: 'Timeline',
  tagline: '',
  jQueryTag: 'Timeline',
  description: '' +
    'Timelines are a great way to show metrics over time.' +
    '',
  example: {
    css: 'height:250px;',
    options: {
      caption: 'Mouse moves (last 30 seconds)',
      chart: {
        chart: {
          spacing: 0,
          backgroundColor: 'transparent',
          type: 'column'
        },
        plotOptions: {
          column: {
            color: 'rgba(240,95,104,1)'
          }
        }
      },
      query: {
        timeframe: 'last_30_seconds',
        interval: 'second',
        dimensions: ['timestamp'],
        metrics: ['mousemoves'],
        collection: 'demo-mousemoves',
        realtime: true
      }
    },
    draw: '$("#example").Timeline(options)',
    more: [
      'http://jsfiddle.com/'
    ]
  },
  template: Timeline.template(),
  metaOptions: {
    container: {
      datatype: 'string',
      defaultValue: null,
      description: '`optional` if using jQuery plugin. contains the Id of the HTML container.'
    },
    template: {
      datatype: 'string',
      defaultValue: null,
      description: '`optional` Specify the HTML template to use instead of the default one.'
    },
    caption: {
      datatype: 'string',
      defaultValue: null,
      description: '`optional` the caption for the metric.'
    },
    query: {
      datatype: 'object',
      defaultValue: null,
      description: '`required` contains the `query` object.'
    },
    chart: {
      datatype: 'object',
      defaultValue: null,
      description: 'Options for the <a href="http://api.highcharts.com/highcharts">charting</a> provider.'
    }
  },
  metaEvents: {
    load: {
      description: 'Visualization loaded.'
    },
    draw: {
      description: 'The visualization HTML frame has been drawn on screen.'
    },
    destroy: {
      description: 'Visualization destroyed.'
    },
    update: {
      description: 'The underlying data has changed.'
    },
    select: {
      description: 'Selection changed, data point clicked.'
    }
  },
  html: '',
  css: {

  },
  chartProvider: 'highcharts',
  license: 'MIT'
};