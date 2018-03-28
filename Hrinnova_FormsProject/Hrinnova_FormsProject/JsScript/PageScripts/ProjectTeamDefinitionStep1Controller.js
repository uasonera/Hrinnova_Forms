app.controller("ProjectTeamDefinitionStep1Controller", function ($scope) {
    $scope.hello = "hello";
    $scope.selectedDepartment = 0;
    $scope.departmentList = null;
    $scope.employeeList = null;
    $scope.selectedEmployees = [];
    $scope.IsEmployeeSelected;
    $scope.ParentFunctionList = null;
    $scope.ChildFunctionList = null;
    $scope.list = [];
    $scope.IsParentFunctionSelected;
    $scope.IsChildFunctionSelected;
    $scope.selectedFunctionList = [];

    $scope.GetDepartmentList = function () {

        $.ajax({
            type: 'post',
            url: '../KRA/ProjectTeamDefinitionStep1.aspx/GetDepartmentList',
            contentType: 'application/json; charset=utf-8',
            async: false,
            success: function (JsonResult) {
                $scope.departmentList = jQuery.parseJSON(JsonResult.d);
            },
            error: function () {
                alert("error");
            }
        });
    }


    $scope.GetEmployeeList = function () {

        var DepartmentID = $scope.selectedDepartment;
        var employeeList;

        if (DepartmentID > 0) {
            $scope.employeeList = DepartmentWiseEmployeeList(DepartmentID);
        }
        else {
            $scope.employeeList = AllEmployeeList();
        }

    }


    $scope.GetSelectedEmployee = function (empName, empID, IsSelectedEmployee) {
        if (IsSelectedEmployee == true) {
            $scope.selectedEmployees.push(
            {
                empName: empName,
                empID: empID
            });
        }
        else {
            for (var index = 0; index < $scope.selectedEmployees.length; index++) {
                if ($scope.selectedEmployees[index].empName == empName && $scope.selectedEmployees[index].empID == empID) {
                    $scope.selectedEmployees.splice(index, 1);
                }
            }
        }

    }

    $scope.GetFunctionList = function () {
        $.ajax({
            type: "POST",
            url: 'FunctionListing.aspx/GetParentAndChildFunction',
            data: "{}",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            async: false,
            success: function (result) {
                var result = jQuery.parseJSON(result.d);
                $scope.ParentFunctionList = (result.TblParentFunc);
                $scope.ChildFunctionList = (result.TblChildFunc);
            },
            error: function (result) {
                alert(result);
            }
        });
    }


    $scope.GetChildFunctionForParent = function () {

        var ChildFunctionList = $scope.ChildFunctionList;
        var ParentFunctionList = $scope.ParentFunctionList;
        var ChildFunctionListForParent = [];
        var ParentFunction = [];
        for (var Parentindex = 0; Parentindex < ParentFunctionList.length; Parentindex++) {
            ChildFunctionListForParent = [];
            ParentFunction = [];

            ParentFunction.push({
                ParentFunctionDetail: ParentFunctionList[Parentindex],
                IsParentFunctionSelected: ''
            });

           
            for (var Childindex = 0; Childindex < ChildFunctionList.length; Childindex++) {

                if (ChildFunctionList[Childindex].ParentFunctionID == ParentFunctionList[Parentindex].FunctionID) {

                    ChildFunctionListForParent.push({
                        ChildFunctionID: ChildFunctionList[Childindex].FunctionID,
                        ChildFunctionTitle: ChildFunctionList[Childindex].FunctionTitle,
                        ParentFunctionID: ParentFunctionList[Parentindex].FunctionID,
                        IsChildFunctionSelected: ''
                    });
                }
            }
            $scope.list.push({
                ParentFuntions: ParentFunction,
                ChildFunctions: ChildFunctionListForParent
            });
        }
    }

    $scope.GetSelectedFunctions = function (FunctionID, FunctionTitle, IsFunctionSelected, IsParent) {
        if (IsFunctionSelected == true) {
            if (IsParent == true) {
                $scope.list = CheckUncheckChildFunctionForParent($scope.list, 'checked', FunctionID);
            }
            else {
                $scope.list = CheckUncheckChildFunction($scope.list, 'checked', FunctionID);
            }
        }
        else {
            if (IsParent == true) {
                $scope.list = CheckUncheckChildFunctionForParent($scope.list, '', FunctionID);
            }
            else {
                $scope.list = CheckUncheckChildFunction($scope.list, '', FunctionID);
            }
        }
        $scope.selectedFunctionList = [];
        GetSelectedFunctionList($scope.list, $scope.selectedFunctionList);
    }

});


