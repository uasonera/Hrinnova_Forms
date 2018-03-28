function EvaluationNotes(d) {
    this.data = d;
};
$(document).ready(function () {   

    BindNotes(getParameterByName("EvaluationId"), getParameterByName("TeamMemberKRAId"), getParameterByName("EvaluationNotesType"));
    $('#btnSave').click(function () {
        if (Page_ClientValidate("vlGroup"))
            SaveEvaluationNotes(getParameterByName("EvaluationId"), getParameterByName("TeamMemberKRAId"), $("#txtTitle").val(), $("#txtDescription").val(), $("#ddlRating").val() == '' ? 0 : $("#ddlRating").val(), uploadFilePath, getParameterByName("EvaluationNotesType"));
        return false;
    });
});
function prepareslider(disabled) {
    var select = $("#ddlRating");
    var slider = $("<div id='slider'></div>").insertAfter(select).slider({
        min: 1,
        max: 6,
        range: "min",
        disabled: disabled,
        value: select[0].selectedIndex + 1,
        slide: function (event, ui) {
            select[0].selectedIndex = ui.value - 1;
        }
    });
    var ticks = $("#ddlRating option[value!='']");

    $(ticks).each(function (i) {
        var tick = $('<div class="tick ui-widget-content"><div class="label">' + $(this).html() + '</div></div>').appendTo(slider);
        tick.css({
            left: (100 / ticks.length * i) + '%',
            width: (100 / ticks.length) + '%'
        });
    })
    select.hide();
}
function BindNotes(EvaluationId, TeamMemberKRAId, EvaluationNotesType) {
    $.ajax({
        type: "Post",
        url: 'EvaluationNotes.aspx/GetNotes',
        data: "{ 'EvaluationId': " + EvaluationId + ", 'TeamMemberKRAId': " + TeamMemberKRAId + " , 'EvaluationNotesType': " + (EvaluationNotesType == "" ? 0 : EvaluationNotesType) + " }",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            if (result.d.lstNotes.length == 0) {
                $('#divTabs').hide();
            }
            else {
                $('#divTabs').show();
                ko.applyBindings(new EvaluationNotes(result.d.lstNotes));
                $("#divTabs").tabs();
                if (result.d.EvaluationNote)
                    BindForm(result.d.EvaluationNote);
            }
            if (!result.d.AllowUpdate)
                readonlyform();
            prepareslider(!result.d.AllowUpdate);
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}
function readonlyform() {
    $('#btnSave').attr('disabled', true);
    $('#btnSave').parent().addClass('bl-button');
    $('#btnSave').parent().removeClass('blue-button');
    $('#txtTitle').attr('disabled', true)
    $('#txtDescription').attr('disabled', true)
    $('#ddlRating').attr('readonly', true)
    $('#attach-files').attr('disabled', true)
    $('#ddlRating').attr('readonly', true)
    $('.deletefile').click(function () {
        $(this).attr('readonly', true)
    });
}
function BindForm(note) {
    $('#txtTitle').val(note.Title);
    $('#txtDescription').val(note.Description);
    $("#ddlRating").val(note.RatingValue);
    $('#filelist').html('<ul>')
    $(note.Files).each(function (index, value) {
        $('#filelist').append('<li><a target="_blank" href="' + value.FilePath + '">' + value.FileName + '</a> <a class="deletefile" filepath="' + note.EvaluationNoteId + '/' + value.FileName + '" href="javascript:;">delete</a></li> ');
    });
    $('#filelist').append('</ul>')

    $('.deletefile').click(function () {
        deletefile($(this));
    });

    //    $("#slider").slider("value", note.RatingValue);
}
function deletefile(elm) {
    if (!confirm('Are you sure to delete file : ' + $(elm).attr('filepath')))
        return;
    $.ajax({
        type: "Post",
        url: 'EvaluationNotes.aspx/DeleteEvaluationNoteFile',
        data: "{ 'FilePath': '" + $(elm).attr('filepath') + "' }",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            $(elm).parent().remove();
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}
function SaveEvaluationNotes(EvaluationId, TeamMemberKRAId, Title, Description, Rating, UploadFilePath, EvaluationNotesType) {
    //alert(EvaluationNotesType);
    $.ajax({
        type: "Post",
        url: 'EvaluationNotes.aspx/SaveEvaluationNotes',
        data: "{ 'EvaluationId': " + EvaluationId + ", 'TeamMemberKRAId': " + TeamMemberKRAId + ", 'Title': '" + Title + "', 'Description': '" + Description + "', 'Rating': '" + Rating + "', 'UploadFilePath': '" + UploadFilePath + "', 'EvaluationNoteType': " + (EvaluationNotesType == '' ? 0 : EvaluationNotesType) + " }",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            window.location.href = 'EvaluationNotes.aspx?' + (EvaluationNotesType == '' ? '' : ('EvaluationNotesType=' + EvaluationNotesType + '&')) + 'EvaluationId=' + EvaluationId + '&EvaluationId=' + EvaluationId + '&TeamMemberKRAId=' + TeamMemberKRAId;
        },
        error: function (response) {
            alert(response.responseText);
        }
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
function getParameterByName(name) {    
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
$(document).on('click', ".lnkAttachment", function () {    
    var thisid = $(this).attr("Id");    
    var substrId = thisid.substring(14);    
    $(this).attr('href', substrId, false)
    //$(this).href(substrId);
})
