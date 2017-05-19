//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global numeric, CENTROID, window, QAV, $, document, JQuery, evenRound, UTIL, localStorage, _ */

(function (PASTE, QAV, undefined) {
    'use strict';

    PASTE.stageDataPqmethod = function () {
        var statements, sortStatement, statementInput;

        // get statements as array and store
        statements = PASTE.pullStatementsIntoAnalysis("statementsInputBoxPqmethod");
        QAV.setState("qavCurrentStatements", statements);

        for (var i = 0; i < statements.length; i++) {
            sortStatement = statements[i];
            $("#existingDatabaseStatementList").append("<li>" + sortStatement + "</li>");
        }

        // split into lines
        statementInput = document.getElementById("sortInputBox").value;

        var settings = PASTE.processTextBoxData(statementInput);

        // parsing first line of PQMethod file to set qav variables
        var numberSorts = settings[0];
        var qavProjectName = settings[1];
        var originalSortSize = settings[2];
        var pyramidShapeNumbers = settings[3];
        var array1 = settings[4];

        QAV.setState("qavTotalNumberSorts", numberSorts);
        QAV.setState("totalNumberSorts", numberSorts);
        QAV.setState("qavProjectName", qavProjectName);
        QAV.setState("qavTotalStatements", originalSortSize);
        QAV.setState("qavOriginalSortSize", originalSortSize);
        QAV.setState("originalSortSize", originalSortSize);

        // // parsing and coercing second line of PQMethod file
        // // warning -array temp1 has an extra "0" entry in position 0
        QAV.setState("qavPyramidShape", pyramidShapeNumbers);

        UTIL.calculateSortTriangleShape(pyramidShapeNumbers);

        var namesAndSorts = PASTE.convertSortsTextToNamesAndSortNumbers(array1, originalSortSize);
        var names = namesAndSorts[0];
        var sorts = namesAndSorts[1];

        // break text array into names text array and sorts text array
        QAV.setState("qavRespondentSortsFromDbStored", sorts);

        // to prevent errors in zScore calcs and issues with "." in datatables
        var names2 = UTIL.checkUniqueName(names);

        // set respondent names for later  todo - delete doubles
        QAV.setState("qavRespondentNames", names2);
        QAV.setState("respondentNames", names2);

        // format pasted data
        var sortsAsNumbers = CORR.convertSortsTextToNumbers(sorts, originalSortSize);

        for (var j = 0; j < sortsAsNumbers.length; j++) {
            var sortItem = sortsAsNumbers[j];
            var respondent = names2[j];
            $("#existingDatabaseRespondentList").append("<li>" + respondent + "&nbsp;&nbsp;&nbsp" + sortItem + "</li>");
        }
    };

    PASTE.convertSortsTextToNamesAndSortNumbers = function (array1, originalSortSize) {
        // break text array into names text array and sorts text array
        var sortSize = ((originalSortSize * 2) + 10); // lipset 76
        var names = [];
        var sorts = [];
        _(array1).forEach(function (element) {
            if (element.length) {
                var nameFragment = element.slice(0, 8);
                names.push(nameFragment);
                var sortFragment = element.slice(10, sortSize);
                sorts.push(sortFragment);
            }
        }).value();
        return [names, sorts];
    };

    PASTE.processTextBoxData = function (statementInput) {
        var arr = statementInput.split(/\r\n|\r|\n/g);
        var array1 = arr.slice(0, arr.length);
        var projectTitleString = array1.shift();
        var sortNumberString = array1.shift();

        // parsing first line of PQMethod file to set qav variables
        var numberSorts = parseInt(projectTitleString.slice(3, 6)); // lipset 9
        var originalSortSize = parseInt(projectTitleString.slice(6, 9)); // lipset 33
        var qavProjectName3 = (projectTitleString.slice(10, 70));
        var qavProjectName2 = qavProjectName3.trim();
        var qavProjectName = PASTE.sanitizeProjectName(qavProjectName2);

        // parsing and coercing second line of PQMethod file
        // warning -array temp1 has an extra "0" entry in position 0
        var temp1b = sortNumberString.replace(/\s\s/g, ' ');
        var temp1a = temp1b.split(" ");
        var temp1 = temp1a.map(Number);
        var pyramidShapeNumbers = temp1.slice(3, temp1.length);

        return [numberSorts, qavProjectName, originalSortSize, pyramidShapeNumbers, array1];
    };



    /****************************************************************  view control
     ********* Pull variables helper functions ************************************
     ******************************************************************************/

    PASTE.pullStatementsIntoAnalysis = function (statementTextareaId) {

        var statementInput1 = document.getElementById(statementTextareaId).value;

        var statementInput = statementInput1.trim();
        var arr = statementInput.split(/\r\n|\r|\n/g);

        var cleanStatements = [];

        $.each(arr, function () {
            var temp1 = UTIL.sanitizeUserInputText(this);
            cleanStatements.push($.trim(temp1));
        });
        return cleanStatements;
    };


    // todo - check to see if this function is used anywhere
    PASTE.pullProjectNameIntoAnalysis = function (projectNameInputId) {
        var dataSetName = document.getElementById(projectNameInputId).value;
        return dataSetName;
    };

    PASTE.sanitizeProjectName = function (qavProjectName2) {
        if (qavProjectName2 === '') {
            return '_';
        }
        return qavProjectName2.replace(/[^a-zA-Z0-9.-]/g, function () {
            return '_'; // + match[0].charCodeAt(0).toString(16) + '_';
        });
    };

    // *******************************************************************  model
    // ***** Import Hand-Coded File *********************************************
    // **************************************************************************
    PASTE.filePickedTextPQM = function (e) {

        var files = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = e.target.result;
            $("#sortInputBox").val(data);
            localStorage.setItem("sortInputBox", data);

        }; // end of reader function
        reader.readAsText(files, "ASCII");
    };

    // ******************************************************************  model
    // ***** Import User Statements File ***************************************
    // *************************************************************************
    PASTE.filePickedTextSTA = function (e) {
        var files = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = e.target.result;
            $("#statementsInputBoxPqmethod").val(data);
            localStorage.setItem("qavStatementsInputBoxPqmethod", data);
        }; // end of reader function
        reader.readAsText(files, "ASCII");
    };


    // persist statements in PQMethod paste input section
    (function () {
        var input = document.getElementById('statementsInputBoxPqmethod');
        //retrieve analysisVariable
        input.value = localStorage.getItem("qavStatementsInputBoxPqmethod");

        $('#statementsInputBoxPqmethod').on('input propertychange change', function () {
            localStorage.setItem("qavStatementsInputBoxPqmethod", this.value);
        });
    })();




}(window.PASTE = window.PASTE || {}, QAV));