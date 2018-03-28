var PageSize = 10;
var Page = 1;

$(document).ready(function () {
    $("#divYear").css('display', 'none');
   // BindAutoComplete();
    //BindTrainingMeasurementNameAutocomplete();
    $('#btnReset').click(function () {
        $("#ddlTraining").val("").trigger("chosen:updated");;
        $("#divYear").css('display', 'none');
        $("#ddlYear").prop('selectedIndex', 0);
        $("#divDate").css('display', 'none');
        $("#txtFromDate").val("");
        $("#txtToDate").val("");
        $('#txtTrainingMeasurementId').val('');
        $('input.ui-autocomplete-input').val('');
        $(".rdbtn").each(function () { 
            $(this).attr('checked', false);
        });

        $('#divMeasurementReport').css('display', 'none');
        $('#divDownloadLink').css('display', 'none');
    });

    $(".rdbtn").click(function () {
 
        if ($(this).val()=="Date") {
            $("#divDate").css('display', 'block');
            $("#divYear").css('display', 'none');
            //$("#ddlYear").combobox('autocomplete','');
        }
        else {
            $("#divDate").css('display', 'none');
            $("#divYear").css('display', 'block');
            $("#txtFromDate").val("");
            $("#txtToDate").val("");
        }

       // FileDownloadUrl();
    });


    $("#txtFromDate").datepicker({
        defaultDate: "+1w",
        changeMonth: true,

        //buttonImage: '/Images/datepicker.gif',
        //buttonImageOnly: true,
        changeMonth: true,
        changeYear: true,
        showOn: 'focus',
        //onClose: function (selectedDate) {
        //    $("#txtFromDate").datepicker("option", "minDate", selectedDate);
        //}
    });
    $('#from_date').click(function () {
        $("#txtFromDate").focus();
    });
    $("#txtToDate").datepicker({
        defaultDate: "+1w",
        changeMonth: true,

        //buttonImage: '/Images/datepicker.gif',
        //buttonImageOnly: true,
        changeMonth: true,
        changeYear: true,
        showOn: 'focus',
        //onClose: function (selectedDate) {
        //    $("#txtToDate").datepicker("option", "minDate", selectedDate);
        //}
    });
    $('#to_date').click(function () {
        $("#txtToDate").focus();
    });

    $("#btnSearch").click(function () {
        Page = 1;
        SearchData(Page);
        FileDownloadUrl();
    });
    $("#txtTrainingMeasurement").on('input', function () {
        $('#txtTrainingMeasurementId').val('');
    });
    $(document).on('change', '#txtFromDate', function () {
        var startDate = $("#txtFromDate").val();

        if (ValidateDate(startDate)) {
            $("#txtToDate").datepicker("option", "minDate", startDate);
        }
    })
    //$("#txtFromDate").change(function () {
    //    //$("#txtEndDate").val('');
    //    //$("#txtEndDate").datepicker('destroy');
    //    debugger
    //    var startDate = $("#txtFromDate").val();

    //    if (ValidateDate(startDate)) {
    //        $("#txtToDate").datepicker("option", "minDate", startDate);
    //    }
    //});
    //$("#txtFromDate").change(function () {
    //    FileDownloadUrl();
    //});

    //$("#txtToDate").change(function () {
    //    FileDownloadUrl();
    //});

});


function ValidateControls() {
    var strerrorstring = '';
    var status = true;

    if ($(".rdbtn").is(':checked')) {

        if ($('#radioDate').is(':checked')) {

            var FromDate = $("#txtFromDate").val();
            var ToDate = $("#txtToDate").val();

            if (FromDate != "") {
                if (ValidateDate($.trim(FromDate)) == false) {
                    status = false;
                    strerrorstring += 'Please enter valid "From" date. \n';
                }
            }

            if (ToDate != "") {
                if (ValidateDate($.trim(ToDate)) == false) {
                    status = false;
                    strerrorstring += 'Please enter valid "To" date. \n';
                }
            }
            if (FromDate > ToDate && (FromDate != "" && ToDate != "")) {
                status = false;
                strerrorstring += '"From" Date should not be greater than "To" date. <br/>';
            }
            if (FromDate == "") {
                status = false;
                strerrorstring += 'Please enter From date. <br/>';
            }
            if (ToDate == "") {
                status = false;
                strerrorstring += 'Please enter To date. <br/>';
            }
        }
        else {
            if ($("#ddlYear").val() == "") {
                status = false;
                strerrorstring += 'Please select year \n';
            }
        }
    }

    if (strerrorstring != '') {
        //alert(strerrorstring);
        toastr.remove();
        toastr.error(strerrorstring);
    }

    return status;
}

//function BindAutoComplete() {

