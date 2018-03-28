$(document).ready(function () {
    $('[data-IsDefaultElement="AgileModel"]').bootstrapSwitch();
    setupCheckboxes();
    $("#btnSaveworkItem").click(function () {
        AddUpdateworkItem();
    });
    if ($("#chkIsAgile").is(':checked')) {
        $('#hideIsAgileDefault').show();
    }
    else {
        $('#hideIsAgileDefault').hide();
    }
    if ($("#chkIsKanban").is(':checked')) {
        $('#hideIsKanbanDefault').show();
    }
    else {
        $('#hideIsKanbanDefault').hide();
        $('#IsKanbanDefault').prop("checked", false);
    }
    if ($("#chkIsIterative").is(':checked')) {
        $('#hideIsIterativeDefault').show();
    }
    else {
        $('#hideIsIterativeDefault').hide(); // Shows
        $('#IsIterativeDefault').prop("checked", false);
    }
    $(".showhidedefault").on('click', function () {
        if ($("#chkIsAgile").is(':checked')) {
            $('#hideIsAgileDefault').show();
        }
        else {
            $('#hideIsAgileDefault').hide(); // Shows
            $("#IsAgileDefault").bootstrapSwitch('state', false);
        }
        if ($("#chkIsKanban").is(':checked')) {
            $('#hideIsKanbanDefault').show();
        }
        else {
            $('#hideIsKanbanDefault').hide(); // Shows
            $("#IsKanbanDefault").bootstrapSwitch('state', false);
        }
        if ($("#chkIsIterative").is(':checked')) {

            $('#hideIsIterativeDefault').show();
        }
        else {
            $('#hideIsIterativeDefault').hide(); // Shows
            $("#IsIterativeDefault").bootstrapSwitch('state', false);
        }
    });
    $('.ulDefaultworkitem li').click(function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        var IconId = $(this).attr('id');
        var IconPath = $('#' + IconId + ' img').attr('data-imagename');
        //$('#file_uploadworkitem').val("");
        $("#Selecteimgname").val(IconPath);

    });
    $("#btnCloseItem,#btnClose").click(function () {
        ClearFormworkItem();
    });
    $("#deleteImage").click(function () {
        if (confirm("Are you sure you want to delete the icon ?")) {
            $("#liSelectedImage").remove();
            $("#Selecteimgname").val("");
            //$('#file_uploadworkitem').val("");
        }
    });
});
function AddUpdateworkItem()
{
    if(ValidateWorkItem())
    {
        var WorkitemId = $("#WorkitemId").val();
        $("#workItemName").val($.trim($("#workItemName").val()));
        var formdata = new FormData($('#frmWorkitem').get(0));
        $.ajax({
            url: "/WorkItem/SaveWorkItem",
            type: "POST",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data) {
                    if (WorkitemId > 0) {
                        toastr.success("Work Item has been updated successfully");
                    }
                    else {
                        toastr.success("Work Item has been saved successfully");
                        $('#worktypeModelBody').empty();
                    }
                    ClearFormworkItem();
                    ListOfworkItemData();
                }
                else
                {
                    toastr.error("WorkItem name is already exits.");
                }
            }
        });
    }
}
function ValidateWorkItem()
{
    var status = true;
    $(".form-group").removeClass("has-error  has-feedback");
    var _validFileExtensions = new Array("jpeg", "jpg", "png");
    var workItemname = $.trim($('#txtworkItem').val());
    var Description=$.trim($("#txtDescription").val());
    var strErrorMessage = '';
    $('#Validation').html('');
    $('#Validation').hide();
    if(workItemname == "")
    {
        strErrorMessage += "<li>Please Enter Work Item name</li>";
        $("#txtworkItem").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (workItemname.length > 20) {
        strErrorMessage += "<li>Maximum 20 characters allowed for Work Item</li>";
        $("#txtworkItem").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (Description.length > 200)
    {
        strErrorMessage += "<li>Maximum 200 characters allowed for Description</li>";
        $("#txtDescription").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if ($('.showhidedefault input[type=checkbox]:checked').length == 0) {
        strErrorMessage += "<li>Please Select at least one Model</li>";
        $(".showhidedefault").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if ($("#Selecteimgname").val() == '') {
        strErrorMessage += "<li>Please select image </li>";
        $(".ulDefaultworkitem").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    //if ($('#file_uploadworkitem').val() != '') {
    //    var FileName = $('#file_uploadworkitem').val();
    //    var extension = FileName.split('.').pop();
    //    if (_validFileExtensions.indexOf(extension.toLowerCase()) < 0) {
    //        strErrorMessage += "<li>Please select valid image. Valid file extensions are " + _validFileExtensions.join() + "</li>";
    //        $("#file_uploadworkitem").closest(".form-group").addClass("has-error  has-feedback");
    //        status = false;
    //    }
    //}
    //if ($('#file_uploadworkitem').val() != '') {
    //    var filesize = $('#file_uploadworkitem').get(0).files[0].size;
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
function ClearFormworkItem() {
    $("#worktypeModel").modal('hide');
    $('#worktypeModelBody').empty();
    
}
function ListOfworkItemData() {
    $.ajax({
        url: '/WorkItem/GetWorkItemList',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        //data: JSON.stringify({ StatusId: StatusId }),
        dataType: 'html',
        success: function (data) {
            if (data) {
                $('#divWorkItem').empty();
                $('#divWorkItem').html(data);
                data_table_init();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}