var swirlData = {
    labels: [ "May-15", "Jun-15", "Jul-15", "Aug-15", "Sep-15", "Oct-15", "Nov-15", "Dec-15", "Jan-16", "Feb-16", "Mar-16","Apr-16"],
    datasets: [{
        label: "Monthly resignees",

        fillColor: "rgba(247, 70, 74,0.2)",
        strokeColor: "rgba(247, 70, 74,1)",
        pointColor: "rgba(247, 70, 74,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [6, 2, 10, 5, 1, 4, 8, 3, 7, 12, 14, 12]
    }, {
        label: "Monthly joinees",
        fillColor: "rgba(43, 180, 232,0.2)",
        strokeColor: "rgba(43, 180, 232,1)",
        pointColor: "rgba(43, 180, 232,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [2, 8, 9, 10, 12, 6, 2, 4, 8, 3, 9, 1]
    }]
};
var timesheetData = {
    labels: ["Apr-25", "Apr-26", "Apr-27", "Apr-28", "Apr-29", "Apr-30", "May-01", "May-02", "May-03", "May-04", "May-05", "May-06",],
    datasets: [{
        label: "Office hours",

        fillColor: "rgba(247, 70, 74,0.2)",
        strokeColor: "rgba(247, 70, 74,1)",
        pointColor: "rgba(247, 70, 74,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [1, 2, 3, 5, 6, 7, 8, 6, 7, 9, 10, 9]
    }, {
        label: "Timesheet hours",
        fillColor: "rgba(43, 180, 232,0.2)",
        strokeColor: "rgba(43, 180, 232,1)",
        pointColor: "rgba(43, 180, 232,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [2, 8, 9, 1, 10, 6, 2, 5, 8, 3, 9, 1]
    }]
};
var Attrichartdata = {
    labels: ["May-15", "Jun-15", "Jul-15", "Aug-15", "Sep-15", "Oct-15", "Nov-15", "Dec-15", "Jan-16", "Feb-16", "Mar-16","Apr-16"],
    datasets: [ {
        label: "Monthly joinees",
        fillColor: "rgba(43, 180, 232,0)",
        strokeColor: "rgba(43, 180, 232,1)",
        pointColor: "rgba(43, 180, 232,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [2, 8, 9, 10, 12, 6, 2, 4, 8, 3, 9, 1]
    }]
};

var swirlData2 = {
    labels: ["E1", "E2", "E3", "E4"],
    datasets: [{
        label: "April 2015",
        fillColor: "rgba(247, 70, 74,0.2)",
        strokeColor: "rgba(247, 70, 74,1)",
        pointColor: "rgba(247, 70, 74,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [0.5, -2.5, 0.5, 2]
    }, {
        label: "May 2015",
        fillColor: "rgba(43, 180, 232,0.2)",
        strokeColor: "rgba(43, 180, 232,1)",
        pointColor: "rgba(43, 180, 232,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [-2.5, 0, -0.5, 0.5]
    }, {
        label: "June 2015",
        fillColor: "rgba(70, 137, 102,0.2)",
        strokeColor: "rgba(70, 137, 102,1)",
        pointColor: "rgba(70, 137, 102,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(70, 137, 102,1)",
        data: [2, 2, 1.5, 0]
    }]
};

var doughnutDatatraining1 = [{
    value: 200,
    color: "#F7464A",
    highlight: "#1E1E20",
    label: "Category1"
}, {
    value: 150,
    color: "#46BFBD",
    highlight: "#1E1E20",
    label: "Category2"
}, {
    value: 175,
    color: "#FDB45C",
    highlight: "#1E1E20",
    label: "Category3"
}, {
    value: 120,
    color: "#468966",
    highlight: "#1E1E20",
    label: "Category4"
}, {
    value: 135,
    color: "#348899",
    highlight: "#1E1E20",
    label: "Category5"
}]

var doughnutData1 = [{
    value: 200,
    color: "#F7464A",
    highlight: "#1E1E20",
    label: "Dot Net"
}, {
    value: 150,
    color: "#46BFBD",
    highlight: "#1E1E20",
    label: "PHP"
}, {
    value: 175,
    color: "#FDB45C",
    highlight: "#1E1E20",
    label: "Graphics"
}, {
    value: 120,
    color: "#468966",
    highlight: "#1E1E20",
    label: "Analysis"
}, {
    value: 80,
    color: "#348899",
    highlight: "#1E1E20",
    label: "Marketing"
}, {
    value: 100,
    color: "#332532",
    highlight: "#1E1E20",
    label: "Sales"
}, ]

