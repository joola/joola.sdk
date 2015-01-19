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
  async = require('async'),
  ce = require('cloneextend'),
  _ = require('underscore'),
  $$ = require('jquery');

var viz = exports;
viz._id = 'viz';

//pickers
viz.DatePicker = require('./DatePicker');
viz.MetricPicker = require('./MetricPicker');
viz.DimensionPicker = require('./DimensionPicker');
viz.FilterBox = require('./FilterBox');
//panels
viz.Canvas = require('./Canvas');

//charts
viz.Sparkline = require('./Sparkline');
viz.Metric = require('./Metric');
viz.Geo = require('./Geo');
viz.Pie = require('./Pie');
viz.MiniTable = require('./MiniTable');
viz.BarTable = require('./BarTable');
viz.PunchCard = require('./PunchCard');
viz.Table = require('./Table');
viz.Timeline = require('./Timeline');

//onscreen
viz.onscreen = [];

viz.markContainer = function (container, attr) {
  container = $$(container);
  container.attr('jio-domain', 'joola');
  attr = attr.attr || attr;
  attr.forEach(function (a) {
    Object.keys(a).forEach(function (key) {
      if (key === 'css' && a[key]) {
        var currentClasses = container.attr('class');
        container.attr('class', currentClasses + ' ' + a[key]);
      }
      else
        container.attr('jio-' + key, a[key]);
    });
  });
};

viz.initialize = function (self, options, callback) {
  joola.common.mixin(self.options, options, true);
  var verified = self.verify.apply(self);
  if (verified !== null)
    throw new Error(verified);
  if (!self.initialized) {
    viz.markContainer(self.options.container, [
      {type: self.type},
      {uuid: self.uuid},
      {css: self.options.css || null}
    ]);
    self.options.$container = $$(self.options.container);
    if (self.options.canvas) {
      self.options.canvas.addVisualization(self);
      //subscribe to default events
      self.options.canvas.setMaxListeners(100);
      self.options.canvas.on('datechange', function (dates) {
        if (!self.options)
          return;
        if (!self.options.query)
          return;
        //let's change our query and fetch again
        self.options.query = ce.clone(self.options.canvas.prepareQuery(self.options.query[0], dates));
        viz.destroy(self, {loading: true});
        return viz.initialize(self, self.options);
      });

      self.options.canvas.on('filterchange', function () {
        if (!self.options)
          return;
        if (!self.options.query)
          return;

        self.options.query.forEach(function (query) {
          if (!query.filters)
            query.filter = [];
          self.options.canvas.options.filters.forEach(function (f) {
            f.filters.forEach(function (f2) {
              query.filter.push(f2);
            });
          });
        });
        viz.destroy(self, {loading: true});
        return viz.initialize(self, self.options);
      });
    }
  }
  if (self.options.query) {
    //console.log('qqq', self.options.query);
    viz.fetch(self, self.options.query, function () {
      if (callback && typeof callback === 'function')
        return callback(null, self);
    });
  }

  return self;
};

viz.lookup = function (base, key) {
  if (!base)
    return null;
  var result = _.filter(base, function (item) {
    return item.key === key;
  });
  if (result.length === 0)
    return null;
  return result[0];
};

viz.lookupDate = function (base, index) {
  return base[index];
};

