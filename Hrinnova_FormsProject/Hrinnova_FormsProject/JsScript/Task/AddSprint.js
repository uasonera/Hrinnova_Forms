$(document).ready(function () {
    $("#txtSprintName").keyup(function () {
        $("#ErrTitle").html('');
    });
    $('#plan_start').click(function () {
        $("#txtPlannedStartDate").focus();
    });
    $('#plan_end').click(function () {
        $("#txtPlannedEndDate").focus();
    });
    $("#txtPlannedStartDate").on('change', function (ev) {
        $(this).datepicker('hide');
    });
    $("#txtPlannedEndDate").on('change', function (ev) {
        $(this).datepicker('hide');
    });
    $(".AddIteration").click(function () {
        var IsEdit = SprintId>0;
        var NameExist = false;
        var strErrorMessage = '';
        var $form = $(this).closest('form');
        var status = true;
        $(".form-group").removeClass("has-error  has-feedback");
        if ($("#txtSprintName").val() == "") {
            strErrorMessage += "<li>Iteration Name is required</li>";
            $("#txtSprintName").closest(".form-group").addClass("has-error  has-feedback");
            status = false;
        }
        
        if(moment($("#txtPlannedEndDate").val(), "MM/DD/YYYY").isBefore(moment($("#txtPlannedStartDate").val(), "MM/DD/YYYY")))
        {
            strErrorMessage += "<li>End date can not be before start date</li>";
            $("#txtPlannedEndDate").closest(".form-group").addClass("has-error  has-feedback");
            status = false;
        }
        if ($("#txtPlannedStartDate").val() == "")
        {
            strErrorMessage += "<li>Planned start date is required</li>";
            $("#txtPlannedStartDate").closest(".form-group").addClass("has-error  has-feedback");
            status = false;
        }
        if ($("#txtPlannedEndDate").val() == "") {
            strErrorMessage += "<li>Planned end date is required</li>";
            $("#txtPlannedEndDate").closest(".form-group").addClass("has-error  has-feedback");
            status = false;
        }
        $.ajax({
            type: "POST",
            url: "/Task/CheckIfSprintNameAlreadyExist",
            data: '{ "SprintName":"' + $("#txtSprintName").val() + '","SprintID": ' + SprintId + ',"ProjectId":' + ProjectId + '}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                if (data) {
                    {
                        strErrorMessage += "<li>Iteration name already exists</li>";                        
                        status = false;
                    }
                }
            }
        });
        
        if (status == false && strErrorMessage != null) {
            $('#errorMessage').css('display', 'block');
            $('#errorMessage').html("<ul>" + strErrorMessage + "</ul>");
            $('ul li:empty').remove();
        }
        else {
                formData = new FormData($form[0]);
                $.ajax({
                    type: "POST",
                    url: urlSaveSprint,                    
                    data: $form.serialize(),
                    success: function (data) {
                        if (data)
                        {
                            SprintId == 0 ? toastr.success("Iteration has been created successfully") : toastr.success("Iteration has been updated successfully");
                        }
                        $('#planIteration').modal('toggle');
                        RefreshView();                       
                    }
                });
            
        }
    });
   
});