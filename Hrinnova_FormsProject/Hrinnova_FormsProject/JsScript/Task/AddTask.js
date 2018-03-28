/// <reference path="../Constant/Constant.js" />
var isEditSuccessfull = false;
jQuery(function ($) {
    $(document).ready(function ($) {

        if (!$.fn.bootstrapDP && $.fn.datepicker && $.fn.datepicker.noConflict) {
            var datepicker = $.fn.datepicker.noConflict();
            $.fn.bootstrapDP = datepicker;
        }
        $("#txtWbsName").bind('paste', function () {
            setTimeout(function () {
                $('#txtWbsName').val($('#txtWbsName').val().replace(/[^\w\s]/gi, ''));
            });
        });
        InitializeEndDate(null);
        if (ProjectType == Enum_Iterative_ProjectType && $(".modal-body").find("#drpSprint").val() > 0) {
            $(".dvStartDate").show();
            $('#EstimatedEndDate').prop('disabled', true);
        }
        else {
            $(".dvStartDate").hide();
            $('#EstimatedEndDate').prop('disabled', false);
        }
        //BindTaskAttachmentDropzone();
        if ($("select").hasClass("chosen-select")) {
            $(".chosen-select").chosen({

            });
        }
        var isFormChange = true;
        //CKEDITOR.replace('Description1');
        //CKEDITOR.config.htmlEncodeOutput = true;

        //hide status if sprint id exists.
        CheckSprint($(".modal-body").find("#drpSprint").val());

        if (ProjectType == Enum_Kanban_ProjectType && WBSID > 0 && WorkItemTypeId == Enum_Sub_Task) {
            $(".dvParentTask").show();
        }
        else { $(".dvParentTask").hide(); }


        //$(".CharLimit").keyup(function () {
        //    $("#wbsErrorMsg").html('');
        //    if ($(this).val().length >= Constants.TitleLimit) {
        //        var new_text = $(this).val().substr(0, Constants.TitleLimit);
        //        $(this).val(new_text);
        //    }
        //});
        $(".CharLimitDesc").keyup(function () {
            $("#errorDesc").show();
            IsCharacherLimit($(".CharLimitDesc").val().length, 300);
        });



        $(".DateField").on("keydown", function () {
            return false;
        });
        $(".modal-body").on("change", "#drpSprint", function () {

            if (ProjectType == Enum_Scrum_ProjectType) {
                CheckSprint($(this).val());
                if ($(this).val() != '') {
                    if ($("#TempTaskTypeId").val().toString() == Enum_Story.toString()) {
                        $.ajax({
                            type: "POST",
                            url: "/Task/VerifyMaxSprints",
                            data: '{ "SprintId":"' + $(this).val() + '","ProjectID":' + ProjectId + '}',
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            success: function (data) {

                                if (!data.Success) {
                                    //$("#drpSprint").val("");
                                    $(".modal-body").find("#drpSprint").val('').trigger('chosen:updated');
                                    toastr.error(String.format(Constants.RestrictStory, data.TotalMaxStories));
                                }
                            }
                        });
                    }
                    else { GetSprintWiseStories(); }

                    if ($("#TempTaskTypeId").val().toString() == Enum_Story.toString() && $("#drpEpicID").val() > 0) {
                        //$("#EpicID").value('');
                        $('#drpEpicID').val('').trigger('chosen:updated');
                    }

                }
            }
            if (ProjectType == Enum_Iterative_ProjectType) {
                if ($(this).val() > 0) {
                    $(".dvStartDate").show();
                    //$("#EstimatedEndDate").attr('readonly', 'readonly');
                    $('#EstimatedEndDate').prop('disabled', true);
                }
                else {
                    //$("#EstimatedEndDate").removeAttr('readonly');
                    $('#EstimatedEndDate').prop('disabled', false);
                    $(".dvStartDate").hide();
                }
            }
        });

        FileformData = new FormData();
        var arrFiles = new Array();
        var dropZone = document.getElementById('drop-zone');

        var uploadForm = document.getElementById('js-upload-form');
        var startUpload = function (files) {
            for (var i = 0; i < files.length; i++) {
                var obj = {};
                arrFiles.push(files[i]);
                $("#my-awesome-dropzone").append("<div style='  border: 1px solid #D8D8D8;padding: 10px;margin: 5px 0px 5px 0px; ' >" + files[i].name + "<img src='../Images/close_Icon.png' height='15px' class='dlt' id=" + files[i].name + " style='float:right;cursor:pointer;'/><div>")
            }
        }

        $(document).on('change', '#TempTaskTypeId', function (e, updateEstimatedHrs) {
            debugger
            $('#WBSTaskTypeId').val($(this).val());
            if ($(this).val() == Enum_Story) {
                $(".dvstorySelect").hide();
                if (updateEstimatedHrs != "False") {
                    $("#Estimated_Hours").val('0');
                }

                $(".dvsprint").show();
                $(".dvWatcher").hide();
                $(".dvTags").show();
                $(".dvEstimatedHrs").show();
                if (ProjectType == Enum_Scrum_ProjectType) {
                    $(".dvEpic").show();
                } else {
                    $(".dvEpic").hide();
                }
                $("#storyRequire").text('');
            }
            else {
                $("#storyRequire").text('*');
                if (ProjectType == Enum_Scrum_ProjectType) {
                    if ($(this).val().toString() == Enum_Epic.toString()) {
                        $(".dvsprint").hide();
                        $(".dvstorySelect").hide();
                        $(".dvWatcher").hide();
                        $(".dvTags").hide();
                        $(".dvDueDate").hide();
                        $(".dvEstimatedHrs").hide();
                        if (updateEstimatedHrs != "False") {
                            $("#Estimated_Hours").val('0');
                        }
                    }
                    else {
                        //$("#Estimated_Hours").val('');
                        $(".dvsprint").show();//changed on 20-10-2016
                        $(".dvstorySelect").show();
                        $("#TempTaskStatusId").prop('selectedIndex', 0);
                        $(".dvWatcher").show();
                        $(".dvTags").show();
                        $(".dvDueDate").show();
                        $(".dvEstimatedHrs").show();
                        $(".dvParentTask").hide();
                    }
                    $(".dvEpic").hide();
                }
                else if (ProjectType == Enum_Kanban_ProjectType || ProjectType == Enum_Iterative_ProjectType) {

                    if ($(this).val().toString() == Enum_Sub_Task.toString() || $(this).val().toString() == (parseInt(Enum_Sub_Task) - 1)) {
                        $(".dvParentTask").show();
                        $(".dvsprint").hide();
                    }
                    else {
                        $(".dvsprint").show();
                        $("#drpStory").val("0");
                        $(".dvParentTask").hide();
                    }
                }
            }


        });
        $("#TempTaskTypeId").trigger("change", ["False"]);
        $(document).on('click', '.dlt', function () {
            arrFiles = RemoveElement(arrFiles, $(this).attr("id"));
            $(this).parent().remove();
        });

        function RemoveElement(arrFiles, FileName) {
            var FilteredList = arrFiles.filter(function (el) {
                return el.name !== FileName;
            });
            return FilteredList;
        }

        dropZone.ondrop = function (e) {
            e.preventDefault();
            this.className = 'upload-drop-zone';

            startUpload(e.dataTransfer.files)
        }

        dropZone.ondragover = function () {

            this.className = 'upload-drop-zone drop';
            return false;
        }

        dropZone.ondragleave = function () {
            this.className = 'upload-drop-zone';
            return false;
        }
        $("#EstimatedStartDate").bootstrapDP({
            changeMonth: false,
            changeYear: false,
            showWeek: false,
            firstDay: 1,
            showOn: "focus",
            //buttonImage: "../images/datepicker.gif",
            //buttonImageOnly: true,
            dateFormat: 'mm/dd/yy',
            daysOfWeekDisabled: [0, 6] //--disable Sat,Sun for ISM delivery
            //minDate: 0
            //defaultDate: new Date()
        });

        $('#EstimatedStartDate').bootstrapDP('setStartDate', new Date());
        if (ProjectType == Enum_Iterative_ProjectType) {
            $("#EstimatedEndDate").bootstrapDP({
                //minDate: StartDate,
                changeMonth: false,
                changeYear: false,
                showWeek: false,
                firstDay: 1,
                showOn: "focus",
                //buttonImage: "../images/datepicker.gif",
                //buttonImageOnly: true,
                dateFormat: 'mm/dd/yy',
                daysOfWeekDisabled: [0, 6]//--disable Sat,Sun for ISM delivery
            });
            $('#EstimatedEndDate').bootstrapDP('setStartDate', new Date());
        }
        $('#startdate').click(function () {
            $("#EstimatedStartDate").focus();
            $('#EstimatedStartDate').bootstrapDP('setStartDate', new Date());
        });
        if (Edit == true) {

            $("#TempTaskTypeId").attr("disabled", true);

        }
        else
            $("#TempTaskTypeId").attr("disabled", false);


        if ($("#EstimatedStartDate").val() != '')
            InitializeEndDate($("#EstimatedStartDate").val());

        $("#EstimatedStartDate").on("change", function () {
            $(this).datepicker('hide');
            var startDate = new Date();
            startDate = moment(startDate).format("MM/DD/YYYY");
            $("#EstimatedStartDate").bootstrapDP('setStartDate', new Date());
            InitializeEndDate($("#EstimatedStartDate").val());
            SetEstimatedEndDate($(this).val());
        });
        function InitializeEndDate(StartDate) {
            if (StartDate == '' || StartDate == null || StartDate == undefined) {
                StartDate = new Date();
            }
            $("#EstimatedEndDate").bootstrapDP("destroy");
            $("#EstimatedEndDate").bootstrapDP({
                minDate: StartDate,
                changeMonth: false,
                changeYear: false,
                showWeek: false,
                firstDay: 1,
                showOn: "focus",
                //buttonImage: "../images/datepicker.gif",
                //buttonImageOnly: true,
                dateFormat: 'mm/dd/yy',
                daysOfWeekDisabled: [0, 6]//--disable Sat,Sun for ISM delivery
            });
            $('#enddate').click(function () {
                $("#EstimatedEndDate").focus();
            });
            $("#EstimatedEndDate").bootstrapDP('setStartDate', new Date());
            $('#EstimatedEndDate').on('change', function (ev) {
                $(this).datepicker('hide');
            });
        }
        $('#js-upload-form').on('change', 'input, select', function () {
            isFormChange = false;
        });
        $(".close").click(function () {

            if (!isFormChange)
                if (confirm(Constants.ChangesGone))
                    return true;
                else
                    return false;
        });
        $(".btnTaskSave").click(function () {


            if ($(this).prop('disabled'))
                return false;
            $(this).prop('disabled', true);
            var VerifyButton = $(this).data("func");
            //var NameExist = false; Allowed duplication of name
            var IsSprintActive = true;
            ValidateDynamicContent($(this));
            var formData = null;
            $('#AddedViewer').trigger('chosen:updated');
            $('#AddedAssingees').trigger('chosen:updated');
            var $form = $(this).closest('form');
            formData = new FormData($form[0]);
            var Description = $("#Description1").val();
            $("#Description1").val(Description);
            var isValidForm = false;

            $("#errStory").text('');
            $("#errEpic").text('');
            $("#errParentType").text('');
            $("#errParentTask").text('');
            isValidForm = $form.valid();

            validateSprint = true;
            vlaidateEpicOrSprint = true;
            validateParentForSubTask = true;
            validateFileType = true;
            validateCharLength = true;
            if (ProjectType == Enum_Scrum_ProjectType && $("#TempTaskTypeId").val().toString() == Enum_Task.toString()) {
                validateSprint = validateStoryForSprint();
            }
            if (ProjectType == Enum_Scrum_ProjectType && $("#TempTaskTypeId").val().toString() == Enum_Story.toString()) {
                //vlaidateEpicOrSprint = validateEpicOrSprint(); commented as story can be added direct to backlog also
            }
            if (ProjectType == Enum_Kanban_ProjectType && $("#TempTaskTypeId").val().toString() == Enum_Sub_Task.toString()) {
                validateParentForSubTask = validateParentTasks();
            }
            if ($('input[id="js-upload-files"]')[0].files.length > 0) {
                validateFileType = checkFile($('input[id="js-upload-files"]')[0].files);
            }

            if (arrFiles != null && arrFiles.length > 0) {
                validateFileType = checkFileTypeForDrop(arrFiles);
            }
            //---validate Char length of Description again at save time
            validateCharLength = IsCharacherLimit($(".CharLimitDesc").val().length, 300);

            if (isValidForm && validateMandatory() && validateSprint && vlaidateEpicOrSprint && validateParentForSubTask && validateFileType && validateCharLength) {
                var ParentId = 0;
                if (ProjectType == Enum_Scrum_ProjectType && $("#TempTaskTypeId").val().toString() == Enum_Story.toString()) {
                    if ($("#drpEpicID").val() > 0) {
                        ParentId = $("#drpEpicID").val()
                    }
                }
                else {
                    ParentId = $("#drpStory").val() == undefined || $("#drpStory").val() == "" ? 0 : $("#drpStory").val();
                }
                var Sprint = $(".modal-body").find("#drpSprint").val() == undefined || $(".modal-body").find("#drpSprint").val() == "" ? 0 : $(".modal-body").find("#drpSprint").val();
                if (ProjectType == Enum_Iterative_ProjectType) {
                    if ($("#TempTaskTypeId").val().toString() != Enum_Sub_Task.toString() && $("#TempTaskTypeId").val().toString() != (parseInt(Enum_Sub_Task) - 1).toString()) {
                        $("#drpStory").val("0");
                    }
                }

                var Proceed = true;
                /*if (ProjectType != Enum_Iterative_ProjectType) {
                    if (CheckMaxTask() == false) {
                        if (ProjectType == Enum_Scrum_ProjectType)
                            Proceed = confirm(Constants.MaxTask);
                        else {
                            toastr.error(Constants.MaxTask_ChangeStatus);
                            Proceed = false;
                        }
                    }
                }*/
                //$.ajax({
                //    type: "POST",
                //    url: "/Task/CheckIfNameAlreadyExist",
                //    data: '{ "WbsName":"' + $("#txtWbsName").val() + '","WBSID": ' + WBSID + ',"ProjectId":' + ProjectId + '}',
                //    dataType: "json",
                //    contentType: "application/json; charset=utf-8",
                //    async: false,
                //    success: function (data) {
                //        if (data) {
                //            $("#wbsErrorMsg").html(Constants.TitleExists);
                //            NameExist = true;

                //            $('#AddedViewer').trigger('chosen:updated');
                //            $('#AddedAssingees').trigger('chosen:updated');
                //        }
                //    }
                //});
                /*If Sprint/Story changes or Adding Task*/
                if (ProjectType != Enum_Kanban_ProjectType && Sprint > 0) {
                    //if (WBSID == 0 || ($("#TempTaskTypeId").val() != Enum_Story && $("#drpStory").val() != undefined && StoryId != $("#drpStory").val() && $("#drpStory").val() != "0" ) || CurrSprintId != Sprint) {                
                    if ($(".modal-body").find("#drpSprint").val() != "" && (($("#drpStory").val() != "0" && WBSID == 0) || ($("#TempTaskTypeId").val() != Enum_Story && $("#drpStory").val() != undefined && StoryId != $("#drpStory").val() && $("#drpStory").val() != "0") || CurrSprintId != Sprint)) {
                        $.ajax({
                            type: "POST",
                            url: "/Task/CheckIfSprintIsActive",
                            data: '{ "ParentID":"' + ParentId + '","SprintId": ' + Sprint + '}',
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            async: false,
                            success: function (data) {

                                if (data.IsActive) {
                                    var strConfirm = '';
                                    if (ProjectType == Enum_Iterative_ProjectType) {
                                        strConfirm = Constants.IterationActive;
                                    }
                                    else {
                                        strConfirm = Constants.SprintActive;
                                    }
                                    IsSprintActive = confirm(strConfirm);
                                    $('#AddedViewer').trigger('chosen:updated');
                                    $('#AddedAssingees').trigger('chosen:updated');
                                }
                            }
                        });
                    }
                }
                else
                    IsSprintActive = true;
                if (!IsSprintActive || !Proceed) {
                    $(this).prop('disabled', false);
                    return false;
                }
                if (IsSprintActive) {

                    var that = $(this);
                    for (var i = 0; i < arrFiles.length; i++) {
                        FileformData.append(arrFiles[i].name, arrFiles[i]);
                    }
                    var Arr_Viewers = new Array();


                    Arr_Viewers = $(".AddedViewer").val();

                    if (Arr_Viewers != null) {
                        Arr_Viewers = Arr_Viewers.filter(function (el) {
                            return el !== 'multiselect-all' && el !== '';
                        });
                    }
                    else { Arr_Viewers = ''; }

                    var Arr_Assignee = new Array();
                    if (ProjectType == Enum_Iterative_ProjectType) {

                        $("#Assignee option:selected").each(function () {
                            Arr_Assignee.push($(this).attr("value"));
                        })

                        //if (Arr_Assignee != null) {
                        //    Arr_Assignee = Arr_Assignee.filter(function (el) {
                        //        return el !== 'multiselect-all' && el !== '';
                        //    });
                        //}
                    }
                    if (Arr_Assignee == null || Arr_Assignee.length == 0) {
                        Arr_Assignee = "";
                    }
                    var Tags = "";
                    if ($("#myTags").find('li').length > 1) {
                        $("#myTags").find('.tagit-choice').each(function () {

                            if ($(this).find('.tagit-label').html() != undefined)
                                Tags = Tags + "," + $(this).find('.tagit-label').html();
                        });
                    }

                    var disabled = $form.find(':input:disabled').removeAttr('disabled');

                    var serializedData = $form.serialize();

                    disabled.attr('disabled', 'disabled');

                    $.ajax({
                        type: "POST",
                        url: $form.attr('action'),
                        data: serializedData + "&MultipleViewers=" + Arr_Viewers + "&EnteredTags=" + Tags + "&parentids=" + parseInt(ParentId) + "&MultipleAssignees=" + Arr_Assignee,
                        traditional: true,
                        async: false,
                        success: function (data) {
                            if (data.Success) {
                                if (typeof TabId === 'undefined' || TabId == 0) { } else {
                                    if (TabId.indexOf('sprints') != -1 && ProjectType == Enum_Scrum_ProjectType) {
                                        var SprintType = $('#SprinType').val();
                                        var releaseID = $('#drpRelease').val();
                                        GetReleasewiseSprintWorkitems(SprintType, "", releaseID, true);

                                        if (TabId.indexOf('right') != -1) {
                                            GetWorkItemDetails(data.TaskID, '#sprints-tabRightPanel');
                                        }

                                    }
                                    else if (TabId.indexOf('backlog') != -1 && ProjectType == Enum_Scrum_ProjectType) {
                                        var EpicType;
                                        FillTagsDrp("#drpTags");
                                        if (TabId.indexOf('right') != -1) {
                                            GetWorkItemDetails(data.TaskID, '#backlog-tabRightPanel');

                                        }

                                        if (data.TaskType == Enum_Epic) {
                                            GetUpdatedEpics();
                                            //$('#EpicID').val(data.TaskID).trigger('chosen:updated'); //for issue : 60192
                                            //$('#EpicName').text($("#EpicID option:selected").text());
                                        }
                                        if ($('#EpicID').val() > 0) {
                                            var epicid = $("#EpicID").val();
                                            //GetUpdatedEpics();
                                            $('#EpicID').val(epicid).trigger('chosen:updated');
                                            $('#EpicName').text($("#EpicID option:selected").text());

                                            EpicType = Enum_Epic_EpicType
                                            GetBacklogItemList($('#EpicID').val(), EpicType, "");
                                        }
                                        else {
                                            EpicType = $('#EpicID').val();
                                            GetBacklogItemList(0, EpicType, "");
                                        }

                                    }
                                    else if (TabId.indexOf('plansprint') != -1) {
                                        FillTagsDrp("#drpTagsSprint");
                                        var sprintId = $(".modal-body").find("#drpSprint").val();
                                        var sprintType = $("#ManageSprinType").val();
                                        var ReleaseId = $('#ReleaseId').val();
                                        if (sprintId == "" || sprintId == undefined) { sprintId = 0; }
                                        GetSprintWiseWorkitems(sprintType, "", ReleaseId, sprintId)
                                    }
                                    else if (TabId.indexOf('backlog') != -1 && ProjectType == Enum_Kanban_ProjectType) {
                                        var EpicType = 0;
                                        if (TabId.indexOf('right') != -1) {
                                            GetWorkItemDetails(data.TaskID, '#backlog-tabRightPanel');
                                        }
                                        FillTagsDrp("#drpTags");
                                        GetBacklogItemListForKanban(0, EpicType, "");
                                    }
                                }

                                toastr.success(String.format(Constants.TaskSave, $("#txtWbsName").val()));
                                for (var i = 0; i < $('input[id="js-upload-files"]')[0].files.length; i++) {

                                    FileformData.append($('input[id="js-upload-files"]')[0].files[i].name, $('input[id="js-upload-files"]')[0].files[i]);
                                }

                                SendFiles(FileformData, data.TaskID);
                                DeleteFiles();
                                var CurrentURL = window.location.hrefAddEditTask
                                if (window.location.href.toString().toLowerCase().indexOf("iterativebacklog") > 0 && ProjectType == Enum_Iterative_ProjectType) {
                                    if ($("#TnItr").attr('aria-expanded') == "true") {
                                        $("#drpIterations").trigger("change");

                                    }
                                    else {
                                        $.ajax({
                                            type: "POST",
                                            url: "GetListing",
                                            dataType: 'html',
                                            data: "",
                                            async: false,
                                            success: function (data) {
                                                $("#WorkItemListing").html(data);

                                                $("#WorkItemListing table").attr("id", "TaskListingTable");
                                                $("#TaskListingTable").treegrid({});
                                                $("#TaskListingTable").removeClass("multi-select");
                                                $("#TaskListingTable").find('tr').each(function () {
                                                    $(this).find("td:eq(0)").remove();
                                                });
                                                $(".treegrid-row").each(function () {
                                                    if ($(this).data('child') == "1") {
                                                        var ParentID = $(this).data("parent-id");
                                                        $(this).insertAfter($(".treegrid-alfa-" + ParentID));
                                                        $(this).find("div.checkbox").remove();
                                                    }
                                                });
                                                $('#AddTaskModal').modal('hide');
                                                $(".sidebar-toggle").trigger("click");
                                            }
                                        });
                                    }
                                }
                                $('#AddTaskModal').modal('hide');
                                isEditSuccessfull = true;
                                //if (VerifyButton) {
                                //    ;(ProjectId, ParentId, false);
                                //}
                                //else {
                                //     
                                //    $('#AddTaskModal').modal('toggle');
                                //    if (window.location.href.toString().toLowerCase().indexOf("viewtask") > 0) {

                                //        window.location = CurrentURL;

                                //    }
                                //    else if (window.location.href.toString().toLowerCase().indexOf("dashboard") > 0) {

                                //        var projectID = $("#ProjectID").val();

                                //        if (ProjectType == Enum_Scrum_ProjectType) {
                                //            var sprintId = $("#ddlSprint").val();
                                //            $.ajax({
                                //                type: "POST",
                                //                url: urlGetSprintData,
                                //                data: '{ "ProjectId": "' + projectID + '","SprintId": "' + sprintId + '","isRecentUpdate":"false"}',
                                //                dataType: "html",
                                //                contentType: "application/json; charset=utf-8",
                                //                success: function (data) {
                                //                    $("#txtSearch").val('');
                                //                    $("#dvDashboard").html(data);
                                //                    ExpandColumn();
                                //                    var height = $(window).height();
                                //                    $(".kanban-dashboard-con").attr('style', 'height:' + parseInt(height - 225) + "px;");
                                //                    $(".kanban-task-con .task-panel-list").attr('style', 'height:' + parseInt(height - 350) + "px;");
                                //                    $(".kanban-task-con .task-data-panel").attr('style', 'height:' + parseInt(height - 242) + "px;");
                                //                    $(".mCustomBoardScrollbar").mCustomScrollbar({
                                //                        scrollButtons: { enable: true },
                                //                        scrollbarPosition: "outside",
                                //                        advanced: {
                                //                            updateOnBrowserResize: true,
                                //                            updateOnContentResize: true
                                //                        },
                                //                    });

                                //                    $("#dvNewTaskStatus").hide();
                                //                    $("#lnkAddStatus").show();
                                //                    if ($("#TempTaskTypeId").val() != 1) {
                                //                        var storyId = $("#drpStory").val();

                                //                        if (storyId != "") {
                                //                            if ($('.story-' + storyId) != undefined) {
                                //                                $("span.add").not($(this)).removeClass('current');
                                //                                $("#story-" + storyId).find('.add').addClass('current');
                                //                                $(".data-show").hide();
                                //                                $(".story-" + storyId).show('slow');
                                //                            }
                                //                        }
                                //                    }
                                //                }
                                //            });
                                //        }
                                //        else {
                                //            var SearchValue = $("#txtSearch").val();
                                //            var taskTypeId = $("#TempTaskTypeId").val();
                                //            if (taskTypeId == "")
                                //                taskTypeId = 0;
                                //            var SprintId = $("#ddlSprint").val();

                                //            var Arr_TeamMembers = new Array();
                                //            Arr_TeamMembers = $("#ddlTeamMember").val();
                                //            if (Arr_TeamMembers != null) {
                                //                Arr_TeamMembers = Arr_TeamMembers.filter(function (el) {
                                //                    return el !== 'multiselect-all';
                                //                });
                                //            }
                                //            var sprintId = $("#ddlSprint").val();
                                //            var isRecentUpdate = false;
                                //            if ($("#ddlWork").val() == 0) {
                                //                isRecentUpdate = false;
                                //            }
                                //            if ($("#ddlWork").val() == -1) {
                                //                $("#txtSearch").val('');
                                //                isRecentUpdate = false;
                                //            }
                                //            if ($("#ddlWork").val() == 1) {
                                //                isRecentUpdate = true;
                                //            }
                                //            if (sprintId == undefined) sprintId = 0;
                                //            $.ajax({
                                //                type: "POST",
                                //                url: urlGetKanbanTaskPanel,
                                //                data: '{ "TaskStatusId":"' + IntialTaskStatusId + '","ProjectId": "' + ProjectId + '","SearchKey": "' + SearchValue + '","TaskTypeID": "' + 0 + '","SprintId":"' + sprintId + '","isRecentUpdate":"' + isRecentUpdate + '","teamMember":"' + Arr_TeamMembers + '"}',
                                //                dataType: "html",
                                //                contentType: "application/json; charset=utf-8",
                                //                success: function (data) {
                                //                    $("#dvTaskStatus-" + IntialTaskStatusId).empty().html(data);
                                //                    ExpandColumn();
                                //                    var height = $(window).height();
                                //                    $(".kanban-dashboard-con").attr('style', 'height:' + parseInt(height - 225) + "px;");
                                //                    $(".kanban-task-con .task-panel-list").attr('style', 'height:' + parseInt(height - 350) + "px;");
                                //                    $(".kanban-task-con .task-data-panel").attr('style', 'height:' + parseInt(height - 242) + "px;");
                                //                    $(".mCustomBoardScrollbar").mCustomScrollbar({
                                //                        scrollButtons: { enable: true },
                                //                        scrollbarPosition: "outside",
                                //                        advanced: {
                                //                            updateOnBrowserResize: true,
                                //                            updateOnContentResize: true
                                //                        },
                                //                    });
                                //                    initSort($('.connectedSortable'));
                                //                }
                                //            });
                                //            if ($("#TempTaskStatusId").val() != IntialTaskStatusId) {
                                //                $.ajax({
                                //                    type: "POST",
                                //                    url: urlGetKanbanTaskPanel,
                                //                    data: '{ "TaskStatusId":"' + $("#TempTaskStatusId").val() + '","ProjectId": "' + ProjectId + '","SearchKey": "' + SearchValue + '","TaskTypeID": "' + 0 + '","SprintId":"' + sprintId + '","isRecentUpdate":"' + isRecentUpdate + '","teamMember":"' + Arr_TeamMembers + '"}',
                                //                    dataType: "html",
                                //                    contentType: "application/json; charset=utf-8",
                                //                    success: function (data) {
                                //                        $("#dvTaskStatus-" + $("#TempTaskStatusId").val()).empty().html(data);
                                //                        ExpandColumn();
                                //                        var height = $(window).height();
                                //                        $(".kanban-dashboard-con").attr('style', 'height:' + parseInt(height - 225) + "px;");
                                //                        $(".kanban-task-con .task-panel-list").attr('style', 'height:' + parseInt(height - 350) + "px;");
                                //                        $(".kanban-task-con .task-data-panel").attr('style', 'height:' + parseInt(height - 242) + "px;");
                                //                        $(".mCustomBoardScrollbar").mCustomScrollbar({
                                //                            scrollButtons: { enable: true },
                                //                            scrollbarPosition: "outside",
                                //                            advanced: {
                                //                                updateOnBrowserResize: true,
                                //                                updateOnContentResize: true
                                //                            },
                                //                        });
                                //                        initSort($('.connectedSortable'));
                                //                    }
                                //                });
                                //            }
                                //        }

                                //    }
                                //    else if (window.location.href.toString().toLowerCase().indexOf('plansprints') > 0) {
                                //        var projectID = $("#ProjectID").val();
                                //        $.ajax({
                                //            type: "POST",
                                //            url: urlSearchProductBacklog,
                                //            dataType: 'html',
                                //            data: "{'ProjectId':'" + projectID + "','SearchKey':''}",
                                //            contentType: "application/json; charset=utf-8",
                                //            success: function (data) {
                                //                $('#dvPlanSprintView').html(data);
                                //                setScrolling();
                                //                setScrollHeight();
                                //                bindAllEvents();
                                //            }
                                //        });
                                //        var CurrentSprint = $("#drpSprintTypes").val();
                                //        $.ajax({
                                //            type: "POST",
                                //            url: urlGetSprintByType,
                                //            dataType: 'html',
                                //            data: "{'CurrentSprint':'" + CurrentSprint + "','ProjectId':'" + projectID + "'}",
                                //            contentType: "application/json; charset=utf-8",
                                //            success: function (data) {
                                //                $('#SprintRightPanel').html(data);
                                //                setScrolling();
                                //                setScrollHeight();
                                //                bindAllEvents();
                                //            }
                                //        });
                                //    }
                                //    else if (window.location.href.toString().toLowerCase().indexOf('projectsummary') > 0) {
                                //        var url = window.location.href.toString().replace('#', '');
                                //        window.location = url;
                                //    }
                                //    else if (window.location.href.toString().toLowerCase().indexOf("mytaskdetail") > 0) {
                                //        //window.location = CurrentURL;
                                //        var taskTypeCase = $("ul.nav-tabs li.active a").attr('data-type');
                                //        $.ajax({
                                //            type: "POST",
                                //            url: '/Task/GetUpdatedMyTaskDetails',
                                //            dataType: 'html',
                                //            data: '{"taskTypeCase":' + taskTypeCase + '}',
                                //            contentType: "application/json; charset=utf-8",
                                //            success: function (data) {
                                //                $('#dvTaskDetail').html(data);

                                //            }
                                //        });
                                //    }
                                //}
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log(jqXHR.responseText)
                        }
                    });
                }
                else {
                    $(this).prop('disabled', false);
                }
            }
            else {
                $(".modal-body").animate({ scrollTop: 0 }, 600);
                //.mCustomScrollbar("scrollTo", $(".field-validation-error").first().prev());
                $(this).prop('disabled', false);
            }

        });
        //$(".btnCancel").click(function () {
        //    $('#AddTaskModal').modal('toggle');
        //});
        $("#drpStory").change(function () {

            if ($(this).val() == "0") {
                //$("#drpSprint").val("");
                $(".modal-body").find("#drpSprint").val('').trigger("chosen:updated");
            }

            //$('#drpStory').trigger('chosen:updated');

        });
        function htmlEncode(html) {
            return document.createElement('a').appendChild(
                document.createTextNode(html)).parentNode.innerHTML;
        };
        function GetSprintWiseStories() {

            if (ProjectType == Enum_Scrum_ProjectType) {
                var SprintID = ($(".modal-body").find("#drpSprint").val() == "" || $(".modal-body").find("#drpSprint").val() == undefined) ? "0" : $(".modal-body").find("#drpSprint").val();
                var projectID = $("#ProjectID").val();

                $.ajax({
                    type: "POST",
                    url: "/Task/GetSprintWiseStories",
                    data: '{"ProjID": ' + projectID + ',"SprintId":' + SprintID + '}',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    async: false,
                    success: function (data) {

                        result = data.DueDate
                        $("#drpStory").empty();
                        $("#drpStory").append("<option value='0'>Select an Option </option>");
                        for (var i = 0; i < result.length; i++) {
                            $("#drpStory").append("<option value='" + result[i].Value + "'>" + result[i].Text + "</option>");
                        }
                        $('#drpStory').trigger("chosen:updated");
                    }
                });
            }
        };

        $(".modal-body #drpEpicID").change(function () {

            if ($(this).val() > 0) {
                $(".modal-body").find("#drpSprint").val('0').trigger('chosen:updated');
            }
            return false;
        });

        $("#ParentTypeID").change(function () {

            if (ProjectType == Enum_Kanban_ProjectType) {
                var ParentTypeID = ($("#ParentTypeID").val() == "" || $("#ParentTypeID").val() == undefined) ? "0" : $("#ParentTypeID").val();
                var projectID = $("#ProjectID").val();

                $.ajax({
                    type: "POST",
                    url: "/Task/GetParentTasks",
                    data: '{"ProjID": ' + projectID + ',"ParentTypeID":' + ParentTypeID + '}',
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    async: false,
                    success: function (data) {

                        result = data.DueDate
                        $("#drpParentTask").empty();
                        $("#drpParentTask").append("<option value='0'>Select Parent Task </option>");
                        for (var i = 0; i < result.length; i++) {
                            $("#drpParentTask").append("<option value='" + result[i].Value + "'>" + result[i].Text + "</option>");
                        }
                        $('#drpParentTask').trigger("chosen:updated");
                    }
                });
            }
        });

        $(document).off("click", ".deleteTaskAttachment");
        $(document).on("click", ".deleteTaskAttachment", function () {

            if (confirm("Are you sure you want to delete this attachment ?")) {
                var attachmentId = $(this).attr('data-attachmentId');
                $(this).addClass("deletedAttachment");
                $('#divAttachment_' + attachmentId).hide();
            }
        });

        if (ProjectType == Enum_Iterative_ProjectType && $("#TempTaskStatusId").val() != Enum_TaskStatus_NotStarted) {
            var ddlAssignee = $("#Assignee").val();
            if (ddlAssignee != null) {
                for (var i = 0; i < ddlAssignee.length; i++) {
                    $('#Assignee option[value="' + ddlAssignee[i] + '"]').prop('disabled', true);
                }
            }
            $("#Assignee").trigger("chosen:updated");
        }

        $("#Estimated_Hours").change(function () {
            if (ProjectType == Enum_Iterative_ProjectType && $("#Estimated_Hours").val() != "" && $("#Estimated_Hours").val() > 0 && $('#EstimatedStartDate').val() != "") {
                SetEstimatedEndDate($('#EstimatedStartDate').val());
            }
        });



    });
});
function CheckMaxTask() {
    var result = true;
    if ($("#TempTaskTypeId").val() != "") {
        var SprintID = ($(".modal-body").find("#drpSprint").val() == "" || $(".modal-body").find("#drpSprint").val() == undefined) ? "0" : $(".modal-body").find("#drpSprint").val();
        var TaskStatusId = $("#TempTaskStatusId").val() == "" ? "0" : $("#TempTaskStatusId").val();
        $.ajax({
            type: "POST",
            url: urlCheckMaxTask,
            data: '{"SprintID": ' + SprintID + ',"TaskType":' + $("#TempTaskTypeId").val() + ',"TaskStatusId":' + TaskStatusId + ',"ProjectID":' + $("#ProjectID").val() + '}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                result = data.result
            }
        });
    }
    return result;

}
function CheckSprint(SprintId) {
    if (SprintId == "")
        $(".dvStatus").css("display", "none");
    else
        $(".dvStatus").css("display", "block");
}
function GetSubTasks(TaskID) {

    $.ajax({
        type: "POST",
        url: SubTaskUrl + "?Id=" + TaskID + "&ProjectId=" + ProjectId,
        dataType: 'html',
        data: "",
        success: function (data) {
            $("#dvSubTask").html(data);
        }
    });
}
function GetTasksAssignees(TaskID) {
    $.ajax({
        type: "POST",
        url: GetAssigneesURL + "?Id=" + TaskID,
        dataType: 'html',
        data: "",
        success: function (data) {
            $("#TaskRight").html(data);
        }
    });
}
function SendFiles(FileformData, TaskID) {

    FileformData.append("WBSID", TaskID);
    $.ajax({
        type: "POST",
        url: FilesUrl + "?Id=" + TaskID,
        dataType: 'json',
        data: FileformData,
        contentType: false,
        processData: false,
        success: function (data) {
        }
    });

}
function ValidateDynamicContent(element) {
    var currForm = element.closest("form");
    if (currForm.length > 0) {
        currForm.removeData("validator");
        currForm.removeData("unobtrusiveValidation");
        $.validator.unobtrusive.parse(currForm);
        currForm.validate(); // This line is important and added for client side validation to trigger, without this it didn't fire client side errors.
    } else {
        $.validator.unobtrusive.parse(element);//parse div content for validation

    }
}
function ExpandColumn() {
    $(".panelCollapse").each(function () {
        if ($(this).data('status') != undefined) {
            var panelstatusId = $(this).data('status');
            if ($(".expandpanel-" + panelstatusId + ":first").hasClass('collapsed')) {
                //console.log(panelstatusId);
                $(".expandpanel-" + panelstatusId).each(function (event) {
                    $('#dvTaskStatus-' + panelstatusId).hide();
                    $(".expandpanel-" + panelstatusId).addClass('collapsed');
                });
            }
        }
    });
}

