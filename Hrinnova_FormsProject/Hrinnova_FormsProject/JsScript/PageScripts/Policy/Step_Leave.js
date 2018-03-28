var newPolicies = [];
$(document).ready(function () {


    $(document).on('click', '[id^=EditLeavePolicyOld_]', function () {
        var mode = $(this).attr('data-mode');
        var mappingId = $(this).attr('data-policyLeaveMappingId');
        var policyId = $(this).attr('data-policyId');
        var divId = "leaveType_" + $(this).attr('id').split('_')[1];

        if ($('#' + divId).length > 0) {
            FillClientSideMappingForEdit($(this).attr('id').split('_')[1]);
        }
        else {
            var leaveCategories = [];
            $('[id^="txtSortOrder_"]').each(function () {
                var idSplit = $(this).attr('id').split('_');
                var categoryId = idSplit[1];
                leaveCategories.push(categoryId);
            });
            $.ajax({
                url: '/policy/LeaveConfiguration',
                type: 'GET',
                data: { policyId: policyId, policyLeaveMappingId: mappingId, mode: mode, assignedLeaveCategories: leaveCategories },
                success: function (result) {
                    $('#divLeaveConfiguration').empty();
                    $('#divLeaveConfiguration').html(result);
                    setupCheckboxesForForLeave('divLeaveConfiguration');
                    //setupCheckboxes();
                    chosen_init();
                    //staped_form_init();
                },
                async: false,
                traditional: true
            });
            if ($("#isEnchasement").is(':checked')) {
                $("#ResetAndEncash").css("display", "block");
                $("#CarryForwardAndEncash").css("display", "block");
            }
            else {
                $("#ResetAndEncash").css("display", "none");
                $("#CarryForwardAndEncash").css("display", "none");
                if (!$('#AccumActionTypeID_CarryForward').is(':checked')) {
                    $("#AccumActionTypeID_Lapse").click();
                    $("#AccumActionTypeID_Lapse").prop('checked', true);
                }
            }
        }

    });
    $(document).on('click', '[id^=EditLeavePolicyNew_]', function () {
        var leaveCategoryId = $(this).attr('data-LeaveCategoryID');
        FillClientSideMappingForEdit(leaveCategoryId);
    });
    $(document).on('click', '[id^=DeleteLeavePolicyOld_]', function () {
        var mode = $(this).attr('data-mode');
        var mappingId = $(this).attr('data-policyLeaveMappingId');
        var policyId = $(this).attr('data-policyId');
        var id = $(this).attr('id');

        $("#deletedLeaves").append('<input type=hidden name="DeletedLeaveMappingConfigurations" value=' + mappingId + '>');

        $('#AssignedLeaveOld_' + id.split('_')[1]).remove();
        $('#leaveType_' + id.split('_')[1]).remove();

        //$.ajax({
        //    url: '/policy/DeletePolicyLeaveMapping',
        //    dataType: 'json',
        //    type: 'GET',
        //    data: { policyId: policyId, policyLeaveMappingId: mappingId },
        //    async: false,
        //    success: function (result) {
        //        
        //        if (result) {
        //            $('#AssignedLeaveOld_' + id.split('_')[1]).remove();
        //            $('#leaveType_' + id.split('_')[1]).remove();
        //            toastr.success("Leave assignment deleted successfully");
        //        }
        //        else {
        //            toastr.success("Error occured while deleting leave assignment");
        //        }
        //    }
        //});
        loadLeaveConfiguration();
    });
    $(document).on('click', '[id^=DeleteLeavePolicyNew_]', function () {
        var trId = "AssignedLeaveNew_" + $(this).attr('id').split('_')[1];
        var divId = "leaveType_" + $(this).attr('id').split('_')[1];
        $('table#AssignedLeaveCategories tr#' + trId).remove();
        $('#' + divId).remove();
        loadLeaveConfiguration();
    });
    //$(document).on('click', '#SaveAllConfigurations', function (e) {
    //    //var form = $("#Form")
    //    //    .removeData("validator") /* added by the raw jquery.validate plugin */
    //    //    .removeData("unobtrusiveValidation");
    //    //$.validator.setDefaults({ ignore: 'input' });
    //    if ($(this).data('clicked') == 'yes') return;
    //    $(this).data('clicked', 'yes');

    //    $('#LeaveValidationMessage').children('ul').html('');
    //    $('#LeaveValidationMessage').css('display', 'none');

    //    var errorMessage = "";
    //    var values = [];
    //    var isLOPConfigurationExist = false;
    //    $("[id^='txtSortOrder_']").each(function () {
    //        if ($(this).attr('data-isLOPConfiguration') == undefined) {
    //            if ($(this).val() == '') {
    //                errorMessage += "Please enter priorities for all assigned leave categories";
    //                return false;
    //            }
    //            if ($(this).val() != 0) {
    //                values.push($(this).val());
    //            }
    //        }
    //        else {
    //            isLOPConfigurationExist = true;
    //        }
    //    });

    //    if (errorMessage != '') {
    //        $('#LeaveValidationMessage').children('ul').append(errorMessage);
    //        $('#LeaveValidationMessage').css('display', 'block')
    //    }
    //    else if (hasDuplicates(values)) {
    //        errorMessage += "Please enter unique priority for all assigned leaves";
    //        $('#LeaveValidationMessage').children('ul').append(errorMessage);
    //        $('#LeaveValidationMessage').css('display', 'block')
    //    }
    //    else if (!CheckSequence(values.slice())) {
    //        errorMessage += "The priorities assigned to the leaves should be in sequence";
    //        $('#LeaveValidationMessage').children('ul').append(errorMessage);
    //        $('#LeaveValidationMessage').css('display', 'block')
    //    }
    //    else {
    //        if (!isLOPConfigurationExist) {
    //            configureLOPasLeave();
    //        }
    //        $('form#Form').submit();
    //    }
    //});
});
function configureLOPasLeave() {

    if ($('#LOPLeaveCategoryId').length > 0) {

        var LOPcategoryId = $('#LOPLeaveCategoryId').val();

        var divId = "leaveType_" + LOPcategoryId;
        var editDivId = "leaveTypeForEdit_" + LOPcategoryId;

        $("#leaves").append('<div id="' + divId + '"></div>');

        var newPolicy = new Object;

        $('<input>').attr({
            type: 'hidden',
            name: "policyLeaves.Index",
            value: LOPcategoryId

        }).appendTo($('#' + divId));

        $('#divStepLeave input[type=checkbox]').each(function () {
            var value = (this.checked ? true : false);
            $('<input>').attr({
                type: 'hidden',
                name: "policyLeaves[" + LOPcategoryId + "]." + $(this).attr('name'),
                value: false
            }).appendTo($('#' + divId));
        });

        $('#divStepLeave input[type=radio]').each(function () {

            var value = (this.checked ? true : false);
            if (value) {
                $('<input>').attr({
                    type: 'hidden',
                    name: "policyLeaves[" + LOPcategoryId + "]." + $(this).attr('name'),
                    value: false
                }).appendTo($('#' + divId));
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
                name: "policyLeaves[" + LOPcategoryId + "]." + $(this).attr('name'),
                value: null
            }).appendTo($('#' + divId));

        });

        $('input[name="policyLeaves[' + LOPcategoryId + '].LeaveCategoryID"]').val(LOPcategoryId);
        $('input[name="policyLeaves[' + LOPcategoryId + '].CycleLeaveLimit"]').val(0);

        var assignmentCycle = $("#CycleDurationType option:selected").val();
        var leaveUsableExtent_BothId = $("#LeaveUsabilityExtent_BothId").val();
        var LeaveApplicabilityExtent_BothId = $("#LeaveApplicabilityExtent_BothId").val();

        $('input[name="policyLeaves[' + LOPcategoryId + '].AssignCycleTypeID"]').val(assignmentCycle);
        $('input[name="policyLeaves[' + LOPcategoryId + '].isLeaveClubbing"]').val(true);
        $('input[name="policyLeaves[' + LOPcategoryId + '].isCycleStart"]').val(true);
        $('input[name="policyLeaves[' + LOPcategoryId + '].LeaveUtilizableExtent"]').val(leaveUsableExtent_BothId);
        $('input[name="policyLeaves[' + LOPcategoryId + '].LeaveApplicableExtent"]').val(LeaveApplicabilityExtent_BothId);

        var newTRid = "LOPCategoryMapping";
        var sortOrderForLOP = 100;

        if ($('#PolicyLeaveMappingID').val() == 0 && $('#' + newTRid).length <= 0) {

            var newAssignedLeaveRow = '<tr id="LOPCategoryMapping" style="display:none">';

            newAssignedLeaveRow += '<td style="width: 50%;">'
            //newAssignedLeaveRow += '<span title=' + leaveName + ' data-original-title=' + leaveName + '>' + leaveName + '</span>'
            newAssignedLeaveRow += '</td>';
            newAssignedLeaveRow += '<td style="width: 20%;">';
            newAssignedLeaveRow += '<input class="form-control NumOnly" type="text" placeholder="#" name="policyLeaves[' + LOPcategoryId + '].SortOrder" id= "txtSortOrder_' + LOPcategoryId + '" value=' + sortOrderForLOP + ' data-isLOPConfiguration="true">'
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
function setupCheckboxesForForLeave(inputId) {
    // Checkbox Styling
    $('#' + inputId + ' input[type=checkbox]').each(function () {
        var $this = $(this);
        //$this.addClass('checkbox-custom');
        $this.attr("name");
        var id = $(this).attr('id');

        var dispalyStatusOfControl = "";
        if ($this.css('display') == "block" || $this.css('display') == ("inline-block") || $this.is(":visible")) {
            dispalyStatusOfControl = "true";
        }
        else {
            dispalyStatusOfControl = "false";
        }
        var label = $(this).next('#' + id);
        var labelText = $(this).attr("Text");

        if (dispalyStatusOfControl == "true") {

            $('<label class="checkbox-custom-label" for=' + id + '>' + labelText + '</label>').insertAfter($this);
        }
        else {
            $('<label class="checkbox-custom-label" style="display:none" for=' + id + '>' + labelText + '</label>').insertAfter($this);
        }
    });

    // Radio Styling
    $('#' + inputId + ' input[type=radio]').each(function () {
        var $this = $(this);
        $this.addClass('radio-custom');
        $this.attr("name");
        var label = $this.attr("Text");
        var id = $(this).attr('id');
        $('<label class="radio-custom-label" for=' + id + '>' + label + '</label>').insertAfter($this);
    });

};
function hasDuplicates(array) {
    var valuesSoFar = Object.create(null);
    for (var i = 0; i < array.length; ++i) {
        var value = array[i];
        if (value in valuesSoFar) {
            return true;
        }
        valuesSoFar[value] = true;
    }
    return false;
}
function CheckSequence(array) {

    var removeItem = 0;

    array = jQuery.grep(array, function (value) {
        return value != removeItem;
    });

    array = array.sort(sortNumber);

    for (i = 0; i < array.length; i++) {
        if (array[i] != (i + 1)) {
            return false;
        }
    }
    return true;
}
function sortNumber(a, b) {
    return a - b;
}
function loadLeaveConfiguration() {
    var leaveCategories = [];
    $('[id^="txtSortOrder_"]').each(function () {
        var idSplit = $(this).attr('id').split('_');
        var categoryId = idSplit[1];
        leaveCategories.push(categoryId);
    });
    $.ajax({
        url: '/policy/LeaveConfiguration',
        type: 'GET',
        data: { policyId: 0, policyLeaveMappingId: 0, mode: 'Add', assignedLeaveCategories: leaveCategories },
        success: function (result) {
            $('#divLeaveConfiguration').empty();
            $('#divLeaveConfiguration').html(result);
            setupCheckboxesForForLeave('divLeaveConfiguration');
            //setupCheckboxes();
            chosen_init();
            //staped_form_init();
        },
        async: false,
        traditional: true
    });
}

function FillClientSideMappingForEdit(leaveCategoryId) {
    //delete existing mapping :- start
    //var divId = "leaveType_" + $(this).attr('id').split('_')[1];
    //$('#' + divId).remove();
    //loadLeaveConfiguration();
    //delete existing mapping :- end

    //find the current mapping from global array :- start

    var policyLeaveMapping;
    $.each(newPolicies, function (key, value) {
        var newPolicy = value;
        $.each(newPolicy, function (key, value) {
            if (key == 'LeaveCategoryID') {
                if (parseInt(value) == parseInt(leaveCategoryId)) {
                    policyLeaveMapping = newPolicy;
                    return false;
                }
            }
        });
    });
    //find the current mapping from global array :- end

    //Get view based on current mapping :- start
    var leaveCategories = [];
    $('[id^="txtSortOrder_"]').each(function () {
        var idSplit = $(this).attr('id').split('_');
        var categoryId = idSplit[1];
        leaveCategories.push(categoryId);
    });
    $.ajax({
        url: '/policy/GetLeaveConfigurationByModel',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ policyLeaveMappingModel: policyLeaveMapping, assignedLeaveCategories: leaveCategories, leaveCategoryId: leaveCategoryId }),
        success: function (result) {
            $('#divLeaveConfiguration').empty();
            $('#divLeaveConfiguration').html(result);
            setupCheckboxesForForLeave('divLeaveConfiguration');
            chosen_init();
        },
        async: false,
        traditional: true
    });
    //Get view based on current mapping :- end

    if ($("#isEnchasement").is(':checked')) {
        $("#ResetAndEncash").css("display", "block");
        $("#CarryForwardAndEncash").css("display", "block");
    }
    else {
        $("#ResetAndEncash").css("display", "none");
        $("#CarryForwardAndEncash").css("display", "none");
        if (!$('#AccumActionTypeID_CarryForward').is(':checked')) {
            $("#AccumActionTypeID_Lapse").prop('checked', true);
            $("#AccumActionTypeID_Lapse").change();
        }
    }
}

