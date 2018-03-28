$(document).ready(function () {
    $('#btnSubmit').click(function () {
        ValidatePage();
    });

    $('#btnYearlySubmit').click(function () {
        ValidatePage();
    });
    $(document).on('click', '.fa-pencil', function () {        
        $("html, body").animate({ scrollTop: 0 }, "slow");

    })
});