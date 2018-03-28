//var TeamMemberDetails;
var PageMode;

$(document).ready(function () {

    $.ajax({
        type: "POST",
        url: 'ProjectTeamDefinition_3.aspx/ProjName',
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            $("#divSelectedProjName").text(result.d).css('padding-left', '5px');
        }
    });
    BindTeamMemberDetails();
    Bindfunctions();
    BindAdditionalKraForEdit();
    BindTargetNotesForEdit();

    //$("#btnSave").click(function (event) {
    $(document).on('click', '#btnSave', function (event) {

        event.preventDefault();

        performEvent();

        //        ClearValidation();
        //        if (ValidateRecord() == false) {

        //            return;
        //        }
        //        var chkEmployee = false;

        //        $("#hdnEmployeeCount").val(0);
        //        if (Validate_Dates() == true) {
        //            ShowMessage(false, "FromDate should be less than or equal to ToDate.");
        //            return false;
        //        }
        //        ClearMessage();
        //        $("#tblMain tr").each(function () {
        //            var td_startDate = $(this).find('td:nth-child(2)');
        //            var strDate = td_startDate.find("input[id^='txtStartDate']").val();


        //            var td_endDate = $(this).find('td:nth-child(3)');
        //            var endDate = td_endDate.find("input[id^='txtEndDate']").val();

        //            //            var td_Core = $(this).find('td:nth-child(4)');
        //            //            var chkCore = td_Core.find("input[id^='chkCore']").attr('checked');

        //            //            var td_Lead = $(this).find('td:nth-child(5)');
        //            //            var chkLead = td_Lead.find("input[id^='chkLead']").attr('checked');

        //            //            var td_Manage = $(this).find('td:nth-child(6)');
        //            //            var chkManage = td_Manage.find("input[id^='chkManage']").attr('checked');


        //            if (strDate == undefined) { alert("RETURN"); return; }
        //            else {
        //                var empNo = $("#hdnEmployeeCount").val();
        //                $.ajax({
        //                    type: "POST",
        //                    url: 'ProjectTeamDefinition_3.aspx/CheckEmployee',
        //                    data: "{ 'startDate' : '" + strDate + "','EndDate' : '" + endDate + "','empNo' : '" + empNo + "'}",
        //                    contentType: 'application/json; charset=utf-8',
        //                    datatype: 'json',
        //                    success: function (result) {
        //                        var jsonResult = jQuery.parseJSON(result.d);
        //                        if (jsonResult == "true") {
        //                            chkEmployee = true;
        //                        }
        //                    }
        //                });
        //                $("#hdnEmployeeCount").val(parseInt($("#hdnEmployeeCount").val()) + 1);
        //            }

        //        });
        //        if (chkEmployee == true) {

        //            ClearMessage();
        //            ShowMessage(false, 'The same resource(s) is(are) getting repeated in the same date or date range. Please do allocation for other dates');
        //            return false;
        //        }
        //        else {

        //            ClearMessage();
        //            $("#hdnEmployeeCount").val(0);
        //            $("#tblMain tr").each(function () {
        //                var td_startDate = $(this).find('td:nth-child(2)');
        //                var strDate = td_startDate.find("input[id^='txtStartDate']").val();

        //                var td_endDate = $(this).find('td:nth-child(3)');
        //                var endDate = td_endDate.find("input[id^='txtEndDate']").val();

        //                var td_Core = $(this).find('td:nth-child(4)');
        //                var chkCore = td_Core.find("input[id^='chkCore']");
        //                var Core = chkCore.prop("checked");

        //                var td_Lead = $(this).find('td:nth-child(5)');
        //                var chkLead = td_Lead.find("input[id^='chkLead']");
        //                var Lead = chkLead.prop("checked");

        //                var td_Manage = $(this).find('td:nth-child(6)');
        //                var chkManage = td_Manage.find("input[id^='chkManage']");
        //                var Manage = chkManage.prop("checked");


        //                if (strDate == undefined) { return; }
        //                else {
        //                    var empNo = $("#hdnEmployeeCount").val();
        //                    $.ajax({
        //                        type: "POST",
        //                        url: 'ProjectTeamDefinition_3.aspx/insert',
        //                        data: "{ 'startDate' : '" + strDate + "','EndDate' : '" + endDate + "','empNo' : '" + empNo + "','Core' : '" + Core + "','Lead' : '" + Lead + "','Manage' : '" + Manage + "'}",
        //                        contentType: 'application/json; charset=utf-8',
        //                        datatype: 'json',
        //                        success: function (result) {
        //                            
        //                            //var jsonResult = jQuery.parseJSON(result.d);
        //                            $("#hdnEmployeeCount").val(parseInt(result.d[0]));

        //                            alert('first method ' + PageMode);
        //                            PageMode = result.d[1];
        //                            alert('Second ' + PageMode);
        //                            //set_PageMode(result.d[1]);

        //                        }
        //                    });
        //                    $("#hdnEmployeeCount").val(parseInt($("#hdnEmployeeCount").val()) + 1);
        //                }
        //            });

        //            alert('befoe edditionl method ' + PageMode);
        //            $("#hdnEmployeeCount").val(0);
        //            if ($("#txtAdditionalKRA").val().length > 0) {
        //                $("#tblMain tr").each(function () {
        //                    var td_startDate = $(this).find('td:nth-child(2)');
        //                    var strDate = td_startDate.find("input[id^='txtStartDate']").val();

        //                    var td_endDate = $(this).find('td:nth-child(3)');
        //                    var endDate = td_endDate.find("input[id^='txtEndDate']").val();

        //                    if (strDate == undefined) { return; }
        //                    else {
        //                        var empNo = $("#hdnEmployeeCount").val();
        //                        var KPIName = $("#txtAdditionalKRA").val();
        //                        $.ajax({
        //                            type: "POST",
        //                            url: 'ProjectTeamDefinition_3.aspx/insertAdditionalKRA',
        //                            data: "{ 'startDate' : '" + strDate + "','EndDate' : '" + endDate + "','empNo' : '" + empNo + "','KPIName' : '" + KPIName + "'}",
        //                            contentType: 'application/json; charset=utf-8',
        //                            datatype: 'json',
        //                            success: function (result) {

        //                                // var jsonResult = jQuery.parseJSON(result.d);
        //                                $("#hdnEmployeeCount").val(parseInt(result.d[0]));
        //                                set_exists(result.d[1]);

        //                                ShowMessage(true, 'Record save Successfully');
        //                                //window.location.href = "teamselection.aspx?status=Success";
        //                            }
        //                        });
        //                    }
        //                });
        //            }



        //        }

        //        alert('third method ' + PageMode);
        //        //        if ($("#hdnMode").val() == "Edit") {
        //        //            //window.location.href = "SearchTeamMembers.aspx?status=Success";
        //        //        }
        //        //        else {
        //        //            // window.location.href = "teamselection.aspx?status=Success";
        //        //        }


    });
});
function set_PageMode(x) {

    $("#hdnMode").val(x);
}
function Validate_Dates() {
    var CompareResult = false;
    $("#tblMain tr").each(function () {
        var td_startDate = $(this).find('td:nth-child(2)');
        var Start_Date = td_startDate.find("input[id^='txtStartDate']").datepicker("getDate");
        var td_endDate = $(this).find('td:nth-child(3)');
        var end_Date = td_endDate.find("input[id^='txtEndDate']").datepicker("getDate");


        if (!(end_Date == undefined || $(end_Date).length == 0)) {
            if (Start_Date > end_Date) {
                CompareResult = true;
            }
        }
    });
    return CompareResult;
}
function Bindfunctions() {
    $.ajax({
        type: "POST",
        url: 'ProjectTeamDefinition_3.aspx/GetFunctionDetails',
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            var jsonResult = jQuery.parseJSON(result.d);
            var FuncDetails = jsonResult.dtAllFuncDetails
            var ChildFunctDetail = jsonResult.dtFunction;
            var FunctionLength = FuncDetails.length;


            var FunctionString = "";
            var ParentID = "";
            //start

            for (var ParentfuncIndex = 0; ParentfuncIndex < FunctionLength; ParentfuncIndex++) {
                if (FunctionString.length > 0) {
                    FunctionString = FunctionString + " ,";
                }

                FunctionString = FunctionString + FuncDetails[ParentfuncIndex].ParentFunctionTitle;
                ParentID = FuncDetails[ParentfuncIndex].ParentFunID;

                FunctionString = FunctionString + " (";
                for (var childfunIndex = 0; childfunIndex < ChildFunctDetail.length; childfunIndex++) {

                    if (ParentID == ChildFunctDetail[childfunIndex].ParentFunID) {
                        FunctionString = FunctionString + ChildFunctDetail[childfunIndex].FunctionTitle + ",";
                    }
                }

                FunctionString = FunctionString.substr(0, FunctionString.length - 1) + ") ";
            }
            //end
            //            $(".func").append($("<div></div>").attr('id', 'divFunctions'));
            $("#divFunctions").text(FunctionString);
            $("#divFunctions").before("<div class='BlueHeader'>Functions</div>");
        }
    });
}


