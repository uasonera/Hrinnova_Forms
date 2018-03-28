$(document).ready(function () {

    $('#btnBackToCalendarLink').click(function () {
        $("#hdnActiveMenuItem").val("TrainingCalendar");
        location.href = "http://" + location.host + "/trainingcalendar/index";
       
       });

    $("#btnSearchReport").click(function () {
        $("#downloadObjective").css("display", "normal");
        $("#dvGrid").css("display", "normal");
        var refyear = $("#ddlRefYear").val();
        if (refyear == '') {
            $("#dvGrid").css("display", "none");
            $("#downloadObjective").css("display", "none");
            toastr.error("Please select reference year.");
            return;
           
        }

        $.getJSON("/TrainingObjective/SearchTrainingObjective?year=" + refyear, function (result) {
            var data = result.result;
            if (data != undefined) {
                bindData(data);
                $("#downloadObjective").css("display", "");
            }
            else {
                $("#dvGrid").html('<table class="table common-table"><tr><th>No records Found</th></tr></table>');
            }

        });
    });
    $("#ddlRefYear").change(function () {

        var year = $("#ddlRefYear").val();
        if (year == '')
            year = 0;

        var linkexport = "/TrainingObjective/ExportToExcel?year=" + year;
        $("#downloadObjective").attr('href', linkexport);
    });
    $("#downloadObjective").click(function () {
        var year = $("#ddlRefYear").val();
        if (year == '') {
            //alert('Please select reference year.');
            toastr.error("Please select reference year.");
            return false;
        }
    });

});


