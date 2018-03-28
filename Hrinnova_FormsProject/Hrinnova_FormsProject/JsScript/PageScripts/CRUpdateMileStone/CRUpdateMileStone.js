$(document).ready(function () {
    $('.ExpectedDate').datepicker({ autoclose: true, format: genericDateFormate });

    $(".Enablefield").click(function () {
        var Actualdate = $(this).closest("tr").find('td').find('.ExpectedDate');
        var remarks = $(this).closest("tr").find('td').find('.remarks');
        var editbutton = $(this).closest("tr").find('td').find('.Editmilestone');
        Actualdate.prop('disabled', false);
        remarks.prop('disabled', false);
        editbutton.css("display", "block");
        $(this).css("display", "none");
    });

    $(".Editmilestone").click(function () {
        var Actualdate = $(this).closest("tr").find('td').find('.ExpectedDate').val();
        var remarks = $(this).closest("tr").find('td').find('.remarks').val();
        var ExpectedDate = $(this).closest("tr").find('td:eq(3)').text();
        var status = true;
        var strErrorMessage = "";
        var postData = {
            IsPINMilestone: false,
            ChangeRequestMilestoneID: $(this).attr('id'),
            AcctualDate: Actualdate,
            IsCompleted: false,
            Remarks: remarks,
        }
        var editbutton = $(this).closest("tr").find('td').find('.Enablefield');
        var objThis = $(this);

        if (Actualdate == "") {
            strErrorMessage += "<li>Please Select Actual Date </li>";
            status = false;
        }
        if (status) {
            $.ajax({
                url: '/CRUpdateMileStone/updatemilestoneproject',
                type: "POST",
                data: JSON.stringify({ CRUpdateMileStoneModel: postData }),
                contentType: "application/json; charset=utf-8",
                processData: false,
                success: function (data) {
                    toastr.success("Milestone updates successfully");
                    objThis.css("display", "none");
                    editbutton.css("display", "block");
                    objThis.closest("tr").find('td').find('.ExpectedDate').prop('disabled', true);
                    objThis.closest("tr").find('td').find('.remarks').prop('disabled', true);
                }
            });
        }
    });


    $(".completemilestone").click(function () {

        $('#Validation').html('');
        $('#Validation').hide();

        var objThis = $(this);

        var ChangeRequestMilestoneID = $(this).closest("tr").find('td').find('.Editmilestone').attr('id');
        var Complete = true;
        var ChangeRequestMilestonename = $(this).closest("tr").find("td:eq(0)").html();
        var Actualdate = $(this).closest("tr").find('td').find('.ExpectedDate').val();

        if (Actualdate == "") {
            Actualdate = $(this).closest("tr").find("td:eq(3)").html()
        }
        var remarks = $(this).closest("tr").find('td').find('.remarks').val();
        var Fileuploadid = $(this).closest("tr").find('td').find('.clscrdoc').attr('id');
        var FileName = $("#" + Fileuploadid)[0].files[0];
        var vlaue = $("#" + Fileuploadid).val();
        var IsPINMilestone = false;
        var status = true;
        var strErrorMessage = "";
        if (vlaue == "") {
            strErrorMessage += "<li>Please Upload Acceptance Note </li>";
            status = false;
        }
        if (FileName == "") {
            strErrorMessage += "<li>Please Upload Acceptance Note </li>";
            status = false;
        }
        if (status) {
            var formData = new FormData();
            formData.append('IsPINMilestone', IsPINMilestone);
            formData.append('ChangeRequestMilestoneID', ChangeRequestMilestoneID);
            formData.append('AcctualDate', Actualdate);
            formData.append('IsCompleted', Complete);
            formData.append('Remarks', remarks);
            formData.append('File', FileName);
            formData.append('ChangeRequestMilestonename', ChangeRequestMilestonename);
            $.ajax({
                url: '/CRUpdateMileStone/setcompleteprojectmiletone',
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: function (data) {
                    toastr.success("Change Request Milestone has been completed successfully");
                    window.location.reload();
                }
            });
        }
        else {
            $('#Validation').css('display', 'block');
            $('#Validation').html("<ul>" + strErrorMessage + "</ul>");
            $('ul li:empty').remove();
            $(this).attr('checked', false);
        }
    });




});

function showname(obj) {
    $(obj).closest("tr").find('td').find('.clsCrUploadName').show();
    $(obj).closest("tr").find('td').find('.clsCrUploadName').text(obj.files.item(0).name);
};









