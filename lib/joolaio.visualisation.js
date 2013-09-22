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

joolaio.provide('joolaio.visualisation');

joolaio.require('joolaio.debug');
joolaio.require('joolaio.date');
joolaio.require('joolaio.string');

/**
 * The visualisation reference
 * @type {object}
 */
joolaio.visualisation;

/**
 * did we already draw loading screen
 * @type {bool}
 * @private
 */
joolaio.visualisation.loadingDrawn = false;
/**
 * did we already draw error screen
 * @type {bool}
 * @private
 */
joolaio.visualisation.errorDrawn = false;

joolaio.visualisation.breadcrumb = [];

/**
 * Init the visualisation wrapper
 */
joolaio.visualisation.init = function () {

    if (!joolaio.bootstrap) {
        joolaio.debug.log('INFO', 'Dashboard.Visualisation', 6, 'Bootstrap is not needed.');
        return;
    }

    $(joolaio).bind('joolaio-initialized', function () {
        //we scan the document for any tags we may need to replace.
        //search for new metric containers
        var $container_metrics = $('.joolaio.jcontainer.metrics:not([data-uid])');
        if ($container_metrics.length > 0) {
            joolaio.require('joolaio.visualisation.picker.metrics');
            joolaio.require('joolaio.visualisation.container.metrics');
            waitforScript('joolaio.visualisation.picker.metrics', function () {
                waitforScript('joolaio.visualisation.container.metrics', function () {
                    joolaio.visualisation.init_container_metrics($container_metrics)
                });
            })
        }

        //search for new dimension containers
        var $container_dimensions = $('.joolaio.jcontainer.dimensions:not([data-uid])');
        if ($container_dimensions.length > 0) {
            joolaio.require('joolaio.visualisation.container.dimensions');
            waitforScript('joolaio.visualisation.container.dimensions', function () {
                joolaio.visualisation.init_container_dimensions($container_dimensions)
            });
        }

        //search for new metric pickers
        var $picker_metrics = $('.joolaio.picker.metrics:not([data-uid])');
        if ($picker_metrics.length > 0) {
            joolaio.require('joolaio.visualisation.picker.metrics');
            waitforScript('joolaio.visualisation.picker.metrics', function () {
                joolaio.visualisation.init_picker_metrics($picker_metrics)
            });
        }

        //search for new dimension pickers
        var $picker_dimensions = $('.joolaio.picker.dimensions:not([data-uid])');
        if ($picker_dimensions.length > 0) {
            joolaio.require('joolaio.visualisation.picker.dimensions');
            waitforScript('joolaio.visualisation.picker.dimensions', function () {
                joolaio.visualisation.init_picker_dimensions($picker_dimensions)
            });
        }

        joolaio.visualisation.bootstrap();
        if ($('.joolaio.panel').length == 0) {
            joolaio.debug.log('INFO', 'joolaio.Visualisation', 4, 'Searching for standalone components on page.');

            if ($('.joolaio.report.metricgroups').length > 0)
                new joolaio.visualisation.report.MetricGroup().init();
            if ($('.joolaio.report.tabs').length > 0)
                new joolaio.visualisation.report.Tabs().init();
            if ($('.joolaio.report.metricbox').length > 0)
                new joolaio.visualisation.report.MetricBox().init();
            if ($('.joolaio.report.timeline').length > 0)
                new joolaio.visualisation.report.Timeline().init();
            if ($('.joolaio.report.jtable').length > 0)
                new joolaio.visualisation.report.Table().init();

            if ($('.joolaio.dashboard.metricbox').length > 0)
                new joolaio.visualisation.dashboard.MetricBox().init();
            if ($('.joolaio.dashboard.pie').length > 0)
                new joolaio.visualisation.dashboard.Pie().init();
            if ($('.joolaio.dashboard.jtable').length > 0)
                new joolaio.visualisation.dashboard.Table().init();
            if ($('.joolaio.dashboard.timeline').length > 0)
                new joolaio.visualisation.dashboard.Timeline().init();

            if ($('.joolaio.realtime.geo').length > 0)
                new joolaio.visualisation.realtime.Geo().init();
            if ($('.joolaio.realtime.metricbox').length > 0)
                new joolaio.visualisation.realtime.MetricBox().init();
            if ($('.joolaio.realtime.startstop').length > 0)
                joolaio.visualisation.realtime.StartStop.init();
            if ($('.joolaio.realtime.status').length > 0)
                joolaio.visualisation.realtime.Status.init();
            if ($('.joolaio.realtime.table').length > 0)
                new joolaio.visualisation.realtime.Table().init();
            if ($('.joolaio.realtime.timeline').length > 0)
                new joolaio.visualisation.realtime.Timeline().init();
        }
        else if ($('.joolaio.panel').length > 0) {//&& joolaio.panelDraw == true) {
            joolaio.debug.log('INFO', 'joolaio.Visualisation', 4, 'Searching for panels on page.');
            if ($('.joolaio.dashboard.panel').length > 0) {
                //new joolaio.visualisation.dashboard.Panel().init(null, null, true);
                //$('.joolaio.dashboard.panel').show();
                joolaio.visualisation.showDashboard(-1);
            }
            else if ($('.joolaio.report.panel').length > 0) {
                joolaio.visualisation.showReport();
                //new joolaio.visualisation.report.Panel().init();
                //$('.joolaio.report.panel').show();
            }
            /*
             else if ($('.joolaio.realtime.panel').length > 0)
             new joolaio.visualisation.realtime.Panel().init(null, null, true);
             */
        }
    });
};

