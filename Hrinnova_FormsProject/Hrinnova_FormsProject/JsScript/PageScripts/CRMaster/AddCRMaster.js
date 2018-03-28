$.validator.setDefaults({ ignore: null });


$(document).ready(function () {
    //#General_Aspects cal for total amount
    $('#txtHourlyRate, #txtEstimateHours').keyup(function () {
        $('#txtTotalAmount').val();
        var txtHourlyRate = parseFloat($('#txtHourlyRate').val() || 0);
        var txtEstimateHours = parseFloat($('#txtEstimateHours').val() || 0);
        if (txtHourlyRate > 0 && txtEstimateHours > 0) {
            $('#txtTotalAmount').val((txtHourlyRate * txtEstimateHours).toFixed(2));
            ResetAllCost()
        }
        else {
            $('#txtTotalAmount').val("");
        }
    });
    $(document).on('blur', '.clsPaymentPercent', function () {
        var percent = $(this).val();
        var cost = $('#txtTotalAmount').val();
        if ($.isNumeric(cost) && $.isNumeric(percent)) {
            var amount = (parseFloat(cost) * parseFloat(percent)) / parseFloat(100);
            $(this).parent('td').parent('tr').find('.clsPaymentAmount').val(amount.toFixed(2));
        }
        LoadTotalAmount();
        LoadTotalPercentage();
    })
    $(document).on('blur', '.clsPaymentAmount', function () {
        var objPercent = $(this).parent('td').parent('tr').find('.clsPaymentPercent');

        var amount = $(this).val();
        var cost = $('#txtTotalAmount').val();

        if ($.isNumeric(cost) && $.isNumeric(amount)) {
            var percent = (parseFloat(100) * parseFloat(amount)) / parseFloat(cost);
            objPercent.val(percent);
        }
        LoadTotalAmount();
        LoadTotalPercentage();
    })
    $('.timepicker').datepicker({ autoclose: true, format: genericDateFormate });
    //#Uploaded file 
    $(document).on('change', '.clsPINDoc', function () {
        var fileName = $(this).val().split('\\').pop();
        var clspinname = $(this).attr('id')
        var splitname = clspinname.split("_");
        var nameoffile = "input[name='DocumentDetails[" + splitname[1] + "].DisplayName']";
        //$('input[name="DocumentDetails[1].FileName"]').val(fileName);
        $(nameoffile).val(fileName);
        $(this).closest('td').siblings('.clsDocName').html(fileName);
    });
    $(document).on('click', '.removeUpload', function (e) {
        e.preventDefault();
        $(this).closest('td').parent('tr').remove();
    });

    $(document).on('change', '.clsDrpPINDocType', function (e) {

        e.preventDefault();
        var downloadLinkId = '#' + $(this).attr("data-downloadLinkId");
        if ($(this).val() == '') {
            $(downloadLinkId).attr('href', '').hide();
            $(this).parent('td').siblings().find('.lblPINDoc').hide();
        }
        else {
            $.ajax({
                url: '/CRDetails/GetDocumentTypeDetails',
                type: 'get',
                data: { documentTypeId: $(this).val() },
                dataType: 'html',
                async: false,
                success: function (data) {
                    var result = JSON.parse(data);
                    if (result.TemplatePath == '') {
                        $(downloadLinkId).attr('href', '#').css('display', 'none');
                    }
                    else {
                        $(downloadLinkId).attr('href', result.TemplatePath).css('display', 'block');
                    }
                }
            });
            $(this).parent('td').siblings().find('.lblPINDoc').show();
        }
    });
    $("#btnCrDetails").click(function () {
        AddCrdetails();
    });

    


    $(document).on("click", "#addMilestone", function (e) {
        e.preventDefault();

        //var index = $('#tblCrDetails tr:last').attr('data-Index');
        var index = $('#tblCrDetails tr').length;

        if (!$.isNumeric(index)) {
            index = 1;
        }


    
        ClearAllValidations()

        var customValidationSummary = $("#customValidationSummary_Client")

        var errorMessage = ValidateMilestones();
        if (errorMessage.length === 0) {
            $.ajax({
                url: '/Crdetails/GetDynamicRowForCostAspectsGrid',
                type: 'get',
                data: { index: (parseInt(index) + 1) },
                dataType: 'html',
                success: function (data) {
                    $('#tblCrDetails tr:last').after(data);
                    initMilestoneExpectedDate();
                    resetFormValidator("#Crform")
                }
            });
        }
        else {
            for (var i = 0; i < errorMessage.length; i++) {
                customValidationSummary.find('ul').append("<li>" + errorMessage[i] + "</li>")
            }
            customValidationSummary.show();
            window.scrollTo(0, 0);
        }
    });




 //#Dynamic row for documents
    $(document).on("click", "#addMoreDoc", function (e) {
        e.preventDefault();
        var index = $('#tblCrDetails tr:last').attr('data-Index');

        $.ajax({
            url: '/Crdetails/GetDynamicRowForDocumentsGrid',
            type: 'get',
            data: { index: $('#tblCRDoc tr').length },
            dataType: 'html',
            success: function (data) {
                $('#tblCRDoc tr:last').after(data);
                $('#tblCRDoc tr:last').find('td').find('.chosen-select').chosen();
            }
        });
    });
 //#Remove Upload Doc file
    $(document).on('click', '.removeUploadDoc', function (e) {
        e.preventDefault();
        $(this).closest('td').parent('tr').remove();
    });
    $(document).on('click', '.removeUpload', function (e) {
        e.preventDefault();
        var obj = $(this);
        var uploadName = $(this).attr('data-uploadName');
        if (uploadName != '') {
            $.ajax({
                url: "/CRDetails/CrDocUploadedDelete",
                type: 'post',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ uploadName: uploadName }),
                success: function (result) {
                    obj.closest('td').parent('tr').remove();
                }
            })
        }
        else {
            obj.closest('td').parent('tr').remove();
        }
    });
