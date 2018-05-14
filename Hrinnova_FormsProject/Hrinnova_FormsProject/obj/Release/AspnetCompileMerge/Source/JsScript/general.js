// JavaScript Document for FeildSet Start//
var wwold = $(window).width();
var ww = $(window).width();
var wh = $(window).height();
$(document).ready(function (e) {



    $('button.close').on('click', function () {
        $(".has-error").each(function () {
            $(this).removeClass("has-error has-feedback");
        })
    });
    //main wrapper height
    //$("#wrapper").css({'height':($(document).height()) });
    //button n link with 3 state
    validation_focus_init()


    setupCheckboxes();
    if (typeof (Sys) !== 'undefined') { Sys.WebForms.PageRequestManager.getInstance().add_endRequest(setupCheckboxes); }

    //   $('[data-toggle="tooltip"]').tooltip();

    $(".button").mouseover(function () {
        $(this).addClass("hover");
    });
    $(".button").mouseout(function () {
        $(this).removeClass("hover").removeClass("pressed"); // remove hover effect
    });
    $(".button").mousedown(function () {
        $(this).addClass("pressed"); // add active state
    });
    $(".button").mouseup(function () {
        $(this).removeClass("pressed"); //remove active state
    });
    //focus an blur event
    $('input[type="text"] , textarea').addClass("idlefield");
    $('input[type="text"] , textarea').focus(function () {

        //       			$(this).removeClass("idlefield").addClass("focusfield");
        //    		    if (this.value == this.defaultValue){ 
        //    		    	this.value = '';
        //				}
        //				if(this.value != this.defaultValue){
        //	    			this.select();
        //	    		}
    });
    $('input[type="text"] , textarea').blur(function () {

        //    			$(this).removeClass("focusfield").addClass("activefield");
        //    		    if ($.trim(this.value) == ''){
        //			    	this.value = (this.defaultValue ? this.defaultValue : '');
        //					$(this).removeClass("activefield").addClass("idlefield");
        //				}
    });

    $('#lnkSignInAsDiffUser_Click').click(function () {
    });

    /* Add For New Style Menu Start*/
    //showMenuIcon();
    MenuClick();
    /************* Side manu ******************/
    ManageMenu();
    ManageSlider();
    /****************** left side bar for menu toggle ***********/
    left_side_bar();
    /***************** menu close on body click ******************/
    menu_else_click();
    /******************* auto header space for sidebar and *****************/
    auto_head_space();
    /****************** ripple effact *****************/
    ripple_effact_init();
    /************ Collaps heading active initi **************/
    collaps_init()
    /********************* menu scroll active *****************/
    menu_scroll_init();
    /********************* custome file type *****************/
    filetype_init();
    /******************************* checkbox style-2 *******************/
    chk_style_2_init()
    /************ footer space for fixed footer buttons initi **************/
    footer_space_init()
    /******************* chosen dynamic height and position ***********************/
    chosen_position();
    /******************* drop down dynamic height ***********************/
    dropdown_position();
    /************ Modal body scroller  **************/
    modal_body_init()

    /* Add For New Style Menu End*/
    $(".mobile-menu a").click(function () {
        $(".main-container").toggleClass("active");
    });
    $(document).on('click', '.searchtask', function () {
        //$(".search-block").toggleClass("open");
    });

    if (window.location.href.indexOf("trainingcalendar") > 0) {
        $("#hdnActiveMenuItem").val("TrainingCalendar");

    }
    if (window.location.href.indexOf("UserDashboard") < 0) {
        var menuId = $('#hdnActiveMenuId').val();
        if (menuId != "" && menuId != null) {
            $("." + menuId).parent('td').addClass('active');
            if ($("#hdnActiveMenuItem") != undefined) {
                if ($("#hdnActiveMenuItem").val() != "") {
                    var menuItemId = $("#hdnActiveMenuItem").val();
                    var menuItem = "." + menuItemId;
                    if ($(menuItem) != undefined) {
                        $(menuItem).each(function () {

                            if ($(this).attr('id') != "parent" || $(this).attr('id') == undefined) {
                                $(this).addClass('activeMenuItem');
                            }
                        });
                    }
                }
            }
            if ($("#hdnParentMenuItem") != undefined) {
                if ($("#hdnParentMenuItem").val() != "") {
                    var menuItemId = $("#hdnParentMenuItem").val();
                    var menuItem = "." + menuItemId;
                    if ($(menuItem) != undefined) {
                        $(menuItem).each(function () {
                            if ($(this).attr('id') != "parent" || $(this).attr('id') == undefined) {
                                $(this).addClass('activeMenuItem');
                            }
                        });
                    }
                }
            }
        }
    }

    //Increase scroll with in mouse hover
    //$(".mCustomScrollbar").mCustomScrollbar({
    //    autoExpandScrollbar: true
    //});


    //For Common Sign In
    $("a.KRA").attr("href", "javascript:void(0)");
    $("a.KRA").click(function () {
        $.ajax({
            type: "POST",
            url: "../KRA/AuthenticateUser",
            data: "{}",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (result) {
                var count = result.includes("Login/AuthenticateUser");
                if (count == true) {
                    window.open(result, '_blank');
                }
                else {
                    window.location.href = '/login';
                }
            },
            error: function (error) {
                window.location.href = '/login';
            }
        })
    });

});
// JavaScript Document for FeildSet End//

