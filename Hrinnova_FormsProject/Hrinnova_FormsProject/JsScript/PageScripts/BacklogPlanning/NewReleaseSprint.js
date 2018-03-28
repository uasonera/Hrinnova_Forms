$(document).ready(function () {
    var ReleaseId = $("#ReleaseId").val();
    if (ReleaseId == null || ReleaseId == 0) {
        $('#StartDate').datepicker().datepicker("setDate", new Date());
        $('#EndDate').datepicker().datepicker("setDate", new Date());
    }
    $("#StartDate").datepicker('setStartDate', $('#StartDate').val());
    $("#EndDate").datepicker('setStartDate', $('#StartDate').val());
    $("#StartDate").change(function () {
        //var startDate = $("#StartDate").val();
        //if (startDate != "") {
        //    startDate = moment(startDate).format("MM/DD/YYYY");
        //    $("#EndDate").datepicker('setStartDate', startDate);
        //}
        //else {
        //    $("#EndDate").datepicker('setStartDate', new Date());
        //}
    });
    $("#EndDate").change(function () {
        //var EndDate = $("#EndDate").val();
        //if (EndDate != "") {
        //    EndDate = moment(EndDate).format("MM/DD/YYYY");
        //    //$("#StartDate").datepicker('setEndDate', EndDate);
        //}
        //else {
        //    $("#StartDate").datepicker('setEndDate', new Date());
        //}
    });
    $("#btnSaverelease").click(function () {
        AddUpdateRelease()
        return false;
    });
    $("#deleteWorkitem").click(function () {
        DeleteAllRelease()
        return false;
    });
    $("#moveWorkitem").click(function () {
        MoveworkitemintoBackloag()
        //return false;
    });
    $("#btnCloseItem,#btnClose").click(function () {
        ClearFormRelease();
    });
});
function AddUpdateRelease() {
    if (ValidateRelease()) {
        var ReleaseId = $("#ReleaseId").val();
        $('#ReleaseName').val($.trim($('#ReleaseName').val()));
        var formdata = new FormData($('#frmRelease').get(0));
        $.ajax({
            url: "/BacklogPlanning/SavReleaseSPrint",
            type: "POST",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data) {
                    if (ReleaseId > 0) {
                        toastr.success("Release has been updated successfully");
                    }
                    else {
                        toastr.success("Release has been saved successfully");
                    }
                    ClearFormRelease();
                }
                else {
                    toastr.error("Release Name is already Exist");
                }
                var SprintType = $('#SprinType').val();
                var releaseID = 0;
                GetReleasewiseSprintWorkitems(SprintType, "", releaseID, false);
                return true;
            }
        });
    }
    return false;
}
function ValidateRelease() {

    var status = true;
    $(".form-group").removeClass("has-error  has-feedback");
    var ReleaseName = $.trim($('#ReleaseName').val());
    var Description = $.trim($("#Description").val());
    var StartDate = $('#StartDate').val();
    var EndDate = $("#EndDate").val();
    var strErrorMessage = '';
    $('#errorMessage').html('');
    $('#errorMessage').hide();
    if (ReleaseName == "") {
        strErrorMessage += "<li>Please Enter Release name</li>";
        $("#ReleaseName").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (ReleaseName.length > 30) {
        strErrorMessage += "<li>Maximum 30 characters allowed for Release Name</li>";
        $("#ReleaseName").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (Description.length > 300) {
        strErrorMessage += "<li>Maximum 300 characters allowed for Description</li>";
        $("#Description").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (StartDate == "") {
        strErrorMessage += "<li>Please Enter Start date</li>";
        $("#StartDate").closest(".form-group").addClass("has-error");
        status = false;
    }
    if (EndDate == "") {
        strErrorMessage += "<li>Please Enter End date</li>";
        $("#EndDate").closest(".form-group").addClass("has-error");
        status = false;
    }
    if (StartDate != "" && EndDate != "" && Date.parse(EndDate) < Date.parse(StartDate)) {
        strErrorMessage += "<li>Start date can not be greater than end date</li>";
        $("#EndDate").closest(".form-group").addClass("has-error");
        status = false;
    }
    if (status == false && strErrorMessage != null) {
        $('#errorMessage').css('display', 'block');
        $('#errorMessage').html("<ul>" + strErrorMessage + "</ul>");
        $('ul li:empty').remove();
    }
    return status;
}
function ClearFormRelease() {
    $("#new-release-modal").modal('hide');
    $('#ReleaseModelbody').empty();

}
function DeleteAllRelease() {
    var ReleaseId = $("#DeleteallReleaseId").val();
    $.ajax({
        url: "/BacklogPlanning/DeleteAllRelease",
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        data: JSON.stringify({ ReleaseId: ReleaseId }),
        dataType: 'json',
        success: function (data) {

            if (data) {
                toastr.success("Release has been deleted successfully");
            }
            $("#deletereleasemodal").modal('hide');
            $('#DeletereleaseModelbody').empty();
            window.location.href = '/BacklogPlanning/Index';
            return true;
        }
    });
    return false;
}
function MoveworkitemintoBackloag() {
    var ReleaseId = $("#DeleteallReleaseId").val();
    $.ajax({
        url: "/BacklogPlanning/MoveworkitemintoBackloag",
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        data: JSON.stringify({ ReleaseId: ReleaseId }),
        dataType: 'json',
        success: function (data) {
            if (data) {
                toastr.success("Release has been deleted & the work items has been moved to backlog successfully");
            }
            $("#deletereleasemodal").modal('hide');
            $('#DeletereleaseModelbody').empty();
            window.location.href = '/BacklogPlanning/Index';
            return true;
        }
    });

    return false;
}