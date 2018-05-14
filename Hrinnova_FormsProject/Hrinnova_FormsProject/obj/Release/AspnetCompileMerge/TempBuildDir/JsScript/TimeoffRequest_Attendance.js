EnumType = { Leave: '1', MissPunch: '12', CompOff: '11', OutDoorDuty: '13', WorkOnHoliday: '3', WorkFromHome: '2' };
$(document).ready(function () {

    $(".timerequest-popup-inner").mCustomScrollbar({
        callbacks: {
            onScrollStart: function () {
                $('#txtStartTime').timepicker('hide')
                $('#txtEndTime').timepicker('hide');
                $('.Time').timepicker('hide');
            }
        }
    });


    $("#txtFromDate").datepicker({
        changeMonth: true,
        changeYear: true,
        showWeek: false,
        firstDay: 0,
        showOn: "button",
        buttonImage: "../Images/datepicker.gif",
        buttonImageOnly: true,
        dateFormat: 'mm/dd/yy',
        buttonText: ""
    });
    $("#txtToDate").datepicker({
        changeMonth: true,
        changeYear: true,
        showWeek: false,
        firstDay: 0,
        showOn: "button",
        buttonImage: "../Images/datepicker.gif",
        buttonImageOnly: true,
        dateFormat: 'mm/dd/yy',
        buttonText: ""
    });

    sortSelect($('#drpStatus option'));

    var Configuration;
    var Required = true;
    var Validate = true;
    var overlayOpacityNormal = 0.3, overlayOpacitySpecial = 0.3;

    var ApprovalType;
    PopupInstance();
    setStartEndDate();    


    /*ViewModels*/
   



    
    $("#btnReset").click(function () {
        GetRequests();
        $("#ulVs").empty();
        $("#lblMessage").html('').removeClass('alert alert-success');
        setStartEndDate();

    });
    $('#txtStartTime').timepicker({
        minutes: { starts: 0, interval: 1 },
        showPeriodLabels: false,
        defaultTime: ''
    });

    $("#txtStartTime").keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57) && e.which != 58) {
            return false;
        }
    });
    $('#txtEndTime').timepicker({
        minutes: { starts: 0, interval: 1 },
        showPeriodLabels: false,
        defaultTime: ''
    });

    $("#txtEndTime").keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57) && e.which != 58) {
            return false;
        }
    });

  
    /*On page load*/
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
            select.append($("<option>").val(0).text("-Select Request Type-"));
            var count = Object.keys(result.dtTypes).length;
            for (var i = 0; i < count; i++) {
                select.append(
                 $('<option></option>').val(result.dtTypes[i].ApprovalTypeId).html(result.dtTypes[i].ApprovalType)
                );
            }

            sortSelect($('#drpRequestType option'));
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

  

    $("#btnSave").click(function (e) {

        var IsValidSession = false;
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
        if ($("#hdnRequestType").val() == "true") {
            //Request is for mispunch
            $("#ulvErrorsPopup").empty();
            if ($("#GvMisspunch tbody").children('tr').children('td').length <= 1) {
                $("#ulvErrorsPopup").append("<li>There are no records to store. Please select another date.</li>");
                //e.preventPropagation();
                return false;
            }
            if ($("#MainContent_UcMissPunchDate_txtToEventDate").val() == moment().format("MM/DD/YYYY")) {
                $("#ulvErrorsPopup").append("<li>Misspunch for the same day is not allowed</li>");
                //e.preventPropagation();
                return false;
            }
            if ($("#drpManager").val() == '0') {
                $("#ulvErrorsPopup").append("<li>Please select Manager</li>");
                //e.preventPropagation();
                return false;
            }

            $('input[type="text"].Time').each(function (e) {
                if ($(this).val() == "" || $(this).val().indexOf(':') == -1 || moment($(this).val(), "hh:mm").isValid() == false) {
                    $("#ulvErrorsPopup").append("<li>Please enter proper values for time.</li>");
                    //e.preventPropagation();
                    return false;
                }
            });

            $('#GvMisspunch tr:gt(0)').each(function (Index) {
                var CurrentInTime = moment($(this).find('td:nth-child(2)').find('.Time').val(), "hh:mm");
                var OutTime = moment($(this).find('td:nth-child(3)').find('.Time').val(), "hh:mm");
                var NextInTime = moment($(this).next('tr').find('td:nth-child(2)').find('.Time').val(), "hh:mm");
                if (OutTime != null && NextInTime != null && moment(NextInTime, "hh:mm").isValid() && NextInTime < OutTime) {
                    $("#ulvErrorsPopup").append("<li>In Time can not be less than last Out Time.</li>");
                    //e.preventPropagation();
                    return false;
                }
                if (CurrentInTime > OutTime) {
                    $("#ulvErrorsPopup").append("<li>In Time can not be greater than Out Time.</li>");
                    //e.preventPropagation();
                    return false;
                }
            });
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
                InOutTimings.EmpInOutID = $(this).find('td:nth-child(1)').html();
                Timings.push(InOutTimings);
            });

            var MissPunchData = "{TimeoffRequestModel:" + JSON.stringify(TimeoffRequestModel) + ",InOutTimings:" + JSON.stringify(Timings) + ",IsEdit:" + $("#hdnIsMissPunchEdit").val() + "}";
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
                        $("#ulvErrorsPopup").append("<li>A request has already been applied for the same date</li>");
                    }
                    else {
                        $("#divOtherDate").hide();
                        $("#MainContent_UcMissPunchDate_txtToEventDate").val('');
                        $("#AddDetails").hide();
                        $("#GvMisspunch").find("tr:gt(0)").remove();
                        $("#GvMisspunch").hide();
                        $("#txtMissPunchDetails").hide();

                        if (TimeOffRequestID != "" && ApprovalType != "") {
                            GenerateEmail(TimeOffRequestID, ApprovalType, IsUpdate);
                        }
                        clearForm();
                        //GetRequests();
                        if (IsUpdate != "false")
                            $("#lblMessage").html('Request has been updated successfully').addClass('alert alert-success');
                        else
                            $("#lblMessage").html('Request has been saved successfully').addClass('alert alert-success');
                        $("#popup-content").dialog('close');
                    }
                }
            });
        }
        else {
            //Request is other than mispunch    

            if ($("#drpManager").val() == '0') {
                $("#ulvErrorsPopup").append("<li>Please select Manager</li>");
                e.preventPropagation();
                return false;
            }
            var Type = $("#ddlApprovalType option:selected").val();

            $.ajax({
                type: "POST",
                url: 'Timeoffrequest.aspx/GetValidationConfiguration',
                data: "{ 'Type' : '" + Type + "'}",
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                success: function (result) {
                    Configuration = jQuery.parseJSON(result.d);
                    $("#ulvErrorsPopup").empty();
                    $.when(
                    RequiredValidation(Configuration["Required"])
                    ).done(function () {

                        ValidateValidation(Configuration["Validate"]);
                    }).then(function () {
                        if (Required && Validate) {

                            SubmitRequest();
                        }
                    });
                }
            });

        }

        if ($("#ulvErrorsPopup").length > 0) {
            setTimeout(scroolTop, 200);
        }

    });

    function scroolTop() {
        $('.mCustomScrollbar').mCustomScrollbar("update");
        $(".mCustomScrollbar").mCustomScrollbar("scrollTo", "top");
    }

    $("#btnNotConfirm").on("click", function () {
        $(this).closest("#divconfirm").dialog('close');
    });
    $("#btnCloseRequest").on("click", function () {
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
        $("#txtMissPunchDetails").hide();
        $(this).closest("#popup-content").dialog('close');
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
                $("#divconfirm").dialog('close');

            }
        })).then(function () {
            GetRequests();
            $("#lblMessage").html('Request has been cancelled successfully').addClass('alert alert-success');
        });
    });
    $("#ddlApprovalType").change(function () {
        $("#GvMisspunch").hide();
        $("#ChkWFH").prop("checked", false);
        $("#ulvErrorsPopup").empty();
        if ($("#ddlApprovalType option:selected").val() == EnumType.MissPunch) {
            $("#hdnIsMissPunchEdit").val("false");
            //ProcessMisspunch();
            $("#divOtherDate").hide();
            GetMissPunchDates();
            $("#hdnRequestType").val("true");
        }
        else {
            //$("#GvMisspunch").hide();
            $("#AddDetails").hide();
            //$("#DivMisPunchSuggesions").hide();   
            //$("#divOtherDate").hide();           
            $("#hdnRequestType").val("false");
            $("#txtMissPunchDetails").hide();
        }
        MakeRequest();
    });
    $("#rbtLeave").on("click", function () {
        ShowHideRadio();
    });
    $("#btnCancel").on("click", function () {
        $('#selection').fadeOut('fast', function () {
            $("#ulVs").empty();
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

                    $("#ulvErrorsPopup").append("<li>" + RequiredObj[i].RequiredMessage + "</li>");
                }
            }
            else if ($("#" + RequiredObj[i].UIID).is('select') && $("#" + RequiredObj[i].UIID + " option:selected").val() == 0) {
                Required = false;

                $("#ulvErrorsPopup").append("<li>" + RequiredObj[i].RequiredMessage + "</li>");
            }
            else if (!$('#' + RequiredObj[i].UIID).is(':radio') && $.trim($("#" + RequiredObj[i].UIID).val()) == "") {

                Required = false;

                $("#ulvErrorsPopup").append("<li>" + RequiredObj[i].RequiredMessage + "</li>");
            }
        }
        if ($("#drpManager").val() == '0') {
            $("#ulvErrorsPopup").append("<li>Please select Manager</li>");
            Required = false;
        }

    }
    function ValidateValidation(ValidateObj) {

        Validate = true;
        var Holiday = false;
        var IsEntryExist = "false";
        var IsRange = false;
        var FromDate = GetValue("MainContent_ucFromDate_txtToEventDate");
        var ToDate = GetValue("MainContent_ucToDate_txtToEventDate");
        var CompOffDate = GetValue("MainContent_UcCompOff_txtToEventDate");
        var WorkedDate = GetValue("MainContent_UcWorkedOn_txtToEventDate");
        var ODDate = GetValue("MainContent_ucODDate_txtToEventDate");
        var ApprovalType = $("#ddlApprovalType").val();
        var DateTocheckHoliday;


        if (FromDate != "") {
            var IsValidFromDate = moment(FromDate, "MM/DD/yyyy").isValid();
            if (IsValidFromDate == false) {
                Validate = false;
                $("#ulvErrorsPopup").append("<li>Please select valid From Date</li>");
                return false;
            }
        }
        if (ToDate != "") {
            var IsValidToDate = moment(ToDate, "MM/DD/yyyy").isValid();
            if (IsValidToDate == false) {
                Validate = false;
                $("#ulvErrorsPopup").append("<li>Please select valid To Date</li>");
                return false;
            }
        }
        if (CompOffDate != "") {
            var IsValidCompOffDate = moment(CompOffDate, "MM/DD/yyyy").isValid();
            if (IsValidCompOffDate == false) {
                Validate = false;
                $("#ulvErrorsPopup").append("<li>Please select valid Compoff date</li>");
                return false;
            }
        }
        if (WorkedDate != "") {
            var IsValidWorkedDate = moment(WorkedDate, "MM/DD/yyyy").isValid();
            if (IsValidWorkedDate == false) {
                Validate = false;
                $("#ulvErrorsPopup").append("<li>Please select valid Worked date</li>");
                return false;
            }
        }
        if (ODDate != "") {
            var IsValidODDate = moment(ODDate, "MM/DD/yyyy").isValid();
            if (IsValidODDate == false) {
                Validate = false;
                $("#ulvErrorsPopup").append("<li>Please select valid date</li>");
                return false;
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
                        DateTocheckHoliday = ODDate;
                        break;
                    case EnumType.WorkFromHome:
                        IsRange = false;
                        //DateTocheckHoliday = FromDate + '_' + ToDate;
                        DateTocheckHoliday = ODDate;
                        break;
                    case EnumType.WorkOnHoliday:
                        DateTocheckHoliday = FromDate;
                        break;
                    case EnumType.CompOff:
                        IsRange = false;
                        DateTocheckHoliday = CompOffDate;
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
                            $("#ulvErrorsPopup").append("<li>From Date/To Date should not be holiday</li>");
                        }
                        break;
                    case EnumType.OutDoorDuty:
                        if (Holiday == "True" || IsEntryExist == "False") {
                            Validate = false;
                            $("#ulvErrorsPopup").append("<li>Outdoor Duty is not allowed on this date</li>");
                        }
                        break;
                    case EnumType.CompOff:
                        if (Holiday != "True") {
                            Validate = false;
                            $("#ulvErrorsPopup").append("<li>Comp Off date should not be on working day</li>");
                        }
                        break;
                    case EnumType.WorkFromHome:
                        if (Holiday == "True") {
                            Validate = false;
                            $("#ulvErrorsPopup").append("<li>Work From Home should not be on holiday</li>");
                        }
                        break;
                    case EnumType.WorkOnHoliday:
                        if (Holiday != "True") {
                            Validate = false;
                            $("#ulvErrorsPopup").append("<li>Work On Holiday should not be on working day</li>");
                        }
                        break;
                    default:
                        break;
                }

                if (ApprovalType == EnumType.OutDoorDuty) {


                }
            }
            if (ApprovalType == EnumType.CompOff) {
                $.ajax({
                    type: "POST",
                    url: 'Timeoffrequest.aspx/CheckForWorkDateHoliday',
                    data: "{ 'Date' : '" + WorkedDate + "','IsRange':'" + false + "','RequestType':'" + ApprovalType + "'}",
                    contentType: 'application/json; charset=utf-8',
                    async: false,
                    datatype: 'json',
                    success: function (result) {
                        Holiday = result.d;
                    }
                });
                if (Holiday == "True") {
                    Validate = false;
                    $("#ulvErrorsPopup").append("<li>Work On Date should not be Holiday</li>");
                }
            }
        }


        var differance = moment(ToDate, "MM/DD/yyyy") - moment(FromDate, "MM/DD/yyyy");

        if (FromDate != null && ToDate != null && moment(FromDate, "MM/DD/yyyy").isValid() && moment(ToDate, "MM/DD/yyyy").isValid() && new Date(ToDate) < new Date(FromDate)) {
            Validate = false;
            $("#ulvErrorsPopup").append("<li>From Date should be less than or Equal to To Date</li>");
        }
        if ($("#rbtLeave").find(":checked").val() == '2' && $("#MainContent_ucFromDate_txtToEventDate").val() != $("#MainContent_ucToDate_txtToEventDate").val()) {
            Validate = false;
            $("#ulvErrorsPopup").append("<li>For Half Day, Dates should be same</li>");
        }

        for (var i = 0; i < ValidateObj.length; i++) {
            if (ValidateObj[i].UIID.toLowerCase().indexOf("maincontent_uc") >= 0) {
                var TextBoxID = ValidateObj[i].UIID.replace("divCalenderPopup", "txtToEventDate");
                if (IsValidDate(TextBoxID) == false) {
                    Validate = false;
                    $("#ulvErrorsPopup").append("<li>" + ValidateObj[i].ValidationMessage + "</li>");
                }
            }
            if (ValidateObj[i].UIID.indexOf("Contact") >= 0) {
                if (!(/^[0-9]+$/.test($("#" + ValidateObj[i].UIID).val())) && $.trim($("#" + ValidateObj[i].UIID).val()) != "") {
                    Validate = false;
                    $("#ulvErrorsPopup").append("<li>" + ValidateObj[i].ValidationMessage + "</li>");
                }
            }

            if (ValidateObj[i].UIID.indexOf("EndTime") >= 0 || ValidateObj[i].UIID.indexOf("StartTime") >= 0) {

                if ($("#" + ValidateObj[i].UIID).val().indexOf(':') == -1 || moment($("#" + ValidateObj[i].UIID).val(), "hh:mm").isValid() == false) {
                    Validate = false;
                    $("#ulvErrorsPopup").append("<li>" + ValidateObj[i].ValidationMessage + "</li>");
                }

            }
            if (i == ValidateObj.length - 1 && Validate == true && $("#ddlApprovalType option:selected").val() == EnumType.OutDoorDuty) {

                var StartTime = moment($("#txtStartTime").val(), "hh:mm");
                var EndTime = moment($("#txtEndTime").val(), "hh:mm");
                if (StartTime > EndTime) {
                    Validate = false;
                    $("#ulvErrorsPopup").append("<li>Start Time can not be greater than End Time</li>");
                }
            }
            if ($("#ddlApprovalType option:selected").val() == EnumType.CompOff && $('#MainContent_UcCompOff_txtToEventDate').val() == $('#MainContent_UcWorkedOn_txtToEventDate').val() && $('#MainContent_UcCompOff_txtToEventDate').val() != '' && $('#MainContent_UcWorkedOn_txtToEventDate').val() != '') {
                Validate = false;
                $("#ulvErrorsPopup").append("<li>Worked date can not be same as Comp off date</li>");
            }
        }

        //var sendData = "{FromDate:" + FromDate + ",ToDate:" + ToDate + ",CompOffDate:" + CompOffDate + ",WorkedDate:" + WorkedDate + ",ODDate:" + ODDate + ",ApprovalType:" + ApprovalType + "}";
        //var sendData = "{ODDate:" + ODDate + "}";
        //var sendData = '{"FromDate":"' + FromDate + '","ToDate":"' + ToDate + '","CompOffDate:"' + CompOffDate + '","WorkedDate:"' + WorkedDate + '","ODDate:"' + ODDate + '","ApprovalType:"' + ApprovalType + '"}'
        //$.ajax({
        //    type: "POST",
        //    url: 'Timeoffrequest.aspx/ValidDuplicateRequest',
        //    data:sendData,
        //    contentType: 'application/json; charset=utf-8',
        //    datatype: 'json',
        //    success: function (result) {
        //    },
        //    error: function (result) {
        //    }
        //});
    }

    function SubmitRequest() {

        var TimeoffRequestModel = {};
        //TimeoffRequestModel.RequestId = GetValue("hdnID");
        TimeoffRequestModel.RequestId = parseInt(GetValue("hdnID") == '' ? 0 : GetValue("hdnID"));
        TimeoffRequestModel.ProjectID = GetValue("drpProject");
        if ($("#rbtLeave").is(":visible")) {
            TimeoffRequestModel.Leave = $("#rbtLeave").find(":checked").val();
            if ($("#rbtLeave").find(":checked").val() == '2') {
                if (GetValue("MainContent_ucFromDate_txtToEventDate") != GetValue("MainContent_ucToDate_txtToEventDate")) {
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
            TimeoffRequestModel.FromDate = GetValue("txtStartTime");
            TimeoffRequestModel.ToDate = GetValue("txtEndTime");
            var Duration = moment.utc(moment(GetValue("txtEndTime"), "HH:mm").diff(moment(GetValue("txtStartTime"), "HH:mm"))).format("HH:mm");
            var Hours = Duration.split(":")[0];
            var Minutes = Duration.split(":")[1];
            TimeoffRequestModel.Minutes = (parseInt(Hours * 60) + parseInt(Minutes));
        }
        else {
            TimeoffRequestModel.FromDate = GetValue("MainContent_ucFromDate_txtToEventDate");
            TimeoffRequestModel.ToDate = GetValue("MainContent_ucToDate_txtToEventDate");
            TimeoffRequestModel.Minutes = (parseInt(GetValue("drpHours") * 60) + parseInt(GetValue("drpMinutes")));
        }
        TimeoffRequestModel.CompOffDate = GetValue("MainContent_UcCompOff_txtToEventDate");
        TimeoffRequestModel.WorkedDate = GetValue("MainContent_UcWorkedOn_txtToEventDate");
        TimeoffRequestModel.ODDate = GetValue("MainContent_ucODDate_txtToEventDate");
        TimeoffRequestModel.ContactNo = GetValue("txtContact");
        TimeoffRequestModel.PmID = GetValue("drpManager");
        TimeoffRequestModel.Address = GetValue("txtAddress");
        TimeoffRequestModel.Details = GetValue("txtDetails");
        TimeoffRequestModel.Reason = GetValue("txtReason");
        TimeoffRequestModel.IsWFH = $("#ChkWFH").is(":checked");
        TimeoffRequestModel.ApprovalTypeId = $("#ddlApprovalType  option:selected").val();
        var TimeoffRequestModel = "{TimeoffRequestModel:" + JSON.stringify(TimeoffRequestModel) + "}";
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

                    $("#ulvErrorsPopup").append("<li>A request has already been applied for the same date</li>");
                }
                else {
                    var TimeOffRequestID = result.d[0];
                    ApprovalType = result.d[1];

                    if (TimeOffRequestID != null && ApprovalType != null) {
                        GenerateEmail(TimeOffRequestID, ApprovalType, IsUpdate);
                    }
                    clearForm();
                    BindEmpRecords();
                    $("#popup-content").dialog('close');
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
        if (ApprovalType == EnumType.MissPunch) {
            var myDiv = jQuery('#EmailDiv').find('#MPDiv').detach();
            myDiv.appendTo(jQuery('#EmailDiv').find('table:first'));
            // jQuery('#EmailDiv').find('#MPDiv').appendTo(jQuery('#EmailDiv').find('div.Override > table:first-child'))
            //MailBody=jQuery('#EmailDiv').find('MissPunchDetails').appendTo(jQuery('#EmailDiv').find('table:first'));       
        }
        MailBody = $('#EmailDiv').html().replace(/\s{2,}/g, ' ');
        $.ajax({
            type: "POST",
            url: 'Timeoffrequest.aspx/SendMail',
            data: "{'MailBody':'" + MailBody + "','TimeOffRequestID':'" + TimeOffRequestID + "','IsUpdate':'" + IsUpdate + "'}",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (data) {

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

        var DateValue = $("#drpSuggestedDates option:selected").val();
        switch (DateValue) {
            case "0":
                $("#divOtherDate").hide();
                $("#MainContent_UcMissPunchDate_txtToEventDate").val('');
                $("#AddDetails").hide();
                $("#GvMisspunch").find("tr:gt(0)").remove();
                $("#GvMisspunch").hide();
                $("#txtMissPunchDetails").hide();
                return false;
                break;
            case "1":
                $("#divOtherDate").show();
                $("#MainContent_UcMissPunchDate_txtToEventDate").val('');
                $("#AddDetails").hide();
                $("#GvMisspunch").hide();
                $("#txtMissPunchDetails").hide();

                break;
            default:
                $("#divOtherDate").hide();
                ProcessMisspunch(DateValue);
        }
    });
    $("#MainContent_UcMissPunchDate_txtToEventDate").on("change", function () {
        $("#ulvErrorsPopup").empty();
        if (!IsValidDate("MainContent_UcMissPunchDate_txtToEventDate")) {
            $("#GvMisspunch").find("tr:gt(0)").remove();
            $("#GvMisspunch").append("<tr><td colspan='3' style='padding-left:15px;'>No Records Found</td></tr>");
            $("#ulvErrorsPopup").append("<li>Please Enter Valid Date</li>");
            return false;
        }
        var DateValue = $("#MainContent_UcMissPunchDate_txtToEventDate").val();
        ProcessMisspunch(DateValue);
    });


    $("#AddDetails").click(function () {
        if ($("#hdnMispunchCount").val() == "0") {
            $("#ulvErrorsPopup").append("<li>You can not add details for this date</li>");
            return false;
        }
        $("#ulvErrorsPopup").empty();
        $("#GvMisspunch").append("<tr><td style='display:none;'>0</td><td  style='text-align:center;'><input type='text' name='txt' class='Time' style='width:50px;'/></td><td  style='text-align:center;'><input type='text'  name='txt' class='Time' style='width:50px;'/></td><td  style='text-align:center;'><img src='../Images/Delete.png' class='dltMisspunchRow' style='cursor:pointer;'/></td></tr>");
        $(".Time").keypress(function (e) {
            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57) && e.which != 58) {
                return false;
            }
        });
        $(".dltMisspunchRow").click(function () {
            $(this).closest('tr').remove();
        });

        $('.Time').timepicker({
            minutes: { interval: 1 },
            showPeriodLabels: false,
            defaultTime: ''
        });


    });
    $(document).on("click", '.sortField', function (e) {
        var sortExpression;
        var sortField = $(this).text().trim();
        if (sortField == "Date")
            sortExpression = "Date1";
        else if (sortField == "From Date") {
            sortExpression = "FromDateForSort";
        }
        else if (sortField == "To Date") {
            sortExpression = "ToDateForSort";
        }
        else
            sortExpression = "ApprovalType";
        //$('form select').val("");

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
        $.when(
             $.ajax({
                 type: "POST",
                 url: 'Timeoffrequest.aspx/GetRequestsBySortType',
                 data: JSON.stringify({ Filters: Filters, sortExpression: sortExpression }),
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
            var $pager = $('<div class="pager"></div>');
            //Bind PageNumber
            $(".page-number").remove();
            for (var page = 0; page < numPages; page++) {
                if (numPages > 1) {
                    $('<span class="page-number"></span>').append($("<a></a>").text(page + 1)).bind('click', {
                        newPage: page
                    }, function (event) {
                        currentPage = event.data['newPage'];
                        $table.trigger('repaginate');


                        $(this).addClass('active').siblings().removeClass('active');
                    }).appendTo($pager).addClass('clickable');
                }

            }
            $pager.insertAfter($table).find('span.page-number:first').addClass('active');

        });
    }

});

function MakeRequest() {   
    var Type = $("#ddlApprovalType option:selected").val();
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

        $("#popup-content").dialog({
            title: $("#ddlApprovalType option:selected").text(),
            width: 500,
            height: 400,
            resizable: false,
            draggable: false,
            show: {
                effect: "fade",
                duration: 150
            },
            hide: {
                effect: "fade",
                duration: 150
            },
            open: function () {
                overlayOpacityNormal = $('.ui-widget-overlay').css('opacity');
                // $('.ui-widget-overlay').css({ 'opacity': overlayOpacitySpecial });

                $(".ui-dialog-titlebar").append("");
                $('#NewCloseIcon').on('click', function () {
                    $("#popup-content").dialog('close');
                });
            },
            beforeClose: function () {
                $('.ui-widget-overlay').css('opacity', overlayOpacityNormal);
                $(".ui-dialog-titlebar").find('img').remove();
            },
            draggable: false,
            resize: "auto",
            modal: true,
            dialogClass: 'no-close success-dialog',

        })
    });
}
function ShowHideRadio() {

    if ($("#rbtLeave input:checked").val() == "2") {
        $("#rbtHalf").css("display", "block");
    }
    else {
        $("#rbtHalf").css("display", "none");
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

    ShowHideRadio();
    //setStartEndDate();

}


function GetValue(id) {
    return $("#" + id).val();
}

function ShowHideControls(ToShow, ToHide) {

    $('.rqspan').remove();
    for (var i = 0; i < ToShow.length; i++) {

        $("#" + ToShow[i].UIID).show();
        $("." + ToShow[i].UIID).show().html(ToShow[i].Caption);
        $("." + ToShow[i].UIID).closest('.DvMain').addClass('form-group');

        if (ToShow[i].IsMandatory)
            $("<span style='color:red;' class='rqspan'>*</span>").insertAfter("." + ToShow[i].UIID);


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
        $("#" + ToHide[i].UIID).hide();
        $("." + ToHide[i].UIID).closest('.DvMain').removeClass('form-group');
        $("." + ToHide[i].UIID).removeClass('form-group');
        $("." + ToHide[i].UIID).hide();
    }
}

function CancelRequest() {
    $("#rqType").html($("#CurrentRequestName").val());
    $("#divconfirm").dialog({
        title: "Cancel Request",
        width: 300,
        show: {
            effect: "fade",
            duration: 300
        },
        hide: {
            effect: "fade",
            duration: 300
        },
        height: 200,
        draggable: false,
        resizable: false,
        position: { my: 'top', at: 'top+250' },
        modal: true,
        dialogClass: 'no-close success-dialog'
    });
    return false;
}

function EditRequest() {
    clearForm();
    $("#ulvErrorsPopup").empty();
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
        }
    });
    $("#popup-content").dialog({
        title: "Edit Request",
        width: 500,
        show: {
            effect: "fade",
            duration: 150
        },
        hide: {
            effect: "fade",
            duration: 150
        },
        open: function () {
            overlayOpacityNormal = $('.ui-widget-overlay').css('opacity');
            //$('.ui-widget-overlay').css({ 'opacity': overlayOpacitySpecial });


            $(".ui-dialog-titlebar").append("<img src='../Images/CloseButton_Dialogue.png' id='NewCloseIcon' style='  float: right;cursor: pointer;width: 32px;margin-top: -7px;margin-right: -11px;' />");
            $('#NewCloseIcon').on('click', function () {
                $("#popup-content").dialog('close');
            });
        },
        beforeClose: function () {
            $('.ui-widget-overlay').css('opacity', overlayOpacityNormal);
            $(".ui-dialog-titlebar").find('img').remove();
        },
        // ResetUpdateVariables method call on close popup for update flag of IsUpdate
        close: function () {
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
            $("#txtMissPunchDetails").hide();
        },
        draggable: false,
        resizable: false,
        height: 500,
        modal: true,
        dialogClass: 'no-close success-dialog'
    });

}

