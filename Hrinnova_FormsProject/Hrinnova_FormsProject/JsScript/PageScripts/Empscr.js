var isTblSorterDefined = false;
$(document).ready(function () {
    var empDetailModel = {
        empDetail: ko.observableArray([]),
    }
    ko.applyBindings(empDetailModel, document.getElementById("divAttendaceDetails"));

    $(document).on('click', "#btnShowDetail", function (e) {
        e.preventDefault();
        var selectdDate = $("#MainContent_ucStartDate_txtToEventDate").val();
        var dateRegEx = /^(0[1-9]|1[012]|[1-9])[- /.](0[1-9]|[12][0-9]|3[01]|[1-9])[- /.](19|20)\d\d$/
        var sortExpression = "";
        
        BindData(sortExpression, selectdDate, dateRegEx);
    })



    function BindData(sortExpression, selectdDate, dateRegEx) {
        if (selectdDate != "" && selectdDate.match(dateRegEx)) {

            $.ajax({
                type: "POST",
                url: "EmpScr.aspx/GetEmpDetails",
                data: '{"SelectedDate":"' + selectdDate + '","sortExpression":"' + sortExpression + '"}',
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                async: false,
                success: function (data) {                    
                    var Result = jQuery.parseJSON(data.d);
                    
                    empDetailModel.empDetail([]);
                    
                    
                        for (var i = 0; i < Result.length; i++) {
                            empDetailModel.empDetail.push(Result[i]);
                        }
                        //if (isTblSorterDefined == false) {
                        $("#tblAttendanceDetail").trigger("update");
                        //var sorting = [[0, 0]];

                        //$("#tblAttendanceDetail").trigger("sorton", [sorting]);

                        //if (isTblSorterDefined == false) {
                        $('#tblAttendanceDetail').tablesorter({
                            headers: {
                                0: { sorter: false }, 1: { sorter: false }, 2: { sorter: false }, 3: { sorter: false }
                                , 4: { sorter: false }, 5: { sorter: false }, 6: { sorter: false }
                            }
                        }).tablesorterPager({
                            // target the pager markup - see the HTML block below            

                            container: $(".pager"),
                            cssPageDisplay: '.pagedisplay'

                        });
                        isTblSorterDefined = true;
                        //$('#tblAttendanceDetail').tablesorter({
                        //    widthFixed: true,
                        //    widgets: ['zebra'],
                        //    sortList: [[0, 0]]
                        //})
                        //}
                        //else {
                        //    var sorting = [[0, 0]];

                        //    //$("#tblAttendanceDetail").trigger("sortList", [sorting]);
                        //    $("#tblAttendanceDetail").trigger("update");

                        //}


                        //$("#tblAttendanceDetail").tablesorter();
                        //$("#tblAttendanceDetail").trigger("update");                    
                        //$("#tblAttendanceDetail").tablesorter();
                        //var sorting = [[0, 0]];

                        //$("#tblAttendanceDetail").trigger("sorton", [sorting]);
                    

                },
                error: function (data) {
                    alert("error" + data);
                }
            });
        }
        else {
            $("#tblAttendanceDetail tbody").empty();
        }
    }

    $(document).on('click', '.sortField', function () {
        
        var sortExpression = $(this).attr("title");
        var selectdDate = $("#MainContent_ucStartDate_txtToEventDate").val();
        var dateRegEx = /^(0[1-9]|1[012]|[1-9])[- /.](0[1-9]|[12][0-9]|3[01]|[1-9])[- /.](19|20)\d\d$/
        BindData(sortExpression, selectdDate, dateRegEx);


    })
});
function paging() {
    $("#tblAttendanceDetail").each(function () {
        var currentPage = 0;
        var numPerPage = 5;
        var $table = $(this);
        $table.bind('repaginate', function () {
            $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
            //$table.find("tbody  tr:odd").addClass("altr");


        });
        $table.trigger('repaginate');
        var numRows = $table.find('tbody tr').length;
        var numPages = Math.ceil(numRows / numPerPage);
        var $pager = $('<div class="pager"></div>');
        //Bind PageNumber
        $(".page-number").remove();
        for (var page = 0; page < numPages; page++) {            
            if (numPages > 1) {
                $('<span class="page-number"></span>').append($("<a></a>").text(page + 1)).bind('click', {
                    newPage: page
                }, function (event) {
                    currentPage = event.data['newPage'];
                    $table.trigger('repaginate');


                    $(this).addClass('active').siblings().removeClass('active');
                }).appendTo($pager).addClass('clickable');
            }

        }
        $pager.insertAfter($table).find('span.page-number:first').addClass('active');

    });
};