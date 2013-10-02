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

joolaio.provide('joolaio.objects.Reports');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

joolaio.require('joolaio.objects');


/*
 joolaio.objects.Reports = function (options) {
 var start = new Date().getMilliseconds();

 var _this = this;

 var executionTime = new Date().getMilliseconds() - start;
 joolaio.debug.log('INFO', 'joolaio.objects.Reports', 5, '...Constructor (' + executionTime + 'ms)');
 };
 */

joolaio.objects.Reports = [];

joolaio.objects.Reports.List = function (sender, options, callback, force) {
    var result;

    if (joolaio.objects.Reports.length > 0 && typeof callback !== 'function' && !force)
        return joolaio.objects.Reports;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/reports/list', null, function (sender, data, error) {
            result = data.reports;
            joolaio.objects.Reports.splice(0, joolaio.objects.Reports.length);

            $(result).each(function (index, item) {

                joolaio.objects.Reports.push(item);
                //joolaio.dataaccess.reports.push(item);
            });
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/reports/list', null, null);
        var data = result.reports;
        joolaio.objects.Reports.splice(0, joolaio.objects.Reports.length);
        $(data).each(function (index, item) {

            joolaio.objects.Reports.push(item);
            //joolaio.dataaccess.reports.push(item);
        });
        result = joolaio.objects.Reports;
    }
    return result;
};

joolaio.objects.Reports.Get = function (sender, options, callback, force) {
    var result;

    if (joolaio.objects.Reports.length > 0 && typeof callback !== 'function' && !force) {
        result = _.find(joolaio.objects.Reports, function (item) {
            return item.id == options.id
        });

        return result;
    }

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/reports/get', {id: options.id}, function (sender, data, error) {
            result = data.report
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/reports/get', {id: options.id}, null);
        var data = result.report;
                for (i = 0; i < joolaio.objects.Reports.length; i++) {
            if (joolaio.objects.Reports[i].id == data.id) {
                joolaio.objects.Reports[i] = data;
            }
        }
        result = data;
    }

    return result;
};

joolaio.loaded.push('joolaio.objects.Reports');
joolaio.debug.log('INFO', 'joolaio.objects.Reports', 6, 'JS source loaded');
