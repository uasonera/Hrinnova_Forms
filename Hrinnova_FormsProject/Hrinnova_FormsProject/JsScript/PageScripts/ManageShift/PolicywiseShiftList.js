$(document).ready(function () {
    $('.validation-summary-valid ul li').remove();
    $(".EditShiftDetail").unbind("click");

    $(document).on('click', '.EditShiftDetail', function (e) {
        var ShiftId = $(this).attr('data-shiftid');
        var PolicyId = $("#ddlPolicy").val();
        var Isvalidate = ValidateShift(ShiftId, PolicyId)
        if (Isvalidate) {
            SavePolicyWiseShift(ShiftId, PolicyId);
            ClearEditData(ShiftId);
        }

    });
    $(document).on('click', '.EditShift', function () {
        var ShiftId = $(this).attr('data-shiftid');
        var PolicyId = $("#ddlPolicy").val();
        $("#txtEarly_" + ShiftId).prop('disabled', false);
        $("#txtLate_" + ShiftId).prop('disabled', false);
        var Intime = $("#txtIntime_" + ShiftId).prop('disabled', false);
        var ShiftName = $("#txtShiftName_" + ShiftId).prop('disabled', false);
        $("#lbltxtShiftName_" + ShiftId).css('display', 'inline-block');
        $("#lbltxtIntime_" + ShiftId).css('display', 'inline-block');
        $("#lbltxtOuttime_" + ShiftId).css('display', 'inline-block');

        $(this).attr('title', 'Save');
        $("#EditShift_" + ShiftId).css("display", "none");
        $("#EditShiftDetail_" + ShiftId).css("display", "block");
        TimePicker(ShiftId);
        var txtIntimeId = "#txtIntime_" + ShiftId;
        var txtOuttimeId = "#txtOuttime_" + ShiftId;
        AutoChangeofOutTime(txtIntimeId, txtOuttimeId);
    });
    $(".DeleteShift").click(function () {
        var shiftId = $(this).attr('data-shiftId');
        var PolicyId = $("#ddlPolicy").val();
        if (confirm("Do you want to delete this record?")) {
            $.ajax({
                url: "/ShiftManagement/DeletePolicywiseShift",
                type: "POST",
                async: false,
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify({ shiftId: shiftId }),
                dataType: 'json',
                success: function (result) {
                    if (result == 'success') {
                        toastr.remove();
                        LoadPolicywiseShiftGrid(PolicyId);
                        toastr.success("Record Deleted Successfully.");
                    }
                    else if (result == 'fail') {
                        toastr.remove();
                        toastr.warning("Shift is in use.Shift Can not be deleted");
                    }
                    else {
                        toastr.remove();
                        toastr.error("Error occured while deleting Shift");
                    }
                },
                error: function () { }
            });
        }
    });
});
function ValidateShift(ShiftID, PolicyId) {
    $('#errorMessage').html('');
    var errorMessage = "";
    $('#errorMessage').empty();
    var Intime = $('#txtIntime_' + ShiftID).val();
    var Outtime = $('#txtOuttime_' + ShiftID).val();
    var ShiftName = $('#txtShiftName_' + ShiftID).val();
    var statusEdit = true;
    var EarlyLeaving = $("#txtEarly_" + ShiftID).val();
    var LateComing = $("#txtLate_" + ShiftID).val();
    if (IsExemptionApplicable && IsExemptionBasedOnInOut) {

        if (moment(Intime, "HH:mm").add(parseInt(LateComing.split(":")[0]), 'hours').add(parseInt(LateComing.split(":")[1]), 'minutes').isAfter(moment(Outtime, "HH:mm"))) {
            errorMessage += "<li>Intime including Latecoming provision can't exceed outtime</li>";
            statusEdit = false;
        }
        if (moment(Outtime, "HH:mm").subtract(parseInt(EarlyLeaving.split(":")[0]), 'hours').subtract(parseInt(EarlyLeaving.split(":")[1]), 'minutes').isBefore(moment(Intime, "HH:mm"))) {
            errorMessage += "<li>Outtime including EarlyLeaving provision can't exceed intime</li>";
            statusEdit = false;
        }
    }
    if (PolicyId == null || PolicyId == "") {
        errorMessage += "<li>Please Select Policy</li>";
        statusEdit = false;
    }
    if (ShiftName == "") {
        errorMessage += "<li>Please Enter Shift Name</li>";
        statusEdit = false;
    }
    if (Intime == "") {
        errorMessage += "<li>Please Enter In Time</li>";
        statusEdit = false;
    }
    if (Outtime == "") {
        errorMessage += "<li>Please Enter Out Time</li>";
        statusEdit = false;
    }
    var beginningTime = moment(moment(Outtime, 'h:mm').format('H:mm'), 'h:mm');
    var endTime = moment('24:00', 'h:mm');
    if (!beginningTime.isSame(endTime) && !beginningTime.isBefore(endTime)) {
        errorMessage += "<li>Out Time can not after 24:00</li>";
        statusEdit = false;
    }
    if (status == true) {
        $.ajax({
            type: post,
            url: "/ShiftManagement/ValidateShiftPolicy",
            async: false,
            contentType: "application/json;charset=utf-8",
            data: { ShiftId: ShiftID, Intime: Intime.trim(), Outtime: Outtime.trim() },
            success: function (data) {
                if (data == true) {
                    errorMessage += "<li>Shift already exist for same In Time and Out Time<li>";
                    statusEdit = false;
                }
                else {
                    statusEdit = true;
                }
            },
        });
    }
    if (statusEdit == true) {

        $.ajax({
            url: "/ShiftManagement/ValidateShiftNamePolicy",
            async: false,
            contentType: "application/json;charset=utf-8",
            data: { ShiftId: ShiftID, ShiftName: ShiftName.trim() },
            success: function (data) {
                if (data == true) {
                    errorMessage += "<li>Shift Name already exist<li>";
                    statusEdit = false;
                }
                else {
                    statusEdit = true;
                }
            },

        });
    }
    if (statusEdit == false && errorMessage != null) {
        //$('.validation-summary-valid').addClass('alert alert-danger');
        $('#errorMessage').css('display', 'block');
        $('#errorMessage').html("<ul>" + errorMessage + "</ul>");
        $('ul li:empty').remove();
    }
    return statusEdit;
}
function AutoChangeofOutTime(txtIntimeId, txtOuttimeId) {
    $(document).on('change', txtIntimeId, function () {
        var InTime = $(this).val();
        var ConfigurationDailyGrossHR = $("#lblDailyMingrossHR").text().split(':');
        var hour = ConfigurationDailyGrossHR[0];
        var minute = ConfigurationDailyGrossHR[1];
        var AddedHours = moment(InTime, 'h:mm').add('hours', hour).add('minute', minute).format('h:mm A')
        var ConvertOutTime = moment(AddedHours, ["h:mm A"]).format("HH:mm");
        $(txtOuttimeId).val(ConvertOutTime);
    });
}

