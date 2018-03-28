$(document).ready(function () {   
    $("#btngotomaster").click(function () {
        AddUpdateGoToMaster();
    });
    $('.ulDefaultStatus li').click(function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        var IconId = $(this).attr('id');
        var IconPath = $('#' + IconId + ' img').attr('data-imagename');    
        $("#SelecteimgPath").val(IconPath);

    });
    $("#btnCloseStatus,#btnClose").click(function () {
        ClearFormStatus();
    });
});
function AddUpdateGoToMaster() {
    if (ValidateGoToMaster()) {
        var ID = $("#ID").val();
        var formdata = new FormData($('#frmStatusMaster').get(0));
        $.ajax({
            url: "/GoToMarketMaster/SaveGoToMarketMaster",
            type: "POST",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data) {
                    if (ID > 0) {
                        toastr.success("Go To Market has been updated successfully");
                    }
                    else {
                        toastr.success("Go To Market has been added successfully");
                    }
                    ClearGoToMasterData();
                    ListOfGoToMasterData();
                }
                else {
                    toastr.error("Go To Market title is already used");
                }
            }
        });

    }
}
function ValidateGoToMaster() {
    var status = true;
    $(".form-group").removeClass("has-error  has-feedback");
    var Title = $.trim($('#txttitle').val());
    var Description = $.trim($('#txtDescription').val());
    //var _validFileExtensions = new Array("jpeg", "jpg", "png");
    var strErrorMessage = '';
    $('#Validation').html('');
    $('#Validation').hide();
    if (Title == "") {
        strErrorMessage += "<li>Please Enter Go To Market Title</li>";
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
function ClearGoToMasterData() {
    $("#gotoMasterModel").modal('hide');
    $('#gotomasterModelBody').empty();
    $('#txtTitle').val('');
    $('#txtDescription').val('');   
}
function ListOfGoToMasterData() {
    $.ajax({
        url: '/GoToMarketMaster/GetAllGoToMarketMaster',
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