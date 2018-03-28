$(document).ready(function () {

    CheckDifferenceInRating();

    //alert($('#IsBeforeRating').val());

    $('#ListTrainees').change(function () {
        var traineeId = $(this).val();
        var trainingId = $(this).attr("data-trainingId")
        window.location.href = "/TrainingFeedback/GetTrainingDetailsForTrainee?TrainingId=" + trainingId + "&TraineeId=" + traineeId;
    });

    $('#btnBackToCalendarLink').click(function () {
        location.href = "http://" + location.host + "/trainingcalendar/index";
    });

    $('.FeedbackOption').click(function () {
        if ($(this).is(':checked')) {
            var ans = $(this).val();
            var QuestionId = $(this).attr('data-QuestionID');
            $('#Ans_' + QuestionId).val(ans);
        }
    });

    $('#btnNext').click(function () {

        var PageNumber = $(this).attr('data-pagenumber');
        PageNumber = (parseInt(PageNumber) + 1);
        var PageSize = $(this).attr('data-pagesize');
        var TrainingDetailId = $(this).attr('data-trainingid');
        var FeedbackId = $(this).attr('data-feedbackId');

        var list = GetAllQuestionAnswer();
        SaveAllData(list, PageNumber, PageSize, FeedbackId, TrainingDetailId, false);
    });


    $('#btnPrevious').click(function () {

        var PageNumber = $(this).attr('data-pagenumber');
        PageNumber = (parseInt(PageNumber) - 1);
        var PageSize = $(this).attr('data-pagesize');
        var TrainingDetailId = $(this).attr('data-trainingid');
        var FeedbackId = $(this).attr('data-feedbackId');
        var list = GetAllQuestionAnswer();
        SaveAllData(list, PageNumber, PageSize, FeedbackId, TrainingDetailId, false);
    });

    $('#btnSave').click(function () {
        var PageNumber = $(this).attr('data-pagenumber');
        var PageSize = $(this).attr('data-pagesize');
        var TrainingDetailId = $(this).attr('data-trainingid');
        var FeedbackId = $(this).attr('data-feedbackId');
        var list = GetAllQuestionAnswer();
        SaveAllData(list, PageNumber, PageSize, FeedbackId, TrainingDetailId, true);
    });


    // prepareslider();
    // prepareafterslider();

});




function GetAllQuestionAnswer() {

    //var list = [];
    //$('.Feedback').each(function () {
    //    var ansObject = new Object();

    //    var elementid = $(this).attr("id");
    //    console.log(elementid);
    //    var id = elementid.split('_')[1];

    //    ansObject.QuestionID = $(this).attr('data-questionid');
    //    ansObject.TrainingID = $(this).attr('data-trainingid');
    //    ansObject.isMandatory = $(this).attr('data-ismandatory');
    //    ansObject.Answer = $(this).val();
    //    ansObject.FeedbackID = $(this).attr('data-FeedbackId');
    //    ansObject.FeedbackQueLookupID = $(this).attr('data-FeedbackQueLookupID');

    //    list.push(ansObject);

    //});

    var list = [];
    $('.Feedback').each(function () {
        var ansObject = new Object();
        var elementid = $(this).attr("id").split('_')[1];
        //console.log(elementid);

        var answer = '';
        var target = 'Ans_' + elementid;
        if ($(this).is("div")) {
            //console.log("radio");
            answer = $("input:radio[name=FeedbackOption_" + elementid + "]:checked").val()
        }
        else {
            //console.log("text");
            answer = $("#" + target).val();
        }

        if (answer == undefined)
            answer = '';

        //console.log(answer);
        //console.log($(this).attr('data-questionid'));
        //console.log($(this).attr('data-trainingid'));
        //console.log($(this).attr('data-ismandatory'));
        //console.log($(this).attr('data-FeedbackId'));
        //console.log($(this).attr('data-FeedbackQueLookupID'));
        ansObject.QuestionID = $(this).attr('data-questionid');
        ansObject.TrainingID = $(this).attr('data-trainingid');
        ansObject.isMandatory = $(this).attr('data-ismandatory');
        ansObject.Answer = answer;
        ansObject.FeedbackID = $(this).attr('data-FeedbackId');
        ansObject.FeedbackQueLookupID = $(this).attr('data-FeedbackQueLookupID');
        list.push(ansObject);
    });

    return list;
}