var deapartheaddata = [{
    value: 180,
    color: "#188ae2",
    highlight: "#1E1E20",
    label: "Microsoft"
}, {
    value: 28,
    color: "#10c469",
    highlight: "#1E1E20",
    label: "Mobile Development"
}, {
    value: 49,
    color: "#f9c851",
    highlight: "#1E1E20",
    label: "QA"
}, {
    value: 24,
    color: "#ff8acc",
    highlight: "#1E1E20",
    label: "QISMS"
}, {
    value: 14,
    color: "#5b69bc",
    highlight: "#1E1E20",
    label: "SEO"
}, {
    value: 15,
    color: "#e84e40",
    highlight: "#1E1E20",
    label: "Sales"
},{
    value: 6,
    color: "#fa49d2",
    highlight: "#1E1E20",
    label: "Sharepoint"
}, {
    value: 70,
    color: "#3babda",
    highlight: "#1E1E20",
    label: "Java"
}, {
    value: 35,
    color: "#f1f83c",
    highlight: "#1E1E20",
    label: "Graphics"
}, {
    value: 10,
    color: "#f8a63c",
    highlight: "#1E1E20",
    label: "Analysis"
}, {
    value: 6,
    color: "#773703",
    highlight: "#1E1E20",
    label: "CRM"
}, {
    value: 100,
    color: "#aef9cf",
    highlight: "#1E1E20",
    label: "BPO"
}, ]

var locheaddata = [{
    value: 137,
    color: "#ff8acc",
    highlight: "#1E1E20",
    label: "Manikyam"
}, {
    value: 120,
    color: "#5b69bc",
    highlight: "#1E1E20",
    label: "Prerna"
}, {
    value: 80,
    color: "#10c469",
    highlight: "#1E1E20",
    label: "Aditya"
}, {
    value: 200,
    color: "#35b8e0",
    highlight: "#1E1E20",
    label: "Corporate House"
},{
    value: 200,
    color: "#ff8acc",
    highlight: "#1E1E20",
    label: "Manikyam"
}, {
    value: 150,
    color: "#5b69bc",
    highlight: "#1E1E20",
    label: "Prerna"
}, {
    value: 175,
    color: "#10c469",
    highlight: "#1E1E20",
    label: "Aditya"
}, {
    value: 120,
    color: "#35b8e0",
    highlight: "#1E1E20",
    label: "Corporate House"
}, ]


var deapartheaddata_emp = [{
    value: 200,
    color: "#188ae2",
    highlight: "#1E1E20",
    label: "Project 1"
}, {
    value: 175,
    color: "#f9c851",
    highlight: "#1E1E20",
    label: "Project 2"
}, {
    value: 120,
    color: "#ff8acc",
    highlight: "#1E1E20",
    label: "Internal Project"
}, {
    value: 150,
    color: "#10c469",
    highlight: "#1E1E20",
    label: "HR"
}, ]

var locheaddata = [{
    value: 137,
    color: "#ff8acc",
    highlight: "#1E1E20",
    label: "Manikyam"
}, {
    value: 120,
    color: "#5b69bc",
    highlight: "#1E1E20",
    label: "Prerna"
}, {
    value: 80,
    color: "#10c469",
    highlight: "#1E1E20",
    label: "Aditya"
}, {
    value: 200,
    color: "#35b8e0",
    highlight: "#1E1E20",
    label: "Corporate House"
}, ]



var doughnutData2 = [{
    value: 200,
    color: "#F7464A",
    highlight: "#1E1E20",
    label: "Manikyam"
}, {
    value: 150,
    color: "#46BFBD",
    highlight: "#1E1E20",
    label: "Prerna"
}, {
    value: 175,
    color: "#FDB45C",
    highlight: "#1E1E20",
    label: "Aditya"
}, {
    value: 120,
    color: "#468966",
    highlight: "#1E1E20",
    label: "Corporate House"
}, ]

var doughnutData3 = [{
    value: 200,
    color: "#F7464A",
    highlight: "#1E1E20",
    label: "Option 1"
}, {
    value: 150,
    color: "#46BFBD",
    highlight: "#1E1E20",
    label: "Option 2"
}, {
    value: 175,
    color: "#FDB45C",
    highlight: "#1E1E20",
    label: "Option 3"
}, ]


