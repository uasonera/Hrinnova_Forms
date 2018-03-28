$(document).ready(function () {

    $("#gotomarketmastertable").DataTable().search("").draw();

    $(document).on("click", "#btnSaveGoToMaster", function () {
       
        var StatusId = null;
        if (StatusId == null) {
            StatusId = 0
        }
        $("#gotoMasterModel").modal('show');
        $.ajax({
            url: '/GoToMarketMaster/AddEditGoToMarketMaster',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            async: false,
            data: JSON.stringify({ ID: StatusId }),
            dataType: 'html',
            success: function (data) {
                if (data) {
                    $("#gotomasterTitle").text("Add Go To Market");
                    $('#gotomasterModelBody').empty();
                    $('#gotomasterModelBody').html(data);
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
      
        $("#gotoMasterModel").modal('show');
        $.ajax({
            type: "POST",
            url: "/GoToMarketMaster/AddEditGoToMarketMaster",
            async: false,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ ID: StatusId }),
            dataType: 'html',
            success: function (data) {
                if (data) {
                    $("#gotomasterTitle").text("Update Go To Market");
                    $('#gotomasterModelBody').empty();
                    $('#gotomasterModelBody').html(data);
                    custome_scroll_init();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    });
    $(document).on("click", ".DeleteStatus", function () {
        var ID = $(this).attr('data-statusId');
        if (confirm("Are you sure you want to Delete the Go To Market ?") == true) {
            $.ajax({
                url: "/GoToMarketMaster/DeleteGoToMarketMaster",
                type: "POST",
                async: false,
                data: JSON.stringify({ ID: ID }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data) {
                        toastr.success("Go to Market has been deleted successfully");
                        ListOfGotoMasterData();
                    }
                    else {
                        toastr.success("Error occured while deleting Go To Market");
                    }
                }
            });
        }
    });
    function ListOfGotoMasterData() {
        $.ajax({
            url: '/GoToMarketMaster/GetAllGoToMarketMaster',
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