var idleTime = 0;
$(document).ready(function () {
    //var idleInterval = setInterval("timerIncrement()", 60000); // 1 minute

    ////Zero the idle timer on mouse movement.
    //$(this).mousemove(function (e) {
    //    idleTime = 0;
    //});

    //$(this).keypress(function (e) {
    //    idleTime = 0;
    //});
    if ($("select").hasClass("chosen-select")) {
        $(".chosen-select").chosen({

        });
    }
    setContainerHeight();
    assignScroll();
    $(".mHorizontalScroll").mCustomScrollbar({
        scrollButtons: { enable: false },
        horizontalScroll: true,
        scrollbarPosition: "inside",
        autoHideScrollbar: false,
        mouseWheel: { enable: true },
        snapAmount: 40,
        scrollInertia: 200,
        autoExpandScrollbar:true,
        advanced: {
            updateOnBrowserResize: true,
            autoExpandHorizontalScroll: true
        },
    });
   
    $(window).resize(function () {
        
        height = $(window).height();
        $(".kanban-dashboard-con").attr('style', 'height:' + parseInt(height - 225) + "px;");
        $(".kanban-task-con .task-panel-list").attr('style', 'height:' + parseInt(height - 350) + "px;");
        //$(".task-dashboard-con").attr('style', 'height:' + parseInt(height - 130) + "px;");      
    });
    $(".js-example-basic-multiple").multiselect({
        includeSelectAllOption: true,
        nonSelectedText: 'All Team Members',
        enableFiltering: true,
        enableCaseInsensitiveFiltering: true,
        maxHeight: 200,
        numberDisplayed: 1

    });
    //$(".multiselect-container").mCustomScrollbar({
    //    scrollButtons: { enable: true },
    //    scrollbarPosition: "inside",
    //    advanced: {
    //        updateOnBrowserResize: true,
    //        updateOnContentResize: true
    //    },
    //});
    $(document).bind('keydown keyup', function (e) {
        if (e.which === 116) {
            $("#ddlWork").val("-1");
        }
    });
    $(window).bind('beforeunload', function () {
        $("#ddlWork").val("-1");
    });
    $(document).on(" click", ".ClsThumbnail", function () {
        window.location = filepath + "?FileWithPath=" + $(this).find('img').attr('data-originalpath');
    });
    $(".highlights").hide();
    $(".createsprint").click(function () {

        NewSprintDialog(false);
    });
    $(".AddIteration").click(function () {
        NewSprintDialog(true);
    });
    $(".sprint-close").click(function () {
        $('.search-block').removeClass('open');
        $("#txtSearch").val('');
        $('.sprint-close').addClass('disappear-close');
        if ($("#ddlSprint").val() == 1) {
            filterSearch(urlSearchTask, true);
        }
        else {
            filterSearch(urlSearchTask, false);
        }
    });
    $(".SearchTaskButton").click(function () {
        if ($("#ddlSprint").val() == 1) {
            filterSearch(urlSearchTask, true);
        }
        else {
            filterSearch(urlSearchTask, false);
        }

    });
    $("#TaskTypeId").on("change", function () {
        if ($("#ddlSprint").val() == 0) {
            filterSearch(urlMyTasks, false);
        }
        if ($("#ddlSprint").val() == -1) {
            $("#txtSearch").val('');
            filterSearch(urlSearchTask, false);
        }
        if ($("#ddlSprint").val() == 1) {
            filterSearch(urlSearchTask, true);
        }
        filterSearch(urlSearchTask);
    });
    $("#ddlSprint").change(function () {
        var sprintId = $(this).val();
        var isRecentUpdate = false;
        $("#ddlWork").val('-1');
        $("#sprintname").text($("#ddlSprint option:selected").text());

        var Arr_TeamMembers = new Array();
        Arr_TeamMembers = $("#ddlTeamMember").val();
        if (Arr_TeamMembers != null) {
            Arr_TeamMembers = Arr_TeamMembers.filter(function (el) {
                return el !== 'multiselect-all';
            });
        }


        $.ajax({
            type: "POST",
            url: urlGetSprintData,
            data: '{ "ProjectId": "' + ProjectId + '","SprintId": "' + sprintId + '","isRecentUpdate":"' + isRecentUpdate + '","TeamMember":"' + Arr_TeamMembers + '"}',
            dataType: "html",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $("#dvDashboard").html(data);
                height = $(window).height();
                $(".kanban-dashboard-con").attr('style', 'height:' + parseInt(height - 225) + "px;");
                $(".kanban-task-con .task-panel-list").attr('style', 'height:' + parseInt(height - 350) + "px;");
                $(".kanban-task-con .task-data-panel").attr('style', 'height:' + parseInt(height - 242) + "px;");
                $(".mCustomBoardScrollbar").mCustomScrollbar({
                    scrollButtons: { enable: true },
                    scrollbarPosition: "inside",
                    advanced: {
                        updateOnBrowserResize: true,
                        updateOnContentResize: true
                    },
                    scrollInertia: 200,
                });
                $(".panelCollapse").each(function () {
                    if ($(this).data('status') != undefined) {
                        var panelstatusId = $(this).data('status');
                        if ($(".expandpanel-" + panelstatusId + ":first").hasClass('collapsed')) {
                            //console.log(panelstatusId);
                            $(".expandpanel-" + panelstatusId).each(function (event) {
                                $('#dvTaskStatus-' + panelstatusId).hide();
                                $(".expandpanel-" + panelstatusId).removeClass('collapsed');
                            });
                        }
                    }
                });
                $("#txtSearch").val('');
            },
            error: function (response) {
                //alert(response.responseText);
            },
            complete: function (data) {
                //console.log(data);
            }
        });
        if (ProjectType == Enum_Scrum_ProjectType) {
            $.ajax({
                type: "POST",
                url: urlGetSprintDueDate,
                data: '{ "SprintId": "' + sprintId + '"}',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    $("#dueDate").text('');
                    //console.log(data.DueDate);
                    var d = new Date(parseInt(data.DueDate.substr(6)));
                    var dateString = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
                    $("#dueDate").text(dateString);
                },
                error: function (response) {
                    //alert(response.responseText);
                }
            });
        }
    });
    $("#ddlWork").change(function () {
        if ($(this).val() == 0) {
            $(".all-team-member").hide();
            //$("#ddlTeamMember").hide();
            filterSearch(urlMyTasks, false);
        }
        if ($(this).val() == -1) {
            //$("#ddlTeamMember").show();
            $(".all-team-member").show();
            $("#txtSearch").val('');
            filterSearch(urlSearchTask, false);
        }
        if ($(this).val() == 1) {
            //$("#ddlTeamMember").show();
            $(".all-team-member").show();
            $("#txtSearch").val('');
            filterSearch(urlSearchTask, true);
        }
    });
    $(".btnGo").click(function () {
        //$(this).prev('div').removeClass('open');
        filterSearch(urlSearchTask, false);
    });
    $(".AddTask").click(function () {
        Edit = false;
        AddEditTask(ProjectId, 0, false);
    });
    $(document).on("click",".panelCollapse",function () {
        //statusPanelCount = statusPanelCount - 1;
        //panelWidth = (statusPanelCount * 330);
        //$(".task-data-panel-con").attr('style', 'width:' + (panelWidth + (totalStatusCount-statusPanelCount)*55) + "px;");
        var statusId = $(this).data('status');
        $(".expandpanel-" + statusId).addClass('collapsed');        
        //$(".collapsepanel-" + statusId).removeClass('hidden');
        $(".mHorizontalScroll").mCustomScrollbar("update");
        $(".status-panel-title").attr('style', 'width:' + ($(".mHorizontalScroll").height() - 60) + "px;");
        $("#taskCount-" + statusId).show();
        
    });
    $(document).on("click",".panelExpand",function () {
        //statusPanelCount = statusPanelCount + 1;
        //panelWidth = (statusPanelCount * 330);
        //$(".task-data-panel-con").attr('style', 'width:' + (panelWidth + (totalStatusCount - statusPanelCount) * 55) + "px;");
        var statusId = $(this).data('status');
        $(".expandpanel-" + statusId).removeClass('collapsed');
        //$(".collapsepanel-" + statusId).addClass('hidden');
        $(".mHorizontalScroll").mCustomScrollbar("update");
        $(".status-panel-title").removeAttr('style');
        $("#taskCount-" + statusId).hide();
    });
    //$(".editTask").on('click',function () {
    //    Edit = true;
    //    AddEditTask(ProjectId, $(this).attr('id'), true);
    //});
});

