$(document).ready(function () {
    var GlobWorkItemId = 0
    $("#ViewSprintSummary").click(function () {
        NewSprintDialog($(this).data('sprintid'), 'View');
    })
    var mydrop = undefined;
    var EpicType, SprintType;
    $('#EpicName').text($("#EpicID option:selected").text());
    //Dropzone.autoDiscover = false;

    $(document).off("change", "#EpicID");
    $(document).on("change", "#EpicID", function () {
        ShowProgress();
        loadBacklogList();
    });

    // loadBacklogList();
    $(document).on('click', ".AddTask", function () {
        Edit = false;
        TabId = "backlogAddNew";
        AddEditTask(ProjectId, 0, false, 0);
    });

    
    $(document).on('click', ".AddTaskSprint", function () {
        Edit = false;
        if (this.id > 0) {
            TabId = $(this).parents('.tab-pane').attr('id');
            //TabId = "plansprint";
            AddEditTask(ProjectId, 0, false, this.id);
        }
        else { $('#AddTaskModal').modal('toggle'); }
    });

    /////-----Search-------////
    $(document).on('click', ".btnSearch", function () {
        var CurrentControlID = "txtSearch";
        if ($("#" + CurrentControlID).val() != "") {
            ResetFilters(CurrentControlID);
            $(".treegrid-row").show();
            $(".treegrid-expanded .treegrid-expander,.treegrid-collapsed .treegrid-expander").show();
            if ($("#txtSearch").val() != "") {
                $(".treegrid-expander").hide();
                $(".treegrid-row p").each(function () {
                    if ($(this)[0].innerHTML.toUpperCase().indexOf($("#txtSearch").val().toUpperCase()) >= 0 || $($(this)[0]).data("ticketnumber").toUpperCase().indexOf($("#txtSearch").val().toUpperCase()) >= 0) {
                        $(this).closest('tr').show();
                    }
                    else {
                        $(this).closest('tr').hide();
                    }
                });
            }

            if ($('.page-header')[0].innerText == "Plan Sprint") {
                var searchText = $("#txtSearch").val();
                $('.btnPlanSearch').click();
                $("#txtSearch").val(searchText);
            }
        }


    });

    function ResetFilters(CurrentControlID) {
        $(".filter").each(function () {
            if ($(this).attr("id") != CurrentControlID) {
                $(this).val("");
            }

        });
        $(".filter").trigger("chosen:updated");

    }
    $(document).on('change', "#drpTags", function () {
        var CurrentControlID = $(this).attr("id");
        $(".treegrid-row").show();
        $(".treegrid-expander").show();
        var CurrentTag = $(this).val().toUpperCase();
        if (CurrentTag != "") {
            $(".treegrid-expander").hide();
            $(".treegrid-row").each(function () {
                $(this).find(".my-tag li span").each(function () {

                });
                var TaskTag = $(this).find(".my-tag")[0].innerHTML.toUpperCase();
                if (TaskTag.indexOf(CurrentTag) >= 0)
                    $(this).show();
                else
                    $(this).hide();
            });
        }
        else {
            /*********************** treetable section ******************/
            tree_grid();
        }
        ResetFilters(CurrentControlID);
    });

    $("#txtSearch").on('keypress', function () {
        $("#closesearch").css("display", "none");
        if ($(this).val() != null) {
            $("#closesearch").css("display", "block");
        }
        else {
            $("#closesearch").css("display", "none");
            var CurrentControlID = "txtSearch";
            $("#txtSearch").val("");
            ResetFilters(CurrentControlID)

        }
    });
    $(document).on('click', "#closesearch", function () {
        $(this).css("display", "none");
        $("#txtSearch").val("");
        $('.btnSearch').click();
        tree_grid();
    });
    ////-----End Search ----////

    $(document).on('click', ".activeSprint", function () {
        NewSprintDialog(0, "Add");
    });
    $(document).on('click', "#btnClosesprint", function () {
        $("#SprintModal").modal('hide');
        $('#SprintModelbody').empty();
    });

    $(document).on("change", "#SprinType", function () {
        SprintType = $(this).val();
        var releaseID = $('#drpRelease').val();
        ShowProgress();
        GetReleasewiseSprintWorkitems(SprintType, "", releaseID, true);
    });
    $(document).on("change", "#drpRelease", function () {
        if ($('#drpRelease').val() > 0) {
            SprintType = $('#SprinType').val();
            var releaseID = $(this).val();
            ShowProgress();
            GetReleasewiseSprintWorkitems(SprintType, "", releaseID, true);
            $('#ReleaseTitle').text($("#drpRelease option:selected").text());
        }
    });
    $(document).on('click', "#btnaddrelease", function () {
        var ReleaseId = 0;
        ReleaseDialog(ReleaseId);
    });
    $(document).on('click', ".editrelease", function () {
        var ReleaseId = $(this).data("releaseid");
        if (ReleaseDialog(ReleaseId))
        { return true; }
        else {
            return false;
        }

    });
    $(document).on('click', ".deleterelease", function () {
        var ReleaseId = $(this).data("releaseid");
        if (DeleteDialog(ReleaseId))
        { return true; }
        else {
            return false;
        }
    });
    $(document).on('click', ".markcloserelease", function () {
        var ReleaseId = $(this).data("releaseid");
        if (ReleaseMarkAsClose(ReleaseId))
        { return true; }
        else {
            return false;
        }
    });

    $(document).on('click', "#sprintTab", function () {
        if (!IsSprintTabViewed) {
            SprintType = $('#SprinType').val();
            var releaseID = 0;

            if ($('#drpRelease').val() > 0) {
                releaseID = $('#drpRelease').val();
            }

            ShowProgress();
            GetReleasewiseSprintWorkitems(SprintType, "", releaseID, true);
            $('#ReleaseTitle').text($("#drpRelease option:selected").text());
            IsSprintTabViewed = true;
        }

        side_bar_hide();
    });
    $(document).on('click', "#backlogTab", function () {
        side_bar_hide();
    });

});

