$(document).ready(function () {
    $(document).keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            event.preventDefault();
            if ($(".txtComment").is(":focus")) {
                var textComment = $(".txtComment").val();
                searchComment(textComment);
            }
        }
    });
    $(".btnSearchComment").on('click', function () {
        var textComment = $(".txtComment").val();
        searchComment(textComment);
    });
    $(".sprint-close").click(function () {
        $('.search-block').toggleClass('open');
        $(".txtComment").val('');
        searchComment('');
        $('.sprint-close').addClass('disappear-close');
    });
   // $(".searchtask").unbind("click");
    $(document).on("click",".searchtask", function () {   
        $(this).prev('span').removeClass('disappear-close');
    });
});
function searchComment(textComment) {   
    $.ajax({
        type: "POST",
        url: urlGetComments,
        dataType: 'html',
        data: "{'ProjectId':'" + ProjectId + "','TaskId':'" + TaskId + "','commentSearch':'" + textComment + "'}",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#dvCommentList").empty();
            $("#dvCommentList").html(data);
        }
    });
}