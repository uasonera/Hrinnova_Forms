// hegith fix for login page all resolution
var wwold = $(window).width();
var ww = $(window).width();
var wh = $(window).height();

$(document).ready(function () {

    /************ loader *************/
    loader();
    if (ww > 768) {
        window_height();
    } else {
        $(".login-links").css("height", "initial");
    }
    jQuery.fn.forceNumeric = function () {

        return this.each(function () {
            $(this).keydown(function (e) {
                var key = e.which || e.keyCode;

                if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
                    // numbers   
                    key >= 48 && key <= 57 ||
                    // Numeric keypad
                    key >= 96 && key <= 105 ||
                    // comma, period and minus, . on keypad

                    // Backspace and Tab and Enter
                   key == 8 || key == 9 || key == 13 ||
                    // Home and End
                   key == 35 || key == 36 ||
                    // left and right arrows
                   key == 37 || key == 39 ||
                    // Del and Ins
                   key == 46 || key == 45)
                    return true;

                return false;
            });
        });
    }
    /******************* auto header space for sidebar and *****************/
    auto_head_space();
    /******************* auto equal height for dashboard div  *****************/
    dashbord_rowint();
    /******************* circle progressbar *****************/
    circle_progress();
    /******************* dashboard counter progressbar *****************/
    counter_progress();
    /******************* filter sidebar *****************/
    side_popup_init();
    /****************** dashboard more info action *******/
    more_info_init();
    /******************* button floating  *****************/
    floating_btn_init();
    /************** data picker for login page **********/
    date_pick_init();
    /*************** data table init **********/
    data_table_init();
    /********** tooltip init ***************/
    tooltip_init();
    /************* form steps *******************/
    staped_form_init();
    /************* Side manu ******************/
    ManageMenu();
    ManageSlider();
    /**************** custome scroll ********************/
    custome_scroll_init();
    /****************** left side bar for menu toggle ***********/
    left_side_bar();
    /******************* Chosen For select combo ****************/
    chosen_init();
    /************* Org chart info click *******************/
    org_chart_init();
    /***************** menu close on body click ******************/
    menu_else_click();
    /****************** ripple effact *****************/
    ripple_effact_init();
    /************ chart init *************/
    chart_init();

    /************* collaps ************/
    togglecollaps();
    collaps_init()
    /*************  Wishes box ************/
    wishes_init();
    /*************  Check box ************/
    setupCheckboxes();
    /************ side suggestion **************/
    side_sugg()
    /************ footer space for fixed footer buttons initi **************/
    footer_space_init()
    /************ Expand tree  **************/

    expand_tree()
    /************ Modal body scroller  **************/
    modal_body_init()
    /*************** bootstrap file  ************/
    filetype_init()
    /************** header notification init ******************/
    notification_init();
    /*********************** treetable section ******************/
    tree_grid();
    /*********************** treetable section ******************/
    treegrid_sidebar();
    /*********************** treetable section ******************/
    sprint_search();
    sidebar_toggle();
    /******************* chosen dynamic height and position ***********************/
    chosen_position();

    /******************* drop down dynamic height ***********************/
    dropdown_position();
    /****************** horizontal accordion **********************/

    horizontol_accord_init();

    setUpControlDisabled();
});


function side_sugg() {
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

        if ($(".company-filter").hasClass("active")) {
            $(".company-filter .filter-click").click();
        }
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
}
function SetupRadioButtons() {
    $('input[type=radio]').each(function () {
        var $this = $(this);
        $this.addClass('radio-custom');
        $this.attr("name");
        var label = $this.attr("Text");
        var id = $(this).attr('id');
        $('<label class="radio-custom-label" for=' + id + '>' + label + '</label>').insertAfter($this);
    });
}
/********************* loader function *************************/
function TruncateText($Who, LimitTo, Maximum) {
    var $this;
    $Who.each(function () {
        $this = $(this);
        if ($this.text().length >= Maximum) {
            $this.text($this.text().slice(0, LimitTo)).append('...');
        }
    });
}

$(function () {

    TruncateText($('.my-tag .remove-tag'), 25, 30);

});

/********************* loader function *************************/
function loader() {
    $(".loader-wrapper").show();
    setTimeout(function () { $(".loader-wrapper").hide(); }, 1000);
}
/********************* resize function *************************/
$(window).on("resize", function () {
    ww = $(window).width();
    wh = $(window).height();

    if (ww > 768) {
        window_height()
    } else {
        $(".login-links").css("height", "initial");
    }

    /************ sidebar *******************/
    ManageSlider()
    menu_hide()
    $('.side-bar-container').removeClass("active");
    $(".innerpage-wrap ").removeClass('active');
    $('.selector-button-menu').addClass("fa-bars").removeClass("fa-close").removeClass("active");

    /******************* Chosen For select combo ****************/

    if (ww != wwold) {

        if ($("select").hasClass("chosen-select")) {
            // $(".chosen-select").not("#ddlProjectList").chosen('destroy');
            //$(".chosen-select").not("#ddlProjectList").chosen({ width: '100%' });
            $("#ddlProjectList").chosen('destroy');
            $("#ddlProjectList").chosen();
        }
        wwold = $(this).width();
    }

    /************ fixed header space *************/
    auto_head_space()

    /************ fixed height dashbord *************/
    dashbord_rowint()

    /*************** modal init on resize *****************/
    // modal_body_init();
    modal_resize();

    custome_scroll_init()
})

/************ fixed height dashbord *************/
var maxHeight = 0;

function dashbord_rowint() {
    setTimeout(function () {
        dash_Height('.dash-row-0');
        dash_Height('.dash-row-1');
        dash_Height('.dash-row-2');
        dash_Height('.dash-row-3');
        dash_Height('.dash-row');
    }, 600);
}
function dash_Height(column) {
    //Get all the element with class = col
    column = $(column);
    //Loop all the column
    column.each(function () {
        //Store the highest value
        if ($(this).height() > maxHeight) {
            maxHeight = $(this).height();
        }
    });
    //Set the height
    if (ww > 769) {
        column.height(maxHeight);
    } else { column.css("height", "auto"); }
    maxHeight = 0;
}

