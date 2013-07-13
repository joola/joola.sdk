jarvis.provide('jarvis.objects.Query');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.objects');

jarvis.objects.Query = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;

    var executionTime = new Date().getMilliseconds() - start;
    //jarvis.debug.log('INFO', 'jarvis.objects.Cache', 5, '...Constructor (' + executionTime + 'ms)');
};

jarvis.objects.Query.prototype.SystemStartDate = function (sender, options, callback) {
    var result;
    if (jarvis.systemStartDate != null && typeof callback !== 'function')
        return jarvis.systemStartDate;

    jarvis.inSaveState = true;
    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Query.svc/SystemStartDate', null, function (sender, data, error) {
            result = data.data;
            result = new Date(result);
            //console.log(result);
            jarvis.systemStartDate = new Date(result);

            setTimeout(function () {
                jarvis.inSaveState = false;
            }, 1000);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/Query.svc/SystemStartDate', null, null);
        result = result.data;
        result = new Date(result);

        jarvis.systemStartDate = new Date(result);

        setTimeout(function () {
            jarvis.inSaveState = false;
        }, 1000);
    }

    return result;
};

jarvis.objects.Query.prototype.SystemEndDate = function (sender, options, callback) {
    var result;
    if (jarvis.systemEndDate != null && typeof callback !== 'function')
        return jarvis.systemEndDate;

    jarvis.inSaveState = true;
    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Query.svc/SystemEndDate', null, function (sender, data, error) {
            result = data.data;
            result = new Date(result);

            jarvis.systemEndDate = new Date(result);

            setTimeout(function () {
                jarvis.inSaveState = false;
            }, 1000);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/Query.svc/SystemEndDate', null, null);
        result = result.data;
        result = new Date(result);

        jarvis.systemEndDate = new Date(result);

        setTimeout(function () {
            jarvis.inSaveState = false;
        }, 1000);
    }

    return result;
};

jarvis.loaded.push('jarvis.objects.Query');
jarvis.debug.log('INFO', 'jarvis.objects.Query', 6, 'JS source loaded');
