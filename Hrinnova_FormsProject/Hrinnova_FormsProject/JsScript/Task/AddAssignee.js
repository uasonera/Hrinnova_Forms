/// <reference path="../Constant/Constant.js" />
$(document).ready(function () {
    $(".NewAssignees").click(function () {
       
        var Arr_Assignees = new Array();        
        Arr_Assignees = $("#Assignee").val();       
        if (Arr_Assignees != "") {
            if (existingAssignee != null && existingAssignee != "" && isAssigneeChange && Arr_Assignees != existingAssignee) {
                if (confirm(Constants.ChangeAssignee)) {
                    AddAssignee(Arr_Assignees);
                }
            }
            else {
                AddAssignee(Arr_Assignees);
            }
        }
        else {
            $("#assigneeError").show();
        }
    });

});
function AddAssignee(Arr_Assignees) {
    $.ajax({
        type: "POST",
        url: urlAddNewAssignee,
        dataType: 'html',
        data: "{'AssigneesList':'" + Arr_Assignees + "','TaskID':'" + TaskId + "'}",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#TaskRight").html(data);            
            $('#myModal').modal('toggle');
            //editAssignee();
            GetActivities(TaskId);
        }
    });
}