EnumType = { Leave: '1', PunchCard: '4', ShiftChange: '5', OIM: '6', MissPunch: '12', CompOff: '11', OutDoorDuty: '13', WorkOnHoliday: '3', WorkFromHome: '2', Tour: '10', LOP: 'LOP', EPL: '96' };

var DateFormat = "MM/DD/YYYY";
var DateFormatWithTime = "HH:mm";
var DataFreezingDate = "";
var LstLeaves = new Array();
var timesheetReminderMessage = '';
$(document).ready(function () {

    var StartOfTheMonth = moment([moment().add(1, 'months').year(), moment().add(1, 'months').month()]).add(-1, "month");
    var EndOfTheMonth = moment().add('months', 1).date(0);

    SetDataFreezingDate();
    StartOfTheMonth = moment(DataFreezingDate.d).add(1, 'days');
    if ((moment(StartOfTheMonth).isAfter(EndOfTheMonth))) {
        StartOfTheMonth = moment(DataFreezingDate.d);
    }
    InitialiazeDatePicker($(".DatetimeField"), DateFormat, new Date());
    CheckFixedOrFlexible();
    //InitialiazeDatePicker($("#txtFromDate"), DateFormat, StartOfTheMonth);
    //InitialiazeDatePicker($("#txtToDate"), DateFormat, EndOfTheMonth);

    InitialiazeTimePicker($("#txtStartTime"), DateFormatWithTime);
    InitialiazeTimePicker($("#txtEndTime"), DateFormatWithTime);



    $('.CalculatedDate').datetimepicker({
        format: DateFormat,
        widgetPositioning: {
            horizontal: 'auto',
            vertical: 'bottom'
        }
    });
    SetDatePickersAccordingToRequest();
    function setStartEndDate() {
        InitialiazeDatePicker($("#txtFromDate"), DateFormat, StartOfTheMonth);
        InitialiazeDatePicker($("#txtToDate"), DateFormat, EndOfTheMonth);
        // $("#txtFromDate").val(StartOfTheMonth.format('L'));
        $("#txtToDate").val(EndOfTheMonth.format('L'));
    }
    function CheckFixedOrFlexible() {
        $.ajax({
            type: "POST",
            url: 'Timeoffrequest.aspx/CheckIsFlexible',
            data: "{}",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (result) {

                var Result = result.d;
                $("#hdnIsFlexible").val(Result == "true");
            }

        })
    }
    function SetDataFreezingDate() {
        $.ajax({
            type: "POST",
            url: 'Timeoffrequest.aspx/SetDataFreezingDate',
            data: "{}",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            async: false,
            success: function (result) {

                DataFreezingDate = result;
            }

        })
    }
    sortSelect($('#drpStatus option'));

    var Configuration;
    var Required = true;
    var Validate = true;
    var overlayOpacityNormal = 0.3, overlayOpacitySpecial = 0.3;

    var ApprovalType;
    PopupInstance();
    setStartEndDate();
    GetRequests();


    /*ViewModels*/
    var viewModel =
    {
        RequestDetails: ko.observableArray([])
    }
    /*ViewModels*/
    ko.applyBindings(viewModel);

    function InitialiazeDatePicker(Element, ExpectedFormat, ExpectedDate) {
        $(Element).datetimepicker({
            format: ExpectedFormat, icons: {

                date: "fa fa-calendar"

            }, defaultDate: ExpectedDate
        });
    }
    function InitialiazeTimePicker(Element, ExpectedFormat) {
        $(Element).datetimepicker({
            format: ExpectedFormat, icons: {

                date: "fa fa-calendar"

            }
        });
    }

    function TimeoffViewModel(result) {
        viewModel.RequestDetails([]);
        $.each(result, function (index) {
            viewModel.RequestDetails.push(result[index]);
        });
        paging();
    }
    $(".Opencalendar").click(function () {
        $(this).prev().focus();
    });
    $("#btnReset").click(function () {
        GetRequests();
        $("#ulVs").empty();
        $("#vs1").hide();
        $("#lblMessage").html('').removeClass('alert alert-success');

        setStartEndDate();

    });


    /*On page load*/
    function GetRequests() {
        //$('#Req_MainDiv').find('select').val(""); this code has commited because all dropdown selected value became null
        $('#Req_MainDiv').find('select').val("0").trigger("chosen:updated");
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);

        var StartDate = moment(firstDay).format('MM/DD/YYYY');
        var EndDate = moment(lastDay).format('MM/DD/YYYY');

        InitialiazeDatePicker($("#txtFromDate"), DateFormat, StartOfTheMonth);
        InitialiazeDatePicker($("#txtToDate"), DateFormat, EndOfTheMonth);
        $("#txtFromDate").val(StartOfTheMonth.format('L'));
        $("#txtToDate").val(EndOfTheMonth.format('L'));
        $.when(
    $.ajax({
        type: "POST",
        url: 'Timeoffrequest.aspx/GetRequests',
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {

            var jsonResult = jQuery.parseJSON(result.d);
            TimeoffViewModel(jsonResult);
        }

    })).then(function () {
        SetMenu();
    });
    }
    $.ajax({
        type: "POST",
        url: 'Timeoffrequest.aspx/GetRequestTypes',
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            var result = jQuery.parseJSON(data.d);
            var select = $("#drpRequestType");
            select.children().remove();
            select.append($("<option>").val(0).text("All"));
            var count = Object.keys(result.dtTypes).length;
            for (var i = 0; i < count; i++) {
                select.append(
                 $('<option></option>').val(result.dtTypes[i].ApprovalTypeId).html(result.dtTypes[i].ApprovalType)
                );
            }
            sortSelect($('#drpRequestType option'));
            $("#drpRequestType").addClass("chosen-select");
            if ($("select").hasClass("chosen-select")) {
                $(".chosen-select").chosen({

                });
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText)
        }
    });
    /*On page load*/

    /*Events*/

    $("#drpStatus").on("change", function () {
        $("#lblMessage").html('').removeClass('alert alert-success');
    });
    $("#drpRequestType").on("change", function () {
        $("#lblMessage").html('').removeClass('alert alert-success');
    });
    $("#btnSearch").on("click", function () {
        var FromDate = $("#txtFromDate").val();
        var ToDate = $("#txtToDate").val();
        if (FromDate != "" && ToDate != "") {
            $("#ulVs").empty();
            $("#vs1").hide();
            $("#lblMessage").html('').removeClass('alert alert-success');
            var IsValidFromDate = moment(FromDate, "MM/DD/YYYY").isValid();
            if (IsValidFromDate == false) {
                Validate = false;
                $("#vs1").show();
                $("#ulVs").append("<li>Please select valid From Date</li>");
                return false;
            }
            var IsValidToDate = moment(ToDate, "MM/DD/YYYY").isValid();
            if (IsValidToDate == false) {
                Validate = false;
                $("#vs1").show();
                $("#ulVs").append("<li>Please select valid To Date</li>");
                return false;
            }
            if (!(moment(ToDate).isAfter(FromDate)) && !(moment(ToDate).isSame(FromDate))) {
                $("#vs1").show();
                $("#ulVs").append("<li>To Date should be greater than From Date</li>");
                return false;
            }
            SearchData();
        }
        else {
            $("#ulVs").empty();
            $("#vs1").hide();
            $("#ulVs").append('<li>Please Enter From Date and To Date</li>')
        }
    });
    $(document).on("click", ".test", function () {
        var WFH = $(this).find('a').attr('wfh') == '1' ? true : false;
        var Date = $(this).find('a').attr('date')

        $.ajax({
            type: "POST",
            url: 'Timeoffrequest.aspx/GetEncryptedURL',
            data: "{'WFH':'" + WFH + "','Date':'" + Date + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                window.open(data.d, '_blank');
            }

        });
    });

    /*Events*/
    function getUrlVars() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }
    $("#lnkDummy").click(function () {
        openApplyRequestpopup();
    }
    );
    function openApplyRequestpopup() {
        //$('#btnSave').attr("disabled", true);
        //setTimeout(function () {
        //    $("#btnSave").removeAttr("disabled");
        //}, 3000); //Added for preventing multiple clicks
        $(".tblLeaveClub").empty();

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
        $("#Div1").hide();
        $("#lblMessage").html('').removeClass('alert alert-success');
        $("#hdnID").val('');
        $.ajax({
            type: "POST",
            url: 'Timeoffrequest.aspx/GetRequestTypesForPopup',
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
                    select.append($('<option data-leavecategoryid=' + result.dtTypes[i].LeaveCategoryID + '></option>').val(result.dtTypes[i].ApprovalTypeId).html(result.dtTypes[i].ApprovalType));
                }
                //$("#ddlApprovalType").val(EnumType.Leave);
                $("#ddlApprovalType").val($("#ddlApprovalType option:first").val());

                sortSelect($('#ddlApprovalType option'));
                $("#ddlApprovalType").addClass("chosen-select");

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
                $("#drpManager").addClass("chosen-select");
                if ($("select").hasClass("chosen-select")) {
                    $(".chosen-select").chosen({

                    });
                }
                $("#ddlApprovalType").trigger("chosen:updated");
                $("#drpManager").trigger("chosen:updated");
            }
        }).then(function () {
            MakeRequest();
        });

    }

    var IsFromQuickLink = getUrlVars();
    if (IsFromQuickLink.isFromQuik == "True") {
        openApplyRequestpopup();
    }
    $("#btnSave").click(function (e) {
        $('#btnSave').attr("disabled", true);
        setTimeout(function () {
            $("#btnSave").removeAttr("disabled");
        }, 3000); //Added for preventing multiple clicks
        var IsValidSession = false;
        var LeaveCategoryId = $("#ddlApprovalType  option:selected").data('leavecategoryid');
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
        if ($("#ddlApprovalType  option:selected").val() == EnumType.Leave || LeaveCategoryId != null) {
            var IsHalfDay = $("#rbtLeave_1").is(':checked');
            var FromDate = $("#FrmDateMain").val();
            var ToDate = $("#ToDateMain").val();
            var Details = $("#txtReason").val();
            var Address = $("#txtAddress").val();
            var Contact = $("#txtContact").val();

            LstLeaves.length = 0;
            var Days;
            var IsValid = true;
            $("#ulvErrorsPopup").empty();
            $("#Div1").hide();
            if (FromDate == '' || ToDate == '') {
                $("#Div1").show();
                $("#ulvErrorsPopup").append("<li>Please enter From/To dates</li>");
                IsValid = false;
            }
            $(".tblLeaveClub > tbody  > tr").each(function () {
                if ($(this).data('code') != EnumType.LOP && IsValid) {
                    $(this).css('background-color', 'white');
                    $("#hdnLeaveCategoryID").val($(this).data("leavecategoryid"));
                    Days = parseFloat($(this).find('.ClsLeaveCount').html());
                    FromDate = $(this).find('.tdFromDate').html().trim();
                    ToDate = $(this).find('.tdToDate').html().trim();
                    if (!ValidateCustomLeave(FromDate, ToDate, Details, IsHalfDay, Days)) {
                        $(this).css('background-color', '#F2DEDE');
                        $("#hdnLeaveCategoryID").val('');
                        IsValid = false;
                        return false;
                    }
                }
            });


            if ($(".tblLeaveClub > tbody  > tr").length == 0) {
                $("#Div1").show();
                $("#ulvErrorsPopup").append("<li>No Leave details found. Try changing dates.</li>");
                IsValid = false;
            }
            $("#hdnLeaveCategoryID").val('');
            if (IsValid) {
                SubmitLeave();
            }
        }
        else if ($("#hdnLeaveCategoryID").val() != "") {
            var IsHalfDay = $("#rblLeaveCategory").find(":checked").val() == '2';
            var FromDate = $("#FrmDateLeave").val();
            var ToDate = $("#ToDateLeave").val();
            var Details = $("#txtDetailsLeave").val();
            var Moment_FromDate = moment(FromDate, 'MM/DD/YYYY');
            var Moment_ToDate = moment(ToDate, 'MM/DD/YYYY');
            var Days;

            if (IsHalfDay) {
                Days = 0.5;
            }
            else if (FromDate == ToDate) {
                Days = 1;
            }
            else
                Days = ToDate != '' && FromDate != '' ? Moment_ToDate.diff(Moment_FromDate, 'days') + 1 : 0;

            if (ValidateCustomLeave(FromDate, ToDate, Details, IsHalfDay, Days)) {
                //$('#btnSave').attr("disabled", true);
                //setTimeout(function () {
                //    $("#btnSave").removeAttr("disabled");
                //}, 3000); //Added for preventing multiple clicks
                var IsSandwich = false;
                $.ajax({
                    type: "POST",
                    url: 'Timeoffrequest.aspx/CheckSandwich',
                    data: "{'FromDate':'" + FromDate + "','ToDate':'" + ToDate + "'}",
                    contentType: 'application/json; charset=utf-8',
                    datatype: 'json',
                    async: false,
                    success: function (result) {
                        IsSandwich = result.d;
                    }
                });
                if (IsSandwich) {
                    $.confirm({
                        confirmButtonClass: 'btn-info', cancelButtonClass: 'btn-danger', content: 'Current date selection will result in sandwich Leave.Do you want to proceed?', title: 'Sandwich Leave', confirmButton: 'Yes', cancelButton: 'No', animation: 'zoom', animationBounce: 2.5, onAction: function (action) {
                            if (action == 'confirm') {
                                StoreCustomLeave(FromDate, ToDate, Details, $("#rblLeaveCategory").find(":checked").val());
                            }
                        }
                    });
                }
                else {
                    StoreCustomLeave(FromDate, ToDate, Details, $("#rblLeaveCategory").find(":checked").val());
                }
            }
            else {
                scroolTop();
            }
        }
            /*Leave category*/
        else if ($("#hdnRequestType").val() == "true") {
            //Request is for mispunch
            var ValidRequest = true;
            $("#ulvErrorsPopup").empty();
            $("#Div1").hide();
            if ($("#MPDetails").val() == '' && $("#MPDetails").is(":visible")) {
                $("#Div1").show();
                $("#ulvErrorsPopup").append("<li>Reason is Required.</li>");
                ValidRequest = false;
                return false;
            }
            if ($("#GvMisspunch tbody").children('tr').children('td').length <= 1) {
                $("#Div1").show();
                $("#ulvErrorsPopup").append("<li>There are no records to store. Please select another date.</li>");
                //e.preventPropagation();
                ValidRequest = false;
                return false;
            }

            if (moment(DataFreezingDate.d).add(1, 'days').isAfter($("#MainContent_UcMissPunchDate_txtToEventDate").val())) {
                $("#Div1").show();
                var Message = $("#ddlApprovalType option:selected").val() == EnumType.MissPunch ? "Missed punch " : "Punchcard request ";
                $("#ulvErrorsPopup").append("<li>" + Message + "can not be apply before freezing data</li>");
                ValidRequest = false;
                return false;
            }
            if (Date.parse($("#MainContent_UcMissPunchDate_txtToEventDate").val()) > new Date()) {
                $("#Div1").show();
                var Message = $("#ddlApprovalType option:selected").val() == EnumType.MissPunch ? "Missed punch " : "Punchcard request ";
                $("#ulvErrorsPopup").append("<li>" + Message + "can not be apply in future date </li>");
                ValidRequest = false;
                return false;
            }
            if (moment($("#drpSuggestedDates").val()).format("YYYY-MM-DD") == moment().format("YYYY-MM-DD")) {
                $("#Div1").show();
                var Message = $("#ddlApprovalType option:selected").val() == EnumType.MissPunch ? "Missed punch " : "Punchcard request ";
                $("#ulvErrorsPopup").append("<li>" + Message + "for the same day is not allowed</li>");
                ValidRequest = false;
                return false;
            }
            if ($("#MainContent_UcMissPunchDate_txtToEventDate").val() == moment().format("MM/DD/YYYY")) {
                $("#Div1").show();
                var Message = $("#ddlApprovalType option:selected").val() == EnumType.MissPunch ? "Missed punch " : "Punchcard request ";
                $("#ulvErrorsPopup").append("<li>" + Message + "for the same day is not allowed</li>");
                ValidRequest = false;
                return false;
            }
            if ($("#drpManager").val() == '0') {
                $("#Div1").show();
                $("#ulvErrorsPopup").append("<li>Please select Manager</li>");
                ValidRequest = false;
                return false;
            }

            $('input[type="text"].Time').each(function (e) {
                if ($(this).val() == "" || $(this).val().indexOf(':') == -1 || moment($(this).val(), "MM/DD/YYYY HH:mm").isValid() == false) {
                    $("#Div1").show();
                    $("#ulvErrorsPopup").append("<li>Please enter proper In-Out details.</li>");
                    ValidRequest = false;
                    return false;
                }
                else
                    /*Pass dates then selected date is not allowed - Sprint Y*/ {

                    var currentDate = moment($(this).val(), "MM/DD/YYYY HH:mm");
                    var RequestDate;
                    if ($("#ddlApprovalType  option:selected").val() != EnumType.PunchCard && $("#drpSuggestedDates").val() != "0" && $("#drpSuggestedDates").val() != "1") {
                        if (currentDate.isAfter(moment($("#drpSuggestedDates").val(), "YYYY-MM-DD").endOf('day').add(1, 'days')) || currentDate.isBefore(moment($("#drpSuggestedDates").val(), "YYYY-MM-DD").startOf('day').add(-1, 'days'))) {
                            $("#Div1").show();
                            $("#ulvErrorsPopup").append("<li>In Out timings should be between " + moment($("#drpSuggestedDates").val(), "YYYY-MM-DD").startOf('day').add(-1, 'days').format("DD-MM-YYYY HH:mm") + " and " + moment($("#drpSuggestedDates").val(), "YYYY-MM-DD").endOf('day').add(1, 'days').format("DD-MM-YYYY HH:mm") + "</li>");
                            ValidRequest = false;
                            return false;
                        }
                    }
                    else {
                        if (currentDate.isAfter(moment($("#MainContent_UcMissPunchDate_txtToEventDate").val(), "MM/DD/YYYY").endOf('day').add(1, 'days')) || currentDate.isBefore(moment($("#MainContent_UcMissPunchDate_txtToEventDate").val(), "MM/DD/YYYY").startOf('day').add(-1, 'days'))) {
                            $("#Div1").show();
                            $("#ulvErrorsPopup").append("<li>In Out timings should be between " + moment($("#MainContent_UcMissPunchDate_txtToEventDate").val(), "MM/DD/YYYY").startOf('day').add(-1, 'days').format("DD-MM-YYYY HH:mm") + " and " + moment($("#MainContent_UcMissPunchDate_txtToEventDate").val(), "MM/DD/YYYY").endOf('day').add(1, 'days').format("DD-MM-YYYY HH:mm") + "</li>");
                            ValidRequest = false;
                            return false;
                        }
                    }
                }
                /*Pass dates before selected date is not allowed - Sprint Y*/
            });
            if ($("#MainContent_UcMissPunchDate_txtToEventDate").val() != null && $("#MainContent_UcMissPunchDate_txtToEventDate").val() != "") {
                if (!ValidateMaxMisspunch($("#MainContent_UcMissPunchDate_txtToEventDate").val())) {
                    ValidRequest = false;
                    return false;
                }
            }
            if ($("#drpSuggestedDates").val() != null && $("#drpSuggestedDates").val() != "" && $("#drpSuggestedDates").val() != "1") {
                var date = moment($("#drpSuggestedDates").val(), "YYYY-MM-DD").format('MM/DD/YYYY')
                if (!ValidateMaxMisspunch(date)) {
                    ValidRequest = false;
                    return false;
                }
            }

            if (ValidRequest) {
                $('#GvMisspunch tr:gt(0)').each(function (Index) {
                    var CurrentInTime = moment($(this).find('td:nth-child(2)').find('.Time').val(), "MM/DD/YYYY HH:mm");
                    var OutTime = moment($(this).find('td:nth-child(3)').find('.Time').val(), "MM/DD/YYYY HH:mm");
                    var NextInTime = moment($(this).next('tr').find('td:nth-child(2)').find('.Time').val(), "MM/DD/YYYY HH:mm");
                    if (OutTime != null && NextInTime != null && moment(NextInTime, "MM/DD/YYYY HH:mm").isValid() && NextInTime < OutTime) {
                        $("#Div1").show();
                        $("#ulvErrorsPopup").append("<li>In Time can not be less than last Out Time.</li>");
                        ValidRequest = false;
                        return false;
                    }
                    if (CurrentInTime > OutTime) {
                        $("#Div1").show();
                        $("#ulvErrorsPopup").append("<li>In Time can not be greater than Out Time.</li>");
                        ValidRequest = false;
                        return false;
                    }
                });
            }
            var TimeoffRequestModel = {};
            if ($("#MainContent_UcMissPunchDate_txtToEventDate").val() != "") {

                TimeoffRequestModel.FromDate = $("#MainContent_UcMissPunchDate_txtToEventDate").val();
                TimeoffRequestModel.ToDate = $("#MainContent_UcMissPunchDate_txtToEventDate").val();
            }
            else {
                TimeoffRequestModel.FromDate = $("#drpSuggestedDates option:selected").val();
                TimeoffRequestModel.ToDate = $("#drpSuggestedDates option:selected").val();
            }
            TimeoffRequestModel.Reason = $("#MPDetails").val();
            TimeoffRequestModel.ApprovalTypeId = $("#ddlApprovalType  option:selected").val();
            TimeoffRequestModel.RequestId = GetValue("hdnID");
            TimeoffRequestModel.PmID = $("#drpManager").val();
            var Timings = new Array();
            $('#GvMisspunch tr:gt(0)').each(function (Index) {
                var InOutTimings = {};
                InOutTimings.InTime = $(this).find('td:nth-child(2)').find('.Time').val();
                InOutTimings.OutTime = $(this).find('td:nth-child(3)').find('.Time').val();
                InOutTimings.AttendanceType = $(this).data('attendancetype');
                InOutTimings.EmpInOutID = $(this).find('td:nth-child(1)').html();
                Timings.push(InOutTimings);
            });

            //$('#btnSave').attr("disabled", true);
            //setTimeout(function () {
            //    $("#btnSave").removeAttr("disabled");
            //}, 3000); //Added for preventing multiple clicks 

            var MissPunchData = "{TimeoffRequestModel:" + JSON.stringify(TimeoffRequestModel) + ",InOutTimings:" + JSON.stringify(Timings) + ",IsEdit:" + $("#hdnIsMissPunchEdit").val() + "}";
            if (ValidRequest) {
                $.ajax({
                    type: "POST",
                    url: 'Timeoffrequest.aspx/SubmitMissPunchDetails',
                    data: MissPunchData,
                    contentType: 'application/json; charset=utf-8',
                    datatype: 'json',
                    async: false,
                    success: function (result) {
                        var TimeOffRequestID = result.d[0];
                        ApprovalType = result.d[1];
                        var IsDuplicate = result.d[2];
                        var IsUpdate = $("#hdnIsMissPunchEdit").val();
                        if (IsDuplicate == "true") {
                            $("#Div1").show();
                            $("#ulvErrorsPopup").append("<li>A request has already been applied for the same date</li>");
                        }
                        else {
                            $("#divOtherDate").hide();
                            $("#MainContent_UcMissPunchDate_txtToEventDate").val('');
                            $("#AddDetails").hide();
                            $("#GvMisspunch").find("tr:gt(0)").remove();
                            $("#GvMisspunch").hide();
                            $("#GvMisspunch").parent().parent().hide();
                            $("#txtMissPunchDetails").hide();

                            if (TimeOffRequestID != "" && ApprovalType != "") {
                                GenerateEmail(TimeOffRequestID, ApprovalType, IsUpdate);
                            }
                            clearForm();
                            GetRequests();
                            if (IsUpdate != "false")
                                $("#lblMessage").html('Request has been updated successfully').addClass('alert alert-success');
                            else
                                $("#lblMessage").html('Request has been saved successfully').addClass('alert alert-success');
                            $("#request_modal").modal("hide");

                            //$("#popup-content").dialog('close');
                        }
                    }
                });
            }
        }
        else {
            //Request is other than mispunch    
            $("#ulvErrorsPopup").empty();
            $("#Div1").hide();
            if ($("#drpManager").val() == '0') {
                $("#Div1").show();
                $("#ulvErrorsPopup").append("<li>Please select Manager</li>");

                return false;
            }
            var Type = $("#ddlApprovalType option:selected").val();

            $.ajax({
                type: "POST",
                url: 'Timeoffrequest.aspx/GetValidationConfiguration',
                data: "{ 'Type' : '" + Type + "'}",
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                async: false,
                success: function (result) {
                    Configuration = jQuery.parseJSON(result.d);

                    $("#ulvErrorsPopup").empty();
                    $("#Div1").hide();
                    $.when(
                    RequiredValidation(Configuration["Required"])
                    ).done(function () {
                        ValidateValidation(Configuration["Validate"]);
                    }).then(function () {
                        if (Required && Validate) {
                            if ($("#ddlApprovalType  option:selected").val() == EnumType.WorkFromHome || $('#ChkWFH').is(':checked') == true) {
                                if (ValidateWFHWithTimesheet() == "true") {
                                    SubmitRequest();
                                }
                            }
                            else if ($("#ddlApprovalType  option:selected").val() == EnumType.WorkOnHoliday || $("#ddlApprovalType  option:selected").val() == EnumType.Tour) {
                                if (ValidateRequestWithTimesheet() == "true") {
                                    SubmitRequest();
                                }
                            }
                            else {
                                SubmitRequest();
                            }
                            //$('#btnSave').attr("disabled", true);
                            //setTimeout(function () {
                            //    $("#btnSave").removeAttr("disabled");
                            //}, 3000); //Added for preventing multiple clicks
                        }
                    });
                }
            });

        }

        if ($("#ulvErrorsPopup").length > 0) {
            setTimeout(scroolTop, 200);
        }
        if ($("#ulvErrorsPopup").innerText != "") {
            $('#btnSave').attr("disabled", false); //Added for preventing multiple clicks
        }


    });

    function SubmitLeave() {
        $("#ulvErrorsPopup").empty();
        $("#Div1").hide();
        var IsDuplicate = false;
        var IsHalfDay = $("#rbtLeave_1").is(':checked');
        var HalfDayType = 0;
        if (IsHalfDay)
            HalfDayType = $("#rbtHalf_0").is(':checked') ? "1" : "2";
        $(".tblLeaveClub > tbody  > tr").each(function () {
            var FromDate = $(this).find('.tdFromDate').html().trim();
            var ToDate = $(this).find('.tdToDate').html().trim();
            $.ajax({
                type: "POST",
                url: 'Timeoffrequest.aspx/ValidateDuplicateRequest',
                data: "{'FromDate':'" + FromDate + "','ToDate':'" + ToDate + "','IsFullDay':'" + !IsHalfDay + "','HalfDayType':'" + HalfDayType + "'}",
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                async: false,
                success: function (result) {
                    IsDuplicate = result.d;
                }

            });
            if (IsDuplicate) {
                return false;
            }
        });
        if (!IsDuplicate) {


            var FromDate = $("#FrmDateMain").val();
            var ToDate = $("#ToDateMain").val();
            var Details = $("#txtReason").val();
            var Address = $("#txtAddress").val();
            var Contact = $("#txtContact").val();
            var ApprovalTypeId = $("#ddlApprovalType  option:selected").val();
            $.ajax({
                type: "POST",
                url: 'Timeoffrequest.aspx/SubmitLeave',
                data: JSON.stringify({ ApprovelTypeId: ApprovalTypeId, ApplyToId: $("#drpManager").val(), FromDate: FromDate, ToDate: ToDate, IsFullDay: !IsHalfDay, HalfDayType: HalfDayType, Reason: Details, Address: Address, Contact: Contact }),
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                success: function (result) {
                    var RequestId = result.d;
                    var ApprovalTypeId = EnumType.Leave;
                    GenerateEmail(RequestId, ApprovalTypeId, false);
                    $("#lblMessage").html('Request has been saved successfully').addClass('alert alert-success');
                    $("#request_modal").modal("hide");
                    GetRequests();
                }, error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.responseText)
                }
            })
        }
        else {
            $("#Div1").show();
            $("#ulvErrorsPopup").append("<li>Duplicate requests have been found. Please change the selection</li>");
        }


    }
    function scroolTop() {
        $('.mCustomScrollbar').mCustomScrollbar("update");
        $(".mCustomScrollbar").mCustomScrollbar("scrollTo", "top");
    }

    $("#btnNotConfirm").on("click", function () {
        //$(this).closest("#divconfirm").dialog('close');
        $("#divconfirm").modal("hide");
    });
    $(".close-request").on("click", function () {
        $("#btnClose").click();
    });
    $("#btnClose").on("click", function () {
        $.ajax({
            type: "POST",
            url: 'Timeoffrequest.aspx/ResetUpdateVariables',
            data: {},
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (result) {

            }
        });
        $("#divOtherDate").hide();
        $("#MainContent_UcMissPunchDate_txtToEventDate").val('');
        $("#AddDetails").hide();
        $("#GvMisspunch").find("tr:gt(0)").remove();
        $("#GvMisspunch").hide();
        $("#GvMisspunch").parent().parent().hide();
        $("#txtMissPunchDetails").hide();
        $("#request_modal").modal("hide");
    });

    $("#btnConfirm").on("click", function () {
        var RequestId = $("#hdnID").val();
        $.when(
        $.ajax({
            type: "POST",
            url: 'Timeoffrequest.aspx/DeleteRequest',
            data: "{ 'RequestId' : '" + RequestId + "'}",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (result) {
                var RequestId = result.d[0];
                var ApprovalTypeId = result.d[1];
                var oldTimeoffStatus = result.d[2];
                GenerateEmailForCancelRequest(RequestId, ApprovalTypeId, oldTimeoffStatus);
                $("#divconfirm").modal("hide");
            }
        })).then(function () {
            SearchData();
            $("#lblMessage").html('Request has been cancelled successfully').addClass('alert alert-success');
        });
    });

    function GenerateEmailForCancelRequest(TimeOffRequestID, ApprovalType, oldTimeoffStatus) {
        $.ajax({
            type: "POST",
            url: 'Timeoffrequest.aspx/GetEmailBodyForCancelRequest',
            data: "{'TimeOffRequestID':'" + TimeOffRequestID + "','ApprovalType':'" + ApprovalType + "'}",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (data) {
                ProcessStringForCancelRequest(data.d, TimeOffRequestID, oldTimeoffStatus);
            }
        });

    }

    function ProcessStringForCancelRequest(EmailBody, TimeOffRequestID, oldTimeoffStatus) {
        $('#EmailDiv').html(EmailBody);
        jQuery('#EmailDiv').find('td:empty').parent().remove();
        jQuery('#EmailDiv').find('td:contains("}")').parent().remove();
        jQuery('#EmailDiv').find('table').removeAttr('height width');
        var MailBody;
        MailBody = $('#EmailDiv').html().replace(/\s{2,}/g, ' ');
        $.ajax({
            type: "POST",
            url: 'Timeoffrequest.aspx/SendMailForCancelRequest',
            data: JSON.stringify({ MailBody: MailBody, TimeOffRequestID: TimeOffRequestID, OldTimeoffStatus: oldTimeoffStatus }),

            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (data) {

            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText)
            }
        });
    }


    $(".CalculatedDate").on("dp.change", function (e) {
        if ($("#ddlApprovalType option:selected").val() == EnumType.ShiftChange && $("#rbtChangeShiftType input:checked").val() == "2")
            $("#ToDateMain").val($("#FrmDateMain").val());

        CalculateClubbing($(this));
    });
    function CalculateClubbing(element) {
        var requestApprovalcategory = $("#ddlApprovalType option:selected").data('leavecategoryid');
        if ($("#ddlApprovalType option:selected").val() == EnumType.Leave || requestApprovalcategory != null) {
            $("#ulvErrorsPopup").empty();
            $("#Div1").hide();
            var FromDate = GetValue("FrmDateMain");
            var ToDate = GetValue("ToDateMain");

            if (FromDate == '') {
                $("#Div1").show();
                $("#ulvErrorsPopup").append("<li>Please select From Date</li>");
            }
            else if (!moment(FromDate, "MM/DD/YYYY").isValid()) {
                $("#Div1").show();
                $("#ulvErrorsPopup").append("<li>Please select valid From Date</li>");
            }
            else if (ToDate == '' && $(element).attr('id') != 'FrmDateMain') {
                $("#Div1").show();
                $("#ulvErrorsPopup").append("<li>Please select To Date</li>");
            }

            else if (ToDate != '' && !moment(ToDate, "MM/DD/YYYY").isValid()) {
                $("#Div1").show();
                $("#ulvErrorsPopup").append("<li>Please select valid To Date</li>");
            }
            else if (ToDate != '' && FromDate != '' && !moment(ToDate, "MM/DD/YYYY").startOf('day').isSame(moment(FromDate, "MM/DD/YYYY").startOf('day')) && !moment(moment(ToDate).format('YYYY-MM-DD')).isAfter(moment(moment(FromDate).format('YYYY-MM-DD')))) {
                $("#Div1").show();
                $("#ulvErrorsPopup").append("<li>Select proper dates</li>");
                $(".tblLeaveClub").empty();
            }
            else if (ToDate != '' && FromDate != '') {
                GetLeavesPrioritywise(FromDate, ToDate, requestApprovalcategory);
            }
        }
    }
    function GetLeavesPrioritywise(FromDate, ToDate, requestApprovalcategory) {
        var IsHalfDay = $("#rbtLeave").find(":checked").val() == '2';
        if (IsHalfDay && FromDate != ToDate) {
            $("#Div1").show();
            $("#ulvErrorsPopup").append("<li>For Half day, dates should be the same</li>");
            $(".tblLeaveClub").empty();
        }
        else {
            if (requestApprovalcategory != null) {
                $.ajax({
                    type: "POST",
                    url: 'Timeoffrequest.aspx/GetLeavesPrioritywise_ByLeaveCategoryId',
                    data: "{ 'FromDate' : '" + FromDate + "','ToDate' : '" + ToDate + "','IsHalfDay':'" + IsHalfDay + "','LeaveCategoryId':'" + requestApprovalcategory + "'}",
                    contentType: 'application/json; charset=utf-8',
                    datatype: 'json',
                    async: false,
                    success: function (result) {
                        PlotLeaveClubbing(jQuery.parseJSON(result.d));
                    }
                });
            }
            else {
                $.ajax({
                    type: "POST",
                    url: 'Timeoffrequest.aspx/GetLeavesPrioritywise',
                    data: "{ 'FromDate' : '" + FromDate + "','ToDate' : '" + ToDate + "','IsHalfDay':'" + IsHalfDay + "'}",
                    contentType: 'application/json; charset=utf-8',
                    datatype: 'json',
                    async: false,
                    success: function (result) {
                        PlotLeaveClubbing(jQuery.parseJSON(result.d));
                    }
                });
            }
        }
    }
    function PlotLeaveClubbing(LeaveCollection) {
        $(".tblLeaveClub").empty();
        $(".tblLeaveClub").show();
        $(".tblLeaveClub").append("<thead><tr><th>Leave Type</th><th>Utilization</th><th>Available</th><th colspan='3' class='text-center'>Dates</th></tr></thead>");
        $(".tblLeaveClub").append('<tbody>');
        for (var i = 0; i < Object.keys(LeaveCollection).length; i++) {
            var CurrObject = LeaveCollection[i];

            if (CurrObject["HalfDayType"] == 6) {
                $("#Div1").show();
                $("#ulvErrorsPopup").append("<li>" + CurrObject["DateRange"] + "</li>");
                break;
            }
            else {
                $(".tblLeaveClub").append("<tr id='tr" + CurrObject["ApprovalTypeId"] + "' data-ApprovalTypeId='" + CurrObject["ApprovalTypeId"] + "' data-LeaveCategoryId='" + CurrObject["LeaveCategoryID"] + "' data-Code='" + CurrObject["Code"] + "'>");
                $("#tr" + CurrObject["ApprovalTypeId"]).append("<td class='hidden'><input type='hidden' class='ClsLeaveType' id='hdn'" + CurrObject["ApprovalTypeId"] + " data-ApprovalTypeId='" + CurrObject["ApprovalTypeId"] + "'></td>")
                $("#tr" + CurrObject["ApprovalTypeId"]).append("<td>" + CurrObject["LeaveCategoryName"] + "</td>")
                $("#tr" + CurrObject["ApprovalTypeId"]).append("<td><span class='ClsLeaveCount' id='spn'" + CurrObject["ApprovalTypeId"] + "'>" + CurrObject["Count"] + "</span></td>")
                $("#tr" + CurrObject["ApprovalTypeId"]).append("<td>" + CurrObject["Balance"] + "</td>");
                $("#tr" + CurrObject["ApprovalTypeId"]).append("<td class='tdFromDate'>    " + CurrObject["FromDate"]);
                $("#tr" + CurrObject["ApprovalTypeId"]).append("<td> To </td>");
                $("#tr" + CurrObject["ApprovalTypeId"]).append("<td class='tdToDate'>" + CurrObject["ToDate"] + "</td>");
            }
        }
        $(".tblLeaveClub").append('</tbody>');
    }
    function isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }

    $("#ddlApprovalType").change(function () {
        $(".tblLeaveClub").empty();
        $(".tblLeaveClub").hide();
        $("#GvMisspunch").hide();
        $("#GvMisspunch").parent().parent().hide();
        $("#ChkWFH").prop("checked", false);
        $("#ulvErrorsPopup").empty();
        $("#Div1").hide();
        $(".form-group").removeClass('has-error has-feedback');
        $("#request_modal").find(".modal-title").html($("#ddlApprovalType option:selected").text());
        SetDatePickersAccordingToRequest();
        if ($("#ddlApprovalType option:selected").val() == EnumType.MissPunch) {
            $("#hdnIsMissPunchEdit").val("false");
            $("#divOtherDate").hide();
            $("#AddDetails").hide();
            $("#drpSuggestedDates").show();
            GetMissPunchDates();
            $("#hdnRequestType").val("true");
        }
        else if ($("#ddlApprovalType option:selected").val() == EnumType.PunchCard) {
            $("#hdnIsMissPunchEdit").val("false");
            $("#divOtherDate").show();
            $("#AddDetails").hide();
            $("#drpSuggestedDates").parent().prev().hide();
            $("#drpSuggestedDates").hide();
            $("#hdnRequestType").val("true");
        }
        else {
            $("#AddDetails").hide();
            $("#hdnRequestType").val("false");
            $("#txtMissPunchDetails").hide();
        }
        $("#ToDateMain").prop('disabled', false);
        MakeRequest();
    });
    $("#rbtLeave").on("click", function () {
        ShowHideRadio();

        CalculateClubbing();
    });
    $("#rbtChangeShiftType").on("click", function () {
        HandleShiftDates();
    });
    function HandleShiftDates() {

        SetDatePickersAccordingToRequest();

        $("#rbtChangeShiftType input:checked").val() == "2" ? $("#ToDateMain").prop('disabled', true) : $("#ToDateMain").prop('disabled', false);
        $("#rbtChangeShiftType input:checked").val() == "2" ? $("#ToDateMain").val($("#FrmDateMain").val()) : $("#ToDateMain").val($("#ToDateMain").val());
    }
    $("#rblLeaveCategory").on("click", function () {
        ShowHideRadioCustomLeave();
    });
    $("#btnCancel").on("click", function () {
        $('#selection').fadeOut('fast', function () {
            $("#ulVs").empty();
            $("#vs1").hide();
            $('#filters').fadeIn('fast');
        });
    });
    /*Events*/
    function SearchData() {
        var Type = $("#drpRequestType option:selected").val();
        var Status = $("#drpStatus option:selected").val();
        //var Month = $("#drpMonth option:selected").val();
        var FromDate = $("#txtFromDate").val();
        var ToDate = $("#txtToDate").val();
        var Filters = new Array();
        Filters[0] = Type;
        Filters[1] = Status;
        //Filters[2] = Month;
        Filters[2] = FromDate;
        Filters[3] = ToDate;

        $.ajax({
            type: "POST",
            url: 'Timeoffrequest.aspx/GetRequestsUsingFilters',
            data: JSON.stringify({ Filters: Filters }),
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            async: false,
            success: function (result) {

                var jsonResult = jQuery.parseJSON(result.d);
                TimeoffViewModel(jsonResult);
                SetMenu();
            }
        });
    }
    function RequiredValidation(RequiredObj) {
        Required = true;
        for (var i = 0; i < RequiredObj.length; i++) {

            if (RequiredObj[i].UIID.toLowerCase().indexOf("maincontent_uc") >= 0) {
                var TextBoxID = RequiredObj[i].UIID.replace("divCalenderPopup", "txtToEventDate");
                if ($("#" + TextBoxID).val() == "") {
                    Required = false;
                    $("#Div1").show();
                    $("#ulvErrorsPopup").append("<li>" + RequiredObj[i].RequiredMessage + "</li>");
                }
            }
            else if ($("#" + RequiredObj[i].UIID).is('select') && $("#" + RequiredObj[i].UIID + " option:selected").val() == 0) {
                if ($("#ddlApprovalType option:selected").val() == EnumType.OIM) {
                    if ($("#hdnIsFlexible").val() == 'false') {
                        Required = false;
                        $("#Div1").show();
                        $("#ulvErrorsPopup").append("<li>" + RequiredObj[i].RequiredMessage + "</li>");
                    }
                }
                else if ($("#ddlApprovalType option:selected").val() == EnumType.WorkFromHome) {
                    if ($("#drpMinutes").val() == "0") {
                        Required = false;
                        $("#Div1").show();
                        $("#ulvErrorsPopup").append("<li>" + RequiredObj[i].RequiredMessage + "</li>");
                    }
                }
                else {
                    Required = false;
                    $("#Div1").show();
                    $("#ulvErrorsPopup").append("<li>" + RequiredObj[i].RequiredMessage + "</li>");
                }
            }
            else if (!$('#' + RequiredObj[i].UIID).is(':radio') && $.trim($("#" + RequiredObj[i].UIID).val()) == "") {

                Required = false;
                $("#Div1").show();
                $("#ulvErrorsPopup").append("<li>" + RequiredObj[i].RequiredMessage + "</li>");
            }
        }
        if ($("#drpManager").val() == '0') {
            $("#Div1").show();
            $("#ulvErrorsPopup").append("<li>Please select Manager</li>");
            Required = false;
        }

    }
    function StoreCustomLeave(FromDate, ToDate, Details, FullHalf) {
        var TimeoffRequestModel = {};
        TimeoffRequestModel.FromDate = FromDate;
        TimeoffRequestModel.ToDate = ToDate;
        TimeoffRequestModel.Reason = Details;
        TimeoffRequestModel.Leave = FullHalf;
        TimeoffRequestModel.RequestId = parseInt(GetValue("hdnID") == '' ? 0 : GetValue("hdnID"));
        if ($("#rblLeaveCategory").find(":checked").val() == '2') {

            TimeoffRequestModel.FirstSecondHalf = $("#rblLeaveCategorySub").find(":checked").val();
        }
        else {
            TimeoffRequestModel.FirstSecondHalf = "";
        }
        TimeoffRequestModel.ApprovalTypeId = $("#ddlApprovalType  option:selected").val();
        TimeoffRequestModel.PmID = GetValue("drpManager");
        $.ajax({
            type: "POST",
            url: 'Timeoffrequest.aspx/SubmitCustomLeave',
            data: "{TimeoffRequestModel:" + JSON.stringify(TimeoffRequestModel) + ",IsEdit:" + false + "}",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (result) {
                var IsDuplicate = result.d[2];
                var IsUpdate = result.d[3];
                if (IsDuplicate == "true") {
                    $("#Div1").show();
                    $("#ulvErrorsPopup").append("<li>A request has already been applied for the same date</li>");
                }
                else {
                    var TimeOffRequestID = result.d[0];
                    ApprovalType = result.d[1];

                    if (TimeOffRequestID != null && ApprovalType != null) {
                        GenerateEmail(TimeOffRequestID, ApprovalType, IsUpdate);
                    }
                    clearForm();
                    GetRequests();
                    $("#request_modal").modal("hide");

                    //$("#popup-content").dialog('close');
                    if (IsUpdate == "True")
                        $("#lblMessage").html('Request has been updated successfully').addClass('alert alert-success');
                    else
                        $("#lblMessage").html('Request has been saved successfully').addClass('alert alert-success');
                }
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText)
            }
        });
    }
    function ValidateCustomLeave(FromDate, ToDate, Details, IsHalfDay, Days) {

        var IsValid = true;
        $("#ulvErrorsPopup").empty();
        $("#Div1").hide();
        if (FromDate == '') {
            $("#Div1").show();
            $("#ulvErrorsPopup").append("<li>Please enter From Date</li>");
            IsValid = false;
        }
        if ($("#drpManager").val() == '0') {
            $("#Div1").show();
            $("#ulvErrorsPopup").append("<li>Please select Manager</li>");
            IsValid = false;
        }
        if (FromDate != '' && !moment(FromDate, "MM/DD/YYYY").isValid()) {
            $("#Div1").show();
            $("#ulvErrorsPopup").append("<li>Please select valid From Date</li>");
            IsValid = false;
        }

        if (ToDate == '') {
            $("#Div1").show();
            $("#ulvErrorsPopup").append("<li>Please enter To Date</li>");
            IsValid = false;
        }
        if (ToDate != '' && !moment(ToDate, "MM/DD/YYYY").isValid()) {
            $("#Div1").show();
            $("#ulvErrorsPopup").append("<li>Please select valid To Date</li>");
            IsValid = false;
        }
        if (Details == '') {
            $("#Div1").show();
            $("#ulvErrorsPopup").append("<li>Please enter reason</li>");
            IsValid = false;
        }
        if (FromDate != null && ToDate != null && moment(FromDate, "MM/DD/YYYY").isValid() && moment(ToDate, "MM/DD/YYYY").isValid() && new Date(ToDate) < new Date(FromDate)) {
            $("#Div1").show();

            $("#ulvErrorsPopup").append("<li>From Date should be less than or Equal to To Date</li>");
            IsValid = false;
        }

        if (IsHalfDay && FromDate != null && ToDate != null && moment(FromDate, "MM/DD/YYYY").isValid() && moment(ToDate, "MM/DD/YYYY").isValid() && new Date(ToDate) - new Date(FromDate) != 0) {
            $("#Div1").show();
            $("#ulvErrorsPopup").append("<li>For half day, From/To date should be the same.</li>");
            IsValid = false;
        }
        /*Check Leave count/Max applicable count/Past & Future applicability*/

        if ($("#hdnLeaveCategoryID").val() != '' && IsValid) {
            var From = moment(FromDate, "MM/DD/YYYY");
            var To = moment(ToDate, "MM/DD/YYYY");

            $.ajax({
                type: "POST",
                url: 'Timeoffrequest.aspx/CheckLeaveCount',
                data: "{ 'LeaveCategoryID' : '" + parseInt($("#hdnLeaveCategoryID").val()) + "'}",
                contentType: 'application/json; charset=utf-8',
                async: false,
                datatype: 'json',
                success: function (result) {
                    var AvailableLeaves = result.d;

                    if (Days > AvailableLeaves) {
                        $("#Div1").show();
                        $("#ulvErrorsPopup").append("<li>You don't have sufficient balance for " + $("#ddlApprovalType option:selected").text() + "  </li>");
                        IsValid = false;
                    }
                }
            });

            $.ajax({
                type: "POST",
                url: 'Timeoffrequest.aspx/CheckPastFuture',
                data: "{'LeaveCategoryID':'" + $("#hdnLeaveCategoryID").val() + "', 'FromDate' : '" + FromDate + "','ToDate' : '" + ToDate + "'}",
                contentType: 'application/json; charset=utf-8',
                async: false,
                datatype: 'json',
                success: function (result) {
                    var Allowed = result.d[0];
                    var ErrorMessage = result.d[1];
                    if (Allowed == "false") {
                        $("#Div1").show();
                        $("#ulvErrorsPopup").append("<li>" + ErrorMessage + "</li>");
                        IsValid = false;
                    }
                }
            });

            $.ajax({
                type: "POST",
                url: 'Timeoffrequest.aspx/CheckMaxLeaveApplicableForCategory',
                data: "{ 'LeaveCategoryID' : '" + parseInt($("#hdnLeaveCategoryID").val()) + "'}",
                contentType: 'application/json; charset=utf-8',
                async: false,
                datatype: 'json',
                success: function (result) {
                    var MinAllowedAtaTime = result.d[0];
                    var MaxAllowedAtaTime = result.d[1];

                    if (MaxAllowedAtaTime != '0' && Days > MaxAllowedAtaTime) {
                        $("#Div1").show();
                        $("#ulvErrorsPopup").append("<li>As per policy, you can apply only " + MaxAllowedAtaTime + " " + $("#ddlApprovalType option:selected").text() + " at a time</li>");
                        IsValid = false;
                    }
                    else if (MinAllowedAtaTime != '0' && Days < MinAllowedAtaTime) {
                        $("#Div1").show();
                        $("#ulvErrorsPopup").append("<li>As per policy, you can apply min " + MinAllowedAtaTime + " " + $("#ddlApprovalType option:selected").text() + " at a time</li>");
                        IsValid = false;
                    }
                }
            });
            $.ajax({
                type: "POST",
                url: 'Timeoffrequest.aspx/CheckApplicability',
                data: "{ 'LeaveCategoryID' : '" + parseInt($("#hdnLeaveCategoryID").val()) + "'}",
                contentType: 'application/json; charset=utf-8',
                async: false,
                datatype: 'json',
                success: function (result) {
                    var Applicable = result.d[0];
                    var ErrorMessage = result.d[1];
                    if (Applicable == "false") {
                        $("#Div1").show();
                        $("#ulvErrorsPopup").append("<li>" + ErrorMessage + "</li>");
                        IsValid = false;
                    }
                }
            });
        }
        /*Check Sandwich/Leave count/Max applicable count*/

        return IsValid;
    }
    function ValidateValidation(ValidateObj) {
        Validate = true;
        var Holiday = false;
        var IsEntryExist = "false";
        var IsRange = false;
        var FromDate = GetValue("FrmDateMain");
        var ToDate = GetValue("ToDateMain") == '' || $("#ddlApprovalType option:selected").val() == EnumType.OIM ? GetValue("FrmDateMain") : GetValue("ToDateMain");
        var ApprovalType = $("#ddlApprovalType").val();
        var DateTocheckHoliday;
        var LeaveCategoryId = $("#ddlApprovalType  option:selected").data('leavecategoryid');

        if (FromDate != "") {
            var IsValidFromDate = moment(FromDate, "MM/DD/YYYY").isValid();
            if (IsValidFromDate == false) {
                Validate = false;
                $("#Div1").show();
                $("#ulvErrorsPopup").append("<li>Please select valid From Date</li>");
                return false;
            }
        }
        if (ToDate != "") {
            var IsValidToDate = moment(ToDate, "MM/DD/YYYY").isValid();
            if (IsValidToDate == false) {
                Validate = false;
                $("#Div1").show();
                $("#ulvErrorsPopup").append("<li>Please select valid To Date</li>");
                return false;
            }
        }
        if ($.inArray(ApprovalType, [EnumType.WorkFromHome, EnumType.WorkOnHoliday, EnumType.CompOff]) >= 0) {
            if ($("#ddlApprovalType option:selected").val() == EnumType.CompOff || $("#ddlApprovalType option:selected").val() == EnumType.WorkOnHoliday) {
                ToDate = FromDate;
            }
            var Date = FromDate + '_' + ToDate;
            if (Date != "_") {
                $.ajax({
                    type: "POST",
                    url: 'Timeoffrequest.aspx/CheckApplicableonHolidayWeekoff',
                    data: "{ 'ApprovalTypeID' : '" + parseInt($("#ddlApprovalType option:selected").val()) + "','Date':'" + Date + "'}",
                    contentType: 'application/json; charset=utf-8',
                    async: false,
                    datatype: 'json',
                    success: function (result) {
                        var Allowed = result.d[0];
                        var ErrorMessage = result.d[1];
                        if (Allowed == "false") {
                            $("#Div1").show();
                            $("#ulvErrorsPopup").append("<li>" + ErrorMessage + "</li>");
                            Validate = false;
                        }
                    }
                });
                var TimeoffReqId = $('#hdnID').val();
                if (TimeoffReqId == "" || TimeoffReqId == null) { TimeoffReqId = "0"; }
                $.ajax({
                    type: "POST",
                    url: 'Timeoffrequest.aspx/CheckMaxLeaveApplicable',
                    data: "{ 'ApprovalTypeID' : '" + parseInt($("#ddlApprovalType option:selected").val()) + "','Date':'" + Date + "','TimeOffRequestId':'" + TimeoffReqId + "'}",
                    contentType: 'application/json; charset=utf-8',
                    async: false,
                    datatype: 'json',
                    success: function (result) {
                        if (result.d) {
                            $("#Div1").show();
                            $("#ulvErrorsPopup").append("<li>As per policy, Maximum limit has been reached for " + $("#ddlApprovalType option:selected").text() + "</li>");
                            Validate = false;
                        }
                    }
                });




            }

        }

        //Max Leave applicable for Educational Paid leave
        if (Required) {
            var RequestId = parseInt(GetValue("hdnID") == '' ? 0 : GetValue("hdnID"));
            if ($("#ddlApprovalType option:selected").val() == EnumType.EPL && FromDate != "") {
                $.ajax({
                    type: "POST",
                    url: 'Timeoffrequest.aspx/CheckApplicableForPaidLearingLeave',
                    data: "{ 'ApprovalTypeID' : '" + parseInt($("#ddlApprovalType option:selected").val()) + "','Date':'" + FromDate + "','RequestId':'" + RequestId + "'}",
                    contentType: 'application/json; charset=utf-8',
                    async: false,
                    datatype: 'json',
                    success: function (result) {
                        if (result.d == false) {
                            $("#Div1").show();
                            $("#ulvErrorsPopup").append("<li>As per policy, Maximum limit has been reached for " + $("#ddlApprovalType option:selected").text() + "</li>");
                            Validate = false;
                        }
                    }
                });
            }
        }


        if (Required) {
            if ($.inArray(ApprovalType, [EnumType.Leave, EnumType.OutDoorDuty, EnumType.WorkFromHome, EnumType.WorkOnHoliday, EnumType.CompOff]) >= 0) {
                switch (ApprovalType) {
                    case EnumType.Leave:
                        IsRange = true;
                        DateTocheckHoliday = FromDate + '_' + ToDate;
                        break;
                    case EnumType.OutDoorDuty:
                        DateTocheckHoliday = FromDate;
                        break;
                    case EnumType.WorkFromHome:
                        IsRange = true;
                        DateTocheckHoliday = FromDate + '_' + ToDate;
                        break;
                    case EnumType.WorkOnHoliday:
                        DateTocheckHoliday = FromDate;
                        break;
                    case EnumType.CompOff:
                        IsRange = false;
                        DateTocheckHoliday = FromDate;
                        break;
                    default:
                        DateTocheckHoliday = FromDate;
                        break;
                }

                $.ajax({
                    type: "POST",
                    url: 'Timeoffrequest.aspx/CheckHoliday',
                    data: "{ 'Date' : '" + DateTocheckHoliday + "','IsRange':'" + IsRange + "','RequestType':'" + ApprovalType + "'}",
                    contentType: 'application/json; charset=utf-8',
                    async: false,
                    datatype: 'json',
                    success: function (result) {
                        Holiday = result.d;
                    }
                });
                $.ajax({
                    type: "POST",
                    url: 'Timeoffrequest.aspx/CheckForOd',
                    data: "{ 'date' : '" + DateTocheckHoliday + "'}",
                    contentType: 'application/json; charset=utf-8',
                    async: false,
                    datatype: 'json',
                    success: function (result) {
                        IsEntryExist = result.d;
                    }
                });

                switch (ApprovalType) {
                    case EnumType.Leave:
                        if (Holiday == "True") {
                            Validate = false;
                            $("#Div1").show();
                            $("#ulvErrorsPopup").append("<li>From Date/To Date should not be holiday</li>");
                        }
                        break;
                    case EnumType.OutDoorDuty:
                        if (Holiday == "True" || IsEntryExist == "False") {
                            Validate = false;
                            $("#Div1").show();
                            $("#ulvErrorsPopup").append("<li>Outdoor Duty is not allowed on this date</li>");
                        }
                        break;

                    default:
                        break;
                }


            }
        }

        if (FromDate != null && ToDate != null && moment(FromDate, "MM/DD/YYYY").isValid() && moment(ToDate, "MM/DD/YYYY").isValid() && moment(ToDate, "MM/DD/YYYY") < moment(FromDate, "MM/DD/YYYY") && $("#ToDateMain").is(":visible")) {
            Validate = false;
            $("#Div1").show();
            $("#ulvErrorsPopup").append("<li>From Date should be less than or Equal to To Date</li>");
        }
        if ($("#rbtLeave").find(":checked").val() == '2' && $("#ToDateMain").val() != '' && $("#FrmDateMain").val() != $("#ToDateMain").val()) {
            Validate = false;
            $("#Div1").show();
            $("#ulvErrorsPopup").append("<li>For Half Day, Dates should be same</li>");
        }

        for (var i = 0; i < ValidateObj.length; i++) {
            if (ValidateObj[i].UIID.toLowerCase().indexOf("maincontent_uc") >= 0) {
                var TextBoxID = ValidateObj[i].UIID.replace("divCalenderPopup", "txtToEventDate");
                if (IsValidDate(TextBoxID) == false) {
                    Validate = false;
                    $("#Div1").show();
                    $("#ulvErrorsPopup").append("<li>" + ValidateObj[i].ValidationMessage + "</li>");
                }
            }
            if (ValidateObj[i].UIID.indexOf("Contact") >= 0) {
                if (!(/^[0-9]+$/.test($("#" + ValidateObj[i].UIID).val())) && $.trim($("#" + ValidateObj[i].UIID).val()) != "") {
                    Validate = false;
                    $("#Div1").show();
                    $("#ulvErrorsPopup").append("<li>" + ValidateObj[i].ValidationMessage + "</li>");
                }
            }

            if (ValidateObj[i].UIID.indexOf("EndTime") >= 0 || ValidateObj[i].UIID.indexOf("StartTime") >= 0) {

                if ($("#" + ValidateObj[i].UIID).val().indexOf(':') == -1 || moment($("#" + ValidateObj[i].UIID).val(), "HH:mm").isValid() == false) {
                    Validate = false;
                    $("#Div1").show();
                    $("#ulvErrorsPopup").append("<li>" + ValidateObj[i].ValidationMessage + "</li>");
                }

            }
            if (i == ValidateObj.length - 1 && Validate == true && $("#ddlApprovalType option:selected").val() == EnumType.OutDoorDuty) {

                var StartTime = moment($("#txtStartTime").val(), "HH:mm");
                var EndTime = moment($("#txtEndTime").val(), "HH:mm");
                if (StartTime > EndTime) {
                    Validate = false;
                    $("#Div1").show();
                    $("#ulvErrorsPopup").append("<li>Start Time can not be greater than End Time</li>");
                }
            }


        }

        //if ($("#rbtChangeShiftType input:checked").val() == "2" && $("#ddlApprovalType option:selected").val() == EnumType.ShiftChange && (moment(ToDate, "MM/DD/YYYY").isBefore(moment().startOf('day')) || moment(FromDate, "MM/DD/YYYY").isBefore(moment().startOf('day')))) {
        //    Validate = false;
        //    $("#Div1").show();
        //    $("#ulvErrorsPopup").append("<li>Past request can not be applied for permanent shift change.</li>");
        //}
        //---comment for issue Sprint O-issue 15



    }
    function ValidateWFHWithTimesheet() {

        var FromDate = GetValue("FrmDateMain");

        var ToDate = GetValue("ToDateMain");

        var isValid;

        $.ajax({
            type: "POST",
            url: 'Timeoffrequest.aspx/ValidateWFHRequestByTimesheet',
            data: JSON.stringify({ fromDate: FromDate, toDate: ToDate }),
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            async: false,
            success: function (result) {
                isValid = result.d[0];
                if (isValid == "false") {
                    $("#Div1").show();
                    $("#ulvErrorsPopup").append("<li>" + result.d[1] + "</li>");
                }
                else if (result.d[1] != '') {
                    timesheetReminderMessage = result.d[1];
                    //alert(result.d[1]);
                }
            }
        });

        return isValid;
    }
    function ValidateRequestWithTimesheet() {

        var FromDate = GetValue("FrmDateMain");

        var ToDate = GetValue("ToDateMain");

        var isValid;

        $.ajax({
            type: "POST",
            url: 'Timeoffrequest.aspx/ValidateRequestByTimesheet',
            data: JSON.stringify({ fromDate: FromDate, toDate: ToDate }),
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            async: false,
            success: function (result) {
                isValid = result.d[0];
                if (isValid == "false") {
                    $("#Div1").show();
                    $("#ulvErrorsPopup").append("<li>" + result.d[1] + "</li>");
                }
                else if (result.d[1] != '') {
                    timesheetReminderMessage = result.d[1];
                    //alert(result.d[1]);
                }
            }
        });

        return isValid;
    }

    function SubmitRequest() {

        var TimeoffRequestModel = {};
        //TimeoffRequestModel.RequestId = GetValue("hdnID");
        TimeoffRequestModel.RequestId = parseInt(GetValue("hdnID") == '' ? 0 : GetValue("hdnID"));
        TimeoffRequestModel.ProjectID = GetValue("drpProject");
        if ($("#rbtLeave").is(":visible")) {
            TimeoffRequestModel.Leave = $("#rbtLeave").find(":checked").val();
            if ($("#rbtLeave").find(":checked").val() == '2') {
                if (GetValue("FrmDateMain") != GetValue("ToDateMain") && GetValue("ToDateMain") != "") {
                    $("#Div1").show();
                    $("#ulvErrorsPopup").append("<li>For half day, From/To date should be the same.</li>");
                    return false;
                }
                TimeoffRequestModel.FirstSecondHalf = $("#rbtHalf").find(":checked").val();
            }
            else {
                TimeoffRequestModel.FirstSecondHalf = "";
            }
        }
        if ($("#ddlApprovalType  option:selected").val() == EnumType.OutDoorDuty) {

            TimeoffRequestModel.FromDate = $("#FrmDateMain").val() + ' ' + GetValue("txtStartTime");
            TimeoffRequestModel.ToDate = $("#FrmDateMain").val() + ' ' + GetValue("txtEndTime");
            var Duration = moment.utc(moment(GetValue("txtEndTime"), "HH:mm").diff(moment(GetValue("txtStartTime"), "HH:mm"))).format("HH:mm");
            var Hours = Duration.split(":")[0];
            var Minutes = Duration.split(":")[1];
            TimeoffRequestModel.Minutes = (parseInt(Hours * 60) + parseInt(Minutes));
        }
        else {
            TimeoffRequestModel.FromDate = GetValue("FrmDateMain");
            TimeoffRequestModel.ToDate = $("#ToDateMain").is(":visible") == false || GetValue("ToDateMain") == '' || $("#ddlApprovalType option:selected").val() == EnumType.OIM ? GetValue("FrmDateMain") : GetValue("ToDateMain");
            TimeoffRequestModel.Minutes = (parseInt(GetValue("drpHours") * 60) + parseInt(GetValue("drpMinutes")));
        }
        TimeoffRequestModel.NewShift = GetValue("drpNewShift");
        TimeoffRequestModel.ShiftChangeType = $("#rbtChangeShiftType").find(":checked").val();
        TimeoffRequestModel.ContactNo = GetValue("txtContact");
        TimeoffRequestModel.PmID = GetValue("drpManager");
        TimeoffRequestModel.Address = GetValue("txtAddress");
        TimeoffRequestModel.Reason = GetValue("txtReason");
        TimeoffRequestModel.IsWFH = $("#ChkWFH").is(":checked");
        TimeoffRequestModel.ApprovalTypeId = $("#ddlApprovalType  option:selected").val();
        var TimeoffRequestModel = "{TimeoffRequestModel:" + JSON.stringify(TimeoffRequestModel) + "}";
        if ($("#ddlApprovalType option:selected").val() == EnumType.OIM) {
            $.ajax({
                type: "POST",
                url: 'Timeoffrequest.aspx/CheckOIMExistsInMonth',
                data: "{'Date':'" + GetValue("FrmDateMain") + "','RequestID':'" + parseInt(GetValue("hdnID") == '' ? 0 : GetValue("hdnID")) + "'}",
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                async: false,
                success: function (result) {

                    if (result.d) {
                        $("#Div1").show();
                        $("#ulvErrorsPopup").append("<li>This request can be applied only once per month</li>");
                    }
                    else
                        SaveData(TimeoffRequestModel);
                }
            });

        }
        else
            SaveData(TimeoffRequestModel);
    }
    function SaveData(TimeoffRequestModel) {
        $.ajax({
            type: "POST",
            url: 'Timeoffrequest.aspx/SubmitRequest',
            data: TimeoffRequestModel,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (result) {

                var IsDuplicate = result.d[2];
                var IsUpdate = result.d[3];
                if (IsDuplicate == "true") {
                    $("#Div1").show();
                    $("#ulvErrorsPopup").append("<li>A request has already been applied for the same date</li>");
                }
                else {
                    var TimeOffRequestID = result.d[0];
                    ApprovalType = result.d[1];

                    if (TimeOffRequestID != null && ApprovalType != null) {
                        GenerateEmail(TimeOffRequestID, ApprovalType, IsUpdate);
                    }
                    clearForm();

                    GetRequests();
                    $("#request_modal").modal("hide");

                    //$("#popup-content").dialog('close');
                    if (timesheetReminderMessage != '') {
                        alert(timesheetReminderMessage);
                        timesheetReminderMessage = '';
                    }
                    if (IsUpdate == "True")
                        $("#lblMessage").html('Request has been updated successfully').addClass('alert alert-success');
                    else
                        $("#lblMessage").html('Request has been saved successfully').addClass('alert alert-success');
                }


            }
        });
    }
    function GenerateEmail(TimeOffRequestID, ApprovalType, IsUpdate) {
        $.ajax({
            type: "POST",
            url: 'Timeoffrequest.aspx/GetEmailBody',
            data: "{'TimeOffRequestID':'" + TimeOffRequestID + "','ApprovalType':'" + ApprovalType + "','IsUpdate':'" + IsUpdate + "'}",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (data) {
                ProcessString(data.d, TimeOffRequestID, IsUpdate);
            }
        });

    }
    function ProcessString(EmailBody, TimeOffRequestID, IsUpdate) {

        $('#EmailDiv').html(EmailBody);
        jQuery('#EmailDiv').find('td:empty').parent().remove();
        jQuery('#EmailDiv').find('td:contains("}")').parent().remove();
        jQuery('#EmailDiv').find('table').removeAttr('height width');
        var MailBody;

        if (ApprovalType == EnumType.MissPunch || ApprovalType == EnumType.PunchCard) {
            var myDiv = jQuery('#EmailDiv').find('#MPDiv').detach();
            myDiv.appendTo(jQuery('#EmailDiv').find('table:first'));
            // jQuery('#EmailDiv').find('#MPDiv').appendTo(jQuery('#EmailDiv').find('div.Override > table:first-child'))
            //MailBody=jQuery('#EmailDiv').find('MissPunchDetails').appendTo(jQuery('#EmailDiv').find('table:first'));       
        }
        MailBody = $('#EmailDiv').html().replace(/\s{2,}/g, ' ');
        $.ajax({
            type: "POST",
            url: 'Timeoffrequest.aspx/SendMail',
            data: JSON.stringify({ MailBody: MailBody, TimeOffRequestID: TimeOffRequestID, IsUpdate: IsUpdate }),
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (data) {

            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText)
            }
        });
    }
    function GetMissPunchDates() {
        $.ajax({
            type: "POST",
            url: 'Timeoffrequest.aspx/GetMissPunchDates',
            data: {},
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (data) {

                var result = jQuery.parseJSON(data.d);
                var select = $("#drpSuggestedDates");
                select.children().remove();
                select.append($('<option></option>').val(0).html("-Select Date-"));
                var count = Object.keys(result).length;
                for (var i = 0; i < count; i++) {
                    var SuggestedDate = result[i].Date.split('T');
                    select.append($('<option></option>').val(SuggestedDate[0]).html(SuggestedDate[0]));
                }
                select.append($('<option></option>').val(1).html("Other"));
            }
        });
        // $("#DivMisPunchSuggesions").show();
    }
    $("#drpSuggestedDates").change(function () {
        $("#ulvErrorsPopup").empty();
        $("#Div1").hide();

        var DateValue = $("#drpSuggestedDates option:selected").val();
        switch (DateValue) {
            case "0":
                $("#divOtherDate").hide();
                $("#MainContent_UcMissPunchDate_txtToEventDate").val('');
                $("#AddDetails").hide();
                $("#GvMisspunch").find("tr:gt(0)").remove();
                $("#GvMisspunch").hide();
                $("#GvMisspunch").parent().parent().hide();
                $("#txtMissPunchDetails").hide();
                return false;
                break;
            case "1":
                $("#divOtherDate").show();
                $("#MainContent_UcMissPunchDate_txtToEventDate").val('');
                $("#AddDetails").hide();
                $("#GvMisspunch").hide();
                $("#GvMisspunch").parent().parent().hide();
                $("#txtMissPunchDetails").hide();

                break;
            default:
                $("#divOtherDate").hide();
                $("#MainContent_UcMissPunchDate_txtToEventDate").val('');
                ProcessMisspunch(DateValue);
        }
    });
    $("#MainContent_UcMissPunchDate_txtToEventDate").on("change", function () {
        $("#ulvErrorsPopup").empty();
        $("#Div1").hide();
        if (!IsValidDate("MainContent_UcMissPunchDate_txtToEventDate")) {
            $("#GvMisspunch").find("tr:gt(0)").remove();
            $("#GvMisspunch").append("<tr><td colspan='3' style=''>No Records Found</td></tr>");
            $("#Div1").show();
            $("#ulvErrorsPopup").append("<li>Please Enter Valid Date</li>");
            return false;
        }
        var DateValue = $("#MainContent_UcMissPunchDate_txtToEventDate").val();
        ProcessMisspunch(DateValue);

    });


    $("#AddDetails").click(function () {
        if ($("#hdnMispunchCount").val() == "0" && $("#ddlApprovalType option:selected").val() == EnumType.MissPunch) {
            $("#Div1").show();
            $("#ulvErrorsPopup").append("<li>You can not add details for this date</li>");
            return false;
        }
        else {
            $("#trNoRecord").remove();
        }
        $("#ulvErrorsPopup").empty();
        $("#Div1").hide();
        $("#GvMisspunch").append("<tr  data-AttendanceType='0'><td style='display:none;'>0</td><td  style='text-align:center !important;'><input type='text' name='txt' class='Time form-control' style=''/></td><td  style='text-align:center !important;'><input type='text'  name='txt' class='Time form-control' style=''/></td><td  style='text-align:center !important;'><img src='../Images/Delete.png' class='dltMisspunchRow' style='cursor:pointer;'/></td></tr>");
        //$(".Time").keypress(function (e) {
        //    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57) && e.which != 58) {
        //        return false;
        //    }
        //});
        $(".dltMisspunchRow").click(function () {

            if ($(this).hasClass('dltdisable') && $("#ddlApprovalType option:selected").val() == EnumType.PunchCard) {
                return false;
            }
            if ($("#GvMisspunch tr").length == 2 && $("#ddlApprovalType option:selected").val() == EnumType.PunchCard) {
                return false;
            }
            else {
                $(this).closest('tr').remove();
                if ($("#GvMisspunch tr").length == 1) {
                    $("#GvMisspunch").append("<tr id='trNoRecord'><td colspan='3' style='padding-left:15px;'>No Records Found</td></tr>");
                }
            }
        });
        $(".Time").datetimepicker({
            format: "MM/DD/YYYY HH:mm", icons: {
                date: "fa fa-calendar"
            }, defaultDate: null,
            keyBinds: {
                up: null,
                down: null,
                left: null,
                right: null
            }
        });
        var SelectedDate = $("#ddlApprovalType  option:selected").val() != EnumType.PunchCard && $("#drpSuggestedDates").val() != "0" && $("#drpSuggestedDates").val() != "1" ? moment($("#drpSuggestedDates").val(), "YYYY-MM-DD") : moment($("#MainContent_UcMissPunchDate_txtToEventDate").val(), "MM/DD/YYYY");
        //$(".Time").on("mousedown keydown", function () {
        //    if ($(this).val() == "")
        //        $(this).val(SelectedDate.format("MM/DD/YYYY hh:mm"));
        //});

    });
    $(document).on("click", '.sortField', function (e) {
        var Type = $("#drpRequestType option:selected").val();
        var Status = $("#drpStatus option:selected").val();
        var FromDate = $("#txtFromDate").val();
        var ToDate = $("#txtToDate").val();
        var Filters = new Array();
        Filters[0] = Type;
        Filters[1] = Status;
        Filters[2] = FromDate;
        Filters[3] = ToDate;
        $.when(
             $.ajax({
                 type: "POST",
                 url: 'Timeoffrequest.aspx/GetRequestsBySortType',
                 data: JSON.stringify({ Filters: Filters }),
                 contentType: 'application/json; charset=utf-8',
                 datatype: 'json',
                 success: function (result) {
                     var jsonResult = jQuery.parseJSON(result.d);
                     TimeoffViewModel(jsonResult);
                 }
             })).then(function () {
                 SetMenu();
             });
    });
    function paging() {
        $("#tblTimeoff").each(function () {
            var currentPage = 0;
            var numPerPage = 10;
            var $table = $(this);
            $table.bind('repaginate', function () {
                $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
                //$table.find("tbody  tr:odd").addClass("altr");


            });
            $table.trigger('repaginate');
            var numRows = $table.find('tbody tr').length;
            var numPages = Math.ceil(numRows / numPerPage);
            var $pager = $('<table class="paginat"></table>');
            var $pager1 = $('<tr></tr>')
            $($pager1).appendTo($pager);
            var $pager2 = $('<td></td>')
            $($pager2).appendTo($pager1);
            var $pager3 = $('<table></table>')
            $($pager3).appendTo($pager2);
            var $pager4 = $('<tr></tr>')
            $($pager4).appendTo($pager3);
            //Bind PageNumber
            $(".page-number").remove();
            for (var page = 0; page < numPages; page++) {
                if (numPages > 1) {
                    $('<td class="page-number"></td>').append($("<a></a>").text(page + 1)).bind('click', {
                        newPage: page
                    }, function (event) {
                        currentPage = event.data['newPage'];
                        $table.trigger('repaginate');


                        $(this).addClass('active').siblings().removeClass('active');
                    }).appendTo($pager4).addClass('clickable');
                }

            }
            $pager.insertAfter($table).find('td.page-number:first').addClass('active');

        });
    }

    $('#divPopup_ReqDetails').on('hidden.bs.modal', function () {
        resetValuesForViewDetails();
    });
});

