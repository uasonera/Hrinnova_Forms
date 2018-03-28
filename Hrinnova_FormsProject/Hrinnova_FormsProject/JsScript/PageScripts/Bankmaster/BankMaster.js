$(document).ready(function () {
    $("#BankMastertable").DataTable().search("").draw();
    $('[data-IsDefaultElement="EditTable"]').bootstrapSwitch();
    $('#BankMastertable').on('page.dt', function () {
        setTimeout(function () { $('[data-IsDefaultElement="EditTable"]').bootstrapSwitch(); }, 5);
    });
    $('[name="BankMastertable_length"]').on('change', function () {
        setTimeout(function () { $('[data-IsDefaultElement="EditTable"]').bootstrapSwitch(); }, 5);
    });
    $('.sorting_asc').on('change', function () {
        setTimeout(function () { $('[data-IsDefaultElement="EditTable"]').bootstrapSwitch(); }, 5);
    });
    //$('[data-IsDefaultElement="EditValue"]').on('switchChange.bootstrapSwitch', function (event, state) {
    //    console.log(state);
    //});
    $(document).on('click', '#saveBankInfo', function () {
        //AddUpdateBank();
        event.preventDefault();
        if (ValidateBank()) {
            var $form = $('#frmBankMaster'),
                url = $form.attr('action');

            var posting = $.post(url, $('#frmBankMaster').serialize());
            $('.loader-wrapper').show()
            posting.done(function (data) {
                $('.loader-wrapper').hide()
                if (data.status == "success") {
                    toastr.success(data.message);
                    ListOfBankData();
                    GetBlankBankMasterForm(0);
                }
                else {
                    toastr.error(data.message);
                }
            });
        }
    });
    $(document).on('click', '#refreshBankInfo', function () {
        var bankId = $(this).attr('data-BankId');
        GetBlankBankMasterForm(bankId);
    });
    $(document).on('click', '#cancleBankInfo', function () {
        GetBlankBankMasterForm(0);
    });
    $(document).on("click", ".EditBank", function (e) {
        e.preventDefault();
        var BankId = $(this).attr('data-id');
        GetBlankBankMasterForm(BankId);
    });
    $(document).on("click", ".ActiveInactiveBank", function () {
        var BankId = $(this).attr('data-id');
        var IsActive = $(this).attr("data-IsActive");
        var Title = "Deactivate";
        if (IsActive == "False") {
            Title = "Activate"
        }
        if (confirm("Are you sure you want to " + Title + " the Bank?")) {
            $.ajax({
                url: "/BankMaster/ActiveInactiveBank",
                type: "POST",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify({ BankId: BankId, IsActive: IsActive }),
                dataType: 'json',
                success: function (result) {
                    if (result == "true") {
                        ListOfBankData();
                    }
                    else if (result == "false") {
                        toastr.success("The Bank is already being used in active project so you cannot deactivate it");
                    }
                    else {
                        ListOfBankData();
                    }
                },
                error: function () { }
            });
        }
    });
    $(document).on("click", ".deleteBank", function () {
        var BankId = $(this).attr('data-id');

        if (confirm("Are you sure you want to delete the Bank?")) {
            $.ajax({
                url: "/BankMaster/DeleteBank",
                type: "POST",
                contentType: "application/json;charset=utf-8",
                data: JSON.stringify({ BankId: BankId }),
                dataType: 'json',
                success: function (result) {
                    if (result.status == "success") {
                        toastr.success("Record deleted successfully");
                        ListOfBankData();
                    }
                    else if (result.status == "error") {
                        toastr.error(result.message);
                    }
                },
                error: function () { }
            });
        }
    });
});
function ClearFormBank() {
    $("#BankMasterModel").modal('hide');
    $('#BankMasterModelBody').empty();
    $('#txtBankname').val('');
    $('#txtDescription').val('');
    $('#errorMessageAddEvent').empty();
}
function ListOfBankData() {
    $.ajax({
        url: '/BankMaster/GetBankList',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        //data: JSON.stringify({ BankId: BankId }),
        dataType: 'html',
        success: function (data) {
            if (data) {
                $('#divBank').empty();
                $('#divBank').html(data);
                data_table_init();
                $('[data-IsDefaultElement="EditTable"]').bootstrapSwitch();
            }
        },
        error: function (jqXHR, textBank, errorThrown) {
        }
    });
}
function GetBlankBankMasterForm(BankId) {
    $.ajax({
        type: "POST",
        url: "/BankMaster/AddEditBankForm",
        async: false,
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ BankId: BankId }),
        dataType: 'html',
        success: function (data) {
            if (data) {
                $('#AddEditBankForm').html(data);
                window.scrollTo(0, 0);
            }
        },
        error: function (jqXHR, textBank, errorThrown) {
        }
    });
}