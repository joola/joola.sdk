jarvis.provide('jarvis.objects.Reports');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.objects');


/*
 jarvis.objects.Reports = function (options) {
 var start = new Date().getMilliseconds();

 var _this = this;

 var executionTime = new Date().getMilliseconds() - start;
 jarvis.debug.log('INFO', 'jarvis.objects.Reports', 5, '...Constructor (' + executionTime + 'ms)');
 };
 */

jarvis.objects.Reports = [];

jarvis.objects.Reports.List = function (sender, options, callback, force) {
    var result;

    if (jarvis.objects.Reports.length > 0 && typeof callback !== 'function' && !force)
        return jarvis.objects.Reports;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/reports.list', null, function (sender, data, error) {
            result = data.reports;
            jarvis.objects.Reports.splice(0, jarvis.objects.Reports.length);

            $(result).each(function (index, item) {

                jarvis.objects.Reports.push(item);
                //jarvis.dataaccess.reports.push(item);
            });
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/reports.list', null, null);
        var data = result.reports;
        jarvis.objects.Reports.splice(0, jarvis.objects.Reports.length);
        $(data).each(function (index, item) {

            jarvis.objects.Reports.push(item);
            //jarvis.dataaccess.reports.push(item);
        });
        result = jarvis.objects.Reports;
    }
    return result;
};

jarvis.objects.Reports.Get = function (sender, options, callback, force) {
    var result;

    if (jarvis.objects.Reports.length > 0 && typeof callback !== 'function' && !force) {
        result = _.find(jarvis.objects.Reports, function (item) {
            return item.id == options.id
        });

        return result;
    }

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/reports.get', {id: options.id}, function (sender, data, error) {
            result = data.report
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/reports.get', {id: options.id}, null);
        var data = result.report;
                for (i = 0; i < jarvis.objects.Reports.length; i++) {
            if (jarvis.objects.Reports[i].id == data.id) {
                jarvis.objects.Reports[i] = data;
            }
        }
        result = data;
    }

    return result;
};

jarvis.objects.Reports.Set = function (sender, id, prop, val, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Reports.svc/Set', {id: id, property: prop, value: val}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/Reports.svc/Set', {id: id, property: prop, value: val}, null);

    return result;
};

jarvis.objects.Reports.Delete = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Reports.svc/Delete', {id: options.id}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/Reports.svc/Delete', {id: options.id}, null);

    return result;
};

jarvis.objects.Reports.AddTab = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Reports.svc/AddTab', {reportID: options.reportID, name: options.name, type: options.type}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/Reports.svc/AddTab', {reportID: options.reportID, name: options.name, type: options.type}, null);

    return result;
};

jarvis.objects.Reports.UpdateTab = function (sender, id, prop, val, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Reports.svc/UpdateTab', {id: id, property: prop, value: val}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/Reports.svc/UpdateTab', {id: id, property: prop, value: val}, null);

    return result;
};

jarvis.objects.Reports.DeleteTab = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Reports.svc/DeleteTab', {id: options.id}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/Reports.svc/DeleteTab', {id: options.id}, null);

    return result;
};

jarvis.objects.Reports.UpdateTabDimension = function (sender, id, dimensionid, ordinal, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Reports.svc/UpdateTabDimension', {tabid: id, dimensionid: dimensionid, ordinal: ordinal}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/Reports.svc/UpdateTabDimension', {tabid: id, dimensionid: dimensionid, ordinal: ordinal}, null);

    return result;
};

jarvis.objects.Reports.DeleteTabDimension = function (sender, id, dimensionid, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Reports.svc/DeleteTabDimension', {tabid: id, dimensionid: dimensionid}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/Reports.svc/DeleteTabDimension', {tabid: id, dimensionid: dimensionid}, null);

    return result;
};

jarvis.objects.Reports.GetDefault = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Reports.svc/List', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            result = result[0];
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/Reports.svc/List', null, null);
        result = $.parseJSON(result.data);
        result = result[0];
    }


    return result;
};

jarvis.objects.Reports.GetCategories = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Reports.svc/GetCategories', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/Reports.svc/GetCategories', null, null);

    return result;
};

jarvis.loaded.push('jarvis.objects.Reports');
jarvis.debug.log('INFO', 'jarvis.objects.Reports', 6, 'JS source loaded');