function filterSearch(URL, isRecentUpdate) {
    var SearchValue = $("#txtSearch").val();
    var taskTypeId = $("#TaskTypeId").val();
    if (taskTypeId == "")
        taskTypeId = 0;
    var SprintId = $("#ddlSprint").val();
    if (SprintId == undefined) {
        SprintId = 0;
    }
    var Arr_TeamMembers = new Array();
    Arr_TeamMembers = $("#ddlTeamMember").val();
    if (Arr_TeamMembers != null) {
        Arr_TeamMembers = Arr_TeamMembers.filter(function (el) {
            return el !== 'multiselect-all';
        });
    }

    $.ajax({
        type: "POST",
        url: URL,
        data: '{ "ProjectId": "' + ProjectId + '","SearchKey": "' + SearchValue + '","TaskTypeID": "' + 0 + '","SprintId":"' + SprintId + '","isRecentUpdate":"' + isRecentUpdate + '","teamMember":"' + Arr_TeamMembers + '"}',
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#dvDashboard").html(data);
            height = $(window).height();
            $(".kanban-dashboard-con").attr('style', 'height:' + parseInt(height - 225) + "px;");            
            $(".kanban-task-con .task-panel-list").attr('style', 'height:' + parseInt(height - 350) + "px;");
            $(".kanban-task-con .task-data-panel").attr('style', 'height:' + parseInt(height - 242) + "px;");
            assignScroll();
            $("#dvNewTaskStatus").hide();
            $("#lnkAddStatus").show();
            $(".js-example-basic-multiple").multiselect("refresh");
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
            //initializeEvents();           
        },
        error: function (response) {
            //alert(response.responseText);
        },
        complete: function (data) {
            //console.log(data);
        }
    });
}
//function initializeEvents() {
//    $(".AddTask").unbind('click');
//    $(".AddTask").click(function () {
//        AddEditTask(ProjectId, 0, false);
//    });

