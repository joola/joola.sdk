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

joolaio.provide('joolaio.objects.Auth.Organizations');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

joolaio.require('joolaio.objects');

joolaio.objects.Auth.Organizations = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;

    var executionTime = new Date().getMilliseconds() - start;
    //joolaio.debug.log('INFO', 'joolaio.objects.Auth.Organizations', 5, '...Constructor (' + executionTime + 'ms)');
};

joolaio.objects.Auth.Organizations.prototype.List = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Auth.svc/ListOrganizations', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/Auth.svc/ListOrganizations', null, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

joolaio.objects.Auth.Organizations.prototype.Update = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Auth.svc/UpdateOrganization', {ORG_ID:options.ORG_ID, ORG_Name:options.ORG_Name, ORG_Filter:options.ORG_Filter}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/Auth.svc/UpdateOrganization', {ORG_ID:options.ORG_ID, ORG_Name:options.ORG_Name, ORG_Filter:options.ORG_Filter}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

joolaio.objects.Auth.Organizations.prototype.Delete = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Auth.svc/DeleteOrganization', {ORG_ID:options.ORG_ID}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/Auth.svc/DeleteOrganization', {ORG_ID:options.ORG_ID}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

joolaio.loaded.push('joolaio.objects.Auth.Organizations');
joolaio.debug.log('INFO', 'joolaio.objects.Auth.Organizations', 6, 'JS source loaded');
