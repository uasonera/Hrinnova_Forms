
$(document).ready(function () {
    
    var cvdMailWithAttachment = $("#MainContent_chkMailWithAttachment").prop("checked");
    if (cvdMailWithAttachment) {
        $("#template-required").text("*");
    }
    else {
        $("#template-required").text("");
    }
    $("select[id*='ddlTemplateEmailList']").append(new Option('Select', 'Select'));
    $("select[id*='ddlTemplateAttachmentList']").append(new Option('Select', 'Select'));

    $("#MainContent_chkMailWithAttachment").change(function () {
        var checked = $(this).prop("checked");
        if (checked) {
            $("#template-required").text("*");
        }
        else {
            $("#template-required").text("");
        }

    });
});

$(function () {

    $('#btnPreviewTemplateMail').prop("disabled", true);
    $('#btnPreviewTemplateMail').addClass("disabled");
    $('#btnPreviewTemplateAttachment').prop("disabled", true);
    $('#btnPreviewTemplateAttachment').addClass("disabled");

    LoadTemplateTypesForMailMerge();

    //LoadTemplateTypesForMailAttachment();

    LoadDepartmentList();

    LoadDesignationList();

    LoadLocationList();

    LoadEmployeeList();

    SelectAll();



    // Load template list base on a template type
    $("select[id*='ddlTemplateTypeEmail']").change(function () {
        
        if ($(this).val() != 'Select') {
            LoadTemplateEmail($(this).val());

            LoadTemplateAttachment($(this).val());
        }

    });

    // Load template list base on a template type
    //            $("select[id*='ddlTemplateTypeAttachment']").change(function () {

    //                if ($(this).val() != 'Select') {
    //                    LoadTemplateAttachment($(this).val())
    //                }

    //            });

    // Fetch HtmlContent on a template mail list selection
    $("select[id*='ddlTemplateEmailList']").change(function () {

        if ($(this).val() != 'Select') {
            LoadTemplateEmailHtmlContent($(this).val())
            $('#btnPreviewTemplateMail').prop("disabled", false);
            $('#btnPreviewTemplateMail').removeClass("disabled");
            $('#btnEditTemplateMail').prop("disabled", false);
            $('#btnEditTemplateMail').removeClass("disabled");
            
          
        }
        else {
            $("#dialog-modal-mail-preview").html('');
            $('#btnPreviewTemplateMail').prop("disabled", true);
            $('#btnPreviewTemplateMail').addClass("disabled");
            $('#btnEditTemplateMail').prop("disabled", true);
            $('#btnEditTemplateMail').addClass("disabled");
            
        }

    });

    // Fetch HtmlContent on a template attachment list selection
    $("select[id*='ddlTemplateAttachmentList']").change(function () {

        if ($(this).val() != 'Select') {
            LoadTemplateAttachmentHtmlContent($(this).val())
            $('#btnPreviewTemplateAttachment').prop("disabled", false);
            $('#btnPreviewTemplateAttachment').removeClass("disabled");
            $('#btnEditTemplateAttachment').prop("disabled", false);
            $('#btnEditTemplateAttachment').removeClass("disabled");
          
        }
        else {
            $("#dialog-modal-attachment-preview").html('');
            $('#btnPreviewTemplateAttachment').prop("disabled", true);
            $('#btnPreviewTemplateAttachment').addClass("disabled");
            $('#btnEditTemplateAttachment').prop("disabled", true);
            $('#btnEditTemplateAttachment').addClass("disabled");
        }
    });

    // Button click to open preview dialog for email template
    $("input[id*='btnPreviewTemplateMail']").click(function () {
        //$("#dialog-modal-mail-preview").dialog("open");
    });


    // Button click to open preview dialog for attachment template
    $("input[id*='btnPreviewTemplateAttachment']").click(function () {
        //$("#dialog-modal-attachment-preview").dialog("open");
    });

    //// Dialog initialization
    //$("#dialog-modal-mail-preview").dialog({
    //    autoOpen: false,
    //    height: 500,
    //    width: 650,
    //    resizable: false,
    //    modal: true,
    //});

    //$("#dialog-modal-attachment-preview").dialog({
    //    autoOpen: false,
    //    height: 500,
    //    width: 650,
    //    resizable: false,
    //    modal: true,
    //});

});