//Start: Javascript for Master pagres 


$('document').ready(function () {

    $('#btnFavorite').click(function (event) {
        event.preventDefault();

        SetFavoriteProject();

    })

    $(document).click(function (e) {
        //$('.selector-button').toggleClass('fa fa-chevron-left');
        var IsParentPopup = false;
        $(e.target).parents().each(function () {
            if ($(this).attr('id') == 'slideMenu') {
                IsParentPopup = true;
            }
            if ($(this).attr('class') == 'selector-button') {
                IsParentPopup = true;
                $('.side-nav-btn').toggle();
            }
        });
        if (!IsParentPopup && $('.side-navigation-container').hasClass('visable')) {
            $('.side-navigation-container').toggleClass('visable', false);
            $('.side-nav-btn').hide();
            // $('.side-nav-btn').toggle();

        }
    });
    $('.selector-button').click(function () {
        /* $(this).removeClass('fa fa-chevron-left')
         $(this).toggleClass('fa fa-chevron-right');*/

        ResetValues();
        if (!$('.side-navigation-container').hasClass('visable')) {
            $('.side-navigation-container').toggleClass('visable');

            $.ajax({
                type: "POST",
                url: "../UserDashboard/AddSuggestion",
                dataType: 'html',
                async: false,
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    $(".navigation-content").html(response);
                    $('#btnCancelSuggestion').remove();
                }
            });
        }
        else {
            $('.side-navigation-container').toggleClass('visable', false);
            $('.side-nav-btn').toggle();
        }
    });

    function SetFavoriteProject() {
        var ProjectId = $('#ddlProjectList').val();

        // var DTO = JSON.stringify({ method: 'SetFavoriteProject', args: { 'ProjectId': ProjectId } });
        var DTO = JSON.stringify({ "ProjectId": ProjectId });

        $.ajax({
            type: "POST",

            //url: "../Handlers/AccountHandler.ashx?MethodName=SetFavoriteProject",
            url: "../Handlers/AccountHandler.ashx?MethodName=SetFavoriteProject",
            data: DTO,
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (result) {
                toastr.success(result.Message);
            },
            error: function (error) {
                //toastr.failed(result.Message);
            }

        })

    }

    function ShowPopup(message) {

        $('#popup_box').center();

        $('.ltrAlert').text(message);

        $('#popup_box').fadeIn(100);
        $('#popup_box').fadeOut(10000);
        SetPopupPosition();

    };
    function SetPopupPosition() {
        var startLeft = $(window).width() / 2 - ($("#popup_box").width() / 2);
        $("#popup_box").css("position", "fixed");
        $("#popup_box").css("top", "0px");
        $("#popup_box").css("left", startLeft + "px");
    };
    //End: Javascript for Master pagres 
    /**************** custome scroll ********************/
    custome_scroll_init();
});
/********************* resize function *************************/
$(window).resize(function () {
    ww = $(window).width();
    wh = $(window).height();

    if (ww <= 767) {
        $(".innerpage-wrap").toggleClass("mobile-view");
    }
    else {
        $(".innerpage-wrap").toggleClass("mobile-view");
    }
    /************ sidebar *******************/
    ManageSlider()
    menu_hide()
    $('.side-bar-container').removeClass("active");
    $(".innerpage-wrap ").removeClass('active');
    $('.selector-button-menu').addClass("fa-bars").removeClass("fa-close").removeClass("active");
    /******************* auto header space for sidebar and *****************/
    auto_head_space();
})
function menu_else_click() {
    $("body,.close-menu").click(function (argument) {
        menu_hide();
        $(".innerpage-wrap ").removeClass('active');
        $('.selector-button-menu').addClass("fa-bars").removeClass("fa-close");
        $('.selector-button-menu').removeClass("active");
    })
    $('.page-sidebar, .selector-button-menu').click(function (event) {
        event.stopPropagation();
    });
}
function left_side_bar() {
    $('.selector-button-menu').click(function () {
        $(this).toggleClass("active");

        $('.side-bar-container').toggleClass('active');
        $(".innerpage-wrap ").toggleClass('active');
        $(this).toggleClass("fa-bars").toggleClass("fa-close");

        var elements = $('.cssmenu ul li[class*="active"]');
        if ($(elements).length > 0) {
            $(elements).each(function (i, ele) {
                $(ele).removeClass('open').removeClass('active');
                $(ele).children('ul').css('display', 'none');
            });
        }
        var elements = $('.cssmenu ul li[class*="open"]');
        if ($(elements).length > 0) {
            $(elements).each(function (i, ele) {
                $(ele).removeClass('open').removeClass('active');
                $(ele).children('ul').css('display', 'none');
            });
        }
        var elements = $('.cssmenu1 ul li[class*="open"]');
        if ($(elements).length > 0) {
            $(elements).each(function (i, ele) {
                $(ele).removeClass('open').removeClass('active');
                $(ele).children('ul').css('display', 'none');
            });
        }
        var elements = $('.cssmenu1 ul li[class*="active"]');
        if ($(elements).length > 0) {
            $(elements).each(function (i, ele) {
                $(ele).removeClass('open').removeClass('active');
                $(ele).children('ul').css('display', 'none');
            });
        }

    });

}
/****************** ripple effact *****************/