function bindData(ojbReport) {
    var strHtml = '';

    // Header start
    strHtml += "<table class='table common-table' ><tr> ";
    strHtml += "<th rowspan='2'  class='text-center'  valign='middle' align='center'>Sr. No</th> ";
    strHtml += "<th rowspan='2'  colspan='4'  valign='middle' align='center'>Objective Name</th> ";
    strHtml += "<th rowspan='2'  class='text-center'  valign='middle' align='center'>Type</th> ";
    strHtml += "<th colspan='2' class='text-center'  valign='middle' align='center'>Quarter 1</th> ";
    strHtml += "<th colspan='2' class='text-center'  valign='middle' align='center'>Quarter 2</th> ";
    strHtml += "<th colspan='2' class='text-center'  valign='middle' align='center'>Quarter 3</th> ";
    strHtml += "<th colspan='2' class='text-center'  valign='middle' align='center'>Quarter 4</th> ";
    strHtml += "</tr> ";
    strHtml += "<tr> ";
    strHtml += "<th colspan='2'  class='text-center'   valign='middle' align='center'>April - June</th> ";
    strHtml += "<th colspan='2'  class='text-center'  valign='middle' align='center'>July - Sept</th> ";
    strHtml += "<th colspan='2'  class='text-center'  valign='middle' align='center'>Oct - Dec</th> ";
    strHtml += "<th colspan='2'  class='text-center'  valign='middle' align='center'>Jan - Mar</th> ";
    strHtml += "</tr> ";
    // Header end
    // Imparted start
    strHtml += "<tr> ";
    strHtml += "<td rowspan='2'  class='text-center'  valign='middle' align='right'>1</td> ";
    strHtml += "<td colspan='4' rowspan='2' ' valign='middle' align='left'>Trainings Imparted</td> ";
    strHtml += "<td   valign='middle' align='center'>Planned</td> ";
    strHtml += "<td colspan='2'  valign='middle' align='center' >" + ojbReport.PlannedImpartedFirst + "</td> ";
    strHtml += "<td colspan='2' valign='middle' align='center' >" + ojbReport.PlannedImpartedSecond + "</td> ";
    strHtml += "<td colspan='2'  valign='middle' align='center' >" + ojbReport.PlannedImpartedThird + "</td> ";
    strHtml += "<td colspan='2' valign='middle' align='center' >" + ojbReport.PlannedImpartedFourth + "</td> ";
    strHtml += "</tr> ";

    strHtml += "<tr> ";
    strHtml += "<td  valign='middle' align='center'>Actual</td> ";
    strHtml += "<td colspan='2'  valign='middle' align='center'>" + ojbReport.ActualImpartedFirst + "</td> ";
    strHtml += "<td colspan='2'  valign='middle' align='center'>" + ojbReport.ActualImpartedSecond + "</td> ";
    strHtml += "<td colspan='2'  valign='middle' align='center'>" + ojbReport.ActualImpartedThird + "</td> ";
    strHtml += "<td colspan='2'  valign='middle' align='center'>" + ojbReport.ActualImpartedFourth + "</td> ";
    strHtml += "</tr> ";
    // Imparted end

    // Effectiveness start
    strHtml += "<tr> ";
    strHtml += "<td rowspan='2'  class='text-center' valign='middle' align='right'>2</td> ";
    strHtml += "<td colspan='4' rowspan='2' ' valign='middle' align='left'>Avg Training Effectiveness before and after Training in %</td> ";
    strHtml += "<td    valign='middle' align='center'>Target</td> ";
    strHtml += "<td colspan='2'  valign='middle' align='center' >" + ojbReport.TargetEffectivenessFirst + "</td> ";
    strHtml += "<td colspan='2'  valign='middle' align='center' >" + ojbReport.TargetEffectivenessSecond + "</td> ";
    strHtml += "<td colspan='2'  valign='middle' align='center' >" + ojbReport.TargetEffectivenessThird + "</td> ";
    strHtml += "<td colspan='2'  valign='middle' align='center' >" + ojbReport.TargetEffectivenessFourth + "</td> ";
    strHtml += "</tr> ";

    strHtml += "<tr> ";
    strHtml += "<td    valign='middle' align='center'>Actual</td> ";
    strHtml += "<td colspan='2'  valign='middle' align='center'>" + ojbReport.ActualEffectivenessFirst + "</td> ";
    strHtml += "<td colspan='2'  valign='middle' align='center'>" + ojbReport.ActualEffectivenessSecond + "</td> ";
    strHtml += "<td colspan='2'  valign='middle' align='center'>" + ojbReport.ActualEffectivenessThird + "</td> ";
    strHtml += "<td colspan='2'  valign='middle' align='center'>" + ojbReport.ActualEffectivenessFourth + "</td> ";
    strHtml += "</tr> ";
    // Effectiveness end


    // Attendance start
    strHtml += "<tr> ";
    strHtml += "<td rowspan='2'  class='text-center'  valign='middle' align='right'>3</td> ";
    strHtml += "<td colspan='4' rowspan='2' ' valign='middle' align='left'>% Attendence</td> ";
    strHtml += "<td    valign='middle' align='center'>Target</td> ";
    strHtml += "<td colspan='2'  valign='middle' align='center' >" + ojbReport.TargetAttendanceFirst + "</td> ";
    strHtml += "<td colspan='2'  valign='middle' align='center' >" + ojbReport.TargetAttendanceSecond + "</td> ";
    strHtml += "<td colspan='2'  valign='middle' align='center' >" + ojbReport.TargetAttendanceThird + "</td> ";
    strHtml += "<td colspan='2'  valign='middle' align='center' >" + ojbReport.TargetAttendanceFourth + "</td> ";
    strHtml += "</tr> ";

    strHtml += "<tr> ";
    strHtml += "<td    valign='middle' align='center'>Actual</td> ";
    strHtml += "<td colspan='2'  valign='middle' align='center'>" + ojbReport.ActualAttendanceFirst + "</td> ";
    strHtml += "<td colspan='2'  valign='middle' align='center'>" + ojbReport.ActualAttendanceSecond + "</td> ";
    strHtml += "<td colspan='2'  valign='middle' align='center'>" + ojbReport.ActualAttendanceThird + "</td> ";
    strHtml += "<td colspan='2'  valign='middle' align='center'>" + ojbReport.ActualAttendanceFourth + "</td> ";
    strHtml += "</tr> ";
    strHtml += "</table> ";

    $("#dvGrid").html(strHtml);
}