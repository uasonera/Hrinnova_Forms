$(document).ready(function () {
    $(document).on("click", "#btnSearchPMOPIN", function () {
        BindPMOAssignmentGridListingData();
    });
    $(document).on("click", "#btnResetPMOPINData", function () {
        $('.card-view').show(); $('.grid-view').hide();
        ResetFilter();
    });

    $(document).on("click", ".ViewDetail", function () {
        var approvalrequest = $(this).data('approvalrequest');
        var ProjectInitioanID = $(this).data('projectinitiationid');
        window.location.href = "/PMOAssignment/RedirectionToViewReview?PINId=" + ProjectInitioanID + "&ApprovalRequestType=" + approvalrequest;
    });
    $(document).on("click", ".AssignPMO", function () {
        var approvalrequest = $(this).data('approvalrequest');
        var ProjectInitioanID = $(this).data('projectinitiationid');
        window.location.href = "/PMOAssignment/RedirectionToViewReview?PINId=" + ProjectInitioanID + "&ApprovalRequestType=" + approvalrequest;
    });

});

function BindPMOAssignmentGridListingData() {
    var ProjectInitNoteNo = $("#ProjectInitNoteNo").val();
    var ClientID = $('#drpClient').val();
    var ProjectType = $('#drpProjectType').val();
    var PINStatusID = $('#drpStatus').val();

    var postData = {
        ProjectInitNoteNo: ProjectInitNoteNo,

        ClientId: ClientID,

        ProjectType: ProjectType,

        Status: PINStatusID,

        IsInitialCall: false
    }

    var url = "/PMOAssignment/GetPMOPINAssignmentListing";
    ShowProgressForPIN();
    $.ajax({
        type: 'GET',
        data: postData,
        url: url,
        dataType: "html",
        success: function (data) {
            $('.grid-view').show(); $('.card-view').hide();
            $('#PMOPINGridListing').html('');
            $('#PMOPINGridListing').html(data);
            data_table_init();
            HideProgressForPIN();
        },
    });
    $(".common-table").DataTable().search("").draw();

}

function ResetFilter() {
    $("#ProjectInitNoteNo").val('');
    $('#drpClient').val('').trigger('chosen:updated');
    $('#drpProjectType').val('').trigger('chosen:updated');
    $('#drpStatus').val('').trigger('chosen:updated');
}
function HideProgressForPIN() {

    $('.loader-wrapper').hide();
}

function ShowProgressForPIN() {
    $(".loader-wrapper").show();

}

