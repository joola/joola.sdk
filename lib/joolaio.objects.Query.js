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

joolaio.provide('joolaio.objects.Query');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

joolaio.require('joolaio.objects');

joolaio.objects.Query = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;

    var executionTime = new Date().getMilliseconds() - start;
    //joolaio.debug.log('INFO', 'joolaio.objects.Cache', 5, '...Constructor (' + executionTime + 'ms)');
};

joolaio.objects.Query.prototype.SystemStartDate = function (sender, options, callback) {
    var result;
    if (joolaio.systemStartDate != null && typeof callback !== 'function')
        return joolaio.systemStartDate;

    joolaio.inSaveState = true;
    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/status/systemStartDate', null, function (sender, data, error) {
            result = data.startDate;
            if (result == null) {
                result = new Date();
            }
            joolaio.systemStartDate = new Date(result);
            joolaio.systemStartDate.setUTCHours(0, 0, 0, 0);
            joolaio.systemStartDate.setDate(joolaio.systemStartDate.getDate() + 1);
            setTimeout(function () {
                joolaio.inSaveState = false;
            }, 1000);
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/status/systemStartDate', null, null);
        result = result.startDate;
        if (result == null) {
            result = new Date();
        }
        joolaio.systemStartDate = new Date(result);
        joolaio.systemStartDate.setUTCHours(0, 0, 0, 0);
        joolaio.systemStartDate.setDate(joolaio.systemStartDate.getDate() + 1);
        setTimeout(function () {
            joolaio.inSaveState = false;
        }, 1000);
    }

    return result;
};

joolaio.objects.Query.prototype.SystemEndDate = function (sender, options, callback) {
    var result;
    if (joolaio.systemEndDate != null && typeof callback !== 'function')
        return joolaio.systemEndDate;

    joolaio.inSaveState = true;
    if (typeof callback == 'function') {
        joolaio.dataaccess.fetch(this, '/status/systemEndDate', null, function (sender, data, error) {
            result = data.endDate;
            if (result == null) {
                result = new Date();
            }
            joolaio.systemEndDate = new Date(result);

            setTimeout(function () {
                joolaio.inSaveState = false;
            }, 1000);
            callback(sender, result);
        });
    }
    else {
        result = joolaio.dataaccess.fetch(this, '/status/systemEndDate', null, null);
        result = result.endDate;
        if (result == null) {
            result = new Date();
        }
        joolaio.systemEndDate = new Date(result);

        setTimeout(function () {
            joolaio.inSaveState = false;
        }, 1000);
    }

    return result;
};

joolaio.loaded.push('joolaio.objects.Query');
joolaio.debug.log('INFO', 'joolaio.objects.Query', 6, 'JS source loaded');
