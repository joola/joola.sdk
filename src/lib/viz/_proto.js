/**
 *  @title joola.io
 *  @overview the open-source data analytics framework
 *  @copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 **/


var
  ce = require('cloneextend'),
  moment = require('moment'),
  _ = require('underscore');

var proto = exports;
proto._id = '_proto';

proto.stop = function () {
  if (this.realtimeQueries) {
    this.realtimeQueries.forEach(function (q) {
      joolaio.logger.debug('Stopping realtime query [' + q + '].');
      joolaio.query.stop(q);
    });
  }
};

proto.destroy = function (container, obj) {
  if (this.realtimeQueries) {
    this.realtimeQueries.forEach(function (q) {
      joolaio.logger.debug('Stopping realtime query [' + q + '].');
      joolaio.query.stop(q);
    });
  }
  this.drawn = false;
  this.options.$container.empty();
};

proto.markContainer = function (container, options, callback) {
  if (!callback)
    callback = function () {
    };

  var attr;
  if (options.attr)
    attr = options.attr;
  else
    attr = options;

  try {
    container.attr('jio-domain', 'joolaio');

    attr.forEach(function (a) {
      Object.keys(a).forEach(function (key) {
        container.attr('jio-' + key, a[key]);
      });
    });

    if (options.css) {
      container.addClass(options.css);
    }

    container.data('this', this);

    return callback(null);
  }
  catch (ex) {
    console.log(ex);
    return callback(ex);
  }
};

proto.get = function (key) {
  return this.options[key];
};

proto.set = function (key, value) {
  this.options[key] = value;
};

proto.verify = function (options, callback) {
  if (!options.container)
    return callback(new Error('no container specified..'));

  var $container = $(options.container);
  if ($container === null)
    return callback(new Error('cannot find container.'));

  return callback(null);
};

proto.fetch = function (context, query, callback) {
  if (!callback && context && query) {
    callback = query;
    query = context;
  }
  var _query = ce.clone(query);

  if (context && context.options && context.options.canvas) {
    context.options.query.interval = context.options.query.interval || context.options.canvas.options.query.interval;
    context.options.query.timeframe = context.options.query.timeframe || context.options.canvas.options.query.timeframe;
  }

  //adjust offset
  if (_query.timeframe && typeof _query.timeframe === 'object') {
    _query.timeframe.start.setHours(_query.timeframe.start.getHours() + joolaio.timezone(joolaio.options.timezoneOffset));
    _query.timeframe.end.setHours(_query.timeframe.end.getHours() + joolaio.timezone(joolaio.options.timezoneOffset));
  }

  var args = [];
  if (_query.authContext)
    args.push(_query.authContext);
  args.push(_query);
  args.push(function (err, message) {
    if (err)
      return callback(err);

    if (message && message[0] && message[0].query && message[0].query.ts && message[0].query.ts.duration)
      joolaio.logger.debug('fetch took: ' + message[0].query.ts.duration.toString() + 'ms, results: ' + (message[0] && message[0].documents ? message[0].documents.length.toString() : 'n/a'));

    return callback(null, message);
  });

  joolaio.query.fetch.apply(this, args);
};

proto.makeChartTimelineSeries = function (dimensions, metrics, documents, chart) {
  var series = [];
  if (!metrics)
    return series;

  function fixOffset(date) {
    var _date = new Date(date);
    _date.setHours(_date.getHours() + (2 * moment().zone() / 60));
    return new Date(_date);
  }

  var exist = _.find(dimensions, function (d) {
    return d.datatype === 'date';
  });

  metrics.forEach(function (metric, index) {
    var defaultAxis = {
      endOnTick: false,
      title: {
        text: metric.name
      },
      labels: {
        enabled: true,
        style: {
          color: '#b3b3b1'
        }
      },
      gridLineDashStyle: 'Dot',
      opposite: false
    };
    if (chart.options.yAxis.length <= index) {
      chart.addAxis(defaultAxis, false, false, false);
    }
    series[index] = {
      name: metric.name,
      data: [],
      yAxis: index,
      turboThreshold: documents.length + 10
    };

    documents.forEach(function (document) {
      var x = document.fvalues[dimensions[0].key];
      var nameBased = true;
      if (dimensions[0].datatype === 'date') {
        x = new Date(document.fvalues[dimensions[0].key]);
        nameBased = false;
      }

      if (nameBased) {
        series[index].data.push({
          name: x,
          y: document.values[metrics[index].key] ? document.values[metrics[index].key] : 0
        });
      }
      else {
        series[index].data.push({
          x: x,
          y: document.values[metrics[index].key] ? document.values[metrics[index].key] : 0
        });
      }
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
    joolaio.logger.error(err.message);
  else
    joolaio.logger.error(err);
  return callback(err);
};

proto.find = function (obj) {

};

