var id, prev_parent_id, parent_class, master_tree, target_tree, $tabs, prev_is_parent, prev_is_null;
var parents = [];
var childrens = [];
function tree_empty() {
    $(".connectedSortable").each(function () {
        if ($(this).children().length == 0) {
            $(this).addClass("tree-empty");
            //document.styleSheets[0].addRule('#'+$(this).attr("id")+'.tree-empty:after','content: "'+$(this).data("placeholder")+'";');

        } else {
            $(this).removeClass("tree-empty");
        }
    });
}

function reset_all() {
    $tabs.removeClass("dragging");
    $('.hidden').removeClass('hidden');
    $(".ui-sortable").attr("style", "");
}

function holder_add() {
    $(".placeholder-wrap").removeClass("info ");
    $(".placeholder-wrap").removeClass("danger ");
    $(".placeholder-wrap").addClass("danger");
}
function holder_self() {
    $(".placeholder-wrap").removeClass("danger ");
    $(".placeholder-wrap").removeClass("info ");
    $(".placeholder-wrap").addClass("info");
}

function holder_remove() {
    $(".placeholder-wrap").removeClass("info ");
    $(".placeholder-wrap").removeClass("danger ");
    $(".placeholder-wrap").removeClass("danger ");
}
function null_node() {
    if ($("#" + id).data("parent") == 1) {
        $("#" + id).attr("class", "");
        $("#" + id + " .tree-row").css("padding-left", "");
        this_id = id;
        this_parent_prev_id = $("#" + id).data("parent-id");
        this_parent_prev_class = this_parent_prev_id.replace("anode", "treegrid-parent-alfa");
        this_class = this_id.replace("anode", "treegrid-alfa");
        $("#" + id).removeClass(this_parent_prev_class);
        $("#" + id).addClass(this_class + " treegrid-row");
        $("#" + id).attr("data-parent-id", 'null');
        $("#" + id).attr('data-child', '0');
        $("#" + id).attr('data-parent', '1');
    } else {
        $("#" + id).attr("class", "");
        $("#" + id + " .tree-row").css("padding-left", "");
        // setting data-child to 0 for making it independent node
        $("#" + id).attr('data-child', '0');
        $("#" + id).attr('data-parent', '0');
        $("#" + id).addClass("treegrid-row");
        $("#" + id).attr('data-parent-id', 'null');
        //$("#" + id).attr("id", "");
    }
}

function add_node() {
    if ($("#" + id).data("parent") == 1) {
        $("#" + id).attr("class", "");
        parent_class = prev_parent_id;
        parent_class = parent_class.replace("anode", "treegrid-parent-alfa");
        this_id = id;
        this_parent_prev_id = $("#" + id).data("parent-id");
        this_parent_prev_class = this_parent_prev_id.replace("anode", "treegrid-parent-alfa");
        this_class = this_id.replace("anode", "treegrid-alfa");
        $("#" + id).removeClass(this_parent_prev_class);
        $("#" + id).addClass(this_class + " " + parent_class + " treegrid-row");
        $("#" + id).attr("data-parent-id", prev_parent_id);
        $("#" + id).attr('data-child', '1');
        $("#" + id).attr('data-parent', '1');
    } else {
        //removed all previous classes 
        $("#" + id).attr("class", "");
        // setting data-child to 1 for making it child node
        $("#" + id).attr('data-child', '1');
        // adding parent class name for relation 
        parent_class = prev_parent_id;
        parent_class = parent_class.replace("anode", "treegrid-parent-alfa");
        $("#" + id).addClass(parent_class + " treegrid-row");
        $("#" + id).attr("data-parent-id", prev_parent_id);
    }

}
$(document).ready(function () {
    DragDropInit();
});


