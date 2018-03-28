EnumType = { Leave: '1', OIM: '6', MissPunch: '12', CompOff: '11', OutDoorDuty: '13', WorkOnHoliday: '3', WorkFromHome: '2', Tour: '10' };
var IsFiltered = false;
var PenaltyForRequest = new Array();
var IsOveridepointproper = true;
window.scrollTo = function (x, y) {
    return true;
}
var OutstationId = "";
var LableOutstationOn = "";
var DataFreezingDate = "";
$(document).ready(function () {
    GetIsOustationDataInHR();
    var EnumStaicReq = { "MissPunch": "12" }
    var showControlIdObj = [];
    var pendingReqShowControlsIdObj = [];
    var approvalTypeIdsObj = [];
    //var TimeOffRequestIDs = [];
    SetDataFreezingDate();
    var FromDateCaption = "";
    var GrantedReqTimeOffRequestId = [];
    var PendingReqTimeOffRequestId = [];

    var people, asc1 = 1,
            asc2 = 1,
            asc3 = 1;

    var EnumTimeOffStatus =
    {
        "Pending ": 1,
        "Approved": 2,
        "Rejected": 3,
        "Cancelled": 4,
        "ApprovedByHR": 5,
        "RejectedByHR": 6
    };

    var EnumShortStatus = { "ApprovedByHR": "Approved By HR", "RejectedByHR": "Rejected By HR" };


    $("#pnlPendingRequest").hide();
    $("#pnlGrantedRequest").hide();
    //$("#headingPendingReq").hide();
    //$("#headingGrantedReq").hide();
    var Enum = { PendingRequest: 1, GrantedRequest: 2, RejectedByHR: 3, CancelledRequest: 4 }

    //var setupCheckboxes = function () {
    //    // Checkbox Styling
    //    $('input[type=checkbox]').each(function () {
    //        var $this = $(this);
    //        $this.addClass('checkbox-custom');
    //        $this.attr("name");
    //        var id = $(this).attr('id');

    //        var dispalyStatusOfControl = "";
    //        if ($this.css('display') == "block" || $this.css('display') == ("inline-block")) {
    //            dispalyStatusOfControl = "true";
    //        }
    //        else {
    //            dispalyStatusOfControl = "false";
    //        }
    //        var label = $(this).next('#' + id);

    //        if (dispalyStatusOfControl == "true") {

    //            $('<label class="checkbox-custom-label" for=' + id + '></label>').insertAfter($this);
    //        }
    //        else {
    //            $('<label class="checkbox-custom-label" style="display:none" for=' + id + '></label>').insertAfter($this);
    //        }

    //        //else {
    //        //    $(this).attr('style', 'opacity:1;position:relative');
    //        //}
    //    });

    //    // Radio Styling
    //    $('input[type=radio]').each(function () {
    //        var $this = $(this);
    //        $this.addClass('radio-custom');
    //        $this.attr("name");
    //        var id = $(this).attr('id');
    //        $('<label class="radio-custom-label" for=' + id + '></label>').insertAfter($this);
    //    });

    //};
    //var setupCheckboxes = function () {
    //    // Checkbox Styling
    //    $('input[type=checkbox]').each(function () {
    //        if (!$(this).parent().hasClass('checkbox')) {
    //        if ($(this).css('display') != "none") {
    //            $(this).next('label').andSelf().wrapAll('<div class="checkbox checkbox-primary"></div>')
    //            var $this = $(this);
    //            if ($(this).siblings('label').length == 0) {
    //                $(this).parent().addClass("no-text");
    //                $('<label class="" for=' + $(this).attr('id') + '></label>').insertAfter($this)
    //            }
    //            $this.attr("name");
    //            var id = $(this).attr('id');

    //            var dispalyStatusOfControl = "";
    //            if ($this.css('display') == "block" || $this.css('display') == ("inline-block") || $this.is(":visible")) {
    //                dispalyStatusOfControl = "true";
    //            }
    //            else {
    //                dispalyStatusOfControl = "false";
    //            }
    //            var label = $(this).next('#' + id);
    //            //console.log(label.attr('for'));
    //            //var parentTable = $(this).parent('td').parent('tr').parent('tbody').parent('table');
    //            //var isCheckBoxApply = true;
    //            //if (parentTable != undefined) {
    //            //    if (parentTable.attr('id') == 'MainContent_chkListEmp') {
    //            //        isCheckBoxApply = true;
    //            //    }
    //            //    if (parentTable.closest('div').attr('id') != undefined) {
    //            //        if (parentTable.closest('div').attr('id').indexOf("tViewParentTask") >= 0) {
    //            //            isCheckBoxApply = true;
    //            //        }
    //            //    }
    //            //}      
    //            //if (isCheckBoxApply == true) {
    //            if (dispalyStatusOfControl == "true") {

    //                //$('<label class="checkbox-custom-label" for=' + id + '></label>').insertAfter($this);
    //            }
    //            else {
    //                //$('<label class="checkbox-custom-label" style="display:none" for=' + id + '></label>').insertAfter($this);
    //            }

    //            //else {
    //            //    $(this).attr('style', 'opacity:1;position:relative');
    //            //}
    //        }
    //    }
    //        else {
    //            return true;
    //        }

    //    }
    //    );

    //    // Radio Styling
    //    $('input[type=radio]').each(function () {

    //        if ($(this).css('display') != "none") {

    //            $(this).next('label').andSelf().wrapAll("<div class='radio radio-primary'></div>");
    //            var $this = $(this);
    //            if ($(this).siblings('label').length == 0) {
    //                $('<label class="" for=' + $(this).attr('id') + '></label>').insertAfter($this)
    //            }
    //            $this.attr("name");
    //            var id = $(this).attr('id');
    //            //$('<label class="radio-custom-label" for=' + id + '></label>').insertAfter($this); 
    //        }

    //        else {
    //            return true;
    //        }
    //    });
    //};
    //setTimeout(setupCheckboxes, 2000);

    $("#txtFromDate").datepicker({
        changeMonth: true,
        changeYear: true,
        showWeek: false,
        firstDay: 0,
        showOn: "focus",
        // buttonImage: "../Images/datepicker.gif",
        // buttonImageOnly: false,
        dateFormat: 'mm/dd/yy',
        //buttonText: "<i class='fa fa-calendar'></i>"
    });
    $('#fromdate').click(function () {
        $("#txtFromDate").focus();
    });
    $("#txtToDate").datepicker({
        changeMonth: true,
        changeYear: true,
        showWeek: false,
        firstDay: 0,
        showOn: "focus",
        //buttonImage: "../Images/datepicker.gif",
        // buttonImageOnly: false,
        dateFormat: 'mm/dd/yy',
        //buttonText: ""
    });
    $('#todate').click(function () {
        $("#txtToDate").focus();
    });
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);

    //var StartDate = moment(firstDay).format('MM/DD/YYYY');
    var StartDate = moment(DataFreezingDate.d).add(1, 'days').format('MM/DD/YYYY');
    if ((moment(StartDate).isAfter(EndDate))) {
        StartDate = moment(DataFreezingDate.d);
    }
    var EndDate = moment(lastDay).format('MM/DD/YYYY');

    $("#txtFromDate").datepicker('setDate', StartDate);
    $("#txtToDate").datepicker('setDate', EndDate);
    var requestModel = {
        requestType: ko.observableArray([]),
    }
    var appTypeModel = {
        appType: ko.observableArray([]),
    }
    var reqSummaryModel = {
        requestSummary: ko.observableArray([]),
        sortField: ko.observable(''),

    }
    var mappedReqModel = {
        mappedRequestDetails: ko.observableArray([]),
    }
    var grantedReqSummaryModel = {
        grantedeRequestSummary: ko.observableArray([]),
        showVisible: ko.observable(true),
        MainContent_ucFromDate_divCalenderPopup: ko.observable(true),

    }
    renderedHandler = function (elements, data) {
        setupCheckboxes();
    }
    var viewRequestDetailModel = {
        //viewRequestDetail: ko.observableArray([])
        FromDate: ko.observable(),
        ToDate: ko.observable(),
        IsFullDay: ko.observable(),
        HalfDayType: ko.observable(),
        contact: ko.observable(),
        Address: ko.observable(),
        Details: ko.observable(),
        CompOff: ko.observable(),
        Hours: ko.observable(),
        Mins: ko.observable(),
        WorkedDate: ko.observable(),
        ODDate: ko.observable(),
        Reason: ko.observable(),
        StartTime: ko.observable(),
        EndTime: ko.observable(),
        NoOfDay: ko.observable(),
        ProjectName: ko.observable(),
        ReqAppliedFor: ko.observable(),
        ShiftChangeType: ko.observable(),
        NewShift: ko.observable(),
        ManagerApprovalDate: ko.observable()
    }
    ko.applyBindings(reqSummaryModel, document.getElementById("divRequestTbls"));
    ko.applyBindings(grantedReqSummaryModel, document.getElementById("divGrantedRequestSummary"));

    //BIND REQUEST TYPES IN DROPDOWNLIST 
    BindRequestType();

    $("#pnlPendingRequest").show();
    $("#headingPendingReq").show();
    $("#ddlRequestType").val(1).trigger("chosen:updated");
    BindRequestDetails();
    //appTypeChange();
    $("#btnApproveReject").show();
    var result = {
        requestDetails: ko.observableArray([]),
    }

    // CALL FUNCTION OF BINDING APPLICATION TYPES IN DROPDOWNLIST
    BindPendingddlApplicationType();

    //BIND REQUEST TYPES IN DROPDOWNLIST AND SHOW OR HIDE PANEL ACCORDING TO SELECTION OF REQUEST TYPE
    function BindRequestType() {
        function viewRequestModel() {

            var self = this;
            self.requestType = ko.observableArray([
                { name: 'Pending Request', Id: Enum.PendingRequest },
                { name: 'Granted Request', Id: Enum.GrantedRequest },
                { name: 'Rejected Request', Id: Enum.RejectedByHR },
                { name: 'Cancelled Request', Id: Enum.CancelledRequest }

            ]);

            // SELECTED INDEX CHANGED EVENT OF REQUEST TYPE
            //self.requestTypeChanged = function (obj, event) {
            //    if (event.originalEvent) {
            //        var reqType = $("#ddlRequestType").val();
            //        var IsValidSession = false;
            //        $.ajax({
            //            type: 'POST',
            //            url: 'PendingGrantedRequest_HR.aspx/ISValidSession',
            //            contentType: 'application/json',
            //            data: "{}",
            //            async: false,
            //            contentType: "application/json; charset=utf-8",
            //            dataType: "json",
            //            success: function (result) {
            //                var Result = result.d;
            //                if (Result == 'true') {
            //                    IsValidSession = true;
            //                }
            //                else {
            //                    IsValidSession = false;
            //                }
            //            },
            //            error: function (error) {
            //                IsValidSession = false;
            //            }
            //        });

            //        if (!IsValidSession) {
            //            window.location = "http://www.cygnet-infotech.com/employee-login";
            //            return false;
            //        }
            //        $("#lblMessage").hide();
            //        if (reqType == Enum.PendingRequest) {
            //            $("#btnApproveReject").show();
            //            $("#pnlGrantedRequest").hide();
            //            $("#pnlPendingRequest").show();
            //            $("#headingPendingReq").show();
            //            $("#headingGrantedReq").hide();


            //            self.appTypeList = ko.observableArray();

            //            appType: ko.observable();
            //            var ddlApprovalTypeId = $("#ddlApplicationType").val();


            //            $("#ddlApplicationType").val(0);
            //            //CALL METHOD OF BIND ALL PENDING REQUEST DETAILS
            //            BindRequestDetails();


            //            //CALL SELECTED INDEX CHANGED EVENT OF APPLICATIONTYPE OF PENDING REQUEST
            //            appTypeChange();
            //        }
            //        else if (reqType == Enum.GrantedRequest || reqType == Enum.RejectedByHR) {
            //            //$("#pnlPendingRequest").css('display', 'none');
            //            $("#btnApproveReject").hide();
            //            $("#pnlPendingRequest").hide();
            //            $("#pnlGrantedRequest").show();
            //            $("#headingPendingReq").hide();
            //            $("#headingGrantedReq").show();

            //            $("#ddlGrantedAppType").val(0);
            //            var currDate = new Date();
            //            var currMonth = currDate.getMonth() + 1;
            //            $("#ddlGrantedMonth").val(currMonth);

            //            //$("#ddlGrantedMonth").val(0);
            //            BindGrantedRequestType(reqType);
            //        }

            //        else if (reqType == 0) {
            //            $("#pnlPendingRequest").hide();
            //            $("#pnlGrantedRequest").hide();
            //            $("#headingPendingReq").hide();
            //            $("#headingGrantedReq").hide();
            //        }
            //    }

            //}
        }

        var objModel = new viewRequestModel();
        ko.applyBindings(objModel, document.getElementById("ddlRequestType"));
        $("#ddlRequestType").addClass("chosen-select");
        if ($("select").hasClass("chosen-select")) {
            $(".chosen-select").chosen({

            });
        }
    }

    // BIND PENDING REQUEST DETAILS
    function BindRequestDetails() {
        function bindReqModel() {
            var FromDate = $("#txtFromDate").val();
            var ToDate = $("#txtToDate").val();

            var approvalTypeId = $("#ddlApplicationType").val();
            if (approvalTypeId == null) {
                var approvalTypeId = 0;
            }
            var sortExpression = "";

            $.ajax({
                type: "POST",
                url: "PendingGrantedRequest_HR.aspx/GetRequestDetail",
                data: "{'selectedApprovalTypeId':'" + approvalTypeId + "','FromDate':'" + FromDate + "','ToDate':'" + ToDate + "','IsFiltered':'" + IsFiltered + "'}",
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                success: function (data) {
                    var result = jQuery.parseJSON(data.d[0]);
                    var result_totalRequest = result.tblTotalReq;
                    var result_RequestDetails = result.tblReqDetails;
                    var result_UIAccToReq = result.tblUIAccToReq;
                    var requestDetail = {};
                    var totalReqCount = jQuery.parseJSON(data.d[1]);
                    var finalRequestObj = result_RequestDetails;
                    var CallCount = 0;
                    if ((parseInt(totalReqCount)) % 100 == 0) {
                        CallCount = (parseInt(totalReqCount) / 100) - 1;
                    }
                    else {
                        CallCount = parseInt((parseInt(totalReqCount) / 100));
                    }

                    if (CallCount > 0) {
                        for (var i = 0; i < CallCount; i++) {
                            var pageNumber = i + 1;
                            $.ajax({
                                type: "Post",
                                url: 'PendingGrantedRequest_HR.aspx/GetRemainingPendingRequest',
                                async: false,
                                data: "{'selectedApprovalTypeId':'" + approvalTypeId + "','FromDate':'" + FromDate + "','ToDate':'" + ToDate + "','IsFiltered':'" + IsFiltered + "','PageNumber':'" + pageNumber + "'}",
                                contentType: 'application/json; charset=utf-8',
                                datatype: 'json',
                                success: function (result) {
                                    var jsonResult2 = jQuery.parseJSON(result.d);

                                    finalRequestObj = finalRequestObj.concat(jsonResult2);
                                    result_RequestDetails = finalRequestObj;
                                },
                                error: {}
                            });
                        }
                    }


                    BindPendingRequestDataToTable(result_totalRequest, result_RequestDetails, result_UIAccToReq);

                },
                error: function (data) {
                }

            });
        }
        var objModel = new bindReqModel();
    }

    // BIND APPLICATION TYPE OF PENDING REQUEST
    function BindPendingddlApplicationType() {
        $.ajax({
            type: "POST",
            url: "PendingGrantedRequest_HR.aspx/GetApplicationType",
            async: false,
            data: '{}',
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (data) {
                var result = jQuery.parseJSON(data.d);

                $("#ddlApplicationType").append($("<option></option>").val("0").html("All"));
                for (var i = 0; i < result.length; i++) {
                    $("#ddlApplicationType").append($("<option></option>").val(result[i].ApprovalTypeId).html(result[i].ApprovalType));
                }
                $("#ddlApplicationType").val(0);
                $("#ddlApplicationType").addClass("chosen-select");
                if ($("select").hasClass("chosen-select")) {
                    $(".chosen-select").chosen({

                    });
                }
                //sortSelect($("#ddlApplicationType option"));

            },
            error: function (data) {
            }

        });
    }

    function BindPendingRequestDataToTable(result_totalRequest, result_RequestDetails, result_UIAccToReq) {


        var requestSummary = [];
        //TimeOffRequestIDs = [];
        approvalTypeIdsObj = [];
        for (var i = 0; i < result_totalRequest.length; i++) {
            //bind div
            var totalRequest = {};
            totalRequest.ApprovalType = result_totalRequest[i].ApprovalType;
            totalRequest.ApprovalTypeId = result_totalRequest[i].ApprovalTypeId;
            //bind table(requestDetails) inside div 
            totalRequest.requestDetails = GetRequestDetails(result_totalRequest, result_RequestDetails, result_totalRequest[i].ApprovalTypeId, i, result_UIAccToReq)

            totalRequest.TimeOffRequestID = PendingReqTimeOffRequestId;
            //TimeOffRequestIDs.push(totalRequest.TimeOffRequestID);

            approvalTypeIdsObj.push(totalRequest.ApprovalTypeId);

            requestSummary[i] = totalRequest;


        }
        reqSummaryModel.requestSummary([]);
        for (var Index = 0; Index < requestSummary.length; Index++) {

            reqSummaryModel.requestSummary.push(requestSummary[Index]);
        }

        //reqSummaryModel.showVisible(false);
        showHide(pendingReqShowControlsIdObj);
        for (var i = 0; i < approvalTypeIdsObj.length; i++) {
            var id = approvalTypeIdsObj[i]

            $('#Table1_' + id).tablesorter({ sortList: [[0, 1]] }).tablesorterPager({
                // target the pager markup - see the HTML block below            
                container: $(".pager" + id),
                cssPageDisplay: '.pagedisplay' + id
            });

        }
        DisabledCheckbox();
    }
    //BIND TABLE DATA OF PENDING REQUEST DETAILS
    function GetRequestDetails(result_totalRequest, result_RequestDetails, totalReqApprovalTypeId, index, result_UIAccToReq) {

        var mappedRequestDetails = [];

        var mappedIndex = 0;
        for (var j = 0; j < result_RequestDetails.length; j++) {
            if (totalReqApprovalTypeId == result_RequestDetails[j].ApprovalTypeId) {
                var requestDetail = {};
                var timeoffReqId = result_RequestDetails[j].TimeOffRequestID;
                var totalReqApprovalTypeId = result_RequestDetails[j].ApprovalTypeId;

                var HourMinutes = [];
                var thishour = result_RequestDetails[j].minutes;
                if (thishour != null) {
                    HourMinutes = GetHoursMinutes(thishour)

                    requestDetail.Hours = HourMinutes[0] + ":" + HourMinutes[1];
                }
                else {
                    requestDetail.Hours = "";
                }


                requestDetail.TimeOffRequestID = timeoffReqId;
                requestDetail.Name = result_RequestDetails[j].Name;
                requestDetail.ApprovalTypeId = result_RequestDetails[j].ApprovalTypeId;
                requestDetail.ApprovalType = result_RequestDetails[j].ApprovalType;
                requestDetail.StartTime = result_RequestDetails[j].StartTime;
                requestDetail.EndTime = result_RequestDetails[j].EndTime;
                requestDetail.FromDate = result_RequestDetails[j].FromDate;
                requestDetail.ToDate = result_RequestDetails[j].ToDate;
                requestDetail.isFromOutstation = result_RequestDetails[j].isFromOutstation;
                requestDetail.EarlyleaveId = OutstationId;
                requestDetail.OutstationlabelOn = LableOutstationOn;
                requestDetail.ShiftChangeType = result_RequestDetails[j].ShiftChangeType == "1" ? "Temporary" : "Parmenant";
                requestDetail.NewShift = result_RequestDetails[j].NewShift == null ? "N/A" : result_RequestDetails[j].NewShift;
                if (result_RequestDetails[j].IsFullDay == true) {
                    requestDetail.IsFullDay = "Full Day";
                    requestDetail.HalfDayType = "N/A";
                }
                else {
                    requestDetail.IsFullDay = "Half Day";

                    if (result_RequestDetails[j].HalfDayType == 1) {
                        requestDetail.HalfDayType = "First Half";
                    }
                    else {
                        requestDetail.HalfDayType = "Second Half";
                    }

                }
                requestDetail.ODDate = result_RequestDetails[j].ODDate;
                requestDetail.CompOffDate = result_RequestDetails[j].CompOffDate;
                requestDetail.WorkDate = result_RequestDetails[j].WorkDate;
                requestDetail.AtDate = result_RequestDetails[j].FromDate;
                requestDetail.IsWFH = result_RequestDetails[j].IsWFH == false ? "No" : "Yes";
                requestDetail.Qty = result_RequestDetails[j].Qty;
                if (result_RequestDetails[j].proName == "" || result_RequestDetails[j].proName == null)
                    requestDetail.ProjectName = "N/A";
                else
                    requestDetail.ProjectName = result_RequestDetails[j].proName;

                if (result_RequestDetails[j].OfficeHours == "" || result_RequestDetails[j].OfficeHours == null)
                    requestDetail.OfficeHours = "N/A";
                else
                    requestDetail.OfficeHours = result_RequestDetails[j].OfficeHours;

                if (result_RequestDetails[j].TimesheetHours == "" || result_RequestDetails[j].TimesheetHours == null)
                    requestDetail.TimesheetHours = "N/A";
                else
                    requestDetail.TimesheetHours = result_RequestDetails[j].TimesheetHours;

                if (result_RequestDetails[j].ReasonForTimeOff != "")
                    requestDetail.ReasonForTimeOff = result_RequestDetails[j].ReasonForTimeOff;
                else
                    requestDetail.ReasonForTimeOff = "N/A";
                mappedRequestDetails[mappedIndex] = requestDetail;
                var id = result_RequestDetails[j].TimeOffRequestID;

                // add  control's ID which r displayed in table
                for (var i = 0; i < result_UIAccToReq.length; i++) {
                    var control = result_UIAccToReq[i].UIID;

                    if (result_UIAccToReq[i].ApprovalTypeID == totalReqApprovalTypeId) {
                        if (result_UIAccToReq[i].ApprovalTypeID != EnumType.Leave || control != "rbtLeave") {
                            var id = control + result_RequestDetails[j].TimeOffRequestID;
                            pendingReqShowControlsIdObj.push(id);
                        }
                    }

                }
                if (result_RequestDetails[j].ApprovalTypeId == EnumType.Leave) {
                    //pendingReqShowControlsIdObj.push("PendingHalfDayTypeTD" + result_RequestDetails[j].TimeOffRequestID);
                    //pendingReqShowControlsIdObj.push("PendingHalfDayTypeTH" + result_RequestDetails[j].TimeOffRequestID);
                }
                if (result_RequestDetails[j].ApprovalTypeId != EnumType.WorkOnHoliday) {
                    pendingReqShowControlsIdObj.push("PendingQuantityTH_" + result_RequestDetails[j].TimeOffRequestID);
                    pendingReqShowControlsIdObj.push("PendingQuantityTD_" + result_RequestDetails[j].TimeOffRequestID);
                }

                if (requestDetail.ApprovalTypeId == EnumType.WorkOnHoliday) {

                    pendingReqShowControlsIdObj.push("thPendingOfficeHours" + result_RequestDetails[j].TimeOffRequestID);
                    pendingReqShowControlsIdObj.push("thPendingTimesheetHours" + result_RequestDetails[j].TimeOffRequestID);
                    pendingReqShowControlsIdObj.push("PendingOfficeHours" + result_RequestDetails[j].TimeOffRequestID);
                    pendingReqShowControlsIdObj.push("PendingTimesheetHours" + result_RequestDetails[j].TimeOffRequestID);
                }
                if (result_RequestDetails[j].ApprovalTypeId == EnumType.WorkFromHome) {
                    pendingReqShowControlsIdObj.push("thPendingTimesheetHours" + result_RequestDetails[j].TimeOffRequestID);
                    pendingReqShowControlsIdObj.push("PendingTimesheetHours" + result_RequestDetails[j].TimeOffRequestID);
                }
                mappedIndex++;
                PendingReqTimeOffRequestId = [];
                PendingReqTimeOffRequestId.push(timeoffReqId);
            }
        }
        return mappedRequestDetails;
    }


    //end
    // CHANGE EVENT OF APPLICATION TYPE OF PENDING REQUEST
    function appTypeChange() {
        function appTypeChangeModel() {
            var self = this;
            self.requestTypeChanged = function (obj, event) {
                if (event.originalEvent) {
                    var IsValidSession = false;
                    $.ajax({
                        type: 'POST',
                        url: 'PendingGrantedRequest_HR.aspx/ISValidSession',
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
                    BindRequestDetails();
                }
            }
        }
        var objModel = new appTypeChangeModel();
        ko.applyBindings(objModel, document.getElementById("ddlRequestType"));
    }

    //CALL METHOD OF BINDING DROPDOWNLIST OF MONTH AND APPLICATION TYPE
    grantAppTypeViewModel();

    //METHOD OF BINDING DROPDOWNLIST OF MONTH AND APPLICATION TYPE AND SELECTEDINDEXCHANGED EVNET
    function grantAppTypeViewModel() {
        var self = this;

        self.appTypeList = ko.observableArray();
        $.ajax({
            type: "POST",
            url: "PendingGrantedRequest_HR.aspx/GetApplicationType",
            data: '{}',
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (data) {
                var result = jQuery.parseJSON(data.d);

                $("#ddlGrantedAppType").empty();
                $("#ddlGrantedAppType").append($("<option></option>").val("0").html("All"));
                for (var i = 0; i < result.length; i++) {
                    $("#ddlGrantedAppType").append($("<option></option>").val(result[i].ApprovalTypeId).html(result[i].ApprovalType));
                }


            },
            error: function (data) {
            }
        });
        //grantedAppTypeChange();

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
        //self.monthChanged = function (obj, event) {
        //    var reqType = $("#ddlRequestType").val();
        //    if (event.originalEvent) {
        //        var IsValidSession = false;
        //        $.ajax({
        //            type: 'POST',
        //            url: 'PendingGrantedRequest_HR.aspx/ISValidSession',
        //            contentType: 'application/json',
        //            data: "{}",
        //            async: false,
        //            contentType: "application/json; charset=utf-8",
        //            dataType: "json",
        //            success: function (result) {
        //                var Result = result.d;
        //                if (Result == 'true') {
        //                    IsValidSession = true;
        //                }
        //                else {
        //                    IsValidSession = false;
        //                }
        //            },
        //            error: function (error) {
        //                IsValidSession = false;
        //            }
        //        });

        //        if (!IsValidSession) {
        //            window.location = "http://www.cygnet-infotech.com/employee-login";
        //            return false;
        //        }
        //        BindGrantedRequestType(reqType);
        //    }

        //}

        // CHANGE EVENT OF APPLICATION TYPE OF PENDING REQUEST
        //self.grantedRequestTypeChanged = function (obj, event) {
        //    var reqType = $("#ddlRequestType").val();
        //    if (event.originalEvent) {
        //        BindGrantedRequestType(reqType);

        //    }
        //}
    }
    var vm = new grantAppTypeViewModel();
    ko.applyBindings(vm, document.getElementById("ddlApplicationType"));


    function grantedAppTypeChange() {
        function grantedAppTypechangeViewModel() {

            var selft = this;
            self.grantedRequestTypeChanged = function (obj, event) {
                if (event.originalEvent) {

                }
            }
        }
        var objViewModel = new grantedAppTypechangeViewModel();
        ko.applyBindings(objViewModel);
    }

    // --BIND GRANTED REQUEST TYPE--
    function BindGrantedRequestType(reqType) {

        function bindReqModel() {
            var self = this;
            var approvalTypeId = 0;
            var FromDate = $("#txtFromDate").val();
            var ToDate = $("#txtToDate").val();
            var GrantedAppTypeId = $("#ddlApplicationType").val();

            if (GrantedAppTypeId == null) {
                GrantedAppTypeId = 0;
            }

            //var Month = $("#ddlGrantedMonth").val();
            //if (Month == "") {
            //    Month = 0;
            //}
            var MethodName = "";
            if (reqType == Enum.GrantedRequest)
                MethodName = "GetGrantedRequest";
            else if (reqType == Enum.RejectedByHR)
                MethodName = "GetRejectedRequest"
            else if (reqType == Enum.CancelledRequest) {
                MethodName = "GetCancelledRequest";
            }

            $.ajax({
                type: "POST",
                url: "PendingGrantedRequest_HR.aspx/" + MethodName,
                data: '{"selectedApprovalTypeId":"' + GrantedAppTypeId + '","FromDate":"' + FromDate + '","ToDate":"' + ToDate + '","IsFiltered":"' + IsFiltered + '"}',
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                async: false,
                success: function (data) {
                    var result = jQuery.parseJSON(data.d[0]);
                    var result_totalRequest = result.tblTotalReq;
                    var result_GrantedRequestDetails = result.tblGrantedReq;
                    var result_UIAccToReq = result.tblUiAccToReq;

                    var totalReqCount = jQuery.parseJSON(data.d[1]);

                    var finalGrantedRequestObj = result_GrantedRequestDetails;
                    var CallCount = 0;
                    if ((parseInt(totalReqCount)) % 100 == 0) {
                        CallCount = (parseInt(totalReqCount) / 100) - 1;
                    }
                    else {
                        CallCount = parseInt((parseInt(totalReqCount) / 100));
                    }

                    var MethodNameOfRemainingReq = "";
                    if (MethodName == "GetGrantedRequest")
                        MethodNameOfRemainingReq = "GetRemainingGrantedRequest";
                    else
                        MethodNameOfRemainingReq = "GetRemainingRejectedRequest";

                    if (CallCount > 0) {
                        for (var i = 0; i < CallCount; i++) {
                            var pageNumber = i + 1;
                            $.ajax({
                                type: "Post",
                                url: 'PendingGrantedRequest_HR.aspx/' + MethodNameOfRemainingReq,
                                async: false,
                                data: '{"selectedApprovalTypeId":"' + GrantedAppTypeId + '","FromDate":"' + FromDate + '","ToDate":"' + ToDate + '","IsFiltered":"' + IsFiltered + '","PageNumber":' + pageNumber + '}',
                                contentType: 'application/json; charset=utf-8',
                                datatype: 'json',
                                success: function (result) {
                                    var jsonResult2 = jQuery.parseJSON(result.d);

                                    finalGrantedRequestObj = finalGrantedRequestObj.concat(jsonResult2);
                                    result_GrantedRequestDetails = finalGrantedRequestObj;
                                },
                                error: {}
                            });
                        }
                    }

                    var requestDetail = {};

                    var grantedeRequestSummary = [];
                    showControlIdObj = [];
                    TimeOffRequestIDs = [];
                    approvalTypeIdsObj = [];

                    for (var i = 0; i < result_totalRequest.length; i++) {
                        var totalRequest = {};
                        // bind div
                        totalRequest.ApprovalType = result_totalRequest[i].ApprovalType;
                        totalRequest.ApprovalTypeId = result_totalRequest[i].ApprovalTypeId;

                        //bind table (requestDetails) inside div
                        totalRequest.requestDetails = GetGrantedRequestDetails(result_totalRequest, result_GrantedRequestDetails, result_totalRequest[i].ApprovalTypeId, i, result_UIAccToReq)
                        totalRequest.TimeOffRequestID = GrantedReqTimeOffRequestId;
                        approvalTypeIdsObj.push(totalRequest.ApprovalTypeId);

                        grantedeRequestSummary[i] = totalRequest;

                    }


                    grantedReqSummaryModel.grantedeRequestSummary([]);
                    for (var Index = 0; Index < grantedeRequestSummary.length; Index++) {
                        grantedReqSummaryModel.grantedeRequestSummary.push(grantedeRequestSummary[Index]);
                    }
                    if (reqType == Enum.CancelledRequest) {
                        $(".clsCanelledOn").show();
                        $(".clsStatus").hide();
                        $(".clsGrantRej").hide();
                    }
                    else if (reqType == Enum.GrantedRequest || reqType == Enum.RejectedByHR) {
                        $(".clsCanelledOn").hide();
                        $(".clsStatus").show();
                        $(".clsGrantRej").show();
                    }

                },
                error: function (data) {
                }
            });
        }
        var objModel = new bindReqModel();

        //ko.applyBindings(grantedReqSummaryModel, document.getElementById("divGrantedRequestSummary"));
        showHide(showControlIdObj);

        for (var i = 0; i < approvalTypeIdsObj.length; i++) {
            var id = approvalTypeIdsObj[i]

            $('#tblDisplayGrantedRequest_' + id).tablesorter({ sortList: [[0, 1]] }).tablesorterPager({

                // target the pager markup - see the HTML block below            
                container: $(".GrantedReqpager" + id),
                cssPageDisplay: '.pagedisplay' + id

            });
        }

    }

    // BIND TABLE DATA FOR GRANTED REQUEST
    function GetGrantedRequestDetails(result_totalRequest, result_GrantedRequestDetails, totalReqApprovalTypeId, index, result_UIAccToReq) {

        var mappedRequestDetails = [];

        var mappedIndex = 0;
        for (var j = 0; j < result_GrantedRequestDetails.length; j++) {
            if (totalReqApprovalTypeId == result_GrantedRequestDetails[j].ApprovalTypeId) {
                var requestDetail = {};
                var HourMinutes = [];
                var thishour = result_GrantedRequestDetails[j].minutes;

                var timeoffreqId = result_GrantedRequestDetails[j].TimeOffRequestID;
                //alert(thishour);
                if (thishour != null) {
                    HourMinutes = GetHoursMinutes(thishour)

                    requestDetail.Hours = HourMinutes[0] + ":" + HourMinutes[1];
                }
                else {
                    requestDetail.Hours = "";
                }


                requestDetail.StartTime = result_GrantedRequestDetails[j].StartTime;
                requestDetail.EndTime = result_GrantedRequestDetails[j].EndTime;
                requestDetail.TimeOffRequestID = result_GrantedRequestDetails[j].TimeOffRequestID;
                requestDetail.ApprovalTypeId = result_GrantedRequestDetails[j].ApprovalTypeId;
                requestDetail.Name = result_GrantedRequestDetails[j].Name;
                requestDetail.ApprovalType = result_GrantedRequestDetails[j].ApprovalType;
                requestDetail.FromDate = result_GrantedRequestDetails[j].FromDate;
                //requestDetail.showFromDateVisible = ko.observable(true);               
                requestDetail.ToDate = result_GrantedRequestDetails[j].ToDate;
                requestDetail.IsWFH = result_GrantedRequestDetails[j].IsWFH == true ? "Yes" : "No";
                requestDetail.isFromOutstation = result_GrantedRequestDetails[j].isFromOutstation;
                requestDetail.EarlyleaveId = OutstationId;
                requestDetail.OutstationlabelOn = LableOutstationOn;
                requestDetail.NewShift = result_GrantedRequestDetails[j].NewShift;
                requestDetail.ShiftChangeType = result_GrantedRequestDetails[j].ShiftChangeType == "1" ? "Temporary" : "Parmenant";
                if (result_GrantedRequestDetails[j].IsFullDay == true) {
                    requestDetail.IsFullDay = "Full Day";
                    requestDetail.HalfDayType = "N/A";
                }
                else {
                    requestDetail.IsFullDay = "Half Day";
                    if (result_GrantedRequestDetails[j].HalfDayType == 1) {
                        requestDetail.HalfDayType = "First Half";
                    }
                    else {
                        requestDetail.HalfDayType = "Second Half";
                    }
                }
                requestDetail.ODDate = result_GrantedRequestDetails[j].ODDate;
                //requestDetail.Hours = HourMinutes[0];

                requestDetail.CompOffDate = result_GrantedRequestDetails[j].CompOffDate;
                //requestDetail.showVisible = ko.observable(true);


                requestDetail.WorkDate = result_GrantedRequestDetails[j].WorkDate;
                //requestDetail.showWorkOnDateVisible = ko.observable(true);

                requestDetail.Qty = result_GrantedRequestDetails[j].Qty;

                requestDetail.AtDate = result_GrantedRequestDetails[j].FromDate;
                // requestDetail.showMissPunchDateVisible = ko.observable(true);

                requestDetail.GrantDate = result_GrantedRequestDetails[j].GrantDate;
                if (result_GrantedRequestDetails[j].proName == "" || result_GrantedRequestDetails[j].proName == null)
                    requestDetail.ProjectName = "N/A";
                else
                    requestDetail.ProjectName = result_GrantedRequestDetails[j].proName;

                if (result_GrantedRequestDetails[j].OfficeHours == "" || result_GrantedRequestDetails[j].OfficeHours == null)
                    requestDetail.OfficeHours = "N/A";
                else
                    requestDetail.OfficeHours = result_GrantedRequestDetails[j].OfficeHours;

                if (result_GrantedRequestDetails[j].TimesheetHours == "" || result_GrantedRequestDetails[j].TimesheetHours == null)
                    requestDetail.TimesheetHours = "N/A";
                else
                    requestDetail.TimesheetHours = result_GrantedRequestDetails[j].TimesheetHours;

                if (result_GrantedRequestDetails[j].ReasonForTimeOff != "")
                    requestDetail.ReasonForTimeOff = result_GrantedRequestDetails[j].ReasonForTimeOff;
                else
                    requestDetail.ReasonForTimeOff = "N/A";

                if (result_GrantedRequestDetails[j].Status == EnumTimeOffStatus.ApprovedByHR)
                    requestDetail.status = EnumShortStatus.ApprovedByHR;
                if (result_GrantedRequestDetails[j].Status == EnumTimeOffStatus.RejectedByHR)
                    requestDetail.status = EnumShortStatus.RejectedByHR;


                requestDetail.StatusId = result_GrantedRequestDetails[j].Status;
                mappedRequestDetails[mappedIndex] = requestDetail;


                var id = result_GrantedRequestDetails[j].TimeOffRequestID;

                for (var i = 0; i < result_UIAccToReq.length; i++) {
                    var control = result_UIAccToReq[i].UIID;

                    if (result_UIAccToReq[i].ApprovalTypeID == totalReqApprovalTypeId) {
                        if (result_UIAccToReq[i].ApprovalTypeID != EnumType.Leave || control != "rbtLeave") {
                            var id = control + result_GrantedRequestDetails[j].TimeOffRequestID;
                            //  alert("show id " + id)
                            showControlIdObj.push(id);
                        }
                    }

                }

                if (requestDetail.ApprovalTypeId == EnumType.WorkOnHoliday) {

                    showControlIdObj.push("thGrantedOfficeHours" + result_GrantedRequestDetails[j].TimeOffRequestID);
                    showControlIdObj.push("thGrantedTimesheetHours" + result_GrantedRequestDetails[j].TimeOffRequestID);
                    showControlIdObj.push("GrantedOfficeHours" + result_GrantedRequestDetails[j].TimeOffRequestID);
                    showControlIdObj.push("GrantedTimesheetHours" + result_GrantedRequestDetails[j].TimeOffRequestID);
                }

                if (result_GrantedRequestDetails[j].ApprovalTypeId == EnumType.Leave) {
                    //showControlIdObj.push("GrantedHalfDayTypeTD" + result_GrantedRequestDetails[j].TimeOffRequestID);
                    //showControlIdObj.push("GrantedHalfDayTypeTH" + result_GrantedRequestDetails[j].TimeOffRequestID);
                }
                if (result_GrantedRequestDetails[j].ApprovalTypeId != EnumType.WorkOnHoliday) {
                    showControlIdObj.push("GrantedQuantityTH_" + result_GrantedRequestDetails[j].TimeOffRequestID);
                    showControlIdObj.push("GrantedQuantityTD_" + result_GrantedRequestDetails[j].TimeOffRequestID);
                }
                if (result_GrantedRequestDetails[j].ApprovalTypeId == EnumType.WorkFromHome) {
                    showControlIdObj.push("thGrantedTimesheetHours" + result_GrantedRequestDetails[j].TimeOffRequestID);
                    showControlIdObj.push("GrantedTimesheetHours" + result_GrantedRequestDetails[j].TimeOffRequestID);
                }

                mappedIndex++;
                GrantedReqTimeOffRequestId = [];
                GrantedReqTimeOffRequestId.push(timeoffreqId);
            }
        }
        return mappedRequestDetails;
    }
    function GetHoursMinutes(thishour) {

        var hhmm = [];
        if (thishour != null) {
            var Time = thishour;
            var hours = Math.floor(Time / 60);
            var minutes = Time % 60;

            hhmm[0] = hours;
            hhmm[1] = minutes;
        }
        return hhmm;
    }
    function showHide(ControlsIdObj) {
        for (var i = 0; i < ControlsIdObj.length; i++) {

            $("#" + ControlsIdObj[i]).show();
            $("#th" + ControlsIdObj[i]).show();
            $(".th" + ControlsIdObj[i]).show();
            $("." + ControlsIdObj[i]).show();
        }
    }
    // ON CHECKED CHANGED EVENT OF SELECTALL CHECKBOX
    $(document).on("click", ".selectAllChkbx", function (event) {


        var targetId = event.target.id;

        $('input:checkbox', $(this).closest("table")).prop("checked", $(this).is(":checked"));
        //var a = $(this).closest("table").attr('id');       

    });
    $(document).on("click", ".selectChkbx", function () {
        // e.stopPropagation();
        if ($('input:checkbox.selectChkbx', $(this).closest("table")).length == $('input:checkbox.selectChkbx:checked', $(this).closest("table")).length) {
            $(this).closest("table").find(('.selectAllChkbx')).prop("checked", "checked");
        } else {
            $(this).closest("table").find(('.selectAllChkbx')).prop("checked", false);
        }

    });

    // CLICK EVENT OF REJECT ICON 
    $(document).on('click', ".rejectRequest", function (e) {
        e.stopPropagation();
        e.preventDefault();
        var TimeoffReqId = $(this).closest("tr").find('td:eq(1)').text();
        $("#hdnfld").val(TimeoffReqId);
        $("#vs").text("");
        $("#divRejReason").modal("show");
        $("#divRejReason .modal-title").html("Rejection Reason");
        //$("#divRejReason").dialog({
        //    width: 550,
        //    id: TimeoffReqId,
        //    title: "Rejection Reason",
        //    draggable: false,
        //    resizable: false,
        //    modal: true
        //});
    })

    //ON CLICK EVENT OF GRANT BUTTON
    $(document).on('click', "#btnGrant", function () {

        var SelectedReqId = [];
        var IsValidSession = false;
        $.ajax({
            type: 'POST',
            url: 'PendingGrantedRequest_HR.aspx/ISValidSession',
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

        $('.table').find('input[type="checkbox"]:checked').each(function () {
            //this is the current checkbox    
            if (!$(this).hasClass('selectAllChkbx')) // add if condition for new design
                SelectedReqId.push($(this).closest("tr").find('td:eq(1)').text());
            var tableId = $(this).parents('table').attr('id');
            var splitedTblIds = tableId.split('_');

            var checkboxId = $(this).attr('id');
            thisApprovalTypeId = splitedTblIds[1];
        })

        if (SelectedReqId != "") {
            //var tableId = $(this).parents('table').attr('id');
            //var splitedTblIds = tableId.split('_');
            //var thisApprovalTypeId = splitedTblIds[1];
            $.ajax({
                type: "POST",
                url: "PendingGrantedRequest_HR.aspx/InsertApprovedRequest",
                data: '{"SelectedRequestIds":"' + SelectedReqId + '","ApprovalTypeId":"' + thisApprovalTypeId + '"}',
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                success: function (data) {
                    var result = data.d;
                    if (result == "true")
                        BindRequestDetails();
                    ShowMessage(true, "Record Approved Successfully");
                    //alert("Record Saved Successfully");
                },
                error: function (data) {
                }
            });
        }
        else {
            alert("Please Select Request");
        }

    })

    //ON CLICK EVENT OF GRANT TOP BUTTON
    $(document).on('click', "#btnGrantHrTop", function () {

        var SelectedReqId = [];

        var thisApprovalTypeId = 0;
        $('.table').find('input[type="checkbox"]:checked').each(function () {
            //this is the current checkbox    
            if (!$(this).hasClass('selectAllChkbx')) { // add if condition for new design
                SelectedReqId.push($(this).closest("tr").find('td:eq(1)').text());

                var tableId = $(this).parents('table').attr('id');
                var splitedTblIds = tableId.split('_');

                var checkboxId = $(this).attr('id');
                thisApprovalTypeId = splitedTblIds[1];
            }

        })

        if (SelectedReqId != "") {
            $.ajax({
                type: "POST",
                url: "PendingGrantedRequest_HR.aspx/InsertApprovedRequest",
                data: '{"SelectedRequestIds":"' + SelectedReqId + '","ApprovalTypeId":' + thisApprovalTypeId + '}',
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                success: function (data) {
                    var result = data.d;
                    if (result == "true")
                        BindRequestDetails();
                    ShowMessage(true, "Record Approved Successfully");
                    //alert("Record Saved Successfully");
                },
                error: function (data) {
                }
            });
        }
        else {
            alert("Please Select Request");
        }

    })
    // CLICK EVENT OF SAVE REJECT REQUEST REASON 
    $(document).on('click', "#btnRejSave", function () {
        event.preventDefault();
        var TimeoffReqId = $("#hdnfld").val();
        var IsValidSession = false;
        $.ajax({
            type: 'POST',
            url: 'PendingGrantedRequest_HR.aspx/ISValidSession',
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
        if (TimeoffReqId != 0) {
            var reason = $("#txtRejReason").val();
            $("#ulVreason").empty();
            $("#vsreason").hide();
            if (reason != "") {
                $.ajax({
                    type: "POST",
                    url: "PendingGrantedRequest_HR.aspx/InsertRejectionReason",
                    data: '{"reason":"' + reason + '","TimeoffReqId":"' + TimeoffReqId + '"}',
                    contentType: 'application/json; charset=utf-8',
                    datatype: 'json',
                    success: function (data) {
                        var result = data.d;
                        if (result == "True") {
                            $('.ui-dialog-content').dialog('close');
                            $('#divRejReason').modal('hide');
                            $("#Popup_lblMessage").removeClass('alert alert-warning');
                            $("#Popup_lblMessage").text("");
                            $("#Popup_lblMessage").hide();
                            //   $("#divRejReason").dialog("close");
                            ShowMessage(true, "Record Rejected Successfully");
                        }
                        else {
                            //$('#divRejReason').dialog('close');
                            $('#divRejReason').modal('hide');
                            $("#Popup_lblMessage").show();
                            $("#Popup_lblMessage").addClass('alert alert-warning');
                            $("#Popup_lblMessage").text("Record can not be saved");
                        }

                        BindRequestDetails();
                        setupCheckboxes();

                    },
                    error: function (data) {
                    }
                });

            }
            else {
                $("#vsreason").show();
                $("#ulVreason").append("<li>Please enter reason</li>");
            }
        }
    });
    $(document).on('click', ".selectChkbx", function () {

        var thisId = $(this).attr('id');
        var splitedId = thisId.split('_');
        var ApprovalTypeId = splitedId[2];

        if (!(this.checked))
            $("#AllCheckbox" + ApprovalTypeId).attr("checked", false);
    })

    // CLICK EVENT OF REJECT ICON 
    $(document).on('click', ".rejectRequest", function () {

        var TimeoffReqId = $(this).closest("tr").find('td:eq(1)').text();
        $("#hdnfld").val(TimeoffReqId);
        $("#vs").text("");
        $("#txtRejReason").val("");

        // $("#divRejReason").dialog('close');
        var IsValidSession = false;
        $.ajax({
            type: 'POST',
            url: 'PendingGrantedRequest_HR.aspx/ISValidSession',
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
        //$("#RejectRequestDialog").modal("show");
        //$("#RejectRequestDialog .modal-title").html("Reject Application");

        $("#vs").empty();
        $("#txtRejReason").val('');

        $("#divRejReason").modal("show");
        $("#divRejReason .modal-title").html("Rejection Reason");

        //$("#RejectRequestDialog").dialog({
        //    width: 280,
        //    height: 180,
        //    draggable: false,
        //    resizable: false,
        //    title: "Reject Application",
        //    modal: true,
        //    buttons: [{
        //        text: "Yes",
        //        click: function () {
        //            $("#vs").empty();
        //            $("#txtRejReason").val('');
        //            $("#divRejReason").dialog({
        //                width: 550,
        //                id: TimeoffReqId,
        //                title: "Rejection Reason",
        //                draggable: false,
        //                resizable: false,
        //                modal: true
        //            });
        //            $(this).dialog("close");
        //        },
        //        'class': 'btn btn-success'
        //    },
        //     {
        //         text: "No",
        //         click: function () {
        //             //alert("I am No button.");
        //             $(this).dialog("close");
        //         },
        //         'class': 'btn btn-danger'
        //     }
        //    ]
        //})

    });

    /******************* rejection dialog buttons ***************/
    $("#app_no").click(function () {
        $('#RejectRequestDialog').modal("hide");
        $("#txtRejReason").val('');
    })
    $("#app_yes").click(function () {
        $("#vs").empty();
        $("#txtRejReason").val('');

        $("#divRejReason").modal("show");
        $("#divRejReason .modal-title").html("Rejection Reason");
        $("#RejectRequestDialog").modal("hide");
    })
    //CLICK EVENT OF CANCEL DIALOG BOX OF REJECT REASON

    $(document).on('click', '#btnRejCancel', function () {
        //$("#divRejReason").dialog("close");
        $("#divRejReason").modal("hide");

    });


    function ShowMessage(Issucess, Message) {

        $("#lblMessage").css('display', 'block');
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


    // functions for display Request details in Dialog box

    $(document).on('click', '.empName', function (event) {

        if (event.target.className != 'checkbox-custom-label' && event.target.className != 'selectChkbx checkbox-custom') {
            var IsValidSession = false;
            $.ajax({
                type: 'POST',
                url: 'PendingGrantedRequest_HR.aspx/ISValidSession',
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
            var thisTr = $(thisElement).closest('tr');
            $(thisTr).addClass('date-click-color');
            ko.cleanNode($("#divPopup_ReqDetails")[0]);

            var TimeOffReqId = $($(this)).find('td.tdtimeOffReq').children().text()
            $("#span_TimeOffRequestId").text(TimeOffReqId);
            var tblId = $($(this)).closest('table').attr('id');

            var splitTblId = tblId.split('_');
            if (splitTblId != EnumStaicReq.MissPunch) {
                $.ajax({
                    type: "POST",
                    url: "PendingGrantedRequest.aspx/ViewRequest",
                    data: '{"TimeOffRequestId":' + TimeOffReqId + '}',
                    contentType: 'application/json; charset=utf-8',
                    datatype: 'json',
                    async: false,
                    success: function (data) {
                        $('[id^=parentDiv_]').hide();
                        var jsonResult = jQuery.parseJSON(data.d);

                        var reqFields = jsonResult.tblReqFields;
                        var reqDetails = jsonResult.tblReqDetails;
                        var objreqDetail = {};
                        //var objChildRequestDetail = [];
                        $('#tbodyChildReqtbl').empty();
                        $('#DivReqTable').hide();
                        for (var i = 0; i < reqDetails.length; i++) {
                            var totalChildRequest = {};
                            if (reqDetails[i].ParentID == 0 || reqDetails[i].ParentID == null) {
                                var hours = Math.floor(reqDetails[i].minutes / 60);
                                var min = (reqDetails[i].minutes % 60);
                                //var index = 0;

                                viewRequestDetailModel.FromDate = reqDetails[i].New_FromDate;
                                if (reqDetails[i].New_FromDate == null || reqDetails[i].New_FromDate == "")
                                    viewRequestDetailModel.FromDate = "N/A";
                                viewRequestDetailModel.ToDate = reqDetails[i].New_ToDate;
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

                                //if (reqDetails[i].IsFullDay == true)
                                //    viewRequestDetailModel.IsFullDay = "1";
                                //else
                                //    viewRequestDetailModel.IsFullDay = "2";

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

                                viewRequestDetailModel.CompOff = reqDetails[i].New_CompOffDate;
                                viewRequestDetailModel.NoOfDay = reqDetails[i].NoOfDays;

                                viewRequestDetailModel.Hours = hours;
                                viewRequestDetailModel.Mins = min;
                                viewRequestDetailModel.WorkedDate = reqDetails[i].New_WorkDate;
                                viewRequestDetailModel.ODDate = reqDetails[i].New_ODDate;
                                if (reqDetails[i].ReasonForTimeOff == null || reqDetails[i].ReasonForTimeOff == "")
                                    viewRequestDetailModel.Reason = "N/A";
                                else
                                    viewRequestDetailModel.Reason = reqDetails[i].ReasonForTimeOff;

                                viewRequestDetailModel.StartTime = reqDetails[i].StartTime;
                                if (reqDetails[i].StartTime == null || reqDetails[i].StartTime == "")
                                    viewRequestDetailModel.StartTime = "N/A";
                                viewRequestDetailModel.EndTime = reqDetails[i].EndTime;
                                if (reqDetails[i].EndTime == null || reqDetails[i].EndTime == "")
                                    viewRequestDetailModel.EndTime = "N/A";
                                viewRequestDetailModel.ProjectName = reqDetails[i].ProjectName;
                                if (reqDetails[i].ProjectName == null || reqDetails[i].ProjectName == "")
                                    viewRequestDetailModel.ProjectName = "N/A";
                                viewRequestDetailModel.ReqAppliedFor = reqDetails[i].ApprovalType;
                                viewRequestDetailModel.Shift = reqDetails[i].Shift == null ? "N/A" : reqDetails[i].Shift;
                                viewRequestDetailModel.ShiftChangeType = reqDetails[i].ShiftChangeType == "1" ? "Temporary" : "Parmenant";
                                if (reqDetails[i].New_GrantDate == null || reqDetails[i].New_GrantDate == "") {
                                    viewRequestDetailModel.ManagerApprovalDate = "N/A";
                                }
                                else {
                                    viewRequestDetailModel.ManagerApprovalDate = reqDetails[i].New_GrantDate
                                }
                                if (reqDetails[i].New_ApplyDate == null || reqDetails[i].New_ApplyDate == "") {
                                    viewRequestDetailModel.AppliedDate = "N/A";
                                }
                                else {
                                    viewRequestDetailModel.AppliedDate = reqDetails[i].New_ApplyDate
                                }
                                if (splitTblId[1] == EnumType.Leave || splitTblId[1] == EnumType.Tour || splitTblId[1] == EnumType.WorkOnHoliday) {
                                    viewRequestDetailModel.ReportingManager = reqDetails[i].AppliedTo;
                                    $('#ReportingManager').show();
                                }
                                else {
                                    $('#ReportingManager').hide();
                                }
                            }
                            else {
                                $('#DivReqTable').show();
                                var childReqFromDate = moment(reqDetails[i].FromDate).format('MM/DD/YYYY');
                                var childReqToDate = moment(reqDetails[i].ToDate).format('MM/DD/YYYY');
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
                        //viewRequestDetailModel.ChildRequestDetail = objChildRequestDetail;

                        ko.applyBindings(viewRequestDetailModel, document.getElementById("divPopup_ReqDetails"));

                        for (var i = 0; i < reqFields.length; i++) {
                            if (splitTblId != EnumType.Leave || reqFields[i].UIID != "rbtLeave") {
                                var UI_id = reqFields[i].UIID;
                                var Caption = reqFields[i].Caption;
                                showControl(UI_id, Caption);
                            }
                        }
                    },
                    error: function (data) {
                    }
                });
                $.ajax({
                    type: "POST",
                    url: "PendingGrantedRequest.aspx/SetShiftLable",
                    data: '{"TimeOffRequestId":' + TimeOffReqId + '}',
                    contentType: 'application/json; charset=utf-8',
                    datatype: 'json',
                    async: false,
                    success: function (data) {
                        $("#lblExistingShift").html(data.d == "" ? "N/A" : data.d);
                    }
                });
            }
            $("#divPopup_ReqDetails").modal("show");
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                type: "POST",
                url: "PendingGrantedRequest_HR.aspx/GetRequestType",
                data: '{"RequestId":"' + TimeOffReqId + '"}',
                async: false,
                success: function (data) {
                    var request = data.d;
                    if (request[1] == parseInt(EnumType.OIM)) {
                        $(".hidepenalty").show();
                        $("#hdnIsOIM").val(true);
                        $("#PenaltyWindow").show();
                        $("#PenaltyWindow").attr('data-date', request[0]);
                        $("#PenaltyWindow").attr('data-employee', request[2]);
                        $("#PenaltyWindow").click(function () {
                            GetPenaltyRecordForOIM($(this).data('date'), $(this).data('employee'));
                        });
                    }
                    else {
                        $("#PenaltyWindow").hide();
                        $("#hdnIsOIM").val(false);
                        $(".hidepenalty").hide();
                    }
                }
            });
            $(".modal-title").html("View Applied Request Detail");
            $("#btncloserequest").click(function () {
                $('[id^="parentDiv_"]').hide();
                $('#GvMisspunch tbody').empty();
            })
            if (splitTblId == EnumStaicReq.MissPunch) {
                $("#divPopup_ReqDetails").find('#FrmDateMain').html($("#divPopup_ReqDetails").find("#MissPunchDate").html());
            }
            var Date = $("#divPopup_ReqDetails").find('#FrmDateMain').html();
            if (moment(DataFreezingDate.d, "MM/DD/YYYY").add(1, 'days').isAfter(moment(Date, "DD/MM/YYYY"))) {
                $("#divPopup_ReqDetails").find('#dialog_btnAccept').attr('disabled', true);
                $("#divPopup_ReqDetails").find('#dialog_btnReject').attr('disabled', true);
            }
            else {
                $("#divPopup_ReqDetails").find('#dialog_btnAccept').attr('disabled', false);
                $("#divPopup_ReqDetails").find('#dialog_btnReject').attr('disabled', false);
            }

        }

    });

    function showControl(UI_id, Caption, value) {

        $("#parentDiv_" + UI_id).show();
        $("#parentDiv_MainContent_ucFromDate_divCalenderPopup").show();
        $("#parentDiv_MainContent_ucToDate_divCalenderPopup").show();

        $("#caption_MainContent_ucFromDate_divCalenderPopup").text("From Date :");
        $("#caption_MainContent_ucToDate_divCalenderPopup").text("To Date :");
        if (UI_id != "MainContent_ucFromDate_divCalenderPopup" && UI_id != "MainContent_ucToDate_divCalenderPopup") {
            $("#caption_" + UI_id).text(Caption);
        }
        if (UI_id == "DivCustomLeave")
            $(".parentDiv_" + UI_id).show();
        else
            $(".parentDiv_DivCustomLeave").hide();

    }

    $(document).on('click', "#dialog_btnAccept", function () {
        var TimeOffRequestId = $("#span_TimeOffRequestId").text();

        var IsValidSession = false;
        $.ajax({
            type: 'POST',
            url: 'PendingGrantedRequest_HR.aspx/ISValidSession',
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

        ApproveRequest(TimeOffRequestId);
        if ($("#hdnIsOIM").val() == "true") {
            $.ajax({
                type: 'POST',
                url: 'PendingGrantedRequest_HR.aspx/OverRidePenalty',
                data: JSON.stringify({ PenaltyObj: PenaltyForRequest }),
                contentType: "application/json; charset=utf-8",
                //dataType: "json",
                async: false,
                success: function (result) {

                }

            });
        }



    });
    function GetPenaltyRecordForOIM(Date, EmpId) {
        var FromDate = moment(Date, "DD-MM-YYYY").add(-1, 'days');
        var ToDate = moment(Date, "DD-MM-YYYY").add(1, 'days');
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            dataType: 'html',
            type: "POST",
            url: "PendingGrantedRequest_HR.aspx/GetRequestDetailsforPenalty",
            data: JSON.stringify({ FromDate: FromDate.format("YYYY-MM-DD"), ToDate: ToDate.format("YYYY-MM-DD"), EmpId: EmpId }),
            success: function (data) {
                var LstPenalty = jQuery.parseJSON(data).d;
                $("#tblPenalty").find("tr:gt(0)").remove();

                if (LstPenalty.length == 0) {
                    $("#tblPenalty").append("<tr><td colspan='5'>No records found</td></tr>")
                }
                else {
                    $(LstPenalty).each(function () {
                        if ($(this)[0].PenaltyEmpMappingId != 0)
                            $("#tblPenalty").append("<tr id='" + $(this)[0].PenaltyEmpMappingId + "'><td>" + $(this)[0].DisplayDate + "</td><td>" + $(this)[0].PenaltyName + "</td><td class='penaltypoint'>" + $(this)[0].PenaltyPoints + "</td><td><div class='checkbox checkbox-primary'><input type='checkbox' name='selectCheckbox' class='OverridePenalty' id='chk" + $(this)[0].PenaltyEmpMappingId + "'/><label for='chk" + $(this)[0].PenaltyEmpMappingId + "'></label></div></td><td><div class='col-sm-12'><input type='text' style='display:none;width: 60px;' class='form-control PenaltyBox' id='txt" + $(this)[0].PenaltyId + "'/></div></td></tr>")
                    });
                }
                $(".OverridePenalty").click(function () {
                    if ($(this).prop("checked")) {
                        $(this).closest('tr').find('.PenaltyBox').show();
                    }
                    else {
                        $(this).closest('tr').find('.PenaltyBox').val('');
                        $(this).closest('tr').find('.PenaltyBox').hide();
                    }
                })
                $("#Penalty").modal("show");
                $(".PenaltyTitle").html("Attendance Points Information");

            }
        });
    }
    $("#OverRidePenalty").click(function () {

        while (PenaltyForRequest.length > 0) {
            PenaltyForRequest.pop();
        }

        $("#tblPenalty").find("tr:gt(0)").each(function () {
            if ($(this).find(".OverridePenalty").prop("checked")) {
                var PenaltyObj = {};
                PenaltyObj.id = $(this).attr('id');
                var penaltypoint = $(this).find('.penaltypoint').text();
                var overidepoint = $(this).find(".PenaltyBox").val();
                if (overidepoint != "") {
                    if (parseFloat(overidepoint) > parseFloat(penaltypoint)) {
                        toastr.options.timeOut = 1000;
                        toastr.warning("Overriden points should be less than or equal to existing Attendance points");
                        IsOveridepointproper = false;
                    }
                    else {
                        PenaltyObj.points = $(this).find(".PenaltyBox").val();
                        PenaltyForRequest.push(PenaltyObj);
                        IsOveridepointproper = true;
                    }
                }
                else {
                    toastr.options.timeOut = 1000;
                    toastr.warning("Attendance point can not be blank");
                    IsOveridepointproper = false;
                }
            }
        });
        if (IsOveridepointproper) {
            toastr.remove();
            $("#Penalty").modal("hide");
        }
    });
    function ApproveRequest(TimeOffRequestId) {
        $.ajax({
            type: "POST",
            url: "PendingGrantedRequest_HR.aspx/ApprovedDialogboxRequest",
            data: "{'TimeOffRequestId':" + TimeOffRequestId + "}",
            contentType: 'application/json; charset=utf-8',
            success: function (jsonResult) {
                var result = jsonResult.d;
                if (result == "true") {
                    $("#Popup_lblMessage").removeClass('alert alert-warning');
                    $("#Popup_lblMessage").text("");
                    $("#Popup_lblMessage").hide();
                    // $("#divPopup_ReqDetails").dialog('close');
                    $("#divPopup_ReqDetails").modal("hide");
                    BindRequestDetails();
                    ShowMessage(true, "Record Approved Successfully");
                }
                else {
                    $("#Popup_lblMessage").show();
                    $("#Popup_lblMessage").addClass('alert alert-warning');
                    $("#Popup_lblMessage").text("Record can not be saved");
                }
            },
            error: function (jsonResult) {
            }
        })
    }
    $(document).on('click', '#dialog_btnReject', function () {
        $("#divPopup_ReqDetails").modal("hide");
        var TimeOffRequestId = $("#span_TimeOffRequestId").text();
        $("#hdnfld").val(TimeOffRequestId);

        var IsValidSession = false;
        $.ajax({
            type: 'POST',
            url: 'PendingGrantedRequest_HR.aspx/ISValidSession',
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

        //$("#RejectRequestDialog").modal("show");
        //$("#RejectRequestDialog .modal-title").html("Reject Application");

        $("#vs").empty();
        $("#txtRejReason").val('');

        $("#divRejReason").modal("show");
        $("#divRejReason .modal-title").html("Rejection Reason");

        //$("#RejectRequestDialog").dialog({
        //    width: 280,
        //    height: 180,
        //    draggable: false,
        //    resizable: false,
        //    title: "Reject Application",
        //    modal: true,
        //    buttons: [{
        //        text: "Yes",
        //        click: function () {
        //            $("#vs").empty();
        //            $("#txtRejReason").val('');
        //            $("#divRejReason").dialog({
        //                width: 550,
        //                id: TimeOffRequestId,
        //                title: "Rejection Reason",
        //                draggable: false,
        //                resizable: false,
        //                modal: true
        //            });
        //            $(this).dialog("close");
        //        },
        //        'class': 'btn btn-success'
        //    },
        //     {
        //         text: "No",
        //         click: function () {
        //             $(this).dialog("close");
        //         },
        //         'class': 'btn btn-danger'
        //     }
        //    ]
        //})

    })

    $("#btnSearch").on("click", function () {
        var IsValidSession = false;
        $.ajax({
            type: 'POST',
            url: 'PendingGrantedRequest_HR.aspx/ISValidSession',
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
        var FromDate = $("#txtFromDate").val();
        var ToDate = $("#txtToDate").val();
        if (FromDate != "" && ToDate != "") {
            $("#ulVs").empty();
            $("#v1").hide();
            $("#lblMessage").html('').removeClass('alert alert-success');
            var IsValidFromDate = moment(FromDate, "MM/DD/YYYY").isValid();
            if (IsValidFromDate == false) {
                Validate = false;
                $("#v1").show();
                $("#ulVs").append("<li>Please select valid From Date</li>");
                return false;
            }
            var IsValidToDate = moment(ToDate, "MM/DD/YYYY").isValid();
            if (IsValidToDate == false) {
                Validate = false;
                $("#v1").show();
                $("#ulVs").append("<li>Please select valid To Date</li>");
                return false;
            }
            if (!(moment(ToDate).isAfter(FromDate)) && !(moment(ToDate).isSame(FromDate))) {
                $("#v1").show();
                $("#ulVs").append("<li>To Date should be greater than From Date</li>");
                return false;
            }
            SearchData();
        }
        else {
            $("#ulVs").empty();
            $("#v1").hide();
            $("#v1").show();
            if (FromDate == "" && ToDate == "")
                $("#ulVs").append('<li>Please Enter From Date And To Date</li>')
            else if (FromDate == "")
                $("#ulVs").append('<li>Please Enter From Date</li>')
            else if (ToDate == "")
                $("#ulVs").append('<li>Please Enter To Date</li>')

        }
    });
    function SearchData() {

        $("#lblMessage").hide();
        var reqType = $("#ddlRequestType").val();
        IsFiltered = true;

        if (reqType == Enum.PendingRequest) {
            $("#btnApproveReject").show();
            $("#pnlGrantedRequest").hide();
            $("#pnlPendingRequest").show();
            $(".hidepenalty").show();
            //$("#headingPendingReq").show();
            //$("#headingGrantedReq").hide();
            BindRequestDetails();
        }
        else if (reqType == Enum.GrantedRequest || reqType == Enum.RejectedByHR || reqType == Enum.CancelledRequest) {
            $("#btnApproveReject").hide();
            $("#pnlPendingRequest").hide();
            $(".hidepenalty").hide();
            $("#pnlGrantedRequest").show();
            //$("#headingPendingReq").hide();
            //$("#headingGrantedReq").show();

            BindGrantedRequestType(reqType);
        }
    }

    $("#btnReset").on("click", function () {
        $('#ddlRequestType').val(1).trigger("chosen:updated");
        $('#ddlApplicationType').val(0).trigger("chosen:updated");
        $("#ulVs").empty();
        $("#v1").hide();
        $("#lblMessage").html('').removeAttr('class');
        $("#txtFromDate").val('');
        $("#txtToDate").val('');
        IsFiltered = false;
        $("#btnApproveReject").show();
        $("#pnlGrantedRequest").hide();
        $("#pnlPendingRequest").show();
        $("#txtFromDate").datepicker('setDate', StartDate);
        $("#txtToDate").datepicker('setDate', EndDate);
        //$("#headingPendingReq").show();
        //$("#headingGrantedReq").hide();
        BindRequestDetails();
    });

});
$(document).on('click', "#dialog_btnClose", function () {
    // $("#divPopup_ReqDetails").dialog("close");
    $("#divPopup_ReqDetails").modal("hide");
});
$(document).on('click', '.close', function () {
    $('#tbodyChildReqtbl').html('');

})

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
function GetIsOustationDataInHR() {
    $.ajax({
        type: 'POST',
        url: 'PendingGrantedRequest.aspx/GetOutstationLableValue',
        contentType: 'application/json',
        data: "{}",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            OutstationId = result.d[0];
            LableOutstationOn = result.d[1];
        },
        error: function (error) {
            //IsValidSession = false;
        }
    });
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
function DisabledCheckbox() {

    $(".ArsTable tr.empName").each(function () {
        var Date = $(this).find('td.FromDateDisabled').find('span').html();
        if (moment(DataFreezingDate.d, "MM/DD/YYYY").add(1, 'days').isAfter(moment(Date, "DD/MM/YYYY"))) {
            var ID = $(this).find('.selectChkbx').attr('id');
            $("#" + ID).attr("disabled", true);
            $(this).find('.rejectRequest').attr('disabled', true).removeClass('rejectRequest');
        }
    });
}