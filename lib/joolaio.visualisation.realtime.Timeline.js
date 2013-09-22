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


joolaio.provide('joolaio.visualisation.realtime.Timeline');

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

joolaio.visualisation.realtime.Timeline = function (options) {
    var start = new Date().getMilliseconds();

    this._this = this;
    this.options = options;

    this.key = '';

    this.initialized = false;
    this.gettingBackData = false;
    this.initialCallbacks = [];
    this.initialTimestamp = null;

    this.resizingMinutes = false;
    this.resizingSeconds = false;

    this.chartInitMinutes = false;
    this.chartInitSeconds = false;

    this.showseconds=true;
    this.seriescolor = '#1a87d5';

    //turn on realtime comet
    joolaio.visualisation.realtime.start();

    joolaio.objects.Dimensions.List();
    joolaio.objects.Metrics.List();

    var executionTime = new Date().getMilliseconds() - start;
    //joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.Timeline', 5, '...Constructor (' + executionTime + 'ms)');
};


/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
joolaio.visualisation.realtime.Timeline.prototype.init = function (options, container) {
    var _this = this;
    var start = new Date().getMilliseconds();

    this._this = this;
    this.options = options;

    this.containers = this.containers || [];

    //lookup any containers relevant for the timeline
    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.joolaio.realtime.timeline');
    if (matchedContainers.length == 0)
        return;

    $(matchedContainers).each(function (index, item) {
        if (!$(this).parent().hasClass('prettyprint')) {
            joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.Timeline', 6, 'Applying to container (\'' + this.id + '\')');

            //verify we have a metric
            var metric = $(this).attr('data-metrics');
            if (metric == null) {
                throw ('You must specify a metric for the timeline');
            }

            var seriescolor = $(this).attr('data-seriescolor');
            if (seriescolor) {
                _this.seriescolor = seriescolor;
            }

            var showseconds = $(this).attr('data-showseconds');
            if (showseconds) {
                _this.showseconds = eval(showseconds);
            }
            //console.log(_this.seriescolor );

            //apply html and bind methods/events
            $(this).html(_this.baseHTML());
            _this.minutesChart.redraw();
            _this.secondsChart.redraw();

            _this.chartInitMinutes = true;
            _this.chartInitSeconds = true;

            $(this).bind('data', function (evt, ret) {
                ret.data = $(this).data().data;
            });

            $(this).bind('click', function (evt) {
                $(this).trigger('clicked', $(this).data().data);

            });

            var key = '' + "_" + metric + "_" + joolaio.visualisation.realtime.globalfilter + "_" + 'Timeline' + "_" + 1 + "_" + 1 + "___0";
            key = key.replace(/ /g, "").replace(/,/g, "").replace(/\./g, "");
            _this.key = key;
            if (joolaio.visualisation.realtime.connected) {
                joolaio.debug.log('INFO', 'Subscribing to comet channel (already connected) - ' + key, 6, '');

                var client_id = PokeIn.GetClientId();
                var queryOptions = {
                    ClientID:client_id,
                    Dimensions:'',
                    Metrics:metric,
                    Filter:joolaio.visualisation.realtime.globalfilter,
                    Resolution:'Timeline',
                    Interval:1,
                    Period:1,
                    omitDate:false,
                    callback:'joolaioResponse_Realtime_Response'
                };
                joolaio.dataaccess.fetch(this, '/engine/Realtime.svc/subscribe', queryOptions, function () {
                });


            }
            else {
                joolaio.debug.log('INFO', 'Subscribing to comet channel (bind) - ' + key, 6, '');

                $(joolaio.realtime).bind('cometstart', function (e) {
                    //joolaio.debug.log('INFO', 'Subscribing to comet channel (already connected) - '  + key, 6, '');

                    var client_id = PokeIn.GetClientId();
                    var queryOptions = {
                        ClientID:client_id,
                        Dimensions:'',
                        Metrics:metric,
                        Filter:joolaio.visualisation.realtime.globalfilter,
                        Resolution:'Timeline',
                        Interval:1,
                        Period:1,
                        omitDate:false,
                        callback:'joolaioResponse_Realtime_Response'
                    };
                    joolaio.dataaccess.fetch(this, '/engine/Realtime.svc/subscribe', queryOptions, function () {
                    });


                });
            }

            joolaio.visualisation.realtime.subscribers.push({key:key, sender:_this});

            window.joolaioResponse_Realtime_Response = _this.joolaioResponse_Realtime_Timeline;
        }
    });

    //_this.setContent(_this.formatter(joolaio.date.getServerTimestamp()));

    if (joolaio.visualisation.realtime.paused) {
        //_this.gettingBackData = false;

        _this.joolaioResponse_Realtime_Timeline(null, _this, new Date(joolaio.visualisation.realtime.serverTimestamp));
        //_this.processFetch (_this, {timestamp:joolaio.realtime.pausedTime});

    }

    $(this).bind('click', function (event, data) {
        if (data.selected) {
            joolaio.visualisation.realtime.event_backintime(data.timestamp);

            joolaio.visualisation.realtime.paused = true;
            joolaio.visualisation.realtime.pausedTime = data.timestamp;
            joolaio.visualisation.realtime.stop();

            $(joolaio.visualisation.realtime.statusboxes).each(function (index, item) {
                $(item).bind('dismissed', function (event, data) {
                    _this.initialized = false;
                    _this.gettingBackData = false;
                    _this.initialCallbacks = [];
                    _this.initialTimestamp = null;

                    joolaio.visualisation.realtime.paused = false;
                    joolaio.visualisation.realtime.pausedTime = null;
                    joolaio.visualisation.realtime.restart();
                });
            });

            _this.processFetch(_this, data);
        }
        else {
            joolaio.visualisation.realtime.event_backtotime();

            _this.initialized = false;
            _this.gettingBackData = false;
            _this.initialCallbacks = [];
            _this.initialTimestamp = null;

            joolaio.visualisation.realtime.paused = false;
            joolaio.visualisation.realtime.pausedTime = null;
            joolaio.visualisation.realtime.restart();

            /*
             $(initialCallbacks).each(function (index, item) {
             item();
             });
             initialCallbacks = [];
             */
            //joolaio.realtime.restart();
        }
    });

    var executionTime = new Date().getMilliseconds() - start;
    joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.Timeline', 5, '...init (' + executionTime + 'ms)');
};