/************************* charts ******************************/
function chart_init() {
    if (document.getElementById("lineChart")) {
        var ctx = document.getElementById("lineChart").getContext("2d");
        if (ww < 768) {
            var pixelRatio = window.devicePixelRatio || 1;
            var width = $('canvas').parent().width();
            var height = $('canvas').parent().height();
            ctx.canvas.width = (width) / pixelRatio;
            ctx.canvas.height = (0.4 * height) / pixelRatio;
        }
        window.myLine = new Chart(ctx).Line(swirlData, {
            responsive: true,
            scaleShowVerticalLines: false,
            scaleBeginAtZero: true,
            pointDotRadius: 6,
            //bezierCurve: false,
            // datasetFill: false,
            multiTooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
            //String - A legend template
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
        });

        document.getElementById('my-line-legend').innerHTML = myLine.generateLegend();
    }
    if (document.getElementById("lineChart1")) {

        var ctx = document.getElementById("lineChart1").getContext("2d");

        if (ww < 768) {
            var pixelRatio = window.devicePixelRatio || 1;
            var width = $('canvas').parent().width();
            var height = $('canvas').parent().height();
            ctx.canvas.width = (1.5 * width) / pixelRatio;
            ctx.canvas.height = (1.5 * height) / pixelRatio;
        }

        window.myLine = new Chart(ctx).Line(swirlData2, {
            responsive: true,
            scaleShowVerticalLines: false,
            scaleBeginAtZero: false,
            //bezierCurve: false,
            scaleStepWidth: 2,
            //Number - Width of the grid lines
            scaleGridLineWidth: 1,
            pointDotRadius: 6,
            // scaleStartValue: -20,
            //datasetFill: false,
            multiTooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
            //String - A legend template
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
        });

        document.getElementById('my-line-legend').innerHTML = myLine.generateLegend();
    }
    if (document.getElementById("chart-area1")) {
        // Dougnut Chart from doughnutData
        var doctx = document.getElementById("chart-area1").getContext("2d");

        window.myDoughnut = new Chart(doctx).Doughnut(doughnutData1, { responsive: true, percentageInnerCutout: 70, });
    }
    if (document.getElementById("chart-area-training1")) {
        // Dougnut Chart from doughnutData
        var doctx = document.getElementById("chart-area-training1").getContext("2d");
        window.myDoughnut = new Chart(doctx).Doughnut(doughnutDatatraining1, { responsive: true, percentageInnerCutout: 0, });
    }
    if (document.getElementById("chart-area2")) {
        // Dougnut Chart from doughnutData
        var doctx = document.getElementById("chart-area2").getContext("2d");
        window.myDoughnut = new Chart(doctx).Doughnut(doughnutData2, { responsive: true, percentageInnerCutout: 70, });
    }
    if (document.getElementById("chart-area3")) {
        // Dougnut Chart from doughnutData
        var doctx = document.getElementById("chart-area3").getContext("2d");
        window.myDoughnut = new Chart(doctx).Doughnut(doughnutData3, { responsive: true, percentageInnerCutout: 70, });
    }
    if (document.getElementById("chart-area4")) {
        // Dougnut Chart from doughnutData
        var doctx = document.getElementById("chart-area4").getContext("2d");
        window.myDoughnut = new Chart(doctx).Doughnut(doughnutData4, { responsive: true, percentageInnerCutout: 70, });
    }
    if (document.getElementById("chart-bar")) {
        // Bar Chart from barChartData
        var ctx = document.getElementById("chart-bar").getContext("2d");
        if (ww < 768) {
            var pixelRatio = window.devicePixelRatio || 1;
            var width = $('canvas').parent().width();
            var height = $('canvas').parent().height();
            ctx.canvas.width = (2 * width) / pixelRatio;
            ctx.canvas.height = (1 * height) / pixelRatio;
        }
        window.myBar = new Chart(ctx).Bar(barChartData, {
            responsive: true,
            maintainAspectRatio: true,
            barStrokeWidth: 1,
            barValueSpacing: 15,
            scaleShowLabels: true,
            tooltipTemplate: "<%= value %>",

            showTooltips: true,

            onAnimationComplete: function () {
                this.showTooltip(this.datasets[0].bars, true);
            },
            tooltipEvents: []

        });
        // var bar_count = 12;
        // setInterval(function() {
        //     myBar.removeData();
        //     myBar.addData([dData()], "dD " + bar_count);
        //     index++;
        // }, 1000);
    }
    if (document.getElementById("chart-bar-stacked")) {
        // Bar Chart from barChartData
        var ctx = document.getElementById("chart-bar-stacked").getContext("2d");
        if (ww < 768) {
            var pixelRatio = window.devicePixelRatio || 1;
            var width = $('canvas').parent().width();
            var height = $('canvas').parent().height();
            ctx.canvas.width = (2 * width) / pixelRatio;
            ctx.canvas.height = (1 * height) / pixelRatio;
        }
        window.myBar = new Chart(ctx).Bar(barChartDatastacked, {
            responsive: true,
            maintainAspectRatio: true,
            barStrokeWidth: 1,
            barValueSpacing: 40,
            scaleShowLabels: true,
            tooltipTemplate: "<%= value %>",
            showTooltips: true,
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",


        });
        document.getElementById('my-bar-legend').innerHTML = myBar.generateLegend();
    }
    if (document.getElementById("chart-bar-leave")) {
        // Bar Chart from barChartData
        var ctx = document.getElementById("chart-bar-leave").getContext("2d");
        window.myBar = new Chart(ctx).Bar(barChartDataleave, {
            responsive: true,
            // maintainAspectRatio: true,
            barStrokeWidth: 1,
            barValueSpacing: 20,
            scaleShowLabels: true,
            // tooltipTemplate: "<%= value %>",
            // showTooltips: true,
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
            onAnimationComplete: function () {
                // this.showTooltip(this.datasets[0].bars, true);
            },
            // tooltipEvents: []
        });
        var dData = function () {
            return Math.round(Math.random() * 90) + 10
        };
        var index = 1;
        setInterval(function () {
            myBar.removeData();
            myBar.addData([dData()], "Month" + index);
            index++;
        }, 3000);
        document.getElementById('my-bar-legend').innerHTML = myBar.generateLegend();
    }
    if (document.getElementById("chart-bar-hori")) {
        // Bar Chart from barChartData
        var ctx = document.getElementById("chart-bar-hori").getContext("2d");
        if (ww < 768) {
            var ctx = document.getElementById("chart-bar-hori").getContext("2d");
            var pixelRatio = window.devicePixelRatio || 1;
            var width = $('canvas').parent().width();
            var height = $('canvas').parent().height();
            ctx.canvas.width = (4 * width) / pixelRatio;
            ctx.canvas.height = (6 * height) / pixelRatio;
        }
        window.myBar = new Chart(ctx).HorizontalBar(barChartDatahori, {
            responsive: true,
            maintainAspectRatio: true,
            barStrokeWidth: 1,
            barValueSpacing: 35,
            scaleShowLabels: true,
            tooltipTemplate: "<%= value %>",
            showTooltips: true,
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",

        });
        document.getElementById('my-bar-legend').innerHTML = myBar.generateLegend();
    }
    if (document.getElementById("chart-bar-hori-training1")) {
        // Bar Chart from barChartData
        var ctx = document.getElementById("chart-bar-hori-training1").getContext("2d");
        window.myBar = new Chart(ctx).HorizontalBar(barChartDatahoritraining1, {
            responsive: true,
            maintainAspectRatio: true,
            barStrokeWidth: 1,
            barValueSpacing: 15,
            scaleShowLabels: true,
            tooltipTemplate: "<%= value %>",
            showTooltips: true,
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
        });
    }

    /******************** dashboard charts **********************/

    if (document.getElementById("deapart-head-chart-emp")) {
        // Dougnut Chart from doughnutData

        var doctx = document.getElementById("deapart-head-chart-emp").getContext("2d");
        if (ww < 1200) {

            var pixelRatio = window.devicePixelRatio || 1;
            var width = $('canvas').parent().width();
            var height = $('canvas').parent().height();
            doctx.canvas.width = (8 * width) / pixelRatio;
            doctx.canvas.height = (1 * height) / pixelRatio;
        }
        window.deapartDoughnut = new Chart(doctx).Doughnut(deapartheaddata_emp, {
            customTooltips: function (tooltip) {
                var tooltipEl = $('#deapart-head-chart-tooltip');
                if (!tooltip) {
                    tooltipEl.css({
                        opacity: 0
                    });
                    return;
                }

                tooltipEl.removeClass('above below');
                tooltipEl.addClass(tooltip.yAlign);

                // split out the label and value and make your own tooltip here
                var parts = tooltip.text.split(":");
                var innerHtml = '<span>' + parts[0].trim() + '</span> : <span><b>' + parts[1].trim() + '</b></span>';
                tooltipEl.html(innerHtml);

                tooltipEl.css({
                    opacity: 1,
                    left: tooltip.chart.canvas.offsetLeft + tooltip.x + 'px',
                    top: tooltip.chart.canvas.offsetTop + tooltip.y + 'px',
                    fontFamily: tooltip.fontFamily,
                    fontSize: tooltip.fontSize,
                    fontStyle: tooltip.fontStyle,
                });
            },
            responsive: true,
            percentageInnerCutout: 70,
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
        });
        document.getElementById('deapart-head-chirt-legend-emp').innerHTML = deapartDoughnut.generateLegend();
    }


    if (document.getElementById("deapart-head-chart")) {
        // Dougnut Chart from doughnutData
        var doctx1 = document.getElementById("deapart-head-chart").getContext("2d");
        if (ww < 1200) {

            var pixelRatio = window.devicePixelRatio || 1;
            var width = $('canvas').parent().width();
            var height = $('canvas').parent().height();
            doctx1.canvas.width = (8 * width) / pixelRatio;
            doctx1.canvas.height = (1 * height) / pixelRatio;
        }
        window.deapartDoughnut = new Chart(doctx1).Doughnut(deapartheaddata, {
            responsive: true,
            percentageInnerCutout: 70,
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
        });
        document.getElementById('deapart-head-chirt-legend').innerHTML = deapartDoughnut.generateLegend();
    }
    if (document.getElementById("loc-head-chart")) {
        // Dougnut Chart from doughnutData
        var doctx3 = document.getElementById("loc-head-chart").getContext("2d");
        if (ww < 1200) {

            var pixelRatio1 = window.devicePixelRatio || 1;
            var width = $('canvas').parent().width();
            var height = $('canvas').parent().height();
            doctx3.canvas.width = (1 * width) / pixelRatio1;
            doctx3.canvas.height = (1 * height) / pixelRatio1;
        }
        window.deapartDoughnut = new Chart(doctx3).Doughnut(locheaddata, {
            responsive: true,
            percentageInnerCutout: 70,
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
        });
        document.getElementById('loc-head-chirt-legend').innerHTML = deapartDoughnut.generateLegend();
    }
    if (document.getElementById("chart-bar-count")) {
        // Bar Chart from barChartData
        var ctx = document.getElementById("chart-bar-count").getContext("2d");

        var pixelRatio = window.devicePixelRatio || 1;
        var width = $('canvas').parent().width();
        var height = $('canvas').parent().height();
        ctx.canvas.width = (2 * width) / pixelRatio;
        ctx.canvas.height = (1 * height) / pixelRatio;

        window.myBar = new Chart(ctx).Bar(barChartDatadash, {
            responsive: true,
            maintainAspectRatio: false,
            barStrokeWidth: 0,
            barValueSpacing: 0,
            scaleShowLabels: true,
            showScale: false,
            showTooltips: true,
        });
        // var bar_count = 12;
        // setInterval(function() {
        //     myBar.removeData();
        //     myBar.addData([dData()], "dD " + bar_count);
        //     index++;
        // }, 1000);
    }


    if (document.getElementById("Attrichart")) {
        var ctx = document.getElementById("Attrichart").getContext("2d");
        if (ww < 768) {
            var pixelRatio = window.devicePixelRatio || 1;
            var width = $('canvas').parent().width();
            var height = $('canvas').parent().height();
            ctx.canvas.width = (width) / pixelRatio;
            ctx.canvas.height = (0.4 * height) / pixelRatio;
        }
        window.myLine = new Chart(ctx).Line(Attrichartdata, {
            responsive: true,
            scaleShowVerticalLines: false,
            scaleBeginAtZero: true,
            pointDotRadius: 6,
            bezierCurve: false,
            // datasetFill: false,
            multiTooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
            //String - A legend template
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
        });

        document.getElementById('my-line-legend-1').innerHTML = myLine.generateLegend();
    }

    if (document.getElementById("timesheetChart")) {
        var ctx = document.getElementById("timesheetChart").getContext("2d");
        if (ww < 1200) {

            var pixelRatio = window.devicePixelRatio || 1;
            var width = $('canvas').parent().width();
            var height = $('canvas').parent().height();
            ctx.canvas.width = (8 * width) / pixelRatio;
            ctx.canvas.height = (20 * height) / pixelRatio;
        }
        window.myLine = new Chart(ctx).Line(timesheetData, {
            responsive: true,
            scaleShowVerticalLines: false,
            scaleBeginAtZero: true,
            pointDotRadius: 6,
            //bezierCurve: false,
            // datasetFill: false,
            multiTooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
            //String - A legend template
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
        });

        document.getElementById('timesheet-line-legend').innerHTML = myLine.generateLegend();
    }

}
/***************** slide bar toggle on hover ************************/
function menu_hide() {
    $(".side-bar-container").removeClass('active');
    var elements = $('.cssmenu table tr td[class*="open"]');
    if ($(elements).length > 0) {
        $(elements).each(function (i, ele) {
            $(ele).removeClass('open');
            $(ele).children('ul').css('display', 'none');
        });
    }
    var elements = $('.cssmenu ul li[class*="open"]');
    if ($(elements).length > 0) {
        $(elements).each(function (i, ele) {
            $(ele).removeClass('open');
            $(ele).children('ul').css('display', 'none');
        });
    }
    var elements = $('.cssmenu1 ul li[class*="open"]');
    if ($(elements).length > 0) {
        $(elements).each(function (i, ele) {
            $(ele).removeClass('open');
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
/******************* circle progressbar *****************/

function circle_progress() {

    if ($("div").hasClass("department-wrapper")) {

        $(".department-wrapper .animation-circle").each(function () {
            var from = 0;
            increment_count(this, from);
            var animation_no = parseInt($(this).data("animation"));
            for (var i = 1; i <= animation_no; i = i + 1) {
                // alert(i);
                $(this).children(".c100").removeClass('p' + (i - 1)).addClass('p' + i);
            }
        });
    } else {
        $(".animation-circle").each(function () {
            var from = 0;
            increment_percent(this, from);
            var animation_no = parseInt($(this).data("animation"));
            for (var i = 1; i <= animation_no; i = i + 1) {
                // alert(i);
                $(this).children(".c100").removeClass('p' + (i - 1)).addClass('p' + i);
            }
        });
    }
}
function increment_percent(a, b) {
    var count_no = parseInt($(a).data("animation"));
    setTimeout(function () {
        b++;
        if (b <= count_no) {
            $(a).children().find(".percent").html(b + "%");
            increment_percent(a, b);
        }
    }, 4);
};
function increment_count(a, b) {
    var count_no = parseInt($(a).data("animation"));
    setTimeout(function () {
        b++;
        if (b <= count_no) {
            $(a).children().find(".percent").html(b);
            increment_count(a, b);
        }
    }, 4);
};
/******************************counter_progress*********************************/
function counter_progress() {

    $(".counterup").each(function () {
        var from = 0;
        increment(this, from);
    });

    function increment(a, b) {

        var count_no = parseInt($(a).data("value"));
        // setTimeout(function () {
        b++;
        if (b <= count_no) {
            $(a).html(b);
            increment(a, b);
        }
        //}, 5);
    };

    $(".counterup-emp").each(function () {
        var from = 0;
        increment1(this, from);
    });
    function increment1(a, b) {
        var count_no = parseFloat($(a).data("value"));
        if (count_no == 0) {
            $(a).html(0);
        }
        else {
            // setTimeout(function () {
            b = parseFloat(b) + 0.01;
            if (b.toFixed(2) <= count_no) {
                $(a).html(b.toFixed(2).replace(/\.0+$/, ''));
                increment1(a, b);
            }
            // }, 5);
        }
    };
    $(".profile-info-table .counterup").each(function () {
        var from = 0;
        increment2(this, from);
    });
    function increment2(a, b) {
        var count_no = parseFloat($(a).data("value"));
        if (count_no == 0) {
            $(a).html(0);
        }
        else {
            //setTimeout(function () {
            b = parseFloat(b) + 0.1;
            if (b.toFixed(2) <= count_no) {
                $(a).html(b.toFixed(1).replace(/\.0+$/, ''));
                increment2(a, b);
            }
            //}, 5);
        }
    };
}
/**********************date_pick_init********************/
function date_pick_init() {
    if ($("div").hasClass("login-box")) {
        $("#login-date").datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: "-100:+0",
            defaultDate: new Date(1985, 00, 01)
        });
    }
};
/******************* filter init*****************/
function side_popup_init() {
    /******************* filter *****************/
    //$(".filter-click").each(function() {
    //    var rightVal = $(this).parent().width() * -1;
    var prev_class
    $(document).on('click', "#comp_filter", function () {
        $(this).toggle();
    });
    //$(this).click(function () {
    $(document).on('click', ".filter-click", function () {
        var rightVal = $(this).parent().width() * -1;
        $(this).parents(".filter-area").toggleClass("side-on");
        $(this).parents(".innerpage-wrap").toggleClass("overflow-hidden");
        rightVal = (rightVal * -1) - $(this).parent().width();
        $(this).toggleClass("active");
        //  $(this).children(".btn").toggleClass("fa-filter").toggleClass("fa-close");
        $(this).parent().toggleClass("active");
        var grid_width = parseInt($(this).parent().data("width-grid"));
        classes = $(this).children(".btn").attr("class").split(' ');
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].match("^fa-")) {
                //alert(classes[i]);
                if (!($(this).children(".btn").hasClass("fa-close"))) {
                    prev_class = classes[i];
                }
            }
        }
        $(this).children(".btn").toggleClass(prev_class);
        if ($(this).children(".btn").hasClass("fa-close")) {
            $(this).children(".btn").removeClass("fa-close");
        } else {
            $(this).children(".btn").addClass("fa-close");
        }
        if (grid_width == 12) {
            $(this).parent().toggleClass("col-sm-push-12").toggleClass("col-sm-push-0");
            $(this).parent().toggleClass("col-xs-push-12");
            $(".popup-bg").toggleClass("active");
        } else {
            $(this).parent().toggleClass("col-sm-push-12").toggleClass("col-sm-push" + (grid_width - 12));
            $(this).parent().toggleClass("col-xs-push-12");
            $(".popup-bg").toggleClass("active");
        }
        //$(this).parent().animate({ left: rightVal + "px" }, { queue: false, duration: 500 });
    });

    //});
    //$(".filter-close").each(function () {
    $(document).on('click', ".filter-close", function () {
        //$(this).click(function () {
        $(this).parent().parent().children(".filter-click").click();
        // alert();
        $(this).parents(".filter-area").css("overflow", "hidden");

        return false;
    });
    //});

    /******************* filter search *****************/

    //$(".filter-click-search").each(function () {
    //    var rightVal = $(this).parent().width() * -1;
    var prev_class2
    //$(this).click(function () {
    $(document).on('click', ".filter-click-search", function () {
        var rightVal = $(this).parent().width() * -1;
        rightVal = (rightVal * -1) - $(this).parent().width();
        $(this).toggleClass("active");
        //$(this).children(".btn").toggleClass("fa-search").toggleClass("fa-close");
        $(this).parent().toggleClass("active");
        var grid_width = $(this).parent().data("width-grid");

        classes = $(this).children(".btn").attr("class").split(' ');
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].match("^fa-")) {
                //alert(classes[i]);
                if (!($(this).children(".btn").hasClass("fa-close"))) {
                    prev_class2 = classes[i];
                }

            }

        }
        $(this).children(".btn").toggleClass(prev_class2);

        if ($(this).children(".btn").hasClass("fa-close")) {
            $(this).children(".btn").removeClass("fa-close");
        } else {
            $(this).children(".btn").addClass("fa-close");
        }

        if (grid_width == 12) {
            $(this).parent().toggleClass("col-sm-push-12").toggleClass("col-sm-push-0");
            $(this).parent().toggleClass("col-xs-push-12");
            $(".popup-bg").toggleClass("active");

        } else {
            $(this).parent().toggleClass("col-sm-push-12").toggleClass("col-sm-push" + (grid_width - 12));
            $(this).parent().toggleClass("col-xs-push-12");
            $(".popup-bg").toggleClass("active");

        }


        //$(this).parent().animate({ left: rightVal + "px" }, { queue: false, duration: 500 });
    });
    //});
    //$(".filter-close-search").each(function () {
    //$(this).click(function () {
    $(document).on('click', ".filter-close-search", function () {
        $(this).parent().parent().children(".filter-click-search").click();
        return false;
    });
    //});

    /******************* Download chart *****************/

    $(".download-click").each(function () {
        var rightVal = $(this).parent().width() * -1;
        var prev_class
        $(this).click(function () {
            rightVal = (rightVal * -1) - $(this).parent().width();
            $(this).toggleClass("active");
            // $(this).children(".btn").toggleClass("fa-download").toggleClass("fa-close");
            $(this).parent().toggleClass("active");
            var grid_width = $(this).parent().data("width-grid");

            classes = $(this).children(".btn").attr("class").split(' ');
            for (var i = 0; i < classes.length; i++) {
                if (classes[i].match("^fa-")) {
                    //alert(classes[i]);
                    if (!($(this).children(".btn").hasClass("fa-close"))) {
                        prev_class = classes[i];
                    }

                }

            }
            $(this).children(".btn").toggleClass(prev_class);

            if ($(this).children(".btn").hasClass("fa-close")) {
                $(this).children(".btn").removeClass("fa-close");
            } else {
                $(this).children(".btn").addClass("fa-close");
            }

            if (grid_width == 12) {
                $(this).parent().toggleClass("col-sm-pull-12").toggleClass("col-sm-pull-0");
                $(this).parent().toggleClass("col-xs-pull-12");
                $(".popup-bg").toggleClass("active");
            } else {
                $(this).parent().toggleClass("col-sm-pull-12").toggleClass("col-sm-pull" + (grid_width - 12));
                $(this).parent().toggleClass("col-xs-pull-12");
                $(".popup-bg").toggleClass("active");
            }
            //$(this).parent().animate({ left: rightVal + "px" }, { queue: false, duration: 500 });
        });
    });
    $(".download-close").each(function () {
        $(this).click(function () {
            $(this).parent().parent().children(".download-click").click();
            return false;
        });
    });

    $(".side-box-toggle").each(function () {
        $(this).click(function () {
            var side_box_class = $(this).data("side-box-target");
            var side_box_class = "." + side_box_class
            $(side_box_class).click();
            $(side_box_class).children("button").toggle();
        })
    })
};