//#Cr details save call 
    $('#submit').click(function (e) {
        e.preventDefault();
        ClearAllValidations()
        if ($('#Crform').valid()) {
            var disabledElements = $('#Crform').find('input:disabled');
            disabledElements.attr('disabled', false);
            var form = $('#Crform')[0];
            var formData = new FormData(form)
            disabledElements.attr('disabled', true);
            $.ajax({
                url: '/Crdetails/SaveCRDetails',
                type: 'POST',
                data: formData,
                async: false,
                contentType: "application/json;charset=utf-8",
                contentType: false,
                processData: false,
                dataType: 'html',
                success: function (data) {
                    var result = JSON.parse(data);
                   
                    if (result.Status == "Fail") {
                        var customValidationSummary = $("#customValidationSummary_Client")
                        if (result.Message.length == 0) {
                            customValidationSummary.find('ul').append("<li>Error occured while saving the data</li>")
                        }
                        else {
                            for (var i = 0; i < result.Message.length; i++) {
                                customValidationSummary.find('ul').append("<li>" + result.Message[i] + "</li>")
                            }
                            customValidationSummary.show();
                            window.scrollTo(0, 0);
                        }
                    }
                    else if (result.Status == "Success" ) {
                        window.location.href = '/CrListing/Index';
                    }
                    else if(data == true)
                    {
                        alert("call");
                        window.location.href = '/CrListing/Index';
                    }

                },
                error: function (xhr, status, error) {
                    alert(err.Message);
                }
            });
        }
        else {
            window.scrollTo(0, 0);
        }
    }) 
    $(window).on('load', function () {
        var id = $("#ID").val();
        if (id == 0) {
            $("#addMilestone").trigger("click");
        }
    });
});


//Clear All Validations
function ClearAllValidations() {

    $('#customValidationSummary_Client').hide().find('ul').html('');

    $('#customValidationSummary').html('');

    $('.validation-summary-errors')
    .removeClass('validation-summary-errors')
    .addClass('validation-summary-valid');

}

//customization Validation for CR Milestones ExpectedDate
function initMilestoneExpectedDate() {
    $('.ExpectedDate').each(function () {
        var date = $(this).val();
        if (date != '') {
            dateTimePickerInitDynamic(this, date);
        }
        else {
            var nowDate = new Date();
            var todayDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
            dateTimePickerInitDynamic(this, todayDate);
        }
    });
}

//customization Validation for CR Milestones Tabs
function ValidateMilestones() {  

    var errorMessage = new Array();
    var reqlength_PaymentMilestones = $('.PaymentMilestones').length;

    var value_PaymentMilestones = $('.PaymentMilestones').filter(function () {
        return this.value != '';
    });

    if (value_PaymentMilestones.length >= 0 && (value_PaymentMilestones.length !== reqlength_PaymentMilestones)) {
        errorMessage.push("Please enter payment milestone");
    }

    var reqlength_PaymentPercent = $('.PaymentPercent').length;

    var value_PaymentPercent = $('.PaymentPercent').filter(function () {
        return this.value != '';
    });

    if (value_PaymentPercent.length >= 0 && (value_PaymentPercent.length !== reqlength_PaymentPercent)) {
        errorMessage.push("Please enter payment percentage");
    }

    var reqlength_Amount = $('.Amount').length;

    var value_Amount = $('.Amount').filter(function () {
        return this.value != '';
    });

    if (value_Amount.length >= 0 && (value_Amount.length !== reqlength_Amount)) {
        errorMessage.push("Please enter amount");
    }

    var reqlength_ExpectedDate = $('.ExpectedDate').length;

    var value_ExpectedDate = $('.ExpectedDate').filter(function () {
        return this.value != '';
    });

    if (value_ExpectedDate.length >= 0 && (value_ExpectedDate.length !== reqlength_ExpectedDate)) {
        errorMessage.push("Please enter expected date");
    }

    return errorMessage;
}
function ResetAllCost() {
    $('.clsPaymentPercent').each(function () {
        var percent = $(this).val();
        var cost = $('#txtTotalAmount').val();
        if ($.isNumeric(cost) && $.isNumeric(percent)) {
            var amount = (parseFloat(cost) * parseFloat(percent)) / parseFloat(100);
            $(this).parent('td').parent('tr').find('.clsPaymentAmount').val(amount.toFixed(2));
        }
    });
}
function LoadTotalPercentage() {
    var totalPercent = 0;
    $('.clsPaymentPercent').each(function () {
        var percent = $(this).val();
        if ($.isNumeric(percent)) {
            totalPercent = parseFloat(totalPercent) + parseFloat(percent);
        }
    });
    $('#totalMilestonPercent').html(totalPercent.toFixed(2))
}
function LoadTotalAmount() {
    var totalAmount = 0;
    $('.clsPaymentAmount').each(function () {
        var amount = $(this).val();
        if ($.isNumeric(amount)) {
            totalAmount = parseFloat(totalAmount) + parseFloat(amount);
        }
    });
    $('#totalMilestonAmount').html(totalAmount.toFixed(2))
}