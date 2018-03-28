$(document).ready(function () {
    $(".Print").click(function () {
        window.print();
    });

   
    //$("#divTabs").tabs();
  



    //function DisplayFiles(TaskId) {
    //    $.ajax({
    //        type: "POST",
    //        url: "/Task/GetAttachments",
    //        dataType: 'json',
    //        data: TaskId,
    //        success: function (data) {
    //            $.each(data.Data, function (key, value) {



    //                $("#my-awesome-dropzone").append("<div style=' border-radius: 5px;  border: 1px solid #D8D8D8;padding: 10px;margin-bottom: 5px; ' >" + value.Path.split("_")[1] + "<img src='../Images/close_Icon.png' height='15px' class='dlt' id=" + value.Path.split("_")[1] + " style='float:right;cursor:pointer;'/><div>")

    //            });
    //        }
    //    });
    //}
});
