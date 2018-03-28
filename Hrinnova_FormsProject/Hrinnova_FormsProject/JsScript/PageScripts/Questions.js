var EnumAnsType = {
    "Descriptive": "1",
    "SingleSelection": "2",
    "MultpleSelection": "3"
};
var EnumRowStatus = {
    "OldRecord": 1,
    "NewRecord": 2
}

var OptionTexts = new Array();
var RemovedOptionTexts = [];

$(document).ready(function () {

    $("#divInputOptiontxt").hide();

    $(document).on("click", ".page-number", function () {
        var ProjId = $("#ddlAllProjectList").val();
        var QuestionText = $("#txtQuestionText").val();
        var IsDefault = $("#SearchChkIsDefault").prop("checked");
        page = parseInt($(this).html());
        $('#gridView').load('/Questions/GetAllQuestions?page=' + page + '&sortExpression=' + sortParameter + '&sortDirection=' + currentDirection, { ProjectId: ProjId, QuestionText: QuestionText, IsDefault: IsDefault });
        return false;
    });

    $(document).on('change', "#ddlAnswerType", function () {
        var selectedAnsType = $(this).val();
        if (selectedAnsType == EnumAnsType.SingleSelection || selectedAnsType == EnumAnsType.MultpleSelection) {
            $("#divInputOptiontxt").show();
        }
        else {
            $("#divInputOptiontxt").hide();

            if ($(this).val() == 1) {
                var obj = $("#dlListOptiontxt").children().find('input');
                if ($.isEmptyObject(obj)) {
                }
                else {
                    var thisStatus = $("#dlListOptiontxt").children().find('input').val();

                    if (thisStatus == EnumRowStatus.OldRecord) {
                        $("dd").each(function () {
                            var thisAnsId = $(this).find('button').attr('id');
                            var splitedId = thisAnsId.split('_');
                            var removedOptionId = splitedId[1];
                            RemovedOptionTexts.push(removedOptionId);
                        })
                    }
                    $("#dlListOptiontxt").empty();
                }
            }
        }
    })

    $(document).on('click', '.btnSaveAnsTxt', function () {
        var val = $("#inputtxtOptiontxt").val();
        var item = {};
        if (val == "") {
            alert("Please insert Option Text");
        }
        else {
            $("#dlListOptiontxt").append("<dd><span class='OptiontextVal' >" + val + "</span><input type='hidden' id='status' value='" + EnumRowStatus.NewRecord + "'>&nbsp;<button type='button' class='btnDeleteAnsTxt'>-</button> </dd>");
            $("#inputtxtOptiontxt").val("");
            item.OptionText = val;
            OptionTexts.push(item);
        }

    })

    $(document).on('click', '.btnDeleteAnsTxt', function () {        
        var thisStatus = $(this).parent().find('input').val();


        if (thisStatus == EnumRowStatus.OldRecord) {

            var thisAnsId = $(this).attr('id');
            var splitedId = thisAnsId.split('_');
            var removedOptionId = splitedId[1];

            RemovedOptionTexts.push(removedOptionId);
        }
        $(this).parent().remove();

    });
});

$(document).on('click', '#btnSearch', function () {
    
    var ProjId = $("#ddlAllProjectList").val();
    var QuestionText = $("#txtQuestionText").val().trim();
    var IsDefault = $("#SearchChkIsDefault").prop("checked");

    page = 1;
    $('#gridView').load('/Questions/GetAllQuestions?page=' + page + '&sortExpression=' + sortParameter + '&sortDirection=' + currentDirection, { ProjectId: ProjId, QuestionText: QuestionText, IsDefault: IsDefault });
    return false;
})

