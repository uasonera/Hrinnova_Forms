$(document).ready(function () {
    var ObjdtKPIGuidelinesDetail;
    var ObjdtMandatoryDetail;
    var IsAssigned;
    ViewApplicabilityToFunctionsDetail();

});

function ViewApplicabilityToFunctionsDetail() {
    $.ajax({
        url: "../KRA/ViewKPIApplicabilityToFunctions.aspx/GetKPIApplicabilityToFunctions",
        type: "post",
        contentType: "application/json;charset=utf-8",
        success: function (jsonData) {
            //alert("success");
            //alert(jsonData.d);
            var Obj = jQuery.parseJSON(jsonData.d);
            var ObjdtObjectiveDetail = Obj.dtObjectiveDetail;
            var ObjdtKRADetail = Obj.dtKRADetail;
            var ObjdtKPIDetail = Obj.dtKPIDetail;
            var ObjdtKPIApplicabilityToFunctions = Obj.dtKPIApplicabilityToFunctions;
            ObjdtKPIGuidelinesDetail = Obj.dtKPIGuidelinesDetail;
            ObjdtMandatoryDetail = Obj.dtMandatoryDetail;
            IsAssigned = Obj.IsAssignedKPI;

            var ObjectiveBGColor = "#" + ObjdtObjectiveDetail[0].ObjectiveBGColor;
            var KRABGColor = "#" + ObjdtObjectiveDetail[0].KRABGColor;

            //            $("#lblObjectiveTitle").text(ObjdtObjectiveDetail[0].ObjectiveTitle).css("background-color", ObjectiveBGColor);

            //            $("#lblKRATitle").text(ObjdtKRADetail[0].KRATitle).css("background-color", KRABGColor);
            //            $("#lblKPITitle").text(ObjdtKPIDetail[0].KPITitle);

            $("#divKRATitle").html('<h4>' + ObjdtKRADetail[0].KRATitle + '</h4>').css("background-color", KRABGColor);
            $("#divObjTitle").html('<h4>' + ObjdtObjectiveDetail[0].ObjectiveTitle + '</h4>').css("background-color", ObjectiveBGColor);
            $("#divKPITitle").html('<h4>' + ObjdtKPIDetail[0].KPITitle + '</h4>')

            for (var FunctionIndex = 0; FunctionIndex < ObjdtKPIApplicabilityToFunctions.length; FunctionIndex++) {

                var FunctionID = ObjdtKPIApplicabilityToFunctions[FunctionIndex].FunctionID;
                var FunctionTitle = ObjdtKPIApplicabilityToFunctions[FunctionIndex].FunctionTitle;
                var ParentFunctionID = ObjdtKPIApplicabilityToFunctions[FunctionIndex].ParentFunctionID;
                var ParentFunctionTitle = ObjdtKPIApplicabilityToFunctions[FunctionIndex].ParentTitle;
                var CheckboxID = "ChkBox" + FunctionID;
                var divFuncListId = "divFuncList" + ParentFunctionID;
                if (!(document.getElementById(divFuncListId))) {
                    // yup, already there
                    $("#divFuncList").append($('<div></div>').attr("id", divFuncListId).addClass("addkpi-radio-div1"));
                }


                var flag = 0;


                for (var Index = 0; Index < FunctionIndex; Index++) {
                    if (ParentFunctionID != 0 && (ParentFunctionID == ObjdtKPIApplicabilityToFunctions[Index].ParentFunctionID)) {
                        flag = 1;
                    }
                }
                if (flag == 0) {
                    //                    $("#DivFunctionList").append($("<span>").text(ParentFunctionTitle).append($("<br/>")));

                    $("#" + divFuncListId).html('<h4>' + ParentFunctionTitle + '</h4>').append($('<br/>'));
                }

                //                $("#DivFunctionList").append($('<input type="checkbox" id=' + CheckboxID + '>').prop("checked", true)).append($("<span>").text(FunctionTitle).append($("<br/>")));
                $("#" + divFuncListId).append($("<div></div>").append($('<input type="checkbox" id=' + CheckboxID + '>').attr("checked", true).attr('disabled', 'disabled').addClass("addkpi-checkbox2")).append($("<p></p>").text(FunctionTitle).append($("<br/>"))));
            }

            GetGuidelines();
        },
        error: function (response) {
            alert(response.responseText);
        }
    });

}


$(document).on('click', ".slide", function () {

    var FunctionID = $(this).parent().attr('id');
    var FunctionTitleID = $(this).attr('id');
    var childID = $("#" + FunctionID + ' > div:first-child').next().next().attr('id');
    var imgID = FunctionTitleID.split("divFunctionTitle_");
    imgID = imgID[1];
    var ChildGuidelineId = $("#" + childID);

    if (ChildGuidelineId.is(':visible')) {
        ChildGuidelineId.slideUp();
        // Other stuff to do on slideUp
        $("#img" + imgID).attr('src', '../Images/DownArrowicon.png')
    } else {
        ChildGuidelineId.slideDown();
        $("#img" + imgID).attr('src', '../Images/IconUpArrow.png')

        // Other stuff to down on slideDown
    }

});