joolaio.visualisation.realtime.Timeline.prototype.processFetch = function (sender, data) {
    var toDate = new Date(data.timestamp);
    toDate.setSeconds(59);
    toDate.setMilliseconds(999);
    var fromDate = new Date(toDate);
    fromDate.setSeconds(fromDate.getSeconds() - 59);

    var queryOptions = {
        FromDate:joolaio.date.formatDate(fromDate, 'yyyy-mm-dd hh:nn:ss.000'),
        ToDate:joolaio.date.formatDate(toDate, 'yyyy-mm-dd hh:nn:ss.999'),
        Dimensions:'',
        Metrics:'Bet Count',
        Resolution:'Timeline',
        omitDate:false,
        Filter:joolaio.visualisation.realtime.globalfilter,
        onlyUseCached:false
    };

    joolaio.dataaccess.fetch(sender, '/engine/Query.svc/fetch', queryOptions, sender.initialDrawCallback_Seconds);
}

joolaio.visualisation.realtime.Timeline.prototype.joolaioResponse_Realtime_Timeline = function (message, sender, timestamp) {
    var _this = null;
    if (message) {
        $(joolaio.visualisation.realtime.subscribers).each(function (index, item) {
            if (item.key == message[0].key) {
                _this = item.sender;
            }
        });
        var pointToRemove = new Object();
        var series = _this.secondsChart.series[0];
    }
    else
        _this = sender;

    var initialDrawRealtime = function () {
        $(message).each(function (index, row) {
            var x = new Date(row.timestamp);
            var y = parseFloat(row.value);

            var point = {
                y:y,
                name:x
            };

            //get the date of the point to be removed from seconds
            pointToRemove.x = point.x;
            pointToRemove.y = point.y;
            pointToRemove.date = new Date(point.name);
            //
            series.addPoint(point, true, true, true);
        });

        if (pointToRemove.date) {
            series = _this.minutesChart.series[0];
            var d = pointToRemove.date;
            if (d.getSeconds() == 0) {
                //we need to add
                var point = {
                    y:pointToRemove.y,
                    name:d
                };
                series.addPoint(point, true, true, true);
            }
            else {
                //we need to update

                if (series.data[series.data.length - 1].name = 'test')
                    d.setSeconds(0);
                series.data[series.data.length - 1].name = d;
                series.data[series.data.length - 1].update(series.data[series.data.length - 1].y + pointToRemove.y, true, false)
            }
        }
    };

    if (!_this.initialized || joolaio.visualisation.realtime.paused) {
        //this is the first run, we need to fetch previous data and pass the callback function to draw the new values
        _this.initialCallbacks.push(initialDrawRealtime);
        if (!_this.gettingBackData) { //!joolaio.realtime.paused

            _this.gettingBackData = true;
            if (message)
                _this.initialTimestamp = new Date(message[0].timestamp);
            else
                _this.initialTimestamp = timestamp;

            var toDate = new Date(_this.initialTimestamp);

            //toDate.setHours(toDate.getHours() + 3);

            toDate.setSeconds(toDate.getSeconds() - 1);
            toDate.setMilliseconds(999);
            toDate.setMinutes(toDate.getMinutes() - 1);
            toDate.setSeconds(toDate.getSeconds() - 1);

            var fromDate = new Date(toDate);
            fromDate.setMinutes(fromDate.getMinutes() - 30);

            var queryOptions = {
                FromDate:joolaio.date.formatDate(fromDate, 'yyyy-mm-dd hh:nn:00.000'),
                ToDate:joolaio.date.formatDate(toDate, 'yyyy-mm-dd hh:nn:ss.999'),
                Dimensions:'',
                Metrics:'Bet Count',
                Resolution:'Minute',
                omitDate:false,
                Filter:joolaio.visualisation.realtime.globalfilter,
                onlyUseCached:true
            };

            joolaio.dataaccess.fetch(_this, '/engine/Query.svc/fetch', queryOptions, _this.initialDrawCallback_Minutes);

            var minutesData = (function () {
                var data = [], i;

                for (i = -29; i <= 0; i++) {
                    data.push({y:0, name:'test'});
                }
                return data;
            })();
            _this.minutesChart.series[0].setData(minutesData, true);
            var secondsData = (function () {
                var data = [], i;

                for (i = -59; i <= 0; i++) {
                    data.push({y:0});
                }
                return data;
            })();
            _this.secondsChart.series[0].setData(secondsData, true);
        }
    }
    else {
        //we're passed init, let's just add the points
        initialDrawRealtime();
    }

};

