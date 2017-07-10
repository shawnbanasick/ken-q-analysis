//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global window, $, resources, EXCEL, FIREBASE, DEMO, d3, INPUT, ROTA, VARIMAX, OUTPUT, LOAD, localStorage, _, d3_save_svg, document, Huebee, PASTE, CORR, sessionStorage, CENTROID, VIEW, PCA, QAV, UTIL, performance*/

(function (CONTROLERS, QAV, undefined) {

    /*
    //
    // **** SECTION 1 **** data input
    //
    */

    // ***** Persist Pasted Sort Data in PQMethod input section *****************
    // todo - move this to manual input file?

    // Use Demo Data Set Option - display database selected
    (function () {
        $("#existingDatabaseSelect").change(function () {
            var testValue = $(this).val();
            if (testValue === "Lipset") {
                DEMO.returnLipset();
            } else if (testValue === "Medium") {
                DEMO.returnMedium();
            } else if (testValue === "Large") {
                DEMO.returnQuotes();
            }
        });
    })();


    // call check manual input sort symmetry
    (function () {
        $("#sortInputSubmit").on('click', function (e) {
            e.preventDefault();
            INPUT.isSortSymmetric();
            $('#respondentNameInput1').focus();
        });
    })();

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

    (function () {
        $('#stageDataPqmethod').on('click', function () {
            PASTE.stageDataPqmethod();
        });
    })();

    // to clear so new data can be added
    (function () {
        $("#clearInputBoxDataButton").on("click", function () {
            $("#sortInputBox").val("");
            localStorage.setItem("sortInputBox", "");
            QAV.setState("sortInputBox", "");
            $("#statementsInputBoxPqmethod").val("");
            localStorage.setItem("qavStatementsInputBoxPqmethod", "");
        });
    })();

    // import EXCEL files
    (function () {
        $("#fileSelect").on("change", function (e) {
            QAV.setState("typeOfExcelFile", "user-input");
            EXCEL.filePicked(e);
        });
    })();


    // import Unforced EXCEL files
    (function () {
        $("#fileSelectUnforced").on("change", function (e) {
            QAV.setState("typeOfExcelFile", "unforced");
            EXCEL.filePicked(e);
        });
    })();

    // import Ken-Q output files to EXCEL
    (function () {
        $("#fileSelectKenq").on("change", function (e) {
            EXCEL.filePickedKenq(e);
        });
    })();

    // import DAT files to PASTE
    (function () {
        $("#fileSelectPQM").on("change", function (e) {
            PASTE.filePickedTextPQM(e);
        });
    })();

    // import STA files to PASTE
    (function () {
        $("#fileSelectSTA").on("change", function (e) {
            PASTE.filePickedTextSTA(e);
        });
    })();

    // import STA files to PASTE     displayJsonData
    (function () {
        $("#fileSelectJSON").on("change", function (e) {
            FIREBASE.filePickedJSON(e);
        });
    })();

    (function () {
        $("#stageJsonData").on("click", function (e) {
            FIREBASE.stageJsonData(e);
            $(".jsonDownloadPQ").show();
        });
    })();

    (function () {
        $("#downloadJsonData").on("click", function (e) {
            FIREBASE.downloadJsonData(e);
        });
    })();

    (function () {
        $("#existingDatabaseRespondentList").on("click", "button", function (e) {
            e.preventDefault();
            var index = $(this).parent().index();
            $(this).parent().remove();
            var respondentNames = QAV.getState("qavRespondentNames");
            var sorts = QAV.getState("qavRespondentSortsFromDbStored");
            respondentNames.splice(index, 1);
            sorts.splice(index, 1);

            if ($.fn.DataTable.isDataTable('#correlationTable2')) {
                $('#correlationTable2').DataTable().destroy();
                $('#correlationTable2').html("");
            }

            QAV.setState("qavRespondentNames", respondentNames);
            QAV.setState("qavRespondentSortsFromDbStored", sorts);
        });
    })();

    (function () {
        $("#exportJsonSortsPQM").on("click", function (e) {
            e.preventDefault();
            EXCEL.exportExcelSortsPQM();
        });
    })();

    (function () {
        $("#exportStatementsPQM").on("click", function (e) {
            e.preventDefault();
            EXCEL.exportStatementsToPqmethod();
        });
    })();


    (function () {
        $("#clearAnalysisDataButton").on("click", function (e) {
            e.preventDefault();
            $("#existingDatabaseStatementList").empty();
            $("#existingDatabaseRespondentList").empty();
            if ($.fn.DataTable.isDataTable('#correlationTable2')) {
                $('#correlationTable2').DataTable().destroy();
                $('#correlationTable2').html("");
            }
            $(".pqmButton").hide();
        });
    })();

    (function () {
        $("#disableSymmetryButton").on("click", function (e) {
            e.preventDefault();
            var language = QAV.getState("language");
            var noSymmButText = resources[language].translation["Symmetry Check Disabled"];
            var symmButText = resources[language].translation["Disable Symmetry Check"];
            var button = $(this);
            if (button.hasClass("buttonActionComplete")) {
                button.prop('value', symmButText);
                button.addClass("blackHover");
                button.removeClass("buttonActionComplete");
                QAV.setState("doSymmetryCheck", "true");
            } else {
                button.prop('value', noSymmButText);
                button.removeClass("blackHover");
                button.addClass("buttonActionComplete");
                QAV.setState("doSymmetryCheck", "false");
            }
        });
    })();

    (function () {
        $("#disableErrorSoundButton").on("click", function (e) {
            e.preventDefault();
            var language = QAV.getState("language");
            var noErrorButText = resources[language].translation["AUDIO ERROR WARNING DISABLED"];
            var errorButText = resources[language].translation["Disable Audio Error Warning"];
            var button = $(this);
            if (button.hasClass("buttonActionComplete")) {
                button.prop('value', errorButText);
                button.addClass("blackHover");
                button.removeClass("buttonActionComplete");
                QAV.setState("doErrorSound", "true");
            } else {
                button.prop('value', noErrorButText);
                button.removeClass("blackHover");
                button.addClass("buttonActionComplete");
                QAV.setState("doErrorSound", "false");
            }
        });
    })();

    /*
    //
    // **** SECTION 2 **** correlations
    //
    */


    // start correlation anaysis from demo data
    (function () {
        $("#beginAnalysisLocalData").on("click", function () {
            CORR.createCorrelationTable();
            $("#section4 > div.row.factorExtrafactorExtractionButtonDiv").show();
        });
    })();


    /*
    //
    // **** SECTION 3 **** factor extractions
    //
    */
    // to start pca and draw PCA table
    (function () {
        document.getElementById("PcaExtractionButton").addEventListener("click", function () {

            var button, button2, X, t0, t1;

            // var language = QAV.getState("language");
            // var PcaButText = resources[language].translation["Principal components"];

            t0 = performance.now();

            //   button = $(this);
            // button.removeClass("blackHover");
            // button.addClass("buttonActionComplete");
            // button.prop('value', PcaButText);
            // button.prop('disabled', true);

            // button2 = $("#factorExtractionButton");
            // button2.prop('disabled', true);

            // $("#resetAnalysisButton").prop('disabled', false);

            X = QAV.getState("originalCorrelationValues");
            PCA.doPrincipalComponents(X);

            QAV.setState("numFactorsExtracted", 8);

            t1 = performance.now();

            console.log('%c PCA completed in ' + (t1 - t0).toFixed(0) + ' milliseconds', 'background: black; color: white');

            $("#section5 > div.row.factorsToKeepForRotationDiv").show();


            // required for firefox to register event
            return false;
        });
    })();


    // Centroid factor extration button listener
    (function () {
        $("#factorExtractionButton").on("click", function () {

            var button2, dataArray;
            var language = QAV.getState("language");
            var centFacButText = resources[language].translation["Centroid factors"];

            CENTROID.fireFactorExtraction();
            $(this).removeClass("blackHover").addClass("buttonActionComplete").prop('value', centFacButText).prop('disabled', true);

            button2 = $("#PcaExtractionButton");
            button2.prop('disabled', true);

            $("#resetAnalysisButton").prop('disabled', false);

            CENTROID.drawExtractedFactorsTable();

            // draw scree plot
            dataArray = QAV.getState("centroidEigenvalues");
            dataArray.shift();
            UTIL.drawScreePlot(dataArray);

            $("#section4 > input").show();
            $("#section5 > div.row.factorsToKeepForRotationDiv").show();

            // required for firefox to register event?
            return false;
        });
    })();

    // clear view for reset analysis
    (function () {
        $("#resetAnalysisButton").on("click", function () {

            VIEW.destroyExtractionTables();
            $(this).prop('disabled', true);

            d3.select("#screePlotDiv svg").remove();
            $("#section4 > input").hide();

            VIEW.clearSections_4_5_6();
            // num factors to keep div
            $("#section5 > div.row.factorsToKeepForRotationDiv").hide();

            // reset state
            QAV.setState("rotFacStateArray", "");
            QAV.setState("tempRotFacStateArray", "");
            QAV.setState("numberFactorsExtracted", "");
            QAV.setState("fSigCriterion", "");
            QAV.setState("rowH2", "");
            QAV.setState("fSigCriterionResults", "");
            QAV.setState("expVar", "");
            QAV.setState("columnHeadersArray", "");
            QAV.setState("saveRotationCounter", "");
            QAV.setState("rotFacStateArrayArchive1", "");
            QAV.setState("centroidFactors", "");
            QAV.setState("analysisOutput", "");
            QAV.setState("factorMatrixTransposed", "");

            QAV.setState("centroidFactors", "");
            QAV.setState("typeOfFactor", "");
            QAV.setState("pcaNumberFactorsExtracted", "");
            QAV.setState("factorLabels", "");
            QAV.setState("eigenValuesSorted", "");
            QAV.setState("eigenValuesAsPercents", "");
            QAV.setState("eigenValuesCumulPercentArray", "");
            QAV.setState("eigenVecs", "");
            QAV.setState("numFactorsExtracted", "");
            QAV.setState("pcaTableHeaders", "");
            QAV.setState("pcaTableTargets", "");
            QAV.setState("numFactorsRetained", "");
            QAV.setState("typeOfRotation", "");

            // required for firefox to register event
            return false;
        });
    })();

    /*
    //
    // **** SECTION 4 **** Rotation
    //
    */

    (function () {
        // rotation button 1 event listener
        $("#clockwiseButton").on("click", function (e) {
            e.preventDefault();
            var rotationDegreeDisplayValue = parseInt(sessionStorage.getItem("rotationDegreeDisplayValue"));

            var rotationDegree = parseInt($("#rotationDisplayInput").val());
            rotationDegreeDisplayValue = rotationDegreeDisplayValue + rotationDegree;
            var rotationDegreeDisplay = $("#handRotationDisplayContainer div");
            rotationDegreeDisplay.html(rotationDegreeDisplayValue + "&deg");

            sessionStorage.setItem("rotationDegreeDisplayValue", rotationDegreeDisplayValue);

            ROTA.saveRotationButtonColor(rotationDegreeDisplayValue);

            ROTA.calculateRotatedFactors(rotationDegree);
        });
    })();

    // rotation button 2 event listener
    (function () {
        $("#counter-clockwiseButton").on("click", function (e) {
            e.preventDefault();
            var rotationDegreeDisplayValue = sessionStorage.getItem("rotationDegreeDisplayValue");

            var rotationDegree = parseInt($("#rotationDisplayInput").val());
            rotationDegreeDisplayValue = rotationDegreeDisplayValue - rotationDegree;

            var rotationDegreeDisplay = $("#handRotationDisplayContainer div");
            rotationDegreeDisplay.html(rotationDegreeDisplayValue + "&deg");
            rotationDegree = -rotationDegree;

            sessionStorage.setItem("rotationDegreeDisplayValue", rotationDegreeDisplayValue);

            ROTA.saveRotationButtonColor(rotationDegreeDisplayValue);
            ROTA.calculateRotatedFactors(rotationDegree);
        });
    })();

    // push rotation values to rotation table and array
    (function () {
        $("#saveRotationButton").on("click", function (e) {
            e.preventDefault();
            var testForSplit = QAV.getState("hasSplitFactor");
            if (testForSplit > 0) {
                VIEW.showDisabledFunctionsAfterSplitModal();
            } else {
                ROTA.saveRotation();
            }
        });
    })();


    // triggered by "Display Selected Factors" button
    (function () {
        $("#generateRotationItemsButton").on("click", function (e) {
            e.preventDefault();
            var testForSplit = QAV.getState("hasSplitFactor");
            var language = QAV.getState("language");
            var appendErrorText1 = resources[language].translation["selectedFactorsError"];

            // pull the selected factors 
            var facNumberSelectedCheck = ROTA.setRotationFactorsFromCheckbox();
            var length = facNumberSelectedCheck.length;
            if (length !== 2) {
                $("#genericErrorModal .errorPanel").empty();
                $("#genericErrorModal .errorPanel").append("<p>" + appendErrorText1 + "</p><br>");
                VIEW.showGenericErrorModal();
                return;
            }

            if (testForSplit > 0) {
                VIEW.showDisabledFunctionsAfterSplitModal();
            } else {
                var rotFacStateArray = QAV.getState("rotFacStateArray");
                // todo - see if this can be deleted - already cloned with getState method?
                var tempRotFacStateArray = _.cloneDeep(rotFacStateArray);
                QAV.setState("tempRotFacStateArray", tempRotFacStateArray);

                // pull the selected factors' data
                ROTA.setTwoFactorRotationalArray(rotFacStateArray);

                // expects bare full array
                var arrayWithCommunalities = ROTA.calculateCommunalities(rotFacStateArray);

                // prep for D3 chart autoflagging tests
                // var d3AutoflaggingPrep = d3Autoflagging(arrayWithCommunalities);

                // gets array for fSig testing from LS of calculateCommunalities - sets fSigCriterionResults
                ROTA.calculatefSigCriterionValues("flag");

                // returns dataValuesArray for D3 chart
                // creates arrays for table/D3 (LS) from state
                var d3Prep = ROTA.doD3ChartDataPrep(arrayWithCommunalities);

                $("#chartAndTableDisplayContainer").show();

                ROTA.drawD3Chart(d3Prep);
                // clone the state array to prevent changes
                var chartData = _.cloneDeep(rotFacStateArray);
                var prepTwoFactorTable = ROTA.prepTwoFactorUpdateHandsontable(chartData);

                // set baseline data to calc "change due to factor rotation" (2 factor)
                var baseLineData = _.cloneDeep(prepTwoFactorTable);
                QAV.setState("baseLineData", baseLineData);

                // creates 2 factor rotation display table data
                var isNewSelection = true;
                ROTA.updateDatatable1(prepTwoFactorTable, isNewSelection);

                // reset degree display, button color and stored value
                $("#handRotationDisplayContainer div").html("0&deg");
                sessionStorage.setItem("rotationDegreeDisplayValue", 0);
                var rotationDegreeDisplayValue = 0;
                ROTA.saveRotationButtonColor(rotationDegreeDisplayValue);

                //draw all factor rotation table for the first time
                var isRotatedFactorsTableUpdate = "destroy";
                LOAD.drawRotatedFactorsTable2(isRotatedFactorsTableUpdate, "noFlag"); // noFlag
            }
        });
    })();


    // clear DOM when user changes number factors kept for rotation
    (function () {
        $("#selectFactorsRotation").on("change", function () {

            VIEW.clearSections_4_5_6();

            $("#factorLoadingContainerDiv").hide();

            // clear Project History except for first entry
            $('#rotationHistoryList li:not(:first)').remove();
        });
    })();

    // get User input on number of factors to keep for rotation
    (function () {
        $("#sendToRotationButton").on("click", function () {
            var language = QAV.getState("language");
            var numFactors, data, loopLen, temp1, i, centroidFactors;

            var appendErrorText1 = resources[language].translation["Rotate error 1"];
            var appendErrorText2 = resources[language].translation["Rotate error 2"];


            numFactors = parseInt($("#selectFactorsRotation option:selected").val());

            QAV.setState("numFactorsRetained", numFactors);

            // prvent user selection errors
            temp1 = QAV.numFactorsExtracted || 0;
            if (numFactors > temp1) {
                $("#genericErrorModal .errorPanel").empty();
                $("#genericErrorModal .errorPanel").append("<p>" + appendErrorText1 + "</p><br>");
                VIEW.showGenericErrorModal();
                return;
                // $("#rotationLargeNumberError").show();
            } else if (isNaN(numFactors)) {
                $("#genericErrorModal .errorPanel").empty();
                $("#genericErrorModal .errorPanel").append("<p>" + appendErrorText2 + "</p><br>");
                VIEW.showGenericErrorModal();
                return;
                // $("#rotationNanError").removeClass("hidden");
            } else {
                //  $("#rotationLargeNumberError").hide();
                // $("#rotationNanError").addClass("hidden");
                $("#factorLoadingContainerDiv").show();
                $("#factorVarimaxButton").show();
                $("#factorJudgementRotButton").show();

                var language = QAV.getState("language");
                var facText = resources[language].translation["Factors Kept"];
                var appendText = resources[language].translation["Factors Kept for Rotation"];

                var button = $(this);
                button.removeClass("blackHover");
                button.addClass("buttonActionComplete");
                button.prop('value', (numFactors + ' ' + facText));
                button.prop('disabled', true);


                // get the right data according to factor type
                if (QAV.typeOfFactor === "PCA") {
                    data = QAV.getState("eigenVecs");
                    loopLen = data.length;

                    // get just the factors selected from data
                    for (i = 0; i < loopLen; i++) {
                        data[i] = data[i].slice(0, numFactors);
                    }
                } else {
                    data = QAV.getState("centroidFactors");
                    loopLen = data.length;

                    // get just the factors selected from data
                    for (i = 0; i < loopLen; i++) {
                        data[i] = data[i].slice(0, numFactors);
                    }
                }

                // send data to state matrix and then to chart
                QAV.setState("rotFacStateArray", data);

                // prep for chart
                ROTA.calculateCommunalities(data);

                $("#rotationHistoryList").append('<li>' + numFactors + appendText + '</li>');

                // gets array for fSig testing from LS of calculateCommunalities - sets fSigCriterionResults
                ROTA.calculatefSigCriterionValues("noFlag");

                QAV.setState("tempRotFacStateArray", data);

                //draw rotation table for the first time
                var isRotatedFactorsTableUpdate = "no";
                LOAD.drawRotatedFactorsTable2(isRotatedFactorsTableUpdate, "noFlag");

                // archive rotation matrix state and factor rotation table
                ROTA.saveRotationArchiveCounter("reset");
                UTIL.archiveFactorScoreStateMatrixAndDatatable();

                // format for use with varimax
                centroidFactors = _.zip.apply(_, data);

                // todo - convert to send to state matrix
                QAV.setState("centroidFactors", centroidFactors);

                $("#selectFactorsForOutputButton").show();
            }
        });
    })();

    // display rotation chart options in DOM
    (function () {
        $("#factorJudgementRotButton").on("click", function () {
            var testForSplit = QAV.getState("hasSplitFactor");
            if (testForSplit > 0) {
                VIEW.showDisabledFunctionsAfterSplitModal();
            } else {
                QAV.setState("typeOfRotation", "judgemental");
                var language = QAV.getState("language");
                var judgeText = resources[language].translation["Judgemental rotation"];
                var button = $(this);
                button.removeClass("blackHover");
                button.addClass("buttonActionComplete");
                button.prop('value', judgeText);
                button.prop('disabled', true);

                // get number of checkboxes from UI and append to DOM
                UTIL.addFactorSelectCheckboxesRotation(QAV.numFactorsRetained);
                $("#judgementalRotationContainer").show();
            }
        });

    })();

    // call varimax
    (function () {
        $("#factorVarimaxButton").on("click", function () {
            var testForSplit = QAV.getState("hasSplitFactor");
            if (testForSplit > 0) {
                VIEW.showDisabledFunctionsAfterSplitModal();
            } else {
                QAV.setState("typeOfRotation", "varimax");
                var language = QAV.getState("language");
                var varmaxRotButText = resources[language].translation["Varimax rotation applied"];
                var button = $(this);
                button.removeClass("blackHover");
                button.addClass("buttonActionComplete");
                button.prop('value', varmaxRotButText);
                button.prop('disabled', true);

                // avoid problem with reinitialization and display of 2 factor table
                var tableCheck = $("#judgementalRotationContainer").is(":visible");
                if (tableCheck) {
                    ROTA.reInitializePlotAndChart();
                }
                VARIMAX.fireVarimaxRotation();
            }
        });
    })();

    (function () {
        // scree plot image download
        $(".screePlotDownloadButton").on("click", function () {
            var date = UTIL.currentDate1();
            var time = UTIL.currentTime1();
            var dateTime = date + "_" + time;
            var projectName = QAV.getState("qavProjectName");
            var language = QAV.getState("language");
            var screePlotTranslation = resources[language].translation["Scree Plot"];

            var config = {
                filename: projectName + "_" + screePlotTranslation + "_" + dateTime,
            };
            d3_save_svg.save(d3.select('#screePlotSVG').node(), config);
        });
    })();

    (function () {
        // scree plot image download
        $(".screePlotDownloadPngButton").on("click", function () {
            console.log("clicked");
            var date = UTIL.currentDate1();
            var time = UTIL.currentTime1();
            var dateTime = date + "_" + time;
            var projectName = QAV.getState("qavProjectName");
            var language = QAV.getState("language");
            var screePlotTranslation = resources[language].translation["Scree Plot"];
            var filename = projectName + "_" + screePlotTranslation + "_" + dateTime;
            var svgString = UTIL.getSVGString(d3.select('#screePlotSVG')
                .node());
            var svgCharacteristics = d3.select('#screePlotSVG');
            UTIL.downloadPngImages(svgString, svgCharacteristics, filename); // passes Blob and filesize 
        });
    })();

    (function () {
        // download judgemental rotation chart
        $(".rotationChartDownloadButton").on("click", function () {
            var date = UTIL.currentDate1();
            var time = UTIL.currentTime1();
            var dateTime = date + "_" + time;
            var projectName = QAV.getState("qavProjectName");
            var language = QAV.getState("language");
            var scatterPlotTranslation = resources[language].translation["Download Rotation Chart"];

            var config = {
                filename: projectName + "_" + scatterPlotTranslation + "_" + dateTime,
            };
            d3_save_svg.save(d3.select('#scatterChart').node(), config);
        });
    })();

    (function () {
        // download judgemental rotation chart
        $(".rotationChartDownloadPngButton").on("click", function () {
            console.log("png rot chart clicked");
            var date = UTIL.currentDate1();
            var time = UTIL.currentTime1();
            var dateTime = date + "_" + time;
            var projectName = QAV.getState("qavProjectName");
            var language = QAV.getState("language");
            var scatterPlotTranslation = resources[language].translation["Download Rotation Chart"];
            var filename = projectName + "_" + scatterPlotTranslation + "_" + dateTime;
            var svgString = UTIL.getSVGString(d3.select('#scatterChart')
                .node());
            var svgCharacteristics = d3.select('#scatterChart');
            UTIL.downloadPngImages(svgString, svgCharacteristics, filename); // passes Blob and filesize 
        });
    })();



    // set judgemental rotation chart options
    (function () {
        $(".rotationChartOptionsButton").on("mousedown", function (e) {
            e.preventDefault();
            VIEW.showRotationChartOptionsModal();
        });
    })();

    (function () {
        $("#rotationChartOptionsModal").on('change', 'input[type=color]', function () {
            var rotChartConfig = QAV.getState("rotChartConfig") || {};
            var hexCode2 = $(this).val();
            rotChartConfig[$(this).attr('name')] = hexCode2;
            QAV.setState("rotChartConfig", rotChartConfig);
        });
    })();

    // control rotation chart options
    (function () {
        $("#rotationChartOptionsModal").on('click', '.applyChanges', function () {
            var rotChartConfig = QAV.getState("rotChartConfig") || {};
            rotChartConfig.significanceColorA = rotChartConfig.significanceColorAPrep;
            rotChartConfig.significanceColorB = rotChartConfig.significanceColorBPrep;
            QAV.setState("rotChartConfig", rotChartConfig);

            $("#twoFactorDisplayTableDiv").remove();

            $("#chartAndTableContainerDiv").append($('<div/>').attr("id", "twoFactorDisplayTableDiv"));
            $("#twoFactorDisplayTableDiv").append($('<table/>').attr("id", "twoFactorDisplayTable").addClass("display compact nowrap cell-border").attr("width", "100%"));

            $("#generateRotationItemsButton").click();

            $("#rotationChartOptionsModal").iziModal('close');
        });
    })();

    // close modal box
    (function () {
        $("#rotationChartOptionsModal").on('click', '.button-cancel', function () {
            $("#rotationChartOptionsModal").iziModal('close');
        });
    })();

    // remove circle highlighting? - event handler
    (function () {
        $("#rotationChartOptionsModal").on('click', '#removeCircleHighlightDiv :radio', function () {
            var rotChartConfig = QAV.getState("rotChartConfig") || {};
            $('#rotationChartOptionsModal, #removeCircleHighlightDiv .radioHighlight2').removeClass("selected");
            var $radioOption = ($(this).val());
            if ($radioOption === "Yes") {
                $(this).parent().addClass("selected");
                $("label[for='" + $(this).attr('id') + "']").addClass("selected");
                rotChartConfig.removeCircleHighlight = true;
            } else if ($radioOption === "No") {
                rotChartConfig.removeCircleHighlight = false;
            }
            QAV.setState("rotChartConfig", rotChartConfig);
        });
    })();

    // remove circles? - event handler
    (function () {
        $("#rotationChartOptionsModal").on('click', '#removeCirclesDiv :radio', function () {
            var rotChartConfig = QAV.getState("rotChartConfig") || {};
            $('#rotationChartOptionsModal, #removeCirclesDiv .radioHighlight2').removeClass("selected");
            var $radioOption = ($(this).val());
            if ($radioOption === "Yes") {
                $(this).parent().addClass("selected");
                $("label[for='" + $(this).attr('id') + "']").addClass("selected");
                rotChartConfig.removeCircles = true;
            } else if ($radioOption === "No") {
                rotChartConfig.removeCircles = false;
            }
            QAV.setState("rotChartConfig", rotChartConfig);
        });
    })();

    // use id number or respondent name? - event handler
    (function () {
        $("#rotationChartOptionsModal").on('click', '#chartIdentifierDiv :radio', function () {
            var rotChartConfig = QAV.getState("rotChartConfig") || {};
            $('#rotationChartOptionsModal, #chartIdentifierDiv .radioHighlight2').removeClass("selected");
            var $radioOption = ($(this).val());
            $(this).parent().addClass("selected");
            $("label[for='" + $(this).attr('id') + "']").addClass("selected");
            if ($radioOption === "Yes") {
                rotChartConfig.identifierNumber = true;
            } else if ($radioOption === "No") {
                rotChartConfig.identifierNumber = false;
            }
            QAV.setState("rotChartConfig", rotChartConfig);
        });
    })();

    // change font size? - event handler
    (function () {
        $("#rotationChartOptionsModal").on('click', '#changeFontSizeDiv :radio', function () {
            var rotChartConfig = QAV.getState("rotChartConfig") || {};
            $('#changeFontSizeDiv :radio, #changeFontSizeDiv .radioHighlight2').removeClass("selected");
            var $radioOption = ($(this).val());
            if ($radioOption === "Yes") {
                $(this).parent().addClass("selected");
                $("label[for='" + $(this).attr('id') + "']").addClass("selected");
                rotChartConfig.changeFontSize = true;
            } else if ($radioOption === "No") {
                rotChartConfig.changeFontSize = false;
            }
            QAV.setState("rotChartConfig", rotChartConfig);
        });
    })();

    // chart font size adjustment input box
    (function () {
        $("#rotationChartOptionsModal").on('input', '#chartFontSizeInputBox', function () {
            var rotChartConfig = QAV.getState("rotChartConfig") || {};
            var customFontSize = $('#chartFontSizeInputBox').val();
            rotChartConfig.customFontSize = customFontSize;
            QAV.setState("rotChartConfig", rotChartConfig);
        });
    })();

    /*
    //
    // **** SECTION 5 ****  (factor loadings)
    //
    */
    (function () {
        $("#autoflagButton").on("click", function (e) {
            e.preventDefault();
            var testForSplit = QAV.getState("hasSplitFactor");
            if (testForSplit > 0) {
                VIEW.showDisabledFunctionsAfterSplitModal();
            } else {
                // get copy of current rotations state matrix
                var rotFacStateArray = QAV.getState("rotFacStateArray");
                // prep for chart
                ROTA.calculateCommunalities(rotFacStateArray);
                /* gets array for fSig testing from LS of calculateCommunalities - sets fSigCriterionResults  --- also "flag" parameter causes display of sig factor loadings in current facor loadings table  */
                ROTA.calculatefSigCriterionValues("flag");
                // re-draw rotation table without destroy
                var isRotatedFactorsTableUpdate = "destroy";
                LOAD.drawRotatedFactorsTable2(isRotatedFactorsTableUpdate, "flag");
            }
        });
    })();


    // SPLIT BIPOLAR FACTOR BUTTON
    (function () {
        $("#splitFactorButton").on("click", function (e) {
            e.preventDefault();
            VIEW.showSplitBipolarFactorModal();
        });
    })();

    // click handler for select factor loadings checkboxes
    // todo - check to see if this is needed
    (function () {
        $('#factorRotationTable2 tbody').on('click', 'tr', function () {
            var table = $('#factorRotationTable2').DataTable(); //
            table
                .rows()
                .data();
        });
    })();

    // control factor loadings table background highlight
    (function () {
        $("#loadingsRadioSelect2 :radio").on('click', function () {

            // disable if table has split factor
            var testForSplit = QAV.getState("hasSplitFactor");
            if (testForSplit > 0) {
                VIEW.showDisabledFunctionsAfterSplitModal();
            } else {
                $("#loadingsRadioSelect2 .radioHighlight2").removeClass("selected");
                // $(this).parent().addClass("selected");
                $("label[for='" + $(this).attr('id') + "']").addClass("selected");
                // todo - find out how to prevent need for table destroy

                // keep flags - get current table data including flags and redrawn
                var table = $('#factorRotationTable2').DataTable();
                var chartData = table.rows().data();
                QAV.colorButtonChartData = chartData;

                var isRotatedFactorsTableUpdate = "highlighter";
                var shouldFlag = "flag";
                LOAD.drawRotatedFactorsTable2(isRotatedFactorsTableUpdate, shouldFlag);
            }
        });
    })();

    // reorder table by respondent id or highest loading factor
    (function () {
        $("#loadingsRadioSelect1 :radio").on('click', function () {
            // $('#loadingsRadioSelect1 input:not(:checked)').parent().removeClass("selected");
            $('#loadingsRadioSelect1 .radioHighlight1').removeClass("selected");
            // $(this).parent().addClass("selected");
            $("label[for='" + $(this).attr('id') + "']").addClass("selected");
            var $radioOption = +($(this).val());
            var table = $('#factorRotationTable2').DataTable();

            if ($radioOption === 0) {
                table.order([0, 'asc']).draw();
            } else if ($radioOption === 2) {
                table.order([2, 'asc']).draw();
            }
        });
    })();

    // remove items from Project history list and undo rotation
    (function () {
        $("#rotationHistoryList").on("click", "button", function (e) {
            e.preventDefault();
            var $this = $(this);
            if ($this.hasClass("deleteButton") && $this.hasClass("varimaxCalled")) {
                $("#factorVarimaxButton").removeClass("buttonActionComplete").addClass("blackHover").prop('value', 'Apply Varimax Rotation').prop('disabled', false);
                LOAD.undoFactorRotation();
                $this.parent().remove();
            } else if ($this.hasClass("deleteSplitFactorButton")) {
                LOAD.undoSplitFactorRotation();
                $this.parent().remove();
            } else if ($this.hasClass("deleteButton")) {
                LOAD.undoFactorRotation();
                $this.parent().remove();
            }
        });
    })();

    // INVERT FACTOR BUTTON
    (function () {
        $("#invertFactorButton").on("click", function (e) {
            e.preventDefault();
            var rotationHistory = $("#rotationHistoryList li").text();
            if (rotationHistory.indexOf('was split into') >= 0) {
                VIEW.showDisabledFunctionsAfterSplitModal();
            } else {
                VIEW.showInvertModal();
            }
        });
    })();

    /*
    //
    // **** SECTION 6 **** output
    //
    */

    // page setup actions for page reload
    (function () {
        // hide download button until after preliminary results are displayed
        $("#downloadResultsButton").hide();
        $("#downloadCsvResultsButton").hide();
        $("#displayQuickResultsButton").hide();
        $("#factorVizOptionsDiv").hide();

        // tracker for results download / display buttons
        QAV.setState("outputComplete", "false");
    })();

    //  change the value of checkboxes on factor rotation table when clicked
    (function () {
        $('#factorRotationTable2').on('click', 'td', function () {
            var myTable = $('#factorRotationTable2').DataTable();
            if (myTable.cell($(this)).data() === 'false') {
                myTable.cell($(this)).data('true');
            } else if (myTable.cell($(this)).data() === 'true') {
                myTable.cell($(this)).data('false');
            }
        });
    })();

    // display quick results button event listener
    (function () {
        $('#displayQuickResultsButton').on('click', function () {
            // pull the state data (selected factor loadings - checkboxes) from table
            var results = [];
            var loopLen1 = QAV.getState("qavRespondentNames").length;
            var data = $('#factorRotationTable2').DataTable();
            for (var i = 0; i < loopLen1; i++) {
                var data2 = data.row(i).data();
                results.push(data2);
            }
            QAV.setState("results", results);

            // get selected factors information
            PRELIMOUT.getFactorsForAnalysis();

            // begins preliminary results display function cascade
            var canOutput = PRELIMOUT.pullFlaggedFactorLoadings();

            if (canOutput !== "false") {
                OUTPUT.generateOutput();
                VIEW.clearPreviousTables();
                // CORR.drawRawSortsRadviz();
                PRELIMOUT.showPreliminaryOutput1();
                $("#downloadResultsButton").show();
                $("#downloadCsvResultsButton").show();
                $("#clearStorageButton").show();
            }
        });
    })();

    // start the output calculations and file write functions cascade
    (function () {
        $("#downloadResultsButton").on("click", function () {
            // OUTPUT.downloadOutput();
            OUTPUT.downloadExcelOutputFile();
        });
    })();

    (function () {
        $("#downloadCsvResultsButton").on("click", function () {
            // OUTPUT.downloadOutput();
            OUTPUT.downloadCsvOutputFile();
        });
    })();

    (function () {
        $("#selectFactorsForOutputButton").on("click", function () {
            PRELIMOUT.appendFactorSelectionCheckboxes();
            $("#displayQuickResultsButton").show();
            $("#factorVizOptionsDiv").show();
        });
    })();

    (function () {
        $("#clearStorageButton").on("click", function () {
            VIEW.showDeleteKenqData();
        });
    })();

    (function () {
        $('#deleteLocalDataModal').on("click", '#deleteLocalDataConfirmButton', function () {
            localStorage.clear();
            sessionStorage.clear();
            VIEW.showlocalDataDeleteSuccessModal();
        });
    })();


    (function () {
        $('#deleteLocalDataModal').on("click", '.button-cancel', function () {
            $('#deleteLocalDataModal').iziModal('close');
        });
    })();
    /*
     **
     **    Visualizations Panel event listeners
     **
     */
    // should include legend? - event handler
    (function () {
        $("#includeLegendDiv :radio").on('click', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            $('#includeLegendDiv .radioHighlight2').removeClass("active");
            $(this).parent().addClass("active");
            $("label[for='" + $(this).attr('id') + "']").addClass("active");
            var $radioOption = ($(this).val());
            if ($radioOption === "Yes") {
                vizConfig.shouldHaveLegend = true;
            } else if ($radioOption === "No") {
                vizConfig.shouldHaveLegend = false;
            }
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    // should prepend statement numbers? - event handler
    (function () {
        $("#prependStateNoDiv :radio").on('click', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            $('#prependStateNoDiv .radioHighlight2').removeClass("active");
            $(this).parent().addClass("active");
            $("label[for='" + $(this).attr('id') + "']").addClass("active");
            var $radioOption = ($(this).val());
            if ($radioOption === "Yes") {
                vizConfig.shouldPrependStateNo = true;
            } else if ($radioOption === "No") {
                vizConfig.shouldPrependStateNo = false;
            }
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    // should show only statement numbers? - event handler
    (function () {
        $("#showOnlyStateNoDiv :radio").on('click', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            $('#showOnlyStateNoDiv .radioHighlight2').removeClass("active");
            $(this).parent().addClass("active");
            $("label[for='" + $(this).attr('id') + "']").addClass("active");
            var $radioOption = ($(this).val());
            if ($radioOption === "Yes") {
                vizConfig.shouldShowOnlyStateNo = true;
            } else if ($radioOption === "No") {
                vizConfig.shouldShowOnlyStateNo = false;
            }
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    // should show custom factor names? - event handler
    (function () {
        $("#addCustomFactorNameDiv :radio").on('click', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            $('#addCustomFactorNameDiv .radioHighlight2').removeClass("active");
            $(this).parent().addClass("active");
            $("label[for='" + $(this).attr('id') + "']").addClass("active");
            var $radioOption = ($(this).val());
            if ($radioOption === "Yes") {
                vizConfig.addCustomFactorName = true;
            } else if ($radioOption === "No") {
                vizConfig.addCustomFactorName = false;
            }
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    // grab custom factor names from input
    (function () {
        $('#customFactorNameInputBox').on('input', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            var customFactorNames = $('#customFactorNameInputBox').val();
            vizConfig.customFactorNames = customFactorNames.split(",");
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    // should set Card Height? - event handler
    (function () {
        $("#setCardHeightDiv :radio").on('click', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            $('#setCardHeightDiv .radioHighlight2').removeClass("active");
            $(this).parent().addClass("active");
            $("label[for='" + $(this).attr('id') + "']").addClass("active");
            var $radioOption = ($(this).val());
            if ($radioOption === "Yes") {
                vizConfig.shouldSetCardHeight = true;
            } else if ($radioOption === "No") {
                vizConfig.shouldSetCardHeight = false;
            }
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    // should set card width? - event handler
    (function () {
        $("#setCardWidthDiv :radio").on('click', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            $('#setCardWidthDiv .radioHighlight2').removeClass("active");
            $(this).parent().addClass("active");
            $("label[for='" + $(this).attr('id') + "']").addClass("active");
            var $radioOption = ($(this).val());
            if ($radioOption === "Yes") {
                vizConfig.shouldSetCardWidth = true;
            } else if ($radioOption === "No") {
                vizConfig.shouldSetCardWidth = false;
            }
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    // should set font size? - event handler
    (function () {
        $("#setFontSizeDiv :radio").on('click', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            $('#setFontSizeDiv .radioHighlight2').removeClass("active");
            $(this).parent().addClass("active");
            $("label[for='" + $(this).attr('id') + "']").addClass("active");
            var $radioOption = ($(this).val());
            if ($radioOption === "Yes") {
                vizConfig.shouldSetFontSize = true;
            } else if ($radioOption === "No") {
                vizConfig.shouldSetFontSize = false;
            }
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    // should set font size? - event handler
    (function () {
        $("#setStatementWidthDiv :radio").on('click', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            $('#setStatementWidthDiv .radioHighlight2').removeClass("active");
            $(this).parent().addClass("active");
            $("label[for='" + $(this).attr('id') + "']").addClass("active");
            var $radioOption = ($(this).val());
            if ($radioOption === "Yes") {
                vizConfig.shouldSetStatementWidth = true;
            } else if ($radioOption === "No") {
                vizConfig.shouldSetStatementWidth = false;
            }
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    // should set line spacing? - event handler
    (function () {
        $("#adjustLineSpacingDiv :radio").on('click', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            $('#adjustLineSpacingDiv .radioHighlight2').removeClass("active");
            $(this).parent().addClass("active");
            $("label[for='" + $(this).attr('id') + "']").addClass("active");
            var $radioOption = ($(this).val());
            if ($radioOption === "Yes") {
                vizConfig.shouldSetLineSpacing = true;
            } else if ($radioOption === "No") {
                vizConfig.shouldSetLineSpacing = false;
            }
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    // should trim statements? - event handler  trimStatementsDiv
    (function () {
        $("#trimStatementsDiv :radio").on('click', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            $('#trimStatementsDiv .radioHighlight2').removeClass("active");
            $(this).parent().addClass("active");
            $("label[for='" + $(this).attr('id') + "']").addClass("active");
            var $radioOption = ($(this).val());
            if ($radioOption === "Yes") {
                vizConfig.shouldTrimStatements = true;
            } else if ($radioOption === "No") {
                vizConfig.shouldTrimStatements = false;
            }
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    // Asian Language set width? - event handler  trimStatementsDiv
    (function () {
        $("#setAsianStatementsLengthDiv :radio").on('click', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            $('#setAsianStatementsLengthDiv .radioHighlight2').removeClass("active");
            $(this).parent().addClass("active");
            $("label[for='" + $(this).attr('id') + "']").addClass("active");
            var $radioOption = ($(this).val());
            if ($radioOption === "Yes") {
                vizConfig.shouldSetWidthForAsian = true;
                vizConfig.asianStatmentLength = 12;
            } else if ($radioOption === "No") {
                vizConfig.shouldSetWidthForAsian = false;
            }
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    // indicate significance? - event handler
    (function () {
        $("#showSignificanceSymbolsDiv :radio").on('click', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            $('#showSignificanceSymbolsDiv .radioHighlight2').removeClass("active");
            $(this).parent().addClass("active");
            $("label[for='" + $(this).attr('id') + "']").addClass("active");
            var $radioOption = ($(this).val());
            if ($radioOption === "Yes") {
                vizConfig.shouldIndicateDistinguishing = true;
                $('#useUnicodeYes').trigger("click");
                vizConfig.shouldUseUnicode = true;
            } else if ($radioOption === "No") {
                vizConfig.shouldIndicateDistinguishing = false;
                $('#useUnicodeSymbolsDiv .radioHighlight2').removeClass("selected");
                $('#zscoreArrowDirectionDiv .radioHighlight2').removeClass("active");
                $('#setSymbolFontSizeDiv .radioHighlight2').removeClass("active");
            }
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    // should use Unicode symbols? - event handler  #useUnicodeSymbolsDiv
    (function () {
        $("#useUnicodeSymbolsDiv :radio").on('click', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            $('#useUnicodeSymbolsDiv .radioHighlight2').removeClass("selected");
            $(this).parent().addClass("selected");
            $("label[for='" + $(this).attr('id') + "']").addClass("selected");
            var $radioOption = ($(this).val());
            if ($radioOption === "unicode") {
                vizConfig.shouldUseUnicode = true;
            } else if ($radioOption === "ascii") {
                vizConfig.shouldUseUnicode = false;
            }
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    // should use Unicode symbols? - event handler  #useUnicodeSymbolsDiv
    (function () {
        $("#setSymbolFontSizeDiv :radio").on('click', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            $('#setSymbolFontSizeDiv .radioHighlight2').removeClass("active");
            $(this).parent().addClass("active");
            $("label[for='" + $(this).attr('id') + "']").addClass("active");
            var $radioOption = ($(this).val());
            if ($radioOption === "Yes") {
                vizConfig.shouldSetSymbolFontSize = true;
            } else if ($radioOption === "No") {
                vizConfig.shouldSetSymbolFontSize = false;
            }
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    // should show zscore factor comparison arrows? - event handler
    (function () {
        $("#zscoreArrowDirectionDiv :radio").on('click', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            $('#zscoreArrowDirectionDiv .radioHighlight2').removeClass("active");
            $(this).parent().addClass("active");
            $("label[for='" + $(this).attr('id') + "']").addClass("active");
            var $radioOption = ($(this).val());
            if ($radioOption === "Yes") {
                vizConfig.shouldShowZscoreArrows = true;
            } else if ($radioOption === "No") {
                vizConfig.shouldShowZscoreArrows = false;
            }
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    // should show zscore factor comparison arrows? - event handler
    (function () {
        $("#displayConsensusStatementsDiv :radio").on('click', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            $('#displayConsensusStatementsDiv .radioHighlight2').removeClass("active");
            $(this).parent().addClass("active");
            $("label[for='" + $(this).attr('id') + "']").addClass("active");
            var $radioOption = ($(this).val());
            if ($radioOption === "Yes") {
                vizConfig.shouldIndicateConsensus = true;
                $('#setConsensusSymbolNo').trigger("click");
                vizConfig.shouldUseToIndicateConsensus = "stripe";
            } else if ($radioOption === "No") {
                vizConfig.shouldIndicateConsensus = false;
                $('#setConsensusSymbolDiv .radioHighlight2').removeClass("selected");
            }
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    // should color vs stripe for consensus? - event handler
    (function () {
        $("#setConsensusSymbolDiv :radio").on('click', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            $('#setConsensusSymbolDiv .radioHighlight2').removeClass("selected");
            $(this).parent().addClass("selected");
            $("label[for='" + $(this).attr('id') + "']").addClass("selected");
            var $radioOption = ($(this).val());
            if ($radioOption === "COLOR") {
                vizConfig.shouldUseToIndicateConsensus = "color";
            } else if ($radioOption === "STRIPE") {
                vizConfig.shouldUseToIndicateConsensus = "stripe";
            }
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    // should show matching counts? - event handler
    (function () {
        $("#useMatchCountDiv :radio").on('click', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            $('#useMatchCountDiv .radioHighlight2').removeClass("active");
            $(this).parent().addClass("active");
            $("label[for='" + $(this).attr('id') + "']").addClass("active");
            var $radioOption = ($(this).val());
            if ($radioOption === "Yes") {
                vizConfig.shouldShowMatchCounts = true;
            } else if ($radioOption === "No") {
                vizConfig.shouldShowMatchCounts = false;
            }
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    // should show background color? - event handler
    (function () {
        $("#indicateMatchCountAsBackgroundDiv :radio").on('click', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            $('#indicateMatchCountAsBackgroundDiv .radioHighlight2').removeClass("active");
            $(this).parent().addClass("active");
            $("label[for='" + $(this).attr('id') + "']").addClass("active");
            var $radioOption = ($(this).val());
            if ($radioOption === "Yes") {
                vizConfig.shouldShowBackgroundColor = true;
                $('#setMatchCountCautionIndicatorNo').trigger("click");
                vizConfig.shouldUseToIndicateMatchCaution = "stripe";
                $('#setMatchConsensusOverlapIndicatorNo').trigger("click");
                vizConfig.shouldUseToIndicateOverlap = "crosshatch";
            } else if ($radioOption === "No") {
                vizConfig.shouldShowBackgroundColor = false;
                $('#setMatchCountCautionIndicatorDiv .radioHighlight2').removeClass("selected");
                $('#setMatchConsensusOverlapIndicatorDiv .radioHighlight2').removeClass("selected");
            }
            vizConfig.backgroundColorCutoff = 0;
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    // should color vs stripe for consensus? - event handler
    (function () {
        $("#setMatchCountCautionIndicatorDiv :radio").on('click', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            $('#setMatchCountCautionIndicatorDiv .radioHighlight2').removeClass("selected");
            $(this).parent().addClass("selected");
            $("label[for='" + $(this).attr('id') + "']").addClass("selected");
            var $radioOption = ($(this).val());
            if ($radioOption === "COLOR") {
                vizConfig.shouldUseToIndicateMatchCaution = "color";
            } else if ($radioOption === "STRIPE") {
                vizConfig.shouldUseToIndicateMatchCaution = "stripe";
            }
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    // should color vs stripe for consensus? - event handler
    (function () {
        $("#setMatchConsensusOverlapIndicatorDiv :radio").on('click', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            $('#setMatchConsensusOverlapIndicatorDiv .radioHighlight2').removeClass("selected");
            $(this).parent().addClass("selected");
            $("label[for='" + $(this).attr('id') + "']").addClass("selected");
            var $radioOption = ($(this).val());
            if ($radioOption === "COLOR") {
                vizConfig.shouldUseToIndicateOverlap = "color";
            } else if ($radioOption === "CROSSHATCH") {
                vizConfig.shouldUseToIndicateOverlap = "crosshatch";
            }
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    // should add custom name? - event handler
    (function () {
        $("#addCustomNameDiv :radio").on('click', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            $('#addCustomNameDiv .radioHighlight2').removeClass("active");
            $(this).parent().addClass("active");
            $("label[for='" + $(this).attr('id') + "']").addClass("active");
            var $radioOption = ($(this).val());
            if ($radioOption === "Yes") {
                vizConfig.shouldAddCustomName = true;
            } else if ($radioOption === "No") {
                vizConfig.shouldAddCustomName = false;
            }
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    (function () {
        $("#customNameLocationDiv :radio").on('click', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            $('#customNameLocationDiv .radioHighlight2').removeClass("selected");
            $(this).parent().addClass("selected");
            $("label[for='" + $(this).attr('id') + "']").addClass("selected");
            var $radioOption = ($(this).val());
            vizConfig.customNameLocation = $radioOption;
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    (function () {
        $("#showDisplayPanelButton").on('click', function () {
            var language = QAV.getState("language");
            var hide = resources[language].translation.HIDE;
            var view = resources[language].translation.VIEW;
            $(this).val(function (i, value) {
                return value === hide ? view : hide;
            });
            $("#vizPanelHideContainer").toggle();
        });
    })();


    (function () {
        $("#updateDisplayButton").on('click', function () {
            VIEW.clearPreviousTables();
            PRELIMOUT.showPreliminaryOutput1();
        });
    })();
    //
    // Visualization Control Panel On-change event listeners
    //

    // capture card height input in Viz panel   #cardHeightInputBox
    (function () {
        $('#cardHeightInputBox').on('input', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            var cardHeight = $('#cardHeightInputBox').val();
            UTIL.checkIfValueIsNumber(cardHeight, "cardHeightInputBox");
            if (cardHeight > 500) {
                cardHeight = 500;
            } else if (cardHeight < 5) {
                cardHeight = 5;
            }
            vizConfig.cardHeight = cardHeight;
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    (function () {
        $('#cardWidthInputBox').on('input', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            var cardWidth = $('#cardWidthInputBox').val();
            UTIL.checkIfValueIsNumber(cardWidth, "cardWidthInputBox");
            if (cardWidth > 500) {
                cardWidth = 500;
            } else if (cardWidth < 5) {
                cardWidth = 5;
            }
            vizConfig.cardWidth = cardWidth;
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    (function () {
        $('#fontSizeInputBox').on('input', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            var fontSize = $('#fontSizeInputBox').val();
            UTIL.checkIfValueIsNumber(fontSize, "fontSizeInputBox");
            if (fontSize > 180) {
                fontSize = 180;
            } else if (fontSize < 4) {
                fontSize = 4;
            }
            vizConfig.fontSize = fontSize;
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    (function () {
        $('#statementWidthInputBox').on('input', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            var statementWidth = $('#statementWidthInputBox').val();
            UTIL.checkIfValueIsNumber(statementWidth, "statementWidthInputBox");
            if (statementWidth > 180) {
                statementWidth = 180;
            } else if (statementWidth < -180) {
                statementWidth = -180;
            }
            vizConfig.statementWidth = statementWidth;
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    (function () {
        $('#lineSpacingInputBox').on('input', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            var lineSpacing = $('#lineSpacingInputBox').val();
            UTIL.checkIfValueIsNumber(lineSpacing, "lineSpacingInputBox");
            if (lineSpacing > 500) {
                lineSpacing = 500;
            } else if (lineSpacing < 4) {
                lineSpacing = 4;
            }
            vizConfig.lineSpacing = lineSpacing;
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    (function () {
        $('#trimStatementsInputBox').on('input', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            var trimStatementSize = $('#trimStatementsInputBox').val();
            UTIL.checkIfValueIsNumber(trimStatementSize, "trimStatementsInputBox");
            if (trimStatementSize > 3000) {
                trimStatementSize = 3000;
            } else if (trimStatementSize < 1) {
                trimStatementSize = 1;
            }
            vizConfig.trimStatementSize = trimStatementSize;
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    (function () {
        $('#setAsianLengthInputBox').on('input', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            var asianStatmentLength = $('#setAsianLengthInputBox').val();
            UTIL.checkIfValueIsNumber(asianStatmentLength, "setAsianLengthInputBox");
            if (asianStatmentLength > 300) {
                asianStatmentLength = 300;
            } else if (asianStatmentLength < 2) {
                asianStatmentLength = 2;
            }
            vizConfig.asianStatmentLength = asianStatmentLength;
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    (function () {
        $('#symbolFontSizeInputBox').on('input', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            var sigSymbolFontSize = $('#symbolFontSizeInputBox').val();
            UTIL.checkIfValueIsNumber(sigSymbolFontSize, "symbolFontSizeInputBox");
            if (sigSymbolFontSize > 80) {
                sigSymbolFontSize = 80;
            } else if (sigSymbolFontSize < 2) {
                sigSymbolFontSize = 2;
            }
            vizConfig.sigSymbolFontSize = sigSymbolFontSize;
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    (function () {
        $("#vizPanelHideContainer").on('change', 'input[type=color]', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            var hexCode2 = $(this).val();
            vizConfig[$(this).attr('name')] = hexCode2;
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    (function () {
        $('#backgroundColorCutoffInputBox').on('input', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            var backgroundColorCutoff = $('#backgroundColorCutoffInputBox').val();
            UTIL.checkIfValueIsNumber(backgroundColorCutoff, "backgroundColorCutoffInputBox");
            if (backgroundColorCutoff >= 100) {
                backgroundColorCutoff = 99;
            }
            vizConfig.backgroundColorCutoff = backgroundColorCutoff;
            QAV.setState("vizConfig", vizConfig);
        });
    })();

    (function () {
        $('#customNameInputBox').on('input', function () {
            var vizConfig = QAV.getState("vizConfig") || {};
            var customName = $('#customNameInputBox').val();
            console.log(customName);
            vizConfig.customName = customName;
            QAV.setState("vizConfig", vizConfig);
        });
    })();


}(window.CONTROLERS = window.CONTROLERS || {}, QAV));