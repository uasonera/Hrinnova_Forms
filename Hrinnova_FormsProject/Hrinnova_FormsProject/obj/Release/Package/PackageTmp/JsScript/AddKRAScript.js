$(document).ready(function () {
    alert("hello");
    ClearControls();
    var SelectedObjectiveID;

    //call ajax to get Objective list to fill dropdown.
    $.ajax({
        url: "../KRA/AddKRA.aspx/GetObjectiveList",
        type: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (jsonData) {
            var obj = jQuery.parseJSON(jsonData.d);
            $("#ddlObjective").append($("<option></option>").val("0").html("Please select"));
            for (var i = 0; i < obj.length; i++) {
                $("#ddlObjective").append($("<option></option>").val(obj[i].ObjectiveID).html(obj[i].ObjectiveTitle));
            }
        },
        error: function (response) {
            alert(response.responseText);
        }
    });


    //fill text box with the selective objective value and background as Objective background color.
    $("#ddlObjective").bind("change", function (e) {
        SelectedObjectiveID = $("#ddlObjective option:selected").val();
        var SelectedObjective = $("#ddlObjective option:selected").text();
        alert(SelectedObjective);
        e.preventDefault();
        var data = '{"ObjectiveID":"' + SelectedObjectiveID + '"}';
       
        if (SelectedObjectiveID != 0) {

            $.ajax({
                url: "../KRA/AddKRA.aspx/GetObjectiveBackgroundColor",
                type: "post",
                contentType: "application/json;charset=utf-8",
                data: '{"ObjectiveID":"' + SelectedObjectiveID + '"}',
                dataType: "json",
                success: function (jsonData) {
                    alert("success");
                    alert(jsonData.d.toString());
                    var color = jsonData.d.substr(1, (jsonData.d.length - 2));
                    alert(color);
                    $("#lblSelectedObjective").text(SelectedObjective).css("background-color", color);
                },
                error: function (response) {
                    alert(response.responseText);
                }
            });
        }
        else {
            $("#lblSelectedObjective").val("").css("background-color", "white");
        }
        //         $("#txtSelectedObjective").val(SelectedObjective).css("Backgroundcolor",);
    });


    //save data on button click event.
    $("#btnSave").click(function (e) {
        e.preventDefault();
        alert("save button clicked");
        var KRATitle = $("#txtKRATitle").val();
        var KRADescription = $("#txtKRADescription").val();
        alert(KRATitle);
        alert(KRADescription);

        if (SelectedObjectiveID != 0 && KRATitle.length > 0 && KRADescription.length > 0) {

            $.ajax({
                url: "../KRA/AddKRA.aspx/InsertKRADetail",
                type: "post",
                contentType: "application/json; charset=utf-8",
                data: '{ "ObjectiveID": "' + SelectedObjectiveID + '", "KRATitle": "' + KRATitle + '", "KRADescription": "' + KRADescription + '" }',
                dataType: "json",
                success: function (jsonData) {
                    if (jsonData.d == true) {
                        $("#lblMessage").text("KRA saved successfully.").addClass("green-msg");
                    }
                    else if (jsonData.d == false) {
                        $("#lblMessage").text("KRA already exists.").addClass("yellow-error");
                    }
                },
                error: function (response) {
                    alert(response.responseText);
                }

            });
        }
        else {

        }

    });

    //clear all data on button cancel event.
    $("#btnCancel").click(function (e) {
        e.preventDefault();
        ClearControls();
    });

    //function clear controls to clear all controls in the page AddKRA.
    function ClearControls() {
        $("#ddlObjective").val("");
        $("#txtKRATitle").val("");
        $("#txtKRADescription").val("");
        $("#lblSelectedObjective").val("").css("background-color", "white");
        $("#vs").empty();
        $("#lblMessage").text("").removeClass('alert alert-success');
        $("#lblMessage").text("").removeClass('alert alert-warning');
    }

});