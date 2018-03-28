$(document).ready(function () {
   
  
        
        //$(".columnConfigureTab").addClass("active");
        //$("li[class*='columnConfigureTab']").find("a").attr("aria-expanded", "true");
    
   
    $(".clsCharNotAllowedInTask").keydown(function (e) {
        if (e.keyCode != 8 && e.keyCode != 46) {
            if (($(this).val().indexOf('.') != -1) && ($(this).val().substring($(this).val().indexOf('.'))).length >= 3)
                e.preventDefault();
        }
        
    });
    $(".clsCharNotAllowed").keydown(function (e) {
        
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||

                (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||

                (e.keyCode >= 35 && e.keyCode <= 40)) {

                return;
            }

            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        
    });
    $("#btnTaskSave").click(function () {
        ValidateDynamicContent($(this));
        var $form = $(this).closest('form');
        var isValidForm = false;
        isValidForm = $form.valid();
        if (isValidForm) {
            var MaxStories = $("#MaxStories").val() == undefined ? "0" : $("#MaxStories").val();
            var MaxActiveSprint = $("#MaxActiveSprints").val() == undefined ? "0" : $("#MaxActiveSprints").val();
            var SprintDuration = $("#SprintDuration").val() == undefined ? "0" : $("#SprintDuration").val();
            $.ajax({
                type: "POST",
                url:  urlUpdateScrumConfiguration,
                data: '{ "ProjId":"' + $("#ProjectID").val() + '","MaxTaskHours": ' + $("#MaxTaskHours").val() + ',"MaxStories": ' + MaxStories + ',"ActiveSprints": ' + MaxActiveSprint + ',"SprintDuration": ' + SprintDuration + '}',
                dataType: "html",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    toastr.clear();
                    toastr.success("Configuration has been saved Successfully");
                }, error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.responseText)
                }
            });
        }
       

    });
    function ValidateDynamicContent(element) {
        var currForm = element.closest("form");
        if (currForm.length > 0) {
            currForm.removeData("validator");
            currForm.removeData("unobtrusiveValidation");
            $.validator.unobtrusive.parse(currForm);
            currForm.validate(); // This line is important and added for client side validation to trigger, without this it didn't fire client side errors.
        } else {
            $.validator.unobtrusive.parse(element);//parse div content for validation

        }
    }
});