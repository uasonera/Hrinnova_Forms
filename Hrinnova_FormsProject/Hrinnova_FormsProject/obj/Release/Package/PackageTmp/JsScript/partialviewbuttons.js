
$(document).ready(function () {
    $("#form1").click(function () {
        $("#form2content").hide(250);
        $("#form1content").show(250);
        $(this).addClass('active').siblings().removeClass('active');
        $(window).scrollTop(0);
        $("#form3content").hide(250);
        $("#form4content").hide(250);
    });
        $("#form2").click(function () {
            $("#form1content").hide(250);
            $("#form2content").show(250);
            $(this).addClass('active').siblings().removeClass('active');
            $(window).scrollTop(0);
            $("#form3content").hide(250);
            $("#form4content").hide(250);
        });
        $("#form3").click(function () {
            $("#form1content").hide(250);
            $("#form2content").hide(250);
            $("#form3content").show(250);
            $(this).addClass('active').siblings().removeClass('active');
            $(window).scrollTop(0);
            $("#form4content").hide(250);
        });
        $("#form4").click(function () {
            $("#form1content").hide(250);
            $("#form2content").hide(250);
            $("#form3content").hide(250);
            $("#form4content").show(250);
            $(this).addClass('active').siblings().removeClass('active');
            $(window).scrollTop(0);
        });
    });