$(document).ready(function () {
$("#txtKPITitle").addClass("addkpi-textbox");
var successBindObjective = "false";
//
	BindObjectivesAndKRAs();
	BindFunction();    
    if(successBindObjective=="true")
    {
    //alert("successtrue");        
        IsBackForFirstStep();
    }

});

//Get parent and child functions list
function BindFunction() {
	$.ajax({
		type: "POST",
		url: 'FunctionListing.aspx/GetParentAndChildFunction',
        async: false,
		data: "{}",
		contentType: 'application/json; charset=utf-8',
		datatype: 'json',
		success: function (result) {
			// alert(result.d);
           // 
			var result = jQuery.parseJSON(result.d)
			var ParentFunc = (result.TblParentFunc);
			var ChildFunc = (result.TblChildFunc);
			var KPIFunc = (result.TblKPIApply);
            

			//alert(ParentFunc);
      $("#dvFuncList").empty();
      
			for (var i = 0; i < ParentFunc.length; i++) {
				var flag = 0;
				//alert("step1");
				
				var funcDivID = "divFunc" + ParentFunc[i].FunctionID;
				var ParentId = (ParentFunc[i].FunctionID);


				$('#dvFuncList').append($("<div></div>").addClass("addkpi-radio-div addkpi-checkbox-div").attr("id", funcDivID));

				$("#" + funcDivID).append($("<div></div>").addClass("addkpi-checkbox1").attr({ id: 'dvParFunc' + ParentId }).append($('<input>').attr({
					type: 'checkbox', name: 'chkParFunc', value: ParentFunc[i].FunctionTitle, id: 'chkParFunc' + ParentId, class: 'parentFunc'
				})));
                $("#"+funcDivID).append($('<p></p>').append($('<strong></strong>').html(ParentFunc[i].FunctionTitle)));

                //$("#p"+funcDivID).append($('<strong></strong>').html(ParentFunc[i].FunctionTitle));
//                .append($('<label>').attr({
//					'for': 'chkParFunc' + ParentId
//				}).text(ParentFunc[i].FunctionTitle)));

				//$("#" + funcDivID).append($("<div></div>").html(ParentFunc[i].FunctionTitle).attr("class", "functiontitle"));
				$("#" + funcDivID).append($("<div></div>").html(ParentFunc[i].FunctionID).attr("style", "display:none").attr("class", "parentfuncid"));
                $("#" + funcDivID).append($("<br></br>"))
				//$("#" + funcDivID).append($("<div></div>").html(ParentFunc[i].FunctionDescription).attr("class", "functiondescription"));
				//$("#" + funcDivID).append($("<a></a>").text("  Edit  ").attr("id", "Edit" + funcDivID).attr("href", "#").attr("class", "editParentFunction").attr("onclick", "editParent()"));


				for (var childIndex = 0; childIndex < ChildFunc.length; childIndex++) {

					if (ParentFunc[i].FunctionID == ChildFunc[childIndex].ParentFunctionID) {
						flag = 1;

					}
				}
				//if (flag == 1) {
				//	$("#" + funcDivID).append($("<a></a>").text("Delete").attr("id", "Delete" + funcDivID).attr("href", "#").attr("class", "disableLink").prop('disabled', 'disabled'));
				//}
				//else {

				//	$("#" + funcDivID).append($("<a></a>").text("Delete").attr("id", "Delete" + funcDivID).attr("href", "#").attr("class", "DeleteParentFunction"));

				//}


				//alert("step1 complete");
				for (var childIndex = 0; childIndex < ChildFunc.length; childIndex++) {
					//alert("step3")
					var fladKRA = 0;
					if (ChildFunc[childIndex].ParentFunctionID == ParentFunc[i].FunctionID) {
						var childFuncDivID = "divchildFunc" + ChildFunc[childIndex].FunctionID;
						//$("#" + funcDivID).append($("<div style='padding-left:20px;'></div>").attr("id", childFuncDivID));

						$("#" + funcDivID).append($('<input>').attr({
							type: 'checkbox', name: 'chkChildFunc', value: ChildFunc[childIndex].FunctionTitle, id: 'chkChildFunc' + ChildFunc[childIndex].FunctionID, class: 'childFunc'
						}).addClass("addkpi-checkbox2")).append($('<p><label></p>').attr({'for': 'chkChildFunc' + ChildFunc[childIndex].FunctionID}).text(ChildFunc[childIndex].FunctionTitle)).append("<br/>");

						
						//$("#" + childFuncDivID).append($("<div></div>").html(ChildFunc[childIndex].FunctionTitle).attr("class", "functiontitle"));
						//		$("#" + childFuncDivID).append($("<a></a>").text("Edit  ").attr("id", "Edit " + childFuncDivID).attr("href", "#").attr("class", "editChildFunction"))
						//.append($("<a></a>").text(" View KRA Applicable ").attr("id", "View KRA Apllicable" + childFuncDivID).attr("href", "#").attr("class", "editDelFunction"));

//						for (var KPIIndex = 0; KPIIndex < KPIFunc.length; KPIIndex++) {

//							if (ChildFunc[childIndex].FunctionID == KPIFunc[KPIIndex].FunctionID) {
//								fladKRA = 1;

//							}
//						}
						//if (fladKRA == 1) {
						//	$("#" + childFuncDivID).append($("<a></a>").text("Delete").attr("id", "Delete" + funcDivID).attr("href", "#").attr("class", "disableLink"));
						//}
						//else {

						//	$("#" + childFuncDivID).append($("<a></a>").text("Delete").attr("id", "Delete" + funcDivID).attr("href", "#").attr("class", "DeleteChildFunction"));

						//}
					}

				}
				//$("#dvFuncList").append($("<hr></hr>"));
				//$("#dvFuncList").css("border-right", "1px solid #ff0000");
                 IsBackForFirstStep();                   
			}
            
            
		},
		error: function (result) {        
			alert(result);
		},
        

	});   
     
}


