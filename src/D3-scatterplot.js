//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global localStorage: false, QAV, swal: false, sessionStorage: false, console: false, $: false, _: false, d3: false, evenRound:false, window: false; evenRound: false, document: false*/

// todo - remove factor selection from localStorage
// todo - fix bug - apply varimax twice then undo gives strange results

$(document).ready(function () {

    // initialize D3 chart and 2 factor rotation chart
    // reInitializePlotAndChart();

    // reset 'has split factor' marker
    var hasSplitFactor = 0;
    localStorage.setItem("hasSplitFactor", hasSplitFactor);

    // triggered by "Display Selected Factors" button
    $("#generateRotationItemsButton").on("click", function (e) {
        e.preventDefault();
        var rotFacStateArray = JSON.parse(localStorage.getItem("rotFacStateArray"));
        var tempRotFacStateArray = _.cloneDeep(rotFacStateArray);
        localStorage.setItem("tempRotFacStateArray", JSON.stringify(tempRotFacStateArray));

        // pull the selected factors and then pull their data
        setRotationFactorsFromCheckbox();
        setTwoFactorRotationalArray(rotFacStateArray);

        // expects bare full array
        var arrayWithCommunalities = calculateCommunalities(rotFacStateArray);

        // prep for D3 chart autoflagging tests
        // var d3AutoflaggingPrep = d3Autoflagging(arrayWithCommunalities);

        // gets array for fSig testing from LS of calculateCommunalities - sets fSigCriterionResults
        calculatefSigCriterionValues("flag");

        // returns dataValuesArray for D3 chart
        // creates arrays for table/D3 (LS) from state
        var d3Prep = doD3ChartDataPrep(arrayWithCommunalities);

        $("#chartAndTableDisplayContainer").show();

        drawD3Chart(d3Prep);
        // clone the state array to prevent changes
        var chartData = _.cloneDeep(rotFacStateArray);
        var prepTwoFactorTable = prepTwoFactorUpdateHandsontable(chartData);

        // set baseline data to calc "change due to factor rotation" (2 factor)
        var baseLineData = _.cloneDeep(prepTwoFactorTable);
        localStorage.setItem("baseLineData", JSON.stringify(baseLineData));

        // creates 2 factor rotation display table data
        updateDatatable1(prepTwoFactorTable);

        // reset degree display, button color and stored value
        $("#handRotationDisplayContainer div").html("0&deg");
        sessionStorage.setItem("rotationDegreeDisplayValue", 0);
        var rotationDegreeDisplayValue = 0;
        saveRotationButtonColor(rotationDegreeDisplayValue);

        //draw rotation table for the first time
        // var isRotatedFactorsTableUpdate = "no";
        var isRotatedFactorsTableUpdate = "destroy";
        drawRotatedFactorsTable2(isRotatedFactorsTableUpdate, "noFlag");
    });

    // rotation button 1 event listener
    $("#clockwiseButton").on("click", function (e) {
        e.preventDefault();
        var rotationDegreeDisplayValue = parseInt(sessionStorage.getItem("rotationDegreeDisplayValue"));

        var rotationDegree = parseInt($("#rotationDisplayInput").val());
        rotationDegreeDisplayValue = rotationDegreeDisplayValue + rotationDegree;
        var rotationDegreeDisplay = $("#handRotationDisplayContainer div");
        rotationDegreeDisplay.html(rotationDegreeDisplayValue + "&deg");

        sessionStorage.setItem("rotationDegreeDisplayValue", rotationDegreeDisplayValue);

        saveRotationButtonColor(rotationDegreeDisplayValue);

        calculateRotatedFactors(rotationDegree);
    });

    // rotation button 2 event listener
    $("#counter-clockwiseButton").on("click", function (e) {
        e.preventDefault();
        var rotationDegreeDisplayValue = sessionStorage.getItem("rotationDegreeDisplayValue");

        var rotationDegree = parseInt($("#rotationDisplayInput").val());
        rotationDegreeDisplayValue = rotationDegreeDisplayValue - rotationDegree;

        var rotationDegreeDisplay = $("#handRotationDisplayContainer div");
        rotationDegreeDisplay.html(rotationDegreeDisplayValue + "&deg");
        rotationDegree = -rotationDegree;

        sessionStorage.setItem("rotationDegreeDisplayValue", rotationDegreeDisplayValue);

        saveRotationButtonColor(rotationDegreeDisplayValue);
        calculateRotatedFactors(rotationDegree);
    });
    $("#saveRotationButton").on("click", function (e) {
        e.preventDefault();
        saveRotation();
    });


    $("#rotationHistoryList").on("click", "button", function (e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.hasClass("deleteButton") && $this.hasClass("varimaxCalled")) {
            $("#factorVarimaxButton").removeClass("buttonActionComplete").addClass("blackHover").prop('value', 'Apply Varimax Rotation').prop('disabled', false);
            undoFactorRotation();
            $this.parent().remove();
        } else if ($this.hasClass("deleteSplitFactorButton")) {
            undoSplitFactorRotation();
            $this.parent().remove();
        } else if ($this.hasClass("deleteButton")) {
            undoFactorRotation();
            $this.parent().remove();
        }
    });

    // INVERT FACTOR BUTTON - event listener
    $("#invertFactorButton").on("click", function (e) {
        e.preventDefault();

        var rotationHistory = $("#rotationHistoryList li").text();

        if (rotationHistory.indexOf('was split into') >= 0) {
            window.alert("Factor inversion has to be performed before bipolar factor split.");
        } else {

            $('#invertModal').toggleClass('active');
        }
    });

    // SPLIT BIPOLAR FACTOR BUTTON
    $("#splitFactorButton").on("click", function (e) {
        e.preventDefault();
        $('#splitModal').toggleClass('active');
    });

    // click handler for select factor loadings checkboxes
    $('#factorRotationTable2 tbody').on('click', 'tr', function () {
        var table = $('#factorRotationTable2').DataTable(); //
        var data = table
            .rows()
            .data();
    });

    // here
    // control factor loadings table background 
    $("#loadingsRadioSelect2 :radio").on('click', function () {

        var testForSplit = localStorage.getItem("hasSplitFactor");
        if (testForSplit > 0) {
            VIEW.showDisabledFunctionsAfterSplitModal();
        } else {

            $('#loadingsRadioSelect2 input:not(:checked)').parent().removeClass("selected");
            $(this).parent().addClass("selected");
            // todo - find out how to prevent need for table destroy 

            // keep flags - get current table data including flags and redrawn
            var table = $('#factorRotationTable2').DataTable();
            var chartData = table.rows().data();

            QAV.colorButtonChartData = chartData;

            var isRotatedFactorsTableUpdate = "highlighter";
            var shouldFlag = "flag";
            drawRotatedFactorsTable2(isRotatedFactorsTableUpdate, shouldFlag);
        }
    });

    $("#loadingsRadioSelect1 :radio").on('click', function () {
        $('#loadingsRadioSelect1 input:not(:checked)').parent().removeClass("selected");
        $(this).parent().addClass("selected");
        var $radioOption = +($(this).val());
        var table = $('#factorRotationTable2').DataTable();

        if ($radioOption === 0) {
            table.order([0, 'asc']).draw();
        } else if ($radioOption === 2) {
            table.order([2, 'asc']).draw();
        }
    });

});


