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
  joola = require('../index'),
  $$ = require('jquery');

var MetricPicker = module.exports = function (options, callback) {
  if (!callback)
    callback = function () {
    };
  joola.events.emit('metricpicker.init.start');
  var self = this;

  this.type = 'metricpicker';
  this.uuid = joola.common.uuid();
  this.options = {
    canvas: null,
    container: null,
    $container: null,
    metrics: [],
    disabled: [],
    selected: null,
    allowRemove: true,
    allowSelect: true,
    template: '<div class="jio-metricpicker-wrapper">\n' +
      '  <button class="btn jio-metricpicker-button">' +
      '   <span class="caption"></span>' +
      '   <span class="close">×</span>' +
      '  </button>' +
      '  <div class="picker-container">' +
      '    <div class="search input-prepend"><input type="text" class="quicksearch" placeholder="Search..."><span class="add-on"><i class="searchicon icon-search"></i></span></div>' +
      '    <div class="clear"></div>' +
      '  </div>' +
      '  <div class="clear"></div>' +
      '</div>'
  };
  this.drawn = false;

  this.verify = function (options) {

    return null;
  };

  this.draw = function (options, callback) {
    if (!self.drawn) {
      self.options.$container = $$(self.options.container);
      self.options.$container.append(self.options.template || self.template());
      var $ul = $$(self.options.$container.find('.picker-container'));
      var $btn = $$(self.options.$container.find('.jio-metricpicker-button'));
      var $close = $$(self.options.$container.find('.close'));
      if (!self.options.allowRemove)
        $close.remove();
      var $search = $$(self.options.$container.find('.quicksearch'));
      if (self.options.caption)
        $btn.find('.caption').text(self.options.caption);
      if (self.options.metrics.length === 0)
        joola.metrics.list(function (err, list) {
          if (err)
            throw err;

          var mOpen = false;
          var mSkipOne = false;
          var mlasttarget = null;

          list.forEach(function (metric) {
            var collection = {key: metric.collection};
            if (typeof collection !== 'object')
              collection = {key: collection};

            var $li = $$('<div class="metricOption" data-member="' + collection.key + '.' + metric.key + '">' + (metric.name || metric.key) + '</div>');
            $li.off('click');
            $li.on('click', function (e) {
              var $this = $$(this);
              e.stopPropagation();

              if ($this.hasClass('active'))
                return;
              if ($this.hasClass('disabled'))
                return;

              self.options.selected = metric;
              //var $content = '<span class="name">' + metric.name + '</span>';
              //$btn.find('.caption').html((self.options.prefix || '' ) + $content);
              $btn.removeClass('active');
              $ul.removeClass('active');
              mOpen = false;
              mlasttarget = null;

              self.markSelected();

              self.emit('change', metric);
            });
            $ul.append($li);
          });

          $close.on('click', function (e) {
            e.stopPropagation();
            self.options.selected = null;
            self.markSelected();
            self.emit('change', null);
          });

          $search.keyup(function () {
            var $this = $$(this);
            var val = $this.val();
            if (val.length >= 2) {
              $ul.find('div[data-member]').hide();
              $ul.find('div[data-member*="' + val + '"]').show();
            }
            else
              $ul.find('div[data-member]').show();
          });

          $btn.on('click', function (e) {
            var $this = $$(this);
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
          $$('body').on('click', function () {
            $btn.removeClass('active');
            $ul.removeClass('active');
            mlasttarget = null;
            mOpen = false;
          });

          $btn.on('click', function () {
            var $this = $$(this);
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
      if (self.options.allowSelect && self.options.selected) {
        $ul.find('div[data-member="' + self.options.selected.collection + '.' + self.options.selected.key + '"]').addClass('active');
        self.options.$container.find('.jio-metricpicker-button').find('.caption').html((self.options.prefix || '' ) + '<span class="name">' + (self.options.selected.name || self.options.selected.key || self.options.selected) + '</span>');
        self.options.$container.find('.close').show();
      }
      else {
        self.options.$container.find('.jio-metricpicker-button').find('.caption').html('Choose a metric...' + '');
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
  if (options && options.query && !Array.isArray(options.query))
    options.query = [options.query];
  //we call the core initialize option
  joola.viz.initialize(self, options || {});
  self.draw();

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
    return callback(null, self);

  return self;
};

joola.events.on('core.init.finish', function () {
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
        result = new joola.viz.MetricPicker(options, function (err, metricpicker) {
          if (err)
            throw err;
          metricpicker.draw(options, callback);
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

util.inherits(MetricPicker, events.EventEmitter);