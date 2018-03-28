$(document).ready(function () {
    $("#SubContractorMasterTable").DataTable().search("").draw();
    $(document).on("click", "#btnSubContractorMaster", function () {
        var StatusId = null;
        if (StatusId == null) {
            StatusId = 0
        }
        $("#subContractorModel").modal('show');
        $.ajax({
            url: '/SubContractorMaster/AddEditSubContractorMaster',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            async: false,
            data: JSON.stringify({ ID: StatusId }),
            dataType: 'html',
            success: function (data) {
                if (data) {
                    $("#SalesChannelTitle").text("Add Sub Contractor");
                    $('#SalesChannelModelBody').empty();
                    $('#SalesChannelModelBody').html(data);
                    custome_scroll_init();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });

    });
    $(document).on("click", "[name='DeleteSubcontractor']", function () {
        DeleteProjectStatus(this);
    });
    $(document).on("click", ".EditSubcontractor", function () {

        var StatusId = $(this).attr('data-ID');

        $("#salesChannelModel").modal('show');
        $.ajax({
            type: "POST",
            url: "/SubContractorMaster/AddEditSubContractorMaster",
            async: false,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ ID: StatusId }),
            dataType: 'html',
            success: function (data) {
                if (data) {
                    $("#SalesChannelTitle").text("Update Sub Contractor");
                    $('#SalesChannelModelBody').empty();
                    $('#SalesChannelModelBody').html(data);
                    custome_scroll_init();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    });
    $(document).on("click", ".DeleteSubcontractor", function () {
        var ID = $(this).attr('data-statusId');
        if (confirm("Are you sure you want to Delete the Sub Contractor ?") == true) {
            $.ajax({
                url: "/SubContractorMaster/DeleteSubContractorMaster",
                type: "POST",
                async: false,
                data: JSON.stringify({ ID: ID }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data) {
                        toastr.success("Sub Contractor has been deleted successfully");
                        ListOfSubContractorMasterData();
                    }
                    else {
                        toastr.success("Error occured while deleting Sub Contractor");
                    }
                }
            });
        }
    });
    function ListOfSubContractorMasterData() {
        $.ajax({
            url: '/SubContractorMaster/GetAllSubContractorMaster',
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





