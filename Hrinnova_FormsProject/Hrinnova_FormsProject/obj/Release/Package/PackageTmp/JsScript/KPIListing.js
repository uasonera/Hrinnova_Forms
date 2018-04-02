$(document).ready(function () {
    GetKPIKRAObjList();
    var ObjectiveId;    
    var AssignedKPIList;
    var sPageURL = window.location.search.substring(1);
    
    var msg = sPageURL.split(/=+(.+)?/)[1];
    $.ajax({
        type: "POST",
        url: 'KPIListing.aspx/GetDecryptedData',
        data: "{ 'Message' : '" + msg + "'}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {            
            if (result.d == "Success") {
                ShowMessage(true, "Record Saved Successfully");
            }
        }
    });
})
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

function GetKPIKRAObjList() {
    $.ajax({
        type: "POST",
        url: "KPIListing.aspx/GetKPIKRAObjectiveDeatils",
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (jsonresult) {
            $("#tableObjKPI").empty();
            $("#divKraKpi").empty();
            $("#divObjectiveKRAKPI").empty();
            //            $("#maindiv").append($('<table></table>').attr("id", "tblObjectiveKPI"));
            //            $("#tblObjectiveKPI").append($('<tbody></tbody>').attr("id", "bodyObj"))
            //$("#tableObjKPI").append($("<tbody><tr></tr></tbody>"));
            //$("#tableObjKPI").push($("<td></td>"))            
            var result = jQuery.parseJSON(jsonresult.d);
            var ObjectiveList = result.dtObjectiveList;

            var KraKpiList = result.dtKraKpiList;
            var ObjectiveKraList = result.dtObjectiveKraList;
            AssignedKPIList = result.dtAssignedKPIList;
            //
            var ObjectiveLength = ObjectiveList.length;
            var CountRowLength = (ObjectiveLength % 3);
            var RowLength;
            if (CountRowLength != 0) {
                var DecimalLength = ((ObjectiveLength) / 3).toString();
                var splitLength = DecimalLength.split('.');
                RowLength = parseInt(splitLength[0]) + 1;
            }
            else {
                RowLength = ((ObjectiveList.length) / 3);
            }

            for (var RowIndex = 0; RowIndex < RowLength; RowIndex++) {
                //alert(RowIndex);                

                //
                //                var trObjId = "trObj" + RowIndex;
                //                var trKPIId = "trKPI" + RowIndex;
                //                $("#bodyObj").append($("<tr><tr/>").attr("id", trObjId));
                //                $("#bodyObj").append($("<tr><tr/>").attr("id", trKPIId));
                var ObectiveLength;
                var ObjectiveIndex;

                if (RowIndex == 0) {
                    ObjectiveLength = 3;
                    ObjectiveIndex = 0;
                }
                else {
                    ObjectiveIndex = ObjectiveLength;
                    ObjectiveLength = ObjectiveIndex + 3;
                }
                var DivBlockID = "div" + ObjectiveLength;
                $("#divObjectiveKRAKPI").append($("<div></div>").attr("id", DivBlockID).addClass("function-block-new"));
                var headFlag = false;

                for (var Index = ObjectiveIndex; Index < ObjectiveLength; Index++) {


                    //
                    if (Index >= ObjectiveList.length) {
                        break;
                    }
                    var ObjID = "divObj_" + ObjectiveList[Index].ObjectiveID;
                    var DivObjTitleId = "divObjTitle" + ObjectiveList[Index].ObjectiveID;


                    $("#" + DivBlockID).append($("<div></div>").addClass("function-list-new").attr("id", ObjID));
                    $("#" + ObjID).append($("<div></div>").addClass("function-list-box").attr("id", DivObjTitleId));
                    $("#" + DivObjTitleId).append($("<div></div>").css("background-color", "#" + ObjectiveList[Index].ObjectiveBGColor).addClass("kra-list-head kri-list-head-selected").append($("<span>").text(ObjectiveList[Index].ObjectiveTitle)));


                    $("#" + DivObjTitleId).append($("<div> KRAS and KPIs of Objective </div>").addClass("kra-box-head")).append($("<br/>"));



                    for (var KraIndex = 0; KraIndex < ObjectiveKraList.length; KraIndex++) {
                        var flag = false;

                        //check if this kra is of this particular objective's or not

                        if (ObjectiveList[Index].ObjectiveID == ObjectiveKraList[KraIndex].ObjectiveID) {

                            //$("#" + ObjID).append($("<div> KRAS and KPIs of Objective </div>").addClass("kra-box-head")).append($("<br/>"));


                            KPIHeadingFlag = true;
                            var KRAListID = "divKRA_" + ObjectiveKraList[KraIndex].KRAID;
                            var tdKRAId = "tdKRA" + ObjectiveKraList[KraIndex].KRAID;
                            $("#" + DivObjTitleId).append($("<div></div>").attr("id", KRAListID).addClass("function-list-box"));
                            //$("#" + KRAListID).append($("<td></td>").attr("id", tdKRAId));
                            //$("#" + KRAListID).append($("<div></div>").addClass("function-list-box").attr("id", KRAListID));
                            $("#" + KRAListID).append($("<div></div>").addClass("function-list-head").css("background-color", "#" + ObjectiveKraList[KraIndex].KRABGColor).append($("<span>").text(ObjectiveKraList[KraIndex].KRATitle)));
                            $("#" + KRAListID).append($("<div></div>").addClass("function-list-text").append($("<span>").text(ObjectiveKraList[KraIndex].KRADescription)));

                            $("#" + KRAListID).append($("<div><strong> KPIs </strong></div>").addClass("text2")).append($("<br/>"));


                            for (var KpiIndex = 0; KpiIndex < KraKpiList.length; KpiIndex++) {
                                //
                                var KpiListID = "divKPI" + KraKpiList[KpiIndex].KPIID;
                                var KPIID = KraKpiList[KpiIndex].KPIID;

                                //$("#" + DivObjTitleId).append($("<div></div>").addClass("text2"));

                                if (ObjectiveKraList[KraIndex].KRAID == KraKpiList[KpiIndex].KRAID) {
                                    flag = true;

                                    $("#" + KRAListID).append($("<div></div>").attr("id", KpiListID).addClass("text3").html(KraKpiList[KpiIndex].KPITitle));

                                    $("#" + KRAListID).append($("<div></div>").addClass("kra-list-button").append($('<a></a>').text("Edit ").attr("id", "EditKPI_" + KPIID).attr("href", "#").attr("class", "EditKPI"))
                                      .append($('<a></a>').text("Delete ").attr("id", "DeleteKPI_" + KPIID).attr("href", "#").attr("class", "DeleteKPI"))

                                    //  .append($('<a></a>').text("Delete ").attr("id", "DeleteKPI_" + KPIID).attr("href", "#").attr("class", "DeleteKPI").prop("disabled", KraKpiList[KpiIndex].IsApplicable==true ? true:false ))

                                    .append($('<a></a>').text("View Applicability").attr("id", "Applicability_" + KPIID).attr("href", "#").attr("class", "FuncApplicable")));
                                    //$("#" + KpiListID).append($("<div></div>").addClass("kra-list-button").append($('<a></a>').text("Delete ").attr("id", "DeleteKPI_" + KPIID).attr("href", "#").attr("class", "DeleteKPI")));
                                    var DeleteDisable = 0;
                                    for (var DeleteIndex = 0; DeleteIndex < AssignedKPIList.length; DeleteIndex++) {
                                        if (AssignedKPIList[DeleteIndex].KPIID == KPIID) {
                                            DeleteDisable = 1;
                                        }
                                    }
                                    if (DeleteDisable == 1) {
                                        $('#DeleteKPI_' + KPIID).prop('disabled', true).removeAttr("href");
                                    }

                                    //$("#" + KpiListID).append($("<div></div>").addClass("kra-list-button").append($('<a></a>').text("View Applicability").attr("id", "Applicability_" + KPIID).attr("href", "#").attr("class", "FuncApplicable")));

                                }
                            }
                            $("#" + KRAListID).append($("<div></div>").addClass("clearfix"));
                            if (flag == false) {
                                $("#" + KRAListID).append($("<div><b> There is no  KPI for this KRA </b> </div>")).append($("<br/>"));
                            }
                        }
                    }
                }
                $("#divObjectiveKRAKPI").append($("<div></div>").addClass("clearfix"));
            }

            //Bind Objectives
            //            for (var ObjIndex = 0; ObjIndex < ObjectiveList.length; ObjIndex++) {
            //                var KPIHeadingFlag = false;
            //                var ObjID = "divObj_" + ObjectiveList[ObjIndex].ObjectiveID;

            //                $("#divObjectiveKRAKPI").append($("<div></div>").attr("id", ObjID));
            //                $("#" + ObjID).append($("<div></div>").css("background-color", "#" + ObjectiveList[ObjIndex].ObjectiveBGColor).append($("<span>").text(ObjectiveList[ObjIndex].ObjectiveTitle)));

            //                //Bind this objective's KRAs 
            //                for (var KraIndex = 0; KraIndex < ObjectiveKraList.length; KraIndex++) {
            //                    var flag = false;
            //                    //check if this kra is of this particular objective's or not
            //                    if (ObjectiveList[ObjIndex].ObjectiveID == ObjectiveKraList[KraIndex].ObjectiveID) {
            //                        if (KPIHeadingFlag == false) {
            //                            $("#" + ObjID).append($("<div><b> KRAS and KPIs of Objective </b></div>")).append($("<br/>"));
            //                        }

            //                        KPIHeadingFlag = true;
            //                        var KRAListID = "divKRA_" + ObjectiveKraList[KraIndex].KRAID;
            //                        $("#" + ObjID).append($("<div></div>").attr("id", KRAListID));
            //                        $("#" + KRAListID).append($("<div></div>").css("background-color", "#" + ObjectiveKraList[KraIndex].KRABGColor).append($("<span>").text(ObjectiveKraList[KraIndex].KRATitle)));
            //                        $("#" + KRAListID).append($("<div></div>").append($("<span>").text(ObjectiveKraList[KraIndex].KRADescription)));

            //                        $("#" + KRAListID).append($("<div><b> KPIs </b></div>")).append($("<br/>"));
            //                        //bind this KRA's KPI
            //                        for (var KpiIndex = 0; KpiIndex < KraKpiList.length; KpiIndex++) {
            //                            //check if this kPI is of this particular KRA's or not
            //                            if (ObjectiveKraList[KraIndex].KRAID == KraKpiList[KpiIndex].KRAID) {
            //                                flag = true;
            //                                var KpiListID = "divKPI" + KraKpiList[KpiIndex].KPIID;
            //                                var KPIID = KraKpiList[KpiIndex].KPIID;
            //                                $("#" + KRAListID).append($("<div></div>").attr("id", KpiListID).html('<b>' + KraKpiList[KpiIndex].KPITitle + '</b>').append($("<br/>")));
            //                                $("#" + KpiListID).append($('<a></a>').text("Edit ").attr("id", "EditKPI_" + KPIID).attr("href", "#").attr("class", "EditKPI"));
            //                                $("#" + KpiListID).append($('<a></a>').text("Delete ").attr("id", "DeleteKPI_" + KPIID).attr("href", "#").attr("class", "DeleteKPI"));


            //                                $("#" + KpiListID).append($('<a></a>').text("View Applicability").attr("id", "Applicability_" + KPIID).attr("href", "#").attr("class", "FuncApplicable")).append($('<br/>'));
            //                            }
            //                        }
            //                        if (flag == false) {
            //                            $("#" + KRAListID).append($("<div></div>").html("Threre are no KPIs of this Objective.").append($("<br></br>")));
            //                        }
            //
            //                  }
            //                }
            //          }
        },
        error: function (jsonresult) {
            alert(response.responseText);
        }
    });

}

