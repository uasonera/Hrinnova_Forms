$(document).ready(function () {
    BindData();
});

function BindData() {
    $("#tbodyProjDetails").append($("<tr></tr>").attr("id", "trProjDetailsHeading"));
    $("#trProjDetailsHeading").append($('<td></td>').html("<strong>Project</strong>").css("width", "25%"));
    $("#trProjDetailsHeading").append($('<td></td>').html("<strong>KRA</strong>").css("width", "5%"));
    $("#trProjDetailsHeading").append($('<td></td>').html("<strong>KRA Evalution</strong>").css("width", "5%"));
    var Enum = { "Pending": 1, "Completed": 2};

    $.ajax({
        type: "POST",
        url: 'TeaMemberKraActiveProjectList.aspx/ProjDetials',
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            var ProjDetails = jQuery.parseJSON(result.d);

            for (var Index = 0; Index < ProjDetails.length; Index++) {

                var ProjStatus = ProjDetails[Index].kpiapprovalstatus;
                var TeamMembersId = ProjDetails[Index].TeamMemersID;
                var KpiId = ProjDetails[Index].KPIID;
                var CreatedBy = ProjDetails[Index].CreatedBy;
                var CreatedOn_Date = (ProjDetails[Index].CreatedOn).split('T');
                var CreatedOn = CreatedOn_Date[0];




                $("#tbodyProjDetails").append($('<br/>')).append($("<tr></tr>").attr("id", "trProjDetails" + TeamMembersId));
                $("#tbodyProjDetails").append($("<tr></tr>").attr("id", "trProjCreationDetails" + TeamMembersId));
                $("#trProjDetails" + TeamMembersId).append($('<td></td>').html(ProjDetails[Index].proName).css("width", "25%"));
                $("#trProjDetails" + TeamMembersId).append($('<td></td>').append($('<a></a>').attr("href", "#").attr("id", "lnkViewKra_" + TeamMembersId).text("View KRA").addClass("lnkViewKra")).css("width", "5%"));


                $("#trProjDetails" + TeamMembersId).append($('<td></td>').html(ProjDetails[Index].EvalutionCycle + "month Cycle").css("width", "25%"));

                if (ProjDetails.EvallutionDetails.lenth > 0) {

                ("#trProjDetails" + TeamMembersId).append($('<td></td>').append($('<table><table>').append($('<tbody></tbody>').attr('id'),"tbEvalutionDetail" +TeamMembersId));

                    

                    for (var count = 0; count < ProjDetails.EvallutionDetails.lenth; count++) {

                     $("#tbEvalutionDetail").append($("<tr></tr>").attr("id", "trEvalutionDetail" + TeamMembersId));

                     $("#trEvalutionDetail" + TeamMembersId).append($('<td></td>').html(ProjDetails.EvallutionDetails[0].EvalutionTurn).css("width", "25%"));

                     $("#trEvalutionDetail" + TeamMembersId).append($('<td></td>').html(ProjDetails.EvallutionDetails[0].ExpectedDate).css("width", "25%"));

                     if(ProjDetails.EvallutionDetails[0].status==Enum.Completed)
                     {
                     $("#trEvalutionDetail" + TeamMembersId).append($('<td></td>').html(ProjDetails.EvallutionDetails[0].ActualDate).css("width", "25%"));

                     $("#trEvalutionDetail" + TeamMembersId).append($('<td></td>').append($('<a></a>').attr("href", "#").attr("id", "lnkEvalutionReport" + TeamMembersId +count).text("Report").addClass("lnkEvalutionReport")).css("width", "5%"));


                     }
                     else  
                     {
                      $("#trEvalutionDetail" + TeamMembersId).append($('<td></td>').html(ProjDetails.EvallutionDetails[0].Expected).css("width", "25%"));

                       $("#trEvalutionDetail" + TeamMembersId).append($('<td></td>').html('Pending').css("width", "25%"));
                     
                     }

                    }
                
                }


                $("#trProjDetails" + TeamMembersId).append($('<td></td>'));


                //$("#trProjDetails").append($('<td></td>').css("width", "5%"));
                $("#trProjCreationDetails" + TeamMembersId).append($('<td></td>').text("Created on " + CreatedOn + " by " + CreatedBy).css("width", "15%"));
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
    alert(TeamMemberId);

    window.location = "../KRA/KRAApproval.aspx?TeamMemberId=" + TeamMemberId;
});