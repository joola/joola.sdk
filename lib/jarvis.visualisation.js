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
 * Base class for the jarvis.visualisation namespace.
 * @author itay@joo.la (itay weinberger)
 */

/**
 * @namespace jarvis.visualisation
 * @requires jarvis.debug
 * @requires jarvis.date
 * @requires jarvis.string
 */

jarvis.provide('jarvis.visualisation');

jarvis.require('jarvis.debug');
jarvis.require('jarvis.date');
jarvis.require('jarvis.string');

/**
 * The visualisation reference
 * @type {object}
 */
jarvis.visualisation;

/**
 * did we already draw loading screen
 * @type {bool}
 * @private
 */
jarvis.visualisation.loadingDrawn = false;
/**
 * did we already draw error screen
 * @type {bool}
 * @private
 */
jarvis.visualisation.errorDrawn = false;

jarvis.visualisation.breadcrumb = [];

/**
 * Init the visualisation wrapper
 */
jarvis.visualisation.init = function () {

    if (!jarvis.bootstrap) {
        jarvis.debug.log('INFO', 'Dashboard.Visualisation', 6, 'Bootstrap is not needed.');
        return;
    }

    $(jarvis).bind('jarvis-initialized', function () {
        //we scan the document for any tags we may need to replace.
        //search for new metric containers
        var $container_metrics = $('.jarvis.jcontainer.metrics:not([data-uid])');
        if ($container_metrics.length > 0) {
            jarvis.require('jarvis.visualisation.picker.metrics');
            jarvis.require('jarvis.visualisation.container.metrics');
            waitforScript('jarvis.visualisation.picker.metrics', function () {
                waitforScript('jarvis.visualisation.container.metrics', function () {
                    jarvis.visualisation.init_container_metrics($container_metrics)
                });
            })
        }

        //search for new dimension containers
        var $container_dimensions = $('.jarvis.jcontainer.dimensions:not([data-uid])');
        if ($container_dimensions.length > 0) {
            jarvis.require('jarvis.visualisation.container.dimensions');
            waitforScript('jarvis.visualisation.container.dimensions', function () {
                jarvis.visualisation.init_container_dimensions($container_dimensions)
            });
        }

        //search for new metric pickers
        var $picker_metrics = $('.jarvis.picker.metrics:not([data-uid])');
        if ($picker_metrics.length > 0) {
            jarvis.require('jarvis.visualisation.picker.metrics');
            waitforScript('jarvis.visualisation.picker.metrics', function () {
                jarvis.visualisation.init_picker_metrics($picker_metrics)
            });
        }

        //search for new dimension pickers
        var $picker_dimensions = $('.jarvis.picker.dimensions:not([data-uid])');
        if ($picker_dimensions.length > 0) {
            jarvis.require('jarvis.visualisation.picker.dimensions');
            waitforScript('jarvis.visualisation.picker.dimensions', function () {
                jarvis.visualisation.init_picker_dimensions($picker_dimensions)
            });
        }

        jarvis.visualisation.bootstrap();
        if ($('.jarvis.panel').length == 0) {
            jarvis.debug.log('INFO', 'Jarvis.Visualisation', 4, 'Searching for standalone components on page.');

            if ($('.jarvis.report.metricgroups').length > 0)
                new jarvis.visualisation.report.MetricGroup().init();
            if ($('.jarvis.report.tabs').length > 0)
                new jarvis.visualisation.report.Tabs().init();
            if ($('.jarvis.report.metricbox').length > 0)
                new jarvis.visualisation.report.MetricBox().init();
            if ($('.jarvis.report.timeline').length > 0)
                new jarvis.visualisation.report.Timeline().init();
            if ($('.jarvis.report.jtable').length > 0)
                new jarvis.visualisation.report.Table().init();

            if ($('.jarvis.dashboard.metricbox').length > 0)
                new jarvis.visualisation.dashboard.MetricBox().init();
            if ($('.jarvis.dashboard.pie').length > 0)
                new jarvis.visualisation.dashboard.Pie().init();
            if ($('.jarvis.dashboard.jtable').length > 0)
                new jarvis.visualisation.dashboard.Table().init();
            if ($('.jarvis.dashboard.timeline').length > 0)
                new jarvis.visualisation.dashboard.Timeline().init();

            if ($('.jarvis.realtime.geo').length > 0)
                new jarvis.visualisation.realtime.Geo().init();
            if ($('.jarvis.realtime.metricbox').length > 0)
                new jarvis.visualisation.realtime.MetricBox().init();
            if ($('.jarvis.realtime.startstop').length > 0)
                jarvis.visualisation.realtime.StartStop.init();
            if ($('.jarvis.realtime.status').length > 0)
                jarvis.visualisation.realtime.Status.init();
            if ($('.jarvis.realtime.table').length > 0)
                new jarvis.visualisation.realtime.Table().init();
            if ($('.jarvis.realtime.timeline').length > 0)
                new jarvis.visualisation.realtime.Timeline().init();
        }
        else if ($('.jarvis.panel').length > 0) {//&& jarvis.panelDraw == true) {
            jarvis.debug.log('INFO', 'Jarvis.Visualisation', 4, 'Searching for panels on page.');
            if ($('.jarvis.dashboard.panel').length > 0) {
                new jarvis.visualisation.dashboard.Panel().init(null, null, true);
                $('.jarvis.dashboard.panel').show();
            }
            else if ($('.jarvis.report.panel').length > 0) {
                jarvis.visualisation.showReport();
                //new jarvis.visualisation.report.Panel().init();
                //$('.jarvis.report.panel').show();
            }
            else if ($('.jarvis.realtime.panel').length > 0)
                new jarvis.visualisation.realtime.Panel().init(null, null, true);
        }
    });
};

