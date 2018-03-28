$(document).ready(function () {
    $('.chzn-select').chosen();
    $(".AutomaticPanelty").forceNumeric();
    $(document).on('click', '.btnEdit', function () {
        $.ajax({
            type: "POST",
            url: 'EditSystemPenalty',
            data: '{ "PenaltyID":' + parseInt($(this).data('id')) + '}',
            dataType: "html",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $("#dvSystemPenalty").empty().html(data);
            }
        });
    });
    $(document).on('click', ".btnDeleteSystemPenalty", function () {
        if (confirm('Do you want to delete this record?')) {
            $.ajax({
                type: "POST",
                url: 'DeleteSystemPanelty',
                data: '{ "PaneltyID":' + parseInt($(this).data("id")) + '}',
                dataType: "html",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    toastr.success("Record has been deleted successfully");
                    $('#dvSystemPenaltyListing').empty().html(data);
                    RefreshDatatable();
                }
            });
        }
    });
    $(document).on('change', "#ddlPolicy", function () {    
        $("#ddlPenaltyType").empty();
        $.ajax({
            type: 'POST',
            url: 'GetTypes',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: '{ "id":' + parseInt($("#ddlPolicy").val() == '' ? 0 : $("#ddlPolicy").val()) + '}',
            success: function (Types) {
                $("#ddlPenaltyType").append('<option value="" selected="true">Select Type</option>')
                $.each(Types, function (i, Type) {
                    $("#ddlPenaltyType").append('<option value="' + Type.Value + '">' +
                         Type.Text.replace(/([A-Z])/g, ' $1').trim() + '</option>');
                });
                $("#ddlPenaltyType").trigger("chosen:updated");
            }
    });
   

});


    $(document).on("click", '.btnSavePenalty', function () {
       
        var IsValid = true;
        var errorMessage = "";
        $('#SystemPaneltyValidations').children('ul').html('');
        $('#SystemPaneltyValidations').css('display', 'none');
        if ($("#ddlPolicy option:selected").val() == "") {
            errorMessage += "<li>Please select policy</li>";
            IsValid = false;
        }
        if ($("#ddlPenaltyType option:selected").val() == "") {
            errorMessage += "<li>Please select type</li>";
            IsValid = false;
        }
        $('.AutomaticPanelty').each(function (index, element) {
            
            if (!$(this).val() || $(this).val() == "0") {
                errorMessage += "<li>" + $(this).data("validationmessage") + "</li>";               
                IsValid = false;
            }
            else if ($(this).val() < 0)
            {                
                errorMessage += "<li>" + $(this).data("formatmessage") + "</li>";
                IsValid = false;
            }
           
        });        
        
        
        if (parseFloat($("#txtMinTime").val()) > parseFloat($("#txtMaxTime").val())) {
            errorMessage += "<li>Min time can not be great than max time</li>";
            IsValid = false;
        }
        if (IsValid)
        {
            if (PenaltyID == 0) {
                $.ajax({
                    type: "POST",
                    url: "/Leave/CheckStartTimeForNextRange",
                    data: '{ "CurrentStartRange":"' + parseFloat($("#txtMinTime").val()) + '","PolicyID":"' + $("#ddlPolicy").val() + '","PenaltyType":"' + $("#ddlPenaltyType").val() + '"}',
                    dataType: "json",
                    async: false,
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        var AllowedRange = data.Success;
                        if (!AllowedRange) {
                            errorMessage += "<li>Current Min time should start from the last entered Max time for " + $("#ddlPenaltyType option:selected").text() + "</li>";
                            IsValid = false;

                        }
                    }
                });
            }
        }
        
        if (errorMessage != "" && errorMessage != undefined) {
            $('#SystemPaneltyValidations').children('ul').append(errorMessage);
            $('#SystemPaneltyValidations').css('display', 'block')
        }
        if (IsValid) {

            var MinTime = $('.AutomaticPanelty#txtMinTime').val();
            var MaxTime = $('.AutomaticPanelty#txtMaxTime').val();
            var Points = $('.AutomaticPanelty#PenaltyPoints').val();
            var $form = $(this).closest('form');
            $.ajax({
                type: "POST",
                url: 'SaveSystemPanelty',
                data: $form.serialize(),
                dataType: "html",
                success: function (data) {

                    $("input[type='text']").each(function () { $(this).val(''); });
                    $('.SystemDropdown option[selected="selected"]').each(function ()
                    {
                        $(this).removeAttr('selected');
                    });
                    $(".SystemDropdown  option:first").attr('selected', 'selected');
                    $(".SystemDropdown").trigger('chosen:updated');
                    
                    toastr.success(PenaltyID == 0 ? "Attendance Points have been saved successfully" : "Attendance Points have been updated successfully");
                    
                    $("#dvSystemPenaltyListing").empty().html(data);
                    RefreshSystemPenaltyView();

                }
            });
        }

    });
    function RefreshSystemPenaltyView() {
       
            $.ajax({
                type: "POST",
                url: 'EditSystemPenalty',
                data: '{ "PenaltyID":' + 0 + '}',
                dataType: "html",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    $("#dvSystemPenalty").empty().html(data);
                    RefreshDatatable();
                    DisplayPerDayPoints();
                }
            });
       
    }

});