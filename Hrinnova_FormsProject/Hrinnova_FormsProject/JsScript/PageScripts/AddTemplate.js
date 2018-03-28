$(function () {
    $('#btnPreviewLetterHead').prop("disabled", true);

    LoadDashboardContentType();

    LoadLetterHeadTemplateList();

    // Load letter head template html content to editor 
    $("select[id*='drpLetterHead']").change(function () {

        if ($(this).val() != 'Select') {
            $('#btnPreviewLetterHead').prop("disabled", false);
            LoadTemplateEmailHtmlContent($(this).val())
        }
        else {

            $("#modal-letter-head-preview").html('');
            $('#btnPreviewLetterHead').prop("disabled", true);
        }

    });

    // Dialog initialization
    //$("#dialog-modal-letter-head-preview").dialog({
    //    autoOpen: false,
    //    height: 500,
    //    width: 700,
    //    resizable: false,
    //    modal: true
    //});

    // Button click to open preview dialog for letter head template
    //$("button[id*='btnPreviewLetterHead']").click(function () {
    //    $("#modal-letter-head-preview").dialog("open");
    //});

});

function LoadDashboardContentType() {

    if ($("select[id*='drpDashboardContentType'] > option").length == 0) {

        $.ajax({

            type: 'POST',

            url: "../Admin/AddTemplate.aspx/LoadDashboardContentType",

            async: false,

            contentType: 'application/json; charset=utf-8',

            data: {},

            dataType: "json",

            success: function (data) {

                $("select[id*='drpDashboardContentType']").empty();

                $("select[id*='drpDashboardContentType']").append(new Option('Select', 'Select'));

                $.each(data.d, function (index, item) {

                    $("select[id*='drpDashboardContentType']").append(new Option(item.TypeDescription, item.TypeId));

                });
                $("select[id*='drpDashboardContentType']").addClass("chosen-select");
                if ($("select").hasClass("chosen-select")) {
                    $(".chosen-select").chosen({

                    });
                }
            },
            error: function (data) {
                alert("Error Loading Dashboard Content Type");
            }
        });
    }
}

function LoadLetterHeadTemplateList() {

    if ($("select[id*='drpLetterHead'] > option").length == 0) {

        $.ajax({

            type: 'POST',

            url: "../Admin/AddTemplate.aspx/LoadLetterHeadTemplateList",

            async: false,

            contentType: 'application/json; charset=utf-8',

            data: {},

            dataType: "json",

            success: function (data) {

                $("select[id*='drpLetterHead']").empty();

                $("select[id*='drpLetterHead']").append(new Option('Select', 'Select'));

                $.each(data.d, function (index, item) {

                    $("select[id*='drpLetterHead']").append(new Option(item.TypeDescription, item.TypeId));

                });
            },
            error: function (data) {
                alert("Error Loading Letter Head Template List");
            }
        });
    }
}

// This function will fetch HtmlContent for a selected template
function LoadTemplateEmailHtmlContent(TemplateId) {

    $.ajax({

        type: 'POST',

        url: "../Admin/AddTemplate.aspx/LoadTemplateHtmlContent",

        async: false,

        contentType: 'application/json; charset=utf-8',

        data: '{"TemplateId" : ' + TemplateId + '}',

        dataType: "json",

        success: function (data) {

//            $.each(data.d, function (index, item) {

//                var decodedHtml = $('<div />').html(item.HtmlContent).text();
//                
//                tinyMCE.activeEditor.setContent(decodedHtml);

            //            });

            $.each(data.d, function (index, item) {

                var decodedHtml = $('<div />').html(item.HtmlContent).text();
              

                $("#modal-letter-head-preview").html(decodedHtml);

            });

        },
        error: function (data) {
            alert("Error Loading Template");
        }
    });
}

function DisplayValues(LookupTypeId,LetterHeadTemplateId, TemplateName, TemplateDescription, IsDefault, IsContainsMultipleData) {

    LoadDashboardContentType();

    LoadLetterHeadTemplateList();

    $("input[id*='txtTemplateName']").val(TemplateName);

    $("textarea[id*='txtDescription']").val(TemplateDescription);

    $("select[id*='drpDashboardContentType']").val(LookupTypeId).trigger("chosen:updated");;

    $("select[id*='drpLetterHead']").val(LetterHeadTemplateId);

    IsDefault = IsDefault.toLowerCase() == 'false' ? false : true;

    $("#chkDefaultTemplate").prop('checked', IsDefault);

    IsContainsMultipleData = IsContainsMultipleData.toLowerCase() == 'false' ? false : true;

    $("#chkMultipleData").prop('checked', IsContainsMultipleData);

    //tinyMCE.activeEditor.setContent(HtmlContent);
}

