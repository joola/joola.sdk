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


joolaio.provide('joolaio.visualisation.realtime.MetricBox');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

//joolaio.require('joolaio.realtime');
joolaio.require('joolaio.visualisation.realtime');

/**
 * Create and install a realtime timeline handler.
 * @constructor
 * @param {string=} options optional options to be passed to class
 */

joolaio.visualisation.realtime.MetricBox = function (options) {
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

    joolaio.objects.Dimensions.List();
    joolaio.objects.Metrics.List();

    var executionTime = new Date().getMilliseconds() - start;
    //joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.MetricBox', 5, '...Constructor (' + executionTime + 'ms)');
};


/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
joolaio.visualisation.realtime.MetricBox.prototype.init = function (options, container) {
    var _this = this;
    var start = new Date().getMilliseconds();

    this._this = this;
    this.options = options;

    this.containers = this.containers || [];

    //turn on realtime comet
    joolaio.visualisation.realtime.start();

    $(joolaio.realtime).bind('filterchange', function(e){

    });

    //lookup any containers relevant for the timeline
    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.joolaio.realtime.metricbox');
    if (matchedContainers.length == 0)
        return;

    $(matchedContainers).each(function (index, item) {
        if (!$(this).parent().hasClass('prettyprint')) {
            joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.MetricBox', 6, 'Applying to container (\'' + this.id + '\')');

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

            var key = '' + "_" + metric + "_" + joolaio.visualisation.realtime.globalfilter + "_" + 'Timeline' + "_" + 3 + "_" + 60+ "___0";
            key = key.replace(/ /g, "").replace(/,/g, "").replace(/\./g, "");
            _this.key = key;
            if (joolaio.visualisation.realtime.connected) {
                joolaio.debug.log('INFO', 'Subscribing to comet channel (already connected) - ' + key, 6, '');
                //console.log('subscribing to comet channel (already connected) - '  + key);

                var client_id = PokeIn.GetClientId();
                var queryOptions = {
                    ClientID:client_id,
                    Dimensions:'',
                    Metrics:metric,
                    Filter:joolaio.visualisation.realtime.globalfilter,
                    Resolution:'Timeline',
                    Interval:3,
                    Period:60,
                    omitDate:true,
                    onlyUseCached:true,
                    callback:'joolaioResponse_Realtime_Response_MetricBox'
                };
                joolaio.dataaccess.fetch(this, '/engine/Realtime.svc/subscribe', queryOptions, function () {
                });


            }
            else {
                //console.log('subscribing to comet channel (bind) - '  + key);
                joolaio.debug.log('INFO', 'Subscribing to comet channel (bind) - ' + key, 6, '');

                $(joolaio.realtime).bind('cometstart', function (e) {
                    //console.log('calling subscribe');
                    //joolaio.debug.log('INFO', 'Subscribing to comet channel (already connected) - '  + key, 6, '');

                    var client_id = PokeIn.GetClientId();
                    var queryOptions = {
                        ClientID:client_id,
                        Dimensions:'',
                        Metrics:metric,
                        Filter:joolaio.visualisation.realtime.globalfilter,
                        Resolution:'Timeline',
                        Interval:3,
                        Period:60,
                        omitDate:true,
                        onlyUseCached:true,
                        callback:'joolaioResponse_Realtime_Response_MetricBox'
                    };
                    joolaio.dataaccess.fetch(this, '/engine/Realtime.svc/subscribe', queryOptions, function () {
                    });

                });
            }

            joolaio.visualisation.realtime.subscribers.push({key:key, sender:_this, container: item});
            $(_this).bind('newdata', function (e, data) {

            });
            window.joolaioResponse_Realtime_Response_MetricBox = _this.joolaioResponse_Realtime_MetricBox;

            $(joolaio.visualisation.realtime).bind('backintime', function (event, data) {
                //joolaio.realtime.backintime(data.timestamp);
                var toDate = new Date(data);
                toDate.setSeconds(59);
                toDate.setMilliseconds(999);
                var fromDate = new Date(toDate);
                fromDate.setSeconds(fromDate.getSeconds() - 59);

                var queryOptions = {
                    FromDate:joolaio.date.formatDate(fromDate, 'yyyy-mm-dd hh:nn:ss.000'),
                    ToDate:joolaio.date.formatDate(toDate, 'yyyy-mm-dd hh:nn:ss.999'),
                    Dimensions:'',
                    Metrics:metric,
                    Filter:joolaio.visualisation.realtime.globalfilter,
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
                        value = joolaio.string.formatNumber(value / 30, 0, false);
                    }
                    else {
                        value = joolaio.string.formatNumber(value, 0, true);
                    }

                    var $rightnow = $(item).find('.value');
                    $rightnow.animate({myBlurEffect_In:100}, {duration:100});
                    $rightnow.text(value);
                    $rightnow.animate({myBlurEffect_Out:100 }, {duration:200});

                };

                joolaio.dataaccess.fetch(_this, '/engine/Query.svc/fetch', queryOptions, processFetch);
            });
            $(joolaio.realtime).bind('backtotime', function (data) {

            });

            _this.containers.push(item);
        }

    });

    var executionTime = new Date().getMilliseconds() - start;
    joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.MetricBox', 5, '...init (' + executionTime + 'ms)');
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

joolaio.visualisation.realtime.MetricBox.prototype.joolaioResponse_Realtime_MetricBox = function (message) {
    //console.log(message);
    var _this = null;
    $(joolaio.visualisation.realtime.subscribers).each(function (index, item) {
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
                value = joolaio.string.formatNumber(value / 30, 0, false);
            }
            else {
                value = joolaio.string.formatNumber(value, 0, true);
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


joolaio.visualisation.realtime.MetricBox.prototype.baseHTML = function (container) {
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

joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.MetricBox', 6, 'JS source loaded');

/**
 * init the Timeline and look for containers
 */
//if ($('.joolaio.realtime.panel').length == 0)
//    new joolaio.visualisation.realtime.MetricBox().init();
