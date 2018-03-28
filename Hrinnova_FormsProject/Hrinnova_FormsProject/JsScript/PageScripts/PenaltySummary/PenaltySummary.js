$(document).ready(function () {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);

    var StartDate = moment(firstDay).format('MM/DD/YYYY');
    var EndDate = moment(lastDay).format('MM/DD/YYYY');

    $("#FromDate").datepicker('setDate', StartDate).on('changeDate', function (ev) {
        $('#FromDate').datepicker('hide');
    });
    $("#ToDate").datepicker('setDate', EndDate).on('changeDate', function (ev) {
        $('#ToDate').datepicker('hide');
    });
    datatableInitialize();

    //$('#tblPenaltySummary').on('page', function () { alert('page') });
    $('#tblPenaltySummary').on('draw.dt', function () {
        var tbody = $('#tblPenaltySummary > tbody');
        $(tbody).children().each(function () {
            var itag = $(this).children().find('i')
            if ($(itag).hasClass('fa-minus-square')) {
                $(itag).removeClass('fa-minus-square')
                $(itag).addClass('fa-plus-square')
            }
        })
    });
    $(document).on("click", ".paginate_button", function () {
        $("tbody tr td").find("i.fa-minus-square").parent().click();
    })

    $(document).on("keydown", ".penalty-override-penalty", function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
            // Allow: Ctrl+A, Command+A
          (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
          (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }

    });
    $("#btnSearch").click(function () {
        SearchData();
        $('#tblPenaltySummary').each(function () {
            dt = $(this).dataTable();
            dt.fnDestroy();
        })
        datatableInitialize();

        //data_table_init();
    })
    $(document).on('click', '.chkList', function () {
        if ($(this).is(":checked") == true) {
            var PenaltyId = $(this).attr('id').split('_')[1];
            $("#OverridePenaltyPoints_" + PenaltyId).css('display', 'inline-block');
            $("#OverridePenaltyRemarks_" + PenaltyId).css('display', 'inline-block');
        }
        else {
            var PenaltyId = $(this).attr('id').split('_')[1];
            $("#OverridePenaltyPoints_" + PenaltyId).css('display', 'none');

            $("#OverridePenaltyRemarks_" + PenaltyId).css('display', 'none');
        }

    });
    $(document).on('change', '.penalty-override-penalty', function () {
        var status = true;
        var OverridenPenalty = parseFloat($(this).val());
        var thisId = $(this).attr("id").split('_');
        var PenaltyId = thisId[1];
        var PenaltyPoints = parseFloat($('#PenaltyPoint_' + PenaltyId).text());
        var errorMessage = "";

        if (OverridenPenalty > PenaltyPoints) {
            $('.validation-summary-errors').html('');
            $('.validation-summary-errors').empty();
            errorMessage = "<li>Overriden Points Should Be Less Than Or Equal To existing Attendance Points</li>";
            status = false;
        }

        if (!status && errorMessage != null) {
            $('.validation-summary-valid').addClass('alert alert-danger');
            $('.validation-summary-valid').html("<ul>" + errorMessage + "</ul>");
            $('.validation-summary-valid').show();
        }
        else {
            $('.validation-summary-valid').removeClass('alert alert-danger').html('');
            $('.validation-summary-valid').empty();
            $('.validation-summary-valid').hide();
        }
    })
    $(document).on('keypress', '#PaneltySummaryForm', function (e) {
        if (e.which == 13) { // Checks for the enter key
            e.preventDefault(); // Stops IE from triggering the button to be clicked
        }
    });
    $(document).on('click', '#btnSaveRecord', function () {
        var objPenaltyDetails = [];
        var isValid = false;
        var errorMessage = '';

        $('.validation-summary-valid').removeClass('alert alert-danger').html('');
        $('.validation-summary-valid').empty();
        $('.validation-summary-valid').hide();

        if ($('.validation-summary-valid ul').has('li').length == 0) {
            isValid = true;

            $(".chkList").each(function () {
                var penalty = {};
                var PenaltyEmpMappingId = $(this).attr('id').split('_')[1];
                //Validating Overridden Points against Original attendance points
                var attendPoints = $('#PenaltyPoint_' + PenaltyEmpMappingId)[0].innerText;
                var updatedPoints = $('#txtOverridePenalty_' + PenaltyEmpMappingId).val();
                if (attendPoints != "" && updatedPoints != "" && updatedPoints > attendPoints) {
                    $('.validation-summary-errors').html('');
                    $('.validation-summary-errors').empty();
                    errorMessage = "<li>Overriden Points Should Be Less Than Or Equal To existing Attendance Points</li>";
                    isValid = false;
                }
                if ($(this).is(":checked") == true) {

                    var remarks = $('#txtOverridePenaltyRemarks_' + PenaltyEmpMappingId).val();
                    if (remarks == '') {
                        isValid = false;
                        $('.validation-summary-errors').html('');
                        $('.validation-summary-errors').empty();
                        errorMessage += "<li>Please provide proper remarks against overriden attendance points</li>";
                        return false;
                    }
                    else if (updatedPoints == '') {
                        isValid = false;
                        $('.validation-summary-errors').html('');
                        $('.validation-summary-errors').empty();
                        errorMessage += "<li>Please provide proper overriden attendance points</li>";
                        return false;
                    }
                    else {

                        var ThisPenaltyPoints = parseFloat($('#txtOverridePenalty_' + PenaltyEmpMappingId).val())
                        penalty["PenaltyEmpMappingId"] = PenaltyEmpMappingId;
                        penalty["OverridenPenaltyPoints"] = ThisPenaltyPoints;
                        penalty["Remarks"] = remarks;
                        penalty["IsOverridden"] = true;
                        objPenaltyDetails.push(penalty);
                    }
                }
                else {
                    var ThisPenaltyPoints = parseFloat($('#txtOverridePenalty_' + PenaltyEmpMappingId).val())
                    penalty["PenaltyEmpMappingId"] = PenaltyEmpMappingId;
                    penalty["OverridenPenaltyPoints"] = ThisPenaltyPoints;
                    penalty["Remarks"] = remarks;
                    penalty["IsOverridden"] = false;
                    objPenaltyDetails.push(penalty);
                }
            });
            if (isValid) {
                var validationMessage = "";
                var $form = $("#PaneltySummaryForm");
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    type: "POST",
                    url: $form.attr('action'),
                    data: JSON.stringify(objPenaltyDetails),
                    success: function (data) {
                        if (data) {
                            toastr.success("Attendance Points have been Overridden");
                            SearchData();
                        }
                        else {
                            toastr.error("Attendance Points have not been Overridden");
                            SearchData();
                        }
                        // ResetForm();
                    },
                    error: function (xhr, err) {
                        alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status);
                        alert("responseText: " + xhr.responseText);
                    }
                });
            }
            else {
                $('.validation-summary-valid').addClass('alert alert-danger');
                $('.validation-summary-valid').html("<ul>" + errorMessage + "</ul>");
                $('.validation-summary-valid').show();
            }
        }
        //}
    });

    $(document).on('click', '.expand-child-row', function (e) {
        e.preventDefault();
        var target_child = $(this).data("child-row");
        $(this).children("i").toggleClass("fa-plus-square");
        $(this).children("i").toggleClass("fa-minus-square");
        $("." + target_child).slideToggle();
        var FromDate = $("#FromDate").val();
        var ToDate = $("#ToDate").val();
        var Department = $("#ddlDepartment").val();
        var EmployeeId = $(this).attr('data-child-row');
        var tr = $(this).closest('tr');
        var tbody = $(tr).parent();
        var childClass = $(this).children().attr('class')
        var childTag = $(this).children();

        if ($(childTag).hasClass('fa-plus-square')) {
            $(tbody).children().each(function () {
                if ($(this).hasClass(EmployeeId))
                    $(this).remove();
            })
        }
        else if ($(childTag).hasClass('fa-minus-square')) {
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'html',
                type: "POST",
                async: false,
                url: "/PenaltySummary/GetChildPenaltyList",
                data: JSON.stringify({ FromDate: FromDate, ToDate: ToDate, Department: Department, EmployeeId: EmployeeId }),
                success: function (data) {
                    $(tr).after(data);
                    setupCheckboxes();
                }
            })
        }

        //var oTable = $('#tblPenaltySummary').DataTable({
        //})
        //oTable.draw();
        //$('#tblPenaltySummary').DataTable({
        //   // destroy: true,
        //    paging:true
        //})
        // $('#tblPenaltySummary').DataTable({})
    });

    $(document).on("click", ".empAttendanceDetailByDate", function () {
        var empId = $(this).attr('data-empId');
        var index = $(this).attr('data-index');
        var attendanceDate = $(this).attr('data-attendanceDate');
        $.ajax({
            url: "/penaltysummary/GetEmpAttendanceDetailsByDate",
            dataType: "html",
            contentType: "json",
            data: { empId: empId, attendanceDate: attendanceDate },
            success: function (data) {
                //$('[data-attendanceDetailIndex!=""]').css("display", "none");
                var divToolTip = $('*[data-attendanceDetailIndex="' + index + '"]');
                $(divToolTip).html(data);
                $(divToolTip).css("display", "block");
            }
        });
    });

    $('#drpEmployee').multiselect({
        enableFiltering: true,
        numberDisplayed: 1,
        filterBehavior: 'text',
        includeSelectAllOption: true,
        enableCaseInsensitiveFiltering: true,
        buttonWidth: '100%',
        disableIfEmpty: true,
        templates: {
            filter: '<li class="multiselect-item filter"><div class="input-group"><input class="form-control multiselect-search" type="text"></div></li>',
            filterClearBtn: '<span class="input-group-btn"><button class="btn btn-default multiselect-clear-filter" type="button"><i class="glyphicon glyphicon-remove-circle"></i></button></span>',
        },
        onChange: function (element, checked) {
            if (checked === true) {
                $("#selectedEmployee").append('<label class="label-primary label" style="margin-left: 5px;">' + $(element).text() + ' <i class="fa fa-close cursor-pointer removeSelectedTag" data-id="' + $(element).val() + '" id="Emp_' + $(element).val() + '"></i></label>')

            }
            else if (checked === false) {
                $("#Emp_" + $(element).val()).parent().remove();

            }
        },
        onSelectAll: function () {
            //$('#drpEmployee > option').each(function () {
            //    if (!$(this).attr('disabled')) {
            //        $("#selectedEmployee").append('<label class="label-primary label" style="margin-left: 5px;">' + $(this).text() + ' <i class="fa fa-close cursor-pointer removeSelectedTag" data-id="' + $(this).val() + '" id="Emp_' + $(this).val() + '"></i></label>')
            //    }
            //});
            $("#selectedEmployee").html('');
            //$('#divSelectedTrainer').css('display', 'none');
            $('.multiselect-container.dropdown-menu > li').not('.filter').not('.multiselect-all').each(function () {
                if ($(this).hasClass('active')) {
                    var EmpTextName = $(this).find('label').html();
                    var EmpTextId = $(this).find('input').val();
                    $("#selectedEmployee").append('<label class="label-primary label" style="margin-left: 5px;">' + EmpTextName + ' <i class="fa fa-close cursor-pointer removeSelectedTag" data-id="' + EmpTextId + '" id="Emp_' + EmpTextId + '"></i></label>')
                }
            });

        },
        onDeselectAll: function () {
            $("#selectedEmployee").html('');
        },
        maxHeight: 200,
    });
    $('#selectedEmployee').on('click', '.removeSelectedTag', function () {
        var id = $(this).attr('data-id');
        $('#Emp_' + id).parent().remove();
        $('#drpEmployee').multiselect('deselect', id);
        $('#drpEmployee').multiselect('refresh');
    });
    $(document).on("change", "#ddlDepartment", function () {
        var DepartmentId = $("#ddlDepartment").val();
        if (DepartmentId == "") {
            DepartmentId = 0;
        }
        LoadEmployeeListForDeptFilter(DepartmentId);
    });
})


