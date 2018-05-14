var evaluationform, actionform;
var KRAEvaluationModel = {
    data: ko.observable(),
    actiondata: ko.observableArray([]),
    EditAction: function (data, event) {
        var Id = event.target.id;
        $("#hdnActionId").val(Id);
        $("#btnSave").val('Update');
        EditActionPlan(Id);
    },
    DeleteAction: function (data, event) {
        var DltAcnPln = confirm('Are you sure you want to delete this Action Plan?');
        if (DltAcnPln) {
            DeleteActionPlan(event.target.id);
        }
    },
    CloseAction: function (data, event) {
        var clsAcnPln = confirm('Are you sure you want to close this Action Plan?');
        if (clsAcnPln) {
            CloseActionPlan(event.target.id);
        }
    },
};
function CloseActionPlan(Id) {
    var Eval_ID = getParameterByName("EvaluationId");
    $.ajax({
        type: "POST",
        url: 'ProjectKRA.aspx/CloseActionPlan',
        data: "{ 'ActionID': " + Id + ",'EvaluationId':" + Eval_ID + "}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            KRAEvaluationModel.actiondata(result.d);
            actionform.clearform();
        }
    });
}
function DeleteActionPlan(Id) {
    var Eval_ID = getParameterByName("EvaluationId");
    $.ajax({
        type: "POST",
        url: 'ProjectKRA.aspx/DeleteActionPlan',
        data: "{ 'ActionID': " + Id + ",'EvaluationId':" + Eval_ID + "}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            KRAEvaluationModel.actiondata(result.d);
            actionform.clearform();
        }
    });
}
function EditActionPlan(Id) {
    $.ajax({
        type: "POST",
        url: 'ProjectKRA.aspx/GetActionPlanDetails',
        data: "{ 'ActionID': " + Id + "}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {

            var ActionPlanData = jQuery.parseJSON(result.d);
            var date = GetDate(ActionPlanData[0].PlannedDate);
            $("#ddlResponsible").val(ActionPlanData[0].ResponsiblePerson);
            $("#txtAction").val(ActionPlanData[0].Action);
            $("#MainContent_txtplannedDate_txtToEventDate").val(date);
        }
    });

}
function GetDate(CombinedDate) {
    if (CombinedDate != undefined) {
        var SplittedDate = CombinedDate.split('T')[0].split('-');
        return SplittedDate[1] + "/" + SplittedDate[2] + "/" + SplittedDate[0];
    }
}
function getResponsibleperson(id) {
    return $("#ddlResponsible option[value=" + id + "]").text();
}
$(document).ready(function () {
    VerifyUser(getParameterByName("EmployeeId"), getParameterByName("EvaluationId"));
    BindProjectData(getParameterByName("EvaluationId"), getParameterByName("EmployeeId"));
    $('#sharewithsupervisor').click(function () {
        ShareEvaluation(getParameterByName("EvaluationId"), getParameterByName("EmployeeId"));
    });
    $('#submitforevaluation').click(function () {
        ShareEvaluation(getParameterByName("EvaluationId"), getParameterByName("EmployeeId"));
    });
    $('#divTabs').tabs();
    evaluationform = new _evaluationform();
    actionform = new _actionform();
    $('#saveevaluation').click(evaluationform.saveevaluation);

    $(document).on("mouseover", ".popUpClass", function () {
        var offset, top, left;
        var $this = $(this);
        offset = $this.offset();
        var hgt = $(".popUpContainer").height();

        if (hgt < 60) {
            top = offset.top - 220;
            top = (top > 0) ? top : 0;
        }
        else {
            top = offset.top - 230;
            top = (top > 0) ? top : 0;
        }
        left = offset.left - 190;
        left = (left > 0) ? left : 0;

        $(this).next(".popUpContainer").show().css({ top: top, left: left });

        //    $(this).next(".popUpContainer").show() 
    });
    $(document).on("mouseout", ".popUpClass", function () {
        $(this).next(".popUpContainer").hide()

    });
    $(document).on("mouseover", ".popUpContainer", function () {
        $(this).show();
    });
    $(document).on("mouseout", ".popUpContainer", function () {
        $(this).hide();

    });
    //                                        var offset, top, left;
    //                                        var $this = $(this);
    //                                        offset = $this.offset();
    //                                        top = offset.top - 50;
    //                                        top = (top > 0) ? top : 0;
    //                                        left = offset.left + 20;
    //                                        left = (left > 0) ? left : 0;
    //                                        $(this).next(".popUpContainer").show().css({ top: top, left: left });

    //    $(this).next(".popUpContainer").show() 

    //                            function () { $(this).next(".popUpContainer").hide() }

    //    $(".popUpContainer").hover(
    //                                function () { $(this).show() },
    //                                function () { $(this).hide() }

    //                     );
});
function VerifyUser(EmployeeId, EvaluationId) {
    if (EmployeeId == "")
        EmployeeId = 0;
    // if (EmployeeId != "") {
    $.ajax({
        type: "POST",
        url: 'ProjectKRA.aspx/VerifyUser',
        data: "{ 'EmployeeId': " + EmployeeId + ",'KraEvalID':" + EvaluationId + "}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            var jsonresult = result.d;
            var IsSupervisor = jsonresult[0];
            var IsTeamMember = jsonresult[1];

            if (IsSupervisor == "true") {
                $("#NotesCaption").html("Supervisor Evaluation Notes :");
                // $("#btnSelfEvalNote").val("Supervisor Evaluation Notes");
            }
            else {
                $("#NotesCaption").html("Self Evaluation Notes :");
                //$("#btnSelfEvalNote").val("Self Evaluation Notes");
            }
            if (IsTeamMember == "true") {
                $("#btnSelfEvalNote").removeAttr('disabled');
            }
            else {
                $("#btnSelfEvalNote").attr('disabled', true);
            }
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
    //}
}
function ShareEvaluation(EvaluationId, EmployeeId) {
    if (!confirm('Once evaluation submitted further modification will not be allowed. Are you sure?'))
        return;
    $.ajax({
        type: "POST",
        url: 'ProjectKRA.aspx/UpdateProjectEvaluation',
        data: "{ 'EvaluationId': " + EvaluationId + ",'EmployeeId': " + (EmployeeId == "" ? 0 : EmployeeId) + "}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            if (result.d == true) {
                alert('Evaluation submitted. No further modification allowed.');
            }
            window.location.href = 'ProjectKRA.aspx?EvaluationId=' + EvaluationId + '&EmployeeId=' + EmployeeId;
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}
function BindProjectData(EvaluationId, EmployeeId) {
    $.ajax({
        type: "POST",
        url: 'ProjectKRA.aspx/GetProjDetails',
        data: "{ 'EvaluationId': " + EvaluationId + ",'EmployeeId': " + (EmployeeId == "" ? 0 : EmployeeId) + "}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            if (result.d == null)
                window.location.href = 'projectlist_new.aspx';
            KRAEvaluationModel.data = result.d;
            ko.applyBindings(KRAEvaluationModel);
            $('.kpimenu').click(
            function (elm) {
                $('.kpicontent').hide();
                $('#TeamMemberKRAId-' + $(this).attr('TeamMemberKRAId')).show();
                VerifyUser(EmployeeId, EvaluationId);
            }
            );
            $('.kpimenu')[0].click()
            $('.notesanchor').click(function () { opennotesdialog($(this).attr('EvaluationId'), $(this).attr('TeamMemberKRAId')); });
            $('.evaluationnotesanchor').click(function () { opennotesdialog($(this).attr('EvaluationId'), $(this).attr('TeamMemberKRAId'), true); });

            prepareslider();

            evaluationform.bindform(result.d.Status == 4);
            actionform.prepareform();
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}

function prepareslider() {

    $('.slider div').each(function () {
        $(this).slider({
            min: 0,
            max: 5,
            range: "min",
            value: $(this).prev()[0].selectedIndex,
            slide: function (event, ui) {
                $(this).prev()[0].selectedIndex = ui.value - 1;
            },
            start: function (event, ui) {
                if ($(ui.handle).hasClass('stay'))
                    return false;
            }
        });
        //        var ticks = $(value).find("option[value!='']");

        //        $(ticks).each(function (i) {
        //            var tick = $('<div class="tick ui-widget-content"><div class="label">' + $(this).html() + '</div></div>').appendTo(slider);
        //            tick.css({
        //                left: (100 / ticks.length * i) + '%',
        //                width: (100 / ticks.length) + '%'
        //            });
        //        })
        $('.slider div').prev().hide();
        $(this).parent().find('.ui-slider-handle').each(function (index, value) {
            $(value).addClass('handler' + index);
            $(value).addClass('stay');

        });
    });
}
ko.bindingHandlers.date = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor();
        var allBindings = allBindingsAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(value);

        // Date formats: http://momentjs.com/docs/#/displaying/format/
        var pattern = allBindings.format || 'dd/MM/yyyy';
        var output = "-";
        if (valueUnwrapped !== null && valueUnwrapped !== undefined && valueUnwrapped.length > 0) {
            output = new Date(parseInt(valueUnwrapped.substr(6))).format(pattern);
        }

        if ($(element).is("input") === true) {
            $(element).val(output);
        } else {
            $(element).text(output);
        }
    }
};
function UpdateActionPlan(ActionID) {
    
    var actionplan = new Actionplan();
    actionplan.Action = $('#txtAction').val();
    actionplan.ResponsiblePerson = $('#ddlResponsible').val();
    actionplan.PlannedDate = $('.planneddate input').val();
    actionplan.ActionPlanId = parseInt(ActionID);
    actionplan.Status = 0;
    var Eval_ID = getParameterByName("EvaluationId");
    $.ajax({
        type: "POST",
        url: 'ProjectKRA.aspx/UpdateActionPlan',
        data: "{ 'EvaluationId': " + Eval_ID + ",'actionplan': " + JSON.stringify(actionplan) + "}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            KRAEvaluationModel.actiondata(result.d);
            actionform.clearform();
            $("#hdnActionId").val('');
            $("#btnSave").val('Save');
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}
function opennotesdialog(EvaluationId, TeamMemberKRAId, EvaluationNotesType) {
    $("<div id='evaluationnotes' style='padding: 0px;'><iframe style='width:100%;height:100%' src='EvaluationNotes.aspx?" + (EvaluationNotesType ? "EvaluationNotesType=1&" : "") + "EvaluationId=" + EvaluationId + "&TeamMemberKRAId=" + TeamMemberKRAId + "'></iframe> </div>").dialog({
        width: 1010,
        height: 600,
        draggable: false,
        resizable: false,
        title: "Notes",
        modal: true,
        close: function (event, ui) {
            $('#evaluationnotes').remove();
            window.location.reload();
        }
    });
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var _evaluationform = function () {

    this.bindform = function (readonly) {

        if (readonly) {
            $('#evaluation textarea').each(function () {
                $(this).attr('disabled', true);
                $("#saveevaluation").parent().removeClass('blue-button');
                $("#saveevaluation").parent().addClass('bl-button');
            });

            $('#evaluation input').each(function () {
                $(this).attr('disabled', true);
            });
        }

        $('.evaluationslider div').each(function () {
            //var ratings = [2,3,4];//= [1,2,3,4,5,6];
            var ratings = [];//= [1,2,3,4,5,6];
            ratings.push($(this).prev()[0].selectedIndex);

            $.each($(this).parent().find('.rating'), function (index, value) {
                // alert("value " + $(value).attr('rating'))
                if (parseInt($(value).attr('rating')))
                    ratings.push(parseInt($(value).attr('rating')));
                // alert("hi  "+parseInt($(value).attr('rating')));
            });
            //ratings.push(parseInt(6));

            $(this).slider({
                min: 0,
                max: 5,
                range: "min",
                values: ratings,
                slide: function (event, ui) {
                    if ($(ui.handle).hasClass('stay'))
                        return false;
                    else
                        $(this).prev()[0].selectedIndex = ui.value;
                    //$(this).prev()[0].selectedIndex = ui.value - 1;
                },
                start: function (event, ui) {
                    if ($(ui.handle).hasClass('stay'))
                        return false;
                }
            });

            $(this).prev().hide();


            $(this).parent().find('.ui-slider-handle').each(function (index, value) {
                $(value).addClass('handler' + index);
                if (index != 0 || readonly)
                    $(value).addClass('stay');

            });

        });

        $('.kpirow :first').find('.creatorcell').each(function (index, value) {
            $('#title').append('<td class="creator' + (index + 1) + '">' + $(this).attr('creator') + '</td>');
        });
        $('#title').append('<td class="creator0">Evaluation</td>');
        $('#title').append('<td>Ratings</td>');
    }
    this.saveevaluation = function () {
        var EvaluationId = getParameterByName("EvaluationId");
        var EmployeeId = getParameterByName("EmployeeId");

        var lstnotes = [];
        var isFormValid = true;
        $('.notedescription').each(function (index, value) {
            var note = new EvaluationNote();
            //var rating = $('#rating_' + note.TeamMemberKRAId).val();

            note.Description = $(this).val();
            note.TeamMemberKRAId = $(this).attr('TeamMemberKRAId');
            note.Rating = $('#rating_' + note.TeamMemberKRAId).val();
            // alert(note.Rating);
            lstnotes.push(note);

            if (note.Description == '') {
                alert('Enter Evaluation description');
                $(this).focus();
                isFormValid = false;
                return false;
            }
            if (note.Rating == '') {
                alert('Select Evaluation rating');
                $(this).focus();
                isFormValid = false;
                return false;
            }
        });

        if (!isFormValid)
            return false;

        if (!confirm('Once evaluation submitted further modification will not be allowed. Are you sure?'))
            return;
        $.ajax({
            type: "POST",
            url: 'ProjectKRA.aspx/CompleteEvaluationCycle',
            data: "{ 'EvaluationId': " + EvaluationId + ",'EmployeeId': " + (EmployeeId == "" ? 0 : EmployeeId) + ",'lstEvaluationNote': " + JSON.stringify(lstnotes) + "}",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (result) {
                if (result.d == true) {
                    alert('Evaluation submitted. No further modification allowed.');
                }
                window.location.href = 'ProjectKRA.aspx?EvaluationId=' + EvaluationId + '&EmployeeId=' + EmployeeId + '#actions';
                window.location.reload();
            },
            error: function (response) {
                alert(response.responseText);
            }
        });

    }

}
var EvaluationNote = function () {
    this.Description = null;
    this.Rating = null;
    this.KPIId = null;
}


var Actionplan = function () {
    this.Action = null;
    this.ActionPlanId = null;
    this.ResponsiblePerson = null;
    this.PlannedDate = null;
    this.Status = null;
}

var _actionform = function () {
    this.EvaluationId = getParameterByName("EvaluationId"),
    this.EmployeeId = getParameterByName("EmployeeId"),
    this.prepareform = function () {
        $('#btnSave').click(this.saveform);

        $.ajax({
            type: "POST",
            url: 'ProjectKRA.aspx/GetActionPlans',
            data: "{ 'EvaluationId': " + actionform.EvaluationId + "}",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (result) {
                KRAEvaluationModel.actiondata(result.d);
                //window.location.reload();
            },
            error: function (response) {
                alert(response.responseText);
            }
        });
    },
    this.clearform = function () {
        $('#txtAction').val('');
        $('#ddlResponsible').val('');
        //$('.planneddate input').val('');
        $("#MainContent_txtplannedDate_txtToEventDate").val('');
        //$('<%= txtToEventDate.ClientID %>').val('');
        //$('<%= hdnSelectedDate.ClientID %>').val('');

    },
    this.saveform = function () {

        if (!Page_ClientValidate("vlGroup"))
            return false;

        if ($("#hdnActionId").val() != '') {
            UpdateActionPlan($("#hdnActionId").val());
        }
        else {

            var actionplan = new Actionplan();
            actionplan.Action = $('#txtAction').val();
            actionplan.ResponsiblePerson = $('#ddlResponsible').val();
            actionplan.PlannedDate = $('.planneddate input').val();
            actionplan.ActionPlanId = parseInt(1);
            actionplan.Status = 0;

            $.ajax({
                type: "POST",
                url: 'ProjectKRA.aspx/SaveActionPlan',
                data: "{ 'EvaluationId': " + actionform.EvaluationId + ",'actionplan': " + JSON.stringify(actionplan) + "}",
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                success: function (result) {
                    KRAEvaluationModel.actiondata(result.d);
                    alert("Action Plan has been saved successfully");
                    actionform.clearform();
                },
                error: function (response) {
                    alert(response.responseText);
                }
            });
        }
    }
}

function PopupInstance() {



}