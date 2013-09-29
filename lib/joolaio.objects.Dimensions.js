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

joolaio.provide('joolaio.objects.Dimensions');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

joolaio.require('joolaio.objects');

joolaio.objects.Dimensions = [];
/*
 joolaio.objects.Dimensions = function (options) {
 var start = new Date().getMilliseconds();

 var _this = this;

 var executionTime = new Date().getMilliseconds() - start;
 joolaio.debug.log('INFO', 'joolaio.objects.Dimensions', 5, '...Constructor (' + executionTime + 'ms)');
 };*/

joolaio.objects.Dimensions.List = function (sender, options, callback) {
    var result;

    if (joolaio.objects.Dimensions.length > 0 && typeof callback !== 'function')
        return joolaio.objects.Dimensions;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/dimensions.list', {}, function (sender, data, error) {
            result = data.dimensions;
            joolaio.objects.Dimensions.splice(0, joolaio.objects.Dimensions.length);
            $(result).each(function (index, item) {
                joolaio.objects.Dimensions.push(item);
                //joolaio.dataaccess.dimensions.push(item);
            });

            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/dimensions.list', null, null);
        var data = result.dimensions;
        joolaio.objects.Dimensions.splice(0, joolaio.objects.Dimensions.length);
        $(data).each(function (index, item) {
            joolaio.objects.Dimensions.push(item);
            //joolaio.dataaccess.dimensions.push(item);
        });
    }

    return result;
};

joolaio.objects.Dimensions.Get = function (sender, options, callback, force) {
    var result;

    if (joolaio.objects.Dimensions.length > 0 && typeof callback !== 'function' && !force) {
        result = _.find(joolaio.objects.Dimensions, function (item) {
            return item.id == options.id
        });

        return result;
    }

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/dimensions.get', {id: options.id}, function (sender, data, error) {
            result = data.dimension;
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/dimensions.get', {id: options.id}, null);
        result = result.dimension;
    }

    return result;
};

joolaio.objects.Dimensions.Set = function (sender, options, callback) {
    var result = null;


    if (typeof callback == 'function')
        callback(result);
};

joolaio.objects.Dimensions.Categories_List = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Dimensions.svc/Categories_List', {}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = joolaio.dataaccess.fetch(this, '/engine/Dimensions.svc/Categories_List', null, null);

    return result;
};


joolaio.loaded.push('joolaio.objects.Dimensions');
joolaio.debug.log('INFO', 'joolaio.objects.Dimensions', 6, 'JS source loaded');
