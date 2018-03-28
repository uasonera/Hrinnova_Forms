function tlLink_Init(s, e) {

}

function tlLink_StartDragNode(s, e) {
    
    var nodeKeys = s.GetVisibleNodeKeys();
    e.targets.length = 0;
    for (var i = 0; i < nodeKeys.length; i++) {
        if (s.GetNodeHtmlElement(nodeKeys[i]).getAttribute("nodeParent") == s.GetNodeHtmlElement(e.nodeKey).getAttribute("nodeParent")) {
            e.targets.push(s.GetNodeHtmlElement(nodeKeys[i]));
        }
    }
}

function tlLink_EndDragNode(s, e) {
    
    var nodeKeys = s.GetVisibleNodeKeys();
    for (var i = 0; i < nodeKeys.length; i++) {
        if (s.GetNodeHtmlElement(nodeKeys[i]) == e.targetElement) {
            s.PerformCallback("DRAGNODE" + e.nodeKey + "|" + nodeKeys[i]);
            return;
        }
    }

    e.cancel = true;
}