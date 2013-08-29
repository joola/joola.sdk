// Copyright 2012 Joola. All Rights Reserved.
// Copyright 2012 Joola. All Rights Reserved.
//
// Licensed under the Jarvis License Agreement (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://jarvis.joo.la/client/license
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Provides a report visualisation to display current server date and time.
 *
 */


jarvis.provide('jarvis.visualisation.picker.DateBox');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

//jarvis.require('jarvis.visualisation.report');


/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
jarvis.visualisation.picker.DateBox.init = function (options, container) {
    var _this = this;
    var start = new Date().getMilliseconds();

    this._this = this;
    this.currentMode = 'base-from';

    this.original_base_fromdate = null;
    this.original_base_todate = null;
    this.original_compare_fromdate = null;
    this.original_compare_todate = null;

    //this.base_todate = _this.fixDate(_this.addDays(new Date(), 0), true);
    this.min_date = new jarvis.objects.Query().SystemStartDate();
    this.max_date = new jarvis.objects.Query().SystemEndDate();

    this.base_todate = new Date(this.max_date);
    this.base_fromdate = _this.addDays(this.base_todate, -30);

    if (this.base_fromdate < this.min_date) {
        this.base_fromdate = this.min_date.fixDate(true,false);
        this.base_fromdate.setDate(this.base_fromdate.getDate() - 1);
        this.disableCompare = true;
    }

    var rangelength = Date.dateDiff('d', this.base_fromdate, this.base_todate);
    this.compare_todate = _this.addDays(this.base_fromdate, -1);
    this.compare_fromdate = _this.addDays(this.compare_todate, (-1 * rangelength));

    this.original_base_fromdate = this.base_fromdate;
    this.original_base_todate = this.base_todate;
    this.original_compare_fromdate = this.compare_fromdate;
    this.original_compare_todate = this.compare_todate;

    this.applied_base_fromdate = this.base_fromdate;
    this.applied_base_todate = this.base_todate;
    this.applied_compare_fromdate = this.compare_fromdate;
    this.applied_compare_todate = this.compare_todate;

    this.comparePeriod = false;
    this.isCompareChecked = false;

    _this.getState(_this);

    this.offsetX = 0;
    this.offsetY = 0;

    this.callbacks = [];

    this.cssPath = jarvis.contenthost + '/assets/css/datebox.css';
    //$("head").append('<style>' + new JAPI.Visualisation().CSS(this.cssPath) + '</style>');
    //$("head").append('<style type="text/css">@import "' + jarvis.contentPath + this.cssPath + '";</style> ');

    if (!jarvis.dateboxcssloaded) {
        jarvis.dateboxcssloaded = true;
        $("head").append('<style type="text/css">@import "' + this.cssPath + '";</style> ');
    }

    //lookup any containers relevant for the datebox

    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.jarvis.picker.datebox');
    if (matchedContainers.length == 0)
        return;

    $(matchedContainers).each(function (index, item) {

        if (!$(this).parent().hasClass('prettyprint')) {

            jarvis.debug.log('INFO', 'jarvis.visualisation.picker.DateBox', 6, 'Applying to container (\'' + this.id + '\')');

            var offsetX = $(item).attr('data-offsetx');
            var offsetY = $(item).attr('data-offsety');

            if (offsetX)
                _this.offsetX = offsetX;
            if (offsetY)
                _this.offsetY = offsetY;

            $(item).empty();
            //apply html and bind methods/events
            _this.draw(item);

            $(this).bind('data', function (evt, ret) {
                ret.data = $(this).data().data;
            });

            $(this).bind('click', function (evt) {
                $(this).trigger('clicked', $(this).data().data);
            });
        }
    });


    //_this.setState(_this);

    var executionTime = new Date().getMilliseconds() - start;
    jarvis.debug.log('INFO', 'jarvis.visualisation.picker.DateBox', 5, '...init (' + executionTime + 'ms)');

};

jarvis.visualisation.picker.DateBox.addDays = function (o, days) {
// keep in mind, months in javascript are 0-11
    return new Date(o.getFullYear(), o.getMonth(), o.getDate() + days);
}

