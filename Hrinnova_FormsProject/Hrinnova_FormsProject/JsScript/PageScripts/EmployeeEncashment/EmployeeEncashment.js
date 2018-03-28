$(document).ready(function () {
    Multiselect();
    /**************** custome scroll ********************/
    custome_scroll_init();
    $("#drpCompany").change(function () {
        if ($(this).val() != "") {
            BindCompanybyEmployee($(this).val());
            BindCompanyFinancialYear($(this).val())
        }
        else {
            $(".EmpForencahment").empty();
            $("#selectedEmployee").html('');
            $('#divSelectedEmployee').css('display', 'none')
            $('#ddlEmployee').multiselect('destroy');
            $("#drpFinancialyear").empty();
            $("#drpFinancialyear").append($('<option></option>').val("").html("Select Financial Year"));
            $('#drpFinancialyear').trigger("chosen:updated");
            $("#drpAccumulationtype").val("");
            $("#drpCycletype").empty();
            $("#drpCycletype").append($('<option></option>').val("").html("Select Cycle"));
            $('#drpCycletype').trigger("chosen:updated");

            Multiselect();
        }
    });

    $("#drpFinancialyear").change(function () {
        if ($(this).val() != "") {
            $("#drpAccumulationtype").val('').trigger("chosen:updated");
        }
        else {
            $("#drpCycletype").empty();
            $("#drpCycletype").append($('<option></option>').val("").html("Select Cycle"));
            $('#drpCycletype').trigger("chosen:updated");
            $("#drpAccumulationtype").val('').trigger("chosen:updated");
        }
    });

    $("#drpAccumulationtype").change(function () {
        if ($(this).val() != "") {
            var startenddate = $("#drpFinancialyear").val();
            if (startenddate != "") {
                BindCompanycycle($(this).val(), startenddate);
            }
            else {
                $("#drpFinancialyear").closest(".form-group").addClass("has-error  has-feedback");
                $('#searchEmployeeValidationMessage').show();
                $('#searchEmployeeValidationMessage').html("<div class='alert alert-danger'><ul><li>Please Select Financial Year</li></ul></div>");
            }
        }
        else {
            $(".EmpForencahment").html('');
            $("#selectedEmployee").html('');
            $('#divSelectedEmployee').css('display', 'none');
            $('#ddlEmployee').multiselect('destroy');
            $("#drpCycletype").empty();
            $("#drpCycletype").append($('<option></option>').val("").html("Select Cycle"));
            Multiselect();
        }
    });
    $("#drpCycletype").change(function () {
        if ($(this).val() != "") {
            var CompanyId = $("#drpCompany").val();
            var startDate = $(this).val().split("-")[0];
            var endDate = $(this).val().split("-")[1];
            BindCompanybyafterCyclechangeEmployee(CompanyId, startDate, endDate)
        }
    });

    $(document).on("click", "#btnSearch", function () {
        if (Validation() == true) {
            var CompanyId = $("#drpCompany").val();
            var Financialyear = $("#drpFinancialyear").val();
            var Accumulationtype = $('#drpAccumulationtype option:selected').text();
            var Cycletype = $("#drpCycletype").val();
            var Leavetype = $('#drpleavetype').val();
            var EmployeeIds = $("#ddlEmployee").val();
            if (Leavetype != null) {
                Leavetype = Leavetype.join(",");
            }
            if (EmployeeIds != null)
            {
                EmployeeIds = EmployeeIds.join(",");
            }

            var postData = {
                lstEmployeeId: EmployeeIds,

                CompanyId: CompanyId,

                Financialyear: Financialyear,

                Accumulationtype: Accumulationtype,

                Cycletype: Cycletype,

                Leavetype: Leavetype,
                
            }
            var url = "/EmployeeEncashment/EmployeeEncashmentSummary";
            $.ajax({
                type: 'POST',
                data: postData,
                url: url,
                dataType: "html",
                beforeSend: function () {
                    ShowProgress();
                },
                success: function (data) {
                    HideProgress();
                    $('#divEmployeeEnachmentSummary').html(data);
                    ej.widget.init($("#divEmployeeEnachmentSummary"));
                },
            });

            return true;
        }

    });


    $(document).on("click", "#btnReset", function () {
        ShowProgress();
        $(".form-group").removeClass("has-error  has-feedback");
        
        $('#drpCompany').val('').trigger("chosen:updated");
        $('#drpFinancialyear').val('').trigger("chosen:updated");
        $('#drpAccumulationtype').val('').trigger("chosen:updated");
        $('#drpCycletype').val('').trigger("chosen:updated");
        $('#drpleavetype').val('').trigger("chosen:updated");
        $('#ddlEmployee').val('').trigger("chosen:updated");
        $("#selectedEmployee").html('');
        $('#ddlEmployee').multiselect('deselectAll', false);
        $('#ddlEmployee').multiselect('updateButtonText');
        $('#searchEmployeeValidationMessage').html('');
        $('#searchEmployeeValidationMessage').css('display', 'none');
        $('#divEmployeeEnachmentSummary').empty();
        var date = new Date();
        var stringDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
        BindCompanybyafterCyclechangeEmployee(null, stringDate, stringDate);
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

function Validation() {
    var result = true;
    var strErrorMessage = '';
    $(".form-group").removeClass("has-error  has-feedback");
    $('#searchEmployeeValidationMessage').html('');
    $('#searchEmployeeValidationMessage').hide();
    var Company = $('#drpCompany').val();
    if (Company == "") {
        strErrorMessage += "<li>Please Select Company</li>";
        $("#drpCompany").closest(".form-group").addClass("has-error  has-feedback");
        result = false;

    }
    var Financialyear = $('#drpFinancialyear').val();
    if (Financialyear == "") {
        strErrorMessage += "<li>Please Select Financial Year</li>";
        $("#drpFinancialyear").closest(".form-group").addClass("has-error  has-feedback");
        result = false;

    }
    var Accumulationtype = $('#drpAccumulationtype').val();
    if (Accumulationtype == "") {
        strErrorMessage += "<li>Please Select Accumulation Cycle</li>";
        $("#drpAccumulationtype").closest(".form-group").addClass("has-error  has-feedback");
        result = false;

    }
    var Cycletype = $('#drpCycletype').val();
    if (Cycletype == "") {
        strErrorMessage += "<li>Please Select Cycle</li>";
        $("#drpCycletype").closest(".form-group").addClass("has-error  has-feedback");
        result = false;
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
function BindCompanybyEmployee(CompanyId) {
    $.ajax({
        type: "POST",
        url: '/EmployeeEncashment/GetEmployeesByCompany',
        data: { "CompanyId": CompanyId },
        beforeSend: function () {
            ShowProgress();
        },
        success: function (data) {
            $(".EmpForencahment").empty();
            $("#selectedEmployee").html('');
            $('#divSelectedEmployee').css('display', 'none')
            $.each(data, function (id, option) {
                $(".EmpForencahment").append($('<option></option>').val(option.Value).html(option.Text));
            });
            setupCheckboxes();
            $('#ddlEmployee').multiselect('destroy');
            Multiselect();
            HideProgress();
        }
    });
}

function BindCompanybyafterCyclechangeEmployee(CompanyId, startDate, EndDate) {
    $.ajax({
        type: "POST",
        url: '/EmployeeEncashment/GetEmployeesByCompanyaftercycle',
        data: { "CompanyId": CompanyId, "startDate": startDate, "enddate": EndDate },
        beforeSend: function () {
            ShowProgress();
        },
        success: function (data) {
            $(".EmpForencahment").empty();
            $("#selectedEmployee").html('');
            $('#divSelectedEmployee').css('display', 'none')
            $.each(data, function (id, option) {
                $(".EmpForencahment").append($('<option></option>').val(option.Value).html(option.Text));
            });
            setupCheckboxes();
            $('#ddlEmployee').multiselect('destroy');
            Multiselect();
            HideProgress();
        }
    });
}

function BindCompanyFinancialYear(CompanyId) {
    $.ajax({
        type: "POST",
        url: '/EmployeeEncashment/GetFinancialYearbasedonCompany',
        data: { "CompanyId": CompanyId },
        beforeSend: function () {
            ShowProgress();
        },
        success: function (data) {
            $("#drpFinancialyear").empty();
            $("#drpFinancialyear").append($('<option></option>').val("").html("Select Financial Year"));
            $.each(data, function (id, option) {
                $("#drpFinancialyear").append($('<option></option>').val(option.Value).html(option.Text));
            });
            $('#drpFinancialyear').trigger("chosen:updated");
            HideProgress();
        }
    });
}

function BindCompanycycle(Cycletype, startendDate) {
    $.ajax({
        type: "POST",
        url: '/EmployeeEncashment/GetCycletyperbasedonAccumulation',
        data: { "Cycletype": Cycletype, "StartEndYear": startendDate },
        beforeSend: function () {
            ShowProgress();
        },
        success: function (data) {
            $("#drpCycletype").empty();
            $("#drpCycletype").append($('<option></option>').val("").html("Select Cycle"));
            $.each(data, function (id, option) {
                $("#drpCycletype").append($('<option></option>').val(option.Value).html(option.Text));
            });
            $('#drpCycletype').trigger("chosen:updated");
            HideProgress();
        }
    });
}

function Multiselect() {
    $('#ddlEmployee').multiselect({
        enableFiltering: true,
        numberDisplayed: 1,
        filterBehavior: 'text',
        includeSelectAllOption: true,
        buttonWidth: '100%',
        enableCaseInsensitiveFiltering: true,
        disableIfEmpty: true,
        templates: {
            filter: '<li class="multiselect-item filter"><div class="input-group"><input class="form-control multiselect-search" type="text"></div></li>',
            filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default multiselect-clear-filter" type="button"><i class="glyphicon glyphicon-remove-circle"></i></button></span>',
        },
        onChange: function (element, checked) {

            if (checked === true) {
                $("#selectedEmployee").append('<label class="label-primary label" style="margin-left: 5px;">' + $(element).text() + ' <i class="fa fa-close cursor-pointer removeSelectedTag" data-id="' + $(element).val() + '" id="Employee_' + $(element).val() + '"></i></label>')

            }
            else if (checked === false) {
                $("#Employee_" + $(element).val()).parent().remove();

            }
            if (!$('#ddlEmployee').val()) {
                $('#divSelectedEmployee').css('display', 'none')
            }
            else {
                $('#divSelectedEmployee').css('display', 'block')
            }
        },
        onSelectAll: function () {
            $("#selectedEmployee").html('');
            $('#divSelectedEmployee').css('display', 'none')
            $('.multiselect-container.dropdown-menu > li').not('.filter').not('.multiselect-all').each(function () {
                if ($(this).hasClass('active')) {
                    var EmpTextName = $(this).find('label').html();
                    var EmpTextId = $(this).find('input').val();
                    $("#selectedEmployee").append('<label class="label-primary label" style="margin-left: 5px;">' + EmpTextName + ' <i class="fa fa-close cursor-pointer removeSelectedTag" data-id="' + EmpTextId + '" id="Employee_' + EmpTextId + '"></i></label>')
                }
            });
            if (!$('#ddlEmployee').val()) {
                $('#divSelectedEmployee').css('display', 'none')
            }
            else {
                $('#divSelectedEmployee').css('display', 'block')
            }
        },
        onDeselectAll: function () {
            $("#selectedEmployee").html('');
            $('#divSelectedEmployee').css('display', 'none')

        },
        maxHeight: 200,
    });
    $('#selectedEmployee').on('click', '.removeSelectedTag', function () {
        var id = $(this).attr('data-id');
        $('#Employee_' + id).parent().remove();
        $('#ddlEmployee').multiselect('deselect', id);
        $('#ddlEmployee').multiselect('refresh');
        $('#ddlEmployee option[value="' + id + '"]').prop('disabled', false);
        $('#ddlEmployee option[value="' + id + '"]').parent('li').removeClass('disabled');
        $('#ddlEmployee').multiselect('refresh');
        if (!$('#ddlEmployee').val()) {
            $('#divSelectedEmployee').css('display', 'none')
        }
        else {
            $('#divSelectedEmployee').css('display', 'block')
        }
    });
}


