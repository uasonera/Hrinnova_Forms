$(document).ready(function () {
    
    $("#btnSavejob").click(function () {
        AddUpdateSchduler();
    });
    $("#btnCloseItem,#btnClose").click(function () {
        ClearFormworkItem();
    });
    
});
function AddUpdateSchduler()
{
    if (ValidateSchdeuler())
    {
        var SchedulerId = $("#SchedulerId").val();
        $("#txtSchedulerName").val($.trim($("#txtSchedulerName").val()));
        var formdata = new FormData($('#frmscheduler').get(0));
        $.ajax({
            url: "/ManageScheduler/SaveSchedulerTiming",
            type: "POST",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data) {
                    if (SchedulerId > 0) {
                        toastr.success("Scheduler has been updated successfully");
                    }
                    else {
                        toastr.success("Scheduler has been saved successfully");
                        $('#worktypeModelBody').empty();
                    }
                    ClearForSchdeulerdata();
                    ListOfSchdeulerData();
                }
                else
                {
                    //toastr.error("Scheduler name is already exits.");
                }
            }
        });
    }
}
function ValidateSchdeuler()
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
    
    if (status == false && strErrorMessage != null) {
        $('#Validation').css('display', 'block');
        $('#Validation').html("<ul>" + strErrorMessage + "</ul>");
        $('ul li:empty').remove();
    }
    return status;
}
function ClearForSchdeulerdata() {
    $("#schedulerModel").modal('hide');
    $('#schedulerModelBody').empty();

}
function ListOfSchdeulerData() {
    $.ajax({
        url: '/ManageScheduler/GetManageSchedulerList',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        dataType: 'html',
        success: function (data) {
            if (data) {
                $('#divScheduler').empty();
                $('#divScheduler').html(data);
                data_table_init();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}