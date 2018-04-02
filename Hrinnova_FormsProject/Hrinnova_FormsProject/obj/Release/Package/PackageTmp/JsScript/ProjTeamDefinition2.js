
var EnumRoleText;
$(document).ready(function () {
    //    $("#btnBack").click(function () {
    //        parent.history.back();
    //        return false;
    //    });
    $.ajax({
        type: "POST",
        url: 'ProjectTeamDefinition_2.aspx/ProjName',
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            $("#divSelectedProjName").text(result.d).css('padding-left','5px');
        }
    });
    BindProjTeamDefinition1_Data(); 


    var EmpDetails;
    var FuncDetails;
    var ChildFunctDetail;
    var KraKpiDetails;
    EnumRoleText = { Core: 'Core', Lead: 'Lead', Manage: 'Manage' };
    EnumRoleValue = { Core: '1', Lead: '2', Manage: '3' };

});

function BindProjTeamDefinition1_Data() {
    $.ajax({
        type: "POST",
        url: 'ProjectTeamDefinition_2.aspx/GetTeamDefinition1_Data',
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {

            var jsonResult = jQuery.parseJSON(result.d);
            if (jQuery.isEmptyObject(jsonResult)) {
                ShowMessage(false, "No Records Found");
            }
            else {
                ClearMessage();
                EmpDetails = jsonResult.dtEmpDetails;
                FuncDetails = jsonResult.dtAllFuncDetails;
                ChildFunctDetail = jsonResult.dtFunction;

                $("#divMain").append($('<div></div>').attr("id", "divStep1EmployeeDetail"));
                $("#divStep1EmployeeDetail").append($("<table class='grid2'></table>").attr("id", "tblEmpDetails"));
                $("#tblEmpDetails").append($("<thead></thead>").attr("id", "theadEmpDetails"));
                $("#tblEmpDetails").append($("<tbody></tbody>").attr("id", "tbodyEmpDetails"));
                $("#theadEmpDetails").append($("<tr><th>Name</th><th>Start Date</th><th>End Date</th><th>Core</th><th>Lead</th><th>Manage</th></tr>").attr("id", "trHeading").css("border-bottom", "1px solid #d4dde4;"));

                //                $("#trHeading").append($('<td></td>'));
                //                $("#trHeading").append($('<td></td>').css('width', '5%').append($("<div></div>").attr("id", "DivStartDate").addClass("text").append($("<p></p>").append($("<span></span>").css({}).text("Start Date")))));
                //                $("#trHeading").append($('<td></td>').css('width', '5%').append($("<div></div>").attr("id", "DivEndDate").addClass("text").append($("<p></p>").append($("<span></span>").css({}).text("End Date")))));
                //                $("#trHeading").append($('<td></td>').css('width', '5%').append($("<div></div>").attr("id", "DivCore").addClass("text").append($("<p></p>").append($("<span></span>").css({}).text("CORE")))));
                //                $("#trHeading").append($('<td></td>').css('width', '5%').append($("<div></div>").attr("id", "DivLead").addClass("text").append($("<p></p>").append($("<span></span>").css({}).text("LEAD")))));
                //                $("#trHeading").append($('<td></td>').css('width', '5%').append($("<div></div>").attr("id", "DivManage").addClass("text").append($("<p></p>").append($("<span></span>").css({}).text("MANAGE")))));



                for (var index = 0; index < EmpDetails.length; index++) {
                    var TeammembersID = EmpDetails[index].TeammembersID;
                    var Start = (EmpDetails[index].StartDate == "") ? "NA" : EmpDetails[index].StartDate;
                    var End = (EmpDetails[index].EndDate == "") ? "NA" : EmpDetails[index].EndDate;
                    var ImgId = "img" + TeammembersID;
                    var StartDateId = "txtStartDate" + TeammembersID;
                    var EndDateId = "txtEndDate" + TeammembersID;
                    var GuidelinelevelId = EmpDetails[index].KRAGuidelineLevelID;

                    $("#divStep1EmployeeDetail").append($("<div></div>").attr("id", "divEmpList" + TeammembersID).addClass("ax_paragraph"));
                    $("#tbodyEmpDetails").append($("<tr></tr>").attr("id", "trDetails" + TeammembersID));
                    $("#trDetails" + TeammembersID).append($('<td></td>').html(EmpDetails[index].EmployeeName));
                    $("#trDetails" + TeammembersID).append($('<td></td>').attr("id", "tdStartDate" + TeammembersID));
                    $("#tdStartDate" + TeammembersID).append($("<span id='" + StartDateId + "' style='width:100px;'>" + Start + "</span>"));
                    $("#trDetails" + TeammembersID).append($('<td></td>').attr("id", "tdEndtDate" + TeammembersID));
                    $("#tdEndtDate" + TeammembersID).append($("<span id='" + EndDateId + "' style='width:100px;' >" + End + "</span>"));
                    $("#trDetails" + TeammembersID).append($('<td></td>').append($("<input type='checkbox' id='chkCore" + TeammembersID + "'  ></input>")));
                    $("#trDetails" + TeammembersID).append($('<td></td>').append($("<input type='checkbox' id='chkLead" + TeammembersID + "' ></input> ")));
                    $("#trDetails" + TeammembersID).append($('<td></td>').append($("<input type='checkbox' id='chkManage" + TeammembersID + "'></input>  ")));

                }
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

                $("#divMain").append($("<div></div>").attr('id', 'divFunctions'));
                $("#divFunctions").text(FunctionString);
                $("#divFunctions").before("<div class='BlueHeader'>Functions</div>");
                KRASetup(jsonResult); 

                BindBackData();
            }

        },
        error: function (result) {
        }
    });
}