waitforScript = function (id, callback) {
    setTimeout(function () {
        if (jarvis.loaded.indexOf(id) == -1) {
            waitforScript(id, callback);
        }
        else {
            callback();
        }
    }, 100);
};

jarvis.visualisation.init_picker_metrics = function (objects) {
    (objects).each(function (index, item) {
        var $item = $(item);
        var uid = guidGenerator();
        $item.attr('data-uid', uid);

        //init the metric picker
        var o = new jarvis.visualisation.picker.Metrics({
            container: $item,
            placeholdertext: 'Choose a metric...'
        });
    });
};

jarvis.visualisation.init_picker_dimensions = function (objects) {
    (objects).each(function (index, item) {
        var $item = $(item);
        var uid = guidGenerator();
        $item.attr('data-uid', uid);

        //init the metric picker
        var o = new jarvis.visualisation.picker.Dimensions({
            container: $item,
            placeholdertext: 'Choose a dimension...'
        });
    });
};

jarvis.visualisation.init_container_metrics = function (objects) {
    (objects).each(function (index, item) {
        var $item = $(item);
        var uid = guidGenerator();
        $item.attr('data-uid', uid);

        //init the metric picker
        var o = new jarvis.visualisation.container.Metrics({
            container: $item
        });
    });
};

jarvis.visualisation.init_container_dimensions = function (objects) {
    (objects).each(function (index, item) {
        var $item = $(item);
        var uid = guidGenerator();
        $item.attr('data-uid', uid);

        //init the metric picker
        var o = new jarvis.visualisation.container.Dimensions({
            container: $item
        });
    });
};

jarvis.visualisation.lastIntervalLoading = 0;
jarvis.visualisation.showLoading = function (immediate) {
    $('.simpleloading').show();

    $('.container.jarvis').unbind('resize');
    $('.container.jarvis').resize(function () {
        jarvis.debug.log('INFO', 'jarvis.visualisation', 6, 'container resize [2]: ' + ($('.content_wrapper').width() - 1).toString() + 'px');
    });
    $('.container.jarvis').bind('resize', function () {
        jarvis.debug.log('INFO', 'jarvis.visualisation', 6, 'container resize: ' + ($('.content_wrapper').width() - 1).toString() + 'px');

        var $this = $('.jarvis._container');
        try {
            $(".overlay").css({
                opacity: 0.5,
                //height:$('.content_wrapper').height() + 'px',
                width: $('.content_wrapper').width() - 1 + 'px'

                //top:($this.offset().top < 100 ? 100 : $this.offset().top)
                //width:$this.outerWidth(),
                //height:'70%'
            });
        } catch (e) {
        }
    });

    try {
        $(".overlay").css({
            opacity: 0.5,
            //height:$('.content_wrapper').height() + 'px',
            width: $('.content_wrapper').width() - 1 + 'px'
            //top:($this.offset().top < 100 ? 100 : $this.offset().top)
        });
    } catch (e) {
    }

    if (immediate)
        $(".overlay").show();
    else
        $(".overlay").fadeIn();
    $('.launchlink').addClass('disabled');
}

