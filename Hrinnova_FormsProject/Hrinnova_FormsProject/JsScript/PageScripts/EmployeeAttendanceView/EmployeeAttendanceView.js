$(document).ready(function () {
    var currentYear = $("#SelectedYear option:last").val();
    $('#SelectedYear').val(currentYear).trigger('chosen:updated');
    var TodayDate = new Date();
    var currentMonth = TodayDate.getMonth() + 1;
    $('#SelectedMonth').val(currentMonth).trigger('chosen:updated');
    $('#SubordinateEmpId').val('').trigger('chosen:updated');
    //$('#SelectedMonth,#SelectedYear').change(function () {
    //    BindAttendanceView();
    //    counter_progress();
    //})

    $('#SubordinateEmpId').change(function () {
        BindYear();
    })

    function BindYear() {
        var SelectedEmpId = $('#SubordinateEmpId').val();
        $.ajax({
            url: '/attendanceview/BindYear',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify({ SelectedEmpId: SelectedEmpId }),
            dataType: 'json',
            async: false,
            success: function (result) {
                $('#SelectedYear').html(""); // clear before appending new list 
                //$('#SelectedYear').append($('<option></option>').val("").html("Please Select Year"));
                $.each(result, function (i, year) {
                    $('#SelectedYear').append(
                        $('<option></option>').val(year.Value).html(year.Text));
                });
                $('#SelectedYear').trigger('chosen:updated');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText)
            }
        });
    }
    $(document).on('click', '#btnSearch', function () {
      
        var IsSession = false;
        ShowProgress();
        $.ajax({
            url: '/AttendanceView/checkSessionTimeout',
            type: 'GET',
            contentType: 'application/json;charset=utf-8',
            async: false,
            dataType: 'json',
            success: function (data) {
                //ShowProgress();
                if (data) {
                    IsSession = true;
                    
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText)
            }
        });
        if (IsSession) {
            var Valid = ValidateAttendanceFiltration();
            if (Valid) {
                setTimeout(function () { BindAttendanceView() },20)
                //counter_progress();
            }
        }
        else {
            window.location.reload();
        }
        

    })

    /*Start Popup*/
    $(document).on('click', '.workingHour', function () {
        var IsSession = false;
        $.ajax({
            url: '/AttendanceView/checkSessionTimeout',
            type: 'GET',
            contentType: 'application/json;charset=utf-8',
            async: false,
            dataType: 'json',
            success: function (data) {
                if (data) {
                    IsSession = true;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText)
            }
        });
        if (IsSession) {
            var datatarget = $(this).attr('data-target');
            var dataAttendanceDate = $(this).attr('data-AttendanceDate');
            var TotalworkingHr = $(this).attr('data-TotalworkingHr');
            var SelectedEmpId = $('#SubordinateEmpId').val();
            if (SelectedEmpId == null) {
                SelectedEmpId = 0
            }
            $("#workingHour").modal('show');
            $.ajax({
                url: '/AttendanceView/GetWorkingHour',
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                async: false,
                data: JSON.stringify({ SelectedDate: dataAttendanceDate, TotalworkingHr: TotalworkingHr, SelectedEmpId: SelectedEmpId }),
                dataType: 'html',
                success: function (data) {
                    if (data) {
                        $('#workinghourmodal').empty();
                        $('#workinghourmodal').html(data);
                    }
                    else {

                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.responseText)
                }
            });
        }
        else {
            window.location.reload();
        }

    })
    $(document).on('click', '.BreakHourTime', function () {
        var IsSession = false;
        $.ajax({
            url: '/AttendanceView/checkSessionTimeout',
            type: 'GET',
            contentType: 'application/json;charset=utf-8',
            async: false,
            dataType: 'json',
            success: function (data) {
                if (data) {
                    IsSession = true;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText)
            }
        });
        if (IsSession) {
            var datatarget = $(this).attr('data-target');
            var dataAttendanceDate = $(this).attr('data-AttendanceDate');
            var TotalBreakingHr = $(this).attr('data-TotalBreakingHr');
            var SelectedEmpId = $('#SubordinateEmpId').val();
            if (SelectedEmpId == null) {
                SelectedEmpId = 0
            }
            $("#breaktime").modal('show');
            $.ajax({
                url: '/AttendanceView/GetBreakingHour',
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                async: false,
                data: JSON.stringify({ SelectedDate: dataAttendanceDate, TotalBreaktimeHr: TotalBreakingHr, SelectedEmpId: SelectedEmpId }),
                dataType: 'html',
                success: function (data) {
                    if (data) {
                        $('#breaktimemodal').empty();
                        $('#breaktimemodal').html(data);
                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.responseText)
                }
            });
        }
        else {
            window.location.reload();
        }

    })
    $(document).on('click', '.PenltyPoint', function () {
        var IsSession = false;
        $.ajax({
            url: '/AttendanceView/checkSessionTimeout',
            type: 'GET',
            contentType: 'application/json;charset=utf-8',
            async: false,
            dataType: 'json',
            success: function (data) {
                if (data) {
                    IsSession = true;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText)
            }
        });
        if (IsSession) {
            var datatarget = $(this).attr('data-target');
            var dataAttendanceDate = $(this).attr('data-AttendanceDate');
            var TotalPenalty = $(this).attr('data-TotalPenalty');
            var SelectedEmpId = $('#SubordinateEmpId').val();
            if (SelectedEmpId == null) {
                SelectedEmpId = 0
            }
            $("#penaltydetails").modal('show');
            $.ajax({
                url: '/AttendanceView/GetPenaltyDetails',
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                async: false,
                data: JSON.stringify({ SelectedDate: dataAttendanceDate, TotalPenalty: parseInt(TotalPenalty), SelectedEmpId: SelectedEmpId }),
                dataType: 'html',
                success: function (data) {
                    if (data) {
                        $('#penaltydetailsmodal').empty();
                        $('#penaltydetailsmodal').html(data);
                    }
                    else {

                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.responseText)
                }
            });
        }
        else {
            window.location.reload();
        }
    })
    /*End Popup*/

    $(document).on('click', '.ApplyTimesheet', function () {
        var AttendanceDate = $(this).closest('tr').find('#AttendanceDate').text().trim();
        $.ajax({
            type: "POST",
            url: '../Admin/Timeoffrequest.aspx/GetEncryptedURL',
            data: "{'WFH':false,'Date':'" + moment(AttendanceDate, "DD/MM/YYYY").format('DD MMM YYYY') + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                window.open('../Admin/' + data.d, '_blank');
            }
        });
    })

    //$(document).on('click', '.InOutMapView', function () {
    //    var EmpId = $(this).attr('data-EmpId');
    //    var Date = $(this).attr('data-Date');
    //    var url = "/InOutMapView/Index?EmpId=" + EmpId + "&Date=" + Date;
    //    window.open(url, "_blank");
    //    //window.location.href = url;
    //});
})

