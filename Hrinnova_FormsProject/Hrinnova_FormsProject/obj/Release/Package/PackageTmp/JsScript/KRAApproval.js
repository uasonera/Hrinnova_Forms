$(document).ready(function () {
    BindProjectData();
    var ProjFuncDetails;
    var KraKpiDetails;
    var FuncDetails;
    var CommonKraKpi;
    var EnumRole = { Core: 1, Lead: 2, Manage: 3 };
    EnumRoleText = { Core: 'Core', Lead: 'Lead', Manage: 'Manage' };
    chkProjStatus();
});
function BindProjectData() {
    $.ajax({
        type: "POST",
        url: 'KRAApproval.aspx/GetProjDetails',
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            var Details = jQuery.parseJSON(result.d);
            if (Details.length == 0) {
                ShowNoRecordFoundMessage();
                return;
            }
            var ProjDetails = Details.dtProjDetails;

            ProjFuncDetails = Details.dtProjFuncDetails;


            var ProjStartDate = ProjDetails[0].ProjStartDate;
            //var ProjEndDate = ProjDetails[0].EndDate;
            var ExpectedDuration = ProjDetails[0].duration;

            var FunctionString = "";
            if (ProjStartDate != null) {
                var SplitedProjectStartDate = (ProjDetails[0].ProjStartDate).split('T');

                ProjStartDate = SplitedProjectStartDate[0];
            }

            var SplitedKRACreatedDate = (ProjDetails[0].KRACreatedDate).split('T');
            var KRACreatedDate = SplitedKRACreatedDate[0];

            $("#ProjName").html("<center><strong>" + ProjDetails[0].code + " - " + ProjDetails[0].proName + "</strong></center>").css("font-size", "16px");
            $("#ProjName").append($('<div></div>').attr("id", "divKraCreatedDetails"));
            $("#divKraCreatedDetails").html("<center> KRA Created On " + KRACreatedDate + ", by " + ProjDetails[0].CreatedBy + "</center>").css("font-size", "13px");
            $("#divProjStartOn").text(ProjStartDate);
            $("#divRole").text(ProjDetails[0].RoleName);

            if (ExpectedDuration != null) {
                $("#divPartivipationDuration").text(ExpectedDuration);
            }
            else {
                $("#divPartivipationDuration").text("N/A");
            }
            for (var FuncIndex = 0; FuncIndex < ProjFuncDetails.length; FuncIndex++) {
                if (FuncIndex == 0) {
                    FunctionString = FunctionString + ProjFuncDetails[FuncIndex].FunctionTitle;
                }
                else {
                    FunctionString = FunctionString + "," + ProjFuncDetails[FuncIndex].FunctionTitle;
                }
            }
            $("#divFunc").text(FunctionString);

            BindAdditionalKRA();
            KRASetup();
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}

function BindAdditionalKRA() {
    $.ajax({
        type: "POST",
        url: 'KRAApproval.aspx/GetAdditionalKRADetails',
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (jsonResult) {
            var result = jQuery.parseJSON(jsonResult.d);
            var isEmpty = jQuery.isEmptyObject(result);
            if (isEmpty != true) {
                var KPIName = result[0].KPIName;
                $("#txtAdditionalKRA").text(KPIName);
            }
            else {
                $("#txtAdditionalKRA").html("No Additional KRA Found");
            }


        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}
function KRASetup() {
    $.ajax({
        type: "POST",
        url: 'KRAApproval.aspx/GetKRAKPIDetails',
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            //KraKpiDetails = jQuery.parseJSON(result.d)
            var JsonResult = jQuery.parseJSON(result.d);
            KraKpiDetails = JsonResult.dtKraKpiDetails;
            FuncDetails = ProjFuncDetails;
            CommonKraKpi = JsonResult.dtCommonKraKpi;

            $("#divKRASetup").append($("<div></div>").attr("id", "divTabs")).append($("<br/><br/>"));
            $("#divTabs").append($('<ul></ul>').attr("id", "ulTab"));


            for (var FunctionIndex = 0; FunctionIndex < FuncDetails.length; FunctionIndex++) {

                var FunctionId = FuncDetails[FunctionIndex].FunctionID;
                var flag = 0;
                //$("#divKRASetup").append($("<div></div>").attr("id", "divFunction" + FunctionId));
                $("#ulTab").append($('<li></li>').append($('<a ></a>').attr("href", "#tab_" + FunctionId).append($("<p></p>").append($("<span></span>").html("<strong>" + FuncDetails[FunctionIndex].FunctionTitle + "</strong>")))));
                //$("#divFunction" + FunctionId).append($("<p></p>").append($("<span></span>").html("<strong>" + FuncDetails[FunctionIndex].FunctionTitle + "</strong>")));
                $("#divTabs").append($('<div></div>').attr("id", "tab_" + FunctionId));
                //.append($("<p></p>").append($("<span></span>").html("<strong>" + FuncDetails[FunctionIndex].FunctionTitle + "</strong>")));

                for (var KraIndex = 0; KraIndex < KraKpiDetails.length; KraIndex++) {


                    var KraId = KraKpiDetails[KraIndex].KRAID;
                    var KpiId = KraKpiDetails[KraIndex].KPIID;
                    var RoleId = KraKpiDetails[KraIndex].RoleID;

                    var RoleText = KraKpiDetails[KraIndex].RoleText;
                    var IsApplicable = KraKpiDetails[KraIndex].IsApplicable;
                    var KpiFunctionID = KraKpiDetails[KraIndex].KPIFunctionID;
                    if (FunctionId == KraKpiDetails[KraIndex].FunctionID) {
                        if (KraIndex == 0) {
                            //$("#divFunction" + FunctionId).append($("<div></div>").attr("id", "divKRA" + KraId + "_Function" + FunctionId));
                            $("#tab_" + FunctionId).append($("<div class='accordion-main-box' ></div>").attr("id", "divKRA" + KraId + "_Function" + FunctionId));

                            $("#tab_" + FunctionId).append('<br/><br/>');
                            $("#divKRA" + KraId + "_Function" + FunctionId).append($("<div  class='sec-heading'></div>").attr("id", "divKRATitle" + KraId).text(KraKpiDetails[KraIndex].KRATitle).css("background-color", "#" + KraKpiDetails[KraIndex].KRABGColor));

                            $("#divKRA" + KraId + "_Function" + FunctionId).append("<br/>");


                            if (!($("#tab_" + FunctionId).find("#divKRA" + KraId + 'Kra' + KraId + 'Function' + FunctionId + 'Role' + EnumRoleText.Core).length > 0)) {
                                $("#divKRA" + KraId + "_Function" + FunctionId).append($('<div  class="accordion-sub-box"></div>').attr('id', 'divKRA' + KraId + 'Kra' + KraId + 'Function' + FunctionId + 'Role' + EnumRoleText.Core).html('<span>' + EnumRoleText.Core + '</span><br/><br/>'));
                            }

                            if (!($("#tab_" + FunctionId).find("#divKRA" + KraId + 'Kra' + KraId + 'Function' + FunctionId + 'Role' + EnumRoleText.Lead).length > 0)) {
                                $("#divKRA" + KraId + "_Function" + FunctionId).append($('<div  class="accordion-sub-box"></div>').attr('id', 'divKRA' + KraId + 'Kra' + KraId + 'Function' + FunctionId + 'Role' + EnumRoleText.Lead).html('<span>' + EnumRoleText.Lead + '</span><br/><br/>'));
                            }

                            if (!($("#tab_" + FunctionId).find("#divKRA" + KraId + 'Kra' + KraId + 'Function' + FunctionId + 'Role' + EnumRoleText.Manage).length > 0)) {
                                $("#divKRA" + KraId + "_Function" + FunctionId).append($('<div  class="accordion-sub-box"></div>').attr('id', 'divKRA' + KraId + 'Kra' + KraId + 'Function' + FunctionId + 'Role' + EnumRoleText.Manage).html('<span>' + EnumRoleText.Manage + '</span><br/><br/>'));
                            }

                            if (RoleText == EnumRoleText.Core) {

                                $("#divKRA" + KraId + 'Kra' + KraId + 'Function' + FunctionId + 'Role' + EnumRoleText.Core).append($("<div style='line-height:20px;'></div>").attr("id", "divKPI" + KpiId).append($('<input>').attr({
                                    type: 'checkbox', name: 'chkKPI', disabled: KraKpiDetails[KraIndex].IsMandatory == true ? true : false, checked: KraKpiDetails[KraIndex].IsMandatory == true ? true : false, value: KraKpiDetails[KraIndex].KPITitle, id: 'chkKpi' + '_KpiFuntionID' + KpiFunctionID + '_RoleID' + RoleId

                                })).append($('<span></span>').addClass("spanKpiTitle").attr("id", "KpiTitle_" + KpiId).html(KraKpiDetails[KraIndex].KPITitle)));


                            }

                            else if (RoleText == EnumRoleText.Lead) {

                                $("#divKRA" + KraId + 'Kra' + KraId + 'Function' + FunctionId + 'Role' + EnumRoleText.Lead).append($("<div style='line-height:20px;'></div>").attr("id", "divKPI" + KpiId).append($('<input>').attr({
                                    type: 'checkbox', name: 'chkKPI', disabled: KraKpiDetails[KraIndex].IsMandatory == true ? true : false, checked: KraKpiDetails[KraIndex].IsMandatory == true ? true : false, value: KraKpiDetails[KraIndex].KPITitle, id: 'chkKpi' + '_KpiFuntionID' + KpiFunctionID + '_RoleID' + RoleId

                                })).append($('<span></span>').addClass("spanKpiTitle").attr("id", "KpiTitle_" + KpiId).html(KraKpiDetails[KraIndex].KPITitle)));


                            }
                            else if (RoleText == EnumRoleText.Manage) {

                                $("#divKRA" + KraId + 'Kra' + KraId + 'Function' + FunctionId + 'Role' + EnumRoleText.Manage).append($("<div style='line-height:20px;'></div>").attr("id", "divKPI" + KpiId).append($('<input>').attr({
                                    type: 'checkbox', name: 'chkKPI', disabled: KraKpiDetails[KraIndex].IsMandatory == true ? true : false, checked: KraKpiDetails[KraIndex].IsMandatory == true ? true : false, value: KraKpiDetails[KraIndex].KPITitle, id: 'chkKpi' + '_KpiFuntionID' + KpiFunctionID + '_RoleID' + RoleId

                                })).append($('<span></span>').addClass("spanKpiTitle").attr("id", "KpiTitle_" + KpiId).html(KraKpiDetails[KraIndex].KPITitle)));


                            }


                        }
                        else {


                            if ($("#tab_" + FunctionId).find("#divKRA" + KraId + "_Function" + FunctionId).length == 0) {



                                $("#tab_" + FunctionId).append($("<div  class='accordion-main-box'></div>").attr("id", "divKRA" + KraId + "_Function" + FunctionId));

                                $("#tab_" + FunctionId).append('<br/><br/>');
                                $("#divKRA" + KraId + "_Function" + FunctionId).append($("<div  class='sec-heading'></div>").attr("id", "divKRATitle" + KraId).text(KraKpiDetails[KraIndex].KRATitle).css("background-color", "#" + KraKpiDetails[KraIndex].KRABGColor));

                                $("#divKRA" + KraId + "_Function" + FunctionId).append("<br/>");

                            }

                            if (!($("#tab_" + FunctionId).find("#divKRA" + KraId + 'Kra' + KraId + 'Function' + FunctionId + 'Role' + EnumRoleText.Core).length > 0)) {
                                $("#divKRA" + KraId + "_Function" + FunctionId).append($('<div  class="accordion-sub-box"></div>').attr('id', 'divKRA' + KraId + 'Kra' + KraId + 'Function' + FunctionId + 'Role' + EnumRoleText.Core).html('<span>' + EnumRoleText.Core + '</span><br/><br/>'));
                            }

                            if (!($("#tab_" + FunctionId).find("#divKRA" + KraId + 'Kra' + KraId + 'Function' + FunctionId + 'Role' + EnumRoleText.Lead).length > 0)) {
                                $("#divKRA" + KraId + "_Function" + FunctionId).append($('<div  class="accordion-sub-box"></div>').attr('id', 'divKRA' + KraId + 'Kra' + KraId + 'Function' + FunctionId + 'Role' + EnumRoleText.Lead).html('<span>' + EnumRoleText.Lead + '</span><br/><br/>'));
                            }

                            if (!($("#tab_" + FunctionId).find("#divKRA" + KraId + 'Kra' + KraId + 'Function' + FunctionId + 'Role' + EnumRoleText.Manage).length > 0)) {
                                $("#divKRA" + KraId + "_Function" + FunctionId).append($('<div  class="accordion-sub-box"></div>').attr('id', 'divKRA' + KraId + 'Kra' + KraId + 'Function' + FunctionId + 'Role' + EnumRoleText.Manage).html('<span>' + EnumRoleText.Manage + '</span><br/><br/>'));
                            }

                            if (RoleText == EnumRoleText.Core) {

                                $("#divKRA" + KraId + 'Kra' + KraId + 'Function' + FunctionId + 'Role' + EnumRoleText.Core).append($("<div style='line-height:20px;'></div>").attr("id", "divKPI" + KpiId).append($('<input>').attr({
                                    type: 'checkbox', name: 'chkKPI', disabled: KraKpiDetails[KraIndex].IsMandatory == true ? true : false, checked: KraKpiDetails[KraIndex].IsMandatory == true ? true : false, value: KraKpiDetails[KraIndex].KPITitle, id: 'chkKpi' + '_KpiFuntionID' + KpiFunctionID + '_RoleID' + RoleId

                                })).append($('<span></span>').addClass("spanKpiTitle").attr("id", "KpiTitle_" + KpiId).html(KraKpiDetails[KraIndex].KPITitle)));


                            }

                            else if (RoleText == EnumRoleText.Lead) {

                                $("#divKRA" + KraId + 'Kra' + KraId + 'Function' + FunctionId + 'Role' + EnumRoleText.Lead).append($("<div style='line-height:20px;'></div>").attr("id", "divKPI" + KpiId).append($('<input>').attr({
                                    type: 'checkbox', name: 'chkKPI', disabled: KraKpiDetails[KraIndex].IsMandatory == true ? true : false, checked: KraKpiDetails[KraIndex].IsMandatory == true ? true : false, value: KraKpiDetails[KraIndex].KPITitle, id: 'chkKpi' + '_KpiFuntionID' + KpiFunctionID + '_RoleID' + RoleId

                                })).append($('<span></span>').addClass("spanKpiTitle").attr("id", "KpiTitle_" + KpiId).html(KraKpiDetails[KraIndex].KPITitle)));


                            }
                            else if (RoleText == EnumRoleText.Manage) {

                                $("#divKRA" + KraId + 'Kra' + KraId + 'Function' + FunctionId + 'Role' + EnumRoleText.Manage).append($("<div style='line-height:20px;'></div>").attr("id", "divKPI" + KpiId).append($('<input>').attr({
                                    type: 'checkbox', name: 'chkKPI', disabled: KraKpiDetails[KraIndex].IsMandatory == true ? true : false, checked: KraKpiDetails[KraIndex].IsMandatory == true ? true : false, value: KraKpiDetails[KraIndex].KPITitle, id: 'chkKpi' + '_KpiFuntionID' + KpiFunctionID + '_RoleID' + RoleId

                                })).append($('<span></span>').addClass("spanKpiTitle").attr("id", "KpiTitle_" + KpiId).html(KraKpiDetails[KraIndex].KPITitle)));


                            }


                        }
                    }

                    if (KraKpiDetails[KraIndex].IsApplicable == 1) {
                        $("#chkKpi_KpiFuntionID" + KpiFunctionID + "_RoleID" + RoleId).prop("checked", "checked");
                    }
                }

            }
            //CommonKRA();

            $("#ulTab").append($('<li></li>').append($('<a></a>').attr("href", "#tabCommonKRA").append($("<p></p>").append($("<span></span>").html("<strong>Common KRA</strong>")))));
            $("#divTabs").append($('<div class="sec-heading"></div>').attr("id", "tabCommonKRA"));
            if (CommonKraKpi.length > 0) {
                var FunctionIds = [];
                for (var i = 0; i < CommonKraKpi.length; i++) {
                    if ((jQuery.inArray(CommonKraKpi[i].FunctionID, FunctionIds)) == -1) {
                        FunctionIds.push(CommonKraKpi[i].FunctionID);
                    }
                }

                for (var i = 0; i < FunctionIds.length; i++) {
                    $("#tabCommonKRA").append($("<div class='accordion-main-box' style='width:100%;height:auto;margin-bottom:5px;'></div>").attr("id", "divFunction" + FunctionIds[i]));
                }

                for (var Index = 0; Index < CommonKraKpi.length; Index++) {
                    var FunctionId = CommonKraKpi[Index].FunctionID;
                    if ($("#divFunc" + FunctionId).length == 0) {
                        $("#divFunction" + FunctionId).append($('<div></div>').attr("id", "divFunc" + FunctionId).html("<span style='font-weight:800;font-size:15px;'>" + CommonKraKpi[Index].FunctionTitle + "</span>"));
                    }
                }
                for (var j = 0; j < CommonKraKpi.length; j++) {
                    var kradiv = $("#divFunction" + CommonKraKpi[j].FunctionID).find("#divKRATitle" + CommonKraKpi[j].KRAID);

                    if (kradiv.length == 0) {
                        $("#divFunction" + CommonKraKpi[j].FunctionID).append("<div style='clear:both;'></div>");
                        $("#divFunction" + CommonKraKpi[j].FunctionID).append($('<div class="sec-heading" style="background:#' + CommonKraKpi[j].KRABGColor + '"></div>').attr("id", "divKRATitle" + CommonKraKpi[j].KRAID).html(CommonKraKpi[j].KRATitle));
                        $("#divFunction" + CommonKraKpi[j].FunctionID).append("<div style='clear:both;'></div>");
                        $("#divFunction" + CommonKraKpi[j].FunctionID).append("<div class='accordion-sub-box' id='Core" + j + "'style='width:33%;float:left;'><span style='font-weight:800;'>Core</span><div>");
                        $("#divFunction" + CommonKraKpi[j].FunctionID).append("<div class='accordion-sub-box' id='Lead" + j + "' style='width:33%;float:left;'><span style='font-weight:800;'>Lead</span><div>");
                        $("#divFunction" + CommonKraKpi[j].FunctionID).append("<div class='accordion-sub-box' id='Manage" + j + "' style='width:33%;float:left;'><span style='font-weight:800;'>Manage</span><div>");
                    }
                }
                for (var k = 0; k < CommonKraKpi.length; k++) {
                    var RoleTxt = CommonKraKpi[k].RoleText;
                    if (RoleTxt == 'Core') {
                        var CoreDiv = $("#divFunction" + CommonKraKpi[k].FunctionID).find("div[id^=Core]");
                        CoreDiv.append($("<div><input type='checkbox' name='chkKPI' id='chkKpi_KpiFuntionID" + KpiFunctionID + "_RoleID" + RoleId + "'></div>").append($('<span></span>').addClass("spanKpiTitle").attr("id", "KpiTitle_" + KpiId).html(CommonKraKpi[k].KPITitle)))
                    }
                    if (RoleTxt == 'Lead') {
                        var LeadeDiv = $("#divFunction" + CommonKraKpi[k].FunctionID).find("div[id^=Lead]");
                        LeadeDiv.append($("<div><input type='checkbox' name='chkKPI' id='chkKpi_KpiFuntionID" + KpiFunctionID + "_RoleID" + RoleId + "'></div>").append($('<span></span>').addClass("spanKpiTitle").attr("id", "KpiTitle_" + KpiId).html(CommonKraKpi[k].KPITitle)))
                    }
                    if (RoleTxt == 'Manage') {
                        var ManageDiv = $("#divFunction" + CommonKraKpi[k].FunctionID).find("div[id^=Manage]");
                        ManageDiv.append($("<div><input type='checkbox' name='chkKPI' id='chkKpi_KpiFuntionID" + KpiFunctionID + "_RoleID" + RoleId + "'></div>").append($('<span></span>').addClass("spanKpiTitle").attr("id", "KpiTitle_" + KpiId).html(CommonKraKpi[k].KPITitle)))
                    }
                }
                //                    
                //                    var KraId = CommonKraKpi[Index].KRAID;
                //                    var KpiId = CommonKraKpi[Index].KPIID;
                //                    var FunctionId = CommonKraKpi[Index].FunctionID;
                //                    var RoleId = CommonKraKpi[Index].RoleID;
                //                    var RoleTxt = CommonKraKpi[Index].RoleText;
                //                    $("#tabCommonKRA").append($("<div class='accordion-main-box'></div>").attr("id", "divFunction" + FunctionId));
                //                    $("#divFunction" + FunctionId).append($('<div></div>').attr('id', 'divFuncTitle' + FunctionId).html("<strong>" + CommonKraKpi[Index].FunctionTitle + "</strong>"));
                //                    $("#divFuncTitle" + FunctionId).append("</br>");
                //                    $("#divFuncTitle" + FunctionId).append("<div class='sec-heading' style='background:#" + CommonKraKpi[Index].KRABGColor + "'>" + CommonKraKpi[Index].KRATitle + "</div>");
                //                    $("#divFunction" + FunctionId).append($("<div class='accordion-sub-box' style='width:100%;'></div>").attr("id", "divKRA" + KraId + "Function" + FunctionId));

                //                    $("#divKRA" + KraId + "Function" + FunctionId).append("<div style='clear:both;'></div> ");
                //                    $("#divKRA" + KraId + "Function" + FunctionId).append("<div id='Core" + Index + "'style='width:33%;float:left;font-weight:800;'>Core<div>");
                //                    $("#divKRA" + KraId + "Function" + FunctionId).append("<div id='Lead" + Index + "' style='width:33%;float:left;font-weight:800;'>Lead<div>");
                //                    $("#divKRA" + KraId + "Function" + FunctionId).append("<div id='Manage" + Index + "' style='width:33%;float:left;font-weight:800;'>Manage<div>");
                //                    if (RoleTxt == 'Core') {

                //                        $("#Core" + Index).append($('<div></div>').attr("id", "divKpi_" + KpiId + "Kra_" + KraId + "Function_" + FunctionId).append($('<input>').attr({
                //                            type: 'checkbox', name: 'chkKPI', value: CommonKraKpi[Index].KPITitle, id: 'chkKpi' + '_KpiFuntionID' + KpiFunctionID + '_RoleID' + RoleId
                //                        })).append($('<span></span>').addClass("spanKpiTitle").attr("id", "KpiTitle_" + KpiId).html(CommonKraKpi[Index].KPITitle))).append($('<br/>'));
                //                    }
                //                    if (RoleTxt == 'Lead') {
                //                        $("#Lead" + Index).append($('<div></div>').attr("id", "divKpi_" + KpiId + "Kra_" + KraId + "Function_" + FunctionId).append($('<input>').attr({
                //                            type: 'checkbox', name: 'chkKPI', value: CommonKraKpi[Index].KPITitle, id: 'chkKpi' + '_KpiFuntionID' + KpiFunctionID + '_RoleID' + RoleId
                //                        })).append($('<span></span>').addClass("spanKpiTitle").attr("id", "KpiTitle_" + KpiId).html(CommonKraKpi[Index].KPITitle))).append($('<br/>'));

                //                    }
                //                    if (RoleTxt == 'Manage') {
                //                        $("#Manage" + Index).append($('<div style="line-height:20px;"></div>').attr("id", "divKpi_" + KpiId + "Kra_" + KraId + "Function_" + FunctionId).append($('<input>').attr({
                //                            type: 'checkbox', name: 'chkKPI', value: CommonKraKpi[Index].KPITitle, id: 'chkKpi' + '_KpiFuntionID' + KpiFunctionID + '_RoleID' + RoleId
                //                        })).append($('<span></span>').addClass("spanKpiTitle").attr("id", "KpiTitle_" + KpiId).html(CommonKraKpi[Index].KPITitle))).append($('<br/>'));

                //                    }
                //                    //                    if ($("#tabCommonKRA").find("#divFunction" + FunctionId).length == 0) {
                //                    //                        //alert("hi" + FunctionId);
                //                    //                        $("#tabCommonKRA").append($("<div class='accordion-main-box'></div>").attr("id", "divFunction" + FunctionId));
                //                    //                        $("#divFunction" + FunctionId).append($('<div></div>').attr('id', 'divFuncTitle' + FunctionId).html("<strong>" + CommonKraKpi[Index].FunctionTitle + "</strong>")).append($('<br/>'));
                //                    //                    }

                //                    //                    if ($("#tabCommonKRA").find("#divKRA" + KraId + "Function" + FunctionId).length == 0) {
                //                    //                        $("#divFunction" + FunctionId).append($("<div class='accordion-sub-box'></div>").attr("id", "divKRA" + KraId + "Function" + FunctionId));
                //                    //                        $("#divKRA" + KraId + "Function" + FunctionId).append($('<div></div>').html(CommonKraKpi[Index].KRATitle).css("background-color", "#" + CommonKraKpi[Index].KRABGColor)).append($('<br/>'));
                //                    //                    }

                //                    //                    if ($("#tabCommonKRA").find("#divKRA" + KraId + 'Kra' + KraId + 'Function' + FunctionId + 'Role' + RoleId).length == 0) {

                //                    //                        $("#divKRA" + KraId + "Function" + FunctionId).append($('<div></div>').attr("id", "divKRA" + KraId + "Kra" + KraId + "Function" + FunctionId + "Role" + RoleId).append($('<div></div>').html("<strong>" + CommonKraKpi[Index].RoleText + "</strong>")));
                //                    //                    }
                //                    //                    $("#" + 'divKRA' + KraId + 'Kra' + KraId + 'Function' + FunctionId + 'Role' + RoleId).append($('<div></div>').attr("id", "divKpi_" + KpiId + "Kra_" + KraId + "Function_" + FunctionId).append($('<input>').attr({
                //                    //                        type: 'checkbox', name: 'chkKPI', value: CommonKraKpi[Index].KPITitle, id: 'chkKpi' + '_KpiFuntionID' + KpiFunctionID + '_RoleID' + RoleId
                //                    //                    })).append($('<span></span>').addClass("spanKpiTitle").attr("id", "KpiTitle_" + KpiId).html(CommonKraKpi[Index].KPITitle))).append($('<br/>'));



            }
            else {
                $("#tabCommonKRA").html("No Common KRA Found");
            }
            $("#divTabs").tabs();
            $("input:checkbox").attr('disabled', 'disabled'); //disable
            if ($("#divTabs").children().length == 0) {

                ShowNoRecordFoundMessage();

            }
            $("div[id^='tab_']").each(function () {

                if ($(this).children().length == 0) {
                    $(this).html("No Records Found");
                }
            });
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}
//function CommonKRA() {
//   
//};

$(document).on('click', ".spanKpiTitle", function (e) {
    e.preventDefault();
    $("#GuidelineWindowHeading").remove();
    $("#divGuidelineWindow").remove();
    //    $("#MainDiv").append($('<div></div>').attr("id", "GuidelineWindowHeading").append($('<p></p>').css({ 'font-size': "'16px'" }).append($('<span></span>').css({ 'font-family': "'Comic Sans MS Regular', 'Comic Sans MS'" },
    //        { 'font-size': "'16px'" }).html("<strong>Guideline Window</strong>")).append($('<p></p>').css({ 'font-size': "'13px'" }).append($('<span></span>').css({ 'font-family': "'font-family:'Comic Sans MS Regular', 'Comic Sans MS'" },
    //        { 'font-size': "'13px'" }).text(" (click on KPI to view its guidelines)")))));

    //    var Id = $(this).attr('id');
    //    var KpiTitle = $(this).text();
    //    //alert(KpiTitle);
    //    var SplitedId = Id.split('_');
    //    var KpiId = SplitedId[1];
    //    var DivRoleID = $(this).parent().parent().attr('id');

    //    var SplitRoleId = DivRoleID.split('Role');
    //    var RoleID = SplitRoleId[1];
    //  
    var txt = $(this).html();
    //    var DivFuncId = $(this).parent().parent().parent().attr("id");
    //    var splitedFuncId = DivFuncId.split('Function');
    //    var FuncId = splitedFuncId[1];
    var FunctionId = $(this).prev().attr('id').match(/\d+/);

    $.ajax({
        type: "POST",
        url: 'KRAApproval.aspx/GetGuidelineDetails',
        data: '{"FunctionID":' + FunctionId + '}',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {

            var GuidelineDetalis = jQuery.parseJSON(result.d);


            var KpiGuidelineId = GuidelineDetalis[0].KPIGuidelineID;
            $('<div id="divGuidelineWindow">').css({ 'font-weight': '800', 'position': 'fixed', 'bottom': '0', 'right': '0', 'margin-bottom': '10px', 'height': '500px', 'width': '250px' }).appendTo('body');
            $('#divGuidelineWindow').append("Guideline window</br>(click on KPI to view its guidelines)");
            $('#divGuidelineWindow').append('<div id="divGuidelineWindow2">');
            $('#divGuidelineWindow2').css({ 'padding-left': '10px', 'font-weight': '800', 'position': 'fixed', 'bottom': '0', 'right': '0', 'margin-bottom': '10px', 'height': '470px', 'width': '250px', 'background': '#fff', 'border': '2px solid #898989' });
            $('#divGuidelineWindow2').append("<input type='image' id='imgclose' src='../Images/icon-error-close.png' name='image' width='15' height='15' style='position:absolute;right:5px;margin-top:5px;'>");

            $('#divGuidelineWindow2').append("<span style='font-size:20px;'>" + GuidelineDetalis[0].Display + "</span>");
            $('#divGuidelineWindow2').append("</br></br>");
            $('#divGuidelineWindow2').append('<span  style="font-size:15px;">KPI - ' + txt + '</span>');
            $('#divGuidelineWindow2').append("</br></br>");
            $('#divGuidelineWindow2').append(GuidelineDetalis[0].GuidelineDescription);
            var effect = 'slide';
            var options = { direction: 'right' };
            var duration = 500;
            $('#divGuidelineWindow').hide();
            $('#divGuidelineWindow2').hide();
            $('#divGuidelineWindow').toggle(effect, options, duration);
            $('#divGuidelineWindow2').toggle(effect, options, duration);
            $('#imgclose').on('click', function () {
                $('#divGuidelineWindow').hide();
                $('#divGuidelineWindow2').hide();
            });
            //alert(KpiGuidelineId);
            //            $("#MainDiv").append($('<div></div>').attr("id", "divGuidelineWindow"));


            //            $("#divGuidelineWindow").append($('<div></div>').attr('id', 'DivKpiRole' + KpiGuidelineId).append($('<span></span>').html("<strong>" + GuidelineDetalis[0].Display + "</strong>").append($('<br/>')).append($('<span></span>').html("<strong>" + KpiTitle + "</strong>"))));
            //            $("#DivKpiRole" + KpiGuidelineId).append($('<br/><br/>')).append($('<div></div>').append($('<span></span>').text(GuidelineDetalis[0].GuidelineDescription)));
            //            for (var index = 0; index < GuidelineDetalis.length; index++) {
            //                var GuidelineLevel = GuidelineDetalis[index].Display;
            //            }

        },
        error: function (result) {
        }
    });

});
$(document).on('click', '#btnAccept', function () {
    var FailMessage = "Found Error While Saving Records";

    var KPIName = $("#txtAdditionalKRA").val();
    var str = "";
    var KpiId = [];

    //    for (var FuncIndex = 0; FuncIndex < FuncDetails.length; FuncIndex++) {
    //        var FuncId = FuncDetails[FuncIndex].FunctionID;
    //        for (var kpiIndex = 0; kpiIndex < KraKpiDetails.length; kpiIndex++) {
    //            var KpiId = KraKpiDetails[kpiIndex].KPIID;
    //            var KpiFunctionID = KraKpiDetails[kpiIndex].KPIFunctionID;
    //            var chkKpiId = 'chkKpi' + '_KpiFuntionID' + KraKpiDetails[kpiIndex].KPIFunctionID + '_RoleID' + KraKpiDetails[kpiIndex].RoleID
    //            if ($("#" + chkKpiId).is(":checked")) {
    //                //str = str + '{"KpiFunctionID":' + KpiFunctionID + '}'
    //                str = str + "," + KpiFunctionID;
    //                //KpiId.push(KpiFunctionID);
    //            }

    //        }
    //    }



    $.ajax({
        type: "POST",
        url: 'KRAApproval.aspx/InsertDetails',
        data: '{}',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            var TeamMemberId = result.d;
            if (TeamMemberId == '0') {

                ClearValidationMain();
                ClearMessageMain();
                ShowMessageMain(false, FailMessage)


            }
            else {
                $("#btnAccept").attr('disabled', true);
                ShowDilog();
                //  window.location = "../KRA/Meetingnotes.aspx?TeamMemberId=" + TeamMemberId;
            }


        },
        error: function (result) {

            ClearValidation();
            ClearMessage();
            ShowMessage(false, FailMessage)


        }
    });


});
$(document).on('click', '#btnCancel', function () {
    window.location = "/Dashboard/Index";
})
function chkProjStatus() {


    $.ajax({
        type: "POST",
        url: 'KRAApproval.aspx/IsKPIApproved',
        data: '{}',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {

            var chkstatus = result.d;

            if (chkstatus == "true") {

                $("#btnAccept").attr('disabled', true);

                $("#u1 strong").html("Projects - KRA Approved");
            }
            else {


                $("#btnAccept").attr('disabled', false)
            }
        },
        error: function (result) {
        }
    });
}

function ShowDilog() {

    var SucessMessage = 'Approved Sucessfully ,Add meeting notes here';

    $("#EditKRADialog").css("display", "block");

    $("#EditKRADialog").dialog({

        width: 520,
        height: 420,
        title: "Meeting Summary Notes",
        modal: true
    });


    ClearValidation();
    ClearMessage();
    ShowMessage(true, SucessMessage)


}

function ClearValidationMain() {
    $("#ulVsMain").empty();

}

function ClearMessageMain() {
    $("#lblMessageMain").empty();
    $("#lblMessageMain").removeClass('alert alert-warning');
    $("#lblMessageMain").removeClass('alert alert-success');
}

function ShowMessageMain(Issucess, Message) {
    if (Issucess) {

        $("#lblMessageMain").removeClass('alert alert-warning');
        $("#lblMessageMain").addClass('alert alert-success');
        $("#lblMessageMain").text(Message);

    }
    else {
        $("#lblMessageMain").addClass('alert alert-warning');
        $("#lblMessageMain").removeClass('alert alert-success');
        $("#lblMessageMain").text(Message);
    }


}


function SetValidationMessage(ValidationMessage) {

    $("#ulVs").append("<li>" + ValidationMessage + "</li>");
    SetScrollPostionToDisplayMessage();
    return false;



}
function ShowNoRecordFoundMessage() {

}

function SetScrollPostionToDisplayMessage() {


    var OffSet = 236 // Window scroll position to display validation Summary
    if (OffSet < $(window).scrollTop()) {

        $(window).scrollTop(OffSet);
    }

}

function ShowNoRecordFoundMessage() {
    var NoRecordFound = "No Record Found";
    ClearValidationMain();
    ClearMessageMain();
    ShowMessageMain(false, NoRecordFound);
}
