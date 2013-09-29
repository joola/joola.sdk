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

joolaio.provide('joolaio.visualisation.dashboard');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

//joolaio.require('joolaio.dashboard');

/**
 * The dashboard visualisation reference
 * @type {object}
 */
joolaio.visualisation.dashboard;


joolaio.visualisation.dashboard.panelFilter = '';
joolaio.visualisation.dashboard.globalfilter = '';
joolaio.visualisation.dashboard.filters = [];

joolaio.visualisation.dashboard.init = function () {
    var start = new Date().getMilliseconds();


    var executionTime = new Date().getMilliseconds() - start;
    joolaio.debug.log('INFO', 'Dashboard', 5, '...dashboard init (' + executionTime + 'ms)');
};

joolaio.visualisation.dashboard.setFilter = function (filter) {
    //joolaio.dashboard.globalfilter = filter;

    joolaio.visualisation.dashboard.globalfilter = '';
    var oldfilters = joolaio.visualisation.dashboard.filters;
    joolaio.visualisation.dashboard.filters = [];

    if (filter && filter != '') {
        $(filter.split('[AND]')).each(function (index, item) {
            var dimension = item.split('=')[0];
            var value = item.split('=')[1];

            if (dimension) {

                var filter = {
                    caption:dimension,
                    value:value
                };

                joolaio.visualisation.dashboard.filters.push(filter);
            }
        });
    }

    $(joolaio.visualisation.dashboard.panelFilter.split('[AND]')).each(function (index, item) {
        var dimension = item.split('=')[0];
        var value = item.split('=')[1];

        if (dimension) {

            var filter = {
                caption:dimension,
                value:value
            };

            joolaio.visualisation.dashboard.filters.push(filter);
        }
    });

    joolaio.visualisation.dashboard.globalfilter = joolaio.visualisation.dashboard.panelFilter + (filter ? filter:'');

    //console.log(joolaio.dashboard.globalfilter );

    $(joolaio.visualisation.dashboard).trigger('filter');

    var $filterbox = $('.joolaio.dashboard.panel').find('.filtersWrapper');

    if ($filterbox) {
        $filterbox.empty();
        if (joolaio.visualisation.dashboard.filters.length == 0) {
            $filterbox.hide();
        }
        else {
            //console.log('drawing filters');
            $(joolaio.visualisation.dashboard.filters).each(function (index, item) {
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


                    joolaio.visualisation.dashboard.panelFilter = joolaio.visualisation.dashboard.panelFilter.replace(key, '');
                    //joolaio.realtime.drillDownFilter = joolaio.realtime.drillDownFilter.replace(key, '');
                    joolaio.visualisation.dashboard.setFilter();

                });
                $filterbox.append($item);
            });

            $filterbox.show();
        }
    }

};

joolaio.visualisation.dashboard.addPartial = function (partial) {
    $(joolaio.visualisation.dashboard).trigger('addpartialfilter', partial);
};

joolaio.visualisation.dashboard.removePartial = function (partial) {
    $(joolaio.visualisation.dashboard).trigger('removepartialfilter', partial);
};


//joolaio.debug.log('INFO', 'Dashboard', 6, 'JS source loaded');


//joolaio.visualisation.dashboard.init();

joolaio.debug.log('INFO', 'joolaio.Visualisation.Dashboard', 6, 'JS source loaded');
