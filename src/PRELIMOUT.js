/* @preserve
Ken-Q Analysis
Copyright (C) 2016 Shawn Banasick
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
*/
/*  JSlint declarations
 global resources, d3, VIEW, d3_save_svg, CORR, alasql, window, QAV, $, document, evenRound, UTIL, _  
 */

(function (PRELIMOUT, QAV, undefined) {
    'use strict';
    // ************************************************************************  view
    // ******  Preliminary Results 1 - draw factor synthetic Q-sorts visuals ********
    //  ******************************************************************************
    PRELIMOUT.showPreliminaryOutput1 = function () {
        // add synthetic factors visualizations
        // $("#synFactorVizTitle").append("<h4>" + synFactorVizTitleText + "</h4>"); 

        var distStatementDataVizArray = QAV.getState("distStatementDataVizArray");
        var outputForDataViz = QAV.getState("outputForDataViz");
        var userSelectedFactors = QAV.getState("userSelectedFactors");
        // var language = QAV.getState("language");
        var vizConfig = QAV.getState("vizConfig") || {};

        // console.log(JSON.stringify(outputForDataViz));


        // loop through userSelectedFactors to get each synFactorViz
        for (var i = 0; i < outputForDataViz.length; i++) {
            // var synFactorVizName = "synFactorViz" + (i + 1);

            // loop through each distinguishing statement in distStatementDataVizArray[i]
            for (var j = 0; j < distStatementDataVizArray[i].length; j++) {
                // get statement number
                var statementId = distStatementDataVizArray[i][j]["No."];
                // avoid empty objects
                var sigSymbol;
                var testValue = parseInt(statementId, 10);
                if (!isNaN(testValue)) {

                    // get values for calc of direction symbol
                    var sigFactorZscoreKey = "Z-SCR-" + userSelectedFactors[i];
                    var sigFactorZscoreValue = distStatementDataVizArray[i][j][sigFactorZscoreKey];
                    var allFactorZscores = [];

                    // loop through all of the factor z-scores and push to array
                    for (var k = 0; k < userSelectedFactors.length; k++) {
                        var temp1 = "Z-SCR-" + userSelectedFactors[k];
                        var temp2 = distStatementDataVizArray[i][j][temp1];
                        allFactorZscores.push(temp2);
                    }
                    // calc directionSymbol by checking against Zscore in all other factors
                    var otherFactorZscores = _.pull(allFactorZscores, sigFactorZscoreValue);
                    // var factorZscoreAverage = d3.mean(otherFactorZscores);
                    var arrowPointerArrayLeft = [],
                        arrowPointerArrayRight = [];
                    for (var kk = 0; kk < otherFactorZscores.length; kk++) {
                        if (sigFactorZscoreValue - otherFactorZscores[kk] > 0) {
                            arrowPointerArrayRight.push("1");
                        } else {
                            arrowPointerArrayLeft.push("1");
                        }
                    }

                    var directionSymbol;
                    if (otherFactorZscores.length === arrowPointerArrayRight.length && userSelectedFactors.length > 1) {
                        directionSymbol = vizConfig.shouldUseUnicode !== false ?
                            "\u25BA" :
                            ">>"; // " >>>"; "&#9658;";  right-pointing pointer
                    } else if (otherFactorZscores.length === arrowPointerArrayLeft.length) {
                        directionSymbol = vizConfig.shouldUseUnicode !== false ?
                            "\u25C4" :
                            "<<"; //" <<<";  "&#9668;";  left-pointing pointer
                    } else {
                        directionSymbol = "";
                    }
                    // put it all together and insert into object
                    var sigFactorName = "SIG" + userSelectedFactors[i];
                    var sigAt01Level = distStatementDataVizArray[i][j][sigFactorName];
                    var location = statementId - 1;
                    if (sigAt01Level === "*") {
                        sigSymbol = vizConfig.shouldUseUnicode !== false ?
                            "\u25C9" :
                            "** "; //"**";  "&#9673;";  sig at .01
                    } else if (sigAt01Level === "") {
                        sigSymbol = vizConfig.shouldUseUnicode !== false ?
                            "\u25CE" :
                            "* "; // "*";  "&#9678;";  sig at .05
                    }
                    if (vizConfig.shouldShowZscoreArrows !== false) {
                        outputForDataViz[i][location].sigVisualization = (sigSymbol + directionSymbol);
                    } else if (vizConfig.shouldShowZscoreArrows === false) {
                        outputForDataViz[i][location].sigVisualization = sigSymbol;
                    }
                }
            }
        }
        // QAV.setState("outputForDataViz", outputForDataViz);

        PRELIMOUT.drawSynSortTrianglesForOutput(outputForDataViz, userSelectedFactors);
    };


    PRELIMOUT.drawSynSortTrianglesForOutput = function (outputForDataViz, userSelectedFactors) {
        var sortTriangleShape = QAV.getState("qavSortTriangleShape");
        var uniques = _.uniq(sortTriangleShape);
        var currentStatements = QAV.getState("qavCurrentStatements");
        var language = QAV.getState("language");
        var synFactorVizTitleText = resources[language].translation["Synthetic Sort for"];
        var disting05LegendText = resources[language].translation["Distinguishing statement at P < 0.05"];
        var disting01LegendText = resources[language].translation["Distinguishing statement at P < 0.01"];
        var legendTitleText = resources[language].translation.Legend;
        var zscoreHigherLegendText = resources[language].translation["z-Score for the statement is higher than in all of the other factors"];
        var zscoreLowerLegendText = resources[language].translation["z-Score for the statement is lower than in all of the other factors"];
        var consensusLegendText = resources[language].translation["Consensus statement (non-significant at P > 0.1)"];
        var matchingCountLegendText = resources[language].translation["Low number of raw Q-sort matching values (cutoff"];
        var overlapLegendText = resources[language].translation["Consensus statement with low number of matching values"];


        var svgHeight;
        var elementHeight,
            symbolSize,
            vSeparation,
            svgHeightCalc;
        var vizConfig = QAV.getState("vizConfig") || {};
        var cardFontSize = "12px"; // default setting
        var containerWidth = ($(".container")
            .width() - 40);
        var elementWidth,
            config;
        var consensusColor = vizConfig.consensusCustomColor;
        var matchCountColor = vizConfig.matchCountCustomColor;
        var overlapColor = vizConfig.overlapCustomColor;
        var consensusIndicator = vizConfig.shouldUseToIndicateConsensus; //"color / stripe"
        var matchCautionIndicator = vizConfig.shouldUseToIndicateMatchCaution; // color stripe
        var overlapIndicator = vizConfig.shouldUseToIndicateOverlap; // color crosshatch

        // user adjust indicator types
        if (consensusIndicator === "stripe") {
            consensusIndicator = 'url(#hash4_4)';
        } else if (consensusIndicator === "color") {
            consensusIndicator = consensusColor;
        }

        if (matchCautionIndicator === "color") {
            matchCautionIndicator = matchCountColor;
        } else if (matchCautionIndicator === "stripe") {
            matchCautionIndicator = 'url(#hash4_4b)';
        }

        if (overlapIndicator === "color") {
            overlapIndicator = overlapColor;
        } else if (overlapIndicator === "crosshatch") {
            overlapIndicator = 'url(#crosshatch)';
        }

        // user adjust card width
        if (vizConfig.shouldSetCardWidth === true) {
            elementWidth = vizConfig.cardWidth;
            containerWidth = (elementWidth * uniques.length) + 10;
        } else {
            elementWidth = containerWidth / uniques.length;
        }

        // user adjust font size for cards
        if (vizConfig.shouldSetFontSize === true) {
            cardFontSize = vizConfig.fontSize + "px";
        }

        // user adjust card height
        if (vizConfig.shouldSetCardHeight === true) {
            var newHeightValue = vizConfig.cardHeight;
            if (newHeightValue === undefined) {
                newHeightValue = 110;
            }
            elementHeight = parseInt(newHeightValue, 10);
        } else {
            elementHeight = 110;
        }

        // user adjust sig symbol size
        if (vizConfig.shouldSetSymbolFontSize === true) {
            symbolSize = vizConfig.sigSymbolFontSize + "px";
        } else {
            symbolSize = "12px";
        }

        // user adjust line spacing
        if (vizConfig.shouldSetLineSpacing === true) {
            vSeparation = vizConfig.lineSpacing;
        } else {
            vSeparation = 15;
        }

        // set legend symbols
        if (vizConfig.shouldUseUnicode === true) {
            vizConfig.legendSymbol05 = '\u25CE';
            vizConfig.legendSymbol01 = '\u25C9';
            vizConfig.rightArrow = '\u25BA';
            vizConfig.leftArrow = '\u25C4';
        } else {
            vizConfig.legendSymbol05 = '*';
            vizConfig.legendSymbol01 = '**';
            vizConfig.rightArrow = '>>';
            vizConfig.leftArrow = '<<';
        }

        // prepare statements !false sets as default
        appendNumbersToStatements(outputForDataViz);

        // auto adjust if no card header info
        var locateStateY;
        if (vizConfig.shouldShowMatchCounts === true || vizConfig.shouldIndicateDistinguishing) {
            locateStateY = 40;
        } else if (vizConfig.shouldIndicateDistinguishing === undefined) {
            locateStateY = 40;
        } else {
            locateStateY = 20;
        }

        // user trim statements
        if (vizConfig.shouldTrimStatements === true) {
            trimStatments(outputForDataViz);
        }

        // todo - fix so it doesn't trigger multiple times
        if (vizConfig.shouldShowMatchCounts === true || vizConfig.shouldShowBackgroundColor === true) {
            calcMatchCounts(outputForDataViz);
        }

        var isNumber = function isNumber(value) {
            return typeof value === 'number' &&
                isFinite(value);
        };

        function integrateConsensusStatementIndicators() {
            var consensusStatementArrays = QAV.getState("formattedConsensusStatements");
            var consensusNums = [];
            for (var i = 0, iLen = consensusStatementArrays.length; i < iLen; i++) {
                var testValue = consensusStatementArrays[i]["No."];
                if (isNumber(testValue)) {
                    consensusNums.push(testValue);
                }
            }

            for (var j = 0, jLen = outputForDataViz.length; j < jLen; j++) {
                var counter = 0;
                for (var k = 0, kLen = outputForDataViz[j].length; k < kLen; k++) {
                    var conStateNum = consensusNums[counter];
                    if (outputForDataViz[j][k].statement === conStateNum) {
                        outputForDataViz[j][k].isConsensusState = true;
                        counter++;
                    } else {
                        outputForDataViz[j][k].isConsensusState = false;
                    }
                }
            }
        }
        integrateConsensusStatementIndicators();


        function setBackgroundColorFill() {
            var isConsensus, isCaution, matchingCountPercent;
            var cutoff = vizConfig.backgroundColorCutoff;
            var caution = Boolean(vizConfig.shouldShowBackgroundColor);
            var consensus = Boolean(vizConfig.shouldIndicateConsensus);

            // loop through factors, then Q-sorts
            for (var i = 0, iLen = outputForDataViz.length; i < iLen; i++) {
                for (var j = 0, jLen = outputForDataViz[0].length; j < jLen; j++) {
                    isConsensus = outputForDataViz[i][j].isConsensusState;
                    matchingCountPercent = outputForDataViz[i][j].matchingCountPercent;
                    if (matchingCountPercent <= cutoff) {
                        isCaution = true;
                    } else {
                        isCaution = false;
                    }

                    // if user selects both caution and consensus
                    if (caution === true && consensus === true) {
                        // and the card shows
                        if (isConsensus === true && isCaution === true) {
                            outputForDataViz[i][j].displayFill = overlapIndicator;
                        } else if (isConsensus === true && isCaution === false) {
                            outputForDataViz[i][j].displayFill = consensusIndicator;
                        } else if (isConsensus === false && isCaution === true) {
                            outputForDataViz[i][j].displayFill = matchCautionIndicator;
                        } else {
                            outputForDataViz[i][j].displayFill = '#ffffff';
                        }
                    } else if (caution === true && consensus === false) {
                        if (isCaution === true) {
                            outputForDataViz[i][j].displayFill = matchCautionIndicator;
                        } else {
                            outputForDataViz[i][j].displayFill = '#ffffff';
                        }
                    } else if (caution === false && consensus === true) {
                        if (isConsensus === true) {
                            outputForDataViz[i][j].displayFill = consensusIndicator;
                        } else {
                            outputForDataViz[i][j].displayFill = '#ffffff';
                        }
                    } else {
                        outputForDataViz[i][j].displayFill = '#ffffff';
                    }
                } // end card loop
            } // end factor loop
        } // end function

        if (vizConfig.shouldShowBackgroundColor === true || vizConfig.shouldIndicateConsensus === true) {
            setBackgroundColorFill();
        }

        function appendNumbersToStatements(outputForDataViz) {
            for (var i = 0; i < outputForDataViz.length; i++) {
                for (var ii = 0; ii < outputForDataViz[i].length; ii++) {
                    if (vizConfig.shouldShowOnlyStateNo === true) {
                        outputForDataViz[i][ii].displayStatements = outputForDataViz[i][ii].statement;
                    } else if (vizConfig.shouldPrependStateNo === false) {
                        outputForDataViz[i][ii].displayStatements = outputForDataViz[i][ii].sortStatement;
                    } else {
                        outputForDataViz[i][ii].displayStatements = outputForDataViz[i][ii].statement + ". " + outputForDataViz[i][ii].sortStatement;
                    }
                }
            }
            return outputForDataViz;
        }

        function trimStatments(outputForDataViz) {
            for (var i = 0; i < outputForDataViz.length; i++) {
                for (var ii = 0; ii < outputForDataViz[i].length; ii++) {
                    if (vizConfig.shouldTrimStatements === true) {
                        var preSubString = outputForDataViz[i][ii].displayStatements;
                        outputForDataViz[i][ii].displayStatements = preSubString.substring(0, vizConfig.trimStatementSize);
                    }


                }
            }
            return outputForDataViz;
        }

        function calcMatchCounts(outputForDataViz) {
            var x = 10;

            var data2 = QAV.getState("matchCount");

            for (var i = 0, iLen = userSelectedFactors.length; i < iLen; i++) {
                var data1 = data2[i];
                var data = data1.slice(0);
                data.sort(function (a, b) {
                    return a.indexer - b.indexer;
                });

                for (var jj = 0, jjLen = data.length; jj < jjLen; jj++) {
                    var indexer = data[jj].indexer;
                    if (indexer === outputForDataViz[i][jj].statement) {
                        outputForDataViz[i][jj].matchingCount = data[jj].matchingCounts;
                        outputForDataViz[i][jj].matchingCountPercent = data[jj].matchingCountsPercent;
                    } else {
                        console.log("error - statement ordering doesn't match");
                    }
                }
                x = x + 3;
            }
            QAV.setState("outputForDataViz", outputForDataViz);
            return outputForDataViz;
        }

        function findOccurrences(arr, val) {
            var i,
                j,
                count = 0;
            for (i = 0, j = arr.length; i < j; i++) {
                if (arr[i] === val) {
                    count++;
                }
            }
            return count;
        }

        function getSvgHeight(arr1) {
            var heightAdjustment = 0;
            if (vizConfig.shouldIndicateDistinguishing === true) {
                heightAdjustment = heightAdjustment + 60;
            }
            if (vizConfig.shouldShowZscoreArrows === true && vizConfig.shouldIndicateDistinguishing === true) {
                heightAdjustment = heightAdjustment + 60;
            }
            if (vizConfig.shouldIndicateConsensus === true) {
                heightAdjustment = heightAdjustment + 30;
            }
            if (vizConfig.shouldShowZscoreArrows === true) {
                heightAdjustment = heightAdjustment + 30;
            }
            if (vizConfig.shouldShowBackgroundColor === true) {
                heightAdjustment = heightAdjustment + 30;
            }
            if (vizConfig.shouldIndicateConsensus === true && vizConfig.shouldShowBackgroundColor === true) {
                heightAdjustment = heightAdjustment + 30;
            }

            vizConfig.heightAdjustment = heightAdjustment;

            var b = [],
                prev;
            var arr = _.cloneDeep(arr1);
            arr.sort();
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] !== prev) {
                    b.push(1);
                } else {
                    b[b.length - 1]++;
                }
                prev = arr[i];
            }
            if (vizConfig.shouldHaveLegend === true) {
                svgHeightCalc = (((parseInt(elementHeight, 10) + 10) * d3.max(b)) + 160 + heightAdjustment); // plus 150 for legend
                return svgHeightCalc;
            } else {
                svgHeightCalc = (((parseInt(elementHeight, 10) + 10) * d3.max(b)) + 25);
                return svgHeightCalc; // 25 for the sort values header
            }
        }

        // todo - find cause of error with !=
        function wordwrap(text, max) {
            var language = QAV.getState("language");
            var lines = [];
            var line;
            if (vizConfig.shouldSetWidthForAsian === true) {
                max = vizConfig.asianStatmentLength || 12;
                lines = text.match(new RegExp('.{1,' + max + '}', 'g'));
            } else {
                var regex = new RegExp(".{0," + max + "}(?:\\s|$)", "g");
                while ((line = regex.exec(text)) != "") { // DO NOT CHANGE != TO !== - WILL THROW ERROR
                    lines.push(line);
                } // end while
            } // end 294 else
            return lines;
        } // end function

        var temp1,
            k,
            instances = [];
        for (k = 0; k < uniques.length; k++) {
            temp1 = findOccurrences(sortTriangleShape, uniques[k]);
            instances.push(temp1);
        }

        // get x position
        var xPosLoop = [];
        var counterX = 0;
        for (var m = 0; m < instances.length; m++) {
            for (var p = 0; p < instances[m]; p++) {
                xPosLoop.push(counterX);
            }
            counterX = counterX + 1;
        }

        // get y position
        var yPosLoop = [];
        var counterY;
        for (var r = 0; r < instances.length; r++) {
            counterY = 0;
            for (var s = 0; s < instances[r]; s++) {
                yPosLoop.push(counterY);
                counterY = counterY + 1;
            }
        }

        // legend location
        var yLegend = ((d3.max(yPosLoop) + 1) * elementHeight) + 50;
        var xLegendCenterPoint = ((((d3.max(xPosLoop) + 1) * elementWidth) + 20) / 2);
        var halfLegendWidth = 285;

        // text wrap variables - set in control panel?
        var maxLength;
        var newStatementWidth = vizConfig.statementWidth || 6.75;
        if (vizConfig.shouldSetStatementWidth === true) {
            maxLength = parseInt(((elementWidth - newStatementWidth) / 6.75), 10);
        } else {
            maxLength = parseInt((elementWidth / 6.75), 10);
        }

        // calc the height of the svg
        svgHeight = (getSvgHeight(sortTriangleShape) + 15);

        // get Cutoff from state
        var backgroundColorCutoff = vizConfig.backgroundColorCutoff;

        // adjust if display is only statement numbers
        var onlyNumbersXAdjustment = 0;
        if (vizConfig.shouldShowOnlyStateNo === true) {
            onlyNumbersXAdjustment = 6;
        }

        /*


        BEGIN visualizations calc loop


        */
        // loop through array to draw visualizations   synFactorVizDiv
        for (var z = 0; z < outputForDataViz.length; z++) {

            var zz = z + 1;

            var factorVizDivName = "factorVizDiv" + zz;
            $("#synFactorVizDiv")
                .append("<div id=" + factorVizDivName + "></div>");

            // appending name outside SVG
            // $("#" + factorVizDivName)
            //     .append("<h4 class='vizTitles'>" + synFactorVizTitleText + userSelectedFactors[z] + "</h4>");

            var idName = "synSortSvgNo" + zz;

            // add svg
            var svg = d3
                .select("#" + factorVizDivName)
                .append("svg")
                .attr('width', (containerWidth + 10))
                .attr('height', svgHeight)
                .attr('id', idName)
                .attr('class', "factorViz");

            var textArray1 = outputForDataViz[z];

            // sort by zScore z-score
            var textArray = textArray1.slice(0);
            textArray.sort(function (a, b) {
                if (a.zScore === b.zScore) {
                    return b.statement - a.statement;
                } else {
                    return a.zScore - b.zScore;
                }
            });

            // add location data
            for (var c = 0; c < textArray.length; c++) {
                textArray[c].xVal = xPosLoop[c];
                textArray[c].yVal = yPosLoop[c];
            }

            var index = svg
                .selectAll("g.node")
                .data(uniques, function (d) {
                    return d;
                });

            var indexGroup = index
                .enter()
                .append("g")
                .attr("class", "node");

            // draw headers    
            indexGroup
                .append('rect')
                .attr('width', elementWidth)
                .attr('height', '20')
                .attr('x', function (d) {
                    return ((uniques.indexOf(d) * elementWidth) + 5);
                })
                .attr('y', '45')
                .attr('fill', 'white')
                .attr('stroke', 'black');

            // draw column numbers    
            indexGroup
                .append('text')
                .attr('x', function (d) {
                    return ((uniques.indexOf(d) * elementWidth) + (elementWidth / 2) + 5);
                })
                .attr('y', '58') // was 16
                .style('text-anchor', 'middle')
                .attr('class', 'headerText')
                .attr('font-family', 'Arial')
                .attr('font-size', '14px')
                .attr('font-weight', 'bold')
                .attr('fill', 'black')
                .text(function (d) {
                    return d;
                });

            // associate data with identifiers
            var index2 = svg
                .selectAll("g.node2")
                .data(textArray, function (d) {
                    return d.statement;
                });

            // append statement rectangles group    
            var indexGroup2 = index2
                .enter()
                .append("g")
                .attr("class", "node2");

            // Pattern injection
            var pattern = svg.append("defs")
                .append("pattern")
                .attr({
                    id: "hash4_4",
                    width: "8",
                    height: "8",
                    patternUnits: "userSpaceOnUse",
                    patternTransform: "rotate(60)"
                })
                .append("rect")
                .attr({
                    width: "2",
                    height: "8",
                    transform: "translate(0,0)",
                    fill: consensusColor
                });

            var pattern2 = svg.append("pattern")
                .append("pattern")
                .attr({
                    id: "hash4_4b",
                    width: "8",
                    height: "8",
                    patternUnits: "userSpaceOnUse",
                    patternTransform: "rotate(135)"
                })
                .append("rect")
                .attr({
                    width: "2",
                    height: "8",
                    transform: "translate(0,0)",
                    fill: matchCountColor
                });

            var pattern3 = svg.append("pattern")
                .append("pattern")
                .attr({
                    id: "crosshatch",
                    width: "8",
                    height: "8",
                    patternUnits: "userSpaceOnUse",
                    patternTransform: "rotate(135)"
                })
                .append("rect")
                .attr({
                    width: "8",
                    height: "8",
                    transform: "translate(0,0)",
                    fill: "white",
                    stroke: overlapColor
                });

            // draw boxes for statements
            indexGroup2
                .append('rect')
                .attr('width', elementWidth)
                .attr('height', elementHeight)
                .attr('x', function (d) {
                    return ((d.xVal * elementWidth) + 5);
                })
                .attr('y', function (d) {
                    return ((d.yVal * elementHeight) + 60);
                })
                .attr('fill', function (d) {
                    if (vizConfig.shouldShowBackgroundColor === true || vizConfig.shouldIndicateConsensus === true) {
                        return d.displayFill;
                    } else {
                        return '#ffffff';
                    }
                })
                //.style('background-color', '#ffffff');
                .attr('stroke', 'black');

            // draw distinguishing statement symbols    
            if (vizConfig.shouldIndicateDistinguishing !== false) {
                indexGroup2
                    .append('text')
                    .attr('width', elementWidth)
                    .attr('height', elementHeight)
                    .attr('font-size', symbolSize)
                    .attr('x', function (d) {
                        return ((d.xVal * elementWidth) + 7); // was 5
                    })
                    .attr('y', function (d) {
                        return ((d.yVal * elementHeight) + 75); //was 38
                    })
                    .text(function (d) {
                        return d.sigVisualization;
                    });
            }
            // draw statements
            indexGroup2
                .append('text')
                .attr('class', 'wrap')
                .attr('font-family', 'Arial')
                .attr('font-size', cardFontSize)
                .attr('x', function (d) {
                    return ((d.xVal * elementWidth) + 8);
                })
                .attr('y', function (d) {
                    return ((d.yVal * elementHeight) + locateStateY + 35); // was 25
                })
                .attr('dy', 0)
                .each(function (d) {
                    var lines = wordwrap(d.displayStatements, maxLength);
                    for (var iii = 0; iii < lines.length; iii++) {
                        d3
                            .select(this)
                            .append("tspan")
                            .attr("dy", vSeparation)
                            .attr('text-anchor', 'middle')
                            .attr("x", (d.xVal * elementWidth) + (elementWidth / 2) + onlyNumbersXAdjustment)
                            .text(lines[iii]);
                    }
                });

            if (vizConfig.shouldShowMatchCounts === true) {
                indexGroup2
                    .append('text')
                    .attr('font-family', 'Arial')
                    .attr('font-size', cardFontSize)
                    .attr('x', function (d) {
                        return ((d.xVal * elementWidth) + (elementWidth * 0.97));
                    })
                    .attr('y', function (d) {
                        return ((d.yVal * elementHeight) + 83); // was 38
                    })
                    .style("text-anchor", "end")
                    .text(function (d) {
                        return (d.matchingCount + " (" + d.matchingCountPercent + "%)");
                    });
            }

            if (vizConfig.shouldHaveLegend === true) {

                var indexGroup3 = svg
                    .append("g")
                    .attr("class", "node3");

                indexGroup3
                    .append('rect')
                    .attr('height', 50 + vizConfig.heightAdjustment)
                    .attr('width', 575)
                    .attr('x', (xLegendCenterPoint - halfLegendWidth))
                    .attr('y', (yLegend + 35)) // was -5
                    .attr('fill', 'white')
                    .style('stroke', 'black');

                indexGroup3
                    .append('text')
                    //.attr('x', ((xLegendCenterPoint - halfLegendWidth) + 20)) // half of legend box width
                    .attr('x', (xLegendCenterPoint - 8)) // half of legend box width
                    .attr('y', (yLegend + 80)) // was 30
                    .attr('class', 'legendHeader')
                    .attr('font-family', 'Arial')
                    .attr('font-size', '20px')
                    .attr('text-anchor', 'middle')
                    //.text('Symbol')
                    .text(legendTitleText)
                    .attr('font-weight', 'bold');

                /*
                                indexGroup3
                                    .append('text')
                                    .attr('x', ((xLegendCenterPoint - halfLegendWidth) + 100)) // half of legend box width
                                    .attr('y', (yLegend + 30))
                                    .attr('class', 'legendHeader')
                                    .attr('font-family', 'Arial')
                                    .text('Interpretation')
                                    .attr('font-weight', 'bold');
                                    */

                // set X and Y values for legend
                var symbolY = 80; // was 34
                var legendTextY = 79; // was 30
                var legendSymbolX = 40;
                var legendTextX = 80;

                // symbols  - !==false is to set as default
                if (vizConfig.shouldIndicateDistinguishing === true) {
                    symbolY = symbolY + 28;
                    indexGroup3
                        .append('text')
                        .attr('x', ((xLegendCenterPoint - halfLegendWidth) + legendSymbolX))
                        .attr('y', (yLegend + symbolY))
                        .attr('font-size', symbolSize)
                        .text(vizConfig.legendSymbol05);

                    symbolY = symbolY + 30;

                    indexGroup3
                        .append('text')
                        .attr('x', ((xLegendCenterPoint - halfLegendWidth) + legendSymbolX))
                        .attr('y', (yLegend + symbolY))
                        .attr('font-size', symbolSize)
                        .text(vizConfig.legendSymbol01);
                }

                if (vizConfig.shouldShowZscoreArrows === true && vizConfig.shouldIndicateDistinguishing === true) {
                    symbolY = symbolY + 30;
                    indexGroup3
                        .append('text')
                        .attr('x', ((xLegendCenterPoint - halfLegendWidth) + legendSymbolX))
                        .attr('y', (yLegend + symbolY))
                        .attr('font-size', symbolSize)
                        .text(vizConfig.rightArrow);

                    symbolY = symbolY + 30;
                    indexGroup3
                        .append('text')
                        .attr('x', ((xLegendCenterPoint - halfLegendWidth) + legendSymbolX))
                        .attr('y', (yLegend + symbolY))
                        .attr('font-size', symbolSize)
                        .text(vizConfig.leftArrow);
                }

                if (vizConfig.shouldIndicateConsensus === true) {
                    symbolY = symbolY + 12;
                    indexGroup3
                        .append('rect')
                        .attr('height', 20)
                        .attr('width', 20)
                        .attr('x', ((xLegendCenterPoint - halfLegendWidth) + legendSymbolX - 2))
                        .attr('y', (yLegend + symbolY))
                        .attr('fill', consensusIndicator)
                        .style('stroke', 'black');
                    symbolY = symbolY + 18;
                }

                if (vizConfig.shouldShowBackgroundColor === true) {
                    symbolY = symbolY + 12;
                    indexGroup3
                        .append('rect')
                        .attr('height', 20)
                        .attr('width', 20)
                        .attr('x', ((xLegendCenterPoint - halfLegendWidth) + legendSymbolX - 2))
                        .attr('y', (yLegend + symbolY))
                        .attr('fill', matchCautionIndicator)
                        .style('stroke', 'black');
                    symbolY = symbolY + 18;
                }

                if (vizConfig.shouldShowBackgroundColor === true && vizConfig.shouldIndicateConsensus === true) {
                    symbolY = symbolY + 12;
                    indexGroup3
                        .append('rect')
                        .attr('height', 20)
                        .attr('width', 20)
                        .attr('x', ((xLegendCenterPoint - halfLegendWidth) + legendSymbolX - 2))
                        .attr('y', (yLegend + symbolY))
                        .attr('fill', overlapIndicator)
                        .style('stroke', 'black');
                    symbolY = symbolY + 18;
                }

                // if (shouldindi)

                // interpretation text
                if (vizConfig.shouldIndicateDistinguishing === true) {
                    legendTextY = legendTextY + 30;
                    indexGroup3
                        .append('text')
                        .attr('x', ((xLegendCenterPoint - halfLegendWidth) + legendTextX))
                        .attr('y', (yLegend + legendTextY))
                        .attr('font-family', 'Arial')
                        .text(disting05LegendText);

                    legendTextY = legendTextY + 30;
                    indexGroup3
                        .append('text')
                        .attr('x', ((xLegendCenterPoint - halfLegendWidth) + legendTextX))
                        .attr('y', (yLegend + legendTextY))
                        .attr('font-family', 'Arial')
                        .text(disting01LegendText);
                }
                if (vizConfig.shouldShowZscoreArrows === true && vizConfig.shouldIndicateDistinguishing === true) {
                    legendTextY = legendTextY + 30;
                    indexGroup3
                        .append('text')
                        .attr('x', ((xLegendCenterPoint - halfLegendWidth) + legendTextX))
                        .attr('y', (yLegend + legendTextY))
                        .attr('font-family', 'Arial')
                        .text(zscoreHigherLegendText);

                    legendTextY = legendTextY + 30;
                    indexGroup3
                        .append('text')
                        .attr('x', ((xLegendCenterPoint - halfLegendWidth) + legendTextX))
                        .attr('y', (yLegend + legendTextY))
                        .attr('font-family', 'Arial')
                        .text(zscoreLowerLegendText);
                }
                if (vizConfig.shouldIndicateConsensus === true) {
                    legendTextY = legendTextY + 30;
                    indexGroup3
                        .append('text')
                        .attr('x', ((xLegendCenterPoint - halfLegendWidth) + legendTextX))
                        .attr('y', (yLegend + legendTextY))
                        .attr('font-family', 'Arial')
                        .text(consensusLegendText);
                }

                if (vizConfig.shouldShowBackgroundColor === true) {
                    legendTextY = legendTextY + 30;
                    indexGroup3
                        .append('text')
                        .attr('x', ((xLegendCenterPoint - halfLegendWidth) + legendTextX))
                        .attr('y', (yLegend + legendTextY))
                        .attr('font-family', 'Arial')
                        .text(matchingCountLegendText + " " + vizConfig.backgroundColorCutoff + '%)');
                }
                if (vizConfig.shouldShowBackgroundColor === true && vizConfig.shouldIndicateConsensus === true) {
                    legendTextY = legendTextY + 30;
                    indexGroup3
                        .append('text')
                        .attr('x', ((xLegendCenterPoint - halfLegendWidth) + legendTextX))
                        .attr('y', (yLegend + legendTextY))
                        .attr('font-family', 'Arial')
                        .text(overlapLegendText);
                }
            } // end of should have legend

            // add Factor Names inside SVG
            var newText;
            if (vizConfig.addCustomFactorName === true && vizConfig.customFactorNames[z]) {
                newText = vizConfig.customFactorNames[z];
            } else {
                var capitalizedFactorName = userSelectedFactors[z].charAt(0).toUpperCase() + userSelectedFactors[z].slice(1);
                newText = synFactorVizTitleText + capitalizedFactorName;
            }
            svg.append('text')
                .attr('x', 5)
                .attr('y', 28)
                .attr('font-family', 'Arial')
                .attr('font-size', '30px')
                .attr('fill', 'black')
                .text(newText);


            var thisFactorName = userSelectedFactors[z].replace(/\s/g, '');
            var downloadText = resources[language].translation.downloadImage;
            var $thisSvg = $("#" + factorVizDivName);
            $thisSvg.append('<input class="svgDownloadButton blackHover" name="downloadButton" id="' + thisFactorName + 'Image"   type="button" value="' + userSelectedFactors[z] + downloadText + '" />');
            $thisSvg.append('<input class="pngDownloadButton blackHover" name="downloadPngButton" id="' + thisFactorName + 'PngImage"   type="button" value="' + userSelectedFactors[z] + ' - Download image as PNG' + '" />');
        } // end z loop to add visualizations

        $('.svgDownloadButton')
            .on('mousedown', function (event) {
                var vizConfig = QAV.getState("vizConfig") || {};
                var shouldAddName = vizConfig.shouldAddCustomName;
                var svgId = $(this)
                    .parent()
                    .find("svg")
                    .attr('id');
                var arrayIndexNumber = (svgId.slice(-1) - 1);
                var factorName = userSelectedFactors[arrayIndexNumber];
                var cleanFactorName = factorName.replace(/\s+/g, '');
                var date = UTIL.currentDate1();
                var time = UTIL.currentTime1();
                var dateTime = date + "_" + time;
                var projectName = QAV.getState("qavProjectName");
                var customName = vizConfig.customName;
                if (shouldAddName === true) {
                    if (vizConfig.customNameLocation === "prepend") {
                        config = {
                            filename: customName + "_" + projectName + "_" + cleanFactorName + "_" + dateTime
                        };
                    } else if (vizConfig.customNameLocation === "append") {
                        config = {
                            filename: projectName + "_" + cleanFactorName + "_" + dateTime + "_" + customName
                        };
                    } else if (vizConfig.customNameLocation === "replace") {
                        config = {
                            filename: customName
                        };
                    } else {
                        config = {
                            filename: projectName + "_" + cleanFactorName + "_" + dateTime
                        };
                    }
                } else {
                    config = {
                        filename: projectName + "_" + cleanFactorName + "_" + dateTime
                    };
                }
                d3_save_svg.save(d3.select('#' + svgId)
                    .node(), config);
            });

        $('.pngDownloadButton')
            .on('mousedown', function (event) {
                var nameConfig;
                var vizConfig = QAV.getState("vizConfig") || {};
                var shouldAddName = vizConfig.shouldAddCustomName;
                console.log(shouldAddName);
                var svgId = $(this)
                    .parent()
                    .find("svg")
                    .attr('id');
                var arrayIndexNumber = (svgId.slice(-1) - 1);
                var factorName = userSelectedFactors[arrayIndexNumber];
                var cleanFactorName = factorName.replace(/\s+/g, '');
                var date = UTIL.currentDate1();
                var time = UTIL.currentTime1();
                var dateTime = date + "_" + time;
                var projectName = QAV.getState("qavProjectName");
                var customName = vizConfig.customName;
                console.log(customName);
                if (shouldAddName === true) {
                    if (vizConfig.customNameLocation === "prepend") {
                        nameConfig = customName + "_" + projectName + "_" + cleanFactorName;
                    } else if (vizConfig.customNameLocation === "append") {
                        nameConfig = projectName + "_" + cleanFactorName + "_" + customName;
                    } else if (vizConfig.customNameLocation === "replace") {
                        nameConfig = customName;
                    } else {
                        nameConfig = projectName + "_" + cleanFactorName;
                    }
                } else {
                    nameConfig = projectName + "_" + cleanFactorName;
                }

                var svgString = UTIL.getSVGString(d3.select('#' + svgId)
                    .node());
                var svgCharacteristics = d3.select('#' + svgId);
                // var width = parseInt(thisSvgCharacteristics.style("width"), 10) + 2;
                // var height = parseInt(thisSvgCharacteristics.style("height"), 10);
                UTIL.downloadPngImages(svgString, svgCharacteristics, nameConfig); // passes Blob and filesize 
            });


        PRELIMOUT.showPreliminaryOutput1b();
    };



    // ************************************************************************  view
    // ******  Preliminary Results 1b - draw factor score correlations table  ********
    // ******************************************************************************
    PRELIMOUT.showPreliminaryOutput1b = function () {
        var language = QAV.getState("language");
        var headerText = resources[language].translation["Factor score correlations"];

        // add factor correlations and loadings tables
        $("#factorCorrelationTableTitle").append("<h4>" + headerText + "</h4>");

        //  todo - fix ordering error of factors - use large demo set with 7 factors to see error and reduce appends to only one

        $("#factorCorrelationTableDiv").append('<table id="factorCorrelationTable" class="display compact nowrap cell-border stripe"></table>');

        // var data = QAV.getState("outputSpreadsheetArray");

        // var newData = data[6];

        var newData = QAV.getState("correlationTableArrayHolder");


        //        var columnHeadersArray = data[5][0];
        var columnHeadersArray = newData[0];
        var columnHeaders = [];
        for (var i = 0; i < columnHeadersArray.length; i++) {
            var tempObj = {};
            tempObj.title = columnHeadersArray[i];
            tempObj.class = "dt-head-center dt-body-right";
            columnHeaders.push(tempObj);
        }

        columnHeaders[0].class = "dt-head-center dt-body-center";

        newData.shift();

        $("#factorCorrelationTable").DataTable({
            "retrieve": true,
            "searching": false,
            "ordering": false,
            "info": false,
            "scrollY": 350,
            "scrollCollapse": false,
            "scrollX": false,
            "paging": false,
            "data": newData,
            "columns": columnHeaders
        });

        var table = $('#factorCorrelationTable').DataTable();
        var lastIdx = null;
        $('#factorCorrelationTable tbody').on('mouseover', 'td', function () {
                var colIdx = table
                    .cell(this)
                    .index()
                    .column;
                if (colIdx !== lastIdx) {
                    $(table.cells().nodes()).removeClass('highlight');
                    $(table.column(colIdx).nodes()).addClass('highlight');
                }
            })
            .on('mouseleave', function () {
                $(table.cells().nodes()).removeClass('highlight');
            });
        showPreliminaryOutput2();
    };

    // **********************************************************************  view
    // ******  Preliminary Results 2 - draw factor score tables  ******************
    // ****************************************************************************

    // todo - use document fragment to get rid of all these appends

    function showPreliminaryOutput2() {

        var userSelectedFactors = QAV.getState("userSelectedFactors");

        //  todo - fix ordering error of factors - use large demo set with 7 factors to see error
        //var data = QAV.getState("outputSpreadsheetArray");


        var language = QAV.getState("language");
        var chartText1 = resources[language].translation["Flagged q - sort weights"];
        var chartText2 = resources[language].translation["Flagged q-sort correlations"];
        var chartText3 = resources[language].translation["Z-scores, sort values, raw sorts"];
        var chartText4 = resources[language].translation["Statement Number"];
        var chartText5 = resources[language].translation.Statement;
        var chartText6 = resources[language].translation["Z-score"];
        var chartText7 = resources[language].translation["Sort Values"];
        var chartText8 = resources[language].translation.Weight;

        var factorWeightFactorArray = QAV.getState("factorWeightFactorArrayHolder");
        var miniCorrelationArray = QAV.getState("miniCorrelationArrayHolder");
        var synFactorArray1 = QAV.getState("synFactorArray1Holder");


        // START FOR EACH FACTOR LOOP
        for (var j = 0; j < userSelectedFactors.length; j++) {

            var factorNumber = j + 1;

            var factorH4Label = _.capitalize(userSelectedFactors[j]);

            $("#factorTables").append('<div class="resultsLabel1"><h4>' + factorH4Label + ' - ' + chartText1 + '</h4></div><table id="factorWeightResults' + factorNumber + '" class="display compact nowrap cell-border stripe"></table>');

            var newWeightData = factorWeightFactorArray[j];
            newWeightData.shift();
            var weightColumnHeaders = [{
                title: "Q-Sort",
                class: "dt-head-center dt-body-center"
            }, {
                title: chartText8,
                class: "dt-head-center dt-body-center"
            }];

            $("#factorWeightResults" + factorNumber).DataTable({
                "retrieve": true,
                "searching": false,
                "ordering": true,
                "order": [
                    [1, "desc"]
                ],
                "info": false,
                "scrollY": 800,
                "scrollCollapse": true,
                "scrollX": true,
                "paging": false,
                "data": newWeightData,
                "columns": weightColumnHeaders,
                "columnDefs": [{
                    targets: [0],
                    className: 'dt-body-center dt-body-name'
                }, {
                    targets: '_all',
                    "createdCell": function (td, cellData, rowData, row, col) {
                        if (cellData < 0) {
                            $(td).css('color', 'red');
                        }
                    }
                }]
            });

            $("#factorTables").append('<div class="resultsLabel1"><h4>' + factorH4Label + ' - ' + chartText2 + '</h4></div><table id="factorMiniCorrelResults' + factorNumber + '" class="display compact nowrap cell-border stripe"></table>');

            var newMiniCorrData = miniCorrelationArray[j];
            var miniCorrColumnHeaders = [{
                title: "Q-Sort",
                class: "dt-head-center dt-body-center"
            }];

            for (var k = 1; k < newMiniCorrData[0].length; k++) {
                var tempObjMC = {};
                tempObjMC.title = newMiniCorrData[0][k];
                tempObjMC.class = "dt-head-center dt-body-center";
                miniCorrColumnHeaders.push(tempObjMC);
            }

            newMiniCorrData.shift();

            $("#factorMiniCorrelResults" + factorNumber).DataTable({
                "retrieve": true,
                "searching": false,
                "ordering": false,
                "info": false,
                "scrollY": 800,
                "scrollCollapse": true,
                "scrollX": true,
                "paging": false,
                "data": newMiniCorrData,
                "columns": miniCorrColumnHeaders,
                "columnDefs": [{
                    targets: [0],
                    className: 'dt-body-center dt-body-name'
                }, {
                    targets: '_all',
                    "createdCell": function (td, cellData, rowData, row, col) {
                        if (cellData < 0) {
                            $(td).css('color', 'red');
                        }
                    }
                }]
            });

            $("#factorTables").append('<div class="resultsLabel1"><h4>' + factorH4Label + ' - ' + chartText3 + '</h4></div><table id="prelimResults' + factorNumber + '" class="display compact nowrap cell-border stripe"></table>');

            var newData = synFactorArray1[j];

            // resort back to high to low z-score sort
            newData
                .sort(function (a, b) {
                    if (b[chartText6] === a[chartText6]) {
                        return a[chartText4] - b[chartText4];
                    } else {
                        return b[chartText6] - a[chartText6];
                    }
                });

            var columnHeadersArray = Object.keys(newData[0]);

            // the set leftmost 4 columns
            var columnHeaders = [{
                title: chartText4,
                class: "dt-head-center dt-body-center",
                "data": chartText4
            }, {
                title: chartText5,
                class: "dt-head-center dt-body-left",
                "data": chartText5
            }, {
                "data": chartText6,
                title: chartText6,
                class: "dt-head-center dt-body-right"
            }, {
                title: chartText7,
                class: "dt-head-center dt-body-center",
                "data": chartText7
            }];
            // looping in all of the raw sort column headers
            for (var i = 4; i < columnHeadersArray.length; i++) {
                var tempObj = {};
                tempObj.title = columnHeadersArray[i];
                tempObj.class = "dt-head-center dt-body-center";
                tempObj.data = columnHeadersArray[i];
                columnHeaders.push(tempObj);
            }

            $("#prelimResults" + factorNumber).DataTable({
                "fixedColumns": {
                    leftColumns: 1
                },
                "retrieve": true,
                "searching": false,
                "ordering": true,
                "order": false,
                "info": false,
                "scrollY": 800,
                "scrollCollapse": true,
                "scrollX": true,
                "paging": false,
                "data": newData,
                "columns": columnHeaders
            });

        }
    }

    // **********************************************************************  view
    // ******  dynamicallly append checkboxs to select factors for analysis *******
    // ****************************************************************************
    PRELIMOUT.appendFactorSelectionCheckboxes = function () {

        var hasSplitFactor = QAV.getState("hasSplitFactor");
        var j,
            len,
            k,
            temp5,
            pcaFactorLabels = [];
        // read in factor labels to generate checkboxes (and checking for split factor)
        var factorsToSelect;

        var loopLen;
        loopLen = QAV.getState("numFactorsRetained");

        if (hasSplitFactor > 0) {

            var headers = QAV.getState("factorLabels");
            var i,
                temp1,
                temp3;
            factorsToSelect = [];

            headers.shift();
            headers.shift();
            headers.shift();
            headers.pop();

            for (i = 0; i < headers.length; i++) {
                temp1 = headers[i].title;
                if (temp1 !== "flag") {
                    temp3 = temp1.replace(/Ftr/g, 'Factor');
                    factorsToSelect.push(temp3);
                }
            }
            loopLen = factorsToSelect.length;

        } else {

            if (QAV.typeOfFactor === "PCA") {
                for (k = 0, len = QAV.numFactorsRetained; k < len; k++) {
                    temp5 = "factor " + (k + 1);
                    pcaFactorLabels.push(temp5);
                }

                factorsToSelect = pcaFactorLabels;
            } else {

                factorsToSelect = QAV.getState("factorLabels");
                if (factorsToSelect[0] === "") {
                    factorsToSelect.shift();
                }
            }
        }

        QAV.setState("factorLabelsArray", factorsToSelect);

        // check to see if checkboxes are already appended, and if so remove them
        VIEW.removeOutputFactorCheckboxes();

        //  generate and append checkboxes
        for (j = 0; j < loopLen; j++) {

            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "analysisFactors";
            checkbox.className = "factorSelectBox";
            checkbox.value = "value";
            checkbox.id = factorsToSelect[j];

            var label = document.createElement('label');
            label.htmlFor = factorsToSelect[j];
            label.classList.add("checkboxLabel");
            label.appendChild(document.createTextNode(factorsToSelect[j]));
            document
                .getElementById("selectFactorsForOutputDiv")
                .appendChild(checkbox);
            document
                .getElementById("selectFactorsForOutputDiv")
                .appendChild(label);
        }
    };


    // *****************************************************************************  
    // **************  pull user-selected factors for analysis *********************
    // *****************************************************************************

    PRELIMOUT.getFactorsForAnalysis = function () {
        var checkboxes = document.getElementsByName('analysisFactors');
        var vals = [];
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                vals.push(checkboxes[i].id);
            }
        }
        QAV.setState("userSelectedFactors", vals);
    };

    // *********************************************************************  model
    // **************  pull loadings that have been flagged  **********************
    // ****************************************************************************

    PRELIMOUT.pullFlaggedFactorLoadings = function () {
        var numberFactorsExtracted = parseInt(QAV.getState("numberFactorsExtracted"));
        var results = QAV.getState("results");
        var jLoopLen = (numberFactorsExtracted * 2) + 3;
        var significantLoadingsArray = [];
        var i,
            j;
        var isLoadingSignificant,
            factorNumber,
            respondentName,
            factorLoading;
        // todo check to see if this can be removed see bind dump button function
        var iLoopLen = results.length;
        var factorLabelsArray = QAV.getState("factorLabelsArray");
        var loadingSortCheckArray = [];
        var userSelectedFactors = QAV.getState("userSelectedFactors");

        // loop thru results array to find user-selected factor loadings
        for (i = 0; i < iLoopLen; i++) {
            var factorNumberCount = 0;

            var tempArray = [];
            for (j = 4; j < jLoopLen; j += 2) {
                isLoadingSignificant = results[i][j];
                factorNumber = factorLabelsArray[factorNumberCount];
                factorNumberCount = factorNumberCount + 1;
                respondentName = results[i][1];
                factorLoading = results[i][j - 1];

                // if flagged and in a user-selected factor
                if (isLoadingSignificant === "true" && (userSelectedFactors.indexOf(factorNumber) > -1)) {
                    tempArray.push(factorNumber, respondentName, factorLoading);
                    loadingSortCheckArray.push(factorNumber);
                }
            }
            if (tempArray.length === 0) {
                tempArray.push(99, respondentName, "Unique Sort");
                significantLoadingsArray.push(tempArray);
            } else {
                significantLoadingsArray.push(tempArray);
            }
        }

        // check for sorts flagged for more than one factor user error
        var multipleFlags;
        var problemSort;
        for (var k = 0; k < significantLoadingsArray.length; k++) {

            var test = significantLoadingsArray[k];

            if (test.length > 3) {
                problemSort = significantLoadingsArray[k][1];
                multipleFlags = false;
            }
        }

        // check for user-selected factors with no loading sorts user error
        var loadingSortCheck = $(userSelectedFactors)
            .not(loadingSortCheckArray)
            .length === 0;
        var language = QAV.getState("language");
        var appendText1 = resources[language].translation["The sort for respondent"];
        var appendText2 = resources[language].translation["is flagged for more than one factor"];

        if (loadingSortCheck === false) {
            VIEW.showNoSortsFlaggedOnFactorModal();
            // prevent display output of factors
            return "false";

        } else if (multipleFlags === false) {
            $("#multipleFlagModalMessageDiv p").remove();
            $("#multipleFlagModalMessageDiv").append("<p>" + appendText1 + problemSort + appendText2 + "</p>");
            VIEW.showSortFlaggedOnMultipleFactorsModal();
            return "false";
        } else {
            significantLoadingsArray
                .sort(function (a, b) {
                    if (a[0] < b[0]) {
                        return -1;
                    }
                    if (a[0] > b[0]) {
                        return 1;
                    }
                    return 0;
                });
            computeFactorWeights(significantLoadingsArray);
        }
    };

    function computeFactorWeights(significantLoadingsArray) {
        // source code line 4440

        for (var i = 0; i < significantLoadingsArray.length; i++) {
            var f = evenRound((significantLoadingsArray[i][2]), 8);
            var f2 = evenRound((f * f), 8);
            var oneMinusF2,
                w;
            if (f2 === 1) {
                oneMinusF2 = f2;
                w = evenRound((f / oneMinusF2), 8);
            } else if (f2 > 1) {
                oneMinusF2 = evenRound((1 - f2), 8);
                w = evenRound((f / -oneMinusF2), 8);
            } else {
                oneMinusF2 = evenRound((1 - f2), 8);
                w = evenRound((f / oneMinusF2), 8);
            }
            significantLoadingsArray[i].push(w);
        }
        QAV.setState("sortWeights", significantLoadingsArray);

        findLargestFactorWeights(significantLoadingsArray);
    }

    // create array of highest values to use later for calcuations
    function findLargestFactorWeights(significantLoadingsArray) {

        // remove unique sorts (value 99) from array
        var factorSelect = _.filter(significantLoadingsArray, function (n) {
            return n[0] !== 99;
        });

        // pull out just factor number and W value to array
        var factorNumbersArray2 = [];
        var factorNumbersArray = [];
        _(factorSelect).forEach(function (n) {
            var tempArray = [];
            var factorNumber = n[0];
            factorNumbersArray2.push(factorNumber);
            var factorWeightW = n[3];
            tempArray[0] = factorNumber;
            tempArray[1] = factorWeightW;
            factorNumbersArray.push(tempArray);
        }).value();

        var sigArray = _.cloneDeep(factorNumbersArray2);

        // get unique array of significant factors labels
        var sigFactorNumbersArray = _.uniq(sigArray);

        var maxFactorValuesArray = [];
        var factorValue = 0;
        _(sigFactorNumbersArray).forEach(function () {
            var temp = _(factorNumbersArray).filter(function (j) {
                return j[0] === sigArray[factorValue];
            });

            var tempArray2 = [];
            var maxFactorLoadings = _(temp).forEach(function (q) {
                var tempVar3 = evenRound((Math.abs(1 / q[1])), 8);
                tempArray2.push(tempVar3);
            }).value();

            // numbers inverted, so using min rather max somewhere else
            var maxFactorValue = _.min(tempArray2);

            maxFactorValuesArray.push(maxFactorValue);

            factorValue = factorValue + 1;
        }).value();

        // array
        QAV.setState("sigFactorNumbersArray", sigFactorNumbersArray);

        // highest values
        weightFactorScores(significantLoadingsArray, sigFactorNumbersArray, maxFactorValuesArray);
    }

    function weightFactorScores(significantLoadingsArray, sigFactorNumbersArray, maxFactorValuesArray) {
        // produces array with factor number, flagged respondent name, and 2 weight values
        var significantFactors = [];
        for (var j = 0, jLen = sigFactorNumbersArray.length; j < jLen; j++) {
            for (var k = 0; k < significantLoadingsArray.length; k++) {
                var temp1 = significantLoadingsArray[k][0];
                var temp2 = sigFactorNumbersArray[j];
                if (temp1 === temp2) {
                    var divisor = maxFactorValuesArray[j];
                    significantLoadingsArray[k][3] = evenRound((significantLoadingsArray[k][3] * divisor), 8) * 10;
                    significantFactors.push(significantLoadingsArray[k]);
                }
            }
        }
        weightRawSorts(significantFactors);
    }

    function weightRawSorts(significantFactors) {
        // produces MD array with factor number, flagged respondent, weighted values for each statement (for each flagged respondent)
        var respondentNames = QAV.getState("qavRespondentNames");
        var rawSorts = QAV.getState("positiveShiftedRawSorts");
        var weightedSorts = [];
        // normalize weights by sort
        var normalizedSorts = [];
        for (var s = 0, sLen = rawSorts.length; s < sLen; s++) {
            var tempArray2a = [];
            var sortAverage = UTIL.average(rawSorts[s]);
            var sortStandardDeviation = UTIL.standardDeviation(rawSorts[s]);
            for (var r = 0, rLen = rawSorts[s].length; r < rLen; r++) {
                var zScore = evenRound(((rawSorts[s][r] - sortAverage) / sortStandardDeviation), 3);
                tempArray2a.push(zScore);
            }
            normalizedSorts.push(tempArray2a);
        }
        var rawSortsPrep = _.zip(respondentNames, normalizedSorts);

        // multiply normaized sorts by weighting value
        for (var i = 0, iLen = significantFactors.length; i < iLen; i++) {
            for (var j = 0, jLen = rawSortsPrep.length; j < jLen; j++) {
                var temp1 = significantFactors[i][1];
                var temp2 = rawSortsPrep[j][0];
                var temp3 = rawSortsPrep[j][1];
                var temp4 = significantFactors[i][3];
                var tempArray = [];
                if (temp1 === temp2) {
                    var newWeightedSort = _.map(temp3, roundNumbers);
                    // push factor number
                    tempArray.push(significantFactors[i][0]);
                    // push respondent name
                    tempArray.push(temp1);
                    tempArray.push(newWeightedSort);
                    weightedSorts.push(tempArray);
                }
            }
        }
        combineWeightedSorts(weightedSorts);

        function roundNumbers(n) {
            var temp5 = evenRound((n * temp4), 8);
            return temp5;
        }
    }

    function combineWeightedSorts(weightedSorts) {
        var sigFactorNumbersArray1 = QAV.getState("sigFactorNumbersArray");
        var sigFactorNumbersArray = sigFactorNumbersArray1.sort();
        var tempArray2,
            summedWeightedSorts;

        summedWeightedSorts = [];
        var sigSortsArray = [];

        // looping through all selected factor names in sig factor array
        for (var i = 0, iLen = sigFactorNumbersArray.length; i < iLen; i++) {
            var tempArray4 = [];
            var tempArray1 = [];
            var factor = sigFactorNumbersArray[i];
            tempArray2 = [];
            var tempObj2 = {};

            // loop through all data for all factors and pull data for only for selected factors
            for (var j = 0, jLen = weightedSorts.length; j < jLen; j++) {
                var temp2 = weightedSorts[j][0]; // gives number 1 or 2 or 3 etc...
                if (temp2 === factor) {
                    tempArray1.push(weightedSorts[j][2]); // pushes weight for each statement
                    tempArray2.push(weightedSorts[j][1]); // pushes flagged sort respondent name
                }
            }

            // pushes factor numbers and representative sorts into array
            tempArray4.push(factor); // array of names of user selected factors
            tempArray4.push(tempArray2); // array of flagged respondent names

            // converts array of factor numbers and rep sorts to object
            tempObj2["Factor Number"] = factor;
            tempObj2.SigSorts = tempArray2;
            sigSortsArray.push(tempObj2);

            // summing weights for statements across flagged sorts for each factor
            var tempArray3 = [];
            for (var k = 0, kLen = tempArray1[0].length; k < kLen; k++) {
                var temp3 = 0;
                for (var m = 0, mLen = tempArray1.length; m < mLen; m++) {
                    temp3 = evenRound((temp3 + tempArray1[m][k]), 3);
                }
                tempArray3.push(temp3);
            }

            // re-normalize factor loadings after summing across statements
            var tempArray3a = [];
            var sortAverage = UTIL.average(tempArray3);
            var sortStandardDeviation = UTIL.standardDeviation(tempArray3);
            for (var r = 0, rLen = tempArray3.length; r < rLen; r++) {
                var zScore = evenRound(((tempArray3[r] - sortAverage) / sortStandardDeviation), 3);
                tempArray3a.push(zScore);
            }
            tempArray4.push(tempArray3a);
            summedWeightedSorts.push(tempArray4);
        }
        QAV.setState("sigSortsArray", sigSortsArray);
        calculateZScores(summedWeightedSorts);
    }

    function calculateZScores(summedWeightedSorts) {
        // changing format from MD array to array of objects
        // add in statements
        var statements = QAV.getState("qavCurrentStatements");
        var sigFactorNumbersArray = QAV.getState("sigFactorNumbersArray");
        // so that the diff 2 factors output is correct
        sigFactorNumbersArray.sort();
        var length = summedWeightedSorts.length;
        var zScoreArray = [];

        for (var i = 0; i < length; i++) {
            var zScoreTempObj = {};
            zScoreTempObj.factor = sigFactorNumbersArray[i];
            var tempArray1 = [];
            var zScoreTempArray = [];
            for (var j = 0; j < summedWeightedSorts[0][2].length; j++) {
                var tempObj = {};
                var zScore = evenRound((summedWeightedSorts[i][2][j]), 3);

                tempObj.factor = sigFactorNumbersArray[i];
                tempObj.statement = (j + 1);
                tempObj.sortStatement = statements[j];
                tempObj.zScore = zScore;

                zScoreTempArray.push(zScore);
                tempArray1.push(tempObj);
            }
            zScoreArray.push(tempArray1);
            zScoreTempObj["FactorZscores" + sigFactorNumbersArray[i]] = zScoreTempArray;
        }
        assignFactorScores(zScoreArray);
    }

    function assignFactorScores(zScoreArray) {
        var qavSortTriangleShape = QAV.getState("qavSortTriangleShape");
        var sortedZScoreArray = [];
        for (var i = 0; i < zScoreArray.length; i++) {
            var factorNumbers = zScoreArray[i];

            var temp1 = _.cloneDeep(factorNumbers);

            temp1.sort(function (a, b) {
                if (a.zScore === b.zScore) {
                    return b.statement - a.statement;
                } else {
                    return a.zScore - b.zScore;
                }
            });

            for (var j = 0; j < qavSortTriangleShape.length; j++) {
                temp1[j].sortValue = qavSortTriangleShape[j];
                temp1[j].sigVisualization = "";
            }
            temp1.sort(function (a, b) {
                return a.statement - b.statement;
            });
            sortedZScoreArray.push(temp1);
        }
        QAV.setState("analysisOutput", sortedZScoreArray);
    }

}(window.PRELIMOUT = window.PRELIMOUT || {}, QAV));