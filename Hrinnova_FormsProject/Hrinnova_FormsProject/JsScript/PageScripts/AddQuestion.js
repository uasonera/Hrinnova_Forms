$(document).ready(function () {
    //alert("hello");
    $("#AddEditQuestionDialog").css("display", "none");
    ValidatorEnable($("[id$=rfvddlProject]")[0], true);


});

$(document).on('click', '#btnAddQuestionLink', function (e) {
    //alert("hi");
    ClearQuestionControls();
    GetProjectList();
    $("#btnQuestionSave").val("Save");
    $("#btnQuestionSave").attr("disabled", false);
    $("#AddEditQuestionDialog").css("display", "block");
    $("#AddEditQuestionDialog").dialog({

        width: 600,
        height: 375,
        title: "Add Question",
        modal: true,
        create: function () {
            $(this).closest('div.ui-dialog')
                   .find('.ui-dialog-titlebar-close')
                   .click(function (e) {
                       //alert('hi');
                       _doPostBack("QuestionID ", flag);
                       e.preventDefault();
                   });
        }

    });
    return false;
});


function GetProjectList() {
    $.ajax({
        url: "../Admin/AddQuestions.aspx/GetProjectList",
        type: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (jsonData) {
            ObjObjectiveList = jQuery.parseJSON(jsonData.d);
            // alert(jsonData.d);
            $("#ddlProject").append($("<option></option>").val("0").html("Please select"));
            for (var i = 0; i < ObjObjectiveList.length; i++) {
                $("#ddlProject").append($("<option></option>").val(ObjObjectiveList[i].projectID).html(ObjObjectiveList[i].proName));
            }
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}

$(document).on('click', '#btnQuestionCancel', function (e) {
    //alert("cancel");
    ClearQuestionControls();
    $("#AddEditQuestionDialog").dialog("close");
});

function ClearQuestionControls() {
    $("#ddlProject").empty();
    $("#txtQuestion").val("");
    $("#chkIsDefault").attr('checked', false);
    $("#vs").empty();
    $("#lblMessage").text("").removeClass('alert alert-success');
    $("#lblMessage").text("").removeClass('alert alert-warning');

}

$(document).on('click', '#btnQuestionSave', function (e) {    
    //var txtque = $("#txtQuestion").html();    
    //    var Proj = $("#ddlProject").val();
    //    var chkDefault = $("#chkIsDefault").prop('checked');

    //  alert(txtque);
    //  alert(Proj);
    // alert(chkDefault);
    InsertQuestion();

});

function InsertQuestion() {

    var txtque = $("#txtQuestion").val().trim();

    var ProjID = $("#ddlProject").val();
    var chkDefault = $("#chkIsDefault").prop('checked');
    var QuestionID = $('#inpQuestionID').val();

    var IsDefult = $("#chkIsDefault").prop('checked');
    var DefaultValFlag = false;    
    //alert(ProjID);
    //alert(chkDefault);

    if (IsDefult == false) {
        if ($("#ddlProject").val() == 0) {
            ValidatorEnable($("[id$=rfvddlProject]")[0], true);
            DefaultValFlag = true;
        }
    }
    if (txtque != null && txtque != "" && DefaultValFlag == false) {

        ValidatorEnable($("[id$=rfvddlProject]")[0], false);
        $("#btnQuestionSave").attr("disabled", true);
        $.ajax({
            type: "POST",
            url: "AddQuestions.aspx/InsertQuestion",
            contentType: "application/json; charset=utf-8",
            data: "{ 'ProjID' : '" + ProjID + "', 'Question' : '" + txtque + "','IsDefault' :'" + chkDefault + "','ProjectStatusQueID' :'" + QuestionID + "'}",
            success: function (response) {
                alert(response.d);
                var flag = response.d
                //  _doPostBack("DataEntryDivID " + EntryId, flag);
                //alert(flag);
                ClearQuestionControls();
                //$("#AddEditQuestionDialog").dialog("close");
                $("#divAddmoreQue").show();

            }
        });
    }
}

function _doPostBack(eventTarget, eventArgument) {
    $("#__EVENTTARGET").val(eventTarget);
    $("#form1").submit();
}

function EditQuestion(id) {
    // alert(id);
    GetProjectList();
    $("#btnQuestionSave").val("Update");
    $("#btnQuestionSave").attr("disabled", false);

    if (id != null && id != "0") {

        $.ajax({
            type: "POST",
            url: "AddQuestions.aspx/GetQuestionDetails",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: "{ 'QuestionID' : '" + id + "'}",
            success: function (jsonData) {
                //alert(jsonData);
                var Obj = jQuery.parseJSON(jsonData.d);
                //alert(Obj);
                //var tblQue = Obj.tblQueDetail;
                //alert(Obj[0].QuestionText);
                $("#txtQuestion").val(Obj[0].QuestionText);
                $('#ddlProject').val(Obj[0].ProjectID);

                //  $("#chkIsDefault").attr('checked', Obj[0].IsDefault);
                $("#chkIsDefault").prop('checked', Obj[0].IsDefault);
                $('#inpQuestionID').val(Obj[0].ProjectStatusQuestionId);
                // alert($('#inpQuestionID').val());

            }
        });
    }


    $("#AddEditQuestionDialog").css("display", "block");
    $("#AddEditQuestionDialog").dialog({

        width: 500,
        height: 250,
        title: "Edit Question",
        modal: true
    });
    return false;
}

function DeleteQuestion(id) {
    //alert("Delete");
    if (confirm("Do you want to delete this record?")) {
        //alert(id);
        if (id != null && id != "0") {
            //  alert(id);
            $.ajax({
                type: "POST",
                url: "AddQuestions.aspx/DeleteQuestionDetails",
                contentType: "application/json; charset=utf-8",
                data: "{ 'QuestionID' : '" + id + "'}",
                success: function (response) {
                    alert(response.d);

                }
            });
        }
    }
    return false;
}
$(document).on("click", '#chkIsDefault', function () {
    if ($(this).is(':checked')) {
        $("#ddlProject").val(0);
        $("#ddlProject").prop('disabled', true);
        ValidatorEnable($("[id$=rfvddlProject]")[0], false);
    }
    else {
        $("#ddlProject").prop('disabled', false);
        ValidatorEnable($("[id$=rfvddlProject]")[0], true);
    }
});

$(document).on("click", "#Nobtn", function () {
    $("#AddEditQuestionDialog").dialog("close");
    _doPostBack("QuestionID ", flag);
});
$(document).on("click", "#Yesbtn", function () {
    ClearQuestionControls();
    $("#divAddmoreQue").hide();
    GetProjectList();
    $("#btnQuestionSave").attr("disabled", false);
});