waitforScript = function (id, callback) {
    setTimeout(function () {
        if (joolaio.loaded.indexOf(id) == -1) {
            waitforScript(id, callback);
        }
        else {
            callback();
        }
    }, 100);
};

joolaio.visualisation.init_picker_metrics = function (objects) {
    (objects).each(function (index, item) {
        var $item = $(item);
        var uid = guidGenerator();
        $item.attr('data-uid', uid);

        //init the metric picker
        var o = new joolaio.visualisation.picker.Metrics({
            container: $item,
            placeholdertext: 'Choose a metric...'
        });
    });
};

joolaio.visualisation.init_picker_dimensions = function (objects) {
    (objects).each(function (index, item) {
        var $item = $(item);
        var uid = guidGenerator();
        $item.attr('data-uid', uid);

        //init the metric picker
        var o = new joolaio.visualisation.picker.Dimensions({
            container: $item,
            placeholdertext: 'Choose a dimension...'
        });
    });
};

joolaio.visualisation.init_container_metrics = function (objects) {
    (objects).each(function (index, item) {
        var $item = $(item);
        var uid = guidGenerator();
        $item.attr('data-uid', uid);

        //init the metric picker
        var o = new joolaio.visualisation.container.Metrics({
            container: $item
        });
    });
};

joolaio.visualisation.init_container_dimensions = function (objects) {
    (objects).each(function (index, item) {
        var $item = $(item);
        var uid = guidGenerator();
        $item.attr('data-uid', uid);

        //init the metric picker
        var o = new joolaio.visualisation.container.Dimensions({
            container: $item
        });
    });
};