$("#btnReset").click(function () {
    ResetForm();
});
var master_table;
function datatableInitialize() {
    $('#tblPenaltySummary').DataTable({
        responsive: true,
        autoWidth: false,
        bLengthChange: false,
        bPaginate: true,
        bLengthChange: true,
        bFilter: true,
        bInfo: true,
        pagingType: "full_numbers",
        bAutoWidth: false,
        "oLanguage": {
            "oPaginate": {
                "sFirst": "<i class='fa fa-chevron-left'></i><i class='fa fa-chevron-left'></i>",
                "sLast": "<i class='fa fa-chevron-right'></i><i class='fa fa-chevron-right'></i>",
                "sNext": "<i class='fa fa-chevron-right'></i>",
                "sPrevious": "<i class='fa fa-chevron-left'></i>"
            }
        },
        //  "dom": 'T<"row"<"col-sm-6"f><"col-sm-6 pull-right"l>><"clearfix">rt<"clearfix">',
        "dom": 'T<"row"<"col-sm-6"f><"col-sm-6 pull-right"l>><"clearfix">rt<"clearfix"><"row"<"col-sm-3"i><"col-sm-9 text-right"<"paggin-wrap"p><"tblPenaltySummary-jump.jump-wrap">>>',
        "fnInitComplete": function () {

            var table = this.api();
            master_table = this.api();
            var pagination_data = table.page.info();
            var jump_form = $("<div></div>", {
                "class": "input-group",
                "id": "jump-form"
            });
            jump_form.append($("<input>", {
                "type": "number",
                "class": "form-control",
                "id": "" + $(this).attr('id') + "-jump-number",
                "placeholder": "Page #",
                "min": "1",
                "value": "1"
            }));
            var jump_btn_group = $("<div></div>", {
                "style": "",
                "class": "input-group-btn",
                "style": ""
            }).appendTo(jump_form);

            jump_btn_group.append($("<div></div>", {
                "class": "btn btn-primary btn-block fa fa-arrow-right",
                "id": "" + $(this).attr('id') + "-jump-form-button",
                "text": "",
                "data-toggle": "tooltip",
                "data-placement": "bottom",
                "title": "Jump to page"

            }));
            var table_id = $("#tblPenaltySummary").attr('id').substring(1);
            table_id = table_id + "-jump";
            $("#" + table_id).append(jump_form);
            $("#tblPenaltySummary-jump-number").attr("max", pagination_data.pages).val(pagination_data.page + 1);
        },

        "conditionalPaging": true,
        lengthMenu: [
            [5, 10, 20, 30, 40, 50, -1],
            [5, 10, 20, 30, 40, 50, "All"]
        ],
        //"fnDrawCallback": function () {
        //    var table = $("#tblPenaltySummary").DataTable();
        //    var info = table.page.info();

        //    $('#tblPenaltySummary_info').html(
        //        (info.page + 1) + ' of ' + info.pages + ' pages.'
        //    );
        //    if (typeof master_table != 'undefined') {
        //        var pagination_data = master_table.page.info();
        //        $("#tblPenaltySummary-jump-number").attr("max", pagination_data.pages).val(pagination_data.page + 1);
        //    }
        //},
        "lengthChange": false,
        conditionalPaging: true,
        stateSave: true,
        "aaSorting": [],
        "order": [],
        columnDefs: [
            { targets: 'sorting_disabled', "orderable": false }
        ]
    });
    var table1 = $("#tblPenaltySummary").DataTable();

    var table_jump_btn = "#tblPenaltySummary-jump-form-button";
    var table_jump_number = "#tblPenaltySummary-jump-number";
    $(document).on("change", ".dataTables_length select", function () {
        var pagination_data = master_table.page.info();
        $("#tblPenaltySummary-jump-number").attr("max", pagination_data.pages).val(pagination_data.page + 1);
    })
    $(document).on("click", table_jump_btn, function () {
        table1.page(parseInt($(table_jump_number).val(), 10) - 1).draw(false);
        $("tbody tr td").find("i.fa-minus-square").parent().click();
    }).on("input", table_jump_number, function () {
        if (isNaN(parseInt($(table_jump_number).val(), 10))) {
            $(table_jump_number).val(parseInt($(table_jump_number).attr("min"), 10));
        } else {
            if (parseInt($(table_jump_number).val(), 10) > parseInt($(table_jump_number).attr("max"), 10)) {
                $(table_jump_number).val(parseInt($(table_jump_number).attr("max"), 10))
            } else {
                if (parseInt($(table_jump_number).val(), 10) < parseInt($(table_jump_number).attr("min"), 10)) {
                    $(table_jump_number).val(parseInt($(table_jump_number).attr("min"), 10))
                }
            }
        }
    });
}
function SearchData() {
    var FromDate = $("#FromDate").val();
    var ToDate = $("#ToDate").val();
    var Department = $("#ddlDepartment").val();
    var employees = $("#drpEmployee").val();
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'html',
        type: "POST",
        url: "/PenaltySummary/SearchPenaltyList",
        data: JSON.stringify({ FromDate: FromDate, ToDate: ToDate, Department: Department, employeeList: employees }),
        //async: false,
        beforeSend: function () {
            ShowProgress();
        },
        success: function (data) {
            HideProgress();
            $("#divPenaltyList").html(data);
            //expand_tree();
            setupCheckboxes();
            if ($.fn.dataTable.isDataTable('#tblPenaltySummary')) {
                datatableInitialize()
            }
            else {
                datatableInitialize()
            }

        }
    })
}