//    $(function () {
//        //$("#ddlTraining").combobox();
//        //$("#ddlYear").combobox();
//        $("#toggle").click(function () {
//            $("#ddlTraining").toggle();
//            $("#ddlYear").toggle();
//        });
//    });
//}

function ValidateDate(date) {
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (!date_regex.test(date)) {
        return false
    }
    return true
}

function searchinpageing(pagenumber) {
    Page = pagenumber;
    SearchData(Page);
}

function SearchData(Page) {
    var Training = $("#ddlTraining").val();
    //var Training = $("#txtTrainingMeasurementId").val();
    //var TrainingName = $("#txtTrainingMeasurement").val();
    var FromDate = '';
    var ToDate = '';
    var Option = '';

    $("#tBodyMeasurementReport").empty();
    $("#ulpagingMeasurementReport").empty();
    if ($('.rdbtn').is(':checked')) {
        if ($('#radioDate').is(':checked')) {
            FromDate = $("#txtFromDate").val();
            ToDate = $("#txtToDate").val();
        }
        else {
            var year = $("#ddlYear").val();

            FromDate = "04/01/" + parseInt(year);
            ToDate = "03/31/" + (parseInt(year) + 1);
        }
    }
  
    $('.rdbtn').each(function () {
        if ($(this).is(':checked')) {
            Option = $(this).val();
        }
    })
  

    if (ValidateControls()) {

        $('#divMeasurementReport').css('display', 'block');

        if (Option == "Quarterly") {
            BindDataQuarterly(FromDate, ToDate, Training, year, Option);
        }

        else if (Option == "Half Yearly") {
            BindDataHalfYearly(FromDate, ToDate, Training, year, Option);
        }
        else if (Option == "Yearly" || Option == "Date") {
            BindDataYearlyOrDate(FromDate, ToDate, Training, year, Option, Page);
        }
        else if (Option == "") {
            BindDataYearlyOrDate(FromDate, ToDate, Training, year, Option, Page);
        }

    }
    else {
        $('#divMeasurementReport').css('display', 'none');
        $('#divDownloadLink').css('display', 'none');
    }
}

function BindDataQuarterly(FromDate, ToDate, training, year, Option) {

    
    $.getJSON("/TrainingMeasurement/SearchResult?Training=" + training + "&FromDate=" + FromDate + "&ToDate=" + ToDate + "&Option=" + Option + "&Page=" + 0 + "&PageSize=" + 0, function (result) {
            var Quarter1=result.result.Quarter1;
            var Quarter2=result.result.Quarter2;
            var Quarter3=result.result.Quarter3;
            var Quarter4=result.result.Quarter4;

            for (index = 0; index < 4; index++) {
                uparrow = "<img alt='' src='../Images/collapse.png' id='imgUp" + (index + 1) + "' class='imgUpArrowButton cursor-pointer' />"
                downarrow = "<img alt='' src='../Images/expand.png' id='imgDown" + (index + 1) + "' class='imgDownArrowButton  cursor-pointer' style='display: none' />"


                $("#tBodyMeasurementReport").append("<tr id='Quarter" + (index + 1) + "'></tr>");
                $('#Quarter' + (index + 1)).append("<td style='width:2%;' class='text-center'>" + uparrow + " " + downarrow + "</td>");
              
                if (index == 0) {
                    $('#Quarter' + (index + 1)).append("<td style='width:98%;' colspan='6'>Quarter 1-April-May-June-" + parseInt(year) + "</td>");
                    bindGrid(Quarter1, (index + 1));
                    
                }
                else if(index==1)
                {
                    $('#Quarter' + (index + 1)).append("<td style='width:98%;' colspan='6'>Quarter 2-July-August-September-" + parseInt(year) + "</td>");
                    bindGrid(Quarter2, (index + 1));
                }
                else if (index == 2) {
                    $('#Quarter' + (index + 1)).append("<td style='width:98%;' colspan='6'>Quarter 3-October-November-December-" + parseInt(year) + "</td>");
                    bindGrid(Quarter3, (index + 1));
                }
                else if (index == 3) {
                    $('#Quarter' + (index + 1)).append("<td style='width:98%;' colspan='6'>Quarter 4-January-February-March-" + (parseInt(year) + 1) + "</td>");
                    bindGrid(Quarter4, (index + 1));
                }

               
            }

            if (Quarter1.length > 0 || Quarter2.length > 0 || Quarter3.length > 0 || Quarter4.length > 0) {
                $('#divDownloadLink').css('display', 'block');
            }
            
        });
        
       
}

