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

joolaio.provide('joolaio.objects.DataTables');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

joolaio.require('joolaio.objects');

joolaio.objects.DataTables = [];

joolaio.objects.DataTables.List = function (sender, options, callback) {
    var result;

    if (joolaio.objects.DataTables.length > 0 && typeof callback !== 'function')
        return joolaio.objects.DataTables;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/DataTables.svc/List', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            $(result).each(function (index, item) {
                joolaio.objects.DataTables.push(item);
            });
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/DataTables.svc/List', null, null);
        var data = $.parseJSON(result.data);
        $(data).each(function (index, item) {
            joolaio.objects.DataTables.push(item);
        });
    }

    return result;
};

joolaio.objects.DataTables.Get = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/DataTables.svc/Get', {DataSourceID: options.DataSourceID, Schema: options.Schema, TableName: options.TableName}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = joolaio.dataaccess.fetch(this, '/engine/DataTables.svc/Get', {DataSourceID: options.DataSourceID, Schema: options.Schema, TableName: options.TableName}, null);

    return result;
};

joolaio.objects.DataTables.GetByID = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/DataTables.svc/GetByID', {id: options.id}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = joolaio.dataaccess.fetch(this, '/engine/DataTables.svc/GetByID', {id: options.id}, null);

    return result;
};

joolaio.objects.DataTables.GetSourceTable = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/DataTables.svc/GetSourceTable', {DataSourceID: options.DataSourceID, Schema: options.Schema, TableName: options.TableName}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = joolaio.dataaccess.fetch(this, '/engine/DataTables.svc/GetSourceTable', {id: options.id}, null);

    return result;
};

joolaio.objects.DataTables.Set = function (sender, options, callback) {
    var result = null;


    if (typeof callback == 'function')
        callback(result);
};

joolaio.loaded.push('joolaio.objects.DataTables');
joolaio.debug.log('INFO', 'joolaio.objects.DataTables', 6, 'JS source loaded');
