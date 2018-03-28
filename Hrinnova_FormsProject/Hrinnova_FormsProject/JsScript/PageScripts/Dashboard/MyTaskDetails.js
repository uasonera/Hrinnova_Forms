$(document).ready(function () {
    $(document).on('click', '.view-status-form', function (event) {
        $('.status-form').toggle();
        event.stopPropagation();
    })
    $(document).on('click', '.status-form select', function (event) {
        event.stopPropagation();
    })
    $(document).on('click', '.updateStatus', function () {

        workItemType = $(this).attr('data-workItemTypeId');
        task = $(this).attr('data-taskId');
        taskStatus = $(this).attr('data-taskStatusId');
        destinationStatus = $('#' + task).val();
        project = $(this).attr('data-projectId');
        isOverdueTask = $(this).attr('data-isOverdueTask');
        thisButton = $(this);
        var storyId = $(this).attr('data-storyId');
        if (CheskMaxTasksValidation(destinationStatus, storyId, project, task)) {
            if (taskStatus != 0) {
                $.ajax({
                    url: '/dashboard/CheckIfCustomScreenIsConfigured',
                    data: { workItemTypeId: workItemType, taskStatusId: taskStatus, destinationStatus: destinationStatus, projectId: project },
                    success: function (data) {
                        if (data) {
                            var customScreenHtml = GetCustomScreen(workItemType, taskStatus, destinationStatus, project);
                            customScreenJsonHtml = customScreenHtml.ControlJson;
                            openCustomScreen();
                            $('#customFormTitle').html(customScreenHtml.Name)
                        }
                        else {
                            UpdateTaskStatus();
                        }
                    }
                });
            }
            else {
                UpdateTaskStatus();
            }
        }
    });
    $(document).on("click", ".clsTimesheet", function () {
        var IsSession = false;
        isOverdueTask = $(this).attr('data-isOverdueTask');
        $.ajax({
            url: '/AttendanceView/checkSessionTimeout',
            type: 'GET',
            contentType: 'application/json;charset=utf-8',
            async: false,
            dataType: 'json',
            success: function (data) {
                if (data) {
                    IsSession = true;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload();
            }
        });
        if (IsSession) {
            var WBSID = $(this).attr("data-taskId");
            var EntryDate = moment(new Date()).format("MM/DD/YYYY");

            $.ajax({
                type: "POST",
                url: "/Task/TimesheetAndRemainingHours",
                data: '{"TaskId":' + WBSID + '}',
                dataType: "html",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    $("#TimesheetModal").html(data);
                    $("#TimesheetModal").modal();
                    //debugger;
                    $(".BillableHours").attr("id", "BillableHours");
                    $(".BillableHours").parent().append($(".BillableHours").next());

                    $(".WorkFromHome").attr("id", "WorkFromHome");
                    $(".WorkFromHome").parent().append($(".WorkFromHome").next());
                    setupCheckboxes()
                },
                error: function (jqXHR, textStatus, errorThrown) { console.log(jqXHR.responseText) }
            });

            $.ajax({
                type: "POST",
                url: "/Task/CheckFreezingDate",
                data: '{"EntryDate":"' + EntryDate + '"}',
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    $(".chkWFH").prop("disabled", !data.WFHAllowed);
                }
            });
        }
        else {
            window.location.href = "/pmsviewboard/index";
        }
    });
    $("#TimesheetModal").on("hidden.bs.modal", function () {
        if (isOverdueTask == "true") {
            reloadOverdueTasks()
        }
        else {
            reloadAssignedTasks()
        }
    });
})
function openCustomScreen() {
    $('#btnOpen').click();
}
function GetCustomScreen(workItemTypeId, taskStatusId, destinationStatusId, projectId) {
    var html;
    $.ajax({
        url: '/dashboard/GetCustomScreen',
        data: { workItemTypeId: workItemTypeId, taskStatusId: taskStatusId, destinationStatus: destinationStatusId, projectId: projectId },
        async: false,
        success: function (data) {
            html = data;
        }
    });
    return html;
}
function SaveCustomData(json, modalInstance) {

    $.ajax({
        url: '/dashboard/SaveCustomScreen',
        data: { wbsId: task, sourceStatusId: taskStatus, destinationStatusId: destinationStatus, json: json, projectId: project },
        success: function (data) {
            if (data) {
                UpdateTaskStatus();
                modalInstance.close();
            }
        }
    });
}
function UpdateTaskStatus() {

    $.ajax({
        url: '/pmsviewboard/UpdateStatus',
        data: { WBSID: task, TaskStatusId: destinationStatus },
        //async: false,
        success: function (data) {
            toastr.success("Task status changed successfully");
            thisButton.attr('data-taskStatusId', destinationStatus);
            if (isOverdueTask == "true") {
                reloadOverdueTasks()
            }
            else {
                reloadAssignedTasks()
            }
        }
    });

    return true;
}
function updateAllowedStatusForTask() {

    $.ajax({
        url: '/dashboard/GetAllowedTaskStatusListForTask',
        data: { taskId: task },
        //async: false,
        success: function (data) {
            if (data) {
                $.each(data, function (key, value) {
                    alert(value.text)
                    alert(value.id)
                });
            }
        }
    });
    return true;
}
function reloadOverdueTasks() {
    $.ajax({
        url: '/dashboard/MyOverdueTaskDetails',
        beforeSend: function () {
            ShowProgress();
        },
        //data: { taskId: task },
        //async: false,
        success: function (data) {
            HideProgress();
            $('#overdueTasks').html(data);
        }
    });
    return true;
}
function reloadAssignedTasks() {
    $.ajax({
        url: '/dashboard/MyAssignedTaskDetails',
        beforeSend: function () {
            ShowProgress();
        },
        //data: { taskId: task },
        //async: false,
        success: function (data) {
            HideProgress();
            $('#assignedTasks').html(data);
        }
    });
    return true;
}
function HideProgress() {
    $('.loader-wrapper').css('display', 'none');
}
function ShowProgress() {

    if ($('.loader-wrapper').css('display') == "none") {
        $(".loader-wrapper").show();
    }
}
function CheskMaxTasksValidation(destinationStatusId, storyId, projectId,select) {
    
    var result = false;
    $.ajax({
        url: '/PMSViewBoard/CheckMaxTasksValidation',
        data: { statusId: destinationStatusId, storyId: storyId, projectId: projectId },
        async: false,
        success: function (data) {
            result = data;
        }
    });
    if (result == false) {
        toastr.error("Max. Tasks limit for the " + $("#" + select + " option[value='" + destinationStatusId + "']").text() + " status has been reached.")
    }
    return result;
}