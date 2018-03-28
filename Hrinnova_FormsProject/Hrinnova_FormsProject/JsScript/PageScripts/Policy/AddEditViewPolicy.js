function OnPolicySaveSuccess(result) {
    if (result == true) {
        $('#myModal').modal('hide');
        $.ajax({
            url: '/policy/PolicyTable',
            type: 'GET',
            success: function (result) {
                $('#divPolicyData').empty();
                $('#divPolicyData').html(result);
                data_table_init();
            },
            async: false
        });
        toastr.success("Policy saved successfully.");
    }
    else {
        toastr.error("Error occured while saving policy.");
    }
}
function OnError(Data) {
    alert(Data.responseText)
}