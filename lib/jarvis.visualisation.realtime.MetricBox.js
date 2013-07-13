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


jarvis.provide('jarvis.visualisation.realtime.MetricBox');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

//jarvis.require('jarvis.realtime');
jarvis.require('jarvis.visualisation.realtime');

/**
 * Create and install a realtime timeline handler.
 * @constructor
 * @param {string=} options optional options to be passed to class
 */

jarvis.visualisation.realtime.MetricBox = function (options) {
    var start = new Date().getMilliseconds();

    this._this = this;
    this.options = options;

    this.default_caption = 'Right now';
    this.default_subcaption = 'Events per Second';
    this.default_useAverage = true;

    this.key = '';

    this.initialized = false;
    this.gettingBackData = false;
    this.initialCallbacks = [];
    this.initialTimestamp = null;

    this.containers = [];

    jarvis.objects.Dimensions.List();
    jarvis.objects.Metrics.List();

    var executionTime = new Date().getMilliseconds() - start;
    //jarvis.debug.log('INFO', 'jarvis.visualisation.realtime.MetricBox', 5, '...Constructor (' + executionTime + 'ms)');
};


/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
jarvis.visualisation.realtime.MetricBox.prototype.init = function (options, container) {
    var _this = this;
    var start = new Date().getMilliseconds();

    this._this = this;
    this.options = options;

    this.containers = this.containers || [];

    //turn on realtime comet
    jarvis.visualisation.realtime.start();

    $(jarvis.realtime).bind('filterchange', function(e){

    });

    //lookup any containers relevant for the timeline
    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.jarvis.realtime.metricbox');
    if (matchedContainers.length == 0)
        return;

    $(matchedContainers).each(function (index, item) {
        if (!$(this).parent().hasClass('prettyprint')) {
            jarvis.debug.log('INFO', 'jarvis.visualisation.realtime.MetricBox', 6, 'Applying to container (\'' + this.id + '\')');

            //verify we have a metric
            var metric = $(this).attr('data-metrics');
            if (metric == null) {
                throw ('You must specify a metric for the metricbox');
            }

            //apply html and bind methods/events
            $(this).html(_this.baseHTML(item));

            $(this).bind('data', function (evt, ret) {
                ret.data = $(this).data().data;
            });

            $(this).bind('click', function (evt) {
                $(this).trigger('clicked', $(this).data().data);
            });

            var key = '' + "_" + metric + "_" + jarvis.visualisation.realtime.globalfilter + "_" + 'Timeline' + "_" + 3 + "_" + 60+ "___0";
            key = key.replace(/ /g, "").replace(/,/g, "").replace(/\./g, "");
            _this.key = key;
            if (jarvis.visualisation.realtime.connected) {
                jarvis.debug.log('INFO', 'Subscribing to comet channel (already connected) - ' + key, 6, '');
                //console.log('subscribing to comet channel (already connected) - '  + key);

                var client_id = PokeIn.GetClientId();
                var queryOptions = {
                    ClientID:client_id,
                    Dimensions:'',
                    Metrics:metric,
                    Filter:jarvis.visualisation.realtime.globalfilter,
                    Resolution:'Timeline',
                    Interval:3,
                    Period:60,
                    omitDate:true,
                    onlyUseCached:true,
                    callback:'jarvisResponse_Realtime_Response_MetricBox'
                };
                jarvis.dataaccess.fetch(this, '/engine/Realtime.svc/subscribe', queryOptions, function () {
                });

                //pCall['JarvisMessage'].Subscribe('', metric, '', 'Timeline', 1);
            }
            else {
                //console.log('subscribing to comet channel (bind) - '  + key);
                jarvis.debug.log('INFO', 'Subscribing to comet channel (bind) - ' + key, 6, '');

                $(jarvis.realtime).bind('cometstart', function (e) {
                    //console.log('calling subscribe');
                    //jarvis.debug.log('INFO', 'Subscribing to comet channel (already connected) - '  + key, 6, '');

                    var client_id = PokeIn.GetClientId();
                    var queryOptions = {
                        ClientID:client_id,
                        Dimensions:'',
                        Metrics:metric,
                        Filter:jarvis.visualisation.realtime.globalfilter,
                        Resolution:'Timeline',
                        Interval:3,
                        Period:60,
                        omitDate:true,
                        onlyUseCached:true,
                        callback:'jarvisResponse_Realtime_Response_MetricBox'
                    };
                    jarvis.dataaccess.fetch(this, '/engine/Realtime.svc/subscribe', queryOptions, function () {
                    });

                    //pCall['JarvisMessage'].Subscribe('', metric, '', 'Timeline', 1);
                });
            }

            jarvis.visualisation.realtime.subscribers.push({key:key, sender:_this, container: item});
            $(_this).bind('newdata', function (e, data) {

            });
            window.jarvisResponse_Realtime_Response_MetricBox = _this.jarvisResponse_Realtime_MetricBox;

            $(jarvis.visualisation.realtime).bind('backintime', function (event, data) {
                //jarvis.realtime.backintime(data.timestamp);
                var toDate = new Date(data);
                toDate.setSeconds(59);
                toDate.setMilliseconds(999);
                var fromDate = new Date(toDate);
                fromDate.setSeconds(fromDate.getSeconds() - 59);

                var queryOptions = {
                    FromDate:jarvis.date.formatDate(fromDate, 'yyyy-mm-dd hh:nn:ss.000'),
                    ToDate:jarvis.date.formatDate(toDate, 'yyyy-mm-dd hh:nn:ss.999'),
                    Dimensions:'',
                    Metrics:metric,
                    Filter:jarvis.visualisation.realtime.globalfilter,
                    Resolution:'Timeline',
                    Interval:3,
                    Period:30,
                    omitDate:true,
                    onlyUseCached:false
                };

                var processFetch = function (sender, data, error) {

                    if (data.resultcode == "500")
                        return;
                    data = $.parseJSON(data.data).Result;
                    //console.log(data);
                    var value = parseFloat(data.Rows[0].Values[0]);
                    var useAverage = _this.default_useAverage;
                    //console.log($(item.container).attr('data-useaverage'));
                    if ($(item).attr('data-useaverage'))
                    {
                        useAverage=eval($(item).attr('data-useaverage'));
                        //console.log('as' + useAverage);
                    }

                    if (useAverage) {
                        value = jarvis.string.formatNumber(value / 30, 0, false);
                    }
                    else {
                        value = jarvis.string.formatNumber(value, 0, true);
                    }

                    var $rightnow = $(item).find('.value');
                    $rightnow.animate({myBlurEffect_In:100}, {duration:100});
                    $rightnow.text(value);
                    $rightnow.animate({myBlurEffect_Out:100 }, {duration:200});

                };

                jarvis.dataaccess.fetch(_this, '/engine/Query.svc/fetch', queryOptions, processFetch);
            });
            $(jarvis.realtime).bind('backtotime', function (data) {

            });

            _this.containers.push(item);
        }

    });

    var executionTime = new Date().getMilliseconds() - start;
    jarvis.debug.log('INFO', 'jarvis.visualisation.realtime.MetricBox', 5, '...init (' + executionTime + 'ms)');
};

