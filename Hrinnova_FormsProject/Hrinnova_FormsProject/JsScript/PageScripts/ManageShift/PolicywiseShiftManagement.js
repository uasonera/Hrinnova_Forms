$(document).ready(function () {
   // $('.validation-summary-valid ul li').remove();
    TimePickerForAdd();
    $("#btnSaveShift").unbind("click");
    $('#btnSaveShift').click(function () {
        
        var shiftId = $(this).attr('data-shiftId');
        var PolicyId = $("#ddlPolicy").val();
        //if (PolicyId == "")
        //{
        //    $("#txtAddOuttime").prop('disabled', true);
        //}
        
        if (ValidateAddShift(shiftId, PolicyId)) {
            SavePolicyWiseShift(shiftId, PolicyId);
            TimePickerForAdd();
            return true;
        }
        else {
            return false;
        }
        return false;
    });
    $(document).on('change', "#txtAddIntime", function () {
        var InTime = $(this).val();
        var ConfigurationDailyGrossHR = $("#lblDailyMingrossHR").text().split(':');
        var hour = ConfigurationDailyGrossHR[0];
        var minute = ConfigurationDailyGrossHR[1];
        var AddedHours = moment(InTime, 'h:mm').add('hours', hour).add('minute', minute).format('h:mm A')
        var ConvertOutTime = moment(AddedHours, ["h:mm A"]).format("HH:mm");
        $("#txtAddOuttime").val(ConvertOutTime).prop('disabled', true);
    });
});
function ValidateAddShift(ShiftID, PolicyId) {
     
    $('#errorMessage').html('');
    var errorMessage = "";
    $('#errorMessage').empty();
    var Intime = $('#txtAddIntime').val();
    var Outtime = $('#txtAddOuttime').val();
    var ShiftName = $('#txtShiftName').val();
    
    var EarlyLeaving = $("#txtEarlyLeaving").val();
    var LateComing = $("#txtLateComing").val();

    var status = true;
    if (moment(Intime, "HH:mm").add(parseInt(LateComing.split(":")[0]), 'hours').add(parseInt(LateComing.split(":")[1]), 'minutes').isAfter(moment(Outtime, "HH:mm")))
    {
        errorMessage += "<li>Intime including Latecoming provision can't exceed outtime</li>";
    }
    if (moment(Outtime, "HH:mm").subtract(parseInt(EarlyLeaving.split(":")[0]), 'hours').subtract(parseInt(EarlyLeaving.split(":")[1]), 'minutes').isBefore(moment(Intime, "HH:mm"))) {
        errorMessage += "<li>Outtime including EarlyLeaving provision can't exceed intime</li>";
    }   
    if (PolicyId =="") {
        errorMessage += "<li>Please Select Policy</li>";
        status = false;
    }

    if (ShiftName == "") {
        errorMessage += "<li>Please enter Shift Name</li>";
        status = false;
    }
    if (Intime == "") {
        errorMessage += "<li>Please enter In Time</li>";
        status = false;
    }

    if (Outtime == "") {
        errorMessage += "<li>Please enter Out Time</li>";
        status = false;
    }
    if (status == true) {
        $.ajax({
            url: "/ShiftManagement/ValidateShiftPolicy",
            async: false,
            contentType: "application/json;charset=utf-8",
            data: { ShiftId: ShiftID, Intime: Intime.toString().trim(), Outtime: Outtime.toString().trim() },
            success: function (data) {
                if (data == true) {
                    errorMessage += "<li>Shift already exist for same In Time and Out Time<li>";
                    status = false;
                }
                else {
                    status = true;
                }
            },

        });
    }
    if (status == true) {
        $.ajax({
            url: "/ShiftManagement/ValidateShiftNamePolicy",
            async: false,
            contentType: "application/json;charset=utf-8",
            data: { ShiftId: ShiftID, ShiftName: ShiftName.toString().trim()},
            success: function (data) {
                if (data == true) {
                    errorMessage += "<li>Shift Name already exist<li>";
                    status = false;
                }
                else {
                    status = true;
                }
            },

        });
    }
    if (status == false && errorMessage != null) {
        $('#errorMessage').css('display','block');
        $('#errorMessage').html("<ul>" + errorMessage + "</ul>");
        $('ul li:empty').remove();
    }
    return status;
}