function validateStoryForSprint() {
    var result = true;
    if ($(".modal-body").find("#drpSprint").val() > 0) {
        if ($("#drpStory").val() > 0) {
            result = true;
        }
        else {
            result = false;
            $("#errStory").text('Story is Required for selected Sprint');
        }
    }
    return result;
}
function validateEpicOrSprint() {

    var result = true;
    if ($(".modal-body").find("#drpSprint").val() > 0 || $('#drpEpicID').val() > 0) {
        result = true
    }
    else {
        result = false;
        $("#errEpic").text('Either Epic or Sprint is Required for Story.');
    }
    return result;

}
function validateParentTasks() {

    var result = true;
    if ($("#ParentTypeID").val() > 0 || $('#ParentTypeID').val() > 0) {
        if ($("#drpParentTask").val() > 0 || $('#drpParentTask').val() > 0) {
            result = true
        }
        else {
            result = false;
            $("#errParentTask").text('Parent Task is Required.');
        }
    }
    else {
        result = false;
        $("#errParentType").text('Parent Type is Required.');
    }
    return result;

}
function validateMandatory() {

    var result = true;
    $("#wbsErrorMsg").text('');
    $("#wbsErrorWrkItm").text('');
    $("#wbsErrorPriority").text('');
    $("#errEstimatesHr").text('');
    $("#errStartDate").text('');
    if ($("#txtWbsName").val() == "" || $("#txtWbsName").val() == null || $("#txtWbsName").val() == undefined) {
        result = false;
        $("#wbsErrorMsg").text('Title is Required.');
    }
    if ($("#TempTaskTypeId").val() == "" || $('#TempTaskTypeId').val() == undefined || $('#TempTaskTypeId').val() == null) {
        result = false;
        $("#wbsErrorWrkItm").text('Work Item Type is Required.');
    } else { $("#wbsErrorWrkItm").text(''); }
    if ($("#Priority").val() == "" || $('#Priority').val() == undefined || $('#Priority').val() == null) {
        result = false;
        $("#wbsErrorPriority").text('Priority is Required.');
    } else { $("#wbsErrorPriority").text(''); }
    if (ProjectType == Enum_Kanban_ProjectType || ProjectType == Enum_Iterative_ProjectType || (ProjectType == Enum_Scrum_ProjectType && $("#TempTaskTypeId").val().toString() != Enum_Story.toString() && $("#TempTaskTypeId").val().toString() != Enum_Epic.toString())) {
        if ($("#Estimated_Hours").val() == "" || $("#Estimated_Hours").val() == undefined || $("#Estimated_Hours").val() == null) {
            result = false;
            $("#errEstimatesHr").text('Estimated Hours is Required.');
        }
    }
    if (ProjectType == Enum_Iterative_ProjectType && $(".modal-body").find("#drpSprint").val() > 0) {
        if ($("#EstimatedStartDate").val() == "" || $("#EstimatedStartDate").val() == null) {
            result = false;
            $("#errStartDate").text('Plan start date is Required.');
        }
    }
    return result;
}
function GetUpdatedEpics() {

    if (ProjectType == Enum_Scrum_ProjectType) {
        var projectID = $("#ProjectID").val();

        $.ajax({
            type: "POST",
            url: "/Task/GetUopdatedEpics",
            data: '{"ProjID": ' + projectID + ',"ProjectTypeId":' + ProjectType + ',"ForBackLog":true}',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {

                result = data.Epicdata
                var epicid = $("#EpicID").val();
                $("#EpicID").empty();
                $("#EpicID").append("<option value='0'>Select Epic </option>");
                for (var i = 0; i < result.length; i++) {
                    $("#EpicID").append("<option value='" + result[i].Value + "'>" + result[i].Text + "</option>");
                }
                $('#EpicID').val(epicid).trigger('chosen:updated');

            }
        });
    }
};
function BindTaskAttachmentDropzone() {
    $('#task-dropzone').dropzone({
        url: FilesUrl + "?Id=" + TaskId,
        thumbnailWidth: 180,
        thumbnailHeight: 180,
        uploadMultiple: true,
        addRemoveLinks: true,
        dictRemoveFileConfirmation: "Are you sure you want to remove file?",
        init: function () {
            var self = this;

            self.options.dictRemoveFile = "Delete";

            bindTaskAttachment(self);



            //New file added
            self.on("addedfile", function (file) {
                console.log('new file added ', file);

                //var FileName = data.Data[i].DocumentName;
                //var mockFile = {
                //    name: FileName,
                //    size: data.Data[i].size,
                //    ID: data.Data[i].AttachmentID
                //}
            });
            // Send file starts
            self.on("sending", function (file) {
                //console.log('upload started', file);
                $('.meter').show();
            });
            self.on("drop", function (file, event) {
                //console.log('upload started', file);

                if (IsDisabled == "True") {
                    event.preventDefault();
                    return false;
                }
            });

            // File upload Progress
            self.on("totaluploadprogress", function (progress) {
                //console.log("progress ", progress);
                $('.roller').width(progress + '%');
            });

            self.on("queuecomplete", function (progress) {
                $('.meter').delay(999).slideUp(999);
            });

            // On removing file
            self.on("removedfile", function (file) {
                console.log(file);
                if (file.ID != undefined) {
                    $.ajax({
                        url: urlDeleteFile + '?FileID=' + file.ID + '&FileName=' + file.name + '&ProjectId=' + ProjectId,
                        type: 'get',
                        success: function (result) {
                            if (result.Success)
                                GetTaskActivities(TaskId);
                            else {
                                bindTaskAttachment(self);
                                toastr.error("You are not authorized to delete this file");
                            }
                        }
                    });
                }
            });
            self.on("success", function (progress) {

                //file.previewElement.addEventListener("click", function () { window.location = filepath + "?FileWithPath=" + file.name });
                bindTaskAttachment(self);

            });
        }
    });
    custome_scroll_init();
}
function bindTaskAttachment(self) {
    $("#task-dropzone").empty();
    $.get(urltaskAttachment + "?TaskId=" + TaskId, function (data) {

        $("#task-dropzone").empty();
        for (var i = 0; i < data.Data.length; i++) {
            var FileName = data.Data[i].DocumentName;
            var Path = data.Data[i].Path;

            if (FileName != null && Path != null) {

                var mockFile = {
                    name: FileName,
                    size: data.Data[i].size,
                    ID: data.Data[i].AttachmentID,
                    FileDownloadPath: Path
                };

                self.options.addedfile.call(self, mockFile);
                $(mockFile.previewElement).on("click", { Name: FileName, FileDownloadPath: Path }, function (event) {
                    window.location = filepath + "?FileWithPath=" + event.data.FileDownloadPath
                });

                if (FileName != null) {

                    var fileext = FileName.substring(FileName.lastIndexOf('.'));
                    if (fileext == ".jpg" || fileext == ".jpeg" || fileext == ".bmp" || fileext == ".gif" || fileext == ".png")
                        self.options.thumbnail.call(self, mockFile, "/Documents/Task/Thumbnail/" + Path);
                    else if (fileext.indexOf("txt") >= 0)
                        self.options.thumbnail.call(self, mockFile, "../Images/FileIcon_txt.png");
                    else if (fileext.indexOf("doc") >= 0 || fileext.indexOf("docx") >= 0)
                        self.options.thumbnail.call(self, mockFile, "../Images/FileIcon_Word.png");
                    else if (fileext.indexOf("xls") >= 0 || fileext.indexOf("xlsx") >= 0)
                        self.options.thumbnail.call(self, mockFile, "../Images/FileIcon_Excel.png");
                    else if (fileext.indexOf("pdf") >= 0)
                        self.options.thumbnail.call(self, mockFile, "../Images/FileIcon_pdf.png");
                }
            }
        };
    });
}
function GetTaskActivities(TaskID) {

    $.ajax({
        type: "POST",
        url: urlActivities,
        dataType: 'html',
        data: "{'TaskID':'" + TaskID + "'}",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $("#dvActivity").html(data);
        }
    });

}

