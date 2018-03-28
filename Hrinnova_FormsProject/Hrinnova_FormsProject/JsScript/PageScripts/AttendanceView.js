
$(document).ready(function () {
    var ArsViewModel = {
        ARS: ko.observableArray([]),

    }
    var ARSSummaryModel = {
        Summary: ko.observableArray([]),
    }
    BindEmpRecords();
    BindMonthsddl();

    var EmpDataModel = {
        //var self = this;
        rows: ko.observableArray([]),
    }
    var allPuchModel = {
        punchDetail: ko.observableArray([]),
    }

    ko.applyBindings(allPuchModel, document.getElementById("tblAllpuchDetail"));

    ko.applyBindings(ArsViewModel, document.getElementById("divAttendaceDetails"));

    ko.applyBindings(ARSSummaryModel, document.getElementById("tblSummary"));

    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            $("#tblAttendanceDetail tr").removeClass('date-click-color');
        }
    })

    // BIND LOGIN EMPLOYEE'S ATTENDANCE DETAILS
    function BindEmpRecords() {
        //var model = new EmpDataModel();       

        $.ajax({
            type: "POST",
            url: "AttendanceView.aspx/GetEmployeeData",
            data: "{}",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (data) {
                //


                var Result = jQuery.parseJSON(data.d);

                for (var row in Result) {
                    EmpDataModel.rows.push(Result[row]);

                }
                ko.applyBindings(EmpDataModel, document.getElementById("tblEmpData"));
                ko.applyBindings(EmpDataModel, document.getElementById("tblEmpDetail"));

            },
            error: function (data) {
                alert("error" + data);
            }
        });

    };
    //BIND MOTHS IN DROPDOWNLIST
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
            //self.Id = ko.observable();


            selectedMonth: ko.observable();

            //ON SELECTED INDEX CHANGED EVENT OF MONTH
            //self.monthChanged = function (obj, event) {

            //    if (event.originalEvent) {
            //        //BIND IN/OUT PUNCH DETAILS AND ARS SUMMARY DETAILS
            //        myviewModel();
            //    }
            //    else {
            //    }
            //}


            // ...
        }
        var vm = new ViewModel();
        ko.applyBindings(vm,
         document.getElementById("divMonth"));

        var currDate = new Date();
        var currMonth = currDate.getMonth() + 1;
        $("#ddlMonth").val(currMonth);
        BindYearsDropdown();
        myviewModel();        
        $("#ddlMonth").addClass("chosen-select");
        $(".chosen-select").chosen({
        });
    }
    function BindYearsDropdown() {
        var LastYear = new Date().getFullYear() - 10;
        for (i = new Date().getFullYear() ; i >= LastYear; i--) {
            $('#ddlYear').append($('<option />').val(i).html(i));
        }
        $("#ddlYear").val(new Date().getFullYear());

        $("#ddlYear").addClass("chosen-select");
        $(".chosen-select").chosen({
        });
    }

    
    // BIND IN/OUT PUNCH DETAILS OF EMPLOYEE
    function myviewModel() {
        var self = this;       
        self.clickPunch = function (data, event) {
            var thisElement = event.target;
            if ($(thisElement).hasClass("imgApplyTimesheet"))
            {

                $.ajax({
                    type: "POST",
                    url: 'Timeoffrequest.aspx/GetEncryptedURL',
                    data: "{'WFH':false,'Date':'" + moment($(this).attr('Date'), 'DD/MM/YYYY').format('DD MMM YYYY') + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        window.open(data.d, '_blank');
                    }
                });               
            }
            else if($(thisElement).hasClass("imgApplyRequest")){
                var CurrentDate = $(this).attr('Date');
                
                var IsValidSession = false;
                $("#hdnRequestType").val("false");
                $.ajax({
                    type: 'POST',
                    url: 'TimeoffRequest.aspx/ISValidSession',
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

                $("#ddlApprovalType").prop("disabled", false);
                $("#drpManager").prop("disabled", false);
                $("#ulvErrorsPopup").empty();
                $("#lblMessage").html('').removeClass('alert alert-success');
                $("#hdnID").val('');
                $.ajax({
                    type: "POST",
                    url: 'Timeoffrequest.aspx/GetRequestTypes',
                    data: "{}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        var result = jQuery.parseJSON(data.d);
                        var select = $("#ddlApprovalType");
                        select.children().remove();
                        var count = Object.keys(result.dtTypes).length;
                        //result.dtTypes.sort(compare);

                        for (var i = 0; i < count; i++) {
                            select.append($('<option></option>').val(result.dtTypes[i].ApprovalTypeId).html(result.dtTypes[i].ApprovalType));
                        }
                        $("#ddlApprovalType").val(EnumType.MissPunch);
                        //$("#ddlApprovalType").val($("#ddlApprovalType option:first").val());

                        sortSelect($('#ddlApprovalType option'));

                        var countOfManagers = Object.keys(result.dtManager).length;
                        $("#drpManager").empty();
                        var strOptions = "<option value='0'>-Select Manager-</option>";
                        for (var i = 0; i < countOfManagers; i++) {

                            if (result.dtManager[i].IsSelf == false)
                                strOptions = strOptions + "<option value='" + result.dtManager[i].empID + "'>" + result.dtManager[i].Name + "</option>";
                        }
                        $("#drpManager").append(strOptions);
                        $.each(result.dtManager, function (i, item) {

                            if (item.IsManager == true)

                                $("#drpManager").val(item.empID);
                        });

                    }
                }).then(function () {
                    MakeRequest();
                    $("#hdnRequestType").val("true");
                    $.ajax({
                        type: "POST",
                        url: 'Timeoffrequest.aspx/GetMissPunchDates',
                        data: {},
                        contentType: 'application/json; charset=utf-8',
                        datatype: 'json',
                        async: false,
                        success: function (dataForMissPunchDates) {
                            var resultForMissPunchDates = jQuery.parseJSON(dataForMissPunchDates.d);
                            var select = $("#drpSuggestedDates");
                            select.children().remove();
                            select.append($('<option></option>').val(0).html("-Select Date-"));
                            var count = Object.keys(resultForMissPunchDates).length;
                            for (var i = 0; i < count; i++) {
                                var SuggestedDate = resultForMissPunchDates[i].Date.split('T');
                                select.append($('<option></option>').val(SuggestedDate[0]).html(SuggestedDate[0]));
                            }                            
                            $("#drpSuggestedDates").val(moment(CurrentDate, 'DD/MM/YYYY').format('YYYY-MM-DD'));
                            select.append($('<option></option>').val(1).html("Other"));
                            $("#drpSuggestedDates").trigger('change');

                        }
                    });
                });

            }
            else {
                var thisTr = $(thisElement).closest('tr');             
                $(thisTr).addClass('info');
                var date = this.Date;
                $("#lblAttendanceDate").text(date);
                $.ajax({
                    type: "POST",
                    url: "AttendanceView.aspx/GetPuchDetails",
                    data: '{"date":"' + date + '"}',
                    contentType: 'application/json; charset=utf-8',
                    datatype: 'json',
                    async: false,
                    success: function (data) {
                        var Result = jQuery.parseJSON(data.d);
                        allPuchModel.punchDetail([]);
                        for (var i = 0; i < Result.length; i++) {
                            allPuchModel.punchDetail.push(Result[i]);
                        };
                        //for (var row in Result) {
                        //    allPuchModel.punchDetail.push(Result[row]);

                        //}
                        //ko.applyBindings(allPuchModel, document.getElementById("tblAllpuchDetail"));

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
                        $("#tblAttendanceDetail tr").removeClass('info');
                    },
                    open: function (event, ui) {
                        $('.attedance-request-scroll').mCustomScrollbar();
                    }
                });
            }
            
        }


        // BIND SUMMARY OF ARS DETAILS

        var MonthId = $("#ddlMonth").val();
        var YearId = $('#ddlYear').val();

        if (MonthId == "")
            MonthId = 0;
        $.ajax({
            type: "POST",
            url: 'AttendanceView.aspx/GetEmpRequestDetails',
            data: '{"ddlMonthId":"' + MonthId + '","YearId":"' + YearId + '"}',
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (result) {


                var jsonResult = result.d;                
                if (jsonResult[2] == "1") {
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

                    ARSSummaryModel.Summary([]);
                    for (var i = 0; i < TotalWorkingHour.length; i++) {
                        ARSSummaryModel.Summary.push(TotalWorkingHour[i]);
                    };
                }
                else {
                    
                    window.location.href = ("~/login");
                    return false;
                }
            }
        });

        //self.updateTableEachTimeItChanges = mergeRow();
        //
        //$.ajax({
        //    type: "POST",
        //    url: 'AttendanceView.aspx/GetWorkingHour',
        //    data: '{"ddlMonthId":"' + MonthId + '"}',
        //    contentType: 'application/json; charset=utf-8',
        //    datatype: 'json',
        //    success: function (result) {
        //        var jsonResult = (result.d);
        //        alert(jsonResult);

        //            ARSSummaryModel.Summary.push(jsonResult);

        //        ko.applyBindings(ARSSummaryModel, document.getElementById("tblSummary"));
        //    }
        //});

    }

    //var punchDetailModel = {
    //    //numberOfClicks: ko.observable(0),
    //    clickPunch: function () {
    //        alert("hi");
    //        var date = $(this).text();
    //        alert(date);
    //    }
    //};

    var seen = {};
    $('#tblAttendanceDetail td').each(function () {
        var $this = $(this);
        var index = $this.index();
        var txt = $this.text();
        if (seen[index] === txt) {
            $($this.parent().prev().children()[index]).attr('rowspan', 2);
            $this.hide();
        }
        else {
            seen[index] = txt;
        }
    })

    $(document).on('click', '#btnSearch', function () {
        myviewModel();
    });
    $(document).on('click', '#btnReset', function () {
        //$('#ddlYear option').eq(0).prop('selected', true);
        //$('#ddlMonth option').eq(0).prop('selected', true);
        var currDate = new Date();
        var currMonth = currDate.getMonth() + 1;
        $("#ddlMonth").val(currMonth).trigger("chosen:updated");
        $("#ddlYear").val(new Date().getFullYear()).trigger("chosen:updated");
        myviewModel();
    });

});
$(document).on('click', "#btnClose", function () {
    $("#popup_divShowAllpunch").dialog("close");
    $("#tblAttendanceDetail tr").removeClass('date-click-color');
});
