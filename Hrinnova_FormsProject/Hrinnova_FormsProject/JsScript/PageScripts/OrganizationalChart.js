
google.charts.load('current', {
    packages: ["table", "orgchart"]
});
google.setOnLoadCallback(drawchart);

// This is for MyChart
function drawchart() {
    $.ajax({
        type: "POST",
        url: "/Report/GetLoggedInEmployeeData",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        async:false,
        dataType: "json",
        success: OnSuccess_getLoggedInEmployeeData,
        error: OnErrorCall_getLoggedInEmployeeData
    });

    $.ajax({
        type: "POST",
        url: "/Report/GetLoggedInEmployeeOrgData",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess_getSubordinateOrgData,
        error: OnErrorCall_getSubordinateOrgData
    });
    
}

// This are common functions which are used to create myorgchart as well as searched employee chart
//-------------------Starts-------------------

function OnSuccess_getLoggedInEmployeeData(repo) {

    var dataParent = new google.visualization.DataTable(repo);
    dataParent.addColumn('string', 'Name');
    dataParent.addColumn('string', 'Manager');
    dataParent.addColumn('string', 'ToolTip');

    var dataCurrent = new google.visualization.DataTable(repo);
    dataCurrent.addColumn('string', 'Name');
    dataCurrent.addColumn('string', 'Manager');
    dataCurrent.addColumn('string', 'ToolTip');

    var response = repo;
    var PMID = "";

    var EmpName = response.FirstName + " " + response.LastName;
    var EmpID = response.EmpID.toString();
    if (response.PMID != null) {
        PMID = response.PMID.toString();
    }

    var RoleName = response.RoleName;
    var Email = response.Email;
    var EmployeePhoto = response.EmployeePhoto;
    var PMPhoto = response.PMPhoto;

    dataParent.addRows([
        [{
            v: 'parent_node',
            f: '<div onclick="showEmployeeDetails(' + PMID + ')" class="node-img-ring"><div class="node-img node-img-lead cursor-pointer" style="background: url(' + PMPhoto + ') center top no-repeat;background-size: cover;"></div></div> '
        }, '', '']
    ]);

    dataCurrent.addRows([
        [{
            v: 'current_node',
            f: '<div class="tree-node-wrap lead"><table class="node-table"><tbody><tr><td class="node-img-wrap"><div onclick="showEmployeeDetails(' + EmpID + ')" class="node-img-ring"><div class="node-img" style="background: url(' + EmployeePhoto + ') center top no-repeat;background-size: cover;"></div></div> </td></tr><tr><td class="node-info-wrap"><table style=""><tbody><tr><td class="node-name"><div class="title">' + EmpName + '</div><div class="detail">' + RoleName + '</div><div class="email"><a href="mailto:"' + Email + '" title="">' + Email + '</a></div></td></tr></tbody></table></td></tr></tbody></table></div>'
        }, '', RoleName]
    ]);

    var chart0 = new google.visualization.OrgChart(document.getElementById('chart_div_0'));
    chart0.draw(dataParent, { allowHtml: true, allowCollapse: true });

    var chart1 = new google.visualization.OrgChart(document.getElementById('chart_div_1'));
    chart1.draw(dataCurrent, { allowHtml: true, allowCollapse: true });
}

function OnErrorCall_getLoggedInEmployeeData() {
    console.log("Whoops something went wrong :( ");
}

