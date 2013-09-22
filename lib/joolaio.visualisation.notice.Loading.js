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


joolaio.provide('joolaio.visualisation.notice.Loading');
joolaio.require('joolaio.date');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.string');

joolaio.require('joolaio.visualisation.notice');

joolaio.visualisation.notice.Loading = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;
    this._this = this;

    var _options = {
        container:$('body'),
        htmlAdded:false
    };

    _this.container = _options.container;
    _this.options = _options;
    _this.init(_this);

    var executionTime = new Date().getMilliseconds() - start;
    //joolaio.debug.log('INFO', 'joolaio.Visualisation.Notice.Loading', 5, '...Constructor (' + executionTime + 'ms)');
};
/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
joolaio.visualisation.notice.Loading.prototype.init = function (sender) {
    var _this = sender;
    var start = new Date().getMilliseconds();

    var $container = _this.container;

       var executionTime = new Date().getMilliseconds() - start;
    joolaio.debug.log('INFO', 'joolaio.Visualisation.notice.Loading', 5, '...init (' + executionTime + 'ms)');
};

joolaio.visualisation.notice.Loading.prototype.baseHTML = function (sender) {
    var _this = sender;

    var $html = $('<div class="joolaio notice session"></div>');
    var _html = '';

    $html.append(_html);
    return $html;
};

joolaio.loaded.push('joolaio.visualisation.notice.Loading');
joolaio.debug.log('INFO', 'joolaio.Visualisation.Notice.Loading', 6, 'JS source loaded');

//new joolaio.visualisation.notice.Loading();