$(document).on('click', '#btnQuickSave', function () {
    var ansID = $(this).attr("data-ansid");
    var isMandatory = $("#" + ansID).attr('data-isMandatory');
    var isdefault = $(this).attr('data-isdefault');
    var AnswerType = $(this).attr('data-answertype');
    var ans = '';
    if (AnswerType == 'Text')
        ans = $('#' + ansID).val();
    else
        ans = $("input:radio[name=FeedbackOption_" + ansID.split('_')[1] + "]:checked").val()
    // var isvalid = ValidateQuickSaveData(ans, isMandatory);
    //if (ValidateQuickSaveData(ans, isMandatory)) {    
    if (ans != '' && ans != undefined) {
        if (isdefault == "True") {
            if (ValidateBeforeAfter())
                QuickSaveData(ansID);
            //else
            //    alert('After rating should be greater then before rating.');
        }
        else {
            QuickSaveData(ansID);
        }
    }
    else {
        $('#' + ansID).css('border-color', 'red');
    }
});

function ValidateQuickSaveData(ans, isMandatory) {
    if (isMandatory == "True") {
        return ans != "" ? true : false;
    }
    return true;
}

function QuickSaveData(ansID) {

    var QuestionID = $('#' + ansID).attr('data-questionid');
    var TrainingID = $('#' + ansID).attr('data-trainingid');
    var isMandatory = $('#' + ansID).attr('data-ismandatory');
    var FeedbackID = $('#' + ansID).attr('data-FeedbackId');
    var FeedbackQueLookupID = $('#' + ansID).attr('data-FeedbackQueLookupID');
    var TrainingDetailId = $('#btnQuickSave').attr('data-TrainingDetailId');
    var PageNumber = $('#btnQuickSave').attr('data-pagenumber');
    var PageSize = $('#btnQuickSave').attr('data-pagesize');
    var Answer = '';
    var answertype = $('#' + ansID).attr('data-answertype');


    if (answertype == 'Text')
        Answer = $('#' + ansID).val();
    else
        Answer = $("input:radio[name=FeedbackOption_" + ansID.split('_')[1] + "]:checked").val()

    $.ajax({
        url: '/TrainingFeedback/SaveQuickData',
        type: 'post',
        data: JSON.stringify({ QuestionID: QuestionID, TrainingID: TrainingID, Answer: Answer, FeedbackID: FeedbackID, FeedbackQueLookupID: FeedbackQueLookupID }),
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            var previousUrl = $('#PreviousUrl').val();
            if (!result) {
                //toastr.success("Feedback saved successfully");
                window.location.href = "/TrainingFeedback/GetTrainingDetails?TrainingID=" + TrainingID + "&page=" + PageNumber + "&PageSize=" + PageSize + "&PreviousPageUrl=" + previousUrl;
            }
            else {
                toastr.success("Feedback saved successfully");
                // window.location.href = "/TrainingFeedback/GetTrainingDetails?TrainingID=" + TrainingID + "&page=" + PageNumber + "&PageSize=" + PageSize + "&PreviousPageUrl=" + previousUrl;
            }
        },
        error: function () { }

    })
}

