//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global numeric, window, QAV, $, document, JQuery, evenRound, UTIL, localStorage, _ */

(function (PCA, QAV, undefined) {

    PCA.doPrincipalComponents = function (X) {

        var m, sigma, svd, numberOfSorts, eigens, eigenVecs, p;
        var eigenValuesSorted, y, percentNumber, eigenValuesAsPercents;
        var eigenValuesCumulPercentArray, eigenValuesPercent, pcaFactorsToExtractArray;
        var eigenValueCumulPercentAccum, k;
        var critInflectionValue, temp4, i, j, temp1, temp3, temp5, s, t;
        var numberFactorsExtracted;
        var factorLabels = [];
        var numberofPrincipalComps;
        var inflectionArray = [];

        // to differentiate output functions
        QAV.setState("typeOfFactor", "PCA");

        numberOfSorts = QAV.getState("totalNumberSorts");

        // determine the max number of factors to extract
        temp4 = QAV.getState("originalSortSize");
        temp5 = QAV.getState("totalNumberSorts");
        pcaFactorsToExtractArray = [8, temp4, temp5];
        numberFactorsExtracted = _.min(pcaFactorsToExtractArray);

        numberofPrincipalComps = numberFactorsExtracted;
        QAV.setState("numberFactorsExtracted", numberFactorsExtracted);
        QAV.pcaNumberFactorsExtracted = numberFactorsExtracted;
        UTIL.addFactorSelectCheckboxesRotation(numberFactorsExtracted);


        // labels according to factors extacted (above)
        for (m = 0; m < numberFactorsExtracted; m++) {
            factorLabels.push("Factor " + (m + 1));
        }

        QAV.setState("factorLabels", factorLabels);

        // svd = matrix of all principle components as column vectors          
        m = X.length;
        sigma = numeric.div(numeric.dot(numeric.transpose(X), X), m);
        svd = numeric.svd(sigma).U;


        // eigens = eigenvalues for data X 
        eigens = numeric.eig(X);

        // setup empty array
        eigenVecs = [];
        for (p = 0; p < numberOfSorts; p++) {
            eigenVecs.push([]);
        }

        // sort eigenValues from numeric
        eigenValuesSorted = eigens.lambda.x;
        eigenValuesSorted.sort(function (a, b) {
            return (b - a);
        });

        // round off numbers 
        for (y = 0; y < eigenValuesSorted.length; y++) {
            eigenValuesSorted[y] = evenRound((eigenValuesSorted[y]), 4);
        }

        percentNumber = 100 / numberOfSorts;
        eigenValuesAsPercents = [];
        eigenValuesCumulPercentArray = [];
        eigenValueCumulPercentAccum = 0;

        for (k = 0; k < eigenValuesSorted.length; k++) {
            eigenValuesPercent = evenRound((eigenValuesSorted[k] * percentNumber), 0);
            eigenValuesAsPercents.push(eigenValuesPercent);
            eigenValueCumulPercentAccum = eigenValueCumulPercentAccum + eigenValuesPercent;
            eigenValuesCumulPercentArray.push(eigenValueCumulPercentAccum);
        }

        // loop through each component    
        for (i = 0; i < numberofPrincipalComps; i++) {

            temp1 = Math.sqrt(eigenValuesSorted[i]);

            critInflectionValue = 0;

            // loop through each QSort to get loading and also calc CRIT
            for (j = 0; j < svd.length; j++) {
                temp3 = evenRound((svd[j][i] * temp1), 4);
                eigenVecs[j][i] = temp3;
                // set up data for influection test
                temp4 = evenRound((temp3 * Math.abs(temp3)), 4);
                critInflectionValue = critInflectionValue + temp4;
            }
            inflectionArray.push(critInflectionValue);
        }

        // check and inflect components if necessary
        for (s = 0; s < eigenVecs[0].length; s++) {
            if (inflectionArray[s] < 0.0) {
                for (t = 0; t < eigenVecs.length; t++) {
                    eigenVecs[t][s] = -eigenVecs[t][s];
                }
            }
        }

        QAV.setState("centroidFactors", eigenVecs);
        QAV.setState("eigenValuesSorted", eigenValuesSorted);
        QAV.setState("eigenValuesAsPercents", eigenValuesAsPercents);
        QAV.setState("eigenValuesCumulPercentArray", eigenValuesCumulPercentArray);
        QAV.setState("eigenVecs", eigenVecs);

        var language = QAV.getState("language");
        var appendText = resources[language]["translation"]["8 Principal Components Extracted"];
        $("#rotationHistoryList").append('<li>' + appendText + '</button></li>');

        return [eigenValuesSorted, eigenValuesAsPercents, eigenValuesCumulPercentArray, eigenVecs];
    };

    PCA.drawExtractedFactorsTable = function () {
        var eigenVecs = QAV.getState("eigenVecs");
        var i, j, names, pcaHeaders, headersLength, pcaTableHeaders, pcaTargets, pcaTableTargets;

        names = QAV.getState("respondentNames");
        for (i = 0; i < eigenVecs.length; i++) {
            j = i + 1;
            eigenVecs[i].unshift(j, names[j]);
        }

        var language = QAV.getState("language");
        var facText = resources[language]["translation"]["Factor"];
        var respondText = resources[language]["translation"]["Respondent"];

        pcaHeaders = [
            {
                title: "Number"
            }, {
                title: respondText
            },
            {
                title: facText + " 1"
            },
            {
                title: facText + " 2"
            },
            {
                title: facText + " 3"
            },
            {
                title: facText + " 4"
            },
            {
                title: facText + " 5"
            },
            {
                title: facText + " 6"
            },
            {
                title: facText + " 7"
            },
            {
                title: facText + " 8"
            }
        ];

        pcaTargets = [2, 3, 4, 5, 6, 7, 8, 9];


        headersLength = QAV.pcaNumberFactorsExtracted + 2;
        pcaTableHeaders = pcaHeaders.slice(0, headersLength);
        pcaTableTargets = pcaTargets.slice(0, QAV.pcaNumberFactorsExtracted);

        QAV.pcaTableHeaders = pcaTableHeaders;
        QAV.pcaTableTargets = pcaTableTargets;

        var configObj = {};
        configObj.domElement = "#factorRotationTable1";
        configObj.fixed = false;
        configObj.data = eigenVecs;
        configObj.headers = pcaTableHeaders;
        configObj.colDefs = [{
                targets: [0, 1],
                className: 'dt-head-center dt-body-center dt-body-name'
        },
            {
                targets: pcaTableTargets,
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
        PCA.createFooter();

    };

    PCA.createFooter = function () {
        // create footer
        var footer, temp, temp2, temp3, tableArray, array, array2, array3, tr, th;
        var pcaFooterTableHeaders;

        var language = QAV.getState("language");
        var cumVarText = resources[language]["translation"]["Cum % Expln Var"];
        var varText = resources[language]["translation"]["% explained variance"];
        var eigenText = resources[language]["translation"]["Eigenvalues"];


        temp = QAV.getState("eigenValuesSorted");
        temp.unshift("", eigenText);
        array = temp.slice(0, 10);

        temp2 = QAV.getState("eigenValuesAsPercents");
        temp2.unshift("", varText);
        array2 = temp2.slice(0, 10);

        temp3 = QAV.getState("eigenValuesCumulPercentArray");
        temp3.unshift("", cumVarText);
        array3 = temp3.slice(0, 10);


        tableArray = [];
        tableArray.push(array, array2, array3);

        pcaFooterTableHeaders = QAV.getState("pcaTableHeaders");
        pcaFooterTableHeaders[0].title = "";
        pcaFooterTableHeaders[0].sTitle = "";
        pcaFooterTableHeaders[1].title = "";
        pcaFooterTableHeaders[1].sTitle = "";


        var configObj = {};
        configObj.domElement = "#factorRotationTable1Footer";
        configObj.fixed = false;
        configObj.data = tableArray;
        configObj.ordering = false;
        configObj.headers = pcaFooterTableHeaders;
        configObj.colDefs = [{
                targets: [0, 1],
                className: 'dt-head-center dt-body-center dt-body-name'
        },
            {
                targets: _.clone(QAV.pcaTableTargets),
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

}(window.PCA = window.PCA || {}, QAV));