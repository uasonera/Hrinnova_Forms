$(document).ready(function () {
    $('#btnAddResource').click(function () {
        $.ajax({
            url: "AddResource",
            type: "GET",
            contentType: "application/json;charset=utf-8",
            async: false,
            dataType: "html",
            success: function (data) {
                $('#divAddResource').html('').html(data).show();
                $('#Role_1').chosen();
                $('#BillingType_1').chosen();
            }
        });
    });
    $(document).on('click', '#btnCancel', function () {
        $('#divAddResource').html('').hide();
    });
    $(document).on('click', '#btnReset', function () {
        $.ajax({
            url: "AddResource",
            type: "GET",
            contentType: "application/json;charset=utf-8",
            async: false,
            dataType: "html",
            success: function (data) {
                $('#divAddResource').html('').html(data).show();
                $('#Role_1').chosen();
                $('#BillingType_1').chosen();
            }
        });
    });
    $(document).on('click', '#btnResetUpdate', function () {
        var ResourceId = $(this).attr("data-ProjectInitiationResourcesId");
        $.ajax({
            url: "UpdateResource",
            type: "GET",
            contentType: "application/json;charset=utf-8",
            data: { projectResourceId: ResourceId },
            async: false,
            dataType: "html",
            success: function (data) {
                $('#divAddResource').html('').html(data).show();
                $('#BillingType').chosen();
                setupCheckboxes()
            }
        });
    });
    $(document).on('click', '.addMoreResource', function () {
        var obj = $(this);
        $.ajax({
            url: "AddResourceRow",
            data: { rowNumber: $('#tblResource tbody tr').length + 1 },
            type: "GET",
            contentType: "application/json;charset=utf-8",
            async: false,
            dataType: "html",
            success: function (html) {
                $(html).insertAfter(obj.closest('tr'));
                $('#Role_' + $('#tblResource tbody tr').length).chosen();
                $('#BillingType_' + $('#tblResource tbody tr').length).chosen();
            }
        });
    });
    $(document).on('click', '#btnSave', function () {
        if (validateResource()) {
            var disabled = $("#frm_AddResource").find(':input:disabled').removeAttr('disabled');
            $("#frm_AddResource").submit();
            disabled.attr('disabled', 'disabled');
        }
    });
    $(document).on('change', '.BillingType', function () {
        if (this.value == "Monthly") {
            $(this).parents('tr').find('.HourlyRate').val('').attr("disabled", true);
            $(this).parents('tr').find('.Amount').val('').attr("disabled", false);
        }
        else {
            $(this).parents('tr').find('.HourlyRate').val('').attr("disabled", false);
            $(this).parents('tr').find('.Amount').val('').attr("disabled", true);
        }
    });
    $(document).on('input', '.HourlyRate', function () {
        var hourlyRate = this.value;
        var monthlyBillingHrs = $(this).parents('tr').find('.MonthlyBillingHours').val();
        if ($.isNumeric(hourlyRate) && $.isNumeric(monthlyBillingHrs)) {
            var amount = hourlyRate * monthlyBillingHrs;
            $(this).parents('tr').find('.Amount').val(amount)
        }
        else {
            $(this).parents('tr').find('.Amount').val('')
        }
    });
    $(document).on('input', '.MonthlyBillingHours', function () {
        var monthlyBillingHrs = this.value;
        var hourlyRate = $(this).parents('tr').find('.HourlyRate').val();

        var billingType = $(this).parents('tr').find('.BillingType').val();

        if (billingType == "Hourly") {
            if ($.isNumeric(hourlyRate) && $.isNumeric(monthlyBillingHrs)) {
                var amount = hourlyRate * monthlyBillingHrs;
                $(this).parents('tr').find('.Amount').val(amount)
            }
            else {
                $(this).parents('tr').find('.Amount').val('')
            }
        }
    });
    $(document).on('keydown', '.isNumeric', function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
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
    $(document).on('keydown', '.isInteger', function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [8, 9, 27, 13]) !== -1 ||
            // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
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
    $(document).on('click', '.lnkUpdateResource', function () {
        $(this).parents('tr').find('.lblResource').hide();
        $(this).parents('tr').find('.divUpdateResources').show();
        var input = $(this).parents('tr').find('.noOfResources');
        var currentValue = input.data('value')
        input.val(currentValue).focus().select();
    });
    $(document).on('click', '.btnCancelUpdateResource', function () {
        $(this).parents('tr').find('.lblResource').show();
        $(this).parents('tr').find('.divUpdateResources').hide();
    });
    $(document).on('click', '.btnUpdateResource', function () {
        var input = $(this).parents('tr').find('.noOfResources');
        var currentValue = input.val();
        var ResourceId = $(this).attr("data-ProjectInitiationResourcesId");
        var role = $(this).parents('tr').find('.lblRole').html();
        var obj = $(this);
        if (currentValue == '') {
            toastr.error("Please enter resources")
        }
        else if (!$.isNumeric(currentValue)) {
            toastr.error("Please enter valid resources")
        }
        else {
            $.ajax({
                url: 'UpdateResource',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({ ProjectInitiationResourcesId: ResourceId, updatedResources: currentValue }),
                success: function (data) {
                    obj.parents('tr').find('.lblResource').html('').html(currentValue).show();
                    input.data('value', currentValue)
                    obj.parents('tr').find('.divUpdateResources').hide();
                    toastr.success("Resources for " + role + " updated successfully")
                    $('#divAddResource').html('').hide();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.responseText)
                }
            });
        }
    });
    $(document).on('click', '.lnkRemoveRole', function () {
        var role = $(this).parents('tr').find('.lblRole').html();
        var resources = $(this).parents('tr').find('.noOfResources').data('value');
        if (confirm("The role of " + role + " consists of " + resources + " resource(s). Are you sure you want to remove the role?")) {
            var ResourceId = $(this).attr("data-ProjectInitiationResourcesId");
            $.ajax({
                url: 'UpdateResource',
                type: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: JSON.stringify({ ProjectInitiationResourcesId: ResourceId, updatedResources: 0 }),
                success: function (data) {
                    toastr.success("Resources for " + role + " removed successfully")
                    updateResourceListing();
                    $('#divAddResource').html('').hide();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.responseText)
                }
            });
        }
    });
    $(document).on('click', '.lnkReviseBilling', function () {
        var ResourceId = $(this).attr("data-ProjectInitiationResourcesId");
        $.ajax({
            url: "UpdateResource",
            type: "GET",
            contentType: "application/json;charset=utf-8",
            data: { projectResourceId: ResourceId },
            async: false,
            dataType: "html",
            success: function (data) {
                $('#divAddResource').html('').html(data).show();
                $('#BillingType').chosen();
                setupCheckboxes()
            }
        });
    });
    $(document).on('click', '#btnUpdate', function () {
        updateBilling()
    });
});
function OnSaveSuccess(data) {
    if (data == true) {
        toastr.success("Billing revised successfully")
        $('#divAddResource').html('').hide();
        updateResourceListing();
    }
    else {
        toastr.error("Error occured while adding billing information")
    }
}
function validateResource() {
    var count = 1;
    var result = true;
    $('tr.resourceRow').each(function (ix, element) {
        var rowNumber = $(this).attr('id');
        var resources = $(this).find('.Resources').val();
        var billingType = $(this).find('.BillingType').val();
        var hourlyRate = $(this).find('.HourlyRate').val();
        var monthlyBillingHours = $(this).find('.MonthlyBillingHours').val();
        var amount = $(this).find('.Amount').val();
        if (resources == '' || !$.isNumeric(resources)) {
            toastr.error("Please enter resource on row no. " + count)
            result = false;
            return false;
        }
        if (billingType === "Hourly" && (hourlyRate == '' || !$.isNumeric(hourlyRate))) {
            toastr.error("Please enter hourly rate on row no. " + count)
            result = false;
            return false;
        }
        if (monthlyBillingHours == '' || !$.isNumeric(monthlyBillingHours)) {
            toastr.error("Please enter monthly billing hours on row no. " + count)
            result = false;
            return false;
        }
        if (amount == '' || !$.isNumeric(amount)) {
            toastr.error("Please enter Monthly Rate/ Resource on row no. " + count)
            result = false;
            return false;
        }
        count += 1;
    });
    return result;
}
function updateResourceListing() {
    $.ajax({
        url: "ResourceListing",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        async: false,
        dataType: "html",
        success: function (html) {
            $('#divPolicyData').html('').html(html);
        }
    });
}
function updateBilling() {
    var result = true;
    var resources = $('tr.resourceRow').find('.Resources').val();
    var billingType = $('tr.resourceRow').find('.BillingType').val();
    var hourlyRate = $('tr.resourceRow').find('.HourlyRate').val();
    var monthlyBillingHours = $('tr.resourceRow').find('.MonthlyBillingHours').val();
    var amount = $('tr.resourceRow').find('.Amount').val();
    var resourceId = $('tr.resourceRow').find('#ProjectInitiationResourceId').val();
    if (resources == '' || !$.isNumeric(resources)) {
        toastr.error("Please enter no. of resources")
        result = false;
    }
    else if (billingType === "Hourly" && (hourlyRate == '' || !$.isNumeric(hourlyRate))) {
        toastr.error("Please enter hourly rate")
        result = false;
    }
    else if (monthlyBillingHours == '' || !$.isNumeric(monthlyBillingHours)) {
        toastr.error("Please enter monthly billing hours")
        result = false;
    }
    else if (amount == '' || !$.isNumeric(amount)) {
        toastr.error("Please enter cost/resource")
        result = false;
    }
    else {
        $.ajax({
            url: "GetResourceInfo",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: { resourceId: parseInt(resourceId) },
            async: false,
            success: function (data) {

                var existingBillingType = data.BillingType == "H" ? "Hourly" : "Monthly";
                var existingHourlyRate = data.HourlyRate;
                var existingMonthlyBillingHours = data.MonthlyBillingHours;
                var existingAmount = data.Amount;
                var existingResources = data.Resources;

                if (resources > existingResources) {
                    toastr.error("The updated resource count should no be more than existing resource count")
                    result = false;
                }
                else if (existingBillingType == billingType) {
                    if (billingType == "Hourly") {
                        if (hourlyRate == existingHourlyRate && monthlyBillingHours == existingMonthlyBillingHours) {
                            toastr.error("Please change billing type or rate")
                            result = false;
                        }
                        else
                        {
                            var disabled = $("#frm_UpdateResource").find(':input:disabled').removeAttr('disabled');
                            $("#frm_UpdateResource").submit();
                            disabled.attr('disabled', 'disabled');
                        }
                    }
                    else if (amount == existingAmount && monthlyBillingHours == existingMonthlyBillingHours) {
                        toastr.error("Please change billing type or rate")
                        result = false;
                    }
                    else {
                        var disabled = $("#frm_UpdateResource").find(':input:disabled').removeAttr('disabled');
                        $("#frm_UpdateResource").submit();
                        disabled.attr('disabled', 'disabled');
                    }
                }
                else {
                    var disabled = $("#frm_UpdateResource").find(':input:disabled').removeAttr('disabled');
                    $("#frm_UpdateResource").submit();
                    disabled.attr('disabled', 'disabled');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText)
            }
        });
    }

    return result;
}