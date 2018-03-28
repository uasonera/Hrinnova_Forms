/// <reference path="../Constant/Constant.js" />

var isMaxSprintExists;
$(document).ready(function () {


    sprintAccordion();

    $(".EditSprint").click(function () {
        
        var sprintId = $(this).attr('id');
        var IsIteration = ProjectType != Enum_Scrum_ProjectType;
        $.ajax({
            type: "POST",
            url: urlGetSprint,
            dataType: 'html',
            contentType: "application/json; charset=utf-8",
            data: "{'SprintId':'" + sprintId + "','IsEdit':'" + true + "','IsIteration':'" + IsIteration + "'}",
            success: function (data) {
                if (!IsIteration) {
                    $("#dvSprintdialog").empty().html(data);
                    $("#dvSprintdialog").modal('toggle');
                }
                else {
                    $("#AddIterationModal").empty().html(data);
                    $("#AddIterationModal").modal('toggle');
                }
            }
        });
    });
    $(".activeSprint").click(function () {

        var sprintId = $(this).attr('id');
        if (ProjectType == Enum_Scrum_ProjectType) {
            $.ajax({
                type: "POST",
                url: urlCheckActiveSprints,
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data: "{'ProjectId':'" + ProjectId + "'}",
                success: function (data) {

                    if (data.MaxActiveSprintsReached) {
                        $.ajax({
                            type: "POST",
                            url: urlGetSprint,
                            data: '{ "SprintId": "' + sprintId + '","IsEdit": "' + false + '","IsIteration": "' + false + '"}',
                            dataType: "html",
                            async: false,
                            contentType: "application/json; charset=utf-8",
                            success: function (data) {
                                $("#dvSprintdialog").empty().html(data);
                                $("#dvSprintdialog").modal('toggle');
                            },
                            error: function (response) {
                                //alert(response.responseText);
                            }
                        });
                    }
                    else {
                        toastr.error("Max limit of Sprints exceed.You can't start sprint untill existing sprints completed.");
                    }
                },
                error: function (data) {
                    return false;
                }
            });
        }
        else {
            $.ajax({
                type: "POST",
                url: urlGetSprint,
                data: '{ "SprintId": "' + sprintId + '","IsEdit": "' + false + '","IsIteration": "' + true + '"}',
                dataType: "html",
                async: false,
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    $("#AddIterationModal").empty().html(data);
                    $("#AddIterationModal").modal('toggle');
                },
                error: function (response) {
                    //alert(response.responseText);
                }
            });
        }
    });
    $(".completeSprint").click(function () {
        var sprintId = $(this).attr('id');
        var taskCount = $(this).data('taskcount');
        var isAnyPending = $(this).data('isanypending');
        var sprintType = 0;
        if ($('#drpSprintTypes') != undefined) {
            sprintType = $('#drpSprintTypes').val();
            if (sprintType == undefined)
                sprintType = "";
        }
        if (taskCount > 0) {
            if (isAnyPending == true || isAnyPending == 'True') {
                if (confirm(Constants.AllWorkItemCompleted)) {
                    CompleteSprint(sprintId, sprintType);
                }
            }
            else {
                CompleteSprint(sprintId, sprintType);
            }
        }
        else {
            toastr.error(Constants.AtLeastTask);
        }
    });
    $(".deleteSprint").click(function () {
        var sprintId = $(this).data('id');
        var sprintType = $('#drpSprintTypes').val();
        var message = String.format(Constants.DeleteMessage,"Sprint");
        if (ProjectType == Enum_Iterative_ProjectType)
            message = String.format(Constants.DeleteMessage, "Iteration");
        if (confirm(message)) {

            $.ajax({
                type: "POST",
                url: urlDeleteSprint,
                data: '{ "SprintId": "' + sprintId + '","ProjectId":"' + ProjectId + '","CurrentSprint":"' + sprintType + '"}',
                dataType: "html",
                contentType: "application/json; charset=utf-8",
                success: function (data) {

                    $("#SprintRightPanel").empty().html(data);
                    setScrollHeight();
                    bindAllEvents();

                },
                error: function (response) {
                    //alert(response.responseText);
                }
            });
            if (window.location.href.toLowerCase().indexOf('projectsummary') > 0) {
                var url = window.location.href.toString().replace('#', '');
                window.location = url;
            }
        }
    });
    $(".AddIteration").click(function () {
        NewSprintDialog(true);
    });
    $(".newSprint").click(function () {
        
        NewSprintDialog(false);
    });

    $('[data-toggle="tooltip"]').tooltip();
});
function NewSprintDialog(IsIteration) {
    $.ajax({
        type: "POST",
        url: urlGetNewSprint,
        data: '{ "ProjectId": "' + ProjectId + '","IsEdit":"false","IsIteration":"' + IsIteration + '"}',
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            
            if (IsIteration)
                $("#AddIterationModal").empty().html(data);
            else
                $("#SprintModal").empty().html(data);
        },
        error: function (response) {
            //alert(response.responseText);
        }
    });
}
function sprintAccordion() {
    $(".sprintaccordion").click(function () {
        $(this).toggleClass('open');
        var sprintId = $(this).data('id');
        $("#" + sprintId).slideToggle('5000');
        //if ($(this).hasClass('open')) {

        //    //$(this).removeClass('open');
        //}
        //else {
        //    $("#" + sprintId).hide();
        //    //$(this).addClass('open');
        //}
    });
}

function IsMaxActiveSprint() {
    $.ajax({
        type: "POST",
        url: urlCheckActiveSprints,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: "{'ProjectId':'" + ProjectId + "'}",
        async: false,
        success: function (data) {

            return data.MaxActiveSprintsReached;
        },
        error: function (data) {
            return false;
        }
    });
}
function CompleteSprint(sprintId, sprintType) {
    $.ajax({
        type: "POST",
        url: urlCompleteSprint,
        data: '{ "SprintId": "' + sprintId + '","ProjectId":"' + ProjectId + '","CurrentSprint":"' + sprintType + '"}',
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var sprintTitle = (ProjectType == Enum_Iterative_ProjectType ? "Iteration" : "Sprint");
            toastr.success(String.format(Constants.SprintComplete, sprintTitle));
            if (window.location.href.toLowerCase().indexOf('projectsummary') > 0) {
                var url = window.location.href.toString().replace('#', '');
                window.location = url;
            }
            else {
                $("#SprintRightPanel").empty().html(data);
                $.ajax({
                    type: "POST",
                    url: urlSearchProductBacklog,
                    data: '{ "ProjectId":' + ProjectId + ', "SearchKey":"' + $("#txtSearchProductBacklog").val() + '"}',
                    dataType: "html",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        $("#dvPlanSprintView").empty().html(data);
                        setScrollHeight();
                        setScrolling();
                        storyAccordion();
                    }
                });
                bindAllEvents();
            }
        },
        error: function (response) {
            //alert(response.responseText);
        }
    });

}