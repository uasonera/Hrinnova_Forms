
$(document).ready(function () {
    $(document).on("click", ".clsTimesheet", function () {
        var IsSession = false;
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
            var WBSID = $(this).data("wbsid");
            var SprintId = $(this).data("sprint");
            var StoryId = $(this).data("story");
            var EntryDate = moment(new Date()).format("MM/DD/YYYY");

            $.ajax({
                type: "POST",
                url: "/Task/TimesheetAndRemainingHours",
                data: '{"TaskId":' + WBSID + ',"SprintId":' + SprintId + ',"StoryId":' + StoryId + '}',
                dataType: "html",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    $("#TimesheetModal").html(data);
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
    $(document).on('click', '.editTask', function () {
        var IsSession = false;
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
            Edit = true;
            AddEditTask(ProjectId, $(this).attr('id'), true);
        }
        else {
            window.location.href = "/pmsviewboard/index";
        }
    });
    $(document).on("click", ".deleteTask", function () {

        var IsSession = false;
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
            var nodeId = $(this).attr('data-liID');
            var status = $(this).attr('data-parentStatusNode');
            
            //64273 :Parent task should not be allowed to delete, if its child task are in any of the state other that 'not started'
            var liName = 'li[data-parent-id="'+nodeId+'"]';
            if ($('.collapse-tbl td').not("#td-0").not("#td-1").find(liName).length > 0) {
                toastr.error("This Task has InProgress sub tasks.You can't delete this task.");
                return false;
            }

            var IsNotScrumWithChild = TemplateType != projectTypeScrum && $(this).data("childcount") > 0;
            if (TemplateType != projectTypeScrum) {
                if ($(this).data('hasprogress') == true || $(this).data('hasprogress') == "True") {
                    toastr.error("This Task has InProgress sub tasks.You can't delete this task.");
                    return false;
                }
            }
            var Flag = IsNotScrumWithChild ? confirm("This task has Subtasks which will also get deleted. Are you sure you want to proceed?") : confirm("Are you sure you want to delete this task?");
            if (Flag) {
                var taskId = $(this).data('id');
                var storyId = $(this).data('storyid');
                var statusId = $(this).data('statusid');
                $.ajax({
                    type: "POST",
                    url: urlDeleteTask,
                    data: { WBSID: taskId, StoryId: storyId, ProjectId: ProjectId },
                    //dataType: "html",
                    beforeSend: function () {
                        ShowProgress();
                    },
                    success: function (data) {
                        HideProgress();
                        if (TemplateType == projectTypeKanban) {
                            RefreshStatusTab(status);
                        }
                        else {
                            $('#' + nodeId).remove();
                            UpdateTotalTasks(statusId, storyId);
                        }
                    },
                    error: function (response) {
                        //alert(response.responseText);
                    }
                });
            }
        }
        else {
            window.location.href = "/pmsviewboard/index";
        }
    });

    $(document).on("click", ".completeRelease", function () {
        var arrTasks = [];
        ShowProgress();
        $("ul[data-statusid=" + Enum_CompleteStatus + "] li").each(function () {
            if ($(this).data("taskid") != null)
                arrTasks.push($(this).data("taskid"));
        })

        var count = arrTasks.length;
        $("#new-release-modal").modal('show');

        $.ajax({
            url: "/PMSSummary/AddKanbanRelease",
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            async: false,
            //data: JSON.stringify({ ReleaseId: ReleaseId }),
            dataType: 'html',
            success: function (data) {

                if (data) {
                    $("#newreleaseTitle").text("New Release");
                    $('#ReleaseModelbody').empty();
                    $('#ReleaseModelbody').html(data);
                    $("#compItemCount").text(count);
                }
                // return true;
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
        HideProgress();
    });

    $(document).on("click", "#btnSaveKanRelease", function () {
        AddRelease()
        return false;
    });
});
function DisableNotStatusByWorkflow(status, task) {
    var sourceStatusId = $('#' + status).attr('data-statusId')
    var allwedStatus = $('#' + task).attr('data-allowedStatus')

    $('.connectedSortable').removeClass('not-allowed');
    //if (sourceStatusId != 0) {
    if (!allwedStatus.trim()) {
        $('.connectedSortable').addClass('not-allowed');
    }
    else {
        var alowedStatusIds = $.map(allwedStatus.split(","), $.trim);

        $('.connectedSortable').each(function () {
            var statusId = $(this).attr('data-statusId');
            if (jQuery.inArray(statusId, alowedStatusIds) == -1) {
                $(this).addClass('not-allowed');
            }
        });
    }
    //}
}
//#1 check max tasks validation (calling from - view-board.js)
function CheskMaxTasksValidation(destination) {
    if (destination !== undefined) {
        var destinationStatusId = $('#' + destination).attr('data-statusId');
        var statusName = $('#' + destination).attr('data-TaskName');
        var storyId = $('#' + destination).attr('data-storyId');
        var result = true;
        $.ajax({
            url: '/PMSViewBoard/CheckMaxTasksValidation',
            data: { statusId: destinationStatusId, storyId: storyId },
            async: false,
            success: function (data) {
                if (!data) {
                    HideProgress();
                    toastr.error("Max. Tasks limit for the " + statusName + " status has been reached.");
                    result = data;
                }
            }
        })
        return result;
    }
    else {
        HideProgress();
        return false;
    }
}
//#2 set all global variables (calling from - view-board.js)
function InitiateUpdate(task, source, destination) {

    var workItemTypeId = $('#' + task).attr('data-workItemTypeId');
    var taskStatusId = $('#' + source).attr('data-statusId');
    var destinationStatus = $('#' + destination).attr('data-statusId');
    objTask = task;
    objSourceStatus = source;
    objDestinationStatus = destination;
    updateStatus = false;
    if (taskStatusId != 0) {
        $.ajax({
            url: '/PMSViewBoard/CheckIfCustomScreenIsConfigured',
            data: { workItemTypeId: workItemTypeId, taskStatusId: taskStatusId, destinationStatus: destinationStatus },
            beforeSend: function () {
                //ShowProgress();
            },
            success: function (data) {
                //HideProgress();
                if (data) {
                    var customScreenHtml = GetCustomScreen(workItemTypeId, taskStatusId, destinationStatus);
                    customScreenJsonHtml = customScreenHtml.ControlJson;
                    HideProgress();
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
//#3 Get custom screen html
function GetCustomScreen(workItemTypeId, taskStatusId, destinationStatus) {
    var html;
    $.ajax({
        url: '/PMSViewBoard/GetCustomScreen',
        data: { workItemTypeId: workItemTypeId, taskStatusId: taskStatusId, destinationStatus: destinationStatus },
        async: false,
        success: function (data) {
            html = data;
        }
    });
    return html;
}
function openCustomScreen() {
    $('#btnOpen').click();
}
//#4 Save custom screen (calling from - customscreen.js)
function SaveCustomData(json, modalInstance) {
    var task = objTask;
    var sourceStatus = objSourceStatus;
    var destinationStatus = objDestinationStatus;

    var taskId = $('#' + task).attr('data-taskId');
    var sourceStatusId = $('#' + sourceStatus).attr('data-statusId');
    var destinationStatusId = $('#' + destinationStatus).attr('data-statusId');

    $.ajax({
        url: '/pmsviewboard/SaveCustomScreen',
        data: { wbsId: taskId, sourceStatusId: sourceStatusId, destinationStatusId: destinationStatusId, json: json },
        success: function (data) {
            if (data) {
                UpdateTaskStatus();//#5
                modalInstance.close();
            }
        }
    });
}
//#5 Update task status
function UpdateTaskStatus() {

    var task = objTask;
    var sourceStatus = objSourceStatus;
    var destinationStatus = objDestinationStatus;

    var destination = $('#' + destinationStatus).attr('data-StatusDisplay');
    var source = $('#' + sourceStatus).attr('data-StatusDisplay');
    var taskName = $('#' + task).attr('data-TaskName');
    var destinationStatusId = $('#' + destinationStatus).attr('data-statusId');
    var sourceStatusId = $('#' + sourceStatus).attr('data-statusId');
    var taskId = $('#' + task).attr('data-taskId');
    var isKanban = $('#' + sourceStatus).attr('data-isKanban');
    var sourceStoryId = $('#' + sourceStatus).attr('data-storyId')
    var destinationStoryId = $('#' + destinationStatus).attr('data-storyId')
    $.ajax({
        url: '/pmsviewboard/UpdateStatus',
        data: { WBSID: taskId, TaskStatusId: destinationStatusId },
        //async: false,
        beforeSend: function () {
            //ShowProgress();
        },
        success: function (data) {
            //HideProgress();
            updateStatus = true;
            toastr.success(taskName + ' successfully moved from ' + source + ' to ' + destination);
            if (isKanban == 'true') {
                RefreshStatusTab(sourceStatus);
                RefreshStatusTab(destinationStatus);
                UpdateAllowedStatusForTask(task, destinationStatus);
            }
            else {
                UpdateTotalTasks(destinationStatusId, destinationStoryId);
                UpdateTotalTasks(sourceStatusId, sourceStoryId);
                //RefreshStatusTabForStory(destinationStatus)
                RefreshWorkItem(taskId, task)
                HideProgress();
            }
        }
    });
    return true;
}
function RefreshStatusTab(status) {
    var statusId = $('#' + status).attr('data-statusId');
    var parentTD = $('#' + status).attr('data-parentTD');
    $.ajax({
        url: '/pmsviewboard/GetWorkItemDetailsForKanban',
        dataType: 'html',
        async: false,
        data: { statusId: statusId },
        beforeSend: function () {
            //ShowProgress();
        },
        success: function (data) {
            //HideProgress();
            $('#' + parentTD).html(data);
            //custome_scroll_init();
            //viewBoard_Drag_Init();
            //horizontol_accord_init();

            custome_scroll_init();
            viewBoard_Drag_Init();
            horizontol_accord_init_Node(parentTD);

            if (lastFilter == allFilter) {
                $('#ddlWork').change();
            }
            else if (lastFilter == assigneeFilter) {
                $('.btnGo').click();
            }
            else if (lastFilter == searchFilter) {
                $('.SearchTaskButton').click();
            }
        }
    });
}
function cancelCustomScreen() {
    if (!updateStatus) {
        $('#' + objSourceStatus).sortable("cancel");
        tree_empty();
    }
}
function HideProgress() {
    $('.loader-wrapper').css('display', 'none');
}
function ShowProgress() {

    if ($('.loader-wrapper').css('display') == "none") {
        $(".loader-wrapper").show();
    }
}
function UpdateAllowedStatusForTask(task, destinationStatus) {
    var destinationStatusId = $('#' + destinationStatus).attr('data-statusId');
    var workItemTypeId = $('#' + task).attr('data-workItemTypeId');
    $.ajax({
        url: '/pmsworkflow/GetAllowedStatusForTask',
        data: { statusId: destinationStatusId, workItemId: workItemTypeId },
        //async: false,
        beforeSend: function () {
            //ShowProgress();
        },
        success: function (data) {
            $('#' + task).data('allowedStatus', data);
            HideProgress();
        }
    });
}
function UpdateTotalTasks(status, story) {

    $.ajax({
        url: '/PMSViewBoard/GetTotalTasksCountForStatus',
        data: { statusId: status, storyId: story },
        beforeSend: function () {
            //ShowProgress();
        },
        async: false,
        success: function (data) {
            $('#TotalTasksCount-' + status + '-' + story).html('Total ' + data);
            $('#TotalTasksCountCollapse-' + status + '-' + story).html(data);
            //HideProgress();
        }
    });
}
function RefreshStatusTabForStory(status) {
    var statusId = $('#' + status).attr('data-statusId');
    var parentTD = $('#' + status).attr('data-parentTD');
    var storyId = $('#' + status).attr('data-storyId')
    $.ajax({
        url: '/pmsviewboard/GetWorkItemDetailsForStory',
        dataType: 'html',
        async: false,
        data: { storyId: storyId, statusId: statusId },
        beforeSend: function () {
            //ShowProgress();
        },
        success: function (data) {
            $('#' + parentTD).html(data);
            custome_scroll_drag_init(storyId);
            viewBoard_Drag_Init();
            horizontol_accord_init_Node(parentTD);
            if (lastFilter == allFilter) {
                $('#ddlWork').change();
            }
            else if (lastFilter == assigneeFilter) {
                $('.btnGo').click();
            }
            else if (lastFilter == searchFilter) {
                $('.SearchTaskButton').click();
            }
            setTimeout(function () { HideProgress(); }, 100)
        }
    });
}
function RefreshWorkItem(itemId, liID) {
    $.ajax({
        url: '/pmsviewboard/GetWorkItemDetailForStory',
        dataType: 'html',
        async: false,
        data: { workItemId: itemId },
        success: function (data) {
            //$('#' + parentTD).html(data);
            $('#' + liID).addClass("removeLI");
            $('.removeLI').before(data);
            $('.removeLI').remove();
            //if (lastFilter == allFilter) {
            //    $('#ddlWork').change();
            //}
            //else if (lastFilter == assigneeFilter) {
            //    $('.btnGo').click();
            //}
            //else if (lastFilter == searchFilter) {
            //    $('.SearchTaskButton').click();
            //}
            HideProgress();
        }
    });
}

function ValidateRelease() {

    var status = true;
    $(".form-group").removeClass("has-error  has-feedback");
    var ReleaseName = $.trim($('#ReleaseName').val());
    var Description = $.trim($("#Description").val());
    var StartDate = $('#StartDate').val();
    var EndDate = $("#EndDate").val();
    var strErrorMessage = '';
    $('#errorMessage').html('');
    $('#errorMessage').hide();
    if (ReleaseName == "") {
        strErrorMessage += "<li>Please Enter proper Release Name</li>";
        $("#ReleaseName").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (ReleaseName.length > 30) {
        strErrorMessage += "<li>Maximum 30 characters allowed for Release Name</li>";
        $("#ReleaseName").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (Description.length > 300) {
        strErrorMessage += "<li>Maximum 300 characters allowed for Description</li>";
        $("#Description").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (status == false && strErrorMessage != null) {
        $('#errorMessage').css('display', 'block');
        $('#errorMessage').html("<ul>" + strErrorMessage + "</ul>");
        $('ul li:empty').remove();
    }
    return status;
}

function AddRelease() {
    if (ValidateRelease()) {
        ShowProgress();
        $('#ReleaseName').val($.trim($('#ReleaseName').val()));
        var arrTasks = [];
        $("ul[data-statusid=" + Enum_CompleteStatus + "] li").each(function () {
            if ($(this).data("taskid") != null)
                arrTasks.push($(this).data("taskid"));
        })
        $('#lstWbsId').val(arrTasks);
        var formdata = new FormData($('#frmRelease').get(0));
        
        $.ajax({
            url: "/BacklogPlanning/SavReleaseSPrint",
            type: "POST",
            data: formdata,

            contentType: false,
            processData: false,
            success: function (data) {
                if (data) {
                    toastr.success("Release has been saved successfully");
                    ClearFormRelease();
                    
                    RefreshStatusTab("list-" + Enum_CompleteStatus);
                }
                else {
                    toastr.error("Release Name already exists");
                }

                return true;
            }
        });
        HideProgress();
    }
    return false;
}

function ClearFormRelease() {
    $("#new-release-modal").modal('hide');
    $('#ReleaseModelbody').empty();
}