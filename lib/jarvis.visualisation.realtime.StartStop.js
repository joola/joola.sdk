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
 * @fileoverview Provides an alert box displaying realtime status.
 *
 */


jarvis.provide('jarvis.visualisation.realtime.StartStop');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

//jarvis.require('jarvis.realtime');
jarvis.require('jarvis.visualisation.realtime');

/**
 * Create and install a realtime datepicker handler.
 * @constructor
 * @param {string=} options optional options to be passed to class
 */
/*
 jarvis.Realtime.Visualisation.DatePicker = function (options) {
 var start = new Date().getMilliseconds();

 this._this = this;
 this.options = options;

 this.containers = [];
 this.callback_newData = [];

 //turn on realtime comet
 new jarvis.Realtime().start();

 //this._this = this;
 //jarvis.debug.log(0,0, 'server timestamp - ' + jarvis.date.getServerTimestamp());

 var executionTime = new Date().getMilliseconds() - start;
 jarvis.debug.log('INFO', 'Jarvis.Realtime.Visualisation.DatePicker', 5, '...Constructor (' + executionTime + 'ms)');
 };
 */

/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
jarvis.visualisation.realtime.StartStop.init = function (options, container) {
    var _this = this;
    var start = new Date().getMilliseconds();

    this._this = this;
    this.options = options;

    this.containers = this.containers || [];


    jarvis.objects.Dimensions.List();
    jarvis.objects.Metrics.List();

    //turn on realtime comet
    //jarvis.realtime.start();

    //lookup any containers relevant for the datepicker
    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.jarvis.realtime.startstop');
    if (matchedContainers.length == 0)
        return;

    $(matchedContainers).each(function (index, item) {
        if (!$(this).parent().hasClass('prettyprint')) {
            jarvis.debug.log('INFO', 'jarvis.visualisation.realtime.StartStop', 6, 'Applying to container (\'' + this.id + '\')');

            //apply html and bind methods/events
            if ($(this).hasClass('start')) {
                $(this).addClass('btn btn-large btn-primary');
                //bind to click events and start/stop realtime
                $(this).off('click');
                $(this).bind('click', function (e) {
                    jarvis.visualisation.realtime.restart();
                });

                if (jarvis.visualisation.realtime.connected)
                    $(this).addClass('disabled');
            }
            else if ($(this).hasClass('stop')) {
                $(this).addClass('btn btn-large');
                //bind to click events and start/stop realtime
                $(this).off('click');
                $(this).bind('click', function (e) {
                    jarvis.visualisation.realtime.stop();
                });

                if (!jarvis.visualisation.realtime.connected)
                    $(this).addClass('disabled');
            }

            $(this).find('.alert .close').bind('click', function (evt) {
                $(this).trigger('dismissed', $(this).data().data);
            });

            _this.containers.push(this);
        }
    });

    //disable the buttons according to current realtime state
    $(jarvis.realtime).bind('cometstart', function (e) {
        $(_this.containers).each(function (index, item) {
            if ($(this).hasClass('start'))
                $(this).addClass('disabled');
            else if ($(this).hasClass('stop'))
                $(this).removeClass('disabled');
        });
    });

    $(jarvis.realtime).bind('cometstop', function (e) {
        $(_this.containers).each(function (index, item) {
            if ($(this).hasClass('start'))
                $(this).removeClass('disabled');
            else if ($(this).hasClass('stop'))
                $(this).addClass('disabled');
        });

    });

    var executionTime = new Date().getMilliseconds() - start;
    jarvis.debug.log('INFO', 'jarvis.visualisation.realtime.StartStop', 5, '...init (' + executionTime + 'ms)');
};


jarvis.debug.log('INFO', 'Jarvis.Realtime.Visualisation.Status', 6, 'JS source loaded');

/**
 * init the DatePicker and look for containers
 */
//if ($('.jarvis.realtime.panel').length == 0)
//    jarvis.visualisation.realtime.StartStop.init();
