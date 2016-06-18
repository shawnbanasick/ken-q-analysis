//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// navigation = "single page Nav"  https://github.com/ChrisWojcik/single-page-nav

/*jslint browser: true*/
/*global $, jQuery, XLSX, _, alert*/


// todo - refactoring pattern - taken from reddit saved "reading csv"
//setFinalData(dataPath) {
//    const FS = require('fs');
//    let tempArray1, tempArray2 = [];
//    let fileHandle = FS.readFileSync(dataPath, 'utf8');
//    tempArray1 = fileHandle.split(/\r?\n/); //remove newlines
//    for (let i = 0; i < tempArray1.length; i++) {
//        tempArray2 = tempArray1[i].split(/,/);
//        this.finalData[i] = []; //makes it MD
//        for (let j = 0; j < this.columns; j++) {
//            this.finalData[i][j] = tempArray2[j];
//        }
//    }
//}

$(document).ready(function () {

    $("#exportExcelSortsPQM").on("click", function (e) {
        e.preventDefault();
        exportExcelSortsPQM();
    });

});


//
// **************************************************************************  model
// ***** Import Hand-Coded File ****************************************************
// *********************************************************************************
function filePicked(e) {

    var files = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;

        var workbook = XLSX.read(data, {
            type: 'binary'
        });

        // iterate through every sheet and pull values
        var allWorksheets = [];
        var sheet_name_list = workbook.SheetNames;
        sheet_name_list.forEach(function (y) { /* iterate through sheets */

            var worksheet = workbook.Sheets[y];

            var tempArray;
            if (y === "sorts") {
                var tester = XLSX.utils.sheet_to_csv(worksheet);
                var tester2 = tester.split(/\n/);

                tempArray = [];
                for (var i = 1; i < 100; i++) {
                    var tester3 = tester2[i].split(',');
                    tempArray.push(tester3);
                }
            } else if (y === "statements") {
                tempArray = [];
                var tester4 = XLSX.utils.sheet_to_json(worksheet);
                tempArray.push(tester4);
            }
            allWorksheets.push(tempArray);

        });
        formatUploadForDisplay(allWorksheets);
    };
    reader.readAsBinaryString(files);
}

//
// **************************************************************************  model
// ***** Format Hand-Coded File for Display ****************************************
// *********************************************************************************

