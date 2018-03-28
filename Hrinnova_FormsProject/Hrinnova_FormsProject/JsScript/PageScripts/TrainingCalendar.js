function ImportExcelSheet(url1) {
    
    $("span[id*='lblMessage']").removeClass('alert alert-success');
    $("span[id*='lblMessage']").text('');
   // alert(url1);
    if (Page_ClientValidate("vlGroup")) {

        var fileName = $('input[id*="txtFileName"]').val();
       // alert(fileName);
        //if (fileName = '')
         //{
            $('#progressMessage').text('Please wait! Importing Excel Sheet...');

            $('#progressbar').removeAttr("style");

            $.ajax({

                type: 'POST',

                // url: "../Admin/TrainingCalendarImportData.aspx/ImportExcelSheet",
                // url: "../Admin/CalendarImpData.aspx/ImportExcelSheet",
                // url: "../Admin/TestImpdata.aspx/ImportExcelSheet",
                url: url1,
                async: false,

                contentType: 'application/json; charset=utf-8',

                data: '{"FileName" : "' + fileName + '"}',

                dataType: "json",

                success: function (data) {
                    //                alert("Yipee");
                    //                alert(data.d);
                    if (data.d.InvalidDataMessages == "") {
                        //  $('#Label1').text('File Imported Successfully.').css("background-color", "#c4d7a3","font-size":"150%");
                        $('#Label1').text('File Imported Successfully.').addClass("green-msg");
                        $('#MainContent_Label1').text('File Imported Successfully.').addClass("green-msg");

                    }
                    else {
                        $('#Label1').text('').removeClass('alert alert-success');
                    }
                    $('#progressMessage').text('');

                    $('#progressbar').css("display", "none");

                    $("#divInvalidDataListContainer").empty();

                    $("#tableTemplate").tmpl(data.d.InvalidDataMessages).appendTo("#divInvalidDataListContainer");

                },
                error: function (data) {
                    //  alert("hi");
                    // alert("Error Occurred While Importing Excel Sheet");
                    toaster.danger("Error Occurred While Importing Excel Sheet");
                }
            });

            return true;
//        }
//        else {
//            //alert("Please attach atleast one file");
//        }
    }

   // alert("Please attach atleast one file");


}
