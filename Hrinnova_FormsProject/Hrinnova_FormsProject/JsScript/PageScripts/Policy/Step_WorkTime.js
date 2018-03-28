$(document).ready(function () {

    $(document).on('click', '#HourlyWorkingType', function () {
        //if ($('#Timings_Flexible').is(':checked') == false) {
        //    $('#Timings_Flexible').click();
        //}
        if ($(this).is(':checked')) {
            $('#ConfigureBreaks_Fixed').attr('checked', false).change();
            $('.breaks').hide();
            $('#chkCreateExcemption').attr('checked', false).change();
            $('.excemptionBreaks').hide();
            $('#Timings_Flexible').click();
            $('#Timings_Flexible').change();
            $('#fixed').hide();
            $('#divTimings').css('display', 'none');
            $('#ConfigureMonthlyMinGross').css('display', 'block');
        }

        //$('#divTimingsText').css('display', 'none');
    });
    $(document).on('click', '#MonthlyWorkingType', function () {
        if ($(this).is(':checked')) {
            $('#fixed').show();
            $('#Timings_Flexible').click();
            $('#Timings_Flexible').change();
            $('#ConfigureMonthlyMinGross').css('display', 'none');
            $('#MonthlyMinGross').val('');
            $('#MonthlyMinGross_Hrs').val(0).trigger('chosen:updated')
            $('#MonthlyMinGross_Mins').val(0).trigger('chosen:updated')
        }
        $('#divTimings').css('display', 'block');
    });
    //$('#divTimingsText').css('display', 'block');
    $(document).on('change', '#Timings_Flexible', function () {
        if ($(this).is(':checked')) {
            $('#ConfigureDayMinReqHours').css('display', 'block');
            $('#ConfigureExcemption').css('display', 'block');
            //$('#ExemptionLimit').val('');
            //$('#ExemptionTimeLimit').val('');
            if ($('#HourlyWorkingType').is(':checked')) {
                $('#divDayMinGross').css('display', 'none');
                $('#DayMinGross').val('');
                $('#DayMinGross_Hrs').val(0).trigger('chosen:updated');
                $('#DayMinGross_Mins').val(0).trigger('chosen:updated');
                $('#divHalfDayMinNet').css('display', 'none');
                $('#HalfDayMinNet').val('');
                $('#HalfDayMinNet_Hrs').val(0).trigger('chosen:updated');
                $('#HalfDayMinNet_Mins').val(0).trigger('chosen:updated');
                $('#ConfigureBreaks').css('display', 'none');
                $('#BreakLimit').val('');
                $('#BreakTimeLimit').val('');
                $('#workTimeStepValidationMessage').children('ul').html('');
                $('#workTimeStepValidationMessage').css('display', 'none');
            }
            else {
                $('#divDayMinGross').css('display', 'block');
                $('#divHalfDayMinNet').css('display', 'block');
                $('#ConfigureBreaks').css('display', 'block');
            }
        }
    });
    $(document).on('change', '#Timings_Fixed', function () {
        if ($(this).is(':checked')) {
            $('#ConfigureDayMinReqHours').css('display', 'none');
            $('#DayMinReqHours').val('');
            $('#DayMinReqHours_Hrs').val(0).trigger('chosen:updated');
            $('#DayMinReqHours_Mins').val(0).trigger('chosen:updated');
            $('#ConfigureExcemption').css('display', 'block');
            $('#divDayMinGross').css('display', 'block');
            $('#divHalfDayMinNet').css('display', 'block');
            $('#ConfigureBreaks').css('display', 'block');
            $('#workTimeStepValidationMessage').children('ul').html('');
            $('#workTimeStepValidationMessage').css('display', 'none');
        }
    });

    $(document).on('click', '#SaveWorkTimeStep', function (event) {
        //$('#SaveWorkTimeStep').click(function (event) {
        //debugger
        //assignDayMinGrossValuesToHours();
        assignValueToHoursField($('#DayMinGross_Hrs'), $('#DayMinGross_Mins'), $('#DayMinGross'));
        //assignDayMinNetValuesToHours();
        assignValueToHoursField($('#DayMinNet_Hrs'), $('#DayMinNet_Mins'), $('#DayMinNet'));
        //assignHalfDayMinNetValuesToHours()
        assignValueToHoursField($('#HalfDayMinNet_Hrs'), $('#HalfDayMinNet_Mins'), $('#HalfDayMinNet'));

        assignValueToHoursField($('#DayMinReqHours_Hrs'), $('#DayMinReqHours_Mins'), $('#DayMinReqHours'));

        assignValueToHoursField($('#ExemptionTimeLimit_Hrs'), $('#ExemptionTimeLimit_Mins'), $('#ExemptionTimeLimit'));

        assignValueToHoursField($('#MonthlyMinGross_Hrs'), $('#MonthlyMinGross_Mins'), $('#MonthlyMinGross'));

        var errorMessage = "";

        $('#workTimeStepValidationMessage').children('ul').html('');
        $('#workTimeStepValidationMessage').css('display', 'none');


        var form = $("#Form")
            .removeData("validator") /* added by the raw jquery.validate plugin */
            .removeData("unobtrusiveValidation");

        $.validator.unobtrusive.parse(form);

        var validator = $("#Form").validate();

        if ($("#chkCreateExcemption").is(":checked") && $("#ExemptionType_NetHours").is(":checked") && $("#ExemptionTimeLimit").val() == "") {
            errorMessage += "<li>Please enter Min. hrs on day of exemption.</li>";
        }

        $("#divStepWorkTime :input").each(function () {

            var name = $(this).attr('name');

            var id = $(this).attr('id');

            if (typeof name === "undefined") {
                return true;
            }
            if ($('#HourlyWorkingType').is(':checked')) {
                if ($(this).attr('id') == 'ExemptionLimit' || $(this).attr('id') == 'ExemptionTimeLimit' || $(this).attr('id') == 'DayMinGross' || $(this).attr('id') == 'HalfDayMinNet' || $(this).attr('id') == 'BreakLimit' || $(this).attr('id') == 'BreakTimeLimit') {
                    return true;
                }
            }
            if ($('#Timings_Fixed').is(':checked')) {
                if ($(this).attr('id') == 'DayMinReqHours') {
                    return true;
                }
            }
            if ($(this).attr('id') == 'ExemptionLimit' || $(this).attr('id') == 'ExemptionTimeLimit') {
                //if ($('#chkCreateExcemption').prop("checked") == false || $('#Timings_Fixed').prop("checked") == false) {
                if ($('#chkCreateExcemption').prop("checked") == false) {
                    return true;
                }
            }
            validator.element('[name="' + name + '"]');

            for (i = 0; i < validator.errorList.length; i++) {
                errorMessage += "<li>" + validator.errorList[i].message + "</li>";
            }
        });
        if (errorMessage == "") {
            var dailyGross = $('#DayMinGross').val();
            var dailyNet = $('#DayMinNet').val();
            if ($('#MonthlyWorkingType').is(':checked')) {
                if (Math.round(dailyGross * 100) < Math.round(dailyNet * 100)) {
                    errorMessage += "<li>Daily min net hrs can not be greater than daily gross hrs</li>";
                }
            }

        }
        if (errorMessage == "") {
            if ($('#ConfigureBreaks_Fixed').is(':checked') && $('#Timings_Fixed').is(':checked')) {
                if ($('#BreakLimit').val() == '' && $('#BreakTimeLimit').val() == '') {
                    errorMessage += "<li>Please enter atleast one value for configuring breaks.</li>";
                }
            }
        }
        if (errorMessage == "") {
            if (($('#HourlyWorkingType').is(':checked') || $('#Timings_Flexible').is(':checked')) && $('#DayMinNet').val() != '' && $('#DayMinReqHours').val() != '') {
                var dailyNet = $('#DayMinNet').val();
                var dailyRequired = $('#DayMinReqHours').val();

                if (Math.round(dailyRequired * 100) < Math.round(dailyNet * 100)) {
                    errorMessage += "<li>Daily min net hrs can not be greater than required Avg net hrs.</li>";
                }
            }
        }

        if (errorMessage == "") {
            var step_no = $(this).data("nextstep");
            for (var i = step_no - 1; i > 0; i--) {
                $(".step" + i).removeClass("active");
                $(".step" + i).addClass("visited");
                $(".step-content-" + i).removeClass("active");
            };
            $(".step" + step_no).addClass("active");
            $(".step-content-" + step_no).addClass("active");
            $(".progress-bar").css("width", (step_no * 25) + "%");
        }

        else {
            $('#workTimeStepValidationMessage').children('ul').append(errorMessage);
            $('#workTimeStepValidationMessage').css('display', 'block')
        }
    });
    $(document).on("keypress keyup blur", ".allownumericwithdecimal", function (event) {
        //$(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        //if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
        //    event.preventDefault();
        //}
        return isFloat(event, this)
    });

    $(document).on('change', '#ConfigureBreaks_Fixed', function () {
        if ($(this).prop("checked") == false) {
            $('#BreakLimit').val('');
            $('#BreakTimeLimit').val('');
        }
    });
    $(document).on('change', '#chkCreateExcemption', function () {
        if ($(this).prop("checked") == false) {
            $('#ExemptionLimit').val('');
            $('#ExemptionTimeLimit').val('');
            $('#ExemptionTimeLimit_Hrs').val(0).trigger('chosen:updated')
            $('#ExemptionTimeLimit_Mins').val(0).trigger('chosen:updated')
        }
    });

    $(document).on('change', '.drpHrs', function () {
        var hrs = this.value;
        if (hrs == 24) {
            $(this).siblings('.drpMins').val(0).attr('disabled', 'disabled').trigger('chosen:updated');
        }
        else {
            $(this).siblings('.drpMins').removeAttr('disabled').trigger('chosen:updated');
        }
    });
});

function isFloat(evt, element) {

    var charCode = (evt.which) ? evt.which : event.keyCode

    if (
        //(charCode != 45 || $(element).val().indexOf('-') != -1) &&       “-” CHECK MINUS, AND ONLY ONE.
        (charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
        (charCode < 48 || charCode > 57))
        return false;

    return true;
}
function assignValueToHoursField(Hrs, Mins, field) {

    var hrs = Hrs.val()

    var mins = parseInt(Mins.val(), 10) < 10 ? '' + '0' + Mins.val() : Mins.val();

    var value = hrs + '.' + mins;

    field.val(value);
}