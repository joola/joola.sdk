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


jarvis.provide('jarvis.visualisation.notice.Loading');
jarvis.require('jarvis.date');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.string');

jarvis.require('jarvis.visualisation.notice');

jarvis.visualisation.notice.Loading = function (options) {
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
    //jarvis.debug.log('INFO', 'Jarvis.Visualisation.Notice.Loading', 5, '...Constructor (' + executionTime + 'ms)');
};
/**
 * Inits the class and builds the base html for it.
 * @param {string=} container An optional container to apply the class to.
 */
jarvis.visualisation.notice.Loading.prototype.init = function (sender) {
    var _this = sender;
    var start = new Date().getMilliseconds();

    var $container = _this.container;

       var executionTime = new Date().getMilliseconds() - start;
    jarvis.debug.log('INFO', 'Jarvis.Visualisation.notice.Loading', 5, '...init (' + executionTime + 'ms)');
};

jarvis.visualisation.notice.Loading.prototype.baseHTML = function (sender) {
    var _this = sender;

    var $html = $('<div class="jarvis notice session"></div>');
    var _html = '';

    $html.append(_html);
    return $html;
};

jarvis.loaded.push('jarvis.visualisation.notice.Loading');
jarvis.debug.log('INFO', 'Jarvis.Visualisation.Notice.Loading', 6, 'JS source loaded');

//new jarvis.visualisation.notice.Loading();