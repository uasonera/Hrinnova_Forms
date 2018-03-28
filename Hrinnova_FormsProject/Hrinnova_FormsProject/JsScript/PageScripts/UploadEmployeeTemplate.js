var selectedFiles;

$(document).ready(function () {


    $("#btnSave").click(function () {
        var IsValidSession = false;
        $.ajax({
            type: 'POST',
            url: 'UploadEmployeeTemplate.aspx/ISValidSession',
            contentType: 'application/json',
            data: "{}",
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var Result = result.d;
                if (Result == 'true') {

                    IsValidSession = true;
                }
                else {
                    IsValidSession = false;
                }

            },
            error: function (error) {
                IsValidSession = false;
            }
        });

        if (!IsValidSession) {
            window.location = "http://www.cygnet-infotech.com/employee-login";
            return false;
        }

        var validExts = new Array(".xlsx", ".xls");

        var file = $("#fuTaskAttachment").get(0).files
        if (file.length > 0) {
            var filename = file[0].name;
            var extFileName = filename.substring(filename.lastIndexOf('.'))
            if (validExts.indexOf(extFileName) < 0) {
                alert("Invalid file selected, valid files are of " +
                validExts.toString() + " types.");
                return false;
            }
            else {
                $.ajax({
                    type: "POST",
                    url: "UploadEmployeeTemplate.aspx/CheckForOverwrite",
                    data: '{"FileName":"' + filename + '"}',
                    contentType: 'application/json; charset=utf-8',
                    datatype: 'json',

                    success: function (result) {

                        var jsonResult = result.d;
                        var IsExist = jsonResult[0];
                        var EmpId = jsonResult[1];

                        if (IsExist == "true") {
                            //$("#dialog-confirm");

                            $("#dialog-confirm").dialog({
                                resizable: false,
                                modal: true,
                                title: "Upload Confirmation",
                                height: 150,
                                width: 300,
                                buttons: {
                                    "Modify": function () {
                                        $(this).dialog('close');
                                        UpdateOverwriteFile(filename, EmpId);
                                    },
                                    "Add": function () {
                                        $(this).dialog('close');
                                        InsertFile(filename, EmpId)
                                    }
                                }
                            });
                        }
                        else {
                            InsertFile(filename, EmpId);
                        }
                    },
                    error: function () {
                        alert("An error occurred while uploading file");
                    }
                })
            }
        }
        else
            alert("Please select file");
    })
    function InsertFile(filename, EmpId) {

        var IsValidSession = false;
        $.ajax({
            type: 'POST',
            url: 'UploadEmployeeTemplate.aspx/ISValidSession',
            contentType: 'application/json',
            data: "{}",
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var Result = result.d;
                if (Result == 'true') {

                    IsValidSession = true;
                }
                else {
                    IsValidSession = false;
                }

            },
            error: function (error) {
                IsValidSession = false;
            }
        });

        if (!IsValidSession) {
            window.location = "http://www.cygnet-infotech.com/employee-login";
            return false;
        }

        var files = $("#fuTaskAttachment").get(0).files;
        var data = new FormData();
        for (var i = 0; i < files.length; i++) {
            data.append(files[i].name, files[i]);
        }
        data.append("EmpId", EmpId)
        //var data = {
        //    "data": files[0].name,
        //    "EmpId": EmpId
        //};


        $.ajax({
            type: "POST",
            url: "EmployeeUploadTemplateHandler.ashx",
            data: data,
            async: false,
            contentType: false,
            processData: false,
            success: function (result) {
                SaveFileDatabase();
            }
        });


    }


    function UpdateOverwriteFile(filename, EmpId) {
        var IsValidSession = false;
        $.ajax({
            type: 'POST',
            url: 'UploadEmployeeTemplate.aspx/ISValidSession',
            contentType: 'application/json',
            data: "{}",
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var Result = result.d;
                if (Result == 'true') {

                    IsValidSession = true;
                }
                else {
                    IsValidSession = false;
                }

            },
            error: function (error) {
                IsValidSession = false;
            }
        });

        if (!IsValidSession) {
            window.location = "http://www.cygnet-infotech.com/employee-login";
            return false;
        }

        $.ajax({
            type: "POST",
            url: "UploadEmployeeTemplate.aspx/UpdateFile",
            data: '{"FileName":"' + filename + '"}',
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (result) {
                var jsonResult = result.d;
                if (jsonResult[0] == "True" && jsonResult[1] == "True") {
                    var IsUpdate = 1;
                    OverwriteFileinFolder(filename, EmpId, IsUpdate);

                }
                else if (jsonResult[0] == "false")
                    alert("An error occurred while uploading file");
                else if (jsonResult[1] == "false")
                    alert("An error occurred in sending mail");
                else if (jsonResult[0] == "false" && jsonResult[1] == "false")
                    alert("An error occurred while uploading file");
            },
            error: function () {
            }
        });
    }

    function OverwriteFileinFolder(filename, EmpId, IsUpdate) {
        var files = $("#fuTaskAttachment").get(0).files;
        var data = new FormData();
        for (var i = 0; i < files.length; i++) {
            data.append(files[i].name, files[i]);
        }
        data.append("EmpId", EmpId);
        data.append("IsUpdate", IsUpdate)


        $.ajax({
            type: "POST",
            url: "EmployeeUploadTemplateHandler.ashx",
            data: data,
            async: false,
            contentType: false,
            processData: false,
            success: function (result) {
                alert("File replaced successfully");
                $("#fuTaskAttachment").val('');
                //__doPostBack("<%=UpdatePanel1.UniqueID %>", "");
                window.location.reload();
            }
        });
    }
    function SaveFileDatabase() {
        var file = $("#fuTaskAttachment").get(0).files

        var filename = file[0].name;

        $.ajax({
            type: "POST",
            url: "UploadEmployeeTemplate.aspx/InsertFile",
            data: '{"FileName":"' + filename + '"}',
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (result) {
                var jsonResult = result.d;
                if (jsonResult[0] == "True" && jsonResult[1] == "True") {

                    alert("File Added successfully");
                    $("#fuTaskAttachment").val('')
                    //__doPostBack("<%=UpdatePanel1.UniqueID %>", "");
                    window.location.reload();
                }
                else if (jsonResult[0] == "false")
                    alert("An error occurred while uploading file");
                else if (jsonResult[1] == "false")
                    alert("An error occurred in sending mail");
                else if (jsonResult[0] == "false" && jsonResult[1] == "false") 
                    alert("An error occurred while uploading file");
            },
            error: function () {
                alert("An error occurred while uploading file");
            }
        });
    }
});