function DragDropInit() {
    tree_empty();
    $('tr').on('click', function () {
        //$(this).toggleClass('selected');
    });

    $tabs = $(".drag-group");
    $("tbody.connectedSortable")
        .sortable({
            cursorAt: { right: 10, top: 10 },
            containment: ".plan-sprint",
            connectWith: ".connectedSortable",
            //items: "> tr:not(:first)",
            cancel: ".disable",
            scrollSensitivity: 10,
            scrollSpeed: 80,
            appendTo: $tabs,
            helper: "clone",
            revert: 100,
            scroll: true,
            cursor: "move",
            zIndex: 999990,
            dropOnEmpty: true,
            refreshPositions: true,
            placeholder: 'placeholder-wrap',
            tolerance: 'pointer',
            forcePlaceholderSize: true,
            helper: function (e, ui) {
                var id = ui.attr("id");
                var parents
                parents = $("tr[id=" + id + "],tr[data-parent-id=" + id + "]").clone();

                var helper = $('<div/>');

                var $originals = ui.children();
                parents.children().each(function (index) {
                    $(this).width($originals.eq(index).width())
                });
                return helper.append(parents);
            },
            start: function (e, ui) {
                var id = ui.item.attr("id");
                var parents = [];
                ui.item.siblings("tr[data-parent-id=" + id + "]").addClass("hidden")

                parents = ui.item.siblings("tr[data-parent-id=" + id + "]");
                childrens = parents;
                ui.item.data('items', parents);
                $tabs.addClass("dragging")
                ui.placeholder.html("<div class='placeholder-inner'></div>");
                master_tree = $("#" + id).parents(".connectedSortable ");
                master_parent = $("#" + id).attr("data-parent-id");
            },
            over: function (event, ui) {
                id = ui.item.attr("id");
                // $('.placeholder-wrap:before').css("height",$('.placeholder-wrap').next().height());
                prev_parent_id = $('.placeholder-wrap').prevAll("[data-parent = '1']").not(ui.item).attr("id");
                prev_is_parent = $('.placeholder-wrap').prev().attr("data-parent");
                prev_is_null = $('.placeholder-wrap').prev().attr("data-parent-id");
                target_parent = prev_parent_id;
                //console.log("prev_is_null -- " + prev_is_null);
                //console.log("prev_is_parent -- " + prev_is_parent);
                target_tree = $(".placeholder-wrap").parents(".connectedSortable ");

                if ($(target_tree).attr("id") != $(master_tree).attr("id")) {
                    if ($("#" + $(target_tree).attr("id")).hasClass("tree-2")) {
                        $(".ui-sortable-helper").width($(".tree-2").width());
                        $(".ui-sortable-helper").css("left", $(".ui-sortable-helper").offset().left + $(".tree-1").width() - $(".ui-sortable-helper tr").width() + 100)
                        $(".ui-sortable-helper").addClass("for_tree_2");

                    }
                    else {
                        $(".ui-sortable-helper").width($(".tree-1").width());
                        //$(".ui-sortable-helper").css("left", $(".ui-sortable-helper").offset().left + $(".tree-1").width() - $(".ui-sortable-helper tr").width())
                        $(".ui-sortable-helper").removeClass("for_tree_2");

                    }

                }
                else {
                    if ($("#" + $(target_tree).attr("id")).hasClass("tree-2")) {
                        $(".ui-sortable-helper").addClass("for_tree_2");
                        $(".ui-sortable-helper").width($(".tree-2").width());

                    }
                    else {
                        $(".ui-sortable-helper").removeClass("for_tree_2");
                        $(".ui-sortable-helper").width($(".tree-1").width());

                    }


                }
                if ($(ui.item).data("parent") == 1) {
                    // Executed when nod is itself parent.        
                    if (prev_is_parent == '0' && prev_is_null == "null") {
                        holder_remove();
                    } else {
                        if ($("#" + prev_parent_id).data("parent") == 1 && $("#" + prev_parent_id).data("epic") == 0) {
                            holder_add();
                        } else if ($("#" + prev_parent_id).data("epic") == 1) {
                            holder_remove();
                        } else {
                            holder_remove();
                        }
                    }
                } else {
                    // Executed when nod is itself child.   
                    if ($(target_tree).hasClass("not-allowed")) {
                        // Executed when node is dropped in other restricted tree.                            
                        if (prev_parent_id != undefined && $("#" + prev_parent_id).data("epic") == 0) {
                            // Executed when previous nod is parent and we drop there.
                            if (master_parent == target_parent) {
                                holder_add();
                            } else {
                                holder_remove();
                            }
                        } else {
                            holder_add();
                        }

                    } else {
                        if (prev_parent_id != undefined && $("#" + prev_parent_id).data("epic") == 0) {
                            if (master_parent == target_parent) {
                                holder_add();
                            } else {
                                holder_remove();
                            }
                        } else if ($("#" + prev_parent_id).data("epic") == 1) {
                            holder_add();
                        } else {
                            holder_remove();
                        }

                    }
                }
                $(".ui-sortable").css("display", "block");
                tree_empty()
            },
            out: function (event, ui) {
                if ($("#" + $(master_tree).attr("id")).hasClass("tree-2")) {
                    $(".ui-sortable-helper").addClass("for_tree_2");
                    $(".ui-sortable-helper").width($(".tree-2").width());

                }
                else {
                    $(".ui-sortable-helper").removeClass("for_tree_2");
                    $(".ui-sortable-helper").width($(".tree-1").width());

                }
            },
            beforeStop: function (event, ui) {
                id = ui.item.attr("id");
                prev_parent_id = $('.placeholder-wrap').prevAll("[data-parent = '1']").not(ui.item).attr("id");
                prev_is_parent = $('.placeholder-wrap').prev().prev().attr("data-parent");
                prev_is_null = $('.placeholder-wrap').prev().prev().attr("data-parent-id");
                // alert(prev_is_parent + "-" + prev_is_null);
                target_tree = $(".placeholder-wrap").parents(".connectedSortable");
                target_parent = prev_parent_id;
                tree_empty()
                // console.log("**********************************");
                // console.log("id - " + id);
                // console.log("prev_parent_id - " + prev_parent_id);
                // console.log("prev_is_parent - " + prev_is_parent);
                // console.log("prev_is_null - " + prev_is_null);
                // console.log("master_tree - " + $(master_tree).attr("id"));
                // console.log("target_tree - " + $(target_tree).attr("id"));
                // console.log("**********************************");
            },
            update: function (event, ui) {
                tree_grid();
                tree_empty();
            },
            receive: function (e, ui) {
                if ($("#" + prev_parent_id).data("parent") != 1) {
                    ui.item.after(ui.item.data('items'));
                }
            },
            stop: function (e, ui) {
                reset_all();
                tree_empty();
                // to get list of all id after sort 
                var sortedGrades = $(this).sortable('toArray');
                //=alert(sortedGrades);
                if ($(ui.item).data("parent") == 1) {
                    // Executed when nod is itself parent.  
                    if ($("#" + prev_parent_id).data("parent") == 1 && $("#" + prev_parent_id).data("epic") == 0) {
                        // Executed when previous node is a parent and we will cancel dropping.
                        reset_all();
                        $(this).sortable('cancel');
                    } else if ($("#" + prev_parent_id).data("epic") == 1) {
                        // Executed when parent is epic we will drop there and make it's child.
                        add_node();
                        ui.item.after(ui.item.data('items'));
                        DragdropForBacklogAndSprint(this);
                    } else {
                        // Executed when previous node is not exist or not parent of any child  very first position and we will drop there.
                        null_node();
                        ui.item.after(ui.item.data('items'));
                        DragdropForBacklogAndSprint(this);
                    }

                } else {
                    // Executed when nod is itself child.
                    if ($(target_tree).hasClass("not-allowed")) {
                        // Executed when node is dropped in other restricted tree and we will cancel dropping.                            
                        if (prev_parent_id != undefined && $("#" + prev_parent_id).data("epic") == 0) {
                            // Executed when previous nod is parent and we drop there.
                            if (master_parent == target_parent) {
                                reset_all();
                                $(this).sortable('cancel');
                            } else {
                                add_node();
                                DragdropForBacklogAndSprint(this);
                            }
                        } else {
                            reset_all();
                            $(this).sortable('cancel');

                        }

                    } else {
                        // Executed when node is dropped in same tree and we will make that node independent.
                        if (prev_is_parent == '0' && prev_is_null == "null") {
                            // Executed when previous node is not a parent and has not parent in sort independent child.
                            null_node();
                            DragdropForBacklogAndSprint(this);
                        } else {
                            if (prev_parent_id != undefined && $("#" + prev_parent_id).data("epic") == 0) {
                                // Executed when previous nod is parent and we drop there.
                                if (master_parent == target_parent) {
                                    reset_all();
                                    $(this).sortable('cancel');
                                } else {
                                    add_node();
                                    DragdropForBacklogAndSprint(this);
                                }
                            } else if ($("#" + prev_parent_id).data("epic") == 1) {
                                // Executed when parent is epic and we will cancel dropping.
                                reset_all();
                                $(this).sortable('cancel');
                            } else {
                                // Executed when node is dropped in same tree and we will make that node independent.
                                null_node();
                                DragdropForBacklogAndSprint(this);
                            }
                        }
                    }
                }
                //--------Sprint Drag drop Start---------//
                //DragdropForBacklogAndSprint(this);
                //--------Sprint Drag drop End---------//
                tree_grid();
                tree_empty();

            },

        })
        .disableSelection();
}

