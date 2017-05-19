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
    'use strict';

    VARIMAX.fireVarimaxRotation = function () {

        var getFactorsForRotation = QAV.getState("centroidFactors");

        // archive factor rotation table
        UTIL.archiveFactorScoreStateMatrixAndDatatable();

        // run rotation
        var varimaxResults = VARIMAX.doVarimax(getFactorsForRotation);

        // copy the new rotations
        // var rotFacStateArrayPrep1 = _.cloneDeep(varimaxResults);

        // send to rotFactorStateArray
        QAV.setState("rotFacStateArray", varimaxResults);

        // prep for chart
        ROTA.calculateCommunalities(varimaxResults);

        // gets array for fSig testing from LS of calculateCommunalities - sets fSigCriterionResults
        ROTA.calculatefSigCriterionValues("noFlag");

        // re-draw rotation table
        // var isRotatedFactorsTableUpdate = "yes";
        var isRotatedFactorsTableUpdate = "destroy";
        LOAD.drawRotatedFactorsTable2(isRotatedFactorsTableUpdate, "noFlag");

        var lessThanZeroCounter = QAV.getState("lessThanZeroCounter");
        var greaterThanZeroCounter = QAV.getState("greaterThanZeroCounter");
        var equalsZeroCounter = QAV.getState("equalsZeroCounter");
        var lessA = QAV.getState("lessA");
        var lessB = QAV.getState("lessB");
        var lessC = QAV.getState("lessC");
        var greaterA = QAV.getState("greaterA");
        var greaterB = QAV.getState("greaterB");

        /*
        console.log("less than 0 = " + lessThanZeroCounter);
        console.log("greater than 0 = " + greaterThanZeroCounter);
        console.log("equals 0 = " + equalsZeroCounter);
        console.log("lessA = " + lessA);
        console.log("lessB = " + lessB);
        console.log("lessC = " + lessC);
        console.log("greaterA = " + greaterA);
        console.log("greaterB = " + greaterB);
        */
    };


    VARIMAX.doVarimax = function (factorMatrix) {
        var t0 = performance.now();

        var sumSquares = VARIMAX.calcSumSquares(factorMatrix);
        var standarizedFactorMatrix = VARIMAX.calcStandardizedFactorMatrix(sumSquares, factorMatrix);
        var rotatedResults = calculateVarianceForFactorMatrix(standarizedFactorMatrix, sumSquares);

        var language = QAV.getState("language");
        var appendText = resources[language].translation["Varimax rotation applied"];
        var appendText2 = resources[language].translation.Undo;
        // the "varimax called" class is for toggling color of varimax button
        $("#rotationHistoryList").append('<li>' + appendText + '<button class="deleteButton  varimaxCalled">' + appendText2 + '</button></li>');

        var t1 = performance.now();

        console.log('%c Varimax rotations completed in ' + (t1 - t0).toFixed(0) + ' milliseconds', 'background: #0c7fd7; color: white');
        return rotatedResults;
    };

    VARIMAX.calcStandardizedFactorMatrix = function (sumSquares, factorMatrix) {
        // (3722-3727)
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
                if (sqrtSumSquares !== 0) {
                    temp4 = evenRound((arrayFrag1[k] / sqrtSumSquares), 8);
                } else {
                    temp4 = 0.0;
                }
                temp5.push(temp4);
            }
            standarizedFactorMatrix.push(temp5);
        }
        return standarizedFactorMatrix;
    };

    VARIMAX.calcSumSquares = function (factorMatrix) {
        // (3709 - 3714)
        var temp1, temp3, temp;
        var sumSquares = [];
        var loopLen = factorMatrix.length;
        for (var i = 0, iLen = factorMatrix[0].length; i < iLen; i++) {
            temp1 = 0;
            temp3 = 0;
            for (var j = 0; j < loopLen; j++) {
                temp = evenRound((factorMatrix[j][i] * factorMatrix[j][i]), 8);
                temp1 = temp1 + temp;
            }
            temp3 = evenRound((temp1), 8);
            sumSquares.push(temp3);
        }
        return sumSquares;
    };

    // ********************************************************  controller
    // ***** varimax iteration loop controller ****************************
    // ***** calclate variance for factor matrix **************************
    // ********************************************************************

    function calculateVarianceForFactorMatrix(factorMatrix, sumSquares) {
        // also calls and loops factor adjustment function varimaxIteration
        var NV; // = 1;  outer big loop counter
        // var TVNV      // total variance of current loop
        var TVLT; //  total variance of previous loop used for kickout test
        var NC;
        var TV = 0; // total variance
        var aaArray, bbArray, tvArray;
        var FN = factorMatrix[0].length;
        var FFN = FN * FN;
        var testCondition;
        var AA, BB, FNBB, AASQ;

        do {
            if (NV) {
                factorMatrix = intermediateRotation;
            }

            tvArray = [];
            var temp1, temp3, arrayFrag, temp;
            var i, j;
            var iLoopLen = factorMatrix.length;

            TVLT = TV;


            // gets sumSquares of new varimaxIteration matrix to check convergence
            for (i = 0; i < iLoopLen; i++) { // for each factor
                AA = 0;
                BB = 0;
                temp1 = 0;
                temp3 = 0;
                arrayFrag = factorMatrix[i];
                var jLoopLen = arrayFrag.length;

                aaArray = [];
                bbArray = [];
                for (j = 0; j < jLoopLen; j++) { // for each sort
                    console.log("V(L) is " + arrayFrag[j]);
                    temp = evenRound((arrayFrag[j] * arrayFrag[j]), 8); // CC
                    console.log("CC is " + temp);
                    aaArray.push(evenRound((temp), 8)); // AA
                    var tempBB = evenRound((temp * temp), 8);
                    console.log("BB is " + tempBB);
                    bbArray.push(evenRound((tempBB), 8));
                }
                AA = evenRound((VARIMAX.sumArray(aaArray)), 8);
                console.log("AA is " + AA);
                BB = evenRound((VARIMAX.sumArray(bbArray)), 8);
                console.log("BB is " + BB);
                // FN is number factors, AA is total of sumSquares, BB is square of total of sumSquares, FFN is number factors squared
                // (3745)
                //console.log("FN is " + FN);
                //console.log("FFN is " + FFN);
                FNBB = evenRound((FN * BB), 8);
                AASQ = evenRound((AA * AA), 8);
                //TV = evenRound(((FN * BB - AA * AA) / FFN), 8);
                TV = evenRound(((FNBB - AASQ) / FFN), 8);
                console.log("TV iterate is " + TV);
                tvArray.push(TV);
            }

            TV = evenRound((VARIMAX.sumArray(tvArray)), 8);
            console.log("final TV is " + TV);


            if (!NV) {
                NV = 1;
                NC = 0;
                TVLT = 0;
            } else {
                NV = NV + 1;
            }

            // console.log("NV is " + NV);
            console.log("Rotation #" + NV);
            console.log("TV = " + TV);
            // console.log("TVLT = " + TVLT);
            // console.log("TV-LT = " + (TV - TVLT));


            // testing for convergence
            if ((Math.abs(TV - TVLT)) < 0.00000001) {
                NC = NC + 1;
            } else {
                NC = 0;
            }

            // jlog("NV - 225 = ", NV);
            // jlog("NC - 3 = ", NC);

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

        var results = VARIMAX.unStandardize(factorMatrix, sumSquares);

        return results;
    }


    // ********************************************************  controller
    // ***** iteration dispatcher  ****************************************
    // ********************************************************************

    function varimaxIteration(standardizedFactorMatrix) {
        // each item in 2D matrix
        var rotatedFactors;
        var i, j;
        var loopLen = standardizedFactorMatrix.length;

        for (i = 0; i < loopLen; i++) {
            for (j = i + 1; j < loopLen; j++) {
                // sends out for rotation
                rotatedFactors = varimaxCalculations(standardizedFactorMatrix[i], standardizedFactorMatrix[j]);
                // subs results into matrix
                standardizedFactorMatrix[i] = rotatedFactors[0];
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
        var DD = 0.0;
        var uArray = [];
        var tArray = [];
        var ccArray = [];
        var ddArray = [];
        var COSP, SINP, testValue, TAN4T;
        var rotatedFactors, COS4T, SIN4T, line350;
        var factorALength = factorA.length;
        var U, tPrep, tPrep2, ccPrep, ddPrep;


        for (var i = 0, iLen = factorALength; i < iLen; i++) {

            // console.log("factor A is " + factorA[i]);
            // console.log("factor B is " + factorB[i]);

            // (3776)
            U = (factorA[i] + factorB[i]) * (factorA[i] - factorB[i]);
            uArray.push(U);
            // console.log("U is " + U);
            // (3777)
            tPrep = factorA[i] * factorB[i];

            // (3778)
            tPrep2 = tPrep + tPrep;
            tArray.push(tPrep2);

            // (3779)
            ccPrep = (U + tPrep2) * (U - tPrep2);
            ccArray.push(ccPrep);

            // (3780)
            ddPrep = (2 * U * tPrep2);
            ddArray.push(ddPrep);
        }

        // (3779)
        CC = evenRound(VARIMAX.sumArray(ccArray), 17);
        console.log("CC is " + CC);
        // (3780)
        DD = evenRound(VARIMAX.sumArray(ddArray), 17);
        console.log("DD is " + DD);
        // (3781)
        AA = evenRound(VARIMAX.sumArray(uArray), 17);
        console.log("AA is " + AA);

        // (3782)
        BB = evenRound(VARIMAX.sumArray(tArray), 17);
        console.log("BB is " + BB);

        console.log("loop number should be here");

        // (3784-3785)
        var T = evenRound((DD - evenRound((2 * AA * evenRound((BB / factorALength), 17)), 17)), 17);
        var B = evenRound((CC - evenRound(((AA * AA - BB * BB) / factorALength), 8)), 8);

        console.log("T is " + T);
        console.log("B is " + B);

        var CospAndSinp = getComparisonOfNumAndDen(T, B);
        rotatedFactors = doFactorRotations(CospAndSinp, factorA, factorB);
        return rotatedFactors;
    }


    function getComparisonOfNumAndDen(T, B) {
        var TAN4T, SINP, COSP, COS4T, SIN4T, CTN4T;
        var COS2T, SIN2T, COST, SINT;
        var shouldSkipRotation = false;

        var greaterThanZeroCounter = QAV.getState("greaterThanZeroCounter") || 0;
        var equalsZeroCounter = QAV.getState("equalsZeroCounter") || 0;
        var lessThanZeroCounter = QAV.getState("lessThanZeroCounter") || 0;
        var lessA = QAV.getState("lessA") || 0;
        var lessB = QAV.getState("lessB") || 0;
        var lessC = QAV.getState("lessC") || 0;
        var greaterA = QAV.getState("greaterA") || 0;
        var greaterB = QAV.getState("greaterB") || 0;

        if (T < B) {
            lessThanZeroCounter = lessThanZeroCounter + 1;
            QAV.setState("lessThanZeroCounter", lessThanZeroCounter);
            // console.log("less");
            TAN4T = evenRound((Math.abs(T) / Math.abs(B)), 5);
            // console.log("TAN4T", TAN4T);
            if (TAN4T < 0.00116) {
                if (B >= 0) {
                    lessA = lessA + 1;
                    QAV.setState("lessA", lessA);
                    // console.log("less A");
                    shouldSkipRotation = true;
                    return [SINP, COSP, shouldSkipRotation];
                } else {
                    lessB = lessB + 1;
                    QAV.setState("lessB", lessB);
                    //   console.log("less B");
                    SINP = 0.7071066;
                    COSP = 0.7071066;
                    return [SINP, COSP, shouldSkipRotation];
                }
            } else {
                // variables cascade to below
                lessC = lessC + 1;
                QAV.setState("lessC", lessC);
                //   console.log("less C");

                COS4T = evenRound((1.0 / evenRound(Math.sqrt(1.0 + TAN4T * TAN4T), 8)), 8);
                SIN4T = evenRound((TAN4T * COS4T), 8);
            }
        } else if (T === B) {
            // console.log("equals");
            equalsZeroCounter = equalsZeroCounter + 1;
            QAV.setState("equalsZeroCounter", equalsZeroCounter);

            if ((T + B) < 0.00116) {
                //     console.log("equals skip");
                shouldSkipRotation = true;
                return [SINP, COSP, shouldSkipRotation];
            } else {
                // variables cascade to below
                //     console.log("equals B - constants");
                COS4T = 0.7071066;
                SIN4T = 0.7071066;
            }
        } else { // case (T > B)
            // console.log("greater");
            greaterThanZeroCounter = greaterThanZeroCounter + 1;
            QAV.setState("greaterThanZeroCounter", greaterThanZeroCounter);

            CTN4T = evenRound((Math.abs(T / B)), 5);
            // console.log("CTN4T = " + CTN4T);
            if (CTN4T < 0.00116) {
                greaterA = greaterA + 1;
                QAV.setState("greaterA", greaterA);
                //    console.log("greater A");
                // variables cascade to below                
                COS4T = 0.0;
                SIN4T = 1.0;
            } else {
                greaterB = greaterB + 1;
                QAV.setState("greaterB", greaterB);
                //    console.log("greater B");
                // variables cascade to below                
                SIN4T = evenRound((1.0 / evenRound(Math.sqrt(1.0 + CTN4T * CTN4T), 8)), 8);
                COS4T = evenRound((CTN4T * SIN4T), 8);
            }
        }

        // continue with casecade values to determine COS theta and SIN theta

        COS2T = evenRound(Math.sqrt(((1.0 + COS4T) / 2.0)), 8);
        SIN2T = evenRound(SIN4T / (2.0 * COS2T), 8);
        COST = evenRound(Math.sqrt(((1.0 + COS2T) / 2.0)), 8);
        SINT = evenRound(SIN2T / (2.0 * COST), 8);

        // determine COS phi and SIN phi
        if (B <= 0) {
            COSP = evenRound((0.7071066 * COST + 0.7071066 * SINT), 8);
            SINP = evenRound(Math.abs((0.7071066 * COST - 0.7071066 * SINT)), 8);
        } else {
            COSP = COST;
            SINP = SINT;
        }

        // check T value
        if (T <= 0) {
            SINP = -SINP;
        }
        // console.log(SINP, COSP);
        return [SINP, COSP, shouldSkipRotation];
    }


    //*********************************************************
    //******* Factor Rotation function ************************
    //*********************************************************

    function doFactorRotations(CospAndSinp, factorA, factorB) {
        var shouldSkipRotation = CospAndSinp[2];
        if (shouldSkipRotation) {
            var originalFactors = [factorA, factorB];
            return originalFactors;
        } else {
            var resultsArrayFactorA = [];
            var resultsArrayFactorB = [];
            var i, AA, BB, rotatedFactors;
            var iLoopLen = factorA.length;
            var SINP = CospAndSinp[0];
            var COSP = CospAndSinp[1];

            for (i = 0; i < iLoopLen; i++) {
                AA = evenRound((factorA[i] * COSP + factorB[i] * SINP), 8);
                resultsArrayFactorA.push(AA);

                BB = evenRound((-factorA[i] * SINP + factorB[i] * COSP), 8);
                resultsArrayFactorB.push(BB);
            }
            rotatedFactors = [resultsArrayFactorA, resultsArrayFactorB];
            return rotatedFactors;
        }
    }

    //**********************************************************   model
    //******* de-normalize rotation results ****************************
    //******************************************************************

    VARIMAX.unStandardize = function (standardizedResults, sumSquares) {
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

        return resultsTransposed;
    };

    //***********************************************************
    //************** helper functions ***************************
    //***********************************************************

    VARIMAX.sumArray = function (array) {
        return (_.reduce(array, function (sum, num) {
            return sum + num;
        }));
    };

}(window.VARIMAX = window.VARIMAX || {}, QAV));