//}
function AddEditTask(ProjectId, TaskId, IsEdit) {
    var sprintId = 0;
    if ($("#ddlSprint") != undefined && $("#ddlSprint").val() != undefined)
        sprintId = $("#ddlSprint").val();
    $.ajax({
        type: "POST",
        url: urlAddNewTask,
        data: '{ "IsEdit":' + IsEdit + ',"ProjectID": ' + ProjectId + ',"TaskId":' + TaskId + ',"SprintId":' + sprintId + '}',
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (IsEdit) {
                VerifyStatus(TaskId);
            }
            else
                Edit = false;
            $("#AddTaskModal").empty().html(data);
            if (IsEdit) {
                AddThumbnails(TaskId);
            }
        }
    });
}
function AddThumbnails(TaskID) {

    $.ajax({
        type: "POST",
        url: "/Task/GetAttachments",
        data: '{ "TaskID":"' + TaskID + '"}',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            var Result = data.Data;
            var ImagePath;
            $.each(Result, function () {
                var image = new Image();
                var path = $(this)[0].Path;
                image.src = '../Documents/Task/Thumbnail/' + $(this)[0].Path;
                var Doc_Name = $(this)[0].DocumentName;
                $.get(image.src).done(function () {
                    ImagePath = image.src;

                    $('<div class="ClsThumbnail"><img src="' + ImagePath + '" width="100px" height="100px" data-OriginalPath="' + path + '" data-toggle="tooltip" title="Click to download"/> <span>' + Doc_Name + '</span></div>').appendTo($(".upload-drop-zone"));
                }).fail(function () {
                    var Extension = getFileExtension(path);
                    if (Extension.indexOf("txt") >= 0)
                        ImagePath = "../Images/FileIcon_txt.png";
                    else if (Extension.indexOf("doc") >= 0 || Extension.indexOf("docx") >= 0)
                        ImagePath = "../Images/FileIcon_Word.png";
                    else if (Extension.indexOf("xls") >= 0 || Extension.indexOf("xlsx") >= 0)
                        ImagePath = "../Images/FileIcon_Excel.png";
                    else if (Extension.indexOf("pdf") >= 0)
                        ImagePath = "../Images/FileIcon_pdf.png";
                    else
                        ImagePath = "../Images/thumbnail-default.jpg";

                    $('<div class="ClsThumbnail"><img src="' + ImagePath + '" width="100px" height="100px" data-OriginalPath="' + path + '"  data-toggle="tooltip" title="Click to download" /> <span>' + Doc_Name + '</span></div>').appendTo($(".upload-drop-zone"));
                })
            });

        }
    });

}

function getFileExtension(name) {
    var found = name.lastIndexOf('.') + 1;
    return (found > 0 ? name.substr(found) : "");
}
function VerifyStatus(TaskID) {
    $.ajax({
        type: "POST",
        url: "/Task/VerifyStatus",
        data: '{ "TaskID":' + TaskID + '}',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            Edit = data;
        },
        error: function (response) {
            alert(response.responseText);
        }
    });

}
function NewSprintDialog(IsIteration) {
    $('#uprgsMaster').css('visibility', 'visible');
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
            $('#uprgsMaster').css('visibility', 'hidden');
        }
    });
}
function assignScroll() {
    if ($(".mCustomBoardScrollbar").length > 0) {
        $(".mCustomBoardScrollbar").mCustomScrollbar({
            scrollButtons: { enable: false },
            scrollbarPosition: "inside",
            
            advanced: {
                updateOnBrowserResize: true,
                updateOnContentResize: true
            },
            scrollInertia: 200,


        });
    }
}
function setContainerHeight() {
    var height = $(window).height();
    var width = $(window).width();
    var panelWidth = 330 * statusPanelCount;
    //console.log(height);
    $(".kanban-dashboard-con").attr('style', 'height:' + parseInt(height - 225) + "px;");
    //$(".kanban-task-con").attr('style', 'width:' + parseInt(width - 100) + "px;");
    $(".kanban-task-con .task-panel-list").attr('style', 'height:' + parseInt(height - 330) + "px;");
    //$(".task-data-panel-con").attr('style', 'width:' + panelWidth + "px;");
    $(".kanban-task-con .task-data-panel").attr('style', 'height:' + parseInt(height - 242) + "px;");
    $(".task-data-panel.collapsed").attr('style', 'height:' + parseInt(height - 242) + "px;");
}

//function timerIncrement() {
//    idleTime = idleTime + 1;

//    if (idleTime > 1) { // 20 minutes
//        window.location.reload();
//    }
//}