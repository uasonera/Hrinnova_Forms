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

    $('#btnAddCategoryLink').click(function () {
        ClearCategoryPopUpData();
        OpenCategoryPopUpDialog(0);
    });

    $('#btnBackToCalendarLink').click(function () {
        location.href = "http://" + location.host + "/trainingcalendar/index";
    });

    $('#btnCategoryCancel').click(function () {
        CloseCategoryPopUpDialog();

    });

    $('#btnCategorySave').click(function () {
        var CategoryID = $(this).attr('data-CategoryId');
        if (ValidateInput(CategoryID)) {
            SaveCategory(CategoryID, false);
        }
    });

    $('#btnCategorySaveCont').click(function () {
        var CategoryID = $(this).attr('data-CategoryId');
        if (ValidateInput(CategoryID)) {
            SaveCategory(CategoryID, true);
        }
    });

    $(document).on('click', '.imgActive', function () {

        var id = $(this).attr("id");

        var CategoryID = $(this).attr("data-CategoryID");

        var IsActive = $(this).attr("data-IsActive");

        $.ajax({
            url: "/TrainingCategory/ActiveInactiveCategory",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ CategoryID: CategoryID, IsActive: IsActive }),
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

    $('#btnDeleteYes').click(function () {
        var CategoryID = $(this).attr('data-CategoryId');
        $.ajax({
            url: "/TrainingCategory/DeleteCategory",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ CategoryID: CategoryID }),
            dataType: 'json',
            success: function (result) {
                $('#deleteCategoryPopUp').dialog('close');
                $('#deleteConfirmation').hide();
                if (result == 'success') {
                    toastr.remove();
                    toastr.success("Record deleted successfully.");
                }
                else if (result == 'fail') {
                    toastr.remove();
                    toastr.warning("Category is in use.Category Can not be deleted");
                }
                else {
                    toastr.remove();
                    toastr.error("Error occured while deleting category");
                }
                Sort(sortParameter, currentDirection);
            },
            error: function () { }
        });
    });

    $('#btnDeleteNo').click(function () {
        $("#deleteCategoryPopUp").dialog('close');
    });

    $('#Yesbtn').click(function () {
        $("#divAddCategorymore").dialog('close');
        ClearCategoryPopUpData();
        OpenCategoryPopUpDialog(0);
    });

    $('#Nobtn').click(function () {
        $("#divAddCategorymore").dialog('close');
        CloseCategoryPopUpDialog();
    });

    $('#btnSearch').click(function () {

        Sort(sortParameter, currentDirection);
    });

    $('#btnReset').click(function () {
        ResetValues();
    });
})

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

$(document).on('click', '.EditCategory', function () {
    var CategoryID = $(this).attr('data-CategoryID');
    var CategoryName = $(this).attr('data-CategoryName');
    var Description = $(this).attr('data-CategoryDescription');
    var IsActive = $(this).attr('data-IsActive');


    ClearCategoryPopUpData();
    OpenCategoryPopUpDialog(CategoryID);

    $('#txtCategoryName').val(CategoryName);
    $('#txtCategoryDescription').val(Description);

    if (IsActive == "True") {
        $('#chkIsActive').prop("checked", true);
    }
    else {
        $('#chkIsActive').prop("checked", false);
    }

    $('#btnCategorySave').attr('data-CategoryID', CategoryID);
    $('#btnCategorySave span').html('').append("Update");

});

$(document).on('click', '.DeleteCategory', function () {
    var CategoryID = $(this).attr('data-CategoryId');
    $('#btnDeleteYes').attr('data-CategoryId', CategoryID);
    if (confirm("Do you want to delete this record?")) {
        $.ajax({
            url: "/TrainingCategory/DeleteCategory",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ CategoryID: CategoryID }),
            dataType: 'json',
            success: function (result) {
                if (result == 'success') {
                    toastr.remove();
                    toastr.success("Record deleted successfully.");
                }
                else if (result == 'fail') {
                    toastr.remove();
                    toastr.warning("Category is in use.Category Can not be deleted");
                }
                else {
                    toastr.remove();
                    toastr.error("Error occured while deleting category");
                }
                Sort(sortParameter, currentDirection);
            },
            error: function () { }
        });
    }
});


function OpenCategoryPopUpDialog(CategoryId) {
    var title;
    if (CategoryId == 0) {
        $(".modal-title").html(" ");
        $(".modal-title").html("Add Training Category");

        $("#btnCategorySaveCont").css("display", "normal  ");
    }
    else {
        $(".modal-title").html(" ");
        $(".modal-title").html("Edit Training Category");

        $("#btnCategorySaveCont").css("display", "none");
    }

    ClearCategoryPopUpData();

    $("#AddEditCategoryDialog").modal("show");
    $(".form-group").removeClass("has-error  has-feedback");
    return false;
}

