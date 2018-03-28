$(document).ready(function () {    
    handler();
    Sys.WebForms.PageRequestManager.getInstance().add_endRequest(handler);
    //For Department Checkbox list
});
function handler() {
    if ($("select").hasClass("chosen-select")) {
        $(".chosen-select").chosen({

        });
    }
}
function btDelete_Click(s, e) {
    
    if (!confirm("Etes-vous sur de vouloir supprimer?"))
        return;
    var focusedNode = treeList.GetFocusedNodeKey()
    var nodeState = treeList.GetNodeState(focusedNode);
    if (nodeState != "Child") {
        alert("Your custom \"The node has descendant node\" message.");
        return;
    }
    treeList.DeleteNode(focusedNode);
}
function treeList_CustomButtonClick(s, e) {
    s.PerformCustomDataCallback(e.nodeKey);
}