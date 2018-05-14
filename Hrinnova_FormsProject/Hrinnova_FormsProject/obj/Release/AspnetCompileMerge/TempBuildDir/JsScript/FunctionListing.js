$(document).ready(function () {
    $("#ddlParentFunc").empty()
    //ValidatorEnable($("[id$=rfddlParentFunc]")[0], false);
    BindFunction();
    GetParentFuncList();
});

// Listing of functions
function BindFunction() {
    $.ajax({
        type: "POST",
        url: 'FunctionListing.aspx/GetParentAndChildFunction',
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            var result = jQuery.parseJSON(result.d)
            var ParentFunc = (result.TblParentFunc);
            var ChildFunc = (result.TblChildFunc);
            var KPIFunc = (result.TblKPIApply);
            var FuncDescriptionLength = 30;
            var BlockLength;
            var Countlength = (ParentFunc.length % 3);
            if (Countlength != 0) {
                var DecimalLength = ((ParentFunc.length) / 3).toString();
                var splitLength = DecimalLength.split('.');
                BlockLength = parseInt(splitLength[0]) + 1;
            }
            else {
                BlockLength = ((ParentFunc.length) / 3);
            }

            //alert(BlockLength)

            $("#maindiv").empty();


            //Bind function block 
            for (var BlockIndex = 0; BlockIndex < BlockLength; BlockIndex++) {

                //alert("BlockIndex" + BlockIndex);
                $("#maindiv").append($("<div></div>").attr("id", "divfunctionblock" + BlockIndex).addClass("function-block"));
                var parentfuncLength;
                var parentIndex;
                if (BlockIndex == 0) {
                    parentIndex = 0;
                    parentfuncLength = 3;
                }
                else {
                    parentIndex = parentfuncLength;
                    parentfuncLength = parentfuncLength + 3;
                }

                //alert("parentIndex" + parentIndex);
                //alert("parentLength" + parentfuncLength);
                ///Bind Parent Functions            
                //for (var i = 0; i <= ParentFunc.length; i++) {
                for (var i = parentIndex; i < parentfuncLength; i++) {
                    if (i >= ParentFunc.length) {
                        break;
                    }
                    //alert("parent index" + i);
                    var flag = 0;
                    var ParentFlagKRA = 0;
                    //parentfuncLength = i;
                    var funcDivID = "divFuncList" + ParentFunc[i].FunctionID;
                    var ParentId = (ParentFunc[i].FunctionID);
                    var ParentFuncinnerDivId = "innerdivParentFunc"
                    //for (var ListIndex = 0; ListIndex < 3; ListIndex++) {
                    $("#divfunctionblock" + BlockIndex).append($("<div></div>").attr("id", funcDivID).addClass("function-list"));
                    $("#" + funcDivID).append($("<div></div>").attr("id", ParentFuncinnerDivId + ParentFunc[i].FunctionID).addClass("innerblock"));
                    $("#" + ParentFuncinnerDivId + ParentFunc[i].FunctionID).append($("<div></div>").html('<h3>' + ParentFunc[i].FunctionTitle + '</h3>').css("color", "Gray").attr("class", "functiontitle"));
                    $("#" + ParentFuncinnerDivId + ParentFunc[i].FunctionID).append($("<div></div>").html(ParentFunc[i].FunctionID).attr("style", "display:none").attr("class", "parentfuncid"));
                    if (ParentFunc[i].FunctionDescription.length > FuncDescriptionLength) {
                        var Description = ParentFunc[i].FunctionDescription.substr(0, FuncDescriptionLength) + "...";
                        $("#" + ParentFuncinnerDivId + ParentFunc[i].FunctionID).append($("<div></div>").html('<p>' + Description + '</p>').append($("<a></a>").text("Read More").attr("href", "#").css("color", "blue").addClass("funcdescription")));
                    }
                    else {
                        $("#" + ParentFuncinnerDivId + ParentFunc[i].FunctionID).append($("<div></div>").html('<p>' + ParentFunc[i].FunctionDescription + '</p>').attr("class", "functiondescription"));
                    }
                    $("#" + ParentFuncinnerDivId + ParentFunc[i].FunctionID).append($("<a></a>").text("  Edit  ").attr("id", "Edit" + funcDivID).attr("href", "#").attr("class", "editParentFunction"));
                    for (var childIndex = 0; childIndex < ChildFunc.length; childIndex++) {

                        if (ParentFunc[i].FunctionID == ChildFunc[childIndex].ParentFunctionID) {
                            flag = 1;

                        }
                    }
                    for (var KPIIndex = 0; KPIIndex < KPIFunc.length; KPIIndex++) {

                        if (ParentFunc[i].FunctionID == KPIFunc[KPIIndex].FunctionID) {
                            ParentFlagKRA = 1;

                        }
                    }
                    if (flag == 1 || ParentFlagKRA == 1) {
                        $("#" + ParentFuncinnerDivId + ParentFunc[i].FunctionID).append($("<a></a>").text("Delete").attr("id", "Delete" + funcDivID).attr("href", "#").attr("class", "disableLink").css('text-decoration', 'none').css({ 'cursor': "default" }).prop('disabled', 'disabled'));
                    }
                    else {

                        $("#" + ParentFuncinnerDivId + ParentFunc[i].FunctionID).append($("<a></a>").text("Delete").attr("id", "Delete" + funcDivID).attr("href", "#").attr("class", "DeleteParentFunction"));

                    }
                    //Bind Child functions
                    for (var childIndex = 0; childIndex < ChildFunc.length; childIndex++) {
                        var flagKRA = 0;
                        //alert("childIndex" + childIndex);
                        if (ChildFunc[childIndex].ParentFunctionID == ParentFunc[i].FunctionID) {
                            var childFuncDivID = "divchildFunc" + ChildFunc[childIndex].FunctionID;

                            $("#" + funcDivID).append($("<div></div>").attr("id", childFuncDivID).addClass("innerblock"));
                            $("#" + childFuncDivID).append($("<div></div>").html('<h5>' + ChildFunc[childIndex].FunctionTitle + '</h5>').attr("class", "functiontitle"));
                            $("#" + childFuncDivID).append($("<a></a>").text("Edit  ").attr("id", "Edit " + childFuncDivID).attr("href", "#").attr("class", "editChildFunction"))
                            //.append($("<a></a>").text(" View KRA Applicable ").attr("id", "View KRA Apllicable" + childFuncDivID).attr("href", "#").attr("class", "KRAapplicable"));
                            for (var KPIIndex = 0; KPIIndex < KPIFunc.length; KPIIndex++) {

                                if (ChildFunc[childIndex].FunctionID == KPIFunc[KPIIndex].FunctionID) {
                                    flagKRA = 1;

                                }
                            }
                            if (flagKRA == 1) {
                                $("#" + childFuncDivID).append($("<a></a>").text(" View KRA Applicable ").attr("id", "View KRA Apllicable" + childFuncDivID).attr("href", "#").attr("class", "KRAapplicable")).append($("<a></a>").text("Delete").attr("id", "Delete" + funcDivID).attr("href", "#").attr("class", "disableLink").css('text-decoration', 'none').css({ 'cursor': "default" }));

                            }
                            else {

                                $("#" + childFuncDivID).append($("<a></a>").text(" View KRA Applicable ").attr("id", "View KRA Apllicable" + childFuncDivID).attr("href", "#").attr("class", "disableLink").css('text-decoration', 'none').css({ 'cursor': "default" })).append($("<a></a>").text("Delete").attr("id", "Delete" + funcDivID).attr("href", "#").attr("class", "DeleteChildFunction"));

                            }

                        }
                        //}

                    }

                }
                $("#divfunctionblock" + BlockIndex).append($("<div></div>").addClass("clearfix"));
            }
        },
        error: function (result) {
            alert(result.responseText);
        }

    });
}