function OnSuccess_getSubordinateOrgData(result) {

    var data = new google.visualization.DataTable(result);
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Manager');
    data.addColumn('string', 'ToolTip');

    var response = result;

    console.log(response.length);

    if (response.length > 0) {
        for (var i = 0; i < response.length; i++) {
            var row = new Array();
            var EmpName = response[i].FirstName + " " + response[i].LastName;
            var EmpID = response[i].EmpID.toString();
            var PMID = response[i].PMID.toString();
            var RoleName = response[i].RoleName;
            var Email = response[i].Email;
            var EmployeePhoto = response[i].EmployeePhoto;
            var SubordinateCount = response[i].SubordinateCount;

            if (SubordinateCount > 0) {
                data.addRows([[{
                    v: EmpID,
                    f: '<div class="tree-node-wrap"><table class="node-table"><tbody><tr><td class="node-img-wrap"><div class="node-img-ring"><div onclick="showEmployeeDetails(' + EmpID + ')" class="node-img" style="background: url(' + EmployeePhoto + ') center top no-repeat;background-size: cover;"></div><i class="has_child_node" title="Has child">' + SubordinateCount + '</i></div> </td></tr><tr><td class="node-info-wrap"><table style=""><tbody><tr><td class="node-name"><div class="title">' + EmpName + '</div><div class="detail">' + RoleName + '</div></td></tr></tbody></table></td></tr></tbody></table></div>'
                }, PMID, RoleName]]);
            }
            else {
                data.addRows([[{
                    v: EmpID,
                    f: '<div class="tree-node-wrap"><table class="node-table"><tbody><tr><td class="node-img-wrap"><div class="node-img-ring"><div onclick="showEmployeeDetails(' + EmpID + ')" class="node-img" style="background: url(' + EmployeePhoto + ') center top no-repeat;background-size: cover;"></div></div> </td></tr><tr><td class="node-info-wrap"><table style=""><tbody><tr><td class="node-name"><div class="title">' + EmpName + '</div><div class="detail">' + RoleName + '</div></td></tr></tbody></table></td></tr></tbody></table></div>'
                }, PMID, RoleName]]);
            }
        }

        var chart2 = new google.visualization.OrgChart(document.getElementById('chart_div_2'));
        chart2.draw(data, { allowHtml: true, allowCollapse: true });
    }
    else
    {
        $("#chart_div_2_wrapper").remove();
    }
}

function OnErrorCall_getSubordinateOrgData() {
    console.log("Whoops something went wrong :( ");
}

//-------------------Ends-------------------

// This are common functions which are used to create orgchart as well as filtered chart
//-------------------Starts-------------------

function OnSuccess_getOrgData(result) {

    var data = new google.visualization.DataTable(result);

    data.addColumn('string', 'Name');
    data.addColumn('string', 'Manager');
    data.addColumn('string', 'ToolTip');

    var response = result;

    for (var i = 0; i < response.length; i++) {
        var row = new Array();
        var EmpName = response[i].FirstName + " " + response[i].LastName;
        var EmpID = response[i].EmpID.toString();
        var PMID = response[i].PMID.toString();
        var RoleName = response[i].RoleName;
        var Email = response[i].Email;
        var EmployeePhoto = response[i].EmployeePhoto;

        data.addRows([[{
            v: EmpID,
            f: '<div class="tree-node-wrap"><table class="node-table"><tbody><tr><td class="node-img-wrap"><div class="node-img-ring"><div onclick="showEmployeeDetails(' + EmpID + ')" class="node-img" style="background: url(' + EmployeePhoto + ') center top no-repeat;background-size: cover;"></div></div> </td></tr><tr><td class="node-info-wrap"><table style=""><tbody><tr><td class="node-name"><div class="title">' + EmpName + '</div><div class="detail">' + RoleName + '</div></td></tr></tbody></table></td></tr></tbody></table></div>'
        }, PMID, RoleName]]);
    }

    var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));

    chart.draw(data, { allowHtml: true, allowCollapse: true });
}

function OnErrorCall_getOrgData() {
    console.log("Whoops something went wrong :( ");
}

//-------------------Ends-------------------

$('#btnShowMyChart').click(function () {
    $("#chart-container-1").show();
    $("#chart-container-2").hide();
    drawchart();
});

$('#btnShowOrgChart').click(function () {
    $("#chart-container-1").hide();
    $("#chart-container-2").show();
});

function showEmployeeDetails(employeeId) {
    $('#myModalContent').load("/Report/GetEmployeeDetails?Id=" + employeeId, function () {
        $('#node-modal').modal({
            keyboard: true
        }, 'show');
    });
    return false;
}

