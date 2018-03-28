function pageLoad() {

    $("#drpParentMenu").change(function () {       

        if ($('#drpParentMenu :selected').val() > 0) {

            $('#SpChildType').text('*');
        }
        else {
            $('#SpChildType').text('');
        }

    });
}

function validateParent(sender, args) {   
    
    var chkchild = $("#drpParentMenu").attr('id');        
    if ($('#drpParentMenu :selected').val() > 0) {
        ValidatorEnable($("[id$=rfType]")[0], true);
        
    }
    else {

        ValidatorEnable($("[id$=rfType]")[0], false);
    }
} 