var doughnutData4 = [{
    value: 200,
    color: "#F7464A",
    highlight: "#1E1E20",
    label: "Directors"
}, {
    value: 150,
    color: "#46BFBD",
    highlight: "#1E1E20",
    label: "Managers"
}, {
    value: 175,
    color: "#FDB45C",
    highlight: "#1E1E20",
    label: "Leads"
}, {
    value: 120,
    color: "#468966",
    highlight: "#1E1E20",
    label: "Developers"
}, {
    value: 80,
    color: "#348899",
    highlight: "#1E1E20",
    label: "Sr. Developers"
}, ]



var barChartData = {
    labels: ["Apr-15", "May-15", "Jun-15", "Jul-15", "Aug-15", "Sep-15", "Oct-15", "Nov-15"],
    datasets: [{
        label: "Monthly headcount",
        fillColor: "rgba(198,99,72,0.6)",
        strokeColor: "rgba(198,99,72,1)",
        highlightFill: "rgba(198,99,72,0.75)",
        highlightStroke: "rgba(198,99,72,1)",
        data: [450, 475, 480, 470, 510, 450, 460, 500]
    }, ]
}

var barChartDatadash = {
    labels: ["Apr-15", "May-15", "Jun-15", "Jul-15", "Aug-15", "Sep-15", "Oct-15", "Nov-15", "Dec-15", "Jan-15", "Feb-15", "Mar-15"],
    datasets: [{
        label: "Monthly headcount",
        fillColor: "rgba(255,255,255,1)",
        strokeColor: "rgba(255,255,255,1)",
        highlightFill: "rgba(255,255,255,1)",
        highlightStroke: "rgba(255,255,255,1)",
        data: [450, 475, 480, 470, 510, 450, 460, 500, 450, 525, 530, 550]
    }, ]
}

var barChartDatastacked = {
    labels: ["21-30 Years", "31-40 Years", "41-50 Years", "51-60 Years", "61-70 Years", "71-80 Years", "81-90 Years"],
    datasets: [{
        label: "Male",
        fillColor: "rgba(31, 158, 152,0.6)",
        strokeColor: "rgba(31, 158, 152,1)",
        highlightFill: "rgba(31, 158, 152,0.75)",
        highlightStroke: "rgba(31, 158, 152,1)",
        data: [100, 80, 85, 40, 0, 0, 0]
    }, {
        label: "Female",
        fillColor: "rgba(198,99,72,0.6)",
        strokeColor: "rgba(198,99,72,1)",
        highlightFill: "rgba(198,99,72,0.75)",
        highlightStroke: "rgba(198,99,72,1)",
        data: [60, 30, 10, 5, 0, 0, 0]
    }, ]
}

var barChartDatahori = {
    labels: ["Training Imparted", "      Avg training effectiveness(%)", "Attendance(%)"],
    datasets: [{
            label: "Target",
            fillColor: "rgba(43, 180, 232,0.6)",
            strokeColor: "rgba(43, 180, 232,1)",
            highlightFill: "rgba(43, 180, 232,0.75)",
            highlightStroke: "rgba(43, 180, 232,1)",
            data: [20, 25, 30]
        }, {
            label: "Actual",
            fillColor: "rgba(247,70,74,0.6)",
            strokeColor: "rgba(247,70,74,1)",
            highlightFill: "rgba(247,70,74,0.75)",
            highlightStroke: "rgba(247,70,74,1)",
            data: [30, 20, 25]
        }

    ]
}

var barChartDatahoritraining1 = {
    labels: ["   Category1", "Category2", "Category3", "Category4"],
    datasets: [{
            label: "Target",
            fillColor: "rgba(198,99,72,0.6)",
            strokeColor: "rgba(198,99,72,1)",
            highlightFill: "rgba(198,99,72,0.75)",
            highlightStroke: "rgba(198,99,72,1)",
            data: [20, 25, 30, 15]
        }

    ]
}

var dData = function() {
    return Math.round(Math.random() * 90) + 10
};
var barChartDataleave = {
    labels: ["Apr-15", "May-15", "Jun-15", "Jul-15", "Aug-15", "Sep-15", "Oct-15", "Nov-15", "Dec-15", "Jan-15", "Feb-15", "Mar-15"],
    datasets: [{
        label: "Total Leave Days",
        fillColor: "rgba(31, 158, 152,0.6)",
        strokeColor: "rgba(31, 158, 152,1)",
        highlightFill: "rgba(31, 158, 152,0.75)",
        highlightStroke: "rgba(31, 158, 152,1)",
        data: [dData(), dData(), dData(), dData(), dData(), dData(), dData(), dData(), dData(), dData(), dData(), dData()]
    }, ]
}