joolaio.visualisation.realtime.Timeline.prototype.initialDrawCallback_Minutes = function (sender, data, error) {
    //if we don't have the cache, move on
    if (data.resultcode != 500) {
        data = $.parseJSON(data.data);
        var result = data.Result;

        $(result.Rows).each(function (index, row) {
            //var pointToRemove = new Object();
            var series = sender.minutesChart.series[0];
            var x = new Date(row.Values[0]);//timestamp;
            var y = parseFloat(row.Values[1]);//.value);


            var point = {
                y:y,
                name:x
            };

            //get the date of the point to be removed from seconds

            series.addPoint(point, true, true, true);
        });
        sender.minutesChart.redraw();
    }


    var toDate = new Date(sender.initialTimestamp);

    //toDate.setHours(toDate.getHours() + 3);

    toDate.setSeconds(toDate.getSeconds() - 1);
    toDate.setMilliseconds(999);
    //toDate.setMinutes(toDate.getMinutes() - 1);

    var fromDate = new Date(toDate);
    fromDate.setSeconds(fromDate.getSeconds() - 59);

    var queryOptions = {
        FromDate:joolaio.date.formatDate(fromDate, 'yyyy-mm-dd hh:nn:ss.000'),
        ToDate:joolaio.date.formatDate(toDate, 'yyyy-mm-dd hh:nn:ss.999'),
        Dimensions:'',
        Metrics:'Bet Count',
        Resolution:'Timeline',
        omitDate:false,
        Filter:joolaio.visualisation.realtime.globalfilter,
        onlyUseCached:true
    };

    joolaio.dataaccess.fetch(sender, '/engine/Query.svc/fetch', queryOptions, sender.initialDrawCallback_Seconds);

}