jarvis.visualisation.hideLoading = function () {
    $('.simpleloading').hide();
    $('.overlay').fadeOut().hide();
    $('.launchlink').removeClass('disabled');
}

jarvis.visualisation.setupLoading = function () {
    if (!jarvis.visualisation.loadingDrawn) {
        $('body').append('<div id="" class="simpleloading" style="display: none; ">Loading ...</div>');
        //setup ajax hook

        $(".overlay").css({
            opacity: 0.5,
            //height:$('.content_wrapper').height() + 'px',
            width: $('.content_wrapper').width() - 1 + 'px'
            //top:($this.offset().top < 100 ? 100 : $this.offset().top)
        });

        //var timeoutID = 0;
        $(document).ajaxStart(function () {
            //console.log('ajaxstart');
            var $this = $('.jarvis._container');
            jarvis.ajaxCounter++;
            jarvis.ajaxCounter = 2;
//            $('.simpleloading').show();

            //$('.jarvis.container').css('opacity', '0.5');

            if ($(".overlay").css('display') == 'none') {
                if (jarvis.ajaxCounter > 1) {
                    jarvis.visualisation.showLoading();
                    //console.log('fade in');
                    /*
                     try {
                     $(".overlay").css({
                     opacity:0.5,
                     height:$('.content_wrapper').height() + 'px',
                     width:$('.content_wrapper').width() - 1 + 'px'
                     //top:($this.offset().top < 100 ? 100 : $this.offset().top)
                     });
                     } catch (e) {
                     }
                     $(".overlay").fadeIn();
                     $('.launchlink').addClass('disabled');
                     */
                }
            }

            if (jarvis.visualisation.lastIntervalLoading <= 0) {
                jarvis.visualisation.lastIntervalLoading = setInterval(function () {
                    if (jarvis.ajaxCounter > 0 && $(".overlay").css('display') == 'none') {
                        jarvis.visualisation.showLoading();
                        //console.log('fadein timeout');
                        /*
                         try {
                         $(".overlay").css({
                         opacity:0.5,
                         height:$('.content_wrapper').height() + 'px',
                         width:$('.content_wrapper').width() - 1 + 'px'
                         //top:($this.offset().top < 100 ? 100 : $this.offset().top)
                         });
                         } catch (e) {
                         }
                         $(".overlay").fadeIn();
                         $('.launchlink').addClass('disabled');
                         */

                    }
                    else if (jarvis.ajaxCounter <= 0 && $(".overlay").css('display') == 'block') {
                        clearInterval(jarvis.visualisation.lastIntervalLoading);
                        //console.log('fade out interval');
                        jarvis.visualisation.hideLoading();
                        /*
                         $('.overlay').fadeOut().hide();
                         $('.launchlink').removeClass('disabled');
                         */
                    }
                }, 500);
            }
            //console.log('show');
            //if (timeoutID != 0)
            //    window.clearTimeout(timeoutID);
            /*
             timeoutID = setTimeout(function () {
             $('.simpleloading').hide()
             //console.log('hide - time');
             },30000);
             */
        });

        $(document).ajaxStop(function (e, xhr, settings) {
            //console.log('ajaxstop');
            //console.log('complete');
            jarvis.ajaxCounter--;
            jarvis.ajaxCounter = 0;
            if (jarvis.ajaxCounter < 0)
                jarvis.ajaxCounter = 0;
            if (jarvis.ajaxCounter <= 0) {
                //console.log('test2');
                //console.log('test');
                //$('.simpleloading').hide();

                //$('.jarvis.container').css('opacity', '1');

                setTimeout(function () {
                    //console.log('test4');
                    if (jarvis.ajaxCounter <= 0 && ($(".overlay").css('display') == 'block' || $(".simpleloading").css('display') == 'block')) {
                        clearInterval(jarvis.visualisation.lastIntervalLoading);
                        //console.log('fade out timeout');
                        jarvis.visualisation.hideLoading();
                        /*
                         $('.overlay').fadeOut().hide();
                         $('.launchlink').removeClass('disabled');
                         */
                    }
                }, 500);

                //console.log('hide');
                //if (timeoutID != 0)
                //  window.clearTimeout(timeoutID);

                if (!jarvis.inSaveState)
                    jarvis.saveState('State change');
            }
        });


        jarvis.visualisation.loadingDrawn = true;
    }
};

