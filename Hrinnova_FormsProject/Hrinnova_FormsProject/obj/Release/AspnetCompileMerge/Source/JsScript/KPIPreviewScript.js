$(document).ready(function () {
    //alert("Hello");    
    BindKPIDetail();
    //BindGuidlines();
    IsSameGuideline();

    $('img').addClass("Image");
    //Vallenato();

});
function BindKPIDetail() {
    $.ajax({
        type: "POST",
        url: 'KPIPreview.aspx/GetKPIDetail',
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {

            var result = jQuery.parseJSON(result.d);

            var ObjectiveBGColor = "#" + result.ObjectiveDetail[0].ObjectiveBGColor;

            var KRABGColor = "#" + result.ObjectiveDetail[0].KRABGColor;

            //var KpiDetail = result.tblKpiDetail;
            //var FunctionDetail = result.tblFuncDetail;
            //var ObjKRADetail = result.tblObjKraDetail;
            // alert(KpiDetail);

            var KRATitle = result.KRAObjDetail;

            var KPITitle = result.KPITitle;
            var ObjectiveTitle = result.ObjectiveDetail[0].ObjectiveTitle;


            var FunctionDetail = result.KPIFunctionDetails;


            for (var i = 0; i < FunctionDetail.length; i++) {
                //var parentfuncDivID = "divparentfunc" + result.tblFuncDetail[i].ParentFunctionID
                var parentfuncDivID = "divparentfunc" + FunctionDetail[i].ParentFunctionID


                if (!($("#divfun:contains('" + FunctionDetail[i].ParentFunctionTitle + "')").length)) {
                    //$("#divfun").append($("<div></div>").html(FunctionDetail[i].ParentFunctionTitle).attr("id", parentfuncDivID).css('color', 'black'))
                    $("#divfun").append($("<div></div>").addClass("addkpi-radio-div1").attr("id", parentfuncDivID).append($('<p></p>').html('<Strong>' + FunctionDetail[i].ParentFunctionTitle + '</Strong>')));
                    $("#" + parentfuncDivID).append($('<br/>'))
                    if (FunctionDetail[i].IsChildFunction == "1") {
                        for (var j = 0; j < FunctionDetail.length; j++) {
                            //                            var childfuncDivID = "divchildfunc" + result.tblFuncDetail[j].FunctionID
                            //                            var chkfuncId = "chkChildFunc" + funcDetail[j].FunctionID
                            var childfuncDivID = "divchildfunc" + FunctionDetail[j].FunctionID
                            var chkfuncId = "chkChildFunc" + FunctionDetail[j].FunctionID

                            if (FunctionDetail[j].ParentFunctionID == FunctionDetail[i].ParentFunctionID) {
                                $("#" + parentfuncDivID).append($("<div></div>").attr("id", childfuncDivID).addClass("check-box-div").append($('<input>').attr({
                                    type: 'checkbox', name: 'chkChildFunc', value: FunctionDetail[j].FunctionTitle, id: chkfuncId, checked: true, disabled: true
                                })).append($("<span></span>").text(FunctionDetail[j].FunctionTitle)));


                            }
                        }
                    }
                }
            }
            //alert(ObjectiveBGColor);
            $("#divkpi").append($("<h4></h4>").html(KPITitle));
            $("#divobj").append($("<h4></h4>").html(ObjectiveTitle)).css('background-color', ObjectiveBGColor).css('color', 'black').addClass("h4textbox");
            $("#divkra").append($("<h4></h4>").html(KRATitle)).addClass("h4textbox").css("background-color", KRABGColor).css('color', 'black');
            $("#divfunc").html();

            //Vallenato();

        },
        error: function (result) {
            alert(result);
        }
    });
}



function IsSameGuideline() {
    $.ajax({
        type: "POST",
        url: 'KPIPreview.aspx/IsSameGuideline',
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (Jsondata) {
            var SameGuideline = Jsondata.d;
            // alert(SameGuideline);
            if (SameGuideline == "false") {
                //   alert("I am false");
                BindGuidlines();
            }
            else {
                // alert("I am true");
                BindSameGuidlines();

            }

        },
        error: function (Jsondata) {
            alert("error");
        }
    });
}

