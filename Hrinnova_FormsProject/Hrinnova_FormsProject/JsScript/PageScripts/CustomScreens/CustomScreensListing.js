$(document).ready(function () {
    $("#customScreensTable").DataTable().search("").draw();
    $('#addCustomScreens').click(function () {
        window.location.href = '/CustomScreens/AddCustomScreen';
    });
    $(document).on('click', '.editScreen', function () {
        var id = $(this).attr('data-screenId');
        window.location.href = '/CustomScreens/EditCustomScreen?id=' + id;
    });
    $(document).on('click', '.cloneScreen', function () {
        $("#colneModel").modal('show');
        var id = $(this).attr('data-screenId');
        $("#txtCustomescreenId").val(id);
        $("#txtCloneName").val('');
        $(".form-group").removeClass("has-error  has-feedback");
        $('#errorMessage').html('');
        $('#errorMessage').hide();
    });
    $(document).on('click', '#btnClone', function () {
        var clonetextName = $.trim($("#txtCloneName").val());
        var id = $("#txtCustomescreenId").val();
        var strErrorMessage = '';
        $('#errorMessage').html('');
        $('#errorMessage').hide();
        if (clonetextName != "") {
            $.ajax({
                url: '/CustomScreens/CloneCustomScreen',
                type: 'post',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({ customScreenId: id, cloneName: clonetextName }),
                async: false,
                success: function (data) {
                    if (data == "true") {
                        toastr.success("Clone created successfully");
                        updateCustomScreenListing();
                        $("#colneModel").modal('hide');
                    }
                    else {
                        toastr.error("Clone Screen Name already exist.");
                        $("#colneModel").modal('hide');
                    }
                }
            });
        }
        else {
            strErrorMessage += "<li>Please Enter Clone screen name</li>";
            $("#txtCloneName").closest(".form-group").addClass("has-error  has-feedback");
            $('#errorMessage').css('display', 'block');
            $('#errorMessage').html("<ul>" + strErrorMessage + "</ul>");
            $('ul li:empty').remove();
        }

    });
    $(document).on('click', '.activate', function () {
        var id = $(this).attr('data-screenId');
        var obj = $(this);
        if (confirm("Are you sure you want to activate the custom screen?")) {
            $.ajax({
                type: "post",
                url: "/CustomScreens/ChangeActiveStatus",
                async: false,
                contentType: "application/json",
                dataType: 'json',
                data: JSON.stringify({ customScreenId: id, status: true }),
                success: function (data) {
                    if (data) {
                        obj.removeClass('fa-ban text-danger').removeClass('activate');
                        obj.addClass('fa-check-circle-o').addClass('text-success').addClass('deactivate');
                        obj[0].title = "Active";
                    }
                },
            });
        }

    });
    $(document).on('click', '.deactivate', function () {
        var id = $(this).attr('data-screenId');
        var obj = $(this);
        $.ajax({
            url: '/CustomScreens/CheckIfScreenIsInUse',
            type: 'get',
            dataType: 'json',
            data: { customScreenId: id },
            async: false,
            success: function (data) {
                if (!data) {
                    if (confirm("Are you sure you want to Deactivate the custom screen ?")) {
                        $.ajax({
                            type: "post",
                            url: "/CustomScreens/ChangeActiveStatus",
                            async: false,
                            contentType: "application/json",
                            dataType: 'json',
                            data: JSON.stringify({ customScreenId: id, status: false }),
                            success: function (data) {
                                if (data) {
                                    debugger
                                    obj.removeClass('fa-check-circle-o').removeClass('text-success').removeClass('deactivate');
                                    obj.addClass('fa-ban text-danger').addClass('activate');
                                    obj[0].title = "Inactive";
                                }
                            },
                        });
                    }
                }
                else {
                    toastr.error("You cannot deactivate the custom screen as it is already being used in active workflow");
                }
            }
        });
    });

    $(document).on('click', '.DeleteScreen', function () {
        var id = $(this).attr('data-screenId');
        var obj = $(this);
        $.ajax({
            url: '/CustomScreens/CheckIfScreenIsInUseallworkflow',
            type: 'get',
            dataType: 'json',
            data: { customScreenId: id },
            async: false,
            success: function (data) {
                if (!data) {
                    if (confirm("Are you sure you want to Delete the custom screen ?")) {
                        $.ajax({
                            type: "post",
                            url: "/CustomScreens/DeleteCustomScreen",
                            async: false,
                            contentType: "application/json",
                            dataType: 'json',
                            data: JSON.stringify({ customScreenId: id, status: true }),
                            success: function (data) {
                                if (data) {
                                    toastr.success("Custom Screen has been deleted successfully");
                                    updateCustomScreenListing();
                                }
                                else
                                {
                                    toastr.success("Error occured while deleting custom screen");
                                }
                            },
                        });
                    }
                }
                else {
                    toastr.error("You cannot delete the custom screen as it is already being used in active/deactive workflows");
                }
            }
        });
    });
});
function updateCustomScreenListing() {

    $.ajax({
        url: "/CustomScreens/CustomScreenListing",
        type: "GET",
        dataType: "html",
        success: function (data) {
            $('#divCustomScreensListing').html(data);
            data_table_init();
        }
    });
}
