$(document).ready(function () {
    $("#statusmastertable").DataTable().search("").draw();
    $('[data-IsDefaultElement="EditTable"]').bootstrapSwitch();
    $(document).on('page.dt', '#statusmastertable', function () {
        setTimeout(function () { $('[data-IsDefaultElement="EditTable"]').bootstrapSwitch(); }, 5);
    });
    $('[name="statusmastertable_length"]').on('change', function () {
        setTimeout(function () { $('[data-IsDefaultElement="EditTable"]').bootstrapSwitch(); }, 5);
    });
    $(document).on('change', '.sorting_asc', function () {
        setTimeout(function () { $('[data-IsDefaultElement="EditTable"]').bootstrapSwitch(); }, 5);
    });
    //$('[data-IsDefaultElement="EditValue"]').on('switchChange.bootstrapSwitch', function (event, state) {
    //    console.log(state);
    //});
    $(document).on("click", "#btnAddstatus", function () {
        var StatusId = $('#StatusId').val();
        if (StatusId == null) {
            StatusId = 0
        }
        $("#statusmasterModel").modal('show');
        $.ajax({
            url: '/StatusMaster/AddEditStatus',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            async: false,
            data: JSON.stringify({ StatusId: StatusId }),
            dataType: 'html',
            success: function (data) {
                if (data) {
                    $("#statusmasterTitle").text("Add Status");
                    $('#statusmasterModelBody').empty();
                    $('#statusmasterModelBody').html(data);
                    custome_scroll_init();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
       
    });
    $(document).on("click", "[name='deleteStatus']", function () {
        DeleteProjectStatus(this);
    });
    $(document).on("click", ".EditStatus", function () {
        var StatusId = $(this).attr('data-id');
        $("#statusmasterModel").modal('show');
        $.ajax({
            type: "POST",
            url: "/StatusMaster/AddEditStatus",
            async: false,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ StatusId: StatusId }),
            dataType: 'html',
            success: function (data) {
                if (data) {
                    $("#statusmasterTitle").text("Update Status");
                    $('#statusmasterModelBody').empty();
                    $('#statusmasterModelBody').html(data);
                    custome_scroll_init();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    });
    $(document).on("click", ".ActiveInactiveStatus", function () {
        var StatusId = $(this).attr('data-id');
        var IsActive = $(this).attr("data-IsActive");
        var Title = "Deactivate";
        if (IsActive == "False") {
            Title = "Activate"
        }
        if (confirm("Are you sure you want to " + Title + " the status?")) {
            $.ajax({
                url: "/StatusMaster/ActiveInactiveStatus",
                type: "POST",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify({ StatusId: StatusId, IsActive: IsActive }),
                dataType: 'json',
                success: function (result) {
                    if (result == "true") {
                        ListOfStatusData();
                    }
                    else if (result == "false") {
                        toastr.success("The status is already being used in active project so you cannot deactivate it");
                    }
                    else {
                        ListOfStatusData();
                    }
                },
                error: function () { }
            });
        }
    });
});
function ClearFormStatus() {
    $("#statusmasterModel").modal('hide');
    $('#statusmasterModelBody').empty();
    $('#txtstatusname').val('');
    $('#txtDescription').val('');
    $('#errorMessageAddEvent').empty();
}
function ListOfStatusData() {
    $.ajax({
        url: '/StatusMaster/GetStatusList',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        //data: JSON.stringify({ StatusId: StatusId }),
        dataType: 'html',
        success: function (data) {
            if (data) {
                $('#divstatus').empty();
                $('#divstatus').html(data);
                data_table_init();
                $('[data-IsDefaultElement="EditTable"]').bootstrapSwitch();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}


function DeleteProjectStatus(obj) {
    var StatusId = $(obj).attr("data-statusId");
    var IsDelete = true;
    $.ajax({
        url: "/StatusMaster/CheckIfStatusIsInUse",
        type: "POST",
        async: false,
        data: JSON.stringify({ StatusId: StatusId }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data) {
                toastr.error("The status is already being used in project(s) so you cannot delete it");
            }
            else {
                DeleteStatus(obj, IsDelete, StatusId);
            }
        }
    });

}
function DeleteStatus(obj, IsDelete, StatusId) {
    if (confirm("Are you sure you want to Delete the status?") == true) {
        $.ajax({
            url: "/StatusMaster/DeleteProjectStatus",
            type: "POST",
            async: false,
            data: JSON.stringify({ IsDelete: IsDelete, StatusId: StatusId }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    toastr.success("Status has been deleted successfully");
                    updateStatusListingTable();
                }
                else {
                    toastr.success("Error occured while deleting Status");
                }
            }
        });
    }
}

function updateStatusListingTable() {

    $.ajax({
        url: "/StatusMaster/GetStatusList",
        type: "GET",
        dataType: "html",
        success: function (data) {
            $('#divstatus').empty();
            $('#divstatus').html(data);
            data_table_init();
            $('[data-IsDefaultElement="EditTable"]').bootstrapSwitch();
        }
    });
}