EnumConfigAuthority = { PMO: '1', Legal: '2', Supervisor: '3', PINCreator: '5' };
$(document).ready(function () {
    var ActiveTabId = $("ul.mytab li.active a").attr('id');
    if (parseInt(ActiveTabId) == parseInt(EnumConfigAuthority.PINCreator)) {
        $(".show-PINCreatedBy").hide();
    }
    else {
        $(".show-PINCreatedBy").show();
    }
    $('.PINdatePicker').datepicker({
        // format: genericDateFormate
    });
    $(document).on('click', '#btnStartDateFrom', function (event) {
        event.preventDefault();
        $('#StartDateFrom').focus();
    });
    $(document).on('click', '#btnStartDateTo', function (event) {
        event.preventDefault();
        $('#StartDateTo').focus();
    });
    $(document).on("click", "li a.Tab-PINData", function () {
        $('.card-view').show(); $('.grid-view').hide();
        ResetFilter();
        $('#MyPINGridListing').html('');
        $('#PMOGridListing').html('');
        $('#LegalGridListing').html('');
        $('#SupervisoryGridListing').html('');

        var ActiveTabId = $("ul.mytab li.active a").attr('id');
        if (parseInt(ActiveTabId) == parseInt(EnumConfigAuthority.PINCreator)) {
            $(".show-PINCreatedBy").hide();
        }
        else {
            $(".show-PINCreatedBy").show();
        }
    });
    $(document).on("click", "#btnSearchPIN", function () {
        BindGridListingData();
    });
    $(document).on("click", "#btnResetPINData", function () {
        $('.card-view').show(); $('.grid-view').hide();
        ResetFilter();
        $('#MyPINGridListing').html('');
        $('#PMOGridListing').html('');
        $('#LegalGridListing').html('');
        $('#SupervisoryGridListing').html('');
        var ActiveTabId = $("ul.mytab li.active a").attr('id');
        if (parseInt(ActiveTabId) == parseInt(EnumConfigAuthority.PINCreator)) {
            $(".show-PINCreatedBy").hide();
        }
        else {
            $(".show-PINCreatedBy").show();
        }
    });
    $(document).on("click", "#btnCreatePIN", function () {
        var OppId = $(this).data('opportunityid');
        var ProjectInitioanID = $(this).data('projectinitiationid');
        window.location.href = "/ProjectInitiation/Index?oppId=" + OppId + "&PINId=" + ProjectInitioanID;
    });
    $(document).on("click", ".RaisedCR", function () {
        var ProjectInitioanID = $(this).data('projectinitiationid');
        window.location.href = "/CRDetails/Index?PINId=" + ProjectInitioanID;
    });

    $(document).on("click", ".MyPINViewDetail", function () {
        var approvalrequest = $(this).data('approvalrequest');
        var ProjectInitioanID = $(this).data('projectinitiationid');
        window.location.href = "/PINDefinition/RedirectionToViewReview?PINId=" + ProjectInitioanID + "&ApprovalRequestType=" + approvalrequest;
    });
    $(document).on("click", ".MyPINUpdate", function () {
        var OppId = $(this).data('opportunityid');
        var ProjectInitioanID = $(this).data('projectinitiationid');
        window.location.href = "/ProjectInitiation/Index?oppId=" + OppId + "&PINId=" + ProjectInitioanID;
    });

    $(document).on("click", ".ViewLegalPIN", function () {
        var approvalrequest = $(this).data('approvalrequest');
        var ProjectInitioanID = $(this).data('projectinitiationid');
        window.location.href = "/PINDefinition/RedirectionToViewReview?PINId=" + ProjectInitioanID + "&ApprovalRequestType=" + approvalrequest;
    });
    $(document).on("click", ".ReviewLegalPIN", function () {
        var approvalrequest = $(this).data('approvalrequest');
        var ProjectInitioanID = $(this).data('projectinitiationid');

        window.location.href = "/PINDefinition/RedirectionToViewReview?PINId=" + ProjectInitioanID + "&ApprovalRequestType=" + approvalrequest;
    });

    $(document).on("click", ".ViewPMOPIN", function () {
        var approvalrequest = $(this).data('approvalrequest');
        var ProjectInitioanID = $(this).data('projectinitiationid');
        window.location.href = "/PINDefinition/RedirectionToViewReview?PINId=" + ProjectInitioanID + "&ApprovalRequestType=" + approvalrequest;
    });
    $(document).on("click", ".ReviewPMOPIN", function () {
        var approvalrequest = $(this).data('approvalrequest');
        var ProjectInitioanID = $(this).data('projectinitiationid');
        window.location.href = "/PINDefinition/RedirectionToViewReview?PINId=" + ProjectInitioanID + "&ApprovalRequestType=" + approvalrequest;
    });

    $(document).on("click", ".ViewSupervisoryPIN", function () {
        var approvalrequest = $(this).data('approvalrequest');
        var ProjectInitioanID = $(this).data('projectinitiationid');
        window.location.href = "/PINDefinition/RedirectionToViewReview?PINId=" + ProjectInitioanID + "&ApprovalRequestType=" + approvalrequest;
    });
    $(document).on("click", ".ReviewSupervisoryPIN", function () {
        var approvalrequest = $(this).data('approvalrequest');
        var ProjectInitioanID = $(this).data('projectinitiationid');
        window.location.href = "/PINDefinition/RedirectionToViewReview?PINId=" + ProjectInitioanID + "&ApprovalRequestType=" + approvalrequest;
    });
});

