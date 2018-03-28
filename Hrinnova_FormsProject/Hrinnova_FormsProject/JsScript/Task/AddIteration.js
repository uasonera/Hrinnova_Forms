$(document).ready(function () {
    $("#txtIterationName").keyup(function () {
        $("#ErrTitle").html('');
    });
   
    if (IterationID == 0) {
        $("#txtPlannedStartDate").datepicker({
            changeMonth: false,
            changeYear: false,
            showWeek: false,
            firstDay: 1,
            showOn: "focus",
            //buttonImage: "../images/datepicker.gif",
            //buttonImageOnly: true,
            dateFormat: 'mm/dd/yy'
        });
    }
    $('#plan_start').click(function () {
        $("#txtPlannedStartDate").focus();
    });
    $("#txtPlannedEndDate").change(function () {
        $("#dvReason").show();
    });
    if ($("#txtPlannedStartDate").val() != '' && IterationID != 0)
        InitializeEndDate($("#txtPlannedStartDate").val());


    $("#txtPlannedStartDate").on("change", function () {
        InitializeEndDate($("#txtPlannedStartDate").val());
    });
    function InitializeEndDate(StartDate) {
        $("#txtPlannedEndDate").datepicker("destroy");
        $("#txtPlannedEndDate").datepicker({
            minDate: StartDate,
            changeMonth: false,
            changeYear: false,
            showWeek: false,
            firstDay: 1,
            showOn: "focus",
            //buttonImage: "../images/datepicker.gif",
            //buttonImageOnly: true,
            dateFormat: 'mm/dd/yy'
        });
        $('#plan_end').click(function () {
            $("#txtPlannedEndDate").focus();
        });
    }
   



    $(".SaveIteration").click(function () {
        var IsEdit = $(this).data("isedit");
        var NameExist = false;
        var $form = $(this).closest('form');
        console.log($form.valid());        
        if (Curr_EndDate != $("#txtPlannedEndDate").val() && $("#txtReason").val() == "") {
            $("#ReasonValidation").show();
            return false;
        }
        else if($("#txtPlannedStartDate").val()=="")
        {
            $("#ValPlannedStartDate").addClass("field-validation-error").html('Please select Planned Start Date');
            
            return false;
        }
        else if ($("#txtPlannedEndDate").val() == "") {
            
            $("#ValPlannedEndDate").addClass("field-validation-error").html('Please select Planned End Date');
            return false;
        }
        else if ($form.valid()) {
            $("#ReasonValidation").hide();
            $("#ValPlannedEndDate").removeClass("field-validation-error").html('');
            $("#ValPlannedEndDate").removeClass("field-validation-error").html('');
            $.ajax({
                type: "POST",
                url: "/Task/CheckIfSprintNameAlreadyExist",
                data: '{ "SprintName":"' + $("#txtIterationName").val() + '","SprintID": ' + IterationID + ',"ProjectId":' + ProjectId + '}',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    if (data) {
                        $("#ValPlannedStartDate").addClass("field-validation-error").html("Title already exists. Please choose different Title").css('color', 'red');
                        NameExist = true;
                    }
                }
            });
            if (!NameExist) {
                formData = new FormData($form[0]);
                formData.append("TaskId", TaskId);
                
                if (Curr_EndDate != $("#txtPlannedEndDate").val() && Curr_EndDate != null && Curr_EndDate != "" && IterationID != 0) {
                    $.ajax({
                        type: "POST",
                        url: urlSaveEndDateHistory,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        data: "{'OldEndDate':'" + Curr_EndDate + "','UpdatedEndDate':'" + $("#txtPlannedEndDate").val() + "','Reason':'" + $("#txtReason").val() + "','IterationId':'" + IterationID + "'}",
                        success: function (data) {
                            if (!data.Success)
                                toastr.error("Found error while saving iteration history");
                        }
                    });
                }
                $.ajax({
                    type: "POST",
                    url: urlSaveIteration,
                    //data: "{'TaskID':'" + TaskId + "','SprintName':'" + SprintName + "','SprintDescription':'" + SprintDescription + "','StartDate':'" + SprintPlannedStartDate + "','EndDate':'" + SprintPlannedEndDate + "'}",
                    data: $form.serialize(),
                    success: function (data) {

                        if (window.location.href.toLowerCase().indexOf("plansprint") > 0 && IterationID != 0) {

                            $('#AddIterationModal').modal('toggle');
                            if (IsEdit == "false" || IsEdit == false) {
                                toastr.success($("#txtIterationName").val() + " has been started successfully");
                                $.ajax({
                                    type: "POST",
                                    url: urlMarkActiveSprint,
                                    dataType: 'html',
                                    data: "{'ProjectId':'" + ProjectId + "','SprintId':'" + IterationID + "','CurrentSprint':'" + $("#drpSprintTypes").val() + "','IsIteration':'" + true + "'}",
                                    contentType: "application/json; charset=utf-8",
                                    success: function (data) {
                                        $('#SprintRightPanel').html(data);
                                        bindAllEvents();
                                    }
                                });
                            }
                            else {
                                toastr.success($("#txtIterationName").val() + " has been updated successfully");
                                var CurrentSprint = $("#drpSprintTypes").val();
                                $.ajax({
                                    type: "POST",
                                    url: urlGetSprintByType,
                                    dataType: 'html',
                                    data: "{'CurrentSprint':'" + CurrentSprint + "','ProjectId':'" + ProjectId + "'}",
                                    contentType: "application/json; charset=utf-8",
                                    success: function (data) {
                                        $('#SprintRightPanel').html(data);
                                        bindAllEvents();
                                    }
                                });
                            }
                        }
                        else if (window.location.href.toLowerCase().indexOf("plansprint") > 0 && IterationID == 0) {

                            toastr.success($("#txtIterationName").val() + " has been saved successfully");
                            $('#AddIterationModal').modal('toggle');
                            var CurrentSprint = $("#drpSprintTypes").val();
                            $.ajax({
                                type: "POST",
                                url: urlGetSprintByType,
                                dataType: 'html',
                                data: "{'CurrentSprint':'" + CurrentSprint + "','ProjectId':'" + ProjectId + "'}",
                                contentType: "application/json; charset=utf-8",
                                success: function (data) {
                                    $('#SprintRightPanel').html(data);
                                    bindAllEvents();
                                }
                            });
                        }
                        else if (window.location.href.toLowerCase().indexOf("projectsummary") > 0 && IterationID != 0) {
                            $('#dvSprintdialog').modal('toggle');
                            if (IsEdit == "false" || IsEdit == false) {
                                toastr.success($("#txtIterationName").val() + " has been started successfully");
                                $.ajax({
                                    type: "POST",
                                    url: urlMarkActiveSprint,
                                    dataType: 'html',
                                    data: "{'ProjectId':'" + ProjectId + "','SprintId':'" + IterationID + "','CurrentSprint':''}",
                                    contentType: "application/json; charset=utf-8",
                                    success: function (data) {
                                        var url = window.location.href.toString().replace('#', '');
                                        window.location = url;
                                    }
                                });
                            }
                            else {
                                toastr.success($("#txtIterationName").val() + " has been updated successfully");
                                var url = window.location.href.toString().replace('#', '');
                                window.location = url;
                            }
                        }
                        else if (window.location.href.toLowerCase().indexOf("projectsummary") > 0 && IterationID == 0) {
                            toastr.success($("#txtIterationName").val() + " has been saved successfully");
                            $('#AddIterationModal').modal('toggle');
                            var url = window.location.href.toString().replace('#', '');
                            window.location = url;
                        }
                        else {
                            $('#AddIterationModal').modal('toggle');
                        }
                    }
                });
            }
        }
    });
});