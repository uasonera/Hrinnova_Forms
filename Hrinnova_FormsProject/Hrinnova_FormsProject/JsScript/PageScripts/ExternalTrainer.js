var Page = 1;

$(document).ready(function () {

    $('#btnAddExternalTrainerLink').click(function () {

        $('#btnSave').attr('data-TrainerId', 0);

        ClearPopUpData();
        OpenPopUpDialog(0);
    });

    $('#btnExternalCancel').click(function () {
        ClosePopUpDialog();
    });

    $('#btnBackToCalendarLink').click(function () {
        location.href = "http://" + location.host + "/trainingcalendar/index";
    });

    $("#btnSave").click(function () {

        SaveTrainerDetails($(this).attr("data-TrainerId"), false);
    });

    $("#btnContinue").click(function () {

        SaveTrainerDetails(0, true);

    });

    $(document).on('click', '.EditObjective', function () {

        var ExternalTrainerId = $(this).attr("data-externaltrainerid");
        //window.location.href = "/ExternalTrainer/EditExternalTrainer?ExternalTrainerId=" + ExternalTrainerId;

        var ExternalTrainerName = $(this).attr('data-ExternalTrainerName');
        var ContactNo = $(this).attr('data-ContactNo');
        var EmailId = $(this).attr('data-EmailId');
        var CompanyName = $(this).attr('data-CompanyName');
        var Website = $(this).attr('data-WebSite');
        var IsActive = $(this).attr('data-IsActive');

        ClearPopUpData();
        OpenPopUpDialog(ExternalTrainerId);


        $("#txtName").val(ExternalTrainerName);
        $("#txtContactNo").val(ContactNo);
        $("#txtEmail").val(EmailId);
        $("#txtCompanyName").val(CompanyName);
        $("#txtWebsite").val(Website);
        //$("#hdnExternalTrainerId").val("");
        if (IsActive == "True") {
            $('#chkIsactive').prop("checked", true);
        }
        else {
            $('#chkIsactive').prop("checked", false);
        }

        $('#btnSave').attr('data-TrainerId', ExternalTrainerId);


    });

    $("#btnExternalCancel").click(function () {
        //window.location.href = "/ExternalTrainer/ExternalTrainer?Page=1&ExternalTrainerId=";
        ClosePopUpDialog();
    });

    $(document).on('click', '.DeleteObjective', function () {

        if (confirm("Do you want to delete this record?")) {
            var ExternalTrainerId = $(this).attr("data-externaltrainerid");
            $.getJSON("/ExternalTrainer/DeleteExternalTrainer?ExternalTrainerId=" + ExternalTrainerId)
             .done(function (data) {
                 // toastr.success("Record deleted successfully.");
                 //window.location.href = "/ExternalTrainer/ExternalTrainer?Page=1&ExternalTrainerId=";
                 if (data == "External Trianer already in use. External Trianer could not be deleted.") {
                     toastr.remove();
                     toastr.warning(data);
                 }
                 if (data != "External Trianer already in use. External Trianer could not be deleted.") {
                     toastr.remove();
                     toastr.success(data);
                 }
                 LoadGridData(null, 1);
             });
        }
    });

    $(document).on('click', '.imgActiveInactive', function () {
        var id = $(this).attr("id");
        var dataisactive = $(this).attr("data-isactive");
        var IsActive = false;

        if (dataisactive.toLowerCase() == "false")
            IsActive = true;

        var ExternalTrainerId = $(this).attr("data-externaltrainerid");
        $.getJSON("/ExternalTrainer/ActiveInactive?ExternalTrainerId=" + ExternalTrainerId + "&IsActive=" + IsActive)
            .done(function (data) {
                $("#" + id).attr("data-isactive", IsActive);
                if (IsActive) {
                    $("#" + id).attr('title', 'Inactive');
                    $("#" + id).html('<i class="fa fa-times text-danger"></i>');
                }
                else {
                    $("#" + id).attr('title', 'Active');
                    $("#" + id).html('<i class="fa fa-check text-success"></i>');
                }
                LoadGridData("", 1);
            });
    });


    $(document).on('click', '.page-number', function () {

        var pagenumber = $(this).attr("data-pagenumber");
        var ExternalTrainerId = $("#ddlExternalTrainer").val();
        //window.location.href = "/ExternalTrainer/ExternalTrainer?Page=" + pagenumber + "&ExternalTrainerId=" + ExternalTrainerId;
        LoadGridData(ExternalTrainerId, pagenumber);

    });

    $("#btnSearch").click(function () {
        var ExternalTrainerId = $("#ddlExternalTrainer").val();
        //window.location.href = "/ExternalTrainer/ExternalTrainer?Page=1&ExternalTrainerId=" + ExternalTrainerId;
        LoadGridData(ExternalTrainerId, 1);
    });

    $("#btnExternalReset").click(function () {
        LoadGridData(null, 1);
    });

});

function CheckTrainerName(Name, Id) {

    var status = false;

    $.ajax({
        url: "/ExternalTrainer/ValidateTrainerName",
        dataType: 'json',
        async: false,
        data: {
            ExternalTrainerId: Id,
            Name: Name.toString().trim()
        },
        success: function (data) {

            if (data == "true") {

                status = true;
            }
            else {
                status = false;
            }
        }
    });

    return status;
}