function KRASetup(jsonResult) {

    var FuncDetails = jsonResult.dtFunction;


    $("#divMain").append($("<div></div>").attr("id", "divKRASetup"));
    $("#divKRASetup").before("<div class='BlueHeader'>KRA Setup</div>");
    $.ajax({
        type: "POST",
        url: 'ProjectTeamDefinition_2.aspx/GetKRAKPIDetails',
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            KraKpiDetails = jQuery.parseJSON(result.d);

            $("#divKRASetup").append($("<div ></div>").attr("id", "divTabs"));
            $("#divTabs").append($('<ul></ul>').attr("id", "ulTab"));


            // '#tblspecializations tr > td:contains(Some Value) + td:contains(2)').length


            for (var FunctionIndex = 0; FunctionIndex < FuncDetails.length; FunctionIndex++) {

                var FunctionId;

                if (FuncDetails[FunctionIndex].FunctionID == 0)
                    FunctionId = FuncDetails[FunctionIndex].ParentFunID;
                else
                    FunctionId = FuncDetails[FunctionIndex].FunctionID


                var flag = 0;

                //$("#divKRASetup").append($("<div></div>").attr("id", "divFunction" + FunctionId));

                /*if (FuncDetails[FunctionIndex].FunctionID == 0) {
                $("#ulTab").append($('<li></li>').append($('<a></a>').attr("href", "#tab_" + FunctionId).append($("<p></p>").append($("<span></span>").html("<strong>" + FuncDetails[FunctionIndex].ParentFunctionTitle + "</strong>")))));

                }
                else {
                $("#ulTab").append($('<li></li>').append($('<a></a>').attr("href", "#tab_" + FunctionId).append($("<p></p>").append($("<span></span>").html("<strong>" + FuncDetails[FunctionIndex].FunctionTitle + "</strong>")))));

                }

                $("#divTabs").append($('<div></div>').attr("id", "tab_" + FunctionId));*/



                //$("#divFunction" + FunctionId).append($("<p></p>").append($("<span></span>").html("<strong>" + FuncDetails[FunctionIndex].FunctionTitle + "</strong>")));

                //.append($("<p></p>").append($("<span></span>").html("<strong>" + FuncDetails[FunctionIndex].FunctionTitle + "</strong>")));

                for (var KraIndex = 0; KraIndex < KraKpiDetails.length; KraIndex++) {

                    var KraId = KraKpiDetails[KraIndex].KRAID;
                    var KpiId = KraKpiDetails[KraIndex].KPIID;
                    var RoleId = KraKpiDetails[KraIndex].RoleID;

                    var RoleText = KraKpiDetails[KraIndex].RoleText;

                    var KpiFunctionID = KraKpiDetails[KraIndex].KpiFunctionID;



                    SelectAppliedRole(KraKpiDetails[KraIndex].IsApplicable, RoleText);

                    if (FunctionId == KraKpiDetails[KraIndex].FunctionID) {
                        if (!($("#divTabs").find("#tab_" + FunctionId).length > 0)) {
                            if (FuncDetails[FunctionIndex].FunctionID == 0) {

                                $("#ulTab").append($('<li></li>').append($('<a></a>').attr("href", "#tab_" + FunctionId).append($("<p></p>").append($("<span></span>").html("<strong>" + FuncDetails[FunctionIndex].ParentFunctionTitle + "</strong>")))));

                            }
                            else {

                                $("#ulTab").append($('<li></li>').append($('<a></a>').attr("href", "#tab_" + FunctionId).append($("<p></p>").append($("<span></span>").html("<strong>" + FuncDetails[FunctionIndex].FunctionTitle + "</strong>")))));

                            }

                            $("#divTabs").append($('<div></div>').attr("id", "tab_" + FunctionId));
                        }

                        if (KraIndex == 0) {
                            //$("#divFunction" + FunctionId).append($("<div></div>").attr("id", "divKRA" + KraId + "_Function" + FunctionId));
                            $("#tab_" + FunctionId).append($("<div class='accordion-main-box' ></div>").attr("id", "divKRA" + KraId + "_Function" + FunctionId));

                            $("#tab_" + FunctionId).append('<br/><br/>');
                            $("#divKRA" + KraId + "_Function" + FunctionId).append($("<div class='sec-heading'></div>").attr("id", "divKRATitle" + KraId).text(KraKpiDetails[KraIndex].KRATitle).css("background-color", "#" + KraKpiDetails[KraIndex].KRABGColor));

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
                                    type: 'checkbox', name: 'chkKPI', disabled: KraKpiDetails[KraIndex].IsMandatory == true ? true : false, checked: KraKpiDetails[KraIndex].IsMandatory == true || KraKpiDetails[KraIndex].IsApplicable ? true : false, value: KraKpiDetails[KraIndex].KPITitle, id: 'chkKpi' + '_KpiFuntionID' + KpiFunctionID + '_RoleText_' + RoleText

                                })).append($('<span></span>').addClass("spanKpiTitle").attr("id", "KpiTitle_" + KpiId).html(KraKpiDetails[KraIndex].KPITitle)));


                            }

                            else if (RoleText == EnumRoleText.Lead) {

                                $("#divKRA" + KraId + 'Kra' + KraId + 'Function' + FunctionId + 'Role' + EnumRoleText.Lead).append($("<div style='line-height:20px;'></div>").attr("id", "divKPI" + KpiId).append($('<input>').attr({
                                    type: 'checkbox', name: 'chkKPI', disabled: KraKpiDetails[KraIndex].IsMandatory == true ? true : false, checked: KraKpiDetails[KraIndex].IsMandatory == true || KraKpiDetails[KraIndex].IsApplicable ? true : false, value: KraKpiDetails[KraIndex].KPITitle, id: 'chkKpi' + '_KpiFuntionID' + KpiFunctionID + '_RoleText_' + RoleText

                                })).append($('<span></span>').addClass("spanKpiTitle").attr("id", "KpiTitle_" + KpiId).html(KraKpiDetails[KraIndex].KPITitle)));


                            }
                            else if (RoleText == EnumRoleText.Manage) {

                                $("#divKRA" + KraId + 'Kra' + KraId + 'Function' + FunctionId + 'Role' + EnumRoleText.Manage).append($("<div style='line-height:20px;'></div>").attr("id", "divKPI" + KpiId).append($('<input>').attr({
                                    type: 'checkbox', name: 'chkKPI', disabled: KraKpiDetails[KraIndex].IsMandatory == true ? true : false, checked: KraKpiDetails[KraIndex].IsMandatory == true || KraKpiDetails[KraIndex].IsApplicable ? true : false, value: KraKpiDetails[KraIndex].KPITitle, id: 'chkKpi' + '_KpiFuntionID' + KpiFunctionID + '_RoleText_' + RoleText

                                })).append($('<span></span>').addClass("spanKpiTitle").attr("id", "KpiTitle_" + KpiId).html(KraKpiDetails[KraIndex].KPITitle)));


                            }


                        }
                        else {


                            if ($("#tab_" + FunctionId).find("#divKRA" + KraId + "_Function" + FunctionId).length == 0) {



                                $("#tab_" + FunctionId).append($("<div  class='accordion-main-box'></div>").attr("id", "divKRA" + KraId + "_Function" + FunctionId));

                                $("#tab_" + FunctionId).append('<br/><br/>');
                                $("#divKRA" + KraId + "_Function" + FunctionId).append($("<div class='sec-heading'></div>").attr("id", "divKRATitle" + KraId).text(KraKpiDetails[KraIndex].KRATitle).css("background-color", "#" + KraKpiDetails[KraIndex].KRABGColor));

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
                                    type: 'checkbox', name: 'chkKPI', disabled: KraKpiDetails[KraIndex].IsMandatory == true ? true : false, checked: KraKpiDetails[KraIndex].IsMandatory == true || KraKpiDetails[KraIndex].IsApplicable ? true : false, value: KraKpiDetails[KraIndex].KPITitle, id: 'chkKpi' + '_KpiFuntionID' + KpiFunctionID + '_RoleText_' + RoleText

                                })).append($('<span></span>').addClass("spanKpiTitle").attr("id", "KpiTitle_" + KpiId).html(KraKpiDetails[KraIndex].KPITitle)));


                            }

                            else if (RoleText == EnumRoleText.Lead) {

                                $("#divKRA" + KraId + 'Kra' + KraId + 'Function' + FunctionId + 'Role' + EnumRoleText.Lead).append($("<div style='line-height:20px;'></div>").attr("id", "divKPI" + KpiId).append($('<input>').attr({
                                    type: 'checkbox', name: 'chkKPI', disabled: KraKpiDetails[KraIndex].IsMandatory == true ? true : false, checked: KraKpiDetails[KraIndex].IsMandatory == true || KraKpiDetails[KraIndex].IsApplicable ? true : false, value: KraKpiDetails[KraIndex].KPITitle, id: 'chkKpi' + '_KpiFuntionID' + KpiFunctionID + '_RoleText_' + RoleText

                                })).append($('<span></span>').addClass("spanKpiTitle").attr("id", "KpiTitle_" + KpiId).html(KraKpiDetails[KraIndex].KPITitle)));


                            }
                            else if (RoleText == EnumRoleText.Manage) {

                                $("#divKRA" + KraId + 'Kra' + KraId + 'Function' + FunctionId + 'Role' + EnumRoleText.Manage).append($("<div style='line-height:20px;'></div>").attr("id", "divKPI" + KpiId).append($('<input>').attr({
                                    type: 'checkbox', name: 'chkKPI', disabled: KraKpiDetails[KraIndex].IsMandatory == true ? true : false, checked: KraKpiDetails[KraIndex].IsMandatory == true || KraKpiDetails[KraIndex].IsApplicable ? true : false, value: KraKpiDetails[KraIndex].KPITitle, id: 'chkKpi' + '_KpiFuntionID' + KpiFunctionID + '_RoleText_' + RoleText

                                })).append($('<span></span>').addClass("spanKpiTitle").attr("id", "KpiTitle_" + KpiId).html(KraKpiDetails[KraIndex].KPITitle)));


                            }


                        }
                    }
                }


                /*for (var KraIndex = 0; KraIndex < KraKpiDetails.length; KraIndex++) {
                var KraId = KraKpiDetails[KraIndex].KRAID;
                var KpiId = KraKpiDetails[KraIndex].KPIID;
                var FunctionId = KraKpiDetails[KraIndex].FunctionID;
                var flag = 0;
                if (KraIndex == 0) {
                $("#divKRASetup").append($("<div></div>").attr("id", "divFuncTitle" + FunctionId));
                $("#divFuncTitle" + FunctionId).append($("<p></p>").append($("<span></span>").html("<strong>" + FuncDetails[index].FunctionTitle + "</strong>")));





                $("#divKRASetup").append($("<div></div>").attr("id", "divKRA" + KraId));
                $("#divKRA" + KraId).append($("<div></div>").attr("id", "divKRATitle" + KraId).text(KraKpiDetails[KraIndex].KRATitle).css("background-color", "#" + KraKpiDetails[KraIndex].KRABGColor));
                $("#divKRA" + KraId).append($("<div></div>").attr("id", "divKPI" + KpiId).append($('<input>').attr({
                type: 'checkbox', name: 'chkKPI', value: KraKpiDetails[KraIndex].KPITitle, id: 'chkKpi' + KpiId
                }))).append($('<p></p>').append($('<span></span>').addClass("spanKpiTitle").attr("id", "KpiTitle_" + KpiId).html(KraKpiDetails[KraIndex].KPITitle)));
                }
                else {
                if ($("#divKRASetup").find("#divFunctionTitle" + FunctionId).length == 0) {

                }

                if ($("#divKRASetup").find("#divKRA" + KraId).length == 0) {
                $("#divKRASetup").append($("<div></div>").attr("id", "divKRA" + KraId));
                $("#divKRA" + KraId).append($("<div></div>").attr("id", "divKRATitle" + KraId).text(KraKpiDetails[KraIndex].KRATitle).css("background-color", "#" + KraKpiDetails[KraIndex].KRABGColor));
                $("#divKRA" + KraId).append($("<div></div>").attr("id", "divKPI" + KpiId).append($('<input>').attr({
                type: 'checkbox', name: 'chkKPI', value: KraKpiDetails[KraIndex].KPITitle, id: 'chkKpi' + KpiId
                }))).append($('<p></p>').append($('<span></span>').addClass("spanKpiTitle").attr("id", "KpiTitle_" + KpiId).html(KraKpiDetails[KraIndex].KPITitle)));
                }
                else {
                $("#divKRA" + KraId).append($("<div></div>").attr("id", "divKPI" + KpiId).append($('<input>').attr({
                type: 'checkbox', name: 'chkKPI', value: KraKpiDetails[KraIndex].KPITitle, id: 'chkKpi' + KpiId
                }))).append($('<p></p>').append($('<span></span>').addClass("spanKpiTitle").attr("id", "KpiTitle_" + KpiId).html(KraKpiDetails[KraIndex].KPITitle)));
                }
                }
                }*/

            }
            if ($("#ulTab").find('li').length > 0) $("#divTabs").tabs();
            else $("#divTabs").append("<div>No KPIs defined</div>")
        },
        error: function (result) {
        }
    });

}
$(document).on('click', ".spanKpiTitle", function (e) {

    e.preventDefault();
    $("#GuidelineWindowHeading").remove();
    $("#divGuidelineWindow").remove();
    var Id = $(this).attr('id');

    var SplitedId = Id.split('_');
    var KpiId = SplitedId[1];
    var DivFuncId = $(this).parent().parent().parent().attr("id");
    var txt = $(this).html();
    var splitedFuncId = DivFuncId.split('_');
    var FuncId = splitedFuncId[1];
    //alert(FuncId);
    var FunctionId = $(this).prev().attr('id').match(/\d+/);

    $.ajax({
        type: "POST",
        url: 'ProjectTeamDefinition_2.aspx/GetGuidelineDetails',
        data: '{"FunctionID":' + FunctionId + '}',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            var GuidelineDetalis = jQuery.parseJSON(result.d);
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
        },
        error: function (result) {
        }
    });

});
$(document).on('click', '#btnNext', function (event) {
    //  ;
    event.preventDefault();
    ClearValidation();
    ClearMessage();
      
    if (ValidateRecord() == false) {
        return;
    }


    var EmployeeDetails = EmpDetails;
    var EmpDetailString = "";
    var str = "";
    //;

    // for (var FuncIndex = 0; FuncIndex < FuncDetails.length; FuncIndex++) {

    //  var FuncId = FuncDetails[FuncIndex].FunctionID;



    for (var KpiIndex = 0; KpiIndex < KraKpiDetails.length; KpiIndex++) {

        var KpiId = KraKpiDetails[KpiIndex].KPIID;


        var chkKpiId = 'chkKpi' + '_KpiFuntionID' + KraKpiDetails[KpiIndex].KpiFunctionID + '_RoleText_' + KraKpiDetails[KpiIndex].RoleText
        if ($("#" + chkKpiId).is(':checked')) {
            var disabled = false;
            if ($("#" + chkKpiId).is(':disabled')) {
                disabled = true;
            }

            str = str + '{"KpiFunctionID":"' + KraKpiDetails[KpiIndex].KpiFunctionID + '","KPIId":"' + KraKpiDetails[KpiIndex].KPIID + '","FunctionID":"' + KraKpiDetails[KpiIndex].FunctionID + '","RoleID":"' + KraKpiDetails[KpiIndex].RoleID + '","IsMandatory":"' + disabled + '","RoleValue":"' + KraKpiDetails[KpiIndex].RoleValue + '"' + '}' + ",";


            //str = str + KraKpiDetails[KpiIndex].KpiFunctionID + ",";
        }

        // }
    }
    str = str.replace(/^,|,$/g, '');
    var ListKPIDetails = "[" + str + "]";

    //alert(ListKpiFunctionID);
    //    if (Validate_Dates(EmployeeDetails) == true) {
    //        ShowMessage(false, "FromDate should be less than or equal to ToDate.");
    //        return false;
    //    }
    //    else {
    ClearMessage();
    for (var Index = 0; Index < EmployeeDetails.length; Index++) {

        var TeamMemberID = EmployeeDetails[Index].TeammembersID;
        var EmpStartDateId = "txtStartDate" + TeamMemberID;
        var EmpEndDateId = "txtEndDate" + TeamMemberID;

        //            var from = $("#txtStartDate" + TeamMemberID).datepicker("getDate");
        //            var to = $("#txtEndDate" + TeamMemberID).datepicker("getDate");
        //            if (from > to) {

        //            }
        var GuidelineLevelName = "";
        //var tempDate = $()

        var StartDate = $("#" + EmpStartDateId).html();

        var EndDate = $("#" + EmpEndDateId).html();
        var chkCoreLevelId = "chkCore" + TeamMemberID;
        var chkLeadLevelId = "chkLead" + TeamMemberID;
        var chkManageLevelId = "chkManage" + TeamMemberID;
        var IsCoreApplicable = false;
        var IsLeadApplicable = false;
        var IsManageApplicable = false;

        if ($("#" + chkCoreLevelId).is(':checked')) {
            IsCoreApplicable = true;
        }
        if ($("#" + chkLeadLevelId).is(':checked')) {
            IsLeadApplicable = true;

        }
        if ($("#" + chkManageLevelId).is(':checked')) {
            IsManageApplicable = true;

        }

        EmpDetailString = EmpDetailString + '{"TeamMemberID":"' + TeamMemberID + '","StartDate":"' + StartDate + '","EndDate":"' + EndDate + '","IsCoreApplicable":"' + IsCoreApplicable + '","IsLeadApplicable":"' + IsLeadApplicable + '","IsManageApplicable":"' + IsManageApplicable + '","ListKPIDetails":' + ListKPIDetails + '},';

    }


    EmpDetailString = EmpDetailString.replace(/^,|,$/g, '');
    EmpDetailString = '[' + EmpDetailString + ']';

    // alert(EmpDetailString);
    $.ajax({
        type: "POST",
        url: 'ProjectTeamDefinition_2.aspx/InsertDetails',
        data: '{"TeamDefStep2Details":' + EmpDetailString + '}',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            if (result.d == true) {
                window.location = "../KRA/projectteamdefinition_3.aspx";
            }
        },
        error: function (response) {
            alert(response.responseText);
        }
    });

});

