$(document).ready(function () {

    $('#btnBackToCalendarLink').click(function () {
        location.href = "http://" + location.host + "/trainingcalendar/index";
    });

    $('#btnNext').click(function () {

        var PageNumber = $(this).attr('data-pagenumber');
        PageNumber = (parseInt(PageNumber) + 1);
        var PageSize = $(this).attr('data-pagesize');
        var TrainingDetailId = $(this).attr('data-trainingid');

        var list = GetAllQuestionAnswer();
        SaveAllData(list, PageNumber, PageSize, TrainingDetailId, false);
    });

    $('#btnPrevious').click(function () {

        var PageNumber = $(this).attr('data-pagenumber');
        PageNumber = (parseInt(PageNumber) - 1);
        var PageSize = $(this).attr('data-pagesize');
        var TrainingDetailId = $(this).attr('data-trainingid');

        var list = GetAllQuestionAnswer();
        SaveAllData(list, PageNumber, PageSize, TrainingDetailId, false);
    });

    $('#btnSave').click(function () {

        var PageNumber = $(this).attr('data-pagenumber');
        var PageSize = $(this).attr('data-pagesize');
        var TrainingDetailId = $(this).attr('data-trainingid');

        var list = GetAllQuestionAnswer();
        SaveAllData(list, PageNumber, PageSize, TrainingDetailId, true);
    });

    $('#btnSaveClose').click(function () {

        var PageNumber = $(this).attr('data-pagenumber');
        var PageSize = $(this).attr('data-pagesize');
        var TrainingDetailId = $(this).attr('data-trainingid');

        var list = GetAllQuestionAnswer();
        SaveAllData(list, PageNumber, PageSize, TrainingDetailId, false);
    }); 

});


function GetAllQuestionAnswer() {

    var list = [];
    $('.Waiver').each(function () {
        var ansObject = new Object();
        ansObject.TrainingDetailID = $(this).attr('data-TrainingDetailId');
        ansObject.TrainingID = $(this).attr('data-TrainingId');
        ansObject.Reason = $(this).val().trim();
        ansObject.WaiverID = $(this).attr('data-WaiverID');
        ansObject.WaiverDetailID = $(this).attr('data-WaiverDetailID');
        list.push(ansObject);
    });

    return list;
}


$(document).on('click', '#btnQuickSave', function () {

    var ansID = $(this).attr("data-ansid");
    var ans = $('#' + ansID).val().trim();

    if (ans != '') {
        QuickSaveData(ansID);
    }
    else {
        $('#' + ansID).css('border-color', 'red');
    }
});

function QuickSaveData(ansID) {
    var TrainingDetailID = $('#' + ansID).attr('data-TrainingDetailId');
    var TrainingID = $('#' + ansID).attr('data-TrainingId');
    var Reason = $('#' + ansID).val().trim();
    var WaiverID = $('#' + ansID).attr('data-WaiverID');
    var WaiverDetailID = $('#' + ansID).attr('data-WaiverDetailID');
    var PageNumber = $('#btnQuickSave').attr('data-pagenumber');
    var PageSize = $('#btnQuickSave').attr('data-pagesize');

    if (WaiverID == '')
        WaiverID = 0;
    if (WaiverDetailID == '')
        WaiverDetailID = 0;

    $.ajax({
        url: '/TrainingWaiver/SaveQuickData',
        type: 'post',
        data: JSON.stringify({ TrainingDetailID: TrainingDetailID, TrainingID: TrainingID, Reason: Reason, WaiverID: WaiverID, WaiverDetailID: WaiverDetailID }),
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            
            var previousUrl = $('#PreviousUrl').val();
            if (!result)
                window.location.href = "/TrainingWaiver/GetTrainingWaiverDetails?TrainingID=" + TrainingID + "&page=" + PageNumber + "&PageSize=" + PageSize + "&PreviousPageUrl=" + previousUrl;
            else {
                alert("Waiver saved successfully");
                window.location.href = "/TrainingWaiver/GetTrainingWaiverDetails?TrainingID=" + TrainingID + "&page=" + PageNumber + "&PageSize=" + PageSize + "&PreviousPageUrl=" + previousUrl;
            }
        },
        error: function () { }

    });
}

function validateQueAnsList() {
    var success = true;
    $('.Waiver').each(function () {
        var Answer = '';
        Answer = $(this).val().trim();
        if (Answer == "") {

            $(this).css('border-color', 'red');
            success = false;
        }
        else {
            $(this).css('border-color', '');
        }
    });
    return success;
}

function SaveAllData(list, PageNumber, PageSize, TrainingDetailId, IsClosed) {

    if (validateQueAnsList()) {
        $.ajax({
            url: '/TrainingWaiver/SaveAllData',
            type: 'post',
            data: JSON.stringify({ list: list, PageNumber: PageNumber, TrainingDetailId: TrainingDetailId, IsClosed: IsClosed }),
            contentType: "application/json;charset=utf-8",
            success: function (result) {
                
                var previousUrl = $('#PreviousUrl').val();
                if (!IsClosed) {
                    window.location.href = "/TrainingWaiver/GetTrainingWaiverDetails?TrainingId=" + TrainingDetailId + "&page=" + PageNumber + "&PageSize=" + PageSize;
                }
                else {
                    //window.location.href = "/Admin/trainingcalendar.aspx";
                    if (previousUrl.length > 0) {
                        window.location.href = previousUrl;
                    }
                    else {
                        window.location.href = "/trainingcalendar/index";
                    }
                }
            },
            error: function () { }

        });
    }
}