function BindGridListingData() {
    var ProjectInitNoteNo = $("#ProjectInitNoteNo").val();
    var ClientID = $('#drpClient').val();
    var ProjectType = $('#drpProjectType').val();
    var PINStatusID = $('#drpPINStatus').val();
    var StartDateFrom = $('#StartDateFrom').val();
    var StartDateTo = $('#StartDateTo').val();
    var CreatedBy = $('#drpCreatedBy').val();
    var AuthorityTypeID = $("ul.mytab li.active a").attr('id');

    var postData = {
        ProjectInitNoteNo: ProjectInitNoteNo,

        ClientId: ClientID,

        ProjectType: ProjectType,

        PINStatus: PINStatusID,

        CreatedBy: CreatedBy,

        AuthorityTypeID: AuthorityTypeID,

        StartDateFrom: StartDateFrom,

        StartDateTo: StartDateTo,

        IsInitialCall: false
    }
    
    var url = "/PINDefinition/GetPINListing";
    ShowProgressForPIN();
    $.ajax({
        type: 'GET',
        data: postData,
        url: url,
        dataType: "html",
        success: function (data) {
            $('.grid-view').show(); $('.card-view').hide();
            $('#MyPINGridListing').html('');
            $('#PMOGridListing').html('');
            $('#LegalGridListing').html('');
            $('#SupervisoryGridListing').html('');
            if (parseInt(AuthorityTypeID) == parseInt(EnumConfigAuthority.PINCreator)) {
                $('#MyPINGridListing').html(data);
                data_table_init();
            }
            if (parseInt(AuthorityTypeID) == parseInt(EnumConfigAuthority.PMO)) {
                $('#PMOGridListing').html(data);
                data_table_init();
            }
            if (parseInt(AuthorityTypeID) == parseInt(EnumConfigAuthority.Legal)) {
                $('#LegalGridListing').html(data);
                data_table_init();
            }
            if (parseInt(AuthorityTypeID) == parseInt(EnumConfigAuthority.Supervisor)) {
                $('#SupervisoryGridListing').html(data);
                data_table_init();
            }
            HideProgressForPIN();
        },
    });
    $(".common-table").DataTable().search("").draw();
    
}

function ResetFilter() {
    $("#ProjectInitNoteNo").val('');
    $('#drpClient').val('').trigger('chosen:updated');
    $('#drpProjectType').val('').trigger('chosen:updated');
    $('#drpPINStatus').val('').trigger('chosen:updated');
    $('#StartDateFrom').val('');
    $('#StartDateTo').val('');
    $('#drpCreatedBy').val('').trigger('chosen:updated');
}
function HideProgressForPIN() {
   
    $('.loader-wrapper').hide();
}

function ShowProgressForPIN() {
    $(".loader-wrapper").show();
    
}