$(document).on('click', "a.funcdescription", function () {
    var DivParentFuncID = $(this).parent().parent().attr("id");
    var SplitParentFuncID = DivParentFuncID.split("innerdivParentFunc");
    var ParentFuncID = SplitParentFuncID[1];
    $.ajax({
        type: "POST",
        url: 'FunctionListing.aspx/GetParentData',
        datatype: 'json',
        data: '{"ParentFunctionId":"' + ParentFuncID + '"}',
        contentType: 'application/json; charset=utf-8',
        success: function (jsonResult) {
            var result = jQuery.parseJSON(jsonResult.d);
            var functionData = result.dtFuncData;
            $("#funcdescriptiondialog").text(functionData[0].FunctionDescription);
            $("#divdescriptiondialog").css("display", "block");
            $("#divdescriptiondialog").dialog({
                width: 300,
                height: 200,
                title: functionData[0].FunctionTitle,
                draggable: false,
                resizable: false,
                modal: true,
                postion: "center"
            });
        },
        error: function (jsonResult) {
            alert(jsonResult.responseText);
        }
    });

});


// delete parent function
$(document).on('click', "a.DeleteParentFunction", function (e) {
    e.preventDefault();
    var DivParentFuncID = $(this).parent().attr("id");
    var SplitParentFuncID = DivParentFuncID.split("innerdivParentFunc");
    var ParentFuncID = SplitParentFuncID[1];
    $("#divDeleteConfirm").dialog({
        width: 250,
        height: 200,
        title: "Delete Function",
        draggable: false,
        resizable: false,
        modal: true,
        postion: "center",
        buttons: [{ text: "Yes",
            click: function () {
                $(this).dialog("close");
                $.ajax({
                    type: "POST",
                    url: 'FunctionListing.aspx/DeleteParentFunc',
                    datatype: 'json',
                    data: '{"ParentFunID":"' + ParentFuncID + '"}',
                    contentType: 'application/json; charset=utf-8',
                    success: function (jsonResult) {
                        alert("Function deleted successfully");
                        $(this).closest('div').remove();
                        BindFunction();
                    },
                    error: function (jsonresult) {
                        alert("Function deleteion failed");
                    }

                });
            }
        },
                  {
                      text: "No",
                      click: function () {
                          $(this).dialog("close");
                      }
                  }
                ]
    })


});