function SetValues(Data) {

    $("#popup-content").parent().find("span.ui-dialog-title").html($("#CurrentRequestName").val());
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
                select.append($('<option></option>').val(result.dtTypes[i].ApprovalTypeId).html(result.dtTypes[i].ApprovalType));
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
        if ($("#ddlApprovalType option:selected").val() == EnumType.MissPunch) {
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
                 $("#MPDetails").val(Data.ReasonForTimeOff);
             }).then(function () {

                 $.ajax({
                     type: "POST",
                     url: 'Timeoffrequest.aspx/GetMissPunchDataForEdit',
                     data: "{'MissPunchDate':'" + Data.FromDate.split('T')[0] + "'}",
                     contentType: 'application/json; charset=utf-8',
                     datatype: 'json',
                     async: false,
                     success: function (data) {

                         var result = jQuery.parseJSON(data.d);
                         DisplayMissPunchGrid(result);
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
                $("#drpProject").append($("<option>").val(0).text("–Select Project–"));
                for (i in projects) {
                    $("#drpProject").append($('<option></option>').val(projects[i].projectID).html(projects[i].proName));
                }
            }
        })
    }).then(function () {
        $("#drpHours").empty();
        for (i = 0; i <= 24; i++) {
            $("#drpHours").append($('<option></option>').val(i).html(i));
        }
        $("#drpMinutes").empty();
        for (i = 0; i <= 59; i++) {
            $("#drpMinutes").append($('<option></option>').val(i).html(i));
        }

    }).then(function () {
        if (Data.Minutes != undefined || Data.Minutes != 0) {
            var Time = Data.Minutes;
            var hours = Math.floor(Time / 60);
            var minutes = Time % 60;
            Display("drpHours", hours)
            Display("drpMinutes", minutes)
        }
        if (Data.FromDate != undefined) { Display("txtStartTime", Data.FromDate.split('T')[1].substring(0, Data.FromDate.split('T')[1].length - 3)); }
        if (Data.ToDate != undefined) { Display("txtEndTime", Data.ToDate.split('T')[1].substring(0, Data.ToDate.split('T')[1].length - 3)); }

        Display("MainContent_ucODDate_txtToEventDate", GetDate(Data.ODDate));
        Display("MainContent_ucFromDate_txtToEventDate", GetDate(Data.FromDate));
        Display("MainContent_ucToDate_txtToEventDate", GetDate(Data.ToDate));
        Display("MainContent_UcCompOff_txtToEventDate", GetDate(Data.CompOffDate));
        Display("MainContent_UcWorkedOn_txtToEventDate", GetDate(Data.WorkedDate));
        Display("txtDetails", Data.Details);
        Display("txtReason", Data.ReasonForTimeOff);
        Display("drpProject", Data.ProjectID);
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
        ShowHideRadio();
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
            $("#drpProject").append($("<option>").val(0).text("–Select Project–"));
            for (i in projects) {
                $("#drpProject").append($('<option></option>').val(projects[i].projectID).html(projects[i].proName));
            }
        }
    })
    ).then(function () {
        $("#drpHours").empty();
        for (i = 0; i <= 24; i++) {
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

function DisplayMissPunchGrid(result) {
    $("#GvMisspunch").find("tr:gt(0)").remove();
    $("#hdnMispunchCount").val(result.length);
    if (result.length != 0) {

        for (var i = 0; i < result.length; i++) {
            var InTime = result[i].InTime;
            var OutTime = result[i].OutTime;

            $("#GvMisspunch").append("<tr><td style='display:none;'>" + result[i].EmployeeInOutID + "</td><td style='text-align:center;'><input type='text' name='txt' class='Time' value=" + InTime + " style='width:50px;'/></td><td  style='text-align:center;'><input type='text' id=" + result[i].EmployeeInOutID + " name='txt' class='Time' value=" + OutTime + " style='width:50px;'/></td><td  style='text-align:center;'><img src='../Images/DeleteDisable.gif' /></td></tr>");
            if ($("#" + result[i].EmployeeInOutID).val() == "null") {
                $("#" + result[i].EmployeeInOutID).val('');
            }
        }
        $(".Time").keypress(function (e) {
            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57) && e.which != 58) {
                return false;
            }
        });
        $('.Time').timepicker({
            minutes: { interval: 1 },
            showPeriodLabels: false,
            defaultTime: ''
        });

        $("#GvMisspunch").show();
        $("#AddDetails").show();
        $("#IsContactNoRequired").show();
        $("#txtMissPunchDetails").show();
    }
    else {
        $("#GvMisspunch").show();
        $("#txtMissPunchDetails").hide();
        $("#GvMisspunch").append("<tr><td colspan='3' style='padding-left:15px;'>No Records Found</td></tr>");
    }
}
function SetMenu() {
    $('#tblTimeoff tr').each(function () {
        var currentRow = $(this);
        var Date = currentRow.find('td:nth-child(3)').find('span').html();
        var RequestId = currentRow.find('td.hidden').find('span').html();
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

                    if (status == "true") {
                        currentRow.find('li#idEdit').show();
                    }
                    else {
                        currentRow.find('li#idEdit').hide();
                    }

                    if (IsCancelled == "true") {
                        currentRow.find('li#idCancel').hide();
                    }
                    else {

                        currentRow.find('li#idCancel').show();
                    }

                    if (TimesheetEntry == "True") {
                        currentRow.find('li#idTimesheet').show();
                    }
                    else {
                        currentRow.find('li#idTimesheet').hide();
                    }
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
function setStartEndDate() {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);

    var StartDate = moment(firstDay).format('MM/DD/YYYY');
    var EndDate = moment(lastDay).format('MM/DD/YYYY');

    $("#txtFromDate").datepicker('setDate', StartDate);
    $("#txtToDate").datepicker('setDate', EndDate);
}
$(window).scroll(function (event) {
    $('#txtStartTime').timepicker('hide')
    $('#txtEndTime').timepicker('hide');
    $('.Tme').timepicker('hide');
});



