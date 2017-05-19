// Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.

// JSlint declarations
/* global resources, d3, VIEW, d3_save_svg, CORR, alasql, window, QAV, $, document, evenRound, UTIL, _  */

(function(OUTPUT, QAV, undefined) {
    'use strict';
    //     DOWNLOAD FUNCTIONS

    // todo - bug fix escape codes for "'" in statement listing
    OUTPUT.generateOutput = function pushProjectHistoryToOutputArray() {
        var sheetNames = [];
        var output = [];

        var language = QAV.getState("language");
        var appendText1 = resources[language].translation["Project Overview"];
        var appendText2 = resources[language].translation.Undo;
        var appendText3 = resources[language].translation["Analysis Completed on"];
        var appendText4 = resources[language].translation["Total Number of Statements"];
        var appendText5 = resources[language].translation["Q-sort Triangle Shape"];
        var appendText6 = resources[language].translation["Total Number of Q-sorts"];
        var appendText7 = resources[language].translation["Analysis Process"];
        var appendText8 = resources[language].translation["Project name"];
        var versionNum = resources[language].translation.versionNumber;

        var newSheet = {
            sheetid: appendText1,
            headers: false
        };
        sheetNames.push(newSheet);

        // no ala download data
        var sheetNamesXlsx = [];
        sheetNamesXlsx.push(appendText1);
        var dataXlsx = [];

        var settings = [];
        var spacer = ["", ""];

        var projectName = QAV.getState("qavProjectName");
        var projectNameArray = [appendText8, projectName];
        settings.push(spacer, projectNameArray, spacer);
        dataXlsx.push(spacer, projectNameArray, spacer);

        var totalStatements = QAV.getState("qavOriginalSortSize");
        var totalNumberStatementsArray = [appendText4, totalStatements];
        settings.push(totalNumberStatementsArray, spacer);
        dataXlsx.push(totalNumberStatementsArray, spacer);

        var sortTriangleShape = QAV.getState("qavSortTriangleShape");
        var sortTriangleShape2 = sortTriangleShape.join();
        var sortTriangleShapeArray = [appendText5, sortTriangleShape2];
        settings.push(sortTriangleShapeArray, spacer);
        dataXlsx.push(sortTriangleShapeArray, spacer);

        var totalSorts = QAV.getState("qavTotalNumberSorts");
        var totalSortsArray = [appendText6, totalSorts];
        settings.push(totalSortsArray, spacer);
        dataXlsx.push(totalSortsArray, spacer);

        var list = document.getElementById("rotationHistoryList");
        var items = list.childNodes;
        var temp,
            temp1,
            temp2;

        settings.push([appendText7, ""]);
        dataXlsx.push([appendText7, ""]);

        // pull list items and push to array for output
        for (var i = 0; i < items.length; i++) {
            var listArray1 = [];
            temp = i + 1;
            temp1 = items[i].textContent;
            temp2 = temp1.replace(appendText2, "");
            listArray1.push(temp, temp2);
            settings.push(listArray1);
            dataXlsx.push(listArray1);
        }

        var outputLanguage = QAV.getState("language");
        settings.push(spacer, ["Language", outputLanguage]);
        dataXlsx.push(spacer, ["Language", outputLanguage]);

        var timeCompleted = UTIL.currentDate1() + " at " + UTIL.currentTime1();
        settings.push(spacer, [
            appendText3 + timeCompleted,
            ""
        ]);

        dataXlsx.push(spacer, [
            appendText3 + timeCompleted,
            ""
        ]);

        settings.push(spacer, ["Version Number: ", versionNum]);
        dataXlsx.push(spacer, ["Version Number: ", versionNum]);

        var colSizes = [
            [{
                wch: 40
            }, {
                wch: 70
            }]
        ];

        var outputData = [];
        outputData.push(dataXlsx);

        output.push(settings);
        pushStatementsToOutputArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes);
    };

    function pushStatementsToOutputArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes) {
        var statements = QAV.getState("qavCurrentStatements");
        var language = QAV.getState("language");
        var appendText1 = resources[language].translation.Statements;
        var appendText2 = resources[language].translation["Statement Number"];

        var newSheet = {
            sheetid: appendText1,
            header: true
        };
        sheetNamesXlsx.push(appendText1);

        var maxStatementLength = 0;
        var arrayOfStatements = [];
        arrayOfStatements.push([
            "", ""
        ], [appendText2, appendText1]);
        for (var ii = 0, iiLen = statements.length; ii < iiLen; ii++) {
            var tempArray1 = [];
            tempArray1.push((ii + 1), statements[ii]);
            arrayOfStatements.push(tempArray1);
            var stringLength = statements[ii].length;
            if (stringLength > maxStatementLength) {
                maxStatementLength = stringLength;
            }
        }
        outputData.push(arrayOfStatements);

        var columns = [{
            wch: 10
        }, {
            wch: maxStatementLength
        }];
        colSizes.push(columns);
        QAV.setState("maxStatementLength", maxStatementLength);

        pushSortsToOutputArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes);
    }

    function pushSortsToOutputArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes) {

        var language = QAV.getState("language");
        var appendText2 = resources[language].translation.Respondent;
        var appendText3 = resources[language].translation.Mean;
        var appendText4 = resources[language].translation["Standard Deviation"];
        var appendText6 = resources[language].translation["Q-sorts"];

        sheetNamesXlsx.push(appendText6);

        var sortsAsNumbers = QAV.getState("sortsAsNumbers");
        var respondentNames = QAV.getState("qavRespondentNames");
        var dataArray = [];

        // set up column widths
        var columns = [{
            wch: 15
        }];
        for (var ii = 0, iiLen = sortsAsNumbers[0].length + 2; ii < iiLen; ii++) {
            columns.push({
                wch: 5
            });
        }
        colSizes.push(columns);

        var stddev,
            statementSort;
        // create sheet header
        var headerArray = [appendText2];
        for (var jj = 0, jjLen = sortsAsNumbers[0].length; jj < jjLen; jj++) {
            statementSort = "S" + (jj + 1);
            headerArray.push(statementSort);
        }
        headerArray.push(appendText3, appendText4);
        dataArray.push([
            "", ""
        ], [
            appendText6, ""
        ], [
            "", ""
        ], headerArray);

        // push in sorts, means, and standard devs
        for (var kk = 0, kkLen = sortsAsNumbers.length; kk < kkLen; kk++) {
            var average3 = evenRound((UTIL.average(sortsAsNumbers[kk])), 3);
            stddev = evenRound((UTIL.standardDeviation(sortsAsNumbers[kk])), 3);
            sortsAsNumbers[kk].unshift(respondentNames[kk]);
            sortsAsNumbers[kk].push(average3, stddev);
            dataArray.push(sortsAsNumbers[kk]);
        }
        outputData.push(dataArray);

        QAV.setState("freeDistributionArray", dataArray);

        pushCorrelationArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes);
    }

    function pushCorrelationArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes) {

        var language = QAV.getState("language");
        var appendText1 = resources[language].translation["Correlation matrix"];
        var appendText2 = resources[language].translation["between Q-sorts"];

        sheetNamesXlsx.push(appendText1);

        var correlationTableArrayFormatted3 = QAV.getState("correlationTableArrayFormatted");

        // get max respondent name length
        var respondentNameMaxLength = 0;
        for (var i = 0, iLen = correlationTableArrayFormatted3[0].length; i < iLen; i++) {
            var temp1 = correlationTableArrayFormatted3[0][i].length;
            if (temp1 > respondentNameMaxLength) {
                respondentNameMaxLength = temp1;
            }
        }
        if (respondentNameMaxLength < 5) {
            respondentNameMaxLength = 5;
        }

        // set up column spacing
        var columns = [];
        for (var j = 0, jLen = (correlationTableArrayFormatted3[0].length + 1); j < jLen; j++) {
            columns.push({
                wch: respondentNameMaxLength
            });
        }
        colSizes.push(columns);

        correlationTableArrayFormatted3.unshift([
            "", ""
        ], [appendText1 + appendText2], ["", ""]);
        outputData.push(correlationTableArrayFormatted3);

        pushUnrotatedFactorsTableToOutputArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes);
    }

    function pushUnrotatedFactorsTableToOutputArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes) {
        var factorMatrixTransposed, i, j, k, m, temp, tempA, temp1, temp2, temp2A;
        var newSheet, expVar, centroidsArray, tempObj, respondentNames, typeOfFactor, numFactorsExtracted;
        var language = QAV.getState("language");
        var appendText1 = resources[language].translation["Unrotated Factor Matrix"];
        var appendText2 = resources[language].translation.Eigenvalues;
        var appendText3 = resources[language].translation.Factor;
        var appendText4 = resources[language].translation.Respondent;

        respondentNames = QAV.respondentNames;
        factorMatrixTransposed = QAV.getState("eigenVecs");
        temp = QAV.getState("eigenValuesSorted");
        temp2 = QAV.getState("eigenValuesAsPercents");
        temp1 = QAV.getState("factorLabels");
        expVar = QAV.getState("expVarCentroid");
        numFactorsExtracted = QAV.getState("numFactorsExtracted");
        typeOfFactor = QAV.getState("typeOfFactor");

        sheetNamesXlsx.push(appendText1);

        // set excel column widths
        var columns = [{
            wch: 20
        }];
        for (var iii = 0, iiiLen = temp1.length; iii < iiLen; iii++) {
            columns.push({
                wch: 8
            });
        }
        colSizes.push(columns);

        // add labels to Unrotated factor data
        if (typeOfFactor === "PCA") {

            temp2 = temp2.slice(0, numFactorsExtracted);
            temp = temp.slice(0, numFactorsExtracted);

            // conform PCA to legacy centroid data structure
            for (m = 0; m < (respondentNames.length - 1); m++) {
                factorMatrixTransposed[m].unshift(respondentNames[m + 1]);
            }
            temp1.unshift("");
            factorMatrixTransposed.unshift(temp1);

            // add eigenvals to match data structure
            temp.unshift(appendText2);
            factorMatrixTransposed.push([], temp);
            temp2.unshift("");
            factorMatrixTransposed.push(temp2);
        } else {
            factorMatrixTransposed = QAV.getState("factorMatrixTransposed");
            factorMatrixTransposed.push(expVar);
        }

        // change after deleting alasql code
        var unrotatedFactors = _.cloneDeep(factorMatrixTransposed);
        unrotatedFactors[0][0] = (appendText4);

        for (var ii = 1, iiLen = unrotatedFactors.length - 1; ii < iiLen; ii++) {
            for (var jj = 1, jjLen = unrotatedFactors[ii].length; jj < jjLen; jj++) {
                unrotatedFactors[ii][jj] = evenRound(unrotatedFactors[ii][jj], 4);
            }
        }
        unrotatedFactors.unshift([
            "", ""
        ], [appendText1], ["", ""]);
        outputData.push(unrotatedFactors);

        pushCumulativeCommunalitiesMaxtrixToOutputArray(sheetNames, output, factorMatrixTransposed, outputData, sheetNamesXlsx, colSizes);
    }

    function pushCumulativeCommunalitiesMaxtrixToOutputArray(sheetNames, output, factorMatrixTransposed, outputData, sheetNamesXlsx, colSizes) {
        var newSheet, cumulCommMatrix9, explnVarRow, responderHeadersRow;
        var i, j, k, temp1, temp2, respondentName;
        var language = QAV.getState("language");
        var appendText1 = resources[language].translation["Cumul Comm Matrix"];
        var appendText2 = resources[language].translation["cumulative % explained variance"];
        var appendText4 = resources[language].translation.Respondent;
        var appendText5 = resources[language].translation["Cumulative Communalities Matrix"];

        sheetNamesXlsx.push(appendText1);

        // isolate data
        cumulCommMatrix9 = _.cloneDeep(factorMatrixTransposed);

        // set excel column widths
        var columns = [{
            wch: 30
        }];
        for (var ii = 0, iiLen = cumulCommMatrix9[0].length; ii < iiLen; ii++) {
            columns.push({
                wch: 8
            });
        }
        colSizes.push(columns);

        explnVarRow = cumulCommMatrix9.pop();
        // get rid of eigenvalue row
        cumulCommMatrix9.pop();
        responderHeadersRow = cumulCommMatrix9.shift();
        // add respondent names and do rounding
        for (i = 0; i < cumulCommMatrix9.length; i++) {
            respondentName = cumulCommMatrix9[i].shift();
            for (j = 0; j < cumulCommMatrix9[i].length; j++) {
                if (j === 0) {
                    temp1 = cumulCommMatrix9[i][j];
                    cumulCommMatrix9[i][j] = evenRound((temp1 * temp1), 4);
                } else {
                    temp1 = cumulCommMatrix9[i][j];
                    cumulCommMatrix9[i][j] = evenRound(((temp1 * temp1) + cumulCommMatrix9[i][(j - 1)]), 4);
                }
            }
            cumulCommMatrix9[i].unshift(respondentName);
        }
        cumulCommMatrix9.unshift(responderHeadersRow);
        // add cumulative explained variance
        explnVarRow.shift();
        for (k = 0; k < explnVarRow.length; k++) {
            if (k === 0) {} else {
                temp2 = explnVarRow[k];
                explnVarRow[k] = explnVarRow[k] + explnVarRow[(k - 1)];
            }
        }
        explnVarRow.unshift(appendText2);
        cumulCommMatrix9.push(explnVarRow);
        output.push(cumulCommMatrix9);
        // format for excel
        cumulCommMatrix9[0][0] = appendText4;
        cumulCommMatrix9.unshift([
            "", ""
        ], [appendText5], ["", ""]);
        outputData.push(cumulCommMatrix9);

        pushRotatedFactorsArrayToOutputArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes);
    }

    //  AKA factor loadings table
    function pushRotatedFactorsArrayToOutputArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes) {
        var results = QAV.getState("results");
        var language = QAV.getState("language");
        var appendText1 = resources[language].translation.Loadings;
        var appendText2 = resources[language].translation.Flagged;
        var appendText3 = resources[language].translation["Factor Matrix with Defining Sorts Flagged"];

        sheetNamesXlsx.push(appendText1);

        var formattedResults = [];
        var jLoopLen = results[0].length;
        var i, j;
        var iLoopLen = results.length;
        var temp;
        var tempArray = [];

        var headerRowFromCurrentTable = $('#factorRotationTable2 thead tr')[0];
        $.each(headerRowFromCurrentTable.cells, function(i, v) {
            var temp5 = v.textContent;
            tempArray.push(temp5);
        });
        formattedResults.push(tempArray);

        // resort the array
        results.sort(function(a, b) {
            return a[0] - b[0];
        });

        for (i = 0; i < iLoopLen; i++) {
            for (j = 0; j < jLoopLen; j++) {
                temp = results[i][j];
                if (temp === "true") {
                    results[i][j] = appendText2;
                } else if (temp === "false") {
                    results[i][j] = "";
                } else if (j !== 0 && !isNaN(temp)) {
                    results[i][j] = evenRound((temp), 4);
                }
            }
            formattedResults.push(results[i]);
        }
        var expVar = QAV.getState("expVar");
        formattedResults.push(expVar);

        // set excel column widths
        var columns = [{
            wch: 20
        }];
        for (var ii = 0, iiLen = formattedResults[0].length; ii < iiLen; ii++) {
            columns.push({
                wch: 8
            });
        }
        colSizes.push(columns);

        output.push(formattedResults);

        formattedResults.unshift([
            "", ""
        ], [appendText3], ["", ""]);
        outputData.push(formattedResults);
        pushFreeDistributionDataToOutputArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes);
    }

    function pushFreeDistributionDataToOutputArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes) {
        var language = QAV.getState("language");
        var appendText1 = resources[language].translation["Free Dist"];
        var appendText2 = resources[language].translation.Respondent;
        var appendText3 = resources[language].translation.Mean;
        var appendText4 = resources[language].translation["Standard Deviation"];
        var appendText5 = resources[language].translation["Free Distribution Data Results"];
        var qavCurrentStatements = QAV.getState("qavCurrentStatements");

        var newSheet = {
            sheetid: appendText1,
            headers: false
        };
        sheetNames.push(newSheet);
        sheetNamesXlsx.push(appendText1);

        var columns = [{
            wch: 20
        }, {
            wch: 10
        }, {
            wch: 10
        }];
        colSizes.push(columns);

        var freeDistributionArray = QAV.getState("freeDistributionArray");

        freeDistributionArray = freeDistributionArray.slice(3);
        var freeDistributionData = [];
        var cutLength = freeDistributionArray[0].length - 3;
        for (var i = 0, iLen = freeDistributionArray.length; i < iLen; i++) {
            var tempCut = freeDistributionArray[i].splice(1, cutLength);
            freeDistributionData.push(freeDistributionArray[i]);
        }
        freeDistributionData.unshift(["", ""], [appendText5], ["", ""]);
        outputData.push(freeDistributionData);
        pushFactorsToOutputArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes);
    }

    function pushFactorsToOutputArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes) {

        var language = QAV.getState("language");
        var appendText1 = resources[language].translation["Sorts Weight"];
        var appendText2 = resources[language].translation["Sorts Corr"];
        var appendText3 = resources[language].translation["Statement Number"];
        var appendText4 = resources[language].translation.Statement;
        var appendText5 = resources[language].translation["Z-score"];
        var appendText6 = resources[language].translation["Sort Values"];

        var analysisOutput2 = QAV.getState("analysisOutput");
        var analysisOutput = _.cloneDeep(analysisOutput2);
        var sigSortsArray = QAV.getState("sigSortsArray");
        var sortsAsNumbers = QAV.getState("sortsAsNumbers");
        var qavRespondentNames = QAV.getState("qavRespondentNames");
        var correlationTableArrayFormatted2 = QAV.getState("correlationTableArrayFormatted");
        var userSelectedFactors = QAV.getState("userSelectedFactors");
        var sortWeights = QAV.getState("sortWeights");

        // to hold data in QAV until later insertion into output results - to match PQMethod order
        var factorWeightFactorArrayHolder = [];
        var miniCorrelationArrayHolder = [];
        var synFactorArray1Holder = [];
        var synFactorArray1 = [];
        var sheetNamesHolder1 = [];
        var sheetNamesHolder2 = [];
        var sheetNamesHolder3 = [];

        for (var i = 0; i < analysisOutput.length; i++) {
            var temp1 = {};
            var temp1a = {};
            var temp1b = {};

            temp1a.sheetid = sigSortsArray[i]["Factor Number"] + appendText1;
            temp1a.header = true;
            sheetNamesHolder1.push(temp1a);

            temp1b.sheetid = sigSortsArray[i]["Factor Number"] + appendText2;
            temp1b.header = true;
            sheetNamesHolder2.push(temp1b);

            temp1.sheetid = sigSortsArray[i]["Factor Number"];
            temp1.header = true;
            sheetNamesHolder3.push(temp1);
        }

        QAV.setState("sheetNamesHolder1", sheetNamesHolder1);
        QAV.setState("sheetNamesHolder2", sheetNamesHolder2);
        QAV.setState("sheetNamesHolder3", sheetNamesHolder3);

        // pull raw sorts for factor tables
        var rawSorts = [];
        for (var p = 0; p < sigSortsArray.length; p++) {
            var tempArray = [];
            for (var r = 0; r < sigSortsArray[p].SigSorts.length; r++) {
                var sigSort = sigSortsArray[p].SigSorts[r];
                var rawSortIndex = qavRespondentNames.indexOf(sigSort);
                var rawSortValues = sortsAsNumbers[rawSortIndex];
                tempArray.push(rawSortValues);
            }
            rawSorts.push(tempArray);
        }

        // for each factor check get a sigSort (if another remains)
        // get the raw sort for that specific sigSort
        // read that sigSorts raw sort data into testObj
        var compositeFactorMasterArray = [];
        var matchCount = [];
        //  FOR EACH FACTOR LOOP
        for (var j = 0; j < analysisOutput.length; j++) {

            // FACTOR WEIGHTS TABLES STARTS FROM HERE
            var factorWeightFactorArray = [
                ["Q-Sort", "Weight"]
            ];
            var factorWeightName = userSelectedFactors[j];
            for (var w = 0; w < sortWeights.length; w++) {
                var factorWeightTempArray = [];
                if (sortWeights[w][0] === factorWeightName) {
                    factorWeightTempArray.push(sortWeights[w][1], sortWeights[w][3]);
                    factorWeightFactorArray.push(factorWeightTempArray);
                }
            }
            // output.push(factorWeightFactorArray);
            factorWeightFactorArrayHolder.push(factorWeightFactorArray);


            // FACTOR SCORE MINI CORRELATION TABLES STARTS FROM HERE

            // loop through sigSortsArray to get this factor's sig Sorts
            var miniSortsID = userSelectedFactors[j];
            var miniCorrelationFactorsArray = [];
            for (var t = 0; t < sigSortsArray.length; t++) {
                if (sigSortsArray[t]["Factor Number"] === miniSortsID) {
                    miniCorrelationFactorsArray.push(sigSortsArray[t].SigSorts);
                }
            }

            // pull correlations from table
            var miniCorrelationArray = [];
            var miniCorrelationHeaderArray = ["Q-Sort"];
            var miniCorrelationHeaderIndex = correlationTableArrayFormatted2[0];

            // loop through all sig Sorts
            for (var t3 = 0; t3 < miniCorrelationFactorsArray[0].length; t3++) {

                miniCorrelationHeaderArray.push(miniCorrelationFactorsArray[0][t3]);

                // loop through correlation table array
                for (var t1 = 0; t1 < correlationTableArrayFormatted2.length; t1++) {

                    var tempArrayT1 = [];

                    // find row for  the sig sorts, then push data
                    if (correlationTableArrayFormatted2[t1][0] === miniCorrelationFactorsArray[0][t3]) {

                        // push name into left column
                        tempArrayT1.push(miniCorrelationFactorsArray[0][t3]);

                        // cycle through row to find push data for all sigSorts
                        for (var t2 = 0; t2 < miniCorrelationFactorsArray[0].length; t2++) {
                            var index = miniCorrelationHeaderIndex.indexOf(miniCorrelationFactorsArray[0][t2]);
                            tempArrayT1.push(correlationTableArrayFormatted2[t1][index]);
                        }
                        miniCorrelationArray.push(tempArrayT1);
                    }

                }
            }
            miniCorrelationArray.unshift(miniCorrelationHeaderArray);

            // output.push(miniCorrelationArray);
            miniCorrelationArrayHolder.push(miniCorrelationArray);

            // SYNTHETIC FACTOR OUTPUT STARTS FROM HERE
            // convert arrays to object
            var synFactorArray = [];
            var matchCountArray = [];
            var compositeFactorArray = [];

            // simul calc two md arrays - one for tables, one for match counts
            for (var m = 0, mLen = analysisOutput[0].length; m < mLen; m++) {
                // initialize and empty temp objs and arrays
                var tempObj = {};
                var tempObj5 = {};
                var matchSortValue = [];
                var matchingCounter = 0;
                var compositeFactorTempArray = [];

                tempObj5.indexer = analysisOutput[j][m].statement;
                tempObj5.matchSortValue = analysisOutput[j][m].sortValue;
                tempObj5.zScore = analysisOutput[j][m].zScore;
                var testValue = analysisOutput[j][m].sortValue;

                tempObj[appendText3] = analysisOutput[j][m].statement;
                tempObj[appendText4] = analysisOutput[j][m].sortStatement;
                tempObj[appendText5] = analysisOutput[j][m].zScore;
                tempObj[appendText6] = analysisOutput[j][m].sortValue;

                // set up new output array
                compositeFactorTempArray.push(analysisOutput[j][m].statement, analysisOutput[j][m].sortStatement, analysisOutput[j][m].zScore, analysisOutput[j][m].sortValue);

                for (var s = 0, sLen = rawSorts[j].length; s < sLen; s++) {
                    tempObj["Raw Sort " + sigSortsArray[j].SigSorts[s]] = rawSorts[j][s][m];
                    // add to new output array
                    compositeFactorTempArray.push(rawSorts[j][s][m]);
                    // matchSortValue.push(rawSorts[j][s][m]);
                    if (testValue === rawSorts[j][s][m]) {
                        matchingCounter++;
                    }
                } // pushing in raw sort vals
                tempObj5.matchingCounts = matchingCounter;
                tempObj5.matchingCountsPercent = parseInt((matchingCounter / sLen * 100), 10);
                // tempObj5.matchSortValue = matchSortValue;
                matchCountArray.push(tempObj5);
                synFactorArray.push(tempObj);
                // add to new output array
                compositeFactorArray.push(compositeFactorTempArray);
            } // pushing in q-sort loadings
            // add to new output Master array
            compositeFactorMasterArray.push(compositeFactorArray);
            matchCount.push(matchCountArray); // push in factor arrays
            synFactorArray1 = synFactorArray.slice(0);

            synFactorArray1.sort(function(a, b) {
                if (b[appendText5] === a[appendText5]) {
                    return b[appendText3] - a[appendText3];
                } else {
                    return b[appendText5] - a[appendText5];
                }
            });

            // output.push(synFactorArray1);
            synFactorArray1Holder.push(synFactorArray1);
        }

        QAV.setState("factorWeightFactorArrayHolder", factorWeightFactorArrayHolder);
        QAV.setState("miniCorrelationArrayHolder", miniCorrelationArrayHolder);
        QAV.setState("synFactorArray1Holder", synFactorArray1Holder);
        QAV.setState("matchCount", matchCount);
        QAV.setState("compositeFactorMasterArray", compositeFactorMasterArray);

        pushFactorScoreComparisonRanksTableToOutputArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes);
    }

    function pushFactorScoreComparisonRanksTableToOutputArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes) {
        var language = QAV.getState("language");
        var appendText1 = resources[language].translation["Factor Score Ranks"];
        var appendText2 = resources[language].translation.Factors;
        var appendText3 = resources[language].translation["Statement Number"];
        var appendText4 = resources[language].translation.Statement;
        var appendText5 = resources[language].translation["Z-score"];
        var appendText6 = resources[language].translation["Factor Scores with Corresponding Ranks"];
        var appendText7 = resources[language].translation.Rank;
        var appendText8 = resources[language].translation["Sort Values"];

        var synFactorArray1 = QAV.getState("synFactorArray1Holder");
        var userSelectedFactors = QAV.getState("userSelectedFactors");
        var tempArray1,
            rankValue,
            rankingTempArray;
        var statementRankingArray = [];

        // var newSheet = {
        //     sheetid: appendText1,
        //     headers: false
        // };
        // sheetNames.push(newSheet);
        sheetNamesXlsx.push(appendText1);

        var maxStatementLength = QAV.getState("maxStatementLength");
        var columns = [{
            wch: 8
        }, {
            wch: maxStatementLength
        }, {
            wch: 8
        }];
        for (var ss = 0, ssLen = (userSelectedFactors.length * 2); ss < ssLen; ss++) {
            columns.push({
                wch: 7
            });
        }
        colSizes.push(columns);


        // add factor ranks and round at 2 digits
        for (var j = 0, jLen = synFactorArray1.length; j < jLen; j++) {
            for (var jj = 0, jjLen = synFactorArray1[j].length; jj < jjLen; jj++) {
                synFactorArray1[j][jj][appendText5] = evenRound((synFactorArray1[j][jj][appendText5]), 2);
            }
            synFactorArray1[j]
                .sort(function(a, b) {
                    if (b[appendText5] === a[appendText5]) {
                        return a[appendText3] - b[appendText3];
                    } else {
                        return b[appendText5] - a[appendText5];
                    }
                });

            for (var i = 0, iLen = synFactorArray1[j].length; i < iLen; i++) {
                rankValue = (i + 1);
                synFactorArray1[j][i].Rank = rankValue;
            }

            synFactorArray1[j]
                .sort(function(a, b) {
                    return a[appendText3] - b[appendText3];
                });
        }

        // re-sort for use below?
        // synFactorArray1[0]
        //     .sort(function(a, b) {
        //         return a[appendText3] - b[appendText3];
        //     });

        var compositeFactorMasterArray = QAV.getState("compositeFactorMasterArray");
        var factorScoreRanksArray = [];

        // sort by statement number and push num and statement and num into ranks array
        compositeFactorMasterArray[0].sort(function(a, b) {
            if (a[0] === b[0]) {
                return 0;
            } else {
                return (a[0] < b[0]) ?
                    -1 :
                    1;
            }
        });
        for (var ww = 0, wwLen = compositeFactorMasterArray[0].length; ww < wwLen; ww++) {
            var tempArraymm1 = [];
            tempArraymm1.push(compositeFactorMasterArray[0][ww][0]);
            tempArraymm1.push(compositeFactorMasterArray[0][ww][1]);
            tempArraymm1.push(compositeFactorMasterArray[0][ww][0]);
            factorScoreRanksArray.push(tempArraymm1);
        }

        // cycle through user selected factors to get zScore and rank
        for (var kk = 0, kkLen = compositeFactorMasterArray.length; kk < kkLen; kk++) {
            // sort by statement number
            compositeFactorMasterArray[kk]
                .sort(function(a, b) {
                    if (a[0] === b[0]) {
                        return 0;
                    } else {
                        return (a[0] < b[0]) ?
                            -1 :
                            1;
                    }
                });
            // insert zScore
            for (var ii = 0, iiLen = compositeFactorMasterArray[kk].length; ii < iiLen; ii++) {
                var tempZscore = evenRound(compositeFactorMasterArray[kk][ii][2], 2);
                factorScoreRanksArray[ii].push(tempZscore);
            }
            // re-sort by latest pushed zScore
            // var placeSetter = factorScoreRanksArray[0].length - 1;
            var placeSetter = 2;
            compositeFactorMasterArray[kk].sort(function(a, b) {
                if (a[placeSetter] === b[placeSetter]) {
                    return 0;
                } else {
                    return (b[placeSetter] < a[placeSetter]) ?
                        -1 :
                        1;
                }
            });

            for (var rr = 0, rrLen = compositeFactorMasterArray[kk].length; rr < rrLen; rr++) {
                var RankValue2 = (rr + 1);
                compositeFactorMasterArray[kk][rr].push(RankValue2);
            }

            // re-sort to statement number
            compositeFactorMasterArray[kk]
                .sort(function(a, b) {
                    if (a[0] === b[0]) {
                        return 0;
                    } else {
                        return (a[0] < b[0]) ?
                            -1 :
                            1;
                    }
                });

            // get and push ranking numbers
            for (var pp = 0, ppLen = compositeFactorMasterArray[kk].length; pp < ppLen; pp++) {
                var RankValue3 = compositeFactorMasterArray[kk][pp].pop();
                factorScoreRanksArray[pp].push(RankValue3);
            }
            // placeSetter = placeSetter + 2;
        }

        var spacer = ["", ""];
        var tempArrayHeader = ["", appendText6];
        var tempArrayHeader2 = [appendText3, appendText4, appendText3];
        var tempSubHeader = ["", "", ""];
        for (var yy = 0, yyLen = userSelectedFactors.length; yy < yyLen; yy++) {
            tempArrayHeader2.push(userSelectedFactors[yy], userSelectedFactors[yy]);
            tempSubHeader.push("Z-score", "Rank");
        }

        factorScoreRanksArray.unshift(spacer, tempArrayHeader, spacer, tempArrayHeader2, tempSubHeader);
        outputData.push(factorScoreRanksArray);

        // setup the array of ranked statements
        var factorScoreComparisonArray = [];
        for (var k = 0, kLen = synFactorArray1[0].length; k < kLen; k++) {
            rankingTempArray = [];
            tempArray1 = {};
            tempArray1.Num1 = synFactorArray1[0][k][appendText3];
            tempArray1.Statement = synFactorArray1[0][k][appendText4];
            tempArray1.Num2 = synFactorArray1[0][k][appendText3];
            tempArray1.Zscore1 = synFactorArray1[0][k][appendText5];
            var rank1 = synFactorArray1[0][k][appendText7];
            tempArray1.Rank1 = rank1;
            var tempSortValue = synFactorArray1[0][k][appendText8];
            rankingTempArray.push(tempSortValue);
            for (var m = 1, mLen = synFactorArray1.length; m < mLen; m++) {
                var mm = m + 1;
                tempArray1["Zscore" + mm] = synFactorArray1[m][k][appendText5];
                tempArray1["Rank" + mm] = synFactorArray1[m][k][appendText7];
                var tempSortValue2 = synFactorArray1[m][k][appendText8];
                rankingTempArray.push(tempSortValue2);
            }
            factorScoreComparisonArray.push(tempArray1);
            statementRankingArray.push(rankingTempArray);
        }

        QAV.setState("statementRankingArray", statementRankingArray);

        pushFactorScoreCorrelationsToOutputArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes);
    }

    function pushFactorScoreCorrelationsToOutputArray(sheetNames, output, outputData, sheetNamesXlsx, colSizes) {

        var language = QAV.getState("language");
        var appendText1 = resources[language].translation["Factor score correlations"];

        sheetNamesXlsx.push(appendText1);

        var analysisOutput = QAV.getState("analysisOutput");
        var userSelectedFactors = QAV.getState("userSelectedFactors");
        var analysisOutput2 = _.cloneDeep(analysisOutput);
        var factorScoresCorrelationArray2 = [];
        var temp1, temp2, tempArray;

        var columns = [{
            wch: 7
        }];
        for (var ss = 0, ssLen = (userSelectedFactors.length); ss < ssLen; ss++) {
            columns.push({
                wch: 7
            });
        }
        colSizes.push(columns);

        // i loop through selected factors, j loop through sorts to get new array of z-scores
        // todo - added after other calculations, so now repeats with factor download sheets - dry out
        for (var i = 0; i < userSelectedFactors.length; i++) {
            temp2 = userSelectedFactors[i];
            tempArray = [];
            for (var j = 0; j < analysisOutput2[i].length; j++) {
                temp1 = analysisOutput2[i][j].zScore;
                tempArray.push(temp1);
            }
            factorScoresCorrelationArray2.push(tempArray);
        }

        // todo - converting to integer gives lots variation with PQmethod - use evenRound?
        var factorScoresCorrelationArray = [];
        for (var q = 0; q < factorScoresCorrelationArray2.length; q++) {
            var temp11 = _.map(factorScoresCorrelationArray2[q], evenRoundFunc);
            factorScoresCorrelationArray.push(temp11);
        }

        function evenRoundFunc(n) {
            var temp1 = evenRound((n), 5);
            return temp1;
        }

        var pullX;
        var correlationTableArrayFragment = [];
        var correlationTableArray = [];
        for (var k = 0; k < factorScoresCorrelationArray.length; k++) {
            pullX = factorScoresCorrelationArray[k];
            correlationTableArrayFragment = factorScoresCorrelationsHelper(factorScoresCorrelationArray, pullX);
            correlationTableArray.push(correlationTableArrayFragment);
            correlationTableArrayFragment = [];
        }

        function factorScoresCorrelationsHelper(factorScoresCorrelationArray, pullX) {

            var correlationHolder,
                correlationHolder2;
            var correlationTableArrayFragment = [];

            _(factorScoresCorrelationArray).forEach(function(element) {
                correlationHolder2 = CORR.getPqmethodCorrelation(pullX, element);
                correlationHolder = evenRound((correlationHolder2[0]), 4);
                correlationTableArrayFragment.push(correlationHolder);
            }).value();
            return correlationTableArrayFragment;
        }

        // add factor names to first column
        for (var m = 0; m < correlationTableArray.length; m++) {
            var temp8 = userSelectedFactors[m];
            correlationTableArray[m].unshift(temp8);
        }

        var tempArray3 = [];
        tempArray3.push("");
        for (var p = 0; p < userSelectedFactors.length; p++) {
            var temp9 = userSelectedFactors[p];
            tempArray3.push(temp9);
        }
        correlationTableArray.unshift(tempArray3);

        QAV.setState("correlationTableArrayHolder", correlationTableArray);
        output.push(correlationTableArray);

        //var correlationTableArray2 = _.cloneDeep(correlationTableArray);
        correlationTableArray.unshift([
            "", ""
        ], [appendText1], ["", ""]);

        outputData.push(correlationTableArray);

        // pushFactorsToOutputArray(sheetNames, output);
        insertFactorsIntoOutputArray(sheetNames, output, analysisOutput, outputData, sheetNamesXlsx, colSizes);
    }

    function insertFactorsIntoOutputArray(sheetNames, output, analysisOutput, outputData, sheetNamesXlsx, colSizes) {

        var language = QAV.getState("language");
        var appendText1 = resources[language].translation["Sorts Weight"];
        var appendText2 = resources[language].translation["Sorts Corr"];
        var appendText3 = resources[language].translation["Statement Number"];
        var appendText4 = resources[language].translation.Statement;
        var appendText5 = resources[language].translation["Z-score"];
        // var appendText6 = resources[language].translation["Sort Values"];
        var appendText7 = resources[language].translation["Raw Sort"];
        var appendText8 = resources[language].translation["Sort Values"];
        var appendText9 = resources[language].translation["Sorts Correlations"];
        var appendText10 = resources[language].translation["Factor Scores for "];

        var sheetNamesHolder1 = QAV.getState("sheetNamesHolder1");
        var sheetNamesHolder2 = QAV.getState("sheetNamesHolder2");
        var sheetNamesHolder3 = QAV.getState("sheetNamesHolder3");

        var factorWeightFactorArray = QAV.getState("factorWeightFactorArrayHolder");
        var miniCorrelationArray = QAV.getState("miniCorrelationArrayHolder");
        var synFactorArray1 = QAV.getState("synFactorArray1Holder");
        var compositeFactorMasterArray = QAV.getState("compositeFactorMasterArray");
        var userSelectedFactors = QAV.getState("userSelectedFactors");
        var sigSortsArray = QAV.getState("sigSortsArray");
        var maxStatementLength = QAV.getState("maxStatementLength");
        var spacer = ["", ""];

        for (var ii = 0, iiLen = userSelectedFactors.length; ii < iiLen; ii++) {

            var sheetHeaderArrayPartial = [appendText3, appendText4, appendText5, appendText8];

            // set weights name
            sheetNamesXlsx.push((sheetNamesHolder1[ii].sheetid));

            // set weights columns
            var columns = [{
                wch: 8
            }, {
                wch: 8
            }];
            colSizes.push(columns);

            // set weights sheet
            factorWeightFactorArray[ii].unshift(spacer, [userSelectedFactors[ii], appendText1], spacer);
            outputData.push(factorWeightFactorArray[ii]);

            // set sorts corr name
            sheetNamesXlsx.push((sheetNamesHolder2[ii].sheetid));

            // set sorts corr cols
            var columns2 = [{
                wch: 8
            }];
            for (var ss = 0, ssLen = (userSelectedFactors.length); ss < ssLen; ss++) {
                columns2.push({
                    wch: 8
                });
            }
            colSizes.push(columns2);

            // set sorts corr sheet
            miniCorrelationArray[ii].unshift(spacer, [userSelectedFactors[ii], appendText9], spacer);
            outputData.push(miniCorrelationArray[ii]);

            // set factor sheet name
            sheetNamesXlsx.push((sheetNamesHolder3[ii].sheetid));

            // set factor sheet cols
            var columns3 = [{
                wch: 8
            }, {
                wch: maxStatementLength
            }, {
                wch: 9
            }, {
                wch: 12
            }];
            for (var tt = 0, ttLen = sigSortsArray[ii].SigSorts.length; tt < ttLen; tt++) {
                columns3.push({
                    wch: 12
                });
            }
            colSizes.push(columns3);

            // set factor sheets
            // re-sort to zScore
            compositeFactorMasterArray[ii].sort(function(a, b) {
                if (a[2] === b[2]) {
                    return (a[0] < b[0]) ?
                        -1 :
                        1;
                } else {
                    return (b[2] < a[2]) ?
                        -1 :
                        1;
                }
            });

            for (var jj = 0, jjLen = sigSortsArray[ii].SigSorts.length; jj < jjLen; jj++) {
                sheetHeaderArrayPartial.push(appendText7 + " " + sigSortsArray[ii].SigSorts[jj]);
            }
            compositeFactorMasterArray[ii].unshift(spacer, ["", appendText10 + " " + userSelectedFactors[ii]], spacer, sheetHeaderArrayPartial);
            outputData.push(compositeFactorMasterArray[ii]);
        }

        for (var i = 0, iLen = factorWeightFactorArray.length; i < iLen; i++) {
            sheetNames.push(sheetNamesHolder1[i]);
            sheetNames.push(sheetNamesHolder2[i]);
            sheetNames.push(sheetNamesHolder3[i]);
            output.push(factorWeightFactorArray[i]);
            output.push(miniCorrelationArray[i]);
            output.push(synFactorArray1[i]);
        }

        pushFactorPowerSetDiffsToOutputArray(sheetNames, output, analysisOutput, outputData, sheetNamesXlsx, colSizes);
    }

    function pushFactorPowerSetDiffsToOutputArray(sheetNames, output, analysisOutput, outputData, sheetNamesXlsx, colSizes) {
        var language = QAV.getState("language");
        var chartText1 = resources[language].translation.Diff;
        var chartText2 = resources[language].translation.Difference;
        var chartText3 = resources[language].translation["Statement Number"];
        var chartText4 = resources[language].translation.Statement;
        var chartText5 = resources[language].translation["Descending Array of Differences Between"];
        var chartText6 = resources[language].translation.and;
        var oneFactor, anotherFactor;
        var maxStatementLength = QAV.getState("maxStatementLength");
        var spacer = ["", ""];

        var factorPairs = [];
        for (var i = 0; i < analysisOutput.length - 1; i++) {
            for (var j = i; j < analysisOutput.length - 1; j++) {
                factorPairs.push([
                    analysisOutput[i],
                    analysisOutput[j + 1]
                ]);
            }
        }
        var diffArraySorted;
        var namesComboArray = [];
        var sheetHeader1Array = [];

        for (var k = 0; k < factorPairs.length; k++) {
            var namesComboArrayFrag = [];
            var sheetHeader1 = [chartText3, chartText4];
            oneFactor = factorPairs[k][0][0].factor;
            anotherFactor = factorPairs[k][1][0].factor;
            namesComboArrayFrag.push(oneFactor, anotherFactor);
            var temp1 = {};
            temp1.sheetid = chartText1 + oneFactor + " " + anotherFactor;
            temp1.header = true;
            sheetNames.push(temp1);
            namesComboArray.push(namesComboArrayFrag);
            sheetNamesXlsx.push(chartText1 + oneFactor + " " + anotherFactor);

            sheetHeader1.push(oneFactor, anotherFactor, chartText2);
            sheetHeader1Array.push(sheetHeader1);

            var columns = [{
                wch: 8
            }, {
                wch: maxStatementLength
            }, {
                wch: 8
            }, {
                wch: 8
            }, {
                wch: 10
            }];
            colSizes.push(columns);
        }

        // push each pair to output
        for (var m = 0; m < factorPairs.length; m++) {
            var diffArray = [];
            var diffArrayXlsx = [];
            for (var p = 0; p < factorPairs[m][0].length; p++) {
                var tempArray = [];

                var temp1a = factorPairs[m][0][p].statement;
                var temp1b = factorPairs[m][0][p].sortStatement;
                var temp1c = factorPairs[m][0][p].zScore;
                var temp1d = factorPairs[m][1][p].zScore;
                var factorsDiff = evenRound(((factorPairs[m][0][p].zScore) - (factorPairs[m][1][p].zScore)), 3);
                tempArray.push(temp1a, temp1b, temp1c, temp1d, factorsDiff);
                diffArrayXlsx.push(tempArray);
            }

            diffArrayXlsx.sort(function(a, b) {
                if (a[4] === b[4]) {
                    return 0;
                } else {
                    return (b[4] < a[4]) ?
                        -1 :
                        1;
                }
            });
            diffArrayXlsx.unshift(spacer, [chartText5 + " " + namesComboArray[m][0] + " " + chartText6 + " " + namesComboArray[m][1]], spacer, sheetHeader1Array[m]);
            outputData.push(diffArrayXlsx);
        }

        pushConsensusStatementsToOutput(sheetNames, output, analysisOutput, outputData, sheetNamesXlsx, colSizes);
    }

    function pushConsensusStatementsToOutput(sheetNames, output, analysisOutput, outputData, sheetNamesXlsx, colSizes) {

        var language = QAV.getState("language");
        var chartText1 = resources[language].translation["Z-Score Variance"];
        var chartText2 = resources[language].translation["Consensus-Disagreement"];
        var chartText3 = resources[language].translation["Statement Number"];
        var chartText4 = resources[language].translation.Statement;
        var chartText5 = resources[language].translation["Z-Score Variance"];
        var chartText6 = resources[language].translation["Factor Q-sort Values for Statements sorted by Consensus vs. Disagreement"];

        var sigFactorNumbersArray = QAV.getState("sigFactorNumbersArray");
        var userSelectedFactors = QAV.getState("userSelectedFactors");
        var maxStatementLength = QAV.getState("maxStatementLength");
        var spacer = ["", ""];

        sigFactorNumbersArray.sort();

        var tableHeader = [chartText3, chartText4];
        var tableHeader2 = tableHeader.concat(userSelectedFactors);
        tableHeader2.push(chartText5);

        sheetNamesXlsx.push(chartText2);

        // set factor sheet cols
        var columns = [{
            wch: 8
        }, {
            wch: maxStatementLength
        }];
        for (var tt = 0, ttLen = userSelectedFactors.length; tt < ttLen; tt++) {
            columns.push({
                wch: 8
            });
        }
        columns.push({
            wch: 15
        });
        colSizes.push(columns);

        var consensusDisagreeArray = [];
        var zScoreArrayForStatements = [];
        for (var i = 0; i < analysisOutput[0].length; i++) {
            var tempArray1a = [];
            tempArray1a.push(analysisOutput[0][i].statement, analysisOutput[0][i].sortStatement);
            var tempArray = [];
            for (var j = 0; j < analysisOutput.length; j++) {
                var temp1 = sigFactorNumbersArray[j];
                tempArray1a.push(analysisOutput[j][i].sortValue);
                tempArray.push(analysisOutput[j][i].zScore);
            }
            var zScoreVariance = evenRound((UTIL.variance(tempArray)), 3);
            tempArray1a.push(zScoreVariance);
            consensusDisagreeArray.push(tempArray1a);
        }

        var locator = userSelectedFactors.length + 2;
        consensusDisagreeArray.sort(function(a, b) {
            if (a[locator] === b[locator]) {
                return 0;
            } else {
                return (a[locator] < b[locator]) ?
                    -1 :
                    1;
            }
        });
        consensusDisagreeArray.unshift(spacer, [chartText6], spacer, tableHeader2);
        outputData.push(consensusDisagreeArray);

        pushFactorCharacteristicsToOutput(sheetNames, output, analysisOutput, sigFactorNumbersArray, outputData, sheetNamesXlsx, colSizes);
    }

    function pushFactorCharacteristicsToOutput(sheetNames, output, analysisOutput, sigFactorNumbersArray, outputData, sheetNamesXlsx, colSizes) {

        var language = QAV.getState("language");
        var chartText1 = resources[language].translation["Factor Characteristics"];
        var chartText2 = resources[language].translation["Factor Number"];
        var chartText3 = resources[language].translation["No. of Defining Variables"];
        var chartText4 = resources[language].translation["Avg. Rel. Coef."];
        var chartText5 = resources[language].translation["Composite Reliability"];
        var chartText6 = resources[language].translation["S.E. of Factor Z-scores"];
        var userSelectedFactors = QAV.getState("userSelectedFactors");
        var sigSortsArray = QAV.getState("sigSortsArray");
        var spacer = ["", ""];

        sheetNamesXlsx.push(chartText1);

        // set factor sheet col widths
        var columns = [{
            wch: 20
        }];
        for (var tt = 0, ttLen = userSelectedFactors.length; tt < ttLen; tt++) {
            columns.push({
                wch: 8
            });
        }
        colSizes.push(columns);

        var factorCharacteristicsSheetArray = [];

        // line 1 - factor labels
        var line1Array = [""];
        var line1Arrayb = line1Array.concat(userSelectedFactors);
        factorCharacteristicsSheetArray.push(line1Arrayb);


        // line 2 - No. of Defining Variables
        var line2Array = [chartText3];
        for (var j = 0; j < sigSortsArray.length; j++) {
            line2Array.push(sigSortsArray[j].SigSorts.length);
        }
        factorCharacteristicsSheetArray.push(line2Array);

        // line 3 - Avg. Rel. Coef.
        // todo - !important - change this for unrestrained unforced sort patterns?
        var line3Array = [chartText4];
        for (var k = 0; k < sigSortsArray.length; k++) {
            line3Array.push(0.800);
        }
        factorCharacteristicsSheetArray.push(line3Array);

        // line 4 - Composite Reliability
        var line4Array = [chartText5];
        var nSorts,
            compositeRel;
        var composRelArray = [];
        for (var m = 0; m < sigSortsArray.length; m++) {
            nSorts = sigSortsArray[m].SigSorts.length;
            compositeRel = evenRound(((nSorts * 0.800) / (1 + ((nSorts - 1) * 0.800))), 3);
            composRelArray.push(compositeRel);
            line4Array.push(compositeRel);
        }
        factorCharacteristicsSheetArray.push(line4Array);

        // line 5 - S.E. of Factor Z-scores
        var line5Array = [chartText6];
        var stndErrorArray = [];
        for (var p = 0; p < sigSortsArray.length; p++) {
            var stndError = evenRound(Math.sqrt(Math.abs(1.0 - composRelArray[p])), 3);
            stndErrorArray.push(stndError);
            line5Array.push(stndError);
        }
        factorCharacteristicsSheetArray.push(line5Array);
        factorCharacteristicsSheetArray.unshift(spacer, [chartText1], spacer);

        outputData.push(factorCharacteristicsSheetArray);

        pushStandardErrorsDifferencesToOutput(sheetNames, output, stndErrorArray, analysisOutput, sigFactorNumbersArray, outputData, sheetNamesXlsx, colSizes);
    }

    function pushStandardErrorsDifferencesToOutput(sheetNames, output, stndErrorArray, analysisOutput, sigFactorNumbersArray, outputData, sheetNamesXlsx, colSizes) {

        var language = QAV.getState("language");
        var chartText1 = resources[language].translation["Standard Errors for Diffs"];
        var chartText2 = resources[language].translation["Standard Errors for Differences in Factor Z-scores"];
        var sigSortsArray = QAV.getState("sigSortsArray");
        var userSelectedFactors = QAV.getState("userSelectedFactors");
        var spacer = ["", ""];

        sheetNamesXlsx.push(chartText1);

        // set factor sheet col widths
        var columns = [{
            wch: 8
        }];
        for (var tt = 0, ttLen = userSelectedFactors.length; tt < ttLen; tt++) {
            columns.push({
                wch: 8
            });
        }
        colSizes.push(columns);

        var standardErrorDiffSheetArray = [];

        // line 1
        var line1Array = [""];
        var line1Arrayb = line1Array.concat(userSelectedFactors);
        standardErrorDiffSheetArray.push(line1Arrayb);

        var stndErrorDiffArray = [];
        var stndErrorDiffDataArray = [];
        var stndErrorDiffDataDistingArray = [];

        var stndError1, stndError2, stndError3;

        // lines 2 to end
        for (var j = 0; j < sigSortsArray.length; j++) {
            var tempArray1 = [];
            tempArray1.push(sigSortsArray[j]["Factor Number"]);

            for (var k = 0; k < sigSortsArray.length; k++) {
                var stndErrorDiffDataArrayTemp1 = [];
                var tempArray2 = [];
                stndErrorDiffDataArrayTemp1.push("Factor " + sigSortsArray[j]["Factor Number"]);
                tempArray2.push(sigSortsArray[j]["Factor Number"]);
                stndErrorDiffDataArrayTemp1.push("Factor " + sigSortsArray[k]["Factor Number"]);
                tempArray2.push(sigSortsArray[k]["Factor Number"]);
                stndError1 = stndErrorArray[j];
                stndError2 = stndErrorArray[k];
                stndError3 = evenRound((Math.sqrt((stndError1 * stndError1) + (stndError2 * stndError2))), 3);
                stndErrorDiffDataArrayTemp1.push(stndError3);
                tempArray2.push(stndError3);
                tempArray1.push(stndError3);
                stndErrorDiffDataArray.push(stndErrorDiffDataArrayTemp1);
                stndErrorDiffDataDistingArray.push(tempArray2);
            }
            standardErrorDiffSheetArray.push(tempArray1);
        }
        standardErrorDiffSheetArray.unshift(spacer, [chartText2], spacer);
        outputData.push(standardErrorDiffSheetArray);

        pushDistinguishingStatementsToOutput(sheetNames, output, sigSortsArray, analysisOutput, stndErrorDiffDataArray, stndErrorDiffDataDistingArray, sigFactorNumbersArray, outputData, sheetNamesXlsx, colSizes);
    }

    function pushDistinguishingStatementsToOutput(sheetNames, output, sigSortsArray, analysisOutput, stndErrorDiffDataArray, stndErrorDiffDataDistingArray, sigFactorNumbersArray, outputData, sheetNamesXlsx, colSizes) {

        var language = QAV.getState("language");
        var chartText1 = resources[language].translation["Dist State"];
        var chartText2 = resources[language].translation["Consensus Statements"];
        var maxStatementLength = QAV.getState("maxStatementLength");
        var userSelectedFactors = QAV.getState("userSelectedFactors");

        // property to count loop iterations for assigning significance * in disting factor output
        formatDistingArrayForDownload.calledTimes = 0;

        // loop to set up worksheet names and push into output array
        for (var i = 0; i < sigSortsArray.length; i++) {

            sheetNamesXlsx.push(chartText1 + sigSortsArray[i]["Factor Number"]);

            // set up col widths for excel output - todo - change maxStatementLength?
            var columns = [{
                wch: 8
            }, {
                wch: maxStatementLength
            }, {
                wch: 8
            }];
            for (var tt = 0, ttLen = userSelectedFactors.length; tt < ttLen; tt++) {
                columns.push({
                    wch: 8
                }, {
                    wch: 8
                }, {
                    wch: 8
                });
            }
            colSizes.push(columns);
        }

        // starting calcs for distinguishing factors
        var sedComparisonValue, j, k, m;
        var consensusStatementComparisonArray05 = [];
        var consensusStatementComparisonArray01 = [];
        var distStatementDataVizArray = [];
        var masterDistingStatementNumbersArray05 = [];
        var masterDistingStatementNumbersArray01 = [];

        // looping through all factors to determine if distinguishing!
        // todo - create if statement for case of only two sig factors-bypass processing of second c 4894
        for (j = 0; j < sigSortsArray.length; j++) {
            // factor j
            // looping through all statements in each j factor
            var distingStatementsTransferArray05 = [];
            var distingStatementsTransferArray01 = [];
            var consensusStatementTransferArray05 = [];
            var consensusStatementTransferArray01 = [];

            for (k = 0; k < analysisOutput[0].length; k++) {
                // looping through each statement's other factor zScores to compare
                // also grabbing the appropriate SED value for each comparison
                var sig05 = false;
                var sig05Array = [];
                var sig01 = false;
                var sig01Array = [];
                var newStatementNum;

                for (m = 0; m < sigSortsArray.length; m++) {
                    // factor m
                    // check to avoid comparison with self
                    if (analysisOutput[j][k].factor === analysisOutput[m][k].factor) {} else {
                        // loop through SED array to find comparison value
                        sedComparisonValue = null;

                        for (var p = 0; p < stndErrorDiffDataDistingArray.length; p++) {
                            var searchVal1 = stndErrorDiffDataDistingArray[p][0];
                            var searchVal2 = stndErrorDiffDataDistingArray[p][1];
                            var iteratorJShift = sigFactorNumbersArray[j];
                            var iteratorMShift = sigFactorNumbersArray[m];

                            if (searchVal1 === iteratorJShift && searchVal2 === iteratorMShift) {
                                sedComparisonValue = stndErrorDiffDataDistingArray[p][2];
                            }
                        }

                        if (Math.abs(analysisOutput[j][k].zScore - analysisOutput[m][k].zScore) >= (sedComparisonValue * 1.96)) {
                            analysisOutput[j][k].zScore = evenRound((analysisOutput[j][k].zScore), 2);
                            sig05 = true;
                            sig05Array.push(sig05);
                        }

                        if (Math.abs(analysisOutput[j][k].zScore - analysisOutput[m][k].zScore) >= (sedComparisonValue * 2.58)) {
                            analysisOutput[j][k].zScore = evenRound((analysisOutput[j][k].zScore), 2);
                            sig01 = true;
                            sig01Array.push(sig01);
                        }
                    }
                }

                newStatementNum = k + 1;

                if (sig05Array.length === (sigFactorNumbersArray.length - 1)) {
                    distingStatementsTransferArray05.push(newStatementNum);
                }

                if (sig01Array.length === (sigFactorNumbersArray.length - 1)) {
                    distingStatementsTransferArray01.push(newStatementNum);
                }

                if (sig05Array.length === 0) {
                    consensusStatementTransferArray05.push(newStatementNum);
                }

                if (sig01Array.length === 0) {
                    consensusStatementTransferArray01.push(newStatementNum);
                }
            }

            var distingStatementsTransferArray05b = _.uniq(distingStatementsTransferArray05, true);
            var distingStatementsTransferArray01b = _.uniq(distingStatementsTransferArray01, true);
            var distingStatementsTransferArray05c = _.difference(distingStatementsTransferArray05b, distingStatementsTransferArray01b);

            masterDistingStatementNumbersArray05.push(distingStatementsTransferArray05c);
            masterDistingStatementNumbersArray01.push(distingStatementsTransferArray01b);

            consensusStatementComparisonArray05.push(consensusStatementTransferArray05);
            consensusStatementComparisonArray01.push(consensusStatementTransferArray01);

            var factorNumber = sigFactorNumbersArray[j];

            var formattedDistingStatements = formatDistingArrayForDownload(distingStatementsTransferArray01b, distingStatementsTransferArray05c, factorNumber, analysisOutput, sigFactorNumbersArray);

            distStatementDataVizArray.push(formattedDistingStatements[0]);

            outputData.push(formattedDistingStatements[1]);
        }

        QAV.setState("masterDistingStatementNumbersArray01", masterDistingStatementNumbersArray01);
        QAV.setState("masterDistingStatementNumbersArray05", masterDistingStatementNumbersArray05);

        // ******
        // develop consensus statement data
        // ******
        //var outputForDataViz = _.cloneDeep(analysisOutput);
        QAV.setState("distStatementDataVizArray", distStatementDataVizArray);
        QAV.setState("outputForDataViz", analysisOutput);

        do {
            consensusStatementComparisonArray05 = reduceDistingArray(consensusStatementComparisonArray05);
        } while (consensusStatementComparisonArray05.length > 1);

        do {
            consensusStatementComparisonArray01 = reduceDistingArray(consensusStatementComparisonArray01);
        } while (consensusStatementComparisonArray01.length > 1);

        var consensus05 = _.flatten(consensusStatementComparisonArray05);
        var consensusStatementComparisonArray01b = _.flatten(consensusStatementComparisonArray01);

        var consensus01 = _.xor(consensus05, consensusStatementComparisonArray01b);

        QAV.setState("consensus05Statements", consensus05);
        QAV.setState("consensus01Statements", consensus01);

        sheetNamesXlsx.push(chartText2);

        // set up col widths for excel output
        var columns2 = [{
            wch: 12
        }, {
            wch: 12
        }, {
            wch: maxStatementLength
        }, {
            wch: 12
        }];
        for (var ttt = 0, tttLen = userSelectedFactors.length; ttt < tttLen; ttt++) {
            columns2.push({
                wch: 12
            }, {
                wch: 15
            }, {
                wch: 15
            });
        }
        colSizes.push(columns2);

        var formattedConsensusStatements = formatConsensusArrayForDownload(consensus05, consensus01, analysisOutput, sigFactorNumbersArray);
        QAV.setState("formattedConsensusStatements", formattedConsensusStatements[0]);

        outputData.push(formattedConsensusStatements[1]);

        pushCribSheetsToOutput(sheetNames, output, outputData, sheetNamesXlsx, colSizes);
    }

    function pushCribSheetsToOutput(sheetNames, output, outputData, sheetNamesXlsx, colSizes) {
        var language = QAV.getState("language");
        var appendText1 = resources[language].translation[" Rel. Ranks"];
        var appendText2 = resources[language].translation["Relative Ranking of Statements in "];
        var appendText3 = resources[language].translation["Statement Number"];
        var appendText5 = resources[language].translation["Z-score"];
        var appendText9 = resources[language].translation.Distinguishing;
        var appendText8 = resources[language].translation.Consensus;
        var appendTextHeader1 = resources[language].translation["Highest Ranked Statements"];
        var appendTextHeader2a = resources[language].translation["Positive Statements Ranked Higher in "];
        var appendTextHeader2b = resources[language].translation["Array than in Other Factor Arrays"];
        var appendTextHeader3a = resources[language].translation["Negative Statements Ranked Lower in "];
        var appendTextHeader3b = resources[language].translation["Array than in Other Factor ArraysB"];
        var appendTextHeader4 = resources[language].translation["Lowest Ranked Statements"];
        var maxStatementLength = QAV.getState("maxStatementLength");
        var appendText6 = resources[language].translation.Statement;
        var appendText7 = resources[language].translation["Sort Values"];
        // var appendText8 = resources[language].translation["Note: "];

        var statementRankingArray = QAV.getState("statementRankingArray");
        var userSelectedFactors = QAV.getState("userSelectedFactors");
        var factorInformation,
            lowestRankStatements,
            tempObj1,
            cribArray = [];
        var cribArray2 = [];
        var highestRankStatements,
            tempObj2,
            tempObj3,
            tempObj4;
        var maxRankValue,
            minRankValue,
            compositeSortValue,
            compositeSortValue2;
        var currentRank,
            currentRank2;

        // determine the number of statements in the extreme columns
        var sortTriangleShape = QAV.getState("qavSortTriangleShape");
        var synFactorArray1Holder = QAV.getState("synFactorArray1Holder");

        var arrayMax = +(_.max(sortTriangleShape));
        var arrayMin = +(_.min(sortTriangleShape));
        var triangleCounts = _.countBy(sortTriangleShape, _.identity);

        var maxCounts = triangleCounts[arrayMax];
        var minCounts = triangleCounts[arrayMin];

        // loop through factors
        for (var j = 0, jLen = userSelectedFactors.length; j < jLen; j++) {

            sheetNamesXlsx.push(userSelectedFactors[j] + appendText1);

            var columns = [{
                wch: 8
            }, {
                wch: 80
            }, {
                wch: 8
            }, {
                wch: 12
            }];
            colSizes.push(columns);

            cribArray = [
                [],
                [],
                [],
                []
            ];

            cribArray2 = [
                [],
                [],
                [],
                []
            ];

            factorInformation = _.cloneDeep(synFactorArray1Holder[j]);

            // sort by statement number
            factorInformation.sort(function(a, b) {
                return a[appendText3] - b[appendText3];
            });

            //console.log(JSON.stringify(factorInformation));

            // append the ranking arrays
            for (var k = 0, kLen = factorInformation.length; k < kLen; k++) {
                factorInformation[k].rankArray = statementRankingArray[k];
            }

            // resort back to high to low z-score sort
            factorInformation
                .sort(function(a, b) {
                    if (b[appendText5] === a[appendText5]) {
                        return a[appendText3] - b[appendText3];
                    } else {
                        return b[appendText5] - a[appendText5];
                    }
                });

            // push highest to cribArray
            for (var m = 0; m < minCounts; m++) {
                // tempObj1 = {};
                highestRankStatements = factorInformation.shift();
                var stateNum0 = highestRankStatements[appendText3];
                var statement0 = highestRankStatements[appendText6];
                var checkIfDisOrCon0 = checkIfDistinguishingOrConsensus(stateNum0, j);
                var compositeSortValue0 = highestRankStatements[appendText7];
                var otherValues = _.clone(highestRankStatements.rankArray);
                otherValues.splice(j, 1);
                var array0 = [stateNum0, statement0, compositeSortValue0, checkIfDisOrCon0];
                var array0a = array0.concat(otherValues);
                cribArray2[0].push(array0a);
            }

            // push lowest to cribArray
            for (var p = 0; p < maxCounts; p++) {
                // tempObj2 = {};
                lowestRankStatements = factorInformation.pop();
                var stateNum3 = lowestRankStatements[appendText3];
                var statement3 = lowestRankStatements[appendText6];
                var checkIfDisOrCon3 = checkIfDistinguishingOrConsensus(stateNum3, j);
                var compositeSortValue3 = lowestRankStatements[appendText7];
                var otherValues3 = _.clone(lowestRankStatements.rankArray);
                otherValues3.splice(j, 1);
                var array3 = [stateNum3, statement3, compositeSortValue3, checkIfDisOrCon3];
                var array3a = array3.concat(otherValues3);

                cribArray2[3].unshift(array3a);
            }

            // look for higher relative statements and push to cribArray
            for (var r = 0, rLen = factorInformation.length; r < rLen; r++) {
                compositeSortValue = factorInformation[r][appendText7];
                if (compositeSortValue > -1) {
                    maxRankValue = _.max(factorInformation[r].rankArray);
                    if (compositeSortValue === maxRankValue) {
                        var otherValues2 = _.clone(factorInformation[r].rankArray);
                        otherValues2.splice(j, 1);
                        var stateNum = factorInformation[r][appendText3];
                        var checkIfDisOrCon = checkIfDistinguishingOrConsensus(stateNum, j);
                        var tempArray22 = [
                            stateNum,
                            (factorInformation[r][appendText6]),
                            (compositeSortValue),
                            checkIfDisOrCon
                        ];
                        var combinedArray1 = tempArray22.concat(otherValues2);
                        cribArray2[1].push(combinedArray1);
                    }
                }
                if (compositeSortValue < 1) {
                    minRankValue = _.min(factorInformation[r].rankArray);
                    currentRank2 = factorInformation[r].rankArray[j];
                    if (compositeSortValue === minRankValue) {
                        var otherValuesLower = _.clone(factorInformation[r].rankArray);
                        otherValuesLower.splice(j, 1);
                        var stateNum2 = factorInformation[r][appendText3];
                        var checkIfDisOrCon2 = checkIfDistinguishingOrConsensus(stateNum2, j);
                        var tempArray33 = [
                            stateNum2,
                            (factorInformation[r][appendText6]),
                            (compositeSortValue),
                            checkIfDisOrCon2
                        ];
                        var combinedArray2 = tempArray33.concat(otherValuesLower);
                        cribArray2[2].push(combinedArray2);
                    }
                }
            }

            var spacerArray = ["", ""];

            // construct headers for statement groups
            var facName = userSelectedFactors[j];

            // create column headers for other factors
            var otherFactorNames = _.clone(userSelectedFactors);
            otherFactorNames.splice(j, 1);
            var higherRankedHeader = [
                "", appendTextHeader2a + facName + appendTextHeader2b
            ];

            var header1 = [
                "", appendText2 + facName
            ];
            var header0 = ["", appendTextHeader1, facName, appendText9].concat(otherFactorNames);
            cribArray2[0].unshift(spacerArray, header1, [
                "", "", "", appendText8
            ], header0);

            cribArray2[1].unshift(spacerArray, higherRankedHeader);

            var header3 = {};
            header3.stateNum = "";
            header3.statement = appendTextHeader3a + facName + appendTextHeader3b;
            header3.sortValue = "";
            cribArray2[2].unshift(spacerArray, [
                "",
                (appendTextHeader3a + facName + appendTextHeader3b),
                ""
            ]);

            var header4 = {};
            header4.stateNum = "";
            header4.statement = appendTextHeader4;
            header4.sortValue = "";
            cribArray2[3].unshift(spacerArray, ["", (appendTextHeader4), ""]);

            output.push(_.flattenDeep(cribArray));
            outputData.push(_.flatten(cribArray2));
        }

        // helper function
        function checkIfDistinguishingOrConsensus(statementNumber, loopNumber) {
            var masterDistingStatementNumbersArray01 = QAV.getState("masterDistingStatementNumbersArray01");
            var masterDistingStatementNumbersArray05 = QAV.getState("masterDistingStatementNumbersArray05");
            var consensus05 = QAV.getState("consensus05Statements");
            var consensus01 = QAV.getState("consensus01Statements");
            if (_.contains(masterDistingStatementNumbersArray05[loopNumber], statementNumber)) {
                return "  D";
            } else if (_.contains(consensus01, statementNumber)) {
                return "  C";
            } else if (_.contains(masterDistingStatementNumbersArray01[loopNumber], statementNumber)) {
                return "  D*";
            } else if (_.contains(consensus05, statementNumber)) {
                return "  C*";
            } else {
                return "";
            }
        }
        pushSettingsToOutput(sheetNames, output, outputData, sheetNamesXlsx, colSizes);
    }

    function pushSettingsToOutput(sheetNames, output, outputData, sheetNamesXlsx, colSizes) {
        QAV.setState("outputComplete", "true");
        QAV.setState("outputSpreadsheetArray", output);
        QAV.setState("outputSpreadsheetSheetNamesArray", sheetNames);

        // for output testing - do not delete!
        // console.log(JSON.stringify(output));
        // console.log(JSON.stringify(sheetNames));

        // console.log(JSON.stringify(outputData));
        // console.log(JSON.stringify(sheetNamesXlsx));
        // console.log(JSON.stringify(colSizes));

        QAV.setState("dataXlsx", outputData);
        QAV.setState("sheetNamesXlsx", sheetNamesXlsx);
        QAV.setState("colSizes", colSizes);
    }

    //*******************************************************************************
    //********  HELPER FUNCTIONS  ***************************************************
    //*******************************************************************************

    // helper function for distinguishing statements array
    function formatConsensusArrayForDownload(consensus05, consensus01, analysisOutput, sigFactorNumbersArray) {

        var language = QAV.getState("language");
        var chartText1 = resources[language].translation["Consensus Statements"];
        var chartText2 = resources[language].translation["Those That Do Not Distinguish Between ANY Pair of Factors"];
        var chartText3 = resources[language].translation["All Listed Statements are Non-Significant at P > 0.01, and Those Flagged with an * are also Non-Significant at P > 0.05)"];
        var chartText4 = resources[language].translation.Significance;
        var chartText5 = resources[language].translation.Statement;
        var chartText6 = resources[language].translation.Num;
        var chartText7 = resources[language].translation["Statement Number"];
        var chartText8 = resources[language].translation["Z-score"];
        var spacer = ["", ""];
        var outputLength = analysisOutput.length;
        var consensus05Length = consensus05.length;
        var consensus01Length = consensus01.length;

        var printArray = [];
        var printArray2 = [];
        var consensusSheetArray = [];
        var consensusSheetArray2 = [];

        // push headers
        var emptyLineObj = {};
        emptyLineObj["No."] = " ";
        emptyLineObj["SIG "] = " ";
        emptyLineObj["Statement "] = " ";
        emptyLineObj["Num "] = " ";

        for (var i = 0; i < outputLength; i++) {
            emptyLineObj["Q-SV-" + sigFactorNumbersArray[i]] = " ";
            emptyLineObj["Z-SCR-" + sigFactorNumbersArray[i]] = " ";
            emptyLineObj["SIG" + sigFactorNumbersArray[i]] = " ";
        }

        consensusSheetArray.push(spacer, [chartText1 + " -- " + chartText2], spacer, [chartText3], spacer, spacer);

        var line3Array = [];
        printArray.push(emptyLineObj);
        var printHeaderObj1 = {};
        printHeaderObj1["No."] = chartText1 + " -- " + chartText2;
        printArray.push(printHeaderObj1);
        printArray.push(emptyLineObj);
        var printHeaderObj2 = {};
        printHeaderObj2["No."] = chartText3;
        printArray.push(printHeaderObj2);
        printArray.push(emptyLineObj);
        printArray.push(emptyLineObj);
        var printHeaderObj4 = {};
        printHeaderObj4["No."] = chartText7;
        printHeaderObj4["SIG "] = chartText4;
        printHeaderObj4["Statement "] = chartText5;
        printHeaderObj4["Num "] = chartText7;

        line3Array.push(chartText7, chartText4, chartText5, chartText7);

        for (var j = 0; j < outputLength; j++) {
            printHeaderObj4["Q-SV-" + sigFactorNumbersArray[j]] = sigFactorNumbersArray[j] + " Q-SV";
            printHeaderObj4["Z-SCR-" + sigFactorNumbersArray[j]] = sigFactorNumbersArray[j] + " " + chartText8;
            line3Array.push((sigFactorNumbersArray[j] + " Q-SV"), (sigFactorNumbersArray[j] + " " + chartText8));
        }
        printArray.push(printHeaderObj4);
        consensusSheetArray.push(line3Array);

        var tempObj,
            tempObj2,
            kShift,
            pShift;

        // push 05 statements
        for (var k = 0; k < consensus05Length; k++) {
            tempObj = {};
            var tempArray = [];
            kShift = consensus05[k];

            // cycle through statement numbers and get statement, factors q score and sort value from results object and set sig level to ""
            tempObj["No."] = kShift;
            // ["No."] = kShift;
            tempObj["SIG "] = "*";
            tempObj["Statement "] = analysisOutput[0][(kShift - 1)].sortStatement;
            tempObj["Num "] = kShift;

            tempArray.push(kShift, "*", (analysisOutput[0][(kShift - 1)].sortStatement), kShift);

            for (var m = 0; m < outputLength; m++) {
                tempObj["Q-SV-" + sigFactorNumbersArray[m]] = analysisOutput[m][(kShift - 1)].sortValue;
                tempObj["Z-SCR-" + sigFactorNumbersArray[m]] = analysisOutput[m][(kShift - 1)].zScore;
                tempArray.push((analysisOutput[m][(kShift - 1)].sortValue), (analysisOutput[m][(kShift - 1)].zScore));
            }
            printArray2.push(tempObj);
            consensusSheetArray2.push(tempArray);
        }

        // cycle through statement numbers and get statement, factors q score and sort value from results object and set sig level to "*"
        for (var p = 0; p < consensus01Length; p++) {
            var tempArray2 = [];
            tempObj2 = {};
            pShift = consensus01[p];

            tempObj2["No."] = pShift;
            tempObj2["SIG "] = "";
            tempObj2["Statement "] = analysisOutput[0][(pShift - 1)].sortStatement;
            tempObj2["Num "] = pShift;

            tempArray2.push(pShift, "", (analysisOutput[0][(pShift - 1)].sortStatement), pShift);

            for (var q = 0; q < outputLength; q++) {
                tempObj2["Q-SV-" + sigFactorNumbersArray[q]] = analysisOutput[q][(pShift - 1)].sortValue;
                tempObj2["Z-SCR-" + sigFactorNumbersArray[q]] = analysisOutput[q][(pShift - 1)].zScore;
                tempArray2.push((analysisOutput[q][(pShift - 1)].sortValue), (analysisOutput[q][(pShift - 1)].zScore));
            }
            printArray2.push(tempObj2);
            consensusSheetArray2.push(tempArray2);
        }

        var printArray3 = printArray2.sort(function(a, b) {
            return a["No."] - b["No."];
        });

        consensusSheetArray2.sort(function(a, b) {
            if (a[0] === b[0]) {
                return 0;
            } else {
                return (a[0] < b[0]) ?
                    -1 :
                    1;
            }
        });

        var finalArray = consensusSheetArray.concat(consensusSheetArray2);

        for (var r = 0; r < printArray3.length; r++) {
            printArray.push(printArray3[r]);
        }
        return [printArray, finalArray];
    }

    // helper function for distinguishing arrays
    function reduceDistingArray(array) {
        var reducedArray = [];
        for (var r = 0; r < array.length; r++) {
            var increment3 = r + 1;
            var commonSet2 = _.intersection(array[r], array[increment3]);
            reducedArray.push(commonSet2);
        }
        if (reducedArray.length > 1) {
            reducedArray.pop();
        }
        return reducedArray;
    }

    /*
     * helper function
     */
    function formatDistingArrayForDownload(distingStatementsTransferArray01, distingStatementsTransferArray05, factorNumber, analysisOutput, sigFactorNumbersArray) {

        var language = QAV.getState("language");
        var chartText1 = resources[language].translation["Distinguishing Statements for"];
        var chartText2 = resources[language].translation["(P < .05 : Asterisk (*) Indicates Significance at P < .01)"];
        var chartText3 = resources[language].translation["Both the Factor Q-Sort Value and the Z-Score (Z-SCR) are Shown"];
        var chartText4 = resources[language].translation.Significance;
        var chartText5 = resources[language].translation.Statement;
        var chartText6 = resources[language].translation.Num;
        var chartText7 = resources[language].translation["Statement Number"];
        var chartText8 = resources[language].translation["Z-score"];

        var outputLength = analysisOutput.length;
        var disting05Length = distingStatementsTransferArray05.length;
        var disting01Length = distingStatementsTransferArray01.length;

        var printArray = [];
        var printArray2 = [];
        var spacer = ["", ""];

        var distinguishingSheetArray = [];

        // line 1
        var line1Array = [chartText1 + factorNumber];
        distinguishingSheetArray.push(spacer, line1Array);

        // line 2
        distinguishingSheetArray.push(spacer, [chartText2]);

        // line 3
        distinguishingSheetArray.push(spacer, [chartText3], spacer, spacer);

        // line 4 - headers
        var line4Array = [chartText7, chartText5, chartText7];

        // push headers
        var emptyLineObj = {};
        emptyLineObj["No."] = " ";
        emptyLineObj["Statement "] = " ";
        emptyLineObj["Num "] = " ";

        for (var i = 0; i < outputLength; i++) {
            emptyLineObj["Q-SV-" + sigFactorNumbersArray[i]] = " ";
            emptyLineObj["Z-SCR-" + sigFactorNumbersArray[i]] = " ";
            emptyLineObj["SIG" + sigFactorNumbersArray[i]] = " ";
        }

        printArray.push(emptyLineObj);
        var printHeaderObj1 = {};
        printHeaderObj1["No."] = chartText1 + factorNumber;
        printArray.push(printHeaderObj1);
        printArray.push(emptyLineObj);
        var printHeaderObj2 = {};
        printHeaderObj2["No."] = chartText2;
        printArray.push(printHeaderObj2);
        printArray.push(emptyLineObj);
        var printHeaderObj3 = {};
        printHeaderObj3["No."] = chartText3;
        printArray.push(printHeaderObj3);
        printArray.push(emptyLineObj);
        printArray.push(emptyLineObj);
        var printHeaderObj4 = {};
        printHeaderObj4["No."] = chartText7;
        printHeaderObj4["Statement "] = chartText5;
        printHeaderObj4["Num "] = chartText7;

        for (var j = 0; j < outputLength; j++) {
            printHeaderObj4["Q-SV-" + sigFactorNumbersArray[j]] = sigFactorNumbersArray[j] + " Q-SV";
            printHeaderObj4["Z-SCR-" + sigFactorNumbersArray[j]] = sigFactorNumbersArray[j] + " " + chartText8;
            printHeaderObj4["SIG" + sigFactorNumbersArray[j]] = chartText4;

            line4Array.push((sigFactorNumbersArray[j] + " Q-SV"), (sigFactorNumbersArray[j] + " " + chartText8), chartText4);

        }
        printArray.push(printHeaderObj4);
        distinguishingSheetArray.push(line4Array);

        var tempObj,
            tempObj2,
            kShift,
            pShift;

        // line 5
        var distinguishingSheetArray2 = [];

        // push 05 statements
        for (var k = 0; k < disting05Length; k++) {
            var line5Array = [];
            tempObj = {};
            kShift = distingStatementsTransferArray05[k];

            // cycle through statement numbers and get statement, factors q score and sort value from results object and set sig level to ""
            tempObj["No."] = kShift;
            line5Array.push(kShift);

            tempObj["Statement "] = analysisOutput[0][(kShift - 1)].sortStatement;
            line5Array.push(analysisOutput[0][(kShift - 1)].sortStatement, kShift);

            tempObj["Num "] = kShift;
            for (var m = 0; m < outputLength; m++) {
                tempObj["Q-SV-" + sigFactorNumbersArray[m]] = analysisOutput[m][(kShift - 1)].sortValue;
                tempObj["Z-SCR-" + sigFactorNumbersArray[m]] = analysisOutput[m][(kShift - 1)].zScore;
                tempObj["SIG" + sigFactorNumbersArray[m]] = "";
                line5Array.push((analysisOutput[m][(kShift - 1)].sortValue), (analysisOutput[m][(kShift - 1)].zScore), "");
            }
            printArray2.push(tempObj);
            distinguishingSheetArray2.push(line5Array);
        }

        // cycle through statement numbers and get statement, factors q score and sort value from results object and set sig level to "*"
        for (var p = 0; p < disting01Length; p++) {
            var line6Array = [];
            tempObj2 = {};
            pShift = distingStatementsTransferArray01[p];

            tempObj2["No."] = pShift;
            tempObj2["Statement "] = analysisOutput[0][(pShift - 1)].sortStatement;
            tempObj2["Num "] = pShift;

            line6Array.push(pShift, (analysisOutput[0][(pShift - 1)].sortStatement), pShift);

            for (var q = 0; q < outputLength; q++) {
                tempObj2["Q-SV-" + sigFactorNumbersArray[q]] = analysisOutput[q][(pShift - 1)].sortValue;
                tempObj2["Z-SCR-" + sigFactorNumbersArray[q]] = analysisOutput[q][(pShift - 1)].zScore;

                line6Array.push((analysisOutput[q][(pShift - 1)].sortValue), (analysisOutput[q][(pShift - 1)].zScore));

                if (q === formatDistingArrayForDownload.calledTimes) {
                    tempObj2["SIG" + sigFactorNumbersArray[q]] = "*";
                    line6Array.push("*");
                } else {
                    tempObj2["SIG" + sigFactorNumbersArray[q]] = "";
                    line6Array.push("");
                }
            }
            printArray2.push(tempObj2);
            distinguishingSheetArray2.push(line6Array);
        }

        var lookupValue = sigFactorNumbersArray[formatDistingArrayForDownload.calledTimes];

        var sortFactorValue = "Z-SCR-" + lookupValue;

        // sort desc
        var printArray3 = printArray2.sort(function(a, b) {
            return b[sortFactorValue] - a[sortFactorValue];
        });

        for (var r = 0; r < printArray3.length; r++) {
            printArray.push(printArray3[r]);
        }

        var lookupValue2 = formatDistingArrayForDownload.calledTimes;

        var modifiedIndexValue = [
            4,
            7,
            10,
            13,
            16,
            19,
            22,
            25
        ];

        var indexer = modifiedIndexValue[lookupValue2];

        distinguishingSheetArray2.sort(function(a, b) {
            if (a[indexer] === b[indexer]) {
                return 0;
            } else {
                return (b[indexer] < a[indexer]) ?
                    -1 :
                    1;
            }
        });

        var finalSheetArray = distinguishingSheetArray.concat(distinguishingSheetArray2);

        formatDistingArrayForDownload.calledTimes++;

        return [printArray, finalSheetArray];
    }

    // todo - evenRound the sed comparison values in disting statements function
    // todo - check to get rid of outputcomplete check - no longer needed i think by hiding download button

    OUTPUT.downloadExcelOutputFile = function() {

        var data = QAV.getState("dataXlsx");
        var ws_name = QAV.getState("sheetNamesXlsx");
        var wscols = QAV.getState("colSizes");

        function sheet_from_array_of_arrays(data, opts) {
            var ws = {};
            var range = {
                s: {
                    c: 10000000,
                    r: 10000000
                },
                e: {
                    c: 0,
                    r: 0
                }
            };
            for (var R = 0; R != data.length; ++R) {
                for (var C = 0; C != data[R].length; ++C) {
                    if (range.s.r > R)
                        range.s.r = R;
                    if (range.s.c > C)
                        range.s.c = C;
                    if (range.e.r < R)
                        range.e.r = R;
                    if (range.e.c < C)
                        range.e.c = C;
                    var cell = {
                        v: data[R][C]
                    };
                    if (cell.v === null)
                        continue;
                    var cell_ref = XLSX
                        .utils
                        .encode_cell({
                            c: C,
                            r: R
                        });

                    if (typeof cell.v === 'number')
                        cell.t = 'n';
                    else if (typeof cell.v === 'boolean')
                        cell.t = 'b';
                    else if (cell.v instanceof Date) {
                        cell.t = 'n';
                        cell.z = XLSX.SSF._table[14];
                        cell.v = datenum(cell.v);
                    } else
                        cell.t = 's';

                    ws[cell_ref] = cell;
                }
            }
            if (range.s.c < 10000000)
                ws['!ref'] = XLSX.utils.encode_range(range);

            return ws;
        }

        function Workbook() {
            if (!(this instanceof Workbook))
                return new Workbook();
            this.SheetNames = [];
            this.Sheets = {};
        }

        // set column widths example
        // var wscols = [{
        //         wch: 6
        //     },
        //     {
        //         wch: 7
        //     },
        //     {
        //         wch: 10
        //     },
        //     {
        //         wch: 50
        //     }
        // ];

        var wb = new Workbook();

        /* add worksheet to workbook */
        for (var i = 0; i < ws_name.length; i++) {
            var ws = sheet_from_array_of_arrays(data[i]);
            ws['!cols'] = wscols[i];
            wb
                .SheetNames
                .push(ws_name[i]);
            wb.Sheets[ws_name[i]] = ws;
        }

        var wbout = XLSX.write(wb, {
            bookType: 'xlsx',
            bookSST: true,
            type: 'binary'
        });

        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i)
                view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }

        var timeStamp = UTIL.currentDate1() + "_" + UTIL.currentTime1();
        var projectName = QAV.getState("qavProjectName");
        var nameFile = 'KenQ_output_' + projectName + '_' + timeStamp + '.xlsx';

        saveAs(new Blob([s2ab(wbout)], {
            type: "application/octet-stream"
        }), nameFile);
    };


    OUTPUT.downloadCsvOutputFile = function() {
        var data = QAV.getState("dataXlsx");

        var spacer = ["", "", ""];

        var newDataArray = [];
        for (var i = 0, iLen = data.length; i < iLen; i++) {
            for (var j = 0, jLen = data[i].length; j < jLen; j++) {
                newDataArray.push(data[i][j]);
            }
            newDataArray.push(spacer, spacer, spacer, spacer, spacer, spacer);
        }

        newDataArray.shift();

        var timeStamp = UTIL.currentDate1() + "_" + UTIL.currentTime1();
        var projectName = QAV.getState("qavProjectName");
        var nameFile = 'KenQ_output_' + projectName + '_' + timeStamp + ".csv";

        UTIL.exportToCsv(nameFile, newDataArray);
    };

}(window.OUTPUT = window.OUTPUT || {}, QAV));
