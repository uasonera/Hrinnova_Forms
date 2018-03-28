$(document).ready(function () {
    $('#addComment').click(function (e) {
        e.preventDefault();

        var comment = $('#txtComment').val();
        var projectInitiationId = $('#txtComment').attr('data-projectInitiationId');

        if (comment != '' && $.isNumeric(projectInitiationId)) {
            $.ajax({
                url: '/ProjectInitiation/InsertComent',
                type: 'post',
                async: false,
                data: JSON.stringify({ ProjectInitiationID: projectInitiationId, Comments: comment }),
                contentType: 'application/json; charset=utf-8',
                dataType: 'html',
                success: function (data) {
                    if (data != '') {
                        $('#commentDetails').append(data);
                        $('#txtComment').val('');
                    }
                }
            });
        }
    });
    $(document).on('click', '.sectionApproval', function () {
        $(this).attr('data-IsApproved', "true");
        $(this).attr('disabled', true);
        var unApprovedCount = $("*[data-IsApproved='false']").length;
        if (unApprovedCount == 0) {
            $('#approvePIN').attr('disabled', false);
        }
    });
    $(document).on('click', '#btnRequestForMoreInfo', function () {
        $('#approvarViewTab').hide();
        $('#requestForMoreInfoTab').show();
        $('#submitInfoComment').show();
        $('#submitRejectionComment').hide();
        $('#approvNote').show();
        $('#rejectNote').hide();
    });
    $(document).on('click', '#RejectPIN', function () {
        $('#approvarViewTab').hide();
        $('#requestForMoreInfoTab').show();
        $('#submitInfoComment').hide();
        $('#submitRejectionComment').show();
        $('#approvNote').hide();
        $('#rejectNote').show();
    });
    $(document).on('click', '#btnCancelRequestForMoreInfo', function () {
        $('#approvarViewTab').show();
        $('#requestForMoreInfoTab').hide();
        $('#txtInfoComment').val('');
    });
    $(document).on('click', '.approveRejectPIN', function () {
        $(this).attr('disabled', true)
        var unApprovedCount = $("*[data-IsApproved='false']").length;
        var isApproved = $(this).attr('data-ApprovalStatus');
        var me = $(this);
        if (unApprovedCount == 0 || isApproved == 'false') {
            var projectInitiationId = $(this).attr('data-projectInitiationId');
            var isApproved = $(this).attr('data-ApprovalStatus');
            var level = $(this).attr('data-approvalLevel');

            var comment = $('#txtInfoComment').val();

            if (isApproved == 'false' && comment == '') {
                toastr.error("Please enter comment with respect to the improvements needed");
                $(this).attr('disabled', false)
            }
            else {
                $.ajax({
                    url: '/projectinitiationapproval/ApproveRejectPIN',
                    type: 'post',
                    data: JSON.stringify({ ProjectInitiationID: projectInitiationId, Level: level, IsApproved: isApproved, Comments: comment }),
                    contentType: "application/json; charset=utf-8",
                    async: false,
                    success: function (data) {
                        if (data.status == 'success') {
                            window.location.href = '/PINDefinition/index';
                        }
                        else {
                            toastr.error(data.message);
                        }
                    },
                    error: function () {
                        $(this).attr('disabled', false)
                    }
                });
            }
        }
        else {
            $(this).attr('disabled', false)
        }
    });
    $(document).on('click', '#submitInfoComment', function () {
        $(this).attr('disabled', true)
        var projectInitiationId = $(this).attr('data-projectInitiationId');
        var isApproved = $(this).attr('data-ApprovalStatus');
        var level = $(this).attr('data-approvalLevel');

        var comment = $('#txtInfoComment').val();

        if (comment == '') {
            toastr.error("Please enter comment with respect to the improvements needed");
            $(this).attr('disabled', false)
        }
        else {
            $.ajax({
                url: '/projectinitiationapproval/RequestForMoreInfo',
                type: 'post',
                data: JSON.stringify({ ProjectInitiationID: projectInitiationId, Level: level, IsApproved: isApproved, Comments: comment }),
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.status == 'success') {
                        window.location.href = '/PINDefinition/index';
                    }
                    else {
                        toastr.error(data.message);
                    }
                },
                error: function () {
                    $(this).attr('disabled', false)
                }
            });
        }
    })

    $(document).on("click", "#AssignPMO", function () {
        var ProjectInitiationId = $(this).data('projectinitiationid');
        $("#AssignPMOModel").modal('show');
        $.ajax({
            url: '/ProjectInitiationApproval/AddEditBUandPM',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            async: false,
            data: JSON.stringify({ ProjectInitionId: ProjectInitiationId }),
            dataType: 'html',
            success: function (data) {
                if (data) {
                    $('#ModelAssignBUandPMBody').empty();
                    $('#ModelAssignBUandPMBody').html(data);
                    chosen_init();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });

    });
    $(document).on('click', '#btnAssignPMO', function () {
        if (ValidateBUPM()) {
            var BUId = $("#drpBU").val();
            var ProjectManager = $("#drpProjectManager").val();
            var ProjectInitiationId = $("#ProjectInitiationId").val();
            $.ajax({
                url: '/projectinitiationapproval/SavePMOandBUPIN',
                type: 'post',
                data: JSON.stringify({ BUID: BUId, ProjManagerID: ProjectManager, ProjectInitiationId: ProjectInitiationId }),
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    if (data.status == 'success') {
                        window.location.href = '/PMOAssignment/Index';
                    }
                    else {
                        toastr.error(data.message);
                    }
                },
                error: function () {
                    $(this).attr('disabled', false)
                }
            });
        }

    });
});
function LoadTotalPercentage() {
    var totalPercent = 0;
    $('.clsPaymentPercent').each(function () {
        var percent = $(this).val();
        if ($.isNumeric(percent)) {
            totalPercent = parseFloat(totalPercent) + parseFloat(percent);
        }
    });
    $('#totalMilestonPercent').html(totalPercent)
}
function LoadTotalAmount() {
    var totalAmount = 0;
    $('.clsPaymentAmount').each(function () {
        var amount = $(this).val();
        if ($.isNumeric(amount)) {
            totalAmount = parseFloat(totalAmount) + parseFloat(amount);
        }
    });
    $('#totalMilestonAmount').html(totalAmount)
}
function ShowProgress() {

    if ($('.loader-wrapper').css('display') == "none") {
        $(".loader-wrapper").show();
    }
}
function HideProgress() {
    $('.loader-wrapper').css('display', 'none');
}
function LoadTotalNoOfResources() {
    var totalCount = 0;
    $('.NoOfResources').each(function () {
        var count = $(this).val();
        if ($.isNumeric(count)) {
            totalCount = parseFloat(totalCount) + parseFloat(count);
        }
    });
    $('#totalResources').html(totalCount)
    $('#Cost_Hours').val(totalCount)
}
function LoadTotalResourceAmount() {
    var totalCount = 0;
    $('.resourceAmount').each(function () {

        var noOfResources = $(this).parent('td').siblings().find('.NoOfResources').val();

        if ($.isNumeric(noOfResources)) {
            var count = $(this).val();
            if ($.isNumeric(count)) {
                totalCount = parseFloat(totalCount) + (parseFloat(count) * parseFloat(noOfResources));
            }
        }
    });
    $('#totalCost_Resource').html(totalCount)
    $('#Cost_Resources').val(totalCount)
}
function ValidateBUPM() {
    var status = true;
    $(".form-group").removeClass("has-error  has-feedback");
    var BU = $('#drpBU').val();
    var ProjectManager = $('#drpProjectManager').val();
    var strErrorMessage = '';
    $('#Validation').html('');
    $('#Validation').hide();
    if (BU == "") {
        strErrorMessage += "<li>Please select BU</li>";
        $("#drpBU").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (ProjectManager == '') {
        strErrorMessage += "<li>Please select PM </li>";
        $("#drpProjectManager").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (status == false && strErrorMessage != null) {
        $('#Validation').css('display', 'block');
        $('#Validation').html("<ul>" + strErrorMessage + "</ul>");
        $('ul li:empty').remove();
    }
    return status;
}