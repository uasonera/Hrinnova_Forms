$(document).ready(function () {
    //alert("hello");
    var FunctionLength;
    var FunctionDetail;
    var IsBack;
    var IsYesChecked;
    var IsEdit;
    var ObjFunctionGuideline;
    var ChildFunctionDetails;
    EnumRoleId = { Core: '1', Lead: '2', Manage: '3' };
    ResetControls();
    KPIStep1Detail();

    $("#chkGuidelinesSameYes").click(function () {

        $("textarea").val("").css('visibility', 'visible');
        $("#lblMessage").text("").removeClass('alert alert-warning');
        $("#chkCoreLevel").prop('checked', false);
        $("#chkLeadLevel").prop('checked', false);
        $("#chkManageLevel").prop('checked', false);

        if ($("#chkGuidelinesSameYes").is(':checked')) {
            $("#chkGuidelinesSameNo").prop('checked', false);
            $("#divFuncGuidelines").hide();
            $(".divforFunction").hide();
            $("#divRolewiseSameChkbox").hide();
            $("#divForGuidelinesSameAtAllLevels").show();  // checked
        }
        else {
            $("#divForGuidelinesSameAtAllLevels").hide();
            $("#chkGuidelinesSameNo").prop('checked', true);
            $("#divFuncGuidelines").show();
            $(".divforFunction").show();
            $("#divRolewiseSameChkbox").show();
        }
    });

    $("#chkGuidelinesSameNo").click(function () {
        $("textarea").val("").css('visibility', 'visible');
        $("#chkCoreLevel").prop('checked', false);
        $("#chkLeadLevel").prop('checked', false);
        $("#chkManageLevel").prop('checked', false);


        if ($("#chkGuidelinesSameNo").is(':checked')) {
            $("#chkGuidelinesSameYes").prop('checked', false);
            $("#divFuncGuidelines").show();
            $(".divforFunction").show();
            $("#divRolewiseSameChkbox").show();
            $("#divForGuidelinesSameAtAllLevels").hide();
            $("#divHead").hide();
            ResetControls();
            $("#divFuncGuidelines").empty();
            KPIStep2Detail(); // checked
        }
        else {
            $("#divForGuidelinesSameAtAllLevels").show();
            $("#chkGuidelinesSameYes").prop('checked', true);
            $("#divFuncGuidelines").hide();
            $(".divforFunction").hide();
            $("#divRolewiseSameChkbox").hide();
        }
    });

    //    $.ajax({
    //        url: "../KRA/AddKPIGuidelines.aspx/GetIsBackDetails",
    //        type: "post",
    //        contentType: "application/json;charset=utf-8",
    //        success: function (jsonData) {
    //            //alert(jsonData.d);
    //            var Obj = jQuery.parseJSON(jsonData.d);
    //            IsBack = Obj.IsBack;
    //            IsYesChecked = Obj.IsYesChecked;
    //            FillDataAccordingToIsBackValue(IsBack, IsYesChecked);
    //            //            if (IsBack == false) {
    //            //                alert(IsBack);
    //            //                //KPIStep2Detail();
    //            //            }
    //            //            else if (IsBack == true) {
    //            //                if (IsYesChecked == true) {
    //            //                    $("#chkGuidelinesSameYes").prop('checked', true);
    //            //                    $("#chkGuidelinesSameNo").prop('checked', false);
    //            //                    $("#chkGuidelinesSameNo").prop('checked', false);
    //            //                    $("#divFuncGuidelines").hide();
    //            //                    $(".divforFunction").hide();
    //            //                    $("#divForGuidelinesSameAtAllLevels").show();
    //            //                    GetStep2DetailForAddKPIOnBackBtnClick();
    //            //                }
    //            //            }
    //        },
    //        error: function (response) {
    //            alert(response.resonseText);
    //        }
    //    });

    function FillDataAccordingToIsBackValue(IsBack, IsYesChecked) {
        if (IsBack == false) {
            //alert(IsBack);
            KPIStep2Detail();
        }
        if (IsEdit == true) {

            //KPIStep2Detail();           
            if (IsBack == false)
                KPIEditStep2Detail();
        }
        //else if (IsBack == true) {
        if (IsBack == true) {
            if (IsYesChecked == true) {
                $("#chkGuidelinesSameYes").prop('checked', true);
                $("#chkGuidelinesSameNo").prop('checked', false);
                $("#chkGuidelinesSameNo").prop('checked', false);
                $("#divFuncGuidelines").hide();
                $(".divforFunction").hide();
                $("#divRolewiseSameChkbox").hide();
                $("#divForGuidelinesSameAtAllLevels").show();
                GetStep2DetailOnBtnBackAndYesChecked();
            }
            else if (IsYesChecked == false) {

                $("#chkGuidelinesSameNo").prop('checked', true);
                $("#chkGuidelinesSameYes").prop('checked', false);
                $("#divFuncGuidelines").show();
                $(".divforFunction").show();
                $("#divRolewiseSameChkbox").show();
                $("#divForGuidelinesSameAtAllLevels").hide();
                KPIStep2Detail(IsBack, IsYesChecked);

            }
        }
    }



    //        if (IsBack == false) {
    //            alert(IsBack);
    //            PageLoadMethod();
    //        }
    function KPIStep1Detail() {
        $("#divForGuidelinesSameAtAllLevels").hide();
        $.ajax({
            url: "../KRA/AddKPIguidelines.aspx/GetKPIStep1Detail",
            type: "post",
            contentType: "application/json; charset=utf-8",
            success: function (jsonData) {
                // alert("success");
                //alert(jsonData.d);
                //
                var Obj = jQuery.parseJSON(jsonData.d);
                var ParentFunctionDetails = Obj.KPIParFunction;
                ChildFunctionDetails = Obj.KPIChildFunction;

                FunctionLength = Obj.KPIFunctionDetails.length;                
                FunctionDetail = Obj.KPIFunctionDetails;

                var ObjBGColor = "#" + Obj.ObjectiveDetail[0].ObjectiveBGColor;
                var KRABGColor = "#" + Obj.ObjectiveDetail[0].KRABGColor;
                //alert(ObjBGColor);
                $("#lblKPITitle").text(Obj.KPITitle);

                $("#lblObjectiveTitle").text(Obj.ObjectiveDetail[0].ObjectiveTitle).addClass("boxtext1").css("background-color", ObjBGColor);
                $("#lblFunctions").text(Obj.KPIFunctions);
                $("#lblKRATitle").text(Obj.KRAObjDetail).addClass("boxtext1").css("background-color", KRABGColor);
                //alert(Obj.KPIFunctionDetails);
                //FunctionLength = Obj.KPIFunctionDetails.length;


                //alert(Obj.KPIFunctionDetails[0].FunctionID);
                //FunctionDetail = Obj.KPIFunctionDetails;


                //            if (Obj.KPIFunctionDetails[0].FunctionID == 0) {
                //                FunctionString = Obj.KPIFunctionDetails[0].ParentFunctionTitle + ",";
                //            }

                /*  var FunctionString = Obj.KPIFunctionDetails[0].ParentFunctionTitle + "(" + Obj.KPIFunctionDetails[0].FunctionTitle;

                for (var FunctionIndex = 1; FunctionIndex < FunctionLength; FunctionIndex++) {
                var flag = 0;

                for (var Index = 0; Index < FunctionIndex; Index++) {
                if (Obj.KPIFunctionDetails[FunctionIndex].ParentFunctionID == Obj.KPIFunctionDetails[Index].ParentFunctionID) {
                flag = 1;
                }
                }
                if (flag == 1) {
                FunctionString = FunctionString + ", " + Obj.KPIFunctionDetails[FunctionIndex].FunctionTitle;
                }
                else if (flag == 0) {
                FunctionString = FunctionString + "), " + Obj.KPIFunctionDetails[FunctionIndex].ParentFunctionTitle + "(" + Obj.KPIFunctionDetails[FunctionIndex].FunctionTitle;
                }
                flag = 0;
                if (FunctionIndex == (FunctionLength - 1)) {
                FunctionString = FunctionString + ")";
                }
                }
                if (FunctionLength == 1) {
                FunctionString = FunctionString + ")";
                }*/


                var ParFunctionLength = ParentFunctionDetails.length;
                var FunctionString = "";
                var ParentID = "";
                //start

                for (var ParentfuncIndex = 0; ParentfuncIndex < ParFunctionLength; ParentfuncIndex++) {
                    if (FunctionString.length > 0) {
                        FunctionString = FunctionString + " ,";
                    }

                    FunctionString = FunctionString + ParentFunctionDetails[ParentfuncIndex].ParentFunctionTitle;
                    ParentID = ParentFunctionDetails[ParentfuncIndex].ParentFunID;

                    FunctionString = FunctionString + " (";
                    for (var childfunIndex = 0; childfunIndex < ChildFunctionDetails.length; childfunIndex++) {

                        if (ParentID == ChildFunctionDetails[childfunIndex].ParentFunID) {
                            FunctionString = FunctionString + ChildFunctionDetails[childfunIndex].FunctionTitle + ",";
                        }
                    }

                    FunctionString = FunctionString.substr(0, FunctionString.length - 1) + ") ";
                }
                //end


                $("#lblFunctions").text(FunctionString);
                //                KPIStep2Detail();

                IsBack = Obj.IsBackDetail.IsBack;
                IsYesChecked = Obj.IsBackDetail.IsYesChecked;
                IsEdit = Obj.IsBackDetail.IsEdit;
                //                alert(IsBack + " " + IsYesChecked);
                FillDataAccordingToIsBackValue(IsBack, IsYesChecked);
            },
            error: function (response) {
                alert(response.responseText);

            }
        });
    }

    function KPIStep2Detail() {

        for (var FunctionIndex = 0; FunctionIndex < ChildFunctionDetails.length; FunctionIndex++) {
            var FunctionID = "";
            if (ChildFunctionDetails[FunctionIndex].FunctionID != 0)
                FunctionID = ChildFunctionDetails[FunctionIndex].FunctionID;
            else
                FunctionID = ChildFunctionDetails[FunctionIndex].ParentFunID;

            
            var FunctionTitle = ChildFunctionDetails[FunctionIndex].FunctionTitle;
            //alert(FunctionTitle);
            $("#divMainbox1").append($("<div></div>").attr("id", "divFuncGuidelines"));
            if (FunctionID == 0) {
                FunctionID = ChildFunctionDetails[FunctionIndex].ParentFunctionID;
                //$("#divFuncGuidelines").append($("<span></span>").text(FunctionDetail[FunctionIndex].ParentFunctionTitle).css("background-color", "silver").addClass("divforFunction"));
                $("#divFuncGuidelines").append($("<div></div>").addClass("addkpi-main-box2-head").html('<strong>' + ChildFunctionDetails[FunctionIndex].ParentFunctionTitle + '</strong>'));
            }
            else {
                //$("#divFuncGuidelines").append($("<span></span>").text(FunctionTitle).css("background-color", "silver").addClass("divforFunction"));
                $("#divFuncGuidelines").append($("<div></div>").html('<strong>' + FunctionTitle + '</strong>').addClass("addkpi-main-box2-head"));
            }

            //            $("#divFuncGuidelines").append($("<div></div>").attr("id", "div_" + FunctionID).addClass("divforFunction"));
            //            $("#div_" + FunctionID).append($("<div></div>").addClass("LeftDiv").attr("id", "CoreDiv_1_" + FunctionID));
            //            $("#div_" + FunctionID).append($("<div></div>").addClass("CenterDiv").attr("id", "LeadDiv_2_" + FunctionID));
            //            $("#div_" + FunctionID).append($("<div></div>").addClass("RightDiv").attr("id", "ManageDiv_3_" + FunctionID));

            $("#divFuncGuidelines").append($("<div></div>").addClass("addkpi-main-box2").attr("id", "divMainbox2_" + FunctionID));
            $("#divMainbox2_" + FunctionID).append($("<div style='float:left;width:33%;'></div>").attr("id", "DivKpiCore" + FunctionID));
            $("#DivKpiCore" + FunctionID).append($("<input type='checkbox'  id='chkKPI_1_" + FunctionID + "'>").addClass("RoleApplicability")).append($('<span></span>').html("KPI Applicable For Core"));
            $("#divMainbox2_" + FunctionID).append($("<div style='float:left;width:33%;margin-left: -12px;'></div>").attr("id", "DivKpiLead" + FunctionID));
            $("#DivKpiLead" + FunctionID).append($("<input type='checkbox' id='chkKPI_2_" + FunctionID + "' >").addClass("RoleApplicability")).append($('<span></span>').html("KPI Applicable For Lead"));
            $("#divMainbox2_" + FunctionID).append($("<div></div>").attr("id", "DivKpiManage" + FunctionID));
            $("#DivKpiManage" + FunctionID).append($("<input type='checkbox' id='chkKPI_3_" + FunctionID + "' >").addClass("RoleApplicability")).append($('<span></span>').html("KPI Applicable For Manage"));

            $("#divMainbox2_" + FunctionID).append($("<div></div>").addClass("addkpi-subbox").attr("id", "CoreDiv_1_" + FunctionID));
            //$("#divMainbox2_" + FunctionID).append($("<div></div>").attr("id", "DivKpiLead" + FunctionID).addClass("CenterKpiChkBox"));

            $("#divMainbox2_" + FunctionID).append($("<div></div>").addClass("addkpi-subbox").attr("id", "LeadDiv_2_" + FunctionID));


            $("#divMainbox2_" + FunctionID).append($("<div></div>").addClass("addkpi-subbox addkpi-subbox-last").attr("id", "ManageDiv_3_" + FunctionID));

            $("#CoreDiv_1_" + FunctionID).append($("<textarea></textarea>").attr("id", "TxtArea_" + 1 + "_" + FunctionID).attr("disabled", "disabled").addClass("addkpi-textarea"));
            $("#LeadDiv_2_" + FunctionID).append($("<textarea></textarea>").attr("id", "TxtArea_" + 2 + "_" + FunctionID).attr("disabled", "disabled").addClass("addkpi-textarea"));
            $("#ManageDiv_3_" + FunctionID).append($("<textarea></textarea>").attr("id", "TxtArea_" + 3 + "_" + FunctionID).attr("disabled", "disabled").addClass("addkpi-textarea"));
        }

    }

    function KPIStep2Detail(IsBack, IsYesChecked) {
        //alert("KPIStep2DetailIsBack");

        for (var FunctionIndex = 0; FunctionIndex < FunctionLength; FunctionIndex++) {

            var FunctionID = FunctionDetail[FunctionIndex].FunctionID;            
            var FunctionTitle = FunctionDetail[FunctionIndex].FunctionTitle;
            
            $("#divMainbox1").append($("<div></div>").attr("id", "divFuncGuidelines"));
            if (FunctionID == 0) {
                FunctionID = FunctionDetail[FunctionIndex].ParentFunctionID;
                //$("#divFuncGuidelines").append($("<span></span>").text(FunctionDetail[FunctionIndex].ParentFunctionTitle).css("background-color", "silver").addClass("divforFunction"));
                $("#divFuncGuidelines").append($("<div></div>").addClass("addkpi-main-box2-head").html('<strong>' + FunctionDetail[FunctionIndex].ParentFunctionTitle + '</strong>'));
            }
            else {
                //$("#divFuncGuidelines").append($("<span></span>").text(FunctionTitle).css("background-color", "silver").addClass("divforFunction"));
                $("#divFuncGuidelines").append($("<div></div>").html('<strong>' + FunctionTitle + '</strong>').addClass("addkpi-main-box2-head"));
            }

            //            $("#divFuncGuidelines").append($("<div></div>").attr("id", "div_" + FunctionID).addClass("divforFunction"));
            //            $("#div_" + FunctionID).append($("<div></div>").addClass("LeftDiv").attr("id", "CoreDiv_1_" + FunctionID));
            //            $("#div_" + FunctionID).append($("<div></div>").addClass("CenterDiv").attr("id", "LeadDiv_2_" + FunctionID));
            //            $("#div_" + FunctionID).append($("<div></div>").addClass("RightDiv").attr("id", "ManageDiv_3_" + FunctionID));

            $("#divFuncGuidelines").append($("<div></div>").addClass("addkpi-main-box2").attr("id", "divMainbox2_" + FunctionID));
            $("#divMainbox2_" + FunctionID).append($("<div style='float:left;width:33%;'></div>").attr("id", "DivKpiCore" + FunctionID));
            $("#DivKpiCore" + FunctionID).append($("<input type='checkbox'  id='chkKPI_1_" + FunctionID + "'>").addClass("RoleApplicability")).append($('<span></span>').html("KPI Applicable For Core"));
            $("#divMainbox2_" + FunctionID).append($("<div style='float:left;width:33%;margin-left: -12px;'></div>").attr("id", "DivKpiLead" + FunctionID));
            $("#DivKpiLead" + FunctionID).append($("<input type='checkbox' id='chkKPI_2_" + FunctionID + "' >").addClass("RoleApplicability")).append($('<span></span>').html("KPI Applicable For Lead"));
            $("#divMainbox2_" + FunctionID).append($("<div></div>").attr("id", "DivKpiManage" + FunctionID));
            $("#DivKpiManage" + FunctionID).append($("<input type='checkbox' id='chkKPI_3_" + FunctionID + "' >").addClass("RoleApplicability")).append($('<span></span>').html("KPI Applicable For Manage"));

            $("#divMainbox2_" + FunctionID).append($("<div></div>").addClass("addkpi-subbox").attr("id", "CoreDiv_1_" + FunctionID));
            //$("#divMainbox2_" + FunctionID).append($("<div></div>").attr("id", "DivKpiLead" + FunctionID).addClass("CenterKpiChkBox"));

            $("#divMainbox2_" + FunctionID).append($("<div></div>").addClass("addkpi-subbox").attr("id", "LeadDiv_2_" + FunctionID));


            $("#divMainbox2_" + FunctionID).append($("<div></div>").addClass("addkpi-subbox addkpi-subbox-last").attr("id", "ManageDiv_3_" + FunctionID));

            $("#CoreDiv_1_" + FunctionID).append($("<textarea></textarea>").attr("id", "TxtArea_" + 1 + "_" + FunctionID).attr("disabled", "disabled").addClass("addkpi-textarea"));
            $("#LeadDiv_2_" + FunctionID).append($("<textarea></textarea>").attr("id", "TxtArea_" + 2 + "_" + FunctionID).attr("disabled", "disabled").addClass("addkpi-textarea"));
            $("#ManageDiv_3_" + FunctionID).append($("<textarea></textarea>").attr("id", "TxtArea_" + 3 + "_" + FunctionID).attr("disabled", "disabled").addClass("addkpi-textarea"));
        }

        if (IsBack == true && IsYesChecked == false) {
            GetStep2DetailOnBtnBackAndNoChecked();
        }
    }


    $("#chkCoreLevel").click(function () {

        if ($("#chkCoreLevel").is(':Checked')) {
            for (var FunctionIndex = 0; FunctionIndex < FunctionLength; FunctionIndex++) {
                var FunctionID = FunctionDetail[FunctionIndex].FunctionID;
                if (FunctionID == 0) {
                    FunctionID = FunctionDetail[FunctionIndex].ParentFunctionID;
                }
                if (FunctionIndex != 0) {
                    $("#TxtArea_" + 1 + "_" + FunctionID).css('visibility', 'hidden').val("");
                    $("#chkKPI_1_" + FunctionID).prop("checked", true).attr('disabled', true);
                }
                else if (FunctionIndex == 0) {
                    $("#chkKPI_1_" + FunctionID).prop("checked", true).attr('disabled', true);
                    $("#TxtArea_" + 1 + "_" + FunctionID).attr('disabled', false);
                }
            }
        }
        else {
            for (var FunctionIndex = 0; FunctionIndex < FunctionLength; FunctionIndex++) {
                var FunctionID = FunctionDetail[FunctionIndex].FunctionID;
                if (FunctionID == 0) {
                    FunctionID = FunctionDetail[FunctionIndex].ParentFunctionID;
                }
                if (FunctionIndex != 0) {
                    $("#TxtArea_" + 1 + "_" + FunctionID).css('visibility', 'visible').val("");
                    $("#chkKPI_1_" + FunctionID).prop("checked", false).attr('disabled', false);
                }
                else if (FunctionIndex == 0) {
                    $("#chkKPI_1_" + FunctionID).prop("checked", false).attr('disabled', false);
                    $("#TxtArea_" + 1 + "_" + FunctionID).attr('disabled', true).val("");
                }
            }
        }
    });

    $("#chkLeadLevel").click(function () {
        if ($("#chkLeadLevel").is(':Checked')) {
            for (var FunctionIndex = 0; FunctionIndex < FunctionLength; FunctionIndex++) {
                var FunctionID = FunctionDetail[FunctionIndex].FunctionID;
                if (FunctionID == 0) {
                    FunctionID = FunctionDetail[FunctionIndex].ParentFunctionID;
                }
                if (FunctionIndex != 0) {
                    $("#TxtArea_" + 2 + "_" + FunctionID).css('visibility', 'hidden').val("");
                    $("#chkKPI_2_" + FunctionID).prop("checked", true).attr('disabled', true);
                }
                else if (FunctionIndex == 0) {
                    $("#chkKPI_2_" + FunctionID).prop("checked", true).attr('disabled', true);
                    $("#TxtArea_" + 2 + "_" + FunctionID).attr('disabled', false);
                }
            }
        }
        else {
            for (var FunctionIndex = 0; FunctionIndex < FunctionLength; FunctionIndex++) {
                var FunctionID = FunctionDetail[FunctionIndex].FunctionID;
                if (FunctionID == 0) {
                    FunctionID = FunctionDetail[FunctionIndex].ParentFunctionID;
                }
                if (FunctionIndex != 0) {
                    $("#TxtArea_" + 2 + "_" + FunctionID).css('visibility', 'visible').val("");
                    $("#chkKPI_2_" + FunctionID).prop("checked", false).attr("disabled", false);
                }
                else if (FunctionIndex == 0)
                    $("#chkKPI_2_" + FunctionID).prop("checked", false).attr("disabled", false);
                $("#TxtArea_" + 2 + "_" + FunctionID).attr('disabled', true).val("");
            }
        }
    });


    $("#chkManageLevel").click(function () {
        if ($("#chkManageLevel").is(':Checked')) {

            for (var FunctionIndex = 0; FunctionIndex < FunctionLength; FunctionIndex++) {
                var FunctionID = FunctionDetail[FunctionIndex].FunctionID;
                if (FunctionID == 0) {
                    FunctionID = FunctionDetail[FunctionIndex].ParentFunctionID;
                }
                if (FunctionIndex != 0) {
                    $("#TxtArea_" + 3 + "_" + FunctionID).css('visibility', 'hidden').val("");
                    $("#chkKPI_3_" + FunctionID).prop("checked", true).attr("disabled", true);
                }
                else if (FunctionIndex == 0) {
                    $("#chkKPI_3_" + FunctionID).prop("checked", true).attr("disabled", true);
                    $("#TxtArea_" + 3 + "_" + FunctionID).attr('disabled', false);
                }
            }
        }
        else {
            for (var FunctionIndex = 0; FunctionIndex < FunctionLength; FunctionIndex++) {
                var FunctionID = FunctionDetail[FunctionIndex].FunctionID;
                if (FunctionID == 0) {
                    FunctionID = FunctionDetail[FunctionIndex].ParentFunctionID;
                }
                if (FunctionIndex != 0) {
                    $("#TxtArea_" + 3 + "_" + FunctionID).css('visibility', 'visible').val("");
                    $("#chkKPI_3_" + FunctionID).prop("checked", false).attr("disabled", false);
                }
                else if (FunctionIndex == 0) {
                    $("#chkKPI_3_" + FunctionID).prop("checked", false).attr("disabled", false);
                    $("#TxtArea_" + 3 + "_" + FunctionID).attr('disabled', true).val("");
                }
            }
        }
    });

    $(document).on('click', '.RoleApplicability', function () {


        var chkboxId = $(this).attr("id");
        var splitedId = (chkboxId).split('_');
        var FunctionId = splitedId[2];
        var RoleId = splitedId[1];
        if ($(this).is(":checked")) {
            $("#TxtArea_" + RoleId + "_" + FunctionId).attr('disabled', false);
        }
        else {
            $("#TxtArea_" + RoleId + "_" + FunctionId).val("");
            $("#TxtArea_" + RoleId + "_" + FunctionId).attr('disabled', true);
        }

    })

    $("#btnNext").click(function (e) {
        e.preventDefault();
        //
        //alert("I am Next button");

        if ($("#chkGuidelinesSameNo").is(':Checked')) {
            $("#lblMessage").text("").removeClass('alert alert-warning');
            var FunctionString = "";
            var ValidateTextAreaID = "";
            var TextAreaIDFlag = 0;
            var ValidateKPIRolechkID = "";

            var RequiredFlag = false;

            //
            for (var FunctionIndex = 0; FunctionIndex < FunctionLength; FunctionIndex++) {
                var FunctionID = FunctionDetail[FunctionIndex].FunctionID;
                var FunctionTitle = FunctionDetail[FunctionIndex].FunctionTitle;
                var IsKPIApplicableCore = false;
                var IsKPIApplicableLead = false;
                var IsKPIApplicableManage = false;
                var ValidateFuncTxtAreaId = "";
                var FunctionGuidelineFlag = 0;
                if (FunctionID == 0) {
                    FunctionID = FunctionDetail[FunctionIndex].ParentFunctionID;
                    FunctionTitle = FunctionDetail[FunctionIndex].ParentFunctionTitle;
                }

                var string = "";

                for (var RoleLevels = 1; RoleLevels <= 3; RoleLevels++) {

                    var textAreaID = "#" + "TxtArea_" + RoleLevels + "_" + FunctionID;
                    //alert(textAreaID);


                    ValidateTextAreaID = ValidateTextAreaID + textAreaID;

                    ValidateFuncTxtAreaId = ValidateFuncTxtAreaId + textAreaID;


                    //alert(ValidateFuncTxtAreaId);

                    var RoleKPIchkID = "#" + "chkKPI_" + RoleLevels + "_" + FunctionID;
                    ValidateKPIRolechkID = ValidateKPIRolechkID + RoleKPIchkID;

                    var textAreaText = $(textAreaID).val();
                    var StringWithBR = ReplaceNWithBR(textAreaText);
                    //alert(StringwithBR);
                    if (StringWithBR != "") {
                        textAreaText = StringWithBR;
                    }

                    if (RoleLevels == 1) {
                        if ($("#chkCoreLevel").is(':Checked')) {
                            textAreaID = "#" + "TxtArea_" + 1 + "_" + FunctionDetail[0].FunctionID;
                            //ValidateTextAreaID = ValidateTextAreaID + textAreaID
                            if (FunctionDetail[0].FunctionID == 0) {
                                textAreaID = "#" + "TxtArea_" + 1 + "_" + FunctionDetail[0].ParentFunctionID;
                            }


                            textAreaText = $(textAreaID).val();

                            var StringWithBR = ReplaceNWithBR(textAreaText);
                            //alert(StringwithBR);
                            if (StringWithBR != "") {
                                textAreaText = StringWithBR;
                            }
                        }
                        if ($("#chkKPI_1_" + FunctionID).is(':checked')) {
                            IsKPIApplicableCore = true;
                        }
                        string = string + "[" + '{"TextAreaGuidelines":"' + textAreaText + '","TextAreaID":"' + textAreaID + '","RoleLevel":' + RoleLevels + '}' + ",";
                        //ValidateTextAreaID = ValidateTextAreaID + textAreaID;
                    }
                    if (RoleLevels == 2) {
                        if ($("#chkLeadLevel").is(':Checked')) {
                            textAreaID = "#" + "TxtArea_" + 2 + "_" + FunctionDetail[0].FunctionID;
                            if (FunctionDetail[0].FunctionID == 0) {
                                textAreaID = "#" + "TxtArea_" + 2 + "_" + FunctionDetail[0].ParentFunctionID;
                            }

                            textAreaText = $(textAreaID).val();
                            var StringWithBR = ReplaceNWithBR(textAreaText);
                            //alert(StringwithBR);
                            if (StringWithBR != "") {
                                textAreaText = StringWithBR;
                            }
                        }
                        if ($("#chkKPI_2_" + FunctionID).is(':checked')) {
                            IsKPIApplicableLead = true;
                        }
                        string = string + '{"TextAreaGuidelines":"' + textAreaText + '","TextAreaID":"' + textAreaID + '","RoleLevel":' + RoleLevels + '}' + ",";
                    }
                    if (RoleLevels == 3) {
                        if ($("#chkManageLevel").is(':Checked')) {
                            textAreaID = "#" + "TxtArea_" + 3 + "_" + FunctionDetail[0].FunctionID;
                            if (FunctionDetail[0].FunctionID == 0) {
                                textAreaID = "#" + "TxtArea_" + 3 + "_" + FunctionDetail[0].ParentFunctionID;
                            }

                            textAreaText = $(textAreaID).val();
                            var StringWithBR = ReplaceNWithBR(textAreaText);
                            //alert(StringwithBR);
                            if (StringWithBR != "") {
                                textAreaText = StringWithBR;
                            }
                        }
                        if ($("#chkKPI_3_" + FunctionID).is(':checked')) {
                            IsKPIApplicableManage = true;
                        }
                        string = string + '{"TextAreaGuidelines":"' + textAreaText + '","TextAreaID":"' + textAreaID + '","RoleLevel":' + RoleLevels + '}' + "]";
                    }
                }
                //alert(string);
                if (FunctionLength == 1) {
                    FunctionString = FunctionString + "[" + '{"FunctionID":"' + FunctionID + '","FunctionTitle":"' + FunctionTitle + '", "IsKPIApplicable_Core":' + IsKPIApplicableCore + ',"IsKPIApplicable_Lead":' + IsKPIApplicableLead + ',"IsKPIApplicable_Manage":' + IsKPIApplicableManage + ',"FunctionGuidelines":' + string + '}' + "]";
                }
                else {
                    if (FunctionIndex == 0) {
                        FunctionString = FunctionString + "[" + '{"FunctionID":"' + FunctionID + '","FunctionTitle":"' + FunctionTitle + '", "IsKPIApplicable_Core":' + IsKPIApplicableCore + ',"IsKPIApplicable_Lead":' + IsKPIApplicableLead + ',"IsKPIApplicable_Manage":' + IsKPIApplicableManage + ',"FunctionGuidelines":' + string + '}' + ",";
                    }
                    else if (FunctionIndex == (FunctionLength - 1)) {
                        FunctionString = FunctionString + '{"FunctionID":"' + FunctionID + '","FunctionTitle":"' + FunctionTitle + '", "IsKPIApplicable_Core":' + IsKPIApplicableCore + ',"IsKPIApplicable_Lead":' + IsKPIApplicableLead + ',"IsKPIApplicable_Manage":' + IsKPIApplicableManage + ',"FunctionGuidelines":' + string + '}' + "]";
                    }
                    else {
                        FunctionString = FunctionString + '{"FunctionID":"' + FunctionID + '","FunctionTitle":"' + FunctionTitle + '", "IsKPIApplicable_Core":' + IsKPIApplicableCore + ',"IsKPIApplicable_Lead":' + IsKPIApplicableLead + ',"IsKPIApplicable_Manage":' + IsKPIApplicableManage + ',"FunctionGuidelines":' + string + '}' + ",";
                    }
                }

                var splitValidateFunTtxtAreaId = ValidateFuncTxtAreaId.split('#');


                for (var index = 0; index < splitValidateFunTtxtAreaId.length; index++) {
                    if (index != 0) {
                        if (!($("#" + splitValidateFunTtxtAreaId[index]).css('visibility') == 'hidden')) {
                            var GuidelineVal = $("#" + splitValidateFunTtxtAreaId[index]).val();
                            if (!(GuidelineVal == "")) {

                                FunctionGuidelineFlag = 1;
                            }

                        }
                        else {
                            FunctionGuidelineFlag = 1;
                        }
                    }

                    //                    else if (index == 1) {
                    //                        var value = $("#" + splitValidateFunTtxtAreaId[index]).val();
                    //                        alert(value);
                    //                        if (!(value == "")) {
                    //                            alert("hello");
                    //                            FunctionGuidelineFlag = 1;
                    //                        }
                    //                    }


                }
                if (FunctionGuidelineFlag == 0) {
                    RequiredFlag = true;
                }
            }


            var IsCoreLevelChecked = $("#chkCoreLevel").is(':Checked');
            var IsLeadLevelChecked = $("#chkLeadLevel").is(':Checked');
            var IsManageLevelChecked = $("#chkManageLevel").is(':Checked');

            var CheckKpiLevels = '{"IsCoreLevelChecked":' + IsCoreLevelChecked + ',"IsLeadLevelChecked":' + IsLeadLevelChecked + ',"IsManageLevelChecked":' + IsManageLevelChecked + '}'
            //if ($("#TextArea_3_107").not('[type="hidden"]')) {

            var splitTextAreaID = ValidateTextAreaID.split('#');
            var splitRolechkID = ValidateKPIRolechkID.split("#");

            //            if ($("#TxtArea_1_31").css('visibility') == 'hidden') {                
            //                alert("hidden");
            //            }
            for (var splitIdIndex = 1; splitIdIndex < splitTextAreaID.length; splitIdIndex++) {


                if (!($("#" + splitTextAreaID[splitIdIndex]).css('visibility') == 'hidden')) {

                    if (($("#" + splitRolechkID[splitIdIndex]).is(":checked"))) {
                        if ($("#" + splitTextAreaID[splitIdIndex]).val() == "") {

                            TextAreaIDFlag = 1;
                        }
                    }
                }
            }


            if (TextAreaIDFlag == 0 && RequiredFlag == 0) {

                if (IsEdit == true) {

                    $.ajax({
                        url: "AddKPIGuidelines.aspx/StoreEditedDiffGuidelines",
                        type: "post",
                        contentType: "application/json;charset=utf-8",
                        data: '{"CheckKpiLevels":' + CheckKpiLevels + ',"Guidelines":' + FunctionString + '}',
                        dataType: "json",
                        success: function (Data) {
                            //alert(Data);
                            var Result = jQuery.parseJSON(Data.d);
                            var Edit = Result.IsEdit;
                            window.location = "../KRA/KPIPreview.aspx?IsEdit=" + Edit;

                        },
                        error: function (response) {
                            alert(response.responseText);

                        }
                    });
                }
                else {
                    $.ajax({
                        url: "../KRA/AddKPIGuidelines.aspx/GetGuidelinesDetail",
                        type: "post",
                        contentType: "application/json;charset=utf-8",
                        data: '{"CheckKpiLevels":' + CheckKpiLevels + ',"Guidelines":' + FunctionString + '}',
                        dataType: "json",
                        success: function (Data) {
                            // alert("success");
                            var Result = jQuery.parseJSON(Data.d);
                            //alert(Result);
                            // var Edit = Result.IsEdit;
                            //alert(IsEdit);
                            //if (IsEdit == false) {
                            window.location = "../KRA/KPIPreview.aspx";
                            //                            }
                            //                            else {
                            //                                window.location = "../KRA/KPIPreview.aspx?IsEdit=" + Edit;
                            //                            }
                        },
                        error: function (response) {
                            alert(response.responseText);

                        }
                    });
                }
            }
            else {
                $("#lblMessage").text("Please insert atleast one guideline for each function and where KPI Role Level is checked").addClass("yellow-error");
            }
        }
        else if ($("#chkGuidelinesSameYes").is(':Checked')) {
            var GuidelineDescription = $("#txtAreaGuideline").val();
            var SplitGuideline = "";
            //alert(GuidelineDescription);
            var SplitGuidelineDescription = GuidelineDescription.split('\n');
            //            alert(SplitGuidelineDescription);
            //            alert(SplitGuidelineDescription.length);
            if (SplitGuidelineDescription.length != 0) {
                for (var Index = 0; Index < SplitGuidelineDescription.length; Index++) {


                    if (Index == (SplitGuidelineDescription.length - 1)) {
                        SplitGuideline = SplitGuideline + SplitGuidelineDescription[Index];
                    }
                    else {
                        SplitGuideline = SplitGuideline + SplitGuidelineDescription[Index] + "<br/>";
                    }
                }
                //alert(SplitGuideline);
                GuidelineDescription = SplitGuideline;
            }

            if (GuidelineDescription != "") {
                $.ajax({
                    url: "../KRA/AddKPIGuidelines.aspx/GuidelinesSameForAllLevels",
                    type: "post",
                    contentType: "application/json;Charset=utf-8",
                    data: '{"GuidelinesDetail": {"IsGuidelinesSameForAllLevels":true,"GuidelineDescription":"' + GuidelineDescription + '"}}',
                    success: function (Data) {
                        //var Result = jQuery.parseJSON(Data.d);
                        var Result = Data.d;

                        var Edit = Result[0];

                        var EncryptedEdit = Result[1];

                        if (Edit == false) {
                            window.location = "../KRA/KPIPreview.aspx";
                        }
                        else {
                            window.location = "../KRA/KPIPreview.aspx?IsEdit=" + EncryptedEdit;
                        }
                    },
                    error: function (response) {
                        alert(response.responseText);

                    }

                });
            }
            else {
                //message
                $("#lblMessage").text("Please insert all guidelines").addClass("yellow-error");
            }
        }

    });

    $("#btnCancel").click(function (e) {
        e.preventDefault();
        $("#divFuncGuidelines").empty();
        $(".divforFunction").show();
        $("#divFuncGuidelines").show();
        $("#divForGuidelinesSameAtAllLevels").hide();
        ResetControls();
        KPIStep2Detail();
        window.location = "../KRA/KPIListing.aspx";
    });

    $("#btnBack").click(function (e) {
        e.preventDefault();
        //alert("I am Back");
        $.ajax({
            type: "POST",
            url: 'AddKPIGuidelines.aspx/EncryptData',
            data: "{}",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (result) {

                var str = jQuery.parseJSON(result.d);

                window.location = "../KRA/AddKPI.aspx?Back=" + str.IsBack + "&&Edit=" + str.IsEdit;

            },
            error: function (result) { alert(result); }
        });


    });

    function ResetControls() {
        $("#chkGuidelinesSameNo").prop('checked', true);
        $("#chkGuidelinesSameYes").prop('checked', false);
        $("#chkCoreLevel").prop('checked', false);
        $("#chkLeadLevel").prop('checked', false);
        $("#chkManageLevel").prop('checked', false);
        $("textarea").val("").css('visibility', 'visible');
    }


    function ReplaceNWithBR(textAreaText) {
        var SplitGuidelineDescription = textAreaText.split('\n');
        var StringWithBR = "";

        if (SplitGuidelineDescription.length != 0) {
            for (var Index = 0; Index < SplitGuidelineDescription.length; Index++) {


                if (Index == (SplitGuidelineDescription.length - 1)) {
                    StringWithBR = StringWithBR + SplitGuidelineDescription[Index];
                }
                else {
                    StringWithBR = StringWithBR + SplitGuidelineDescription[Index] + "<br/>";
                }
            }
        }
        return StringWithBR;
    }
});
function KPIEditStep2Detail() {
    $.ajax({
        url: "../KRA/AddKPIGuidelines.aspx/EditGuidelineSameAcrossAllLevel",
        type: "post",
        contentType: "application/json;charset=utf-8",
        data: '{}',
        dataType: "json",
        success: function (Data) {
            var IsSameGuideline = Data.d;

            if (IsSameGuideline == "True") {


                $("#chkGuidelinesSameYes").prop('checked', true);
                $("#chkGuidelinesSameNo").prop('checked', false);
                $("#chkGuidelinesSameNo").prop('checked', false);
                $("#divFuncGuidelines").hide();
                $(".divforFunction").hide();
                $("#divRolewiseSameChkbox").hide();
                $("#divForGuidelinesSameAtAllLevels").show();
                $("#chkGuidelinesSameYes").attr("disabled", true);
                $("#chkGuidelinesSameNo").attr("disabled", true);
                KPIEditSameGuidelineDetail();
            }
            else {

                KPIEditDiffGuidelineDetail();

            }
        },
        error: function (response) {
            alert(response.responseText);
        }
    });

}

