$(document).ready(function () {
    ClearControl();
    GetNewJoineeDetails();

});


function GetNewJoineeDetails() {
    //ClearControl();
    $.ajax({
        type: "POST",
        url: "../Admin/NewJoineeReferal.aspx/GetJoineeDetail",
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (jsonResult) {
            var result = jQuery.parseJSON(jsonResult.d);

            $("#tbodyJoinee").empty();
            bindData(result);
            //paging();

        },
        error: function (jsonResult) {
        }
    });
}
function bindData(jsonresult) {
    var result = jsonresult;


    for (var index = 0; index < result.length; index++) {
        var confirmationdate = "";
        if (result[index].ConfirmationDate != null) {
            confirmationdate = result[index].ConfirmationDate.split('T');
        }

        var date1;
        var date2;
        var NewConfirmationDate;
        var NewTodayDate;
        var DateDiff;
        var TotalDays;
        var joindate = result[index].JoinDate.split('T');
        var JoineeJobOfferId = result[index].NewJoineeId;
        var NewJoineeEmpId = "tdJoineeEmpid_" + JoineeJobOfferId;
        var ReferralEmpId = "tdReferralEmpid_" + JoineeJobOfferId;
        var BtnpaidId = "btnPaid_" + JoineeJobOfferId;

        var d = new Date();

        var todayDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        if (result[index].ConfirmationDate != null) {

            date1 = confirmationdate[0].split('-'),
                date2 = todayDate.split('-'),
                NewConfirmationDate = new Date(date1[0], date1[1], date1[2]),
                NewTodayDate = new Date(date2[0], date2[1], date2[2]);
            DateDiff = (NewConfirmationDate - NewTodayDate);
            TotalDays = DateDiff / 1000 / 60 / 60 / 24;

        }
        else {
            TotalDays = null;
        }

        $("#tbodyJoinee").append($('<tr></tr>')
                .append($('<td></td>').attr("id", "tdJoineeId_" + JoineeJobOfferId).html(result[index].NewJoineeId).hide())
                .append($('<td></td>').attr("id", NewJoineeEmpId).html(result[index].NewJoineeEmpId).hide())
                .append($('<td></td>').attr("id", ReferralEmpId).html(result[index].ReferralEmpId).hide())
                .append($('<td></td>').attr("id", "tdJoineeName_" + JoineeJobOfferId).html(result[index].NewJoineeName).css('text-align', 'center'))
                .append($('<td></td>').attr("id", "tdReferalEmpName_" + JoineeJobOfferId).html(result[index].ReferalEmployeeName).css('text-align', 'center'))
                .append($('<td></td>').attr("id", "tdDept_" + JoineeJobOfferId).html(result[index].Department).css('text-align', 'center').css('width', '25%'))
                .append($('<td></td>').attr("id", "tdJoinDate_" + JoineeJobOfferId).html(joindate[0]).css('text-align', 'center'))
                .append($('<td></td>').attr("id", "tdConfirmationDate_" + JoineeJobOfferId).html(confirmationdate[0]).css('text-align', 'center'))
                .append($('<td></td>').attr("id", "tdBonusDate_" + JoineeJobOfferId).html(confirmationdate[0]).css('text-align', 'center'))
                .append($('<td></td>').attr("id", "tdDueDays_" + JoineeJobOfferId).html(TotalDays).css('text-align', 'center'))
                .append($('<td></td>').attr("id", "tdAmount_" + JoineeJobOfferId).append($("<input />").attr("id", "txtAmount" + JoineeJobOfferId).attr("type", 'text')))
                .append($('<td></td>').attr("id", "tdbtnpaid_" + JoineeJobOfferId).append($('<span></span>').addClass(" blue-button").append($('<input/>').attr("id", BtnpaidId).attr("type", "button").attr("value", "Paid").addClass("btnpaid"))))
                );

        $("#tblJoineeDetails > tbody > tr:odd").addClass("altr");

    }
    paging();

}
$(document).on('click', ".btnpaid", function () {
    var btnId = $(this).attr("id");
    var splitBtnId = btnId.split('_');
    var NewJoineeJobOfferId = splitBtnId[1];

    var Amount = $("#txtAmount" + NewJoineeJobOfferId).val().trim();
    var JoineeEmpId = $("#tdJoineeEmpid_" + NewJoineeJobOfferId).html();
    //alert("JoineeEmpId "+JoineeEmpId);
    var ReferralEmpId = $("#tdReferralEmpid_" + NewJoineeJobOfferId).html();
    //alert("referral "+ ReferralEmpId);
    var regex = /^\d+(\.\d{1,2})?$/;

    if (Amount == "") {
        alert("Please Insert Amount");
    }
    else {
        if (regex.test(Amount)) {
            var data = JSON.stringify({ NewJoineeJobOfferId: NewJoineeJobOfferId, NewJoineeEmpId: JoineeEmpId, ReferralEmpId: ReferralEmpId, PaidAmount: Amount });

            $.ajax({
                type: "POST",
                url: "../Admin/NewJoineeReferal.aspx/InsertReferralBonusDetails",
                data: data,
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                success: function (jsonResult) {
                    var result = jQuery.parseJSON(jsonResult.d);
                    if (result == "1") {
                        $("#lblMessage").text("Record Inserted Successfully").addClass("green-msg");
                    }
                    else {
                        $("#lblMessage").text("Error Occuring While Inserting Record").addClass("yellow-error");
                    }

                    GetNewJoineeDetails();


                },
                error: function (jsonResult) {
                }
            });
        }
        else {
            $("#lblMessage").text("Please Insert valid Amount that have 2 decimal point value").addClass("yellow-error");
        }
    }

});

$(document).on("click", ".sortField", function () {
    var sortExpression = $(this).attr('title');
    $.ajax({
        type: "POST",
        url: "../Admin/NewJoineeReferal.aspx/sortRecords",
        data: "{'sortExpression' : '" + sortExpression + "'}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (jsonResult) {
            var result = jQuery.parseJSON(jsonResult.d);

            $("#tbodyJoinee").empty();
            bindData(result);
        },
        error: function (jsonResult) {
        }
    });


});

function ClearControl() {
    $("#lblMessage").removeClass('alert alert-success');
    $("#lblMessage").removeClass('alert alert-warning');
    $("#lblMessage").text("");
}




//$(document).on('each','.paginated',function(){

function paging() {
    $("#tblJoineeDetails").each(function () {

        var currentPage = 0;
        var numPerPage = 5;
        var $table = $(this);
        $table.bind('repaginate', function () {
            $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
            //$table.find("tbody  tr:odd").addClass("altr");


        });
        $table.trigger('repaginate');
        var numRows = $table.find('tbody tr').length;
        var numPages = Math.ceil(numRows / numPerPage);
        var $pager = $('<div class="pager"></div>');
        //Bind PageNumber
        $(".page-number").remove();
        for (var page = 0; page < numPages; page++) {
            if (numPages > 1) {
                $('<span class="page-number"></span>').append($("<a></a>").text(page + 1)).bind('click', {
                    newPage: page
                }, function (event) {
                    currentPage = event.data['newPage'];
                    $table.trigger('repaginate');


                    $(this).addClass('active').siblings().removeClass('active');
                }).appendTo($pager).addClass('clickable');
            }

        }
        $pager.insertAfter($table).find('span.page-number:first').addClass('active');

    });
};