function BindTeamMemberDetails() {
    $.ajax({
        type: "POST",
        url: 'ProjectTeamDefinition_3.aspx/GetTeamMemberDetails',
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {

            var TeamMemberDetails = jQuery.parseJSON(result.d);
            if (jQuery.isEmptyObject(TeamMemberDetails)) {
                ShowMessage(false, "No Records Found");
            }
            else {
                ClearValidation();
                BindData(TeamMemberDetails);
            }

        }
    });

}


function BindData(TeamMemberDetails) {

    for (var index = 0; index < TeamMemberDetails.length; index++) {

        AddElements(TeamMemberDetails[index].TeamMemberID, TeamMemberDetails[index].EmployeeName, TeamMemberDetails[index].StartDate, TeamMemberDetails[index].EndDate, TeamMemberDetails[index].IsCoreApplicable, TeamMemberDetails[index].IsLeadApplicable, TeamMemberDetails[index].IsManageApplicable);

    }

}

function BindAdditionalKraForEdit() {



    $.ajax({
        type: "POST",
        url: 'ProjectTeamDefinition_3.aspx/GetAdditionalKPI',
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {

            $('#txtAdditionalKRA').val(result.d);
        }
    });

}
function BindTargetNotesForEdit() {
    $.ajax({
        type: "POST",
        url: 'ProjectTeamDefinition_3.aspx/GetTargetNotes',
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {

            $('#txtTargetNotes').val(result.d);
        }
    });
}
function AddElements(TeamMemberID, Name, startDate, endDate, core, lead, manage) {
    var count = $("#count").val();
    var i = count;
    //$("#tblMain").append($("<tr><td ><label ID='lblEmployee" + i + "' CssClass='lblEmp'></label></td><td ><input type='text' ID='txtStartDate" + i + "' style='width:100px' CssClass='ucstart'></td><td ><input type='text' ID='txtEndDate" + i + "' style='width:100px' CssClass='ucend'></td><td ><input type='checkbox' ID='chkCore" + i + "'  CssClass='chkCore1' /></td><td ><input type='checkbox' ID='chkLead" + i + "'  CssClass='chkLead1' /></td><td ><input type='checkbox' ID='chkManage" + i + "'  CssClass='chkCore1' /></td></tr>"));
    $("#tbodyMain").append($("<tr id='" + TeamMemberID + "'><td><label ID='lblEmployee" + i + "' ></label></td><td><span ID='txtStartDate" + i + "'  style='width:100px;'>" + startDate + "</span></td><td ><span ID='txtEndDate" + i + "'  style='width:100px;'>" + endDate + "</span></td><td ><input type='checkbox' ID='chkCore" + i + "' disabled='true' /></td><td ><input type='checkbox' ID='chkLead" + i + "' disabled='true'/></td><td ><input type='checkbox' ID='chkManage" + i + "' disabled='true' /></td></tr>"));
    $("#tblMain").find("#lblEmployee" + i).text(Name);
    if (core == true) {
        $("#tblMain").find("#chkCore" + i).prop('checked', 'checked');
    }
    if (lead == true) {
        $("#tblMain").find("#chkLead" + i).prop('checked', 'checked');
    }
    if (manage == true) {
        $("#tblMain").find("#chkManage" + i).prop('checked', 'checked');
    }
    //    $("#txtStartDate" + i).datepicker({
    //        changeMonth: true,
    //        changeYear: true,
    //        showWeek: false,
    //        firstDay: 1,
    //        showOn: "button",
    //        buttonImage: "../images/datepicker.gif",
    //        buttonImageOnly: true

    //    });
    //    $("#txtStartDate" + i).datepicker("setDate", startDate);
    //    $("#txtEndDate" + i).datepicker({
    //        changeMonth: true,
    //        changeYear: true,
    //        showWeek: false,
    //        firstDay: 1,
    //        showOn: "button",
    //        buttonImage: "../images/datepicker.gif",
    //        buttonImageOnly: true
    //    });
    //    $("#txtEndDate" + i).datepicker("setDate", endDate);
    $("#count").val(parseInt($("#count").val()) + 1);

    //        var num = $('.tblRepeat tr td').length,
    //        newNum = new Number(num + 1),
    //        newElem = $('#row1').clone(); //.attr('id', 'tblMain' + newNum);

    //        newElem.find('.lblEmp').attr('id', 'lblEmployee' + newNum);

    //        newElem.find('.ucstart').attr('ID', 'ucStartDate' + newNum);
    //        newElem.find('.ucend').attr('ID', 'ucEndDate' + newNum);

    //        newElem.find('.chkCore1').attr('id', 'chkCore' + newNum);      
    //        newElem.find('.chkLead1').attr('id', 'chkLead' + newNum);
    //        newElem.find('.chkManage1').attr('id', 'chkManage1' + newNum);
    //        $('#tblMain tr ').after(newElem);


}

