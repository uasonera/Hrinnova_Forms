var PageSize = 5;
var Page = 1;

var WaiverPage = 1;
var MyFeedbackPage = 1;
var MyWaiverPage = 1;
var MyPendingFeedbackPage = 1;
var MyPendingWaiverPage = 1;


$(document).ready(function () {

    //BindTrainingNameAutocomplete();
    BindDatePicker();

    $("#liFeedback").click(function (e) {
        $("#dvFeedback").css("display", "");
        $("#TRdvFeedback").css("display", "");
        $("#TRdvWaiver").css("display", "");
        //$(this).attr("class", "ui-state-default ui-corner-top ui-tabs-active ui-state-active");
        //$("#liWaiver").attr("class", "ui-state-default ui-corner-top ui-tabs ui-state");
        //$("#liMyFeedback").attr("class", "ui-state-default ui-corner-top ui-tabs ui-state");
        //$("#liMyWaiver").attr("class", "ui-state-default ui-corner-top ui-tabs ui-state");
        //$("#dvWaiver").css("display", "none");
        //$("#tBodyWaiverTraining").html('');
        //$("#dvMyFeedback").css("display", "none");
        //$("#trchildMyFeedbackTraining").css("display", "none");
        //$("#dvMyPendingFeedback").css("display", "none");
        //$("#trchildMyPendingFeedbackTraining").css("display", "none");
        //$("#dvMyWaiver").css("display", "none");
        //$("#trchildMyWaiverTraining").css("display", "none");
        //$("#dvMyPendingWaiver").css("display", "none");
        //$("#trchildMyPendingWaiverTraining").css("display", "none");
        //if ($("#tBodyFeedbackTraining").html() == '')
        //BindTraining(Page, 'feedback', 'Pending');
        var IsFilter = $('#btnSearch').attr('data-IsFilter');

        if ($("#ddlPendingOrGivenFilter option:selected").text() == 'Pending') {
            BindTraining(Page, 'feedback', 'Pending');
        }
        else if ($("#ddlPendingOrGivenFilter option:selected").text() == 'Submitted') {
            BindTraining(Page, 'feedback', 'Submitted');
        }
        else {
            BindTraining(Page, 'feedback', '');
        }

    });

    $("#liWaiver").click(function (e) {



        $("#dvWaiver").css("display", "");
        $("#TRdvFeedback").css("display", "");
        $("#TRdvWaiver").css("display", "");

        //$(this).attr("class", "ui-state-default ui-corner-top ui-tabs-active ui-state-active");
        //$("#liFeedback").attr("class", "ui-state-default ui-corner-top ui-tabs ui-state");
        //$("#liMyFeedback").attr("class", "ui-state-default ui-corner-top ui-tabs ui-state");
        //$("#liMyWaiver").attr("class", "ui-state-default ui-corner-top ui-tabs ui-state");
        //$("#dvFeedback").css("display", "none");
        //$("#tBodyFeedbackTraining").html('');
        //$("#dvMyFeedback").css("display", "none");
        //$("#trchildMyFeedbackTraining").css("display", "none");
        //$("#dvMyPendingFeedback").css("display", "none");
        //$("#trchildMyPendingFeedbackTraining").css("display", "none");
        //$("#dvMyWaiver").css("display", "none");
        //$("#trchildMyWaiverTraining").css("display", "none");
        //$("#dvMyPendingWaiver").css("display", "none");
        //$("#trchildMyPendingWaiverTraining").css("display", "none");

        //if ($("#tBodyWaiverTraining").html() == '')
        var IsFilter = $('#btnSearch').attr('data-IsFilter');

        if ($("#ddlPendingOrGivenFilter option:selected").text() == 'Pending') {
            BindTraining(WaiverPage, 'waiver', 'Pending');
        }
        else if ($("#ddlPendingOrGivenFilter option:selected").text() == 'Submitted') {
            BindTraining(WaiverPage, 'waiver', 'Submitted');
        }
        else {
            BindTraining(WaiverPage, 'waiver', '');
        }
        //BindTraining(WaiverPage, 'waiver');

    });

    $("#liMyFeedback").click(function (e) {

        $("#dvMyFeedback").css("display", "");
        $("#dvMyPendingFeedback").css("display", "");
        $("#trchildMyPendingFeedbackTraining").css("display", "none");
        $("#trchildMyWaiverTraining").css("display", "none");


        //$(this).attr("class", "ui-state-default ui-corner-top ui-tabs-active ui-state-active");
        //$("#liFeedback").attr("class", "ui-state-default ui-corner-top ui-tabs ui-state");
        //$("#liWaiver").attr("class", "ui-state-default ui-corner-top ui-tabs ui-state");
        //$("#liMyWaiver").attr("class", "ui-state-default ui-corner-top ui-tabs ui-state");
        //$("#tBodyFeedbackTraining").html('');
        //$("#dvWaiver").css("display", "none");
        //$("#tBodyWaiverTraining").html('');
        //$("#dvMyWaiver").css("display", "none");
        //$("#dvMyPendingWaiver").css("display", "none");
        //$("#trchildMyPendingWaiverTraining").css("display", "none");

        var tabId = $(this).attr('data-tabId');

        if (tabId == 'myFeedback') {

            //var IsFilter = $('#btnSearch').attr('data-IsFilter');

            //if (IsFilter == "true") {

            if ($("#ddlPendingOrGivenFilter option:selected").text() == 'Pending') {

                $('#dvMyFeedback').css('display', 'none');
                $('#dvMyPendingFeedback').css('display', '');
                $('#trchildMyFeedbackTraining').html('');
                $('#imgDownMyPendingFeedbackTraining').click();
                //if ($('#imgDownMyPendingFeedbackTraining').css('display') != 'none') {
                //    //MyPendingFeedbackPage = 1;
                //    $('#trchildMyPendingFeedbackTraining').css('display', 'none');
                //    BindMyPendingTraining(MyPendingFeedbackPage, 'feedback')
                //}
            }
            else if ($("#ddlPendingOrGivenFilter option:selected").text() == 'Submitted') {

                $('#dvMyPendingFeedback').css('display', 'none');
                $('#dvMyFeedback').css('display', '');
                $('#trchildMyPendingFeedbackTraining').html('');
                $('#imgDownMyFeedbackTraining').click();
                //if ($('#imgDownMyFeedbackTraining').css('display') != 'none') {
                //    //MyFeedbackPage = 1;
                //    $('#trchildMyFeedbackTraining').css('display', 'none');
                //    BindMyTraining(MyFeedbackPage, 'feedback');
                //}
            }
            else {
                $('#dvMyPendingFeedback').css('display', '');
                $('#dvMyFeedback').css('display', '');
                $('#imgDownMyPendingFeedbackTraining').click();
                $('#imgDownMyFeedbackTraining').click();
                //if ($('#imgDownMyPendingFeedbackTraining').css('display') != 'none') {
                //    //MyPendingFeedbackPage = 1;
                //    $('#trchildMyPendingFeedbackTraining').css('display', 'none');
                //    BindMyPendingTraining(MyPendingFeedbackPage, 'feedback')
                //}
                //if ($('#imgDownMyFeedbackTraining').css('display') != 'none') {
                //    //MyFeedbackPage = 1;
                //    $('#trchildMyFeedbackTraining').css('display', 'none');
                //    BindMyTraining(MyFeedbackPage, 'feedback');
                //}
            }
            //}
        }

        //if ($("#tBodyMyFeedbackTraining").html() == '')
        //    BindMyTraining(MyFeedbackPage, 'myFeedback');

    });

    $("#liMyWaiver").click(function (e) {
        $("#dvMyWaiver").css("display", "");
        $("#dvMyPendingWaiver").css("display", "");
        $("#trchildMyPendingWaiverTraining").css("display", "none");

        //$(this).attr("class", "ui-state-default ui-corner-top ui-tabs-active ui-state-active");
        //$("#liFeedback").attr("class", "ui-state-default ui-corner-top ui-tabs ui-state");
        //$("#liWaiver").attr("class", "ui-state-default ui-corner-top ui-tabs ui-state");
        //$("#liMyFeedback").attr("class", "ui-state-default ui-corner-top ui-tabs ui-state");
        //$("#dvFeedback").css("display", "none");
        //$("#tBodyFeedbackTraining").html('');
        //$("#dvWaiver").css("display", "none");
        //$("#tBodyWaiverTraining").html('');
        //$("#dvMyFeedback").css("display", "none");
        //$("#trchildMyFeedbackTraining").css("display", "none");
        //$("#dvMyPendingFeedback").css("display", "none");
        //$("#trchildMyPendingFeedbackTraining").css("display", "none");

        var tabId = $(this).attr('data-tabId');

        if (tabId == 'myWaiver') {

            //var IsFilter = $('#btnSearch').attr('data-IsFilter');

            if ($("#ddlPendingOrGivenFilter option:selected").text() == 'Pending') {

                $('#dvMyWaiver').css('display', 'none');
                $('#dvMyPendingWaiver').css('display', '');
                $('#trchildMyWaiverTraining').html('');
                $('#imgDownMyPendingWaiverTraining').click();
                //if ($('#imgDownMyPendingWaiverTraining').css('display') != 'none') {
                //    //MyPendingFeedbackPage = 1;
                //    $('#trchildMyPendingWaiverTraining').css('display', 'none');
                //    BindMyPendingTraining(MyPendingWaiverPage, 'waiver')
                //}
            }
            else if ($("#ddlPendingOrGivenFilter option:selected").text() == 'Submitted') {

                $('#dvMyPendingWaiver').css('display', 'none');
                $('#dvMyWaiver').css('display', '');
                $('#trchildMyPendingWaiverTraining').html('');
                $('#imgDownMyWaiverTraining').click();
                //if ($('#imgDownMyWaiverTraining').css('display') != 'none') {
                //    //MyFeedbackPage = 1;
                //    $('#trchildMyWaiverTraining').css('display', 'none');
                //    BindMyTraining(MyWaiverPage, 'waiver');
                //}
            }
            else {
                $('#dvMyPendingWaiver').css('display', '');
                $('#dvMyWaiver').css('display', '');
                $('#imgDownMyPendingWaiverTraining').click();
                $('#imgDownMyWaiverTraining').click();
                //if ($('#imgDownMyWaiverTraining').css('display') != 'none') {
                //    //MyWaiverPage = 1;
                //    $('#trchildMyWaiverTraining').css('display', 'none');
                //    BindMyTraining(MyWaiverPage, 'waiver');
                //}
                //if ($('#imgDownMyPendingWaiverTraining').css('display') != 'none') {
                //    //MyPendikngWaiverPage = 1;
                //    $('#trchildMyPendingWaiverTraining').css('display', 'none');
                //    BindMyPendingTraining(MyPendingWaiverPage, 'waiver')
                //}
            }
        }

        //if ($("#tBodyMyWaiverTraining").html() == '')
        //    BindMyTraining(MyWaiverPage, 'myWaiver');

    });

    $("#btnSearch").click(function () {
        $("#liMyFeedback").click();
        if ($("div").hasClass('download-btns')) {
            $(".download-btns").show()
        }
        $(this).attr('data-isClicked', 'true');
        var tabId = $('.active').attr('data-tabId');
        var PendingOrGiven = $("#ddlPendingOrGivenFilter option:selected").text();
        if (PendingOrGiven != 'Pending' && PendingOrGiven != 'Submitted') {
            PendingOrGiven = '';
        }
        $('#divTabs').css('display', '');
        $(this).attr('data-IsFilter', true);
        if (tabId == 'feedback') {
            Page = 1;
            $("#tBodyWaiverTraining").html('');
            $("#ulpagingWaiverTraining").html('');
            $("#TRdvFeedback").css("display", "");
            $("#TRdvWaiver").css("display", "");
            BindTraining(Page, 'feedback', PendingOrGiven);
        }
        else if (tabId == 'waiver') {
            WaiverPage = 1;
            $("#tBodyFeedbackTraining").html('');
            $("#ulpagingFeedbackTraining").html('');
            $("#TRdvFeedback").css("display", "");
            $("#TRdvWaiver").css("display", "");
            BindTraining(WaiverPage, 'waiver', PendingOrGiven);
        }
        else if (tabId == 'myFeedback') {
            if ($("#ddlPendingOrGivenFilter option:selected").text() == 'Pending') {
                $('#dvMyFeedback').css('display', 'none');
                $('#dvMyPendingFeedback').css('display', '');
                $('#trchildMyFeedbackTraining').html('');
                $('#imgDownMyPendingFeedbackTraining').click();
                //if ($('#imgDownMyPendingFeedbackTraining').css('display') != 'none') {
                //    MyPendingFeedbackPage = 1;
                //    $('#trchildMyPendingFeedbackTraining').css('display', 'none');
                //    BindMyPendingTraining(MyPendingFeedbackPage, 'feedback')
                //}
            }
            else if ($("#ddlPendingOrGivenFilter option:selected").text() == 'Submitted') {

                $('#dvMyPendingFeedback').css('display', 'none');
                $('#dvMyFeedback').css('display', '');
                $('#trchildMyPendingFeedbackTraining').html('');
                $('#imgDownMyFeedbackTraining').click();
                //if ($('#imgDownMyFeedbackTraining').css('display') != 'none') {
                //    MyFeedbackPage = 1;
                //    $('#trchildMyFeedbackTraining').css('display', 'none');
                //    BindMyTraining(MyFeedbackPage, 'feedback');
                //}
            }
            else {
                $('#dvMyPendingFeedback').css('display', '');
                $('#dvMyFeedback').css('display', '');
                $('#imgDownMyPendingFeedbackTraining').click();
                $('#imgDownMyFeedbackTraining').click();
                //if ($('#imgDownMyFeedbackTraining').css('display') != 'none') {
                //    MyFeedbackPage = 1;
                //    $('#trchildMyFeedbackTraining').css('display', 'none');
                //    BindMyTraining(MyFeedbackPage, 'feedback');
                //}
                //if ($('#imgDownMyPendingFeedbackTraining').css('display') != 'none') {
                //    MyPendingFeedbackPage = 1;
                //    $('#trchildMyPendingFeedbackTraining').css('display', 'none');
                //    BindMyPendingTraining(MyPendingFeedbackPage, 'feedback')
                //}
            }
        }
        else if (tabId == 'myWaiver') {

            if ($("#ddlPendingOrGivenFilter option:selected").text() == 'Pending') {

                $('#dvMyWaiver').css('display', 'none');
                $('#dvMyPendingWaiver').css('display', '');
                $('#trchildMyWaiverTraining').html('');
                $('#dvMyPendingWaiver').css('display', '');
                $('#imgDownMyPendingWaiverTraining').click();
                //if ($('#imgDownMyPendingWaiverTraining').css('display') != 'none') {
                //    MyPendingWaiverPage = 1;
                //    $('#trchildMyPendingWaiverTraining').css('display', 'none');
                //    BindMyPendingTraining(MyPendingWaiverPage, 'waiver')
                //}
            }
            else if ($("#ddlPendingOrGivenFilter option:selected").text() == 'Submitted') {

                $('#dvMyPendingWaiver').css('display', 'none');
                $('#dvMyWaiver').css('display', '');
                $('#trchildMyPendingWaiverTraining').html('');
                $('#dvMyWaiver').css('display', '');
                $('#imgDownMyWaiverTraining').click();
                //if ($('#imgDownMyWaiverTraining').css('display') != 'none') {
                //    MyWaiverPage = 1;
                //    $('#trchildMyWaiverTraining').css('display', 'none');
                //    BindMyTraining(MyWaiverPage, 'waiver');
                //}
            }
            else {
                $('#dvMyPendingWaiver').css('display', '');
                $('#dvMyWaiver').css('display', '');
                $('#imgDownMyPendingWaiverTraining').click();
                $('#imgDownMyWaiverTraining').click();
                //if ($('#imgDownMyWaiverTraining').css('display') != 'none') {
                //    MyWaiverPage = 1;
                //    $('#trchildMyWaiverTraining').css('display', 'none');
                //    BindMyTraining(MyWaiverPage, 'waiver');
                //}
                //if ($('#imgDownMyPendingWaiverTraining').css('display') != 'none') {
                //    MyPendingWaiverPage = 1;
                //    $('#trchildMyPendingWaiverTraining').css('display', 'none');
                //    BindMyPendingTraining(MyPendingWaiverPage, 'waiver')
                //}
            }
        }

    });

    //$("#btnSearch").click();


    $("#btnResetImparted").click(function () {
        // $("#txtStartDate").val("");
        //$("#txtEndDate").val("");
        //$('#divTabs').hide();
        //$("#dvFeedback").hide();
        //$("#dvWaiver").hide();
        BindDatePicker();
        $("#ddlTraining").val("").trigger("chosen:updated");
        $("#ddlPendingOrGivenFilter").val("").trigger("chosen:updated");
        $('input.ui-autocomplete-input').val('');
        $('#ui-datepicker-div').val("");
        $("#TRdvFeedback").css("display", "");
        $("#TRdvWaiver").css("display", "");
        $('#txtTrainingSearchId').val('');
        //$('#txtTrainingSearchName').val('');
        if ($("#btnSearch").attr('data-isClicked') == 'true') {
            //$("#btnSearch").click();
            $("#liMyFeedback").click();
        }
        $('#btnSearch').attr('data-IsFilter', false);

    });


    $(document).on('click', '.imgUpArrowButtonFeedbackTraining', function () {
        var ImageId = $(this).attr('id');
        var SplitImageId = ImageId.split("imgUpFeedbackTraining");
        var TrainingId = SplitImageId[1];

        $('.imgDownArrowButtonFeedbackTraining').each(function () {
            if (ImageId != $(this).attr('id') && $(this).css('display') != 'none') {
                $(this).click();
            }
        });

        $(".imgDownArrowButtonFeedbackTraining").css('display', 'none');
        $(".imgUpArrowButtonFeedbackTraining").css('display', 'block');

        $(".feedbackdetail").css('display', 'none');

        $("#imgUpFeedbackTraining" + TrainingId).css('display', 'none');
        $("#imgDownFeedbackTraining" + TrainingId).css('display', 'block');

        var FeedbackOrWaiver = 'feedback';
        var IsFilter = $('#btnSearch').attr('data-IsFilter');
        if (IsFilter == "true") {
            if ($("#ddlPendingOrGivenFilter option:selected").text() == 'Pending') {
                BindTrainerDetail(TrainingId, FeedbackOrWaiver, 'Pending');
                BindTraineeDetail(TrainingId, FeedbackOrWaiver, 'Pending');
            }
            else if ($("#ddlPendingOrGivenFilter option:selected").text() == 'Submitted') {
                BindTrainerDetail(TrainingId, FeedbackOrWaiver, 'Submitted');
                BindTraineeDetail(TrainingId, FeedbackOrWaiver, 'Submitted');
            }
            else {
                BindTrainerDetail(TrainingId, FeedbackOrWaiver, '');
                BindTraineeDetail(TrainingId, FeedbackOrWaiver, '');
            }
        }
        else {
            BindTrainerDetail(TrainingId, FeedbackOrWaiver, '');
            BindTraineeDetail(TrainingId, FeedbackOrWaiver, '');
        }

    });

    $(document).on('click', '.imgDownArrowButtonFeedbackTraining', function () {
        var ImageId = $(this).attr('id');
        var SplitImageId = ImageId.split("imgDownFeedbackTraining");
        var TrainingId = SplitImageId[1];
        $("#imgUpFeedbackTraining" + TrainingId).css('display', '');
        $("#imgDownFeedbackTraining" + TrainingId).css('display', 'none');
        $("#trchildFeedbackTraining_" + TrainingId).css('display', 'none');
        $(".feedbackdetail").css('display', 'none');
    });

    $(document).on('click', '.imgUpArrowButtonWaiverTraining', function () {
        var ImageId = $(this).attr('id');
        var SplitImageId = ImageId.split("imgUpWaiverTraining");
        var TrainingId = SplitImageId[1];

        $('.imgDownArrowButtonWaiverTraining').each(function () {
            if (ImageId != $(this).attr('id') && $(this).css('display') != 'none') {
                $(this).click();
            }
        });

        $(".imgUpArrowButtonWaiverTraining").css('display', 'block');
        $(".imgDownArrowButtonWaiverTraining").css('display', 'none');

        $("#imgUpWaiverTraining" + TrainingId).css('display', 'none');
        $("#imgDownWaiverTraining" + TrainingId).css('display', 'block');

        $(".waiverdetail").css('display', 'none');

        var FeedbackOrWaiver = 'waiver';
        var IsFilter = $('#btnSearch').attr('data-IsFilter');
        if (IsFilter == "true") {
            if ($("#ddlPendingOrGivenFilter option:selected").text() == 'Pending') {
                BindTrainerDetail(TrainingId, FeedbackOrWaiver, 'Pending');
                BindTraineeDetail(TrainingId, FeedbackOrWaiver, 'Pending');
            }
            else if ($("#ddlPendingOrGivenFilter option:selected").text() == 'Submitted') {
                BindTrainerDetail(TrainingId, FeedbackOrWaiver, 'Submitted');
                BindTraineeDetail(TrainingId, FeedbackOrWaiver, 'Submitted');
            }
            else {
                BindTrainerDetail(TrainingId, FeedbackOrWaiver, '');
                BindTraineeDetail(TrainingId, FeedbackOrWaiver, '');
            }
        }
        else {
            BindTrainerDetail(TrainingId, FeedbackOrWaiver, '');
            BindTraineeDetail(TrainingId, FeedbackOrWaiver, '');
        }

    });

    $(document).on('click', '.imgDownArrowButtonWaiverTraining', function () {
        var ImageId = $(this).attr('id');
        var SplitImageId = ImageId.split("imgDownWaiverTraining");
        var TrainingId = SplitImageId[1];
        $("#imgUpWaiverTraining" + TrainingId).css('display', '');
        $("#imgDownWaiverTraining" + TrainingId).css('display', 'none');

        $("#trchildWaiverTraining_" + TrainingId).css('display', 'none');

        $(".waiverdetail").css('display', 'none');
    });


    // bind feedback or waiver
    // bind feedback or waiver
    // bind feedback or waiver

    $(document).on('click', '.imgUpArrowButtonFeedbackTrainee', function () {

        var ImageId = $(this).attr('id');
        var SplitImageId = ImageId.split("_");
        var TrainingId = SplitImageId[1];
        var EmpId = SplitImageId[2];

        $('.imgDownArrowButtonFeedbackTrainee').each(function () {
            if (ImageId != $(this).attr('id') && $(this).css('display') != 'none') {
                $(this).click();
            }
        });

        $(".imgDownArrowButtonFeedbackTrainee").css('display', 'none');
        $(".imgUpArrowButtonFeedbackTrainee").css('display', 'block');


        $(".imgDownArrowButtonFeedbackTrainer").css('display', 'none');
        $(".imgUpArrowButtonFeedbackTrainer").css('display', 'block');

        $("#imgUpFeedbackTrainee_" + TrainingId + "_" + EmpId).css('display', 'none');
        $("#imgDownFeedbackTrainee_" + TrainingId + "_" + EmpId).css('display', 'block');
        $(".feedbacktrainer").css('display', 'none');

        $(".feedbacktrainee").css('display', 'none');

        var FeedbackOrWaiver = 'feedback';
        BindFeedbackOrWaiver(TrainingId, EmpId, FeedbackOrWaiver);

    });

    $(document).on('click', '.imgDownArrowButtonFeedbackTrainee', function () {
        var ImageId = $(this).attr('id');
        var SplitImageId = ImageId.split("_");
        var TrainingId = SplitImageId[1];
        var EmpId = SplitImageId[2];

        //console.log(TrainingId + " " + EmpId);

        $("#imgUpFeedbackTrainee_" + TrainingId + "_" + EmpId).css('display', '');
        $("#imgDownFeedbackTrainee_" + TrainingId + "_" + EmpId).css('display', 'none');
        $("#imgUpFeedbackTrainer_" + TrainingId + "_" + EmpId).css('display', '');
        $("#imgDownFeedbackTrainer_" + TrainingId + "_" + EmpId).css('display', 'none');
        $("#trchildFeedbackTrainee_" + TrainingId + "_" + EmpId).css('display', 'none');

        $(".feedbacktrainee").css('display', 'none');
    });
    //Triner
    $(document).on('click', '.imgUpArrowButtonFeedbackTrainer', function () {
        var ImageId = $(this).attr('id');
        var SplitImageId = ImageId.split("_");
        var TrainingId = SplitImageId[1];
        var EmpId = SplitImageId[2];

        //console.log(TrainingId + " " + EmpId);

        $(".imgDownArrowButtonFeedbackTrainer").css('display', 'none');
        $(".imgUpArrowButtonFeedbackTrainer").css('display', 'block');

        $(".imgDownArrowButtonFeedbackTrainee").css('display', 'none');
        $(".imgUpArrowButtonFeedbackTrainee").css('display', 'block');

        $("#imgUpFeedbackTrainer_" + TrainingId + "_" + EmpId).css('display', 'none');
        $("#imgDownFeedbackTrainer_" + TrainingId + "_" + EmpId).css('display', 'block');

        $(".feedbacktrainee").css('display', 'none');

        var FeedbackOrWaiver = 'feedback';
        BindFeedbackOrWaiverForTrainer(TrainingId, EmpId, FeedbackOrWaiver);
    });

    $(document).on('click', '.imgDownArrowButtonFeedbackTrainer', function () {

        var ImageId = $(this).attr('id');
        var SplitImageId = ImageId.split("_");
        var TrainingId = SplitImageId[1];
        var EmpId = SplitImageId[2];
        //console.log(TrainingId + " " + EmpId);
        $("#imgUpFeedbackTrainer_" + TrainingId + "_" + EmpId).css('display', '');
        $("#imgDownFeedbackTrainer_" + TrainingId + "_" + EmpId).css('display', 'none');
        $("#imgUpFeedbackTrainee_" + TrainingId + "_" + EmpId).css('display', '');
        $("#imgDownFeedbackTrainee_" + TrainingId + "_" + EmpId).css('display', 'none');
        $("#trchildFeedbackTrainer_" + TrainingId + "_" + EmpId).css('display', 'none');
        $(".feedbacktrainee").css('display', 'none');
    });

    $(document).on('click', '.imgUpArrowButtonWaiverTrainer', function () {
        var ImageId = $(this).attr('id');
        var SplitImageId = ImageId.split("_");
        var TrainingId = SplitImageId[1];
        var EmpId = SplitImageId[2];

        //console.log(TrainingId + " " + EmpId);

        $(".imgDownArrowButtonWaiverTrainer").css('display', 'none');
        $(".imgUpArrowButtonWaiverTrainer").css('display', 'block');

        $(".imgDownArrowButtonWaiverTrainee").css('display', 'none');
        $(".imgUpArrowButtonWaiverTrainee").css('display', 'block');

        $("#imgUpWaiverTrainer_" + TrainingId + "_" + EmpId).css('display', 'none');
        $("#imgDownWaiverTrainer_" + TrainingId + "_" + EmpId).css('display', 'block');

        $(".waivertrainer").css('display', 'none');

        var FeedbackOrWaiver = 'waiver';
        BindFeedbackOrWaiverForTrainer(TrainingId, EmpId, FeedbackOrWaiver);
    });

    $(document).on('click', '.imgDownArrowButtonWaiverTrainer', function () {
        var ImageId = $(this).attr('id');
        var SplitImageId = ImageId.split("_");
        var TrainingId = SplitImageId[1];
        var EmpId = SplitImageId[2];

        //console.log(TrainingId + " " + EmpId);

        $("#imgUpWaiverTrainer_" + TrainingId + "_" + EmpId).css('display', '');
        $("#imgDownWaiverTrainer_" + TrainingId + "_" + EmpId).css('display', 'none');
        $("#imgUpWaiverTrainee_" + TrainingId + "_" + EmpId).css('display', '');
        $("#imgDownWaiverTrainee_" + TrainingId + "_" + EmpId).css('display', 'none');
        $("#trchildWaiverTrainer_" + TrainingId + "_" + EmpId).css('display', 'none');
        $(".waivertrainer").css('display', 'none');
    });

    $(document).on('click', '.imgUpArrowButtonWaiverTrainee', function () {
        var ImageId = $(this).attr('id');
        var SplitImageId = ImageId.split("_");
        var TrainingId = SplitImageId[1];
        var EmpId = SplitImageId[2];

        //console.log(TrainingId + " " + EmpId);

        $('.imgDownArrowButtonWaiverTrainee').each(function () {
            if (ImageId != $(this).attr('id') && $(this).css('display') != 'none') {
                $(this).click();
            }
        });

        $(".imgUpArrowButtonWaiverTrainee").css('display', 'block');
        $(".imgDownArrowButtonWaiverTrainee").css('display', 'none');

        $(".imgDownArrowButtonWaiverTrainer").css('display', 'none');
        $(".imgUpArrowButtonWaiverTrainer").css('display', 'block');

        $("#imgUpWaiverTrainee_" + TrainingId + "_" + EmpId).css('display', 'none');
        $("#imgDownWaiverTrainee_" + TrainingId + "_" + EmpId).css('display', 'block');
        $(".waivertrainer").css('display', 'none');

        $(".waivertrainee").css('display', 'none');
        var FeedbackOrWaiver = 'waiver';
        BindFeedbackOrWaiver(TrainingId, EmpId, FeedbackOrWaiver);

    });

    $(document).on('click', '.imgDownArrowButtonWaiverTrainee', function () {
        var ImageId = $(this).attr('id');
        var SplitImageId = ImageId.split("_");
        var TrainingId = SplitImageId[1];
        var EmpId = SplitImageId[2];

        //console.log(TrainingId + " " + EmpId);

        $("#imgUpWaiverTrainee_" + TrainingId + "_" + EmpId).css('display', 'block');
        $("#imgDownWaiverTrainee_" + TrainingId + "_" + EmpId).css('display', 'none');
        $("#imgUpWaiverTrainer_" + TrainingId + "_" + EmpId).css('display', '');
        $("#imgDownWaiverTrainer_" + TrainingId + "_" + EmpId).css('display', 'none');
        $("#trchildWaiverTrainee_" + TrainingId + "_" + EmpId).css('display', 'none');
        $(".waivertrainee").css('display', 'none');
    });

    ///////
    $(document).on('click', '.imgUpArrowButtonWaiverTrainer', function () {
        var ImageId = $(this).attr('id');
        var SplitImageId = ImageId.split("_");
        var TrainingId = SplitImageId[1];
        var EmpId = SplitImageId[2];

        //console.log(TrainingId + " " + EmpId);

        $(".imgUpArrowButtonWaiverTrainer").css('display', 'block');
        $(".imgDownArrowButtonWaiverTrainer").css('display', 'none');

        $("#imgUpWaiverTrainer_" + TrainingId + "_" + EmpId).css('display', 'none');
        $("#imgDownWaiverTrainer_" + TrainingId + "_" + EmpId).css('display', 'block');
        $(".imgDownArrowButtonWaiverTrainee").css('display', 'none');
        $(".imgUpArrowButtonWaiverTrainee").css('display', 'block');
        $(".waivertrainee").css('display', 'none');
        var FeedbackOrWaiver = 'waiver';
        // BindFeedbackOrWaiver(TrainingId, EmpId, FeedbackOrWaiver);

    });

    $(document).on('click', '.imgDownArrowButtonWaiverTrainer', function () {
        var ImageId = $(this).attr('id');
        var SplitImageId = ImageId.split("_");
        var TrainingId = SplitImageId[1];
        var EmpId = SplitImageId[2];

        //console.log(TrainingId + " " + EmpId);

        $("#imgUpWaiverTrainer_" + TrainingId + "_" + EmpId).css('display', 'block');
        $("#imgDownWaiverTrainer_" + TrainingId + "_" + EmpId).css('display', 'none');
        $("#trchildWaiverTrainer_" + TrainingId + "_" + EmpId).css('display', 'none');
        $(".waivertrainee").css('display', 'none');
    });

    $(document).on('click', '[id^=alertLinkId_]', function () {

        var data = {
            TrainingId: $(this).attr('id').split('_')[1],
            EmpId: $(this).attr('id').split('_')[2],
            FeedbackOrWaiver: $(this).attr('data-feedbackOrWaiver')
        };

        $.ajax({
            url: '/TrainingImparted/SendAlertEmail',
            type: 'post',
            dataType: 'json',
            success: function (data) {
                if (data == 'success') {
                    toastr.success("Email Sent Successfully");
                }
                else {
                    toastr.error("Error while Sending Email");
                }
            },
            data: data
        });
    });

    BindAutoComplete();

    $("#txtStartDate").change(function () {
        FileDownloadUrl();
    });

    $("#txtEndDate").change(function () {
        FileDownloadUrl();
    });

    $(document).on('click', '[id^=GivePendingFeedback_]', function () {
        var previousPage = "/trainingimparted/trainingimparted";
        location.href = "http://" + location.host + "/TrainingFeedback/GetTrainingDetails?TrainingId=" + $(this).attr('id').split('_')[1] + "&PreviousPageUrl=" + previousPage;
    });

    $(document).on('click', '[id^=GivePendingWaiver_]', function () {
        var previousPage = "/trainingimparted/trainingimparted";
        location.href = "http://" + location.host + "/TrainingWaiver/GetTrainingWaiverDetails?TrainingId= " + $(this).attr('id').split('_')[1] + "&PreviousPageUrl=" + previousPage;
    });

    $(document).on('click', '[id^=imgUpMyFeedbackTraining_]', function () {
        //alert($(this).attr('id').split('_')[1]);
        var ImageId = $(this).attr('id');
        //$('[id^=imgDownMyFeedbackTraining_]').each(function () {
        //    if (ImageId != $(this).attr('id') && $(this).css('display') != 'none') {
        //        $(this).click();
        //    }
        //});
        $(this).css('display', 'none');
        var downArrowId = $(this).attr('id').replace("Up", "Down");
        $('#' + downArrowId).css('display', 'block');
        BindMyFeedbackOrWaiver($(this).attr('id').split('_')[1], 'feedback');
    });

    $(document).on('click', '[id^=imgDownMyFeedbackTraining_]', function () {
        //alert($(this).attr('id').split('_')[1]);
        $(this).css('display', 'none');
        var upArrowId = $(this).attr('id').replace("Down", "Up");
        $('#' + upArrowId).css('display', 'block');
        $('#trchildMyFeedbackTraining_' + $(this).attr('id').split('_')[1]).css('display', 'none');
    });

    $(document).on('click', '[id^=imgUpMyWaiverTraining_]', function () {
        //alert($(this).attr('id'));
        var ImageId = $(this).attr('id');
        //$('[id^=imgDownMyWaiverTraining_]').each(function () {
        //    if (ImageId != $(this).attr('id') && $(this).css('display') != 'none') {
        //        $(this).click();
        //    }
        //});

        $(this).css('display', 'none');
        var downArrowId = $(this).attr('id').replace("Up", "Down");
        $('#' + downArrowId).css('display', 'block');
        BindMyFeedbackOrWaiver($(this).attr('id').split('_')[1], 'waiver');
    });

    $(document).on('click', '[id^=imgDownMyWaiverTraining_]', function () {
        //alert($(this).attr('id'));
        $(this).css('display', 'none');
        var upArrowId = $(this).attr('id').replace("Down", "Up");
        $('#' + upArrowId).css('display', 'block');
        $('#trchildMyWaiverTraining_' + $(this).attr('id').split('_')[1]).css('display', 'none');
    });

    $("#imgUpMyFeedbackTraining").click(function () {
        $("#imgDownMyPendingFeedbackTraining").click();
        $("#imgDownMyFeedbackTraining").css('display', 'block');
        $("#imgUpMyFeedbackTraining").css('display', 'none');
        $('#trchildMyFeedbackTraining').html('');
        $("#ulpagingMyFeedbackTraining").html('');
        BindMyTraining(MyFeedbackPage, 'feedback');
    });

    $("#imgDownMyFeedbackTraining").click(function () {
        MyFeedbackPage = 1;
        $("#imgUpMyFeedbackTraining").css('display', 'block');
        $("#imgDownMyFeedbackTraining").css('display', 'none');
        $('#trchildMyFeedbackTraining').css('display', 'none');
        $("#ulpagingMyFeedbackTraining").html('');
        $('#trchildMyFeedbackTraining').html('');
    });

    $("#imgUpMyPendingFeedbackTraining").click(function () {
        $("#imgDownMyFeedbackTraining").click();
        $("#imgDownMyPendingFeedbackTraining").css('display', 'block');
        $("#imgUpMyPendingFeedbackTraining").css('display', 'none');
        $('#trchildMyPendingFeedbackTraining').css('display', 'none');
        $('#trchildMyPendingFeedbackTraining').html('');
        $("#ulpagingMyPendingFeedbackTraining").html('');
        BindMyPendingTraining(MyPendingFeedbackPage, 'feedback');
    });

    $("#imgDownMyPendingFeedbackTraining").click(function () {
        MyPendingFeedbackPage = 1;
        $("#imgUpMyPendingFeedbackTraining").css('display', 'block');
        $("#imgDownMyPendingFeedbackTraining").css('display', 'none');
        $('#trchildMyPendingFeedbackTraining').css('display', 'none');
        $('#trchildMyPendingFeedbackTraining').html('');
        $("#ulpagingMyPendingFeedbackTraining").html('');
    });

    $("#imgUpMyWaiverTraining").click(function () {
        $("#imgDownMyPendingWaiverTraining").click();
        $("#imgDownMyWaiverTraining").css('display', 'block');
        $("#imgUpMyWaiverTraining").css('display', 'none');
        $('#trchildMyWaiverTraining').css('display', 'none');
        $("#ulpagingMyWaiverTraining").html('');
        $('#trchildMyWaiverTraining').html('');
        BindMyTraining(MyWaiverPage, 'waiver');

    });

    $("#imgDownMyWaiverTraining").click(function () {
        MyWaiverPage = 1;
        $("#imgUpMyWaiverTraining").css('display', 'block');
        $("#imgDownMyWaiverTraining").css('display', 'none');
        $('#trchildMyWaiverTraining').css('display', 'none');
        $('#trchildMyWaiverTraining').html('');
        $("#ulpagingMyWaiverTraining").html('');
    });

    $("#imgUpMyPendingWaiverTraining").click(function () {
        $("#imgDownMyWaiverTraining").click();
        $("#imgDownMyPendingWaiverTraining").css('display', 'block');
        $("#imgUpMyPendingWaiverTraining").css('display', 'none');
        $('#trchildMyPendingWaiverTraining').css('display', 'none');
        $('#trchildMyPendingWaiverTraining').html('');
        $("#ulpagingMyPendingWaiverTraining").html('');
        BindMyPendingTraining(MyPendingWaiverPage, 'waiver');
    });

    $("#imgDownMyPendingWaiverTraining").click(function () {
        MyPendingWaiverPage = 1;
        $("#imgUpMyPendingWaiverTraining").css('display', 'block');
        $("#imgDownMyPendingWaiverTraining").css('display', 'none');
        $('#trchildMyPendingWaiverTraining').css('display', 'none');
        $('#trchildMyPendingWaiverTraining').html('');
        $("#ulpagingMyPendingWaiverTraining").html('');
    });
    $('#ddlPendingOrGivenFilter').change(function () {
        $('#btnSearch').attr('data-IsFilter', false);
    })
    $("#txtTrainingSearch").on('input', function () {
        $('#txtTrainingSearchId').val('');
    });

});

