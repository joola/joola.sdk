jarvis.provide('jarvis.objects.Metrics');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.objects');

/*jarvis.objects.Metrics = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;

    var executionTime = new Date().getMilliseconds() - start;
    jarvis.debug.log('INFO', 'jarvis.objects.Metrics', 5, '...Constructor (' + executionTime + 'ms)');
};
*/

jarvis.objects.Metrics = [];

jarvis.objects.Metrics.List = function (sender, options, callback) {
    var result;

    if (jarvis.objects.Metrics.length > 0 && typeof callback !== 'function')
        return jarvis.objects.Metrics;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Metrics.svc/List', {}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            jarvis.objects.Metrics.splice(0, jarvis.objects.Metrics.length);
            $(result).each(function (index, item) {
                jarvis.objects.Metrics.push(item);
                jarvis.dataaccess.metrics.push(item);
            });
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/Metrics.svc/List', null, null);
        var data = $.parseJSON(result.data);
        jarvis.objects.Metrics.splice(0, jarvis.objects.Metrics.length);
        $(data).each(function (index, item) {
            jarvis.objects.Metrics.push(item);
            jarvis.dataaccess.metrics.push(item);
        });
    }

    return result;
};

jarvis.objects.Metrics.Get = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Metrics.svc/Get', {id:options.id}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/Metrics.svc/Get', {id:options.id}, null);

    return result;
};

jarvis.objects.Metrics.Set = function (sender, options, callback) {
    var result = null;


    if (typeof callback == 'function')
        callback(result);
};

jarvis.objects.Metrics.AddGroup = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Metrics.svc/AddGroup', {TabID:options.tabID, name: options.name}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/Metrics.svc/AddGroup', {TabID:options.tabID, name: options.name}, null);

    return result;
};

jarvis.objects.Metrics.DeleteGroup = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Metrics.svc/DeleteGroup', {id:options.id}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/Metrics.svc/DeleteGroup', {id:options.id}, null);

    return result;
};

jarvis.objects.Metrics.UpdateGroup = function (sender, id, prop, val, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Metrics.svc/UpdateGroup', {id:id, property:prop, value:val}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/Metrics.svc/UpdateGroup', {id:id, property:prop, value:val}, null);

    return result;
};

jarvis.objects.Metrics.UpdateGroupMetric = function (sender, id, ms_id, ordinal, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Metrics.svc/UpdateGroupMetric', {id:id, metricID:ms_id, ordinal:ordinal}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/Metrics.svc/UpdateGroupMetric',  {id:id, metricID:ms_id, ordinal:ordinal}, null);

    return result;
};

jarvis.objects.Metrics.DeleteGroupMetric = function (sender, id, ms_id, ordinal, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Metrics.svc/DeleteGroupMetric', {id:id, metricID:ms_id}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/Metrics.svc/DeleteGroupMetric',  {id:id, metricID:ms_id}, null);

    return result;
};

jarvis.objects.Metrics.Categories_List = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Metrics.svc/Categories_List', {}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/Metrics.svc/Categories_List', null, null);

    return result;
};


jarvis.loaded.push('jarvis.objects.Metrics');
jarvis.debug.log('INFO', 'jarvis.objects.Metrics', 6, 'JS source loaded');