/****************** dashboard more info action *******/
function more_info_init() {
    //$(".user-action").each(function () {
    //$(this).click(function () {
    $(document).on('click', '.user-action', function () {
        $(this).parents(".panel-body").children().find(".chart-visual").stop().fadeToggle(200);
        $(this).parents(".panel-body").children().find(".chart-detail").stop().fadeToggle(200);
        $(this).children("i").toggleClass("fa-plus").toggleClass("fa-minus");
        return false;
    });
    //});
}
/******************* button floating  *****************/
function floating_btn_init() {
    $(".btn-floating-main").click(function () {
        $(".btn-floating-wrap").stop().fadeToggle(400);
        $(".sub-floating-button").stop().slideToggle(400);
    });
    $("body").click(function () {
        $(".btn-floating-wrap").hide();
        $(".sub-floating-button").hide();
    });

    $('.btn-floating-main').click(function (event) {
        event.stopPropagation();
    });
}
/*************** data table init **********/
function RefreshDatatable() {
    $('.common-table').each(function () {
        dt = $(this).dataTable();
        dt.fnDestroy();
    })
    data_table_init();
}

function data_table_init() {
    if ($("table").hasClass("common-table")) {

        $('.common-table').each(function () {
            $(this).DataTable({
                responsive: true,
                autoWidth: false,
                bLengthChange: false,
                bPaginate: true,
                bLengthChange: true,
                bFilter: true,
                bInfo: true,
                pagingType: "full_numbers",
                bAutoWidth: false,
                "oLanguage": {
                    "oPaginate": {
                        "sFirst": "<i class='fa fa-chevron-left'></i><i class='fa fa-chevron-left'></i>",
                        "sLast": "<i class='fa fa-chevron-right'></i><i class='fa fa-chevron-right'></i>",
                        "sNext": "<i class='fa fa-chevron-right'></i>",
                        "sPrevious": "<i class='fa fa-chevron-left'></i>"
                    }
                },
                "dom": 'T<"row"<"col-sm-6"f><"col-sm-6"l>><"clearfix">rt<"clearfix"><"row"<"col-sm-3"i><"col-sm-9 text-right"<"paggin-wrap"p><"' + $(this).attr('id') + '-jump.jump-wrap">>>',
                "fnInitComplete": function () {
                    var table = this.api();
                    var pagination_data = table.page.info();
                    var jump_form = $("<div></div>", {
                        "class": "input-group",
                        "id": "jump-form"
                    });
                    jump_form.append($("<input>", {
                        "type": "number",
                        "class": "form-control",
                        "id": "" + $(this).attr('id') + "-jump-number",
                        "placeholder": "Page #",
                        "min": "1",
                        "value": "1"
                    }));
                    var jump_btn_group = $("<div></div>", {
                        "style": "",
                        "class": "input-group-btn",
                        "style": ""
                    }).appendTo(jump_form);

                    jump_btn_group.append($("<div></div>", {
                        "class": "btn btn-primary btn-block fa fa-arrow-right",
                        "id": "" + $(this).attr('id') + "-jump-form-button",
                        "text": "",
                        "data-toggle": "tooltip",
                        "data-placement": "bottom",
                        "title": "Jump to page"

                    }));
                    var table_id = $(this).attr('id').substring(1);
                    table_id = table_id + "-jump";
                    $("#" + table_id).append(jump_form);
                    $("#" + $(this).attr('id') + "-jump-number").attr("max", pagination_data.pages).val(pagination_data.page + 1);
                },

                "conditionalPaging": true,
                "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                "fnDrawCallback": function () {
                    var table = this.api();
                    var info = table.page.info();
                    var table_id = $(this).attr('id');
                    $('#' + table_id + '_info').html(
                        (info.page + 1) + ' of ' + info.pages + ' pages.'
                    );
                    if (typeof table != 'undefined') {
                        var pagination_data = table.page.info();
                        $("#" + $(this).attr('id') + "-jump-number").attr("max", pagination_data.pages).val(pagination_data.page + 1);
                    }
                },
                "lengthChange": false,
                conditionalPaging: true,
                stateSave: true,
                "aaSorting": [],
                "order": [],
                columnDefs: [
                    { targets: 'sorting_disabled', "orderable": false }
                ]
            });
            var table1 = $("#" + $(this).attr('id')).DataTable();
            var table_jump_btn = "#" + $(this).attr('id') + "-jump-form-button";
            var table_jump_number = "#" + $(this).attr('id') + "-jump-number";
            $(document).off("click", table_jump_btn)
            $(document).on("click", table_jump_btn, function () {
                table1.page(parseInt($(table_jump_number).val(), 10) - 1).draw(false);
            }).on("input", table_jump_number, function () {
                if (isNaN(parseInt($(table_jump_number).val(), 10))) {
                    $(table_jump_number).val(parseInt($(table_jump_number).attr("min"), 10));
                } else {
                    if (parseInt($(table_jump_number).val(), 10) > parseInt($(table_jump_number).attr("max"), 10)) {
                        $(table_jump_number).val(parseInt($(table_jump_number).attr("max"), 10))
                    } else {
                        if (parseInt($(table_jump_number).val(), 10) < parseInt($(table_jump_number).attr("min"), 10)) {
                            $(table_jump_number).val(parseInt($(table_jump_number).attr("min"), 10))
                        }
                    }
                }
            });
        });

    }
    if ($("table").hasClass("popup-common-table")) {

        $('.popup-common-table').each(function () {
            $(this).DataTable({
                responsive: true,
                autoWidth: false,
                bLengthChange: false,
                bPaginate: true,
                bLengthChange: true,
                bFilter: true,
                bInfo: true,
                pagingType: "full_numbers",
                bAutoWidth: false,
                // "oLanguage": {
                //     "oPaginate": {
                //         "sFirst": "<<",
                //         "sLast": ">>",
                //         "sNext": ">",
                //         "sPrevious": "<"
                //     }
                // },
                "dom": 'T<"clearfix"><"row"<"col-sm-6"l><"col-sm-6"f>><"clearfix">rt<"clearfix"><"row"<"col-sm-3"i><"col-sm-7"p><"' + $(this).attr('id') + '-jump.col-sm-2">>',
                "fnInitComplete": function () {
                    var table = this.api();
                    var pagination_data = table.page.info();
                    var jump_form = $("<div></div>", {
                        "class": "input-group col-xs-12",
                        "id": "jump-form"
                    });
                    jump_form.append($("<input>", {
                        "type": "number",
                        "class": "form-control",
                        "id": "" + $(this).attr('id') + "-jump-number",
                        "placeholder": "Page #",
                        "min": "1",
                        "value": "1"
                    }));
                    var jump_btn_group = $("<div></div>", {
                        "style": "",
                        "class": "input-group-btn",
                        "style": ""
                    }).appendTo(jump_form);

                    jump_btn_group.append($("<div></div>", {
                        "class": "btn btn-primary fa fa-arrow-right btn-block",
                        "id": "" + $(this).attr('id') + "-jump-form-button",
                        "text": "Jump to page",
                        // "data-toggle": "tooltip",
                        // "data-placement": "bottom",
                        "title": "Jump to page"

                    }));
                    var table_id = $(this).attr('id').substring(1);
                    table_id = table_id + "-jump";
                    $("#" + table_id).append(jump_form);
                    $("#" + $(this).attr('id') + "-jump-number").attr("max", pagination_data.pages).val(pagination_data.page + 1);
                },

                "conditionalPaging": true,
                lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
                "fnDrawCallback": function () {
                    var table = this.api();
                    var info = table.page.info();
                    var table_id = $(this).attr('id');
                    $('#' + table_id + '_info').html(
                        (info.page + 1) + ' of ' + info.pages + ' pages.'
                    );
                    if (typeof table != 'undefined') {
                        var pagination_data = table.page.info();
                        $("#" + $(this).attr('id') + "-jump-number").attr("max", pagination_data.pages).val(pagination_data.page + 1);
                    }
                },
                "lengthChange": false,
                conditionalPaging: true,
                stateSave: true,
                columnDefs: [
                    { targets: 'sorting_disabled', orderable: false }
                ]
            });
            var table1 = $("#" + $(this).attr('id')).DataTable();
            var table_jump_btn = "#" + $(this).attr('id') + "-jump-form-button";
            var table_jump_number = "#" + $(this).attr('id') + "-jump-number";
            $(document).off("click", table_jump_btn)
            $(document).on("click", table_jump_btn, function () {
                table1.page(parseInt($(table_jump_number).val(), 10) - 1).draw(false);
            }).on("input", table_jump_number, function () {
                if (isNaN(parseInt($(table_jump_number).val(), 10))) {
                    $(table_jump_number).val(parseInt($(table_jump_number).attr("min"), 10));
                } else {
                    if (parseInt($(table_jump_number).val(), 10) > parseInt($(table_jump_number).attr("max"), 10)) {
                        $(table_jump_number).val(parseInt($(table_jump_number).attr("max"), 10))
                    } else {
                        if (parseInt($(table_jump_number).val(), 10) < parseInt($(table_jump_number).attr("min"), 10)) {
                            $(table_jump_number).val(parseInt($(table_jump_number).attr("min"), 10))
                        }
                    }
                }
            });
        });

    }
}
/********** tooltip init ***************/
function tooltip_init() {
    $('[data-toggle="tooltip"]').tooltip()
}
/************* form steps *******************/

