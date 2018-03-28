$('document').ready(function () {
    InitalizejQuery();
    Sys.WebForms.PageRequestManager.getInstance().add_endRequest(InitalizejQuery);
});

function gvCatagory_Init(s, e) {
    InitalizejQuery();
    Sys.WebForms.PageRequestManager.getInstance().add_endRequest(InitalizejQuery);
}

function InitalizejQuery() {
    $('.draggable').draggable({ helper: 'clone' });
    $('.draggable').droppable({

        activeClass: "hover",
        drop: function (event, ui) {

            var draggingRowKey = ui.draggable.find("input[type='hidden']").val();
            var targetRowKey = $(this).find("input[type='hidden']").val();
            gvCatagory.PerformCallback("DRAGROW|" + draggingRowKey + '|' + targetRowKey);
            window.location.href = "addcatagory.aspx";
        }
    });

}