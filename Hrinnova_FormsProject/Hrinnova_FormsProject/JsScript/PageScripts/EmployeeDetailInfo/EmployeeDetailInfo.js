$(document).ready(function () {
    //BindGrid();
    $('.input-daterange').datepicker("setDate", "");
    //$(".datepicker").datepicker("setDate", "");
    $(".ex-number").val("");
    $(".hidebtnsaral").css("display", "none");
    ValidateDate();
    $(document).on('click', 'input[name=ViewSelection]', function () {
        if ($("#rddsaral").is(':checked')) {
            $(".hidebtnsaral").css("display", "inline-block");
            $(".hidebtndefault").css("display", "none");
            $("#divEmployeeSummary").html("");
        }
        else {
            $(".hidebtnsaral").css("display", "none");
            $(".hidebtndefault").css("display", "inline-block");
        }
    });
    $(document).on("click", "#btnSearch", function () {
        if (Validation() == true) {
            var status = false;
            var CompanyId = $("#drpCompany").val();
            var EmployeeName = $('#EmployeeName').val();
            var DepartmentId = $('#drpDepartment').val();
            var ViewType = $('input[name=ViewType]:checked').val();
            var JoinDateFrom = $('#JoinDateFrom').val();
            var JoinDateTo = $('#JoinDateTo').val();
            var ConfirmationDateFrom = $('#ConfirmationDateFrom').val();
            var ConfirmationDateTo = $('#ConfirmationDateTo').val();
            var CompanyExpFrom = $('#CompanyExpFrom').val();
            var CompanyExpTo = $('#CompanyExpTo').val();
            var TtlExpFrom = $('#TtlExpFrom').val();
            var TtlExpTo = $("#TtlExpTo").val();
            var BankId = $("#drpBank").val();
            var DegreeId = $("#drpQuliDegree").val();
            var VisaId = $("#drpVisa").val();
            var LanguageId = $("#drpLanguage").val();
            var MarraigeAniMonthFrom = $('#MarraigeAniMonthFrom').val();
            var MarraigeAniMonthTo = $("#MarraigeAniMonthTo").val();
            var SpouseBirthMonthFrom = $('#SpouseBirthMonthFrom').val();
            var SpouseBirthMonthTo = $("#SpouseBirthMonthTo").val();
            var ChildBirthMonthFrom = $('#ChildBirthMonthFrom').val();
            var ChildBirthMonthTo = $("#ChildBirthMonthTo").val();
            var PreviousCompany = $("#PreviousCompany").val();
            if (DepartmentId != null) {
                DepartmentId = DepartmentId.join(",");
            }
            debugger
            var objAdditionalInfo = new Object();
            objAdditionalInfo.PayrollInfo = $('#IsPayrollInfo').is(':checked');
            objAdditionalInfo.FamilyInfo = $('#IsFamilyInfo').is(':checked');
            objAdditionalInfo.ContactInfo = $('#IsContactInfo').is(':checked');
            objAdditionalInfo.QualificationInfo = $('#IsQualification').is(':checked');
            objAdditionalInfo.PastExperienceInfo = $('#IsPastExperienceInfo').is(':checked');
            objAdditionalInfo.VisaInfo = $('#IsVisaInfo').is(':checked');
            objAdditionalInfo.LanguageInfo = $('#IsLanguageInfo').is(':checked');

            var postData = JSON.stringify(
                {
                    EmployeeName: EmployeeName,

                    CompanyId: CompanyId,

                    DepartmentId: DepartmentId,

                    AdditionalInfo: objAdditionalInfo,

                    ViewType: ViewType,

                    JoinDateFrom: JoinDateFrom,

                    JoinDateTo: JoinDateTo,

                    ConfirmationDateFrom: ConfirmationDateFrom,

                    ConfirmationDateTo: ConfirmationDateTo,

                    CompExpDateFrom: CompanyExpFrom,

                    CompExpDateTo: CompanyExpTo,

                    TtlExpFrom: TtlExpFrom,

                    TtlExpTo: TtlExpTo,

                    BankId: BankId,

                    DegreeId: DegreeId,

                    VisaId: VisaId,

                    LanguageId: LanguageId,

                    MarraigeAniMonthFrom: MarraigeAniMonthFrom,

                    MarraigeAniMonthTo: MarraigeAniMonthTo,

                    SpouseBirthMonthFrom: SpouseBirthMonthFrom,

                    SpouseBirthMonthTo: SpouseBirthMonthTo,

                    ChildBirthMonthFrom: ChildBirthMonthFrom,

                    ChildBirthMonthTo: ChildBirthMonthTo,

                    PreviousCompany: PreviousCompany
                }
                );
            var url = "/EmployeeDetailInfo/EmployeeDetailInfoSummaryTempData";
            $.ajax({
                type: 'POST',
                data: postData,
                url: url,
                async: false,
                contentType: 'application/json; charset=utf-8',
                dataType: "json",
                beforeSend: function () {
                    ShowProgress();
                },
                success: function (data) {
                    if (data) {
                        window.location.href = "/EmployeeDetailInfo/EmployeeDetailInfoSummary";
                        HideProgress();
                    }
                },
            });

            return true;
        }

    });

    $(document).on("click", "#btnReset", function () {
        ShowProgress();
        $(".form-group").removeClass("has-error  has-feedback");
        $(".datepicker").datepicker("setDate", "");
        $(".ex-number").val("");
        $("#EmployeeName").val('');
        $("#ResumeKeywords").val('');
        $('#drpCompany').val('').trigger("chosen:updated");
        $('#drpDepartment').val('').trigger("chosen:updated");
        $("#ViewCurrent").prop('checked', true);
        $("#YearsCompleted").val('').trigger("chosen:updated");
        $("#rdbdefault").prop('checked', true);
        $(".hidebtnsaral").css("display", "none");
        $("#divDaterange").hide();
        $("#ResumeKeywords").val('');
        $(".hidebtndefault").css("display", "inline-block");
        $('#searchEmployeeValidationMessage').html('');
        $('#searchEmployeeValidationMessage').css('display', 'none');
        $('#divEmployeeSummary').empty();

        HideProgress();
    });
});
function BindGrid() {

    var CompanyId = $('#drpCompany').val();
    var selectedEmployees = [];
    if ($('#drpEmployees :selected').length > 0) {
        //build an array of selected values
        $('#drpEmployees :selected').each(function (i, selected) {
            selectedEmployees[i] = $(selected).val();
        });
    }
    var FromMonth = $('#drpMonth').val();
    var FromYear = $('#drpYear').val();
    var ToMonth = $('#drpToMonth').val();
    var ToYear = $('#drpToYear').val();
    $.ajax({
        type: "GET",
        data: { employeeList: JSON.stringify(selectedEmployees), CompanyId: CompanyId, fromMonth: FromMonth, toMonth: ToMonth, fromYear: FromYear, toYear: ToYear },
        url: '/LeaveBalSummaryReport/GetLeaveBalanceSummary',
        dataType: "html",
        beforeSend: function () {
            ShowProgress();
        },
        success: function (result) {
            HideProgress();
            $('#divLeaveBalSummary').html(result);
            ej.widget.init($("#divLeaveBalSummary"));
        }
    });
}