function InsertQuestion(isnew) {
    
    var requiredMsg = "";
    var txtque = $("#txtQuestion").val().trim();
    var ProjID = $("#ddlProject").val();
    var chkDefault = $("#chkIsDefault").prop('checked');
    var QuestionID = null;
    if (isnew) {
        $('#inpQuestionID').val(-1);
    }
    QuestionID = $('#inpQuestionID').val();
    var DefaultValFlag = false;
    if (chkDefault == false) {
        if ($("#ddlProject").val() == 0) {
            DefaultValFlag = true;
        }
    }

    if (txtque != null && txtque != "" && DefaultValFlag == false) {
        var a = OptionTexts;

        var projID = $("#ddlProject").val();
        var question = $("#txtQuestion").val().trim();
        var projStatusID = QuestionID;
        var IsMandatory = $("#chkIsMandatory").prop('checked');
        var IsDefault = $("#chkIsDefault").prop('checked');
        var AnsType = $("#ddlAnswerType").val();

        if ($("#ddlAnswerType").val() != EnumAnsType.Descriptive) {
            if (OptionTexts.length == 0) {
                requiredMsg = "Option Text is Required";
            }
        }

        if (requiredMsg.length == 0) {
        
            $.ajax({
                url: "/Questions/InsertQuestion",
                type: "POST",
                contentType: "application/json;charset=utf-8",

                data: JSON.stringify({ ProjID: projID, Question: question, IsDefault: IsDefault, ProjectStatusQueID: projStatusID, isNew: isnew, IsMandatory: IsMandatory, ObjOptionTexts: OptionTexts, AnsType: AnsType, removedOptionId: RemovedOptionTexts }),
                dataType: "json",
                success: function (returndata) {
                    var result = (returndata);
                    if (result.toLowerCase().indexOf("error") < 0) {
                        showSuccessMessage(isnew);
                        if (isnew) {
                            $("#divAddmoreQue").show();
                            $("#popUpForm").hide();
                            $("#AddEditQuestionDialog").css('height', dialogHeightMin);
                        }

                        $('#gridView').load('/Questions/GetAllQuestions?page=' + page + '&sortExpression=' + sortParameter + '&sortDirection=' + currentDirection);
                        if (isnew == false)
                            $("#AddEditQuestionDialog").dialog('close');

                    }
                    else {
                        showFailureMessage(isnew, response);
                    }
                },
                error: function (result) {
                }
            });
        }
        else {
            alert(requiredMsg);
        }

    }
}

function showSuccessMessage(isnew) {
    if (isnew)
        $('#addstatusMessage').show();
    else {
        $('#editstatusMessage').show();
    }
    return false;
}

$(document).on('change', '#ddlAllProjectList', function () {
    if ($(this).val() != 0) {
        $("#SearchChkIsDefault").prop('checked', false);

    }
});

$(document).on('change', '#SearchChkIsDefault', function () {
    if ($(this).prop('checked') == true) {
        $("#ddlAllProjectList").val("");
    }
});

$(document).on('click', '#btnReset', function () {
    $("#ddlAllProjectList").val("");
    $("#SearchChkIsDefault").prop('checked', false);
    $("#txtQuestionText").val("");
    var ProjId = $("#ddlAllProjectList").val();
    var QuestionText = "";
    var IsDefault = null;

    page = 1;
    $('#gridView').load('/Questions/GetAllQuestions?page=' + page + '&sortExpression=' + sortParameter + '&sortDirection=' + currentDirection, { ProjectId: ProjId, QuestionText: QuestionText, IsDefault: IsDefault });
    return false;
});

$(document).on("click", ".page-number", function () {
    var ProjId = $("#ddlAllProjectList").val();
    var QuestionText = $("#txtQuestionText").val();
    var IsDefault = $("#SearchChkIsDefault").prop("checked");
    page = parseInt($(this).html());
    $('#gridView').load('/Questions/GetAllQuestions?page=' + page + '&sortExpression=' + sortParameter + '&sortDirection=' + currentDirection, { ProjectId: ProjId, QuestionText: QuestionText, IsDefault: IsDefault });
    return false;
});

$(document).on('click', '#btnAddQuestionLink', function (e) {
    $("#divAddmoreQue").hide();
    $("#popUpForm").show();
    clearControls();
    OptionTexts = new Array();
    RemovedOptionTexts = [];
    $("#btnQuestionSave").val("Save");
    $("#btnQuestionSave").attr("disabled", false);
    $("#AddEditQuestionDialog").css("display", "block");
    $("#AddEditQuestionDialog").dialog({
        width: 600,
        height: 450,
        title: "Add Question",
        modal: true
    });
    return false;
});

function GetProjectList() {
    $.ajax({
        url: '/Questions/GetProjectList',
        type: "GET",
        success: function (jsonData) {
            ObjObjectiveList = jQuery.parseJSON(jsonData);
            $("#ddlProject").append($("<option></option>").val("0").html("Please select"));
            for (var i = 0; i < ObjObjectiveList.length; i++) {
                $("#ddlProject").append($("<option></option>").val(ObjObjectiveList[i].ProjectID).html(ObjObjectiveList[i].ProjectName));
                $("#ddlAllProjectList").append($("<option></option>").val(ObjObjectiveList[i].ProjectID).html(ObjObjectiveList[i].ProjectName));
            }
        },
        error: function (response) {
            alert('Some Error Occured. Please refresh the page and try again.');
        }
    });
}

