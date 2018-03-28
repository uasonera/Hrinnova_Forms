$(document).ready(function () {
    $('#btnSuggestionSave').click(function () {
        var SuggestionId = $(this).data('suggestionid');
        var Title = $("#Title").val();
        var EstimatedHours = $("#EstimatedHour").val();
        var SuggestionTypeId = $("#SuggestionTypeID").val();
        var TaskPriorityID = $("#ddlTaskPriority").val();
        var Description = $("#Description").val();
        var IsBacklog = true;
        if (ValidateInputForPopup()) {
            MoveToBacklogSuggestion(SuggestionId, SuggestionTypeId, Description, IsBacklog, Title, EstimatedHours, TaskPriorityID);
        }
        return false;
    });

    $("#btndownLoad").click(function () {
        var Attachment = $(this).attr("data-OrignalPath");
        window.location = "/UserDashboard/GetAttachmentPath" + "?FileWithPath=" + Attachment;
    });
    $('#btnSuggestionCancel').click(function () {
        ClosePopUpDialog();
    });
    $('#EstimatedHour').keyup(function () {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });

    $('#EstimatedHour').change(function () {
        $.ajax({
            url: "/UserDashboard/IsHoursValidation",
            type: "GET",
            async: false,
            contentType: "application/json;charset=utf-8",
            data: { EstimatedHour: $("#EstimatedHour").val().trim() },
            success: function (data) {
                if (data != 'true') {
                    $(".validation-summary-errors ul").empty();
                    $(".validation-summary-errors ul").show();
                    $('.validation-summary-valid').addClass('validation-summary-errors');
                    $('.validation-summary-errors ul').append("<li>" + data + ".</li>");
                    $('#EstimatedHour').val(0);
                }
                else {
                    $(".validation-summary-errors ul").empty();
                }
            },

        });
    });
});
function MoveToBacklogSuggestion(SuggestionId, SuggestionTypeId, Description, IsBacklog, Title, EstimatedHours, TaskPriorityID) {
    var $form = $("#form1");
    ValidateDynamicContent($form);
    var isValidForm = false;
    isValidForm = $form.valid();
    if (isValidForm) {
        $.ajax({
            url: "/UserDashboard/MoveToBackLogSuggestion",
            type: "POST",
            async: false,
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ SuggestionId: SuggestionId, SuggestionTypeID: SuggestionTypeId, SuggestionType: SuggestionTypeId, Description: Description.toString().trim(), IsBacklog: IsBacklog, Title: Title.toString().trim(), EstimatedHour: EstimatedHours, TaskPriorityID: TaskPriorityID }),
            dataType: 'json',
            success: function (result) {

                if (result == "success") {
                    toastr.remove();
                    toastr.success("Work item moved successfully into Product Backlog.");
                    ClosePopUpDialog();
                }
                else if (result == "error") {
                    toastr.remove();
                    toastr.error("Error occured while moving the work item into Product BackLog.");
                }
                else if (result == 'InValidSession') {
                    window.location = UrlLoginPage;
                    return false;
                }
                else {
                    toastr.remove();
                    toastr.error("Error occured while moving the work item into Product BackLog.");
                    ClosePopUpDialog();
                }
                LoadGridData(null, true, $("#txtFeedbackType").val(), $('#ddlSuggestiontype').val());
            },
            error: function () { }

        });
    }
    return false;
}

function ValidateDynamicContent(element) {
    var currForm = element.closest("form");
    if (currForm.length > 0) {
        currForm.removeData("validator");
        currForm.removeData("unobtrusiveValidation");
        $.validator.unobtrusive.parse(currForm);
        currForm.validate(); // This line is important and added for client side validation to trigger, without this it didn't fire client side errors.
    } else {
        $.validator.unobtrusive.parse(element);//parse div content for validation

    }
}
function ValidateInputForPopup() {
    var NameExit = true;
    var WBSID = 0;
    var Title = $("#Title").val();
    var EstimatedHours = $("#EstimatedHour").val();
    var SuggestionTypeId = $("#ddlSuggestiontypePopup").val();
    var TaskPriorityID = $("#ddlTaskPriority").val();
    $(".validation-summary-errors ul").html("");
    $('.validation-summary-errors').removeClass('validation-summary-errors');
    if (Title.toString().trim() == "") {
        $('.validation-summary-valid').addClass('validation-summary-errors');
        $('.validation-summary-errors ul').append("<li>Please Enter Title.</li>");
        NameExit = false;
    }
    if (EstimatedHours == "") {
        $('.validation-summary-valid').addClass('validation-summary-errors');
        $('.validation-summary-errors ul').append("<li>Please Enter Estimated Hours.</li>");
        NameExit = false;
    }
    if ($("#SuggestionTypeID").val() == "") {
        $('.validation-summary-valid').addClass('validation-summary-errors');
        $('.validation-summary-errors ul').append("<li>Please Select Suggestion Type.</li>");
        NameExit = false;
    }
    if ($("#ddlTaskPriority").val() == "") {
        $('.validation-summary-valid').addClass('validation-summary-errors');
        $('.validation-summary-errors ul').append("<li>Please Select Priority Type.</li>");
        NameExit = false;
    }
    if (NameExit == true) {
        $.ajax({
            url: "/UserDashboard/CheckIfTitleAlreadyExist",
            async: false,
            contentType: "application/json;charset=utf-8",
            data: { WbsName: $("#Title").val(), WBSID: WBSID },
            success: function (data) {

                if (data == true) {
                    NameExit = false;
                    $('.validation-summary-valid').addClass('validation-summary-errors');
                    $('.validation-summary-errors ul').append("<li>Title already exists. Please choose different Title.</li>");
                }
                else {
                    NameExit = true;
                }
            },

        });
        if (NameExit == false) {
            $(".validation-summary-errors ul").show();
        }

        return NameExit;
    }

}