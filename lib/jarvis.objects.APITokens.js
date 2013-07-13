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
  * This file is responsible for communication with Jarvis Analytics Engine for the APITokens Interface.
  * @author itay@joo.la (itay weinberger)
 */

jarvis.provide('jarvis.objects.APITokens');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.objects');

/**
 * Initializes a new APITokens object.
 * @class Responsible for communication with Jarvis Analytics Engine for the APITokens Interface
 * @requires jarvis.debug
 * @requires jarvis.date
 * @requires jarvis.string
 * @requires jarvis.objects
 * @param options {object} base settings for the object.
 * @constructor
 */
jarvis.objects.APITokens = function (options) {
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
 * Lists all avaialble and valid API Tokens
 * @param sender {object} context object that is returned to the callback
 * @param options {object} array of options to be passed to the APIFUNC.
 * @param callback {function} function to receive the sender and the data.
 * @see <a href="/docs/rest/apis/apitokens.html#APITokens.List">API Function</a>
 * @returns {object}
 */
jarvis.objects.APITokens.prototype.List = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function') {
        jarvis.dataaccess.fetch(this, '/engine/APITokens.svc/List', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    }
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/APITokens.svc/List', null, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

/**
 * Generates a user security token for the given user using the specific API token
 * @param sender {object} context object that is returned to the callback
 * @param options {object} array of options to be passed to the APIFUNC.
 * @param callback {function} function to receive the sender and the data.
 * @see <a href="/docs/rest/apis/apitokens.html#APITokens.GenerateUserToken">API Function</a>
 * @returns {object}
 */
jarvis.objects.APITokens.prototype.GenerateUserToken = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/APITokens.svc/GenerateUserToken', {APIToken: options.APIToken, USER_ID: options.USER_ID}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/APITokens.svc/GenerateUserToken', {APIToken: options.APIToken, USER_ID: options.USER_ID}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

/**
 * Updates an API Token by a given ID
 * @param sender {object} context object that is returned to the callback
 * @param options {object} array of options to be passed to the APIFUNC.
 * @param callback {function} function to receive the sender and the data.
 * @see <a href="/docs/rest/apis/apitokens.html#APITokens.Update">API Function</a>
 * @returns {object}
 */
jarvis.objects.APITokens.prototype.Update = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/APITokens.svc/Update', {APT_ID:options.APT_ID, APT_Name:options.APT_Name, APT_GenerateUserTokens:options.APT_GenerateUserTokens, APT_IPRestrictionStart:options.APT_IPRestrictionStart, APT_IPRestrictionEnd:options.APT_IPRestrictionEnd}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/APITokens.svc/Update', {APT_ID:options.APT_ID, APT_Name:options.APT_Name, APT_GenerateUserTokens:options.APT_GenerateUserTokens, APT_IPRestrictionStart:options.APT_IPRestrictionStart, APT_IPRestrictionEnd:options.APT_IPRestrictionEnd}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

/**
 * Expires an API Token
 * @param sender {object} context object that is returned to the callback
 * @param options {object} array of options to be passed to the APIFUNC.
 * @param callback {function} function to receive the sender and the data.
 * @see <a href="/docs/rest/apis/apitokens.html#APITokens.Expire">API Function</a>
 * @returns {object}
 */
jarvis.objects.APITokens.prototype.Expire = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/APITokens.svc/Expire', {APT_ID:options.APT_ID}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/APITokens.svc/Expire', {APT_ID:options.APT_ID}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

jarvis.loaded.push('jarvis.objects.APITokens');
jarvis.debug.log('INFO', 'jarvis.objects.APITokens', 6, 'JS source loaded');