//delete child function
$(document).on('click', "a.DeleteChildFunction", function (e) {
    e.preventDefault();
    var DivChildFuncID = $(this).parent().attr("id");
    var SplitDivChildFuncID = DivChildFuncID.split("divchildFunc");
    var ChildFuncID = SplitDivChildFuncID[1];
    $("#divDeleteConfirm").dialog({
        width: 250,
        height: 200,
        title: "Delete Function",
        draggable: false,
        resizable: false,
        modal: true,
        postion: "center",
        buttons: [{ text: "Yes",
            click: function () {
                $(this).dialog("close");
                $.ajax({
                    type: "POST",
                    url: 'FunctionListing.aspx/DeleteChildFunc',
                    datatype: 'json',
                    data: '{"ChildFunID":"' + ChildFuncID + '"}',
                    contentType: 'application/json; charset=utf-8',
                    success: function (jsonResult) {
                        alert("Function deleted successfully");
                        $("#" + DivChildFuncID).remove();
                        BindFunction();
                    },
                    error: function (jsonresult) {
                        alert("Function deleteion failed");
                    }
                });
            }
        },
                  {
                      text: "No",
                      click: function () {
                          $(this).dialog("close");
                      }
                  }
                ]
    })

});

//edit parent function
$(document).on('click', "a.editParentFunction", function (e) {
    e.preventDefault();
    clear();
    $("#ddlParentFunc").empty()
    GetParentFuncList();
    $("#divAddmoreFun").hide();
    $("#dvParentFunc").hide();
    $("#lblError.ClientID").text('');
    var DivParentFuncID = $(this).parent().attr("id");
    var SplitParentFuncID = DivParentFuncID.split("innerdivParentFunc");
    var ParentFuncID = SplitParentFuncID[1];
    $("#lblMessage").text('').removeClass('alert alert-success');

    $.ajax({
        type: "POST",
        url: 'FunctionListing.aspx/GetParentData',
        datatype: 'json',
        data: '{"ParentFunctionId":"' + ParentFuncID + '"}',
        contentType: 'application/json; charset=utf-8',
        success: function (jsonResult) {

            var result = jQuery.parseJSON(jsonResult.d);
            var ParentFunctionData = result.dtFuncData;
            var ChildFuncData = result.dtChildFunctionData;
            var KPIData = result.dtKPIData;

            $("#txtFunTitle").val(ParentFunctionData[0].FunctionTitle);
            $("#txtFuncDescription").val(ParentFunctionData[0].FunctionDescription);
            $("#lblFuncID").val(ParentFunctionData[0].FunctionID);

            var title = $("#txtFunTitle").val();
            var description = $("#txtFuncDescription").val();
            var funcID = $("#lblFuncID").val();
            var IsChildFunc = ParentFunctionData[0].IsChildFunction;


            //alert(ChildFuncData.length);
            //alert(KPIData.length);
            if (ChildFuncData.length > 0 || KPIData.length > 0) {
                //  alert("KPIdata");
                $("#cbChildYes").attr("disabled", true);
                $("#cbChildNo").attr("disabled", true);
                $("#ddlParentFunc").attr("disabled", true);
                $("#txtFunTitle").attr("disabled", true);
            }
            else {
                $("#cbChildYes").attr("disabled", false)
                $("#cbChildNo").attr("disabled", false);
                $("#ddlParentFunc").attr("disabled", false);
                $("#txtFunTitle").attr("disabled", false);
            }
            //$("#<%=ddlParentFunc.ClientID %> option[value=" + funcID + "]").remove();

            if (IsChildFunc == true) {
                $("#cbChildYes").attr('checked', true);
                $("#cbChildNo").attr('checked', false);
                //$("#dvParentFunc").show();
            }
            else {
                $("#cbChildYes").attr('checked', false);
                $("#cbChildNo").attr('checked', true);
            }

            $("#modal_dialog").dialog({
                width: 600,
                height: 400,
                title: "Edit Function",
                draggable: false,
                resizable: false,
                modal: true,
                postion: "center",
                class: "edit-dialog"
            });

        },
        error: function (jsonresult) {
            alert(jsonresult.responseText);
        }

    });
    //            $("#modal_dialog").dialog({
    //                width: 600,
    //                height: 400,
    //                title: "Edit Function",
    //                modal: true,
    //                postion: "center",
    //                class: "edit-dialog"
    //            });
});

