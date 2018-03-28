$(document).ready(function () {
    $('.chzn-select').chosen();
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
                }
            });
        }
    });



    $(document).on("click", '.btnSavePenalty', function () {
       
        var IsValid = true;
        var errorMessage = "";
        $('#SystemPaneltyValidations').children('ul').html('');
        $('#SystemPaneltyValidations').css('display', 'none');
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
       
        if (parseFloat($("#txtMinTime").val()) >parseFloat($("#txtMaxTime").val()))
        {
            errorMessage += "<li>Min time can not be great than max time</li>";
            IsValid = false;
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
                    
                        toastr.success(PenaltyID == 0?"Attendance Points have been saved successfully":"Attendance Points have been updated successfully");
                    
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
                }
            });
       
    }

});