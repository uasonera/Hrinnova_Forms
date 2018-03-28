$(document).ready(function () {
    $('#drpAttendee').multiselect({
        enableFiltering: true,
        numberDisplayed: 1,
        filterBehavior: 'text',
        includeSelectAllOption: true,
        enableCaseInsensitiveFiltering: true,
        buttonWidth: '100%',
        disableIfEmpty: true,
        templates: {
            filter: '<li class="multiselect-item filter"><div class="input-group"><input class="form-control multiselect-search" type="text"></div></li>',
            filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default multiselect-clear-filter" type="button"><i class="glyphicon glyphicon-remove-circle"></i></button></span>',


        },
        onChange: function (element, checked) {
            if (checked === true) {
                //alert($(element).text())
                $("#selectedattendee").append('<label class="label-primary label" style="margin-left: 5px;">' + $(element).text() + ' <i class="fa fa-close cursor-pointer removeSelectedTag" data-id="' + $(element).val() + '" id="Attendee_' + $(element).val() + '"></i></label>')

                //action taken here if true
            }
            else if (checked === false) {
                $("#Attendee_" + $(element).val()).parent().remove();

            }
        },
        onSelectAll: function () {

            //$('#drpAttendee > option').each(function () {
            //    if (!$(this).attr('disabled')) {
            //        $("#selectedattendee").append('<label class="label-primary label" style="margin-left: 5px;">' + $(this).text() + ' <i class="fa fa-close cursor-pointer removeSelectedTag" data-id="' + $(this).val() + '" id="Attendee_' + $(this).val() + '"></i></label>')
            //    }
            //});
            $("#selectedattendee").html('');
            $('.multiselect-container.dropdown-menu > li').not('.filter').not('.multiselect-all').each(function () {
                if ($(this).hasClass('active') && !$(this).attr('disabled')) {
                    var EmpTextName = $(this).find('label').html();
                    var EmpTextId = $(this).find('input').val();
                    $("#selectedattendee").append('<label class="label-primary label" style="margin-left: 5px;">' + EmpTextName + ' <i class="fa fa-close cursor-pointer removeSelectedTag" data-id="' + EmpTextId + '" id="Attendee_' + EmpTextId + '"></i></label>')
                }
            });
        },
        onDeselectAll: function () {
            $("#selectedattendee").html('');
            $('.multiselect-container.dropdown-menu > li').not('.filter').not('.multiselect-all').each(function () {
                if ($(this).hasClass('active') && !$(this).attr('disabled')) {
                    var EmpTextName = $(this).find('label').html();
                    var EmpTextId = $(this).find('input').val();
                    $("#selectedattendee").append('<label class="label-primary label" style="margin-left: 5px;">' + EmpTextName + ' <i class="fa fa-close cursor-pointer removeSelectedTag" data-id="' + EmpTextId + '" id="Attendee_' + EmpTextId + '"></i></label>')
                }
            });
        },
        maxHeight: 200,
    });
    BindTrainerMultiSelect();
    $('#drpTrainee').multiselect({
        enableFiltering: true,
        numberDisplayed: 1,
        filterBehavior: 'text',
        includeSelectAllOption: true,
        enableCaseInsensitiveFiltering: true,
        buttonWidth: '100%',
        disableIfEmpty: true,
        templates: {
            filter: '<li class="multiselect-item filter"><div class="input-group"><input class="form-control multiselect-search" type="text"></div></li>',
            filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default multiselect-clear-filter" type="button"><i class="glyphicon glyphicon-remove-circle"></i></button></span>',


        },
        onChange: function (element, checked) {
            if (checked === true) {
                //alert($(element).text())
                $("#selectedTrainee").append('<label class="label-primary label" style="margin-left: 5px;">' + $(element).text() + ' <i class="fa fa-close cursor-pointer removeSelectedTag" data-id="' + $(element).val() + '" id="Trainee_' + $(element).val() + '"></i></label>')
                $('#drpTrainer option[value="' + $(element).val() + '"]').prop('disabled', true);
                $('#drpTrainer option[value="' + $(element).val() + '"]').parent('li').addClass('disabled');
                $('#drpTrainer').multiselect('refresh');
                //action taken here if true
            }
            else if (checked === false) {
                $("#Trainee_" + $(element).val()).parent().remove();
                $('#drpTrainer option[value="' + $(element).val() + '"]').prop('disabled', false);
                $('#drpTrainee option[value="' + $(element).val() + '"]').parent('li').removeClass('disabled');
                $('#drpTrainer').multiselect('refresh');
            }
        },
        onSelectAll: function () {
            //$('#drpTrainee > option').each(function () {
            //    if (!$(this).attr('disabled')) {
            //        $("#selectedTrainee").append('<label class="label-primary label" style="margin-left: 5px;">' + $(this).text() + ' <i class="fa fa-close cursor-pointer removeSelectedTag" data-id="' + $(this).val() + '" id="Trainee_' + $(this).val() + '"></i></label>')
            //    }

            //});
            $("#selectedTrainee").html('');
            $('.divDrpTrainee .multiselect-container.dropdown-menu > li').not('.filter').not('.multiselect-all').each(function () {
                if ($(this).hasClass('active') && !$(this).attr('disabled')) {
                    var EmpTextName = $(this).find('label').html();
                    var EmpTextId = $(this).find('input').val();
                    $("#selectedTrainee").append('<label class="label-primary label" style="margin-left: 5px;">' + EmpTextName + ' <i class="fa fa-close cursor-pointer removeSelectedTag" data-id="' + EmpTextId + '" id="Trainee_' + EmpTextId + '"></i></label>')
                }
            });
        },
        onDeselectAll: function () {
            $("#selectedTrainee").html('');
            $('.divDrpTrainee .multiselect-container.dropdown-menu > li').not('.filter').not('.multiselect-all').each(function () {
                if ($(this).hasClass('active') && !$(this).attr('disabled')) {
                    var EmpTextName = $(this).find('label').html();
                    var EmpTextId = $(this).find('input').val();
                    $("#selectedattendee").append('<label class="label-primary label" style="margin-left: 5px;">' + EmpTextName + ' <i class="fa fa-close cursor-pointer removeSelectedTag" data-id="' + EmpTextId + '" id="Attendee_' + EmpTextId + '"></i></label>')
                }
            });
        },
        maxHeight: 200,
    });

    $('#selectedattendee').on('click', '.removeSelectedTag', function () {
        var id = $(this).attr('data-id');
        $('#Attendee_' + id).parent().remove();
        $('#drpAttendee').multiselect('deselect', id);
        $('#drpAttendee').multiselect('refresh');
    });
    $('#selectedTrainer').on('click', '.removeSelectedTag', function () {
        var id = $(this).attr('data-id');
        $('#Trainer_' + id).parent().remove();
        $('#drpTrainer').multiselect('deselect', id);
        $('#drpTrainer').multiselect('refresh');
        $('#drpTrainee option[value="' + id + '"]').prop('disabled', false);
        $('#drpTrainee option[value="' + id + '"]').parent('li').removeClass('disabled');
        $('#drpTrainee').multiselect('refresh');
    });
    $('#selectedTrainee').on('click', '.removeSelectedTag', function () {
        var id = $(this).attr('data-id');
        $('#Trainee_' + id).parent().remove();
        $('#drpTrainee').multiselect('deselect', id);
        $('#drpTrainee').multiselect('refresh');
        $('#drpTrainer option[value="' + id + '"]').prop('disabled', false);
        $('#drpTrainer option[value="' + id + '"]').parent('li').removeClass('disabled');
        $('#drpTrainer').multiselect('refresh');
    });

    //chosen_init();
    /**************** custome scroll ********************/
    custome_scroll_init();
    /************ Modal body scroller  **************/
    //modal_body_init();
    var Eventtype = $("#ddlEventtype").val();
    var TrainingDetailId = $("#TrainingDetailId").val();
    var IsEntire = $("#IsForEntire").val();
    var IsSingleInstance = $("#IsForSingleInstance").val();
    ShowHideTrainingActivitycolumn(Eventtype);
    ShowhideOccurencttypeEvent($('input[name=Occurencttype]:checked').val());
    if ($("#Isonpremise").is(':checked')) {
        $('.hidelocation').show(); // Shows
        $('.hidevenue').show();
        $('.showtxtvenue').hide();
    }
    else {
        $('.hidelocation').hide(); // Shows
        $('.hidevenue').hide();
        $('.showtxtvenue').show();
    }
    $('#Isforday').click(function () {
        $('#ddlweekdaytype').prop('disabled', true);
        $('#ddlweekdayname').prop('disabled', true);
        $('#txtDayOfEveryMonth').prop('disabled', false);
    });
    $('#Isfornoweekday').click(function () {
        $('#ddlweekdaytype').prop('disabled', false);
        $('#ddlweekdayname').prop('disabled', false);
        $('#txtDayOfEveryMonth').prop('disabled', true);
    });
    /*Resolved :- For Trainees / Attendees, select all option should be available*/
    $('#selectAllAttendees').click(function () {
        if (this.checked) {
            $('#drpAttendee option').prop('selected', true);
        }
        else {
            $('#drpAttendee option').prop('selected', false);
        }
        $('#drpAttendee').trigger("chosen:updated");
    });
    $('#selectAllTrainees').click(function () {
        if (this.checked) {
            $('#drpTrainee option').prop('selected', true);
        }
        else {
            $('#drpTrainee option').prop('selected', false);
        }
        $('#drpTrainee').trigger("chosen:updated");
    });
    /*Resolved :- For Trainees / Attendees, select all option should be available*/
    var TrainingDetailId = $('#TrainingDetailId').val();
    /*Load Training Topic*/
    LoadTopicNames();
    /*Load Employee List*/
    //LoadEmployeeList();
    var TrainingType = $("#ddlTrainingResourceType").val();
    if (TrainingType == 2) {
        $("#training-required").text("*");
    }
    else {
        $("#training-required").text("");
    }
    /* Initialization Of DatePicker and TimePicker */
    if (TrainingDetailId == "") {
        $('#stpartdate').datepicker().datepicker("setDate", new Date());
        $('#etpartdate').datepicker().datepicker("setDate", new Date());
        $("#etpartdate").datepicker('setStartDate', $('#stpartdate').val());
    }
    var ToDate = $("#etpartdate").val();
    $('#stparttime').timepicker({
        defaultTime: '00:00',
        minuteStep: 30,
        showInputs: false,
        disableFocus: true,
        showMeridian: false
    });
    $('#etparttime').timepicker({
        defaultTime: '00:00',
        minuteStep: 30,
        showInputs: false,
        disableFocus: true,
        showMeridian: false
    });

    $("#stpartdate").change(function () {
        var startDate = $("#stpartdate").val();
        startDate = moment(startDate).format("MM/DD/YYYY");
        $("#etpartdate").datepicker('setStartDate', startDate);

    });
    $("#etpartdate").change(function () {
    });
    /* End Initialization Of DatePicker and TimePicker */

    /* Load All Dropdown on change*/
    //LoadTrainingCategoryAndStatusList()
    /* End Load All Dropdown on change*/
    /*Load ConferenceRoom on change */
    $("select[id*='ddlConferenceRoom']").append(new Option('Select', 'Select'));
    $("select[id*='drpLocation']").change(function () {
        if ($(this).val() != 'Select') {
            LoadConferenceRoomList($(this).val());
        }
        else {
            $("select[id*='ddlConferenceRoom']").empty();
            $("select[id*='ddlConferenceRoom']").append(new Option('Select', 'Select'));
        }

    });
    /*End ConferenceRoom on change */
    /*Start : Load Trainer when change the training Type*/
    $("#ddlTrainingResourceType").change(function () {
        var TrainingType = $("#ddlTrainingResourceType").val();
        if (TrainingType == 2) {
            $(".hideCompany").hide();
            $(".hideDept").hide();
            $(".hideRole").hide();
        }
        else {
            $(".hideCompany").show();
            $(".hideDept").show();
            $(".hideRole").show();
        }
        BindTrainerByTrainingType(TrainingType);
    });

    /*Load Event Details*/

    if (TrainingDetailId != '') {
        // LoadEventDetails(TrainingDetailId);
    }
    else {
        $('#ddlTrainingStatus > option').each(function () {
            if (this.text.trim() == 'Completed') {
                this.remove();
                $('#ddlTrainingStatus').trigger("chosen:updated");
            }
        });
    }
    /*Click Event For Add/Edit Training*/
    $("#btnAddTraining").click(function () {
        AddUpdateEvent();
    });
    $("#btnSaveSingleInstance").click(function () {
        AddUpdateEventSingleInstance();
    });

    $("#Closebtn").click(function () {
        location.href = "http://" + location.host + "/trainingcalendar/index";
        ClearForm();
    });
    /*Load Selected Date*/
    // getalldates();
    /*change event is used for to disabled selected employee from trainee*/
    $("#drpTrainer").on('change', function (event, params) {
        //var Iddrp = $(this).val();
        //var TextOfdrp = $("#drpTrainer option:selected").text();
        //if (TrainingType != 2) {
        //    if (params.selected) {
        //        var idselected = $("#drpTrainee").find('option[value="' + params.selected + '"]');
        //        if (idselected.val() == params.selected) {
        //            $("#drpTrainee").find('option[value="' + params.selected + '"]').attr('disabled', 'disabled');
        //            $("#drpTrainee").trigger('chosen:updated');
        //        }
        //    }
        //    if (params.deselected != undefined) {
        //        var iddeselected = $("#drpTrainee").find('option[value="' + params.deselected + '"]');
        //        if (iddeselected.val() == params.deselected) {
        //            $("#drpTrainee").find('option[value="' + params.deselected + '"]').removeAttr('disabled');
        //            $("#drpTrainee").trigger('chosen:updated');
        //        }
        //    }
        //}

    });
    /*******change event is used for to disabled selected employee from trainer*****/
    $("#drpTrainee").on('change', function (event, params) {
        //var Iddrp = $(this).val();
        //var TextOfdrp = $("#drpTrainee option:selected").text();
        //if (TrainingType != 2) {
        //    if (params.selected) {
        //        var idselected = $("#drpTrainer").find('option[value="' + params.selected + '"]');
        //        if (idselected.val() == params.selected) {
        //            $("#drpTrainer").find('option[value="' + params.selected + '"]').attr('disabled', 'disabled');
        //            $("#drpTrainer").trigger('chosen:updated');
        //        }
        //    }
        //    if (params.deselected != undefined) {
        //        var iddeselected = $("#drpTrainer").find('option[value="' + params.deselected + '"]');
        //        if (iddeselected.val() == params.deselected) {
        //            $("#drpTrainer").find('option[value="' + params.deselected + '"]').removeAttr('disabled');
        //            $("#drpTrainer").trigger('chosen:updated');
        //        }
        //    }
        //}

    });

    $("#ddlEventtype").on('change', function () {
        var Id = $("#ddlEventtype").val();
        ClearForm();
        ShowHideTrainingActivitycolumn(Id);
    });
    $('input[name=Occurencttype]').on('click', function () {
        var Id = $(this).val();
        ShowhideOccurencttypeEvent(Id);
    });
    $('input[name=Isforpremise]').on('click', function () {
        //  var Id = $(this).val();
        if ($("#Isonpremise").is(':checked')) {
            $('.hidelocation').show(); // Shows
            $('.hidevenue').show();
            $('.showtxtvenue').hide();
        }
        else {
            $('.hidelocation').hide(); // Shows
            $('.hidevenue').hide();
            $('.showtxtvenue').show();
        }
        // ShowHideVenueorLocation(Id);
    });

    /*Filter based on Company Designation Department*/
    //Attendees
    $("#ddlDepartmentattendee").change(function () {
        var DepartmentId = $("#ddlDepartmentattendee").val();
        var CompanyId = $("#ddlcompanyattendee").val();
        var DesignationId = $("#ddlDesignationattendee").val();
        if (DepartmentId == "") {
            DepartmentId = 0;
        }
        if (CompanyId == "") {
            CompanyId = 0;
        }
        if (DesignationId == "") {
            DesignationId = 0;
        }
        LoadEmployeeListForDeptFilter(DepartmentId, CompanyId, DesignationId);


    });
    $("#ddlcompanyattendee").change(function () {
        var DepartmentId = $("#ddlDepartmentattendee").val();
        var CompanyId = $("#ddlcompanyattendee").val();
        var DesignationId = $("#ddlDesignationattendee").val();
        if (DepartmentId == "") {
            DepartmentId = 0;
        }
        if (CompanyId == "") {
            CompanyId = 0;
        }
        if (DesignationId == "") {
            DesignationId = 0;
        }
        LoadEmployeeListForDeptFilter(DepartmentId, CompanyId, DesignationId);


    });
    $("#ddlDesignationattendee").change(function () {
        var DepartmentId = $("#ddlDepartmentattendee").val();
        var CompanyId = $("#ddlcompanyattendee").val();
        var DesignationId = $("#ddlDesignationattendee").val();
        if (DepartmentId == "") {
            DepartmentId = 0;
        }
        if (CompanyId == "") {
            CompanyId = 0;
        }
        if (DesignationId == "") {
            DesignationId = 0;
        }
        LoadEmployeeListForDeptFilter(DepartmentId, CompanyId, DesignationId);
    });
    //Trainer
    $("#ddlDepartmenttrainer").change(function () {
        var DepartmentId = $("#ddlDepartmenttrainer").val();
        var CompanyId = $("#ddlcompanytrainer").val();
        var DesignationId = $("#ddlDesignationtrainer").val();
        if (DepartmentId == "") {
            DepartmentId = 0;
        }
        if (CompanyId == "") {
            CompanyId = 0;
        }
        if (DesignationId == "") {
            DesignationId = 0;
        }
        LoadTrainerEmployeeListForDeptFilter(DepartmentId, CompanyId, DesignationId);


    });
    $("#ddlcompanytrainer").change(function () {
        var DepartmentId = $("#ddlDepartmenttrainer").val();
        var CompanyId = $("#ddlcompanytrainer").val();
        var DesignationId = $("#ddlDesignationtrainer").val();
        if (DepartmentId == "") {
            DepartmentId = 0;
        }
        if (CompanyId == "") {
            CompanyId = 0;
        }
        if (DesignationId == "") {
            DesignationId = 0;
        }
        LoadTrainerEmployeeListForDeptFilter(DepartmentId, CompanyId, DesignationId);


    });
    $("#ddlDesignationtrainer").change(function () {
        var DepartmentId = $("#ddlDepartmenttrainer").val();
        var CompanyId = $("#ddlcompanytrainer").val();
        var DesignationId = $("#ddlDesignationtrainer").val();
        if (DepartmentId == "") {
            DepartmentId = 0;
        }
        if (CompanyId == "") {
            CompanyId = 0;
        }
        if (DesignationId == "") {
            DesignationId = 0;
        }
        LoadTrainerEmployeeListForDeptFilter(DepartmentId, CompanyId, DesignationId);
    });
    //Trainee
    $("#ddlDepartmentattendee").change(function () {
        var DepartmentId = $("#ddlDepartmenttrainee").val();
        var CompanyId = $("#ddlcompanytrainee").val();
        var DesignationId = $("#ddlDesignationtrainee").val();
        if (DepartmentId == "") {
            DepartmentId = 0;
        }
        if (CompanyId == "") {
            CompanyId = 0;
        }
        if (DesignationId == "") {
            DesignationId = 0;
        }
        LoadTraineeEmployeeListForDeptFilter(DepartmentId, CompanyId, DesignationId);
    });
    $("#ddlcompanytrainee").change(function () {
        var DepartmentId = $("#ddlDepartmenttrainee").val();
        var CompanyId = $("#ddlcompanytrainee").val();
        var DesignationId = $("#ddlDesignationtrainee").val();
        if (DepartmentId == "") {
            DepartmentId = 0;
        }
        if (CompanyId == "") {
            CompanyId = 0;
        }
        if (DesignationId == "") {
            DesignationId = 0;
        }
        LoadTraineeEmployeeListForDeptFilter(DepartmentId, CompanyId, DesignationId);


    });
    $("#ddlDesignationtrainee").change(function () {
        var DepartmentId = $("#ddlDepartmenttrainee").val();
        var CompanyId = $("#ddlcompanytrainee").val();
        var DesignationId = $("#ddlDesignationtrainee").val();
        if (DepartmentId == "") {
            DepartmentId = 0;
        }
        if (CompanyId == "") {
            CompanyId = 0;
        }
        if (DesignationId == "") {
            DesignationId = 0;
        }
        LoadTraineeEmployeeListForDeptFilter(DepartmentId, CompanyId, DesignationId);
    });
    /*End Filter*/
    $('#btnBackToCalendarLink').click(function () {
        location.href = "http://" + location.host + "/trainingcalendar/index";
    });
    ShowHideTrainingActivityForSingleInstance(Eventtype, IsSingleInstance, TrainingDetailId);
});