function MakeRequest() {

    var Type = $("#ddlApprovalType option:selected").val();

    if ($("#ddlApprovalType option:selected").data('leavecategoryid')) {
        $("#hdnLeaveCategoryID").val($("#ddlApprovalType option:selected").data('leavecategoryid'));

    }
    else {

        $("#hdnLeaveCategoryID").val('');
    }
    // $("#ddlApprovalType option:selected").val() == EnumType.MissPunch ? $('.SpanManager').html('Monitored By') : $('.SpanManager').html('Apply to')
    $.ajax({
        type: "POST",
        url: 'Timeoffrequest.aspx/ChangeForWhenOnlyHRApproval',
        data: "{ 'ApprovalTypeId' : '" + Type + "'}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            if (result.d) {
                $('.SpanManager').html('Monitored By :');
            }
            else {
                $('.SpanManager').html('Apply to :');
            }

        }
    });




    $.ajax({
        type: "POST",
        url: 'Timeoffrequest.aspx/GetConfigurationForRequestType',
        data: "{ 'Type' : '" + Type + "'}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            var jsonResult = jQuery.parseJSON(result.d);
            var ToShow = jsonResult.dtShow;
            var ToHide = jsonResult.dtHide;
            ShowHideControls(ToShow, ToHide);
            FillControls();
        }
    }).then(function () {
        clearForm();
        $("#request_modal").modal("show");
        $('#request_modal').on('shown.bs.modal', function (e) {
            $(this).find(".modal-title").html($("#ddlApprovalType option:selected").text());
            setTimeout(function () { $(".chosen-container").css("width", "100%") }, 100);

        })
        //$("#popup-content").dialog({
        //    title: $("#ddlApprovalType option:selected").text(),
        //    width: 500,
        //    height: 600,
        //    // autoResize: true,
        //    resizable: true,
        //    draggable: false,
        //    show: {
        //        effect: "fade",
        //        duration: 150
        //    },
        //    hide: {
        //        effect: "fade",
        //        duration: 150
        //    },
        //    open: function () {
        //        overlayOpacityNormal = $('.ui-widget-overlay').css('opacity');
        //        // $('.ui-widget-overlay').css({ 'opacity': overlayOpacitySpecial });

        //        $(".ui-dialog-titlebar").append("");
        //        $('#NewCloseIcon').on('click', function () {
        //            $("#popup-content").dialog('close');
        //        });
        //    },
        //    beforeClose: function () {
        //        $('.ui-widget-overlay').css('opacity', overlayOpacityNormal);
        //        $(".ui-dialog-titlebar").find('img').remove();
        //    },
        //    draggable: false,
        //    resize: "auto",
        //    modal: true,
        //    dialogClass: 'no-close success-dialog',

        //})
    });
    SetDatePickersAccordingToRequest();
}
function ShowHideRadio() {

    if ($("#rbtLeave input:checked").val() == "2") {
        $("#rbtHalf").css("display", "block");
    }
    else {
        $("#rbtHalf").css("display", "none");
    }



}
function ShowHideRadioCustomLeave() {
    if ($("#rblLeaveCategory input:checked").val() == "2") {
        $("#rblLeaveCategorySub").css("display", "block");
    }
    else {
        $("#rblLeaveCategorySub").css("display", "none");
    }
}
function clearForm() {
    $('input[type=text]').each(function () {
        if (!($(this).attr("id") == "txtFromDate" || $(this).attr("id") == "txtToDate"))
            $(this).val('');
    });
    $('textarea').each(function () {
        $(this).val('');
    });
    $('.rbl').each(function () {
        $(this).find("input[value=1]").prop("checked", true);
    });
    $(".tblLeaveClub").hide();
    ShowHideRadio();
    //setStartEndDate();

}


