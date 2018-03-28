$(document).ready(function () {

    $('#SprinType').trigger("chosen:updated");
    $('#drpRelease').trigger("chosen:updated");

    $(document).on("click", ".AddTaskPlanSprint", function () {
        Edit = false;
        if (this.id > 0) {
            // TabId = $(this).parents('.tab-pane').attr('id');
            TabId = "plansprint";
            AddEditTask(ProjectId, 0, false, this.id);
        }
        else { $('#AddTaskModal').modal('toggle'); }
    });

    $(document).on("click", ".editTaskSprint", function () {
        if (this.id > 0) {
            if ($(this).attr('data-taskStatusID') != Enum_Status_Completed) {
                TabId = $(this).parents('.tab-pane').attr('id');
                var sprintID = $(this).attr('data-sprintId');
                AddEditTask(ProjectId, this.id, true, sprintID);
            }
            else {
                $('#AddTaskModal').modal('toggle');
                toastr.error('Unable to Edit. This work item is in use.');
            }
        }
        else { $('#AddTaskModal').modal('toggle'); }
    });
    $(document).on("click", ".EditSprints", function () {
        if ($(this).attr("id") > 0) {
            NewSprintDialog($(this).attr("id"), "Edit");
        }
    });
    $(document).on("click", ".deleteTaskSprint", function () {
        var taskId = $(this).data('id');
        //var isProductBackLog = $(this).data('isproductbacklog');
        //var sprintType = $('#drpSprintTypes').val();
        
        var isParent = $(this).parents(".treegrid-row").attr("title");
        var IsActiveSprint = $(this).data("isactivesprint");
        var sprintId = $(this).data("sprintid");
        var canDel = true;

        if (IsActiveSprint == "True" && isParent == Enum_TaskType_Story && sprintId > 0) {
            
            canDel = CheckForLastWorkItemActiveSprint(sprintId);
            if (!canDel) {
                toastr.error('Active sprint should consist of atleast one story');
            }
        }
        if (canDel) {
            if ($(this).attr('data-taskStatusID') == Enum_Status_NotStarted)// changed for bug 59908 by studying Scrum matrix scenarios.
            {
                if (confirm("Are you sure want to Delete this Work item?")) {
                    if (this.id > 0) {
                        deleteTask(this.id);
                        SprintType = $('#SprinType').val();
                        var releaseID = $('#drpRelease').val();
                        ShowProgress();
                        GetReleasewiseSprintWorkitems(SprintType, "", releaseID, true);
                    }
                }
            }
            else {
                toastr.error('You can not delete the task as it is in use.');
            }
            HideSideBar();

        }
    });

    $(document).on("click", ".viewTaskSprint", function () {
        if (this.id > 0) {
            ShowProgress();
            Viewsidebar(this.id, '#sprints-tabRightPanel');
        }
    });

    $(document).on("click", ".moveTaskSprint", function () {

        if ($(this).attr("id") > 0) {

            var isParent = $(this).parents(".treegrid-row").attr("title");
            var IsActiveSprint = $(this).data("isactivesprint");
            var sprintId = $(this).data("sprintid");
            var canDel = true, canMove=true;

            //---Story with all workitems having NotStarted status can only be moved to backlog for Planned and Active sprint
            if (isParent == Enum_TaskType_Story && sprintId > 0) {
                $(".treegrid-row[data-parent-id='" + $(this).attr("id") + "']").each(function () {
                    if ($(this).data("taskstatusid") != Enum_Status_NotStarted) {
                        canMove = false;
                    }
                })
                if (!canMove) {
                    toastr.error('Unable to move Story. Some of its Work Item(s) are having status other than NotStarted.');
                }
            }
            if (IsActiveSprint == "True" && isParent == Enum_TaskType_Story && sprintId > 0) {
                canDel = CheckForLastWorkItemActiveSprint(sprintId);
                if (!canDel) {
                    toastr.error('Active sprint should consist of atleast one story');
                }
            }
            if (canDel && canMove) {
                if ($(this).attr('data-taskStatusID') != Enum_Status_Completed) {
                    MoveTaskToBacklog($(this).attr("id"), 0);
                    SprintType = $('#SprinType').val();
                    var releaseID = $('#drpRelease').val();
                    ShowProgress();
                    GetReleasewiseSprintWorkitems(SprintType, "", releaseID, true);
                }
                else {
                    toastr.error('Unable to Move to Backlog. This work item has been done/completed.');
                }
            }
        }
    });

    $(document).on("click", ".StartCompleteSprints", function () {
        if ($(this).attr("id") > 0) {
            if ($(this).attr('data-isStart') == "true") {

                if (GetActiveSprintCount()) {
                    if (confirm("Are you sure you want to start the sprint ?")) {
                        setStartCompleteSprint($(this).attr("id"), true);
                    }
                }
                else {
                    toastr.error("Maximum number of sprints are active at this moment, Please complete one of the existing active sprint before activating a new one");
                }
            }
            else {
                if (confirm("Are you sure you want to Complete the sprint ?")) {
                    setStartCompleteSprint($(this).attr("id"), false);
                }
            }
            SprintType = $('#SprinType').val();
            var releaseID = $('#drpRelease').val();
            ShowProgress();
            GetReleasewiseSprintWorkitems(SprintType, "", releaseID, true);
        }
    });

    $(document).on("click", "#btnSavesprint", function () {
        if (AddUpdateSprint())
        { return true; }
        else {
            return false;
        }

    });
    $(document).on("click",".DeleteSprint",function () {      
        var SprintId = $(this).attr('id');
        if (SprintId > 0) {
            DeleteSprintDialog(SprintId);
        }
    });
    $(document).on("click",".Manageworkitem",function () {      
    
        var SprintId = $(this).attr('id');
        var Ismanage = true;
        window.location.href = '/BacklogPlanning/PlanSprint?SprintId=' + SprintId + '&Ismanage=' + Ismanage;
    });

    $(document).on("click",'.Viewsprintdetail',function () {
        if ($(this).attr("id") > 0) {
            NewSprintDialog($(this).attr("id"), "View");
        }
    });

    /*
            $.ajax({
                type: "POST",
                url: "/Task/GetTags",
                data: '',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
        
                    var TagsArray = jQuery.parseJSON(data.result);
                    var lowercaseArray = jQuery.parseJSON(data.result);
                    $.each(lowercaseArray, function (index, value) {
                        lowercaseArray[index] = value.toLowerCase().replace(/\s+/g, '');
                    });
                    var tagList = tags.split(',');
                    for (var i = 0; i < tagList.length; i++) {
                        var indx = lowercaseArray.indexOf(tagList[i].toLowerCase());
                        if (indx > -1) {
                            TagsArray.splice(indx, 1);
                            lowercaseArray.splice(indx, 1);
            /*
                $.ajax({
                    type: "POST",
                    url: "/Task/GetTags",
                    data: '',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    async: false,
                    success: function (data) {
            
                        var TagsArray = jQuery.parseJSON(data.result);
                        var lowercaseArray = jQuery.parseJSON(data.result);
                        $.each(lowercaseArray, function (index, value) {
                            lowercaseArray[index] = value.toLowerCase().replace(/\s+/g, '');
                        });
                        var tagList = tags.split(',');
                        for (var i = 0; i < tagList.length; i++) {
                            var indx = lowercaseArray.indexOf(tagList[i].toLowerCase());
                            if (indx > -1) {
                                TagsArray.splice(indx, 1);
                                lowercaseArray.splice(indx, 1);
                            }
            
                        }
                        $("#myTags").tagit({
                            availableTags: TagsArray,
                            allowDuplicates: false,
                            afterTagAdded: function (event, ui) {
            
                                if (!ui.duringInitialization) {
                                    UpdateTags();
                                }
                            },
                            afterTagRemoved: function (event, ui) {
            
                                if (!ui.duringInitialization) {
                                    UpdateTags();
                                }
                            }
                            //tagLimit: 3
                        });
                    }
                });
            
                var tagList = tags.split(',');
                for (var i = 0; i < tagList.length; i++) {
                    $("#myTags").tagit('createTag', tagList[i], '', true);
                }
                */
});