// This function will load list of template type (only for mail merge templates)
function LoadTemplateTypesForMailMerge() {

    if ($("select[id*='ddlTemplateTypeEmail'] > option").length == 0) {

        $.ajax({
            type: 'POST',
            url: "../Admin/MailMerge.aspx/LoadTemplateType",
            async: false,
            contentType: 'application/json; charset=utf-8',
            data: {},
            dataType: "json",
            success: function (data) {
                $("select[id*='ddlTemplateTypeEmail']").append(new Option('Select', 'Select'));
                $.each(data.d, function (index, item) {
                    $("select[id*='ddlTemplateTypeEmail']").append(new Option(item.TypeDescription, item.TypeId));
                });
                $(".cssTemplateTypeEmail").addClass("chosen-select");

                if ($("select").hasClass("chosen-select")) {
                    $(".chosen-select").chosen({});
                }
            },
            error: function (data) {
                alert("Error Loading Template Type");
            }
        });
    }
}

// This function will load list of template type (only for mail merge templates)
function LoadTemplateTypesForMailAttachment() {

    if ($("select[id*='ddlTemplateTypeAttachment'] > option").length == 0) {

        $.ajax({

            type: 'POST',

            url: "../Admin/MailMerge.aspx/LoadTemplateType",

            async: false,

            contentType: 'application/json; charset=utf-8',

            data: {},

            dataType: "json",

            success: function (data) {
                $("select[id*='ddlTemplateTypeAttachment']").append(new Option('Select', 'Select'));

                $.each(data.d, function (index, item) {

                    $("select[id*='ddlTemplateTypeAttachment']").append(new Option(item.TypeDescription, item.TypeId));

                });
            },
            error: function (data) {
                alert("Error Loading Template Type");
            }
        });
    }
}

// This function will load list templates base on a template type
function LoadTemplateEmail(LookupId) {
    
    $.ajax({

        type: 'POST',

        url: "../Admin/MailMerge.aspx/LoadTemplate",

        async: true,

        contentType: 'application/json; charset=utf-8',

        data: '{"LookupId" : ' + LookupId + '}',

        dataType: "json",

        success: function (data) {
            
            $("select[id*='ddlTemplateEmailList']").empty();

            $("select[id*='ddlTemplateEmailList']").append(new Option('Select', 'Select'));

            $.each(data.d, function (index, item) {

                $("select[id*='ddlTemplateEmailList']").append(new Option(item.DisplayName, item.TemplateId));
            });
           
            //$(".css-TemplateEmailList").addClass("chosen-select");

            if ($("select").hasClass("chosen-select")) {
                $(".chosen-select").chosen({});
            }
            //$("select").trigger("liszt:updated");

        },
        error: function (data) {
            alert("Error Loading Template");
        }
    });
}

// This function will load list templates base on a template type
function LoadTemplateAttachment(LookupId) {

    $.ajax({

        type: 'POST',

        url: "../Admin/MailMerge.aspx/LoadTemplate",

        async: false,

        contentType: 'application/json; charset=utf-8',

        data: '{"LookupId" : ' + LookupId + '}',

        dataType: "json",

        success: function (data) {

            $("select[id*='ddlTemplateAttachmentList']").empty();

            $("select[id*='ddlTemplateAttachmentList']").append(new Option('Select', 'Select'));

            $.each(data.d, function (index, item) {

                $("select[id*='ddlTemplateAttachmentList']").append(new Option(item.DisplayName, item.TemplateId));

            });
            $(".css-TemplateAttachmentList").addClass("chosen-select");

            if ($("select").hasClass("chosen-select")) {
                $(".chosen-select").chosen({});
            }
        },
        error: function (data) {
            alert("Error Loading Template");
        }
    });
}

// This function will fetch HtmlContent for a selected template
function LoadTemplateEmailHtmlContent(TemplateId) {

    $.ajax({

        type: 'POST',

        url: "../Admin/MailMerge.aspx/LoadTemplateHtmlContent",

        async: false,

        contentType: 'application/json; charset=utf-8',

        data: '{"TemplateId" : ' + TemplateId + '}',

        dataType: "json",

        success: function (data) {

            $.each(data.d, function (index, item) {

                var decodedHtml = $('<div />').html(item.HtmlContent).text();

                $("#dialog-modal-mail-preview").html(decodedHtml);

            });

        },
        error: function (data) {
            alert("Error Loading Template");
        }
    });
}

