$(document).ready(function () {
    $("#btnSales").click(function () {
        AddUpdateSalesChannel();
    });   
    $("#btnCloseStatus,#btnClose").click(function () {
        ClearFormSalesChannel();
    }); 
});
function AddUpdateSalesChannel() {
    if (ValidateSalesChannel()) {
        var ID = $("#ID").val();
        var formdata = new FormData($('#frmSalesChannelMaster').get(0));
        $.ajax({
            url: "/SalesChannelMaster/SaveSalesChannelMaster",
            type: "POST",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data) {
                    if (ID > 0) {
                        toastr.success("Sales Channel has been updated successfully");
                    }
                    else {
                        toastr.success("Sales Channel has been added successfully");
                    }
                    ClearFormSalesChannel();
                    ListOfSalesChannelMasterData();
                }
                else {
                    toastr.error("Sales Channel title is already used");
                }
            }
        });

    }
}
function ValidateSalesChannel() {
    var status = true;
    $(".form-group").removeClass("has-error  has-feedback");
    var Title = $.trim($('#txttitle').val());
    var Description = $.trim($('#txtDescription').val());
   // var _validFileExtensions = new Array("jpeg", "jpg", "png");
    var strErrorMessage = '';
    $('#Validation').html('');
    $('#Validation').hide();
    if (Title == "") {
        strErrorMessage += "<li>Please Enter Sales Channel Title</li>";
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
function ClearFormSalesChannel() {
    $("#salesChannelModel").modal('hide');
    $('#SalesChannelModelBody').empty();
    $('#txtTitle').val('');
    $('#txtDescription').val('');
  
}
function ListOfSalesChannelMasterData() {
    $.ajax({
        url: '/SalesChannelMaster/GetAllSalesChannelMaster',
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


