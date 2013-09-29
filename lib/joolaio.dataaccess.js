/**
 *  joola.io
 *
 *  Copyright Joola Smart Solutions, Ltd. <info@joo.la>
 *
 *  Licensed under GNU General Public License 3.0 or later.
 *  Some rights reserved. See LICENSE, AUTHORS.
 *
 *  @license GPL-3.0+ <http://spdx.org/licenses/GPL-3.0+>
 */

joolaio.provide('joolaio.dataaccess');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

/**
 * Initializes a new UserTokens object.
 * @class Responsible for communication with joolaio Engine for the User Tokens Interface
 * @requires joolaio.debug
 * @requires joolaio.date
 * @requires joolaio.string
 */
joolaio.dataaccess;

/**
 * Fetches a query from the Engine.
 * @param sender {object} context object that is returned to the callback.
 * @param endPoint {string} array of options to be passed to the APIFUNC.
 * @param queryOptions {object} object containing the query options.
 * @param callback {function} function to receive the sender and the data.
 * @param timeout {number} (optional) timeout for the query.
 * @see <a href="/docs/rest/apis/query.html#Query.Fetch">API Function</a>
 * @returns {object}
 */
joolaio.dataaccess.fetch = function (sender, endPoint, queryOptions, callback, timeout) {
    try {
        if (_gaq) {
            _gaq.push(['_trackPageview', 'joolaio/fetch']);
            _gaq.push(['_trackEvent', 'joolaio', 'fetch', '']);
        }
    } catch (e) {
    }

    if (joolaio.basePath && endPoint.indexOf('://') == -1)
        endPoint = joolaio.svcPath + endPoint;

    //if (endPoint.indexOf('://') == -1)
    //    endPoint = joolaio.hostname + endPoint;

    endPoint = joolaio.endpoints.api + endPoint;

    if (typeof(callback) !== "function") {
        joolaio.debug.log('INFO', 'joolaio.dataaccess', 5, 'Executing Sync: ' + endPoint);
        //return;
    }
    else
        joolaio.debug.log('INFO', 'joolaio.dataaccess', 5, 'Executing Async: ' + endPoint);

    var oResult = null;
    var options = {
        type: 'GET',
        timeout: (timeout ? timeout : null),
        dataType: 'json',
        async: (typeof(callback) === "function"),
        url: endPoint,
        contentType: 'application/json;',
        data: queryOptions,
        //xhrFields: {
        //    withCredentials: true
        // },
        //crossDomain:true,
        beforeSend: function (xhr, settings) {
            xhr.setRequestHeader('joola-token', joolaio.TOKEN);

            $('.simpleloading').css('display', 'block');
            $('.simpleloading').show();
        },
        error: function (xhr, textStatus, error) {
            console.log('Error during ajax call.', joolaio.inSaveState, textStatus, error);
            if (!joolaio.inSaveState) {
                if (xhr.status == 401) {
                    if (joolaio.loginRedirectUrl == null)
                        document.location.reload(true);
                    else
                        document.location = joolaio.loginRedirectUrl;
                }
                else if (xhr.status == 500 || xhr.readyState != 0) {
                    joolaio.visualisation.showError(error);

                    if (typeof(callback) === "function")
                        callback(sender, null, error);
                    else {
                        if (!joolaio.inSaveState)
                            throw error;
                    }
                }
            }
        },
        success: function (result, textstatus, xhrreq) {
            try {

                if (typeof(callback) !== "function") {
                    //$('.simpleloading').hide();
                }

                if (result == null) {
                }
                else if (result.resultcode == 500)
                    throw { message: result.resulttext};
                else if (typeof(callback) === "function")
                    callback(sender, result, this /*error*/);
                else {
                    oResult = result;
                }
            }
            catch (e) {
                console.log('Exception during ajax call: ' + e.message);
                console.log(e.stack);
                joolaio.visualisation.showError(e.message);

                if (typeof(callback) === "function") {
                    callback(sender, result, this /*error*/);
                }
                else {
                    throw e;
                }
            }
        }
    };
    try {
        var request = $.ajax(options);
    }
    catch (e) {
        throw e;
    }

    return oResult;
};