function BindGuidlines() {
    $.ajax({
        type: "POST",
        url: 'KPIPreview.aspx/GetGuidlines',
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (Jsondata) {
            var result = jQuery.parseJSON(Jsondata.d);
            //alert(result);
            var tblFunction = result.TblFunction;
            var tblGuideline = result.TblGuideline;


            for (var funIndex = 0; funIndex < tblFunction.length; funIndex++) {
                var flag = 0;
                var myArray = [];
                var htmlFuncTitle = "";

                //$("#divFuncGuideline").append('<br/>');
                var funcId = "FunctionDiv" + tblFunction[funIndex].FunctionID;
                var funcTitleId = "divFuncTitle" + tblFunction[funIndex].FunctionID;
                var GuidelineMainBox = "divGuidelineMainBox" + tblFunction[funIndex].FunctionID;

                var imgId = "img" + funcTitleId;

                //$("#divFuncGuideline").append($("<div></div>").attr("id", funcId))
                //$("#" + funcId).append($("<div></div>").html(tblFunction[funIndex].FunctionTitle).attr("id", funcTitleId).addClass("funcTitle slide fontColor").prepend('<img id="' + imgId + '" src="../Images/DownArrowicon.png" style="background-color:silver;" />'));
                //$("#divFuncGuideline").append($("<div></div>").attr("id", funcId))
                //                $("#" + funcId).append($("<div></div>").html(tblFunction[funIndex].FunctionTitle).attr("id", funcTitleId).addClass("funcTitle slide fontColor").prepend('<img id="' + imgId + '" src="../Images/DownArrowicon.png" style="background-color:silver;" />'));
                $("#divFuncGuideline").append($("<h2></h2>").html(tblFunction[funIndex].FunctionTitle).attr("id", funcTitleId).addClass("accordion-header"));
                $("#divFuncGuideline").append($("<div></div>").attr("id", funcId).addClass("accordion-content"));
                $("#" + funcId).append($("<div></div").attr("id", GuidelineMainBox).addClass("accordion-main-box"));
                for (var guidelineIndex = 0; guidelineIndex < tblGuideline.length; guidelineIndex++) {

                    htmlFuncTitle = $("#" + funcTitleId).html();
                    if (tblGuideline[guidelineIndex].FunctionID == tblFunction[funIndex].FunctionID) {

                        if (flag == 0) {
                            $("#" + funcTitleId).html(htmlFuncTitle + " (" + tblGuideline[guidelineIndex].Role);
                        }

                        else {
                            $("#" + funcTitleId).html(htmlFuncTitle + ", " + tblGuideline[guidelineIndex].Role);
                        }

                        //$("#" + funcTitleId).data('one',1);
                        var GuidelineId = "divGuideline" + tblGuideline[guidelineIndex].FunctionID + "_" + tblGuideline[guidelineIndex].Role;
                        var RoleId = "divRole" + tblGuideline[guidelineIndex].FunctionID;
                        var GuidelineRoleId = "divGuidelineDescription" + tblGuideline[guidelineIndex].FunctionID + "_" + tblGuideline[guidelineIndex].Role;
                        var GuidelineText = tblGuideline[guidelineIndex].TextGuideline;
                        var UlGuidelinetxtId = "UlGuidelineText" + tblGuideline[guidelineIndex].FunctionID + "_" + tblGuideline[guidelineIndex].Role;
                        var SplitGuidelineText = GuidelineText.split("<br/>");


                        $("#" + GuidelineMainBox).append($("<div></div>").attr("id", GuidelineRoleId).addClass("accordion-sub-box"));
                        $("#" + GuidelineRoleId).append($("<div></div>").html(tblGuideline[guidelineIndex].Role).attr("id", RoleId).attr("class", "roleName").addClass("accordion-head"));
                        $("#" + GuidelineRoleId).append($("<div></div>").attr("id", GuidelineId).addClass("accordion-list"));
                        $("#" + GuidelineId).append($("<ul></ul>").attr("id", UlGuidelinetxtId));
                        if (SplitGuidelineText.length != 0) {
                            for (var index = 0; index < SplitGuidelineText.length; index++) {
                                $("#" + UlGuidelinetxtId).append($("<li></li>").html(SplitGuidelineText[index]));
                            }
                        }


                        flag = 1;
                    }

                    if (flag == 1 && (guidelineIndex == tblGuideline.length - 1)) {

                        htmlFuncTitle = $("#" + funcTitleId).html();
                        $("#" + funcTitleId).html(htmlFuncTitle + ")");
                        //alert("last");

                    }
                }
            }
            Vallenato();
        },
        error: function (result) {
            alert("error");
        }
    });
}