//edit child function
$(document).on('click', "a.editChildFunction", function (e) {
    e.preventDefault();
    $("#cbChildYes").attr("disabled", false)
    $("#divAddmoreFun").hide();
    $("#ddlParentFunc").empty()
    //GetParentFuncList();
    $("#lblError").text('');
    clear();
    if ($("#cbChildYes").prop("checked", false)) {
        ValidatorEnable($("[id$=rfddlParentFunc]")[0], true);
    }
    else {
        ValidatorEnable($("[id$=rfddlParentFunc]")[0], false);
    }
    var DivChildFuncID = $(this).parent().attr("id");
    //alert(DivChildFuncID);
    var SplitChildFuncID = DivChildFuncID.split("divchildFunc");
    var ChildFuncID = SplitChildFuncID[1];

    $.ajax({
        type: "POST",
        url: 'FunctionListing.aspx/GetChildFuncData',
        datatype: 'json',
        data: '{"ChildFunctionId":"' + ChildFuncID + '"}',
        contentType: 'application/json; charset=utf-8',
        success: function (jsonResult) {
            var result = jQuery.parseJSON(jsonResult.d);
            var ChildFunctionData = result.dtChildfunc;
            var KPIData = result.dtKPIData;
            var ParentFuncList = result.dtParentFuncList;
            $("#ddlParentFunc").append($("<option></option>").val("0").html("Please select Function"));
            for (var i = 0; i < ParentFuncList.length; i++) {
                $("#ddlParentFunc").append($("<option></option>").val(ParentFuncList[i].FunctionID).html(ParentFuncList[i].FunctionTitle));
            }


            //alert(KPIData.length);
            if (KPIData.length > 0) {
                $("#cbChildYes").attr("disabled", true);
                $("#cbChildNo").attr("disabled", true);
                $("#ddlParentFunc").attr("disabled", true);
                $("#txtFunTitle").attr("disabled", true);
            }
            else {
                $("#cbChildYes").attr("disabled", false);
                $("#cbChildNo").attr("disabled", false);
                $("#ddlParentFunc").attr("disabled", false);
                $("#txtFunTitle").attr("disabled", false);
            }
            $("#txtFunTitle").val(ChildFunctionData[0].FunctionTitle);
            $("#txtFuncDescription").val(ChildFunctionData[0].FunctionDescription);
            $("#lblFuncID").val(ChildFunctionData[0].FunctionID);

            var title = $("# txtFunTitle").val();
            var description = $("#txtFuncDescription").val();
            var funcID = $("#lblFuncID").val();
            var IsChildFunc = ChildFunctionData[0].IsChildFunction;
            var ParentFunction = ChildFunctionData[0].ParentFunctionID;
            $("#ddlParentFunc").val(ParentFunction);

            if (IsChildFunc == true) {
                //ValidatorEnable($("[id$=rfddlParentFunc]")[0], true);
                $("#cbChildYes").attr('checked', true);
                $("#cbChildNo").attr('checked', false);
                $("#dvParentFunc").show();

            }
            else {
                // ValidatorEnable($("[id$=rfddlParentFunc]")[0], false);
                $("#cbChildYes").attr('checked', false);
                $("#cbChildNo").attr('checked', true);
            }
            $("#modal_dialog").dialog({
                width: 600,
                height: 400,
                title: "Edit Function",
                draggable: false,
                resizable: false,
                modal: true,
                postion: "center",
                class: "edit-dialog"
            });

        },
        error: function (jsonresult) {
            alert(jsonresult.responseText);
        }

    });
    $("#lblMessage").text('').removeClass('alert alert-success');
    //            $("#modal_dialog").dialog({
    //                width: 600,
    //                height: 400,
    //                title: "Edit Function",
    //                modal: true,
    //                postion: "center",
    //                class: "edit-dialog"
    //            });

});

