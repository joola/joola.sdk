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

joolaio.provide('joolaio.objects.State');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

joolaio.require('joolaio.objects');

joolaio.objects.State = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;

    var executionTime = new Date().getMilliseconds() - start;
    //joolaio.debug.log('INFO', 'joolaio.objects.Auth', 5, '...Constructor (' + executionTime + 'ms)');
};


joolaio.objects.State.prototype.getServerState = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/State.svc/getServerState', {}, function (sender, data, error) {
            try{
                //result = $.parseJSON(data.data);
                callback(sender, result);
            }
            catch(e)
            {
                callback(sender, null);
            }
        });
    else
        result = joolaio.dataaccess.fetch(this, '/engine/State.svc/getServerState', {}, null);

    return result;
};

joolaio.objects.State.prototype.SaveState = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/State.svc/SaveState', {id:options.id, state:options.state}, function (sender, data, error) {
            try{
            result = $.parseJSON(data.data);
            callback(sender, result);
            }
            catch(e)
            {
                callback(sender, null);
            }
        });
    else
        result = joolaio.dataaccess.fetch(this, '/engine/State.svc/SaveState', {id:options.id, state:options.state}, null);

    return result;
};

joolaio.objects.State.prototype.LoadState = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/State.svc/LoadState', {id:options.id}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = joolaio.dataaccess.fetch(this, '/engine/State.svc/LoadState', {id:options.id}, null);

    return result;
};

joolaio.objects.State.prototype.GetLog = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/State.svc/GetLog', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        },3);
    else
        result = joolaio.dataaccess.fetch(this, '/engine/State.svc/GetLog', null, null);

    return result;
};


joolaio.loaded.push('joolaio.objects.State');
joolaio.debug.log('INFO', 'joolaio.objects.State', 6, 'JS source loaded');