function BindAttendanceView() {

    var SelectedEmpId = $('#SubordinateEmpId').val();
    var FromDate = $(".drpMonths").val().split(',')[0];
    var ToDate = $(".drpMonths").val().split(',')[1];
    if (SelectedEmpId == null) {
        SelectedEmpId = 0
    }
    GetMonthlyAttendanceView(SelectedEmpId, FromDate, ToDate);
    //$.ajax({
    //    url: '/AttendanceView/GetMonthlyAttendanceView',
    //    type: 'POST',
    //    //contentType: 'application/json;charset=utf-8',
    //    cache: false,
    //    //async: false,
    //    data: { SelectedMonth: 0, SelectedEmpId: SelectedEmpId, SelectedYear: 0,FromDate:FromDate,ToDate:ToDate },
    //    dataType: 'html',
    //    beforeSend: function () {
    //        //ShowProgress();
    //    },
    //    success: function (data) {
    //        //HideProgress();
    //        if (data) {
    //            $('#MonthlyAttendance').empty();
    //            $('#MonthlyAttendance').html(data)
    //        }
    //    },
    //    error: function (jqXHR, textStatus, errorThrown) {
    //        console.log(jqXHR.responseText)
    //        //HideProgress();
    //    }
    //});
    //$.ajax({
    //    url: '/AttendanceView/GetAvgHoursDetails',
    //    type: 'POST',
    //    contentType: 'application/json;charset=utf-8',
    //    async: false,
    //    data: JSON.stringify({ SelectedMonth: 0, SelectedEmpId: SelectedEmpId, SelectedYear: 0, FromDate: FromDate, ToDate: ToDate }),
    //    dataType: 'html',
    //    beforeSend: function () {
    //        //ShowProgress();
    //    },
    //    success: function (data) {
    //        if (data) {
    //            $('#divAvgHours').empty();
    //            $('#divAvgHours').html(data);
    //            counter_progress();
    //        }
    //        //HideProgress();
    //    },
    //    error: function (jqXHR, textStatus, errorThrown) {
    //        console.log(jqXHR.responseText)
    //        //HideProgress();
    //    }
    //});
    //$.ajax({
    //    url: '/AttendanceView/GetAttendanceViewSummary',
    //    type: 'POST',
    //    contentType: 'application/json;charset=utf-8',
    //    async: false,
    //    data: JSON.stringify({ SelectedMonth: 0, SelectedEmpId: SelectedEmpId, SelectedYear: 0, FromDate: FromDate, ToDate: ToDate }),
    //    dataType: 'html',
    //    beforeSend: function () {
    //        //ShowProgress();
    //    },
    //    success: function (data) {
    //        if (data) {
    //            $('#divSummary').empty();
    //            $('#divSummary').html(data);
    //        }
    //        setTimeout(function () { HideProgress() }, 20)
    //        //HideProgress();
    //    },
    //    error: function (jqXHR, textStatus, errorThrown) {
    //        console.log(jqXHR.responseText)
    //        //HideProgress();
    //    }
    //});
}
function ValidateAttendanceFiltration() {
    $('.validation-summary-valid').html('');
    $('.validation-summary-valid').empty();
    var errorMessage = "";
    var status = true;
    $('#errorMessage').empty();

    if ($('#SelectedYear').val() == null) {
        errorMessage += "<li>Please Select Year </li>";
        status = false;
    }

    if (status == false && errorMessage != null) {
        $('.validation-summary-valid').addClass('alert alert-danger');
        $('.validation-summary-valid').html("<ul>" + errorMessage + "</ul>");
    }

    return status;
}
function HideProgress() {
    $('.loader-wrapper').css('display', 'none');
}