function ripple_effact_init() {
    $(document).on('click', ".btn,.user-action,.ripple", function (e) {
        element = $(this);
        if (element.find(".drop_rip").length === 0)
            element.prepend("<span class='drop_rip'></span>");

        drop = element.find(".drop_rip");
        drop.removeClass("animate");

        if (!drop.height() && !drop.width()) {
            d = Math.max(element.outerWidth(), element.outerHeight());
            drop.css({ height: d, width: d });
        }

        x = e.pageX - element.offset().left - drop.width() / 2;
        y = e.pageY - element.offset().top - drop.height() / 2;

        //set the position and add class .animate
        drop.css({ top: y + 'px', left: x + 'px' }).addClass("animate");
    });
    $(document).on("mouseenter", ".btn,.user-action,.ripple", function (e) {
        element = $(this);
        if (element.find(".drop_rip").length === 0)
            element.prepend("<span class='drop_rip'></span>");

        drop = element.find(".drop_rip");
        drop.removeClass("animate");

        if (!drop.height() && !drop.width()) {
            d = Math.max(element.outerWidth(), element.outerHeight());
            drop.css({ height: d, width: d });
        }

        x = e.pageX - element.offset().left - drop.width() / 2;
        y = e.pageY - element.offset().top - drop.height() / 2;

        //set the position and add class .animate
        drop.css({ top: y + 'px', left: x + 'px' }).addClass("animate");
    });
}
/***************** slide bar toggle on hover ************************/
function menu_hide() {
    $(".side-bar-container").removeClass('active');

    var elements = $('.cssmenu ul li[class*="open"]');
    if ($(elements).length > 0) {
        $(elements).each(function (i, ele) {
            $(ele).removeClass('open').removeClass('active');
            $(ele).children('ul').css('display', 'none');
        });
    }
    var elements = $('.cssmenu1 ul li[class*="open"]');
    if ($(elements).length > 0) {
        $(elements).each(function (i, ele) {
            $(ele).removeClass('open').removeClass('active');
            $(ele).children('ul').css('display', 'none');
        });
    }
    var elements = $('.cssmenu ul li[class*="active"]');
    if ($(elements).length > 0) {
        $(elements).each(function (i, ele) {
            $(ele).removeClass('open').removeClass('active');
            $(ele).children('ul').css('display', 'none');
        });
    }
    var elements = $('.cssmenu ul li[class*="open"]');
    if ($(elements).length > 0) {
        $(elements).each(function (i, ele) {
            $(ele).removeClass('open').removeClass('active');
            $(ele).children('ul').css('display', 'none');
        });
    }
    var elements = $('.cssmenu1 ul li[class*="open"]');
    if ($(elements).length > 0) {
        $(elements).each(function (i, ele) {
            $(ele).removeClass('open').removeClass('active');
            $(ele).children('ul').css('display', 'none');
        });
    }
    var elements = $('.cssmenu1 ul li[class*="active"]');
    if ($(elements).length > 0) {
        $(elements).each(function (i, ele) {
            $(ele).removeClass('open').removeClass('active');
            $(ele).children('ul').css('display', 'none');
        });
    }
}
function ManageSlider() {
    ww = $(window).width();
    if (ww > 767) {
        $('.page-sidebar').unbind('mouseenter').bind('click', function () {
            //do some things
            if ($(".side-bar-container").hasClass('active')) {

            } else
                $('.side-bar-container').addClass("active");
            $('.innerpage-wrap').addClass("active");

            $('.selector-button-menu').removeClass("fa-bars").addClass("fa-close");
            $('.selector-button-menu').addClass("active");

        });
    } else {
        $(".page-sidebar").unbind('mouseenter mouseleave');
    }
}
function ManageMenu() {
    $('.cssmenu li.dxm-item>a').on('click', function () {
        if ($(".side-bar-container").hasClass('active')) {
            $(this).removeAttr('href');
            $('.cssmenu li').removeClass('active');
            var element = $(this).parent('li');
            if (element.hasClass('open')) {
                element.removeClass('open');
                element.removeClass('active');
                element.find('li').removeClass('open');
                element.find('ul').slideUp();
            } else {
                element.addClass('open');
                element.addClass('active');
                element.children('ul').stop(true, true).slideDown();
                element.siblings('li').children('ul').slideUp();
                element.siblings('li').removeClass('open');
                element.siblings('li').find('li').removeClass('open');
                element.siblings('li').find('ul').slideUp();
            }
        }
    });
    $('.cssmenu li.has-sub>a').on('click', function () {

        if ($(".side-bar-container").hasClass('active')) {
            $(this).removeAttr('href');
            $('.cssmenu li').removeClass('active');
            var element = $(this).parent('li');
            if (element.hasClass('open')) {
                element.removeClass('open');
                element.removeClass('active');
                element.find('li').removeClass('open');
                element.find('ul').slideUp();
            } else {
                element.addClass('open');
                element.addClass('active');
                element.children('ul').stop(true, true).slideDown();
                element.siblings('li').children('ul').slideUp();
                element.siblings('li').removeClass('open');
                element.siblings('li').find('li').removeClass('open');
                element.siblings('li').find('ul').slideUp();
            }
        }
    });
    (function ($) {
        $('.cssmenu1 li.has-sub>a').on('click', function () {
            if ($(".side-bar-container").hasClass('active')) {
                $(this).removeAttr('href');
                var element = $(this).parent('li');
                if (element.hasClass('open')) {
                    element.removeClass('open');
                    element.find('li').removeClass('open');
                    element.find('ul').slideUp();

                } else {
                    element.addClass('open');
                    element.children('ul').slideDown();
                    element.siblings('li').children('ul').slideUp();
                    element.siblings('li').removeClass('open');
                    element.siblings('li').find('li').removeClass('open');
                    element.siblings('li').find('ul').slideUp();
                }
            }
        });
    })(jQuery);
}

