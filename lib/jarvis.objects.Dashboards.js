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
        jarvis.dataaccess.fetch(this, '/engine/Dashboards.svc/List', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            jarvis.objects.Dashboards.splice(0,jarvis.objects.Dashboards.length);
            $(result).each(function (index, item) {
                jarvis.objects.Dashboards.push(item);
                //jarvis.dataaccess.dashboards.push(item);
            });
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/Dashboards.svc/List', null, null);
        var data = $.parseJSON(result.data);
        jarvis.objects.Dashboards.splice(0,jarvis.objects.Dashboards.length);
        $(data).each(function (index, item) {
            jarvis.objects.Dashboards.push(item);
            //jarvis.dataaccess.dashboards.push(item);
        });
    }

    return result;
};

jarvis.objects.Dashboards.Get = function (sender, options, callback, force) {
    var result;

    if (jarvis.objects.Dashboards.length > 0 && typeof callback !== 'function' && !force)
        return _.find(jarvis.objects.Dashboards, function (item) {
            //console.log(item, options.id);
            return item.ID == options.id
        });

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Dashboards.svc/Get', {id:options.id}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/Dashboards.svc/Get', {id:options.id}, null);

    return result;
};



jarvis.loaded.push('jarvis.objects.Dashboards');
jarvis.debug.log('INFO', 'jarvis.objects.Dashboards', 6, 'JS source loaded');
