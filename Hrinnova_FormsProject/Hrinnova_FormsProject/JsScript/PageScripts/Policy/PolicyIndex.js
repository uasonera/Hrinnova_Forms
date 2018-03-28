$(document).ready(function () {
    $('#myModal').on('hidden.bs.modal', function () {

        $.ajax({
            url: '/policy/AddEditViewPolicy',
            type: 'GET',
            data: { policyId: 0, mode: 'Add' },
            success: function (result) {
                $('#myModalContent').empty();
                $('#myModalContent').html(result);
                $('#myModalLabel').empty();
                $('#myModalLabel').html("Add New Policy");
                $('#myModalProgressbar').attr('aria-valuenow', '25');
                $('#myModalProgressbar').css('width', '25%');
                $('.steps').removeClass('visited').removeClass('active');
                $('.step1').addClass('active');
                setupCheckboxes();
                chosen_init();
                staped_form_init();
            },
            async: false
        });
    });
    $(document).on('keypress keyup blur', '.NumOnly', function (evt) {

        var charCode = (evt.which) ? evt.which : event.keyCode

        if (
            //(charCode != 45 || $(element).val().indexOf('-') != -1) &&       “-” CHECK MINUS, AND ONLY ONE.
            //(charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
            (charCode < 48 || charCode > 57) && charCode != 8)
            return false;

        return true;
    });
});