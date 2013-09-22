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

joolaio.provide('joolaio.visualisation.realtime.Table');

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

joolaio.visualisation.realtime.Table = function (options) {
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
    joolaio.visualisation.realtime.start();


    joolaio.objects.Dimensions.List();
    joolaio.objects.Metrics.List();

    var executionTime = new Date().getMilliseconds() - start;
    //joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.Table', 5, '...Constructor (' + executionTime + 'ms)');
};


/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
joolaio.visualisation.realtime.Table.prototype.init = function (options, container) {
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
        matchedContainers = $('.joolaio.realtime.table');
    if (matchedContainers.length == 0)
        return;

    $(matchedContainers).each(function (index, item) {
        if (!$(this).parent().hasClass('prettyprint')) {
            joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.Table', 6, 'Applying to container (\'' + this.id + '\')');

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
                joolaio.visualisation.realtime.panel.showEditWidget({_this:joolaio.visualisation.realtime.panel, container:joolaio.visualisation.realtime.panel.container, addNew:false, widgetID:$(item).attr('data-widgetid'), sender:_this, sendercontainer:item });
            });

            $(this).bind('data', function (evt, ret) {
                ret.data = $(this).data().data;
            });

            $(this).bind('click', function (evt) {
                $(this).trigger('clicked', $(this).data().data);
            });

            var key = dimensions + "_" + metric + "_" + joolaio.visualisation.realtime.globalfilter + "_" + 'Timeline' + "_" + 3 + "_" + period + "_" + "DESC" + "_" + metric + "_" + limit;
            key = key.replace(/ /g, "").replace(/,/g, "").replace(/\./g, "");
            //console.log(key);
            _this.key = key;
            if (joolaio.visualisation.realtime.connected) {
                joolaio.debug.log('INFO', 'Subscribing to comet channel (already connected) - ' + key, 6, '');
                //console.log('subscribing to comet channel (already connected) - '  + key);

                var client_id = PokeIn.GetClientId();
                var queryOptions = {
                    ClientID:client_id,
                    Dimensions:dimensions,
                    Metrics:metric,
                    Filter:joolaio.visualisation.realtime.globalfilter,
                    Resolution:'Timeline',
                    Interval:3,
                    Period:period,
                    omitDate:true,
                    callback:'joolaioResponse_Realtime_Response_Table',
                    Limit:limit,
                    SortDir:'DESC',
                    SortKey:metric
                };
                joolaio.dataaccess.fetch(this, '/engine/Realtime.svc/subscribe', queryOptions, function () {
                });


            }
            else {
                //console.log('subscribing to comet channel (bind) - '  + key);
                joolaio.debug.log('INFO', 'Subscribing to comet channel (bind) - ' + key, 6, '');

                $(joolaio.visualisation.realtime).bind('cometstart', function (e) {
                    //console.log('calling subscribe');
                    //joolaio.debug.log('INFO', 'Subscribing to comet channel (already connected) - '  + key, 6, '');

                    var client_id = PokeIn.GetClientId();
                    var queryOptions = {
                        ClientID:client_id,
                        Dimensions:dimensions,
                        Metrics:metric,
                        Filter:joolaio.visualisation.realtime.globalfilter,
                        Resolution:'Timeline',
                        Interval:3,
                        Period:period,
                        omitDate:true,
                        callback:'joolaioResponse_Realtime_Response_Table',
                        Limit:limit,
                        SortDir:'DESC',
                        SortKey:metric
                    };
                    joolaio.dataaccess.fetch(this, '/engine/Realtime.svc/subscribe', queryOptions, function () {
                    });


                });
            }

            joolaio.visualisation.realtime.subscribers.push({key:key, sender:_this, container:$(item)});
            $(_this).bind('newdata', function (e, data) {

            });

            window.joolaioResponse_Realtime_Response_Table = _this.joolaioResponse_Realtime_Table;

            $(joolaio.realtime).bind('backintime', function (event, data) {
                _this.processFetch(_this, data, item, dimensions, metric, limit);
            });
            $(joolaio.realtime).bind('backtotime', function (data) {

            });

            _this.containers.push(item);
        }
    });


    var executionTime = new Date().getMilliseconds() - start;
    joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.Table', 5, '...init (' + executionTime + 'ms)');
};

joolaio.visualisation.realtime.Table.prototype.processFetch = function (sender, data, item, dimensions, metric, limit) {
    //console.log('process fetch');
    //joolaio.realtime.backintime(data.timestamp);
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
        FromDate:joolaio.date.formatDate(fromDate, 'yyyy-mm-dd hh:nn:ss.000'),
        ToDate:joolaio.date.formatDate(toDate, 'yyyy-mm-dd hh:nn:ss.999'),
        Dimensions:dimensions,
        Metrics:'Bet Count',
        Resolution:'Timeline',
        omitDate:true,
        Filter:joolaio.visualisation.realtime.globalfilter,
        onlyUseCached:false,
        Limit:limit,
        SortDir:'DESC',
        SortKey:metric
    };

    joolaio.dataaccess.fetch(_this, '/engine/Query.svc/fetch', queryOptions, processFetchProxy);
};
/*
 joolaio.visualisation.realtime.Table.prototype.processFetch=function (sender, data, error)
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

joolaio.visualisation.realtime.Table.prototype.joolaioResponse_Realtime_Table = function (message) {
    var _this = null;
    try {
        //console.log('1');
        $(joolaio.visualisation.realtime.subscribers).each(function (index, item) {
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
                        var $parent = $($(this).closest('.joolaio.realtime.table'));
                        var key = $parent.attr('data-dimensions');
                        var value = $(this).text();

                        var filter = key + '=' + value + '[AND]';
                        //console.log(filter);
                        if (joolaio.visualisation.realtime.globalfilter.indexOf(filter) == -1 && joolaio.visualisation.realtime.drillDownFilter.indexOf(filter) == -1) {
                            //joolaio.realtime.globalfilter += filter;
                            joolaio.visualisation.realtime.drillDownFilter += filter;
                            joolaio.visualisation.realtime.processFilter();
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


joolaio.visualisation.realtime.Table.prototype.baseHTML = function (container) {
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

joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.Table', 6, 'JS source loaded');

/**
 * init the Timeline and look for containers
 */

/*
if ($('.joolaio.realtime.panel').length == 0)
    new joolaio.visualisation.realtime.Table().init();
*/