jarvis.visualisation.picker.DateBox.draw = function (Container) {
    var _this = this;

    var $container = $(Container);
    $container.empty();
    var $item = $('<div class="container"></div>');
    //$container.append($item);


    $item.append('<table class="datetable unselectable">' +
        '<tr>' +
        '<td class="dates"></td>' +
        '<td class="dropdownmarker"></td>' +
        '</tr>' +
        '</table>');
    $container.append($item);

    //$('.dates').append('<span class="datelabel fromdate">' + _this.formatDate(_this.base_fromdate) + '</span>');
    $('.dates').append('<span class="datelabel fromdate">' + jarvis.date.formatDate(_this.base_fromdate) + '</span>');
    $('.dates').append(' - ');
    //$('.dates').append('<span class="datelabel todate">' + _this.formatDate(_this.base_todate) + '</span>');
    $('.dates').append('<span class="datelabel todate">' + jarvis.date.formatDate(_this.base_todate) + '</span>');
    $('.dates').append('<div class="compare" style="display:none">Compare to: <span class="datelabel compare fromdate">' + jarvis.date.formatDate(_this.compare_fromdate) + '</span> - <span class="datelabel compare todate">' + jarvis.date.formatDate(_this.compare_todate) + '</span></div>');

    if (_this.comparePeriod)
        $('.dates .compare').show();
    else
        $('.dates .compare').hide();


    $item = $('<div class="picker" style="display:none"></div>');

    $item.append('<table class="wrapper"><tr valign=top>' +
        '<td class="calendars"></td>' +
        '<td class="control"><div class="optionscontainer"></div></td>' +
        '</tr></table>');

    $container.append($item);

    $('.optionscontainer').append('<div class="customdate">Date Range:' +
        '<select class="selector"><option value="custom">Custom</option><option value="today">Today</option><option value="yesterday">Yesterday</option><option value="lastweek">Last week</option><option value="lastmonth">Last Month</option></select>' +
        '</div>');
    $('.optionscontainer').append('<hr class="divider" style="margin-bottom: 5px;">');

    $('.optionscontainer').append('<div class="daterange baserange"">' +
        '<input class="dateoption active" type="text" value="Jan 1, 2012">' +
        ' - ' +
        '<input class="dateoption" type="text" value="Jan 1, 2012">' +
        '</div>');

    $('.optionscontainer').append('<div class="compareoption visible"">' +
        '<input type="checkbox" class="checker"/><span style="padding-left:5px;">Compare to past</span>' +
        '</div>');

    $('.optionscontainer').append('<div class="daterange comparerange"">' +
        '<input class="dateoption active" type="text" value="Jan 1, 2012">' +
        ' - ' +
        '<input class="dateoption" type="text" value="Jan 1, 2012">' +
        '</div>');

    $('.optionscontainer').append('' +
        '<hr class="divider">' +
        '<div class="_buttons"><button class="btn apply" value="Apply">Apply</button>' +
        '<span class="cancel">Cancel</span></div>');

    var $calendars = $container.find('.calendars');
    //$item = $('<div class="datepicker"></div>');

    $item = $('<table><tr valign=top>' +
        '<td class="datetable-prev unselectable"></td>' +
        '<td class="datetable"><div class="datepicker dp1"></div></td>' +
        '<td class="datetable"><div class="datepicker dp2"></div></td>' +
        '<td class="datetable"><div class="datepicker dp3"></div></td>' +
        '<td class="datetable-next unselectable"></td>' +
        '</tr></table>');
    $calendars.append($item);

    $('.datetable-prev').append('<div class="prev">' +
        '<div class="inline-block prev">' +
        '</div>' +
        '</div>');
    $('.datetable-prev .prev').off('click');
    $('.datetable-prev .prev').on('click', function (e) {
        e.stopPropagation();

        var currentLeftCellDate = $($('.datepicker')[0]).datepicker('getDate');
        if (currentLeftCellDate.setMonth(currentLeftCellDate.getMonth()) < _this.min_date)
            return;

        var currentRightCellDate = $($('.datepicker')[2]).datepicker('getDate');
        currentRightCellDate = new Date(currentRightCellDate);
        currentRightCellDate.setMonth(currentRightCellDate.getMonth() - 1);
        var selectedDate = new Date(currentRightCellDate);


        $('.datepicker').each(function (index, item) {
            var localdate = new Date(selectedDate);

            localdate.setMonth(localdate.getMonth() - (2 - index));
            $(item).datepicker('setDate', localdate);
        });
    });

    $('.datetable-next').append('<div class="next">' +
        '<div class="inline-block next">' +
        '</div>' +
        '</div>');
    $('.datetable-next .next').off('click');
    $('.datetable-next .next').on('click', function (e) {

        e.stopPropagation();

        var currentRightCellDate = $($('.datepicker')[2]).datepicker('getDate');
        if (currentRightCellDate.setMonth(currentRightCellDate.getMonth() + 1) > _this.max_date)
            return;

        currentRightCellDate = new Date(currentRightCellDate);

        var selectedDate = new Date(currentRightCellDate);

        $('.datepicker').each(function (index, item) {

            var localdate = new Date(selectedDate);
            localdate.setMonth(localdate.getMonth() - (2 - index));
            $(item).datepicker('setDate', localdate);
        });
    });

    var currentClickIndex = 0;
    $('.datepicker').datepicker({
        dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
        firstDay: 0,
        beforeShowDay: function (date) {
            return _this.drawCell(date);
        },
        onSelect: function (dateText, inst) {


            $('.jarvis .optionscontainer .selector').val('custom');

            switch (_this.currentMode) {
                case 'base-from':

                    _this.currentMode = 'base-to';
                    _this.base_fromdate = new Date(dateText);
                    _this.base_todate = new Date(dateText);


                    var _checkLimit = new Date(_this.min_date);
                    _checkLimit.setUTCHours(0, 0, 0, 0);
                    _checkLimit.setDate(_checkLimit.getDate() + 1);

                    if (_this.base_fromdate.getTime() <= _checkLimit.getTime()) {
                        $('.compareoption .checker').attr('disabled', 'disabled');
                    }
                    else {
                        if ($('.compareoption .checker').is(':disabled')) {
                            $('.compareoption .checker').removeAttr('disabled');
                        }
                    }
                    //$($('.daterange.baserange .dateoption')[0]).val(_this.formatDate(_this.base_fromdate));
                    $($('.daterange.baserange .dateoption')[0]).val(jarvis.date.formatDate(_this.base_fromdate));
                    $($('.daterange.baserange .dateoption')[0]).removeClass('invalid');
                    $($('.daterange.baserange .dateoption')[1]).val(jarvis.date.formatDate(_this.base_fromdate));
                    $($('.daterange.baserange .dateoption')[1]).removeClass('invalid');

                    break;
                case 'base-to':
                    _this.base_todate = new Date(dateText);
                    //$($('.daterange.baserange .dateoption')[1]).val(_this.formatDate(_this.base_todate));
                    $($('.daterange.baserange .dateoption')[1]).val(jarvis.date.formatDate(_this.base_todate));
                    $($('.daterange.baserange .dateoption')[1]).removeClass('invalid');
                    if (_this.isCompareChecked) {
                        _this.currentMode = 'compare-from';

                    }
                    else {

                        _this.currentMode = 'base-from';
                    }
                    break;
                case 'compare-from':
                    _this.compare_fromdate = new Date(dateText);
                    _this.compare_todate = new Date(dateText);
                    $($('.daterange.comparerange .dateoption')[0]).val(_this.formatDate(_this.compare_fromdate));
                    $($('.daterange.comparerange .dateoption')[0]).removeClass('invalid');

                    $($('.daterange.comparerange .dateoption')[1]).val(_this.formatDate(_this.compare_fromdate));
                    $($('.daterange.comparerange .dateoption')[1]).removeClass('invalid');
                    _this.currentMode = 'compare-to';
                    break;
                case 'compare-to':
                    _this.compare_todate = new Date(dateText);
                    $($('.daterange.comparerange .dateoption')[1]).val(_this.formatDate(_this.compare_todate));
                    $($('.daterange.comparerange .dateoption')[1]).removeClass('invalid');
                    _this.currentMode = 'base-from';
                    break;
                default:
                    break;
            }
            _this.handleChange();
        }
    });

    //$('.datepicker').datepicker({  });

    $('.datepicker').find('a[href="#"]').each(function (index, item) {
        $(this).on('click', function (event) {
            event.stopPropagation();
        });
    });

    $('.datepicker').each(function (index, item) {

        var selectedDate = new Date(_this.base_todate.getFullYear(), _this.base_todate.getMonth(), 1);
        selectedDate.setMonth(selectedDate.getMonth() - (2 - index));


        $(item).datepicker('setDate', selectedDate);


    });


    $($('.daterange.baserange .dateoption')[0]).focus(function (e) {
        _this.currentMode = 'base-from';
        _this.handleChange();
    });

    $($('.daterange.baserange .dateoption')[0]).blur(function (e) {
        //if ($($('.daterange.baserange .dateoption')[0]).hasClass('invalid')) {
        //    $($('.daterange.baserange .dateoption')[0]).val(_this.formatDate(_this.base_fromdate));
        //}
        $($('.daterange.baserange .dateoption')[0]).val(_this.formatDate(_this.base_fromdate));
        $(this).removeClass('invalid');
        $('.btn.apply').removeClass('disabled');
        $('.btn.apply').prop('disabled', false);
        _this.currentMode = 'base-from';
        _this.handleChange();
    });

    $($('.daterange.baserange .dateoption')[0]).keyup(function (e) {
        if (new Date($(this).val()) == 'Invalid Date' || new Date($(this).val()) > _this.base_todate || new Date($(this).val()) > _this.max_date || new Date($(this).val()) < _this.min_date) {
            $(this).addClass('invalid');
            $('.btn.apply').addClass('disabled');
            $('.btn.apply').prop('disabled', true);
        }
        else {
            $(this).removeClass('invalid');
            $('.btn.apply').removeClass('disabled');
            $('.btn.apply').prop('disabled', false);
            _this.base_fromdate = new Date($(this).val());

        }

    });


    $($('.daterange.baserange .dateoption')[1]).focus(function (e) {
        _this.currentMode = 'base-to';
        _this.handleChange();
    });

    $($('.daterange.baserange .dateoption')[1]).blur(function (e) {
        $($('.daterange.baserange .dateoption')[1]).val(_this.formatDate(_this.base_todate));
        $(this).removeClass('invalid');
        $('.btn.apply').removeClass('disabled');
        $('.btn.apply').prop('disabled', false);
        _this.currentMode = 'base-to';
        _this.handleChange();
    });
    $($('.daterange.baserange .dateoption')[1]).keyup(function (e) {
        if (new Date($(this).val()) == 'Invalid Date' || new Date($(this).val()) < _this.base_fromdate || new Date($(this).val()) > _this.max_date || new Date($(this).val()) < _this.min_date) {
            $(this).addClass('invalid');
            $('.btn.apply').addClass('disabled');
            $('.btn.apply').prop('disabled', true);
        }
        else {
            $(this).removeClass('invalid');
            $('.btn.apply').removeClass('disabled');
            $('.btn.apply').prop('disabled', false);
            _this.base_todate = new Date($(this).val());
        }

    });

    $($('.daterange.comparerange .dateoption')[0]).focus(function (e) {
        _this.currentMode = 'compare-from';
        _this.handleChange();
    });

    $($('.daterange.comparerange .dateoption')[0]).blur(function (e) {
        $($('.daterange.comparerange .dateoption')[0]).val(_this.formatDate(_this.compare_fromdate));
        $(this).removeClass('invalid');
        $('.btn.apply').removeClass('disabled');
        $('.btn.apply').prop('disabled', false);
        _this.currentMode = 'compare-from';
        _this.handleChange();
    });

    $($('.daterange.comparerange .dateoption')[0]).keyup(function (e) {
        if (new Date($(this).val()) == 'Invalid Date' || new Date($(this).val()) > _this.compare_todate || new Date($(this).val()) > _this.max_date || new Date($(this).val()) < _this.min_date) {
            $(this).addClass('invalid');
            $('.btn.apply').addClass('disabled');
            $('.btn.apply').prop('disabled', true);
        }
        else {
            $(this).removeClass('invalid');
            $('.btn.apply').removeClass('disabled');
            $('.btn.apply').prop('disabled', false);
            _this.compare_fromdate = new Date($(this).val());
        }
    });

    $($('.daterange.comparerange .dateoption')[1]).focus(function (e) {
        _this.currentMode = 'compare-to';
        _this.handleChange();
    });

    $($('.daterange.comparerange .dateoption')[1]).blur(function (e) {
        $($('.daterange.comparerange .dateoption')[1]).val(_this.formatDate(_this.compare_todate));
        $(this).removeClass('invalid');
        $('.btn.apply').removeClass('disabled');
        $('.btn.apply').prop('disabled', false);
        _this.currentMode = 'compare-to';
        _this.handleChange();
    });

    $($('.daterange.comparerange .dateoption')[1]).keyup(function (e) {
        if (new Date($(this).val()) == 'Invalid Date' || new Date($(this).val()) < _this.compare_fromdate || new Date($(this).val()) > _this.base_todate || new Date($(this).val()) > _this.max_date || new Date($(this).val()) < _this.min_date) {
            $(this).addClass('invalid');
            $('.btn.apply').addClass('disabled');
            $('.btn.apply').prop('disabled', true);
        }
        else {
            $(this).removeClass('invalid');
            $('.btn.apply').removeClass('disabled');
            $('.btn.apply').prop('disabled', false);
            _this.compare_todate = new Date($(this).val());
        }
    });

    $('.jarvis .optionscontainer .cancel').click(function (e) {

        _this.base_fromdate = _this.original_base_fromdate;
        _this.base_todate = _this.original_base_todate;

        _this.compare_fromdate = _this.original_compare_fromdate;
        _this.compare_todate = _this.original_compare_todate;

        if (!_this.comparePeriod) {
            if ($('.compareoption .checker').is(":checked")) {
                $('.compareoption .checker').click();
                $('.compareoption .checker').prop('checked', false);
            }
        }
        else {
            if (!$('.compareoption .checker').is(":checked")) {
                $('.compareoption .checker').click();
                $('.compareoption .checker').prop('checked', true);
            }
        }
        $($('.daterange.baserange .dateoption')[0]).val(_this.formatDate(_this.base_fromdate));
        $($('.daterange.baserange .dateoption')[1]).val(_this.formatDate(_this.base_todate));
        $($('.daterange.comparerange .dateoption')[0]).val(_this.formatDate(_this.compare_fromdate));
        $($('.daterange.comparerange .dateoption')[1]).val(_this.formatDate(_this.compare_todate));

        _this.handleChange();

        $('.jarvis.datebox .container').click();
    });
    $('.jarvis .optionscontainer .selector').change(function (e) {
        switch (this.value) {
            case 'today':
                _this.base_todate = _this.fixDate(new Date(), true);
                _this.base_fromdate = _this.addDays(_this.base_todate, -0);
                break;
            case 'yesterday':
                _this.base_todate = _this.fixDate(new Date(), true);
                _this.base_todate = _this.addDays(_this.base_todate, -1);
                _this.base_fromdate = _this.addDays(_this.base_todate, -0);
                break;
            case 'lastweek':
                _this.base_fromdate = _this.fixDate(new Date(), true);
                _this.base_fromdate = _this.addDays(_this.base_fromdate, -1 * (_this.base_fromdate.getDay() + 7));
                _this.base_todate = _this.addDays(_this.base_fromdate, 6);
                break;
            case 'lastmonth':
                var curr = _this.fixDate(new Date(), true);
                var last = _this.addDays(curr, -1 * (curr.getDate()));
                var first = _this.addDays(last, -1 * (last.getDate() - 1));
                _this.base_todate = _this.fixDate(new Date(), true);
                _this.base_todate = _this.addDays(_this.base_todate, -1 * (_this.base_todate.getDate()))
                _this.base_fromdate = _this.addDays(_this.base_todate, -1 * (_this.base_todate.getDate() - 1));

                break;
            default:
                break;


        }
        var rangelength = Date.dateDiff('d', _this.base_fromdate, _this.base_todate);
        _this.compare_todate = _this.addDays(_this.base_fromdate, -1);
        _this.compare_fromdate = _this.addDays(_this.compare_todate, (-1 * rangelength));

        $($('.daterange.baserange .dateoption')[0]).val(_this.formatDate(_this.base_fromdate));
        $($('.daterange.baserange .dateoption')[1]).val(_this.formatDate(_this.base_todate));
        $($('.daterange.comparerange .dateoption')[0]).val(_this.formatDate(_this.compare_fromdate));
        $($('.daterange.comparerange .dateoption')[1]).val(_this.formatDate(_this.compare_todate));

        _this.handleChange();
    });

    $($('.daterange.baserange .dateoption')[0]).val(_this.formatDate(_this.base_fromdate));
    $($('.daterange.baserange .dateoption')[1]).val(_this.formatDate(_this.base_todate));
    $($('.daterange.comparerange .dateoption')[0]).val(_this.formatDate(_this.compare_fromdate));
    $($('.daterange.comparerange .dateoption')[1]).val(_this.formatDate(_this.compare_todate));


    /*
     $(".picker").position({
     my:"right bottom",
     at:"right top",
     of:$('.jarvis.datebox .container'), // or $("#otherdiv),
     offset:_this.offsetX +  ' ' + _this.offsetY
     });*/

    $('.jarvis.datebox .container').off('click');
    $('.jarvis.datebox .container').on('click', function (e) {


        if ($(this).hasClass('expanded')) {

            $(this).removeClass('expanded');
            $('.jarvis.picker.datebox .picker').hide();
        }
        else {
            $(jarvis).trigger('jarvis-picker-metrics-popup', [_this]);
            $(this).addClass('expanded');
            //$(Container).find('.picker').offset({left:left});

            _this.base_fromdate = _this.applied_base_fromdate;
            _this.base_todate = _this.applied_base_todate;
            _this.compare_fromdate = _this.applied_compare_fromdate;
            _this.compare_todate = _this.applied_compare_todate;

            _this.original_base_fromdate = _this.applied_base_fromdate;
            _this.original_base_todate = _this.applied_base_todate;
            _this.original_compare_fromdate = _this.applied_compare_fromdate;
            _this.original_compare_todate = _this.applied_compare_todate;

            //$('.picker').offset({top: 0, left:0});
            //$('.picker').offset($('.jarvis.datebox .container').offset());
            $('.jarvis.picker.datebox .picker').show();
            $('.jarvis.picker.datebox .picker').offset({top: $('.jarvis.picker.datebox .picker').offset().top, left: $('.jarvis.picker.datebox .container').offset().left - $('.jarvis.picker.datebox .picker').outerWidth() + $('.jarvis.picker.datebox .container').outerWidth()});

            $('.metricscontainer').hide();
            $('.metricscontainer').removeClass('on');
            $('.metricswrapper .jbtn').removeClass('active');
        }

    });
    $('.jarvis.datebox').click(function (e) {
        e.stopPropagation();
    });

    $('body').click(function (e) {
        $('.jarvis.datebox .container').removeClass('expanded');
        $('.jarvis.datebox .picker').hide();
    });

    $('.jarvis.datebox .optionscontainer .apply').click(function (e) {
        $('.jarvis.datebox .container').removeClass('expanded');
        $('.jarvis.picker.datebox .picker').hide();
        _this.comparePeriod = _this.isCompareChecked;
        _this.DateUpdate();
    });

    if (this.comparePeriod)
        this.isCompareChecked = true;

    if (this.disableCompare)
        $('.compareoption .checker').attr('disabled', 'disabled');

    this.registerDateUpdate(this.updateLabels);
    this.handleChange();
};

