$(document).ready(function () {
    $("#workitemtable").DataTable().search("").draw();
    $(document).on("click", "#btnAddworkitem", function () {
        var WorkItemId = $('#WorkitemId').val();
        if (WorkItemId == null) {
            WorkItemId = 0
        }
        $("#worktypeModel").modal('show');
        $.ajax({
            url: '/WorkItem/AddEditWorkItem',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            async: false,
            data: JSON.stringify({ WorkItemId: WorkItemId }),
            dataType: 'html',
            success: function (data) {
                if (data) {
                    $("#WorkitemTitle").text("Add Work Item");
                    $('#worktypeModelBody').empty();
                    $('#worktypeModelBody').html(data);
                    custome_scroll_init();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    });
    $(document).on("click", ".EditworkEvent", function () {
        var workeventId = $(this).attr('data-id');
        $("#worktypeModel").modal('show');
        $.ajax({
            type: "POST",
            url: "/WorkItem/AddEditWorkItem",
            async: false,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ WorkItemId: workeventId }),
            dataType: 'html',
            success: function (data) {
                if (data) {
                    $("#WorkitemTitle").text("Update Work Item");
                    $('#worktypeModelBody').empty();
                    $('#worktypeModelBody').html(data);
                    custome_scroll_init();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    });

    $(document).on("click", ".ActiveInactiveworkitem", function () {
        var workItemId = $(this).attr('data-id');
        var IsActive = $(this).attr("data-IsActive");
        var Title = "Deactivate";
        if (!IsActive) {
            Title = "Activate"
        }
        if (confirm("Are you sure you want to " + Title + " the work item?")) {
            $.ajax({
                url: "/WorkItem/ActiveInactiveworkItem",
                type: "POST",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify({ workItemId: workItemId, IsActive: IsActive }),
                dataType: 'json',
                success: function (result) {
                    if (result == "true") {
                        ListOfworkItemData();
                    }
                    else if (result == "false") {
                        toastr.success("The workitem is already being used in active project so you cannot deactivate it");
                    }
                    else {
                        ListOfworkItemData();
                    }
                },
                error: function () { }
            });
        }
    });

    $(document).on("click", ".DeleteworkEvent", function () {
        checkWorkItemsIsInUse(this);
    });
});
function ClearFormworkItem() {
    $("#worktypeModel").modal('hide');
    $('#worktypeModelBody').empty();

}
function ListOfworkItemData() {
    $.ajax({
        url: '/WorkItem/GetWorkItemList',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        //data: JSON.stringify({ StatusId: StatusId }),
        dataType: 'html',
        success: function (data) {
            if (data) {
                $('#divWorkItem').empty();
                $('#divWorkItem').html(data);
                data_table_init();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function checkWorkItemsIsInUse(obj) {
    var workItemId = $(obj).attr("data-id");
    var IsDelete = true;
    $.ajax({
        url: "/WorkItem/CheckIfworkItemIsInUse",
        type: "POST",
        async: false,
        data: JSON.stringify({ workItemId: workItemId }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data) {
                toastr.error("The work Item is already being used in project(s) so you cannot delete it");
            }
            else {
                DeleteWorkItem(obj, IsDelete, workItemId);
            }
        }
    });

}
function DeleteWorkItem(obj, IsDelete, workItemId) {
    if (confirm("Are you sure you want to Delete the work item?") == true) {
        $.ajax({
            url: "/WorkItem/DeleteWorkItemtype",
            type: "POST",
            async: false,
            data: JSON.stringify({ IsDelete: IsDelete, workitemId: workItemId }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    toastr.success("Work Item has been deleted successfully");
                    ListOfworkItemData();
                }
                else {
                    toastr.success("Error occured while deleting work Item");
                }
            }
        });
    }
}