function staped_form_init() {
    $(".next-step").click(function () {
        var step_no = $(this).data("nextstep");
        for (var i = step_no - 1; i > 0; i--) {
            $(".step" + i).removeClass("active");
            $(".step" + i).addClass("visited");
            $(".step-content-" + i).removeClass("active");
        };
        $(".step" + step_no).addClass("active");
        $(".step-content-" + step_no).addClass("active");
        $(".progress-bar").css("width", (step_no * 25) + "%");
    });


    $("div").on("click", ".steps.visited", function () {
        var step_no = $(this).data("nextstep");
        for (var i = 4; i > step_no; i--) {
            $(".step" + i).removeClass("active");
            $(".step" + i).removeClass("visited");
            $(".step-content-" + i).removeClass("active");
        };
        $(".step" + step_no).removeClass("visited");
        $(".step" + step_no).addClass("active");
        $(".step-content-" + step_no).addClass("active");
        $(".progress-bar").css("width", (step_no * 25) + "%");
    });

    $(".add-policy").click(function () {
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
                IsSession = false;
            }
        });
        if (IsSession) {
            for (var i = 4; i > 0; i--) {
                $(".step" + i).removeClass("active");
                $(".step" + i).removeClass("visited");
                $(".step-content-" + i).removeClass("active");
            };
            $(".step1").addClass("active");
            $(".step-content-1").addClass("active");
            $(".progress-bar").css("width", "25%");
        }
        else {
            window.location.reload();
        }
    });
}