$(document).on('click', '.KRAapplicable', function (e) {
    e.preventDefault();
    var DivChildFuncID = $(this).parent().attr("id");
    var SplitChildFuncID = DivChildFuncID.split("divchildFunc");
    var ChildFuncID = SplitChildFuncID[1];

    window.location = "../KRA/ViewKRAApplicable.aspx?FunctionID=" + ChildFuncID;

});

//Add new function
$(document).on('click', "#btnAddFunc", function (e) {
    e.preventDefault();
    GetParentFuncList();
    $("#divAddmoreFun").hide();
    $("#lblFuncID").val("");

    $("#cbChildYes").attr("disabled", false)
    $("#cbChildNo").attr("disabled", false);
    $("#ddlParentFunc").attr("disabled", false);
    $("#txtFunTitle").attr("disabled", false);
    clear();
    //$("#ddlParentFunc").empty()
    $("#lblMessage").text('').removeClass('alert alert-success');
    $("#modal_dialog").dialog({
        width: 600,
        height: 400,
        title: "Add Function",
        draggable: false,
        resizable: false,
        modal: true,
        postion: "center",
        class: "edit-dialog"
    });
});


$(function checkbox() {
    $('input:checkbox').click(function () {
        if ($(this).is(':checked')) {
            $('input:checkbox').not(this).prop('checked', false);

        }
    });
    $("#cbChildYes").click(function () {
        if ($("#cbChildYes").prop('checked') == true) {
            $("#dvParentFunc").show();
            $("#ddlParentFunc").val('0');
            ValidatorEnable($("[id$=rfddlParentFunc]")[0], true);
        }
        else {
            $("#dvParentFunc").hide();
            ValidatorEnable($("[id$=rfddlParentFunc]")[0], false);
        }

    });
    $(document).on('click', '#cbChildNo', function () {
        $("#dvParentFunc").hide();
        ValidatorEnable($("[id$=rfddlParentFunc]")[0], false);

    });
})

