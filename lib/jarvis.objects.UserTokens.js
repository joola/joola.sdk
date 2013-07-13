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
 * This file is responsible for communication with Jarvis Analytics Engine for the UserTokens Interface.
 * @author itay@joo.la (itay weinberger)
 */

jarvis.provide('jarvis.objects.UserTokens');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.objects');


/**
 * Initializes a new UserTokens object.
 * @class Responsible for communication with Jarvis Analytics Engine for the User Tokens Interface
 * @requires jarvis.debug
 * @requires jarvis.date
 * @requires jarvis.string
 * @requires jarvis.objects
 * @param options {object} base settings for the object.
 * @constructor
 */
jarvis.objects.UserTokens = function (options) {
    var start = new Date().getMilliseconds();
    /**
     * Holds reference to the current context
     * @type {*}
     * @private
     */
    var _this = this;

    var executionTime = new Date().getMilliseconds() - start;
    //jarvis.debug.log('INFO', 'jarvis.objects.UserTokens', 5, '...Constructor (' + executionTime + 'ms)');
};

/**
 * Lists all avaialble and valid User Tokens
 * @param sender {object} context object that is returned to the callback
 * @param options {object} array of options to be passed to the APIFUNC.
 * @param callback {function} function to receive the sender and the data.
 * @see <a href="/docs/rest/apis/usertokens.html#UserTokens.List">API Function</a>
 * @returns {object}
 */
jarvis.objects.UserTokens.prototype.List = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function') {
        jarvis.dataaccess.fetch(this, '/engine/UserTokens.svc/List', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    }
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/UserTokens.svc/List', null, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

/**
 * Validates a User Token by a given ID
 * @param sender {object} context object that is returned to the callback
 * @param options {object} array of options to be passed to the APIFUNC.
 * @param callback {function} function to receive the sender and the data.
 * @see <a href="/docs/rest/apis/usertokens.html#UserTokens.Validate">API Function</a>
 * @returns {object}
 */
jarvis.objects.UserTokens.prototype.Validate = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/UserTokens.svc/Validate', {token: options.token}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/UserTokens.svc/Validate', {token: options.token}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

/**
 * Updates a User Token by a given ID
 * @param sender {object} context object that is returned to the callback
 * @param options {object} array of options to be passed to the APIFUNC.
 * @param callback {function} function to receive the sender and the data.
 * @see <a href="/docs/rest/apis/usertokens.html#UserTokens.Update">API Function</a>
 * @returns {object}
 */
jarvis.objects.UserTokens.prototype.Update = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/UserTokens.svc/Update', {APT_ID:options.APT_ID, APT_Name:options.APT_Name, APT_GenerateUserTokens:options.APT_GenerateUserTokens, APT_IPRestrictionStart:options.APT_IPRestrictionStart, APT_IPRestrictionEnd:options.APT_IPRestrictionEnd}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/UserTokens.svc/Update', {APT_ID:options.APT_ID, APT_Name:options.APT_Name, APT_GenerateUserTokens:options.APT_GenerateUserTokens, APT_IPRestrictionStart:options.APT_IPRestrictionStart, APT_IPRestrictionEnd:options.APT_IPRestrictionEnd}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

/**
 * Expires a User Token by a given ID
 * @param sender {object} context object that is returned to the callback
 * @param options {object} array of options to be passed to the APIFUNC.
 * @param callback {function} function to receive the sender and the data.
 * @see <a href="/docs/rest/apis/usertokens.html#UserTokens.Expire">API Function</a>
 * @returns {object}
 */
jarvis.objects.UserTokens.prototype.Expire = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/UserTokens.svc/Expire', {USER_ID: options.USER_ID}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/UserTokens.svc/Expire', {USER_ID: options.USER_ID}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

/**
 * Extends a User Token by a given ID
 * @param sender {object} context object that is returned to the callback
 * @param options {object} array of options to be passed to the APIFUNC.
 * @param callback {function} function to receive the sender and the data.
 * @see <a href="/docs/rest/apis/usertokens.html#UserTokens.Expire">API Function</a>
 * @returns {object}
 */
jarvis.objects.UserTokens.prototype.Extend = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/UserTokens.svc/Extend', {USER_ID: options.USER_ID}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/UserTokens.svc/Extend', {USER_ID: options.USER_ID}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};
jarvis.loaded.push('jarvis.objects.UserTokens');
jarvis.debug.log('INFO', 'jarvis.objects.UserTokens', 6, 'JS source loaded');
