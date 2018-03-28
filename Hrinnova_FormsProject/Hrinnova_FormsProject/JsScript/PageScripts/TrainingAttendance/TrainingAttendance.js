$(document).ready(function () {
    $('#prevDate').click(function () {
        if (!$(this).hasClass("fa-disable")) {
            var currentElement = (".currentDate");

            var prevIndex = parseInt($(".currentDate").data("index")) - 1;

            var lastIndex = $(this).attr("data-lastIndex");

            var currentEventDetail = $(".currentDate").attr("data-eventDetailId");
            $(".currentDate").removeClass("currentDate").hide();

            $("[data-index='" + prevIndex + "']").addClass("currentDate").show();

            var eventDetailToLoad = $(".currentDate").attr("data-eventDetailId");
            var eventId = $(".currentDate").attr("data-eventId");

            if (prevIndex == 1) {
                $(this).addClass("fa-disable");
                $(this).closest('li').removeClass("cursor-pointer");
            }
            if (lastIndex > 1) {
                $('#nextDate').removeClass("fa-disable");
                $('#nextDate').closest('li').addClass("cursor-pointer");
            }

            LoadTrainersAndTrainees(eventId, eventDetailToLoad, currentEventDetail);
        }
    });
    $('#nextDate').click(function () {

        if (!$(this).hasClass("fa-disable")) {
            var nextIndex = parseInt($(".currentDate").data("index")) + 1;

            var lastIndex = $(this).attr("data-lastIndex");

            var currentEventDetail = $(".currentDate").attr("data-eventDetailId");
            $(".currentDate").removeClass("currentDate").hide();

            $("[data-index='" + nextIndex + "']").addClass("currentDate").show();

            var eventDetailToLoad = $(".currentDate").attr("data-eventDetailId");
            var eventId = $(".currentDate").attr("data-eventId");

            if (nextIndex == lastIndex) {
                $(this).addClass("fa-disable");
                $(this).closest('li').removeClass("cursor-pointer");
            }
            if (lastIndex > 1) {
                $('#prevDate').removeClass("fa-disable");
                $('#prevDate').closest('li').addClass("cursor-pointer");
            }
            LoadTrainersAndTrainees(eventId, eventDetailToLoad, currentEventDetail);
        }
    });
    $('#saveAttendance').click(function () {
        var eventId = $(this).attr("data-eventId");
        var eventDetailId = $(".currentDate").attr("data-eventDetailId");
        SaveAttendance(eventId, eventDetailId);
        $(this).prop('disabled', true);
    });
    $('#ConfirmAndLock').click(function () {
        var eventId = $(this).attr("data-eventId");
        var eventDetailId = $(".currentDate").attr("data-eventDetailId");
        ConfirmAndLockAttendance(eventId, eventDetailId)
    });
    $('#backToCalendar').click(function () {
        window.location.href = "/TrainingCalendar/Index";
    });
    $(document).on("change", "#ddlDepartment", function () {
        var DepartmentId = $("#ddlDepartment").val();
        var CompanyId = $("#ddlCompany").val();
        var DesignationId = $("#ddlDesignation").val();
        if (DepartmentId == "") {
            DepartmentId = 0;
        }
        if (CompanyId == "") {
            CompanyId = 0;
        }
        if (DesignationId == "") {
            DesignationId = 0;
        }
        LoadTrainerEmployeeListForDeptFilter(DepartmentId, CompanyId, DesignationId);
    });
    $(document).on("change", "#ddlCompany", function () {
        var DepartmentId = $("#ddlDepartment").val();
        var CompanyId = $("#ddlCompany").val();
        var DesignationId = $("#ddlDesignation").val();
        if (DepartmentId == "") {
            DepartmentId = 0;
        }
        if (CompanyId == "") {
            CompanyId = 0;
        }
        if (DesignationId == "") {
            DesignationId = 0;
        }
        LoadTrainerEmployeeListForDeptFilter(DepartmentId, CompanyId, DesignationId);
    });
    $(document).on("change", "#ddlDesignation", function () {
        var DepartmentId = $("#ddlDepartment").val();
        var CompanyId = $("#ddlCompany").val();
        var DesignationId = $("#ddlDesignation").val();
        if (DepartmentId == "") {
            DepartmentId = 0;
        }
        if (CompanyId == "") {
            CompanyId = 0;
        }
        if (DesignationId == "") {
            DesignationId = 0;
        }
        LoadTrainerEmployeeListForDeptFilter(DepartmentId, CompanyId, DesignationId);
    });
    $(document).on("change", "#ddlDepartment_Trainee", function () {
        var DepartmentId = $("#ddlDepartment_Trainee").val();
        var CompanyId = $("#ddlCompany_Trainee").val();
        var DesignationId = $("#ddlDesignation_Trainee").val();
        if (DepartmentId == "") {
            DepartmentId = 0;
        }
        if (CompanyId == "") {
            CompanyId = 0;
        }
        if (DesignationId == "") {
            DesignationId = 0;
        }
        LoadTraineeEmployeeListForDeptFilter(DepartmentId, CompanyId, DesignationId);
    });
    $(document).on("change", "#ddlCompany_Trainee", function () {
        var DepartmentId = $("#ddlDepartment_Trainee").val();
        var CompanyId = $("#ddlCompany_Trainee").val();
        var DesignationId = $("#ddlDesignation_Trainee").val();
        if (DepartmentId == "") {
            DepartmentId = 0;
        }
        if (CompanyId == "") {
            CompanyId = 0;
        }
        if (DesignationId == "") {
            DesignationId = 0;
        }
        LoadTraineeEmployeeListForDeptFilter(DepartmentId, CompanyId, DesignationId);
    });
    $(document).on("change", "#ddlDesignation_Trainee", function () {
        var DepartmentId = $("#ddlDepartment_Trainee").val();
        var CompanyId = $("#ddlCompany_Trainee").val();
        var DesignationId = $("#ddlDesignation_Trainee").val();
        if (DepartmentId == "") {
            DepartmentId = 0;
        }
        if (CompanyId == "") {
            CompanyId = 0;
        }
        if (DesignationId == "") {
            DesignationId = 0;
        }
        LoadTraineeEmployeeListForDeptFilter(DepartmentId, CompanyId, DesignationId);
    });
    $(document).on('keyup', '#searchTrainers', function () {
        var searchText = $(this).val();

        if (searchText != '') {
            $('.divTrainerName').each(function () {
                var trainerName = $(this).attr("data-trainerName");
                if (trainerName.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
                    $(this).show();
                }
                else {
                    $(this).hide();
                }
            });
        }
        else {
            $('.divTrainerName').each(function () {
                $(this).show();
            });
        }
    });
    $(document).on('keyup', '#searchTrainees', function () {
        var searchText = $(this).val();

        if (searchText != '') {
            $('.divTraineeName').each(function () {
                var trainerName = $(this).attr("data-traineeName");
                if (trainerName.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
                    $(this).show();
                }
                else {
                    $(this).hide();
                }
            });
        }
        else {
            $('.divTraineeName').each(function () {
                $(this).show();
            });
        }
    });
    $(document).on('change', '#selectAllTrainers', function () {
        $('[id^="Trainer_"]').prop('checked', $(this).prop("checked"));
    });
    $(document).on('change', '#selectAllTrainees', function () {
        $('[id^="Trainee_"]').prop('checked', $(this).prop("checked"));
    });
    $(document).on('click', '#btnAddTrainer', function () {
        var eventId = $(this).attr("data-eventId");
        var eventDetailId = $(this).attr("data-eventDetailId");
        $.ajax({
            url: "/TrainingAttendance/AddTrainer",
            data: { eventId: eventId, eventDetailId: eventDetailId },
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            success: function (result) {
                $('#add-trainer').modal();
                $('#addTrainerBody').html(result);
                multiselect_chk();
                //chosen_init();
            }
        });
    });
    $(document).on('click', '#btnAddTrainee', function () {
        var eventId = $(this).attr("data-eventId");
        var eventDetailId = $(this).attr("data-eventDetailId");
        $.ajax({
            url: "/TrainingAttendance/AddTrainee",
            data: { eventId: eventId, eventDetailId: eventDetailId },
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            success: function (result) {
                $('#add-trainee').modal();
                $('#addTraineeBody').html(result);
                multiselect_chk();
                //chosen_init();
            }
        });
    });
    $(document).on('click', '#addInternalTrainer', function () {
        InsertTrainer(this, true);
    });
    $(document).on('click', '#addExternalTrainer', function () {
        InsertTrainer(this, false);
    });
    $(document).on('click', '#addNewAttendee', function () {
        InsertTrainee(this);
    });
});
function LoadTrainersAndTrainees(eventId, eventDetailToLoad, currentEventDetail) {

    var attendanceDetailsObj = new Object();

    var traineeids = '';
    var trainerids = '';

    $('[id^="Trainer_"]').each(function () {
        if ($(this).is(":checked")) {
            trainerids += $(this).attr('data-trainerId') + ',';
        }
    });
    $('[id^="Trainee_"]').each(function () {
        if ($(this).is(":checked")) {
            traineeids += $(this).attr('data-traineeId') + ',';
        }
    });

    if (traineeids != '') {
        traineeids = traineeids.substring(0, traineeids.length - 1);
    }

    if (trainerids != '') {
        trainerids = trainerids.substring(0, trainerids.length - 1);
    }

    attendanceDetailsObj.TrainerId = trainerids;
    attendanceDetailsObj.TraineeId = traineeids;
    attendanceDetailsObj.TrainingDetailId = currentEventDetail;
    attendanceDetailsObj.TrainingId = eventId;

    $.ajax({
        type: "POST",
        url: "/TrainingAttendance/TrainersAndTrainees",
        //async: false,
        data: JSON.stringify({ eventId: eventId, eventDetailId: eventDetailToLoad, obj: attendanceDetailsObj }),
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            ShowProgress();
        },
        success: function (result) {
            HideProgress();
            $('#divTrainersAndTrainees').html('').html(result);
            setupCheckboxes();
            chosen_init();
        }
    });
}
function HideProgress() {
    $('.loader-wrapper').css('display', 'none');
}
function ShowProgress() {

    if ($('.loader-wrapper').css('display') == "none") {
        $(".loader-wrapper").show();
    }
}
function SaveAttendance(eventId, eventDetailId) {
    var traineeids = '';
    var trainerids = '';

    $('[id^="Trainer_"]').each(function () {
        if ($(this).is(":checked")) {
            trainerids += $(this).attr('data-trainerId') + ',';
        }
    });
    $('[id^="Trainee_"]').each(function () {
        if ($(this).is(":checked")) {
            traineeids += $(this).attr('data-traineeId') + ',';
        }
    });

    if (traineeids != '') {
        traineeids = traineeids.substring(0, traineeids.length - 1);
    }

    if (trainerids != '') {
        trainerids = trainerids.substring(0, trainerids.length - 1);
    }

    $.ajax({
        url: '/TrainingAttendance/SaveTrainingDetail',
        type: 'POST',
        data: { TrainingId: eventId, TrainingDetailId: eventDetailId, TraineeId: traineeids, TrainerId: trainerids },
        success: function (data) {
            //alert(data.result);
            toastr.remove();
            toastr.success(data.result);
            $('#saveAttendance').remove();
            setTimeout(function () { window.location.reload() }, 2000);
        },
        error: function (req, status, error) {
            alert("R: " + req + " S: " + status + " E: " + error);
        }
    });
}
function ConfirmAndLockAttendance(eventId, eventDetailId) {
    var traineeids = '';
    var trainerids = '';

    $('[id^="Trainer_"]').each(function () {
        if ($(this).is(":checked")) {
            trainerids += $(this).attr('data-trainerId') + ',';
        }
    });
    $('[id^="Trainee_"]').each(function () {
        if ($(this).is(":checked")) {
            traineeids += $(this).attr('data-traineeId') + ',';
        }
    });

    if (traineeids != '') {
        traineeids = traineeids.substring(0, traineeids.length - 1);
    }

    if (trainerids != '') {
        trainerids = trainerids.substring(0, trainerids.length - 1);
    }

    $.ajax({
        url: '/TrainingAttendance/ConfirmAndLockAttendance',
        type: 'POST',
        data: { TrainingId: eventId, TrainingDetailId: eventDetailId, TraineeId: traineeids, TrainerId: trainerids },
        success: function (data) {
            //alert(data.result);
            toastr.remove();
            toastr.success(data.result);
            location.reload();
        },
        error: function (req, status, error) {
            alert("R: " + req + " S: " + status + " E: " + error);
        }
    });
}
function LoadTrainerEmployeeListForDeptFilter(DepartmentId, CompanyId, RoleId) {
    if (DepartmentId == 0 && CompanyId == 0 && RoleId == 0) {
        $("#ddlTrainer option").css("display", "block").removeAttr('disabled');
        $(".optTrainer").css("display", "block");
    }
    else {

        $("#ddlTrainer option").css("display", "block").removeAttr('disabled');
        $(".optTrainer").css("display", "block");

        if (CompanyId != 0) {

            $("#ddlTrainer option.Company_" + CompanyId + ":visible").css("display", "block").removeAttr('disabled');

            $('.optTrainer').not(".Company_" + CompanyId).css("display", "none");
            $("#ddlTrainer option").not(".Company_" + CompanyId).css("display", "none");
        }
        if (DepartmentId != 0) {

            $("#ddlTrainer option.Department_" + DepartmentId + ":visible").css("display", "block").removeAttr('disabled');

            $(".optTrainer").not(".Department_" + DepartmentId).css("display", "none");
            $("#ddlTrainer option").not(".Department_" + DepartmentId).css("display", "none");
        }
        if (RoleId != 0) {

            $("#ddlTrainer option.Designation_" + RoleId + ":visible").css("display", "block").removeAttr('disabled');

            $(".optTrainer").not(".Designation_" + RoleId).css("display", "none");
            $("#ddlTrainer option").not(".Designation_" + RoleId).css("display", "none");
        }
    }
    //$('#ddlTrainer').trigger("chosen:updated");
    $('#ddlTrainer').multiselect('refresh');
}
function LoadTraineeEmployeeListForDeptFilter(DepartmentId, CompanyId, RoleId) {
    if (DepartmentId == 0 && CompanyId == 0 && RoleId == 0) {
        $("#ddlTrainee option").show();
        //$("#ddlTrainee option").css("display", "block").removeAttr('disabled');
        $(".optTrainee").css("display", "block");
    }
    else {
        $("#ddlTrainee option").show();
        //$("#ddlTrainee option").css("display", "block").removeAttr('disabled');
        $(".optTrainee").css("display", "block");

        if (CompanyId != 0) {
            //$("#ddlTrainee option.Company_Trainee_" + CompanyId + ":visible").show();
            //$("#ddlTrainee option").not(".Company_Trainee_" + CompanyId).hide();

            $("#ddlTrainee option.Company_Trainee_" + CompanyId + ":visible").css("display", "block").removeAttr('disabled');

            $('.optTrainee').not(".Company_Trainee_" + CompanyId).css("display", "none");
            $("#ddlTrainee option").not(".Company_Trainee_" + CompanyId).css("display", "none");
        }
        if (DepartmentId != 0) {
            //$("#ddlTrainee option.Department_Trainee_" + DepartmentId + ":visible").show();
            //$("#ddlTrainee option").not(".Department_Trainee_" + DepartmentId).hide();

            $("#ddlTrainee option.Department_Trainee_" + DepartmentId + ":visible").css("display", "block").removeAttr('disabled');

            $(".optTrainee").not(".Department_Trainee_" + DepartmentId).css("display", "none");
            $("#ddlTrainee option").not(".Department_Trainee_" + DepartmentId).css("display", "none");
        }
        if (RoleId != 0) {
            //$("#ddlTrainee option.Designation_Trainee_" + RoleId + ":visible").show();
            //$("#ddlTrainee option").not(".Designation_Trainee_" + RoleId).hide();

            $("#ddlTrainee option.Designation_Trainee_" + RoleId + ":visible").css("display", "block").removeAttr('disabled');

            $(".optTrainee").not(".Designation_Trainee_" + RoleId).css("display", "none");
            $("#ddlTrainee option").not(".Designation_Trainee_" + RoleId).css("display", "none");
        }
    }
    //$('#ddlTrainee').trigger("chosen:updated");
    $('#ddlTrainee').multiselect('refresh');
}
function InsertTrainer(obj, isInternalTrainer) {
    var trainers = $("#ddlTrainer").val();
    var eventId = $(obj).attr("data-eventId");
    var eventDetailId = $(obj).attr("data-eventDetailId");

    jQuery.ajaxSettings.traditional = true
    if (trainers == null) {
        toastr.error("Please select trainer");
    }
    else {
        $.ajax({
            url: "/TrainingAttendance/InsertTrainer",
            data: { eventId: eventId, eventDetailId: eventDetailId, trainerIds: trainers, isInternalTrainer: isInternalTrainer },
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.length > 0) {
                    for (var i = 0, l = data.length; i < l; i++) {
                        name = data[i].Text;
                        id = data[i].Value;
                        AddTrainerCheckBox(id, name);
                    }
                    setupCheckboxes();
                    $('#add-trainer').modal('toggle');
                    toastr.success("Trainer(s) added successfully");
                }
                else {
                    toastr.error("Error occured while adding trainer(s)");
                }
            }
        });
    }
}
function InsertTrainee(obj) {
    var trainees = $("#ddlTrainee").val();
    var eventId = $(obj).attr("data-eventId");
    var eventDetailId = $(obj).attr("data-eventDetailId");

    if (trainees == null) {
        toastr.error("Please select trainee");
    }
    else {
        jQuery.ajaxSettings.traditional = true

        $.ajax({
            url: "/TrainingAttendance/InsertTrainee",
            data: { eventId: eventId, eventDetailId: eventDetailId, traineeIds: trainees },
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.length > 0) {
                    for (var i = 0, l = data.length; i < l; i++) {
                        name = data[i].Text;
                        id = data[i].Value;
                        AddTraineeCheckBox(id, name);
                    }
                    setupCheckboxes();
                    $('#add-trainees').modal('toggle');
                    toastr.success("Trainee(s) added successfully");
                }
                else {
                    toastr.error("Error occured while adding trainee(s)");
                }
            }
        });
    }
}
function AddTrainerCheckBox(id, name) {
    var html = '<div class="col-sm-4 divTrainerName" data-trainerName=' + name + '>';
    html += '<ul>'
    html += '<li class="col-sm-12">';
    html += '<div class="checkbox checkbox-primary">';
    html += '<input Text="' + name + '" id="Trainer_' + id + '" type="checkbox" class="styled" aria-label="..." checked data-trainerId="' + id + '">';
    html += '</div>';
    html += '</li></ul></div>';
    $('#allTrainers').append(html);
}
function AddTraineeCheckBox(id, name) {
    var html = '<div class="col-sm-4 divTraineeName" data-traineeName=' + name + '>';
    html += '<ul>'
    html += '<li class="col-sm-12">';
    html += '<div class="checkbox checkbox-primary">';
    html += '<input Text="' + name + '" id="Trainee_' + id + '" type="checkbox" class="styled" aria-label="..." checked data-traineeId="' + id + '">';
    html += '</div>';
    html += '</li></ul></div>';
    $('#allTrainees').append(html);
}
