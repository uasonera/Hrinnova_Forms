$(document).ready(function () {
    var GlobWorkItemId;
    BindDropZone(GlobWorkItemId);

});

function BindDropZone(ID) {
    
    if (typeof GlobWorkItemId === 'undefined') {
    }
    else { ID = GlobWorkItemId; }
        
        Dropzone.options.myDropzone = {
            url: FilesUrl + "?Id=" + ID,
            thumbnailWidth: 50,
            thumbnailHeight: 50,
            uploadMultiple: true,
            addRemoveLinks: true,
            acceptedFiles: ".doc,.xls,.pdf,.txt,.ppt,.jpeg,.png,.docx,.xlsx,.pptx",
            maxFilesize: 5,
            dictRemoveFileConfirmation: "Are you sure you want to remove file?",
            init: function () {
                var self = this;
                if (IsDisabled == "True")
                    self.options.addRemoveLinks = false;
                else
                    self.options.addRemoveLinks = true;
                

                self.options.dictRemoveFile = "Delete";

                var divDoprID = '#my-dropzone';
                bindAttachmentBacklog(self);
               
                
                if (IsDisabled == "True") {
                    self.options.clickable = false;
                    $(divDoprID)[0].removeEventListener('click', this.listeners[1].events.click);
                    $(divDoprID).removeClass('dz-clickable');
                }
                else {
                    $(divDoprID)[0].addEventListener('click', this.listeners[1].events.click);
                    $(divDoprID).addClass('dz-clickable');
                }

                //New file added
                self.on("addedfile", function (file) {
                    console.log('new file added ', file);

                    //var FileName = data.Data[i].DocumentName;
                    //var mockFile = {
                    //    name: FileName,
                    //    size: data.Data[i].size,
                    //    ID: data.Data[i].AttachmentID
                    //}
                });
                // Send file starts
                self.on("sending", function (file) {
                    //console.log('upload started', file);
                    $('.meter').show();
                });
                self.on("drop", function (file, event) {
                    //console.log('upload started', file);

                    if (IsDisabled == "True") {
                        event.preventDefault();
                        return false;
                    }
                });

                // File upload Progress
                self.on("totaluploadprogress", function (progress) {
                    //console.log("progress ", progress);
                    $('.roller').width(progress + '%');
                });

                self.on("queuecomplete", function (progress) {
                    $('.meter').delay(999).slideUp(999);
                });

                // On removing file
                self.on("removedfile", function (file) {
                    console.log(file);
                    if (file.ID != undefined) {
                        
                        $.ajax({
                            url: urlDeleteFile + '?FileID=' + file.ID + '&FileName=' + file.name + '&ProjectId=' + ProjectId,
                            //contentType: "application/json; charset=utf-8",
                          
                            success: function (result) {
                                if (result.Success) {
                                    GetActivities(TaskId);
                                }
                                else {
                                    bindAttachmentBacklog(self);
                                    toastr.error("You are not authorized to delete this file");
                                }
                            }
                        });
                    }
                });
                self.on("success", function (progress) {

                    //file.previewElement.addEventListener("click", function () { window.location = filepath + "?FileWithPath=" + file.name });
                    bindAttachmentBacklog(self);

                });
            }

        };
    
}
function bindAttachmentBacklog(self) {
   
    $('#my-dropzone').empty();
    if (WBSID > 0) {
        $.get(urltaskAttachment + "?TaskId=" + WBSID, function (data) {

            $('#my-dropzone').empty();
            for (var i = 0; i < data.Data.length; i++) {
                var FileName = data.Data[i].DocumentName;
                var Path = data.Data[i].Path;

                if (FileName != null && Path != null) {

                    var mockFile = {
                        name: FileName,
                        size: data.Data[i].size,
                        ID: data.Data[i].AttachmentID,
                        FileDownloadPath: Path
                    };

                    self.options.addedfile.call(self, mockFile);
                    $(mockFile.previewElement).on("click", { Name: FileName, FileDownloadPath: Path }, function (event) {
                        window.location = filepath + "?FileWithPath=" + event.data.FileDownloadPath
                    });

                    if (FileName != null) {

                        var fileext = FileName.substring(FileName.lastIndexOf('.'));
                        if (fileext == ".jpg" || fileext == ".jpeg" || fileext == ".bmp" || fileext == ".gif" || fileext == ".png")
                            self.options.thumbnail.call(self, mockFile, "/Documents/Task/Thumbnail/" + Path);
                        else if (fileext.indexOf("txt") >= 0)
                            self.options.thumbnail.call(self, mockFile, "../Images/FileIcon_txt.png");
                        else if (fileext.indexOf("doc") >= 0 || fileext.indexOf("docx") >= 0)
                            self.options.thumbnail.call(self, mockFile, "../Images/FileIcon_Word.png");
                        else if (fileext.indexOf("xls") >= 0 || fileext.indexOf("xlsx") >= 0)
                            self.options.thumbnail.call(self, mockFile, "../Images/FileIcon_Excel.png");
                        else if (fileext.indexOf("pdf") >= 0)
                            self.options.thumbnail.call(self, mockFile, "../Images/FileIcon_pdf.png");


                    }

                }
            };
            // $(".dropzone").removeAttr('id');
        });
    }
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
        }
    });

}
