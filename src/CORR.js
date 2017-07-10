//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global window, $, _, setTimeout, evenRound, CENTROID, QAV, UTIL, performance*/

// QAV is the global state data store
(function (CORR, QAV, undefined) {
    'use strict';

    CORR.createCorrelationTable = function () {
        var t1, t0 = performance.now();
        var createCorrelationTable;

        var namesFromExistingData2 = QAV.getState("qavRespondentNames");

        // to prevent errors in zScores and datatable error when "." in name
        var namesFromExistingData = UTIL.checkUniqueName(namesFromExistingData2);

        QAV.setState("qavRespondentNames", namesFromExistingData);
        QAV.setState("respondentNames", namesFromExistingData);
        QAV.setState("qavTotalNumberSorts", namesFromExistingData.length);
        QAV.setState("totalNumberSorts", namesFromExistingData.length);

        // database data analysis
        var originalSortSize2 = QAV.getState("qavOriginalSortSize");
        var sortsFromExistingData = QAV.getState("qavRespondentSortsFromDbStored");

        var isOnline = UTIL.checkIfOnline();

        if (window.Worker && isOnline) {
            $("#correlationSpinnerText").css('visibility', 'visible');
            $("#correlationSpinnerDiv").addClass('calcSpinner');
            var myWorker = new Worker('wrkrs/workerCorr.js');
            var workerMessageArray = [originalSortSize2, sortsFromExistingData, namesFromExistingData];
            myWorker.postMessage(workerMessageArray);
            myWorker.onmessage = function (e) {
                QAV.setState('sortsAsNumbers', e.data[0]);
                QAV.setState('positiveShiftedRawSorts', e.data[1]);
                QAV.setState('correlationTableArrayFormatted', e.data[2]);
                QAV.setState('respondentNames', e.data[3]);
                QAV.setState('originalCorrelationValues', e.data[4]);

                // remove spinner and message
                $("#correlationSpinnerText").css('visibility', 'hidden');
                $("#correlationSpinnerDiv").removeClass('calcSpinner');

                // draw the display table
                createDisplayTableJQUERY(e.data[2], 'correlationTable');

                t1 = performance.now();
                console.log('%c Correlation Table completed in ' + (t1 - t0).toFixed(0) + ' milliseconds', 'background: black; color: white');
            };
        } else {

            if (namesFromExistingData.length > 0) {

                $("#correlationsSpinner").append('<p id="spinnerText">&nbsp&nbsp Calculating, <i>please wait</i>&nbsp&nbsp</p>').fadeIn(300);
            }

            $("#calculatingCorrelationsModal").toggleClass('active');

            // setTimeout to force display of spinner
            setTimeout(function () {

                // convert sorts to arrays
                var sortsAsNumbers2 = CORR.convertSortsTextToNumbers(sortsFromExistingData, originalSortSize2);

                // do the calcuations
                createCorrelationTable = CORR.calculateCorrelations(sortsAsNumbers2, namesFromExistingData);

                $("#correlationsSpinner").children("p").remove();

                // draw the display table
                createDisplayTableJQUERY(createCorrelationTable, 'correlationTable');

                t1 = performance.now();
                console.log('%c Correlation Table completed in ' + (t1 - t0).toFixed(0) + ' milliseconds', 'background: black; color: white');

            }, 10);
        }
    };


    /* *******************************************************************  model
    // ************ convert sorts and shift to positive values **********************
    // ******************************************************************************
    */
    CORR.convertSortsTextToNumbers = function (sortsTextFromDb, originalSortSize) {
        console.time("convertNumbers");
        var sortsAsNumbers = [];
        var maxArrayValue;

        // skip conversion if data coming from somewhere other than pasted data
        if (_.isArray(sortsTextFromDb[0]) === false) {
            _(sortsTextFromDb).forEach(function (element, j) {
                var startPoint = 0;
                var endPoint = 2;
                var tempArray = [];
                var loopLen = originalSortSize;
                var i, numberFragment, convertedNumber;

                for (i = 0; i < loopLen; i++) {
                    numberFragment = element.slice(startPoint, endPoint);
                    convertedNumber = +numberFragment;
                    tempArray.push(convertedNumber);
                    startPoint = startPoint + 2;
                    endPoint = endPoint + 2;
                }
                sortsAsNumbers.push(tempArray);
            }).value();

            // continue if not pasted text -
        } else {
            sortsAsNumbers = _.cloneDeep(sortsTextFromDb);
            console.log("the else path was taken");
        }
        QAV.setState("sortsAsNumbers", sortsAsNumbers);
        var sortsToShiftPositive = _.cloneDeep(sortsAsNumbers);
        // shift sorts to positive range
        maxArrayValue = _.max(sortsToShiftPositive[0]);
        _(sortsToShiftPositive).forEach(function (element) {
            var j;
            var loopLen = originalSortSize;

            for (j = 0; j < loopLen; j++) {
                element[j] = element[j] + maxArrayValue + 1;
            }
        }).value();
        QAV.setState("positiveShiftedRawSorts", sortsToShiftPositive);
        console.timeEnd("convertNumbers");
        return sortsAsNumbers;
    };


    //*****************************************************************  model
    //****  calculate PQMethod type correlations    **************************
    //************************************************************************

    CORR.getPqmethodCorrelation = function (x, y) {

        /**
         *  @fileoverview Pearson correlation score algorithm.
         *  @author matt.west@kojilabs.com (Matt West)
         *  @license Copyright 2013 Matt West.
         *  Licensed under MIT (http://opensource.org/licenses/MIT).
         */

        var n = x.length;

        if (n === 0) {
            return 0;
        }

        var sum1 = 0;
        for (var i = 0; i < n; i++) {
            sum1 += x[i];
        }

        var sum2 = 0;
        for (var j = 0; j < n; j++) {
            sum2 += y[j];
        }

        var sum1Sq = 0;
        for (var k = 0; k < n; k++) {
            sum1Sq += Math.pow(x[k], 2);
        }

        var sum2Sq = 0;
        for (var m = 0; m < n; m++) {
            sum2Sq += Math.pow(y[m], 2);
        }

        var pSum = 0;
        for (var p = 0; p < n; p++) {
            pSum += x[p] * y[p];
        }

        var num = pSum - (sum1 * sum2 / n);
        var den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / n) *
            (sum2Sq - Math.pow(sum2, 2) / n));

        if (den === 0) {
            return 0;
        }

        var answer = num / den;

        var answer1 = [evenRound((answer), 5), evenRound((answer * 100), 0)];

        return answer1;

    };

    //*********************************************************************   model
    //******* correlations calcs       ********************************************
    //*****************************************************************************
    CORR.calculateCorrelations = function (sortsAsNumbers, names) {

        console.time("correlation calculations and table display ");

        // todo - get a proper read of the length and add missing name error testing
        var totalSorts = names.length;
        var sortsAsNumbersCloned = _.cloneDeep(sortsAsNumbers);
        var correlationTableArray = [];
        var correlationTableArrayFormatted = [];

        for (var m = 0; m < totalSorts; m++) {
            correlationTableArray[m] = [];
        }

        for (var n = 0; n < totalSorts; n++) {
            correlationTableArrayFormatted[n] = [];
        }

        for (var i = 0; i < totalSorts; i++) {
            var pullX = sortsAsNumbersCloned[i];

            var correlationValue = CORR.getPqmethodCorrelation(sortsAsNumbersCloned[i], sortsAsNumbersCloned[i]);


            correlationTableArray[0][0] = correlationValue[0];
            correlationTableArrayFormatted[0][0] = correlationValue[1];

            for (var k = i; k < totalSorts; k++) {
                var correlationValue2 = CORR.getPqmethodCorrelation(pullX, sortsAsNumbersCloned[k]);

                correlationTableArray[i][k] = correlationValue2[0];
                correlationTableArrayFormatted[i][k] = correlationValue2[1];

                if (k === i) {} else {
                    // var nextArray = k + 1;
                    correlationTableArray[k][i] = correlationValue2[0];
                    correlationTableArrayFormatted[k][i] = correlationValue2[1];
                }
            } // end of k loop
        } //  end of i loop

        for (var j = 0; j < totalSorts; j++) {
            var pullName = names[j];
            correlationTableArrayFormatted[j].unshift(pullName);
        }
        names.unshift("");
        correlationTableArrayFormatted.unshift(names);

        QAV.setState("correlationTableArrayFormatted", correlationTableArrayFormatted);
        QAV.setState("respondentNames", names);
        QAV.setState("originalCorrelationValues", correlationTableArray);

        console.timeEnd("correlation calculations and table display ");

        return correlationTableArrayFormatted;
    };


    //*********************************************************************   model
    //******* create Correlation Table ********************************************
    //*****************************************************************************

    // example had node listed in parameters
    function createDisplayTableJQUERY(dataSet) {

        var headerText = dataSet[0];
        dataSet.shift();

        for (var j = 0, jLen = dataSet.length; j < jLen; j++) {
            dataSet[j].unshift(j + 1);
        }

        var tempObj;
        var headerArray = [];

        for (var i = 0, iLen = headerText.length; i < iLen; i++) {
            tempObj = {};
            tempObj.title = headerText[i];
            headerArray.push(tempObj);
        }

        var blank = headerArray.shift();
        var respondent = {
            "title": "Respon."
        };

        headerArray.unshift(respondent);
        headerArray.unshift(blank);

        var columnTargets = [];
        for (var k = 2, kLen = headerText.length + 1; k < kLen; k++) {
            columnTargets.push(k);
        }

        // todo - create clear-outs of analysis and results for change in factors extracted drop-down selection

        $("#correlationTable2").DataTable({
            "fixedColumns": {
                leftColumns: 2
            },
            "retrieve": true,
            "searching": false,
            "ordering": true,
            "info": false,
            "destroy": true,
            "scrollY": 800,
            "scrollCollapse": true,
            "scrollX": true,
            "paging": false,
            "data": dataSet,
            "columns": headerArray,
            "columnDefs": [{
                targets: columnTargets,
                className: 'dt-head-center dt-body-right',
            }, {
                targets: [0, 1],
                className: 'dt-body-center dt-body-name'
            }, {
                targets: '_all',
                "createdCell": function (td, cellData) { // , rowData, row, col
                    if (cellData < 0) {
                        $(td).css('color', 'red');
                    }
                }
            }],
        });

        var table = $("#correlationTable2").DataTable();
        $('#correlationTable2 tbody')
            .on('mouseenter', 'td', function () {
                var colIdx = table.cell(this).index().column;
                $(table.cells().nodes()).removeClass('highlight');
                $(table.column(colIdx).nodes()).addClass('highlight');
            })
            .on('mouseleave', function () {
                $(table.cells().nodes()).removeClass('highlight');
                $(table.columns().nodes()).removeClass('highlight');
            });
    }


}(window.CORR = window.CORR || {}, QAV));