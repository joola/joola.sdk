jarvis.provide('jarvis.objects.Dashboards');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.objects');

jarvis.objects.Dashboards = [];


/*function (options) {
 var start = new Date().getMilliseconds();

 var _this = this;

 var executionTime = new Date().getMilliseconds() - start;
 jarvis.debug.log('INFO', 'jarvis.objects.Dashboards', 5, '...Constructor (' + executionTime + 'ms)');
 };
 */


jarvis.objects.Dashboards.List = function (sender, options, callback) {
    var result;

    if (jarvis.objects.Dashboards.length > 0 && typeof callback !== 'function')
        return jarvis.objects.Dashboards;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/dashboards.list', null, function (sender, data, error) {
            result = data.dashboards;
            jarvis.objects.Dashboards.splice(0, jarvis.objects.Dashboards.length);
            $(result).each(function (index, item) {
                jarvis.objects.Dashboards.push(item);
            });
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/dashboards.list', null, null);
        var data = result.dashboards;
        jarvis.objects.Dashboards.splice(0, jarvis.objects.Dashboards.length);
        $(data).each(function (index, item) {
            jarvis.objects.Dashboards.push(item);
        });
    }

    return result;
};

jarvis.objects.Dashboards.Get = function (sender, options, callback, force) {
    var result;

    if (jarvis.objects.Dashboards.length > 0 && typeof callback !== 'function' && !force)
        return _.find(jarvis.objects.Dashboards, function (item) {
            return item.id == options.id
        });

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/dashboards.get', {id: options.id}, function (sender, data, error) {
            result = data.dashboard;
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, 'dashboards.get', {id: options.id}, null);
        result = result.dashboard;
    }

    return result;
};


jarvis.loaded.push('jarvis.objects.Dashboards');
jarvis.debug.log('INFO', 'jarvis.objects.Dashboards', 6, 'JS source loaded');