joolaio.visualisation.lastIntervalLoading = 0;
joolaio.visualisation.showLoading = function (immediate) {
    $('.simpleloading').show();

    $('.container.joolaio').unbind('resize');
    $('.container.joolaio').resize(function () {
        joolaio.debug.log('INFO', 'joolaio.visualisation', 6, 'container resize [2]: ' + ($('.content_wrapper').width() - 1).toString() + 'px');
    });
    $('.container.joolaio').bind('resize', function () {
        joolaio.debug.log('INFO', 'joolaio.visualisation', 6, 'container resize: ' + ($('.content_wrapper').width() - 1).toString() + 'px');

        var $this = $('.joolaio._container');
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

joolaio.visualisation.hideLoading = function () {
    $('.simpleloading').hide();
    $('.overlay').fadeOut().hide();
    $('.launchlink').removeClass('disabled');
}

joolaio.visualisation.setupLoading = function () {
    if (!joolaio.visualisation.loadingDrawn) {
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
            var $this = $('.joolaio._container');
            joolaio.ajaxCounter++;
            joolaio.ajaxCounter = 2;
//            $('.simpleloading').show();

            //$('.joolaio.container').css('opacity', '0.5');

            if ($(".overlay").css('display') == 'none') {
                if (joolaio.ajaxCounter > 1) {
                    joolaio.visualisation.showLoading();

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

            if (joolaio.visualisation.lastIntervalLoading <= 0) {
                joolaio.visualisation.lastIntervalLoading = setInterval(function () {
                    if (joolaio.ajaxCounter > 0 && $(".overlay").css('display') == 'none') {
                        joolaio.visualisation.showLoading();

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
                    else if (joolaio.ajaxCounter <= 0 && $(".overlay").css('display') == 'block') {
                        clearInterval(joolaio.visualisation.lastIntervalLoading);

                        joolaio.visualisation.hideLoading();
                        /*
                         $('.overlay').fadeOut().hide();
                         $('.launchlink').removeClass('disabled');
                         */
                    }
                }, 500);
            }

            //if (timeoutID != 0)
            //    window.clearTimeout(timeoutID);
            /*
             timeoutID = setTimeout(function () {
             $('.simpleloading').hide()

             },30000);
             */
        });

        $(document).ajaxStop(function (e, xhr, settings) {
            joolaio.ajaxCounter--;
            joolaio.ajaxCounter = 0;
            if (joolaio.ajaxCounter < 0)
                joolaio.ajaxCounter = 0;
            if (joolaio.ajaxCounter <= 0) {
                //$('.simpleloading').hide();

                //$('.joolaio.container').css('opacity', '1');

                setTimeout(function () {

                    if (joolaio.ajaxCounter <= 0 && ($(".overlay").css('display') == 'block' || $(".simpleloading").css('display') == 'block')) {
                        clearInterval(joolaio.visualisation.lastIntervalLoading);

                        joolaio.visualisation.hideLoading();
                        /*
                         $('.overlay').fadeOut().hide();
                         $('.launchlink').removeClass('disabled');
                         */
                    }
                }, 500);


                //if (timeoutID != 0)
                //  window.clearTimeout(timeoutID);

                if (!joolaio.inSaveState)
                    joolaio.saveState('State change');
            }
        });


        joolaio.visualisation.loadingDrawn = true;
    }
};

joolaio.visualisation.setupError = function () {
    if (!joolaio.visualisation.errorDrawn) {
        $('body').append('<div id="" class="simpleerror" style="display: none; ">Error.</div>');
        //setup ajax hook

        if (!joolaio.bootstrap) {
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
        joolaio.visualisation.errorDrawn = true;
    }

}
function make_base_auth(user, password) {
    var tok = user + ':' + password;
    var hash = btoa(tok);
    return "Basic " + hash;
}
joolaio.visualisation.showError = function (error) {


    $(joolaio).trigger('joolaio-error', [error]);

    joolaio.visualisation.setupError();

    $('.simpleloading').hide();
    $('.simpleerror').text('Error. Click here to review and report...');

    $('.simpleerror').off('click');
    $('.simpleerror').on('click', function () {
        var $modal_error = $('.modal_error');
        try {
            var serverlog = new joolaio.objects.State().GetLog();

            serverlog = $.parseJSON(serverlog.data).m_serializationArray;
            var $serverlog = $('.serverlog');
            $serverlog.empty();
            var $tr = $('<tr></tr>');
            var $th = $('<th>Timetamp</th>');
            $tr.append($th);
            $th = $('<th>Message</th>');
            $tr.append($th);
            $serverlog.append($tr);

            serverlog.reverse();
            $(serverlog).each(function (index, item) {
                var pattern = /\[(.*?)\]/;

                var timestamp = $.trim(item.split(pattern)[1]).split(' ')[1];
                var message = $.trim(item.split(pattern)[2]);

                $tr = $('<tr></tr>');
                var $td = $('<td class="timestamp">' + timestamp + '</td>');
                $tr.append($td);
                $td = $('<td class="message">' + message + '</td>');
                $tr.append($td);

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

        $modal_error.find('.clientstate').text(JSON.stringify(joolaio.state, null, '\t'));

        $('.btnreport').off('click');
        $('.btnreport').on('click', function () {
            //var url = 'http://support.joolaioanalytics.com/helpdesk/tickets.xml';
            var endPoint = '/Engine/Tickets.aspx';
            if (joolaio.basePath)
                endPoint = joolaio.svcPath + endPoint;

            endPoint = joolaio.hostname + endPoint;

            errormessage += '<br/><br/>\r\n\r\nClient State<hr/><br/>\r\n';
            errormessage += JSON.stringify(joolaio.state, null, '\t');

            errormessage += '<br/><br/>\r\n\r\nServer Log<hr/><br/>\r\n';
            //errormessage+='<table><tr><th>Timestamp</th><th>Message</th></tr>';
            $(serverlog).each(function (index, item) {
                var pattern = /\[(.*?)\]/;

                var timestamp = $.trim(item.split(pattern)[1]).split(' ')[1];
                var message = $.trim(item.split(pattern)[2]);

                errormessage += '' + timestamp + ': ' + message + '<br/>\r\n';
            });
            //errormessage+='</table>';


            var _xml = '';
            _xml += '<helpdesk_ticket><description>' + errormessage + '</description>';
            _xml += '<subject>Exception reported from JA.</subject>';
            _xml += '<email>' + joolaio.user.email + '</email>';
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

                    xmlDoc = $.parseXML(data),
                        $xml = $(xmlDoc),
                        $title = $xml.find("display-id");

                    $modal_error.modal('hide');
                    $('.simpleerror').hide();

                },
                error: function (e, e1, e2) {

                }
            });

        });

        $modal_error.modal('show');

    });

    $('.simpleerror').show();

    $('.joolaio._container').css('opacity', '1');

    setTimeout(function () {
        $('.simpleerror').hide()
    }, 15000);
}

joolaio.visualisation.showNotice = function () {

}

joolaio.visualisation.setDisplay = function (show) {

    var $body = $('body');
    var $joolaio = $('.joolaio._container');
    var $report = $body.find('.joolaio.report.panel');
    var $dashboard = $body.find('.joolaio.dashboard.panel');
    var $realtime = $('.joolaio.realtime.panel');
    var $datebox = $body.find('.joolaio.picker.datebox');

    var $editbutton = $body.find('.panel-edit');
    var $addwidgetbutton = $body.find('.widget-add');

    $('.report.editor').hide();

    switch (show) {
        case 'homepage':
            //$joolaio.hide();
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

            $joolaio.show();
            break;
        case 'dashboard':

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

            $joolaio.show();

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

            $joolaio.show();
            break;
        default:
            //$joolaio.hide();
            //$body.find('.homepage').show();
            break;
    }

    var $head = $('.jumbotron.subhead');
    var $panel = $('.joolaio._container .joolaio.report.panel');
    $head.show();
    $panel.show();
}

joolaio.visualisation.reportInit = false;
joolaio.visualisation.reportWrapper = null;
joolaio.visualisation.dashboardInit = false;
joolaio.visualisation.dashboardWrapper = null;
joolaio.visualisation.realtimeInit = false;
joolaio.visualisation.realtimeWrapper = null;

joolaio.visualisation.dateBoxInit = false;

joolaio.visualisation.showHomepage = function (reportID, redraw) {
    joolaio.visualisation.setDisplay('homepage');
};

joolaio.visualisation.showReport = function (reportID, redraw) {

    joolaio.visualisation.setDisplay('report');

    if (joolaio.visualisation.dashboardWrapper)
        joolaio.visualisation.dashboardWrapper.dispose();

    joolaio.visualisation.report.globalfilter = '';
    joolaio.reportID = reportID;

    if (!joolaio.visualisation.reportInit) {
        joolaio.visualisation.reportWrapper = new joolaio.visualisation.report.Panel({reportID: reportID});
        joolaio.visualisation.reportInit = true;
    }

    var tabID = 0;
    var metricgroupID = 0;
    if (joolaio.state) {
        tabID = joolaio.state.tabID;
        metricgroupID = joolaio.state.metricgroupID;
    }
    if (tabID == null || typeof tabID == 'undefined')
        tabID = 0;
    if (metricgroupID == null || typeof metricgroupID == 'undefined')
        metricgroupID = 0;
    joolaio.visualisation.reportWrapper.init({reportID: reportID, tabID: tabID, tabType: 'explorer', metricgroupID: metricgroupID}, $('.joolaio.report.panel'), true, true, true);
    //scrollTop();

    $(joolaio).trigger('setreport', joolaio.visualisation.reportWrapper.reportID);

};

joolaio.visualisation.showDashboard = function (dashboardID) {

    joolaio.visualisation.setDisplay('dashboard');

    if (joolaio.visualisation.reportWrapper)
        joolaio.visualisation.reportWrapper.dispose();

    //joolaio.visualisation.dashboard.globalfilter = '';
    joolaio.dashboardID = dashboardID;

    if (!joolaio.visualisation.dashboardInit) {
        joolaio.visualisation.dashboardWrapper = new joolaio.visualisation.dashboard.Panel({panelID: dashboardID});
        joolaio.visualisation.dashboardInit = true;
    }
    joolaio.visualisation.dashboardWrapper.init({panelID: dashboardID}, $('.joolaio.dashboard.panel'), true, true, true);
    //scrollTop();

    $(joolaio).trigger('setdashboard', joolaio.visualisation.dashboardWrapper.panelID);
};

joolaio.visualisation.showRealtimePanel = function (panelID) {
    joolaio.visualisation.setDisplay('realtime');

    //joolaio.visualisation.dashboard.globalfilter = '';
    joolaio.panelID = panelID;

    if (!joolaio.visualisation.realtimeInit) {
        joolaio.visualisation.realtimeWrapper = new joolaio.visualisation.realtime.Panel({panelID: panelID});
        joolaio.visualisation.realtimeInit = true;
    }
    joolaio.visualisation.realtimeWrapper.init({panelID: panelID}, $('.joolaio.realtime.panel'), true, true, true);
    //scrollTop();
};

joolaio.visualisation.bootstrap = function () {
    joolaio.debug.log('INFO', 'joolaio.visualisation', 6, 'Bootstrap...');

    if (!joolaio.bootstrap) {
        joolaio.debug.log('INFO', 'joolaio.visualisation', 6, 'Bootstrap is not needed.');
        return;
    }


    //if (!joolaio.visualisation.dateBoxInit) {
    joolaio.debug.log('INFO', 'joolaio.visualisation', 6, 'Bootstrapping Datebox');
    joolaio.visualisation.picker.DateBox.init();
    joolaio.visualisation.dateBoxInit = true;
    // }

    joolaio.visualisation.setupLoading();
    joolaio.visualisation.setupError();

    /*
     if (joolaio.state.view == 'homepage')
     joolaio.visualisation.showHomepage();
     else if (joolaio.state.view == 'report')
     joolaio.visualisation.showReport(joolaio.state.reportID);
     else if (joolaio.state.view == 'dashboard')
     joolaio.visualisation.showDashboard(joolaio.state.dashboardID);
     else if (joolaio.state.view == 'realtime')
     joolaio.visualisation.showRealtimePanel(joolaio.state.panelID);
     */

    $(joolaio).unbind('homepage');
    $(joolaio).bind('homepage', function (e) {
        joolaio.state = {};
        joolaio.visualisation.picker.DateBox.init();
        joolaio.visualisation.showHomepage();
    });
    $(joolaio).unbind('reportchange');
    $(joolaio).bind('reportchange', function (e, reportID) {
        joolaio.state['timeline-1234'] = null;
        joolaio.state['table-1234'] = null;

        if (joolaio.visualisation.reportWrapper) {
            try {
                joolaio.visualisation.reportWrapper.dispose();
            } catch (ex) {
            }
        }
        joolaio.state.dashboardID = null;
        joolaio.state.reportID = null;
        joolaio.state.tabID = null;
        joolaio.state.metricgroupID = null;
        joolaio.state.tabType = null;

        joolaio.visualisation.showReport(reportID);
    });
    $(joolaio).unbind('dashboardchange');
    $(joolaio).bind('dashboardchange', function (e, dashboardID) {

        joolaio.visualisation.showDashboard(dashboardID);
    });
    $(joolaio).unbind('realtimepanelchange');
    $(joolaio).bind('realtimepanelchange', function (e, panelID) {
        joolaio.visualisation.showRealtimePanel(panelID);
    });

    $('.homepagelink').off('click');
    $('.homepagelink').on('click', function () {
        joolaio.state.view = 'homepage';
        joolaio.saveState('Homepage switch');
        $(joolaio).trigger('homepage');
    });

};

joolaio.debug.log('INFO', 'joolaio.Visualisation', 6, 'JS source loaded');

//joolaio.visualisation.init();