function LoadEmployeeListForDeptFilter(CompanyId) {

    if (CompanyId == 0) {
        $("#drpEmployees option").css("display", "block").removeAttr('disabled');
        $(".optEmp").css("display", "block");
    }
    else {
        $("#drpEmployees option").css("display", "block").removeAttr('disabled');
        $(".optEmp").css("display", "block");

        if (CompanyId != 0) {

            $("#drpEmployees option.Company_" + CompanyId + ":visible").css("display", "block").removeAttr('disabled');

            $('.optEmp').not(".Company_" + CompanyId).css("display", "none");
            $("#drpEmployees option").not(".Company_" + CompanyId).css("display", "none");
        }
    }
    $("#drpEmployees option:selected").removeAttr("selected");
    $('#drpEmployees').multiselect("refresh");

}
function BindEmployeeDropDown() {

    $("#drpEmployees").html('');
    $("#drpEmployees").trigger("chosen:updated");

    var CompanyId = $('#drpCompany').val();
    var departmentId = $('#drpDepartment').val();
    var designationId = $('#drpDesignation').val();
    var clientId = $('#drpClient').val();
    var projectId = $('#drpProject').val();

    var month = null;
    var year = null;

    if ($('#drpMonth').val() != '' && $('#drpYear').val() != '') {
        month = $('#drpMonth').val();
        year = $('#drpYear').val();
    }
    var url = "/LeaveBalSummaryReport/GetEmployeeList";

    $.ajax({
        url: url,
        data: { year: year, month: month, companyId: CompanyId, departmentId: departmentId, designationId: designationId, clientId: clientId, projectId: projectId },
        cache: false,
        type: "POST",
        async: false,
        success: function (data) {
            if (data.length > 0) {
                var markup;
                //markup = "<option selected>Select All</option>";
                $("#drpEmployees").empty();
                InitDrpEmploee();
                $.each(data, function (key, value) {
                    $("#drpEmployees").append($("<option></option>").val
                    (value.Value).html(value.Text));
                });

                //$('#drpEmployees').multiselect("refresh");
            }
            else {
                $('#drpEmployees').prop('disabled', true).trigger("chosen:updated");
            }
        },
        error: function (reponse) {

        }
    });
}
function ValidateDate() {
    $("#BirthDateFrom").change(function () {
        var startDate = $("#BirthDateFrom").val();
        if (startDate == "") {
            $("#BirthDateTo").datepicker('setDate', "");
        }
    });
    $("#JoinDateFrom").change(function () {
        var startDate = $("#JoinDateFrom").val();
        if (startDate == "") {
            $("#JoinDateTo").datepicker('setDate', "");
        }
    });
    $("#ConfirmationDueDateFrom").change(function () {
        var startDate = $("#ConfirmationDueDateFrom").val();
        if (startDate == "") {
            $("#ConfirmationDueDateTo").datepicker('setDate', "");
        }
    });
    $("#ConfirmationDateFrom").change(function () {
        var startDate = $("#ConfirmationDateFrom").val();
        if (startDate == "") {
            $("#ConfirmationDateTo").datepicker('setDate', "");
        }
    });
    $("#PasspoprtExpiryDateFrom").change(function () {
        var startDate = $("#PasspoprtExpiryDateFrom").val();
        if (startDate == "") {
            $("#PasspoprtExpiryDateTo").datepicker('setDate', "");
        }
    });
    $("#RelievingDateFrom").change(function () {
        var startDate = $("#RelievingDateFrom").val();
        if (startDate == "") {
            $("#RelievingDateTo").datepicker('setDate', "");
        }
    });
    $("#DateRangeFrom").change(function () {
        var startDate = $("#DateRangeFrom").val();
        if (startDate == "") {
            $("#DateRangeTo").datepicker('setDate', "");
        }
    });
    $("#CompanyExpFrom").change(function () {
        var CompanyExpFrom = $("#CompanyExpFrom").val();
        if (CompanyExpFrom == "") {
            $("#CompanyTtlExpTo").val("");
        }
    });
    $("#TtlExpFrom").change(function () {
        var TtlExpFrom = $("#TtlExpFrom").val();
        if (TtlExpFrom == "") {
            $("#TtlExpTo").val("");
        }
    });
}
function Validation() {
    var result = true;
    var strErrorMessage = '';
    $(".form-group").removeClass("has-error  has-feedback");
    $('#searchEmployeeValidationMessage').html('');
    $('#searchEmployeeValidationMessage').hide();

    var MarraigeAniMonthFrom = $('#MarraigeAniMonthFrom').val();
    var MarraigeAniMonthTo = $('#MarraigeAniMonthTo').val();
    var SpouseBirthMonthFrom = $('#SpouseBirthMonthFrom').val();
    var SpouseBirthMonthTo = $('#SpouseBirthMonthTo').val();
    var ChildBirthMonthFrom = $('#ChildBirthMonthFrom').val();
    var ChildBirthMonthTo = $('#ChildBirthMonthTo').val();
    var CompExpDateFrom = $('#CompanyExpFrom').val();
    var CompExpDateTo = $('#CompanyExpTo').val();
    var TtlExpFrom = $('#TtlExpFrom').val();
    var TtlExpTo = $('#TtlExpTo').val();
    var JoinDateFrom = $('#JoinDateFrom').val();

    if (JoinDateFrom != "") {
        var JoinDateTo = $('#JoinDateTo').val();
        if (JoinDateTo == "") {
            strErrorMessage += "<li>Please Select TO Joining date</li>";
            $("#JoinDateTo").closest(".form-group").addClass("has-error  has-feedback");
            result = false;
        }
    }

    var ConfirmationDateFrom = $('#ConfirmationDateFrom').val();
    if (ConfirmationDateFrom != "") {
        var ConfirmationDateTo = $('#ConfirmationDateTo').val();
        if (ConfirmationDateTo == "") {
            strErrorMessage += "<li>Please Select TO Confirmation date</li>";
            $("#ConfirmationDateTo").closest(".form-group").addClass("has-error  has-feedback");
            result = false;
        }
    }
    if (CompExpDateFrom != "") {
        if (CompExpDateTo == "") {
            strErrorMessage += "<li>Please Select TO Company Exp. </li>";
            $("#CompanyExpFrom").closest(".form-group").addClass("has-error  has-feedback");
            result = false;
        }
    }
    else if (CompExpDateTo != "") {
        if (CompExpDateFrom == "") {
            strErrorMessage += "<li>Please Select From Company Exp.</li>";
            $("#CompanyExpTo").closest(".form-group").addClass("has-error  has-feedback");
            result = false;
        }
    }

    if (TtlExpFrom != "") {
        if (TtlExpTo == "") {
            strErrorMessage += "<li>Please Select TO Total Exp.  Month</li>";
            $("#TtlExpTo").closest(".form-group").addClass("has-error  has-feedback");
            result = false;
        }
    }
    else if (TtlExpTo != "") {
        if (TtlExpFrom == "") {
            strErrorMessage += "<li>Please Select From Total Exp.  Month</li>";
            $("#TtlExpTo").closest(".form-group").addClass("has-error  has-feedback");
            result = false;
        }
    }


    if (MarraigeAniMonthFrom != "" && parseInt(MarraigeAniMonthFrom) > 0 && parseInt(MarraigeAniMonthFrom) < 12) {
        if (MarraigeAniMonthTo == "") {
            strErrorMessage += "<li>Please Select TO Marriage Anniversary Month</li>";
            $("#MarraigeAniMonthTo").closest(".form-group").addClass("has-error  has-feedback");
            result = false;
        }
        if (parseInt(MarraigeAniMonthTo) <= 0 && parseInt(MarraigeAniMonthTo) > 12) {
            strErrorMessage += "<li>Please enter proper value of Marriage Anniversary To </li>";
            $("#MarraigeAniMonthTo").closest(".form-group").addClass("has-error  has-feedback");
            result = false;
        }
    }
    else if (MarraigeAniMonthFrom != "" && parseInt(MarraigeAniMonthFrom) <= 0 || parseInt(MarraigeAniMonthFrom) > 12) {
        strErrorMessage += "<li>Please enter proper value of Marriage Anniversary From </li>";
        $("#MarraigeAniMonthFrom").closest(".form-group").addClass("has-error  has-feedback");
        result = false;
    }
    else if (MarraigeAniMonthTo != "")
    {
        if (MarraigeAniMonthFrom == "") {
            strErrorMessage += "<li>Please Select From Marriage Anniversary Month</li>";
            $("#MarraigeAniMonthFrom").closest(".form-group").addClass("has-error  has-feedback");
            result = false;
        }
    }

    if (SpouseBirthMonthFrom != "" && parseInt(SpouseBirthMonthFrom) > 0 && parseInt(SpouseBirthMonthFrom) < 12) {
        if (SpouseBirthMonthTo == "") {
            strErrorMessage += "<li>Please Select TO Spouse Birth Month</li>";
            $("#SpouseBirthMonthTo").closest(".form-group").addClass("has-error  has-feedback");
            result = false;
        }
        if (parseInt(SpouseBirthMonthTo) <= 0 || parseInt(SpouseBirthMonthTo) > 12) {
            strErrorMessage += "<li>Please enter proper value of Spouse Birth To </li>";
            $("#SpouseBirthMonthTo").closest(".form-group").addClass("has-error  has-feedback");
            result = false;
        }
    }
    else if (SpouseBirthMonthFrom != "" && parseInt(SpouseBirthMonthFrom) <= 0 || parseInt(SpouseBirthMonthFrom) > 12) {
        strErrorMessage += "<li>Please enter proper value of Spouse Birth From </li>";
        $("#SpouseBirthMonthFrom").closest(".form-group").addClass("has-error  has-feedback");
        result = false;
    }
    else if (SpouseBirthMonthTo != "") {
        if (SpouseBirthMonthFrom == "") {
            strErrorMessage += "<li>Please Select From Spouse Birth Month</li>";
            $("#SpouseBirthMonthFrom").closest(".form-group").addClass("has-error  has-feedback");
            result = false;
        }
    }

    if (ChildBirthMonthFrom != "" && parseInt(ChildBirthMonthFrom) > 0 && parseInt(ChildBirthMonthFrom) < 12) {
        if (ChildBirthMonthTo == "") {
            strErrorMessage += "<li>Please Select TO Child Birth  Month</li>";
            $("#ChildBirthMonthTo").closest(".form-group").addClass("has-error  has-feedback");
            result = false;
        }
        if (parseInt(ChildBirthMonthTo) <= 0 || parseInt(ChildBirthMonthTo) > 12) {
            strErrorMessage += "<li>Please enter proper value of Child Birth To </li>";
            $("#ChildBirthMonthTo").closest(".form-group").addClass("has-error  has-feedback");
            result = false;
        }
    }
    else if (ChildBirthMonthFrom != "" && parseInt(ChildBirthMonthFrom) <= 0 || parseInt(ChildBirthMonthFrom) > 12) {
        strErrorMessage += "<li>Please enter proper value of Child Birth From </li>";
        $("#ChildBirthMonthFrom").closest(".form-group").addClass("has-error  has-feedback");
        result = false;
    }
    else if (ChildBirthMonthTo != "") {
        if (ChildBirthMonthFrom == "") {
            strErrorMessage += "<li>Please Select From Child Birth Month</li>";
            $("#ChildBirthMonthFrom").closest(".form-group").addClass("has-error  has-feedback");
            result = false;
        }
    }

    
    
    if (strErrorMessage != '') {
        $('#searchEmployeeValidationMessage').show();
        $('#searchEmployeeValidationMessage').html("<div class='alert alert-danger'><ul>" + strErrorMessage + "</ul></div>");
        $('html, body').animate({
            scrollTop: 0
        }, 500);
        return false
    }

    return result;
}
function HideProgress() {
    $('.loader-wrapper').css('display', 'none');
}

function ShowProgress() {

    if ($('.loader-wrapper').css('display') == "none") {
        $(".loader-wrapper").show();
    }
}


