$(document).ready(function () {
    $("#ddlFromyear").chosen();
    $("#ddlToyear").chosen();
    chosen_init();
    $("#txtTotalHolidays").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A, Command+A
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    $('#btnSaveHolidayList').click(function () {
        var HolidayListId = $('#hdnHolidayListID').val();
        var HolidayName = $('#txtHolidayListName').val();
        var DisplayId = $('#txtDisplayId').val();
        var TotalHolidays = $('#txtTotalHolidays').val();
        var status = ValidateHolidayList(HolidayName, DisplayId, TotalHolidays);

        var $form = $(this).closest('form');
        if (status) {
            $.ajax({
                type: "POST",
                url: $form.attr('action'),
                data: $form.serialize(),
                success: function (data) {
                    if (data) {
                        if (data.Success) {
                            $('#NewHolidayListModal').modal('toggle');
                            toastr.success(data.Message);
                            location.reload();
                        }
                        else
                            toastr.error(data.Message);
                    }

                    //ResetForm();
                }
            })
        }
    })
    $('.selectedChk').change(function () {
        var iTag = $(this).closest('tr').find('.chkMandatory').children();
        var MandatoryChk = $(this).closest('tr').find('.chkMandatory');
        var Mandatory = $('#lblMandatoryCount').text();
        var Optional = $('#lblOptionalCount').text();
        var inputId = $(MandatoryChk).attr('data-inputFieldId');
        var IsInputChk = $(MandatoryChk).attr('data-inputChkField');
        if ($(this).is(':checked')) {
            $(iTag).removeClass('fa-disable');
            $(iTag).addClass('text-danger');
            if ($(MandatoryChk).children().hasClass('fa fa-asterisk text-danger')) {
                //$(Mandatory).removeAttr('disabled');
                Mandatory = parseInt(Mandatory) + 1;
                //if (parseInt(Optional) != 0)
                //    Optional = parseInt(Optional) - 1;
                $('#lblMandatoryCount').text(Mandatory);
                $('#lblOptionalCount').text(Optional);
                $('[name="' + inputId + '"').val(true);
            }
            else {
                if (parseInt(Mandatory) != 0)
                    Mandatory = parseInt(Mandatory) - 1;
                Optional = parseInt(Optional) + 1;
                $('#lblMandatoryCount').text(Mandatory);
                $('#lblOptionalCount').text(Optional);
                $('[name="' + inputId + '"').val(false);
            }
            
            $('[name="' + IsInputChk + '"').val(true);// For maintain old and new holiday selection 
        }
        if (!$(this).is(':checked')) {
            var iTag = $(this).closest('tr').find('.chkMandatory').children();
            var ExistingClass = iTag.attr('class');
            $(iTag).addClass('fa-disable');
            $(iTag).removeClass('text-danger');
            if (ExistingClass == "fa fa-asterisk fa-disable") {
                if (parseInt(Optional) != 0)
                    Optional = parseInt(Optional) - 1;
                $('#lblOptionalCount').text(Optional);
            }
            else {
                if (parseInt(Mandatory) != 0)
                    Mandatory = parseInt(Mandatory) - 1;
                $('#lblMandatoryCount').text(Mandatory);
            }
            $('[name="' + IsInputChk + '"').val(false);// For maintain old and new holiday selection 
        }
    })

    $('.chkMandatory').on("click", function () {
        if ($(this).hasClass("disabled") == 0)
        {
           
            var selectedChk = $(this).closest('tr').find('.selectedChk');
            var Mandatory = $('#lblMandatoryCount').text();
            var Optional = $('#lblOptionalCount').text();

            var inputId = $(this).attr('data-inputFieldId');

            if ($(selectedChk).is(":checked")) {
                var iTag = $(this).children();
                if ($(iTag).hasClass('fa fa-asterisk fa-disable')) {
                    $('[name="' + inputId + '"').val(true);
                    $(iTag).removeClass('fa-disable');
                    $(iTag).addClass('text-danger');
                }
                else {
                    $('[name="' + inputId + '"').val(false);
                    $(iTag).addClass('fa-disable');
                    $(iTag).removeClass('text-danger');
                }
                if ($(this).children().hasClass('fa fa-asterisk text-danger')) {
                    Mandatory = parseInt(Mandatory) + 1;
                    if (parseInt(Optional) != 0)
                        Optional = parseInt(Optional) - 1;
                    $('#lblMandatoryCount').text(Mandatory);
                    $('#lblOptionalCount').text(Optional);
                }
                else {
                    if (parseInt(Mandatory) != 0)
                        Mandatory = parseInt(Mandatory) - 1;
                    Optional = parseInt(Optional) + 1;
                    $('#lblMandatoryCount').text(Mandatory);
                    $('#lblOptionalCount').text(Optional);

                }
            }
        }
       


    })

    $('#ddlFromyear').change(function () {
        var yearFromvalue = $(this).val();
        var yearTovalue = $("#ddlToyear").val();
        $("#ddlFromyear").val();
        if ($("#ddlFromyear").val() != "") {
           // $("#tbodyholidylst").hide();
            $("#tbodyholidylst tr.holiday-row").each(function () {
                if ($(this).data("hoildaydate") != "0") {
                    var Fromyear = parseInt($(this).data("hoildaydate"));
                    if ((Fromyear == yearFromvalue || Fromyear > yearFromvalue) && Fromyear <= yearTovalue) {
                        $(this).closest('tr').show();
                    }
                    else {
                        $(this).closest('tr').hide();
                    }
                }
                else {
                    $(this).closest('tr').show();
                }

            });
        }
    });
    $('#ddlToyear').change(function () {
        var yearTovalue = $(this).val();
        var yearFromvalue = $("#ddlFromyear").val();
        $("#ddlFromyear").val();
        if ($("#ddlFromyear").val() != "") {
            //$("#tbodyholidylst").hide();
            $("#tbodyholidylst tr.holiday-row").each(function () {
                if ($(this).data("hoildaydate") != "0") {
                    var year = parseInt($(this).data("hoildaydate"));
                    if ((year == yearTovalue || year < yearTovalue) && year >= yearFromvalue) {
                        $(this).closest('tr').show();
                    }
                    else {
                        $(this).closest('tr').hide();
                    }
                }
                else {
                    $(this).closest('tr').show();
                }

            });
        }
    });
    SearchFromToHoliday();
})
function ValidateHolidayList(HolidayName, DisplayId, TotalHolidays) {
    $('#validatemsg').html('');
    $('#validatemsg').empty();
    var OptionalHoliday = parseInt($("#lblOptionalCount").text());
    var errorMessage = "";
    var status = true;
    $('#errorMessage').empty();
    if (DisplayId == "") {
        errorMessage += "<li>Please Enter Holiday Code</li>";
        status = false;
    }
    if (HolidayName == "") {
        errorMessage += "<li>Please Enter Holiday Group Name</li>";
        status = false;
    }

    if (TotalHolidays == "0" || TotalHolidays == "") {
        errorMessage += "<li>Please Enter total Holiday</li>";
        status = false;
    }
    if (OptionalHoliday > 0) {
        var MandatoryCount = parseInt($("#lblMandatoryCount").text());
        if (MandatoryCount >= TotalHolidays) {
            errorMessage += "<li>Considering optional holidays selected, 'mandatory holidays' should not be equal or greater than 'total holidays' defined</li>";
            status = false;
        }
    }
    if (status == false && errorMessage != null) {
        $('#validatemsg').addClass('alert alert-danger');
        $('#validatemsg').html("<ul>" + errorMessage + "</ul>");
    }
    return status;
}
function ValidHolidays(TotalHolidays, CheckedHoliday) {


}
function SearchFromToHoliday() {
    var yearFromvalue = $("#ddlFromyear").val();
    var yearTovalue = $("#ddlToyear").val();
    $("#ddlFromyear").val();
    if ($("#ddlFromyear").val() != "") {
        // $("#tbodyholidylst").hide();
        $("#tbodyholidylst tr.holiday-row").each(function () {
            if ($(this).data("hoildaydate") != "0") {
                var Fromyear = parseInt($(this).data("hoildaydate"));
                if ((Fromyear == yearFromvalue || Fromyear > yearFromvalue) && Fromyear <= yearTovalue) {
                    $(this).closest('tr').show();
                }
                else {
                    $(this).closest('tr').hide();
                }
            }
            else {
                $(this).closest('tr').show();
            }

        });
    }
}

