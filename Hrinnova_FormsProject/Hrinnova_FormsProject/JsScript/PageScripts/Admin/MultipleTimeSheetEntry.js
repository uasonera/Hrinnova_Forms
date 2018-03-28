$(document).ready(function () {
    
    $("#txtRemainingHours").text("00:00");
    $("#lblArsHours").text("00:00");
    $('#Text1').change(function () {
        var thisDate = $(this).val();
        var thisrowNo = $(this).parent().parent().index();

        if (moment(thisDate, ["MM/DD/YYYY"], true).isValid() == false) {

            alert('Please select Valid Date');
        }
        else {
            DisplayHours(thisDate, thisrowNo);
        }
    });

    $('#Text1').datepicker({
        changeMonth: false,
        changeYear: false,
        showWeek: false,
        firstDay: 1,
        showOn: "button",
        buttonImage: "../../images/datepicker.gif",
        buttonImageOnly: true,
        dateFormat: 'mm/dd/yy',
        onSelect: function () {
            var thisDate = $(this).val();
            var thisrowNo = $(this).parent().parent().index();
            DisplayHours(thisDate, thisrowNo);
            //DisplayTimesheetHours(thisDate, thisrowNo);

        }

    });

    function DisplayHours(thisDate, thisrowNo) {
        $.ajax({
            type: 'POST',
            url: 'AddMultipleTimeSheetEntry.aspx/GetArsHours',
            contentType: 'application/json',
            data: "{'Date':'" + thisDate + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var resultArray = result.d;
                var hours = resultArray[0];
                var minutes = resultArray[1];
                var ArsHours = resultArray[2];
                var remainingHours = resultArray[3];
                var grd = document.getElementById('myTable');
                var AbsMin = "";
                var AbsHour = "";

                var drpHours = grd.rows[thisrowNo].cells[3].childNodes[14];
                $(drpHours).val(hours);

                var drpMin = grd.rows[thisrowNo].cells[3].childNodes[16];
                $(drpMin).val(minutes);
                var grd = document.getElementById('myTable');
                var lbl = grd.rows[thisrowNo].cells[3].childNodes[6];
                $(lbl).text(ArsHours);
                var txtRemainigHour = grd.rows[thisrowNo].cells[3].childNodes[12];
                var lblRemainigHour = grd.rows[thisrowNo].cells[3].childNodes[10];
                var text = "";
                var splitRhour = remainingHours.split(':');
                var intMin = parseInt(splitRhour[1]);
                var intHour = parseInt(splitRhour[0]);
                if (intMin < 0 || intHour < 0) {
                    AbsMin = Math.abs(intMin);
                    AbsHour = Math.abs(intHour);

                    text = "-" + AbsHour + ":" + AbsMin;
                    $(lblRemainigHour).attr("style", "background-color:yellow")
                    $(txtRemainigHour).attr("style", "background-color:yellow")
                }
                else {
                    if (intHour == 0) { intHour = "0" + intHour; }
                    if (intMin == 0) { intMin = "0" + intMin; }
                    text = intHour + ":" + intMin;
                    $(lblRemainigHour).removeAttr("style", "background-color:yellow")
                    $(txtRemainigHour).removeAttr("style", "background-color:yellow")
                }
                $(txtRemainigHour).text(text);
            }
        });
    }


    var $s = $('select');
    var ddltxtUniqueId = 1;
    var Enum_DropdowntxtId = { 'DropdownProject': 'txtId1', 'DropdownTask': 'txtId2', 'DropdownWorkEvent': 'txtId3' };
    //$(':not(#btn)').click(function (e) {
    //    $(".ui-autocomplete").hide()
    //});

    $(document).click(function (event) {
        var target = $(event.target);

        if (target.attr('class') == 'ui-button-icon-primary ui-icon ui-icon-triangle-1-s') {
            if (event.originalEvent != undefined) {
                //  if (target.attr('class') == 'ui-button-icon-primary ui-icon ui-icon-triangle-1-s')
                $(".ui-autocomplete").hide();
                $(target).trigger('click');
            }

        }
        else {
            $(".ui-autocomplete").hide();
        }

        //ui-autocomplete ui-front ui-menu ui-widget ui-widget-content ui-corner-all

    })

    BindProj("#combobox");
    BindWorkEvent();
    $("#ddlWorkEvent").append($("<option></option>").val("0").html("Select/Type work event"));
    $("#ddlTask").append($('<option></option>').val(0).html("Select/Type Task"));
    CreateAutocomplete();
    AutocompeteCombobox("#combobox", "#ddlTask", "#ddlWorkEvent");



    //$("#combobox").trigger("autocompletechange");
    //$("#combobox").stop();
    //setDefault();

    //callbacks.disable();

    var $rowNo = 0;
    SearchAndHighlightTask();

    OverRideTreeViewFunctionality();

    $(document).on('click', '.cTasklink', ShowTree)

    $("#popup_TaskTreeView").hover(
                            function () {

                                //$(this).show()
                            }
                             , function () {
                                 //$(this).hide()
                             }

                   );

    //);

    function ShowTree() {

        var $link = $(this);
        $rowNo = $(this).parent().parent().index();
        $("#tbody_TaskData").empty();

        GetTaskDetails($rowNo,
            function (IsSucess) {
                if (IsSucess) {


                    $("#popup_TaskTreeView").dialog({ "height": 400, width: 400, modal: true, title: "Task Tree", show: { effect: "blind", duration: 100 }, hide: { effect: "blind", duration: 100 } })
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
    }
    function HideTree() {
        // $("#popup_TaskTreeView").hide()
        // alert('out ');

        $("#popup_TaskTreeView").dialog("close");

    }

    //$(".ddlTask").append($('<option></option>').val(-1).html("Select Task"));
    $(".datepicker").datepicker({

        changeMonth: false,
        changeYear: false,
        showWeek: false,
        firstDay: 1,
        showOn: "button",
        buttonImage: "../images/datepicker.gif",
        buttonImageOnly: true,
        dateFormat: 'mm/dd/yy'
        //                        ,
        //                        onClose: function () {
        //                            $(this).valid();
        //                        }
    });

    $(".datepicker").on("change", function () {

        var Date = $(this).val();
        var Chkbox = $(this).parent().parent().find("input[name$='Home']");

        if (Date != undefined) {
            $.ajax({
                type: 'POST',
                url: 'AddMultipleTimeSheetEntry.aspx/CheckFreezingDate',
                contentType: 'application/json',
                data: "{'EntryDate':'" + Date + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {

                    Chkbox.prop("disabled", msg.d);
                }
            });
        }
        //
    });

    $(document).on('change', '[type="radio"]', function () {

        var TaskName = $(this).closest('td').text();
        var TaskId = $(this).val();

        var grd = document.getElementById('myTable');
        //var getHtml = $(grd.rows[$rowNo].cells[2].childNodes[4]);
        //var taskName;

        var ddlTask = $(grd.rows[$rowNo].cells[2].childNodes[4]);
        ddlTask.val(TaskId);
        ($(grd.rows[$rowNo].cells[2].childNodes[5]).find('input.custom-combobox-input')).val(TaskName);

        var hdnfld = $(grd.rows[$rowNo].cells[2].childNodes[11]);
        hdnfld.val(TaskId);
        var temp = ddlTask.val();

        HideTree();
    });



    $(function () {

        //Clear();
        var table = document.getElementById('myTable');

        $('.ddlProject').change(function (e) {

            getData(this);
        });
        $('.txtDesc').keydown(function (e) {
            if (e.which == 9) { // if tab key 
                $(table.rows[1].cells[6].childNodes[1]).attr("id", 1);
                addRowToGrid(this);
            }
        });

        $("[id$='chkSelect']").prop("checked", true);
    });
    function getData(data) {

        var id = data.id;
        var drp = $(data);


        var grd = document.getElementById('myTable');

        var taskID = $(data).next().next().attr("ID");



        var projectID = $(data).val();

        var postData = {
            ProjectID: projectID
        }
        $.ajax({
            type: 'POST',
            url: 'AddMultipleTimeSheetEntry.aspx/GetData',
            contentType: 'application/json',
            data: JSON.stringify(postData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {

                var jsonResult = jQuery.parseJSON(msg.d);                
                var tblChild = jsonResult.ddlTask;

                var CurrentTaskDropdown = drp.next();
                CurrentTaskDropdown.empty();
                CurrentTaskDropdown.append($('<option></option>').val(-1).html("Select Task"));

                for (var c = 0; c < tblChild.length; c++) {

                    CurrentTaskDropdown.append($('<option></option>').val(tblChild[c].WBSID).html(tblChild[c].ChildWBSName));

                }

            },
            error: function (error) {
                alert('Error');
            }

        });

    }
    function addRowToGrid(data) {
        if (validationForRow($(data).parent().parent().index()))
            AddNewRow();

    }

    function validationForRow(len) {

        var grd = document.getElementById('myTable');
        var projectID = grd.rows[len].cells[2].childNodes[1].value;
        // var taskUpdatePanel = grd.rows[i].cells[2].childNodes[1];
        // var taskID = taskUpdatePanel.children[0].value;
        var txtDate = grd.rows[len].cells[1].childNodes[1].value;
        var taskID = grd.rows[len].cells[2].childNodes[4].value;

        var workEventID = grd.rows[len].cells[3].childNodes[1].value;

        var hour = grd.rows[len].cells[3].childNodes[14].value;
        var min = grd.rows[len].cells[3].childNodes[16].value;
        var desc = grd.rows[len].cells[6].childNodes[1].value.trim();
        var Minute = parseInt(hour * 60) + parseInt(min);


        if (hour == 24 && min > 0) {
            alert('Please select valid time');
            return false;
        }
        if (txtDate == '') {
            alert('Please select Date');
            $(grd.rows[len].cells[1].childNodes[1]).focus();
            return false;
        }
        if (moment(txtDate, "MM/DD/YYYY").isValid() == false) {

            alert('Please select Valid Date');
            $(grd.rows[len].cells[1].childNodes[1]).focus();
            return false;
        }

        if (projectID == '0') {
            alert('Please select Project');
            $(grd.rows[len].cells[2].childNodes[1]).focus();
            return false;
        }

        if (taskID == '0') {
            alert('Please select Task');
            $(grd.rows[len].cells[2].childNodes[3]).focus();
            return false;
        }
        if (workEventID == '0') {
            alert('Please select Work Event');
            $(grd.rows[len].cells[3].childNodes[1]).focus();
            return false;
        }
        if (Minute == 0) {
            alert('Please select Time Duration');
            $(grd.rows[len].cells[3].childNodes[3]).focus();
            return false;
        }
        if (desc == '') {
            alert('Please enter work Description');

            $(grd.rows[len].cells[6].childNodes[1]).focus();
            return false;
        }

        return true;
    }
    function validateEachRow() {
        var grd = document.getElementById('myTable');
        for (c = 1; c < grd.rows.length; c++) {
            if (grd.rows[c].cells[0].childNodes[1].checked == true) {
                if (!validationForRow(c)) {
                    return false;
                }
            }
        }
        return true;
    }


    function AddNewRow() {
        var grd = document.getElementById('myTable');


        $("#myTable tr:eq(1)").clone().find("input,select,a,textarea,span").each(function () {

            if (this.type == 'text' && this.className.indexOf('hasDatepicker') > 0) {
                $(this).attr({
                    'value': '',
                    'id': 'txt' + parseInt($("#myTable tr").length),
                    'text': '',
                    'tabindex': parseInt($(this).attr('tabindex')) + (10 * (parseInt($("#myTable tr").length) - 1))
                });
                $(this).next().remove();
                $(this).removeClass('hasDatepicker');
            }
            else {
                if ($(this).attr("id") == "lblArsHours") {
                    $(this).text("00:00");

                }
                if ($(this).attr("id") == "txtRemainingHours") {
                    $(this).text("00:00");

                    $(this).removeAttr("style", "background-color:yellow")
                }
                if ($(this).attr("id") == "lblRemainigHours") {
                    $(this).removeAttr("style", "background-color:yellow")
                }
                $(this).attr({
                    'value': '',
                    'text': '',
                    'tabindex': parseInt($(this).attr('tabindex')) + (10 * (parseInt($("#myTable tr").length) - 1))
                });
            }
        }).end().appendTo("#myTable");

        var currentrow = $("#myTable tr").length - 1;

        $("#myTable tr:eq(" + currentrow + ")").find("input[id$='txt" + parseInt(($('#myTable tr').length) - 1) + "']").datepicker({
            changeMonth: false,
            changeYear: false,
            showWeek: false,
            firstDay: 1,
            showOn: "button",
            buttonImage: "../images/datepicker.gif",
            buttonImageOnly: true,
            dateFormat: 'mm/dd/yy',
            onSelect: function () {

                var thisDate = $(this).val();
                var thisrowNo = $(this).parent().parent().index();
                DisplayHours(thisDate, thisrowNo);

            }

        });
        $("#myTable tr:eq(" + currentrow + ")").find("input[name$='Home']").prop("disabled", false);


        $("#myTable tr:eq(" + currentrow + ")").find("input").each(function () {
            var type = this.type;
            var tag = this.tagName.toLowerCase();
            if (type == 'text' || tag == 'textarea')
                this.value = "";
            else if (type == 'checkbox' || type == 'radio')
                this.checked = false;
        });     
        
        var ProjectDrodown = $("#myTable tr:eq(" + currentrow + ")").find("select")[0];
        var TaskDropdown = $("#myTable tr:eq(" + currentrow + ")").find("select")[1];

        var WorkEventDropdown = $("#myTable tr:eq(" + currentrow + ")").find("select")[2];
        //remove previous row's combobox
        var span = $(grd.rows[currentrow].cells[2]).find('.custom-combobox');
        $(span).remove();

        var spanWorkEvent = $(grd.rows[currentrow].cells[3]).find('.custom-combobox');
        $(spanWorkEvent).remove();

        // apply autocomplete combobox
        AutocompeteCombobox(ProjectDrodown, TaskDropdown, WorkEventDropdown);

        if ($("#rptProject").is(':checked')) {

            var PreviousRow_ProjectDrodownValue = $($("#myTable tr:eq(" + currentrow + ")").prev().find("select")[0]).val();

            //var ProjectName = $($("#myTable tr:eq(" + currentrow + ")").prev().find('input.custom-combobox-input')).val();
            var ProjectName = ($(grd.rows[currentrow - 1].cells[2].childNodes[2]).find('input.custom-combobox-input')).val();
            ($(grd.rows[currentrow].cells[2].childNodes[2]).find('input.custom-combobox-input')).val(ProjectName);
            $(ProjectDrodown).val(PreviousRow_ProjectDrodownValue);

            //$(ProjectDrodown).val(PreviousRow_ProjectDrodownValue);
        }
        if ($("#rptTask").is(':checked')) {

            var PreviousRow_ProjectDrodownValueForTask = $($("#myTable tr:eq(" + currentrow + ")").prev().find("select")[1]).val();


            var PreviousRow_ProjectDrodownValue = $($("#myTable tr:eq(" + currentrow + ")").prev().find("select")[0]).val();
            $(ProjectDrodown).val(PreviousRow_ProjectDrodownValue);
            var ProjectId = PreviousRow_ProjectDrodownValue

            BindTask(ProjectId, TaskDropdown)
            $(TaskDropdown).val(PreviousRow_ProjectDrodownValueForTask);
            var TaskName = ($(grd.rows[currentrow - 1].cells[2].childNodes[5]).find('input.custom-combobox-input')).val();

            ($(grd.rows[currentrow].cells[2].childNodes[5]).find('input.custom-combobox-input')).val(TaskName);

            $(ProjectDrodown).val(PreviousRow_ProjectDrodownValue);


            var PreviousRow_TaskName = $($("#myTable tr:eq(" + currentrow + ")").prev().find("label")[0]).text();
            var PreviousRow_TaskValue = $("#myTable tr:eq(" + currentrow + ")").prev().find("input:hidden").val();
            $($("#myTable tr:eq(" + currentrow + ")").find("input:hidden")).val(PreviousRow_TaskValue);
        }
        else {
            if ($("#rptProject").is(':checked')) {
                var PreviousRow_ProjectDrodownValue = $($("#myTable tr:eq(" + currentrow + ")").prev().find("select")[0]).val();
                var ProjectId = PreviousRow_ProjectDrodownValue

                BindTask(ProjectId, TaskDropdown)
            }
            else {
                $(TaskDropdown).children('option:not(:first)').remove();
            }
            var PreviousRow_TaskName = $($("#myTable tr:eq(" + currentrow + ")").find("label")[0]).text("");
            //var PreviousRow_TaskValue = $("#myTable tr:eq(" + currentrow + ")").prev().find("input:hidden").val();
            $($("#myTable tr:eq(" + currentrow + ")").find("input:hidden")).val();
        }

        var currentrow = $("#myTable tr").length - 1;
        $("#myTable tr:eq(" + currentrow + ")").find("input[name$='Home']").prop("disabled", false);
        $("#myTable tr:eq(" + currentrow + ")").find("input").each(function () {

            if ($(this).hasClass('custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left ui-autocomplete-input') == false) {
                var type = this.type;
                var tag = this.tagName.toLowerCase();
                if (type == 'text' || tag == 'textarea')
                    this.value = "";
                else if (type == 'checkbox' || type == 'radio')
                    this.checked = false;
            }
        });
        $(".datepicker").datepicker({
            changeMonth: false,
            changeYear: false,
            showWeek: false,
            firstDay: 1,
            showOn: "button",
            buttonImage: "../images/datepicker.gif",
            buttonImageOnly: true,
            dateFormat: 'mm/dd/yy'
        });
        $(".datepicker").on("change", function () {

            var Date = $(this).val();
            var Chkbox = $(this).parent().parent().find("input[name$='Home']");
            $.ajax({
                type: 'POST',
                url: 'AddMultipleTimeSheetEntry.aspx/CheckFreezingDate',
                contentType: 'application/json',
                data: "{'EntryDate':'" + Date + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {

                    Chkbox.prop("disabled", msg.d);
                }
            });
            //
        });
        $rowNo = currentrow;


        
        $('.txtDesc').unbind("keydown");
        $('.txtDesc').keydown(function (e) {
            if (e.which == 9) {
                addRowToGrid(this);
            }
        });
        $("#myTable tr:eq(" + currentrow + ")").find("[id$='chkSelect']").prop("checked", true);
        //var TaskDropDown = $("#myTable tr:eq(" + currentrow + ")").find('select[id$="ddlTask"]');
        //TaskDropDown.empty();
        //TaskDropDown.append($('<option></option>').val("").html("-Select Task-"));
        //var table = document.getElementById('myTable');

        ////  var tbod = grd.rows[0].parentNode;
        ////  var newRow = grd.rows[grd.rows.length - 1].cloneNode(true);
        ////tbod.appendChild(newRow);
        //var rowCount = table.rows.length;
        //var row = table.insertRow(rowCount);
        ////alert(row);
        //var colCount = table.rows[1].cells.length;

        //for (var i = 0; i < colCount; i++) {
        //    var newcell = row.insertCell(i);
        //    
        //    newcell.innerHTML = table.rows[1].cells[i].innerHTML;

        //    //if (i == 0) {
        //    //    $(newcell.childNodes[1]).prop("checked", true);
        //    //}
        //    //if (i == 2) {
        //    //    $(newcell.childNodes[1]).attr("id", rowCount); //Bind unique  Id to ddlProject 

        //    //}
        //    //if (i == 7) {
        //    //    $(newcell.childNodes[1]).attr("id", rowCount);
        //    //}
        //}




        //// $('.ddlTask').attr("id", "ddlTask" + rowCount);

        ////  $('.txtDesc').attr("id", rowCount);

        //$(table.rows[table.rows.length - 1].cells[0].childNodes[1]).focus();

        //return false;
    }

    function DeleteRow() {
        var grd = document.getElementById('myTable');
        for (var i = 1; i < grd.rows.length; i++) {
            var len = grd.rows.length;
            //alert(len);
            if (len > 2) {
                var chkDelete = grd.rows[i].cells[0].childNodes[1];
                if (chkDelete.checked == true) {
                    grd.deleteRow(i);
                    i--;
                }
            }
        }
        return false;
    }


    function save() {

        if (validateEachRow()) {

            var grd = document.getElementById('myTable');
            var lstTimesheetEntry = new Array();

            for (var i = 1; i < grd.rows.length; i++) {
                if (grd.rows[i].cells[0].childNodes[1].checked == true) {

                    var CurrentDate = grd.rows[i].cells[1].childNodes[1].value;
                    var ValidEntry = dateChange(CurrentDate);
                    if (!ValidEntry)
                        return false;

                    var txtDate = grd.rows[i].cells[1].childNodes[1].value;
                    var projectID = grd.rows[i].cells[2].childNodes[1].value;
                    var taskID = grd.rows[i].cells[2].childNodes[4].value;
                    var workEventID = grd.rows[i].cells[3].childNodes[1].value;
                    var hour = grd.rows[i].cells[3].childNodes[14].value;
                    var min = grd.rows[i].cells[3].childNodes[16].value;
                    var desc = grd.rows[i].cells[6].childNodes[1].value;
                    var Minute = parseInt(hour * 60) + parseInt(min);

                    var chkIncludeInClientTimeSheet = grd.rows[i].cells[4].childNodes[1].checked;
                    var chkWorkFrmHome = grd.rows[i].cells[5].childNodes[1].checked;

                    var isBillingHours = 0;
                    var IsWorkFromHome = 0;

                    if (chkIncludeInClientTimeSheet == true)
                        isBillingHours = 1;

                    if (chkWorkFrmHome == true)
                        IsWorkFromHome = 1;

                    //var dateArray = txtDate.split('/');
                    //var month = parseInt(dateArray[0]) - 1;
                    //var day = dateArray[1];
                    //var year = dateArray[2];

                    //var dateToCreate = new Date(year, month, day);

                    //dateChange();

                    var postData = {
                        ProjectID: projectID,
                        WorkEventID: workEventID,
                        Min: Minute,
                        Desc: desc,
                        Date: txtDate,
                        IsBillingHours: Boolean(isBillingHours),
                        IsWorkFromHome: Boolean(IsWorkFromHome),
                        TaskID: taskID
                    };

                    lstTimesheetEntry.push(postData);
                }
            }



            $.ajax({


                type: 'POST',
                url: 'AddMultipleTimeSheetEntry.aspx/SaveDataEntry',
                contentType: 'application/json',
                data: JSON.stringify({ lstTimesheetEntry: lstTimesheetEntry }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (msg) {

                    var json = $.parseJSON(msg.d)
                    $('#lblMessage').text(json.Message);
                    if (json.status) {

                        $('#lblMessage').removeClass('alert alert-warning');
                        $('#lblMessage').addClass('alert alert-success');
                        Clear();
                        var rowCount = $('#myTable tr').length;                        
                        if (rowCount <= 1)
                            location.reload();
                        //    $("[id$='chkSelect']").prop("checked", true);
                    }
                    else {
                        $('#lblMessage').removeClass('alert alert-success');
                        $('#lblMessage').addClass('alert alert-warning');

                    }
                }
            });




        }

    }


    //$(".datepicker").on("change", function () {
    //    var Date = $("#HeadContent_MainContent_datepicker_txtToEventDate").val();
    //    $.ajax({
    //        type: 'POST',
    //        url: 'AddMultipleTimeSheetEntry.aspx/CheckFreezingDate',
    //        contentType: 'application/json',
    //        data: "{'EntryDate':'" + Date + "'}",
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (msg) {
    //            $("#MainContent_ChkWorkFrmHome").prop("disabled", msg.d);
    //        }
    //    });
    //    //
    //});
    function dateChange(CurrentDate) {

        var today = new Date();
        var dateArray = CurrentDate.split('/');
        var month = parseInt(dateArray[0]) - 1;
        var day = dateArray[1];
        var year = dateArray[2];

        var dateToCreate = new Date(year, month, day);
        if (dateToCreate > today) {
            alert('Future entry not allowed');
            //  btnSave.disabled = true;
            return false;
        }
        var EntryAllowDays = $("INPUT[id*=hdEntryAllowdays]").val();

        today.setDate(today.getDate() - EntryAllowDays);
        if (dateToCreate < today) {
            alert("Time Sheet entry  can not be added");

            return false;
        }
        return true;
    }

    $(document).on('change', '.ddlProject', function () {
        //$rowNo = $(this).parent().parent().index();
        //$("#tbody_TaskData").empty();
        //GetTaskDetails($rowNo);   //  
    });
    //$(document).on('click', "#Tasklink", function () {
    //    $rowNo = $(this).parent().parent().index();
    //    $("#tbody_TaskData").empty();


    //    GetTaskDetails($rowNo);


    //    var offset, top, left;
    //    var $this = $(this);
    //    offset = $this.offset();
    //    top = offset.top - 170;
    //    top = (top > 0) ? top : 0;
    //    left = offset.left + 20;
    //    left = (left > 0) ? left : 0;

    //    $("#popup_TaskTreeView").show();



    //    //$("#popup_TaskTreeView").show().css({top:100,left:100, width:100})
    //    //$("#popup_TaskTreeView").dialog({
    //    //    width: 650,
    //    //    height: 650,
    //    //    title: "Task List",
    //    //    draggable: false,
    //    //    resizable: true,
    //    //    modal: true,
    //    //    open: function () {
    //    //      //  GetTaskDetails($rowNo);
    //    //    }
    //    //});
    //});


    //$(".cTasklink").live().hover(



    function GetTaskDetails($row, callback) {
        var id = $row;
        var grd = document.getElementById('myTable');

        var projectID = grd.rows[id].cells[2].childNodes[1].value;
        var hdnfld = $(grd.rows[id].cells[2].childNodes[11]);
        var TaskId = hdnfld.val();
        var IsRecordFound = false;

        $.when(
        $.ajax({
            type: "POST",
            url: "AddMultipleTimeSheetEntry.aspx/GetData",
            async: false,
            data: '{"ProjectID":"' + projectID + '"}',
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
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

                    if (TaskId != "")
                        $('table input[value=' + TaskId + '] ').attr("checked", true)

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
                        $Parentrow.append('<td><input type=radio name =TaskName value=' + thisParId + '>' + name + '</td>');
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
        $childRow.append('<td> <input type=radio name =TaskName value=' + childId + '>' + childEmpName + '</td>');
    }



    $('#btnSave').click(save);



    function SearchAndHighlightTask() {


        var highlight = function (string) {


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

                    $(this).html(nodeToExpand + radiobuttonToSelect + Text);

                }



            });
        };


        /* filter products */
        $("#txtSearchTask").on("keyup  input", function () {
            //if (this.value.length > 0) {
            $("#tblTask_treeview tr td").removeClass("match").filter(function () {
                return $(this).text().toLowerCase().indexOf($("#txtSearchTask").val().toLowerCase()) != -1;
            }).addClass("match").show();
            highlight(this.value);
            $("#tViewParentTask").show();
            //}
            //else {
            //    $("#tViewParentTask , #tViewParentTask a").removeClass("match");//.hide();
            //}
        });



        function CustomScrollTreeView(_field) {

            //  $(function () {
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


    }


    function OverRideTreeViewFunctionality() {


        $(document).on('click', '#tblTask_treeview tr td span.indenter a', function (event) {
            event.preventDefault();
            event.stopPropagation();
            var self = this;
            var parentTr = $(self).parents('tr');




            //t = $("#tblTask_treeview");
            //t.treetable("expandNode(" + nodeid + ")");
            if ($(parentTr).hasClass("expanded")) {
                $("#tblTask_treeview").treetable("collapseNode", $(parentTr).attr('data-tt-id'));
            }
            else {
                $("#tblTask_treeview").treetable("expandNode", $(parentTr).attr('data-tt-id'));


            }


        });



        //$('#tblTask_treeview tr td span.indenter a').click(
        //    function ()
        //    {

        //        var self = this;
        //        var nodeid = $(self).parent('tr').attr('data-tt-id');


        //        t = $("#tblTask_treeview");
        //        t.treetable(expandNode(nodeid));


        //    })


    }
    function BindProj(projId) {
        $.ajax({
            type: 'POST',
            url: 'AddMultipleTimeSheetEntry.aspx/dtProjectDetails',
            contentType: 'application/json',
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (result) {
                var ProjDetail = jQuery.parseJSON(result.d);

                $("#combobox").append($("<option></option>").val("0").html("Select/Type project"));
                for (var i = 0; i < ProjDetail.length; i++) {
                    $("#combobox").append($("<option></option>").val(ProjDetail[i].projectID).html(ProjDetail[i].proName));
                }
                // $("#combobox").val("0");

            }
        });
    }
    function BindWorkEvent() {
        $.ajax({
            type: 'POST',
            url: 'AddMultipleTimeSheetEntry.aspx/BindWorkEvent',
            contentType: 'application/json',
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var WorkEvent = jQuery.parseJSON(result.d);
                
                //$("#ddlWorkEvent").append($("<option></option>").val("0").html("Select/Type work event"));
                for (var i = 0; i < WorkEvent.length; i++) {
                    $("#ddlWorkEvent").append($("<option></option>").val(WorkEvent[i].workEventID).html(WorkEvent[i].weName));
                }
            }
        });
    }

    function CreateAutocomplete() {

        $.widget("custom.combobox", {

            _create: function () {
                this.wrapper = $("<span>")
                    .addClass("custom-combobox")
                    .insertAfter(this.element);
                this.element.hide();
                this._createAutocomplete();
                this._createShowAllButton();
            },

            _createAutocomplete: function () {
                var selected = this.element.children(":selected"),
                    value = selected.val() ? selected.text() : "";

                this.input = $("<input id='txtId" + ddltxtUniqueId++ + "'>")
                    .appendTo(this.wrapper)
                    .val(value)
                    .attr("title", "")
                    .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
                    .autocomplete({
                        delay: 0,
                        minLength: 0,
                        source: $.proxy(this, "_source")
                    })
                    .tooltip({
                        tooltipClass: "ui-state-highlight"
                    })
                    .on('mouseup', function () {
                        $(this).select();
                    });

                $(this).blur();

                this._on(this.input, {
                    autocompleteselect: function (event, ui) {
                        ui.item.option.selected = true;
                        this._trigger("select", event, {
                            item: ui.item.option
                        });
                    },

                    autocompletechange: "_removeIfInvalid"
                });
            },

            _createShowAllButton: function () {
                var input = this.input,
                    wasOpen = false;

                $("<a>")
                    .attr("tabIndex", -1)
                    .attr("title", "Show All Items")
                    //.attr("id", "ddlbtn" + ddlBtnUniqueId++)
                    .tooltip()
                    .appendTo(this.wrapper)
                    .button({
                        icons: {
                            primary: "ui-icon-triangle-1-s"
                        },
                        text: false
                    })
                    .removeClass("ui-corner-all")
                    .addClass("custom-combobox-toggle ui-corner-right")
                    .mousedown(function () {
                        wasOpen = input.autocomplete("widget").is(":visible");
                    })
                    .click(function () {
                        input.focus();
                        input.blur();

                        // Close if already visible
                        if (wasOpen) {
                            return;
                        };

                        // Pass empty string as value to search for, displaying all results
                        input.autocomplete("search", "");
                    });
            },

            _source: function (request, response) {
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                response(this.element.children("option").map(function () {
                    var text = $(this).text();
                    if (this.value && (!request.term || matcher.test(text))) return {
                        label: text,
                        value: text,
                        option: this
                    };
                }));
            },

            _removeIfInvalid: function (event, ui) {
                // Selected an item, nothing to do
                if (ui.item) {

                    var selected = this.element;
                    return;
                };

                // Search for a match (case-insensitive)
                var default_text = "";

                var value = this.input.val(),
                    valueLowerCase = value.toLowerCase(),
                    valid = false;

                this.element.children("option").each(function () {

                    if ($(this).val() == "default") {
                        default_text = $(this).text();
                    };

                    if ($(this).text().toLowerCase() === valueLowerCase) {
                        this.selected = valid = true;
                        return false;
                    };
                });

                // Found a match, nothing to do
                if (valid) {
                    return;
                };

                // Remove invalid value
                this.input.val(default_text)
                    .attr("title", value + " didn't match any item")
                    .tooltip("open");

                this._delay(function () {
                    this.input.tooltip("close").attr("title", "");
                }, 2500);
                this.input.data("ui-autocomplete").term = "";
            },

            _destroy: function () {
                this.wrapper.remove();
                this.element.show();
            },

            refresh: function () {
                selected = this.element.children(":selected");
                this.input.val(selected.text());
            },

            select: function (event, ui) {
                ui.item.option.selected = true;
                self._trigger("selected", event, {
                    item: ui.item.option
                });
                select.trigger("change");
            },

            change: function (event, ui) {
                $("#combobox").val('0');
                if (!ui.item) {
                    var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex($(this).val()) + "$", "i"),
                        valid = false;
                    select.children("option").each(function () {
                        if ($(this).text().match(matcher)) {
                            this.selected = valid = true;
                            return false;
                        };
                    });
                    if (!valid) {
                        // remove invalid value, as it didn't match anything
                        $(this).val("");
                        select.val("");
                        input.data("autocomplete").term = "";
                        return false;
                    };
                };
            }
        });
    }

    function AutocompeteCombobox(id, taskId, WorkEvent) {
        $(id).combobox({
            select: function (event, ui) {

                var ddlProjectId = $(this).attr('id');
                // bind task dropdown list
                var ProjectId = $(this).val();

                var drp = $(this);
                var grd = document.getElementById('myTable');


                //var taskID = $(data).next().attr("ID");
                var taskID = $(this).next().next().attr("ID");




                var postData = {
                    ProjectID: ProjectId
                }
                $.ajax({
                    type: 'POST',
                    url: 'AddMultipleTimeSheetEntry.aspx/GetData',
                    contentType: 'application/json',
                    data: JSON.stringify(postData),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (msg) {

                        var jsonResult = jQuery.parseJSON(msg.d);


                        var tblChild = jsonResult.ddlTask;


                        var CurrentTaskDropdown = drp.next().next();
                        CurrentTaskDropdown.empty();
                        CurrentTaskDropdown.append($('<option></option>').val(0).html("Select/Type Task"));

                        for (var c = 0; c < tblChild.length; c++) {
                            CurrentTaskDropdown.append($('<option></option>').val(tblChild[c].WBSID).html(tblChild[c].ChildWBSName));

                        }

                    },

                });
            }
        })

        $(taskId).combobox();
        $(WorkEvent).combobox();

    }
    function BindTask(ProjectId, TaskDropdown) {

        var postData = {
            ProjectID: ProjectId
        }
        $.ajax({
            type: 'POST',
            url: 'AddMultipleTimeSheetEntry.aspx/GetData',
            contentType: 'application/json',
            data: JSON.stringify(postData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (msg) {

                var jsonResult = jQuery.parseJSON(msg.d);


                var tblChild = jsonResult.ddlTask;

                //   var CurrentTaskDropdown = drp.next().next();
                $(TaskDropdown).empty();
                $(TaskDropdown).append($('<option></option>').val(0).html("Select/Type Task"));

                for (var c = 0; c < tblChild.length; c++) {
                    $(TaskDropdown).append($('<option></option>').val(tblChild[c].WBSID).html(tblChild[c].ChildWBSName));

                }

            },

        });
    }
    //function to set the selected value as default
    function setDefault() {

        $('#combobox option').each(function () {

            if (($(this).attr('value')) === 0) {

                $(this).attr('selected', 'selected');
            }
        });
    }

    $("#btndeleteRow").click(function () {
        DeleteRow();
    });

    $('#rptProject').click(function () {
        if ($('#rptProject').is(':checked') == false) {
            $('#rptTask').prop('checked', false);
        }
    });
    $('#rptTask').click(function () {
        if ($('#rptTask').is(':checked') == true) {
            $('#rptProject').prop('checked', true);
        }
    });

    $("#lnkAddConfiguration").click(function () {
        "<div id='ConfigPage'><iframe width='100%' height='100%' id='PageFrame'></iframe></div>";
        var page = "../Admin/TimesheetConfiguration.aspx";
        var $dialog = $('<div  id="ConfigPage"></div>')
                       .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
                       .dialog({
                           autoOpen: false,
                           modal: true,
                           height: 365,
                           width: 1009,
                           draggable: false,
                           resizable: false,
                           title: "Add / Edit Timesheet Configuration",
                           close: function () { $("#ConfigPage").remove(); }
                       });
        $dialog.dialog('open');
    });
});

function Clear() {

    var grd = document.getElementById('myTable');
    var len = grd.rows.length;
    //for (var i = 2; i < grd.rows.length; i++) {
    //    grd.deleteRow(i);

    //    i--;
    //}
    for (var i = (grd.rows.length - 1) ; i > 0; i--) {
        if (grd.rows[i].cells[0].childNodes[1].checked == true) {
            grd.deleteRow(i);
        }

    }

    $("#tbody_TaskData").empty();

    for (c = 1; c < grd.rows.length; c++) {
        if (grd.rows[c].cells[0].childNodes[1].checked == true) {
            var thisrow = grd.rows[c];
            $(thisrow).find("span").each(function () {
                if ($(this).attr("id") == "lblArsHours") {
                    $(this).text("00:00");
                }
                if ($(this).attr("id") == "txtRemainingHours") {
                    $(this).text("00:00");
                }
            });
            $(thisrow).find("input").each(function () {
                var type = this.type;
                var tag = this.tagName.toLowerCase();

                if (type == 'text' || tag == 'textarea')
                    this.value = "";
                else if (type == 'checkbox' || type == 'radio')
                    this.checked = false;
                else if (tag == 'select')
                    this.selectedIndex = 0;
            });
        }
    };

    //$("#myTable tr").find("span").each(function () {

    //    if ($(this).attr("id") == "lblArsHours") {
    //        $(this).text("00:00");
    //    }
    //    if ($(this).attr("id") == "txtRemainingHours") {
    //        $(this).text("00:00");
    //    }
    //});
    //$("#myTable :input").each(function () {
    //    var type = this.type;
    //    var tag = this.tagName.toLowerCase();

    //    if (type == 'text' || tag == 'textarea')
    //        this.value = "";
    //    else if (type == 'checkbox' || type == 'radio')
    //        this.checked = false;
    //    else if (tag == 'select')
    //        this.selectedIndex = 0;
    //});
    //for (var i = 1; i < grd.rows.length; i++) {
    //    var task = grd.rows[i].cells[2].childNodes[4];
    //    $(task).empty();
    //    $(task).append($('<option></option>').val(0).html("Please select Task"));
    //    var grd = document.getElementById('myTable');
    //    var project = (grd.rows[1].cells[2].childNodes[2]);
    //    var txtRemainigHour = grd.rows[i].cells[3].childNodes[12];
    //    var lblRemainigHour = grd.rows[i].cells[3].childNodes[10];
    //    var projInput = $(project).children().eq(1);
    //    projInput.val("Please select project");

    //    var task = grd.rows[1].cells[2].childNodes[5];
    //    var taskInput = $(task).children().eq(1);
    //    taskInput.val("Please select task");


    //    var workEvent = grd.rows[1].cells[3].childNodes[2];
    //    var workEventInput = $(workEvent).children().eq(1);
    //    workEventInput.val("Please select work event");

    //    $(lblRemainigHour).removeAttr("style", "background-color:yellow")
    //    $(txtRemainigHour).removeAttr("style", "background-color:yellow")
    //}

}
window.onload = function (e) {
    var Enum_DropdowntxtId = { 'DropdownProject': 'txtId1', 'DropdownTask': 'txtId2', 'DropdownWorkEvent': 'txtId3' };
    $('#' + Enum_DropdowntxtId.DropdownProject).val($('#combobox option:first-child').text());
    $('#' + Enum_DropdowntxtId.DropdownTask).val($('#ddlTask option:first-child').text());
    $('#' + Enum_DropdowntxtId.DropdownWorkEvent).val($('#ddlWorkEvent option:first-child').text());


}