jarvis.visualisation.picker.DateBox.drawCell = function (date) {
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

jarvis.visualisation.picker.DateBox.fixDate = function (timestamp, zero) {
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


//    month = (month < 10) ? '0' + month : month;
//    day = (day < 10) ? '0' + day : day;
//    hours = (hours < 10) ? '0' + hours : hours;

//    if (hours == 24) {
//        hours = '00';
//        bAddDay = true;
//    }
//    minutes = (minutes < 10) ? '0' + minutes : minutes;
//    seconds = (seconds < 10) ? '0' + seconds : seconds;


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
}

jarvis.visualisation.picker.DateBox.formatDate = function (date) {

    return jarvis.date.formatDate(date);

    var dd = date.getDate();
    var mm = date.getMonth();
    var yy = date.getFullYear();
    var dDate = new Date(yy, mm, dd);

    return Highcharts.dateFormat('%b %e, %Y', jarvis.visualisation.picker.DateBox.fixDate(date));
}


jarvis.visualisation.picker.DateBox.handleChange = function (options) {
    var _this = this;


    $('.datepicker').not(this).each(function () {
        $(this).datepicker('refresh');
    });

    /*
     $($('.daterange.baserange .dateoption')[0]).val(formatDate(_this.base_fromdate));
     $($('.daterange.baserange .dateoption')[1]).val(formatDate(_this.base_todate));
     $($('.daterange.comparerange .dateoption')[0]).val(formatDate(_this.compare_fromdate));
     $($('.daterange.comparerange .dateoption')[1]).val(formatDate(_this.compare_todate));
     */

    $($('.daterange.baserange .dateoption')[1]).removeClass('active');
    $($('.daterange.comparerange .dateoption')[0]).removeClass('active');
    $($('.daterange.comparerange .dateoption')[1]).removeClass('active');

    switch (this.currentMode) {
        case 'base-from':
            if (_this.base_fromdate < _this.min_date) {
                _this.base_fromdate = _this.min_date;
                $($('.daterange.baserange .dateoption')[0]).val(_this.formatDate(_this.base_fromdate));
            }
            if (_this.base_fromdate > _this.max_date) {
                _this.base_fromdate = _this.max_date;
                $($('.daterange.baserange .dateoption')[0]).val(_this.formatDate(_this.base_fromdate));
            }
            $($('.daterange.baserange .dateoption')[0]).addClass('active');
            $($('.daterange.baserange .dateoption')[1]).removeClass('active');
            $($('.daterange.comparerange .dateoption')[0]).removeClass('active');
            $($('.daterange.comparerange .dateoption')[1]).removeClass('active');

            break;
        case 'base-to':
            if (_this.base_todate < _this.min_date) {
                _this.base_todate = _this.min_date;
                $($('.daterange.baserange .dateoption')[1]).val(_this.formatDate(_this.base_todate));
            }
            if (_this.base_todate > _this.max_date) {
                _this.base_todate = _this.max_date;
                $($('.daterange.baserange .dateoption')[1]).val(_this.formatDate(_this.base_todate));
            }
            $($('.daterange.baserange .dateoption')[0]).removeClass('active');
            $($('.daterange.baserange .dateoption')[1]).addClass('active');
            $($('.daterange.comparerange .dateoption')[0]).removeClass('active');
            $($('.daterange.comparerange .dateoption')[1]).removeClass('active');

            break;
        case 'compare-from':
            if (_this.compare_fromdate < _this.min_date) {
                _this.compare_fromdate = _this.min_date;
                $($('.daterange.comparerange .dateoption')[0]).val(_this.formatDate(_this.compare_fromdate));
            }
            if (_this.compare_fromdate > _this.max_date) {
                _this.compare_fromdate = _this.max_date;
                $($('.daterange.comparerange .dateoption')[0]).val(_this.formatDate(_this.compare_fromdate));
            }

            $($('.daterange.baserange .dateoption')[0]).removeClass('active');
            $($('.daterange.baserange .dateoption')[1]).removeClass('active');
            $($('.daterange.comparerange .dateoption')[0]).addClass('active');
            $($('.daterange.comparerange .dateoption')[1]).removeClass('active');

            break;
        case 'compare-to':
            if (_this.compare_todate < _this.min_date) {
                _this.compare_todate = _this.min_date;
                $($('.daterange.comparerange .dateoption')[1]).val(_this.formatDate(_this.compare_todate));
            }
            if (_this.compare_todate > _this.max_date) {
                _this.compare_todate = _this.max_date;
                $($('.daterange.comparerange .dateoption')[1]).val(_this.formatDate(_this.compare_todate));
            }

            $($('.daterange.baserange .dateoption')[0]).removeClass('active');
            $($('.daterange.baserange .dateoption')[1]).removeClass('active');
            $($('.daterange.comparerange .dateoption')[0]).removeClass('active');
            $($('.daterange.comparerange .dateoption')[1]).addClass('active');

            break;
        default:
            break;
    }

    if ((_this.compare_fromdate > _this.base_todate || _this.compare_todate > _this.base_todate) && this.isCompareChecked) {
        var rangelength = Date.dateDiff('d', _this.base_fromdate, _this.base_todate);
        _this.compare_todate = _this.addDays(_this.base_fromdate, -1);
        _this.compare_fromdate = _this.addDays(_this.compare_todate, (-1 * rangelength));
        if (_this.compare_fromdate < _this.min_date) {
            _this.compare_fromdate = _this.min_date;
        }
        $($('.daterange.comparerange .dateoption')[0]).val(_this.formatDate(_this.compare_fromdate));
        $($('.daterange.comparerange .dateoption')[1]).val(_this.formatDate(_this.compare_todate));


        if (this.currentMode == 'compare-to')
            $($('.daterange.comparerange .dateoption')[1]).focus();
        else (this.currentMode == 'compare-from')
        $($('.daterange.comparerange .dateoption')[0]).focus();

    }

    if (this.isCompareChecked) {
        $('.jarvis .optionscontainer .checker').prop("checked", true);
        $('.jarvis .optionscontainer .daterange.comparerange').show();

    }
    else {
        $('.jarvis .optionscontainer .checker').prop("checked", false);
        $('.jarvis .optionscontainer .daterange.comparerange').hide();
    }

    $('.jarvis .optionscontainer .checker').off('click');
    $('.jarvis .optionscontainer .checker').on('click', function (e) {
        _this.isCompareChecked = !_this.isCompareChecked;
        if (_this.isCompareChecked)
            _this.currentMode = 'compare-from';
        else
            _this.currentMode = 'base-from';

        var rangelength = Date.dateDiff('d', _this.base_fromdate, _this.base_todate);


        _this.compare_todate = _this.addDays(_this.base_fromdate, -1);
        _this.compare_fromdate = _this.addDays(_this.compare_todate, (-1 * rangelength));
        if (_this.compare_fromdate < _this.min_date) {
            _this.compare_fromdate = _this.min_date;
        }
        $($('.daterange.comparerange .dateoption')[0]).val(_this.formatDate(_this.compare_fromdate));
        $($('.daterange.comparerange .dateoption')[1]).val(_this.formatDate(_this.compare_todate));


        _this.handleChange();
    });
};

jarvis.visualisation.picker.DateBox.updateLabels = function (sender, options) {
    /*
     $('.dates').append('<span class="datelabel fromdate">' + formatDate(_this.base_fromdate) + '</span>');
     $('.dates').append(' - ');
     $('.dates').append('<span class="datelabel todate">' + formatDate(_this.base_todate) + '</span>');
     if (_this.comparePeriod) {
     $('.dates').append('<div class="compare">Compare to: <span class="datelabel compare fromdate">Mar 31, 2012</span> - <span class="datelabel compare todate">Apr 30, 2012</span></div>');
     }*/


    //$('.dates .datelabel.fromdate').text(sender.formatDate(options.base_fromdate));
    //$('.dates .datelabel.todate').text(sender.formatDate(options.base_todate));

    $('.dates .datelabel.fromdate').text(jarvis.date.formatDate(options.base_fromdate));
    $('.dates .datelabel.todate').text(jarvis.date.formatDate(options.base_todate));

    //$('.dates .datelabel.compare.fromdate').text(sender.formatDate(options.compare_fromdate));
    //$('.dates .datelabel.compare.todate').text(sender.formatDate(options.compare_todate));

    $('.dates .datelabel.compare.fromdate').text(jarvis.date.formatDate(options.compare_fromdate));
    $('.dates .datelabel.compare.todate').text(jarvis.date.formatDate(options.compare_todate));

    if (options.compare) {

        $(".jarvis.picker.datebox").addClass('compare');
        $(".jarvis.picker.datebox .picker").addClass('compare');
        $('.jarvis.picker.datebox .dates .compare').show();
        //$('.picker').css({'margin':'30px;','backgroundColor':'red'});
    }
    else {
        $(".jarvis.picker.datebox").removeClass('compare');
        $(".jarvis.picker.datebox .picker").removeClass('compare');
        $('.jarvis.picker.datebox .dates .compare').hide();
    }


}

jarvis.visualisation.picker.DateBox.DateUpdate = function () {
    var _this = this;
    var options = new Object();

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
    $(this.callbacks).each(function (index, item) {
        _this.callbacks[index].callback(_this, options);
    })
    _this.setState(_this);
    $(_this).trigger('datechange', options);
    $(jarvis).trigger('datechange', options);
};

jarvis.visualisation.picker.DateBox.setState = function (sender) {
    var _this = sender;
    jarvis.state.fromdate = _this.base_fromdate;
    jarvis.state.todate = _this.base_todate;
    jarvis.state.comparePeriod = _this.comparePeriod;
    jarvis.state.compare_fromdate = _this.compare_fromdate;
    jarvis.state.compare_todate = _this.compare_todate;

    //jarvis.saveState('Date change');
};

jarvis.visualisation.picker.DateBox.getState = function (sender) {
    var _this = sender;


    //return;

    if (jarvis.state.fromdate != null) {
        _this.base_fromdate = new Date(jarvis.state.fromdate);
        _this.base_todate = new Date(jarvis.state.todate);
        _this.comparePeriod = jarvis.state.comparePeriod;
        _this.compare_fromdate = new Date(jarvis.state.compare_fromdate);
        _this.compare_todate = new Date(jarvis.state.compare_todate);
    }
};

jarvis.visualisation.picker.DateBox.registerDateUpdate = function (callback, sender) {
    this.callbacks.push({callback: callback, sender: sender});
};

jarvis.visualisation.picker.DateBox.getDate = function () {
    var _this = this;
    var options = new Object();

    this.applied_base_todate.setHours(23);
    this.applied_base_todate.setMinutes(59);
    this.applied_base_todate.setSeconds(59);
    this.applied_base_todate.setMilliseconds(999);

    this.applied_compare_todate.setHours(23);
    this.applied_compare_todate.setMinutes(59);
    this.applied_compare_todate.setSeconds(59);
    this.applied_compare_todate.setMilliseconds(999);


    options = {
        base_fromdate: this.applied_base_fromdate,
        base_todate: this.applied_base_todate,
        compare_fromdate: this.applied_compare_fromdate,
        compare_todate: this.applied_compare_todate,
        compare: this.comparePeriod
    };
    return options;
};

jarvis.visualisation.picker.DateBox.setDate = function (sender, fromdate, todate) {
    var _this = sender;

    _this.base_fromdate = fromdate;
    _this.base_todate = todate;

    var rangelength = Date.dateDiff('d', _this.base_fromdate, _this.base_todate);
    _this.compare_todate = _this.addDays(_this.base_fromdate, -1);
    _this.compare_fromdate = _this.addDays(_this.compare_todate, (-1 * rangelength));

    var options = {
        base_fromdate: _this.base_fromdate,
        base_todate: _this.base_todate,
        compare_fromdate: _this.compare_fromdate,
        compare_todate: _this.compare_todate,
        compare: _this.comparePeriod
    };


    _this.handleChange();
    _this.updateLabels(_this, options);
};

jarvis.debug.log('INFO', 'jarvis.visualisation.picker.DateBox', 6, 'JS source loaded');

/**
 * init the Datebox and look for containers
 */

//if ($('.jarvis.report.panel').length == 0)
//jarvis.visualisation.picker.DateBox.init();
