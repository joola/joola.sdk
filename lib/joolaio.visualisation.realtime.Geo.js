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

joolaio.provide('joolaio.visualisation.realtime.Geo');

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

joolaio.visualisation.realtime.Geo = function (options) {
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

    //turn on realtime comet
    joolaio.visualisation.realtime.start();


    joolaio.objects.Dimensions.List();
    joolaio.objects.Metrics.List();

    var executionTime = new Date().getMilliseconds() - start;
    //joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.Geo', 5, '...Constructor (' + executionTime + 'ms)');
};


/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
joolaio.visualisation.realtime.Geo.prototype.init = function (options, container) {
    var _this = this;
    var start = new Date().getMilliseconds();

    this._this = this;
    this.options = options;
    this.mode = "map";

    this.containers = this.containers || [];

    //lookup any containers relevant for the timeline
    var matchedContainers = null;
    if (container)
        matchedContainers = $(container);
    else
        matchedContainers = $('.joolaio.realtime.geo');
    if (matchedContainers.length == 0)
        return;

    $(matchedContainers).each(function (index, item) {
        if (!$(this).parent().hasClass('prettyprint')) {
            joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.Geo', 6, 'Applying to container (\'' + this.id + '\')');

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
            //console.log('limit '  + limit);

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
            var $this = $(this);

            if (_this.mode == "map") {
                google.load('visualization', '1.0', {'packages':['corechart', 'geochart']});

                // Set a callback to run when the Google Visualization API is loaded.
                google.setOnLoadCallback(function (e) {
                    //console.log('drawing map');
                    var dataArray = [];
                    dataArray.push(['Latitude', 'Longitude', 'Caption', 'Event Count']);

                    dataArray.push([0, 0, 'Name', 0]);
                    //  dataArray.push([24.4667053222, 54.3666992187, 'Name', 1000]);
                    /*
                     $(args.data.results).each(function (index, item) {
                     dataArray.push([item.key , parseFloat(item.value)]);
                     });
                     */
                    //console.log(dataArray);
                    var $placeholder = $($this.find('.innercontainer')).get(0);
                    //console.log($placeholder);

                    _this.geoChart = new google.visualization.GeoChart($placeholder);
                    var options = {
                        displayMode:'markers',
                        colorAxis:{colors:['#1a87d5']}
                    };

                    _this.geoData = google.visualization.arrayToDataTable(dataArray);
                    _this.geoChart.draw(_this.geoData, options);
                });
            }
            else {
                var _runonce = true;
                try {
                    if (_runonce) {
                        google.earth.createInstance($(item).find('.innercontainer').get(0), function (instance) {

                                ge = instance;
                                ge.getWindow().setVisibility(true);

                                // add some layers
                                ge.getLayerRoot().enableLayerById(ge.LAYER_BORDERS, true);
                                ge.getLayerRoot().enableLayerById(ge.LAYER_ROADS, true);


                                var features = ge.getFeatures();
                                while (features.getFirstChild()) {
                                    features.removeChild(features.getFirstChild());
                                }

                                // Get the current view.
                                //ge.getOptions().setFlyToSpeed(ge.SPEED_TELEPORT);
                                try {
                                    var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);

                                    // Zoom out to twice the current range.
                                    lookAt.setRange(lookAt.getRange() / 3.0);

                                    // Set new latitude and longitude values.
                                    // Set new latitude and longitude values.
                                    lookAt.setLatitude(0);
                                    lookAt.setLongitude(0);
                                    // Add 15 degrees to the current tilt.
                                    //lookAt.setTilt(lookAt.getTilt() + 15.0);

                                    // Update the view in Google Earth.
                                    ge.getView().setAbstractView(lookAt);
                                }
                                catch (ex) {
                                }

                                google.earth.addEventListener(ge.getGlobe(), 'click', function (evt) {
                                    if (evt.getButton() != 0)
                                        return;
                                });
                            }
                            , function (error) {
                                throw error;
                            });
                        _runonce = false;
                    }

                } catch (ex) {
                    throw ex;
                }
                /*
                 var lastlong = 0;
                 var lastlat = 0;
                 $(args.data.results).each(function (index, item) {
                 var arcsight = new JAPI.Plugin.Server();
                 var geodata = arcsight.GetGeoData(item.key);
                 console.log(geodata.countrycode + '<br/>Event Count: ' + item.value);

                 try {
                 // Create the placemark.
                 var placemark = ge.createPlacemark('');
                 placemark.setName(geodata.countrycode + '<br/>Event Count: ' + item.value);

                 // Define a custom icon.
                 var icon = ge.createIcon('');
                 icon.setHref('http://maps.google.com/mapfiles/kml/paddle/red-circle.png');
                 var style = ge.createStyle('');
                 style.getIconStyle().setIcon(icon);
                 style.getIconStyle().setScale(3.0);
                 placemark.setStyleSelector(style);

                 // Set the placemark's location.
                 var point = ge.createPoint(geodata.countrycode);
                 point.setLatitude(geodata.latitude / 10000000000);
                 point.setLongitude(geodata.longitude / 10000000000);
                 placemark.setGeometry(point);

                 // Add the placemark to Earth.
                 ge.getFeatures().appendChild(placemark);
                 lastlong = geodata.longitude / 10000000000;
                 lastlat = geodata.latitude / 10000000000;
                 }
                 catch (ex) {
                 }
                 });

                 if (args.data.results.length == 1) {
                 // Get the current view.
                 //ge.getOptions().setFlyToSpeed(ge.SPEED_TELEPORT);
                 try {
                 var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);

                 // Zoom out to twice the current range.
                 lookAt.setRange(lookAt.getRange() / 4.0);

                 // Set new latitude and longitude values.
                 lookAt.setLatitude(lastlat);
                 lookAt.setLongitude(lastlong);
                 // Add 15 degrees to the current tilt.
                 //lookAt.setTilt(lookAt.getTilt() + 15.0);

                 // Update the view in Google Earth.
                 ge.getView().setAbstractView(lookAt);
                 }
                 catch (ex) {
                 }
                 }*/
            }

            $(this).find('.settings').off('click');
            $(this).find('.settings').on('click', function (e) {
                joolaio.visualisation.realtime.panel.showEditWidget({_this:joolaio.visualisation.realtime.panel, container:joolaio.visualisation.realtime.panel.container, addNew:false, widgetID:$(item).attr('data-widgetid'), sender:_this, sendercontainer:item });
            });

            $(this).find('.globe').off('click');
            $(this).find('.globe').on('click', function (e) {

                $(item).find('.container').empty();

                if (_this.mode == 'map')
                    _this.mode = 'globe';
                else
                    _this.mode = 'map';
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
                joolaio.debug.log('INFO', 'Subscribing to comet channel (already connected) - ' + key, 6, 'JS source loaded');
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
                    callback:'joolaioResponse_Realtime_Response_Geo',
                    Limit:limit,
                    SortDir:'DESC',
                    SortKey:metric
                };
                joolaio.dataaccess.fetch(this, '/engine/Realtime.svc/subscribe', queryOptions, function () {
                });

            }
            else {
                //console.log('subscribing to comet channel (bind) - '  + key);
                joolaio.debug.log('INFO', 'Subscribing to comet channel (bind) - ' + key, 6, 'JS source loaded');

                $(joolaio.realtime).bind('cometstart', function (e) {
                    //console.log('calling subscribe');
                    //joolaio.debug.log('INFO', 'Subscribing to comet channel (already connected) - '  + key, 6, 'JS source loaded');

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
                        callback:'joolaioResponse_Realtime_Response_Geo',
                        Limit:limit,
                        SortDir:'DESC',
                        SortKey:metric
                    };
                    joolaio.dataaccess.fetch(this, '/engine/Realtime.svc/subscribe', queryOptions, function () {
                    });


                });
            }

            joolaio.visualisation.realtime.subscribers.push({key:key, sender:_this, container:item});
            $(_this).bind('newdata', function (e, data) {

            });

            window.joolaioResponse_Realtime_Response_Geo = _this.joolaioResponse_Realtime_Response_Geo;

            $(joolaio.realtime).bind('backintime', function (event, data) {
                _this.processFetch(_this, data, item, dimensions, metric, limit);
            });
            $(joolaio.realtime).bind('backtotime', function (data) {

            });

            _this.containers.push(item);
        }
    });


    var executionTime = new Date().getMilliseconds() - start;
    joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.Geo', 5, '...init (' + executionTime + 'ms)');
};

