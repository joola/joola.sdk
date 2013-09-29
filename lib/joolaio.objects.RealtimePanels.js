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

joolaio.provide('joolaio.objects.RealtimePanels');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

joolaio.require('joolaio.objects');

joolaio.objects.RealtimePanels = [];

joolaio.objects.RealtimePanels.List = function (sender, options, callback) {
    var result;

    if (joolaio.objects.RealtimePanels.length > 0 && typeof callback !== 'function')
        return joolaio.objects.RealtimePanels;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/RealtimePanels.svc/List', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            $(result).each(function (index, item) {
                joolaio.objects.RealtimePanels.push(item);
                joolaio.dataaccess.realtimepanels.push(item);
            });
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/engine/RealtimePanels.svc/List', null, null);
        var data = $.parseJSON(result.data);
        $(data).each(function (index, item) {
            joolaio.objects.RealtimePanels.push(item);
            joolaio.dataaccess.realtimepanels.push(item);
        });
    }

    return result;
};

joolaio.objects.RealtimePanels.Get = function (sender, options, callback) {
    var result;

    if (joolaio.objects.RealtimePanels.length > 0 && typeof callback !== 'function')
        return _.find(joolaio.objects.RealtimePanels, function (item) {
            //console.log(item, options.id);
            return item.ID == options.id
        });


    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/RealtimePanels.svc/Get', {id:options.id}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = joolaio.dataaccess.fetch(this, '/engine/RealtimePanels.svc/Get', {id:options.id}, null);

    return result;
};

joolaio.loaded.push('joolaio.objects.RealtimePanels');
joolaio.debug.log('INFO', 'joolaio.objects.RealtimePanels', 6, 'JS source loaded');
