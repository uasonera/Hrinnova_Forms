$(document).ready(function () {

    //var viewModelFinancialYear =
    //       {
    //           MonthsOfFinancialYear: ko.observableArray([])
    //       }
    var arr = new Array();
    
    $.ajax({
        type: "POST",
        url: 'RequestCard.aspx/GetStartMonthOfFinancialYear',
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            var jsonResult = jQuery.parseJSON(result.d);
            //MonthViewModel(jsonResult);
            var FinancialMonth = jsonResult[0].FinancialStartMonth;           
           
            var startIndex = FinancialMonth + 1;
            var maxLength = FinancialMonth + 12;
            for (var i = FinancialMonth; i < maxLength; i++) {
                var m = i-1;
                if (i > 12) {
                    m = m - 12;
                }
                var MonthName = getMonthName(m)
                arr.push(MonthName);                
            }            
            MonthViewModel(arr);
        }
    });
    function MonthViewModel(arr) {
        //ko.applyBindings({
        //    months: result
        //});
        viewModel.MonthsOfFinancialYear([]);
        $.each(arr, function (index) {            
            viewModel.MonthsOfFinancialYear.push(arr[index]);
        });
    }

    $.ajax({
        type: "POST",
        url: 'RequestCard.aspx/GetDataForRequests',
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {

            var jsonResult = jQuery.parseJSON(result.d);
            var RequestDetails = jsonResult.RequestDetails;
            var PLBalanceDetails = jsonResult.PlBalanceDetails;
            BindPLDetails(PLBalanceDetails);
            TimeoffViewModel(RequestDetails);
        }
    });
    //$("#lnkPolicy").click(function () {
    //    window.open('../Documents/example.pdf', '_blank');
    //});

    var viewModel =
            {
                RequestDetails: ko.observableArray([]),
                MonthsOfFinancialYear: ko.observableArray([])
            }

    ko.applyBindings(viewModel, document.getElementById("tblTimeoff"));

    function TimeoffViewModel(result) {
        
        viewModel.MonthsOfFinancialYear.push(arr[0]);
       
        viewModel.RequestDetails([]);
        $.each(result, function (index) {
            
            viewModel.RequestDetails.push(result[index]);            
        });

        $("#tblTimeoff").append($("#tblTimeoff").find('tr:last').clone());
        $("#tblTimeoff").find('tr:last').find('td:eq(0)').html('Total');

        $("#tblTimeoff").find('tr:last').find('td').css('font-weight', '800');
        var TotalTr = $("#tblTimeoff").find('tr').length;
        for (var j = 2; j <= 13; j++) {
            var CurrentTotal = 0;
            for (var i = 1; i < TotalTr - 1; i++) {
                var CurrentRow = $("#tblTimeoff").find('tr:eq(' + i + ')');
                CurrentTotal = CurrentTotal + parseFloat($(CurrentRow).find("td:nth-child(" + j + ")").find('span').html());
            }
            $("#tblTimeoff").find('tr:last').find("td:nth-child(" + j + ")").html(CurrentTotal);
        }

    }
    function BindPLDetails(PLBalanceDetails) {
        if (!jQuery.isEmptyObject(PLBalanceDetails)) {
            $("#lblTotalDeduction").html(PLBalanceDetails[0].CalculatedPLBalance);
            $("#lblTotalAbsent").html(PLBalanceDetails[0].TotalAbsent);
            $("#lblLeave").html(PLBalanceDetails[0].TotalAppliedPL);
            $("#lblWFmissmatch").html(PLBalanceDetails[0].DeductionDueToMismatchWfhTimesheetEntry);
            $("#lblTotalDeduction").html(PLBalanceDetails[0].CalculatedPLBalance);
            $("#lblInitialPLBalance").html(PLBalanceDetails[0].InitialPLBalance);
            $("#lblCurrentPLBalance").html(PLBalanceDetails[0].CurrentPLBalanace);
            var refreshdate = moment(PLBalanceDetails[0].ApplicationDate.split("T")[0]).format("DD/MM/YYYY");
            $("#lblRefreshDate").html(refreshdate);
        }
    }
    getMonthName = function (v) {
        var n = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        return n[v]
    }
});