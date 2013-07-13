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


jarvis.provide('jarvis.visualisation.realtime.Table');

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

jarvis.visualisation.realtime.Table = function (options) {
    var start = new Date().getMilliseconds();

    this._this = this;
    this.options = options;

    this.default_caption = 'Right now';
    this.default_subcaption = 'Events per Second';
    this.default_useAverage = true;

    this.key = '';

    this.animate = true;

    this.initialized = false;
    this.gettingBackData = false;
    this.initialCallbacks = [];
    this.initialTimestamp = null;

    this.containers = [];

    //turn on realtime comet
    jarvis.visualisation.realtime.start();


    jarvis.objects.Dimensions.List();
    jarvis.objects.Metrics.List();

    var executionTime = new Date().getMilliseconds() - start;
    //jarvis.debug.log('INFO', 'jarvis.visualisation.realtime.Table', 5, '...Constructor (' + executionTime + 'ms)');
};


/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
jarvis.visualisation.realtime.Table.prototype.init = function (options, container) {
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
        matchedContainers = $('.jarvis.realtime.table');
    if (matchedContainers.length == 0)
        return;

    $(matchedContainers).each(function (index, item) {
        if (!$(this).parent().hasClass('prettyprint')) {
            jarvis.debug.log('INFO', 'jarvis.visualisation.realtime.Table', 6, 'Applying to container (\'' + this.id + '\')');

            //verify we have a metric
            var limit = 5;
            try {
                limit = parseInt($(this).attr('data-limit'));
                if (isNaN(limit))
                    limit = 5;
            }
            catch (ex) {
                //console.log(ex);
                limit = 5;
            }

            var period = 60;
            try {
                period = parseInt($(this).attr('data-period'));
                if (isNaN(period))
                    period = 60;
            }
            catch (ex) {
                //console.log(ex);
                period = 60;
            }

            var animate = $(this).attr('data-animate');
            if (animate)
                _this.animate = eval(animate);
            //console.log('animate ' + _this.animate);

            var dimensions = $(this).attr('data-dimensions');
            if (dimensions == null) {
                throw ('You must specify a dimensions for the table');
            }
            var metric = $(this).attr('data-metrics');
            if (metric == null) {
                throw ('You must specify a metric for the table');
            }

            //apply html and bind methods/events
            $(this).html(_this.baseHTML(item));

            $(this).find('.settings').off('click');
            $(this).find('.settings').on('click', function (e) {
                jarvis.visualisation.realtime.panel.showEditWidget({_this:jarvis.visualisation.realtime.panel, container:jarvis.visualisation.realtime.panel.container, addNew:false, widgetID:$(item).attr('data-widgetid'), sender:_this, sendercontainer:item });
            });

            $(this).bind('data', function (evt, ret) {
                ret.data = $(this).data().data;
            });

            $(this).bind('click', function (evt) {
                $(this).trigger('clicked', $(this).data().data);
            });

            var key = dimensions + "_" + metric + "_" + jarvis.visualisation.realtime.globalfilter + "_" + 'Timeline' + "_" + 3 + "_" + period + "_" + "DESC" + "_" + metric + "_" + limit;
            key = key.replace(/ /g, "").replace(/,/g, "").replace(/\./g, "");
            //console.log(key);
            _this.key = key;
            if (jarvis.visualisation.realtime.connected) {
                jarvis.debug.log('INFO', 'Subscribing to comet channel (already connected) - ' + key, 6, '');
                //console.log('subscribing to comet channel (already connected) - '  + key);

                var client_id = PokeIn.GetClientId();
                var queryOptions = {
                    ClientID:client_id,
                    Dimensions:dimensions,
                    Metrics:metric,
                    Filter:jarvis.visualisation.realtime.globalfilter,
                    Resolution:'Timeline',
                    Interval:3,
                    Period:period,
                    omitDate:true,
                    callback:'jarvisResponse_Realtime_Response_Table',
                    Limit:limit,
                    SortDir:'DESC',
                    SortKey:metric
                };
                jarvis.dataaccess.fetch(this, '/engine/Realtime.svc/subscribe', queryOptions, function () {
                });

                //pCall['JarvisMessage'].Subscribe('', metric, '', 'Timeline', 1);
            }
            else {
                //console.log('subscribing to comet channel (bind) - '  + key);
                jarvis.debug.log('INFO', 'Subscribing to comet channel (bind) - ' + key, 6, '');

                $(jarvis.visualisation.realtime).bind('cometstart', function (e) {
                    //console.log('calling subscribe');
                    //jarvis.debug.log('INFO', 'Subscribing to comet channel (already connected) - '  + key, 6, '');

                    var client_id = PokeIn.GetClientId();
                    var queryOptions = {
                        ClientID:client_id,
                        Dimensions:dimensions,
                        Metrics:metric,
                        Filter:jarvis.visualisation.realtime.globalfilter,
                        Resolution:'Timeline',
                        Interval:3,
                        Period:period,
                        omitDate:true,
                        callback:'jarvisResponse_Realtime_Response_Table',
                        Limit:limit,
                        SortDir:'DESC',
                        SortKey:metric
                    };
                    jarvis.dataaccess.fetch(this, '/engine/Realtime.svc/subscribe', queryOptions, function () {
                    });

                    //pCall['JarvisMessage'].Subscribe('', metric, '', 'Timeline', 1);
                });
            }

            jarvis.visualisation.realtime.subscribers.push({key:key, sender:_this, container:$(item)});
            $(_this).bind('newdata', function (e, data) {

            });

            window.jarvisResponse_Realtime_Response_Table = _this.jarvisResponse_Realtime_Table;

            $(jarvis.realtime).bind('backintime', function (event, data) {
                _this.processFetch(_this, data, item, dimensions, metric, limit);
            });
            $(jarvis.realtime).bind('backtotime', function (data) {

            });

            _this.containers.push(item);
        }
    });


    var executionTime = new Date().getMilliseconds() - start;
    jarvis.debug.log('INFO', 'jarvis.visualisation.realtime.Table', 5, '...init (' + executionTime + 'ms)');
};

