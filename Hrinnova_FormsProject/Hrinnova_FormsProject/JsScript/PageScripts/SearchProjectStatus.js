$(document).ready(function () {
    GetActiveProject();

});


function GetActiveProject() {

    $.ajax({
        type: "POST",
        url: "../Admin/SearchProjectStatus.aspx/GetActiveProject",
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (jsonresult) {
            var lstProject = jQuery.parseJSON(jsonresult.d);

            $("#ddlProject").append($("<option></option>").val('0').html('Select Project'));
            for (var index = 0; index < lstProject.length; index++) {
                $("#ddlProject").append($("<option></option>").val(lstProject[index].projectID).html(lstProject[index].proName));
            }

        },
        error: function (jsonresult) {
            alert(jsonresult.responseText);
        }
    });
}

$(document).on('click', '#btnSearch', function (e) {
    e.preventDefault();
    var ProjectID = $("#ddlProject").val();
    var FromDate = $("#MainContent_UcFromDate_txtToEventDate").val();
    var ToDate = $("#MainContent_UcToDate_txtToEventDate").val();
    //alert(ProjectID + " " + FromDate + " " + ToDate);
    var data = JSON.stringify({ ProjectID: ProjectID, FromDate: FromDate, ToDate: ToDate });
    //alert(data);
    $.ajax({
        type: 'post',
        url: '../Admin/SearchProjectStatus.aspx/SearchProjectStatusResult',
        contentType: 'application/json;charset=utf-8',
        data: data,
        dataType: 'json',
        success: function (JsonData) {
            var SearchResult = jQuery.parseJSON(JsonData.d);
            BindData(SearchResult);
            paging();
        }
    });

});
function BindData(SearchResult) {
    $("#tblbody").empty();
    for (var index = 0; index < SearchResult.length; index++) {
        var CreateOn = (SearchResult[index].Date).split('T');
        var date = CreateOn[0];
        var projstatusId = "ProjStatusId" + SearchResult[index].ProjectStatusReportId;
        var RedirectUrl = "../Admin/ViewProjectstatusQuestionAnswer.aspx?ProjStatusId=" + projstatusId;

        $("#tblbody").append($("<tr></tr>")
                .append($("<td></td>").attr("id", projstatusId).html(SearchResult[index].ProjectStatusReportId).hide())
                .append($("<td></td>").html(date).css('text-align', 'center').css('width', '25%'))
                .append($("<td></td>").html(SearchResult[index].Project).css('text-align', 'center'))
                .append($("<td></td>").html(SearchResult[index].Zone).css('text-align', 'center'))
        //.append($("<td></td>").append($("<a></a>").attr("href", "#").text("View").attr("id", "View_" + SearchResult[index].ProjectStatusReportId).addClass("ViewProjStatus").css('text-align', 'center')))

        .append($("<td></td>").append($("<a></a>").attr("href", RedirectUrl).text("View").attr("id", "View_" + SearchResult[index].ProjectStatusReportId).addClass("ViewProjStatus").css('text-align', 'center')))
                );

        $("#tblSearchResult > tbody > tr:odd").addClass("altr");
    }
}


$(document).on("click", '.ViewProjStatus', function (e) {
    e.preventDefault();
    var ViewId = $(this).attr("id");
    var Ids = ViewId.split('_');
    var ProjectStatusId = Ids[1];
    window.location = "../Admin/ViewProjectstatusQuestionAnswer.aspx?ProjStatusId=" + ProjectStatusId;
})
$(document).on("click", '.sortField', function (e) {
    //alert("clicked");
    var SortExpression = $(this).text();
    //    alert(SortExpression);
    var ProjectID = $("#ddlProject").val();
    var FromDate = $("#MainContent_UcFromDate_txtToEventDate").val();
    var ToDate = $("#MainContent_UcToDate_txtToEventDate").val();

    var data = JSON.stringify({ ProjectID: ProjectID, FromDate: FromDate, ToDate: ToDate, sortExpression: SortExpression });

    $.ajax({
        type: 'post',
        url: '../Admin/SearchProjectStatus.aspx/SortProjectStatus',
        contentType: 'application/json;charset=utf-8',
        data: data,
        dataType: 'json',
        success: function (JsonData) {
            var SearchResult = jQuery.parseJSON(JsonData.d);
            BindData(SearchResult);
            paging();
        }
    });

})
function paging() {
    $("#tblSearchResult").each(function () {
        var currentPage = 0;
        var numPerPage = 5;
        var $table = $(this);
        $table.bind('repaginate', function () {
            $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
            //$table.find("tbody  tr:odd").addClass("altr");


        });
        $table.trigger('repaginate');
        var numRows = $table.find('tbody tr').length;
        var numPages = Math.ceil(numRows / numPerPage);
        var $pager = $('<div class="pager"></div>');
        //Bind PageNumber
        $(".page-number").remove();
        for (var page = 0; page < numPages; page++) {
            if (numPages > 1) {
                $('<span class="page-number"></span>').append($("<a></a>").text(page + 1)).bind('click', {
                    newPage: page
                }, function (event) {
                    currentPage = event.data['newPage'];
                    $table.trigger('repaginate');


                    $(this).addClass('active').siblings().removeClass('active');
                }).appendTo($pager).addClass('clickable');
            }

        }
        $pager.insertAfter($table).find('span.page-number:first').addClass('active');

    });
};