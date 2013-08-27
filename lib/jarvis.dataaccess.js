// Copyright 2013 Joola. All Rights Reserved.
//
// Licensed under the Jarvis License Agreement (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://jarvis.joo.la/license
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview File for Jarvis Client SDK JS Library (Jarvis).
 * This file is responsible for communication with Jarvis Analytics Engine.
 * @author itay@joo.la (itay weinberger)
 */

jarvis.provide('jarvis.dataaccess');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

/**
 * Initializes a new UserTokens object.
 * @class Responsible for communication with Jarvis Analytics Engine for the User Tokens Interface
 * @requires jarvis.debug
 * @requires jarvis.date
 * @requires jarvis.string
 */
jarvis.dataaccess;

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
jarvis.dataaccess.fetch = function (sender, endPoint, queryOptions, callback, timeout) {
    try {
        if (_gaq) {
            _gaq.push(['_trackPageview', 'jarvis/fetch']);
            _gaq.push(['_trackEvent', 'jarvis', 'fetch', '']);
        }
    } catch (e) {
    }

    if (jarvis.basePath && endPoint.indexOf('://') == -1)
        endPoint = jarvis.svcPath + endPoint;

    //if (endPoint.indexOf('://') == -1)
    //    endPoint = jarvis.hostname + endPoint;

    endPoint = jarvis.endpoints.api + endPoint;

    if (typeof(callback) !== "function") {
        jarvis.debug.log('INFO', 'jarvis.dataaccess', 5, 'Executing Sync: ' + endPoint);
        //return;
    }
    else
        jarvis.debug.log('INFO', 'jarvis.dataaccess', 5, 'Executing Async: ' + endPoint);

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
            xhr.setRequestHeader('joola-token', jarvis.TOKEN);

            $('.simpleloading').css('display', 'block');
            $('.simpleloading').show();
        },
        error: function (xhr, textStatus, error) {
            console.log('Error during ajax call.', jarvis.inSaveState, textStatus, error);
            if (!jarvis.inSaveState) {
                if (xhr.status == 401) {
                    if (jarvis.loginRedirectUrl == null)
                        document.location.reload(true);
                    else
                        document.location = jarvis.loginRedirectUrl;
                }
                else if (xhr.status == 500 || xhr.readyState != 0) {
                    jarvis.visualisation.showError(error);

                    if (typeof(callback) === "function")
                        callback(sender, null, error);
                    else {
                        if (!jarvis.inSaveState)
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
                jarvis.visualisation.showError(e.message);

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

jarvis.dataaccess.prepareAjax = function (sender, endPoint, queryOptions, callback) {
    try {
        if (_gaq) {
            _gaq.push(['_trackPageview', 'jarvis/fetch']);
            _gaq.push(['_trackEvent', 'jarvis', 'prepareAjax', '']);
        }
    } catch (e) {
    }

    //if (endPoint.indexOf('://') == -1)
    //    endPoint = jarvis.hostname + endPoint;

    endPoint = jarvis.endpoints.query + endPoint;

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
            xhr.setRequestHeader('joola-token', jarvis.TOKEN);
        },
        error: function (xhr, textStatus, error) {
            console.log('Error during ajax call.', textStatus, error);
            if (xhr.status == 401) {
                if (jarvis.loginRedirectUrl == null)
                    document.location.reload(true);
                else
                    document.location = jarvis.loginRedirectUrl;
            }
            else if (xhr.status == 500 || xhr.readyState != 0) {
                jarvis.visualisation.showError(error);
            }


            jarvis.debug.log('ERROR', 'jarvis.dataaccess', 5, 'Executing Multi Async: ' + endPoint + ', error: ' + error);
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
                                return jarvis.string.intToTime(parseInt(value));
                            };
                        }
                        else {
                            m.formatter = function (value) {
                                return jarvis.string.formatNumber(parseInt(value), 0, true);
                            };
                        }
                        break;
                    case 'float':
                        m.formatter = function (value) {
                            return jarvis.string.formatNumber(parseFloat(value), 2, true);
                        };
                        break;
                    default:
                        if (m.suffix == 'seconds') {
                            m.formatter = function (value) {
                                return jarvis.string.intToTime(parseInt(value));
                            };
                        }
                        else {
                            m.formatter = function (value) {
                                return jarvis.string.formatNumber(parseInt(value), 0, true);
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

                            _date = jarvis.date.flatDate(_date);
                            _date = jarvis.date.formatDate(_date);

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

jarvis.dataaccess.multifetch = function (sender, endPoint, queryOptions, callback) {
    try {
        //if (_gaq) {
        //_gaq.push(['_trackPageview', 'jarvis/multifetch']);
        // _gaq.push(['_trackEvent', 'jarvis', 'multifetch', '']);

        //}
    } catch (e) {
    }
    jarvis.debug.log('INFO', 'jarvis.dataaccess', 5, 'Executing Multiple ASync: ' + endPoint);

    if (jarvis.basePath)
        endPoint = jarvis.JarvisPath + endPoint;

    var results = [];
    var ajaxRequests = [];
    $(queryOptions).each(function (index, item) {
        results.push(null);
        ajaxRequests.push(jarvis.dataaccess.prepareAjax(sender, endPoint, item, function (data) {
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

jarvis.dataaccess.dimensions = [];
jarvis.dataaccess.metrics = [];
jarvis.dataaccess.realtimepanels = [];
jarvis.dataaccess.dashboards = [];
jarvis.dataaccess.reports = [];

jarvis.dataaccess.getWidget = function (id) {
    var data = jarvis.dataaccess.fetch(this, '/engine/RealtimePanels.svc/GetWidget', {ID: id}, null);
    data = $.parseJSON(data.data);
    return data;
};

jarvis.dataaccess.getDashboardWidget = function (id) {
    var data = jarvis.dataaccess.fetch(this, '/engine/Dashboards.svc/GetWidget', {ID: id}, null);
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

jarvis.debug.log('INFO', 'jarvis.dataaccess', 6, 'JS source loaded');

