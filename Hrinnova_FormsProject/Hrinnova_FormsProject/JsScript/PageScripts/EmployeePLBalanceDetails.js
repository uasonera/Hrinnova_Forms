$(document).ready(function () {
    $("#btnSearch").click(function (e) {
        e.preventDefault();
        var EmployeeName = $("#txtEmpName").val();
        var ExistiningEMP = $('#chkExisting').is(':checked');
        var NewJoined = $('#chkNewJoined').is(':checked');
        var Confirmed = $('#chkConfirmed').is(':checked');
        var Relieving = $('#chkRelieving').is(':checked');
        var ApplicationDate = $("input[id*=UcApplicationDate]").val();
        if (ApplicationDate == "") {
            $("#ulVs").append("<li>Please Select Application Date</li>");
            return false;
        }
        if (!moment(ApplicationDate, 'MM/DD/yyyy').isValid()) {
            $("#ulVs").append("<li>Please Select Valid Application Date</li>");
            return false;
        }
        else {
            $("#ulVs").empty();
            $.ajax({
                type: 'POST',
                url: '../Admin/EmployeePLBalanceDetails.aspx/SearchEmployees',
                contentType: 'application/json;charset=utf-8',
                data: "{ 'ApplicationDate' : '" + ApplicationDate + "','EmployeeName' : '" + EmployeeName + "', 'ExistiningEMP' : '" + ExistiningEMP + "', 'NewJoined' : '" + NewJoined + "','Confirmed' : '" + Confirmed + "','Relieving' : '" + Relieving + "'}",
                dataType: 'json',
                success: function (JsonData) {
                    var SearchResult = jQuery.parseJSON(JsonData.d);
                    $('[id$=lblMessage]').text("");
                    $('[id$=lblMessage]').removeClass('alert alert-warning');
                    if (SearchResult != null) {
                        BindData(SearchResult);
                        paging();
                        InsertImages();
                    }
                    else {
                        $('[id$=lblMessage]').text("No Records Found");
                        $('[id$=lblMessage]').addClass("yellow-error");
                    }
                }
            });
        }
    });
});
function forAttendance(id, EmpId) {    
    $.ajax({
        type: 'POST',
        url: '../Admin/EmployeePLBalanceDetails.aspx/SearchEmployeesUsingAttendanceID',
        contentType: 'application/json;charset=utf-8',
        data: "{ 'id' : '" + id + "','EmpId' : '" + EmpId + "'}",
        dataType: 'json',
        success: function (JsonData) {

            var SearchResult = jQuery.parseJSON(JsonData.d);
            if (SearchResult != null) {
                $('[id$=lblMessage]').text("");
                $('[id$=lblMessage]').removeClass('alert alert-warning');
                BindData(SearchResult);
                paging();
                InsertImages();
            }
            else {
                $('[id$=lblMessage]').text("No records Found");
                $('[id$=lblMessage]').addClass("yellow-error");
            }
        }
    });

}
function paging() {
    $("#tblSearchResult").each(function () {
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
function InsertImages() {
    $('#tblSearchResult tr').each(function () {
        var image_src_true = "../Images/active.gif";
        var image_src_false = "../Images/inactive.gif";
        $(this).find('td').each(function () {
            if ($(this).html() == 'true') {
                $(this).html('<img src="' + image_src_true + '">');
            }
            if ($(this).html() == 'false') {
                $(this).html('<img src="' + image_src_false + '">');
            }
        });


    });
    //            var data = $("#tblSearchResult").find('td');
    //            for (var i = 0; i <= data.size() - 1; i = i + 4) {
    //                var txt = data[i].innerHTML;
    //                
    //                if (txt == 'true') {
    //                    var image_src = "../Admin/Images/Inactive.gif"
    //                    $(this).html('<img src="' + image_src + '">');
    //                }
    //            }




}
function BindData(SearchResult) {
    $("#tblbody").empty();
    var len = Object.keys(SearchResult).length;
    var ConfDate, EmpFinancialEndDate, EmpFinancialStartDate, AppDate, Edate, Sdate, RelDate, ResDate;
    for (var index = 0; index < len; index++) {
        if (SearchResult[index].ConfirmationDate != '') {
            ConfDate = (SearchResult[index].ConfirmationDate).split('T');
            ConfDate = ConfDate[0];
        }
        if (SearchResult[index].EmployeeFinancialEndDate != null) {
            EmpFinancialEndDate = (SearchResult[index].EmployeeFinancialEndDate).split('T');
            EmpFinancialEndDate = EmpFinancialEndDate[0];
        }
        if (SearchResult[index].EmployeeFinancialStartDate != null) {
            EmpFinancialStartDate = (SearchResult[index].EmployeeFinancialStartDate).split('T');
            EmpFinancialStartDate = EmpFinancialStartDate[0];
        }
        if (SearchResult[index].Startdate != null) {
            Sdate = (SearchResult[index].Startdate).split('T');
            Sdate = Sdate[0];
        }
        if (SearchResult[index].Enddate != null) {
            Edate = (SearchResult[index].Enddate).split('T');
            Edate = Edate[0];
        }
        if (SearchResult[index].ApplicationDate != null) {
            AppDate = (SearchResult[index].ApplicationDate).split('T');
            AppDate = AppDate[0];
        }      
        if (SearchResult[index].RelievingDate != null) {
            RelDate = (SearchResult[index].RelievingDate).split('T');
            RelDate = RelDate[0];
        }
        if (SearchResult[index].ResignDate != null) {
            ResDate = (SearchResult[index].ResignDate).split('T');
            ResDate = ResDate[0];
        }
        $("#tblbody").append($("<tr></tr>")
                     .append($("<td></td>").html(SearchResult[index].Name).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].CurrentPLBalanace).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].EmpID).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].EmployeePLBalanceDetailsID).css('text-align', 'center'))
                .append($("<td></td>").html(ConfDate).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].IsPLBalanceInitialize).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].IsValidResignation).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].NoticePeriod).css('text-align', 'center'))
                .append($("<td></td>").html(RelDate).css('text-align', 'center'))
                .append($("<td></td>").html(ResDate).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].WeeklyHolidayTypeID).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].CalculatedPLBalance).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].DeductionDueToMismatchWfhTimesheetEntry).css('text-align', 'center'))
                .append($("<td></td>").html(EmpFinancialEndDate).css('text-align', 'center'))
                .append($("<td></td>").html(EmpFinancialStartDate).css('text-align', 'center'))
                .append($("<td></td>").html(Edate).css('text-align', 'center'))
                .append($("<td></td>").html(Sdate).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].InitialPLBalance).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].IsAppicableForDefaultPLBalance).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].IsNewJoineeEmployee).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].IsNoticePeriodCalculationRequired).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].PLDeduction).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].PLDeductionForResignation).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].PLIncrement).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].TotalAbsent).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].TotalAppliedPL).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].TotalApprovedTour).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].TotalApprovedWfh).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].TotalRejectedPL).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].TotalRejectedTour).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].TotalSandwich).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].wfhSandwichDeduction).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].PreviousBalance).css('text-align', 'center'))
                .append($("<td></td>").html(AppDate).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].ResetPLBalance).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].DayBeforeCalculatePLBalance).css('text-align', 'center'))
               );


    }
    $("#tblSearchResult > tbody > tr:odd").addClass("altr");   
}    
    