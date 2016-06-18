//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.

// JSlint declarations
/* global localStorage: false, console: false, $: false, _: false, UTIL, document: false*/


/***********************************************************
            imports
                qavOriginalSortSize
                qavRespondentNames
                qavRespondentSortsFromDbStored
                qavTotalNumberSorts

            exports 
 
 ***********************************************************/

// todo - fix parseInt by adding second value


$(document).ready(function () {

    // **************************************************************************
    // ***** Persist Pasted Sort Data in PQMethod input section *****************
    // **************************************************************************

    // todo - move this to manual input file

    (function () {
        var input = document.getElementById('sortInputBox');

        // pull user input from memory if it exists
        var temp1 = localStorage.getItem("sortInputBox");
        if (temp1) {
            input.value = temp1;
        }

        // capture sorts from user-input and set into memory
        $('#sortInputBox').on('input propertychange change', function () {
            localStorage.setItem("sortInputBox", this.value);
        });
    })();

}); // end document ready function


// ***************************************************  model controller
// ***** Get data from Demo data sets  *********************************
// *********************************************************************

// todo - move this to usedemodataset.js file
// called by onclick from html demo data
// creates correlation table
function callCentroidFromLocalDemoData() {

    var t0 = performance.now();

    var namesFromExistingData2 = JSON.parse(localStorage.getItem("qavRespondentNames"));

    // to prevent errors in zScores and datatable error when "." in name
    var namesFromExistingData = checkUniqueName(namesFromExistingData2);

    localStorage.setItem("qavRespondentNames", JSON.stringify(namesFromExistingData));
    QAV.respondentNames = namesFromExistingData;


    if (namesFromExistingData.length > 25) {

        $("#correlationsSpinner").append('<p id="spinnerText">&nbsp&nbsp Calculating, <i>please wait</i>&nbsp&nbsp</p>').fadeIn(300);
    }

    $("#calculatingCorrelationsModal").toggleClass('active');

    // setTimeout to force display of spinner
    setTimeout(function () {
        // database data analysis
        var originalSortSize2 = localStorage.getItem("qavOriginalSortSize");

        localStorage.setItem("qavTotalNumberSorts", namesFromExistingData.length);

        QAV.totalNumberSorts = namesFromExistingData.length;

        var sortsFromExistingData = JSON.parse(localStorage.getItem("qavRespondentSortsFromDbStored"));


        var sortsAsNumbers2 = convertSortsTextToNumbers(sortsFromExistingData, originalSortSize2);


        var createCorrelationTable = calculateCorrelations(sortsAsNumbers2, namesFromExistingData);

        createDisplayTableJQUERY(createCorrelationTable, 'correlationTable');

        $("#correlationsSpinner").children("p").remove();

    }, 10);
    var t1 = performance.now();
    console.log('%c Correlation Table completed in ' + (t1 - t0).toFixed(0) + ' milliseconds', 'background: black; color: white');

}


/* ****************************************************************  model controller
// ***** calculate factor loadings **************************************************
// **********************************************************************************
*/
function calculateFactorLoadings(dataArray) {

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
} // end function fireCalculateFactors