function searchinpageing(pagenumber, FeedbackOrWaiver, PendingOrGiven) {
    if (FeedbackOrWaiver == 'feedback') {
        Page = pagenumber;
        BindTraining(Page, FeedbackOrWaiver, PendingOrGiven);
    }
    else {
        WaiverPage = pagenumber;
        BindTraining(WaiverPage, FeedbackOrWaiver, PendingOrGiven);
    }
}

function BindTraining(pagenumber, FeedbackOrWaiver, PendingOrGiven) {
    var FromDate = $("#txtStartDate").val();
    var ToDate = $("#txtEndDate").val();
    var TrainingId = $("#ddlTraining").val();
    //var TrainingId = $("#txtTrainingSearchId").val();
    //var TrainingName = $("#txtTrainingSearch").val();
    var strerrorstring = '';
    if ($('#txtStartDate').val() != "") {
        if (ValidateDate($.trim(FromDate)) == false) {
            status = false;
            strerrorstring += 'Please enter valid training start date. \n';
        }
    }

    if ($('#txtEndDate').val() != "") {
        if (ValidateDate($.trim(ToDate)) == false) {
            status = false;
            strerrorstring += 'Please enter valid training end date. \n';
        }
    }

    if (strerrorstring != '') {
        alert(strerrorstring);
        return false;
    }

    //console.log($("#divTabs").length);
    $("#divTabs").css('display', 'block');
    $.ajax({
        url: "/TrainingImparted/GetSearchWiseTrainingDetail?FromDate=" + FromDate + "&ToDate=" + ToDate + "&TrainingId=" + TrainingId + "&FeedbackOrWaiver=" + FeedbackOrWaiver + "&Page=" + pagenumber + "&PageSize=" + PageSize + "&PendingOrGiven=" + PendingOrGiven,
        async: false
    })
    .done(function (result) {
        var data = result.result;
        if (data != undefined && data.length > 0) {

            //$("#btnExportToExcel").css('display', 'block');

            var TotalRows = parseInt(data[0].TotalRows);

            if (FeedbackOrWaiver == 'feedback') {
                $("#dvFeedback").css('display', '');
                $("#dvWaiver").css('display', 'none');

                $("#tBodyFeedbackTraining").html('');
                $("#ulpagingFeedbackTraining").html('');

            }
            else {

                $("#dvWaiver").css('display', '');
                $("#dvFeedback").css('display', 'none');

                $("#tBodyWaiverTraining").html('');
                $("#ulpagingWaiverTraining").html('');

            }

            for (var i = 0; i < data.length; i++) {
                var uparrow = "";
                var downarrow = "";
                var subgridid = '';
                if (FeedbackOrWaiver == 'feedback') {
                    uparrow = "<img alt='' src='../Images/collapse.png' id='imgUpFeedbackTraining" + data[i].TrainingId + "' class='imgUpArrowButtonFeedbackTraining' style='cursor:pointer;'/>"
                    downarrow = "<img alt='' src='../Images/expand.png' id='imgDownFeedbackTraining" + data[i].TrainingId + "' class='imgDownArrowButtonFeedbackTraining' style='display: none; cursor:pointer;' />"
                    $("#tBodyFeedbackTraining").append($("<tr id='FeedbackTraining" + data[i].TrainingId + "'></tr><tr class='feedbackdetail' style='display:none' id='trchildFeedbackTrainingTrainer_" + data[i].TrainingId + "'></tr><tr class='feedbackdetail' style='display:none' id='trchildFeedbackTraining_" + data[i].TrainingId + "'></tr>"));
                    subgridid = 'FeedbackTraining';
                }
                else {
                    uparrow = "<img alt='' src='../Images/collapse.png' id='imgUpWaiverTraining" + data[i].TrainingId + "' class='imgUpArrowButtonWaiverTraining' style='cursor:pointer;'/>"
                    downarrow = "<img alt='' src='../Images/expand.png' id='imgDownWaiverTraining" + data[i].TrainingId + "' class='imgDownArrowButtonWaiverTraining' style='display: none;cursor:pointer;' />"
                    $("#tBodyWaiverTraining").append($("<tr id='WaiverTraining" + data[i].TrainingId + "'></tr><tr class='waiverdetail' style='display:none' id='trchildWaiverTrainingTrainer_" + data[i].TrainingId + "'></tr><tr class='waiverdetail' style='display:none' id='trchildWaiverTraining_" + data[i].TrainingId + "'></tr>"));
                    subgridid = 'WaiverTraining';
                }

                $('#' + subgridid + data[i].TrainingId).append("<td style='width:2%;'>" + uparrow + downarrow + "</td>");
                $('#' + subgridid + data[i].TrainingId).append("<td style='width:98%;'>" + data[i].TrainingName + '</td>');
                //$('#' + subgridid + data[i].TrainingId).append('<td>' + data[i].StartDate + '</td>');
                //$('#' + subgridid + data[i].TrainingId).append('<td>' + data[i].EndDate + '</td>');

                //if (data[i].EvaluationPeriod != '0')
                //    $('#' + subgridid + data[i].TrainingId).append('<td>' + data[i].EvaluationPeriod + ' month</td>');
                //else
                //    $('#' + subgridid + data[i].TrainingId).append('<td>Not define</td>');

                //$('#' + subgridid + data[i].TrainingId).append('<td>' + data[i].trainers + '</td>');
                $('#' + subgridid + data[i].TrainingId).append('<td></td>');


                var subgrid = "<td colspan='6'><table class='table common-table'><tbody id='tBodyDetailchild" + subgridid + "_" + data[i].TrainingId + "'></tbody></table></td>";
                var Trainersubgrid = "<td colspan='6'><table class='table common-table'><tbody id='tBodyDetailchildTrainer" + subgridid + "_" + data[i].TrainingId + "'></tbody></table></td>";
                if (FeedbackOrWaiver == 'feedback') {
                    $('#trchildFeedbackTrainingTrainer_' + data[i].TrainingId).append((Trainersubgrid));
                    $('#trchildFeedbackTraining_' + data[i].TrainingId).append((subgrid));
                }
                else {
                    $('#trchildWaiverTrainingTrainer_' + data[i].TrainingId).append((Trainersubgrid));
                    $('#trchildWaiverTraining_' + data[i].TrainingId).append((subgrid));
                }
            }

            //console.log(TotalRows);
            var totalpageing = TotalRows / PageSize;
            totalpageing = Math.ceil(totalpageing);
            //console.log(totalpageing);
            if (totalpageing != 1) {
                for (var i = 1; i <= totalpageing; i++) {
                    if (pagenumber == i) {
                        if (FeedbackOrWaiver == 'feedback') {
                            $("#ulpagingFeedbackTraining").append("<li class='active'><a style=\"cursor: pointer\">" + i + "</a></li>");
                        }
                        else {
                            $("#ulpagingWaiverTraining").append("<li class='active'><a style=\"cursor: pointer\">" + i + "</a></li>");
                        }
                    }
                    else {
                        if (FeedbackOrWaiver == 'feedback')
                            $("#ulpagingFeedbackTraining").append("<li style=\"cursor: pointer\" onclick=searchinpageing('" + i + "','" + FeedbackOrWaiver + "','" + PendingOrGiven + "') ><a>" + i + "</a></li>");
                        else
                            $("#ulpagingWaiverTraining").append("<li style=\"cursor: pointer\" onclick=searchinpageing('" + i + "','" + FeedbackOrWaiver + "','" + PendingOrGiven + "') ><a>" + i + "</a></li>");
                    }
                }
            }
        }
        else {
            if (FeedbackOrWaiver == 'feedback') {
                $("#ulpagingFeedbackTraining").html('');
                $("#ulpagingWaiverTraining").html('');
                $("#TRdvFeedback").css("display", "none");
                $("#tBodyFeedbackTraining").html("<tr><td colspan='5' >No records found.</td></tr>");
            }
            else {
                $("#ulpagingWaiverTraining").html('');
                $("#ulpagingFeedbackTraining").html('');
                $("#TRdvWaiver").css("display", "none");
                $("#tBodyWaiverTraining").html("<tr><td colspan='5' >No records found.</td></tr>");

            }
        }
    });
}

