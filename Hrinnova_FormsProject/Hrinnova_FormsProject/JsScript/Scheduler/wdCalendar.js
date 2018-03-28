var view;

var theme;


var autoload;

var readonly;

var showImportDataOption;

function InitializeSchedulerOptions() {

    var currentUrl = window.location.pathname;

    var pageName = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

    var Url = pageName + '/InitializeSchedulerControl';
    //  alert("AutoLoad1");
    $.ajax({

        type: 'POST',

        url: Url,

        async: false,

        contentType: 'application/json; charset=utf-8',

        data: '{}',

        dataType: "json",

        success: function (data) {
            // alert(data);

            view = data.d.View;

            theme = data.d.Theme;

            autoload = data.d.AutoLoad;

            readonly = data.d.ReadOnly;

            showImportDataOption = data.d.ShowImportDataOption;
        },
        error: function (data) {
            alert("Error Loading Option Data");
        }
    });
}

$(document).ready(function () {

    //alert("hellio");
    //alert($('#HiddenDt').val());
    InitializeSchedulerOptions();

    var DATA_FEED_URL = "../Handlers/SchedulerHandler.ashx";
    //  alert("AutoLoad");
    var op = {
        view: view,
        theme: theme,
        showday: new Date(),
        EditCmdhandler: Edit,
        DeleteCmdhandler: Delete,
        ViewCmdhandler: View,
        onWeekOrMonthToDay: wtd,
        onBeforeRequestData: cal_beforerequest,
        onAfterRequestData: cal_afterrequest,
        onRequestDataError: cal_onerror,
        autoload: autoload,
        readonly: readonly,
        //url: DATA_FEED_URL + "?method=list&readonly=" + readonly,
        url: DATA_FEED_URL + "?method=list",
        quickAddUrl: DATA_FEED_URL + "?method=add",
        quickUpdateUrl: DATA_FEED_URL + "?method=update",
        quickDeleteUrl: DATA_FEED_URL + "?method=remove"
    };
    // alert(readonly);
    var $dv = $("#calhead");
    var _MH = document.documentElement.clientHeight;
    var dvH = $dv.height() + 2;
    op.height = _MH - dvH;
    op.eventItems = [];
    //   alert(op.eventItems);

    var p = $("#gridcontainer").bcalendar(op).BcalGetOp();
    if (p && p.datestrshow) {
        $("#txtdatetimeshow").html(p.datestrshow + "&nbsp; <i class='fa fa-calendar' style='position: relative;top:-2px'></i>");
    }
    $("#caltoolbar").noSelect();

    $("#hdtxtshow").datepicker({
        picker: "#txtdatetimeshow", showtarget: $("#txtdatetimeshow"),
        onReturn: function (r) {
            var p = $("#gridcontainer").gotoDate(r).BcalGetOp();
            if (p && p.datestrshow) {
                $("#txtdatetimeshow").html(p.datestrshow + "&nbsp; <i class='fa fa-calendar' style='position: relative;top:-2px'></i>");
            }
        }
    });
    // alert(view);
    view = "month";
    if (view == "day") {

        $("#caltoolbar div.fcurrent").each(function () {
            $(this).removeClass("fcurrent");
        });

        $("#showdaybtn").addClass("fcurrent");
        var p = $("#gridcontainer").swtichView("day").BcalGetOp();
        if (p && p.datestrshow) {
            $("#txtdatetimeshow").html(p.datestrshow + "&nbsp; <i class='fa fa-calendar' style='position: relative;top:-2px'></i>");
        }
    }
    else if (view == "week") {

        $("#caltoolbar div.fcurrent").each(function () {
            $(this).removeClass("fcurrent");
        });

        $("#showweekbtn").addClass("fcurrent");
        var p = $("#gridcontainer").swtichView("week").BcalGetOp();
        if (p && p.datestrshow) {
            $("#txtdatetimeshow").html(p.datestrshow + "&nbsp; <i class='fa fa-calendar' style='position: relative;top:-2px'></i>");
        }
    }
    else if (view == "month") {

        $("#caltoolbar div.fcurrent").each(function () {
            $(this).removeClass("fcurrent");
        });

        $("#showmonthbtn").addClass("fcurrent");
        var p = $("#gridcontainer").swtichView("month").BcalGetOp();
        if (p && p.datestrshow) {
            $("#txtdatetimeshow").html(p.datestrshow + "&nbsp; <i class='fa fa-calendar' style='position: relative;top:-2px'></i>");
        }
    }

    function cal_beforerequest(type) {
        var t = "Loading data...";
        switch (type) {
            case 1:
                t = "Loading data...";
                break;
            case 2:
            case 3:
            case 4:
                t = "The request is being processed ...";
                break;
        }
        $("#errorpannel").hide();
        $("#loadingpannel").html(t).show();
    }
    function cal_afterrequest(type) {
        // alert(type);
        switch (type) {
            case 1:
                $("#loadingpannel").hide();
                break;
            case 2:
            case 3:
            case 4:
                //$("#loadingpannel").html("Success!");
                toastr.success("Delete Training Successfully");
                window.setTimeout(function () { $("#loadingpannel").hide(); }, 2000);
                break;
        }

    }
    function cal_onerror(type, data) {
        $("#errorpannel").show();
    }
    function Edit(data, str) {
        //var eurl = "edit.aspx?id={0}&start={2}&end={3}&isallday={4}&title={1}";
        //alert(new Date(data[2]).toDateString());
        var eventDate = new Date(data[2]);
        var dateStr = (eventDate.getMonth() + 1) + "/" + eventDate.getDate() + "/" + eventDate.getFullYear();
        var eurl = "AddSchedulerEvent.aspx?id={0}";
        if (data) {
            var url = StrFormat(eurl, data);


            //OpenModelWindow(url, {
            //    width: 800, height: 500, caption: "Update Event (" + dateStr + ")", onclose: function () {
            //        $("#gridcontainer").reload();

            //    }
            //});
            var page = StrFormat(eurl, data);
            $('#AddEventWrap').show();
            $('#AddEventWrap').html('<iframe  src="' + page + '" class="col-md-12" ></iframe>');

        }
    }
    function View(data) {
        //alert("DATA  = " + data);
        var str = "";
        $.each(data, function (i, item) {
            str += "[" + i + "]: " + item + "\n";
        });
        //  alert(str);

    }
    function Delete(data, callback) {
      
        $.alerts.okButton = "Ok";
        $.alerts.cancelButton = "Cancel";
        if (confirm("Are you sure you want to delete this event?")) { callback(0); };
    }
    function wtd(p) {
        if (p && p.datestrshow) {
            $("#txtdatetimeshow").html(p.datestrshow + "&nbsp; <i class='fa fa-calendar' style='position: relative;top:-2px'></i>");
        }
        $("#caltoolbar div.fcurrent").each(function () {
            $(this).removeClass("fcurrent");
        });
        $("#showdaybtn").addClass("fcurrent");
    }
    //to show day view
    $("#showdaybtn").click(function (e) {
        //document.location.href="#day";
        $("#caltoolbar div.fcurrent").each(function () {
            $(this).removeClass("fcurrent");
        });
        $(this).addClass("fcurrent");
        var p = $("#gridcontainer").swtichView("day").BcalGetOp();
        if (p && p.datestrshow) {
            $("#txtdatetimeshow").html(p.datestrshow + "&nbsp; <i class='fa fa-calendar' style='position: relative;top:-2px'></i>");
        }
    });
    //to show week view
    $("#showweekbtn").click(function (e) {
        //alert("week");
        //document.location.href="#week";
        $("#caltoolbar div.fcurrent").each(function () {
            $(this).removeClass("fcurrent");
        });
        $(this).addClass("fcurrent");
        var p = $("#gridcontainer").swtichView("week").BcalGetOp();
        if (p && p.datestrshow) {
            $("#txtdatetimeshow").html(p.datestrshow + "&nbsp; <i class='fa fa-calendar' style='position: relative;top:-2px'></i>");
        }

    });
    //to show month view
    $("#showmonthbtn").click(function (e) {
        //document.location.href="#month";
        $("#caltoolbar div.fcurrent").each(function () {
            // alert("HI");
            $(this).removeClass("fcurrent");
        });
        $(this).addClass("fcurrent");
        var p = $("#gridcontainer").swtichView("month").BcalGetOp();
        if (p && p.datestrshow) {
            $("#txtdatetimeshow").html(p.datestrshow + "&nbsp; <i class='fa fa-calendar' style='position: relative;top:-2px'></i>");
        }
    });

    $("#showreflashbtn").click(function (e) {
        $("#gridcontainer").reload();
    });

    //Add a new event
    $("#faddbtn").click(function (e) {

        $.getJSON("/TrainingDetail/checkSessionTimeout")
            .done(function (data) {

                if (data) {
                    //var url = "AddSchedulerEvent.aspx";

                    //OpenModelWindow(url, {
                    //    width: 800, height: 500, caption: "Add Event", onclose: function () {
                    //        $("#gridcontainer").reload();
                    //    }
                    //});
                    var page = "../Admin/AddSchedulerEvent.aspx";
                    $('#AddEventWrap').show();
                    $('#AddEventWrap').html('<iframe  src="' + page + '" class="col-md-12" ></iframe>');
                }
                else {
                    window.location.reload();
                }
            })
              .fail(function () {
                  window.location.reload();
              });
    });


    //Import Excel Sheet
    $("#importExcelButton").click(function (e) {
        // var url = "../Admin/TrainingCalendarImportData.aspx";
        var url = "../Admin/CalendarImpData.aspx";
        //var url = "TestImpData.aspx";
        OpenModelWindow(url, {
            width: 850, height: 445, caption: "Import Training Information", onclose: function () {
                window.close();

            }
        });
    });


    $("#internalTrainerButton").click(function (e) {

        $.getJSON("/TrainingDetail/checkSessionTimeout")
            .done(function (data) {
                if (data) {
                    // var url = "/TrainingDetail/AddInternalTrainer";
                    var page = "/TrainingDetail/AddInternalTrainer";
                    $('#AddTrainerWrap').show();
                    $('#AddTrainerWrap').html('<iframe  src="' + page + '" class="col-md-12" ></iframe>');

                    //OpenModelWindow(url, {
                    //    width: 800, height: 500, caption: "Add Internal Trainer Information", onclose: function () {
                    //        window.close();
                    //    }
                    //});
                }
                else {
                    window.location.reload();
                }
            })
            .fail(function (data) {
                window.location.reload();
            });


    });


    //go to today
    $("#showtodaybtn").click(function (e) {
        //  alert("HI2");
        var p = $("#gridcontainer").gotoDate().BcalGetOp();
        if (p && p.datestrshow) {
            $("#txtdatetimeshow").html(p.datestrshow + "&nbsp; <i class='fa fa-calendar' style='position: relative;top:-2px'></i>");
        }
    });
    //previous date range
    $("#sfprevbtn").click(function (e) {
        var p = $("#gridcontainer").previousRange().BcalGetOp();
        if (p && p.datestrshow) {
            $("#txtdatetimeshow").html(p.datestrshow + "&nbsp; <i class='fa fa-calendar' style='position: relative;top:-2px'></i>");
        }
    });
    //next date range
    $("#sfnextbtn").click(function (e) {
        var p = $("#gridcontainer").nextRange().BcalGetOp();
        if (p && p.datestrshow) {
            $("#txtdatetimeshow").html(p.datestrshow + "&nbsp; <i class='fa fa-calendar' style='position: relative;top:-2px'></i>");
        }
    });

});