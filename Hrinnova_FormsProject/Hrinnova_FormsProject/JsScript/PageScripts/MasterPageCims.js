$(document).ready(function () {



    [].slice.call(document.querySelectorAll('select.cs-select')).forEach(function (el) {
        new SelectFx(el);
    });

    //$(".cs-options").addClass("mCustomScrollbar");

    $(".projectlist").change(function () {
        var selectedProjectID = $('option:selected', this).val();
        $.ajax({
            type: "POST",
            url: "../UserDashboard/ChangeProject",
            dataType: 'html',
            data: "{'ProjectId':'" + selectedProjectID + "'}",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                var url = window.location.href;
                if (url.toString().indexOf('#') > 0)
                    url = url.toString().substr(0, url.toString().length - 1);
                window.location = url;

            }
        });
    });

    $(".clsProfile").click(function () {
        window.location = "../admin/myprofile.aspx";
    });
    $(".clsPassword").click(function () {
        window.location.href = "../admin/changepassword.aspx";
        return false;
    });
    $("#btnHRIMSFavorite").click(function () {
        var selectedProjectID = $("#ddlProjectList").val();
        $.ajax({
            type: "POST",
            url: "../HRPolicies/SetDefaultProject",
            dataType: 'json',
            data: "{'ProjectId':'" + selectedProjectID + "'}",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                toastr.success(data);
            }
        });
    });

    //BindNotification();
});

function BindNotification() {

    $.ajax({
        type: "POST",
        url: "../Notification/GetNotifications",
        dataType: 'html',
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            $("#notification").empty();
            // $("#notification").append($.parseHTML(response));
            $(".content").mCustomScrollbar();

            $("#NotificationBell").click(function () {
                $.ajax({
                    type: "POST",
                    url: "../Notification/ReadNotfication",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        // BindNotification();
                    }
                });
            });

            $(".dismiss").click(function () {

                $.ajax({
                    type: "POST",
                    url: "../Notification/DismisNotification",
                    contentType: "application/json; charset=utf-8",
                    dataType: 'html',
                    data: "{'id':" + $(this).attr("id") + "}",
                    success: function (response) {
                        BindNotification();
                    }
                });
            });
        }
    });
}



$(document).ajaxStart(function () {
    $('#uprgsMaster').css('visibility', 'visible');
});
$(document).ajaxSend(function (evt, request, settings) {
    if (settings.url.indexOf("GetNotification") >= 0)
        $('#uprgsMaster').css('visibility', 'hidden');
});
$(document).ajaxStop(function () {
    $('#uprgsMaster').css('visibility', 'hidden');
});


(function ($) {

    $(window).load(function () {
        $(".fix-panel").mCustomScrollbar({
            scrollButtons: { enable: true },
            theme: "dark",
            scrollbarPosition: "inside"
        });
        $(".right-vertical-panel ").mCustomScrollbar({
            axis: "x",
            theme: "dark",
            advanced: { autoExpandHorizontalScroll: true },
            scrollbarPosition: "inside",
            scrollButtons: { enable: true }
        });

    });
})(jQuery);
function ReadUpdates() {
    $.ajax({
        type: "POST",
        url: "ReadUpdates",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: "{}",
        success: function () {
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText)

        }
    });
}
function ResetValues() {
    $('#ddlFeedbacktype').val('');
    $('#Description').val('');
    $('#file_upload').val('');
    $(".validation-summary-errors ul").empty();
}