$(document).ready(function () {
    //BindGrid();

    InitDrpEmploee();

    $(document).on("click", "#btnSearch", function () {
        var errorMessage = "";

        $('#searchEmployeeValidationMessage').children('ul').html('');
        $('#searchEmployeeValidationMessage').css('display', 'none');
        if ($.isNumeric($('#drpCompany').val())) {
            if (parseInt($('#drpToYear').val()) >= parseInt($('#drpYear').val())) {
                if (parseInt($('#drpToYear').val()) == parseInt($('#drpYear').val())) {
                    if (parseInt($('#drpMonth').val()) <= parseInt($('#drpToMonth').val())) {
                        BindGrid();
                    }
                    else {
                        errorMessage += "<li>Please select proper From Month and To Month</li>";
                        $('#searchEmployeeValidationMessage').children('ul').append(errorMessage);
                        $('#searchEmployeeValidationMessage').css('display', 'block')
                    }
                }
                else {
                    BindGrid();
                }
            }
            else {
                errorMessage += "<li>To Year can not be less than From Year</li>";
                $('#searchEmployeeValidationMessage').children('ul').append(errorMessage);
                $('#searchEmployeeValidationMessage').css('display', 'block')
            }
        }
        else {
            errorMessage += "<li>Please select company</li>";
            $('#searchEmployeeValidationMessage').children('ul').append(errorMessage);
            $('#searchEmployeeValidationMessage').css('display', 'block')
        }
    });

    $(document).on("change", "#drpCompany", function () {
        ShowProgress();
        LoadEmployeeListForDeptFilter($('#drpCompany').val());
        HideProgress();
    });

    $(document).on("click", "#btnReset", function () {
        var dateObj = new Date();
        var thisMonth = dateObj.getMonth() + 1;
        var thisYear = dateObj.getFullYear();
        ShowProgress();
        $('#drpMonth').val(thisMonth).trigger("chosen:updated");
        $('#drpYear').val(thisYear).trigger("chosen:updated");
        $('#drpToMonth').val(thisMonth).trigger("chosen:updated");
        $('#drpToYear').val(thisYear).trigger("chosen:updated");
        $('#drpCompany').val('').trigger("chosen:updated");
        $('#searchEmployeeValidationMessage').children('ul').html('');
        $('#searchEmployeeValidationMessage').css('display', 'none');
        $("#drpEmployees option:selected").prop("selected", false);
        $('#drpEmployees').multiselect('refresh');
        $('#divLeaveBalSummary').empty();
        HideProgress();
    });
});
function BindGrid() {

    var CompanyId =  $('#drpCompany').val();
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
    
    if ( CompanyId == 0 ) {
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

function HideProgress() {
    $('.loader-wrapper').css('display', 'none');
}

function ShowProgress() {

    if ($('.loader-wrapper').css('display') == "none") {
        $(".loader-wrapper").show();
    }
}

function InitDrpEmploee()
{
    $('#drpEmployees').multiselect({
        enableFiltering: true,
        numberDisplayed: 1,
        filterBehavior: 'text',
        includeSelectAllOption: true,
        enableCaseInsensitiveFiltering: true,
        buttonWidth: '100%',
        disableIfEmpty: true,
        //selectAllJustVisible: false,
        templates: {
            filter: '<li class="multiselect-item filter"><div class="input-group"><input class="form-control multiselect-search" type="text"></div></li>',
            filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default multiselect-clear-filter" type="button"><i class="glyphicon glyphicon-remove-circle"></i></button></span>',


        },
       
        maxHeight: 200,
    });
}