jarvis.visualisation.setupError = function () {
    if (!jarvis.visualisation.errorDrawn) {
        $('body').append('<div id="" class="simpleerror" style="display: none; ">Error.</div>');
        //setup ajax hook

        if (!jarvis.bootstrap) {
            return;
        }

        var _modal = '<div class="modal_error modal hide fade">';
        _modal += '<div class="modal-header">';
        _modal += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
        _modal += '<h3>Error details</h3>';
        _modal += '</div>';
        _modal += '<div class="modal-body">';
        _modal += '<p class="errortext" style="font-weight: bold;">Error details</p>';
        _modal += '<p class="">Apologies for your inconvenience, but the system has failed to complete your request.</p>';
        _modal += '<p class="">We have gathered the following information from your system and our server logs and with your permission would like to open a support ticket on your behalf and send the relevant information for further investigation by our engineers.</p>';

        _modal += '<div class="accordion" id="accordion2">';
        _modal += '<div class="accordion-group">';
        _modal += '<div class="accordion-heading">';
        _modal += '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">';
        _modal += 'Exception details';
        _modal += '</a>';
        _modal += '</div>';
        _modal += '<div id="collapseOne" class="accordion-body collapse in">';
        _modal += '<div class="accordion-inner exceptiondetails">';
        _modal += '';
        _modal += '</div>';
        _modal += '</div>';
        _modal += '</div>';
        _modal += '<div class="accordion-group">';
        _modal += '<div class="accordion-heading">';
        _modal += '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo">';
        _modal += 'Client state';
        _modal += '</a>';
        _modal += '</div>';
        _modal += '<div id="collapseTwo" class="accordion-body collapse">';
        _modal += '<div class="accordion-inner ">';
        _modal += '<textarea class="clientstate" style="width: 100%;height: 100px;"></textarea>';
        _modal += '</div>';
        _modal += '</div>';
        _modal += '</div>';
        _modal += '<div class="accordion-group">';
        _modal += '<div class="accordion-heading">';
        _modal += '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion3" href="#collapseThree">';
        _modal += 'Server log (last 50 rows)';
        _modal += '</a>';
        _modal += '</div>';
        _modal += '<div id="collapseThree" class="accordion-body collapse">';
        _modal += '<div class=" accordion-inner" >';
        _modal += '<table class="table table-striped table-condensed serverlog"><tr><th>Timestamp (server GMT)</th><th>Message</th></tr></table>';
        _modal += '</div>';
        _modal += '</div>';
        _modal += '</div>';
        _modal += '</div>';

        _modal += '<p class="">In order to complete opening a support ticket, please click the Report button to proceed.</p>';
        _modal += '</div>';
        _modal += '<div class="modal-footer">';
        _modal += '<a href="#" class="btn" data-dismiss="modal" aria-hidden="true">Close</a>';
        _modal += '<a href="#" class="btn btn-primary btnreport">Report</a>';
        _modal += '</div>';
        _modal += '</div>';

        $('body').append(_modal);
        jarvis.visualisation.errorDrawn = true;
    }

}
function make_base_auth(user, password) {
    var tok = user + ':' + password;
    var hash = btoa(tok);
    return "Basic " + hash;
}
jarvis.visualisation.showError = function (error) {
    //console.log(error);

    $(jarvis).trigger('jarvis-error', [error]);

    jarvis.visualisation.setupError();

    $('.simpleloading').hide();
    $('.simpleerror').text('Error. Click here to review and report...');

    $('.simpleerror').off('click');
    $('.simpleerror').on('click', function () {
        var $modal_error = $('.modal_error');
        try {
            var serverlog = new jarvis.objects.State().GetLog();

            serverlog = $.parseJSON(serverlog.data).m_serializationArray;
            var $serverlog = $('.serverlog');
            $serverlog.empty();
            var $tr = $('<tr></tr>');
            var $th = $('<th>Timetamp</th>');
            $tr.append($th);
            $th = $('<th>Message</th>');
            $tr.append($th);
            $serverlog.append($tr);
            //console.log($serverlog);
            serverlog.reverse();
            $(serverlog).each(function (index, item) {
                var pattern = /\[(.*?)\]/;
                //console.log(item.split(pattern));
                var timestamp = $.trim(item.split(pattern)[1]).split(' ')[1];
                var message = $.trim(item.split(pattern)[2]);

                $tr = $('<tr></tr>');
                var $td = $('<td class="timestamp">' + timestamp + '</td>');
                $tr.append($td);
                $td = $('<td class="message">' + message + '</td>');
                $tr.append($td);
                //console.log($tr);
                $serverlog.append($tr);
            });
        }
        catch (ex) {
            console.log(ex);
            //ignore
        }
        var errormessage = 'JA Error. ';
        if (typeof(error) == 'object') {
            var _message = '';
            jQuery.each(error, function (i, o) {
                _message += '<strong>' + i + '</strong>: ' + o + '<br/>';
                //console.log(i,o);
            });
            $modal_error.find('.exceptiondetails').html(_message);
            $modal_error.find('.errortext').html(error.Message.substring(0, 50));
            errormessage += error.Message.substring(0, 50);

        }
        else {
            $modal_error.find('.exceptiondetails').html('Message: ' + error);
            $modal_error.find('.errortext').html(error);
            errormessage += error.substring(0, 50);
        }

        $modal_error.find('.clientstate').text(JSON.stringify(jarvis.state, null, '\t'));

        $('.btnreport').off('click');
        $('.btnreport').on('click', function () {
            //var url = 'http://support.jarvisanalytics.com/helpdesk/tickets.xml';
            var endPoint = '/Engine/Tickets.aspx';
            if (jarvis.basePath)
                endPoint = jarvis.svcPath + endPoint;

            endPoint = jarvis.hostname + endPoint;

            errormessage += '<br/><br/>\r\n\r\nClient State<hr/><br/>\r\n';
            errormessage += JSON.stringify(jarvis.state, null, '\t');

            errormessage += '<br/><br/>\r\n\r\nServer Log<hr/><br/>\r\n';
            //errormessage+='<table><tr><th>Timestamp</th><th>Message</th></tr>';
            $(serverlog).each(function (index, item) {
                var pattern = /\[(.*?)\]/;
                //console.log(item.split(pattern));
                var timestamp = $.trim(item.split(pattern)[1]).split(' ')[1];
                var message = $.trim(item.split(pattern)[2]);

                errormessage += '' + timestamp + ': ' + message + '<br/>\r\n';
            });
            //errormessage+='</table>';
            //console.log(errormessage)
            //console.log('report');
            var _xml = '';
            _xml += '<helpdesk_ticket><description>' + errormessage + '</description>';
            _xml += '<subject>Exception reported from JA.</subject>';
            _xml += '<email>' + jarvis.user.email + '</email>';
            _xml += '<priority>2</priority>';
            _xml += '<source>4</source>';
            //_xml += '<Exception>Exception</Exception>';
            //_xml += '<custom_field><client_state>Client State</client_state></custom_field>';
            //_xml += '<custom_field><field_name>Server Log</field_name></custom_field>';
            _xml += '</helpdesk_ticket>';

            $.ajax({
                type: 'POST',
                async: false,
                contentType: "text/xml",
                dataType: "text",
                url: endPoint,
                data: _xml,
                success: function (data) {
                    //console.log('success', data);
                    xmlDoc = $.parseXML(data),
                        $xml = $(xmlDoc),
                        $title = $xml.find("display-id");

                    $modal_error.modal('hide');
                    $('.simpleerror').hide();
                    //console.log($title.text());
                },
                error: function (e, e1, e2) {
                    //console.log('error',e,e1,e2);
                }
            });

        });

        $modal_error.modal('show');

    });

    $('.simpleerror').show();

    $('.jarvis._container').css('opacity', '1');

    setTimeout(function () {
        $('.simpleerror').hide()
    }, 15000);
}

