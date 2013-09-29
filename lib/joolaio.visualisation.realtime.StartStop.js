/**
 *  joola.io
 *
 *  Copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 *
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 */


joolaio.provide('joolaio.visualisation.realtime.StartStop');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

//joolaio.require('joolaio.realtime');
joolaio.require('joolaio.visualisation.realtime');

/**
 * Create and install a realtime datepicker handler.
 * @constructor
 * @param {string=} options optional options to be passed to class
 */
/*
 joolaio.Realtime.Visualisation.DatePicker = function (options) {
 var start = new Date().getMilliseconds();

 this._this = this;
 this.options = options;

 this.containers = [];
 this.callback_newData = [];

 //turn on realtime comet
 new joolaio.Realtime().start();

 //this._this = this;
 //joolaio.debug.log(0,0, 'server timestamp - ' + joolaio.date.getServerTimestamp());

 var executionTime = new Date().getMilliseconds() - start;
 joolaio.debug.log('INFO', 'joolaio.Realtime.Visualisation.DatePicker', 5, '...Constructor (' + executionTime + 'ms)');
 };
 */

/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
joolaio.visualisation.realtime.StartStop.init = function (options, container) {
    var _this = this;
    var start = new Date().getMilliseconds();

    this._this = this;
    this.options = options;

    this.containers = this.containers || [];


    joolaio.objects.Dimensions.List();
    joolaio.objects.Metrics.List();

    //turn on realtime comet
    //joolaio.realtime.start();

    //lookup any containers relevant for the datepicker
    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.joolaio.realtime.startstop');
    if (matchedContainers.length == 0)
        return;

    $(matchedContainers).each(function (index, item) {
        if (!$(this).parent().hasClass('prettyprint')) {
            joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.StartStop', 6, 'Applying to container (\'' + this.id + '\')');

            //apply html and bind methods/events
            if ($(this).hasClass('start')) {
                $(this).addClass('btn btn-large btn-primary');
                //bind to click events and start/stop realtime
                $(this).off('click');
                $(this).bind('click', function (e) {
                    joolaio.visualisation.realtime.restart();
                });

                if (joolaio.visualisation.realtime.connected)
                    $(this).addClass('disabled');
            }
            else if ($(this).hasClass('stop')) {
                $(this).addClass('btn btn-large');
                //bind to click events and start/stop realtime
                $(this).off('click');
                $(this).bind('click', function (e) {
                    joolaio.visualisation.realtime.stop();
                });

                if (!joolaio.visualisation.realtime.connected)
                    $(this).addClass('disabled');
            }

            $(this).find('.alert .close').bind('click', function (evt) {
                $(this).trigger('dismissed', $(this).data().data);
            });

            _this.containers.push(this);
        }
    });

    //disable the buttons according to current realtime state
    $(joolaio.realtime).bind('cometstart', function (e) {
        $(_this.containers).each(function (index, item) {
            if ($(this).hasClass('start'))
                $(this).addClass('disabled');
            else if ($(this).hasClass('stop'))
                $(this).removeClass('disabled');
        });
    });

    $(joolaio.realtime).bind('cometstop', function (e) {
        $(_this.containers).each(function (index, item) {
            if ($(this).hasClass('start'))
                $(this).removeClass('disabled');
            else if ($(this).hasClass('stop'))
                $(this).addClass('disabled');
        });

    });

    var executionTime = new Date().getMilliseconds() - start;
    joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.StartStop', 5, '...init (' + executionTime + 'ms)');
};


joolaio.debug.log('INFO', 'joolaio.Realtime.Visualisation.Status', 6, 'JS source loaded');

/**
 * init the DatePicker and look for containers
 */
//if ($('.joolaio.realtime.panel').length == 0)
//    joolaio.visualisation.realtime.StartStop.init();
