$(document).ready(function () {
    disablechecking("PMO");
    disablechecking("Supervisor");
    disablechecking("legalauthority");
    
    $('input[name="PMO"]').click(function () {
        var currentId = $(this).attr('id');
        var checking = 1;
        $('input[name="PMO"]').each(function () {
            if ($(this).is(":checked")) {
                checking = 0;
                //$(this).attr("disabled", false);
            }
        });
        $('input[name="PMO"]').each(function () {
            if (!$(this).is(":checked") && checking == 0) {
                $(this).attr("disabled", true);
            }
            else {
                $(this).attr("disabled", false);
            }
        });
    });

    $('input[name="legalauthority"]').click(function () {
        var currentId = $(this).attr('id');
        var checking = 1;
        $('input[name="legalauthority"]').each(function () {
            if ($(this).is(":checked")) {
                checking = 0;
                //$(this).attr("disabled", false);
            }
        });
        $('input[name="legalauthority"]').each(function () {
            if (!$(this).is(":checked") && checking == 0) {
                $(this).attr("disabled", true);
            }
            else {
                $(this).attr("disabled", false);
            }
        });
    });

    $('input[name="Supervisor"]').click(function () {
        var checking = 1;
        $('input[name="Supervisor"]').each(function () {
            if ($(this).is(":checked")) {
                checking = 0;
                //$(this).attr("disabled", false);
            }
        });
        $('input[name="Supervisor"]').each(function () {
            if (!$(this).is(":checked") && checking == 0) {
                $(this).attr("disabled", true);
            }
            else {
                $(this).attr("disabled", false);
            }
        });
    });

    //For Senior Email Checkbox list
    $("#txtlegalAuthority").on("keyup", function () {

        var txtboxID = $(this);
        var chklistboxID = $('[name="legalauthority"]');
        if ($(txtboxID).val() != "") {

            $(chklistboxID).each(function () {
                $(this).closest('td').show();
            });

            $(chklistboxID).each(function () {

                var match = false;
                var CurrentLabel = $(this).next();

                if ($(CurrentLabel).text().toUpperCase().indexOf($(txtboxID).val().toUpperCase()) > -1) match = true;

                if (match) $(this).find('td').show();
                else $(this).closest('td').hide();
            });
        }
        else {

            $(chklistboxID).each(function () {
                $(this).closest('td').show();
            });
        }

    });
    //For Inc Timesheet Alert Checkbox list
    $("#txtpmoid").on("keyup", function () {
        var txtboxID = $(this);
        var chklistboxID = $('[name="PMO"]');
        if ($(txtboxID).val() != "") {

            $(chklistboxID).each(function () {
                $(this).closest('td').show();
            });

            $(chklistboxID).each(function () {

                var match = false;
                var CurrentLabel = $(this).next();

                if ($(CurrentLabel).text().toUpperCase().indexOf($(txtboxID).val().toUpperCase()) > -1) match = true;

                if (match) $(this).find('td').show();
                else $(this).closest('td').hide();
            });
        }
        else {

            $(chklistboxID).each(function () {
                $(this).closest('td').show();
            });
        }
    });
    // For PIN looked by Id
    $("#txtsupervisor").on("keyup", function () {
        var txtboxID = $(this);
        var chklistboxID = $('[name="Supervisor"]');
        if ($(txtboxID).val() != "") {

            $(chklistboxID).each(function () {
                $(this).closest('td').show();
            });

            $(chklistboxID).each(function () {
                var match = false;
                var CurrentLabel = $(this).next();
                if ($(CurrentLabel).text().toUpperCase().indexOf($(txtboxID).val().toUpperCase()) > -1) match = true;
                if (match) $(this).find('td').show();
                else $(this).closest('td').hide();
            });
        }
        else {
            $(chklistboxID).each(function () {
                $(this).closest('td').show();
            });
        }
    });

    $("#txtalert").on("keyup", function () {
        var txtboxID = $(this);
        var chklistboxID = $('[name="Alert"]');
        if ($(txtboxID).val() != "") {

            $(chklistboxID).each(function () {
                $(this).closest('td').show();
            });

            $(chklistboxID).each(function () {

                var match = false;
                var CurrentLabel = $(this).next();

                if ($(CurrentLabel).text().toUpperCase().indexOf($(txtboxID).val().toUpperCase()) > -1) match = true;

                if (match) $(this).find('td').show();
                else $(this).closest('td').hide();
            });
        }
        else {

            $(chklistboxID).each(function () {
                $(this).closest('td').show();
            });
        }
    });

    $('#btnSave').click(function () {
        ShowProgress();
        AddUpdateStatus();
        HideProgress();
    })

    $('#btnReset').click(function () {
        window.location.href = '/ConfigurationMaster/index';
        //$('#statusMesage').html('');
        //window.location.reload();
    });

    $('#btnCancel').click(function () {
        window.location.href = '/ConfigurationMaster/index';
    });

    function AddUpdateStatus() {
        var ID = $("#ID").val();
        var formdata = new FormData($('#frmconfigurationmaster').get(0));
        if (ValidateConfigurationmaster()) {
            $.ajax({
                url: "/ConfigurationMaster/SaveConfiguraionmaster",
                type: "POST",
                data: formdata,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data) {
                        if (ID > 0) {
                            toastr.success("Configuration has been updated successfully");
                        }
                        else {
                            toastr.success("Configuration has been updated successfully");
                        }
                    }
                    else {
                        toastr.error("There is problem while updating Configuraion Master");
                    }
                }
            });
        }
    }
    setupCheckboxes();
});