function BindTraineeDetail(TrainingId, FeedbackOrWaiver, PendingOrGiven) {

    var gridid = '';
    var subgridid = '';

    if (FeedbackOrWaiver == 'feedback') {
        gridid = 'FeedbackTraining';
        subgridid = 'FeedbackTrainee_' + TrainingId + '_';
        $("#trchildFeedbackTraining_" + TrainingId).css('display', '');
        $("#tBodyDetailchildFeedbackTraining_" + TrainingId).html('');
    } else {
        gridid = 'WaiverTraining';
        subgridid = 'WaiverTrainee_' + TrainingId + '_';
        $("#trchildWaiverTraining_" + TrainingId).css('display', '');
        $("#tBodyDetailchildWaiverTraining_" + TrainingId).html('');
    }


    $.ajax({
        url: "/TrainingImparted/GetTraineesForTraining?TrainingId=" + TrainingId + "&FeedbackOrWaiver=" + FeedbackOrWaiver + "&PendingOrGiven=" + PendingOrGiven,
        async: false
    })
    .done(function (result) {
        var data = result.result;
        if (data != undefined && data.length > 0) {

            $("#tBodyDetailchild" + gridid + "_" + TrainingId).append("<tr style='' ><th style='width: 10%;text-align:left;' colspan='3'>Trainee(s)</th></tr>");
            for (var i = 0; i < data.length; i++) {

                if (FeedbackOrWaiver == 'feedback') {
                    $("#tBodyDetailchild" + gridid + "_" + TrainingId).append($("<tr style='' id='" + subgridid + data[i].EmpID + "'></tr><tr style='width: 100%;display: none' class='feedbacktrainee' id='trchild" + subgridid + data[i].EmpID + "'></tr>"));
                }
                else {
                    $("#tBodyDetailchild" + gridid + "_" + TrainingId).append($("<tr style='' id='" + subgridid + data[i].EmpID + "'></tr><tr style='width: 100%;display: none' class='waivertrainee'  id='trchild" + subgridid + data[i].EmpID + "'></tr>"));
                }


                var uparrow = "";
                var downarrow = "";
                var linkId = "alertLinkId_";

                if (FeedbackOrWaiver == 'feedback') {
                    uparrow = "<img alt='' src='../Images/collapse.png' id='imgUp" + subgridid + data[i].EmpID + "' class='imgUpArrowButtonFeedbackTrainee' style='cursor:pointer;'/>"
                    downarrow = "<img alt='' src='../Images/expand.png' id='imgDown" + subgridid + data[i].EmpID + "' class='imgDownArrowButtonFeedbackTrainee' style='display: none;cursor:pointer;' />"

                }
                else {
                    uparrow = "<img alt='' src='../Images/collapse.png' id='imgUp" + subgridid + data[i].EmpID + "' class='imgUpArrowButtonWaiverTrainee' style='cursor:pointer;'/>"
                    downarrow = "<img alt='' src='../Images/expand.png' id='imgDown" + subgridid + data[i].EmpID + "' class='imgDownArrowButtonWaiverTrainee' style='display: none ; cursor:pointer;' />"
                }

                if (data[i].isGiven) {
                    $('#' + subgridid + data[i].EmpID).append("<td style='width: 2%' class='text-center'>" + uparrow + downarrow + "</td>");
                    $('#' + subgridid + data[i].EmpID).append("<td colspan='2' style='width: 98%'>" + data[i].EmpName + '</td>');
                }
                else {
                    $('#' + subgridid + data[i].EmpID).append("<td style='width: 2%'></td>");
                    $('#' + subgridid + data[i].EmpID).append("<td style='width: 90%'>" + data[i].EmpName + '</td>');
                }

                

                if (FeedbackOrWaiver == 'feedback') {
                    var subgrid = "<td colspan='3'><table class='table common-table ' style=''><tbody id='tBodyDetailchild" + subgridid + data[i].EmpID + "'></tbody></table></td>";
                    $("#trchild" + subgridid + data[i].EmpID).append((subgrid));
                    if (!data[i].isGiven) {
                        $('#' + subgridid + data[i].EmpID).append('<td class=\"text-center\"><a class=\"btn btn-sm btn-primary\" href="#" id=' + linkId.concat(TrainingId, "_", data[i].EmpID) + ' runat="server" data-EmpId=' + data[i].EmpID + ' data-feedbackOrWaiver=' + FeedbackOrWaiver + '><i class=\"fa fa-bell\"></i> Feedback Alert</a></td>');
                    }
                }
                else {

                    var subgrid = "<td colspan='3'><table class='table common-table ' style=''><tbody  id='tBodyDetailchild" + subgridid + data[i].EmpID + "'></tbody></table></td>";
                    $("#trchild" + subgridid + data[i].EmpID).append((subgrid));
                    if (!data[i].isGiven) {
                        $('#' + subgridid + data[i].EmpID).append('<td class=\"text-center\"><a class=\"btn btn-sm btn-purple\" href="#" id=' + linkId.concat(TrainingId, "_", data[i].EmpID) + ' runat="server" data-EmpId=' + data[i].EmpID + ' data-feedbackOrWaiver=' + FeedbackOrWaiver + '><i class=\"fa fa-bell\"></i> Waiver Alert</a></td>');
                    }
                }
            }
        }
        else {
            if (FeedbackOrWaiver == 'feedback')
                $("#tBodyDetailchild" + gridid + "_" + TrainingId).html('<tr><td>No trainees have feedback</tr></td>');
            else
                $("#tBodyDetailchild" + gridid + "_" + TrainingId).html('<tr><td>No trainees have waiver</tr></td>');
        }
    });

}

