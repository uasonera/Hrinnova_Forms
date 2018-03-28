$(document).ready(function () {
    $(document).on('click', '.clsEditPolicy', function () {
        var IsSession = false;
        $.ajax({
            url: '/AttendanceView/checkSessionTimeout',
            type: 'GET',
            contentType: 'application/json;charset=utf-8',
            async: false,
            dataType: 'json',
            success: function (data) {
                if (data) {
                    IsSession = true;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText)
            }
        });
        if (IsSession) {
            var mode = $(this).attr('data-mode');
            $.ajax({
                url: '/policy/AddEditViewPolicy',
                type: 'GET',
                data: { policyId: $(this).attr('id').split('_')[1], mode: $(this).attr('data-mode') },
                success: function (result) {
                    $('#myModalContent').empty();
                    $('#myModalContent').html(result);
                    $('#myModalLabel').empty();
                    if (mode == 'Edit') {
                        $('#myModalLabel').html("Edit Policy");
                    }
                    else {
                        $('#myModalLabel').html("View Policy");
                    }
                    $('#myModalProgressbar').attr('aria-valuenow', '25');
                    $('#myModalProgressbar').css('width', '25%');
                    $('#myModal').modal('show');
                    setupCheckboxes();
                    chosen_init();
                    staped_form_init();
                },
                async: false
            });
        }
        else
        {
            window.location.reload();
        }
    });
    $(document).on('click', '.policy-status', function () {
        var PolicyId = $(this).attr('data-id');
        ActiveInActiveStatus(PolicyId);
    });
    $(document).on('click', '.policy-default', function () {
        var PolicyId = $(this).attr('data-id');
        SetPolicyAsDefault(PolicyId);
    });
    function ActiveInActiveStatus(PolicyId) {
        $.ajax({
            type: "POST",
            url: '/policy/ActiveInactivePolicy',
            data: '{ "PolicyId":' + PolicyId + '}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                if (data) {
                    LoadGrid();
                    toastr.success("Status Changed Successfully")
                }
                else {
                    toastr.error("Status Not Changed Successfully")
                }

            }
        });
    }
    function SetPolicyAsDefault(PolicyId) {
        var oldDefaultPolicyId = 0;
        if ($('#defaultPolicy').length != 0) {
            oldDefaultPolicyId = $('#defaultPolicy').val();
        }

        $.ajax({
            type: "POST",
            url: '/policy/SetPolicyAsDefault',
            data: '{ "PolicyId":' + PolicyId + ',"oldDefaultPolicyId":' + oldDefaultPolicyId + '}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                if (data) {
                    LoadGrid();
                    toastr.success("Policy Set To Default Successfully")
                }
                else {
                    toastr.error("Error occured while setting policy as default policy")
                }

            }
        });
    }
    function LoadGrid() {
        $.ajax({
            type: "POST",
            url: '/Policy/PolicyTable',
            data: '{ }',
            dataType: "html",
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                $('#divPolicyData').empty().html(data);
                data_table_init();
            }
        });
    }
});