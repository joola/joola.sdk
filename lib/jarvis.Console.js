jarvis.provide('jarvis.Console');

jarvis.require('jconsole');
jarvis.require('xregexp');
jarvis.require('jarvis.visualisation.realtime');
jarvis.require('google.base');

var consoleheight = 450;

var optionGroups = [];
var traceLevel = 10;

var initialPrompt = 'query fetch ("2012-10-01T00:00:00", "2012-10-30T23:59:59.999", "Game", "Session Count, Player Count", "Day", "true", "", "", "", "0", "false")'
//var initialPrompt = 'cache build ("Tracking", "2012-05-01", "2012-06-30 23:59:59.999", "Hour", "false", "false")';

consoleheight = Math.round($(window).height() - ($(window).height() * 0.26));

//console.log($(window).height());

jarvis.Console = function (Container) {
    //console.log(Container);
    this._moduleName = 'Console';
    this.Container = Container;

    var _html = '';
    _html = '<div class="bottomwrapper">' +
        '<div class="logwrapper">' +
        '<div class="logheader" style="display: none">' +
        '<div class="minimize" style="float:right;margin-right:5px;margin-top:3px;cursor:pointer;"><i class="icon-chevron-down"></i></div>' +
        '</div>' +
        '<div id="log" style="display:block;height:0;"></div>' +
        /*'<div class="logfooter" style="display: none">' +
        '<div class="type" style="margin-right:10px;margin-top:5px;float:right;">' +
        '<span class="" style="display: inline;float:left;margin-right:8px;margin-top:2px;">Severity </span>' +

        '<div class="btn-group" data-toggle="buttons-radio" style="display: inline;">' +
        '<button class="btn btn-mini active">All</button>' +
        '<button class="btn btn-mini">Errors</button>' +
        '<button class="btn btn-mini">Warnings</button>' +
        '<button class="btn btn-mini">Logs</button>' +
        '</div>' +
        '</div>' +
        '<div class="source" style="margin-top:5px;float:right;white-space: nowrap;margin-right:30px;">' +
        '<span class="" style="display: inline;float:left;margin-right:8px;margin-top:2px;">Source </span>' +

        '<div class="btn-group" data-toggle="buttons-radio" style="display: inline;">' +
        '<button class="btn btn-mini active">All</button>' +
        '<button class="btn btn-mini">Query</button>' +
        '<button class="btn btn-mini">Cache</button>' +
        '<button class="btn btn-mini">Database</button>' +
        '</div>' +
        '<span class="divider-vertical" style="height:26px;width:1px;font-size:20px;margin-left:20px;">|</span>' +
        '</div>' +
        '</div>' +*/
        '</div>' +
        '<div class="jarvisPrompt">' +
        '</div>' +
        '</div>';

    $(this.Container).append(_html);

    var timer = goog.now();

    //var comet = new JAPI.Visualisation.Realtime();

    //var channelName = comet.CometConnect(null, cometReceiveCallback, 'tracer');
    if (jarvis.visualisation.realtime.connected) {
        jarvis.debug.log('INFO', 'Subscribing to comet channel (already connected) - ' + 'tracer', 6, 'JS source loaded');
        //console.log('subscribing to comet channel (already connected) - '  + key);

        var client_id = PokeIn.GetClientId();
        var queryOptions = {
            ClientID:client_id
        };
        jarvis.dataaccess.fetch(this, '/engine/Realtime.svc/trace', queryOptions, function () {
        });

        //pCall['JarvisMessage'].Subscribe('', metric, '', 'Timeline', 1);
    }
    else {
        //console.log('subscribing to comet channel (bind) - '  + key);
        jarvis.debug.log('INFO', 'Subscribing to comet channel (bind) - ' + 'tracer', 6, 'JS source loaded');

        $(jarvis.realtime).bind('cometstart', function (e) {
            //console.log('calling subscribe');
            //jarvis.debug.log('INFO', 'Subscribing to comet channel (already connected) - '  + key, 6, 'JS source loaded');

            var client_id = PokeIn.GetClientId();
            var queryOptions = {
                ClientID:client_id
            };
            jarvis.dataaccess.fetch(this, '/engine/Realtime.svc/trace', queryOptions, function () {
            });

            //pCall['JarvisMessage'].Subscribe('', metric, '', 'Timeline', 1);
        });
    }

    window.jarvisResponse_Trace = this.jarvisResponse_Trace;

    _console = window.console;
    window.console = {
        log:function (msg) {
            /*if (typeof(msg) == 'object')
             logger.info(goog.debug.expose(msg));
             else
             logger.info(msg);*/
            _console.log.apply(_console, [msg]);
        },
        error:function (msg) {
            logger.severe(msg);
            //_console.error.apply(_console, [msg]);
        },
        info:function (msg) {
            logger.info(msg);
            //_console.info.apply(_console, [msg]);
        },
        shout:function (msg) {
            logger.shout(msg);
            //_console.info.apply(_console, [msg]);
        },
        fine:function (msg) {
            logger.fine(msg);
            //_console.info.apply(_console, [msg]);
        },
        finer:function (msg) {
            logger.finer(msg);
            //_console.info.apply(_console, [msg]);
        },
        finest:function (msg) {
            logger.finest(msg);
            //_console.info.apply(_console, [msg]);
        }
    };

    goog.debug.LogManager.getRoot().setLevel(goog.debug.Logger.Level.ALL);
    var logger = goog.debug.Logger.getLogger('Jarvis');
    var logconsole = new goog.debug.DivConsole(goog.dom.getElement('log'));
    logconsole.setCapturing(true);

    var jarvisPrompt = $('.jarvisPrompt');
    //$('body').append(jarvisPrompt);
    var controller2 = jarvisPrompt.console({
        promptLabel:'Jarvis> ',
        animateScroll:true,
        autofocus:true,
        promptHistory:true,
        commandValidate:function (line) {
            return (line != "");
        },
        commandHandle:function (line) {
            //try {
            console.finest('> ' + line);

            var shouldExecuteEndPoint = true;

            var endPoint = '';
            var command = $.trim(line).toLowerCase().split(' ');
            if (command.length == 1) {
                var $command = $.trim(command[0]);
                //console.log('single param - ' + $command);

                //switch ($command) {
                if ($command == 'help') {
                    console.info(usage());
                    return true;

                }
                else if ($command == 'clear') {
                    logconsole.clear();
                    return true;

                }
                else if ($command == 'stage') {
                    //do nothing
                }
                else if ($command.indexOf('trace') > -1) {
                    var _tracelevel = $command.split('=')[1];
                    traceLevel = parseInt(_tracelevel);
                    console.info('Trace level set to ' + traceLevel);

                }
                else {
                    var found = false;
                    $(optionGroups).each(function (index, optionGroup) {
                        if (optionGroup.name.toLowerCase() == $command) {
                            found = true;
                            //console.log('found command');
                        }
                    });
                    if (!found) {
                        shouldExecuteEndPoint = false;
                        console.error('Command not found. Please type \'help\' for a complete list of commands.');
                        return true;
                    }
                    else {
                        shouldExecuteEndPoint = false;
                        console.error('Option not specified or incorrect. Please type \'help\' for a complete list of commands.');
                        return true;
                    }

                }
            }
            else {
                var $command = $.trim(command[0]);
                var $action = $.trim(command[1]);

                //(?<quote>["]?)(?<param>(?:\k<quote>{2}|[^"]+)*)\k<quote>[,|\)]+
                var re = /("([^"]*)")/g;
                var $params = line.match(re);
                $($params).each(function (index, item) {
                    item = item.replace(/"/g, '');
                });

                //console.log('command - ' + $command + ' action - ' + $action);

                var found = false;
                $(optionGroups).each(function (index, optionGroup) {
                    if (optionGroup.name.toLowerCase() == $command) {
                        found = true;
                        //console.log('found command');
                        var optionfound = false;
                        $(optionGroup.methods).each(function (index, method) {
                            if (method.name.toLowerCase() == $action) {
                                optionfound = true;
                                endPoint = optionGroup.endPoint + '/' + $action + '?';
                                //console.log('found action');
                                try {
                                    $(method.params).each(function (index, param) {
                                        //console.log('working on param: ' + param.name)
                                        if ($params[index] == null || $params[index] == 'undefined') {
                                            //console.log(param);
                                            //console.log(param.type + ' - b');
                                            if (param.type == 'dateTime')
                                                param.value = '1900-01-01';
                                            else if (param.type == 'TimeResolution')
                                                param.value = 'Day';
                                            else if (param.type == 'boolean')
                                                param.value = false;
                                            else
                                                param.value = '';
                                            endPoint += param.name + '=' + param.value + '&';
                                            //throw 'missing param';
                                        }
                                        else {
                                            //console.log(param);
                                            //console.log(param.name + ' - a');
                                            param.value = $params[index].replace(/"/g, '');
                                            endPoint += param.name + '=' + param.value + '&';
                                        }
                                    });
                                }
                                catch (ex) {
                                    shouldExecuteEndPoint = false;
                                    console.error('Option not specified or incorrect. Please type \'help\' for a complete list of commands - ' + ex);
                                    return true;
                                }
                            }
                        });
                        if (!optionfound) {
                            shouldExecuteEndPoint = false;
                            console.error('Option not specified or incorrect. Please type \'help\' for a complete list of commands.');
                            return true;
                        }
                    }
                });
                if (!found) {
                    console.error('Command not found. Please type \'help\' for a complete list of commands.');
                    return false;
                }
            }

            if (!shouldExecuteEndPoint)
                return true;

            if (endPoint.substring(endPoint.length - 1) == '&')
                endPoint = endPoint.substring(0, endPoint.length - 1);

            //caching build analytics.vw_sessions 2012-06-01 2012-06-05 Day


            $.get(jarvis.JarvisPath + endPoint, function (result) {
                //var s = '< ' + endPoint + '\n';
                var s = '';
                if (result.d == null)
                    return;
                if (typeof(result.d.data) == 'object') {
                    $(result.d.data).each(function (index, item) {
                        //console.log(item);
                        if (typeof(item) == 'object') {
                            //console.log(item);
                            $(item).each(function (index, prop) {
                                if (typeof(prop) == 'object') {
                                    //console.log(prop)
                                    s += goog.debug.deepExpose(prop) + '\n';
                                    //s+=prop;
                                }
                                else
                                    s += prop + '\n';
                            });

                        }
                        else
                            s += item + '\n';
                    });
                }
                else {
                    try {
                        var obj = jQuery.parseJSON(result.d.data);
                        s += '\n';

                        //console.log(obj);

                        //$(obj).each(function (index, prop) {
                        if (typeof(obj) == 'object') {
                            //console.log(prop)
                            //s += goog.debug.deepExpose(prop) + '\n';
                            var list = '';
                            $.each(obj, function (index, item) {
                                list += recurse(index, item, 0)
                            });
                            s += list;

                            //s += prop + '\n';
                        }
                        else
                            s += obj + '\n';
                        // });
                        //s += result.d.data;
                    }
                    catch (ex) {
                        //alert('exception');
                        s += result.d.data;
                    }

                }
                if ($.trim(s) != '') {
                    //console.log(s);
                    console.info(s.replace(/	/g, '    '));

                    $('.consoleobject ul.container:last-of-type').each(function (index, item) {
                        var $li = $(this).parent();
                        $li.off('click');
                        $li.on('click', function (e) {
                            e.stopPropagation();

                            $(this).toggleClass('on');
                            $($(this).find('.container')[0]).toggleClass('on');
                        });

                    });
                }
            });
            //console.finest('< '  + endPoint);

            return true;
            /*}
             else {
             var ret = eval(line);
             if (typeof ret != 'undefined') return ret.toString();
             else return true; //}
             }
             */
            //catch (e) { return e.toString(); }
        }

        //welcomeMessage:'Enter some JavaScript expressions to evaluate.'
    });

    console.finer('Jarvis Console Started.');
    console.finer('For a list of commands, type \'help\'');

    controller2.promptText(initialPrompt);
    //controller2.promptText('');
    $('.jarvisPrompt').keyup(function (e) {
        if ($('#log').height() == 0) {
            $('#log').animate({height:consoleheight}, 200);
            $('#log').addClass('expanded');

            $('.logheader').show();
            $('.logfooter').show();

            $(this).css({opacity:1});
            //$('.reportWrapper').children().each(function (index, item) {$(this).css({display:'none'})});
        }
    });
    $('.jarvisPrompt').click(function (e) {
        if ($('#log').height() == 0) {
            $('#log').animate({height:consoleheight}, 200);
            $('#log').addClass('expanded');

            $('.logheader').show();
            $('.logfooter').show();

            $(this).css({opacity:1});
            //$('.reportWrapper').children().each(function (index, item) {$(this).css({display:'none'})});
        }
    });

    $('.logwrapper').click(function (e) {
        e.stopPropagation();
    });

    /*
     $('#log').click(function (e) {
     e.stopPropagation();

     var inner = $('.jquery-console-inner');
     var typer = jarvisPrompt.find('textarea');
     inner.addClass('jquery-console-focus');
     inner.removeClass('jquery-console-nofocus');
     typer.focus();
     });
     */
    $('.minimize').click(function (e) {
        //console.log($('#log').height());
        //console.log(consoleheight);
        if ($('#log').height() == consoleheight) {
            $('#log').animate({height:0}, 200);
            $('#log').removeClass('expanded');
            $('.logheader').hide();
            $('.logfooter').hide();

            $('.jarvisPrompt').css({opacity:0.8});
            //$('.reportWrapper').css({display:'block'});
        }
    });

    $(document).click(function (e) {
        if ($('#log').height() == consoleheight) {
            $('#log').animate({height:0}, 200);
            $('#log').removeClass('expanded');
            $('.logheader').hide();
            $('.logfooter').hide();

            $('.jarvisPrompt').css({opacity:0.8});
            //$('.reportWrapper').css({display:'block'});
        }
    });


    buildOptionGroup('/engine/DataSources.svc');
    buildOptionGroup('/engine/DataTables.svc');
    buildOptionGroup('/engine/Dimensions.svc');
    buildOptionGroup('/engine/Metrics.svc');
    buildOptionGroup('/engine/DBMapper.svc');
    buildOptionGroup('/engine/Cache.svc');
    buildOptionGroup('/engine/Query.svc');
    buildOptionGroup('/engine/Realtime.svc');
    buildOptionGroup('/engine/RealtimePanels.svc');
    buildOptionGroup('/engine/Config.svc');
    buildOptionGroup('/engine/License.svc');
    buildOptionGroup('/engine/Reports.svc');

    //$('.jarvisPrompt').keydown();
}

function pad(str, padsize) {
    for (i = str.length; i < padsize; i++)
        str += ' ';
    return str;
}

var _lasttrace = null;
jarvis.Console.prototype.jarvisResponse_Trace = function (message) {
    //console.log(message);
    //return;
    /*var _data = args.data;
     if (_data != _lasttrace)
     _lasttrace = _data;
     else
     return;*/

    $(message).each(function (index, result) {
        //console.log(result);
        var source = result.module;
        var type = result.type;
        var message = result.message;
        var _traceLevel = result.traceLevel;

        if (_traceLevel <= traceLevel || type != 'Info') {
            switch (type) {
                case "Info":
                    console.info(message);
                    break;
                case "Warning":
                    console.shout(message);
                    break;
                case "Error":
                    console.error(message);
                    break;
                case "Shout":
                    console.shout(message);
                    break;
                default:
                    break;
            }
        }

    });


    //console.log(_data.results[0]);
}


function usage() {
    var s = '< Showing usage\n';
    s += 'This console allows you to control and manage Jarvis\' different components with a set of optiond and commands.\n\n';
    s += 'Usage:\n  command [options] ([parameter], [...])\n\n';
    s += 'General commands:\n';
    s += ' ' + pad(' help', 20) + ' prints this help message, then exists.\n';
    s += ' ' + pad(' clear', 20) + ' resets the console.\n';
    //s += ' ' + pad(' uptime', 20) + ' prints the engine\'s uptime.\n';
    s += ' ' + pad(' state', 20) + ' shows the engine\'s current state and stats.\n';
    s += ' ' + pad(' trace=LEVEL', 20) + ' starts the server\'s trace with the specified trace level (1-10, 10 being most verbose, current: ' + traceLevel + ')).\n';
    s += '\n';

    optionGroups = $(optionGroups).sort(function (a, b) {
        return a.name > b.name ? 1 : -1;
    });

    $(optionGroups).each(function (index, optionGroup) {
        s += optionGroup.name + ' command options: \n';
        $(optionGroup.methods).each(function (index, method) {
            var methodtext = ' ';
            methodtext += ' ' + pad(method.name, 19) + ' ';
            if (method.description.length > 0)
                methodtext += method.description;
            methodtext += '\n';
            if (method.params.length > 0) {
                methodtext += pad('', 5);
                $(method.params).each(function (index, param) {
                    methodtext += '-' + param.name + ':' + param.type + ' ';
                });
                methodtext += '\n';
            }
            s += methodtext;
        });
        s += '\n';
    });

    /*
     s += 'Cache command options:\n';
     s += ' ' + pad(' state [-tablename]', 40) + ' shows the current Cache engine state and stats.\n';
     s += ' ' + pad(' build -tablename -fromdate -todate ', 40) + ' build a cache table from a source table.\n';
     s += ' ' + pad(' extend -tablename -date', 40) + ' extend the specified cache table to a new date limit.\n';
     s += ' ' + pad(' refresh -table', 40) + ' Refreshes the cache of the specified table.\n';
     s += ' ' + pad(' flush -table', 40) + ' Purges the cache of the specified table.\n';*/
    //s += ' ' + pad(' purge=INTERVAL', 20) + ' purge a specific part of the cache ([S]econds, [M]inutes, [H]ours, [D)ays).\n';
    //s += ' ' + pad(' purgeall', 20) + ' purges the entire cache.\n';
    s += '\n';
    return s;
}

function buildOptionGroup(endPoint) {

    var optionGroup = {
        endPoint:endPoint,
        name:endPoint.split('/')[endPoint.split('/').length - 1].replace('.svc', ''),
        methods:[]
    };

    $.get(jarvis.JarvisPath + endPoint + '?xsd=xsd0', function (xml) {
            var inputs = xml;
            var xml = $.get(jarvis.JarvisPath + endPoint + '?wsdl', function (xml) {
                $(xml).find('operation').each(function (index, item) {
                    var summary = $(item).find('summary').text();
                    var $input = $(item).find('input');
                    var action = $input.attr('wsaw:Action').split('/')[$input.attr('wsaw:Action').split('/').length - 1]

                    var method = {
                        name:action,
                        description:summary,
                        params:[]
                    };

                    $(inputs).find('xs\\:element[name="' + action + '"]').each(function (index, item) {
                        $(item).find('element').each(function (index, item) {
                            method.params.push({name:$(this).attr('name'), type:$(this).attr('type').replace('xs:', '').replace(/q\d:/, '').replace(/q\d\d:/, '')});

                        })
                    });
                    optionGroup.methods.push(method);
                });
                optionGroups.push(optionGroup);
            });

        }
    );

//console.log(optionGroup);

}

function recurse(key, val, level) {
    //console.log(list);
    var list = '';
    var _html = '';

    //console.log(typeof val);

    if (level == 0)
        list = '<ul class="consoleobject">';

    if (typeof val == "function") {
        //alert('func');
        list += '<li class="node leaf ' + 'level_' + level + '">';
        list += '<span class="key">' + key + '</span>: <span class="value ' + typeof(val) + '">' + val + '</span>';
    }
    else if (val instanceof Object) {
        list += '<li class="node ' + 'level_' + level + '">';
        list += '<span class="key">' + key + '</span>: <span class="value Object">Object</span><ul class="container">';
        $.each(val, function (index, item) {
            list += recurse(index, item, level + 1);
        });

        list += "</ul>";
    }
    else {
        list += '<li class="node leaf ' + 'level_' + level + '">';
        if (typeof(val) == 'string' && val.indexOf('\r\n') > -1) {

            val = val.replace(/\r\n/g, '<br/>');
            val = val.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');

        }
        else if (typeof(val) == 'string' && val.indexOf('/Date(') > -1) {
            try {
                val = parseInt(val.replace('/Date(', '').replace(')/', ''));
                val = new Date(val);
            }
            catch (e) {
            }
        }
        list += '<span class="key">' + key + '</span>: <span class="value ' + typeof(val) + '">' + (typeof(val) == 'string' ? '"' + val + '"' : val) + '</span>';
    }
    list += "</li>";

    if (level == 0)
        list += "</ul>";

    _html = list;
    return _html;
}

//goog.require('goog.debug');
//goog.require('goog.debug.DivConsole');
//goog.require('goog.debug.Logger');

jarvis.debug.log('INFO', 'Jarvis.Console', 6, 'JS source loaded');

/*
$().ready(function (e) {
    new jarvis.Console($('.container')[1]);

    // using the event helper
    $('#log').mousewheel(function(e, delta) {
        var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;

        if (delta > 0 && $(this).scrollTop() <= 0)
            return false;
        if (delta < 0 && $(this).scrollTop() >= this.scrollHeight - $(this).height())
            return false;

        return true;
    });
});

*/