$(document).ready(function () {

    //CKEDITOR.replace('txtComment', { uiColor: '#D8D8D8' });

    //CKEDITOR.config.htmlEncodeOutput = true;

    $(".editAssignInSubtask").click(function () {

        GetAssigneesModelView($(this));
    });
    $('[data-toggle="tooltip"]').tooltip({ 'placement': 'bottom' });
    function htmlEncode(html) {
        return document.createElement('a').appendChild(
            document.createTextNode(html)).parentNode.innerHTML;
    };
    //$(document).on(" click", ".ClsThumbnail", function () {
    //    window.location = filepath + "?FileWithPath=" + $(this).find('img').attr('data-originalpath');
    //});
    $("#btnComment").click(function () {
        var editor = CKEDITOR.instances["txtComment"];
        if (CKEDITOR) {
            if (CKEDITOR.instances.txtComment) {
                CKEDITOR.instances.txtComment.destroy();
            }
        }
        $("#txtComment").val('');
        CKEDITOR.replace('txtComment', { uiColor: '#D8D8D8' });

        CKEDITOR.config.htmlEncodeOutput = true;
        $('html, body').scrollTop($(document).height());
        $(".CommentBox").delay(500).fadeIn("slow")

        return false;
    });
    $("#btnCancel").click(function () {
        $(".CommentBox").hide("slow");
        return false;
    });

    $(".AddTask").click(function () {
        AddEditTask(ProjectId, TaskId, false);
    });
    $(".EditTask").click(function () {
        AddEditTask(ProjectId, TaskId, true);
        $('#AddTaskModal').modal('toggle');
    });
    $(".editStatus").click(function () {

        $.ajax({
            type: "POST",
            url: urlGetStatus,
            dataType: 'html',
            data: "{'ProjectId':'" + ProjectId + "'}",
            contentType: false,
            processData: false,
            success: function (data) {
                $(".CommentBox").hide("slow");
                $("#CommentList").html(data);
                GetActivities(TaskId);
            }
        });
    });
    $(".UpdateStatus").click(function () {

        AddEditTask(ProjectId, TaskId, true);
        $.ajax({
            type: "POST",
            url: urlGetStatus,
            dataType: 'html',
            data: "{'TaskId':'" + TaskId + "'}",
            contentType: false,
            processData: false,
            success: function (data) {
                $(".CommentBox").hide("slow");
                $("#CommentList").html(data);
                GetActivities(TaskId);
            }
        });
    });

    $(".MoveToBacklog").click(function () {
        if (confirm("Are you sure you want to move this task to Backlog?")) {

            var urlMoveToBack = '',dataFields='';
            if (ProjectType == Enum_Kanban_ProjectType) {
                urlMoveToBack = urlMoveToBacklogKanban;
                dataFields = "{'TaskID':'" + $(this).attr('data-taskId') + "'}";
            }
            else if (ProjectType == Enum_Scrum_ProjectType) {
                urlMoveToBack = urlMoveToBacklogScrum;
                dataFields = "{'WBSID':'" + $(this).attr('data-taskId') + "','SprintID':'0'}";
            }
            else {
                urlMoveToBack = urlMoveToBacklog;
                dataFields = "{'TaskID':'" + $(this).attr('data-taskId') + "'}";
            }
            
            $.ajax({
                type: "POST",
                url: urlMoveToBack,
                dataType: 'html',
                data: dataFields,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    
                    if (data.indexOf("Success") > 0 || data=="true"  || data > 0) {
                        toastr.success("Task successfully moved to backlog");
                    }
                    else {
                        toastr.error("Task is not moved to backlog");
                    }
                }
            });
        }

    });
    $(document).on('click', "#btnAddComment", function () {

        var $form = $("#teste");
        formData = new FormData($form[0]);
        //var CommentDescription = htmlEncode(CKEDITOR.instances['txtComment'].getData());
        var CommentDescription = $('#txtComment').val();
        if (CommentDescription == "") {
            toastr.error("Please enter comment text");
            return false;
        }
        formData.append("CommentData", CommentDescription);
        formData.append("TaskId", TaskId);
        formData.append("ProjectId", ProjectId);
        $.ajax({
            type: "POST",
            url: urlStoreComment,
            dataType: 'html',
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                //$(".CommentBox").hide("slow");
                $("#CommentList").html(data);
                GetActivities(TaskId);
                toastr.success("Comment has been added");
            }
        });
    });

    $('#AddTaskModal').on('hidden.bs.modal', function () {
        if (isEditSuccessfull) {
            window.location.reload();
        }
    })

    //editAssignee();
    $(document).on("click", ".editAssign", function () {
        GetAssigneesModelView($(this));
    });

    $(document).on("click", ".editViewer", function () {

        var wbsid = $(this).data('id');
        $.ajax({
            type: "POST",
            url: urlGetViewer,
            dataType: 'html',
            data: "{'WBSID':'" + wbsid + "'}",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $("#viewerModel").empty();
                $("#viewerModel").html(data);
            }
        });
    });

    function GetActivities(TaskID) {

        $.ajax({
            type: "POST",
            url: urlActivities,
            dataType: 'html',
            data: "{'TaskID':'" + TaskID + "'}",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $("#dvActivity").html(data);
                $("#HistoryTab").html(data);
            }
        });

    }
    Array.prototype.remove = function () {
        var what, a = arguments, L = a.length, ax;
        while (L && this.length) {
            what = a[--L];
            while ((ax = this.indexOf(what)) != -1) {
                this.splice(ax, 1);
            }
        }
        return this;
    }

    $('#deleteTask').click(function () {
        deleteTask($(this).attr('data-taskId'));
    });
});

function AddEditTask(ProjectId, TaskId, IsEdit) {

    $.ajax({
        type: "POST",
        url: "/Task/AddTask",
        data: '{ "IsEdit":' + IsEdit + ',"ProjectID": ' + ProjectId + ',"TaskId":' + TaskId + '}',
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        async: false,
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
        }
    });

}
function editAssignee() {
    $(".editAssign").click(function () {
        GetAssigneesModelView($(this));
    });
}
function GetAssigneesModelView(CurrButton) {
    var wbsid = CurrButton.data('id');
    TaskId = wbsid;
    $.ajax({
        type: "POST",
        url: urlGetAssignee,
        dataType: 'html',
        data: "{'WBSID':'" + wbsid + "'}",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#myModal").empty().html(data);
            $('#myModal').modal('toggle');
        }
    });
}
function deleteTask(taskId) {
    if (confirm("Are yor sure you want to delete this work iteam?")) {
        $.ajax({
            type: "POST",
            url: urlDeleteTask,
            data: "{'WBSId': '" + taskId + "', 'StoryId': '0', 'ProjectId': '" + ProjectId + "' }",
            //dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function () {
                toastr.remove();
                toastr.success("Task deleted successfully");
                setTimeout(function () { window.location.href = $('#backToViewBoard').attr('data-viewBoardURL') }, 2000);
            },
            error: function (response) {
                //alert(response.responseText);
            }
        });
    }
}