function ValidateRecord() {

    // return (StartDateRequired() && RoleSelectionRequired() && KPiSelectionRequired())

    //var IsStartDateSelected = StartDateRequired();
    //var IsRoleSelected = RoleSelectionRequired();
    var IsTargetNotesAdded = TargetNotes();
    //var IsDateIsValid = DateValidation();


    //return (IsStartDateSelected && IsRoleSelected && IsDateIsValid);
    return (IsTargetNotesAdded);

}
function TargetNotes()
{
    var result=false;
    if ($("#txtTargetNotes").val().trim() != '')
        result=true;
    return result;
}

function RoleSelectionRequired() {

    var RequiredMessage = 'Please Select atleast one Role (Core, Lead, Manage)';
    if ($('#tblMain input[type=checkbox]:checked').length > 0) {
        return true;
    }
    else {

        SetValidationMessage(RequiredMessage);
        return false;

    }

    return ($('#tblEmpDetails input[type=checkbox]:checked').length > 0)

}

function performEvent() {
    ClearValidation();
    
    if (ValidateRecord() == false) {       
        ShowMessage(false, "Please Insert Target Notes");
        return;
    }
    //var chkEmployee = false;

    //$("#hdnEmployeeCount").val(0);
    //    if (Validate_Dates() == true) {
    //        ShowMessage(false, "FromDate should be less than or equal to ToDate.");
    //        return false;
    //    }
    ClearMessage();
    var AdditionalKRA = ($("#txtAdditionalKRA").val().length > 0) ? $("#txtAdditionalKRA").val() : "";
    var TargetNotes = ($("#txtTargetNotes").val().length > 0) ? $("#txtTargetNotes").val() : "";
    $.ajax({
        type: "POST",
        async: false,
        url: 'ProjectTeamDefinition_3.aspx/insert',
        data: "{ 'AdditionalKRA' : '" + AdditionalKRA + "','TargetNotes':'" + TargetNotes + "'}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {

            //                    var empCount = result.d[0];
            //                    $("#hdnEmployeeCount").val(empCount);
            PageMode = result.d;
            RedirectParent();
        }
    });
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
//    // $("#tblMain tr").each(function () {