jarvis.visualisation.realtime.Table.prototype.processFetch = function (sender, data, item, dimensions, metric, limit) {
    //console.log('process fetch');
    //jarvis.realtime.backintime(data.timestamp);
    var _this = sender;
    var toDate = new Date(data);
    toDate.setSeconds(59);
    toDate.setMilliseconds(999);
    var fromDate = new Date(toDate);
    fromDate.setSeconds(fromDate.getSeconds() - 59);

    var processFetchProxy = function (sender, data, error) {
        if (data.resultcode == "500")
            return;
        data = $.parseJSON(data.data).Result;


        var $table = $(item).find('.table');

        //console.log($table);

        //let's check if the table is empty and we've got records
        if (data.Rows.length > 0)
            $table.find('tr.empty').remove();
        else if (data.Rows.length == 0 && $table.find('tr.empty').length > 0) {
            //console.log('nothing to show');
            $table.append('<tr class="empty"><td colspan="4">There is no data for this view.</td></tr>');
            return;
        }

        //console.log('tes');

        try {
            //let's remove rows that are outdated.
            if ($table.find('tr').length - 1 > data.Rows.length) {
                for (var i = $table.find('tr').length; i > data.Rows.length; i--) {
                    //console.log('removing table row ' + i);
                    $table.find('tr')[i].remove();
                }
            }
        }
        catch (ex) {
        }

        //now we go over the message line by line and see if we need to swap any records
        $(data.Rows).each(function (i, m) {
            if ($table.find('tr').length - 1 > i) {
                var $tr = $($table.find('tr')[i + 1]);
                var currentkey = $tr.find('.dimension').text();

                if (currentkey == m.FormattedValues[0]) {
                    //console.log('key match, updating value');
                    var currentvalue = $tr.find('.metric').text();
                    if (currentvalue != m.FormattedValues[1]) {
                        if (i % 2 == 0)
                            try {
                                if (_this.animate)
                                    $tr.children().animate({ backgroundColor:"#E6E8DC" }, {duration:1000}).animate({ backgroundColor:"white" }, 'slow');
                            }
                            catch (e) {
                            }
                        else
                            try {
                                if (_this.animate)
                                    $tr.children().animate({ backgroundColor:"#E6E8DC" }, {duration:1000}).animate({ backgroundColor:"#f5f5f5" }, 'slow');
                            }
                            catch (e) {
                            }

                        $tr.find('.metric').text(m.FormattedValues[1]);
                    }

                }
                else {
                    //console.log('replacing');
                    if (i % 2 == 0)
                        try {
                            if (_this.animate)
                                $tr.children().animate({ backgroundColor:"#E6E8DC" }, {duration:1000}).animate({ backgroundColor:"white" }, 'slow');
                        }
                        catch (e) {
                        }
                    else
                        try {
                            if (_this.animate)
                                $tr.children().animate({ backgroundColor:"#E6E8DC" }, {duration:1000}).animate({ backgroundColor:"#f5f5f5" }, 'slow');
                        }
                        catch (e) {
                        }
                    $tr.find('.dimension').text(m.FormattedValues[0]);
                    $tr.find('.metric').text(m.FormattedValues[1]);
                }
            }
            else {
                $table.append('<tr>' +
                    '<td class="index">' + (i + 1) + '.' + '</td>' +
                    '<td class="dimension">' + m.FormattedValues[0] + '</td>' +
                    '<td colspan="2" class="metric">' + m.FormattedValues[1] + '</td>' +
                    //'<td class="bar">' + '' + '</td>' +
                    '</tr>');
            }
        });

        $table.find('tr').each(function (index, name) {
            $(this).find('.index').text(index + '.');
        });
    };

    var queryOptions = {
        FromDate:jarvis.date.formatDate(fromDate, 'yyyy-mm-dd hh:nn:ss.000'),
        ToDate:jarvis.date.formatDate(toDate, 'yyyy-mm-dd hh:nn:ss.999'),
        Dimensions:dimensions,
        Metrics:'Bet Count',
        Resolution:'Timeline',
        omitDate:true,
        Filter:jarvis.visualisation.realtime.globalfilter,
        onlyUseCached:false,
        Limit:limit,
        SortDir:'DESC',
        SortKey:metric
    };

    jarvis.dataaccess.fetch(_this, '/engine/Query.svc/fetch', queryOptions, processFetchProxy);
};
/*
 jarvis.visualisation.realtime.Table.prototype.processFetch=function (sender, data, error)
 {
 data = $.parseJSON(data.data).Result;
 console.log(data);
 var _this = sender;

 var $table = $(item.container).find('.table');
 //let's check if the table is empty and we've got records
 if (message.length > 0)
 $table.find('tr.empty').remove();
 else if (message.length == 0 && $table.find('tr.empty').length > 0) {
 //console.log('nothing to show');
 $table.append('<tr class="empty"><td colspan="4">There is no data for this view.</td></tr>');
 return;
 }
 try {
 //let's remove rows that are outdated.
 if ($table.find('tr').length - 1 > message.length) {
 for (var i = $table.find('tr').length; i > message.length; i--) {
 //console.log('removing table row ' + i);
 $table.find('tr')[i].remove();
 }
 }
 }
 catch (ex) {
 }

 //now we go over the message line by line and see if we need to swap any records
 $(message).each(function (i, m) {
 if ($table.find('tr').length - 1 > i) {
 var $tr = $($table.find('tr')[i + 1]);
 var currentkey = $tr.find('.dimension').text();

 if (currentkey == m.dimension) {
 // console.log('key match, updating value');
 var currentvalue = $tr.find('.metric').text();
 if (currentvalue != m.formattedValue) {
 if (i % 2 == 0)
 $tr.children().animate({ backgroundColor:"#E6E8DC" }, {duration:1000}).animate({ backgroundColor:"white" }, 'slow');
 else
 $tr.children().animate({ backgroundColor:"#E6E8DC" }, {duration:1000}).animate({ backgroundColor:"#f5f5f5" }, 'slow');

 $tr.find('.metric').text(m.formattedValue);
 }

 }
 else {
 if (i % 2 == 0)
 $tr.children().animate({ backgroundColor:"#E6E8DC" }, {duration:1000}).animate({ backgroundColor:"white" }, 'slow');
 else
 $tr.children().animate({ backgroundColor:"#E6E8DC" }, {duration:1000}).animate({ backgroundColor:"#f5f5f5" }, 'slow');
 $tr.find('.dimension').text(m.dimension);
 $tr.find('.metric').text(m.formattedValue);
 }
 }
 else {
 $table.append('<tr>' +
 '<td class="index">' + (i + 1) + '.' + '</td>' +
 '<td class="dimension">' + m.dimension + '</td>' +
 '<td colspan="2" class="metric">' + m.formattedValue + '</td>' +
 //'<td class="bar">' + '' + '</td>' +
 '</tr>');
 }
 });

 $table.find('tr').each(function (index, name) {
 $(this).find('.index').text(index + '.');
 });

 };*/

