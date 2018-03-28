$(document).ready(function () {

    if ($("select").hasClass("chosen-select")) {
        $(".chosen-select").chosen();
    }
    if ($("select").hasClass("chzn-select")) {
        $(".chzn-select").chosen();
    }
    //$("#ddlCompany").trigger('chosen:updated')
    //jQuery(".company-dropdown").unbind();
    $(".company-dropdown").change(function () {
        var ddlCompany = $(this);
        var ddlBranch = $('#ddlBranch');
        FillBranch(ddlCompany, ddlBranch);
    })
    //$(".holiday-edit").unbind();
    $(document).on("click", ".holiday-edit", function () {

        var editElement = $(this);
        var Id = $(editElement).attr("data-HolidayMappingId");
        var SplitedBunchHolidayId = Id.split('_');
        var HolidayListMappingID = SplitedBunchHolidayId[1];
        var thistr = editElement.closest('tr');
        //var divHolidayList = $(thistr).find('#HolidayList')
        //var HolidayListId = $(divHolidayList).attr('data-FieldId');
        //var divCompany = $(thistr).find('#Company')
        //var CompanyId = $(divCompany).attr('data-FieldId');
        //var divBranch = $(thistr).find('#Branch')
        //var BranchId = $(divBranch).attr('data-FieldId');
        //var divShift = $(thistr).find('#Shift')
        //var ShiftId = $(divShift).attr('data-FieldId');
        SetValueOfEditedRecord(HolidayListMappingID);
        $("html, body").animate({ scrollTop: 0 }, 600);

    })
    //$(".holiday-save").unbind();
    $(document).on("click", ".holiday-save", function () {
        $('.errorsummary').hide();
        var $form = $(this).closest('form');
        var ddlHoliday = $("#ddlHolidayList");
        var Company = $('#ddlComapny');
        var Branch = $('#ddlBranch');
        var Shift = $('#ddlShift');
        var HolidayListMappingId = $('#hdnHolidayMappingId').val();

        var HolidayList = $("#ddlHolidayList").val();
        var CompanyId = $("#ddlComapny").val();
        var BranchId = $("#ddlBranch").val();
        var ShiftId = $("#ddlShift").val();

        var IsValid = ValidateHoliday(ddlHoliday, Company, Branch, Shift)
        var IsExist = true;
        var IsOverwriteMapping = false, IsMappingChanged = true;
        if (IsValid) 
        {
            if (IsHolidayGroupMappingExists(HolidayList, CompanyId, BranchId, ShiftId, HolidayListMappingId)) {
                $.ajax({
                    type: "POST",
                    url: '/HolidayLists/IsMappingExist',
                    contentType: 'application/json;charset=utf-8',
                    async: false,
                    data: JSON.stringify({ HolidayListId: HolidayList, CompanyId: CompanyId, BranchId: BranchId, ShiftId: ShiftId, HolidayListMappingId: HolidayListMappingId }),
                    success: function (data) {
                        $('.errorsummary').hide();
                        if (data > 0) {
                            
                            IsExist = data;
                            if (confirm("This Holiday Mapping Already Exist. Present Holiday Group mapping will be deactivated and newly added one will be effective. Do you want to processed?")) {
                                IsOverwriteMapping = true;
                            }
                            else {
                                IsOverwriteMapping = false;
                            }
                            //$("#HolidayListForm")[0].reset();
                            //$('#hdnHolidayMappingId').val("");
                            //$('.chosen-select').trigger('chosen:updated');
                            //$("#HolidayListForm")[0].reset();
                        }
                        else {
                            IsExist = 0;
                            IsOverwriteMapping = true;
                        }
                    }
                })
            }
            else {
                $('.errorsummary').html('');
                $('.errorsummary').empty();
                var errorMessage = "";
                $('#errorMessage').empty();
                errorMessage += "<li>Cannot Add, as Same Mapping Exists.</li>";

                if (errorMessage != null) {
                    $('.errorsummary').show();
                    $('.errorsummary').html("<ul>" + errorMessage + "</ul>");
                }
            }
        }
       
        if (IsValid && IsOverwriteMapping) {
            if (IsExist > 0 && IsOverwriteMapping) {

                if (ActiveInactiveHolidayMapping(IsExist, Enum_Status_Inactive)) {
                    IsMappingChanged = true;
                }
                else {
                    IsMappingChanged = false;
                }
            }
            if (IsMappingChanged) {
                if (HolidayListMappingId == "") {
                    $.ajax({
                        type: "POST",
                        url: $form.attr('action'),
                        data: $form.serialize(),
                        success: function (data) {
                            
                            if (data) {
                                toastr.success("Holiday Assigned Successfully.");
                                ResetForm();
                                LoadGrid();
                            }
                            else {
                                toastr.error("Holiday Not Assigned Successfully.");
                                ResetForm();
                            }
                            //ResetForm();
                        }
                    })
                }
                else {

                    $.ajax({
                        url: '/HolidayLists/UpdateHolidayList',
                        type: 'POST',
                        contentType: 'application/json;charset=utf-8',
                        async: false,
                        data: JSON.stringify({ HolidayListMappingId: HolidayListMappingId, HolidayListId: ddlHoliday.val(), CompanyId: Company.val(), BranchId: Branch.val(), ShiftId: Shift.val() }),
                        dataType: 'json',
                        success: function (data) {
                            ResetForm();
                            LoadGrid();
                            if (data) {

                                toastr.success("Holiday Re-Assigned Successfully.");

                            }
                            else {
                                toastr.error("Holiday Not Assigned Successfully.");

                            }

                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log(jqXHR.responseText)
                        }
                    });
                }
            }
        }
    })


    //$(".holiday-delete").unbind();
    $(document).on("click", ".holiday-delete", function () {
        if (confirm('Are you sure , you want to delete record?')) {
            //$(this).closest('tr').remove();
            var deleteElement = $(this);
            var Id = $(deleteElement).attr("data-HolidayMappingId");
            var SplitedBunchHolidayId = Id.split('_');
            var HolidayListMappingID = SplitedBunchHolidayId[1];
            $.ajax({
                url: '/HolidayLists/DeleteHolidayList',
                type: 'POST',
                contentType: 'application/json;charset=utf-8',
                async: false,
                data: JSON.stringify({ HolidayListMappingId: HolidayListMappingID }),
                dataType: 'json',
                success: function (data) {
                    if (data) {
                        toastr.success("Holiday Deleted Successfully.");
                        ResetForm();
                        LoadGrid();
                    }
                    else {
                        toastr.error("Holiday Can Not Deleted Successfully.");
                        ResetForm();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.responseText)
                }
            });
        } else {

        }
    })

    $(document).on('click', '.HolidayListName', function () {

        var HolidayListId = $(this).attr("data-HolidayListId");

        GetHolidayGroupDetails(HolidayListId);
    })
    function GetDBMappedHolidays(HolidayListId) {
        $.ajax({
            url: '/HolidayLists/GetDBMappedHolidays',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify({ HolidayListId: HolidayListId }),
            dataType: 'json',
            async: false,
            success: function (data) {
                for (var i = 0; i < data.length; i++) {

                    if (data[i].Value != "")
                    {
                        var Holidaydate =moment(data[i].Value,"DD/MM/YYYY");
                        var Currentdate = moment();
                        if (Holidaydate.isBefore(Currentdate)) {
                            $('#isSelectedHoliday_' + data[i].Text).prop("disabled", true);
                            $('#isSelectedHoliday_' + data[i].Text).closest("tr").addClass("text-muted row-disabled");
                            $("tr.row-disabled td").attr("data-id", data[i].Text).find(".chkMandatory").addClass("disabled");
                        }                       
                    }
                    
                    $('#isSelectedHoliday_' + data[i].Text).attr('checked', 'checked');
                    var inputId = $('#isSelectedHoliday_' + data[i].Text).attr('data-inputFieldId');
                    $('[name="' + inputId + '"').val(data[i].Text);
                    
                    var IsInputChk = $('#isSelectedHoliday_' + data[i].Text).attr('data-inputChkField');
                    $('[name="' + IsInputChk + '"').val(true);
                }
                MentainCount();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText)
            }
        });
    }
    function MentainCount() {

        $("#tblHolidaygroups tbody tr").each(function () {
            var MandatoryChk = $(this).find('.chkMandatory');
            var Mandatory = $('#lblMandatoryCount').text();
            var Optional = $('#lblOptionalCount').text();
            if ($(this).find(".selectedChk").is(':checked')) {
                if ($(MandatoryChk).children().hasClass('fa fa-asterisk text-danger')) {
                    Mandatory = parseInt(Mandatory) + 1;
                    $('#lblMandatoryCount').text(Mandatory);
                    $('#lblOptionalCount').text(Optional);
                }
                else {
                    Optional = parseInt(Optional) + 1;
                    $('#lblMandatoryCount').text(Mandatory);
                    $('#lblOptionalCount').text(Optional);
                }
            }

        })
    }
    $(document).on('click', '#btnReset', function () {
        var HolidayListMappingID = $('#hdnHolidayMappingId').val();
        if (HolidayListMappingID == "")
            ResetForm();
        else
            SetValueOfEditedRecord(HolidayListMappingID);
    })
    //$('#btnCancel').unbind();
    $(document).on('click', '#btnCancel', function () {
        var HolidayListMappingID = $('#hdnHolidayMappingId').val();
        if (HolidayListMappingID == "")
            window.location = "../Dashboard/Index";
        else
            ResetForm();
    })

    $(document).on("click", ".holidayGroup-edit", function () {

        var HolidayListId = $(this).attr("data-HolidayListId");
        if (HolidayListId != "" && HolidayListId > 0) {
            ShowProgress();
            GetHolidayGroupDetails(HolidayListId);
            HideProgress();
        }
    });
    $(document).on("click", ".holidayGroup-delete", function () {

        var HolidayListId = $(this).attr("data-HolidayListId");
        if (HolidayListId != "" && HolidayListId > 0) {

            if (confirm('Are you sure , you want to delete record?')) {
                ShowProgress();
                $.ajax({
                    url: '/HolidayGroup/DeleteHolidayGroup',
                    type: 'POST',
                    contentType: 'application/json;charset=utf-8',
                    async: false,
                    data: JSON.stringify({ HolidayListId: HolidayListId }),
                    dataType: 'json',
                    success: function (data) {

                        if (data == "1") {
                            toastr.success("Holiday Group Deleted Successfully.");
                            LoadHolidayGroupGrid();
                        }
                        else if (data == "-1") {
                            toastr.error("Unable to delete this Holiday Group, as it is mapped.");
                        }
                        else {
                            toastr.error("Holiday Group can not be Deleted.");
                        }
                        HideProgress();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR.responseText)
                    }
                });
            }
        }
    });
    function GetHolidayGroupDetails(HolidayListId) {
        $.ajax({
            url: '/HolidayLists/FillDataInHolidayGroup',
            type: 'POST',
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify({ HolidayListId: HolidayListId }),
            dataType: 'html',
            async: false,
            success: function (data) {

                $('#NewHolidayListModal .modal-body').empty().html(data);
                GetDBMappedHolidays(HolidayListId);
                $("#tblHolidaygroups tbody tr").each(function () {
                    
                    var ClassName = $(this).find(".chkMandatory").children().attr("class");
                    if (ClassName.indexOf('text-danger') > 0) {
                        var selecteddchk = $(this).find(".selectedChk").attr('checked', 'checked');
                        var tdMandatory = $(this).find('.tdMandatory');
                        var inputId = $(tdMandatory).find('span').attr('data-inputFieldId');
                        $('[name="' + inputId + '"').val(true);
                    }

                })

                //$('#tblHolidays');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText)
            }
        });
    }

    //$(document).on("click", ".holiday-status", function () {

    //    var HolidayMappingId = $(this).attr("data-HolidayMappingId");
    //    var HolidayList = $(this).attr("data-HolidayListID");
    //    var CompanyId = $(this).attr("data-CompanyId");
    //    var BranchId = $(this).attr("data-BranchId");
    //    var ShiftId = $(this).attr("data-ShiftId");
    //    var StatusId = $(this).attr("data-statusId");
    //    if(HolidayMappingId != "" && HolidayMappingId > 0)
    //    {
    //        if (CheckIsMappingExist(HolidayList, CompanyId, BranchId, ShiftId, HolidayMappingId))
    //        {
    //            ShowProgress();
    //            if (ActiveInactiveHolidayMapping(HolidayMappingId, StatusId)) {
    //                toastr.success("Holiday Status is changed Successfully.");
    //                ResetForm();
    //                LoadGrid();
    //            }
    //            else {
    //                toastr.error("Holiday Status is not changed Successfully.");
    //            }
    //            HideProgress();
    //        }
            

            
    //    }
    //});

})

