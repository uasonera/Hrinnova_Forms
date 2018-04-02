
function RoleSelectionRequired() {

    var RequiredMessage = 'Please Select atleast one Role (Core, Lead, Manage)';
    if ($('#tblMain input[type=checkbox]:checked').length > 0) {
        return true;
    }
    else {

        SetValidationMessage(RequiredMessage);
        return false;

    }



}


function StartDateRequired() {

    var RequiredCount = 0;
    $("INPUT[id^=txtStartDate]").each(function (index, obStartDate) {


        var TeamMemberName = $($("INPUT[id^=txtStartDate]").parents()[1]).find('label').text();
        var RequiredMessage = "Please  Select Start Date for " + TeamMemberName;

        if ($(obStartDate).val() == '') {

            RequiredCount = RequiredCount + 1
            SetValidationMessage(RequiredMessage);
        }

    });

    return !(RequiredCount > 0)


}


function ClearValidation() {
    $("#ulVs").empty();

}

function ClearMessage() {
    $("#lblMessage").empty();
    $("#lblMessage").removeClass('alert alert-warning');
    $("#lblMessage").removeClass('alert alert-success');
}

function ShowMessage(Issucess, Message) {
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


}


function SetValidationMessage(ValidationMessage) {

    $("#ulVs").append("<li>" + ValidationMessage + "</li>");
    SetScrollPostionToDisplayMessage();
    return false;



}

function SetScrollPostionToDisplayMessage() {


    var OffSet = 236 // Window scroll position to display validation Summary
    if (OffSet < $(window).scrollTop()) {

        $(window).scrollTop(OffSet);
    }

}


function DateValidation() {

    InvalidDateCount = 0;
    $("INPUT[id^=txtStartDate]").each(function (index, obStartDate) {

        
        var TeamMemberName = $($(obStartDate).parents()[1]).find('label').text();
        var StartDateValidationMessage = "Please  Select valid Start Date for  " + TeamMemberName;

        var StartDatePickerID = $(obStartDate).attr("id");
        if (!IsValidDate(StartDatePickerID)) {

            InvalidDateCount = InvalidDateCount + 1;
            SetValidationMessage(StartDateValidationMessage);
        }


    });

    $("INPUT[id^=txtEndDate]").each(function (index, obStartDate) {


        var TeamMemberName = $($(obStartDate).parents()[1]).find('label').text();
        var EndDateValidationMessage = "Please  Select valid End Date for " + TeamMemberName;
        var EndDatePickerID = $(obStartDate).attr("id");
        if (!IsValidDate(EndDatePickerID)) {

            InvalidDateCount = InvalidDateCount + 1;
            SetValidationMessage(EndDateValidationMessage);
        }

    });


    return !(InvalidDateCount > 0)
    //return false;

}