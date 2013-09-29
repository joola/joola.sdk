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

joolaio.provide('joolaio.objects.Config');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

joolaio.require('joolaio.objects');

joolaio.objects.Config = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;

    var executionTime = new Date().getMilliseconds() - start;
    //joolaio.debug.log('INFO', 'joolaio.objects.Config', 5, '...Constructor (' + executionTime + 'ms)');
};


joolaio.objects.Config.prototype.Get = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Config.svc/GetEx', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = joolaio.dataaccess.fetch(this, '/engine/Config.svc/GetEx',null, null);

    return result;
};

joolaio.objects.Config.prototype.ExecuteFreeQuery = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Config.svc/ExecuteFreeQuery', {code:options.code, param1:options.param1}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        var _result = [];
        result = joolaio.dataaccess.fetch(this, '/engine/Config.svc/ExecuteFreeQuery', {code:options.code, param1:options.param1}, null);
        result = $.parseJSON(result);

        $(result).each(function (index, r) {
            var obj = new Object();
            $(r).each(function (i, col) {
                var key = col.Key;
                var value = col.Value;
                obj[key] = value;
            });
            _result.push(obj);
        });
    }

    return _result;
};

joolaio.loaded.push('joolaio.objects.Config');
joolaio.debug.log('INFO', 'joolaio.objects.Config', 6, 'JS source loaded');