// **********************************************************************  Data Model
// **********  set background colors of factor loading table ************************
// **********************************************************************************


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


// **********************************************************************  Data Model
// **********  Archive function to allow undo of rotations **************************
// **********************************************************************************

function archiveFactorScoreStateMatrixAndDatatable() {

    // saveRotationArchieveCounter is reset to 1 on centroid extraction function call

    // get current table data including flags
    var table = $('#factorRotationTable2').dataTable();
    var chartData = table.fnGetData();


    // get current footer data and push into table data
    var footerData = JSON.parse(localStorage.getItem("expVar"));
    // chartData.push(footerData);

    // get copy of current state matrix
    var rotFacStateArray = _.cloneDeep(JSON.parse(localStorage.getItem("rotFacStateArray")));

    // get copy of current rotation table headers (for undo bipolar split charting)
    var columnHeadersArray = _.cloneDeep(JSON.parse(localStorage.getItem("columnHeadersArray")));


    var archiveArray = [];

    // store curr rotation data, chartdata with user flags, and headers in archive array
    archiveArray.push(rotFacStateArray, chartData, columnHeadersArray, footerData);

    // archive both in local storage with key + counter
    localStorage.setItem("rotFacStateArrayArchive" + saveRotationArchiveCounter("get"), JSON.stringify(archiveArray));

    saveRotationArchiveCounter("increase");
}



// ******************************************************************  VIEW CONTROLER
// **********  re-initialize chart after save rotation or varimax *******************
// **********************************************************************************

function reInitializePlotAndChart() {
    // data to initialize D3 chart

    var testVar = $.fn.dataTable.isDataTable('#twoFactorDisplayTable');

    if (testVar) {
        var emptyArray = [{
            "respondent": "",
            "factor1": 0,
            "factor2": 0
        }];
        var emptyArray2 = [];
        drawD3Chart(emptyArray);
        updateDatatable1(emptyArray2);
    }
}

// **********************************************************************  DATA MODEL
// **********  undo factor rotation insertion ***************************************
// **********************************************************************************

function undoFactorRotation() {

    // get counter and data values
    var getSaveRotationArchiveCounter = saveRotationArchiveCounter("get");

    // decrement counter
    if (getSaveRotationArchiveCounter > 1) {
        saveRotationArchiveCounter("decrease");
    }

    // adjust counter value
    var retrieveName = getSaveRotationArchiveCounter - 1;

    // retrieve archived data using the now adjusted counter
    var newData2 = JSON.parse(localStorage.getItem("rotFacStateArrayArchive" + retrieveName));

    // re-set archived data to state matrix ==> "rotFactorStateArray"ip
    var rotFacStateArrayPrep1 = _.cloneDeep(newData2[0]);
    localStorage.setItem("rotFacStateArray", JSON.stringify(rotFacStateArrayPrep1));

    // pull chart data from retrieved archive array
    var chartData = newData2[1];

    var explVar = newData2[3];
    localStorage.setItem("expVar", JSON.stringify(explVar));

    var isUndo = "yes";

    createFooter("factorRotationTable2", explVar, isUndo);

    // redraw the rotated factors table
    var table = $('#factorRotationTable2').DataTable();
    table.clear();
    table.rows.add(chartData).draw();

    // clear out the 2 factor rotation chart and D3 plot
    reInitializePlotAndChart();
}


// ********************************************************************** model state
// *********  save rotation counter *************************************************
// **********************************************************************************

// always reset to zero on centroid extraction (in centroid.js file)
function saveRotationArchiveCounter(option) {
    var saveRotationCounter = parseInt(localStorage.getItem("saveRotationCounter"));
    if (option === "increase") {
        saveRotationCounter = saveRotationCounter + 1;
        localStorage.setItem("saveRotationCounter", saveRotationCounter);
    } else if (option === "decrease") {
        saveRotationCounter = saveRotationCounter - 1;
        localStorage.setItem("saveRotationCounter", saveRotationCounter);
    } else if (option === "get") {
        return saveRotationCounter;
    } else if (option === "reset") {
        localStorage.setItem("saveRotationCounter", 1);
    }
}

