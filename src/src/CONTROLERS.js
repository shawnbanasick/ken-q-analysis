//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global window, $, resources, EXCEL, DEMO, d3, INPUT, ROTA, VARIMAX, OUTPUT, setTimeout, LOAD, localStorage, _, document, PASTE, CORR, sessionStorage, CENTROID, VIEW, PCA, QAV, UTIL, performance*/

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

    (function () {
        $("#exportExcelSortsPQM").on("click", function (e) {
            e.preventDefault();
            EXCEL.exportExcelSortsPQM();
        });
    })();

    // import EXCEL files
    (function () {
        $("#fileSelect").on("change", function (e) {
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


    /*
    //
    // **** SECTION 2 **** correlations 
    //
    */


    // start correlation anaysis from demo data
    (function () {
        $("#beginAnalysisLocalData").on("click", function () {
            CORR.createCorrelationTable();
        });
    })();


    /*  
    //
    // **** SECTION 3 **** extractions
    //
    */
    // to start pca and draw PCA table
    (function () {
        document.getElementById("PcaExtractionButton").addEventListener("click", function () {

            var button, button2, X, t0, t1, dataArray2, dataArray;

            var language = QAV.getState("language");
            var PcaButText = resources[language]["translation"]["Principal components"];

            t0 = performance.now();

            button = $(this);
            button.removeClass("blackHover");
            button.addClass("buttonActionComplete");
            button.prop('value', PcaButText);
            button.prop('disabled', true);

            button2 = $("#factorExtractionButton");
            button2.prop('disabled', true);

            $("#resetAnalysisButton").prop('disabled', false);

            X = QAV.getState("originalCorrelationValues");
            PCA.doPrincipalComponents(X);

            QAV.setState("numFactorsExtracted", 8);

            PCA.drawExtractedFactorsTable();

            // get data for scree plot
            dataArray2 = QAV.getState("eigenValuesSorted");
            dataArray = dataArray2.slice(0, 8);

            UTIL.drawScreePlot(dataArray);

            t1 = performance.now();

            console.log('%c PCA completed in ' + (t1 - t0).toFixed(0) + ' milliseconds', 'background: black; color: white');

            // required for firefox to register event
            return false;
        });
    })();


    // Centroid factor extration button listener
    (function () {
        $("#factorExtractionButton").on("click", function () {

            var button2, dataArray;
            var language = QAV.getState("language");
            var centFacButText = resources[language]["translation"]["Centroid factors"];

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

            VIEW.clearSections_4_5_6();

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

            QAV.centroidFactors = "";
            QAV.typeOfFactor = "";
            QAV.pcaNumberFactorsExtracted = "";
            QAV.factorLabels = "";
            QAV.eigenValuesSorted = "";
            QAV.eigenValuesAsPercents = "";
            QAV.eigenValuesCumulPercentArray = "";
            QAV.eigenVecs = "";
            QAV.numFactorsExtracted = "";
            QAV.pcaTableHeaders = "";
            QAV.pcaTableTargets = "";
            QAV.numFactorsRetained = "";
            QAV.typeOfRotation = "";

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
            ROTA.saveRotation();
        });
    })();


    // triggered by "Display Selected Factors" button
    (function () {
        $("#generateRotationItemsButton").on("click", function (e) {
            e.preventDefault();
            var rotFacStateArray = QAV.getState("rotFacStateArray");
            var tempRotFacStateArray = _.cloneDeep(rotFacStateArray);
            QAV.setState("tempRotFacStateArray", tempRotFacStateArray);

            // pull the selected factors and then pull their data
            ROTA.setRotationFactorsFromCheckbox();
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
            ROTA.updateDatatable1(prepTwoFactorTable);

            // reset degree display, button color and stored value
            $("#handRotationDisplayContainer div").html("0&deg");
            sessionStorage.setItem("rotationDegreeDisplayValue", 0);
            var rotationDegreeDisplayValue = 0;
            ROTA.saveRotationButtonColor(rotationDegreeDisplayValue);

            //draw rotation table for the first time
            var isRotatedFactorsTableUpdate = "destroy";
            LOAD.drawRotatedFactorsTable2(isRotatedFactorsTableUpdate, "noFlag");
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
            var numFactors, data, loopLen, temp1, i, centroidFactors;

            $("#factorLoadingContainerDiv").show();

            numFactors = parseInt($("#selectFactorsRotation option:selected").val());

            QAV.setState("numFactorsRetained", numFactors);

            // prvent user selection errors 
            temp1 = QAV.numFactorsExtracted || 0;
            if (numFactors > temp1) {
                $("#rotationLargeNumberError").show();
            } else if (isNaN(numFactors)) {
                $("#rotationNanError").removeClass("hidden");
            } else {
                $("#rotationLargeNumberError").hide();
                $("#rotationNanError").addClass("hidden");

                $("#factorVarimaxButton").show();
                $("#factorJudgementRotButton").show();

                var language = QAV.getState("language");
                var facText = resources[language]["translation"]["Factors Kept"];
                var appendText = resources[language]["translation"]["Factors Kept for Rotation"];

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
                var judgeText = resources[language]["translation"]["Judgemental rotation"];
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
                var varmaxRotButText = resources[language]["translation"]["Varimax rotation applied"];

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
            $('#splitModal').toggleClass('active');
        });
    })();

    // click handler for select factor loadings checkboxes
    (function () {
        $('#factorRotationTable2 tbody').on('click', 'tr', function () {
            var table = $('#factorRotationTable2').DataTable(); //
            var data = table
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
                window.alert("Factor inversion has to be performed before bipolar factor split.");
            } else {
                $('#invertModal').toggleClass('active');
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
            OUTPUT.getFactorsForAnalysis();

            // begins preliminary results display function cascade
            var canOutput = OUTPUT.pullFlaggedFactorLoadings();

            if (canOutput !== "false") {
                OUTPUT.generateOutput();
                VIEW.clearPreviousTables();
                CORR.drawRawSortsRadviz();
                OUTPUT.showPreliminaryOutput1();
                $("#downloadResultsButton").show();
                $("#clearStorageButton").show();
            }
        });
    })();


    // start the output calculations and file write functions cascade
    (function () {
        $("#downloadResultsButton").on("click", function () {
            OUTPUT.downloadOutput();
        });
    })();

    (function () {
        $("#selectFactorsForOutputButton").on("click", function () {
            OUTPUT.appendFactorSelectionCheckboxes();
        });
    })();

    (function () {
        $("#clearStorageButton").on("click", function () {
            $('#deleteLocalDataModal').toggleClass('active');
        });
    })();

    (function () {
        $("#deleteLocalDataConfirmButton").on("click", function () {
            localStorage.clear();
            sessionStorage.clear();
            $('#deleteLocalDataModal').toggleClass('active');
            $('.successDeleteModal').toggleClass('active');
            setTimeout(function () {
                $('.successDeleteModal').toggleClass('active');
            }, 2000);
        });
    })();

}(window.CONTROLERS = window.CONTROLERS || {}, QAV));