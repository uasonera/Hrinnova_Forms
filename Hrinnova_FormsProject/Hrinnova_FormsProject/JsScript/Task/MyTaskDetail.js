$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $(".taskTab").click(function () {
        $(".my-task-tabs").find(".active").removeClass('active');
        $(this).parent('li').addClass('active');
        var type = $(this).data('type');
        $.ajax({
            type: "POST",
            url: urlGetTaskInnerDetail,
            data: '{ "taskTypeCase": "' + type + '"}',
            dataType: "html",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $(".tab-pane").show();
                $("#dvTaskDetail").html(data);
                $("#dvTaskDetail").show();
            },
            error: function (response) {
                //alert(response.responseText);
            }
        });
    });

    $(document).on('click', ".editTask", function () {
        var TaskId = $(this).attr('id');
        var ProjectId = $(this).attr('data-ProjectId');

        AddEditTask(ProjectId, TaskId, true);
    });
    function AddEditTask(ProjectId, TaskId, IsEdit) {
        $.ajax({
            type: "POST",
            url: urlAddTask,
            data: '{ "IsEdit":' + IsEdit + ',"ProjectID": ' + ProjectId + ',"TaskId":' + TaskId + '}',
            dataType: "html",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (IsEdit) {
                    VerifyStatus(TaskId);

                }
                else
                    Edit = false;
                $("#AddTaskModal").empty().html(data);
                $('#uprgsMaster').css('visibility', 'hidden');
                if (IsEdit) {

                    AddThumbnails(TaskId);
                }
            },
            error: function (response) {
                alert(response.responseText);
            }
        });
    }
    function VerifyStatus(TaskID) {
        $.ajax({
            type: "POST",
            url: urlVerifyStatus,
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
    function getFileExtension(name) {
        var found = name.lastIndexOf('.') + 1;
        return (found > 0 ? name.substr(found) : "");
    }
    //$(document).on(" click", ".ClsThumbnail", function () {
    //    window.location = filepath + "?FileWithPath=" + $(this).find('img').attr('data-originalpath');
    //});
    $(document).on('click', '.deleteTask', function () {
        var WbsId = $(this).attr('data-id');
        var isProductBackLog = $(this).data('isproductbacklog');
        if (confirm("Are you sure want to Delete Task?")) {
            deleteTask(WbsId);
        }
    })
    function deleteTask(WbsId) {
        $.ajax({
            type: "POST",
            url: urlDeleteTask,
            data: '{"WBSId":"' + WbsId + '"}',
            dataType: 'html',
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $('#dvTaskDetail').html(data);
            },
            error: function (response) {
                alert(response.responseText);
            }
        });
    }
});