jarvis.provide('jarvis.objects.Update');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

jarvis.require('jarvis.objects');

jarvis.objects.Update = function (options) {
    var _this = this;
};

jarvis.objects.Update.prototype.CurrentVersion = function (sender, options, callback) {
    var result;
    jarvis.inSaveState = true;
    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Update.svc/CurrentVersion', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            setTimeout(function () {
                jarvis.inSaveState = false;
            }, 5000);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/Update.svc/CurrentVersion', null, null);
        setTimeout(function () {
            jarvis.inSaveState = false;
        }, 5000);
    }

    return result;
};

jarvis.objects.Update.prototype.CurrentChangeset = function (sender, options, callback) {
    var result;
    jarvis.inSaveState = true;
    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Update.svc/CurrentChangeset', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            setTimeout(function () {
                jarvis.inSaveState = false;
            }, 5000);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/Update.svc/CurrentChangeset', null, null);
        setTimeout(function () {
            jarvis.inSaveState = false;
        }, 5000);
    }

    return result;
};

jarvis.objects.Update.prototype.Changes = function (sender, options, callback) {
    var result;
    jarvis.inSaveState = true;
    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Update.svc/Changes', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            setTimeout(function () {
                jarvis.inSaveState = false;
            }, 5000);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/Update.svc/Changes', null, null);
        setTimeout(function () {
            jarvis.inSaveState = false;
        }, 5000);
    }

    return result;
};

jarvis.objects.Update.prototype.RunUpdate = function (sender, options, callback) {
    var result;
    jarvis.inSaveState = true;
    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Update.svc/RunUpdate', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            setTimeout(function () {
                jarvis.inSaveState = false;
            }, 5000);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/Update.svc/RunUpdate', null, null);
        setTimeout(function () {
            jarvis.inSaveState = false;
        }, 5000);
    }

    return result;
};

jarvis.objects.Update.prototype.CurrentRevision = function (sender, options, callback) {
    var result;
    jarvis.inSaveState = true;
    if (typeof callback == 'function')
        jarvis.dataaccess.fetch(this, '/engine/Update.svc/CurrentRevision', null, function (sender, data, error) {
            result = $.parseJSON(data.data);
            setTimeout(function () {
                jarvis.inSaveState = false;
            }, 5000);
            callback(sender, result);
        });
    else {
        result = jarvis.dataaccess.fetch(this, '/engine/Update.svc/CurrentRevision', null, null);
        setTimeout(function () {
            jarvis.inSaveState = false;
        }, 5000);
    }

    return result;
};

jarvis.loaded.push('jarvis.objects.Update');
jarvis.debug.log('INFO', 'jarvis.objects.Update', 6, 'JS source loaded');