function SaveTrainerDetails(TrainerId, Continue) {

    $('#errorMessage').html('');
    $("#errorMessage").removeClass();
    $("#errorMessage").hide();
    $(".form-group").removeClass("has-error  has-feedback");
    var errorMessage = "";
    var status = true;
    var ExternalTrainerName = $("#txtName").val();
    var emailid = $("#txtEmail").val();

    if (ExternalTrainerName == '') {
        $('#errorMessage').addClass('alert alert-danger');
        $("#txtName").closest(".form-group").addClass("has-error  has-feedback");
        errorMessage += "<div class='errors'><ul><li>Please enter trainer name</li><ul></div>";
        status = false;
    }

    if ($('#txtContactNo').val().trim() != '' && !ValidatePhoneNumber($('#txtContactNo').val().trim())) {
        $('#errorMessage').addClass('alert alert-danger');
        $("#txtContactNo").closest(".form-group").addClass("has-error  has-feedback");
        errorMessage += "<div class='errors'><ul><li>Enter valid contact number</li><ul></div>";
        status = false;
    }

    if (emailid.trim() != '') {
        if (!isValidEmailAddress(emailid.trim())) {
            $('#errorMessage').addClass('alert alert-danger');
            $("#txtEmail").closest(".form-group").addClass("has-error  has-feedback");
            errorMessage += "<div class='errors'><ul><li>Enter valid email Id</li><ul></div>";
            status = false;
        }
    }

    if ($('#txtWebsite').val().trim() != '' && !CheckIsValidDomain($('#txtWebsite').val().trim())) {
        $('#errorMessage').addClass('alert alert-danger');
        $("#txtWebsite").closest(".form-group").addClass("has-error  has-feedback");
        errorMessage += "<div class='errors'><ul><li>Enter valid website</li><ul></div>";
        status = false;
    }



    if (status == false && errorMessage != null) {
        $('#errorMessage').html(errorMessage);
        $('#errorMessage').show();
        return false;
    }
    var checkSave = true;

    if (CheckTrainerName(ExternalTrainerName, TrainerId)) {
        $('#errorMessage').addClass('alert alert-danger');
        $("#CheckTrainerName").closest(".form-group").addClass("has-error  has-feedback");
        checkSave = confirm("Trainer with same name exists. Do you want to continue?");
    }

    if (checkSave) {
        $.getJSON("/ExternalTrainer/SaveExternalTrainer", {
            ExternalTrainerName: ExternalTrainerName,
            ContactNo: $("#txtContactNo").val(),
            EmailId: $("#txtEmail").val(),
            CompanyName: $("#txtCompanyName").val(),
            Website: $("#txtWebsite").val(),
            ExternalTrainerId: TrainerId,
            IsActive: $("#chkIsactive").is(":checked")
        })
      .done(function (data) {
          if (TrainerId == 0) {

              if (Continue) {
                  ClearPopUpData()
                  $('#errorMessage').removeClass('errors');
                  $('#errorMessage').show();
                  $('#errorMessage').addClass('alert alert-success');
                  $('#errorMessage').append("<div><ul class='no-margin'><li>Record Saved Sucessfully</li><ul></div>");
                  LoadGridData(null, 1);
              }
              else {
                  toastr.remove();
                  toastr.success("Record Saved Successfully");
                  ClosePopUpDialog();
                  LoadGridData(null, 1);
              }
          }
          else {
              ClosePopUpDialog();
              toastr.remove();
              toastr.success("Record Updated Sucessfully");
              LoadGridData(null, 1);
          }

      });
    }
}

function CheckIsValidDomain(domain) {
    var re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
    return domain.match(re);
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};

function OpenPopUpDialog(TrainerId) {
    //ClearPopUpData();
    var title;
    if (TrainerId == 0) {
        $(".modal-title").html("");
        $(".modal-title").html("Add External Trainer");
        
        $("#btnContinue").css("display", "normal");
    }
    else {
        $(".modal-title").html("");
        $(".modal-title").html("Edit External Trainer");
        $("#btnContinue").css("display", "none");
        $("#btnSave").val("Update");
    }

    $("#AddEditTrainerDialog").modal("show");
  
    return false;
}

function ClosePopUpDialog() {
    ClearPopUpData()
    $("#AddEditTrainerDialog").modal("hide");
}
$(".close").click(function () {
    ClearPopUpData()
    $("#AddEditTrainerDialog").modal("hide");
})
function ClearPopUpData() {
    $('.form-group').removeClass("has-error has-feedback");
    $("#txtName").val("");
    $("#txtContactNo").val("");
    $("#txtEmail").val("");
    $("#txtCompanyName").val("");
    $("#txtWebsite").val("");
    $("#hdnExternalTrainerId").val("");
    $("#chkIsactive").prop('checked', false);
    $("#errorMessage").hide();
    $("#btnSave").attr('data-TrainerId', 0).val("Save");
    $("#btnContinue").attr('data-TrainerId', 0).val("Save");
}
function LoadGridData(TrainerId, PageNumber) {
    $("#ddlExternalTrainer").val("")
    $("#ddlExternalTrainer").trigger("chosen:updated");
    $('#gridView').load('/ExternalTrainer/GetAllExternalTrainers?ExternalTrainerId=' + TrainerId + '&page=' + PageNumber);
    
}

function ValidatePhoneNumber(inputtxt) {
    var phoneno = /^\d{10}$/;
    if (inputtxt.match(phoneno)) {
        return true;
    }
    else {
        return false;
    }
}
