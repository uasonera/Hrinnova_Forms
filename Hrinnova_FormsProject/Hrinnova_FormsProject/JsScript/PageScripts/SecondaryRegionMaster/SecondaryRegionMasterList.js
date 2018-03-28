$(document).ready(function () {
    $("#SecondaryRegionMastertable").DataTable().search("").draw();
    $(document).on("click", "#btnAddSecondaryRegion", function () {
        var ID = $('#ID').val();
        ID = null;
        if (ID == null) {
            ID = 0
        }
        $("#SecondaryRegionModel").modal('show');
        $.ajax({
            url: '/SecondaryRegionMaster/AddEditSecondaryRegion',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            async: false,
            data: JSON.stringify({ ID: ID }),   
            dataType: 'html',
            success: function (data) {
                if (data) {
                    $("#SecondaryRegionTitle").text("Add Secondary Region");
                    $('#SecondaryRegionModelBody').empty();
                    $('#SecondaryRegionModelBody').html(data);
                    custome_scroll_init();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    });
    $(document).on("click", ".EditSecondaryRegion", function () {
        var ID = $(this).attr('data-id');
        $("#SecondaryRegionModel").modal('show');
        $.ajax({
            type: "POST",
            url: '/SecondaryRegionMaster/AddEditSecondaryRegion',
            async: false,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ ID: ID }),
            dataType: 'html',
            success: function (data) {
                if (data) {
                    console.log("success");
                    $("#SecondaryRegionTitle").text("Update Secondary Region");
                    $('#SecondaryRegionModelBody').empty();
                    $('#SecondaryRegionModelBody').html(data);
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

$(document).on("click", ".deleteSecondaryRegionMaster", function () {
    var ID = $(this).attr('data-id');
    if (confirm("Are you sure you want to Delete the Secondary Region?") == true) {
        $.ajax({
            url: "/SecondaryRegionMaster/DeleteSecondaryRegion",
            type: "POST",
            async: false,
            data: JSON.stringify({ ID: ID }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    toastr.success("Secondary Region has been deleted successfully");
                    ListOfserviceofferData();
                }
                else {
                    toastr.success("Error occured while deleting Secondary Region");
                }
            }
        });
    }
});

function ListOfserviceofferData() {
    $.ajax({
        url: '/SecondaryRegionMaster/GetSecondaryRegionlist',
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