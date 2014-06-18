/**
 *  @title joola.io
 *  @overview the open-source data analytics framework
 *  @copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 **/

var ce = require('cloneextend');
var Metric = module.exports = function (options, callback) {
  if (!callback)
    callback = function () {
    };
  joolaio.events.emit('metric.init.start');

  //mixin
  this._super = {};
  for (var x in require('./_proto')) {
    this[x] = ce.clone(require('./_proto')[x]);
    this._super[x] = ce.clone(require('./_proto')[x]);
  }

  var self = this;

  this._id = '_metric';
  this.uuid = joolaio.common.uuid();
  this.options = {
    canvas: null,
    legend: true,
    container: null,
    $container: null,
    query: null
  };
  this.drawn = false;

  this.verify = function (options, callback) {
    return this._super.verify(options, callback);
  };

  this.template = function () {
    var $html = $('<div class="jio metricbox caption"></div>' +
      '<div class="jio metricbox value"></div>');
    return $html;
  };

  this.draw = function (options, callback) {
    this.options.query.dimensions = [];
    this.options.query.metrics = this.options.query.metrics.splice(0, 1);
    return this._super.fetch(this.options.query, function (err, message) {
      if (err) {
        if (typeof callback === 'function')
          return callback(err);
        //else
        //throw err;

        return;
      }
      message = message[0];
      var value;
      if (message.documents && message.documents.length > 0)
        value = message.documents[0].fvalues[message.metrics[0].key];
      else
        value = 0;

      if (!value)
        value = 0;

      /*
       var decimals = 2;
       if (message.metrics[0].decimals)
       decimals = message.metrics[0].decimals
       value = Math.round(value * (Math.pow(10, decimals))) / (Math.pow(10, decimals));
       */
      if (!self.drawn) {
        self.options.$container.append(self.options.template || self.template());
        self.options.$container.find('.caption').text(self.options.caption || '');
        self.drawn = true;

        self.options.$container.find('.value').text(value);
        if (typeof callback === 'function')
          return callback(null, self);
      }
      else if (self.options.query.realtime) {
        //we're dealing with realtime
        self.options.$container.find('.value').text(value);
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
          {'type': 'metric'},
          {'uuid': self.uuid}
        ],
        css: self.options.css
      }, function (err) {
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
          self.options.canvas.on('datechange', function (e) {
            console.log('metric', 'datechange', e);
          });
        }

        joolaio.events.emit('metric.init.finish', self);

        //if (self.options.query) {
        //  return self.draw(options, callback);
        //}
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
    $.fn.Metric = function (options, callback) {
      if (!options)
        options = {force: false};
      else if (!options.hasOwnProperty('force'))
        options.force = true;
      var result = null;
      var uuid = this.attr('jio-uuid');
      if (!uuid || (options && options.force)) {
        if (options && options.force && uuid) {
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
        result = new joolaio.viz.Metric(options, function (err, metric) {
          if (err)
            throw err;
          metric.draw(options, callback);
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

    /*
     joolaio.events.on('core.ready', function () {
     if (typeof (jQuery) != 'undefined') {
     $.find('.jio.metric').forEach(function (container) {
     var $container = $(container);

     var caption = $container.attr('data-caption') || '';
     var timeframe = $container.attr('data-timeframe');
     var metrics = $container.attr('data-metrics');
     metrics = eval("(" + metrics + ')');

     var query = {
     timeframe: timeframe,
     metrics: [metrics]
     };
     $container.Metric({caption: caption, query: query});
     });
     }
     });
     */
  }
});

Metric.template = function (options) {
  var html = '<div id="example" jio-domain="joolaio" jio-type="table" jio-uuid="25TnLNzFe">\n' +
    '  <div class="jio metricbox caption"></div>\n' +
    '  <div class="jio metricbox value"></div>\n' +
    '</div>';
  return html;
};

Metric.meta = {
  key: 'metricbox',
  jQueryTag: 'Metric',
  title: 'Metric Box',
  tagline: '',
  description: '' +
    'Metric Boxes...',
  longDescription: '',
  example: {
    css: 'width:100%',
    options: {
      caption: 'Mouse moves (last month)',
      template: '<div class="jio metricbox value"></div><div class="jio metricbox caption"></div>',
      query: {
        timeframe: 'last_month',
        interval: 'day',
        metrics: ['mousemoves'],
        collection: 'demo-mousemoves',
        "realtime": true
      }
    },
    draw: '$("#example").Metric(options);'
  },
  template: Metric.template(),
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
      description: '`required` contains the <a href="/data/query">query</a> object.'
    }
  },
  metaMethods: {
    init: {
      signature: '.init(options)',
      description: 'Initialize the visualization with a set of `options`.',
      example: '$(\'#visualization\').init(options);'
    },
    update: {
      signature: '.update(options)',
      description: 'Update an existing visualization with a set of `options`.',
      example: '$(\'#visualization\').update(options);'
    },
    destroy: {
      signature: '.destroy()',
      description: 'Destroy the visualization.',
      example: '$(\'#visualization\').destroy();'
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
      description: 'Selection changed, metric box clicked.'
    }
  }
};