function ResetForm() {
    $('.chzn-select option').prop('selected', false).trigger('chosen:updated');
    $("#PaneltyForm")[0].reset();
}
function CheckOverride(PenaltyId) {
    var status = true;
    if (PenaltyId != null) {
        var PenaltyDate = $("#PenaltyDate_" + PenaltyId).text();
        var OverridePenalty = $("#txtOverridePenalty_" + PenaltyId).val();
        var PenaltyPoint = $("#PenaltyPoint_" + PenaltyId).text();
        if (OverridePenalty == "") {
            toastr.error("Please Enter override Attendance Point on " + PenaltyDate + " for Employee");
            status = false;
        }
        if (OverridePenalty > parseInt(PenaltyPoint)) {
            toastr.error("Override Attendance Point not more than " + OverridePenalty + " for Employee");
            status = false;
        }
    }
    else {
        status = false;
    }
    return status;
}
function HideProgress() {
    $('.loader-wrapper').css('display', 'none');
}

function ShowProgress() {

    if ($('.loader-wrapper').css('display') == "none") {
        $(".loader-wrapper").show();
    }
}
function ExportToExcel() {
    var FromDate = $("#FromDate").val();
    var ToDate = $("#ToDate").val();
    var Department = $("#ddlDepartment").val();
    var employees = $("#drpEmployee").val();

    $.ajax({
        url: "/PenaltySummary/ExportToExcel_GetData",
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ FromDate: FromDate, ToDate: ToDate, Department: Department, employeeList: employees }),
        success: function (data) {
            if (data) {
                window.location.href = "ExportToExcel";
            }
        }
    });

    //window.location.href = "ExportToExcel?FromDate=" + FromDate + "&ToDate=" + ToDate + "&Department=" + Department + "&employeeList=" + employees;
}
function LoadEmployeeListForDeptFilter(DepartmentId) {
    if (DepartmentId == 0) {
        $("#drpEmployee option").css("display", "block").removeAttr('disabled');
        $(".optEmployee").css("display", "block");
    }
    else {

        $("#drpEmployee option").css("display", "block").removeAttr('disabled');
        $(".optEmployee").css("display", "block");

        if (DepartmentId != 0) {

            $("#drpEmployee option.Dept_" + DepartmentId + ":visible").css("display", "block").removeAttr('disabled');

            $(".optEmployee").not(".Dept_" + DepartmentId).css("display", "none");
            $("#drpEmployee option").not(".Dept_" + DepartmentId).css("display", "none");
        }
    }
    $('#drpEmployee').multiselect('refresh');
}
