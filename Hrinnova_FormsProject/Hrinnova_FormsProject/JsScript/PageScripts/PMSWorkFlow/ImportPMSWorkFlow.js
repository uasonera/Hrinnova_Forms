$(document).ready(function () {
    $("#drpFromProject").change(function () {
        if ($(this).val() != "") {
            $("#drpworkflow").empty();
            var validate = ValidateWorkflowStatus($(this).val(), $("#drpToProject").val());
            if ($("#drpFromProject").val() == $("#drpToProject").val()) {
                $("#drpworkflow").empty();
                $('#errormessagevalidate').css('display', 'block');
                $('#errormessagevalidate').html("<ul><li>Same Project is not allowed into From Project </li></ul>");
                $("#drpFromProject").closest(".form-group").addClass("has-error  has-feedback");
                $('ul li:empty').remove();
            }
            else {
                if (validate) {
                    BindWorkflow($(this).val());
                }
                else {
                    $('#errormessagevalidate').css('display', 'block');
                    $('#errormessagevalidate').html("<ul><li>Few Statuses of workflow are not mapped with current project and thus cannot be imported </li></ul>");
                    $('ul li:empty').remove();
                }
            }
        }
        else {
            $("#drpworkflow").empty();
        }

    });
    $("#drpToProject").change(function () {

        if ($(this).val() != "" && $("#drpFromProject").val() != "") {
            if ($(this).val() == $("#drpFromProject").val()) {
                $("#drpworkflow").empty();
                $('#errormessagevalidate').css('display', 'block');
                $('#errormessagevalidate').html("<ul><li>Same Project is not allowed into To Project </li></ul>");
                $("#drpToProject").closest(".form-group").addClass("has-error  has-feedback");
                $('ul li:empty').remove();
            }
            else {
                $("#drpworkflow").empty();
                var validate = ValidateWorkflowStatus($("#drpFromProject").val(), $("#drpToProject").val());
                if (!validate) {
                    $("#drpworkflow").empty();
                    $('#errormessagevalidate').css('display', 'block');
                    $('#errormessagevalidate').html("<ul><li>Few Statuses of workflow are not mapped with current project and thus cannot be imported </li></ul>");
                    $('ul li:empty').remove();
                }
                else {
                    BindWorkflow($("#drpFromProject").val());
                }
            }
        }
        else {
            $("#drpworkflow").empty();
            $('#errormessagevalidate').css('display', 'block');
            $('#errormessagevalidate').html("<ul><li>Please Select From Project </li></ul>");
            $("#drpFromProject").closest(".form-group").addClass("has-error  has-feedback");
            $('ul li:empty').remove();
        }

    });
    $("#drpworkflow").change(function () {
        if ($(this).val() != "") {
            BindWorkflowGrid();
        }
        else {
            $("#drpworkflow").empty();
        }

    });

    $(document).on('click', '#btnExport', function () {
        var clonetextName = $.trim($("#cloneWorkflowName").val());
        var FromPrpject = $("#drpFromProject").val(); 
        var ToProject = $("#drpToProject").val();
        var Iscustomscreen = $("#chkIsimportcustomscreen").is(':checked');
        var selectedworkflows = [];
        if ($('#drpworkflow :selected').length > 0) {
            //build an array of selected values
            $('#drpworkflow :selected').each(function (i, selected) {
                selectedworkflows[i] = $(selected).val();
            });
        }
        var strErrorMessage = '';
        $('#errorMessage').html('');
        $('#errorMessage').hide();
        var Formdata = JSON.stringify({
            FromProjectId: FromPrpject,
            ToProjectId: ToProject,
            selectedworkflow: JSON.stringify(selectedworkflows),
            Iscustomscreenlinked: Iscustomscreen 
        });
        if (ValidateImportWorkflow())
        {
            $.ajax({
                url: "/PMSWorkFlow/SaveImportworkflow",
                type: "POST",
                async: false,
                contentType: 'application/json; charset=utf-8',
                data: Formdata,
                dataType: "json",
                success: function (data) {
                    if (data == "true") {
                        toastr.success("Workflow is imported successfully.");
                        ResetForm();
                    }
                    else {
                        strErrorMessage += '<li>' + data + '</li>';
                        $('#errorMessage').css('display', 'block');
                        $('#errorMessage').html("<ul>" + strErrorMessage + "</ul>");
                        $('ul li:empty').remove();
                    }
                }
            });
        }
       

    });
    $(document).on('click', '.removeSelection', function () {
        var workFlowId = $(this).attr('data-workFlowId');
        $("#tBody_work tr#tr_" + workFlowId).remove();
        $('#drpworkflow').val(workFlowId).trigger("chosen:updated");
    });
    $(document).on('click', '.Viewworkflow', function () {
        var workflowid = $(this).data('workflowid');
        var FromProjectId = $("#drpFromProject").val();
        $("#ViewworkflowModel").modal('show');
        $.ajax({
            url: '/PMSWorkFlow/ViewWorkFlow',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            async: false,
            data: JSON.stringify({ WorkFlowId: workflowid, FromProjectId: FromProjectId }),
            dataType: 'html',
            success: function (data) {
                if (data) {
                    $('#viewworkflowModelBody').empty();
                    $('#viewworkflowModelBody').html(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    });
    $(document).on('click', '#btnReset', function () {
        ResetForm();
    });
    $(document).on('click', '#btnCancel', function () {
        window.location.href = "/pmsworkflow/index";
    });
});
function BindWorkflow(ProjectId) {
    $.ajax({
        type: "POST",
        url: '/PMSWorkFlow/GetAllworkflowofproject',
        data: { "ProjectId": ProjectId },
        beforeSend: function () {
            ShowProgress();
        },
        success: function (data) {
            $("#drpworkflow").empty();
            //$("#drpworkflow").append($('<option></option>').val("").html("Select Cycle"));
            $.each(data, function (id, option) {
                $("#drpworkflow").append($('<option></option>').val(option.Value).html(option.Text));
            });
            $('#drpworkflow').trigger("chosen:updated");
            HideProgress();
        }
    });
}
function HideProgress() {
    $('.loader-wrapper').css('display', 'none');
}

function ShowProgress() {

    if ($('.loader-wrapper').css('display') == "none") {
        $(".loader-wrapper").show();
    }
}
function BindWorkflowGrid() {

    var selectedworkflows = [];
    if ($('#drpworkflow :selected').length > 0) {
        //build an array of selected values
        $('#drpworkflow :selected').each(function (i, selected) {
            selectedworkflows[i] = $(selected).val();
        });
    }
    $.ajax({
        type: "GET",
        data: { workflowselectedId: JSON.stringify(selectedworkflows) },
        url: '/PMSWorkFlow/GetListofworkflows',
        dataType: "html",
        beforeSend: function () {
            ShowProgress();
        },
        success: function (result) {
            HideProgress();
            $('#workflowdatalisting').html(result);
            data_table_init();
        }
    });
}
function ValidateImportWorkflow() {
    var status = true;
    $(".form-group").removeClass("has-error  has-feedback");
    var FromProject = $("#drpFromProject").val();
    var ToProject = $("#drpToProject").val();
    var Workflow = $("#drpworkflow").val();
    
    var strErrorMessage = '';
    $('#errormessagevalidate').html('');
    $('#errormessagevalidate').hide();
    if (FromProject == "") {
        strErrorMessage += "<li>Please Select From project</li>";
        $("#drpFromProject").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (ToProject == "") {
        strErrorMessage += "<li>Please Select To project</li>";
        $("#drpToProject").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (Workflow == "" || Workflow == null) {
        strErrorMessage += "<li>Please Select workflows</li>";
        $("#drpworkflow").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }

    if (status == false && strErrorMessage != null) {
        $('#errormessagevalidate').css('display', 'block');
        $('#errormessagevalidate').html("<ul>" + strErrorMessage + "</ul>");
        $('ul li:empty').remove();
    }

    return status;
}
function ValidateWorkflowStatus(FromProjectId, ToProjectId) {
    var status = true;
    $(".form-group").removeClass("has-error  has-feedback");
    var strErrorMessage = '';
    $('#errormessagevalidate').html('');
    $('#errormessagevalidate').hide();
    $.ajax({
        type: "POST",
        url: '/PMSWorkFlow/ValidateToProjectworkflowStaus',
        data: { "FromProjectId": FromProjectId, "ToProjectId": ToProjectId },
        async: false,
        beforeSend: function () {
            ShowProgress();
        },
        success: function (data) {
            status = data;
            HideProgress();
        }
    });
    return status;
}
function ResetForm()
{
    $('#drpFromProject').val('').trigger("chosen:updated");
    $('#drpworkflow').val('').trigger("chosen:updated");
    $('#drpFromProject').val('').trigger("chosen:updated");
    $("#chkIsimportcustomscreen").prop('checked', false);
    $("#errormessagevalidate").html('');
    $("#errormessagevalidate").css('display', 'none');
    $("#tBody_work tr").remove();
    $("#tBody_work").html("<tr><td colspan='3' class='text-center'>No Workflows</td></tr>");
}


