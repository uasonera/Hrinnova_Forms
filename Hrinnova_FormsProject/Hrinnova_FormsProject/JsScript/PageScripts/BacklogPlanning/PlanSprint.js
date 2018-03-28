$(document).ready(function () {
    $(".switch-project").remove();
    var TaskIds = [];
    if ($("#IsActive").val() == "True") {
        $('#ManageSprinType').val(1);
        $('#ManageSprinType').trigger("chosen:updated");
    }
    else {
        $('#ManageSprinType').val(2);
        $('#ManageSprinType').trigger("chosen:updated");
    }
    $('#ManageSprinType > option').each(function () {
        if (this.text.trim() == 'Both') {
            this.remove();
        }
        $('#ManageSprinType').trigger("chosen:updated");
    });
    $("#ManageSprinType").change(function () {
        LoadSprintList($(this).val());
        $("#dvPlannedWorkitems").empty().html(''); // for issue 60199

        if ($(this).val() == 1) {
            $("#startSprint").css('display', 'none');
            $("#completeSprint").css('display', 'inline-block');
        }
        else {
            $("#startSprint").css('display', 'inline-block');
            $("#completeSprint").css('display', 'none');
        }
    });

    $('#EpicIDsearch').val('-1');
    $('#EpicNamesprint').text($("#EpicIDsearch option:selected").text());
    $(document).on("change", "#EpicIDsearch", function () {
        ShowProgress();
        if ($('#EpicIDsearch').val() > 0)
        { EpicType = Enum_Epic_EpicType }
        else
        { EpicType = $('#EpicIDsearch').val(); }

        if ($('#EpicIDsearch').val() > 0) {
            $('#EpicNamesprint').text($("#EpicIDsearch option:selected").text());
            GetBacklogItemListfrmSprint($('#EpicIDsearch').val(), EpicType, "");
        }
        else {
            $('#EpicNamesprint').text($("#EpicIDsearch option:selected").text());
            GetBacklogItemListfrmSprint(0, EpicType, "");
        }
    });
    $("#drpSprint").change(function () {

        if ($("#drpSprint").val() > 0) {
            //TabId = "plansprint";
            var sprintId = $('#drpSprint').val();
            var sprintType = $("#ManageSprinType").val();
            var ReleaseId = $('#ReleaseId').val();
            GetSprintWiseWorkitems(sprintType, "", ReleaseId, sprintId)
        }
        else {
            $("#dvPlannedWorkitems").empty().html('');
        }
    });
    $("#drpTagsSprint").change(function () {
        var CurrentControlID = $(this).attr("id");
        $(".treegrid-row").show();
        $(".treegrid-expander").show();
        var CurrentTag = $(this).val().toUpperCase();
        if (CurrentTag != "") {
            $(".treegrid-expander").hide();
            $(".treegrid-row").each(function () {
                $(this).find("li span").each(function () {

                });
                var TaskTag = $(this).find(".my-tag")[0].innerHTML.toUpperCase();
                //var TaskTag = $(this)[0].childNodes[5].innerText.toUpperCase();
                if (TaskTag.indexOf(CurrentTag) >= 0)
                    $(this).show();
                else
                    $(this).hide();
            });
        }
        ResetFilters(CurrentControlID);
    });
    $("#editPlanSprint").click(function () {
        if ($("#drpSprint").val() > 0) {
            NewSprintDialog($("#drpSprint").val(), "Edit");
        }
    });
    $("#deletePlanSprint").click(function () {
        if ($("#drpSprint").val() > 0) {
            DeletePlanSprintDialog($("#drpSprint").val());
        }
    });
    $("#startSprint").click(function () {
        if ($("#drpSprint").val() > 0) {
            var Countofworkitem = $('tbody#dvPlannedWorkitems  tr').length;
            if (Countofworkitem > 0) {
                if ($(this).attr('data-isStart') == "true") {
                    if (GetActiveSprintCount()) {
                        if (confirm("Are you sure you want to start the sprint ?")) {
                            setStartCompleteSprintInPlanSprint($("#drpSprint").val(), true);
                            //window.location.reload();
                        }
                    }
                    else {
                        toastr.error("Maximum number of sprints are active at this moment, Please complete one of the existing active sprint before activating a new one");
                    }
                }
            }
            else {
                toastr.error("Minimum one story/workitem needed to start the sprint");
            }

        }
        else {
            toastr.error("Please Select Sprint Name")
        }
    });
    $("#completeSprint").click(function () {
        if ($("#drpSprint").val() > 0) {
            if (confirm("Are you sure you want to Complete the sprint ?")) {
                setStartCompleteSprintInPlanSprint($("#drpSprint").val(), false);
                window.location.href = "/BacklogPlanning/Index";
            }
        }
        else {
            toastr.error("Please Select Sprint Name")
        }
    });

    $('.btnPlanSearch').click(function () {
        var CurrentControlID = "txtPlanSearch";
        ResetFilters(CurrentControlID);
        $(".showfilter .treegrid-row").show();
        $(".showfilter .treegrid-expanded .treegrid-expander,.showfilter .treegrid-collapsed .treegrid-expander").show();
        if ($("#txtPlanSearch").val() != "") {
            $(".showfilter .treegrid-expanded .treegrid-expander,.showfilter .treegrid-collapsed .treegrid-expander").attr("style", "display:none !important");
            $(".showfilter .treegrid-row p").each(function () {
                if ($(this)[0].innerHTML.toUpperCase().indexOf($("#txtPlanSearch").val().toUpperCase()) >= 0 || $($(this)[0]).data("ticketnumber").toUpperCase().indexOf($("#txtPlanSearch").val().toUpperCase()) >= 0) {
                    $(this).closest('tr').show();
                }
                else {
                    $(this).closest('tr').hide();
                }
            });

        }
    });
    $('#btnsearchclose').click(function () {
        if (!$(this).find('#btnsearch').hasClass('fa-times')) {
            $("#txtPlanSearch").val('');
            $('.btnPlanSearch').click();
        }
    });
    $(document).on("click", ".editTaskPlanSprint", function () {

        var sprintID = 0;
        if (this.id > 0) {
            if ($(this).attr('data-taskStatusID') != Enum_Status_Completed) {
                if ($(this).attr('data-sprintId') != "") {
                    sprintID = $(this).attr('data-sprintId');
                }
                else {
                    if ($("#drpSprint").val() > 0) {
                        sprintID = $("#drpSprint").val();
                    }
                }
                TabId = "plansprint-right";
                AddEditTask(ProjectId, this.id, true, sprintID);

            }
            else {
                $('#AddTaskModal').modal('toggle');
                toastr.error('Unable to Edit. This work item is in use.');
            }
        }
        else { $('#AddTaskModal').modal('toggle'); }
    });
    $(document).on("click", ".deleteTaskPlanSprint", function () {
        var taskId = $(this).data('id');
        var isParent = $(this).parents(".treegrid-row").data("parent");
        var canDel = true;
        if ($("#ManageSprinType").val() == Enum_SprintType_Active && isParent == 1) {
            canDel = CheckForLastWorkItemActiveSprint($('#drpSprint').val());
            if (!canDel) {
                toastr.error('Last work item cannot be deleted from the Active sprint');
            }
        }
        if (canDel) {

            if ($(this).attr('data-taskStatusID') == Enum_Status_NotStarted)// changed for bug 59908 by studying Scrum matrix scenarios.
            {
                if (confirm("Are you sure want to Delete Task?")) {
                    var Proceed = true;
                    if ($(this).closest("tr").data("parent") == "1")
                    {
                        Proceed= confirm("This Work item contains Tasks. Are you sure want to Proceed?"); 
                    }
                    if(Proceed)
                    {
                        if (this.id > 0) {
                            deleteTask(this.id);
                            var sprintId = $('#drpSprint').val();
                            var sprintType = $("#ManageSprinType").val();
                            var ReleaseId = $('#ReleaseId').val();
                            GetSprintWiseWorkitems(sprintType, "", ReleaseId, sprintId)
                        }
                       
                    }
                }
            
        }
        else {
            toastr.error('You can not delete the task as it is in use');

        }
    }
    });

$("#btnAddtaskToSprint").click(function () {

    if (TaskIds.length > 0) {
        // DragDropFromBacklogToSprint(storyIds, childIds, 0, true);
        ShowProgress();
        MoveItemsFromBacklogToSprint(TaskIds, true);
        TaskIds.length = 0;
    }
    else {
        toastr.error("Please select at least one Story.")
    }
});

$(document).on('click', '.selectedChk', function () {

    if ($(this).is(":checked")) {
        if ($.inArray($(this).val(), TaskIds) == -1) {
            TaskIds.push($(this).val());
            $("tr[data-parent-id='anode-" + $(this).val() + "']").each(function () {
                TaskIds.push($(this).attr("id").split('-')[1]);
            })
        }
    }
    else {
        TaskIds.splice($.inArray($(this).val(), TaskIds), 1);
        $("tr[data-parent-id='anode-" + $(this).val() + "']").each(function () {
            TaskIds.splice($.inArray($(this).attr("id").split('-')[1], TaskIds), 1);
        })
    }
});
});
function LoadSprintList(StatusId) {
    var ReleaseId = $("#ReleaseId").val();
    var ProjectId = $("#ProjectId").val();
    $.ajax({
        url: "/BacklogPlanning/GetSprintbasedonStatus",
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ StatusId: StatusId, ProjectId: ProjectId, ReleaseId: ReleaseId }),
        dataType: 'json',
        async: false,
        success: function (data) {
            $("#drpSprint").html(""); // clear before appending new list 
            $("#drpSprint").append($('<option></option>').val("").html("Select Sprint"));
            $.each(data, function (i, sprint) {
                $("#drpSprint").append(
                    $('<option></option>').val(sprint.Value).html(sprint.Text));
            });
            $('#drpSprint').trigger("chosen:updated");
        },
        error: function (data) {
        }
    });
}
function DeletePlanSprintDialog(SprintId) {
    $.ajax({
        url: urlDeleteSprint,
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        data: JSON.stringify({ SprintId: SprintId }),
        dataType: 'html',
        success: function (data) {
            var ActiveSprintcount = $(data).find('#ActiveSprintcount').val();
            var workitemcount = $(data).find('#workitemcount').val();
            if (parseInt(ActiveSprintcount) > 0) {
                toastr.error("Active sprints cannot be deleted")
            }
            else {
                if (workitemcount == 0) {
                    if (confirm("Are you sure want to Delete Sprint?")) {
                        SprintDeleteNoworkitem(SprintId);
                    }
                }
                else {
                    $("#deleteplansprintmodal").modal('show');
                    $('#DeleteplansprintModelbody').empty();
                    $('#DeleteplansprintModelbody').html(data);
                }
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function setStartCompleteSprintInPlanSprint(sprintId, IsStart) {
    $.ajax({
        url: "/BacklogPlanning/SetStartCompleteSprint",
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        data: JSON.stringify({ SprintId: sprintId, IsStart: IsStart }),
        dataType: 'json',
        success: function (data) {

            if (data == '1') {
                if (IsStart) {
                    toastr.success("Sprint has been Started sucessfully")
                    window.location.reload();
                }
                else {
                    toastr.success("Sprint has been Completed sucessfully")
                }
               
            }
            else if (data == '-1') {
                toastr.warning("Unable to start Sprint. Sprint duration is not configured for selected Project.")
            }
            else {
                if (confirm("The sprint still have incomplete work items. Completing the sprint will move the incomplete work items to backlog. Do you want to proceed?")) {
                    MoveTaskToBacklog(0, sprintId);
                    window.location.reload();
                }

            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function GetBacklogItemListfrmSprint(EpicID, EpicType, SearchKey) {
    $.ajax({
        type: "POST",
        url: "/BacklogPlanning/GetTasksByEpicType",
        data: '{ "EpicID":' + EpicID + ',"EpicType":' + EpicType + ', "SearchKey":"' + SearchKey + '","ForSprint":"true"}',
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            var Epicname = $('#EpicNamesprint').text();
            $("#dvBackloglistViewSprint").empty().html(data);
            $('#EpicNamesprint').text(Epicname);
            setupCheckboxes();
            DragDropInit();
            /*********************** treetable section ******************/
            tree_grid();
            /*********************** treetable section ******************/
            treegrid_sidebar();
            HideProgress();
            chosen_init();
        }
    });
}

function ResetFilters(CurrentControlID) {
    $(".filter").each(function () {
        if ($(this).attr("id") != CurrentControlID) {
            $(this).val("");
        }
    });
    $(".filter").trigger("chosen:updated");
}

function DragDropWorkItems(FromId, ToParentId) {

    ShowProgress();

    $.ajax({
        type: "POST",
        url: "/BacklogPlanning/DragDropWorkItems",
        data: '{ "FromId":' + FromId + ',"ToParentId":' + ToParentId + '}',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            if (data != "") {
                toastr.success(data + " has been moved successfully.")
            }
            else {
                toastr.error(data + " has not been moved.")
            }
            HideProgress();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            HideProgress();
        }
    });

}
function DragDropFromBacklogToSprint(FromParent, FromChild, ToParentId, IsForMultiple) {

    var sprintId = 0;
    if ($("#drpSprint").val() > 0) {
        ShowProgress();

        var sprintId = $("#drpSprint").val();

        $.ajax({
            type: "POST",
            url: "/BacklogPlanning/DragDropFromBacklogToSprint",
            data: JSON.stringify({ FromParent: FromParent, FromChild: FromChild, ToParentId: ToParentId, SprintId: sprintId }),
            dataType: "json",
            //async:true,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data != "") {
                    
                    toastr.success(data + " moved to Sprint successfully.")
                    if (IsForMultiple) {
                        //-----For Loading Sprint work item list
                        var sprintType = $("#ManageSprinType").val();
                        var ReleaseId = $('#ReleaseId').val();
                        GetSprintWiseWorkitems(sprintType, "", ReleaseId, sprintId)
                       
                        //-----For Loading Backloglist
                        if ($('#EpicIDsearch').val() > 0)
                        { EpicType = Enum_Epic_EpicType }
                        else
                        { EpicType = $('#EpicIDsearch').val(); }

                        if ($('#EpicIDsearch').val() > 0) {
                            $('#EpicNamesprint').text($("#EpicIDsearch option:selected").text());
                            GetBacklogItemListfrmSprint($('#EpicIDsearch').val(), EpicType, "");
                            
                        }
                        else {
                            $('#EpicNamesprint').text($("#EpicIDsearch option:selected").text());
                            GetBacklogItemListfrmSprint(0, EpicType, "");
                        }
                        
                    }

                }

                HideProgress();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                HideProgress();
            }
        });
    }
    else {
        toastr.error("Please Select Sprint Name to move work items in it.")
        window.location.reload();
    }

}

function DragDropFromSprintToBacklog(FromParent, FromChild, ToParentId) {

    var sprintId = 0;
    if ($("#drpSprint").val() > 0) {
        ShowProgress();

        $.ajax({
            type: "POST",
            url: "/BacklogPlanning/DragDropFromSprintToBacklog",
            data: JSON.stringify({ FromParent: FromParent, FromChild: FromChild, ToParentId: ToParentId }),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data != "") {
                    toastr.success(data + " has been moved to Backlog successfully.")


                    //if ($('#EpicIDsearch').val() > 0)
                    //{ EpicType = Enum_Epic_EpicType }
                    //else
                    //{ EpicType = $('#EpicIDsearch').val(); }

                    //if ($('#EpicIDsearch').val() > 0) {
                    //    $('#EpicNamesprint').text($("#EpicIDsearch option:selected").text());
                    //    GetBacklogItemListfrmSprint($('#EpicIDsearch').val(), EpicType, "");
                    //}
                    //else {
                    //    $('#EpicNamesprint').text($("#EpicIDsearch option:selected").text());
                    //    GetBacklogItemListfrmSprint(0, EpicType, "");
                    //}
                }
                else {
                    toastr.error(data + " has not been moved to Backlog.")
                }
                HideProgress();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                HideProgress();
            }

        });
    }
    else {
        toastr.error("Please Select Sprint Name to move work items.")
        window.location.reload();
    }

}
function GetActiveSprintCount() {
    var IsActive = false;
    $.ajax({
        url: "/BacklogPlanning/GetActiveSprint",
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        // data: JSON.stringify({ SprintId: sprintId}),
        dataType: 'json',
        success: function (data) {
            if (data) {
                IsActive = true;
            }
            else {
                IsActive = false;
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
    return IsActive;
}
function SprintDeleteNoworkitem(SprintId) {
    //var SprintId = $("#SprintId").val();
    $.ajax({
        url: "/BacklogPlanning/DeleteAllworkitemForSprint",
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        data: JSON.stringify({ SprintId: SprintId }),
        dataType: 'json',
        success: function (data) {
            var Message = "";
            var RedirectURL = "";
            if (window.location.href.toLowerCase().indexOf("iterativebacklog") > 0) {
                Message = "Iteration has been deleted successfully";
                RedirectURL = "Iterative/IterativeBacklog";
            }
            else {
                Message = "Sprint has been deleted successfully";
                RedirectURL = "/BacklogPlanning/Index";

            }
            if (data) {
                toastr.success(Message);
            }
            $("#deletesprintmodal").modal('hide');
            $('#DeletesprintModelbody').empty();
            window.location.href = RedirectURL;
            return true;
        }
    });
    return false;
}


function MoveItemsFromBacklogToSprint(Tasks, IsForMultiple) {

    var sprintId = $("#drpSprint").val();
    if (sprintId > 0) {
        $.ajax({
            type: "POST",
            url: "/BacklogPlanning/MoveItemsFromBacklogToSprint",
            data: JSON.stringify({ Tasks: Tasks, SprintId: sprintId }),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data != "") {
                    toastr.success("Selected work item(s) have been moved to Sprint successfully.")
                    if (IsForMultiple) {
                        //-----For Loading Sprint work item list
                        var sprintType = $("#ManageSprinType").val();
                        var ReleaseId = $('#ReleaseId').val();

                        GetSprintWiseWorkitems(sprintType, "", ReleaseId, sprintId)

                        //-----For Loading Backloglist
                        if ($('#EpicIDsearch').val() > 0)
                        { EpicType = Enum_Epic_EpicType }
                        else
                        { EpicType = $('#EpicIDsearch').val(); }

                        if ($('#EpicIDsearch').val() > 0) {
                            $('#EpicNamesprint').text($("#EpicIDsearch option:selected").text());
                            GetBacklogItemListfrmSprint($('#EpicIDsearch').val(), EpicType, "");
                        }
                        else {
                            $('#EpicNamesprint').text($("#EpicIDsearch option:selected").text());
                            GetBacklogItemListfrmSprint(0, EpicType, "");
                        }
                    }

                }


            },
            error: function (xhr, ajaxOptions, thrownError) {
                HideProgress();
            }
        });
    }
    else {
        toastr.error("Please Select Sprint Name to move work items in it.")
        window.location.reload();
    }

}

