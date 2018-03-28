$(document).ready(function () {
    dialogHeightMax = 290;
    dialogHeightMin = 80;
    page = 1;

    sortDirections = {
        dirQuestionText: true,
        dirQuestionCategory: true,
        dirQuestionFor: true
    };
    sortParameter = null;
    currentDirection = null;

    //$(document).on("click", ".ui-dialog-titlebar-close", function () {
    //    ClearPopUpData();
    //    $(".drpaddeditor").show();
    //    $(".drpeditor").show();
    //    $(".drpaddeditor").css("display", "normal");
    //    $(".drpeditor").css("display", "normal");
    //});
    /*Button click events*/
    $('#btnAddFbQuestionLink').click(function () {

        ClearPopUpData();
        OpenPopUpDialog(0);
    });

    $('#btnBackToCalendarLink').click(function () {
        location.href = "http://" + location.host + "/trainingcalendar/index";
    });

    $('#btnQuestionCancel').click(function () {
        ClearPopUpData();
        ClosePopUpDialog();
        
    });

    $('#btnReset').click(function () {
        ResetValues();
    });

    $('#btnQuestionSave').click(function () {
        if (ValidateInput()) {
            var QuestionID = $(this).attr('data-QueID');
            SaveQuestion(QuestionID, false);
        }
    });

    $('#btnQuestionCont').click(function () {
        if (ValidateInput()) {
            var QuestionID = $(this).attr('data-QueID');
            SaveQuestion(QuestionID, true);
        }
    });

    $("#txtFbQuestionText").keypress(function (e) {
        var code = e.keyCode;
        if (code == 13) {
            Sort(sortParameter, currentDirection);
            e.stopPropagation();
            return false;
        }
    });
    $('#btnSearch').click(function () {

        Sort(sortParameter, currentDirection);
    });

    $('#btnDeleteYes').click(function () {
        var QuestionID = $(this).attr('data-queID');

        $.ajax({
            url: "/FeedbackQuestions/DeleteQuestion",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ QuestionID: QuestionID }),
            dataType: 'json',
            success: function (result) {
                if (result == "Question already in use. Question could not be deleted.") {
                    toastr.remove();
                    toastr.warning(result);
                }
                if (result != "Question already in use. Question could not be deleted.") {
                    toastr.remove();
                    toastr.success(result);

                }
                $('#deletePopUp').dialog('close');
                if (result.toLowerCase().indexOf("error") >= 0) {
                    $('#deleteStatus').addClass('validation-error');
                }
                else { $('#deleteStatus').addClass('validation-success'); }
                Sort(sortParameter, currentDirection);
            },
            error: function () { }
        });
    });

    $('#btnDeleteNo').click(function () {
        $("#deletePopUp").dialog('close');
    });

    $('#Yesbtn').click(function () {
        $("#divAddFbmoreQue").dialog('close');
        ClearPopUpData();
        OpenPopUpDialog();
    });

    $('#Nobtn').click(function () {
        $("#divAddFbmoreQue").dialog('close');
        ClosePopUpDialog();
    });

    $(document).on('click', '.imgActive', function () {

        var id = $(this).attr("id");

        var QuestionID = $(this).attr("data-QuestionID");

        var IsActive = $(this).attr("data-IsActive");

        $.ajax({
            url: "/FeedbackQuestions/ActiveInactiveQuestion",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ QuestionID: QuestionID, IsActive: IsActive }),
            dataType: 'json',
            success: function (result) {

                if (IsActive.toLowerCase() == 'true') {
                    $("#" + id).attr('data-IsActive', false);
                    $("#imgEdit_" + id.split('_')[1]).attr('data-IsActive', 'False');
                    $("#" + id).attr('title', 'Inactive');
                    $("#" + id).html('<i class="fa fa-times text-danger"></i>');
                }
                else {
                    $("#" + id).attr('data-IsActive', true);
                    $("#imgEdit_" + id.split('_')[1]).attr('data-IsActive', 'True');
                    $("#" + id).attr('title', 'Active');
                    $("#" + id).html('<i class="fa fa-check text-success"></i>');
                }

            },
            error: function () { }
        });



    });


});


