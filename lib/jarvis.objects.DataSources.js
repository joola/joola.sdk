jarvis.provide('jarvis.objects.DataSources');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.objects');

jarvis.objects.DataSources = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;

    var executionTime = new Date().getMilliseconds() - start;
    //jarvis.debug.log('INFO', 'jarvis.objects.DataSources', 5, '...Constructor (' + executionTime + 'ms)');
};

jarvis.objects.DataSources.prototype.List = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/DataSources.svc/List', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/DataSources.svc/List', null, null);

    return result;
};

jarvis.objects.DataSources.prototype.Get = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/DataSources.svc/Get', {id: options.id}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/DataSources.svc/Get', {id: options.id}, null);

    return result;
};

jarvis.objects.DataSources.prototype.Set = function (sender, options, callback) {
    var result = null;


    if (typeof callback == 'function')
        callback(result);
};


jarvis.objects.DataSources.prototype.State = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/DataSources.svc/State', {id: options.id}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/DataSources.svc/State', {id: options.id}, null);

    return result;
};


jarvis.loaded.push('jarvis.objects.DataSources');
jarvis.debug.log('INFO', 'jarvis.objects.DataSources', 6, 'JS source loaded');