function formatUploadForDisplay(data) {

    // QAV #1
    var qavProjectName = data[0][0][1];
    localStorage.setItem("qavProjectName", JSON.stringify(qavProjectName));

    // QAV #2
    var qavSortTriangleShape = [];
    var multiplierArray = [];
    for (var i = 4; i < 24; i++) {
        var testValue = +data[0][i][1];
        if (testValue < 1 || isNaN(testValue)) {
            multiplierArray.push(0);
        } else {
            var multiplier = +data[0][i][1];
            multiplierArray.push(multiplier);
            var sortValue = +data[0][i][0];
            _.times(multiplier, function () {
                qavSortTriangleShape.push(sortValue);
            });
        }
    }
    localStorage.setItem("qavSortTriangleShape", JSON.stringify(qavSortTriangleShape));
    localStorage.setItem("multiplierArray", JSON.stringify(multiplierArray));

    // QAV #3
    var qavOriginalSortSize = qavSortTriangleShape.length; // number of statements
    localStorage.setItem("qavOriginalSortSize", JSON.stringify(qavOriginalSortSize));
    // todo - fix qavOriginalSortSize and qavTotalStatements are same - symmetry check functions
    localStorage.setItem("qavTotalStatements", JSON.stringify(qavOriginalSortSize));
    QAV.originalSortSize = qavOriginalSortSize;

    // QAV PREP
    var sortData = [];
    var sortLength = 29 + qavOriginalSortSize;
    var counter = (data[0][28].length) - 1;

    for (var k = 28; k < sortLength; k++) {
        var key = data[0][k][0];
        var value;
        var tempArray1 = [];
        var j = 1;
        var tempObj1;

        for (var kr = 0; kr < counter; kr++) {
            value = data[0][k][j];

            // catch the respondent names first
            if (k === 28 && value !== "") {
                tempObj1 = {};
                tempObj1.sortValue = key;
                tempObj1.statementNum = value;
                tempArray1.push(tempObj1);
            } else {
                if (value !== "") {
                    tempObj1 = {};
                    tempObj1.sortValue = +key;
                    tempObj1.statementNum = +value;
                    tempArray1.push(tempObj1);
                }
            }
            j = j + 1;
        }
        sortData.push(tempArray1);
    }

    // QAV #4
    var qavRespondentNames = [];
    var namesData = sortData.shift();
    for (var m = 0; m < namesData.length; m++) {
        var temp1 = namesData[m].statementNum;
        if (temp1 !== "") {
            qavRespondentNames.push(temp1);
        }
    }

    localStorage.setItem("qavRespondentNames", JSON.stringify(qavRespondentNames));
    QAV.respondentNames = qavRespondentNames;

    // QAV #5
    var qavTotalNumberSorts = qavRespondentNames.length;
    localStorage.setItem("qavTotalNumberSorts", JSON.stringify(qavTotalNumberSorts));
    QAV.totalNumberSorts = qavTotalNumberSorts;

    // QAV #6   respondent sorts
    var sortDataTransposed = _.zip.apply(_, sortData);

    var data2 = [];
    for (var p = 0; p < sortDataTransposed.length; p++) {
        var sortedArray1 = _.sortBy(sortDataTransposed[p], function (o) {
            return o.statementNum;
        });
        data2.push(sortedArray1);
    }

    var respondentDataSorts3 = [];
    for (var q = 0; q < data2.length; q++) {
        var temp11 = data2[q];
        var tempArray3 = [];
        for (var r = 0; r < temp11.length; r++) {
            var temp2 = temp11[r].sortValue;
            tempArray3.push(temp2);
        }
        respondentDataSorts3.push(tempArray3);
    }
    localStorage.setItem("qavRespondentSortsFromDbStored", JSON.stringify(respondentDataSorts3));
    var qavRespondentSortsFromDbStored = _.cloneDeep(respondentDataSorts3);

    // QAV #7
    var qavCurrentStatements = [];
    for (var s = 0; s < data[1][0].length; s++) {
        var temp12 = data[1][0][s].Statements;

        if (temp12 === "" || temp12 === undefined || temp12 === null) {} else {
            qavCurrentStatements.push(temp12);
        }
    }
    localStorage.setItem("qavCurrentStatements", JSON.stringify(qavCurrentStatements));


    // SYMMETRY TESTING
    var shouldDisplayResults = [];
    var checkHeader = false;
    for (var ss = 0; ss < qavRespondentSortsFromDbStored.length; ss++) {
        var qsortValueMatch = checkQsortValueMatch(qavRespondentSortsFromDbStored[ss], qavSortTriangleShape);

        if (qsortValueMatch.length === 0) {} else {
            if (checkHeader === false) {
                $("#excelUploadErrorDiv h3").append(" *** Error *** ");
            }
            shouldDisplayResults.push(s);
            $("#excelUploadErrorDiv ul").append("<li>The Q-sort from respondent <strong>" + qavRespondentNames[ss] + "</strong> is not symmetric. </li>");
            checkHeader = true;
        }
    }
    // Display respondents and sorts
    var respondentSorts = [];
    if (shouldDisplayResults.length === 0) {
        for (var qq = 0; qq < qavCurrentStatements.length; qq++) {
            var sortStatement = qavCurrentStatements[qq];
            $("#existingDatabaseStatementList").append("<li>" + sortStatement + "</li>");
        }
        for (var rr = 0; rr < qavRespondentSortsFromDbStored.length; rr++) {
            var sortItem = qavRespondentSortsFromDbStored[rr];
            var sortItem2 = sortItem.join();
            var sortItem3 = sortItem2.replace(/,/g, " ").replace(/ -/g, "-");
            if (sortItem3.charAt(0) !== "-") {
                sortItem3 = " " + sortItem3;
            }
            respondentSorts.push((sortItem3));
            var respondent = qavRespondentNames[rr];
            $("#existingDatabaseRespondentList").append("<li>" + respondent + "," + sortItem + "</li>");
        }
    }
    localStorage.setItem("qavRespondentSortsFromDbStored", JSON.stringify(respondentSorts));

    var $inputButton = $('<input type="button" class="blackHover" id="beginAnalysisLocalData" onclick=callCentroidFromLocalDemoData() value="Create Correlation Table">');
    if ($('#beginAnalysisLocalData').length === 0) {
        $inputButton.appendTo($('#localDataButtonDiv'));
    }
}