function GetValue(id) {
    return $("#" + id).val();
}

function ShowHideControls(ToShow, ToHide) {

    $('.rqspan').remove();
    for (var i = 0; i < ToShow.length; i++) {

        $("#" + ToShow[i].UIID).show().css('display', 'block');
        $("." + ToShow[i].UIID).show().html(ToShow[i].Caption);
        //$("." + ToShow[i].UIID).closest('.DvMain').addClass('form-panel');
        $("." + ToShow[i].UIID).closest('.DvMain').show();

        if ($("#ddlApprovalType option:selected").val() == EnumType.OIM && ToShow[i].UIID == "drpNewShift") {

            if ($("#hdnIsFlexible").val() == 'false' && ToShow[i].IsMandatory) {
                $("<span class='rqspan text-danger'>*</span>").insertAfter("." + ToShow[i].UIID);
                $(".lblExistingShift").closest(".DvMain").show();
            }
            else {
                $("#drpNewShift").prop('disabled', true);
                $(".lblExistingShift").closest(".DvMain").hide();
            }
        }
        else if (ToShow[i].IsMandatory)
            $("<span class='rqspan text-danger'>*</span>").insertAfter("." + ToShow[i].UIID);


        if (ToShow[i].UIID == 'txtContact') {
            var ContactField = $("#" + ToShow[i].UIID);
            var hdnId = $("#hdnID").val() == "" ? "0" : $("#hdnID").val();
            $.ajax({
                type: "POST",
                url: 'Timeoffrequest.aspx/GetContact',
                data: "{'RequestId':" + hdnId + "}",
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                success: function (result) {

                    ContactField.val(result.d);
                }
            });
        }
    }

    for (var i = 0; i < ToHide.length; i++) {
        $("#" + ToHide[i].UIID).hide().css('display', 'none');
        $("." + ToHide[i].UIID).closest('.DvMain').removeClass('form-panel');
        $("." + ToHide[i].UIID).closest('.DvMain').hide();
        $("." + ToHide[i].UIID).removeClass('form-panel');
        $("." + ToHide[i].UIID).hide().css('display', 'none');
    }

    $('input[type=checkbox]').each(function () {
        if ($(this).css('display') == "none") {
            $(this).parent().hide();
        }
        else {
            $(this).parent().show();
        }
    });

    //$('.DvMain').children().each(function () {
    //    if ($(this).css('display') == "none") {
    //        $(this).parent().hide();
    //    }
    //});
    $('.first-colum-label span').each(function () {
        if ($(this).css('display') == "none") {
            $(this).parent().hide();
        }
        else {
            $(this).parent().show();
        }
    });
    ShowHideRadioCustomLeave();


}