function AddEditTask(ProjectId, TaskId, IsEdit, sprintId) {

    $.ajax({
        type: "POST",
        url: urlAddNewTask,
        data: '{ "IsEdit":' + IsEdit + ',"ProjectID": ' + ProjectId + ',"TaskId":' + TaskId + ',"SprintId":' + sprintId + '}',
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            $("#AddTaskModal").empty().html(data);
            if (IsEdit) {
                AddThumbnails(TaskId);
            }
            custome_scroll_init();

        }
    });
}
function getFileExtension(name) {
    var found = name.lastIndexOf('.') + 1;
    return (found > 0 ? name.substr(found) : "");
}
function AddThumbnails(TaskID) {

    $.ajax({
        type: "POST",
        url: "/Task/GetAttachments",
        data: '{ "TaskID":"' + TaskID + '"}',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {

            var Result = data.Data;
            var ImagePath;
            $.each(Result, function () {

                var image = new Image();
                var path = $(this)[0].Path;
                var AttachmentID = $(this)[0].AttachmentID;
                var pathDefault = '../Documents/Task/';
                image.src = '../Documents/Task/Thumbnail/' + $(this)[0].Path;
                var Doc_Name = $(this)[0].DocumentName;
                $.get(image.src).done(function () {
                    ImagePath = image.src;

                    $('<div class="ClsThumbnail" id="divAttachment_' + AttachmentID + '"><a href="' + pathDefault + path + '" target="_blank" download><img src="' + ImagePath + '" width="70px" height="70px" data-OriginalPath="' + path + '" data-toggle="tooltip" title="click to download"/></a> <span>' + Doc_Name + '</span><br><button type="button" class="btn btn-danger btn-xs deleteTaskAttachment" data-attachmentName="' + Doc_Name + '"  data-attachmentId="' + AttachmentID + '"><i class="fa fa-trash no-margin"></i></button></div>').appendTo($(".upload-drop-zone"));
                }).fail(function () {

                    var Extension = getFileExtension(path);
                    if (Extension.indexOf("txt") >= 0)
                        ImagePath = "../Images/FileIcon_txt.png";
                    else if (Extension.indexOf("doc") >= 0 || Extension.indexOf("docx") >= 0)
                        ImagePath = "../Images/FileIcon_Word.png";
                    else if (Extension.indexOf("xls") >= 0 || Extension.indexOf("xlsx") >= 0)
                        ImagePath = "../Images/FileIcon_Excel.png";
                    else if (Extension.indexOf("pdf") >= 0)
                        ImagePath = "../Images/FileIcon_pdf.png";
                    else
                        ImagePath = "../Images/thumbnail-default.jpg";

                    $('<div class="ClsThumbnail" id="divAttachment_' + AttachmentID + '"><a href="' + pathDefault + path + '" download><img src="' + ImagePath + '" width="70px" height="70px" data-OriginalPath="' + path + '"  data-toggle="tooltip" title="click to download"/></a> <span>' + Doc_Name + '</span><br><button class="btn btn-danger btn-xs deleteTaskAttachment" type="button" data-attachmentName="' + Doc_Name + '" data-attachmentId="' + AttachmentID + '"><i class="fa fa-trash no-margin"></i></button></div>').appendTo($(".upload-drop-zone"));
                })
            });

        }
    });

}
function VerifyStatus(TaskID) {
    $.ajax({
        type: "POST",
        url: "/Task/VerifyStatus",
        data: '{ "TaskID":' + TaskID + '}',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            Edit = data;
        },
        error: function (response) {
            alert(response.responseText);
        }
    });

}
function GetActivities(TaskID) {

    $.ajax({
        type: "POST",
        url: urlActivities,
        dataType: 'html',
        data: "{'TaskID':'" + TaskID + "'}",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#dvActivity").html(data);
            //$("#HistoryTab").html(data);
        }
    });

}
function GetBacklogItemList(EpicID, EpicType, SearchKey) {
    $.ajax({
        type: "POST",
        url: "/BacklogPlanning/GetTasksByEpicType",
        data: '{ "EpicID":' + EpicID + ',"EpicType":' + EpicType + ', "SearchKey":"' + SearchKey + '","ForSprint":"false"}',
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            var Epicname = $('#EpicName').text();
            $("#dvBackloglistView").empty().html(data);
            $('#EpicName').text(Epicname);
            /*********************** treetable section ******************/
            tree_grid();
            /*********************** treetable section ******************/
            treegrid_sidebar();
            HideProgress();
            custome_scroll_init();
            $(".btnSearch").click();
        }
    });
}

