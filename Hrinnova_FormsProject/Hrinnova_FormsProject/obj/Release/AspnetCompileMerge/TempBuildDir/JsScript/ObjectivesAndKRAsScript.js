$(document).ready(function () {

  
    $("#EditKRADialog").css("display", "none");
    //$("#divSelectedObjective").addClass("dropdown-text");
    var ObjObjectiveList;
    var SelectedObjectiveIDToEdit;
    var SelectedKraIDToEdit;
    var ObjectiveDescriptionLength = 50;
    var KRADescriptionLegth = 10;

    PageLoadMethod();
    Pickcolor();
    //Bind color picker in textbox
    function Pickcolor() {
        $("#txtObjBGcolor").pickAColor({
            showSpectrum: true,
            showSavedColors: true,
            saveColorsPerElement: false,
            fadeMenuToggle: true,
            showHexInput: true,
            showBasicColors: true,
            allowBlank: false

        }),
        
            $(".pick-a-color").on("change", function () {
                console.log($(this).val());
                var ColorText = $(this).val();
                $("#txtKRABGcolor").val("#" + ColorText);

            });
    }
    //method which get all objectives and KRAs and display.
    function PageLoadMethod() {    
    $("#txtKRADescription").addClass("text idlefield");
        $.ajax({
            url: "../KRA/ObjectivesAndKRAs.aspx/GetObjectiveAndKraList",
            type: "post",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (jsonData) {
                //alert("success");
                //alert(jsonData.d);
                var Obj = jQuery.parseJSON(jsonData.d);
                //alert(Obj);
                var Objective = Obj.TblObjectiveList;
                var KRA = Obj.TblKRAList;
                var KraKPI = Obj.TblKRAKPI;
                //                var ObjIndex = 0;
                var ObjBlockCount;
                var ObjBlockLength;
                var ObjectiveLength = Objective.length;
                ObjBlockCount = (ObjectiveLength % 3);
                if(ObjBlockCount != 0)
                {
                    var DecimalLength = (ObjectiveLength / 3).toString();                    
                    var splitLength = DecimalLength.split('.');
                ObjBlockLength = parseInt(splitLength[0]) + 1;
                }
                else{
                ObjBlockLength = (ObjectiveLength / 3);
                }
                
                //alert(KRA);
                //                alert("Objective length:" + Objective.length)
                //                var BlockCount = Math.ceil(Objective.length / 3);
                //                alert("block count:" + BlockCount);

                $("#MainDiv").empty();

                for (var BlockIndex = 0; BlockIndex < ObjBlockLength; BlockIndex++) {
                var ObjectiveLength;
                var ObjIndex;

                if (BlockIndex == 0) {
                    ObjectiveLength = 3;
                    ObjIndex = 0;
                }
                else {
                    ObjIndex = ObjectiveLength;
                    ObjectiveLength = ObjIndex + 3;
                }
                
                if(BlockIndex == 0)
                {
                    var TableID = "Objtbl"+BlockIndex;
                    var tbodyId ="ObjBody"+BlockIndex;
                    var DivBlockId = "BlockObjDiv"+BlockIndex;
        
                    //$("#MainDiv").append($("<div></div>").attr("id",DivBlockId).addClass("function-block-new"));
                
                    $("#MainDiv").append($("<div></div>").attr("id","BlockObjective").addClass("function-block-new"));
                    $("#BlockObjective").append($("<table></table>").attr("id",TableID).addClass("filter-table"));
                    $("#"+TableID).append($("<tbody></tbody>").attr("id",tbodyId));   
                                
                }
                
                var trObjId ="Objtr"+BlockIndex;
                var trKRAId ="KRAtr"+BlockIndex;  

                $("#" +tbodyId).append($("<tr></tr>").attr("id",trObjId));
                
                $("#"+tbodyId).append($("<tr></tr>").attr("id",trKRAId));   
         
                for (var Index = ObjIndex ; Index < ObjectiveLength; Index++) {

                if (Index >= Objective.length) {                        
                        break;
                    }

                var tdKRAId ="TdKRAsForObj_" + Objective[Index].ObjectiveID;
                

                //
                
//                $("#"+DivBlockId).append($("<table></table>").attr("id",TableID).addClass("filter-table"));
//                $("#"+TableID).append($("<tbody></tbody>").attr("id",tbodyId).append($("<tr></tr>").attr("id",trId)));               

                //

                

                    var ObjectiveDivID = "divObjective_" + Objective[Index].ObjectiveID;
                    var DivIDForEditDeleteLink = "EditDeleteObjLinkDiv_" + Objective[Index].ObjectiveID;

                    $("#"+trObjId).append($("<td></td>").append($("<div></div>").attr("id",ObjectiveDivID).addClass("function-list-box")));
                    $("#"+ObjectiveDivID).append($("<div></div>").addClass("function-list-head").html(Objective[Index].ObjectiveTitle).css("background-color","#"+Objective[Index].ObjectiveBGColor))

                    if (Objective[Index].ObjectiveDescription.length > ObjectiveDescriptionLength) {
                    var str =Objective[Index].ObjectiveDescription.substr(0, ObjectiveDescriptionLength);                    
                        var ObjDescription = Objective[Index].ObjectiveDescription.substr(0, ObjectiveDescriptionLength) + "...";
                        $("#" + ObjectiveDivID).append($("<div></div>").addClass("function-list-text wrap").html(ObjDescription).append($("<a></a>").text("Read More").attr("href", "#").css("color", "blue").addClass("ObjDescription")));
                    }
                    else {
                        $("#" + ObjectiveDivID).append($("<div></div>").addClass("function-list-text wrap").html("<p>"+Objective[Index].ObjectiveDescription+"</p>"));
                    }

                    $("#"+ObjectiveDivID).append($("<div></div>").attr("id",DivIDForEditDeleteLink).addClass("function-list-button").append($("<a></a>").text("Edit").attr("id", "Edit" + ObjectiveDivID).attr("href", "#").attr("class", "EditObjectiveClass"))).append($("<br/>"));

                    var DeleteObjectiveID = "Delete" + ObjectiveDivID;

                    flag = 0;
                    for (var KRAIndex = 0; KRAIndex < KRA.length; KRAIndex++) {
                        if (KRA[KRAIndex].ObjectiveID == Objective[Index].ObjectiveID) {
                            flag = 1;
                        }
                    }

                    if (flag == 1) {
                        $("#" + DivIDForEditDeleteLink).append($("<a></a>").attr("disabled","disabled").text("Delete"));
                        flag = 0;
                    }
                    else if (flag == 0) {
                        $("#" + DivIDForEditDeleteLink).append($("<a></a>").text("Delete").attr("id", "Delete" + ObjectiveDivID).attr("href", "#").attr("class", "DeleteObjectiveClass"));
                    }

                    for (var KRAIndex = 0; KRAIndex < KRA.length; KRAIndex++) {
                    
                    
                    if(KRAIndex== 0)
                    {
//                    var trKRAId ="KRAtr"+BlockIndex;  
//                    $("#"+tbodyId).append($("<tr></tr>").attr("id",trKRAId));   
                    $("#"+trKRAId).append($("<td></td>").attr("id",tdKRAId));                                           
                    }
                    if (KRA[KRAIndex].ObjectiveID == Objective[Index].ObjectiveID) {                    

                            var DivIDForKRAEditDeleteLink = "EditDeleteKRALinkDiv_" + KRA[KRAIndex].KRAID;
                            var KRADivID = "divKRA_" + KRA[KRAIndex].KRAID;
                            var KRAColor = "#" + KRA[KRAIndex].KRABGColor;            

                            
                         
                         $("#"+tdKRAId).append($("<div></div>").attr("id",KRADivID).addClass("function-list-box"));
                         $("#"+KRADivID).append($("<div></div>").addClass("function-list-head").html(KRA[KRAIndex].KRATitle).css("background-color", KRAColor))

                         if (KRA[KRAIndex].KRADescription.length > KRADescriptionLegth) {
                                var KRADescription = KRA[KRAIndex].KRADescription.substr(0, KRADescriptionLegth) + "...";
                                $("#" + KRADivID).append($("<div></div>").addClass("function-list-text wrap").html(KRADescription).append($("<a></a>").text("Read More").attr("href", "#").css("color", "blue").addClass("KRADescription")));
                            }
                            else {
                                $("#" + KRADivID).append($("<div></div>").addClass("function-list-text wrap").html(KRA[KRAIndex].KRADescription));
                            }


                            $("#" + KRADivID).append($("<div></div>").attr("id", DivIDForKRAEditDeleteLink).addClass("function-list-button").append($("<a></a>").text("Edit").attr("id", "Edit" + KRADivID).attr("href", "#").attr("class", "EditKRAClass")));

                            var DeleteKRAID = "Delete" + KRADivID;
                            flag = 0;
                            for (var KPIIndex = 0; KPIIndex < KraKPI.length; KPIIndex++) {
                                if (KRA[KRAIndex].KRAID == KraKPI[KPIIndex].KRAID) {
                                    flag = 1;
                                }
                            }
                            if (flag == 1) {
                                $("#" + DivIDForKRAEditDeleteLink).append($("<a></a>").attr("disabled","disabled").text("Delete"));
                                flag = 0;
                            }
                            else if (flag == 0) {
                                $("#" + DivIDForKRAEditDeleteLink).append($("<a></a>").text("Delete").attr("id", "Delete" + KRADivID).attr("href", "#").attr("class", "DeleteKRAClass"));
                            }

                         }
                    }
                 }
              }    
               $("#Objtbl0").find('td').each(function(){
   $(this).css('padding','20px');
   });            
            },
            error: function (response) {
                alert(response.responseText);
            }
        });
    }

                    ///OLD CODE
                    //$("#BlockObjective").append($("<div></div>").addClass("function-list-new").append($("<div></div>").attr("id", ObjectiveDivID).addClass("function-list-box")));

                    //alert(ObjectiveDivID + "" + Objective[ObjIndex].ObjectiveTitle + "" + Objective[ObjIndex].ObjectiveBGColor);
//                    var ObjectiveColor = "#" + Objective[ObjIndex].ObjectiveBGColor;
//                    //alert(ObjectiveColor);
//                    var DivIDForEditDeleteLink = "EditDeleteObjLinkDiv_" + Objective[ObjIndex].ObjectiveID;


//                    $("#" + ObjectiveDivID).append($("<div></div>").addClass("function-list-head").html(Objective[ObjIndex].ObjectiveTitle).css("background-color", ObjectiveColor));
//                    if (Objective[ObjIndex].ObjectiveDescription.length > ObjectiveDescriptionLength) {
//                        var ObjDescription = Objective[ObjIndex].ObjectiveDescription.substr(0, ObjectiveDescriptionLength) + "...";
//                        $("#" + ObjectiveDivID).append($("<div></div>").addClass("function-list-text").html(ObjDescription).append($("<a></a>").text("Read More").attr("href", "#").css("color", "blue").addClass("ObjDescription")));
//                    }
//                    else {
//                        $("#" + ObjectiveDivID).append($("<div></div>").addClass("function-list-text").html(Objective[ObjIndex].ObjectiveDescription));
//                    }
//                    $("#" + ObjectiveDivID).append($("<div></div>").attr("id", DivIDForEditDeleteLink).addClass("function-list-button").append($("<a></a>").text("Edit").attr("id", "Edit" + ObjectiveDivID).attr("href", "#").attr("class", "EditObjectiveClass"))).append($("<br/>"));

//                    var DeleteObjectiveID = "Delete" + ObjectiveDivID;

//                    flag = 0;
//                    for (var KRAIndex = 0; KRAIndex < KRA.length; KRAIndex++) {
//                        if (KRA[KRAIndex].ObjectiveID == Objective[ObjIndex].ObjectiveID) {
//                            flag = 1;
//                        }
//                    }

//                    if (flag == 1) {
//                        $("#" + DivIDForEditDeleteLink).append($("<a></a>").attr("disabled","disabled").text("Delete"));
//                        flag = 0;
//                    }
//                    else if (flag == 0) {
//                        $("#" + DivIDForEditDeleteLink).append($("<a></a>").text("Delete").attr("id", "Delete" + ObjectiveDivID).attr("href", "#").attr("class", "DeleteObjectiveClass"));
//                    }


//                   var ObjKRADivID="DivObjKRA_"+Objective[ObjIndex].ObjectiveID;
//                   $("#BlockKRA").append($("<div></div>").attr("id",ObjKRADivID).addClass("function-list-new"));

//                    for (var KRAIndex = 0; KRAIndex < KRA.length; KRAIndex++) {

//                        if (KRA[KRAIndex].ObjectiveID == Objective[ObjIndex].ObjectiveID) {

//                            var DivIDForKRAEditDeleteLink = "EditDeleteKRALinkDiv_" + KRA[KRAIndex].KRAID;
//                            var KRADivID = "divKRA_" + KRA[KRAIndex].KRAID;
//                            var KRAColor = "#" + KRA[KRAIndex].KRABGColor;
//                            

//                          

//                          //$("#"+ObjectiveDivID).append($("<div></div>").attr("id", KRADivID).append($("<br/>")));
//                          $("#"+ObjKRADivID).append($("<div></div>").attr("id",KRADivID).addClass("function-list-box"));

//                            $("#" + KRADivID).append($("<div></div>").addClass("function-list-head").html(KRA[KRAIndex].KRATitle).css("background-color", KRAColor));
//                            if (KRA[KRAIndex].KRADescription.length > KRADescriptionLegth) {
//                                var KRADescription = KRA[KRAIndex].KRADescription.substr(0, KRADescriptionLegth) + "...";
//                                $("#" + KRADivID).append($("<div></div>").addClass("function-list-text").html(KRADescription).append($("<a></a>").text("Read More").attr("href", "#").css("color", "blue").addClass("KRADescription")));
//                            }
//                            else {
//                                $("#" + KRADivID).append($("<div></div>").addClass("function-list-text").html(KRA[KRAIndex].KRADescription));
//                            }

//                            $("#" + KRADivID).append($("<div></div>").attr("id", DivIDForKRAEditDeleteLink).addClass("function-list-button").append($("<a></a>").text("Edit").attr("id", "Edit" + KRADivID).attr("href", "#").attr("class", "EditKRAClass")));

//                            var DeleteKRAID = "Delete" + KRADivID;
//                            flag = 0;
//                            for (var KPIIndex = 0; KPIIndex < KraKPI.length; KPIIndex++) {
//                                if (KRA[KRAIndex].KRAID == KraKPI[KPIIndex].KRAID) {
//                                    flag = 1;
//                                }
//                            }
//                            if (flag == 1) {
//                                $("#" + DivIDForKRAEditDeleteLink).append($("<a></a>").attr("disabled","disabled").text("Delete"));
//                                flag = 0;
//                            }
//                            else if (flag == 0) {
//                                $("#" + DivIDForKRAEditDeleteLink).append($("<a></a>").text("Delete").attr("id", "Delete" + KRADivID).attr("href", "#").attr("class", "DeleteKRAClass"));
//                            }
//                        }
                    




    //method use when Delete link for an Objective is called.
    $(document).on('click', '.DeleteObjectiveClass', function (e) {
        e.preventDefault();

        var ObjectiveDivId = $(this).parent().parent().attr("id");        
        var ObjectiveID = ObjectiveDivId.split('_');
        //alert(ObjectiveID[1]);

        $("#DeleteObjectiveDialog").dialog({
            width: 250,
            height: 200,
            title: "Delete Objective",
            draggable: false,
            resizable: false,
            modal: true,
            buttons: [{ text: "Yes",
                click: function () {
                    // alert("I am Yes button.");
                    $.ajax({
                        url: "../KRA/ObjectivesAndKRAs.aspx/DeleteObjective",
                        type: "post",
                        data: '{"ObjectiveID":"' + ObjectiveID[1] + '"}',
                        contentType: "application/json;charset=utf-8",
                        success: function (jsonData) {
                            // alert(jsonData.d);
                            alert("Objective Deleted Successfully.");
                            PageLoadMethod();
                        },
                        error: function () { }
                    });

                    $(this).dialog("close");
                }
            },
                    {
                        text: "No",
                        click: function () {
                            // alert("I am No button.");
                            $(this).dialog("close");
                        }
                    }]

        });
        return false;

    });



    //method use when Edit link for an Objective is called.
    $(document).on('click', '.EditObjectiveClass', function (e) {
        e.preventDefault();        
        //var ObjectiveDivId = $(this).parent().parent().attr("id");
        var ObjectiveDivId = $(this).attr("id");
        var ObjectiveID = ObjectiveDivId.split('_');        
        SelectedObjectiveIDToEdit = ObjectiveID[1];
        var RequestedObjID = ObjectiveID[1];        
        $("#hdnfld").val(RequestedObjID);
        // alert(ObjectiveID[1]);
        //$("#btnObjectiveSave").val("Update");


        //        $("#txtObjectiveTitle").val("");
        //        $("#txtObjectiveDescription").val("");
        //        $("#txtObjBGcolor").removeClass("pick-a-color").val("");
        //        $("#txtKRABGcolor").removeClass("pick-a-color").val("");

        ClearObjectiveControls();


        //        $(".pick-a-color").pickAColor({
        //            showSpectrum: true,
        //            showSavedColors: true,
        //            saveColorsPerElement: false,
        //            fadeMenuToggle: true,
        //            showHexInput: true,
        //            showBasicColors: true,
        //            allowBlank: false
        //        }),

        //                        $(".pick-a-color").on("change", function () {
        //                            console.log($(this).val());

        //                        });

        $.ajax({
            url: "../KRA/ObjectivesAndKRAs.aspx/GetObjectiveDetail",
            type: "post",
            contentType: "application/json;charset=utf-8",
            data: '{"ObjectiveID":"' + RequestedObjID + '"}',
            success: function (jsonData) {
                var Obj = jQuery.parseJSON(jsonData.d);
                //alert(Obj[0].ObjectiveBGColor);
                //alert(Obj[0].KRABGColor);
                //alert(jsonData.d);
                $("#txtObjectiveTitle").val(Obj[0].ObjectiveTitle);
                $("#txtObjectiveDescription").val(Obj[0].ObjectiveDescription);
                $("#txtObjBGcolor").val(Obj[0].ObjectiveBGColor).blur();
                $("#txtKRABGcolor").val("#" + Obj[0].KRABGColor);

            },
            error: function (response) {
                alert(response.responseText);
            }
        });


        $("#EditObjectiveDialog").dialog({
            width: 800,
            height: 450,
            draggable: false,
            resizable: false,
            title: "Edit Objective",
            modal: true
        });
        return false;

    });


    //method use when delete link for kra is called.
    $(document).on('click', '.DeleteKRAClass', function (e) {
        //alert("I am Delete KRA");
        e.preventDefault();
        var KraDivId = $(this).parent().parent().attr("id");
        //alert(KraDivId);
        var ObjectiveDivId = $("#" + KraDivId).parent().attr("id");
        //alert(KraDivId);
        //alert(ObjectiveDivId);
        var KraID = KraDivId.split('_');
        var ObjectiveID = ObjectiveDivId.split('_');
        //alert(KraID[1] + "" + ObjectiveID[1]);



        $("#DeleteKRADialog").css("display", "block");
        $("#DeleteKRADialog").dialog({
            width: 250,
            height: 200,
            draggable: false,
            resizable: false,
            title: "Delete KRA",
            modal: true,
            buttons: [{ text: "Yes",
                click: function () {
                    //alert("I am Yes button.");
                    $.ajax({
                        url: "../KRA/ObjectivesAndKRAs.aspx/DeleteKRA",
                        type: "post",
                        contentType: "application/json;charset=utf-8",
                        data: '{"KraID":' + KraID[1] + '}',
                        success: function (Data) {
                            if (Data.d == true) {
                                alert("KRA Deleted Successfully");
                                PageLoadMethod();
                            }
                        },
                        error: function (response) {
                            alert(response.responseText);
                        }
                    });
                    $(this).dialog("close");
                }
            },
                    {
                        text: "No",
                        click: function () {
                            //alert("I am No button.");
                            $(this).dialog("close");
                        }
                    }
                    ]
        });
        return false;

    });

    //method use when Edit link for KRA is called.
    $(document).on('click', '.EditKRAClass', function (e) {
        e.preventDefault();
        //alert("hello I am Edit");
        var KraDivId = $(this).parent().parent().attr("id");
        var ObjectiveDivId = $("#" + KraDivId).parent().attr("id");
         //alert(KraDivId);
        //alert(ObjectiveDivId);
        var KraID = KraDivId.split('_');
        var ObjectiveID = ObjectiveDivId.split('_');
        SelectedKraIDToEdit = KraID[1];
        $("#hdnfldKRA").val(SelectedKraIDToEdit);
        //alert(KraID[1] + "" + ObjectiveID[1]);
        $("#divSelectedObjective").addClass("dropdown-text")
        $("#ddlObjective").attr("disabled", true);
        //$("#btnKRASave").val("Update");
      

        ClearKRAControls();
        $("#AddMoreKRA").hide();


        // GetObjectiveList(ddlObjective);

        //Ajax call to get KRA data in dialog.
        $.ajax({
            url: "../KRA/ObjectivesAndKRAs.aspx/GetKraListForEdit",
            type: "post",
            contentType: "application/json;charset=utf-8",
            data: '{"ObjectiveID":"' + ObjectiveID[1] + '","KraID":"' + KraID[1] + '"}',
            success: function (jsonData) {
                //alert(jsonData.d);
                var Obj = jQuery.parseJSON(jsonData.d);
                var ObjKRADetail = Obj.tblDtKRA;
                var ObjObjectiveDetail = Obj.tblDtObjective;
                var ObjObjectiveList = Obj.tblDtObjectiveList;
                //alert(ObjKRADetail);

                $("#ddlObjective").append($("<option></option>").val("0").html("Please select"));
                for (var i = 0; i < ObjObjectiveList.length; i++) {
                    $("#ddlObjective").append($("<option></option>").val(ObjObjectiveList[i].ObjectiveID).html(ObjObjectiveList[i].ObjectiveTitle));
                }
                // alert(ObjObjectiveDetail[0].ObjectiveTitle);
                $("#ddlObjective").val(ObjKRADetail[0].ObjectiveID);
                $("#txtKRATitle").val(ObjKRADetail[0].KRATitle);
                $("#txtKRADescription").val(ObjKRADetail[0].KRADescription);


                var SelectedObjective = $('#ddlObjective option:selected').text();

                var color = "#" + (ObjObjectiveDetail[0].ObjectiveBGColor).toString().substr(0, (jsonData.d.length - 2));
                //alert(color);
              
              $("#divSelectedObjective").show(); 
                $("#divSelectedObjective").text(ObjObjectiveDetail[0].ObjectiveTitle).css("background-color", color);                

                //ajax call to get Objective Backround color.
                //                $.ajax({
                //                    url: "../KRA/AddKRA.aspx/GetObjectiveBackgroundColor",
                //                    type: "post",
                //                    contentType: "application/json;charset=utf-8",
                //                    data: '{"ObjectiveID":"' + Obj[0].ObjectiveID + '"}',
                //                    dataType: "json",
                //                    success: function (jsonData) {
                //                        //                        alert("success");
                //                        //                        alert(jsonData.d.toString());
                //                        var color = jsonData.d.substr(1, (jsonData.d.length - 2));
                //                        //                        alert(color);
                //                        $("#lblSelectedObjective").text(SelectedObjective).css("background-color", color);
                //                    },
                //                    error: function (response) {
                //                        alert(response.responseText);
                //                    }
                //                });


                $("#EditKRADialog").css("display", "block");
                $("#EditKRADialog").dialog({
                  
                    width: 600,
                    height: 450,
                    title: "Edit KRA",
                    draggable: false,
                    resizable: false,
                    modal: true,
                });
                return false;

            },
            error: function (response) {
                alert(response.responseText);
            }
        });
    });

    //method when addKRa link is clicked.
    $("#btnAddKRALink").click(function (e) {
        e.preventDefault();
        //$("#btnKRASave").val("Save");
        $("#hdnfldKRA").val("");
        $("#ddlObjective").attr("disabled", false);
        ClearKRAControls();
         $("#AddMoreKRA").hide();
       
        GetObjectiveList();


        $("#EditKRADialog").css("display", "block");

        $("#EditKRADialog").dialog({          
            width: 600,
            height: 450,
            title: "Add KRA",
            draggable: false,
            resizable: false,
            modal: true
        });
        return false;
    });

    //Method when change event for a dropdown list is called.
    $("#ddlObjective").bind("change", function (e) {
        e.preventDefault();      
        $("#divSelectedObjective").empty();
        BindChangeEventForObjective();
        
        
//        if($("#ddlObjective option:selected").val()==0)
//        {
//        
//            $("#divSelectedObjective").removeClass("dropdown-text")
//            $("#divSelectedObjective").hide();
//        }
//        else
//        {        
//        $("#divSelectedObjective").addClass("dropdown-text")
//        }
        
        
		 
    });

    //method when save button is clicked.
    $("#btnKRASave").click(function (e) {
        e.preventDefault();
        
        // alert("I am save button");
        SelectedObjectiveID = $("#ddlObjective option:selected").val();
        var KRATitle = $("#txtKRATitle").val().trim();
        if(KRATitle != "")
        {
        var KRASplit=KRATitle.split("KRA - ");
        
        if(KRASplit.length==1)
        {
           KRATitle ="KRA - "+$("#txtKRATitle").val(); 
        }
        } 
        var KRADescription = $("#txtKRADescription").val().trim();
        
        //if condition when KRA is saved.
        if ($("#hdnfldKRA").val() == "") {                    
             InsertKRADetail(SelectedObjectiveID, KRATitle, KRADescription);
            PageLoadMethod();
        }
        //if condition when KRA is updated.
        else {               
           $.when( UpdateKRADetail(SelectedKraIDToEdit, SelectedObjectiveID, KRATitle, KRADescription)).then(PageLoadMethod())
            
          //PageLoadMethod();
        }
        
    });

    //method when Add Objective link is clicked.
    $("#btnAddObjectiveLink").click(function (e) {
        e.preventDefault();
        //alert("add");
        //$("#btnObjectiveSave").val("Save");
        $("#hdnfld").val("");

        ClearObjectiveControls();
        $("#AddMoreObj").hide();
        //$("#txtObjBGcolor").addClass("pick-a-color");
        //$("#txtKRABGcolor").addClass("pick-a-color"); //heli
        //$(".pick-a-color").pickAColor({

        $("#EditObjectiveDialog").css("diplay", "block");
        $("#EditObjectiveDialog").dialog({
            width: 800,
            height: 450,
            title: "Add Objective",
            draggable: false,
            resizable: false,
            modal: true
        });
        return false;
    });

    //Method when save button of Objective is clicked.
    $("#btnObjectiveSave").click(function (e) {
        e.preventDefault();
        //alert("I am Objective save");
        var ObjectiveTitle = $("#txtObjectiveTitle").val().trim();
        var ObjectiveDescription = $("#txtObjectiveDescription").val().trim();

        var ObjectiveId = $("#hdnfld").val();
        

        var i = 0;
        var ObjectiveBGColor;
        var KRABGColor;
        //        $(".pick-a-color").each(function () {
        //            if (i == 0) {
        //                ObjectiveBGColor = $(this).val();
        //            }
        //            if (i == 1) {
        //                KRABGColor = $(this).val();
        //            }
        //            i += 1;
        //        });
        var ObjectiveBGColor = $(".pick-a-color").first().val();
        var KRABGColor = $(".pick-a-color").last().val();
        //alert(ObjectiveTitle + "" + ObjectiveDescription + "" + ObjectiveBGColor + "" + KRABGColor);
        var IsInsert;
        var ObjectiveID;
        
        //if Objective is saved.
        if (ObjectiveId == "") {
            ObjectiveID = 0;
            InsertObjectiveDetail(ObjectiveID, ObjectiveTitle, ObjectiveDescription, ObjectiveBGColor, KRABGColor);
            PageLoadMethod();
        }
        //if Objective is updated.
        else {
            IsInsert = false;
            ObjectiveID = SelectedObjectiveIDToEdit;
            InsertObjectiveDetail(ObjectiveID, ObjectiveTitle, ObjectiveDescription, ObjectiveBGColor, KRABGColor);
            PageLoadMethod();
        }
    });

    //method when cancel button for Objective is clicked..
    $("#BtnObjectiveCancel").click(function (e) {
        e.preventDefault();
        ClearObjectiveControls();
        $("#EditObjectiveDialog").dialog("close");
    });

    //method when cancel button for KRA is clicked.
    $("#btnKRACancel").click(function (e) {
        e.preventDefault();
        ClearKRAControls();
     
        GetObjectiveList();
        $("#EditKRADialog").dialog("close");
    });

    //When Read more Link button on an Objective Is Clicked.
    $(document).on('click', '.ObjDescription', function (e) {
        e.preventDefault();
        var ObjectiveDivId = $(this).parent().parent().attr("id");
        var ObjectiveID = ObjectiveDivId.split('_');
        //alert(ObjectiveID[1]);

        $.ajax({
            url: "../KRA/ObjectivesAndKRAs.aspx/GetObjectiveDetail",
            type: "post",
            contentType: "application/json;charset=utf-8",
            data: '{"ObjectiveID":"' + ObjectiveID[1] + '"}',
            success: function (jsonData) {
                var Obj = jQuery.parseJSON(jsonData.d);
                //alert(jsonData.d);
                $("#lblDescription").text(Obj[0].ObjectiveDescription);
                $("#DescriptionDialog").css("display", "block");
                $("#DescriptionDialog").dialog({
                    width: 300,
                    height: 300,
                    title: Obj[0].ObjectiveTitle,
                    draggable: false,
                    resizable: false,
                    modal: true
                });
                return false;
            },
            error: function (response) {
                alert(response.responseText);
            }
        });
    });

    $(document).on('click', '.KRADescription', function (e) {
        e.preventDefault();
        var KraDivId = $(this).parent().parent().attr("id");        
        var ObjectiveDivId = $("#" + KraDivId).parent().attr("id");        
        var KraID = KraDivId.split('_');
        var ObjectiveID = ObjectiveDivId.split('_');
        SelectedKraIDToEdit = KraID[1];
        // alert(KraID[1] + "" + ObjectiveID[1]);

        $.ajax({
            url: "../KRA/ObjectivesAndKRAs.aspx/GetKraListForEdit",
            type: "post",
            contentType: "application/json;charset=utf-8",
            data: '{"ObjectiveID":"' + ObjectiveID[1] + '","KraID":"' + KraID[1] + '"}',
            success: function (jsonData) {
                var Obj = jQuery.parseJSON(jsonData.d);
                var ObjKRADetail = Obj.tblDtKRA;
                //alert(ObjKRADetail);
                // alert(jsonData.d);
                $("#lblDescription").text(ObjKRADetail[0].KRADescription);
                $("#DescriptionDialog").css("display", "block");
                $("#DescriptionDialog").dialog({
                    width: 300,
                    height: 300,
                    title: ObjKRADetail[0].KRATitle,
                    draggable: false,
                    resizable: false,
                    modal: true
                });
                return false;
            },
            error: function (response) {
                alert(response.responseText);
            }
        });
    });

    $("#btnAddMoreObjYes").click(function (e) {
        $("#AddMoreObj").css("display", "none");
        $("#lblObjectiveMessage").text("").removeClass('alert alert-success');
        $("#AddMoreObj").hide();

        ClearObjectiveControls();
    });

    $("#btnAddMoreObjNo").click(function (e) {
        $("#EditObjectiveDialog").dialog("close");
        $("#AddMoreObj").hide();
        PageLoadMethod();
    });

    $("#btnAddMoreKRAsYes").click(function (e) {
        e.preventDefault();
        $("#AddMoreKRA").hide();

        GetObjectiveList();
        $("#lblMessage").text("").removeClass('alert alert-success');

        ClearKRAControls();
    });

    $("#btnAddMoreKRAsNo").click(function (e) {
        e.preventDefault();
        $("#EditKRADialog").dialog("close");
        $("#AddMoreKRA").hide();
        PageLoadMethod();
    });

    $('#txtObjBGcolor').on('input', function (e) {
        
    });
});