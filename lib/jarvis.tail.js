try {
    jarvis.USER = new jarvis.objects.Auth().GetUser();
    //console.log('juser', jarvis.USER);
    jarvis.USER.Display = jarvis.USER[Object.keys(jarvis.USER)[0]];
    $('.loginname').prepend(jarvis.USER.Display);
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
            if (xhr.status == 500||xhr.readyState!=0) {
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


    jQuery.fn.animateAuto = function(prop, speed, callback){
        var elem, height, width;
        return this.each(function(i, el){
            el = jQuery(el), elem = el.clone().css({"height":"auto","width":"auto"}).appendTo("body");
            height = elem.css("height"),
                width = elem.css("width"),
                elem.remove();

            if(prop === "height")
                el.animate({"height":height}, speed, callback);
            else if(prop === "width")
                el.animate({"width":width}, speed, callback);
            else if(prop === "both")
                el.animate({"width":width,"height":height}, speed, callback);
        });
    }

});