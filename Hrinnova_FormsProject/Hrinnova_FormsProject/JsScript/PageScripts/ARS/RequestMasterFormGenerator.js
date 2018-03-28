$(document).ready(

    function () {
        $("#txtRequestName").blur(function () {
            
            $("#validationSummary").hide();
        });
        
        $("#validationSummary").hide();
        var setupCheckboxes = function () {
            // Checkbox Styling
            $('input[type=checkbox]').each(function () {


                if (!$(this).parent().hasClass('checkbox')) {

                    if ($(this).css('display') != "none") {
                        $(this).next('label').andSelf().wrapAll('<div class="checkbox checkbox-primary"></div>')
                        var $this = $(this);
                        if ($(this).siblings('label').length == 0) {
                            $('<label class="" for=' + $(this).attr('id') + '></label>').insertAfter($this)
                        }
                        $this.attr("name");
                        var id = $(this).attr('id');

                        var dispalyStatusOfControl = "";
                        if ($this.css('display') == "block" || $this.css('display') == ("inline-block") || $this.is(":visible")) {
                            dispalyStatusOfControl = "true";
                        }
                        else {
                            dispalyStatusOfControl = "false";
                        }
                        var label = $(this).next('#' + id);
                        //console.log(label.attr('for'));
                        //var parentTable = $(this).parent('td').parent('tr').parent('tbody').parent('table');
                        //var isCheckBoxApply = true;
                        //if (parentTable != undefined) {
                        //    if (parentTable.attr('id') == 'MainContent_chkListEmp') {
                        //        isCheckBoxApply = true;
                        //    }
                        //    if (parentTable.closest('div').attr('id') != undefined) {
                        //        if (parentTable.closest('div').attr('id').indexOf("tViewParentTask") >= 0) {
                        //            isCheckBoxApply = true;
                        //        }
                        //    }
                        //}      
                        //if (isCheckBoxApply == true) {
                        if (dispalyStatusOfControl == "true") {

                            //$('<label class="checkbox-custom-label" for=' + id + '></label>').insertAfter($this);
                        }
                        else {
                            //$('<label class="checkbox-custom-label" style="display:none" for=' + id + '></label>').insertAfter($this);
                        }

                        //else {
                        //    $(this).attr('style', 'opacity:1;position:relative');
                        //}
                    }

                    else {
                        return true;
                    }
                }
            });

            // Radio Styling
            $('input[type=radio]').each(function () {
                if (!$(this).parents('.radio')) {
                    if ($(this).css('display') != "none") {

                        $(this).next('label').andSelf().wrapAll("<div class='radio radio-primary'></div>");
                        var $this = $(this);
                        if ($(this).siblings('label').length == 0) {
                            $('<label class="" for=' + $(this).attr('id') + '></label>').insertAfter($this)
                        }
                        $this.attr("name");
                        var id = $(this).attr('id');
                        //$('<label class="radio-custom-label" for=' + id + '></label>').insertAfter($this); 
                    }

                    else {
                        return true;
                    }
                }
            });


        };
        $("#btnCancel").click(function (e) {
            e.preventDefault();
            window.location.href = "/Admin/requestmaster.aspx";
        });

        //#region start  'Globle Member' 
        var HtmlConntrolToselect = ["RadioButton", "Radio", "Select", "CheckBox"];
        var RequestId = 0;
        function IncludedField() {
            RequestFieldMasterId = 0;
            RequestID = 0;

            FieldName = ko.observable();
            Type = ko.observable();
            UIID = ko.observable();
            EnumValue = ko.observable();
            ControlType = ko.observable();
            IsInclude = ko.observable(true);
            IsVisible = ko.observable(true);
            IsMandatory = ko.observable(true);
            IsValidationRequired = ko.observable(true);
            FieldCaption = ko.observable();

            RequiredMessage = ko.observable();
            DefaultValue = ko.observable();
            ValidationMessage = ko.observable();
        }

        //#endrigion 'Globle Member'

        //#region 'Initialization of page'
        SetRequestIdFromQueryString()
        GetFormField();
        //#endregion 

        //#region 'knockout extension'
        ko.observable.fn.asString = function () {
            var source = this;

            return String(source());
        };
        //#endregion



        // #region viewModel
        var FieldViewModel = new function () {
            var self = this;
            //self.TestFunction = function () {
            //    //alert(self.RequestId());

            //    self.RequestId("test");
            //    alert(self.RequestId());
            //    console.log('test function');

            //}

            self.Message = ko.observable('');
            self.SaveStatus = ko.observable(-1);
            self.VisibleCount = 0;
            self.Status = ko.observable(true);
            self.ShowHide = function () {
                var element = this;
                element.IsVisible(!element.IsVisible());

            }


            self.Add = function () {
                var Field = this;

                var sField = new IncludedField();

                sField.RequestFieldMasterId = Field.ID;
                sField.RequestID = self.RequestId();
                sField.FieldName = ko.observable(Field.FieldName());
                sField.Type = ko.observable(Field.Type());
                sField.UIID = ko.observable(Field.UIID());
                sField.EnumValue = ko.observable(Field.EnumValue());
                sField.ControlType = ko.observable(Field.ControlType());
                sField.IsInclude = ko.observable(true);
                sField.IsVisible = ko.observable(true);
                sField.IsMandatory = ko.observable(true);
                sField.IsValidationRequired = ko.observable(true);
                sField.FieldCaption = ko.observable(Field.FieldName());
                sField.RequiredMessage = ko.observable(Field.FieldName() + " is Required ");
                sField.ValidationMessage = ko.observable(" InValid " + Field.FieldName());

                sField.DefaultValue = ko.observable(" Please  Select " + Field.FieldName());
                self.SelectedField.push(sField);

                Field.IsInclude(true);
                setupCheckboxes();
            }



            self.Remove = function () {

                var ssField = this;



                $.each(self.FormField(), function (index, data) {

                    if (data.ID == ssField.RequestFieldMasterId) {

                        self.SelectedField.remove(ssField);


                        data.IsInclude(false);
                    }
                });




            }

            self.Clear = function () {
                self.RequestId(0);
                self.RequestName('');
                self.HREmail('');
                self.IsApprovalRequired(false);
                self.IsHrApprovalRequired(false);
                self.IsTimeSheetEntryMandatory(false);
                self.IsAffactOnAttendance(false);
                self.RequestCategory(0);
                self.SelectedField.removeAll();

                $.each(self.FormField(), function (index, data) {
                    data.IsInclude(false);

                });

            }

            self.RequestName = ko.observable();
            self.HREmail = ko.observable('');
            self.RequestId = ko.observable("0");

            self.IsHrApprovalRequired = ko.observable(false);
            self.IsApprovalRequired = ko.observable(false);
            self.RequestCategory = ko.observable("");
            self.IsAffactOnAttendance = ko.observable(false);
            self.IsTimeSheetEntryMandatory = ko.observable(false);
            self.EnumValue = ko.observable("");
            self.FormField = ko.observableArray();



            self.SelectedField = ko.observableArray();

            self.SaveRequest = SaveRequest;


        };
        //endregion viewmodel

        //#region 'Globle function'
        function GetFormField() {
            var DTO = { RequestId: RequestId }
            $.ajax({
                url: "RequestMasterFromgenerator.aspx/GetFormField",
                type: "POST",
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(DTO), // ' {"RequestId" :"0" }',
                success: BindViewModel,



                error: OnError
            });
        }
        function SetRequestIdFromQueryString(sParam) {

            var sParam = 'RequestId';
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');
            for (var i = 0; i < sURLVariables.length; i++) {
                var sParameterName = sURLVariables[i].split('=');


                if (sParameterName[0] == sParam) {

                    RequestId = sParameterName[1];
                }

            }
        }


        //#endregion 'Globle function' 

        // #region child function 
        function BindViewModel(_result) {

            var _data = jQuery.parseJSON(_result.d);


            if (_data.value == 0) {

                FieldViewModel.Message(_data.Message);
                FieldViewModel.SaveStatus(_data.value);
                ko.applyBindings(FieldViewModel);
                return;
            }
            /*In Generalised requests,User can not change the fields*/
            if (_data.RequestId > 0 && _data.RequestCategory == 2)
                $("#Define-Field").hide();
            /*In Generalised requests,User can not change the fields*/
            FieldViewModel.RequestId(_data.RequestId);
            FieldViewModel.RequestName(_data.RequestName);
            if (_data.HREmail == null)
                _data.HREmail = "";
            FieldViewModel.HREmail(_data.HREmail);
            FieldViewModel.IsHrApprovalRequired(_data.IsHrApprovalRequired);
            FieldViewModel.IsApprovalRequired(_data.IsApprovalRequired);
            FieldViewModel.RequestCategory(_data.RequestCategory);
            FieldViewModel.IsAffactOnAttendance(_data.IsAffactOnAttendance);
            FieldViewModel.IsTimeSheetEntryMandatory(_data.IsTimeSheetEntryMandatory);
            FieldViewModel.EnumValue(_data.EnumValue);
            FieldViewModel.Status(_data.Status);
            if (_data.IsHrApprovalRequired)
            {
                $("#asterisk_HREmail").show();
            }
            else
            {
                $("#asterisk_HREmail").hide();
            }
            $.each(_data.FormField, function (index, data) {


                //Start: Disable field dif it is already in seleted list
                $.each(_data.SelectedField, function (index, selectedField) {

                    if (selectedField.RequestFieldMasterId == data.ID) {

                        //self.SelectedField.remove(ssField);


                        data.IsInclude = true;
                    }
                });


                // End 

                var Field = {
                    ID: data.ID,
                    FieldName: ko.observable(data.FieldName),
                    Type: ko.observable(data.ID),
                    UIID: ko.observable(data.UIID),
                    EnumValue: ko.observable(data.EnumValue),
                    ControlType: ko.observable(data.ControlType),
                    IsInclude: ko.observable(data.IsInclude),
                    Status: ko.observable(true),
                }
                FieldViewModel.FormField.push(Field);


            }

            );

            $.each(_data.SelectedField, function (index, data) {

                var sField = new IncludedField();

                sField.RequestFieldMasterId = data.RequestFieldMasterId;
                sField.RequestID = _data.RequestId;

                sField.FieldName = ko.observable(data.FieldCaption);
                sField.Type = ko.observable(data.Type);
                sField.UIID = ko.observable(data.UIID);
                sField.EnumValue = ko.observable(data.EnumValue);
                sField.ControlType = ko.observable(data.ControlType);
                sField.IsInclude = ko.observable(data.IsInclude);
                sField.IsVisible = ko.observable(data.IsVisible);
                sField.IsMandatory = ko.observable(data.IsMandatory);

                sField.IsValidationRequired = ko.observable(data.IsValidationRequired);
                sField.FieldCaption = ko.observable(data.FieldCaption);

                sField.RequiredMessage = ko.observable(data.RequiredMessage == "Null" ? "" : data.RequiredMessage);
                sField.DefaultValue = ko.observable(data.DefaultValue);
                sField.ValidationMessage = ko.observable(data.ValidationMessage == "Null" ? "" : data.ValidationMessage);
                FieldViewModel.SelectedField.push(sField);



            }
                );

            ko.applyBindings(FieldViewModel);
            setupCheckboxes();
        }
        function SaveRequest() {

            //Console.log('save called');
            // alert($('#form1').valid());
            // ValidateOnAjaxSave();
            var IsValid = true;
            if ($("#chkHRrApproval").prop('checked') == true) {
                if ($("#hrEmailAdd").val() == "") {
                    IsValid = false;
                    var element = $("#HREmailMessage").length;
                    if (element == 0)
                    {
                        $("#validationSummary").children().append("<li><span id='HREmailMessage' >Please Enter HR Email</span></li>")
                        $("#validationSummary").children().show();
                        $("#validationSummary").show();
                    }
                }
            }
            else
            {
                if ($("#chkApprovalRequired").prop('checked') == false)
                {
                    IsValid = false;
                    $("#validationSummary").html('');
                    $("#validationSummary").show();
                    $("#validationSummary").append("<ul><li>Request should not be allowed to deactivate both the approval</li></ul>")
                    $("#validationSummary").children().show();
                }
            }
            if (IsValid) {
                RegisterDynamicFieldValidator();

                if (!$("#form1").valid()) {
                    $("#validationSummary").show();
                    return;
                }
                else
                    $("#validationSummary").hide();
                var DTO = {
                    _viewModel: ko.toJSON(FieldViewModel)

                }

                $.ajax({
                    url: "RequestMasterFromgenerator.aspx/SaveRequest",
                    type: "post",
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                    // data: '{ "_viewModel :" "' + JSON.stringify(ko.toJSON(FieldViewModel)) + '"}',

                    data: JSON.stringify(DTO),
                    // data: "{}",


                    success:
                         function (result) {

                             FieldViewModel.SaveStatus(0);
                             FieldViewModel.Message('');


                             SaveSucess(result);
                         }
                    ,
                    error: OnError
                    //function (data)
                    //    {

                    //        alert('error');
                    //    }
                });


                //    alert('Submit Form :UnderDevelopment ')
            }
        }


        function SaveSucess(result) {

            var jSONResullt = jQuery.parseJSON(result.d);
            FieldViewModel.Message(jSONResullt.Message);
            FieldViewModel.SaveStatus(jSONResullt.value)

            if (jSONResullt.PageMode == 0) {
                FieldViewModel.Clear();
            }

            else if (jSONResullt.PageMode == 1) {

                window.location.href = "../Admin/RequestMaster.aspx?Message=" + jSONResullt.EncryptedQueryStringValue;

                //  CrossDomainPost(jSONResullt);
            }





        }
        function OnError(result) {

            FieldViewModel.Message("Found Error while saving record.");
            FieldViewModel.SaveStatus(result.value)



        }
        //#endregion child function

        function RegisterDynamicFieldValidator() {


            // Jquery validation for dynamic created filed 
            $(".right-container-section-body input[data-pms-enable-validation='true']").each(

        function (index, element) {





            $(element).rules('add', {
                required: $(element).attr('data-pms-isRequired') == 'true' ? true : false,

                messages: {
                    required: '' + $(element).attr('data-pms-requiredMessage') + ' <b> ' + $(element).attr('data-pms-messageFor') + '</b>'
                }

            });





        });
        }
        function CrossDomainPost() {
            $.ajax({
                type: "POST",
                url: "../Admin/RequestMaster.aspx",
                crossDomain: true,
                data: 'parm1=value1&param2=value2',
                success: function (data) {
                    // do something with server response data
                    window.location = "../Admin/RequestMaster.aspx?Message=" + jSONResullt.EncryptedQueryStringValue;
                },
                error: function (err) {
                    // handle your error logic here
                }
            });


        }
        $("#chkHRrApproval").change(function () {
            if ($("#chkHRrApproval").is(":checked"))
                $("#asterisk_HREmail").show()
            else
                $("#asterisk_HREmail").hide();
        })
        //#endregion

    }
    );