jarvis.visualisation.realtime.Table.prototype.jarvisResponse_Realtime_Table = function (message) {
    var _this = null;
    try {
        //console.log('1');
        $(jarvis.visualisation.realtime.subscribers).each(function (index, item) {
            //console.log('2');
            if (item.key == message[0].key) {
                //console.log('3');
                _this = item.sender;

                //console.log('test');
                //console.log(item.container);
                //console.log(_this.containers[0]);

                var $table = $($(item.container).find('.table'));
                //let's check if the table is empty and we've got records
                if (message.length > 0)
                    $table.find('tr.empty').remove();
                else if (message.length == 0 && $table.find('tr.empty').length > 0) {
                    //console.log('nothing to show');
                    $table.append('<tr class="empty"><td colspan="4">There is no data for this view.</td></tr>');
                    return;
                }

                try {
                    //let's remove rows that are outdated.
                    if ($table.find('tr').length > message.length) {
                        for (var i = $table.find('tr').length; i < message.length; i--) {
                            //console.log('removing table row ' + i);
                            $table.find('tr')[i].remove();
                        }
                    }
                }
                catch (ex) {
                }

                //console.log('4');
                //now we go over the message line by line and see if we need to swap any records
                $(message).each(function (i, m) {
                    //console.log('5');
                    if ($table.find('tr').length - 1 > i) {
                        //console.log('6');
                        //console.log('test');
                        var $tr = $($table.find('tr')[i + 1]);

                        var currentkey = $tr.find('.dimension').text();

                        if (currentkey == m.dimension) {
                            //console.log('6.1');
                            // console.log('key match, updating value');
                            var currentvalue = $tr.find('.metric').text();
                            if (currentvalue != m.formattedValue) {
                                try {
//                                    console.log(_this.animate);
                                    if (_this.animate) {
                                        if (i % 2 == 0)
                                            $tr.children().animate({ backgroundColor:"#E6E8DC" }, {duration:1000}).animate({ backgroundColor:"white" }, 'slow');
                                        else
                                            $tr.children().animate({ backgroundColor:"#E6E8DC" }, {duration:1000}).animate({ backgroundColor:"#f5f5f5" }, 'slow');
                                    }
                                } catch (e) {
                                }
                                $tr.find('.metric').text(m.formattedValue);
                            }
                            //console.log('6.1.1');

                        }
                        else {
                            //console.log('6.2');
                            try {
                                //console.log(_this.animate);
                                if (_this.animate) {
                                    if (i % 2 == 0)
                                        $tr.children().animate({ backgroundColor:"#E6E8DC" }, {duration:1000}).animate({ backgroundColor:"white" }, 'slow');
                                    else
                                        $tr.children().animate({ backgroundColor:"#E6E8DC" }, {duration:1000}).animate({ backgroundColor:"#f5f5f5" }, 'slow');
                                }
                            } catch (e) {
                            }
                            $tr.find('.dimension').text(m.dimension);
                            $tr.find('.metric').text(m.formattedValue);
                            //console.log('6.2.2');
                        }
                    }
                    else {
                        //console.log('7');
                        //console.log('test2');
                        $table.append('<tr>' +
                            '<td class="index">' + (i + 1) + '.' + '</td>' +
                            '<td class="dimension">' + m.dimension + '</td>' +
                            '<td colspan="2" class="metric">' + m.formattedValue + '</td>' +
                            //'<td class="bar">' + '' + '</td>' +
                            '</tr>');
                    }
                });

                //console.log($table);
                //console.log('8');
                $table.find('.dimension').each(function (index, item) {
                    $(this).off('click');
                    $(this).on('click', function (e) {
                        var $parent = $($(this).closest('.jarvis.realtime.table'));
                        var key = $parent.attr('data-dimensions');
                        var value = $(this).text();

                        var filter = key + '=' + value + '[AND]';
                        //console.log(filter);
                        if (jarvis.visualisation.realtime.globalfilter.indexOf(filter) == -1 && jarvis.visualisation.realtime.drillDownFilter.indexOf(filter) == -1) {
                            //jarvis.realtime.globalfilter += filter;
                            jarvis.visualisation.realtime.drillDownFilter += filter;
                            jarvis.visualisation.realtime.processFilter();
                        }
                    })
                });
                //console.log('9');
                $table.find('tr').each(function (index, name) {
                    $(this).find('.index').text(index + '.');
                });

                //$(_this).trigger('newdata', value);
                //console.log('10');
            }
        });
    }
    catch (ex) {
        console.log(ex.message);
        console.log(ex.stack);
        throw ex;
    }
};

