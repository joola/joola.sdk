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


joolaio.provide('joolaio.objects.Auth');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

joolaio.require('joolaio.objects');

joolaio.objects.Auth = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;

    var executionTime = new Date().getMilliseconds() - start;
    //joolaio.debug.log('INFO', 'joolaio.objects.Auth', 5, '...Constructor (' + executionTime + 'ms)');
};

joolaio.objects.Auth.prototype.checkToken = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/auth.checkToken', options, function (sender, data, error) {

            result = data.authenticated;
            callback(sender, result);
        });
    else {

        result = joolaio.dataaccess.fetch(this, '/auth.checkToken', options, null);
        result = result.authenticated;
    }

    return result;
};

joolaio.objects.Auth.prototype.CheckSession = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Auth.svc/CheckSession', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = joolaio.dataaccess.fetch(this, '/engine/Auth.svc/CheckSession', null, null);

    return result;
};

joolaio.objects.Auth.prototype.GetToken = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Auth.svc/GetToken', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = joolaio.dataaccess.fetch(this, '/engine/Auth.svc/GetToken', null, null);

    return result;
};

joolaio.objects.Auth.prototype.GetUser = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/auth.getUser', null, function (sender, data, error) {
            result = data.user;
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/auth.getUser', null, null);
        result = result.user;
    }

    return result;
};

joolaio.loaded.push('joolaio.objects.Auth');
joolaio.debug.log('INFO', 'joolaio.objects.Auth', 6, 'JS source loaded');