function ShowProgress() {

    if ($('.loader-wrapper').css('display') == "none") {
        $(".loader-wrapper").show();
    }
}
function GetMonthlyAttendanceView(SelectedEmpId, FromDate, ToDate) {
    $.ajax({
        url: '/AttendanceView/GetMonthlyAttendanceView',
        type: 'POST',
        //contentType: 'application/json;charset=utf-8',
        //cache: false,
        async: false,
        beforeSend: function () {

        },
        data: { SelectedMonth: 0, SelectedEmpId: SelectedEmpId, SelectedYear: 0, FromDate: FromDate, ToDate: ToDate },
        dataType: 'html',
        success: function (data) {
            if (data) {
                $('#MonthlyAttendance').empty();
                $('#MonthlyAttendance').html(data)

            }
            
            GetAvgHoursDetails(SelectedEmpId, FromDate, ToDate);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText)
        }
    });
}
function GetAvgHoursDetails(SelectedEmpId, FromDate, ToDate) {
    $.ajax({
        url: '/AttendanceView/GetAvgHoursDetails',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        data: JSON.stringify({ SelectedMonth: 0, SelectedEmpId: SelectedEmpId, SelectedYear: 0, FromDate: FromDate, ToDate: ToDate }),
        dataType: 'html',
        success: function (data) {
            if (data) {
                $('#divAvgHours').empty();
                $('#divAvgHours').html(data);
                counter_progress();
            }
            GetAttendanceViewSummary(SelectedEmpId, FromDate, ToDate)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText)
        }
    });
}
function GetAttendanceViewSummary(SelectedEmpId, FromDate, ToDate) {
    $.ajax({
        url: '/AttendanceView/GetAttendanceViewSummary',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        data: JSON.stringify({ SelectedMonth: 0, SelectedEmpId: SelectedEmpId, SelectedYear: 0, FromDate: FromDate, ToDate: ToDate }),
        dataType: 'html',
        success: function (data) {
            if (data) {
                $('#divSummary').empty();
                $('#divSummary').html(data);
            }
            setTimeout(function () { HideProgress() }, 20)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText)
        }
    });
}