// **********************************************************************  controller
// ***** controller for factor extraction *******************************************
// **********************************************************************************
// todo - refactor onclick handler from html
function fireFactorExtraction() {
    console.time("total factor extraction time is ");
    var factors = document.getElementById("factorSelect");
    var selectedNumberFactors = factors.options[factors.selectedIndex].value;
    var loopLength = parseInt(selectedNumberFactors);
    localStorage.setItem("numberFactorsExtracted", loopLength);
    var dataArray = JSON.parse(localStorage.getItem("originalCorrelationValues"));

    QAV.numFactorsExtracted = loopLength;

    var factorMatrix = [];
    var factorDisplayNameArray = [];
    var d3ChartFactorNames = [];
    var factorName, d3FactorName, tempArray;
    var factorMatrix1, numberSorts, num, eigen;
    var eigenvalues = [];
    var explainedVariance = [];
    var respondentNames, totalVariance;


    //    // get number of checkboxes from UI and append to DOM
    //    UTIL.addFactorSelectCheckboxesRotation(loopLength);

    //    // clear checkboxes if previously added to DOM
    //    var checkboxFrameCheck = $("#checkboxFrame");
    //    if (checkboxFrameCheck.length > 0) {
    //        checkboxFrameCheck.empty();
    //    }
    //
    //    // add checkboxes to DOM according to number factors extracted
    //    for (var k = 0; k < loopLength; k++) {
    //        var incrementedK = k + 1;
    //
    //        var checkbox = document.createElement('input');
    //        checkbox.type = "checkbox";
    //        checkbox.name = "radioCheck";
    //        checkbox.value = incrementedK;
    //        checkbox.className = "checkbox";
    //        checkbox.id = "checkChart" + incrementedK;
    //
    //        var label = document.createElement('label');
    //        label.htmlFor = "checkChart" + incrementedK;
    //        label.className = "checkboxLabel";
    //        label.appendChild(document.createTextNode("Factor " + incrementedK));
    //
    //        document.getElementById("checkboxFrame").appendChild(checkbox);
    //        document.getElementById("checkboxFrame").appendChild(label);
    //        // document.getElementById("checkboxFrame").appendChild(checkboxDiv1);
    //        // document.getElementById("checkboxFrame").appendChild(checkboxDiv1);
    //    }


    // determine if is this is a rotation table re-draw or not
    var table = $('#factorRotationTable2 tr').length; //
    if (table > 0) {
        var isRotatedFactorsTableUpdate = "destroy";
    } else {
        isRotatedFactorsTableUpdate = "no";
    }

    for (var i = 1; i < (loopLength + 1); i++) {
        factorName = "factor " + i;
        d3FactorName = "factor" + i;
        // added for D3 because of unknown comma insertion in factorDispalyNameArray
        d3ChartFactorNames.push(d3FactorName);
        tempArray = calculateFactorLoadings(dataArray);
        factorMatrix.push(tempArray[0]);
        dataArray = tempArray[1];
        factorDisplayNameArray.push(factorName);
    }
    localStorage.setItem("factorLabels", JSON.stringify(factorDisplayNameArray));
    QAV.factorLabels = factorDisplayNameArray;

    // todo - separate model from controller
    factorMatrix1 = _.cloneDeep(factorMatrix, true);
    var centroidFactors = _.cloneDeep(factorMatrix);

    // send and save  to varimax rotation
    // todo - change this name to clarify for PCA
    localStorage.setItem("centroidFactors", JSON.stringify(centroidFactors));

    // todo change to analysis global object setting
    numberSorts = localStorage.getItem("qavTotalNumberSorts");

    // eigenvalue calculations
    for (var j = 0; j < factorMatrix1.length; j++) {
        num = factorMatrix1[j];
        for (var q = 0; q < num.length; q++) {
            num[q] = evenRound((num[q] * num[q]), 8);
        }
        eigen = evenRound((_.reduce(num, function (sum, num2) {
            return sum + num2;
        })), 5);

        eigenvalues.push(eigen);
        respondentNames = JSON.parse(localStorage.getItem("qavRespondentNames"));
        totalVariance = evenRound((100 * (eigen / numberSorts)), 0);
        explainedVariance.push(totalVariance);
    }

    // shift data to fixed 5
    var factorMatrixToFixed5 = [];
    _(factorMatrix).forEach(function (arrayFrag) {
        var tableFormatFragment = _.map(arrayFrag, function (a) {
            return (evenRound(a, 5));
        });
        factorMatrixToFixed5.push(tableFormatFragment);
    }).value();


    factorMatrixToFixed5.unshift(respondentNames);

    var factorMatrixTransposed = _.zip.apply(_, factorMatrixToFixed5);

    eigenvalues.unshift("Eigenvalues");
    explainedVariance.unshift("% Expln Var");

    QAV.centroidEigenvalues = eigenvalues;

    factorMatrixTransposed.push(eigenvalues);
    factorMatrixTransposed.push(explainedVariance);
    factorDisplayNameArray.unshift("");
    factorMatrixTransposed.unshift(factorDisplayNameArray);


    var expVar2 = factorMatrixTransposed.pop();
    localStorage.setItem("expVarCentroid", JSON.stringify(expVar2));

    // add to qav - used in results download cumulative commonalities section
    localStorage.setItem("factorMatrixTransposed", JSON.stringify(factorMatrixTransposed));

    console.timeEnd("total factor extraction time is ");

    // todo - clean up this array prep mess - refactor to function

    var rotFacStateArrayPrep1 = _.cloneDeep(factorMatrixToFixed5);
    rotFacStateArrayPrep1.shift();
    var rotFacStateArrayPrep2 = _.zip.apply(_, rotFacStateArrayPrep1);

    QAV.centroidFactors = rotFacStateArrayPrep2;

    //
    //    localStorage.setItem("rotFacStateArray", JSON.stringify(rotFacStateArrayPrep2));
    //
    //
    //
    //    // prep for chart
    //    calculateCommunalities(rotFacStateArrayPrep2);
    //
    //
    //    // gets array for fSig testing from LS of calculateCommunalities - sets fSigCriterionResults
    //    calculatefSigCriterionValues("noFlag");
    //
    //    // draw 2 factor rotation table
    //    // drawRotatedFactorsTable2(isRotatedFactorsTableUpdate, "noFlag");
    //
    //    saveRotationArchiveCounter("reset");
    //
    //    // archive rotation matrix state and factor rotation table
    //    archiveFactorScoreStateMatrixAndDatatable();
    //
    //    var chartDataPrep1 = _.cloneDeep(factorMatrix);
    //
    //    chartDataPrep1.unshift(respondentNames);
    //
    //    console.log(JSON.stringify(chartDataPrep1));
    //
    //    // transpose
    //    var chartDataPrep = _.zip.apply(_, chartDataPrep1);
    //
    //    localStorage.setItem("chartData", JSON.stringify(chartDataPrep));
    //
    //    var d3ChartPrep = [];
    //    d3ChartPrep.push("Respondent", d3ChartFactorNames);
    //
    //    var d3ChartData = _.cloneDeep(chartDataPrep);
    //    d3ChartData.unshift(d3ChartPrep);
    //
    //    localStorage.setItem("d3ChartData", JSON.stringify(d3ChartData));
    //
    //    // scroll to next section
    //    //$("#rotationArea")[0].click();

}