/******************** sidebar inner menu **********************************/
function ManageMenu() {
    $('.cssmenu li.menu-item>a').on('click', function () {
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
/**************** custome scroll ********************/
/***************** custom-scroll-horizontal ****************/
function custome_scroll_drag_init(node) {

    if ($("#collapse_" + node + "  div").hasClass('custom-scroll-horizontal')) {
        var dragger_height = $(window).outerHeight() * 0.5;
        if (dragger_height < 200) {
            $("#collapse_" + node + "  div.hori-accord-detail ").height("350");
            $("#collapse_" + node + "  div.connectedSortable").css("min-height", "320");
        }
        else {
            $("#collapse_" + node + "  div.hori-accord-detail ").height(dragger_height);
            $("#collapse_" + node + "  div.connectedSortable").css("min-height", dragger_height - 30);
        }
        if ($("#collapse_" + node + "  div").hasClass('custom-scroll')) {
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
        //$("#collapse_" + node + "  div.custom-scroll.hori-accord-detail").mCustomScrollbar("update");

    }
}
/***************** view board design js *****************/
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
    /***************** custom-scroll-horizontal ****************/
    if ($('div').hasClass('custom-scroll-horizontal')) {
        var dragger_height = $(window).outerHeight() * 0.5
        if (dragger_height < 200) {
            $(".hori-accord-detail ").height("350");
            $(".connectedSortable").css("min-height", "320");
        }
        else {
            $(".hori-accord-detail ").height(dragger_height);
            $(".connectedSortable").css("min-height", dragger_height - 30);
        }

        $('.custom-scroll.hori-accord-detail').mCustomScrollbar("update");

    }
    /***************** view board design js *****************/

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
            callbacks: {
                whileScrolling: function () {
                    dropdown_position();
                }
            }
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
        $('.birthday-wrap').css("max-height", ($(".birthday-bg").height() - $(".birthday-bg").children(".panel-heading").height() + 10));
        $('.birthday-wrap').css("height", ($(".birthday-bg").height() - $(".birthday-bg").children(".panel-heading").height() - 20));
        setTimeout(function () {
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
        }, 300)
    }
    /****************** joinee scroll ***************/
    if ($("div").hasClass("joinee-wrap")) {
        $('.joinee-wrap').css("max-height", ($(".joinee-bg").height() - $(".joinee-bg").children(".panel-heading").height() + 10));
        $('.joinee-wrap').css("height", ($(".joinee-bg").height() - $(".joinee-bg").children(".panel-heading").height() - 20));
        setTimeout(function () {
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
        }, 300)

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
/******************* Chosen For select combo ****************/
function chosen_init() {
    if ($("select").hasClass("chosen-select")) {
        $(".chosen-select").chosen({
        });
    }
}
/************* Org chart info click *******************/
function org_chart_init() {
    $('#chart_div_2,#chart_div_1').on('click', '.node-info-btn', function () {

        $('#node-modal').modal('toggle')

    });
}


/******************** left side form **************************/
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

function window_height() {
    $(".login-links").css("height", wh);
}
/****************** ripple effact *****************/

function ripple_effact_init() {
    //$(".btn,.user-action,.ripple").click(function (e) {
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
    //$(".btn,.user-action,.ripple").hover(function (e) {
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
    $(document).on("mouseleave", ".btn,.user-action,.ripple", function (e) {
        // hover ends code here
    });
}

/********************close menu on outside click ****************/
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
/******************* header space ************************/
function auto_head_space() {
    var navbar_height = $('.navbar').height();
    $(".innerpage-wrap").css('padding-top', (navbar_height + 15));
    $(".page-sidebar").css('margin-top', (navbar_height + 2));
};


/********************** form validotr *************************/
$(window).load(function () {
    /**************** saving button *******************/

    $(document).on('submit', 'form', function () {

        var $form = $(this),
            $button,
            label;
        $form.find(':submit').each(function () {
            $button = $(this);
            label = $button.data('after-submit-value');
            if (typeof label != 'undefined') {
                $button.val(label).prop('disabled', true);
            }
        });
    });

    /****************** submit delay **********************/

    $('.form-horizontal').on('submit', function (event, force) {
        if (!force) {
            var $this = $(this);
            event.preventDefault();
            setTimeout(function () {
                $this.trigger('submit', true);
            }, 3000);
        }
    });


});

/********************** collapes **************/
function togglecollaps() {

    $('.accordion').on('hidden.bs.collapse', toggleChevron);
    $('.accordion').on('shown.bs.collapse', toggleChevron);

    $(document).on("click", ".panel-heading .dropdown .dropdown-menu a", function (e) {
        e.stopPropagation();
    })
}

function toggleChevron(e) {
    $(e.target).prev('.panel-heading').find("i").toggleClass('fa-chevron-down fa-chevron-up');
}

/******************* wishes box ***************/

function wishes_init() {
    var c = 0
    $(".btn-wish").click(function () {
        $(this).children("i").toggleClass("fa-history").toggleClass("fa-birthday-cake");
        $(this).parents(".panel-title").children("i").toggleClass("fa-birthday-cake").toggleClass("fa-history");
        $(".anniversary-inner").toggle();
        $(".birthday-inner").toggle();
        if (c == 0) {
            $(this).parents(".panel-title").children("span").html("Anniversary Wishes");
            $(this).attr("title", "Birthday Wishes");

            c = 1;
        }
        else {
            $(this).parents(".panel-title").children("span").html("Birthday Wishes");
            $(this).attr("title", "Anniversary Wishes");

            c = 0;
        }
    })
}
function expand_tree() {
    $(document).on('click', '.expand-child', function () {
        //$(".expand-child").click(function () {        
        var target_child = $(this).data("child-row");
        $(this).children("i").toggleClass("fa-plus-square");
        $(this).children("i").toggleClass("fa-minus-square");
        $("." + target_child).slideToggle();

    });
}
function setupCheckboxes() {
    // Checkbox Styling

    $('input[type=checkbox]').each(function () {


        if ($(this).css('display') != "none") {
            var $this = $(this);
            //$this.addClass('checkbox-custom');
            $this.attr("name");
            var id = $(this).attr('id');

            var dispalyStatusOfControl = "";
            if ($this.css('display') == "block" || $this.css('display') == ("inline-block") || $this.is(":visible")) {
                dispalyStatusOfControl = "true";
            }
            else {
                dispalyStatusOfControl = "false";
            }
            var label = $(this).next('#' + id);
            var labelText = $(this).attr("Text");
            if (labelText == "null") {
                labelText = "";
            }
            if (!$(this).siblings('label').hasClass('checkbox-custom-label')) {
                if (dispalyStatusOfControl == "true") {

                    $('<label class="checkbox-custom-label" for=' + id + '>' + labelText + '</label>').insertAfter($this);
                }
                else {
                    $('<label class="checkbox-custom-label" style="display:none" for=' + id + '>' + labelText + '</label>').insertAfter($this);
                }
            }
        }
        //}

    });
    // Radio Styling
    $('input[type=radio]').each(function () {
        //if (!$(this).parent().hasClass('radio')) {
        if ($(this).css('display') != "none") {
            var $this = $(this);
            $this.addClass('radio-custom');
            $this.attr("name");
            var label = $this.attr("Text");
            var id = $(this).attr('id');
            if (!$(this).siblings('label').hasClass('radio-custom-label')) {
                $('<label class="radio-custom-label" for=' + id + '>' + label + '</label>').insertAfter($this);
            }
        }
        //}
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
                    var ran = Math.random() * 10;
                    $(this).attr("id", $(this).val() + "-chk-" + ran)
                    $(this).siblings("label").addClass("checkbox-custom-label").removeClass("checkbox").attr("for", $(this).attr("id"));
                    $(document).on("click", $(this).siblings("label"), function () {

                    })
                }
            });
        };

    }, 600);
}
function ResetValues() {
    $('#SuggestionTypeID').val('');
    $('#Description').val('');
    $('#file_upload').val('');
    $(".validation-summary-errors ul").empty();
}