function BindFeedbackOrWaiver(TrainingId, EmpId, FeedbackOrWaiver) {
    //console.log(FeedbackOrWaiver);
    var gridid = '';
    var subgridid = '';

    if (FeedbackOrWaiver == 'feedback') {

        subgridid = 'tBodyDetailchildFeedbackTrainee_' + TrainingId + '_' + EmpId;

        $("#trchildFeedbackTrainee_" + TrainingId + "_" + EmpId).show();
        $("#tBodyDetailchildFeedbackTrainee_" + TrainingId + "_" + EmpId).html('');

    } else {

        subgridid = 'tBodyDetailchildWaiverTrainee_' + TrainingId + '_' + EmpId;

        $("#trchildWaiverTrainee_" + TrainingId + "_" + EmpId).show();
        $("#tBodyDetailchildWaiverTrainee_" + TrainingId + "_" + EmpId).html('');
    }

    $.ajax({
        url: "/TrainingImparted/GetWaiverOrFeedbackForTrainee?EmpId=" + EmpId + "&TrainingId=" + TrainingId + "&FeedbackOrWaiver=" + FeedbackOrWaiver,
        async: false
    })
    .done(function (result) {
        var data = result.result;
        //console.log(data);
        if (data != undefined && data.length > 0) {

            if (FeedbackOrWaiver == 'feedback') {
                $("#" + subgridid).append("<tr style=''><th style='width:50%'>Question</th><th style='width:50%'>Answer</th></tr>");
            }
            else {
                $("#" + subgridid).append("<tr style=''><th style='width:20%'>Waiver date</th><th style='width:80%'>Reason</th></tr>");
            }
            for (var i = 0; i < data.length; i++) {

                if (FeedbackOrWaiver == 'feedback') {

                    $("#" + subgridid).append($("<tr style=''></tr>").attr('id', "Feedback_" + subgridid + "_" + i));
                    $('#Feedback_' + subgridid + "_" + i).append("<td style='width: 40%'>" + data[i].Question + "</td>");
                    if (data[i].AnsType == 'Text') {
                        $('#Feedback_' + subgridid + "_" + i).append("<td style='width: 40%'>" + data[i].Ans + "</td>");
                    }
                    else {
                        var answer = '';
                        switch (data[i].Ans) {
                            case "1":
                                answer = "very poor";
                                break;
                            case "2":
                                answer = "poor";
                                break;
                            case "3":
                                answer = "below average";
                                break;
                            case "4":
                                answer = "average";
                                break;
                            case "5":
                                answer = "above average";
                                break;
                            case "6":
                                answer = "good";
                                break;
                            case "7":
                                answer = "very good";
                                break;
                            case "8":
                                answer = "excellent";
                                break;
                            case "9":
                                answer = "out-standing";
                                break;
                            case "10":
                                answer = "exceptional";
                                break;
                            default:
                                answer = "";
                                break;
                        }
                        $('#Feedback_' + subgridid + "_" + i).append("<td style='width: 40%'>" + answer + "</td>");
                    }

                }
                else {

                    $("#" + subgridid).append($("<tr style=''></tr>").attr('id', "Waiver_" + subgridid + "_" + i));

                    var waiverDate = new Date(parseInt(data[i].WaiverDate.replace("/Date(", "").replace(")/", ""), 10));
                    var displayDate = waiverDate.getMonth() + 1 + '/' + waiverDate.getDate() + '/' + waiverDate.getFullYear();

                    $('#Waiver_' + subgridid + "_" + i).append("<td style='width:20%'>" + displayDate + "</td>");
                    $('#Waiver_' + subgridid + "_" + i).append("<td style='width:80%'>" + data[i].WaiverReason + "</td>");
                }
            }
        }
    });


}

