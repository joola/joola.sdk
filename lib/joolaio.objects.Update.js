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

joolaio.provide('joolaio.objects.Update');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

joolaio.require('joolaio.objects');

joolaio.objects.Update = function (options) {
    var _this = this;
};

joolaio.objects.Update.prototype.CurrentVersion = function (sender, options, callback) {
    var result;
    joolaio.inSaveState = true;
    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Update.svc/CurrentVersion', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            setTimeout(function () {
                joolaio.inSaveState = false;
            }, 5000);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/Update.svc/CurrentVersion', null, null);
        setTimeout(function () {
            joolaio.inSaveState = false;
        }, 5000);
    }

    return result;
};

joolaio.objects.Update.prototype.CurrentChangeset = function (sender, options, callback) {
    var result;
    joolaio.inSaveState = true;
    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Update.svc/CurrentChangeset', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            setTimeout(function () {
                joolaio.inSaveState = false;
            }, 5000);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/Update.svc/CurrentChangeset', null, null);
        setTimeout(function () {
            joolaio.inSaveState = false;
        }, 5000);
    }

    return result;
};

joolaio.objects.Update.prototype.Changes = function (sender, options, callback) {
    var result;
    joolaio.inSaveState = true;
    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Update.svc/Changes', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            setTimeout(function () {
                joolaio.inSaveState = false;
            }, 5000);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/Update.svc/Changes', null, null);
        setTimeout(function () {
            joolaio.inSaveState = false;
        }, 5000);
    }

    return result;
};

joolaio.objects.Update.prototype.RunUpdate = function (sender, options, callback) {
    var result;
    joolaio.inSaveState = true;
    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Update.svc/RunUpdate', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            setTimeout(function () {
                joolaio.inSaveState = false;
            }, 5000);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/Update.svc/RunUpdate', null, null);
        setTimeout(function () {
            joolaio.inSaveState = false;
        }, 5000);
    }

    return result;
};

joolaio.objects.Update.prototype.CurrentRevision = function (sender, options, callback) {
    var result;
    joolaio.inSaveState = true;
    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Update.svc/CurrentRevision', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            setTimeout(function () {
                joolaio.inSaveState = false;
            }, 5000);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/Update.svc/CurrentRevision', null, null);
        setTimeout(function () {
            joolaio.inSaveState = false;
        }, 5000);
    }

    return result;
};

joolaio.loaded.push('joolaio.objects.Update');
joolaio.debug.log('INFO', 'joolaio.objects.Update', 6, 'JS source loaded');
