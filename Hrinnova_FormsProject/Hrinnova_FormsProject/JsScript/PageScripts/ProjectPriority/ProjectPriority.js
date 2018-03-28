$(document).ready(function () {
    $("#priorityTable").DataTable().search("").draw();
    $(document).on('page.dt', '#priorityTable', function () {
        setTimeout(function () { $('[name="priorityDefault"]').bootstrapSwitch(); }, 5);
        //$('[name="priorityDefault"]').bootstrapSwitch();
    });

    $("[name='priorityDefault']").bootstrapSwitch();

    $(document).on("switchChange.bootstrapSwitch", "[name='priorityDefault']", function () {
        SetPriorityDefaultStatus(this);
    });
    $(document).on("click", "[name='priorityActive']", function () {
        SetPriorityActiveStatus(this);
    });
    $('#addPriority').click(function () {
        $.ajax({
            url: "/ProjectPriority/AddPriority",
            type: "POST",
            dataType: "html",
            success: function (data) {
                $('#divUpdatePriority').html('');
                $('#divAddPriority').html(data);
                $('#myAddPriorityModal').modal();
                $('#IsDefault').bootstrapSwitch();
                $('#color-select').colorpicker();
                custome_scroll_init();
            }
        });
    });
    $(document).on('click', "[name='editPriority']", function () {
        var priorityId = $(this).attr('data-priorityId');
        $.ajax({
            url: "/ProjectPriority/UpdatePriority",
            type: "POST",
            data: { priorityId: priorityId },
            dataType: "html",
            success: function (data) {
                $('#divAddPriority').html('');
                $('#divUpdatePriority').html(data);
                $('#updatePriorityModal').modal();
                custome_scroll_init();
            }
        });
    });
    $(document).on("click", "[name='deletePriority']", function () {
        DeleteProjectPriorityStatus(this);
    });
});
function SetPriorityDefaultStatus(obj) {
    var priorityId = $(obj).attr("data-priorityId");
    var isDefault = $(obj).is(":checked");
    $.ajax({
        url: "/ProjectPriority/SetPriorityAsDefault",
        type: "POST",
        data: JSON.stringify({ isDefault: isDefault, priorityId: priorityId }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (!data) {
                toastr.error("Error occured while marking priority as default priority");
            }
        }
    });
}
function SetPriorityActiveStatus(obj) {
    var priorityId = $(obj).attr("data-priorityId");
    var isActive = $(obj).attr("data-isActive");
    var makeActive = true;
    var activeStatus = "activate";
    //if (isActive == "true") {
    //    activeStatus = "deactivate";
    //    makeActive = false;
    //    $.ajax({
    //        url: "/ProjectPriority/CheckIfPriorityIsInUse",
    //        type: "POST",
    //        async: false,
    //        data: JSON.stringify({ priorityId: priorityId }),
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (data) {
    //            if (data) {
    //                toastr.error("The priority is already being used in active project(s) so you cannot deactivate it");
    //            }
    //            else {
    //                ChangePriorityActiveStatus(obj, makeActive, priorityId);
    //            }
    //        }
    //    });
    //}
    //else {
    //    ChangePriorityActiveStatus(obj, makeActive, priorityId);
    //}
    ChangePriorityActiveStatus(obj, isActive, priorityId);
}

var _validFileExtensions = [".jpg", ".jpeg", ".png"];

function ValidateExtension(arrInputs) {

    for (var i = 0; i < arrInputs.length; i++) {
        var oInput = arrInputs[i];
        if (oInput.type == "file") {
            var sFileName = oInput.value;
            if (sFileName.length > 0) {
                var blnValid = false;
                for (var j = 0; j < _validFileExtensions.length; j++) {
                    var sCurExtension = _validFileExtensions[j];
                    if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                        blnValid = true;
                        break;
                    }
                }

                if (!blnValid) {
                    //alert("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
                    return false;
                }
            }
        }
    }

    return true;
}
function updatePriorityListingTable() {

    $.ajax({
        url: "/ProjectPriority/PriorityTable",
        type: "GET",
        dataType: "html",
        success: function (data) {
            $('#divPolicyData').html(data);
            $("[name='priorityDefault']").bootstrapSwitch();
            data_table_init();
        }
    });
}
function ChangePriorityActiveStatus(obj, ActiveStatus, PriorityId) {
    var activeStatusString = "deactivate";
    var isActive = $(obj).attr("data-isActive");
    if (ActiveStatus == "false") {
        isActive = true;
        activeStatusString = "activate";
    }
    else {
        isActive = false;
    }
    if (confirm("Are you sure you want to " + activeStatusString + " the priority?") == true) {
        $.ajax({
            url: "/ProjectPriority/SetPriorityAsActive",
            type: "POST",
            async: false,
            data: JSON.stringify({ isActive: isActive, priorityId: PriorityId }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    if (isActive == true) {
                        updatePriorityListingTable();
                    }
                    else {
                        updatePriorityListingTable();
                    }
                }
            }
        });
    }
}
function DeleteProjectPriorityStatus(obj) {
    var priorityId = $(obj).attr("data-priorityId");
    var IsDelete = true;
    $.ajax({
        url: "/ProjectPriority/CheckIfPriorityIsInUse",
        type: "POST",
        async: false,
        data: JSON.stringify({ priorityId: priorityId }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data) {
                toastr.error("The priority is already being used in project(s) so you cannot delete it");
            }
            else {
                DeletePriority(obj,IsDelete, priorityId);
            }
        }
    });

}
function DeletePriority(obj, IsDelete, PriorityId) {
    if (confirm("Are you sure you want to Delete the priority?") == true) {
        $.ajax({
            url: "/ProjectPriority/DeleteProjectPriority",
            type: "POST",
            async: false,
            data: JSON.stringify({ IsDelete: IsDelete, priorityId: PriorityId }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    toastr.success("Priority has been deleted successfully");
                    updatePriorityListingTable();
                }
                else {
                    toastr.success("Error occured while deleting priority");
                }
            }
        });
    }
}