function validateQueAnsList() {
    ValidateBeforeAfter();
    var success = true;
    $('.Feedback').each(function () {
        var isMandatory = $(this).attr('data-ismandatory');
        var elementid = $(this).attr("id").split('_')[1];
        var validateRadio = false;
        
        var Answer = '';
        //var target = 'Ans_' + elementid;
        if ($(this).is("div")) {
            Answer = $("input:radio[name=FeedbackOption_" + elementid + "]:checked").val()
            if (Answer == "" || Answer == undefined) {
                validateRadio = true;
            }
        }
        else {
            Answer = $(this).val();
        }
        if (Answer == undefined)
            Answer = '';

        //console.log(elementid);
        //console.log(Answer);

        if (isMandatory == "True" && Answer == "") {
            //console.log("success false");
            $(this).css('border-color', 'red');
            if (validateRadio)
            {
                //$('#Valid_' + elementid).html('Please choose one of rating');
                $(this).addClass("has-error  has-feedback");
            }

            success = false;
        }
        else {
            $(this).css('border-color', '');
            $('#Valid_' + elementid).html('');
            $(this).removeClass("has-error  has-feedback");
        }

    });

    return success;

}

function ValidateBeforeAfter() {
   
    var success = true;
    var BeforeAnswer = 0;
    var AfterAnswer = 0;
    var DefaultDiff = $("#hdnDefaultDiff").val();
    var IsBeforeRating = $("#IsBeforeRating").val();
    var trainerRating = 0;
    var trainingFacilityRating = 0;
    var traineeID = 0;

    $("#txtbeforepercentage").css('border-color', '');
    $("#txtafterpercentage").css('border-color', '');
    $("#txtTrainerRating").css('border-color', '');
    $("#txtTrainingFacilityRating").css('border-color', '');
    $("#ListTrainees").css('border-color', '');

    if ($("#txtbeforepercentage").length > 0) {

        BeforeAnswer = $("#txtbeforepercentage").val();
        AfterAnswer = $("#txtafterpercentage").val();

        if (IsBeforeRating == 'False') {
            if (AfterAnswer == '' || AfterAnswer == null || AfterAnswer == '0') {
                //toastr.remove();
                //toastr.options.timeOut = 5000;
                //toastr.error('Please enter Rating of Training');
                $("#txtafterpercentage").css('border-color', 'red');
                success= false;
            }
        }
        else {
            if (BeforeAnswer == '' || BeforeAnswer == null || BeforeAnswer == '0') {
                //toastr.remove();
                //toastr.options.timeOut = 5000;
                //toastr.error('Please rate your knowledge before training');
                $("#txtbeforepercentage").css('border-color', 'red');
                success= false;
            }
            if (AfterAnswer == '' || AfterAnswer == null || AfterAnswer == '0') {
                //toastr.remove();
                //toastr.options.timeOut = 5000;
                //toastr.error('Please rate your knowledge after training');
                $("#txtafterpercentage").css('border-color', 'red');
                success= false;
            }
            if (parseInt(BeforeAnswer) > parseInt(AfterAnswer)) {
                toastr.remove();
                toastr.options.timeOut = 5000;
                toastr.error('After rating should be greater then before rating.');
                $("#txtafterpercentage").css('border-color', 'red');
                success= false;
            }
        }

        //else if (parseInt(BeforeAnswer) == parseInt(AfterAnswer)) {
        //    toastr.remove();
        //    toastr.options.timeOut = 10000;
        //    toastr.error('The Before and After rating of the Training can never be \nsame as it is assumed that the trainee gains atleast \nsomething from the training. Hence, the minimal difference \nbetween the Before and After rating should be ' + DefaultDiff + '.');
        //    return false;
        //}
        //else {

        //    var diff = parseInt(AfterAnswer) - parseInt(BeforeAnswer);

        //    if (diff < DefaultDiff && $('#ReasonForDifferenceInRating').val() == '') {
        //        toastr.remove();
        //        toastr.options.timeOut = 10000;
        //        //toastr.error('The Before and After rating of the Training can never be \nsame as it is assumed that the trainee gains atleast \nsomething from the training. Hence, the minimal difference \nbetween the Before and After rating should be ' + DefaultDiff + '.');
        //        toastr.error('Please provide reason for low difference between before and after rating.');
        //        return false;
        //    }
        //}
    }
    //if ($("#beforechanceSlider").val() != '') {
    //    BeforeAnswer = 1;
    //    AfterAnswer = $("#afterchanceSlider").val();
    //    if (IsBeforeRating == 'True') {
    //        if (AfterAnswer == '' || AfterAnswer == null) {
    //            toastr.remove();
    //            toastr.options.timeOut = 5000;
    //            toastr.error('Please enter rating of Training');
    //            return false;
    //        }
    //    }
    //}
    if (IsBeforeRating == 'False') {
        AfterAnswer = $("#txtafterpercentage").val();
        if (AfterAnswer == '' || AfterAnswer == null || AfterAnswer == '0') {
            //toastr.remove();
            //toastr.options.timeOut = 5000;
            //toastr.error('Please enter Rating of training');
            $("#txtafterpercentage").css('border-color', 'red');
            success= false;
        }
    }

    if ($("#txtTrainerRating").length > 0) {
        trainerRating = $("#txtTrainerRating").val();
        if (trainerRating == '' || trainerRating == null || trainerRating == '0' || trainerRating==undefined) {
            //toastr.remove();
            //toastr.options.timeOut = 5000;
            //toastr.error('Please rate knowledge of trainer.');
            $("#txtTrainerRating").css('border-color', 'red');
            success= false;
        }
    }
    if ($("#txtTrainingFacilityRating").length > 0) {
        trainingFacilityRating = $("#txtTrainingFacilityRating").val();
        if (trainingFacilityRating == '' || trainingFacilityRating == null || trainingFacilityRating == '0' || trainingFacilityRating==undefined) {
            //toastr.remove();
            //toastr.options.timeOut = 5000;
            //toastr.error('Please rate arrangement & venue of training.');
            $("#txtTrainingFacilityRating").css('border-color', 'red');
            success= false;
        }
    }
    if ($("#ListTrainees").val() != undefined) {
        traineeID = $("#ListTrainees").val();
        if (traineeID == '' || traineeID == null || traineeID == '0' || traineeID == undefined) {
            //toastr.remove();
            //toastr.options.timeOut = 5000;
            //toastr.error('Please select Trainee');
            $("#ListTrainees").css('border-color', 'red');
            success= false;
        }
    }
    return success;
}

