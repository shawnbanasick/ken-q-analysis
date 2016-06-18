//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global localStorage: false, swal: false, sessionStorage: false, console: false, $: false, _: false, d3: false, Handsontable:false, window: false; evenRound: false, document: false*/

// todo - remove factor selection from localStorage 

$(document).ready(function () {


    $("#autoflagButton").on("click", function (e) {
        e.preventDefault();

        var testForSplit = localStorage.getItem("hasSplitFactor");
        if (testForSplit > 0) {
            VIEW.showDisabledFunctionsAfterSplitModal();
        } else {

            // get copy of current rotations state matrix
            var rotFacStateArray = _.cloneDeep(JSON.parse(localStorage.getItem("rotFacStateArray")));

            // prep for chart
            calculateCommunalities(rotFacStateArray);

            /* gets array for fSig testing from LS of calculateCommunalities - sets fSigCriterionResults  --- also "flag" parameter causes display of sig factor loadings in current facor loadings table  */
            calculatefSigCriterionValues("flag");



            // re-draw rotation table without destroy
            var isRotatedFactorsTableUpdate = "destroy";
            // var isRotatedFactorsTableUpdate = "yes";
            drawRotatedFactorsTable2(isRotatedFactorsTableUpdate, "flag");
        }
    });

});




// **************************************************************************** model
// **********  split bipolar factors and call dataTable update **********************
// **********************************************************************************

// todo - is bipolar split keeping user-inserted flags for table re-draw????

function factorSplitFunction(factorNumber) {

    // archive current state to undo split if called
    archiveFactorScoreStateMatrixAndDatatable();

    // set split factor flag
    var hasSplitFactor = (+(localStorage.getItem("hasSplitFactor")) + 1);
    localStorage.setItem("hasSplitFactor", hasSplitFactor);

    // archive headers for undo function chart redraw 
    var archiveHeaders = _.cloneDeep(JSON.parse(localStorage.getItem("factorLabels")));
    localStorage.setItem("splitFactorHeadersArchive" + hasSplitFactor, JSON.stringify(archiveHeaders));

    // get respondent names
    var results = [];
    var loopLen1 = JSON.parse(localStorage.getItem("qavRespondentNames")).length;
    var data = $('#factorRotationTable2').DataTable();

    // retrieve column headers
    var headers = JSON.parse(localStorage.getItem("columnHeadersArray"));

    // reconstruct headers
    var headersIndexLookupArray = [];
    for (var k = 0; k < headers.length; k++) {
        var temp = headers[k].title;
        headersIndexLookupArray.push(temp);
    }

    // construct look-up value 
    var formattedFactorNumber = "Ftr " + factorNumber;
    var insertionNumber = headersIndexLookupArray.indexOf(formattedFactorNumber);

    // push just results into new array
    for (var i = 0; i < loopLen1; i++) {
        var data2 = data.row(i).data();
        results.push(data2);
    }

    // pull in the explnVariance 
    var explnVariance = JSON.parse(localStorage.getItem("expVar"));

    // j loop through sorts
    var listText, j;
    var loopLength = results.length;
    for (j = 0; j < loopLength; j++) {

        // grab current values of factor to be split
        var temp1 = results[j][insertionNumber];
        var temp1Flag = results[j][insertionNumber + 1];

        // invert signs of new split factor
        var temp2 = -temp1;

        // remove flag if insertion value is negative
        if (temp2 < 0) {
            temp1Flag = "false";
        }

        // remove flags for original factor if negative
        if (results[j][insertionNumber] < 0) {
            results[j][insertionNumber + 1] = "false";
        }

        // insert the now inverted new factor values
        results[j].splice(insertionNumber + 2, 0, temp2);
        results[j].splice(insertionNumber + 3, 0, temp1Flag);
    }

    // insert gaps for new split factor in explnVariance and eigenvalue rows
    explnVariance.splice(insertionNumber + 2, 0, "");
    explnVariance.splice(insertionNumber + 3, 0, "");
    localStorage.setItem("expVar", JSON.stringify(explnVariance));

    // append explnVariance and eigenvalue rows back into table data
    var negativeFactorName1 = ("Ftr " + factorNumber + "2");
    var negativeFactorName = negativeFactorName1.toString();

    var positiveFactorName1 = ("Ftr " + factorNumber + "1");
    var positiveFactorName = positiveFactorName1.toString();

    // copy original header for spliced factor
    var duplicateName = [{
        "title": negativeFactorName,
        class: "dt-head-center dt-body-right"
    }, {
        "title": "flag",
        class: "dt-head-center dt-body-center"
    }];

    // splice in the name of the split factor
    headers.splice(insertionNumber + 2, 0, duplicateName[0]);
    headers.splice(insertionNumber + 3, 0, duplicateName[1]);

    // change original factor name
    var originalName = [{
        "title": positiveFactorName,
        class: "dt-head-center dt-body-right"
    }, {
        "title": "flag",
        class: "dt-head-center dt-body-center"
    }];
    headers[insertionNumber] = originalName[0];
    headers[insertionNumber + 1] = originalName[1];

    // todo - fix double storage issue of headers hack to deal with selection of factors for bipolar split after a previous bipolar split

    // set headers to storage for use by output function cascade (?)
    localStorage.setItem("factorLabels", JSON.stringify(headers));
    QAV.factorLabels = headers;
    localStorage.setItem("columnHeadersArray", JSON.stringify(headers));


    // redraw rotated factors dataTable
    bipolarSplitTableRedraw(headers, results, explnVariance);

    // clear output checkboxes
    removeOutputFactorCheckboxes();

    // append bipolar split to the rotation history list
    listText = "Factor " + factorNumber + " was split into Factor " + factorNumber + "_1p and Factor " + factorNumber + "_2n";
    $("#rotationHistoryList").append('<li>' + listText + '<button class="deleteSplitFactorButton">undo</button></li>');
}

