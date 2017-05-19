//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.

// JSlint declarations
/* global window, QAV, $, FileReader, UTIL, document */

(function (FIREBASE, QAV, undefined) {
    'use strict';

    FIREBASE.filePickedJSON = function (evt) {
        var JsonObj;
        var files = evt.target.files; // FileList object
        var f = files[0];
        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function () { // theFile
            return function (e) {
                // Render thumbnail.
                JsonObj = e.target.result;
                var jsonObjFile = JSON.parse(JsonObj);
                QAV.setState("JsonObj", jsonObjFile);
                FIREBASE.setRespondentId(jsonObjFile);
            };
        })(f);
        // Read in the image file as a data URL.
        reader.readAsText(f);
    };

    FIREBASE.setRespondentId = function (JsonObj) {
        $(".jsonSelect").show();
        $(".downloadCsvDataDiv").show();
        var keys = Object.keys(JsonObj);
        var responseObjectKeys = Object.keys(JsonObj[keys[0]]);
        var projectName = JsonObj[keys[0]].name;
        QAV.setState("qavProjectName", projectName);
        $(".jsonFileName").html('"' + projectName + '" loaded');
        $.each(responseObjectKeys, function (key, value) {
            $('#jsonIdSelect')
                .append($('<option>', {
                        value: key
                    })
                    .text(value));
        });
    };

    FIREBASE.stageJsonData = function () {
        var arr, array1, j, k, m, id, JsonObj, temp5, keys, i, sort0, temp1, tempString1, sortArray, iLen, mLen, kLen, sort2, sort3, jLen, replaced, prev, statementInput; 
        var qavRespondentNames, qavRespondentSortsFromDbStored, qavSortTriangleShape, multiplierArray, displaySortsArray;

        // clear out any previously loaded data
        $("#existingDatabaseStatementList").empty();
        $("#existingDatabaseRespondentList").empty();

        // grab statement data from DOM input
        statementInput = document.getElementById("statementsInputBoxJson").value;

        // process statements from text to data
        array1 = FIREBASE.processStatementInput(statementInput);
        QAV.setState("qavCurrentStatements", array1);
        QAV.setState("qavOriginalSortSize", array1.length);
        QAV.setState("originalSortSize", array1.length);

        // append statements to the DOM
        for (k = 0, kLen = array1.length; k < kLen; k++) {
            $("#existingDatabaseStatementList").append("<li>" + array1[k] + "</li>");
        }

        // grab the id selection from DOM
        id = $("#jsonIdSelect :selected").text();
        JsonObj = QAV.getState("JsonObj");

        // pull names and sorts from JSON data
        var respondentNamesAndSorts = FIREBASE.pullRespondentNamesAndSortInformation(JsonObj, id);
        displaySortsArray = respondentNamesAndSorts[0];
        qavRespondentSortsFromDbStored = respondentNamesAndSorts[1];
        keys = respondentNamesAndSorts[2];
        sort0 = respondentNamesAndSorts[3];
        qavRespondentNames = respondentNamesAndSorts[4];

        // append sorts to the DOM
        for (var ii = 0, iiLen = displaySortsArray.length; ii < iiLen; ii++) {
            $("#existingDatabaseRespondentList").append('<li>' + displaySortsArray[ii] + '<button class="deleteButtonSort vertical">delete sort</button></li>');
        }

        // calculate sort design pattern
        qavSortTriangleShape = FIREBASE.calculateSortDesignPattern(JsonObj, keys, sort0);

        // calculate multiplierArray
        multiplierArray = FIREBASE.calculateMultiplierArray(qavSortTriangleShape);

        QAV.setState("multiplierArray", multiplierArray);
        QAV.setState("qavSortTriangleShape", qavSortTriangleShape);
        QAV.setState("qavRespondentNames", qavRespondentNames);
        QAV.setState("qavRespondentSortsFromDbStored", qavRespondentSortsFromDbStored);
    };

    FIREBASE.calculateMultiplierArray = function (qavSortTriangleShape) {
        var multiplierArray = [];
        var prev;

        for (var m = 0, mLen = qavSortTriangleShape.length; m < mLen; m++) {
            if (qavSortTriangleShape[m] !== prev) {
                multiplierArray.push(1);
            } else {
                multiplierArray[multiplierArray.length - 1]++;
            }
            prev = qavSortTriangleShape[m];
        }

        var leadValue = qavSortTriangleShape[0];
        var minLeadValue = -6;
        var padding = Math.abs(minLeadValue - leadValue);
        for (var p = 0; p < padding; p++) {
            multiplierArray.unshift(0);
        }
        for (var r = 0; r < 20; r++) {
            if (multiplierArray.length < 20) {
                multiplierArray.push(0);
            }
        }
        return multiplierArray;
    };


    FIREBASE.calculateSortDesignPattern = function (JsonObj, keys, sort0) {
        var sort2, sort3, temp5;
        var qavSortTriangleShape = [];
        sort2 = JsonObj[keys[1]].sort;
        sort3 = (sort0.split("|"));
        for (var j = 0, jLen = sort3.length; j < jLen; j++) {
            temp5 = +sort3[j];
            qavSortTriangleShape.push(temp5);
        }
        qavSortTriangleShape.sort(function (a, b) {
            return a - b;
        });
        return qavSortTriangleShape;
    };

    FIREBASE.pullRespondentNamesAndSortInformation = function (JsonObj, id) {
        var temp1, sort0, sortArray, replaced, tempString1;
        var qavRespondentNames = [];
        var qavRespondentSortsFromDbStored = [];
        var displaySortsArray = [];

        var keys = Object.keys(JsonObj);
        for (var i = 0, iLen = keys.length; i < iLen; i++) {
            if (id === "ID") {
                // create unique id from key
                temp1 = keys[i].slice(-10);
                qavRespondentNames.push(temp1);
            } else {
                temp1 = JsonObj[keys[i]][id];
                qavRespondentNames.push(temp1);
            }
            sort0 = JsonObj[keys[i]].sort;
            sortArray = "" + (sort0.split("|"));
            var replacedDisplay2 = sortArray.split('+').join('');
            var replacedQAV2 = sortArray.split('+').join(' ');
            var replacedDisplay3 = replacedDisplay2.split(',').join(',');
            var replacedQAV3 = replacedQAV2.split(',').join('');

            qavRespondentSortsFromDbStored.push(replacedQAV3);
            replaced = replacedDisplay3.split(' 0').join('0');
            tempString1 = temp1 + "," + replaced;

            displaySortsArray.push(tempString1);
        }
        return [displaySortsArray, qavRespondentSortsFromDbStored, keys, sort0, qavRespondentNames];
    };


    FIREBASE.processStatementInput = function (statementInput) {
        var arr = statementInput.split(/\r\n|\r|\n/g);
        // remove empty strings created by extra new line at end of pasted data
        var array1 = arr.filter(function (e) {
            return e;
        });
        return array1;
    };


    FIREBASE.convertToData = function (JsonObj) {
        var csvBody = [];
        var sortHeaders = [];

        var keys = Object.keys(JsonObj);
        var headerArray = Object.keys(JsonObj[keys[0]]);
        var sort0 = JsonObj[keys[0]].sort;
        var sortArray = sort0.split("|");

        for (var k = 0, kLen = sortArray.length; k < kLen; k++) {
            var counter1 = "S" + (k + 1);
            sortHeaders.push(counter1);
        }
        var headerArray2 = headerArray.concat(sortHeaders);
        // do not change to ID - will throw error when opening in MS Excel
        headerArray2.unshift("Id");
        csvBody.push(headerArray2);

        for (var i = 0, iLen = keys.length; i < iLen; i++) {
            var tempArray1 = [];
            // var tempArray2 = [];

            // get index
            var temp4 = keys[i];
            // get object
            var arrayObj = JsonObj[temp4];
            // get object keys
            var arrayObjKeys = Object.keys(arrayObj);

            // create unique id from key
            var id = temp4.slice(-10);
            tempArray1.push(id);
            for (var m = 0, mLen = arrayObjKeys.length; m < mLen; m++) {
                var value = arrayObj[arrayObjKeys[m]];
                tempArray1.push(value);
            }

            // get sort of object
            var sort1 = arrayObj.sort;
            var sort2 = sort1.split("|");


            for (var j = 0, jLen = sort2.length; j < jLen; j++) {
                var temp5 = +sort2[j];
                tempArray1.push(temp5);
            }
            csvBody.push(tempArray1);
        }
        return csvBody;
    };

    FIREBASE.downloadJsonData = function () {
        var data = QAV.getState("JsonObj");
        var projectName = QAV.getState("qavProjectName");
        var csvBody = FIREBASE.convertToData(data);
        var csvRows = [];

        for (var i = 0, l = csvBody.length; i < l; ++i) {
            for (var k = 0, kLen = csvBody[i].length; k < kLen; k++) {
                csvBody[i][k] = UTIL.sanitizeUserInputText(csvBody[i][k]);
            }
            csvRows.push(csvBody[i].join(','));
        }
        // export the file
        UTIL.exportToCsv(projectName + '.csv', csvBody);
    };

}(window.FIREBASE = window.FIREBASE || {}, QAV));