/*validate date function*/
function ValidateDate(date) {
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (!date_regex.test(date)) {
        return false
    }
    return true
}
function LoadTrainingCategoryAndStatusList() {
    var trainingDetailId = $('#TrainingDetailId').val();
    $.ajax({
        url: '/AddEditEvent/TrainingCategoryStatusList',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify({ TrainingDetailId: trainingDetailId }),
        dataType: 'json',
        async: false,
        success: function (result) {
            $("#ddlTrainingCategory").html(""); // clear before appending new list 
            $("#ddlTrainingCategory").append($('<option></option>').val("").html("Select Category"));
            $.each(result, function (i, category) {
                $("#ddlTrainingCategory").append(
                    $('<option></option>').val(category.TrainingCategoryId).html(category.CategoryName));
            });
            $('#ddlTrainingCategory').trigger("chosen:updated");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log(jqXHR.responseText)
        }
    });
    return true
}

function LoadConferenceRoomList(LocationId) {
    $.ajax({

        url: "/AddEditEvent/GetConforenceRoomList",
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ LocationId: LocationId }),
        dataType: 'json',
        async: false,
        success: function (data) {
            $("#ddlConferenceRoom").html(""); // clear before appending new list 
            $("#ddlConferenceRoom").append($('<option></option>').val("").html("Select"));
            $.each(data, function (i, conference) {
                $("#ddlConferenceRoom").append(
                    $('<option></option>').val(conference.ConferenceRoomId).html(conference.ConferenceRoomName));
            });
            $('#ddlConferenceRoom').trigger("chosen:updated");
        },
        error: function (data) {
        }
    });
}
/*Start : Get all date when change the date*/
function getalldates() {
    var startDate = new Date($("#stpartdate").val());
    var stopDate = new Date($("#etpartdate").val());
    var dateArray = new Array();
    dateArray = getDates(startDate, stopDate);

    var strstring = '';
    var counter = 0;
    if (dateArray.length > 0) {
        strstring += "<ul class='clearfix training-dates-list list-inline list-unstyled'>";
        for (var i = 0; i < dateArray.length; i++) {
            //console.log(dateArray[i]);
            counter += 1;
            var currentDate1 = new Date(dateArray[i]);
            var currentDate = ("0" + (parseInt(currentDate1.getMonth()) + 1)).slice(-2) + '/' + ("0" + (currentDate1.getDate())).slice(-2) + '/' + currentDate1.getFullYear();
            var currentDateId = ("0" + (parseInt(currentDate1.getMonth()) + 1)).slice(-2) + ("0" + (currentDate1.getDate())).slice(-2) + currentDate1.getFullYear();

            //if (counter % 3 == 1)


            if (counter == 1 || counter % 3 == 1) {
                strstring += "<li class='no-margin'>";
                var ischeck = false;
                if ($("#chk_" + currentDateId.toString()).length > 0) {
                    if ($("#chk_" + currentDateId.toString()).is(":checked"))
                        ischeck = true;
                }
                if (ischeck)
                    strstring += "<div class='checkbox checkbox-primary '><input Text='" + currentDate + "' type='checkbox' value=" + currentDate + " checked='checked' id='chk_" + currentDateId + "'/></div></div>";
                else
                    strstring += "<div class='checkbox checkbox-primary '><input Text='" + currentDate + "' type='checkbox' value=" + currentDate + " id='chk_" + currentDateId + "'/></div></div>";
            }
            else if (counter % 3 == 2) {
                strstring += "<li  class='no-margin'>";
                var ischeck = false;
                if ($("#chk_" + currentDateId.toString()).length > 0) {
                    if ($("#chk_" + currentDateId.toString()).is(":checked"))
                        ischeck = true;
                }
                if (ischeck)
                    strstring += "<div class='checkbox checkbox-primary'><input Text='" + currentDate + "' type='checkbox' value=" + currentDate + " checked='checked' id='chk_" + currentDateId + "'/></div></div>";
                else
                    strstring += "<div class='checkbox checkbox-primary'><input Text='" + currentDate + "' type='checkbox' value=" + currentDate + " id='chk_" + currentDateId + "'/></div></div>";
            }
            else if (counter % 3 == 0) {
                strstring += "<li  class='no-margin'>";
                var ischeck = false;
                if ($("#chk_" + currentDateId.toString()).length > 0) {
                    if ($("#chk_" + currentDateId.toString()).is(":checked"))
                        ischeck = true;
                }
                if (ischeck)
                    strstring += "<div class='checkbox checkbox-primary '><input Text='" + currentDate + "' type='checkbox' value=" + currentDate + " checked='checked' id='chk_" + currentDateId + "'/></div></div>";
                else
                    strstring += "<div class='checkbox checkbox-primary '><input Text='" + currentDate + "' type='checkbox' value=" + currentDate + " id='chk_" + currentDateId + "'/></div></div>";

            }

            //if (counter % 3 == 0) {
            //strstring += "</li>";
            // counter = 0;
            //}
        }
        strstring += "</ul>";

        $("#dvTrainingDates").html(strstring);
        setupCheckboxes();

        if ($("#hdnTrainingDates").val() != -1) {
            var trainingdates = new Array();
            trainingdates = $("#hdnTrainingDates").val().split(',');
            for (var i = 0; i < trainingdates.length; i++) {
                var chkids = trainingdates[i];
                chkids = chkids.replace(/\//g, '');
                $("#chk_" + chkids).attr('checked', 'checked');
            }
            $("#hdnTrainingDates").val(-1);
        }

        var url = parent.window.location.href;
        var splitUrl = url.split("?");
        if (splitUrl.length > 1) {
            $(".infocontainer :input").prop("disabled", true);
        }
    }
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate))
        currentDate = moment(currentDate).add("days", 1);
    }
    return dateArray;
}
/*End : Get all date when change the date*/

