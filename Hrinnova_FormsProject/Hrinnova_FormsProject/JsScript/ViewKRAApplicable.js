$(document).ready(function () {
    Slideflag = 0;
    var ObjFunctionDetail;
    var ObjKRADetailForSelectedFunction;
    var ObjKPIsForSelectedFunction;
    var SplitEditLinkID;
    var SplitKPiGuidelineID;
    var rdbtnKraId;
    GetSelectedFunctionDetail();



});

function GetSelectedFunctionDetail() {
    $.ajax({
        url: "../KRA/ViewKRAApplicable.aspx/GetKraListForSelectedFunction",
        type: "post",
        contentType: "application/json;charset=utf-8",
        success: function (jsonData) {
            var Obj = jQuery.parseJSON(jsonData.d);
            ObjFunctionDetail = Obj.SelectedFunctionDetail;
            ObjKRADetailForSelectedFunction = Obj.KRADetailForSelectedFunction;

            var ParentFunctionTitle = ObjFunctionDetail[0].ParentFunctionTitle;
            var FunctionTitle = ObjFunctionDetail[0].FunctionTitle;

            $("#txtParentFunction").val(ParentFunctionTitle);
            $("#txtFunction").val(FunctionTitle);


            if (ObjKRADetailForSelectedFunction.length != 0) {

                for (var Index = 0; Index < ObjKRADetailForSelectedFunction.length; Index++) {

                    var flag = 0;
                    var ObjectiveID = "divObj_" + ObjKRADetailForSelectedFunction[Index].ObjectiveID; ;
                    var ObjectiveTitle = ObjKRADetailForSelectedFunction[Index].ObjectiveTitle; ;
                    var ObjectiveBGColor = "#" + ObjKRADetailForSelectedFunction[Index].ObjectiveBGColor; ;
                    var KRABGColor = "#" + ObjKRADetailForSelectedFunction[Index].KRABGColor;
                    $("#divKraList").append($("<div></div>").addClass("addkpi-radio-div").attr("id", "divKpiRadio" + ObjectiveID));
                    for (var ObjectiveIndex = 0; ObjectiveIndex < Index; ObjectiveIndex++) {
                        if (ObjKRADetailForSelectedFunction[Index].ObjectiveID == ObjKRADetailForSelectedFunction[ObjectiveIndex].ObjectiveID) {
                            flag = 1;
                        }
                    }

                    if (flag == 0) {

                        $("#divKpiRadio" + ObjectiveID).append($("<div></div>").attr("id", ObjectiveID).html(ObjectiveTitle).addClass("addkpi-radio-div-head").css("background-color", ObjectiveBGColor));
                    }

                    var RadioButtonID = "rbtnKRAList" + ObjKRADetailForSelectedFunction[Index].KRAID;
                    var KRAID = "divKRA_" + ObjKRADetailForSelectedFunction[Index].KRAID;
                    //                    $("#" + ObjectiveID).append($("<div></div>").attr("id", KRAID));
                    //                    $("#" + KRAID).append($('<input type="radio" name="rbtnKRA" id=' + RadioButtonID + ' >'))
                    //                                                                           .append($("<span>").text(ObjKRADetailForSelectedFunction[Index].KRATitle));
                    $("#divKpiRadio" + ObjectiveID).append($('<input type="radio" name="rbtnKRA" id=' + RadioButtonID + '>').addClass("addkpi-radio")).append($("<p></p>").text(ObjKRADetailForSelectedFunction[Index].KRATitle));


                }
            }

        },
        error: function (response) {
            alert(response.responseText);
        }

    })
}


//$(document).on('click', ".slide", function () {

//    var KpiId = $(this).parent().attr('id');
//    var KpiTitleId = $(this).attr('id');
//    var childID = $("#" + KpiId + ' > div:first-child').next().next().attr('id');
//    // alert(childID);
//    var imgID = KpiTitleId.split("divKPITitle_");
//    imgID = imgID[1];
//    var ChildGuidelineId = $("#" + childID);

