function IsValidDate( datePickerID) {
    console.log("Date Validation start :UcDateValidation () called  ");
    var varID = true;

   // var senderid = sender.id;
   // var controlid = senderid.substring(0, senderid.lastIndexOf("_", senderid.length));

    //var DateID = document.getElementById(controlid + "_" + datePickerID);

    var DateID = document.getElementById(datePickerID);

    if (DateID.value != '') {

        console.log(" Date Exist  ");

        varID = ValidateDate(DateID.value);

        console.log("varID: " + varID);
    }
    else {
        console.log(" Date not  Exist  ");
    }

    if (varID) {
        console.log("varID: " + varID);
       // args.IsValid = true;
        return true;
    }
    else {
        //            sender.errormessage ='Please enter or select valid date';
        console.log("varID: " + varID);
       // args.IsValid = false;
        return false;
    }
}

function ValidateDate(strdate) {
    console.log("ValidateDate () Called  ");
    console.log(" Start Date :" + strdate);


//    var _dayIndex = document.getElementById('<%= hdnDayIndex.ClientID %>').value;
//    var _monthIndex = document.getElementById('<%= hdnMonthIndex.ClientID %>').value;
//    var _yearIndex = document.getElementById('<%= hdnYearIndex.ClientID %>').value;
//    var _seperator = document.getElementById('<%= hdnSeperator.ClientID %>').value;


    var _dayIndex = 1;
    var _monthIndex = 0;
    var _yearIndex = 2;
    var _seperator = '/';



    // console.log("ValidateDate");
    console.log("d" + _dayIndex);
    console.log("m" + _monthIndex);
    console.log("Y" + _yearIndex);
    console.log("s" + _seperator);

    var str1 = strdate;
    console.log("check_date is going to call () Called  ");
    if (check_date(str1) == true) {
        //alert(str1);
        // console.log("End:check_date");
        var dt1 = parseInt(str1.split(_seperator)[_dayIndex], 10);


        var mon1 = parseInt(str1.split(_seperator)[_monthIndex], 10);
        var yr1 = parseInt(str1.split(_seperator)[_yearIndex], 10);
        var yr1 = (yr1 < 1000) ? yr1 + 1000 : yr1;

        var sourceDate = new Date();     //(""+ mon1 + _seperator + dt1 + _seperator + yr1);
        console.log("sourceDate:" + sourceDate);

        if (_dayIndex == 0 && _monthIndex == 1 && _yearIndex == 2) {

            sourceDate = new Date(" " + dt1 + "" + _seperator + "" + mon1 + "" + _seperator + "" + yr1);
            // var leftDate = new Date('01/01/1753');
            // var rightDate = new Date('31/12/9999');
            var leftDate = new Date('01' + _seperator + '01' + _seperator + '1753');
            var rightDate = new Date('31' + _seperator + '12' + _seperator + '9999');

        }

        else if (_dayIndex == 1 && _monthIndex == 0 && _yearIndex == 2) {

            sourceDate = new Date(" " + mon1 + "" + _seperator + "" + dt1 + "" + _seperator + "" + yr1);

            var leftDate = new Date('01' + _seperator + '01' + _seperator + '1753');
            var rightDate = new Date('12' + _seperator + '31' + _seperator + '9999');
        }
        else if (_dayIndex == 1 && _monthIndex == 0) {

            sourceDate = new Date(" " + mon1 + "" + _seperator + "" + dt1 + "" + _seperator + "" + yr1);

            var leftDate = new Date('01' + _seperator + '01' + _seperator + '1753');
            var rightDate = new Date('12' + _seperator + '31' + _seperator + '9999');

        }
        else if (_dayIndex == 0 && _monthIndex == 1) {

            sourceDate = new Date(" " + dt1 + "" + _seperator + "" + mon1 + "" + _seperator + "" + yr1);
            var leftDate = new Date('01' + _seperator + '01' + _seperator + '1753');
            var rightDate = new Date('31' + _seperator + '12' + _seperator + '9999');
        }
        console.log("leftDate:" + leftDate);
        console.log("rightDate:" + rightDate);

        //            alert("Source:" + sourceDate + " Left:" + leftDate + " Right:" + rightDate);
        console.log(" Compare Date  ");

        if ((leftDate <= sourceDate) && (sourceDate <= rightDate)) {
            console.log("ValidateDate:true ");

            return true;
        }
        else {

            //alert('Please enter valid date.');
            console.log("ValidateDate:false ");
            return false;

        }

    }

}