//    //        var td_startDate = $(this).find('td:nth-child(2)');
//    //        var strDate = td_startDate.find("input[id^='txtStartDate']").val();


//    //        var td_endDate = $(this).find('td:nth-child(3)');
//    //        var endDate = td_endDate.find("input[id^='txtEndDate']").val();

//    //            var td_Core = $(this).find('td:nth-child(4)');
//    //            var chkCore = td_Core.find("input[id^='chkCore']").attr('checked');

//    //            var td_Lead = $(this).find('td:nth-child(5)');
//    //            var chkLead = td_Lead.find("input[id^='chkLead']").attr('checked');

//    //            var td_Manage = $(this).find('td:nth-child(6)');
//    //            var chkManage = td_Manage.find("input[id^='chkManage']").attr('checked');


//    //        if (strDate == undefined) { return; }
//    //        else {
//    //            var empNo = $("#hdnEmployeeCount").val();
//    //            $.ajax({
//    //                type: "POST",
//    //                url: 'ProjectTeamDefinition_3.aspx/CheckEmployee',
//    //                data: "{ 'startDate' : '" + strDate + "','EndDate' : '" + endDate + "','empNo' : '" + empNo + "'}",
//    //                contentType: 'application/json; charset=utf-8',
//    //                datatype: 'json',
//    //                success: function (result) {
//    //                    var jsonResult = jQuery.parseJSON(result.d);
//    //                    if (jsonResult == "true") {
//    //                        chkEmployee = true;
//    //                    }
//    //                }
//    //            });
//    //            $("#hdnEmployeeCount").val(parseInt($("#hdnEmployeeCount").val()) + 1);
//    // }

