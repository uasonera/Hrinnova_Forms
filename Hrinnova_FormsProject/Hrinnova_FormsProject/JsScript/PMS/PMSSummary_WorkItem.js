$(document).ready(function () {
   
    GetWorkItemsByIteration();
    function GetWorkItemsByIteration(Iteration) {
        $.ajax({
            type: "POST",
            url: "../PMSSummary/GetWorkItemListingforSummary",
            dataType: 'html',
            data: "{'IterationId':'" + Iteration + "'}",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $("#dv-work-item").html(data);
            }

        });
    }
});
