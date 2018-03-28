

var deleteLog = false;
$(document).ready(function () {

    //$('#VMVSlider').multiscroll({
    //    keyboardScrolling: true,
    //    'navigation': true
    //});

    if ($('#PopupCount').val() == "0") {

        $('#VMVSlider').multiscroll({
            keyboardScrolling: true,
            'navigation': true
        });
    }

    $("#btnDashboard").click(function DisplayDashboard() {
        $("#myContainer").addClass("translate");
        $(".main-container").addClass("visible");
        $("#btnDashboard").hide();
        $('html, body').removeAttr("style")

        $('#multiscroll-nav').remove();
    });

    if ($('#PopupCount').val() != "0") {

        $('html, body').removeAttr("style")

    }

    
});


//$(window).resize(function () {
//    reSize();
//});

//function reSize() {

//    var clsActive = $('#pagepiling').find('.active');

//    var leftImageHeight = $(window).height();
//    var leftContentHeight = (clsActive.find(".left-content").height() / 2);

//    $(".left-img img").height(leftImageHeight);
//    $(".left-content").css('margin-top', -leftContentHeight).css('margin-left', $(".left-img img").width());
//    $(".left-content").removeClass('fadeInDown');

//    clsActive.find(".left-content").addClass('fadeInDown');
//}