//Get Objectives and KRAs list
function BindObjectivesAndKRAs() {
	$.ajax({
		url: "../KRA/AddKPI.aspx/GetObjectiveAndKraList",
		type: "post",
        async: false,
		contentType: "application/json;charset=utf-8",
		dataType: "json",
		success: function (jsonData) {             
			var Obj = jQuery.parseJSON(jsonData.d);
			var Objective = Obj.TblObjectiveList;
			var KRA = Obj.TblKRAList;
            
            var ObjRowLength;
            var CountObjLength = (Objective.length % 3);
            
            if(CountObjLength != 0)
            {
                var decimelLength = (Objective.length /3 ).toString();
                var splitlength = decimelLength.split('.');
                ObjRowLength = parseInt( splitlength[0]) + 1;
            }
            else{
            ObjRowLength = (Objective.length / 3);
            }
            //alert(ObjRowLength);
            var KraRowLength;
            //
			$("#dvKraList").empty();
            
			for (var ObjIndex = 0; ObjIndex < Objective.length; ObjIndex++) {

				var ObjectiveDivID = "divObjective_" + Objective[ObjIndex].ObjectiveID;
				//$("#dvKraList").append($("<div style='border-right:1px solid red;'></div>").attr("id", ObjectiveDivID));
                $("#dvKraList").append($("<div></div>").attr("id",ObjectiveDivID).addClass("addkpi-radio-div"))

				
				var ObjectiveColor = "#" + Objective[ObjIndex].ObjectiveBGColor;
				

				$("#" + ObjectiveDivID).append($("<div></div>").html(Objective[ObjIndex].ObjectiveTitle).addClass("addkpi-radio-div-head").css("background-color", ObjectiveColor));

				

				for (var KRAIndex = 0; KRAIndex < KRA.length; KRAIndex++) {

					if (KRA[KRAIndex].ObjectiveID == Objective[ObjIndex].ObjectiveID) {

						var KRADivID = "divKRA_" + KRA[KRAIndex].KRAID;
						var KRAColor = "#" + KRA[KRAIndex].KRABGColor;
						
						
						$("#" + ObjectiveDivID).append($('<input>').attr({
							type: 'radio', value: KRA[KRAIndex].KRATitle, id: 'rbtnKRAList' + KRA[KRAIndex].KRAID , name: 'rbtnKRA'
						}).addClass("addkpi-radio")).append($('<p><label>').attr({ for: 'rbtnlistitem' + KRA[KRAIndex].KRAID }).text(KRA[KRAIndex].KRATitle)).css("background-color", KRAColor);


                        
						//------Description removed---

						//if (KRA[KRAIndex].KRADescription.length > 10) {
						//	var KRADescription = KRA[KRAIndex].KRADescription.substr(0, 10) + "...";
						//	//$("#" + KRADivID).append($("<div></div>").html(KRADescription).css("color", "white").append($("<a></a>").text("Read More").attr("href", "#").css("color", "pink")));
						//}
						//else {
						//	$("#" + KRADivID).append($("<div></div>").append($('<input>').attr({
						//		type: 'radio', value: KRA[KRAIndex].KRADescription, id: 'rbtnKRAList' + KRA[KRAIndex].KRAID, name: 'rbtnKRA'
						//	})).html(KRA[KRAIndex].KRADescription).append($('<label>').attr({ for: 'rbtnlistitem' + KRA[KRAIndex].KRAID }).text(KRA[KRAIndex].KRADescription)).css("color", "white"));
						//}

						//$("#" + KRADivID).append($("<div></div>").append($("<a></a>").text("Edit").attr("id", "Edit" + KRADivID).attr("href", "#").attr("class", "EditKRAClass").css("color", "pink"))
						//																 .append($("<a></a>").text("Delete").attr("id", "Delete" + KRADivID).attr("href", "#").attr("class", "DeleteKRAClass").css("color", "pink")));

					}
				}
				//$("#dvKraList").append($("<div></div>").css("border-left", "thick solid #ff0000"));
				//$("#dvKraList").css("border-left", "1px solid #ff0000");
			}           
            
		},
		error: function () { }
	});
   
}



