/// <reference path="../Constant/Constant.js" />

$(document).ready(function () {
    $(".clsCharNotAllowed").keydown(function (e) {

        if (e.keyCode != 8 && e.keyCode != 46) {
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||

                (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||

                (e.keyCode >= 35 && e.keyCode <= 40)) {

                return;
            }

            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        }
    });
    $(".connectedSortable").sortable({
        cursor: "move",
        items: "li:not(.notsortNewTask)",
        cancel: '.notsortNewTask',
        start: function (event, ui) {

        },
        update: function () {
            var myLi = $(this).children();
           // var myLi = $(this).children('li:not(".notsortNewTask")');
            var TaskStatusId = "";
            for (var i = 0; i < myLi.length; i++) {
                TaskStatusId += myLi[i].id;
                if (i != myLi.length - 1)
                    TaskStatusId += ",";
            }
            $(".cancelStatus").click();
            //console.log(TaskStatusId);
            $.ajax({
                type: "POST",
                url: urlSetConfirmOrder,
                data: '{ "SequeceIdList": "' + TaskStatusId + '"}',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    toastr.success(Constants.StatusSequenceSucess);
                },
                error: function (response) {
                    //alert(response.responseText);
                }
            });

        }
    });
    $(".btnSaveTaskStatus").click(function () {
        var Status = $(this).data('status');
        var taskStatusId = $(this).data('taskstatusid');
        var minTaskStatus = $("#" + taskStatusId + "-minTasks").val();
        var maxTaskStatus = $("#" + taskStatusId + "-maxTasks").val();
        if (minTaskStatus > maxTaskStatus) {
            toastr.error(String.format(Constants.MinTaskError,Status));
            return false;
        }

        if (minTaskStatus != "" && maxTaskStatus != "") {
            $("#" + taskStatusId + "-Error").hide();
            $.ajax({
                type: "POST",
                url: urlSetTaskStatusDetail,
                data: '{ "TaskStatusId": "' + taskStatusId + '","MinTasks":"' + minTaskStatus + '","MaxTaks":"' + maxTaskStatus + '"}',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    toastr.clear();
                    toastr.success(String.format(Constants.UpdateMinMaxTask,Status));
                },
                error: function (response) {
                    //alert(response.responseText);
                }
            });
        }
        else {
            $("#" + taskStatusId + "-Error").show();
        }
    });
    $(".DeleteStatus").unbind('click');
    $(".DeleteStatus").click(function () {
        var Title = $(this).data('title');
        var TotalTask = $(this).data('totaltask');
        if (TotalTask == 0) {
            if (confirm("Are you sure you want to delete this status?")) {
                var StatusId = $(this).data("id");
               

                $.ajax({
                    type: "POST",
                    url: urlDeleteStatus,
                    data: '{ "StatusId":"' + StatusId + '","ProjectID":"' + ProjectId + '"}',
                    datatype: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        toastr.success(String.format(Constants.StatusRemove,Title));
                        $("#dvTaskDetail").empty();
                        $("#dvTaskDetail").html(data);
                        //$(".TaskStatus_" + StatusId).remove();
                    }
                });

            }
        }
        else {
            toastr.error(Title + " has work items. You are not allowed to delete this status.");
        }
    });
    $("#btnsave").on("click", function () {
        $("#StatusError").hide();
        var newstatus = $("#txttaskstatus").val();
        if (IsIterative == "False" || IsIterative == false) {
            var MinTaskHours = $("#minTasksHours").val();
            var MaxTaskHours = $("#maxTasksHours").val();
            if (MinTaskHours > MaxTaskHours) {
                toastr.error("Minimum Tasks can not exceed Maximum Tasks for " + newstatus);
                return false;
            }
            if (MinTaskHours == "" || MaxTaskHours == "" || newstatus == "") {
                $("#StatusError").show();
                return false;
            }
            $("#StatusError").hide();

           // SaveNewStatus(newstatus, MinTaskHours, MaxTaskHours, ProjectId)
        }
        else {
            if (newstatus == "") {
                $("#StatusError").show();
                return false;
            }
           // SaveNewStatus(newstatus, "0", "0", ProjectId)
        }


    });
    function SaveNewStatus(newstatus, MinTaskHours, MaxTaskHours, ProjectId) {
        var IsTaskExist;
        $.ajax({
            type: "POST",
            url: urlCheckIfTaskStatusExist,
            data: '{ "TaskStatus": "' + newstatus + '", "TaskStatusID":"0","ProjectId":"' + ProjectId + '"}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                IsTaskExist = data.result;
            }
        });
        if (IsTaskExist) {
            toastr.error("Task Status with name " + newstatus + " already exist. Please choose a different Title");
            return false;
        }
        $.ajax({
            type: "POST",
            url: urlAddNewStatus,
            data: '{ "DisplayValue":"' + newstatus + '","MinTaskHours":"' + MinTaskHours + '","MaxTaskHours":"' + MaxTaskHours + '","ProjectId": "' + ProjectId + '","TaskStatusId" : "0"}',
            datatype: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $("#dvTaskDetail").empty();
                $("#dvTaskDetail").html(data);
                toastr.success(newstatus + " has been saved successfully");
            },
            error: function (response) {
                console.log(jqXHR.responseText);
            }
        });
    }
    $(document).on("click", ".updateTaskStatus", function () {
        var StatusId = $(this).data("id");
        var NewTitle = $(this).prev().val();
        
        if (NewTitle == '') {
            $(this).prev().css("border", "1px solid red");
            return false;
        }
        else {
            var IsTaskExist;
            $.ajax({
                type: "POST",
                url: urlCheckIfTaskStatusExist,
                data: '{ "TaskStatus": "' + NewTitle + '", "TaskStatusID":"' + StatusId + '","ProjectId":"' + ProjectId + '"}',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                     IsTaskExist = data.result;
                }
            });
            if (IsTaskExist) {
                toastr.error("Task Status with name " + NewTitle + " already exist. Please choose a different Title");
                return false;
            }
            $.ajax({
                type: "POST",
                url: urlUpdateStatusTitle,
                data: '{ "StatusId":"' + StatusId + '","Title":"' + NewTitle + '","ProjectID":"' + ProjectId + '"}',
                datatype: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (CurrentStatusValue != NewTitle)
                        toastr.success("Task Status name has been updated successfully");
                    $("#dvTaskDetail").empty();
                    $("#dvTaskDetail").html(data);
                }
            });
        }
    });
    $(document).on("click", ".lnkTaskStatus", function () {
        $(".lnkTaskStatus").show();
        $(".edittaskStatus").hide();
        $(this).hide();
        var id = $(this).data('id');
        var status = $(this).data('taskstatus');
        CurrentStatusValue = status;
        $("#txt-" + id).show();
        $("#txt-" + id).children('.inputEditStatus').val(status);
        $("#txt-" + id).children('.inputEditStatus').focus();
    });
    $(".cancelStatus").click(function () {
        $(".lnkTaskStatus").show();
        $('.edittaskStatus').hide();
    });
    $(document).click(function (e) {
        if (e.target.className == undefined || (e.target.className.indexOf('fa-pencil') < 0 && e.target.className.indexOf('lnkTaskStatus') < 0) && e.target.className.indexOf('inputEditStatus') < 0) {
            $(".lnkTaskStatus").show();
            $('.edittaskStatus').hide();
        }
    });
});