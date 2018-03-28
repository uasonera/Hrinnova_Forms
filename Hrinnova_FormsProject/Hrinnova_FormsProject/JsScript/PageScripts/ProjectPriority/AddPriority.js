$(document).ready(function () {

    $('#IsDefault').bootstrapSwitch();
  //  $('#color-select').colorpicker();
    $('#color-select').colorpicker().on('changeColor', function (e) {
        $('#ColorCode').css({ "background": e.color.toHex(), "color": e.color.toHex() });
    });
    $("[name='defaultImage']").click(function () {
        var imageName = $(this).attr('data-imageName');
        var parentLi = $(this).attr('data-parentLI');
        $('#IconPath').val(imageName);
        $("*[name='defaultImageLI']").removeClass('active');
        $('#' + parentLi).addClass('active');
        $('#iconImage').val('');
    });
    $("#iconImage").change(function () {
        if ($(this).val() != '') {
            $('#IconPath').val('');
            $("*[name='defaultImageLI']").removeClass('active');
        }
    });
    $("#btnSavePriority").click(function () {
        $('#ulError').html('');
        $('#priorityValidation').css('display', 'none');
        var error = '';
        if ($('#Name').val() == '') {
            error += '<li>Please enter priority name</li>';
        }
        if ($('#ColorCode').val() == '') {
            error += '<li>Please select color for priority</li>';
        }
        if ($('#IconPath').val() == '' && $('#iconImage').val() == '') {
            error += '<li>Please select icon for priority</li>';
        }
        if (error == '' && $('#iconImage').val() != '' && !ValidateExtension($('#iconImage'))) {
            error += '<li>Please select valid image</li>';
            $('#iconImage').val('');
        }
        if (error == '' && $('#iconImage').val() != '') {
            var fileSize = $('#iconImage').get(0).files[0].size;
            if (Math.round(parseInt(fileSize) / 1000) > 50) {
                error += '<li>Image size must be less than 50KB </li>';
            }
        }

        if (error != '') {
            $('#ulError').append(error);
            $('#priorityValidation').css('display', 'block');
        }
        else {
            var fd = new FormData($('#frmAddPriority').get(0));
            $.ajax({
                url: "/ProjectPriority/SavePriority",
                type: "POST",
                data: fd,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data) {
                        $('#myAddPriorityModal').modal('toggle');
                        toastr.success("Priority has been added successfully");
                        updatePriorityListingTable();

                    }
                    else {
                        toastr.success("Error occured while adding priority");
                    }
                }
            });
        }
    });
});