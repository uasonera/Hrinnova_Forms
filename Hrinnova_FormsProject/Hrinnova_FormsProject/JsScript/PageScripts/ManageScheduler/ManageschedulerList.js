$(document).ready(function () {
    $(document).on("click", ".actionExceute", function () {
        var jobId = $(this).attr('data-id');
        var IsExecuted = $(this).attr("data-IsExecute");
        var Title = "Excecute";
        if (!IsExecuted) {
            Title = "Not Excecute"
        }
        if (confirm("Are you sure you want to change the setting?")) {
            $.ajax({
                url: "/ManageScheduler/ExcecuteNotexcutejob",
                type: "POST",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify({ jobId: jobId, IsExecuted: IsExecuted }),
                dataType: 'json',
                success: function (result) {
                    if (result == "true") {
                        ListOfSchdeulerData();
                    }
                    
                },
                error: function () { }
            });
        }
    });

    $(document).on("click", ".actionSendNotification", function () {
        var jobId = $(this).attr('data-id');
        var IsOnlySendNotification = $(this).attr("data-OnlySendNotification");
        var Title = "Send Notification";
        if (!IsOnlySendNotification) {
            Title = "Not Send Notification"
        }
        if (confirm("Are you sure you want to change the setting?")) {
            $.ajax({
                url: "/ManageScheduler/SendOnlyNotification",
                type: "POST",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify({ jobId: jobId, IsOnlySendNotification: IsOnlySendNotification }),
                dataType: 'json',
                success: function (result) {
                    if (result == "true") {
                        ListOfSchdeulerData();
                    }

                },
                error: function () { }
            });
        }
    });

    $(document).on("click", ".actionSendConsolidateNotification", function () {
        var jobId = $(this).attr('data-id');
        var IsOnlySendConsolidateNotification = $(this).attr("data-OnlySendConsolidateNotification");
        var Title = "Send Consolidate Notification";
        if (!IsOnlySendConsolidateNotification) {
            Title = "Not Send Consolidate Notification"
        }
        if (confirm("Are you sure you want to change the setting?")) {
            $.ajax({
                url: "/ManageScheduler/SendOnlyConsolidateNotification",
                type: "POST",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify({ jobId: jobId, IsOnlySendConsolidateNotification: IsOnlySendConsolidateNotification }),
                dataType: 'json',
                success: function (result) {
                    if (result == "true") {
                        ListOfSchdeulerData();
                    }

                },
                error: function () { }
            });
        }
    });

});
function ClearForSchdeulerdata() {
    $("#schedulerModel").modal('hide');
    $('#schedulerModelBody').empty();

}
function ListOfSchdeulerData() {
    $.ajax({
        url: '/ManageScheduler/GetManageSchedulerList',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        dataType: 'html',
        success: function (data) {
            if (data) {
                $('#divScheduler').empty();
                $('#divScheduler').html(data);
                data_table_init();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}