$(document).on('click', '#btnAddQuestionLink', function (e) {
    $("#divAddmoreQue").hide();
    $("#popUpForm").show();
    clearControls();
    OptionTexts = new Array();
    RemovedOptionTexts = [];
    $("#btnQuestionSave").val("Save");
    $("#btnQuestionSave").attr("disabled", false);
    $("#AddEditQuestionDialog").css("display", "block");
    $("#AddEditQuestionDialog").dialog({
        width: 600,
        height: 450,
        title: "Add Question",
        modal: true
    });
    return false;
});

function GetProjectList() {
    $.ajax({
        url: '/Questions/GetProjectList',
        type: "GET",
        success: function (jsonData) {
            ObjObjectiveList = jQuery.parseJSON(jsonData);
            $("#ddlProject").append($("<option></option>").val("0").html("Please select"));
            for (var i = 0; i < ObjObjectiveList.length; i++) {
                $("#ddlProject").append($("<option></option>").val(ObjObjectiveList[i].ProjectID).html(ObjObjectiveList[i].ProjectName));
                $("#ddlAllProjectList").append($("<option></option>").val(ObjObjectiveList[i].ProjectID).html(ObjObjectiveList[i].ProjectName));
            }
        },
        error: function (response) {
            alert('Some Error Occured. Please refresh the page and try again.');
        }
    });
}

$(document).on('click', '#btnQuestionCancel', function (e) {
    clearControls();
    $("#AddEditQuestionDialog").dialog("close");
});


$(document).on('click', '#btnQuestionSave', function (e) {
    var isNew = false;
    if ($('#btnQuestionSave').val() == 'Save') {
        isNew = true;
    }
    if (validateInput()) {
        InsertQuestion(isNew);
    }
});

function EditQuestion(id) {
    $("#divAddmoreQue").hide();
    $("#popUpForm").show();
    clearControls();
    $("#btnQuestionSave").val("Update");
    $("#btnQuestionSave").attr("disabled", false);
    RemovedOptionTexts = [];
    OptionTexts = new Array();

    if (id != null && id != "0") {
        $.ajax({
            type: "GET",
            url: '/Questions/GetQuestionDetails',
            data: "QuestionID=" + id,
            success: function (jsonData, status) {
                var Obj = jQuery.parseJSON(jsonData);
                var tblQuestion = Obj.TblProjQue;
                var tblAnsOption = Obj.TblAnsOption;
                $("#txtQuestion").val(tblQuestion[0].QuestionText);
                if (tblQuestion[0].ProjectID != null) {
                    $("#ddlProject").val(tblQuestion[0].ProjectID);
                }
                else {
                    $("#ddlProject").val(0);
                    $("#ddlProject").prop('disabled', true);
                }
                if (tblQuestion[0].Value != null) {
                    $("#ddlAnswerType").val(tblQuestion[0].Value);
                }
    
                for (var i = 0; i < tblAnsOption.length; i++) {
                    if (tblAnsOption[i].OptionText != null) {
                        $("#dlListOptiontxt").append("<dd><span class='OptiontextVal' ><input type='hidden' id='status' value='" + tblAnsOption[i].Status + "'> " + tblAnsOption[i].OptionText + "</span>&nbsp;<button type='button'  id='btnDeleteAnsTxt_" + tblAnsOption[i].AnswerOptionID + "' class='btnDeleteAnsTxt'>-</button> </dd>");
                    }
                }

                $("#chkIsDefault").prop('checked', tblQuestion[0].IsDefault);
                $("#chkIsMandatory").prop('checked', tblQuestion[0].IsMandatory);
                $('#inpQuestionID').val(tblQuestion[0].ProjectStatusQuestionId);

                if ($("#ddlAnswerType").val() != EnumAnsType.Descriptive)
                    $("#divInputOptiontxt").show();
                else
                    $("#divInputOptiontxt").hide();
            },
            error: function (response) {
                alert('There was some error getting the Details.');
            }
        });
    }

    $("#AddEditQuestionDialog").dialog({
        width: 600,
        title: "Edit Question",
        modal: true

    });

    return false;
}

function DeleteQuestion(id) {
    $('#deleteConfirmation').show();
    $('#deleteStatus').text('');
    $('#deleteStatus').removeClass();
    $("#deletePopUp").show();
    $("#deletePopUp").dialog({
        width: 500,
        height: 100,
        title: "Delete Question",
        modal: true
    });
    $('#inpQuestionID').val(id);
    return false;
}

