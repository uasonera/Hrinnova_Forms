$(document).ready(function () {
    //        $("#ctl00_Main_rdbAttendance")
    $("#rdbAttendance").change(function () {       
            
        if ($('input[id*=rdbAttendance_0]').is(":checked")) {

            $("#trAttendance").hide();
        }
        else if ($('input[id*=rdbAttendance_1]').is(":checked")) {

            $("#trAttendance").show();
        }
    });

    window.onload = function () {        

        if ($('input[id*=rdbAttendance_0]').is(":checked")) {

            $("#trAttendance").hide();
        }
        else if ($('input[id*=rdbAttendance_1]').is(":checked")) {

            $("#trAttendance").show();
        };

    }

});
function ValidateTime(sender, args) {
    //var avgTime = document.getElementById('<%=txtReqAvgHours.ClientID%>').value;
    var avgTime = $("#txtReqAvgHours").val();
    if (avgTime != '') {
        //                var tstrArr=avgTime.split(':');
        //                if(tstrArr[0]!='')
        //                {
        //                    
        //                }
    }
}
