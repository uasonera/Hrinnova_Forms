$(document).ready(function () {
    var EnumNotificationType = { Email: 1, System: 2, Both: 3 };
    var NotificationType = $("#ddlNotificationtype").val();
    CKEDITOR.replace('txtDetailsForEmail');
    CKEDITOR.config.htmlEncodeOutput = true;
    CKEDITOR.config.height = 350;
    ShowHideNotificationEventType(NotificationType, EnumNotificationType);
    $(".list-fields li span").hover(function () {
        $(this).toggleClass("label-success");
    });
    $("#ddlNotificationtype").on('change', function () {
        var NotificationTypeId = $("#ddlNotificationtype").val();
        ClearDetailSubject();
        ShowHideNotificationEventType(NotificationTypeId, EnumNotificationType);
    });
    $("#btnSavenotification").click(function () {
        AddUpdateNotification();
    });
    $("#Closebtn").click(function () {
        location.href = "http://" + location.host + "/NotificationConfiguration/index";
    });
    $('#ulallfield li').click(function () {
        var li_item = $(this);
        var SelectedText = li_item.find('span.SelecteditemText').text();
        CKEDITOR.instances["txtDetailsForEmail"].insertText(" {" + SelectedText + "}");
    });
    $("#ddlSelectedSubject").on('change', function () {
        var selectedText = $("#ddlSelectedSubject option:selected").text();
        if (selectedText != "Select Field") {
            var Textbeforeappend = $("#txtSubjectForEmail").val();
            $("#txtSubjectForEmail").val(Textbeforeappend + " " + "{" + selectedText + "}");
        }
    });
    $("#ddlSelectedFieldTitle").on('change', function () {
        var selectedText = $("#ddlSelectedFieldTitle option:selected").text();
        if (selectedText != "Select Field") {
            var Textbeforeappend = $("#txtTitleForSystem").val();
            $("#txtTitleForSystem").val(Textbeforeappend + " " + "{" + selectedText + "}");
        }
    });
    $("#ddlDetailSelection").on('change', function () {
        var selectedText = $("#ddlDetailSelection option:selected").text();
        if (selectedText != "Select Field") {
            var Textbeforeappend = $("#txtDetailsForSystem").val();
            $("#txtDetailsForSystem").val(Textbeforeappend + " " + "{" + selectedText + "}");
        }
    });
});
function AddUpdateNotification() {
    if (ValidateNotification()) {
        var NotificationId = $("#NotificationId").val();
        var DetailsForEmail = htmlEncode(CKEDITOR.instances['txtDetailsForEmail'].getData());
        $("#txtDetailsForEmail").val(DetailsForEmail);
        var formdata = new FormData($('#frmnotification').get(0));
        $.ajax({
            url: "/NotificationConfiguration/SaveNotificationConfiguration",
            type: "POST",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (data) {
                if (NotificationId > 0) {
                    toastr.success("Notification has been updated successfully");
                }
                else {
                    toastr.success("Notification has been added successfully");
                }
                location.href = "http://" + location.host + "/NotificationConfiguration/index";
            }
        });

    }
}
function ValidateNotification() {
    debugger
    var status = true;
    $(".form-group").removeClass("has-error  has-feedback");
    var strErrorMessage = '';
    $('#errorMessage').html('');
    $('#errorMessage').hide();
    var NotificationTypeId = $("#ddlNotificationtype").val();
    var NotificationEvent = $("#ddlNotificationEvent").val();
    var EnumNotificationType = { Email: 1, System: 2, Both: 3 };
    debugger
    if (NotificationEvent == "") {
        strErrorMessage += "<li>Please Enter Event</li>";
        $("#ddlNotificationEvent").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (NotificationTypeId == "") {
        strErrorMessage += "<li>Please Enter Notification Type</li>";
        $("#ddlNotificationtype").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if ($('.assignees input[type=checkbox]:checked').length == 0) {
        strErrorMessage += "<li>Please Select at least one assignee</li>";
        $(".assignees").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (NotificationTypeId != "" && NotificationTypeId == EnumNotificationType.Email) {
        var Subject = $.trim($('#txtSubjectForEmail').val());
        var DetailsForEmail = CKEDITOR.instances['txtDetailsForEmail'].getData();
        if (Subject == "") {
            strErrorMessage += "<li>Please Enter Subject</li>";
            $("#txtSubjectForEmail").closest(".form-field").addClass("has-error  has-feedback");
            status = false;
        }
        if (DetailsForEmail == "") {
            strErrorMessage += "<li>Please Enter Email Details</li>";
            $("#txtDetailsForEmail").closest(".form-field").addClass("has-error  has-feedback");
            status = false;
        }
    }
    if (NotificationTypeId != "" && NotificationTypeId == EnumNotificationType.System) {
        var Title = $.trim($('#txtTitleForSystem').val());
        var DetailsForSystem = $.trim($('#txtDetailsForSystem').val());
        if (Title == "") {
            strErrorMessage += "<li>Please Enter Title</li>";
            $("#txtTitleForSystem").closest(".form-field").addClass("has-error  has-feedback");
            status = false;
        }
        if (DetailsForSystem == "") {
            strErrorMessage += "<li>Please Enter System Details</li>";
            $("#txtDetailsForSystem").closest(".form-field").addClass("has-error  has-feedback");
            status = false;
        }
    }
    if (NotificationTypeId != "" && NotificationTypeId == EnumNotificationType.Both) {
        var Subject = $.trim($('#txtSubjectForEmail').val());
        var Title = $.trim($('#txtTitleForSystem').val());
        var DetailsForEmail = CKEDITOR.instances['txtDetailsForEmail'].getData();
        var DetailsForSystem = $.trim($('#txtDetailsForSystem').val());
        if (Subject == "") {
            strErrorMessage += "<li>Please Enter Subject</li>";
            $("#txtSubjectForEmail").closest(".form-field").addClass("has-error  has-feedback");
            status = false;
        }
        if (Title == "") {
            strErrorMessage += "<li>Please Enter Title</li>";
            $("#txtTitleForSystem").closest(".form-field").addClass("has-error  has-feedback");
            status = false;
        }
        if (DetailsForEmail == "") {
            strErrorMessage += "<li>Please Enter Email Details</li>";
            $("#txtDetailsForEmail").closest(".form-field").addClass("has-error  has-feedback");
            status = false;
        }
        if (DetailsForSystem == "") {
            strErrorMessage += "<li>Please Enter System Details</li>";
            $("#txtDetailsForSystem").closest(".form-field").addClass("has-error  has-feedback");
            status = false;
        }
    }


    if (status == false && strErrorMessage != null) {
        $('#errorMessage').css('display', 'block');
        $('#errorMessage').html("<ul>" + strErrorMessage + "</ul>");
        $('ul li:empty').remove();
    }
    return status;
}
function ClearFormNotification() {
    $("#statusmasterModel").modal('hide');
    $('#statusmasterModelBody').empty();
    $('#txtstatusname').val('');
    $('#txtDescription').val('');
    $('#errorMessageAddEvent').empty();
}
function ListOfNotification() {
    $.ajax({
        url: '/StatusMaster/GetStatusList',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        //data: JSON.stringify({ StatusId: StatusId }),
        dataType: 'html',
        success: function (data) {
            if (data) {
                $('#divstatus').empty();
                $('#divstatus').html(data);
                data_table_init();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}
function ShowHideNotificationEventType(NotificationType, EnumNotificationType) {
    $(".form-group").removeClass("has-error  has-feedback");
    if (NotificationType == EnumNotificationType.Email) {
        $('.showhideemail').show(); // Shows
        $('.showhidesystem').hide();
    }
    else if (NotificationType == EnumNotificationType.System) {
        $('.showhideemail').hide(); // Shows
        $('.showhidesystem').show();
    }
    else if (NotificationType == EnumNotificationType.Both) {
        $('.showhideemail').show(); // Shows
        $('.showhidesystem').show();
    }
    else {
        $('.showhideemail').hide(); // Shows
        $('.showhidesystem').hide();
    }
}
function ClearDetailSubject() {
    $('.form-field').removeClass('has-error');
    $("#txtSubjectForEmail").val('');
    $("#txtTitleForSystem").val("");
    CKEDITOR.instances["txtDetailsForEmail"].setData(" ");
    $("#txtDetailsForSystem").val("");

}
function htmlEncode(html) {
    return document.createElement('a').appendChild(
        document.createTextNode(html)).parentNode.innerHTML;
};