/*validate date function*/
function ValidateDate(date) {
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (!date_regex.test(date)) {
        return false
    }
    return true
}

function BindAutoComplete() {

    $(function () {
        //$("#ddlTraining").combobox();
        $("#toggle").click(function () {
            $("#ddlTraining").toggle();
        });
    });
}

function SetTextAndValue(event, ui) {
    $("#ddlTraining").val(ui.item.label);
    //$("#hdnWorkEvent").val(ui.item.value);
}

function FileDownloadUrl() {

    ///ProjmanReport/TrainingImparted/ExportToExcel?FromDate=&ToDate=&TrainingId=

    var FromDate = "";
    var ToDate = "";
    var TrainingId = "";

    if ($('#txtStartDate').val() != "") {
        if (ValidateDate($.trim($('#txtStartDate').val())) == true) {
            FromDate = $('#txtStartDate').val();
        }
    }

    if ($('#txtEndDate').val() != "") {
        if (ValidateDate($.trim($('#txtEndDate').val())) == true) {
            ToDate = $('#txtEndDate').val();
        }
    }

    TrainingId = $("#ddlTraining").val();

    var downloadurl = "/TrainingImparted/ExportToExcel?FromDate=" + FromDate + "&ToDate=" + ToDate + "&TrainingId=" + TrainingId;

    $("#downloadFeedback").attr("href", downloadurl + "&downloadType=feedback");

    $("#downloadWaiver").attr("href", downloadurl + "&downloadType=waiver");


}
function BindTrainerDetail(TrainingId, FeedbackOrWaiver, PendingOrGiven) {
    var gridid = '';
    var subgridid = '';

    if (FeedbackOrWaiver == 'feedback') {
        gridid = 'FeedbackTraining';
        subgridid = 'FeedbackTrainer_' + TrainingId + '_';
        $("#trchildFeedbackTrainingTrainer_" + TrainingId).css('display', '');
        $("#tBodyDetailchildFeedbackTraining_" + TrainingId).html('');
        $("#tBodyDetailchildTrainerFeedbackTraining_" + TrainingId).html('');
    } else {
        gridid = 'WaiverTraining';
        subgridid = 'WaiverTrainer_' + TrainingId + '_';
        $("#trchildWaiverTrainingTrainer_" + TrainingId).css('display', '');
        $("#tBodyDetailchildWaiverTraining_" + TrainingId).html('');
        $("#tBodyDetailchildTrainerWaiverTraining_" + TrainingId).html('');
    }

    $.ajax({
        url: "/TrainingImparted/GetTrainerForTraining?TrainingId=" + TrainingId + "&FeedbackOrWaiver=" + FeedbackOrWaiver + "&PendingOrGiven=" + PendingOrGiven,
        async: false
    })
    .done(function (result) {
        var data = result.result;
        if (data != undefined && data.length > 0) {

            $("#tBodyDetailchildTrainer" + gridid + "_" + TrainingId).append("<tr style='' ><th style='width: 10%;text-align:left;' colspan='3'>Trainer(s)</th></tr>");

            for (var i = 0; i < data.length; i++) {

                if (FeedbackOrWaiver == 'feedback') {
                    $("#tBodyDetailchildTrainer" + gridid + "_" + TrainingId).append($("<tr style='' id='" + subgridid + data[i].EmpID + "'></tr><tr style='width: 100%;display: none' class='feedbacktrainer' id='trchild" + subgridid + data[i].EmpID + "'></tr>"));
                }
                else {
                    $("#tBodyDetailchildTrainer" + gridid + "_" + TrainingId).append($("<tr style='' id='" + subgridid + data[i].EmpID + "'></tr><tr style='width: 100%;display: none' class='waivertrainer'  id='trchild" + subgridid + data[i].EmpID + "'></tr>"));
                }


                var uparrow = "";
                var downarrow = "";
                var linkId = "alertLinkId_";

                if (FeedbackOrWaiver == 'feedback') {
                    uparrow = "<img alt='' src='../Images/collapse.png' id='imgUp" + subgridid + data[i].EmpID + "' class='imgUpArrowButtonFeedbackTrainer' style='cursor:pointer;'/>"
                    downarrow = "<img alt='' src='../Images/expand.png' id='imgDown" + subgridid + data[i].EmpID + "' class='imgDownArrowButtonFeedbackTrainer' style='display: none;cursor:pointer;' />"
                }
                else {
                    uparrow = "<img alt='' src='../Images/collapse.png' id='imgUp" + subgridid + data[i].EmpID + "' class='imgUpArrowButtonWaiverTrainer' style='cursor:pointer;'/>"
                    downarrow = "<img alt='' src='../Images/expand.png' id='imgDown" + subgridid + data[i].EmpID + "' class='imgDownArrowButtonWaiverTrainer' style='display: none;cursor:pointer;' />"
                }

                if (data[i].isGiven) {
                    $('#' + subgridid + data[i].EmpID).append("<td style='width: 2%' class='text-center'>" + uparrow + downarrow + "</td>");
                    $('#' + subgridid + data[i].EmpID).append("<td class='colspan=2' style='width: 98%'>" + data[i].EmpName + '</td>');
                }
                else {
                    $('#' + subgridid + data[i].EmpID).append("<td style='width: 2%'></td>");
                    $('#' + subgridid + data[i].EmpID).append("<td style='width: 90%'>" + data[i].EmpName + '</td>');
                }
                

                if (FeedbackOrWaiver == 'feedback') {
                    var subgrid = "<td colspan='3'><table class='table common-table ' style=''><tbody id='tBodyDetailchildTrainer" + subgridid + data[i].EmpID + "'></tbody></table></td>";
                    $("#trchild" + subgridid + data[i].EmpID).append((subgrid));
                    if (!data[i].isGiven) {
                        $('#' + subgridid + data[i].EmpID).append('<td class=\"text-center\"><a class=\"btn btn-sm btn-primary\" href="#" id=' + linkId.concat(TrainingId, "_", data[i].EmpID) + ' runat="server" data-EmpId=' + data[i].EmpID + ' data-feedbackOrWaiver=' + FeedbackOrWaiver + '><i class=\"fa fa-bell\"></i> Feedback Alert</a></td>');
                    }
                }
                else {
                    var subgrid = "<td colspan='3'><table class='table common-table ' style=''><tbody  id='tBodyDetailchildTrainer" + subgridid + data[i].EmpID + "'></tbody></table></td>";
                    $("#trchild" + subgridid + data[i].EmpID).append((subgrid));
                    if (!data[i].isGiven) {
                        $('#' + subgridid + data[i].EmpID).append('<td class=\"text-center\"><a class=\"btn btn-sm btn-purple\" href="#" id=' + linkId.concat(TrainingId, "_", data[i].EmpID) + ' runat="server" data-EmpId=' + data[i].EmpID + ' data-feedbackOrWaiver=' + FeedbackOrWaiver + '><i class=\"fa fa-bell\"></i> Waiver Alert</a></td>');
                    }
                }
            }
        }
        else {
            if (FeedbackOrWaiver == 'feedback')
                $("#tBodyDetailchildTrainer" + gridid + "_" + TrainingId).html('<tr><td>No trainers have feedback</tr></td>');
            else
                $("#tBodyDetailchildTrainer" + gridid + "_" + TrainingId).html('<tr><td>No trainers have waiver</tr></td>');
        }
    });
}
function BindFeedbackOrWaiverForTrainer(TrainingId, EmpId, FeedbackOrWaiver) {
    //console.log(FeedbackOrWaiver);
    var gridid = '';
    var subgridid = '';

    if (FeedbackOrWaiver == 'feedback') {

        subgridid = 'tBodyDetailchildTrainerFeedbackTrainer_' + TrainingId + '_' + EmpId;

        $("#trchildFeedbackTrainer_" + TrainingId + "_" + EmpId).show();
        $("#tBodyDetailchildTrainerFeedbackTrainer_" + TrainingId + "_" + EmpId).html('');
    } else {

        subgridid = 'tBodyDetailchildTrainerWaiverTrainer_' + TrainingId + '_' + EmpId;

        $("#trchildWaiverTrainer_" + TrainingId + "_" + EmpId).show();
        $("#tBodyDetailchildTrainerWaiverTrainer_" + TrainingId + "_" + EmpId).html('');
    }
    $.ajax({
        url: "/TrainingImparted/GetWaiverOrFeedbackForTrainee?EmpId=" + EmpId + "&TrainingId=" + TrainingId + "&FeedbackOrWaiver=" + FeedbackOrWaiver,
        async: false
    })
    .done(function (result) {
        var data = result.result;
        //console.log(data);

        if (data != undefined && data.length > 0) {

            if (FeedbackOrWaiver == 'feedback') {
                $("#" + subgridid).append("<tr style=''><th style='width:50%'>Question</th><th style='width:50%'>Answer</th></tr>");
            }
            else {
                $("#" + subgridid).append("<tr style=''><th style='width:20%'>Waiver date</th><th style='width:80%'>Reason</th></tr>");
            }
            for (var i = 0; i < data.length; i++) {

                if (FeedbackOrWaiver == 'feedback') {

                    $("#" + subgridid).append($("<tr style=''></tr>").attr('id', "Feedback_" + subgridid + "_" + i));
                    $('#Feedback_' + subgridid + "_" + i).append("<td style='width: 50%'>" + data[i].Question + "</td>");
                    if (data[i].AnsType == 'Text') {
                        $('#Feedback_' + subgridid + "_" + i).append("<td>" + data[i].Ans + "</td>");
                    }
                    else {
                        var answer = '';
                        switch (data[i].Ans) {
                            case "1":
                                answer = "very poor";
                                break;
                            case "2":
                                answer = "poor";
                                break;
                            case "3":
                                answer = "below average";
                                break;
                            case "4":
                                answer = "average";
                                break;
                            case "5":
                                answer = "above average";
                                break;
                            case "6":
                                answer = "good";
                                break;
                            case "7":
                                answer = "very good";
                                break;
                            case "8":
                                answer = "excellent";
                                break;
                            case "9":
                                answer = "out-standing";
                                break;
                            case "10":
                                answer = "exceptional";
                                break;
                            default:
                                answer = "";
                                break;
                        }
                        $('#Feedback_' + subgridid + "_" + i).append("<td>" + answer + "</td>");
                    }

                }
                else {

                    $("#" + subgridid).append($("<tr style=''></tr>").attr('id', "Waiver_" + subgridid + "_" + i));

                    var waiverDate = new Date(parseInt(data[i].WaiverDate.replace("/Date(", "").replace(")/", ""), 10));
                    var displayDate = waiverDate.getMonth() + 1 + '/' + waiverDate.getDate() + '/' + waiverDate.getFullYear();

                    $('#Waiver_' + subgridid + "_" + i).append("<td style='width:20%'>" + displayDate + "</td>");
                    $('#Waiver_' + subgridid + "_" + i).append("<td style='width:80%'>" + data[i].WaiverReason + "</td>");
                }
            }
        }
    });
}

