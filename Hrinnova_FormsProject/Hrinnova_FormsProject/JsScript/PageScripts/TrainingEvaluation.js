$(document).ready(function () {
    //BindTrainingEvalutionNameAutocomplete();
    $("#btnSearch").click(function () {
        var TrainingId = $("#ddlTraining").val();
        //var TrainingId = $("#txtTrainingEvalutionId").val();
        //var TrainingName = $("#txtTrainingEvalution").val();
        if (TrainingId != '') {
            TrainingEvaluationDetails(TrainingId, '');
        }
        else {
            if (TrainingName != '' && TrainingId =='') {
                TrainingEvaluationDetails(0, '');
            }
            else {
                $("#TrainingName").html('');
                $("#TrainingStartDate").html('');
                $("#TrainingEndDate").html('');
                $("#EvaluationMethod").html('');
                $("#EvaluationPeriod").html('');
                $("#lstTrainee").html('');
                $("#FileName").html('');
                $("#FileName").hide('');
                $("#FileNameFull").val('');
                $("#dvTrainingDetail").hide();
                $("#dvTrainee").hide();
            }
           
        }

        var new_url = "/TrainingEvaluation/Upload?trainingname=" + $("#txtTrainingEvalution").val();
        $("#file_upload").fileupload('option', 'url', new_url);

    });

    $("#btnSave").click(function (event) {
        $(this).prop('disabled', true);
        var FileName = $("#FileNameFull").val();
        var TrainingId = $("#ddlTraining").val();
       // var TrainingId = $("#txtTrainingEvalutionId").val();
        if (FileName != '') {
            $("#process").show();
            $("#process").text("Please Wait..");
            $.ajax({
                url: "/TrainingEvaluation/saveTrainingEvaluation?TrainingId=" + TrainingId + "&FileName=" + FileName,
                type: "GET",
                contentType: "application/json;charset=utf-8",
                dataType: 'json',
                async: false,
                success: function (result) {
                    BindEvaluationDetail();
                    toastr.remove();
                    toastr.success(result.result);
                    $("#process").text("");
                    $("#FileName").text("");
                    $("#FileName").hide('');
                    $("#FileName").html('');
                    $("#FileNameFull").val('');
                },
                error: function () { }
            });

            $(this).prop('disabled', false);
            $("#process").hide();
        } else {
            toastr.remove();
            toastr.error("Please upload file.");
            $(this).prop('disabled', false);
            $("#process").hide();
        }


    });

    $("#txtTrainingEvalution").on('input', function () {
        $('#txtTrainingEvalutionId').val('');
    });
    
    $("#Simpledownload").click(function () {
        var downloadurl = "/TrainingEvaluation/DownloadReport?id=0";
        window.location = downloadurl;
    });
});



function DeleteEvaluation(TrainingEvaluationID) {

    if (confirm("Do you want to delete this record ?")) {
        $.getJSON("/TrainingEvaluation/DeleteEvaluation?TrainingEvaluationID=" + TrainingEvaluationID, function (result) {
            BindEvaluationDetail();
            toastr.remove();
            toastr.success(result.result);

        });
    }
}

function BindEvaluationDetail() {
    var TrainingId = $("#ddlTraining").val();
    //var TrainingId = $("#txtTrainingEvalutionId").val();
    if (TrainingId != '') {
        $("#tBodyDetail").html('');

        $.getJSON("/TrainingEvaluation/GetTrainingEvaluationDetail?TrainingId=" + TrainingId, function (result) {
            var data = result.result;
            for (var i = 0; i < data.length; i++) {
                var createddate = new Date(parseInt(data[i].CreatedDate.replace("/Date(", "").replace(")/", ""), 10));
                var displayDate = createddate.getMonth() + 1 + '/' + createddate.getDate() + '/' + createddate.getFullYear();

                $("#tBodyDetail").append($('<tr></tr>').attr('id', data[i].TrainingEvaluationID));
                $('#' + data[i].TrainingEvaluationID).append('<td>' + data[i].FileName + data[i].doctype + '</td>');
                $('#' + data[i].TrainingEvaluationID).append('<td>' + displayDate + '</td>');
                var downloadurl = "/TrainingEvaluation/DownloadDocument?TrainingEvaluationID=" + data[i].TrainingEvaluationID;
                $('#' + data[i].TrainingEvaluationID).append('<td>' + "<div style='text-align:center' class='im1'><a class='fileDownloadPromise' href=" + downloadurl + " alt='Download'>Download</a></div>" + '</td>');
                $('#' + data[i].TrainingEvaluationID).append('<td>' + "<div class='im1'><img src='../Images/Delete.gif' style='padding-left:30px; cursor: pointer; '  alt='Delete' onclick='DeleteEvaluation(" + data[i].TrainingEvaluationID + ")'   class='DeleteQuestion'/></div>" + '</td>');
            }
        });
    }
}