// This function will fetch HtmlContent for a selected template
function LoadTemplateAttachmentHtmlContent(TemplateId) {

    $.ajax({

        type: 'POST',

        url: "../Admin/MailMerge.aspx/LoadTemplateHtmlContent",

        async: false,

        contentType: 'application/json; charset=utf-8',

        data: '{"TemplateId" : ' + TemplateId + '}',

        dataType: "json",

        success: function (data) {

            $.each(data.d, function (index, item) {

                var decodedHtml = $('<div />').html(item.HtmlContent).text();

                $("#dialog-modal-attachment-preview").html(decodedHtml);

            });

        },
        error: function (data) {
            alert("Error Loading Template");
        }
    });
}

// This function will load list of department
function LoadDepartmentList() {

    $.ajax({

        type: 'POST',

        url: "../Admin/MailMerge.aspx/LoadDepartmentList",

        async: false,

        contentType: 'application/json; charset=utf-8',

        data: {},

        dataType: "json",

        success: function (data) {

            $("select[id*='ddlDepartment']").empty();

            $("select[id*='ddlDepartment']").append(new Option('Select', 'Select'));

            $.each(data.d, function (index, item) {

                $("select[id*='ddlDepartment']").append(new Option(item.DepartmentName, item.DepartmentId));

            });
            $(".mailmerge-Department").addClass("chosen-select");

            if ($("select").hasClass("chosen-select")) {
                $(".chosen-select").chosen({});
            }
        },
        error: function (data) {
            alert("Error Loading Department");
        }
    });

}

// This function will load list of designation/role
function LoadDesignationList() {

    $.ajax({

        type: 'POST',

        url: "../Admin/MailMerge.aspx/LoadDesignationList",

        async: false,

        contentType: 'application/json; charset=utf-8',

        data: {},

        dataType: "json",

        success: function (data) {

            $("select[id*='ddlDesignation']").empty();

            $("select[id*='ddlDesignation']").append(new Option('Select', 'Select'));

            $.each(data.d, function (index, item) {

                $("select[id*='ddlDesignation']").append(new Option(item.RoleName, item.RoleId));

            });
            $(".mailmerge-Designation").addClass("chosen-select");

            if ($("select").hasClass("chosen-select")) {
                $(".chosen-select").chosen({});
            }
        },
        error: function (data) {
            alert("Error Loading Designation");
        }
    });

}

// This function will load list of location
function LoadLocationList() {

    $.ajax({

        type: 'POST',

        url: "../Admin/MailMerge.aspx/LoadLocationList",

        async: false,

        contentType: 'application/json; charset=utf-8',

        data: {},

        dataType: "json",

        success: function (data) {

            $("select[id*='ddlLocation']").empty();

            $("select[id*='ddlLocation']").append(new Option('Select', 'Select'));

            $.each(data.d, function (index, item) {

                $("select[id*='ddlLocation']").append(new Option(item.LocationName, item.LocationId));

            });
            $(".mailmerge-Location").addClass("chosen-select");

            if ($("select").hasClass("chosen-select")) {
                $(".chosen-select").chosen({});
            }
        },
        error: function (data) {
            alert("Error Loading Location");
        }
    });

}

// This function will load list of employee / new joinee 
function LoadEmployeeList() {

    var departmentId = $("select[id*='ddlDepartment']").val();

    if (departmentId == 'Select') {
        departmentId = null;
    }

    var designationId = $("select[id*='ddlDesignation']").val();

    if (designationId == 'Select') {
        designationId = null;
    }

    var locationId = $("select[id*='ddlLocation']").val();

    if (locationId == 'Select') {
        locationId = null;
    }

    var isEmployeeList = true;

    var postData = JSON.stringify(
                    {
                        employeeListRequest:
                          {
                              DepartmentId: departmentId,

                              DesignationId: designationId,

                              LocationId: locationId,

                              IsEmployeeList: isEmployeeList
                          }
                    }
                );

    $.ajax({

        type: 'POST',

        url: "../Admin/MailMerge.aspx/LoadEmployeeList",

        async: false,

        contentType: 'application/json; charset=utf-8',

        data: postData,

        dataType: "json",

        success: function (data) {
            
            custom_scroll_init();

            $("#divEmpListContainer .mCSB_container").empty();
            var json = JSON.parse(data.d);
            data.d = json;
            $("#tableTemplate").tmpl(data).appendTo("#divEmpListContainer .mCSB_container");
            setupCheckboxes();
            //$(".custom-scroll").mCustomScrollbar({
            //    axis: "y",
            //    theme: "light",
            //    scrollbarPosition: "inside",
            //    scrollInertia: 150,
            //    autoDraggerLength: true,
            //    autoExpandScrollbar: true,
            //    contentTouchScroll: true,
            //});
        }   ,
        error: function (data) {
            alert("Error Loading Template Type");
        }
    });

}

