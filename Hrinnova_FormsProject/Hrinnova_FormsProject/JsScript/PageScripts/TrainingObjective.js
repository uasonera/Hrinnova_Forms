var PageSize = 10;
var Page = 1;

$(document).ready(function () {

    $("#txtImparted").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    $('#txtEffectiveness').keyup(function () {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
    $('#txtAttendance').keyup(function () {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });

    $('#btnBackToCalendarLink').click(function () {
        location.href = "http://" + location.host + "/trainingcalendar/index";

    });
    $('#btnAddFbTrainingObjective').click(function () {
        ClearPopUpData();
        OpenPopUpDialog(0);
        $('#txtImparted').val(0);
        $('#txtEffectiveness').val(0);
        $('#txtAttendance').val(0);
    });
    $('#btnReset').click(function () {
        ResetValuesInTrainingObjective();
        LoadGridObjectiveList($("#ddlRefYear").val(), $("#ddlQuater").val(), 1, PageSize);
    });
    function OpenPopUpDialog(ObjectiveID) {
        var title;
        if (ObjectiveID == 0) {
            $(".modal-title").html('');
            $(".modal-title").html('Add Training Objective');
            $("#btnSaveandContinue").css("display", "normal");
            $('#btnSave span').html("Save");
        }
        else {
            $(".modal-title").html('');
            $(".modal-title").html('Edit Training Objective');
            $("#btnSaveandContinue").css("display", "none");
            $('#btnSave span').html("Update");
        }

        $("#AddEditTrainingObjective").modal("show");
        $(".form-group").removeClass("has-error  has-feedback");
        return false;
    }

    $('#btnSaveandContinue').click(function () {

        var ObjectiveId = $(this).attr('data-objectiveid');
        if (ValidateInput(ObjectiveId)) {
            var ObjectiveId = $(this).attr('data-objectiveid');
            SaveTrainingObjective(ObjectiveId, true);
        }
    });
    function ClearPopUpData() {
        $('#txtImparted').val("");
        $('#txtEffectiveness').val("");
        $('#txtAttendance').val("");
        $("#ddldownRefYear").val("").trigger("chosen:updated");
        $("#ddldownQuater").val("").trigger("chosen:updated");
        $("#errorMessage").text("");
        $("#errorMessage").removeClass('errors');
        $("#errorMessage").removeClass('alert alert-success');
        $('#chkIsLock').prop('checked', false);
        //popUpFormQuestionCategory $("#popUpFormQuestionCategory").show();
    }
    function ClearPopUpOfSaveAndContinue() {
        $('#txtImparted').val(0);
        $('#txtEffectiveness').val(0);
        $('#txtAttendance').val(0);
        $("#ddldownRefYear").val("");
        $("#ddldownQuater").val("");
        $('#chkIsLock').prop('checked', false);
    }


    $("#btnSave").click(function () {
        var txtImparted = $('#txtImparted').val();
        var ObjectiveId = $(this).attr("data-objectiveId");
        if (ValidateInput(ObjectiveId)) {

            var ObjectiveId = $(this).attr("data-objectiveId");
            SaveTrainingObjective(ObjectiveId, false);
        }

    });
    $(document).on('click', '.DeleteObjective', function () {
        if (confirm("Do you want to delete this record?")) {
            var ObjectiveId = $(this).attr("data-objectiveid");
            $.getJSON("/TrainingObjective/DeleteTrainingObjective?ObjectiveId=" + ObjectiveId)
            .done(function (data) {
                //alert(data);
                $("#trRow_" + ObjectiveId).empty();
                toastr.remove();
                toastr.success("Record deleted succesfully.");
                //LoadGridObjectiveList("","", Page, PageSize);
            });
        }
    });

    $(document).on('click', '.EditObjective', function () {
        var ObjectiveId = $(this).attr("data-objectiveid");
        var attendance = $(this).attr("data-attendance");
        var imparted = $(this).attr("data-imparted");
        var effectiveness = $(this).attr("data-effectiveness");
        var islock = $(this).attr("data-islock");
        var referenceyear = $(this).attr("data-referenceyear");
        var quater = $(this).attr("data-quater");
        //ClearPopUpData();
        $('#errorMessage').html('');
        $("#errorMessage").removeClass();
        OpenPopUpDialog(ObjectiveId);
        $("#hdnObjectiveId").val(ObjectiveId),
        $("#ddldownRefYear").val(referenceyear).trigger("chosen:updated"),
        $("#ddldownQuater").val(quater).trigger("chosen:updated"),
        $("#txtImparted").val(imparted),
        $("#txtEffectiveness").val(effectiveness),
        $("#txtAttendance").val(attendance)
        //$("#chkIsLock").is(":checked")

        if (islock == "True") {
            $('#chkIsLock').prop("checked", true);
        }
        else {
            $('#chkIsLock').prop("checked", false);
        }

        $('#btnSave').attr('data-ObjectiveId', ObjectiveId);
        // window.location.href = "/TrainingObjective/EditTrainingObjective?ObjectiveId=" + ObjectiveId;
        // ClosePopUpDialog();

    });

    $("#btnSearch").click(function () {
        LoadGridObjectiveList($("#ddlRefYear").val(), $("#ddlQuater").val(), 1, PageSize);
    });

    $("#btnCancel").click(function () {
        LoadGridObjectiveList($("#ddlRefYear").val(), $("#ddlQuater").val(), 1, PageSize);
        ClosePopUpDialog();
    });

    $(document).on('click', '.page-number', function () {
        var pagenumber = $(this).attr("data-pagenumber");
        // window.location.href = "/TrainingObjective/TrainingObjective?refYear=" + $("#ddlRefYear").val() + "&Quater=" + $("#ddlQuater").val() + "&page=" + pagenumber + "&PageSize=" + PageSize;
        LoadGridObjectiveList($("#ddlRefYear").val(), $("#ddlQuater").val(), pagenumber, PageSize);
    });

    function ClosePopUpDialog() {
        ClearPopUpData();
        $("#AddEditTrainingObjective").modal('hide');
    }
    function ValidateInput(ObjectiveId) {
        $('#errorMessage').html('');
        $("#errorMessage").removeClass();
        $("#errorMessage").hide();
        $(".form-group").removeClass("has-error  has-feedback");
        var errorMessage = "";
        var status = true;
        var txtEffectiveness = $('#txtEffectiveness').val();
        var txtAttendance = $('#txtAttendance').val();
        var txtImparted = $('#txtImparted').val();

        var ReferenceYear = $('#ddldownRefYear').val();
        var Quarter = $('#ddldownQuater').val();

        if ($("#ddldownRefYear").val() == "") {
            $('#errorMessage').addClass('alert alert-danger');
            $("#ddldownRefYear").closest(".form-group").addClass("has-error  has-feedback");
            errorMessage += "<div class='errors'><ul><li>Please select reference year</li><ul></div>";
            status = false;
        }

        if ($("#ddldownQuater").val() == "") {
            $("#ddldownQuater").closest(".form-group").addClass("has-error  has-feedback");
            $('#errorMessage').addClass('alert alert-danger');
            errorMessage += "<div class='errors'><ul><li>Please select quarter year</li><ul></div>";
            status = false;
        }

        if (txtImparted != '' && txtImparted < 0) {
            $("#txtImparted").closest(".form-group").addClass("has-error  has-feedback");
            $('#errorMessage').addClass('alert alert-danger');
            errorMessage += "<div class='errors'><ul><li>Invalid Imparted Value</li><ul></div>";
            status = false;
        }
        if (txtImparted == '')
        {
            $("#txtImparted").closest(".form-group").addClass("has-error  has-feedback");
            $('#errorMessage').addClass('alert alert-danger');
            errorMessage += "<div class='errors'><ul><li>Please Enter Imparted value</li><ul></div>";
            status = false;
        }
        if (txtEffectiveness == '') {
            $("#txtEffectiveness").closest(".form-group").addClass("has-error  has-feedback");
            $('#errorMessage').addClass('alert alert-danger');
            errorMessage += "<div class='errors'><ul><li>Please Enter Effectiveness value</li><ul></div>";
            status = false;
        }
        if (txtAttendance == '') {
            $("#txtAttendance").closest(".form-group").addClass("has-error  has-feedback");
            $('#errorMessage').addClass('alert alert-danger');
            errorMessage += "<div class='errors'><ul><li>Please Enter Attendance value</li><ul></div>";
            status = false;
        }

        if (txtEffectiveness != '' && txtEffectiveness < 0) {
            $("#txtEffectiveness").closest(".form-group").addClass("has-error  has-feedback");
            $('#errorMessage').addClass('alert alert-danger');
            errorMessage += "<div class='errors'><ul><li>Invalid effectiveness percentage</li><ul></div>";
            status = false;
        }
        if ($('#txtImparted').val().length > 4 && $('#txtEffectiveness').val().length >= 4 && $('#txtAttendance').val().length >= 3) {
            $("#txtImparted").closest(".form-group").addClass("has-error  has-feedback");
            $('#errorMessage').addClass('alert alert-danger');
            errorMessage += "<div class='errors'><ul><li>Maximum 4 digit is allowed</li><ul></div>";
            status = false;
        }

        if (txtAttendance != '' && txtAttendance < 0) {
            $("#txtAttendance").closest(".form-group").addClass("has-error  has-feedback");
            $('#errorMessage').addClass('alert alert-danger');
            errorMessage += "<div class='errors'><ul><li>Invalid attendance value</li><ul></div>";
            status = false;
        }
        var MaxTrainingsPerQuarter = $("#txtImparted").attr('max');        
        var txtImparted = $('#txtImparted').val();
        if (txtImparted != 0 && parseInt(txtImparted) >= MaxTrainingsPerQuarter) {
            $("#txtImparted").closest(".form-group").addClass("has-error  has-feedback");
            $('#errorMessage').addClass('alert alert-danger');
            errorMessage += "<div class='errors'><ul><li>Please select a value that is not more than " + MaxTrainingsPerQuarter+"</li><ul></div>";
            status = false;

        }
        if (status == true) {
            $.ajax({
                url: "/TrainingObjective/CheckAlreadyExits",
                async: false,
                contentType: "application/json;charset=utf-8",
                data: { ObjectiveId: ObjectiveId, ReferenceYear: ReferenceYear, Quarter: Quarter },
                success: function (data) {

                    if (data == true) {
                        
                        $('#errorMessage').addClass('alert alert-danger');
                        errorMessage += "Quarter is already Mapped with Selected Reference Year";
                        status = false;
                    }
                    else {
                        status = true;
                    }
                },

            });
            //return status;
        }
        if (status == false && errorMessage != null) {
            $('#errorMessage').html(errorMessage);
            $('#errorMessage').show();
            
        }
        return status;
    }
    function SaveTrainingObjective(ObjectiveId, SaveAndContinue) {

        $.getJSON("/TrainingObjective/SaveTrainingObjective", {
            ObjectiveId: ObjectiveId,
            ReferenceYear: $("#ddldownRefYear").val(),
            Quater: $("#ddldownQuater").val(),
            Imparted: $("#txtImparted").val(),
            Effectiveness: $("#txtEffectiveness").val(),
            Attendance: $("#txtAttendance").val(),
            IsLock: $("#chkIsLock").is(":checked")
        })
        .done(function (data) {
            if (data == "Success" && SaveAndContinue == false) {
                toastr.remove();
                toastr.success("Record Save Successfully");
                LoadGridObjectiveList("", "", Page, PageSize);
                ClosePopUpDialog();
            }
            else if (data == "Success" && SaveAndContinue == true) {
                $('#errorMessage').show();
                $('#errorMessage').addClass('alert alert-success');
                $('#errorMessage').html("Record Save Successfully").append("<br/>");
                LoadGridObjectiveList("", "", Page, PageSize);
                ClearPopUpOfSaveAndContinue();
            }
            else if (data == "Update") {
                toastr.remove();
                toastr.success("Record Updated Successfully");
                LoadGridObjectiveList("", "", Page, PageSize);
                ClosePopUpDialog();
            }
            else if (data == 'MaxTrainingsPerQuarter') {
                var MaxTrainingsPerQuarter = $("#txtImparted").attr('max');
                $('#errorMessage').show();
                $('#errorMessage').addClass('alert alert-warning');
                $('#errorMessage').append("Imparted value can not be exceed than maximum(" + MaxTrainingsPerQuarter + ") value.").append("<br/>");
            }
            else {
                toastr.remove();
                toastr.error("Error occured while inserting recored");
                ClosePopUpDialog();
            }

            //}
            //else {
            //    //showFailureMessage(QuestionCategoryId, response);
            //    toastr.error("Error Occur while Updating Entry");
            //}

        });

    }

    function LoadGridObjectiveList(refYear, Quater, page, pagesize) {
        $.ajax({
            url: "/TrainingObjective/GetAllObjectiveList",
            async: false,
            dataType: "html",
            contentType: "application/json;charset=utf-8",
            data: { refYear: refYear, Quater: Quater, page: page, pagesize: pagesize },
            success: function (data) {
                $('#grid').html(data);
            }
        });
    }
    $('#AddEditTrainingObjective').on('dialogclose', function (event) {
       
    });
    $(".close").on('click', function (event) {
        ClearPopUpData();
    })
    function ResetValuesInTrainingObjective() {
        $("#ddlRefYear").val('').trigger("chosen:updated");
        $("#ddlQuater").val('').trigger("chosen:updated");
        
    }
});