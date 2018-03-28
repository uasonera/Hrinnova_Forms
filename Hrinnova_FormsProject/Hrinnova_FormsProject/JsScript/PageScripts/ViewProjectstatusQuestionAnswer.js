

function pageLoad() {


    
    var ProjectStatusReportId = 0;
    var ProjectStatusReport;
    var SucessMessageReportSubmited = "Report Submited Sucessfully";
    var SucessMessageAnswerSubmited = "Answer Submited Sucessfully";
    var FailMessageAnswerSubmit = "Found Error while saving record";
    var FailMessageReportSubmit = "Found Error while saving record";
    var AnswerRequiredMessage = "Answer Required ";
    var ProjectStatusRequiredMessage = "Please select project status";
    var NoRecordMessage = "No Record Found";
    var ReportApprovalMessage = "Report has been approved and locked";

    var ApproveReportBlock = $("#dvSubmitReport");
    var ProjectStatusZone = $("#dvProjectStatus");


    var Template = "<div id='dvQuestionAnswerBlock{ID}' class='question-answer-block' > "
                + "<div id='dvQuestionBlock{ID}' class='question-block'> "
                + "<input type='hidden' class='QuestionHiddenField' id ='hdnquestion' value='{ProjectStatusQuestionId}' />"
                + "<input type='hidden' class='AnswerhiddenField' id ='hdnAnswer' value='{ProjectStatusAnswerID}' />"
                + "<span id='spnQuestion' >{QuestionText}</span>"
                + "</div>"
                + "<br/>"
                + "<div id='dvAnswerBlock' class='answer-block '> "
                + " <textarea id='txtAnswer' maxlength='500' class='textarea {EditMode}  ' cols='20' rows='2'>{AnswerText}</textarea> "
                + " </div> "
                + "<br/>"
                + " <div id='dvSubmitAnswer' class='EditMode submit-answer   ' > "
                + "  <span class='bl-button' id='spEditAnwser'>  <input id='EditAnwser' type='submit' class='  ButtonStyles  savebtn Invisible ' value='Edit' title= 'Submit Answer' /> </span> "
                + " <span class='bl-button' id='spSubmitAnswer'> <input id='SubmitAnswer' type='submit' class=' ButtonStyles  savebtn '  title='Edit Answer' value='Submit Your Answer'  /> </span>   "
                + " </div> "
                + " </div>"
    GetProjectStatusZone();
    SetProjectStatusReportIdFromQueryString();
    GetProjectStatusReport(ProjectStatusReportId);

    function GetProjectStatusZone() {

        $.ajax({
            type: "POST",
            url: "../Admin/ViewProjectstatusQuestionAnswer.aspx/GetProjectStatusZone",
            data: "{}",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (jsonresult) {
                var lstProjectStatusZone = jQuery.parseJSON(jsonresult.d);

                $("#ddlProjectStatusZone").append($("<option></option>").val('0').html('Select Project Status'));
                for (var index = 0; index < lstProjectStatusZone.length; index++) {
                    $("#ddlProjectStatusZone").append($("<option></option>").val(lstProjectStatusZone[index].ProjectStatusZoneID).html(lstProjectStatusZone[index].DisplayText));
                }

            },
            error: function (jsonresult) {
                alert(jsonresult.responseText);
            }
        });
    }


    function GetProjectStatusReport(ProjectStatusReportId) {


        $.ajax({
            type: "POST",
            url: "../Admin/ViewProjectstatusQuestionAnswer.aspx/GetProjectStatusReport",

            data: '{"ProjectStatusReportId":"' + ProjectStatusReportId + '"}',

            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (jsonresult) {
                ProjectStatusReport = jQuery.parseJSON(jsonresult.d);
                var EmbededBody = "";
                $("#dvMain").empty();

                var RecordCount = ProjectStatusReport.lstProjectStatusQuestionanswer == null ? 0 : ProjectStatusReport.lstProjectStatusQuestionanswer.length;

                if (RecordCount > 0) {

                    $("#spProjectName").text(ProjectStatusReport.ProjectName);
                    SelectProjectstatus(ProjectStatusReport.ProjectStatusZoneID);

                    ToogleVisibleState(true, ApproveReportBlock);
                    ToogleVisibleState(true, ProjectStatusZone);


                    for (var i = 0; i < ProjectStatusReport.lstProjectStatusQuestionanswer.length; i++) {


                        var FormatedHtml = Template.replace('{ID}', i);
                        FormatedHtml = FormatedHtml.replace('{ProjectStatusQuestionId}', ProjectStatusReport.lstProjectStatusQuestionanswer[i].ProjectStatusQuestionId);

                        FormatedHtml = FormatedHtml.replace('{ProjectStatusAnswerID}', ProjectStatusReport.lstProjectStatusQuestionanswer[i].ProjectStatusAnswerID == undefined ? 0 : ProjectStatusReport.lstProjectStatusQuestionanswer[i].ProjectStatusAnswerID);

                        FormatedHtml = FormatedHtml.replace('{QuestionText}', ProjectStatusReport.lstProjectStatusQuestionanswer[i].QuestionText);

                        FormatedHtml = FormatedHtml.replace('{AnswerText}', ProjectStatusReport.lstProjectStatusQuestionanswer[i].ProjectStatusAnswerID == 0 ? '' : ProjectStatusReport.lstProjectStatusQuestionanswer[i].AnswerText);

                        if (ProjectStatusReport.IsLocked == true) {

                            FormatedHtml = FormatedHtml.replace('{EditMode}', 'DisableAnswerAnswerBlock');
                        }
                        else {
                            FormatedHtml = FormatedHtml.replace('{EditMode}', '');
                        }


                        EmbededBody = EmbededBody + FormatedHtml;
                    }
                    $("#dvMain").append($(EmbededBody));
                    SetPageMode();

                }
                else {

                    ProjectStatusReport = null;
                    ToogleVisibleState(false, ApproveReportBlock);
                    ToogleVisibleState(false, ProjectStatusZone);


                    ShowMessage(false, NoRecordMessage);
                }

            },
            error: function (jsonresult) {
                alert(jsonresult.responseText);
            }
        });
    }




    $(document).on("click", "#SubmitAnswer", function (event) {
        event.preventDefault();
        ClearValidation();
        ClearMessage();

        var ObjAnswer = $($($($(this).parent()).parent()).parent()).find(".textarea");

        if (TextAreaValidation(ObjAnswer, AnswerRequiredMessage, "") == false) {
            return;
        }
        ClearMessage();
        var SubmitAnswerObj = $(this);
        var ProjectID = ProjectStatusReport.ProjectId;
        var ProjectStatusAnswerObj = $($($($(this).parent()).parent()).parent()).find(".AnswerhiddenField");
        var ProjectStatusQuestionId = $($($($($(this).parent()).parent()).parent()).find(".QuestionHiddenField")).val();

        var ProjectStatusAnswerID = $($($($($(this).parent()).parent()).parent()).find(".AnswerhiddenField")).val();

        var EditObj = $($($(this).parent()).parent()).find("#EditAnwser");

        var AnswerText = $($($($($(this).parent()).parent()).parent()).find(".textarea")).val();

        var ProjectStatusZoneId = "0";
        var DTO = '{' + '"ProjectID":"' + ProjectID + '",' + '"ProjectStatusQuestionId":"' + ProjectStatusQuestionId + '",' + '"AnswerText":"' + AnswerText + '",' + '"ProjectStatusZoneId":"' + ProjectStatusZoneId + '","ProjectStatusAnswerID":"' + ProjectStatusAnswerID + '"' + '}';

        $.ajax({
            type: "POST",
            url: "../Admin/ViewProjectstatusQuestionAnswer.aspx/SubmitNewAnswer",


            data: DTO,

            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (jsonresult) {

                var status = jQuery.parseJSON(jsonresult.d);

                if (status != '0') {

                    $(ProjectStatusAnswerObj).val(status);
                    $(EditObj).removeClass('Invisible');

                    ShowMessage(true, SucessMessageAnswerSubmited);
                    ToogleActiveState(false, ObjAnswer);
                    ToogleActiveState(false, SubmitAnswerObj);

                    for (var i = 0; i < ProjectStatusReport.lstProjectStatusQuestionanswer.length; i++) {
                        if (ProjectStatusQuestionId == ProjectStatusReport.lstProjectStatusQuestionanswer[i].ProjectStatusQuestionId) {
                            ProjectStatusReport.lstProjectStatusQuestionanswer[i].ProjectStatusAnswerID = status;
                            ProjectStatusReport.lstProjectStatusQuestionanswer[i].AnswerText = AnswerText;

                        }

                    }
                }
                else {

                    ShowMessage(false, FailMessageAnswerSubmit);
                }

            },
            error: function (jsonresult) {
                SetScrollPostionToDisplayMessage();
                $("#lblMessage").text(jsonresult.d);
            }
        });

    });



    $(document).on("click", "#SubmitReport", function (event) {
        event.preventDefault();
        ClearValidation();
        ClearMessage();

        var statusObject = $("#ddlProjectStatusZone");

        if (DropDownValidation(statusObject, ProjectStatusRequiredMessage, "") == false) {
            return;
        }

        // ProjectStatusReport.ProjectId = $("#ddlProject option:selected").val();
        ProjectStatusReport.ProjectStatusZoneID = $("#ddlProjectStatusZone option:selected").val();
        ProjectStatusReport.lstProjectStatusQuestionanswer = ProjectStatusReport.lstProjectStatusQuestionanswer;
        var DTO = "{ ProjectStatusReport:" + JSON.stringify(ProjectStatusReport) + "}";




        $.ajax({
            type: "POST",
            url: "../Admin/ViewProjectstatusQuestionAnswer.aspx/SubmitReport",
            data: DTO,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (jsonresult) {

                var result = jQuery.parseJSON(jsonresult.d);
                ProjectStatusReport.ProjectStatusReportId = result;
                SetScrollPostionToDisplayMessage();
                if (result != '0') {

                    ShowMessage(true, SucessMessageReportSubmited);

                }
                else {

                    ShowMessage(true, FailMessageReportSubmit);
                }


            },
            error: function (jsonresult) {
                SetScrollPostionToDisplayMessage();
                $("#lblMessage").text(jsonresult.d);
            }
        });

    });



    $(document).on("click", "#EditAnwser", function (event) {
        event.preventDefault();
        ClearMessage();
        var ObjAnswer = $($($($(this).parent()).parent()).parent()).find(".textarea");
        var objSubmitButton = $($(this).closest('div')).find("#SubmitAnswer")
        ToogleActiveState(true, ObjAnswer);
        ToogleActiveState(true, objSubmitButton);

    });

    function ToogleActiveState(active, handler) {

        if (active == true) {
            $(handler).removeAttr('disabled');

            $(handler).addClass('EnableAnswerAnswerBlock');
            $(handler).removeClass('DisableAnswerAnswerBlock');
        }
        else {
            $(handler).attr("disabled", "disabled")
            $(handler).addClass('DisableAnswerAnswerBlock');
            $(handler).removeClass('EnableAnswerAnswerBlock');
        }

    }
    function ToogleVisibleState(IsVisible, handler) {

        if (IsVisible == true) {
            $(handler).removeClass('Invisible');

        }
        else {

            $(handler).addClass('Invisible');

        }

    }

    function TextAreaValidation(Control, ReqiiredMessage, ValidationMessage) {


        if ($(Control).val().trim() == '') {
            $("#ulVs").append("<li>" + ReqiiredMessage + "</li>");
            SetScrollPostionToDisplayMessage();

            return false;
        }
        return true

    }

    function DropDownValidation(Control, ReqiiredMessage, ValidationMessage) {
        if ($(Control).val() == 0) {

            $("#ulVs").append("<li>" + ReqiiredMessage + "</li>");
            SetScrollPostionToDisplayMessage();

            return false;
        }
        else {
            return true;
        }

    }
    function ClearMessage() {
        $("#lblMessage").empty();
        $("#lblMessage").removeClass('alert alert-warning');
        $("#lblMessage").removeClass('alert alert-success');
    }

    function ClearValidation() {
        $("#ulVs").empty();

    }

    function ShowMessage(Issucess, Message) {
        if (Issucess) {

            $("#lblMessage").removeClass('alert alert-warning');
            $("#lblMessage").addClass('alert alert-success');
            $("#lblMessage").text(Message);

        }
        else {
            $("#lblMessage").addClass('alert alert-warning');
            $("#lblMessage").removeClass('alert alert-success');
            $("#lblMessage").text(Message);
        }

        


    }

    function SelectProjectstatus(ProjectStatusId) {

        $("#ddlProjectStatusZone").val(ProjectStatusId)

    }

    function SetPageMode() {

        var ProjectStatus = $("#ddlProjectStatusZone");
        if (ProjectStatusReport.IsLocked == true) {

            $(".EditMode").addClass('Invisible');

            ToogleVisibleState(false, ApproveReportBlock);
            ToogleActiveState(false, ProjectStatus);


        }
        else {

            ToogleVisibleState(true, ApproveReportBlock);
            ToogleActiveState(true, ProjectStatus);
        }
    }

    function SetProjectStatusReportIdFromQueryString(sParam) {
        var sParam = 'ProjStatusId';
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');


            if (sParameterName[0] == sParam) {

                ProjectStatusReportId = sParameterName[1];
            }

        }
    }
    function SetScrollPostionToDisplayMessage() {
        var OffSet = 236 // Window scroll position to display validation Summary
        if (OffSet < $(window).scrollTop()) {

            $(window).scrollTop(OffSet);
        }

    }


}