function BindDataHalfYearly(FromDate, ToDate, training, year, Option) {
    $.getJSON("/TrainingMeasurement/SearchResult?Training=" + training + "&FromDate=" + FromDate + "&ToDate=" + ToDate + "&Option=" + Option + "&Page=" + 0 + "&PageSize=" + 0 , function (result) {
        var SemiYear1 = result.result.SemiYear1;
        var SemiYear2 = result.result.SemiYear2;

        for (index = 0; index < 2; index++) {
            uparrow = "<img alt='' src='../Images/collapse.png' id='imgUp" + (index + 1) + "' class='imgUpArrowButton cursor-pointer' />"
            downarrow = "<img alt='' src='../Images/expand.png' id='imgDown" + (index + 1) + "' class='imgDownArrowButton  cursor-pointer' style='display: none' />"


            $("#tBodyMeasurementReport").append("<tr id='SemiYear" + (index + 1) + "'></tr>");
            $('#SemiYear' + (index + 1)).append("<td style='width:2%;' class='text-center'>" + uparrow + " " + downarrow + "</td>");

            if (index == 0) {
                $('#SemiYear' + (index + 1)).append("<td style='width:98%;' colspan='6'>Half Year 1-Apr-May-Jun-Jul-Aug-Sept</td>");
                bindGrid(SemiYear1, (index + 1));

            }
            else if (index == 1) {
                $('#SemiYear' + (index + 1)).append("<td style='width:98%;' colspan='6'>Half Year 2-Oct-Nov-Dec-Jan-Feb-Mar</td>");
                bindGrid(SemiYear2, (index + 1));
            }

        }

        if (SemiYear1.length > 0 || SemiYear2.length > 0) {
            $('#divDownloadLink').css('display', 'block');
        }



    });
}

function BindDataYearlyOrDate(FromDate, ToDate, training, year, Option, Page) {
    $.getJSON("/TrainingMeasurement/SearchResult?Training=" + training + "&FromDate=" + FromDate + "&ToDate=" + ToDate + "&Option=" + Option + "&Page=" + Page + "&PageSize=" + PageSize, function (result) {
        var YearOrDateReport = result.result.YearOrDateReport;

        if (YearOrDateReport.length > 0) {
            bindGridForYearAndDate(YearOrDateReport);


            var TotalRows = parseInt(YearOrDateReport[0].TotalRows);
            var totalpageing = TotalRows / PageSize;

            totalpageing = Math.ceil(totalpageing);

            if (totalpageing != 1) {
                for (var i = 1; i <= totalpageing; i++) {
                    if (Page == i) {
                        $("#ulpagingMeasurementReport").append("<td class='active'><span>" + i + "</span></td>");
                    }
                    else {
                        $("#ulpagingMeasurementReport").append("<td onclick=SearchData('" + i + "') ><a style='cursor:pointer;'>" + i + "</a></td");
                    }
                }
            }

            $('#divDownloadLink').css('display', 'block');
        }
        else {
            $("#ulpagingMeasurementReport").html('');
            $("#tBodyMeasurementReport").html("<tr><td colspan='7' >No records found.</td></tr>");
        }

    });
}
//$(document).on('change',"#ddlYear",function () {
//    FileDownloadUrl();
//});
function FileDownloadUrl() {
    ///ProjmanReport/TrainingImparted/ExportToExcel?FromDate=&ToDate=&TrainingId=
    var FromDate = "";
    var ToDate = "";
    var TrainingId = "";
    var Option = "";

    var year = $("#ddlYear").val();

    if ($('.rdbtn').is(':checked')) {
      
        if ($('#radioDate').is(':checked')) {
            FromDate = $("#txtFromDate").val();
            ToDate = $("#txtToDate").val();
        }
        else {
            var year = $("#ddlYear").val();
            //if (year != "") {
                FromDate = "04/01/" + parseInt(year);
                ToDate = "03/31/" + (parseInt(year) + 1);
            //}
            //else {
            //    ValidateControls();
            //}
        }
    }
    
    $('.rdbtn').each(function () {
        if ($(this).is(':checked')) {
            Option = $(this).val();
        }
    })

    TrainingId = $("#ddlTraining").val();;
    //var TrainingName = $("#txtTrainingMeasurement").val();

    
  
    var downloadurl = "/TrainingMeasurement/ExportToExcel?FromDate=" + FromDate + "&ToDate=" + ToDate + "&TrainingId=" + TrainingId + "&Option=" + Option ;

       // $("#downloadMeasurement").attr("href", downloadurl);
        $("#downloadMeasurement").click(function () {
            window.location = downloadurl;
        });
    
}

