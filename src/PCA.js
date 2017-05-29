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
    'use strict';

    PCA.doPrincipalComponents = function (X) {
        var numberOfSorts, temp4, temp5, pcaFactorsToExtractArray, numberFactorsExtracted;
        var numberofPrincipalComps, m;
        var factorLabels = [];
        var eigenVecs, eigenValuesSorted, eigenValuesAsPercents, eigenValuesCumulPercentArray;
        var dataArray, dataArray2;

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
        //  QAV.pcaNumberFactorsExtracted = numberFactorsExtracted;
        QAV.setState("pcaNumberFactorsExtracted", numberFactorsExtracted);
        UTIL.addFactorSelectCheckboxesRotation(numberFactorsExtracted);

        // labels according to factors extacted (above)
        for (m = 0; m < numberFactorsExtracted; m++) {
            factorLabels.push("Factor " + (m + 1));
        }
        QAV.setState("factorLabels", factorLabels);

        var isOnline = UTIL.checkIfOnline();

        // use web worker if available and not running from local file
        if (window.Worker && isOnline) {
            $("#factorExtractionSpinnerText").css('visibility', 'visible');
            $("#factorExtractionSpinnerDiv").addClass('calcSpinner');
            var workerMessageArray = [numberOfSorts, numberofPrincipalComps, X];
            var myWorker = new Worker('wrkrs/workerPCA.js');
            myWorker.postMessage(workerMessageArray);
            myWorker.onmessage = function (e) {
                eigenVecs = e.data[0];
                eigenValuesSorted = e.data[1];
                eigenValuesAsPercents = e.data[2];
                eigenValuesCumulPercentArray = e.data[3];

                QAV.setState("centroidFactors", eigenVecs);
                QAV.setState("eigenValuesSorted", eigenValuesSorted);
                QAV.setState("eigenValuesAsPercents", eigenValuesAsPercents);
                QAV.setState("eigenValuesCumulPercentArray", eigenValuesCumulPercentArray);
                QAV.setState("eigenVecs", eigenVecs);

                var language = QAV.getState("language");
                var appendText = resources[language].translation["8 Principal Components Extracted"];
                $("#rotationHistoryList").append('<li>' + appendText + '</button></li>');

                // hide spinner and change button display state
                $("#factorExtractionSpinnerText").css('visibility', 'hidden');
                $("#factorExtractionSpinnerDiv").removeClass('calcSpinner');
                VIEW.changePcaExtractionButtonDisplay();

                // display components
                PCA.drawExtractedFactorsTable();

                // get data for scree plot
                dataArray2 = eigenValuesSorted;
                dataArray = dataArray2.slice(0, 8);

                UTIL.drawScreePlot(dataArray);

                $("#section4 > input").show();

                return [eigenValuesSorted, eigenValuesAsPercents, eigenValuesCumulPercentArray, eigenVecs];
            };
        } else {
            // if web workers not available
            var svd, eigens;
            var getEigenCumulPercentArray, doEigenVecsCalcs;
            var inflectionArray;

            // // svd = matrix of all principle components as column vectors          
            svd = PCA.calcSvd(X);

            // eigens = eigenvalues for data X 
            eigens = PCA.calcEigens(X);

            // sort eigenValues from numeric
            eigenValuesSorted = PCA.sortEigenValues(eigens.lambda.x);

            // convert to percents and push to array
            getEigenCumulPercentArray = PCA.calcEigenCumulPercentArray(eigenValuesSorted, numberOfSorts);

            eigenValuesAsPercents = getEigenCumulPercentArray[0];
            eigenValuesCumulPercentArray = getEigenCumulPercentArray[1];

            doEigenVecsCalcs = PCA.calcEigenVectors(numberOfSorts, numberofPrincipalComps, eigenValuesSorted, svd);

            eigenVecs = doEigenVecsCalcs[0];
            inflectionArray = doEigenVecsCalcs[1];

            eigenVecs = PCA.inflectPrincipalComponents(eigenVecs, inflectionArray);

            QAV.setState("centroidFactors", eigenVecs);
            QAV.setState("eigenValuesSorted", eigenValuesSorted);
            QAV.setState("eigenValuesAsPercents", eigenValuesAsPercents);
            QAV.setState("eigenValuesCumulPercentArray", eigenValuesCumulPercentArray);
            QAV.setState("eigenVecs", eigenVecs);

            var language = QAV.getState("language");
            var appendText = resources[language].translation["8 Principal Components Extracted"];
            $("#rotationHistoryList").append('<li>' + appendText + '</button></li>');

            // hide spinner and change button display state
            VIEW.changePcaExtractionButtonDisplay();
            PCA.drawExtractedFactorsTable();

            // get data for scree plot
            dataArray2 = eigenValuesSorted;
            dataArray = dataArray2.slice(0, 8);

            UTIL.drawScreePlot(dataArray);

            $("#section4 > input").show();

            return [eigenValuesSorted, eigenValuesAsPercents, eigenValuesCumulPercentArray, eigenVecs];
        }
    }; // END OF DO PCA FUNCTION



    PCA.inflectPrincipalComponents = function (eigenVecs, inflectionArray) {
        // check and inflect components if necessary
        for (var s = 0; s < eigenVecs[0].length; s++) {
            if (inflectionArray[s] < 0.0) {
                for (var t = 0; t < eigenVecs.length; t++) {
                    eigenVecs[t][s] = -eigenVecs[t][s];
                }
            }
        }
        return eigenVecs;
    };

    PCA.calcEigenVectors = function (numberOfSorts, numberofPrincipalComps, eigenValuesSorted, svd) {
        var inflectionArray = [];
        var temp1, critInflectionValue, temp3, temp4;
        // setup empty array
        var eigenVecs = [];
        for (var p = 0; p < numberOfSorts; p++) {
            eigenVecs.push([]);
        }
        // loop through each component    
        for (var i = 0, iLen = numberofPrincipalComps; i < iLen; i++) {
            temp1 = Math.sqrt(eigenValuesSorted[i]);
            critInflectionValue = 0;

            // loop through each QSort to get loading and also calc CRIT
            for (var j = 0, jLen = svd.length; j < jLen; j++) {
                temp3 = evenRound((svd[j][i] * temp1), 8);
                eigenVecs[j][i] = temp3;
                // set up data for influection test
                temp4 = evenRound((temp3 * Math.abs(temp3)), 8);
                critInflectionValue = critInflectionValue + temp4;
            }
            inflectionArray.push(evenRound(critInflectionValue, 8));
        }
        return [eigenVecs, inflectionArray];
    };


    PCA.calcEigenCumulPercentArray = function (eigenValuesSorted, numberOfSorts) {
        var percentNumber = 100 / numberOfSorts;
        var eigenValuesAsPercents = [];
        var eigenValuesPercent;
        var eigenValuesCumulPercentArray = [];
        var eigenValueCumulPercentAccum = 0;

        for (var k = 0, kLen = eigenValuesSorted.length; k < kLen; k++) {
            eigenValuesSorted[k] = evenRound((eigenValuesSorted[k]), 8);
            eigenValuesPercent = evenRound((eigenValuesSorted[k] * percentNumber), 0);
            eigenValuesAsPercents.push(eigenValuesPercent);
            eigenValueCumulPercentAccum = eigenValueCumulPercentAccum + eigenValuesPercent;
            eigenValuesCumulPercentArray.push(eigenValueCumulPercentAccum);
        }
        return [eigenValuesAsPercents, eigenValuesCumulPercentArray];
    };


    PCA.sortEigenValues = function (values) {
        // sort eigenValues from numeric
        // eigenValuesSorted = eigens.lambda.x;
        values.sort(function (a, b) {
            return (b - a);
        });
        return values;
    };


    PCA.calcSvd = function (X) {
        // svd = matrix of all principle components as column vectors          
        var m, sigma, svd;
        m = X.length;
        sigma = numeric.div(numeric.dot(numeric.transpose(X), X), m);
        svd = numeric.svd(sigma).U;
        return svd;
    };

    PCA.calcEigens = function (X) {
        // eigens = eigenvalues for data X 
        var eigens = numeric.eig(X);
        return eigens;
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
        var facText = resources[language].translation.Factor;
        var respondText = resources[language].translation.Respondent;

        pcaHeaders = [{
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
            }
        ];

        UTIL.drawDatatable(configObj);
        PCA.createFooter();

    };

    PCA.createFooter = function () {
        // create footer
        var footer, temp, temp2, temp3, tableArray, array, array2, array3, tr, th;
        var pcaFooterTableHeaders;

        var language = QAV.getState("language");
        var cumVarText = resources[language].translation["Cum % Expln Var"];
        var varText = resources[language].translation["% explained variance"];
        var eigenText = resources[language].translation.Eigenvalues;


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
            }
        ];

        UTIL.drawDatatable(configObj);

    };

}(window.PCA = window.PCA || {}, QAV));