function CloseCategoryPopUpDialog() {
    $("#AddEditCategoryDialog").modal("hide");

    ResetValues();
}

function ClearCategoryPopUpData() {
    $('#errorMessage').addClass('alert-danger');
    $('#errorMessage').removeClass('alert-success');
    $('.form-group').removeClass("has-error has-feedback");
    $('#txtCategoryName').val("");
    $('#txtCategoryDescription').val("");

    $("#errorMessage").hide();
    $("#errorMessage").text('');
    $("#divAddCategorymore").hide("");
    $("#divUpdateStatus").hide("");
    $("#btnCategorySave span").attr('data-queid', 0).html("Save");

    $('#chkIsActive').prop('checked', false);
    $("#CategoryPopUpForm").show();
}
function ValidateInput(CategoryID) {

    $('#errorMessage').html('');
    $(".form-group").removeClass("has-error  has-feedback");
    $("#errorMessage").hide();
    var errorMessage = "";
    var CategoryName = $('#txtCategoryName').val();
    var CategoryDescription = $('#txtCategoryDescription').val();
    var status = true;
    if (CategoryName.toString().trim() == "") {
        $("#txtCategoryName").closest(".form-group").addClass("has-error  has-feedback");
        errorMessage += "<div class='errors'><ul><li>Please enter category Name</li><ul></div>";
        status = false;
    }

    if ($('#txtCategoryDescription').val() == "") {
        $("#txtCategoryDescription").closest(".form-group").addClass("has-error  has-feedback");
        errorMessage += "<div class='errors'><ul><li>Please enter category description</li><ul></div>";
        status = false;
    }

    if (status == true) {
        $.ajax({
            url: "/TrainingCategory/ValidateCategoryName",
            async: false,
            contentType: "application/json;charset=utf-8",
            data: { name: $('#txtCategoryName').val().toString().trim(), categoryId: CategoryID },
            success: function (data) {

                if (data == true) {
                    status = false;
                    $('#txtCategoryName').select();
                    $('#txtCategoryName').focus();
                    errorMessage += "<div class='errors'><ul><li>Category name already exists</li><ul></div>";
                }
                else {
                    status = true;
                }
            },

        });
    }
    if (status == false && errorMessage != null) {
        $('#errorMessage').html(errorMessage);
        $('#errorMessage').show();
    }

    return status;
}
function SaveCategory(CategoryID, Continue) {

    var CategoryName = $('#txtCategoryName').val();
    var CategoryDescription = $('#txtCategoryDescription').val();
    var IsActive = $('#chkIsActive').is(':checked');

    $.ajax({
        url: "/TrainingCategory/SaveCategory",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({ CategoryName: CategoryName.toString().trim(), Description: CategoryDescription.toString().trim(), IsActive: IsActive, CategoryId: CategoryID }),
        dataType: 'json',
        success: function (result) {
            if (result.toLowerCase().indexOf("error") < 0) {
                if (CategoryID == 0) {
                    if (Continue) {
                        ClearCategoryPopUpData();
                        $('#errorMessage').removeClass('errors');
                        $('#errorMessage').show();
                        $('#errorMessage').toggleClass('alert-danger');
                        $('#errorMessage').toggleClass('alert-success');
                        $('#errorMessage').append(result).append("<br/>");
                    }
                    else {

                        CloseCategoryPopUpDialog(result);
                        toastr.remove();
                        toastr.success(result);
                    }

                }
                else {
                    toastr.remove();
                    toastr.success(result);
                    CloseCategoryPopUpDialog();
                }
                Sort(sortParameter, currentDirection);

            }
            else {
                showFailureMessage(CategoryID, response);
            }
        },
        error: function () { }
    });
}
function showFailureMessage(CategoryID, response) {

    $('#errorData').html('');
    $('#errorMessage').removeClass('alert alert-success');
    $('#errorMessage').addClass('errors');
    $('#errorMessage').show();
    if (CategoryID == 0)
        $('#errorMessage').append(response);
    else {
        $('#errorMessage').append(response);
    }
}
function Sort(parameter, direction) {
    if (sortDirections[direction] == true)
        sortDirections[direction] = false;
    else { sortDirections[direction] = !sortDirections[direction]; }

    sortParameter = parameter;
    currentDirection = sortDirections[direction];
    var CategoryName = $('#txtSearchCategoryName').val();

    LoadGridData(sortParameter, currentDirection, CategoryName);

    return false;
}


function LoadGridData(sortParameter, currentDirection, CategoryName) {
    $('#gridView').load('/TrainingCategory/GetAllTrainingCategories?page=' + page + '&sortExpression=' + sortParameter + '&sortDirection=' + currentDirection, { CategoryName: CategoryName });
}
function ResetValues() {

    $('#txtSearchCategoryName').val('');
    Sort(sortParameter, currentDirection);
}