/*Start :Autp bind of TopicNames */
function LoadTopicNames() {
    var url = "/AddEditEvent/LoadTrainingTopicList";;
    $.ajax({
        type: 'POST',
        url: url,
        async: false,
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (data) {
            var topicName = new Array();
            for (var i = 0; i < data.length; i++) {

                topicName.push(data[i]);
            }
            BindTopicNameAutoComplete(topicName);

        },
        error: function (data) {
        }
    });

}
/*End :Autp bind of TopicNames */

function BindTrainerByTrainingType(TrainingType) {
    var url = "/AddEditEvent/LoadEmployeebyTrainingtype";
    $.ajax({
        url: url,
        data: { TrainingType: TrainingType },
        type: 'POST',
        async: false,
        success: function (data) {
            if (data.length > 0) {
                var trainername = new Array();
                var trainerlist = new Array();
                for (var i = 0; i < data.length; i++) {

                    if (data[i].IsInternalTrainer == true && data[i].TrainingType == '1' && data[i].TrainerType == '1') {
                        trainername.push(data[i].EmployeeName);
                        trainerlist.push(data[i]);
                    }
                    else if (data[i].IsInternalTrainer == false && data[i].TrainingType == '2' && data[i].TrainerType == '2') {
                        trainername.push(data[i].EmployeeName);
                        trainerlist.push(data[i]);
                    }
                }
                var newtrainerlist = trainerlist;
                $("#drpTrainer").html(""); // clear before appending new list 
                $('#drpTrainer').multiselect('rebuild');
                
                $.each(newtrainerlist, function (i, Trainer) {
                    var objectTrainer = Trainer;
                    var TextTrainer = objectTrainer.EmployeeName;
                    var ValueTrainer = objectTrainer.EmployeeId;
                    $("#drpTrainer").append($('<option></option>').val(ValueTrainer).html(TextTrainer));
                });
                $('#drpTrainer').multiselect('rebuild');
                $("#selectedTrainer").html('');
                //$('#drpTrainer').trigger("chosen:updated");
                //$("#drpTrainer").html(""); // clear before appending new list 
                //$.each(data, function (i, Trainer) {

                //    $("#drpTrainer").append($('<option class=' + Trainer.EmployeeId + '></option>').val(Trainer.EmployeeId).html(Trainer.EmployeeName));
                //});
                //$('#drpTrainer').trigger("chosen:updated");
                //$('#drpTrainer').multiselect('refresh');
            }

        },
        error: function (data) {

        }
    });

    if (TrainingType == 2) {
        $("#training-required").text("*");
    }
    else {
        $("#training-required").text("");
    }
}

