$(document).ready(function () {
    //$("#ddlProjectList").hide();
    $("#ddlSprint").hide();
    if(ProjectType == Enum_Scrum_ProjectType)
        $("#ddlReport").val("1");
    if (ProjectType == Enum_Kanban_ProjectType)
        $("#ddlReport").val("4");
    if (ProjectType == Enum_Iterative_ProjectType)
        $("#ddlReport").val("5");
    $("#ddlSprint").change(function () {
        SprintChange();
    });
    $("#ddlPrioritySprint").change(function () {
        SprintChange();
    });
    $("#ddlReport").change(function () {
        $("#velocityGraph").empty();
        var ReportType = $(this).val();        
        if (ReportType == 1) {
            $("#ddlSprint").show();
            $("#ddlPrioritySprint").hide();
            $(".chart").hide();
            $("#ddlSprint").hide();
            if (CompletedSprint > 1) {
                $('#uprgsMaster').css('visibility', 'visible');
                $.ajax({
                    type: "POST",
                    url: urlGetVelocityData,
                    data: '{ "ProjectId":' + ProjectId + '}',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        $('#uprgsMaster').css('visibility', 'hidden');
                        objPriorityChartData = JSON.parse(data.result);
                        intializeChart(objPriorityChartData);
                    },
                    error: function (response) {
                        alert(response.responseText);
                    }
                });
            }
            else {
                $("#velocityGraph").html("<span>Most of the Sprints are in Progress. You can view Graph when at least 2 or more Sprints are completed for this Project.</span>");
            }
        }
        else if (ReportType == 3 || ReportType == 2) {            
            if (ReportType == 2) {
                $("#ddlSprint").show();
                $("#ddlPrioritySprint").hide();
                if ($("#ddlSprint").val() == "" || $("#ddlSprint").val() == null) {
                    $("#ddlSprint").hide();
                    $("#velocityGraph").html("<span>There is no any completed Sprint.</span>");
                }
            }
            if (ReportType == 3) {
                $("#ddlSprint").hide();
                $("#ddlPrioritySprint").show();
            }
            SprintChange();
        }
        else if (ReportType == 4) {
            $("#ddlPrioritySprint").hide();
            $("#ddlReport").val("4");
            $('#uprgsMaster').css('visibility', 'visible');
            var month = $("#ddlMonth").val();
            $.ajax({
                type: "POST",
                url: urlGetCumulativeData,
                data: '{ "ProjectId":' + ProjectId + ',"Months":' + month + '}',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    objPriorityChartData = JSON.parse(data.result);
                    $('#uprgsMaster').css('visibility', 'hidden');
                    //update();
                    intializeCumulativeChart(objPriorityChartData);
                    $("#velocityGraph").next("svg").attr('style', 'width:auto');
                },
                error: function (response) {
                    alert(response.responseText);
                }
            });
        }
        else if (ReportType == 5) {
            $("#ddlPrioritySprint").hide();
            $("#ddlReport").val("5");            
            if ($("#ddlSprint").val() == "" || $("#ddlSprint").val() == null)
                $("#velocityGraph").html("<span>Variance is calculated only if iteration is completed.In this Project, Iteration are still in Progress.</span>");
            else {
                $("#ddlSprint").show();
                SprintChange();
            }
        }
    });
    $("#ddlReport").trigger('change');
    $("#ddlMonth").change(function () {
        $("#ddlPrioritySprint").hide();
        $("#ddlReport").val("4");
        $('#uprgsMaster').css('visibility', 'visible');
        var month = $("#ddlMonth").val();
        $.ajax({
            type: "POST",
            url: urlGetCumulativeData,
            data: '{ "ProjectId":' + ProjectId + ',"Months":' + month + '}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                objPriorityChartData = JSON.parse(data.result);
                $('#uprgsMaster').css('visibility', 'hidden');
                //update();
                intializeCumulativeChart(objPriorityChartData);
                $("#velocityGraph").next("svg").attr('style', 'width:auto');
            },
            error: function (response) {
                alert(response.responseText);
            }
        });
    });
    //setCumulativeChart();
});
function intializeChart(objPriorityChartData) {
    BindEvent();
    $("#velocityGraph").empty();
    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

    var svg = d3.select("#velocityGraph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //svg.data(objPriorityChartData);

    var ageNames = d3.keys(objPriorityChartData[0]).filter(function (key) { return key !== "SprintTitle"; });

    objPriorityChartData.forEach(function (d) {
        d.ages = ageNames.map(function (name) { return { name: name, value: +d[name] }; });
    });

    x0.domain(objPriorityChartData.map(function (d) { return d.SprintTitle; }));
    x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(objPriorityChartData, function (d) { return d3.max(d.ages, function (d) { return d.value; }); })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Hours");

    var state = svg.selectAll(".SprintTitle")
        .data(objPriorityChartData)
      .enter().append("g")
        .attr("class", "g")
        .attr("transform", function (d) { return "translate(" + x0(d.SprintTitle) + ",0)"; });

    state.selectAll("rect")
        .data(function (d) { return d.ages; })
      .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function (d) { return x1(d.name); })
        .attr("y", function (d) { return y(d.value); })
        .attr("height", function (d) { return height - y(d.value); })
        .style("fill", function (d) { return color(d.name); });

    var legend = svg.selectAll(".legend")
        .data(ageNames.slice().reverse())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function (d) { return d; });
}
function initializePriorityChart(PriorityData) {
    BindEvent();
    $("#velocityGraph").empty();
    var i;
    var title;
    var value;

    var objPriorityData = [];

    var objPriorityChartData = PriorityData;
    //if (objPriorityChartData.length > 0) {
    for (i = 0; i < objPriorityChartData.length; i++) {
        title = objPriorityChartData[i].Priority;
        value = objPriorityChartData[i].TaskCount;
        var priorityColor = '';
        switch (title) {
            case "High":
                priorityColor = "#314B70";
                break;
            case "Low":
                priorityColor = "#e6d268";
                break;
            case "Medium":
                priorityColor = "#b2e2f8";
                break;
            default:

        }
        objPriorityData[i] = { 'label': title, 'value': value, 'color': priorityColor };
    }

    if (objPriorityData.length > 0) {
        var priorityWisePieChart = new d3pie("velocityGraph", {
            "header": {
                "title": {
                    "text": "",
                    "fontSize": 24,
                    "font": "OpenSans"
                },
                "subtitle": {
                    "text": "",
                    "color": "#999999",
                    "fontSize": 12,
                    "font": "OpenSans"
                },
                "titleSubtitlePadding": 9
            },
            "footer": {
                "color": "#999999",
                "fontSize": 10,
                "font": "OpenSans",
                "location": "bottom-left"
            },
            "size": {
                "canvasWidth": 400,
                "pieOuterRadius": "68%"
            },
            "data": {
                "sortOrder": "value-desc",
                "content": objPriorityData
            },
            "labels": {
                "outer": {
                    "pieDistance": 15
                },
                "inner": {
                    "format": "value",
                    "hideWhenLessThanPercentage": 0
                },
                "mainLabel": {
                    "fontSize": 12
                },
                "percentage": {
                    "color": "#ffffff",
                    "decimalPlaces": 0
                },
                "value": {
                    "color": "#fff",
                    "fontSize": 14
                },
                "lines": {
                    "enabled": true
                },
                "truncation": {
                    "enabled": true
                }
            },
            "effects": {
                "pullOutSegmentOnClick": {
                    "effect": "linear",
                    "speed": 400,
                    "size": 8
                }
            },
            "misc": {
                "gradient": {
                    "enabled": true,
                    "percentage": 100
                }
            }
        });
    }
    //}
    //else {
    //    $("#velocityGraph").html("<span>No data exists for selected sprint.</span>");
    //}
}
function initBurnDown(data) {
    console.log("DATA:"+data);
    var objRemainingHourData = data.lstRemainingHour;
    var sprintStartDate = new Date(parseJsonDate(data.SprintStartDate));
    var sprintEndDate = new Date(parseJsonDate(data.SprintDueDate));
    var totalSprintHours = data.TotalSprintHours;
    //totalSprintHours = totalSprintHours; //getNumber(parseInt(totalSprintHours));
    var sprintDuration = data.SprintDuration;
    //sprintDuration = 8;// sprintDuration;//getNumber(parseInt(sprintDuration));

    var arrRemainingHourData = [];
    var index = 0;
    //var hour = totalSprintHours;
    //console.log(objRemainingHourData.length);   

    if (objRemainingHourData.length > 0) {
        for (var i = 0; i < objRemainingHourData.length ; i++) {
            //var title = new Date(objRemainingHourData[i].BurnDate);
            var value = objRemainingHourData[i].SprintRemainingHour;           
            var index = objRemainingHourData[i].Index;
            
            arrRemainingHourData.push({ x: index, y: value });
        }
        //console.log(objRemainingHourData[objRemainingHourData.length - 1].SprintRemainingHour);
        if (objRemainingHourData[objRemainingHourData.length - 1].SprintRemainingHour == 0)
            setTimeout(function () {
                $(".actual").attr('stlye', 'stroke:#91e500');
            }, 500);
        else {
            setTimeout(function () {
                $(".actual").attr('style', 'stroke:#ff0000');
            },500);
        }
    }
    else {
        arrRemainingHourData.push({ x: 0, y: totalSprintHours });
        arrRemainingHourData.push({ x: sprintDuration, y: 0 });
    }
    //console.log(arrRemainingHourData);
    //arrRemainingHourData.push({ x: 0, y: totalSprintHours });
    //arrRemainingHourData.push({ x: sprintDuration, y: 0 });
    console.log(objRemainingHourData.length);
    $(function () {
        displayBurnDown(arrRemainingHourData, sprintDuration, totalSprintHours);
    });

    

}
function BindEvent() {
    $("#ddlSprint").bind('change');
    $("#ddlReport").bind('change');
}
function getNumber(hrs) {
    var val = hrs;
    if ((val % 10) > 0) {
        var temp = val % 10;
        temp = 10 - temp;
        temp = parseInt(val) + parseInt(temp);
        val = temp;
    }
    return val;
}
function displayBurnDown(arrRemainingHourData,maxx,maxy) {
    $("#visualisation").empty();
    $(".chart").show();
    //console.log($(window).width() - 40);
    var lineDataActual = arrRemainingHourData;
    //console.log(lineDataActual);
    var svg = d3.select("#visualisation"),
        width = $(window).width() - 40,
        height = 400,
        margins = {
            top: 80,
            right: 80,
            bottom: 80,
            left: 80
        },
        //xMin = d3.min(lineDataActual, function (d) {
        //    return d.x;
        //}),
        //xMax = d3.max(lineDataActual, function (d) {
        //    return d.x;
        //}),
        //yMin = d3.min(lineDataActual, function (d) {
        //    return d.y;
        //}),
        //yMax = d3.max(lineDataActual, function (d) {
        //    return d.y;
        //}),

         xMin = d3.min(lineDataActual, function (d) {
             return 0;
         }),
        xMax = d3.max(lineDataActual, function (d) {
            return maxx;
        }),
        yMin = d3.min(lineDataActual, function (d) {
            return 0;
        }),
        yMax = d3.max(lineDataActual, function (d) {
            return maxy;
        }),

    xRange = d3.scale.linear().range([margins.left, width - margins.right]).domain([

        xMin, xMax
    ]),

    yRange = d3.scale.linear().range([height - margins.top, margins.bottom]).domain([

        yMin, yMax
    ]),

    xAxis = d3.svg.axis()
        .scale(xRange)
        .tickSubdivide(true),

    yAxis = d3.svg.axis()
        .scale(yRange)
        .orient("left")
        .tickSubdivide(true);

    function make_x_axis() {
        return d3.svg.axis()
            .scale(xRange)
             .orient("bottom")
            .tickSubdivide(true);
    }

    function make_y_axis() {
        return d3.svg.axis()
            .scale(yRange)
            .orient("left")
            .tickSubdivide(true);
    }


    svg.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + (height - margins.top) + ")")
        .call(make_x_axis()
            .tickSize((-height) + (margins.top + margins.bottom), 0, 0)
            .tickFormat("")
        );
    svg.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(" + (margins.left) + ",0)")
        .call(make_y_axis()
            .tickSize((-width) + (margins.right + margins.left), 0, 0)
            .tickFormat("")
        );
    svg.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height - (margins.bottom)) + ")")
        .call(xAxis);

    svg.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (margins.left) + ",0)")
        .call(yAxis);



    var lineFunc = d3.svg.line()
        .x(function (d) {
            return xRange(d.x);
        })
        .y(function (d) {
            return yRange(d.y);
        })
        .interpolate('basis');


    var lineDataIdeal = [{
        'x': xMin,
        'y': yMax
    }, {
        'x': xMax,
        'y': yMin
    }];


    svg.append("svg:path")
        .attr("d", lineFunc(lineDataIdeal))
        .attr("class", "ideal");

    svg.append("svg:path")
        .attr("d", lineFunc(lineDataActual))
        .attr("class", "actual");

    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", "550")
        .attr("y", "360")
        .text("Days");

    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 30)
        .attr("dy", ".75em")
        .attr("x", "-150")
        .attr("transform", "rotate(-90)")
        .text("Hours Remaining");
}
function parseJsonDate(jsonDateString) {
    return new Date(parseInt(jsonDateString.replace('/Date(', '')));
}