$(document).on('click', '.EditQuestion', function () {
    var QuestionID = $(this).attr('data-QuestionID');
    var QueText = $(this).attr('data-QuestionText');
    var QuestionFor = $(this).attr('data-QuestionForID');
    var IsMandatory = $(this).attr('data-IsMandatory');
    var IsActive = $(this).attr('data-IsActive');
    var QuestionCategory = $(this).attr('data-QuestionCategoryID');
    var AnswerType = $(this).attr('data-AnswerType');


    ClearPopUpData();
    OpenPopUpDialog(QuestionID);
    $(".drpeditor").show();
    $(".drpaddeditor").hide();
    $('#txtFbQuestion').val(QueText);
    $('#ddlFbQueCategory').val(QuestionCategory).trigger("chosen:updated");
    $('#ddlQueFor').val(QuestionFor).trigger("chosen:updated");;
    if (IsMandatory == "True") {
        $('#chkIsMandatory').prop("checked", true);
    }
    else {
        $('#chkIsMandatory').prop("checked", false);
    }

    if (IsActive == "True") {
        $('#chkIsActive').prop("checked", true);
    }
    else {
        $('#chkIsActive').prop("checked", false);
    }

    $('#ddlAnswerType').val(AnswerType).trigger("chosen:updated");
    $('#btnQuestionSave').attr('data-QueID', QuestionID);
    $('#btnQuestionSave').val("Update");


});


$(document).on('click', '.DeleteQuestion', function () {
    var QuestionID = $(this).attr('data-questionid');
    if (confirm("Do you want to delete this record?")) {
        $.ajax({
            url: "/FeedbackQuestions/DeleteQuestion",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ QuestionID: QuestionID }),
            dataType: 'json',
            success: function (result) {
                if (result == "Question already in use. Question could not be deleted.") {
                    toastr.remove();
                    toastr.warning(result);
                }
                if (result != "Question already in use. Question could not be deleted.") {
                    toastr.remove();
                    toastr.success(result);

                }
                Sort(sortParameter, currentDirection);
            },
            error: function () { }
        });
    }


});


$(document).on('click', '.SortColumn', function () {
    sortParameter = $(this).attr('data-parameter');
    currentDirection = $(this).attr('data-direction');

    Sort(sortParameter, currentDirection);
});

$(document).on("click", ".page-number", function () {

    page = parseInt($(this).html());
    Sort(sortParameter, currentDirection);
    return false;
});


/*Private functions*/

function ResetValues() {
    $("#txtFbQuestionText").val("");
    $("#ddlFbQuestionCategory").val("").trigger("chosen:updated");
    $("#ddlQuestionFor").val("").trigger("chosen:updated");

    Sort(sortParameter, currentDirection);
}

function ValidateInput() {

    $('#errorMessage').html('');
    $("#errorMessage").removeClass();
    $("#errorMessage").hide();
    $(".form-group").removeClass("has-error  has-feedback");
    var errorMessage = "";
    var status = true;
    if ($('#txtFbQuestion').val() == '') {
        $('#errorMessage').addClass('alert alert-danger');
        $("#txtFbQuestion").closest(".form-group").addClass("has-error  has-feedback");
        errorMessage += "<div class='errors'><ul><li>Please enter question text</li><ul></div>";
        status = false;

    }
    if ($('#ddlFbQueCategory').val() == '' || $('#ddlFbQueCategory').val() == 0) {
        $('#errorMessage').addClass('alert alert-danger');
        $("#ddlFbQueCategory").closest(".form-group").addClass("has-error  has-feedback");
        errorMessage += "<div class='errors'><ul><li>Please select question category</li><ul></div>";
        //$('#errorData').append("Please select question category.").append("<br/>");
        status = false;

    }
    if ($('#ddlQueFor').val() == '' || $('#ddlQueFor').val() == 0) {
        $('#errorMessage').addClass('alert alert-danger');
        $("#ddlQueFor").closest(".form-group").addClass("has-error  has-feedback");
        errorMessage += "<div class='errors'><ul><li>Please select Question for whom you are adding question</li><ul></div>";
        status = false;
    }

    if ($('#ddlAnswerType').val() == '' || $('#ddlAnswerType').val() == 0) {
        $('#errorMessage').addClass('alert alert-danger');
        $("#ddlAnswerType").closest(".form-group").addClass("has-error  has-feedback");
        errorMessage += "<div class='errors'><ul><li>Please select Answer type</li><ul></div>";
        status = false;
    }

    if (status == false && errorMessage != null) {
        $('#errorMessage').html(errorMessage);
        $('#errorMessage').show();
    }

    return status;
}