joolaio.dataaccess.prepareAjax = function (sender, endPoint, queryOptions, callback) {
    try {
        if (_gaq) {
            _gaq.push(['_trackPageview', 'joolaio/fetch']);
            _gaq.push(['_trackEvent', 'joolaio', 'prepareAjax', '']);
        }
    } catch (e) {
    }

    //if (endPoint.indexOf('://') == -1)
    //    endPoint = joolaio.hostname + endPoint;

    endPoint = joolaio.endpoints.query + endPoint;

    var options = {
        type: 'GET',
        dataType: 'json',
        url: endPoint,
        contentType: 'application/json;',
        /*xhrFields: {
         withCredentials: true
         },*/
        data: queryOptions,
        beforeSend: function (xhr, settings) {
            xhr.setRequestHeader('joola-token', joolaio.TOKEN);
        },
        error: function (xhr, textStatus, error) {
            console.log('Error during ajax call.', textStatus, error);
            if (xhr.status == 401) {
                if (joolaio.loginRedirectUrl == null)
                    document.location.reload(true);
                else
                    document.location = joolaio.loginRedirectUrl;
            }
            else if (xhr.status == 500 || xhr.readyState != 0) {
                joolaio.visualisation.showError(error);
            }


            joolaio.debug.log('ERROR', 'joolaio.dataaccess', 5, 'Executing Multi Async: ' + endPoint + ', error: ' + error);
        },
        success: function (result) {
            result.id = queryOptions.id;

            result.data = {};
            result.data.Result = {};

            result.data.Result.Columns = [];
            result.data.Result.Rows = [];

            _.each(result.results.dimensions, function (d) {
                result.data.Result.Columns.push(d);
            });
            _.each(result.results.metrics, function (m) {
                result.data.Result.Columns.push(m);
                switch (m.type) {
                    case 'int':
                        if (m.suffix == 'seconds') {
                            m.formatter = function (value) {
                                return joolaio.string.intToTime(parseInt(value));
                            };
                        }
                        else {
                            m.formatter = function (value) {
                                return joolaio.string.formatNumber(parseInt(value), 0, true);
                            };
                        }
                        break;
                    case 'float':
                        m.formatter = function (value) {
                            return joolaio.string.formatNumber(parseFloat(value), 2, true);
                        };
                        break;
                    default:
                        if (m.suffix == 'seconds') {
                            m.formatter = function (value) {
                                return joolaio.string.intToTime(parseInt(value));
                            };
                        }
                        else {
                            m.formatter = function (value) {
                                return joolaio.string.formatNumber(parseInt(value), 0, true);
                            };
                        }
                        break;
                }
            });

            _.each(result.results.rows, function (r) {
                var row = {
                    Values: [],
                    FormattedValues: []

                };

                _.each(result.data.Result.Columns, function (col) {


                    row.Values.push(r[col.name]);

                    if (col.formatter) {
                        row.FormattedValues.push(col.formatter(r[col.name]));
                    }
                    else {
                        if (col.name == "Date") {
                            var _date = new Date(r["Date"]);

                            _date = joolaio.date.flatDate(_date);
                            _date = joolaio.date.formatDate(_date);

                            row.FormattedValues.push(_date);
                        }
                        else
                            row.FormattedValues.push(r[col.name]);
                    }


                });

                result.data.Result.Rows.push(row);
            });

            if (queryOptions.filter) {
                result.data.Request = {};
                result.data.Request.Filter = queryOptions.filter;
            }

            callback(result);
        }
    };

    try {
        return $.ajax(options);
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

joolaio.dataaccess.multifetch = function (sender, endPoint, queryOptions, callback) {
    try {
        //if (_gaq) {
        //_gaq.push(['_trackPageview', 'joolaio/multifetch']);
        // _gaq.push(['_trackEvent', 'joolaio', 'multifetch', '']);

        //}
    } catch (e) {
    }
    joolaio.debug.log('INFO', 'joolaio.dataaccess', 5, 'Executing Multiple ASync: ' + endPoint);

    if (joolaio.basePath)
        endPoint = joolaio.joolaioPath + endPoint;

    var results = [];
    var ajaxRequests = [];
    $(queryOptions).each(function (index, item) {
        results.push(null);
        ajaxRequests.push(joolaio.dataaccess.prepareAjax(sender, endPoint, item, function (data) {
            if (data.resultcode != '200')
                throw data.resulttext;
            else
                results[index] = data;
        }));
    });

    var waitCounter = ajaxRequests.length;
    $(ajaxRequests).each(function (index, item) {
        item.done(function (args) {
            if (--waitCounter == 0)
                callback(sender, results, null);
        })
    });

};

joolaio.dataaccess.dimensions = [];
joolaio.dataaccess.metrics = [];
joolaio.dataaccess.realtimepanels = [];
joolaio.dataaccess.dashboards = [];
joolaio.dataaccess.reports = [];

joolaio.dataaccess.getWidget = function (id) {
    var data = joolaio.dataaccess.fetch(this, '/engine/RealtimePanels.svc/GetWidget', {ID: id}, null);
    data = $.parseJSON(data.data);
    return data;
};

joolaio.dataaccess.getDashboardWidget = function (id) {
    var data = joolaio.dataaccess.fetch(this, '/engine/Dashboards.svc/GetWidget', {ID: id}, null);
    data = $.parseJSON(data.data);
    return data;
};


(function ($) {

// jQuery on an empty object, we are going to use this as our Queue
    var ajaxQueue = $({});

    $.ajaxQueue = function (ajaxOpts) {
        var jqXHR,
            dfd = $.Deferred(),
            promise = dfd.promise();

        // queue our ajax request
        ajaxQueue.queue(doRequest);

        // add the abort method
        promise.abort = function (statusText) {

            // proxy abort to the jqXHR if it is active
            if (jqXHR) {
                return jqXHR.abort(statusText);
            }

            // if there wasn't already a jqXHR we need to remove from queue
            var queue = ajaxQueue.queue(),
                index = $.inArray(doRequest, queue);

            if (index > -1) {
                queue.splice(index, 1);
            }

            // and then reject the deferred
            dfd.rejectWith(ajaxOpts.context || ajaxOpts,
                [ promise, statusText, "" ]);

            return promise;
        };

        // run the actual query
        function doRequest(next) {
            jqXHR = $.ajax(ajaxOpts)
                .then(next, next)
                .done(dfd.resolve)
                .fail(dfd.reject);
        }

        return promise;
    };
})(jQuery);

joolaio.debug.log('INFO', 'joolaio.dataaccess', 6, 'JS source loaded');

