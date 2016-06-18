//Ken-Q Analysis 
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global numeric, window, QAV, $, VIEW, evenRound, UTIL, localStorage, _ */

(function (CENTROID, QAV, undefined) {

    CENTROID.drawExtractedFactorsTable = function () {

        // get state centroidFactors
        var centroidFactors = _.cloneDeep(QAV.centroidFactors);
        var i, j, k, names;
        var temp1, loopLen, targets, slicedTargets, headers;

        // get state repondentNames
        names = _.clone(QAV.respondentNames) || [];

        if (names[0] === "") {
            names.shift();
        }

        for (i = 0; i < centroidFactors.length; i++) {
            j = i + 1;
            centroidFactors[i].unshift(j, names[i]);
        }

        headers = [{
            title: "Num."
        }, {
            title: "Respond."
        }];

        // make headers dynamic
        loopLen = (centroidFactors[0].length) - 2;
        for (k = 0; k < loopLen; k++) {
            temp1 = {};
            temp1.title = "Factor " + (k + 1);
            headers.push(temp1);
        }

        // make targets dynamic
        targets = [2, 3, 4, 5, 6, 7, 8, 9];
        slicedTargets = targets.slice(0, loopLen);

        var configObj = {};
        configObj.domElement = "#factorRotationTable1";
        configObj.fixed = false;
        configObj.data = centroidFactors;
        configObj.headers = headers;
        configObj.colDefs = [{
                targets: [0, 1],
                className: 'dt-head-center dt-body-center dt-body-name'
        },
            {
                targets: slicedTargets,
                className: 'dt-head-center dt-body-right'
                             },
            {
                targets: '_all',
                "createdCell": function (td, cellData, rowData, row, col) {
                    if (cellData < 0) {
                        $(td).css('color', 'red');
                    }
                }
                             }];

        UTIL.drawDatatable(configObj);

        $("#rotationHistoryList").append('<li>' + QAV.numFactorsExtracted + ' Centroid Factors Extracted</li>');

        CENTROID.createFooterTable(headers, slicedTargets);

    };

    CENTROID.createFooterTable = function (headers, slicedTargets) {
        var eigenValues, percentExplainedVariance, loopLen1, m, headers2;
        var data = [];
        var tempArray = [];
        var tempObj = {};

        // get state centroidEigenvalues
        eigenValues = _.clone(QAV.centroidEigenvalues);
        eigenValues.unshift("");
        percentExplainedVariance = JSON.parse(localStorage.getItem("expVarCentroid"));
        percentExplainedVariance.unshift("");
        loopLen1 = percentExplainedVariance.length;


        var value = 0;
        for (m = 2; m < loopLen1; m++) {
            value = value + percentExplainedVariance[m];
            tempArray.push(value);
        }

        tempArray.unshift("", "Cum % Expln Var");

        data.push(eigenValues, percentExplainedVariance, tempArray);

        headers2 = headers.slice(2, headers.length);
        tempObj.title = "";
        var tempObj2 = tempObj;

        headers2.unshift(tempObj, tempObj2);

        var configObj = {};
        configObj.domElement = "#factorRotationTable1Footer";
        configObj.fixed = false;
        configObj.data = data;
        configObj.headers = headers2;
        configObj.ordering = false;
        configObj.colDefs = [{
                targets: [0, 1],
                className: 'dt-head-center dt-body-center dt-body-name'
        },
            {
                targets: slicedTargets,
                className: 'dt-head-center dt-body-right'
                             },
            {
                targets: '_all',
                "createdCell": function (td, cellData, rowData, row, col) {
                    if (cellData < 0) {
                        $(td).css('color', 'red');
                    }
                }
                             }];
        UTIL.drawDatatable(configObj);
    };
}(window.CENTROID = window.CENTROID || {}, QAV));