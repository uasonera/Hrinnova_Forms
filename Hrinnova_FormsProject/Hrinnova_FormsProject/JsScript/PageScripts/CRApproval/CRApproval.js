$(document).ready(function () {
    //#General_Aspects cal for total amount
    var obj = {};

    $('#submit').attr('disabled', true);
    var allbuttonclicked = false;
    var Buttonids = [];

    $(".basicapproval").click(function () {
        Buttonids.push($(this).attr("id"));
        //$(this).attr("id").attr('disabled', allbuttonclicked);
        var currentbtnid = $(this).attr("id");
        $('#' + currentbtnid).attr('disabled', true);
        if (jQuery.inArray("1", Buttonids) !== -1 && jQuery.inArray("2", Buttonids) !== -1) {
            $('#submit').attr('disabled', allbuttonclicked);
        }
    });

    $('#reqforinfo').click(function (e) {
        $("#comment").show();
        $("#approvaldata").hide();
    });


    $('#cancelreqforinfo').click(function (e) {
        $("#comment").hide();
        $("#approvaldata").show();
    });


    $('#submit').click(function (e) {
        crapproval(true);
        $('#submit').attr('disabled', true);
    });

    $('#crreject').click(function (e) {
        crapproval(false);
    });
    $('#Addreqforinfo').click(function (e) {
        crreqformoreinfo();
    });


});
function crapproval(isaprov) {
    var ID = $("#crid").val();
    var Leval = $('#Leval').val();
    var IsApproved = isaprov;
    var Comments = $('#txtreqformoreinfocomments').val();
    console.log("ID: " + ID + " Leval: " + Leval + " IsApproved: " + IsApproved + " Comments: " + Comments);
    var postData = {
        ID: ID,
        Level: Leval,
        IsApproved: IsApproved,
        Comments: Comments
    }

    $.ajax({
        url: '/CRDetailsView/SendApproval',
        type: "POST",
        data: JSON.stringify({ CRApprovalParameter: postData }),
        //data: postData,
        contentType: "application/json; charset=utf-8",
        processData: false,
        success: function (data) {
            if (data != '') {
                window.location.href = '/CrListing/Index';
            }
        }
    });
}

function crreqformoreinfo() {
    var ID = $("#crid").val();
    var Leval = $('#Leval').val();
    var Comments = $('#txtreqformoreinfocomments').val();
    var CRNumber = $('#CRNumber').val();
    console.log("ID: " + ID + " Leval: " + Leval + " Comments: " + Comments + " CRNumber:" + CRNumber);
    var postData = {
        ID: ID,
        Level: Leval,
        CRNumber: CRNumber,
        Comments: Comments
    }
    if (Validatereqformoreinfo()) {
        $.ajax({
            url: '/CRDetailsView/SendCRReqForMoreInfo',
            type: "POST",
            data: JSON.stringify({ CRReqForMoreInfoParameter: postData }),
            //data: postData,
            contentType: "application/json; charset=utf-8",
            processData: false,
            success: function (data) {
                if (data != '') {
                    window.location.href = '/CrListing/Index';
                }
            }
        });
    }
}


function Validatereqformoreinfo() {
    var status = true;
    $(".form-group").removeClass("has-error  has-feedback");
    var Comments = $('#txtreqformoreinfocomments').val();

    var strErrorMessage = '';
    $('#Validation').html('');
    $('#Validation').hide();
    if (Comments == "") {
        strErrorMessage += "<li>Please Enter Comment</li>";
        $("#txtreqformoreinfocomments").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }

    if (status == false && strErrorMessage != null) {
        $('#reqformoreinfoValidation').css('display', 'block');
        $('#reqformoreinfoValidation').html("<ul>" + strErrorMessage + "</ul>");
        $('ul li:empty').remove();
    }
    return status;
}
