$(document).ready(function () {

    dialogHeightMax = 290;
    dialogHeightMin = 80;
    page = 1;

    sortDirections = {
        dirNameText: true,
        // dirQuestionCategory: true,
        //dirQuestionFor: true
    };
    sortParameter = null;
    currentDirection = null;

    $('#btnSaveLevel').click(function () {
        var LevelID = $(this).attr('data-LevelId');
        if (ValidateInput(LevelID)) {
            SaveOrganizationLevels(LevelID);
            return true;
        }
        else {
            return false;
        }
    });

    $(document).on('click', '.imgActive', function () {

        var id = $(this).attr("id");
        var LevelID = $(this).attr("data-LevelId");
        var IsActive = $(this).attr("data-IsActive");

        $.ajax({
            url: "/OrganizationLevel/ActiveInactiveLevels",
            type: "POST",
            async: false,
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ LevelId: LevelID, IsActive: IsActive }),
            dataType: 'json',
            success: function (result) {

                if (IsActive.toLowerCase() == 'true') {
                    $("#" + id).attr('data-IsActive', false);
                    $("#imgEdit_" + id.split('_')[1]).attr('data-IsActive', 'False');
                   $("#" + id).attr('title', 'Inactive');
                    $("#" + id).html('<i class="fa fa-times text-danger" ></i>');
                }
                else {
                    $("#" + id).attr('data-IsActive', true);
                    $("#imgEdit_" + id.split('_')[1]).attr('data-IsActive', 'True');
                      $("#" + id).attr('title', 'Active');
                    $("#" + id).html('<i class="fa fa-check text-success" ></i>');
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
                //$('#deleteStatus').text(result);
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

    $('#btnReset').click(function () {
        ClearLevelsData();
        $(".errorLevelMessage").hide();
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

$(document).on('click', '.EditLevels', function () {
    var LevelID = $(this).attr('data-LevelID');
    var LevelName = $(this).attr('data-Name');
    var Abbrevation = $(this).attr('data-Abbreviation');
    var Description = $(this).attr('data-Description');
    var PerDeskCost = $(this).attr('data-PerDeskCost');
    var IsActive = $(this).attr('data-IsActive');
    ClearLevelsData();
    $('#Name').val(LevelName);
    $('#Abbreviation').val(Abbrevation);
    $('#Description').val(Description);
    $('#PerDeskCost').val(PerDeskCost);
    if (IsActive == "True") {
        $('#IsActive').prop("checked", true);
    }
    else {
        $('#IsActive').prop("checked", false);
    }

    $('#btnSaveLevel').attr('data-LevelID', LevelID);
    $('#btnSaveLevel').val("Update");

});

$(document).on('click', '.DeleteLevels', function () {

    var LevelID = $(this).attr('data-LevelID');
    if (confirm("Do you want to delete this record?")) {
        $.ajax({
            url: "/OrganizationLevel/DeleteLevels",
            type: "POST",
            async: false,
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ LevelId: LevelID }),
            dataType: 'json',
            success: function (result) {
                if (result == 'success') {
                    toastr.remove();
                    toastr.success("Record Deleted Successfully.");
                    ClearLevelsData();
                }
                else if (result == 'fail') {
                    toastr.remove();
                    toastr.warning("Levels is in use.Levels Can not be deleted");
                }
                else {
                    toastr.remove();
                    toastr.error("Error occured while deleting Levels");
                }

                Sort(sortParameter, currentDirection);
                return true;

            },
            error: function () { }
        });
        return true;

    }
});

function ClearLevelsData() {
    $('#Name').val("");
    $('#Abbreviation').val("");
    $('#Description').val("");
    $('#PerDeskCost').val("");
    $("#errorBandMessage").hide();
    $("#btnSaveLevel").attr('data-LevelId', 0).val("Save");
    $('#IsActive').prop('checked', false);
    $(".alert.alert-danger li").remove();
    $('.alert.alert-danger').removeClass('alert alert-danger');
    $(".form-group").removeClass("has-error  has-feedback");
    // $('#errorLevelMessage').removeClass('errors');
    //$('#errorLevelData').text("");
    //Sort(sortParameter, currentDirection);
}
function ValidateInput(LevelID) {
    //debugger
    $('#errorLevelData').html('');
    $('.validation-summary-valid ul').empty();
    $(".form-group").removeClass("has-error  has-feedback");
    var LevelName = $('#Name').val();
    var LevelAbbrevation = $('#Abbreviation').val(); Abbreviation
    var status = true;
    if ($('#Name').val().toString().trim() == "") {
        $('.validation-summary-valid ul').append("<li>Please Enter Level Name</li>");
        $('.validation-summary-valid').addClass('alert alert-danger');
        $('#Name').closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if ($('#Abbreviation').val().toString().trim() == "") {
        $('.validation-summary-valid ul').append("<li>Please Enter Level Abbreviation</li>");
        $('.validation-summary-valid').addClass('alert alert-danger');
        $('#Abbreviation').closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }

    if ($('#Abbreviation').val().length > 50) {
        $('.validation-summary-valid').addClass('alert alert-danger');
        $('.validation-summary-valid ul').append("<li>Abbreviation Length should be less than 50</li>");
        $('#Abbreviation').closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if ($('#Name').val().length > 100) {
        $('.validation-summary-valid').addClass('alert alert-danger');
        $('.validation-summary-valid ul').append("<li>Name Length should be less than 100</li>");
        $('#Name').closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (status == true) {
        $.ajax({
            url: "/OrganizationLevel/ValidateLevelName",
            async: false,
            contentType: "application/json;charset=utf-8",
            data: { name: $('#Name').val().toString().trim(), LevelId: LevelID },
            success: function (data) {

                if (data == true) {
                    status = false;
                    $('.validation-summary-valid').addClass('alert alert-danger');
                    $('.alert.alert-danger ul').append("<li>Level name already exists</li>");
                    $('#Name').closest(".form-group").addClass("has-error  has-feedback");
                }
                else {
                    status = true;
                }
            },

        });
    }
    if (status == false) {
        // $('#errorLevelMessage').show();
        $('.validation-summary-valid ul').show();
    }

    return status;
}
function SaveOrganizationLevels(LevelID) {
    var LevelName = $('#Name').val();
    var LevelAbbrevation = $('#Abbreviation').val();
    var LevelDescription = $('#Description').val();
    var PerDeskCost = $('#PerDeskCost').val();
    var IsActive = $('#IsActive').is(':checked');
    $.ajax({
        url: "/OrganizationLevel/SaveOrgnizationLevels",
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({ Name: LevelName.toString().trim(), Abbreviation: LevelAbbrevation.toString().trim(), Description: LevelDescription.toString().trim(), IsActive: IsActive, Id: LevelID, PerDeskCost: PerDeskCost }),
        dataType: 'json',
        success: function (result) {
            if (LevelID == 0) {
                toastr.remove();
                toastr.success(result);
                ClearLevelsData();
            }
            else {
                toastr.remove();
                toastr.success(result);
                ClearLevelsData();

            }
            Sort(sortParameter, currentDirection);
            return true;
        },
        error: function () { }
    });
    return true;
}
function showFailureMessage(LevelID, response) {

    $('#errorLevelData').html('');
    $('.validation-summary-valid ul').empty();
    $('#errorLevelMessage').removeClass('alert alert-success');
    $('#errorLevelMessage').addClass('errors');
    $('#errorLevelMessage').show();
    if (LevelID == 0)
        $('#errorLevelData').append(response);
    else {
        $('#errorLevelData').append(response);
    }
}
function Sort(parameter, direction) {
    if (sortDirections[direction] == true)
        sortDirections[direction] = false;
    else { sortDirections[direction] = !sortDirections[direction]; }

    sortParameter = parameter;
    if (sortDirections[direction] != null) {
        currentDirection = sortDirections[direction];
    }
    LoadGridData(sortParameter, currentDirection);

    return false;
}
function LoadGridData(sortParameter, currentDirection) {
    $('#gridBand').load('/OrganizationLevel/GetAllOrganizationLevels?page=' + page + '&sortExpression=' + sortParameter + '&sortDirection=' + currentDirection);

}
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57))
        return false;
    if ($('#' + evt.id).val().indexOf('.') > -1 && charCode == 46)
    {
        return false;
    }
    else
    {
        return true;
    }
}