function GetGuidelines() {
    $("#divGuidelineList").empty();
    //    if (Show == true) {
    $.ajax({
        url: "../KRA/ViewKPIApplicabilityToFunctions.aspx/GetKPIGuidelinesAccordingToFunction",
        type: "post",
        contentType: "application/json;charset=utf-8",
        success: function (jsonData) {
            ObjdtKPIGuidelinesDetail = jQuery.parseJSON(jsonData.d);
            GetGuidelinesList();
        },
        error: function (response) { alert(response.responseText); }
    });
    // }
    //    else if (Show == false) {
    //        GetGuidelinesList(Show);
    //    }

}

function GetGuidelinesList() {
    //
    for (var GuidelineIndex = 0; GuidelineIndex < ObjdtKPIGuidelinesDetail.length; GuidelineIndex++) {
        var flag = 0;
        var imgId = "img" + ObjdtKPIGuidelinesDetail[GuidelineIndex].FunctionID;
        var FunctionID = ObjdtKPIGuidelinesDetail[GuidelineIndex].FunctionID;
        var Role = ObjdtKPIGuidelinesDetail[GuidelineIndex].Display;
        var GuidelineDescription = ObjdtKPIGuidelinesDetail[GuidelineIndex].GuidelineDescription;
        var KpiGuidelineID = ObjdtKPIGuidelinesDetail[GuidelineIndex].KPIGuidelineID;
        var KPIID = ObjdtKPIGuidelinesDetail[GuidelineIndex].KPIID;

        for (var FunctionIndex = 0; FunctionIndex < GuidelineIndex; FunctionIndex++) {

            if (FunctionID == ObjdtKPIGuidelinesDetail[FunctionIndex].FunctionID) {
                flag = 1;

            }
        }

        if (flag == 0) {
            var FunctionTitle = ObjdtKPIGuidelinesDetail[GuidelineIndex].FunctionTitle + "(";
            for (var FunctionIndex = 0; FunctionIndex < ObjdtKPIGuidelinesDetail.length; FunctionIndex++) {

                if (FunctionID == ObjdtKPIGuidelinesDetail[FunctionIndex].FunctionID) {
                    FunctionTitle += ObjdtKPIGuidelinesDetail[FunctionIndex].Display + ",";

                }
            }
            FunctionTitle = FunctionTitle.substr(0, (FunctionTitle.length - 1));
            FunctionTitle += ")";

            $("#divGuidelineList").append($("<div></div>").attr("id", "divGuidelineList" + FunctionID));
            $("#divGuidelineList" + FunctionID).html('<h2 class="accordion-header">' + FunctionTitle + '</h2>');
            $("#divGuidelineList" + FunctionID).append($('<div></div>').attr("id", "GuidelineContent" + FunctionID).addClass("accordion-content"));
            $("#GuidelineContent" + FunctionID).append($('<div></div>').attr("id", "GuidelineMainBox" + FunctionID).addClass("accordion-main-box"));



            $("#divGuidelineList" + FunctionID).append($("<div></div>").attr("id", "divFunction" + FunctionID));
            //            if (Show == false) {

            //                $("#" + "divFunction" + FunctionID).append($("<div></div>").attr("id", "divFunctionTitle_" + FunctionID).html(FunctionTitle).addClass("funcTitle slide fontColor").prepend('<img id="' + "img" + FunctionID + '" src="../Images/DownArrowicon.png" style="background-color:silver;" />')).append($("<br/>"));
            //            }
            //            else if (Show == true) {

            //                $("#" + "divFunction" + FunctionID).append($("<div></div>").attr("id", "divFunctionTitle_" + FunctionID).html(FunctionTitle).addClass("funcTitle slide fontColor").prepend('<img id="' + "img" + FunctionID + '" src="../Images/IconUpArrow.png" style="background-color:silver;" />')).append($("<br/>"));
            //            }
        }

        //        if (Show == false) {
        //            $("#" + "divFunction" + FunctionID).append($("<div></div>").attr("id", "divGuideline" + FunctionID).hide());
        //        }
        //        else if (Show == true) {
        //            $("#" + "divFunction" + FunctionID).append($("<div></div>").attr("id", "divGuideline" + FunctionID));
        //        }
        //        $("#divGuideline" + FunctionID).append($("<div></div>").attr("id", "divKPIGuideline" + KpiGuidelineID));
        //
        var MandatoryCheckboxID = "Mandatory_" + FunctionID + "_" + KPIID + "_" + Role;
        $("#GuidelineMainBox" + FunctionID).append($('<div></div>').attr("id", "divKPIGuideline" + KpiGuidelineID).addClass("accordion-sub-box"));
        $("#divKPIGuideline" + KpiGuidelineID).append($("<div></div>").html('<strong>' + Role + ' ' + '</strong>').addClass("accordion-head roleName"))
                                              .append($('<div></div>').append($('<input type="checkbox" id=' + MandatoryCheckboxID + '>').addClass('Mandatory')).append($("<span></span>").text('Mandatory')));
        $("#divKPIGuideline" + KpiGuidelineID).append($("<div></div>").attr("id", "divGuideline_" + FunctionID + "_" + Role).addClass("accordion-list"));
        $("#divGuideline_" + FunctionID + "_" + Role).append($('<ul></ul>').attr("id", "ul" + FunctionID + "_" + Role));
        //

        for (var MandatoryIndex = 0; MandatoryIndex < ObjdtMandatoryDetail.length; MandatoryIndex++) {
            var MandatoryRole = ObjdtMandatoryDetail[MandatoryIndex].Display;
            var MandatoryFunctionID = ObjdtMandatoryDetail[MandatoryIndex].FunctionID;
            var MandatoryKPIID = ObjdtMandatoryDetail[MandatoryIndex].KPIID;
            var IsMandatory = ObjdtMandatoryDetail[MandatoryIndex].IsMandatory;
            if (MandatoryRole == Role && MandatoryFunctionID == FunctionID && MandatoryKPIID == KPIID) {
                $('#' + MandatoryCheckboxID).attr('checked', IsMandatory);
                if (IsAssigned == 1 && (IsMandatory == false || IsMandatory == null)) {
                    $('#' + MandatoryCheckboxID).prop('disabled', true);
                }
            }
        }

        var string = GuidelineDescription;
        var newLineDesc = "";

        if (string.contains("<br />")) {
            var stringWithBr = string.substring(string.length - 6);

            if (stringWithBr == "<br />") {
                string = string.substring(0, string.lastIndexOf("<br />"));
            }
            newLineDesc = (string.split("<br />"));

        }
        else if (string.contains("<br/>")) {
            var stringWithBr = string.substring(string.length - 5);

            if (stringWithBr == "<br/>") {
                string = string.substring(0, string.lastIndexOf("<br/>"));
            }
            newLineDesc = (string.split("<br/>"));
        }




        //alert(newLineDesc);
        //newLineDesc = jQuery.trim(newLineDesc);
        //newLineDesc = newLineDesc.TrimEnd(",");
        //newLineDesc = newLineDesc.replace(/,\s*$/, "");
        //var Desc =  $.makeArray(newLineDesc);
        //newLineDesc = newLineDesc.substring(1, newLineDesc.lastIndexOf("<br/>"));

        if (newLineDesc != "") {
            for (var Index = 0; Index < newLineDesc.length; Index++) {
                $("#ul" + FunctionID + "_" + Role).append($('<li></li>').text(newLineDesc[Index]));
            }
        }
        else {
            $("#ul" + FunctionID + "_" + Role).append($('<li></li>').text(string));
        }


        //        $("#" + "divKPIGuideline" + KpiGuidelineID).append($("<div></div>").html(Role).attr("class", "roleName"));
        //        $("#" + "divKPIGuideline" + KpiGuidelineID).append($("<div></div>").attr("id", "divGuideline_" + FunctionID + "_" + Role).html(GuidelineDescription).attr("class", "fontColor"));
        $("#" + "divKPIGuideline" + KpiGuidelineID).append($("<a></a>").text("Edit").attr("id", "Edit_" + FunctionID + "_" + Role).attr("href", "#").attr("class", "EditGuidelines"));
    }
    //  alert("1");
    Vallenato();
}