function BindSameGuidlines() {
    $.ajax({
        type: "POST",
        url: 'KPIPreview.aspx/GetSameGuidelines',
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (Jsondata) {
            var result = jQuery.parseJSON(Jsondata.d)
            //alert(result);
            var TitleID = "divTitle";
            //alert(result);
            var imgId = "img" + TitleID
            $("#divFuncGuideline").append($('<h2></h2>').addClass("accordion-header").text("Same across all Functions and all LEVELS (CORE, LEAD, MANAGE)"));
            $("#divFuncGuideline").append($('<div></div>').addClass("accordion-content").attr("id", "divContent"));
            $("#divContent").append($('<div></div>').addClass("accordion-main-box").attr("id", "divMainbox"));
            $("#divMainbox").append($('<div></div>').addClass("accordion-list").attr("id", "divAccordianList"));
            $("#divAccordianList").append($('<ul></ul>').attr("id", "ulGuideline"));

            var GuidelineDescription = result;

            var stringWithBr = GuidelineDescription.substring(GuidelineDescription.length - 5);

            if (stringWithBr == "<br/>") {
                GuidelineDescription = GuidelineDescription.substring(0, GuidelineDescription.lastIndexOf("<br/>"));
            }


            var newLineDesc = (GuidelineDescription.split("<br/>"));

            for (var Index = 0; Index < newLineDesc.length; Index++) {
                $("#ulGuideline").append($('<li></li>').text(newLineDesc[Index]));
            }

            //$("#divFuncGuideline").append($("<div></div>").attr("id", TitleID).html("Same across all Functions and all LEVELS (CORE, LEAD, MANAGE)").attr("class", "slide fontColor funcTitle").prepend('<img id="' + imgId + '" src="../Images/DownArrowicon.png" css="funcTitleImage" />'));

            //$("#divFuncGuideline").append($("<div></div>").attr("id", "DivDescription").html(result).attr("class", "fontColor").hide());
            Vallenato();
        },
        error: function (Jsondata) {
        }
    });

}


$(document).on('click', ".slide", function () {
    //alert("div clicked");
    var FuncId = $(this).parent().attr('id');

    var FuncTitleId = $(this).attr('id');
    //alert("title id "+FuncTitleId)
    var childID = $("#" + FuncId + ' > div:first-child').next().attr('id');

    //alert(childID);
    var ChildGuidelineId = $("#" + childID);
    //alert(ChildGuidelineId)
    if (ChildGuidelineId.is(':visible')) {
        ChildGuidelineId.slideUp();
        // Other stuff to do on slideUp
        $("#img" + FuncTitleId).attr('src', '../Images/DownArrowicon.png')
    } else {
        ChildGuidelineId.slideDown();
        $("#img" + FuncTitleId).attr('src', '../Images/IconUpArrow.png')

        // Other stuff to down on slideDown
    }

});

$(document).on('click', '#btnBack', function (e) {
    
    e.preventDefault();
    
    $.ajax({
        type: "POST",
        url: 'KPIPreview.aspx/StoreIsBackData',
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (Jsondata) {
            parent.history.back();
        },
        error: function (response) {
        }
    });
    
    return false;
    // window.location = "../KRA/AddKPIGuidelines.aspx?Back=" + true;
});


$(document).on('click', '#btnSave', function () {
    //

    var i = 0;
    var funcList = {};
    funcList.id = [];
    var KPITitle = $("#divkpi").text().trim();
    var data = null;
    var funcListId = "";

    $("input[type=checkbox]:checked").each(function () {
        //alert("I am checkbox");
        if (this.checked) {
            funcList.id.push($(this).attr("id"));

        }
        i++;
    });

    //                for (var i = 0; i < funcList.id.length; i++) {
    //                    if (i == 0) {
    //                        funcListId = "[" + funcListId + '"' + funcList.id[i]+'"';
    //                    }
    //                    else if (i == funcList.id.length - 1) {
    //                        funcListId =  funcListId +','+ '"' + funcList.id[i] + '"'+"]";
    //                    }
    //                    else {
    //                        funcListId = funcListId + ',"' + funcList.id[i] + '"';
    //                    }
    //                }


    data = { Kpititle: KPITitle, funcListId: funcList.id };

    //alert(data);

    //alert(funcListId);
    $.ajax({
        type: "POST",
        url: 'KPIPreview.aspx/InsertKPIDetail',       
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        datatype: "json",
        success: function (result) {

            alert("Record submitted successfully");
            window.location = "../KRA/KPIListing.aspx";

        },
        error: function (result) {
            alert("error");
        }
    });

});
//    else if ($("#btnSave").val() == "Update KPI") {
//        
//        alert("update");
//        var i = 0;
//        var funcList = {};
//        funcList.id = [];

//        $("input[type=checkbox]:checked").each(function () {
//            //alert("I am checkbox");
//            if (this.checked) {
//                funcList.id.push($(this).attr("id"));

//            }
//            i++;
//        });

//        data = { funcListId: funcList.id };
//        alert(data);
//        $.ajax({
//            type: "POST",
//            url: 'KRA/KPIPreview.aspx/UpdateKPIDetail',
//            //data: JSON.stringify(data),
//            data: "{}",
//            contentType: 'application/json; charset=utf-8',
//            datatype: "json",
//            success: function (result) {

//                //alert("Record submittd successfully");
//                //window.location = "../KRA/KPIListing.aspx";

//            },
//            error: function (response) {
//                alert(response.responseText);
//            }
//        });

//    }