function SelectAll() {

    $('.subLink').click(function (event) {
        var targetId = event.target.id;
        var status = event.target.checked;

        if (targetId == 'MainContent_lnkSelectAll') {
            $('.classEmpList').prop('checked', true);
           
        }

        if (targetId == 'MainContent_lnkUnselectAll') {
            $('.classEmpList').prop('checked', false);
        }
    });

    $('.classEmpList').change(function () {
        var checkthis = $(this);

        if (checkthis.is(':checked')) {
            checkthis.attr('checked', true);

        } else {
            checkthis.attr('checked', false);
        }
    });
}

function SaveContent() {
    $("span[id*='lblMessage']").removeClass('alert alert-success');
    $("span[id*='lblMessage']").text('');
    $('#progressBar').find('div').removeAttr('style');

    //$('#progressMessage').empty();


    if (Page_ClientValidate("vlGroup")) {
        var counter = 0;

        var isErrorOccured = 0;

        var totalSelected = $('input[class*="classEmpList"]').filter(':checked').length;

        var totalAjaxCalls = totalSelected;

        var emailTemplateTypeId = $("select[id*='ddlTemplateTypeEmail']").val();
        var emailTemplateCategory = $('select[id*="ddlTemplateTypeEmail"] option:selected').text();

        var emailTemplateId = $("select[id*='ddlTemplateEmailList']").val();


        //var attachmentTemplateTypeId = $("select[id*='ddlTemplateTypeAttachment']").val();

        var attachmentTemplateTypeId = $("select[id*='ddlTemplateTypeEmail']").val();

        //var attachmentTemplateCategory = $('select[id*="ddlTemplateTypeAttachment"] option:selected').text();                

        var attachmentTemplateCategory = $('select[id*="ddlTemplateTypeEmail"] option:selected').text();

        var attachmentTemplateId = $("select[id*='ddlTemplateAttachmentList']").val();

        if (attachmentTemplateTypeId == 'Select') {
            attachmentTemplateTypeId = null;
        }

        if (attachmentTemplateId == 'Select') {
            attachmentTemplateId = null;
        }

        var sendEmailWithAttachment = false;

        if ($('input[id*="chkMailWithAttachment"]').prop('checked') == true) {
            sendEmailWithAttachment = true;
        }
        var SelectedEmployees='';
        $('input[class*="classEmpList"]').each(function (i) {
            if ($(this).prop('checked') == true) {
                SelectedEmployees = SelectedEmployees + "," + $(this).val();
            }
        });
        
          
               

                //var total = totalSelected;

                //var per = Math.round((counter * 100 / total));

                var postData = JSON.stringify(
                                                {
                                                    sendEmailRequest:
                                                      {
                                                          EmailTemplateTypeId: emailTemplateTypeId,

                                                          EmailTemplateCategory: emailTemplateCategory,

                                                          EmailTemplateId: emailTemplateId,


                                                          AttachmentTemplateTypeId: attachmentTemplateTypeId,

                                                          AttachmentTemplateCategory: attachmentTemplateCategory,

                                                          AttachmentTemplateId: attachmentTemplateId,


                                                          EmployeeId: SelectedEmployees.substring(1),

                                                          SendEmailWithAttachment: sendEmailWithAttachment
                                                      }
                                                }
                                            );

                //$('#progressMessage').text('Sending Mail(s)...');

                //$('#progressBar').find('div').attr("width", "0px");

                $.ajaxQueue({
                    type: 'POST',

                    url: "../Admin/MailMerge.aspx/SendMails",

                    async: true,

                    contentType: 'application/json; charset=utf-8',

                    data: postData,

                    dataType: "json",

                    success: function (data) {
                        
                            //ShowProgress(per, $('#progressBar'));

                           // totalAjaxCalls--;
                        
                           
                                $("span[id*='lblMessage']").addClass('alert alert-success');
                                $("span[id*='lblMessage']").text('E-mail(s) SENT successfully');

                                ClearValuesAfterSave();
                            
                        
                    },
                    error: function (data) {
                        totalAjaxCalls--;
                        alert("Error occurred while sending e-mail(s)");
                    }
                });

                return true;
            
       

        counter = 0;
    }
}

//function ShowProgress(percent, $element) {
//    var elementWidth = $element.width();

//    if (elementWidth == 0) {
//        elementWidth = 1;
//    }

