$(document).ready(function () {
    $("#btnSavePrimaryRegion").click(function () {
        AddUpdateStatus();
    });

    $("#btnCloseStatus,#btnClose").click(function () {
        ClearFormStatus();
    });

});
function AddUpdateStatus() {
    if (ValidatePrimaryRegion()) {
        var ID = $("#ID").val();
        var formdata = new FormData($('#frmServiceOfferMaster').get(0));
        $.ajax({
            url: "/PrimaryRegionMaster/SavePrimaryRegionmaster",
            type: "POST",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data) {
                    if (ID > 0) {
                        toastr.success("Primary Region has been updated successfully");
                    }
                    else {
                        toastr.success("Primary Region has been added successfully");
                    }
                    ClearFormStatus();
                    ListOfPrimaryRegionData();
                }
                else {
                    toastr.error("Primary Region title is already used");
                }
            }
        });

    }
}
function ValidatePrimaryRegion() {
    var status = true;
    $(".form-group").removeClass("has-error  has-feedback");
    var Title = $.trim($('#txtTitle').val());
    var Description = $.trim($('#txtDescription').val());
    var _validFileExtensions = new Array("jpeg", "jpg", "png");
    var strErrorMessage = '';
    $('#Validation').html('');
    $('#Validation').hide();
    if (Title == "") {
        strErrorMessage += "<li>Please Enter Primary Region Title</li>";
        $("#txtTitle").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }

   

    if (status == false && strErrorMessage != null) {
        $('#Validation').css('display', 'block');
        $('#Validation').html("<ul>" + strErrorMessage + "</ul>");
        $('ul li:empty').remove();
    }

    return status;
}
function ClearFormStatus() {
    $("#PrimaryRegionModel").modal('hide');
    $('#PrimaryRegionModelBody').empty();
    $('#txtTitle').val('');
    $('#txtDescription').val('');
    //$('#errorMessageAddEvent').empty();
}
function ListOfPrimaryRegionData() {
    $.ajax({
        url: '/PrimaryRegionMaster/GetPrimaryRegionlist',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        dataType: 'html',
        success: function (data) {
            if (data) {
                $('#divstatus').empty();
                $('#divstatus').html(data);
                data_table_init();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}


