var id, prev_parent_id, parent_class, master_tree, target_tree, $tabs, prev_is_parent, prev_is_null;

function tree_empty() {
    $(".connectedSortable").each(function () {
        if ($(this).children().length == 0) {
            $(this).addClass("tree-empty");

            $(this).css("min-height", $(this).parents(".custom-scroll").height() - 30 + "px")
        } else {
            $(this).removeClass("tree-empty");
            $(this).css("min-height", $(this).parents(".custom-scroll").height() - 30 + "px")
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
    $("#" + id).attr("class", "");
    $("#" + id + " .tree-row").css("padding-left", "2px");
    // setting data-child to 0 for making it independent node
    $("#" + id).attr('data-child', '0');
    $("#" + id).attr('data-parent', '0');
    $("#" + id).addClass("strip list-row");
    $("#" + id).attr('data-parent-id', 'null');
    //$("#" + id).attr("id", "");
}

function add_node() {
    //removed all previous classes 
    $("#" + id).attr("class", "");
    // setting data-child to 1 for making it child node
    $("#" + id).attr('data-child', '1');
    // adding parent class name for relation 
    parent_class = prev_parent_id;
    parent_class = parent_class.replace("anode", "treegrid-parent-alfa");
    $("#" + id).addClass(parent_class + " list-row");
    $("#" + id).attr("data-parent-id", prev_parent_id);
}
function viewBoard_Drag_Init() {
    tree_empty();
    $('tr').on('click', function () {
        //$(this).toggleClass('selected');
    });

    $tabs = $(".drag-group");
    $(".connectedSortable")
        .sortable({
            // containment: "parent",
            connectWith: ".connectedSortable",
            //appendTo: $tabs,
            cancel: ".disable",
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
                id = ui.attr("id");
                var parents
                parents = $("li[id=" + id + "]").clone();
                var helper = $('<div/>');
                return helper.append(parents);
            },
            start: function (e, ui) {
                id = ui.item.attr("id");
                $tabs.addClass("dragging")
                ui.placeholder.html("<div class='placeholder-inner'></div>");
                master_tree = $("#" + id).parents(".connectedSortable ");

                DisableNotStatusByWorkflow($(master_tree).attr("id"), $("#" + id).attr("id"))
                //$('.connectedSortable').removeClass('not-allowed');
                //$('#list-2').addClass('not-allowed');
                $(".list-row").each(function () {
                    if ($(this).css("display") == "none") {
                        $(this).not(ui.item).addClass("hidden-row");
                    }
                });
            },
            over: function (event, ui) {
                id = ui.item.attr("id");
                // console.log("prev_is_null -- " + prev_is_null);
                //console.log("prev_is_parent -- " + prev_is_parent);
                target_tree = $(".placeholder-wrap").parents(".connectedSortable ");
                if ($(target_tree).attr("id") == $(master_tree).attr("id")) {
                    holder_self();
                    $(".list-row").not(ui.item).show();
                    $(".list-row.hidden-row").not(ui.item).hide();
                    $(".placeholder-wrap").siblings().each(function () {
                        if ($(this).is(":visible")) {
                            $(this).hide();
                        }
                    })
                }
                else if ($(target_tree).hasClass("not-allowed")) {
                    holder_add();
                    $(".list-row").not(ui.item).show();
                    $(".list-row.hidden-row").not(ui.item).hide();
                    $(".placeholder-wrap").siblings().each(function () {
                        if ($(this).is(":visible")) {
                            $(this).hide();
                        }
                    })
                }
                else {
                    holder_remove();
                    $(".list-row").not(ui.item).show();
                    $(".list-row.hidden-row").hide();
                    $(".placeholder-wrap").siblings().each(function () {
                        if ($(this).is(":visible")) {
                            $(this).hide();
                        }
                    })
                }
                $(".ui-sortable").css("display", "block");
                tree_empty();
            },
            beforeStop: function (event, ui) {
                id = ui.item.attr("id");
                parent_id = ui.item.attr("data-parent-id");
                target_tree = $(".placeholder-wrap").parents(".connectedSortable");
                tree_empty();
            },
            update: function (event, ui) {


            },
            receive: function (e, ui) {
                ShowProgress();
                ui.item.after(ui.item.data('items'));
                tree_empty();
            },
            stop: function (e, ui) {
                reset_all();
                tree_empty();
                // to get list of all id after sort 
                var sortedGrades = $(this).sortable('toArray');
                // Executed when nod is itself child. 
                if ($(target_tree).attr("id") == $(master_tree).attr("id")) {
                    reset_all();
                    $(this).sortable('cancel');
                    HideProgress(); 
                }
                else if ($(target_tree).hasClass("not-allowed")) {
                    reset_all();
                    $(this).sortable('cancel');
                    HideProgress(); 
                }
                else {
                    // Executed when previous node is not exist very first position and we will drop there.
                    ui.item.after(ui.item.data('items'));
                    if ($(target_tree).attr("id") !== undefined) {
                        ChangeStatus($("#" + id).attr("id"), $(master_tree).attr("id"), $(target_tree).attr("id"), this);
                    }
                    else {
                        HideProgress(); 
                    }
                }
                tree_empty();
                //alert($(master_tree).attr("id") + ' --- ' + $(target_tree).attr("id") + " --- " + $("#" + id).attr("id"));
                $(".list-row").not(ui.item).show();
                $(".list-row.hidden-row").not(ui.item).hide();
                $(".list-row").removeClass("hidden-row");

            },


        })
        .disableSelection();
    $('.connectedSortable').each(function () {
        $(this).sortable({
            containment: $(this).parents(".custom-scroll-horizontal"),
            appendTo: $(this).parents(".custom-scroll-horizontal"),
        });
    });
}
$(document).ready(function () {
    viewBoard_Drag_Init();
});
function ChangeStatus(task, source, destination, obj) {

    var checkLogin = CheckSession();
    if (checkLogin) {
        var result = CheskMaxTasksValidation(destination);//#1(PMSViewBoard.js)
        if (result == false) {
            reset_all();
            $(obj).sortable('cancel');
            HideProgress();
        }
        else {
            InitiateUpdate(task, source, destination);//#2(PMSViewBoard.js)
        }
    }
    else {
        window.location.reload();
    }


}
function CheckSession() {
    var IsSession = false;
    $.ajax({
        url: '/AttendanceView/checkSessionTimeout',
        type: 'GET',
        contentType: 'application/json;charset=utf-8',
        async: false,
        dataType: 'json',
        success: function (data) {
            if (data) {
                IsSession = true;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText)
        }
    });
    if (!IsSession) {
        return false;
    }
    else {
        return true;
    }
}