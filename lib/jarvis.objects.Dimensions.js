jarvis.provide('jarvis.objects.Dimensions');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.objects');

jarvis.objects.Dimensions = [];
/*
 jarvis.objects.Dimensions = function (options) {
 var start = new Date().getMilliseconds();

 var _this = this;

 var executionTime = new Date().getMilliseconds() - start;
 jarvis.debug.log('INFO', 'jarvis.objects.Dimensions', 5, '...Constructor (' + executionTime + 'ms)');
 };*/

jarvis.objects.Dimensions.List = function (sender, options, callback) {
    var result;

    if (jarvis.objects.Dimensions.length > 0 && typeof callback !== 'function')
        return jarvis.objects.Dimensions;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/dimensions.list', {}, function (sender, data, error) {
            result = data.dimensions;
            jarvis.objects.Dimensions.splice(0, jarvis.objects.Dimensions.length);
            $(result).each(function (index, item) {
                jarvis.objects.Dimensions.push(item);
                //jarvis.dataaccess.dimensions.push(item);
            });

            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/dimensions.list', null, null);
        var data = result.dimensions;
        jarvis.objects.Dimensions.splice(0, jarvis.objects.Dimensions.length);
        $(data).each(function (index, item) {
            jarvis.objects.Dimensions.push(item);
            //jarvis.dataaccess.dimensions.push(item);
        });
    }

    return result;
};

jarvis.objects.Dimensions.Get = function (sender, options, callback, force) {
    var result;

    if (jarvis.objects.Dimensions.length > 0 && typeof callback !== 'function' && !force) {
        result = _.find(jarvis.objects.Dimensions, function (item) {
            return item.id == options.id
        });

        return result;
    }

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/dimensions.get', {id: options.id}, function (sender, data, error) {
            result = data.dimension;
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/dimensions.get', {id: options.id}, null);
        result = result.dimension;
    }

    return result;
};

jarvis.objects.Dimensions.Set = function (sender, options, callback) {
    var result = null;


    if (typeof callback == 'function')
        callback(result);
};

jarvis.objects.Dimensions.Categories_List = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Dimensions.svc/Categories_List', {}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/Dimensions.svc/Categories_List', null, null);

    return result;
};


jarvis.loaded.push('jarvis.objects.Dimensions');
jarvis.debug.log('INFO', 'jarvis.objects.Dimensions', 6, 'JS source loaded');
