try {
    new jarvis.objects.Auth().GetUser(this, {}, function (sender, user) {
        jarvis.USER = user;
        $('.loginname').prepend(jarvis.USER.displayName);
    });

}
catch (ex) {
    console.log(ex);
    //location.href = '/logout.aspx';
}

$.ajaxSetup({
    statusCode: {
        401: function () {
            //location.href = "./login.aspx";
        },
        500: function (e, e1, e2) {
            if (xhr.status == 500 || xhr.readyState != 0) {
                jarvis.visualisation.showError({Message: msg, Url: url, Line: line});
            }
        }
    }
});
$(window).hashchange(function () {

    if (jarvis.managestate)
        updateState(location.hash)
});

if (location.hash == '') {
    jarvis.state.view = 'dashboard';
}
else {

}

window.fork = function (async_calls, shared_callback) {
    var counter = async_calls.length;
    var all_results = [];

    function makeCallback(index) {
        return function () {
            counter--;
            var results = [];
            // we use the arguments object here because some callbacks
            // in Node pass in multiple arguments as result.
            for (var i = 0; i < arguments.length; i++) {
                results.push(arguments[i]);
            }
            all_results[index] = results;
            if (counter == 0) {
                shared_callback(all_results);
            }
        }
    }

    for (var i = 0; i < async_calls.length; i++) {
        try {
            async_calls[i](makeCallback(i));
        }
        catch (ex) {
            console.log('Forked thread failed: ' + ex.message);
            console.log(ex.stack);
        }

    }
};

$(window).bind('jarvis-loaded', function () {
    var calls = [];

    var call = function (callback) {
        jarvis.objects.Dashboards.List(null, null, function () {
            callback();
        });
    };
    calls.push(call);
    call = function (callback) {
        jarvis.objects.Reports.List(null, null, function () {
            callback();
        });
    };
    calls.push(call);
    call = function (callback) {
        jarvis.objects.Dimensions.List(null, null, function () {
            callback();
        });
    };
    calls.push(call);
    call = function (callback) {
        jarvis.objects.Metrics.List(null, null, function () {
            callback();
        });
    };
    calls.push(call);
    call = function (callback) {
        new jarvis.objects.Query().SystemStartDate(this, {}, function () {
            callback();
        });
    };
    calls.push(call);
    var call = function (callback) {
        new jarvis.objects.Query().SystemEndDate(this, {}, function () {
            callback();
        });
    };
    calls.push(call);
    fork(calls, function () {
        $(window).trigger('jarvis-initialized');
        $(jarvis).trigger('jarvis-initialized');

        var checkToken = function () {
            new jarvis.objects.Auth().checkToken(this, {token: jarvis.TOKEN}, function (sender, result, err) {
                if (result != true)
                    $(jarvis).trigger('jarvis-session-timeout');
            });
            setTimeout(function () {
                checkToken();
            }, 1000 * 60 * 1);
        };

        setTimeout(function () {
            checkToken();
        }, 1000 * 60 * 20);
    });
});

function extend(a, b, context, newobjs, aparent, aname, haveaparent) // context is anti circular references mechanism
{
    if (a == b) {
        return a;
    }
    if (!b) {
        return a;
    }

    var key, clean_context = false, return_sublevel = false, b_pos;
    if (!haveaparent) {
        aparent = {'a': a};
        aname = 'a';
    }
    if (!context) {
        clean_context = true;
        context = [];
        newobjs = [];
    }
    b_pos = context.indexOf(b);
    if (b_pos == -1) {
        context.push(b);
        newobjs.push([aparent, aname]);
    } else {
        return newobjs[b_pos][0][ newobjs[b_pos][1] ];
    }

    for (key in b) {
        if (b.hasOwnProperty(key)) {
            if (typeof a[key] === 'undefined') {
                if (typeof b[key] === 'object') {
                    if (b[key] instanceof Array) // http://javascript.crockford.com/remedial.html
                    {
                        a[key] = extend([], b[key], context, newobjs, a, key, true);
                    }
                    else if (b[key] === null) {
                        a[key] = null;
                    }
                    else if (b[key] instanceof Date) {
                        a[key] = new b[key].constructor();
                        a[key].setTime(b[key].getTime());
                    }
                    else {
                        a[key] = extend({}, b[key], context, newobjs, a, key, true);
                        /*a[key].constructor = b[key].constructor;  a[key].prototype = b[key].prototype;*/
                    }
                }
                else {
                    a[key] = b[key];
                }
            }
            else if (typeof a[key] === 'object' && a[key] !== null) {
                a[key] = extend(a[key], b[key], context, newobjs, a, key, true);
                /*a[key].constructor = b[key].constructor;  a[key].prototype = b[key].prototype;*/
            }
            else {
                a[key] = b[key];
            }
        }
    }
    if (clean_context) {
        context = null;
        newobjs = null;
    }
    if (!haveaparent) {
        aparent = null;
        return a;
    }
    if (typeof a === 'object' && !(a instanceof Array)) {
        /*a.constructor = b.constructor;
         a.prototype   = b.prototype*/
        ;
    }
    return a;
}


function cloneextend(obj, exteddata) {
    if (typeof obj === 'object') {
        if (obj === null) {
            return null;
        }
        return extend(clone(obj), exteddata);
    }
    return obj;
}


$().ready(function (e) {
    jarvis.visualisation.init();
    updateState(location.hash, true);
    $(window).trigger('jarvis-loaded');

    jQuery.fn.animateAuto = function (prop, speed, callback) {
        var elem, height, width;
        return this.each(function (i, el) {
            el = jQuery(el), elem = el.clone().css({"height": "auto", "width": "auto"}).appendTo("body");
            height = elem.css("height"),
                width = elem.css("width"),
                elem.remove();

            if (prop === "height")
                el.animate({"height": height}, speed, callback);
            else if (prop === "width")
                el.animate({"width": width}, speed, callback);
            else if (prop === "both")
                el.animate({"width": width, "height": height}, speed, callback);
        });
    }

});
