jarvis.provide('jarvis.objects.DataTables');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.objects');

jarvis.objects.DataTables = [];

jarvis.objects.DataTables.List = function (sender, options, callback) {
    var result;

    if (jarvis.objects.DataTables.length > 0 && typeof callback !== 'function')
        return jarvis.objects.DataTables;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/DataTables.svc/List', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            $(result).each(function (index, item) {
                jarvis.objects.DataTables.push(item);
            });
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/DataTables.svc/List', null, null);
        var data = $.parseJSON(result.data);
        $(data).each(function (index, item) {
            jarvis.objects.DataTables.push(item);
        });
    }

    return result;
};

jarvis.objects.DataTables.Get = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/DataTables.svc/Get', {DataSourceID: options.DataSourceID, Schema: options.Schema, TableName: options.TableName}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/DataTables.svc/Get', {DataSourceID: options.DataSourceID, Schema: options.Schema, TableName: options.TableName}, null);

    return result;
};

jarvis.objects.DataTables.GetByID = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/DataTables.svc/GetByID', {id: options.id}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/DataTables.svc/GetByID', {id: options.id}, null);

    return result;
};

jarvis.objects.DataTables.GetSourceTable = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/DataTables.svc/GetSourceTable', {DataSourceID: options.DataSourceID, Schema: options.Schema, TableName: options.TableName}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/DataTables.svc/GetSourceTable', {id: options.id}, null);

    return result;
};

jarvis.objects.DataTables.Set = function (sender, options, callback) {
    var result = null;


    if (typeof callback == 'function')
        callback(result);
};

jarvis.loaded.push('jarvis.objects.DataTables');
jarvis.debug.log('INFO', 'jarvis.objects.DataTables', 6, 'JS source loaded');