$(document).on("click", "#btnDeleteYes", function () {
    var id = $('#inpQuestionID').val();
    if (id != null && id != "0") {
        $.ajax({
            type: "POST",
            url: "/Questions/DeleteQuestionDetails",
            data: { QuestionID: id },
            success: function (response) {
                $("#deletePopUp").dialog('close');
                $("#deletePopUp").dialog({
                    width: 500,
                    height: 100,
                    title: "Delete Question",
                    modal: true,
                    open: function (event, ui) {
                        setTimeout(function () {
                           
                            $('#deletePopUp').dialog('destroy');
                            $('#deleteStatus').text('');
                        }, 1000);
                    }
                });
                $('#deleteConfirmation').hide();
                $('#deleteStatus').text(response);
                $('#gridView').load('/Questions/GetAllQuestions?page=' + page + '&sortExpression=' + sortParameter + '&sortDirection=' + currentDirection);
                $("#deletePopUp").css('height', 30);
                if (response.toLowerCase().indexOf("error") >= 0) {
                    $('#deleteStatus').addClass('validation-error');
                }
                else { $('#deleteStatus').addClass('validation-success'); }
            },
            error: function (response) {
                $("#deletePopUp").css('height', 30);
                $('#deleteConfirmation').hide();
                $('#deleteStatus').addClass('validation-error');
                $('#deleteStatus').text(response);
            }
        });
    }
    return false;
});

$(document).on("click", "#btnDeleteNo", function () {
    $("#deletePopUp").dialog("close");
});


$(document).on("click", '#chkIsDefault', function () {
    if ($(this).is(':checked')) {
        $("#ddlProject").val(0);
        $("#ddlProject").prop('disabled', true);
    }
    else {
        $("#ddlProject").prop('disabled', false);
    }
});

$(document).on("click", "#Nobtn", function () {
    $("#divAddmoreQue").hide();
    $("#AddEditQuestionDialog").dialog("close");
});

$(document).on("click", "#Yesbtn", function () {
    clearControls();
    $("#divAddmoreQue").hide();
    $("#popUpForm").show();
    $("#AddEditQuestionDialog").css('height', dialogHeightMax);
    $("#btnQuestionSave").attr("disabled", false);
});

function showFailureMessage(isnew, response) {
    $('#errorMessage').show();
    if (isnew)
        $('#errorMessage').text(response);
    else {
        $('#errorMessage').text(response);
    }
}

function validateInput() {
    var validationStatus = false;
    $('#errorMessage').html('');
    if (($('#ddlProject').val() == 0 || $('#ddlProject').val() == '') && ($("#chkIsDefault").prop('checked') == false)) {
        $('#errorMessage').show();
        $('#errorMessage').html("Please Select IsDefault Value or Provide Project Information.").append("<br/>");
    }
    else {
        $('#errorMessage').removeAttr('style');
        validationStatus = true;
    }
    if ($('#txtQuestion').val() == '') {
        $('#errorMessage').show();
        $('#errorMessage').append("Please Provide Question Text");
        validationStatus = false;
    }
    if (validationStatus == true) {
        clearStatusMessages();
    }
    return validationStatus;
}

function clearStatusMessages() {
    $('#editstatusMessage').hide();
    $('#addstatusMessage').hide();
    $('#errorMessage').hide();
}

function clearControls() {
    $("#txtQuestion").val("");
    $("#ddlProject").prop('disabled', false);
    $("#ddlProject").val(0);
    $("#chkIsDefault").attr('checked', false);
    $('#errorMessage').hide();
    $('#editstatusMessage').hide();
    $('#addstatusMessage').hide();
    $('#chkIsMandatory').prop('checked', false);
    $('#ddlAnswerType').val(0);
    $('#dlListOptiontxt').empty();
    $('#divInputOptiontxt').hide();

}

function Sleep(millis) {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while (curDate - date < millis);
}

function Sort(parameter, direction) {
    if (sortDirections[direction] == null)
        sortDirections[direction] = true;
    else { sortDirections[direction] = !sortDirections[direction]; }

    sortParameter = parameter;
    currentDirection = sortDirections[direction];
    var ProjId = $("#ddlAllProjectList").val();
    var QuestionText = $("#txtQuestionText").val();
    var IsDefault = $("#SearchChkIsDefault").prop("checked");
    
    $('#gridView').load('/Questions/GetAllQuestions?page=' + page + '&sortExpression=' + sortParameter + '&sortDirection=' + currentDirection, { ProjectId: ProjId, QuestionText: QuestionText, IsDefault: IsDefault });
    return false;
}



