$(document).ready(function () {
    var i = 1;
    $('.collapse').collapse()
    var otherCompetencies = [];

    var otherCompetenciesCount = 0;

    var substringMatcher = function (strs) {
        return function findMatches(q, cb) {
            var matches, substringRegex;
            matches = [];
            substrRegex = new RegExp(q, 'i');
            $.each(strs, function (i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });

            cb(matches);
        };
    };

    $(".inputRating").on("change", function () {
        var val = Math.abs(parseInt(this.value, 10) || 0);
        this.value = val > 5 ? 5 : val;
    });
    $(".inputExp").keypress(function () {
        if(isNumber())
        {
            return true;
        }
        else
        {
            return false;
        }
    });

    $('span[id^="existingOtherAspiration_"]').each(function (index, ele) {
        var name = $(ele).html().toString().trim();
        otherCompetencies[otherCompetenciesCount++] = name;
    });

    $('[id^="NextTabLinkButtonAspiration_"]').click(function () {
        var nextTabLinkId = (parseInt($(this).attr('id').split('_')[1].toString())) + 1;

        $('#TabLinkAspiration_' + nextTabLinkId+' a').click();
    });

    $('[id^="BackTabLinkButtonAspiration_"]').click(function () {
        var nextTabLinkId = (parseInt($(this).attr('id').split('_')[1].toString())) - 1;
        $('#TabLinkAspiration_' + nextTabLinkId + ' a').click();
    });
    /**********Technical***********/
    $('input[id^="Aspiration_"]').each(function (index, ele) {

        var id = $(ele).attr('id');
        SetSliderValue("#" + id, "#AspirationVal_" + id.split('_')[1] + "_" + id.split('_')[2]);
    });
    $('input[id^="Aspirationself_"]').each(function (index, ele) {
        var id = $(this).attr('id');
        SetSliderValue("#" + id, "#AspirationselfVal_" + id.split('_')[1] + "_" + id.split('_')[2]);
    });
    //$('#TabSubmitAspiration').on('click', function () {

    //    $('#Submitdata').click()
    //});
   
    function addNewCompetencyRow(name, inputBoxId) {
        var nameExists = false;
        var competencyName = name;
        var id = inputBoxId;

        if (nameExists == false) {

            if (competencyName == "") {
                $('#AddNewAspirationMsg_' + id.split('_')[1]).html("<b>Competency name can not be empty.</b>");
            }
            
        }

    }
    function SetSliderValue(sliderId, sliderValId) {
        $(sliderId).slider();
        $(sliderId).on("slideStop", function (slideEvt) {
            $(sliderValId).text(slideEvt.value);
        });
        $(sliderId).on("slide", function (slideEvt) {
            $(sliderValId).text(slideEvt.value);

        });

    }

    // get list of a tags with href set
    var valueToCompare = undefined || "";

    for (var i = 0; i < document.links.length; i++) {

        if (document.links[i].href != undefined && document.links[i].href != "" && document.links[i].href != "#") {
            document.links[i].className += ' activeLinks';
        }
    }
    function isNumber(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

});

