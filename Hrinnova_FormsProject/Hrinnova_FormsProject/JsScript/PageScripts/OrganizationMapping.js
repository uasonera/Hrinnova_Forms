$(document).ready(function () {

    dialogHeightMax = 290;
    dialogHeightMin = 80;
    page = 1;

    sortDirections = {
        dirName: true,
        // dirQuestionCategory: true,
        //dirQuestionFor: true
    };
    sortParameter = null;
    currentDirection = null;

    $('#btnSaveMapping').click(function () {
        var ID = $(this).attr('data-Id');
        if (ValidateInput(ID)) {
            SaveOrganizationMappings(ID);
            return true;
        }
        else {
            return false;
        }
    });
    $('#btnReset').click(function () {
        ClearMappingData();
    });
})

$(document).on('click', '.SortColumn', function () {
    sortParameter = $(this).attr('data-parameter');
    currentDirection = $(this).attr('data-direction');

    Sort(sortParameter, currentDirection);
});

$(document).on("click", ".page-number", function () {
    page = parseInt($(this).html());
    LoadGridData(null, true);
    return false;
});

$(document).on('click', '.EditMapping', function () {
    var ID = $(this).attr('data-Id');
    var BandID = $(this).attr('data-BandId');
    var LevelID = $(this).attr('data-LevelId');
    var TierID = $(this).attr('data-TierId');
    var ID = $(this).attr('data-Id');
    ClearMappingData();
    $('#ddlorgband').val(BandID).trigger("chosen:updated");
    $('#ddlorgTier').val(TierID).trigger("chosen:updated");
    $('#ddlorglevel').val(LevelID).trigger("chosen:updated");
    $('#btnSaveMapping').attr('data-ID', ID);
    $("#btnSaveMapping span").html('').append('Update');

});

$(document).on('click', '.DeleteMapping', function () {

    var Id = $(this).attr('data-ID');
    var LevelId = $(this).attr('data-LevelId');

    if (confirm("Do you want to delete this record?")) {
        $.ajax({
            url: "/Organizationtbl/DeleteMapping",
            type: "POST",
            async: false,
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ ID: Id, LevelId: LevelId }),
            dataType: 'json',
            success: function (result) {
                if (result == 'success') {
                    toastr.remove();
                    toastr.success("Record Deleted Successfully");
                    ClearMappingData();
                }
                else if (result == 'fail') {
                    toastr.remove();
                    toastr.warning("Mapping is in use.Mapping Can not be deleted");
                }
                else {
                    toastr.remove();
                    toastr.error("Error occured while deleting Mapping");
                }

                Sort(sortParameter, currentDirection);
                return true;
            },
            error: function () { }
        });
    }
    return true;
});

function ClearMappingData() {   

    $('#ddlorgband').val("").trigger("chosen:updated");
    $('#ddlorglevel').val("").trigger("chosen:updated");
    $('#ddlorgTier').val("").trigger("chosen:updated");
    $("#errorBandMessage").hide();
    $("#btnSaveMapping").attr('data-Id', 0);
    $("#btnSaveMapping span").html('').append('Save');
    $(".validation-summary-valid ul").empty();
    $('.validation-summary-valid').removeClass('alert alert-danger');
    $(".form-group").removeClass("has-error  has-feedback");

}
function ValidateInput(ID) {
    $(".validation-summary-valid ul").empty();
    $(".form-group").removeClass("has-error  has-feedback");
    var BandID = $('#ddlorgband').val();
    var LevelID = $('#ddlorglevel').val();
    var TierID = $('#ddlorgTier').val();
    var status = true;

    if (BandID == "") {
        $('.validation-summary-valid').addClass('alert alert-danger');
        $('.validation-summary-valid ul').append("<li>Please Select Band</li>");
        $("#ddlorgband").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (LevelID == "") {
        $('.validation-summary-valid').addClass('alert alert-danger');
        $('.validation-summary-valid ul').append("<li>Please Select Level</li>");
        status = false;
        $("#ddlorglevel").closest(".form-group").addClass("has-error  has-feedback");
    }
    if (TierID == "") {
        $('.validation-summary-valid').addClass('alert alert-danger');
        $('.validation-summary-valid ul').append("<li>Please Select Tier</li>");
        $('#ddlorgTier').closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }

    if (status == true) {
        $.ajax({
            url: "/Organizationtbl/ValidateOfTBL",
            async: false,
            contentType: "application/json;charset=utf-8",
            data: { Id: ID, LevelId: LevelID, TierId: TierID, BandId: BandID },
            success: function (data) {

                if (data == true) {
                    status = false;
                    $('.validation-summary-valid').addClass('alert alert-danger');
                    $('.validation-summary-valid ul').append("<li>This Mapping already exists</li>");

                }
                else {
                    status = true;
                }
            },

        });
        if (status == false) {
            $(".validation-summary-valid ul").show();
        }
        return status;
    }
}
function SaveOrganizationMappings(ID) {    
    var BandID = $('#ddlorgband').val();
    var LevelID = $('#ddlorglevel').val();
    var TierID = $('#ddlorgTier').val();

    $.ajax({
        url: "/Organizationtbl/SaveOrgnizationMapping",
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({ BandId: BandID, LevelId: LevelID, TiersId: TierID, Id: ID }),
        dataType: 'json',
        success: function (result) {
            if (ID == 0) {
                toastr.remove();
                toastr.success(result);
                ClearMappingData();
            }
            else {
                toastr.remove();
                toastr.success(result);
                ClearMappingData();

            }
            Sort(sortParameter, currentDirection);
            return true;
        },
        error: function () { }
    });
    return true;
}
function Sort(parameter, direction) {

    if (sortDirections[direction] == true)
        sortDirections[direction] = false;
    else { sortDirections[direction] = !sortDirections[direction]; }

    sortParameter = parameter;
    currentDirection = sortDirections[direction];
    LoadGridData(sortParameter, currentDirection);

    return false;
}


function LoadGridData(sortParameter, currentDirection) {

    $('#gridMappings').load('/Organizationtbl/GetAllOrganizationMapping?page=' + page + '&sortExpression=' + sortParameter + '&sortDirection=' + currentDirection);
    return true;
}
