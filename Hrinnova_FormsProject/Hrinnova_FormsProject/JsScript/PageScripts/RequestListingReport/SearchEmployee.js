$(document).ready(function () {
    initDatePicker();
    $(document).on('click', 'input[name="duration"]', function () {
        if (this.value == 'Monthly') {
            $('#monthlyConfiguration').show();
            $('#consolidatedConfiguration').hide();
            $('#fromDate').val('');
            $('#toDate').val('')
        }
        else if (this.value == 'Consolidated') {
            $('#monthlyConfiguration').hide();
            $('#consolidatedConfiguration').show();
            $('#month').val('').trigger('chosen:updated');
            $('#year').val('').trigger('chosen:updated');
        }
    });
    $(document).on('change', '#Company', function () {
        var companyId = this.value;
        $.ajax({
            url: "GetBranchByCompany",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: { companyId: companyId },
            success: function (data) {
                $('#Branch').html('')

                var defaultOpt = new Option("Select branch", null);

                $('#Branch').append(defaultOpt);

                for (var i = 0; i < data.length; i++) {
                    var opt = new Option(data[i].Text, data[i].Value);
                    $('#Branch').append(opt);
                }
                $('#Branch').trigger('chosen:updated');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText)
            }
        });
        BindEmployee()
    });
    $(document).on('change', '#Department', function () {
        var departmentId = this.value;
        $.ajax({
            url: "GetProjectsByDepartment",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: { departmentId: departmentId },
            success: function (data) {
                $('#Project').html('')

                var defaultOpt = new Option("Select project", null);

                $('#Project').append(defaultOpt);

                for (var i = 0; i < data.length; i++) {
                    var opt = new Option(data[i].Text, data[i].Value);
                    $('#Project').append(opt);
                }
                $('#Project').trigger('chosen:updated');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText)
            }
        });
        BindEmployee()
    });
    $(document).on('change', '#Client', function () {
        var clientId = this.value;
        $.ajax({
            url: "GetProjectsByClient",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: { clientId: clientId },
            success: function (data) {
                $('#Project').html('')

                var defaultOpt = new Option("Select project", null);

                $('#Project').append(defaultOpt);

                for (var i = 0; i < data.length; i++) {
                    var opt = new Option(data[i].Text, data[i].Value);
                    $('#Project').append(opt);
                }
                $('#Project').trigger('chosen:updated');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText)
            }
        });
        BindEmployee()
    });
    $(document).on('change', '#Project', function () {
        BindEmployee()
    });
    $(document).on('change', '#Branch', function () {
        BindEmployee()
    });
    $(document).on('click', '#lblFromDate', function (event) {
        event.preventDefault();
        $('#fromDate').focus();
    });
    $(document).on('click', '#lblToDate', function (event) {
        event.preventDefault();
        $('#toDate').focus();
    });
    $(document).on('click', '#btnSearch', function () {
        var isValid = false;
        if (hasOrgLevelRights == 'True') {
            isValid = ValidateFormForHR();
        }
        else {
            isValid = ValidateFormForManager();
        }
        if (isValid) {
            $('#frmGetRequestListingReport').submit();
        }
    });
    $(document).on('click', 'input[name="typeOfReport"]', function () {
        if (this.value == 'Summary') {
            $('#divDuration').css('visibility', 'visible');
        }
        else if (this.value == 'Detail') {
            $('#divDuration').css('visibility', 'hidden')
            $("#CustomDates").attr('checked', 'checked').click();
        }
    });
    $(document).on('click', '#btnReset', function () {
        $.ajax({
            url: 'SearchEmployee',
            data: 'html',
            type: 'get',
            success: function (data) {
                $('#divSearchEmployee').html('').html(data);
                initDatePicker()
                SetupRadioButtons()
                chosen_init()
                $('#reportPanel').show();
                $('#divReport').html('')
            }
        });
    });
});
function BindEmployee() {
    var Company = $('#Company').val();
    var Department = $('#Department').val();
    var Project = $('#Project').val();
    var Client = $('#Client').val();
    var Branch = $('#Branch').val();

    $.ajax({
        url: "GetEmployeeByFilter",
        type: 'POST',
        cache: false,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ company: Company, dept: Department, project: Project, client: Client, branch: Branch }),
        success: function (data) {
            $('#drpEmployee').html('');
            $('#drpEmployee').trigger('chosen:updated');
            //var defaultOpt = new Option("Select project", nul0l);

            //$('#Employee').append(defaultOpt);

            for (var i = 0; i < data.length; i++) {
                //var opt = new Option(data[i].Text, data[i].Value);
                //$('#Employee').append(opt);
                $("#drpEmployee").append($("<option></option>").val
                    (data[i].Value).html(data[i].Text));
            }
            //$('#Employee').trigger('liszt:updated');
            $('#drpEmployee').trigger('chosen:updated');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText)
        }
    });
}
function ValidateFormForHR() {
    var company = $('#Company').val();
    var project = $('#Project').val();
    var client = $('#Client').val();
    var fromDate = $('#fromDate').val();
    var toDate = $('#toDate').val();
    var duration = $('input[name="duration"]:checked').val()
    var month = $('#month').val();
    var year = $('#year').val();

    if (company == '') {
        toastr.clear()
        toastr.error('Please select company');
        return false;
    }
    if (duration == 'Consolidated') {
        if (fromDate == '') {
            toastr.clear()
            toastr.error('Please select from date');
            return false;
        }
        if (toDate == '') {
            toastr.clear()
            toastr.error('Please select to date');
            return false;
        }
        if (fromDate != '' && toDate != '') {

            var tempFromDate = convertToDate(fromDate);
            var tempToDate = convertToDate(toDate);

            if (tempToDate < tempFromDate) {
                toastr.clear()
                toastr.error('From date can not be greater than to date');
                return false;
            }
        }
    }
    else if (duration == 'Monthly') {
        if (month == '') {
            toastr.clear()
            toastr.error('Please select month');
            return false;
        }
        if (year == '') {
            toastr.clear()
            toastr.error('Please select year');
            return false;
        }
    }
    return true;
}
function ValidateFormForManager() {
    var project = $('#Project').val();
    var client = $('#Client').val();
    var fromDate = $('#fromDate').val();
    var toDate = $('#toDate').val();
    var duration = $('input[name="duration"]:checked').val()
    var month = $('#month').val();
    var year = $('#year').val();

    if (project == '' && client == '') {
        toastr.clear()
        toastr.error('Please select either project or client');
        return false;
    }
    if (duration == 'Consolidated') {
        if (fromDate == '') {
            toastr.clear()
            toastr.error('Please select from date');
            return false;
        }
        if (toDate == '') {
            toastr.clear()
            toastr.error('Please select to date');
            return false;
        }
        if (fromDate != '' && toDate != '') {

            var tempFromDate = convertToDate(fromDate);
            var tempToDate = convertToDate(toDate);

            if (tempToDate < tempFromDate) {
                toastr.clear()
                toastr.error('From date can not be greater than to date');
                return false;
            }
        }
    }
    else if (duration == 'Monthly') {
        if (month == '') {
            toastr.clear()
            toastr.error('Please select month');
            return false;
        }
        if (year == '') {
            toastr.clear()
            toastr.error('Please select year');
            return false;
        }
    }
    return true;
}
function convertToDate(dateStr) {
    var parts = dateStr.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]);
}
function updateRequestListingReport(data) {
    $('#reportPanel').show();
    $('#divReport').html(data)
    $('#reportMessage').html(getReportMessage());
    ej.widget.init($("#divReport"));
}
function GetMonthName(monthNo) {
    var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[parseInt(monthNo - 1)];
}
function getReportMessage() {

    var type = $($('input[name="typeOfReport"]:checked')).val();
    var message = '';
    if (type == 'Summary') {
        var duration = $('input[name="duration"]:checked').val();
        if (duration == 'Monthly') {
            var month = $('#month').val();
            var year = $('#year').val();

            var monthName = GetMonthName(month);

            message = "Leave/ Request Report of " + monthName + " - " + year;

        }
        else if (duration == 'Consolidated') {
            var fromDate = $('#fromDate').val();
            var toDate = $('#toDate').val();

            var tempFromDate = convertToDate(fromDate);
            var tempToDate = convertToDate(toDate);

            message = "Consolidated Report for " + formatDate(tempFromDate) + " to " + formatDate(tempToDate);
        }
    }
    else if (type == 'Detail') {
        var fromDate = $('#fromDate').val();
        var toDate = $('#toDate').val();

        var tempFromDate = convertToDate(fromDate);
        var tempToDate = convertToDate(toDate);

        message = "Leave Transaction Report for " + formatDate(tempFromDate) + " to " + formatDate(tempToDate);
    }
    return message;
}
function formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = ordinal_suffix_of(date.getDate());
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}
function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}
function initDatePicker() {
    $('.datepicker').each(function (i, obj) {
        $(this).datepicker({
            format: 'dd/mm/yyyy',
            'setDate': new Date(),
            autoclose: true,
            allowInputToggle: true
        })
    });
}