var setupCheckboxes = function () {
    // Checkbox Styling
    $('input[type=checkbox]').each(function () {
        if (!$(this).parent().hasClass('checkbox')) {
            if ($(this).css('display') != "none") {

                $(this).next('label').andSelf().wrapAll('<div class="checkbox checkbox-primary"></div>')
                var $this = $(this);

                if ($(this).siblings('label').length == 0) {
                    $(this).parent().addClass("no-text");
                    $('<label class="" for=' + $(this).attr('id') + '></label>').insertAfter($this)
                }

                $this.attr("name");
                var id = $(this).attr('id');

                var dispalyStatusOfControl = "";
                if ($this.css('display') == "block" || $this.css('display') == ("inline-block")) {
                    dispalyStatusOfControl = "true";
                }
                else {
                    dispalyStatusOfControl = "false";
                }
                var label = $(this).next('#' + id);
                //console.log(label.attr('for'));
                //var parentTable = $(this).parent('td').parent('tr').parent('tbody').parent('table');
                //var isCheckBoxApply = true;
                //if (parentTable != undefined) {
                //    if (parentTable.attr('id') == 'MainContent_chkListEmp') {
                //        isCheckBoxApply = true;
                //    }
                //    if (parentTable.closest('div').attr('id') != undefined) {
                //        if (parentTable.closest('div').attr('id').indexOf("tViewParentTask") >= 0) {
                //            isCheckBoxApply = true;
                //        }
                //    }
                //}      
                //if (isCheckBoxApply == true) {
                if (dispalyStatusOfControl == "true") {

                    //$('<label class="checkbox-custom-label" for=' + id + '></label>').insertAfter($this);
                }
                else {
                    //$('<label class="checkbox-custom-label" style="display:none" for=' + id + '></label>').insertAfter($this);
                }

                //else {
                //    $(this).attr('style', 'opacity:1;position:relative');
                //}
            }
            else {
                return true;
            }
        }
    });

    // Radio Styling
    $('input[type=radio]').each(function () {
        if (!$(this).parent().hasClass('radio')) {
            if ($(this).css('display') != "none") {

                $(this).next('label').andSelf().wrapAll("<div class='radio radio-primary'></div>");
                var $this = $(this);
                if ($(this).siblings('label').length == 0) {
                    $('<label class="" for=' + $(this).attr('id') + '></label>').insertAfter($this)
                }
                $this.attr("name");
                var id = $(this).attr('id');
                //$('<label class="radio-custom-label" for=' + id + '></label>').insertAfter($this); 
            }

            else {
                return true;
            }
        }
    });
    multiselect_chk()
   
};
function multiselect_chk() {
    setTimeout(function () {
        if ($("ul").hasClass("multiselect-container")) {

            $('.multiselect-container input[type=checkbox]').each(function () {
                if (!$(this).parent().hasClass("checkbox checkbox-primary")) {
                    $(this).parent().wrapAll('<div class="checkbox checkbox-primary"></div>');
                    $(this).parents(".checkbox-primary").prepend($(this));
                    $(this).attr("id", $(this).val() + "-chk")
                    $(this).siblings("label").addClass("checkbox-custom-label").removeClass("checkbox").attr("for", $(this).attr("id"));
                    $(document).on("click", $(this).siblings("label"), function () {

                    })
                }
            });
        };

    }, 600);
}
var autohight = function () {
    var mainblockheight = $(window).height();
    var mainblockheight = mainblockheight - ($("header").outerHeight() + $("footer").outerHeight() + $(".page-header").outerHeight());
    $(".fix-panel").css("height", mainblockheight + "px");
};