function IsAlphaNumeric(e) {
    var specialKeys = new Array();
    specialKeys.push(8); //Backspace
    specialKeys.push(9); //Tab
    specialKeys.push(46); //Delete
    specialKeys.push(36); //Home
    specialKeys.push(35); //End
    specialKeys.push(37); //Left
    specialKeys.push(39); //Right
    var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
    var ret = keyCode == 32 || ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || (specialKeys.indexOf(e.keyCode) != -1 && e.charCode != e.keyCode));
    return ret;
}
function isNumeric(evt, ths) {
    var result = true;
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        result = false;
    }
    return result;
}

function checkFile(file_list) {
    $("#errFileType").text('');
    var result = true;


    for (var i = 0, file; file = file_list[i]; i++) {

        var sFileName = file.name;
        var sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase();
        var iFileSize = file.size;
        var iConvert = (file.size / 1048576).toFixed(2);


        if (!(sFileExtension === "doc" || sFileExtension === "xls" || sFileExtension === "xlsx" || sFileExtension === "pdf" ||
              sFileExtension === "txt" || sFileExtension === "ppt" || sFileExtension === "jpeg" ||
              sFileExtension === "png" || sFileExtension === "docx" || sFileExtension === "pptx")) {
            txt = "File type : " + sFileExtension + "\n\n";
            txt += "Size: " + iConvert + " MB \n\n";
            $("#errFileType").text('File(s) format should be : DOC, DOCX, XLS, XLSX, PDF, TXT, PPT, PPTX, JPEG, PNG only.');
            result = false;
            break;
        }
        if (iFileSize > 5242880)/// 5 mb
        {
            $("#errFileType").text('File size larger than 5MB is not allowed.');
            result = false;
            break;
        }
    }
    return result;
}
function checkFileTypeForDrop(file_list) {
    var result = true;
    $("#errFileTypeDrop").text('');
    for (var i = 0, file; file = file_list[i]; i++) {
        var sFileName = file.name;
        var sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase();
        var iFileSize = file.size;
        var iConvert = (file.size / 1048576).toFixed(2);

        if (!(sFileExtension === "doc" || sFileExtension === "xls" || sFileExtension === "xlsx" || sFileExtension === "pdf" ||
                 sFileExtension === "txt" || sFileExtension === "ppt" || sFileExtension === "jpeg" ||
                 sFileExtension === "png" || sFileExtension === "docx" || sFileExtension === "pptx")) {
            txt = "File type : " + sFileExtension + "\n\n";
            txt += "Size: " + iConvert + " MB \n\n";
            $("#errFileTypeDrop").text('File(s) format should be : DOC, DOCX, XLS, XLSX, PDF, TXT, PPT, PPTX, JPEG, PNG only.');
            result = false;
            break;
        }
        if (iFileSize > 5242880)/// 5 mb
        {
            $("#errFileTypeDrop").text('File size larger than 5MB is not allowed.');
            result = false;
            break;
        }
    }
    return result;
}
function DeleteFiles() {
    $('.deletedAttachment').each(function () {
        var attachmentId = $(this).attr('data-attachmentId');
        var attachmentName = $(this).attr('data-attachmentName');

        $.ajax({
            url: '/task/DeleteFile?FileID=' + attachmentId + '&FileName=' + attachmentName + '&ProjectId=' + ProjectId,
            type: 'get',
            success: function (result) {
            }
        });

    });
}
function IsCharacherLimit(txtvalue, charlimit) {
    if (txtvalue > charlimit) {
        $("#errorDesc").show();
        $("#errorDesc").addClass("text-danger");
        $("#errorDesc").html("Maximum character limit is 300")
        return false;
    }
    else {
        $("#errorDesc").hide();
        $("#errorDesc").removeClass("text-danger");
    }
    return true;
}
function SetEstimatedEndDate(startDate) {
    if ($("#Estimated_Hours").val() != "" && $("#Estimated_Hours").val() > 0) {
        var EstimatedHours = ConfiguredHours;
        var AddDay = Math.ceil($("#Estimated_Hours").val() / EstimatedHours);
        var LatestAddDay = AddDay;
        var startDate = moment($('#EstimatedStartDate').val());
        var EndOfTheMonth = moment().add('months', 1).date(0);
        //--disable Sat,Sun for ISM delivery
        //Raju :- Modified code due to calculation mismatch
        var nextDate = moment(startDate).format("MM/DD/YYYY");
        var i = 1;
        while (i < AddDay) {

            nextDate = moment(nextDate).add(1, 'days').format("MM/DD/YYYY");
            var checkDate = moment(nextDate).format("mm/dd/yyyy");

            if (!(moment(checkDate, "mm/dd/yyyy").format('dddd') == "Saturday" || moment(checkDate, "mm/dd/yyyy").format('dddd') == "Sunday")) {
                i += 1;
            }
        }
        //Raju :- Modified code due to calculation mismatch

        //Old Code Start

        //for (var i = 1; i <= AddDay; i++) {
        //    if (moment(startDate, "mm/dd/yyyy").add(i - 1, 'days').format('dddd') == "Saturday" || moment(startDate, "mm/dd/yyyy").add(i - 1, 'days').format('dddd') == "Sunday") {
        //        LatestAddDay += 1;
        //    }
        //}
        //var nextDate = moment(startDate).add(LatestAddDay - 1, 'days').format("MM/DD/YYYY");

        //var checkDate = moment(startDate).add(LatestAddDay - 1, 'days').format("mm/dd/yyyy");

        //if (moment(checkDate, "mm/dd/yyyy").format('dddd') == "Saturday") {
        //    alert("sa")
        //    LatestAddDay += 2;
        //    nextDate = moment(startDate).add(LatestAddDay - 1, 'days').format("MM/DD/YYYY");
        //}
        //else if (moment(checkDate, "mm/dd/yyyy").format('dddd') == "Sunday") {
        //    alert("su")
        //    LatestAddDay += 2;
        //    nextDate = moment(startDate).add(LatestAddDay - 1, 'days').format("MM/DD/YYYY");
        //}

        //Old Code End
        $("#EstimatedEndDate").bootstrapDP('setDate', nextDate);
        $('#EstimatedEndDate').val(nextDate);
        $("#hdnEstimatedEndDate").val(nextDate);
        $("#errEstimatesHr").text('');
    }
    else {
        $("#errEstimatesHr").text('Estimated Hours is Required.');
    }
}