// **********************************************************************  DATA MODEL
// **********  chartData ARRAY TO resultsArray OBJECT FOR HANDSONTABLE **************
// **********************************************************************************
function prepChartDataArray(chartData) {

    var arrayLength = chartData.length;
    var arrayLength2 = chartData[0].length;

    var resultsArray = [];

    var tempObj2;
    var factorNumber;
    var factorSig;
    var respondentNames = JSON.parse(localStorage.getItem("qavRespondentNames"));
    var fSig = JSON.parse(localStorage.getItem("fSigCriterionResults"));
    var rowH2 = JSON.parse(localStorage.getItem("rowH2"));


    for (var j = 0; j < arrayLength; j++) {
        tempObj2 = {
            respondent: respondentNames[j]
        };
        for (var m = 0; m < arrayLength2; m++) {
            factorNumber = "factor" + (m + 1);
            factorSig = "factorSig" + (m + 1);
            tempObj2[factorNumber] = chartData[j][m];
            tempObj2[factorSig] = fSig[j][m];
        }
        tempObj2.communality = rowH2[j];
        resultsArray.push(tempObj2);
    }

    var eigenvaluesAndVariance = calculateEigenvaluesAndVariance();

    resultsArray.push(eigenvaluesAndVariance[0]);

    localStorage.setItem("expVar", JSON.stringify(eigenvaluesAndVariance[1]));

    return resultsArray;
}


// **********************************************************************  DATA MODEL
// **********  chartData ARRAY TO resultsArray OBJECT FOR datatables ****************
// **********************************************************************************
function prepChartDataArray2(chartData) {

    var arrayLength = chartData.length;
    var arrayLength2 = chartData[0].length;

    var resultsArray = [];



    var respondentNames = JSON.parse(localStorage.getItem("qavRespondentNames"));
    var fSig = JSON.parse(localStorage.getItem("fSigCriterionResults"));
    var rowH2 = JSON.parse(localStorage.getItem("rowH2"));


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
    var eigenvaluesAndVariance = calculateEigenvaluesAndVariance2();
    resultsArray.push(eigenvaluesAndVariance[0]);

    return resultsArray;
}

// ****************************************************************************  view
// **********  Rotation button state    *********************************************
// **********************************************************************************

function saveRotationButtonColor(rotationDegreeDisplayValue) {
    var saveRotButton = $("#saveRotationButton");
    if (rotationDegreeDisplayValue !== 0) {
        saveRotButton.removeClass("saveRotationButtonGray")
        saveRotButton.addClass("saveRotationButtonYellow");
    } else {
        saveRotButton.removeClass("saveRotationButtonYellow");
        saveRotButton.addClass("saveRotationButtonGray");
    }
}


// *****************************************************************************
// *************    D3 Code Save as Image   ************************************
// *****************************************************************************
//
// example - http://plnkr.co/edit/MkZcXJPS7hrcWh3M0MZ1?p=preview
// http://www.inkfood.com/svg-to-canvas/
// https: //github.com/sampumon/SVG.toDataURL
// change data format to JSON



// ************************************************************  view controller
// *************    SAVE SELECTED factors for rotation   ***********************
// *****************************************************************************
function setRotationFactorsFromCheckbox() {

    // get the factors to send to 2 factor chart
    var pullFactors = [];
    var checkboxes = document.getElementsByName('radioCheck');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            pullFactors.push(checkboxes[i].value);
        }
    }

    // account for sending null set on page load to display empty chart
    if (pullFactors !== null) {

        var rotationFactorA = pullFactors[0];
        var rotationFactorB = pullFactors[1];

        localStorage.setItem("rotationFactorA", rotationFactorA);
        localStorage.setItem("rotationFactorB", rotationFactorB);
    }
}

// *******************************************************************  data model
// *************   Data format array to object   *********************************
// *******************************************************************************

// CALLED BY "DISPLAY FACTORS FOR ROTATION BUTTON"

function doD3ChartDataPrep(rotFacStateArray) {

    var rotationFactorA = localStorage.getItem("rotationFactorA");
    var rotationFactorB = localStorage.getItem("rotationFactorB");
    var step4 = JSON.parse(localStorage.getItem("qavRespondentNames"));
    var fSigCriterionResults = JSON.parse(localStorage.getItem("fSigCriterionResults"));

    var chartData = _.cloneDeep(rotFacStateArray);
    var dataValuesArray = [];
    var initialTwoFactorTableArray = [];
    var step1, step3, ilen, factorNameArrayFrag, respondent2, factor1c, factor2c;
    var tempObj;

    ilen = chartData.length;
    for (var i = 0; i < ilen; i++) {
        step1 = chartData[i];
        step3 = fSigCriterionResults[i];

        // CONVERT ARRAY TO OBJECT for D3js chart
        tempObj = {
            num: i + 1,
            respondent: step4[i],
            factor1: step1[rotationFactorA - 1],
            factor1Sig: step3[rotationFactorA - 1],
            factor2: step1[rotationFactorB - 1],
            factor2Sig: step3[rotationFactorB - 1],
        };
        dataValuesArray.push(tempObj);
    }

    factorNameArrayFrag = [];
    respondent2 = "";
    factor1c = "Factor " + rotationFactorA;
    factor2c = "Factor " + rotationFactorB;

    factorNameArrayFrag.push(respondent2, factor1c, factor2c);

    initialTwoFactorTableArray.unshift(factorNameArrayFrag);

    return dataValuesArray;
}


// *********************************************************************** view model
// **********  draw D3 Chart  *******************************************************
// **********************************************************************************