function BindTopicNameAutoComplete(topicName) {
    if (topicName.length > 0) {
        $(document).ready(function () {
            $("#txtTrainingTopic").autocomplete({
                source: topicName
            });
        });
    }
}

function LoadEmployeeList() {
    var eventid = $('#TrainingDetailId').val();
    var DepartmentID = 0;
    if (eventid == "") {
        eventid = 0
    }
    var postData = JSON.stringify(
                            {
                                employeeListRequest:
                                  {
                                      DepartmentId: null,

                                      DesignationId: null,

                                      LocationId: null,

                                      IsEmployeeList: true,

                                      eventid: eventid
                                  }
                            }
                        );
    var url = "/AddEditEvent/LoadEmployeeListForTraineeTrainer"
    $.ajax({
        url: url,
        data: JSON.stringify({ EventDetailId: eventid, DepartmentId: DepartmentID }),
        type: 'POST',
        async: false,
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (data) {
            $("#drpTrainer").empty();
            $("#drpTrainee").empty();
            if (data.length > 0) {
                var traineename = new Array();
                var trainername = new Array();

                var trainerlist = new Array();
                var traineelist = new Array();

                for (var i = 0; i < data.length; i++) {

                    if (data[i].TrainingType == '1') {
                        traineename.push(data[i].EmployeeName);
                        traineelist.push(data[i]);
                    }

                    if (data[i].IsInternalTrainer == true && data[i].TrainingType == '1' && data[i].TrainerType == '1') {
                        trainername.push(data[i].EmployeeName);
                        trainerlist.push(data[i]);
                    }
                    else if (data[i].IsInternalTrainer == false && data[i].TrainingType == '2' && data[i].TrainerType == '2') {
                        trainername.push(data[i].EmployeeName);
                        trainerlist.push(data[i]);
                    }
                }
            }
            var newData = traineelist;
            $("#drpTrainee").html(""); // clear before appending new list 
            $.each(newData, function (index, Trainee) {
                var objectTrainee = Trainee;
                if (objectTrainee != undefined) {
                    var TextTrainee = objectTrainee.EmployeeName;
                    var ValueTrainee = objectTrainee.EmployeeId;
                    var classTrainee = "Dept_" + objectTrainee.DepartmentID
                    $("#drpTrainee").append($('<option class=' + classTrainee + '></option>').val(ValueTrainee).html(TextTrainee));
                }
            });
            $('#drpTrainee').trigger("chosen:updated");

            var newtrainerlist = trainerlist;
            $("#drpTrainer").html(""); // clear before appending new list 
            $.each(newtrainerlist, function (i, Trainer) {
                var objectTrainer = Trainer;
                var TextTrainer = objectTrainer.EmployeeName;
                var ValueTrainer = objectTrainer.EmployeeId;
                $("#drpTrainer").append($('<option></option>').val(ValueTrainer).html(TextTrainer));
            });
            $('#drpTrainer').trigger("chosen:updated");
        },
        error: function (data) {
        }
    });

}


function LoadEmployeeListForDeptFilter(DepartmentId, CompanyId, DesignationId) {
    if (DepartmentId == 0 && CompanyId == 0 && DesignationId == 0) {
        $('ul.multiselect-container li.multiselect-all').css('display', 'block');
        $("#drpAttendee option").show().removeAttr('disabled');
        $('#drpAttendee').multiselect("refresh");
    }
    else {
        $('ul.multiselect-container li.multiselect-all').css('display', 'block');
        $("#drpAttendee option").show().removeAttr('disabled');
        $('#drpAttendee').multiselect("refresh");
        if (CompanyId != 0) {
         //   $('ul.multiselect-container li.multiselect-all').css('display', 'none');
            $("#drpAttendee option.Company_" + CompanyId + ":visible").show().removeAttr('disabled');
            $("#drpAttendee option").not(".Company_" + CompanyId).hide().attr('disabled', 'disabled');
            $('#drpAttendee').multiselect("refresh");
        }
        if (DepartmentId != 0) {
         //   $('ul.multiselect-container li.multiselect-all').css('display', 'none');
            $("#drpAttendee option.Dept_" + DepartmentId + ":visible").show().removeAttr('disabled');
            $("#drpAttendee option").not(".Dept_" + DepartmentId).hide().attr('disabled', 'disabled');
            $('#drpAttendee').multiselect("refresh");
        }
        if (DesignationId != 0) {
           // $('ul.multiselect-container li.multiselect-all').css('display', 'none');
            $("#drpAttendee option.Role_" + DesignationId + ":visible").show().removeAttr('disabled');
            $("#drpAttendee option").not(".Role_" + DesignationId).hide().attr('disabled', 'disabled');
            $('#drpAttendee').multiselect("refresh");
        }
        if (DesignationId != 0 || DepartmentId != 0 || CompanyId != 0)
        {
            $('ul.multiselect-container li.multiselect-all').css('display', 'none');
            $('#drpAttendee').multiselect("refresh");
        }
    }
    $('#drpAttendee').multiselect("refresh");
    // $('#drpAttendee').trigger("chosen:updated");
}

function LoadTrainerEmployeeListForDeptFilter(DepartmentId, CompanyId, RoleId) {
    if (DepartmentId == 0 && CompanyId == 0 && RoleId == 0) {
        $("#drpTrainer option").show().removeAttr('disabled');
        $('#drpTrainer').multiselect("refresh");
    }
    else {
        $("#drpTrainer option").show().removeAttr('disabled');
        if (CompanyId != 0) {
            $("#drpTrainer option.CompanyTr_" + CompanyId + ":visible").show().removeAttr('disabled');
            $("#drpTrainer option").not(".CompanyTr_" + CompanyId).hide().attr('disabled', 'disabled');
            $('#drpTrainer').multiselect('refresh');
        }
        if (DepartmentId != 0) {
            $("#drpTrainer option.DeptTr_" + DepartmentId + ":visible").show().removeAttr('disabled');
            $("#drpTrainer option").not(".DeptTr_" + DepartmentId).hide().attr('disabled', 'disabled');
            $('#drpTrainer').multiselect('refresh');
        }
        if (RoleId != 0) {
            $("#drpTrainer option.RoleTr_" + RoleId + ":visible").show().removeAttr('disabled');
            $("#drpTrainer option").not(".RoleTr_" + RoleId).hide().attr('disabled', 'disabled');
            $('#drpTrainer').multiselect('refresh');
        }
    }
    //$('#drpTrainer').trigger("chosen:updated");
    $('#drpTrainer').multiselect("refresh");
}

function LoadTraineeEmployeeListForDeptFilter(DepartmentId, CompanyId, RoleId) {
    if (DepartmentId == 0 && CompanyId == 0 && RoleId == 0) {
        $('ul.multiselect-container li.multiselect-all').css('display', 'block');
        $("#drpTrainee option").show().removeAttr('disabled');
        $('#drpTrainee').multiselect("refresh");
    }
    else {
        $('ul.multiselect-container li.multiselect-all').css('display', 'block');
        $("#drpTrainee option").show().removeAttr('disabled');
        $('#drpTrainee').multiselect("refresh");
        if (CompanyId != 0) {
            $('ul.multiselect-container li.multiselect-all').css('display', 'none');
            $("#drpTrainee option.Company_" + CompanyId + ":visible").show().removeAttr('disabled');
            $("#drpTrainee option").not(".Company_" + CompanyId).hide().attr('disabled', 'disabled');
            $('#drpTrainee').multiselect("refresh");
        }
        if (DepartmentId != 0) {
            $('ul.multiselect-container li.multiselect-all').css('display', 'none');
            $("#drpTrainee option.Dept_" + DepartmentId + ":visible").show().removeAttr('disabled');
            $("#drpTrainee option").not(".Dept_" + DepartmentId).hide().attr('disabled', 'disabled');
            $('#drpTrainee').multiselect("refresh");
        }
        if (RoleId != 0) {
            $('ul.multiselect-container li.multiselect-all').css('display', 'none');
            $("#drpTrainee option.Role_" + RoleId + ":visible").show().removeAttr('disabled');
            $("#drpTrainee option").not(".Role_" + RoleId).hide().attr('disabled', 'disabled');
            $('#drpTrainee').multiselect("refresh");
        }
    }
    //$('#drpTrainee').trigger("chosen:updated");
    $('#drpTrainee').multiselect("refresh");
}

