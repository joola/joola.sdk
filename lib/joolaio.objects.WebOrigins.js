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


joolaio.provide('joolaio.objects.WebOrigins');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

joolaio.require('joolaio.objects');

/**
 * Initializes a new WebOrigins object.
 * @class Responsible for communication with joolaio Engine for the WebOrigins Interface
 * @requires joolaio.debug
 * @requires joolaio.date
 * @requires joolaio.string
 * @requires joolaio.objects
 * @param options {object} base settings for the object.
 * @constructor
 */
joolaio.objects.WebOrigins = function (options) {
    var start = new Date().getMilliseconds();

    /**
     * Holds reference to the current context
     * @type {*}
     * @private
     */
    var _this = this;

    var executionTime = new Date().getMilliseconds() - start;
    //joolaio.debug.log('INFO', 'joolaio.objects.Auth.APITokens', 5, '...Constructor (' + executionTime + 'ms)');
};

/**
 * Lists all avaialble and valid Web Origins
 * @param sender {object} context object that is returned to the callback
 * @param options {object} array of options to be passed to the APIFUNC.
 * @param callback {function} function to receive the sender and the data.
 * @see <a href="/docs/rest/apis/weborigins.html#WebOrigins.List">API Function</a>
 * @returns {object}
 */
joolaio.objects.WebOrigins.prototype.List = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function') {
        joolaio.dataaccess.fetch(this, '/engine/WebOrigins.svc/List', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    }
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/WebOrigins.svc/List', null, null);
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
joolaio.objects.WebOrigins.prototype.Update = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/WebOrigins.svc/Update', {WEO_ID:options.WEO_ID, HTTPURL:options.HTTPURL}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/WebOrigins.svc/Update', {WEO_ID:options.WEO_ID, HTTPURL:options.HTTPURL}, null);
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
joolaio.objects.WebOrigins.prototype.Delete = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/WebOrigins.svc/Delete', {WEO_ID:options.WEO_ID}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/WebOrigins.svc/Delete', {WEO_ID:options.WEO_ID}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

joolaio.loaded.push('joolaio.objects.WebOrigins');
joolaio.debug.log('INFO', 'joolaio.objects.WebOrigins', 6, 'JS source loaded');
