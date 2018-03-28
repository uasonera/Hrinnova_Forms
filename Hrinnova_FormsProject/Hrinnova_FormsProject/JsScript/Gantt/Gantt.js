var StartDate = "";
var EndDate = "";
/*Fired when right click on any row*/
function contextMenuOpen(args) {
    args.contextMenuItems.shift();
    args.contextMenuItems.push({ menuId: "MoveToBacklog", headerText: "Move to Backlog", eventHandler: MoveToBacklog, iconPath: "url(../images/icon_backlog.png)", cssClass: "customclass" });
    args.contextMenuItems.push({ menuId: "ViewDetails", headerText: "View Details", eventHandler: RedirectToTaskDetails, iconPath: "url(../images/icon_view.png)", cssClass: "customclass" });
}
/*Fired when right click on any row*/
/*Fired when clicking Contextmenu->View details*/
function RedirectToTaskDetails(args) {
    window.location.href = "../Task/ViewTask?TaskId=" + args.data.taskId;
}
/*Fired when clicking Contextmenu->View details*/
/*Fired when clicking Contextmenu->Move to Backlog*/
function MoveToBacklog(args) {
    $.ajax({
        type: "POST",
        url: "MoveTaskToBacklog",
        contentType: "application/json; charset=utf-8",
        data: "{ 'TaskID' : '" + args.data.item.TaskID + "'}",
        dataType: "json",
        success: function (e) {
            toastr.success("Task(s) have been moved to backlog successfully")
            $("#drpIterations").trigger("change");
            $.ajax({
                type: "POST",
                url: "GetListing",
                dataType: 'html',
                data: "",
                async: false,
                success: function (data) {
                    $("#WorkItemListing").html(data);

                    $("#WorkItemListing table").attr("id", "TaskListingTable");
                    $("#TaskListingTable").treegrid({});
                    $("#TaskListingTable").removeClass("multi-select");
                    $("#TaskListingTable").find('tr').each(function () {
                        $(this).find("td:eq(0)").remove();
                    });
                    $(".treegrid-row").each(function () {
                        if ($(this).data('child') == "1") {
                            var ParentID = $(this).data("parent-id");
                            $(this).insertAfter($(".treegrid-alfa-" + ParentID));
                            $(this).find("div.checkbox").remove();
                        }
                    });
                }
            });
        }
    })
}
/*Fired when clicking Contextmenu->Move to Backlog*/
/*Code to restirct editing certain columns*/
function BeginEdit(args) {
    if (args.columnIndex == 3) {
        $(args.cellElement).focusin(function (arg) {
            $("#" + arg.target.id).attr('maxlength', '30');
        });
    }
    if (args.columnIndex == 0 || args.columnIndex == 1 || args.columnIndex == 2 || args.columnIndex == 8 || args.columnIndex == 11 || args.columnIndex == 12 || args.columnIndex == 13 || args.columnIndex == 14)
        args.cancel = true;
}
/*Code to restirct editing certain columns*/
/*Fired at the start of any event*/
function ActionBegin(args) {
    if (args.requestType == "delete") {
        if (args.isDragAndDropDelete != true) {
            if (confirm("All the child tasks,if any will also get deleted? Are you sure you want to delete this task? ")) {
                TaskMethod(args.data.item, "DeleteWorkItem");
                if (args.data.hasChildRecords) {
                    deleteChildRecords(args.data);
                }
                toastr.success("Task has been deleted successfully");
            }
            else {
                args.cancel = true;
            }
        }
    }
    if (args.requestType == "beforeOpenEditDialog") {

        args.cancel = true;
        AddEditTask(ProjectId, args.data.taskId, true, args.data.item.SprintId);
        $('#AddTaskModal').modal('toggle');
    }
    if (args.requestType == "beforeOpenAddDialog") {
        args.cancel = true;
        AddEditTask(ProjectId, 0, false, $("#drpIterations").val());
        $('#AddTaskModal').modal('toggle');
    }
}
/*Fired at the start of any event*/
/*Fired at the start of Gantt being build*/
function load(args) {
    var col = this.getColumns();
    col[0].width = "50px";
    col[1].width = "150px";
    col[2].width = "90px";
    col[3].width = "90px";
    col[4].width = "150px";
    col[5].width = "70px";
    col[6].width = "70px";
    col[7].width = "90px";
    col[8].width = "90px";

    for (var i = 0; i < col.length; i++) {

        if (col[i].field == "work") {
            col[i].visible = true;
            col[i].width = "70px";
            col[i]["editParams"] = { decimalPlaces: 2 };
        }
        //if (col[i].field == "taskType") {
        //    col[i].visible = true;
        //    col[i].width = "95px";
        //}
    }


    //columns = { field: "isCritical", headerText: "Critical", allowEditing: false };
    //col.splice(13, 0, columns);
    CustomColumnIndex = col.indexOf(ej.TreeGrid.getColumnByField(col, "Priority"));
    if (CustomColumnIndex == -1)
    {
        col.splice(1, 0, { field: "Priority", headerText: "Priority", isTemplateColumn: true, templateID: "columnPriority", width: "55px", mappingName: "Priority" });
        col.splice(2, 0, { field: "Type", headerText: "Type", isTemplateColumn: true, templateID: "columnType", width: "50px", mappingName: "Type" });
        //col.splice(4, 0, { field: "EstimatedHours", headerText: "Hours", isTemplateColumn: true, templateID: "columnEstimatedHours", width: "55px" });
        col.splice(8, 0, { field: "Completed", headerText: "Progress", isTemplateColumn: true, templateID: "columnCompleted", width: "65px" });
        col[10].headerText = "Actual Start Date";
        col[11].headerText = "Actual End Date";
        var StatusData = ej.DataManager(StatusList).dataSource.json;
        col.splice(14, 0, { field: "Status", headerText: "Status", isTemplateColumn: true, editType: "dropdownedit", dropdownData: StatusData, editParams: { fields: { text: "DisplayValue", value: "TaskStatusId" } }, templateID: "columnStatus", width: "90px", mappingName: "Status" });
        var column = col[12];
        col.splice(12, 1);
        col.splice(7, 0, column);
        var columnPredecessor = col[10];
        col.splice(10, 1);
        col.splice(9, 0, columnPredecessor);

        var columnType = col[13];
        col.splice(13, 1);
        col.splice(10, 0, columnType);
    }
    else
    {
        col[0].width = "50px";
        col[1].width = "55px";
        col[2].width = "50px";
        col[3].width = "150px";
        col[4].width = "90px";
        col[5].width = "90px";
        col[6].width = "150px";
        col[8].width = "70px";
        col[9].width = "70px";
        col[12].width = "90px";
        col[13].width = "90px";
        col[12].headerText = "Actual Start Date";
        col[13].headerText = "Actual End Date";
    }
    

}
/*Fired at the start of Gantt build*/
/*Fired at the time of Gantt being build - for each cell*/
function queryCellinfo(args) {
    if (args.column.field == "Priority") {
        var obj = $.grep(PriorityList, function (n, i) {
            return n.PriorityId === parseInt(args.data.item.Priority);
        });
        $(args.cellElement).css({ "background-color": obj[0].ColorCode });
        $(args.cellElement).css({ "background": "url(../Content/ProjectManagementIcons/ProjectPriority/" + obj[0].IconPath + ") no-repeat", "background-position": "center center", 'background-size': '25px' });
        $(args.cellElement).children().html('');
        $(args.cellElement).attr("title", obj[0].Name);
    }
    if (args.column.field == "Type") {
        var obj = $.grep(WorkItemTypes, function (n, i) {
            return n.WorkItemName === args.data.item.Type;
        });
        $(args.cellElement).css({ "background": "url(../Content/ProjectManagementIcons/WorkItem/" + obj[0].IconName + ") no-repeat", "background-position": "center center", 'background-size': '25px' });
        $(args.cellElement).children().html('');
        $(args.cellElement).attr("title", obj[0].WorkItemName);
    }
}
/*Fired at the time of Gantt being build - for each cell*/
/*Fired at the time of Dropping the row*/
function rowDragStop(args) {
    var cloneData = $.extend({}, args.draggedRow.item);
    cloneData = args.draggedRow.item;
    cloneData.ParentID = args.targetRow.item[args.model.taskIdMapping];
    if (args.requestType == "insertAbove" || args.requestType == "insertBelow") {
        cloneData[args.model.parentTaskIdMapping] = args.targetRow.item[args.model.parentTaskIdMapping];
    }
     
    TaskMethod(cloneData, "Update");
    var Position = $(document).scrollTop();

    RefreshGantt();
}
/*Fired at the time of Dropping the row*/
/*Call if Gantt needs to be refreshed*/
function RefreshGantt() {
    $(selector).click(function (e) {
        e.preventDefault();

    });
    var position = $(window).scrollTop();
    $.ajax({
        type: "POST",
        url: "gantt",
        dataType: 'html',
        data: "{'Iteration':'" + parseInt($("#drpIterations").val()) + "'}",
        beforeSend: function () {
            ShowProgress();
        },
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#TaskListing").empty().html(data);
            ej.widget.init($("#TaskListing"));
            HideProgress();
            $(document).scrollTop(position);
        }
    });
}
/*Call if Gantt needs to be refreshed*/
/*Fired when any event gets completed*/
function ActionComplete(args) {
    if (args.requestType != "scroll") {
        ShowProgress();
        setTimeout(function () {
            $(".loader-wrapper").hide('blind', {}, 50)
        }, 1000);
    }
    if (args.requestType == "indent" || args.requestType == "outdent" || args.requestType == "recordUpdate") {
        var data = $.extend({}, true, args.data.item);
        if (!ej.isNullOrUndefined(data.LstResources)) {
            args.data.item.LstResources = UpdateResourceID(data.LstResources);
        }
        args.data.item.TaskStatusId = parseInt(args.data.item.Status);
         
        TaskMethod(args.data.item, "Update");
        if (args.requestType == "indent" || args.requestType == "outdent")
            RefreshGantt();
    }
    if (args.requestType == "save" && args.addedRecord) {

        if (!args.addedRecord) {
            args.data.item.TaskStatusId = parseInt(args.data.item.Status);
        }
        TaskMethod(args.addedRecord.item, "Add");
        $("#drpIterations").trigger("change");
        toastr.success("Task has been saved successfully")
    }
}
/*Fired when any event gets completed*/
/*Fired when user confirms to delete record*/
function deleteChildRecords(record) {
    var childRecords = record.childRecords,
      length = childRecords.length,
        count, currentRecord;
    for (count = 0; count < length; count++) {
        currentRecord = childRecords[count];
        TaskMethod(currentRecord.item, "Delete");
        if (currentRecord.hasChildRecords) {
            deleteChildRecords(currentRecord);
        }
    }
}
/*Fired when user confirms to delete record*/
/*This event is common to all and will be called on each opeartion e.g. update,delete etc.*/
function TaskMethod(Object, Type) {
     
    $(".e-tooltiptable").hide();
    $.ajax({
        type: "POST",
        url: Type,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(Object),
        dataType: "json",
        success: function (e) {
             
            if (e.IsExceedEstimatedHours) {
                toastr.clear()
                toastr.warning('Estimated hours has exceeded for the task ' + e.TaskName);
            }
        }
    })
}
/*This event is common to all and will be called on each opeartion e.g. update,delete etc.*/
function UpdateResourceID(resourceId) {
    var res = [],
        length = resourceId.length;
    for (var i = 0; i < length; i++) {
        if (typeof resourceId[i] === 'object') {
            res.push(resourceId[i].ResourceId + "-" + resourceId[i].unit);
        }
        else
            res.push(resourceId[i].toString());
    }
    return res;
}
/*This event is call when change the schedule Mode*/
function onChange(args) {
    ShowProgress();
    var ganttObject = $("#GanttContainer").data("ejGantt");
    ganttObject.model.columns = null;
    StartDate = ganttObject.model.scheduleStartDate;
    EndDate = ganttObject.model.scheduleEndDate;
    //if (args.itemId == 0) {
    //    ganttObject.model.scheduleEndDate = new Date(ganttObject.model.scheduleEndDate);
    //    ganttObject.model.scheduleStartDate = new Date(ganttObject.model.scheduleStartDate);
    //    // ganttObject.model.scheduleHeaderSettings.minutesPerInterval = "thirtyMinutes";
    //    ganttObject.option("scheduleHeaderSettings.scheduleHeaderType", ej.Gantt.ScheduleHeaderType.Hour);
    //    ganttObject.model.scheduleHeaderSettings.scheduleHeaderType = ej.Gantt.ScheduleHeaderType.Hour;
    //    //ganttObject.reRenderChart(ej.Gantt.ScheduleHeaderType.Hour);
    //    $("#interval").ejDropDownList({ enabled: true, value: "Thirty minutes" });
    //    $("#startDay").ejDropDownList({ enabled: false });
    //}
    if (args.itemId == 0) {
       // ganttObject.model.scheduleHeaderSettings.dayHeaderFormat = "MMM dd , yyyy ";
        //ganttObject.model.scheduleHeaderSettings.hourHeaderFormat = "HH";
        ganttObject.option("scheduleHeaderSettings.scheduleHeaderType", ej.Gantt.ScheduleHeaderType.Day);
       // ganttObject.model.scheduleHeaderSettings.scheduleHeaderType = ej.Gantt.ScheduleHeaderType.Day;
        //ganttObject.reRenderChart(ej.Gantt.ScheduleHeaderType.Day);
        //$("#interval").ejDropDownList({ enabled: false });
        $("#startDay").ejDropDownList({ enabled: false });
    }
    else if (args.itemId == 1) {
      //  ganttObject.model.scheduleHeaderSettings.weekHeaderFormat = "MMM dd , yyyy";
        //ganttObject.model.scheduleHeaderSettings.dayHeaderFormat = "d";
        ganttObject.option("scheduleHeaderSettings.scheduleHeaderType", ej.Gantt.ScheduleHeaderType.Week);
       // ganttObject.model.scheduleHeaderSettings.scheduleHeaderType = ej.Gantt.ScheduleHeaderType.Week;
        $("#startDay").ejDropDownList({ enabled: true, selectedItemIndex: ganttObject.model.scheduleHeaderSettings.weekStartDay });
       // ganttObject.reRenderChart(ej.Gantt.ScheduleHeaderType.Week);
        //$("#interval").ejDropDownList({ enabled: false });
    }
    else if (args.itemId == 2) {
      //  ganttObject.model.scheduleHeaderSettings.monthHeaderFormat = "MMM yyyy";
       // ganttObject.model.scheduleHeaderSettings.weekHeaderFormat = "MMM dd";
        ganttObject.option("scheduleHeaderSettings.scheduleHeaderType", ej.Gantt.ScheduleHeaderType.Month);
       // ganttObject.model.scheduleHeaderSettings.scheduleHeaderType = ej.Gantt.ScheduleHeaderType.Month;
       // ganttObject.reRenderChart(ej.Gantt.ScheduleHeaderType.Month);
      //  $("#interval").ejDropDownList({ enabled: false });
        $("#startDay").ejDropDownList({ enabled: false });
    }
    else if (args.itemId == 3) {
       
       // ganttObject.model.scheduleHeaderSettings.yearHeaderFormat = "yyyy";
        //ganttObject.model.scheduleHeaderSettings.monthHeaderFormat = "MMM";
        ganttObject.option("scheduleHeaderSettings.scheduleHeaderType", ej.Gantt.ScheduleHeaderType.Year);
        //ganttObject.model.scheduleHeaderSettings.scheduleHeaderType = ej.Gantt.ScheduleHeaderType.Year;
        //ganttObject.reRenderChart(ej.Gantt.ScheduleHeaderType.Year);
      //  $("#interval").ejDropDownList({ enabled: false });
        $("#startDay").ejDropDownList({ enabled: false });
    }
    setTimeout(function () { HideProgress() }, 20)
}
function onIntervalChange(args) {
    var ganttObject = $("#GanttContainer").data("ejGantt");
    ShowProgress();
    switch (args.text) {
        case "Auto":
            ganttObject.model.scheduleStartDate = new Date(ganttObject.model.scheduleStartDate);
            ganttObject.model.scheduleEndDate = "";
           // ganttObject.model.scheduleHeaderSettings.scheduleHeaderType = ej.Gantt.ScheduleHeaderType.Hour;
            ganttObject.model.scheduleHeaderSettings.minutesPerInterval = "auto";
            break;
        case "One minute":
            ganttObject.model.scheduleStartDate = new Date(ganttObject.model.scheduleStartDate);
            ganttObject.model.scheduleEndDate = "";
          //  ganttObject.model.scheduleHeaderSettings.scheduleHeaderType = ej.Gantt.ScheduleHeaderType.Hour;
            ganttObject.model.scheduleHeaderSettings.minutesPerInterval = "oneMinute";
            break;
        case "Five minutes":
            ganttObject.model.scheduleStartDate = new Date(StartDate);
            ganttObject.model.scheduleEndDate = "";
           // ganttObject.model.scheduleHeaderSettings.scheduleHeaderType = ej.Gantt.ScheduleHeaderType.Hour;
            ganttObject.model.scheduleHeaderSettings.minutesPerInterval = "fiveMinutes";
            break;
        case "Fifteen minutes":
            ganttObject.model.scheduleStartDate = new Date(StartDate);
             ganttObject.model.scheduleEndDate = new Date(EndDate);
          //  ganttObject.model.scheduleHeaderSettings.scheduleHeaderType = ej.Gantt.ScheduleHeaderType.Hour;
            ganttObject.model.scheduleHeaderSettings.minutesPerInterval = "fifteenMinutes";
            break;
        case "Thirty minutes":
            ganttObject.model.scheduleStartDate = new Date(StartDate);
            ganttObject.model.scheduleEndDate = new Date(EndDate);
          //  ganttObject.model.scheduleHeaderSettings.scheduleHeaderType = ej.Gantt.ScheduleHeaderType.Hour;
            ganttObject.model.scheduleHeaderSettings.minutesPerInterval = "thirtyMinutes";
            break;
    }
    ganttObject.reRenderChart(ej.Gantt.ScheduleHeaderType.Hour);
    setTimeout(function () { HideProgress() }, 20)
}
function onStartDayChange(args) {
    var ganttObject = $("#GanttContainer").ejGantt("instance");
    ganttObject.model.scheduleHeaderSettings.weekStartDay = args.selectedValue;
    ganttObject.reRenderChart(ganttObject.model.scheduleHeaderSettings.scheduleHeaderType);
}