var autowidth = function () {
    var mainblockwidth = $(window).width();
    var mainblockwidth = mainblockwidth - ($(".product-backlog-con").outerWidth() + $(".page-sidebar").outerWidth() - 25);
    $(".right-vertical-panel").css("width", mainblockwidth + "px");
};
function showMenuIcon() {
    $('.page-sidebar').hover(

        function () {
            $(".menu-button").addClass('show-menu');
        },

        function () {
            $(".menu-button").removeClass('show-menu');
        }
    );

}
function MenuClick() {
    $(".menuclick").click(function () {
        var menuId = $(this).attr('id');
        var menuItemId = $(this).data('id');
        var parentMenu = $(this).data('parent');
        $.ajax({
            type: "POST",
            url: "../UserDashboard/SetMenuId",
            dataType: 'html',
            data: "{'MenuId':'" + menuId + "','MenuItemId' : '" + menuItemId + "','ParentMenu' : '" + parentMenu + "'}",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
            }
        });
    });
}

function ResetValues() {
    $('#SuggestionTypeID').val('');
    $('#Description').val('');
    $('#file_upload').val('');
    $(".validation-summary-errors ul").empty();
}
//autohight();
//autowidth();
//$(window).resize(function () {
//    autohight();
//    autowidth();
//});



//user profile tabs

// Project Summary page right container height

$('window').load(function () {
    var windowHeight = $('window').height();
    var containerHeight = windowHeight - 200;
    $(".sprints-detail").css('min-height', containerHeight)
});

/******************* header space ************************/
function auto_head_space() {
    var navbar_height = $('.navbar').height();
    $(".innerpage-wrap").css('padding-top', (navbar_height + 15));
    $(".page-sidebar").css('margin-top', (navbar_height + 2));
};


/********************** menu scroll init *****************/

function menu_scroll_init() {
    $(".menu-bar-scroll").mCustomScrollbar({
        axis: "y",
        theme: "light",
        scrollbarPosition: "inside",
        scrollInertia: 150,
        autoDraggerLength: true,
        autoExpandScrollbar: true,
        contentTouchScroll: true,
        scrollButtons: { enable: false },
    });
}

function custom_scroll_init() {
    /***************** custom-scroll-horizontal ****************/
    if ($('div').hasClass('custom-scroll-horizontal')) {
        var dragger_height = $(window).outerHeight() - $(".hori-accord-detail ").offset().top - 90;
        if (dragger_height < 200) {
            $(".hori-accord-detail ").height("350");
            $(".connectedSortable").css("min-height", "320");
        }
        else {
            $(".hori-accord-detail ").height(dragger_height);
            $(".connectedSortable").css("min-height", dragger_height - 30);
        }

        $('.custom-scroll.hori-accord-detail').mCustomScrollbar("update");

        //$('.custom-scroll-horizontal').mCustomScrollbar({
        //    scrollbarPosition: "inside",
        //    horizontalScroll: true,
        //    scrollInertia: 150,
        //    autoDraggerLength: 1,
        //    autoExpandScrollbar: 1,
        //    alwaysShowScrollbar: 1,
        //    scrollButtons: { enable: false },
        //    advanced: { updateOnSelectorChange: "table.collapse-tbl" },
        //    // advanced: { autoExpandHorizontalScroll: 2 },
        //    callbacks: {
        //        whileScrolling: function () {
        //            dropdown_position();
        //        },
        //        onSelectorChange: function () {
        //            scroll_update()
        //        },
        //    }
        //});

        //function scroll_update() {

        //    var tbl_width = $(".collapse-tbl").width();
        //    $(".collapse-tbl").each(function () { $(this).parent().width($(this).width()) });
        //    $('.custom-scroll-horizontal').mCustomScrollbar("scrollTo", "left");
        //    setTimeout(function () {
        //        $('.custom-scroll-horizontal').mCustomScrollbar("update");

        //    }, 300)


        //} 
    }
    /**************** common scroll ********************/
    $(".custom-scroll").mCustomScrollbar({
        axis: "y",
        theme: "light",
        scrollbarPosition: "inside",
        scrollInertia: 150,
        autoDraggerLength: true,
        autoExpandScrollbar: true,
        contentTouchScroll: true,
        scrollButtons: { enable: false },
        callbacks: {
            whileScrolling: function () {
                dropdown_position();
            }
        }
    });

}



/*********************** validations ********************************/
function extendedValidatorUpdateDisplay(obj) {
    // Call the original method
    if (typeof originalValidatorUpdateDisplay === "function") {
        originalValidatorUpdateDisplay(obj);
    }
    // Gets the state of the control ( valid or invalid )
    // and adds or removes error has- class
    var control = document.getElementById(obj.controltovalidate);
    if (control) {
        var isValid = true;
        if (control.Validators != undefined)
        {
            for (var i = 0; i < control.Validators.length; i += 1) {
                if (!control.Validators[i].isvalid) {
                    isValid = false;
                    break;
                }
            }
            if (isValid) {
                $(control).closest(".form-group").removeClass("has-error  has-feedback");
            } else {
                $(control).closest(".form-group").addClass("has-error  has-feedback");
            }
        }
        
    }
}
// Replaces ValidatorUpdateDisplay method
function validation_focus_init() {
    var originalValidatorUpdateDisplay = window.ValidatorUpdateDisplay;
    window.ValidatorUpdateDisplay = extendedValidatorUpdateDisplay;
}
/*********************** collaps section ******************/
function collaps_init() {

    $(document).on('shown.bs.collapse', '.accordion', function (e) {
        $("#" + e.target.id).parent().addClass('active').siblings().removeClass("active");
    })
    $(document).on('hidden.bs.collapse', '.accordion', function (e) {
        $("#" + e.target.id).parent().removeClass('active').siblings().removeClass("active");
    })

}

