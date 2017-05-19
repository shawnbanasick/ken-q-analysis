//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global numeric, ROTA, jQuery, resources, alasql, CENTROID, VIEW, window, QAV, $, document, JQuery, evenRound, UTIL, localStorage, _ */

(function(LOAD, QAV, undefined) {

    // custom sorting function for rotation table to get factor grouping in right order
    (function() {
        $.extend($.fn.dataTableExt.oSort, {
            "highestFactor-pre": function(a) {

                var front = a.slice(0, 2);
                var back = a.slice(3, a.length);

                switch (front) {
                    case "F1":
                        return (parseInt(back));
                    case "F2":
                        return (parseInt(back) + 300);
                    case "F3":
                        return (parseInt(back) + 600);
                    case "F4":
                        return (parseInt(back) + 900);
                    case "F5":
                        return (parseInt(back) + 1200);
                    case "F6":
                        return (parseInt(back) + 1500);
                    case "F7":
                        return (parseInt(back) + 1800);
                    default:
                        return (parseInt(back) + 2100);
                }
            },

            "highestFactor-asc": function(a, b) {
                return ((a < b) ? -1 : ((a > b) ? 1 : 0));
            },

            "highestFactor-desc": function(a, b) {
                return ((a < b) ? 1 : ((a > b) ? -1 : 0));
            }
        });
    })();

    // ****************************************************************** model
    // *****  split bipolar factors and call dataTable update *****************
    // ************************************************************************

    // todo - is bipolar split keeping user-inserted flags for table re-draw????

    LOAD.factorSplitFunction = function(factorNumber) {

        // archive current state to undo split if called
        UTIL.archiveFactorScoreStateMatrixAndDatatable();

        // set split factor flag
        var hasSplitFactor = (+(QAV.getState("hasSplitFactor")) + 1);
        QAV.setState("hasSplitFactor", hasSplitFactor);

        // archive headers for undo function chart redraw
        var archiveHeaders = QAV.getState("factorLabels");
        localStorage.setItem("splitFactorHeadersArchive" + hasSplitFactor, JSON.stringify(archiveHeaders));

        // get respondent names
        var results = [];
        var loopLen1 = QAV.getState("qavRespondentNames").length;
        var data = $('#factorRotationTable2').DataTable();

        // retrieve column headers
        var headers = QAV.getState("columnHeadersArray");

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
        var explnVariance = QAV.getState("expVar");

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
        QAV.setState("expVar", explnVariance);

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
        QAV.setState("factorLabels", headers);
        QAV.factorLabels = headers;
        QAV.setState("columnHeadersArray", headers);

        // redraw rotated factors dataTable
        bipolarSplitTableRedraw(headers, results, explnVariance);

        // clear output checkboxes
        VIEW.removeOutputFactorCheckboxes();

        // append bipolar split to the rotation history list
        var language = QAV.getState("language");
        var appendText = resources[language].translation.Factor;
        var appendText2 = resources[language].translation["was split into Factor"];
        var appendText3 = resources[language].translation["_1p and Factor"];
        var appendText4 = resources[language].translation._2n;
        var appendText5 = resources[language].translation.Undo;

        listText = appendText + factorNumber + appendText2 + factorNumber + appendText3 + factorNumber + appendText4;
        $("#rotationHistoryList").append('<li>' + listText + '<button class="deleteSplitFactorButton">' + appendText5 + '</button></li>');
    };



    // ************************************************************ model-view
    // *****  invert factor loadings ****************************************
    // **********************************************************************

    LOAD.factorInvertFunction = function(factorNumber, currentRotationTable) {
        var listText, newData;
        // archive factor rotation table
        UTIL.archiveFactorScoreStateMatrixAndDatatable();

        currentRotationTable = LOAD.invertFactor(factorNumber, currentRotationTable);

        // update Rotation Table Matrix State
        QAV.setState("rotFacStateArray", currentRotationTable);
        // prep data for rotation table re-draw
        newData = LOAD.prepChartDataArray2(currentRotationTable);
        // re-draw rotation table from matrix state
        var isRotatedFactorsTableUpdate = "destroy";
        LOAD.drawRotatedFactorsTable2(isRotatedFactorsTableUpdate, "noFlag");

        var language = QAV.getState("language");
        var appendText = resources[language].translation.Factor;
        var appendText2 = resources[language].translation["was inverted"];
        var appendText3 = resources[language].translation.Undo;

        // append text to rotation history
        listText = appendText + " " + factorNumber + " " + appendText2;
        $("#rotationHistoryList").append('<li>' + listText + '<button class="deleteButton">' + appendText3 + '</button></li>');

        // clear D3 plot and 2 factor chart
        ROTA.reInitializePlotAndChart();
        return currentRotationTable;
    };

    LOAD.invertFactor = function(factorNumber, currentRotationTable) {
        // change the sign of the factor to invert
        var loopLength = currentRotationTable.length;
        var adjustedFactorNumber = factorNumber - 1;

        for (var i = 0; i < loopLength; i++) {
            currentRotationTable[i][adjustedFactorNumber] = -currentRotationTable[i][adjustedFactorNumber];
        }
        return currentRotationTable;
    };

    // **************************************************************  DATA MODEL
    // **********  undo split factor rotation insertion *************************
    // **************************************************************************

    LOAD.undoSplitFactorRotation = function() {
        var hasSplitFactor = (+(QAV.getState("hasSplitFactor")));

        // reset headers array
        var headers = JSON.parse(localStorage.getItem("splitFactorHeadersArchive" + hasSplitFactor));

        QAV.setState("factorLabels", headers);
        QAV.factorLabels = headers;
        // get counter and data values
        var getSaveRotationArchiveCounter = ROTA.saveRotationArchiveCounter("get");

        // decrement hasSplitFactor for select factors for output checkboxes
        hasSplitFactor = hasSplitFactor - 1;
        QAV.setState("hasSplitFactor", hasSplitFactor);

        // decrement counter
        if (getSaveRotationArchiveCounter > 1) {
            ROTA.saveRotationArchiveCounter("decrease");
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
        var newData2 = QAV.getState("rotFacStateArrayArchive" + retrieveName);

        // re-set archived data to state matrix ==> "rotFactorStateArray"ip
        var rotFacStateArrayPrep1 = _.cloneDeep(newData2[0]);
        QAV.setState("rotFacStateArray", rotFacStateArrayPrep1);

        // pull chart data from retrieved archive array
        var chartData = newData2[1];

        var explVar = newData2[3];
        QAV.setState("expVar", explVar);

        // pull headers from retrieved archive array
        var columnHeadersArray = newData2[2];
        QAV.setState("columnHeadersArray", columnHeadersArray);

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
        var table = $('#factorRotationTable2').DataTable();
        table.destroy();
        $('#factorRotationTable2').empty();

        var isUndo = "no";

        LOAD.createFooter("factorRotationTable2", explVar, isUndo);

        table = $("#factorRotationTable2").DataTable({
            "retrieve": true,
            "searching": false,
            "ordering": true,
            "info": false,
            //"scrollY": 600,
            "scrollCollapse": true,
            "scrollX": true,
            "paging": false,
            "order": [
                [orderingColumn, "asc"]
            ],
            "data": chartData,
            "columns": columnHeadersArray,
            "columnDefs": [{
                'type': 'highestFactor',
                'targets': 2
            }, {
                'targets': columnTargets, // [2, 4, 6, 8, 10, 12, 14],
                'searchable': false,
                'orderable': true,
                'render': function(data, dataIndex) { // (data, type, full, meta) {
                    if (
                        data === "") {
                        return '<input type="checkbox" class="sigCheckbox" /><label></label>';
                    } else {
                        return '<input type="checkbox" class="sigCheckbox" id="d' + dataIndex + '" value="' + data + '" defaultChecked="' + (data === 'true' ? 'checked' : '') + '"' + (data === 'true' ? 'checked="checked"' : '') + ' /><label></label>';
                    }
                }
            }],
            "createdRow": function(row, data, dataIndex) {
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
        VIEW.removeOutputFactorCheckboxes();

        // todo - check to see if firefox still needs this
        return false;
    };

    // ******************************************************************* view
    // **********  draw rotated factors table using jquery dataTables   *******
    // ************************************************************************

    LOAD.drawRotatedFactorsTable2 = function(isRotatedFactorsTableUpdate, shouldFlag) {

        // pull current table state from global variable
        var chartData = QAV.getState("rotFacStateArray");

        // format data for table
        var newData = LOAD.prepChartDataArray2(chartData);

        // pull out explVar
        var expVar2 = QAV.getState("expVar");

        // pull out eigenvalues data
        newData.pop();

        // get row colors
        var rowColorsGray = getGrayColors();
        var rowColorsRainbow = getRainbowColors();

        // get rowbackground and order from DOM user input radio
        var rowBackground = $("#section6 input[name=state2]:checked").val();
        var orderingColumn = +($("#section6 input[name=state1]:checked").val());

        // var declarations
        var loopLength = chartData[0].length + 1;
        var temp;
        var columnHeadersArray = [];

        ROTA.calculateFactorLoadingSignificanceLevel();

        columnHeadersArray.push({
            title: 'No.',
            class: "dt-head-center dt-body-center"
        }, {
            title: 'Respond.',
            class: 'dt-head-center dt-body-center'
        }, {
            title: 'FG',
            class: "dt-head-center dt-body-center"
        });

        for (var i = 1; i < loopLength; i++) {

            temp = {
                title: 'Ftr ' + i,
                class: "dt-head-center dt-body-right"
            };
            columnHeadersArray.push(temp);
            columnHeadersArray.push({
                title: 'flag',
                class: "dt-head-center dt-body-center"
            });
        }
        columnHeadersArray.push({
            title: 'h<sup>2</sup>',
            class: "dt-head-center dt-body-right"
        });

        QAV.setState("columnHeadersArray", columnHeadersArray);

        var columnTargets = [];
        var targetLoopLen = columnHeadersArray.length;
        for (var k = 4; k < targetLoopLen; k += 2) {
            columnTargets.push(k);
        }

        var columnTargets2 = [];
        for (var m = 1; m < targetLoopLen; m += 2) {
            columnTargets2.push(m);
        }

        // if table, remove from DOM and draw table
        var table, factorSortedData;

        if (isRotatedFactorsTableUpdate === "highlighter") {
            factorSortedData = QAV.colorButtonChartData;
            // unload that heavy property
            QAV.colorButtonChartData = "";
        } else {
            factorSortedData = LOAD.rotationTableSortByFactor(newData);
        }

        var isUndo = "no";
        LOAD.createFooter("factorRotationTable2", expVar2, isUndo);


        // todo - temporarily disabled update because autoflagging issues
        if (isRotatedFactorsTableUpdate === "yes") {


            table = $('#factorRotationTable2').DataTable();
            table.clear();

            LOAD.createFooter("factorRotationTable2", expVar2, isUndo);

            table.rows.add(factorSortedData).draw();

        } else if (isRotatedFactorsTableUpdate === "destroy") {

            table = $('#factorRotationTable2').DataTable();
            table.destroy();
            $('#factorRotationTable2').empty();

            LOAD.createFooter("factorRotationTable2", expVar2, "no");

            table = $("#factorRotationTable2").DataTable({
                "retrieve": true,
                "searching": false,
                "ordering": true,
                "info": false,
                // "scrollY": 600,
                "scrollCollapse": true,
                "scrollX": true,
                "paging": false,
                "order": [
                    [orderingColumn, "asc"]
                ],
                "data": factorSortedData,
                "columns": columnHeadersArray,
                "columnDefs": [{
                    'type': 'highestFactor',
                    'targets': 2
                }, {
                    'targets': columnTargets, // [ 4, 6, 8, 10, 12, 14, 16],
                    'searchable': false,
                    'orderable': true,
                    'render': function(data, dataIndex) { // (data, type, full, meta) {
                        if (
                            data === "") {
                            return "";
                        } else if (shouldFlag === "flag") {

                            return '<input type="checkbox" class="sigCheckbox" id="d' + dataIndex + '" value="' + data + '" defaultChecked="' + (data === 'true' ? 'checked' : '') + '"' + (data === 'true' ? 'checked="checked"' : '') + ' /><label></label>';
                        } else {
                            return '<input type="checkbox" class="sigCheckbox" /><label></label>';
                        }
                    }
                }],
                "createdRow": function(row, data, dataIndex) {
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
        } else {

            // added for color button
            if (isRotatedFactorsTableUpdate === "highlighter") {
                table = $('#factorRotationTable2').DataTable();
                table.destroy();
                $('#factorRotationTable2').empty();
                LOAD.createFooter("factorRotationTable2", expVar2, "no");
            }
            table = $("#factorRotationTable2").DataTable({
                "retrieve": true,
                "searching": false,
                "ordering": true,
                "info": false,
                // "scrollY": 600,
                "scrollCollapse": true,
                "scrollX": true,
                "paging": false,
                "order": [
                    [orderingColumn, "asc"]
                ],
                "data": factorSortedData,
                "columns": columnHeadersArray,
                "columnDefs": [{
                    'type': 'highestFactor',
                    'targets': 2
                }, {
                    'targets': columnTargets, // [2, 4, 6, 8, 10, 12, 14],
                    'searchable': false,
                    'orderable': true,
                    'render': function(data, dataIndex) { // (data, type, full, meta) {
                        if (data === "") {
                            return '<input type="checkbox" class="sigCheckbox" /><label></label>';
                        } else {
                            return '<input type="checkbox" class="sigCheckbox" id="d' + dataIndex + '" value="' + data + '" defaultChecked="' + (data === 'true' ? 'checked' : '') + '"' + (data === 'true' ? 'checked="checked"' : '') + ' /><label></label>';
                        }
                    }
                }],
                "createdRow": function(row, data, dataIndex) {
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
    };



    LOAD.createFooter = function(element, expVar2, isUndo) {
        var hasFooter = $("#factorRotationTable2 tfoot");
        var checkFooter = ((hasFooter.text()));

        if (checkFooter.length !== 0 || isUndo === "yes") {

            var table = $('#factorRotationTable2').DataTable();

            for (var g = 0; g < expVar2.length; g++) {
                var column = table.column(g);
                $(column.footer()).html(expVar2[g]);
            }
        } else {
            var footer = document.createElement('tfoot');
            var tr = document.createElement('tr');

            jQuery.each(expVar2, function(i, value) {
                var th = document.createElement('th');
                th.innerHTML = value;
                tr.appendChild(th);
            });
            footer.appendChild(tr);
            document.getElementById(element).appendChild(footer);
        }
    };


    // ************************************************************  DATA MODEL
    // **********  undo factor rotation insertion ****************************
    // ***********************************************************************
    LOAD.undoFactorRotation = function() {

        // get counter and data values
        var getSaveRotationArchiveCounter = ROTA.saveRotationArchiveCounter("get");

        // decrement counter
        if (getSaveRotationArchiveCounter > 1) {
            ROTA.saveRotationArchiveCounter("decrease");
        }

        // adjust counter value
        var retrieveName = getSaveRotationArchiveCounter - 1;

        // retrieve archived data using the now adjusted counter
        var newData2 = QAV.getState("rotFacStateArrayArchive" + retrieveName);

        // re-set archived data to state matrix ==> "rotFactorStateArray"ip
        var rotFacStateArrayPrep1 = _.cloneDeep(newData2[0]);
        QAV.setState("rotFacStateArray", rotFacStateArrayPrep1);

        // pull chart data from retrieved archive array
        var chartData = newData2[1];

        var explVar = newData2[3];
        QAV.setState("expVar", explVar);

        var isUndo = "yes";

        LOAD.createFooter("factorRotationTable2", explVar, isUndo);

        // redraw the rotated factors table
        var table = $('#factorRotationTable2').DataTable();
        table.clear();
        table.rows.add(chartData).draw();

        // clear out the 2 factor rotation chart and D3 plot
        ROTA.reInitializePlotAndChart();
    };

    // ******************************************************  DATA MODEL
    // **** chartData ARRAY TO resultsArray OBJECT FOR datatables *******
    // ******************************************************************
    LOAD.prepChartDataArray2 = function(chartData) {
        var arrayLength = chartData.length;
        var arrayLength2 = chartData[0].length;
        var resultsArray = [];
        var respondentNames = QAV.getState("qavRespondentNames");
        var fSig = QAV.getState("fSigCriterionResults");
        var rowH2 = QAV.getState("rowH2");

        for (var j = 0; j < arrayLength; j++) {
            var tempObj2 = [];
            tempObj2.push(respondentNames[j]);

            for (var m = 0; m < arrayLength2; m++) {
                tempObj2.push(chartData[j][m]);
                tempObj2.push(fSig[j][m]);
            }
            tempObj2.push(rowH2[j]);
            resultsArray.push(tempObj2);
        }
        // calculate eigenvalues and variance and add to results array
        var eigenvaluesAndVariance = ROTA.calculateEigenvaluesAndVariance2();
        resultsArray.push(eigenvaluesAndVariance[0]);
        return resultsArray;
    };

    LOAD.rotationTableSortByFactor = function(newData) {
        var sortingArray = [];
        var factorSortedData = [];
        var tempObj;
        var newData2 = _.cloneDeep(newData);

        for (var i = 0, iLen = newData.length; i < iLen; i++) {
            tempObj = {};
            newData2[i].pop();
            var pullNumbers = _.pick(newData2[i], _.isNumber);

            tempObj.maxValue = _.max(pullNumbers);
            tempObj.minValue = _.min(pullNumbers);
            tempObj.sortNum = (i + 1);
            tempObj.compareValue = (Math.abs(tempObj.maxValue) - Math.abs(tempObj.minValue));
            if (tempObj.compareValue >= 0) {
                tempObj.indexValue = _.indexOf(newData[i], tempObj.maxValue);
                tempObj.subSortValue = tempObj.maxValue;
            } else {
                tempObj.indexValue = _.indexOf(newData[i], tempObj.minValue);
                tempObj.subSortValue = Math.abs(tempObj.minValue);
            }
            tempObj.sort = newData[i];
            sortingArray.push(tempObj);
        }

        var factorSortedArray = _.cloneDeep(sortingArray);
        // sort object by two properties
        factorSortedArray.sort(function(a, b) {
            var value = a.indexValue - b.indexValue;
            return value ? value : b.subSortValue - a.subSortValue;
        });

        var modifiedIndexValue = {
            1: 1,
            3: 2,
            5: 3,
            7: 4,
            9: 5,
            11: 6,
            13: 7,
            15: 8
        };

        var factorGroupNumber, lookUpIndexValue;
        var subGroupCounter = 0;
        for (var j = 0, jLen = factorSortedArray.length; j < jLen; j++) {
            lookUpIndexValue = (factorSortedArray[j].indexValue);
            if (j === 0 || lookUpIndexValue === factorSortedArray[j - 1].indexValue) {
                subGroupCounter = subGroupCounter + 1;
            } else {
                subGroupCounter = 1;
            }
            factorGroupNumber = "F" + modifiedIndexValue[lookUpIndexValue] + "-" + subGroupCounter;
            factorSortedArray[j].sort.splice(1, 0, factorGroupNumber);
            factorSortedArray[j].sort.unshift(factorSortedArray[j].sortNum);
            factorSortedData.push(factorSortedArray[j].sort);
        }
        return factorSortedData;
    };

    // **************************************************************  Data Model
    // **********  set background colors of factor loading table ****************
    // **************************************************************************
    function getRainbowColors() {
        var rowColorsRainbow = {
            "F1": "#f7fcf0",
            "F2": "#e0f3db",
            "F3": "#ccebc5",
            "F4": "#a8ddb5",
            "F5": "#7bccc4",
            "F6": "#4eb3d3",
            "F7": "#2b8cbe",
            "F8": "#9cbbd7"
        };
        return rowColorsRainbow;
    }

    function getGrayColors() {
        var rowColorsGray = {
            "F1": "#ffffff",
            "F2": "#f0f0f0",
            "F3": "#d9d9d9",
            "F4": "#bdbdbd",
            "F5": "#969696",
            "F6": "#737373",
            "F7": "#d9d9d9",
            "F8": "whitesmoke"
        };
        return rowColorsGray;
    }

    // *********************************************************************** view
    // *****  draw bipolar split rotated factors table using jquery dataTables ****
    // ****************************************************************************

    function bipolarSplitTableRedraw(headers, results, explVar) {

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
        LOAD.createFooter("factorRotationTable2", explVar, isUndo);

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
            "order": [
                [orderingColumn, "asc"]
            ],
            "data": results,
            "columns": headers,
            "columnDefs": [{
                'type': 'highestFactor',
                'targets': 2
            }, {
                'targets': columnTargets2, // todo - find out if this is working properly
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
                'render': function(data, dataIndex) { // (data, type, full, meta) {
                    if (
                        data === "") {
                        return '<input type="checkbox" class="sigCheckbox" /><label></label>';
                    } else {
                        return '<input type="checkbox" class="sigCheckbox" id="d' + dataIndex + '" value="' + data + '" defaultChecked="' + (data === 'true' ? 'checked' : '') + '"' + (data === 'true' ? 'checked="checked"' : '') + ' /><label></label>';
                    }
                }
            }],
            "createdRow": function(row, data, dataIndex) {
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

}(window.LOAD = window.LOAD || {}, QAV));
