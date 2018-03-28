$(document).ready(function () {

    $('#drpWorkEvent').chosen();
    $('#cboHours').chosen();
    $('#cboMinutes').chosen();
    verifyTimesheetEntry($(".Entry"));
    $("#txtWorkDate").datepicker({

        showOn: "focus",
        //buttonImage: "../images/datepicker.gif",
        //buttonImageOnly: true,
        dateFormat: 'mm/dd/yy',
        maxDate: new Date()

    });

    $('#txtWorkDate_btn').click(function () {
        $("#txtWorkDate").focus();
    });
    $('#fromdate').click(function () {
        $("#txtFromDate").focus();
    });
    $("#txtWorkDate").datepicker("setDate", new Date());
    $("#txtWorkDate").on("keydown", function () {
        return false;
    });

    $("#workDesc").keypress(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            var s = $(this).val();
            $(this).val(s + "\n");
        }
    })

    $(".Entry").click(function () {
        verifyTimesheetEntry($(this));
    });
    function verifyTimesheetEntry(element) {
        if (element.is(":checked")) {
            $("#dvTimesheet").show();
        }
        else {
            $("#dvTimesheet").hide();
        }
    }
    $(".DateField").change(function () {

        $.ajax({
            type: "POST",
            url: "/Task/CheckFreezingDate",
            data: '{"EntryDate":"' + $(this).val() + '"}',
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $(".chkWFH").prop("disabled", !data.WFHAllowed);
            }
        });
    });
    $.ajax({
        type: "POST",
        url: "/Task/GetEstimatedHours",
        data: '{"TaskId":' + $("#WBSID").val() + '}',
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        success: function (data) {


        }
    });
    $(".clsSubmitEntry").unbind("click");
    $(".clsSubmitEntry").click(function () {
        ValidateDynamicContent($(this));
        var formData = null;
        var $form = $(this).closest('form');
        var WbsidForTimesheet = $("#Wbsid").val();
        var isValidForm = false;
        var isWorkEventValid = false;
        isValidForm = $form.valid();
        isWorkEventValid = validateWorkEvent();
        if (isValidForm && isWorkEventValid) {
            var ActualHour = parseInt($('#cboHours').val());
            var ActualMin = parseInt($('#cboMinutes').val());
            var TotalActualMinute = (ActualHour * 60) + ActualMin;
            $('#_Minutes').val(TotalActualMinute);
            formData = new FormData($form[0]);
            var isWFH = $(".chkWFH").is(":checked");
            $.ajax({
                type: "POST",
                url: $form.attr('action'),
                data: formData,
                //traditional: true,
                contentType: false,
                processData: false,
                success: function (data) {

                    if (data.Success)
                        $('#TimesheetModal').modal('toggle');
                    toastr.success("Timesheet entry has been successfully saved.");
                    if (window.location.href.toString().toLowerCase().indexOf("dashboard") > 0) {
                        var sprintId = $("#ddlSprint").val();
                        var projectID = $("#ProjectID").val();
                        if (TemplateId == Enum_Scrum_ProjectType) {
                            $.ajax({
                                type: "POST",
                                url: urlGetSprintData,
                                data: '{ "ProjectId": "' + projectID + '","SprintId": "' + sprintId + '","isRecentUpdate":"false"}',
                                dataType: "html",
                                contentType: "application/json; charset=utf-8",
                                success: function (data) {
                                    $("#txtSearch").val('');
                                    $("#dvDashboard").html(data);
                                    $("#dvNewTaskStatus").hide();
                                    $("#lnkAddStatus").show();

                                    var storyId = $(".timesheet-" + WbsidForTimesheet).data('story');
                                    if (storyId != "") {
                                        if ($('.story-' + storyId) != undefined) {
                                            $("span.add").not($(this)).removeClass('current');
                                            $("#story-" + storyId).toggleClass('current');
                                            $(".data-show").hide();
                                            if ($("#story-" + storyId).hasClass('current'))
                                                $(".story-" + storyId).show('slow');
                                            else
                                                $(".story-" + storyId).hide('slow');
                                        }
                                    }

                                    //bindAddTask();
                                    //initializeEvents();

                                },
                                error: function (response) {
                                    //alert(response.responseText);
                                },
                                complete: function (data) {
                                    //console.log(data);
                                }
                            });
                        }
                    }
                }
            });
        }
    });
    $('#drpWorkEvent').change(function () {
        var workEventType = $(this).val();
        if (workEventType == 0 || workEventType == '') {
            $('#workEventValidMessage').css("display", "block");
        }
        else {
            $('#workEventValidMessage').css("display", "none");
        }
    });
});
function ValidateDynamicContent(element) {
    var currForm = element.closest("form");
    if (currForm.length > 0) {
        currForm.removeData("validator");
        currForm.removeData("unobtrusiveValidation");
        $.validator.unobtrusive.parse(currForm);
        currForm.validate(); // This line is important and added for client side validation to trigger, without this it didn't fire client side errors.
    } else {
        $.validator.unobtrusive.parse(element);//parse div content for validation

    }
}
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}
function validateWorkEvent() {
    var status = true;
    var IsWorkItem = true;
    var IsActualHour = true;
    var strErrorMessage = '';
    var workEventType = $('#drpWorkEvent').val();
    if (workEventType == 0 || workEventType == '') {
        $('#workEventValidMessage').css("display","block");
        status = false;
        IsWorkItem = false;
    }
    if ($("#cboHours").val() == "0" && $("#cboMinutes").val() == "0") {
        $('#ActualhourValidMessage').css("display", "block");
        status = false;
        IsActualHour = false;
    }
    
    if (status == false) {
        if (!IsWorkItem)
        {
            $('#workEventValidMessage').css("display", "block");
        }
        if (!IsActualHour)
        {
            $('#ActualhourValidMessage').css("display", "block");
        }
       
    }
    else
    {
        $('#workEventValidMessage').css("display", "none");
        $('#ActualhourValidMessage').css("display", "none");
        status = true;
    }
    return status;
}
