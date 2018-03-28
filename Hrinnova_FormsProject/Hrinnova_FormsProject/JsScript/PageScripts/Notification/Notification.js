var connectionStarted = false;
var chat = $.connection.notificationHub;
var pageCount = 0;
$(function () {

    if ($.connection !== undefined && $.connection.hub !== undefined)
    {
        $.connection.hub.start().done(function () {
            connectionStarted = true;
            //chat.server.send();
        });
    }

    getNotificationCount();
    refereshNotifications();
    loadMoreNotifications(0);
    pageCount = 1;

    if ($.connection !== undefined && $.connection.notificationHub !== undefined)
    {
        var hub = $.connection.notificationHub;

        hub.client.addNewMessageToPage = function () {
            getNotificationCount();
            refereshNotifications();
            loadMoreNotifications(0);
            pageCount = 1;
        };
    }

    $("#notificationScroll").mCustomScrollbar({
        callbacks: {
            //onTotalScroll: function () {
            //    loadMoreNotifications(pageCount);
            //    pageCount += 1;
            //},
            whileScrolling: function () {
                //alert(this.mcs.topPct)
                if (this.mcs.topPct == 100) {
                    loadMoreNotifications(pageCount);
                    pageCount += 1;
                }
            }
        }
    });

    $(".dropdown-extended .dropdown-menu-list").on('click', '.readMore', function () {
        var notificationId = $(this).attr('data-notificationId');
        MarkNotificationAsRead(notificationId);
        return false;
    });

    $(".dropdown-extended .dropdown-menu-list").on('click', '.markAsRead', function () {
        var notificationId = $(this).attr('data-notificationId');
        MarkNotificationAsRead(notificationId);
        return false;
    });

});

function MarkNotificationAsRead(notificationId) {
    $.ajax({
        url: "/Notification/MarkNotificationAsRead",
        contentType: "application/json",
        data: { notificationId: notificationId },
        async: false,
        success: function (data) {
            if (data) {
                $('#' + notificationId).removeClass("new").addClass("read");
                $('#markAsRead_' + notificationId).remove();
                getNotificationCount();
            }
        }
    });
}

function loadMoreNotifications(count) {

    $.ajax({
        url: '/AttendanceView/checkSessionTimeout',
        type: 'GET',
        contentType: 'application/json;charset=utf-8',
        async: false,
        dataType: 'json',
        success: function (data) {
            if (data) {
                $.ajax({
                    url: "/Notification/GetUserNotifications",
                    contentType: "application/json; charset=UTF-8",
                    dataType: "json",
                    data: { pageCount: count },
                    async: false,
                    beforeSend: function () {
                        $('.notify-loader').show();
                    },
                    success: function (data) {
                        BindNotifications(data, count);
                        setTimeout(function () { $('.notify-loader').hide() }, 1000);
                        //$('.notify-loader').hide();
                    }
                });
            }
            else {
                window.location.reload();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText)
        }
    });
}

function getNotificationCount() {
    $.ajax({
        url: '/AttendanceView/checkSessionTimeout',
        type: 'GET',
        contentType: 'application/json;charset=utf-8',
        async: false,
        dataType: 'json',
        success: function (data) {
            if (data) {
                $.ajax({
                    url: "/Notification/GetUserUnReadNotificationsCount",
                    contentType: "application/json",
                    async: false,
                    success: function (data) {
                        $('.notificationCount').html(data);
                    }
                });
            }
            else {
                window.location.reload();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText)
        }
    });
}

function refereshNotifications() {
    $.ajax({
        url: '/AttendanceView/checkSessionTimeout',
        type: 'GET',
        contentType: 'application/json;charset=utf-8',
        async: false,
        dataType: 'json',
        success: function (data) {
            if (data) {
                $.ajax({
                    url: "/Notification/RefreshUserNotifications",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                    }
                });
            }
            else {
                window.location.reload();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText)
        }
    });
}

function BindNotifications(Data, count) {
    if (count == 0) {
        $('#ulNotifications').empty();
    }
    var html = '';
    $.each(Data, function (k, v) {
        if (v.IsRead) {
            html += '<li class="read" id="' + v.NotificationId + '">';
        }
        else {
            html += '<li class="new" id="' + v.NotificationId + '">';
        }
        html += '<div href="javascript:void(0)">';
        html += '<strong>' + v.Title + '</strong>';
        html += '<p class="details">';
        html += '<span class="info">' + TruncateString(v.Detail) + '<br />';
        //html += '<span class="info">' + v.NotificationId + '<br />';
        if (v.IsRead) {
            html += '<small><a href="#" data-notificationId = "' + v.NotificationId + '" class="text-primary note_more">Read more</a></small></span>';
        }
        else {
            html += '<small><a href="#" data-notificationId = "' + v.NotificationId + '" class="text-primary note_more readMore">Read more</a><a href="#" class="text-primary markAsRead" id="markAsRead_' + v.NotificationId + '" data-notificationId = "' + v.NotificationId + '" ><span> - </span>Mark as read</a></small></span>';
        }
        html += '<span class="detail">' + v.Detail + ' <br /><span><a href="#" data-notificationId = "' + v.NotificationId + '"  class="text-primary note_more readLess">Read less</a></span></span>';
        html += '</p></div></li>';
    });
    $('#ulNotifications').append(html);

}

function TruncateString(str, length, ending) {
    if (length == null) {
        length = 60;
    }
    if (ending == null) {
        ending = '...';
    }
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    } else {
        return str;
    }
}

function SendNotification(notificationType, taskId) {
    if (connectionStarted) {
        $.ajax({
            url: "/Notification/SendNotification",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify({ notificationType: notificationType, taskId: taskId }),
            success: function (data) {
                if (data) {
                    //chat.server.send();
                }
            }
        });
    }
}