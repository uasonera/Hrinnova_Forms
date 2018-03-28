$(document).ready(function () {

    $("#form1").click(function () {
        $("#form1content").show(500);
        $(this).addClass('btn-success').siblings().removeClass('btn-success');;
            $(window).scrollTop(0);
            $("#form2content").hide(500);
            $("#form3content").hide(500);
            $("#form4content").hide(500);
            $("#form5content").hide(500);

        });
    $("#form2").click(function () {
       
            $("#form1content").hide(500);
            $("#form2content").show(500);
            $(this).addClass('btn-success').siblings().removeClass('btn-success');
            $(window).scrollTop(0);
            $("#form3content").hide(500);
            $("#form4content").hide(500);
            $("#form5content").hide(500);
            
        });
        $("#form3").click(function () {
            $("#form1content").hide(500);
            $("#form2content").hide(500);
            $("#form3content").show(500);
            $(this).addClass('btn-success').siblings().removeClass('btn-success');
            $(window).scrollTop(0);
            $("#form4content").hide(500);
            $("#form5content").hide(500);
        });
        $("#form4").click(function () {
            $("#form1content").hide(500);
            $("#form2content").hide(500);
            $("#form3content").hide(500);
            $("#form4content").show(500);
            $(this).addClass('btn-success').siblings().removeClass('btn-success');
            $(window).scrollTop(0);
            $("#form5content").hide(500);            
        });
          $("#form5").click(function () {
            $("#form1content").hide(500);
            $("#form2content").hide(500);
            $("#form3content").hide(500);
            $("#form4content").hide(500);
            $("#form5content").show(500);
            $(window).scrollTop(0);
        });
        //Jquery to hide Save and continue button when checkbox is not checked
        //$('#checkfinal').change(function () {
        //    $('#submitfinal').prop("disabled", !this.checked);
        //}).change()
    });