function BindTrainingEvalutionNameAutocomplete() {
    var trainingEvalutionNames = [];
    $.ajax({
        url: '/TrainingEvaluation/GetEvalutionTrainingNames',
        async: false,
        success: function (data) {

            for (var i = 0; i < data.length; i++) {

                var lstTraining = { "label": data[i].TrainingName.trim(), "value": data[i].TrainingName.trim(), "id": data[i].TrainingId };
                trainingEvalutionNames.push(lstTraining);
            }
        }
    });

    $("#txtTrainingEvalution").autocomplete({
        source: trainingEvalutionNames,
        autoFocus: true,
        select: function (event, ui) {
            $("#txtTrainingEvalution").val(ui.item.label);
        },
        change: function (event, ui) {
            $("#txtTrainingEvalutionId").val(ui.item.id);
        }
    });
}
function TrainingEvaluationDetails(TrainingId, TrainingName) {
        $.ajax({
            url: "/TrainingEvaluation/TrainingEvaluationDetails",
            data:{ TrainingId: TrainingId},
            async: false
        }).done(function (result) {
        var data = result.result;
        if ($.isEmptyObject(data) || data.TrainingID ==0 ) {
            $("#DisplayMessage").css('display', '');
            $("#dvTrainingDetail").hide();
        }
        else {
            if (TrainingId == 0) {
                $("#ddlTraining").val(data.TrainingID).trigger("chosen:updated");
            }
            $("#DisplayMessage").css('display', 'none');
            $("#TrainingName").html(data.TrainingName);
            $("#TrainingStartDate").html(data.TrainingStartDate);
            $("#TrainingEndDate").html(data.TrainingEndDate);
            $("#EvaluationMethod").html(data.EvaluationMethod);
            $("#EvaluationPeriod").html(data.EvaluationPeriod + ' month');

            if (data.lstTrainee != undefined && data.lstTrainee.length > 0) {
                $("#dvTrainee").show();
                var strtraineename = '';
                for (var i = 0; i < data.lstTrainee.length; i++) {
                    strtraineename += data.lstTrainee[i].EmpName + ', ';
                }

                if (strtraineename != '') {
                    strtraineename = strtraineename.substring(0, strtraineename.length - 2);
                }

                $("#lstTrainee").html("<p class='form-control-static'>" + strtraineename + "</p>");
            }
            else {
                $("#lstTrainee").html('');
                $("#dvTrainee").hide();
            }

            $("#tBodyDetail").html('');
            if (data.lstEvaluation != undefined && data.lstEvaluation.length > 0) {
                for (var i = 0; i < data.lstEvaluation.length; i++) {

                    var createddate = new Date(parseInt(data.lstEvaluation[i].CreatedDate.replace("/Date(", "").replace(")/", ""), 10));
                    var displayDate = createddate.getMonth() + 1 + '/' + createddate.getDate() + '/' + createddate.getFullYear();

                    $("#tBodyDetail").append($('<tr></tr>').attr('id', data.lstEvaluation[i].TrainingEvaluationID));
                    $('#' + data.lstEvaluation[i].TrainingEvaluationID).append('<td>' + data.lstEvaluation[i].FileName + data.lstEvaluation[i].doctype + '</td>');
                    $('#' + data.lstEvaluation[i].TrainingEvaluationID).append('<td class=text-center>' + displayDate + '</td>');
                    var downloadurl = "/TrainingEvaluation/DownloadDocument?TrainingEvaluationID=" + data.lstEvaluation[i].TrainingEvaluationID;
                    $('#' + data.lstEvaluation[i].TrainingEvaluationID).append('<td class=text-center>' + "<a title='Download' class='btn-lg' href=" + downloadurl + " alt='Download'><i class='fa fa-download'></i></a>" + '</td>');
                    $('#' + data.lstEvaluation[i].TrainingEvaluationID).append('<td class=text-center>' + "<a class='btn-lg' href='#' title='Delete' onclick='DeleteEvaluation(" + data.lstEvaluation[i].TrainingEvaluationID + ")'><i class='fa fa-trash text-danger'></i></a>" + '</td>');
                }
            }

            $("#dvTrainingDetail").show();
        }
    });
}
