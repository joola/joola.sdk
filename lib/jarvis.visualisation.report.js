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
 * A Report Visualisation base class
 * @author itay@joo.la (itay weinberger)
 */

/**
 * @namespace jarvis.visualisation.report
 * @requires jarvis.debug
 * @requires jarvis.date
 * @requires jarvis.string
 * @requires jarvis.visualisation
 */

jarvis.provide('jarvis.visualisation.report');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

//jarvis.require('jarvis.report');

/**
 * The report visualisation reference
 * @type {object}
 */
jarvis.visualisation.report;

/**
 * Global filter currently in effect
 * @type {string}
 */
jarvis.visualisation.report.globalfilter = '';

/**
 * Init the report visualisation base class
 */
jarvis.visualisation.report.init = function () {
    var start = new Date().getMilliseconds();

    var executionTime = new Date().getMilliseconds() - start;
    jarvis.debug.log('INFO', 'Report', 5, '...report init (' + executionTime + 'ms)');
};

jarvis.visualisation.report.setFilter = function (filter) {
    console.log('set',filter,jarvis.visualisation.report.globalfilter );
    jarvis.visualisation.report.globalfilter = filter;
    $(jarvis.visualisation.report).trigger('filter');
};

jarvis.visualisation.report.addPartial = function (partial) {
    $(jarvis.visualisation.report).trigger('addpartialfilter', partial);
};

jarvis.visualisation.report.removePartial = function (partial) {
    $(jarvis.visualisation.report).trigger('removepartialfilter', partial);
};

jarvis.visualisation.report.clearFilter= function (partial) {
    $(jarvis.visualisation.report).trigger('jarvis-clearfilter');
};

jarvis.debug.log('INFO', 'Jarvis.Visualisation.', 6, 'JS source loaded');