$(document).on('click', '#btnApply', function (e) {
    e.preventDefault();
    
    var MandatoryIDsList = [];

    $('#divGuidelineList .Mandatory').each(function () {
        var id = $(this).attr('id');
        id = id.split('_');
        var FunctionId = id[1];
        var KPIId = id[2];
        var Level = id[3];
        var IsMandatory = $(this).is(':checked');
        var MandatoryID = splitMandatoryIDs(FunctionId, KPIId, Level, IsMandatory);

        MandatoryIDsList.push(MandatoryID);

    });

    MandatoryIDsList = "[" + MandatoryIDsList + "]";

    $.ajax({
        type: 'post',
        url: '../KRA/ViewKPIApplicabilityToFunctions.aspx/StoreMandatoryDetails',
        data: '{"MandatoryIDDetails":' + MandatoryIDsList + '}',
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            if (result.d == "true") {                
                RedirectParent();
                //window.location = "../KRA/KPIManagement.aspx"
            }
        },
        error: function () {
            alert("error");
        }
    });
});

function RedirectParent() {
    
    $.ajax({
        type: 'post',
        url: '../KRA/ViewKPIApplicabilityToFunctions.aspx/EncryptSuccessResult',
        data: '{}',
        contentType: 'application/json;charset=utf-8',
        success: function (result) {
            window.location = "../KRA/KPIListing.aspx?Data=" + result.d;

        },
        error: function () {
            alert("error");
        }
    });
}