function searchinpageingForMyTraining(pagenumber, FeedbackOrWaiver) {
    if (FeedbackOrWaiver == 'feedback') {
        MyFeedbackPage = pagenumber;
        BindMyTraining(MyFeedbackPage, FeedbackOrWaiver);
    }
    else {
        MyWaiverPage = pagenumber;
        BindMyTraining(MyWaiverPage, FeedbackOrWaiver);
    }
}

function searchinpageingForMyPendingTraining(pagenumber, FeedbackOrWaiver) {

    if (FeedbackOrWaiver == 'feedback') {
        MyPendingFeedbackPage = pagenumber;
        BindMyPendingTraining(MyPendingFeedbackPage, FeedbackOrWaiver);
    }
    else {
        MyPendingWaiverPage = pagenumber;
        BindMyPendingTraining(MyPendingWaiverPage, FeedbackOrWaiver);
    }
}

function BindMyTraining(pagenumber, FeedbackOrWaiver) {
    var FromDate = $("#txtStartDate").val();
    var ToDate = $("#txtEndDate").val();
    var TrainingId = $("#ddlTraining").val();
    // var TrainingName = $("#txtTrainingSearch").val();
    var myPage = 0;
    var strerrorstring = '';
    if ($('#txtStartDate').val() != "") {
        if (ValidateDate($.trim(FromDate)) == false) {
            status = false;
            strerrorstring += 'Please enter valid training start date. \n';
        }
    }
    if ($('#txtEndDate').val() != "") {
        if (ValidateDate($.trim(ToDate)) == false) {
            status = false;
            strerrorstring += 'Please enter valid training end date. \n';
        }
    }
    if (strerrorstring != '') {
        alert(strerrorstring);
        return false;
    }

    $("#divTabs").css('display', 'block');

    var gridid = '';
    var subgridid = '';

    if (FeedbackOrWaiver == 'feedback') {
        gridid = 'MyFeedbackTrainingGrid';
        subgridid = 'MyFeedbackTraining_';
        $("#trchildMyFeedbackTraining").css('display', '');
        $("#trchildMyFeedbackTraining").html('');
        $("#trchildMyFeedbackTraining").html("<td colspan='6'><table class='table common-table'><tbody id='tBodyDetailchildMyFeedback'></tbody></table><div class=\"text-right\"><div class=\"pagination-container\"><ul class=\"pagination  no-margin\" id=\"ulpagingMyFeedbackTraining\"></ul></div></div></td>");
        $("#ulpagingMyFeedbackTraining").html('');
        myPage = MyFeedbackPage;
    } else {
        gridid = 'MyWaiverTrainingGrid';
        subgridid = 'MyWaiverTraining_';
        $("#trchildMyWaiverTraining").css('display', '');
        $("#trchildMyWaiverTraining").html('');
        $("#trchildMyWaiverTraining").html("<td colspan='6'><table class='table common-table'><tbody id='tBodyDetailchildMyWaiver'></tbody></table><div class=\"text-right\"><div class=\"pagination-container\"><ul class=\"pagination no-margin\" id=\"ulpagingMyWaiverTraining\" ></ul></div></div></td>");
        $("#ulpagingMyWaiverTraining").html('');
        myPage = MyWaiverPage;
    }

    $.ajax({
        url: "/TrainingImparted/GetSearchWiseTrainingDetailForEmployee?FromDate=" + FromDate + "&ToDate=" + ToDate + "&TrainingId=" + TrainingId + "&FeedbackOrWaiver=" + FeedbackOrWaiver + "&ForPending=false" + "&Page=" + pagenumber + "&PageSize=" + PageSize,
        async: false
    })
    .done(function (result) {
        var data = result.result;

        if (data != undefined && data.length > 0) {

            //var TotalRows = parseInt(data.length);

            var TotalRows = parseInt(data[0].TotalRows);

            if (FeedbackOrWaiver == 'feedback') {

                $("#tBodyDetailchildMyFeedback").append("<tr style='' ><th style='width: 10%;text-align:left;' colspan='2'>Training(s)</th></tr>");
            }
            else {
                $("#tBodyDetailchildMyWaiver").append("<tr style='' ><th style='width: 10%;text-align:left;' colspan='2'>Training(s)</th></tr>");
            }

            for (var i = 0; i < data.length; i++) {
                if (FeedbackOrWaiver == 'feedback') {
                    $("#tBodyDetailchildMyFeedback").append($("<tr style='' id='" + subgridid + data[i].TrainingId + "'></tr><tr style='width: 100%;display: none' class='feedbacktrainee' id='trchild" + subgridid + data[i].TrainingId + "'></tr>"));
                }
                else {
                    $("#tBodyDetailchildMyWaiver").append($("<tr style='' id='" + subgridid + data[i].TrainingId + "'></tr><tr style='width: 100%;display: none' class='waivertrainee'  id='trchild" + subgridid + data[i].TrainingId + "'></tr>"));
                }

                var uparrow = "";
                var downarrow = "";

                if (FeedbackOrWaiver == 'feedback') {
                    uparrow = "<img alt='' src='../Images/collapse.png' id='imgUp" + subgridid + data[i].TrainingId + "' class='imgUpArrowButtonMyFeedbackTraining' style='cursor:pointer;'/>"
                    downarrow = "<img alt='' src='../Images/expand.png' id='imgDown" + subgridid + data[i].TrainingId + "' class='imgDownArrowButtonMyFeedbackTraining' style='display: none;cursor:pointer;' />"

                }
                else {
                    uparrow = "<img alt='' src='../Images/collapse.png' id='imgUp" + subgridid + data[i].TrainingId + "' class='imgUpArrowButtonMyWaiverTraining' style='cursor:pointer;'/>"
                    downarrow = "<img alt='' src='../Images/expand.png' id='imgDown" + subgridid + data[i].TrainingId + "' class='imgDownArrowButtonMyWaiverTraining' style='display: none;cursor:pointer;' />"
                }

                $('#' + subgridid + data[i].TrainingId).append("<td style='width: 2%'>" + uparrow + downarrow + "</td>");
                $('#' + subgridid + data[i].TrainingId).append("<td style='width:98%;'>" + data[i].TrainingName + '</td>');


                if (FeedbackOrWaiver == 'feedback') {
                    var subgrid = "<td colspan='2'><table class='table common-table ' style=''><tbody id='tBodyDetailchild" + subgridid + data[i].TrainingId + "'></tbody></table></td>";
                    $("#trchild" + subgridid + data[i].TrainingId).append((subgrid));
                }
                else {
                    var subgrid = "<td colspan='2'><table class='table common-table ' style=''><tbody  id='tBodyDetailchild" + subgridid + data[i].TrainingId + "'></tbody></table></td>";
                    $("#trchild" + subgridid + data[i].TrainingId).append((subgrid));
                }
            }


            var totalpageing = TotalRows / PageSize;
            totalpageing = Math.ceil(totalpageing);
            if (totalpageing != 1) {
                for (var i = 1; i <= totalpageing; i++) {
                    if (myPage == i) {
                        if (FeedbackOrWaiver == 'feedback') {
                            $("#ulpagingMyFeedbackTraining").append("<li class='active'><a style=\"cursor: pointer\">" + i + "</a></li>");
                        }
                        else {
                            $("#ulpagingMyWaiverTraining").append("<li class='active'><a style=\"cursor: pointer\">" + i + "</a></li>");
                        }
                    }
                    else {
                        if (FeedbackOrWaiver == 'feedback')
                            $("#ulpagingMyFeedbackTraining").append("<li onclick=searchinpageingForMyTraining('" + i + "','" + FeedbackOrWaiver + "') ><a style=\"cursor: pointer\">" + i + "</a></li>");
                        else
                            $("#ulpagingMyWaiverTraining").append("<li onclick=searchinpageingForMyTraining('" + i + "','" + FeedbackOrWaiver + "') ><a style=\"cursor: pointer\">" + i + "</a></li>");
                    }
                }
            }
        }
        else {

            if (FeedbackOrWaiver == 'feedback')
                $("#tBodyDetailchildMyFeedback").html('<tr><td>No feedbacks</tr></td>');
            else
                $("#tBodyDetailchildMyWaiver").html('<tr><td>No waivers</tr></td>');
        }
    })

    //$.getJSON("/TrainingImparted/GetSearchWiseTrainingDetailForEmployee?FromDate=" + FromDate + "&ToDate=" + ToDate + "&TrainingId=" + TrainingId + "&FeedbackOrWaiver=" + FeedbackOrWaiver + "&ForPending=false" + "&Page=" + pagenumber + "&PageSize=" + PageSize, function (result) {
    //});
}