// This function will load details of a particular event
function LoadEventDetails(TrainingDetailId) {
    var url = "/AddEditEvent/GetEventDetails";
    $.ajax({
        type: 'POST',
        url: url,
        async: false,
        contentType: 'application/json; charset=utf-8',
        data: '{"TrainingDetailId" : ' + TrainingDetailId + '}',
        dataType: "json",
        success: function (data) {
            $('#txtSubject').val(data[0].EventTitle);
            $('#txtTrainingTopic').val(data[0].EventTopic);
            if (data[0].LocationId != 0) {
                $("#drpLocation").val(data[0].LocationId);
            }
            if ($("select[id*='drpLocation']").val() != '') {

                LoadConferenceRoomList($("select[id*='drpLocation']").val());

                $("select[id*='ddlConferenceRoom']").val(data[0].ConferenceRoomId);
            }
            var trainerList = "";
            var traineeList = "";
            trainerList = data[0].TrainerList.split(',');
            traineeList = data[0].TraineeList.split(',');

            for (i = 0; i < trainerList.length; i++) {
                $('#drpTrainer').find('option[value="' + trainerList[i] + '"]').attr('Selected', 'Selected');
                $('#drpTrainee').find('option[value="' + trainerList[i] + '"]').attr('disabled', 'disabled');

            }
            for (j = 0; j < traineeList.length; j++) {
                $('#drpTrainee').find('option[value="' + traineeList[j] + '"]').attr('Selected', 'Selected');
                $('#drpTrainer').find('option[value="' + traineeList[j] + '"]').attr('disabled', 'disabled');
            }
            $("#drpTrainer").trigger('chosen:updated');
            $("#drpTrainee").trigger('chosen:updated');
            $('#stparttime').val(data[0].PlannedStartDate.split(' ')[1]);

            $('#etparttime').val(data[0].PlannedEndDate.split(' ')[1]);

            //if (data[0].TrainingResourceTypeId == "1") {
            //    $("#stpartdate").attr("disabled", "disabled");
            //    $("#stpartdate").next(".calpick").attr("disabled", "disabled");
            //    $("#hdnIsInitiated").val(1);
            //}
            $('#stpartdate').val(data[0].EventStartDate);
            $('#etpartdate').val(data[0].EventEndDate);

            $("#dvTrainingDetailDates").show();
            $("#lbltrainingdetailstartdate").html(data[0].PlannedStartDate.split(' ')[0]);
            //$("#lbltrainingdetailenddate").html(data.events[0][3].split(' ')[0]);
            $("#ddlTrainingCategory").val(parseInt(data[0].TrainingCategoryId)).trigger("chosen:updated");
            $('#txtTrainingCost').val(data[0].TrainingCost);
            //$('#txtFeedbackPercentage').val(data.events[0][23]);
            //var feedbackPer = $('#txtFeedbackPercentage').val();
            //$('#txtWaiverPercentage').val(100 - feedbackPer);
            $('#ddlEvaluationMethod').val(data[0].EvaluationMethod);
            $('#txtEvaluationPeriod').val(data[0].EvaluationPeriod);
            $('#ddlTrainingStatus').val(data[0].StatusId);
            $("#hdnTrainingDates").val(data[0].Trainingdatesall);
            $("#ddlTrainingResourceType").val(data[0].TrainingResourceTypeId);
            $("#trainingObjective").val(data[0].TrainingObjective);
            if (data[0].IsBeforeRating == true) {
                $('#chkIsbeforerating').prop("checked", true);
            }
            else {
                $('#chkIsbeforerating').prop("checked", false);
            }
            if (data[0].TrainingResourceTypeId == 2) {
                $("#trainingCostMandatory").text("* Training Cost");
            }
            $("#ddlTrainingResourceType").prop('disabled', true);
            $("#ddlTrainingResourceType").trigger("chosen:updated");
            var url = parent.window.location.href;
            var splitUrl = url.split("?");
            if (splitUrl.length > 1) {
                $("#Savebtn").css("display", "none");
                $(".infocontainer :input").prop("disabled", true);
            }
            $("#ddlTrainingResourceType").prop('disabled', true);
            $("#ddlTrainingResourceType").trigger("chosen:updated");
        },
        error: function (data) {

        }
    });

}

function AddUpdateEvent() {
    if (ValidatePage() == true) {
        var startDate = new Date($('#stpartdate').val());
        var endDate = new Date($('#etpartdate').val());
        if (endDate < startDate) {
            toastr.remove();
            toastr.error("Training start date should be smaller or equal than end date.");
            return false;
        }
        var trainingDetailId = $('#TrainingDetailId').val();

        if (trainingDetailId == '') {
            trainingDetailId = null;
        }
        var EventtypeId = $("#ddlEventtype").val();
        var eventTitle = $('#txtSubject').val();
        var eventTopic = $('#txtTrainingTopic').val();
        var trainingResourceType = $("#ddlTrainingResourceType").val();
        var trainerList = $('#drpTrainer').val();
        var traineeList = $('#drpTrainee').val();
        var Attendees = $('#drpAttendee').val();
        var trainingCategory = $('#ddlTrainingCategory').val();
        var trainingCost = $('#txtTrainingCost').val();
        var feedbackPercentage = $('#txtFeedbackPercentage').val();
        var status = $("#StatusId").val();
        var EvaluationMethod = $('#ddlEvaluationMethod').val();
        var EvaluationPeriod = $('#txtEvaluationPeriod').val();
        var trainingObjective = $('#trainingObjective').val();
        var Remark = $("#txtRemark").val();
        var IsFullDay = $("#chkIsfulldayevent").is(':checked');
        var occurenceType = $('input[name=Occurencttype]:checked').val();
        var IsforEmpDefine = $('#Isemployeedefine').is(":checked");
        var IsOutsidepremise = $('#Isonpremise').is(":checked");
       
        var IsEventPublic = $('#Ispublic').is(":checked");
        if (occurenceType == 3) {
            var weekdays = new Object();
            weekdays.IsSunday = $("#IsSunday").is(':checked');
            weekdays.IsMonday = $("#IsMonday").is(':checked');
            weekdays.IsTuesday = $("#IsTuesday").is(':checked');
            weekdays.IsWednesday = $("#IsWednesday").is(':checked');
            weekdays.IsThursday = $("#IsThursday").is(':checked');
            weekdays.IsFriday = $("#IsFriday").is(':checked');
            weekdays.IsSaturday = $("#IsSaturday").is(':checked');

        }
        else if (occurenceType == 4) {
            var IsWeekDayOfMonth = $('#Isfornoweekday').is(":checked");
            if (!IsWeekDayOfMonth) {
                var DayOfEveryMonth = $("#txtDayOfEveryMonth").val();
            }
            else {
                var weekdaytype = $("#ddlweekdaytype").val();
                var weekdayname = $("#ddlweekdayname").val();
            }
        }
        else {
            var weekdays = null;
        }
        //$("#Isforday").is(':checked')
        var locationId = $("#drpLocation").val()
        var locationName = $("select[id*='drpLocation'] option:selected").html();
        var conferenceRoomId = $("#ddlConferenceRoom").val();
        var conferenceRoonName = $("select[id*='ddlConferenceRoom'] option:selected").html();
        var Venue = "";
        if (conferenceRoomId == 'Select') {

            conferenceRoomId = null;
            conferenceRoonName = "";

        }
        if (!IsOutsidepremise) {
            locationId = null;
            locationName = "";
            conferenceRoomId = null;
            conferenceRoonName = "";
            Venue = $("#txtVenue").val();
        }
        var startDate = $('#stpartdate').val();

        var startTime = $('#stparttime').val();

        var endDate = $('#etpartdate').val();

        var endTime = $('#etparttime').val();
        var IsEntire = $("#IsForEntire").val();

        var IsBeforeRating = $('#chkIsbeforerating').is(':checked');
        var mydate = new Date();
        var Mmonth = mydate.getMonth() + 1;
        var Mday = mydate.getDate();
        if ((String(Mday)).length == 1)
            Mday = '0' + Mday;
        if ((String(Mmonth)).length == 1)
            Mmonth = '0' + Mmonth;
        mydate = Mmonth + '/' + Mday + '/' + mydate.getFullYear();
        var strStartDate = startDate;
        var Smonth = strStartDate.split('/')[0];
        var Sday = strStartDate.split('/')[1];

        var Emonth = endDate.split('/')[0]; //endDate.getMonth() + 1;
        var Eday = endDate.split('/')[1]; //endDate.getDate();


        if ((String(Sday)).length == 1)
            Sday = '0' + Sday;


        if ((String(Smonth)).length == 1)
            Smonth = '0' + Smonth;

        if ((String(Eday)).length == 1)
            Eday = '0' + Eday;

        if ((String(Emonth)).length == 1)
            Emonth = '0' + Emonth;


        startDate = Smonth + '/' + Sday + '/' + startDate.split('/')[2]; //startDate.getFullYear();
        endDate = Emonth + '/' + Eday + '/' + endDate.split('/')[2];  //endDate.getFullYear();

        var sDate = new Date(startDate);
        var eDate = new Date(endDate);
        //  var sDate = Date.parseDate(startDate, "mm/dd/yyyy");
        var mdt = new Date(mydate);
        var backdateflg = 1;
        var trainingdatesall = '';
        //$('#dvTrainingDates div input:checked').each(function () {
        //    trainingdatesall += $(this).attr('value') + ',';
        //});

        //if (trainingdatesall != '') {
        //    trainingdatesall = trainingdatesall.substring(0, trainingdatesall.length - 1);
        //}
        if (EventtypeId == 1) {
            if (Attendees != null) {
                trainerList = trainerList;
                traineeList = Attendees.join(",");
            }
            else {
                trainerList = trainerList;
                traineeList = Attendees;
            }
        }
        else {
            if (traineeList != null) {

                trainerList = trainerList.join(",");
                traineeList = traineeList.join(",");
            }
            else {
                trainerList = trainerList.join(",");
                traineeList = traineeList;
            }
        }

        if (backdateflg == 1) {
            if (checktime() == true) {
                var postData = JSON.stringify(
                                {
                                    TrainingDetailId: trainingDetailId,

                                    EventTitle: eventTitle,

                                    EventTopic: eventTopic,

                                    TrainingResourceTypeId: trainingResourceType,

                                    TrainerList: trainerList,

                                    LocationId: locationId,

                                    ConferenceRoomId: conferenceRoomId,

                                    EventStartDate: startDate,

                                    EventStartTime: startTime,

                                    EventEndDate: endDate,

                                    EventEndTime: endTime,

                                    TraineeList: traineeList,

                                    LoacationName: locationName,

                                    ConferenceRoomName: conferenceRoonName,

                                    TrainingCategoryId: trainingCategory,

                                    TrainingCost: trainingCost,

                                    StatusId: status,

                                    EvaluationMethod: EvaluationMethod,

                                    EvaluationPeriod: EvaluationPeriod,

                                    Trainingdatesall: trainingdatesall,

                                    TrainingObjective: trainingObjective,

                                    IsBeforeRating: IsBeforeRating,

                                    Isforpremise: IsOutsidepremise,

                                    IsForEmpdefine: IsforEmpDefine,

                                    weekdays: weekdays,

                                    IsFullDay: IsFullDay,

                                    IsWeekDayOfMonth: IsWeekDayOfMonth,

                                    DayOfEveryMonth: DayOfEveryMonth,

                                    weekdayType: weekdaytype,

                                    weekDayNameId: weekdayname,

                                    Remark: Remark,

                                    EventtypeId: EventtypeId,

                                    Occurencttype: occurenceType,

                                    Venue: Venue,

                                    IsForEntire: IsEntire,

                                    IsEventPublic: IsEventPublic,


                                }
                            );
                var url = "/AddEditEvent/AddUpdateEvent";
                $.ajax({
                    type: 'POST',
                    url: url,
                    async: false,
                    contentType: 'application/json; charset=utf-8',
                    data: postData,
                    dataType: "json",
                    beforeSend: function () {
                        //ShowProgress();
                    },
                    success: function (data) {
                        // HideProgress();
                        if (data[0] == "true") {
                            toastr.remove();
                            toastr.success("Event Saved Successfully.");
                            ClearForm();
                            location.href = "http://" + location.host + "/trainingcalendar/index";
                        }
                        else if (data == "fail") {
                            ClearForm();
                            toastr.remove();
                            toastr.success("Event Saved Successfully and Mail Sending Fail");
                            location.href = "http://" + location.host + "/trainingcalendar/index";
                        }
                        else {
                            if (data[1]) {
                                toastr.remove();
                                toastr.error(data[1]);
                            }
                            else {
                                toastr.remove();
                                toastr.error("Event is already available for specific location, conference room, duration of time on " + data + ' date.');
                            }
                            $('#UcSchedulerAddEvent1_lblMessage').hide();
                            return;
                        }


                    },
                    error: function (data) {
                        toastr.remove();
                        toastr.error("Error Occurred While Saving Event");
                    }
                });

                return true;
            }
        }
        else {
            // alert("Back Dated Event Not Allowed.");
            toastr.remove();
            toastr.error("Back Dated Event Not Allowed.");
        }
    }

}

