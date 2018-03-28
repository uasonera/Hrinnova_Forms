﻿$(document).ready(function () {

    paging();

    function paging() {
        $("#leavetable").each(function () {
            var currentPage = 0;
            var numPerPage = 2;
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
    }
    $("#AddLeaveCategory").click(function () {
        $.ajax({
            type: "POST",
            url: "/Leave/AddLeaveCategory",
            data: '',
            dataType: "html",
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {

                $("#LeaveCategoryModel").empty().html(data);

               
            }
        });
    });

});