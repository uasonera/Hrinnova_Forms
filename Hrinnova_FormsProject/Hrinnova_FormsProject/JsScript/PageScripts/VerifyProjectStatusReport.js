

function pageLoad() {

    var ProjectStatusReport;
    var SucessMessageReportSubmited = "Report Submited Sucessfully";
    var SucessMessageAnswerSubmited = "Answer Submited Sucessfully";
    var FailMessageAnswerSubmit = "Found Error while saving record";
    var FailMessageReportSubmit = "Found Error while saving record";
    var AnswerRequiredMessage = "Answer Required ";
    var ProjectStatusRequiredMessage = "Please select project status";
    var NoRecordMessage = "No Record found";

    var ReportApprovalMessage = "Report has been approved and locked Sucessfully";

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
                + " <textarea id='txtAnswer' maxlength='500' class='textarea ReadOnlyAnswer ' cols='20' rows='2'>{AnswerText}</textarea> "
                + " </div> "
                + "<br/>"
                + " <div id='dvSubmitAnswer' class='submit-answer Invisible ' > "
                + "  <span class='blue-button ' id='spEditAnwser'>  <input id='EditAnwser' type='submit' class='  ButtonStyles  savebtn Invisible ' value='Edit' title= 'Submit Answer' /> </span> "
                + " <span class='blue-button' id='spSubmitAnswer'> <input id='SubmitAnswer' type='submit' class=' ButtonStyles  savebtn '  title='Edit Answer' value='Submit Your Answer'  /> </span>   "
                + " </div> "
                + " </div>"


    GetActiveProject();
    GetProjectStatusZone();


    $("#ddlProject").change(function () {
        ProjectStatusReport = null;
        ClearValidation();
        ClearMessage();
        SelectProjectstatus();

        var selectedProjectId = $(this).val();
       
        
        if (selectedProjectId == 0) {
            $("#dvMain").empty();

            ToogleVisibleState(false, ApproveReportBlock);
            ToogleVisibleState(false, ProjectStatusZone);

        }
        else {
            GetQuestionsByProjectID(selectedProjectId);
            
            //ToogleActiveState(true, ProjectStatusZone);
        }


    });


    function GetActiveProject() {

        $.ajax({
            type: "POST",
            url: "../Admin/VerifyProjectStatusReport.aspx/GetActiveProject",
            data: "{}",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (jsonresult) {
                var lstProject = jQuery.parseJSON(jsonresult.d);

                $("#ddlProject").append($("<option></option>").val('0').html('Select Project'));
                for (var index = 0; index < lstProject.length; index++) {
                    $("#ddlProject").append($("<option></option>").val(lstProject[index].projectID).html(lstProject[index].proName));
                }

            },
            error: function (jsonresult) {
                alert(jsonresult.responseText);
            }
        });
    }


    function GetProjectStatusZone() {

        $.ajax({
            type: "POST",
            url: "../Admin/VerifyProjectStatusReport.aspx/GetProjectStatusZone",
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


    function GetQuestionsByProjectID(projectID) {
      //  var ApproveReport = $("#ApproveReport");

        $.ajax({
            type: "POST",
            url: "../Admin/VerifyProjectStatusReport.aspx/GetProjectStatusQuestionAnswer",

            data: '{"ProjectID":"' + projectID + '" ,"IsLoked":"false"' + '}',

            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (jsonresult) {
                ProjectStatusReport = jQuery.parseJSON(jsonresult.d);
                var EmbededBody = "";
                $("#dvMain").empty();

                var RecordCount = ProjectStatusReport.lstProjectStatusQuestionanswer == null ? 0 : ProjectStatusReport.lstProjectStatusQuestionanswer.length;


                if (RecordCount > 0) {



                    SelectProjectstatus(ProjectStatusReport.ProjectStatusZoneID);
                    ToogleVisibleState(true, ApproveReportBlock);
                    ToogleVisibleState(true, ProjectStatusZone);

                    for (var i = 0; i < ProjectStatusReport.lstProjectStatusQuestionanswer.length; i++) {


                        var FormatedHtml = Template.replace('{ID}', i);
                        FormatedHtml = FormatedHtml.replace('{ProjectStatusQuestionId}', ProjectStatusReport.lstProjectStatusQuestionanswer[i].ProjectStatusQuestionId);

                        FormatedHtml = FormatedHtml.replace('{ProjectStatusAnswerID}', ProjectStatusReport.lstProjectStatusQuestionanswer[i].ProjectStatusAnswerID == undefined ? 0 : ProjectStatusReport.lstProjectStatusQuestionanswer[i].ProjectStatusAnswerID);

                        FormatedHtml = FormatedHtml.replace('{QuestionText}', ProjectStatusReport.lstProjectStatusQuestionanswer[i].QuestionText);

                        FormatedHtml = FormatedHtml.replace('{AnswerText}', ProjectStatusReport.lstProjectStatusQuestionanswer[i].ProjectStatusAnswerID == 0 ? '' : ProjectStatusReport.lstProjectStatusQuestionanswer[i].AnswerText);


                        EmbededBody = EmbededBody + FormatedHtml;
                    }
                    $("#dvMain").append($(EmbededBody));


                }
                else {

                    ToogleVisibleState(false, ApproveReportBlock);
                    ToogleVisibleState(false, ProjectStatusZone);

                    ProjectStatusReport = null;

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
        var ProjectID = $("#ddlProject option:selected").val();
        var ProjectStatusAnswerObj = $($($($(this).parent()).parent()).parent()).find(".AnswerhiddenField");
        var ProjectStatusQuestionId = $($($($($(this).parent()).parent()).parent()).find(".QuestionHiddenField")).val();

        var ProjectStatusAnswerID = $($($($($(this).parent()).parent()).parent()).find(".AnswerhiddenField")).val();

        var EditObj = $($($(this).parent()).parent()).find("#EditAnwser");

        var AnswerText = $($($($($(this).parent()).parent()).parent()).find(".textarea")).val();

        var ProjectStatusZoneId = "0";
        var DTO = '{' + '"ProjectID":"' + ProjectID + '",' + '"ProjectStatusQuestionId":"' + ProjectStatusQuestionId + '",' + '"AnswerText":"' + AnswerText + '",' + '"ProjectStatusZoneId":"' + ProjectStatusZoneId + '","ProjectStatusAnswerID":"' + ProjectStatusAnswerID + '"' + '}';

        $.ajax({
            type: "POST",
            url: "../Admin/VerifyProjectStatusReport.aspx/SubmitNewAnswer",


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

        ProjectStatusReport.ProjectId = $("#ddlProject option:selected").val();
        ProjectStatusReport.ProjectStatusZoneID = $("#ddlProjectStatusZone option:selected").val();
        ProjectStatusReport.lstProjectStatusQuestionanswer = ProjectStatusReport.lstProjectStatusQuestionanswer; //JSON.stringify(ProjectStatusReport.lstProjectStatusQuestionanswer);
        var DTO = "{ ProjectStatusReport:" + JSON.stringify(ProjectStatusReport) + "}";

        // var DTO = "{ ProjectId:" + ProjectId + ",ProjectStatusZoneID:" + ProjectStatusZoneID + ", lstPojectStatus: " + JSON.stringify(ProjectStatusReport.lstProjectStatusQuestionanswer) + " }";


        $.ajax({
            type: "POST",
            url: "../Admin/VerifyProjectStatusReport.aspx/SubmitReport",
            data: DTO,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (jsonresult) {

                var result = jQuery.parseJSON(jsonresult.d);
                ProjectStatusReport.ProjectStatusReportId = result;
                if (result != '0') {

                    ShowMessage(true, SucessMessageReportSubmited);
                }
                else {

                    ShowMessage(true, FailMessageReportSubmit);
                }


            },
            error: function (jsonresult) {

                $("#lblMessage").text(jsonresult.d);
            }
        });

    });


    $(document).on("click", "#ApproveReport", function (event) {
        event.preventDefault();
        ClearValidation();
        ClearMessage();

        var statusObject = $("#ddlProjectStatusZone");

        

        ProjectStatusReport.ProjectId = $("#ddlProject option:selected").val();
        ProjectStatusReport.ProjectStatusZoneID = $("#ddlProjectStatusZone option:selected").val();
        ProjectStatusReport.ProjectName = $("#ddlProject option:selected").text();
        ProjectStatusReport.ProjectStatusZone = $("#ddlProjectStatusZone option:selected").text();
        ProjectStatusReport.lstProjectStatusQuestionanswer = ProjectStatusReport.lstProjectStatusQuestionanswer; 
        var DTO = "{ ProjectStatusReport:" + JSON.stringify(ProjectStatusReport) + "}";

        // var DTO = "{ ProjectId:" + ProjectId + ",ProjectStatusZoneID:" + ProjectStatusZoneID + ", lstPojectStatus: " + JSON.stringify(ProjectStatusReport.lstProjectStatusQuestionanswer) + " }";


        $.ajax({
            type: "POST",
            url: "../Admin/VerifyProjectStatusReport.aspx/ApproveReport",
            data: DTO,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (jsonresult) {

                jQuery.parseJSON(jsonresult.d);
                if (jsonresult.d != '0') {
                    ShowMessage(true, ReportApprovalMessage);
                }
                else {

                    ShowMessage(true, FailMessageReportSubmit);
                }


            },
            error: function (jsonresult) {

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
            $("#ulVs").append("<li>" + ReqiiredMessage + "</li>")
            return false;
        }
        return true

    }

    function DropDownValidation(Control, ReqiiredMessage, ValidationMessage) {
        if ($(Control).val() == 0) {

            $("#ulVs").append("<li>" + ReqiiredMessage + "</li>")

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
        // $($("#ddlProjectStatusZone").val(ProjectStatusId)).change()
        $("#ddlProjectStatusZone").val(ProjectStatusId)
        //$('.id_100 option[value=2]').attr('selected', 'selected');


    }




}






