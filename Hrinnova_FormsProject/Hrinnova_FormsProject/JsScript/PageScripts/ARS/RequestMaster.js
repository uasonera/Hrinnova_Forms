$(document).ready(function () {

    var RequestViewModel = new function () {
        var self = this;
        self.RequestList = ko.observableArray();

        self.IsSuperAdmin = ko.observable();
        self.IsPageRights = ko.observable(CheckIsPageRights());
        self.Message = ko.observable('');
        self.SaveStatus = ko.observable(-1);
        self.DeleteRequest = function (data, event) {

            var className = event.target.className;
            if (event.target.className.indexOf("fa-disable") < 0) {
                if (confirm('Are you sure you want to delete this request?')) {
                    DeleteRequest(data.RequestId());
                    self.RequestList.remove(data);
                    paging();
                }
            }

        }
        self.SearchParameter =
            {

                RequestName: ko.observable(),
                IsHrApprovalRequired: ko.observable(),
                IsApprovalRequired: ko.observable(),
                RequestCategory: ko.observable(),
                IsAffactOnAttendance: ko.observable(),
                IsTimeSheetEntryMandatory: ko.observable()

            }
        self.SearchRequest = function () {
            $("#lblMessage").html('').removeClass('alert alert-success');
            var DTO = {
                _viewModel: ko.toJSON(self.SearchParameter)
            }

            $.ajax({
                type: "POST",
                url: 'RequestMaster.aspx/SearchApprovalType',
                data: JSON.stringify(DTO),
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',

                success: function (result) {

                    BindData(result);
                    //  ko.applyBindings(RequestViewModel);
                    paging();
                },
                error: OnError

            });


        }

        self.Reset = function () {
            self.SearchParameter.RequestName('');
            self.SearchParameter.RequestCategory(0);
            self.SearchParameter.IsApprovalRequired(false);
            self.SearchParameter.IsHrApprovalRequired(false);
            self.SearchParameter.IsAffactOnAttendance(false);
            self.SearchParameter.IsTimeSheetEntryMandatory(false);
            $("#lblMessage").html('').removeClass('alert alert-success');
        }



    }
    var HRRequiredArray = [];
    $(".pager").find('a').click(function () {
        $("#lblMessage").html('').removeClass('alert alert-success');
    });
    GetAllApprovalType();
    GetInitialData();



    ko.applyBindings(RequestViewModel);
    $("#btnReset").click(function () {
        GetAllApprovalType();

        window.location.href = window.location.href.split('?')[0];
    });
    function GetAllApprovalType() {
        $.ajax({
            type: "POST",
            url: 'RequestMaster.aspx/GetAllApprovalType',
            data: "{}",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (result) {

                BindData(result);

                paging();
            },
            error: OnError
        });
    }
    function BindData(_result) {
        var data = jQuery.parseJSON(_result.d);

        //  RequestViewModel.RequestList.splice(0, RequestViewModel.RequestList.length)
        RequestViewModel.RequestList.removeAll();

        $.each(data, function (index, _data) {

            var RequestDefinition = {
                RequestId: ko.observable(_data.RequestId),

                RequestName: ko.observable(_data.RequestName),

                EnumValue: ko.observable(_data.EnumValue),

                IsHrApprovalRequired: ko.observable(_data.IsHrApprovalRequired),
                Status: ko.observable(_data.Status),
                StatusImg: ko.computed(function () {
                    var ImagePath;

                    if (_data.IsSuperAdmin == false) {
                        if (_data.Status == true) {
                            ImagePath = 'fa fa-check fa-disable';
                        } else if (_data.Status == false) {
                            ImagePath = 'fa fa-times fa-disable';
                        }
                    }
                    else if (_data.IsSuperAdmin == true) {
                        if (_data.Status == true) {
                            ImagePath = 'fa fa-check text-success';
                        } else if (_data.Status == false) {
                            ImagePath = 'fa fa-times text-danger';
                        }
                    }


                    return ImagePath;
                }),
                HrApprovalRequiredImg: ko.computed(function () {
                    var ImagePath;

                    if (_data.IsPageRights == false) {
                        if (_data.IsHrApprovalRequired == true) {
                            ImagePath = 'fa fa-check fa-disable';
                        } else if (_data.IsHrApprovalRequired == false) {
                            ImagePath = 'fa fa-times fa-disable';
                        }
                    }
                    else if (_data.IsPageRights == true) {
                        if (_data.IsHrApprovalRequired == true) {
                            ImagePath = 'fa fa-check text-success';
                        } else if (_data.IsHrApprovalRequired == false) {
                            ImagePath = 'fa fa-times text-danger';
                        }
                    }

                    return ImagePath;
                }),
                IsApprovalRequired: ko.observable(_data.IsApprovalRequired),
                IsApprovalRequiredImg: ko.computed(function () {
                    var ImagePath;

                    if (_data.IsPageRights == false) {
                        if (_data.IsApprovalRequired == true) {
                            ImagePath = 'fa fa-check fa-disable';
                        } else if (_data.IsApprovalRequired == false) {
                            ImagePath = 'fa fa-times fa-disable';
                        }
                    }
                    else if (_data.IsPageRights == true) {
                        if (_data.IsApprovalRequired == true) {
                            ImagePath = 'fa fa-check text-success';
                        } else if (_data.IsApprovalRequired == false) {
                            ImagePath = 'fa fa-times text-danger';
                        }
                    }

                    //else {
                    //    if (_data.IsApprovalRequired == true) {
                    //        ImagePath = 'fa fa-check text-success';
                    //    } else if (_data.IsApprovalRequired == false) {
                    //        ImagePath = 'fa fa-times text-danger';
                    //    }
                    //}
                    return ImagePath;
                }),
                RequestCategory: ko.observable(_data.RequestCategory),
                IsAffactOnAttendance: ko.observable(_data.IsAffactOnAttendance),
                IsAffactOnAttendanceImg: ko.computed(function () {
                    var ImagePath;

                    if (_data.IsSuperAdmin == false) {
                        if (_data.IsAffactOnAttendance == true) {
                            ImagePath = 'fa fa-check fa-disable';
                        } else if (_data.IsAffactOnAttendance == false) {
                            ImagePath = 'fa fa-times fa-disable';
                        }
                    }
                    else if (_data.IsSuperAdmin == true) {
                        if (_data.IsAffactOnAttendance == true) {
                            ImagePath = 'fa fa-check text-success';
                        } else if (_data.IsAffactOnAttendance == false) {
                            ImagePath = 'fa fa-times text-danger';
                        }
                    }

                    return ImagePath;
                }),
                IsTimeSheetEntryMandatory: ko.observable(_data.IsTimeSheetEntryMandatory),
                IsTimeSheetEntryMandatoryImg: ko.computed(function () {
                    var ImagePath;

                    if (_data.IsSuperAdmin == false) {
                        if (_data.IsTimeSheetEntryMandatory == true) {
                            ImagePath = 'fa fa-check fa-disable';
                        } else if (_data.IsTimeSheetEntryMandatory == false) {
                            ImagePath = 'fa fa-times fa-disable';
                        }
                    }
                    else if (_data.IsSuperAdmin == true) {
                        if (_data.IsTimeSheetEntryMandatory == true) {
                            ImagePath = 'fa fa-check text-success';
                        } else if (_data.IsTimeSheetEntryMandatory == false) {
                            ImagePath = 'fa fa-times text-danger';
                        }
                    }

                    return ImagePath;
                }),
                IsSuperAdmin: ko.observable(_data.IsSuperAdmin),
                IsPageRights: ko.observable(_data.IsPageRights),
                BindLink: ko.computed(function () {
                    if (CheckIsPageRights()) {

                        return '../Admin/RequestMasterFromgenerator.aspx?RequestId=' + _data.RequestId;
                    }
                    else
                        return '#';
                }),
                IsEdit: ko.observable(_data.RequestId),
                IsEditImg: ko.computed(function () {
                    var ImagePath;

                    if (_data.IsPageRights == false) {
                        ImagePath = 'fa fa-pencil fa-disable';
                    }
                    else if (_data.IsPageRights == true) {
                        if (_data.RequestCategory == 1) {
                            ImagePath = 'fa fa-pencil text-success';
                        }
                        else {
                            ImagePath = 'fa fa-pencil fa-disable';
                        }
                    }

                    return ImagePath;
                }),
                RequestCategory: _data.RequestCategory,




                GetDetails: function () {
                    //if (CheckIsSuperAdmin())
                    if (CheckIsPageRights()) {

                        window.location = '../Admin/RequestMasterFromgenerator.aspx?RequestId=' + _data.RequestId;
                    }
                    else {
                        toastr.error("You are not authorized to perform this operation");
                    }

                },

                ActiveInActive: function (Value, data, event) {
                    var IsValid = true;
                    var HREmail = "";
                    var IsApprovalReq = data.IsApprovalRequired();
                    var IsHRApprovalReq = data.IsHrApprovalRequired();
                    if (Value == 'IsApprovalRequired') {
                        data.IsApprovalRequired(!data.IsApprovalRequired());
                    }
                    else if (Value == 'IsHrApprovalRequired') {
                        //data.IsHrApprovalRequired(!data.IsHrApprovalRequired());
                    }
                    else if (Value == 'IsAffactOnAttendance') {
                        data.IsAffactOnAttendance(!data.IsAffactOnAttendance());

                    }
                    else if (Value == 'IsTimeSheetEntryMandatory') {
                        data.IsTimeSheetEntryMandatory(!data.IsTimeSheetEntryMandatory());

                    }
                    else if (Value == 'ChangeStatus') {
                        data.Status(!data.Status());
                    }
                    if (Value == 'IsHrApprovalRequired') {
                        if (!data.IsHrApprovalRequired() && CheckIsSuperAdmin()) {
                            $("#hrEmailAdd").val("");
                            $(".modal-title").html("HR Email");
                            $("#popup").modal("show");
                            HRRequiredArray = data;
                        }
                        else {
                            if (Value == 'IsHrApprovalRequired')
                                data.IsHrApprovalRequired(!data.IsHrApprovalRequired());

                            if (IsApprovalReq) {
                                UpdateFlage(data, HREmail);
                            }
                            else {
                                toastr.error("Request should not be allowed to deactivate both the approval");
                                data.IsHrApprovalRequired(true);
                            }

                        }
                    }
                    if (Value != 'IsHrApprovalRequired') {
                        //if (Value != 'IsHrApprovalRequired')
                        //    IsHRApprovalReq = data.IsHrApprovalRequired();

                        if (IsHRApprovalReq) {
                            UpdateFlage(data, HREmail);
                        }
                        else if (Value == 'ChangeStatus') {
                            UpdateFlage(data, HREmail);
                        }
                        else {
                            toastr.error("Request should not be allowed to deactivate both the approval");
                            data.IsApprovalRequired(true);
                        }

                    }

                }

            }
            RequestViewModel.RequestList.push(RequestDefinition);
            //RequestViewModel.Reset();
        });

        RequestViewModel.loading = false;

        //ko.applyBindings(RequestViewModel);






    }

    function Rebind() {
        $.ajax({
            type: "POST",
            url: 'RequestMaster.aspx/GetAllApprovalType',
            data: "{}",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (result) {

                var beforeCurrentPage;
                var currentPage;
                var span = $(".pager").children();
                $(span).each(function (i) {

                    if ($(this).hasClass('active') == true) {
                        ActiveElement = $(this).children()[0];
                        currentPage = $(ActiveElement)[0].innerHTML;
                    }
                });
                var beforeCurrentPage = parseInt(currentPage) - 1;
                BindData(result);
                paging();
                var $table = $("#people")
                $table.find('tbody tr').hide().slice(beforeCurrentPage * 10, (beforeCurrentPage + 1) * 10).show();
                var afterPagingCurrentPage = parseInt(currentPage);

                //var anchorTag = $(".pager").children().children().find($('a').val() == afterPagingCurrentPage)
                //var temp = $(".pager").children().children().find($('a :contains("1")'))
                var span1 = $(".pager").children();
                $(span1).each(function (i) {

                    if ($(this).children()[0].innerHTML == afterPagingCurrentPage) {
                        ActiveElement = $(this).addClass('active');
                    }
                    else {
                        ActiveElement = $(this).removeClass('active');
                    }
                });



                $("#lblMessage").addClass('green-msg').html('Request has been updated successfully');
                $(window).scrollTop(200);
            },
            error: OnError
        });
    }
    function DeleteRequest(RequestID) {
        var DTO = {
            RequestId: RequestID
        }

        $.ajax({
            url: "RequestMaster.aspx/DeleteRequest",
            type: "post",
            dataType: "json",
            contentType: 'application/json; charset=utf-8',


            data: JSON.stringify(DTO),



            success: function (result) {
                $("#lblMessage").addClass('green-msg').html('Request has been deleted successfully');
                $(window).scrollTop(200);
            }

            ,
            error: function (error) {

                var UserMessage = "Error Type :" + error.statusText + "\n" + "Erro code :" + error.status + "\n" + " Message :" + jQuery.parseJSON(error.responseText).Message

                alert(UserMessage);
            }

        });


    }

    function OnError(result) {

        FieldViewModel.Message("Found Error while Searching record.");
        FieldViewModel.SaveStatus(jSONResullt.value)



    }

    function paging() {
        $("#people").each(function () {
            var currentPage = 0;
            var numPerPage = 10;
            var $table = $(this);
            $table.bind('repaginate', function () {
                $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
                //$table.find("tbody  tr:odd").addClass("altr");


            });
            $table.trigger('repaginate');
            var numRows = $table.find('tbody tr').length;
            var numPages = Math.ceil(numRows / numPerPage);
            var $pager = $('<table class="paginat table"></table>');
            var $pager1 = $('<tr></tr>')
            $($pager1).appendTo($pager);
            var $pager2 = $('<td></td>')
            $($pager2).appendTo($pager1);
            var $pager3 = $('<table></table>')
            $($pager3).appendTo($pager2);
            var $pager4 = $('<tr></tr>')
            $($pager4).appendTo($pager3);
            //Bind PageNumber
            $(".page-number").remove();

            for (var page = 0; page < numPages; page++) {
                if (numPages > 1) {
                    $('<td class="page-number"></td>').append($("<a></a>").text(page + 1)).bind('click', {
                        newPage: page
                    }, function (event) {
                        currentPage = event.data['newPage'];
                        $table.trigger('repaginate');


                        $(this).addClass('active').siblings().removeClass('active');
                    }).appendTo($pager4).addClass('clickable');


                }

            }
            $pager.insertAfter($table).find('td.page-number:first').addClass('active');
            $(".pager").find('a').click(function () {
                $("#lblMessage").html('').removeClass('alert alert-success');
            });
        });
    }
    function GetInitialData() {
        var queryString = SetRequestIdFromQueryString('Message');

        if (queryString == '') {

            return;
        }
        var DTO = { message: queryString }


        $.ajax({
            type: "POST",
            url: 'RequestMaster.aspx/GetInitialData',
            data: JSON.stringify(DTO),
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            success: function (result) {

                JsonResult = jQuery.parseJSON(result.d)
                RequestViewModel.SaveStatus(JsonResult.value);
                RequestViewModel.Message(JsonResult.Message);
                // ko.applyBindings(RequestViewModel);
                // paging();

            }
        });

    }
    function SetRequestIdFromQueryString(sParam) {
        //var sParam = 'Message';
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) {
            // var sParameterName = sURLVariables[i].split('=');


            //if (sParameterName[0] == sParam) {

            //    return sParameterName[1];
            //}

            return sURLVariables[0].substring(sURLVariables[0].indexOf(sParam) + sParam.length + 1, sURLVariables[0].length)

        }
    }

    function SaveEmail() {

    }
    function CheckIsSuperAdmin() {
        var IsSuperAdmin = false;
        $.ajax({
            type: 'POST',
            url: 'RequestMaster.aspx/CheckIsSuperAdmin',
            contentType: 'application/json',
            data: "{}",
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                IsSuperAdmin = result.d;
            }
        });
        return IsSuperAdmin == "true";
    }
    function CheckIsPageRights() {
        var IsPageRights = false;
        $.ajax({
            type: 'POST',
            url: 'RequestMaster.aspx/CheckIsPageRights',
            contentType: 'application/json',
            data: "{}",
            async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                IsPageRights = result.d;
            }
        });
        return IsPageRights == "true";
    }
    $(document).on('click', "#btnSave", function () {

        //var data = [];
        //data = $("#hdnRequestId").val();

        var IsValid = true;
        HREmail = $("#hrEmailAdd").val();
        if (HREmail == "") {
            IsValid = false;
            alert("Enter HR Email")
        }


        if (IsValid) {
            var regex = /^[\W]*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4}[\W]*,{1}[\W]*)*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4})[\W]*$/;
            var ValidEmail = regex.test(HREmail);
            if (ValidEmail) {
                HRRequiredArray.IsHrApprovalRequired = true;
                UpdateFlage(HRRequiredArray, HREmail);
                $("#popup").modal("hide");
            }
            else {
                alert("Please Enter valid HR Email")
            }
        }

    });


    $(document).on('click', "#btnCancel", function () { $("#popup").modal("hide"); });

    function UpdateFlage(data, HREmail) {
        var IsValidSession = false;
        $.ajax({
            type: 'POST',
            url: 'RequestMaster.aspx/ISValidSession',
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
        data.HREmail = HREmail;
        var DTO = {
            _viewModel: ko.toJSON(data)
        }
        if (CheckIsSuperAdmin()) {
            $.ajax({
                url: "RequestMaster.aspx/UpdateFlage",
                type: "post",
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(DTO),
                success: function (result) {
                    toastr.success("Request state has been updated successfully");
                    GetAllApprovalType();
                }
            });
        }
        else
            toastr.error("You are not authorised to perform this operation");

    }
});
