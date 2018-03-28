var FavProjId = 0;
var FavProjText = "";
$(document).ready(function () {

    SetCompletedPercentagesField($('#drpProject').val(), "")

    $("#chkRepeatProject").prop("checked", true);

    function GetIndexText(n) {
        var s = ["th", "st", "nd", "rd"],
           v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);

    }


    $.ajax({
        type: "POST",
        url: "AddMultipleTimeSheetEntry_Beta.aspx/GetFavProjectId",
        data: '{}',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        async: false,
        success: function (result) {
            ProjIdName = result.d;
            FavProjId = ProjIdName[0];
            FavProjText = ProjIdName[1];
        }
    });

    //FavProjId = $("[id*=ddlProjectList]").val();
    //FavProjText = $("[id*=ddlProjectList] option:selected").text();
    if (FavProjId > 0 || FavProjId != undefined) {
        $('.Project').next().val(FavProjId);
        $('.Project').val(FavProjText);
        var TaskDropDown = $('.Task');
        BindTask(TaskDropDown, FavProjId);

    }

    /*Page load tasks*/
    var Data;
    var $rowNo = 0;

    var DatepickerElement = $("#MainTable").find("tr:eq(1)").find(".EntryDate");
    var ProjectDropdown = $("#MainTable").find("tr:eq(1)").find(".Project");
    var EventDropdown = $("#MainTable").find("tr:eq(1)").find(".Event");
    AllFunctions(DatepickerElement, ProjectDropdown, EventDropdown);
    /*Page load tasks*/
    /*Treeview code*/
    $(".SupressEnter").keypress(function (e) {
        if (e.keyCode == 13) {
            e.returnValue = false;
            return false;
        }
        return true;
    });
    function GetTaskDetails($row, callback) {

        var id = $row;
        $rowNo = id;
        var grd = $("#MainTable");
        var CurrentRow = grd.find("tr.MainRow")[id - 1];
        //var CurrentRow = grd.find("tr.MainRow")[id];

        var projectID = $(CurrentRow).find(".Project").next().val();
        var TaskId = $(CurrentRow).find(".Task").next().val();

        var IsRecordFound = false;

        $.when(
        $.ajax({
            type: "POST",
            url: "AddMultipleTimeSheetEntry_Beta.aspx/GetData",
            data: '{"ProjectID":"' + projectID + '"}',
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            async: false,
            success: function (result) {

                var flag = false;
                $(".tree").append('<ul id="mainUl"></ul>');
                var jsonResult = jQuery.parseJSON(result.d);

                var tblParent = jsonResult.dtParentTaskData;
                var tblChild = jsonResult.dtChildTaskData;

                if (tblParent != "" || tblChild != "") {
                    for (var i = 0; i < tblParent.length; i++) {
                        BindParentTr(tblParent[i].WBSID, tblParent[i].ChildWBSName);
                    }
                    for (var j = 0; j < tblChild.length; j++) {

                        BindChildTr(tblChild[j].ParentID, tblChild[j].WBSID, tblChild[j].ChildWBSName);
                    }



                    IsRecordFound = true;
                }

                else {
                    //$("#tbody_TaskData").append($('<tr align="center">').append($('<td colspan="7">No Records Found </td>')));

                    //alert("No Records Found for selected project ")

                    //if (typeof callback == 'function') {
                    //    callback(false)
                    //}
                    //return;
                    IsRecordFound = false;
                }
                for (var ParentIndex = 0; ParentIndex < tblParent.length; ParentIndex++) {

                    flag = false;
                    var thisParId = tblParent[ParentIndex].WBSID;
                    var rows = $('#tbody_TaskData >tr');

                    var $row = $('tr[data-tt-parent-id="' + thisParId + '"]');
                    var $Parentrow = $('tr[data-tt-id="' + thisParId + '"]');
                    if ($row.length > 0)
                        flag = true;

                    if (flag == false) {

                        var name = $Parentrow.find('td').html();
                        $Parentrow.find('td').remove();

                        $Parentrow.append('<td><input id= radio' + thisParId + ' type=radio name =TaskName value=' + thisParId + '><label for=radio' + thisParId + '>' + name + '</label></td>');
                    }
                }
                for (var childIndex = 0; childIndex < tblChild.length; childIndex++) {

                    flag = false;
                    var thisChildId = tblChild[childIndex].WBSID;
                    var rows = $('#tbody_TaskData >tr');

                    var $row = $('tr[data-tt-parent-id="' + thisChildId + '"]');
                    var $Parentrow = $('tr[data-tt-id="' + thisChildId + '"]');
                    if ($row.length == 0)
                        flag = true;

                    if (flag == false) {
                        var name = $Parentrow.find('td').html();
                        $Parentrow.children('td').find('input[type=radio]').remove();
                        //$Parentrow.append('<td><input type=radio name =TaskName value=' + thisParId + '>' + name + '</td>');
                    }
                }
                if (tblParent != "" || tblChild != "") {
                    if (TaskId != "")
                        $('#tblTask_treeview input[value=' + TaskId + '] ').attr("checked", true)
                }
                setupCheckboxes();
            }


        })
        ).done(function () {

            if (IsRecordFound) {
                $("#tblTask_treeview").treetable({
                    expandable: true,
                }, true)
            }


        });

        if (typeof callback == 'function') {
            callback(IsRecordFound)
        }
    }

    function BindParentTr(parentId, parentName) {
        //alert("hi " + parentId);
        $("#tbody_TaskData").append($('<tr>').attr("data-tt-id", parentId));

        var $row = $('tr[data-tt-id="' + parentId + '"]');

        $row.append('<td>' + parentName + '</td>');

    }
    function BindChildTr(parentId, childId, childEmpName) {
        var $row = $('tr[data-tt-id="' + parentId + '"]');

        $('<tr data-tt-id=' + childId + ' data-tt-parent-id=' + parentId + '></tr>').insertAfter($row);

        var $childRow = $('tr[data-tt-id="' + childId + '"]');
        //alert("child " + childId);
        //alert("Par " + parentId);
        $childRow.append('<td> <input id= radio' + childId + ' type=radio name =TaskName value=' + childId + '><label for=radio' + childId + '>' + childEmpName + '</label></td>');
    }




    function ShowTree() {

        var $link = $(this);
        //alert($(this).prev('input').index());
        $rowNo = $rowNo = $(this).closest('tr').index();
        //$rowNo = $(this).data('index');        
        $("#tbody_TaskData").empty();

        GetTaskDetails($rowNo,
            function (IsSucess) {
                if (IsSucess) {


                    //$("#popup_TaskTreeView").dialog({ "height": 450, width: 400, modal: true, draggable: false, title: "Task Tree", show: { effect: "blind", duration: 100 }, hide: { effect: "blind", duration: 100 } })

                    $("#popup_TaskTreeView").modal("show");
                    //var offset, top, left;
                    //var $this = $link;
                    //offset = $this.offset();
                    //top = offset.top - 850;
                    ////  top = (top > 0) ? top : 0;
                    //left = offset.left;
                    //left = (left > 0) ? left : 0;


                    //GetTaskDetails($rowNo);


                    //$("#popup_TaskTreeView").show().css({ top: top });;

                }
                else {
                    alert("No Record found for selected project");
                }
            }

            );

        OverRideTreeViewFunctionality();
    }
    function HideTree() {
        // $("#popup_TaskTreeView").hide()
        // alert('out ');

        //$("#popup_TaskTreeView").dialog("close");
        $("#popup_TaskTreeView").modal("hide");

    }
    $(document).on('change', '[type="radio"]', function () {

        var TaskName = $(this).closest('td').text();
        var TaskId = $(this).val();
        var grd = $("#MainTable");
        var CurrentRow = grd.find("tr.MainRow")[$rowNo - 1];
        $(CurrentRow).find(".Task").val(TaskName);
        $(CurrentRow).find(".Task").next().val(TaskId);
        HideTree();
    });
    /*Treeview code*/
    /*Events*/
    $("#btnReset").click(function (e) {
        e.preventDefault();
        ClearFeild();
    });
    $(document).on('click', '#TaskTree', ShowTree);

    $("#lnkConfiguration").click(function () {

        var IsValidSession = false;

        $.ajax({
            type: 'POST',
            url: 'TimesheetConfiguration.aspx/ISValidSession',
            contentType: 'application/json',
            data: "{}",
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var Result = result.d;
                if (Result == 'true') {

                    IsValidSession = true;
                }
                else {
                    IsValidSession = false;
                }

            },
            error: function (error) {
                IsValidSession = false;
            }
        });

        if (IsValidSession) {

        }
        else {

            window.location.href = ("/login");
            return false;
        }

        var page = "../Admin/TimesheetConfiguration.aspx";
        $('#ConfigPage').html('<iframe src="' + page + '" class="col-md-12" ></iframe>');
        $('#ConfigPage').show();

        //var $dialog = $('<div  id="ConfigPage" style="height:240px !important;width:458px !important"></div>')
        //               .html('<iframe style="border: 0px;height: 300px;" src="' + page + '" width="100%" height="100%"></iframe>')
        //               .dialog({
        //                   autoOpen: false,
        //                   modal: true,
        //                   height: 365,
        //                   width: 525,
        //                   draggable: false,
        //                   resizable: false,
        //                   title: "Add/Edit Timesheet Configuration",
        //                   close: function () { $("#ConfigPage").remove(); }
        //               });
        //$dialog.dialog('open');
        drpRemainingHours
        return false;
    });
    $("#MainTable").on("keyup", ".KeyUpClass", function () {
        clearMessage();
        if ($(this).val() == '')
            $(this).next().val('');
    });
    $("#MainTable").on("change", ".Calc", function () {
        var currentTd = $(this).parent().parent();
        var CurrentDate = $(currentTd).parent().find('.EntryDate').val();
        var TotalminsSelected = parseInt($(currentTd).find('.Hrs').val() * 60) + parseInt($(currentTd).find('.Mins').val());
        var DBRemaining = 0;
        var CurrentTotalForthisDate = 0;

        $.ajax({
            type: 'POST',
            url: 'AddMultipleTimeSheetEntry_Beta.aspx/GetTimingDetails',
            contentType: 'application/json',
            data: "{'Date':'" + CurrentDate + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                var Result = result.d;
                var RemainingTime = Result[3].split(':');
                if (RemainingTime != 'N/A')
                    DBRemaining = parseFloat(RemainingTime[0] * 60) + parseFloat(RemainingTime[1]);
            }
        });
        if (DBRemaining != 0) {
            $("#MainTable").find(".MainRow").each(function () {

                if ($(this).find('.EntryDate').val() == CurrentDate) {
                    CurrentTotalForthisDate = CurrentTotalForthisDate + ($(this).find('.Hrs').val() * 60) + parseInt($(this).find('.Mins').val());
                }

            });
            var NegFlag = false;
            var Finalmins = DBRemaining - CurrentTotalForthisDate;
            if (('' + Finalmins).indexOf('-') == 0) {
                NegFlag = true;
                Finalmins = Math.abs(Finalmins);
            }
            var DataToDisplay = '' + ("0" + ((Finalmins - Finalmins % 60) / 60)).slice(-2) + ':' + ("0" + Finalmins % 60).slice(-2);
            if (NegFlag)
                DataToDisplay = '-' + DataToDisplay;
            $("#MainTable").find(".MainRow").each(function () {
                if ($(this).find('.EntryDate').val() == CurrentDate) {
                    $(this).find('.Remaining').html(DataToDisplay);
                    if ($(this).find('.Remaining').html().indexOf('-') == 0) {
                        $(this).find('.Remaining').css('background-color', '#d9534f');
                    }
                    else
                        $(this).find('.Remaining').css('background-color', '#5cb85c');

                }
            });
        }
    });

    function SetRemainingOfficeHours(oldDateValue, Date1, CurrentRow, HoursDropdown, MinutesDropdown, ArsSpan, RemainingSpan, CurrentIndex) {

        $.when($.ajax({
            type: 'POST',
            url: 'AddMultipleTimeSheetEntry_Beta.aspx/GetTimingDetails',
            contentType: 'application/json',
            data: "{'Date':'" + Date1 + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var Result = result.d;
                if (jQuery.isEmptyObject(Result)) {

                    //$(CurrentRow).find('.EntryDate').val('');

                    $(CurrentRow).find('.EntryDate').datepicker().datepicker("setDate", new Date());
                    $("#lblMessage").text("Timesheet Entry is not allowed for selected date on " + GetIndexText($(CurrentRow).index()) + " Record");
                    $("#lblMessage").removeClass('alert alert-success').addClass("alert alert-warning");
                }
                else {
                    clearMessage();

                    // if ($(HoursDropdown).val() == "0" && $(MinutesDropdown).val() == "0") {

                    $(HoursDropdown).val(Result[0]);
                    $(MinutesDropdown).val(Result[1]);



                    // }

                    $(ArsSpan).html(Result[2]);
                    if (Result[2] == "N/A")
                        Result[3] = "N/A";
                    else if (Result[3] == "0:0")
                        Result[3] = "00:00";
                    $(RemainingSpan).html(Result[3]);
                    if ($("#MainTable").find(".MainRow").length > 0) {

                        var DateToSetRemainingHours = moment(Date1, "MM/DD/YYYY");

                        var TotalHrs = TotalMins = 0;

                        // calculate new total mins
                        $("#MainTable").find(".MainRow").each(function () {
                            var self = $(this);

                            var CummulativeRemainingHours = 0;

                            if (self.index() != CurrentIndex) {

                                var SameDateOrNot = moment(self.find(".EntryDate").val(), "MM/DD/YYYY");
                                if (SameDateOrNot.diff(DateToSetRemainingHours, 'days') == 0) {
                                    var hours = parseInt(self.find('.Hrs').val())
                                    var minutes = parseInt(self.find('.Mins').val());
                                    TotalMins = TotalMins + (hours * 60) + minutes;

                                }

                            }
                            else {
                                //add configuration hours in TotalMins
                                var configHours = parseInt(Result[0]);
                                var configMins = parseInt(Result[1]);
                                TotalMins = TotalMins + (configHours * 60) + configMins;
                            }
                        });

                        if (TotalMins != 0) {

                            var NegFlag = false;
                            if (Result[3] != "N/A") {
                                var DBRemainingHours = Result[3].split(':');
                                var DBRemainingMins = "0";
                                if (DBRemainingHours[0].indexOf('-') == 0)
                                    DBRemainingMins = isNaN(DBRemainingMins = parseInt(DBRemainingHours[0] * 60) - parseInt(DBRemainingHours[1])) ? 0 : DBRemainingMins; //end of if
                                else
                                    DBRemainingMins = isNaN(DBRemainingMins = parseInt(DBRemainingHours[0] * 60) + parseInt(DBRemainingHours[1])) ? 0 : DBRemainingMins;// end of else
                                var FinalRemainingMins = isNaN(FinalRemainingMins = parseFloat(DBRemainingMins - TotalMins)) ? 0 : FinalRemainingMins;
                                if (('' + FinalRemainingMins).indexOf('-') == 0) {
                                    NegFlag = true;
                                    FinalRemainingMins = Math.abs(FinalRemainingMins);
                                }
                                var TotalHrsDisplay = isNaN(TotalHrsDisplay = ("0" + (FinalRemainingMins - FinalRemainingMins % 60) / 60).slice(-2)) ? 0 : TotalHrsDisplay;
                                var TotalMinsDisplay = isNaN(TotalMinsDisplay = ("0" + FinalRemainingMins % 60).slice(-2)) ? 0 : TotalMinsDisplay;
                                if (NegFlag) {

                                    TotalHrsDisplay = '-' + TotalHrsDisplay;
                                }
                                $("#MainTable").find(".MainRow").each(function () {

                                    if ($(this).find('.EntryDate').val() == Date1) {
                                        $(this).find('.Remaining').html(TotalHrsDisplay + ':' + TotalMinsDisplay);

                                    }
                                });
                            }
                        }

                    }
                    $("#MainTable").find(".MainRow").each(function () {
                        if ($(this).find('.Remaining').html().indexOf('-') == 0) {
                            $(this).find('.Remaining').css('background-color', '#d9534f');
                        }
                        else
                            $(this).find('.Remaining').css('background-color', '#5cb85c');

                    });
                }
            }
        })).done(function () {
            if (oldDateValue != "") {
                //Update remaining hours in old date rows.
                $.ajax({
                    type: 'POST',
                    url: 'AddMultipleTimeSheetEntry_Beta.aspx/GetTimingDetails',
                    contentType: 'application/json',
                    data: "{'Date':'" + oldDateValue + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        var Result = result.d;
                        if (jQuery.isEmptyObject(Result)) {

                            //$(CurrentRow).find('.EntryDate').val('');
                            $(CurrentRow).find('.EntryDate').datepicker().datepicker("setDate", new Date());
                            $("#lblMessage").text("Timesheet Entry is not allowed for selected date on " + GetIndexText($(CurrentRow).index()) + " Record");
                            $("#lblMessage").removeClass('alert alert-success').addClass("alert alert-warning");
                        }
                        else {
                            var oldDateTotalMins = 0;
                            var oldDateToSetRemainingHours = moment(oldDateValue, "MM/DD/YYYY");

                            if (Result[2] == "N/A")
                                Result[3] = "N/A";
                            else if (Result[3] == "0:0")
                                Result[3] = "00:00";

                            if ($("#MainTable").find(".MainRow").length > 0) {

                                // calculate old total mins
                                $("#MainTable").find(".MainRow").each(function () {
                                    var self = $(this);
                                    var CummulativeRemainingHours = 0;
                                    if (self.index() != CurrentIndex) {
                                        var SameDateOrNot = moment(self.find(".EntryDate").val(), "MM/DD/YYYY");
                                        if (SameDateOrNot.diff(oldDateToSetRemainingHours, 'days') == 0) {
                                            var hours = parseInt(self.find('.Hrs').val())
                                            var minutes = parseInt(self.find('.Mins').val());
                                            oldDateTotalMins = oldDateTotalMins + (hours * 60) + minutes;
                                        }
                                    }
                                    else {

                                    }
                                });

                                if (oldDateTotalMins != 0) {

                                    var NegFlag = false;
                                    if (Result[3] != "N/A") {
                                        var DBRemainingHours = Result[3].split(':');
                                        var DBRemainingMins = "0";
                                        if (DBRemainingHours[0].indexOf('-') == 0)
                                            DBRemainingMins = isNaN(DBRemainingMins = parseInt(DBRemainingHours[0] * 60) - parseInt(DBRemainingHours[1])) ? 0 : DBRemainingMins;
                                        else
                                            DBRemainingMins = isNaN(DBRemainingMins = parseInt(DBRemainingHours[0] * 60) + parseInt(DBRemainingHours[1])) ? 0 : DBRemainingMins;
                                        var FinalRemainingMins = isNaN(FinalRemainingMins = parseFloat(DBRemainingMins - oldDateTotalMins)) ? 0 : FinalRemainingMins;
                                        if (('' + FinalRemainingMins).indexOf('-') == 0) {
                                            NegFlag = true;
                                            FinalRemainingMins = Math.abs(FinalRemainingMins);
                                        }
                                        var TotalHrsDisplay = isNaN(TotalHrsDisplay = ("0" + (FinalRemainingMins - FinalRemainingMins % 60) / 60).slice(-2)) ? 0 : TotalHrsDisplay;
                                        var TotalMinsDisplay = isNaN(TotalMinsDisplay = ("0" + FinalRemainingMins % 60).slice(-2)) ? 0 : TotalMinsDisplay;
                                        if (NegFlag) {

                                            TotalHrsDisplay = '-' + TotalHrsDisplay;
                                        }
                                        $("#MainTable").find(".MainRow").each(function () {

                                            if ($(this).find('.EntryDate').val() == oldDateValue) {
                                                $(this).find('.Remaining').html(TotalHrsDisplay + ':' + TotalMinsDisplay);

                                            }
                                        });
                                    }
                                }

                            }
                            $("#MainTable").find(".MainRow").each(function () {
                                if ($(this).find('.Remaining').html().indexOf('-') == 0) {
                                    $(this).find('.Remaining').css('background-color', '#d9534f');
                                }
                                else
                                    $(this).find('.Remaining').css('background-color', '#5cb85c');

                            });
                        }
                    }
                });
            }
        })
    }
    $("#MainTable").on("change", ".EntryDate", function () {

        clearMessage();
        var oldDateValue = $(this).data().datepicker.lastVal;
        if ($(this).val() != '') {
            if (!moment($(this).val(), ["MM/DD/YYYY"], true).isValid()) {
                $("#ulVs").append("<li>Please Select Valid Date on " + GetIndexText($(CurrentRow).index()) + " Record</li>");
                return false;
            }
            $("#ulVs").empty();
            $("#vs").hide();
            var Date = $(this).val();

            var CurrentRow = $(this).closest('tr');
            $(CurrentRow).find('.WFH').prop('checked', false);
            var HoursDropdown = $(CurrentRow).find('.Hrs');
            var MinutesDropdown = $(CurrentRow).find('.Mins');
            var ArsSpan = $(CurrentRow).find('.Ars');
            var RemainingSpan = $(CurrentRow).find('.Remaining');
            var CurrentIndex = $(CurrentRow).index();

            SetRemainingOfficeHours(oldDateValue, Date, CurrentRow, HoursDropdown, MinutesDropdown, ArsSpan, RemainingSpan, CurrentIndex)
            $.ajax({
                type: 'POST',
                url: 'AddMultipleTimeSheetEntry_Beta.aspx/CheckFreezingDate',
                contentType: 'application/json',
                data: "{'EntryDate':'" + Date + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    $(CurrentRow).find('.WFH').prop("disabled", result.d);
                }
            });
        }
    });
    $("#MainTable").on("click", ".add", function (e) {
        e.preventDefault();
        Addtr($(this));
    });
    $("#MainTable").on("click", ".remove", function (e) {
        e.preventDefault();
        if ($("#MainTable").find('tr').length > 2) {
            var r = confirm("Are you sure you want to delete this record?");
            if (r == true) {
                clearMessage();
                $("#lblMessage").addClass('alert alert-success');
                $("#lblMessage").text('Data deleted successfully');
                var Date = $(this).closest('tr').find('.EntryDate').val();
                var DateToSetRemainingHours = moment(Date, "MM/DD/YYYY");
                var Hours = $(this).closest('tr').find('.Hrs').val();
                var Mins = $(this).closest('tr').find('.Mins').val();
                var CurrentIndex = $(this).closest('tr').index();
                var thisRowTotalMins = parseInt(Hours) * 60 + parseInt(Mins);


                var thisRowRemainingHoursTotalMins = $(this).closest('tr').find('.HrsTable').find("#drpRemainingHours").text();
                //  thisRowTotalMins = thisRowTotalMins + (hours * 60) + minutes;
                //$(td).each(function () {
                //    
                //    var val = $(this).find('.drpRemainingHours').val();
                //})


                if (thisRowTotalMins != 0) {
                    var NegFlag = false;

                    //if (Result[3] != "N/A") {
                    var DBRemainingHours = thisRowRemainingHoursTotalMins.split(':');
                    var DBRemainingMins = "0";
                    if (DBRemainingHours[0].indexOf('-') == 0)
                        DBRemainingMins = isNaN(DBRemainingMins = parseInt(DBRemainingHours[0] * 60) - parseInt(DBRemainingHours[1])) ? 0 : DBRemainingMins;
                    else
                        DBRemainingMins = isNaN(DBRemainingMins = parseInt(DBRemainingHours[0] * 60) + parseInt(DBRemainingHours[1])) ? 0 : DBRemainingMins;
                    var FinalRemainingMins = isNaN(FinalRemainingMins = parseFloat(DBRemainingMins + thisRowTotalMins)) ? 0 : FinalRemainingMins;
                    if (('' + FinalRemainingMins).indexOf('-') == 0) {
                        NegFlag = true;
                        FinalRemainingMins = Math.abs(FinalRemainingMins);
                    }
                    var TotalHrsDisplay = isNaN(TotalHrsDisplay = ("0" + (FinalRemainingMins - FinalRemainingMins % 60) / 60).slice(-2)) ? 0 : TotalHrsDisplay;
                    var TotalMinsDisplay = isNaN(TotalMinsDisplay = ("0" + FinalRemainingMins % 60).slice(-2)) ? 0 : TotalMinsDisplay;
                    if (NegFlag) {

                        TotalHrsDisplay = '-' + TotalHrsDisplay;
                    }
                    $("#MainTable").find(".MainRow").each(function () {

                        if ($(this).find('.EntryDate').val() == Date) {
                            $(this).find('.Remaining').html(TotalHrsDisplay + ':' + TotalMinsDisplay);

                        }
                    });
                    // }
                }


                $(this).closest('tr').remove();


                $("#MainTable").find(".MainRow").each(function () {

                    var curr_Index = $(this).index();
                    $(this).find('input, select, textarea').each(function () {
                        var id = $(this).attr('id');
                        id = id.replace(new RegExp("[0-9]", "g"), curr_Index);
                        $(this).attr('id', id);
                    });
                    if ($(this).find('.Remaining').html().indexOf('-') == 0) {
                        $(this).find('.Remaining').css('background-color', '#d9534f');
                    }
                    else
                        $(this).find('.Remaining').css('background-color', '#5cb85c');

                });
            }
            else
                return false;
        }
        else {
            $("#ulVs").append("<li>You can not delete default record</li>");
            setTimeout(function () {
                $("#vs").hide();
                $("#ulVs").empty();
            }, 5000);



        }

    });
    $("#chkRepeatTask").click(function () {
        if ($(this).is(":checked")) {
            $("#chkRepeatProject").prop("checked", true);
        }
    });
    $("#chkRepeatProject").click(function () {
        if (!$(this).is(":checked")) {
            $("#chkRepeatTask").prop("checked", false);
        }
    });
    $("#MainTable").on("click", ".KeyUpClass", function () {
        var self = this;
        $(self).autocomplete("search", "");
    });
    $("#btnSave").click(function () {

        var Flag;

        var IsValidSession = false;
        $.ajax({
            type: 'POST',
            url: 'TimesheetConfiguration.aspx/ISValidSession',
            contentType: 'application/json',
            data: "{}",
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var Result = result.d;
                if (Result == 'true') {

                    IsValidSession = true;
                }
                else {
                    IsValidSession = false;
                }

            },
            error: function (error) {
                IsValidSession = false;
            }
        });

        if (IsValidSession) {

        }
        else {

            window.location = window.location.href;
            return false;
        }

        $("#MainTable").find('.MainRow').each(function () {
            Flag = Validate($(this));
            if (!Flag) {
                return false;
            }
        });
        if (!Flag) {
            return false;
        }
        else {

            var TimesheetData = new Array();
            $("#MainTable").find('.MainRow').each(function () {
                var ListOfEntries = {};
                ListOfEntries.EntryDate = $(this).find(".EntryDate").val();
                ListOfEntries.ProjectID = $(this).find(".Project").next().val();
                ListOfEntries.TaskID = $(this).find(".Task").next().val();
                ListOfEntries.WorkEventID = $(this).find(".Event").next().val();
                ListOfEntries.TotalMins = parseInt($(this).find(".Hrs").val()) * 60 + parseInt($(this).find(".Mins").val());
                ListOfEntries.IsBillable = $(this).find(".Timesheet").is(":checked");
                ListOfEntries.WFH = $(this).find(".WFH").is(":checked");
                ListOfEntries.Desc = $(this).find(".description").val();
                var percentComplete = parseInt($(this).find(".percentComplete").val());
                if (!isNaN(percentComplete)) {
                    ListOfEntries.percentageCompleted = $(this).find(".percentComplete").val();
                }
                else {
                    ListOfEntries.percentageCompleted = 0;
                }
                TimesheetData.push(ListOfEntries);
            });

            var MultipleTimesheetData = "{ListOfEntries:" + JSON.stringify(TimesheetData) + "}";

            $.ajax({
                type: "POST",
                url: 'AddMultipleTimeSheetEntry_Beta.aspx/SaveTimesheetData',
                data: MultipleTimesheetData,
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                success: function (result) {
                    ClearFeild();
                    $(".EntryDate").datepicker("setDate", new Date());
                    alert("Record Saved Successfully");
                    location.reload();
                    //setMessage();

                }
            });
        }
    });
    /*Events*/

    /*Functions*/
    function ClearFeild() {
        $("#ulVs").empty();
        $("#vs").hide();
        $("#MainTable").find(".MainRow:gt(0)").remove();
        var TaskDropdown = $("#MainTable").find("tr.MainRow:eq(0)").find('.Task');
        $("#MainTable").find("tr.MainRow:eq(0)").find('.Timesheet').prop('checked', true);
        $("#MainTable").find("tr.MainRow:eq(0)").find('.Remaining').css('background-color', '#5cb85c');
        BindTask(TaskDropdown, 0);
        $("#chkRepeatTask").prop("checked", false);
        $("#chkIncrementDate").prop("checked", false);
        $("#chkRepeatProject").prop("checked", true);
        $(".Ars").html('N/A');
        $(".Remaining").html('N/A');
        $("#MainTable").find('select').each(function (i) {
            $(this).val("00");
        })
        $("#MainTable").find('input, textarea').each(function (i) {
            $(this).val('');
            if ($(this).is(':checkbox')) {
                $(this).prop("checked", false);
                $(this).prop("disabled", false);
            }
        });
        $("#MainTable").find("tr:eq(1)").find('.Timesheet').prop('checked', true);
        if (FavProjId > 0 || FavProjId != undefined) {
            $('.Project').next().val(FavProjId);
            $('.Project').val(FavProjText);
            BindTask(TaskDropdown, FavProjId);
        }
        var DatepickerElement = $("#MainTable").find("tr:eq(1)").find(".EntryDate");
        ApplyDatePicker(DatepickerElement);
        $.ajax({
            type: 'POST',
            url: 'AddMultipleTimeSheetEntry_Beta.aspx/GetTimingDetails',
            contentType: 'application/json',
            data: "{'Date':'" + $(DatepickerElement).val() + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $(DatepickerElement).closest('tr').find('.Hrs').val(result.d[0]);
                $(DatepickerElement).closest('tr').closest('.Mins').val(result.d[1]);
            }
        });
    }
    function clearMessage() {
        $("#lblMessage").html('');
        $("#lblMessage").removeClass('alert alert-success').removeClass('alert alert-warning');
    }
    function setMessage() {
        $("#lblMessage").addClass('alert alert-success');
        $("#lblMessage").text('Record Saved Succesfully');
    }
    function AllFunctions(DatepickerElement, ProjectDropdown, EventDropdown) {

        $.when(
        ApplyDatePicker(DatepickerElement)
        ).then(function () {
            BindProject(ProjectDropdown);
        }).then(function () {
            BindWorkEvent(EventDropdown);
        }).then(function () {
            $.ajax({
                type: 'POST',
                url: 'AddMultipleTimeSheetEntry_Beta.aspx/GetTimingDetails',
                contentType: 'application/json',
                data: "{'Date':'" + $(DatepickerElement).val() + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    $(DatepickerElement).closest('tr').find('.Hrs').val(result.d[0]);
                    $(DatepickerElement).closest('tr').closest('.Mins').val(result.d[1]);
                }
            });
        });




    }
    function BindAutoComplete(Dropdown, DropdownData) {

        $(Dropdown).autocomplete({
            source: DropdownData,
            minLength: 0,
            minChars: 0,
            max: 12,
            autoFill: true,
            mustMatch: true,
            matchContains: false,
            scrollHeight: 220,
            select: function (event, ui) {
                event.preventDefault();
                SetTextAndValue(event, ui)
            },
            focus: function (event, ui) {
                event.preventDefault();
                SetTextAndValue(event, ui);
            },
            search: function (event, ui) {
                $(this.target).find('input').autocomplete();
            }
        });
        //alert(DropdownData[1]);
        //$(Dropdown).chosen();        
        //for (i = 0; i < DropdownData.length() ;i++)
        //{
        //    $(Dropdown).append("<li>" + DropdownData[i] + "</li>");
        //    $(Dropdown).trigger("chosen:updated");
        //}
        //$(Dropdown).trigger("chosen:updated");

    }
    function SetTextAndValue(event, ui) {
        $("#" + event.target.id).val(ui.item.label);
        $("#" + event.target.id).next().val(ui.item.value);
        if (event.type == 'autocompleteselect' && event.target.id.indexOf('Project') != -1) {
            var TaskDropdown = $("#" + event.target.id).parent().parent().parent().parent().find('.Task');
            $(TaskDropdown).val('');
            $(TaskDropdown).next().val('');
            BindTask(TaskDropdown, $("#" + event.target.id).next().val());
            SetCompletedPercentagesField($("#" + event.target.id).next().val(), event.target.id[event.target.id.length - 1])
        }
    }
    function BindTask(TaskDropdown, SelectedProject) {

        $.ajax({
            type: 'POST',
            url: 'AddMultipleTimeSheetEntry_Beta.aspx/GetTaskByProject',
            contentType: 'application/json',
            data: "{'ProjectID':'" + parseInt(SelectedProject) + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var jsonResult = jQuery.parseJSON(result.d);
                BindAutoComplete(TaskDropdown, jsonResult);
            }
        });
    }

    function BindProject(ProjectDropdown) {
        if (jQuery.isEmptyObject(Data)) {
            $.ajax({
                type: 'POST',
                url: 'AddMultipleTimeSheetEntry_Beta.aspx/GetAllProject',
                contentType: 'application/json',
                data: "{}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    Data = jQuery.parseJSON(result.d);
                    BindAutoComplete(ProjectDropdown, Data);
                }
            });
        }
        else
            BindAutoComplete(ProjectDropdown, Data);

    }
    function BindWorkEvent(EventDropdown) {
        $.ajax({
            type: 'POST',
            url: 'AddMultipleTimeSheetEntry_Beta.aspx/BindWorkEvent',
            contentType: 'application/json',
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var jsonResult = jQuery.parseJSON(result.d);
                BindAutoComplete(EventDropdown, jsonResult)
            }
        });
    }
    function ApplyDatePicker(element) {

        $(element).datepicker({
            changeMonth: false,
            changeYear: false,
            showWeek: false,
            firstDay: 1,
            //showOn: "button",
            showOn: "focus",
            //buttonImage: "../images/datepicker.gif",
            //buttonImageOnly: true,
            dateFormat: 'mm/dd/yy',
            buttonText: ""
        });
        $(element).datepicker("setDate", new Date());
        $(element).siblings(".textdate_btn").click(function () {
            $(element).focus();
        });
    }
    function Addtr(CurrentButton) {

        var $tr = $(CurrentButton).closest('tr');
        if (Validate($tr)) {

            var $clone = $tr.clone();
            $tr.after($clone);
            var HighestIndex = ($clone).find(".percentageCompleted").attr('tabindex');
            ($clone).find('input, select, textarea').each(function (i) {

                var Text = $(this).attr('id').match(/[a-zA-Z]+/g);
                $(this).attr('id', Text + $clone.index());
                $(this).attr('tabindex', parseInt(HighestIndex) + i + 1);
                if ($(this).is(':checkbox')) {
                    $(this).prop("checked", false);
                    $(this).next().attr("for", $(this).attr("id"));
                }
                if ($(this).hasClass('Timesheet')) {
                    $(this).prop("checked", true);
                }
                console.log($clone.index());
                $("#drpTask" + $clone.index()).attr('data-index', $clone.index());
            });

            var DatePicker = ($clone).find(".EntryDate");
            var ProjectDropdown = ($clone).find(".Project");
            var EventDropdown = ($clone).find(".Event");
            var TaskDropdown = ($clone).find(".Task");
            var SelProject = ($clone).find(".Project").next().val();

            $(DatePicker).next().remove();
            $(DatePicker).removeClass('hasDatepicker');
            AllFunctions(DatePicker, ProjectDropdown, EventDropdown);

            var RepeatProject = $("#chkRepeatProject").is(":checked");
            var RepeatTask = $("#chkRepeatTask").is(":checked");
            ($clone).find('.Ars').html('N/A');
            ($clone).find('.Remaining').html('N/A');
            ($clone).find('.Remaining').parent().css('background-color', '#ffffff');
            ($clone).find('input, select, textarea').each(function () {

                if ($(this).attr('id').indexOf("Task") != -1) {
                    if (!RepeatTask)
                        $(this).val('');
                }
                else if ($(this).attr('id').indexOf("Project") != -1) {
                    if (!RepeatProject) {

                        if ($(this).attr('id').indexOf("hdnProject") == -1) {
                            if (FavProjId > 0 || FavProjId != undefined) {
                                $(this).val(FavProjText);
                                $(this).next().val(FavProjId);
                                BindTask(TaskDropdown, FavProjId);
                            }
                            else {
                                $(this).val('');
                                $(this).next().val('');
                            }
                        }

                    }
                    else if ($(this).attr('id').indexOf("hdnProject") != 0) {
                        BindTask(TaskDropdown, SelProject);
                    }
                }
                else if ($(this).attr('id').indexOf("Hours") != -1 || $(this).attr('id').indexOf("Minutes") != -1) {
                    $("#" + $(this).attr("id") + " option:first").attr("selected", true);
                }
                else
                    $(this).val('');


            });
            var Date1 = "";
            var PreviousDate = ($tr).find(".EntryDate").val();
            if ($("#chkIncrementDate").is(":checked")) {
                $.ajax({
                    type: 'POST',
                    url: 'AddMultipleTimeSheetEntry_Beta.aspx/GetIncrementedDate',
                    contentType: 'application/json',
                    async: false,
                    data: "{'PreviousDate':'" + PreviousDate + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (result) {
                        var NextDate = result.d;
                        ($clone).find(".EntryDate").datepicker("setDate", NextDate)

                    }
                });
            }
            else {
                ($clone).find(".EntryDate").datepicker("setDate", PreviousDate);
            }

            var oldDateValue = "";
            Date1 = ($clone).find(".EntryDate").val();
            var HoursDropdown = ($clone).find('.Hrs');
            var MinutesDropdown = ($clone).find('.Mins');
            var ArsSpan = ($clone).find('.Ars');
            var RemainingSpan = ($clone).find('.Remaining');
            var CurrentIndex = ($clone).index();
            SetRemainingOfficeHours(oldDateValue, Date1, $clone, HoursDropdown, MinutesDropdown, ArsSpan, RemainingSpan, CurrentIndex)
        }
    }

    function SetIdDeletetr(CurrentButton) {
        var $tr = $(CurrentButton).closest('tr');
        var HighestIndex = ($tr).find(".description").attr('tabindex');
        ($tr).find('input, select, textarea').each(function (i) {

            var Text = $(this).attr('id').match(/[a-zA-Z]+/g);
            $(this).attr('id', Text + $tr.index());
            $(this).attr('tabindex', parseInt(HighestIndex) + i + 1);
            //if ($(this).is(':checkbox')) {
            //    $(this).prop("checked", false);
            //    $(this).next().attr("for", $(this).attr("id"));
            //}
            //if ($(this).hasClass('Timesheet')) {
            //    $(this).prop("checked", true);
            //}
            console.log($tr.index());
            $("#drpTask" + $tr.index()).attr('data-index', $tr.index());
        });
    }
    function Validate(Row) {
        
        var Flag = true;
        $("#ulVs").empty();
        $("#vs").hide();
        $(".form-group").removeClass("has-error");
        $(".input-group").removeClass("has-error");
        clearMessage();
        if ($(Row).find('.EntryDate').val() == '') {
            $("#vs").show();

            $("#ulVs").append("<li>Please Select Date on " + GetIndexText(Row.index()) + " Record" + "</li>");
            Flag = false;

        }
        if ($(Row).find('.EntryDate').val() != '') {
            var CheckDate = moment(Row.find('.EntryDate').val(), ["MM/DD/YYYY"], true);
            if (moment().isBefore(CheckDate)) {
                $("#vs").show();
                $("#ulVs").append("<li>Future Entry Not Allowed on " + GetIndexText(Row.index()) + " Record" + "</li>");
                Flag = false;

            }
        }
        if ($(Row).find('.EntryDate').val() != '' && !moment(Row.find('.EntryDate').val(), ["MM/DD/YYYY"], true).isValid()) {
            $("#vs").show();
            $("#ulVs").append("<li>Please Select Valid Date on " + GetIndexText(Row.index()) + " Record" + " </li>");
            Flag = false;
        }
        $(Row).find("input[type=hidden]").each(function () {
            if ($(this).val() == '') {

                var Text = String($(this).attr('id').match(/[a-zA-Z]+/g));
                Text = Text.replace('hdn', '');
                $("#vs").show();
                $("#ulVs").append("<li>Please Select " + Text + " on " + GetIndexText(Row.index()) + " Record" + " </li>");
                Flag = false;

                $(this).closest(".form-group").addClass("has-error");
            }
        });

        if ($(Row).find(".Hrs").children('option:first-child').is(':selected') && $(Row).find(".Mins").children('option:first-child').is(':selected')) {
            $("#vs").show();
            $("#ulVs").append("<li>Please Select Hours on " + GetIndexText(Row.index()) + " Record" + " </li>");
            Flag = false;
            $(Row).find(".Hrs").closest(".input-group").addClass("has-error");

        }
        if ($(Row).find(".description").val() == '') {
            $("#vs").show();
            $("#ulVs").append("<li>Please Enter Description on " + GetIndexText(Row.index()) + " Record" + " </li>");
            Flag = false;
            $(Row).find(".description").closest(".form-group").addClass("has-error");
        }
        $.ajax({
            type: 'POST',
            url: 'AddMultipleTimeSheetEntry_Beta.aspx/SetCompletedPercentage',
            contentType: 'application/json',
            data: "{'ProjectID':'" + parseInt($(Row).find(".Project").next().val()) + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                
                var jsonResult = jQuery.parseJSON(result.d);
                if (jsonResult) {
                    if ($(Row).find(".percentComplete").is(":visible")) {
                        if ($(Row).find(".percentComplete").val() == '') {
                            $("#vs").show();
                            $("#ulVs").append("<li>Please Enter Completed Percentage on " + GetIndexText(Row.index()) + " Record" + " </li>");
                            Flag = false;
                            $(Row).find(".percentComplete").closest(".form-group").addClass("has-error");
                        }
                        else {
                            var percentComplete = $('.percentComplete').val();
                            var x = parseFloat(percentComplete);
                            if (isNaN(x) || x < 0 || x > 100) {
                                $("#vs").show();
                                $("#ulVs").append("<li>Please Enter Valid Completed Percentage on " + GetIndexText(Row.index()) + " Record" + " </li>");
                                Flag = false;
                                $(Row).find(".percentComplete").closest(".form-group").addClass("has-error");
                            }
                        }
                    }
                }

            }
        });

        return Flag;
    }

    function highlight(string) {


        $("#tblTask_treeview  td.match").each(function (_index, _field) {

            ExpandTreeView(_field);

        })

        $("#tblTask_treeview  td.match").each(function (_index, _field) {

            if (_index == 0) {


                // Set scroll posttion for first matching element 
                CustomScrollTreeView(_field);

            }

            var matchStart = $(this).text().toLowerCase().indexOf("" + string.toLowerCase() + "");
            var matchEnd = matchStart + string.length - 1;
            var beforeMatch = $(this).text().slice(0, matchStart);
            var matchText = $(this).text().slice(matchStart, matchEnd + 1);
            var afterMatch = $(this).text().slice(matchEnd + 1);



            var nodeToExpand = $(this).find('span').prop('outerHTML');
            var radiobuttonToSelect = $(this).find('input').prop('outerHTML');


            var Text = beforeMatch + "<em>" + matchText + "</em>" + afterMatch
            Text = Text.replace(/\u00a0/g, "");// prevent space to be encode in html

            if (radiobuttonToSelect == undefined) {
                $(this).html(nodeToExpand + Text);
            }
            else {
                //  $(this).html(nodeToExpand + radiobuttonToSelect + Text);
                $(this).html(radiobuttonToSelect + "<label for=" + $(this).find('input').attr('id') + ">" + Text + "</label>");

            }



        });

        OverRideTreeViewFunctionality();




    };

    function CustomScrollTreeView(_field) {


        var parentDiv = $('#divtbltreeview');
        var innerListItem = _field;

        parentDiv.scrollTop(parentDiv.scrollTop() + ($(innerListItem).position().top - parentDiv.position().top) - (parentDiv.height() / 2) + ($(innerListItem).height() / 2))


    }

    function ExpandTreeView(_field) {

        var parentTr = $(_field).parents('tr');

        if ($(parentTr).hasClass("expanded")) {
            // $("#tblTask_treeview").treetable("collapseNode", $(parentTr).attr('data-tt-id'));
        }
        else {
            $("#tblTask_treeview").treetable("expandNode", $(parentTr).attr('data-tt-id'));


        }

    }


    function OverRideTreeViewFunctionality() {

        $('#tblTask_treeview tr td span.indenter a').off('click');

        $('#tblTask_treeview tr td span.indenter a').on('click', function (event) {


            event.preventDefault();
            event.stopPropagation();
            var self = this;
            var parentTr = $(self).parents('tr');

            if ($(parentTr).hasClass("expanded")) {
                $("#tblTask_treeview").treetable("collapseNode", $(parentTr).attr('data-tt-id'));
            }
            else {
                $("#tblTask_treeview").treetable("expandNode", $(parentTr).attr('data-tt-id'));


            }


        });
    }


    $("#txtSearchTask").on("keyup  input", function () {
        $("#tblTask_treeview tr td").removeClass(".match");


        $("#tblTask_treeview tr td").removeClass("match").filter(function () {
            return $(this).text().toLowerCase().indexOf($("#txtSearchTask").val().toLowerCase()) != -1;
        }).addClass("match").show();

        highlight(this.value);
        $("#tViewParentTask").show();
        setupCheckboxes();
    });


    $(document).on('click', '.Project', function () {
        $(this).val("");
        $(this).next().val("");
    })
    $(document).on('click', '.Task', function () {
        $(this).val("");
        $(this).next().val("");
    })
    $(document).on('click', '.Event', function () {
        $(this).val("");
        $(this).next().val("");
    })


    /* filter products */

    /*Functions*/
});
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function SetCompletedPercentagesField(selectedIndex, row) {
    
    var index = parseInt(selectedIndex)
    if (isNaN(index)) {
        index = 0;
    }
    var rowNo = parseInt(row);
    if (isNaN(rowNo)) {
        rowNo = "";
    }
    $.ajax({
        type: 'POST',
        url: 'AddMultipleTimeSheetEntry_Beta.aspx/SetCompletedPercentage',
        contentType: 'application/json',
        data: "{'ProjectID':'" + parseInt(index) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
         
            var jsonResult = jQuery.parseJSON(result.d);
            $("#percentageCompleted" + rowNo).val('');
            if (!jsonResult) {
                $("#percentageCompleted" + rowNo).closest(".form-group").css('display', 'none');
                //$("#percentageCompleted" + rowNo).css('visibility', 'hidden');
                //$("#lblPercentageCompleted" + rowNo).css('visibility', 'hidden');
            }
            else {
                $("#percentageCompleted" + rowNo).closest(".form-group").css('display', 'block');
                //$("#percentageCompleted" + rowNo).css('visibility', 'visible');
                //$("#lblPercentageCompleted" + rowNo).css('visibility', 'visible');
            }
        }
    });

}