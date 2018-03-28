$(document).ready(function () {
    $(".NewViewer").click(function () {

        var Arr_Viewers = new Array();
        Arr_Viewers = $("#Viewer").val();
        if (Arr_Viewers != null) {
            Arr_Viewers = Arr_Viewers.filter(function (el) {
                return el !== 'multiselect-all';
            });
        }
        addViewer(Arr_Viewers);

    });
});
function addViewer(Arr_Viewers) {
    $.ajax({
        type: "POST",
        url: urlAddNewViewer,
        dataType: 'html',
        data: "{'ViewerList':'" + Arr_Viewers + "','TaskID':'" + TaskId + "','ProjectId':'" + ProjectId + "'}",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#TaskRight").html(data);
            // jQuery.noConflict();
            $('#viewerModel').modal('toggle');
            GetActivities(TaskId);
        }
    });
}