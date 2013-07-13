jarvis.provide('jarvis.objects.Auth.Permissions');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.objects');

jarvis.objects.Auth.Permissions = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;

    var executionTime = new Date().getMilliseconds() - start;
    //jarvis.debug.log('INFO', 'jarvis.objects.Auth.Permissions', 5, '...Constructor (' + executionTime + 'ms)');
};

jarvis.objects.Auth.Permissions.prototype.List= function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Auth.svc/ListPermissions', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else{
        result = jarvis.dataaccess.fetch(this, '/engine/Auth.svc/ListPermissions', null, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

jarvis.loaded.push('jarvis.objects.Auth.Permissions');
jarvis.debug.log('INFO', 'jarvis.objects.Auth.Permissions', 6, 'JS source loaded');
