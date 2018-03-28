$(document).ready(function () {
   
});


$(document).on('click', '.imgUpArrowButton', function () {
    var ImageId = $(this).attr('id');
    var SplitImageId = ImageId.split("imgUp");
    var TrainingId = SplitImageId[1];

    $(".imgUpArrowButton").css('display', 'block');
    $(".imgDownArrowButton").css('display', 'none');

    $("#imgUp" + TrainingId).css('display', 'none');
    $("#imgDown" + TrainingId).css('display', 'block');
    BindTrainingDetail(TrainingId);

});


$(document).on('click', '.imgDownArrowButton', function () {
    var ImageId = $(this).attr('id');
    var SplitImageId = ImageId.split("imgDown");
    var TrainingId = SplitImageId[1];
    $("#imgUp" + TrainingId).css('display', 'block');
    $("#imgDown" + TrainingId).css('display', 'none');
    $("#div" + TrainingId).css('display', 'none');
});

function BindTrainingDetail(TrainingId) {
    $('#MainContent_gvTrainingReport').find($('th:nth-child(5)').hide());
    $('#MainContent_gvTrainingReport').find($('td:nth-child(5)').hide());
   
    $.ajax({
        type: 'post',
        url: 'TrainingReport.aspx/GetTrainingDetail',
        data: '{TrainingId:' + TrainingId + '}',
        contentType: 'application/json;charset=utf-8',
        success: function (data) {
            var Obj = JSON.parse(data.d);

            $("#tBody" + TrainingId).html('');
            $('.divTrainingDetail').css('display', 'none');



            $("#div" + TrainingId).css('display', '');
            $('#tblTrainingDetail' + TrainingId + ' tr th:nth-child(5)').show();


            for (var TrainingDetailIndex = 0; TrainingDetailIndex < Obj.length; TrainingDetailIndex++) {
                var PlannedStartDate = Obj[TrainingDetailIndex].PlannedStartDate;
                var PlannedEndDate = Obj[TrainingDetailIndex].PlannedEndDate;
                var Location = Obj[TrainingDetailIndex].Location;
                var ConferenceRoom = Obj[TrainingDetailIndex].ConferenceRoom;
                var PlannedDuration = Obj[TrainingDetailIndex].PlannedDuration;
                var TrainingDetailId = Obj[TrainingDetailIndex].TrainingDetailId;

                BindChildTr(PlannedStartDate, PlannedEndDate, Location, ConferenceRoom, PlannedDuration, TrainingId, TrainingDetailId);
            }
           
           
           
        },
        error: function () {
        }
    });
}


function BindChildTr(PlannedStartDate, PlannedEndDate, Location, ConferenceRoom, PlannedDuration, TrainingId, trainingDetailId) {
    $("#tBody" + TrainingId).append($('<tr></tr>').attr('id', trainingDetailId));
    $('#' + trainingDetailId).append('<td>' + PlannedStartDate + '</td>');
    $('#' + trainingDetailId).append('<td>' + PlannedEndDate + '</td>');
    $('#' + trainingDetailId).append('<td>' + Location + '</td>');
    $('#' + trainingDetailId).append('<td>' + ConferenceRoom + '</td>');
    $('#' + trainingDetailId).append('<td>' + PlannedDuration + '</td>');
    $('#' + trainingDetailId).append('<td><a  href="javascript:" onclick="showEditDialog(' + trainingDetailId + ')">View Training Detail</a></td>');

   
    $('#tblTrainingDetail' + TrainingId).find($('td:nth-child(4)').show());

}

function showEditDialog(trainingDetailId) {
    window.location.href = "/Admin/trainingCalendar.aspx?trainingDetailId=" + trainingDetailId;
}