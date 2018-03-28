$(document).ready(function () {

    var d = new Date();

    //var d = getLatestRequestDate();

    BindCalendar(d.getFullYear(), d.getMonth() + 1);
    //$('#ddlDepartment').change(function () {
    //    DepartmentFilter($(this).val())
    //});
    $('#ddlCompany').change(function () {
        CompanyFilter($(this).val())
    });
    $('#ddlClient').change(function () {
        ClientFilter($(this).val())
    });
    $('#ddlYear').on('change', function () {
        // get month from the tab. Get the year from the current fullcalendar date

        var year = $(this).find(":selected").val(),
            month = $('#statuscal').fullCalendar('getDate').format('M');;
        day = d.getDay();
        var m = moment([year, month - 1, day]).format('YYYY-MM-DD');
        ReBindCalendar(year, month);
        //$('#statuscal').fullCalendar('refetchEvents');
        $('#statuscal').fullCalendar('gotoDate', m);
    });
    $('.fc-prev-button').click(function () {
        var year = $('#statuscal').fullCalendar('getDate').format('YYYY'),
            month = $('#statuscal').fullCalendar('getDate').format('M');
        ReBindCalendar(year, month)
    });
    $('.fc-next-button').click(function () {
        var year = $('#statuscal').fullCalendar('getDate').format('YYYY'),
            month = $('#statuscal').fullCalendar('getDate').format('M');
        ReBindCalendar(year, month)
    });
    $('#btnGenerate').click(function () {
        if (validateFilters()) {
            var year = $('#ddlYear').find(":selected").val(),
            month = $('#statuscal').fullCalendar('getDate').format('M');
            day = d.getDay();
            var m = moment([year, month - 1, day]).format('YYYY-MM-DD');
            ReBindCalendar(year, month);
            //$('#statuscal').fullCalendar('refetchEvents');
            $('#statuscal').fullCalendar('gotoDate', m);
        }
    });
});
function BindCalendar(year, month) {
    var companyId = $('#ddlCompany').val();
    var departmentId = $('#ddlDepartment').val();
    var branchId = $('#ddlBranch').val();
    var projectId = $('#ddlProject').val();
    var clientId = $('#ddlClient').val();
    var StrClientIds = "";
    var StrProjectIds = "";
    if (IsProjectlevelrights != 'False') {
        projectId = null;
        clientId = null;
        if ($('#ddlClient').val() == "0") {
            $('#ddlClient > option').each(function () {
                if ($(this).val() != "0") {
                    StrClientIds += $(this).val() + ",";
                }

            });
        }
        else {
            StrClientIds = $('#ddlClient').val();
        }
        if ($('#ddlProject').val() == "0") {
            $('#ddlProject > option').each(function () {
                if ($(this).val() != "0") {
                    StrProjectIds += $(this).val() + ",";
                }

            });
        }
        else {
            StrProjectIds = $('#ddlProject').val();
        }
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: "{ 'month':'" + month + "','year':'" + year + "', 'companyId': '" + companyId + "', 'branchId': '" + branchId + "', 'clientId': '" + clientId + "', 'departmentId': '" + departmentId + "', 'projectId': '" + projectId + "','StrClient': '" + StrClientIds + "','StrProject': '" + StrProjectIds + "' }",
        url: "/DailyAttendanceStatusReport/GetAttendanceStatusList",
        dataType: "json",
        async: false,
        success: function (data) {
            $('div[id*=statuscal]').fullCalendar('removeEvents');
            $('div[id*=statuscal]').fullCalendar({
                header: {
                    left: 'prev,next',
                    center: 'title',
                    right: '',
                },
                displayEventTime: false,
                height: 1025,
                editable: true,
                //timeFormat: 'H:mm',
                eventLimit: 7,
                events: $.map(data, function (item, i) {
                    var event = new Object();
                    event.id = item.ApprovalTypeEnumId;
                    event.title = item.Display + " ( " + item.Count + " )";
                    event.Date = item.Date;
                    event.start = new Date(item.Date);
                    event.end = new Date(item.Date);
                    event.color = item.Color;
                    event.className = 'checkSessionTimeout cursor-pointer';
                    event.startEditable = false;
                    event.eventDurationEditable = false;
                    event.editable = false;
                    return event;
                }),
                eventClick: function (calEvent, jsEvent, view) {
                    var company = $('#ddlCompany').val();
                    var department = $('#ddlDepartment').val();
                    var branch = $('#ddlBranch').val();
                    var project = $('#ddlProject').val();
                    var client = $('#ddlClient').val();
                    var StrClientIdcals = "";
                    var StrProjectIdcals = "";
                    if (IsProjectlevelrights != 'False') {
                        project = null;
                        client = null;
                        if ($('#ddlClient').val() == "0") {
                            $('#ddlClient > option').each(function () {
                                if ($(this).val() != "0") {
                                    StrClientIdcals += $(this).val() + ",";
                                }

                            });
                        }
                        else {
                            StrClientIdcals = $('#ddlClient').val();
                        }
                        if ($('#ddlProject').val() == "0") {
                            $('#ddlProject > option').each(function () {
                                if ($(this).val() != "0") {
                                    StrProjectIdcals += $(this).val() + ",";
                                }

                            });
                        }
                        else {
                            StrProjectIdcals = $('#ddlProject').val();
                        }
                    }
                    $.ajax({
                        type: "POST",
                        contentType: "application/json",
                        dataType: "html",
                        data: "{ 'date':'" + new Date(calEvent.start).toISOString() + "','approvalCode': '" + calEvent.id + "', 'companyId': '" + company + "', 'branchId': '" + branch + "', 'clientId': '" + client + "', 'departmentId': '" + department + "', 'projectId': '" + project + "','StrClient': '" + StrClientIdcals + "','StrProject': '" + StrProjectIdcals + "' }",
                        url: "/DailyAttendanceStatusReport/EmployeeStatusReport",
                        beforeSend: function () {
                            ShowProgress();
                        },
                        success: function (data) {
                            HideProgress();
                            $("#employeeStatusDetails").html(data);
                            $("#myModal").modal();
                            setTimeout(function () {
                                $('#employeeStatusTable').dataTable({
                                    responsive: true,
                                    autoWidth: false,
                                    bLengthChange: false,
                                    bPaginate: true,
                                    bLengthChange: true,
                                    bFilter: true,
                                    bInfo: true,
                                    pagingType: "full_numbers",
                                    bAutoWidth: false,
                                    "oLanguage": {
                                        "oPaginate": {
                                            "sFirst": "<i class='fa fa-chevron-left'></i><i class='fa fa-chevron-left'></i>",
                                            "sLast": "<i class='fa fa-chevron-right'></i><i class='fa fa-chevron-right'></i>",
                                            "sNext": "<i class='fa fa-chevron-right'></i>",
                                            "sPrevious": "<i class='fa fa-chevron-left'></i>"
                                        }
                                    },
                                    "dom": 'T<"row"<"col-sm-6"f><"col-sm-6"l>><"clearfix">rt<"clearfix"><"row"<"col-sm-3"i><"col-sm-9 text-right"<"paggin-wrap"p>>>',
                                });
                            }, 300);

                            //$(".status-detail").toggleClass("col-sm-6").show();
                            //$(".status-dates").toggleClass("col-sm-12 col-sm-6");
                        },
                        error: function () {

                        }
                    });
                },
                disableDragging: true
                ,
                loading: function (bool) {
                    if (bool) $('#loading').show();
                    else $('#loading').hide();
                },
                viewRender: function (view) {
                    //var now = new Date();
                    //var end = new Date();

                    //end.setMonth(now.getMonth() + 11); //Adjust as needed

                    var cal_date_string = view.start.format('YYYY');
                    var cal_date_end_string = view.end.format('YYYY');
                    //var cur_date_string = now.getFullYear();
                    //var end_date_string = end.getFullYear();

                    var month = $('#statuscal').fullCalendar('getDate').format('M')
                    var year = $('#statuscal').fullCalendar('getDate').format('YYYY')

                    var nextYear = parseInt(year) + 1;
                    var prevYear = parseInt(year) - 1;

                    if (parseInt(month) == 1) {
                        if ($("#ddlYear option[value='" + prevYear + "']").length > 0) {
                            $('.fc-prev-button').removeClass("fc-state-disabled").prop('disabled', false);
                        }
                        else {
                            $('.fc-prev-button').addClass("fc-state-disabled").prop('disabled', true);
                        }
                    }
                    else if (parseInt(month) == 12) {
                        if ($("#ddlYear option[value='" + nextYear + "']").length > 0) {
                            $('.fc-next-button').removeClass("fc-state-disabled").prop('disabled', false);
                        }
                        else {
                            $('.fc-next-button').addClass("fc-state-disabled").prop('disabled', true);
                        }
                    }
                    else {
                        $('.fc-prev-button').removeClass("fc-state-disabled").prop('disabled', false);
                        $('.fc-next-button').removeClass("fc-state-disabled").prop('disabled', false);
                    }

                    $('#ddlYear').val(year).trigger('chosen:updated');

                    //if (month == 1) { $('.fc-prev-button').addClass("fc-state-disabled").prop('disabled', true); }
                    //else {
                    //    $('.fc-prev-button').removeClass("fc-state-disabled").prop('disabled', false);
                    //}
                    //if (month == 12) { $('.fc-next-button').addClass("fc-state-disabled").prop('disabled', true); }
                    //else {
                    //    $('.fc-next-button').removeClass("fc-state-disabled").prop('disabled', false);
                    //}
                }
            });
            $(".event-colors").show();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown)
        { }
    }); $('#loading').hide(); $('div[id*=statuscal]').show();
}
function HideProgress() {
    $('.loader-wrapper').css('display', 'none');
}
function ShowProgress() {

    if ($('.loader-wrapper').css('display') == "none") {
        $(".loader-wrapper").show();
    }
}
//function DepartmentFilter(deptId) {
//    $("#ddlProject").val(0);
//    $(".optDepartment").show().removeAttr('disabled');
//    if (parseInt(deptId) != 0) {
//        $(".optDepartment").show().removeAttr('disabled');
//        $("#ddlProject option.Department_" + deptId + ":visible").show().removeAttr('disabled');
//        $(".optDepartment").not(".Department_" + deptId).hide().attr('disabled', 'disabled');
//    }
//    $('#ddlProject').trigger("chosen:updated");
//}
function CompanyFilter(companyId) {
    $("#ddlBranch").val(0);
    //$("#ddlLocation").val(0);
    $(".optBranch").show().removeAttr('disabled');
    //$(".optLocation").show().removeAttr('disabled');

    if (parseInt(companyId) != 0) {
        $(".optBranch").show().removeAttr('disabled');
        $("#ddlBranch option.Company_" + companyId + ":visible").show().removeAttr('disabled');
        $(".optBranch").not(".Company_" + companyId).hide().attr('disabled', 'disabled');

        //$(".optLocation").show().removeAttr('disabled');
        //$("#ddlLocation option.Company_" + companyId + ":visible").show().removeAttr('disabled');
        //$(".optLocation").not(".Company_" + companyId).hide().attr('disabled', 'disabled');
    }

    $('#ddlBranch').trigger("chosen:updated");
    //$('#ddlLocation').trigger("chosen:updated");
}
//function BranchFilter(branchId) {
//    $("#ddlLocation").val(0);
//    $(".optLocation").show().removeAttr('disabled');
//    if (parseInt(branchId) != 0) {
//        $(".optLocation").show().removeAttr('disabled');
//        $("#ddlLocation option.Branch_" + branchId + ":visible").show().removeAttr('disabled');
//        $(".optLocation").not(".Branch_" + branchId).hide().attr('disabled', 'disabled');
//    }
//    $('#ddlLocation').trigger("chosen:updated");
//}
function ClientFilter(clientId) {
    $("#ddlProject").val(0);
    $(".optProject").show().removeAttr('disabled');
    if (parseInt(clientId) != 0) {
        $(".optProject").show().removeAttr('disabled');
        $("#ddlProject option.Client_" + clientId + ":visible").show().removeAttr('disabled');
        $(".optProject").not(".Client_" + clientId).hide().attr('disabled', 'disabled');
    }
    $('#ddlProject').trigger("chosen:updated");
}
function ReBindCalendar(year, month) {
    var companyId = $('#ddlCompany').val();
    var departmentId = $('#ddlDepartment').val();
    var branchId = $('#ddlBranch').val();
    var projectId = $('#ddlProject').val();
    var clientId = $('#ddlClient').val();
    var StrClientrebindIds = "";
    var StrProjectrebindIds = "";
    if (IsProjectlevelrights != 'False') {
        projectId = null;
        clientId = null;
        if ($('#ddlClient').val() == "0") {
            $('#ddlClient > option').each(function () {
                if ($(this).val() != "0") {
                    StrClientrebindIds += $(this).val() + ",";
                }

            });
        }
        else {
            StrClientrebindIds = $('#ddlClient').val();
        }
        if ($('#ddlProject').val() == "0") {
            $('#ddlProject > option').each(function () {
                if ($(this).val() != "0") {
                    StrProjectrebindIds += $(this).val() + ",";
                }

            });
        }
        else {
            StrProjectrebindIds = $('#ddlProject').val();
        }
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: "{ 'month':'" + month + "','year':'" + year + "', 'companyId': '" + companyId + "', 'branchId': '" + branchId + "', 'clientId': '" + clientId + "', 'departmentId': '" + departmentId + "', 'projectId': '" + projectId + "','StrClient': '" + StrClientrebindIds + "','StrProject': '" + StrProjectrebindIds + "' }",
        url: "/DailyAttendanceStatusReport/GetAttendanceStatusList",
        dataType: "json",
        beforeSend: function () {
            ShowProgress();
        },
        success: function (data) {
            HideProgress();
            var events = [];

            $.map(data, function (item, i) {
                var event = new Object();
                event.id = item.ApprovalTypeEnumId;
                event.title = item.Display + " ( " + item.Count + " )";
                event.Date = item.Date;
                event.start = new Date(item.Date);
                event.end = new Date(item.Date);
                event.color = item.Color;
                event.className = 'checkSessionTimeout cursor-pointer';
                event.startEditable = false;
                event.eventDurationEditable = false;
                event.editable = false;
                events.push(event);
            });

            $('div[id*=statuscal]').fullCalendar('removeEvents');
            $('div[id*=statuscal]').fullCalendar('addEventSource', events);
            //if ($(".status-detail").css('display') != 'none') {
            //    $(".status-detail").toggleClass("col-sm-6").hide();
            //    $(".status-dates").toggleClass("col-sm-12 col-sm-6");
            //}
        },
        error: function (XMLHttpRequest, textStatus, errorThrown)
        { }
    }); $('#loading').hide(); $('div[id*=statuscal]').show();
}
function validateFilters() {
    var company = $('#ddlCompany').val();
    var department = $('#ddlDepartment').val();
    var branch = $('#ddlBranch').val();
    var project = $('#ddlProject').val();
    var client = $('#ddlClient').val();
    if (company == '' || company == 0) {
        toastr.clear()
        toastr.error("Please select company");
        return false;
    }
    else if ((department == '' || department == 0) && (branch == '' || branch == 0) && (project == '' || project == 0) && (client == '' || client == 0)) {
        toastr.clear()
        toastr.error("When company is selected any one of the other filters must also be selected");
        return false;
    }
    else {
        return true;
    }
}
function getLatestRequestDate() {

    var latestRequestDate = LatestRequestDate;

    var splitDate = latestRequestDate.split('/');

    var result = new Date(splitDate[2], splitDate[0] - 1, splitDate[1]);

    return result;
}