//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global performance, window, QAV, $, document, resources, evenRound, UTIL, _ */

(function(CENTROID, QAV, undefined) {

    // todo - fix parseInt by adding second value
    // ******************************************************  controller
    // ***** controller for factor extraction **************************
    // *****************************************************************
    // todo - refactor onclick handler from html
    CENTROID.fireFactorExtraction = function() {
        var t0 = performance.now(),
            t1;
        var factors = document.getElementById("factorSelect");
        var selectedNumberFactors = factors.options[factors.selectedIndex].value;
        var loopLength = parseInt(selectedNumberFactors);
        var dataArray = QAV.getState("originalCorrelationValues");
        var factorMatrix = [];
        var factorDisplayNameArray = [];
        var d3ChartFactorNames = [];
        var factorName, d3FactorName, tempArray;
        var factorMatrix1, numberSorts, num, eigen;
        var eigenvalues = [];
        var explainedVariance = [];
        var respondentNames, totalVariance, table, language, facText;
        var isRotatedFactorsTableUpdate;
        QAV.setState("numberFactorsExtracted", loopLength);
        QAV.numFactorsExtracted = loopLength;
        var i, j, jLen, q, qLen;
        var iLen = loopLength + 1;
        var factorMatrixToFixed5, factorMatrixTransposed, varText, eigenText;
        var expVar2, rotFacStateArrayPrep1, rotFacStateArrayPrep2;

        // determine if is this is a rotation table re-draw or not
        table = $('#factorRotationTable2 tr').length; //
        if (table > 0) {
            isRotatedFactorsTableUpdate = "destroy";
        } else {
            isRotatedFactorsTableUpdate = "no";
        }

        language = QAV.getState("language");
        facText = resources[language].translation.Factor;

        // used for section 6 text labels
        for (i = 1; i < iLen; i++) {
            factorName = facText + " " + i;
            d3FactorName = facText + " " + i;
            // added for D3 because of unknown comma insertion in factorDispalyNameArray
            d3ChartFactorNames.push(d3FactorName);
            tempArray = CENTROID.calculateFactorLoadings(dataArray);
            factorMatrix.push(tempArray[0]);
            dataArray = tempArray[1];
            factorDisplayNameArray.push(factorName);
        }

        QAV.setState("factorLabels", factorDisplayNameArray);
        QAV.factorLabels = factorDisplayNameArray;

        // todo - separate model from controller
        factorMatrix1 = _.cloneDeep(factorMatrix, true);
        var centroidFactors = _.cloneDeep(factorMatrix);

        // send and save  to varimax rotation
        // todo - change this name to clarify for PCA
        QAV.setState("centroidFactors", centroidFactors);

        // todo change to analysis global object setting
        numberSorts = QAV.getState("qavTotalNumberSorts");

        // eigenvalue calculations
        for (j = 0, jLen = factorMatrix1.length; j < jLen; j++) {
            num = factorMatrix1[j];
            for (q = 0, qLen = num.length; q < qLen; q++) {
                num[q] = evenRound((num[q] * num[q]), 8);
            }
            eigen = evenRound((_.reduce(num, function(sum, num2) {
                return sum + num2;
            })), 5);

            eigenvalues.push(eigen);
            respondentNames = QAV.getState("qavRespondentNames");
            totalVariance = evenRound((100 * (eigen / numberSorts)), 0);
            explainedVariance.push(totalVariance);
        }

        // shift data to fixed 5
        factorMatrixToFixed5 = [];
        _(factorMatrix).forEach(function(arrayFrag) {
            var tableFormatFragment = _.map(arrayFrag, function(a) {
                return (evenRound(a, 5));
            });
            factorMatrixToFixed5.push(tableFormatFragment);
        }).value();


        factorMatrixToFixed5.unshift(respondentNames);

        factorMatrixTransposed = _.zip.apply(_, factorMatrixToFixed5);

        // var language = QAV.getState("language");
        varText = resources[language].translation["% explained variance"];
        eigenText = resources[language].translation.Eigenvalues;


        eigenvalues.unshift(eigenText);
        explainedVariance.unshift(varText);

        QAV.centroidEigenvalues = eigenvalues;

        factorMatrixTransposed.push(eigenvalues);
        factorMatrixTransposed.push(explainedVariance);
        factorDisplayNameArray.unshift("");
        factorMatrixTransposed.unshift(factorDisplayNameArray);


        expVar2 = factorMatrixTransposed.pop();
        QAV.setState("expVarCentroid", expVar2);

        // add to QAV - used in results download cumulative commonalities section
        QAV.setState("factorMatrixTransposed", factorMatrixTransposed);

        t1 = performance.now();

        console.log('%c Centroid factor extraction completed in  ' + (t1 - t0).toFixed(0) + ' milliseconds', 'background: #FF5733; color: white');


        // todo - clean up this array prep mess - refactor to function
        rotFacStateArrayPrep1 = _.cloneDeep(factorMatrixToFixed5);
        rotFacStateArrayPrep1.shift();
        rotFacStateArrayPrep2 = _.zip.apply(_, rotFacStateArrayPrep1);
        QAV.centroidFactors = rotFacStateArrayPrep2;
    };

    CENTROID.calculateFactorLoadings = function(dataArray) {
        var reflectedArray = checkPositiveManifold(dataArray);
        var reflectedArray1 = reflectedArray[0]; // reflected array
        var reflectedArrayColumnTotals = reflectedArray[1]; // column totals
        var reflectedRowCol = reflectedArray[2];
        var factorLoads1 = calculateFactor(reflectedArray1, reflectedArrayColumnTotals);
        var subtractArray = removeCorrelations(reflectedArray1, factorLoads1);
        var undoPositiveManifold = undoReflection(subtractArray, factorLoads1, reflectedRowCol);
        var factorSubtractedArray = undoPositiveManifold[0];
        var factorFactorScores = undoPositiveManifold[1];
        var results = [factorFactorScores, factorSubtractedArray];
        return results;
    }; // end function fireCalculateFactors

    CENTROID.drawExtractedFactorsTable = function() {
        var centroidFactors = QAV.getState("centroidFactors");
        var i, iLen, j, k, names;
        var temp1, loopLen, targets, slicedTargets, headers;
        var language, facText, respondText, appendText;
        var configObj = {};

        names = QAV.getState("respondentNames") || [];

        if (names[0] === "") {
            names.shift();
        }

        for (i = 0, iLen = centroidFactors.length; i < iLen; i++) {
            j = i + 1;
            centroidFactors[i].unshift(j, names[i]);
        }

        language = QAV.getState("language");
        facText = resources[language].translation.Factor;
        respondText = resources[language].translation.Respondent;
        appendText = resources[language].translation["Centroid Factors Extracted"];

        headers = [{
            title: "Num."
        }, {
            title: respondText
        }];

        // make headers dynamic
        loopLen = (centroidFactors[0].length) - 2;
        for (k = 0; k < loopLen; k++) {
            temp1 = {};
            temp1.title = facText + " " + (k + 1);
            headers.push(temp1);
        }

        // make targets dynamic
        targets = [2, 3, 4, 5, 6, 7, 8, 9];
        slicedTargets = targets.slice(0, loopLen);

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
                "createdCell": function(td, cellData) { // , rowData, row, col
                    if (cellData < 0) {
                        $(td).css('color', 'red');
                    }
                }
            }
        ];

        UTIL.drawDatatable(configObj);

        $("#rotationHistoryList").append('<li>' + QAV.numFactorsExtracted + appendText + '</li>');　

        CENTROID.createFooterTable(headers, slicedTargets);

    };

    CENTROID.createFooterTable = function(headers, slicedTargets) {
        var eigenValues, percentExplainedVariance, loopLen1, m, headers2;
        var data = [];
        var tempArray = [];
        var tempObj = {};
        var value = 0;
        var language = QAV.getState("language");
        var cumVarText = resources[language].translation["Cum % Expln Var"];
        var tempObj2 = tempObj;
        var configObj = {};

        eigenValues = QAV.getState("centroidEigenvalues");
        eigenValues.unshift("");
        percentExplainedVariance = QAV.getState("expVarCentroid");
        percentExplainedVariance.unshift("");
        loopLen1 = percentExplainedVariance.length;

        for (m = 2; m < loopLen1; m++) {
            value = value + percentExplainedVariance[m];
            tempArray.push(value);
        }

        tempArray.unshift("", cumVarText);

        data.push(eigenValues, percentExplainedVariance, tempArray);

        headers2 = headers.slice(2, headers.length);
        tempObj.title = "";

        headers2.unshift(tempObj, tempObj2);

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
                "createdCell": function(td, cellData) { // , rowData, row, col
                    if (cellData < 0) {
                        $(td).css('color', 'red');
                    }
                }
            }
        ];
        UTIL.drawDatatable(configObj);
    };

    // ***********************************************************************   model
    // ***** Calculate Factors *******************************************************
    // *******************************************************************************
    function calculateFactor(reflectedArray, columnTotals) {
        console.time("total calculation time ");

        var totalsSums, totalsSumsSqrt, factorLoad1, factorLoad1Sqrd, diffDiagonalEstimateandFactorLoad;
        var colTotalsAndMeanSum = [];
        var i, j;

        for (i = 0; i < columnTotals.length; i++) {
            colTotalsAndMeanSum.push(evenRound((columnTotals[i] + 0.5), 8)); // 0.5 as used in PQMethod
        }

        totalsSums = _.reduce(colTotalsAndMeanSum, function(sum, num) {
            return sum + num;
        });

        totalsSumsSqrt = evenRound((Math.sqrt(totalsSums)), 8);

        factorLoad1 = _.map(colTotalsAndMeanSum, function(num) {
            return evenRound((num / totalsSumsSqrt), 8);
        });

        factorLoad1Sqrd = _.map(factorLoad1, function(num) {
            return evenRound((num * num), 8);
        }); // comparison 2

        diffDiagonalEstimateandFactorLoad = [];
        for (j = 0; j < factorLoad1Sqrd.length; j++) {
            diffDiagonalEstimateandFactorLoad.push(Math.abs(evenRound((factorLoad1Sqrd[j] - 0.5), 8)));
        }

        var maxDiff = _.max(diffDiagonalEstimateandFactorLoad);

        function totalSumsFunction(newDiagonalEstimate) {
            var totalsSums = _.reduce(newDiagonalEstimate, function(sum, num) {
                return evenRound((sum + num), 8);
            });
            return totalsSums;
        }

        function factorLoad1Function(newDiagonalEstimate) {
            factorLoad1 = _.map(newDiagonalEstimate, function(num) {
                return evenRound((num / totalsSumsSqrt), 8);
            }); // Math.round10
            return factorLoad1;
        }

        function factorLoad1SqrdFunction(factorLoad1) {
            factorLoad1Sqrd = _.map(factorLoad1, function(num) {
                return evenRound((num * num), 8);
            });
            return factorLoad1Sqrd;
        }

        if (maxDiff > 0.001) {

            do {

                var previousFactorLoadEstimate = factorLoad1Sqrd;

                var newDiagonalEstimate = [];
                for (var k = 0; k < columnTotals.length; k++) {
                    newDiagonalEstimate.push(evenRound((columnTotals[k] + previousFactorLoadEstimate[k]), 8));
                }

                totalsSums = totalSumsFunction(newDiagonalEstimate);

                totalsSumsSqrt = evenRound((Math.sqrt(totalsSums)), 8);

                factorLoad1 = factorLoad1Function(newDiagonalEstimate);

                factorLoad1Sqrd = factorLoad1SqrdFunction(factorLoad1);

                diffDiagonalEstimateandFactorLoad = [];
                for (var m = 0; m < previousFactorLoadEstimate.length; m++) {
                    diffDiagonalEstimateandFactorLoad.push(Math.abs(evenRound((previousFactorLoadEstimate[m] - factorLoad1Sqrd[m]), 8)));
                }

                maxDiff = _.max(diffDiagonalEstimateandFactorLoad);

            } while (maxDiff > 0.001);

            console.timeEnd("total calculation time ");
            return factorLoad1;
        } else {

            return factorLoad1; // todo - straighten out this code
        }
    }

    // **************************************************************   model
    // ***** remove factor  correlations************************************
    // *********************************************************************
    function removeCorrelations(array, factorLoadings) {
        var factorCorrelations = [];

        function helper1(factorLoadings) {
            _(factorLoadings).forEach(function(num) {
                var temp = num * factorLoadings[i];
                newArrayFrag.push(evenRound((temp), 8));
            }).value();

            return newArrayFrag;
        }

        for (var i = 0; i < factorLoadings.length; i++) {
            var newArrayFrag = [];

            newArrayFrag = helper1(factorLoadings);

            factorCorrelations.push(newArrayFrag);
        }

        var residualCorrelationsPrep = [];
        for (var j = 0; j < factorLoadings.length; j++) {
            var subtractionFrag = [];
            for (var k = 0; k < factorLoadings.length; k++) {
                subtractionFrag.push(evenRound((array[j][k] - factorCorrelations[j][k]), 8));
            }
            residualCorrelationsPrep.push(subtractionFrag);
        }

        for (var p = 0; p < factorLoadings.length; p++) {
            var m = p;
            residualCorrelationsPrep[p][m] = 1;
        }

        return residualCorrelationsPrep;

    }

    // *****************************************************************   model
    // *****  undo Array Reflection  *******************************************
    // *************************************************************************
    function undoReflection(subtractedArray, factorLoadings, reflectedRowCol) {

        _(reflectedRowCol).forEach(function(rowcolnumber) {
            for (var i = 0; i < subtractedArray.length; i++) {
                subtractedArray[i][rowcolnumber] = subtractedArray[i][rowcolnumber] * -1;
            }
            for (var j = 0; j < subtractedArray[rowcolnumber].length; j++) {
                subtractedArray[rowcolnumber][j] = subtractedArray[rowcolnumber][j] * -1;
            }

            factorLoadings[rowcolnumber] = factorLoadings[rowcolnumber] * -1;

        }).value();

        var factorResults = [subtractedArray, factorLoadings];

        return factorResults;
    }

    // ***************************************************************   model
    // ***** check for positive manifold *************************************
    // ***********************************************************************

    // todo - check this function - seems a bit wanky  - is pos shift check needed

    function checkPositiveManifold(dataArray) {
        var columnSums = calculateColumnSums(dataArray);
        var findMinColumnSum = calculateMinValueAndIndex(columnSums);
        var minColumnSum = findMinColumnSum[0];
        var reflectedArrayData;

        if (minColumnSum < 0) {
            reflectedArrayData = calculatePositiveManifold(dataArray, minColumnSum);
            return reflectedArrayData;
        } else {
            reflectedArrayData = [dataArray, columnSums];
            return reflectedArrayData;
        }
    }

    // ***************************************************************   model
    // ***** calculate positive manifold ************************************
    // **********************************************************************
    function calculatePositiveManifold(manifoldArray, minColumnSum) {
        // todo limit to 200-300 iterations? - see qmethod source code
        // todo - check this also - is it a bit wanky?
        var reflectedRowCol = [];
        var columnSums, findMinColumnSum, minIndex, positiveManifoldData;
        var m, p;
        var mLoopLen = manifoldArray.length;

        while (minColumnSum < 0) {
            columnSums = calculateColumnSums(manifoldArray);
            findMinColumnSum = calculateMinValueAndIndex(columnSums);
            minColumnSum = findMinColumnSum[0];
            minIndex = findMinColumnSum[1];
            if (minColumnSum < 0) {
                for (m = 0; m < mLoopLen; m++) {
                    manifoldArray[m][minIndex] = manifoldArray[m][minIndex] * -1;
                }
                for (p = 0; p < manifoldArray[minIndex].length; p++) { // single row
                    manifoldArray[minIndex][p] = manifoldArray[minIndex][p] * -1; // do something
                }
                reflectedRowCol.push(minIndex);
            } else {
                positiveManifoldData = [manifoldArray, columnSums, reflectedRowCol];
                return positiveManifoldData;
            }
        }
    }

    // ******************************************************************   model
    // ***** Calculate Column Sums **********************************************
    // **************************************************************************
    function calculateColumnSums(sumArray) {

        var sum, sum1;
        var columnTotals = [];
        var j, i;
        var loopLen = sumArray.length;

        for (j = 0; j < loopLen; j++) {
            sum = 0;
            for (i = 0; i < loopLen; i++) {
                sum += sumArray[i][j];
            }
            sum = sum - 1;
            sum1 = evenRound((sum), 8);
            columnTotals.push(sum1);
        }
        return columnTotals;
    }

    // **************************************************************   model
    // ***** calculate Minimum Value and Array Index Value ******************
    // **********************************************************************
    function calculateMinValueAndIndex(columnTotals) {
        var minIndex = 0;
        var min = columnTotals[0];
        var k, minValues;
        var loopLen = columnTotals.length;

        for (k = 1; k < loopLen; k++) {
            if (columnTotals[k] < min) {
                minIndex = k;
                min = columnTotals[k];
            }
        }
        minValues = [min, minIndex];
        return minValues;
    }

    // **********************************************************   model
    // ***** sum columns ************************************************
    // ******************************************************************
    // returns column total minus 1

    // todo - check to see if this is used anywhere now
    //    function getDataColumnTotals(dataArray) {
    //        var columnTotals = [];
    //        var sum;
    //        var sum1;
    //        var j, i;
    //        var loopLen = dataArray.length;
    //
    //        for (j = 0; j < loopLen; j++) {
    //            sum = 0;
    //            for (i = 0; i < loopLen; i++) {
    //                sum += dataArray[i][j];
    //            }
    //            sum = sum - 1;
    //            sum1 = evenRound((sum), 8);
    //            columnTotals.push(sum1);
    //        }
    //        return columnTotals;
    //    }
}(window.CENTROID = window.CENTROID || {}, QAV));
