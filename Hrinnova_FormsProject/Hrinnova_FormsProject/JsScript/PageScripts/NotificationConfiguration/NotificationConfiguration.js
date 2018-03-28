$(document).ready(function () {

    $('#addNotification').click(function () {
        window.location.href = '/NotificationConfiguration/AddEditNotification';
    });

    $(document).on('click', '.editNotification', function () {
        var NotificationId = $(this).attr('data-notificationId');
        var url = "/NotificationConfiguration/AddEditNotification?NotificationId=" + NotificationId;
        window.location.href = url;
    });

    $(document).on('click', '.deactivate', function () {
        var notificationId = $(this).attr('data-notificationId')
        var notificationEventId = $(this).attr('data-notificationeventid')
        var obj = $(this);
        if (confirm("Are you sure you want to inactive the Notification ?")) {
            $.ajax({
                type: "post",
                url: "/NotificationConfiguration/ChangeActiveStatus",
                async: false,
                contentType: "application/json",
                dataType: 'json',
                data: JSON.stringify({ notificationId: notificationId, status: false, NotificationEventId: notificationEventId }),
                success: function (data) {
                    if (data) {
                        obj.removeClass('fa-check-circle-o').removeClass('text-success').removeClass('deactivate');
                        obj.addClass('fa-ban text-danger').addClass('activate');
                    }
                },
            });
        }
    });
    $(document).on('click', '.activate', function () {
        var notificationId = $(this).attr('data-notificationId')
        var notificationEventId = $(this).attr('data-notificationeventid')
        var obj = $(this);
        if (confirm("Are you sure you want to activate the Notification ?")) {
            $.ajax({
                type: "post",
                url: "/NotificationConfiguration/ChangeActiveStatus",
                async: false,
                contentType: "application/json",
                dataType: 'json',
                data: JSON.stringify({ notificationId: notificationId, status: true, NotificationEventId: notificationEventId }),
                success: function (data) {
                    if (data) {
                        obj.removeClass('fa-ban text-danger').removeClass('activate');
                        obj.addClass('fa-check-circle-o').addClass('text-success').addClass('deactivate');
                    }
                },
            });
        }
    });
    //Test Notification
    //$('#testSignalR').click(function () {
    //    SendNotification(2, 18737);
    //});
});