/*********************** collaps section ******************/
function collaps_init() {
    //$(document).off("click", ".accordion .panel-heading");
    //$(document).on("click", ".accordion .panel-heading", function () {
    //    if ($(this).parents(".panel.panel-collapse-defult").find(".panel-collapse").hasClass("in")) {

    //    }
    //    $(this).parent().toggleClass('active').siblings().removeClass("active");
    //});
    $(document).on('shown.bs.collapse', '.accordion', function (e) {
        $("#" + e.target.id).parent().addClass('active').siblings().removeClass("active");
    })
    $(document).on('hidden.bs.collapse', '.accordion', function (e) {
        $("#" + e.target.id).parent().removeClass('active').siblings().removeClass("active");
    })

}
function footer_space_init() {
    if ($("div").hasClass("form-footer")) {
        $(".innerpage-wrap").css("padding-bottom", "61px")
    }
}

/*************** auto mmodal body height ************/
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
function filetype_init() {

    if ($("input:file").attr("type") == "file" && $("input:file").css("display") != "none") {
        if ($("input:file").css("opacity") != 0) {

            $("input:file").not("#fileupload input:file").filestyle({ buttonName: "btn btn-primary", buttonText: "&nbsp; Choose file", iconName: "fa fa-folder", placeholder: "No file Selected" });

        }
    }
};