function showSubordinate(employeeId) {
    $.ajax({
        type: "POST",
        url: "/Report/GetSubordinates",
        data: '{Id : ' + employeeId + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess_getSubordinateOrgData,
        error: OnErrorCall_getSubordinateOrgData
    });

    function OnSuccess_getSubordinateOrgData(result) {

        var dataSubordinate = new google.visualization.DataTable(result);
        dataSubordinate.addColumn('string', 'Name');
        dataSubordinate.addColumn('string', 'Manager');
        dataSubordinate.addColumn('string', 'ToolTip');

        var response = result;

        for (var i = 0; i < response.length; i++) {
            var row = new Array();
            var EmpName = response[i].FirstName + " " + response[i].LastName;
            var EmpID = response[i].EmpID.toString();
            var PMID = response[i].PMID.toString();
            var RoleName = response[i].RoleName;
            var Email = response[i].Email;
            var EmployeePhoto = response[i].EmployeePhoto;
            var SubordinateCount = response[i].SubordinateCount;

            if (SubordinateCount > 0) {
                dataSubordinate.addRows([[{
                    v: EmpID,
                    f: '<div class="tree-node-wrap"><table class="node-table"><tbody><tr><td class="node-img-wrap"><div class="node-img-ring"><div onclick="showEmployeeDetails(' + EmpID + ')" class="node-img" style="background: url(' + EmployeePhoto + ') center top no-repeat;background-size: cover;"></div><i class="has_child_node" title="Has child" onclick="showSubordinate(' + EmpID + ')">' + SubordinateCount + '</i></div> </td></tr><tr><td class="node-info-wrap"><table style=""><tbody><tr><td class="node-name"><div class="title">' + EmpName + '</div><div class="detail">' + RoleName + '</div></td></tr></tbody></table></td></tr></tbody></table></div>'
                }, PMID, RoleName]]);
            }
            else {
                dataSubordinate.addRows([[{
                    v: EmpID,
                    f: '<div class="tree-node-wrap"><table class="node-table"><tbody><tr><td class="node-img-wrap"><div class="node-img-ring"><div onclick="showEmployeeDetails(' + EmpID + ')" class="node-img" style="background: url(' + EmployeePhoto + ') center top no-repeat;background-size: cover;"></div></div> </td></tr><tr><td class="node-info-wrap"><table style=""><tbody><tr><td class="node-name"><div class="title">' + EmpName + '</div><div class="detail">' + RoleName + '</div></td></tr></tbody></table></td></tr></tbody></table></div>'
                }, PMID, RoleName]]);
            }
        }
        var container = $("#chart-container-1");
        var divId = 'chart_div_' + $("#chart-container-1 > div").length;

        container.append('<div class="chart org-chart org-chart-sub"><div id="' + divId + '" class="chart-container"></div></div>');
        var chart = new google.visualization.OrgChart(document.getElementById(divId));

        chart.draw(dataSubordinate, { allowHtml: true, allowCollapse: true });
    }

    function OnErrorCall_getSubordinateOrgData() {
        console.log("Whoops something went wrong :( ");
    }
}

$(document).ready(function () {
    
    $("#chart-container-1").hide();
    $("#chart-container-2").show();

    //--------------- Employee Search ----------------------------
    $("#SearchString").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: '/Report/AutoCompleteSuggestions',
                type: "POST",
                dataType: "json",
                data: { term: request.term },
                success: function (data) {
                    response($.map(data, function (item) {
                        return { label: item.FirstName, value: item.EmpID };
                    }))
                }
            })
        },
        messages: {
            noResults: "", results: ""
        },
        minlength: 3,
        select: function (event, ui) {
            $('#SearchString').val(ui.item.label);
            $('#SearchId').val(ui.item.value);
            return false;
        }
    });
    //--------------- Employee Search ----------------------------
});

//----------------- Employee Search -----------------
$("#frmSearchEmployee").submit(function (event) {
    drawSearchedEmployeeChart($('#SearchId').val());
    $("#chart-container-1").show();
    $("#chart-container-2").hide();
});
//----------------- Employee Search -----------------
function drawSearchedEmployeeChart(employeeId) {
    $.ajax({
        type: "POST",
        url: "/Report/GetSearchedEmployeeData",
        data: '{Id : ' + employeeId + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess_getLoggedInEmployeeData,
        error: OnErrorCall_getLoggedInEmployeeData
    });

    $.ajax({
        type: "POST",
        url: "/Report/GetSearchedEmployeeOrgData",
        data: '{Id : ' + employeeId + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSuccess_getSubordinateOrgData,
        error: OnErrorCall_getSubordinateOrgData
    });
    
}

$('#SelectedCompanyId').change(function () {
    $.ajax({
        url: '/Report/GetChildCompanies',
        type: 'POST',
        data: '{Id : ' + $(this).val() + '}',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var items = '<option>Select a ChildCompany</option>';
            $.each(data, function (i, childcompany) {
                items += "<option value='" + childcompany.Value + "'>" + childcompany.Text + "</option>";
            });
            $('#childcompany').html(items);
        },
        error: function (ex) {
            alert('Failed to retrieve child companies.' + ex);
        }
    });
});

function showTreelistEmployeeDetails(employeeId,event) {
    showEmployeeDetails(employeeId);
    event.stopPropagation();
}

//=====================================================