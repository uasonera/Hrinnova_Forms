$(document).ready(function () {
    $(".editStatus").unbind('click');
    $(".editStatus").click(function () {
        var WbsIdForTaskUpdate = $(this).data("id");       
        $.ajax({
            type: "POST",
            url: urlGetStatus,
            dataType: 'html',
            data: "{'TaskId':'" + WbsIdForTaskUpdate + "'}",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $("#UpdateStatusModel").empty();
                $("#UpdateStatusModel").html(data);                
            }
        });
    });
    $(".UpdateStatus").click(function () {       
        var TaskStatusId = $("#TaskStatusId").val();
        $("#UpdateStatusModel").modal('toggle');
        $.ajax({
            type: "POST",
            url: urlUpdateStatus,
            dataType: 'html',
            data: "{'TaskId':'" + TaskId + "','TaskStatusID':'" + TaskStatusId + "'}",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                //$("#UpdateStatusModel").modal('toggle');
                
                $(".ViewTaskLeft").html(data);
               
            }
        });
    });
});