jarvis.visualisation.showNotice = function () {

}

jarvis.visualisation.setDisplay = function (show) {
    console.log('test');
    var $body = $('body');
    var $jarvis = $('.jarvis._container');
    var $report = $body.find('.jarvis.report.panel');
    var $dashboard = $body.find('.jarvis.dashboard.panel');
    var $realtime = $('.jarvis.realtime.panel');
    var $datebox = $body.find('.jarvis.picker.datebox');

    var $editbutton = $body.find('.panel-edit');
    var $addwidgetbutton = $body.find('.widget-add');

    $('.report.editor').hide();

    switch (show) {
        case 'homepage':
            //$jarvis.hide();
            //$body.find('.homepage').show();
            break;
        case 'report':
            $body.find('.homepage').hide();

            $realtime.hide();
            $realtime.find('.widgets').empty();

            $dashboard.hide();
            $dashboard.find('.widgets').empty();


            $datebox.show();
            $report.show();
            $editbutton.show();
            $addwidgetbutton.hide();

            $jarvis.show();
            break;
        case 'dashboard':
            //console.log($report);
            $body.find('.homepage').hide();

            $report.hide();
            $report.find('.timeline').empty();
            $report.find('.metricbox').empty();
            $report.find('.jtable').empty();

            $realtime.hide();
            $realtime.find('.widgets').empty();

            $datebox.show();
            $editbutton.show();
            $addwidgetbutton.show();

            $dashboard.show();

            $jarvis.show();

            break;
        case 'realtime':
            $body.find('.homepage').hide();

            $report.hide();
            $report.find('.timeline').empty();
            $report.find('.metricbox').empty();
            $report.find('.jtable').empty();

            $dashboard.hide();
            $dashboard.find('.widgets').empty();

            $datebox.hide();
            $editbutton.show();
            $addwidgetbutton.show();

            $realtime.show();

            $jarvis.show();
            break;
        default:
            //$jarvis.hide();
            //$body.find('.homepage').show();
            break;
    }

    var $head = $('.jumbotron.subhead');
    var $panel = $('.jarvis._container .jarvis.report.panel');
    $head.show();
    $panel.show();
}