function BindMyPendingTraining(pagenumber, FeedbackOrWaiver) {

    var FromDate = $("#txtStartDate").val();
    var ToDate = $("#txtEndDate").val();
    var TrainingId = $("#ddlTraining").val();
    //var TrainingId = $("#txtTrainingSearchId").val();
    //var TrainingName = $("#txtTrainingSearch").val();
    var pendingPage = 0;
    var strerrorstring = '';
    if ($('#txtStartDate').val() != "") {
        if (ValidateDate($.trim(FromDate)) == false) {
            status = false;
            strerrorstring += 'Please enter valid training start date. \n';
        }
    }
    if ($('#txtEndDate').val() != "") {
        if (ValidateDate($.trim(ToDate)) == false) {
            status = false;
            strerrorstring += 'Please enter valid training end date. \n';
        }
    }
    if (strerrorstring != '') {
        alert(strerrorstring);
        return false;
    }

    $("#divTabs").css('display', 'block');

    var gridid = '';
    var subgridid = '';

    if (FeedbackOrWaiver == 'feedback') {
        gridid = 'MyPendingFeedbackTraining';
        subgridid = 'MyFeedbackTraining_';
        $("#trchildMyPendingFeedbackTraining").css('display', '');
        $("#trchildMyPendingFeedbackTraining").html('');
        $("#trchildMyPendingFeedbackTraining").append("<td colspan='6'><table class='table common-table'><tbody id='tBodyDetailchildPendingFeedback'></tbody></table><div class=\"text-right\"><div class=\"pagination-container\"><ul class=\"pagination no-margin\" id=\"ulpagingMyPendingFeedbackTraining\"></ul></div></div></td>");
        $("#ulpagingMyPendingFeedbackTraining").html('');
        pendingPage = MyPendingFeedbackPage;
    } else {
        gridid = 'MyPendingWaiverTraining';
        subgridid = 'MyPendingWaiverTraining_';
        $("#trchildMyPendingWaiverTraining").css('display', '');
        $("#trchildMyPendingWaiverTraining").html('');
        $("#trchildMyPendingWaiverTraining").append("<td colspan='6'><table class='table common-table'><tbody id='tBodyDetailchildPendingWaiver'></tbody></table><div class=\"text-right\"><div class=\"pagination-container\"><ul class=\"pagination no-margin\" id=\"ulpagingMyPendingWaiverTraining\" ></ul></div></div></td>");
        $("#ulpagingMyPendingWaiverTraining").html('');
        pendingPage = MyPendingWaiverPage;
    }
    $.ajax({
        url: "/TrainingImparted/GetSearchWiseTrainingDetailForEmployee?FromDate=" + FromDate + "&ToDate=" + ToDate + "&TrainingId=" + TrainingId + "&FeedbackOrWaiver=" + FeedbackOrWaiver + "&ForPending=true" + "&Page=" + pagenumber + "&PageSize=" + PageSize,
        async: false
    })
    .done(function (result) {
        var data = result.result;
        //var TotalRows = parseInt(data.length);

        if (data != undefined && data.length > 0) {

            var TotalRows = parseInt(data[0].TotalRows);

            if (FeedbackOrWaiver == 'feedback') {

                $("#tBodyDetailchildPendingFeedback").append("<tr style='' ><th style='width: 10%;text-align:left;' colspan='3'>Training Name</th></tr>");
            }
            else {
                $("#tBodyDetailchildPendingWaiver").append("<tr style='' ><th style='width: 10%;text-align:left;' colspan='3'>Training Name</th></tr>");
            }

            for (var i = 0; i < data.length; i++) {

                if (FeedbackOrWaiver == 'feedback') {
                    var id = "GivePendingFeedback_";
                    $("#tBodyDetailchildPendingFeedback").append($("<tr style=''></tr>").attr('id', "MyPendingFeedback_" + data[i].TrainingId));

                    $('#MyPendingFeedback_' + data[i].TrainingId).append("<td style='width: 50%'>" + data[i].TrainingName + "</td>");
                    $('#MyPendingFeedback_' + data[i].TrainingId).append("<td style='width: 50%' align=\"right\"><a style=\"float: right;cursor: pointer;\" id= " + id.concat(data[i].TrainingId) + ">Give Feedback</a></td>");
                }
                else {
                    var id = "GivePendingWaiver_";
                    //$("#tBodyDetailchildPendingWaiver").append("<tr style='' ><th style='width: 10%;text-align:left;' colspan='2'>Training Name</th></tr>");
                    $("#tBodyDetailchildPendingWaiver").append($("<tr style=''></tr>").attr('id', "MyPendingWaiver_" + data[i].TrainingId));

                    $('#MyPendingWaiver_' + data[i].TrainingId).append("<td style='width: 50%'>" + data[i].TrainingName + "</td>");
                    $('#MyPendingWaiver_' + data[i].TrainingId).append("<td style='width: 50%'><a style=\"float: right;cursor: pointer;\" id= " + id.concat(data[i].TrainingId) + ">Give Waiver</a></td>");
                }
            }

            //console.log(TotalRows);
            var totalpageing = TotalRows / PageSize;
            totalpageing = Math.ceil(totalpageing);

            //console.log(totalpageing);
            if (totalpageing != 1) {
                for (var i = 1; i <= totalpageing; i++) {
                    if (pendingPage == i) {
                        if (FeedbackOrWaiver == 'feedback') {
                            $("#ulpagingMyPendingFeedbackTraining").append("<li class='active'><a style=\"cursor: pointer\">" + i + "</a></li>");
                        }
                        else {
                            $("#ulpagingMyPendingWaiverTraining").append("<li class='active'><a style=\"cursor: pointer\">" + i + "</a></li>");
                        }
                    }
                    else {
                        if (FeedbackOrWaiver == 'feedback')
                            $("#ulpagingMyPendingFeedbackTraining").append("<li onclick=searchinpageingForMyPendingTraining('" + i + "','" + FeedbackOrWaiver + "') ><a style=\"cursor: pointer\">" + i + "</a></li>");
                        else
                            $("#ulpagingMyPendingWaiverTraining").append("<li onclick=searchinpageingForMyPendingTraining('" + i + "','" + FeedbackOrWaiver + "') ><a style=\"cursor: pointer\">" + i + "</a></li>");
                    }
                }
            }
        }
        else {
            if (FeedbackOrWaiver == 'feedback')
                $("#tBodyDetailchildPendingFeedback").html('<tr><td>No pending feedbacks</tr></td>');
            else
                $("#tBodyDetailchildPendingWaiver").html('<tr><td>No pending feedbacks</tr></td>');
        }
    })
    //$.getJSON("/TrainingImparted/GetSearchWiseTrainingDetailForEmployee?TrainingId=" + TrainingId + "&FeedbackOrWaiver=" + FeedbackOrWaiver, function (result) {
    //$.getJSON("/TrainingImparted/GetSearchWiseTrainingDetailForEmployee?FromDate=" + FromDate + "&ToDate=" + ToDate + "&TrainingId=" + TrainingId + "&FeedbackOrWaiver=" + FeedbackOrWaiver + "&ForPending=true" + "&Page=" + pagenumber + "&PageSize=" + PageSize, function (result) {

    //});
}

