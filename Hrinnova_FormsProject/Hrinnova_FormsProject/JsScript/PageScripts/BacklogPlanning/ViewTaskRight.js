$(document).ready(function () {

    $(".AddTaskRight").click(function () {
        Edit = false;

        AddEditTask(ProjectId, 0, false, 0);
    });
    //$(".editTask").click(function ()
    $(".editTaskRight").on("click", function () {
        var sprintID = 0;
        if (this.id > 0) {
            if ($(this).attr('data-taskStatusID') != Enum_Status_Completed) {
                if ($(this).attr('data-sprintId') != "") {
                    sprintID = $(this).attr('data-sprintId');
                }
                TabId = $(this).parents('.tab-pane').attr('id') + "-right";
                AddEditTask(ProjectId, this.id, true, sprintID);

            }
            else {
                $('#AddTaskModal').modal('toggle');
                toastr.error('Unable to Edit. This work item is in use.');
            }
        }
        else { $('#AddTaskModal').modal('toggle'); }
    });
    $(".deleteTaskRight").click(function () {
        var taskId = this.id;
        var isParentStry = $(this).data("tasktype");;
        var IsActiveSprint = $(this).data("isactivesprint");
        var sprintId = $(this).data("sprintid");
        var canDel = true;
        if (sprintId != null && IsActiveSprint == "True" && isParentStry == Enum_tskTyp_Story && sprintId > 0) {

            canDel = CheckForLastWorkItemActiveSprint(sprintId);
            if (!canDel) {
                toastr.error('Active sprint should consist of atleast one story');
            }
        }
        if (canDel) {
            if ($(this).attr('data-taskStatusID') == Enum_Status_NotStarted || $(this).attr('data-taskStatusID') == "") {
                if (confirm("Are you sure want to Delete Task?")) {
                    if (this.id > 0) {
                        deleteTask(this.id);
                        TabId = $(this).parents('.tab-pane').attr('id');
                        HideSideBar();
                        if ($(".deleteTaskRight").closest(".common-tabs-style").find("#TnBclg").attr("aria-expanded") == "true") {
                            LoadIterativeBacklog();
                        }
                        else if (TabId.indexOf('sprints') != -1) {

                            var SprintType = $('#SprinType').val();
                            var releaseID = $('#drpRelease').val();
                            GetReleasewiseSprintWorkitems(SprintType, "", releaseID, true);
                        }
                        else if (TabId.indexOf('backlog') != -1) {

                            var EpicType = 0;
                            if ($(this).attr('data-projectType') == Enum_Scrum_ProjectType) {
                                if ($('#EpicID').val() > 0) {
                                    EpicType = Enum_Epic_EpicType
                                    GetBacklogItemList($('#EpicID').val(), EpicType, "");
                                }
                                else {
                                    EpicType = $('#EpicID').val();
                                    GetBacklogItemList(0, EpicType, "");
                                }
                            }
                            else if ($(this).attr('data-projectType') == Enum_Kanban_ProjectType) {
                                GetBacklogItemListForKanban(0, EpicType, "");
                            }
                        }
                    }
                }
            }
            else {
                toastr.error('Unable to Delete. This work item is in use.');

            }
        }
    });

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
            $("#myTagsRight").tagit({
                availableTags: TagsArray,
                allowDuplicates: false,
                placeholderText: 'Press enter to create a tag',
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
        $("#myTagsRight").tagit('createTag', tagList[i], '', true);
    }

});

function UpdateTags() {

    var tags = '';
    $("#myTagsRight .tagit-label").each(function () {
        tags += $(this).html() + ",";
    });

    if (WBSID > 0) {
        $.ajax({
            type: "POST",
            url: "/BacklogPlanning/UpdateTags",
            data: '{ "WBSID":' + WBSID + ', "Tags":"' + tags + '"}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {

                GetActivities(WBSID);
                FillTagsDrp("#drpTags");
            }
        });
    }
}
function GetActivities(TaskID) {

    $.ajax({
        type: "POST",
        url: "/BacklogPlanning/GetActivities",
        dataType: 'html',
        data: "{'TaskID':'" + TaskID + "'}",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#dvActivity").empty().html(data);
            //$("#HistoryTab").html(data);
        }
    });

}
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
function LoadIterativeBacklog() {
    $.ajax({
        type: "POST",
        url: "GetListing",
        dataType: 'html',
        data: "",
        async: false,
        success: function (data) {
            ShowProgress();
           
            $("#WorkItemListing").html(data);

            $("#WorkItemListing table").attr("id", "TaskListingTable");


            $('#AddTaskModal').modal('hide');
            $(".sidebar-toggle").trigger("click");
            $("#tree-1").removeClass("multi-select");
            setTimeout(function () {
                $("#TaskListingTable").treegrid({
                    initialState: 'collapsed'
                });
                $(".treegrid-expander").attr("style", "");
            }, 1000);

            $("#TaskListingTable").find('tr').each(function () {
                $(this).find("td:eq(0)").remove();
            });
            $("#tree-1").removeClass("multi-select");
            function side_bar_show(a) {
                $(a).parent().siblings().removeClass("active");
                $(a).parent().addClass("active");
                $(".drag-group").addClass('sidebar-active');
                $(".tree-content").removeClass('col-sm-12').addClass('col-sm-8');
                $(".tree-sidebar").show().removeClass('col-sm-push-12');
            }
            $(".treegrid-row").each(function () {
                if ($(this).data('child') == "1") {
                    var ParentID = $(this).data("parent-id");
                    $(this).insertAfter($(".treegrid-alfa-" + ParentID));
                    $(this).find("div.checkbox").remove();
                }
            });
            // $(document).off("click", ".treegrid-expander")
            $(".tree-grid.with-sidebar tr td").on("click", ".treegrid-expander", function (event) {
                $(this).parents(".treegrid-row").siblings().removeClass("active");
                $(this).parents(".treegrid-row").addClass('active');

                event.stopPropagation();
            });
            $(document).off("click", ".tree-grid.with-sidebar tr td")
            $(".tree-grid.with-sidebar tr td").not(".tree-grid.with-sidebar tr td:last-child").on("click", function (argument) {

                var TabId = $(this).parents('.tab-pane').attr('id');
                var dvID = "#" + TabId + 'RightPanel'
                Viewsidebar(this.parentNode.id, dvID);


            });

            $(document).on("click", ".with-sidebar .treegrid-row", function () {

                $(".with-sidebar .treegrid-row").removeClass('active'),
                $(this).addClass('active');
            })
            setTimeout(function () {
                $(".loader-wrapper").hide('blind', {}, 50)
            }, 2000);
        }
    });
}