viz.fetch = function (context, query, callback) {
  if (!context.realtimeQueries)
    context.realtimeQueries = [];
  if (!callback && context && query) {
    callback = query;
    query = context;
  }
  var _query = ce.clone(query);
  viz.stop(context, function () {
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
      if (_query.timeframe.start)
        _query.timeframe.start.setHours(_query.timeframe.start.getHours() + joola.timezone(joola.options.timezoneOffset));
      if (_query.timeframe.end)
        _query.timeframe.end.setHours(_query.timeframe.end.getHours() + joola.timezone(joola.options.timezoneOffset));
    }
    var args = [];
    if (_query.authContext)
      args.push(_query.authContext);
    args.push(_query);
    args.push(function (err, messages) {
      if (err)
        return callback(err);
      if (!Array.isArray(messages))
        messages = [messages];

      if (context.reply)
        context.reply(messages, context.data);

      messages.forEach(function (message, mindex) {
        if (!context.data)
          context.data = [];
        var _data = [];
        if (context.data[mindex]) {
          _data = context.data[mindex];
          _data.forEach(function (item) {
            item.state = 'exit';
          });
        }
        if (message && message.query && message.query.ts && message.query.ts.duration)
          joola.logger.debug('fetch took: ' + message.query.ts.duration.toString() + 'ms, results: ' + (message && message.documents ? message.documents.length.toString() : 'n/a'));
        if (message.query.realtimeUID && context.realtimeQueries.indexOf(message.query.realtimeUID) == -1)
          context.realtimeQueries.push(message.query.realtimeUID);
        message.documents.forEach(function (doc, docindex) {
          doc = {
            dimensions: {},
            metrics: {},
            meta: {},
            raw: ce.clone(doc),
            state: 'enter',
            type: message.query.type,
            realtime: message.query.realtime
          };
          var key = '';
          message.dimensions.forEach(function (d) {
            key += doc.raw[d.key];
            doc.dimensions[d.key] = doc.raw[d.key];
            doc.meta[d.key] = d;
          });
          message.metrics.forEach(function (m) {
            doc.metrics[m.key] = doc.raw[m.key];
            doc.meta[m.key] = m;
          });
          doc.key = joola.common.hash(key);
          //lookup key
          var exist = viz.lookup(_data, doc.key);
          if (exist) {
            var dirty = false;
            Object.keys(exist.metrics).forEach(function (key) {
              if (exist.metrics[key] !== doc.metrics[key]) {
                dirty = true;
                exist.metrics[key] = doc.metrics[key];
              }
            });
            if (dirty)
              exist.state = 'update';
            else
              exist.state = 'static';
          }
          else {
            _data.push(doc);
          }
        });
        context.data[mindex] = _data;
      });

      var handled = [];
      context.data[0].forEach(function (data, pointIndex) {
        handled.push(data.key);
        var point = [data];
        var paired = {
          missing: true,
          meta: point.meta
        };
        if (context.data.length === 2) {
          //find the pair
          if (Object.keys(data.dimensions).length === 1 && data.dimensions.timestamp) {
            paired = context.data[1][pointIndex] || paired;
          }
          else {
            paired = _.find(context.data[1], function (item) {
              return item.key === data.key;
            }) || paired;
          }
          if (paired || context.data.length > 1)
            point = [data, paired];
        }
        if (data.state === 'enter' || paired.state === 'enter') {
          if (context.options.enter)
            context.options.enter.apply(context, [point, context.data]);
          context.enter(point, context.data);
        }
        else if (data.state === 'update' || paired.state === 'update') {
          if (context.options.update)
            context.options.update.apply(context, [point, context.data]);
          context.update(point, context.data);
        }
        else if (data.state === 'exit' || paired.state === 'exit') {
          context.data[0].splice(pointIndex, 1);
          if (context.options.exit)
            context.options.exit.apply(context, [point, context.data]);
          context.exit(point, context.data);
        }
      });
      if (context.data.length > 1) {
        context.data[1].forEach(function (data, pointIndex) {
          if (handled.indexOf(data.key) === -1) {
            var paired = data;
            var point = [
              {
                missing: true,
                meta: paired.meta
              },
              data
            ];

            if (data.state === 'enter' || paired.state === 'enter') {
              if (context.options.enter)
                context.options.enter.apply(context, [point, context.data]);
              context.enter(point, context.data);
            }
            else if (data.state === 'update' || paired.state === 'update') {
              if (context.options.update)
                context.options.update.apply(context, [point, context.data]);
              context.update(point, context.data);
            }
            else if (data.state === 'exit' || paired.state === 'exit') {
              context.data[1].splice(pointIndex, 1);
              if (context.options.exit)
                context.options.exit.apply(context, [point, context.data]);
              context.exit(point, context.data);
            }
          }
        });
      }
      if (context.options.done)
        context.options.done.apply(context, context.data);
      if (context.done)
        context.done(context.data, messages);
      return callback(null, context.data);
    });

    //console.log('q', args);
    joola.query.fetch.apply(context, args);
  });
};

viz.stop = function (self, callback) {
  if (!callback)
    callback = function () {
    };
  if (self.realtimeQueries) {
    async.map(self.realtimeQueries, function (q, callback) {
      joola.logger.debug('Stopping realtime query [' + q + '].');
      joola.query.stop(q, callback);
    }, function (err) {
      if (err)
        return callback(err);
      return callback(null);
    });
  }
  else
    return callback(null);
};

viz.destroy = function (self, vizOptions) {
  if (self.realtimeQueries) {
    self.realtimeQueries.forEach(function (q) {
      joola.logger.debug('Stopping realtime query [' + q + '].');
      joola.query.stop(q);
    });
  }
  self.initialized = false;
  self.data = [];
  self.destroy();
  self.draw(vizOptions);
  self.initialized = true;
};

//this is a magic function for picking up namespace'd items
/*
 joola.on('ready', function (err) {
 if (err)
 return;

 Object.keys(joola.viz).forEach(function (key) {
 var visualization = joola.viz[key];
 var joola_elements = $$('joola\\:' + key.toLowerCase());
 if (joola_elements.length > 0) {
 $.each(joola_elements, function (index, element) {
 var $element = $$(element);
 //check not nested under a canvas
 if ($element.parents('joola\\:canvas').length === 0) {
 var attributes = $element.get(0).attributes;
 var options = {
 container: $element
 };
 for (var i = 0; i < attributes.length; i++) {
 var attribute = attributes[i];

 var value = null;
 try {
 value = JSON.parse(attribute.value);
 }
 catch (ex) {
 try {
 value = JSON.parse(attribute.value.replace(/\'/ig, '"'));
 }
 catch (ex2) {
 value = attribute.value;
 }
 }
 joola.common.flatGetSet(options, attribute.name, value);
 }
 new visualization(options);
 }
 });
 }
 });
 });*/