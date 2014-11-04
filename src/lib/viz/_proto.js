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

  ce = require('cloneextend'),
  moment = require('moment'),
  _ = require('underscore');

var proto = exports;
proto._id = '_proto';

proto.stop = function () {
  if (this.realtimeQueries) {
    this.realtimeQueries.forEach(function (q) {
      joola.logger.debug('Stopping realtime query [' + q + '].');
      joola.query.stop(q);
    });
  }
};

proto.destroy = function (container, obj) {
  if (this.realtimeQueries) {
    this.realtimeQueries.forEach(function (q) {
      joola.logger.debug('Stopping realtime query [' + q + '].');
      joola.query.stop(q);
    });
  }
  this.chartDrawn = false;
  this.drawn = false;
  this.options.$container.empty();
};

proto.markContainer = function (container, attr, callback) {
  if (!callback)
    callback = function () {
    };

  try {
    container.attr('jio-domain', 'joola');
    attr = attr.attr || attr;
    attr.forEach(function (a) {
      Object.keys(a).forEach(function (key) {
        if (key === 'css')
          container.addClass(a[key]);
        else
          container.attr('jio-' + key, a[key]);
      });
    });
  }
  catch (ex) {
    return callback(ex);
  }
  return callback(null);
};

proto.get = function (key) {
  return this.options[key];
};

proto.set = function (key, value) {
  this.options[key] = value;
};

proto.verify = function (options, callback) {
  if (!options.container)
    return callback(new Error('no container specified.'));

  var $container = $(options.container);
  if ($container === null)
    return callback(new Error('cannot find container [' + options.container + '].'));

  return callback(null);
};

proto.fetch = function (context, query, callback) {
  if (!callback && context && query) {
    callback = query;
    query = context;
  }
  var _query = ce.clone(query);
  if (!Array.isArray(_query)) {
    if (context && context.options && context.options.canvas) {
      context.options.query.interval = context.options.query.interval || context.options.canvas.options.query.interval;
      context.options.query.timeframe = context.options.query.timeframe || context.options.canvas.options.query.timeframe;
    }
  }
  else {
    if (context && context.options && context.options.canvas) {
      context.options.query[0].interval = context.options.query[0].interval || context.options.canvas.options.query.interval;
      context.options.query[0].timeframe = context.options.query[0].timeframe || context.options.canvas.options.query.timeframe;
    }
  }
  //adjust offset
  if (_query.timeframe && typeof _query.timeframe === 'object') {
    _query.timeframe.start.setHours(_query.timeframe.start.getHours() + joola.timezone(joola.options.timezoneOffset));
    _query.timeframe.end.setHours(_query.timeframe.end.getHours() + joola.timezone(joola.options.timezoneOffset));
  }

  var args = [];
  if (_query.authContext)
    args.push(_query.authContext);
  args.push(_query);
  args.push(function (err, message) {
    if (err)
      return callback(err);

    if (message && message.query && message.query.ts && message.query.ts.duration)
      joola.logger.debug('fetch took: ' + message.query.ts.duration.toString() + 'ms, results: ' + (message && message.documents ? message.documents.length.toString() : 'n/a'));

    return callback(null, message);
  });

  joola.query.apply(this, args);
};

proto.makeChartTimelineSeries = function (message) {
  if (message[0].metrics.length === 0) {
    return [
      {
        type: 'line',
        name: 'no data',
        data: []
      }
    ];
  }

  /*
   function fixOffset(date) {
   var _date = new Date(date);
   _date.setHours(_date.getHours() + (2 * moment().zone() / 60));
   return new Date(_date);
   }

   var exist = _.find(dimensions, function (d) {
   return d.datatype === 'date';
   });
   */
  var yAxis = [null, null];
  var series = [];
  var seriesIndex = -1;
  message.forEach(function (result, resultIndex) {
    var dimensions = result.dimensions;
    var metrics = result.metrics;
    var documents = result.documents;
    if (!metrics)
      return series;
    metrics.forEach(function (metric, index) {
      var _yaxis = 0;
      yAxis[index % 2] = yAxis [index % 2] || metric._key || metric.key;
      if (yAxis[0] === (yAxis [index % 2] || metric._key || metric.key))
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
        color: joola.colors[seriesIndex ]
      };
      documents.forEach(function (document, docIndex) {
        var x = document.fvalues[dimensions[0].key];
        var nameBased = true;
        if (dimensions[0].datatype === 'date') {
          x = new Date(document.fvalues[dimensions[0].key]);
          nameBased = false;
        }

        if (nameBased) {
          series[seriesIndex].data.push({
            name: x,
            y: document.values[metrics[index].key] ? document.values[metrics[index].key] : 0
          });
        }
        else {
          if (seriesIndex === 0) {
            series[seriesIndex].data.push({
              x: x,
              y: document.values[metrics[index].key] ? document.values[metrics[index].key] : 0
            });
          }
          else {
            series[seriesIndex].data.push({
              x: series[0].data[docIndex].x,
              y: document.values[metrics[index].key] ? document.values[metrics[index].key] : 0
            });
          }
        }
      });
    });
  });

  return series;
};

proto.makePieChartSeries = function (dimensions, metrics, documents) {
  var series = [];
  if (!metrics)
    return series;

  metrics.forEach(function (metric, index) {
    series[index] = {
      name: metric.name,
      data: []
    };

    documents.forEach(function (document) {
      series[index].data.push([
          document.fvalues[dimensions[0].key],
          document.values[metrics[index].key] ? document.values[metrics[index].key] : 0
        ]
      );
    });
  });

  return series;
};

proto.makeTableChartSeries = function (dimensions, metrics, documents) {
  var series = [];
  if (!metrics)
    return series;

  //metrics.forEach(function (metric, index) {
  series[0] = {
    //name: metric.name,
    data: []
  };

  documents.forEach(function (document) {
    var point = [];
    dimensions.forEach(function (d) {
      point.push(document.fvalues[d.key]);
    });
    metrics.forEach(function (m) {
      point.push(document.fvalues[m.key] ? document.fvalues[m.key] : 0);
    });
    series[0].data.push(point);
  });

  return series;
};

//
//};

proto.makeGeoSeries = function (dimensions, metrics, documents) {
  var results = [];
  results.push(['Country', metrics[0].name]);

  if (dimensions[0].datatype == 'ip') {
    documents.forEach(function (document) {
      if (document.fvalues[dimensions[0].key] && document.fvalues[dimensions[0].key] != '(not set)')
        results.push([document.fvalues[dimensions[0].key].country, document.fvalues[metrics[0].key]]);
    });
  }
  else
    return results;

  return google.visualization.arrayToDataTable(results);
};

proto.baseHTML = function (callback) {
  return callback(null, '<br/>');
};

proto.onError = function (err, callback) {
  if (err && err.message)
    joola.logger.error(err.message);
  else
    joola.logger.error(err);
  return callback(err);
};

proto.find = function (obj) {

};

