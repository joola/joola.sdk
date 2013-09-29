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

joolaio.provide('joolaio.visualisation.realtime.Status');

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
joolaio.visualisation.realtime.Status.init = function (options, container) {
    var _this = this;
    var start = new Date().getMilliseconds();

    this._this = this;
    this.options = options;

    this.containers = this.containers || [];

    //turn on realtime comet
    //joolaio.realtime.start();

    //lookup any containers relevant for the datepicker
    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.joolaio.realtime.status');
    if (matchedContainers.length == 0)
        return;

    $(matchedContainers).each(function (index, item) {

        if (!$(this).parent().hasClass('prettyprint')) {

            joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.Status', 6, 'Applying to container (\'' + this.id + '\')');

            //apply html and bind methods/events
            $(this).html(_this.baseHTML());

            $(this).bind('isConnected', function (evt, ret) {
                ret.data = joolaio.visualisation.realtime.connected;
            });

            $(this).find('.alert .close').bind('click', function (evt) {
                //console.log('dismissed');
                $(this).trigger('dismissed', $(this).data().data);
            });

            _this.containers.push(this);
            joolaio.visualisation.realtime.statusboxes.push(this);
        }
    });

    _this.setContent();
    $(joolaio.realtime).bind('cometstart', function (e) {
        _this.setContent();
    });
    $(joolaio.realtime).bind('cometstop', function (e) {
        _this.setContent();
    });


    joolaio.objects.Dimensions.List();
    joolaio.objects.Metrics.List();

    var executionTime = new Date().getMilliseconds() - start;
    joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.Status', 5, '...init (' + executionTime + 'ms)');
};

joolaio.visualisation.realtime.Status.setContent = function (content) {
    $(joolaio.visualisation.realtime.Status.containers).each(function (index, item) {
        var connected = null;
        var paused = null;
        var showwhenworking = null;

        if ($(this).attr('data-connected'))
            connected = eval($(this).attr('data-connected'));
        else
            connected = joolaio.visualisation.realtime.connected;

        if ($(this).attr('data-paused'))
            paused = eval($(this).attr('data-paused'));
        else
            paused = joolaio.visualisation.realtime.paused;

        if ($(this).attr('data-showwhenworking'))
            showwhenworking = eval($(this).attr('data-showwhenworking'));
        else
            showwhenworking = false;

        var message = "";
        var className = "";

        if (!joolaio.visualisation.realtime.serverrunning) {
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
            if (joolaio.visualisation.realtime.pausedTime != null)
                message = "Realtime is currently paused at <strong>" + joolaio.date.formatDate(joolaio.visualisation.realtime.pausedTime, 'hh:nn', true) + "</strong>";
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

joolaio.visualisation.realtime.Status.joolaioResponse_ServerTimestamp = function (message) {
    var data = new Date(message);
    joolaio.visualisation.realtime.Status.setContent(data);
};

/**
 * Inits the class and builds the base html for it.
 * @return (string) returns the base html to be applied in the container
 */
joolaio.visualisation.realtime.Status.baseHTML = function () {
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
joolaio.visualisation.realtime.Status.formatter = function (datetime, format) {
    if (!format)
        format = 'mmm dd, yyyy hh:nn:ss';

    return joolaio.date.formatDate(datetime, format);
};


joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.Status', 6, 'JS source loaded');

/**
 * init the DatePicker and look for containers
 */
//if ($('.joolaio.realtime.panel').length == 0)
//    joolaio.visualisation.realtime.Status.init();