function drawD3Chart(dataValuesArray) {
    var rotationFactorA = localStorage.getItem("rotationFactorA");
    var rotationFactorB = localStorage.getItem("rotationFactorB");
    var data;

    d3.select("svg").remove();

    var significanceLevel = calculateFactorLoadingSignificanceLevel();

    data = dataValuesArray;


    var chartSize = $(window).width() / 2.25;

    var margin = {
            top: 20,
            right: 10,
            bottom: 40,
            left: 40
        },

        width = chartSize - margin.left - margin.right,
        height = chartSize - margin.top - margin.bottom;
    //        width = 640 - margin.left - margin.right,
    //        height = 640 - margin.top - margin.bottom;
    // todo - coordinate with canvas size on html so download works

    /*
     * value accessor - returns the value to encode for a given data object.
     * scale - maps value to a visual display encoding, such as a pixel position.
     * map function - maps from data value to display value
     * axis - sets up axis
     */

    // setup x
    var xValue = function (d) {
            return d.factor2;
        }, // data -> value
        xScale = d3.scale.linear().range([0, width]), // value -> display
        xMap = function (d) {
            return xScale(xValue(d));
        }, // data -> display
        xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(2).tickSize(-height, 0, 0);

    // setup y
    var yValue = function (d) {
            return d.factor1;
        }, // data -> value
        yScale = d3.scale.linear().range([height, 0]), // value -> display
        yMap = function (d) {
            return yScale(yValue(d));
        }, // data -> display
        yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(2).tickSize(-width, 0, 0);

    //    var xAxisScale = d3.scale.linear()
    //        .domain([0, width])
    //        .range([0, width]);
    //
    //    var yAxisScale = d3.scale.linear()
    //        .domain([0, height])
    //        .range([height, 0]);

    // todo - remove setup fill color?
    //        var cValue = function (d) {
    //                return d.respondent;
    //            },
    //            color = d3.scale.category10();

    // add the graph canvas to the webpage
    var svg = d3.select("#d3_scatterchart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    //    var svg = d3.select("#d3_scatterchart").append("svg")
    //        .attr("width", width + margin.left + margin.right)
    //        .attr("height", height + margin.top + margin.bottom)
    //        .call(d3.behavior.zoom().on("zoom", function () {
    //            svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");
    //            // svg.select(".x").scale(xAxisScale);
    //            // svg.select(".y").scale(yAxisScale);
    //            //.y(yAxisScale);
    //            // scaling the axis will be complex due to max-min axis setup
    //            // svg.select(".x.axis").scaleExtent(xAxisScale);
    //            // svg.select(".y.axis").scaleExtent(yAxisScale);
    //        }))
    //        .append("g")
    //        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // confirm number format
    data.forEach(function (d) {
        d.factor1 = +d.factor1;
        d.factor2 = +d.factor2;
        d.factor1Sig = d.factor1Sig + '';
        d.factor2Sig = d.factor2Sig + '';
    });

    // check for case with factor loading greater than 1 and adjust axis
    var axisMax;
    var maxXAxis = d3.max(data, xValue);
    var minXAxis = d3.min(data, xValue);
    var maxYAxis = d3.max(data, yValue);
    var minYAxis = d3.min(data, yValue);

    var axisTestArray = [maxXAxis, minXAxis, maxYAxis, minYAxis];
    var maxArrayValue = _.max(axisTestArray);
    var minArrayValue = _.min(axisTestArray);

    if (maxArrayValue > 1 || minArrayValue < -1) {
        if (maxArrayValue > -minArrayValue) {
            axisMax = maxArrayValue;
        } else {
            axisMax = -minArrayValue;
        }
    } else {
        axisMax = 1;
    }

    xScale.domain([-axisMax, +axisMax]);
    yScale.domain([-axisMax, +axisMax]);

    // define the div for the tooltip
    var div = d3.select("body").append("div")
        .attr("class", "d3Tooltip")
        .style("opacity", 0);

    // x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end");
    //  .text("Factor " + rotationFactorB);

    // create x axis title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 35)
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .text("Factor " + rotationFactorB + "  (B)");


    // y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end");
    // .text("Factor " + rotationFactorA);

    // create Y axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .text("Factor " + rotationFactorA + "  (A)");


    /*  drawing dots and circles based on http://jsfiddle.net/eamonnmag/Q567s/   */

    /*    telling D3 that all nodes (g elements with class node) will have data attached to them. The 'key' used (to let D3 know the uniqueness of items) will be the "num" */
    var index = svg.selectAll("g.node").data(data, function (d) {
        return d.num;
    });

    /* 'enter' the data, making the SVG group (to contain a circle and text) with a class node. This corresponds with what we told the data it should be above. */
    var indexGroup = index.enter().append("g").attr("class", "node")
        .attr('transform', function (d) {
            return "translate(" + xMap(d) + "," + yMap(d) + ")";
        });

    // add the circles
    indexGroup.append("circle")
        .attr("r", 9)
        .attr("class", "dot")
        .style("fill", "#83cafe")
        .style("fill", function (d) {
            if (d.factor1Sig === "true") {
                return "#ffe4b2";
            } else if (d.factor2Sig === "true") {
                return "aquamarine";
            } else {
                return "#d8d8d8";
            }
        })
        .on("mouseover", function (d) {
            div.transition()
                .duration(100)
                .style("opacity", 1);
            div.html("<strong>" + d.respondent + "</strong><br>" + yValue(d) + ", 　" + xValue(d))
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function () {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

    // add the text labels
    indexGroup.append("text")
        .style("text-anchor", "middle")
        .attr("font-size", "9px")
        .attr("dy", 3)
        .text(function (d) {
            return d.num;
        })
        .on("mouseover", function (d) {
            div.transition()
                .duration(100)
                .style("opacity", 1);
            div.html("<strong>" + d.respondent + "</strong><br>" + yValue(d) + ", 　" + xValue(d))
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function () {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

    //  todo - check to see if I need to exit the dots

}


// todo - store this info on auto flagging somewhere else
//These are the two standard criteria for automatic flagging used in Q method analysis:
//1. Q-sorts which factor loading is higher than the threshold for p-value < 0.05, and
//2. Q-sorts which square loading is higher than the sum of square loadings of the same Q-sort in
//    all other factors.

// C Flag Item I on Factor J if A^2/H^2 > .5 (Fuerntratt-Criterion) preliminary flagging method
// C *and* a > 1.96/sqrt(nitems)



// ******************************************************************* data analysis
// **********  calc significance Levels  *******************************************
//**********************************************************************************

function calculateFactorLoadingSignificanceLevel() {
    var totalStatements = localStorage.getItem("qavOriginalSortSize");
    var significanceLevel = evenRound((1.96 * (1 / Math.sqrt(totalStatements))), 5);
    return significanceLevel;
}

// **************************************************************************  model
// **********  calc h2 communalities  **********************************************
//**********************************************************************************

function calculateCommunalities(currentFactorData) {

    var calculateCommunalityArray = _.cloneDeep(currentFactorData);

    // calculateCommunalityArray.shift();
    function square(m) {
        return m * m;
    }

    var temp, temp2, temp3, temp4, i, k, roundedValue, chartDataLength;
    var communalitiesArray = [];
    var fSigCriterion = [];

    _.forEach(calculateCommunalityArray, function (n) {
        temp = (_.map(n, square));
        temp2 = temp.reduce(function (a, b) {
            return a + b;
        }, 0);
        temp3 = evenRound((temp2), 5);
        communalitiesArray.push(temp3);

        temp4 = [];
        for (k = 0; k < temp.length; k++) {
            roundedValue = evenRound((temp[k]), 5);
            temp4.push(roundedValue);
        }
        fSigCriterion.push(temp4);
    });

    localStorage.setItem("fSigCriterion", JSON.stringify(fSigCriterion));
    localStorage.setItem("rowH2", JSON.stringify(communalitiesArray));

    chartDataLength = calculateCommunalityArray.length;
    for (i = 0; i < chartDataLength; i++) {
        calculateCommunalityArray[i].push(communalitiesArray[i]);
    }
    return calculateCommunalityArray;
}

// todo - remove conditional formatting for h2 column on rotation history chart

// ***************************************************************************  model
// **********  Calculate Fuerntratt Criterion on Communalities **********************
// **********************************************************************************


// todo - relocate function?  
function calculatefSigCriterionValues(addFlag) {

    var fSigCriterionArray = JSON.parse(localStorage.getItem("fSigCriterion"));
    var sigLevel2 = calculateFactorLoadingSignificanceLevel();
    var sigLevel = sigLevel2 * sigLevel2;
    var arrayLength = fSigCriterionArray.length;
    var arrayLength2 = fSigCriterionArray[0].length;
    var temp1, testValue, others, others2, array, significant;
    var i, j, tempArray;
    var fSigCriterionResults = [];

    for (i = 0; i < arrayLength; i++) {
        temp1 = fSigCriterionArray[i];
        tempArray = [];
        for (j = 0; j < arrayLength2; j++) {
            array = _.clone(temp1);
            testValue = _.pullAt(array, j);
            others2 = array.reduce(function (a, b) {
                return a + b;
            }, 0);
            others = evenRound((others2), 5);

            if (addFlag === "flag") {
                if (testValue > others && testValue > sigLevel) {
                    significant = 'true';
                } else {
                    significant = "false";
                }
            } else {
                significant = 'false';
            }
            tempArray.push(significant);
        }
        fSigCriterionResults.push(tempArray);


    }
    localStorage.setItem("fSigCriterionResults", JSON.stringify(fSigCriterionResults));
}

// ***************************************************************************  model
// **********  Rotation procedure  **************************************************
// **********************************************************************************

function calculateRotatedFactors(rotationDegree) {

    var time0 = performance.now();

    var rotationFactorA = localStorage.getItem("rotationFactorA");
    var rotationFactorB = localStorage.getItem("rotationFactorB");
    var counterClockwiseRotation = false;
    var calculateRotationsArray = JSON.parse(localStorage.getItem("calculateRotationsArray"));
    var tempRotFacStateArray = (JSON.parse(localStorage.getItem("tempRotFacStateArray")));

    var rotatedFactors;
    var looplen = calculateRotationsArray.length;

    if (rotationDegree < 0) {
        counterClockwiseRotation = true;
    }

    rotationDegree = Math.abs(rotationDegree);

    function sinDegrees(num) {
        return Math.sin(num * (Math.PI / 180));
    }

    function cosDegrees(num) {
        return Math.cos(num * (Math.PI / 180));
    }

    function newRotateClockwise(calculateRotationsArray) {
        var transposedArray = _.zip.apply(_, calculateRotationsArray);

        var sinDegreesValue = (sinDegrees(rotationDegree));
        var cosDegreesValue = (cosDegrees(rotationDegree));

        var valueA, valueB;
        var len = transposedArray[0].length;
        var a1Calculations, b1Calculations;
        var a2Calculations, b2Calculations;


        var rotatedFactorsArray = [];
        for (var k = 0; k < len; k++) {

            a1Calculations = transposedArray[1][k] * sinDegreesValue;
            b1Calculations = transposedArray[0][k] * cosDegreesValue;
            valueA = (evenRound((a1Calculations + b1Calculations), 5));

            a2Calculations = transposedArray[0][k] * sinDegreesValue;
            b2Calculations = transposedArray[1][k] * cosDegreesValue;
            valueB = (evenRound((-(a2Calculations - b2Calculations)), 5));

            var tempArray = [];
            tempArray[0] = valueA;
            tempArray[1] = valueB;
            rotatedFactorsArray.push(tempArray);
        }
        return rotatedFactorsArray;
    }

    function newRotateCounterClockwise(calculateRotationsArray) {
        var transposedArray = _.zip.apply(_, calculateRotationsArray);

        var sinDegreesValue = (sinDegrees(rotationDegree));
        var cosDegreesValue = (cosDegrees(rotationDegree));

        var valueA, valueB;
        var len = transposedArray[0].length;
        var a1Calculations, b1Calculations;
        var a2Calculations, b2Calculations;


        var rotatedFactorsArray = [];
        for (var k = 0; k < len; k++) {

            a1Calculations = transposedArray[1][k] * sinDegreesValue;
            b1Calculations = transposedArray[0][k] * cosDegreesValue;
            valueA = (evenRound((-(a1Calculations - b1Calculations)), 5));

            a2Calculations = transposedArray[0][k] * sinDegreesValue;
            b2Calculations = transposedArray[1][k] * cosDegreesValue;
            valueB = (evenRound(((a2Calculations + b2Calculations)), 5));

            var tempArray = [];
            tempArray[0] = valueA;
            tempArray[1] = valueB;
            rotatedFactorsArray.push(tempArray);
        }
        return rotatedFactorsArray;
    }


    if (counterClockwiseRotation !== true) {
        rotatedFactors = newRotateClockwise(calculateRotationsArray);
    } else {
        rotatedFactors = newRotateCounterClockwise(calculateRotationsArray);
    }

    var time1 = performance.now();

    //insert rotated factors into temp rotational state array
    for (var i = 0; i < looplen; i++) {
        tempRotFacStateArray[i][rotationFactorA - 1] = rotatedFactors[i][0];
        tempRotFacStateArray[i][rotationFactorB - 1] = rotatedFactors[i][1];
    }

    // create obj for two factor table display
    setTwoFactorRotationalArray(tempRotFacStateArray);

    // expects bare full array
    var arrayWithCommunalities = calculateCommunalities(tempRotFacStateArray);

    // gets array for fSig testing from LS of calculateCommunalities - sets fSigCriterionResults
    calculatefSigCriterionValues("flag");

    // returns dataValuesArray for D3 chart
    var d3Prep = doD3ChartDataPrep(arrayWithCommunalities); // creates arrays for table/D3 (LS) from state

    drawD3Chart(d3Prep);
    var prepTwoFactorTable = prepTwoFactorUpdateHandsontable(tempRotFacStateArray);

    // re-draw two factor rotation table
    updateDatatable1(prepTwoFactorTable);

    localStorage.setItem("calculateRotationsArray", JSON.stringify(rotatedFactors));
    localStorage.setItem("tempRotFacStateArray", JSON.stringify(tempRotFacStateArray));
}


// **************************************************************************** model
// **********  prep two factor and create initial rot array *************************
// **********************************************************************************
function prepTwoFactorUpdateHandsontable(chartData) {

    var twoFactorTableArray = [];
    var step1, i, step3, tempObj;
    var rotationFactorA = localStorage.getItem("rotationFactorA");
    var rotationFactorB = localStorage.getItem("rotationFactorB");
    var fSigCriterionResults = JSON.parse(localStorage.getItem("fSigCriterionResults"));
    var respondentNames = JSON.parse(localStorage.getItem("qavRespondentNames"));
    var ilen = chartData.length;

    for (i = 0; i < ilen; i++) {
        step1 = chartData[i];
        step3 = fSigCriterionResults[i];
        tempObj = {
            respondent: respondentNames[i],
            factor1: step1[rotationFactorA - 1],
            factor1Sig: step3[rotationFactorA - 1],
            factor2: step1[rotationFactorB - 1],
            factor2Sig: step3[rotationFactorB - 1],
        };
        twoFactorTableArray.push(tempObj);
    }
    return twoFactorTableArray;
}


// ***************************************************************************  model
// **********  initial array for two factor table ***********************************
// **********************************************************************************
function setTwoFactorRotationalArray(chartData) {
    var rotationFactorA = localStorage.getItem("rotationFactorA");
    var rotationFactorB = localStorage.getItem("rotationFactorB");
    var ilen = chartData.length;
    var calculateRotationsArray = [];
    var tempArray;
    var temp1;
    var temp2;

    for (var i = 0; i < ilen; i++) {
        tempArray = [];
        temp1 = chartData[i][rotationFactorA - 1];

        temp2 = chartData[i][rotationFactorB - 1];

        tempArray.push(temp1, temp2);
        calculateRotationsArray.push(tempArray);
    }
    localStorage.setItem("calculateRotationsArray", JSON.stringify(calculateRotationsArray));
}


// ***************************************************************************** view
// **********  draw two factors table  **********************************************
// **********************************************************************************
function updateDatatable1(newData) {

    // todo - fix error on baselinedata setting after displaying factors once


    var i, baseLineData, tempArray1, temp1, temp1a, temp2, temp2b, temp2a;
    var new2FactorDataArray = [];
    var temp4, temp6a, temp6b, table;
    var temp7, temp8, testVar;

    // check to see if datatabel already exists - returns boolean
    testVar = $.fn.dataTable.isDataTable('#twoFactorDisplayTable');

    if (testVar === true) {

        baseLineData = JSON.parse(localStorage.getItem("baseLineData"));

        new2FactorDataArray = [];
        for (i = 0; i < newData.length; i++) {
            tempArray1 = [];
            temp1a = i + 1;
            // adds resp. number
            tempArray1.push(temp1a);
            temp1 = newData[i].respondent;
            // adds respondent name
            tempArray1.push(temp1);

            temp2 = newData[i].factor1;
            // adds factor 1 calced value
            tempArray1.push(temp2);
            temp2b = baseLineData[i].factor1;
            temp2a = evenRound((temp2 - temp2b), 5);
            // adds diff 
            tempArray1.push(temp2a);

            temp4 = newData[i].factor2;
            // adds factor 2 calced value
            tempArray1.push(temp4);
            temp6b = baseLineData[i].factor2;
            temp6a = evenRound((temp4 - temp6b), 5);
            // adds diff 
            tempArray1.push(temp6a);

            temp7 = newData[i].factor1Sig;
            temp8 = newData[i].factor2Sig;
            tempArray1.push(temp7, temp8);



            new2FactorDataArray.push(tempArray1);
        }

        table = $('#twoFactorDisplayTable').DataTable();
        table.clear();
        table.rows.add(new2FactorDataArray).draw();

    } else {
        baseLineData = JSON.parse(localStorage.getItem("baseLineData"));

        if (baseLineData === null) {
            baseLineData = [1, "", 0, 0, 0, 0];
        }

        for (i = 0; i < newData.length; i++) {

            tempArray1 = [];
            temp1a = i + 1;
            tempArray1.push(temp1a);
            temp1 = newData[i].respondent;
            tempArray1.push(temp1);

            temp2 = newData[i].factor1;
            tempArray1.push(temp2);
            temp2b = baseLineData[i].factor1;
            temp2a = evenRound((temp2 - temp2b), 5);
            tempArray1.push(temp2a);

            temp4 = newData[i].factor2;
            tempArray1.push(temp4);
            temp6b = baseLineData[i].factor2;
            temp6a = evenRound((temp4 - temp6b), 5);
            tempArray1.push(temp6a);

            temp7 = newData[i].factor1Sig;
            temp8 = newData[i].factor2Sig;
            tempArray1.push(temp7, temp8);

            new2FactorDataArray.push(tempArray1);
        }
        var significanceLevel = calculateFactorLoadingSignificanceLevel();

        table = $('#twoFactorDisplayTable').DataTable({
            // "dom": '<"top"i>rt<"bottom"flp><"clear">',
            "retrieve": true,
            "searching": false,
            "ordering": true,
            "info": false,
            "scrollY": 600,
            "scrollCollapse": true,
            "scrollX": true,
            "paging": false,
            //"autoWidth": true,
            "columnDefs": [{
                    targets: [2, 3, 4, 5],
                    className: 'dt-body-right',
            }, {
                    targets: [0, 1],
                    className: 'dt-body-center'
            }, {
                    targets: [0],
                    orderData: [0, 1]
            }, {
                    targets: [2],
                    orderData: [2]
            }, {
                    targets: [3],
                    orderData: [3]
            },
                {
                    targets: [4],
                    orderData: [4]
            }, {
                    targets: [5],
                    orderData: [5]
            }, {
                    targets: [6],
                    "visible": false
            }, {
                    targets: [7],
                    "visible": false
            }, {
                    'targets': [2],
                    "createdCell": function (td, cellData, rowData, row, col) {

                        if (rowData[6] === "true") {
                            $(td).css('background', '#ffe4b2');
                        }
                    }
            }, {
                    'targets': [4],
                    "createdCell": function (td, cellData, rowData, row, col) {
                        if (rowData[7] === "true") {
                            $(td).css('background', 'aquamarine');
                        }
                    }
            }],

            data: new2FactorDataArray,
            "columns": [
                {
                    title: "Res.",
                    className: 'dt-head-center dt-body-center'
                },
                {
                    title: "Name",
                    className: 'dt-head-center dt-body-center'
                },
                {
                    title: "Fac. A",
                    className: 'dt-head-center dt-body-right'
                },
                {
                    title: "Chg A",
                    className: 'dt-head-center dt-body-right'
                },
                {
                    title: "Fac. B",
                    className: 'dt-head-center dt-body-right'
                },
                {
                    title: "Chg B",
                    className: 'dt-head-center dt-body-right'
                },
            ],
        });

        // TODO -  FOR COLUMN HIGHLIGHTING - FIND ERROR AND RESTORE
        //        var lastIdx = null;
        //        $('#twoFactorDisplayTable tbody')
        //            .on('mouseover', 'td', function () {
        //                var colIdx = table.cell(this).index().column;
        //                if (colIdx !== lastIdx) {
        //                    $(table.cells().nodes()).removeClass('highlight');
        //                    $(table.column(colIdx).nodes()).addClass('highlight');
        //                }
        //            })
        //            .on('mouseleave', function () {
        //                $(table.cells().nodes()).removeClass('highlight');
        //            });
    }
}
// **************************************************************************** model
// **********  save D3 rotated factors to state matrix array  ***********************
// **********************************************************************************
function saveRotation() {
    var rotationDegree = sessionStorage.getItem("rotationDegreeDisplayValue");
    var rotationFactorA = localStorage.getItem("rotationFactorA");
    var rotationFactorB = localStorage.getItem("rotationFactorB");
    var listText;
    var rotFacStateArray;
    var tempRotFacStateArray;


    // archive factor rotation table
    archiveFactorScoreStateMatrixAndDatatable();

    // update rotation history
    listText = "Factors " + rotationFactorA + " and " + rotationFactorB + " rotated " + rotationDegree + " degrees";
    $("#rotationHistoryList").append('<li>' + listText + '<button class="deleteButton">undo</button></li>');

    rotFacStateArray = JSON.parse(localStorage.getItem("rotFacStateArray"));

    tempRotFacStateArray = JSON.parse(localStorage.getItem("tempRotFacStateArray"));

    // save temp array as new current state array
    localStorage.setItem("rotFacStateArray", JSON.stringify(tempRotFacStateArray));

    // re-draw factor table
    // var isRotatedFactorsTableUpdate = "yes";
    var isRotatedFactorsTableUpdate = "destroy";
    drawRotatedFactorsTable2(isRotatedFactorsTableUpdate, "noFlag");

    // clear out the 2 factor rotation chart and plot
    reInitializePlotAndChart();

    // reset degree display, button color and stored value
    $("#handRotationDisplayContainer div").html("0&deg");
    sessionStorage.setItem("rotationDegreeDisplayValue", 0);
    saveRotationButtonColor(0);

    // force re-calc of results if additional rotations made and then download / display buttons called
    localStorage.setItem("outputComplete", "false");
}



// ***************************************************************************** view
// **********  draw rotated factors table using jquery dataTables   *****************
// **********************************************************************************

function drawRotatedFactorsTable2(isRotatedFactorsTableUpdate, shouldFlag) {

    // pull current table state from global variable
    var chartData = _.cloneDeep(JSON.parse(localStorage.getItem("rotFacStateArray")));

    // format data for table  
    var newData = prepChartDataArray2(chartData);

    // pull out explVar
    var expVar2 = JSON.parse(localStorage.getItem("expVar"));

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

    calculateFactorLoadingSignificanceLevel();

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

    localStorage.setItem("columnHeadersArray", JSON.stringify(columnHeadersArray));

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
        factorSortedData = rotationTableSortByFactor(newData);
    }

    var isUndo = "no";
    createFooter("factorRotationTable2", expVar2, isUndo);


    // todo - temporarily disabled update because autoflagging issues    
    if (isRotatedFactorsTableUpdate === "yes") {


        table = $('#factorRotationTable2').DataTable();
        table.clear();

        createFooter("factorRotationTable2", expVar2, isUndo);

        table.rows.add(factorSortedData).draw();

    } else if (isRotatedFactorsTableUpdate === "destroy") {

        table = $('#factorRotationTable2').DataTable();
        table.destroy();
        $('#factorRotationTable2').empty();

        // columnHeadersArray = QAV.factorLabels;

        createFooter("factorRotationTable2", expVar2, "no");

        table = $("#factorRotationTable2").DataTable({
            "retrieve": true,
            "searching": false,
            "ordering": true,
            "info": false,
            // "scrollY": 600,
            "scrollCollapse": true,
            "scrollX": true,
            "paging": false,
            "order": [[orderingColumn, "asc"]],
            "data": factorSortedData,
            "columns": columnHeadersArray,
            "columnDefs": [
                {
                    'type': 'highestFactor',
                    'targets': 2
                },
                {
                    'targets': columnTargets, // [ 4, 6, 8, 10, 12, 14, 16],
                    'searchable': false,
                    'orderable': true,
                    'render': function (data) { // (data, type, full, meta) {
                        if (
                            data === "") {
                            return "";
                        } else if (shouldFlag === "flag") {

                            return '<input type="checkbox" class="sigCheckbox" name="d' + data + '" value="' + data + '" defaultChecked="' + (data === 'true' ? 'checked' : '') + '"' + (data === 'true' ? 'checked="checked"' : '') + ' />';


                        } else {

                            return '<input type="checkbox" class="sigCheckbox" />';

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
    } else {

        // added for color button     

        if (isRotatedFactorsTableUpdate === "highlighter") {
            table = $('#factorRotationTable2').DataTable();
            table.destroy();
            $('#factorRotationTable2').empty();
            createFooter("factorRotationTable2", expVar2, "no");
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
            "order": [[orderingColumn, "asc"]],
            "data": factorSortedData,
            "columns": columnHeadersArray,
            "columnDefs": [
                {
                    'type': 'highestFactor',
                    'targets': 2
                }, {
                    'targets': columnTargets, // [2, 4, 6, 8, 10, 12, 14],
                    'searchable': false,
                    'orderable': true,
                    'render': function (data) { // (data, type, full, meta) {
                        if (data === "") {
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
}


function rotationTableSortByFactor(newData) {

    var i, j;
    var sortingArray = [];
    var factorSortedData = [];
    var tempObj;

    var newData2 = _.cloneDeep(newData);

    for (i = 0; i < newData.length; i++) {
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

    var factorSortedArray = alasql('SELECT * FROM ? ORDER BY indexValue ASC, subSortValue DESC', [sortingArray]);

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
    for (j = 0; j < factorSortedArray.length; j++) {
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
}

function createFooter(element, expVar2, isUndo) {

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

        jQuery.each(expVar2, function (i, value) {
            var th = document.createElement('th');
            th.innerHTML = value;
            tr.appendChild(th);
        });
        footer.appendChild(tr);
        document.getElementById(element).appendChild(footer);
    }
}


// todo - confirm to see if 2 factor updates significance checking and auto flagging

/*******************************************************************************
 *******************************************************************************
 ******************************************************************************* *******************************************************************************
 ******************   WITH UNIT TESTS IN JASMINE   *****************************
 *******************************************************************************
 *******************************************************************************
 *******************************************************************************
 ******************************************************************************/



// todo - spawn new web page and print - http://stackoverflow.com/questions/12997123/print-specific-part-of-webpage
// todo - use library big.js for rounding in centroid and varimax?. see docs or shift to all integers