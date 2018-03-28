$(document).ready(function () {
    $(document).on("click", "#btnReset", function () {
        var dateObj = new Date();
        var thisMonth = dateObj.getMonth() + 1;
        var thisYear = dateObj.getFullYear();

        $('#drpMonth').val(thisMonth).trigger("chosen:updated");
        $('#drpYear').val(thisYear).trigger("chosen:updated");
        if (isAugLevelEmployee == 'True') {
            $('#drpCompany').val('').trigger("chosen:updated");
            $('#drpDepartment').val('').trigger("chosen:updated");
            $('#drpDesignation').val('').trigger("chosen:updated");
        }
        $('#drpClient').val('').trigger("chosen:updated");
        $('#drpProject').val('').trigger("chosen:updated");
        $('#drpEmployees').val('').trigger("chosen:updated");

        $('#searchEmployeeValidationMessage').children('ul').html('');
        $('#searchEmployeeValidationMessage').css('display', 'none');
    });

    $(document).on("click", "#btnSearch", function () {

        var selection = $('input[name="reportType"]:checked').val();

        if (selection == "details") {
            loadDetailsData();
        }
        else {
            loadSummaryData();
        }
    });

    $(document).on("click", ".pageButton", function (e) {

        var pageIndex = $(this).attr('data-pageindex');

        $.ajax({
            type: "GET",
            data: { pageIndex: pageIndex },
            url: '/InOutReport/GetNextPageSummaryData',
            dataType: "html",
            success: function (result) {
                $('#divAttendanceSummary').html(result);
            }
        });
        e.preventDefault();
    });

    $(document).on('change', '#drpClient', function () {
        BindEmployeeDropDown();
        BindProjectDropDown();
    });

    $(document).on("click", ".paginate_button", function () {
        $("tbody tr td").find("i.fa-minus-square").removeClass('fa-minus-square').addClass('fa-plus-square');
        $('.collapseAttendance').removeClass('collapseAttendance').addClass('expandAttendance');
        //$(this).addClass('expandAttendance');
    })
    $(document).on("order.dt", '#detailsTable', function () {
        $("tbody tr td").find("i.fa-minus-square").removeClass('fa-minus-square').addClass('fa-plus-square');
        $('.collapseAttendance').removeClass('collapseAttendance').addClass('expandAttendance');
        //$(this).addClass('expandAttendance');
    })

    $('[name^="reportType"]').change(function () {
        var selection = $('input[name^="reportType"]:checked').val();
        if (selection == 'details') {
            $('#mandatoryEmpIcon').show();
        }
        else {
            $('#mandatoryEmpIcon').hide();
        }
    });

    BindEmployeeDropDown();
});
function BindEmployeeDropDown() {

    $("#drpEmployees").html('');
    $("#drpEmployees").trigger("chosen:updated");

    var CompanyId;
    var departmentId;
    var designationId;

    if (isAugLevelEmployee == 'True') {
        CompanyId = $('#drpCompany').val();
        departmentId = $('#drpDepartment').val();
        designationId = $('#drpDesignation').val();
    }
    var clientId = $('#drpClient').val();
    var projectId = $('#drpProject').val();

    var month = null;
    var year = null;

    if ($('#drpMonth').val() != '' && $('#drpYear').val() != '') {
        month = $('#drpMonth').val();
        year = $('#drpYear').val();
    }

    var FromDate = null;
    var ToDate =  null;

    if ($("#drpMonth").val() != null) {
        var FromDate = $("#drpMonth").val().split(',')[0];
        var ToDate = $("#drpMonth").val().split(',')[1];
    }

    var url = "/InOutReport/GetEmployeeList";

    $.ajax({
        url: url,
        data: { fromDate: FromDate, toDate: ToDate, companyId: CompanyId, departmentId: departmentId, designationId: designationId, clientId: clientId, projectId: projectId },
        cache: false,
        type: "POST",
        async: false,
        success: function (data) {
            if (data.length > 0) {
                var markup;
                //markup = "<option selected>Select All</option>";
                //$("#drpEmployees").append(markup);
                $.each(data, function (key, value) {
                    $("#drpEmployees").append($("<option></option>").val
                    (value.Value).html(value.Text));
                });
                //for (var x = 0; x < data.length; x++) {
                //    markup = "<option value=" + data[x].Value + ">" + data[x].Text + "</option>";
                //    $("#drpEmployees").append(markup);
                //    //$("#drpChildCompany").trigger("chosen:updated");
                //}
                $('#drpEmployees').prop('disabled', false).trigger("chosen:updated");
            }
            else {
                $('#drpEmployees').prop('disabled', true).trigger("chosen:updated");
            }
        },
        error: function (reponse) {

        }
    });
}