function IsBackForFirstStep()
{
     $.ajax({
    url:"../KRA/AddKPI.aspx/IsBackFirstKPIStep",
    type:"post",
    async: false,
    contentType:'application/json; charset=utf-8',
    success:function(jsonData){
   
     // alert("success");
             //alert(jsonData.d);
            if(jsonData.d!="")
            {            
            var Obj = jQuery.parseJSON(jsonData.d);
            var KraRadioButtonID = "#" + Obj.KPIObjKRAListId;
            var KraFunctionLength = Obj.KPIFunctionListId.length;
            var IsEdit=Obj.IsEdit;
            //alert(Obj.KPIFunctionListId);
            // alert("Obj.KPITitel : ");
             //alert(Obj.KPITitle);
            $("#txtKPITitle").val(Obj.KPITitle);
            //alert(Obj.KPIFunctionListId[0]);
            //alert(Obj.KPIObjKRAListId);
            //alert(KraRadioButtonID);

            $(KraRadioButtonID).prop("checked", true);
            
            $('#chkIsDefault').prop('checked',Obj.IsDefaultKPI);

            for (var Index = 0; Index < KraFunctionLength; Index++) {
                $("#" + Obj.KPIFunctionListId[Index]).prop("checked", true);
            }
            }

            if(IsEdit=="true")
            {

              $('.addkpi-radio').prop('disabled',true);

                for(var Index=0;Index<Obj.AssignedFunctionToEmployee.length;Index++)
                {
                    $("#"+Obj.AssignedFunctionToEmployee[Index]).prop("disabled",true);
                }
           }
           $.ajax({
                    url:"../KRA/AddKPI.aspx/CheckIsDefault",
                    type:"post",
                    async: false,
                    contentType:'application/json; charset=utf-8',
                    success:function(jsonData){                    
                    if(jsonData.d=='True')
                    {
                        $('#chkIsDefault').prop('checked',true);
                    }

                }
            });
    },
    error:function(response){    
    alert(response.responseText);
    
    }

    });
}

 $(document).on("click", "INPUT[id^=chkParFunc]", function (event) {
        //$("INPUT[id^=chkParFunc]").click(function (event) {
        var targetId = event.target.id;        
        var parentdvId = $(this).parent().parent().attr('id');
        
        if ($("#" + targetId + ":checked").length > 0) {
            $("#" + parentdvId + " input:checkbox").each(function () {
                $("#" + parentdvId + " input:checkbox").prop("checked", true);
            });
        }
        else {
            $("#" + parentdvId + " input:checkbox").each(function () {
                $("#" + parentdvId + " input:checkbox").prop("checked", false);
            });
        }
    });


