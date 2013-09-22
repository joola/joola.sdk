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


joolaio.provide('joolaio.visualisation.notice.Session');
joolaio.require('joolaio.date');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.string');

joolaio.require('joolaio.visualisation.notice');

joolaio.visualisation.notice.Session = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;
    this._this = this;

    var _options = {
        container:$('body'),
        htmlAdded:false,
        interval:60
    };

    _this.container = _options.container;
    _this.options = _options;
    _this.init(_this);

    var executionTime = new Date().getMilliseconds() - start;
    //joolaio.debug.log('INFO', 'joolaio.Visualisation.Notice.Session', 5, '...Constructor (' + executionTime + 'ms)');
};
/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
joolaio.visualisation.notice.Session.prototype.init = function (sender) {
    var _this = sender;
    var start = new Date().getMilliseconds();

    var $container = _this.container;
    var interval = _this.options.interval * 1000;

    setInterval(function () {
        joolaio.dataaccess.fetch(this, '/engine/Auth.svc/CheckSession', {}, function (sender, data, error) {
            result = $.parseJSON(data.data);

            var $content = null;
            if (eval(result) == false) {

                if (!_this.htmlAdded) {
                    _this.htmlAdded = true;

                    $content = $(_this.baseHTML(_this));
                    $container.append($content);

                    $content.find('.modal').on('hidden', function () {
                        location.href = "/login.html";
                    })
                }
                else
                    $content = $container.find('.joolaio.notice.session');

                $content.find('.modal').modal('show');
            }
            else {
                $content = $container.find('.joolaio.notice.session');
                $content.find('.modal').off('hidden');
                $content.find('.modal').modal('hide');
            }
        });
    }, interval);

    var executionTime = new Date().getMilliseconds() - start;
    joolaio.debug.log('INFO', 'joolaio.Visualisation.Notice.Session', 5, '...init (' + executionTime + 'ms)');
};

joolaio.visualisation.notice.Session.prototype.baseHTML = function (sender) {
    var _this = sender;

    var $html = $('<div class="joolaio notice session"></div>');
    var _html = '<div class="modal hide fade" style="width:auto;left:50%;">';
    _html += '<div class="modal-header">';
    _html += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
    _html += '<h3>Session Expired</h3>';
    _html += '</div>';
    _html += '<div class="modal-body">';
    _html += '<p>Your session has expired due to inactivity. Press the Login button to re-login and resume your session.</p>';
    _html += '</div>';
    _html += '<div class="modal-footer">';
    _html += '<a href="/login.html" class="btn btn-primary">Login</a>';
    _html += '</div>';
    _html += '</div>';

    $html.append(_html);
    return $html;
};

joolaio.loaded.push('joolaio.visualisation.notice.Session');
joolaio.debug.log('INFO', 'joolaio.Visualisation.Notice.Session', 6, 'JS source loaded');

//new joolaio.visualisation.notice.Session();