function KPIEditSameGuidelineDetail() {
    $.ajax({
        url: "../KRA/AddKPIGuidelines.aspx/GetSameEditedGuidelineDetails",
        type: "post",
        contentType: "application/json;charset=utf-8",
        data: '{}',
        dataType: "json",
        success: function (Data) {
            var str = jQuery.parseJSON(Data.d);

            //str = str.substr(1, (str.length - 2));

            var regex = /<br\s*[\/]?>/gi;
            $("#txtAreaGuideline").val(str.replace(regex, "\n"));

        },
        error: function (response) {
            alert(response.responseText);

        }
    });
}

function KPIEditDiffGuidelineDetail() {
    $.ajax({
        url: "../KRA/AddKPIGuidelines.aspx/GetEditGuidelinesDetais",
        type: "post",
        contentType: "application/json;charset=utf-8",
        data: '{}',
        dataType: "json",
        success: function (Data) {
            ObjFunctionGuideline = jQuery.parseJSON(Data.d);


            for (var Index = 0; Index < ObjFunctionGuideline.length; Index++) {
                var ObjGuideline = ObjFunctionGuideline[Index].FunctionGuidelines;

                var FunctionId = ObjFunctionGuideline[Index].FunctionID;
                //var CoreApplicability = ObjGuideline.CoreApplicability;
                //var LeadApplicability = ObjGuideline.LeadApplicability;
                //var ManageApplicability = ObjGuideline.ManageApplicability;
                //var LevelID = ObjGuideline[Index].RoleLevel;
                var chkCoreRoleId = "chkKPI_" + EnumRoleId.Core + "_" + FunctionId;
                var chkLeadRoleId = "chkKPI_" + EnumRoleId.Lead + "_" + FunctionId;
                var chkManageRoleId = "chkKPI_" + EnumRoleId.Manage + "_" + FunctionId;
                var CoretxtAreaId = "TxtArea_" + EnumRoleId.Core + "_" + FunctionId;
                var LeadtxtAreaId = "TxtArea_" + EnumRoleId.Lead + "_" + FunctionId;
                var ManagetxtAreaId = "TxtArea_" + EnumRoleId.Manage + "_" + FunctionId;
                for (var GuidelineIndex = 0; GuidelineIndex < ObjGuideline.length; GuidelineIndex++) {

                    var GuidelineDesc = ObjGuideline[GuidelineIndex].TextAreaGuidelines;
                    var LevelID = ObjGuideline[GuidelineIndex].RoleLevel;

                    if (LevelID == EnumRoleId.Core) {
                        $("#" + chkCoreRoleId).attr("checked", "checked");
                        //$("#" + CoretxtAreaId).attr("disabled", false).html(ObjGuideline[Index].TextAreaGuidelines);
                        $("#" + CoretxtAreaId).attr("disabled", false).html(GuidelineDesc);
                    }
                    if (LevelID == EnumRoleId.Lead) {
                        $("#" + chkLeadRoleId).attr("checked", "checked");
                        $("#" + LeadtxtAreaId).attr("disabled", false).html(GuidelineDesc);
                    }
                    if (LevelID == EnumRoleId.Manage) {
                        $("#" + chkManageRoleId).attr("checked", "checked");
                        $("#" + ManagetxtAreaId).attr("disabled", false).html(GuidelineDesc);
                    }
                }
            }
            EditAssignedKPIFunction();
            IsGuidelineSameAtRoleLevel();

        },
        error: function (response) {
            alert(response.responseText);

        }
    });

}
function EditAssignedKPIFunction() {
    $.ajax({
        url: "../KRA/AddKPIGuidelines.aspx/EditAssignKPIFunctionDetail",
        type: "post",
        contentType: "application/json;charset=utf-8",
        data: '{}',
        dataType: "json",
        success: function (Data) {
            var ObjAssignDetail = jQuery.parseJSON(Data.d);
            //
            for (var i = 0; i < ObjAssignDetail.length; i++) {
                var RoleLevel = ObjAssignDetail[i].Value;
                var FunctionId = ObjAssignDetail[i].FunctionID;
                var chkApplicableId = "chkKPI_" + RoleLevel + "_" + FunctionId;
                $("#" + chkApplicableId).attr("disabled", true);

            }

        },
        error: function (response) {
            alert(response.responseText);

        }
    });

}
function IsGuidelineSameAtRoleLevel() {
    $.ajax({
        url: "../KRA/AddKPIGuidelines.aspx/GetGuidelineSameAtRoleLevel",
        type: "post",
        contentType: "application/json;charset=utf-8",
        data: '{}',
        dataType: "json",
        success: function (Data) {
            var Result = jQuery.parseJSON(Data.d);
            var AddedFunctionIdList = Result.FunctionsId;
            //var splitedAddedFuncId = AddedFunctionIdList.split(',');


            //
            for (var Index = 0; Index < AddedFunctionIdList.length; Index++) {
                //var ObjGuideline = ObjFunctionGuideline[Index].FunctionGuidelines;
                var FunctionId = AddedFunctionIdList[Index];


                //
                var CoretxtAreaId = "TxtArea_" + EnumRoleId.Core + "_" + FunctionId;
                var LeadtxtAreaId = "TxtArea_" + EnumRoleId.Lead + "_" + FunctionId;
                var ManagetxtAreaId = "TxtArea_" + EnumRoleId.Manage + "_" + FunctionId;
                var chkCoreApplicableId = "chkKPI_" + EnumRoleId.Core + "_" + FunctionId;
                var chkLeadApplicableId = "chkKPI_" + EnumRoleId.Lead + "_" + FunctionId;
                var chkManageApplicableId = "chkKPI_" + EnumRoleId.Manage + "_" + FunctionId;

                if (Result.IsSameAtCore == true) {

                    $("#" + chkCoreApplicableId).prop("checked", true).attr("disabled", true)
                    $("#chkCoreLevel").prop("checked", true).attr("disabled", true)
                    $("#" + CoretxtAreaId).css('visibility', 'hidden');
                }
                if (Result.IsSameAtLead == true) {
                    $("#" + chkLeadApplicableId).prop("checked", true).attr("disabled", true)
                    $("#chkLeadLevel").prop("checked", true).attr("disabled", true)
                    $("#" + LeadtxtAreaId).css('visibility', 'hidden');

                }
                if (Result.IsSameAtManage == true) {
                    $("#" + chkManageApplicableId).prop("checked", true).attr("disabled", true)
                    $("#chkManageLevel").prop("checked", true).attr("disabled", true)
                    $("#" + ManagetxtAreaId).css('visibility', 'hidden');
                }
            }
            if (Result.IsSameAtCore == true) {
                $("#divFuncGuidelines textarea").eq(0).css('visibility', 'visible');

            }
            if (Result.IsSameAtLead == true) {
                $("#divFuncGuidelines textarea").eq(1).css('visibility', 'visible');

            }
            if (Result.IsSameAtManage == true) {
                $("#divFuncGuidelines textarea").eq(2).css('visibility', 'visible');

            }
        },
        error: function (response) {
            alert(response.responseText);

        }
    });
}