function GetWorkItemDetails(WorkItemId, dvID) {
    if (WorkItemId > 0) {

        var fromPage = '';
        //if (dvID.indexOf('sprints') != -1)
        //{ fromPage = 'sprints'; }
        //else if (dvID.indexOf('backlog') != -1)
        //{ fromPage = 'backlog'; }

        ShowProgress();
        $.ajax({
            type: "POST",
            url: "/BacklogPlanning/GetTasksDetails",
            data: '{ "WorkItemId":' + WorkItemId + '}',
            dataType: "html",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                GlobWorkItemId = WorkItemId;
                $("#backlog-tabRightPanel").empty();
                $("#sprints-tabRightPanel").empty();
                $(dvID).show();
                $(dvID).empty().html(data);

                /*********************** treetable section ******************/
                //tree_grid();
                /*********************** treetable section ******************/
                //treegrid_sidebar();
                custome_scroll_init();

                //Dropzone.autoDiscover = false;

                var dvDropId = '#my-dropzone';

                $(dvDropId).empty();
                if (typeof mydrop === 'undefined') { }
                else {
                    //if (mydrop != undefined) {
                    $(dvDropId).dropzone();
                    Dropzone.forElement(dvDropId).destroy();
                }

                mydrop = $(dvDropId).dropzone({ url: FilesUrl + "?Id=" + WorkItemId });
                //$("#my-dropzone").dropzone({ url: FilesUrl + "?Id=" + WorkItemId });
                //BindDropZone(WorkItemId);
                $("html, body").animate({ scrollTop: 0 }, 600);
                HideProgress();
            }
        });
    }
}
function deleteTask(taskId) {
    $.ajax({
        type: "POST",
        url: urlDeleteTask,
        data: '{ "WBSId": "' + taskId + '"}',
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            HideProgress();
            if (data > 0) {
                toastr.success('Work item deleted successfully.');
            } else {
                toastr.error('You can not delete Work item as it is in use.');
            }
            return true;
        },
        error: function (response) {
            //alert(response.responseText);
        }
    });
}

