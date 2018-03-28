function page_load() {

};

$("#btnSearch").click(function (e) {
   
    e.preventDefault();
    var MonthNum = $("select[id*=ddlMonth]>option:selected").index();

    //var MonthNum = Month + 1;    
    var year = $("select[id*=ddlYear]>option:selected").text();
    var Employee = $("input[id*=txtEmployee]").val();
    var ApplicationDate = $("input[id*=UcApplicationDate]").val();

    var OpeningBal = $("input[id*=txtOpeningBal]").val();
    var valFlag = 1;


    var regex = /^\d+(\.\d{1,2})?$/;
    var validation = true;
    if (OpeningBal != "") {
        validation = regex.test(OpeningBal)
    }
    else {
        OpeningBal = 0;
    }
    var data = JSON.stringify({ Month: MonthNum, year: year, EmpName: Employee, ApplicationDate: ApplicationDate, OpeningBal: OpeningBal });
    if (validation == true) {
        if (ApplicationDate != "") {
            $.ajax({
                type: "POST",
                url: "../Admin/SearchAttendanceReportPLBalance.aspx/SearchRecords",
                data: data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (jsonData) {
                    bindData(jsonData);
                },
                error: function (jsonData) {
                }
            });
        }
        else {
            alert("Please Select ApplicationDate");
        }
    }
    else {

        //$("input[id*=lblMessage]").val("Please Insert valid Amount that have 2 decimal point value").addClass("yellow-error");
        alert("Please Insert valid Amount that have 2 decimal point value");
    }


});

function bindData(jsonData) {
    $("#tbodySearchData").empty();
    var objAttendancePLBal = jQuery.parseJSON(jsonData.d);

    for (var Index = 0; Index < objAttendancePLBal.length; Index++) {
        var Date = (objAttendancePLBal[Index].ApplicationDate);
        var SplitDate = Date.split('T');
        var ApplicationDate = SplitDate[0];
        var AttendanceReportBalId = objAttendancePLBal[Index].AttendanceReportPLBalanceId;
        var RedirectUrl_Attendance = "../Admin/attendancereportconfiguration.aspx?AttendanceReportParameterId=" + objAttendancePLBal[Index].AttendanceReportParameterId; 
        var RedirectUrl_PL = "../Admin/EmployeePLBalanceDetails.aspx?AttendanceReportParameterId=" + objAttendancePLBal[Index].AttendanceReportParameterId + "&EmpId=" + objAttendancePLBal[Index].EmpID;

        $("#tbodySearchData").append($('<tr></tr>')                
                .append($('<td></td>').attr("id", "tdEmpName" + AttendanceReportBalId).html(objAttendancePLBal[Index].EmployeeName).css('text-align', 'center'))
                .append($('<td></td>').attr("id", "tdMonth" + AttendanceReportBalId).html(objAttendancePLBal[Index].Month).css('text-align', 'center').css('width', '15%'))
                .append($('<td></td>').attr("id", "tdYear" + AttendanceReportBalId).html(objAttendancePLBal[Index].Year).css('text-align', 'center').css('width', '25%'))
                .append($('<td></td>').attr("id", "tdOpeningBal" + AttendanceReportBalId).html(objAttendancePLBal[Index].OpeningPLBalance).css('text-align', 'center').css('width', '25%'))
                .append($('<td></td>').attr("id", "tdAppDate" + AttendanceReportBalId).html(ApplicationDate).css('text-align', 'center'))               
                .append($("<td></td>").append($("<a></a>").attr("href", RedirectUrl_Attendance).text("View").attr("id", "View_" + objAttendancePLBal[Index].AttendanceReportParameterId).addClass("ViewProjStatus").css('text-align', 'center')))
                .append($("<td></td>").append($("<a></a>").attr("href", RedirectUrl_PL).text("View").attr("id", "View_" + objAttendancePLBal[Index].AttendanceReportParameterId).addClass("ViewProjStatus").css('text-align', 'center')))
                );

        $("#tblSearchData > tbody > tr:odd").addClass("altr");
    }
    paging();
}
function paging() {
    $("#tblSearchData").each(function () {

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

$(document).on('click', '.sortField', function () {

    var title = $(this).attr('title');

    var Month = $("select[id*=ddlMonth]>option:selected").index();

    var year = $("select[id*=ddlYear]>option:selected").text();

    var Employee = $("input[id*=txtEmployee]").val();

    var ApplicationDate = $("input[id*=UcApplicationDate]").val();

    var OpeningBal = $("input[id*=txtOpeningBal]").val();
    //
    var data = JSON.stringify({ SortExpression: title, Month: Month, year: year, EmpName: Employee, ApplicationDate: ApplicationDate, OpeningBal: OpeningBal });
    $.ajax({
        type: "POST",
        url: "../Admin/SearchAttendanceReportPLBalance.aspx/SortData",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (jsonResult) {
            bindData(jsonResult);
        },
        error: function (jsonData) {
        }
    });

});

$(document).on('click', '#btnReset', function () {
    $("input[id*=txtEmployee]").val("");
    $("input[id*=txtOpeningBal]").val("");
    $("select[id*=ddlYear]").val(0);
    $("input[id*=UcApplicationDate]").val("");
    $("select[id*=ddlMonth]").val(0);

})