function CheckValidation() {

                        var htmlContent = tinyMCE.activeEditor.getContent();
                        if (htmlContent == '') {
                          return false;
                        }                
             return true;
}

function SaveContent() {

    var validationResult = CheckValidation();

    var lookupTemplateId = $("input[id*='hdnLookUpTemplateId']").val();
    $("span[id*='lblMessage']").removeClass('alert alert-success');
    $("span[id*='lblMessage']").removeClass('alert alert-warning');
    if (!validationResult) {

        $("span[id*='lblMessage']").addClass('alert alert-warning');
        $("span[id*='lblMessage']").text('Empty template not allowed');
        return false;
    }

        if (Page_ClientValidate("vlGroup")) {
            var templateName = $("input[id*='txtTemplateName']").val();

            var templateDescription = $("textarea[id*='txtDescription']").val();

            var templateTypeId = $("select[id*='drpDashboardContentType']").val();

            var letterHeadTemplateId = $("select[id*='drpLetterHead']").val();

            if (letterHeadTemplateId == 'Select' || letterHeadTemplateId == '') {

                letterHeadTemplateId = null;

            }

            var isDefaultTemplate = $("#chkDefaultTemplate").is(':checked');

            var isContainsMultipleData = $("#chkMultipleData").is(':checked');

            var htmlContent = tinyMCE.activeEditor.getContent();

            var postData = JSON.stringify(
                                                    { templateInsertRequest:
                                                        {
                                                            TemplateId: lookupTemplateId,

                                                            LookupTemplateId: templateTypeId,

                                                            LetterHeadTemplateId: letterHeadTemplateId,

                                                            DisplayName: templateName,

                                                            Description: templateDescription,

                                                            HtmlContent: htmlContent,

                                                            IsDefault: isDefaultTemplate,

                                                            IsContainsMultipleData: isContainsMultipleData
                                                        }
                                                    }
                                                );

                                                    $.ajax({

                                                        type: 'POST',

                                                        url: "../Admin/AddTemplate.aspx/InsertUpdate",

                                                        async: false,

                                                        contentType: 'application/json; charset=utf-8',

                                                        data: postData,

                                                        dataType: "json",

                                                        success: function (data) {
                                                            if (data.d == "success") {

                                                                $("span[id*='lblMessage']").addClass('alert alert-success');

                                                                if (lookupTemplateId > 0) {
                                                                    $("span[id*='lblMessage']").text('Record UPDATED successfully');
                                                                    var url = "../Admin/SearchTemplate.aspx?MessageData=" + encodeURIComponent("Record UPDATED successfully");
                                                                    window.location.href = url
                                                                }
                                                                else {
                                                                    $("span[id*='lblMessage']").text('Record SAVED successfully');
                                                                    var url = "../Admin/SearchTemplate.aspx?MessageData=" + encodeURIComponent("Record SAVED successfully");
                                                                    window.location.href = url
                                                                }

                                                                ClearValuesAfterSave();
                                                            }
                                                            else if (data.d == "table") {
                                                                $("span[id*='lblMessage']").addClass('alert alert-warning');
                                                                $("span[id*='lblMessage']").text('Table required for template with multiple record');
                                                            }
                                                            else if (data.d == "exists") {

                                                                $("span[id*='lblMessage']").addClass('alert alert-warning');
                                                                $("span[id*='lblMessage']").text('Record already exists');
                                                            }
                                                        },
                                                        error: function (data) {
                                                            alert("Error while trying to save template");
                                                        }
                                                    });


            return true;
        }
}

function ClearValues() {
    var PageMode=$("input[id*='hdnpageMode']").val();
    if (PageMode == "Add") {
        $("input[id*='txtTemplateName']").val('');

        $("textarea[id*='txtDescription']").val('');

        $("select[id*='drpDashboardContentType']").val('Select').trigger("chosen:updated");;

        $("#chkDefaultTemplate").prop('checked', false);

        $("#chkMultipleData").prop('checked', false);

        tinyMCE.activeEditor.setContent('');

        $('#MainContent_vs').html('');

        $("span[id*='lblMessage']").removeClass('alert alert-success');
        $("span[id*='lblMessage']").removeClass('alert alert-warning');
        $("span[id*='lblMessage']").text('');
        window.location.reload();
        $(window).scrollTop(0);
    }
    else
    {
        window.location.reload();
        $(window).scrollTop(0);
    }

}

function ClearValuesAfterSave() {


    $("input[id*='txtTemplateName']").val('');

    $("textarea[id*='txtDescription']").val('');

    $("select[id*='drpDashboardContentType']").val('Select').trigger("chosen:updated");;

    $("#chkDefaultTemplate").prop('checked', false);

    $("#chkMultipleData").prop('checked', false);

    tinyMCE.activeEditor.setContent('');

    $('#MainContent_vs').html('');

}