function DepartmentWiseEmployeeList(DepartmentID) {

    var DepartmentWiseEmployeeList;
    var data = JSON.stringify({ DepartmentID: DepartmentID });
    $.ajax({
        type: 'post',
        data: data,
        url: '../KRA/ProjectTeamDefinitionStep1.aspx/GetDepartmentWiseEmployeesList',
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (JsonResult) {
            DepartmentWiseEmployeeList = jQuery.parseJSON(JsonResult.d);
        },
        error: function () {
            alert("error");
        }
    });

    return DepartmentWiseEmployeeList;
}

function AllEmployeeList() {
    var AllEmployeeList;
    $.ajax({
        type: 'post',
        url: '../KRA/ProjectTeamDefinitionStep1.aspx/GetAllEmployeesList',
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (JsonResult) {
            AllEmployeeList = jQuery.parseJSON(JsonResult.d);
        },
        error: function () {
            alert("error");
        }
    });

    return AllEmployeeList;
}


function CheckUncheckChildFunctionForParent(list, IsChecked, FunctionID) {
    for (var index = 0; index < list.length; index++) {

        if (list[index].ParentFuntions[0].ParentFunctionDetail.FunctionID == FunctionID) {
            list[index].ParentFuntions[0].IsParentFunctionSelected = IsChecked;
            var ChildFunction = list[index].ChildFunctions;
            for (var ChildIndex = 0; ChildIndex < ChildFunction.length; ChildIndex++) {
                ChildFunction[ChildIndex].IsChildFunctionSelected = IsChecked;
            }
        }
    }
    return list;
}

function CheckUncheckChildFunction(list, IsChecked, FunctionID) {
    for (var index = 0; index < list.length; index++) {
        var ChildFunction = list[index].ChildFunctions;
        for (var ChildIndex = 0; ChildIndex < ChildFunction.length; ChildIndex++) {
            if (ChildFunction[ChildIndex].ChildFunctionID == FunctionID) {
                ChildFunction[ChildIndex].IsChildFunctionSelected = IsChecked;
            }
        }
    }
    return list;
}

function GetSelectedFunctionList(list, SelectedList) {
    for (var index = 0; index < list.length; index++) {
        if (list[index].ParentFuntions[0].IsParentFunctionSelected == 'checked') {
           SelectedList= PushInSelectedFunctionList(SelectedList, list[index].ParentFuntions[0].ParentFunctionDetail.FunctionID, list[index].ParentFuntions[0].ParentFunctionDetail.FunctionTitle, 0);
        }

        var ChildFunction = list[index].ChildFunctions;
        for (var ChildIndex = 0; ChildIndex < ChildFunction.length; ChildIndex++) {
            if (ChildFunction[ChildIndex].IsChildFunctionSelected == 'checked') {
               SelectedList=PushInSelectedFunctionList(SelectedList, ChildFunction[ChildIndex].FunctionID, ChildFunction[ChildIndex].FunctionTitle, list[index].ParentFuntions[0].ParentFunctionDetail.FunctionID);

            }

        }
    }
}

function PushInSelectedFunctionList(SelectedList, FunctionID, FunctionTitle, ParentFunctionID) {
    SelectedList.push({
        FunctionID: FunctionID,
        FunctionTitle: FunctionTitle,
        ParentFunctionID: ParentFunctionID
    });

    return SelectedList;
}
