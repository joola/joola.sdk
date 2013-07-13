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
    //console.log('c');
    if (jarvis.managestate)
        updateState(location.hash)
});

if (location.hash == '') {
    jarvis.state.view = 'dashboard';
}
else {

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