function AddUpdateEventSingleInstance() {
    if (ValidatePage() == true) {
        var startDate = new Date($('#stpartdate').val());
        var endDate = new Date($('#etpartdate').val());
        if (endDate < startDate) {
            toastr.remove();
            toastr.error("Training start date should be smaller or equal than end date.");
            return false;
        }

        var trainingDetailId = $('#TrainingDetailId').val();

        if (trainingDetailId == '') {
            trainingDetailId = null;
        }
        var EventtypeId = $("#ddlEventtype").val();
        var eventTitle = $('#txtSubject').val();
        var eventTopic = $('#txtTrainingTopic').val();
        var trainingResourceType = $("#ddlTrainingResourceType").val();
        var trainerList = $('#drpTrainer').val();
        var traineeList = $('#drpTrainee').val();
        var Attendees = $('#drpAttendee').val();
        var trainingCategory = $('#ddlTrainingCategory').val();
        var trainingCost = $('#txtTrainingCost').val();
        var feedbackPercentage = $('#txtFeedbackPercentage').val();
        var status = $("#StatusId").val();
        var EvaluationMethod = $('#ddlEvaluationMethod').val();
        var EvaluationPeriod = $('#txtEvaluationPeriod').val();
        var trainingObjective = $('#trainingObjective').val();
        var Remark = $("#txtRemark").val();
        var IsFullDay = $("#chkIsfulldayevent").is(':checked');
        var occurenceType = $('input[name=Occurencttype]:checked').val();
        var IsforEmpDefine = $('#Isemployeedefine').is(":checked");
        var IsOutsidepremise = $('#Isonpremise').is(":checked");
        var IsEventPublic = $('#Ispublic').is(":checked");
        if (occurenceType == 3) {
            var weekdays = new Object();
            weekdays.IsSunday = $("#IsSunday").is(':checked');
            weekdays.IsMonday = $("#IsMonday").is(':checked');
            weekdays.IsTuesday = $("#IsTuesday").is(':checked');
            weekdays.IsWednesday = $("#IsWednesday").is(':checked');
            weekdays.IsThursday = $("#IsThursday").is(':checked');
            weekdays.IsFriday = $("#IsFriday").is(':checked');
            weekdays.IsSaturday = $("#IsSaturday").is(':checked');

        }
        else if (occurenceType == 4) {
            var IsWeekDayOfMonth = $('#Isfornoweekday').is(":checked");
            if (!IsWeekDayOfMonth) {
                var DayOfEveryMonth = $("#txtDayOfEveryMonth").val();
            }
            else {
                var weekdaytype = $("#ddlweekdaytype").val();
                var weekdayname = $("#ddlweekdayname").val();
            }
        }
        else {
            var weekdays = null;
        }
        //$("#Isforday").is(':checked')
        var locationId = $("#drpLocation").val()
        var locationName = $("select[id*='drpLocation'] option:selected").html();
        var conferenceRoomId = $("#ddlConferenceRoom").val();
        var conferenceRoonName = $("select[id*='ddlConferenceRoom'] option:selected").html();
        var Venue = "";
        if (conferenceRoomId == 'Select') {

            conferenceRoomId = null;
            conferenceRoonName = "";

        }
        if (!IsOutsidepremise) {
            locationId = null;
            locationName = "";
            conferenceRoomId = null;
            conferenceRoonName = "";
            Venue = $("#txtVenue").val();
        }
        var startDate = $('#stpartdate').val();

        var startTime = $('#stparttime').val();

        var endDate = $('#etpartdate').val();

        var endTime = $('#etparttime').val();
        var IsEntire = $("#IsForEntire").val();

        var IsBeforeRating = $('#chkIsbeforerating').is(':checked');
        var mydate = new Date();
        var Mmonth = mydate.getMonth() + 1;
        var Mday = mydate.getDate();
        if ((String(Mday)).length == 1)
            Mday = '0' + Mday;
        if ((String(Mmonth)).length == 1)
            Mmonth = '0' + Mmonth;
        mydate = Mmonth + '/' + Mday + '/' + mydate.getFullYear();
        var strStartDate = startDate;
        var Smonth = strStartDate.split('/')[0];
        var Sday = strStartDate.split('/')[1];

        var Emonth = endDate.split('/')[0]; //endDate.getMonth() + 1;
        var Eday = endDate.split('/')[1]; //endDate.getDate();


        if ((String(Sday)).length == 1)
            Sday = '0' + Sday;


        if ((String(Smonth)).length == 1)
            Smonth = '0' + Smonth;

        if ((String(Eday)).length == 1)
            Eday = '0' + Eday;

        if ((String(Emonth)).length == 1)
            Emonth = '0' + Emonth;


        startDate = Smonth + '/' + Sday + '/' + startDate.split('/')[2]; //startDate.getFullYear();
        endDate = Emonth + '/' + Eday + '/' + endDate.split('/')[2];  //endDate.getFullYear();

        var sDate = new Date(startDate);
        var eDate = new Date(endDate);
        //  var sDate = Date.parseDate(startDate, "mm/dd/yyyy");
        var mdt = new Date(mydate);
        var backdateflg = 1;
        var trainingdatesall = '';
        //$('#dvTrainingDates div input:checked').each(function () {
        //    trainingdatesall += $(this).attr('value') + ',';
        //});

        //if (trainingdatesall != '') {
        //    trainingdatesall = trainingdatesall.substring(0, trainingdatesall.length - 1);
        //}
        if (EventtypeId == 1) {
            if (Attendees != null) {
                trainerList = trainerList;
                traineeList = Attendees.join(",");
            }
            else {
                trainerList = trainerList;
                traineeList = Attendees;
            }
        }
        else {
            if (traineeList != null) {

                trainerList = trainerList.join(",");
                traineeList = traineeList.join(",");
            }
            else {
                trainerList = trainerList.join(",");
                traineeList = traineeList;
            }
        }
        if (backdateflg == 1) {
            if (checktime() == true) {
                var postData = JSON.stringify(
                                {
                                    TrainingDetailId: trainingDetailId,

                                    EventTitle: eventTitle,

                                    EventTopic: eventTopic,

                                    TrainingResourceTypeId: trainingResourceType,

                                    TrainerList: trainerList,

                                    LocationId: locationId,

                                    ConferenceRoomId: conferenceRoomId,

                                    EventStartDate: startDate,

                                    EventStartTime: startTime,

                                    EventEndDate: endDate,

                                    EventEndTime: endTime,

                                    TraineeList: traineeList,

                                    LoacationName: locationName,

                                    ConferenceRoomName: conferenceRoonName,

                                    TrainingCategoryId: trainingCategory,

                                    TrainingCost: trainingCost,

                                    StatusId: status,

                                    EvaluationMethod: EvaluationMethod,

                                    EvaluationPeriod: EvaluationPeriod,

                                    Trainingdatesall: trainingdatesall,

                                    TrainingObjective: trainingObjective,

                                    IsBeforeRating: IsBeforeRating,

                                    Isforpremise: IsOutsidepremise,

                                    IsForEmpdefine: IsforEmpDefine,

                                    weekdays: weekdays,

                                    IsFullDay: IsFullDay,

                                    IsWeekDayOfMonth: IsWeekDayOfMonth,

                                    DayOfEveryMonth: DayOfEveryMonth,

                                    weekdayType: weekdaytype,

                                    weekDayNameId: weekdayname,

                                    Remark: Remark,

                                    EventtypeId: EventtypeId,

                                    Occurencttype: occurenceType,
                                    Venue: Venue,
                                    IsForEntire: IsEntire,
                                    IsEventPublic: IsEventPublic


                                }
                            );

                var url = "/AddEditEvent/AddUpdateSingleInstanceEvent";
                $.ajax({
                    type: 'POST',
                    url: url,
                    async: false,
                    contentType: 'application/json; charset=utf-8',
                    data: postData,
                    dataType: "json",
                    beforeSend: function () {
                        //ShowProgress();
                    },
                    success: function (data) {
                        // HideProgress();
                        if (data[0] == "true") {

                            toastr.remove();
                            toastr.success("Event Saved Successfully.");
                            ClearForm();
                            //HideProgress();
                            location.href = "http://" + location.host + "/trainingcalendar/index";
                        }
                        else if (data == "fail") {
                            ClearForm();
                            toastr.remove();
                            toastr.success("Event Saved Successfully and Mail Sending Fail");
                            location.href = "http://" + location.host + "/trainingcalendar/index";
                        }
                        else {
                            if (data[1]) {
                                //HideProgress();
                                toastr.remove();
                                toastr.error(data[1]);
                            }
                            else {
                                toastr.remove();
                                toastr.error("Event is already available for specific location, conference room, duration of time on " + data + ' date.');
                            }
                            $('#UcSchedulerAddEvent1_lblMessage').hide();
                            return;
                        }


                    },
                    error: function (data) {
                        //toastr.remove();
                        //toastr.error("Error Occurred While Saving Event");
                    }
                });

                return true;
            }
        }
        else {
            // alert("Back Dated Event Not Allowed.");
            toastr.remove();
            toastr.error("Back Dated Event Not Allowed.");
        }
    }

}