function BindMyFeedbackOrWaiver(TrainingId, FeedbackOrWaiver) {

    //console.log(FeedbackOrWaiver);
    var gridid = '';
    var subgridid = '';

    if (FeedbackOrWaiver == 'feedback') {

        subgridid = 'tBodyDetailchildMyFeedbackTraining_' + TrainingId;

        $("#trchildMyFeedbackTraining_" + TrainingId).show();
        $("#tBodyDetailchildMyFeedbackTraining_" + TrainingId).html('');
    } else {

        subgridid = 'tBodyDetailchildMyWaiverTraining_' + TrainingId;

        $("#trchildMyWaiverTraining_" + TrainingId).show();
        $("#tBodyDetailchildMyWaiverTraining_" + TrainingId).html('');
    }
    $.getJSON("/TrainingImparted/GetWaiverOrFeedbackForTrainee?EmpId=" + 0 + "&TrainingId=" + TrainingId + "&FeedbackOrWaiver=" + FeedbackOrWaiver, function (result) {
        var data = result.result;
        //console.log(data);
        if (data != undefined && data.length > 0) {

            if (FeedbackOrWaiver == 'feedback') {
                $("#" + subgridid).append("<tr style=''><th style='width:50%'>Question</th><th style='width:50%'>Answer</th></tr>");
            }
            else {
                $("#" + subgridid).append("<tr style=''><th style='width:20%'>Waiver date</th><th style='width:80%'>Reason</th></tr>");
            }
            for (var i = 0; i < data.length; i++) {

                if (FeedbackOrWaiver == 'feedback') {

                    $("#" + subgridid).append($("<tr style=''></tr>").attr('id', "Feedback_" + subgridid + "_" + i));
                    $('#Feedback_' + subgridid + "_" + i).append("<td style='width: 50%'>" + data[i].Question + "</td>");
                    if (data[i].AnsType == 'Text')
                        $('#Feedback_' + subgridid + "_" + i).append("<td>" + data[i].Ans + "</td>");
                    else {
                        var answer = '';
                        switch (data[i].Ans) {
                            case "1":
                                answer = "very poor";
                                break;
                            case "2":
                                answer = "poor";
                                break;
                            case "3":
                                answer = "below average";
                                break;
                            case "4":
                                answer = "average";
                                break;
                            case "5":
                                answer = "above average";
                                break;
                            case "6":
                                answer = "good";
                                break;
                            case "7":
                                answer = "very good";
                                break;
                            case "8":
                                answer = "excellent";
                                break;
                            case "9":
                                answer = "out-standing";
                                break;
                            case "10":
                                answer = "exceptional";
                                break;
                            default:
                                answer = "";
                                break;
                        }
                        $('#Feedback_' + subgridid + "_" + i).append("<td>" + answer + "</td>");
                    }

                }
                else {

                    $("#" + subgridid).append($("<tr style=''></tr>").attr('id', "Waiver_" + subgridid + "_" + i));

                    var waiverDate = new Date(parseInt(data[i].WaiverDate.replace("/Date(", "").replace(")/", ""), 10));
                    var displayDate = waiverDate.getMonth() + 1 + '/' + waiverDate.getDate() + '/' + waiverDate.getFullYear();

                    $('#Waiver_' + subgridid + "_" + i).append("<td style='width:20%'>" + displayDate + "</td>");
                    $('#Waiver_' + subgridid + "_" + i).append("<td style='width:80%'>" + data[i].WaiverReason + "</td>");
                }
            }
        }
    });

}

function BindTrainingNameAutocomplete() {
    var trainingNames = [];

    $.ajax({
        url: '/TrainingImparted/GetTrainingNames',
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

function BindDatePicker() {
    var date = new Date();
    date.setMonth(date.getMonth() - 1);
    $("#txtStartDate").datepicker({
        changeMonth: true,
        //buttonImage: '/Images/datepicker.gif',
        //buttonImageOnly: true,
        changeMonth: true,
        changeYear: true,
        showOn: 'focus',
        //onClose: function (selectedDate) {
        //    $("#txtStartDate").datepicker("option", "minDate", selectedDate);
        //}
    }).datepicker("setDate", date);

    $("#txtEndDate").datepicker({
        defaultDate: "+1w",
        changeMonth: true,

        // buttonImage: '/Images/datepicker.gif',
        //buttonImageOnly: true,
        changeMonth: true,
        changeYear: true,
        showOn: 'focus',
        //onClose: function (selectedDate) {
        //    $("#txtEndDate").datepicker("option", "minDate", selectedDate);
        //}
    }).datepicker("setDate", new Date());


    $('#startdate').click(function () {
        $("#txtStartDate").focus();
    });

    $('#enddate').click(function () {
        $("#txtEndDate").focus();
    });
    $("#txtStartDate").change(function () {

        var startDate = $("#txtStartDate").val();

        if (ValidateDate(startDate)) {
            $("#txtEndDate").datepicker("option", "minDate", startDate);
        }
    });
}

/*validate date function*/
function ValidateDate(date) {
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (!date_regex.test(date)) {
        return false
    }
    return true
}
