function GetObjectiveList() {
    $.ajax({
        url: "../KRA/AddKRA.aspx/GetObjectiveList",
        type: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (jsonData) {
            ObjObjectiveList = jQuery.parseJSON(jsonData.d);
            $("#ddlObjective").append($("<option></option>").val("0").html("Please select"));
            for (var i = 0; i < ObjObjectiveList.length; i++) {
                $("#ddlObjective").append($("<option></option>").val(ObjObjectiveList[i].ObjectiveID).html(ObjObjectiveList[i].ObjectiveTitle));
            }
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}

function GetParentFuncList(FunctionID) {
    $("#ddlParentFunc").empty();
    $.ajax({
        url: "../KRA/FunctionListing.aspx/GetParentFunc",
        type: "post",
        contentType: "application/json; charset=utf-8",
        data: '{ "FunctionID": "' + FunctionID + '"}',
        dataType: "json",
        success: function (jsonData) {
            ParentFuncList = jQuery.parseJSON(jsonData.d);
            $("#ddlParentFunc").append($("<option></option>").val("0").html("Please select Function"));
            for (var i = 0; i < ParentFuncList.length; i++) {
                $("#ddlParentFunc").append($("<option></option>").val(ParentFuncList[i].FunctionID).html(ParentFuncList[i].FunctionTitle));
            }
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}



function InsertKRADetail(SelectedObjectiveID, KRATitle, KRADescription) {
    if (SelectedObjectiveID != 0 && KRATitle != "" && KRADescription != "") {
        $.ajax({
            url: "../KRA/AddKRA.aspx/InsertKRADetail",
            type: "post",
            contentType: "application/json; charset=utf-8",
            data: '{ "ObjectiveID": "' + SelectedObjectiveID + '", "KRATitle": "' + KRATitle + '", "KRADescription": "' + KRADescription + '"}',
            dataType: "json",
            success: function (jsonData) {
                if (jsonData.d == true) {
                    ClearKRAControls();
                    $("#lblMessage").text("KRA saved successfully.").addClass("green-msg");
                    $("#AddMoreKRA").css("display", "block");
                    $("#AddMoreKRA").show();

                }
                else if (jsonData.d == false) {
                    $("#lblMessage").text("KRA already exists.").addClass("yellow-error");

                }
            },
            error: function (response) {
                alert(response.responseText);
            }
        });
    }   
}

function BindChangeEventForObjective() {

    SelectedObjectiveID = $("#ddlObjective option:selected").val();
    var SelectedObjective = $("#ddlObjective option:selected").text();
    //alert(SelectedObjective);
    var data = '{"ObjectiveID":"' + SelectedObjectiveID + '"}';
    //alert(data);
    $("#divSelectedObjective").text("").css("background-color", "white").removeClass("dropdown-text");
    if (SelectedObjectiveID != 0) {

        $.ajax({
            url: "../KRA/AddKRA.aspx/GetObjectiveBackgroundColor",
            type: "post",
            contentType: "application/json;charset=utf-8",
            data: '{"ObjectiveID":"' + SelectedObjectiveID + '"}',
            dataType: "json",
            success: function (jsonData) {
                // alert("success");
                //alert(jsonData.d.toString());
                var color = jsonData.d.substr(1, (jsonData.d.length - 2));
                //alert(color);
                $("#divSelectedObjective").text(SelectedObjective).css("background-color", color).addClass("dropdown-text");
                $("#divSelectedObjective").show();
            },
            error: function (response) {
                alert(response.responseText);
            }
        });
    }
    //    else {
    //    
    //    $("#divSelectedObjective").text("").css("background-color", "white").removeClass("dropdown-text");
    //    }
    //         $("#txtSelectedObjective").val(SelectedObjective).css("Backgroundcolor",);

}

function ClearKRAControls() {
    $("#ddlObjective").empty();
    $("#txtKRATitle").val("");
    $("#txtKRADescription").val("");
    // $("#lblSelectedObjective").text("").css("background-color", "white");
    $("#divSelectedObjective").hide();
    $("#vs").empty();
    $("#lblMessage").text("").removeClass('alert alert-success');
    $("#lblMessage").text("").removeClass('alert alert-warning');
    //$("#AddMoreKRA").hide();
}

function ClearObjectiveControls() {
    //alert("clear");
    $("#txtObjectiveTitle").val("");
    $("#txtObjectiveDescription").val("");
    $("#txtObjBGcolor").val("ffffff").blur();
    $("#txtKRABGcolor").val("#ffffff");

    //$("#spancolor").css("background-color", "white")        

    $("#ValidationSummary1").empty();
    $("#lblObjectiveMessage").text("").removeClass('alert alert-success');
    $("#lblObjectiveMessage").text("").removeClass('alert alert-warning');
    //$("#AddMoreObj").hide();
}

function InsertObjectiveDetail(ObjectiveID, ObjectiveTitle, ObjectiveDescription, ObjectiveBGColor, KRABGColor) {
    //alert("I am Insert function");

    if (ObjectiveTitle != "" && ObjectiveDescription != "" && ObjectiveBGColor != "" && KRABGColor != "") {
        $.ajax({
            url: "../KRA/ObjectivesAndKRAs.aspx/InsertObjectiveDetail",
            type: "post",
            contentType: "application/json;charset=utf-8",
            data: '{"ObjectiveID":"' + ObjectiveID + '","ObjectiveTitle":"' + ObjectiveTitle + '","ObjectiveDescription":"' + ObjectiveDescription + '","ObjectiveBGColor":"' + ObjectiveBGColor + '","KRABGColor":"' + KRABGColor + '"}',
            success: function (jsonData) {
                //alert(jsonData.d);
                var Obj = (jsonData.d).toString().split(',');
                var ResultStr = "";
                if (jsonData.d == 1 && ObjectiveID == 0) {
                    // alert("success");
                    ClearObjectiveControls();
                    $("#lblObjectiveMessage").text("Objective saved successfully.").addClass("green-msg");
                    $("#AddMoreObj").css("display", "block");
                    $("#AddMoreObj").show();
                    //PageLoadMethod();
                }
                for (var index = 0; index < Obj.length; index++) {

                    if (Obj[index] == 2) {
                        ResultStr = ResultStr + "Objective already exists.";
                        $("#AddMoreObj").hide();
                        //$("#lblObjectiveMessage").text("Objective already exists.").addClass("yellow-error");
                    }
                    if (Obj[index] == 3) {
                        if (ResultStr == "") {
                            ResultStr = ResultStr + "Objective color already exists.";
                            $("#AddMoreObj").hide();
                        }
                        else {
                            ResultStr = ResultStr + " " + "&" + " " + "Objective color already exists";
                            $("#AddMoreObj").hide();
                        }
                        //$("#lblObjectiveMessage").text("Objective color already exists.").addClass("yellow-error");
                    }
                    if (Obj[index] == 4) {
                        if (ResultStr == "") {
                            ResultStr = ResultStr + "KRA color already exists.";
                            $("#AddMoreObj").hide();
                        }
                        else {
                            ResultStr = ResultStr + " " + "&" + " " + "KRA color already exists.";
                            $("#AddMoreObj").hide();
                        }
                    }
                }
                
                if (jsonData.d == 1 && ObjectiveID > 0) {
                    $("#lblObjectiveMessage").text("Objective updated successfully.").addClass("green-msg");
                    $("#EditObjectiveDialog").dialog("close");
                }
                if (ResultStr != "") {
                    $("#lblObjectiveMessage").text(ResultStr).addClass("yellow-error");
                }
            },
            error: function (response) {
                alert(response.responseText);
            }
        });
    }
}

function UpdateKRADetail(SelectedKraIDToEdit, SelectedObjectiveID, KRATitle, KRADescription) {    
    //if (SelectedObjectiveID != 0 && (KRATitle != null || KRATitle != "") && (KRADescription != null || KRADescription != "")) {
    if (SelectedObjectiveID != 0 && (KRATitle != "") && (KRADescription != "")) {
        $.ajax({
            url: "../KRA/AddKRA.aspx/UpdateKRADetail",
            type: "post",
            async: false,
            contentType: "application/json; charset=utf-8",
            data: '{ "SelectedKraIDToEdit":"' + SelectedKraIDToEdit + '","ObjectiveID": "' + SelectedObjectiveID + '", "KRATitle": "' + KRATitle + '", "KRADescription": "' + KRADescription + '"}',
            dataType: "json",
            success: function (jsonData) {
                if (jsonData.d == 1) {
                    $("#lblMessage").text("KRA updated successfully.").addClass("green-msg");
                    $("#EditKRADialog").dialog("close");
                }
                else if (jsonData.d == 0) {
                    $("#lblMessage").text("KRA not modified.").addClass("yellow-error");
                }
                else if (jsonData.d == 2) {
                    $("#lblMessage").text("KRA aleready exists.").addClass("yellow-error");
                }
            },
            error: function (response) {
                alert(response.responseText);
            }
        });
    }
}

function GetStep2DetailOnBtnBackAndYesChecked() {
    //    if (IsYes) {
    $.ajax({
        url: "../KRA/KPIPreview.aspx/GetSameGuidelines",
        type: "post",
        contentType: "application/json;charset=utf-8",
        success: function (jsonData) {
            var str = jQuery.parseJSON(jsonData.d);
            //str = str.substr(1, (str.length - 2));

            var regex = /<br\s*[\/]?>/gi;
            $("#txtAreaGuideline").val(str.replace(regex, "\n"));

        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}

function GetStep2DetailOnBtnBackAndNoChecked() {
    $.ajax({
        url: "../KRA/KPIPreview.aspx/GetGuidelinesOnBackButtonClick",
        type: "post",
        contentType: "application/json;charset=utf-8",
        success: function (jsonData) {            
            var Obj = jQuery.parseJSON(jsonData.d);
            var ObjGuidelinesDetail = Obj.GuidelinesDetail.TblGuideline;
            var IsCoreLevelChecked = Obj.ChkKpiLevels.IsCoreLevelChecked;
            var IsLeadLevelChecked = Obj.ChkKpiLevels.IsLeadLevelChecked;
            var IsManageLevelChecked = Obj.ChkKpiLevels.IsManageLevelChecked;
            var ObjFunctionDetails = Obj.GuidelinesDetail.TblFunction;
            //alert(ObjFunctionDetails);
            for (var Index = 0; Index < ObjGuidelinesDetail.length; Index++) {
                //$(Obj.TblGuideline[Index].TextAreaID).val(Obj.TblGuideline[Index].TextGuideline);
                var str = ObjGuidelinesDetail[Index].TextGuideline;
                //str = str.substr(1, (str.length - 2));
                //alert(str);
                var regex = /<br\s*[\/]?>/gi;
                $(ObjGuidelinesDetail[Index].TextAreaID).val(str.replace(regex, "\n"));
            }

           
            for (var Index = 0; Index < ObjFunctionDetails.length; Index++) {
                var IsKPIApplicable_Core = ObjFunctionDetails[Index].IsKPIApplicable_Core;
                var IsKPIApplicable_Lead = ObjFunctionDetails[Index].IsKPIApplicable_Lead;
                var IsKPIApplicable_Manage = ObjFunctionDetails[Index].IsKPIApplicable_Manage;
                var functionID = ObjFunctionDetails[Index].FunctionID;
             
                if (IsKPIApplicable_Core) {
                    $("#chkKPI_1_" + functionID).prop('checked', true);
                    $("#TxtArea_1_" + functionID).prop('disabled', false);
                }
                if (IsKPIApplicable_Lead) {
                    $("#chkKPI_2_" + functionID).prop('checked', true);
                    $("#TxtArea_2_" + functionID).prop('disabled', false);
                }
                if (IsKPIApplicable_Manage) {
                    $("#chkKPI_3_" + functionID).prop('checked', true);
                    $("#TxtArea_3_" + functionID).prop('disabled', false);
                }
            }

            if (IsCoreLevelChecked) {
                $("#chkCoreLevel").prop('checked', true);
                for (var FunctionIndex = 0; FunctionIndex < ObjFunctionDetails.length; FunctionIndex++) {
                    var functionID = ObjFunctionDetails[FunctionIndex].FunctionID;
                    if (FunctionIndex != 0) {
                        $("#TxtArea_" + 1 + "_" + functionID).css('visibility', 'hidden').val("");
                        $("#chkKPI_1_" + functionID).prop("checked", true).attr('disabled', true);
                    }
                }

            }
            if (IsLeadLevelChecked) {
                $("#chkLeadLevel").prop('checked', true);
                for (var FunctionIndex = 0; FunctionIndex < ObjFunctionDetails.length; FunctionIndex++) {
                    var functionID = ObjFunctionDetails[FunctionIndex].FunctionID;
                    if (FunctionIndex != 0) {
                        $("#TxtArea_" + 2 + "_" + ObjFunctionDetails[FunctionIndex].FunctionID).css('visibility', 'hidden').val("");
                        $("#chkKPI_2_" + functionID).prop("checked", true).attr('disabled', true);
                    }
                }
            }
            if (IsManageLevelChecked) {
                $("#chkManageLevel").prop('checked', true);
                for (var FunctionIndex = 0; FunctionIndex < ObjFunctionDetails.length; FunctionIndex++) {
                    var functionID = ObjFunctionDetails[FunctionIndex].FunctionID;
                    if (FunctionIndex != 0) {
                        $("#TxtArea_" + 3 + "_" + ObjFunctionDetails[FunctionIndex].FunctionID).css('visibility', 'hidden').val("");
                        $("#chkKPI_3_" + functionID).prop("checked", true).attr('disabled', true);
                    }
                }

            }

        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}
function Vallenato() {

    //Add Inactive Class To All Accordion Headers

    $('.accordion-header').toggleClass('inactive-header');

    //Set The Accordion Content Width
    var contentwidth = $('.accordion-header').width();
    $('.accordion-content').css({ 'width': contentwidth });

    //Open The First Accordion Section When Page Loads
    $('.accordion-header').first().toggleClass('active-header').toggleClass('inactive-header');
    $('.accordion-content').first().slideDown().toggleClass('open-content');

    // The Accordion Effect
    // $('.accordion-header').click(function () {
}
$(document).on('click', ".accordion-header", function () {    
    if ($(this).is('.inactive-header')) {
        $('.active-header').toggleClass('active-header').toggleClass('inactive-header').next().slideToggle().toggleClass('open-content');
        $(this).toggleClass('active-header').toggleClass('inactive-header');
        $(this).next().slideToggle().toggleClass('open-content');
    }

    else {
        $(this).toggleClass('active-header').toggleClass('inactive-header');
        $(this).next().slideToggle().toggleClass('open-content');
    }
    return false;
});

