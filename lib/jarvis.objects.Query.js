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
        jarvis.dataaccess.fetch(this, '/status.systemStartDate', null, function (sender, data, error) {
            result = data.startDate;
            if (result == null) {
                result = new Date();
            }
            jarvis.systemStartDate = new Date(result);
            jarvis.systemStartDate.setUTCHours(0, 0, 0, 0);
            jarvis.systemStartDate.setDate(jarvis.systemStartDate.getDate() + 1);
            setTimeout(function () {
                jarvis.inSaveState = false;
            }, 1000);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/status.systemStartDate', null, null);
        result = result.startDate;
        if (result == null) {
            result = new Date();
        }
        jarvis.systemStartDate = new Date(result);
        jarvis.systemStartDate.setUTCHours(0, 0, 0, 0);
        jarvis.systemStartDate.setDate(jarvis.systemStartDate.getDate() + 1);
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
    if (typeof callback == 'function') {
        jarvis.dataaccess.fetch(this, '/status.systemEndDate', null, function (sender, data, error) {
            result = data.endDate;
            if (result == null) {
                result = new Date();
            }
            jarvis.systemEndDate = new Date(result);

            setTimeout(function () {
                jarvis.inSaveState = false;
            }, 1000);
            callback(sender, result);
        });
    }
    else {
        result = jarvis.dataaccess.fetch(this, '/status.systemEndDate', null, null);
        result = result.endDate;
        if (result == null) {
            result = new Date();
        }
        jarvis.systemEndDate = new Date(result);

        setTimeout(function () {
            jarvis.inSaveState = false;
        }, 1000);
    }

    return result;
};

jarvis.loaded.push('jarvis.objects.Query');
jarvis.debug.log('INFO', 'jarvis.objects.Query', 6, 'JS source loaded');