$(document).on('click', '#btnBack', function (event) {
    $.ajax({
        type: "POST",
        url: 'ProjectTeamDefinition_2.aspx/StoreBackDetails',
        data: '{}',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {

            var jsonresult = result.d;
            var IsBack = jsonresult[1];
            var IsEdit = jsonresult[0];
            window.location = "../KRA/TeamSelection.aspx?IsBack=" + IsBack + "&&IsEdit=" + IsEdit;

        },
        error: function (response) {
            alert(response.responseText);
        }
    });
});

function BindBackData() {
    $.ajax({
        type: "POST",
        url: 'ProjectTeamDefinition_2.aspx/GetBackData',
        data: '{}',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            var jsonResult = "";
            if (result.d != "") {

                jsonResult = jQuery.parseJSON(result.d);
            }
            

            for (var i = 0; i < jsonResult.length; i++) {
                  
                var TeamMemberId = jsonResult[i].TeamMemberID;
                var txtStartDateId = "txtStartDate" + TeamMemberId;
                var txtEndDateId = "txtEndDate" + TeamMemberId;
                var chkCoreId = "chkCore" + TeamMemberId;
                var chkLeadId = "chkLead" + TeamMemberId;
                var chkManageId = "chkManage" + TeamMemberId;

                var StartDate = jsonResult[i].StartDate;
                var EndDate = jsonResult[i].EndDate;

                $("#" + txtStartDateId).val(StartDate);
                $("#" + txtEndDateId).val(EndDate);


                if (jsonResult[i].IsCoreApplicable == true)
                    $("#" + chkCoreId).prop("checked", true);
                else
                    $("#" + chkCoreId).prop("checked", false);

                if (jsonResult[i].IsLeadApplicable == true)
                    $("#" + chkLeadId).prop("checked", true);
                else
                    $("#" + chkLeadId).prop("checked", false);

                if (jsonResult[i].IsManageApplicable == true)
                    $("#" + chkManageId).prop("checked", true);
                else
                    $("#" + chkManageId).prop("checked", false);
                $("#divKRASetup").find("input[type=checkbox]").prop("checked", false);

                for (var KPIIndex = 0; KPIIndex < jsonResult[i].ListKPIDetails.length; KPIIndex++) {

                    var chkKpiId = "";
                    var KPIDetails = jsonResult[i].ListKPIDetails[KPIIndex];
                    var RoleName = "";
                    if (KPIDetails.RoleValue == EnumRoleValue.Core) {
                        RoleName = "Core";
                    }
                    if (KPIDetails.RoleValue == EnumRoleValue.Lead) {
                        RoleName = "Lead";
                    }
                    if (KPIDetails.RoleValue == EnumRoleValue.Manage) {
                        RoleName = "Manage";
                    }
                    chkKpiId = "chkKpi_KpiFuntionID" + KPIDetails.KpiFunctionID + "_RoleText_" + RoleName;

                    $("#" + chkKpiId).prop('checked', true);

                    if (KPIDetails.IsMandatory == true) {
                        $("#" + chkKpiId).prop('disabled', true);
                    }
                }

            }
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}

function ValidateRecord() {

    // return (StartDateRequired() && RoleSelectionRequired() && KPiSelectionRequired())

    var IsStartDateSelected = StartDateRequired();
    var IsRoleSelected = RoleSelectionRequired();
    var IsKpiSelected = KPiSelectionRequired();
    var IsRoleAccKPISelected = RoleSelectionAccordingKPIRequired();
    var IsDateIsValid = DateValidation();

    return (IsStartDateSelected && IsRoleSelected && IsKpiSelected && IsRoleAccKPISelected && IsDateIsValid);

}
function Validate_Dates(EmployeeDetails) {
    var date_Compare = false;
    for (var Index = 0; Index < EmployeeDetails.length; Index++) {
        var TeamMemberID = EmployeeDetails[Index].TeammembersID;
        if ($("#txtEndDate" + TeamMemberID).val() != "") {
            var from = $("#txtStartDate" + TeamMemberID).datepicker("getDate");
            var to = $("#txtEndDate" + TeamMemberID).datepicker("getDate");
            if (from > to) {
                date_Compare = true;
            }
        }

    }
    return date_Compare;
}
function RoleSelectionRequired() {
      
    var RequiredMessage = 'Please Select atleast one Role (Core, Lead, Manage) for each Employee';
    var IsValid = true;
    $("#tblEmpDetails > tbody > tr").each(function () {
          
        var chkbx = $(this).find($('td input[type=checkbox]:checked'))
        if (!(chkbx.length > 0))
            IsValid = false;
    });
    if (IsValid == false) {
        SetValidationMessage(RequiredMessage);
        return false;
    }
    else
        return true;

    //if ($('#tblEmpDetails input[type=checkbox]:checked').length > 0) {
    //    return true;
    //}
    //else {

    //    SetValidationMessage(RequiredMessage);
    //    return false;

    //}

    //return ($('#tblEmpDetails input[type=checkbox]:checked').length > 0)

}

function KPiSelectionRequired() {
    var InvalidCount = 0;

    var ManageKpiRequiredMessage = "Please Select atleat one KPI for Manage Role";
    var LeadKpiRequiredMessage = "Please Select atleat one KPI for Lead Role";
    var CoreKpiRequiredMessage = "Please Select atleat one KPI for Core Role";






    if ($(" input:checkbox[id^=chkCore]:checked").length > 0) {
        if (!($(" input:checkbox[id$=_Core]:checked").length > 0)) {

            SetValidationMessage(CoreKpiRequiredMessage);
            InvalidCount = InvalidCount + 1;
        }

    }

    if ($(" input:checkbox[id^=chkLead]:checked").length > 0) {
        if (!($(" input:checkbox[id$=_Lead]:checked").length > 0)) {

            SetValidationMessage(LeadKpiRequiredMessage);
            InvalidCount = InvalidCount + 1;
        }

    }

    if ($(" input:checkbox[id^=chkManage]:checked").length > 0) {
        if (!($(" input:checkbox[id$=_Manage]:checked").length > 0)) {

            SetValidationMessage(ManageKpiRequiredMessage);
            InvalidCount = InvalidCount + 1;
        }

    }




    return !(InvalidCount > 0)
}

function RoleSelectionAccordingKPIRequired() {
    var InvalidCount = 0;

    var ManageKpiRequiredMessage = "Please Select Manage Role for Manage KPI";
    var LeadKpiRequiredMessage = "Please Select Lead Role for Lead KPI";
    var CoreKpiRequiredMessage = "Please Select Core Role for Core KPI";






    if ($(" input:checkbox[id$=_Core]:checked").length > 0) {
        if (!($("input:checkbox[id^=chkCore]:checked").length > 0)) {

            SetValidationMessage(CoreKpiRequiredMessage);
            InvalidCount = InvalidCount + 1;
        }

    }

    if ($(" input:checkbox[id$=_Lead]:checked ").length > 0) {
        if (!($("input:checkbox[id^=chkLead]:checked").length > 0)) {

            SetValidationMessage(LeadKpiRequiredMessage);
            InvalidCount = InvalidCount + 1;
        }

    }

    if ($(" input:checkbox[id$=_Manage]:checked").length > 0) {
        if (!($(" input:checkbox[id^=chkManage]:checked").length > 0)) {

            SetValidationMessage(ManageKpiRequiredMessage);
            InvalidCount = InvalidCount + 1;
        }

    }




    return !(InvalidCount > 0)
}

function DateValidation() {

    InvalidDateCount = 0;
    $("INPUT[id^=txtStartDate]").each(function (index, obStartDate) {


        var TeamMemberName = $($(obStartDate).parents()[1]).find('span').text();
        var StartDateValidationMessage = "Please  Select valid Start Date for  " + TeamMemberName;

        var StartDatePickerID = $(obStartDate).attr("id");
        if (!IsValidDate(StartDatePickerID)) {

            InvalidDateCount = InvalidDateCount + 1;
            SetValidationMessage(StartDateValidationMessage);
        }


    });

    $("INPUT[id^=txtEndDate]").each(function (index, obStartDate) {


        var TeamMemberName = $($(obStartDate).parents()[1]).find('span').text();
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
function StartDateRequired() {

    var RequiredCount = 0;
    $("INPUT[id^=txtStartDate]").each(function (index, obStartDate) {


        var TeamMemberName = $($(obStartDate).parents()[1]).find('span').text();
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


function SelectAppliedRole(IsApplicable, RoleText) {
      
    if (IsApplicable == true) {

        if (!($(" input:checkbox[id^=chk" + RoleText + "]:checked").length > 0)) {

            $(" input:checkbox[id^=chk" + RoleText + "]").each(function () {

                $(this).attr('checked', true)
            });

        }
    }


}
$(document).on('click', '#btnCancel', function () {
    window.location.href = "/Dashboard/Index";
})