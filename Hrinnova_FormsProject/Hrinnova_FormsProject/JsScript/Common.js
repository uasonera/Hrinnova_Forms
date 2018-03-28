// JScript File

function CallPageMethod(methodName, onSuccess, onFail) {
    var args = '';

    var l = arguments.length;

    if (l > 3) {
        for (var i = 3; i < l - 1; i += 2) {

            if (args.length != 0) args += ',';

            args += '"' + arguments[i] + '":"' + arguments[i + 1] + '"';
        }

    }

    var loc = window.location.href;

    //loc = (loc.substr(loc.length - 1, 1) == "/") ? loc + "Projectselection" : loc;
    loc = "../Admin/Projectselection.aspx"
    //            loc = "../App_Code/MasterMethods.cs"
    //alert(loc + "/" + methodName);
    $.ajax({
        type: "POST",

        url: loc + "/" + methodName,

        data: "{" + args + "}",

        contentType: "application/json; charset=utf-8",

        dataType: "json",

        success: onSuccess,

        fail: onFail

    });

}

function success(response) {
    //alert(response.d);
    //
    ShowResult(response.d.toString());
}

function fail(response) {

    alert("An error occurred." + response);

}

function ShowResult(resultans) {
        //$('#popup_box').center();

    $('.ltrAlert').text(resultans);
    var startLeft = $(window).width() / 2 - ($("#popup_box").width() / 2);

    $("#popup_box").css("position", "fixed");
    $("#popup_box").css("top", "0px");
    $("#popup_box").css("left", startLeft + "px");
    ShowAlert();


}

function ShowResult2(arg, context) {

    //alert("arg:" + arg);
    if (arg == "True") {
        $(".EmpImg").attr("src", "../Employee/Images/User.png");
        $('.ltrAlert').text("Removed profile photo succussfully. Please refresh page or remove browser cache.");
        var startLeft = $(window).width() / 2 - ($("#popup_box").width() / 2);

        $("#popup_box").css("position", "fixed");
        $("#popup_box").css("top", "0px");
        $("#popup_box").css("left", startLeft + "px");
    }
    else {
        $('.ltrAlert').text("Error occurred please report this error:-->" + arg);
    }
    ShowAlert();

}
function ClientCallbackError(result, context) {
    alert(result);
}

function unloadPopupBox() {
    //$('#popup_box').slideUp(300).fadeOut(10000);
    //$('#popup_box').slideUp(300).delay(1000).hide();
    $('#popup_box').fadeOut(10000);
}
function loadPopupBox() {
    $('#popup_box').fadeIn(100);
}
function ShowAlert() {
    loadPopupBox();

    unloadPopupBox();
}

// function for clear labelmessage

window.onload = function () {
    var msgControl = document.getElementById("MainContent_lblMessage");
   

    if (msgControl != null) {
        var msgText = $('#MainContent_lblMessage').text();

        if (msgText.trim() != '') {

            $('#MainContent_lblMessage').addClass("yellow-error");
        }
        else {
            $('#MainContent_lblMessage').removeClass('alert alert-warning');
        }
    }

  
}


 //function for clear labelmessage with update panel
function requestHandler() {
  //  alert("updatepanel");
    console.log("requestHandler called.");
    var msgControl = document.getElementById("MainContent_lblMessage");
    if (msgControl != null) {
        var msgText = $('#MainContent_lblMessage').text();

        if (msgText.trim() != "") {
            $('#MainContent_lblMessage').addClass("yellow-error");
        }
        else {
            $('#MainContent_lblMessage').removeClass('alert alert-warning');
        }
    }
}


/*JQuery method to add joinee as regular employee-Ashok KUmar Jangid 27 Sep 2013*/

//$("[id*=btnJoin]").click(function () {

//    var LoginID = $("[id*=txtLoginId]").val();
//    var Password = $("[id*=txtPassword]").val();
//    var Email = $("[id*=txtOffEmail]").val();
//    alert(LoginID);
//    jQuery.ajax({
//        type: 'POST',
//        async: true,
//        // contentType: 'application/json; charset=utf-8',
//        data: '{"LoginID":' + LoginID + ',"Password":' + Password + ',"Email":' + Email + '}',
//        // dataType: 'JSON',
//        url: "SearchJoinee.aspx/AddJoinee",
//        success: function (result) {
//            var results = result;
//            console.log(result);
//            //                             
//        },
//        error: function (XMLHttpRequest, textStatus, errorThrown) {
//            alert(textStatus);
//        }
//    });
//});
var localCache = {
    /**
     * timeout for cache in millis
     * @type {number}
     */
    timeout: 30000,
    /** 
     * @type {{_: number, data: {}}}
     **/
    data: {},
    remove: function (url) {
        delete localCache.data[url];
    },
    exist: function (url) {
        return !!localCache.data[url] && ((new Date().getTime() - localCache.data[url]._) < localCache.timeout);
    },
    get: function (url) {
        console.log('Getting in cache for url' + url);
        return localCache.data[url].data;
    },
    set: function (url, cachedData, callback) {
        localCache.remove(url);
        localCache.data[url] = {
            _: new Date().getTime(),
            data: cachedData
        };
        if ($.isFunction(callback)) callback(cachedData);
    }
};

$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    if (options.cache) {
        var complete = originalOptions.complete || $.noop,
            url = originalOptions.url;
        options.cache = false;
        options.beforeSend = function () {
            if (localCache.exist(url)) {
                complete(localCache.get(url));
                return false;
            }
            return true;
        };
        options.complete = function (data, textStatus) {
            localCache.set(url, data, complete);
        };
    }
});