// ***************************************************************************** view
// *****  draw bipolar split rotated factors table using jquery dataTables **********
// **********************************************************************************

function bipolarSplitTableRedraw(headers, results, explVar) {

    // var explVar = results.pop(;

    //results.push(explVar);

    // get column ids for table formatting
    var columnTargets = [];
    var targetLoopLen = headers.length;
    for (var k = 4; k < targetLoopLen; k += 2) {
        columnTargets.push(k);
    }
    var columnTargets2 = [];
    for (var m = 1; m < targetLoopLen; m += 2) {
        columnTargets2.push(m);
    }

    // remove previous table and headers from DOM
    var table = $('#factorRotationTable2').DataTable();
    table.destroy();
    $('#factorRotationTable2').empty();

    var isUndo = "no";
    createFooter("factorRotationTable2", explVar, isUndo);

    // get row colors
    var rowColorsGray = getGrayColors();
    var rowColorsRainbow = getRainbowColors();

    // get rowbackground and order from DOM user input radio
    var rowBackground = $("#section6 input[name=state2]:checked").val();
    var orderingColumn = +($("#section6 input[name=state1]:checked").val());



    // draw new table
    table = $('#factorRotationTable2').DataTable({
        "retrieve": true,
        "searching": false,
        "ordering": true,
        "info": false,
        //"scrollY": 600,
        // "scrollY": "auto",
        "scrollCollapse": true,
        "scrollX": true,
        "paging": false,
        "order": [[orderingColumn, "asc"]],
        "data": results,
        "columns": headers,
        "columnDefs": [
            {
                'type': 'highestFactor',
                'targets': 2
            },
            {
                'targets': columnTargets2, // todo - find out why this doesn't work
                'className': 'dt-body-right',
                'orderable': true,
            }, {
                'targets': [0],
                'className': 'dt-body-center dt-body-name',
                'orderable': true
            }, {
                'targets': columnTargets, // [2, 4, 6, 8, 10, 12, 14],
                'searchable': false,
                'orderable': true,
                'className': 'dt-body-right',
                'render': function (data) { // (data, type, full, meta) {
                    if (
                        data === "") {
                        return "";
                    } else {
                        return '<input type="checkbox" class="sigCheckbox" name="d' + data + '" value="' + data + '" defaultChecked="' + (data === 'true' ? 'checked' : '') + '"' + (data === 'true' ? 'checked="checked"' : '') + ' />';
                    }
                }
            }],
        "createdRow": function (row, data, dataIndex) {
            var rowGroup;
            if (rowBackground === "gray") {
                rowGroup = data[2].slice(0, 2);
                //var rowGroupColor = (rowColorsGray[rowGroup]).toString();
                $('td', row).css('background-color', rowColorsGray[rowGroup]);
            } else if (rowBackground === "colors") {
                rowGroup = data[2].slice(0, 2);
                //var rowGroupColor = (rowColorsGray[rowGroup]).toString();
                $('td', row).css('background-color', rowColorsRainbow[rowGroup]);
            }
        }
    });
}


// *********************************************************************** model-view
// *****  invert factor loadings ****************************************************
// **********************************************************************************

function factorInvertFunction(factorNumber, currentRotationTable) {

    // declare variables
    var listText, newData;
    var loopLength = currentRotationTable.length;
    var adjustedFactorNumber = factorNumber - 1;

    // archive factor rotation table
    archiveFactorScoreStateMatrixAndDatatable();

    // change the sign of the factor to invert
    for (var i = 0; i < loopLength; i++) {
        currentRotationTable[i][adjustedFactorNumber] = -currentRotationTable[i][adjustedFactorNumber];
    }

    // update Rotation Table Matrix State
    localStorage.setItem("rotFacStateArray", JSON.stringify(currentRotationTable));

    // prep data for rotation table re-draw
    newData = prepChartDataArray(currentRotationTable);

    // re-draw rotation table from matrix state
    // var isRotatedFactorsTableUpdate = "yes";
    var isRotatedFactorsTableUpdate = "destroy";
    drawRotatedFactorsTable2(isRotatedFactorsTableUpdate, "noFlag");

    // append text to rotation history
    listText = "Factor " + factorNumber + " was inverted";
    $("#rotationHistoryList").append('<li>' + listText + '<button class="deleteButton">undo</button></li>');

    // clear D3 plot and 2 factor chart
    reInitializePlotAndChart();

    return currentRotationTable;
}