function DragdropForBacklogAndSprint(ths) {
    var childs = [];

    for (var i = 0; i < childrens.length; i++) {
        childs.push(childrens[i].id.split('-')[1]);
    }
    var FromId = [], ToId = 0;
    if ($('#' + id).attr("data-parent-id") != "null") {
        ToId = $('#' + id).attr("data-parent-id").split('-')[1];
    }
    if ($(target_tree).attr("id") == $(master_tree).attr("id")) {
        if (master_parent != target_parent) {

            if ((master_parent == "" || master_parent == "null" || master_parent == "anode-") && target_parent == undefined) { }
            else {
                FromId = id.split('-')[1];
                if ($(target_tree).attr("id").toLowerCase().indexOf('plan') >= 0) {
                    if (ToId != undefined && ToId > 0) {
                        DragDropWorkItems(FromId, ToId);
                    }
                }
                else {
                    if (ToId != undefined) {
                        DragDropWorkItems(FromId, ToId);
                    }
                }
            }
        }

    }
    else {
        var parId = id.split('-')[1]
        //childs.push(parId);
        FromId = childs;
        if (ToId != undefined) {
            if ($(ths).parents('.connectedSortable').context.id.toLowerCase().indexOf('planned') >= 0)//--For checking Right to Left
            {
                var canDel = true;
                if ($("#ManageSprinType").val() == Enum_SprintType_Active && ths.children.length ==0) {
                    canDel = CheckForLastWorkItemActiveSprint($('#drpSprint').val());
                }
                if (canDel) {
                    DragDropFromSprintToBacklog(parId, FromId, ToId);
                }
                else {
                    tree_empty();
                    $(ths).sortable('cancel');
                    toastr.error('Last work item cannot be moved to backlog from the Active sprint');
                }
            }
            else {
                DragDropFromBacklogToSprint(parId, FromId, ToId, false);
            }
        }
    }
}

