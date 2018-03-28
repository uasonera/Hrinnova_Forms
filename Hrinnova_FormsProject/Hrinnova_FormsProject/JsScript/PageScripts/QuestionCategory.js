$(document).ready(function () {
    dialogHeightMax = 290;
    dialogHeightMin = 80;
    page = 1;

    sortDirections = {
        // dirQuestionText: true,
        dirQuestionCategory: true,
        // dirQuestionFor: true
    };
    sortParameter = null;
    currentDirection = null;


    /*Button click events*/
    $('#btnAddQuestionLink').click(function () {
        ClearPopUpData();
        OpenPopUpDialog(0);
        $("#btnQuestionCategorySaveAndContinue").css("display", "normal");

    });

    $('#btnQuestionCategoryCancel').click(function () {
        ClosePopUpDialog();
    });

    $('#btnReset').click(function () {
        ResetValues();
    });
    $('#btnQuestionCategorySaveAndContinue').click(function () {
        var QuestionCategoryId = $(this).attr('data-QueID');
        if (ValidateInput(QuestionCategoryId)) {
            var QuestionCategoryId = $(this).attr('data-QueID');
            SaveQuestionCategory(QuestionCategoryId, true);
        }
    });
    $('#btnQuestionCategorySave').click(function () {
        var QuestionCategoryId = $(this).attr('data-QueID');
        if (ValidateInput(QuestionCategoryId)) {
            var QuestionCategoryId = $(this).attr('data-QueID');
            SaveQuestionCategory(QuestionCategoryId, false);
        }
    });
    $('#btnBackToCalendarLink').click(function () {
        location.href = "http://" + location.host + "/trainingcalendar/index";
    });
    $('#btnSearchcategory').click(function () {

        Sort(sortParameter, currentDirection);
    });

    $('#btnDeleteYes').click(function () {
        var QuestionCategoryId = $(this).attr('data-queID');
        $.ajax({
            url: "/QuestionCategory/DeleteQuestionCategory",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ QuestionCategoryId: QuestionCategoryId }),
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

                $("#deleteCategoryQuestionPopUp").dialog('close');

                if (result.toLowerCase().indexOf("error") >= 0) {
                    $('#deleteStatusCategory').addClass('validation-error');
                }
                else { $('#deleteStatusCategory').addClass('validation-success'); }
                Sort(sortParameter, currentDirection);
            },
            error: function () { }
        });
    });

    $('#btnDeleteNo').click(function () {
        $("#deleteCategoryQuestionPopUp").modal('hide');
    });

    $('#Yesbtn').click(function () {
        $("#divAddQueCategorymore").dialog('close');
        ClearPopUpData();
        OpenPopUpDialog();
    });

    $('#Nobtn').click(function () {
        $("#divAddQueCategorymore").dialog('close');
        ClosePopUpDialog();
    });

    $(document).on('click', '.imgActive', function () {

        var id = $(this).attr("id");

        var QuestionCategoryId = $(this).attr("data-QuestionCategoryId");

        var IsActive = $(this).attr("data-IsActive");

        $.ajax({
            url: "/QuestionCategory/ActiveInactiveQuestion",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ QuestionCategoryId: QuestionCategoryId, IsActive: IsActive }),
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
                    $("#" + id).html('<i class="fa fa-check text-success"></i> ');
                }

            },
            error: function () { }
        });



    });


});


$(document).on('click', '.EditQuestionCategory', function () {
    var QuestionCategoryID = $(this).attr('data-QuestionCategoryID');
    var CategoryName = $(this).attr('data-CategoryName');
    var Description = $(this).attr('data-Description');
    var IsActive = $(this).attr('data-IsActive');

    ClearPopUpData();
    OpenPopUpDialog();
    $("#btnQuestionCategorySaveAndContinue").css("display", "none");
    $('#txtCategoryName').val(CategoryName);
    $('#txtCategoryDescription').val(Description);
    if (IsActive == "True") {
        $('#chkIsActive').prop("checked", true);
    }
    else {
        $('#chkIsActive').prop("checked", false);
    }

    $('#btnQuestionCategorySave').attr('data-queid', QuestionCategoryID);
    $('#btnQuestionCategorySave').val("Update");


});


