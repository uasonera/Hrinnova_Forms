var page = 1;
$(document).ready(function () {

    //BindTrainingNameAutocomplete();

    $('#btnBackToCalendarLink').click(function () {
        location.href = "http://" + location.host + "/trainingcalendar/index";
    });
    $('#btnResetReport').click(function () {
        //$("#txtStartDate").val("");
        //$("#txtEndDate").val("");
        //$("#ddlTrainingtype").val("").trigger("chosen:updated");
        //$("#txtTrainingSearch").val("");
        //$("#ddlTrainer").val("").trigger("chosen:updated");
        //bindGrid();
        window.location.reload();
    })
    $(document).on('change', '#ddlTrainingtype', function () {
        var value = $("#ddlTrainingtype").val();
        if (value == 2) {
            $(".trainername").hide();
            $("#ddlTrainingtype").hide();
        }
        else {
            $(".trainername").show();
        }
    });
    $("#txtStartDate").datepicker({

        //buttonImage: '/Images/datepicker.gif',
        //buttonImageOnly: true,
        showOn: 'focus'
        //onClose: function (selectedDate) {
        //    $("#txtStartDate").datepicker("option", "minDate", selectedDate);
        //}
    });
    $('#from_date').click(function () {
        $("#txtStartDate").focus();
    });
    $("#txtEndDate").datepicker({
        //buttonImage: '/Images/datepicker.gif',
        //buttonImageOnly: true,
        //minDate: $(this).val(),
        showOn: 'focus'
        //onClose: function (selectedDate) {
        //    $("#txtEndDate").datepicker("option", "minDate", selectedDate);
        //}
    });
    $('#to_date').click(function () {
        $("#txtEndDate").focus();
    });



    $("#txtStartDate").change(function () {
        //$("#txtEndDate").val('');
        //$("#txtEndDate").datepicker('destroy');

        var startDate = $("#txtStartDate").val();

        if (ValidateDate(startDate)) {
            $("#txtEndDate").datepicker("option", "minDate", startDate);
        }
    });

    $("#btnSearchReport").click(function () {

        if (!validation())
            return false;


        page = 1;

        bindGrid();

    });

    $("#downloadObjective").click(function () {

        if (validation())
            return true;
        else
            return false;

    });

    $("#txtTrainingSearch").on('input', function () {
        $('#txtTrainingSearchId').val('');
    });

});

function validation() {
    var FromDate = $("#txtStartDate").val();
    var ToDate = $("#txtEndDate").val();

    var isFromdate = false;
    var isTodate = false;
    var strerrorstring = '';
    if ($('#txtStartDate').val() != "") {
        isFromdate = true;
        if (ValidateDate($.trim(FromDate)) == false) {
            status = false;

            strerrorstring += 'Please enter valid start date. \n';
        }
    }

    if ($('#txtEndDate').val() != "") {
        isTodate = true;
        if (ValidateDate($.trim(ToDate)) == false) {
            status = false;

            strerrorstring += 'Please enter valid end date. \n';
        }
    }

    if (strerrorstring != '') {
        toastr.error(strerrorstring);
        return false;
    }

    if (isFromdate == true || isTodate == true) {
        if (!isFromdate)
            strerrorstring = 'Please select start date.';
        else if (!isTodate)
            strerrorstring = 'Please select end date.';

        if (strerrorstring != '') {
            toastr.error(strerrorstring);
            return false;
        }
    }

    return true;
}

/*validate date function*/
function ValidateDate(date) {
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (!date_regex.test(date)) {
        return false
    }
    return true
}

function bindGrid() {

    $("#dvGrid").html('');
    $("#ulpagingOverallTraining").html('');

    var Trainingid = $("#ddlTrainingOverall").val();
    //var Trainingid = $("#txtTrainingSearchId").val();

    var TrainerId = $("#ddlTrainer").val();
    var Fromdate = $("#txtStartDate").val();
    var Todate = $("#txtEndDate").val();
    var Trainingtype = $("#ddlTrainingtype").val();
    //var TrainingName = $("#txtTrainingSearch").val();

    $.getJSON("/TrainingOverall/SearchTrainingOverall?page=" + page + "&Trainingid=" + Trainingid + "&TrainerId=" + TrainerId + "&Fromdate=" + Fromdate + "&Todate=" + Todate + "&Trainingtype=" + Trainingtype, function (result) {
        var data = result.result;
        var PageNumber = result.PageNumber;
        var TotalPages = result.TotalPages;

        if (data != undefined && data.length > 0) {
            bindData(data, TotalPages);
            $("#downloadObjective").css("display", "block");
        }
        else {
            $("#dvGrid").html('<table class="table common-table"><tr><th>No records Found</th></tr></table>');
            $("#downloadObjective").css("display", "none");
            $(".paginat").hide();
            $("#ulpagingOverallTraining").html('');
        }
    });
}

