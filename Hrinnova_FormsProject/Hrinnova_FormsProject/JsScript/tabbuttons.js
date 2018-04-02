$(document).ready(function () {

            $("#form1").click(function () {
            $("#form1content").show(500).siblings().hide();
            $(this).addClass("btn-success").siblings().removeClass("btn-success");
            $(window).scrollTop(0);
            

        });
            $("#form2").click(function () {
            $("#form2content").show(500).siblings().hide();
            $(this).addClass("btn-success");
            $("#form1").removeClass("btn-success");
            $(window).scrollTop(0);
    });

            $("#form3").click(function () {
            $("#form3content").show(500).siblings().hide();
            $(this).addClass("btn-success").siblings().removeClass("btn-success");
            $(window).scrollTop(0);
        });

            $("#form4").click(function () {
            $("#form4content").show(500).siblings().hide();
            $(this).addClass("btn-success").siblings().removeClass("btn-success");
            $(window).scrollTop(0);
        });

          
         
        //Jquery to hide Save and continue button when checkbox is not checked
        //$('#checkfinal').change(function () {
        //    $('#submitfinal').prop("disabled", !this.checked);
        //}).change()
    });