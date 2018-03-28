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

    $('#btnSaveBand').click(function () {

        var BandsID = $(this).attr('data-BandsId');
        if (ValidateInput(BandsID)) {
            SaveOrganizationBands(BandsID);
            return true;
        }
        else {
            return false;
        }
    });

    $(document).on('click', '.imgActive', function () {

        var id = $(this).attr("id");
        var BandsID = $(this).attr("data-BandsId");
        var IsActive = $(this).attr("data-IsActive");

        $.ajax({
            url: "/OrganizationBand/ActiveInactiveBands",
            type: "POST",
            async: false,
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ BandID: BandsID, IsActive: IsActive }),
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
        ClearBandsData();
        $("#errorBandMessage").hide();
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

$(document).on('click', '.EditBands', function () {
    var BandsID = $(this).attr('data-BandsID');
    var BandsName = $(this).attr('data-Name');
    var Description = $(this).attr('data-Description');
    var IsActive = $(this).attr('data-IsActive');
    ClearBandsData();
    $('#Name').val(BandsName);
    $('#Description').val(Description);

    if (IsActive == "True") {
        $('#IsActive').prop("checked", true);
    }
    else {
        $('#IsActive').prop("checked", false);
    }
    $('#btnSaveBand').attr('data-BandsID', BandsID);
    $('#btnSaveBand span').html('').append("Update");

});

$(document).on('click', '.DeleteBands', function () {
    var BandsID = $(this).attr('data-BandsID');
    if (confirm("Do you want to delete this record?")) {
        $.ajax({
            url: "/OrganizationBand/DeleteBands",
            type: "POST",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ BandId: BandsID }),
            dataType: 'json',
            success: function (result) {
                if (result == 'success') {
                    toastr.remove();
                    toastr.success("Record Deleted Successfully");
                    ClearBandsData();
                }
                else if (result == 'fail') {
                    toastr.remove();
                    toastr.warning("Bands is in use.Bands Can not be deleted");
                }
                else {
                    toastr.remove();
                    toastr.error("Error occured while deleting band");
                }

                Sort(sortParameter, currentDirection);
                window.location.reload();
            },
            error: function () { }
        });
    }
});

function ClearBandsData() {
    $('#Name').val("");
    $('#Description').val("");
   // $("#Message").hide();
    $("#btnSaveBand").attr('data-BandsId', 0);
    $('#btnSaveBand span').html('').append("Save");
    $('#IsActive').prop('checked', false);
    $('#errorBandMessage').removeClass('alert alert-danger');
    $('#errorBandData').text("");
    $(".form-group").removeClass("has-error  has-feedback");
}
function ValidateInput(BandsID) {
    $('#errorBandData').html('');
    $(".form-group").removeClass("has-error  has-feedback");
    var BandName = $('#Name').val();
    var BandDescription = $('#Description').val();
    var status = true;
    if ($('#Name').val().toString().trim() == "") {
        $('#errorBandMessage').show();
        $('#errorBandMessage').addClass('alert alert-danger');
        $('#errorBandData').append("Please Enter Band Name").append("<br/>");
        $('#Name').closest(".form-group").addClass("has-error  has-feedback");

        status = false;
    }
    if ($('#Name').val().length > 100) {
        $('#errorBandMessage').show();
        $('#errorBandMessage').addClass('alert alert-danger');
        $('#errorBandData').append("Tier Name should be Less than 100").append("<br/>");
        $('#Name').closest(".form-group").addClass("has-error  has-feedback");

        status = false;
    }
    if (status == true) {
        $.ajax({
            url: "/OrganizationBand/ValidateBandName",
            async: false,
            contentType: "application/json;charset=utf-8",
            data: { name: $('#Name').val().toString().trim(), BandId: BandsID },
            success: function (data) {

                if (data == true) {
                    status = false;
                    $('#Name').select();
                    $('#Name').focus();
                    $('#errorBandMessage').show();
                    $('#errorBandMessage').addClass('alert alert-danger');
                    $('#errorBandData').append("Band name already exists").append("<br/>");
                    $('#Name').closest(".form-group").addClass("has-error  has-feedback");

                }
                else {
                    status = true;
                }
            },

        });
    }
    if (status == false) {
        $('#errorBandMessage').show();
    }

    return status;
}
function SaveOrganizationBands(BandsID) {

    var BandsName = $('#Name').val();
    //alert(BandsName);
    var BandsDescription = $('#Description').val();
    //alert(BandsDescription);
    var IsActive = $('#IsActive').is(':checked');
    //alert(IsActive);
    $.ajax({
        url: "/OrganizationBand/SaveOrgnizationBands",
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({ Name: BandsName.toString().trim(), Description: BandsDescription.toString().trim(), IsActive: IsActive, Id: BandsID }),
        dataType: 'json',
        success: function (result) {

            if (BandsID == 0) {
                    toastr.remove();
                    toastr.success(result);
                    ClearBandsData();
                }
                else {
                    toastr.remove();
                    toastr.success(result);
                    ClearBandsData();

                }
                Sort(sortParameter, currentDirection);
                return true;

        },
        error: function () { }
    });
    return true;
}
function showFailureMessage(BandsID, response) {

    $('#errorBandData').html('');
    $('#errorBandMessage').removeClass('alert alert-success');
    $('#errorBandMessage').addClass('errors');
    $('#errorBandMessage').show();
    if (BandsID == 0)
        $('#errorBandData').append(response);
    else {
        $('#errorBandData').append(response);
    }
}
function Sort(parameter, direction) {

    if (sortDirections[direction] == true)
        sortDirections[direction] = false;
    else { sortDirections[direction] = !sortDirections[direction]; }

    sortParameter = parameter;
    currentDirection = sortDirections[direction];
    //var Name = $('#txtBandName').val();

    LoadGridData(sortParameter, currentDirection);

    return false;
}
function LoadGridData(sortParameter, currentDirection, Name) {

    $('#gridBands').load('/OrganizationBand/GetAllOrganizationBands?page=' + page + '&sortExpression=' + sortParameter + '&sortDirection=' + currentDirection);

}