// Copyright 2013 Joola. All Rights Reserved.
//
// Licensed under the Jarvis License Agreement (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://jarvis.joo.la/license
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * @fileoverview File for Jarvis Client SDK JS Library (Jarvis).
 * A Dashboard Visualisation base class
 * @author itay@joo.la (itay weinberger)
 */

/**
 * @namespace jarvis.visualisation.dashboard
 * @requires jarvis.debug
 * @requires jarvis.date
 * @requires jarvis.string
 * @requires jarvis.visualisation
 */

jarvis.provide('jarvis.visualisation.dashboard');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

//jarvis.require('jarvis.dashboard');

/**
 * The dashboard visualisation reference
 * @type {object}
 */
jarvis.visualisation.dashboard;


jarvis.visualisation.dashboard.panelFilter = '';
jarvis.visualisation.dashboard.globalfilter = '';
jarvis.visualisation.dashboard.filters = [];

jarvis.visualisation.dashboard.init = function () {
    var start = new Date().getMilliseconds();


    var executionTime = new Date().getMilliseconds() - start;
    jarvis.debug.log('INFO', 'Dashboard', 5, '...dashboard init (' + executionTime + 'ms)');
};

jarvis.visualisation.dashboard.setFilter = function (filter) {
    //jarvis.dashboard.globalfilter = filter;

    jarvis.visualisation.dashboard.globalfilter = '';
    var oldfilters = jarvis.visualisation.dashboard.filters;
    jarvis.visualisation.dashboard.filters = [];

    if (filter && filter != '') {
        $(filter.split('[AND]')).each(function (index, item) {
            var dimension = item.split('=')[0];
            var value = item.split('=')[1];

            if (dimension) {

                var filter = {
                    caption:dimension,
                    value:value
                };

                jarvis.visualisation.dashboard.filters.push(filter);
            }
        });
    }

    $(jarvis.visualisation.dashboard.panelFilter.split('[AND]')).each(function (index, item) {
        var dimension = item.split('=')[0];
        var value = item.split('=')[1];

        if (dimension) {

            var filter = {
                caption:dimension,
                value:value
            };

            jarvis.visualisation.dashboard.filters.push(filter);
        }
    });

    jarvis.visualisation.dashboard.globalfilter = jarvis.visualisation.dashboard.panelFilter + (filter ? filter:'');

    //console.log(jarvis.dashboard.globalfilter );

    $(jarvis.visualisation.dashboard).trigger('filter');

    var $filterbox = $('.jarvis.dashboard.panel').find('.filtersWrapper');

    if ($filterbox) {
        $filterbox.empty();
        if (jarvis.visualisation.dashboard.filters.length == 0) {
            $filterbox.hide();
        }
        else {
            //console.log('drawing filters');
            $(jarvis.visualisation.dashboard.filters).each(function (index, item) {
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


                    jarvis.visualisation.dashboard.panelFilter = jarvis.visualisation.dashboard.panelFilter.replace(key, '');
                    //jarvis.realtime.drillDownFilter = jarvis.realtime.drillDownFilter.replace(key, '');
                    jarvis.visualisation.dashboard.setFilter();

                });
                $filterbox.append($item);
            });

            $filterbox.show();
        }
    }

};

jarvis.visualisation.dashboard.addPartial = function (partial) {
    $(jarvis.visualisation.dashboard).trigger('addpartialfilter', partial);
};

jarvis.visualisation.dashboard.removePartial = function (partial) {
    $(jarvis.visualisation.dashboard).trigger('removepartialfilter', partial);
};


//jarvis.debug.log('INFO', 'Dashboard', 6, 'JS source loaded');


//jarvis.visualisation.dashboard.init();

jarvis.debug.log('INFO', 'Jarvis.Visualisation.Dashboard', 6, 'JS source loaded');
