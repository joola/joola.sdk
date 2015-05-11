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
  events = require('events'),
  util = require('util'),
  ce = require('cloneextend'),
  $$ = require('jquery')(require('jsdom').jsdom().parentWindow),
  _ = require('underscore');


var Pie = module.exports = function (options, callback) {
  if (!callback)
    callback = function () {
    };
  joola.events.emit('pie.init.start');
  var self = this;

  this._id = '_pie';
  this.uuid = joola.common.uuid();
  this.options = {
    legend: true,
    limit: 5,
    colors: joola.colors,
    container: null,
    $container: null,
    query: null,
    template: '<div jio-domain="joola" jio-type="pie">\n' +
      '  <div class="jio-pie-caption"></div>\n' +
      '  <div class="jio-pie-chart thechart"></div>\n' +
      '</div>'
  };
  this.chartDrawn = false;
  this.realtimeQueries = [];

  this.verify = function (options) {
    if (!self.options)
      return 'Failed to verify [options].';
    if (self.options.query) {
      if (!Array.isArray(self.options.query))
        self.options.query = [self.options.query];
      if (self.options.query[0].dimensions.length === 0 || self.options.query[0].dimensions.length > 1)
        return 'Please specify a single dimension.';
      if (self.options.query[0].metrics.length === 0 || self.options.query[0].metrics.length > 1)
        return 'Please specify a single metric.';
    }
    return null;
  };

  this.destroy = function () {
    joola.viz.stop(self);
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
  };

  this.update = function (data, alldata) {
    if (self.chart.series.length === 0)
      return;
    if (self.data.length > 1)
      return;
    Object.keys(data[0].metrics).forEach(function (key, pointIndex) {
      var point = data[0];
      //var series = self.chart.series[pointIndex];
      self.chart.series.forEach(function (series) {
        var dm_value = point.raw[self.options.query[0].dimensions[0].key || self.options.query[0].dimensions[0]];
        var _data = [];
        series.data.forEach(function (d, i) {
          if (d.name === dm_value) {
            _data.push(point.metrics[key]);
          }
          else
            _data.push(series.data[i].y);
        });
        series.setData(_data, false);
      });
    });

    self.chart.redraw(true);
  };

  this.exit = function (data, alldata) {
    //console.log('exit', data);
  };

  this.done = function (data, raw) {
    if (self.initialChartDrawn)
      return;
    self.initialChartDrawn = true;
    self.chartData = self.makeChartPieSeries(raw);
    self.paint();
  };

  this.makeChartPieSeries = function (message) {
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
    var series = [];
    var seriesIndex = -1;

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
      var data = [];
      documents.forEach(function (doc, i) {
        data.push({
          name: doc[dimensions[0].key],
          y: doc[metrics[0].key],
          color: self.options.colors[i]
        });
      });
      series[++seriesIndex] = {
        name: metrics[0].name,
        data: data
      };
    });
    return series;
  };

  this.paint = function (rescale) {
    self.chartData.forEach(function (s) {
      self.chart.addSeries(s);
    });
    self.chart.redraw();
  };

  this.draw = function (options, callback) {
    self.chartOptions = joola.common._mixin({}, self.options.chart);
    self.options.$container.empty();
    self.options.$container.append(self.options.template || self.template());
    self.options.$container.find('.caption').text(self.options.caption || '');

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
        type: 'pie',
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

      legend: {enabled: false},
      credits: {enabled: false},
      exporting: {enabled: true},
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
    $.fn.Pie = function (options, callback) {
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
        if (!options)
          options = {};
        options.container = this.get(0);
        result = new joola.viz.Pie(options, function (err, pie) {
          if (err)
            throw err;
          pie.draw(options, callback);
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

util.inherits(Pie, events.EventEmitter);