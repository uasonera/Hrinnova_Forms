
$(document).ready(function () {
    
   
    $('.hiddenduedate').datepicker();
    $('.btnSearch').click(function () {
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
            var CurrentControlID = "txtSearch";
            $("#WorkItemListing .treegrid-row").show();
            $("#WorkItemListing .treegrid-expander").show();
            if ($("#txtSearch").val() != "") {
                $("#WorkItemListing .treegrid-expander").hide();
                $("#WorkItemListing .treegrid-row p").each(function () {
                    if ($(this)[0].innerHTML.toUpperCase().indexOf($("#txtSearch").val().toUpperCase()) >= 0 || $($(this)[0]).data("ticketnumber").toUpperCase().indexOf($("#txtSearch").val().toUpperCase()) >= 0) {
                        $(this).closest('tr').show();
                    }
                    else {
                        $(this).closest('tr').hide();
                    }
                });
            }
            ResetFilters(CurrentControlID);
        } else {
            window.location.reload();
        }
    });
    $('#txtDueDate').change(function () {
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
            var CurrentControlID = "txtDueDate";
            var dateValue = moment($(this).val(), "MM/DD/YYYY");
            $("#WorkItemListing .treegrid-row").show();
            $("#WorkItemListing .treegrid-expander").show();
            if ($("#txtDueDate").val() != "") {
                $("#WorkItemListing .treegrid-expander").hide();
                $("#WorkItemListing .treegrid-row").each(function () {
                    if ($(this).data("duedate") != "N/A") {
                        var FromDate = moment($(this).data("duedate"), "DD-MMM-YYYY");
                        if (FromDate == dateValue || FromDate.isBefore(dateValue)) {
                            $(this).closest('tr').show();
                        }
                        else {
                            $(this).closest('tr').hide();
                        }
                    }
                    else {
                        $(this).closest('tr').hide();
                    }

                });
            }
            ResetFilters(CurrentControlID);
        } else {
            window.location.reload();
        }
    });
    $("#drpWorkItemType").change(function () {
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
            var CurrentControlID = $(this).attr("id");
            $("#WorkItemListing .treegrid-row").show();
            var CurrentType = $(this).val();
            if (CurrentType != "") {
                $("#WorkItemListing .treegrid-row").each(function () {
                    if ($(this).data("workitemtype") == CurrentType) {
                        $(this).show();
                    }
                    else
                        $(this).hide();
                });
            }
            ResetFilters(CurrentControlID);
        } else {
            window.location.reload();
        }
    });
    $(".AddFromBackLog").click(function () {
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
            if ($("#drpIterations").val() == "") {
                toastr.error("Please select Iteration");
            }
            else {
                $.ajax({
                    type: "POST",
                    url: "SetCurrentState",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({ Type: $("#drptypes").val(), CurrentIteration: $("#drpIterations").val() }),
                    dataType: "json",
                    async:false,
                    success: function (e) {
                        window.location.href = "/iterative/MoveToIteration?Data=" + $("#drpIterations").val();
                    }
                })
                
            }
        } else {
            window.location.reload();
        }
    });
    $(".AddNewItemToIteration").click(function () {
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
            if ($("#drpIterations").val() == "") {
                toastr.error("Please select Iteration");
            }
            else {
                AddEditTask(ProjectId, 0, false, $("#drpIterations").val());
                $('#AddTaskModal').modal('toggle');
            }
        } else {
            window.location.reload();
        }
    });
    function ResetFilters(CurrentControlID) {
        $(".filter").each(function () {
            if ($(this).attr("id") != CurrentControlID) {
                $(this).val("");
            }
        });
        $(".filter").trigger("chosen:updated");

        if ($("#backlog-tab table tr").filter(':visible').length == 0) {
            $(".DvNoRecord").show();
        }
        else
            $(".DvNoRecord").hide();
    }
    $("#drpTags").change(function () {
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
            var CurrentControlID = $(this).attr("id");
            $("#WorkItemListing .treegrid-row").show();
            $("#WorkItemListing .treegrid-expander").show();
            var CurrentTag = $(this).val().toUpperCase();
            if (CurrentTag != "") {
                $("#WorkItemListing .treegrid-expander").hide();
                $("#WorkItemListing .treegrid-row").each(function () {
                    var TaskTag = $(this)[0].innerHTML.toUpperCase();
                    if (TaskTag.indexOf(CurrentTag) >= 0)
                        $(this).show();
                    else
                        $(this).hide();
                });
            }
            ResetFilters(CurrentControlID);
        } else {
            window.location.reload();
        }
    });

    $("#drpPriority").change(function () {
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
            var CurrentControlID = $(this).attr("id");
            $("#WorkItemListing .treegrid-row").show();
            var CurrentPriority = $(this).val();
            if (CurrentPriority != "") {
                $("#WorkItemListing .treegrid-row").each(function () {
                    if ($(this).data("priority") == CurrentPriority) {
                        $(this).show();
                    }
                    else
                        $(this).hide();
                });
            }
            ResetFilters(CurrentControlID);
        } else {
            window.location.reload();
        }
    });
    $("#drptypes").change(function () {
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
            $(".btnIteration").hide();
            $(".hidedates").hide();
            $("#lblStart").html("N/A");
            $("#lblEnd").html("N/A");
            AttachNoRecordRow();
            LoadIterations($(this).val());
            $(".chosen-select").trigger("chosen:updated");
        } else {
            window.location.reload();
        }
    });

    function GetIterationDetails(Iteration) {
        var Position = $(document).scrollTop();
        
        $.ajax({
            type: "POST",
            url: "gantt",
            dataType: 'html',
            data: "{'Iteration':'" + parseInt(Iteration) + "'}",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                ShowProgress();
            },
            success: function (data) {
                $("#TaskListing").empty().html(data);
               // $("#TaskListing").empty().html(data);
                ej.widget.init($("#TaskListing"));
                HideProgress();
                $(document).scrollTop(Position);               
            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload();
            }
        });

        $.ajax({
            type: "POST",
            url: "GetIterationDetails",
            dataType: 'json',
            data: "{'Iteration':'" + parseInt(Iteration) + "'}",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $("#lblactualstart").html(data.ActualStartDate);
                $("#lblStart").html(data.StartDate);
                $("#lblEnd").html(data.EndDate);
                $(".btnIteration").removeClass().addClass("btnIteration btn btn-aqua");

                if (!data.Active && data.TotalItems > 0) {
                    $(".hidedates").show();
                    $(".btnIteration").show();
                    $(".btnIteration").html("<i class='fa fa-thumbs-up'></i> Start").addClass("StartIteration").attr('data-iterationId', parseInt(Iteration));
                    // $("#DeleteIteration").show();
                }
                else if (data.Active) {
                    $(".hidedates").show();
                    $(".btnIteration").show();
                    $(".btnIteration").html("<i class='fa fa-thumbs-up'></i> Complete").addClass("CompleteIteration").attr('data-iterationId', parseInt(Iteration));
                    //$("#DeleteIteration").hide();
                }

                if (data.TotalItems == 0)
                    $(".btnIteration").hide();
            }
        });


    }
    function AttachNoRecordRow() {
        $("#TaskListing").html("<div class='alert alert-info'>No Records Found</div>");
    }
    $("#drpIterations").change(function () {

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

           
            //setTimeout(function () {
            //    $(".loader-wrapper").hide('blind', {}, 50)
            //}, 3000);
            var position = $(window).scrollTop();
            if ($(this).val() != "") {
                ShowProgress();
                GetIterationDetails($(this).val());
            }
            else {
                $(".btnIteration").hide();
                $("#lblStart").html("N/A");
                $("#lblEnd").html("N/A");
                AttachNoRecordRow();
            }
            $(window).scrollTop(position);
        } else {
            window.location.reload();
        }
    });
    $("#txtSearch").on('keypress', function () {
        $("#closesearch").css("display", "none");
        if ($(this).val() != null) {
            $("#closesearch").css("display", "block");
        }
        else {
            $("#closesearch").css("display", "none");
            var CurrentControlID = "txtSearch";
            $("#txtSearch").val("");
            ResetFilters(CurrentControlID)
        }
    });
    $("#closesearch").click(function () {
        $(this).css("display", "none");
        $("#txtSearch").val("");
        $('.btnSearch').click();
    });
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
            if ($("#drpIterations").val() == "") {
                toastr.clear();
                toastr.error("Please select Iteration");
            }
            else {
                $.ajax({
                    type: "POST",
                    url: "RecalculatePercentageComplition",
                    dataType: 'json',
                    beforeSend: function () {
                        ShowProgress();
                    },
                    data: "{'Iteration':'" + parseInt($("#drpIterations").val()) + "'}",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        HideProgress();
                        toastr.clear();
                        toastr.success("Progress recalculated successfully.");
                        GetIterationDetails($("#drpIterations").val());
                    }
                });
            }
        } else {
            window.location.reload();
        }
    });
    function LoadIterations(IterationType) {
        if (IterationType == "") {
            $("#drpIterations option:gt(0)").remove();
        }
        else {
            $.ajax({
                type: "POST",
                url: urlGetSprintByType,
                dataType: 'json',
                data: "{'CurrentSprint':'" + IterationType + "'}",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    $("#drpIterations option:gt(0)").remove();
                    $.each(data.Iterations, function (index, item) {
                        $('#drpIterations').append($('<option></option>').val(item.SprintId).html(item.Title));
                    });
                    $('#drpIterations').trigger("chosen:updated");
                }
            });
        }
    }
});
function AddThumbnails(TaskID) {

    $.ajax({
        type: "POST",
        url: "/Task/GetAttachments",
        data: '{ "TaskID":"' + TaskID + '"}',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {

            var Result = data.Data;
            var ImagePath;
            $.each(Result, function () {

                var image = new Image();
                var path = $(this)[0].Path;
                var AttachmentID = $(this)[0].AttachmentID;
                var pathDefault = '../Documents/Task/';
                image.src = '../Documents/Task/Thumbnail/' + $(this)[0].Path;
                var Doc_Name = $(this)[0].DocumentName;
                $.get(image.src).done(function () {
                    ImagePath = image.src;

                    $('<div class="ClsThumbnail" id="divAttachment_' + AttachmentID + '"><a href="' + pathDefault + path + '" target="_blank" download><img src="' + ImagePath + '" width="70px" height="70px" data-OriginalPath="' + path + '" data-toggle="tooltip" title="click to download"/></a> <span>' + Doc_Name + '</span><br><button type="button" class="btn btn-danger btn-xs deleteTaskAttachment" data-attachmentName="' + Doc_Name + '"  data-attachmentId="' + AttachmentID + '"><i class="fa fa-trash no-margin"></i></button></div>').appendTo($(".upload-drop-zone"));
                }).fail(function () {

                    var Extension = getFileExtension(path);
                    if (Extension.indexOf("txt") >= 0)
                        ImagePath = "../Images/FileIcon_txt.png";
                    else if (Extension.indexOf("doc") >= 0 || Extension.indexOf("docx") >= 0)
                        ImagePath = "../Images/FileIcon_Word.png";
                    else if (Extension.indexOf("xls") >= 0 || Extension.indexOf("xlsx") >= 0)
                        ImagePath = "../Images/FileIcon_Excel.png";
                    else if (Extension.indexOf("pdf") >= 0)
                        ImagePath = "../Images/FileIcon_pdf.png";
                    else
                        ImagePath = "../Images/thumbnail-default.jpg";

                    $('<div class="ClsThumbnail" id="divAttachment_' + AttachmentID + '"><a href="' + pathDefault + path + '" download><img src="' + ImagePath + '" width="70px" height="70px" data-OriginalPath="' + path + '"  data-toggle="tooltip" title="click to download"/></a> <span>' + Doc_Name + '</span><br><button class="btn btn-danger btn-xs deleteTaskAttachment" type="button" data-attachmentName="' + Doc_Name + '" data-attachmentId="' + AttachmentID + '"><i class="fa fa-trash no-margin"></i></button></div>').appendTo($(".upload-drop-zone"));
                })
            });

        }
    });

}