joolaio.visualisation.realtime.Timeline.prototype.initialDrawCallback_Seconds = function (sender, data, error) {
    data = $.parseJSON(data.data);
    var result = data.Result;

    $(result.Rows).each(function (index, row) {
        var pointToRemove = new Object();
        var series = sender.secondsChart.series[0];
        var x = new Date(row.Values[0]);//timestamp;
        var y = parseFloat(row.Values[1]);//.value);

        var point = {
            y:y,
            name:x
        };


        //get the date of the point to be removed from seconds
        pointToRemove.x = point.x;
        pointToRemove.y = point.y;
        pointToRemove.date = new Date(point.name);
        //

        series.addPoint(point, false, true, true);


        if (!joolaio.visualisation.realtime.paused && pointToRemove.date) {
            series = sender.minutesChart.series[0];
            var d = pointToRemove.date;
            if (d.getSeconds() == 59) {
                var _d = new Date(d);
                //_d.setMinutes(_d.getMinutes()-1);
                //we need to add
                var point = {
                    y:pointToRemove.y,
                    name:d
                };
                _d.setSeconds(0);
                series.data[series.data.length - 1].name = _d;
                series.addPoint(point, true, true, true);
            }
            else {

                //we need to update
                if (series.data[series.data.length - 1].name = 'test')
                    d.setSeconds(0);
                series.data[series.data.length - 1].name = d;
                series.data[series.data.length - 1].update(series.data[series.data.length - 1].y + pointToRemove.y, true, false)
            }
        }
    });
    sender.secondsChart.redraw();
    if (!joolaio.visualisation.realtime.paused)
        sender.minutesChart.redraw();

    //return;

    sender.initialized = true;

    if (!joolaio.visualisation.realtime.paused) {
        $(sender.initialCallbacks).each(function (index, item) {
            item();
        });
        sender.initialCallbacks = [];
    }

}

/**
 * Inits the class and builds the base html for it.
 * @return (string) returns the base html to be applied in the container
 */