function SetValueOfEditedRecord(HolidayListMappingID) {
    $.ajax({
        url: '/HolidayLists/GetEditedHolidayList',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        async: false,
        data: JSON.stringify({ HolidayListMappingID: HolidayListMappingID }),
        dataType: 'json',
        success: function (data) {
            var ddlCompany = $('#ddlComapny');
            var ddlBranch = $('#ddlBranch');
            $('#ddlHolidayList').val(data.HolidayListId).trigger('chosen:updated');;
            $('#ddlComapny').val(data.CompanyId).trigger('chosen:updated');;
            FillBranch(ddlCompany, ddlBranch);
            $('#ddlBranch').val(data.BranchId).trigger('chosen:updated');;
            $('#ddlShift').val(data.ShiftId).trigger('chosen:updated');;
            $('#hdnHolidayMappingId').val(HolidayListMappingID);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText)
        }
    });
}
function FillBranch(ddlCompany, ddlBranch) {
    var selectedValues = $(ddlCompany).val();
    var strValues = selectedValues.toString();

    $.ajax({
        url: '/HolidayLists/FillBranch',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify({ company: strValues }),
        dataType: 'json',
        async: false,
        success: function (result) {
            $(ddlBranch).html(""); // clear before appending new list 
            $(ddlBranch).append($('<option></option>').val("").html("Please Select Branch"));
            $.each(result, function (i, branch) {
                $(ddlBranch).append(
                    $('<option></option>').val(branch.BranchId).html(branch.BranchName));
            });
            $(ddlBranch).trigger('chosen:updated');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText)
        }
    });
}
function LoadGrid() {
    $.ajax({
        url: '/HolidayLists/GetHolidayLists',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify({}),
        dataType: 'html',
        async: false,
        success: function (result) {
            $('#divHolidayMappingGrid').html(result);
            data_table_init();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText)
        }
    });
}
function ValidateHoliday(ddlHoliday, Company, Branch, Shift) {
    $('.errorsummary').html('');
    $('.errorsummary').empty();
    var errorMessage = "";
    var status = true;
    $('#errorMessage').empty();
    if (ddlHoliday.val() == "") {
        errorMessage += "<li>Please Select Holiday Group</li>";
        status = false;
    }
    if (Company.val() == "") {
        errorMessage += "<li>Please Select Company </li>";
        status = false;
    }
    //if (Branch.val() == "" || Branch.val() == null) {
    //    errorMessage += "<li>Please Select Branch</li>";
    //    status = false;
    //}
    //if (Shift.val() == "" || Shift.val() == null) {
    //    errorMessage += "<li>Please Select Shift</li>";
    //    status = false;
    //}
    if (Branch.val() == "" || Branch.val() == null) {
        errorMessage += "<li>Please Select Branch</li>";
        status = false;
    }
    if (status == false && errorMessage != null) {
        $('.errorsummary').show();
        $('.errorsummary').html("<ul>" + errorMessage + "</ul>");
    }

    return status;
}
function ResetForm() {
    $('.errorsummary').empty();
    $('#hdnHolidayMappingId').val("");
    $('.errorsummary').hide();
    $('.chosen-select').val('').trigger('chosen:updated');
    $("#HolidayListForm")[0].reset();
}
function LoadHolidayGroupGrid() {
    $.ajax({
        url: '/HolidayGroup/GetHolidayGroupLists',
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify({}),
        dataType: 'html',
        async: false,
        success: function (result) {
            $('#divHolidayGroupGrid').html(result);
            data_table_init();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText)
        }
    });
}
//-------Progress bar --------//
function HideProgress() {
    $('.loader-wrapper').css('display', 'none');
}

