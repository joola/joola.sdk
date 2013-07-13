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
 * @fileoverview Provides a realtime visualisation to display current server date and time.
 *
 */


jarvis.provide('jarvis.visualisation.realtime.DateBox');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

//jarvis.require('jarvis.realtime');
jarvis.require('jarvis.visualisation.realtime');

/**
 * Create and install a realtime datebox handler.
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
 jarvis.debug.log('INFO', 'jarvis.visualisation.realtime.DateBox', 5, '...Constructor (' + executionTime + 'ms)');
 };
 */

/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
jarvis.visualisation.realtime.DateBox.init = function (options, container) {
    var _this = this;
    var start = new Date().getMilliseconds();

    this._this = this;
    this.options = options;

    this.containers = this.containers || [];

    //turn on realtime comet
    jarvis.visualisation.realtime.start();

    //lookup any containers relevant for the datebox
    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.jarvis.realtime.datebox');
    if (matchedContainers.length == 0)
        return;

    $(matchedContainers).each(function (index, item) {

        if (!$(this).parent().hasClass('prettyprint')) {

            jarvis.debug.log('INFO', 'jarvis.visualisation.realtime.DateBox', 6, 'Applying to container (\'' + this.id + '\')');

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

    _this.setContent(_this.formatter(jarvis.date.getServerTimestamp()));

    if (matchedContainers.length > 0)
        window.jarvisResponse_ServerTimestamp = jarvis.visualisation.realtime.DateBox.jarvisResponse_ServerTimestamp;


    var executionTime = new Date().getMilliseconds() - start;
    jarvis.debug.log('INFO', 'jarvis.visualisation.realtime.DateBox', 5, '...init (' + executionTime + 'ms)');
};

jarvis.visualisation.realtime.DateBox.setContent = function (content) {
    $(jarvis.visualisation.realtime.DateBox.containers).each(function (index, item) {
        var datebox = $(this).find('.datebox');

        //console.log($(this).attr('data-format'));

        var fixedcontent = jarvis.visualisation.realtime.DateBox.formatter(content, $(this).attr('data-format'));

        $(datebox[0]).text(fixedcontent);
        $(this).data({data:content});
    })
};

jarvis.visualisation.realtime.DateBox.jarvisResponse_ServerTimestamp = function (message) {
    var data = new Date(message);
    jarvis.visualisation.realtime.DateBox.setContent(data);
};

/**
 * Inits the class and builds the base html for it.
 * @return (string) returns the base html to be applied in the container
 */
jarvis.visualisation.realtime.DateBox.baseHTML = function () {
    var $html = $('<div class="wrapper"></div>');
    $html.append('<div class="datebox"></div>');
    return $html;
};


/**
 * Inits the class and builds the base html for it.
 * @param (date) datetime to be manipulated
 * @return (string) returns the formatted date
 */
jarvis.visualisation.realtime.DateBox.formatter = function (datetime, format) {
    if (!format)
        format = 'mmm dd, yyyy hh:nn:ss';

    return jarvis.date.formatDate(datetime, format);
};


jarvis.debug.log('INFO', 'jarvis.visualisation.realtime.DateBox', 6, 'JS source loaded');

/**
 * init the Datebox and look for containers
 */
//jarvis.visualisation.realtime.DateBox.init();