function ClearForm() {

    // $('#Subject').val("");
    $('#txtSubject').val('');
    //$('input[class="classEmpList"]').each(function (i) {

    //    $(this).attr("checked", false);

    //});

    //$('input[class="classEmpListTrainee"]').each(function (d) {

    //    $(this).attr("checked", false);
    //    $('input[class="classEmpListTrainee"][type=checkbox][value=' + $(this).val() + ']').attr("disabled", false);

    //});
    $("select[id*='drpLocation']").val('');
    $("select[id*='ddlConferenceRoom']").empty();
    $("select[id*='ddlConferenceRoom']").append(new Option('Select Venue', 'Select Venue'));
    var currentDate = new Date();
    $("#stpartdate").val(currentDate.getMonth() + 1 + '/' + (currentDate.getDate()) + '/' + currentDate.getFullYear());
    $("#etpartdate").val(currentDate.getMonth() + 1 + '/' + (currentDate.getDate()) + '/' + currentDate.getFullYear());
    $("#AddUpdateTraining").modal('hide');
    $('#ddlTrainingCategory').val('');
    $('#txtTrainingCost').val('');
    //$('#txtFeedbackPercentage').val(70);
    //$('#txtWaiverPercentage').val(30);
    $('#stparttime').val('00:00');
    $('#etparttime').val('00:00');
    $('#ddlEvaluationMethod').val('');
    $('#txtEvaluationPeriod').val('');
    $('#ddlTrainingStatus').val('');
    $('#trainingObjective').val('');
    $('#errorMessageAddEvent').empty();

}