/************ footer space for fixed footer buttons initi **************/
function footer_space_init() {
    if ($("div").hasClass("form-footer")) {
        $(".innerpage-wrap").css("padding-bottom", "61px")
    }
}

///*************** auto mmodal body height ************/
//$(window).on("load resize", function (e) {
//    $('.modal-body').css({ 'max-height': $(window).height() * 0.65 - $('.modal-footer').height(), overflow: 'auto' });
//    $('.modal').on('show.bs.modal', function () {
//        if ($('.modal').height() >= $(window).height()) {
//            $('.modal-body').css({ 'max-height': $(window).height() * 0.65 - $('.modal-footer').height(), overflow: 'auto' });

//        }
//    });
//    /**************** common scroll ********************/
//    if ($('div').hasClass('modal-body')) {
//        $('.modal-body').mCustomScrollbar({
//            scrollbarPosition: "outside",
//            axis: "y",
//            scrollInertia: 600,
//            autoDraggerLength: true,
//            autoExpandScrollbar: true,
//            alwaysShowScrollbar: 1,
//            updateOnContentResize: true,
//            advanced: { updateOnSelectorChange: "false" },
//        });
//    }
//});

/*************** auto mmodal body height ************/
$(window).on("resize load", function (e) {

    modal_resize();
    if (ww != wwold) {
        if ($("select").hasClass("chosen-select")) {
           // $(".chosen-select").not("#ddlProjectList").chosen('destroy');
            //$(".chosen-select").not("#ddlProjectList").chosen({ width: '100%' });
            $("#ddlProjectList").chosen('destroy');
            $("#ddlProjectList").chosen();
        }

        wwold = $(this).width();
    }

});
function modal_body_init() {
    $('.modal').on('show.bs.modal', function () {
        setTimeout(function () {
            if ($('.modal.in').find('.modal-body').outerHeight() >= $(window).height()) {
                modal_resize();
            }
        }, 1000)

    });
}
function modal_resize() {
    if ($('div').hasClass('modal-body-scroll')) {
        $('.modal.in .modal-body-scroll.modal-body').css({ 'max-height': $(window).height() * 0.65 - $('.modal-footer').height() });
        //  $('.modal-body').css({ 'max-height': $(window).height() * 0.65 - $('.modal-footer').height(), overflow: 'auto' });           
        /**************** common scroll ********************/

        //$('.modal-body-scroll.modal-body').mCustomScrollbar({
        //    scrollbarposition: "inside",
        //    axis: "y",
        //    autoDraggerLength: true,
        //    autoExpandScrollbar: true,
        //    alwaysShowScrollbar: 0,
        //    advanced: { updateOnContentResize: false }
        //});
    }
}
/**************** file input style **********************/
function filetype_init() {

    if ($("input:file").attr("type") == "file") {
        if ($("input:file").css("opacity") != 0) {

            $("input:file").not("#fileupload input:file").filestyle({ buttonName: "btn btn-primary", buttonText: "&nbsp; Choose file", iconName: "fa fa-folder", placeholder: "No file Selected" });

        }
    }
};

/******************* Chosen For select combo ****************/
function chosen_init() {
    if ($("select").hasClass("chosen-select")) {
        $(".chosen-select").chosen({

        });
    }
}

