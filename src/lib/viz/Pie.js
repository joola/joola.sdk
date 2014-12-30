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
    return this._super.fetch(this.options.query, function (err, message) {
      if (err) {
        if (typeof callback === 'function')
          return callback(err);

        return;
      }

      if (message.realtime && self.realtimeQueries.indexOf(message.realtime) == -1)
        self.realtimeQueries.push(message.realtime);

      var series = self._super.makePieChartSeries(message.dimensions, message.metrics, message.documents);
      if (!self.chartDrawn) {
        if (self.options.onDraw)
          window[self.options.onDraw](self);
        self.options.$container.append(self.options.template || Pie.template());
        self.options.$container.find('.caption').text(self.options.caption || '');
        var chartOptions = joola.common._mixin({
          title: {
            text: null
          },
          chart: {
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
            backgroundColor: 'transparent'
          },
          series: series,

          legend: {enabled: self.options.legend},
          credits: {enabled: false},
          exporting: {enabled: true},
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false,
                color: '#000000',
                connectorColor: '#000000',
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
              },
              showInLegend: true
            }
          }
        }, self.options.chart);
        if (self.options.caption)
          self.options.$container.find('.jio-pie-caption').text(self.options.caption);
        self.chart = self.options.$container.find('.jio-pie-chart').highcharts(chartOptions);

        self.chart = self.chart.highcharts();
        self.chartDrawn = true;
        if (typeof callback === 'function')
          return callback(null);
      }
      else if (self.options.query.realtime) {
        if (self.options.onUpdate)
          window[self.options.onUpdate](self);
        //we're dealing with realtime
        series.forEach(function (ser, serIndex) {
          self.chart.series[serIndex].points.forEach(function (point) {
            var exist = _.find(ser.data, function (p) {
              return p[0] == point.name;
            });
            if (exist)
              point.update(exist[1], false);
            else
              point.remove(false);
          });
          ser.data.forEach(function (point) {
            var exist = _.find(self.chart.series[serIndex].points, function (p) {
              return p.name == point[0];
            });
            if (!exist)
              self.chart.series[serIndex].addPoint([point[0], point[1]], false, false);
          });
        });
        self.chart.redraw();
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
      self.markContainer(self.options.$container, {
        attr: [
          {'type': 'pie'},
          {'uuid': self.uuid},
          {css: self.options.css}
        ],
        css: self.options.css}, function (err) {
        if (err)
          return callback(err);

        joola.viz.onscreen.push(self);

        joola.events.emit('pie.init.finish', self);
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

Pie.template = function (options) {
  var html = '<div jio-domain="joola" jio-type="pie">\n' +
    '  <div class="jio-pie-caption"></div>\n' +
    '  <div class="jio-pie-chart"></div>\n' +
    '</div>';
  return html;
};
