var PageSize = 10;
var Page = 1;

$(document).ready(function () {

    BindTrainingEvaluation();

    $("#btnSearch").click(function () {
        BindTrainingEvaluation();
    });

    $('#btnBackToCalendarLink').click(function () {
        location.href = "http://" + location.host + "/trainingcalendar/index";
    });

});


$(document).on('click', '.imgUpArrowButton', function () {
    var ImageId = $(this).attr('id');
    var SplitImageId = ImageId.split("imgUp");
    var TrainingId = SplitImageId[1];

    $(".imgUpArrowButton").css('display', 'inline');
    $(".imgDownArrowButton").css('display', 'none');

    $("#imgUp" + TrainingId).css('display', 'none');
    $("#imgDown" + TrainingId).css('display', 'inline');
    BindTrainingDetail(TrainingId);

});

$(document).on('click', '.imgDownArrowButton', function () {
    var ImageId = $(this).attr('id');
    var SplitImageId = ImageId.split("imgDown");
    var TrainingId = SplitImageId[1];
    $("#imgUp" + TrainingId).css('display', '');
    $("#imgDown" + TrainingId).css('display', 'none');
    $("#trchild_" + TrainingId).css('display', 'none');
});

function BindTrainingDetail(TrainingId) {
    $("#trchild_" + TrainingId).css('display', '');
    $("#tBodyDetailchild_" + TrainingId).html('');

    $.getJSON("/TrainingEvaluation/GetAllTrainingEvaluationDetail?TrainingId=" + TrainingId, function (result) {
        var data = result.result;
        for (var i = 0; i < data.length; i++) {
            var createddate = new Date(parseInt(data[i].CreatedDate.replace("/Date(", "").replace(")/", ""), 10));
            var displayDate = createddate.getMonth() + 1 + '/' + createddate.getDate() + '/' + createddate.getFullYear();

            $("#tBodyDetailchild_" + TrainingId).append($('<tr></tr>').attr('id', data[i].TrainingEvaluationID));
            $('#' + data[i].TrainingEvaluationID).append('<td>' + data[i].FileName + data[i].doctype + '</td>');
            $('#' + data[i].TrainingEvaluationID).append('<td>' + data[i].EmployeeName + '</td>');
            $('#' + data[i].TrainingEvaluationID).append('<td  class="text-center">' + displayDate + '</td>');
            var downloadurl = "/TrainingEvaluation/DownloadDocument?TrainingEvaluationID=" + data[i].TrainingEvaluationID;
            $('#' + data[i].TrainingEvaluationID).append('<td  class="text-center">' + "<a class='fileDownloadPromise btn-lg' href=" + downloadurl + " alt='Download'><i class='fa fa-download'></i></a>" + '</td>');

        }
    });
}

function searchinpageing(pagenumber) {

    Page = pagenumber;
    BindTrainingEvaluation();
}


function BindTrainingEvaluation() {
    var TrainingId = $("#ddlTraining").val();
    var TrainingName = "";
    if (TrainingId == '') {
        TrainingId = 0;
    }
    $.getJSON("/TrainingEvaluation/SearchTrainingEvaluationDetail?TrainingId=" + TrainingId + "&PageSize=" + PageSize + "&Page=" + Page , function (result) {
        var data = result.result;
        //console.log(data);
        $("#tBodyDetail").html('');
        if (data != undefined && data.length > 0) {

            var TotalRows = data[0].TotalRows;

            for (var i = 0; i < data.length; i++) {

                var uparrow = "<span class='btn-lg cursor-pointer imgUpArrowButton     cursor-pointer' id='imgUp" + data[i].TrainingId + "'><i class='fa fa-plus-square text-muted'></i></span>"
                var downarrow = "<span class='btn-lg cursor-pointer imgDownArrowButton cursor-pointer' id='imgDown" + data[i].TrainingId + "' style='display: none'><i class='fa fa-minus-square text-muted'></i></span>"

                var startdate = new Date(parseInt(data[i].StartDate.replace("/Date(", "").replace(")/", ""), 10));
                var startdisplayDate = startdate.getMonth() + 1 + '/' + startdate.getDate() + '/' + startdate.getFullYear();

                var EndDate = new Date(parseInt(data[i].EndDate.replace("/Date(", "").replace(")/", ""), 10));
                var EnddisplayDate = EndDate.getMonth() + 1 + '/' + EndDate.getDate() + '/' + EndDate.getFullYear();

                var EvaluationDate = new Date(parseInt(data[i].EvaluationDate.replace("/Date(", "").replace(")/", ""), 10));
                var EvaluationDatedisplayDate = EvaluationDate.getMonth() + 1 + '/' + EvaluationDate.getDate() + '/' + EvaluationDate.getFullYear();

                

                $("#tBodyDetail").append($("<tr id='" + data[i].TrainingId + "'></tr><tr style='display:none' id='trchild_" + data[i].TrainingId + "'></tr>"));
                $('#' + data[i].TrainingId).append("<td class=text-center>" + uparrow + downarrow + "</td>");
                $('#' + data[i].TrainingId).append('<td>' + data[i].TrainingName + '</td>');
                $('#' + data[i].TrainingId).append('<td  class=text-center>' + startdisplayDate + '</td>');
                $('#' + data[i].TrainingId).append('<td class=text-center>' + EnddisplayDate + '</td>');
                $('#' + data[i].TrainingId).append('<td class=text-center>' + EvaluationDatedisplayDate + '</td>');

                var subgrid = "<td></td><td colspan='4'><table class='common-table table no-margin' ><thead><tr><th style='width:50%'>File Name</th><th style='width:30%'>Uploaded By</th><th style='width:10%'  class='text-center'>Uploaded Date</th><th class='text-center'  style='width:10%'>Download</th></tr></thead><tbody id='tBodyDetailchild_" + data[i].TrainingId + "'></tbody></table></td>";
                $('#trchild_' + data[i].TrainingId).append((subgrid));
            }

            $("#ulpaging").html('');

            var totalpageing = TotalRows / PageSize;
            totalpageing = Math.ceil(totalpageing);

            if (totalpageing != 1) {
                $(".pagging").show();
                for (var i = 1; i <= totalpageing; i++) {
                    if (Page == i) {
                        $("#ulpaging").append("<td class='active'><span>" + i + "</span></td>");
                    }
                    else {
                        $("#ulpaging").append("<td onclick='searchinpageing(" + i + ")' ><a>" + i + "</a></td>");
                    }
                }
            }
        }
        else {
            $("#tBodyDetail").append($("<tr><td colspan='5'>No Record found.</td></tr>"));
            $("#ulpaging").html('');
        }
    });

}

function BindTrainingNameAutocomplete() {
    var trainingNames = [];

    $.ajax({
        url: '/TrainingEvaluation/GetTrainingNames',
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