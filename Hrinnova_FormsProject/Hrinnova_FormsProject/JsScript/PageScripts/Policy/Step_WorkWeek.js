$(document).ready(function () {
    $(document).on('click', '[id^=AddWorkWeekConfig]', function () {
        //var addConfigId = $(this).attr('id');
        //configRowId = '#' + addConfigId.split('_')[1] + '_' + addConfigId.split('_')[2];
        //$(configRowId).css('display', 'block');
        
        var policyId = $(this).attr('data-policyId');
        var policyWorkWeekMappingId = $(this).attr('data-policyWorkWeekMappingId');
        var workDayNameId = $(this).attr('data-workDayNameId');
        var rowNo = $(this).attr('data-rowNo');
        var maxRows = $(this).attr('data-maxRows');
        var Mode = $(this).attr('data-Mode');
        var placementDIV = "#" + $(this).attr('data-placementDIV');
        var DayName = $(this).attr('data-DayName');
        var divID = DayName + "_" + rowNo;
        $('[id^="AddWorkWeekConfig_' + workDayNameId + '_"]').hide();
        //$('[id^="DeleteWorkWeekConfig_' + workDayNameId + '_"]').hide();
        if ($('#' + divID).length == 0) {
            $.ajax({
                url: '/policy/WorkWeekConfiguration',
                type: 'GET',
                data: { policyId: policyId, policyWorkWeekMappingId: policyWorkWeekMappingId, workDayNameId: workDayNameId, rowNo: rowNo, maxRows: maxRows},
                success: function (result) {

                    //var data = '<div id="' + divID + '">' + result + '</div>'
                    $(placementDIV).append(result);
                    setupCheckboxesForNewRow(divID);
                    chosen_init();
                },
                async: false
            });
        }
        var lastRowNo = 0;
        
        $('[id^="' + DayName + '_WorkDayType_"]').each(function () {
            var tempRowNo = $(this).attr('data-thisRow');
            if (parseInt(tempRowNo) > parseInt(lastRowNo)) {
                lastRowNo = tempRowNo;
            }
        });
        
        if (parseInt(lastRowNo) == parseInt(maxRows)) {
            $('[id^="AddWorkWeekConfig_' + workDayNameId + '_"]').hide();
        }
        
    });
    $(document).on('click', '#SaveWorkWeekStep', function () {
        $('#workWeekStepValidationMessage').children('ul').html('');
        $('#workWeekStepValidationMessage').css('display', 'none');
        var errorMessage = "";
        var totalConflicts = 0;
        $('[id$=WorkDayType_1]').each(function () {
          
            var isDropDownsInValid = false;
            var conflictDropDownId = 0;
            var drpVals = [];
            var thisId = $(this).attr('id');
            var MaxRows = $(this).attr('data-maxRows');
            for (var i = 1; i <= MaxRows; i++) {
                var drpDiv = '#' + thisId.split('_')[0] + '_' + thisId.split('_')[1] + '_' + i;
                if ($(drpDiv).length) {
                    drpVals.push($(drpDiv).val());
                }
            }

            var sorted_arr = drpVals.slice().sort();

            var results = [];
            for (var i = 0; i < drpVals.length - 1; i++) {
                if (sorted_arr[i + 1] == sorted_arr[i]) {
                    results.push(sorted_arr[i]);
                }
            }
            if (results.length > 0) {
                isDropDownsInValid = true;
                conflictDropDownId = $(this).attr('id');
                totalConflicts += 1;
                errorMessage += "<li>Please select different workday type for " + thisId.split('_')[0] + "</li>";
            }
            //var drp2Div = '#' + thisId.split('_')[1] + '_2';
            //var drp3Div = '#' + thisId.split('_')[1] + '_3';
            //var drp2Id = '#' + thisId.split('_')[0] + "_" + thisId.split('_')[1] + "_" + thisId.split('_')[2] + "_2";
            //var drp3Id = '#' + thisId.split('_')[0] + "_" + thisId.split('_')[1] + "_" + thisId.split('_')[2] + "_3";
            //var isDiv2Visible = false;
            //var isDiv3Visible = false;
            //if ($(drp3Div + ':visible').css('display') == 'block') {
            //    isDiv3Visible = true;
            //}
            //if ($(drp2Div + ':visible').css('display') == 'block') {
            //    isDiv2Visible = true;
            //}

            //if (this.value == $(drp2Id).val() && isDiv2Visible) {
            //    isDropDownsInValid = true;
            //    conflictDropDownId = $(this).attr('id');
            //    totalConflicts += 1;
            //    errorMessage += "<li>Please select different workday type for " + thisId.split('_')[1] + "</li>";
            //}
            //else if (this.value == $(drp3Id).val() && isDiv3Visible) {
            //    isDropDownsInValid = true;
            //    conflictDropDownId = $(drp3Id).val();
            //    totalConflicts += 1;
            //    errorMessage += "<li>Please select different workday type for " + thisId.split('_')[1] + "</li>";
            //}
            //else if ($(drp2Id).val() == $(drp3Id).val() && isDiv2Visible && isDiv3Visible) {
            //    isDropDownsInValid = true;
            //    conflictDropDownId = $(drp2Id).val();
            //    totalConflicts += 1;
            //    errorMessage += "<li>Please select different workday type for " + thisId.split('_')[1] + "</li>";
            //}
        });
        $('[id*=_row1_]').each(function () {
            var thisId = $(this).attr('id');
           
            var thisIdSplit = thisId.split('_');
            if (thisIdSplit[2] == 'last') {
                return true;
            }
            var MaxRows = $(this).attr('data-maxRows');
            var checkStatus = false;
            var checkCount = 0;
            for (var i = 1; i <= MaxRows; i++) {
                var rowId = '#' + thisIdSplit[0] + '_row' + i + '_' + thisIdSplit[2];
                if ($(rowId).length && $(rowId).is(":checked") == true) {
                    checkCount++;
                }
            }
            if (checkCount == 0) {
                var weekName = "";

                if (thisIdSplit[2].toString() == "1") {
                    weekName = "First";
                }
                else if (thisIdSplit[2].toString() == "2") {
                    weekName = "Second";
                }
                else if (thisIdSplit[2].toString() == "3") {
                    weekName = "Third";
                }
                else if (thisIdSplit[2].toString() == "4") {
                    weekName = "Fourth";
                }
                else if (thisIdSplit[2].toString() == "5") {
                    weekName = "Fifth";
                }
                errorMessage += "<li>Please select " + weekName + " week for " + thisId.split('_')[0] + "</li>";
            }
            else if (checkCount > 1) {
                var weekName = "";

                if (thisIdSplit[2].toString() == "1") {
                    weekName = "First";
                }
                else if (thisIdSplit[2].toString() == "2") {
                    weekName = "Second";
                }
                else if (thisIdSplit[2].toString() == "3") {
                    weekName = "Third";
                }
                else if (thisIdSplit[2].toString() == "4") {
                    weekName = "Fourth";
                }
                else if (thisIdSplit[2].toString() == "5") {
                    weekName = "Fifth";
                }
                errorMessage += "<li>Please select only one " + weekName + " week for " + thisId.split('_')[0] + "</li>";
            }
        });

        if (errorMessage == "") {
            $('[id*=Monday_row1_1]').each(function () {
             
                var thisSplit = $(this).attr('id').split('_');
                var rowNo = $(this).attr('data-rowNo');
                var MaxRows = $(this).attr('data-maxRows');
                for (var i = 1; i <= MaxRows; i++) {
                    var rowId = '#' + 'Monday_row' + i + '_' + thisSplit[2];
                    if (!($(rowId).length)) {
                        return true;
                    }
                    var isOne = '#' + 'Monday_row' + i + "_1";
                    var isTwo = '#' + 'Monday_row' + i + "_2";
                    var isThree = '#' + 'Monday_row' + i + "_3";
                    var isFour = '#' + 'Monday_row' + i + "_4";
                    var isFive = '#' + 'Monday_row' + i + "_5";
                    var isLast = '#' + 'Monday_row' + i + "_last";
                    var isChecked = false;
                    if ($(isOne).is(":checked") || $(isTwo).is(":checked") || $(isThree).is(":checked") || $(isFour).is(":checked") || $(isFive).is(":checked") || $(isLast).is(":checked")) {
                        isChecked = true;
                    }
                    if (!isChecked) {
                        errorMessage += "<li>Please select atleast one week for Monday for row " + i + "</li>";
                    }
                }
            });
            $('[id*=Tuesday_row1_1]').each(function () {
                var thisSplit = $(this).attr('id').split('_');
                var rowNo = $(this).attr('data-rowNo');
                var MaxRows = $(this).attr('data-maxRows');
                for (var i = 1; i <= MaxRows; i++) {
                    var rowId = '#' + 'Tuesday_row' + i + '_' + thisSplit[2];
                    if (!($(rowId).length)) {
                        return true;
                    }
                    var isOne = '#' + 'Tuesday_row' + i + "_1";
                    var isTwo = '#' + 'Tuesday_row' + i + "_2";
                    var isThree = '#' + 'Tuesday_row' + i + "_3";
                    var isFour = '#' + 'Tuesday_row' + i + "_4";
                    var isFive = '#' + 'Tuesday_row' + i + "_5";
                    var isLast = '#' + 'Tuesday_row' + i + "_last";
                    var isChecked = false;
                    if ($(isOne).is(":checked") || $(isTwo).is(":checked") || $(isThree).is(":checked") || $(isFour).is(":checked") || $(isFive).is(":checked") || $(isLast).is(":checked")) {
                        isChecked = true;
                    }
                    if (!isChecked) {
                        errorMessage += "<li>Please select atleast one week for Tuesday for row " + i + "</li>";
                    }
                }
            });
            $('[id*=Wednesday_row1_1]').each(function () {
                var thisSplit = $(this).attr('id').split('_');
                var rowNo = $(this).attr('data-rowNo');
                var MaxRows = $(this).attr('data-maxRows');
                for (var i = 1; i <= MaxRows; i++) {
                    var rowId = '#' + 'Wednesday_row' + i + '_' + thisSplit[2];
                    if (!($(rowId).length)) {
                        return true;
                    }
                    var isOne = '#' + 'Wednesday_row' + i +  "_1";
                    var isTwo = '#' + 'Wednesday_row' + i + "_2";
                    var isThree = '#' + 'Wednesday_row' + i + "_3";
                    var isFour = '#' + 'Wednesday_row' + i + "_4";
                    var isFive = '#' + 'Wednesday_row' + i + "_5";
                    var isLast = '#' + 'Monday_row' + i + "_last";
                    var isChecked = false;
                    if ($(isOne).is(":checked") || $(isTwo).is(":checked") || $(isThree).is(":checked") || $(isFour).is(":checked") || $(isFive).is(":checked") || $(isLast).is(":checked")) {
                        isChecked = true;
                    }
                    if (!isChecked) {
                        errorMessage += "<li>Please select atleast one week for Wednesday for row " + i + "</li>";
                    }
                }
            });
            $('[id*=Thursday_row1_1]').each(function () {
                var thisSplit = $(this).attr('id').split('_');
                var rowNo = $(this).attr('data-rowNo');
                var MaxRows = $(this).attr('data-maxRows');
                for (var i = 1; i <= MaxRows; i++) {
                    var rowId = '#' + 'Thursday_row' + i + '_' + thisSplit[2];
                    if (!($(rowId).length)) {
                        return true;
                    }
                    var isOne = '#' + 'Thursday_row' + i + "_1";
                    var isTwo = '#' + 'Thursday_row' + i + "_2";
                    var isThree = '#' + 'Thursday_row' + i + "_3";
                    var isFour = '#' + 'Thursday_row' + i + "_4";
                    var isFive = '#' + 'Thursday_row' + i + "_5";
                    var isLast = '#' + 'Thursday_row' + i + "_last";
                    var isChecked = false;
                    if ($(isOne).is(":checked") || $(isTwo).is(":checked") || $(isThree).is(":checked") || $(isFour).is(":checked") || $(isFive).is(":checked") || $(isLast).is(":checked")) {
                        isChecked = true;
                    }
                    if (!isChecked) {
                        errorMessage += "<li>Please select atleast one week for Thursday for row " + i + "</li>";
                    }
                }
            });
            $('[id*=Friday_row1_1]').each(function () {
                var thisSplit = $(this).attr('id').split('_');
                var rowNo = $(this).attr('data-rowNo');
                var MaxRows = $(this).attr('data-maxRows');
                for (var i = 1; i <= MaxRows; i++) {
                    var rowId = '#' + 'Friday_row' + i + '_' + thisSplit[2];
                    if (!($(rowId).length)) {
                        return true;
                    }
                    var isOne = '#' + 'Friday_row' + i + "_1";
                    var isTwo = '#' + 'Friday_row' + i + "_2";
                    var isThree = '#' + 'Friday_row' + i + "_3";
                    var isFour = '#' + 'Friday_row' + i + "_4";
                    var isFive = '#' + 'Friday_row' + i + "_5";
                    var isLast = '#' + 'Friday_row' + i + "_last";
                    var isChecked = false;
                    if ($(isOne).is(":checked") || $(isTwo).is(":checked") || $(isThree).is(":checked") || $(isFour).is(":checked") || $(isFive).is(":checked") || $(isLast).is(":checked")) {
                        isChecked = true;
                    }
                    if (!isChecked) {
                        errorMessage += "<li>Please select atleast one week for Friday for row " + i + "</li>";
                    }
                }
            });
            $('[id*=Saturday_row1_1]').each(function () {
                var thisSplit = $(this).attr('id').split('_');
                var rowNo = $(this).attr('data-rowNo');
                var MaxRows = $(this).attr('data-maxRows');
                for (var i = 1; i <= MaxRows; i++) {
                    var rowId = '#' + 'Saturday_row' + i + '_' + thisSplit[2];
                    if (!($(rowId).length)) {
                        return true;
                    }
                    var isOne = '#' + 'Saturday_row' + i +  "_1";
                    var isTwo = '#' + 'Saturday_row' + i + "_2";
                    var isThree = '#' + 'Saturday_row' + i + "_3";
                    var isFour = '#' + 'Saturday_row' + i + "_4";
                    var isFive = '#' + 'Saturday_row' + i + "_5";
                    var isLast = '#' + 'Saturday_row' + i + "_last";
                    var isChecked = false;
                    if ($(isOne).is(":checked") || $(isTwo).is(":checked") || $(isThree).is(":checked") || $(isFour).is(":checked") || $(isFive).is(":checked") || $(isLast).is(":checked")) {
                        isChecked = true;
                    }
                    if (!isChecked) {
                        errorMessage += "<li>Please select atleast one week for Saturday for row " + i + "</li>";
                    }
                }
            });
            $('[id*=Sunday_row1_1]').each(function () {
                var thisSplit = $(this).attr('id').split('_');
                var rowNo = $(this).attr('data-rowNo');
                var MaxRows = $(this).attr('data-maxRows');
                for (var i = 1; i <= MaxRows; i++) {
                    var rowId = '#' + 'Sunday_row' + i + '_' + thisSplit[2];
                    if (!($(rowId).length)) {
                        return true;
                    }
                    var isOne = '#' + 'Sunday_row' + i + "_1";
                    var isTwo = '#' + 'Sunday_row' + i + "_2";
                    var isThree = '#' + 'Sunday_row' + i + "_3";
                    var isFour = '#' + 'Sunday_row' + i + "_4";
                    var isFive = '#' + 'Sunday_row' + i + "_5";
                    var isLast = '#' + 'Sunday_row' + i + "_last";
                    var isChecked = false;
                    if ($(isOne).is(":checked") || $(isTwo).is(":checked") || $(isThree).is(":checked") || $(isFour).is(":checked") || $(isFive).is(":checked") || $(isLast).is(":checked")) {
                        isChecked = true;
                    }
                    if (!isChecked) {
                        errorMessage += "<li>Please select atleast one week for Sunday for row " + i + "</li>";
                    }
                }
            });
        }

        if (errorMessage != "") {
            $('#workWeekStepValidationMessage').children('ul').append(errorMessage);
            $('#workWeekStepValidationMessage').css('display', 'block')
        }
        else {
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

    });

    $(document).on('click', '[id^="DeleteWorkWeekConfig_"]', function () {
        var DayName = $(this).attr('data-DayName');
        var rowNo = $(this).attr('data-rowNo');
        var weekDayNameId = $(this).attr('data-workDayNameId');
        var mappingId = $(this).attr('data-policyWorkWeekMappingId');
        var policyId = $(this).attr('data-policyId');
        var divID = DayName + "_" + rowNo;

        //$('.addWeekConfig').hide();

        if (mappingId != 0) {
            $.ajax({
                url: '/policy/DeletePolicyWorkWeekMapping',
                dataType: 'json',
                type: 'GET',
                data: { policyId: policyId, policyWorkWeekMappingId: mappingId },
                async: false,
                success: function (result) {
                  
                    if (result) {
                        $('#' + divID).remove();
                    }
                    else {
                        toastr.success("Error occured while deleting leave assignment");
                    }
                }
            });
        }
        else {
            $('#' + divID).remove();
        }

        var rowNo = 0;

        $('[id^="AddWorkWeekConfig_' + weekDayNameId + '_"]').each(function () {
            var tempRowNo = $(this).attr('data-thisRow');
            if (parseInt(tempRowNo) > parseInt(rowNo)) {
                rowNo = tempRowNo;
            }
        });

        $('#AddWorkWeekConfig_' + weekDayNameId + '_' + rowNo).show();
        //$('#DeleteWorkWeekConfig_' + weekDayNameId + '_' + rowNo).show();
    });
});
function setupCheckboxesForNewRow(inputId) {
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