function intializeCumulativeChart(result) {
    var csvData = "key,value,orgvalue,date,title\n";
    var width = 1280;
    var periodValue = $("#ddlMonth").val();
    if (periodValue == 4)
        width = 1480;
    if (periodValue == 6)
        width = 5000;
    if (periodValue == 12)
        width = 9000;
    if (periodValue == 0)
        width = 10000;
    if (result.length > 0) {
       
        for (var i = 0; i < result.length ; i++) {
            //console.log(result[i].TempTotalTasks);
            csvData += result[i].TaskStatusId + "," + result[i].TotalTasks + "," + result[i].TempTotalTasks + "," + result[i].WorkDate + "," + result[i].Title + "\n";
        }
    }
    console.log(csvData);
    var format = d3.time.format("%m/%d/%y");

    var margin = { top: 20, right: 30, bottom: 30, left: 40 },
        width = width - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var z = d3.scale.category20c();

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(d3.time.days);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var stack = d3.layout.stack()
        .offset("zero")
        .values(function (d) { return d.values; })
        .x(function (d) { return d.date; })
        .y(function (d) { return d.value; });

    var nest = d3.nest()
        .key(function (d) { return d.key; });

    var area = d3.svg.area()
        .interpolate("linear")
        .x(function (d) { return x(d.date); })
        .y0(function (d) { return y(d.y0); })
        .y1(function (d) { return y(d.y0 + d.y); });
    $("#velocityGraph").empty();
    var chart = d3.select("#velocityGraph").append("svg");
    var svg = chart
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var data = d3.csv.parse(csvData);

    data.forEach(function (d) {
        d.date = format.parse(d.date);
        d.value = +d.value;
    });

    //console.log(data);
    var layers = stack(nest.entries(data));
    x.domain(d3.extent(data, function (d) { return d.date; }));

    y.domain([0, d3.max(data, function (d) { return d.y0 + d.y; })]);

    var div = d3.select(".tooltip")
        .attr("class", "tooltip")
        .style("opacity", 1e-6);

    var dataPoints = {};

    //lines
    svg.selectAll(".layer")
      .data(layers)
      .enter().append("path")
      .attr("class", "layer")
      .attr("d", function (d) { return area(d.values); })
      .style("fill", function (d, i) { return z(i); });

   

    //points
    var points = svg.selectAll('.dots')
        .data(layers)
        .enter()
        .append("g")
        .attr("class", "dots")
        .attr("d", function (d) { return area(d.values); })
        .attr("clip-path", "url(#clip)");

    points.selectAll('.dot')
        .data(function (d, index) {
            var a = [];
            d.values.forEach(function (point, i) {
                a.push({ 'index': index, 'point': point });
            });
            return a;
        })
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr("r", 2.5)
        .attr('fill', function (d, i) {
            //return '#abc';
        })
        .attr("transform", function (d) {
            var key = x(d.point.date);
            dataPoints[key] = dataPoints[key] || [];
            dataPoints[key].push(d);
            return "translate(" + x(d.point.date) + "," + y(d.point.y + d.point.y0) + ")";
        }
    );
    var legend = svg.selectAll(".legend")
        .data(z.domain().slice().reverse())
        .enter().append("svg")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", margin.left - 30)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", z);

    legend.append("text")
        .attr("x", margin.left)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function (d) {
            var keyData = dataPoints[0];
            //console.log(keyData[d].point.key);
            return keyData[d].point.title;
        });
        //.text(function (d, i) {
        //    var dps = dataPoints[i];
        //    if (dps != undefined) {                
        //        for (var i = 0; i < dps.length ; i++) {                    
        //            return dps[i].point.key;
        //        }
        //    }
        //});

    //vertical line
    var vertline = svg.append('line')
      .attr('class', 'vertline')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', 0)
      .attr('y2', height)
      .attr('stroke', 'rgba(100,150,200,0.8)')
      .attr('stroke-width', 1);

    //points.on('mousemove', function () {
    //    mouseX = d3.event.pageX - margin.left;
       
    //    var keys = _.keys(dataPoints).sort();
        
    //    var epsilon = (keys[1] - keys[0]) / 2;
    //    var nearest = _.find(keys, function (a) {            
    //        return Math.abs(a - mouseX) <= epsilon
    //    });
    //    if (nearest) {
    //        var dps = dataPoints[nearest];
           
    //        vertline.attr('x1', nearest)
    //                .attr('x2', nearest)
    //        div.transition()
    //          .duration(500)
    //          .text(_.collect(dps, function (dp) {
    //              return dp.point.orgvalue;
    //          }).join(','))
    //          .style("opacity", 1)
    //          .style("left", (d3.event.pageX - (margin.left * 2)) + "px")
    //          .style("top", (d3.event.pageY) - 30 + "px");
    //    }
    //});
    $('svg circle').mousemove(function (event) {
        var d = this.__data__, c = z(d.point.key);
        //console.log(data.find(d.point.date));
        //var dps = dataPoints[c];
        var text = "";
        var selDate = new Date(d.point.date);
        selDate.setHours(0);
        selDate.setMinutes(0);
        selDate.setSeconds(0);
        var tooltipText = "";
        data.forEach(function (dp) {
            //console.log(dp.date);
            //console.log(selDate);
            var isCompare = compareDates(dp.date, selDate);
            if (isCompare == 0)
                tooltipText += dp.orgvalue + ",";
        });
        div.transition()
            .duration(500)
            .text(tooltipText.substr(0, tooltipText.length - 1))
            .style("opacity", 1)
            .style("left", (event.pageX - (margin.left * 2)) + "px")
            .style("top", (event.pageY) - 30 + "px");;
    });
    
    $('svg circle').mouseout(function (d) {
        div.transition()
        .duration(500)
        .style("opacity", 0);
    });
    //axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
    

}
function compareDates(d1, d2) {
    var isoDate1 = d1.toISOString().substr(0, 10)
      , isoDate2 = d2.toISOString().substr(0, 10);
    return isoDate1.localeCompare(isoDate2);
}
function initializeVarianceChart(objData) {
    BindEvent();
    $("#velocityGraph").empty();
    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = 900 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .2);

    var x1 = d3.scale.ordinal();

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.ordinal()
        .range(["#0000ff", "#0000ff", "#7b6888", "#6b486b", "#ff0000", "#ff0000", "#ff8c00"]);

    var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

    var svg = d3.select("#velocityGraph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //svg.data(objPriorityChartData);

    var ageNames = d3.keys(objData[0]).filter(function (key) { return key !== "Title"; });

    objData.forEach(function (d) {
        d.ages = ageNames.map(function (name) { return { name: name, value: +d[name] }; });
    });

    x0.domain(objData.map(function (d) { return d.Title; }));
    x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
    y.domain(d3.extent(objData, function (d) { return d.Value; })).nice();

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Hours");

    var state = svg.selectAll(".Title")
        .data(objData)
      .enter().append("g")
        .attr("class", "g")
        .attr("transform", function (d) { return "translate(" + x0(d.Title) + ",0)"; });

    state.selectAll("rect")
        .data(function (d) { return d.ages; })
        .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function (d) { return x1(d.name); })
        .attr("y", function (d) { return y(d.value); })
        .attr("height", function (d) { return height - y(d.value); })
        .style("fill", function (d) { return color(d.name); });

    var legend = svg.selectAll(".legend")
        .data(ageNames.slice().reverse())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function (d) { return d; });
}
function SprintChange() {   
    var sprintId = $("#ddlSprint").val();
    var reportType = $("#ddlReport").val();
    var objPriorityData = [];
    if (reportType == 2) {
        if (sprintId != null) {
            //$('#uprgsMaster').css('visibility', 'visible');
            $.ajax({
                type: "POST",
                url: urlGetBurnDownData,
                data: '{ "ProjectId":' + ProjectId + ',"SprintId":' + sprintId + '}',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    //$('#uprgsMaster').css('visibility', 'hidden');
                    if (data.IsEmpty) {
                        $("#velocityGraph").html("<span>No data exists for selected sprint.</span>");
                    }
                    else {
                        objPriorityData = JSON.parse(data.result);
                        initBurnDown(objPriorityData);
                    }
                },
                error: function (response) {
                    //alert(response.responseText);
                }
            });
        }
    }
    else if (reportType == 3) {
        sprintId = $("#ddlPrioritySprint").val();
        $(".chart").hide();
       // $('#uprgsMaster').css('visibility', 'visible');
        $.ajax({
            type: "POST",
            url: urlPriorityData,
            data: '{ "ProjectId":' + ProjectId + ',"SprintId":' + sprintId + '}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                //$('#uprgsMaster').css('visibility', 'hidden');
                if (data.IsEmpty) {
                    $("#velocityGraph").html("<span>No data exists for selected sprint.</span>");
                }
                else {
                    objPriorityData = JSON.parse(data.result);
                    initializePriorityChart(objPriorityData);
                }                
            },
            error: function (response) {
                alert(response.responseText);
            }
        });
    }
    else if (reportType == 5) {
        //$('#uprgsMaster').css('visibility', 'visible');
        $.ajax({
            type: "POST",
            url: urlGetVarianceDate,
            data: '{ "ProjectId":' + ProjectId + ',"IterationId":' + sprintId + '}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                //$('#uprgsMaster').css('visibility', 'hidden');
                if (data.IsEmpty) {
                    $("#velocityGraph").html("<span>No data exists for selected sprint.</span>");
                }
                else {
                    objPriorityData = JSON.parse(data.result);
                    setVarianceChart(objPriorityData);
                }
            },
            error: function (response) {
                alert(response.responseText);
            }
        });
    }
    
}
function setVarianceChart(result) {
    //var data = [['Planned Days',13],['Actual Days',12],['Planned Effort',6],['Actual Effort',0],['Schedule Variance',0],['Effort Variance',-100]];
    var data = [];
    if (result.length > 0) {        
        for (var i = 0; i < result.length ; i++) {
            var innerdata = [];
            innerdata.push(result[i].Title, result[i].Value);
            data.push(innerdata);
        }
    }
    //data += ']';    
    console.log(data);
   
    setTimeout(function () {
        d3.select("#velocityGraph")
        .datum(data)
        .call(columnChart()
        .width(960)
        .height(500)
        .x(function (d, i) { return d[0]; })
        .y(function (d, i) { return d[1]; }));
    }, 1000);
}
function columnChart() {
    var margin = { top: 30, right: 10, bottom: 50, left: 50 },
     width = 420,
     height = 420,
     xRoundBands = 0.2,
     xValue = function (d) { return d[0]; },
     yValue = function (d) { return d[1]; },
     xScale = d3.scale.ordinal(),
     yScale = d3.scale.linear(),
     yAxis = d3.svg.axis().scale(yScale).orient("left"),
     xAxis = d3.svg.axis().scale(xScale);


    function chart(selection) {
        selection.each(function (data) {

            // Convert data to standard representation greedily;
            // this is needed for nondeterministic accessors.
            data = data.map(function (d, i) {
                return [xValue.call(data, d, i), yValue.call(data, d, i)];
            });

            // Update the x-scale.
            xScale
                .domain(data.map(function (d) { return d[0]; }))
                .rangeRoundBands([0, width - margin.left - margin.right], xRoundBands);


            // Update the y-scale.
            yScale
                .domain(d3.extent(data.map(function (d) { return d[1]; })))
                .range([height - margin.top - margin.bottom, 0])
                .nice();


            // Select the svg element, if it exists.
            var svg = d3.select(this).selectAll("svg").data([data]);

            // Otherwise, create the skeletal chart.
            var gEnter = svg.enter().append("svg").append("g");
            gEnter.append("g").attr("class", "bars");
            gEnter.append("g").attr("class", "y axis");
            gEnter.append("g").attr("class", "x axis");
            gEnter.append("g").attr("class", "x axis zero");

            // Update the outer dimensions.
            svg.attr("width", width)
                .attr("height", height);

            // Update the inner dimensions.
            var g = svg.select("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // Update the bars.
            var bar = svg.select(".bars").selectAll(".bar").data(data);
            bar.enter().append("rect");
            bar.exit().remove();
            bar.attr("class", function (d, i) { return d[1] < 0 ? "bar negative" : "bar positive"; })
                .attr("x", function (d) { return X(d); })
                .attr("y", function (d, i) { return d[1] < 0 ? Y0() : Y(d); })
                .attr("width", xScale.rangeBand())
                .attr("height", function (d, i) { return Math.abs(Y(d) - Y0()); });

            // x axis at the bottom of the chart
            g.select(".x.axis")
               .attr("transform", "translate(0," + (height - margin.top - margin.bottom) + ")")
               .call(xAxis.orient("bottom"));

            // zero line
            g.select(".x.axis.zero")
               .attr("transform", "translate(0," + Y0() + ")")
               .call(xAxis.tickFormat("").tickSize(0));


            // Update the y-axis.
            g.select(".y.axis")
              .call(yAxis);

        });
    }


    // The x-accessor for the path generator; xScale ∘ xValue.
    function X(d) {
        return xScale(d[0]);
    }

    function Y0() {
        return yScale(0);
    }

    // The x-accessor for the path generator; yScale ∘ yValue.
    function Y(d) {
        return yScale(d[1]);
    }

    chart.margin = function (_) {
        if (!arguments.length) return margin;
        margin = _;
        return chart;
    };

    chart.width = function (_) {
        if (!arguments.length) return width;
        width = _;
        return chart;
    };

    chart.height = function (_) {
        if (!arguments.length) return height;
        height = _;
        return chart;
    };

    chart.x = function (_) {
        if (!arguments.length) return xValue;
        xValue = _;
        return chart;
    };

    chart.y = function (_) {
        if (!arguments.length) return yValue;
        yValue = _;
        return chart;
    };

    return chart;
}

