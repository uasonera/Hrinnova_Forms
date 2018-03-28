EnumConfigAuthority = { PMO: '1', Legal: '2', Supervisor: '3', PINCreator: '5' };
$(document).ready(function () {
    var ActiveTabId = $("ul.mytab li.active a").attr('id');


    $(document).on("click", "li a.Tab-CRData", function () {
        $('.card-view').show(); $('.grid-view').hide();
        ResetFilter();
        $('#MyCRRGridListing').html('');
        $('#PMOGridListing').html('');

        $('#SupervisoryGridListing').html('');

        var ActiveTabId = $("ul.mytab li.active a").attr('id');

    });
    $(document).on("click", "#btnSearchCR", function () {
        ShowProgress();
        BindGridListingData();
    });
    $(document).on("click", "#btnResetCRData", function () {
        $('.card-view').show(); $('.grid-view').hide();
        ResetFilter();
        $('#MyCRRGridListing').html('');
        $('#PMOGridListing').html('');

        $('#SupervisoryGridListing').html('');
        var ActiveTabId = $("ul.mytab li.active a").attr('id');
    });

    $(document).on("click", ".MyCRViewDetail", function () { });
    $(document).on("click", ".MyCRUpdate", function () { });

    $(document).on("click", ".ViewPMOCR", function () { });
    $(document).on("click", ".ReViewPMOCR", function () { });

    $(document).on("click", ".ViewSupervisoryCR", function () { });
    $(document).on("click", ".ReViewSupervisoryCR", function () { });
});

function BindGridListingData() {
    var ProjectInitNoteNo = $("#ProjectInitNoteNo").val();
    var ClientID = $('#drpClient').val();
    var Project = $('#Project').val();
    var CRStatus = $('#drpCRStatus').val();
    var AuthorityTypeID = $("ul.mytab li.active a").attr('id');
   
    var postData = {
        ProjectInitNoteNo: ProjectInitNoteNo,

        ClientId: ClientID,

        Project: Project,

        CRStatus: CRStatus,

        AuthorityTypeID: AuthorityTypeID,
    }
   
    var url = "/CRListing/GetCRListing";
    $.ajax({
        type: 'GET',
        data: postData,
        url: url,
        dataType: "html",
        success: function (data) {
            $('.grid-view').show(); $('.card-view').hide();
            $('#MyCRRGridListing').html('');
            $('#PMOGridListing').html('');

            $('#SupervisoryGridListing').html('');
            if (parseInt(AuthorityTypeID) == parseInt(EnumConfigAuthority.PINCreator)) {
                $('#MyCRRGridListing').html(data);
                data_table_init();

            }
            if (parseInt(AuthorityTypeID) == parseInt(EnumConfigAuthority.PMO)) {
                $('#PMOGridListing').html(data);
                data_table_init();
            }

            if (parseInt(AuthorityTypeID) == parseInt(EnumConfigAuthority.Supervisor)) {
                $('#SupervisoryGridListing').html(data);
                data_table_init();
            }

        },
    });
    $(".common-table").DataTable().search("").draw();
    setTimeout(function () { HideProgress() }, 20)
}

function ResetFilter() {
    $("#CRno").val('');
    $('#drpClient').val('');
    $('#Project').val('').trigger('chosen:updated');
    $('#drpCRStatus').val('').trigger('chosen:updated');
    // $("ul.mytab li.active a").attr('id');
}
function HideProgress() {
    $('.loader-wrapper').css('display', 'none');
}

function ShowProgress() {
    $('.loader-wrapper').css('display', 'block');

    //if ($('.loader-wrapper').css('display') == "none") {
    //    $(".loader-wrapper").show();
    //}
}

