jarvis.provide('jarvis.objects.RealtimePanels');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.objects');

jarvis.objects.RealtimePanels = [];

jarvis.objects.RealtimePanels.List = function (sender, options, callback) {
    var result;

    if (jarvis.objects.RealtimePanels.length > 0 && typeof callback !== 'function')
        return jarvis.objects.RealtimePanels;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/RealtimePanels.svc/List', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            $(result).each(function (index, item) {
                jarvis.objects.RealtimePanels.push(item);
                jarvis.dataaccess.realtimepanels.push(item);
            });
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/RealtimePanels.svc/List', null, null);
        var data = $.parseJSON(result.data);
        $(data).each(function (index, item) {
            jarvis.objects.RealtimePanels.push(item);
            jarvis.dataaccess.realtimepanels.push(item);
        });
    }

    return result;
};

jarvis.objects.RealtimePanels.Get = function (sender, options, callback) {
    var result;

    if (jarvis.objects.RealtimePanels.length > 0 && typeof callback !== 'function')
        return _.find(jarvis.objects.RealtimePanels, function (item) {
            //console.log(item, options.id);
            return item.ID == options.id
        });


    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/RealtimePanels.svc/Get', {id:options.id}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else
        result = jarvis.dataaccess.fetch(this, '/engine/RealtimePanels.svc/Get', {id:options.id}, null);

    return result;
};

jarvis.loaded.push('jarvis.objects.RealtimePanels');
jarvis.debug.log('INFO', 'jarvis.objects.RealtimePanels', 6, 'JS source loaded');
