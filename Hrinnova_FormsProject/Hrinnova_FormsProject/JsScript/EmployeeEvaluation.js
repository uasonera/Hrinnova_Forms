var firsttime = false;
var viewModel = {
    projdetails: ko.observableArray([])
};
function bindactionmenu() {
    $(".popUpContainer").hover(
                             function () { showactionmenu($(this), $(this).next(".popup")) },
                            function () { $(this).next(".popup").hide() }
                     );
    $(".popup").hover(
                                function () { showactionmenu($(this).prev(), $(this)) },
                            function () { $(this).hide() }
                     );
}
function showactionmenu(elm, menu) {
    var offset, top, left;
    offset = elm.offset();
    top = offset.top - (menu.height() / 2);
    top = (top > 0) ? top : 0;
    left = offset.left + 30;
    left = (left > 0) ? left : 0;
    menu.show().css({ top: top, left: left });
}
$(document).ready(function () {
    $('#ddlProj').change(function () {
        BindProjectData($(this).val());
    });
    ko.applyBindings(viewModel);
    BindProjectData($('#ddlProj').val());


});
function BindProjectData(ProjectId) {
    $.ajax({
        type: "POST",
        url: 'EmployeeEvaluation.aspx/GetProjDetails',
        data: "{ 'ProjectId': " + ProjectId + "}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            viewModel.projdetails(result.d);
            bindactionmenu();
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}
ko.bindingHandlers.date = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {        
        var value = valueAccessor();
        var allBindings = allBindingsAccessor();
        var valueUnwrapped = ko.utils.unwrapObservable(value);

        // Date formats: http://momentjs.com/docs/#/displaying/format/
        var pattern = allBindings.format || 'dd/MM/yyyy';
        var prefix = allBindings.prefix || '';
        var postfix = allBindings.postfix || '';
        var output = "-";
        if (valueUnwrapped !== null && valueUnwrapped !== undefined && valueUnwrapped.length > 0) {
            output = new Date(parseInt(valueUnwrapped.substr(6))).format(pattern);
        }

        output = prefix + output + postfix;

        if ($(element).is("input") === true) {
            $(element).val(output);
        } else {
            $(element).text(output);
        }
    }
};