//    $("[id*=btnCancel]").click(function () {
//    $('#txtKPITitle').val("");
//    $('input:checkbox').prop('checked', false);
//    $('input:radio').prop('checked', false);
//});

$(document).on("click", "INPUT[id^=chkChildFunc]", function (event) {
        //$("INPUT[id^=chkChildFunc]").click(function (event) {
        
        var targetId = event.target.id;
        var parentdvId = $(this).siblings().attr('id');        
        var length = $("#" + targetId + ":checked").length
        
        if (length > 0) {
            var t = $(this).siblings().is(':checked');
//            if ($(this).siblings().is(':checked')) {
//                $("#" + parentdvId + " input:checkbox").each(function () {
//                    $("#" + parentdvId + " input:checkbox").prop("checked", true);
//                });
            //}
        }
        else {
            $("#" + parentdvId).find('input:checkbox:first').each(function () {
                $(this).prop("checked", false);
            });
        }
    });

$(document).on("click","#btnCancel",function(e){
e.preventDefault();
 $('#txtKPITitle').val("");
    $('input:checkbox').prop('checked', false);
    $('input:radio').prop('checked', false);
    window.location="../KRA/kpilisting.aspx";
});
    

$(document).on("click","#btnNext",function (e) {

    e.preventDefault();
    var cbList = {};
    cbList.id = [];
    cbList.value = [];
    var rbList = null;
    var rbId = null;
    var KPITitle = $('#txtKPITitle').val();
    var Data = null;
    var selectedKRAsObjId = null;

    if (ValidatePageSelection()) {

        // Check how many checkbox are checkd
        $('#dvFuncList input:checkbox').each(function () {
            if (this.checked) {
                cbList.value.push($(this).val());
                cbList.id.push($(this).attr("id"));
            }
        });

        //check how many radio buttons are checked
        $('input:radio').each(function () {
            if (this.checked) {
                rbList = $(this).val();
                rbId = $(this).attr("id");
                selectedKRAsObjId = $(this).parent().attr("id");
            }
        });

        var isDefaultKPI=$('#chkIsDefault').is(':checked');
       
        data = { name: KPITitle, checkboxListId: cbList.id, checkboxListVal: cbList.value, radiobuttonListId: rbId, radiobuttonListVal: rbList, selectedKRAsObjId: selectedKRAsObjId,isDefaultKPI:isDefaultKPI};
        $.ajax({
            type: "POST",
            url: "../KRA/AddKPI.aspx/sendData",
            async: false,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (data) {
                var result = jQuery.parseJSON(data.d); 
                var SuccessResult=result.dtIsKPIUnique              
                
                if (SuccessResult == "") {
                    $('#dvErrors ul').remove();
                    $("#dvErrors").hide();
                    window.location = "../KRA/AddKPIGuidelines.aspx?Edit="+result.IsEdit;
                } 
                else {
                    var funcTitle = "";
                    for (var index = 0; index < SuccessResult.length; index++) {
                        if(result.IsEdit!="true")
                        {
                        if (index == 0) {
                            funcTitle = funcTitle + SuccessResult[index].FunctionTitle;
                        }
                        else {
                            funcTitle = funcTitle + ", " + SuccessResult[index].FunctionTitle;
                        }
                         $("#lblMessage").text("Functions " + funcTitle + " are already exists for this KPI and this KRA").addClass("yellow-error");
                        }
                        else
                        {
                            $("#lblMessage").text("KPI "+SuccessResult[index].KPITitle+"is already exists for this KRA").addClass("yellow-error");
                        }

                    }
                   
                    $('#dvErrors').show();
                }

            },
            error: function (msg) {
                //error
                alert("error");
            }
        });
        $('#dvErrors ul').remove();
    }
    else {
    $("#dvErrors").show();
//    $('#dvErrors ul').remove();
//        if (ValidateKPIName()) {
//            $('#dvErrors ul').remove();
//        }
//        if (ValidateRadio()) {
//            $('#dvErrors ul').remove();
//        }
//        if (ValidateCheckbox()) {
//            $('#dvErrors ul').remove();
//        }
//          
//        if (!ValidateKPIName()) {        
//            $('#dvErrors').append($("<ul>").html("<li>please enter KPI Title</li></ul> "));
//        }
//        if (!ValidateRadio()) {        
//            $('#dvErrors').append($("<ul>").html("<li>Please select KRA</li></ul>"));
//        }
//        if (!ValidateCheckbox()) {        
//            $('#dvErrors').append($("<ul>").html("<li>Please select  Function</li></ul>"));
//        }
        $(window).scrollTop($('#dvErrors').offset().top);
    }
});
function ValidatePageSelection()
{
$('#dvErrors').empty();
var KRA,Function,Title;
Title=ValidateKPIName();
KRA=ValidateRadio();
Function=ValidateCheckbox();

   return KRA && Function && Title;
}