jarvis.visualisation.reportInit = false;
jarvis.visualisation.reportWrapper = null;
jarvis.visualisation.dashboardInit = false;
jarvis.visualisation.dashboardWrapper = null;
jarvis.visualisation.realtimeInit = false;
jarvis.visualisation.realtimeWrapper = null;

jarvis.visualisation.dateBoxInit = false;

jarvis.visualisation.showHomepage = function (reportID, redraw) {
    jarvis.visualisation.setDisplay('homepage');
};

jarvis.visualisation.showReport = function (reportID, redraw) {
    //console.log('show report');
    jarvis.visualisation.setDisplay('report');

    if (jarvis.visualisation.dashboardWrapper)
        jarvis.visualisation.dashboardWrapper.dispose();

    jarvis.visualisation.report.globalfilter = '';
    jarvis.reportID = reportID;

    if (!jarvis.visualisation.reportInit) {
        jarvis.visualisation.reportWrapper = new jarvis.visualisation.report.Panel({reportID: reportID});
        jarvis.visualisation.reportInit = true;
    }

    var tabID = 0;
    var metricgroupID = 0;
    if (jarvis.state) {
        tabID = jarvis.state.tabID;
        metricgroupID = jarvis.state.metricgroupID;
    }
    if (tabID == null || typeof tabID == 'undefined')
        tabID = 0;
    if (metricgroupID == null || typeof metricgroupID == 'undefined')
        metricgroupID = 0;
    jarvis.visualisation.reportWrapper.init({reportID: reportID, tabID: tabID, tabType: 'explorer', metricgroupID: metricgroupID}, $('.jarvis.report.panel'), true, true, true);
    //scrollTop();

    $(jarvis).trigger('setreport', jarvis.visualisation.reportWrapper.reportID);

};

