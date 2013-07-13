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
 * @fileoverview Utilities for manipulating arrays.
 *
 */


jarvis.provide('jarvis.visualisation.realtime');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

//jarvis.require('jarvis.realtime');

/**
 * Create and install a realtime datepicker handler
 * @constructor
 */
jarvis.visualisation.realtime;
/*
jarvis.Realtime.Visualisation = function () {
    var start = new Date().getMilliseconds();

    //this._this = this;
    //jarvis.debug.log(0,0, 'server timestamp - ' + jarvis.date.getServerTimestamp());

    var executionTime = new Date().getMilliseconds() - start;
    jarvis.debug.log('INFO', 'Jarvis.Realtime.Visualisation', 5, '...Constructor (' + executionTime + 'ms)');
};*/



jarvis.visualisation.realtime.connected = false;
jarvis.visualisation.realtime.paused = false;
jarvis.visualisation.realtime.pausedTime = null;

//console.log($.parseJSON(jarvis.dataaccess.fetch(null, '/engine/Realtime.svc/state', null, null).data).Running);
jarvis.visualisation.realtime.serverrunning = false; //eval($.parseJSON(jarvis.dataaccess.fetch(null, '/engine/Realtime.svc/state', null, null).data).Running);

jarvis.visualisation.realtime.statusboxes = [];
jarvis.visualisation.realtime.subscribers = [];

jarvis.visualisation.realtime.drillDownFilter = '';
jarvis.visualisation.realtime.panelFilter = '';
jarvis.visualisation.realtime.globalfilter = '';
jarvis.visualisation.realtime.filters = [];

jarvis.visualisation.realtime.serverTimestamp;

jarvis.visualisation.realtime.init = function () {
    var start = new Date().getMilliseconds();

    //jarvis.realtime.processFilter();

    window.jarvisResponse_ServerTimestamp = jarvis.visualisation.realtime.Process_serverTimeStamp;


    var executionTime = new Date().getMilliseconds() - start;
    jarvis.debug.log('INFO', 'Realtime', 5, '...realtime init (' + executionTime + 'ms)');
};

jarvis.visualisation.realtime.Process_serverTimeStamp = function (data) {
    jarvis.visualisation.realtime.serverTimestamp = new Date(data);
}

jarvis.visualisation.realtime.processFilter = function () {
    // console.log('processing global filter');

    jarvis.visualisation.realtime.globalfilter = '';
    var oldfilters = jarvis.visualisation.realtime.filters;
    jarvis.visualisation.realtime.filters = [];

    $(jarvis.visualisation.realtime.panelFilter.split('[AND]')).each(function (index, item) {
        var dimension = item.split('=')[0];
        var value = item.split('=')[1];

        if (dimension) {

            var filter = {
                caption:dimension,
                value:value
            };

            jarvis.visualisation.realtime.filters.push(filter);
        }
    });
    $(jarvis.visualisation.realtime.drillDownFilter.split('[AND]')).each(function (index, item) {
        var dimension = item.split('=')[0];
        var value = item.split('=')[1];

        if (dimension) {

            var filter = {
                caption:dimension,
                value:value
            };

            jarvis.visualisation.realtime.filters.push(filter);
        }
    });

    jarvis.visualisation.realtime.globalfilter = jarvis.visualisation.realtime.panelFilter + jarvis.visualisation.realtime.drillDownFilter;

    if (jarvis.visualisation.realtime.filters != oldfilters)
        $(jarvis.visualisation.realtime).trigger('filterchange');

    //console.log(jarvis.realtime.filters);

    var $filterbox = $('.jarvis.realtime.panel').find('.filtersWrapper');
    if ($filterbox) {
        $filterbox.empty();
        if (jarvis.visualisation.realtime.filters.length == 0) {
            $filterbox.hide();
        }
        else {
            //console.log('drawing filters');
            $(jarvis.visualisation.realtime.filters).each(function (index, item) {
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


                    jarvis.visualisation.realtime.panelFilter = jarvis.visualisation.realtime.panelFilter.replace(key, '');
                    jarvis.visualisation.realtime.drillDownFilter = jarvis.visualisation.realtime.drillDownFilter.replace(key, '');
                    jarvis.visualisation.realtime.processFilter();
                });
                $filterbox.append($item);
            });

            $filterbox.show();
        }
    }
};

jarvis.visualisation.realtime.event_backintime = function (data) {
    $(jarvis.visualisation.realtime).trigger('backintime', data);
};

jarvis.visualisation.realtime.event_backtotime = function (data) {
    $(jarvis.visualisation.realtime).trigger('backtotime', data);
};

jarvis.visualisation.realtime.start = function () {
    //var _this = this;
    if (jarvis.visualisation.realtime.connected) {
        //$(jarvis.realtime).trigger('cometstart');
        return;
    }

    PokeIn.Start(
        function (is_done) {// Connected?
            if (is_done) {
                jarvis.debug.log('INFO', 'Realtime', 5, 'Comet Started');
                jarvis.visualisation.realtime.connected = is_done;
                $(jarvis.visualisation.realtime).trigger('cometstart');
            }
        }
    );
};

jarvis.visualisation.realtime.restart = function () {
//var _this = this;
    if (jarvis.visualisation.realtime.connected) {
        $(jarvis.visualisation.realtime).trigger('cometstart');
        return;
    }
    jarvis.debug.log('INFO', 'Realtime', 5, 'Restarting Comet');
    PokeIn.ReConnect();
    document.OnPokeInReady = function () {
        jarvis.visualisation.realtime.start();
    };
}

jarvis.visualisation.realtime.stop = function () {
    if (!jarvis.visualisation.realtime.connected) {
        $(jarvis.visualisation.realtime).trigger('cometstop');
        return;
    }

    jarvis.debug.log('INFO', 'Realtime', 5, 'Comet Stopped');
    PokeIn.Close();

    jarvis.visualisation.realtime.connected = false;

    $(jarvis.visualisation.realtime).trigger('cometstop');
};

//jarvis.visualisation.realtime.init();

jarvis.debug.log('INFO', 'Jarvis.Realtime.Visualisation', 6, 'JS source loaded');