function notification_init() {
    $(".dropdown-extended .dropdown-menu").on("click", function () {
        event.stopPropagation();
    })
    $(".dropdown-extended .dropdown-menu-list").on("click", ".note_more", function () {
        $(this).parents("li").siblings().each(function () { $(this).find(".info").show() });
        $(this).parents("li").siblings().each(function () { $(this).find(".detail").hide() });
        $(this).parents(".details").find(".info").toggle();
        $(this).parents(".details").find(".detail").toggle();
    })
}
/********************* tree table function *************************/
function tree_grid() {

    if ($("div").hasClass("tree-grid")) {
        var globalCounter = 0;
        var saveStateName = 'state-save-4';
        // $(".tree-grid #tree-1").treegrid({
        //     initialState: 'collapsed'
        // });
        // $(".tree-grid #tree-2").treegrid({
        //     treeColumn: 1,
        //     initialState: 'expanded',
        //     'saveState': true,
        //     'saveStateName': saveStateName
        // });
        // $(".tree-grid #tree-3").treegrid({
        //     initialState: 'collapsed'
        // });
        $(".tree-grid #tree-view").treegrid({
            //initialState: 'collapsed',
            onChange: function () {
                globalCounter++;
            },
            onCollapse: function () {
                globalCounter++;
            },
            onExpand: function () {
                globalCounter++;
            },
            initialState: 'collapsed'
        });
    }
}
/********************* tree table function *************************/
/********************tree-grid ****************/
function treegrid_sidebar() {
    // $(document).off("click", ".treegrid-expander")
    $(".tree-grid.with-sidebar tr td").on("click", ".treegrid-expander", function (event) {
        $(this).parents(".treegrid-row").siblings().removeClass("active");
        $(this).parents(".treegrid-row").addClass('active');

        event.stopPropagation();
    });
    $(document).off("click", ".tree-grid.with-sidebar tr td")
    $(".tree-grid.with-sidebar tr td").not(".tree-grid.with-sidebar tr td:last-child").on("click", function (argument) {

        var TabId = $(this).parents('.tab-pane').attr('id');
        var dvID = "#" + TabId + 'RightPanel'
        Viewsidebar(this.parentNode.id, dvID);


    });

    $(document).on("click", ".with-sidebar .treegrid-row", function () {

        $(".with-sidebar .treegrid-row").removeClass('active'),
        $(this).addClass('active');
    })






}
function Viewsidebar(Wbsid, dvID) {
    side_bar_show(this);
    chosen_reinit()
    GetWorkItemDetails(Wbsid, dvID);
}
function side_bar_show(a) {

    $(a).parent().siblings().removeClass("active");
    $(a).parent().addClass("active");
    $(".drag-group").addClass('sidebar-active');
    $(".tree-content").removeClass('col-sm-12').addClass('col-sm-8');
    $(".tree-sidebar").show().removeClass('col-sm-push-12');
}

