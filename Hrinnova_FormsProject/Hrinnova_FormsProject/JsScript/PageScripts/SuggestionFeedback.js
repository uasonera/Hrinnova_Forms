$(document).ready(function () {
    page = 1;
    $("#btnReset").click(function () {
            ResetValues();
        
    });
    //$("#btnCancelSuggestion").click(function () {
    //    ClosePopUpDialogEdit();

    //});
    
    $(document).on('click', '#btnSearch', function () {
        LoadGridData(null, true, $("#txtFeedbackType").val(), $('#ddlSuggestiontype').val());
    });
    $(document).on("click", ".page-number", function () {

        page = parseInt($(this).html());
        LoadGridIntoPagination(page);
        return false;
    });
    $(document).on('click', '.DeleteList', function () {

        var Id = $(this).attr('data-SuggestionId');
        if (confirm("Do you want to delete this record?")) {
            $.ajax({
                url: "/UserDashboard/DeleteSuggestion",
                type: "POST",
                async: false,
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify({ ID: Id}),
                dataType: 'json',
                success: function (result) {
                    if (result == 'success') {
                        toastr.remove();
                        toastr.success("Record Deleted Successfully.");
                        LoadGridData(null, true, $("#txtFeedbackType").val(), $('#ddlSuggestiontype').val());
                    }
                    else {
                        toastr.remove();
                        toastr.error("Error occured while deleting Suggestion");
                    }
                    //else if (result == 'fail') {
                    //    toastr.remove();
                    //    toastr.warning("Suggestion is in use.Suggestion Can not be deleted");
                    //}

                    //Sort(sortParameter, currentDirection);
                    return true;
                },
                error: function () { }
            });
        }
        return true;
    });
    $(document).on('click', '.MoveToBackLogMapping', function () {
        var SuggestionId = $(this).data('suggestionid');
        $('#btnSuggestionSave').attr('data-SuggestionId', SuggestionId);
        var SuggestionTypeId = $(this).data('suggestiontypeid');
        $.ajax({
            url: "/UserDashboard/MoveToBackLog",
            type: "POST",
            async: false,
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ SuggestionId: SuggestionId}),
            dataType: 'html',
            success: function (result) {
                $("#ViewandMoveToBackLogDialog").html(result);
                OpenPopUpDialog(0);
            },
            error: function () { }
        });
        return false;
    });
    //jQuery('#EstimatedHour').keyup(function () {
    //    this.value = this.value.replace(/[^0-9\.]/g, '');
    //});
    $(document).on('click', '.EditSuggestion', function () {
       
        var SuggestionId = $(this).data('suggestionid');
        $('#btnResetSuggestion').remove();
        $.ajax({
            url: "/UserDashboard/EditSuggestion",
            type: "POST",
            async: false,
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ SuggestionId: SuggestionId }),
            dataType: 'html',
            success: function (result) {
                $("#ViewandMoveToBackLogDialog").html(result);
                $("#ViewandMoveToBackLogDialog").find("#btnAddSuggestion").attr('data-feedbackid', SuggestionId);
                $("#ViewandMoveToBackLogDialog").find("#btnAddSuggestion").html("<i class='fa fa-save'></i> Update");
                $("#ViewandMoveToBackLogDialog").find(".DeleteAttachment").attr('data-suggestionid', SuggestionId);
                $('#btnResetSuggestion').remove();
                OpenPopUpDialog(SuggestionId); 
                
            },
            error: function () { }
        });
        return false;
    });
    $(document).on('click','.ReplySuggestion',function () {
        
        var SuggestionId = $(this).data('suggestionid');
        var SuggestionType = $(this).data('suggestiontype');
        $.ajax({
            url: "/UserDashboard/ReplySuggestion",
            type: "POST",
            async: false,
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({ SuggestionId: SuggestionId }),
            dataType: 'html',
            success: function (result) {
                $("#ViewandMoveToBackLogDialog").html(result);
                $('#btnReplySuggestion').attr('data-feedbackid', SuggestionId);
                $('#btnReplySuggestion').attr('data-suggestiontype', SuggestionType);
                OpenReplayPopUpDialog(SuggestionType);
            },
            error: function () { }
        });
        return false;
    });

    $(".DownLoadAttachment").click(function () {
        var Attachment = $(this).attr("data-OrignalPathAttachment");
        window.location = "/UserDashboard/GetAttachmentPath" + "?FileWithPath=" + Attachment;
    });
})

function OpenPopUpDialog(SuggestionId) {
    var title="";
    if (SuggestionId == 0) {
        title = "Move To BackLog";
    }
    else {
        title = "Edit Suggestion";
    }
    
    $("#ViewandMoveToBackLogDialog").dialog({
        width: 600,
        height: 500,
        title: title,
        resizable: false,
        draggable: false,
        modal: true,
    });
    
    return false;
}
function OpenReplayPopUpDialog(SuggestionType) {
    var title="Reply of "+SuggestionType;
    $("#ViewandMoveToBackLogDialog").dialog({
        width: 600,
        height: 500,
        title: title,
        resizable: false,
        draggable: false,
        modal: true,
    });

    return false;
}

function ResetValues() {

    $('#ddlSuggestiontype').val('');
    $('#txtFeedbackType').val('');
    LoadGridData(null, true);
}
function ClosePopUpDialog() {
    $("#ViewandMoveToBackLogDialog").dialog('close');
    ClearPopUpData();
}
//function ClosePopUpDialogEdit() {
//    alert(1);
//    $("#ViewandMoveToBackLogDialog").dialog('close');
//}
function ClearPopUpData() {
    $('#Name').val("");
    $('#Description').val("");
    $("#Title").val("");
    $("#EstimatedHour").val("");
    $("#ddlSuggestiontypePopup").val("");
    $("#ddlTaskPrioritye").val("");
    $(".validation-summary-errors li").text("");
    $('.validation-summary-errors').removeClass('validation-summary-errors');
}

function LoadGridData(sortParameter, currentDirection, FeedbackBy, SuggestionType) {
    
    $.ajax({
        url: "/UserDashboard/GetAllSuggestionList",
        async: false,
        dataType:"html",
        contentType: "application/json;charset=utf-8",
        data: { page: page, sortExpression: sortParameter, sortDirection: currentDirection, FeedbackBy: FeedbackBy, SuggestionType: SuggestionType },
        success: function (data) {
            $('#gridView').html(data);
        }
    });
}
function LoadGridIntoPagination(Page) {

    $.ajax({
        url: "/UserDashboard/PaginationForGrid",
        async: false,
        dataType: "html",
       // contentType: "application/json;charset=utf-8",
        data: { page: page },
        success: function (data) {
            $('#gridView').html(data);
        }
    });
}
