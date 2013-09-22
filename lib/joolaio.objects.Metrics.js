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

joolaio.provide('joolaio.objects.Metrics');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

joolaio.require('joolaio.objects');

/*joolaio.objects.Metrics = function (options) {
 var start = new Date().getMilliseconds();

 var _this = this;

 var executionTime = new Date().getMilliseconds() - start;
 joolaio.debug.log('INFO', 'joolaio.objects.Metrics', 5, '...Constructor (' + executionTime + 'ms)');
 };
 */

joolaio.objects.Metrics = [];

joolaio.objects.Metrics.List = function (sender, options, callback) {
    var result;

    if (joolaio.objects.Metrics.length > 0 && typeof callback !== 'function')
        return joolaio.objects.Metrics;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/metrics.list', {}, function (sender, data, error) {
            result = data.metrics;
            joolaio.objects.Metrics.splice(0, joolaio.objects.Metrics.length);
            $(result).each(function (index, m) {

                switch (m.type) {
                    case 'int':
                        if (m.suffix == 'seconds') {
                            m.formatter = function (value) {
                                return joolaio.string.intToTime(parseInt(value));
                            };
                        }
                        else {
                            m.formatter = function (value) {
                                return joolaio.string.formatNumber(parseInt(value), 0, true);
                            };
                        }
                        break;
                    case 'float':
                        m.formatter = function (value) {
                            return joolaio.string.formatNumber(parseFloat(value), 2, true);
                        };
                        break;
                    default:
                        break;
                }
                joolaio.objects.Metrics.push(m);
            });
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/metrics.list', null, null);
        var data = result.metrics;
        joolaio.objects.Metrics.splice(0, joolaio.objects.Metrics.length);
        $(data).each(function (index, m) {

            switch (m.type) {
                case 'int':
                    if (m.suffix == 'seconds') {
                        m.formatter = function (value) {
                            return joolaio.string.intToTime(parseInt(value));
                        };
                    }
                    else {
                        m.formatter = function (value) {
                            return joolaio.string.formatNumber(parseInt(value), 0, true);
                        };
                    }
                    break;
                case 'float':
                    m.formatter = function (value) {
                        return joolaio.string.formatNumber(parseFloat(value), 2, true);
                    };
                    break;
                default:
                    break;
            }
            joolaio.objects.Metrics.push(m);
        });
    }

    return result;
};

joolaio.objects.Metrics.Get = function (sender, options, callback, force) {
    var result;

    if (joolaio.objects.Metrics.length > 0 && typeof callback !== 'function' && !force) {
        result = _.find(joolaio.objects.Metrics, function (item) {
            return item.id == options.id
        });

        return result;
    }

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/metrics.get', {id: options.id}, function (sender, data, error) {
            result = data.metric;
            callback(sender, result);
        });
    else {
        result = joolaio.dataaccess.fetch(this, '/metrics.get', {id: options.id}, null);
        result = result.metric;
    }

    return result;
};

joolaio.objects.Metrics.Set = function (sender, options, callback) {
    var result = null;


    if (typeof callback == 'function')
        callback(result);
};

joolaio.objects.Metrics.AddGroup = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Metrics.svc/AddGroup', {TabID: options.tabID, name: options.name}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = joolaio.dataaccess.fetch(this, '/engine/Metrics.svc/AddGroup', {TabID: options.tabID, name: options.name}, null);

    return result;
};

joolaio.objects.Metrics.DeleteGroup = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Metrics.svc/DeleteGroup', {id: options.id}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = joolaio.dataaccess.fetch(this, '/engine/Metrics.svc/DeleteGroup', {id: options.id}, null);

    return result;
};

joolaio.objects.Metrics.UpdateGroup = function (sender, id, prop, val, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Metrics.svc/UpdateGroup', {id: id, property: prop, value: val}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = joolaio.dataaccess.fetch(this, '/engine/Metrics.svc/UpdateGroup', {id: id, property: prop, value: val}, null);

    return result;
};

joolaio.objects.Metrics.UpdateGroupMetric = function (sender, id, ms_id, ordinal, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Metrics.svc/UpdateGroupMetric', {id: id, metricID: ms_id, ordinal: ordinal}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = joolaio.dataaccess.fetch(this, '/engine/Metrics.svc/UpdateGroupMetric', {id: id, metricID: ms_id, ordinal: ordinal}, null);

    return result;
};

joolaio.objects.Metrics.DeleteGroupMetric = function (sender, id, ms_id, ordinal, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Metrics.svc/DeleteGroupMetric', {id: id, metricID: ms_id}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = joolaio.dataaccess.fetch(this, '/engine/Metrics.svc/DeleteGroupMetric', {id: id, metricID: ms_id}, null);

    return result;
};

joolaio.objects.Metrics.Categories_List = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        joolaio.dataaccess.fetch(this, '/engine/Metrics.svc/Categories_List', {}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = joolaio.dataaccess.fetch(this, '/engine/Metrics.svc/Categories_List', null, null);

    return result;
};


joolaio.loaded.push('joolaio.objects.Metrics');
joolaio.debug.log('INFO', 'joolaio.objects.Metrics', 6, 'JS source loaded');
