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

joolaio.provide('joolaio.visualisation.report');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

//joolaio.require('joolaio.report');

/**
 * The report visualisation reference
 * @type {object}
 */
joolaio.visualisation.report;

/**
 * Global filter currently in effect
 * @type {string}
 */
joolaio.visualisation.report.globalfilter = '';

/**
 * Init the report visualisation base class
 */
joolaio.visualisation.report.init = function () {
    var start = new Date().getMilliseconds();

    var executionTime = new Date().getMilliseconds() - start;
    joolaio.debug.log('INFO', 'Report', 5, '...report init (' + executionTime + 'ms)');
};

joolaio.visualisation.report.setFilter = function (filter) {
    joolaio.visualisation.report.globalfilter = filter;
    $(joolaio.visualisation.report).trigger('filter');
};

joolaio.visualisation.report.addPartial = function (partial) {
    $(joolaio.visualisation.report).trigger('addpartialfilter', partial);
};

joolaio.visualisation.report.removePartial = function (partial) {
    $(joolaio.visualisation.report).trigger('removepartialfilter', partial);
};

joolaio.visualisation.report.clearFilter= function (partial) {
    $(joolaio.visualisation.report).trigger('joolaio-clearfilter');
};

joolaio.debug.log('INFO', 'joolaio.Visualisation.', 6, 'JS source loaded');
