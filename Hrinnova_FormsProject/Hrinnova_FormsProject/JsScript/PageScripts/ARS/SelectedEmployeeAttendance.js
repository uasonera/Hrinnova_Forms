$(document).ready(function () {

    var ArsViewModel = {
        ARS: ko.observableArray([]),
    }

    var ARSSummaryModel = {
        Summary: ko.observableArray([]),
    }
    var EmpDataModel = {

        rows: ko.observableArray([]),
    }
    var allPuchModel = {
        punchDetail: ko.observableArray([]),
    }
    GetEmpData();
    GetEmpArsData();

    ko.applyBindings(allPuchModel, document.getElementById("tblAllpuchDetail"));
    ko.applyBindings(ArsViewModel, document.getElementById("tblAttendanceDetail"));
    ko.applyBindings(ARSSummaryModel, document.getElementById("tblSummary"));

    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            $("#tblAttendanceDetail tr").removeClass('date-click-color');
        }
    })
    function GetEmpData() {
        var EmpId = getParameterByName("EmpId");
        $.ajax({
            type: "POST",
            url: "SelectedEmployeeAttendance.aspx/GetEmpData",
            data: '{"EmpId":"' + EmpId + '"}',
            contentType: 'application/json; charset=utf-8',
            success: function (result) {

                var data = jQuery.parseJSON(result.d);
                $("#divEmpName").text(data[0].Employee);
                $("#divDept").text(data[0].DeptName);
                if (data[0].LocationTitle != null)
                    $("#divLocation").text(data[0].LocationTitle);
                $("#ReportingManager").text(data[0].ReportingManager);

                for (var row in data) {
                    EmpDataModel.rows.push(data[row]);
                }
                ko.applyBindings(EmpDataModel, document.getElementById("tblEmpDetail"));
            },
            error: function (result) {
            }
        });
    }

    function GetEmpArsData() {
        var EmpId = getParameterByName("EmpId");
        var Month = getParameterByName("Month");
        var Year = getParameterByName("Year");
        var self = this;
        self.clickPunch = function (data, event) {
            var IsValidSession = false;
            $.ajax({
                type: 'POST',
                url: 'SelectedEmployeeAttendance.aspx/ISValidSession',
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

            if (!IsValidSession) {
                window.location.href = ("/login");
                return false;
            }
            var thisElement = event.target;
            //var thisTr = $(thisElement).parent().parent();
            var thisTr = $(thisElement).closest('tr');
            $(thisTr).addClass('date-click-color');
            var date = this.Date;
            $("#lblAttendanceDate").text(date);
            $.ajax({
                type: "POST",
                url: "SelectedEmployeeAttendance.aspx/GetPuchDetails",
                data: '{"date":"' + date + '","EmpId":"' + EmpId + '"}',
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                async: false,
                success: function (data) {
                    var Result = jQuery.parseJSON(data.d);
                    allPuchModel.punchDetail([]);
                    for (var i = 0; i < Result.length; i++) {
                        allPuchModel.punchDetail.push(Result[i]);
                    };


                },
                error: function (data) {
                    alert("error" + data);
                }
            });

            $("#popup_divShowAllpunch").dialog({
                width: 780,
                draggable: false,
                resizable: false,
                title: "Show All Punch",
                modal: true,
                close: function (e) {
                    e.preventDefault();
                    $("#tblAttendanceDetail tr").removeClass('date-click-color');
                }
            });
        }


        $.ajax({
            type: "POST",
            url: 'SelectedEmployeeAttendance.aspx/GetEmpArsData',
            data: '{"EmpId":"' + EmpId + '","Month":"' + Month + '","Year":"' + Year + '"}',
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (result) {

                var jsonResult = result.d;

                var attendanceresult = jQuery.parseJSON(jsonResult[0]);

                var TotalWorkingHour = jQuery.parseJSON(jsonResult[1]);
                ArsViewModel.ARS([]);

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
                    ArsViewModel.ARS.push(filteredArray[i]);
                }

                //for (var i = 0; i < attendanceresult.length; i++) {
                //    ArsViewModel.ARS.push(attendanceresult[i]);
                //};
                ARSSummaryModel.Summary([]);
                for (var i = 0; i < TotalWorkingHour.length; i++) {
                    ARSSummaryModel.Summary.push(TotalWorkingHour[i]);
                };


            }
        });
    }
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    $(document).on('click', "#btnClose", function () {
        $("#popup_divShowAllpunch").dialog("close");
        $("#tblAttendanceDetail tr").removeClass('date-click-color');
    });
})