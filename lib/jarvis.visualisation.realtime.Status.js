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


jarvis.provide('jarvis.visualisation.realtime.Status');

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
jarvis.visualisation.realtime.Status.init = function (options, container) {
    var _this = this;
    var start = new Date().getMilliseconds();

    this._this = this;
    this.options = options;

    this.containers = this.containers || [];

    //turn on realtime comet
    //jarvis.realtime.start();

    //lookup any containers relevant for the datepicker
    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.jarvis.realtime.status');
    if (matchedContainers.length == 0)
        return;

    $(matchedContainers).each(function (index, item) {

        if (!$(this).parent().hasClass('prettyprint')) {

            jarvis.debug.log('INFO', 'jarvis.visualisation.realtime.Status', 6, 'Applying to container (\'' + this.id + '\')');

            //apply html and bind methods/events
            $(this).html(_this.baseHTML());

            $(this).bind('isConnected', function (evt, ret) {
                ret.data = jarvis.visualisation.realtime.connected;
            });

            $(this).find('.alert .close').bind('click', function (evt) {
                //console.log('dismissed');
                $(this).trigger('dismissed', $(this).data().data);
            });

            _this.containers.push(this);
            jarvis.visualisation.realtime.statusboxes.push(this);
        }
    });

    _this.setContent();
    $(jarvis.realtime).bind('cometstart', function (e) {
        _this.setContent();
    });
    $(jarvis.realtime).bind('cometstop', function (e) {
        _this.setContent();
    });


    jarvis.objects.Dimensions.List();
    jarvis.objects.Metrics.List();

    var executionTime = new Date().getMilliseconds() - start;
    jarvis.debug.log('INFO', 'jarvis.visualisation.realtime.Status', 5, '...init (' + executionTime + 'ms)');
};

jarvis.visualisation.realtime.Status.setContent = function (content) {
    $(jarvis.visualisation.realtime.Status.containers).each(function (index, item) {
        var connected = null;
        var paused = null;
        var showwhenworking = null;

        if ($(this).attr('data-connected'))
            connected = eval($(this).attr('data-connected'));
        else
            connected = jarvis.visualisation.realtime.connected;

        if ($(this).attr('data-paused'))
            paused = eval($(this).attr('data-paused'));
        else
            paused = jarvis.visualisation.realtime.paused;

        if ($(this).attr('data-showwhenworking'))
            showwhenworking = eval($(this).attr('data-showwhenworking'));
        else
            showwhenworking = false;

        var message = "";
        var className = "";

        if (!jarvis.visualisation.realtime.serverrunning) {
            className = "alert-error";
            message = "<strong>Realtime error!</strong> The Realtime system appears to be offline.";
            $(this).show();
        }
        else if (connected) {
            className = "alert-success";
            message = "<strong>Realtime working!</strong> All systems seem to be working correctly.";
            if (!showwhenworking) {
                $(this).hide();
            }
        }
        else if (!connected && !paused) {
            className = "alert-error";
            message = "<strong>Realtime error!</strong> Realtime appears to be stopped.";
            $(this).show();
        }
        else if (!connected && paused) {
            className = "alert-info";
            if (jarvis.visualisation.realtime.pausedTime != null)
                message = "Realtime is currently paused at <strong>" + jarvis.date.formatDate(jarvis.visualisation.realtime.pausedTime, 'hh:nn', true) + "</strong>";
            else
                message = "<strong>Realtime paused!</strong> Realtime view is currently paused";
            $(this).show();
        }

        $(this).find('.content').html(message);
        $(this).find('.alert').removeClass('alert-success');
        $(this).find('.alert').removeClass('alert-error');
        $(this).find('.alert').removeClass('alert-info');
        $(this).find('.alert').addClass(className);

        $(this).data({data:message});
    })
};

jarvis.visualisation.realtime.Status.jarvisResponse_ServerTimestamp = function (message) {
    var data = new Date(message);
    jarvis.visualisation.realtime.Status.setContent(data);
};

/**
 * Inits the class and builds the base html for it.
 * @return (string) returns the base html to be applied in the container
 */
jarvis.visualisation.realtime.Status.baseHTML = function () {
    var $html = $('<div class="alert" ></div>');
    $html.append('<button class="close" data-dismiss="alert">×</button>');
    $html.append('<span class="content"></span>');
    return $html;
};


/**
 * Inits the class and builds the base html for it.
 * @param (date) datetime to be manipulated
 * @return (string) returns the formatted date
 */
jarvis.visualisation.realtime.Status.formatter = function (datetime, format) {
    if (!format)
        format = 'mmm dd, yyyy hh:nn:ss';

    return jarvis.date.formatDate(datetime, format);
};


jarvis.debug.log('INFO', 'jarvis.visualisation.realtime.Status', 6, 'JS source loaded');

/**
 * init the DatePicker and look for containers
 */
//if ($('.jarvis.realtime.panel').length == 0)
//    jarvis.visualisation.realtime.Status.init();
