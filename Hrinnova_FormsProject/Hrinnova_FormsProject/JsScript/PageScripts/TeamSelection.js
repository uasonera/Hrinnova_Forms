$(document).ready(function () {
    var sPageURL = window.location.search.substring(1);
    // var msg = sPageURL.split(/=+(.+)?/)[1];
    var chkbxEmpListId = "";
    //BindKRAEvalution();
    //$.ajax({
    //    type: "POST",
    //    url: 'TeamSelection.aspx/GetDecryptedData',
    //    data: "{ 'Message' : '" + msg + "'}",
    //    contentType: 'application/json; charset=utf-8',
    //    datatype: 'json',
    //    success: function (result) {
    //        if (result.d == "Success") {
    //            ShowMessage(true, "Record Saved Successfully");
    //        }
    //    }
    //});
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

    $("#EditTeamSelection").css("display", "none");
    $.ajax({
        type: "POST",
        url: 'TeamSelection.aspx/GetFuncions',
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (jsonResult) {
            var result = jQuery.parseJSON(jsonResult.d[0]);
            var KraEvalution = jsonResult.d[1];
            var ParentFunc = (result.TblParentFunc);
            var ChildFunc = (result.TblChildFunc);
            //var Proj = (result.TblProj);
            //var SelectedProj = (result.TblSelProject);

            $("#divSelectedProjName").text(jsonResult.d[2]).css('padding-left', '5px');

            BindParentChildCheckbox(ParentFunc, ChildFunc);

            BindBackDetails();

            SelectParentIfAllChildSelected();

        }
    }); //AJAX ENDS HERE
    //$("#drpProj").change(function () {
    //    //        alert("hi");       

    //    var ProjID = $("#drpProj").val();

    //    $.ajax({
    //        type: "POST",
    //        url: 'TeamSelection.aspx/GetEmployees',
    //        data: "{ 'ProjID' : '" + ProjID + "'}",
    //        contentType: 'application/json; charset=utf-8',
    //        datatype: 'json',
    //        success: function (result) {
    //            var result = jQuery.parseJSON(result.d);
    //            var count = Object.keys(result).length;
    //            $("#chkemployees").empty();
    //            $('#lbl').text("");
    //            for (var i = 0; i < count; i++) {
    //                addToCheckBoxListControl(result[i].Name, result[i].TMID);
    //            }
    //            //checkedEmpId(chkbxEmpListId);

    //        }
    //    });


    //});
    $('#chkemployees').click(function () {
        $('#lbl').text("");
        $('#chkemployees input:checkbox').each(function () {
            if ($(this).is(':checked')) {
                $('#lbl').append($(this).next("label").html());
                $('#lbl').append("</br>");
                $('#lbl').append("</br>");
            }
        });
    });
    function BindParentChildCheckbox(ParentFunc, ChildFunc) {

        var ParentCount = Object.keys(ParentFunc).length;
        for (var i = 0; i < ParentCount; i++) {
            var data = ParentFunc[i].IsApplicable;

            $('#functions').append('<div id="appended_div' + i + '" style="float:left;width:33%;height:auto;"></div>');
            if (ParentFunc[i].IsApplicable == 1) {

                $('#appended_div' + i).append(
                        $(document.createElement('input')).attr({
                            id: 'Parentchk' + ParentFunc[i].FunctionID
                            , value: ParentFunc[i].FunctionID,
                            class: 'parents'
                            , type: 'checkbox'
                            , checked: 'checked'
                        })
                     );
            }
            else {

                $('#appended_div' + i).append(
                    $(document.createElement('input')).attr({
                        id: 'Parentchk' + ParentFunc[i].FunctionID
                            , value: ParentFunc[i].FunctionID,
                        class: 'parents'
                            , type: 'checkbox'
                    })
            );
            }

            $('#appended_div' + i).append(
                 $(document.createElement('input')).attr({
                     id: 'Parentlbl' + i
                            , value: ParentFunc[i].FunctionTitle
                            , type: 'label'
                 })
            );
            $('#appended_div' + i).append("</br>");
            $('#Parentlbl' + i).css({ 'fontSize': '20px', border: 'none' });

            var ChildCount = Object.keys(ChildFunc).length;
            for (var j = 0; j < ChildCount; j++) {

                if (ChildFunc[j].ParentFunctionID == ParentFunc[i].FunctionID) {

                    if (ChildFunc[j].IsApplicable == 1) {
                        $('#appended_div' + i).append(
                        $(document.createElement('input')).attr({
                            id: 'Childchk' + ChildFunc[j].FunctionID
                            , value: ChildFunc[j].FunctionID
                            , class: 'childrens'
                            , type: 'checkbox'
                            , checked: 'checked'
                        })
                     );
                    }
                    else {
                        $('#appended_div' + i).append(
                        $(document.createElement('input')).attr({
                            id: 'Childchk' + ChildFunc[j].FunctionID
                            , value: ChildFunc[j].FunctionID
                            , class: 'childrens'
                            , type: 'checkbox'
                        })
                     );
                    }

                    $('#appended_div' + i).append(
                        $(document.createElement('input')).attr({
                            id: 'Childlbl' + j
                            , value: ChildFunc[j].FunctionTitle
                            , type: 'label'
                        })
                    );
                    $('#appended_div' + i).append("</br>");
                    $('#Childchk' + ChildFunc[j].FunctionID).css({ 'margin-left': '20px' });
                    $('#Childlbl' + j).css({ border: 'none' });
                }
            }
        }
        $('div[id^=appended_div]').each(function (i, e) {
            if (((i + 1) % 3) == 0)
                $(this).after('<div style="clear:both;height:20px;"></div>');
        });
    }
    $(document).on("click", "#btnNext", function (e) {
        e.preventDefault();
        $("#ulVs").empty();
        var functions = $("#functions").find('input:checkbox:checked').length;

        // var SelectedProjId = $("#drpProj").val();

        //var KraEvalutionValue = $("#ddlKraEvalution").val();
        //var KraEvalutionText = $("#ddlKraEvalution :selected").text();


        //        if (SelectedProjId == 0) {
        //            $("#ulVs").append("<li>Please Select Project</li>");
        //        }
        //        else {
        //            if ($('#lbl').text() == "" && $('#lblEmpName').text() == "") {
        //                $("#ulVs").append("<li>Please Select Employees</li>");
        //            }
        //        }

        //        if (KraEvalutionValue == 0) {
        //            $("#ulVs").append("<li>Please Select KRA Evaluation Period</li>");
        //        }
        if (functions == 0) {
            $("#ulVs").append("<li>Please Select Functions</li>");
        }

        if ($("#ulVs").find('li').length == 0) {
            //            var cbListEmp = {};
            //            cbListEmp.value = [];

            var cbListFunc = {};
            cbListFunc.value = [];
            var Data = null;

            // Get Selected Employees
            //            $("#chkemployees").find("input:checkbox").each(function () {
            //                if (this.checked) {
            //                    cbListEmp.value.push($(this).val());
            //                }
            //            });
            //Get Selected Functions
            $("#functions").find("input:checkbox").each(function () {
                if (this.checked) {
                    cbListFunc.value.push($(this).attr("id"));
                }
            });

            data = { checkboxListFuncVal: cbListFunc.value };
            $.ajax({
                type: "POST",
                url: "TeamSelection.aspx/SetEmployeesFunctions",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                success: function () {
                    window.location.href = "../KRA/ProjectTeamDefinition_2.aspx";
                }

            });
        }
    });
    $(document).on("click", "INPUT[id^=Parentchk]", function (event) {
        var targetId = event.target.id;
        var parentdvId = $(this).parent().attr('id');

        if ($("#" + targetId + ":checked").length > 0) {
            $("#" + parentdvId + " input:checkbox").each(function () {
                $("#" + parentdvId + " input:checkbox").prop("checked", true);
            });
        }
        else {
            $("#" + parentdvId + " input:checkbox").each(function () {
                $("#" + parentdvId + " input:checkbox").prop("checked", false);
            });
        }
    });
    $("#btnCancel").click(function () {
        window.location.href = "/Dashboard/Index";
    });
});

