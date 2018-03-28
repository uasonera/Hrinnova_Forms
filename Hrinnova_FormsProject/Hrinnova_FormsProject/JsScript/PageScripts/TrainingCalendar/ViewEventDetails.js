$(document).ready(function () {
    custome_scroll_init();
    SetVisibilityForFeedbackButton();
    SetVisibilityForAddNominationButton();
    setVisibilityForWaiverButton();
    $("#bbit-cs-nomination").click(function () {
        addNomination();
    });
    $("#bbit-cs-attendanceLink").click(function () {
        editAttendanceDetail();
    });
    $("#bbit-cs-delete").click(function () {
        deleteEventDetail();
    });
    $("#bbit-cs-delete-all").click(function () {
        deleteEvent();
    });
    $("#bbit-cs-feedbacklink").click(function () {
        giveFeedback();
    });
    $("#TraineeFeedback").click(function () {
        giveFeedbackForTrainee();
    });
    $("#bbit-cs-waiverlink").click(function () {
        giveWaiver();
    });
    $("#bbit-cs-addcalendarlink").click(function () {
        addCalendar();
    });
    $("#bbit-cs-addnominationlink").click(function () {
        nomination();
    });
    $("#bbit-cs-MarkAttended").click(function () {
        markAttended(this);
    });
    $("#cancelTrainingEntire").click(function () {
        cancelEvent();
    });
    $("#updateTrainingSingle").click(function () {
        var TrainingId = $("#TrainingId").val();
        var TrainingDetailId = $("#TrainingDetailId").val();
        var IsSingle = true;
        var IsEntire = false;
        window.location.href = "/AddEditEvent/Index?TrainingId=" + TrainingId + "&TrainingDetailId=" + TrainingDetailId + "&IsForSingleInstance=" + IsSingle + "&IsForEntire=" + IsEntire;
    });

    $("#updateTrainingEntire").click(function () {
        var TrainingId = $("#TrainingId").val();
        var TrainingDetailId = $("#TrainingDetailId").val();
        var IsSingle = false;
        var IsEntire = true;
        window.location.href = "/AddEditEvent/Index?TrainingId=" + TrainingId + "&TrainingDetailId=" + TrainingDetailId + "&IsForSingleInstance=" + IsSingle + "&IsForEntire=" + IsEntire;
    });
   
    
});
function SetVisibilityForAddNominationButton() {
    var trainingid = $("#TrainingId").val();
    $.ajax({
        url: '/TrainingNomination/GetNominationTrainingNames?TrainingId=' + trainingid,
        type: 'post',
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (result) {
            if (result.length == 0) {
                if ($("#bbit-cs-nomination").length > 0) {
                    $("#bbit-cs-nomination").remove();
                }
            }
        },
        error: function () { }
    });
}
function SetVisibilityForFeedbackButton() {
    var TrainingDetailId = $("#TrainingDetailId").val();
    var trainingid = $("#TrainingId").val();
    var doesButtonExists = false;
    $.ajax({
        url: '/TrainingFeedback/CheckAttendance',
        type: 'post',
        data: JSON.stringify({ TrainingDetailId: TrainingDetailId }),
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (result) {
            if (result != "1") {
                if ($("#bbit-cs-feedbacklink").length > 0) {
                    $("#bbit-cs-feedbacklink").remove();
                }
            }
            else {
                doesButtonExists = true;
            }
        },
        error: function () { }
    });

    $.ajax({
        url: '/TrainingFeedback/CheckTraineesForFeedback',
        type: 'post',
        data: JSON.stringify({ TrainingID: trainingid }),
        contentType: 'application/json; charset=utf-8',
        async:false,
        success: function (result) {
            if (result != "True") {
                if ($("#TraineeFeedback").length > 0) {
                    $("#TraineeFeedback").remove();
                }
            }
            else {
                doesButtonExists = true;
            }
        },
        error: function () { }
    });
    if (!doesButtonExists) {
        if ($("#feedbackButtons").length > 0) {
            $("#feedbackButtons").remove();
        }
    }
}
function setVisibilityForWaiverButton() {
    var TrainingDetailId = $("#TrainingDetailId").val();
    $.ajax({
        url: '/TrainingFeedback/CheckAttendance',
        type: 'post',
        data: JSON.stringify({ TrainingDetailId: TrainingDetailId }),
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            if (result != "2") {
                if ($("#bbit-cs-waiverlink").length > 0) {
                    $("#bbit-cs-waiverlink").remove();
                }
            }
        },
        error: function () { }
    });
}
function addNomination() {
    window.location.href = "/TrainingNomination/NominationEmployeeList?TrainingId=" + $("#TrainingId").val();
}
function editAttendanceDetail() {
    var id = $("#TrainingId").val();
    var TrainingDetailId = $("#TrainingDetailId").val();
    window.location.href = '/TrainingAttendance/Index?eventId=' + id + '&eventDetailId=' + TrainingDetailId;
}
function deleteEventDetail() {
    if (confirm("Are you sure you want to delete this event?")) {
        var detailId = $("#TrainingDetailId").val();
        $.ajax({
            type: 'POST',
            url: "/TrainingCalendar/DeleteEvent",
            async: false,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ eventDetailId: detailId }),
            dataType: "json",
            success: function (data) {
                toastr.remove();
                toastr.success("Record Deleted Successfully");
                location.reload();
            },
            error: function (xhr, status, error) {
                toastr.remove();
                toastr.error("Error Occured While Deleting Event Detail");
            }
        });
    }
}
function deleteEvent() {
    if (confirm("Are you sure you want to delete all the events?")) {
        var detailId = $("#TrainingDetailId").val();
        var trainingId = $("#TrainingId").val();
        $.ajax({
            type: 'POST',
            url: "/TrainingCalendar/DeleteAllEvent",
            async: false,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ eventId: trainingId, eventDetailId: detailId }),
            dataType: "json",
            success: function (data) {
                toastr.remove();
                toastr.success("Event Cancelled Successfully");
                location.reload();
            },
            error: function (data) {
                toastr.remove();
                toastr.error("Error Occured While Canceling Event Detail");
            }
        });
    }
}
function giveFeedback() {
    var id = $("#TrainingId").val();
    window.location.href = "/TrainingFeedback/GetTrainingDetails?TrainingId=" + id;
}
function giveWaiver() {
    var id = $("#TrainingId").val();
    window.location.href = "/TrainingWaiver/GetTrainingWaiverDetails?TrainingId=" + id;
}
function addCalendar() {
    var id = $("#TrainingId").val();
    window.location.href = "/TrainingDetail/AddToCalendarOutLook?TrainingId=" + id;
}
function nomination() {
    var trainingid = $("#TrainingId").val();
    var TrainingDetailId = $("#TrainingDetailId").val();
    var dataSenttoEmp = false;
    $.ajax({
        url: '/TrainingNomination/IsNominatedForPM',
        type: 'post',
        data: JSON.stringify({ TrainingDetailId: TrainingDetailId }),
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (result) {
            if (result == true) {
                dataSenttoEmp = "True";
            }
            else if (result == false) {
                dataSenttoEmp = "False";
            }
            else {
                dataSenttoEmp = "Error";
            }
        },
        error: function () { }
    });
    if (dataSenttoEmp == "True") {

        $.ajax({
            url: '/TrainingNomination/AddNominationInformation',
            type: 'post',
            data: JSON.stringify({ TrainingId: trainingid }),
            contentType: 'application/json; charset=utf-8',
            async: false,
            success: function (result) {
                $('#NominationModelBody').html(result);
                $('#NominationModel').modal("show");
                $('#ViewEventModel').on('hidden.bs.modal', function () {
                    if ($('.modal:visible').length) {
                        $('body').addClass('modal-open');
                    }
                });

            },
            error: function () { }
        });
        $("#ViewEventModel").modal("hide");
    }
    else if (dataSenttoEmp == "False") {

        var NominationId = 0;
        if (ValidateEmployeeNominationEntry(trainingid, NominationId)) {
            $.ajax({
                url: '/TrainingNomination/NominationSendEmailByEmployee',
                type: 'post',
                async: false,
                data: JSON.stringify({ TrainingId: trainingid, NominationId: NominationId }),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    if (data == "Success") {
                        toastr.remove();
                        toastr.success("Successfully send nomination email");
                    }
                    else {
                        toastr.remove();
                        toastr.warning("Error while Sending Email");
                    }
                },
                error: function () { }
            });
        }
        else {
            return false;
        }
    }
}
function ValidateEmployeeNominationEntry(TrainingId, NominationId) {
    var status = true;
    if (status == true) {
        $.ajax({
            url: "/TrainingNomination/ValidateEmployeeNominationEntry",
            async: false,
            contentType: "application/json;charset=utf-8",
            data: { TrainingId: TrainingId, NominationId: NominationId },
            success: function (data) {
                if (data == true) {
                    toastr.remove();
                    toastr.error("You are already Nominated for this Training.");
                    status = false;
                }
                else {
                    status = true;
                }
            },

        });
    }
    return status;
}
function markAttended(obj) {
    var TrainingDetailId = $("#TrainingDetailId").val();
    $.ajax({
        url: '/TrainingCalendar/MarkAttended',
        type: 'post',
        data: JSON.stringify({ eventDetailId: TrainingDetailId }),
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (result) {
            if (result == true) {
                toastr.success("Attendance marked successfully");
                location.reload();
            }
            else {
                toastr.success("Error occured while marking attendance");
            }
        },
        error: function () { }
    });
}
function cancelEvent() {
    var trainingid = $("#TrainingId").val();
    $.ajax({
        url: '/TrainingCalendar/CancelEvent',
        type: 'post',
        data: JSON.stringify({ eventId: trainingid }),
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (result) {
            if (result == true) {
                toastr.success("Event cancelled successfully");
                location.reload();
            }
            else {
                toastr.success("Error occured while canceling event");
            }
        },
        error: function () { }
    });
}
function giveFeedbackForTrainee() {
    var id = $("#TrainingId").val();
    window.location.href = "/TrainingFeedback/GetTrainingDetailsForTrainee?TrainingId=" + id;
}