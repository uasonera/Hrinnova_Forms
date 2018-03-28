$(document).ready(function () {
    $("#MainContent_ucStartDate_txtToEventDate").val($.datepicker.formatDate("mm/dd/yy", new Date()));
    GetDataOnClickOfShowDetail();


    $(document).on('click', "#btnShowDetail", function (e) {
        e.preventDefault();
        $("#tbodyData").empty();

        var IsValidSession = false;
        $.ajax({
            type: 'POST',
            url: 'EmpScrWithSubordinate.aspx/ISValidSession',
            contentType: 'application/json',
            data: "{}",
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var Result = result.d;
                if (Result == 'true') {

                    IsValidSession = true;
                }
                else {
                    IsValidSession = false;
                }

            },
            error: function (error) {
                IsValidSession = false;
            }
        });

        if (!IsValidSession) {
            window.location.href = ("/login");
            return false;
        }

        GetDataOnClickOfShowDetail();
    })

    function GetDataOnClickOfShowDetail() {
        var selectdDate = $("#MainContent_ucStartDate_txtToEventDate").val();
        var dateRegEx = /^(0[1-9]|1[012]|[1-9])[- /.](0[1-9]|[12][0-9]|3[01]|[1-9])[- /.](19|20)\d\d$/
        var sortExpression = "";

        $.when(

             $.ajax({
                 type: "Post",
                 url: 'EmpScrWithSubordinate.aspx/GetEmpDetails',
                 async: false,
                 data: '{"SelectedDate":"' + selectdDate + '","sortExpression":"' + sortExpression + '"}',
                 contentType: 'application/json; charset=utf-8',
                 datatype: 'json',
                 success: function (result) {

                     $(".tree").append('<ul id="mainUl"></ul>');

                     var tableResult = jQuery.parseJSON(result.d[0]);
                     var ChildCount = jQuery.parseJSON(result.d[1]);

                     var tblSuperParent = tableResult.tblSuperParentList;
                     var tblChild = tableResult.tblChildList;

                     var finalObj = tblChild;
                     var CallCount = 0;
                     if ((parseInt(ChildCount)) % 100 == 0) {
                         CallCount = (parseInt(ChildCount) / 100) - 1;
                     }
                     else {
                         CallCount = parseInt((parseInt(ChildCount) / 100));
                     }
                     if (CallCount > 0) {
                         for (var i = 0; i < CallCount; i++) {
                             var pageNumber = i + 1;
                             $.ajax({
                                 type: "Post",
                                 url: 'EmpScrWithSubordinate.aspx/GetRemainingTreeViewchild',
                                 async: false,
                                 data: '{"SelectedDate":"' + selectdDate + '","sortExpression":"' + sortExpression + '","PageNumber":"' + pageNumber + '"}',
                                 contentType: 'application/json; charset=utf-8',
                                 datatype: 'json',
                                 success: function (result) {
                                     var jsonResult2 = jQuery.parseJSON(result.d);

                                     finalObj = finalObj.concat(jsonResult2);

                                 },
                                 error: {}
                             });
                         }
                     }
                     //var tblSuperParent = jsonResult.tblSuperParentList;

                     //var tblChild = jsonResult.tblChildList;
                     var tblChild = finalObj;
                     var isChildEmpty = jQuery.isEmptyObject(tblChild);
                     var isParentEmpty = jQuery.isEmptyObject(tblSuperParent);

                     var ParentfilteredArray = [];
                     var i;
                     var ChildfilteredArray = [];
                     //var childIndex;
                     $.each(tblSuperParent, function (index, item) {
                         var alreadyAdded = false;
                         for (i in ParentfilteredArray) {
                             if (ParentfilteredArray[i].EmployeeWorkingHourID == item.EmployeeWorkingHourID) {
                                 alreadyAdded = true;
                             }
                         }
                         if (!alreadyAdded) {
                             ParentfilteredArray.push(item);
                         }
                         else {
                             ParentfilteredArray[i].Request = ParentfilteredArray[i].Request + " , " + item.Request;
                         }
                     });



                     if (isChildEmpty != true || isParentEmpty != true) {

                         //for (var i = 0; i < tblSuperParent.length; i++) {
                         for (var i = 0; i < ParentfilteredArray.length; i++) {

                             var InTime = "";
                             var OutTime = "";
                             var Late = "";
                             var Early = "";
                             var Absent = "";
                             var Request = "";
                             var WeekOff = "";
                             if (ParentfilteredArray[i]._InTime != null)
                                 InTime = ParentfilteredArray[i]._InTime;

                             if (ParentfilteredArray[i]._OutTime != null)
                                 OutTime = ParentfilteredArray[i]._OutTime;
                             if (ParentfilteredArray[i].late != null)
                                 Late = ParentfilteredArray[i].late;
                             if (ParentfilteredArray[i].early != null)
                                 Early = ParentfilteredArray[i].early;
                             if (ParentfilteredArray[i].Absent != null)
                                 Absent = ParentfilteredArray[i].Absent;
                             if (ParentfilteredArray[i].Request != null)
                                 Request = ParentfilteredArray[i].Request;

                             if (ParentfilteredArray[i].WeekOff != null)
                                 WeekOff = ParentfilteredArray[i].WeekOff;

                             var ParentId = ParentfilteredArray[i].ParentEmpId;
                             var parentName = ParentfilteredArray[i].ParentEmpName;
                             var AbsentWithLeaveRequest = ParentfilteredArray[i].AbsentWithLeaveRequest;

                             //var node = $("#tblEmpList").treetable("node", i + 1);
                             BindParentTr(ParentId, parentName, InTime, OutTime, Late, Early, Absent, Request, WeekOff, AbsentWithLeaveRequest);

                         }

                         $.each(tblChild, function (index, item) {
                             var alreadyAdded = false;
                             for (i in ChildfilteredArray) {
                                 if (ChildfilteredArray[i].EmployeeWorkingHourID == item.EmployeeWorkingHourID) {
                                     alreadyAdded = true;
                                 }
                             }
                             if (!alreadyAdded) {
                                 ChildfilteredArray.push(item);
                             }
                             else {
                                 ChildfilteredArray[i].Request = ChildfilteredArray[i].Request + " , " + item.Request;
                             }
                         });

                         for (var childIndex = 0; childIndex < ChildfilteredArray.length; childIndex++) {
                             var InTime = "";
                             var OutTime = "";
                             var Late = "";
                             var Early = "";
                             var Absent = "";
                             var Request = "";
                             var WeekOff = "";

                             if (ChildfilteredArray[childIndex]._InTime != null)
                                 InTime = ChildfilteredArray[childIndex]._InTime;

                             if (ChildfilteredArray[childIndex]._OutTime != null)
                                 OutTime = ChildfilteredArray[childIndex]._OutTime;

                             if (ChildfilteredArray[childIndex].late != null)
                                 Late = ChildfilteredArray[childIndex].late;

                             if (ChildfilteredArray[childIndex].early != null)
                                 Early = ChildfilteredArray[childIndex].early;

                             if (ChildfilteredArray[childIndex].Absent != null)
                                 Absent = ChildfilteredArray[childIndex].Absent;

                             if (ChildfilteredArray[childIndex].Request != null)
                                 Request = ChildfilteredArray[childIndex].Request;

                             if (ChildfilteredArray[childIndex].WeekOff != null)
                                 WeekOff = ChildfilteredArray[childIndex].WeekOff;

                             var parentId = ChildfilteredArray[childIndex].ParentEmpId;
                             var childId = ChildfilteredArray[childIndex].ChildEmpId;
                             var childEmpName = ChildfilteredArray[childIndex].ChildEmpName;
                             var AbsentWithLeaveRequest = ChildfilteredArray[childIndex].AbsentWithLeaveRequest;

                             BindChildTr(parentId, childId, childEmpName, InTime, OutTime, Late, Early, Absent, Request, WeekOff, AbsentWithLeaveRequest);

                         }
                     }
                     else {
                         $("#tbodyData").append($('<tr align="center">').append($('<td colspan="8">No Records Found </td>')));
                     }

                 }
             })
             ).done(function () {
                 $("#tblEmpList").treetable({
                     expandable: true,
                 }, true)
             })

    }
    function BindParentTr(parentId, parentName, InTime, OutTime, Late, Early, Absent, Request, WeekOff, AbsentWithLeaveRequest) {

        //$("#tblEmpList").append($('<tbody id="tbodyData"></tbody>'))
        $("#tbodyData").append($('<tr>').attr("data-tt-id", parentId));

        var $row = $('tr[data-tt-id="' + parentId + '"]');

        $row.append('<td class="text-left"><span class="EmpNameColumn">' + parentName + '</span></td>');
        $row.append('<td class="EmpNameColumn text-left">' + InTime + '</td>');
        $row.append('<td class="EmpNameColumn text-left">' + OutTime + '</td>');
        $row.append('<td class="EmpNameColumn text-left">' + Late + '</td>');
        $row.append('<td class="EmpNameColumn text-left">' + Early + '</td>');
        if ((WeekOff != "" && Absent != 'Missed punch') || (Request != "" && Absent == 'A' && AbsentWithLeaveRequest == null))
            $row.append('<td class="EmpNameColumn text-left"></td>');
        else
            $row.append('<td class="EmpNameColumn text-left">' + Absent + '</td>');

        $row.append('<td class="EmpNameColumn text-left">' + Request + '</td>');
        $row.append('<td class="EmpNameColumn text-left">' + WeekOff + '</td>');

    }
    function BindChildTr(parentId, childId, childEmpName, InTime, OutTime, Late, Early, Absent, Request, WeekOff, AbsentWithLeaveRequest) {

        var $row = $('tr[data-tt-id="' + parentId + '"]');

        $('<tr class="child-row" data-tt-id=' + childId + ' data-tt-parent-id=' + parentId + '></tr>').insertAfter($row);

        var $childRow = $('tr[data-tt-id="' + childId + '"]');

        $childRow.append('<td><span class="EmpNameColumn text-left">' + childEmpName + '</spna></td>');
        $childRow.append('<td class="EmpNameColumn text-left">' + InTime + '</td>');
        $childRow.append('<td class="EmpNameColumn text-left">' + OutTime + '</td>');
        $childRow.append('<td class="EmpNameColumn text-left">' + Late + '</td>');
        $childRow.append('<td class="EmpNameColumn text-left">' + Early + '</td>');
        if ((WeekOff != "" && Absent != 'Missed punch') || (Request != "" && Absent == 'A' && AbsentWithLeaveRequest == null))
            $childRow.append('<td class="EmpNameColumn text-left"></td>');
        else
            $childRow.append('<td class="EmpNameColumn text-left">' + Absent + '</td>');
        $childRow.append('<td class="EmpNameColumn text-left">' + Request + '</td>');
        $childRow.append('<td class="EmpNameColumn text-left">' + WeekOff + '</td>');

    }

    $(document).on('click', '.EmpNameColumn', function () {

        var IsValidSession = false;
        $.ajax({
            type: 'POST',
            url: 'EmpScrWithSubordinate.aspx/ISValidSession',
            contentType: 'application/json',
            data: "{}",
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                var Result = result.d;
                if (Result == 'true') {

                    IsValidSession = true;
                }
                else {
                    IsValidSession = false;
                }

            },
            error: function (error) {
                IsValidSession = false;
            }
        });

        if (!IsValidSession) {
            window.location.href = ("/login");
            return false;
        }
        var EmpId = $(this).parent().parent().attr('data-tt-id')
        var date = $('#MainContent_ucStartDate_txtToEventDate').val();
        var Month = moment(date, "MM-DD-YYYY").format('MM');
        var Year = moment(date, "MM-DD-YYYY").format('YYYY');
        var URL = "../Admin/SelectedEmployeeAttendance.aspx?EmpId=" + encodeURIComponent(EmpId) + "&Month=" + encodeURIComponent(Month) + "&Year=" + encodeURIComponent(Year);
        window.location = URL;
    })

});