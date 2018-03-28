$(document).ready(function () {
    var ProjectId = $("#ProjectId").val();
    var PMSworkflowId = $("#PMSWorkFlowID").val();
    if (PMSworkflowId != 0) {
        var lststatus = $("#lststatus").val() + ",";
        var arraystatus = lststatus.split(",");
        for (i = 0; i < arraystatus.length - 1; i++) {
            $("#ddlworkflowStatus option[value=" + arraystatus[i] + "]").attr('disabled', 'disabled');
        }
        $('#ddlworkflowStatus').trigger("chosen:updated");
    }
    $(document).on('click', '#addstatus', function () {
        $(".input-group").removeClass("has-error  has-feedback");
        var StatusId = $("#ddlworkflowStatus").val();
        if (StatusId > 0) {
            InsertStatus(StatusId);
        }
    });
    $(document).on('click', '.DeleteStatus', function () {
        var StatusId = $(this).attr("data-mapstatusid");
        var projectId = $("#ProjectId").val();
        var StatusNameFordelete = $('tr#tr_' + StatusId).find("td:first").text();
        $.ajax({
            url: "/PMSWorkFlow/RemoveStatusInWorkFlow",
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            async: false,
            data: JSON.stringify({ StatusId: StatusId, ProjectId: projectId, PMSWorkFlowID: PMSworkflowId }),
            dataType: 'json',
            success: function (data) {
                if (data) {
                    $('table#myworkflowStatus tr#tr_' + StatusId).remove();
                    $("#ddlworkflowStatus option[value=" + StatusId + "]").removeAttr('disabled');
                    $('#ddlworkflowStatus').trigger("chosen:updated");
                }
                else {
                    var Count = 0;
                    $("td.statename").each(function (e) {
                        if ($(this).text() == StatusNameFordelete) {
                            Count++;
                        }
                    });
                    if (Count != 0) {
                        toastr.error("Status is used into transition States");
                    }
                    else if(Count == 0 && data==false){
                        toastr.error("Status is used into work item section in Viewboard");
                    }


                }

            }
        });
    });
    $("#btnsaveworkflow").click(function () {
        AddUpdateWorkFlow();
    });
    $(document).on('click', '.addtransitionstate', function () {
        $("#add_transitionmodal").modal("show");
        $(this).parents(".mainTr").removeClass("danger");
        var TranstionId = 0;
        var TaskStatusId = $(this).attr('data-mapstatusid');
        $.ajax({
            url: '/PMSWorkFlow/AddTransition',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            async: false,
            data: JSON.stringify({ TranstionId: TranstionId, TaskStatusId: TaskStatusId }),
            dataType: 'html',
            success: function (data) {
                if (data) {
                    $("#transtionTitle").text("Add Transition");
                    $('#TransitionModelbody').empty();
                    $('#TransitionModelbody').html(data);
                    var DestinationStateId = $("#tr_" + TaskStatusId).find("tr:gt(0)");
                    for (i = 0; i < DestinationStateId.length; i++) {
                        var trDestinationState = DestinationStateId[i];
                        var id = (parseInt(trDestinationState.id.split('_')[2].toString()))
                        $("#ddlDestionaState option[value=" + id + "]").attr('disabled', 'disabled');
                    }
                    chosen_init();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    });
    $(document).on('click', '.Edittransition', function () {
        $("#add_transitionmodal").modal("show");
        var TranstionId = $(this).attr('data-transitionid');
        var TaskStatusId = $(this).attr('data-mapstatusid');
        var DestinationstateId = $(this).attr('data-destinationstateid');
        var projectId = ProjectId;
        $.ajax({
            url: '/PMSWorkFlow/EditTransitionPopup',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            async: false,
            data: JSON.stringify({ TranstionId: TranstionId, TaskStatusId: TaskStatusId, DestinationStateId: DestinationstateId, ProjectId: projectId }),
            dataType: 'html',
            success: function (data) {
                if (data) {
                    $("#transtionTitle").text("Update Transition");
                    $('#TransitionModelbody').empty();
                    $('#TransitionModelbody').html(data);
                    var DestinationStateId = $("#tr_" + TaskStatusId).find("tr:gt(0)");
                    for (i = 0; i < DestinationStateId.length; i++) {
                        var trDestinationState = DestinationStateId[i];
                        var id = (parseInt(trDestinationState.id.split('_')[2].toString()))
                        $("#ddlDestionaState option[value=" + id + "]").attr('disabled', 'disabled');
                    }
                    chosen_init();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    });
    $(document).on('click', '.Deletetransition', function () {
        var TranstionId = $(this).attr('data-transitionid');
        var TaskStatusId = $(this).attr('data-mapstatusid');
        var DestinationstateId = $(this).attr('data-destinationstateid');
        $.ajax({
            url: "/PMSWorkFlow/RemoveTranstion",
            data: { TranstionId: TranstionId, TaskStatusId: TaskStatusId, DestinationStateId: DestinationstateId },
            dataType: "html",
            success: function (data) {
                $(".tbodytransition tr#trstate_" + TaskStatusId + "_" + DestinationstateId).remove();
            }
        });
    });
    $(document).on('click', '#btnSaveTransition', function () {
        if (ValidateTransitionPopup()) {
            var TransitionId = $("#TransitionId").val();
            var TaskStatusID = $("#TaskStatusID").val();
            var DestinationTaskStateID = $("#ddlDestionaState option:selected").val();
            var TransitionStateName = $("#ddlDestionaState option:selected").text();
            var Description = $("#transitionDescription").val();
            var CustomScreenID = $("#ddlCustomscreen").val();
            var ScreenName = $("#ddlCustomscreen option:selected").text();
            if (CustomScreenID == "") {
                ScreenName = "";
                CustomScreenID = null;
            }
            var objtransition = JSON.stringify(
                           {

                               TransitionId: TransitionId,
                               TaskStatusID: TaskStatusID,
                               DestinationTaskStateID: DestinationTaskStateID,
                               TransitionStateName: TransitionStateName,
                               Description: Description,
                               CustomScreenID: CustomScreenID,
                               ScreenName: ScreenName,
                           }
                       );
            $.ajax({
                url: '/PMSWorkFlow/SaveTransition',
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                async: false,
                data: objtransition,
                dataType: 'html',
                success: function (data) {
                    if (data) {
                        $("#add_transitionmodal").modal("hide");
                        $('#TransitionModelbody').empty();
                        $("#addtransition_" + TaskStatusID).parent().find('tbody').append(data);
                        //$('#TransitionModelbody').html(data);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });
        }
    });
    $(document).on('click', '#btnEditTransition', function () {
        if (ValidateTransitionPopup()) {
            var TransitionId = $("#TransitionId").val();
            var TaskStatusID = $("#TaskStatusID").val();
            var DestinationTaskStateID = $("#ddlDestionaState option:selected").val();
            var DestinationID = $("#DestinationTaskStateID").val();
            var TransitionStateName = $("#ddlDestionaState option:selected").text();
            var Description = $("#transitionDescription").val();
            var CustomScreenID = $("#ddlCustomscreen").val();
            var ScreenName = $("#ddlCustomscreen option:selected").text();
            if (CustomScreenID == "") {
                ScreenName = "";
                CustomScreenID = null;
            }
            var objtransition = JSON.stringify(
                           {

                               TransitionId: TransitionId,
                               TaskStatusID: TaskStatusID,
                               DestinationTaskStateID: DestinationTaskStateID,
                               TransitionStateName: TransitionStateName,
                               Description: Description,
                               CustomScreenID: CustomScreenID,
                               ScreenName: ScreenName,
                           }
                       );
            $.ajax({
                url: '/PMSWorkFlow/EditworkflowTransition',
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                async: false,
                data: objtransition,
                dataType: 'html',
                success: function (data) {
                    var obj = jQuery.parseJSON(data);
                    $("#add_transitionmodal").modal("hide");
                    $('#TransitionModelbody').empty();
                    if (obj != null) {
                        $("#trstate_" + TaskStatusID + "_" + DestinationID + " .statename .label").html("");
                        $("#trstate_" + TaskStatusID + "_" + DestinationID + " .statename .label").html(obj.TransitionStateName);
                        $("#trstate_" + TaskStatusID + "_" + DestinationID + " .descriptiontranstion").html("");
                        $("#trstate_" + TaskStatusID + "_" + DestinationID + " .descriptiontranstion").html(obj.Description);
                        $("#trstate_" + TaskStatusID + "_" + DestinationID + " .ScreenName").html("");
                        $("#trstate_" + TaskStatusID + "_" + DestinationID + " .ScreenName").html(obj.ScreenName);
                        $("#trstate_" + TaskStatusID + "_" + DestinationID + " .editabletranstion a").attr("data-DestinationstateId", "");
                        $("#trstate_" + TaskStatusID + "_" + DestinationID + " .editabletranstion a").attr("data-DestinationstateId", obj.DestinationTaskStateID);
                        $("#trstate_" + TaskStatusID + "_" + DestinationID + " .deletabletranstion a").attr("data-DestinationstateId", "");
                        $("#trstate_" + TaskStatusID + "_" + DestinationID + " .deletabletranstion a").attr("data-DestinationstateId", obj.DestinationTaskStateID)
                        $("#trstate_" + TaskStatusID + "_" + DestinationID).attr('id', "trstate_" + TaskStatusID + "_" + DestinationTaskStateID);
                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });
        }
    });
    $("#btnCancel").click(function () {
        location.href = "http://" + location.host + "/PMSWorkFlow/index";
    });
});

function InsertStatus(StatusId) {
    jQuery.ajaxSettings.traditional = true
    $.ajax({
        url: "/PMSWorkFlow/AddStatusInWorkFlow",
        data: { StatusId: StatusId },
        dataType: "html",
        //contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#myworkflowStatus tbody#tbodyStatus").append(data);
            $("#ddlworkflowStatus option:selected").attr('disabled', 'disabled');
            $('#ddlworkflowStatus').val('');
            $('#ddlworkflowStatus').trigger("chosen:updated");

        }
    });
}
function AddUpdateWorkFlow() {
    if (ValidateWorkflow()) {
        var WorkFlowId = $("#PMSWorkFlowID").val();
        var workFlowname = $.trim($("#WorkFlowName").val());
        var Description = $.trim($("#Description").val());
        var ProjectId = $("#ProjectId").val();
        var IsActive = $("#IsActive").val();
        var CreatedBy = $("#CreatedBy").val();
        var UpdatedBy = $("#UpdatedBy").val();
        var objworkflow = JSON.stringify(
                       {

                           PMSWorkFlowID: WorkFlowId,
                           ProjectId: ProjectId,
                           WorkFlowName: workFlowname,
                           Description: Description,
                           IsActive: IsActive,
                           CreatedBy: CreatedBy,
                           UpdatedBy: CreatedBy
                       }
                   );
        $.ajax({
            url: "/PMSWorkFlow/SaveWorkFlow",
            type: "POST",
            contentType: 'application/json;charset=utf-8',
            async: false,
            data: objworkflow,
            dataType: 'json',
            success: function (data) {
                if (WorkFlowId > 0) {
                    toastr.success("Workflow has been updated successfully");
                }
                else {
                    toastr.success("Workflow has been added successfully");
                }
                location.href = "http://" + location.host + "/PMSWorkFlow/index";
            }
        });

    }
}
function ValidateWorkflow() {
    var status = true;
    $(".form-group").removeClass("has-error  has-feedback");
    $(".input-group").removeClass("has-error  has-feedback");
    var strErrorMessage = '';
    $('#errorMessageworkflow').html('');
    $('#errorMessageworkflow').hide();
    var workFlowname = $.trim($("#WorkFlowName").val());
    var Description = $.trim($("#Description").val());
    var CountofStatus = $('tbody#tbodyStatus tr').length;
    var NotstartedText = $('#ddlworkflowStatus option[value="' + Notstarted + '"]').text();
    var CountofNotstarted = $('tbody#tbodyStatus #tr_' + Notstarted).length
    if (workFlowname == "") {
        strErrorMessage += "<li>Please enter workflow name</li>";
        $("#WorkFlowName").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (CountofStatus == 1) {
        strErrorMessage += "<li>Please add status in workflow</li>";
        $("#ddlworkflowStatus").closest(".input-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (CountofStatus > 1 && CountofNotstarted == 0) {
        strErrorMessage += "<li><span class='label label-danger'>" + NotstartedText + "</span> Status should be part of Workflow Transition  as Starting Point </li>";
        $("#ddlworkflowStatus").closest(".input-group").addClass("has-error  has-feedback");
        status = false;
    }
    $(".mainTr").removeClass("danger");
    $("tbody.tbodytransition").each(function () {
        var Text = $(this).parents(".mainTr").find('.label-info').html();
        if ($(this).find(".Istransition").length == 0) {
            $(this).parents(".mainTr").addClass("danger");
            strErrorMessage += "<li>Please add transition into <span class='label label-danger'> " + Text + "</span> </li>";
            status = false;
        }
    })
    if (status == false && strErrorMessage != null) {
        $('#errorMessageworkflow').css('display', 'block');
        $('#errorMessageworkflow').html("<ul>" + strErrorMessage + "</ul>");
        $('ul li:empty').remove();
        $(window).scrollTop(0);
    }
    return status;
}
function ValidateTransitionPopup() {
    var status = true;
    $(".form-group").removeClass("has-error  has-feedback");
    var strErrorMessage = '';
    $('#errorMessagetransition').html('');
    $('#errorMessagetransition').hide();
    var DestionaState = $("#ddlDestionaState").val();
    var Customscreen = $("#ddlCustomscreen").val();
    var TaskStatusID = $("#TaskStatusID").val();
    if (DestionaState == "") {
        strErrorMessage += "<li>Please Enter Destination State</li>";
        $("#ddlDestionaState").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    //if (Customscreen == "") {
    //    strErrorMessage += "<li>Please Enter Screen</li>";
    //    $("#ddlCustomscreen").closest(".form-group").addClass("has-error  has-feedback");
    //    status = false;
    //}
    if (status == false && strErrorMessage != null) {
        $('#errorMessagetransition').css('display', 'block');
        $('#errorMessagetransition').html("<ul>" + strErrorMessage + "</ul>");
        $('ul li:empty').remove();
    }
    return status;
}

