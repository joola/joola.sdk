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


joolaio.provide('joolaio.visualisation.realtime');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

//joolaio.require('joolaio.realtime');

/**
 * Create and install a realtime datepicker handler
 * @constructor
 */
joolaio.visualisation.realtime;
/*
joolaio.Realtime.Visualisation = function () {
    var start = new Date().getMilliseconds();

    //this._this = this;
    //joolaio.debug.log(0,0, 'server timestamp - ' + joolaio.date.getServerTimestamp());

    var executionTime = new Date().getMilliseconds() - start;
    joolaio.debug.log('INFO', 'joolaio.Realtime.Visualisation', 5, '...Constructor (' + executionTime + 'ms)');
};*/



joolaio.visualisation.realtime.connected = false;
joolaio.visualisation.realtime.paused = false;
joolaio.visualisation.realtime.pausedTime = null;

//console.log($.parseJSON(joolaio.dataaccess.fetch(null, '/engine/Realtime.svc/state', null, null).data).Running);
joolaio.visualisation.realtime.serverrunning = false; //eval($.parseJSON(joolaio.dataaccess.fetch(null, '/engine/Realtime.svc/state', null, null).data).Running);

joolaio.visualisation.realtime.statusboxes = [];
joolaio.visualisation.realtime.subscribers = [];

joolaio.visualisation.realtime.drillDownFilter = '';
joolaio.visualisation.realtime.panelFilter = '';
joolaio.visualisation.realtime.globalfilter = '';
joolaio.visualisation.realtime.filters = [];

joolaio.visualisation.realtime.serverTimestamp;

joolaio.visualisation.realtime.init = function () {
    var start = new Date().getMilliseconds();

    //joolaio.realtime.processFilter();

    window.joolaioResponse_ServerTimestamp = joolaio.visualisation.realtime.Process_serverTimeStamp;


    var executionTime = new Date().getMilliseconds() - start;
    joolaio.debug.log('INFO', 'Realtime', 5, '...realtime init (' + executionTime + 'ms)');
};

joolaio.visualisation.realtime.Process_serverTimeStamp = function (data) {
    joolaio.visualisation.realtime.serverTimestamp = new Date(data);
}

joolaio.visualisation.realtime.processFilter = function () {
    // console.log('processing global filter');

    joolaio.visualisation.realtime.globalfilter = '';
    var oldfilters = joolaio.visualisation.realtime.filters;
    joolaio.visualisation.realtime.filters = [];

    $(joolaio.visualisation.realtime.panelFilter.split('[AND]')).each(function (index, item) {
        var dimension = item.split('=')[0];
        var value = item.split('=')[1];

        if (dimension) {

            var filter = {
                caption:dimension,
                value:value
            };

            joolaio.visualisation.realtime.filters.push(filter);
        }
    });
    $(joolaio.visualisation.realtime.drillDownFilter.split('[AND]')).each(function (index, item) {
        var dimension = item.split('=')[0];
        var value = item.split('=')[1];

        if (dimension) {

            var filter = {
                caption:dimension,
                value:value
            };

            joolaio.visualisation.realtime.filters.push(filter);
        }
    });

    joolaio.visualisation.realtime.globalfilter = joolaio.visualisation.realtime.panelFilter + joolaio.visualisation.realtime.drillDownFilter;

    if (joolaio.visualisation.realtime.filters != oldfilters)
        $(joolaio.visualisation.realtime).trigger('filterchange');

    //console.log(joolaio.realtime.filters);

    var $filterbox = $('.joolaio.realtime.panel').find('.filtersWrapper');
    if ($filterbox) {
        $filterbox.empty();
        if (joolaio.visualisation.realtime.filters.length == 0) {
            $filterbox.hide();
        }
        else {
            //console.log('drawing filters');
            $(joolaio.visualisation.realtime.filters).each(function (index, item) {
                var _html = '';
                _html += '<div class="filterWrapper">' +
                    '<div class="filterContainer">' +
                    '<span class="caption">' + item.caption + ':</span>' +
                    '<span class="value">' + item.value + '</span>' +
                    '<button type="button" class="close">×</button>' +
                    '</div>' +
                    '</div>';

                var $item = $(_html);
                var $close = $($item.find('.close'));
                $close.off('click');
                $close.on('click', function (e) {
                    var key = item.caption + '=' + item.value + '[AND]';


                    joolaio.visualisation.realtime.panelFilter = joolaio.visualisation.realtime.panelFilter.replace(key, '');
                    joolaio.visualisation.realtime.drillDownFilter = joolaio.visualisation.realtime.drillDownFilter.replace(key, '');
                    joolaio.visualisation.realtime.processFilter();
                });
                $filterbox.append($item);
            });

            $filterbox.show();
        }
    }
};

joolaio.visualisation.realtime.event_backintime = function (data) {
    $(joolaio.visualisation.realtime).trigger('backintime', data);
};

joolaio.visualisation.realtime.event_backtotime = function (data) {
    $(joolaio.visualisation.realtime).trigger('backtotime', data);
};

joolaio.visualisation.realtime.start = function () {
    //var _this = this;
    if (joolaio.visualisation.realtime.connected) {
        //$(joolaio.realtime).trigger('cometstart');
        return;
    }

    PokeIn.Start(
        function (is_done) {// Connected?
            if (is_done) {
                joolaio.debug.log('INFO', 'Realtime', 5, 'Comet Started');
                joolaio.visualisation.realtime.connected = is_done;
                $(joolaio.visualisation.realtime).trigger('cometstart');
            }
        }
    );
};

joolaio.visualisation.realtime.restart = function () {
//var _this = this;
    if (joolaio.visualisation.realtime.connected) {
        $(joolaio.visualisation.realtime).trigger('cometstart');
        return;
    }
    joolaio.debug.log('INFO', 'Realtime', 5, 'Restarting Comet');
    PokeIn.ReConnect();
    document.OnPokeInReady = function () {
        joolaio.visualisation.realtime.start();
    };
}

joolaio.visualisation.realtime.stop = function () {
    if (!joolaio.visualisation.realtime.connected) {
        $(joolaio.visualisation.realtime).trigger('cometstop');
        return;
    }

    joolaio.debug.log('INFO', 'Realtime', 5, 'Comet Stopped');
    PokeIn.Close();

    joolaio.visualisation.realtime.connected = false;

    $(joolaio.visualisation.realtime).trigger('cometstop');
};

//joolaio.visualisation.realtime.init();

joolaio.debug.log('INFO', 'joolaio.Realtime.Visualisation', 6, 'JS source loaded');