// Insert, update function
$(document).on('click', '#btnSaveFunction', function () {
    ClearMessage();
    var Childflag = false;
    var SelectSameParent = false;
    var title = $("#txtFunTitle").val().trim();
    var description = $("#txtFuncDescription").val().trim();
    var funcID = $("#lblFuncID").val();

    var ParentFunc = $("#ddlParentFunc").val();

    if (funcID == "") {
        funcID = 0;
    }
    else if (funcID == ParentFunc) {
        SelectSameParent = true;
        //$("#lblError").text("You can not select same parent function");
        ShowMessage(false, "You can not select same parent function");
    }

    var chkParFunc = $("#cbChildNo").prop('checked');
    var IsChildFunc = $("#cbChildYes").prop('checked');
    if ($("#cbChildYes").prop('checked') == true) {
        ValidatorEnable($("[id$=rfddlParentFunc]")[0], true);
        IsChildFunc = true;
        if ($("#ddlParentFunc").val() == 0) {
            //$("#lblError").text("Please Select Parent function").addClass("yellow-error");            
            Childflag = true;
        }

    }
    if ($("#cbChildYes").prop('checked') == false) {
        ValidatorEnable($("[id$=rfddlParentFunc]")[0], false);
        ParentFunc = 0;
    }

    if (chkParFunc == true || IsChildFunc == true) {
        if (title != "" && description != "" && Childflag == false && SelectSameParent == false) {

            $.ajax({
                type: "POST",
                url: 'FunctionListing.aspx/InsertUpdate',
                datatype: 'json',
                data: "{ 'title': '" + title + "', 'description': '" + description + "','funcID':'" + funcID + "','IsChildFunc':'" + IsChildFunc + "','ParentFunc':'" + ParentFunc + "' }",
                contentType: 'application/json; charset=utf-8',
                success: function (jsonResult) {
                    if (jsonResult.d == true) {
                        //$("#lblError").text("This Function Title already exists").addClass("yellow-error");
                        ShowMessage(false, "This Function Title already exists");
                    }
                    else {

                        if (funcID == 0) {
                            $("#divmessage").show();
                            $("#lblMessage").text("Function submited successfully").addClass("green-msg");
                            $("#lblMessage").show();
                            clear();
                            $("#divAddmoreFun").show();


                        }
                        else {
                            $("#modal_dialog").dialog("close");
                        }
                        BindFunction();
                        GetParentFuncList();
                    }

                },
                error: function (result) {
                    alert(result.responseText);
                }
            });

        }
    }
    else {
        ShowMessage(false, "Please check Is Child Function ")
    }
})
$(document).on('click', "#Yesbtn", function () {
    $("#divAddmoreFun").hide();
    $("#lblMessage").hide();

});

$(document).on('click', "#Nobtn", function () {
    $("#divAddmoreFun").hide();
    $("#modal_dialog").dialog("close");
});
$(document).on('click', '#btnClose', function () {
    clear();
    $("#modal_dialog").dialog("close");
});

function clear() {

    ClearMessage();
    //$("#lblError").text('').removeClass('alert alert-warning');
    $("#txtFunTitle").val('');
    $("#txtFuncDescription").val('');
    $("#cbChildYes").attr('checked', false);
    $("#cbChildNo").attr('checked', true);
    $("#vs").empty();
    $("#dvParentFunc").hide();
    //$("#ddlParentFunc").val(0);
    $("#ddlParentFunc").empty();
    ValidatorEnable($("[id$=rfddlParentFunc]")[0], false);
};





$(document).ready(function () {
    var isPostBackObject = document.getElementById('isPostBack');
    if (isPostBackObject != null) {
        if ($('#cbChildNo').is(':checked')) {
            $("#dvParentFunc").hide();
            //ValidatorEnable($("[id$=rfddlParentFunc]")[0], false);
        }

        else if ($('#cbChildYes').is(':checked')) {
            $("#dvParentFunc").show();
            //ValidatorEnable($("[id$=rfddlParentFunc]")[0], true);
        }

    }
});


function ClearMessage() {
    $("#lblError").empty();
    $("#lblError").removeClass('alert alert-warning');
    $("#lblError").removeClass('alert alert-success');       

}

function ShowMessage(Issucess, Message) {
    if (Issucess) {

        $("#lblError").removeClass('alert alert-warning');
        $("#lblError").addClass('alert alert-success');
        $("#lblError").text(Message);

    }
    else {
        $("#lblError").addClass('alert alert-warning');
        $("#lblError").removeClass('alert alert-success');
        $("#lblError").text(Message);
    }


}
