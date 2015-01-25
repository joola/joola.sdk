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
  events = require('events'),
  util = require('util'),
  ce = require('cloneextend'),
  $$ = require('jquery'),
  joola = require('../index'),
  moment = require('moment'),
  _ = require('underscore');

require('twix');

var Timeline = module.exports = function (options, callback) {
  if (!callback)
    callback = function () {
    };
  joola.events.emit('timeline.init.start');
  var self = this;

  this.type = 'timeline';
  this.uuid = joola.common.uuid();
  this.data = [];
  this.options = {
    legend: true,
    canvas: null,
    template: '<div class="caption"></div>' +
    '<div class="chartwrapper">' +
    ' <div class="controls">' +
    '   <div class="primary-metric-picker"></div>' +
    '   <div class="sep">vs.</div>' +
    '   <div class="secondary-metric-picker"></div>' +
    ' </div>' +
    ' ' +
    ' <div class="thechart"></div>' +
    '</div>',
    container: null,
    $container: null,
    query: null,
    pickers: {
      main: {enabled: false},
      secondary: {enabled: false}
    }
  };
  this.chartDrawn = false;

  this.verify = function () {
    if (!self.options)
      return 'Failed to verify [options].';
    if (self.options.query) {
      if (!Array.isArray(self.options.query))
        self.options.query = [self.options.query];
    }
    else
      return 'Failed to verify query [options.query].';

    self.options.query[0].dimensions = ['timestamp'];
    return null;
  };

  this.destroy = function () {
    joola.viz.stop(self);
    self.initialChartDrawn = false;
    $$(self.options.container).empty();
  };

  this.reply = function (data) {
    if (self.initialChartDrawn && self.options.query[0].realtime === true && self.options.query[0].interval.indexOf('second') > -1) {
      self.chart.series.forEach(function (series, serIndex) {
        series.addPoint({x: new Date(), y: 0}, false, true, false);
      });
      self.chart.redraw(true);
    }
  };

  this.enter = function (data, alldata) {
    if (self.chart.series.length === 0)
      return;
    if (self.data.length > 1)
      return;
    Object.keys(data[0].metrics).forEach(function (key, pointIndex) {
      var point = data[0];
      var series = self.chart.series[pointIndex];
      series.data[series.data.length - 1].update(point.metrics[key]);
    });
    //self.chart.redraw();
    /*extremes_0 = self.chart.yAxis[0].getExtremes();
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
     }*/
  };

  this.update = function (data, alldata) {
    if (self.chart.series.length === 0)
      return;
    if (self.data.length > 1)
      return;
    Object.keys(data[0].metrics).forEach(function (key, pointIndex) {
      var point = data[0];
      var series = self.chart.series[pointIndex];
      series.data[series.data.length - 1].update(point.metrics[key]);
    });
    self.chart.redraw(true);
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
  };

  this.exit = function (data, alldata) {
    //console.log('exit', data);
  };

  this.done = function (data, raw) {
    if (self.initialChartDrawn)
      return;
    self.initialChartDrawn = true;
    self.chartData = self.makeChartTimelineSeries(raw);
    self.paint();
  };

  this.makeChartTimelineSeries = function (message) {
    if (message[0].metrics.length === 0) {
      return [
        {
          type: 'line',
          name: 'no data',
          data: []
        }
      ];
    }
    var self = this;
    var yAxis = [null, null];
    var series = [];
    var seriesIndex = -1;
    var interval = Array.isArray(self.options.query) ? self.options.query[0].interval : self.options.query.interval;

    var checkExists = function (timestampDimension, documents, date) {
      return _.find(documents, function (document) {
        if (!document[timestampDimension.key])
          return;

        try {
          var _date = new Date(date);
          var _basedate = new Date(document[timestampDimension.key]);

          switch (interval) {
            case 'month':
            case 'day':
              _date.setHours(_date.getHours() - (_date.getTimezoneOffset() / 60));
              return _basedate.getTime() === _date.getTime();
            case 'minute':
              _basedate.setSeconds(0);
              _basedate.setMilliseconds(0);
              return _basedate.getTime() === _date.getTime();
            case 'second':
              _basedate.setMilliseconds(0);
              return _basedate.getTime() === _date.getTime();
            default:
              return _basedate.getTime() === _date.getTime();
          }
        }
        catch (ex) {
          console.log('exception while checkExists', ex);
        }
      });
    };
    var fill = function (resultRow, row, timestampDimension) {
      Object.keys(resultRow).forEach(function (key) {
        if (key !== timestampDimension.key) {
          row[key] = 0;
          //row.fvalues[key] = 0;
        }
      });
    };

    message.forEach(function (result, resultIndex) {
      if (result.documents.length === 0) {
        result.documents.push({values: {}, fvalues: {}});
        result.dimensions.forEach(function (d) {
          result.documents[0][d.name] = null;
          //result.documents[0].fvalues[d.name] = null;
        });
        result.metrics.forEach(function (m) {
          result.documents[0][m.name] = null;
          //result.documents[0].fvalues[m.name] = null;
        });
      }

      var dimensions = result.dimensions;
      var metrics = result.metrics;
      var documents = ce.clone(result.documents);
      //should we fill the date range
      var query = ce.clone(result.query);

      var timestampDimension = _.find(result.dimensions, function (item) {
        return item.datatype === 'date';
      });
      if (timestampDimension) {
        //validate and fill the date range;
        interval = interval === 'ddate' ? 'day' : (interval || 'day');
        if (!query.timeframe) {
          query.timeframe = {};
          query.timeframe.start = result.documents[result.documents.length - 1].timestamp;
          query.timeframe.end = result.documents[0].timestamp;
        }

        var counter = 0;
        var fixed = [];
        var itr = moment.twix(query.timeframe.start, query.timeframe.end).iterate(interval);
        while (itr.hasNext() && counter++ < 1000) {
          var _d = new Date(itr.next()._d.getTime());
          var exists;
          switch (interval) {
            case 'day':
              _d.setHours(0);
              _d.setSeconds(0);
              _d.setMilliseconds(0);
              break;
            case 'minute':
              _d.setSeconds(0);
              _d.setMilliseconds(0);
              break;
            case 'second':
              _d.setMilliseconds(0);
              break;
            default:
              break;
          }
          var offset = new Date().getTimezoneOffset() / 60;
          exists = checkExists(timestampDimension, result.documents, _d);
          if (!exists) {
            //_d.setHours(_d.getHours() + (offset * -1));
            exists = {values: {}, fvalues: {}};
            exists[timestampDimension.key] = _d.toISOString();
            //exists.fvalues[timestampDimension.key] = _d.toISOString();
            fill(result.documents[0], exists, timestampDimension);
          }
          fixed.push(exists);
        }
        documents = fixed;
      }

      if (!metrics)
        return series;
      metrics.forEach(function (metric, index) {
        var _yaxis = 0;
        yAxis[index % 2] = yAxis [index % 2] || metric.dependsOn || metric.key;
        if (yAxis[0] === (yAxis [index % 2] || metric.dependsOn || metric.key))
          _yaxis = 0;
        else
          _yaxis = 1;
        var metric_name = metric.name;
        if (result.query.filter) {
          result.query.filter.forEach(function (f) {
            metric_name = f[2] + ': ' + metric_name;
          });
        }
        series[++seriesIndex] = {
          name: metric_name,
          data: [],
          yAxis: _yaxis,
          color: joola.colors[seriesIndex]
        };
        documents.forEach(function (document, docIndex) {
          var x = document[dimensions[0].key];
          var nameBased = true;
          if (dimensions[0].datatype === 'date') {
            x = new Date(document[dimensions[0].key]);
            nameBased = false;
          }

          if (nameBased) {
            series[seriesIndex].data.push({
              name: x,
              y: document[metrics[index].key] ? document[metrics[index].key] : 0
            });
          }
          else {
            if (seriesIndex === 0) {
              series[seriesIndex].data.push({
                x: x,
                y: document[metrics[index].key] ? document[metrics[index].key] : 0
              });
            }
            else {
              series[seriesIndex].data.push({
                x: series[0].data[docIndex].x,
                y: document[metrics[index].key] ? document[metrics[index].key] : 0
              });
            }
          }
        });
      });
    });
    return series;

  };

  this.paint = function (rescale) {
    self.chartData.forEach(function (s) {
      self.chart.addSeries(s);
    });

    //var colWidth = ($$(self.options.container).width() / self.chartData[0].data.length) + 1;
    //console.log(colWidth, self.chart);
    //self.chart.options.plotOptions.column.pointWidth = colWidth;
    self.chart.redraw();
    //if (!self.options.query[0].realtime || rescale) {
    extremes_0 = self.chart.yAxis[0].getExtremes();
    extremes_0.min = 0;
    extremes_0.max = extremes_0.dataMax * 1.1;
    if (extremes_0.dataMin === 0 && extremes_0.dataMax === 0) {
      extremes_0.min = 0;
      extremes_0.max = 1;
    }

    if (!self.last_extremes_0)
      self.last_extremes_0 = extremes_0;
    if (self.last_extremes_0.min !== extremes_0.min || self.last_extremes_0.max !== extremes_0.max)
      self.chart.yAxis[0].setExtremes(extremes_0.min, extremes_0.max);
    if (self.chart.yAxis.length > 1) {
      extremes_1 = self.chart.yAxis[1].getExtremes();
      extremes_1.min = 0;
      extremes_1.max = extremes_1.dataMax * 1.1;
      if (extremes_1.dataMin === 0 && extremes_1.dataMax === 0) {
        extremes_1.min = 0;
        extremes_1.max = 1;
      }
      if (!self.last_extremes_1)
        self.last_extremes_1 = extremes_1;
      if (self.last_extremes_1.min !== extremes_1.min || self.last_extremes_1.max !== extremes_1.max)
        self.chart.yAxis[1].setExtremes(extremes_1.min, extremes_1.max);
    }
    //}
  };

  this.draw = function (options, callback) {
    self.chartOptions = joola.common._mixin({}, self.options.chart);
    self.options.$container.empty();
    self.options.$container.append(self.options.template || self.template());
    self.options.$container.find('.caption').text(self.options.caption || '');

    //pickers
    if (self.options.pickers && self.options.pickers.main && self.options.pickers.main.enabled) {
      var $primary_metric_container;
      if (self.options.pickers.main.container)
        $primary_metric_container = $$(self.options.pickers.main.container);
      else
        $primary_metric_container = $$(self.options.$container.find('.primary-metric-picker')[0]);

      if ($primary_metric_container) {
        self.primary_metric_container = new joola.viz.MetricPicker({
          container: $primary_metric_container,
          canvas: self.options.canvas,
          selected: self.options.query[0].metrics[0],
          allowRemove: false
        }, function (err, _picker) {
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

            if (self.secondary_metric_container) {
              self.secondary_metric_container.options.disabled = [metric];
              self.secondary_metric_container.markSelected();
            }

            self.data = [];
            self.chartData = [];
            self.initialChartDrawn = false;
            while (self.chart.series.length > 0) {
              self.chart.series[0].remove();
            }
            joola.viz.initialize(self, self.options);
          });
        });
      }
    }

    if (self.options.pickers && self.options.pickers.secondary && self.options.pickers.secondary.enabled) {
      var $secondary_metric_container;
      if (self.options.pickers.secondary.container)
        $secondary_metric_container = $$(self.options.pickers.secondary.container);
      else
        $secondary_metric_container = $$(self.options.$container.find('.secondary-metric-picker')[0]);

      if ($secondary_metric_container) {
        self.secondary_metric_container = new joola.viz.MetricPicker({
          container: $secondary_metric_container,
          canvas: self.options.canvas,
          selected: self.options.query[0].metrics[1],
          disabled: self.options.query[0].metrics[0],
          allowRemove: true
        }, function (err, _picker) {
          if (err)
            throw err;
          _picker.on('change', function (metric) {
            if (!metric) {
              if (Array.isArray(self.options.query)) {
                self.options.query.forEach(function (query) {
                  query.metrics.splice(1, 1);
                });
              }
              else
                self.options.query.metrics.splice(1, 1);

              self.primary_metric_container.options.disabled = [];
              self.primary_metric_container.markSelected();
            }
            else {
              if (Array.isArray(self.options.query)) {
                self.options.query.forEach(function (query) {
                  query.metrics[1] = metric;
                });
              }
              else
                self.options.query.metrics[1] = metric;

              self.primary_metric_container.options.disabled = [metric];
              self.primary_metric_container.markSelected();
            }
            self.data = [];
            self.chartData = [];
            self.initialChartDrawn = false;
            while (self.chart.series.length > 0) {
              self.chart.series[0].remove();
            }

            joola.viz.initialize(self, self.options);
          });
        });
      }
    }
    else {
      $$(self.options.$container.find('.sep')).hide();
      $$(self.options.$container.find('.secondary-metric-picker')).hide();
    }

    self.chartOptions = joola.common._mixin({
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
        type: 'line',
        height: self.options.height || self.options.$container.height() || 250,
        //width: self.options.width || self.options.$container.width() || null
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
      series: [],
      xAxis: {
        type: 'datetime',
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
        column: {
          allowPointSelect: true,
          groupPadding: 0.05,
          pointPadding: 0,
          borderWidth: 0
        },
        line: {
          //turboThreshold: message.documents ? message.documents.length + 1000 : 0,
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

    if (!self.options.$container)
      self.options.$container = $$(self.options.container);
    self.chartOptions.chart.renderTo = self.options.$container.find('.thechart').get(0);
    self.chart = new Highcharts.Chart(self.chartOptions);
    //self.chart.setSize( $$(self.chart.container).parent().width(), $$(self.chart.container).parent().height() );
    self.chartDrawn = true;

    if (self.options.onDraw)
      window[self.options.onDraw](self.options.container, self);

    if (typeof callback === 'function')
      return callback(null);
  };

  //here we go
  if (options && options.query && !Array.isArray(options.query))
    options.query = [options.query];

  //we call the core initialize option
  joola.viz.initialize(self, options || {});

  self.draw(null, function (err, ref) {
    if (err)
      return callback(err);
    joola.viz.onscreen.push(self);
    if (!self.options.canvas) {
      var elem = $$(self.options.$container).parent();
      if (elem.attr('jio-type') == 'canvas') {
        self.options.canvas = $$(elem).Canvas();
      }
    }
    if (self.options.canvas) {
      self.options.canvas.addVisualization(self);
    }

    //wrap up
    self.initialized = true;
    if (typeof callback === 'function')
      return callback(null, ref);
  });
  return self;
};

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
          //timeline.draw(options, callback);
          if (callback)
            return callback(null, timeline);

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

util.inherits(Timeline, events.EventEmitter);