// hegith fix for login page all resolution
var wwold = $(window).width();
var ww = $(window).width();
var wh = $(window).height();

$(document).ready(function () {

    if (ww > 767) {
        window_height();
    } else {
        $(".login-links").css("height", "initial");
        $(".login-set").css("height", "initial");
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
    /************ loader *************/
    loader();
    /************* collaps ************/
    togglecollaps();

});


/********************* loader function *************************/
function loader() {
    $(".loader-wrapper").toggle();
    setTimeout(function () { $(".loader-wrapper").toggle(); }, 1000);
}
/********************* resize function *************************/
$(window).resize(function () {
    ww = $(window).width();
    wh = $(window).height();

    if (ww > 768) {
        window_height()
    } else {
        $(".login-links").css("height", "initial");
        $(".login-set").css("height", "initial");
    }

    /************ sidebar *******************/
    ManageSlider()

    $('.side-bar-container').removeClass("active");
    $(".innerpage-wrap ").removeClass('active');
    $('.selector-button-menu').addClass("fa-bars").removeClass("fa-close").removeClass("active");


    /******************* Chosen For select combo ****************/
    if (ww != wwold) {
        if ($("select").hasClass("chosen-select")) {
            $(".chosen-select").chosen('destroy');
            $(".chosen-select").chosen({ width: '100%' });
        }
        wwold = $(this).width();
    }
    /************ fixed header space *************/
    auto_head_space()

    /************ fixed height dashbord *************/

    dashbord_rowint()

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
            responsive: true,
            percentageInnerCutout: 70,
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
        });
        document.getElementById('deapart-head-chirt-legend-emp').innerHTML = deapartDoughnut.generateLegend();
    }


    if (document.getElementById("deapart-head-chart")) {
        // Dougnut Chart from doughnutData
        var doctx = document.getElementById("deapart-head-chart").getContext("2d");
        window.deapartDoughnut = new Chart(doctx).Doughnut(deapartheaddata, {
            responsive: true,
            percentageInnerCutout: 70,
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
        });
        document.getElementById('deapart-head-chirt-legend').innerHTML = deapartDoughnut.generateLegend();
    }
    if (document.getElementById("loc-head-chart")) {
        // Dougnut Chart from doughnutData
        var doctx = document.getElementById("loc-head-chart").getContext("2d");
        window.deapartDoughnut = new Chart(doctx).Doughnut(locheaddata, {
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
    /******************** Org chart *********************/


    //if ($("div").hasClass("org-chart")) {
        
    //    google.charts.load('current', {
    //        packages: ["orgchart"]
    //    });

    //    function drawChart() {
            
    //        //$.post('/Report/GetEmployeeData', {},
    //        //function (data) {
    //        //    var tdata = new google.visualization.DataTable();
    //        //});
    //        var jsonData = google.visualization.arrayToDataTable($.post('/Report/GetEmployeeData', {}).responseText);
    //        var row_1 = new google.visualization.DataTable();
    //        row_1.addColumn('string', 'Name');
    //        row_1.addColumn('string', 'Manager');

    //        // For each orgchart box, provide the name, manager, and tooltip to show.
    //        row_1.addRows([
    //            [{
    //                v: 'parent_node',
    //                f: '<div class="tree-node-wrap lead"><table class="node-table"><tbody><tr><td class="node-img-wrap"><div class="node-img-ring"><div class="node-img" style="background: url(&quot;images/1_Photo.png&quot;) center top no-repeat;background-size: cover;"></div></div> </td></tr><tr><td class="node-info-wrap"><table style=""><tbody><tr><td class="node-name"><div class="title">Mukesh Gajjar</div><div class="detail">Business Development Executive</div><div class="email"><a href="mailto:mukesh.gajjar@cygnetinfotech.com" title="">mukesh.gajjar@cygnetinfotech.com</a></div></td></tr></tbody></table></td></tr></tbody></table></div>'
    //            }, null]
    //        ]);

    //        var row_2 = new google.visualization.DataTable();
    //        row_2.addColumn('string', 'Name');
    //        row_2.addColumn('string', 'Manager');

    //        // For each orgchart box, provide the name, manager, and tooltip to show.
    //        row_2.addRows([

    //            [{
    //                v: 'child_node_2',
    //                f: '<div class="tree-node-wrap"><table class="node-table"><tbody><tr><td class="node-img-wrap"><div class="node-img-ring"><div class="node-img" style="background: url(&quot;images/2_Photo.png&quot;) center top no-repeat;background-size: cover;"></div></div> </td></tr><tr><td class="node-info-wrap"><table style=""><tbody><tr><td class="node-name"><div class="title">Ghanshyam Tiwari</div><div class="detail">Lead Designer </div></td></tr></tbody></table></td></tr></tbody></table></div>'
    //            }, ' '],
    //            [{
    //                v: 'child_node_3',
    //                f: '<div class="tree-node-wrap"><table class="node-table"><tbody><tr><td class="node-img-wrap"><div class="node-img-ring"><div class="node-img" style="background: url(&quot;images/3_Photo.png&quot;) center top no-repeat;background-size: cover;"><i class="fa fa-plus node-info-btn" title="info" data-toggle="tooltip" data-placement="bottom"></i></div></div> </td></tr><tr><td class="node-info-wrap"><table style=""><tbody><tr><td class="node-name"><div class="title">Vikalp Mehta</div><div class="detail">Lead Annalyst</div></td></tr></tbody></table></td></tr></tbody></table></div>'
    //            }, ' '],
    //            [{
    //                v: 'child_node_4',
    //                f: '<div class="tree-node-wrap"><table class="node-table"><tbody><tr><td class="node-img-wrap"><div class="node-img-ring"><div class="node-img" style="background: url(&quot;images/4_Photo.png&quot;) center top no-repeat;background-size: cover;"></div></div> </td></tr><tr><td class="node-info-wrap"><table style=""><tbody><tr><td class="node-name"><div class="title">Brijesh Pandya</div><div class="detail">Senior Software Engineer</div></td></tr></tbody></table></td></tr></tbody></table></div>'
    //            }, ' '],
    //            [{
    //                v: 'child_node_5',
    //                f: '<div class="tree-node-wrap"><table class="node-table"><tbody><tr><td class="node-img-wrap"><div class="node-img-ring"><div class="node-img" style="background: url(&quot;images/5_Photo.png&quot;) center top no-repeat;background-size: cover;"><i class="fa fa-plus node-info-btn" title="info" data-toggle="tooltip" data-placement="bottom"></i></div></div> </td></tr><tr><td class="node-info-wrap"><table style=""><tbody><tr><td class="node-name"><div class="title">Poojan Kadam</div><div class="detail">Business Development Executive</div></td></tr></tbody></table></td></tr></tbody></table></div>'
    //            }, ' '],
    //            [{
    //                v: 'child_node_6',
    //                f: '<div class="tree-node-wrap"><table class="node-table"><tbody><tr><td class="node-img-wrap"><div class="node-img-ring"><div class="node-img" style="background: url(&quot;images/2_Photo.png&quot;) center top no-repeat;background-size: cover;"></div></div> </td></tr><tr><td class="node-info-wrap"><table style=""><tbody><tr><td class="node-name"><div class="title">Ghanshyam Tiwari</div><div class="detail">Lead Designer </div></td></tr></tbody></table></td></tr></tbody></table></div>'
    //            }, ' '],
    //            [{
    //                v: 'child_node_7',
    //                f: '<div class="tree-node-wrap"><table class="node-table"><tbody><tr><td class="node-img-wrap"><div class="node-img-ring"><div class="node-img" style="background: url(&quot;images/3_Photo.png&quot;) center top no-repeat;background-size: cover;"><i class="fa fa-plus node-info-btn" title="info" data-toggle="tooltip" data-placement="bottom"></i></div></div> </td></tr><tr><td class="node-info-wrap"><table style=""><tbody><tr><td class="node-name"><div class="title">Vikalp Mehta</div><div class="detail">Lead Annalyst</div></td></tr></tbody></table></td></tr></tbody></table></div>'
    //            }, ' '],
    //            [{
    //                v: 'child_node_8',
    //                f: '<div class="tree-node-wrap"><table class="node-table"><tbody><tr><td class="node-img-wrap"><div class="node-img-ring"><div class="node-img" style="background: url(&quot;images/4_Photo.png&quot;) center top no-repeat;background-size: cover;"></div></div> </td></tr><tr><td class="node-info-wrap"><table style=""><tbody><tr><td class="node-name"><div class="title">Brijesh Pandya</div><div class="detail">Senior Software Engineer</div></td></tr></tbody></table></td></tr></tbody></table></div>'
    //            }, ' '],
    //            [{
    //                v: 'child_node_9',
    //                f: '<div class="tree-node-wrap"><table class="node-table"><tbody><tr><td class="node-img-wrap"><div class="node-img-ring"><div class="node-img" style="background: url(&quot;images/5_Photo.png&quot;) center top no-repeat;background-size: cover;"><i class="fa fa-plus node-info-btn" title="info" data-toggle="tooltip" data-placement="bottom"></i></div></div> </td></tr><tr><td class="node-info-wrap"><table style=""><tbody><tr><td class="node-name"><div class="title">Poojan Kadam</div><div class="detail">Business Development Executive</div></td></tr></tbody></table></td></tr></tbody></table></div>'
    //            }, ' '],
    //        ]);
    //        // Create the chart.
    //        var chart_1 = new google.visualization.OrgChart(document.getElementById('chart_div_1'));
    //        // Draw the chart, setting the allowHtml option to true for the tooltips.
    //        chart_1.draw(row_1, {
    //            allowHtml: true,
    //            allowCollapse: false,
    //            animation: {
    //                duration: 1000,
    //                easing: 'out',
    //            },
    //        });
    //        // Create the chart.
    //        var chart_2 = new google.visualization.OrgChart(document.getElementById('chart_div_2'));
    //        // Draw the chart, setting the allowHtml option to true for the tooltips.
    //        chart_2.draw(row_2, {
    //            allowHtml: true,
    //            allowCollapse: false,
    //            animation: {
    //                duration: 1000,
    //                easing: 'out',
    //            },
    //        });
    //    }

    //    google.charts.setOnLoadCallback(drawChart);
    //}

    

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
}

function ManageSlider() {
    ww = $(window).width();
    if (ww > 767) {
        $('.page-sidebar').unbind('mouseenter').bind('click', function () {
            //do some things
            if ($(".side-bar-container").hasClass('active')) {
                /* $(".side-bar-container").removeClass('active');
                var elements = $('.cssmenu table tr td[class*="open"]');
                if ($(elements).length > 0) {
                $(elements).each(function(i, ele) {
                $(ele).removeClass('open');
                $(ele).children('ul').css('display', 'none');
                });
                }
                var elements = $('.cssmenu ul li[class*="open"],.cssmenu1 ul li[class*="open"]');
                if ($(elements).length > 0) {
                $(elements).each(function(i, ele) {
                $(ele).removeClass('open');
                $(ele).children('ul').css('display', 'none');
                });
                }*/
            } else
                $('.side-bar-container').addClass("active");
            $('.innerpage-wrap').addClass("active");

            $('.selector-button-menu').removeClass("fa-bars").addClass("fa-close");
            $('.selector-button-menu').addClass("active");
            //$(this).unbind('mouseenter', arguments.callee); //unbind *just this handler*
        });
        // $('.page-sidebar').unbind('mouseleave').bind('mouseleave', function() {
        //     //do some things
        //     //$(".profilemenu").hide();
        //     $(".side-bar-container").removeClass('active');
        //     var elements = $('.cssmenu table tr td[class*="open"]');
        //     if ($(elements).length > 0) {
        //         $(elements).each(function(i, ele) {
        //             $(ele).removeClass('open');
        //             $(ele).children('ul').css('display', 'none');
        //         });
        //     }
        //     var elements = $('.cssmenu ul li[class*="open"]');
        //     if ($(elements).length > 0) {
        //         $(elements).each(function(i, ele) {
        //             $(ele).removeClass('open');
        //             $(ele).children('ul').css('display', 'none');
        //         });
        //     }
        //     var elements = $('.cssmenu1 ul li[class*="open"]');
        //     if ($(elements).length > 0) {
        //         $(elements).each(function(i, ele) {
        //             $(ele).removeClass('open');
        //             $(ele).children('ul').css('display', 'none');
        //         });
        //     }
        //     //$(this).unbind('mouseleave', arguments.callee); //unbind *just this handler*
        // });
    } else {
        $(".page-sidebar").unbind('mouseenter mouseleave');
    }
}
/******************* circle progressbar *****************/

function circle_progress() {
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
/******************************counter_progress*********************************/
function counter_progress() {
    $(".counterup-emp").each(function () {
        var from = 0;
        increment1(this, from);
    });

    function increment1(a, b) {

        var count_no = parseFloat($(a).data("value"));
        setTimeout(function () {
            b = b + 0.1;
            if (b <= count_no) {
                $(a).html(b.toFixed(2));
                increment1(a, b);
            }
        }, 10);
    };


    $(".counterup").each(function () {
        var from = 0;
        increment(this, from);
    });

    function increment(a, b) {

        var count_no = parseInt($(a).data("value"));
        setTimeout(function () {
            b++;
            if (b <= count_no) {
                $(a).html(b);
                increment(a, b);
            }
        }, 10);
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
    $(".filter-click").each(function () {
        var rightVal = $(this).parent().width() * -1;
        var prev_class

        $(this).click(function () {
            $(this).parents(".filter-area").toggleClass("side-on");
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
    });
    $(".filter-close").each(function () {
        $(this).click(function () {
            $(this).parent().parent().children(".filter-click").click();
            alert();
            $(this).parents(".filter-area").css("overflow", "hidden");
            return false;
        });
    });

    /******************* filter search *****************/

    $(".filter-click-search").each(function () {
        var rightVal = $(this).parent().width() * -1;
        var prev_class
        $(this).click(function () {
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
    });
    $(".filter-close-search").each(function () {
        $(this).click(function () {
            $(this).parent().parent().children(".filter-click-search").click();
            return false;
        });
    });

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
    $(".user-action").each(function () {
        $(this).click(function () {
            $(this).parents(".panel-body").children().find(".chart-visual").stop().slideToggle(300);
            $(this).parents(".panel-body").children().find(".chart-detail").stop().slideToggle(300);
            $(this).children("i").toggleClass("fa-plus").toggleClass("fa-minus");
            return false;
        });
    });
}
/******************* button floating  *****************/

function floating_btn_init() {
    $(".btn-floating-main").click(function () {
        $(".btn-floating-wrap").stop().fadeToggle(400);
        $(".sub-floating-button").stop().slideToggle(400);
    });
}
/*************** data table init **********/

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
                "dom": 'T<"clearfix"><"row"<"col-sm-6"l><"col-sm-6"f>><"clearfix">rt<"clearfix"><"row"<"col-sm-3"i><"col-sm-9 text-right"<"paggin-wrap"p><"' + $(this).attr('id') + '-jump.jump-wrap">>>',
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
                lengthMenu: [
                    [5, 10, 20, 30, 40, 50, -1],
                    [5, 10, 20, 30, 40, 50, "All"]
                ],
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
                lengthMenu: [
                    [5, 10, 20, 30, 40, 50, -1],
                    [5, 10, 20, 30, 40, 50, "All"]
                ],
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
        for (var i = 4; i > 0; i--) {
            $(".step" + i).removeClass("active");
            $(".step" + i).removeClass("visited");
            $(".step-content-" + i).removeClass("active");
        };
        $(".step1").addClass("active");
        $(".step-content-1").addClass("active");
        $(".progress-bar").css("width", "25%");
    });
}

/******************** sidebar inner menu **********************************/
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
                element.find('ul').stop().slideUp();
            } else {
                element.addClass('open');
                element.addClass('active');
                element.children('ul').stop().slideDown();
                element.siblings('li').children('ul').stop().slideUp();
                element.siblings('li').removeClass('open');
                element.siblings('li').find('li').removeClass('open');
                element.siblings('li').find('ul').stop().slideUp();
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
                element.find('ul').stop().slideUp();
            } else {
                element.addClass('open');
                element.addClass('active');
                element.children('ul').stop().slideDown();
                element.siblings('li').children('ul').stop().slideUp();
                element.siblings('li').removeClass('open');
                element.siblings('li').find('li').removeClass('open');
                element.siblings('li').find('ul').stop().slideUp();
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
                    element.find('ul').stop().slideUp();

                } else {
                    element.addClass('open');
                    element.children('ul').stop().slideDown();
                    element.siblings('li').children('ul').stop().slideUp();
                    element.siblings('li').removeClass('open');
                    element.siblings('li').find('li').removeClass('open');
                    element.siblings('li').find('ul').stop().slideUp();
                }
            }
        });
    })(jQuery);
}
/**************** custome scroll ********************/
function custome_scroll_init() {

    /**************** common scroll ********************/
    if ($('div').hasClass('custom-scroll')) {
        $('.custom-scroll').mCustomScrollbar({
            scrollbarPosition: "inside",
            axis: "y",
            autoDraggerLength: true,
            autoExpandScrollbar: true,
            alwaysShowScrollbar: 0,
            updateOnContentResize: true,
        });
    }
    /****************** employee-status scroll**************/
    if ($("div").hasClass("employee-status")) {
        $('.employee-status').mCustomScrollbar({
            scrollbarPosition: "outside",
            axis: "x",
            autoDraggerLength: true,
            autoExpandScrollbar: false,
            alwaysShowScrollbar: 0,
            updateOnContentResize: true,
            theme: "minimal-dark",
        });
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


    });

}

