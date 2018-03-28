$(document).ready(function () {

    dialogHeightMax = 290;
    dialogHeightMin = 80;
    page = 1;

    sortDirections = {
        dirNameText: true,
    };
    $("#errorMessage").hide();
    sortParameter = null;
    currentDirection = null;



    $('#btnAddTiear').click(function () {
        var TiersID = $(this).attr('data-TiersId');
        if (ValidateInput(TiersID)) {
            SaveOrganizationTiers(TiersID);
            return true;
        }
        else {
            return false;
        }

    });
    $(document).on('click', '.imgActive', function () {
        var id = $(this).attr("id");
        var TiersID = $(this).attr("data-TiersId");
        var IsActive = $(this).attr("data-IsActive");

        $.ajax({
            url: "/Tiers/ActiveInactiveTiers",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ Id: TiersID, IsActive: IsActive }),
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


    $('#btnReset').click(function () {
        ClearTiersData();
        $("#errorMessage").hide();
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

$(document).on('click', '.EditTriers', function () {
    var TiersID = $(this).attr('data-TiersID');
    var TiersName = $(this).attr('data-Name');
    var Description = $(this).attr('data-Description');
    var IsActive = $(this).attr('data-IsActive');
    ClearTiersData();
    $('#Name').val(TiersName);
    $('#Description').val(Description);

    if (IsActive == "True") {
        $('#IsActive').prop("checked", true);
    }
    else {
        $('#IsActive').prop("checked", false);
    }

    $('#btnAddTiear').attr('data-TiersID', TiersID);
    $('#btnAddTiear span').html('').append("Update");

});

$(document).on('click', '.DeleteTiers', function () {
    var TiersID = $(this).attr('data-TiersID');
    if (confirm("Do you want to delete this record?")) {
        $.ajax({
            url: "/Tiers/DeleteTiers",
            type: "POST",
            async: false,
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ Id: TiersID }),
            dataType: 'json',
            success: function (result) {
                if (result == 'success') {
                    toastr.remove();
                    toastr.success("Record Deleted Successfully");
                    ClearTiersData();
                }
                else if (result == 'fail') {
                    toastr.remove();
                    toastr.warning("Tiers is in use.Tiers Can not be deleted");
                }
                else {
                    toastr.remove();
                    toastr.error("Error occured while deleting Tiers");
                }

                Sort(sortParameter, currentDirection);
            },
            error: function () { }
        });
    }
});
function ClearTiersData() {
    $('#Name').val("");
    $('#Description').val("");
    $("#btnAddTiear").attr('data-TiersId', 0)
    $("#btnAddTiear span").html('').append("Save");
    $('#IsActive').prop('checked', false);
    $('#errorData').text("");
    $('#errorMessage').removeClass('alert alert-danger');
    $(".form-group").removeClass("has-error  has-feedback");
    
}
function ValidateInput(TiersID) {
    var status = true;
    $(".form-group").removeClass("has-error  has-feedback");
    if ($('#Name').val().toString().trim() == "") {
        $('#errorMessage').show();
        $('#errorMessage').addClass('alert alert-danger');
        $('#errorData').empty();
        $('#errorData').append("Please Enter Tier Name").append("<br/>");
        $('#Name').closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if ($('#Name').val().length > 100) {

        $('#errorMessage').show();
        $('#errorMessage').addClass('alert alert-danger');
        $('#errorData').append("Tier Name should be Less than 100").append("<br/>");
        $('#Name').closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (status == true) {
        $.ajax({
            url: "/Tiers/ValidateTiersName",
            async: false,
            contentType: "application/json;charset=utf-8",
            data: { Name: $("#Name").val().toString().trim(), ID: TiersID },
            success: function (data) {
                if (data == true) {

                    $('#Name').select();
                    $('#Name').focus();
                    $('#errorMessage').show();
                    $('#errorMessage').addClass('alert alert-danger');
                    $('#errorData').append("Tier name already exists").append("<br/>");
                    $('#Name').closest(".form-group").addClass("has-error  has-feedback");
                    status = false;
                }
                else {
                    status = true;
                }
            },

        });
    }
    if (status == false) {
        $('#errorMessage').show();
    }

    return status;
}
function SaveOrganizationTiers(TiersID) {

    var TiersName = $('#Name').val();
    var TiersDescription = $('#Description').val();
    var IsActive = $('#IsActive').is(':checked');
    $.ajax({
        url: "/Tiers/SaveOrganizationTiers",
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({ Name: TiersName.toString().trim(), Description: TiersDescription.toString().trim(), IsActive: IsActive, ID: TiersID }),
        dataType: 'json',
        success: function (result) {
            if (TiersID == 0) {
                toastr.remove();
                toastr.success(result);
                ClearTiersData();
            }
            else {
                toastr.remove();
                toastr.success(result);
                ClearTiersData();

            }
            Sort(sortParameter, currentDirection);
            return true;
        },
        error: function () { }
    });
    return true;
}
function showFailureMessage(TiersID, response) {

    $('#errorData').html('');
    $('#errorMessage').removeClass('alert alert-success');
    $('#errorMessage').addClass('alert alert-danger');
    $('#errorMessage').show();
    if (TiersID == 0)
        $('#errorData').append(response);
    else {
        $('#errorData').append(response);
    }
}
function Sort(parameter, direction) {

    if (sortDirections[direction] == true)
        sortDirections[direction] = false;
    else { sortDirections[direction] = !sortDirections[direction]; }

    sortParameter = parameter;
    currentDirection = sortDirections[direction];
    //var Name = $('#txtTiersName').val();

    LoadGridData(sortParameter, currentDirection);

    return false;
}


function LoadGridData(sortParameter, currentDirection) {

    $('#grid').load('/Tiers/GetAllOrganizationTiers?page=' + page + '&sortExpression=' + sortParameter + '&sortDirection=' + currentDirection);
    return false;
}