function CancelRequest() {

    $("#divconfirm").modal("show");
    $('#divconfirm').on('shown.bs.modal', function (e) {
        $(this).find(".modal-title").html("Cancel" + $("#CurrentRequestName").val() + "request");
        $("#rqType").html($("#CurrentRequestName").val());
    });
    //$("#divconfirm").dialog({
    //    title: "Cancel Request",
    //    width: 300,
    //    show: {
    //        effect: "fade",
    //        duration: 300
    //    },
    //    hide: {
    //        effect: "fade",
    //        duration: 300
    //    },
    //    height: 150,
    //    draggable: false,
    //    resizable: false,
    //    position: { my: 'top', at: 'top+250' },
    //    modal: true,
    //    dialogClass: 'no-close success-dialog'
    //});
    return false;
}
function SetDatePickersAccordingToRequest() {

    if ($("#ddlApprovalType option:selected").val() == EnumType.CompOff || $("#ddlApprovalType option:selected").val() == EnumType.WorkOnHoliday) {
        var MaxDate = new Date()
        $(".CalculatedDate").each(function () {
            $(this).data("DateTimePicker").destroy();
        });
        $('.CalculatedDate').datetimepicker({
            format: DateFormat,
            widgetPositioning: {
                horizontal: 'auto',
                vertical: 'bottom'
            }, minDate: moment(DataFreezingDate.d).add(1, 'days').millisecond(0).second(0).minute(0).hour(0),
            maxDate: moment().add(-1, 'days').millisecond(0).second(0).minute(0).hour(0)
        });
    }
    else if ($("#ddlApprovalType option:selected").val() == EnumType.ShiftChange) {

        $(".CalculatedDate").each(function () {
            if ($(this).data("DateTimePicker") != undefined)
                $(this).data("DateTimePicker").destroy()
        });
        if ($("#rbtChangeShiftType input:checked").val() == "2") {
            $('.CalculatedDate').datetimepicker({
                format: DateFormat,
                widgetPositioning: {
                    horizontal: 'auto',
                    vertical: 'bottom'
                }, minDate: moment(DataFreezingDate.d).add(1, 'days').millisecond(0).second(0).minute(0).hour(0),
            });
        }
        else {
            $('.CalculatedDate').datetimepicker({
                format: DateFormat,
                widgetPositioning: {
                    horizontal: 'auto',
                    vertical: 'bottom'
                }, minDate: moment(DataFreezingDate.d).add(1, 'days').millisecond(0).second(0).minute(0).hour(0),
            });
        }
    }
    else if ($("#ddlApprovalType option:selected").val() == EnumType.MissPunch || $("#ddlApprovalType option:selected").val() == EnumType.PunchCard) {
        $(".CalculatedDate").each(function () {
            $(this).data("DateTimePicker").destroy()
        });
        $('.CalculatedDate').datetimepicker({
            format: DateFormat,
            widgetPositioning: {
                horizontal: 'auto',
                vertical: 'bottom'
            }, minDate: moment(DataFreezingDate.d).add(1, 'days').millisecond(0).second(0).minute(0).hour(0),
        });
    }
    else {
        $(".CalculatedDate").each(function () {
            $(this).data("DateTimePicker").destroy()
        });
        $('.CalculatedDate').datetimepicker({
            format: DateFormat,
            widgetPositioning: {
                horizontal: 'auto',
                vertical: 'bottom'
            }, minDate: moment(DataFreezingDate.d).add(1, 'days').millisecond(0).second(0).minute(0).hour(0)
        });
        $(".CalculatedDate").each(function () {
            $(this).data("DateTimePicker").clear()
        });
    }
}
function EditRequest(element) {
    /*If WFH/WOH applied,but then removed from policy. In that case we can not allow to edit the WFH/WOH*/
    //$('#btnSave').attr("disabled", true);
    //setTimeout(function () {
    //    $("#btnSave").removeAttr("disabled");
    //}, 3000); //Added for preventing multiple clicks


    var ApprovalTypeID = $(element).closest('div').data('approvaltypeid');
    var WFHWOHAvailable = true;
    if (ApprovalTypeID == EnumType.WorkFromHome || ApprovalTypeID == EnumType.WorkOnHoliday || ApprovalTypeID == EnumType.OutDoorDuty || ApprovalTypeID == EnumType.Tour || ApprovalTypeID == EnumType.CompOff || ApprovalTypeID == EnumType.ShiftChange) {
        $.ajax({
            type: "POST",
            url: 'Timeoffrequest.aspx/CheckApprovalTypeApplicable',
            data: "{'ApprovalTypeID':'" + ApprovalTypeID + "'}",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            async: false,
            success: function (result) {

                WFHWOHAvailable = result.d;

            }
        });

    }

    if (!WFHWOHAvailable) {
        $.confirm({
            backgroundDismiss: false,
            title: 'Attention',
            icon: 'fa fa-info-circle',
            cancelButton: false,
            confirmButton: 'Ok',
            content: ApprovalTypeID == EnumType.ShiftChange ? 'This request can not be edited as the policy is flexible' : 'You can not edit this request as it is not available as per Policy assigned to you'
        });
        return false;
    }
    /*If WFH/WOH applied,but then removed from policy. In that case we can not allow to edit the WFH/WOH*/
    clearForm();
    $("#ulvErrorsPopup").empty();
    $("#Div1").hide();
    var RequestId = $("#hdnID").val();
    $.ajax({
        type: "POST",
        url: 'Timeoffrequest.aspx/GetDataForEdit',
        data: "{ 'RequestId' : '" + RequestId + "'}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {

            $("#ddlApprovalType").prop("disabled", true);
            $("#drpManager").prop("disabled", true);

            var jsonResult = jQuery.parseJSON(result.d);
            SetValues(jsonResult);
            $("#drpManager").addClass("chosen-select");
            if ($("#drpManager").hasClass("chosen-select")) {
                $(".chosen-select").chosen({

                });
            }
            $("#ddlApprovalType").trigger("chosen:updated");
            $("#drpManager").trigger("chosen:updated");
        }
    });
    $("#request_modal").modal("show");
    $('#request_modal').on('show.bs.modal', function (e) {
        $(this).find(".modal-title").html("Edit Request");
    });
    $('#request_modal').on('hidden.bs.modal', function (e) {
        $.ajax({
            type: "POST",
            url: 'Timeoffrequest.aspx/ResetUpdateVariables',
            data: {},
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (result) {

            }
        });
        $("#divOtherDate").hide();
        $("#MainContent_UcMissPunchDate_txtToEventDate").val('');
        $("#AddDetails").hide();
        $("#GvMisspunch").find("tr:gt(0)").remove();
        $("#GvMisspunch").hide();
        $("#GvMisspunch").parent().parent().hide();
        $("#txtMissPunchDetails").hide();
    })

    //$("#popup-content").dialog({
    //    title: "Edit Request",
    //    width: 500,
    //    show: {
    //        effect: "fade",
    //        duration: 150
    //    },
    //    hide: {
    //        effect: "fade",
    //        duration: 150
    //    },
    //    open: function () {
    //        overlayOpacityNormal = $('.ui-widget-overlay').css('opacity');
    //        //$('.ui-widget-overlay').css({ 'opacity': overlayOpacitySpecial });


    //        $(".ui-dialog-titlebar").append("<img src='../Images/CloseButton_Dialogue.png' id='NewCloseIcon' style='  float: right;cursor: pointer;width: 32px;margin-top: -7px;margin-right: -11px;' />");
    //        $('#NewCloseIcon').on('click', function () {
    //            $("#popup-content").dialog('close');
    //        });
    //    },
    //    beforeClose: function () {
    //        $('.ui-widget-overlay').css('opacity', overlayOpacityNormal);
    //        $(".ui-dialog-titlebar").find('img').remove();
    //    },
    //    // ResetUpdateVariables method call on close popup for update flag of IsUpdate
    //    close: function () {
    //        $.ajax({
    //            type: "POST",
    //            url: 'Timeoffrequest.aspx/ResetUpdateVariables',
    //            data: {},
    //            contentType: 'application/json; charset=utf-8',
    //            datatype: 'json',
    //            success: function (result) {

    //            }
    //        });
    //        $("#divOtherDate").hide();
    //        $("#MainContent_UcMissPunchDate_txtToEventDate").val('');
    //        $("#AddDetails").hide();
    //        $("#GvMisspunch").find("tr:gt(0)").remove();
    //        $("#GvMisspunch").hide();
    //        $("#txtMissPunchDetails").hide();
    //    },
    //    draggable: false,
    //    resizable: false,
    //    height: 500,
    //    modal: true,
    //    dialogClass: 'no-close success-dialog'
    //});

}