function ShowProgress() {

    if ($('.loader-wrapper').css('display') == "none") {
        $(".loader-wrapper").show();
    }
}

function ActiveInactiveHolidayMapping(HolidayMappingId,StatusId) {
    var result = true;
    $.ajax({
        type: "POST",
        url: '/HolidayLists/ActiveInactiveHolidayMapping',
        contentType: 'application/json;charset=utf-8',
        async: false,
        data: JSON.stringify({ HolidayMappingID: HolidayMappingId, StatusID: StatusId }),
        success: function (data) {
            if (data) {
                result = true;
            }
            else {
                result = false;
            }
        }
    });
    return result;
}

function IsHolidayGroupMappingExists(HolidayList, CompanyId, BranchId, ShiftId, HolidayListMappingId)
{
    var allowInsert = true;
    $.ajax({
        type: "POST",
        url: '/HolidayLists/IsHolidayGroupMappingExist',
        contentType: 'application/json;charset=utf-8',
        async: false,
        data: JSON.stringify({ HolidayListId: HolidayList, CompanyId: CompanyId, BranchId: BranchId, ShiftId: ShiftId, HolidayListMappingId: HolidayListMappingId }),
        success: function (data) {
            if (data > 0) {
                
                allowInsert = false;
            }
            else {
                allowInsert = true;
            }
        }
    })
    return allowInsert;
}