$(document).on('click', "input[name='chkObj']", function (e) {
    if ($(this).is(':checked')) {
        $('input:checkbox').not(this).prop('checked', false);
        $("#divKraKpi").empty();


        var ChkObjId = $(this).attr('id');
        var splitObjId = ChkObjId.split('_');
        ObjectiveId = splitObjId[1];
        //alert(ObjId);

        $.ajax({
            type: "POST",
            url: "KPIListing.aspx/GetKraKpiList",
            data: '{"ObjectiveId":"' + ObjectiveId + '"}',
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (jsonresult) {
                //alert(jsonresult.d);
                var KraKpiList = jQuery.parseJSON(jsonresult.d);
                if (KraKpiList == "") {
                    $("#divKraKpi").append($("<div></div>").html("Threre are no KRAs and KPIs of selected Objective."));
                }
                //alert(KraKpiList);
                else {
                    $("#divKraKpi").append($("<div><b>KRAs and KPIs of selected Objective</b></div>")).append($("<br/>"));
                    for (var Index = 0; Index < KraKpiList.length; Index++) {
                        //alert("first"+KraKpiList[Index].KRAID);
                        var KraDivId = "divKRA_" + KraKpiList[Index].KRAID;
                        var flag = 0;
                        var KraTitle = KraKpiList[Index].KRATitle;
                        var KraDescription = KraKpiList[Index].KRADescription;
                        //alert(KraDescription);
                        var kraDescId = "divDesc" + KraKpiList[Index].KRAID;
                        var KraBGColor = KraKpiList[Index].KRABGColor;
                        var KPIListId = "divKpiList_" + KraKpiList[Index].KPIID;
                        var KRAListId = "divKRAList_" + KraKpiList[Index].KRAID;

                        //$("#divKraKpi").append($('<div></div>').attr("id", KRAListId))
                        //$("#divKraKpi").append($('<div></div>').attr("id", KPIListId))

                        for (var kraIndex = 0; kraIndex < Index; kraIndex++) {
                            if (KraKpiList[kraIndex].KRAID == KraKpiList[Index].KRAID) {
                                flag = 1;
                                //alert("exist"+KraKpiList[Index].KRAID);                            
                            }
                        }
                        if (flag == 0) {
                            $("#divKraKpi").append($('<div></div>').attr("id", KRAListId))
                            $("#" + KRAListId).append($('<div><b>KRA Title</b></div>')).append($('<br/>'));
                            $("#" + KRAListId).append($('<div></div>').attr("id", KraDivId).html(KraTitle).css("background-color", "#" + KraBGColor)).append($('<br/>'));
                            $("#" + KRAListId).append($('<div></div>').attr("id", kraDescId).html(KraDescription)).append($('<br/>'));
                            $("#" + KRAListId).append($('<div><b>KPIs</b></div>')).append($('<br/>'));
                        }

                        // $("#divKraKpi").append($('<div></div>').attr("id", KPIListId))
                        $("#" + KRAListId).append($('<div></div>').attr("id", KPIListId))
                        var KPIId = KraKpiList[Index].KPIID;
                        var EditKPIID = "EditKPI_" + KraKpiList[Index].KRAID + "_" + KPIId;
                        var KPITitle = KraKpiList[Index].KPITitle;


                        $("#" + KPIListId).append($('<div></div>').attr("id", "divKPI_" + KPIId).html('<b>' + KPITitle + '</b>'));
                        $("#" + KPIListId).append($('<a></a>').text("Edit ").attr("id", "EditKPI_" + KPIId).attr("href", "#").attr("class", "EditKPI"));
                        $("#" + KPIListId).append($('<a></a>').text("Delete ").attr("id", "DeleteKPI_" + KPIId).attr("href", "#").attr("class", "DeleteKPI"));


                        $("#" + KPIListId).append($('<a></a>').text("View Applicability").attr("id", "Applicability_" + KPIId).attr("href", "#").attr("class", "FuncApplicable")).append($('<br/>'));

                        //var check = $('<div>').find(":contains(" + KraDivId + ")");


                    }
                }
            },
            error: function (jsonresult) {
                alert(response.responseText);
            }
        });
    }
    else {
        $("#divKraKpi").empty();
    }
})


