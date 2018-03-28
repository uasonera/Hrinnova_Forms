$(document).ready(function () {
    $("#SalesChannelMasterTable").DataTable().search("").draw();
    $(document).on("click", "#btnSalesChannelMaster", function () {
        var StatusId = null;
        if (StatusId == null) {
            StatusId = 0
        }
        $("#salesChannelModel").modal('show');
        $.ajax({
            url: '/SalesChannelMaster/AddEditSalesChannelMaster',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            async: false,
            data: JSON.stringify({ ID: StatusId }),
            dataType: 'html',
            success: function (data) {
                if (data) {
                    $("#SalesChannelTitle").text("Add Sales Channel");
                    $('#SalesChannelModelBody').empty();
                    $('#SalesChannelModelBody').html(data);
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

        var StatusId = $(this).attr('data-ID');

        $("#salesChannelModel").modal('show');
        $.ajax({
            type: "POST",
            url: "/SalesChannelMaster/AddEditSalesChannelMaster",
            async: false,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ ID: StatusId }),
            dataType: 'html',
            success: function (data) {
                if (data) {
                    $("#SalesChannelTitle").text("Update Sales Channel");
                    $('#SalesChannelModelBody').empty();
                    $('#SalesChannelModelBody').html(data);
                    custome_scroll_init();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    });
    $(document).on("click", ".DeleteStatus", function () {
        var ID = $(this).attr('data-statusId');
        if (confirm("Are you sure you want to Delete the Sales Channel ?") == true) {
            $.ajax({
                url: "/SalesChannelMaster/DeleteSalesChannelMaster",
                type: "POST",
                async: false,
                data: JSON.stringify({ ID: ID }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data) {
                        toastr.success("Sales Channel has been deleted successfully");
                        ListOfSalesChannelData();
                    }
                    else {
                        toastr.success("Error occured while deleting Sales Channel");
                    }
                }
            });
        }
    });
    function ListOfSalesChannelData() {
        $.ajax({
            url: '/SalesChannelMaster/GetAllSalesChannelMaster',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            async: false,
            dataType: 'html',
            success: function (data) {
                if (data) {
                    $('#divstatus').empty();
                    $('#divstatus').html(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    }
})





