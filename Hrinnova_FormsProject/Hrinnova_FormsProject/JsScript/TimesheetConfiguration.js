$(document).ready(function () {
    EnumType = { Hours: '2', Percentage: '1', None: '3' };
    $('#txtpercentage').val($('#chanceSlider').val());


    $('#chanceSlider').on('change', function () {
        $('#txtpercentage').val($('#chanceSlider').val());
    });

    $('#txtpercentage').on('keyup', function () {
        $('#chanceSlider').val($('#txtpercentage').val());
    });
    for (var i = 0; i < 24; i++) {

        $("#Hours").append($('<option></option>').val(i).html(i));
    }
    for (var i = 0; i <= 59; i++) {

        $("#Minutes").append($('<option></option>').val(i).html(i));
    }
    pageLoad();
    $("#drpType").change(function () {
        reset();
        $('#chanceSlider').val($('#txtpercentage').val());
        if ($(this).val() == 0) {
            return false;
        }
        if ($(this).val() == 1) {
            Disablecontrols(true, true, false, false);
        }
        else if ($(this).val() == 3) {


            Disablecontrols(true, true, true, true);
        }

        else {
            Disablecontrols(false, false, true, true);
        }
    });
    function reset() {
        $('.ddl').val(0);
        $("#txtpercentage").val(0);
        $("#ulVs").empty();
        $("vs1").hide();
    }
    function Disablecontrols(Hours, Minutes, Percentage, Slider) {
        $("#Hours").prop("disabled", Hours);
        $("#Minutes").prop("disabled", Minutes);
        $("#txtpercentage").prop("disabled", Percentage);
        $("#chanceSlider").prop("disabled", Slider);
        if (Percentage == true) {
            $("#txtpercentage").val("0");
            $("#chanceSlider").val(0)
        }

    }
    $("#btnSave").click(function (e) {
        e.preventDefault();
        //if ($("#drpType").val() == 0) {
        //    $("#ulVs").append("<li>Please select type of configuration</li>");
        //    return false;
        //}
        

        $("#ulVs").empty();
        $("vs1").hide();
        $('#lblMessage').html('');
        $('#lblMessage').removeClass('alert alert-success');
        $('#lblMessage').removeClass('alert alert-warning');

        if ($("#txtpercentage").val() > 100) {
            $("vs1").show();
            $("#ulVs").append("<li>Please insert valid percentage</li>");
            return false;
        }
        $("#drpType").val() == "1" ? StorePercentage() : $("#drpType").val() == "2" ? StoreHours() : RemoveTimeSetConfiguration();
    });
    function StorePercentage() {
        
        $("#ulVs").empty();
        $("vs1").hide();
        $('#lblMessage').html('');
        $('#lblMessage').removeClass('alert alert-success');

        $('#lblMessage').removeClass('alert alert-success');

        if ($("#txtpercentage").val().trim() == "" || $("#txtpercentage").val().trim() == "0") {
            $("vs1").show();
            $("#ulVs").append("<li>Please enter percentage</li>");
            return false;
        }
        StoreDetails();
    }
    function StoreHours() {
        
        $("#ulVs").empty();
        $("vs1").hide();
        $('#lblMessage').html('');
        $('#lblMessage').removeClass('alert alert-success');
        $('#lblMessage').removeClass('alert alert-warning');


        if ($("#Hours").children('option:first-child').is(':selected') && $("#Minutes").children('option:first-child').is(':selected')) {
            $("vs1").show();
            $("#ulVs").append("<li>Please enter Hours</li>");
            return false;
        }
        StoreDetails();
    }

    function RemoveTimeSetConfiguration() {
        $("#ulVs").empty();
        $("vs1").hide();
        $('#lblMessage').html('');
        $('#lblMessage').removeClass('alert alert-success');



        StoreDetails();
    }
    function StoreDetails() {
        $("#ulVs").empty();
        $("vs1").hide();
        var TypeValue;
        if ($("#drpType").val() == "2") {
            TypeValue = (parseInt($("#Hours").val()) * 60) + parseInt($("#Minutes").val());
        }
        else {
            TypeValue = $("#txtpercentage").val();
        }

        $.ajax({
            url: "TimesheetConfiguration.aspx/StoreConfig",
            type: "post",
            data: '{"Type":' + $("#drpType").val() + ',"TypeValue":' + TypeValue + '}',
            contentType: "application/json; charset=utf-8",
            success: function (jsonData) {
                
                var json = jQuery.parseJSON(jsonData.d)
                if (json.status) {

                    $('#lblMessage').removeClass('alert alert-warning');
                    $('#lblMessage').addClass('alert alert-success');

                }
                else {
                    $('#lblMessage').removeClass('alert alert-success');
                    $('#lblMessage').addClass('alert alert-warning');

                }
                
                $("#lblMessage").text(json.Message);
            }
        });
    }
    $("#bntReset").click(function () {

        $("#lblMessage").text("").removeClass('alert alert-success');
        $("#lblMessage").text("").removeClass('alert alert-warning');
        $("#drpType").val(0);
        $("#Hours").val(0);
        $("#Minutes").val(0);
        $('#chanceSlider').val(0);
        $('#txtpercentage').val(0);
    })
    function pageLoad() {
        $.ajax({
            url: "TimesheetConfiguration.aspx/GetPageLoadData",
            type: "post",
            data: '{}',
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (jsonData) {
                
                if (jsonData.d != "") {
                    var json = jQuery.parseJSON(jsonData.d)

                    if (json.TypeOfConfiguration == EnumType.Percentage) {
                        $('#chanceSlider').val(json.Percentage);
                        $('#txtpercentage').val($('#chanceSlider').val());
                        $('#drpType').val(EnumType.Percentage);

                        Disablecontrols(true, true, false, false);

                    }
                    else if (json.TypeOfConfiguration == EnumType.None) {

                        $('#drpType').val(EnumType.None);
                        $('#chanceSlider').val(0);
                        $('#txtpercentage').val(0);



                        $("#Hours").val(0);
                        $("#Minutes").val(0);
                        Disablecontrols(true, true, true, true);



                    }
                    else {
                        $('#drpType').val(EnumType.Hours);
                        var TotalMins = json.Minutes;
                        var dHours = TotalMins / 60;
                        var intHour = parseInt(dHours);
                        var min = parseInt((dHours - intHour) * 60);


                        $("#Hours").val(intHour);
                        $("#Minutes").val(min);
                        Disablecontrols(false, false, true, true);
                    }
                }
            }
        });
    }

});