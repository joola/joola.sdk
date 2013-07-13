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
 * @fileoverview Provides a report visualisation to display current server date and time.
 *
 */


jarvis.provide('jarvis.visualisation.notice.Session');
jarvis.require('jarvis.date');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.string');

jarvis.require('jarvis.visualisation.notice');

jarvis.visualisation.notice.Session = function (options) {
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
    //jarvis.debug.log('INFO', 'Jarvis.Visualisation.Notice.Session', 5, '...Constructor (' + executionTime + 'ms)');
};
/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
jarvis.visualisation.notice.Session.prototype.init = function (sender) {
    var _this = sender;
    var start = new Date().getMilliseconds();

    var $container = _this.container;
    var interval = _this.options.interval * 1000;

    setInterval(function () {
        jarvis.dataaccess.fetch(this, '/engine/Auth.svc/CheckSession', {}, function (sender, data, error) {
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
                    $content = $container.find('.jarvis.notice.session');

                $content.find('.modal').modal('show');
            }
            else {
                $content = $container.find('.jarvis.notice.session');
                $content.find('.modal').off('hidden');
                $content.find('.modal').modal('hide');
            }
        });
    }, interval);

    var executionTime = new Date().getMilliseconds() - start;
    jarvis.debug.log('INFO', 'Jarvis.Visualisation.Notice.Session', 5, '...init (' + executionTime + 'ms)');
};

jarvis.visualisation.notice.Session.prototype.baseHTML = function (sender) {
    var _this = sender;

    var $html = $('<div class="jarvis notice session"></div>');
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

jarvis.loaded.push('jarvis.visualisation.notice.Session');
jarvis.debug.log('INFO', 'Jarvis.Visualisation.Notice.Session', 6, 'JS source loaded');

//new jarvis.visualisation.notice.Session();