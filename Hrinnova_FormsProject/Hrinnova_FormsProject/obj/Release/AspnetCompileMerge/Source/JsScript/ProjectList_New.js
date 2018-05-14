$(document).ready(function () {
    //  BindData();
    BindActiveProj();
    //    BindCloseProj();
    $("#redirectToLandingPage").click(function () {
        window.location = '/Dashboard/Index';
    });
});

function BindData() {

    //   $("#tbodyProjDetails").append($("<tr></tr>").append("<td colspan=\"3\">Project List - New</td>").css("font-family", "cursive";"font-family", "cursive"));// font-size: small;font-weight: bold;"));
    $("#tbodyProjDetails").append($("<tr></tr>").attr("id", "trProjDetailsHeading"));
    $("#trProjDetailsHeading").append($('<td></td>').html("<strong>Project</strong>").css("width", "27%"));
    $("#trProjDetailsHeading").append($('<td></td>').html("<strong>KRA</strong>").css("width", "4%"));
    $("#trProjDetailsHeading").append($('<td></td>').html("<strong>Status</strong>").css("width", "17%"));
    var Enum = { "Pending": 1, "Accepted": 2, "Rejected": 3, "ClarificationStage": 4 };

    $.ajax({
        type: "POST",
        url: 'ProjectList_New.aspx/ProjDetials',
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            var ProjDetails = jQuery.parseJSON(result.d);

            for (var Index = 0; Index < ProjDetails.length; Index++) {
                var ProjStatus = ProjDetails[Index].kpiapprovalstatus;
                var TeamMembersId = ProjDetails[Index].TeamMemersID;
                // var KpiId = ProjDetails[Index].KPIID;
                var CreatedBy = ProjDetails[Index].CreatedBy;
                //  var CreatedOn_Date = (ProjDetails[Index].KraCreateOn).split('T');
                var RowNum = ProjDetails[Index].Num;
                var CreatedOn = ProjDetails[Index].KraCreateOn;
                // 

                $("#tbodyProjDetails").append($('<br/>')).append($("<tr></tr>").attr("id", "trProjDetails" + RowNum));
                $("#tbodyProjDetails").append($("<tr></tr>").attr("id", "trProjCreationDetails" + RowNum));
                $("#trProjDetails" + RowNum).append($('<td></td>').html(ProjDetails[Index].proName).css({ "width": "23%", "font-weight": "bold" }));
                $("#trProjDetails" + RowNum).append($('<td></td>').append($('<a></a>').attr("href", "#").attr("id", "lnkViewKra_" + TeamMembersId).text("View KPI").addClass("lnkViewKra")).css({ "width": "5%", "text-decoration": "underline" }));

                if (ProjStatus == Enum.Pending)
                    $("#trProjDetails" + RowNum).append($('<td></td>').text("Pending").css("width", "17%"));

                else if (ProjStatus == Enum.Accepted)
                    $("#trProjDetails" + RowNum).append($('<td></td>').text("Accepted").css("width", "17%"));

                else if (ProjStatus == Enum.Rejected)
                    $("#trProjDetails" + RowNum).append($('<td></td>').text("Rejected").css("width", "17%"));

                else if (ProjStatus == Enum.ClarificationStage)
                    $("#trProjDetails" + RowNum).append($('<td></td>').text("ClarificationStage").css("width", "17%"));


                //$("#trProjDetails").append($('<td></td>').css("width", "5%"));
                $("#trProjCreationDetails" + RowNum).append($('<td></td>').text("Created on " + CreatedOn + " by " + CreatedBy).css("width", "15%"));
            }
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}
$(document).on('click', ".lnkViewKra", function () {
    var linkId = $(this).attr("id");
    var splitId = linkId.split('_');
    var TeamMemberId = splitId[1];
    // alert(TeamMemberId);

    $.ajax({
        type: "POST",
        url: 'ProjectList_New.aspx/EncryptID',
        data: "{'ID' : " + TeamMemberId + "}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {

            TeamMemberId = result.d;
            window.location = "../KRA/KRAApproval.aspx?TeamMemberId=" + TeamMemberId;

        },
        error: function (result) { alert(result); }
    });

});
$(document).on('click', '.lnkViewTargetNotes', function () {

    if ($(this).attr("disabled") == "disabled") {
        e.preventDefault();
    }
    else {

        var lnkId = $(this).attr('id');
        var splitedId = lnkId.split('_');

        var TeamMemberNoteId = splitedId[1];

        $.ajax({
            type: "POST",
            url: 'ProjectList_New.aspx/GetTargetNotes',
            data: "{'TeamMemberNoteId' : " + TeamMemberNoteId + "}",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (result) {
                var notes = result.d;
                $("#TargetNotesDialog").text(notes)

            },
            error: function (result) { alert(result); }
        });


        $("#TargetNotesDialog").css("display", "block");

        $("#TargetNotesDialog").dialog({
            width: 420,
            height: 300,
            title: "Target Notes",
            modal: true
        });
    }
})
function BindActiveProj() {

    var Enum = { "Pending": 1, "Accepted": 2, "Closed ": 3, "Reject ": 4, "ClarificationStage": 5 };
    var EvaluationEnum = { "Pending": 1, "Completed": 2 };
    //   
    $.ajax({
        type: "POST",
        url: 'ProjectList_New.aspx/ActiveProjects',
        data: "{ 'status' : " + Enum.Accepted + "}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (jsonresult) {
            var result = jQuery.parseJSON(jsonresult.d);
            var ProjList = result.dtProjList1;

            var ActiveProj = result.dtActiveProj1;
            if (jQuery.isEmptyObject(ActiveProj) && jQuery.isEmptyObject(ProjList)) {
                $.msg({
                    fadeIn: 300,
                    fadeOut: 300,
                    timeOut: 2000,
                    content: 'No KRA Assigned for you'
                });

                $("<div style='margin-left:48px;width:89%;border:1px solid #565656;padding:5px;'>No KRA Assigned for you</div>").insertAfter($("#tblProjList"));
                $("#tblProjList").hide();
                //                ShowMessage(false, "No KRA Assigned for you");
            }
            else {
                ClearMessage();
                for (var Index = 0; Index < ProjList.length; Index++) {
                    
                    var projectID = ProjList[Index].projectID;

                    var TeamMemberId = ProjList[Index].TeamMemersID;
                    if (Index != 0) {
                        $('#tbodyProjList').append($('<br/>')).append("<input type='image' id='imgclose' src='../Images/u48_line.png' name='image' width='880px' height='6px' style='position:absolute;'>");
                    } else {
                        $('#tbodyProjList').append("<input type='image' id='imgclose' src='../Images/u47_line.png' name='image' width='880px' height='6px' style='position:absolute; margin:5px -6px;'>");
                    }
                    $("#tbodyProjList").append($('<br/>')).append($("<tr></tr>").attr("id", "trProjList" + projectID + TeamMemberId));
                    $("#tbodyProjList").append($("<tr></tr>").attr("id", "trProjList" + Index));
                    $("#trProjList" + projectID + TeamMemberId).append($('<td class="project-name"></td>').html(ProjList[Index].proName + "<br /><span style='font-weight:normal;font-size:12px;'>(" + ProjList[Index].StartDate + " to " + ProjList[Index].EndDate + ")</span>"));
                    //$("#trProjList" + projectID + TeamMemberId).append($('<td></td>').append($('<a></a>').attr("href", "#").attr("id", "lnkViewKra_" + ProjList[Index].TeamMemersID).text("View KPI").addClass("lnkViewKra")).css({ "width": "31%", "text-decoration": "underline" }));

                    $("#trProjList" + projectID + TeamMemberId).append($('<td></td>').append($('<a></a>').attr("href", "#").attr("id", "lnkViewKra_" + ProjList[Index].TeamMemersID).text("View KPI").addClass("lnkViewKra")).css({ "width": "31%", "text-decoration": "underline" }).append(
                        $('<br/><br/>')).append($('<a></a>').attr("id", "lnkViewTargetNotes_" + ProjList[Index].TeamMemberKraNotesID + "_" + ProjList[Index].TeamMemersID).text("View Target Notes").addClass("lnkViewTargetNotes")).css({ "width": "31%"}));

                    if (ProjList[Index].TeamMemberKraNotesID == 0 || ProjList[Index].TeamMemberKraNotesID == 1)
                        $("#lnkViewTargetNotes_" + ProjList[Index].TeamMemberKraNotesID + "_" + ProjList[Index].TeamMemersID).attr('disabled', 'disabled').removeAttr('').css({
                            'color': '#969696 !important', 'cursor': 'default',
                            "display":"none"
                        });
                    else
                        $("#lnkViewTargetNotes_" + ProjList[Index].TeamMemberKraNotesID + "_" + ProjList[Index].TeamMemersID).removeAttr("disabled").css({
                            "text-decoration": "underline",
                            "display":"none",
                            'cursor': 'pointer'
                        });

                    if (ProjList[Index].kpiapprovalstatus == Enum.Pending) {
                        $("#trProjList" + projectID + TeamMemberId).append($('<td></td>').text("Pending").css("width", "17%"));
                    }
                    else {
                        $("#trProjList" + projectID + TeamMemberId).append($('<td></td>').html(ProjList[Index].EvalPeriod).text(ProjList[Index].EvalPeriod + " month cycle").css({ "width": "15%", "font-weight": "bold" }));
                    }

                    $("#tbodyProjList").append($("<tr></tr>").attr("id", "trProjList1" + Index));
                    //                    if (ProjList[Index].kpiapprovalstatus == Enum.Pending) {
                    //                        $("#trProjList1" + Index).append($('<td></td>').text("Created on " + ProjList[Index].CreatedOn + " by " + ProjList[Index].CreatedBy).css({ 'width': '5%', 'line-height': '20px' }));
                    //                    }
                    if (ProjList[Index].kpiapprovalstatus == Enum.Completed)
                    { $("#trProjList1" + Index).append($('<td></td>').text("Evaluation done on " + ProjList[Index].CreatedOn + " by " + ProjList[Index].CreatedBy).css({ 'width': '5%', 'line-height': '20px' })); }
                    else { $("#trProjList1" + Index).append($('<td></td>').text("Created on " + ProjList[Index].CreatedOn + " by " + ProjList[Index].CreatedBy).css({ 'width': '5%', 'line-height': '20px' })); }


                    if (ProjList[Index].UpdatedBy != "") {
                        $("#tbodyProjList").append($("<tr></tr>").attr("id", "trProjLists" + TeamMemberId + Index));

                        if (ProjList[Index].KraUpdateOn != "" && ProjList[Index].UpdatedBy != "")
                            $("#trProjLists" + TeamMemberId + Index).append($('<td></td>').text("Updated on " + ProjList[Index].KraUpdateOn + " by " + ProjList[Index].UpdatedBy).css({ 'width': '5%', 'line-height': '20px' }));
                    } else {
                        $("#tbodyProjList").append($("<tr></tr>").attr("id", "trProjLists" + TeamMemberId + Index).append($('<td></td>').css({ 'width': '5%', 'line-height': '20px' })));
                    }

                    if (ProjList[Index].kpiapprovalstatus == Enum.Accepted) {


                        var eval = 0;
                        var TeamMembersId = ProjList[Index].TeamMemersID;




                        for (var i = 0; i < ActiveProj.length; i++) {

                            if (projectID == ActiveProj[i].projectID && TeamMemberId == ActiveProj[i].TeamMemersID) {
                                var Index1 = Index + i;
                                eval = eval + 1;
                                var Indexeval = "";
                                Indexeval = GetIndexText(eval);


                                if (i == 0) {


                                    $("#trProjLists" + TeamMembersId + Index).append($('<td></td>').css({ "width": "1%", "padding-top": "1px" }));
                                    $("#trProjLists" + TeamMembersId + Index).append($('<td></td>').html("<div style='padding-top: 10px; width: 100px;'>" + Indexeval + " Evaluation</div>").css({ "width": "5%", "padding-top": "10px" }));
                                    $("#trProjLists" + TeamMembersId + Index).append($('<td> </td>').html("<div style='padding-top: 10px; width: 100px;'>" + ActiveProj[i].EvalDAte + "</div>").css({ "width": "20%", "padding-top": "10px" }));
                                    $("#trProjLists" + TeamMembersId + Index).append($('<td></td>').html("<div style='padding-top: 10px; width: 100px;'>" + ActiveProj[i].EvalStatus + " <a href='ProjectKRA.aspx?EvaluationId=" + ActiveProj[i].KRAEvalId + "'>Notes</a></div").css({ "width": "10%", "padding-top": "10px", "padding-left": "15px" }));
                                } else {

                                    $("#tbodyProjList").append($("<tr></tr>").attr("id", "trProjList2" + TeamMembersId + Index1));
                                    $("#trProjList2" + TeamMembersId + Index1).append($('<td></td>').css({ "width": "1%", "padding-top": "10px" }));
                                    $("#trProjList2" + TeamMembersId + Index1).append($('<td></td>').css({ "width": "10%", "padding-top": "10px" }));
                                    $("#trProjList2" + TeamMembersId + Index1).append($('<td></td>').html("<div style='padding-top: 10px; width: 100px;'>" + Indexeval + " Evaluation</div>").css({ "width": "5%", "padding-top": "10px" }));
                                    $("#trProjList2" + TeamMembersId + Index1).append($('<td></td>').html("<div style='padding-top: 10px; width: 100px;'>" + ActiveProj[i].EvalDAte + "</div>").css({ "width": "20%", "padding-top": "10px" }));
                                    $("#trProjList2" + TeamMembersId + Index1).append($('<td></td>').html("<div style='padding-top: 10px; width: 100px;'>" + ActiveProj[i].EvalStatus + " <a href='ProjectKRA.aspx?EvaluationId=" + ActiveProj[i].KRAEvalId + "'>Notes</a></div>").css({ "width": "10%", "padding-top": "10px", "padding-left": "15px" }));
                                }
                            }
                        }
                    }

                }
            }
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}

function BindCloseProj() {
    var Enum = { "Pending": 1, "Accepted": 2, "Rejected": 3, "ClarificationStage": 4 };
    // 
    $.ajax({
        type: "POST",
        url: 'ProjectList_New.aspx/ActiveProjects',
        data: "{ 'status' : " + Enum.Rejected + "}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (jsonresult) {
            var result = jQuery.parseJSON(jsonresult.d);

            var ProjList = result.dtProjList1;
            var ActiveProj = result.dtActiveProj1;

            // 
            for (var Index = 0; Index < ProjList.length; Index++) {
                var projectID = ProjList[Index].projectID;
                //alert(projectID);
                $("#tbodycloseProjList").append($('<br/>')).append($("<tr></tr>").attr("id", "trCloseList" + projectID));
                $("#tbodycloseProjList").append($("<tr></tr>").attr("id", "trCloseList" + Index));
                $("#trCloseList" + projectID).append($('<td></td>').html(ProjList[Index].proName).css({ "width": "55%", "font-weight": "bold" }));
                $("#trCloseList" + projectID).append($('<td></td>').append($('<a></a>').attr("href", "#").attr("id", "lnkViewKra_" + ProjList[Index].TeamMemersID).text("View KPI").addClass("lnkViewKra")).css({ "width": "10%", "text-decoration": "underline" }));
                $("#trCloseList" + projectID).append($('<td></td>').html(ProjList[Index].EvalPeriod).text(ProjList[Index].EvalPeriod + " months evaluation cycle").css({ "width": "18%", "font-weight": "bold" }));

                $("#tbodycloseProjList").append($("<tr></tr>").attr("id", "trCloseList1" + Index));
                $("#trCloseList1" + Index).append($('<td></td>').text("Evaluation done on " + ProjList[Index].CreatedOn + " by " + ProjList[Index].CreatedBy).css("width", "5%"));

                var eval = 0;
                for (var i = 0; i < ActiveProj.length; i++) {
                    if (projectID == ActiveProj[i].projectID) {
                        var Index1 = Index + i;
                        eval = eval + 1;
                        $("#tbodycloseProjList").append($("<tr></tr>").attr("id", "trProjList3" + Index1));
                        $("#trProjList3" + Index1).append($('<td></td>').css({ "width": "5%" }));

                        $("#trProjList3" + Index1).append($('<td></td>').css({ "width": "5%" }));
                        $("#trProjList3" + Index1).append($('<td></td>').html(eval + " Evaluation").css({ "width": "5%" }));
                        $("#trProjList3" + Index1).append($('<td></td>').html(ActiveProj[i].EvalDAte).css({ "width": "10%" }));
                        $("#trProjList3" + Index1).append($('<td></td>').html(ActiveProj[i].EvalStatus).css({ "width": "5%" }));

                    }
                }

            }
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
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
function ClearMessage() {
    $("#lblMessage").empty();
    $("#lblMessage").removeClass('alert alert-warning');
    $("#lblMessage").removeClass('alert alert-success');
}

function GetIndexText(n) {
    var s = ["th", "st", "nd", "rd"],
       v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}