$.fx.step.myBackgroundEffect_In = function (fx) {
    $(fx.elem).css({
        backgroundColor:'rgb(215,222,186)'
    });
}

$.fx.step.myBackgroundEffect_Out = function (fx) {
    $(fx.elem).css({
        backgroundColor:'inherit'
    });
}


/**
 * Inits the class and builds the base html for it.
 * @return (string) returns the base html to be applied in the container
 */


jarvis.visualisation.realtime.Table.prototype.baseHTML = function (container) {
    var title = 'TITLE';
    var dimensions = 'DIMENSION';
    var metrics = this.default_subcaption;

    if ($(container).attr('data-title')) {
        title = $(container).attr('data-title');
    }
    if ($(container).attr('data-dimensions')) {
        dimensions = $(container).attr('data-dimensions');
    }
    if ($(container).attr('data-metrics')) {
        metrics = $(container).attr('data-metrics');
    }

    var $html = $('<div class="wrapper"></div>');
    $html.append('<div class="row-fluid">' +
        '<div class="header">' +
        '<div class="settings"></div>' +
        '<div class="move"></div>' +
        '<h3>' + title + '</h3>' +
        '</div>' +
        '<table class="table table-bordered table-striped">' +
        '<thead>' +
        '<tr>' +
        '<th colspan=2>' + dimensions + '</th>' +
        '<th class="metric" colspan=2>' + metrics + '</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '<tr class="empty">' +
        '<td colspan="4">There is no data for this view.</td>' +
        '</tr>' +
        '</tbody>' +
        '</table></div>');
    $();

    return $html;
};

jarvis.debug.log('INFO', 'jarvis.visualisation.realtime.Table', 6, 'JS source loaded');

/**
 * init the Timeline and look for containers
 */

/*
if ($('.jarvis.realtime.panel').length == 0)
    new jarvis.visualisation.realtime.Table().init();
*/