function SetValues(Data) {


    $.when(
    $.ajax({
        type: "POST",
        url: 'Timeoffrequest.aspx/GetRequestTypes',
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (RequestTypes) {
            var result = jQuery.parseJSON(RequestTypes.d);
            var select = $("#ddlApprovalType");
            select.children().remove();

            var count = Object.keys(result.dtTypes).length;
            for (var i = 0; i < count; i++) {
                select.append($('<option data-leavecategoryid=' + result.dtTypes[i].LeaveCategoryID + '></option>').val(result.dtTypes[i].ApprovalTypeId).html(result.dtTypes[i].ApprovalType));
            }
            var countOfManagers = Object.keys(result.dtManager).length;
            $("#drpManager").empty();

            var strOptions = "<option value='0'>-Select Manager-</option>";
            for (var i = 0; i < countOfManagers; i++) {
                strOptions = strOptions + "<option value='" + result.dtManager[i].empID + "'>" + result.dtManager[i].Name + "</option>";
            }
            $("#drpManager").append(strOptions);

        }
    })).then(function () {
        Display("ddlApprovalType", Data.ApprovalTypeId);
        $("#request_modal").find(".modal-title").html($("#ddlApprovalType option:selected").text());
        //$("#popup-content").parent().find("span.ui-dialog-title").html($("#ddlApprovalType option:selected").text());
    }).then(function () {
        var Type = $("#ddlApprovalType option:selected").val();
        $.ajax({
            type: "POST",
            url: 'Timeoffrequest.aspx/GetConfigurationForRequestType',
            data: "{ 'Type' : '" + Type + "'}",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            async: false,
            success: function (ConfigResult) {
                var jsonResultConfig = jQuery.parseJSON(ConfigResult.d);
                var ToShow = jsonResultConfig.dtShow;
                var ToHide = jsonResultConfig.dtHide;

                ShowHideControls(ToShow, ToHide);
            }
        })
    }).then(function () {
        /*Leave category section*/

        /*Leave category section*/


        if ($("#ddlApprovalType option:selected").val() == EnumType.MissPunch || $("#ddlApprovalType option:selected").val() == EnumType.PunchCard) {
            $("#hdnRequestType").val("true");
            $("#hdnIsMissPunchEdit").val("true");
            clearForm();
            $.when(
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
                     if (Object.keys(resultForMissPunchDates).length > 0)
                         $("#drpSuggestedDates").val(Data.FromDate.split('T')[0]);
                     select.append($('<option></option>').val(1).html("Other"));

                 }
             })).done(function () {
                 if ($("#drpSuggestedDates").val() == '0') {
                     $("#divOtherDate").show();
                     $('#MainContent_UcMissPunchDate_txtToEventDate').val(moment(Data.FromDate).format('MM/DD/YYYY'));
                     $("#drpSuggestedDates").val(1);
                 }
                 else {

                     $("#divOtherDate").hide();
                     $('#MainContent_UcMissPunchDate_txtToEventDate').val('');
                 }
                 if ($("#ddlApprovalType option:selected").val() == EnumType.PunchCard)
                     $("#drpSuggestedDates").hide();
                 $("#MPDetails").val(Data.ReasonForTimeOff);
             }).then(function () {

                 $.ajax({
                     type: "POST",
                     url: 'Timeoffrequest.aspx/GetMissPunchDataForEdit',
                     data: "{'MissPunchDate':'" + Data.FromDate.split('T')[0] + "','RequestID' : '" + Data.TimeOffRequestID + "'}",
                     contentType: 'application/json; charset=utf-8',
                     datatype: 'json',
                     async: false,
                     success: function (data) {

                         var result = jQuery.parseJSON(data.d);
                         DisplayMissPunchGrid(result);
                     },
                     error: function (jqXHR, textStatus, errorThrown) {
                         console.log(jqXHR.responseText)
                     }
                 });
             });
        }
        else {
            $("#hdnRequestType").val("false");
        }

        $.ajax({
            type: "POST",
            url: 'Timeoffrequest.aspx/GetActiveProjects',
            data: "{}",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            async: false,
            success: function (result) {
                var projects = jQuery.parseJSON(result.d);
                $("#drpProject").empty();
                $("#drpProject").append($("<option>").val('').text("–Select Project–"));
                for (i in projects) {
                    $("#drpProject").append($('<option></option>').val(projects[i].projectID).html(projects[i].proName));
                }

            }
        })
    }).then(function () {
        $("#drpHours").empty();
        for (i = 0; i <= 23; i++) {
            $("#drpHours").append($('<option></option>').val(i).html(i));
        }
        $("#drpMinutes").empty();
        for (i = 0; i <= 59; i++) {
            $("#drpMinutes").append($('<option></option>').val(i).html(i));
        }

    }).then(function () {
        if ($("#ddlApprovalType option:selected").data('leavecategoryid')) {
            $("#hdnLeaveCategoryID").val($("#ddlApprovalType option:selected").data('leavecategoryid'));
            Display("FrmDateLeave", GetDate(Data.FromDate));
            Display("ToDateLeave", GetDate(Data.ToDate));
            Display("txtDetailsLeave", Data.ReasonForTimeOff);
            if (!Data.IsFullDay) {
                //$("input[name=ctl00$MainContent$rbtLeave][value=2]").prop('checked', true); it throws error in new design
                $('#rblLeaveCategory_1').prop('checked', true);
            }
            Display("rblLeaveCategorySub", $("#rblLeaveCategorySub").find("input[value=" + Data.HalfDayType + "]").prop("checked", true));
            ShowHideRadioCustomLeave();
        }
        else {

            $("#hdnLeaveCategoryID").val('');
        }

        if (Data.Minutes != undefined || Data.Minutes != 0) {
            var Time = Data.Minutes;
            var hours = Math.floor(Time / 60);
            var minutes = Time % 60;
            Display("drpHours", hours)
            Display("drpMinutes", minutes)
        }
        if (Data.FromDate != undefined) { Display("txtStartTime", Data.FromDate.split('T')[1].substring(0, Data.FromDate.split('T')[1].length - 3)); }
        if (Data.ToDate != undefined) { Display("txtEndTime", Data.ToDate.split('T')[1].substring(0, Data.ToDate.split('T')[1].length - 3)); }
        SetDatePickersAccordingToRequest();
        //$('#FrmDateMain').datetimepicker('update', Data.FromDate);
        //$('#ToDateMain').datetimepicker('update', Data.ToDate);
        Display("FrmDateMain", GetDate(Data.FromDate));
        Display("ToDateMain", GetDate(Data.ToDate));
        Display("rbtChangeShiftType", $("#rbtChangeShiftType").find("input[value=" + Data.ShiftChangeType + "]").prop("checked", true));
        Display("txtReason", Data.ReasonForTimeOff);
        Display("drpProject", Data.ProjectID);
        Display("drpNewShift", Data.NewShift == null ? 0 : Data.NewShift);
        Display("drpManager", Data.PmID);

        if (Data.IsWFH)
            $("#ChkWFH").prop("checked", true)
        else
            $("#ChkWFH").prop("checked", false)
        if (!Data.IsFullDay) {
            //$("input[name=ctl00$MainContent$rbtLeave][value=2]").prop('checked', true); it throws error in new design
            $('input[name="ctl00$MainContent$rbtLeave"][value="2"]').prop('checked', true);
        }
        Display("rbtHalf", $("#rbtHalf").find("input[value=" + Data.HalfDayType + "]").prop("checked", true));
        Display("txtAddress", Data.Addres);
        Display("txtContact", Data.ContactNo);
        if (!$("#ddlApprovalType option:selected").data('leavecategoryid')) {
            ShowHideRadio();
        }
    });
}
function Display(Element, Value) {
    $("#" + Element).val(Value);
}
function GetDate(CombinedDate) {
    if (CombinedDate != undefined) {
        var SplittedDate = CombinedDate.split('T')[0].split('-');
        return SplittedDate[1] + "/" + SplittedDate[2] + "/" + SplittedDate[0];
    }
}

