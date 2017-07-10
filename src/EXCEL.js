//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global window, resources, saveAs, Blob, QAV, $, INPUT, d3, localStorage, VIEW, FileReader, XLSX, UTIL, _ */

(function (EXCEL, QAV, undefined) {
    'use strict';
    //
    // **************************************************************************  model
    // ***** Exporting Sorts to PQMethod ***********************************************
    // *********************************************************************************

    // todo - dry out by refactoring inputNewData functions
    EXCEL.exportExcelSortsPQM = function () {

        var output = [];
        $("#existingDatabaseRespondentList li").each(function () {
            var temp21 = ($(this).text());
            output.push(temp21);
        });

        // export file line #1 - calculate number of respondents
        var temp1, temp1a, temp2, temp3, temp3a, temp3b;
        temp1 = output.length;
        temp1a = String(UTIL.threeDigitPadding(temp1));


        // grab Project Name
        temp2 = QAV.getState("qavProjectName");

        // get max range numbers
        var temp5 = QAV.getState("qavSortTriangleShape");
        var temp5b = _.min(temp5);
        var temp5c = _.max(temp5);
        var temp5d = String(UTIL.threeDigitPadding(+temp5b));
        var temp5e = String(UTIL.threeDigitPadding(+temp5c));


        // get triange shape
        var temp6 = QAV.getState("multiplierArray");
        var temp6a = "";
        var temp6b = "";
        for (var i = 0; i < 20; i++) {
            temp6a = String(UTIL.threeDigitPadding(temp6[i]));
            temp6b += temp6a;
        }

        // calculating the number of statements
        temp3 = QAV.getState("qavCurrentStatements");
        if (temp3.length === 0) {
            temp3a = temp5.length;
        } else {
            temp3a = temp3.length;
        }
        temp3b = String(UTIL.threeDigitPadding(temp3a));

        // set PQMethod DAT file line 2
        var line2 = temp5d + temp5e + temp6b;
        $("#excelSortExportBox").append("  0" + temp1a + temp3b + " " + temp2);
        $("#excelSortExportBox").append("\n");
        $("#excelSortExportBox").append(line2);
        $("#excelSortExportBox").append("\n");

        for (var j = 0; j < output.length; j++) {
            var temp8 = output[j].split(",");

            var respondentName = temp8[0];
            var temp8a = INPUT.sanitizeRespondentName(respondentName);

            var temp8c = temp8.slice(1, temp8.length);

            var temp8d = temp8c.toString();

            var testForButtonText = temp8d.slice(-4);
            if (testForButtonText === "sort") {
                temp8d = temp8d.replace(/delete sort/g, "");
            }

            var temp8e = temp8d.replace(/,/g, " ");
            var temp8f = temp8e.replace(/ -/g, "-");
            var temp8g = temp8f.replace(/[\[\]']+/g, '');

            if (+temp8[1] < 0) {
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

        var timeStamp = UTIL.currentDate1() + "-" + UTIL.currentTime1();

        var blob = new Blob([exportData], {
            type: "text/plain;charset=us-ascii"
        });
        saveAs(blob, "Ken-Q_PQMethod_Export_" + timeStamp + ".DAT");

        // clear the hidden export box
        $("#excelSortExportBox").html("");
    };

    EXCEL.exportStatementsToPqmethod = function () {
        var temp = QAV.getState("qavCurrentStatements");
        var $exportBox = $("#excelSortExportBox");
        for (var i = 0; i < temp.length; i++) {
            $exportBox.append(temp[i], "\n");
        }
        var exportData = $exportBox.val();

        var timeStamp = UTIL.currentDate1() + "-" + UTIL.currentTime1();

        var blob = new Blob([exportData], {
            type: "text/plain;charset=us-ascii"
        });
        saveAs(blob, "Ken-Q_PQMethod_Statements_" + timeStamp + ".STA");

        // clear the hidden export box
        $("#excelSortExportBox").html("");
    };



    //
    // **************************************************************************
    // ***** Import Type 1 or Type 2 Files **************************************
    // **************************************************************************
    EXCEL.filePicked = function (e) {
        var filetype = QAV.getState("typeOfExcelFile");
        var files = e.target.files[0];
        var reader = new FileReader();
        var tester, tester2, tester3, tester4;
        var tempArray = [];
        var allWorksheets = [];
        var data, workbook, worksheet, sheet_name_list;
        var hasSortsWorksheet = false;
        var hasStatementsWorksheet = false;
        var $errorPanel = $("#genericErrorModal .errorPanel");
        reader.onload = function (e) {
            data = e.target.result;

            workbook = XLSX.read(data, {
                type: 'binary'
            });

            // iterate through every sheet and pull values
            sheet_name_list = workbook.SheetNames;
            sheet_name_list.forEach(function (y) { /* iterate through sheets */

                worksheet = workbook.Sheets[y];
                if (y === "sorts") {
                    hasSortsWorksheet = true;
                    tester = XLSX.utils.sheet_to_csv(worksheet);
                    tester2 = tester.split(/\n/);

                    if (filetype === "user-input") {
                        for (var i = 1; i < 100; i++) {
                            tester3 = tester2[i].split(',');
                            tempArray.push(tester3);
                        }
                    } else if (filetype === "unforced") {
                        tester3 = tester2.filter(Boolean);
                        tempArray.push(tester3);
                    }

                } else if (y === "statements") {
                    hasStatementsWorksheet = true;
                    tempArray = [];
                    tester4 = XLSX.utils.sheet_to_json(worksheet);
                    tempArray.push(tester4);
                }
                allWorksheets.push(tempArray);
            }); // end iteration of for each
            if (hasSortsWorksheet === false) {
                $errorPanel.empty();
                $errorPanel.append("<p>Can't find the 'sorts' worksheet. Please check your file's worksheet names and try again.</p><br>");
                VIEW.showGenericErrorModal();
            }
            if (hasStatementsWorksheet === false) {
                $errorPanel.empty();
                $errorPanel.append("<p>Can't find the 'statements' worksheet. Please check your file's worksheet names and try again.</p><br>");
                VIEW.showGenericErrorModal();
            }
            if (filetype === "user-input") {
                formatUploadForDisplay(allWorksheets);
            } else if (filetype === "unforced") {
                formatUnforcedUploadForDisplay(allWorksheets);
            }
        };
        reader.readAsBinaryString(files);
    };


    //
    // ***************************************************************
    // ***** Import Type 3 - KEN-Q OUTPUT File ***********************
    // ***************************************************************
    EXCEL.filePickedKenq = function (e) {
        var language = QAV.getState("language");
        var localText1 = resources[language].translation["Project Overview"];
        var localText2 = resources[language].translation.Statements;
        var errorPanel = $("#genericErrorModal .errorPanel");

        var files = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = e.target.result;

            var workbook = XLSX.read(data, {
                type: 'binary'
            });

            // iterate through every sheet and pull values
            var hasSortsWorksheet = false;
            var hasStatementsWorksheet = false;
            var hasSortsWorksheetFromKenQ = false;
            var allWorksheets = [];
            var sheet_name_list = workbook.SheetNames;
            sheet_name_list.forEach(function (y) { /* iterate through sheets */

                var worksheet = workbook.Sheets[y];

                var tempArray;

                if (y === localText1) {
                    tempArray = [];
                    var tester6 = XLSX.utils.sheet_to_json(worksheet);
                    tempArray.push(tester6);

                } else if (y === "Q-sorts") {
                    hasSortsWorksheetFromKenQ = true;
                    var tester = XLSX.utils.sheet_to_csv(worksheet);
                    var tester2 = tester.split(/\n/);
                    tempArray = [];
                    tester2.forEach(function (entry) {
                        var tester3 = entry.split(',');
                        tempArray.push(tester3);
                    });
                } else if (y === localText2) {
                    hasStatementsWorksheet = true;
                    tempArray = [];
                    var tester4 = XLSX.utils.sheet_to_json(worksheet);
                    tempArray.push(tester4);
                }
                allWorksheets.push(tempArray);
            }); // end iteration for each
            if (hasSortsWorksheetFromKenQ === false) {
                errorPanel.empty();
                errorPanel.append("<p>Can't find Q-sorts. Please check your file's formatting and try again.</p><br>");
                VIEW.showGenericErrorModal();
            }
            if (hasStatementsWorksheet === false) {
                errorPanel.empty();
                errorPanel.append("<p>Can't find sort statements. Please check your file's formatting and try again.</p><br>");
                VIEW.showGenericErrorModal();
            }
            formatKenqUploadForDisplay(allWorksheets);
        };
        reader.readAsBinaryString(files);
    };


    //
    // ***************************************************************  model
    // ***** Format Type 1 Hand-Coded File for Display **********************
    // **********************************************************************

    function formatUploadForDisplay(data) {
        var language = QAV.getState("language");
        var errorText1 = resources[language].translation["has missing statement numbers"];
        var errorText2 = resources[language].translation["has an incorrect statement number"];
        var errorText3 = resources[language].translation["The number of statements in the statments sheet of the Excel file does not match the number of statements in the sorts sheet"];
        var isNumberOfStatementsCorrect, areThereErrors;

        // QAV #1
        var qavProjectName = data[0][0][1];
        QAV.setState("qavProjectName", qavProjectName);

        // // QAV #2  -  todo - fix loop function
        var inputData1 = data[0];
        var createMultiplierArrayAndTriangleShape = EXCEL.createMultiplierArrayAndTriangleShape(inputData1);
        var multiplierArray = createMultiplierArrayAndTriangleShape[0];
        var qavSortTriangleShape = createMultiplierArrayAndTriangleShape[1];
        QAV.setState("qavSortTriangleShape", qavSortTriangleShape);
        QAV.setState("multiplierArray", multiplierArray);


        // QAV #3
        var qavOriginalSortSize = qavSortTriangleShape.length; // number of statements
        QAV.setState("qavOriginalSortSize", qavOriginalSortSize);
        // todo - fix qavOriginalSortSize and qavTotalStatements are same - symmetry check functions
        QAV.setState("qavTotalStatements", qavOriginalSortSize);
        QAV.setState("originalSortSize", qavOriginalSortSize);
        // creates array of objects with sort value and statement number
        var sortData = EXCEL.prepInputData(inputData1, qavOriginalSortSize);


        // QAV #4

        var namesData = sortData.shift();
        var qavRespondentNames = EXCEL.getRespondentNames(namesData);
        // todo - fix double coverage of res names
        QAV.setState("qavRespondentNames", qavRespondentNames);
        QAV.setState("respondentNames", qavRespondentNames);


        // QAV #5
        var qavTotalNumberSorts = qavRespondentNames.length;
        QAV.setState("qavTotalNumberSorts", qavTotalNumberSorts);
        QAV.setState("totalNumberSorts", qavTotalNumberSorts);

        // QAV #6   respondent sorts
        var respondentDataSortsPrep = EXCEL.getRespondentSorts(sortData);
        var respondentDataSorts3 = respondentDataSortsPrep[0];
        var statementNumArray = respondentDataSortsPrep[1];
        QAV.setState("qavRespondentSortsFromDbStored", respondentDataSorts3);
        var qavRespondentSortsFromDbStored = _.cloneDeep(respondentDataSorts3);
        var symmData = _.cloneDeep(respondentDataSorts3);

        // QAV #7   project statements
        var statementData1 = data[1];
        var qavCurrentStatements = EXCEL.getStatements(statementData1);
        QAV.setState("qavCurrentStatements", qavCurrentStatements);
        var statementNumberTestValue = qavCurrentStatements.length;

        // //
        // // SYMMETRY TESTING
        // //
        var checkForNonSymmetry = EXCEL.testSymmetryOfSorts(qavSortTriangleShape, symmData, statementNumArray, statementNumberTestValue);
        areThereErrors = checkForNonSymmetry[0];
        isNumberOfStatementsCorrect = checkForNonSymmetry[1];


        // Display respondents and sorts OR error messages

        var respondentSorts = [];
        if (areThereErrors.length === 0 && isNumberOfStatementsCorrect === "true") {
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
            // display the download button for PQMethod export - todo - change naming for class
            $(".jsonDownloadPQ").show();
        } else {
            $("#genericErrorModal .errorPanel").empty();
            for (var t = 0; t < areThereErrors.length; t++) {
                $("#genericErrorModal .errorPanel").append("<p>" + qavRespondentNames[areThereErrors[t][0]] + " " + areThereErrors[t][1] + "</p><br>");
            }

            if (isNumberOfStatementsCorrect === "false") {
                $("#genericErrorModal .errorPanel").append("<h6>" + errorText3 + "</h6>");
            }

            VIEW.showGenericErrorModal();
        }
        QAV.setState("qavRespondentSortsFromDbStored", respondentSorts);
    }

    EXCEL.testSymmetryOfSorts = function (qavSortTriangleShape, symmData, statementNumArray, statementNumberTestValue) {
        var language = QAV.getState("language");
        var errorText1 = resources[language].translation["has missing statement numbers"];
        var errorText2 = resources[language].translation["has an incorrect Q-sort value"];
        var testSortTriangleShapeArray = _.cloneDeep(qavSortTriangleShape);
        var isNumberOfStatementsCorrect, areThereErrors = [];

        // Use D3.js to generate range array to test against
        var rangeTestArray = d3.range(1, (testSortTriangleShapeArray.length + 1));

        // test for missing values / consistent length
        var testMax = _.max(rangeTestArray);
        var testMin = _.min(rangeTestArray);
        var min, max, testSym;
        for (var kk = 0; kk < symmData.length; kk++) {
            max = _.max(statementNumArray[kk]);
            min = _.min(statementNumArray[kk]);
            if (max > testMax || min < testMin) {
                areThereErrors.push([kk, errorText2]);
            } else {
                testSym = checkQsortValueMatch(statementNumArray[kk], rangeTestArray);
                if (testSym > 0) {
                    areThereErrors.push([kk, errorText1]);
                }
            }
        }

        // check to see if number of statements in statements tab matches number calculated statements
        if (statementNumberTestValue !== testSortTriangleShapeArray.length) {
            isNumberOfStatementsCorrect = "false";
        } else {
            isNumberOfStatementsCorrect = "true";
        }
        // var returnedValue = [areThereErrors, isNumberOfStatementsCorrect];
        return [areThereErrors, isNumberOfStatementsCorrect];
    };


    EXCEL.getStatements = function (statementData1) {
        var qavCurrentStatements = [];
        for (var s = 0, sLen = statementData1[0].length; s < sLen; s++) {
            var temp12 = statementData1[0][s].Statements;
            if (temp12 === "" || temp12 === undefined || temp12 === null) {} else {
                qavCurrentStatements.push(temp12);
            }
        }
        return qavCurrentStatements;
    };

    EXCEL.getRespondentSorts = function (sortData) {
        var sortDataTransposed = _.zip.apply(_, sortData);
        var data2 = [];
        for (var p = 0; p < sortDataTransposed.length; p++) {
            var sortedArray1 = _.sortBy(sortDataTransposed[p], function (obj) {
                return obj.statementNum;
            });
            data2.push(sortedArray1);
        }
        var statementNumArray = [];
        var temp2, temp2a;
        var respondentDataSorts3 = [];
        for (var q = 0; q < data2.length; q++) {
            var temp11 = data2[q];
            var tempArray3 = [];
            var tempArray33 = [];
            for (var r = 0; r < temp11.length; r++) {
                temp2 = temp11[r].sortValue;
                temp2a = temp11[r].statementNum;
                tempArray3.push(temp2);
                tempArray33.push(temp2a);
            }
            respondentDataSorts3.push(tempArray3);
            statementNumArray.push(tempArray33);
        }
        var returnedValue = [respondentDataSorts3, statementNumArray];
        return [respondentDataSorts3, statementNumArray];
    };

    EXCEL.getRespondentNames = function (namesData) {
        var qavRespondentNames = [];
        for (var m = 0, mLen = namesData.length; m < mLen; m++) {
            var temp1 = namesData[m].statementNum;
            if (temp1 !== "") {
                qavRespondentNames.push(temp1);
            }
        }
        qavRespondentNames = UTIL.checkUniqueName(qavRespondentNames);
        return qavRespondentNames;
    };

    EXCEL.prepInputData = function (inputData1, qavOriginalSortSize) {
        var sortData = [];
        var sortLength = 29 + qavOriginalSortSize;
        var counter = (inputData1[28].length) - 1;

        for (var k = 28; k < sortLength; k++) {
            var key = inputData1[k][0];
            var value;
            var tempArray1 = [];
            var j = 1;
            var tempObj1;

            for (var kr = 0; kr < counter; kr++) {
                value = inputData1[k][j];

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
        return sortData;
    };

    EXCEL.createMultiplierArrayAndTriangleShape = function (inputData1) {
        console.log(inputData1);
        var qavSortTriangleShape = [];
        var multiplierArray = [];
        for (var i = 4; i < 24; i++) {
            var testValue = +inputData1[i][1];
            if (testValue < 1 || isNaN(testValue)) {
                multiplierArray.push(0);
            } else {
                var multiplier = +inputData1[i][1];
                multiplierArray.push(multiplier);
                var sortValue = +inputData1[i][0];
                for (var j = 0, jLen = multiplier; j < jLen; j++) {
                    qavSortTriangleShape.push(sortValue);
                }
            }
        }
        return [multiplierArray, qavSortTriangleShape];
    };


    //
    // ********************************************************************  model
    // ***** Format Type 2 Excel file (Unforced) for Display *********************
    // ***************************************************************************

    function formatUnforcedUploadForDisplay(data) {
        var language = QAV.getState("language");
        var errorText1 = resources[language].translation["has missing Q-sort values"];
        var errorText2 = resources[language].translation["has an incorrect Q-sort value"];
        var nonSymSortsDivHeader = resources[language].translation["Non-Symmetric Q-sorts"];
        var prev;
        var multiplierArray = [];

        // QAV #1
        var qavProjectName1 = data[0][0][1];
        var qavProjectName = qavProjectName1.toString().replace(/,/g, '');
        QAV.setState("qavProjectName", qavProjectName);

        // QAV #2 - calculate sort design array
        var calcSortTriangleT2 = EXCEL.calcSortTriangleShapeT2(data[0][0][3]);
        var copyTriangleShape = calcSortTriangleT2[0];
        var testSortTriangleShapeArray = calcSortTriangleT2[1];
        var qavSortTriangleShape = calcSortTriangleT2[2];
        QAV.setState("qavSortTriangleShape", qavSortTriangleShape);

        // calculate multiplierArray
        multiplierArray = EXCEL.calcMultiplierArrayT2(copyTriangleShape);
        QAV.setState("multiplierArray", multiplierArray);

        // QAV #3 - set Q-sort size
        var qavOriginalSortSize = qavSortTriangleShape.length; // number of statements
        QAV.setState("qavOriginalSortSize", qavOriginalSortSize);
        // todo - fix qavOriginalSortSize and qavTotalStatements are same - symmetry check functions
        QAV.setState("qavTotalStatements", qavOriginalSortSize);
        QAV.setState("originalSortSize", qavOriginalSortSize);

        // QAV #4 - grab respondent names and sorts
        var sortsDataT2 = data[0][0];
        var calcSorts = EXCEL.grabRespondentNamesAndSorts(sortsDataT2);
        var qavRespondentNames = calcSorts[0];
        var respondentSortsArray = calcSorts[1];
        var symmetryCheckArray = calcSorts[2];
        // todo - fix double coverage of res names
        QAV.setState("qavRespondentNames", qavRespondentNames);
        QAV.setState("respondentNames", qavRespondentNames);


        // QAV #5
        var qavTotalNumberSorts = qavRespondentNames.length;
        QAV.setState("qavTotalNumberSorts", qavTotalNumberSorts);
        QAV.setState("totalNumberSorts", qavTotalNumberSorts);


        // QAV #6 - set respondent sorts
        var qavRespondentSortsFromDbStored = respondentSortsArray;
        QAV.setState("qavRespondentSortsFromDbStored", qavRespondentSortsFromDbStored);


        // QAV #7
        var statementsDataT2 = data[1][0];
        var qavCurrentStatements = EXCEL.grabProjectStatements(statementsDataT2);
        QAV.setState("qavCurrentStatements", qavCurrentStatements);

        //
        // ERROR TESTING
        //
        var checkForErrors = EXCEL.checkForErrors(testSortTriangleShapeArray, symmetryCheckArray);
        var areThereErrors = checkForErrors[0];
        var nonSymmetricSorts = checkForErrors[1];


        // Display respondents and sorts OR error messages
        var respondentSorts = [];
        if (areThereErrors.length === 0) {
            for (var q = 0; q < qavCurrentStatements.length; q++) {
                var sortStatement = qavCurrentStatements[q];
                $("#existingDatabaseStatementList").append("<li>" + sortStatement + "</li>");
            }
            for (var rr = 0; rr < qavRespondentSortsFromDbStored.length; rr++) {
                var sortItem = qavRespondentSortsFromDbStored[rr];
                var sortItem3 = sortItem.replace(/,/g, " ").replace(/ -/g, "-");
                if (sortItem3.charAt(0) !== "-") {
                    sortItem3 = " " + sortItem3;
                }
                respondentSorts.push((sortItem3));
                var respondent = qavRespondentNames[rr];
                $("#existingDatabaseRespondentList").append("<li>" + respondent + "," + sortItem + "</li>");
            }
            if (nonSymmetricSorts.length > 0) {
                $("#nonSymmetricSortsDiv").append("<h4>" + nonSymSortsDivHeader + "</h4>");
                for (var w = 0; w < nonSymmetricSorts.length; w++) {
                    $("#nonSymmetricSortsDiv").append("<p>" + qavRespondentNames[nonSymmetricSorts[w]] + ", </p>");
                }
            }
            // show the download button in analysis data div
            $(".jsonDownloadPQ").show();
        } else {
            $("#genericErrorModal .errorPanel").empty();
            for (var t = 0; t < areThereErrors.length; t++) {
                $("#genericErrorModal .errorPanel").append("<p>" + qavRespondentNames[areThereErrors[t][0]] + " " + areThereErrors[t][1] + "</p><br>");
            }
            VIEW.showGenericErrorModal();
        }
        QAV.setState("qavRespondentSortsFromDbStored", respondentSorts);
    }



    EXCEL.checkForErrors = function (testSortTriangleShapeArray, symmetryCheckArray) {
        var language = QAV.getState("language");
        var errorText1 = resources[language].translation["has missing statement numbers"];
        var errorText2 = resources[language].translation["has an incorrect statement number"];
        var areThereErrors = [];
        var nonSymmetricSorts = [];

        // test for missing values / consistent length
        var testMax = _.max(testSortTriangleShapeArray);
        var testMin = _.min(testSortTriangleShapeArray);
        var testLen = testSortTriangleShapeArray.length;
        var min, max, testSym;
        for (var k = 0, kLen = symmetryCheckArray.length; k < kLen; k++) {
            // console.log(symmetryCheckArray[k].length);
            if (symmetryCheckArray[k].length !== testLen) {
                areThereErrors.push([k, errorText1]);
            }
            max = _.max(symmetryCheckArray[k]);
            min = _.min(symmetryCheckArray[k]);
            if (max > testMax || min < testMin) {
                areThereErrors.push([k, errorText2]);
            }
            testSym = checkQsortValueMatch(symmetryCheckArray[k], testSortTriangleShapeArray);
            if (testSym > 0) {
                nonSymmetricSorts.push(k);
            }
        }
        return [areThereErrors, nonSymmetricSorts];
    };

    EXCEL.grabProjectStatements = function (statementsDataT2) {
        var qavCurrentStatements = [];
        for (var s = 0, sLen = statementsDataT2.length; s < sLen; s++) {
            var temp12 = statementsDataT2[s].Statements;
            if (temp12 === "" || temp12 === undefined || temp12 === null) {} else {
                qavCurrentStatements.push(temp12);
            }
        }
        return qavCurrentStatements;
    };

    EXCEL.grabRespondentNamesAndSorts = function (sortsDataT2) {
        var symmetryCheckArray = [];
        var qavRespondentNames = [];
        var sortsForDisplay = [];
        var respondentSortsArray = [];
        for (var m = 6; m < sortsDataT2.length; m++) {
            var temp1 = sortsDataT2[m].toString().replace(/,,/g, '');
            // to prevent from reading empty cells as data
            if (temp1.length < 5) {
                break;
            }
            // convert from array of strings to array of numbers
            sortsForDisplay.push(temp1);
            temp1 = removeTrailingCommaFromText(temp1);
            var temp3 = temp1.split(',');
            var temp4 = temp3.shift();
            var temp5 = temp3.toString();
            // check to confirm sort value is numeric
            if (temp5.match(/[^,-\d]/)) {
                var errorPanel = $("#genericErrorModal .errorPanel");
                errorPanel.empty();
                errorPanel.append("<p>The Q-sort for respondent " + temp4 + " contains non-numeric data</p>");
                VIEW.showGenericErrorModal();
                return;
            }
            qavRespondentNames.push(temp4);
            respondentSortsArray.push(temp5);
            symmetryCheckArray.push(temp3);
        }
        return [qavRespondentNames, respondentSortsArray, symmetryCheckArray];
    };

    EXCEL.calcMultiplierArrayT2 = function (copyTriangleShape) {
        var multiplierArray = [];
        var prev;
        for (var i = 0, iLen = copyTriangleShape.length; i < iLen; i++) {
            if (copyTriangleShape[i] !== prev) {
                multiplierArray.push(1);
            } else {
                multiplierArray[multiplierArray.length - 1]++;
            }
            prev = copyTriangleShape[i];
        }
        // pad the multiplierArray
        var leadValue = copyTriangleShape[0];
        var minLeadValue = -6;
        var padding = Math.abs(minLeadValue - leadValue);
        for (var p = 0; p < padding; p++) {
            multiplierArray.unshift(0);
        }
        for (var j = 0; j < 20; j++) {
            if (multiplierArray.length < 20) {
                multiplierArray.push(0);
            }
        }
        return multiplierArray;
    };


    EXCEL.calcSortTriangleShapeT2 = function (qavSortTriangleShape1) {
        var qavSortTriangleShape2 = qavSortTriangleShape1.replace(/,,/g, '');
        qavSortTriangleShape2 = removeTrailingCommaFromText(qavSortTriangleShape2);
        var qavSortTriangleShape3 = qavSortTriangleShape2.replace(/Sort Pattern,/, '');
        var tempTriangle2 = qavSortTriangleShape3.split(",");
        for (var a in tempTriangle2) {
            tempTriangle2[a] = parseInt(tempTriangle2[a], 10);
        }
        var copyTriangleShape = _.cloneDeep(tempTriangle2);
        var testSortTriangleShapeArray = _.cloneDeep(tempTriangle2);
        var qavSortTriangleShape = _.cloneDeep(tempTriangle2);
        return [copyTriangleShape, testSortTriangleShapeArray, qavSortTriangleShape];
    };




    // HELPER FUNCTIONS

    function removeTrailingCommaFromText(string) {
        var lastChar = string.slice(-1);
        if (lastChar == ',') {
            string = string.slice(0, -1);
        }
        return string;
    }

    // strips everything but letters and numbers and "." "-"
    function sanitizeSortValues(value) {
        return value.replace(/[^a-zA-Z0-9.-]/g, function () {
            return '';
        });
    }

    function checkQsortValueMatch(inputArray, triangleShapeArray) {
        var testVar = _.cloneDeep(triangleShapeArray);
        var a = inputArray.sort().join(',');
        var b = testVar.sort().join(',');
        // console.log(JSON.stringify(a));
        // console.log(JSON.stringify(b));
        if (a !== b) {
            return 1;
        } else {
            return 0;
        }
    }


    //
    // ********************************************************************  model
    // ***** Format Type 3 Ken-Q Output File for Display *************************
    // ***************************************************************************

    function formatKenqUploadForDisplay(data) {
        // QAV #1
        var qavProjectName = data[0][0][0][""];

        QAV.setState("qavProjectName", qavProjectName);

        // QAV #2 - get sort triangle shape
        var grabSortTriangleShapeT3 = EXCEL.grabSortTriangleShapeT3(data[0][0][4][""]);
        var qavSortTriangleShape = grabSortTriangleShapeT3[0];
        var copyTriangleShape = grabSortTriangleShapeT3[1];
        QAV.setState("qavSortTriangleShape", qavSortTriangleShape);

        // calculate multiplierArray
        var multiplierArray = EXCEL.calcMultiplierArrayT2(copyTriangleShape);
        QAV.setState("multiplierArray", multiplierArray);

        // QAV #3
        var qavOriginalSortSize = qavSortTriangleShape.length; // number of statements
        QAV.setState("qavOriginalSortSize", qavOriginalSortSize);
        // todo - fix qavOriginalSortSize and qavTotalStatements are same - symmetry check functions
        QAV.setState("qavTotalStatements", qavOriginalSortSize);
        QAV.originalSortSize = qavOriginalSortSize;

        // QAV #4 - pull respondent names from data
        var qavRespondentNames = EXCEL.grabRespondentNamesT3(data[2]);
        QAV.setState("qavRespondentNames", qavRespondentNames);
        QAV.setState("respondentNames", qavRespondentNames);

        // QAV #5 - set total number of sorts
        var qavTotalNumberSorts = qavRespondentNames.length;
        QAV.setState("qavTotalNumberSorts", qavTotalNumberSorts);
        QAV.setState("totalNumberSorts", qavTotalNumberSorts);

        // QAV #6 - get respondent sorts 
        var qavRespondentSortsFromDbStored = EXCEL.grabSortsT3(data[2], qavOriginalSortSize);

        // QAV #7 - get statements
        var qavCurrentStatements = EXCEL.grabStatementsT3(data[1][0]);
        QAV.setState("qavCurrentStatements", qavCurrentStatements);

        // SYMMETRY TESTING  -  TODO - ADD Non-Symmetric notification
        var sortsTestingArray = _.cloneDeep(qavRespondentSortsFromDbStored);
        var shouldDisplayResults = [];

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
            // display PQMethod export button
            $(".jsonDownloadPQ").show();
        }
        QAV.setState("qavRespondentSortsFromDbStored", respondentSorts);
    }

    EXCEL.grabStatementsT3 = function (data) {
        var qavCurrentStatements = [];
        for (var pp = 1; pp < data.length; pp++) {
            var temp11 = data[pp][""];
            if (temp11 === "" || temp11 === undefined || temp11 === null) {} else {
                qavCurrentStatements.push(temp11);
            }
        }
        return qavCurrentStatements;
    };

    EXCEL.grabSortsT3 = function (data, qavOriginalSortSize) {
        var qavRespondentSortsFromDbStored = [];
        for (var k = 4; k < data.length; k++) {
            var tempArray1 = [];
            var isEmpty = data[k][1];
            if (isEmpty === "" || isEmpty === null || isEmpty === undefined) {} else {
                var temp2 = data[k][1];
                var start = sanitizeSortValues(temp2);
                tempArray1.push(+start);
                var mLength = qavOriginalSortSize;
                for (var m = 2; m < mLength; m++) {
                    var temp3 = data[k][m];
                    tempArray1.push(+temp3);
                }
                var finish2 = data[k][mLength];
                var finish = sanitizeSortValues(finish2);
                tempArray1.push(+finish);
                qavRespondentSortsFromDbStored.push(tempArray1);
            }
        }
        return qavRespondentSortsFromDbStored;
    };

    EXCEL.grabRespondentNamesT3 = function (data) {
        var qavRespondentNames2 = [];
        for (var jj = 1, jjLen = data.length; jj < jjLen; jj++) {
            var temp1 = data[jj][0];
            if (temp1 === "") {} else {
                qavRespondentNames2.push(temp1);
            }
        }
        var qavRespondentNames = qavRespondentNames2.slice(2);
        return qavRespondentNames;
    };

    EXCEL.grabSortTriangleShapeT3 = function (qavSortTriangleShape1) {
        var qavSortTriangleShape = JSON.parse("[" + qavSortTriangleShape1 + "]");
        var copyTriangleShape = _.cloneDeep(qavSortTriangleShape);
        var returns = [qavSortTriangleShape, copyTriangleShape];
        return [qavSortTriangleShape, copyTriangleShape];
    };

}(window.EXCEL = window.EXCEL || {}, QAV));