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

joolaio.provide('joolaio.objects.Auth.Users');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

joolaio.require('joolaio.objects');

joolaio.objects.Auth.Users = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;

    var executionTime = new Date().getMilliseconds() - start;
    //joolaio.debug.log('INFO', 'joolaio.objects.Auth.Users', 5, '...Constructor (' + executionTime + 'ms)');
};

joolaio.objects.Auth.Users.prototype.List = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Auth.svc/ListUsers', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/Auth.svc/ListUsers', null, null);
        result = $.parseJSON(result.data);
    }

    return result;
};


joolaio.objects.Auth.Users.prototype.Update = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Auth.svc/UpdateUser', {USR_ID:options.USR_ID, USR_Username:options.USR_Username, USR_Displayname:options.USR_Displayname, USR_Email:options.USR_Email, USR_Filter:options.USR_Filter, USR_ORG_ID:options.USR_ORG_ID}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/Auth.svc/UpdateUser', {USR_ID:options.USR_ID, USR_Username:options.USR_Username, USR_Displayname:options.USR_Displayname, USR_Email:options.USR_Email, USR_Filter:options.USR_Filter, USR_ORG_ID:options.USR_ORG_ID}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

joolaio.objects.Auth.Users.prototype.Delete = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Auth.svc/DeleteUser', {USR_ID:options.USR_ID}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/Auth.svc/DeleteUser', {USR_ID:options.USR_ID}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

joolaio.objects.Auth.Users.prototype.AddRole = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Auth.svc/AddUserRole', {USR_ID:options.USR_ID, ROLE_ID:options.ROLE_ID}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/Auth.svc/AddUserRole', {USR_ID:options.USR_ID, ROLE_ID:options.ROLE_ID}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

joolaio.objects.Auth.Users.prototype.DeleteRole = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Auth.svc/DeleteUserRole', {USR_ID:options.USR_ID, ROLE_ID:options.ROLE_ID}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/Auth.svc/DeleteUserRole', {USR_ID:options.USR_ID, ROLE_ID:options.ROLE_ID}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

joolaio.loaded.push('joolaio.objects.Auth.Users');
joolaio.debug.log('INFO', 'joolaio.objects.Auth.Users', 6, 'JS source loaded');
