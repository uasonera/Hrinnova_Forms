$(document).ready(function () {
    $("#btnBu").click(function () {
        AddUpdateBU();
    });   
    $("#btnCloseBu,#btnClose").click(function () {
        ClearFormBU();
    }); 
});
function AddUpdateBU() {
    if (ValidateBU()) {
        var ID = $("#ID").val();
        var formdata = new FormData($('#frmBUMaster').get(0));
        $.ajax({
            url: "/BUMaster/SaveBUMaster",
            type: "POST",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data) {
                    if (ID > 0) {
                        toastr.success("Business Unit has been updated successfully");
                    }
                    else {
                        toastr.success("Business Unit has been added successfully");
                    }
                    ClearFormBU();
                    ListOfBUMasterData();
                }
                else {
                    toastr.error("Business Unit is already used");
                }
            }
        });

    }
}
function ValidateBU() {
    var status = true;
    $(".form-group").removeClass("has-error  has-feedback");
    var bucode = $.trim($('#txtbucode').val());
    var buname = $.trim($('#txtbuname').val());
    var buhead = $.trim($('#drpBUHead').val());
  
    var strErrorMessage = '';
    $('#Validation').html('');
    $('#Validation').hide();
    if (bucode == "") {
        strErrorMessage += "<li>Please Enter Business Unit Code</li>";
        $("#txtbucode").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (buname == "")
    {
        strErrorMessage += "<li>Please Enter Business Unit Name</li>";
        $("#txtbuname").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (buhead == "") {
        strErrorMessage += "<li>Please Select Business Unit Head</li>";
        $("#drpBUHead").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }

    if (status == false && strErrorMessage != null) {
        $('#Validation').css('display', 'block');
        $('#Validation').html("<ul>" + strErrorMessage + "</ul>");
        $('ul li:empty').remove();
    }

    return status;
}
function ClearFormBU() {
    $("#BUModel").modal('hide');
    $('#BusinessUnitModelBody').empty();
    $('#txtbucode').val('');
    $('#txtbuname').val('');
  
  
}
function ListOfBUMasterData() {
    $.ajax({
        url: '/bumaster/GetAllBUMaster',
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


