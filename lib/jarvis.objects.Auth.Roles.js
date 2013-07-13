jarvis.provide('jarvis.objects.Auth.Roles');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.objects');

jarvis.objects.Auth.Roles = function (options) {
    var start = new Date().getMilliseconds();

    var _this = this;

    var executionTime = new Date().getMilliseconds() - start;
    //jarvis.debug.log('INFO', 'jarvis.objects.Auth.Roles', 5, '...Constructor (' + executionTime + 'ms)');
};

jarvis.objects.Auth.Roles.prototype.List= function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Auth.svc/ListRoles', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else{
        result = jarvis.dataaccess.fetch(this, '/engine/Auth.svc/ListRoles', null, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

jarvis.objects.Auth.Roles.prototype.Update = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Auth.svc/UpdateRole', {ROLE_ID:options.ROLE_ID, ROLE_Name:options.ROLE_Name, ROLE_Filter:options.ROLE_Filter}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/Auth.svc/UpdateRole', {ROLE_ID:options.ROLE_ID, ROLE_Name:options.ROLE_Name, ROLE_Filter:options.ROLE_Filter}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

jarvis.objects.Auth.Roles.prototype.Delete = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Auth.svc/DeleteRole', {ROLE_ID:options.ROLE_ID}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/Auth.svc/DeleteRole', {ROLE_ID:options.ROLE_ID}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

jarvis.objects.Auth.Roles.prototype.AddPermission = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Auth.svc/AddRolePermission', {ROLE_ID:options.ROLE_ID, PERMISSION_ID:options.PERMISSION_ID}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/Auth.svc/AddRolePermission', {ROLE_ID:options.ROLE_ID, PERMISSION_ID:options.PERMISSION_ID}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

jarvis.objects.Auth.Roles.prototype.DeletePermission = function (sender, options, callback) {
    var result;

    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Auth.svc/DeleteRolePermission', {ROLE_ID:options.ROLE_ID, PERMISSION_ID:options.PERMISSION_ID}, function (sender, data, error) {
            result = $.parseJSON(data.data);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/Auth.svc/DeleteRolePermission', {ROLE_ID:options.ROLE_ID, PERMISSION_ID:options.PERMISSION_ID}, null);
        result = $.parseJSON(result.data);
    }

    return result;
};

jarvis.loaded.push('jarvis.objects.Auth.Roles');
jarvis.debug.log('INFO', 'jarvis.objects.Auth.Roles', 6, 'JS source loaded');
