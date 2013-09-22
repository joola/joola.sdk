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

joolaio.provide('joolaio.objects.Dashboards');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

joolaio.require('joolaio.objects');

joolaio.objects.Dashboards = [];


/*function (options) {
 var start = new Date().getMilliseconds();

 var _this = this;

 var executionTime = new Date().getMilliseconds() - start;
 joolaio.debug.log('INFO', 'joolaio.objects.Dashboards', 5, '...Constructor (' + executionTime + 'ms)');
 };
 */


joolaio.objects.Dashboards.List = function (sender, options, callback) {
    var result;

    if (joolaio.objects.Dashboards.length > 0 && typeof callback !== 'function')
        return joolaio.objects.Dashboards;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/dashboards.list', null, function (sender, data, error) {
            result = data.dashboards;
            joolaio.objects.Dashboards.splice(0, joolaio.objects.Dashboards.length);
            $(result).each(function (index, item) {
                joolaio.objects.Dashboards.push(item);
            });
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/dashboards.list', null, null);
        var data = result.dashboards;
        joolaio.objects.Dashboards.splice(0, joolaio.objects.Dashboards.length);
        $(data).each(function (index, item) {
            joolaio.objects.Dashboards.push(item);
        });
    }

    return result;
};

joolaio.objects.Dashboards.Get = function (sender, options, callback, force) {
    var result;

    if (joolaio.objects.Dashboards.length > 0 && typeof callback !== 'function' && !force)
        return _.find(joolaio.objects.Dashboards, function (item) {
            return item.id == options.id
        });

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/dashboards.get', {id: options.id}, function (sender, data, error) {
            result = data.dashboard;
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, 'dashboards.get', {id: options.id}, null);
        result = result.dashboard;
    }

    return result;
};


joolaio.loaded.push('joolaio.objects.Dashboards');
joolaio.debug.log('INFO', 'joolaio.objects.Dashboards', 6, 'JS source loaded');