function SaveAllData(list, PageNumber, PageSize, FeedbackId, TrainingDetailId, IsClosed) {
    //console.log(IsClosed);
    //var success = validateQueAnsList();
    if (validateQueAnsList()) {
        if (ValidateBeforeAfter()) {
           
            var BeforeRating = -1;
            var AfterRating = -1;
            var trainerRating = -1;
            var trainingFacilityRating = -1;
            var traineeID = -1;

            var ReasonForDifferenceInRating = "";
            if ($('#ReasonForDifferenceInRating').attr('data-ismandatory') == 'True') {
                ReasonForDifferenceInRating = $('#ReasonForDifferenceInRating').val();
            }
            if ($("#txtbeforepercentage").length > 0) {
                if ($("#txtbeforepercentage").val() != '')
                    BeforeRating = $("#txtbeforepercentage").val();
                else
                    BeforeRating = 0;

                if ($("#txtafterpercentage").val() != '')
                    AfterRating = $("#txtafterpercentage").val();
                else
                    AfterRating = 0;
            }
            if ($("#txtbeforepercentage").val() != '') {
                var IsBeforeRating = $("#IsBeforeRating").val();
                if (IsBeforeRating == 'False') {
                    BeforeRating = 1;
                    AfterRating = $("#txtafterpercentage").val();
                }
            }
            if ($("#txtTrainerRating").val() != undefined && $("#txtTrainerRating").val() != '') {
                trainerRating = $("#txtTrainerRating").val();
            }
            else { trainerRating = 0; }

            if ($("#txtTrainingFacilityRating").val() != undefined && $("#txtTrainingFacilityRating").val() != '') {
                trainingFacilityRating = $("#txtTrainingFacilityRating").val();
            }
            else { trainingFacilityRating = 0; }

            if ($("#ListTrainees").val() != undefined || $("#ListTrainees").val() != '')
            {
                traineeID = $("#ListTrainees").val();
            }
            
            $.ajax({
                url: '/TrainingFeedback/SaveAllData',
                type: 'post',
                data: JSON.stringify({ list: list, PageNumber: PageNumber, TrainingDetailId: TrainingDetailId, IsClosed: IsClosed, BeforeRating: BeforeRating, AfterRating: AfterRating, ReasonForDifferenceInRating: ReasonForDifferenceInRating, FeedbackId: FeedbackId, TrainerRating: trainerRating, TrainingFacilityRating: trainingFacilityRating, TraineeID: traineeID }),
                contentType: "application/json;charset=utf-8",
                success: function (result) {
                    
                    var previousUrl = $('#PreviousUrl').val();
                    if (!IsClosed  ) {
                        if (traineeID == -1){
                        window.location.href = "/TrainingFeedback/GetTrainingDetails?TrainingId=" + TrainingDetailId + "&page=" + PageNumber + "&PageSize=" + PageSize;
                        }
                        else {
                        window.location.href = "/TrainingFeedback/GetTrainingDetailsForTrainee?TrainingId=" + trainingId + "&TraineeId=" + traineeId;
                        }
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
}

function changeBeforeAfterPercentage(obj) {
    var id;
    if (obj == 'beforechanceSlider') {
        id = 'beforechanceSlider';
    }
    else if (obj == 'afterchanceSlider') {
        id = 'afterchanceSlider';
    }
    else {
        id = obj.id;
    }


    if (id == 'txtbeforepercentage') {
        var x = $("#txtbeforepercentage").val();
        if (x == '') {
            x = 0;

            $("#txtbeforepercentage").val(x)
        }
        else if (x != '') {
            if ($.isNumeric(x)) {
                if (Math.floor(x) != x) {
                    x = Math.floor(x);
                    $("#txtbeforepercentage").val(x)
                    alert('Please enter integer value between 0 to 10.');
                }
                else {
                    if (x < 0 || x > 10) {
                        x = 0;
                        $("#txtbeforepercentage").val(x)
                        alert('Please enter integer value between 0 to 10.');
                    }
                }
            }
            else {
                x = 0;
                $("#txtbeforepercentage").val(x)
                alert('Please enter integer value between 0 to 10.');
            }
        }
        $("#beforechanceSlider").val(x);
    }
    else if (id == 'beforechanceSlider') {
        var x = $("#beforechanceSlider").val();
        if (x == '') {
            x = 0;
        }
        $("#txtbeforepercentage").val(x);

    }
    else if (id == 'txtafterpercentage') {
        var x = $("#txtafterpercentage").val();

        if (x == '') {
            x = 0;
            $("#txtafterpercentage").val(x)
        }
        else if (x != '') {
            if ($.isNumeric(x)) {
                if (Math.floor(x) != x) {
                    x = Math.floor(x);
                    $("#txtafterpercentage").val(x)
                    alert('Please enter integer value between 0 to 10.');
                }
                else {
                    if (x < 0 || x > 10) {
                        x = 0;
                        $("#txtafterpercentage").val(x)
                        alert('Please enter integer value between 0 to 10.');
                    }
                }
            }
            else {
                x = 0;
                $("#txtafterpercentage").val(x)
                alert('Please enter integer value between 0 to 10.');
            }
        }


        $("#afterchanceSlider").val(x);
    }
    else if (id == 'txtTrainerRating') {

        var x = $("#txtTrainerRating").val();

        if (x == '') {
            x = 0;
            $("#txtTrainerRating").val(x)
        }
        else if (x != '') {
            if ($.isNumeric(x)) {
                if (Math.floor(x) != x) {
                    x = Math.floor(x);
                    $("#txtTrainerRating").val(x)
                    alert('Please enter integer value between 0 to 10.');
                }
                else {
                    if (x < 0 || x > 10) {
                        x = 0;
                        $("#txtTrainerRating").val(x)
                        alert('Please enter integer value between 0 to 10.');
                    }
                }
            }
            else {
                x = 0;
                $("#txtTrainerRating").val(x)
                alert('Please enter integer value between 0 to 10.');
            }
        }


    }

    else if (id == 'txtTrainingFacilityRating') {

        var x = $("#txtTrainingFacilityRating").val();

        if (x == '') {
            x = 0;
            $("#txtTrainingFacilityRating").val(x)
        }
        else if (x != '') {
            if ($.isNumeric(x)) {
                if (Math.floor(x) != x) {
                    x = Math.floor(x);
                    $("#txtTrainingFacilityRating").val(x)
                    alert('Please enter integer value between 0 to 10.');
                }
                else {
                    if (x < 0 || x > 10) {
                        x = 0;
                        $("#txtTrainingFacilityRating").val(x)
                        alert('Please enter integer value between 0 to 10.');
                    }
                }
            }
            else {
                x = 0;
                $("#txtTrainingFacilityRating").val(x)
                alert('Please enter integer value between 0 to 10.');
            }
        }

    }

    prepareslider();
    prepareafterslider();
    //ValidateBeforeAfter();
    CheckDifferenceInRating();
}
function CheckDifferenceInRating() {

    var BeforeAnswer = 0;
    var AfterAnswer = 0;
    var DefaultDiff = $("#hdnDefaultDiff").val();

    if ($("#txtbeforepercentage").length > 0) {

        BeforeAnswer = $("#beforechanceSlider").val();
        AfterAnswer = $("#afterchanceSlider").val();

        var diff = parseInt(AfterAnswer) - parseInt(BeforeAnswer);

        if (diff < DefaultDiff && AfterAnswer != 10 && diff >= 0) {
            $('#reasonForDiffQue').show();
            $('#ReasonForDifferenceInRating').attr('data-ismandatory', "True");

        }
        else {
            $('#reasonForDiffQue').hide();
            $('#ReasonForDifferenceInRating').attr('data-ismandatory', "False");
        }
    }
    return success;
}

function prepareslider() {
    var select = $("#beforechanceSlider");
    if (select.length > 0) {
        var slider = $("#beforeSlider").slider({
            min: 1,
            max: 11,
            range: "min",
            // disabled: disabled,
            value: select[0].selectedIndex + 1,
            stop: function (event, ui) {
                select[0].selectedIndex = ui.value - 1;
                changeBeforeAfterPercentage('beforechanceSlider');
            }
        });
        var ticks = $("#beforechanceSlider option[value!='']");
        $(".tick1").each(function (i) {
            $(this).remove();
        });
        $(ticks).each(function (i) {
            var tick = $('<div class="tick tick1 ui-widget-content">' + $(this).html() + '</div>').appendTo(slider);
            tick.css({
                left: (100 / (ticks.length) * i) + '%',
                width: (100 / (ticks.length)) + '%'
            });
        })
        select.hide();

        if ($('#IsLock').val() == 1) {

            $('#beforeSlider').slider('disable');
        }
    }

}


function prepareafterslider() {
    var select = $("#afterchanceSlider");
    if (select.length > 0) {
        var slider = $('#afterSlider').slider({
            min: 1,
            max: 11,
            range: "min",
            //disabled: disabled,
            value: select[0].selectedIndex + 1,
            stop: function (event, ui) {
                select[0].selectedIndex = ui.value - 1;
                changeBeforeAfterPercentage('afterchanceSlider');
            }
        });
        var ticks = $("#afterchanceSlider option[value!='']");
        $(".tick2").each(function (i) {
            $(this).remove();
        });
        $(ticks).each(function (i) {
            var tick = $('<div class="tick2 tick ui-widget-content">' + $(this).html() + '</div>').appendTo(slider);
            tick.css({
                left: (100 / ticks.length * i) + '%',
                width: (100 / ticks.length) + '%'
            });
        })
        select.hide();

        if ($('#IsLock').val() == 1) {
            $("#afterSlider").slider("disable");
        }
    }
}