//function UpdateTags() {
//    debugger
//    var tags = '';
//    $("#myTags .tagit-label").each(function () {
//        tags += $(this).html() + ",";
//    });

//    if (tags != '' && WBSID > 0) {
//        $.ajax({
//            type: "POST",
//            url: "/BacklogPlanning/UpdateTags",
//            data: '{ "WBSID":' + WBSID + ', "Tags":"' + tags + '"}',
//            dataType: "json",
//            contentType: "application/json; charset=utf-8",
//            async: false,
//            success: function (data) {

//            }
//        });
//    }
//}

/*
function AddEditTask(ProjectId, TaskId, IsEdit) {
    var sprintId = 0;
    if ($("#ddlSprint") != undefined && $("#ddlSprint").val() != undefined)
        sprintId = $("#ddlSprint").val();
    $.ajax({
        type: "POST",
        url: urlAddNewTask,
        data: '{ "IsEdit":' + IsEdit + ',"ProjectID": ' + ProjectId + ',"TaskId":' + TaskId + ',"SprintId":' + sprintId + '}',
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (IsEdit) {
                VerifyStatus(TaskId);
            }
            else
                Edit = false;
            $("#AddTaskModal").empty().html(data);
            if (IsEdit) {
                AddThumbnails(TaskId);
            }
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
                image.src = '../Documents/Task/Thumbnail/' + $(this)[0].Path;
                var Doc_Name = $(this)[0].DocumentName;
                $.get(image.src).done(function () {
                    ImagePath = image.src;

                    $('<div class="ClsThumbnail"><img src="' + ImagePath + '" width="100px" height="100px" data-OriginalPath="' + path + '" data-toggle="tooltip" title="Click to download"/> <span>' + Doc_Name + '</span></div>').appendTo($(".upload-drop-zone"));
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

                    $('<div class="ClsThumbnail"><img src="' + ImagePath + '" width="100px" height="100px" data-OriginalPath="' + path + '"  data-toggle="tooltip" title="Click to download" /> <span>' + Doc_Name + '</span></div>').appendTo($(".upload-drop-zone"));
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
*/