// **********************************************************************  DATA MODEL
// **********  undo split factor rotation insertion *********************************
// **********************************************************************************

function undoSplitFactorRotation() {

    var hasSplitFactor = (+(localStorage.getItem("hasSplitFactor")));

    // reset headers array
    var headers = JSON.parse(localStorage.getItem("splitFactorHeadersArchive" + hasSplitFactor));

    localStorage.setItem("factorLabels", JSON.stringify(headers));
    QAV.factorLabels = headers;
    // get counter and data values
    var getSaveRotationArchiveCounter = saveRotationArchiveCounter("get");

    // decrement hasSplitFactor for select factors for output checkboxes
    hasSplitFactor = hasSplitFactor - 1;
    localStorage.setItem("hasSplitFactor", hasSplitFactor);


    // decrement counter
    if (getSaveRotationArchiveCounter > 1) {
        saveRotationArchiveCounter("decrease");
    }

    // adjust counter value
    var retrieveName = getSaveRotationArchiveCounter - 1;

    // get row colors
    var rowColorsGray = getGrayColors();
    var rowColorsRainbow = getRainbowColors();

    // get rowbackground and order from DOM user input radio
    var rowBackground = $("#section6 input[name=state2]:checked").val();
    var orderingColumn = +($("#section6 input[name=state1]:checked").val());


    // retrieve archived data using the now adjusted counter
    var newData2 = JSON.parse(localStorage.getItem("rotFacStateArrayArchive" + retrieveName));

    // re-set archived data to state matrix ==> "rotFactorStateArray"ip
    var rotFacStateArrayPrep1 = _.cloneDeep(newData2[0]);
    localStorage.setItem("rotFacStateArray", JSON.stringify(rotFacStateArrayPrep1));

    // pull chart data from retrieved archive array
    var chartData = newData2[1];

    var explVar = newData2[3];
    localStorage.setItem("expVar", JSON.stringify(explVar));
    // chartData.push(explVar);

    // pull headers from retrieved archive array
    var columnHeadersArray = newData2[2];
    localStorage.setItem("columnHeadersArray", JSON.stringify(columnHeadersArray));

    // set targets from columnHeadersArray
    var columnTargets = [];
    var targetLoopLen = columnHeadersArray.length;
    for (var k = 4; k < targetLoopLen; k += 2) {
        columnTargets.push(k);
    }

    var columnTargets2 = [];
    for (var m = 1; m < targetLoopLen; m += 2) {
        columnTargets2.push(m);
    }

    // todo - DRY this out
    // redraw the rotated factors table
    table = $('#factorRotationTable2').DataTable();
    table.destroy();
    $('#factorRotationTable2').empty();

    var isUndo = "no";

    createFooter("factorRotationTable2", explVar, isUndo);

    table = $("#factorRotationTable2").DataTable({
        "retrieve": true,
        "searching": false,
        "ordering": true,
        "info": false,
        //"scrollY": 600,
        "scrollCollapse": true,
        "scrollX": true,
        "paging": false,
        "order": [[orderingColumn, "asc"]],
        "data": chartData,
        "columns": columnHeadersArray,
        "columnDefs": [
            {
                'type': 'highestFactor',
                'targets': 2
            },
            {
                'targets': columnTargets, // [2, 4, 6, 8, 10, 12, 14],
                'searchable': false,
                'orderable': true,
                'render': function (data) { // (data, type, full, meta) {
                    if (
                        data === "") {
                        return "";
                    } else {
                        return '<input type="checkbox" class="sigCheckbox" name="d' + data + '" value="' + data + '" defaultChecked="' + (data === 'true' ? 'checked' : '') + '"' + (data === 'true' ? 'checked="checked"' : '') + ' />';
                    }
                }
        }],
        "createdRow": function (row, data, dataIndex) {
            var rowGroup;
            if (rowBackground === "gray") {
                rowGroup = data[2].slice(0, 2);
                //var rowGroupColor = (rowColorsGray[rowGroup]).toString();
                $('td', row).css('background-color', rowColorsGray[rowGroup]);
            } else if (rowBackground === "colors") {
                rowGroup = data[2].slice(0, 2);
                //var rowGroupColor = (rowColorsGray[rowGroup]).toString();
                $('td', row).css('background-color', rowColorsRainbow[rowGroup]);
            }
        }
    });

    // clear out the 2 factor rotation chart and D3 plot
    // reInitializePlotAndChart();
    $("#chartAndTableDisplayContainer").hide();

    // clear output checkboxes
    removeOutputFactorCheckboxes();
}