function disablechecking(name) {
    var checking = 1;
    var naming = "input[name = " + name + "]";
    $(naming).each(function () {
        if ($(this).is(":checked")) {
            checking = 0;
        }
    });
    $(naming).each(function () {
        if (!$(this).is(":checked") && checking == 0) {
            $(this).attr("disabled", true);
        }
        else {
            $(this).attr("disabled", false);
        }
    });
}

function ShowProgress() {

    if ($('.loader-wrapper').css('display') == "none") {
        $(".loader-wrapper").show();
    }
}

function HideProgress() {
    $('.loader-wrapper').css('display', 'none');
}

function ValidateConfigurationmaster() {
    var status = true;
    $(".form-group").removeClass("has-error  has-feedback");
    var ApprovaltimeforPMOLegal = $.trim($('#txtApprovaltimeforPMOLegal').val());
    var ApprovaltimeforSupervisor = $.trim($('#txtApprovaltimeforSupervisor').val());
    var strErrorMessage = '';
    $('#Validation').html('');
    $('#Validation').hide();

    if (!validateCheckBoxList("PMO")) {
        strErrorMessage += "<li>Please Select PMO</li>";
        $("#txtpmoid").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }

    if (!validateCheckBoxList("legalauthority")) {
        strErrorMessage += "<li>Please Select Legal Authority</li>";
        $("#txtlegalAuthority").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }

    if (!validateCheckBoxList("Supervisor")) {
        strErrorMessage += "<li>Please Select Supervisor</li>";
        $("#txtsupervisor").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (!validateCheckBoxList("Alert")) {
        strErrorMessage += "<li>Please Select Alert</li>";
        $("#txtalert").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }

    if (ApprovaltimeforPMOLegal == "" || ApprovaltimeforPMOLegal <= 0) {
        strErrorMessage += "<li>Please Enter Approvaltime for PMO/Legal</li>";
        $("#txtApprovaltimeforPMOLegal").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }
    if (ApprovaltimeforSupervisor == "") {
        strErrorMessage += "<li>Please Enter Approvaltime for Supervisor</li>";
        $("#txtApprovaltimeforSupervisor").closest(".form-group").addClass("has-error  has-feedback");
        status = false;
    }

    if (status == false && strErrorMessage != null) {
        $('#Validation').css('display', 'block');
        $('#Validation').html("<ul>" + strErrorMessage + "</ul>");
        $('ul li:empty').remove();
    }
    return status;
}

function validateCheckBoxList(naming) {
    var isAnyCheckBoxChecked = false;
    var checkBoxes = document.getElementsByName(naming);
    for (var i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].type == "checkbox") {
            if (checkBoxes[i].checked) {
                isAnyCheckBoxChecked = true;
                break;
            }
        }
    }
    return isAnyCheckBoxChecked;
}



var setupCheckboxes = function () {
    // Checkbox Styling
    $('input[type=checkbox]').each(function () {
        if (!$(this).parent().hasClass('checkbox')) {
            if ($(this).css('display') != "none") {

                $(this).next('label').andSelf().wrapAll('<div class="checkbox checkbox-primary"></div>')
                var $this = $(this);

                if ($(this).siblings('label').length == 0) {
                    $(this).parent().addClass("no-text");
                    $('<label class="" for=' + $(this).attr('id') + '></label>').insertAfter($this)
                }

                $this.attr("name");
                var id = $(this).attr('id');

                var dispalyStatusOfControl = "";
                if ($this.css('display') == "block" || $this.css('display') == ("inline-block")) {
                    dispalyStatusOfControl = "true";
                }
                else {
                    dispalyStatusOfControl = "false";
                }
                var label = $(this).next('#' + id);
                //console.log(label.attr('for'));
                //var parentTable = $(this).parent('td').parent('tr').parent('tbody').parent('table');
                //var isCheckBoxApply = true;
                //if (parentTable != undefined) {
                //    if (parentTable.attr('id') == 'MainContent_chkListEmp') {
                //        isCheckBoxApply = true;
                //    }
                //    if (parentTable.closest('div').attr('id') != undefined) {
                //        if (parentTable.closest('div').attr('id').indexOf("tViewParentTask") >= 0) {
                //            isCheckBoxApply = true;
                //        }
                //    }
                //}
                //if (isCheckBoxApply == true) {
                if (dispalyStatusOfControl == "true") {

                    //$('<label class="checkbox-custom-label" for=' + id + '></label>').insertAfter($this);
                }
                else {
                    //$('<label class="checkbox-custom-label" style="display:none" for=' + id + '></label>').insertAfter($this);
                }

                //else {
                //    $(this).attr('style', 'opacity:1;position:relative');
                //}
            }
            else {
                return true;
            }
        }
    });

    // Radio Styling
    $('input[type=radio]').each(function () {
        if (!$(this).parent().hasClass('radio')) {
            if ($(this).css('display') != "none") {

                $(this).next('label').andSelf().wrapAll("<div class='radio radio-primary'></div>");
                var $this = $(this);
                if ($(this).siblings('label').length == 0) {
                    $('<label class="" for=' + $(this).attr('id') + '></label>').insertAfter($this)
                }
                $this.attr("name");
                var id = $(this).attr('id');
                //$('<label class="radio-custom-label" for=' + id + '></label>').insertAfter($this);
            }

            else {
                return true;
            }
        }
    });

};