function TimePickerForAdd() {
    $('#txtEarlyLeaving').val('');
    $('#txtLateComing').val('');
    $('#txtAddIntime').timepicker({
        defaultTime: 'current',
        minuteStep: 5,
        showInputs: false,
        disableFocus: true,
        showMeridian: false
    });
    $('#txtAddOuttime').timepicker({
        defaultTime: 'current',
        minuteStep: 5,
        maxHours: 24,
        showInputs: false,
        disableFocus: true,
        showMeridian: false
    });
    $('#txtEarlyLeaving').timepicker({
        defaultTime: false,
        minuteStep: 5,
        maxHours: 24,
        showInputs: false,
        disableFocus: true,
        showMeridian: false
    });
    $('#txtLateComing').timepicker({
        defaultTime: false,
        minuteStep: 5,
        maxHours: 24,
        showInputs: false,
        disableFocus: true,
        showMeridian: false
    });
}

function SavePolicyWiseShift(ShiftId, PolicyId) {
    
    var ShiftId;
    var Intime;
    var Outtime;
    var PolicyId;
    var EarlyLeaving="";
    var LateComing="";
    var ShiftName;
    var form = $('form')[0];
    var formData = new FormData(form);
     
    if (ShiftId == 0) {
        ShiftName = $('#txtShiftName').val();
        Intime = $('#txtAddIntime').val();
        Outtime = $('#txtAddOuttime').val();
        if ($('#txtEarlyLeaving').val()!="")
            EarlyLeaving = parseInt($('#txtEarlyLeaving').val().split(":")[0]) * 60 + parseInt($('#txtEarlyLeaving').val().split(":")[1]);
        if ($('#txtLateComing').val() != "")
        LateComing = parseInt($('#txtLateComing').val().split(":")[0]) * 60 + parseInt($('#txtLateComing').val().split(":")[1]);
        PolicyId = PolicyId;
    }
    else {
        ShiftId = ShiftId;
        ShiftName = $('#txtShiftName_' + ShiftId).val();
        Intime = $("#txtIntime_" + ShiftId).val();
        Outtime = $("#txtOuttime_" + ShiftId).val();
        if ($("#txtEarly_" + ShiftId).val()!="")
            EarlyLeaving = parseInt($("#txtEarly_" + ShiftId).val().split(":")[0]) * 60 + parseInt($("#txtEarly_" + ShiftId).val().split(":")[1]);
        if ($("#txtLate_" + ShiftId).val() != "")
        LateComing = parseInt($("#txtLate_" + ShiftId).val().split(":")[0]) * 60 + parseInt($("#txtLate_" + ShiftId).val().split(":")[1]);
        PolicyId = PolicyId;
    }
    formData.append('PolicyId', PolicyId);
    formData.append('ShiftId', ShiftId);
    formData.append('ShiftName', ShiftName);
    formData.append('Intime', Intime);    
    formData.append('Outtime', Outtime);
    formData.append('EarlyLeaving', EarlyLeaving);
    formData.append('LateComing', LateComing);
     
    $.ajax({
        url: SaveShiftPolicyUrl,
        type: "POST",
        async: false,
        contentType: "application/json;charset=utf-8",
        data: formData,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (result) {
            if (result == 'Success') {
                var message;
                if (ShiftId == 0) {
                    message = 'Record Inserted successfully';
                    toastr.remove();
                    toastr.success(message);
                    LoadPolicywiseShiftGrid(PolicyId);
                    $("#ddlPolicy").trigger("change");
                    ResetValues();
                }
                else {
                    message = 'Record Updated successfully';
                    toastr.remove();
                    toastr.success(message);
                }
            }
            else if (result == 'InValidSession') {
                window.location = window.location.reload();
                return false;
            }
            else {
                toastr.remove();
                toastr.error('Error occured while saving the Shift');
                ResetValues();
            }

        },
        error: function () { }

    });
    return false;
}
function LoadPolicywiseShiftGrid(PolicyId) {

    $.ajax({
        url: "/ShiftManagement/GetAllPolicywiseShiftList",
        async: false,
        dataType: "html",
        contentType: "application/json;charset=utf-8",
        data: { PolicyId: PolicyId },
        success: function (data) {
            $('#gridData').html(data);
        }
    });
}
function ResetValues() {
    $('#txtAddIntime').val('');
    $('#txtShiftName').val('');
    $('#errorMessage').empty();
    $('#errorMessage').css("display", "none");
}

