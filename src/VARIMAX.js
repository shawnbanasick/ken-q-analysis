//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global numeric, VARIMAX, window, performance, ROTA, QAV, $, resources, document, JQuery, evenRound, UTIL, localStorage, _ */

(function (VARIMAX, QAV, undefined) {

    VARIMAX.fireVarimaxRotation = function () {
        var getFactorsForRotation = QAV.getState("centroidFactors");

        // archive factor rotation table
        UTIL.archiveFactorScoreStateMatrixAndDatatable();

        // rotation routine
        standardizeMatrix(getFactorsForRotation);
    };

    // ***********************************************************  model
    // ***** Calculate Original Communalities ***************************
    // ***** Calculate "normalized" factor matrix ***********************
    // ******************************************************************

    function standardizeMatrix(factorMatrix) {
        var sumSquares = [];
        var loopLen = factorMatrix.length;
        var temp1;
        var temp3;
        var temp;
        var i, j;
        var t0 = performance.now();

        // calculate original communalities
        for (i = 0; i < factorMatrix[0].length; i++) {
            temp1 = 0;
            temp3 = 0;
            for (j = 0; j < loopLen; j++) {
                temp = (factorMatrix[j][i] * factorMatrix[j][i]);
                temp1 = temp1 + temp;
            }
            temp3 = evenRound((temp1), 8);
            sumSquares.push(temp3);
        }

        // calculate "normalized" factor matrix
        var standarizedFactorMatrix = [];
        var arrayFrag1;
        var temp5;
        var len2;
        var temp4;
        var sqrtSumSquares;
        var m, k;
        var loopLen1 = factorMatrix.length;

        for (m = 0; m < loopLen1; m++) {
            arrayFrag1 = factorMatrix[m];
            temp5 = [];
            len2 = factorMatrix[m].length;

            for (k = 0; k < len2; k++) {
                sqrtSumSquares = evenRound(Math.sqrt(sumSquares[k]), 8);

                if (sqrtSumSquares > 0.0) {
                    temp4 = evenRound((arrayFrag1[k] / sqrtSumSquares), 8);
                } else {
                    temp4 = 0;
                }
                temp5.push(temp4);
            }
            standarizedFactorMatrix.push(temp5);
        }

        var tableResults = calculateVarianceForFactorMatrix(standarizedFactorMatrix, sumSquares);

        var language = QAV.getState("language");
        var appendText = resources[language].translation["Varimax rotation applied"];
        var appendText2 = resources[language].translation.Undo;
        // the "varimax called" class is for toggling color of varimax button 
        $("#rotationHistoryList").append('<li>' + appendText + '<button class="deleteButton  varimaxCalled">' + appendText2 + '</button></li>');

        var t1 = performance.now();

        console.log('%c Varimax rotations completed in ' + (t1 - t0).toFixed(0) + ' milliseconds', 'background: #0c7fd7; color: white');

        return tableResults;
    }


    // ********************************************************  controller
    // ***** varimax iteration loop controller ****************************
    // ***** calclate variance for factor matrix **************************
    // ********************************************************************

    function calculateVarianceForFactorMatrix(factorMatrix, sumSquares) {
        // also calls factor adjustment function varimaxIteration

        var NV; // = 1;  outer big loop counter
        // var TVNV      // total variance of current loop
        var TVLT; //  total variance of previous loop used for kickout test
        var NC;
        var TV = 0; // total variance
        var AA = 0;
        var BB = 0;
        var FN = factorMatrix.length;
        var FFN = FN * FN;
        var testCondition;
        //var CONS = 0.7071066;
        //var sumSquares;

        do {

            if (NV) {
                factorMatrix = intermediateRotation;
            }

            var sumSquares2 = [];
            var temp1, temp3, arrayFrag, temp;
            var i, j;
            var iLoopLen = factorMatrix.length;

            // gets sumSquares of new varimaxIteration matrix to check convergence
            for (i = 0; i < iLoopLen; i++) {
                temp1 = 0;
                temp3 = 0;
                arrayFrag = factorMatrix[i];
                var jLoopLen = arrayFrag.length;

                for (j = 0; j < jLoopLen; j++) {
                    temp = evenRound((arrayFrag[j] * arrayFrag[j]), 8);
                    temp1 = temp1 + temp;
                }
                temp3 = evenRound((temp1), 8);
                sumSquares2.push(temp3);
            }

            AA = evenRound(_.reduce(sumSquares2, function (sum, num) {
                return sum + num;
            }), 8);

            BB = evenRound((AA * AA), 8);

            // FN is number factors, AA is total of sumSquares, BB is square of total of sumSquares, FFN is number factors squared
            TV = evenRound(((FN * BB - AA * AA) / FFN), 8);

            if (!NV) {
                NV = 1;
                NC = 0;
                TVLT = 0;
            } else {
                NV = NV + 1;
            }

            // testing for convergence
            // translating "arithmetic IF from fortran

            if (Math.abs(TV - TVLT) < 0.00000001) {
                NC = NC + 1;
            } else {
                NC = 0;
            }

            TVLT = TV;

            var intermediateRotation = varimaxIteration(factorMatrix);

            // run no more than 225 iterations
            testCondition = false;
            if (NC > 3) {
                testCondition = true;
            }
            if (NV >= 225) {
                testCondition = true;
            }

        } while (testCondition === false);

        var results = unStandardize(factorMatrix, sumSquares);

        return results;
    }


    // *************************************************************  model
    // ***** iteration dispatcher  ****************************************
    // ********************************************************************

    function varimaxIteration(standardizedFactorMatrix) {

        // V = each item in 2D matrix

        var rotatedFactors;
        var i, j;
        var loopLen = standardizedFactorMatrix.length;

        for (i = 0; i < loopLen; i++) {
            for (j = i + 1; j < loopLen; j++) {
                rotatedFactors = varimaxCalculations(standardizedFactorMatrix[i], standardizedFactorMatrix[j]); // sends out for rotation
                standardizedFactorMatrix[i] = rotatedFactors[0]; // subs results into matrix
                standardizedFactorMatrix[j] = rotatedFactors[1];
            }
        }
        return standardizedFactorMatrix;
    }

    // **********************************************************  model
    // ***** varimax calculator  ***************************************
    // *****************************************************************

    function varimaxCalculations(factorA, factorB) {

        var AA = 0.0;
        var BB = 0.0;
        var CC = 0.0;
        var DD;
        var uArray = [];
        var tArray = [];
        var ccArray = [];
        var ddArray = [];
        var COSP, SINP, testValue, TAN4T, ifTan4t;
        var rotatedFactors, COS4T, SIN4T, line350;
        var i;
        var factorALength = factorA.length;
        var U, tPrep, tPrep2, ccPrep, ddPrep;

        for (i = 0; i < factorALength; i++) {

            U = evenRound((factorA[i] + factorB[i]) * (factorA[i] - factorB[i]), 8);
            uArray.push(U);

            tPrep = evenRound((factorA[i] * factorB[i]), 8);
            tPrep2 = tPrep + tPrep;
            tArray.push(tPrep2);

            ccPrep = evenRound((U + tPrep2) * (U - tPrep2), 8);
            ccArray.push(ccPrep);
            CC = evenRound(_.reduce(ccArray, function (sum, num2) {
                return sum + num2;
            }), 8);

            ddPrep = (2 * U * tPrep2);
            ddArray.push(ddPrep);
            DD = evenRound(_.reduce(ddArray, function (sum, num2) {
                return sum + num2;
            }), 8);
            AA = evenRound(_.reduce(uArray, function (sum, num2) {
                return sum + num2;
            }), 8);
            // line 230
            BB = evenRound(_.reduce(tArray, function (sum, num2) {
                return sum + num2;
            }), 8);
        }

        var T = evenRound((DD - 2 * AA * BB / factorALength), 8);
        var B = evenRound((CC - (AA * AA - BB * BB) / factorALength), 8);

        // uses custom rounding deleted 6/26/2016
        // var switchTestPrep = Math.round10((T - B), -5);
        var switchTestPrep = evenRound((T - B), 5);

        // todo - integrate to clean up code
        if (switchTestPrep < 0) {
            testValue = "lessThanZero";
        } else if (switchTestPrep === 0) {
            testValue = "equalsZero";
        } else {
            testValue = "moreThanZero";
        }

        switch (testValue) { // line 230c  - with loop ender paths
        case "lessThanZero": // goto 280

            TAN4T = evenRound((Math.abs(T) / Math.abs(B)), 8);
            ifTan4t = evenRound((TAN4T - 0.00116), 8); // line 280b
            if (ifTan4t < 0) { // line 280b
                if (B < 0) { // line 280b => do line 300
                    SINP = 0.7071066; // var CONS
                    COSP = 0.7071066;

                    // todo  - goto line 400 (rotations)
                    rotatedFactors = gotoLine400Rotations(COSP, SINP, factorA, factorB);
                    return rotatedFactors;
                } else { // line 300 => B else
                    // end loop - goto 420   todo  - check if loop ends
                    rotatedFactors = [factorA, factorB];
                    return rotatedFactors; // not really rotated, just A and B returned

                } // end B if of case 1
            } else { // line 280  ifTest else
                // do line 290
                COS4T = evenRound((1 / Math.sqrt(1 + TAN4T * TAN4T)), 8);
                SIN4T = evenRound((TAN4T * COS4T), 8);
                // todo - goto 350  function line350
                line350 = gotoLine350(COS4T, SIN4T, B, T);
                COSP = line350[0];
                SINP = line350[1];
                rotatedFactors = gotoLine400Rotations(COSP, SINP, factorA, factorB);

                return rotatedFactors;
            } // end of ifTest

            break; // end case 1

        case "equalsZero": // line 230c ==> goto 240

            var ifTest2 = ((T + B) - 0.00116);
            if (ifTest2 < 0) {

                // end loop goto 420
                rotatedFactors = [factorA, factorB];
                return rotatedFactors; // not really rotated, just A and B returned

            } else {
                // do line 250
                COS4T = 0.7071066; // CONS
                SIN4T = 0.7071066;
                // goto 350  function line350
                line350 = gotoLine350(COS4T, SIN4T, B, T);
                COSP = line350[0];
                SINP = line350[1];
                rotatedFactors = gotoLine400Rotations(COSP, SINP, factorA, factorB);

                return rotatedFactors;
            }
            break; // end case 2

        default: // goto 320

            var CTN4T = evenRound(Math.abs(T / B), 8);
            var ifCtn4t = evenRound((CTN4T - 0.00116), 8);
            if (ifCtn4t < 0) {
                COS4T = 0.0;
                SIN4T = 1.0;

                // goto 350  function line350
                line350 = gotoLine350(COS4T, SIN4T, B, T);
                COSP = line350[0];
                SINP = line350[1];
                rotatedFactors = gotoLine400Rotations(COSP, SINP, factorA, factorB);
                return rotatedFactors;
            } else {

                SIN4T = evenRound((1.0 / Math.sqrt(1.0 + CTN4T * CTN4T)), 8);
                COS4T = evenRound((CTN4T * SIN4T), 8);

                // goto 350  function line350
                line350 = gotoLine350(COS4T, SIN4T, B, T);
                COSP = line350[0];
                SINP = line350[1];
                rotatedFactors = gotoLine400Rotations(COSP, SINP, factorA, factorB);
                return rotatedFactors;
            }
        }
    }

    //***********************************************************   model
    //******* goto line 350 function*************************************
    //*******************************************************************

    function gotoLine350(COS4T, SIN4T, B, T) {

        var COS2T = evenRound(Math.sqrt(((1.0 + COS4T) / 2.0)), 8);
        var SIN2T = evenRound(SIN4T / (2.0 * COS2T), 8);
        var COST = evenRound(Math.sqrt(((1.0 + COS2T) / 2.0)), 8);
        var SINT = evenRound(SIN2T / (2.0 * COST), 8);
        var line350Results;
        var SINP;
        var COSP;

        if (B > 0) {

            COSP = COST;
            SINP = SINT;

            if (T > 0) {

                line350Results = [COSP, SINP];
                return line350Results;

            } else {

                SINP = -SINP;
                line350Results = [COSP, SINP];
                return line350Results;

            }

        } else {

            COSP = evenRound((0.7071066 * COST + 0.7071066 * SINT), 8);
            SINP = evenRound(Math.abs((0.7071066 * COST - 0.7071066 * SINT)), 8);

            if (T > 0) {

                line350Results = [COSP, SINP];
                return line350Results;

            } else {

                SINP = -SINP;
                line350Results = [COSP, SINP];
                return line350Results;

            }
        }
    }

    //*********************************************************   model
    //******* goto line 400 Rotation function *************************
    //*****************************************************************

    function gotoLine400Rotations(COSP, SINP, factorA, factorB) {

        var resultsArrayFactorA = [];
        var resultsArrayFactorB = [];
        var i, AA, BB, rotatedFactors;
        var iLoopLen = factorA.length;

        for (i = 0; i < iLoopLen; i++) {

            AA = evenRound((factorA[i] * COSP + factorB[i] * SINP), 8);
            resultsArrayFactorA.push(AA);

            BB = evenRound((-factorA[i] * SINP + factorB[i] * COSP), 8);
            resultsArrayFactorB.push(BB);

        } // end of i for loop
        rotatedFactors = [resultsArrayFactorA, resultsArrayFactorB];
        return rotatedFactors;
    }

    //**********************************************************   model
    //******* de-normalize rotation results ****************************
    //******************************************************************

    function unStandardize(standardizedResults, sumSquares) {

        var results = [];
        var nLoopLen = standardizedResults.length;
        var n, p;
        var arrayFrag, pLoopLen, newArrayFrag, arrayItem, resultsTransposed;
        var crit;

        for (n = 0; n < nLoopLen; n++) {

            arrayFrag = standardizedResults[n];
            newArrayFrag = [];
            pLoopLen = arrayFrag.length;

            crit = 0;
            for (p = 0; p < pLoopLen; p++) {
                arrayItem = 0;

                arrayItem = (evenRound(arrayFrag[p], 5) * evenRound(Math.sqrt(sumSquares[p]), 5));

                // newArrayFrag.push(Math.round10((arrayItem), -5));
                newArrayFrag.push(evenRound((arrayItem), 5));

                crit = crit + arrayItem * Math.abs(arrayItem);
            }

            // invert (reflect) mostly negative factors
            if (crit < 0) {
                var q;
                var qLoopLen = newArrayFrag.length;

                for (q = 0; q < qLoopLen; q++) {
                    newArrayFrag[q] = -newArrayFrag[q];
                }
            }
            results.push(newArrayFrag);
        }

        resultsTransposed = _.zip.apply(_, results);

        // copy the new rotations
        var rotFacStateArrayPrep1 = _.cloneDeep(resultsTransposed);

        // send to rotFactorStateArray
        QAV.setState("rotFacStateArray", rotFacStateArrayPrep1);

        // prep for chart
        ROTA.calculateCommunalities(rotFacStateArrayPrep1);

        // gets array for fSig testing from LS of calculateCommunalities - sets fSigCriterionResults
        ROTA.calculatefSigCriterionValues("noFlag");

        // re-draw rotation table
        // var isRotatedFactorsTableUpdate = "yes";
        var isRotatedFactorsTableUpdate = "destroy";
        LOAD.drawRotatedFactorsTable2(isRotatedFactorsTableUpdate, "noFlag");

        return resultsTransposed;
    }

}(window.VARIMAX = window.VARIMAX || {}, QAV));