joolaio.visualisation.realtime.Timeline.prototype.baseHTML = function () {
    var _this = this;

    var $html = $('<div class="wrapper"></div>');
    $html.append('<div class="row-fluid"><div class="span12"><div class="row-fluid chartcontainer"></div></div></div>');

    if (_this.showseconds){
    $html.find('.chartcontainer').append($('<div class="span7 minutesChart">&nbsp;</div>'));
    $html.find('.chartcontainer').append('<div class="span5 secondsChart">&nbsp;</div>');
    }
    else
    {
        $html.find('.chartcontainer').append($('<div class="span12 minutesChart">&nbsp;</div>'));
        $html.find('.chartcontainer').append('<div class="span0 secondsChart" style="display:none;">&nbsp;</div>');
    }

    var $minutesChart = $html.find('.minutesChart');
    var $secondsChart = $html.find('.secondsChart');

    _this.minutesChart = new Highcharts.Chart({
        chart:{
            backgroundColor:$($minutesChart).css('backgroundColor'),
            height:235,
            marginTop:40,
            marginLeft:0,
            marginRight:0,
            marginBottom:0,
            spacingLeft:0,
            spacingTop:15,
            spacingRight:0,
            spacingBottom:0,
            renderTo:$($minutesChart).get(0),
            animation:{
                duration:300,
                transition:'easeOutBounce'
            },
            type:'column',
            events:{
                load:function () {

                },
                redraw:function () {
                    if (!_this.resizingMinutes && !_this.chartInitMinutes) {
                        _this.resizingMinutes = true;

                        var targetWidth = $('.minutesChart').width();
                        this.setSize(targetWidth, 235);

                    }
                    else
                        _this.resizingMinutes = false;
                }
            }
        },
        title:{
            text:'Per minute',
            align:'left',
            style:{ color:'#666', fontSize:'13px'},
            y:0,
            x:3
        },
        xAxis:{
            labels:{
                enabled:false,
                style:{ fontSize:'10px;', color:'#2d96ca'}

            },
            tickLength:0
        },
        yAxis:{
            showFirstLabel:false,
            showLastLabel:true,
            endOnTick:true,
            title:{
                text:null
            },
            labels:{
                style:{
                    fontFamily:'Arial',
                    fontSize:'10px',
                    color:'#979797',
                    textShadow:'-1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff'
                },
                align:'left',
                x:5,
                y:15
            },
            plotLines:[
                {
                    value:0,
                    width:1,
                    color:'#808080'
                }
            ]
        },
        tooltip:{
            useHTML:true,
            formatter:function () {
                var point = this;
                var _date = new Date(point.point.name);
                _date.setHours(_date.getHours() + 3);
                var ago = jQuery.timeago(_date);
                _date = joolaio.date.formatDate(_date, 'hh:nn');

                var s = '<div><b>' + ago + '</b></div><div>' + _date + '</div><div style="margin-top:5px;">Events: ' + point.y + '</div>';

                return s;
            }
        },
        legend:{
            enabled:false
        },
        credits:{
            enabled:false
        },
        exporting:{
            enabled:false
        },
        series:[
            {
                name:'Minute-by-minute data',
                data:(function () {
                    var data = [], i;

                    for (i = -29; i <= 0; i++) {
                        data.push({y:0, name:'test'});
                    }
                    return data;
                })(),
                cursor:'pointer',
                point:{
                    events:{
                        click:function (event) {
                            $(_this).trigger('click', {timestamp:this.name, value:this.y, selected:(!this.selected ? true : false) /* don't ask me why */});
                        }
                    }
                }
            }
        ],
        plotOptions:{
            column:{allowPointSelect:true},
            series:{
                color:_this.seriescolor,
                pointPadding:0.1,
                groupPadding:0,
                borderWidth:0,
                shadow:false
            }
        }
    });
    $($minutesChart).append('<div class="row"><div class="span2 charttick "></div><div class="span2 charttick ">-25 min</div><div class="span2 charttick ">-20 min</div><div class="span2 charttick ">-15 min</div><div class="span2 charttick ">-10 min</div><div class="span2 charttick ">-5 min</div></div>');

    _this.secondsChart = new Highcharts.Chart({
        chart:{
            backgroundColor:$($secondsChart).css('backgroundColor'),
            height:235,
            marginTop:40,
            marginBottom:0,
            spacingTop:15,
            spacingLeft:0,
            spacingRight:0,
            spacingBottom:0,
            selectionMarkerFill:'#932D22',
            //renderTo:'timeline' + _this.widgetID,
            renderTo:$($secondsChart).get(0),
            animation:{
                duration:300,
                transition:'easeOutBounce'
            },
            type:'column',
            events:{
                load:function () {

                },
                redraw:function () {
                    if (!_this.resizingSeconds && !_this.chartInitSeconds) {
                        _this.resizingSeconds = true;

                        var targetWidth = $('.secondsChart').width();
                        this.setSize(targetWidth, 235);
                    }
                    else
                        _this.resizingSeconds = false;
                }
            }
        },
        title:{
            text:'Per second',
            align:'left',
            style:{ color:'#666', fontSize:'13px'},
            y:0,
            x:3
        },
        xAxis:{
            labels:{
                enabled:false,
                style:{ fontSize:'10px;', color:'#2d96ca'}

            },
            tickLength:0
        },
        yAxis:{
            showFirstLabel:false,
            showLastLabel:true,
            endOnTick:true,
            title:{
                text:null
            },
            labels:{
                style:{
                    fontFamily:'Arial',
                    fontSize:'10px',
                    color:'#979797',
                    textShadow:'-1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff'
                },
                align:'left',
                x:5,
                y:15
            },
            plotLines:[
                {
                    value:0,
                    width:1,
                    color:'#808080'
                }
            ]
        },
        tooltip:{
            useHTML:true,
            formatter:function () {
                var point = this;

                var _date = new Date(point.point.name);
                //_date.setHours(_date.getHours()+3);


                _date.setHours(_date.getHours() + 3);
                var ago = Math.floor((new Date() - _date) / 1000) + ' seconds ago';

                //var ago = jQuery.timeago(_date);
                _date = joolaio.date.formatDate(_date, 'hh:nn:ss');

                var s = '<div><b>' + ago + '</b></div><div>' + _date + '</div><div style="margin-top:5px;">Events: ' + point.y + '</div>';

                return s;
            }
        },
        legend:{
            enabled:false
        },
        credits:{
            enabled:false
        },
        exporting:{
            enabled:false
        },
        series:[
            {
                name:'Second-by-second Base data',
                data:(function () {
                    var data = [], i;

                    for (i = -59; i <= 0; i++) {
                        data.push({y:0});
                    }
                    return data;
                })()
            }
        ],
        plotOptions:{
            series:{
                color:_this.seriescolor,
                pointPadding:0.2,
                groupPadding:0,
                borderWidth:0,
                shadow:false
            }
        }
    });
    $($secondsChart).append('<div class="row"><div class="span3 charttick ">-60 sec</div><div class="span3 charttick ">-45 sec</div><div class="span3 charttick ">-30 sec</div><div class="span3 charttick ">-15 sec</div></div>');

    return $html;
};

joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.Timeline', 6, 'JS source loaded');

/**
 * init the Timeline and look for containers
 */
/*
if ($('.joolaio.realtime.panel').length == 0)
    new joolaio.visualisation.realtime.Timeline().init();
*/