$(document).on("click", ".FuncApplicable", function (e) {
    e.preventDefault();
    var ids = $(this).attr("id");
    //alert(ids);
    var spllitid = ids.split('_');
    var KPIId = spllitid[1];
    //alert("kpiID " + KPIId);
    var KRADivIds = $(this).parent().parent().attr("id");
    var splitKRAId = KRADivIds.split('_');
    var KRAId = splitKRAId[1];

    var objDivId = $(this).parent().parent().parent().parent().attr("id");

    var splitObjId = objDivId.split('_');
    var objId = splitObjId[1];

    var IsKPIAssigned = 0;
    for (var Index = 0; Index < AssignedKPIList.length; Index++) {
        if (AssignedKPIList[Index].KPIID == KPIId) {
            IsKPIAssigned = 1;
        }
    }

    $.ajax({
        type: "POST",
        url: "KPIListing.aspx/SendId",
        data: '{"ObjectiveId":' + objId + ',"KRAId":' + KRAId + ',"KPIId":' + KPIId + '}',
        contentType: 'application/json; charset=utf-8',
        datatype: "json",
        success: function (result) {
            //window.location("");            
            window.location = "../KRA/ViewKPIApplicabilityToFunctions.aspx?IsKPIAssigned=" + IsKPIAssigned;
        },
        error: function (result) {
            alert(response.responseText);
        }
    });

})

