jarvis.provide('jarvis.objects.Config');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.objects');

jarvis.objects.Config = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;

    var executionTime = new Date().getMilliseconds() - start;
    //jarvis.debug.log('INFO', 'jarvis.objects.Config', 5, '...Constructor (' + executionTime + 'ms)');
};


jarvis.objects.Config.prototype.Get = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Config.svc/GetEx', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/Config.svc/GetEx',null, null);

    return result;
};

jarvis.objects.Config.prototype.ExecuteFreeQuery = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Config.svc/ExecuteFreeQuery', {code:options.code, param1:options.param1}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        var _result = [];
        result = jarvis.dataaccess.fetch(this, '/engine/Config.svc/ExecuteFreeQuery', {code:options.code, param1:options.param1}, null);
        result = $.parseJSON(result);

        $(result).each(function (index, r) {
            var obj = new Object();
            $(r).each(function (i, col) {
                var key = col.Key;
                var value = col.Value;
                obj[key] = value;
            });
            _result.push(obj);
        });
    }

    return _result;
};

jarvis.loaded.push('jarvis.objects.Config');
jarvis.debug.log('INFO', 'jarvis.objects.Config', 6, 'JS source loaded');
