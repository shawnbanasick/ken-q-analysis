//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global window, $, d3, resources, window, _, ROTA, localStorage, QAV, PCA, document, performance*/


//***************************************************************************   model
//******* custom rounding - to evens  ***********************************************
//***********************************************************************************
// another attempt at custom rounding to mimic pqmethod? "bankers / gaussian rounding"
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

(function (UTIL, QAV, undefined) {

    UTIL.drawDatatable = function (configObj) {
        $(configObj.domElement).DataTable({
            "fixedColumns": configObj.fixed,
            "retrieve": true,
            "searching": false,
            "ordering": configObj.ordering,
            "info": false,
            "destroy": true,
            "scrollY": 800,
            "scrollCollapse": true,
            "scrollX": true,
            "paging": false,
            "data": configObj.data,
            "columns": configObj.headers,
            "columnDefs": configObj.colDefs,
        });

        var table = $(configObj.domElement).DataTable();
        $(configObj.domElement + ' tbody')
            .on('mouseenter', 'td', function () {
                var colIdx = table.cell(this).index().column;
                $(table.cells().nodes()).removeClass('highlight');
                $(table.column(colIdx).nodes()).addClass('highlight');
            })
            .on('mouseleave', function () {
                $(table.cells().nodes()).removeClass('highlight');
                $(table.columns().nodes()).removeClass('highlight');
            });
    };

    UTIL.addFactorSelectCheckboxesRotation = function (loopLength) {

        // clear checkboxes if previously added to DOM
        var checkboxFrameCheck = $("#checkboxFrame");
        if (checkboxFrameCheck.length > 0) {
            checkboxFrameCheck.empty();
        }

        var language = QAV.getState("language");
        var facText = resources[language].translation.Factor;

        // add checkboxes to DOM according to number factors extracted
        for (var k = 0; k < loopLength; k++) {
            var incrementedK = k + 1;

            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.name = "radioCheck";
            checkbox.value = incrementedK;
            checkbox.className = "checkbox";
            checkbox.id = "checkChart" + incrementedK;

            var label = document.createElement('label');
            label.htmlFor = "checkChart" + incrementedK;
            label.className = "checkboxLabel";
            label.appendChild(document.createTextNode(facText + " " + incrementedK));

            document.getElementById("checkboxFrame").appendChild(checkbox);
            document.getElementById("checkboxFrame").appendChild(label);
        }
    };

    // ***************************************************************   model
    // ***** check for unique names and sanitize  ****************************
    // ***********************************************************************
    UTIL.checkUniqueName = function (namesFromExistingData) {
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
    };

    UTIL.calculateSortTriangleShape = function (pyramidShapeNumbers) {

        var sortPossibleValues = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

        var qavSortTriangleShape = [];
        for (var i = 0; i < sortPossibleValues.length; i++) {
            for (var j = 0; j < pyramidShapeNumbers[i]; j++) {
                qavSortTriangleShape.push(sortPossibleValues[i]);
            }
        }
        QAV.setState("qavSortTriangleShape", qavSortTriangleShape);
    };

    UTIL.sanitizeUserInputText = function (input) {
        var output = input.replace(/<script[^>]*?>.*?<\/<\/script>/gi, '').
        replace(/<[\/\!]*?[^<>]*?>/gi, '').
        replace(/<style[^>]*?>.*?<\/style>/gi, '').
        replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
        return output;
    };

    // helper function for export routines
    UTIL.threeDigitPadding = function (e) {
        if (e < 0) {
            return " " + e;
        } else if (e < 10) {
            return "  " + e;
        } else if (e > 99) {
            return e;
        } else {
            return " " + e;
        }
    };

    UTIL.currentDate1 = function () {
        var currentDate = new Date();
        var Day = currentDate.getDate();
        if (Day < 10) {
            Day = '0' + Day;
        }
        var Month = currentDate.getMonth() + 1;
        if (Month < 10) {
            Month = '0' + Month;
        }
        var Year = currentDate.getFullYear();
        var fullDate = Year + "-" + Month + "-" + Day;
        return fullDate;
    };

    UTIL.currentTime1 = function () {
        var currentTime = new Date();
        var Minutes = currentTime.getMinutes();
        if (Minutes < 10) {
            Minutes = '0' + Minutes;
        }
        var Hour = currentTime.getHours();
        if (Hour < 10) {
            Hour = '0' + Hour;
        }

        var Time = String(Hour) + "-" + String(Minutes);

        return Time;
    };

    UTIL.checkIfValueIsNumber = function (value, inputBoxId) {
        if (isNaN(value)) {
            $("#" + inputBoxId).css("border", "red solid 3px");
        } else {
            $("#" + inputBoxId).css("border", "lightgray solid 1px");
        }
    };

    //Function to convert hex format to a rgb color
    UTIL.rgb2hex = function (rgb) {
        console.log(rgb);
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" +
            ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
    };


    // todo - check if still used or delete
    UTIL.checkIfValueIsHex = function (hexCodeValue, inputBoxId) {
        var box = $("#" + inputBoxId);
        if (hexCodeValue.length > 6) {
            var isOk = Boolean(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(hexCodeValue));
            if (isOk === true) {
                box.css("border", "lightgray solid 1px");
                box.css("background-color", hexCodeValue);
                return hexCodeValue;
            } else {
                box.css("background-color", "#ffffff");
                box.css("border", "red solid 3px");
            }
        } else {
            box.css("background-color", "#ffffff");
            box.css("border", "lightgray solid 1px");
        }
    };

    // *************************************************************  Data Model
    // **********  Archive function to allow undo of rotations *****************
    // *************************************************************************

    UTIL.archiveFactorScoreStateMatrixAndDatatable = function () {

        // saveRotationArchieveCounter is reset to 1 on centroid extraction function call

        // get current table data including flags
        var table = $('#factorRotationTable2').dataTable();
        var chartData = table.fnGetData();


        // get current footer data and push into table data
        var footerData = QAV.getState("expVar");

        // get copy of current state matrix
        var rotFacStateArray = QAV.getState("rotFacStateArray");

        // get copy of current rotation table headers (for undo bipolar split charting)
        var columnHeadersArray = QAV.getState("columnHeadersArray");

        var archiveArray = [];

        // store curr rotation data, chartdata with user flags, and headers in archive array
        archiveArray.push(rotFacStateArray, chartData, columnHeadersArray, footerData);

        // archive both in local storage with key + counter
        QAV.setState("rotFacStateArrayArchive" + ROTA.saveRotationArchiveCounter("get"), archiveArray);

        ROTA.saveRotationArchiveCounter("increase");
    };

    // todo - remove autocomplete="off" for Firefox from index.html and use this
    //    (function () {
    //        $(window).unload(function() {
    //            $('#existingDatabaseSelect select option').remove();
    //
    //        });
    //    })();
    //

    UTIL.drawScreePlot = function (dataArray) {
        var i, data, chartSize, margin, width, height;
        var tempArray, maxValue, xTicks;

        maxValue = _.max(dataArray);
        if (maxValue < 10 && maxValue > 5) {
            maxValue = 10;
        } else if (maxValue < 5) {
            maxValue = 5;
        }

        xTicks = dataArray.length;
        if (xTicks < 5) {
            xTicks = 5;
        }

        data = [];
        for (i = 0; i < dataArray.length; i++) {
            tempArray = {};
            tempArray.eigen = dataArray[i];
            tempArray.factor = (i + 1);
            data.push(tempArray);
        }

        chartSize = $(window).width() / 1.25;

        margin = {
            top: 150,
            right: 10,
            bottom: 40,
            left: 100
        };

        width = chartSize - margin.left - margin.right;
        if (width > 700) {
            width = 700;
        }
        height = width - margin.bottom - 80;

        // get current language value
        var language = QAV.getState("language");
        var plotTitle = resources[language].translation["Scree Plot"];
        var xAxisTitle = resources[language].translation["Factor Number"];
        var yAxisTitle = resources[language].translation.Eigenvalues;

        // Set the ranges
        var x = d3.scale.linear().range([0, width]);
        var y = d3.scale.linear().range([height, 0]);

        // Define the axes    todo - fix bug with subdivide when less than 4 fac
        var xAxis = d3.svg.axis().scale(x).tickSubdivide(false)
            .orient("bottom").ticks(8);

        var yAxis = d3.svg.axis().scale(y).tickSubdivide(true)
            .orient("left").ticks(maxValue);

        // Define the line
        var valueline = d3.svg.line()
            .x(function (d) {
                return x(d.factor);
            })
            .y(function (d) {
                return y(d.eigen);
            });

        // Adds the svg canvas
        var svg = d3.select("#screePlotDiv")
            .append("svg")
            .attr("id", "screePlotSVG")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + 20 + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // Scale the range of the data
        x.domain([0, 8]);
        y.domain([0, d3.max(data, function (d) {
            return d.eigen < 10 ? maxValue : d.eigen;
        })]);

        // create x axis title
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + 45)
            .style("text-anchor", "middle")
            .style("font-weight", "bold")
            .style("margin-top", "10px")
            .style("font-size", "14px")
            .style("font-family", "Arial")
            .text(xAxisTitle);

        // create Y axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - (margin.left / 2))
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-weight", "bold")
            .style("font-size", "14px")
            .style("font-family", "Arial")
            .text(yAxisTitle);

        // create chart title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (margin.top / 8))
            .attr("text-anchor", "middle")
            .style("font-size", "30px")
            .style("font-family", "Arial")
            .text(plotTitle);

        // Add the valueline path.
        svg.append("path")
            .attr("class", "line")
            .attr("d", valueline(data));

        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        svg.selectAll(".tick > text")
            .style("font-family", "Arial");

        svg.selectAll(".dot2")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot2")
            .attr("cx", function (data) {
                return x(data.factor);
            })
            .attr("cy", function (data) {
                return y(data.eigen);
            })
            .attr("r", 3.5);
    };

}(window.UTIL = window.UTIL || {}, QAV));