//
// **************************************************************************  model
// ***** Exporting Sorts to PQMethod ***********************************************
// *********************************************************************************

// todo - dry out by refactoring inputNewData functions
function exportExcelSortsPQM() {

    var output = [];
    $("#existingDatabaseRespondentList li").each(function () {
        var temp21 = ($(this).text());
        output.push(temp21);
    });

    // export file line #1 - calculate number of respondents
    var temp1, temp1a, temp2, temp3, temp3a, temp3b;
    temp1 = output.length;
    temp1a = String(threeDigitPadding(temp1));


    // grab Project Name
    temp2 = JSON.parse(localStorage.getItem("qavProjectName"));


    // calculating the number of statements
    temp3 = JSON.parse(localStorage.getItem("qavCurrentStatements"));
    temp3a = temp3.length;
    temp3b = String(threeDigitPadding(temp3a));


    // get max range numbers
    var temp5 = JSON.parse(localStorage.getItem("qavSortTriangleShape"));
    var temp5b = _.min(temp5);
    var temp5c = _.max(temp5);
    var temp5d = String(threeDigitPadding(+temp5b));
    var temp5e = String(threeDigitPadding(+temp5c));


    // get triange shape
    var temp6 = JSON.parse(localStorage.getItem("multiplierArray"));

    var temp6a = "";
    var temp6b = "";
    for (var i = 0; i < 20; i++) {
        temp6a = String(threeDigitPadding(temp6[i]));
        temp6b += temp6a;
    }

    // set PQMethod DAT file line 2
    var line2 = temp5d + temp5e + temp6b;

    $("#excelSortExportBox").append("  0" + temp1a + temp3b + " " + temp2);
    $("#excelSortExportBox").append("\n");
    $("#excelSortExportBox").append(line2);
    $("#excelSortExportBox").append("\n");

    for (var j = 0; j < output.length; j++) {
        var temp8 = output[j].split(",");

        var respondentName = temp8[0];
        var temp8a = sanitizeRespondentName(respondentName);

        var temp8c = temp8.slice(1, temp8.length);

        var temp8d = temp8c.toString();

        var temp8e = temp8d.replace(/,/g, " ");
        var temp8f = temp8e.replace(/ -/g, "-");
        var temp8g = temp8f.replace(/[\[\]']+/g, '');

        if (temp8[1] < 0) {
            temp8g = "  " + temp8g;
        } else {
            temp8g = "   " + temp8g;
        }
        var temp9 = temp8a + temp8g;
        $("#excelSortExportBox").append(temp9);
        $("#excelSortExportBox").append("\n");
    }

    // todo - add check to match statements.length with pyramid sort entry sum


    // pull all data from hidden export prep box
    var exportData = $('#excelSortExportBox').val();

    var timeStamp = currentDate1() + "-" + currentTime1();

    var blob = new Blob([exportData], {
        type: "text/plain;charset=us-ascii"
    });
    saveAs(blob, "Ken-Q_PQMethod_Export_" + timeStamp + ".DAT");


    // clear the hidden export box
    $("#excelSortExportBox").html("");
}


//
// **************************************************************************  model
// ***** Import KEN-Q OUTPUT File ****************************************************
// *********************************************************************************
function filePickedKenq(e) {

    var files = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;

        var workbook = XLSX.read(data, {
            type: 'binary'
        });

        // iterate through every sheet and pull values
        var allWorksheets = [];
        var sheet_name_list = workbook.SheetNames;
        sheet_name_list.forEach(function (y) { /* iterate through sheets */

            var worksheet = workbook.Sheets[y];

            var tempArray;

            if (y === "Project Info") {
                tempArray = [];
                var tester6 = XLSX.utils.sheet_to_json(worksheet);
                tempArray.push(tester6);

            } else if (y === "Sorts") {
                var tester = XLSX.utils.sheet_to_csv(worksheet);
                var tester2 = tester.split(/\n/);
                tempArray = [];
                tester2.forEach(function (entry) {
                    var tester3 = entry.split(',');
                    tempArray.push(tester3);
                });
            } else if (y === "Statements") {
                tempArray = [];
                var tester4 = XLSX.utils.sheet_to_json(worksheet);
                tempArray.push(tester4);
            }

            allWorksheets.push(tempArray);

        });
        formatKenqUploadForDisplay(allWorksheets);
    };
    reader.readAsBinaryString(files);
}


//
// **************************************************************************  model
// ***** Format Hand-Coded File for Display ****************************************
// *********************************************************************************

function formatKenqUploadForDisplay(data) {

    var spliceLength1 = data.length - 3;

    var projectInfo = data.splice(spliceLength1, 3);


    // QAV #1
    var qavProjectName = projectInfo[2][0][0]["1"];
    localStorage.setItem("qavProjectName", JSON.stringify(qavProjectName));

    // QAV #2
    // todo - remember this JSON.parse trick to convert text to array
    var qavSortTriangleShape1 = projectInfo[2][0][2]["1"];
    var qavSortTriangleShape = JSON.parse("[" + qavSortTriangleShape1 + "]");
    localStorage.setItem("qavSortTriangleShape", JSON.stringify(qavSortTriangleShape));

    // QAV #3
    var qavOriginalSortSize = qavSortTriangleShape.length; // number of statements
    localStorage.setItem("qavOriginalSortSize", JSON.stringify(qavOriginalSortSize));
    // todo - fix qavOriginalSortSize and qavTotalStatements are same - symmetry check functions
    localStorage.setItem("qavTotalStatements", JSON.stringify(qavOriginalSortSize));
    QAV.originalSortSize = qavOriginalSortSize;

    // QAV #4
    var qavRespondentNames = [];
    for (var j = 1; j < data[1].length; j++) {
        var temp1 = data[1][j][0];
        if (temp1 === "") {} else {
            qavRespondentNames.push(temp1);
        }
    }
    localStorage.setItem("qavRespondentNames", JSON.stringify(qavRespondentNames));
    QAV.respondentNames = qavRespondentNames;
    // QAV #5
    var qavTotalNumberSorts = qavRespondentNames.length;
    localStorage.setItem("qavTotalNumberSorts", JSON.stringify(qavTotalNumberSorts));
    QAV.totalNumberSorts = qavTotalNumberSorts;

    // QAV #6
    var qavRespondentSortsFromDbStored = [];
    for (var k = 1; k < data[1].length; k++) {
        var tempArray1 = [];

        var isEmpty = data[1][k][1];
        if (isEmpty === "" || isEmpty === null || isEmpty === undefined) {} else {

            var temp2 = data[1][k][1];

            var start = sanitizeSortValues(temp2);

            tempArray1.push(+start);
            var mLength = qavOriginalSortSize;
            for (var m = 2; m < mLength; m++) {
                var temp3 = data[1][k][m];
                tempArray1.push(+temp3);
            }

            var finish2 = data[1][k][mLength];
            var finish = sanitizeSortValues(finish2);
            tempArray1.push(+finish);
            qavRespondentSortsFromDbStored.push(tempArray1);
        }
    }

    // QAV #7
    var qavCurrentStatements = [];
    for (var p = 0; p < data[0][0].length; p++) {
        var temp11 = data[0][0][p].Statement;

        if (temp11 === "" || temp11 === undefined || temp11 === null) {} else {
            qavCurrentStatements.push(temp11);
        }
    }

    localStorage.setItem("qavCurrentStatements", JSON.stringify(qavCurrentStatements));


    // SYMMETRY TESTING
    var shouldDisplayResults = [];
    var checkHeader = false;
    for (var s = 0; s < qavRespondentSortsFromDbStored.length; s++) {
        var qsortValueMatch = checkQsortValueMatch(qavRespondentSortsFromDbStored[s], qavSortTriangleShape);
        if (qsortValueMatch.length === 0) {} else {
            if (checkHeader === false) {
                $("#excelUploadErrorDiv h3").append(" *** Error *** ");
            }
            shouldDisplayResults.push(s);
            $("#excelUploadErrorDiv ul").append("<li>The Q-sort from respondent <strong>" + qavRespondentNames[s] + "</strong> is not symmetric. </li>");
            checkHeader = true;
        }
    }
    // Display respondents and sorts
    var respondentSorts = [];
    if (shouldDisplayResults.length === 0) {
        for (var q = 0; q < qavCurrentStatements.length; q++) {
            var sortStatement = qavCurrentStatements[q];
            $("#existingDatabaseStatementList").append("<li>" + sortStatement + "</li>");
        }
        for (var r = 0; r < qavRespondentSortsFromDbStored.length; r++) {
            var sortItem = qavRespondentSortsFromDbStored[r];
            var sortItem2 = sortItem.join();
            var sortItem3 = sortItem2.replace(/,/g, " ").replace(/ -/g, "-");
            if (sortItem3.charAt(0) !== "-") {
                sortItem3 = " " + sortItem3;
            }
            respondentSorts.push((sortItem3));
            var respondent = qavRespondentNames[r];
            $("#existingDatabaseRespondentList").append("<li>" + respondent + "," + sortItem + "</li>");
        }
    }
    localStorage.setItem("qavRespondentSortsFromDbStored", JSON.stringify(respondentSorts));

    var $inputButton = $('<input type="button" class="blackHover" id="beginAnalysisLocalData" onclick=callCentroidFromLocalDemoData() value="Create Correlation Table">');
    if ($('#beginAnalysisLocalData').length === 0) {
        $inputButton.appendTo($('#localDataButtonDiv'));
    }
}


// HELPER FUNCTIONS
function sortFunction(a, b) {
    return (a - b); //causes an array to be sorted numerically and ascending
}

// strips everything but letters and numbers and "." "-" 
function sanitizeSortValues(value) {
    return value.replace(/[^a-zA-Z0-9.-]/g, function () {
        return '';
    });
}

function checkQsortValueMatch(inputArray, triangleShapeArray) {
    var inputArray2 = _.cloneDeep(inputArray);
    var inputArraySorted = inputArray2.sort(sortFunction);
    var arrayDifferences = _.xor(inputArraySorted, triangleShapeArray);
    return arrayDifferences;
}


// todo - sanitize input from PQMethod files

//
// **************************************************************************  model
// ***** Import Hand-Coded File ****************************************************
// *********************************************************************************
function filePickedTextPQM(e) {

    var files = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;
        $("#sortInputBox").val(data);
        localStorage.setItem("sortInputBox", data);

    }; // end of reader function
    reader.readAsText(files, "ASCII");
}


