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

joolaio.provide('joolaio.visualisation.realtime.DateBox');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

//joolaio.require('joolaio.realtime');
joolaio.require('joolaio.visualisation.realtime');

/**
 * Create and install a realtime datebox handler.
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
 joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.DateBox', 5, '...Constructor (' + executionTime + 'ms)');
 };
 */

/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
joolaio.visualisation.realtime.DateBox.init = function (options, container) {
    var _this = this;
    var start = new Date().getMilliseconds();

    this._this = this;
    this.options = options;

    this.containers = this.containers || [];

    //turn on realtime comet
    joolaio.visualisation.realtime.start();

    //lookup any containers relevant for the datebox
    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.joolaio.realtime.datebox');
    if (matchedContainers.length == 0)
        return;

    $(matchedContainers).each(function (index, item) {

        if (!$(this).parent().hasClass('prettyprint')) {

            joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.DateBox', 6, 'Applying to container (\'' + this.id + '\')');

            //apply html and bind methods/events
            $(this).html(_this.baseHTML());

            $(this).bind('data', function (evt, ret) {
                ret.data = $(this).data().data;
            });

            $(this).bind('click', function (evt) {
                $(this).trigger('clicked', $(this).data().data);
            });

            var datebox = $(this).find('.datebox');
            if (datebox.length == 0)
                throw 'Could not find a valid .datebox in container ' + container;
            else {
                _this.containers.push(this);
            }
        }
    });

    _this.setContent(_this.formatter(joolaio.date.getServerTimestamp()));

    if (matchedContainers.length > 0)
        window.joolaioResponse_ServerTimestamp = joolaio.visualisation.realtime.DateBox.joolaioResponse_ServerTimestamp;


    var executionTime = new Date().getMilliseconds() - start;
    joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.DateBox', 5, '...init (' + executionTime + 'ms)');
};

joolaio.visualisation.realtime.DateBox.setContent = function (content) {
    $(joolaio.visualisation.realtime.DateBox.containers).each(function (index, item) {
        var datebox = $(this).find('.datebox');

        //console.log($(this).attr('data-format'));

        var fixedcontent = joolaio.visualisation.realtime.DateBox.formatter(content, $(this).attr('data-format'));

        $(datebox[0]).text(fixedcontent);
        $(this).data({data:content});
    })
};

joolaio.visualisation.realtime.DateBox.joolaioResponse_ServerTimestamp = function (message) {
    var data = new Date(message);
    joolaio.visualisation.realtime.DateBox.setContent(data);
};

/**
 * Inits the class and builds the base html for it.
 * @return (string) returns the base html to be applied in the container
 */
joolaio.visualisation.realtime.DateBox.baseHTML = function () {
    var $html = $('<div class="wrapper"></div>');
    $html.append('<div class="datebox"></div>');
    return $html;
};


/**
 * Inits the class and builds the base html for it.
 * @param (date) datetime to be manipulated
 * @return (string) returns the formatted date
 */
joolaio.visualisation.realtime.DateBox.formatter = function (datetime, format) {
    if (!format)
        format = 'mmm dd, yyyy hh:nn:ss';

    return joolaio.date.formatDate(datetime, format);
};


joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.DateBox', 6, 'JS source loaded');

/**
 * init the Datebox and look for containers
 */
//joolaio.visualisation.realtime.DateBox.init();