//    //});
//    //    if (chkEmployee == true) {

//    //        ClearMessage();
//    //        ShowMessage(false, 'The same resource(s) is(are) getting repeated in the same date or date range. Please do allocation for other dates');
//    //        return false;
//    //    }
//    //    else {

//    ClearMessage();
//    $("#hdnEmployeeCount").val(0);
//    $("#tblMain tr").each(function () {
//        var td_Core = $(this).find('td:nth-child(4)');
//        var chkCore = td_Core.find("input[id^='chkCore']");
//        var Core = chkCore.prop("checked");

//        var td_Lead = $(this).find('td:nth-child(5)');
//        var chkLead = td_Lead.find("input[id^='chkLead']");
//        var Lead = chkLead.prop("checked");

//        var td_Manage = $(this).find('td:nth-child(6)');
//        var chkManage = td_Manage.find("input[id^='chkManage']");
//        var Manage = chkManage.prop("checked");

//        var empNo = $("#hdnEmployeeCount").val();

//        $.ajax({
//            type: "POST",
//            async: false,
//            url: 'ProjectTeamDefinition_3.aspx/insert',
//            data: "{'empNo' : '" + empNo + "','Core' : '" + Core + "','Lead' : '" + Lead + "','Manage' : '" + Manage + "'}",
//            contentType: 'application/json; charset=utf-8',
//            datatype: 'json',
//            success: function (result) {
//                var empCount = result.d[0];
//                var count = empCount[0];
//                $("#hdnEmployeeCount").val(count);
//                PageMode = result.d[1];
//            }
//        });
//    });

//    $("#hdnEmployeeCount").val(0);

//    if ($("#txtAdditionalKRA").val().length > 0) {
//        $("#tblMain tr").each(function () {
//            //                var td_startDate = $(this).find('td:nth-child(2)');
//            //                var strDate = td_startDate.find("input[id^='txtStartDate']").val();

//            //                var td_endDate = $(this).find('td:nth-child(3)');
//            //                var endDate = td_endDate.find("input[id^='txtEndDate']").val();

//            //                if (strDate == undefined) { return; }
//            //                else {
//            var empNo = $("#hdnEmployeeCount").val();
//            var KPIName = $("#txtAdditionalKRA").val();
//            $.ajax({
//                type: "POST",
//                async: false,
//                url: 'ProjectTeamDefinition_3.aspx/insertAdditionalKRA',
//                data: "{ 'startDate' : '" + strDate + "','EndDate' : '" + endDate + "','empNo' : '" + empNo + "','KPIName' : '" + KPIName + "'}",
//                contentType: 'application/json; charset=utf-8',
//                datatype: 'json',
//                success: function (result) {
//                    var empCount = result.d[0];
//                    $("#hdnEmployeeCount").val(empCount);
//                    PageMode = result.d[1];
//                }
//            });
//        });
//        $.ajax({
//            type: "POST",
//            url: 'ProjectTeamDefinition_3.aspx/SendEmail',
//            data: {},
//            contentType: 'application/json; charset=utf-8',
//            datatype: 'json',
//            success: function (result) {

//            }
//        });
//        var AdditionalKPIName = $("#txtAdditionalKRA").val();
//        $.ajax({
//            type: "POST",
//            url: 'ProjectTeamDefinition_3.aspx/VerifyAdditionalKRA',
//            data: "{ 'AdditionalKPIName' : '" + AdditionalKPIName + "'}",
//            contentType: 'application/json; charset=utf-8',
//            datatype: 'json',
//            success: function (result) {

//            }
//        });

//    }
//    RedirectParent();

//}

function RedirectParent() {
    $.ajax({
        type: "POST",
        url: 'ProjectTeamDefinition_3.aspx/GetEncryptedData',
        data: {},
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {

            if (PageMode == "Edit") {
                window.location.href = "../Admin/searchteammembers.aspx?Data=" + result.d;

            }
            else {

                window.location.href = "TeamSelection_Step1.aspx?Data=" + result.d;

            }
        }
    });
}
$(document).on('click', '#btnback', function () {

    $.ajax({
        type: "POST",
        async: false,
        url: 'ProjectTeamDefinition_3.aspx/StoreBackDetails',
        data: '{}',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            var Back = result.d;
            window.location = "../KRA/ProjectTeamDefinition_2.aspx?IsBack=" + Back;

        },
        error: function (response) {
            //alert(response.responseText);
            alert(response);
        }
    });

});






