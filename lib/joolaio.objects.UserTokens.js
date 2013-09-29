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

joolaio.provide('joolaio.objects.UserTokens');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

joolaio.require('joolaio.objects');


/**
 * Initializes a new UserTokens object.
 * @class Responsible for communication with joolaio Engine for the User Tokens Interface
 * @requires joolaio.debug
 * @requires joolaio.date
 * @requires joolaio.string
 * @requires joolaio.objects
 * @param options {object} base settings for the object.
 * @constructor
 */
joolaio.objects.UserTokens = function (options) {
    var start = new Date().getMilliseconds();
    /**
     * Holds reference to the current context
     * @type {*}
     * @private
     */
    var _this = this;

    var executionTime = new Date().getMilliseconds() - start;
    //joolaio.debug.log('INFO', 'joolaio.objects.UserTokens', 5, '...Constructor (' + executionTime + 'ms)');
};

/**
 * Lists all avaialble and valid User Tokens
 * @param sender {object} context object that is returned to the callback
 * @param options {object} array of options to be passed to the APIFUNC.
 * @param callback {function} function to receive the sender and the data.
 * @see <a href="/docs/rest/apis/usertokens.html#UserTokens.List">API Function</a>
 * @returns {object}
 */
joolaio.objects.UserTokens.prototype.List = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function') {
        joolaio.dataaccess.fetch(this, '/engine/UserTokens.svc/List', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    }
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/UserTokens.svc/List', null, null);
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
joolaio.objects.UserTokens.prototype.Validate = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/UserTokens.svc/Validate', {token: options.token}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/UserTokens.svc/Validate', {token: options.token}, null);
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
joolaio.objects.UserTokens.prototype.Update = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/UserTokens.svc/Update', {APT_ID:options.APT_ID, APT_Name:options.APT_Name, APT_GenerateUserTokens:options.APT_GenerateUserTokens, APT_IPRestrictionStart:options.APT_IPRestrictionStart, APT_IPRestrictionEnd:options.APT_IPRestrictionEnd}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/UserTokens.svc/Update', {APT_ID:options.APT_ID, APT_Name:options.APT_Name, APT_GenerateUserTokens:options.APT_GenerateUserTokens, APT_IPRestrictionStart:options.APT_IPRestrictionStart, APT_IPRestrictionEnd:options.APT_IPRestrictionEnd}, null);
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
joolaio.objects.UserTokens.prototype.Expire = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/UserTokens.svc/Expire', {USER_ID: options.USER_ID}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/UserTokens.svc/Expire', {USER_ID: options.USER_ID}, null);
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
joolaio.objects.UserTokens.prototype.Extend = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/UserTokens.svc/Extend', {USER_ID: options.USER_ID}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/UserTokens.svc/Extend', {USER_ID: options.USER_ID}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};
joolaio.loaded.push('joolaio.objects.UserTokens');
joolaio.debug.log('INFO', 'joolaio.objects.UserTokens', 6, 'JS source loaded');