//
// **************************************************************************  model
// ***** Import User Statements File ***********************************************
// *********************************************************************************
function filePickedTextSTA(e) {

    var files = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var data = e.target.result;
        $("#statementsInputBoxPqmethod").val(data);
        localStorage.setItem("qavStatementsInputBoxPqmethod", data);

    }; // end of reader function
    reader.readAsText(files, "ASCII");
}


//// *********************************************************************************
//// *********************************************************************************
//// *********************************************************************************
/*  DO NOT DELETE - CODE FOR JSON IMPORT FUNCTIONALITY */
//// *********************************************************************************
//// *********************************************************************************
//// *********************************************************************************
//// *********************************************************************************
//// *********************************************************************************


//
////
//// **************************************************************************  model
//// ***** Import Hand-Coded File ****************************************************
//// *********************************************************************************
//function filePicked(e) {
//
//    var files = e.target.files[0];
//    var reader = new FileReader();
//    reader.onload = function (e) {
//        var data = e.target.result;
//
//        var workbook = XLSX.read(data, {
//            type: 'binary'
//        });
//
//        // iterate through every sheet and pull values
//        var allWorksheets = [];
//        var sheet_name_list = workbook.SheetNames;
//        sheet_name_list.forEach(function (y) { /* iterate through sheets */
//            // console.log(JSON.stringify(y));
//
//            var worksheet = workbook.Sheets[y];
//
//            var tempArray;
//            if (y === "sorts") {
//                var tester = XLSX.utils.sheet_to_csv(worksheet);
//                // console.log(JSON.stringify(tester));
//                var tester2 = tester.split(/\n/);
//                tempArray = [];
//                tester2.forEach(function (entry) {
//                    var tester3 = entry.split(',');
//                    tempArray.push(tester3);
//                });
//            } else if (y === "statements") {
//                tempArray = [];
//                var tester4 = XLSX.utils.sheet_to_json(worksheet);
//                tempArray.push(tester4);
//                // console.log(JSON.stringify(tester4));
//            }
//
//            allWorksheets.push(tempArray);
//            // console.log(JSON.stringify(allWorksheets));
//
//            // var tester3 = tester2.split(',');
//            //console.log(JSON.stringify(tester2));
//
//            //            for (z in worksheet) {
//            //                /* all keys that do not begin with "!" correspond to cell addresses */
//            //                if (z[0] === '!') continue;
//            //                console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
//            //                var value = JSON.stringify(worksheet[z].v);
//            //                console.log((value));
//            //
//            //            }
//        });
//        formatUploadForDisplay(allWorksheets);
//    }; // end of reader function
//    reader.readAsBinaryString(files);
//}
//
////
//// **************************************************************************  model
//// ***** Format Hand-Coded File for Display ****************************************
//// *********************************************************************************
//
//function formatUploadForDisplay(data) {
//
//    // QAV #1
//    var qavProjectName = data[0][1][1];
//    localStorage.setItem("qavProjectName", JSON.stringify(qavProjectName));
//
//    // QAV #2
//    var qavSortTriangleShape = [];
//    var multiplierArray = [];
//    for (var i = 5; i < 25; i++) {
//        var testValue = +data[0][i][1];
//        if (testValue < 1 || isNaN(testValue)) {
//            multiplierArray.push(0);
//        } else {
//            var multiplier = +data[0][i][1];
//            multiplierArray.push(multiplier);
//            var sortValue = +data[0][i][0];
//            _.times(multiplier, function () {
//                qavSortTriangleShape.push(sortValue);
//            });
//        }
//    }
//    localStorage.setItem("qavSortTriangleShape", JSON.stringify(qavSortTriangleShape));
//    localStorage.setItem("multiplierArray", JSON.stringify(multiplierArray));
//
//
//    // QAV #3
//    var qavOriginalSortSize = qavSortTriangleShape.length; // number of statements
//    localStorage.setItem("qavOriginalSortSize", JSON.stringify(qavOriginalSortSize));
//    // todo - fix qavOriginalSortSize and qavTotalStatements are same - symmetry check functions
//    localStorage.setItem("qavTotalStatements", JSON.stringify(qavOriginalSortSize));
//
//    // QAV #4
//    var qavRespondentNames = [];
//    for (var j = 29; j < data[0].length; j++) {
//        var temp1 = data[0][j][0];
//        if (temp1 === "") {} else {
//            qavRespondentNames.push(temp1);
//        }
//    }
//    localStorage.setItem("qavRespondentNames", JSON.stringify(qavRespondentNames));
//
//    // QAV #5
//    var qavTotalNumberSorts = qavRespondentNames.length;
//    localStorage.setItem("qavTotalNumberSorts", JSON.stringify(qavTotalNumberSorts));
//
//    // QAV #6
//    var qavRespondentSortsFromDbStored = [];
//    for (var k = 29; k < data[0].length; k++) {
//        var tempArray1 = [];
//
//        var isEmpty = data[0][k][1];
//        if (isEmpty === "" || isEmpty === null || isEmpty === undefined) {} else {
//
//
//            var temp2 = data[0][k][1];
//
//            var start = sanitizeSortValues(temp2);
//
//            tempArray1.push(+start);
//            var mLength = qavOriginalSortSize;
//            for (var m = 2; m < mLength; m++) {
//                var temp3 = data[0][k][m];
//                tempArray1.push(+temp3);
//            }
//
//            var finish2 = data[0][k][mLength];
//            var finish = sanitizeSortValues(finish2);
//            tempArray1.push(+finish);
//            qavRespondentSortsFromDbStored.push(tempArray1);
//            // qavRespondentSortsFromDbStored.push(temp3);
//        }
//    }
//
//
//    // QAV #7
//    var qavCurrentStatements = [];
//    for (var p = 0; p < data[1][0].length; p++) {
//        var temp11 = data[1][0][p].Statements;
//
//        if (temp11 === "" || temp11 === undefined || temp11 === null) {} else {
//            qavCurrentStatements.push(temp11);
//        }
//    }
//    localStorage.setItem("qavCurrentStatements", JSON.stringify(qavCurrentStatements));
//
//
//    // SYMMETRY TESTING
//    var shouldDisplayResults = [];
//    var checkHeader = false;
//    for (var s = 0; s < qavRespondentSortsFromDbStored.length; s++) {
//        var qsortValueMatch = checkQsortValueMatch(qavRespondentSortsFromDbStored[s], qavSortTriangleShape);
//        // console.log(JSON.stringify(qsortValueMatch));
//        if (qsortValueMatch.length === 0) {} else {
//            if (checkHeader === false) {
//                $("#excelUploadErrorDiv h3").append(" *** Error *** ");
//            }
//            shouldDisplayResults.push(s);
//            $("#excelUploadErrorDiv ul").append("<li>The Q-sort from respondent <strong>" + qavRespondentNames[s] + "</strong> is not symmetric. </li>");
//            checkHeader = true;
//        }
//    }
//    // Display respondents and sorts
//    var respondentSorts = [];
//    if (shouldDisplayResults.length === 0) {
//        for (var q = 0; q < qavCurrentStatements.length; q++) {
//            var sortStatement = qavCurrentStatements[q];
//            $("#existingDatabaseStatementList").append("<li>" + sortStatement + "</li>");
//        }
//        for (var r = 0; r < qavRespondentSortsFromDbStored.length; r++) {
//            var sortItem = qavRespondentSortsFromDbStored[r];
//            // console.log((sortItem));
//            var sortItem2 = sortItem.join();
//            var sortItem3 = sortItem2.replace(/,/g, " ").replace(/ -/g, "-");
//            if (sortItem3.charAt(0) !== "-") {
//                sortItem3 = " " + sortItem3;
//            }
//            respondentSorts.push((sortItem3));
//            var respondent = qavRespondentNames[r];
//            $("#existingDatabaseRespondentList").append("<li>" + respondent + "," + sortItem + "</li>");
//        }
//    }
//    localStorage.setItem("qavRespondentSortsFromDbStored", JSON.stringify(respondentSorts));
//
//    var $inputButton = $('<input type="button" class="blackHover" id="beginAnalysisLocalData" onclick=callCentroidFromLocalDemoData() value="Create Correlation Table">');
//    if ($('#beginAnalysisLocalData').length === 0) {
//        $inputButton.appendTo($('#localDataButtonDiv'));
//    }
//}
//
//