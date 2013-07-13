jarvis.provide('jarvis.objects.Auth');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.objects');

jarvis.objects.Auth = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;

    var executionTime = new Date().getMilliseconds() - start;
    //jarvis.debug.log('INFO', 'jarvis.objects.Auth', 5, '...Constructor (' + executionTime + 'ms)');
};

jarvis.objects.Auth.prototype.CheckSession = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Auth.svc/CheckSession', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/Auth.svc/CheckSession', null, null);

    return result;
};

jarvis.objects.Auth.prototype.GetToken = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Auth.svc/GetToken', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/Auth.svc/GetToken', null, null);

    return result;
};

jarvis.objects.Auth.prototype.GetUser = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/auth.getUser', null, function (sender, data, error) {
            result = data.user;
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/auth.getUser', null, null);
        result = result.user;
    }

    return result;
};

jarvis.loaded.push('jarvis.objects.Auth');
jarvis.debug.log('INFO', 'jarvis.objects.Auth', 6, 'JS source loaded');
