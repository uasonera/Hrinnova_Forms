$(document).ready(function () {
    $("#btnSubContractor").click(function () {
        AddUpdateSubContractor();
    });
    $("#btnCloseSubContractor,#btnClose").click(function () {
        ClearFormSubContractor();
    });
});
function AddUpdateSubContractor() {
    if (ValidateSubContractor()) {
        var ID = $("#ID").val();
        var formdata = new FormData($('#frmSubContractorMaster').get(0));
        $.ajax({
            url: "/SubContractorMaster/SaveSubContractorMaster",
            type: "POST",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data) {
                    if (ID > 0) {
                        toastr.success("Sub Contractor has been updated successfully");
                    }
                    else {
                        toastr.success("Sub Contractor has been added successfully");
                    }
                    ClearFormSubContractor();
                    ListOfSubContractorMasterData();
                }
                else {
                    toastr.error("Sub Contractor title is already used");
                }
            }
        });

    }
}
function ValidateSubContractor() {
    var status = true;
    $(".form-group").removeClass("has-error  has-feedback");
    var Title = $.trim($('#txttitle').val());
    var Description = $.trim($('#txtDescription').val());
    var strErrorMessage = '';
    $('#Validation').html('');
    $('#Validation').hide();
    if (Title == "") {
        strErrorMessage += "<li>Please Enter Sub Contractor Title</li>";
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
function ClearFormSubContractor() {
    $("#salesChannelModel").modal('hide');
    $('#SalesChannelModelBody').empty();
    $('#txtTitle').val('');
    $('#txtDescription').val('');
    //$('#errorMessageAddEvent').empty();
}
function ListOfSubContractorMasterData() {
    $.ajax({
        url: '/SubContractorMaster/GetAllSubContractorMaster',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        dataType: 'html',
        success: function (data) {
            if (data) {
                $('#divstatus').empty();
                $('#divstatus').html(data);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
    data_table_init();
}