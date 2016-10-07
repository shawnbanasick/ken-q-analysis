//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// navigation = "single page Nav"  https://github.com/ChrisWojcik/single-page-nav
/*jslint browser: true*/
/*global $, jQuery, _, alert*/

$(document).ready(function () {




});


// function beginAnalysisPqmethod() {

//    var statements = pullStatementsIntoAnalysis("statementsInputBoxPqmethod");
//    localStorage.setItem("qavCurrentStatements", JSON.stringify(statements));

// callCentroidFromPQMethod();

//    $("#analysisPrep")[0].click();
// }

//********************************************************************** flow control
//**** 1.  transform PQMethod pasted data to correlations ***************************
//***********************************************************************************
// function callCentroidFromPQMethod() {

//    // split into lines
//    var statementInput = document.getElementById("sortInputBox").value;
//    var arr = statementInput.split(/\r\n|\r|\n/g);
//    var array1 = arr.slice(0, arr.length);
//    var projectTitleString = array1.shift();
//    var sortNumberString = array1.shift();
//
//    // parsing first line of PQMethod file to set qav variables
//    var numberSorts = parseInt(projectTitleString.slice(3, 6)); // lipset 9
//
//    localStorage.setItem("qavTotalNumberSorts", numberSorts);
//    QAV.totalNumberSorts = numberSorts;
//    
//    var originalSortSize = parseInt(projectTitleString.slice(7, 9)); // lipset 33
//    var qavProjectName3 = (projectTitleString.slice(10, 70));
//    var qavProjectName2 = qavProjectName3.trim();
//    var qavProjectName = sanitizeProjectName(qavProjectName2);
//    localStorage.setItem("qavProjectName", JSON.stringify(qavProjectName));
//
//    localStorage.setItem("qavTotalStatements", originalSortSize);
//    localStorage.setItem("qavOriginalSortSize", originalSortSize);
//    QAV.originalSortSize = originalSortSize;
//
//    // parsing and coercing second line of PQMethod file
//    // warning -array temp1 has an extra "0" entry in position 0
//    var temp1b = sortNumberString.replace(/\s\s/g, ' ');
//    var temp1a = temp1b.split(" ");
//    var temp1 = temp1a.map(Number);
//    var pyramidShapeNumbers = temp1.slice(3, temp1.length);
//
//    localStorage.setItem("qavPyramidShape", JSON.stringify(pyramidShapeNumbers));
//
//    calculateSortTriangleShape(pyramidShapeNumbers);
//
//    var sortSize = ((originalSortSize * 2) + 10); // lipset 76
//    var names = [];
//    var sorts = [];
//
//    // break text array into names text array and sorts text array
//    _(array1).forEach(function (element) {
//        if (element.length) {
//            var nameFragment = element.slice(0, 8);
//            names.push(nameFragment);
//            var sortFragment = element.slice(10, sortSize);
//            sorts.push(sortFragment);
//        }
//    }).value();
//
//    // to prevent errors in zScore calcs and issues with "." in datatables
//    var names2 = checkUniqueName(names);
//
//    // set respondent names for later
//    localStorage.setItem("qavRespondentNames", JSON.stringify(names2));
//      QAV.respondentNames = names2;
//
//
//    // format pasted data
//    var sortsAsNumbers = convertSortsTextToNumbers(sorts, originalSortSize);
//
//    // get correlations for pasted data
//    var correlationTable = calculateCorrelations(sortsAsNumbers, names2);
//
//    // display the correlation table for the pasted PQMethod data
//    createDisplayTableJQUERY(correlationTable, "correlationTable2");
// }