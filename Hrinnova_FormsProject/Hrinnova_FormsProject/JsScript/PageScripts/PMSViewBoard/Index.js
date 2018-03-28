$(document).ready(function () {
    $('#ddlTeamMember').multiselect({
        enableFiltering: true,
        numberDisplayed: 1,
        filterBehavior: 'text',
        includeSelectAllOption: true,
        enableCaseInsensitiveFiltering: true,
        buttonWidth: '100%',
        disableIfEmpty: true,
        templates: {
            filter: '<li class="multiselect-item filter"><div class="input-group"><input class="form-control multiselect-search" type="text"></div></li>',
            filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default multiselect-clear-filter" type="button"><i class="glyphicon glyphicon-remove-circle"></i></button></span>',
        },
        onChange: function (element, checked) {
            //if (checked === true) {
            //    $("#selectedattendee").append('<label class="label-primary label" style="margin-left: 5px;">' + $(element).text() + ' <i class="fa fa-close cursor-pointer removeSelectedTag" data-id="' + $(element).val() + '" id="Attendee_' + $(element).val() + '"></i></label>')
            //}
            //else if (checked === false) {
            //    $("#Attendee_" + $(element).val()).parent().remove();

            //}
        },
        onSelectAll: function () {
            //$('#drpAttendee > option').each(function () {
            //    $("#selectedattendee").append('<label class="label-primary label" style="margin-left: 5px;">' + $(this).text() + ' <i class="fa fa-close cursor-pointer removeSelectedTag" data-id="' + $(this).val() + '" id="Attendee_' + $(this).val() + '"></i></label>')
            //});
        },
        onDeselectAll: function () {
            //$("#selectedattendee").html('');
        },
        maxHeight: 200,
    });
    $('#PlanSprint').click(function () {
        if (TemplateType == projectTypeIterative) {
            window.location.href = urlPlanIteration;
        }
        else {
            window.location.href = urlPlanSprint;
        }
    });
    $('#addWorkItem').click(function () {
        Edit = false;
        AddEditTask(ProjectId, 0, false);
    });
    $('#ddlSprint').change(function () {
        lastFilter = allFilter;
        var sprintId = $(this).val();
        ChangeSprintDetails(sprintId)
        var url = '';
        if (TemplateType == projectTypeIterative) {
            url = '/PMSViewBoard/ViewBoard_IterativeIncremental';
            data = { iterationId: sprintId };
        }
        else {
            url = '/PMSViewBoard/ViewBoard_Scrum';
            data = { sprintId: sprintId };
        }
        $.ajax({
            url: '/AttendanceView/checkSessionTimeout',
            type: 'GET',
            contentType: 'application/json;charset=utf-8',
            async: false,
            dataType: 'json',
            success: function (loggedIn) {
                if (loggedIn) {
                    $.ajax({
                        url: url,
                        data: data,
                        dataType: 'html',
                        beforeSend: function () {
                            ShowProgress();
                        },
                        success: function (html) {
                            $('#ViewBoardDetails').html(html);
                            HideProgress();
                            custome_scroll_init();
                            viewBoard_Drag_Init();
                            horizontol_accord_init();
                            //collaps_init();
                        }
                    });
                }
                else {
                    window.location.reload();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload();
            }
        });
    });
    $('#ddlWork').change(function () {
        lastFilter = allFilter;
        var val = $(this).val();
        $('#ddlTeamMember option:selected').prop("selected", false);
        $('#ddlTeamMember').multiselect('refresh');
        $('#txtSearch').val('');
        if (val == 0) {//my
            var arr = new Array();
            arr.push(empId);
            //$('#ddlTeamMember').multiselect('disable');
            FilterByAssignee(arr);
        }
        else if (val == 1) {//recently updated
            FilterRecentlyUpdatedTasks();
            //$('#ddlTeamMember').multiselect('enable');
        }
        else {
            $('.taskTicket').css('display', 'block');
            //$('#ddlTeamMember').multiselect('enable');
        }
    });
    $('.btnGo').click(function () {
        lastFilter = assigneeFilter;
        $('#txtSearch').val('');
        $('#ddlWork').val(-1).trigger("chosen:updated");
        //var val = $('#ddlWork').val();
        //if (val == 1) {//recently updated
        //    FilterRecentlyUpdatedTasks();
        //}
        //else if (val == -1) {
        //    $('.taskTicket').css('display', 'block');
        //}
        var assignees = $("#ddlTeamMember option:selected").map(function () { return this.value }).get().join(", ");
        if (assignees != '') {
            var assigneeIds = $.map(assignees.split(","), $.trim);
            FilterByAssignee(assigneeIds);
        }
        else {
            $('.taskTicket').css('display', 'block');
        }

    });
    $('.SearchTaskButton').click(function () {
        lastFilter = searchFilter;
        $('#ddlWork').val(-1).trigger("chosen:updated");
        $('#ddlTeamMember option:selected').prop("selected", false);
        $('#ddlTeamMember').multiselect('refresh');
        var name = $('#txtSearch').val();
        if (name != '') {
            FilterByTaskName(name)
        }
        else {
            $('.taskTicket').css('display', 'block');
        }
    });
});
function NewSprintDialog() {
    $.ajax({
        type: "POST",
        url: urlGetNewSprint,
        data: '{ "ProjectId": "' + ProjectId + '","SprintId":"' + 0 + '","IsIteration":"false"}',
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data) {
                alert(data);
            }
            return true;
        },
        error: function (response) {
        }
    });
}
function NewIterationDialog() {
    var IsEdit = false;
    if (sprintId > 0) { IsEdit = true; }
    $.ajax({
        type: "POST",
        url: urlGetNewIteration,
        data: '{ "CurrentSprint": "' + 0 + '"}',
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data) {
                alert(data);
            }
            return true;
        },
        error: function (response) {
        }
    });
}
function FilterByAssignee(assignees) {
    $('.taskTicket').css('display', 'block');
    $('.taskTicket').each(function () {
        //var assigneeId = $(this).attr('data-assignee')
        var assigneeIds = $(this).attr('data-assignees')
        if (assigneeIds != '') {
            var array = assigneeIds.split(',');
            var display = false;
            for (var i = 0; i < array.length; i++) {
                if (jQuery.inArray(array[i], assignees) != -1) {
                    display = true;
                }
            }
            if (!display) {
                $(this).css('display', 'none');
            }
        }
        else{
            $(this).css('display', 'none');
        }
        //if (jQuery.inArray(assigneeId, assignees) == -1) {
        //    $(this).css('display', 'none');
        //}
    });
}
function FilterByTaskName(name) {
    $('.taskTicket').css('display', 'block');
    $('.taskTicket').each(function () {
        var taskName = $(this).attr('data-TaskName');
        if (taskName == undefined) {
            $(this).css('display', 'none');
        }
        else {
            if (taskName.toLowerCase().indexOf(name) < 0) {
                $(this).css('display', 'none');
            }
        }

    });
}
function FilterRecentlyUpdatedTasks() {
    $('.taskTicket').css('display', 'block');
    $('.taskTicket').each(function () {
        var IsRecentlyUpdate = $(this).attr('data-IsRecentlyUpdate');
        if (IsRecentlyUpdate == "False") {
            $(this).css('display', 'none');
        }
    });
}
function ChangeSprintDetails(sprintId) {
    $.ajax({
        url: '/PMSViewBoard/GetStoryDetails',
        data: { sprintId: sprintId },
        success: function (data) {
            $('#sprintname').html(data.Title);
            $('#startDate').html(data.strPlannedStartDate);
            $('#endDate').html(data.strPlannedEndDate);
            $("#ddlWork").val(-1).trigger("chosen:updated").change();
        }
    })
}