$(document).on("click", ".DeleteKPI", function (e) {
    e.preventDefault();
    var DeletedivId = $(this).attr("id");
    var splitId = DeletedivId.split('_');
    var KPIId = splitId[1];
    var that = this;

    $("#DeleteKPIDialog").css("display", "block");
    $("#DeleteKPIDialog").dialog({
        width: 250,
        height: 200,
        title: "Delete KPI",
        draggable: false,
        resizable: false,
        modal: true,
        buttons: [{ text: "Yes",
            click: function () {
                $.ajax({
                    type: "POST",
                    url: "KPIListing.aspx/DeleteKPI",
                    data: '{"KPIId":' + KPIId + '}',
                    contentType: 'application/json; charset=utf-8',
                    datatype: "json",
                    success: function (result) {
                        //window.location("");
                        var KpiDelete = result.d;
                        if (KpiDelete == "true") {
                            $(that).closest('div').remove();
                            $('#divKPI' + KPIId).remove();
                            alert("KPI Deleted Successfully");
                        }
                        else {
                            alert("KPI not deleted");
                        }
                    },
                    error: function (result) {
                        alert(response.responseText);
                    }
                });
                $(this).dialog("close");
            }
        },
                    {
                        text: "No",
                        click: function () {
                            //alert("I am No button.");
                            $(this).dialog("close");
                        }
                    }
                    ]
    });
    return false;


    //alert("Under Constuction");


});

$(document).on("click", "#lnkbtnKPI", function (e) {
    //alert("link");
    e.preventDefault();
    window.location = "../KRA/AddKPI.aspx";
});

$(document).on("click", ".EditKPI", function (e) {
    e.preventDefault();

    var EditDivId = $(this).attr("id");
    var splitDivID = EditDivId.split('_');
    var KPIID = splitDivID[1];

    $.ajax({
        type: "POST",
        url: "KPIListing.aspx/EditKPI",
        data: '{"KPIId":' + KPIID + '}',
        contentType: 'application/json; charset=utf-8',
        datatype: "json",
        success: function (result) {
            var IsEdit = result.d;
            window.location = "../KRA/AddKPI.aspx?Edit=" + IsEdit;
        },
        error: function (result) {
        }
    });
})