//***************************************************************************   model
//******* for rotated factors table data  handsontable version **********************
//***********************************************************************************
function calculateEigenvaluesAndVariance() {

    var numberSorts = localStorage.getItem("qavTotalNumberSorts");
    var factorMatrix = JSON.parse(localStorage.getItem("rotFacStateArray"));

    var factorMatrix2 = _.cloneDeep(factorMatrix);

    var factorMatrix1 = _.zip.apply(_, factorMatrix2);

    var j, num, eigen, totalVariance;
    var eigenvalues = {};
    var explainedVariance = {};
    var loopLen1 = factorMatrix1.length;
    var results = [];
    var factorNumber, factorSig;

    eigenvalues = {
        respondent: "Eigenvalues"
    };
    explainedVariance = {
        respondent: "% Expln Var"
    };

    for (j = 0; j < loopLen1; j++) {
        num = factorMatrix1[j];
        for (var k = 0; k < num.length; k++) {
            num[k] = evenRound((num[k] * num[k]), 8);
        }
        eigen = evenRound((_.reduce(num, function (sum, num2) {
            return sum + num2;
        })), 5);

        factorNumber = "factor" + (j + 1);

        factorSig = "factorSig" + (j + 1);
        totalVariance = evenRound((100 * (eigen / numberSorts)), 0);

        eigenvalues[factorNumber] = eigen;
        explainedVariance[factorNumber] = totalVariance;

        eigenvalues[factorSig] = "";
        explainedVariance[factorSig] = "";

    }
    eigenvalues.communality = "";
    explainedVariance.communality = "";

    results.push(eigenvalues);

    localStorage.setItem("expVar", JSON.stringify(explainedVariance));

    return results;
}


//***************************************************************************   model
//******* for rotated factors table data - datatables version ***********************
//***********************************************************************************
function calculateEigenvaluesAndVariance2() {

    var numberSorts = localStorage.getItem("qavTotalNumberSorts");
    var factorMatrix = JSON.parse(localStorage.getItem("rotFacStateArray"));
    var factorMatrix2 = _.cloneDeep(factorMatrix);
    var factorMatrix1 = _.zip.apply(_, factorMatrix2);
    var j, num, eigen, totalVariance;
    var eigenvalues = {};
    var explainedVariance = {};
    var loopLen1 = factorMatrix1.length;
    var results = [];
    var factorNumber, factorSig;

    eigenvalues = ["Eigenvalues"];
    explainedVariance = ["% Expln Var"];

    for (j = 0; j < loopLen1; j++) {
        num = factorMatrix1[j];
        for (var k = 0; k < num.length; k++) {
            num[k] = evenRound((num[k] * num[k]), 8);
        }
        eigen = evenRound((_.reduce(num, function (sum, num2) {
            return sum + num2;
        })), 5);

        factorNumber = "factor" + (j + 1);

        factorSig = "factorSig" + (j + 1);
        totalVariance = evenRound((100 * (eigen / numberSorts)), 0);

        eigenvalues.push(eigen);
        explainedVariance.push(totalVariance);

        eigenvalues.push("");
        explainedVariance.push("");
    }
    eigenvalues.push("");
    explainedVariance.push("");

    results.push(eigenvalues);

    // results.push(explainedVariance);
    explainedVariance.splice(1, 0, "", "");
    localStorage.setItem("expVar", JSON.stringify(explainedVariance));

    return results;

}

