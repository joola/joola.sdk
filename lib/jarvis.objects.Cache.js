jarvis.provide('jarvis.objects.Cache');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.objects');

jarvis.objects.Cache = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;

    var executionTime = new Date().getMilliseconds() - start;
    //jarvis.debug.log('INFO', 'jarvis.objects.Cache', 5, '...Constructor (' + executionTime + 'ms)');
};

jarvis.objects.Cache.prototype.PurgeInternal = function (sender, options, callback) {
    var result;
    jarvis.inSaveState = true;
    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Cache.svc/PurgeInternal', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            setTimeout(function () {
                jarvis.inSaveState = false;
            }, 5000);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/Cache.svc/PurgeInternal', null, null);
        setTimeout(function () {
            jarvis.inSaveState = false;
        }, 5000);
    }

    return result;
};

jarvis.objects.Cache.prototype.PurgeResults = function (sender, options, callback) {
    var result;
    jarvis.inSaveState = true;
    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Cache.svc/PurgeResults', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            setTimeout(function () {
                jarvis.inSaveState = false;
            }, 5000);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/Cache.svc/PurgeResults', null, null);
        setTimeout(function () {
            jarvis.inSaveState = false;
        }, 5000);
    }

    return result;
};

jarvis.objects.Cache.prototype.PurgeAll = function (sender, options, callback) {
    var result;
    jarvis.inSaveState = true;
    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Cache.svc/PurgeAll', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            setTimeout(function () {
                jarvis.inSaveState = false;
            }, 5000);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/Cache.svc/PurgeAll', null, null);
        setTimeout(function () {
            jarvis.inSaveState = false;
        }, 5000);
    }

    return result;
};

jarvis.objects.Cache.prototype.PurgeData = function (sender, options, callback) {
    var result;
    jarvis.inSaveState = true;
    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Cache.svc/PurgeData', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            setTimeout(function () {
                jarvis.inSaveState = false;
            }, 5000);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/Cache.svc/PurgeData', null, null);
        setTimeout(function () {
            jarvis.inSaveState = false;
        }, 5000);
    }

    return result;
};

jarvis.objects.Cache.prototype.TidyUp = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Cache.svc/TidyUp', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/Cache.svc/TidyUp', null, null);

    return result;
};

jarvis.objects.Cache.prototype.Build = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Cache.svc/Build', {Tablename:options.tablename, FromDate:options.fromdate, ToDate:options.todate, Resolution:options.resolution}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/Cache.svc/Build', {Tablename:options.tablename, FromDate:options.fromdate, ToDate:options.todate, Resolution:options.resolution, falseExecute:false, Realtime:false}, null);

    return result;
};


jarvis.objects.Cache.prototype.RecycleApp = function (sender, options, callback) {
    var result;
    jarvis.inSaveState = true;
    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Cache.svc/RecycleApp', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            setTimeout(function () {
                jarvis.inSaveState = false;
            }, 5000);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/Cache.svc/RecycleApp', null, null);
        setTimeout(function () {
            jarvis.inSaveState = false;
        }, 5000);
    }

    return result;
};


jarvis.loaded.push('jarvis.objects.Cache');
jarvis.debug.log('INFO', 'jarvis.objects.Cache', 6, 'JS source loaded');
