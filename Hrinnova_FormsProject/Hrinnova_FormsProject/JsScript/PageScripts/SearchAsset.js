$(document).ready(function () {
    PopupInstance();
    CategoryChange();
    Sys.WebForms.PageRequestManager.getInstance().add_endRequest(PopupInstance);
    Sys.WebForms.PageRequestManager.getInstance().add_endRequest(CategoryChange);
});


function CategoryChange() {
    $(function () {
        $("#MainContent_cboCategory").change(function () {
            //alert("called");
            var n = $(this).val();
            if (n == '1') {                
                $("#MainContent_cboBrand").prop("disabled", false);
                $("#MainContent_cboShared").prop("disabled", false);
                $("#MainContent_cboStatus").prop("disabled", false);
                $("#dvDate").show();
            }
            if (n == '2') {
                //alert('Software');
                $("#MainContent_cboBrand").prop("disabled", true);
                $("#MainContent_cboShared").prop("disabled", true);
                $("#MainContent_cboStatus").prop("disabled", true);
                $("#dvDate").hide();

            }
        });
    });
}
function PopupInstance() {
    $(function () {        
        $(".popUpClass").live().hover(
                            function () {
                                var offset, top, left;
                                var $this = $(this);
                                offset = $this.offset();
                                top = offset.top - 45;
                                top = (top > 0) ? top : 0;
                                left = offset.left + 20;
                                left = (left > 0) ? left : 0;
                                $(this).next(".popUpContainer").show().css({ top: top, left: left });

                                //    $(this).next(".popUpContainer").show() 
                            },
                            function () { $(this).next(".popUpContainer").hide() }
                     );
                            $(".popUpContainer").hover(        
                                function () { $(this).show() },
                                function () { $(this).hide() }

                     );
    });
}