function splitMandatoryIDs(FunctionId, KPIId, Level, IsMandatory) {
    var MandatoryIDs = new Object();
    MandatoryIDs.FunctionId = FunctionId;
    MandatoryIDs.KPIId = KPIId;
    MandatoryIDs.Level = Level;
    MandatoryIDs.IsMandatory = IsMandatory;
    MandatoryIDs = JSON.stringify(MandatoryIDs);
    return MandatoryIDs;
}


$(document).on('click', '.EditGuidelines', function (e) {
    e.preventDefault();

    var EditLinkID = $(this).attr("id");
    SplitEditLinkID = EditLinkID.split("_");
    var KpiGuidelineDivID = $(this).parent().attr("id");

    SplitKPiGuidelineID = KpiGuidelineDivID.split("divKPIGuideline");
    //var FunctionTitle = $("#divFunctionTitle_" + SplitEditLinkID[1]).text();
    //var FunctionTitle = $("#divGuidelineList").find('h2').text();
    var FunctionTitle = $("#divGuidelineList" + SplitEditLinkID[1]).find('h2').text();

    //var GuidelineText = $("#divGuideline_" + SplitEditLinkID[1] + "_" + SplitEditLinkID[2]).children().text();
    var Guidelinelength = $("#divGuideline_" + SplitEditLinkID[1] + "_" + SplitEditLinkID[2]).find('li').length;

    for (var Index = 0; Index < Guidelinelength; Index++) {
        if (Index != 0) {
            GuidelineText = GuidelineText + '<br />';
        }
        else {
            var GuidelineText = "";
        }
        GuidelineText = GuidelineText + $("#divGuideline_" + SplitEditLinkID[1] + "_" + SplitEditLinkID[2]).children().children('li').eq(Index).text();
    }


    //    var Guidelinelength = $("#ul_" + SplitEditLinkID[1] + "_" + GuidelineId + "_" + SplitEditLinkID[2]).find('li').length;
    //    for (var Index = 0; Index < Guidelinelength; Index++) {
    //        if (Index != 0) {
    //            GuidelineText = GuidelineText + '<br />';
    //        }
    //        else {
    //            var GuidelineText = "";
    //        }
    //        GuidelineText = GuidelineText + $("#ul_" + SplitEditLinkID[1] + "_" + GuidelineId + "_" + SplitEditLinkID[2]).children('li').eq(Index).text();

    //    }

    var KPILevel = SplitEditLinkID[2];
    var DialogTitle = FunctionTitle + "-" + KPILevel;


    $("#lblMessage").empty().removeClass('alert alert-warning');
    var regex = /<br\s*[\/]?>/gi;
    //    $("#txtAreaGuideline").html(GuidelineText);
    $("#txtAreaGuideline").val(GuidelineText.replace(regex, "\n"));

    $("#divEditGuidelines").css("display", "block");
    $("#divEditGuidelines").dialog({
        width: 650,
        height: 250,
        title: DialogTitle,
        draggable: false,
        resizable: false,
        modal: true

    });
    return false;

});

$(document).on('click', '#btnSave', function (e) {
    e.preventDefault();
    //alert(ObjFunctionDetail);
    var GuidelineText = $("#txtAreaGuideline").val().trim();
    //    replace(/\n/g, "<br />");
    GuidelineText = GuidelineText.replace(/\n/g, "<br />");
    // alert(GuidelineText);

    if (GuidelineText == "") {
        $("#lblMessage").text("Please enter Guideline.").addClass("yellow-error");
    }
    else {
        $.ajax({
            url: "../KRA/ViewKRAApplicable.aspx/UpdateGuidelines",
            type: "post",
            data: '{"KPIGuidelineID":' + SplitKPiGuidelineID[1] + ',"GuidelineText":"' + GuidelineText + '"}',
            contentType: "application/json;charset=utf-8",
            success: function (jsonData) {
                //alert("success");
                $("#divEditGuidelines").dialog("close");
                GetGuidelines(true);
            },
            error: function (response) {
                alert(response.responseText);
            }
        });
    }


});

$(document).on('click', '#btnCancel', function (e) {
    e.preventDefault();
    $("#divEditGuidelines").dialog("close");
});

$(document).on('click', '#btnBack', function (e) {
    e.preventDefault();
    window.location = "../KRA/KpiListing.aspx";
});