/******************************* checkbox style-2 *******************/
function chk_style_2_init() {

    $(document).on('click', '.checkbox .custome-field', function () {
        $(this).parent().find('input').click();
    });
}
/**************** custome scroll ********************/
function custome_scroll_init() {
    if ($('div').hasClass('mCustomScrollbar')) {
        $('.mCustomScrollbar').mCustomScrollbar({
            scrollbarPosition: "inside",
            axis: "y",
            scrollInertia: 150,
            autoDraggerLength: true,
            autoExpandScrollbar: true,
            alwaysShowScrollbar: 0,
            updateOnContentResize: true,
            scrollButtons: { enable: false },
        });
    }
    /**************** common scroll ********************/
    if ($('div').hasClass('custom-scroll')) {
        $('.custom-scroll').mCustomScrollbar({
            scrollbarPosition: "inside",
            axis: "y",
            scrollInertia: 150,
            autoDraggerLength: true,
            autoExpandScrollbar: true,
            alwaysShowScrollbar: 0,
            updateOnContentResize: true,
            scrollButtons: { enable: false },
        });
    }
    /****************** employee-status scroll**************/
    if ($("div").hasClass("employee-status")) {
        setTimeout(function () {
            $('.employee-status').mCustomScrollbar({
                scrollbarPosition: "outside",
                axis: "x",
                autoDraggerLength: true,
                autoExpandScrollbar: true,
                alwaysShowScrollbar: 0,
                updateOnContentResize: true,
                theme: "minimal-dark",
                scrollButtons: { enable: false },
            });
        }, 600);

    }
    /****************** birthday scroll **************/
    if ($("div").hasClass("birthday-wrap")) {
        $('.birthday-wrap').mCustomScrollbar({
            scrollbarPosition: "inside",
            axis: "y",
            autoDraggerLength: true,
            autoExpandScrollbar: false,
            alwaysShowScrollbar: 0,
            updateOnContentResize: true,
            theme: "minimal-dark",
            delay: 2000,
            scrollButtons: { enable: false },
        });
    }
    /****************** joinee scroll ***************/
    if ($("div").hasClass("joinee-wrap")) {
        $('.joinee-wrap').mCustomScrollbar({
            scrollbarPosition: "inside",
            axis: "y",
            autoDraggerLength: true,
            autoExpandScrollbar: false,
            alwaysShowScrollbar: 0,
            updateOnContentResize: true,
            theme: "minimal-dark",
            delay: 2000,
            scrollButtons: { enable: false },

        });
    }
    /****************** dash-chart-wrap scroll **************/
    if ($("div").hasClass("dash-chart-wrap")) {
        $('.dash-chart-wrap').mCustomScrollbar({
            scrollbarPosition: "inside",
            axis: "y",
            autoDraggerLength: true,
            autoExpandScrollbar: false,
            alwaysShowScrollbar: 0,
            updateOnContentResize: true,
            theme: "minimal-dark",
            scrollButtons: { enable: false },
        });
    }
    /****************** dash-chart-wrap scroll **************/
    if ($("div").hasClass("dash-chart-wrap-2")) {
        $('.dash-chart-wrap-2').mCustomScrollbar({
            scrollbarPosition: "inside",
            axis: "y",
            autoDraggerLength: true,
            autoExpandScrollbar: false,
            alwaysShowScrollbar: 0,
            updateOnContentResize: true,
            theme: "minimal-dark",
            scrollButtons: { enable: false },
        });
    }
    /****************** dash-chart-wrap scroll **************/
    if ($("div").hasClass("dash-chart-wrap-3")) {
        $('.dash-chart-wrap-3').mCustomScrollbar({
            scrollbarPosition: "inside",
            axis: "y",
            autoDraggerLength: true,
            autoExpandScrollbar: false,
            alwaysShowScrollbar: 0,
            updateOnContentResize: true,
            theme: "minimal-dark",
            scrollButtons: { enable: false },
        });
    }

    /***************** KRA scroll **************/
    if ($("div").hasClass("content-scroll")) {
        $('.content-scroll').mCustomScrollbar({
            scrollbarPosition: "inside",
            axis: "y",
            autoDraggerLength: true,
            autoExpandScrollbar: false,
            alwaysShowScrollbar: 0,
            updateOnContentResize: true,
            theme: "light",
            scrollButtons: { enable: false },
        });
    }

    /****************** org-chart-sub node scroll ***********************/
    $('.org-chart-sub').mCustomScrollbar({
        scrollbarPosition: "inside",
        axis: "x",
        autoDraggerLength: true,
        autoExpandScrollbar: true,
        updateOnContentResize: true,
        scrollButtons: { enable: true }
    })
    setTimeout(function () {
        var full_scroll_drag = $('.org-chart-sub .mCSB_dragger').width();
        var full_scroll_drag_wrap = $('.org-chart-sub .mCSB_draggerRail').width();
        var offset_left = (full_scroll_drag_wrap - full_scroll_drag) / 2;
        var offset_left = (offset_left * 100) / full_scroll_drag_wrap;
        // alert(offset_left);
        $('.org-chart-sub').mCustomScrollbar('scrollTo', offset_left + '%');
    }, 600);

}

