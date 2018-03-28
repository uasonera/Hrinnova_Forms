$(document).ready(function () {
    var sPageURL = window.location.search.substring(1);
    var msg = sPageURL.split(/=+(.+)?/)[1];
    var chkbxEmpListId = "";
    $.ajax({
        type: "POST",
        url: 'TeamSelection_Step1.aspx/GetDecryptedData',
        data: "{ 'Message' : '" + msg + "'}",
        contentType: 'application/json; charset=utf-8',
        datatype: 'json',
        success: function (result) {
            if (result.d == "Success") {
                ShowMessage(true, "Record Saved Successfully");
            }
        }
    });
    var str = '';
    var ArrIds = [];
    var DeletedEvaluationIds = [];
    var DeletedKraEvalIdsOfGeneratedEvalDate = [];
    var LstEmployees = new Array();
    var EditedKraEvaluationPeriod = 0;
    var UpdatedTeamMemberId = 0;
    var UpdatedTeamMemberEmpId = 0;
    var UpdatedKraEvaluationId = 0;
    var Data1, BackData;
    var EditedKraEvaluationPeriod = 0;
    var UpdatedTeamMemberId = 0;
    var UpdatedTeamMemberEmpId = 0;
    //var UpdatedKraEvaluationId = [];
    var tblEditedEmpDetails;
    var tblExpectedEvalDate;
    var BackData;

    var ProjectViewModel = {
        AvailableProjects: ko.observable([]),
        EmployeesInProject: ko.observableArray([]),
        KraEvalution: ko.observableArray([]),
        SelectedEmployees: ko.observableArray([]),
        ProjectChanged: function () {
            ProjectViewModel.SelectedEmployees([]);
            $("#divTbs").empty();
            $("#ulVs").empty();
            var SelectedProject = $("#drpProjects").val() == "" ? 0 : $("#drpProjects").val();
           if($("#drpProjects").val() == "")
               $("#drpEvaluation option:eq(0)").prop("selected", true);
            GetEmployeesInProject(SelectedProject);
        }
    };
    ko.applyBindings(ProjectViewModel, document.getElementById('tempdiv'));

    $("#EditTeamSelection").css("display", "none");

    var IsBack = getParameterByName('IsBack');
    $.when(BindProjectAndEvaluationPeriod()
   ).done(function () {
       if (UpdatedTeamMemberId > 0)
           BindEditTabsDetails();
       if (IsBack != "" && UpdatedTeamMemberId == 0) {

           $.when(GetBackDetails()
        ).then(function () {
            $("#drpProjects").val(BackData.SelectedProjId);
            $("#drpEvaluation").val(BackData.SelectedKRAEvalutionId);
        }).then(function () {
            GetEmployeesInProject(BackData.SelectedProjId);
        }).then(function () {
            $("#divTbs").empty();
            $("#divTbs").append($("<div></div>").attr("id", "divTabs"));
            $("#divTabs").append($('<ul></ul>').attr("id", "ulTab"));
            LstEmployees.length = 0;

            $.each(BackData.lstTeamSelection_Step1_Data, function () {

                var ArrayWithEmpDetails = [];
                var ArrayWithEvalDates = [];
                var ProjectDates = [];
                var CurrentTeamMemberId = this.TeamMemberId;
                var CurrentEmpId = this.EmpId;
                var NextApppraisalDate = this.NextAppraisalDate;
                ProjectDates.push({ 'StartDate': this.StartDate, 'EndDate': this.EndDate });
                LstEmployees.push(CurrentTeamMemberId);
                $("#chkEmployee_" + CurrentTeamMemberId + "_" + CurrentEmpId).prop("checked", "checked");

                var TeamMemberName = $("#" + CurrentTeamMemberId + "_" + CurrentEmpId).html();
                ProjectViewModel.SelectedEmployees.push({ 'NameOfTheEmployee': TeamMemberName, 'TM': CurrentTeamMemberId });
                $.each(this.EvalDatesForSameProject, function () {
                     
                    ArrayWithEmpDetails.push({ "EvaluationDate": this.KRAEvalDate, "TeamMemberID": CurrentTeamMemberId, "KRAEvalId": this.KRAEvalId, "Project": "Same", "NextAppraisalDate": NextApppraisalDate, "EmpID": "" });
                });
                $.each(this.EvalDatesForDifferentProject, function () {
                    
                    ArrayWithEmpDetails.push({ "EvaluationDate": this.KRAEvalDate, "TeamMemberID": this.TMID, "KRAEvalId": this.KRAEvalId, "Project": "Different", "NextAppraisalDate": NextApppraisalDate, "EmpID": "" });
                });
                $.each(this.GeneratedEvalDates, function (index, Da) {
                     
                    ArrayWithEvalDates.push({ "EvaluationDate": Da.EvaluationDate, "KRAEvalId": Da.KraEvaluationId });
                });
                $.when(GenerateTabs(CurrentTeamMemberId, $("#chkEmployee_" + CurrentTeamMemberId + "_" + CurrentEmpId).next().html(), CurrentEmpId)
                ).then(function () {
                     
                    ConstructHTML(ArrayWithEmpDetails, ArrayWithEvalDates, CurrentTeamMemberId, NextApppraisalDate, ProjectDates);

                }).then(function () {

                    $("#tab_" + CurrentTeamMemberId + "_" + CurrentEmpId).html(str);

                }).then(function () {
                    ApplyDatePickers();
                }).then(function () {
                    jQuery.each(ArrIds, function (i, item) {
                        $("#txt" + ArrIds[i].ID).datepicker("setDate", ArrIds[i].Date);
                    });
                }).then(function () { AddNoRecordMessage(CurrentTeamMemberId); });;

            });
            $("#divTabs").tabs();
        });

       }
   });
    function getParameterByName(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }
    function GetBackDetails() {
        $.ajax({
            type: "POST",
            url: 'TeamSelection_Step1.aspx/GetBackDetails',
            data: "",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            async: false,
            success: function (jsonResult) {
                BackData = jQuery.parseJSON(jsonResult.d);
            }
        });
    }
    function GetEmployeesInProject(SelectedProject) {
        $.ajax({
            type: "POST",
            url: 'TeamSelection_Step1.aspx/GetEmployees',
            data: "{ 'ProjID' : " + SelectedProject + "}",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            async: false,
            success: function (jsonResult) {
                 
                var result = jQuery.parseJSON(jsonResult.d);
                ProjectViewModel.EmployeesInProject(result);
            }
        });
    }
    function BindProjectAndEvaluationPeriod() {
        $.ajax({
            type: "POST",
            url: 'TeamSelection_Step1.aspx/GetProjects',
            data: "{}",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            async: false,
            success: function (jsonResult) {
                var result = jQuery.parseJSON(jsonResult.d[0]);
                ProjectViewModel.AvailableProjects(result.TblProj);

                //Edit Mode: Bind Project to dropdownlist

                var SelectedProj = (result.TblSelProject);
                if (jsonResult.d[1] != "")
                    EditedKraEvaluationPeriod = jsonResult.d[1];

                UpdatedTeamMemberDetails = jsonResult.d[2];
                if (UpdatedTeamMemberDetails != "") {
                    var obj = jQuery.parseJSON(UpdatedTeamMemberDetails);
                    UpdatedTeamMemberId = obj.EditedTeamMemberID;
                    UpdatedTeamMemberEmpId = obj.EditedEmpID;
                }
                //UpdatedKraEvaluationId = obj.EditedKraEvalID;

                //UpdatedTeamMemberEmpId = jsonResult.d[3];
                //KraEvaluation = parseInt(KraEvalution, 10);

                if (Object.keys(SelectedProj).length > 0) {
                    $("#drpProjects").val(SelectedProj[0].projectID);
                    $("#drpProjects").attr("disabled", true);
                    $("#AddEmpSelection").css("display", "none");
                    $("#EditTeamSelection").css("display", "block");

                    DisplayEmpName(UpdatedTeamMemberId);

                    //ProcessTransaction();
                }
            }
        });
        $.ajax({
            type: "POST",
            async: false,
            url: "TeamSelection_Step1.aspx/BindKraEvalution",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            async: false,
            success: function (jsonResult) {
                var data = jQuery.parseJSON(jsonResult.d);

                ProjectViewModel.KraEvalution(data);
                if (EditedKraEvaluationPeriod != 0) {
                    $("#drpEvaluation").val(EditedKraEvaluationPeriod);
                } else {
                    $("#drpEvaluation option[value='" + 0 + "']").attr("selected", "selected").change();
                }
                if (EditedKraEvaluationPeriod != 0)
                    $("#drpEvaluation").attr("disabled", true);

                else
                    $("#drpEvaluation").attr("disabled", false);


            }

        });
    }
    $(document).on('click', '.chkList', function (event) {

        if ($("#drpEvaluation option:selected").val() != "" && $("#chkemployees").find('input:checkbox:checked').length > 0) {
            $("#ulVs").empty();
            ProcessTransaction();
        }
        else
            $("#divTbs").empty();

    });
    $(document).on('click', '#btnCancel', function (event) {
        window.location.href = "/Dashboard/Index";
    });

    $(document).on('change', '#drpEvaluation', function (event) {

        if ($("#drpEvaluation option:selected").val() != "" && $("#chkemployees").find('input:checkbox:checked').length > 0) {
            ProcessTransaction();
            $("#ulVs").empty();
        }
        else {
            ProjectViewModel.SelectedEmployees([]);
            $("#divTbs").empty();
        }
    });



    ///Edit Time funtion for bind tabs and tabs details

    function BindEditTabsDetails() {

        ProjectViewModel.SelectedEmployees([]);

        $("#divTbs").empty();
        LstEmployees.length = 0;
        var SelectedProjId = $("#drpProjects").val();
        $("#divTbs").append($("<div></div>").attr("id", "divTabs"));
        $("#divTabs").append($('<ul></ul>').attr("id", "ulTab"));
        var EvaluationPeriod = $("#drpEvaluation option:selected").val() == "" ? 0 : $("#drpEvaluation option:selected").val();

        var UpdatedTeamMemberName = $("#" + UpdatedTeamMemberId).text();
        ProjectViewModel.SelectedEmployees.push({ 'NameOfTheEmployee': UpdatedTeamMemberName, 'TM': UpdatedTeamMemberId });

        var ProjectId = $("#drpProjects option:selected").val();
        LstEmployees.push(UpdatedTeamMemberId);

        ArrIds.length = 0;
        var IsBack = getParameterByName('IsBack');

        if (IsBack != "") {

            $.ajax({
                type: "POST",
                url: 'TeamSelection_Step1.aspx/GetBackDetails',
                data: "",
                contentType: 'application/json; charset=utf-8',
                datatype: 'json',
                async: false,
                success: function (jsonResult) {
                    BackData = jQuery.parseJSON(jsonResult.d);
                }
            });


            $.each(BackData.lstTeamSelection_Step1_Data, function () {

                var ArrayWithEmpDetails = [];
                var ArrayWithEvalDates = [];
                var ProjectDates = [];
                var CurrentTeamMemberId = this.TeamMemberId;
                var CurrentEmpId = this.EmpId;
                var NextApppraisalDate = this.NextAppraisalDate;
                ProjectDates.push({ 'StartDate': this.StartDate, 'EndDate': this.EndDate });

                $.each(this.EvalDatesForSameProject, function () {
                    ArrayWithEmpDetails.push({ "EvaluationDate": this.KRAEvalDate, "TeamMemberID": CurrentTeamMemberId, "KRAEvalId": this.KRAEvalId, "Project": "Same", "NextAppraisalDate": "", "EmpID": "" });
                });
                $.each(this.EvalDatesForDifferentProject, function () {
                    ArrayWithEmpDetails.push({ "EvaluationDate": this.KRAEvalDate, "TeamMemberID": this.TMID, "KRAEvalId": this.KRAEvalId, "Project": "Different", "NextAppraisalDate": "", "EmpID": "" });
                });
                $.each(this.GeneratedEvalDates, function (index, Da) {

                    ArrayWithEvalDates.push({ "EvaluationDate": Da.EvaluationDate, "KRAEvalId": Da.KraEvaluationId });
                });
                $.when(GenerateTabs(CurrentTeamMemberId, UpdatedTeamMemberName, CurrentEmpId)
                ).then(function () {
                    ConstructHTML(ArrayWithEmpDetails, ArrayWithEvalDates, CurrentTeamMemberId, NextApppraisalDate, ProjectDates);

                }).then(function () {

                    $("#tab_" + CurrentTeamMemberId + "_" + CurrentEmpId).html(str);

                }).then(function () {
                    ApplyDatePickers();
                }).then(function () {
                    jQuery.each(ArrIds, function (i, item) {
                        $("#txt" + ArrIds[i].ID).datepicker("setDate", ArrIds[i].Date);
                    });
                }).then(function () { AddNoRecordMessage(CurrentTeamMemberId); });;

            });
        }
        else {
            $.when(
                GenerateTabs(UpdatedTeamMemberId, UpdatedTeamMemberName, UpdatedTeamMemberEmpId)
                ).then(function () {

                    GetEmployeeDetails(UpdatedTeamMemberId, UpdatedTeamMemberEmpId, EditedKraEvaluationPeriod, SelectedProjId); //               
                }).then(function () {
                    //var AD = Data1.Table2[0].NextAppraisalDate == null ? "N/A" : Data1.Table2[0].NextAppraisalDate;
                    //ConstructHTML(Data1.Table, Data1.Table1, UpdatedTeamMemberId, AD);
                    var AD = Data1.AppraisalDate[0].NextAppraisalDate;
                    ConstructHTML(Data1.EmployeeDetails, Data1.EvaluationDates, UpdatedTeamMemberId, AD, Data1.ProjectDates);
                }).then(function () {
                    $("#tab_" + UpdatedTeamMemberId + "_" + UpdatedTeamMemberEmpId).html(str);
                }).then(function () {
                    ApplyDatePickers();
                }).then(function () {
                    jQuery.each(ArrIds, function (i, item) {

                        ///////////////

                        $("#txt" + ArrIds[i].ID).datepicker("setDate", ArrIds[i].Date);



                        //////////
                    });
                }).then(function () { AddNoRecordMessage(UpdatedTeamMemberId); });
        }
        $("#divTabs").tabs();
    }

    function ProcessTransaction() {
         
        ProjectViewModel.SelectedEmployees([]);
        $("#divTbs").empty();
        LstEmployees.length = 0;
        $("#divTbs").append($("<div></div>").attr("id", "divTabs"));
        $("#divTabs").append($('<ul></ul>').attr("id", "ulTab"));
        var EvaluationPeriod = $("#drpEvaluation option:selected").val() == "" ? 0 : $("#drpEvaluation option:selected").val();
        $('.chkList').each(function () {
             
            if ($(this).is(':checked')) {
                 
                var TID = this.id.split("_")[1];
                var empID = this.id.split("_").pop();
                var TName = $(this).next().html();
                ProjectViewModel.SelectedEmployees.push({ 'NameOfTheEmployee': TName, 'TM': TID });
                var ProjectId = $("#drpProjects option:selected").val();
                LstEmployees.push(TID);
                ArrIds.length = 0;

                $.when(
                     GenerateTabs(TID, TName, empID)
                ).then(function () {
                    GetEmployeeDetails(TID, empID, EvaluationPeriod, ProjectId); //               
                }).then(function () {
                     
                    // var AD = Data1.Table2[0].NextAppraisalDate == null ? "N/A" : Data1.Table2[0].NextAppraisalDate;
                    var AD = Data1.AppraisalDate[0].NextAppraisalDate;
                    ConstructHTML(Data1.EmployeeDetails, Data1.EvaluationDates, TID, AD, Data1.ProjectDates);
                }).then(function () {
                     
                    $("#tab_" + TID + "_" + empID).html(str);
                }).then(function () {
                     
                    ApplyDatePickers();
                }).then(function () {
                     
                    jQuery.each(ArrIds, function (i, item) {
                         
                        $("#txt" + ArrIds[i].ID).datepicker("setDate", ArrIds[i].Date);




                    });
                }).then(function () { AddNoRecordMessage(TID); });
            }
        });
        $("#divTabs").tabs();
    }
    function GenerateTabs(TMID, TName, empID) {
        // 
        $("#ulTab").append($('<li></li>').append($('<a></a>').attr("href", "#tab_" + TMID + "_" + empID).html("<p><span><strong>" + TName + "</strong></span></p>")));
        $("#divTabs").append($('<div></div>').attr("id", "tab_" + TMID + "_" + empID).html(TName));
    }
    function GetEmployeeDetails(TID, empID, EvaluationPeriod, ProjectId) {
         
        $.ajax({
            type: "POST",
            url: 'TeamSelection_Step1.aspx/GetEmployeeDetails',
            data: "{'TeamMemberId':" + parseInt(TID) + ",'empID':" + parseInt(empID) + ",'EvaluationPeriod':" + parseInt(EvaluationPeriod) + ",'ProjectId':" + parseInt(ProjectId) + "}",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            async: false,
            success: function (jsonResult) {
                Data1 = jQuery.parseJSON(jsonResult.d);
            }
        });
    }
    function AddNoRecordMessage(TID) {

        if ($("#Table_Same" + TID).prop('rows').length <= 1) {
            $("#Table_Same" + TID).append("<tr class='NoRecordRow' id='0_0'><td colspan='2'>No records found</td></tr>");
            $("#btnAdd_Same" + TID).hide();
        }
        else {
            $("#btnAdd_Same").show();
        }
        if ($("#Table_Different" + TID).prop('rows').length <= 1) {
            $("#Table_Different" + TID).append("<tr class='NoRecordRow' id='0_0'><td colspan='2'>No records found</td></tr>");
        }
        if ($("#Table_Evaluations" + TID).prop('rows').length <= 1) {
            $("#Table_Evaluations" + TID).append("<tr class='NoRecordRow' id='0_0'><td colspan='2'>No records found</td></tr>");
        }

    }
    function ApplyDatePickers() {
        $(".datepicker").datepicker({
            changeMonth: false,
            changeYear: false,
            showWeek: false,
            firstDay: 1,
            showOn: "button",
            buttonImage: "../images/datepicker.gif",
            buttonImageOnly: true,
            dateFormat: 'mm/dd/yy'
        });
    }
    function ConstructHTML(Data, EvaluationDates, TID, AD, ProjectDates) {
         
        var ProjectStartDate = ProjectDates[0].StartDate == null ? "N/A" : ProjectDates[0].StartDate;
        var ProjectEndDate = ProjectDates[0].EndDate == null ? "N/A" : ProjectDates[0].EndDate;

        str = '';

        str += "<div style='margin-left:60px;'><table class='grid' style='margin-left:10px;width:90%;text-align:center;'><tr><th>Project Start Date</th><th>Project End Date</th><th>Next Appraisal Date</th> </tr>";

        str += "<tr><td><span id=prjStrDate" + TID + ">" + ProjectStartDate + "</span></td>";
        str += "<td><span id=prjEndDate" + TID + ">" + ProjectEndDate + "</span></td>";
        str += "<td><span id=apprDate" + TID + ">" + AD + "</span></td></tr></table>";


        str += "<div style='clear:both;'></div>";
        var DiffrentProject = "<div class='HDR'>Pending Evaluation for Different Project</div><br /><br /><table class='grid tblEval' id='Table_Different" + TID + "'><tr><th>Evaluation Date</th><th>Action</th></tr>";
        var Sameproject = "<div class='HDR'>Pending Evaluation for Same Project</div><br /><br /><table class='grid tblEval' id='Table_Same" + TID + "'><tr><th>Evaluation Date</th><th>Action</th></tr>";
        var Evaluation = "<div class='HDR'>Evaluation Dates</div><br /><br /><table class='grid tblEval' id='Table_Evaluations" + TID + "'><tr><th>Evaluation Date</th><th>Action</th></tr>";
        for (var i = 0; i < Data.length; i++) {
            var IdToUse = Data[i].TeamMemberID;
            if (Data[i].Project == "Different") {
                DiffrentProject += "<tr id='" + IdToUse + "_" + Data[i].KRAEvalId + "'><td><input type='text' class='datepicker widthClass' id='txt" + IdToUse + "_" + TID + "_" + Data[i].KRAEvalId + "'></td><td><input type='image' id='" + IdToUse + "' src='../Images/Delete.gif' name='image' class='dlt'></td></tr>";
                //DiffrentProject += "<tr id='" + IdToUse + "_" + Data[i].KRAEvalId + "'><td><input type='text' class='datepicker widthClass' id='txt" + IdToUse + "_"  + Data[i].KRAEvalId + "'></td><td><input type='image' id='" + IdToUse + "' src='../Images/Delete.gif' name='image' class='dlt'></td></tr>";
            }
            else {
                Sameproject += "<tr id='" + IdToUse + "_" + Data[i].KRAEvalId + "'><td><input type='text' class='datepicker widthClass' id='txt" + IdToUse + "_" + TID + "_" + Data[i].KRAEvalId + "'></td><td><input type='image' id='" + IdToUse + "' src='../Images/Delete.gif' name='image' class='dlt'></td></tr>";
            }
            ArrIds.push({ "ID": IdToUse + "_" + TID + '_' + Data[i].KRAEvalId, "Date": moment(Data[i].EvaluationDate).format("MM/DD/YYYY") })
            //ArrIds.push({ "ID": IdToUse +  '_' + Data[i].KRAEvalId, "Date": moment(Data[i].EvaluationDate).format("MM/DD/YYYY") })
            
        }
        for (var i = 0; i < EvaluationDates.length; i++) {

            var tr_KraEvalId;
            if (UpdatedTeamMemberId > 0)
                tr_KraEvalId = EvaluationDates[i].KRAEvalId;
            else
                tr_KraEvalId = 0;

            var ID = moment(EvaluationDates[i].EvaluationDate).format("MMDDYYYY") + "_" + tr_KraEvalId;
            var Date = moment(EvaluationDates[i].EvaluationDate).format("MM/DD/YYYY");

            Evaluation += "<tr id='tr" + ID + "'><td><input type='text' class='datepicker widthClass' id='txt" + ID + "_" + TID + "'></td><td><input type='image' id='" + ID + "_" + TID + "' src='../Images/Delete.gif' name='image' class='dlt'></td></tr>"
            ArrIds.push({ "ID": ID + "_" + TID, "Date": Date });

        }

        Evaluation += "</table><div style='clear:both;'></div><span class='blue-button' style='float: right;margin-right: 75px;'><input type='button' id='btnAdd_Evaluations" + TID + "' class='btn' value='Add Evaluation Period'></span><div style='clear:both;'></div>";;
        DiffrentProject += "</table><div style='clear:both;'></div>";
        Sameproject += "</table><div style='clear:both;'></div>";
        str += Sameproject + DiffrentProject + Evaluation + "</div>";


    }
    $(document).on('click', '.dlt', function () {
        var KRAEvalId = 0;
        var TableID = $(this).parent().parent().parent().parent().attr('id');
        var trId = $(this).parent().parent().attr('id');

        var KRAEvalId = trId.split('_')[1];

        if (parseInt(KRAEvalId) > 0)
            DeletedEvaluationIds.push(KRAEvalId);

        $(this).parent().parent().remove();
        if ($("#" + TableID).prop('rows').length <= 1) {
            $("#" + TableID).append("<tr class='NoRecordRow' id='0_0'><td colspan='2'>No records found</td></tr>");
        }
    });
    $(document).on('click', '.btn', function () {
        /*Check if table has no records,remove no records row*/
        var ID = (this.id).split("_")[1];
        if ($("#Table_" + ID + " .NoRecordRow")[0]) {
            $("#Table_" + ID + " tr:nth-child(2)").remove();
        }
        /*Check if table has no records,remove no records row*/
        $("#Table_" + ID).append("<tr id='0_0'><td><input type='text' class='datepicker widthClass'></td><td><input type='image' src='../Images/Delete.gif' name='image' class='dlt'></td></tr>");
        ApplyDatePickers();
    });
    $("#btnSaveNext").click(function (e) {
        e.preventDefault();
         
        $("#ulVs").empty();
        var SelectedProjId = $("#drpProjects").val();
        var SelectdProjName = $("#drpProjects :selected").text();
        var EvalutionPer = $("#drpEvaluation").val();
        $("div[id^=tab_]").each(function () {
            $(this).find('td .datepicker').each(function () {
                if (moment($(this).val(), "MM/DD/YYYY").isValid() == false) {
                    var TabId = $(this).parent().parent().parent().parent().parent().parent().attr("id");

                    var EmployeeName = $(this).parent().parent().parent().parent().parent().parent().parent().find($('a[href$="' + TabId + '"]')).find('span').html();
                    $("#ulVs").append("<li>There are some Invalid Dates for " + EmployeeName + "</li>");
                }
            });
        });
        if (SelectedProjId == 0) {
            $("#ulVs").append("<li>Please Select Project</li>");
        }
        $.each($("table[id^=Table_Evaluations]"), function () {
            if ($(this).find('td .datepicker').length == 0) {
                var TabId = $(this).parent().parent().attr("id");
                
                var EmployeeName = $(this).parent().parent().parent().find($('a[href$="' + TabId + '"]')).find('span').html();
                $("#ulVs").append("<li>There are no Evaluation dates found for " + EmployeeName + "</li>");
            }
        });        
        if ($("#chkemployees").find('input[type=checkbox]:checked').length == 0 && UpdatedTeamMemberId == 0) {
            $("#ulVs").append("<li>Please Select Employees</li>");
        }
        if (EvalutionPer == 0) {
            $("#ulVs").append("<li>Please Select KRA Evaluation Period</li>");
        }
        if ($("#ulVs").children().length > 0) {
            return false;
        }

        var TeamSelection_Step1_Data = new Array();
        $("div[id^=tab_]").each(function () {
             
            var EmpArray = { "EvalDatesForSameProject": [], "EvalDatesForDifferentProject": [], "GeneratedEvalDates": [] };
            var TmId = this.id.split("_")[1];
            var EmpId = this.id.split("_").pop();

            if ($("#Table_Same" + TmId + " tr").length > 1) {
                $("#Table_Same" + TmId + " tr:gt(0)").each(function () {
                     
                    var Id = $(this).attr('ID').split('_')[0];
                    if (Id != "0") {
                        var KRAEvalId = $(this).attr('ID').split('_').pop();
                        var Date = $(this).find('td .datepicker').val();
                        EmpArray.EvalDatesForSameProject.push({ "TMID": Id, "KRAEvalDate": Date, "KRAEvalId": KRAEvalId });
                    }
                });
            }


            if ($("#Table_Different" + TmId + " tr").length > 1) {
                $("#Table_Different" + TmId + " tr:gt(0)").each(function () {
                     
                    var Id = $(this).attr('ID').split('_')[0];
                    if (Id != "0") {
                        var KRAEvalId = $(this).attr('ID').split('_').pop();
                        var Date = $(this).find('td .datepicker').val();

                        EmpArray.EvalDatesForDifferentProject.push({ "TMID": Id, "KRAEvalDate": Date, "KRAEvalId": KRAEvalId });
                    }
                });
            }
            
            $("#Table_Evaluations" + TmId + " td .datepicker").each(function () {
                 
                var trId = $(this).parent().parent().attr('id');
                var splitedtrId = trId.split('_');
                var KraEvaluationId = splitedtrId[1];

                EmpArray.GeneratedEvalDates.push({ "KraEvaluationId": KraEvaluationId, "EvaluationDate": $(this).val() })

            });
            EmpArray.TeamMemberId = TmId;
            EmpArray.EmpId = EmpId;
            EmpArray.StartDate = $(this).find('span[id^=prjStrDate]').html();
            EmpArray.EndDate = $(this).find('span[id^=prjEndDate]').html();
            EmpArray.NextAppraisalDate = $(this).find('span[id^=appr]').html();
            TeamSelection_Step1_Data.push(EmpArray);
        });


        $.ajax({
            type: "POST",
            url: 'TeamSelection_Step1.aspx/SaveData',
            data: "{'objTeamSelection_Step1_Data':" + JSON.stringify(TeamSelection_Step1_Data) + ",'checkboxListEmpVal':" + JSON.stringify(LstEmployees) + ",'DeletedEvaluationIds':" + JSON.stringify(DeletedEvaluationIds) + ",'ProjectId':" + parseInt(SelectedProjId) + ",'EvalutionPeriod':" + parseInt(EvalutionPer) + ",'SelectdProjName':" + JSON.stringify(SelectdProjName) + "}",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            async: false,
            success: function (jsonResult) {
                window.location.href = "../KRA/TeamSelection.aspx";
            }
        });

    });

    // Dislay Employee Name in Edit mode
    function DisplayEmpName(UpdatedTeamMemberId) {
        $.ajax({
            type: "POST",
            url: "TeamSelection.aspx/GetEmpName",
            contentType: 'application/json; charset=utf-8',
            datatype: 'json',
            async: false,
            success: function (result) {
                $("#divEmpName").append($('<label></label>').text(result.d).css({ display: 'inline-block', height: '23px', padding: '7px', 'text-align': 'center' }).attr("id", UpdatedTeamMemberId));
                //$('#lblEmpName').text(result.d).css({ display: 'inline-block', height: '23px', padding: '7px', 'text-align': 'center' });

            }

        });
    }
    function ShowMessage(Issucess, Message) {
        if (Issucess) {

            $("#lblMessage").removeClass('alert alert-warning');
            $("#lblMessage").addClass('alert alert-success');
            $("#lblMessage").text(Message);

        }
        else {
            $("#lblMessage").addClass('alert alert-warning');
            $("#lblMessage").removeClass('alert alert-success');
            $("#lblMessage").text(Message);
        }
    }
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
});