joolaio.visualisation.realtime.Geo.prototype.processFetch = function (sender, data, item, dimensions, metric, limit) {
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
                                $tr.children().animate({ backgroundColor:"#E6E8DC" }, {duration:1000}).animate({ backgroundColor:"white" }, 'slow');
                            }
                            catch (e) {
                            }
                        else
                            try {
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
                            $tr.children().animate({ backgroundColor:"#E6E8DC" }, {duration:1000}).animate({ backgroundColor:"white" }, 'slow');
                        }
                        catch (e) {
                        }
                    else
                        try {
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
        Metrics:'Event Count',
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
 joolaio.realtime.visualisation.Table.prototype.processFetch=function (sender, data, error)
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

joolaio.visualisation.realtime.Geo.prototype.joolaioResponse_Realtime_Response_Geo = function (message) {
    var _this = null;
    $(joolaio.visualisation.realtime.subscribers).each(function (index, item) {
        if (item.key == message[0].key) {
            //console.log(message[0].value);
            _this = item.sender;

            //console.log(message);
            // return;
            /*
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
             */
            //now we go over the message line by line and see if we need to swap any records
            var dataArray = [];
            if (_this.mode == "map")
                dataArray.push(['Latitude', 'Longitude', 'Caption', 'Event Count']);

            $(message).each(function (i, m) {

                if (m.dimension != '(not set)') {
                    //console.log('drawing map');

                    //console.log(m);

                    var id = parseInt(m.dimension.split(',')[0]);
                    var lat = parseFloat(m.dimension.split(',')[1]);
                    var lon = parseFloat(m.dimension.split(',')[2]);
                    var name = m.dimension.split(',')[3];

                    //console.log('pushing', lat, lon, name, m.value);

                    dataArray.push([lat, lon, name, m.value]);
                    //dataArray.push([0, 0, 'Name', 1000]);
                    //dataArray.push([24.4667053222, 54.3666992187, name, 1000]);

                }
            });
            /*
             $(args.data.results).each(function (index, item) {
             dataArray.push([item.key , parseFloat(item.value)]);
             });
             */
            //console.log(dataArray);
            var $placeholder = $($(item.container).find('.innercontainer')).get(0);
            // console.log($placeholder);

            //_this.geoChart = new google.visualization.GeoChart($placeholder);
            if (_this.mode == "map") {
                var options = {
                    displayMode:'markers',
                    colorAxis:{colors:['#1a87d5']}
                };

                _this.geoData = google.visualization.arrayToDataTable(dataArray);
                //console.log('test');
                _this.geoChart.draw(_this.geoData, options);
            }
            else {
                var features = ge.getFeatures();

                while (features.getFirstChild()) {
                    features.removeChild(features.getFirstChild());
                }

                var lastlong = 0;
                var lastlat = 0;
                $(dataArray).each(function (index, item) {
                    //console.log(item);
                    try {
                        // Create the placemark.
                        var placemark = ge.createPlacemark('');
                        placemark.setName(item[2] + '<br/>Event Count: ' + item[3]);

                        // Define a custom icon.
                        var icon = ge.createIcon('');
                        icon.setHref('http://maps.google.com/mapfiles/kml/paddle/red-circle.png');
                        var style = ge.createStyle('');
                        style.getIconStyle().setIcon(icon);
                        style.getIconStyle().setScale(3.0);
                        placemark.setStyleSelector(style);

                        // Set the placemark's location.
                        var point = ge.createPoint(item[2]);
                        point.setLatitude(item[0]);
                        point.setLongitude(item[1]);
                        placemark.setGeometry(point);

                        // console.log('adding');
                        // Add the placemark to Earth.
                        features.appendChild(placemark);
                        lastlong = item[0];
                        lastlat = item[1];
                    }
                    catch (ex) {
                        throw ex;
                    }
                });


                //console.log(features);

                /*
                 $(placemarks).each(function(index,item){
                 console.log('adding');
                 features.appendChild(item);
                 });
                 */
                if (dataArray.length > 0) {
                    // Get the current view.
                    //ge.getOptions().setFlyToSpeed(ge.SPEED_TELEPORT);
                    try {
                        var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);

                        // Zoom out to twice the current range.
                        //lookAt.setRange(lookAt.getRange());

                        // Set new latitude and longitude values.
                        // Set new latitude and longitude values.
                        lookAt.setLatitude(lastlat);
                        lookAt.setLongitude(lastlong);
                        // Add 15 degrees to the current tilt.
                        //lookAt.setTilt(lookAt.getTilt() + 15.0);

                        // Update the view in Google Earth.
                        ge.getView().setAbstractView(lookAt);
                    }
                    catch (ex) {
                    }
                }
            }
//console.log('test');
            /*
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
             }*/


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

            $table.find('tr').each(function (index, name) {
                $(this).find('.index').text(index + '.');
            });

            $(_this).trigger('newdata', value);
        }
    });
};

/**
 * Inits the class and builds the base html for it.
 * @return (string) returns the base html to be applied in the container
 */


joolaio.visualisation.realtime.Geo.prototype.baseHTML = function (container) {

    //var $html = '<div class="innercontainer"></div>';

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

        '<div class="move"></div>' +
        '<div class="globe"></div>' +
        '<h3>' + title + '</h3>' +
        '</div>' +
        '<div class="innercontainer" style="height:400px;"></div>' +
        '</div>');
    $();

    return $html;
};

var ge;

function initCB(instance) {
    ge = instance;
    ge.getWindow().setVisibility(true);
}

function failureCB(e, b, c) {
    console.log(e);
    console.log(b);
    console.log(c);
}

joolaio.debug.log('INFO', 'joolaio.visualisation.realtime.Geo', 6, 'JS source loaded');

/**
 * init the Timeline and look for containers
 */
//new joolaio.visualisation.realtime.Geo().init();


