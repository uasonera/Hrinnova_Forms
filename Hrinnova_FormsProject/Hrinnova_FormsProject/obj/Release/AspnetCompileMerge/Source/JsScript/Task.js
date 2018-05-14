$(document).ready(function () {
    
    $(".Print").click(function () {
        window.print();
    });
    $(".DateField").datepicker({
        changeMonth: false,
        changeYear: false,
        showWeek: false,
        firstDay: 1,       
        dateFormat: 'mm/dd/yy',
        
    });
    $("#divTabs").tabs();
    $(".AddTask").click(function () {
        AddEditTask(ProjectId, TaskId, false);
    });
    $(".EditTask").click(function () {
        AddEditTask(ProjectId, TaskId, true);
    });
    
    //function AddEditTask(ProjectId, TaskId, IsEdit) {
        
    //    $.ajax({
    //        type: "POST",
    //        url: "/Task/AddTask",
    //        data: '{ "IsEdit":' + IsEdit + ',"ProjectID": ' + ProjectId + ',"TaskId":' + TaskId + '}',
    //        dataType: "html",
    //        contentType: "application/json; charset=utf-8",
    //        success: function (data) {
    //            $("#modal_dialog").empty().html(data);
                
    //            $.validator.unobtrusive.parse($("#modal_dialog"));
              
    //        },
    //        error: function (response) {
    //            alert(response.responseText);
    //        }
    //    });
    //}
   
});