//    if (ChildGuidelineId.is(':visible')) {
//        ChildGuidelineId.slideUp();
//        // Other stuff to do on slideUp
//        $("#img" + imgID).attr('src', '../Images/DownArrowicon.png')
//    } else {
//        ChildGuidelineId.slideDown();
//        $("#img" + imgID).attr('src', '../Images/IconUpArrow.png')

//        // Other stuff to down on slideDown
//    }

//});

$(document).on('click', "input[name='rbtnKRA']", function (e) {
    e.preventDefault();

    //    alert($(this).attr('id'));
    rdbtnKraId = $(this).attr('id');
    var splitRdbtnKraId = rdbtnKraId.split("rbtnKRAList");
    //GetKPIForSelectedKRA(rdbtnKraId, false);
    GetKPIForSelectedKRA(rdbtnKraId);
    //Vallenato();

    //    alert(splitRdbtnKraId[1]);


});

$(document).on('click', '#btnBack', function (e) {
    e.preventDefault();
    window.location = "../KRA/FunctionListing.aspx";
});

$(document).on('click', '.EditGuidelines', function (e) {
    e.preventDefault();
    var EditLinkID = $(this).attr("id");
    SplitEditLinkID = EditLinkID.split("_");
    var GuidelineDivId = $(this).parent().attr("id");

    SplitKPiGuidelineID = GuidelineDivId.split("_");
    var GuidelineId = SplitKPiGuidelineID[1];

    //    var KpiGuidelineDivID = $(this).parent().attr("id");
    //    SplitKPiGuidelineID = KpiGuidelineDivID.split("divGuideline");
    var KPITitle = $("#actionHeader" + SplitEditLinkID[1]).text();

    var Guidelinelength = $("#ul_" + SplitEditLinkID[1] + "_" + GuidelineId + "_" + SplitEditLinkID[2]).find('li').length;
    
    for (var Index = 0; Index < Guidelinelength; Index++) {
        if (Index != 0) {
            GuidelineText = GuidelineText + '<br />';
        }
        else {
            var GuidelineText = "";
        }
        GuidelineText = GuidelineText + $("#ul_" + SplitEditLinkID[1] + "_" + GuidelineId + "_" + SplitEditLinkID[2]).children().children('li').eq(Index).text();        

    }

    var KPILevel = SplitEditLinkID[2];
    var DialogTitle = KPITitle + "-" + KPILevel;

    $("#lblMessage").empty().removeClass('alert alert-warning');
    var regex = /<br\s*[\/]?>/gi;
    //    $("#txtAreaGuideline").html(GuidelineText);
    $("#txtAreaGuideline").val(GuidelineText.replace(regex, "\n"));

    $("#divEditGuidelines").css("display", "block");
    $("#divEditGuidelines").dialog({
        width: 650,
        height: 250,
        title: DialogTitle,
        modal: true
    });
    return false;

})


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
                //GetKPIForSelectedKRA(rdbtnKraId, true);
                GetKPIForSelectedKRA(rdbtnKraId);
            },
            error: function (response) {
                alert(response.responseText);
            }
        });
    }
});


