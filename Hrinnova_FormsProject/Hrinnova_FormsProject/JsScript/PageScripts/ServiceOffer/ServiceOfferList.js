$(document).ready(function () {
    $("#statusmastertable").DataTable().search("").draw();
    $(document).on("click", "#btnAddserviceoffer", function () {
        var ID = $('#ID').val();
        if (ID == null) {
            ID = 0
        }
        $("#ServiceofferModel").modal('show');
        $.ajax({
            url: '/ServiceOfferingMaster/AddEditServiceOffer',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            async: false,
            data: JSON.stringify({ ID: ID }),   
            dataType: 'html',
            success: function (data) {
                if (data) {
                    $("#serviceoffermasterTitle").text(" Add Service Offering");
                    $('#ServiceofferModelBody').empty();
                    $('#ServiceofferModelBody').html(data);
                    custome_scroll_init();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    });
    $(document).on("click", ".EditServiceoffer", function () {
        var ID = $(this).attr('data-id');
        $("#ServiceofferModel").modal('show');
        $.ajax({
            type: "POST",
            url: '/ServiceOfferingMaster/AddEditServiceOffer',
            async: false,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ ID: ID }),
            dataType: 'html',
            success: function (data) {
                if (data) {
                    console.log("success");
                    $("#serviceoffermasterTitle").text("Update Service Offering");
                    $('#ServiceofferModelBody').empty();
                    $('#ServiceofferModelBody').html(data);
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

$(document).on("click", ".deleteserviceoffer", function () {
    var ID = $(this).attr('data-serviceoffId');
    if (confirm("Are you sure you want to Delete the Service Offer ?") == true) {
        $.ajax({
            url: "/ServiceOfferingMaster/Deleteserviceoffer",
            type: "POST",
            async: false,
            data: JSON.stringify({ ID: ID }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    toastr.success("Service Offer has been deleted successfully");
                    ListOfserviceofferData();
                }
                else {
                    toastr.success("Error occured while deleting Service Offering");
                }
            }
        });
    }
});

function ListOfserviceofferData() {
    $.ajax({
        url: '/ServiceOfferingMaster/Getserviceofferlist',
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