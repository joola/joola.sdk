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

  joola = require('../index'),
  $$ = require('jquery'),
  _ = require('underscore');

var DatePicker = module.exports = function (options, callback) {
  if (!callback)
    callback = function () {
    };

  require('jquery-ui/datepicker');
  joola.events.emit('datepicker.init.start');

  var self = this;

  this.addDays = function (o, days) {
// keep in mind, months in javascript are 0-11
    return new Date(o.getFullYear(), o.getMonth(), o.getDate() + days);
  };

  this.fixDate = function (timestamp, zero) {
    var offset = -1 * (timestamp.getTimezoneOffset() / 60);

    // Multiply by 1000 because JS works in milliseconds instead of the UNIX seconds
    var date = timestamp;// new Date(timestamp * 1000);

    var year = date.getUTCFullYear();
    var month = date.getUTCMonth() + 1; // getMonth() is zero-indexed, so we'll increment to get the correct month number
    var day = date.getUTCDate();
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    var seconds = date.getUTCSeconds();

    var bAddDay = false;
    hours = hours + offset; //gmt

    var fixedDate = null;
    if (!zero)
      fixedDate = new Date(year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ' GMT');
    else
      fixedDate = new Date(year + '-' + month + '-' + day + ' ' + '00' + ':' + '00' + ' GMT');
    if (fixedDate == 'Invalid Date') {
      if (!zero) {
        fixedDate = new Date();
        fixedDate.setFullYear(year, month - 1, day);
        fixedDate.setHours(parseInt(hours));
        fixedDate.setMinutes(parseInt(minutes));
        fixedDate.setSeconds(parseInt(seconds));
      }
      else {
        fixedDate = new Date();
        fixedDate.setFullYear(year, month - 1, day);
        fixedDate.setHours(parseInt(hours));
        fixedDate.setMinutes(0);
        fixedDate.setSeconds(0);
      }
    }


    if (bAddDay)
      fixedDate.setDate(fixedDate.getDate() + 1);

    var fixedDate_utc = new Date(fixedDate.getUTCFullYear(), fixedDate.getUTCMonth(), fixedDate.getUTCDate(), fixedDate.getUTCHours(), fixedDate.getUTCMinutes(), fixedDate.getUTCSeconds());


    return fixedDate;
  };

  this.type = 'datepicker';
  this.uuid = joola.common.uuid();
  this.options = {
    canvas: null,
    container: null,
    $container: null,
    comparePeriod: false,
    disableCompare: false
  };

  this.currentMode = 'base-from';

  this.original_base_fromdate = null;
  this.original_base_todate = null;
  this.original_compare_fromdate = null;
  this.original_compare_todate = null;

  if (options.mindate)
    this.min_date = options.min_date;
  //this.min_date = new Date();//new joola.objects.Query().SystemStartDate();
  //this.min_date.setMonth(this.min_date.getMonth() - 6);
  if (options.maxdate)
    this.max_date = options.maxdate;
  else
    this.max_date = new Date();//new joola.objects.Query().SystemEndDate();
  this.max_date.setHours(23);
  this.max_date.setMinutes(59);
  this.max_date.setSeconds(59);
  this.max_date.setMilliseconds(999);

  if (options.todate)
    this.base_todate = new Date(options.todate);
  else
    this.base_todate = new Date(this.max_date);
  if (options.fromdate)
    this.base_fromdate = new Date(options.fromdate);
  else
    this.base_fromdate = self.addDays(this.base_todate, -90);

  if (this.base_fromdate < this.min_date) {
    this.base_fromdate = new Date();//this.min_date.fixDate(true, false);
    this.base_fromdate.setDate(this.base_fromdate.getDate() - 1);
    this.disableCompare = true;
  }

  var rangelength = Date.dateDiff('d', this.base_fromdate, this.base_todate);
  if (options.compare_todate)
    this.compare_todate = options.compare_todate;
  else
    this.compare_todate = self.addDays(this.base_fromdate, -1);
  this.compare_todate.setHours(23);
  this.compare_todate.setMinutes(59);
  this.compare_todate.setSeconds(59);
  this.compare_todate.setMilliseconds(999);
  if (options.compare_fromdate)
    this.compare_fromdate = options.compare_fromdate;
  else
    this.compare_fromdate = self.addDays(this.compare_todate, (-1 * rangelength));

  this.original_base_fromdate = this.base_fromdate;
  this.original_base_todate = this.base_todate;
  this.original_compare_fromdate = this.compare_fromdate;
  this.original_compare_todate = this.compare_todate;

  this.applied_base_fromdate = this.base_fromdate;
  this.applied_base_todate = this.base_todate;
  this.applied_compare_fromdate = this.compare_fromdate;
  this.applied_compare_todate = this.compare_todate;

  this.comparePeriod = options.compare || false;
  this.isCompareChecked = options.compare || false;

  //self.getState(self);

  this.offsetX = 0;
  this.offsetY = 0;

  this.verify = function (options, callback) {
    if (callback)
      return callback(null);
    return null;
  };


  this.template = function () {
    var bindKey = function (btn) {
      var $btn = $$(btn);
      $btn.on('click', function () {
        self.options.$container.find('.btn').removeClass('active');
        $btn.addClass('active');
      });
      return $btn;
    };

    var bindPopUp = function (btn) {
      var $btn = $$(btn);
      $btn.on('click', function () {
        self.options.$container.find('.btn').removeClass('active');
        $btn.addClass('active open');
      });
      return $btn;
    };

    var $group = $$('<div class="jio datepicker btn-group"></div>');
    var $last_day = $$('<div class="jio datepicker option btn btn-default last_day">Past Day</div>');
    var $last_week = $$('<div class="jio datepicker option btn btn-default last_week">Past Week</div>');
    var $last_month = $$('<div class="jio datepicker option btn btn-default last_month">Past Month</div>');
    var $custom = $$('<div class="jio datepicker option btn btn-default custom">Custom</div>');

    $group.append(bindKey($last_day));
    $group.append(bindKey($last_week));
    $group.append(bindKey($last_month));
    $group.append(bindPopUp($custom));

    return $group;
  };

  this.draw = function (options, callback) {
    if (self.options.onDraw)
      window[self.options.onDraw](self.options.container, self);

    var $container = self.options.$container;
    $container.empty();
    //self.options.$container.append(self.template());
    var $table = $$('<div class="datebox jcontainer"><table class="datetable unselectable">' +
      '<tr>' +
      '<td class="dates"></td>' +
      '<td class="dropdownmarker-wrapper"><div class="dropdownmarker"></div></td>' +
      '</tr>' +
      '</table></div></div>');

    $container.append($table);

    var $dates = $table.find('.dates');
    $dates.append('<span class="datelabel fromdate">' + joola.common.formatDate(self.base_fromdate) + '</span>');
    $dates.append(' - ');
    $dates.append('<span class="datelabel todate">' + joola.common.formatDate(self.base_todate) + '</span>');
    $dates.append('<div class="compare" style="display:none">Compare to: <span class="datelabel compare fromdate">' + joola.common.formatDate(self.compare_fromdate) + '</span> - <span class="datelabel compare todate">' + joola.common.formatDate(self.compare_todate) + '</span></div>');

    if (self.comparePeriod) {
      $container.find('.dates .compare').show();
      $container.addClass('compare');
    }
    else {
      $container.removeClass('compare');
      $container.find('.dates .compare').hide();
    }
    var $item = $$('<div class="picker" style="display:none"></div>');

    $item.append('<table class="wrapper"><tr valign=top>' +
      '<td class="calendars"></td>' +
      '<td class="control"><div class="optionscontainer"></div></td>' +
      '</tr></table>');

    $container.append($item);
    var $optionscontainer = $container.find('.optionscontainer');
    $optionscontainer.append('<div class="customdate">Date Range:' +
      '<select class="selector"><option value="custom">Custom</option><option value="today">Today</option><option value="yesterday">Yesterday</option><option value="lastweek">Last week</option><option value="lastmonth">Last Month</option></select>' +
      '</div>');
    $optionscontainer.append('<hr class="divider" style="margin-bottom: 5px;">');

    $optionscontainer.append('<div class="daterange baserange"">' +
      '<input class="dateoption active" type="text" value="Jan 1, 2012">' +
      ' - ' +
      '<input class="dateoption" type="text" value="Jan 1, 2012">' +
      '</div>');

    $optionscontainer.append('<div class="compareoption visible"">' +
      '<input type="checkbox" class="checker"/><span style="padding-left:5px;">Compare to past</span>' +
      '</div>');
    if (self.options.disableCompare) {
      $optionscontainer.find('.compareoption').removeClass('visible');
    }
    $optionscontainer.append('<div class="daterange comparerange"">' +
      '<input class="dateoption active" type="text" value="Jan 1, 2012">' +
      ' - ' +
      '<input class="dateoption" type="text" value="Jan 1, 2012">' +
      '</div>');

    $optionscontainer.append('' +
      '<hr class="divider">' +
      '<div class="_buttons"><button class="btn apply" value="Apply">Apply</button>' +
      '<span class="cancel">Cancel</span></div>');

    var $calendars = $container.find('.calendars');
    //$item = $$('<div class="datepicker"></div>');

    $item = $$('<table><tr valign=top>' +
      '<td class="datetable-prev unselectable"></td>' +
      '<td class="datetable"><div class="datepicker dp1"></div></td>' +
      '<td class="datetable"><div class="datepicker dp2"></div></td>' +
      '<td class="datetable"><div class="datepicker dp3"></div></td>' +
      '<td class="datetable-next unselectable"></td>' +
      '</tr></table>');
    $calendars.append($item);

    $container.find('.datetable-prev').append('<div class="prev">' +
      '<div class="inline-block prev">' +
      '</div>' +
      '</div>');
    $container.find('.datetable-prev .prev').off('click');
    $container.find('.datetable-prev .prev').on('click', function (e) {
      e.stopPropagation();

      var currentLeftCellDate = $$($container.find('.datepicker')[0]).datepicker('getDate');
      if (currentLeftCellDate.setMonth(currentLeftCellDate.getMonth()) < self.min_date)
        return;

      var currentRightCellDate = $$($container.find('.datepicker')[2]).datepicker('getDate');
      currentRightCellDate = new Date(currentRightCellDate);
      currentRightCellDate.setMonth(currentRightCellDate.getMonth() - 1);
      var selectedDate = new Date(currentRightCellDate);


      $container.find('.datepicker').each(function (index, item) {
        var localdate = new Date(selectedDate);

        localdate.setMonth(localdate.getMonth() - (2 - index));
        $$(item).datepicker('setDate', localdate);
      });
    });

    $container.find('.datetable-next').append('<div class="next">' +
      '<div class="inline-block next">' +
      '</div>' +
      '</div>');
    $container.find('.datetable-next .next').off('click');
    $container.find('.datetable-next .next').on('click', function (e) {
      e.stopPropagation();

      var currentRightCellDate = $$($container.find('.datepicker')[2]).datepicker('getDate');
      if (currentRightCellDate.setMonth(currentRightCellDate.getMonth() + 1) > self.max_date)
        return;

      currentRightCellDate = new Date(currentRightCellDate);

      var selectedDate = new Date(currentRightCellDate);

      $container.find('.datepicker').each(function (index, item) {

        var localdate = new Date(selectedDate);
        localdate.setMonth(localdate.getMonth() - (2 - index));
        $$(item).datepicker('setDate', localdate);
      });
    });

    var currentClickIndex = 0;
    $container.find('.datepicker').datepicker({
      dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
      firstDay: 0,
      beforeShowDay: function (date) {
        return self.drawCell(date);
      },
      onSelect: function (dateText, inst) {
        $optionscontainer.find('.selector').val('custom');
        switch (self.currentMode) {
          case 'base-from':

            self.currentMode = 'base-to';
            self.base_fromdate = new Date(dateText);
            self.base_fromdate.setHours(0);
            self.base_fromdate.setMinutes(0);
            self.base_fromdate.setSeconds(0);
            self.base_fromdate.setMilliseconds(0);

            self.base_todate = new Date(dateText);
            self.base_todate.setHours(23);
            self.base_todate.setMinutes(59);
            self.base_todate.setSeconds(59);
            self.base_todate.setMilliseconds(999);

            var _checkLimit = new Date(self.min_date);
            _checkLimit.setUTCHours(0, 0, 0, 0);
            _checkLimit.setDate(_checkLimit.getDate() + 1);

            if (self.base_fromdate.getTime() <= _checkLimit.getTime()) {
              $container.find('.compareoption .checker').attr('disabled', 'disabled');
            }
            else {
              if ($container.find('.compareoption .checker').is(':disabled')) {
                $container.find('.compareoption .checker').removeAttr('disabled');
              }
            }
            $$($container.find('.daterange.baserange .dateoption')[0]).val(joola.common.formatDate(self.base_fromdate));
            $$($container.find('.daterange.baserange .dateoption')[0]).removeClass('invalid');
            $$($container.find('.daterange.baserange .dateoption')[1]).val(joola.common.formatDate(self.base_fromdate));
            $$($container.find('.daterange.baserange .dateoption')[1]).removeClass('invalid');

            break;
          case 'base-to':
            self.base_todate = new Date(dateText);
            self.base_todate.setHours(23);
            self.base_todate.setMinutes(59);
            self.base_todate.setSeconds(59);
            self.base_todate.setMilliseconds(999);
            $$($container.find('.daterange.baserange .dateoption')[1]).val(joola.common.formatDate(self.base_todate));
            $$($container.find('.daterange.baserange .dateoption')[1]).removeClass('invalid');
            if (self.isCompareChecked) {
              self.currentMode = 'compare-from';

            }
            else {

              self.currentMode = 'base-from';
            }
            break;
          case 'compare-from':
            self.compare_fromdate = new Date(dateText);
            self.compare_fromdate.setHours(0);
            self.compare_fromdate.setMinutes(0);
            self.compare_fromdate.setSeconds(0);
            self.compare_fromdate.setMilliseconds(0);

            self.compare_todate = new Date(dateText);
            self.compare_todate.setHours(23);
            self.compare_todate.setMinutes(59);
            self.compare_todate.setSeconds(59);
            self.compare_todate.setMilliseconds(999);
            $$($container.find('.daterange.comparerange .dateoption')[0]).val(joola.common.formatDate(self.compare_fromdate));
            $$($container.find('.daterange.comparerange .dateoption')[0]).removeClass('invalid');

            $$($container.find('.daterange.comparerange .dateoption')[1]).val(joola.common.formatDate(self.compare_fromdate));
            $$($container.find('.daterange.comparerange .dateoption')[1]).removeClass('invalid');
            self.currentMode = 'compare-to';
            break;
          case 'compare-to':
            self.compare_todate = new Date(dateText);
            self.compare_todate.setHours(23);
            self.compare_todate.setMinutes(59);
            self.compare_todate.setSeconds(59);
            self.compare_todate.setMilliseconds(999);
            $$($container.find('.daterange.comparerange .dateoption')[1]).val(joola.common.formatDate(self.compare_todate));
            $$($container.find('.daterange.comparerange .dateoption')[1]).removeClass('invalid');
            self.currentMode = 'base-from';
            break;
          default:
            break;
        }
        self.handleChange();
      }
    });


    $container.find('.datepicker').find('a[href="#"]').each(function (index, item) {
      $$(this).on('click', function (event) {
        event.stopPropagation();
      });
    });

    $container.find('.datepicker').each(function (index, item) {
      var selectedDate = new Date(self.base_todate.getFullYear(), self.base_todate.getMonth(), 1);
      selectedDate.setMonth(selectedDate.getMonth() - (2 - index));
      $$(item).datepicker('setDate', selectedDate);
    });

    $$($container.find('.daterange.baserange .dateoption')[0]).focus(function (e) {
      self.currentMode = 'base-from';
      self.handleChange();
    });

    $$($container.find('.daterange.baserange .dateoption')[0]).blur(function (e) {
      $$($container.find('.daterange.baserange .dateoption')[0]).val(joola.common.formatDate(self.base_fromdate));
      $$(this).removeClass('invalid');
      $container.find('.btn.apply').removeClass('disabled');
      $container.find('.btn.apply').prop('disabled', false);
      self.currentMode = 'base-from';
      self.handleChange();
    });

    $$($container.find('.daterange.baserange .dateoption')[0]).keyup(function (e) {
      if (new Date($$(this).val()) == 'Invalid Date' || new Date($$(this).val()) > self.base_todate || new Date($$(this).val()) > self.max_date || new Date($$(this).val()) < self.min_date) {
        $$(this).addClass('invalid');
        $container.find('.btn.apply').addClass('disabled');
        $container.find('.btn.apply').prop('disabled', true);
      }
      else {
        $$(this).removeClass('invalid');
        $container.find('.btn.apply').removeClass('disabled');
        $container.find('.btn.apply').prop('disabled', false);
        self.base_fromdate = new Date($$(this).val());
      }
    });

    $$($container.find('.daterange.baserange .dateoption')[1]).focus(function (e) {
      self.currentMode = 'base-to';
      self.handleChange();
    });

    $$($container.find('.daterange.baserange .dateoption')[1]).blur(function (e) {
      $$($container.find('.daterange.baserange .dateoption')[1]).val(joola.common.formatDate(self.base_todate));
      $$(this).removeClass('invalid');
      $container.find('.btn.apply').removeClass('disabled');
      $container.find('.btn.apply').prop('disabled', false);
      self.currentMode = 'base-to';
      self.handleChange();
    });
    $$($container.find('.daterange.baserange .dateoption')[1]).keyup(function (e) {
      if (new Date($$(this).val()) == 'Invalid Date' || new Date($$(this).val()) < self.base_fromdate || new Date($$(this).val()) > self.max_date || new Date($$(this).val()) < self.min_date) {
        $$(this).addClass('invalid');
        $container.find('.btn.apply').addClass('disabled');
        $container.find('.btn.apply').prop('disabled', true);
      }
      else {
        $$(this).removeClass('invalid');
        $container.find('.btn.apply').removeClass('disabled');
        $container.find('.btn.apply').prop('disabled', false);
        self.base_todate = new Date($$(this).val());
      }

    });

    $$($container.find('.daterange.comparerange .dateoption')[0]).focus(function (e) {
      self.currentMode = 'compare-from';
      self.handleChange();
    });

    $$($container.find('.daterange.comparerange .dateoption')[0]).blur(function (e) {
      $$($container.find('.daterange.comparerange .dateoption')[0]).val(joola.common.formatDate(self.compare_fromdate));
      $$(this).removeClass('invalid');
      $container.find('.btn.apply').removeClass('disabled');
      $container.find('.btn.apply').prop('disabled', false);
      self.currentMode = 'compare-from';
      self.handleChange();
    });

    $$($container.find('.daterange.comparerange .dateoption')[0]).keyup(function (e) {
      if (new Date($$(this).val()) == 'Invalid Date' || new Date($$(this).val()) > self.compare_todate || new Date($$(this).val()) > self.max_date || new Date($$(this).val()) < self.min_date) {
        $$(this).addClass('invalid');
        $container.find('.btn.apply').addClass('disabled');
        $container.find('.btn.apply').prop('disabled', true);
      }
      else {
        $$(this).removeClass('invalid');
        $container.find('.btn.apply').removeClass('disabled');
        $container.find('.btn.apply').prop('disabled', false);
        self.compare_fromdate = new Date($$(this).val());
      }
    });

    $$($container.find('.daterange.comparerange .dateoption')[1]).focus(function (e) {
      self.currentMode = 'compare-to';
      self.handleChange();
    });

    $$($container.find('.daterange.comparerange .dateoption')[1]).blur(function (e) {
      $$($container.find('.daterange.comparerange .dateoption')[1]).val(joola.common.formatDate(self.compare_todate));
      $$(this).removeClass('invalid');
      $container.find('.btn.apply').removeClass('disabled');
      $container.find('.btn.apply').prop('disabled', false);
      self.currentMode = 'compare-to';
      self.handleChange();
    });

    $$($container.find('.daterange.comparerange .dateoption')[1]).keyup(function (e) {
      if (new Date($$(this).val()) == 'Invalid Date' || new Date($$(this).val()) < self.compare_fromdate || new Date($$(this).val()) > self.base_todate || new Date($$(this).val()) > self.max_date || new Date($$(this).val()) < self.min_date) {
        $$(this).addClass('invalid');
        $container.find('.btn.apply').addClass('disabled');
        $container.find('.btn.apply').prop('disabled', true);
      }
      else {
        $$(this).removeClass('invalid');
        $container.find('.btn.apply').removeClass('disabled');
        $container.find('.btn.apply').prop('disabled', false);
        self.compare_todate = new Date($$(this).val());
      }
    });
    $optionscontainer.find('.cancel').click(function (e) {

      self.base_fromdate = self.original_base_fromdate;
      self.base_todate = self.original_base_todate;

      self.compare_fromdate = self.original_compare_fromdate;
      self.compare_todate = self.original_compare_todate;

      if (!self.comparePeriod) {
        if ($container.find('.compareoption .checker').is(":checked")) {
          $container.find('.compareoption .checker').click();
          $container.find('.compareoption .checker').prop('checked', false);
        }
      }
      else {
        if (!$container.find('.compareoption .checker').is(":checked")) {
          $container.find('.compareoption .checker').click();
          $container.find('.compareoption .checker').prop('checked', true);
        }
      }
      $$($container.find('.daterange.baserange .dateoption')[0]).val(joola.common.formatDate(self.base_fromdate));
      $$($container.find('.daterange.baserange .dateoption')[1]).val(joola.common.formatDate(self.base_todate));
      $$($container.find('.daterange.comparerange .dateoption')[0]).val(joola.common.formatDate(self.compare_fromdate));
      $$($container.find('.daterange.comparerange .dateoption')[1]).val(joola.common.formatDate(self.compare_todate));

      self.handleChange();

      $dateboxcontainer.click();
    });
    $optionscontainer.find('.selector').change(function (e) {
      switch (this.value) {
        case 'today':
          self.base_todate = new Date();
          self.base_todate.setHours(23);
          self.base_todate.setMinutes(59);
          self.base_todate.setSeconds(59);
          self.base_todate.setMilliseconds(999);
          self.base_fromdate = new Date(self.base_todate);
          self.base_fromdate.setHours(0);
          self.base_fromdate.setMinutes(0);
          self.base_fromdate.setSeconds(0);
          self.base_fromdate.setMilliseconds(0);
          break;
        case 'yesterday':
          self.base_todate = new Date();
          self.base_todate.setDate(self.base_todate.getDate() - 1);
          self.base_todate.setHours(23);
          self.base_todate.setMinutes(59);
          self.base_todate.setSeconds(59);
          self.base_todate.setMilliseconds(999);
          self.base_fromdate = new Date(self.base_todate);
          self.base_fromdate.setHours(0);
          self.base_fromdate.setMinutes(0);
          self.base_fromdate.setSeconds(0);
          self.base_fromdate.setMilliseconds(0);
          break;
        case 'lastweek':
          self.base_todate = new Date();
          self.base_todate.setHours(23);
          self.base_todate.setMinutes(59);
          self.base_todate.setSeconds(59);
          self.base_todate.setMilliseconds(999);
          self.base_fromdate = new Date(self.base_todate);
          self.base_fromdate.setDate(self.base_fromdate.getDate() - 6);
          self.base_fromdate.setHours(0);
          self.base_fromdate.setMinutes(0);
          self.base_fromdate.setSeconds(0);
          self.base_fromdate.setMilliseconds(0);
          break;
        case 'lastmonth':
          self.base_todate = new Date();
          self.base_todate.setHours(23);
          self.base_todate.setMinutes(59);
          self.base_todate.setSeconds(59);
          self.base_todate.setMilliseconds(999);
          self.base_fromdate = new Date(self.base_todate);
          self.base_fromdate.setDate(self.base_fromdate.getDate() - 30);
          self.base_fromdate.setHours(0);
          self.base_fromdate.setMinutes(0);
          self.base_fromdate.setSeconds(0);
          self.base_fromdate.setMilliseconds(0);
          break;
        default:
          break;
      }
      var rangelength = Date.dateDiff('d', self.base_fromdate, self.base_todate);
      self.compare_todate = self.addDays(self.base_fromdate, -1);
      self.compare_fromdate = self.addDays(self.compare_todate, (-1 * rangelength));

      $$($container.find('.daterange.baserange .dateoption')[0]).val(joola.common.formatDate(self.base_fromdate));
      $$($container.find('.daterange.baserange .dateoption')[1]).val(joola.common.formatDate(self.base_todate));
      $$($container.find('.daterange.comparerange .dateoption')[0]).val(joola.common.formatDate(self.compare_fromdate));
      $$($container.find('.daterange.comparerange .dateoption')[1]).val(joola.common.formatDate(self.compare_todate));

      self.handleChange();
    });
    $$($container.find('.daterange.baserange .dateoption')[0]).val(joola.common.formatDate(self.base_fromdate));
    $$($container.find('.daterange.baserange .dateoption')[1]).val(joola.common.formatDate(self.base_todate));
    $$($container.find('.daterange.comparerange .dateoption')[0]).val(joola.common.formatDate(self.compare_fromdate));
    $$($container.find('.daterange.comparerange .dateoption')[1]).val(joola.common.formatDate(self.compare_todate));

    var $dateboxcontainer = $container.find('.jcontainer');
    $dateboxcontainer.off('click');
    var $picker = $container.find('.picker');
    $dateboxcontainer.on('click', function (e) {
      if ($$(this).hasClass('expanded')) {
        $$(this).removeClass('expanded');
        $picker.hide();
      }
      else {
        $$(this).addClass('expanded');

        self.base_fromdate = self.applied_base_fromdate;
        self.base_todate = self.applied_base_todate;
        self.compare_fromdate = self.applied_compare_fromdate;
        self.compare_todate = self.applied_compare_todate;

        self.original_base_fromdate = self.applied_base_fromdate;
        self.original_base_todate = self.applied_base_todate;
        self.original_compare_fromdate = self.applied_compare_fromdate;
        self.original_compare_todate = self.applied_compare_todate;

        $picker.show();
        $picker.offset({
          top: $container.offset().top + $container.height() - 1,
          left: $dateboxcontainer.offset().left - $picker.outerWidth() + $dateboxcontainer.outerWidth()
        });
      }
    });
    $table.click(function (e) {
      e.stopPropagation();
    });

    $picker.click(function (e) {
      e.stopPropagation();
    });

    $$('body').click(function (e) {
      $dateboxcontainer.removeClass('expanded');
      $picker.hide();
    });

    $optionscontainer.find('.apply').click(function (e) {
      $dateboxcontainer.removeClass('expanded');
      $picker.hide();
      self.comparePeriod = self.isCompareChecked;

      //if (self.options.canvas)
      //  self.options.canvas.emit('datechange', self);


      self.DateUpdate();
    });

    if (this.comparePeriod)
      this.isCompareChecked = true;

    if (this.disableCompare)
      $container.find('.compareoption .checker').attr('disabled', 'disabled');

    if (self.options.onAfterDraw)
      window[self.options.onAfterDraw](self.options.container, self);

    //this.registerDateUpdate(this.updateLabels);
    this.handleChange();

    return callback(null, self);

  };

  this.DateUpdate = function () {
    var _this = this;
    var options = {};

    this.base_todate.setHours(23);
    this.base_todate.setMinutes(59);
    this.base_todate.setSeconds(59);
    this.base_todate.setMilliseconds(999);

    this.compare_todate.setHours(23);
    this.compare_todate.setMinutes(59);
    this.compare_todate.setSeconds(59);
    this.compare_todate.setMilliseconds(999);

    _this.applied_base_fromdate = this.base_fromdate;
    _this.applied_base_todate = this.base_todate;
    _this.applied_compare_fromdate = this.compare_fromdate;
    _this.applied_compare_todate = this.compare_todate;
    options = {
      base_fromdate: this.applied_base_fromdate,
      base_todate: this.applied_base_todate,
      compare_fromdate: this.applied_compare_fromdate,
      compare_todate: this.applied_compare_todate,
      compare: this.comparePeriod
    };

    if (self.comparePeriod) {
      self.options.$container.find('.dates .compare').show();
      self.options.$container.addClass('compare');
    }
    else {
      self.options.$container.removeClass('compare');
      self.options.$container.find('.dates .compare').hide();
    }

    var $fromdate = $$(self.options.$container.find('.dates .datelabel.fromdate')[0]);
    var todate = $$(self.options.$container.find('.dates .datelabel.todate')[0]);

    $fromdate.text(joola.common.formatDate(_this.applied_base_fromdate));
    todate.text(joola.common.formatDate(_this.applied_base_todate));

    $$(this.callbacks).each(function (index, item) {
      _this.callbacks[index].callback(_this, options);
    });
    //_this.setState(_this);
    if (self.options.canvas) {
      self.options.canvas.emit('datechange', options);
    }
    $$(self).trigger("datechange", options);
    //$$(joola).trigger("datechange", options);

    if (self.options.onUpdate)
      window[self.options.onUpdate](self.container, self);
  };

  this.drawCell = function (date) {
    if (date >= this.max_date)
      return [false, 'daycell disabled'];

    if (date <= this.min_date)
      return [false, 'daycell disabled'];

    if (this.currentMode == 'base-to') {
      if (date < this.base_fromdate)
        return [false, 'daycell disabled'];
    }

    if (this.currentMode == 'compare-to') {
      if (date < this.compare_fromdate)
        return [false, 'daycell compare disabled'];
    }

    if (this.isCompareChecked) {
      if (date == this.compare_fromdate)
        return [true, 'daycell compare inrange selected fromdate'];
      if (date == this.compare_todate)
        return [true, 'daycell compare inrange selected todate'];
      if ((date >= this.base_fromdate && date <= this.base_todate) && (date >= this.compare_fromdate && date <= this.compare_todate))
        return [true, 'daycell basencompare inrange'];
      if (date >= this.compare_fromdate && date <= this.compare_todate)
        return [true, 'daycell compare inrange'];
      if (date > this.base_todate && this.currentMode != 'base-to') {
        return [false, 'daycell compare disabled'];
      }
    }

    if (date == this.base_fromdate)
      return [true, 'daycell inrange selected fromdate'];
    if (date == this.base_todate)
      return [true, 'daycell inrange selected todate'];
    if (date >= this.base_fromdate && date <= this.base_todate)
      return [true, 'daycell inrange'];


    switch (this.currentMode) {
      case 'base-from':
        break;
      case 'base-to':
        break;
      case 'compare-from':
        break;
      case 'compare-to':
        break;
      default:
        break;
    }

    return [true, 'daycell'];
  };

  this.handleChange = function (options) {
    var self = this;

    var $datebox = self.options.$container;//.find('[jio-type="datepicker"]');
    self.options.$container.find('.datepicker').not(this).each(function () {
      $$(this).datepicker('refresh');
    });

    /*
     $$($$('.daterange.baserange .dateoption')[0]).val(formatDate(self.base_fromdate));
     $$($$('.daterange.baserange .dateoption')[1]).val(formatDate(self.base_todate));
     $$($$('.daterange.comparerange .dateoption')[0]).val(formatDate(self.compare_fromdate));
     $$($$('.daterange.comparerange .dateoption')[1]).val(formatDate(self.compare_todate));
     */

    $$(self.options.$container.find('.daterange.baserange .dateoption')[1]).removeClass('active');
    $$(self.options.$container.find('.daterange.comparerange .dateoption')[0]).removeClass('active');
    $$(self.options.$container.find('.daterange.comparerange .dateoption')[1]).removeClass('active');

    switch (this.currentMode) {
      case 'base-from':
        if (self.base_fromdate < self.min_date) {
          self.base_fromdate = self.min_date;
          $$(self.options.$container.find('.daterange.baserange .dateoption')[0]).val(joola.common.formatDate(self.base_fromdate));
        }
        if (self.base_fromdate > self.max_date) {
          self.base_fromdate = self.max_date;
          $$(self.options.$container.find('.daterange.baserange .dateoption')[0]).val(joola.common.formatDate(self.base_fromdate));
        }
        $$(self.options.$container.find('.daterange.baserange .dateoption')[0]).addClass('active');
        $$(self.options.$container.find('.daterange.baserange .dateoption')[1]).removeClass('active');
        $$(self.options.$container.find('.daterange.comparerange .dateoption')[0]).removeClass('active');
        $$(self.options.$container.find('.daterange.comparerange .dateoption')[1]).removeClass('active');

        break;
      case 'base-to':
        if (self.base_todate < self.min_date) {
          self.base_todate = self.min_date;
          $$(self.options.$container.find('.daterange.baserange .dateoption')[1]).val(joola.common.formatDate(self.base_todate));
        }
        if (self.base_todate > self.max_date) {
          self.base_todate = self.max_date;
          $$(self.options.$container.find('.daterange.baserange .dateoption')[1]).val(joola.common.formatDate(self.base_todate));
        }
        $$(self.options.$container.find('.daterange.baserange .dateoption')[0]).removeClass('active');
        $$(self.options.$container.find('.daterange.baserange .dateoption')[1]).addClass('active');
        $$(self.options.$container.find('.daterange.comparerange .dateoption')[0]).removeClass('active');
        $$(self.options.$container.find('.daterange.comparerange .dateoption')[1]).removeClass('active');

        break;
      case 'compare-from':
        if (self.compare_fromdate < self.min_date) {
          self.compare_fromdate = self.min_date;
          $$(self.options.$container.find('.daterange.comparerange .dateoption')[0]).val(joola.common.formatDate(self.compare_fromdate));
        }
        if (self.compare_fromdate > self.max_date) {
          self.compare_fromdate = self.max_date;
          $$(self.options.$container.find('.daterange.comparerange .dateoption')[0]).val(joola.common.formatDate(self.compare_fromdate));
        }

        $$(self.options.$container.find('.daterange.baserange .dateoption')[0]).removeClass('active');
        $$(self.options.$container.find('.daterange.baserange .dateoption')[1]).removeClass('active');
        $$(self.options.$container.find('.daterange.comparerange .dateoption')[0]).addClass('active');
        $$(self.options.$container.find('.daterange.comparerange .dateoption')[1]).removeClass('active');

        break;
      case 'compare-to':
        if (self.compare_todate < self.min_date) {
          self.compare_todate = self.min_date;
          $$(self.options.$container.find('.daterange.comparerange .dateoption')[1]).val(joola.common.formatDate(self.compare_todate));
        }
        if (self.compare_todate > self.max_date) {
          self.compare_todate = self.max_date;
          $$(self.options.$container.find('.daterange.comparerange .dateoption')[1]).val(joola.common.formatDate(self.compare_todate));
        }

        $$(self.options.$container.find('.daterange.baserange .dateoption')[0]).removeClass('active');
        $$(self.options.$container.find('.daterange.baserange .dateoption')[1]).removeClass('active');
        $$(self.options.$container.find('.daterange.comparerange .dateoption')[0]).removeClass('active');
        $$(self.options.$container.find('.daterange.comparerange .dateoption')[1]).addClass('active');

        break;
      default:
        break;
    }

    if ((self.compare_fromdate > self.base_todate || self.compare_todate > self.base_todate) && this.isCompareChecked) {
      var rangelength = Date.dateDiff('d', self.base_fromdate, self.base_todate);
      self.compare_todate = self.addDays(self.base_fromdate, -1);
      self.compare_fromdate = self.addDays(self.compare_todate, (-1 * rangelength));
      if (self.compare_fromdate < self.min_date) {
        self.compare_fromdate = self.min_date;
      }
      $$(self.options.$container.find('.daterange.comparerange .dateoption')[0]).val(joola.common.formatDate(self.compare_fromdate));
      $$(self.options.$container.find('.daterange.comparerange .dateoption')[1]).val(joola.common.formatDate(self.compare_todate));


      if (this.currentMode == 'compare-to')
        $$(self.options.$container.find('.daterange.comparerange .dateoption')[1]).focus();
      else if (this.currentMode == 'compare-from')
        $$(self.options.$container.find('.daterange.comparerange .dateoption')[0]).focus();
    }

    if (this.isCompareChecked) {
      $datebox.find('.optionscontainer .checker').prop("checked", true);
      $datebox.find('.optionscontainer .daterange.comparerange').show();

    }
    else {
      $datebox.find('.optionscontainer .checker').prop("checked", false);
      $datebox.find('.optionscontainer .daterange.comparerange').hide();
    }

    $datebox.find('.optionscontainer .checker').off('click');
    $datebox.find('.optionscontainer .checker').on('click', function (e) {
      e.stopPropagation();
      self.isCompareChecked = !self.isCompareChecked;
      if (self.isCompareChecked)
        self.currentMode = 'compare-from';
      else
        self.currentMode = 'base-from';

      var rangelength = Date.dateDiff('d', self.base_fromdate, self.base_todate);

      self.compare_todate = self.addDays(self.base_fromdate, -1);
      self.compare_fromdate = self.addDays(self.compare_todate, (-1 * rangelength));
      if (self.compare_fromdate < self.min_date) {
        self.compare_fromdate = self.min_date;
      }
      $$(self.options.$container.find('.daterange.comparerange .dateoption')[0]).val(joola.common.formatDate(self.compare_fromdate));
      $$(self.options.$container.find('.daterange.comparerange .dateoption')[1]).val(joola.common.formatDate(self.compare_todate));

      self.handleChange();
    });

    if (self.options.canvas) {
      self.options.canvas.emit('datechanging', self);
    }
    $$(self).trigger('datechanging', self);
  };

  //here we go
  /*try {
    joola.common._extend(self.options, options, true);
    console.log(self.options);
    self.verify(self.options, function (err) {
      if (err)
        return callback(err);

      self.options.$container = $$(self.options.container);
      self.markContainer(self.options.$container, [
        {'type': 'datepicker'},
        {'uuid': self.uuid},
        {css: self.options.css}
      ], function (err) {
        if (err)
          return callback(err);

        joola.viz.onscreen.push(self);
        if (!self.options.canvas) {
          var elem = self.options.$container.parent();
          if (elem.attr('jio-type') == 'canvas') {
            self.options.canvas = $$(elem).Canvas();
          }
        }
        if (self.options.canvas) {
          self.options.canvas.addVisualization(self);
        }
        self.draw(options, function () {
          joola.events.emit('datepicker.init.finish', self);
          if (typeof callback === 'function')
            return callback(null, self);
        });
      });
    });
  }
  catch (err) {
    callback(err);
    return self.onError(err, callback);
  }

  //callback(null, self);
  return self;*/
//we call the core initialize option
  joola.viz.initialize(self, options || {});
  self.draw(self.options,function(){});

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
  if (typeof (jQuery) !== 'undefined' || typeof ($) !== 'undefined') {
    $.fn.DatePicker = function (options, callback) {
      if (!options)
        options = {force: false};
      else if (!options.hasOwnProperty('force'))
        options.force = true;
      var result = null;
      var found = false;
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
        result = new joola.viz.DatePicker(options, function (err) {
          if (err)
            throw err;
          //bartable.draw(options, callback);
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

util.inherits(DatePicker, events.EventEmitter);