function bindGrid(ReportDetails,ReportIndex) {

   
    $("#tBodyMeasurementReport").append("<tr style='display:none;' class='trReportDetails'  id='trReportDetails" + ReportIndex + "'></tr>");
    $('#trReportDetails' + ReportIndex).append("<td></td><td colspan='6' id='tdReportDetails" + ReportIndex + "'></td>");
    

    if (ReportDetails.length > 0) {

        if (ReportDetails.length == 1) {
            $('#tdReportDetails' + ReportIndex).append("<div class='overflow-auto' id='divReportDetails_" + ReportIndex + "'></div>");
        }
        else {
            $('#tdReportDetails' + ReportIndex).append("<div class='overflow-auto' id='divReportDetails_" + ReportIndex + "'></div>");
        }
        $('#divReportDetails_' + ReportIndex).append("<table class='table common-table'  id='tblReportDetails" + ReportIndex + "'></table>");

        for (var index = 0; index < ReportDetails.length; index++) {
            $('#tblReportDetails' + ReportIndex).append("<tr  id='trReportDetail_" +   + "_" + (index + 1) + "'></tr>");

            $('#trReportDetail_' + ReportIndex + "_" + (index + 1)).append("<th style='width: 35%'>" + ReportDetails[index].TrainingName + "</th>");
            $('#trReportDetail_' + ReportIndex + "_" + (index + 1)).append("<th style='width: 25%'>" + ReportDetails[index].Date + "</th>");
            $('#trReportDetail_' + ReportIndex + "_" + (index + 1)).append("<th style='width: 10%'>" + ReportDetails[index].ExpectedTrainee + "</th>");
            $('#trReportDetail_' + ReportIndex + "_" + (index + 1)).append("<th style='width: 10%'>" + ReportDetails[index].ActualEmployees + "</th>");
            $('#trReportDetail_' + ReportIndex + "_" + (index + 1)).append("<th style='width: 10%'>" + ReportDetails[index].AveragePer + "</th>");
            $('#trReportDetail_' + ReportIndex + "_" + (index + 1)).append("<th style='width: 10%'>" + ReportDetails[index].AverageRating + "</th>");
        }
    }
    else {
       
        $('#tdReportDetails' + ReportIndex).html('No Result found.');
    }

}

function bindGridForYearAndDate(ReportDetails) {

    if (ReportDetails.length > 0) {

        for (var index = 0; index < ReportDetails.length; index++) {
            $('#tBodyMeasurementReport').append("<tr  id='trReportDetail_" + (index + 1) + "'></tr>");
            $('#trReportDetail_' + (index + 1)).append("<th style='width: 35%' colspan='2'>" + ReportDetails[index].TrainingName + "</th>");
            $('#trReportDetail_' + (index + 1)).append("<th style='width: 25%'>" + ReportDetails[index].Date + "</th>");
            $('#trReportDetail_' + (index + 1)).append("<th style='width: 10%'>" + ReportDetails[index].ExpectedTrainee + "</th>");
            $('#trReportDetail_' + (index + 1)).append("<th style='width: 10%'>" + ReportDetails[index].ActualEmployees + "</th>");
            $('#trReportDetail_' + (index + 1)).append("<th style='width: 10%'>" + ReportDetails[index].AveragePer + "</th>");
            $('#trReportDetail_' + (index + 1)).append("<th style='width: 10%'>" + ReportDetails[index].AverageRating + "</th>");
        }
    }
}

$(document).on('click', '.imgUpArrowButton', function () {
    var id = $(this).attr('id');
    var splitId = id.split('imgUp');
    var index = splitId[1];
    $('.imgUpArrowButton').css('display', 'inline-block');
    $('.imgDownArrowButton').css('display', 'none');
    $('.trReportDetails').css('display', 'none');
    $('#imgUp' + index).css('display', 'none');
    $('#imgDown' + index).css('display', 'inline-block');
    $('#trReportDetails' + index).css('display', '');

});

$(document).on('click', '.imgDownArrowButton', function () {
    var id = $(this).attr('id');
    var splitId = id.split('imgDown');
    var index = splitId[1];
    
    $('#imgDown' + index).css('display', 'none');
    $('#imgUp' + index).css('display', 'inline-block');
    $('#trReportDetails' + index).css('display', 'none');
});

function BindTrainingMeasurementNameAutocomplete() {
    var trainingMeasurementNames = [];
    $.ajax({
        url: '/TrainingMeasurement/GetMeasurementTrainingNames',
        async: false,
        success: function (data) {

            for (var i = 0; i < data.length; i++) {

                var lstTraining = { "label": data[i].TrainingName.trim(), "value": data[i].TrainingName.trim(), "id": data[i].TrainingId };
                trainingMeasurementNames.push(lstTraining);
            }
        }
    });

    $("#txtTrainingMeasurement").autocomplete({
        source: trainingMeasurementNames,
        autoFocus: true,
        select: function (event, ui) {
            $("#txtTrainingMeasurement").val(ui.item.label);
        },
        change: function (event, ui) {
            $("#txtTrainingMeasurementId").val(ui.item.id);
        }
    });
}