function FillControls() {
    $.when(
    $.ajax({
        type: "POST",
        url: 'Timeoffrequest.aspx/GetActiveProjects',
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            var projects = jQuery.parseJSON(result.d);

            $("#drpProject").empty();
            $("#drpProject").append($("<option>").val('').text("–Select Project–"));
            for (i in projects) {
                $("#drpProject").append($('<option></option>').val(projects[i].projectID).html(projects[i].proName));
            }

        }
    })
    ).then(function () {
        $("#drpHours").empty();
        for (i = 0; i <= 23; i++) {
            $("#drpHours").append($('<option></option>').val(i).html(i));
        }

        $("#drpMinutes").empty();
        for (i = 0; i <= 59; i++) {
            $("#drpMinutes").append($('<option></option>').val(i).html(i));
        }
    });
}

// add this function because of in new design action menu displayed on td hover that's why image hover method can't be triggered
function SetHiddenField(td) {
    var lnkImg = $(td).children(0);
    if ($(lnkImg[0]).is(':disabled') == false) {
        $("#hdnID").val(lnkImg[0].parentElement.parentElement.children[0].children[0].innerHTML);
        $("#CurrentRequestName").val(lnkImg[0].parentElement.parentElement.children[1].innerHTML);
    }
};
function PopupInstance(lnk) {
    if (lnk != undefined) {
        $("#hdnID").val(lnk.parentElement.parentElement.children[0].children[0].innerHTML);
        $("#CurrentRequestName").val(lnk.parentElement.parentElement.children[1].innerHTML);
    }
    $(function () {
        //$(".popUpClass").hover(
        //                    //function () {
        //                    //    var offset, top, left;
        //                    //    var $this = $(this);
        //                    //    offset = $this.offset();
        //                    //    top = offset.top - 50;
        //                    //    top = (top > 0) ? top : 0;
        //                    //    left = offset.left + 20;
        //                    //    left = (left > 0) ? left : 0;
        //                    //    $(this).next(".popUpContainer").show().css({ top: top, left: left });

        //                    //    //    $(this).next(".popUpContainer").show() 
        //                    //},
        //                    function () { $(this).next(".popUpContainer").hide() }
        //             );

        //$(".popUpClassApprove").hover(
        //                    //function () {
        //                    //    var offset, top, left;
        //                    //    var $this = $(this);
        //                    //    offset = $this.offset();
        //                    //    top = offset.top - 60;
        //                    //    top = (top > 0) ? top : 0;
        //                    //    left = offset.left + 20;
        //                    //    left = (left > 0) ? left : 0;
        //                    //    $(this).next(".popUpContainer").show().css({ top: top, left: left });

        //                    //    //    $(this).next(".popUpContainer").show() 
        //                    //},
        //                    function () { $(this).next(".popUpContainer").hide() }
        //             );


        //$(".popUpClassTest").live().hover(
        //                    //function () {
        //                    //    var offset, top, left;
        //                    //    var $this = $(this);
        //                    //    offset = $this.offset();
        //                    //    top = offset.top - 20;
        //                    //    top = (top > 0) ? top : 0;
        //                    //    left = offset.left + 20;
        //                    //    left = (left > 0) ? left : 0;
        //                    //    //alert('hi');
        //                    //    $(this).next(".popUpContainer").show().css({ top: top, left: left });

        //                    //    //    $(this).next(".popUpContainer").show() 
        //                    //},
        //                    function () { $(this).next(".popUpContainer").hide() }
        //             );
        //$(".popUpContainer").hover(
        //                        function () { $(this).show() },
        //                        function () { $(this).hide() }

        //             );
    });
}
function ProcessMisspunch(MissPunchDate) {
    if (MissPunchDate == '') {
        $("#GvMisspunch").hide();
        $("#GvMisspunch").parent().parent().hide();
        $("#AddDetails").hide();
        $("#txtMissPunchDetails").hide();
        return false;
    }
    $.ajax({
        type: "POST",
        url: 'Timeoffrequest.aspx/GetDataForMissPunch',
        data: "{'MissPunchDate':'" + MissPunchDate + "'}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (data) {
            var result = jQuery.parseJSON(data.d);
            DisplayMissPunchGrid(result);
        }
    });
}
$(document).on('dp.show', function (e) {
    $(".glyphicon-time").trigger("click");
});

