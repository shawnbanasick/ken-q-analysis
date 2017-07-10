//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global window, d3, performance, sessionStorage, QAV, $, resources, LOAD, document, evenRound, UTIL, _ */

(function (ROTA, QAV, undefined) {


    // reset 'has split factor' marker on page load
    (function () {
        var hasSplitFactor = 0;
        QAV.setState("hasSplitFactor", hasSplitFactor);
    })();

    // ************************************************************  VIEW CONTROLER
    // **********  re-initialize chart after save rotation or varimax *************
    // ****************************************************************************

    ROTA.reInitializePlotAndChart = function () {
        // data to initialize D3 chart

        var testVar = $.fn.dataTable.isDataTable('#twoFactorDisplayTable');

        if (testVar) {
            var emptyArray = [{
                "respondent": "",
                "factor1": 0,
                "factor2": 0
            }];
            var emptyArray2 = [];
            ROTA.drawD3Chart(emptyArray);
            var isNewSelection = false;
            ROTA.updateDatatable1(emptyArray2, isNewSelection);
        }
    };


    // **************************************************************** model state
    // *********  save rotation counter *******************************************
    // ****************************************************************************

    // always reset to zero on centroid extraction (in centroid.js file)
    ROTA.saveRotationArchiveCounter = function (option) {
        var saveRotationCounter = QAV.getState("saveRotationCounter");
        if (option === "increase") {
            saveRotationCounter = saveRotationCounter + 1;
            QAV.setState("saveRotationCounter", saveRotationCounter);
        } else if (option === "decrease") {
            saveRotationCounter = saveRotationCounter - 1;
            QAV.setState("saveRotationCounter", saveRotationCounter);
        } else if (option === "get") {
            return saveRotationCounter;
        } else if (option === "reset") {
            QAV.setState("saveRotationCounter", 1);
        }
    };

    // ****************************************************************  view
    // ****  Rotation button state    ***************************************
    // **********************************************************************

    ROTA.saveRotationButtonColor = function (rotationDegreeDisplayValue) {
        var saveRotButton = $("#saveRotationButton");
        if (rotationDegreeDisplayValue !== 0) {
            saveRotButton.removeClass("saveRotationButtonGray");
            saveRotButton.addClass("saveRotationButtonYellow");
        } else {
            saveRotButton.removeClass("saveRotationButtonYellow");
            saveRotButton.addClass("saveRotationButtonGray");
        }
    };

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
    ROTA.setRotationFactorsFromCheckbox = function () {

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
            QAV.setState("rotationFactorA", rotationFactorA);
            QAV.setState("rotationFactorB", rotationFactorB);

        }
        return pullFactors;
    };

    // *******************************************************************  data model
    // *************   Data format array to object   *********************************
    // *******************************************************************************

    // CALLED BY "DISPLAY FACTORS FOR ROTATION BUTTON"
    ROTA.doD3ChartDataPrep = function (rotFacStateArray) {
        var rotationFactorA = QAV.getState("rotationFactorA");
        var rotationFactorB = QAV.getState("rotationFactorB");
        var step4 = QAV.getState("qavRespondentNames");
        var fSigCriterionResults = QAV.getState("fSigCriterionResults");

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
    };


    // ***************************************************************** view model
    // *******  draw D3 Chart  ***************************************************
    // ***************************************************************************

    ROTA.drawD3Chart = function (dataValuesArray) {
        var rotationFactorA = QAV.getState("rotationFactorA");
        var rotationFactorB = QAV.getState("rotationFactorB");
        var rotChartConfig = QAV.getState("rotChartConfig");
        var significanceColorA, significanceColorB, dotStrokeColor, identifier;
        var data, defaultDotColor, customFontSize;

        d3.select("#d3_scatterchart svg").remove();

        // remove highlighting from circles
        if (rotChartConfig.removeCircleHighlight === true) {
            significanceColorA = "rgba(33, 33, 33, 0.0)";
            significanceColorB = "rgba(33, 33, 33, 0.0)";
            defaultDotColor = "rgba(33, 33, 33, 0.0)";
        } else {
            significanceColorA = rotChartConfig.significanceColorAPrep;
            significanceColorB = rotChartConfig.significanceColorBPrep;
            defaultDotColor = "#d8d8d8";
        }

        if (rotChartConfig.removeCircles === true) {
            dotStrokeColor = "rgba(33, 33, 33, 0.0)";
        } else {
            dotStrokeColor = "#000000";
        }

        if (rotChartConfig.identifierNumber === true) {
            identifier = "number";
        } else {
            identifier = "name";
        }

        if (rotChartConfig.changeFontSize === true) {
            customFontSize = rotChartConfig.customFontSize + "px";
        } else {
            customFontSize = "9px";
        }

        //console.log(customFontSize);

        // var significanceLevel = ROTA.calculateFactorLoadingSignificanceLevel();

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
            xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(2).tickSize(-height, 0, 0).tickPadding(10);

        // setup y
        var yValue = function (d) {
                return d.factor1;
            }, // data -> value
            yScale = d3.scale.linear().range([height, 0]), // value -> display
            yMap = function (d) {
                return yScale(yValue(d));
            }, // data -> display
            yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(2).tickSize(-width, 0, 0).tickPadding(10);

        // add the graph canvas to the webpage
        var svg = d3.select("#d3_scatterchart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("font-family", "Arial")
            .attr("id", "scatterChart")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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

        // define the div for the tooltip   #d3_scatterchart
        var div = d3.select("#d3_scatterchart").append("div")
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
            .style("font-family", "Arial")
            .style("text-anchor", "end");

        // create x axis title
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + 35)
            .style("text-anchor", "middle")
            .style("font-family", "Arial")
            .style("font-weight", "bold")
            .text("Factor " + rotationFactorB);

        // y-axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("font-family", "Arial")
            .style("text-anchor", "end");
        // .selectAll('path')
        // .style('stroke', 'red')
        // .style('fill', 'none')
        // .style('stroke-width', '5px');
        // .text("Factor " + rotationFactorA);

        svg.selectAll('.axis lne, .axis path, .minor')
            .style({
                'stroke': 'black',
                'fill': 'none',
                'stroke-width': '1px',
                'shape-rendering': 'crispEdges'
            });

        d3.selectAll('g.tick')
            .style({
                'stroke': 'black',
                'fill': 'black',
                'stroke-width': '1px',
                'shape-rendering': 'crispEdges'
            });


        // create Y axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-family", "Arial")
            .style("font-weight", "bold")
            .text("Factor " + rotationFactorA);


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
            .style("stroke", dotStrokeColor)
            .style("fill", function (d) {
                if (d.factor1Sig === "true") {
                    return (significanceColorA); //"#ffe4b2";
                } else if (d.factor2Sig === "true") {
                    return (significanceColorB);
                } else {
                    return (defaultDotColor);
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
            .attr("class", "dotText")
            .attr("font-family", "Arial")
            .attr("font-size", customFontSize)
            .attr("dy", 3)
            .text(function (d) {
                if (identifier === "number") {
                    return d.num;
                } else {
                    return d.respondent;
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
        //  todo - check to see if I need to exit the dots
    };

    // todo - store this info on auto flagging somewhere else
    //These are the two standard criteria for automatic flagging used in Q method analysis:
    //1. Q-sorts which factor loading is higher than the threshold for p-value < 0.05, and
    //2. Q-sorts which square loading is higher than the sum of square loadings of the same Q-sort in
    //    all other factors.

    // C Flag Item I on Factor J if A^2/H^2 > .5 (Fuerntratt-Criterion) preliminary flagging method
    // C *and* a > 1.96/sqrt(nitems)

    // ******************************************************** data analysis
    // ********  calc significance Levels  **********************************
    //***********************************************************************

    ROTA.calculateFactorLoadingSignificanceLevel = function (totalStatements) {
        // var totalStatements = QAV.getState("qavOriginalSortSize");
        var significanceLevel = evenRound((1.96 * (1 / Math.sqrt(totalStatements))), 5);
        return significanceLevel;
    };

    // ***************************************************************  model
    // **********  calc h2 communalities  ***********************************
    //***********************************************************************

    ROTA.calculateCommunalities = function (currentFactorData) {
        var calculateCommunalityArray = _.cloneDeep(currentFactorData);
        var temp, temp2, temp3, temp4, i, roundedValue, chartDataLength;
        var communalitiesArray = [];
        var fSigCriterion = [];

        // calculateCommunalityArray.shift();
        function square(m) {
            return m * m;
        }

        _.forEach(calculateCommunalityArray, function (n) {
            temp = (_.map(n, square));
            temp2 = temp.reduce(function (a, b) {
                return a + b;
            }, 0);
            temp3 = evenRound((temp2), 5);
            communalitiesArray.push(temp3);

            temp4 = [];
            for (var k = 0, kLen = temp.length; k < kLen; k++) {
                roundedValue = evenRound((temp[k]), 5);
                temp4.push(roundedValue);
            }
            fSigCriterion.push(temp4);
        });

        QAV.setState("fSigCriterion", fSigCriterion);
        QAV.setState("rowH2", communalitiesArray);

        chartDataLength = calculateCommunalityArray.length;
        for (i = 0; i < chartDataLength; i++) {
            calculateCommunalityArray[i].push(communalitiesArray[i]);
        }
        return calculateCommunalityArray;
    };

    // todo - remove conditional formatting for h2 column on rotation history chart

    // *******************************************************************  model
    // ****  Calculate Fuerntratt Criterion on Communalities ********************
    // **************************************************************************


    // todo - relocate function?
    ROTA.calculatefSigCriterionValues = function (addFlag) {
        var fSigCriterionArray = QAV.getState("fSigCriterion");
        var totalStatements = QAV.getState("qavOriginalSortSize");
        var sigLevel2 = ROTA.calculateFactorLoadingSignificanceLevel(totalStatements);
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
        QAV.setState("fSigCriterionResults", fSigCriterionResults);
    };

    // *****************************************************************  model
    // ******  Rotation procedure  ********************************************
    // ************************************************************************

    ROTA.calcSinDegrees = function (num) {
        return Math.sin(num * (Math.PI / 180));
    };

    ROTA.calcCosDegrees = function (num) {
        return Math.cos(num * (Math.PI / 180));
    };

    ROTA.newRotateClockwise = function (calculateRotationsArray, rotationDegree) {
        var transposedArray = _.zip.apply(_, calculateRotationsArray);
        var sinDegreesValue = (ROTA.calcSinDegrees(rotationDegree));
        var cosDegreesValue = (ROTA.calcCosDegrees(rotationDegree));
        var valueA, valueB, tempArray;
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
            tempArray = [];
            tempArray[0] = valueA;
            tempArray[1] = valueB;
            rotatedFactorsArray.push(tempArray);
        }
        return rotatedFactorsArray;
    };

    ROTA.newRotateCounterClockwise = function (calculateRotationsArray, rotationDegree) {
        var transposedArray = _.zip.apply(_, calculateRotationsArray);
        var sinDegreesValue = (ROTA.calcSinDegrees(rotationDegree));
        var cosDegreesValue = (ROTA.calcCosDegrees(rotationDegree));
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
    };


    ROTA.calculateRotatedFactors = function (rotationDegree) {
        var rotationFactorA = QAV.getState("rotationFactorA");
        var rotationFactorB = QAV.getState("rotationFactorB");
        var counterClockwiseRotation = false;
        var calculateRotationsArray = QAV.getState("calculateRotationsArray");
        var tempRotFacStateArray = QAV.getState("tempRotFacStateArray");
        var rotatedFactors;
        var looplen = calculateRotationsArray.length;

        if (rotationDegree < 0) {
            counterClockwiseRotation = true;
        }

        rotationDegree = Math.abs(rotationDegree);

        if (counterClockwiseRotation !== true) {
            rotatedFactors = ROTA.newRotateClockwise(calculateRotationsArray, rotationDegree);
        } else {
            rotatedFactors = ROTA.newRotateCounterClockwise(calculateRotationsArray, rotationDegree);
        }

        //insert rotated factors into temp rotational state array
        for (var i = 0; i < looplen; i++) {
            tempRotFacStateArray[i][rotationFactorA - 1] = rotatedFactors[i][0];
            tempRotFacStateArray[i][rotationFactorB - 1] = rotatedFactors[i][1];
        }

        // create obj for two factor table display
        ROTA.setTwoFactorRotationalArray(tempRotFacStateArray);

        // expects bare full array
        var arrayWithCommunalities = ROTA.calculateCommunalities(tempRotFacStateArray);

        // gets array for fSig testing from LS of calculateCommunalities - sets fSigCriterionResults
        ROTA.calculatefSigCriterionValues("flag");

        // returns dataValuesArray for D3 chart
        var d3Prep = ROTA.doD3ChartDataPrep(arrayWithCommunalities);

        ROTA.drawD3Chart(d3Prep);
        var prepTwoFactorTable = ROTA.prepTwoFactorUpdateHandsontable(tempRotFacStateArray);

        // re-draw two factor rotation table
        var isNewSelection = false;
        ROTA.updateDatatable1(prepTwoFactorTable, isNewSelection);

        // console.log('%c Factor rotation calcs completed in  ' + (time1 - time0).toFixed(3) + ' milliseconds', 'background: aquamarine; color: black');

        QAV.setState("calculateRotationsArray", rotatedFactors);
        QAV.setState("tempRotFacStateArray", tempRotFacStateArray);
    };


    // ************************************************************* model
    // ****  prep two factor and create initial rot array ****************
    // *******************************************************************
    ROTA.prepTwoFactorUpdateHandsontable = function (chartData) {
        var twoFactorTableArray = [];
        var step1, i, step3, tempObj;
        var rotationFactorA = QAV.getState("rotationFactorA");
        var rotationFactorB = QAV.getState("rotationFactorB");
        var fSigCriterionResults = QAV.getState("fSigCriterionResults");
        var respondentNames = QAV.getState("qavRespondentNames");
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
    };


    // **************************************************************  model
    // **** initial array for two factor table ****************************
    // ********************************************************************
    ROTA.setTwoFactorRotationalArray = function (chartData) {
        var rotationFactorA = QAV.getState("rotationFactorA");
        var rotationFactorB = QAV.getState("rotationFactorB");
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
        QAV.setState("calculateRotationsArray", calculateRotationsArray);
        return calculateRotationsArray;
    };


    // *************************************************************** view
    // ******  draw two factors table  ************************************
    // ********************************************************************
    ROTA.updateDatatable1 = function (newData, isNewSelection) {

        // todo - fix error on baselinedata setting after displaying factors once
        var i, baseLineData, tempArray1, temp1, temp1a, temp2, temp2b, temp2a;
        var new2FactorDataArray = [];
        var temp4, temp6a, temp6b, table;
        var temp7, temp8, testVar;

        // check to see if datatabel already exists - returns boolean
        testVar = $.fn.dataTable.isDataTable('#twoFactorDisplayTable');
        var facA = QAV.getState("rotationFactorA");
        var facB = QAV.getState("rotationFactorB");
        var facAName = "Fac. " + facA;
        var facAChange = "Chg. " + facA;
        var facBName = "Fac. " + facB;
        var facBChange = "Chg. " + facB;
        var newHeaderArray = ["Res.", "Name", facAName, facAChange, facBName, facBChange];
        var rotChartConfig = QAV.getState("rotChartConfig");
        var significanceColorA = rotChartConfig.significanceColorA;
        var significanceColorB = rotChartConfig.significanceColorB;

        if (rotChartConfig.removeCircleHighlight === true) {
            significanceColorA = "rgba(33, 33, 33, 0.0)";
            significanceColorB = "rgba(33, 33, 33, 0.0)";
        }

        if (testVar === true) { //

            baseLineData = QAV.getState("baseLineData");

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
            for (var j = 0; j < newHeaderArray.length; j++) {
                table.columns(j).header().to$().text(newHeaderArray[j]);
            }
            table.rows.add(new2FactorDataArray).draw();

        } else {

            baseLineData = QAV.getState("baseLineData");

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

            // var significanceLevel = ROTA.calculateFactorLoadingSignificanceLevel();

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
                }, {
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
                    "createdCell": function (td, cellData, rowData) { // row col

                        if (rowData[6] === "true") {
                            $(td).css('background', significanceColorA); //'#ffe4b2');
                        }
                    }
                }, {
                    'targets': [4],
                    "createdCell": function (td, cellData, rowData) { // row col
                        if (rowData[7] === "true") {
                            $(td).css('background', significanceColorB);
                        }
                    }
                }],

                data: new2FactorDataArray,
                "columns": [{
                    title: "Res.",
                    className: 'dt-head-center dt-body-center'
                }, {
                    title: "Name",
                    className: 'dt-head-center dt-body-center'
                }, {
                    title: facAName, //"Fac. A",
                    className: 'dt-head-center dt-body-right'
                }, {
                    title: facAChange, // "Chg A",
                    className: 'dt-head-center dt-body-right'
                }, {
                    title: facBName, // "Fac. B",
                    className: 'dt-head-center dt-body-right'
                }, {
                    title: facBChange, // "Chg B",
                    className: 'dt-head-center dt-body-right'
                }, ],
            });

            table.fixedHeader.adjust();
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
    };
    // **************************************************************************** model
    // **********  save D3 rotated factors to state matrix array  ***********************
    // **********************************************************************************
    ROTA.saveRotation = function () {
        var rotationDegree = sessionStorage.getItem("rotationDegreeDisplayValue");
        var rotationFactorA = QAV.getState("rotationFactorA");
        var rotationFactorB = QAV.getState("rotationFactorB");
        var listText;
        var rotFacStateArray;
        var tempRotFacStateArray;


        // archive factor rotation table
        UTIL.archiveFactorScoreStateMatrixAndDatatable();

        // update project history
        var language = QAV.getState("language");
        var appendText = resources[language].translation.Factors;
        var appendText2 = resources[language].translation.and;
        var appendText3 = resources[language].translation.rotated;
        var appendText4 = resources[language].translation["rotated degrees"];
        var appendText5 = resources[language].translation.Undo;

        listText = appendText + rotationFactorA + appendText2 + rotationFactorB + appendText3 + rotationDegree + appendText4;
        $("#rotationHistoryList").append('<li>' + listText + '<button class="deleteButton">' + appendText5 + '</button></li>');

        rotFacStateArray = QAV.getState("rotFacStateArray");
        tempRotFacStateArray = QAV.getState("tempRotFacStateArray");

        // save temp array as new current state array
        QAV.setState("rotFacStateArray", tempRotFacStateArray);

        // re-draw factor table
        var isRotatedFactorsTableUpdate = "destroy";
        LOAD.drawRotatedFactorsTable2(isRotatedFactorsTableUpdate, "noFlag");

        // clear out the 2 factor rotation chart and plot
        ROTA.reInitializePlotAndChart();

        // reset degree display, button color and stored value
        $("#handRotationDisplayContainer div").html("0&deg");
        sessionStorage.setItem("rotationDegreeDisplayValue", 0);
        ROTA.saveRotationButtonColor(0);

        // force re-calc of results if more rotations made and then download / display buttons called
        QAV.setState("outputComplete", "false");
    };

    //******************************************************************   model
    //******* for rotated factors table data  handsontable version *************
    //**************************************************************************
    // ROTA.calculateEigenvaluesAndVariance = function () {
    //     var numberSorts = QAV.getState("qavTotalNumberSorts");
    //     var factorMatrix2 = QAV.getState("rotFacStateArray");
    //     //var factorMatrix2 = _.cloneDeep(factorMatrix);
    //     var factorMatrix1 = _.zip.apply(_, factorMatrix2);
    //     var j, num, eigen, totalVariance;
    //     var eigenvalues = {};
    //     var explainedVariance = {};
    //     var loopLen1 = factorMatrix1.length;
    //     var results = [];
    //     var factorNumber, factorSig;

    //     eigenvalues = {
    //         respondent: "Eigenvalues"
    //     };
    //     explainedVariance = {
    //         respondent: "% Expln Var"
    //     };

    //     for (j = 0; j < loopLen1; j++) {
    //         num = factorMatrix1[j];
    //         for (var k = 0; k < num.length; k++) {
    //             num[k] = evenRound((num[k] * num[k]), 8);
    //         }
    //         eigen = evenRound((_.reduce(num, function (sum, num2) {
    //             return sum + num2;
    //         })), 5);

    //         factorNumber = "factor" + (j + 1);

    //         factorSig = "factorSig" + (j + 1);
    //         totalVariance = evenRound((100 * (eigen / numberSorts)), 0);

    //         eigenvalues[factorNumber] = eigen;
    //         explainedVariance[factorNumber] = totalVariance;

    //         eigenvalues[factorSig] = "";
    //         explainedVariance[factorSig] = "";

    //     }
    //     eigenvalues.communality = "";
    //     explainedVariance.communality = "";
    //     results.push(eigenvalues);
    //     QAV.setState("expVar", explainedVariance);
    //     jlog("results", results);
    //     return results;
    // };

    //***************************************************************   model
    //**** for rotated factors table data - datatables version **************
    //***********************************************************************
    ROTA.calculateEigenvaluesAndVariance2 = function () {
        var numberSorts = QAV.getState("qavTotalNumberSorts");
        var factorMatrix2 = QAV.getState("rotFacStateArray");
        // var factorMatrix2 = _.cloneDeep(factorMatrix);
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
        explainedVariance.splice(1, 0, "", "");
        QAV.setState("expVar", explainedVariance);
        return results;
    };

}(window.ROTA = window.ROTA || {}, QAV));