function bindData(ojbReport, TotalPages) {
    var strHtml = '';

    // Header start
    strHtml += "<table class='table common-table table-fixed'>";
    strHtml += "<tr>";
    strHtml += "<th style='width:60px'  valign='middle' align='center'  >Sr. No</th>";
    strHtml += "<th style='width:250px' colspan='4'   valign='middle' align='center'  >Training Name</th>";
    strHtml += "<th  style='width:110px' valign='middle' align='center'  >Training Type</th>";
    strHtml += "<th style='width:250px' colspan='3'   valign='middle' align='center'  >Trainer</th>";
    strHtml += "<th  style='width:110px' valign='middle' align='center'  >Trainer Type</th>";
    strHtml += "<th  style='width:150px' valign='middle' align='center'  >From Date</th>";
    strHtml += "<th  style='width:150px' valign='middle' align='center'  >To Date</th>";
    strHtml += "<th style='width:250px' colspan='4'   valign='middle' align='center'  >Objective</th>";
    strHtml += "<th style='width:250px' colspan='2'   valign='middle' align='center'  >Venue</th>";
    strHtml += "<th style='width:200px'  valign='middle' align='center'  >Expected no. of Participa nts</th>";
    strHtml += "<th style='width:190px'  valign='middle' align='center'  >Actual no. of Participa nts</th>";
    strHtml += "<th  style='width:110px' valign='middle' align='center'  >% Attendance</th>";
    strHtml += "<th  style='width:150px' valign='middle' align='center'  >Status</th>";
    strHtml += "<th  style='width:150px' valign='middle' align='center'  >Evaluation Method</th>";
    strHtml += "<th style='width:170px'  valign='middle' align='center'  >Average &quot;Before&quot;Rating</th>";
    strHtml += "<th  style='width:170px' valign='middle' align='center'  >Average &quot;After&quotRating</th>";
    strHtml += "<th style='width:150px'  valign='middle' align='center'  >Effectiveness Rating</th>";
    strHtml += "</tr>";

    if (ojbReport.length > 0) {
        for (var i = 0; i < ojbReport.length; i++) {

            strHtml += "<tr>";
            strHtml += "<td   valign='middle' align='center'  >" + ojbReport[i].SrNo + "</td>";
            strHtml += "<td colspan='4'   valign='middle' align='left'  >" + ojbReport[i].TrainingName + "</td>";
            strHtml += "<td  valign='middle' align='left'  >" + ojbReport[i].TrainingType + "</td>";
            strHtml += "<td colspan='3'   valign='middle' align='left'  >" + ojbReport[i].TrainerName + "</td>";
            strHtml += "<td  valign='middle' align='left'  >" + ojbReport[i].TrainingType + "</td>";
            strHtml += "<td  valign='middle' align='center'  >" + ojbReport[i].StartDate + "</td>";
            strHtml += "<td  valign='middle' align='center'  >" + ojbReport[i].EndDate + "</td>";
            strHtml += "<td colspan='4'  valign='middle' align='left'  >" + ojbReport[i].TrainingObjective + "</td>";
            strHtml += "<td colspan='2'  valign='middle' align='left'  >" + ojbReport[i].VenueName + "</td>";
            strHtml += "<td  valign='middle' align='center'  >" + ojbReport[i].ExpectedTrainee + "</td>";
            strHtml += "<td  valign='middle' align='center'  >" + ojbReport[i].ActualTrainee + "</td>";
            strHtml += "<td  valign='middle' align='center'  >" + ojbReport[i].PerAttendance + "</td>";
            strHtml += "<td  valign='middle' align='left'  >" + ojbReport[i].Status + "</td>";
            strHtml += "<td  valign='middle' align='center'  >" + ojbReport[i].EvaluationMethod + "</td>";
            strHtml += "<td  valign='middle' align='center'  >" + ojbReport[i].BeforeRating + "</td>";
            strHtml += "<td  valign='middle' align='center'  >" + ojbReport[i].AfterRating + "</td>";
            strHtml += "<td  valign='middle' align='center'  >" + ojbReport[i].Effectiveness + "</td>";
            strHtml += "</tr>";

        }
    }

    strHtml += "</table>";

    $("#dvGrid").html(strHtml);

    if (TotalPages != 1) {
        $(".paginat").show();
        //$("#ulpagingOverallTraining").wrap("<tr>");
        for (var i = 1; i <= TotalPages; i++) {
            if (page == i) {
                $("#ulpagingOverallTraining").append("<td><span>" + i + "</span></td>");
            }
            else {
                $("#ulpagingOverallTraining").append("<td onclick=searchinpageing('" + i + "') ><a class='page-number' href='javascript:'>" + i + "</a></td>");
            }
        }
    }


}

function searchinpageing(pagenumber) {

    page = pagenumber;

    bindGrid();

}

function SetExportUrl() {
    var Trainingid = $("#ddlTrainingOverall").val();
    var TrainerId = $("#ddlTrainer").val();
    var Fromdate = $("#txtStartDate").val();
    var Todate = $("#txtEndDate").val();
    var Trainingtype = $("#ddlTrainingtype").val();

    var urlexport = "/TrainingOverall/ExportToExcel?Trainingid=" + Trainingid + "&TrainerId=" + TrainerId + "&Fromdate=" + Fromdate + "&Todate=" + Todate + "&Trainingtype=" + Trainingtype;
    $("#downloadObjective").attr("href", '');
    $("#downloadObjective").attr("href", urlexport);
}

function BindTrainingNameAutocomplete() {
    var trainingNames = [];

    $.ajax({
        url: '/TrainingOverall/GetTrainingNames',
        async: false,
        success: function (data) {

            for (var i = 0; i < data.length; i++) {

                var training = { "label": data[i].TrainingName.trim(), "value": data[i].TrainingName.trim(), "id": data[i].TrainingId };
                trainingNames.push(training);
            }
        }
    });

    $("#txtTrainingSearch").autocomplete({
        source: trainingNames,
        autoFocus: true,
        select: function (event, ui) {
            $("#txtTrainingSearch").val(ui.item.label);
        },
        change: function (event, ui) {
            $("#txtTrainingSearchId").val(ui.item.id);
        }
    });
}