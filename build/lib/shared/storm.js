var request = require('request');

/*
 ** Constructor.  Create state in the object
 */
Log = function(access_token, project_id) {
    this.access_token = access_token;
    this.project_id = project_id;
    this.url = 'https://api.splunkstorm.com/1/inputs/http';
}

/* 
 ** Send log data to Storm.  Calls a callback that looks like:
 **
 ** function(err, response, data)
 **
 */
Log.prototype.send = function(eventtext, sourcetype, host, source, callback) {
    sourcetype = typeof sourcetype !== 'undefined' ? sourcetype : 'syslog';
    callback = typeof callback === 'function' ? callback : function () { };

    params = { 'project' : this.project_id,
        'sourcetype' : sourcetype };
    if (typeof host !== 'undefined') {
        params['host'] = host;
    }
    if (typeof source !== 'undefined') {
        params['source'] = source;
    }

    var urlarr = [ ];
    for (var key in params) {
        urlarr.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
    }
    var url = this.url + '?' + urlarr.join('&');

    if (typeof eventtext === 'object') {
        eventtext = JSON.stringify(eventtext);
    }

    var options = {
        maxSockets: 1,
        url: url,
        method: 'POST',
        body: eventtext,
        headers: {
            Authorization: "Basic " + new Buffer(":" + this.access_token).toString("base64")
        }
    };

    try {
        request(options, callback);
    }
    catch (ex) {
        callback(ex);
    }
}

exports.Log = Log;