function GetKPIForSelectedKRA(rdbtnKraId) {
    $("#divKpiList").empty();
    var splitRdbtnKraId = rdbtnKraId.split("rbtnKRAList");
    $.ajax({
        url: "../KRA/ViewKRAApplicable.aspx/GetKPIListForSelectedKra",
        type: "post",
        contentType: "application/json;charset=utf-8",
        data: '{"KraID":' + splitRdbtnKraId[1] + '}',
        success: function (jsonData) {
            $("#" + rdbtnKraId).prop('checked', true);
            ObjKPIsForSelectedFunction = jQuery.parseJSON(jsonData.d);
            //    alert(jsonData.d);
            if (ObjKPIsForSelectedFunction.length != 0) {


                for (var Index = 0; Index < ObjKPIsForSelectedFunction.length; Index++) {

                    var flag = 0;
                    var imgId = "img" + ObjKPIsForSelectedFunction[Index].KPIID;
                    var KPIID = ObjKPIsForSelectedFunction[Index].KPIID;
                    var Role = ObjKPIsForSelectedFunction[Index].Display;
                    var GuidelineDescription = ObjKPIsForSelectedFunction[Index].GuidelineDescription;
                    var KpiGuidelineID = ObjKPIsForSelectedFunction[Index].KPIGuidelineID;

                    for (var KpiIndex = 0; KpiIndex < Index; KpiIndex++) {

                        if (KPIID == ObjKPIsForSelectedFunction[KpiIndex].KPIID) {
                            flag = 1;

                        }
                    }

                    if (flag == 0) {
                        var KpiTitle = ObjKPIsForSelectedFunction[Index].KPITitle + "(";
                        for (var KpiIndex = 0; KpiIndex < ObjKPIsForSelectedFunction.length; KpiIndex++) {

                            if (KPIID == ObjKPIsForSelectedFunction[KpiIndex].KPIID) {
                                KpiTitle += ObjKPIsForSelectedFunction[KpiIndex].Display + ",";

                            }
                        }
                        KpiTitle = KpiTitle.substr(0, (KpiTitle.length - 1));
                        KpiTitle += ")";
                        $("#divKpiList").append($("<div></div>").attr("id", "divKPITitle_" + KPIID));

                        $("#divKPITitle_" + KPIID).append($("<h2></h2>").text(KpiTitle).addClass("accordion-header").attr("id", "actionHeader" + KPIID));
                        //$("#divkpi" + KPIID).append($("<div></div>").addClass("accordion-content").attr("id", "divAccordianContent" + KPIID));
                        $("#divKPITitle_" + KPIID).append($("<div></div>").addClass("accordion-content").attr("id", "divAccordianContent" + KPIID));
                        $("#divAccordianContent" + KPIID).append($("<div></div>").addClass("accordion-main-box").attr("id", "divAccordianMainbox" + KPIID));
                        //$("#actionHeader").removeClass("active-header").removeClass("inactive-header")
                        //                        if (Show == false) {
                        //                            //                            $("#" + "divKpi" + KPIID).append($("<div></div>").attr("id", "divKPITitle_" + KPIID).html(KpiTitle).addClass("funcTitle slide fontColor").prepend('<img id="' + "img" + KPIID + '" src="../Images/DownArrowicon.png" style="background-color:silver;" />')).append($("<br/>"));
                        //                            

                        //                        }
                        //                        else if (Show == true) {
                        //                            //$("#" + "divKpi" + KPIID).append($("<div></div>").attr("id", "divKPITitle_" + KPIID).html(KpiTitle).addClass("funcTitle slide fontColor").prepend('<img id="' + "img" + KPIID + '" src="../Images/IconUpArrow.png" style="background-color:silver;" />')).append($("<br/>"));
                        //                        }
                    }

                    //                    if (Show == false) {
                    //                        $("#" + "divKpi" + KPIID).append($("<div></div>").attr("id", "divGuideline" + KPIID).hide());
                    //                    }
                    //                    else if (Show == true) {
                    //                        $("#" + "divKpi" + KPIID).append($("<div></div>").attr("id", "divGuideline" + KPIID));
                    //                    }

                    //                    $("#divGuideline" + KPIID).append($("<div></div>").attr("id", "divGuideline" + KpiGuidelineID));
                    //                    $("#" + "divGuideline" + KpiGuidelineID).append($("<div></div>").html(Role).attr("class", "roleName"));
                    //                    $("#" + "divGuideline" + KpiGuidelineID).append($("<div></div>").attr("id", "divGuideline_" + KPIID + "_" + Role).html(GuidelineDescription).attr("class", "fontColor"));
                    //                    $("#" + "divGuideline" + KpiGuidelineID).append($("<a></a>").text("Edit").attr("id", "Edit_" + KPIID + "_" + Role).attr("href", "#").attr("class", "EditGuidelines"));


                    $("#divAccordianMainbox" + KPIID).append($("<div></div>").addClass("accordion-sub-box").attr("id", "divAccordianSubbox_" + KpiGuidelineID + "_" + Role));
                    $("#divAccordianSubbox_" + KpiGuidelineID + "_" + Role).append($("<div></div>").addClass("accordion-head").attr("id", "divAccordianHead").append($("<strong></strong>").text(Role)));
                    $("#divAccordianSubbox_" + KpiGuidelineID + "_" + Role).append($("<div></div>").addClass("accordion-list").attr("id", "ul_" + KPIID + "_" + KpiGuidelineID + "_" + Role));

                    //
                    var GuidelineString = GuidelineDescription;
                    var newLineDesc = "";

                    if (GuidelineString.contains("<br />")) {
                        var StringWithBR = GuidelineString.substring(GuidelineString.length - 6);
                        if (StringWithBR == "<br />") {
                            GuidelineString = GuidelineString.substring(0, GuidelineString.lastIndexOf("<br />"));
                        }
                        newLineDesc = (GuidelineString.split("<br />"));

                    }
                    else if (GuidelineString.contains("<br/>")) {
                        var StringWithBR = GuidelineString.substring(GuidelineString.length - 5);
                        if (StringWithBR == "<br/>") {
                            GuidelineString = GuidelineString.substring(0, GuidelineString.lastIndexOf("<br/>"));
                        }
                        newLineDesc = (GuidelineString.split("<br/>"));
                    }






                    //                    if (StringWithBR == "<br />") {
                    //                        GuidelineString = GuidelineString.substring(0, GuidelineString.lastIndexOf("<br/>"));

                    //                    }
                    //                    var newLineDesc = (GuidelineString.split("<br />"));

                    if (newLineDesc != "") {
                        for (var i = 0; i < newLineDesc.length; i++) {
                            //$("#ul_" + KPIID + "_" + KpiGuidelineID + "_" + Role).append($('<li></li>').text(newLineDesc[i]));
                            $("#ul_" + KPIID + "_" + KpiGuidelineID + "_" + Role).append($('<ul></ul>').append($('<li></li>').text(newLineDesc[i])));
                        }
                    }
                    else {
                        //$("#ul_" + KPIID + "_" + KpiGuidelineID + "_" + Role).append($('<li></li>').text(GuidelineString));
                        $("#ul_" + KPIID + "_" + KpiGuidelineID + "_" + Role).append($('<ul></ul>').append($('<li></li>').text(GuidelineString)));
                    }

                    $("#divAccordianSubbox_" + KpiGuidelineID + "_" + Role).append($("<a></a>").text("Edit").attr("id", "Edit_" + KPIID + "_" + Role).attr("href", "#").attr("class", "EditGuidelines"));


                }
                //                alert(window.Slideflag);
                //                if (window.Slideflag == 0) {
                Vallenato();
                //                    window.Slideflag = 1;
                //                }
            }

        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}

$(document).on('click', '#btnCancel', function (e) {
    e.preventDefault();
    $("#divEditGuidelines").dialog("close");
});


//$('.accordion-header').toggleClass('inactive-header');

////Set The Accordion Content Width
//var contentwidth = $('.accordion-header').width();
//$('.accordion-content').css({ 'width': contentwidth });

////Open The First Accordion Section When Page Loads
//$('.accordion-header').first().toggleClass('active-header').toggleClass('inactive-header');
//$('.accordion-content').first().slideDown().toggleClass('open-content');

//// The Accordion Effect
//// $('.accordion-header').click(function () {
//$(document).on('click', ".accordion-header", function () {

//    if ($(this).is('.inactive-header')) {
//        $('.active-header').toggleClass('active-header').toggleClass('inactive-header').next().slideToggle().toggleClass('open-content');
//        $(this).toggleClass('active-header').toggleClass('inactive-header');
//        $(this).next().slideToggle().toggleClass('open-content');
//    }

//    else {
//        $(this).toggleClass('active-header').toggleClass('inactive-header');
//        $(this).next().slideToggle().toggleClass('open-content');
//    }
//    return false;
//});