function window_height() {
    $(".login-links").css("height", wh);
    $(".login-set").css("height", wh);
}
/****************** ripple effact *****************/

function ripple_effact_init() {
    $(".btn,.user-action,.ripple").click(function (e) {
        element = $(this);
        if (element.find(".drop").length === 0)
            element.prepend("<span class='drop'></span>");

        drop = element.find(".drop");
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
    $(".btn,.user-action,.ripple").hover(function (e) {

        element = $(this);
        if (element.find(".drop").length === 0)
            element.prepend("<span class='drop'></span>");

        drop = element.find(".drop");
        drop.removeClass("animate");

        if (!drop.height() && !drop.width()) {
            d = Math.max(element.outerWidth(), element.outerHeight());
            drop.css({ height: d, width: d });
        }

        x = e.pageX - element.offset().left - drop.width() / 2;
        y = e.pageY - element.offset().top - drop.height() / 2;

        //set the position and add class .animate
        drop.css({ top: y + 'px', left: x + 'px' }).addClass("animate");
    }, function () { });
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
    $(".innerpage-wrap").css('padding-top', (navbar_height + 20));
    $(".page-sidebar").css('margin-top', (navbar_height + 2));
};


/********************** form validotr *************************/
$(window).load(function () {

    // $('form').validate({
    //     rules: {
    //         ctrl1: {
    //             required: true
    //         },
    //         ctrl2: {
    //             required: true
    //         },
    //         ctrl3: {
    //             required: true
    //         },
    //         ctrl4: {
    //             required: true
    //         },
    //         ctrl7: {
    //             required: true
    //         },
    //         ctrl8: {
    //             required: true
    //         },
    //         ctrl9: {
    //             required: true
    //         },
    //         ctrl10: {
    //             required: true
    //         },
    //     },

    //     highlight: function(element) {
    //         var id_attr = "#" + $(element).attr("id") + "1";
    //         $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
    //         $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');
    //     },
    //     unhighlight: function(element) {
    //         var id_attr = "#" + $(element).attr("id") + "1";
    //         $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
    //         $(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
    //     },
    //     errorElement: 'span',
    //     errorClass: 'help-block',
    //     errorPlacement: function(error, element) {
    //         if (element.length) {
    //             error.insertAfter(element);
    //         } else {
    //             error.insertAfter(element);
    //         }
    //     },
    //     errorPlacement: function(label, element) {
    //         // default
    //         if (element.is(':radio ,:checkbox ')) {
    //             label.insertAfter(element.parent().parent());
    //         } else {
    //             label.insertAfter(element);
    //         }
    //     },

    // });
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
}

function toggleChevron(e) {
    $(e.target).prev('.panel-heading').find("i").toggleClass('fa-chevron-down fa-chevron-up');
}