$(document).on('dp.change', function (e) {
    $(".glyphicon-time").trigger("click");
});
function GetSelectedDate() {
    if ($("#ddlApprovalType option:selected").val() == EnumType.PunchCard) {
        return moment($("#MainContent_UcMissPunchDate_txtToEventDate").val(), "MM/DD/YYYY");
    }
    else {
        var DateValue = $("#drpSuggestedDates option:selected").val();
        switch (DateValue) {
            case "0":
                return null;
                break;
            case "1":
                return moment($("#MainContent_UcMissPunchDate_txtToEventDate").val(), "MM/DD/YYYY");
                break;
            default:
                return moment($("#drpSuggestedDates option:selected").val(), "YYYY-MM-DD");
                break;
        }
    }
}
function DisplayMissPunchGrid(result) {
    $(".form-group").removeClass('has-error has-feedback');
    $("#GvMisspunch").find("tr:gt(0)").remove();
    $("#hdnMispunchCount").val(result.length);
    if ($("#ddlApprovalType option:selected").val() != EnumType.PunchCard) {
        $("#GvMisspunch").append("<tr id='trNoRecord'><td colspan='3' style=''>No Records Found</td></tr>");
    }

    if (result.length != 0 || $("#ddlApprovalType option:selected").val() == EnumType.PunchCard) {
        if (result.length != 0) {

            for (var i = 0; i < result.length; i++) {

                var InTime = result[i].InTime;
                var OutTime = result[i].OutTime;
                var IsDisabled = (result[i].AttendanceType != 0 && result[i].AttendanceType != "" && result[i].AttendanceType != null) ? "disabled" : "";
                var AttendanceType = result[i].AttendanceType == null ? 0 : result[i].AttendanceType;
                $("#trNoRecord").remove();
                $("#GvMisspunch").append("<tr data-AttendanceType=" + AttendanceType + "><td style='display:none;'>" + result[i].EmployeeInOutID + "</td><td style='text-align:center !important;'><input type='text' id='txtIntime" + i + "' name='txt' class='Time form-control' " + IsDisabled + "  style=''/></td><td  style='text-align:center !important;'><input type='text' id='txtOuttime" + i + "' name='txt' class='Time form-control' " + IsDisabled + " style=''/></td><td  style='text-align:center !important;'><img src='../Images/DeleteDisable.gif' class='dltdisable'/></td></tr>");
                var SelectedDate = $("#drpSuggestedDates").val() != "0" && $("#drpSuggestedDates").val() != "1" ? moment($("#drpSuggestedDates").val(), "YYYY-MM-DD") : moment($("#MainContent_UcMissPunchDate_txtToEventDate").val(), "MM/DD/YYYY");
                $("#txtIntime" + i).datetimepicker({
                    format: "MM/DD/YYYY HH:mm", icons: {
                        date: "fa fa-calendar"
                    }, defaultDate: InTime,
                    keyBinds: {
                        up: null,
                        down: null,
                        left: null,
                        right: null
                    }
                });
                $("#txtOuttime" + i).datetimepicker({
                    format: "MM/DD/YYYY HH:mm", icons: {

                        date: "fa fa-calendar"
                    }, defaultDate: OutTime,
                    keyBinds: {
                        up: null,
                        down: null,
                        left: null,
                        right: null
                    }
                });
                $("#txtOuttime" + i).on("mousedown keydown", function () {
                    //if ($(this).val() == "")
                    //    $(this).val(SelectedDate.format("MM/DD/YYYY hh:mm"));
                });
                $("#txtIntime" + i).on("mousedown keydown", function () {
                    //if ($(this).val() == "")
                    //    $(this).val(SelectedDate.format("MM/DD/YYYY hh:mm"));
                });
            }
        }
        $("#GvMisspunch").show();
        $("#GvMisspunch").parent().parent().show();
        $("#AddDetails").show();
        $("#IsContactNoRequired").show();
        $("#txtMissPunchDetails").show();
    }
    else {
        $("#GvMisspunch").show();
        $("#GvMisspunch").parent().parent().show();
        $("#txtMissPunchDetails").hide();
    }
    if ($("#ddlApprovalType option:selected").val() == EnumType.PunchCard && result.length == 0) {
        $("#AddDetails").trigger("click");
        $(".dltMisspunchRow").attr('src', '../Images/DeleteDisable.gif');
        $(".dltMisspunchRow").attr('class', 'dltdisable')
    }

    //$(".Time").datetimepicker({
    //    format: "MM/DD/YYYY HH:mm", icons: {

    //        date: "fa fa-calendar"
    //    }
    //});
}
function SetMenu() {
    $('#tblTimeoff tr').each(function () {
        var currentRow = $(this);
        var Date = currentRow.find('td:nth-child(3)').find('span').html();
        var RequestId = currentRow.find('td.hidden').find('span').html();
        var WFHAvailable, WOHAvailable;
        if (RequestId != null) {
            $.ajax({
                type: "POST",
                url: 'Timeoffrequest.aspx/GetRequestDetails',
                data: "{ 'RequestId' : '" + RequestId + "','Date' : '" + Date + "'}",
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                success: function (result) {

                    var status = result.d[0];
                    var TimesheetEntry = result.d[1];
                    var IsCancelled = result.d[2];
                    var IsLeave = result.d[3];

                    var IsshowAction = false;
                    if (status == "true") {
                        currentRow.find('li#idEdit').show();
                        IsshowAction = true;
                    }
                    else {
                        currentRow.find('li#idEdit').hide();
                    }

                    if (IsCancelled == "true") {
                        currentRow.find('li#idCancel').hide();
                    }
                    else {

                        currentRow.find('li#idCancel').show();
                        IsshowAction = true;
                    }

                    if (TimesheetEntry == "True") {
                        currentRow.find('li#idTimesheet').show();
                        IsshowAction = true;
                    }
                    else {
                        currentRow.find('li#idTimesheet').hide();
                    }

                    if (IsLeave == "True") {
                        currentRow.find('li#idViewDetails').show();
                        IsshowAction = true;
                    }
                    else {
                        currentRow.find('li#idViewDetails').hide();
                    }
                    if (!IsshowAction) {
                        currentRow.find(".caret").remove();
                        currentRow.find("i.fa-gears").addClass('fa-disable');
                        currentRow.find(".btn-lg").attr('data-toggle', '');
                    }
                    // 
                    //var CurrentUL = currentRow.find("ul.dropdown-menu");
                    //CurrentUL.find("li:visible").length > 0 ? CurrentUL.show() : CurrentUL.hide();
                }
            });
        }

    });
}

