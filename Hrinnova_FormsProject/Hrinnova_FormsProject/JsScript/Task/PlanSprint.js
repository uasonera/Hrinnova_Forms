/// <reference path="../Constant/Constant.js" />

$(document).ready(function () {
    var fromStatus = "";
    var fromstory = "";
    var fromtype = "";
    var isStory = "";
    var fromsprintName = "";
    var fromtypeTask = "";
    var fromStoryId = 0;
    var taskinvalid = false;

    $(".AddTask").on('click', function () {
        $('#uprgsMaster').css('visibility', 'visible');
        AddEditTask(ProjectId, 0, false);
    });
    $(document).on("click", ".ClsThumbnail", function () {
        window.location = filepath + "?FileWithPath=" + $(this).find('img').attr('data-originalpath');
    });
    $(document).on("click", ".editTask", function () {
        AddEditTask(ProjectId, $(this).attr('id'), true);
    });

    changesprinttype();
    //ohSnap('Oh Snap! Task of this Story has been moved to In Progress so you can not move story.', 'red');
    //if (sprintCount > 0) {

    initSort($('.connectedSortable'));
    // [Vihang - 20151118 1854] :- Allow user to select multiple tasks on sprint board
    // Note: Commenting this functionality temporary, till the finalisation of applicable actions on selected tasks
    //initMultipleSelection($('.connectedSortable'));
    //-- [Vihang - 20151118 1854] :- Allow user to select multiple tasks on sprint board

    //}   

    storyAccordion();
    setScrollHeight();
    DeleteTask();
    DeleteStory();
    $(window).keydown(function (e) {
        if ((e.which || e.keyCode) == 116) $("#drpSprintTypes").val('2');
    });
    $(window).bind('beforeunload', function () {
        $("#drpSprintTypes").val('2');
    });
    $(".AddStories").click(function () {
        GetStories(ProjectId);
    });
    $(".AddTaskToStories").click(function () {
        GetStoriesAndTasks(ProjectId);
    });
    $(".AddAssigneeToTasks").click(function () {
        GetTasksAndAssignees(ProjectId);
    });
    $(".SearchTaskButton").click(function () {
        $.ajax({
            type: "POST",
            url: urlSearchProductBacklog,
            data: '{ "ProjectId":' + ProjectId + ', "SearchKey":"' + $("#txtSearchProductBacklog").val() + '"}',
            dataType: "html",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $("#dvPlanSprintView").empty().html(data);
                storyAccordion();
            }
        });

    });
    setScrolling();

    $(".product-backlog-container").on("hover", function () {
        console.log("Start");
    });
});
function changesprinttype() {
    $("#drpSprintTypes").on('change', function () {
        $('#uprgsMaster').css('visibility', 'visible');
        var CurrentSprint = $(this).val();
        $.ajax({
            type: "POST",
            url: urlGetSprintByType,
            dataType: 'html',
            data: "{'CurrentSprint':'" + CurrentSprint + "','ProjectId':'" + ProjectId + "'}",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $('#SprintRightPanel').html(data);
                setScrolling();
                setScrollHeight();
                $('#uprgsMaster').css('visibility', 'hidden');
                ////$('#uprgsMaster').hide();
                bindAllEvents();
                $('[data-toggle="tooltip"]').tooltip({ 'placement': 'bottom' });
            },
            error: function (data) {
                //$('#uprgsMaster').hide();
            }
        });
    });
}
function initSort(element) {
    //var zindex = 10;
    //$(".connectedSortable li").draggable({
    //    revert: "invalid",
    //    cancel: '.notsortNewTask',
    //    scroll: true,
    //    forcePlaceholderSize: true,
    //    start: function (event, ui) {            
    //        isValid = true;
    //        taskinvalid = false;
    //        isStoryValid = true;

    //        $(this).attr('style', 'z-index:9');
    //        //$(window).scrollTop($(this).offset().top);
    //        //$(".highlights").attr('style', ' border: 1px dashed #808080 !important;');
    //        //$(".highlights li").attr('style', 'height:100px;');
    //        fromStatus = $(this).parent('ul').data('status');
    //        fromstory = $(this).parent('ul').data('story');
    //        fromtype = $(this).parent('ul').data('tasktype');
    //        isStory = $(this).parent('ul').data('isstory');

    //        fromtypeTask = $(this).data('typetask');
    //        var level = $(this).parent('ul').data('level');

    //        var index = $(this).index();
    //        startindex = index;
    //        sourceLI = $(this);           

    //        fromsprintName = $(this).parent('ul').data('sprintname');
    //        //console.log("Type Value:" + fromtypeTask);
    //        if (fromtypeTask != 1) {
    //            $(".innerul").hide();
    //            $(".storybacklogover").show(); //old
    //            $(".storybacklogover .highlights").attr('style', 'border: 1px dashed #808080 !important;');
    //            $(".storybacklogover .highlights").children('li').attr('style', 'height:50px;');


    //            //$(".sprintbacklogover").hide(); //old
    //            //$(".sprintbacklogover highlights").removeAttr('style');
    //            //$(".sprintbacklogover highlights").children('li').removeAttr('style');
    //        }
    //        else {
    //            $(".sprintbacklogover").show();//old
    //            $(".sprintbacklogover .highlights").attr('style', 'border: 1px dashed #808080 !important;');
    //            $(".sprintbacklogover .highlights").children('li').attr('style', 'height:50px;');
    //            //$(".storybacklogover").hide();//old
    //            //$(".panel-body").hide();//old
    //            //$(".storybacklogover highlights").removeAttr('style');
    //            //$(".storybacklogover highlights").children('li').removeAttr('style');
    //            //$(".panel-body highlights").removeAttr('style');
    //            //$(".panel-body highlights").children('li').removeAttr('style');

    //        }
    //        sprintId = $(this).parent('ul').data('sprintid');

    //        //setDragHandle(fromtype, sprintId, level);
    //        if (fromtype == 2) {
    //           // $(this).parent('ul').parent('div').next('ul').hide();
    //            var isValidSort = $(this).parent('ul').data('isvalidsort');
    //            //console.log("Is Story Valid:" + isValidSort);
    //            if (isValidSort == false || isValidSort == 'False') {
    //                isStoryValid = false;
    //                //$(".sprintbacklogover").hide();//old                                       
    //                toastr.error("This story has in progress tasks so you are not allowed to move story.");
    //            }
    //        }
    //        else {
    //            if ($(this).parent('ul').data('level') != 1) {
    //                $(".productbacklogoverfirst").show();//old
    //                $(".productbacklogoverfirst .highlights").attr('style', 'border: 1px dashed #808080 !important;');
    //                $(".productbacklogoverfirst .highlights").children('li').attr('style', 'height:50px;');
    //                //$(".productbacklogoverfirst highlights").removeAttr('style');
    //                //$(".productbacklogoverfirst highlights").children('li').removeAttr('style');
    //            }
    //        }
    //        //
    //        if (sprintId == 0) {
    //            if ($(this).data('level') == 1) {
    //                $(".productbacklogover").show();
    //                $(".productbacklogover .highlights").attr('style', 'border: 1px dashed #808080 !important;');
    //                $(".productbacklogover .highlights").children('li').attr('style', 'height:50px;');
    //            }
    //        }
    //        else {
    //            $(".productbacklogover").show();
    //            $(".productbacklogover .highlights").attr('style', 'border: 1px dashed #808080 !important;');
    //            $(".productbacklogover .highlights").children('li').attr('style', 'height:50px;');
    //        }
    //        //$(this).draggable("option", "cursorAt", {
    //        //    top: 20
    //        //});

    //        var level = $(this).parent('ul').data('level');
    //        //console.log("level:" + level);
    //        $(this).parent('ul').show();
    //        if (level == 1) {
    //            $(this).parent('ul').parent('div').parent('li').parent('ul').parent('div').show();
    //        }
    //    },
    //    stop: function (event,ui) {
    //        //console.log("Stop");
    //        //if (isSortValid == false)
    //        //    $(this).parent('ul').sortable("cancel");
    //        //$(".sprintbacklogover").removeAttr('style');
    //        //$(".productbacklogover").removeAttr('style');
    //        //$(".storybacklogover").removeAttr('style');
    //        //$(".productbacklogoverfirst").removeAttr('style');
    //        $(".highlights").removeAttr('style');
    //        $(".highlights li").removeAttr('style');

    //        $(".sprintbacklogover").show();
    //        $(".productbacklogover").show();
    //        $(".productbacklogoverfirst").show();
    //        $(".storybacklogover").show();
    //        $(".panel-body").show();
    //        $(".innerul").show();
    //        if (sprintId == 0) {
    //            var searchKey = $("#txtSearchProductBacklog").val();
    //            $.ajax({
    //                type: "POST",
    //                url: urlSearchProductBacklog,
    //                dataType: 'html',
    //                data: "{'ProjectId':'" + ProjectId + "','SearchKey':'" + searchKey + "'}",
    //                contentType: "application/json; charset=utf-8",
    //                success: function (data) {
    //                    $('#dvPlanSprintView').html(data);
    //                    bindAllEvents();
    //                }
    //            });
    //        }
    //        if (taskinvalid) {
    //            toastr.error("A task/bug/improvement cannot be directly added to a sprint. Please create a Story, add to sprint and then assign the work item to the Story under the Sprint.");
    //        }
    //    }
    //});
    //$(".highlights").droppable({
    //    activeClass: "ui-state-default",
    //    hoverClass: "ui-state-hover",
    //    tolerance: "pointer",
    //    drop: function (event, ui) {
    //        console.log("Receive");
    //        $(".sprintbacklogover").show();
    //        $(".productbacklogover").show();
    //        $(".productbacklogoverfirst").show();
    //        $(".storybacklogover").show();

    //        $(".panel-body").show();
    //        $(".innerul").show();

    //        var targetList = $(this);
    //        var index = $(this).index();
    //        var myLi = $(this);
    //        var WBSLI = myLi[index];
    //        var sprintid = $(this).data('sprintid');
    //        if (sprintid == undefined)
    //            sprintid = 0;
    //        var storyID = targetList.data('storyid');
    //        if (storyID == undefined)
    //            storyID = 0;
    //        //console.log(sprintid + "&" + sourceLI.attr('id'));
    //        //console.log(targetList.data('id'));
    //        //console.log("Start Index:" + startindex);
    //        var isValid = true;
    //        var type = targetList.data('tasktype');
    //        if (startindex != null && type == 2) {
    //            //var sourceLi = sourceList.find("li");
    //            var SourceWBSLI = sourceLI[startindex];
    //            if (fromtypeTask != 1) {
    //                if (storyID == 0) {
    //                    console.log("Task Invalid");
    //                    taskinvalid = true;
    //                    isValid = false;
    //                }
    //            }
    //        }
    //        if (type == 1) {
    //            //cancel sorting if task of any particular story has been moved except from outside ul in product backlog
    //            var isOutSideStory = $(this).data('isoutsidestory');
    //            if (isOutSideStory == 0)
    //                isValid = false;
    //        }
    //        if (isValid && isStoryValid) {
    //            var toStatus = $(this).data('status');
    //            var toStory = $(this).data('story');
    //            var tosprintName = $(this).data('sprintname');
    //            $.ajax({
    //                type: "POST",
    //                url: urlUpdateStatus,
    //                data: '{ "TaskStatusId": "' + targetList.data('id') + '","WBSID": "' + sourceLI.attr('id') + '","ProjectId":"' + ProjectId + '","SprintId":"' + sprintid + '","StoryID":"' + storyID + '"}',
    //                dataType: "html",
    //                contentType: "application/json; charset=utf-8",
    //                success: function (data) {                       
    //                    console.log("From Type:" + fromtype);
    //                    console.log("To Type:" + type);
    //                    console.log("From Story:" + fromstory);
    //                    console.log("To Story:" + toStory);
    //                    console.log("From Sprint Name:" + fromsprintName);
    //                    console.log("To Sprint Name:" + tosprintName);
    //                    if (fromtype == 2 && type == 2) {
    //                        if (isStory == 1) {
    //                            //console.log("From Sprint Name:" + fromsprintName);
    //                            //console.log("To Sprint Name:" + tosprintName);
    //                            if (tosprintName != undefined && fromsprintName != undefined) {
    //                                toastr.success("Task has been Successfully moved from " + fromsprintName + " to " + tosprintName + ".");
    //                            }
    //                        }
    //                        else {
    //                            if (toStory != undefined && fromstory != undefined) {
    //                                toastr.success("Task has been Successfully moved from " + fromstory + " to " + toStory + ".");
    //                            }
    //                        }
    //                    }
    //                    else if (fromtype == 1 && type == 1) {
    //                        toastr.success("Task has been Successfully moved.");
    //                    }
    //                    else {
    //                        if (toStory != undefined && fromstory != undefined) {
    //                            toastr.success("Task has been Successfully moved from " + fromStatus + " to " + toStatus + ".");
    //                        }
    //                    }
    //                    $("#dvPlanSprintView").html(data);
    //                    var CurrentSprint = $("#drpSprintTypes").val();
    //                    $.ajax({
    //                        type: "POST",
    //                        url: urlGetSprintByType,
    //                        dataType: 'html',
    //                        async: false,
    //                        data: "{'CurrentSprint':'" + CurrentSprint + "','ProjectId':'" + ProjectId + "'}",
    //                        contentType: "application/json; charset=utf-8",
    //                        success: function (data) {
    //                            $('#SprintRightPanel').html(data);
    //                            bindAllEvents();
    //                        }
    //                    });
    //                },
    //                error: function (response) {
    //                    //alert(response.responseText);
    //                }
    //            });

    //        }
    //        else {
    //            isSortValid = false;
    //            //$(ui.sender).sortable("option", "revert", true);
    //        }
    //    }
    //});
    
    element.sortable({
        cursor: "move",
        cancel: '.notsortNewTask',
        scroll: true,
        connectWith: '.connectedSortable',
        items: 'li',
        opacity: 1.00,
        forcePlaceholderSize: true,
        start: function (event, ui) {
            isValid = true;
            taskinvalid = false;
            isStoryValid = true;
            fromStatus = $(this).data('status');
            fromstory = $(this).data('story');
            fromStoryId = $(this).parent('div').parent('li').attr('id');
            fromtype = $(this).data('tasktype');
            if (fromtype == 1)
                fromstory = $(WBSLI).data('story');
            fromsprintName = $(this).data('sprintname');
            sprintId = $(this).data('sprintid');
            //$(this).parent('div').attr('style', 'position:inherit;');
            //$(this).parent('div').parent('div').attr('style', 'position:inherit;');

            //console.log("Start"); 
            //ui.placeholder.html(ui.item.html());
            sourceList = $(this);
            var index = ui.item.index();
            startindex = index;
            sourceLI = $(this).children("li");
            var WBSLI = sourceLI[index];
            isStory = $(this).data('isstory');

            //console.log("Type Value:" + WBSLI.value);
            if (ProjectType == Enum_Scrum_ProjectType) {
                if (WBSLI.value != 1) {
                    $(".innerul").hide();
                    $(".storybacklogover").show();
                    $(".storybacklogover").attr('style', 'border: 1px dashed #808080 !important;');
                    $(".storybacklogover").addClass('drag-drop-box');
                    $(".sprintbacklogover").hide();
                }
                else {
                    $(".sprintbacklogover").show();
                    $(".sprintbacklogover").attr('style', 'border: 1px dashed #808080 !important;');
                    $(".sprintbacklogover").addClass('drag-drop-box');
                    $(".storybacklogover").hide();
                    $(".task-panel-list").hide();
                    $('.innerul').show();
                }
            }
            else {
                if (WBSLI.value == Enum_SubTaskType) {
                    $(".innerul").hide();
                    $(".storybacklogover").show();
                    $(".storybacklogover").attr('style', 'border: 1px dashed #808080 !important;');
                    $(".storybacklogover").addClass('drag-drop-box');
                    $(".sprintbacklogover").hide();
                }
                else {
                    $(".sprintbacklogover").show();
                    $(".sprintbacklogover").attr('style', 'border: 1px dashed #808080 !important;');
                    $(".sprintbacklogover").addClass('drag-drop-box');
                    $(".storybacklogover").hide();
                    $(".task-panel-list").hide();
                    $('.innerul').show();
                }
            }
            if (fromtype == 2 && ProjectType == Enum_Scrum_ProjectType) {
                // $(this).next('div').hide();
                var isValidSort = $(WBSLI).data('isvalidsort');
                //console.log("Is Story Valid:" + isValidSort);
                if (isValidSort == false || isValidSort == 'False') {
                    isStoryValid = false;
                    $(".sprintbacklogover").hide();
                    toastr.error(String.format(Constant.MoveParentTask, "Story"));
                }
            }
            else if (fromtype == Enum_TaskType && ProjectType == Enum_Iterative_ProjectType) {
                var isValidSort = $(WBSLI).data('isvalidsort');
                //console.log("Is Story Valid:" + isValidSort);
                if (isValidSort == false || isValidSort == 'False') {
                    isStoryValid = false;
                    $(".sprintbacklogover").hide();
                    toastr.error(String.format(Constant.MoveParentTask, "Task"));
                }
            }
            else {
                if ($(this).data('level') == 1) {
                    $(".productbacklogoverfirst").show();
                    // $(".productbacklogoverfirst").children('ul').children('li').attr('style', 'width: 571px;top: 50px;position: absolute;z-index: 9999;');
                    $(".productbacklogoverfirst").attr('style', 'border: 1px dashed #808080 !important;');
                    $(".productbacklogoverfirst").addClass('drag-drop-box');
                }
            }

            if (sprintId == 0 || sprintId == undefined) {
                if ($(this).data('level') == 1) {
                    //$(this).parent('div').next(".storybacklogover").hide();
                    $(".productbacklogover").show();
                    $(".productbacklogover").children('ul').children('li').attr('style', 'width: 571px;top: 10px;position: absolute;z-index: 9999;');
                    $(".scrollHeight").attr('style', 'height:0px;');
                    $(".productbacklogover").attr('style', 'border: 1px dashed #808080 !important');
                    $(".productbacklogover").addClass('drag-drop-box');
                }
            }
            else {
                if ($(this).data('level') == 1) {
                    //$(this).parent('div').next(".storybacklogover").hide();
                }
                $(".productbacklogover").show();
                $(".productbacklogover").children('ul').children('li').attr('style', 'width: 571px;top: 10px;position: absolute;z-index: 9999;');
                $(".scrollHeight").attr('style', 'height:0px;');
                $(".productbacklogover").attr('style', 'border: 1px dashed #808080 !important');
                $(".productbacklogover").addClass('drag-drop-box');
            }
            var level = $(this).data('level');
            //console.log("level:" + level);
            $(this).show();
            if (level == 1) {
                $(this).parent('div').parent('li').parent('ul').parent('div').show();
            }

            //var start_pos = ui.item.index();
            //ui.item.data('start_pos', start_pos);
        },
        receive: function (event, ui) {
            //console.log("Receive");
            setScrollHeight();
            $(".productbacklogover").children('ul').children('li').removeAttr('style');
            $(".task-panel-list").show();
            $(".innerul").show();
            //$(".sprintbacklogover").removeAttr('style');
            //$(".productbacklogover").removeAttr('style');
            //$(".storybacklogover").removeAttr('style');
            //$(".productbacklogoverfirst").removeAttr('style');

            var sourceList = ui.sender;
            var targetList = $(this);
            //console.log("Source:" + sourceList.data('id'));
            //console.log("Target:" + targetList.data('id'));
            var index = ui.item.index();
            targetIndex = index;
            //console.log(targetIndex);
            var myLi = $(this).children("li");
            var WBSLI = myLi[index];
            Tosprintid = $(this).data('sprintid');
            if (Tosprintid == undefined)
                Tosprintid = 0;
            var storyID = targetList.data('storyid');
            if (storyID == undefined)
                storyID = 0;
            var isValid = true;
            var type = targetList.data('tasktype');
            if (startindex != null && type == 2 && ProjectType == Enum_Scrum_ProjectType) {
                //var sourceLi = sourceList.find("li");
                var SourceWBSLI = sourceLI[startindex];
                if (SourceWBSLI.value != 1) {
                    if (storyID == 0) {
                        // console.log("Task Invalid");
                        taskinvalid = true;
                        isValid = false;
                    }
                }
            }

            if (startindex != null && type == Enum_SubTaskType && ProjectType == Enum_Iterative_ProjectType) {
                //var sourceLi = sourceList.find("li");
                var SourceWBSLI = sourceLI[startindex];
                if (storyID == 0) {
                    // console.log("Task Invalid");
                    taskinvalid = true;
                    isValid = false;
                }
            }
            if (Tosprintid == 0) {

                if (fromStoryId == storyID) {
                    isValid = false;
                }
            }
            if (type == 1 && ProjectType == Enum_Scrum_ProjectType) {
                //cancel sorting if task of any particular story has been moved except from outside ul in product backlog
                //var isOutSideStory = $(this).data('isoutsidestory');
                //if (isOutSideStory == 0)
                //    isValid = false;
                $(".highlights").hide();
            }
            if (type == 2 && ProjectType == Enum_Iterative_ProjectType) {
                //cancel sorting if task of any particular story has been moved except from outside ul in product backlog
                //var isOutSideStory = $(this).data('isoutsidestory');
                //if (isOutSideStory == 0)
                //    isValid = false;
                $(".highlights").hide();
            }
            if (isValid && isStoryValid) {
                //console.log("In Sort");
                var toStatus = $(this).data('status');
                var toStory = $(this).data('story');
                if (fromtype == 1 && ProjectType == Enum_Scrum_ProjectType)
                    toStory = $(WBSLI).parent('ul').data('story');
                if (fromtype == 2 && ProjectType == Enum_Iterative_ProjectType)
                    toStory = $(WBSLI).parent('ul').data('story');
                var tosprintName = $(this).data('sprintname');
                //console.log("From Sprint:" + sprintId);
                //console.log("To Sprint:" + Tosprintid);
                //console.log("From Story:" + fromStoryId);
                //console.log("To Story:" + storyID);
                manageSprintAccordion();
                if (sprintId != Tosprintid || fromStoryId != storyID) {
                    $.ajax({
                        type: "POST",
                        url: urlUpdateStatus,
                        data: '{ "TaskStatusId": "' + targetList.data('id') + '","WBSID": "' + WBSLI.id + '","ProjectId":"' + ProjectId + '","SprintId":"' + Tosprintid + '","StoryID":"' + storyID + '"}',
                        dataType: "html",
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {
                        
                            if (fromtype == 2 && type == 2) {
                                if (isStory == 1) {                                   
                                    if (tosprintName != undefined && fromsprintName != undefined && tosprintName != fromsprintName) {
                                        toastr.success(String.format(Constants.MoveTaskSuccess, fromsprintName, tosprintName));
                                    }
                                }
                                else {
                                    if (toStory != undefined && fromstory != undefined && toStory != fromstory) {
                                        toastr.success(String.format(Constants.MoveTaskSuccess, fromstory, toStory));
                                    }
                                }
                            }

                            else if (fromtype == 1 && type == 1 && sourceList.data('level') != targetList.data('level')) {
                                toastr.success("Task has been Successfully moved.");
                            }
                            else if (fromtype == 1 && type == 1) {
                                if (toStory != undefined && fromstory != undefined) {
                                    toastr.success(String.format(Constants.MoveTaskSuccess, fromstory, toStory));
                                }
                            }
                            else {
                                if (toStatus != undefined && fromStatus != undefined && toStatus != fromStatus) {
                                    toastr.success(String.format(Constants.MoveTaskSuccess, fromStatus, toStatus));
                                }
                            }
                            $("#dvPlanSprintView").html(data);
                            setScrolling();
                            setScrollHeight();
                            var CurrentSprint = $("#drpSprintTypes").val();
                            $.ajax({
                                type: "POST",
                                url: urlGetSprintByType,
                                dataType: 'html',
                                async: false,
                                data: "{'CurrentSprint':'" + CurrentSprint + "','ProjectId':'" + ProjectId + "'}",
                                contentType: "application/json; charset=utf-8",
                                success: function (data) {
                                    $('#SprintRightPanel').html(data);
                                    
                                    setSprintAccordion(Tosprintid);
                                    setScrolling();
                                    setScrollHeight();
                                    bindAllEvents();
                                }
                            });
                        }
                    });
                }
                else {
                    return;
                }
            }
            else {
                isSortValid = false;              
            }
        },
        stop: function (event, ui) {          
            if (isSortValid == false)
                $(this).sortable("cancel");
            $(".productbacklogover").children('ul').children('li').removeAttr('style');
            setScrollHeight();
            $(".sprintbacklogover").removeAttr('style');
            $(".sprintbacklogover").removeClass('drag-drop-box');
            $(".productbacklogover").removeAttr('style');
            $(".productbacklogover").removeClass('drag-drop-box');
            $(".storybacklogover").removeAttr('style');
            $(".storybacklogover").removeClass('drag-drop-box');
            $(".productbacklogoverfirst").removeAttr('style');
            $(".productbacklogoverfirst").removeClass('drag-drop-box');
            $("#productbacklogoverfirst").hide();
            $(".sprintbacklogover").show();
            $(".productbacklogover").show();
            $(".productbacklogoverfirst").show();
            $(".storybacklogover").show();
            $(".task-panel-list").show();
            $(".innerul").show();
            var myLi = $(this).children('li');
            var TaskStatusId = "";
            for (var i = 0; i < myLi.length; i++) {
                TaskStatusId += myLi[i].id;
                if (i != myLi.length - 1)
                    TaskStatusId += ",";
            }
            storyId = $(this).data('storyid');
            //update sequence of child level.
            //console.log("Start Index:" + startindex);
            //console.log("Target Index:" + ui.item.index());
            var tIndex = ui.item.index();
            if (ui.item.index() == undefined)
                tIndex = 0;
            if (startindex != tIndex) {
                $.ajax({
                    type: "POST",
                    url: urlSetSubTaskOrder,
                    data: '{ "SequeceIdList": "' + TaskStatusId + '","StoryId": "0"}',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {

                    },
                    error: function (response) {
                        //alert(response.responseText);
                    }
                });
            }
            if (Tosprintid == undefined)
                Tosprintid = 0;
            if (startindex != tIndex || sprintId != Tosprintid || fromStoryId != storyId) {
                //if (sprintId == 0) {
                //    var searchKey = $("#txtSearchProductBacklog").val();
                //    $.ajax({
                //        type: "POST",
                //        url: urlSearchProductBacklog,
                //        dataType: 'html',
                //        async: false,
                //        data: "{'ProjectId':'" + ProjectId + "','SearchKey':'" + searchKey + "'}",
                //        contentType: "application/json; charset=utf-8",
                //        success: function (data) {
                //            $('#dvPlanSprintView').html(data);
                //            setScrolling();
                //            bindAllEvents();
                //        }
                //    });
                //}
                //else {
                //    var CurrentSprint = $("#drpSprintTypes").val();
                //    $.ajax({
                //        type: "POST",
                //        url: urlGetSprintByType,
                //        dataType: 'html',
                //        async: false,
                //        data: "{'CurrentSprint':'" + CurrentSprint + "','ProjectId':'" + ProjectId + "'}",
                //        contentType: "application/json; charset=utf-8",
                //        success: function (data) {
                //            $('#SprintRightPanel').html(data);
                //            setSprintAccordion();
                //            setScrolling();
                //            bindAllEvents();
                //        }
                //    });
                //}
                if (taskinvalid) {
                    toastr.error(Constants.NotAllowMoveTaskWithoutStory);
                }
            }

        }
    }).disableSelection();

}
// [Vihang - 20151118 1854] :- Allow user to select multiple tasks on sprint board
function initMultipleSelection(element) {
    element.on('click', 'li.type-task, li.type-sub-task', function (eventObject) {
        if (!eventObject.ctrlKey) {
            $('li.selected', element).not(this).removeClass('selected');
        }
        $(this).toggleClass('selected');
        eventObject.stopPropagation();
    });
};
//-- [Vihang - 20151118 1854] :- Allow user to select multiple tasks on sprint board
function storyAccordion() {
    $(".storyshow").unbind().click(function (event) {
        $(this).toggleClass('open');

        var storyID = $(this).data('id');
        $("#" + storyID).slideToggle('5000');
    });
}