function BindProjectDropDown() {

    $("#drpProject").html('');
    $("#drpProject").trigger("chosen:updated");

    var clientId = $('#drpClient').val();

    var url = "/InOutReport/GetProjectList";

    $.ajax({
        url: url,
        data: { clientId: clientId },
        cache: false,
        type: "POST",
        async: false,
        beforeSend: function () {
            ShowProgress();
        },

        success: function (data) {
            HideProgress();
            if (data.length > 0) {
                var markup;
                markup = "<option selected>Select All</option>";
                $("#drpProject").append(markup);
                for (var x = 0; x < data.length; x++) {
                    markup = "<option value=" + data[x].Value + ">" + data[x].Text + "</option>";
                    $("#drpProject").append(markup);
                    //$("#drpChildCompany").trigger("chosen:updated");
                }
                $('#drpProject').prop('disabled', false).trigger("chosen:updated");
            }
            else {
                $('#drpProject').prop('disabled', true).trigger("chosen:updated");
            }
        },
        error: function (reponse) {
            HideProgress();
        }
    });
}
function HideProgress() {
    $('.loader-wrapper').css('display', 'none');
}

function ShowProgress() {

    if ($('.loader-wrapper').css('display') == "none") {
        $(".loader-wrapper").show();
    }
}

function validateSelection() {
    var errorMessage = "";
    var result = true;
    var selection = $('input[name="reportType"]:checked').val();
    $('#searchEmployeeValidationMessage').children('ul').html('');
    $('#searchEmployeeValidationMessage').css('display', 'none');

    if (isAugLevelEmployee == 'True' && !$.isNumeric($('#drpCompany').val())) {
        result = false;
        errorMessage += "<li>Please select company</li>";
    }
    if (selection == 'details') {
        if ($('#drpEmployees :selected').length <= 0) {
            result = false;
            errorMessage += "<li>Please select atleast one employee</li>";
        }
    }
    //else if (isAugLevelEmployee == 'True' && !$.isNumeric($('#drpDepartment').val()) && !$.isNumeric($('#drpDesignation').val())) {
    //    result = false;
    //    errorMessage += "<li>Please select either department or designation</li>";
    //}
    if (!result) {
        $('#searchEmployeeValidationMessage').children('ul').append(errorMessage);
        $('#searchEmployeeValidationMessage').css('display', 'block')
    }
    return result;
}
function loadSummaryData() {
    if (validateSelection()) {
        var selectedEmployees = [];
        if ($('#drpEmployees :selected').length > 0) {
            //build an array of selected values
            $('#drpEmployees :selected').each(function (i, selected) {
                selectedEmployees[i] = $(selected).val();
            });
        }
        var CompanyId;
        var departmentId;
        var designationId;

        if (isAugLevelEmployee == 'True') {
            CompanyId = $('#drpCompany').val();
            departmentId = $('#drpDepartment').val();
            designationId = $('#drpDesignation').val();
        }
        var clientId = $('#drpClient').val();
        var projectId = $('#drpProject').val();
        var month = $('#drpMonth').val();
        var year = $('#drpYear').val();
        var FromDate = $("#drpMonth").val().split(',')[0];
        var ToDate = $("#drpMonth").val().split(',')[1];
        $.ajax({
            type: "GET",
            data: { employeeList: JSON.stringify(selectedEmployees), CompanyId: CompanyId, departmentId: departmentId, designationId: designationId, clientId: clientId, projectId: projectId, month: "0", year: "0", FromDate: FromDate, ToDate: ToDate },
            url: '/InOutReport/GetAttendanceSummary',
            dataType: "html",
            beforeSend: function () {
                ShowProgress();
            },
            success: function (result) {
                HideProgress();
                $('#divAttendanceSummary').html(result);
                datatableInitializeForSummary();
            }
        });
    }
}
function loadDetailsData() {
    if (validateSelection()) {
        var selectedEmployees = [];
        if ($('#drpEmployees :selected').length > 0) {
            //build an array of selected values
            $('#drpEmployees :selected').each(function (i, selected) {
                selectedEmployees[i] = $(selected).val();
            });
        }
        var CompanyId;
        var departmentId;
        var designationId;

        if (isAugLevelEmployee == 'True') {
            CompanyId = $('#drpCompany').val();
            departmentId = $('#drpDepartment').val();
            designationId = $('#drpDesignation').val();
        }
        var clientId = $('#drpClient').val();
        var projectId = $('#drpProject').val();
        var month = $('#drpMonth').val();
        var year = $('#drpYear').val();
        var FromDate = $("#drpMonth").val().split(',')[0];
        var ToDate = $("#drpMonth").val().split(',')[1];
        $.ajax({
            type: "GET",
            data: { employeeList: JSON.stringify(selectedEmployees), CompanyId: CompanyId, departmentId: departmentId, designationId: designationId, clientId: clientId, projectId: projectId, month: "0", year: "0", FromDate: FromDate, ToDate: ToDate },
            url: '/InOutReport/GetAttendanceDetailsSummary',
            dataType: "html",
            beforeSend: function () {
                ShowProgress();
            },
            success: function (result) {
                HideProgress();
                $('#divAttendanceSummary').html(result);
                datatableInitializeForDetails()
            }
        });
    }
}
function datatableInitializeForSummary() {
    $('#summaryTable').DataTable({
        responsive: false,
        autoWidth: false,
        bLengthChange: false,
        bPaginate: true,
        bLengthChange: true,
        bFilter: true,
        bInfo: true,
        pagingType: "full_numbers",
        "oLanguage": {
            "oPaginate": {
                "sFirst": "<i class='fa fa-chevron-left'></i><i class='fa fa-chevron-left'></i>",
                "sLast": "<i class='fa fa-chevron-right'></i><i class='fa fa-chevron-right'></i>",
                "sNext": "<i class='fa fa-chevron-right'></i>",
                "sPrevious": "<i class='fa fa-chevron-left'></i>"
            }
        },
        //  "dom": 'T<"row"<"col-sm-6"f><"col-sm-6 pull-right"l>><"clearfix">rt<"clearfix">',
        "dom": 'T<"row"<"col-sm-6"f><"col-sm-6 pull-right"l>><"clearfix"><"row"<"col-sm-12"<"overflow-auto margin-bottom-10" rt>>><"clearfix"><"row"<"col-sm-3"i><"col-sm-9 text-right"<"paggin-wrap"p><"summaryTable-jump.jump-wrap">>>',
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
            var table_id = $("#summaryTable").attr('id').substring(1);
            table_id = table_id + "-jump";
            $("#" + table_id).append(jump_form);
            $("#summaryTable-jump-number").attr("max", pagination_data.pages).val(pagination_data.page + 1);
        },

        "conditionalPaging": true,
        lengthMenu: [
            [5, 10, 20, 30, 40, 50, -1],
            [5, 10, 20, 30, 40, 50, "All"]
        ],
        //"fnDrawCallback": function () {
        //    var table = $("#summaryTable").DataTable();
        //    var info = table.page.info();

        //    $('#summaryTable_info').html(
        //        (info.page + 1) + ' of ' + info.pages + ' pages.'
        //    );
        //    if (typeof master_table != 'undefined') {
        //        var pagination_data = master_table.page.info();
        //        $("#summaryTable-jump-number").attr("max", pagination_data.pages).val(pagination_data.page + 1);
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
    var table1 = $("#summaryTable").DataTable();

    var table_jump_btn = "#summaryTable-jump-form-button";
    var table_jump_number = "#summaryTable-jump-number";
    $(document).on("change", ".dataTables_length select", function () {
        var pagination_data = master_table.page.info();
        $("#summaryTable-jump-number").attr("max", pagination_data.pages).val(pagination_data.page + 1);
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
function datatableInitializeForDetails() {
    $('#detailsTable').DataTable({
        responsive: false,
        autoWidth: false,
        bLengthChange: false,
        bPaginate: true,
        bLengthChange: true,
        bFilter: true,
        bInfo: true,
        pagingType: "full_numbers",
        "oLanguage": {
            "oPaginate": {
                "sFirst": "<i class='fa fa-chevron-left'></i><i class='fa fa-chevron-left'></i>",
                "sLast": "<i class='fa fa-chevron-right'></i><i class='fa fa-chevron-right'></i>",
                "sNext": "<i class='fa fa-chevron-right'></i>",
                "sPrevious": "<i class='fa fa-chevron-left'></i>"
            }
        },
        //  "dom": 'T<"row"<"col-sm-6"f><"col-sm-6 pull-right"l>><"clearfix">rt<"clearfix">',
        "dom": 'T<"row"<"col-sm-6"f><"col-sm-6 pull-right"l>><"clearfix"><"row"<"col-sm-12"<"overflow-auto margin-bottom-10" rt>>><"clearfix"><"row"<"col-sm-3"i><"col-sm-9 text-right"<"paggin-wrap"p><"detailsTable-jump.jump-wrap">>>',
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
            var table_id = $("#detailsTable").attr('id').substring(1);
            table_id = table_id + "-jump";
            $("#" + table_id).append(jump_form);
            $("#detailsTable-jump-number").attr("max", pagination_data.pages).val(pagination_data.page + 1);
        },

        "conditionalPaging": true,
        lengthMenu: [
            [5, 10, 20, 30, 40, 50, -1],
            [5, 10, 20, 30, 40, 50, "All"]
        ],
        //"fnDrawCallback": function () {
        //    var table = $("#detailsTable").DataTable();
        //    var info = table.page.info();

        //    $('#detailsTable_info').html(
        //        (info.page + 1) + ' of ' + info.pages + ' pages.'
        //    );
        //    if (typeof master_table != 'undefined') {
        //        var pagination_data = master_table.page.info();
        //        $("#detailsTable-jump-number").attr("max", pagination_data.pages).val(pagination_data.page + 1);
        //    }
        //},
        "lengthChange": false,
        conditionalPaging: true,
        stateSave: true,
        "aaSorting": [],
        "order": [],
        columnDefs: [
            { targets: 'sorting_disabled', "orderable": false },
            { targets: 'child-row', "visible": false }
        ]
    });
    var table1 = $("#detailsTable").DataTable();

    var table_jump_btn = "#detailsTable-jump-form-button";
    var table_jump_number = "#detailsTable-jump-number";
    $(document).on("change", ".dataTables_length select", function () {
        var pagination_data = master_table.page.info();
        $("#detailsTable-jump-number").attr("max", pagination_data.pages).val(pagination_data.page + 1);
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