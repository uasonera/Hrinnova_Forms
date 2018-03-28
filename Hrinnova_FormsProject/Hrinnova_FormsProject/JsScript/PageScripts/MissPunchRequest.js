var ObjDeletedRecord = [];
var EnumRecordStatus = {
    "OldRecord": 1,
    "NewRecord": 2
};
$(document).ready(function () {

    var AttendanceViewModel = {
        AttendaceSummary: ko.observableArray([]),
    }

    var allPunchDetailsViewModel = {
        PunchDetails: ko.observableArray([]),
    }

    var selectedEmpDetailsViewModel = {
        EmpDetails: ko.observableArray([]),
    }
    ko.applyBindings(AttendanceViewModel, document.getElementById("divAttendaceDetails"));
    ko.applyBindings(allPunchDetailsViewModel, document.getElementById("tblAllpuchDetail"));
    ko.applyBindings(selectedEmpDetailsViewModel, document.getElementById("tblEmpDetail"));

    $.ajax({
        type: "POST",
        url: "InOutAdjustment.aspx/BindEmployeeList",
        data: '{}',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        async: false,
        success: function (data) {

            var EmployeeList = jQuery.parseJSON(data.d);
            $("#ddlEmployeeList").append($("<option></option>").val("0").html("--Select Employee--"));
            for (var i = 0; i < EmployeeList.length; i++) {
                $("#ddlEmployeeList").append($("<option></option>").val(EmployeeList[i].empID).html(EmployeeList[i].EmployeeName));
            }
        },
        error: function (data) {
        }
    });
    BindMonthsddl();

    function BindMonthsddl() {

        function ViewModel() {

            var self = this;

            self.availableMonths = ko.observableArray([
            { name: 'April', Id: 4 },
            { name: 'May', Id: 5 },
            { name: 'June', Id: 6 },
            { name: 'July', Id: 7 },
            { name: 'August', Id: 8 },
            { name: 'September', Id: 9 },
            { name: 'October', Id: 10 },
            { name: 'November', Id: 11 },
            { name: 'December', Id: 12 },
            { name: 'January', Id: 1 },
            { name: 'February', Id: 2 },
            { name: 'March', Id: 3 }
            ]);

            selectedMonth: ko.observable();

            //ON SELECTED INDEX CHANGED EVENT OF MONTH
            self.monthChanged = function (obj, event) {

                if (event.originalEvent) {
                    //BIND IN/OUT PUNCH DETAILS AND ARS SUMMARY DETAILS
                    BindAttendanceViewModel();
                }
                else {
                }
            }
        }
        var vm = new ViewModel();
        ko.applyBindings(vm,
         document.getElementById("ddlMonth"));

        var currDate = new Date();
        var currMonth = currDate.getMonth() + 1;
        $("#ddlMonth").val(currMonth);
        BindAttendanceViewModel();

    }

    function BindAttendanceViewModel() {
        var self = this;

        var MonthId = $("#ddlMonth").val();

        if (MonthId == "")
            MonthId = 0;

        var EmployeeId = $("#ddlEmployeeList").val();
        if (EmployeeId != 0) {

            $.ajax({
                type: "POST",
                url: 'InOutAdjustment.aspx/GetEmpAttendanceDetails',
                data: '{"ddlMonthId":"' + MonthId + '","ddlEmployee":"' + EmployeeId + '"}',
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                success: function (result) {

                    var attendanceresult = jQuery.parseJSON(result.d);
                    AttendanceViewModel.AttendaceSummary([]);

                    var filteredArray = [];
                    var i;
                    $.each(attendanceresult, function (index, item) {
                        var alreadyAdded = false;
                        for (i in filteredArray) {
                            if (filteredArray[i].EmployeeWorkingHourID == item.EmployeeWorkingHourID) {
                                alreadyAdded = true;
                            }
                        }
                        if (!alreadyAdded) {
                            filteredArray.push(item);
                        }
                        else {
                            filteredArray[i].Request = filteredArray[i].Request + " , " + item.Request;
                        }
                    });

                    for (var i = 0; i < filteredArray.length; i++) {
                        AttendanceViewModel.AttendaceSummary.push(filteredArray[i]);
                    }


                    //for (var i = 0; i < attendanceresult.length; i++) {
                    //    AttendanceViewModel.AttendaceSummary.push(attendanceresult[i]);
                    //}
                },
                error: function (result) {
                }
            });
        }
        self.clickPunch = function () {
            var date = this.Date;
            $("#lblAttendanceDate").text(date);

            var EmployeeWorkingHourID = this.EmployeeWorkingHourID;
            var CanDeleteId = "txtCanDeleted" + EmployeeWorkingHourID;
            var CanDeleted = $("#" + CanDeleteId).text();

            //var CanDeleted = $this.parent().parent().find('td:first').find("input[id*='txtCanDeleted']").text();            

            $.ajax({
                type: "POST",
                url: "InOutAdjustment.aspx/GetPuchDetails",
                data: '{"date":"' + date + '","EmpId":"' + EmployeeId + '","status":' + EnumRecordStatus.OldRecord + '}',
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                async: false,
                success: function (data) {
                    var jsonResult = data.d;
                    var punchDetails = jQuery.parseJSON(jsonResult[0]);
                    var selectedEmpDetails = jQuery.parseJSON(jsonResult[1]);

                    allPunchDetailsViewModel.PunchDetails([]);
                    selectedEmpDetailsViewModel.EmpDetails([]);
                    for (var i = 0; i < punchDetails.length; i++) {
                        allPunchDetailsViewModel.PunchDetails.push(punchDetails[i]);

                        if (CanDeleted == 0) // can not delete record
                        {
                            $("#imgDelete" + punchDetails[i].EmployeeInOutID).attr('disabled', true);
                            $("#imgDelete" + punchDetails[i].EmployeeInOutID).attr('src', '../Images/DeleteDisable.png');

                        }
                        else {
                            $("#imgDelete" + punchDetails[i].EmployeeInOutID).attr('disabled', false);
                            $("#imgDelete" + punchDetails[i].EmployeeInOutID).attr('src', '../Images/Delete.png');
                        }

                    }
                    for (var i = 0; i < selectedEmpDetails.length; i++) {
                        selectedEmpDetailsViewModel.EmpDetails.push(selectedEmpDetails[i]);
                    }


                },
                error: function (data) {
                    alert("error" + data);
                }
            });
            $("#lblMessage_Popup").hide();
            $("#popup_divShowAllpunch").dialog({
                width: 800,
                draggable: false,
                resizable: false,
                title: "Show All Punch",
                modal: true,
                close: function (event, ui) {
                    ObjDeletedRecord = [];
                    $("#tbodyPunchDetails  > tr").each(function () {
                        var rowStatus = $(this).find("input[id*='rowStatus']").val().trim();
                        if (rowStatus == EnumRecordStatus.NewRecord) {
                            $(this).remove('tr');
                        }
                    });
                }
            });
            $("#tbodyEmptyTable").show();
            $('.Time').timepicker({
                minutes: { interval: 1 },
                showPeriodLabels: false
            });

        }

    }


    $(document).on('change', '#ddlEmployeeList', function () {
        BindAttendanceViewModel();
    });
    $(document).on('click', '#btnAddRow', function () {
        $("#tbodyEmptyTable").hide();
        var rowCount = $('#tbodyPunchDetails tr').length;
        var thisRowCount = rowCount + 1;
        var date = $("#lblAttendanceDate").text();

        var textForAppend = "<tr><td style='display:none'><input id='spanEmpInOutId' type='hidden' value='' /></td><td class='header2'>In Date/Time <span class='InTimeRowNo' >" + thisRowCount + ": </td><td class='header2' style='width: 28%' ><input  class='textbox txtInDate'  size='11' maxlength='10' readonly='readonly' value='" + date + "' />&nbsp;<input id='New_InTime_" + thisRowCount + "' class='textbox Time txtInTime' size='5' maxlength='5'  /></td>";
        textForAppend = textForAppend + "<td style='width: 20%'>Out Date/Time <span class='OutTimeRowNo' > " + thisRowCount + ": </td> <td class='header2' ><input  class='textbox txtOutDate' readonly='readonly' value='" + date + "' size='11' maxlength='10'  />&nbsp;<input id='New_OutTime_" + thisRowCount + "' class='textbox Time txtOutTime' size='5' maxlength='5' /></td>";
        textForAppend = textForAppend + "  <td class='header2'> <input id='imgDelete' type='image' src='../Images/Delete.png' class='imgDelete'  /><td style='display:none'><input id='rowStatus' value=" + EnumRecordStatus.NewRecord + " /></td></tr>";


        $("#tbodyPunchDetails").append(textForAppend);
        $('.Time').timepicker({
            minutes: { interval: 1 },
            showPeriodLabels: false,
        });


    })


    $(".Time").keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57) && e.which != 58) {
            return false;
        }
    });



    $(document).on('click', '#btnSave', function () {
        var TimeRegEx = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
        var punchDetailsObj = [];
        var EmpId = $("#ddlEmployeeList").val();

        var validMessage = "";
        $("#tbodyPunchDetails   > tr").each(function () {
            item = {}
            var NextInTimeValue = "";
            var txtEmpInOutID = $(this).find("input.txtInTime").attr("id");

            var InDateValue = $(this).find("input.txtInDate").val().trim();
            var InTimeValue = $(this).find("input.txtInTime").val().trim();
            var OutDateValue = $(this).find("input.txtOutDate").val().trim();
            var OutTimeValue = $(this).find("input.txtOutTime").val().trim();
            var rowStatus = $(this).find("input[id*='rowStatus']").val().trim();

            var rowLength = $(this).next('tr').length;

            if (rowLength > 0) {
                NextInTimeValue = $(this).next('tr').find("input.txtInTime").val().trim();
            }

            var validInTime = TimeRegEx.test(InTimeValue);
            var validOutTime = TimeRegEx.test(OutTimeValue);

            var CompareOutTime = moment(OutTimeValue, "hh:mm");
            var CompareInTime = moment(InTimeValue, "hh:mm");


            if (InTimeValue == "" || OutTimeValue == "") {
                validMessage = "Please insert all In Time and Out Time";
            }
            else if (validInTime == false || validOutTime == false) {
                validMessage = "Please Insert Valid Time";
            }

            if (CompareInTime > CompareOutTime) {
                validMessage = "In Time should be less than Out Time";
            }
            if (rowLength > 0) {
                if (OutTimeValue > NextInTimeValue) {
                    validMessage = "Out Time sholud be less than Next In Time";
                }
            }

            if (validMessage.length == 0) {
                item["txtEmployeeInOutID"] = txtEmpInOutID;
                item["InDate"] = InDateValue;
                item["InTime"] = InTimeValue;
                item["OutDate"] = OutDateValue;
                item["OutTime"] = OutTimeValue;
                item["status"] = rowStatus;


                punchDetailsObj.push(item);
            }

        })

        jsonString = JSON.stringify({ 'ObjPunchDetails': punchDetailsObj, 'EmpId': EmpId, 'DeletedRecordIds': ObjDeletedRecord });
        if (validMessage.length == 0) {
            if (punchDetailsObj.length > 0) {
                $("#lblMessage_Popup").hide();
                $.ajax({
                    type: "POST",
                    url: "InOutAdjustment.aspx/InsertPunchDetails",
                    data: jsonString,
                    contentType: 'application/json; charset=utf-8',
                    datatype: 'json',
                    async: false,
                    success: function (data) {

                        var result = jQuery.parseJSON(data.d);
                        if (result == true)
                            ShowMessage(true, "Record Updated Succcessfully.")
                        else
                            ShowMessage(false, "Record is not Updated.")

                        $("#popup_divShowAllpunch").dialog("close");
                        BindAttendanceViewModel();
                        ObjDeletedRecord = [];
                    },
                    error: function (data) {
                    }
                });
            }
            else {
                $("#lblMessage_Popup").show();
                $("#lblMessage_Popup").text("Please insert atleast one record");
                $("#lblMessage_Popup").addClass('alert alert-warning');
            }
        }
        else {
            alert(validMessage);
        }
    });
})
$(document).on('click', '.imgDelete', function () {
    var disabled = $(this).attr('disabled');

    var EmpInOutId = $(this).closest("td").parent().find('td:eq(0)').find("#spanEmpInOutId").val();

    if (EmpInOutId != "") {
        ObjDeletedRecord.push(EmpInOutId);
    }

    //var rowCount = $('#tblAllpuchDetail tr').length - 1;
    var rowCount = 1;
    $(this).closest("tr").remove();
    $("#tblAllpuchDetail tbody  > tr").each(function () {
        $(this).find('td:eq(1)').find(".InTimeRowNo").text(rowCount);
        $(this).find('td:eq(3)').find(".OutTimeRowNo").text(rowCount);
        rowCount++;
    })

});
$(document).on('click', "#btnClose", function () {
    ObjDeletedRecord = [];
    $("#tbodyPunchDetails  > tr").each(function () {
        var rowStatus = $(this).find("input[id*='rowStatus']").val().trim();
        if (rowStatus == EnumRecordStatus.NewRecord) {
            $(this).remove('tr');
        }
    });
    $("#popup_divShowAllpunch").dialog("close");
});



function ShowMessage(Issucess, Message) {
    $("#lblMessage").show();
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
    $(window).scrollTop(200);

}
