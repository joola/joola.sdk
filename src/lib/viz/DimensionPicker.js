/**
 *  @title joola
 *  @overview the open-source data analytics framework
 *  @copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 **/

var ce = require('cloneextend');
var
  EventEmitter2 = require('eventemitter2').EventEmitter2;

var DimensionPicker = module.exports = function (options, callback) {
  if (!callback)
    callback = function () {
    };
  joola.events.emit('dimensionpicker.init.start');

  //mixin
  this._super = {};
  for (var x in require('./_proto')) {
    this[x] = ce.clone(require('./_proto')[x]);
    this._super[x] = ce.clone(require('./_proto')[x]);
  }

  var self = this;
  self.events = new EventEmitter2({wildcard: true, newListener: true});

  self.on = self.events.on;
  self.emit = self.events.emit;

  this._id = 'dimensionpicker';
  this.uuid = joola.common.uuid();
  this.options = {
    canvas: null,
    container: null,
    $container: null,
    dimensions: [],
    selected: null
  };
  this.drawn = false;

  this.verify = function (options, callback) {
    return this._super.verify(options, callback);
  };

  this.template = function () {
    var $html = $('' +
      '<div class="jio-dimensionpicker-wrapper">\n' +
      '  <button class="btn jio-dimensionpicker-button"></button>' +
      '  <button class="close">×</button>' +
      '  <div class="jio-dimensionpicker-container">' +
      '    <div class="search input-prepend"><input type="text" class="quicksearch" placeholder="Search..."><span class="add-on"><i class="searchicon icon-search"></i></span></div>' +
      '    <div class="clear"></div>' +
      '  </div>' +
      '  <div class="clear"></div>' +
      '</div>\n');

    if (this.options.fixed) {
      $html.find('.close').remove();
    }

    return $html;
  };

  this.draw = function (options, callback) {
    if (!self.drawn) {
      self.options.$container.append(self.options.template || self.template());
      var $ul = $(self.options.$container.find('.jio-dimensionpicker-container'));
      var $btn = $(self.options.$container.find('.jio-dimensionpicker-button'));
      var $close = $(self.options.$container.find('.close'));
      var $search = $(self.options.$container.find('.quicksearch'));
      if (self.options.dimensions.length === 0)
        joola.dimensions.list(function (err, list) {
          console.log('done', err, list);
          if (err)
            throw err;

          var mOpen = false;
          var mSkipOne = false;
          var mlasttarget = null;

          list.forEach(function (dimension) {
            var collection = {key: dimension.collection};

            var $li = $('<div class="dimensionOption" data-member="' + collection.key + '.' + dimension.key + '">' + dimension.name + '</div>');
            $li.off('click');
            $li.on('click', function (e) {
              var $this = $(this);
              e.stopPropagation();

              if ($this.hasClass('disabled'))
                return;

              self.options.selected = dimension;
              var $content = dimension.name;
              $btn.html($content);
              $btn.removeClass('active');
              $ul.removeClass('active');
              mOpen = false;
              mlasttarget = null;

              self.markSelected();

              self.emit('change', dimension);
            });
            $ul.append($li);
          });

          $close.on('click', function (e) {
            self.options.selected = null;
            self.markSelected();
            self.emit('change', null);
          });

          $search.keyup(function () {
            var $this = $(this);
            var val = $this.val();
            if (val.length >= 2) {
              $ul.find('div[data-member]').hide();
              $ul.find('div[data-member*="' + val + '"]').show();
            }
            else
              $ul.find('div[data-member]').show();
          });

          $btn.on('click', function (e) {
            var $this = $(this);
            e.stopPropagation();

            if (mOpen && mlasttarget == this.id) {
              $ul.removeClass('active');
              mlasttarget = null;
              mOpen = false;
            }
            else if (mSkipOne) {
              $ul.removeClass('active');
              mlasttarget = null;
              mOpen = false;
              mSkipOne = false;
            }
            else {
              $ul.addClass('active');
              mlasttarget = this.id;
              mOpen = true;
            }
            var offset = $btn.position();
            $ul.css('top', offset.top + $btn.outerHeight() - 1);
            $ul.css('left', offset.left);
            $ul.find('ul.active').removeClass('active');

            $ul.attr('data-target', this.id);

            //set selected
            self.markSelected();
          });

          $ul.on('click', function (e) {
            e.stopPropagation();
          });
          $('body').on('click', function () {
            $btn.removeClass('active');
            $ul.removeClass('active');
            mlasttarget = null;
            mOpen = false;
          });

          $btn.on('click', function () {
            var $this = $(this);
            $this.toggleClass('active');
          });

          if (typeof callback === 'function')
            return callback(null, self);
        });
      else {
        if (typeof callback === 'function')
          return callback(null, self);
      }
    }
    else {

    }

    self.markSelected = function () {
      $ul.find('div').removeClass('active');
      if (self.options.selected) {
        $ul.find('div[data-member="' + self.options.selected.collection + '.' + self.options.selected.key + '"]').addClass('active');
        self.options.$container.find('.jio-dimensionpicker-button').html((self.options.selected.name || self.options.selected.key || self.options.selected) + '');
        self.options.$container.find('.close').show();
      }
      else {
        self.options.$container.find('.jio-dimensionpicker-button').html('Choose a dimension...' + '');
        self.options.$container.find('.close').hide();
      }

      $ul.find('div[data-member]').removeClass('disabled');
      if (self.options.disabled) {
        if (!Array.isArray(self.options.disabled))
          self.options.disabled = [self.options.disabled];

        self.options.disabled.forEach(function (disable) {
          $ul.find('div[data-member="' + disable.collection + '.' + disable.key + '"]').addClass('disabled');
        });
      }
    };
    self.markSelected();
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
          {'type': 'dimensionpicker'},
          {'uuid': self.uuid}
        ],
        css: self.options.css
      }, function (err) {
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
        }

        joola.events.emit('dimensionpicker.init.finish', self);
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
    $.fn.DimensionPicker = function (options, callback) {
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
        result = new joola.viz.DimensionPicker(options, function (err, dimensionpicker) {
          if (err)
            throw err;
          dimensionpicker.draw(options, callback);
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

DimensionPicker.template = function (options) {
  var html = '<div id="example" jio-domain="joola" jio-type="table" jio-uuid="25TnLNzFe">\n' +
    '  <div class="jio dimensionbox caption"></div>\n' +
    '  <div class="jio dimensionbox value"></div>\n' +
    '</div>';
  return html;
};

DimensionPicker.meta = {
  key: 'dimensionpicker',
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
      template: '<div class="jio dimensionbox value"></div><div class="jio dimensionbox caption"></div>',
      query: {
        timeframe: 'last_month',
        interval: 'day',
        dimensions: ['mousemoves'],
        collection: 'demo-mousemoves',
        "realtime": true
      }
    },
    draw: '$("#example").Metric(options);'
  },
  template: DimensionPicker.template(),
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
      description: '`optional` the caption for the dimension.'
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
      description: 'Selection changed, dimension box clicked.'
    }
  }
};