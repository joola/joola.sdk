jarvis.provide('jarvis.objects.State');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.objects');

jarvis.objects.State = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;

    var executionTime = new Date().getMilliseconds() - start;
    //jarvis.debug.log('INFO', 'jarvis.objects.Auth', 5, '...Constructor (' + executionTime + 'ms)');
};


jarvis.objects.State.prototype.getServerState = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/State.svc/getServerState', {}, function (sender, data, error) {
            try{
                //result = $.parseJSON(data.data);
                callback(sender, result);
            }
            catch(e)
            {
                callback(sender, null);
            }
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/State.svc/getServerState', {}, null);

    return result;
};

jarvis.objects.State.prototype.SaveState = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/State.svc/SaveState', {id:options.id, state:options.state}, function (sender, data, error) {
            try{
            result = $.parseJSON(data.data);
            callback(sender, result);
            }
            catch(e)
            {
                callback(sender, null);
            }
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/State.svc/SaveState', {id:options.id, state:options.state}, null);

    return result;
};

jarvis.objects.State.prototype.LoadState = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/State.svc/LoadState', {id:options.id}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/State.svc/LoadState', {id:options.id}, null);

    return result;
};

jarvis.objects.State.prototype.GetLog = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/State.svc/GetLog', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        },3);
    else
        result = jarvis.dataaccess.fetch(this, '/engine/State.svc/GetLog', null, null);

    return result;
};


jarvis.loaded.push('jarvis.objects.State');
jarvis.debug.log('INFO', 'jarvis.objects.State', 6, 'JS source loaded');
