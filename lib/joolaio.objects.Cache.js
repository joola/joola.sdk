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

joolaio.provide('joolaio.objects.Cache');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

joolaio.require('joolaio.objects');

joolaio.objects.Cache = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;

    var executionTime = new Date().getMilliseconds() - start;
    //joolaio.debug.log('INFO', 'joolaio.objects.Cache', 5, '...Constructor (' + executionTime + 'ms)');
};

joolaio.objects.Cache.prototype.PurgeInternal = function (sender, options, callback) {
    var result;
    joolaio.inSaveState = true;
    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Cache.svc/PurgeInternal', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            setTimeout(function () {
                joolaio.inSaveState = false;
            }, 5000);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/Cache.svc/PurgeInternal', null, null);
        setTimeout(function () {
            joolaio.inSaveState = false;
        }, 5000);
    }

    return result;
};

joolaio.objects.Cache.prototype.PurgeResults = function (sender, options, callback) {
    var result;
    joolaio.inSaveState = true;
    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Cache.svc/PurgeResults', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            setTimeout(function () {
                joolaio.inSaveState = false;
            }, 5000);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/Cache.svc/PurgeResults', null, null);
        setTimeout(function () {
            joolaio.inSaveState = false;
        }, 5000);
    }

    return result;
};

joolaio.objects.Cache.prototype.PurgeAll = function (sender, options, callback) {
    var result;
    joolaio.inSaveState = true;
    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Cache.svc/PurgeAll', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            setTimeout(function () {
                joolaio.inSaveState = false;
            }, 5000);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/Cache.svc/PurgeAll', null, null);
        setTimeout(function () {
            joolaio.inSaveState = false;
        }, 5000);
    }

    return result;
};

joolaio.objects.Cache.prototype.PurgeData = function (sender, options, callback) {
    var result;
    joolaio.inSaveState = true;
    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Cache.svc/PurgeData', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            setTimeout(function () {
                joolaio.inSaveState = false;
            }, 5000);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/Cache.svc/PurgeData', null, null);
        setTimeout(function () {
            joolaio.inSaveState = false;
        }, 5000);
    }

    return result;
};

joolaio.objects.Cache.prototype.TidyUp = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Cache.svc/TidyUp', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = joolaio.dataaccess.fetch(this, '/engine/Cache.svc/TidyUp', null, null);

    return result;
};

joolaio.objects.Cache.prototype.Build = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Cache.svc/Build', {Tablename:options.tablename, FromDate:options.fromdate, ToDate:options.todate, Resolution:options.resolution}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = joolaio.dataaccess.fetch(this, '/engine/Cache.svc/Build', {Tablename:options.tablename, FromDate:options.fromdate, ToDate:options.todate, Resolution:options.resolution, falseExecute:false, Realtime:false}, null);

    return result;
};


joolaio.objects.Cache.prototype.RecycleApp = function (sender, options, callback) {
    var result;
    joolaio.inSaveState = true;
    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Cache.svc/RecycleApp', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            setTimeout(function () {
                joolaio.inSaveState = false;
            }, 5000);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/Cache.svc/RecycleApp', null, null);
        setTimeout(function () {
            joolaio.inSaveState = false;
        }, 5000);
    }

    return result;
};


joolaio.loaded.push('joolaio.objects.Cache');
joolaio.debug.log('INFO', 'joolaio.objects.Cache', 6, 'JS source loaded');
