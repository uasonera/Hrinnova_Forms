var EnumStatus = { PendingRequest: 1, Approved: 2, RejectedByPM: 3, Cancelled: 4, Granted: 5, Rejected: 6 }
var DataFreezingDate = "";
$(document).ready(function () {

    ClearField();
    GetDepartment();
    GetRequest();
    SetDataFreezingDate();
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);

    // var StartDate = moment(firstDay).format('MM/DD/YYYY');
    var StartDate = moment(DataFreezingDate.d).add(1, 'days').format('MM/DD/YYYY');
    if ((moment(StartDate).isAfter(EndDate))) {
        StartDate = moment(DataFreezingDate.d);
    }
    var EndDate = moment(lastDay).format('MM/DD/YYYY');

    $("#MainContent_txtFromDate_txtToEventDate").val(StartDate);
    $("#MainContent_txtToDate_txtToEventDate").val(EndDate);

    $("#divFilteration").on('keyup keypress', function (e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            e.preventDefault();
            return false;
        }
    });
    function GetRequest() {
        var EmpName = $("#txtEmpName").val().trim();
        var DepartmentId = $("#ddlDepartment").val();
        var FromDate = $("#MainContent_txtFromDate_txtToEventDate").val();
        var ToDate = $("#MainContent_txtToDate_txtToEventDate").val();
        if (FromDate != "") {
            var IsValidFromDate = moment(FromDate, "MM/DD/yyyy").isValid();
            if (IsValidFromDate == false) {
                Validate = false;
                toastr.error("Please Select Valid From Date.");
                return false;
            }
        }
        if (ToDate != "") {
            var IsValidToDate = moment(ToDate, "MM/DD/yyyy").isValid();
            if (IsValidToDate == false) {
                Validate = false;
                toastr.error("Please Select Valid To Date.");
                return false;
            }
        }

        var Type = $("#drpType").val();
        var Status = $("#drpStatus").val();
        var Validate = VadlidateFromToDate(FromDate, ToDate);
        if (Validate) {
            $.ajax({
                type: "POST",
                url: 'MisspunchApproval.aspx/GetMissPunchRequests',
                data: "{'EmployeeName':'" + EmpName + "','DepartmentId':'" + DepartmentId + "','FromDate':'" + FromDate + "','ToDate':'" + ToDate + "','Type':'" + Type + "','RequestStatus':'" + parseInt(Status) + "'}",
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                success: function (result) {
                    var jsonResult = jQuery.parseJSON(result.d[0]);
                    var totalReqCount = jQuery.parseJSON(result.d[1]);
                    var CallCount = 0;
                    if ((parseInt(totalReqCount)) % 200 == 0) {
                        CallCount = (parseInt(totalReqCount) / 200) - 1;
                    }
                    else {
                        CallCount = parseInt((parseInt(totalReqCount) / 200));
                    }

                    if (CallCount > 0) {
                        for (var i = 0; i < CallCount; i++) {
                            var pageNumber = i + 1;
                            $.ajax({
                                type: "POST",
                                url: 'MisspunchApproval.aspx/GetRemainingMissPunchRequests',
                                data: "{'EmployeeName':'" + EmpName + "','DepartmentId':'" + DepartmentId + "','FromDate':'" + FromDate + "','ToDate':'" + ToDate + "','ApprovalStatus':'" + Status + "','PageNumber':'" + pageNumber + "'}",
                                contentType: 'application/json; charset=utf-8',
                                datatype: 'json',
                                async: false,
                                success: function (result) {
                                    var jsonResult2 = jQuery.parseJSON(result.d);
                                    jsonResult = jsonResult.concat(jsonResult2);
                                },
                                error: {}
                            });
                        }
                    }
                    TimeoffViewModel(jsonResult);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.responseText)
                }


            });

        }

    }

    $(document).on('click', '#btnSearch', function () {
        var FromDate = $("#MainContent_txtFromDate_txtToEventDate").val();
        var ToDate = $("#MainContent_txtToDate_txtToEventDate").val();
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
            GetRequest();
        }
        else {
            $("#ulVs").empty();
            $("#vs1").hide();
            $("#vs1").show();
            $("#ulVs").append('<li>Please Enter From Date and To Date</li>')
        }

    });
    $(document).on('click', '#btnReset', function () {
        ClearField();
        GetRequest();
        $("#MainContent_txtFromDate_txtToEventDate").val(StartDate);
        $("#MainContent_txtToDate_txtToEventDate").val(EndDate);

    });
    function ClearField() {
        $("#txtEmpName").val("");
        $("#ddlDepartment").val(0).trigger("chosen:updated");

        $("#drpStatus").trigger("chosen:updated");
        $("#MainContent_txtFromDate_txtToEventDate").val("");
        $("#MainContent_txtToDate_txtToEventDate").val("");

        $("#ulVs").empty();
        $("#vs1").hide();
    }

    /*Details of All the request*/
    var viewModel =
    {
        RequestDetails: ko.observableArray([])
    }
    ko.applyBindings(viewModel);

    function TimeoffViewModel(result) {
        viewModel.RequestDetails([]);
        $.each(result, function (index) {
            viewModel.RequestDetails.push(result[index]);
        });



        if (result.length != 0) {
            $('.paginat').remove();
            paging();
        }
        else
            $('.paginat').remove();
    }
    /*Details of All the request*/

    function paging() {

        $("#tblTimeoff").each(function () {
            var currentPage = 0;
            var numPerPage = 20;
            var $table = $(this);
            $table.bind('repaginate', function () {
                $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
                //$table.find("tbody  tr:odd").addClass("altr");


            });
            $table.trigger('repaginate');
            var numRows = $table.find('tbody tr').length;
            var numPages = Math.ceil(numRows / numPerPage);
            $($pager).remove();
            var $pager = $('<table class="paginat"><tr><td><table><tr class="paginat-wrap"></tr><table></td></tr></table>');
            $($pager).appendTo("#tblTimeoff");

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
                    }).appendTo(".paginat-wrap").addClass('clickable');
                }

            }
            $pager.insertAfter($table).find('td.page-number:first').addClass('active');

        });
    }

    $(".sortField").click(function (e) {
        ClearMessage();
        var OrderBy = $(this).data('sorttype') == 'Name' ? 'e.Firstname' : $(this).data('sorttype') == 'Type' ? 'at.ApprovalType' : 't.Fromdate';
        var EmpName = $("#txtEmpName").val().trim();
        var DepartmentId = $("#ddlDepartment").val();
        var FromDate = $("#MainContent_txtFromDate_txtToEventDate").val();
        var ToDate = $("#MainContent_txtToDate_txtToEventDate").val();
        if (FromDate != "") {
            var IsValidFromDate = moment(FromDate, "MM/DD/yyyy").isValid();
            if (IsValidFromDate == false) {
                Validate = false;
                toastr.error("Please Select Valid From Date.");
                return false;
            }
        }
        if (ToDate != "") {
            var IsValidToDate = moment(ToDate, "MM/DD/yyyy").isValid();
            if (IsValidToDate == false) {
                Validate = false;
                toastr.error("Please Select Valid To Date.");
                return false;
            }
        }
        var Type = $("#drpType").val();
        var Validate = VadlidateFromToDate(FromDate, ToDate);
        if (Validate) {
            $.ajax({
                type: "POST",
                url: 'MisspunchApproval.aspx/SortByDate',
                data: "{'EmployeeName':'" + EmpName + "','DepartmentId':'" + DepartmentId + "','FromDate':'" + FromDate + "','ToDate':'" + ToDate + "','Type':'" + Type + "','OrderBy':'" + OrderBy + "'}",
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                success: function (result) {
                    var jsonResult = jQuery.parseJSON(result.d);
                    TimeoffViewModel(jsonResult);
                }
            });
        }
    });
    $(".Action").click(function (e) {
        var Action = $(this).attr("id");
        $("#ulvErrorsPopup").empty();
        $("#Div1").hide();
        $('input[type="text"].Time').each(function () {
            if ($(this).val() == "" || $(this).val().indexOf(':') == -1 || moment($(this).val(), "hh:mm").isValid() == false) {
                $("#Div1").show();
                $("#ulvErrorsPopup").append("<li>Please enter proper values for time.</li>");
                e.preventPropagation();
                return false;
            }
        });

        $('#GvMisspunch tr:gt(0)').each(function (Index) {
            var CurrentInTime = moment($(this).find('td:nth-child(2)').find('.Time').val(), "MM/DD/YYYY HH:mm");
            var OutTime = moment($(this).find('td:nth-child(3)').find('.Time').val(), "MM/DD/YYYY HH:mm");
            var NextInTime = moment($(this).next('tr').find('td:nth-child(2)').find('.Time').val(), "MM/DD/YYYY HH:mm");
            if (OutTime != null && NextInTime != null && moment(NextInTime, "MM/DD/YYYY HH:mm").isValid() && NextInTime < OutTime) {

                $("#Div1").show();
                $("#ulvErrorsPopup").append("<li>In Time can not be less than last Out Time.</li>");
                e.preventPropagation();
                return false;
            }
            if (CurrentInTime > OutTime) {
                $("#Div1").show();
                $("#ulvErrorsPopup").append("<li>In Time can not be greater than Out Time.</li>");
                e.preventPropagation();
                return false;
            }
        });

        if (Action == "Approve") {
            var IsValidSession = false;
            $.ajax({
                type: 'POST',
                url: 'MisspunchApproval.aspx/ISValidSession',
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
            var InOutTimings = new Array();
            var Proceed = true;
            $('#GvMisspunch tr:gt(0)').each(function (Index) {
                var CurrentInTime = moment($(this).find('td:nth-child(2)').find('.Time').val(), "MM/DD/YYYY HH:mm");
                var OutTime = moment($(this).find('td:nth-child(3)').find('.Time').val(), "MM/DD/YYYY HH:mm");
                var NextInTime = moment($(this).next('tr').find('td:nth-child(2)').find('.Time').val(), "MM/DD/YYYY HH:mm");
                if (OutTime != null && NextInTime != null && moment(NextInTime, "MM/DD/YYYY HH:mm").isValid() && NextInTime < OutTime) {
                    $("#Div1").show();
                    $("#ulvErrorsPopup").append("<li>In Time can not be less than last Out Time.</li>");
                    e.preventPropagation();
                    Proceed = false;
                    return false;
                }
                if (CurrentInTime > OutTime) {

                    $("#Div1").show();
                    $("#ulvErrorsPopup").append("<li>In Time can not be greater than Out Time.</li>");
                    e.preventPropagation();
                    Proceed = false;
                    return false;
                }
            });
            if (Proceed) {
                $('#GvMisspunch tr:gt(0)').each(function (Index) {

                    var Timings = {};
                    Timings.InTime = $(this).find('td:nth-child(2)').find('.Time').val();
                    Timings.OutTime = $(this).find('td:nth-child(3)').find('.Time').val();
                    Timings.EmpInOutID = $(this).find('td:nth-child(1)').html();
                    Timings.AttendanceType = $(this).data('attendancetype');
                    InOutTimings.push(Timings);
                });

                var date = moment($("#RequestDate").text()).format('MM/DD/YYYY');
                var MissPunchData = "{Timings:" + JSON.stringify(InOutTimings) + ",EmpID:" + $("#hdnEmpId").val() + ",RequestID:" + $("#hdnRequestId").val() + ",RequestDate:" + JSON.stringify(moment($("#RequestDate").text()).format('MM/DD/YYYY')) + "}";
                $.ajax({
                    type: "POST",
                    url: 'MisspunchApproval.aspx/ApproveMissPunch',
                    data: MissPunchData,
                    contentType: 'application/json; charset=utf-8',
                    datatype: 'json',
                    success: function (message) {
                        GetRequest();
                        //$("#popup-content").dialog('close');
                        $("#popup-content").modal('hide');


                        ShowMessage(true, message.d);

                    }
                });
            }
        }
        else {
            var IsValidSession = false;
            $.ajax({
                type: 'POST',
                url: 'MisspunchApproval.aspx/ISValidSession',
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
            $("#popup-content").modal("hide");
            //$("#RejectRequestDialog").modal("show");
            //$("#RejectRequestDialog .modal-title").html("Reject Application");

            $("#txtRejReason").val('');
            $("#divRejReason").modal("show")
            $("#divRejReason .modal-title").html("Rejection Reason")

            $("#app_yes").click(function () {
                $("#txtRejReason").val('');
                $("#divRejReason").modal("show")
                $("#divRejReason .modal-title").html("Rejection Reason")
                $("#RejectRequestDialog").modal("hide");

            });

            $("#app_no").click(function () {
                $("#RejectRequestDialog").modal("hide");
                $("#txtRejReason").val('');
            });
            //$("#RejectRequestDialog").dialog({
            //    width: 250,
            //    height: 200,
            //    draggable: false,
            //    resizable: false,
            //    title: "",
            //    modal: true,
            //    buttons: [{
            //        text: "Yes",
            //        click: function () {
            //            $("#divRejReason").dialog({
            //                width: 550,
            //                title: "Rejection Reason",
            //                draggable: false,
            //                resizable: false,
            //                modal: true
            //            });
            //            $(this).dialog("close");
            //        },
            //        'class': 'primary-btn accept-btn'
            //    },
            //     {
            //         text: "No",
            //         click: function () {
            //             $(this).dialog("close");
            //         },
            //         'class': 'secondary-btn accept-btn'
            //     }
            //    ]
            //})

        }
    });
    $(document).on('click', "#btnRejSave", function () {

        if ($("#hdnRequestId").val() != 0) {
            var reason = $("#txtRejReason").val();
            if (reason != "") {
                $.ajax({
                    type: "POST",
                    url: 'MisspunchApproval.aspx/RejectMissPunch',
                    data: JSON.stringify({ RequestID: $("#hdnRequestId").val(), RejctReason: reason }),
                    contentType: 'application/json; charset=utf-8',
                    datatype: 'json',
                    success: function (result) {
                        if (result == "true") {
                            window.location.href = ("/login");
                            return false;
                        }
                        else {
                            ShowMessage(true, "Request has been rejected Successfully");

                            //$("#popup-content").dialog('close');
                            $("#popup-content").modal('hide');
                            $("#divRejReason").modal("hide")
                            //   $("#divRejReason").dialog('close');
                            GetRequest();
                        }
                    }
                });

            }
        }
    });

    function GetDepartment() {
        $.ajax({
            type: "POST",
            url: "MisspunchApproval.aspx/GetDepartment",
            async: false,
            data: '{}',
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (data) {
                var result = jQuery.parseJSON(data.d);

                for (var i = 0; i < result.length; i++) {
                    $("#ddlDepartment").append($("<option></option>").val(result[i].DeptID).html(result[i].DeptName));
                }
                sortSelect($("#ddlDepartment option"));
                $("#ddlDepartment option").eq(0).before($("<option></option>").val("0").html("Please Select Department"));
                $("#ddlDepartment").val(0);
                $("#ddlDepartment").addClass("chosen-select");
                if ($("select").hasClass("chosen-select")) {
                    $(".chosen-select").chosen({

                    });
                }
            },
            error: function (data) {
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
});




$(document).on('click', '#btnRejCancel', function () {
    //$("#divRejReason").dialog("close");
    $("#divRejReason").modal("hide")
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
function ClearMessage() {
    $("#lblMessage").removeClass('alert alert-warning');
    $("#lblMessage").removeClass('alert alert-success');
    $("#lblMessage").text('');
}
function OpenRequest(lnk) {
    ClearMessage();
    var IsValidSession = false;
    $.ajax({
        type: 'POST',
        url: 'MisspunchApproval.aspx/ISValidSession',
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
    //var RequestID = lnk.parentElement.parentElement.children[1].children[0].innerHTML;
    var RequestID = $(lnk).find('td:eq(1)').children().text();
    var RequestDate = $(lnk).find('td:eq(4)').children().text();
    var RequestEmp = $(lnk).find('td:eq(0)').children().text()

    //$("#RequestDate").html(lnk.parentElement.parentElement.children[3].children[0].innerHTML);
    //$("#hdnRequestId").val(RequestID);
    $("#hdnRequestId").val(RequestID);
    $("#RequestDate").html(RequestDate);

    $("#popup-content .modal-title").html("Date - " + RequestDate);

    //$("#hdnEmpId").val(lnk.parentElement.parentElement.children[0].children[0].innerHTML);
    $("#hdnEmpId").val(RequestEmp);
    $(lnk).addClass('date-click-color');
    $.ajax({
        type: "POST",
        url: 'MisspunchApproval.aspx/GetRequestDetails',
        data: "{ 'RequestID' : '" + RequestID + "'}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            var jsonResult = jQuery.parseJSON(result.d);
            DisplayMissPunchGrid(jsonResult);

        }
    });

    function DisplayMissPunchGrid(tblInOutDetailsTable) {

        //var TimeOffStatus = result[0].TimeOffStatus;
        $("#GvMisspunch").find("tr:gt(0)").remove();
        $("#GvMisspunch_Original").find("tr:gt(0)").remove();

        var result = tblInOutDetailsTable["tblMissedPunchDetails"];

        var tblOriginalInOutDetails = tblInOutDetailsTable["tblOriginalPunchDetails"];

        var tblRequestDetails = tblInOutDetailsTable["tblRequestDetails"];

        var appliedDate = "N/A"

        if (tblRequestDetails[0].New_ApplyDate != null && tblRequestDetails[0].New_ApplyDate != "") {
            appliedDate = tblRequestDetails[0].New_ApplyDate;
        }

        $('#RequestAppliedDate').html(appliedDate);

        var approvedDate = "N/A"

        if (tblRequestDetails[0].New_GrantDate != null && tblRequestDetails[0].New_GrantDate != "") {
            approvedDate = tblRequestDetails[0].New_GrantDate;
        }

        $('#ManagerApprovalDate').html(approvedDate);

        for (var i = 0; i < result.length; i++) {
            var InTime = result[i].InTime;
            var OutTime = result[i].OutTime;
            var IsDisabled = (result[i].AttendanceType != 0 && result[i].AttendanceType != "" && result[i].AttendanceType != null) ? "disabled" : "";
            var Classname = IsDisabled == "disabled" ? "" : "Time";
            var AttendanceType = result[i].AttendanceType == null ? 0 : result[i].AttendanceType;

            $("#GvMisspunch").append("<tr data-AttendanceType=" + AttendanceType + "><td style='display:none;'>" + result[i].EmpInOutID + "</td><td class='text-center'><input type='text' name='txt' " + IsDisabled + " class='" + Classname + " form-control' ' id=InTime" + i + " /></td><td  class='text-center'><input type='text' name='txt' " + IsDisabled + " class='" + Classname + " form-control'  id=OutTime" + i + " '/></td><td  class='text-center'><span class='btn-lg'><i class='fa fa-trash fa-disable'></i></span></td></tr>");
            if ($("#" + result[i].EmpInOutID).val() == "null") {
                $("#" + result[i].EmpInOutID).val('');
            }
            if (result[i].InTimeModified == true) {
                $("#InTime" + i).addClass("text-danger");
            }
            if (result[i].OutTimeModified == true) {
                $("#OutTime" + i).addClass("text-danger");
            }
            $('#InTime' + i).datetimepicker({
                format: "MM/DD/YYYY HH:mm",
                widgetPositioning: {
                    horizontal: 'auto',
                    vertical: 'bottom'
                },
                icons: {
                    date: "fa fa-calendar"
                }, defaultDate: InTime
            });
            $('#OutTime' + i).datetimepicker({
                format: "MM/DD/YYYY HH:mm",
                widgetPositioning: {
                    horizontal: 'auto',
                    vertical: 'bottom'
                },
                icons: {
                    date: "fa fa-calendar"
                }, defaultDate: OutTime
            });
        }

        for (var i = 0; i < tblOriginalInOutDetails.length; i++) {
            var InTime = tblOriginalInOutDetails[i].InTime;
            var OutTime = tblOriginalInOutDetails[i].OutTime;
            var IsDisabled = "disabled";
            var Classname = IsDisabled == "disabled" ? "" : "Time";
            var AttendanceType = tblOriginalInOutDetails[i].AttendanceType == null ? 0 : tblOriginalInOutDetails[i].AttendanceType;

            $("#GvMisspunch_Original").append("<tr data-AttendanceType=" + AttendanceType + "><td style='display:none;'>" + tblOriginalInOutDetails[i].EmpInOutID + "</td><td class='text-center'><input value='" + InTime + "' type='text' name='txt' " + IsDisabled + " class='" + Classname + " form-control' ' /></td><td  class='text-center'><input type='text' name='txt' " + IsDisabled + " class='" + Classname + " form-control' value='" + OutTime + "' /></td></tr>");
        }
        if (tblOriginalInOutDetails.length > 0) {
            $('#divOriginalPunches').show();
        }
        else {
            $('#divOriginalPunches').hide();
        }
        $(".Time").keypress(function (e) {
            if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57) && e.which != 58) {
                return false;
            }
        });

        $("#popup-content").modal('show');

        $('.Time').blur();
        $("#DivMisPunchSuggesions").show();
        var Year = $("#RequestDate").html().substr($("#RequestDate").html().length - 4);
        var RequestedDate = moment($("#RequestDate").text()).format('MM/DD/YYYY');
        var d1 = new Date(RequestedDate);
        var d2 = new Date("01/02/2016");
        var date2 = moment(d2).format('MM/DD/YYYY');
        var DateFormated = $("#RequestDate").text();
        if (moment(DataFreezingDate.d, "MM/DD/YYYY").add(1, 'days').isAfter(moment(DateFormated, "DD MMM YYYY"))) {
            $("#popup-content").find('#Approve').attr('disabled', true);
            $("#popup-content").find('#Reject').attr('disabled', true);
        }
        else {
            $("#popup-content").find('#Approve').attr('disabled', false);
            $("#popup-content").find('#Reject').attr('disabled', false);
        }
        if ($.inArray($(lnk).find('td:eq(6)').find('span').html(), ['Rejected By HR', 'Approved By HR']) >= 0) {

            //return false;
            $('#modal-btn').hide();
            $('#Approve').hide();
            $('#Reject').hide();
            $('#AddDetails').hide();
            $('.Time').prop('disabled', true);

        }
        else {
            $('#modal-btn').show();
            $('#Approve').show();
            $('#Reject').show();
            $('#AddDetails').show();
            $('.Time').prop('disabled', false);

        }
        $("#GvMisspunch td").each(function () {
            if ($(this).find('input').length > 0) {
                var currentElement = $(this).find('input');
                if (!$(currentElement).hasClass('Time'))
                    $(currentElement).addClass('Time');
            }
        });
        $("#AddDetails").click(function (e) {
            if (e.handled !== true) { //Checking for the event whether it has occurred or not.
                e.handled = true; // Basically setting value that the current event has occurred.
                $("#GvMisspunch").append("<tr  data-AttendanceType='0'><td style='display:none;'>0</td><td  class='text-center'><input type='text' name='txt' class='Time form-control'/></td><td  class='text-center'><input type='text'  name='txt' class='Time form-control' /></td><td  style='text-align:center;'><span class='btn-lg dltMisspunchRow cursor-pointer'><i class='fa fa-trash text-danger'></i></td></tr>");
                $(".Time").keypress(function (e) {
                    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57) && e.which != 58) {
                        return false;
                    }
                });
                $(".dltMisspunchRow").click(function () {
                    $(this).closest('tr').remove();
                });
                $('.Time').datetimepicker({
                    format: "MM/DD/YYYY HH:mm",
                    widgetPositioning: {
                        horizontal: 'auto',
                        vertical: 'bottom'
                    },
                    icons: {

                        date: "fa fa-calendar"
                    }
                });
            }
        });
    }

}

function VadlidateFromToDate(FromDate, ToDate) {
    var isRequired = true;
    var FromDate = $("#MainContent_txtFromDate_txtToEventDate").val();
    var ToDate = $("#MainContent_txtToDate_txtToEventDate").val();
    if (FromDate != "" && ToDate == "") {
        toastr.error("Please Enter ToDate.");
        isRequired = false;
    }
    if (ToDate != "" && FromDate == "") {
        toastr.error("Please Enter FromDate.");
        isRequired = false;
    }
    return isRequired;
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