//***************************************************************************   model
//******* custom rounding - closure *************************************************
//***********************************************************************************
// from Mozilla Developer Network
(function () {

    /**
     * Decimal adjustment of a number.
     *
     * @param	{String}	type	The type of adjustment.
     * @param	{Number}	value	The number.
     * @param	{Integer}	exp		The exponent (the 10 logarithm of the adjustment base).
     * @returns	{Number}			The adjusted value.
     */
    function decimalAdjust(type, value, exp) {
        // If the exp is undefined or zero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // If the value is not a number or the exp is not an integer...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    // Decimal round
    if (!Math.round10) {
        Math.round10 = function (value, exp) {
            return decimalAdjust('round', value, exp);
        };
    }
    // Decimal floor
    if (!Math.floor10) {
        Math.floor10 = function (value, exp) {
            return decimalAdjust('floor', value, exp);
        };
    }
    // Decimal ceil
    if (!Math.ceil10) {
        Math.ceil10 = function (value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }

})();


//***************************************************************************   model
//******* custom rounding - to evens  ***********************************************
//***********************************************************************************
// another custom rounding to mimic pqmethod "bankers / gaussian rounding"
function evenRound(num, decimalPlaces) {
    var d = decimalPlaces || 0;
    var m = Math.pow(10, d);
    var n = +(d ? num * m : num).toFixed(8); // Avoid rounding errors
    var i = Math.floor(n),
        f = n - i;
    var e = 1e-8; // Allow for rounding errors in f
    var r = (f > 0.5 - e && f < 0.5 + e) ?
        ((i % 2 === 0) ? i : i + 1) : Math.round(n);
    return d ? r / m : r;
}




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

    totalsSums = _.reduce(colTotalsAndMeanSum, function (sum, num) {
        return sum + num;
    });

    totalsSumsSqrt = evenRound((Math.sqrt(totalsSums)), 8);

    factorLoad1 = _.map(colTotalsAndMeanSum, function (num) {
        return evenRound((num / totalsSumsSqrt), 8);
    });

    factorLoad1Sqrd = _.map(factorLoad1, function (num) {
        return evenRound((num * num), 8);
    }); // comparison 2

    diffDiagonalEstimateandFactorLoad = [];
    for (j = 0; j < factorLoad1Sqrd.length; j++) {
        diffDiagonalEstimateandFactorLoad.push(Math.abs(evenRound((factorLoad1Sqrd[j] - 0.5), 8)));
    }

    var maxDiff = _.max(diffDiagonalEstimateandFactorLoad);

    function totalSumsFunction(newDiagonalEstimate) {
        var totalsSums = _.reduce(newDiagonalEstimate, function (sum, num) {
            return evenRound((sum + num), 8);
        });
        return totalsSums;
    }

    function factorLoad1Function(newDiagonalEstimate) {
        factorLoad1 = _.map(newDiagonalEstimate, function (num) {
            return evenRound((num / totalsSumsSqrt), 8);
        }); // Math.round10
        return factorLoad1;
    }

    function factorLoad1SqrdFunction(factorLoad1) {
        factorLoad1Sqrd = _.map(factorLoad1, function (num) {
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

// **************************************************************************   model
// ***** remove factor  correlations*************************************************
// **********************************************************************************
function removeCorrelations(array, factorLoadings) {
    var factorCorrelations = [];


    function helper1(factorLoadings) {
        _(factorLoadings).forEach(function (num) {
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

// **************************************************************************   model
// *****  undo Array Reflection  ****************************************************
// **********************************************************************************
function undoReflection(subtractedArray, factorLoadings, reflectedRowCol) {

    _(reflectedRowCol).forEach(function (rowcolnumber) {
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

        var correlationValue = getPqmethodCorrelation(sortsAsNumbersCloned[i], sortsAsNumbersCloned[i]);


        correlationTableArray[0][0] = correlationValue[0];
        correlationTableArrayFormatted[0][0] = correlationValue[1];

        for (var k = i; k < totalSorts; k++) {
            var correlationValue2 = getPqmethodCorrelation(pullX, sortsAsNumbersCloned[k]);

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

    localStorage.setItem("correlationTableArrayFormatted", JSON.stringify(correlationTableArrayFormatted));
    localStorage.setItem("respondentNames", JSON.stringify(names));
    localStorage.setItem("originalCorrelationValues", JSON.stringify(correlationTableArray));

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

    //  var tableWidth = ($("#section3").width()) * .9;

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


//
//"columnDefs": [{
//    targets: [2, 3, 5, 6],
//    className: 'dt-body-right',
//}, {
//    targets: [0, 1, 4, 7],
//    className: 'dt-body-center'
//}, {
//    targets: [0],
//    orderData: [0, 1]
//}, {
//    targets: [2],
//    orderData: [2]
//}, {
//    targets: [3],
//    orderData: [3]
//}, {
//    targets: [4],
//    orderData: [4, 3]
//}, {
//    targets: [5],
//    orderData: [5]
//}, {
//    targets: [6],
//    orderData: [6]
//}, {
//    targets: [7],
//    orderData: [7, 6]
//}],
//


// helper functions
// **************************************************************************   model
// ***** check for unique names and sanitize  ***************************************
// **********************************************************************************
function checkUniqueName(namesFromExistingData) {
    var namesUniqueArrayTest2 = _.cloneDeep(namesFromExistingData);
    var namesUniqueArrayTest = _.uniq(namesUniqueArrayTest2);

    if (namesFromExistingData.length !== namesUniqueArrayTest.length) {
        for (var i = 0; i < namesFromExistingData.length; i++) {
            // stripping out "." because of display error in datatables
            var ii = i + 1;
            var currentName = namesFromExistingData[i];
            var currentName2 = currentName.replace(/\./g, "");
            namesFromExistingData[i] = ii + "_" + currentName2;
        }
    } else {
        for (var j = 0; j < namesFromExistingData.length; j++) {
            // stripping out "." because of display error in datatables
            namesFromExistingData[j] = namesFromExistingData[j].replace(/\./g, " ");
        }
    }
    return namesFromExistingData;
}

/*******************************************************************************
 *******************************************************************************
 *******************************************************************************
 *********   WITH UNIT TESTS IN JASMINE   **************************************
 *******************************************************************************
 *******************************************************************************
 *******************************************************************************
 ******************************************************************************/


// todo - dry out repeated functions - getDataColumnTotals() and calculateColumnSums()

// **************************************************************************   model
// ***** sum columns ****************************************************************
// **********************************************************************************
// returns column total minus 1
function getDataColumnTotals(dataArray) {
    var columnTotals = [];
    var sum;
    var sum1;
    var j, i;
    var loopLen = dataArray.length;

    for (j = 0; j < loopLen; j++) {
        sum = 0;
        for (i = 0; i < loopLen; i++) {
            sum += dataArray[i][j];
        }
        sum = sum - 1;
        sum1 = evenRound((sum), 8);
        columnTotals.push(sum1);
    }
    return columnTotals;
}


// **************************************************************************   model
// ***** Calculate Column Sums ******************************************************
// **********************************************************************************
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


// *************************************************************************   model
// ***** calculate Minimum Value and Array Index Value *****************************
// *********************************************************************************
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

//****************************************************************************  model
//****  calculate PQMethod type correlations    *************************************
//***********************************************************************************

function getPqmethodCorrelation(x, y) {

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
}

/* ***************************************************************************  model
// **************** convert sorts and shift to positive values **********************
// **********************************************************************************
*/
function convertSortsTextToNumbers(sortsTextFromDb, originalSortSize) {

    console.time("convertNumbers");
    var sortsAsNumbers = [];
    var maxArrayValue;

    // skip conversion if data coming from somewhere other than pasted data
    if (_.isArray(sortsTextFromDb[0]) === false) {
        _(sortsTextFromDb).forEach(function (element) {
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
    } else {
        sortsAsNumbers = _.cloneDeep(sortsTextFromDb);
    }
    localStorage.setItem("sortsAsNumbers", JSON.stringify(sortsAsNumbers));

    // shift sorts to positive range
    maxArrayValue = _.max(sortsAsNumbers[0]);
    _(sortsAsNumbers).forEach(function (element) {
        var j;
        var loopLen = originalSortSize;

        for (j = 0; j < loopLen; j++) {
            element[j] = element[j] + maxArrayValue + 1;
        }
    }).value();
    localStorage.setItem("positiveShiftedRawSorts", JSON.stringify(sortsAsNumbers));
    console.timeEnd("convertNumbers");
    return sortsAsNumbers;
}

// **************************************************************************   model
// ***** check for positive manifold ************************************************
// **********************************************************************************

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


// *************************************************************************   model
// ***** calculate positive manifold ***********************************************
// *********************************************************************************
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