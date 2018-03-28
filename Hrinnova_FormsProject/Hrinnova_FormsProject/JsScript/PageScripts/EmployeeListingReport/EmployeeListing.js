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
            var CompanyId = $("#drpCompany").val();
            var EmployeeName = $('#EmployeeName').val();
            var DepartmentId = $('#drpDepartment').val();
            var ViewType = $('input[name=ViewType]:checked').val();
            var ViewSelection = $('input[name=ViewSelection]:checked').val();
            var BirthDateFrom = $('#BirthDateFrom').val();
            var BirthDateTo = $('#BirthDateTo').val();
            var JoinDateFrom = $('#JoinDateFrom').val();
            var JoinDateTo = $('#JoinDateTo').val();
            var ConfirmationDueDateFrom = $('#ConfirmationDueDateFrom').val();
            var ConfirmationDueDateTo = $("#ConfirmationDueDateTo").val();
            var ConfirmationDateFrom = $('#ConfirmationDateFrom').val();
            var ConfirmationDateTo = $('#ConfirmationDateTo').val();
            var PasspoprtExpiryDateFrom = $('#PasspoprtExpiryDateFrom').val();
            var PasspoprtExpiryDateTo = $('#PasspoprtExpiryDateTo').val();
            var RelievingDateFrom = $('#RelievingDateFrom').val();
            var RelievingDateTo = $('#RelievingDateTo').val();
            var CompanyExpFrom = $('#CompanyExpFrom').val();
            var CompanyExpTo = $('#CompanyTtlExpTo').val();
            var TtlExpFrom = $('#TtlExpFrom').val();
            var TtlExpTo = $("#TtlExpTo").val();
            var YearsCompleted = $("#YearsCompleted").val();
            var DateRangeFrom = $('#DateRangeFrom').val();
            var DateRangeTo = $("#DateRangeTo").val();
            var ResumeKeyword = $('#ResumeKeywords').val();
            if (DepartmentId != null) {
                DepartmentId = DepartmentId.join(",");
            }

            var postData = {
                EmployeeName: EmployeeName,

                CompanyId: CompanyId,

                DepartmentId: DepartmentId,

                Selection: ViewSelection,

                ViewType: ViewType,

                JoinDateFrom: JoinDateFrom,

                JoinDateTo: JoinDateTo,

                BirthDateFrom: BirthDateFrom,

                BirthDateTo: BirthDateTo,

                ConfirmationDateFrom: ConfirmationDateFrom,

                ConfirmationDateTo: ConfirmationDateTo,

                ConfirmationDueDateFrom: ConfirmationDueDateFrom,

                ConfirmationDueDateTo: ConfirmationDueDateTo,

                PasspoprtExpiryDateFrom: PasspoprtExpiryDateFrom,

                PasspoprtExpiryDateTo: PasspoprtExpiryDateTo,

                RelievingDateFrom: RelievingDateFrom,

                RelievingDateTo: RelievingDateTo,

                CompExpDateFrom: CompanyExpFrom,

                CompExpDateTo: CompanyExpTo,

                TtlExpFrom: TtlExpFrom,

                TtlExpTo: TtlExpTo,

                YearsCompleted: YearsCompleted,

                DateRangeFrom: DateRangeFrom,

                DateRangeTo: DateRangeTo,
                ResumeKeywords: ResumeKeyword
            }
            var url = "/EmployeeListingReport/EmployeeListingSummary";
            $.ajax({
                type: 'GET',
                data: postData,
                url: url,
                dataType: "html",
                beforeSend: function () {
                    ShowProgress();
                },
                success: function (data) {
                    HideProgress();
                    $('#divEmployeeSummary').html(data);
                    ej.widget.init($("#divEmployeeSummary"));
                },
            });

            return true;
        }

    });

    $(document).on("click", "#btnSearchsaral", function () {
        if (Validation() == true) {
            var CompanyId = $("#drpCompany").val();
            var EmployeeName = $('#EmployeeName').val();
            var DepartmentId = $('#drpDepartment').val();
            var ViewType = $('input[name=ViewType]:checked').val();
            var ViewSelection = $('input[name=ViewSelection]:checked').val();
            var BirthDateFrom = $('#BirthDateFrom').val();
            var BirthDateTo = $('#BirthDateTo').val();
            var JoinDateFrom = $('#JoinDateFrom').val();
            var JoinDateTo = $('#JoinDateTo').val();
            var ConfirmationDueDateFrom = $('#ConfirmationDueDateFrom').val();
            var ConfirmationDueDateTo = $("#ConfirmationDueDateTo").val();
            var ConfirmationDateFrom = $('#ConfirmationDateFrom').val();
            var ConfirmationDateTo = $('#ConfirmationDateTo').val();
            var PasspoprtExpiryDateFrom = $('#PasspoprtExpiryDateFrom').val();
            var PasspoprtExpiryDateTo = $('#PasspoprtExpiryDateTo').val();
            var RelievingDateFrom = $('#RelievingDateFrom').val();
            var RelievingDateTo = $('#RelievingDateTo').val();
            var CompanyExpFrom = $('#CompanyExpFrom').val();
            var CompanyExpTo = $('#CompanyTtlExpTo').val();
            var TtlExpFrom = $('#TtlExpFrom').val();
            var TtlExpTo = $("#TtlExpTo").val();
            var YearsCompleted = $("#YearsCompleted").val();
            var DateRangeFrom = $('#DateRangeFrom').val();
            var DateRangeTo = $("#DateRangeTo").val();
            var ResumeKeyword = $('#ResumeKeywords').val();
            if (DepartmentId != null) {
                DepartmentId = DepartmentId.join(",");
            }

            var postData = {
                EmployeeName: EmployeeName,

                CompanyId: CompanyId,

                DepartmentId: DepartmentId,

                Selection: ViewSelection,

                ViewType: ViewType,

                JoinDateFrom: JoinDateFrom,

                JoinDateTo: JoinDateTo,

                BirthDateFrom: BirthDateFrom,

                BirthDateTo: BirthDateTo,

                ConfirmationDateFrom: ConfirmationDateFrom,

                ConfirmationDateTo: ConfirmationDateTo,

                ConfirmationDueDateFrom: ConfirmationDueDateFrom,

                ConfirmationDueDateTo: ConfirmationDueDateTo,

                PasspoprtExpiryDateFrom: PasspoprtExpiryDateFrom,

                PasspoprtExpiryDateTo: PasspoprtExpiryDateTo,

                RelievingDateFrom: RelievingDateFrom,

                RelievingDateTo: RelievingDateTo,

                CompExpDateFrom: CompanyExpFrom,

                CompExpDateTo: CompanyExpTo,

                TtlExpFrom: TtlExpFrom,

                TtlExpTo: TtlExpTo,

                YearsCompleted: YearsCompleted,

                DateRangeFrom: DateRangeFrom,

                DateRangeTo: DateRangeTo,
                ResumeKeywords: ResumeKeyword
            }
            window.location.href = "/EmployeeListingReport/ExportFile?empSaraldata" + postData;
            return true;
        }

    });
    $(document).on("change", "#YearsCompleted", function () {
        if ($("#YearsCompleted").val() > 0) {
            $("#divDaterange").show();
        }
        else {
            $("#divDaterange").hide();
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
    $(document).stop().on("mouseover mousemove", ".img_user", function () {
        $("body").find('.img_hover').remove();
        $("body").append($("<div class='img_hover thumbnail padding-10' style='left:" + ($(this).offset().left + $(this).width()) + "px;top:" + ($(this).offset().top - $(window).scrollTop()) + "px;position:fixed;width:180px'><img style='max-width:100%;max-height:100%' src='" + $(this).attr("src") + "' /></div>"));
       // $('.img_hover').css({ 'left': $(this).offset().left + $(this).width(), 'top': $(this).offset().top, 'position': 'fixed', 'width': '180px', 'height': '180px' });
    });
    $(document).stop().on("mouseout ", ".img_user,.img_hover", function () {    
        $("body").find('.img_hover').remove();
    });
    $(window).scroll(function () {
        $("body").find('.img_hover').remove();
    })
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
    var BirthDateFrom = $('#BirthDateFrom').val();
    if (BirthDateFrom != "") {
        var BirthDateTo = $('#BirthDateTo').val();
        if (BirthDateTo == "") {
            strErrorMessage += "<li>Please Select TO birthdate</li>";
            $("#BirthDateTo").closest(".form-group").addClass("has-error  has-feedback");
            result = false;
        }
    }
    var JoinDateFrom = $('#JoinDateFrom').val();
    if (JoinDateFrom != "") {
        var JoinDateTo = $('#JoinDateTo').val();
        if (JoinDateTo == "") {
            strErrorMessage += "<li>Please Select TO Joindate</li>";
            $("#JoinDateTo").closest(".form-group").addClass("has-error  has-feedback");
            result = false;
        }
    }
    var ConfirmationDueDateFrom = $('#ConfirmationDueDateFrom').val();
    if (ConfirmationDueDateFrom != "") {
        var ConfirmationDueDateTo = $('#ConfirmationDueDateTo').val();
        if (ConfirmationDueDateTo == "") {
            strErrorMessage += "<li>Please Select TO Confirmation due date</li>";
            $("#ConfirmationDueDateTo").closest(".form-group").addClass("has-error  has-feedback");
            result = false;
        }

    }
    var ConfirmationDateFrom = $('#ConfirmationDateFrom').val();
    if (ConfirmationDateFrom != "") {
        var ConfirmationDateTo = $('#ConfirmationDateTo').val();
        if (ConfirmationDateTo == "") {
            strErrorMessage += "<li>Please Select TO Confirmation due date</li>";
            $("#ConfirmationDateTo").closest(".form-group").addClass("has-error  has-feedback");
            result = false;
        }

    }
    var ConfirmationDateFrom = $('#ConfirmationDateFrom').val();
    if (ConfirmationDateFrom != "") {
        var ConfirmationDateTo = $('#ConfirmationDateTo').val();
        if (ConfirmationDateTo == "") {
            strErrorMessage += "<li>Please Select TO Confirmation due date</li>";
            $("#ConfirmationDateTo").closest(".form-group").addClass("has-error  has-feedback");
            result = false;
        }

    }
    var PasspoprtExpiryDateFrom = $('#PasspoprtExpiryDateFrom').val();
    if (PasspoprtExpiryDateFrom != "") {
        var PasspoprtExpiryDateTo = $('#PasspoprtExpiryDateTo').val();
        if (PasspoprtExpiryDateTo == "") {
            strErrorMessage += "<li>Please Select TO Confirmation due date</li>";
            $("#PasspoprtExpiryDateTo").closest(".form-group").addClass("has-error  has-feedback");
            result = false;
        }
    }
    var RelievingDateFrom = $('#RelievingDateFrom').val();
    if (RelievingDateFrom != "") {
        var RelievingDateTo = $('#RelievingDateTo').val();
        if (RelievingDateTo == "") {
            strErrorMessage += "<li>Please Select TO Confirmation due date</li>";
            $("#RelievingDateTo").closest(".form-group").addClass("has-error  has-feedback");
            result = false;
        }
    }
    var CompanyExpFrom = $("#CompanyExpFrom").val();
    var CompanyExpTo = $("#CompanyTtlExpTo").val();
    if (CompanyExpFrom != "" && CompanyExpTo != null && parseFloat(CompanyExpTo) <= parseFloat(CompanyExpFrom)) {
        strErrorMessage += "<li>Please select valid To Company Exp.</li>";
        $("#CompanyTtlExpTo").closest(".form-group").addClass("has-error  has-feedback");
        result = false;

    }
    var TtlExpFrom = $("#TtlExpFrom").val();
    var TtlExpTo = $("#TtlExpTo").val();
    if (TtlExpFrom != "" && TtlExpTo != null && parseFloat(TtlExpTo) <= parseFloat(TtlExpFrom)) {
        strErrorMessage += "<li>Please select valid To Total Exp.</li>";
        $("#TtlExpTo").closest(".form-group").addClass("has-error  has-feedback");
        result = false;
    }
    var YearsCompleted = $("#YearsCompleted").val();
    if (YearsCompleted > 0)
    {
        var DateRangeFrom = $("#DateRangeFrom").val();
        var DateRangeTo = $("#DateRangeTo").val();
        if(DateRangeFrom != "")
        {
            if (DateRangeTo == "") {
                strErrorMessage += "<li>Please Select To Date</li>";
                $("#DateRangeTo").closest(".form-group").addClass("has-error  has-feedback");
                result = false;
            }
        }
        else
        {
            strErrorMessage += "<li>Please Select From Date</li>";
            $("#DateRangeFrom").closest(".form-group").addClass("has-error  has-feedback");
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


