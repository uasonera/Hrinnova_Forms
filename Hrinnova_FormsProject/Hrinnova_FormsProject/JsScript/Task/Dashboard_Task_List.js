/// <reference path="../Constant/Constant.js" />

$(document).ready(function () {

   


    $('[data-toggle="tooltip"]').tooltip();
    setStoryExpandListener();
    $(document).on("click", ".clsTimesheet", function () {
        var WBSID = $(this).data("wbsid");
        var SprintId = $(this).data("sprint");
        var StoryId = $(this).data("story");
        var EntryDate = moment(new Date()).format("MM/DD/YYYY");

        $.ajax({
            type: "POST",
            url: "/Task/TimesheetAndRemainingHours",
            data: '{"TaskId":' + WBSID + ',"SprintId":' + SprintId + ',"StoryId":' + StoryId + '}',
            dataType: "html",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $("#TimesheetModal").html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) { console.log(jqXHR.responseText) }
        });

        $.ajax({
            type: "POST",
            url: "/Task/CheckFreezingDate",
            data: '{"EntryDate":"' + EntryDate + '"}',
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $(".chkWFH").prop("disabled", !data.WFHAllowed);
            }
        });
    });
    //$(".editTask").unbind('click');
    $(document).on("click", ".editTask", function () {
        Edit = true;
        AddEditTask(ProjectId, $(this).attr('id'), true);
    });
    initSort($('.connectedSortable'));
    //$(".deleteTask").unbind('click');
    $(document).on("click", ".deleteTask", function () {
        var IsNotScrumWithChild = ProjectType != Enum_Scrum_ProjectType && $(this).data("childcount") > 0;
        if (ProjectType != Enum_Scrum_ProjectType) {
            if ($(this).data('hasprogress') == true || $(this).data('hasprogress') == "True") {
                toastr.error(Constants.RestrictDelete);
                return false;
            }
        }
        var Flag = IsNotScrumWithChild ? confirm(Constants.HasSubTasksMessage) : confirm(String.format(Constants.DeleteMessage, "Task"));
        if (Flag) {
            var taskId = $(this).data('id');
            var storyId = $(this).data('storyid');
            var statusId = $(this).data('statusid');
            $.ajax({
                type: "POST",
                url: urlDeleteTask,
                data: '{ "WBSID": "' + taskId + '","StoryId":"' + storyId + '","ProjectId":"' + ProjectId + '"}',
                dataType: "html",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (ProjectType == Enum_Scrum_ProjectType) {
                        $("#story-" + storyId).html(data);
                        initSort($('.connectedSortable'));
                        $(".story-" + storyId).show();
                        $("#story-" + storyId).find('.add').addClass('current');
                    }
                    else {
                        GetKanbanTemplate(statusId);
                    }
                },
                error: function (response) {
                    //alert(response.responseText);
                }
            });
        }
    });

});
function initSort(element) {
    var isSort = true;
    var fromStatus = "";
    var fromStatusId = "";
    $(".connectedSortable li").draggable({
        cancel: '.notsortNewTask',
        start: function (event, ui) {
            $(this).data("origPosition", $(this).position());
            //console.log("Start");
            $(".task-panel-list").hide();
            if (ProjectType == Enum_Scrum_ProjectType)
                $(this).parent('ul').show();
            else {
                $(this).parent('div').parent('div').parent('ul').show();
                //$(this).parent('div').parent('div').parent('ul').next('.highlights').hide();
            }
            //$(this).parent('div').attr('class', 'dragItemOverFlow');            
            //$(this).parent('div').parent('div').attr('class', 'dragItemOverFlow');
            $(".highlights").attr('style', 'border: 1px dashed #808080 ');
            $(".highlights").children('li').attr('style', 'height:100px;');

            startIndex = $(this).index();
            //console.log($(this).attr('id'));
            var sourceList = $(this);
            isSourceValid = true;
            isReceiveCall = false;
            isSubTaskSort = false;
            myLi = $(this);
            if (ProjectType == Enum_Scrum_ProjectType) {
                $(this).show();
                $(this).parent('ul').next('.highlights').removeAttr('style');
                $(this).parent('ul').next(".highlights").children('li').removeAttr('style');
            }
            else {
                $(this).parent('div').parent('div').parent('ul').parent('div').next('.highlights').removeAttr('style');
                $(this).parent('div').parent('div').parent('ul').parent('div').next(".highlights").children('li').removeAttr('style');
            }
            //console.log("Start Source:" + sourceList.attr('id'));
            //console.log("Start Parent:" + sourceList.data('parentid'));
            if (sourceList.parent('ul').data('parentid') != undefined)
                isSubTaskSort = true;
            if (ProjectType == Enum_Scrum_ProjectType) {
                fromStatus = $(this).parent('ul').data('status');
                fromStatusId = $(this).parent('ul').data('statusid');
            }
            else {
                fromStatus = $(this).parent('div').parent('div').parent('ul').data('status');
                fromStatusId = $(this).parent('div').parent('div').parent('ul').data('statusid');
                if (fromStatusId == 0) {

                    $(".highlights").removeAttr('style');
                    $(this).next(".highlights").children('li').removeAttr('style');
                    $(".highlights").hide();
                    $(".notstarted").attr('style', 'border: 1px dashed #808080 !important;');
                    $(".notstarted").children('li').attr('style', 'border: 1px dashed #808080 !important;');
                }
            }
            //console.log(fromStatusId);
        },
        stop: function (event, ui) {
            //var fromStatusId = ui.sender.parent('div').parent('div').parent('ul').data('statusid');
            //console.log(fromStatusId);
            //if (isSort == false) {
            //    $(this).draggable("cancel");                
            //}
            // console.log("Stop:" + $(this).parent('ul').attr('id'));
            $(".task-panel-list").show();
            $(".notstarted").removeAttr('style');
            $(this).next(".notstarted").children('li').removeAttr('style');
            $(".highlights").removeAttr('style');
            $(".highlights li").removeAttr('style');
            $(".highlights").show();
            $(this).parent('div').attr('style', 'overflow:inherit');
            $(this).parent('div').parent('div').attr('style', 'overflow:inherit');
            $(this).parent('ul').next(".highlights").children('li').removeAttr('style');

            if (isReceiveCall == false) {
                //console.log($(this));
                storyId = $(this).parent('ul').data('storyid');
                var isKanban = true;
                if (ProjectType == Enum_Scrum_ProjectType)
                    isKanban = false;
                if ($("#ddlSprint") == undefined || $("#ddlSprint").val() == undefined) {
                    sprintId = 0;
                }
                var fromStatusId = $(this).parent('ul').attr('id');
                if (ProjectType != Enum_Scrum_ProjectType)
                    fromStatusId = $(this).parent('div').parent('div').parent('ul').attr('id');
                GetScrumTemplate(fromStatusId, 0, $(this).attr('id'), storyId, isKanban, 0, null, null);
            }
            return false;
        },
        revert: function (dropped) {
            //console.log("Revert");
            $(".task-panel-list").show();
            $(".notstarted").removeAttr('style');
            $(".highlights").removeAttr('style');
            $(".highlights li").removeAttr('style');
            $(".highlights").show();
            var retValue = isSort;
            if (isSort == false) {
                $(".task-panel-list").show();
                $(".story-" + storyId).show();
                $("#story-" + storyId).find('.add').addClass('current');
                retValue = isSort;
            }
            else {
                retValue = true;
                return;
            }
            if (ProjectType == Enum_Scrum_ProjectType) {
                ExpandColumn();
            }
            else {
                GetKanbanTemplate(fromStatusId);
            }
            return retValue;
        }
    });
    $(".highlights").droppable({
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            var draggableId = ui.draggable.attr("id");
            var droppableId = $(this).attr("id");
            //console.log("Source Id:" + draggableId);
            //console.log("Targer Id:" + droppableId);

            // $(".highlights").hide();          

            $(".highlights").removeAttr('style');
            $(this).parent('div').attr('style', 'overflow:inherit');
            $(this).parent('div').parent('div').attr('style', 'overflow:inherit');
            $(this).next(".highlights").children('li').removeAttr('style');
            $(".notstarted").removeAttr('style');
            $(this).next(".notstarted").children('li').removeAttr('style');
            isReceiveCall = true;
            isSubTaskSort = false;
            //var sourceList = ui.sender;
            var targetList = $(this);

            //console.log("Source:" + sourceList.attr('id'));
            //console.log("Target:" + targetList.attr('id'));
            storyId = $(this).data('storyid');
            isSourceValid = true;
            var index = $(this).index();
            //var WBSLI = myLi[startIndex];
            //console.log("WBSID:" + WBSLI.id);
            var toStatus = $(this).data('status');
            var isKanban = true;
            if (ProjectType == Enum_Scrum_ProjectType)
                isKanban = false;

            var sprintId = $("#ddlSprint").val();
            if ($("#ddlSprint") == undefined || $("#ddlSprint").val() == undefined) {
                sprintId = 0;
            }
            var isValid = false;

            if (ProjectType == Enum_Scrum_ProjectType || ProjectType == Enum_Kanban_ProjectType) {
                $.ajax({
                    type: "POST",
                    url: urlCheckMaxTask,
                    data: '{ "TaskStatusId": "' + targetList.attr('id') + '","ProjectId":"' + ProjectId + '","SprintId":"' + sprintId + '"}',
                    dataType: "json",
                    async: false,
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (data.result == false) {
                            if (ProjectType == Enum_Scrum_ProjectType) {
                                isValid = confirm(Constants.MaxTask);
                            }
                            else {
                                toastr.error(String.format(Constants.MaxTaskForStatus, toStatus));
                                isValid = false;
                            }
                        }
                        else
                            isValid = true;
                    }
                });
            }
            else {
                isValid = true;
            }
            //confirm("Max. Tasks limit for the selected status has been reached. Do you still want to add task?");
            //toastr.success("Task has been Successfully moved from " + fromStatus + " to " + toStatus + ".");
            //console.log(isValid);
            if (isValid) {
                isSort = true;
                GetScrumTemplate(targetList.attr('id'), fromStatusId, myLi.attr('id'), storyId, isKanban, sprintId, fromStatus, toStatus);

            }
            else {
                isSort = false;

                //$(this).sortable("cancel");
            }

            $('[data-toggle="tooltip"]').tooltip();
        }
    });
}
function drag(event) {
    console.log("Start");
}
function drop(event) {
    console.log("Drop");
}
function GetKanbanTemplate(statusId, SprintId) {
    var SearchValue = $("#txtSearch").val();
    var taskTypeId = $("#TaskTypeId").val();
    if (taskTypeId == "")
        taskTypeId = 0;
    var SprintId = $("#ddlSprint").val();

    var Arr_TeamMembers = new Array();
    Arr_TeamMembers = $("#ddlTeamMember").val();
    if (Arr_TeamMembers != null) {
        Arr_TeamMembers = Arr_TeamMembers.filter(function (el) {
            return el !== 'multiselect-all';
        });
    }
    var isRecentUpdate = false;
    if ($("#ddlSprint").val() == 0) {
        isRecentUpdate = false;
    }
    if ($("#ddlSprint").val() == -1) {
        $("#txtSearch").val('');
        isRecentUpdate = false;
    }
    if ($("#ddlSprint").val() == 1) {
        isRecentUpdate = true;
    }
    if (SprintId == undefined || SprintId == null)
        SprintId = 0;
    $.ajax({
        type: "POST",
        url: urlGetKanbanTaskPanel,
        data: '{ "TaskStatusId":"' + statusId + '","ProjectId": "' + ProjectId + '","SearchKey": "' + SearchValue + '","TaskTypeID": "' + 0 + '","SprintId":"' + SprintId + '","isRecentUpdate":"' + isRecentUpdate + '","teamMember":"' + Arr_TeamMembers + '"}',
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        start:
             function (data) {
                 $(".kanban-dashboard-con").attr('style', 'height:' + parseInt(height - 225) + "px;");
                 $(".kanban-task-con .task-panel-list").attr('style', 'height:' + parseInt(height - 330) + "px;");
             },
        success: function (data) {
            $("#dvTaskStatus-" + statusId).empty().html(data);

            //ExpandColumn();
            var height = $(window).height();
            //console.log("Height:" + height);    
            $(".kanban-dashboard-con").attr('style', 'height:' + parseInt(height - 225) + "px;");
            $(".kanban-task-con .task-panel-list").attr('style', 'height:' + parseInt(height - 330) + "px;");
            $(".mCustomBoardScrollbar").mCustomScrollbar({
                scrollButtons: { enable: true },
                scrollbarPosition: "outside",
                advanced: {
                    updateOnBrowserResize: true,
                    updateOnContentResize: true
                },
            });
            initSort($('.connectedSortable'));
        },
        error: function (response) {
            //alert(response.responseText);
        },
        complete: function (data) {
            //console.log(data);
        }
    });
}
function GetScrumTemplate(TargetStatusId, FromStatusId, WBSID, StoryId, isKanban, SprintId, fromStatus, toStatus) {
    var SearchValue = $("#txtSearch").val();
    var taskTypeId = $("#TaskTypeId").val();
    if (taskTypeId == "" || taskTypeId == undefined)
        taskTypeId = 0;
    var SprintId = $("#ddlSprint").val();
    if (SprintId == undefined || SprintId == "")
        SprintId = 0;
    var Arr_TeamMembers = new Array();
    Arr_TeamMembers = $("#ddlTeamMember").val();
    if (Arr_TeamMembers != null) {
        Arr_TeamMembers = Arr_TeamMembers.filter(function (el) {
            return el !== 'multiselect-all';
        });
    }
    if (StoryId == undefined || StoryId == "undefined")
        StoryId = 0;
    var isRecentUpdate = false;
    if ($("#ddlSprint").val() == 0) {
        isRecentUpdate = false;
    }
    console.log(TargetStatusId);
    console.log(FromStatusId);
    if (TargetStatusId != FromStatusId) {
        $.ajax({
            type: "POST",
            url: urlUpdateScrumTaskStatus,
            data: '{ "TaskStatusId": "' + TargetStatusId + '","WBSID": "' + WBSID + '","StoryId":"' + StoryId + '","ProjectId":"' + ProjectId + '","IsKanban":"' + isKanban + '","SearchKey": "' + SearchValue + '","TaskTypeID": "' + 0 + '","SprintId":"' + SprintId + '","isRecentUpdate":"' + isRecentUpdate + '","teamMember":"' + Arr_TeamMembers + '"}',
            dataType: "html",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                if (ProjectType == Enum_Scrum_ProjectType) {
                    $(".task-panel-list").show();
                    $("#story-" + StoryId).html(data);
                    $(".story-" + StoryId).show();
                    $("#story-" + StoryId).find('.add').addClass('current');
                    assignScroll();
                    ExpandColumn();
                    setStoryExpandListener();
                    initSort($('.connectedSortable'));
                }
                else {
                    $("#dvTaskStatus-" + TargetStatusId).empty().html(data);
                    setStoryExpandListener();
                    GetKanbanTemplate(FromStatusId);
                }
                $(".task-panel-list").show();
                if (fromStatus != null && toStatus != null)
                    toastr.success(String.format(Constants.MoveTask, fromStatus, toStatus));
            },
            error: function (response) {
                //alert(response.responseText);
            }
        });
    }
    else {
        GetKanbanTemplate(FromStatusId);
        return true;
    }
}
function ExpandColumn() {
    $(".panelCollapse").each(function () {
        if ($(this).data('status') != undefined) {
            var panelstatusId = $(this).data('status');
            if ($(".expandpanel-" + panelstatusId + ":first").hasClass('collapsed')) {
                //console.log(panelstatusId);
                $(".expandpanel-" + panelstatusId).each(function (event) {
                    $('#dvTaskStatus-' + panelstatusId).hide();
                    $(".expandpanel-" + panelstatusId).addClass('collapsed');
                });
            }
        }
    });
}
function setStoryExpandListener() {
    $("span.add").unbind('click');
    $("span.add").click(function () {
        $("span.add").not($(this)).removeClass('current');
        var story = $(this).data('id');
        $(this).toggleClass('current');
        $(".data-show").hide('slow');
        //$("." + story).slideToggle("5000");
        //$(".data-show").hide();
        if ($(this).hasClass('current'))
            $("." + story).show('slow');
        else
            $("." + story).hide('slow');
    });
}