$(document).on('click', '.DeleteQuestionCategory', function () {

    var QuestionCategoryId = $(this).attr('data-QuestionCategoryID');
    if (confirm("Do you want to delete this record?")) {
        $.ajax({
            url: "/QuestionCategory/DeleteQuestionCategory",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ QuestionCategoryId: QuestionCategoryId }),
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

$(document).on('click', '.SortColumnCategory', function () {
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
    $("#txtQuestionCategoryText").val("");

    Sort(sortParameter, currentDirection);
}

function ValidateInput(QuestionCategoryId) {
    $('#errorMessage ul').html('');
    $('#errorMessage').removeClass();
    $('#errorMessage').addClass('alert alert-danger');
    $(".form-group").removeClass("has-error  has-feedback");
    //$("#errorMessage").removeClass();
    $("#errorMessage").hide();

    var errorMessage = "";
    var status = true;
    if ($.trim($('#txtCategoryName').val()) == '') {

        $('#errorMessage ul').append("<li>Please Enter Question Category</li>");
        $("#txtCategoryName").closest(".form-group").addClass("has-error  has-feedback");
        //errorMessage += "<div class='errors'><ul><ul></div>"
        status = false;

    }
    if ($.trim($('#txtCategoryDescription').val()) == '') {
        $('#errorMessage ul').append("<li>Please Enter Question Description</li>");
        $("#txtCategoryDescription").closest(".form-group").addClass("has-error  has-feedback");
        //errorMessage += "<div class='errors'><ul><li>Please Enter Question Description</li><ul></div>";
        status = false;
    }
    if (status == true) {
        $.ajax({
            url: "/QuestionCategory/ValidateCategoryName",
            async: false,
            contentType: "application/json;charset=utf-8",
            data: { CategoryName: $.trim($('#txtCategoryName').val()), QuestionCategoryId: QuestionCategoryId },
            success: function (data) {

                if (data == true) {
                    status = false;
                    $('#txtCategoryName').select();
                    $('#txtCategoryName').focus();
                    $('#errorMessage').removeClass("alert alert-danger");
                    $('#errorMessage').addClass("alert alert-warning");
                    $("#txtCategoryName").closest(".form-group").addClass("has-warning  has-feedback");
                    $('#errorMessage ul').append("<li>Question Category Name already exists</li>");
                    //errorMessage += "<div class='alert alert-warning'></div>";
                }
                else {
                    status = true;
                }
            },

        });
    }

    if (status == false && errorMessage != null) {
        //$('#errormessvlsMsg').addClass('errors');
        //$('#errormessvlsMsg ul li:data').html(errorMessage);
        //$('#errorMessage').html(errorMessage);
        $('#errorMessage').show();
    }

    return status;
}

function OpenPopUpDialog(QuestionId) {
    ClearPopUpData();
    $("#errorMessage").css("display", "none");
    //$("errormessvlsMsg").css("display", "none");
    
    $("#popUpFormQuestionCategory").modal("show");
    var title;
    if (QuestionId == 0) {
        $("#popUpFormQuestionCategory .modal-title").html("Add Question Category");
    }
    else {
        $("#popUpFormQuestionCategory .modal-title").html("Edit Question Category");
    }
    return false;
}

function ClosePopUpDialog() {
    //$("#errorMessage").css("display", "none");
    //$("#errormessvlsMsg").css("display", "none");
    $("#popUpFormQuestionCategory").modal("hide");
    ClearPopUpData();
}

function ClearPopUpData() {
    $('#txtCategoryName').val("");
    $('#txtCategoryDescription').val("");
    $("#errorMessage").hide("");
    $(".form-group").removeClass("has-error  has-feedback");
   //$("#errorMessage ").removeClass();
    // $("#errormessvlsMsg").hide("");
    //$("#errormessvlsMsg").removeClass();
   // $("#errormessvlsMsg li").text("");
   // $("#errormessvlsMsg").removeClass("errors");
    $("#divAddQueCategorymore").hide("");
    $("#divUpdateStatus").hide("");
    $("#btnQuestionCategorySave").attr('data-queid', 0).val("Save");
    $('#chkIsActive').prop('checked', false);
   // $("#popUpFormQuestionCategory").modal("show");
}

function SaveQuestionCategory(QuestionCategoryId, SaveAndContinue) {

    var CategoryName = $('#txtCategoryName').val();
    var Description = $('#txtCategoryDescription').val();
    var IsActive = $('#chkIsActive').is(':checked');
    $.ajax({
        url: "/QuestionCategory/SaveQuestionCategory/",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({ QuestionCategoryId: QuestionCategoryId, CategoryName: CategoryName, Description: Description, IsActive: IsActive }),
        dataType: 'json',
        success: function (result) {
            //toastr.success(result);
            if (result.toLowerCase().indexOf("error") < 0) {
                if (QuestionCategoryId == 0 && SaveAndContinue == true) {
                    ClearPopUpData();

                    $('#errorMessage').show();
                    $('#errorMessage').removeClass();
                    $('#errorMessage').addClass('alert alert-success');
                    //$('#errorMessage').html(result).append("<br/>");
                }
                else {
                    toastr.remove();
                    toastr.success(result);
                    ClosePopUpDialog();
                }
                Sort(sortParameter, currentDirection);

            }
            else {
                showFailureMessage(QuestionCategoryId, response);
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
    var CategoryName = $.trim($('#txtQuestionCategoryText').val());
    LoadGridData(sortParameter, currentDirection, CategoryName);
    return false;
}

function LoadGridData(sortParameter, currentDirection, CategoryName) {
    $('#gridView').load('/QuestionCategory/GetAllQuestionCategory?page=' + page + '&sortExpression=' + sortParameter + '&sortDirection=' + currentDirection, { CategoryName: CategoryName });
}


function showFailureMessage(QuestionID, response) {
    $('#errorMessage').show();
    if (QuestionID == 0)
        $('#errorMessage').text(response);
    else {
        $('#errorMessage').text(response);
    }
}




/*Private function end.*/