function side_bar_hide(a) {

    $(".drag-group").removeClass('sidebar-active');
    $(".tree-content").addClass('col-sm-12').removeClass('col-sm-8');
    $(".tree-sidebar").hide().removeClass('col-sm-push-12');
}


/********************sprint_search****************/
function sprint_search() {

    $(".search-sprint").click(function (argument) {
        $(".search-sprint-area").slideToggle('show-it');
        $(".search-sprint i").toggleClass('fa-times')
    });



    // $('.treegrid-expander').click(function(event) {
    //     $(".tree-grid .is-parent").addClass('active');
    //     event.stopPropagation();
    // });
}
function chosen_reinit() {
    if (ww != wwold) {

        if ($("select").hasClass("chosen-select")) {
            $(".chosen-select").chosen('destroy');
            $(".chosen-select").chosen({ width: '100%' });

        }
        if ($("select").hasClass("icon-select")) {

            $(".icon-select").chosenIcon('destroy');
            $(".icon-select").chosenIcon({
                disable_search_threshold: 10
            });

        }


        wwold = $(this).width();

    }
}
function sidebar_toggle() {
    $('.sidebar-toggle').on("click", function (event) {

        side_bar_hide(this);
        return false;
        chosen_reinit();
    });
}

/******************* chosen dynamic height ***********************/
function chosen_position() {
    $(".chosen-container-multi .chosen-choices").on("DOMSubtreeModified", function () { chosen_window() })
    setTimeout(function () {
        if ($("div").hasClass("chosen-container")) {
            $(document).on('chosen:showing_dropdown', '.chosen-select', function (evt, params) {
                setTimeout(function () { $(".chosen-container.chosen-with-drop .chosen-search input").focus(); }, 100);
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
    if (typeof chosen_pos != 'undefined') {
        var chosen_pos_top = chosen_pos.top + chosen_height - scrol_top;
        var chosen_pos_left = chosen_pos.left;
    }
    var dist_from_bottom = scroll_height - chosen_pos_top;
    if (dist_from_bottom > drop_height) {
        $(".chosen-container.chosen-with-drop .chosen-drop").addClass("on-bottom").removeClass("on-top").css({ "position": "fixed", "top": chosen_pos_top, "left": chosen_pos_left, "width": chosen_width });
    } else {
        $(".chosen-container.chosen-with-drop .chosen-drop").removeClass("on-bottom").addClass("on-top").css({ "position": "fixed", "top": chosen_pos_top - drop_height - chosen_height + 2, "left": chosen_pos_left, "width": chosen_width });
    }
}


/****************** horizontal accordion **********************/

function horizontol_accord_init() {
    $('.completeRelease').click(function (event) {
        $(this).parents(".hori-accord-title").click();
    });
    $(".hori-accord-title").each(function () {
        $(this).unbind("click");
        $(this).on("click", function () {
            $(this).parent().toggleClass("hide_accord").css("width", $(this).parent().parent().height());
            $(this).parent().parent().css("width", $(this).parent().find(".hori-accord-title").height());
            if (!$(this).parent().hasClass("hide_accord")) {
                $(this).parent().removeAttr("style");
                $(this).parent().parent().removeAttr("style");
            }
        })
    })
}
function horizontol_accord_init_Node(node) {
    $("#" + node + " .hori-accord-title").each(function () {
        $(this).unbind("click");
        $(this).on("click", function () {
            $(this).parent().toggleClass("hide_accord").css("width", $(this).parent().parent().height());
            $(this).parent().parent().css("width", $(this).parent().find(".hori-accord-title").height());
            if (!$(this).parent().hasClass("hide_accord")) {
                $(this).parent().removeAttr("style");
                $(this).parent().parent().removeAttr("style");
            }
        })
    })
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
function IsAlphaNumeric(e) {
    var regex = new RegExp("^[a-zA-Z0-9\\-\\s]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
}
function resetFormValidator(formId) {
    $(formId).removeData('validator');
    $(formId).removeData('unobtrusiveValidation');
    $.validator.unobtrusive.parse(formId);
}
function SetupRadioButton(className) {
    $(className).each(function () {
        var $this = $(this);
        $this.addClass('radio-custom');
        $this.attr("name");
        var label = $this.attr("Text");
        var id = $(this).attr('id');
        $('<label class="radio-custom-label" for=' + id + '>' + label + '</label>').insertAfter($this);
    });
}
function chosen_init_dynamic(className) {
    $(className).chosen({
    });
}
function setupCheckbox(className) {
    // Checkbox Styling

    $(className).each(function () {
        if ($(this).css('display') != "none") {
            var $this = $(this);
            //$this.addClass('checkbox-custom');
            $this.attr("name");
            var id = $(this).attr('id');

            var dispalyStatusOfControl = "";
            if ($this.css('display') == "block" || $this.css('display') == ("inline-block") || $this.is(":visible")) {
                dispalyStatusOfControl = "true";
            }
            else {
                dispalyStatusOfControl = "false";
            }
            var label = $(this).next('#' + id);
            var labelText = $(this).attr("Text");
            if (labelText == "null") {
                labelText = "";
            }
            if (!$(this).siblings('label').hasClass('checkbox-custom-label')) {
                if (dispalyStatusOfControl == "true") {

                    $('<label class="checkbox-custom-label" for=' + id + '>' + labelText + '</label>').insertAfter($this);
                }
                else {
                    $('<label class="checkbox-custom-label" style="display:none" for=' + id + '>' + labelText + '</label>').insertAfter($this);
                }
            }
        }
    });
};
function setUpControlDisabled() {
    $('.fieldDisabled').each(function () {
        $(this).prop('disabled', true);
    })
}
function dateTimePickerInitDynamic(obj, startDate) {
    $(obj).datepicker({ autoclose: true, format: genericDateFormate, startDate: startDate });
}
