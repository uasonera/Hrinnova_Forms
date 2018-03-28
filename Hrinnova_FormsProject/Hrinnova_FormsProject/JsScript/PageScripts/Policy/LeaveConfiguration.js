$(document).ready(function () {

    //$(document).on('click', '[name="isLeaveClubbing"]', function () {
    //    //$('[name="isLeaveClubbing"]').click(function () {
    //    var leaveCategoryId = $('#LeaveCategoryID').val();
    //    if ($('#txtSortOrder_' + leaveCategoryId).length > 0) {
    //        if ($('#LeaveClubbingType_NotPermitted').is(':checked')) {
    //            $('#txtSortOrder_' + leaveCategoryId).val(0);
    //            $('#txtSortOrder_' + leaveCategoryId).addClass('disabled');
    //            //$('#txtSortOrder_' + leaveCategoryId).attr('disabled', 'disabled');
    //        }
    //        else if ($('#LeaveClubbingType_Permitted').is(':checked')) {
    //            $('#txtSortOrder_' + leaveCategoryId).val('');
    //            $('#txtSortOrder_' + leaveCategoryId).removeClass('disabled');
    //        }
    //    }
    //});


    $(document).on('click', '#IsSeparateAccumulationCycle', function () {
        if (!$(this).is(":checked")) {
            $('#AccumulationCycleDurationType').val($('#CycleDurationType').val());
        }
        else {
            $('#CycleDurationType').change().trigger("chosen:updated");
        }
    });

    $(document).on('keydown keyup click', '[id^="txtSortOrder_"]', function (e) {
        if ($(this).hasClass('disabled')) {
            e.preventDefault();
            $(this).blur();
            return false;
        }
    });

    $(document).on('change', '#isEvidenceRequired', function () {
        if ($(this).is(":checked")) {
            $('#divEveidenceTerm').css('display', 'block')
        }
        else {
            $('#divEveidenceTerm').css('display', 'none')
            $('#EveidenceTerm').val('')
        }
    });

    $(document).on('click', '#saveLeave', function () {
        
        var errorMessage = "";

        $('#LeaveValidationMessage').children('ul').html('');
        $('#LeaveValidationMessage').css('display', 'none');

        var form = $("#Form")
            .removeData("validator") /* added by the raw jquery.validate plugin */
            .removeData("unobtrusiveValidation");

        $.validator.unobtrusive.parse(form);

        var validator = $("#Form").validate();

        $("#divStepLeave :input").each(function () {

            var name = $(this).attr('name');

            var id = $(this).attr('id');

            if (typeof name === "undefined") {
                return true;
            }
            validator.element('[name="' + name + '"]');

            for (i = 0; i < validator.errorList.length; i++) {
                errorMessage += "<li>" + validator.errorList[i].message + "</li>";
            }
        });
        if ($('#LeaveAcceptTerm').val() == '') {
            errorMessage += "<li>Please enter leave accept term days</li>";
        }
        if ($('#LeaveAcceptMin').val() == '') {
            errorMessage += "<li>Please enter min leaves allowed at at time</li>";
        }
        if ($('#LeaveAcceptMax').val() == '') {
            errorMessage += "<li>Please enter max leaves allowed at a time</li>";
        }
        if ($('#CycleLeaveLimit').val() == '') {
            errorMessage += "<li>Please enter leaves per cycle</li>";
        }
        if (!validateAssignCycleDay()) {
            errorMessage += "<li>Please enter no of days for leave cycle</li>";
        }
        if (!$('#AccumActionTypeID_Lapse').is(':checked')) {
            if($("#EncashMin").val()!='' && $("#EncashMax").val()=='')
                errorMessage += $("#AccumActionTypeID_CarryForward").is(':checked') ? "<li>Please enter max carry forward value</li>" : "<li>Please enter max encashment value</li>";
            else if ($("#EncashMin").val() == '' && $("#EncashMax").val() != '')
                errorMessage += $("#AccumActionTypeID_CarryForward").is(':checked') ? "<li>Please enter min carry forward value</li>" : "<li>Please enter min encashment value</li>";
        }
        if (errorMessage == "") {
            if (parseFloat($('#LeaveAcceptMin').val()) % 0.5 != 0) {
                errorMessage += "<li>Min leaves allowed at a time must be a multiple of 0.5</li>";
            }
            if (parseInt($('#AssignCycleDay').val()) > 60) {
                errorMessage += "<li>No. of days must be less than 60</li>";
            }
            if (parseFloat($('#LeaveAcceptMin').val()) >= parseFloat($('#LeaveAcceptMax').val())) {
                errorMessage += "<li>Max leaves allowed at a time should greater than Min leaves allowed at a time</li>";
            }
        }

        if (errorMessage == "") {

            var divId = "leaveType_" + $('#LeaveCategoryID').val();
            //Start :- Delete old leave mapping 
            if ($('#' + divId).length > 0) {
                $('#' + divId).remove();
            }
            //End :- Delete old leave mapping 

            var editDivId = "leaveTypeForEdit_" + $('#LeaveCategoryID').val();
            var rowId = "AssignedLeaveOld_" + $('#LeaveCategoryID').val();
            if ($('#' + divId).length > 0) {
                errorMessage += "Leave type already configured. Please select different leave type.";
                $('#LeaveValidationMessage').children('ul').append(errorMessage);
                $('#LeaveValidationMessage').css('display', 'block')
            }
            else if ($('#' + rowId).length > 0 && $('#PolicyLeaveMappingID').val() == 0) {
                errorMessage += "Leave type already configured. Please select different leave type.";
                $('#LeaveValidationMessage').children('ul').append(errorMessage);
                $('#LeaveValidationMessage').css('display', 'block')
            }
            else {
                $("#leaves").append('<div id="' + divId + '"></div>');

                var newPolicy = new Object;

                $('<input>').attr({
                    type: 'hidden',
                    name: "policyLeaves.Index",
                    value: $('#LeaveCategoryID').val()

                }).appendTo($('#' + divId));

                $('#divStepLeave input[type=checkbox]').each(function () {
                    var value = (this.checked ? true : false);
                    $('<input>').attr({
                        type: 'hidden',
                        name: "policyLeaves[" + $('#LeaveCategoryID').val() + "]." + $(this).attr('name'),
                        value: value
                    }).appendTo($('#' + divId));
                    newPolicy[$(this).attr('name')] = value;
                });

                $('#divStepLeave input[type=radio]').each(function () {

                    var value = (this.checked ? true : false);
                    if (value) {
                        $('<input>').attr({
                            type: 'hidden',
                            name: "policyLeaves[" + $('#LeaveCategoryID').val() + "]." + $(this).attr('name'),
                            value: $(this).val()
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
                        name: "policyLeaves[" + $('#LeaveCategoryID').val() + "]." + $(this).attr('name'),
                        value: $(this).val()
                    }).appendTo($('#' + divId));
                    newPolicy[$(this).attr('name')] = $(this).val();
                });
                newPolicies.push(newPolicy);
                var newTRid = "AssignedLeaveNew_" + $('#LeaveCategoryID').val();

                //Start :- Set priority according to leave clubbing
                var leaveCategoryId = $('#LeaveCategoryID').val();
                if ($('#txtSortOrder_' + leaveCategoryId).length > 0) {
                    if ($('#LeaveClubbingType_NotPermitted').is(':checked')) {
                        $('#txtSortOrder_' + leaveCategoryId).val(0);
                        $('#txtSortOrder_' + leaveCategoryId).addClass('disabled');
                        $("#txtSortOrder_" + $('#LeaveCategoryID').val()).attr("data-IsLeaveClubbing", "False");
                        //$('#txtSortOrder_' + leaveCategoryId).attr('disabled', 'disabled');
                    }
                    else if ($('#LeaveClubbingType_Permitted').is(':checked')) {
                        //$('#txtSortOrder_' + leaveCategoryId).val('');
                        $('#txtSortOrder_' + leaveCategoryId).removeClass('disabled');
                        $("#txtSortOrder_" + $('#LeaveCategoryID').val()).attr("data-IsLeaveClubbing", "True");
                    }
                }
                //End :- Set priority according to leave clubbing

                if ($('#PolicyLeaveMappingID').val() == 0 && $('#' + newTRid).length <= 0) {

                    var leaveText = $('#LeaveCategoryID option:selected').text().replace(')', '');

                    var leaveName = leaveText.split('(')[0];

                    var leaveAbbreviation = leaveText.split('(')[1];

                    var newAssignedLeaveRow = '<tr id="AssignedLeaveNew_' + $('#LeaveCategoryID').val() + '">';

                    newAssignedLeaveRow += '<td style="width: 50%;">'
                    newAssignedLeaveRow += '<span title=' + leaveName + ' data-original-title=' + leaveName + '>' + leaveName + '</span>'
                    newAssignedLeaveRow += '</td>';
                    newAssignedLeaveRow += '<td style="width: 20%;">';
                    if ($('#LeaveClubbingType_NotPermitted').is(':checked')) {
                        newAssignedLeaveRow += '<input autocomplete = "off" data-IsLeaveClubbing = "False" class="form-control NumOnly disabled" type="text" placeholder="#" name="policyLeaves[' + $('#LeaveCategoryID').val() + '].SortOrder" id= "txtSortOrder_' + $('#LeaveCategoryID').val() + '" value = "0">'
                    }
                    else {
                        newAssignedLeaveRow += '<input autocomplete = "off" class="form-control NumOnly" data-IsLeaveClubbing = "True" type="text" placeholder="#" name="policyLeaves[' + $('#LeaveCategoryID').val() + '].SortOrder" id= "txtSortOrder_' + $('#LeaveCategoryID').val() + '">'
                    }
                    newAssignedLeaveRow += '</td>';
                    newAssignedLeaveRow += '<td style="width: 30%;" class="text-center">';
                    newAssignedLeaveRow += '<a href="javascript:void(0);" class="" title="Edit" data-original-title="Edit" data-LeaveCategoryID = ' + $('#LeaveCategoryID').val() + ' id="EditLeavePolicyNew_' + $('#LeaveCategoryID').val() + '"><span class="fa fa-pencil"></span></a>';
                    newAssignedLeaveRow += '<a href="javascript:void(0);" class="text-danger margin-left-15" title="Delete" data-original-title="Delete" id="DeleteLeavePolicyNew_' + $('#LeaveCategoryID').val() + '"><span class="glyphicon glyphicon-trash"></span></a>';
                    newAssignedLeaveRow += '</td>';
                    newAssignedLeaveRow += '</tr>';
                    $('#AssignedLeaveCategories').append(newAssignedLeaveRow);
                }
                else if ($('#PolicyLeaveMappingID').val() > 0) {
                    var isLeaveClubbing = "True";
                    if ($('#LeaveClubbingType_NotPermitted').is(':checked')) {
                        isLeaveClubbing = "False";    
                    }
                    
                    $("#txtSortOrder_" + $('#LeaveCategoryID').val()).attr("data-IsLeaveClubbing",isLeaveClubbing);
                }
                var leaveCategories = [];
                $('[id^="txtSortOrder_"]').each(function () {
                    var idSplit = $(this).attr('id').split('_');
                    var categoryId = idSplit[1];
                    leaveCategories.push(parseInt(categoryId));
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
        }
        else {
            $('#LeaveValidationMessage').children('ul').append(errorMessage);
            $('#LeaveValidationMessage').css('display', 'block')
        }
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
    });

    $(document).on('keypress', '.multipleOfHalf', function () {
        var $this = $(this);
        if ((event.which != 46 || $this.val().indexOf('.') != -1) &&
           ((event.which < 48 || event.which > 57) &&
           (event.which != 0 && event.which != 8))) {
            event.preventDefault();
        }

        var text = $(this).val();
        if ((event.which == 46) && (text.indexOf('.') == -1)) {
            setTimeout(function () {
                if ($this.val().substring($this.val().indexOf('.')).length > 3) {
                    $this.val($this.val().substring(0, $this.val().indexOf('.') + 3));
                }
            }, 1);
        }

        if ((text.indexOf('.') != -1) &&
            (text.substring(text.indexOf('.')).length > 1) &&
            (event.which != 0 && event.which != 8) &&
            ($(this)[0].selectionStart >= text.length - 1)) {
            event.preventDefault();
        }
    });

});