//$('#dvErrors').Empty();
//    if ($("input:checkbox:checked").length == 0)
//    {
//        $('#dvErrors').append($("<ul>").html("<li>Please select  Function</li></ul>"));
//    } 
//    if($("input:radio:checked").length == 0)
//    {
//        $('#dvErrors').append($("<ul>").html("<li>Please select KRA</li></ul>"));
//    }
//    if($.trim($('#txtKPITitle').val()) == '')
//    {
//        $('#dvErrors').append($("<ul>").html("<li>please enter KPI Title</li></ul> "));
//    }
//    if($('#dvErrors').children().length>0)
//    {
//        return false;
//    }
//    else
//    {
//        return true;
//    }

function ValidateCheckbox() {
    if ($("#dvFuncList input:checkbox:checked").length > 0) {
        // any one is checked        
        $("#dvErrors").hide(); 
        return true;
    }
    else {
        // none is checked
        $('#dvErrors').append($("<ul>").html("<li>Please select  Function</li></ul>"));
//        $("#dvErrors").show();
        return false;
    }
}

function ValidateRadio() {
    if ($("input:radio:checked").length > 0) {
        // any one is checked
        return true;
        $("#dvErrors").hide();
         return true;
    }
    else {
     $('#dvErrors').append($("<ul>").html("<li>Please select KRA</li></ul>"));
        // none is checked
//        $("#dvErrors").show();
        return false;        
    }
}

function ValidateKPIName() {
    var KPITitle = $('#txtKPITitle').val();
    if ($.trim(KPITitle) != '') {        
        $("#dvErrors").hide();
        return true;
    }
    else {       
         $('#dvErrors').append($("<ul>").html("<li>please enter KPI Title</li></ul> "));
          return false;
//        $("#dvErrors").show();
    }
}