$.fx.step.myBlurEffect_In = function (fx) {
    $(fx.elem).css({
        textShadow:'0 0 ' + Math.floor(fx.now) + 'px rgb(111,255,111)'
    });
}

$.fx.step.myBlurEffect_Out = function (fx) {
    $(fx.elem).css({
        textShadow:'0 0 ' + Math.floor(fx.now) + 'px rgb(255,255,255)'
    });
}

jarvis.visualisation.realtime.MetricBox.prototype.jarvisResponse_Realtime_MetricBox = function (message) {
    //console.log(message);
    var _this = null;
    $(jarvis.visualisation.realtime.subscribers).each(function (index, item) {
        if (item.key == message[0].key) {
            //console.log(message[0].value);
            _this = item.sender;

            var value = parseFloat(message[0].value);
            var useAverage = _this.default_useAverage;
            //console.log($(item.container).attr('data-useaverage'));
            if ($(item.container).attr('data-useaverage'))
            {
                useAverage=eval($(item.container).attr('data-useaverage'));
                //console.log('as' + useAverage);
            }

            if (useAverage) {
                value = jarvis.string.formatNumber(value / 30, 0, false);
            }
            else {
                value = jarvis.string.formatNumber(value, 0, true);
            }

            var $rightnow = $(item.container).find('.value');
            $rightnow.animate({myBlurEffect_In:100}, {duration:100});
            $rightnow.text(value);
            $rightnow.animate({myBlurEffect_Out:100 }, {duration:200});

            $(_this).trigger('newdata', value);
        }
    });
};

/**
 * Inits the class and builds the base html for it.
 * @return (string) returns the base html to be applied in the container
 */


jarvis.visualisation.realtime.MetricBox.prototype.baseHTML = function (container) {
    var caption = this.default_caption;
    var subcaption = this.default_subcaption;

    if ($(container).attr('data-caption'))
    {
        caption = $(container).attr('data-caption');
    }
    if ($(container).attr('data-subcaption'))
    {
        subcaption = $(container).attr('data-subcaption');
    }

    var $html = $('<div class="wrapper"></div>');
    $html.append('<div class="row-fluid"><div class="span12 caption">' + caption + '</div></div>' +
        '<div class="row-fluid"><div class="span12 value">0</div></div>' +
        '<div class="row-fluid"><div class="span12 subcaption">' + subcaption + '</div></div>' +
        '');

    return $html;
};

jarvis.debug.log('INFO', 'jarvis.visualisation.realtime.MetricBox', 6, 'JS source loaded');

/**
 * init the Timeline and look for containers
 */
//if ($('.jarvis.realtime.panel').length == 0)
//    new jarvis.visualisation.realtime.MetricBox().init();