//function AddEditTask(ProjectId, TaskId, IsEdit, sprintId) {

//    //if ($("#ddlSprint") != undefined && $("#ddlSprint").val() != undefined)
//    //  in sprints.js
//    
//    $.ajax({
//        type: "POST",
//        url: urlAddNewTask,
//        data: '{ "IsEdit":' + IsEdit + ',"ProjectID": ' + ProjectId + ',"TaskId":' + TaskId + ',"SprintId":' + sprintId + '}',
//        dataType: "html",
//        contentType: "application/json; charset=utf-8",
//        success: function (data) {
//            if (IsEdit) {
//                VerifyStatus(TaskId);
//            }
//            else
//                Edit = false;

//            $('#AddTaskModal').modal('show');
//            $("#AddTaskModal").empty().html(data);
//            if (IsEdit) {
//                AddThumbnails(TaskId);
//            }
//        }
//    });
//}

function ClearFormSprint() {
    $("#SprintModal").modal('hide');
    $('#SprintModelbody').empty();

}
function AddUpdateSprint() {    
    if (ValidateSprint()) {
        var SprintId = $("#SprintId").val();
        var formdata = new FormData($('#frmSprint').get(0));
        $.ajax({
            url: "/BacklogPlanning/SaveSprint",
            type: "POST",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
               
                if (data > 0) {

                    var SprintType = $('#SprinType').val();
                    var releaseID = $('#drpRelease').val();
                    ShowProgress();
                    GetReleasewiseSprintWorkitems(SprintType, "", releaseID, true);

                    if (data > 0) {
                        $("#SprintModal").modal('hide');
                        var Ismanage = false;
                        if (SprintId == 0) {
                            Ismanage = true;
                        }
                        var url = "/BacklogPlanning/PlanSprint?SprintId=" + data + '&IsManage=' + Ismanage;
                        window.location.href = url;
                        toastr.success("Sprint details has been saved successfully");
                    }

                    ClearFormSprint();
                }
                else if (data = -1) {
                    toastr.error("Sprint Name already exists.");
                }
                else {
                }
                return true;
            }
        });
    }
    return false;
}
function ValidateSprint() {
    var status = true;
    $(".form-group").removeClass("has-error  has-feedback");
    var SprintName = $.trim($('#txtSprintName').val());
    var Description = $.trim($("#Description").val());
    var ReleaseID = $("#ReleaseId").val();
    var strErrorMessage = '';
    $('#errorMessage').html('');
    $('#errorMessage').hide();
    if (SprintName == "") {
        strErrorMessage += "<li>Please Enter Sprint name</li>";
        $("#txtSprintName").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (SprintName.length > 30) {
        strErrorMessage += "<li>Maximum 30 characters allowed for Sprint Name</li>";
        $("#txtSprintName").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (Description.length > 300) {
        strErrorMessage += "<li>Maximum 300 characters allowed for Description</li>";
        $("#Description").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (ReleaseID <= 0) {
        strErrorMessage += "<li>Please select Release</li>";
        $("#ReleaseId").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (status == false && strErrorMessage != null) {
        $('#errorMessage').css('display', 'block');
        $('#errorMessage').html("<ul>" + strErrorMessage + "</ul>");
        $('ul li:empty').remove();
    }
    return status;
}
function setStartCompleteSprint(sprintId, IsStart) {

    $.ajax({
        url: urlsetStartCompleteSprint,
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        data: JSON.stringify({ SprintId: sprintId, IsStart: IsStart }),
        dataType: 'json',
        success: function (data) {
            if (data == '1') {
                if (IsStart) {
                    toastr.success("Sprint has been Started sucessfully")
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
                    loadBacklogList();
                }

            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function DeleteSprintDialog(SprintId) {
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
                    $("#deletesprintmodal").modal('show');
                    $('#DeletesprintModelbody').empty();
                    $('#DeletesprintModelbody').html(data);
                }
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
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
   // var SprintId = $("#SprintId").val();
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