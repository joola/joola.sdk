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


jarvis.provide('jarvis.debug');

jarvis.require('jarvis.string');

jarvis.debug.log = function (type, module, level, message) {
    if (jarvis.DEBUG && jarvis.DEBUGLEVEL >= level) {
        var timepassed = new Date() - jarvis.loadTimestamp;
        timepassed = jarvis.string.padNumber(timepassed / 1000, 4, 3, ' ');

        if (level <= jarvis.DEBUGLEVEL)
            console.log('[' + timepassed + 's] ' + '[' + module + '] ' + message);
    }
};

jarvis.debug.log('INFO', 'Debug', 6, 'JS source loaded');