function HideSideBar() {
    side_bar_hide(this);
}

function NewSprintDialog(sprintId, Mode) {
    var IsEdit = false;
    if (sprintId > 0) { IsEdit = true; }
    $.ajax({
        type: "POST",
        url: urlGetNewSprint,
        data: '{ "ProjectId": "' + ProjectId + '","SprintId":"' + sprintId + '","IsIteration":"false"}',
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data) {
                if (sprintId != 0) {
                    $("#newrsprintTitle").text("Active Sprint");
                }
                else {
                    $("#newrsprintTitle").text("Create Sprint");
                    $('#ReleaseId').val($('#drpRelease').val());
                }
                $("#SprintModal").modal('show');
                $('#SprintModelbody').empty();
                $('#SprintModelbody').html(data);
                if (Mode == "View") {
                    $("#txtSprintName").attr('disabled', true);
                    $("#ReleaseId").attr('disabled', true);
                    $("#Description").attr('disabled', true);
                    $("#btnSavesprint").attr('disabled', true);
                }
                chosen_init();
                GetSprintSummary(sprintId);
            }
            return true;
        },
        error: function (response) {
            //alert(response.responseText);
        }
    });
}
function GetSprintSummary(sprintId) {
    $.ajax({
        type: "POST",
        url: 'GetSprintSummary',
        data: "{ 'SprintID': " + parseInt(sprintId) + " }",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            $("#SprintSummary").empty();
            if (result.length > 0) $("#SprintSummary").append("<tr><th>Assignee</th><th>Work Items</th><th>Original Time Estimate</th>")
            var Totalworkitems = 0;
            var TotalHours = 0;
            for (var i = 0; i < result.length; i++) {
                var Pic = Path + "/" + result[i].EmpId + "_Photo.png";
                $("#SprintSummary").append("<tr><td  style='width:175px !important;'><img src='" + Pic + "' class='img-circle img-responsive profile-thumb img-thumbnail'/>" + result[i].AssigneeName + "</td><td style='text-align:center; vertical-align: middle;'>" + result[i].WorkItems + "</td><td style='text-align:center; vertical-align: middle;'>" + result[i].TotalHours + "</td>")
                Totalworkitems = Totalworkitems + parseInt(result[i].WorkItems);
                TotalHours = TotalHours + parseFloat(result[i].TotalHours);
            }
            if (result.length > 0) {
                $("#SprintSummary").append("<tr><td  style='text-align:center; vertical-align: middle;'>Total</td><td  style='text-align:center; vertical-align: middle;'>" + Totalworkitems + "</td><td  style='text-align:center; vertical-align: middle;'>" + TotalHours + "</td>")
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText)
        }

    })

}

