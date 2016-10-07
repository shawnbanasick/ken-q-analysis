//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// navigation = "single page Nav"  https://github.com/ChrisWojcik/single-page-nav

/*jslint browser: true*/
/*global $, jQuery, XLSX, _, QAV, alert*/


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



});






// todo - sanitize input from PQMethod files

//


//


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
//    var $inputButton = $('<input type="button" class="blackHover" id="beginAnalysisLocalData" onclick=CENTROID.callCentroidFromLocalDemoData value="Create Correlation Table">');
//    if ($('#beginAnalysisLocalData').length === 0) {
//        $inputButton.appendTo($('#localDataButtonDiv'));
//    }
//}
//
//