function check_date(field) {

    console.log(" check_date () Called :");

//    var _dayIndex = document.getElementById('<%= hdnDayIndex.ClientID %>').value;
//    var _monthIndex = document.getElementById('<%= hdnMonthIndex.ClientID %>').value;
//    var _yearIndex = document.getElementById('<%= hdnYearIndex.ClientID %>').value;
//    var _seperator = document.getElementById('<%= hdnSeperator.ClientID %>').value;

    var _dayIndex = 1;
    var _monthIndex = 0;
    var _yearIndex = 2;
    var _seperator = '/';


    var checkstr = "0123456789";
    var DateField = field;
    var Datevalue = "";
    var DateTemp = "";
    var seperator = ".";
    var day;
    var month;
    var year;
    var leap = 0;
    var err = 0;
    var i;
    err = 0;
    DateValue = DateField;
    //   /* Delete all chars except 0..9 */
    //   for (i = 0; i < DateValue.length; i++) {
    //              if (checkstr.indexOf(DateValue.substr(i,1)) >= 0) {
    //                 DateTemp = DateTemp + DateValue.substr(i,1);
    //              }
    //   }
    //   
    //   DateValue = DateTemp;
    //   /* Always change date to 8 digits - string*/
    //   /* if year is entered as 2-digit / always assume 20xx */
    //   if (DateValue.length == 6) {
    //      DateValue = DateValue.substr(0,4) + '20' + DateValue.substr(4,2); }
    //   if (DateValue.length != 8) {
    //      err = 19;}
    /* year is wrong if year = 0000 */

    console.log("day Index" + _dayIndex);
    console.log(" Month Index" + _monthIndex);
    console.log(" Year Index" + _yearIndex);
    console.log("Seperator" + _seperator);

    day = parseInt(DateField.split(_seperator)[_dayIndex], 10);
    month = parseInt(DateField.split(_seperator)[_monthIndex], 10);
    year = parseInt(DateField.split(_seperator)[_yearIndex], 10);
    console.log("Day:" + day);
    console.log("year:" + year);
    console.log("month:" + month);

    //year = DateValue.substr(4,4);
    if (year == 0) {
        err = 20;
    }
    /* Validation of month*/
    //month = DateValue.substr(0,2);
    if ((month < 1) || (month > 12)) {
        err = 21;
    }
    /* Validation of day*/
    //day = DateValue.substr(2,2);
    if (day < 1) {
        err = 22;
    }
    /* Validation leap-year / february / day */
    if ((year % 4 == 0) || (year % 100 == 0) || (year % 400 == 0)) {
        leap = 1;
    }
    if ((month == 2) && (leap == 1) && (day > 29)) {
        err = 23;
    }
    if ((month == 2) && (leap != 1) && (day > 28)) {
        err = 24;
    }
    /* Validation of other months */
    if ((day > 31) && ((month == "01") || (month == "03") || (month == "05") || (month == "07") || (month == "08") || (month == "10") || (month == "12"))) {
        err = 25;
    }
    if ((day > 30) && ((month == "04") || (month == "06") || (month == "09") || (month == "11"))) {
        err = 26;
    }
    /* if 00 ist entered, no error, deleting the entry */
    if ((day == 0) && (month == 0) && (year == 00)) {
        err = 0; day = ""; month = ""; year = ""; seperator = "";
    }
    /* if no error, write the completed date to Input-Field (e.g. 13.12.2001) */
    if (err == 0) {
        return true;
        console.log("check_date:" + "true");
    }
    /* Error-message if err != 0 */
    else {
        return false;
        console.log("check_date:" + "false");
    }
}
