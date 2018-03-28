$(document).ready(function () {
    $("#workFlowTable").DataTable().search("").draw();
    $(document).on('click', '.workItems', function () {
        var id = $(this).attr('data-workFlowId');
        $.ajax({
            type: 'get',
            url: '/PMSWorkFlow/WorkItemMapping',
            dataType: 'html',
            data: { workflowId: id },
            success: function (data) {
                $('#workItemBody').html(data);
                $('#workItemModal').modal('show');
                setupCheckboxes();
                custome_scroll_init();
            }
        });
    });
    $('#addWorkflow').click(function () {
        window.location.href = '/PMSWorkFlow/AddEditWorkFlow';
    });
    $(document).on('click', '.editworkflow', function () {
        var workflowId = $(this).data('workflowid');
        window.location.href = '/PMSWorkFlow/AddEditWorkFlow?WorkFlowId=' + workflowId;
    });
    $(document).on('click', '.cloneScreen', function () {
        var id = $(this).attr('data-workFlowId');
        $.ajax({
            type: 'get',
            url: '/PMSWorkFlow/CloneWorkflow',
            dataType: 'html',
            data: { workflowId: id },
            success: function (data) {
                $('#CloneBody').html(data);
                $('#colneModel').modal('show');
            }
        });
    });
    $(document).on('click', '.deselectWorkItem', function () {
        var workItemTypeId = $(this).attr('data-workItemId');
        $('#mappedWorkItemLI_' + workItemTypeId).remove();
        $('#' + workItemTypeId).attr('checked', false);
        $('#allWorkItemLI_' + workItemTypeId).show();
    });
    $(document).on('change', '[name="workItemTypeIds"]', function () {
        var workItemTypeId = $(this).attr('data-workItemId');
        var workItemTypeName = $(this).attr('data-workItemName');
        $('#allWorkItemLI_' + workItemTypeId).hide();
        var html = '<li class="margin-bottom-5" id="mappedWorkItemLI_' + workItemTypeId + '">';
        html += '<span class="h4">';
        html += '<span class="label label-primary">' + workItemTypeName + ' ';
        html += '<i class="fa fa-times cursor-pointer deselectWorkItem" data-workItemId ="' + workItemTypeId + '" >';
        html += '</i></span></</i></span></span></li>'
        $('#mappedWorkItemsUL').append(html);
    });
    $(document).on('click', '#saveWorkItemMapping', function () {
        var fd = new FormData($('#frmWorkItems').get(0));
        $.ajax({
            url: "/PMSWorkFlow/SaveWorkItemWorkflowMappings",
            type: "POST",
            data: fd,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data == true) {
                    toastr.success("Mapping saved successfully.");
                    $('#workItemModal').modal('hide');
                }
                else {
                    toastr.error(data);
                }
            }
        });
    });
    $(document).on('click', '#saveClone', function () {
        var clonetextName = $.trim($("#cloneWorkflowName").val());
        var strErrorMessage = '';
        $('#errorMessage').html('');
        $('#errorMessage').hide();
        if (clonetextName != "") {
            var fd = new FormData($('#frmCloneWorkflow').get(0));
            $.ajax({
                url: "/PMSWorkFlow/CreateCloneForWorkflow",
                type: "POST",
                data: fd,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == "true") {
                        toastr.success("Clone created successfully.");
                        $('#colneModel').modal('hide');
                        updateWorkflowListingTable()
                    }
                    else {
                        strErrorMessage += '<li>' + data + '</li>';
                        //$("#cloneWorkflowName").closest(".form-group").addClass("has-error  has-feedback");
                        $('#errorMessage').css('display', 'block');
                        $('#errorMessage').html("<ul>" + strErrorMessage + "</ul>");
                        $('ul li:empty').remove();
                    }
                }
            });
        }
        else {
            strErrorMessage += "<li>Please enter workflow name</li>";
            //$("#cloneWorkflowName").closest(".form-group").addClass("has-error  has-feedback");
            $('#errorMessage').css('display', 'block');
            $('#errorMessage').html("<ul>" + strErrorMessage + "</ul>");
            $('ul li:empty').remove();
        }
    });
    $(document).on('click', '.activate', function () {
        var id = $(this).attr('data-workFlowId');
        var obj = $(this);
        $.ajax({
            url: '/PMSWorkFlow/CheckIfAllStatusandCustomScreenActive',
            type: 'get',
            dataType: 'json',
            data: { workflowId: id },
            async: false,
            success: function (data) {
                if (!data) {
                    if (confirm("Are you sure you want to activate the workflow?")) {
                        $.ajax({
                            type: "post",
                            url: "/PMSWorkFlow/ChangeActiveStatus",
                            async: false,
                            contentType: "application/json",
                            dataType: 'json',
                            data: JSON.stringify({ workflowId: id, status: true }),
                            success: function (data) {
                                if (data) {
                                    obj.removeClass('fa-ban text-danger').removeClass('activate');
                                    obj.addClass('fa-check').addClass('text-success').addClass('deactivate');
                                }
                            },
                        });
                    }
                }
                else {
                    toastr.error("You can not active the workflow because some Status OR Custom screen currently unavailable. Please Add OR Active them.");
                }
            }
        });
    });
    $(document).on('click', '.deactivate', function () {
        var id = $(this).attr('data-workFlowId');
        var obj = $(this);
        $.ajax({
            url: '/PMSWorkFlow/CheckIfWorkflowIsAssignedToWorkItem',
            type: 'get',
            dataType: 'json',
            data: { workflowId: id },
            async: false,
            success: function (data) {
                if (!data) {
                    if (confirm("Are you sure you want to Deactivate the workflow ?")) {
                        $.ajax({
                            type: "post",
                            url: "/PMSWorkFlow/ChangeActiveStatus",
                            async: false,
                            contentType: "application/json",
                            dataType: 'json',
                            data: JSON.stringify({ workflowId: id, status: false }),
                            success: function (data) {
                                if (data) {
                                    obj.removeClass('fa-check').removeClass('text-success').removeClass('deactivate');
                                    obj.addClass('fa-ban text-danger').addClass('activate');
                                }
                            },
                        });
                    }
                }
                else {
                    toastr.error("You cannot deactivate the workflow as it is already assigned to a work item");
                }
            }
        });
    });
});
function updateWorkflowListingTable() {
    $.ajax({
        url: "/PMSWorkFlow/WorkflowListing",
        type: "GET",
        dataType: "html",
        success: function (data) {
            $('#divWorkflowList').html(data);
            data_table_init();
        }
    });
}