//    var progressBarWidth = (percent * elementWidth) / 100;

//    $element.find('div').animate({ width: progressBarWidth }, 200).html(percent + "%");
//}

function CheckBoxListRequiredValidator(sender, args) {

    var isvalid_KeyWords = false;

    $('input[class*="classEmpList"]').each(function (i) {
        if ($(this).prop('checked') == true) {

            isvalid_KeyWords = true;

            return false;
        }
    });

    if (isvalid_KeyWords) {
        args.IsValid = true;
    }
    else {
        args.IsValid = false;
    }

    ValidatePage();

    return;
}

function CheckAttachmentTemplateSelectionValidation(sender, args) {

    var isvalid_KeyWords = false;


    if ($('input[id*="chkMailWithAttachment"]').prop('checked') == true) {
        if ($("select[id*='ddlTemplateAttachmentList']").val() == 'Select' || $("select[id*='ddlTemplateAttachmentList']").val() == null) {
            isvalid_KeyWords = false;
        }
        else {
            isvalid_KeyWords = true;

            return false;
        }
    }
    else {
        isvalid_KeyWords = true;

        return false;
    }


    if (isvalid_KeyWords) {
        args.IsValid = true;
    }
    else {
        args.IsValid = false;
    }

    ValidatePage();

    return;
}

function ClearValues() {
    $("select[id*='ddlTemplateTypeEmail']").val('Select').trigger("chosen:updated");

    //$("select[id*='ddlTemplateTypeAttachment']").val('Select');            


    $("select[id*='ddlTemplateEmailList']").val('Select').trigger("chosen:updated");

    $("select[id*='ddlTemplateAttachmentList']").empty();


    $(".classEmpList").prop('checked', false);

    $('input[id*="chkMailWithAttachment"]').prop('checked', false);

    $("#dialog-modal-mail-preview").html('');

    $("#dialog-modal-attachment-preview").html('');

    $('#progressBar').find('div').removeAttr('style');

    //$('#progressMessage').empty();
    $("#MainContent_vs").html('');
    $("#MainContent_vs").removeClass('alert alert-success');
    $('#MainContent_lblMessage').text('');
    $('#MainContent_lblMessage').removeClass('alert alert-success');
    $('#MainContent_lblMessage').removeClass('alert alert-warning');

    ClearSearchValues();
}

function ClearValuesAfterSave() {


    $("select[id*='ddlTemplateTypeEmail']").val('Select');

    //$("select[id*='ddlTemplateTypeAttachment']").val('Select');            


    $("select[id*='ddlTemplateEmailList']").val('Select');

    $("select[id*='ddlTemplateAttachmentList']").empty();


    $(".classEmpList").prop('checked', false);

    $('input[id*="chkMailWithAttachment"]').prop('checked', false);

    $("#dialog-modal-mail-preview").html('');

    $("#dialog-modal-attachment-preview").html('');

    $('#progressBar').find('div').removeAttr('style');

    //$('#progressMessage').empty();

    ClearSearchValues();
}

function ClearSearchValues() {

    $("select[id*='ddlDepartment']").val('Select').trigger("chosen:updated");

    $("select[id*='ddlDesignation']").val('Select').trigger("chosen:updated");

    $("select[id*='ddlLocation']").val('Select').trigger("chosen:updated");

    $("select[id*='ddlTemplateTypeEmail']").val('Select').trigger("chosen:updated");

    $("select[id*='ddlTemplateEmailList']").val('Select').trigger("chosen:updated");

    $("select[id*='ddlTemplateAttachmentList']").val('Select').trigger("chosen:updated");
    
    LoadEmployeeList();
}

function RedirectToModifyTemplate(TemplateType) {
    var TemplateId;

    if (TemplateType == 'Email') {
        TemplateId = $("select[id*='ddlTemplateEmailList']").val();
    }

    if (TemplateType == 'Attachment') {
        TemplateId = $("select[id*='ddlTemplateAttachmentList']").val();
    }

    if (TemplateId == 'Select' || TemplateId == null) {
        TemplateId = null;
    }

    $.ajax({

        type: 'POST',

        url: "../Admin/MailMerge.aspx/RedirectToModifyTemplate",

        async: false,

        contentType: 'application/json; charset=utf-8',

        data: '{"TemplateId" : ' + TemplateId + '}',

        dataType: "json",

        success: function (data) {
            if (data.d != '') {
                document.location.href = data.d;
            }

        },
        error: function (data) {
            alert("Error While Redirecting to Template Page");
        }
    });
}
