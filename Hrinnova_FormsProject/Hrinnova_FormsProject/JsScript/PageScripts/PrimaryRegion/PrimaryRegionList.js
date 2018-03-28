$(document).ready(function () {
    //$("#PrimaryRegionMastertable").DataTable().search("").draw();
    $(document).on("click", "#btnAddPrimaryRegion", function () {
        var ID = $('#ID').val();
        if (ID == null) {
            ID = 0
        }
        $("#PrimaryRegionModel").modal('show');
        $.ajax({
            url: '/PrimaryRegionMaster/AddEditPrimaryRegion',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            async: false,
            data: JSON.stringify({ ID: ID }),   
            dataType: 'html',
            success: function (data) {
                if (data) {
                    $("#PrimaryRegionTitle").text("Add Primary Region");
                    $('#PrimaryRegionModelBody').empty();
                    $('#PrimaryRegionModelBody').html(data);
                    custome_scroll_init();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    });
    $(document).on("click", ".EditPrimaryRegion", function () {
        var ID = $(this).attr('data-id');
        $("#PrimaryRegionModel").modal('show');
        $.ajax({
            type: "POST",
            url: '/PrimaryRegionMaster/AddEditPrimaryRegion',
            async: false,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ ID: ID }),
            dataType: 'html',
            success: function (data) {
                if (data) {
                    console.log("success");
                    $("#PrimaryRegionTitle").text("Update Primary Region");
                    $('#PrimaryRegionModelBody').empty();
                    $('#PrimaryRegionModelBody').html(data);
                    custome_scroll_init();
                    console.log("Data: " + data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error");
            }
        });
    });
});

$(document).on("click", ".deletePrimaryRegion", function () {
    var ID = $(this).attr('data-Id');
    if (confirm("Are you sure you want to Delete the Primary Region?") == true) {
        $.ajax({
            url: "/PrimaryRegionMaster/DeletePrimaryRegion",
            type: "POST",
            async: false,
            data: JSON.stringify({ ID: ID }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    toastr.success("Primary Region has been deleted successfully");
                    ListOfPrimaryRegionData();
                }
                else {
                    toastr.error("Error occured while deleting Primary Region");
                }
            }
        });
    }
});

function ListOfPrimaryRegionData() {
    $.ajax({
        url: '/PrimaryRegionMaster/GetPrimaryRegionlist',
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

//$(document).on("click", "[name='deleteServiceoffer']", function () {
//    var serviceoffId = this.attr("data-serviceoffId");
//    DeleteServiceOffer(serviceoffId);
//});   