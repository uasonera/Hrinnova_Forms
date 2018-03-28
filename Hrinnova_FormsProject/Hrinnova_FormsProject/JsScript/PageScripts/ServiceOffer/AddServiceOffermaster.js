$(document).ready(function () {
    $('[data-IsDefaultElement="Update"]').bootstrapSwitch();
    $("#btnSaveserviceoffer").click(function () {
        AddUpdateStatus();
    });

    
    $("#btnCloseStatus,#btnClose").click(function () {
        ClearFormStatus();
    });

});
function AddUpdateStatus() {
    if (ValidateServiceoffer()) {
        var ID = $("#ID").val();
        var formdata = new FormData($('#frmServiceOfferMaster').get(0));
        $.ajax({
            url: "/ServiceOfferingMaster/SaveServiceOffermaster",
            type: "POST",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data)
                {
                    if (ID > 0) {
                        toastr.success("Service Offer has been updated successfully");
                    }
                    else {
                        toastr.success("Service Offer has been added successfully");
                    }
                    ClearFormStatus();
                    ListOfServiceOfferData();
                }
                else
                {
                    toastr.error("Service Offer title is already used");
                }
            }
        });

    }
}
function ValidateServiceoffer() {
    var status = true;
    $(".form-group").removeClass("has-error  has-feedback");
    var Title = $.trim($('#txtTitle').val());
    var Description = $.trim($('#txtDescription').val());
    var _validFileExtensions = new Array("jpeg", "jpg", "png");
    var strErrorMessage = '';
    $('#Validation').html('');
    $('#Validation').hide();
    if (Title == "") {
        strErrorMessage += "<li>Please Enter Service Offer Title</li>";
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
    $("#ServiceofferModel").modal('hide');
    $('#ServiceofferModelBody').empty();
    $('#txtTitle').val('');
    $('#txtDescription').val('');
    //$('#errorMessageAddEvent').empty();
}
function ListOfServiceOfferData() {
    $.ajax({
        url: '/ServiceOfferingMaster/Getserviceofferlist',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        //data: JSON.stringify({ StatusId: StatusId }),
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


