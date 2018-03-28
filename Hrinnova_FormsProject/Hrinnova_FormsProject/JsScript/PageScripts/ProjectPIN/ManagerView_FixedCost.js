$(document).ready(function () {
    $('.actualDate').each(function (i, obj) {
        var date = new Date($(this).attr("data-value"));

        $(this).datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true
        }).datepicker("setDate", date).change(function () {
            var thisDate = $(this).val();
            var arrDate = thisDate.split("/");
            var dateToSet = arrDate[1] + '/' + arrDate[0] + '/' + arrDate[2];
            $(this).parents('tr').find('.clsActualDate').val(dateToSet);
        });
    });
    $('.editMilestone').click(function () {
        $(this).hide();
        $(this).parents('tr').find('.saveMilestone').show();
        $(this).parents('tr').find('.actualDate').attr("disabled", false);
        $(this).parents('tr').find('.remarks').attr("disabled", false);
    });
    $('.saveMilestone').click(function () {

        var newActualDate = toDate($(this).parents('tr').find('.actualDate').val());
        var newRemarks = $(this).parents('tr').find('.remarks').val();

        var actualDate = new Date($(this).parents('tr').find('.actualDate').attr('data-value'));
        var remarks = $(this).parents('tr').find('.remarks').attr('data-value');

        if (actualDate.toDateString() === newActualDate.toDateString() && remarks == newRemarks) {
            toastr.error("Please change actual date or remarks")
        }
        else if (actualDate.toDateString() != newActualDate.toDateString() && newRemarks == '') {
            toastr.error("Please enter remarks")
        }
        else {

            $(this).parents('tr').find('.frm_UpdateMilestone').submit();

            $(this).hide();
            $(this).parents('tr').find('.editMilestone').show();
            $(this).parents('tr').find('.actualDate').attr("disabled", true).attr('data-value', newActualDate);
            $(this).parents('tr').find('.remarks').attr("disabled", true).attr('data-value', newRemarks);
        }
    });
});
function toDate(dateStr) {
    var parts = dateStr.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]);
}
function OnUpdateSuccess() {
    toastr.success("Milestone updated successfully")
}
function OnUpdateError() {
    toastr.error("Error occured while updating Milestone")
}
