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

joolaio.provide('joolaio.objects.Auth.Roles');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

joolaio.require('joolaio.objects');

joolaio.objects.Auth.Roles = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;

    var executionTime = new Date().getMilliseconds() - start;
    //joolaio.debug.log('INFO', 'joolaio.objects.Auth.Roles', 5, '...Constructor (' + executionTime + 'ms)');
};

joolaio.objects.Auth.Roles.prototype.List= function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Auth.svc/ListRoles', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else{
        result = joolaio.dataaccess.fetch(this, '/engine/Auth.svc/ListRoles', null, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

joolaio.objects.Auth.Roles.prototype.Update = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Auth.svc/UpdateRole', {ROLE_ID:options.ROLE_ID, ROLE_Name:options.ROLE_Name, ROLE_Filter:options.ROLE_Filter}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/Auth.svc/UpdateRole', {ROLE_ID:options.ROLE_ID, ROLE_Name:options.ROLE_Name, ROLE_Filter:options.ROLE_Filter}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

joolaio.objects.Auth.Roles.prototype.Delete = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Auth.svc/DeleteRole', {ROLE_ID:options.ROLE_ID}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/Auth.svc/DeleteRole', {ROLE_ID:options.ROLE_ID}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

joolaio.objects.Auth.Roles.prototype.AddPermission = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Auth.svc/AddRolePermission', {ROLE_ID:options.ROLE_ID, PERMISSION_ID:options.PERMISSION_ID}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/Auth.svc/AddRolePermission', {ROLE_ID:options.ROLE_ID, PERMISSION_ID:options.PERMISSION_ID}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

joolaio.objects.Auth.Roles.prototype.DeletePermission = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Auth.svc/DeleteRolePermission', {ROLE_ID:options.ROLE_ID, PERMISSION_ID:options.PERMISSION_ID}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/Auth.svc/DeleteRolePermission', {ROLE_ID:options.ROLE_ID, PERMISSION_ID:options.PERMISSION_ID}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

joolaio.loaded.push('joolaio.objects.Auth.Roles');
joolaio.debug.log('INFO', 'joolaio.objects.Auth.Roles', 6, 'JS source loaded');
