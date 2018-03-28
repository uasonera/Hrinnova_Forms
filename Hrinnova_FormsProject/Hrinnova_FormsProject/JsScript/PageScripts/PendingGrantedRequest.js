EnumType = { Leave: '1', MissPunch: '12', CompOff: '11', OutDoorDuty: '13', WorkOnHoliday: '3', WorkFromHome: '2', Tour: '10' };
var IsFiltered = false;
window.scrollTo = function (x, y) {
    return true;
}
var OutstationId = "";
var LableOutstationOn = "";
var DataFreezingDate = "";
$(document).ready(function () {

    GetIsOustationData();
    SetDataFreezingDate();

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
    //        //console.log(label.attr('for'));
    //        //var parentTable = $(this).parent('td').parent('tr').parent('tbody').parent('table');
    //        //var isCheckBoxApply = true;
    //        //if (parentTable != undefined) {
    //        //    if (parentTable.attr('id') == 'MainContent_chkListEmp') {
    //        //        isCheckBoxApply = true;
    //        //    }
    //        //    if (parentTable.closest('div').attr('id') != undefined) {
    //        //        if (parentTable.closest('div').attr('id').indexOf("tViewParentTask") >= 0) {
    //        //            isCheckBoxApply = true;
    //        //        }
    //        //    }
    //        //}      
    //        //if (isCheckBoxApply == true) {
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
    //        if ($(this).css('display') != "none") {
    //            $(this).next('label').andSelf().wrapAll('<div class="checkbox checkbox-primary"></div>')
    //            var $this = $(this);
    //            if ($(this).siblings('label').length == 0) {
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

    var EnumStaicReq = { "MissPunch": "12" }
    var showControlIdObj = [];
    var pendingReqShowControlsIdObj = [];
    var approvalTypeIdsObj = [];
    //var TimeOffRequestIDs = [];

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

    var EnumShortStatus = { "ApprovedHR": "Approved By HR", "Approved": "Approved By Manager", "Rejected": "Rejected By Manager", "RejectedHR": "Rejected By HR" };

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

    $('#btnClose').click(function () {

    });

    $('#todate').click(function () {
        $("#txtToDate").focus();
    });

    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);

    // var StartDate = moment(firstDay).format('MM/DD/YYYY');
    var StartDate = moment(DataFreezingDate.d).add(1, 'days').format('MM/DD/YYYY');
    if ((moment(StartDate).isAfter(EndDate))) {
        StartDate = moment(DataFreezingDate.d);
    }
    var EndDate = moment(lastDay).format('MM/DD/YYYY');

    $("#txtFromDate").datepicker('setDate', StartDate);
    $("#txtToDate").datepicker('setDate', EndDate);
    $("#pnlPendingRequest").hide();
    $("#pnlGrantedRequest").hide();
    //$("#headingPendingReq").hide();
    //$("#headingGrantedReq").hide();
    var Enum = { PendingRequest: 1, GrantedRequest: 2, RejectedRequest: 3, CancelledRequest: 4 }

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
    renderedHandler = function (elements, data) {
        setupCheckboxes();
    }
    var mappedReqModel = {
        mappedRequestDetails: ko.observableArray([]),
    }
    var grantedReqTypeModel = {
        grantedReqType: ko.observableArray([]),
    }
    var grantedReqSummaryModel = {
        grantedeRequestSummary: ko.observableArray([]),
        showVisible: ko.observable(true),
        MainContent_ucFromDate_divCalenderPopup: ko.observable(true),

    }

    var viewRequestDetailModel = {
        FromDate: ko.observable(),
        ToDate: ko.observable(),
        IsFullDay: ko.observable(),
        HalfDayType: ko.observable(),
        contact: ko.observable(),
        Address: ko.observable(),
        Details: ko.observable(),
        //CompOff: ko.observable(),
        Hours: ko.observable(),
        Mins: ko.observable(),
        //WorkedDate: ko.observable(),
        //ODDate: ko.observable(),
        ShiftChangeType: ko.observable(),
        NewShift: ko.observable(),
        Reason: ko.observable(),
        StartTime: ko.observable(),
        EndTime: ko.observable(),
        NoOfDay: ko.observable(),
        ProjectName: ko.observable(),
        ReqAppliedFor: ko.observable(),
        MissPunchDate: ko.observable()
    }

    ko.applyBindings(reqSummaryModel, document.getElementById("divRequestTbls"));
    ko.applyBindings(grantedReqSummaryModel, document.getElementById("divGrantedRequestSummary"));


    var showControlViewModel = {
        MainContent_ucFromDate_divCalenderPopup: ko.observable(true),
        MainContent_ucToDate_divCalenderPopup: ko.observable(true),
        drpHours: ko.observable(true),
        misspunchDate: ko.observable(true),
    }


    //BIND REQUEST TYPES IN DROPDOWNLIST 
    BindRequestType();

    $("#pnlPendingRequest").show();
    //$("#headingPendingReq").show();
    $("#ddlRequestType").val(1).trigger("chosen:updated");
    BindRequestDetails();
    //appTypeChange();
    $("#btnApproveReject").show();
    //start
    var result = {
        requestDetails: ko.observableArray([]),
    }

    // CALL FUNCTION OF BINDING APPLICATION TYPES IN DROPDOWNLIST
    BindPendingddlApplicationType();

    // BIND PENDING REQUEST DETAILS
    function BindRequestDetails() {
        var FromDate = $("#txtFromDate").val();
        var ToDate = $("#txtToDate").val();
        function bindReqModel() {


            var approvalTypeId = $("#ddlApplicationType").val();
            if (approvalTypeId == null) {
                var approvalTypeId = 0;
            }
            var sortExpression = "";
            $.ajax({
                type: "POST",
                url: "PendingGrantedRequest.aspx/GetRequestDetail",
                data: "{'selectedApprovalTypeId':'" + approvalTypeId + "','FromDate':'" + FromDate + "','ToDate':'" + ToDate + "','IsFiltered':'" + IsFiltered + "'}",
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                success: function (data) {
                    var result = jQuery.parseJSON(data.d);
                    var result_totalRequest = result.tblTotalReq;
                    var result_RequestDetails = result.tblReqDetails;
                    var result_UIAccToReq = result.tblUIAccToReq;
                    //                    var mappedIndex = 0;


                    var requestDetail = {};

                    //var mappedRequestDetails = [];
                    //var requestDetails = {};                   

                    BindPendingRequestDataToTable(result_totalRequest, result_RequestDetails, result_UIAccToReq);

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.responseText)
                }

            });
        };

        var objModel = new bindReqModel();

        //reqSummaryModel.requestSummary([]);
        //ko.cleanNode(document.getElementById("divRequestTbls"));
        //ko.applyBindings(reqSummaryModel, document.getElementById("divRequestTbls"));
        //ko.applyBindings(mappedRequestDetails, document.getElementById("Table1"));
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
            totalRequest.IsToDateExist = result_totalRequest[i].IsToDateExist;

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

            $('#Table1_' + id).tablesorter({
                sortList: [[0, 1]]

            }).tablesorterPager({

                // target the pager markup - see the HTML block below            
                container: $(".pager" + id),
                cssPageDisplay: '.pagedisplay' + id


            });

        }

        DisabledCheckbox();

    }

    // BIND APPLICATION TYPE OF PENDING REQUEST
    function BindPendingddlApplicationType() {
        $.ajax({
            type: "POST",
            url: "PendingGrantedRequest.aspx/GetApplicationType",
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

                sortSelect($("#ddlApplicationType option"));
                $("#ddlApplicationType").addClass("chosen-select");
                if ($("select").hasClass("chosen-select")) {
                    $(".chosen-select").chosen({

                    });
                }
            },
            error: function (data) {
            }

        });
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
                    requestDetail.ProjectName = "N/A"
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

                if (result_RequestDetails[j].ReasonForTimeOff == "" || result_RequestDetails[j].ReasonForTimeOff == null)
                    requestDetail.ReasonForTimeOff = "N/A";
                else
                    requestDetail.ReasonForTimeOff = result_RequestDetails[j].ReasonForTimeOff;

                mappedRequestDetails[mappedIndex] = requestDetail;
                var id = result_RequestDetails[j].TimeOffRequestID;

                // add  control's ID which r displayed in table
                for (var i = 0; i < result_UIAccToReq.length; i++) {
                    var control = result_UIAccToReq[i].UIID;

                    if (result_UIAccToReq[i].ApprovalTypeID == totalReqApprovalTypeId) {

                        if (result_UIAccToReq[i].ApprovalTypeID != 1 || control != "rbtLeave") {

                            var id = control + result_RequestDetails[j].TimeOffRequestID;
                            pendingReqShowControlsIdObj.push(id);
                        }
                    }

                }

                if (requestDetail.ApprovalTypeId == EnumType.WorkOnHoliday) {
                    pendingReqShowControlsIdObj.push("thPendingOfficeHours" + result_RequestDetails[j].TimeOffRequestID);
                    pendingReqShowControlsIdObj.push("thPendingTimesheetHours" + result_RequestDetails[j].TimeOffRequestID);
                    pendingReqShowControlsIdObj.push("PendingOfficeHours" + result_RequestDetails[j].TimeOffRequestID);
                    pendingReqShowControlsIdObj.push("PendingTimesheetHours" + result_RequestDetails[j].TimeOffRequestID);
                }
                if (result_RequestDetails[j].ApprovalTypeId == EnumType.Leave) {
                    //pendingReqShowControlsIdObj.push("PendingHalfDayTypeTD" + result_RequestDetails[j].TimeOffRequestID);
                    //pendingReqShowControlsIdObj.push("PendingHalfDayTypeTH" + result_RequestDetails[j].TimeOffRequestID);
                }
                if (result_RequestDetails[j].ApprovalTypeId != EnumType.WorkOnHoliday) {
                    pendingReqShowControlsIdObj.push("PendingQuantityTH_" + result_RequestDetails[j].TimeOffRequestID);
                    pendingReqShowControlsIdObj.push("PendingQuantityTD_" + result_RequestDetails[j].TimeOffRequestID);
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


    //BIND REQUEST TYPES IN DROPDOWNLIST AND SHOW OR HIDE PANEL ACCORDING TO SELECTION OF REQUEST TYPE
    function BindRequestType() {
        function viewRequestModel() {

            var self = this;
            self.requestType = ko.observableArray([
                { name: 'Pending Request', Id: Enum.PendingRequest },
                { name: 'Granted Request', Id: Enum.GrantedRequest },
                { name: 'Rejected Request', Id: Enum.RejectedRequest },
                { name: 'Cancelled Request', Id: Enum.CancelledRequest }
            ]);

            // SELECTED INDEX CHANGED EVENT OF REQUEST TYPE
            //self.requestTypeChanged = function (obj, event) {
            //    if (event.originalEvent) {
            //        var IsValidSession = false;
            //        $.ajax({
            //            type: 'POST',
            //            url: 'PendingGrantedRequest.aspx/ISValidSession',
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
            //        var reqType = $("#ddlRequestType").val();


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
            //        else if (reqType == Enum.GrantedRequest || reqType == Enum.RejectedRequest) {
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
            //        setupCheckboxes();
            //    }

            //}
        }
        var objModel = new viewRequestModel();
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
            url: "PendingGrantedRequest.aspx/GetApplicationType",
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
        self.monthChanged = function (obj, event) {
            var reqType = $("#ddlRequestType").val();
            if (event.originalEvent) {
                var IsValidSession = false;
                $.ajax({
                    type: 'POST',
                    url: 'PendingGrantedRequest.aspx/ISValidSession',
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
                BindGrantedRequestType(reqType);
            }

        }

        // CHANGE EVENT OF APPLICATION TYPE OF PENDING REQUEST
        //self.grantedRequestTypeChanged = function (obj, event) {
        //    var reqType = $("#ddlRequestType").val();
        //    if (event.originalEvent) {
        //        var IsValidSession = false;
        //        $.ajax({
        //            type: 'POST',
        //            url: 'PendingGrantedRequest.aspx/ISValidSession',
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
    }
    var vm = new grantAppTypeViewModel();
    ko.applyBindings(vm, document.getElementById("ddlApplicationType"));

    $("#ddlRequestType").addClass("chosen-select");
    if ($("select").hasClass("chosen-select")) {
        $(".chosen-select").chosen({

        });
    }

    // CHANGE EVENT OF APPLICATION TYPE OF PENDING REQUEST
    function appTypeChange() {
        ko.cleanNode($("#ddlRequestType")[0])
        function appTypeChangeModel() {
            var self = this;
            self.requestTypeChanged = function (obj, event) {
                if (event.originalEvent) {
                    var IsValidSession = false;
                    $.ajax({
                        type: 'POST',
                        url: 'PendingGrantedRequest.aspx/ISValidSession',
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

    // CHANGE EVENT OF APPLICATION TYPE OF GRANTED REQUEST
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

    //ON CLICK EVENT OF GRANT BUTTON
    $(document).on('click', "#btnGrant", function () {

        var SelectedChkbxId = [];
        var SelectedReqTypeId = [];
        var thisApprovalTypeId = 0;
        $('.table').find('input[type="checkbox"]:checked').each(function () {
            //this is the current checkbox     
            if (!$(this).hasClass('selectAllChkbx')) // add if condition for new design
            {
                var tableId = $(this).parents('table').attr('id');
                var splitedTblIds = tableId.split('_');

                var checkboxId = $(this).attr('id');

                var SelectedReqId_RequestTypeId = [];
                thisApprovalTypeId = splitedTblIds[1];
                var RequestId = $(this).closest("tr").find('td:eq(1)').text();
                SelectedChkbxId.push(checkboxId);

            }

        })
        var IsValidSession = false;
        $.ajax({
            type: 'POST',
            url: 'PendingGrantedRequest.aspx/ISValidSession',
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
        if (SelectedChkbxId != "") {

            //var tableId = $(this).parents('table').attr('id');
            //var splitedTblIds = tableId.split('_');
            //var thisApprovalTypeId = splitedTblIds[1];
            $.ajax({
                type: "POST",
                url: "PendingGrantedRequest.aspx/InsertApprovedRequest",
                data: '{"SelectedChkbxId":"' + SelectedChkbxId + '","ApprovalTypeId":"' + thisApprovalTypeId + '"}',
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                success: function (data) {
                    var result = data.d;
                    if (result == "true")
                        BindRequestDetails(IsFiltered);
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
    $(document).on('click', "#btnGrantTop", function () {

        var SelectedChkbxId = [];
        var SelectedReqTypeId = [];

        var thisApprovalTypeId = 0;

        $('.table').find('input[type="checkbox"]:checked').each(function () {

            //this is the current checkbox     
            //var tableId = $(this).closest('table').attr('id');
            //var splitedTblIds = tableId.split('_');
            //thisApprovalTypeId = splitedTblIds[1];
            if (!$(this).hasClass('selectAllChkbx')) // add if condition for new design
            {
                var tableId = $(this).parents('table').attr('id');
                var splitedTblIds = tableId.split('_');

                var checkboxId = $(this).attr('id');

                var SelectedReqId_RequestTypeId = [];
                thisApprovalTypeId = splitedTblIds[1];
                var RequestId = $(this).closest("tr").find('td:eq(1)').text();

                //SelectedReqId_RequestTypeId[0] = $(this).closest("tr").find('td:eq(1)').text();
                //SelectedReqId_RequestTypeId[1] = thisApprovalTypeId;
                //SelectedReqId.push($(this).closest("tr").find('td:eq(1)').text());
                SelectedChkbxId.push(checkboxId);
                //SelectedReqTypeId.push(thisApprovalTypeId);
                //alert(SelectedReqTypeId);
            }

        })

        if (SelectedChkbxId != "") {
            $.ajax({
                type: "POST",
                url: "PendingGrantedRequest.aspx/InsertApprovedRequest",
                data: '{"SelectedChkbxId":"' + SelectedChkbxId + '","ApprovalTypeId":' + thisApprovalTypeId + '}',
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

    // ON CHECKED CHANGED EVENT OF SELECT ALL CHECKBOX
    $(document).on("click", ".selectAllChkbx", function (event) {
        var targetId = event.target.id;
        $('input:checkbox:not(:disabled)', $(this).closest("table")).prop("checked", $(this).is(":checked")); // changed closest('div') to table according to new design
        //var a = $(this).closest("table").attr('id');       

    });
    $(document).on("click", ".selectChkbx", function (e) {
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
        $("#txtRejReason").val("");

        var IsValidSession = false;
        $.ajax({
            type: 'POST',
            url: 'PendingGrantedRequest.aspx/ISValidSession',
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
        //    width: 358,

        //    draggable: false,
        //    resizable: false,
        //    title: "Reject Application",
        //    modal: true,
        //    buttons: [{
        //        text: "Yes",
        //        click: function () {
        //            $("#vs").empty();
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
    // CLICK EVENT OF SAVE REJECT REQUEST REASON 
    $(document).on('click', "#btnRejSave", function (event) {

        event.preventDefault();

        var IsValidSession = false;
        $.ajax({
            type: 'POST',
            url: 'PendingGrantedRequest.aspx/ISValidSession',
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
        var TimeoffReqId = $("#hdnfld").val();

        if (TimeoffReqId != 0) {
            var reason = $("#txtRejReason").val();
            $("#ulVreason").empty();
            $("#vsreason").hide();
            if (reason != "") {
                $.ajax({
                    type: "POST",
                    url: "PendingGrantedRequest.aspx/InsertRejectionReason",
                    data: '{"reason":"' + reason + '","TimeoffReqId":"' + TimeoffReqId + '"}',
                    contentType: 'application/json; charset=utf-8',
                    datatype: 'json',
                    success: function (data) {
                        var result = data.d;
                        if (result == "True") {
                            //$("#divRejReason").dialog("close");
                            //$('.ui-dialog-content').dialog('close');
                            $('#divRejReason').modal('hide');
                            $("#Popup_lblMessage").removeClass('alert alert-warning');
                            $("#Popup_lblMessage").text("");
                            $("#Popup_lblMessage").hide();

                            ShowMessage(true, "Record Rejected Successfully");

                        }
                        else {
                            //$('#divRejReason').dialog('close');
                            $('#divRejReason').modal('hide');
                            $("#Popup_lblMessage").show();
                            $("#Popup_lblMessage").addClass('alert alert-warning');
                            $("#Popup_lblMessage").text("Record can not be saved");
                        }


                        //alert("Record Rejected Successfully")
                        BindRequestDetails(IsFiltered);

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

    // --BIND GRANTED REQUEST TYPE--
    function BindGrantedRequestType(reqType) {

        function bindReqModel() {
            var self = this;
            var FromDate = $("#txtFromDate").val();
            var ToDate = $("#txtToDate").val();
            var approvalTypeId = 0;
            var GrantedAppTypeId = $("#ddlApplicationType").val();

            if (GrantedAppTypeId == null) {
                GrantedAppTypeId = 0;
            }
            var MethodName = "";
            //var Month = $("#ddlGrantedMonth").val();
            //if (Month == "") {
            //    Month = 0;
            //}

            if (reqType == Enum.GrantedRequest) {
                MethodName = "GetGrantedRequest";
            }
            else if (reqType == Enum.RejectedRequest) {
                MethodName = "GetRejectedRequest";
            }
            else if (reqType == Enum.CancelledRequest) {
                MethodName = "GetCancelledRequest";
            }

            $.ajax({
                type: "POST",
                url: "PendingGrantedRequest.aspx/" + MethodName,
                data: '{"selectedApprovalTypeId":"' + GrantedAppTypeId + '","FromDate":"' + FromDate + '","ToDate":"' + ToDate + '","IsFiltered":"' + IsFiltered + '"}',
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                async: false,
                success: function (data) {
                    var result = jQuery.parseJSON(data.d);
                    var result_totalRequest = result.tblTotalReq;
                    var result_GrantedRequestDetails = result.tblGrantedReq;
                    var result_UIAccToReq = result.tblUiAccToReq;


                    var requestDetail = {};

                    //var mappedRequestDetails = [];
                    //var requestDetails = {};

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

                        //TimeOffRequestIDs.push(totalRequest.TimeOffRequestID);
                        totalRequest.IsToDateExist = result_totalRequest[i].IsToDateExist;
                        approvalTypeIdsObj.push(totalRequest.ApprovalTypeId);

                        //totalRequest.showheader = totalRequest.requestDetails[i].showMainContent_UcCompOff_divCalenderPopup();
                        //totalRequest.showFromDateHeader = totalRequest.requestDetails[i].showMainContent_ucFromDate_divCalenderPopup();
                        //totalRequest.showToDateHeader = totalRequest.requestDetails[i].showMainContent_ucToDate_divCalenderPopup();
                        //totalRequest.showHoursHeader = totalRequest.requestDetails[i].showdrpHours();
                        //totalRequest.showWorkDateHeader = totalRequest.requestDetails[i].showMainContent_UcWorkedOn_divCalenderPopup();
                        //totalRequest.showMisspunchDateHeader = totalRequest.requestDetails[i].showmisspunchDate();
                        //totalRequest.showReasonHeader = totalRequest.requestDetails[i].showtxtDetails();



                        //if (totalRequest.requestDetails[i].showVisible() == false) {
                        //    totalRequest.hideHeader = "none";
                        //}
                        //else {
                        //    totalRequest.hideHeader = "table-cell";
                        //}
                        //totalRequest.HeadrequestDetails = GetHeadVisible();
                        //totalRequest.DisableControl = ShowHideControl(result_UIAccToReq);

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
                    else if (reqType == Enum.GrantedRequest || reqType == Enum.RejectedRequest) {
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
                cssPageDisplay: '.pagedisplay' + id,
                cssgotoPage: '.gotoPage' + id

            });
            //  $(".pager" + id).removeAttr("style")
        }
        //pagingGrantedRequest(TimeOffRequestIDs);
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
                requestDetail.ODDate = result_GrantedRequestDetails[j].ODDate;
                //requestDetail.Hours = HourMinutes[0];

                requestDetail.CompOffDate = result_GrantedRequestDetails[j].CompOffDate;
                //requestDetail.showVisible = ko.observable(true);
                requestDetail.isFromOutstation = result_GrantedRequestDetails[j].isFromOutstation;
                requestDetail.EarlyleaveId = OutstationId;
                requestDetail.OutstationlabelOn = LableOutstationOn;

                requestDetail.WorkDate = result_GrantedRequestDetails[j].WorkDate;
                if (result_GrantedRequestDetails[j].proName == "" || result_GrantedRequestDetails[j].proName == null)
                    requestDetail.ProjectName = "N/A";
                else
                    requestDetail.ProjectName = result_GrantedRequestDetails[j].proName;
                //requestDetail.showWorkOnDateVisible = ko.observable(true);

                requestDetail.Qty = result_GrantedRequestDetails[j].Qty;

                requestDetail.AtDate = result_GrantedRequestDetails[j].FromDate;
                // requestDetail.showMissPunchDateVisible = ko.observable(true);
                requestDetail.IsWFH = result_GrantedRequestDetails[j].IsWFH == false ? "No" : "Yes";
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

                requestDetail.GrantDate = result_GrantedRequestDetails[j].GrantDate;

                if (result_GrantedRequestDetails[j].OfficeHours == "" || result_GrantedRequestDetails[j].OfficeHours == null)
                    requestDetail.OfficeHours = "N/A";
                else
                    requestDetail.OfficeHours = result_GrantedRequestDetails[j].OfficeHours;

                if (result_GrantedRequestDetails[j].TimesheetHours == "" || result_GrantedRequestDetails[j].TimesheetHours == null)
                    requestDetail.TimesheetHours = "N/A";
                else
                    requestDetail.TimesheetHours = result_GrantedRequestDetails[j].TimesheetHours;

                if (result_GrantedRequestDetails[j].ReasonForTimeOff == "" || result_GrantedRequestDetails[j].ReasonForTimeOff == null)
                    requestDetail.ReasonForTimeOff = "N/A";
                else
                    requestDetail.ReasonForTimeOff = result_GrantedRequestDetails[j].ReasonForTimeOff;

                if (result_GrantedRequestDetails[j].Status == EnumTimeOffStatus.Approved) {
                    if (result_GrantedRequestDetails[j].IsHrApprovalRequired == "false") {
                        requestDetail.status = EnumShortStatus.Approved;
                    }
                    else
                        requestDetail.status = EnumShortStatus.Approved;
                }
                if (result_GrantedRequestDetails[j].Status == EnumTimeOffStatus.ApprovedByHR) {
                    if (result_GrantedRequestDetails[j].IsHrApprovalRequired == false) {
                        requestDetail.status = EnumShortStatus.Approved;
                    }
                    else
                        requestDetail.status = EnumShortStatus.ApprovedHR;


                }

                if (result_GrantedRequestDetails[j].Status == EnumTimeOffStatus.RejectedByHR) {
                    if (result_GrantedRequestDetails[j].IsHrApprovalRequired == false)
                        requestDetail.status = EnumShortStatus.Rejected;
                    else
                        requestDetail.status = EnumShortStatus.RejectedHR;

                }
                if (result_GrantedRequestDetails[j].Status == EnumTimeOffStatus.Rejected)
                    requestDetail.status = EnumShortStatus.Rejected;


                requestDetail.StatusId = result_GrantedRequestDetails[j].Status;
                requestDetail.NewShift = result_GrantedRequestDetails[j].NewShift;
                requestDetail.ShiftChangeType = result_GrantedRequestDetails[j].ShiftChangeType == "1" ? "Temporary" : "Parmenant";
                mappedRequestDetails[mappedIndex] = requestDetail;


                var id = result_GrantedRequestDetails[j].TimeOffRequestID;
                var ToDateExists = false;
                var FromDateRequestId = "0";

                for (var i = 0; i < result_UIAccToReq.length; i++) {
                    var control = result_UIAccToReq[i].UIID;

                    if (result_UIAccToReq[i].ApprovalTypeID == totalReqApprovalTypeId) {
                        if (result_UIAccToReq[i].ApprovalTypeID != EnumType.Leave || control != "rbtnLeave") {
                            var id = control + result_GrantedRequestDetails[j].TimeOffRequestID;
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

                //if (result_GrantedRequestDetails[j].ApprovalTypeId == EnumType.Leave) {
                //    showControlIdObj.push("GrantedHalfDayTypeTD" + result_GrantedRequestDetails[j].TimeOffRequestID);
                //    showControlIdObj.push("GrantedHalfDayTypeTH" + result_GrantedRequestDetails[j].TimeOffRequestID);
                //}
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


    //function GetHeadVisible() {
    //    var returnObj = [];
    //    var HeadDetail = {};
    //    HeadDetail.TimeOffRequestID = "TimeOffRequestID";
    //    HeadDetail.Name = "Name";

    //    HeadDetail.CompOffDate = "CompOffDate";        
    //    returnObj[0] = HeadDetail;
    //    return returnObj;
    //}


    // FUNCTION FOR GET HH:MM FROM MINUTES
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

    // FUNCTION FOR SHOW TD CONTROLS
    function showHide(ControlsIdObj) {
        for (var i = 0; i < ControlsIdObj.length; i++) {
            $("#" + ControlsIdObj[i]).show();
            $("#th" + ControlsIdObj[i]).show();
            $(".th" + ControlsIdObj[i]).show();
            $("." + ControlsIdObj[i]).show();

        }

    }
    $(document).on('click', ".selectChkbx", function () {
        var thisId = $(this).attr('id');
        var splitedId = thisId.split('_');
        var ApprovalTypeId = splitedId[2];

        if (!(this.checked))
            $("#AllCheckbox" + ApprovalTypeId).attr('checked', false);

    })

    //function paging(approvalTypeIds) {
    //    for (var i = 0; i < approvalTypeIds.length; i++) {
    //        
    //        var thisApprovalTypeId = approvalTypeIds[i];
    //        $("#Table1_" + thisApprovalTypeId).each(function () {
    //            
    //            var currentPage = 0;
    //            var numPerPage = 5;
    //            var table = $(this);
    //            var rows = table.find('tbody tr');
    //            var a = rows[0];
    //            var tblconfig = $(this).config;
    //            //var rows = tblconfig.rowsCopy;
    //            var l = table.find('tbody tr').length;
    //            var s = currentPage * numPerPage;
    //            var e = (s + numPerPage);
    //            if (e > rows.length) {
    //                e = rows.length;
    //            }

    //            var tableBody = $("#Table1_" + thisApprovalTypeId).children('tbody');
    //            $("#Table1_" + thisApprovalTypeId + "> tbody").empty();

    //            for (var i = s; i < e; i++) {

    //                //tableBody.append(rows[i]);

    //                var o = rows[i];
    //                var l = o.length;
    //                for (var j = 0; j < l; j++) {

    //                    tableBody[0].appendChild(o[j]);

    //                }
    //            }


    //        });
    //    }

    //}
    function pagingPendingRequest(approvalTypeIds) {

        for (var i = 0; i < approvalTypeIds.length; i++) {
            var thisApprovalTypeId = approvalTypeIds[i];
            $("#Table1_" + thisApprovalTypeId).each(function () {
                var currentPage = 0;
                var numPerPage = 5;
                var $table = $(this);
                $table.bind('repaginate', function () {
                    $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();

                    //$table.find("tbody  tr:odd").addClass("altr");


                });
                $table.trigger('repaginate');
                var numRows = $table.find('tbody tr').length;
                var numPages = Math.ceil(numRows / numPerPage);
                var $pager = $('<div class="pager" id="' + thisApprovalTypeId + '"></div>');
                //Bind PageNumber
                //$(".page-number").remove();
                for (var page = 0; page < numPages; page++) {
                    if (numPages > 1) {
                        $('<span class="page-number" id="' + thisApprovalTypeId + '"></span>').append($("<a></a>").text(page + 1)).bind('click', {
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
    };
    function pagingGrantedRequest(TimeOffRequestIDs, approvalTypeIds) {
        for (var i = 0; i < TimeOffRequestIDs.length; i++) {
            var thisTimeOffReqId = TimeOffRequestIDs[i];
            $("#tblDisplayGrantedRequest_" + TimeOffRequestIDs[i] + "_" + approvalTypeIds).each(function () {
                var currentPage = 0;
                var numPerPage = 5;
                var $table = $(this);
                $table.bind('repaginate', function () {
                    $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
                    //$table.find("tbody  tr:odd").addClass("altr");


                });
                $table.trigger('repaginate');
                var numRows = $table.find('tbody tr').length;
                var numPages = Math.ceil(numRows / numPerPage);
                var $pager = $('<div class="pager" id="' + thisTimeOffReqId + '"></div>');
                //Bind PageNumber

                //$(".page-number").remove();
                for (var page = 0; page < numPages; page++) {
                    if (numPages > 1) {
                        $('<span class="page-number" id="' + thisTimeOffReqId + '"></span>').append($("<a></a>").text(page + 1)).bind('click', {
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
    }

    $(document).on('click', '.empName', function (event) {
        if (event.target.className != 'checkbox-custom-label' && event.target.className != 'selectChkbx checkbox-custom') {
            var IsValidSession = false;

            $.ajax({
                type: 'POST',
                url: 'PendingGrantedRequest.aspx/ISValidSession',
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

            $("#Popup_lblMessage").removeClass('alert alert-warning');
            $("#Popup_lblMessage").text("");
            $("#Popup_lblMessage").hide();
            ko.cleanNode($("#divPopup_ReqDetails")[0]);

            var TimeOffReqId = $($(this)).find('td.tdtimeOffReq').children().text()
            $("#span_TimeOffRequestId").text(TimeOffReqId);
            var tblId = $(this).closest('table').attr('id');

            var splitTblId = tblId.split('_');
            var ReqId = splitTblId[1];
            if (ReqId != EnumStaicReq.MissPunch) {
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
                        var childReq = [];
                        var objChildRequestDetail = [];
                        //viewRequestDetailModel.ChildRequestDetail.removeAll();
                        //var index = 0;
                        $('#tbodyChildReqtbl').empty();
                        $('#divPriorityReq').hide();
                        $("#parentDiv_MissPunchDates").hide();
                        $("#parentDiv_MissPunchDates_Original").hide();
                        //$("#parentDiv_txtDetails").show();
                        //$("#caption_txtDetails").text("Details :");
                        $("#parentDiv_MissPunchDate").hide();
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
                                if (reqDetails[i].New_ApplyDate == null || reqDetails[i].New_ApplyDate == "") {
                                    viewRequestDetailModel.AppliedDate = "N/A";
                                }
                                else {
                                    viewRequestDetailModel.AppliedDate = reqDetails[i].New_ApplyDate
                                }
                                //if (ReqId == EnumType.Leave || ReqId == EnumType.Tour || ReqId == EnumType.WorkOnHoliday) {
                                //    viewRequestDetailModel.ReportingManager = reqDetails[i].ReportingManager;
                                //    $('#ReportingManager').show();
                                //}
                                //else {
                                //    $('#ReportingManager').hide();
                                //}
                            }
                            else {
                                $('#divPriorityReq').show();
                                var childReqFromDate = moment(reqDetails[i].FromDate).format('MM/DD/YYYY');
                                var childReqToDate = moment(reqDetails[i].ToDate).format('MM/DD/YYYY');

                                $('#tbodyChildReqtbl').append('<tr><td>' + reqDetails[i].ApprovalType + '</td><td class="ClsDays">' + reqDetails[i].NoOfDays + '</td><td>' + childReqFromDate + '</td><td>' + childReqToDate + '</td></tr>')

                                //totalChildRequest.childReqApprovalType = reqDetails[i].ApprovalType;
                                //totalChildRequest.childReqNoOfDays = reqDetails[i].NoOfDays;
                                //totalChildRequest.childReqFromDate = childReqFromDate;
                                //totalChildRequest.childReqToDate = childReqToDate;
                                //objChildRequestDetail[index] = totalChildRequest;
                                //index++;
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
                        //$('#tbodyChildReqtbl tr').each(function () {
                        //    $(this).find('td.ClsDays').text((parseFloat($(this).find('td.ClsDays').text()) * 2));
                        //});
                        //viewRequestDetailModel.ChildRequestDetail = objChildRequestDetail;
                        //for (var Index = 0; Index < objChildRequestDetail.length; Index++) {
                        //    viewRequestDetailModel.ChildRequestDetail.push(objChildRequestDetail[Index]);
                        //}
                        //ko.cleanNode($("#childReqtbl")[0]);
                        ko.applyBindings(viewRequestDetailModel, document.getElementById("divPopup_ReqDetails"));

                        for (var i = 0; i < reqFields.length; i++) {

                            if (ReqId != EnumType.Leave || reqFields[i].UIID != "rbtLeave") {
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
            else {
                $.ajax({
                    type: "POST",
                    url: "PendingGrantedRequest.aspx/GetMissPunchDetails",
                    data: '{"TimeOffRequestId":' + TimeOffReqId + '}',
                    contentType: 'application/json; charset=utf-8',
                    datatype: 'json',
                    async: false,
                    success: function (data) {

                        var tblInOutDetailsTable = jQuery.parseJSON(data.d)

                        var tblInOutDetails = tblInOutDetailsTable["tblMissedPunchDetails"];
                        $('#divPriorityReq').hide();
                        $('#GvMisspunch tbody').empty();
                        $('#GvMisspunch_Original tbody').empty();
                        for (var i = 0; i < tblInOutDetails.length; i++) {
                            var InTime = tblInOutDetails[i].InTIme;
                            var OutTime = tblInOutDetails[i].OutTime;

                            $('#GvMisspunch tbody').append("<tr><td class='text-center'>" + InTime + "</td><td class='text-center'>" + OutTime + "</td></tr>")
                        }
                        var tblOriginalInOutDetails = tblInOutDetailsTable["tblOriginalPunchDetails"];
                        for (var i = 0; i < tblOriginalInOutDetails.length; i++) {
                            var InTime = tblOriginalInOutDetails[i].InTIme;
                            var OutTime = tblOriginalInOutDetails[i].OutTime;

                            $('#GvMisspunch_Original tbody').append("<tr><td class='text-center'>" + InTime + "</td><td class='text-center'>" + OutTime + "</td></tr>")
                        }
                        viewRequestDetailModel.ReqAppliedFor = "Miss-punch";
                        viewRequestDetailModel.Reason = tblInOutDetails[0].ReasonForTimeOff;
                        viewRequestDetailModel.NoOfDay = tblInOutDetails[0].NoOfDays;
                        //if (tblInOutDetails[0].Details == null || tblInOutDetails[0].Details == "")
                        //    viewRequestDetailModel.Details = "N/A";
                        //else
                        //    viewRequestDetailModel.Details = tblInOutDetails[0].Details;
                        viewRequestDetailModel.MissPunchDate = tblInOutDetails[0].AtDate
                        viewRequestDetailModel.Shift = "";
                        $("#parentDiv_MissPunchDates").show();
                        if (tblInOutDetails[0].TimeOffStatus != 5 && tblOriginalInOutDetails.length > 0) {
                            $("#parentDiv_MissPunchDates_Original").show();
                        }
                        else {
                            $("#parentDiv_MissPunchDates_Original").hide();
                        }
                        //$("#parentDiv_txtDetails").show();
                        //$("#caption_txtDetails").text("Details :");
                        $("#parentDiv_MissPunchDate").show();
                        $(".parentDiv_DivCustomLeave").hide();
                        $("#parentDiv_drpNewShift").hide();
                        $("#parentDiv_rbtChangeShiftType").hide();

                        ko.applyBindings(viewRequestDetailModel, document.getElementById("divPopup_ReqDetails"));
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR.responseText)
                    }

                });
            }

            $("#divPopup_ReqDetails").modal("show");
            $("#divPopup_ReqDetails .modal-title").html("View Applied Request Detail");
            $(".close").click(function () {
                $('[id^="parentDiv_"]').hide();
                $('#GvMisspunch tbody').empty();
                $('#GvMisspunch_Original tbody').empty();
            })
            if (ReqId == EnumStaicReq.MissPunch) {
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
            //$("#divPopup_ReqDetails").dialog({
            //    width: 650,
            //    height: 300,
            //    draggable: false,
            //    resizable: false,
            //    title: ,
            //    modal: true,
            //    close: function () {

            //        $(".pending-granted-request tr").removeClass('date-click-color');
            //    },
            //    open: function (event, ui) {
            //        $('.request-scroll').mCustomScrollbar();
            //    }
            //});
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
            url: 'PendingGrantedRequest.aspx/ISValidSession',
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
        $.ajax({
            type: "POST",
            url: "PendingGrantedRequest.aspx/ApprovedDialogboxRequest",
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
                    BindRequestDetails(IsFiltered);

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
        if ($("#lblMessage").text().length > 0) {

            scroolTop();
        }
    });

    function scroolTop() {
        $("html, body").animate({ scrollTop: 0 }, "fast");

    }
    $(document).on('click', '#dialog_btnReject', function () {
        $("#divPopup_ReqDetails").modal("hide");
        var TimeOffRequestId = $("#span_TimeOffRequestId").text();
        $("#hdnfld").val(TimeOffRequestId);
        var IsValidSession = false;

        $.ajax({
            type: 'POST',
            url: 'PendingGrantedRequest.aspx/ISValidSession',
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
        //    width: 358,
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

    });
    setupCheckboxes();
    setupCheckboxes();

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
            $("#vs1").show();
            if (FromDate == "" && ToDate == "")
                $("#ulVs").append('<li>Please Enter From Date And To Date</li>')
            else if (FromDate == "")
                $("#ulVs").append('<li>Please Enter From Date</li>')
            else
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
            //$("#headingPendingReq").show();
            //$("#headingGrantedReq").hide();
            BindRequestDetails();
        }
        else if (reqType == Enum.GrantedRequest || reqType == Enum.RejectedRequest || reqType == Enum.CancelledRequest) {
            $("#btnApproveReject").hide();
            $("#pnlPendingRequest").hide();
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
        $("#vs1").hide();
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
function comparer(index) {
    return function (a, b) {
        var valA = getCellValue(a, index), valB = getCellValue(b, index)
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
    }
}
function getCellValue(row, index) {
    return $(row).children('td').eq(index).html()
}
function sort_table(col, asc) {

    var table = $(this).parents('table');
    var tbody = table.children('tbody');
    var rows = tbody.rows,
    rlen = rows.length,
        arr = new Array(),
        i, j, cells, clen;
    // fill the array with values from the table
    for (i = 0; i < rlen; i++) {
        cells = rows[i].cells;
        clen = cells.length;
        arr[i] = new Array();
        for (j = 0; j < clen; j++) {
            arr[i][j] = cells[j].innerHTML;
        }
    }
    // sort the array by the specified column number (col) and order (asc)
    arr.sort(function (a, b) {
        return (a[col] == b[col]) ? 0 : ((a[col] > b[col]) ? asc : -1 * asc);
    });
    // replace existing rows with new rows created from the sorted array
    for (i = 0; i < rlen; i++) {
        rows[i].innerHTML = "<td>" + arr[i].join("</td><td>") + "</td>";
    }
}


$(document).on('click', "#dialog_btnClose", function () {
    $("#divPopup_ReqDetails").modal("hide");
});

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
function GetIsOustationData() {
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
