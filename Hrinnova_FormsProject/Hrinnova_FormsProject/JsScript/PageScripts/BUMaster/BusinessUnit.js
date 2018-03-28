$(document).ready(function () {
    $("#BUMasterTable").DataTable().search("").draw();
    $(document).on("click", "#btnBUMaster", function () {
        var StatusId = null;
        if (StatusId == null) {
            StatusId = 0
        }
        $("#BUModel").modal('show');
        $.ajax({
            url: '/BUMaster/AddEditBUMaster',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            async: false,
            data: JSON.stringify({ ID: StatusId }),
            dataType: 'html',
            success: function (data) {
                if (data) {
                    $("#BusinessUnitTitle").text("Add Business Unit");
                    $('#BusinessUnitModelBody').empty();
                    $('#BusinessUnitModelBody').html(data);
                  
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

        $("#BUModel").modal('show');
        $.ajax({
            type: "POST",
            url: '/BUMaster/AddEditBUMaster',
            async: false,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ ID: StatusId }),
            dataType: 'html',
            success: function (data) {
                if (data) {
                    $("#BusinessUnitTitle").text("Update Business Unit");
                    $('#BusinessUnitModelBody').empty();
                    $('#BusinessUnitModelBody').html(data);
                    custome_scroll_init();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    });
    $(document).on("click", ".Deletebu", function () {
        var ID = $(this).attr('data-statusId');
        //var isdefault = $(this).attr('data-isdefault');
        //if (isdefault == "True") {
        //    toastr.error("You cannot delete default business unit.");
        //}
        //else {
            if (confirm("Are you sure you want to delete the business unit ?") == true) {
                $.ajax({
                    url: '/BUMaster/DeleteBUMaster',
                    type: "POST",
                    async: false,
                    data: JSON.stringify({ ID: ID }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        if (data) {
                            toastr.success("Business Unit has been deleted successfully");
                            ListOfBuData();
                        }
                        else {
                            toastr.success("Error occured while deleting Business Unit");
                        }
                    }
                });
            }
      

    });
    function ListOfBuData() {
        $.ajax({
            url: '/bumaster/GetAllBUMaster',
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





