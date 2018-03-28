$(document).ready(function () {

    $(document).on('click', '#SaveGeneralStep', function (event) {
        var errorMessage = "";
        $('#generalStepValidationMessage').children('ul').html('');
        $('#generalStepValidationMessage').css('display', 'none');

        var form = $("#Form")
            .removeData("validator") /* added by the raw jquery.validate plugin */
            .removeData("unobtrusiveValidation");

        $.validator.unobtrusive.parse(form);
        var validator = $("#Form").validate();
        validator.element('[name="Policy.DisplayID"]');

        for (i = 0; i < validator.errorList.length; i++) {
            errorMessage += "<li>" + validator.errorList[i].message + "</li>";
        }

        validator.element('[name="Policy.PolicyName"]');

        for (i = 0; i < validator.errorList.length; i++) {
            errorMessage += "<li>" + validator.errorList[i].message + "</li>";
        }

        //validator.element('[name="AttendancePenalty"]');

        //for (i = 0; i < validator.errorList.length; i++) {
        //    errorMessage += "<li>" + validator.errorList[i].message + "</li>";
        //}
        if (errorMessage == "") {
            var policyid = $('#PolicyID').val();
            var displayId = $('#DisplayId').val();
            $.ajax({
                url: '/policy/IsPolicyId_Available',
                type: 'GET',
                data: { policyid: policyid, displayId: displayId },
                success: function (result) {
                    if (result) {
                        errorMessage += "<li>Policy ID already in use. Please use another Policy ID</li>";
                    }
                },
                async: false
            });
        }
        if (errorMessage == "") {
            $('[id^="chkEligibility_"]').each(function () {
                var id = $(this).attr('id');
                var idSplit = $(this).attr('id').split('_');
                if ($('#' + id + ":checkbox:checked").length > 0) {
                    var eligibilityLimitId = idSplit[1] + '_' + "EligibilityLimit";
                    var isWeekOffId = idSplit[1] + '_' + "isWeekOff";
                    var isHolidayId = idSplit[1] + '_' + "isHoliday";
                    if ($('#' + eligibilityLimitId).length != 0) {
                        if ($('#' + eligibilityLimitId).val() == '') {
                            errorMessage += "<li>Please provide max limit for " + idSplit[1] + "</li>";
                        }
                    }
                    if ($('#' + isWeekOffId).length != 0 && $('#' + isHolidayId).length != 0) {
                        if ($('#' + isWeekOffId + ":checkbox:checked").length == 0 && $('#' + isHolidayId + ":checkbox:checked").length == 0) {
                            errorMessage += "<li>Please select atleast one applicability for " + idSplit[1] + "</li>";
                        }
                    }
                }
            });
        }
        if (errorMessage == "") {
            if ($('#chkEligibility_WOH:checkbox:checked').length > 0 && $("#WOH_EligibilityLimit").val() != '' && (parseInt($("#WOH_EligibilityLimit").val()) >= 15 || parseInt($("#WOH_EligibilityLimit").val()) <= 0)) {
                errorMessage += "<li>Max times user can apply for WOH must be greater than 0 and less than 15</li>";
            }
            if ($('#chkEligibility_WFH:checkbox:checked').length > 0 && $("#WFH_EligibilityLimit").val() != '' && (parseInt($("#WFH_EligibilityLimit").val()) >= 31 || parseInt($("#WFH_EligibilityLimit").val()) <= 0)) {
                errorMessage += "<li>Max times user can apply for WFH must be greater than 0 and less than 31</li>";
            }
            if ($('#chkEligibility_CompOff:checkbox:checked').length > 0 && $("#CompOff_EligibilityLimit").val() != '' && parseInt($("#CompOff_EligibilityLimit").val()) <= 0) {
                errorMessage += "<li>The days within which CompOff can be redeemed should be greater than 0</li>";
            }
        }
        if (errorMessage == "") {
            if (!$("#isEnchasement").is(':checked')) {
                var policyid = $('#PolicyID').val();
                $.ajax({
                    url: '/policy/GetLeaveEnchment',
                    type: 'GET',
                    data: { policyid: policyid },
                    success: function (result) {
                        if (result == true) {
                            errorMessage += "<li>Leave Encashment option cannot be removed, since it's already been configured in some leave categories</li>";
                            $("#isEnchasement").prop('checked', true);
                        }
                    },
                    async: false
                });
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
            $('#generalStepValidationMessage').children('ul').append(errorMessage);
            $('#generalStepValidationMessage').css('display', 'block')
        }
    });
    $(document).on('keypress keyup blur', '.eligibility_NumOnly', function (event) {
        //if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        //    // Allow: Ctrl+A, Command+A
        //    (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        //    // Allow: home, end, left, right, down, up
        //    (e.keyCode >= 35 && e.keyCode <= 40)) {
        //    // let it happen, don't do anything
        //    return;
        //}
        //if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
        //    return false;
        //}
        return isNumber(event, this)

    });

    $(document).on('click', '#chkEligibility_CompOff', function () {
        if ($(this).prop("checked") == true) {
            configureCompOffAsLeave();
        }
        else if ($(this).prop("checked") == false) {
            deleteCompOffConfiguration();
        }
    });

});
function isNumber(evt, element) {

    var charCode = (evt.which) ? evt.which : event.keyCode

    if (
        //(charCode != 45 || $(element).val().indexOf('-') != -1) &&       “-” CHECK MINUS, AND ONLY ONE.
        //(charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
        (charCode < 48 || charCode > 57))
        return false;

    return true;
}
function configureCompOffAsLeave() {

    if ($('#compOffId').length > 0) {

        var compOffId = $('#compOffId').val();

        var divId = "leaveType_" + compOffId;
        var editDivId = "leaveTypeForEdit_" + compOffId;

        $("#leaves").append('<div id="' + divId + '"></div>');

        var newPolicy = new Object;

        $('<input>').attr({
            type: 'hidden',
            name: "policyLeaves.Index",
            value: compOffId

        }).appendTo($('#' + divId));

        $('#divStepLeave input[type=checkbox]').each(function () {
            var value = (this.checked ? true : false);
            $('<input>').attr({
                type: 'hidden',
                name: "policyLeaves[" + compOffId + "]." + $(this).attr('name'),
                value: false
            }).appendTo($('#' + divId));
            newPolicy[$(this).attr('name')] = value;
        });

        $('#divStepLeave input[type=radio]').each(function () {

            var value = (this.checked ? true : false);
            if (value) {
                $('<input>').attr({
                    type: 'hidden',
                    name: "policyLeaves[" + compOffId + "]." + $(this).attr('name'),
                    value: false
                }).appendTo($('#' + divId));
                newPolicy[$(this).attr('name')] = $(this).val();
            }

        });

        $("#divStepLeave :input").each(function () {

            var name = $(this).attr('name');

            var value = "";

            if (typeof name === "undefined" || $(this).attr('type') == 'hidden' || $(this).is(':checkbox') || $(this).is(':radio')) {
                return true;
            }

            $('<input>').attr({
                type: 'hidden',
                name: "policyLeaves[" + compOffId + "]." + $(this).attr('name'),
                value: null
            }).appendTo($('#' + divId));

            newPolicy[$(this).attr('name')] = $(this).val();
        });

        $('input[name="policyLeaves[' + compOffId + '].LeaveCategoryID"]').val(compOffId);
        $('input[name="policyLeaves[' + compOffId + '].CycleLeaveLimit"]').val(0);

        var assignmentCycle = $("#CycleDurationType option:selected").val();
        var leaveApplicableExtent_BothId = $("#LeaveApplicableExtent_BothId").val();
        var leaveUsableExtent_BothId = $("#LeaveUsabilityExtent_BothId").val();

        $('input[name="policyLeaves[' + compOffId + '].AssignCycleTypeID"]').val(assignmentCycle);
        $('input[name="policyLeaves[' + compOffId + '].LeaveApplicableExtent"]').val(leaveApplicableExtent_BothId);
        $('input[name="policyLeaves[' + compOffId + '].LeaveUtilizableExtent"]').val(leaveUsableExtent_BothId);
        $('input[name="policyLeaves[' + compOffId + '].LeaveAcceptMin"]').val(parseFloat(0.5));
        $('input[name="policyLeaves[' + compOffId + '].isCycleStart"]').val(true);
        $('input[name="policyLeaves[' + compOffId + '].isLeaveClubbing"]').val(true);
        $('input[name="policyLeaves[' + compOffId + '].LeaveAcceptTerm"]').val(0);
        $('input[name="policyLeaves[' + compOffId + '].LeaveAcceptTypeID"]').val(1);

        newPolicies.push(newPolicy);
        var newTRid = "CompoffCategoryMapping";
        var sortOrderForCompOff = "";
        if ($('[id^="txtSortOrder_"]').length == 0) {
            sortOrderForCompOff = 1;
        }
        if ($('#PolicyLeaveMappingID').val() == 0 && $('#' + newTRid).length <= 0) {

            var leaveName = "COMP OFF";

            var newAssignedLeaveRow = '<tr id="CompoffCategoryMapping">';

            newAssignedLeaveRow += '<td style="width: 50%;">'
            newAssignedLeaveRow += '<span title=' + leaveName + ' data-original-title=' + leaveName + '>' + leaveName + '</span>'
            newAssignedLeaveRow += '</td>';
            newAssignedLeaveRow += '<td style="width: 20%;">';
            newAssignedLeaveRow += '<input autocomplete = "off" class="form-control NumOnly" type="text" placeholder="#" name="policyLeaves[' + compOffId + '].SortOrder" data-IsLeaveClubbing = "True" id= "txtSortOrder_' + compOffId + '" value=' + sortOrderForCompOff + '>'
            newAssignedLeaveRow += '</td>';
            newAssignedLeaveRow += '<td style="width: 30%;" class="text-center">';
            //newAssignedLeaveRow += '<a href="javascript:void(0);" class="" title="Edit" data-original-title="Edit" data-LeaveCategoryID = ' + $('#LeaveCategoryID').val() + ' id="EditLeavePolicyNew_' + $('#LeaveCategoryID').val() + '"><span class="fa fa-pencil"></span></a>';
            //newAssignedLeaveRow += '<a href="javascript:void(0);" class="text-danger margin-left-15" title="Delete" data-original-title="Delete" id="DeleteLeavePolicyNew_' + $('#LeaveCategoryID').val() + '"><span class="glyphicon glyphicon-trash"></span></a>';
            newAssignedLeaveRow += '</td>';
            newAssignedLeaveRow += '</tr>';
            $('#AssignedLeaveCategories').append(newAssignedLeaveRow);
        }
    }
}
function deleteCompOffConfiguration() {
    if ($('#compOffId').length > 0) {
        var compOffId = $('#compOffId').val();
        if ($('#CompoffCategoryMapping').length > 0) {
            $('#CompoffCategoryMapping').remove();
            $('#leaveType_' + compOffId).remove();
        }
        if ($('#PolicyID').val() > 0 && $('#CompOffLeaveMappingId').val() > 0) {
            var mappingId = $('#CompOffLeaveMappingId').val();
            var policyId = $('#PolicyID').val();
            $("#deletedLeaves").append('<input type=hidden name="DeletedLeaveMappingConfigurations" value=' + mappingId + '>');
        }
    }
}