function ValidatePage() {
    var result = true;
    $(".form-group").removeClass("has-error  has-feedback");
    var eventTitle = $.trim($('#txtSubject').val());
    var eventTopic = $.trim($('#txtTrainingTopic').val());
    var trainingCost = $.trim($('#txtTrainingCost').val());
    var trainingType = $('#ddlTrainingResourceType').val();
    var feedbackPercentage = $.trim($('#txtFeedbackPercentage').val());
    var trainingCategory = $('#ddlTrainingCategory').val();
    var EvaluationMethod = $('#ddlEvaluationMethod').val();
    var EvaluationPeriod = $('#txtEvaluationPeriod').val();
    var OccurrenceType = $('input[name=Occurencttype]:checked').val();
    eventTitle = eventTitle.length;

    var strErrorMessage = '';
    $('#errorMessageAddEvent').html('');
    $('#errorMessageAddEvent').hide();
    var Todate = $("#etpartdate").val();
    var FromDate = $("#stpartdate").val();
    if (eventTitle == 0) {
        strErrorMessage += "<li>Please Enter Name Of Event</li>";
        $("#txtSubject").closest(".form-group").addClass("has-error  has-feedback");
    }
    if (FromDate == "" || FromDate == undefined) {
        strErrorMessage += "<li>Please Select Start Date</li>";
        $("#stpartdate").closest(".form-group").addClass("has-error  has-feedback");
    }
    if (Todate == "" || Todate == undefined) {
        strErrorMessage += "<li>Please Select End Date</li>";
        $("#etpartdate").closest(".form-group").addClass("has-error  has-feedback");
    }
    var starttime = $("#stparttime").val();
    if (starttime == "") {
        strErrorMessage += "<li>Please Enter From time</li>";
        $("#stparttime").closest(".form-group").addClass("has-error  has-feedback");
    }
    var endtime = $("#etparttime").val();
    if (endtime == "") {
        strErrorMessage += "<li>Please Enter To time</li>";
        $("#etparttime").closest(".form-group").addClass("has-error  has-feedback");
    }
    if (starttime != "") {
        regex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/
        if (!regex.test(starttime)) {
            strErrorMessage += "<li>Invalid From Time</li>";
            $("#stparttime").closest(".form-group").addClass("has-error  has-feedback");
        }
    }
    if (endtime != "") {
        regex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/
        if (!regex.test(starttime)) {
            strErrorMessage += "<li>Invalid To Time</li>";
            $("#etparttime").closest(".form-group").addClass("has-error  has-feedback");
        }
    }
    var Eventtype = $("#ddlEventtype").val()
    if (Eventtype == 2) {
        if (eventTopic == 0) {
            strErrorMessage += "<li>Please Enter Topic Of Event</li>";
            $('#txtTrainingTopic').closest(".form-group").addClass("has-error  has-feedback");
        }
        if (trainingCategory == '') {
            strErrorMessage += "<li>Please select Event Category</li>";
            $('#ddlTrainingCategory').closest(".form-group").addClass("has-error  has-feedback");
        }
        if (trainingType == 2) {
            if (trainingCost == '') {
                strErrorMessage += "<li>Please enter Event cost</li>";
                $('#txtTrainingCost').closest(".form-group").addClass("has-error  has-feedback");
            }
        }
        if (trainingCost != '') {
            var regex = /^\d+(\.\d{1,2})?$/;
            if (!regex.test(trainingCost)) {
                strErrorMessage += "<li>Cost should be in number</li>";
                $('#txtTrainingCost').closest(".form-group").addClass("has-error  has-feedback");

            }
        }
        //if (feedbackPercentage != '') {
        //    regex = /^(100([\.][0]{1,})?$|[0-9]{1,2}([\.][0-9]{1,})?)$/;
        //    if (!regex.test(feedbackPercentage) || feedbackPercentage < 0) {
        //        //alert("Enter valid percentage.");
        //        //return false;
        //        strErrorMessage += "<li>Enter valid percentage</li>";
        //        $('#txtTrainingCost').closest(".form-group").addClass("has-error  has-feedback");
        //    }
        //}
        if (EvaluationPeriod == "") {
            strErrorMessage += "<li>Enter Evaluation Period</li>";
            $('#txtEvaluationPeriod').closest(".form-group").addClass("has-error  has-feedback");
        }
        if (EvaluationPeriod != "") {
            regex = /^(0?[1-9]|1[012])$/
            if (!regex.test(EvaluationPeriod)) {
                strErrorMessage += "<li>Enter valid Evaluation Period</li>";
                $('#txtEvaluationPeriod').closest(".form-group").addClass("has-error  has-feedback");
            }
        }
        var trainingObjective = $("#trainingObjective").val();
        if (trainingObjective == '') {
            strErrorMessage += "<li>Please enter Event Objective</li>";
            $('#trainingObjective').closest(".form-group").addClass("has-error  has-feedback");
        }
        var SelectedTrainer = $('#drpTrainer').val();
        if (SelectedTrainer == null) {
            strErrorMessage += "<li>Please select atleast one trainer</li>";
            $('#drpTrainer').closest(".form-group").addClass("has-error  has-feedback");
        }
        if (EvaluationMethod == "") {
            strErrorMessage += "<li>Please select Evaluation Method</li>";
            $('#ddlEvaluationMethod').closest(".form-group").addClass("has-error  has-feedback");
        }
    }
    else {
        //var SelectedAttendees = $('#drpAttendee').val();
        //if (SelectedAttendees == null) {
        //    strErrorMessage += "<li>Please select atleast one Attendees</li>";
        //}

    }
    if (OccurrenceType == 3) {
        if ($("#TrainingDetailId").val() == 0 || $("#TrainingDetailId").val() == "") {
            if (moment(Todate).isSame(FromDate)) {
                strErrorMessage += "<li>please enter weekly range</li>";
                $('#stpartdate').closest(".form-group").addClass("has-error  has-feedback"); stpartdate
            }
        }
        if ($("#TrainingDetailId").val() != 0 && $("#IsForEntire").val() == 'true') {
            if (moment(Todate).isSame(FromDate)) {
                strErrorMessage += "<li>please enter weekly range</li>";
                $('#stpartdate').closest(".form-group").addClass("has-error  has-feedback"); stpartdate
            }
        }
        var weekdayList = [];
        $(".Weekdaygroup").each(function () {
            var Id = $(this).attr('id');
            if ($("#" + Id).is(":checked")) {
                weekdayList.push($(this).val());
            }
        });
        if (weekdayList.length == 0) {
            strErrorMessage += "<li>Please Select at least one day</li>";
        }


    }
    if (OccurrenceType == 4) {
        if ($("#TrainingDetailId").val() == 0 || $("#TrainingDetailId").val() == "") {
            if (moment(Todate).isSame(FromDate)) {
                strErrorMessage += "<li>please enter monthly range</li>";
                $('#stpartdate').closest(".form-group").addClass("has-error  has-feedback"); stpartdate
            }
        }
        if ($("#TrainingDetailId").val() != 0 && $("#IsForEntire").val() == 'true') {
            if (moment(Todate).isSame(FromDate)) {
                strErrorMessage += "<li>please enter monthly range</li>";
                $('#stpartdate').closest(".form-group").addClass("has-error  has-feedback"); stpartdate
            }
        }
        var daymonth = $("#txtDayOfEveryMonth").val();
        if ($("#Isforday").is(':checked')) {
            if (daymonth == "") {
                strErrorMessage += "<li>Please Select Day value</li>";
                $('#txtDayOfEveryMonth').closest(".form-group").addClass("has-error  has-feedback");
            }
            if (parseInt(daymonth) < 1 || parseInt(daymonth) > 31) {
                strErrorMessage += "<li>Please Enter valid Day Value</li>";
                $('#txtDayOfEveryMonth').closest(".form-group").addClass("has-error  has-feedback");
            }
        }
    }
    var Venue = $("#txtVenue").val();
    var LocationId = $("#drpLocation").val();
    var venueId = $("#ddlConferenceRoom").val();
    if ($("#Isoutsidepremise").is(':checked')) {
        if (Venue == "") {
            strErrorMessage += "<li>Please Enter Venue</li>";
            $('#txtVenue').closest(".form-group").addClass("has-error  has-feedback");
        }
    }
    else {
        if (LocationId == "") {
            strErrorMessage += "<li>Please Select Location</li>";
            $('#drpLocation').closest(".form-group").addClass("has-error  has-feedback");
        }
        if (venueId == "") {
            strErrorMessage += "<li>Please Select Venue</li>";
            $('#ddlConferenceRoom').closest(".form-group").addClass("has-error  has-feedback");
        }
    }
    var trainingdatesall = '';
    if (strErrorMessage != '') {
        $('#errorMessageAddEvent').show();
        $('#errorMessageAddEvent').html("<div class='alert alert-danger'><ul>" + strErrorMessage + "</ul></div>");
        $('html, body').animate({
            scrollTop: 0
        }, 500);
        return false
    }

    return result;

}
function checktime() {
    var result = true;
    var start = document.getElementById("stparttime").value;
    var end = document.getElementById("etparttime").value;

    if (Date.parse('01/01/2011 ' + end) < Date.parse('01/01/2011 ' + start)) {
        toastr.remove();
        toastr.error("End time should exceed the start time");
        result = false;
    }
    else if (Date.parse('01/01/2011 ' + end) - Date.parse('01/01/2011 ' + start) == 0) {
        $('#errorMessageAddEvent').show();
        $('#errorMessageAddEvent').html("<div class='alert alert-danger'><ul><li>Start Time and End time cannot be same</li></ul></div>");
        $('html, body').animate({
            scrollTop: 0
        }, 500);
        result = false;
    }
    return result;
}
function ShowHideTrainingActivitycolumn(EventType) {
    $(".form-group").removeClass("has-error  has-feedback");
    if (EventType == 1) {
        $('.showhideevent').hide(); // Shows
        $('.showhideactivity').show();
    }
    else {
        $('.showhideactivity').hide();
        $('.showhideevent').show();
    }

}
function ShowhideOccurencttypeEvent(Occurencttype) {
    $('.hideenddate').show();
    $('.hideweekday').show();
    $('.hidemonthly').show();
    if (Occurencttype == 1) {
        $('.hideweekday').hide();
        $('.hidemonthly').hide();
    }
    if (Occurencttype == 2) {
        $('.hideweekday').hide();
        $('.hidemonthly').hide();
    }
    if (Occurencttype == 3) {
        $('.hideweekday').show();
        $('.hidemonthly').hide();
    }
    if (Occurencttype == 4) {
        $('.hideweekday').hide();
        $('.hidemonthly').show();
    }

}
function ShowHideTrainingActivityForSingleInstance(EventType, IsSingleInstance, TrainingDetailId) {
    if (TrainingDetailId != null && IsSingleInstance == "true") {
        if (EventType == 1) {
            $(".hideEventpublic").hide();
            $(".hideEventName").hide();
            $(".hideOccurrence").hide();
            $(".hideEventDate").hide();
            $(".hidedaily").hide();
            $(".hideweekday").hide();
            $(".hidemonthly").hide();
            $(".hideEventAttendance").hide();
            $(".hideAttendees").hide();
        }
        else {
            $(".hideEventpublic").hide();
            $(".hideEventName").hide();
            $(".hideOccurrence").hide();
            $(".hideEventTopic").hide();
            $(".hideEventDate").hide();
            $(".hidedaily").hide();
            $(".hideweekday").hide();
            $(".hidemonthly").hide();
            $(".hideEventCategory").hide();
            $(".hideEventCost").hide();
            $(".hideEventAttendance").hide();
            $(".hideEventMethod").hide();
            $(".hideEventPeriod").hide();
            $(".hideEventObjective").hide();
            $(".HideBeforeRating").hide();
            $(".HideTrainee").hide();
        }
    }
}
function HideProgress() {
    $('.loader-wrapper').css('display', 'none');
}

function ShowProgress() {

    if ($('.loader-wrapper').css('display') == "none") {
        $(".loader-wrapper").show();
    }
}
function BindTrainerMultiSelect() {
    $('#drpTrainer').multiselect({
        enableFiltering: true,
        numberDisplayed: 1,
        filterBehavior: 'text',
        includeSelectAllOption: false,
        enableCaseInsensitiveFiltering: true,
        buttonWidth: '100%',
        disableIfEmpty: true,
        templates: {
            filter: '<li class="multiselect-item filter"><div class="input-group"><input class="form-control multiselect-search" type="text"></div></li>',
            filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default multiselect-clear-filter" type="button"><i class="glyphicon glyphicon-remove-circle"></i></button></span>',


        },
        onChange: function (element, checked) {
            if (checked === true) {
                //alert($(element).text())
                $("#selectedTrainer").append('<label class="label-primary label" style="margin-left: 5px;">' + $(element).text() + ' <i class="fa fa-close cursor-pointer removeSelectedTag" data-id="' + $(element).val() + '" id="Trainer_' + $(element).val() + '"></i></label>')
                $('#drpTrainee option[value="' + $(element).val() + '"]').prop('disabled', true);
                $('#drpTrainee option[value="' + $(element).val() + '"]').parent('li').addClass('disabled');
                $('#drpTrainee').multiselect('refresh');
                //action taken here if true
            }
            else if (checked === false) {
                $("#Trainer_" + $(element).val()).parent().remove();
                $('#drpTrainee option[value="' + $(element).val() + '"]').prop('disabled', false);
                $('#drpTrainee option[value="' + $(element).val() + '"]').parent('li').removeClass('disabled');
                $('#drpTrainee').multiselect('refresh');
            }
        },
        //onSelectAll: function () {
        //    $('#drpTrainer > option').each(function () {
        //        $("#selectedTrainer").append('<label class="label-danger label" style="margin-left: 5px;">' + $(this).text() + ' <i class="fa fa-close cursor-pointer removeSelectedTag" data-id="' + $(this).val() + '" id="Trainer_' + $(this).val() + '"></i></label>')
        //    });
        //},
        //onDeselectAll: function () {
        //    $("#selectedTrainer").html('');
        //},
        maxHeight: 200,
    });
}