function bindAllEvents() {
    initSort($('.connectedSortable'));
    storyAccordion();
    DeleteTask();
    DeleteStory();
    //$(".AddTask").click(function () {
    //    AddEditTask(ProjectId, 0, false);
    //});
    //$(".editTask").unbind('click');
    $(document).on("click", ".editTask", function () {

        AddEditTask(ProjectId, $(this).attr('id'), true);
    });

}
function GetStories(ProjectId) {
    $.ajax({
        type: "POST",
        url: urlGetStoriesAndSprints,
        data: '{ "ProjectId":' + ProjectId + '}',
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#AddStoriesModal").empty().html(data);
        }
    });
}
function GetStoriesAndTasks(ProjectId) {
    $.ajax({
        type: "POST",
        url: urlGetStoriesAndTasks,
        data: '{ "ProjectId":' + ProjectId + '}',
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#AddTaskToStoryModal").empty().html(data);
        }
    });
}
function GetTasksAndAssignees(projectId) {
    $.ajax({
        type: "POST",
        url: urlGetTasksAndAssignees,
        data: '{ "projectId":' + projectId + '}',
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#AddAssigneeToTaskModal").empty().html(data);
        }
    });
}
function AddEditTask(ProjectId, TaskId, IsEdit) {

    $.ajax({
        type: "POST",
        url: urlAddTask,
        data: '{ "IsEdit":' + IsEdit + ',"ProjectID": ' + ProjectId + ',"TaskId":' + TaskId + '}',
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (IsEdit) {
                VerifyStatus(TaskId);

            }
            else
                Edit = false;
            $("#AddTaskModal").empty().html(data);
            $('#uprgsMaster').css('visibility', 'hidden');
            if (IsEdit) {

                AddThumbnails(TaskId);
            }
            //$("#AddTaskModal").dialog({ // wire up the actual modal functionality and show the dialog
            //    width: 1020,
            //    height: 550,
            //    modal: true
            //});
            //$.validator.unobtrusive.parse($("#AddTaskModal"));
            //if (IsEdit)
            //    DisplayFiles(TaskId);
        },
        error: function (response) {
            alert(response.responseText);
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

            $(".upload-drop-zone:gt(1)").empty();
            $.each(Result, function () {
                
                var image = new Image();
                var path = $(this)[0].Path;
                var AttachmentID = $(this)[0].AttachmentID;
                var pathDefault = '../Documents/Task/';
                image.src = '../Documents/Task/Thumbnail/' + $(this)[0].Path;
                var Doc_Name = $(this)[0].DocumentName;
                $.get(image.src).done(function () {
                    ImagePath = image.src;

                    $('<div class="ClsThumbnail" id="divAttachment_' + AttachmentID + '"><a href="' + pathDefault + path + '" target="_blank" download><img src="' + ImagePath + '" width="70px" height="70px" data-OriginalPath="' + path + '" data-toggle="tooltip" title="click to download"/></a> <span>' + Doc_Name + '</span><br><button type="button" class="btn btn-danger btn-xs deleteTaskAttachment" data-attachmentName="' + Doc_Name + '"  data-attachmentId="' + AttachmentID + '"><i class="fa fa-trash no-margin"></i></button></div>').appendTo($(".upload-drop-zone"));
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

                    $('<div class="ClsThumbnail" id="divAttachment_' + AttachmentID + '"><a href="' + pathDefault + path + '" download><img src="' + ImagePath + '" width="70px" height="70px" data-OriginalPath="' + path + '"  data-toggle="tooltip" title="click to download"/></a> <span>' + Doc_Name + '</span><br><button class="btn btn-danger btn-xs deleteTaskAttachment" type="button" data-attachmentName="' + Doc_Name + '" data-attachmentId="' + AttachmentID + '"><i class="fa fa-trash no-margin"></i></button></div>').appendTo($(".upload-drop-zone"));
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
function DeleteTask() {
    //$(".deleteTask").unbind('click');
    $(".deleteTask").click(function () {
        var taskId = $(this).data('id');
        var isProductBackLog = $(this).data('isproductbacklog');
        var sprintType = $('#drpSprintTypes').val();
        if (confirm("Are you sure want to Delete Task?")) {
            deleteTask(taskId, isProductBackLog, sprintType, urlDeleteTask);
        }
    });
}
function DeleteStory() {
    //$(".deleteStory").unbind('click');
    $(".deleteStory").click(function () {
        var taskId = $(this).data('id');
        var isProductBackLog = $(this).data('isproductbacklog');
        var sprintType = $('#drpSprintTypes').val();
        var message = "Delete Story will remove their tasks also.Are you sure want to Delete Story?";
        if (ProjectType == Enum_Iterative_ProjectType) {
            message = "Delete Task will remove their sub tasks also.Are you sure want to Delete Task?"
        }
        if (confirm(message)) {
            deleteTask(taskId, isProductBackLog, sprintType, urlDeleteStory);
        }
    });
}
function deleteTask(taskId, isProductBackLog, sprintType, urlDelete) {
    $.ajax({
        type: "POST",
        url: urlDelete,
        data: '{ "WBSId": "' + taskId + '","isProductBacklog":"' + isProductBackLog + '","CurrentSprint":"' + sprintType + '","ProjectId":"' + ProjectId + '"}',
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (isProductBackLog) {
                $("#dvPlanSprintView").empty().html(data);
            }
            else {
                $("#SprintRightPanel").empty().html(data);
            }
            bindAllEvents();
        },
        error: function (response) {
            //alert(response.responseText);
        }
    });
}
function setDragHandle(taskType, sprintId, level, obj) {
    //if (taskType == 1 && sprintId == 0) {
    //    $(".productbacklogoverfirst .highlights").hide();
    //    $(".productbacklogover .highlights").hide();
    //    $(".storybacklogover .highlights").hide();

    //}
    //if (taskType != 1 && sprintId == 0 && level == 0) {
    //    $(".productbacklogoverfirst .highlights").hide();
    //    $(".productbacklogover .highlights").hide();
    //}
    if (sprintId != 0) {
        obj.draggable("option", "cursorAt", {
            top: 100
        });
    }
}

function setScrolling() {
    $(".mCustomScrollbar").mCustomScrollbar({
        scrollButtons: { enable: true },
        scrollbarPosition: "inside",
        advanced: {
            updateOnBrowserResize: true
        },
        callbacks: {
            onScroll: function () {
                //console.log("Scroll");
            }
        },
        mouseWheel: { scrollAmount: 100 }
    });
}
function manageSprintAccordion() {
    $(".sprintaccordion").each(function () {
        if (!$(this).hasClass("open")) {

            sprintAccordionIds.push($(this).data('id'));
        }
    });
}
function setSprintAccordion(Tosprintid) {   
    for (var i = 0; i < sprintAccordionIds.length; i++) {
        //console.log(sprintAccordionIds[i]);
     
        $("." + sprintAccordionIds[i]).removeClass("open");
        $("#" + sprintAccordionIds[i]).hide();
       
    }
    
    $("." + Tosprintid).addClass("open");
    $("#sprint-" + Tosprintid).show();
}
function setScrollHeight() {
    var height = $(window).height();
    $(".scrollHeight").attr('style', 'height:' + parseInt(height - 225) + "px;");
}