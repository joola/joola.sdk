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
  * This file is responsible for communication with Jarvis Analytics Engine for the WebOrigins Interface.
  * @author itay@joo.la (itay weinberger)
 */

jarvis.provide('jarvis.objects.WebOrigins');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.objects');

/**
 * Initializes a new WebOrigins object.
 * @class Responsible for communication with Jarvis Analytics Engine for the WebOrigins Interface
 * @requires jarvis.debug
 * @requires jarvis.date
 * @requires jarvis.string
 * @requires jarvis.objects
 * @param options {object} base settings for the object.
 * @constructor
 */
jarvis.objects.WebOrigins = function (options) {
    var start = new Date().getMilliseconds();

    /**
     * Holds reference to the current context
     * @type {*}
     * @private
     */
    var _this = this;

    var executionTime = new Date().getMilliseconds() - start;
    //jarvis.debug.log('INFO', 'jarvis.objects.Auth.APITokens', 5, '...Constructor (' + executionTime + 'ms)');
};

/**
 * Lists all avaialble and valid Web Origins
 * @param sender {object} context object that is returned to the callback
 * @param options {object} array of options to be passed to the APIFUNC.
 * @param callback {function} function to receive the sender and the data.
 * @see <a href="/docs/rest/apis/weborigins.html#WebOrigins.List">API Function</a>
 * @returns {object}
 */
jarvis.objects.WebOrigins.prototype.List = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function') {
        jarvis.dataaccess.fetch(this, '/engine/WebOrigins.svc/List', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    }
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/WebOrigins.svc/List', null, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

/**
 * Updates a Web Origin by a given ID
 * @param sender {object} context object that is returned to the callback
 * @param options {object} array of options to be passed to the APIFUNC.
 * @param callback {function} function to receive the sender and the data.
 * @see <a href="/docs/rest/apis/weborigins.html#WebOrigins.Update">API Function</a>
 * @returns {object}
 */
jarvis.objects.WebOrigins.prototype.Update = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/WebOrigins.svc/Update', {WEO_ID:options.WEO_ID, HTTPURL:options.HTTPURL}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/WebOrigins.svc/Update', {WEO_ID:options.WEO_ID, HTTPURL:options.HTTPURL}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

/**
 * Delete a Web Origin
 * @param sender {object} context object that is returned to the callback
 * @param options {object} array of options to be passed to the APIFUNC.
 * @param callback {function} function to receive the sender and the data.
 * @see <a href="/docs/rest/apis/apitokens.html#APITokens.Expire">API Function</a>
 * @returns {object}
 */
jarvis.objects.WebOrigins.prototype.Delete = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/WebOrigins.svc/Delete', {WEO_ID:options.WEO_ID}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/WebOrigins.svc/Delete', {WEO_ID:options.WEO_ID}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

jarvis.loaded.push('jarvis.objects.WebOrigins');
jarvis.debug.log('INFO', 'jarvis.objects.WebOrigins', 6, 'JS source loaded');
