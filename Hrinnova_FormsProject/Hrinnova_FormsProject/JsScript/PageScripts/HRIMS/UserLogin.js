$(document).ready(function () {

    $(document).on('click', '#btnCancel', function (e) {
        e.preventDefault();
        $('#errorMessage').html('');
        $('#username').val('');
        $('#password').val('');
    });

    $(document).on('click', '#ForgotPassword', function (e) {

        e.preventDefault();

        $.get("/login/_forgotPasswordForm/", function (data) {
            $("#resultForm").html('').html(data);
        });

    });
    $(document).on('click', '#ChangePassword', function (e) {
        e.preventDefault();

        $.get("/login/_changePasswordForm/", function (data) {
            $("#resultForm").html('').html(data);
        });

    });
    $(document).on('click', '#backToLogin', function (e) {

        e.preventDefault();

        $.get("/login/_UserLoginForm/", function (data) {
            $("#resultForm").html('').html(data);
        });

    });

    $('#currentYear').html(new Date().getFullYear().toString());

    $(document).on('change', 'input[type=radio][name=AuthenticationType]', function () {
        if (this.value == 'WINDOWS') {
            $('#username').removeAttr('required');
            $('#password').removeAttr('required');
            $('#divDoman').hide();
            $('#passwordOpts').hide();
        }
        else {
            $('#passwordOpts').show();

            if (this.value == 'AD') {
                $('#span_forgetPassword').hide();
                $('#span_changePassword').show();
                $('#divDoman').show();
            }
            else {
                $('#span_forgetPassword').show();
                $('#span_changePassword').hide();
                $('#divDoman').hide();
            }

            $('#username').prop('required', true);
            $('#password').prop('required', true);
        }
    });
});