function GetReleasewiseSprintWorkitems(sprintType, SearchKey, ReleaseId, setPrevControls) {

    var sprintId = 0;
    if ($('#drpSprint').val() > 0) {
        //sprintId = $('#drpSprint').val(); change for issue 60575
    }
    $.ajax({
        type: "POST",
        url: "/BacklogPlanning/GetReleasewiseSprintWorkitems",
        data: '{ "SprintType":' + sprintType + ',"SearchKey":"' + SearchKey + '", "ReleaseID":' + ReleaseId + ',"SprintId":' + sprintId + '}',
        //dataType: "html",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            //var Epicname = $('#EpicName').text();
            $("#dvSprintList").empty().html(data);
            if (setPrevControls) {
                $('#SprinType').val(sprintType);
                $('#drpRelease').val(ReleaseId);

            }
            if ($('#drpRelease').val() > 0) {
                $('#ReleaseTitle').text($("#drpRelease option:selected").text());
            }
            else {
                $("#dvReleaseDetail").hide();
            }
            chosen_init();
            $('#SprinType').trigger("chosen:updated");
            //$('#drpRelease').trigger("chosen:updated");
            //$('#EpicName').text(Epicname);
            /*********************** treetable section ******************/
            tree_grid();
            /*********************** treetable section ******************/
            treegrid_sidebar();
            HideProgress();
            chosen_init();
        }
    });
}

//-------Progress bar --------//
function HideProgress() {
    $('.loader-wrapper').css('display', 'none');
}

function ShowProgress() {

    if ($('.loader-wrapper').css('display') == "none") {
        $(".loader-wrapper").show();
    }
}
//--------End ----------//

