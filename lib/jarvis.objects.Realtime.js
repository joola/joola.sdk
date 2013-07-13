jarvis.provide('jarvis.objects.Realtime');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.objects');

jarvis.objects.Realtime = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;

    var executionTime = new Date().getMilliseconds() - start;
    //jarvis.debug.log('INFO', 'jarvis.objects.Realtime', 5, '...Constructor (' + executionTime + 'ms)');
};

jarvis.objects.Realtime.prototype.Start= function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Realtime.svc/Start', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/Realtime.svc/Start', null, null);

    return result;
};

jarvis.objects.Realtime.prototype.PurgeAll = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Realtime.svc/Stop', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/Realtime.svc/Stop', null, null);

    return result;
};

jarvis.objects.Realtime.prototype.State= function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Realtime.svc/State', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/Realtime.svc/State', null, null);

    return result;
};


jarvis.loaded.push('jarvis.objects.Realtime');
jarvis.debug.log('INFO', 'jarvis.objects.Realtime', 6, 'JS source loaded');
