$(document).ready(function () {
    $("#btnSaveSecondaryRegion").click(function () {
        AddUpdateStatus();
    });
   
    $("#btnCloseStatus,#btnClose").click(function () {
        ClearFormStatus();
    });

    //var primaryvalue = $("#PrimaryID").val();
    //$("#PrimaryRegionID option").each(function () {
    //    if ($(this).html() == primaryvalue) {
    //        $(this).attr("selected", "selected");
    //        return;
    //    }
    //});

});
function AddUpdateStatus() {
    if (ValidateSecondaryRegion()) {
        var ID = $("#ID").val();
        var formdata = new FormData($('#frmSecondaryRegionMaster').get(0));
        $.ajax({
            url: "/SecondaryRegionMaster/SaveSecondaryRegionmaster",
            type: "POST",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data)
                {
                    if (ID > 0) {
                        toastr.success("Secondary Region has been updated successfully");
                    }
                    else {
                        toastr.success("Secondary Region has been added successfully");
                    }
                    ClearFormStatus();
                    ListOfServiceOfferData();
                }
                else
                {
                    toastr.error("Secondary Region title is already used");
                }
            }
        });

    }
}
function ValidateSecondaryRegion() {
    var status = true;
    $(".form-group").removeClass("has-error  has-feedback");
    var Title = $.trim($('#txtTitle').val());
    var Description = $.trim($('#txtDescription').val());
    var PrimaryRegion = $.trim($('#PrimaryRegionID').val());
    var _validFileExtensions = new Array("jpeg", "jpg", "png");
    var strErrorMessage = '';
    $('#Validation').html('');
    $('#Validation').hide();

    if (PrimaryRegion == "") {
        strErrorMessage += "<li>Please Select Primary Region </li>";
        $("#PrimaryRegionID").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }

    if (Title == "") {
        strErrorMessage += "<li>Please Enter Secondary Region Title</li>";
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
    $("#SecondaryRegionModel").modal('hide');
    $('#SecondaryRegionModelBody').empty();
    $('#txtTitle').val('');
    $('#txtDescription').val('');
    //$('#errorMessageAddEvent').empty();
}
function ListOfServiceOfferData() {
    $.ajax({
        url: '/SecondaryRegionMaster/GetSecondaryRegionlist',
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
                $('[data-IsDefaultElement="EditTable"]').bootstrapSwitch();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}