/******************* chosen dynamic height ***********************/
function chosen_position() {

    setTimeout(function () {
        if ($("div").hasClass("chosen-container")) {
            $(document).on('chosen:showing_dropdown', '.chosen-select', function (evt, params) {
                setTimeout(function () {
                    chosen_window()
                    $(".chosen-container.chosen-with-drop .chosen-drop").show();
                    $(".modal-body,.modal").on("scroll", function () {

                        if ($("div").hasClass("chosen-with-drop")) {
                            if ($(".chosen-container.chosen-with-drop").offset().top < $(".modal-header").outerHeight()) {
                                $(".chosen-container.chosen-with-drop .chosen-drop").hide();
                            } else {
                                $(".chosen-container.chosen-with-drop .chosen-drop").show();
                            }
                            chosen_window()
                        }
                    });
                    $(window).on("scroll", function () {
                        if ($("div").hasClass("chosen-with-drop")) {

                            chosen_window()
                        }
                    });
                }, 150)
            });

            $(document).on('chosen:showing_dropdown', '.icon-select', function (evt, params) {
                setTimeout(function () {
                    chosen_window()
                    $(".chosen-container.chosen-with-drop .chosen-drop").show();
                    $(".modal-body,.modal").on("scroll", function () {
                        if ($("div").hasClass("chosen-with-drop")) {
                            if ($(".chosen-container.chosen-with-drop").offset().top < $(".modal-header").outerHeight()) {
                                $(".chosen-container.chosen-with-drop .chosen-drop").hide();
                            } else {
                                $(".chosen-container.chosen-with-drop .chosen-drop").show();
                            }
                            chosen_window()
                        }
                    });
                    $(window).on("scroll", function () {
                        if ($("div").hasClass("chosen-with-drop")) {

                            chosen_window()
                        }
                    });
                }, 150)
            });


            $(document).on('chosen:hiding_dropdown', '.chosen-select', function () {
                $(".chosen-drop").not($(".chosen-container.chosen-with-drop .chosen-drop")).hide();
            })
            $(document).on('chosen:hiding_dropdown', '.icon-select', function () {
                $(".chosen-drop").not($(".chosen-container.chosen-with-drop .chosen-drop")).hide();
            })


        }
    }, 300)
}

function chosen_window() {
    var chosen_height = $(".chosen-container.chosen-with-drop").outerHeight();;
    var chosen_width = $(".chosen-container.chosen-with-drop").outerWidth();;
    var drop_height = $(".chosen-container.chosen-with-drop .chosen-drop").outerHeight(); +2;
    var scrol_top = $(window).scrollTop();
    var scroll_height = $(window).height();
    var chosen_pos = $(".chosen-container.chosen-with-drop").offset();
    var chosen_pos_top = chosen_pos.top + chosen_height - scrol_top;
    var chosen_pos_left = chosen_pos.left;
    var dist_from_bottom = scroll_height - chosen_pos_top;
    if (dist_from_bottom > drop_height) {
        $(".chosen-container.chosen-with-drop .chosen-drop").addClass("on-bottom").removeClass("on-top").css({ "position": "fixed", "top": chosen_pos_top, "left": chosen_pos_left, "width": chosen_width });
    } else {
        $(".chosen-container.chosen-with-drop .chosen-drop").removeClass("on-bottom").addClass("on-top").css({ "position": "fixed", "top": chosen_pos_top - drop_height - chosen_height + 2, "left": chosen_pos_left, "width": chosen_width });
    }
}



/******************* drop down dynamic height ***********************/
function dropdown_position() {
    if ($("div").hasClass("dropdown")) {
        $(document).on('shown.bs.dropdown', '.dropdown', function (evt, params) {
            dropdown_window()
        });
        $(document).on('hide.bs.dropdown', '.dropdown', function (evt, params) { });
        $(window).on("scroll", function () {
            if ($("div").hasClass("dropdown")) {
                dropdown_window()
            }
        });
    }
    if ($("div.dropdown").hasClass("open")) {
        dropdown_window()
    }
}

function dropdown_window() {
    if ($("div.dropdown").hasClass("open")) {
        var dropdown_height = $(".dropdown.open .dropdown-menu").outerHeight();
        var dropdown_width = $(".dropdown.open .dropdown-menu").outerWidth();
        var drop_height = $(".dropdown.open *[data-toggle='dropdown']").outerHeight();
        var drop_width = $(".dropdown.open *[data-toggle='dropdown']").outerWidth();
        var scrol_top = $(window).scrollTop();
        var scroll_height = $(window).height();
        var dropdown_pos = $(".dropdown.open *[data-toggle='dropdown']").offset();
        var dropdown_pos_top = dropdown_pos.top + drop_height - scrol_top;
        var dropdown_pos_right = ww - dropdown_pos.left - drop_width;
        var dropdown_pos_left = dropdown_pos.left;
        var dist_from_bottom = scroll_height - dropdown_pos_top + scrol_top - dropdown_height;
        var dist_from_left = dropdown_pos_left;
        if (dist_from_bottom > dropdown_height) {
            if (dist_from_left > dropdown_width) {
                $(".dropdown.open .dropdown-menu").addClass("on-bottom").removeClass("on-top").css({ "position": "fixed", "top": dropdown_pos_top, "right": dropdown_pos_right, "width": dropdown_width });
            } else {
                $(".dropdown.open .dropdown-menu").addClass("on-bottom").removeClass("on-top").css({ "position": "fixed", "top": dropdown_pos_top, "left": dropdown_pos_left, "width": dropdown_width });
            }
        } else {
            if (dist_from_left > dropdown_width) {
                $(".dropdown.open .dropdown-menu").removeClass("on-bottom").addClass("on-top").css({ "position": "fixed", "top": dropdown_pos_top - drop_height - dropdown_height, "right": dropdown_pos_right, "width": dropdown_width });
            } else {
                $(".dropdown.open .dropdown-menu").addClass("on-bottom").removeClass("on-top").css({ "position": "fixed", "top": dropdown_pos_top - drop_height - dropdown_height, "left": dropdown_pos_left, "width": dropdown_width });
            }
        }

    }
}
