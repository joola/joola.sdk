jarvis.provide('jarvis.objects.Auth.Organizations');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.objects');

jarvis.objects.Auth.Organizations = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;

    var executionTime = new Date().getMilliseconds() - start;
    //jarvis.debug.log('INFO', 'jarvis.objects.Auth.Organizations', 5, '...Constructor (' + executionTime + 'ms)');
};

jarvis.objects.Auth.Organizations.prototype.List = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Auth.svc/ListOrganizations', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/Auth.svc/ListOrganizations', null, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

jarvis.objects.Auth.Organizations.prototype.Update = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Auth.svc/UpdateOrganization', {ORG_ID:options.ORG_ID, ORG_Name:options.ORG_Name, ORG_Filter:options.ORG_Filter}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/Auth.svc/UpdateOrganization', {ORG_ID:options.ORG_ID, ORG_Name:options.ORG_Name, ORG_Filter:options.ORG_Filter}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

jarvis.objects.Auth.Organizations.prototype.Delete = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Auth.svc/DeleteOrganization', {ORG_ID:options.ORG_ID}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/Auth.svc/DeleteOrganization', {ORG_ID:options.ORG_ID}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

jarvis.loaded.push('jarvis.objects.Auth.Organizations');
jarvis.debug.log('INFO', 'jarvis.objects.Auth.Organizations', 6, 'JS source loaded');
