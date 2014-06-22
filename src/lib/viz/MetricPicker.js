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
var MetricPicker = module.exports = function (options, callback) {
  if (!callback)
    callback = function () {
    };
  joolaio.events.emit('metricpicker.init.start');

  //mixin
  this._super = {};
  for (var x in require('./_proto')) {
    this[x] = ce.clone(require('./_proto')[x]);
    this._super[x] = ce.clone(require('./_proto')[x]);
  }

  var self = this;

  this._id = 'metricpicker';
  this.uuid = joolaio.common.uuid();
  this.options = {
    canvas: null,
    container: null,
    $container: null,
    metrics: [],
    selected: null
  };
  this.drawn = false;

  this.verify = function (options, callback) {
    return this._super.verify(options, callback);
  };

  this.template = function () {
    var $html = $('' +
      '<div class="jio-metricpicker-wrapper">\n' +
      '  <button class="btn jio-metricpicker-button"></button>' +
      '  <div class="clear"></div>' +
      '</div>\n');

    //<div class="metricscontainer" style="display: block;"><div></div><div class="search input-prepend"><input type="text" class="quicksearch span2"><span class="add-on"><i class="searchicon icon-search"></i></span></div><ul class="categorylist"><li class="node  level_0 on" style="padding-left: 0px; background-image: none;"><div class="category" style="display: none;">undefined</div><ul class="jcontainer on"><li class="node leaf level_1" data-metricname="Bet Count" data-metricid="gamerounds.betcount" style="display: list-item;"><div class="box"><div class="keyvaluepair"><div class="key">Bet Count</div><div class="help"> <i class="tipsy icon-question-sign icon-white" data-toggle="tooltip" data-caption="Bet Count" data-text="Total bets placed. [actual]: sum(gr_betcount)." title=""></i> </div></div></div></li><li class="node leaf level_1" data-metricname="Losing Bets Count" data-metricid="gamerounds.losingbets" style="display: list-item;"><div class="box"><div class="keyvaluepair"><div class="key">Losing Bets Count</div><div class="help"> <i class="tipsy icon-question-sign icon-white" data-toggle="tooltip" data-caption="Losing Bets Count" data-text="Total number of losing bets. [actual]: case when gr_winlose = 0 then 1 else 0 end" title=""></i> </div></div></div></li><li class="node leaf level_1" data-metricname="Winning Bets Count" data-metricid="gamerounds.winningbets" style="display: list-item;"><div class="box"><div class="keyvaluepair"><div class="key">Winning Bets Count</div><div class="help"> <i class="tipsy icon-question-sign icon-white" data-toggle="tooltip" data-caption="Winning Bets Count" data-text="Total number of winning bets. [actual]: case when gr_winlose = 1 then 1 else 0 end" title=""></i> </div></div></div></li><li class="node leaf level_1" data-metricname="Session Count" data-metricid="gamesessions.sessioncount" style="display: list-item;"><div class="box"><div class="keyvaluepair"><div class="key">Session Count</div><div class="help"> <i class="tipsy icon-question-sign icon-white" data-toggle="tooltip" data-caption="Session Count" data-text="Total Sessions. [actual]: sum(1) as sessioncount, this will count all valid gamesessions." title=""></i> </div></div></div></li><li class="node leaf level_1 on" data-metricname="Player Count" data-metricid="calc.playercount" style="display: list-item;"><div class="box"><div class="keyvaluepair"><div class="key">Player Count</div><div class="help"> <i class="tipsy icon-question-sign icon-white" data-toggle="tooltip" data-caption="Player Count" data-text="Number of unique players. [actual]: For all valid sessions take the number of unique players who played." title=""></i> </div></div></div></li><li class="node leaf level_1" data-metricname="Bet Count / Session" data-metricid="calc.betspersession" style="display: list-item;"><div class="box"><div class="keyvaluepair"><div class="key">Bet Count / Session</div><div class="help"> <i class="tipsy icon-question-sign icon-white" data-toggle="tooltip" data-caption="Bet Count / Session" data-text="Average number of bets per session. [actual]: betcount / sessioncount" title=""></i> </div></div></div></li><li class="node leaf level_1" data-metricname="Bet Count / Player" data-metricid="calc.betsperplayer" style="display: list-item;"><div class="box"><div class="keyvaluepair"><div class="key">Bet Count / Player</div><div class="help"> <i class="tipsy icon-question-sign icon-white" data-toggle="tooltip" data-caption="Bet Count / Player" data-text="Average number of bets per session. [actual]: betcount / playercount" title=""></i> </div></div></div></li></ul></li></ul></div>

    return $html;
  };

  this.draw = function (options, callback) {
    if (!self.drawn) {
      self.options.$container.append(self.options.template || self.template());

      if (typeof callback === 'function')
        return callback(null, self);
    }
    else {

    }

    if (self.options.selected)
      self.options.$container.find('.jio-metricpicker-button').html((self.options.selected.name || self.options.selected.key || self.options.selected) + '<span class="caret"></span>');
    else
      self.options.$container.find('.jio-metricpicker-button').html('Choose a metric...' + '<span class="caret"></span>');
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
          {'type': 'metricpicker'},
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
        }

        joolaio.events.emit('metricpicker.init.finish', self);
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
    $.fn.MetricPicker = function (options, callback) {
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
        result = new joolaio.viz.MetricPicker(options, function (err, metricpicker) {
          if (err)
            throw err;
          metricpicker.draw(options, callback);
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

MetricPicker.template = function (options) {
  var html = '<div id="example" jio-domain="joolaio" jio-type="table" jio-uuid="25TnLNzFe">\n' +
    '  <div class="jio metricbox caption"></div>\n' +
    '  <div class="jio metricbox value"></div>\n' +
    '</div>';
  return html;
};

MetricPicker.meta = {
  key: 'metricpicker',
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
  template: MetricPicker.template(),
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