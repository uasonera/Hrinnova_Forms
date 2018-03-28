$(document).ready(function () {
    $('[data-IsDefaultElement="Update"]').bootstrapSwitch();
   
    $('.ulDefaultBank li').click(function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        var IconId = $(this).attr('id');
        var IconPath = $('#' + IconId + ' img').attr('data-imagename');
        //$('#file_uploadBank').val("");
        $("#SelecteimgPath").val(IconPath);

    });
    $("#btnCloseBank,#btnClose").click(function () {
        ClearFormBank();
    });
    $("#deleteImage").click(function () {
        if (confirm("Are you sure you want to delete the icon ?")) {
            $("#liSelectedImage").remove();
            $("#SelecteimgPath").val("");
            //$('#file_uploadBank').val("");
        }
    });
    

});
function AddUpdateBank() {
    if (ValidateBank()) {
        var BankId = $("#BankId").val();

        var formdata = new FormData($('#frmBankMaster').get(0));
        $.ajax({
            url: "/BankMaster/SaveBankMaster",
            type: "POST",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data == "true") {
                    if (BankId > 0) {
                        toastr.success("Record has been updated successfully");
                    }
                    else {
                        toastr.success("Record has been added successfully");
                    }
                    ClearFormBank();
                    ListOfBankData();
                }
                else {
                    toastr.error(data + " is already used");
                }
            }
        });

    }
}
function ValidateBank() {

    var Bank = true;
    $(".form-group").removeClass("has-error  has-feedback");
    var bankName = $.trim($('#bankName').val());
    var IFSCCode = $.trim($('#IFSCCode').val());
    var BSRCode = $.trim($('#BSRCode').val());
    var NEFTCode = $.trim($('#NEFTCode').val());
    var bankBranch = $.trim($('#BankBranch').val());
    var MICRCode = $.trim($('#MICRCode').val());
    var AccountType = $.trim($('#AccountType').val());
    var Address = $.trim($('#Address').val());

    var strErrorMessage = '';
    $('#Validation').html('');
    $('#Validation').hide();



    if (bankName == "") {
        strErrorMessage += "<li>Please Enter Bank Name</li>";
        $("#bankName").closest(".form-group").addClass("has-error  has-feedback");
        Bank = false;
    }
    if (IFSCCode == "") {
        strErrorMessage += "<li>Please Enter IFSC Code</li>";
        $("#IFSCCode").closest(".form-group").addClass("has-error  has-feedback");
        Bank = false;
    }
    if (BSRCode == "") {
        strErrorMessage += "<li>Please Enter BSR Code</li>";
        $("#BSRCode").closest(".form-group").addClass("has-error  has-feedback");
        Bank = false;
    }
    if (NEFTCode == "") {
        strErrorMessage += "<li>Please Enter NEFT Code</li>";
        $("#NEFTCode").closest(".form-group").addClass("has-error  has-feedback");
        Bank = false;
    }
    if (bankBranch == "") {
        strErrorMessage += "<li>Please Enter Bank Branch</li>";
        $("#bankBranch").closest(".form-group").addClass("has-error  has-feedback");
        Bank = false;
    }
    if (MICRCode == "") {
        strErrorMessage += "<li>Please Enter MICR Code</li>";
        $("#MICRCode").closest(".form-group").addClass("has-error  has-feedback");
        Bank = false;
    }
    if (Address == "") {
        strErrorMessage += "<li>Please Enter Address</li>";
        $("#Address").closest(".form-group").addClass("has-error  has-feedback");
        Bank = false;
    }
    if (AccountType == 0) {
        strErrorMessage += "<li>Please Select Account Type</li>";
        $("#AccountType").closest(".form-group").addClass("has-error  has-feedback");
        Bank = false;
    }

    //if ($("#SelecteimgPath").val() == '') {
    //    strErrorMessage += "<li>Please select image </li>";
    //    $(".ulDefaultBank").closest(".form-group").addClass("has-error  has-feedback");
    //    Bank = false;
    //}
    //if ($('#file_uploadBank').val() != '') {
    //    var FileName = $('#file_uploadBank').val();
    //    var extension = FileName.split('.').pop();
    //    if (_validFileExtensions.indexOf(extension.toLowerCase()) < 0) {
    //        strErrorMessage += "<li>Please select valid image. Valid file extensions are " + _validFileExtensions.join() + "</li>";
    //        $("#file_uploadBank").closest(".form-group").addClass("has-error  has-feedback");
    //        Bank = false;
    //    }
    //}
    //if ($('#file_uploadBank').val() != '') {
    //    var filesize = $('#file_uploadBank').get(0).files[0].size;
    //    if (Math.round(parseInt(filesize) / 1000) > 5000) {
    //        error += '<li>Image size must be less than 5MB </li>';
    //        Bank = false;
    //    }
    //}

    if (Bank == false && strErrorMessage != null) {
        $('#Validation').css('display', 'block');
        $('#Validation').html("<ul>" + strErrorMessage + "</ul>");
        $('ul li:empty').remove();
    }

    return Bank;
}
function ClearFormBank() {
    $("#BankMasterModel").modal('hide');
    $('#BankMasterModelBody').empty();
    $('#txtBankName').val('');
    $('#txtBankcode').val('');
    $('#txtAddress').val('');
    $('#txtContact').val('');
    $('#errorMessageAddEvent').empty();
}
function ListOfBankData() {
    $.ajax({
        url: '/BankMaster/GetBankList',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        //data: JSON.stringify({ BankId: BankId }),
        dataType: 'html',
        success: function (data) {
            if (data) {
                $('#divBank').empty();
                $('#divBank').html(data);
                data_table_init();
                $('[data-IsDefaultElement="EditTable"]').bootstrapSwitch();
            }
        },
        error: function (jqXHR, textBank, errorThrown) {
        }
    });
}