function SaveAllConfigurations() {

    var returnValue = false;

    $('#LeaveValidationMessage').children('ul').html('');
    $('#LeaveValidationMessage').css('display', 'none');

    var errorMessage = "";
    var values = [];
    var isLOPConfigurationExist = false;
    $("[id^='txtSortOrder_']").each(function () {
        
        var isLeaveClubbing = $(this).attr('data-IsLeaveClubbing');

        if ($(this).attr('data-isLOPConfiguration') == undefined) {
            if ($(this).val() == '') {
                errorMessage += "Please enter priorities for all assigned leave categories";
                return false;
            }
            else if (isLeaveClubbing == "True" && $(this).val() <= 0) {
                errorMessage += "Priority must be greater than 0 for a leave category when clubbing is permitted.";
                return false;
            }
            if ($(this).val() != 0) {
                values.push($(this).val());
            }
        }
        else {
            isLOPConfigurationExist = true;
        }
    });

    if (errorMessage != '') {
        $('#LeaveValidationMessage').children('ul').append(errorMessage);
        $('#LeaveValidationMessage').css('display', 'block')
    }
    else if (hasDuplicates(values)) {
        errorMessage += "Please enter unique priority for all assigned leaves";
        $('#LeaveValidationMessage').children('ul').append(errorMessage);
        $('#LeaveValidationMessage').css('display', 'block')
    }
    else if (!CheckSequence(values.slice())) {
        errorMessage += "The priorities assigned to the leaves should be in sequence";
        $('#LeaveValidationMessage').children('ul').append(errorMessage);
        $('#LeaveValidationMessage').css('display', 'block')
    }
    else {
        if (!isLOPConfigurationExist) {
            configureLOPasLeave();
        }
        $('form#Form').submit();
        returnValue = true;
    }
    if (!returnValue) {
        $('#SaveAllConfigurations').one('click', SaveAllConfigurations);
    }
    return returnValue;
}