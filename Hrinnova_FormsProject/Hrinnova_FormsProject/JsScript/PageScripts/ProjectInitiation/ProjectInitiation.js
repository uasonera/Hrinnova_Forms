//below code is use for validate hidden filed value so please do not put into document.ready
//NOTE: This code won't work if it's run inside the document ready or jQuery $(function () {}) method.
$.validator.setDefaults({ ignore: null });
EnumProjectType = { Internal: '2', FixedCost: '3', TimeandMatrial: '5', Product: '6' };
$(document).ready(function () {
    $('.timepicker').datepicker({ autoclose: true, format: genericDateFormate });
    initMilestoneExpectedDate();
    $(document).on('change', '.clsPINDoc', function () {
        var fileName = $(this).val().split('\\').pop();
        $(this).closest('td').siblings('.clsDocName').html(fileName);
    });
    $(document).on("click", "#addMoreDocument", function (e) {
        e.preventDefault();
        var index = $('#tblPINDocuments tr:last').attr('data-Index');

        if (!$.isNumeric(index)) {
            index = 0;
        }

        $.ajax({
            url: '/projectinitiation/GetDynamicRowForDocumentGrid',
            type: 'get',
            data: { index: (parseInt(index) + 1) },
            dataType: 'html',
            success: function (data) {
                $('#tblPINDocuments tr:last').after(data);
                $('#tblPINDocuments tr:last').find('td').find('.chosen-select').chosen();
            }
        });
    });
    $(document).on("click", "#addMorePINMilestones", function (e) {
        e.preventDefault();

        var index = $('#tblPINMilestones tr:last').attr('data-Index');

        if (!$.isNumeric(index)) {
            index = 1;
        }

        ClearAllValidations()

        var customValidationSummary = $("#customValidationSummary_Client")

        var errorMessage = ValidateMilestones();
        if (errorMessage.length === 0) {
            $.ajax({
                url: '/projectinitiation/GetDynamicRowForMilestoneGrid',
                type: 'get',
                data: { index: (parseInt(index) + 1) },
                dataType: 'html',
                success: function (data) {
                    $('#tblPINMilestones tr:last').after(data);
                    initMilestoneExpectedDate();
                    resetFormValidator('#form0');
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
    $(document).on("click", "#addMorePINResources", function (e) {
        e.preventDefault();

        //ClearAllValidations()

        //var customValidationSummary = $("#customValidationSummary_Client")

        //var errorMessage = ValidateMilestones();
        //if (errorMessage.length === 0) {

        var index = $('#tblPINResources tr:last').attr('data-Index');

        if (!$.isNumeric(index)) {
            index = 1;
        }

        $.ajax({
            url: '/projectinitiation/GetDynamicRowForResourceGrid',
            type: 'get',
            data: { index: (parseInt(index) + 1) },
            dataType: 'html',
            success: function (data) {
                $('#tblPINResources tr:last').after(data);
                $('#noRecordsFound').hide();
                chosen_init_dynamic('.dynamicChosen');
                var nowDate = new Date();
                var todayDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);
                dateTimePickerInitDynamic(".dynamicDatePicker", todayDate);
                resetFormValidator('#form0');
                if ($('#isSameForAllResources').is(":checked")) {
                    makeBillingInfoSame();
                }
            }
        });
        //}
        //else {
        //    for (var i = 0; i < errorMessage.length; i++) {
        //        customValidationSummary.find('ul').append("<li>" + errorMessage[i] + "</li>")
        //    }
        //    customValidationSummary.show();
        //    window.scrollTo(0, 0);
        //}
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
                url: '/projectinitiation/GetDocumentTypeDetails',
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
    $(document).on('click', '.removeUpload', function (e) {
        e.preventDefault();
        var obj = $(this);
        var uploadName = $(this).attr('data-uploadName');
        if (uploadName != '') {
            $.ajax({
                url: "/projectinitiation/SetUpUploadForDelete",
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
    $(document).on('click', '.removeMilestone', function (e) {
        e.preventDefault();
        $(this).closest('td').parent('tr').remove();
        LoadTotalPercentage();
        LoadTotalAmount();
    });
    $('#submit').click(function (e) {
        var me = $(this)
        e.preventDefault();
        me.attr('disabled', true)
        ClearAllValidations()
        if ($('#form0').valid()) {
            var disabledElements = $('#form0').find('input:disabled');
            var disabledChosen = $('#form0').find('select:disabled');

            disabledElements.attr('disabled', false);
            //$('.chosen-select').attr('disabled', false).trigger("chosen:updated");

            disabledChosen.attr('disabled', false).trigger("chosen:updated");

            var form = $('#form0')[0];
            var formData = new FormData(form)

            disabledElements.attr('disabled', true);
            //$('.chosen-select').attr('disabled', true).trigger("chosen:updated");
            disabledChosen.attr('disabled', true).trigger("chosen:updated");

            $.ajax({
                url: '/projectinitiation/SavePINDetails',
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
                        me.attr('disabled', false)
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
                    else if (result.Status == "Success") {
                        window.location.href = '/PINDefinition/index';
                    }
                    else {
                        me.attr('disabled', false)
                    }
                },
                error: function (xhr, status, error) {
                    me.attr('disabled', false)
                }
            });
        }
        else {
            window.scrollTo(0, 0);
            me.attr('disabled', false)
        }
    })
    $('#ProjTypeID').change(function () {

        var projTypeId = $(this).val();
        var pinId = $('#ProjectInitiationId').val();

        $.ajax({
            url: '/ProjectInitiation/GetDocumentsView',
            type: 'post',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ pinId: pinId, projectType: projTypeId }),
            dataType: 'html',
            success: function (data) {
                $('#Documents').html(data);
                //$('.clsDrpPINDocType').chosen();
                chosen_init_dynamic('.clsDrpPINDocType');
            }
        });

        $.ajax({
            url: '/ProjectInitiation/GetViewByProjectType',
            type: 'post',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ projectType: projTypeId }),
            dataType: 'html',
            success: function (data) {
                $('#divDetailsByProjType').html(data);
                resetFormValidator('#form0');
                SetupRadioButton('.dynamicRadio')
                chosen_init_dynamic('.dynamicChosen');
                setupCheckbox('.dynamicCheckBox');
                dateTimePickerInitDynamic(".dynamicDatePicker", "");
            }
        })
    });
    $("select[id*='drpPrimaryRegion']").change(function () {
        if ($(this).val() != '') {
            LoadSecondaryRegion($(this).val());
        }
        else {
            $("select[id*='drpSecondaryregion']").empty();
            $("select[id*='drpSecondaryregion']").append(new Option('Select Secondary Region', ''));
        }

    });
    $(document).on("blur", '#Cost', function () {
        ResetAllCost()
        LoadTotalPercentage();
        LoadTotalAmount();
    });
    $(document).on("blur", '.clsPaymentPercent', function () {
        var percent = $(this).val();
        var cost = $('#Cost').val();
        if ($.isNumeric(cost) && $.isNumeric(percent)) {
            var amount = (parseFloat(cost) * parseFloat(percent)) / parseFloat(100);
            $(this).parent('td').parent('tr').find('.clsPaymentAmount').val(amount.toFixed(2));
        }

        LoadTotalPercentage();
        LoadTotalAmount();
    })
    $(document).on("blur", '.clsPaymentAmount', function () {
        var objPercent = $(this).parent('td').parent('tr').find('.clsPaymentPercent');

        var amount = $(this).val();
        var cost = $('#Cost').val();

        if ($.isNumeric(cost) && $.isNumeric(amount)) {
            var percent = (parseFloat(100) * parseFloat(amount)) / parseFloat(cost);
            objPercent.val(percent);
        }

        LoadTotalAmount();
        LoadTotalPercentage();
    })
    $(document).on("blur", "#EstimatedHours", function () {
        LoadCost()
    });
    $(document).on("blur", "#HourlyRate", function () {
        LoadCost()
    });
    $(document).on('keypress keyup blur', '.floatNumber', function (evt) {

        var charCode = (evt.which) ? evt.which : event.keyCode

        if (
            //(charCode != 45 || $(element).val().indexOf('-') != -1) &&       “-” CHECK MINUS, AND ONLY ONE.
            (charCode != 46 || $(this).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
            (charCode < 48 || charCode > 57) && charCode != 8)
            return false;

        return true;
    });
    $(document).on('keypress keyup blur', '.intNumber', function (evt) {

        var charCode = (evt.which) ? evt.which : event.keyCode

        if (
            //(charCode != 45 || $(element).val().indexOf('-') != -1) &&       “-” CHECK MINUS, AND ONLY ONE.
            //(charCode != 46 || $(this).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
            (charCode < 48 || charCode > 57) && charCode != 8)
            return false;

        return true;
    });
    $(document).on("change", "#IsAdvancePayment", function () {
        var checked = $(this).is(":checked");
        if (checked == true) {
            $('#divAdvanceAmount').show();
        }
        else {
            $('#AdvanceAmount').val('');
            $('#divAdvanceAmount').hide();
        }
    });
    $(document).on('change', '.NoOfResources', function () {
        LoadTotalNoOfResources();
        LoadTotalResourceAmount();
        LoadCostPerResources();
    })
    $(document).on('change', '.resourceAmount', function () {
        if ($('#isSameForAllResources').is(":checked")) {
            makeBillingInfoSame();
        }
        LoadTotalResourceAmount();
    })
    $(document).on('click', '.removeResource', function (e) {
        e.preventDefault();
        $(this).closest('td').parent('tr').remove();
        if ($('#tblPINResources tr').length == 2) {
            $('#noRecordsFound').show();
        }

        var firstRow = $('.tr_Resource:first');

        if (firstRow.length > 0) {

            firstRow.find('td').find('.clsBillingType').attr('disabled', false).trigger("chosen:updated");

            if (firstRow.find('td').find('.clsBillingType').val() == "H") {
                firstRow.find('td').find('.clsHourlyRate').attr('disabled', false);
            }
            else if (firstRow.find('td').find('.clsBillingType').val() == "M") {
                firstRow.find('td').find('.clsResourceAmount').attr('disabled', false);
            }
            else {
                firstRow.find('td').find('.clsHourlyRate').attr('disabled', false);
                firstRow.find('td').find('.clsResourceAmount').attr('disabled', false);
            }
        }
        if ($('#isSameForAllResources').is(":checked")) {
            makeBillingInfoSame();
        }


        LoadTotalResourceAmount();
        LoadTotalNoOfResources();
    });
    $(document).on('change', '.clsBillingType', function () {
        var billingType = $(this).val();

        var amount = $(this).parent('td').siblings().find('.clsResourceAmount');
        var rate = $(this).parent('td').siblings().find('.clsHourlyRate');

        if (billingType == 'H') {
            amount.attr('disabled', true).val('');
            LoadCostPerResources();
            rate.attr('disabled', false);
        }
        else if (billingType == 'M') {
            amount.attr('disabled', false).val('');
            rate.attr('disabled', true).val('');
        }
        else {
            amount.attr('disabled', false).val('');
            rate.attr('disabled', false).val('');
        }
        if ($('#isSameForAllResources').is(":checked")) {
            makeBillingInfoSame();
        }
    });
    $(document).on('blur', '#MonthlyHrsLimitMAX', function () {
        LoadCostPerResources();
        if ($('#isSameForAllResources').is(":checked")) {
            makeBillingInfoSame();
        }
    });
    $(document).on('blur', '.clsHourlyRate', function () {
        if ($('#isSameForAllResources').is(":checked")) {
            makeBillingInfoSame();
        }
        LoadCostPerResources();
    })
    $(document).on('change', '.isSameForAllResource', function () {
        if ($('#isSameForAllResources').is(":checked")) {
            makeBillingInfoSame();
        }
        else {
            makeBillingInfoIndependent()
        }
    })
    $('#addComment').click(function (e) {
        e.preventDefault();

        var comment = $('#txtComment').val();
        var projectInitiationId = $('#txtComment').attr('data-projectInitiationId');

        if (comment != '' && $.isNumeric(projectInitiationId)) {
            $.ajax({
                url: '/ProjectInitiation/InsertComent',
                type: 'post',
                async: false,
                data: JSON.stringify({ ProjectInitiationID: projectInitiationId, Comments: comment }),
                contentType: 'application/json; charset=utf-8',
                dataType: 'html',
                success: function (data) {
                    if (data != '') {
                        $('#commentDetails').append(data);
                        $('#txtComment').val('');
                    }
                }
            });
        }
    });
});

function LoadSecondaryRegion(PrimaryRegionId) {
    $.ajax({
        url: "/ProjectInitiation/GetSecondaryList",
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ PrimaryRegionId: PrimaryRegionId }),
        dataType: 'json',
        async: false,
        success: function (data) {
            $("#drpSecondaryRegion").html(""); // clear before appending new list 
            $("#drpSecondaryRegion").append($('<option></option>').val("").html("Select Secondary Region"));
            $.each(data, function (i, Secondaryregion) {
                $("#drpSecondaryRegion").append(
                    $('<option></option>').val(Secondaryregion.Value).html(Secondaryregion.Text));
            });
            $('#drpSecondaryRegion').trigger("chosen:updated");
        },
        error: function (data) {
        }
    });
}
function ShowHideControlBasedOnProjectType(ProjectType) {
    $.ajax({
        url: '/ProjectInitiation/LoadControlBasedOnProjectType',
        type: 'POST',
        data: JSON.stringify({ ProjectTypeId: ProjectType }),
        contentType: 'application/json;charset=utf-8',
        async: false,
        dataType: 'html',
        success: function (data) {
            if (data) {
                $('#divControl').empty();
                $('#divControl').html(data);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function SetPanaltyClause(obj) {
    if ($(obj).val() == "True") {
        $("#pinDetailsViewModel_PanaltyClause").rules("add", "required")
        $("#pinDetailsViewModel_PanaltyClause").attr('disabled', false)
        $('#span_PanaltyClause').show();
    }
    else {
        $("#pinDetailsViewModel_PanaltyClause").rules('remove', "required")
        $("#pinDetailsViewModel_PanaltyClause").attr('disabled', true)
        $('#span_PanaltyClause').hide();
    }
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
function LoadCost() {
    var rate = $('#HourlyRate').val();
    var hours = $('#EstimatedHours').val();
    if ($.isNumeric(rate) && $.isNumeric(hours)) {
        var cost = parseFloat(hours) * parseFloat(rate);
        $('#Cost').val(cost.toFixed(2));
        ResetAllCost()
    }
}
function ValidateMilestones() {
    var errorMessage = new Array();

    if ($('#Cost').val() == '') {
        errorMessage.push("Please enter cost")
    }

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
function ClearAllValidations() {

    $('#customValidationSummary_Client').hide().find('ul').html('');

    $('#customValidationSummary').html('');

    $('.validation-summary-errors')
    .removeClass('validation-summary-errors')
    .addClass('validation-summary-valid');

    //$('.input-validation-error')
    //    .removeClass('input-validation-error')
    //    .addClass('valid');
}
function ResetAllCost() {
    $('.clsPaymentPercent').each(function () {
        var percent = $(this).val();
        var cost = $('#Cost').val();
        if ($.isNumeric(cost) && $.isNumeric(percent)) {
            var amount = (parseFloat(cost) * parseFloat(percent)) / parseFloat(100);
            $(this).parent('td').parent('tr').find('.clsPaymentAmount').val(amount.toFixed(2));
        }
    });
}
function LoadTotalNoOfResources() {
    var totalCount = 0;
    $('.NoOfResources').each(function () {
        var count = $(this).val();
        if ($.isNumeric(count)) {
            totalCount = parseFloat(totalCount) + parseFloat(count);
        }
    });
    $('#totalResources').html(totalCount)
    $('#Cost_Hours').val(totalCount)
}
function LoadTotalResourceAmount() {
    var totalCount = 0;
    $('.resourceAmount').each(function () {

        var noOfResources = $(this).parent('td').siblings().find('.NoOfResources').val();

        if ($.isNumeric(noOfResources)) {
            var count = $(this).val();
            if ($.isNumeric(count)) {
                totalCount = parseFloat(totalCount) + (parseFloat(count) * parseFloat(noOfResources));
            }
        }
    });
    $('#totalCost_Resource').html(totalCount)
    $('#Cost_Resources').val(totalCount)
}
function LoadCostPerResources() {
    $('.clsBillingType').each(function () {
        var billingType = $(this).val();
        var billingHours = $('#MonthlyHrsLimitMAX').val();
        if (billingType == 'H') {
            var hourlyRate = $(this).parent('td').siblings().find('.clsHourlyRate').val();
            if ($.isNumeric(hourlyRate) && $.isNumeric(billingHours)) {
                var monthlyBillingCostPerResource = parseFloat(hourlyRate) * parseFloat(billingHours);
                $(this).parent('td').siblings().find('.clsResourceAmount').val(monthlyBillingCostPerResource)
                LoadTotalResourceAmount()
            }
        }
    });
}
function makeBillingInfoSame() {

    var firstRow = $('.tr_Resource:first').find('td');

    var billingType = firstRow.find('.clsBillingType').val();
    var rate = firstRow.find('.clsHourlyRate').val();
    var costPerResource = firstRow.find('.clsResourceAmount').val();

    $('.tr_Resource').not(":first").each(function () {
        $(this).find('td').find('.clsBillingType').val(billingType).attr('disabled', true).trigger('chosen:updated');
        $(this).find('td').find('.clsHourlyRate').val(rate).attr('disabled', true);
        $(this).find('td').find('.clsResourceAmount').val(costPerResource).attr('disabled', true);
    })
}
function makeBillingInfoIndependent() {
    $('.tr_Resource').each(function () {
        $(this).find('td').find('.clsBillingType').attr('disabled', false).trigger('chosen:updated');
        if ($(this).find('td').find('.clsBillingType').val() == "H") {
            $(this).find('td').find('.clsHourlyRate').attr('disabled', false);
        }
        else if ($(this).find('td').find('.clsBillingType').val() == "M") {
            $(this).find('td').find('.clsResourceAmount').attr('disabled', false);
        }
        else {
            $(this).find('td').find('.clsHourlyRate').attr('disabled', false);
            $(this).find('td').find('.clsResourceAmount').attr('disabled', false);
        }
    });
}
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
