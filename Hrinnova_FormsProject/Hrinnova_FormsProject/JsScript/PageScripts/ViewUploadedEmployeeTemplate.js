$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: "ViewUploadedEmployeeTemplate.aspx/BindEmpTemplateDetails",
        data: '{}',
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {

            var jsonResult = jQuery.parseJSON(result.d);
            var empDetails = jsonResult.dtEmpDetails;
            var templateDetails = jsonResult.dtTemplateDetails;
            for (var i = 0; i < empDetails.length; i++) {
                $("#EmptblBody").append($('<tr></tr>').attr("id", "empTr_" + empDetails[i].empID));
                $("#empTr_" + empDetails[i].empID).append($('<td>' + empDetails[i].empID + '</td>'))
                //$("#empTr_" + empDetails[i].empID).append($('<td>' + empDetails[i].empID + '</td>'))
                $("#empTr_" + empDetails[i].empID).append($('<td>' + empDetails[i].EmployeeName + '</td>'))
            }
            $("#empTemplateTr_" + EmpId).append($('<table></table>').attr("id", "tblTemplate" + EmpId));
            $("#tblTemplate" + EmpId).append('<thead><tr><th>Template Id</th><th>Template Name</th><th>Template Created Date</th><th>Download File </th></tr></thead>');
            $("#tblTemplate" + EmpId).append($('<tbody></tbody>').attr("id", "tbodyTemplate" + EmpId));
            for (var i = 0; i < templateDetails.length; i++) {
                var EmpId = templateDetails[i].empID;
                var TemplateId = templateDetails[i].TemplateID;
                var TemplateName = templateDetails[i].TemplateName;
                var CreatedDate = templateDetails[i].CreatedDate;
                var EmpTblId = "empTr_" + EmpId;
                BindInnerTable(EmpTblId, EmpId, TemplateId, TemplateName, CreatedDate);
            }
        },
        error: function (result) {
        }
    });

    $(document).on('click', ".downloadFile", function () {

        var id = $(this).attr("id");
        var TemplateName = $(this).parent().parent().find('td:eq(1)').text();
        var trId = $(this).closest('table').parent().attr('id');
        var splitId = trId.split('_');
        var empId = splitId[1];
        var data = new FormData();
        data.append("fileName", TemplateName)
        data.append("EmpId", empId)
        
        //$.ajax({
        //    type: "POST",
        //    url: "DownloadFile.ashx",
        //    data: '{ "FileName": "' + TemplateName + '","EmpId":' + empId + '}',
        //    contentType: 'application/json; charset=utf-8',
        //    datatype: 'json',
        //    success: function (result) {
        //        debugger
        //    },
        //    error: function () {
        //        debugger
        //    }
        //});
        // $.fileDownload('/Documents/KRA/UploadTemplate/1208/' + TemplateName);

        $.ajax({
            type: "POST",
            url: "ViewUploadedEmployeeTemplate.aspx/DownloadFile",
            data: '{ "FileName": "' + TemplateName + '","EmpId":' + empId + '}',
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (result) {
                
            },
            error: function () {
                
            }
        });
    })

})

function BindInnerTable(EmpTblId, EmpId, TemplateId, TemplateName, CreatedDate) {
    $row = $("#empTr_" + EmpId);
    ($('<tr colspan="2"></tr>').attr("id", "empTemplateTr_" + EmpId)).insertAfter($row);
    //$("#EmptblBody").append($('<tr></tr>').attr("id", "empTemplateTr_" + empDetails[i].empID));
    
    
    $("#tbodyTemplate" + EmpId).append($('<tr></tr>').attr("id", "templateTr_" + TemplateId));
    $("#templateTr_" + TemplateId).append($('<td>' + TemplateId + '</td>'))
    $("#templateTr_" + TemplateId).append($('<td>' + TemplateName + '</td>'))
    $("#templateTr_" + TemplateId).append($('<td>' + CreatedDate + '</td>'))
    $("#templateTr_" + TemplateId).append($('<td><image src="../Images/Attachment_Excel.png" class="downloadFile" id="image_' + TemplateId + '"> </td>'))

}