function addToCheckBoxListControl(textValue, valueValue) {
    var tableRef = $("#chkemployees");

    var option = document.createElement('input');
    var label = document.createElement('label');


    option.type = 'checkbox';
    label.innerHTML = textValue;
    option.value = valueValue;


    tableRef.append(option);
    tableRef.append(label);
    tableRef.append("</br>");
    tableRef.append("</br>");

    if (chkbxEmpListId != null) {
        checkedEmpId(chkbxEmpListId);
    }

}


$(document).on('click', '#btnBack', function (event) {
    $.ajax({
        type: "POST",
        url: 'TeamSelection.aspx/StoreBackDetails',
        data: '{}',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            var jsonresult = result.d;
            var IsBack = jsonresult[1];
            var IsEdit = jsonresult[0];
            window.location = "../KRA/TeamSelection_Step1.aspx?IsBack=" + IsBack + "&&IsEdit=" + IsEdit;
        }
    });
});
function BindBackDetails() {
    $.ajax({
        type: "POST",
        async: false,
        url: "TeamSelection.aspx/GetBackDetails",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            var jsonResult = jQuery.parseJSON(result.d);
            //chkbxEmpListId = jsonResult.checkboxListEmpId;
            var chxbxFuncListId = jsonResult.checkboxListFuncId;
            //var ProjID = jsonResult.SelectedProjId;
            //var KraEvalution = jsonResult.SelectedKRAEvalutionId;

            //$.when($("#drpProj").change()).done(function () { checkedEmpId(chkbxEmpListId) });            

            if (jsonResult.IsBackAssignKRAStep2 == "true") {
                $("#functions").find('input[type=checkbox]:checked').removeAttr('checked');
                //$("#drpProj option[value='" + ProjID + "']").attr("selected", "selected").change();
                //$("#ddlKraEvalution option:contains(" + KraEvalution + ")").attr("selected", "selected");

                for (var i = 0; i < chxbxFuncListId.length; i++) {
                    var FuncID = chxbxFuncListId[i];
                    $("#" + FuncID).prop("checked", true);
                }
            }
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}
function checkedEmpId(chkbxEmpListId) {
    for (var EmpIndex = 0; EmpIndex < chkbxEmpListId.length; EmpIndex++) {
        var empId = chkbxEmpListId[EmpIndex];
        $('input[type = checkbox][value = "' + empId + '"]').prop('checked', true);
    }
    $('#chkemployees').trigger('click');
}

//$(document).on("click", "INPUT[id^=Parentchk]", function (event) {
//    //$("INPUT[id^=chkParFunc]").click(function (event) {
//    var targetId = event.target.id;
//    var parentdvId = $(this).parent().attr('id');

//    if ($("#" + targetId + ":checked").length > 0) {
//        $("#" + parentdvId + " input:checkbox").each(function () {
//            $("#" + parentdvId + " input:checkbox").prop("checked", true);
//        });
//    }
//    else {
//        $("#" + parentdvId + " input:checkbox").each(function () {
//            $("#" + parentdvId + " input:checkbox").prop("checked", false);
//        });
//    }
//});

$(document).on("click", "INPUT[id^=Childchk]", function (event) {

    var targetId = event.target.id;
    var ParentObject = $(this).parent();
    var parentdvId = $(this).parent().attr('id');
    var length = $("#" + targetId + ":checked").length;

    if (length > 0) {

        var t = $(this).siblings().is(':checked');
    }
    else {

        $("#" + parentdvId).find('input:checkbox:first').each(function () {

            $(this).prop("checked", false);
        });
    }

    SelectParentIfAllChildSelected(ParentObject);
});

function SelectParentIfAllChildSelected(Container) {
    var ParentDiv;

    if (typeof Container == "undefined") {
        ParentDiv = $("div[id*='appended_div' ]");

        $.each($(ParentDiv), SelectParent);
    }
    else {
        ParentDiv = Container;

        SelectParent(1, ParentDiv);
    }



}

function SelectParent(index, item) {

    var self = item;


    var Parent = $(self).find($("input[id*='Parentchk']"))

    var AllChild = $(self).find($("input[id*='Childchk']"))

    var SelectedChild = $(self).find($("input[id*='Childchk']:checked"))

    if ($(AllChild).length == $(SelectedChild).length && $(AllChild).length != 0) {

        $(Parent).prop('checked', true);
    }


}