function ReleaseDialog(ReleaseId) {
    $("#new-release-modal").modal('show');
    $.ajax({
        url: urlReleaseSprint,
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        data: JSON.stringify({ ReleaseId: ReleaseId }),
        dataType: 'html',
        success: function (data) {

            if (data) {
                if (ReleaseId != 0) {
                    $("#newreleaseTitle").text("Update Release");
                }
                else {
                    $("#newreleaseTitle").text("New Release");
                }
                $('#ReleaseModelbody').empty();
                $('#ReleaseModelbody').html(data);
            }
            return true;
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function DeleteDialog(ReleaseId) {

    $.ajax({
        url: urlDeleteReleaseSprint,
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        data: JSON.stringify({ ReleaseId: ReleaseId }),
        dataType: 'html',
        success: function (data) {
            var ActiveSprintcount = $(data).find('#ActiveSprintcount').val();
            var workitemcount = $(data).find('#workitemcount').val();
            if (parseInt(ActiveSprintcount) > 0) {
                toastr.error("Release has active sprints,you can not delete it")
            }
            else {
                if (workitemcount == 0) {
                    if (confirm("Are you sure want to Delete Release?")) {
                        DeleteReleaseInPlansprint(ReleaseId);
                    }
                }
                else {
                    $("#deletereleasemodal").modal('show');
                    $('#DeletereleaseModelbody').empty();
                    $('#DeletereleaseModelbody').html(data);
                }

            }
            return true;
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function ReleaseMarkAsClose(ReleaseId) {

    $.ajax({
        url: urlmarkreleaseasReleaClose,
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        data: JSON.stringify({ ReleaseId: ReleaseId }),
        dataType: 'json',
        success: function (data) {
            if (data) {
                var SprintType = $('#SprinType').val();
                var releaseID = 0;
                ShowProgress();
                GetReleasewiseSprintWorkitems(SprintType, "", releaseID, false);
                $('#ReleaseTitle').text($("#drpRelease option:selected").text());
                toastr.success("Release has been Closed sucessfully")
            }
            else {
                toastr.error("The release consists of active sprints and thus cannot be Closed")
            }
            return true;
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function MoveTaskToBacklog(WBSId, SprintId) {

    $.ajax({
        url: urlMoveTaskToBacklog,
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        data: JSON.stringify({ WBSID: WBSId, SprintID: SprintId }),
        dataType: 'json',
        success: function (data) {

            if (data) {
                toastr.success("Work item has been moved to Backlog sucessfully")
            }
            else {
                toastr.error("Work item has not been moved.")
            }
            return true;
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function GetSprintWiseWorkitems(sprintType, SearchKey, ReleaseId, sprintId) {
    var sprintType, ReleaseId;

    $.ajax({
        type: "POST",
        url: "/BacklogPlanning/GetSprintWiseWorkitems",
        data: '{ "SprintType":' + sprintType + ',"SearchKey":"' + SearchKey + '", "ReleaseID":' + ReleaseId + ',"SprintId":' + sprintId + '}',
        //dataType: "html",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            //var Epicname = $('#EpicName').text();
            $("#dvPlannedWorkitems").empty().html(data);
            //if (setPrevControls) {
            //    $('#SprinType').val(sprintType);
            //    $('#drpRelease').val(ReleaseId);

            //}
            //if ($('#drpRelease').val() > 0) {
            //    $('#ReleaseTitle').text($("#drpRelease option:selected").text());
            //}
            chosen_init();
            //$('#SprinType').trigger("chosen:updated");
            //$('#drpRelease').trigger("chosen:updated");
            //$('#EpicName').text(Epicname);
            /*********************** treetable section ******************/
            tree_grid();
            /*********************** treetable section ******************/
            treegrid_sidebar();
            tree_empty();
            HideProgress();
        }
    });

}

function loadBacklogList() {

    if ($('#EpicID').val() > 0) {
        EpicType = Enum_Epic_EpicType
        $('#EpicName').text($("#EpicID option:selected").text());
        GetBacklogItemList($('#EpicID').val(), EpicType, "");
    }
    else {
        EpicType = $('#EpicID').val();
        $('#EpicName').text($("#EpicID option:selected").text());
        GetBacklogItemList(0, EpicType, "");
    }

}
function GetBacklogItemListForKanban(EpicID, EpicType, SearchKey) {
    $.ajax({
        type: "POST",
        url: "/Kanban/GetTasksByEpicType",
        data: '{ "EpicID":' + EpicID + ',"EpicType":' + EpicType + ', "SearchKey":"' + SearchKey + '","ForSprint":"false"}',
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            //var Epicname = $('#EpicName').text();
            $("#dvBackloglistViewKanban").empty().html(data);
            //$('#EpicName').text(Epicname);
            /*********************** treetable section ******************/
            tree_grid();
            /*********************** treetable section ******************/
            treegrid_sidebar();
            HideProgress();
            custome_scroll_init();
            $(".btnSearch").click();
        }
    });
}

function FillTagsDrp(drpID) {
    $.ajax({
        type: "GET",
        url: "/BacklogPlanning/GetAllTags",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            result = data
            $(drpID).empty();
            $(drpID).append("<option value='0'>Search Tags </option>");
            for (var i = 0; i < result.length; i++) {
                $(drpID).append("<option value='" + result[i].Value + "'>" + result[i].Text + "</option>");
            }
            $(drpID).trigger("chosen:updated");
        }

    });
}

function CheckForLastWorkItemActiveSprint(sprintID) {
    var calDelete = false;
    $.ajax({
        url: "/BacklogPlanning/CheckForLastWorkItemActiveSprint",
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        data: JSON.stringify({ SprintId: sprintID }),
        dataType: 'json',
        success: function (data) {
            if (data) {
                calDelete = true;
            }
            else {
                calDelete = false;
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
    return calDelete;
}
function DeleteReleaseInPlansprint(ReleaseId) {
    $.ajax({
        url: "/BacklogPlanning/DeleteAllRelease",
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        data: JSON.stringify({ ReleaseId: ReleaseId }),
        dataType: 'json',
        success: function (data) {

            if (data) {
                toastr.success("Release has been deleted successfully");
            }
            $("#deletereleasemodal").modal('hide');
            $('#DeletereleaseModelbody').empty();
            var SprintType = $('#SprinType').val();
            var releaseID = 0;
            GetReleasewiseSprintWorkitems(SprintType, "", releaseID, false);
            return true;
        }
    });
    return false;
}