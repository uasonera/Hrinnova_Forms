$(document).ready(function () {
    $('[data-IsDefaultElement="Update"]').bootstrapSwitch();
    $("#btnSavestatus").click(function () {
        AddUpdateStatus();
    });
    $('.ulDefaultStatus li').click(function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        var IconId = $(this).attr('id');
        var IconPath = $('#' + IconId + ' img').attr('data-imagename');
        //$('#file_uploadstatus').val("");
        $("#SelecteimgPath").val(IconPath);

    });
    $("#btnCloseStatus,#btnClose").click(function () {
        ClearFormStatus();
    });
    $("#deleteImage").click(function () {
        if (confirm("Are you sure you want to delete the icon ?")) {
            $("#liSelectedImage").remove();
            $("#SelecteimgPath").val("");
            //$('#file_uploadstatus').val("");
        }
    });

});
function AddUpdateStatus() {
    if (ValidateStatus()) {
        var StatusId = $("#StatusId").val();
        $("#DisplayValue").val($.trim($("#DisplayValue").val()))
        var formdata = new FormData($('#frmStatusMaster').get(0));
        $.ajax({
            url: "/StatusMaster/SaveStatusmaster",
            type: "POST",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data)
                {
                    if (StatusId > 0) {
                        toastr.success("Status has been updated successfully");
                    }
                    else {
                        toastr.success("Status has been added successfully");
                    }
                    ClearFormStatus();
                    ListOfStatusData();
                }
                else
                {
                    toastr.error("Status Name is already used");
                }
            }
        });

    }
}
function ValidateStatus() {
    var status = true;
    $(".form-group").removeClass("has-error  has-feedback");
    var Statusname = $.trim($('#txtstatusname').val());
    var Description = $.trim($('#txtDescription').val());
    var _validFileExtensions = new Array("jpeg", "jpg", "png");
    var strErrorMessage = '';
    $('#Validation').html('');
    $('#Validation').hide();
    if (Statusname == "") {
        strErrorMessage += "<li>Please Enter Status name</li>";
        $("#txtstatusname").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (Statusname.length > 20) {
        strErrorMessage += "<li>Maximum 20 characters allowed for Status</li>";
        $("#txtstatusname").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (Description.length > 200) {
        strErrorMessage += "<li>Maximum 200 characters allowed for Description</li>";
        $("#txtDescription").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if ($("#SelecteimgPath").val() == '') {
        strErrorMessage += "<li>Please select image </li>";
        $(".ulDefaultStatus").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    //if ($('#file_uploadstatus').val() != '') {
    //    var FileName = $('#file_uploadstatus').val();
    //    var extension = FileName.split('.').pop();
    //    if (_validFileExtensions.indexOf(extension.toLowerCase()) < 0) {
    //        strErrorMessage += "<li>Please select valid image. Valid file extensions are " + _validFileExtensions.join() + "</li>";
    //        $("#file_uploadstatus").closest(".form-group").addClass("has-error  has-feedback");
    //        status = false;
    //    }
    //}
    //if ($('#file_uploadstatus').val() != '') {
    //    var filesize = $('#file_uploadstatus').get(0).files[0].size;
    //    if (Math.round(parseInt(filesize) / 1000) > 5000) {
    //        error += '<li>Image size must be less than 5MB </li>';
    //        status = false;
    //    }
    //}

    if (status == false && strErrorMessage != null) {
        $('#Validation').css('display', 'block');
        $('#Validation').html("<ul>" + strErrorMessage + "</ul>");
        $('ul li:empty').remove();
    }

    return status;
}
function ClearFormStatus() {
    $("#statusmasterModel").modal('hide');
    $('#statusmasterModelBody').empty();
    $('#txtstatusname').val('');
    $('#txtDescription').val('');
    $('#errorMessageAddEvent').empty();
}
function ListOfStatusData() {
    $.ajax({
        url: '/StatusMaster/GetStatusList',
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