function OpenPopUpDialog(QuestionId) {
    //ClearPopUpData();
    var title;
    if (QuestionId == 0) {
        $(".modal-title").html("");
        $(".modal-title").html("Add Feedback Question");

        $("#btnQuestionCont").css("display", "normal");

    }
    else {
        $(".modal-title").html("");
        $(".modal-title").html("Edit Feedback Question");


        $("#btnQuestionCont").css("display", "none");
    }

    $("#AddEditFbQuestionDialog").modal("show");

    return false;
}

function ClosePopUpDialog() {
    ClearPopUpData();
    $("#AddEditFbQuestionDialog").modal("hide");

}
$(".close").click(function () {
    ClearPopUpData();
    $("#AddEditFbQuestionDialog").modal("hide");
})

function ClearPopUpData() {
    $('#txtFbQuestion').val("");
    $('.form-group').removeClass("has-error has-feedback");
    $('#ddlFbQueCategory').val("").trigger("chosen:updated");
    //$('#ddlFbQueCategoryforEdit').val("").trigger("chosen:updated");
    $('#ddlQueFor').val("").trigger("chosen:updated");
    $('#ddlAnswerType').val("").trigger("chosen:updated");
    $("#errorMessage").hide();
    $("#divAddFbmoreQue").hide("");
    $("#divUpdateStatus").hide("");
    $("#btnQuestionSave").attr('data-queid', 0).val("Save");
    $('#chkIsMandatory').prop('checked', false);
    $('#chkIsActive').prop('checked', false);
    $("#popUpForm").show();
    //$(".drpaddeditor").css("display", "normal");
    //$(".drpeditor").css("display", "normal");
}

function SaveQuestion(QuestionID, Continue) {

    var QuestionText = $('#txtFbQuestion').val();
    var QuestionCategory = $('#ddlFbQueCategory').val();
    var QuestionFor = $('#ddlQueFor').val();
    var IsMandatory = $('#chkIsMandatory').is(':checked');
    var IsActive = $('#chkIsActive').is(':checked');
    var AnsType = $('#ddlAnswerType').val();

    $.ajax({
        url: "/FeedbackQuestions/SaveQuestion",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({ QuestionText: QuestionText, QuestionCategory: QuestionCategory, QuestionFor: QuestionFor, IsMandatory: IsMandatory, AnsType: AnsType, QuestionID: QuestionID, IsActive: IsActive }),
        dataType: 'json',
        success: function (result) {
            if (result.toLowerCase().indexOf("error") < 0) {
                if (QuestionID == 0) {
                    if (Continue) {
                        ClearPopUpData()
                        $('#errorMessage').removeClass('errors');
                        $('#errorMessage').show();
                        $('#errorMessage').addClass('alert alert-success');
                        $('#errorMessage').append(result).append("<br/>");
                    }
                    else {
                        toastr.remove();
                        toastr.success(result);
                        ClosePopUpDialog();
                    }
                }
                else {
                    toastr.remove();
                    toastr.success(result);
                    ClosePopUpDialog();
                }
                Sort(sortParameter, currentDirection);

            }
            else {
                showFailureMessage(QuestionID, response);
            }
        },
        error: function () { }
    });
}

function Sort(parameter, direction) {
    if (sortDirections[direction] == true)
        sortDirections[direction] = false;
    else { sortDirections[direction] = !sortDirections[direction]; }

    sortParameter = parameter;

    currentDirection = sortDirections[direction];
    var QuestionText = $('#txtFbQuestionText').val();
    var QuestionCategory = $('#ddlFbQuestionCategory').val();
    var QuestionFor = $('#ddlQuestionFor').val();

    LoadGridData(sortParameter, currentDirection, QuestionText, QuestionCategory, QuestionFor);
    return false;
}

function LoadGridData(sortParameter, currentDirection, QuestionText, QuestionCategory, QuestionFor) {
    $('#gridView').load('/FeedbackQuestions/GetAllFeedBackQuestion?page=' + page + '&sortExpression=' + sortParameter + '&sortDirection=' + currentDirection, { QuestionText: QuestionText, QueCategoryID: QuestionCategory, QuestionForID: QuestionFor });

}


function showFailureMessage(QuestionID, response) {
    $('#errorData').html('');
    $('#errorMessage').removeClass('alert alert-success');
    $('#errorMessage').addClass('errors');
    $('#errorMessage').show();
    if (QuestionID == 0)
        $('#errorData').append(response);
    else {
        $('#errorData').append(response);
    }
}




/*Private function end.*/
