$(document).ready(function () {
    $(document).off('click', '#btnAddSuggestion').on('click', '#btnAddSuggestion', function () {
        var SuggestionId = $(this).attr('data-feedbackid');
        if (ValidateInput()) {
            SaveSuggestion(SuggestionId);
        }
        return false;
    });

    $('#btnResetSuggestion').click(function () {
        $('#SuggestionTypeID').val('');
        $('#Description').val('');
        $('#file_upload').val('');
        $(".validation-summary-valid").removeClass("alert alert-danger");
        $(".validation-summary-valid").empty();
    });
    $("#btndownLoadFile").click(function () {
        var Attachment = $(this).attr("data-OrignalPath");
        window.location = "/UserDashboard/GetAttachmentPath" + "?FileWithPath=" + Attachment;
    });
    $("#ViewandMoveToBackLogDialog").find("#file_upload").on('change', function () {
        $("#ViewandMoveToBackLogDialog").find("#btndownLoadFile").hide();
        $("#ViewandMoveToBackLogDialog").find(".DeleteAttachment").remove();
    });
    $("#btnCancelSuggestion").click(function () {
        CloseEditPopUpDialog();

    });
    $(".DeleteAttachment").click(function () {
        var SuggestionId = $(this).data('suggestionid');
        if (confirm("Do you want to delete this Attachment?")) {
            $.ajax({
                url: "/UserDashboard/DeleteAttachmentSuggestion",
                type: "POST",
                async: false,
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify({ SuggestionId: SuggestionId }),
                dataType: 'json',
                success: function (result) {
                    if (result == 'true') {
                        toastr.success("Attachment Deleted Successfully");
                        $("#ViewandMoveToBackLogDialog").find(".DeleteAttachment").remove();
                        $("#ViewandMoveToBackLogDialog").find("#btndownLoadFile").hide();
                    }
                    else {
                        toastr.success("Error is occuring while deleting the Attachment");
                    }
                },
                error: function () { }
            });
        }
        return true;
    });
});

function ValidateInput() {
    var status = true;
    var _validFileExtensions = new Array("jpeg", "jpg", "txt", "png", "gif", "doc", "pdf", "xls", "xlsx");
    $('.validation-summary-valid').empty();
    $(".validation-summary-valid").removeClass("alert alert-danger");
    if ($('#file_upload').val() != '') {
        var FileName = $('#file_upload').val();
        var extension = FileName.split('.').pop();
        if (_validFileExtensions.indexOf(extension.toLowerCase()) < 0) {
           // $('.validation-summary-valid').addClass('validation-summary-errors');
            $("#slidePopUp").find('.validation-summary-valid').addClass("alert alert-danger");
            $("#slidePopUp").find('.validation-summary-valid').append("<li>Please select valid file. Valid file extensions are " + _validFileExtensions.join() + "</li>");
            return false;
        }
    }

    if ($('#Description').val() == "") {
        $("#slidePopUp").find('.validation-summary-valid').addClass('alert alert-danger');
        //$(".validation-summary-errors").addClass("alert alert-danger");
        $("#slidePopUp").find('.validation-summary-valid').append("<li>Please Enter Description</li>");
        status = false;
    }

    if ($('#SuggestionTypeID').val() == "") {
        //$('.validation-summary-valid').addClass('validation-summary-errors');
        $("#slidePopUp").find('.validation-summary-valid').addClass("alert alert-danger");
        $("#slidePopUp").find('.validation-summary-valid').append("<li>Please Select Suggestion Type</li>");
        status = false;
    }
    return status;
}

function SaveSuggestion(SuggestionId) {
    var SuggestionType;
    var Description;
    var IsBacklog;
    var IsReply;
    var fileName;
    //var SuggestionType = $('#ddlFeedbacktype').val();
    if (SuggestionId == 0) {
         SuggestionType = $("#SuggestionTypeID").val();
         Description = $('#Description').val();
         IsBacklog = 0;
         IsReply = 0;
         fileName = $('input[type=file]')[0].files[0];
        
    }
    else {
        SuggestionType = $("#ViewandMoveToBackLogDialog").find("#SuggestionTypeID").val();
        Description = $("#ViewandMoveToBackLogDialog").find('#Description').val();
        IsBacklog = 0;
        IsReply = 0;
        fileName = $("#ViewandMoveToBackLogDialog").find("#file_upload")[0].files[0];
        
    }

    var form = $('form')[0];
    var formData = new FormData(form);

    formData.append('SuggestionID', SuggestionId);
    formData.append('SuggestionType', SuggestionType);
    formData.append('Description', Description.toString().trim());
    formData.append('IsBacklog', IsBacklog);
    formData.append('IsBacklog', IsReply);
    formData.append('File', fileName);

    $.ajax({
        url: SaveSuggestionUrl,
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        data: formData,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (result) {
            if (result == 'Success') {
                var message;
                if (SuggestionId == 0) {
                    message = 'Record Inserted successfully';
                    toastr.remove();
                    toastr.success(message);
                    ResetValues();
                    $('.selector-button').removeClass('fa-close side-nav-btn"');
                    //$('.selector-button').toggleClass('fa-close side-nav-btn"');
                    $('.side-navigation-container').toggleClass('visable', false);
                }

                else {
                    message = 'Record Updated successfully';
                    toastr.remove();
                    toastr.success(message);
                    CloseEditPopUpDialog();
                    LoadGridData(null, true, "", "");
                }
                
            }
            else if (result == 'InValidSession') {
                window.location = LoginPageUrl;
                return false;
            }
            else {
                toastr.remove();
                toastr.error('Error occured while saving the Suggestion');
                ResetValues();
            }
            
        },
        error: function () { }

    });
    return false;
}
function CloseEditPopUpDialog() {
    $("#ViewandMoveToBackLogDialog").dialog('close');
}
