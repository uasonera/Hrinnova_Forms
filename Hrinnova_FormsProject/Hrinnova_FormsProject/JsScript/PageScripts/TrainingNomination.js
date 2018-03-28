var PageSize = 10;
var Page = 1;

$(document).ready(function () {
    var TrainingName = $("#TrainingName").val();
    $("#txtTrainingSearch").val(TrainingName);
    BindTrainingNominationNameAutocomplete();
    BindTrainingNominatedByAutocomplete();
    $(document).on('click',"#selectall",function () {
        $('.classNomiEmpList').prop('checked', this.checked);
    });
    $(document).on('click',".classNomiEmpList",function () {
        if ($(".classNomiEmpList").length == $(".classNomiEmpList:checked").length) {
            $("#selectall").prop("checked", "checked");
        } else {
            $("#selectall").prop("checked", false);
        }

    });
    $('#btnReset').click(function () {
        $('#txtTrainingSearch').val('');
        $("#txtNominatedBy").val('');
        $('#txtTrainingSearchId').val('');
        LoadGridDataforNomination(null, true, $("#txtNominatedBy").val(), "", TrainingName.trim(),"");
        $('#txtTrainingSearch').val(TrainingName);
    });
    $(document).on('click', '#btnSearch', function () {
        var TrainingId = $('#txtTrainingSearchId').val();
        var TrainingName = $("#txtTrainingSearch").val();
        var NominatedById = $("#txtNominatedById").val()
        LoadGridDataforNomination(null, true, $("#txtNominatedBy").val(), TrainingId, TrainingName, NominatedById);
    });
    $("#txtTrainingSearch").on('input', function () {
        $('#txtTrainingSearchId').val('');

    });
    $("#txtNominatedBy").on('input', function () {
        $('#txtNominatedById').val('');
    });
    $('#btnBackToCalendarLink').click(function () {
        location.href = "http://" + location.host + "/trainingcalendar/index";

    });
    $(document).on('click', '#btnSaveTraining', function () {
        var NominationIds = [];
        var NominationEmpIds = [];
        $(".classNomiEmpList").each(function () {
            if ($(this).is(":checked") == true && $(this).is(":disabled") == false) {
                NominationIds.push($(this).val());
            }
        });
        $(".classNomiEmpList").each(function () {
            if ($(this).is(":checked") == true && $(this).is(":disabled") == false) {
                NominationEmpIds.push($(this).attr('data-NominatedEmpId'));
            }
        });
        if (CheckAvailabilityForEmployee(NominationIds, NominationEmpIds)) {
            $.ajax({

                type: 'POST',

                url: "/TrainingNomination/SaveNominatedTrainingDetails?&NominationIds=" + NominationIds,

                async: false,

                contentType: 'application/json; charset=utf-8',

                //data: JSON.stringify({ Employees: emps, TrainingId: TrainingId }),

                dataType: "json",

                success: function (data) {
                    if (data == "Success") {
                        var TrainingId = $('#txtTrainingSearchId').val();
                        toastr.remove();
                        toastr.success("Nominated Trainee has successfully added into Training.");
                        LoadGridDataforNomination(null, true, $("#txtNominatedBy").val(), TrainingId, TrainingName,"");
                    }
                    else if (data == "InValidSession") {
                        window.location = LoginPageUrl;
                        return false;
                    }
                    else {
                        toastr.remove();
                        toastr.error("Error occured while update recored.");
                    }
                }
            });
        }
    });

});
function BindTrainingNominationNameAutocomplete() {
    var trainingNominationName = [];
    var TrainingId = "";
    $.ajax({
        url: '/TrainingNomination/GetNominationTrainingNames',
        data: JSON.stringify({ TrainingId: TrainingId }),
        async: false,
        success: function (data) {

            for (var i = 0; i < data.length; i++) {

                var lstTraining = { "label": data[i].TrainingName.trim(), "value": data[i].TrainingName.trim(), "id": data[i].TrainingId };
                trainingNominationName.push(lstTraining);
            }
        }
    });

    $("#txtTrainingSearch").autocomplete({
        source: trainingNominationName,
        autoFocus: true,
        select: function (event, ui) {
            $("#txtTrainingSearch").val(ui.item.label);
        },
        change: function (event, ui) {
            $("#txtTrainingSearchId").val(ui.item.id);
        }
    });
}
function LoadGridDataforNomination(sortParameter, currentDirection, NominatedBy, TrainingId, TrainingName, NominatedById) {
    $.ajax({
        url: "/TrainingNomination/GetAllTrainingNominationList",
        async: false,
        dataType: "html",
        contentType: "application/json;charset=utf-8",
        data: { page: Page, sortExpression: sortParameter, sortDirection: currentDirection, NominatedBy: NominatedBy, TrainingId: TrainingId, TrainingName: TrainingName, NominatedById: NominatedById },
        success: function (data) {
            $('#gridView').html(data);
        }
    });
}
function CheckAvailabilityForEmployee(NominationIds, NominationEmpIds) {
    var status = true;
    if (NominationIds.length != 0 && NominationEmpIds.length != 0) {
        if (status == true) {
            $.ajax({
                url: "/TrainingNomination/CheckAvailabilityForEmployee?&NominationIds=" + NominationIds + "&NominationEmpIds=" + NominationEmpIds,
                async: false,
                contentType: "application/json;charset=utf-8",
                //data: { NominationIds: NominationIds },
                success: function (data) {
                    if (data != "" && data != "Error") {
                        toastr.remove();
                        toastr.error(data);
                        status = false;
                    }
                    else {
                        status = true;
                    }
                },

            });
        }
    }
    else {
        toastr.remove();
        toastr.error("Please select any nominee");
        status = false;
    }
    return status;
}
function BindTrainingNominatedByAutocomplete() {
    var trainingNominatedbys = [];
    var TrainingId = "";
    $.ajax({
        url: '/TrainingNomination/GetTrainingNominatedBy?TrainingId=' + TrainingId,
       // data: JSON.stringify({ TrainingId: TrainingId }),
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {

                var lstNominated = { "label": data[i].EmpName.trim(), "value": data[i].EmpName.trim(), "id": data[i].EmpId };
                trainingNominatedbys.push(lstNominated);
            }
        }
    });

    $("#txtNominatedBy").autocomplete({
        source: trainingNominatedbys,
        autoFocus: true,
        select: function (event, ui) {
            $("#txtNominatedBy").val(ui.item.label);
        },
        change: function (event, ui) {
            $("#txtNominatedById").val(ui.item.id);
        }
    });
}