jarvis.visualisation.showDashboard = function (dashboardID) {
    //console.log('showdashboard');
    jarvis.visualisation.setDisplay('dashboard');

    if (jarvis.visualisation.reportWrapper)
        jarvis.visualisation.reportWrapper.dispose();

    //jarvis.visualisation.dashboard.globalfilter = '';
    jarvis.dashboardID = dashboardID;

    if (!jarvis.visualisation.dashboardInit) {
        jarvis.visualisation.dashboardWrapper = new jarvis.visualisation.dashboard.Panel({panelID: dashboardID});
        jarvis.visualisation.dashboardInit = true;
    }
    jarvis.visualisation.dashboardWrapper.init({panelID: dashboardID}, $('.jarvis.dashboard.panel'), true, true, true);
    //scrollTop();

    $(jarvis).trigger('setdashboard', jarvis.visualisation.dashboardWrapper.panelID);

};

jarvis.visualisation.showRealtimePanel = function (panelID) {
    jarvis.visualisation.setDisplay('realtime');

    //jarvis.visualisation.dashboard.globalfilter = '';
    jarvis.panelID = panelID;

    if (!jarvis.visualisation.realtimeInit) {
        jarvis.visualisation.realtimeWrapper = new jarvis.visualisation.realtime.Panel({panelID: panelID});
        jarvis.visualisation.realtimeInit = true;
    }
    jarvis.visualisation.realtimeWrapper.init({panelID: panelID}, $('.jarvis.realtime.panel'), true, true, true);
    //scrollTop();
};

jarvis.visualisation.bootstrap = function () {
    jarvis.debug.log('INFO', 'jarvis.visualisation', 6, 'Bootstrap...');

    if (!jarvis.bootstrap) {
        jarvis.debug.log('INFO', 'jarvis.visualisation', 6, 'Bootstrap is not needed.');
        return;
    }


    //if (!jarvis.visualisation.dateBoxInit) {
    jarvis.debug.log('INFO', 'jarvis.visualisation', 6, 'Bootstrapping Datebox');
    jarvis.visualisation.picker.DateBox.init();
    jarvis.visualisation.dateBoxInit = true;
    // }

    jarvis.visualisation.setupLoading();
    jarvis.visualisation.setupError();

    /*
     if (jarvis.state.view == 'homepage')
     jarvis.visualisation.showHomepage();
     else if (jarvis.state.view == 'report')
     jarvis.visualisation.showReport(jarvis.state.reportID);
     else if (jarvis.state.view == 'dashboard')
     jarvis.visualisation.showDashboard(jarvis.state.dashboardID);
     else if (jarvis.state.view == 'realtime')
     jarvis.visualisation.showRealtimePanel(jarvis.state.panelID);
     */

    $(jarvis).unbind('homepage');
    $(jarvis).bind('homepage', function (e) {
        jarvis.state = {};
        jarvis.visualisation.picker.DateBox.init();
        jarvis.visualisation.showHomepage();
    });
    $(jarvis).unbind('reportchange');
    $(jarvis).bind('reportchange', function (e, reportID) {
        jarvis.state['timeline-1234'] = null;
        jarvis.state['table-1234'] = null;

        if (jarvis.visualisation.reportWrapper) {
            try {
                jarvis.visualisation.reportWrapper.dispose();
            } catch (ex) {
            }
        }
        jarvis.state.dashboardID = null;
        jarvis.state.reportID = null;
        jarvis.state.tabID = null;
        jarvis.state.metricgroupID = null;
        jarvis.state.tabType = null;

        console.log('state', jarvis.state);

        jarvis.visualisation.showReport(reportID);
    });
    $(jarvis).unbind('dashboardchange');
    $(jarvis).bind('dashboardchange', function (e, dashboardID) {
        //console.log('dashboardchange', dashboardID);
        jarvis.visualisation.showDashboard(dashboardID);
    });
    $(jarvis).unbind('realtimepanelchange');
    $(jarvis).bind('realtimepanelchange', function (e, panelID) {
        jarvis.visualisation.showRealtimePanel(panelID);
    });

    $('.homepagelink').off('click');
    $('.homepagelink').on('click', function () {
        jarvis.state.view = 'homepage';
        jarvis.saveState('Homepage switch');
        $(jarvis).trigger('homepage');
    });

};

jarvis.debug.log('INFO', 'Jarvis.Visualisation', 6, 'JS source loaded');

//jarvis.visualisation.init();