function TimePicker(id) {
    $('#txtIntime_' + id).timepicker({
        defaultTime: 'current',
        minuteStep: 5,
        showInputs: false,
        disableFocus: true,
        showMeridian: false
    });
    $('#txtOuttime_' + id).timepicker({
        defaultTime: 'current',
        minuteStep: 5,
        maxHours: 24,
        showInputs: false,
        disableFocus: true,
        showMeridian: false
    });
    $('#txtEarly_' + id).timepicker({
        defaultTime: false,
        minuteStep: 5,
        maxHours: 24,
        showInputs: false,
        disableFocus: true,
        showMeridian: false
    });
    $('#txtLate_' + id).timepicker({
        defaultTime: false,
        minuteStep: 5,
        maxHours: 24,
        showInputs: false,
        disableFocus: true,
        showMeridian: false
    });
}
function ClearEditData(ShiftId) {
    var ShiftName = $("#txtShiftName_" + ShiftId).prop('disabled', true);
    var Intime = $("#txtIntime_" + ShiftId).prop('disabled', true);
    var OutTime = $("#txtOuttime_" + ShiftId).prop('disabled', true);
    $("#txtEarly_" + ShiftId).prop('disabled', true);
    $("#txtLate_" + ShiftId).prop('disabled', true);
    $("#EditShift_" + ShiftId).css("display", "block");
    $("#EditShiftDetail_" + ShiftId).css("display", "none");
    $('#errorMessage').empty();
    $('#errorMessage').css("display", "none");
}