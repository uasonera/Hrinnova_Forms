$(document).ready(function () {
    $('#drpReleases').change(function () {        
        var index = $(this).val();
        if (index == 0) {
            $('#drpSprints').empty();
            $('#drpSprints').trigger("chosen:updated");
            $('#sprints').css('display', 'none')
            LoadReleaseSummary(0)//don't pass anything as we need to clear release selection
        }
        else {
            if (projectType != kanbanEnumValue) {
                $.ajax({
                    url: urlGetSprintsByRelease,
                    data: { releaseId: index },
                    async: false,
                    success: function (data) {
                        $('#drpSprints').empty();
                        $('#drpSprints').append('<option value="0">Select Sprint</option>');
                        if (data) {
                            $(data).each(function (key, value) {
                                var str = $('<option value="' + value.Value + '">' + value.Text + '</option>');
                                $('#drpSprints').append(str);
                            });
                        }
                        $('#drpSprints').trigger("chosen:updated");
                        $('#sprints').css('display', 'block')
                    }
                });
            }
            LoadReleaseSummary(index)
        }
        if (projectType == kanbanEnumValue)
        {
            $.ajax({
                type: "POST",
                url: "../PMSSummary/GetWorkItemListingforKanban",
                dataType: 'html',
                data: "{'ReleaseID':'" + $(this).val() + "'}",
                contentType: "application/json; charset=utf-8",                
                success: function (data) {                   
                    $("#dv-work-item").html(data);
                    $('#workItemLI').css('display', 'block')
                }
            });
        }
        

    });
    $('#drpSprints').change(function () {
        
        var index = $(this).val();
        var releaseId = $('#drpReleases').val();
        $('#summaryTitle').html("Sprint summary");

        //LoadReleaseSummary(releaseId)
        //GetWorkItemsByIteration(index)

        if (index == 0) {
            LoadReleaseSummary(releaseId)
            GetWorkItemsByIteration(index)
        }
        else {
            LoadSprintSummary(index)
            GetWorkItemsByIteration(index)
            // LoadPriorityChart(index);

        }
    });
    $('#drpIterations').change(function () {
        debugger
        var index = $(this).val();
        $('#summaryTitle').html("Iteration summary");
        if (index != 0) {
            LoadSprintSummary(index)
        }
        else {
            LoadProjectSummary();
        }
        GetWorkItemsByIteration(index);

    });
    //$(document).on('click', '.CalculatePercentages', function () {
    $(".CalculatePercentages").click(function () {

        var IsSession = false;
        $.ajax({
            url: '/AttendanceView/checkSessionTimeout',
            type: 'GET',
            contentType: 'application/json;charset=utf-8',
            async: false,
            dataType: 'json',
            success: function (data) {
                if (data) {
                    IsSession = true;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload();
            }
        });
        if (IsSession) {
            if ($("#drpIterations").val() == 0) {
                toastr.clear();
                toastr.error("Please select Iteration");
            }
            else {
                $.ajax({
                    type: "POST",
                    url: "/Iterative/RecalculatePercentageComplition",
                    dataType: 'json',
                    async: false,
                    data: "{'Iteration':'" + parseInt($("#drpIterations").val()) + "'}",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        toastr.clear();
                        toastr.success("Progress recalculated successfully.");
                        $('#lnkWorkItems').click();
                        setTimeout(function () { GetWorkItemsByIteration($("#drpIterations").val()) }, 100);
                    }
                });
            }
        } else {
            window.location.reload();
        }
    });
    function GetWorkItemsByIteration(Iteration) {
        if (projectType == IterativeEnumValue) {
            //if ($("#GanttContainer").length > 0) {
            //    $("#GanttContainer").ejGantt("destroy");
            //}
            if (Iteration > 0) {
                $.ajax({
                    type: "POST",
                    url: "../Iterative/ganttForSummary",
                    dataType: 'html',
                    async:false,
                    beforeSend: function () {
                        ShowProgress();
                    },
                    data: "{'Iteration':'" + parseInt(Iteration) + "'}",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        $('#summaryLI').css('display', 'inline-block');
                        $("#dv-work-item").empty().html(data);
                        ej.widget.init($("#dv-work-item"));
                        HideProgress();
                    }
                });
            }
            else {
                HideProgress();
                $("#dv-work-item").empty().html('');
            }
        }
        else {
            $.ajax({
                type: "POST",
                url: "../PMSSummary/GetWorkItemListingforSummary",
                dataType: 'html',
                data: "{'IterationId':'" + Iteration + "'}",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    ShowProgress();
                },
                success: function (data) {
                    HideProgress();
                    $("#dv-work-item").html(data);
                    $('#workItemLI').css('display', 'block')
                }
            });
        }
    }
});
function LoadSprintSummary(sprintId) {
    $.ajax({
        url: urlGetSummary,
        data: { SprintId: sprintId, ReleaseId: 0 },
        beforeSend: function () {
            ShowProgress();
        },
        async:false,
        success: function (data) {
            HideProgress();

            $('#sprint-summary').html(data);
            InitCustomScroll();
        }
    });
}
function LoadProjectSummary() {
    $.ajax({
        url: urlGetProjectSummary,
        //data: { SprintId: sprintId, ReleaseId: 0 },
        beforeSend: function () {
            ShowProgress();
        },
        success: function (data) {
            HideProgress();

            $('#sprint-summary').html('').html(data);
            $('#summaryTitle').html("Project summary");
            InitCustomScroll();
        }
    });
}
function LoadReleaseSummary(releaseId) {   
   // ShowProgress();
    $.ajax({
        url: urlGetSummary,
        data: { SprintId: 0, ReleaseId: releaseId },
        dataType: 'html',
        beforeSend: function () {
            ShowProgress();
        },
        success: function (data) {           
            $('#summaryTitle').html("Release summary");
            $('#sprint-summary').html(data).addClass('active in');
            $('#summaryLI').addClass('active');
            InitCustomScroll();
            
            $('#workItemLI').removeClass('active');
            $('#dv-work-item').removeClass('active in')
            HideProgress();
        }
    });
}

function InitCustomScroll() {
    $('.custom-scroll').mCustomScrollbar({
        scrollbarPosition: "inside",
        axis: "y",
        scrollInertia: 150,
        autoDraggerLength: true,
        autoExpandScrollbar: true,
        alwaysShowScrollbar: 0,
        updateOnContentResize: true
    });
}
function HideProgress() {
    $('.loader-wrapper').css('display', 'none');
}
function ShowProgress() {

    if ($('.loader-wrapper').css('display') == "none") {
        $(".loader-wrapper").show();
    }
}

function LoadPriorityChart(sprintId) {
    $.ajax({
        type: "POST",
        data: "{'SprintId':'" + sprintId + "'}",
        url: '/PMSSummary/SprintWisePriorityCount',
        dataType: "html",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            $('#dvPriorityChart').show();
            $('#dvPriorityChart').html(result);
            //custome_scroll_init();
            //dashbord_rowint();
        }
    });
}