function sortSelect(elements) {
    var options = elements;
    var arr = options.map(function (_, o) { return { t: $(o).text(), v: o.value }; }).get();
    arr.sort(function (o1, o2) {
        var t1 = o1.t.trim().toLowerCase(), t2 = o2.t.trim().toLowerCase();

        return t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
    });
    options.each(function (i, o) {
        o.value = arr[i].v;
        $(o).text(arr[i].t);
    });
}

/*************** data table init **********/
function ValidateMaxMisspunch(FromDate) {
    Validate = true;
    var Date = FromDate + '_' + FromDate;
    var TimeoffReqId = $('#hdnID').val();
    if (TimeoffReqId == "" || TimeoffReqId == null) { TimeoffReqId = "0"; }
    if (Date != "_") {
        $.ajax({
            type: "POST",
            url: 'Timeoffrequest.aspx/CheckMaxLeaveApplicable',
            data: "{ 'ApprovalTypeID' : '" + parseInt($("#ddlApprovalType option:selected").val()) + "','Date':'" + Date + "','TimeOffRequestId':'" + parseInt(TimeoffReqId) + "'}",
            contentType: 'application/json; charset=utf-8',
            async: false,
            datatype: 'json',
            success: function (result) {
                if (result.d) {
                    $("#Div1").show();
                    $("#ulvErrorsPopup").append("<li>As per policy, Maximum limit has been reached for " + $("#ddlApprovalType option:selected").text() + "</li>");
                    Validate = false;
                }
            }
        });
    }
    return Validate;
}
function ViewLeaveDetails(element) {
    //$("#divPopup_ReqDetails").modal("show");
    var RequestId = $("#hdnID").val();
    $.ajax({
        type: "POST",
        url: "timeoffrequest.aspx/ViewRequest",
        data: '{"TimeOffRequestId":' + RequestId + '}',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        async: false,
        success: function (data) {
            //$('[id^=parentDiv_]').hide();
            var jsonResult = jQuery.parseJSON(data.d);

            //var reqFields = jsonResult.tblReqFields;
            var reqDetails = jsonResult.tblReqDetails;
            var objreqDetail = {};
            var childReq = [];
            var objChildRequestDetail = [];
            //viewRequestDetailModel.ChildRequestDetail.removeAll();
            //var index = 0;
            $('#tbodyChildReqtbl').empty();
            $('#divPriorityReq').hide();
            //$("#parentDiv_txtDetails").show();
            //$("#caption_txtDetails").text("Details :");
            var viewRequestDetailModel = new Object();
            for (var i = 0; i < reqDetails.length; i++) {
                var totalChildRequest = {};
                if (reqDetails[i].ParentID == 0 || reqDetails[i].ParentID == null) {

                    var hours = Math.floor(reqDetails[i].minutes / 60);
                    var min = (reqDetails[i].minutes % 60);
                    viewRequestDetailModel.FromDate = reqDetails[i].New_FromDate;
                    if (reqDetails[i].New_FromDate == null || reqDetails[i].New_FromDate == "")
                        viewRequestDetailModel.FromDate = "N/A";
                    viewRequestDetailModel.ToDate = reqDetails[0].New_ToDate;
                    if (reqDetails[i].New_ToDate == null || reqDetails[i].New_ToDate == "")
                        viewRequestDetailModel.ToDate = "N/A";
                    if (reqDetails[i].IsFullDay == true) {
                        $("#parentDiv_rbtHalf").hide();
                        viewRequestDetailModel.IsFullDay = "Full Day";
                    }
                    else {
                        viewRequestDetailModel.IsFullDay = "Half Day";
                        if (reqDetails[i].HalfDayType == 1) {
                            viewRequestDetailModel.HalfDayType = "First Half";
                            $("#parentDiv_rbtHalf").show();
                        }
                        else {
                            viewRequestDetailModel.HalfDayType = "Second Half";
                            $("#parentDiv_rbtHalf").show();
                        }
                    }



                    if (reqDetails[i].ContactNo == null || reqDetails[i].ContactNo == "")
                        viewRequestDetailModel.contact = "N/A";
                    else
                        viewRequestDetailModel.contact = reqDetails[i].ContactNo;

                    if (reqDetails[i].Addres == null || reqDetails[i].Addres == "")
                        viewRequestDetailModel.Address = "N/A";
                    else
                        viewRequestDetailModel.Address = reqDetails[i].Addres;



                    if (reqDetails[i].Details == null || reqDetails[i].Details == "")
                        viewRequestDetailModel.Details = "N/A";
                    else
                        viewRequestDetailModel.Details = reqDetails[i].Details;

                    //viewRequestDetailModel.CompOff = reqDetails[0].New_CompOffDate;
                    viewRequestDetailModel.NoOfDay = reqDetails[i].NoOfDays;

                    viewRequestDetailModel.Hours = hours;
                    viewRequestDetailModel.Mins = min;

                    //viewRequestDetailModel.WorkedDate = reqDetails[0].New_WorkDate;
                    //viewRequestDetailModel.ODDate = reqDetails[0].New_ODDate;
                    if (reqDetails[i].ReasonForTimeOff == null || reqDetails[i].ReasonForTimeOff == "")
                        viewRequestDetailModel.Reason = "N/A";
                    else
                        viewRequestDetailModel.Reason = reqDetails[i].ReasonForTimeOff;

                    viewRequestDetailModel.StartTime = reqDetails[0].StartTime;
                    if (reqDetails[i].StartTime == null || reqDetails[i].StartTime == "")
                        viewRequestDetailModel.StartTime = "N/A";
                    viewRequestDetailModel.EndTime = reqDetails[0].EndTime;
                    if (reqDetails[i].EndTime == null || reqDetails[i].EndTime == "")
                        viewRequestDetailModel.EndTime = "N/A";
                    viewRequestDetailModel.ProjectName = reqDetails[i].ProjectName;
                    if (reqDetails[i].ProjectName == null || reqDetails[i].ProjectName == "")
                        viewRequestDetailModel.ProjectName = "N/A";
                    if (reqDetails[i].HalfDayType == null || reqDetails[i].HalfDayType == "")
                        viewRequestDetailModel.HalfDayType = "N/A";
                    viewRequestDetailModel.ReqAppliedFor = reqDetails[i].ApprovalType;

                    viewRequestDetailModel.Shift = reqDetails[i].Shift == null ? "N/A" : reqDetails[i].Shift;
                    viewRequestDetailModel.ShiftChangeType = reqDetails[i].ShiftChangeType == "1" ? "Temporary" : "Parmenant";
                }
                else {
                    $('#divPriorityReq').show();
                    var childReqFromDate = moment(reqDetails[i].FromDate).format('DD/MM/YYYY');
                    var childReqToDate = moment(reqDetails[i].ToDate).format('DD/MM/YYYY');

                    $('#tbodyChildReqtbl').append('<tr><td>' + reqDetails[i].ApprovalType + '</td><td class="ClsDays">' + reqDetails[i].NoOfDays + '</td><td>' + childReqFromDate + '</td><td>' + childReqToDate + '</td></tr>')
                }
            }
            var seen = {};
            $('#tbodyChildReqtbl tr').each(function () {
                var MatchedRows = true;

                var currentrow = $(this);
                var NextRow = $(this).next();
                if ($(currentrow).find('td:eq(0)').html() != $(NextRow).find('td:eq(0)').html() || $(currentrow).find('td:eq(1)').html() != $(NextRow).find('td:eq(1)').html() || $(currentrow).find('td:eq(2)').html() != $(NextRow).find('td:eq(2)').html() || $(currentrow).find('td:eq(3)').html() != $(NextRow).find('td:eq(3)').html()) {
                    MatchedRows = false;
                }
                if (MatchedRows) {
                    $(this).next().remove();
                    $(this).find('td.ClsDays').text((parseFloat($(this).find('td.ClsDays').text()) * 2));
                }
            });
            setValuesForViewDetails(viewRequestDetailModel)
            $("#divPopup_ReqDetails").modal("show");

            //ko.applyBindings(viewRequestDetailModel, document.getElementById("divPopup_ReqDetails"));

            //for (var i = 0; i < reqFields.length; i++) {

            //    if (ReqId != EnumType.Leave || reqFields[i].UIID != "rbtLeave") {
            //        var UI_id = reqFields[i].UIID;
            //        var Caption = reqFields[i].Caption;

            //        showControl(UI_id, Caption);
            //    }
            //}
        },
        error: function (data) {
        }
    });

}
//function showControl(UI_id, Caption, value) {

//    $("#parentDiv_" + UI_id).show();

//    $("#parentDiv_MainContent_ucFromDate_divCalenderPopup").show();
//    $("#parentDiv_MainContent_ucToDate_divCalenderPopup").show();

//    $("#caption_MainContent_ucFromDate_divCalenderPopup").text("From Date :");
//    $("#caption_MainContent_ucToDate_divCalenderPopup").text("To Date :");
//    if (UI_id != "MainContent_ucFromDate_divCalenderPopup" && UI_id != "MainContent_ucToDate_divCalenderPopup") {
//        $("#caption_" + UI_id).text(Caption);
//    }
//    if (UI_id == "DivCustomLeave")
//        $(".parentDiv_" + UI_id).show();
//    else
//        $(".parentDiv_DivCustomLeave").hide();
//}

function setValuesForViewDetails(model) {
    $('#ReqAppliedFor').html(model.ReqAppliedFor)
    $('#NoOfDays').html(model.NoOfDay)
    $('#FrmDateMain_Details').html(model.FromDate)
    $('#ToDateMain_Details').html(model.ToDate)
    $('#rbtLeave_Full').html(model.IsFullDay)
    $('#lbl_rbtnHalf').html(model.HalfDayType)
    $('#txtContact_Details').html(model.contact)
    $('#txtAddress_Details').html(model.Address)
    $('#txtReason_Details').html(model.Reason)
}
function resetValuesForViewDetails() {
    $('#ReqAppliedFor').html('')
    $('#NoOfDays').html('')
    $('#FrmDateMain_Details').html('')
    $('#ToDateMain_Details').html('')
    $('#rbtLeave_Full').html('')
    $('#lbl_rbtnHalf').html('')
    $('#txtContact_Details').html('')
    $('#txtAddress_Details').html('')
    $('#txtReason_Details').html('')
    $('#tbodyChildReqtbl').empty();
}




