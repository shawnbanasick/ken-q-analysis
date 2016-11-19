//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global window, $, localStorage, _, setTimeout, document, d3, CENTROID, VIEW, PCA, QAV, UTIL, performance*/

// QAV is the global state data store
(function (CORR, QAV, undefined) {

    CORR.createCorrelationTable = function () {
        var t0 = performance.now();

        var namesFromExistingData2 = QAV.getState("qavRespondentNames");

        // to prevent errors in zScores and datatable error when "." in name
        var namesFromExistingData = UTIL.checkUniqueName(namesFromExistingData2);

        QAV.setState("qavRespondentNames", namesFromExistingData);
        QAV.setState("respondentNames", namesFromExistingData);

        if (namesFromExistingData.length > 25) {

            $("#correlationsSpinner").append('<p id="spinnerText">&nbsp&nbsp Calculating, <i>please wait</i>&nbsp&nbsp</p>').fadeIn(300);
        }

        $("#calculatingCorrelationsModal").toggleClass('active');

        // setTimeout to force display of spinner
        setTimeout(function () {
            // database data analysis
            var originalSortSize2 = QAV.getState("qavOriginalSortSize");

            QAV.setState("qavTotalNumberSorts", namesFromExistingData.length);
            QAV.setState("totalNumberSorts", namesFromExistingData.length);

            var sortsFromExistingData = QAV.getState("qavRespondentSortsFromDbStored");

            var sortsAsNumbers2 = CENTROID.convertSortsTextToNumbers(sortsFromExistingData, originalSortSize2);

            var createCorrelationTable = _.cloneDeep(calculateCorrelations(sortsAsNumbers2, namesFromExistingData));

            createDisplayTableJQUERY(createCorrelationTable, 'correlationTable');

            $("#correlationsSpinner").children("p").remove();

        }, 10);
        var t1 = performance.now();
        console.log('%c Correlation Table completed in ' + (t1 - t0).toFixed(0) + ' milliseconds', 'background: black; color: white');
    };

    //*****************************************************************  model
    //****  calculate PQMethod type correlations    **************************
    //************************************************************************

    CORR.getPqmethodCorrelation = function (x, y) {

        var xLen = x.length;
        var yLen = y.length;

        var colMeansX = (_.reduce(x, function (sum, num) {
            return sum + num;
        })) / xLen;
        var colMeansY = (_.reduce(y, function (sum, num) {
            return sum + num;
        })) / yLen;

        var xSquareDiffMean = 0;
        for (var i = 0; i < xLen; i++) {
            var temp = ((x[i] - colMeansX) * (x[i] - colMeansX));
            xSquareDiffMean = xSquareDiffMean + temp;
        }

        var ySquareDiffMean = 0;
        for (var j = 0; j < yLen; j++) {
            var temp2 = ((x[j] - colMeansY) * (x[j] - colMeansY));
            ySquareDiffMean = ySquareDiffMean + temp2;
        }

        var xWork2 = Math.sqrt(xSquareDiffMean / xLen); // todo - add error message?
        var yWork2 = Math.sqrt(ySquareDiffMean / yLen); // aka standard dev

        var xStandardizedValues = [];
        for (var k = 0; k < xLen; k++) {
            var temp3 = (x[k] - colMeansX) / (Math.sqrt(xLen) * xWork2);
            xStandardizedValues.push(temp3);
        }

        var yStandardizedValues = [];
        var temp4;
        for (var m = 0; m < xLen; m++) {
            temp4 = (y[m] - colMeansY) / (Math.sqrt(yLen) * yWork2);
            yStandardizedValues.push(temp4);
        }

        var answers = [];
        var temp5;
        for (var p = 0; p < xLen; p++) {
            temp5 = (xStandardizedValues[p] * yStandardizedValues[p]);
            answers.push(temp5);
        }

        var answer = (_.reduce(answers, function (sum, num) {
            return (sum + num);
        }));

        var answer1 = [evenRound((answer), 5), evenRound((answer * 100), 0)];

        return answer1;
    };

    //*********************************************************************   model
    //******* create Correlation Table ********************************************
    //*****************************************************************************
    function calculateCorrelations(sortsAsNumbers, names) {

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
    }

    function createDisplayTableJQUERY(dataSet, node) {

        var headerText = dataSet[0];
        dataSet.shift();

        for (var j = 0; j < dataSet.length; j++) {
            dataSet[j].unshift(j + 1);
        }

        var tempObj;
        var headerArray = [];

        for (var i = 0; i < headerText.length; i++) {
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
        for (var k = 2; k < headerText.length + 1; k++) {
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
            "scrollY": 800,
            "scrollCollapse": true,
            "scrollX": true,
            "paging": false,
            data: dataSet,
            "columns": headerArray,
            "columnDefs": [{
                targets: columnTargets,
                className: 'dt-head-center dt-body-right',
            }, {
                targets: [0, 1],
                className: 'dt-body-center dt-body-name'
            }, {
                targets: '_all',
                "createdCell": function (td, cellData, rowData, row, col) {
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

    CORR.drawRawSortsRadviz = function (zoomFactor) {
        var qavRespondentNames, radvizObject;

        zoomFactor = zoomFactor || 1;

        qavRespondentNames = QAV.getState("qavRespondentNames");
        var results = QAV.getState("results");
        var factorLabelsArray = QAV.getState("factorLabelsArray");

        radvizObject = toRadvizObject(results, qavRespondentNames, factorLabelsArray);
    };

    function drawRadvizForCorrelations(data, zoomFactor) {

        var statementKeys = Object.keys(data[0]);
        statementKeys.shift();

        var radviz = radvizComponent(zoomFactor)
            .config({
                el: document.querySelector('.radvizContainer1'), // container node or selector
                colorAccessor: function (d) {
                    return d.factorGroup;
                },
                size: 800, // size of the whole SVG
                margin: 80, // margin around the circular panel, to leave some room for the labels
                dimensions: statementKeys, // data keys to use as dimensions
                useTooltip: true, // a simple tooltip component is provided
                // tooltipFormatter: function (d) {
                //    return '<h1>' + d.respondent + '</h1>';
                // }, // the datum for the hovered node is given as arguments
                // colorScale: d3.scale.ordinal().range(['"skyblue", "orange", "lime","blue", "yellow", "red", "green"']), // color palette
                //                colorScale: d3.scale.ordinal().range(['"#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#9cbbd7"']), // color palette
                drawLinks: false, // wether to draw links or not
                zoomFactor: zoomFactor, // gets the dimension nodes on a bigger radius than the panel, to pull nodes away from the center
                dotRadius: 9, // radius of each dot
                useRepulsion: false, // special repulsion effect to spread the nodes from each others so they can be better selected
            })
            .on('panelEnter', function () {

            })
            .on('panelLeave', function () {

            })
            .on('dotEnter', function () {

            })
            .on('dotLeave', function () {

            })
            .render(data);
    }

    function toRadvizObject(results, names, factorLabelsArray) {

        var rv, i, j, k, m, start, factorGroup2, factorGroup, factorGroupArray, radvizArray = [];

        for (k = 0; k < results.length; k++) {
            rv = {};
            start = 3;
            m = 4;
            factorGroupArray = [];
            rv.respondent = results[k][1];
            factorGroup2 = results[k][2];
            factorGroup = factorGroup2.slice(0, 2);
            for (i = 0; i < factorLabelsArray.length; ++i) {
                if (results[k][m] === "true") {
                    factorGroupArray.push(1);
                }
                j = factorLabelsArray[i];
                rv[j] = (results[k][start]) + 1; // +1 to shift positive
                start = start + 2;
                m = m + 2;
            }
            if (factorGroupArray.length) {
                rv.factorGroup = factorGroup;
            } else {
                rv.factorGroup = "F0";
            }
            radvizArray.push(rv);
        }
        return radvizArray;
    }

    (function () {
        // control factor loadings table background
        $("#zoomFactorRadioSelect :radio").on('click', function () {
            var button = $(this);

            $('#zoomFactorRadioSelect input:not(:checked)').parent().removeClass("selected");
            button.parent().addClass("selected");
            var zoomFactor = button.val();

            d3.select(".radvizContainer1 svg").remove();

            CORR.drawRawSortsRadviz(zoomFactor);
        });

    })();


}(window.CORR = window.CORR || {}, QAV));
