//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global window, $, localStorage, _, document, CENTROID, VIEW, PCA, QAV, UTIL, performance*/

(function (CONTROLERS, QAV, undefined) {

    /*
    //
    // **** SECTION 3 **** 
    //
    */
    // to start pca and draw table
    (function () {
        document.getElementById("PcaExtractionButton").addEventListener("click", function () {

            var button, button2, X, t0, t1;


            t0 = performance.now();

            button = $(this);
            button.removeClass("blackHover");
            button.addClass("buttonActionComplete");
            button.prop('value', 'Principal Components');
            button.prop('disabled', true);

            button2 = $("#factorExtractionButton");
            button2.prop('disabled', true);

            $("#resetAnalysisButton").prop('disabled', false);

            X = JSON.parse(localStorage.getItem("originalCorrelationValues"));
            PCA.doPrincipalComponents(X);

            // localStorage.setItem("rotFacStateArray", JSON.stringify(results[3]));

            // set state numFactorsExtracted
            QAV.numFactorsExtracted = 8;

            PCA.drawExtractedFactorsTable();

            t1 = performance.now();

            console.log('%c PCA completed in ' + (t1 - t0).toFixed(0) + ' milliseconds', 'background: black; color: white');


            // required for firefox to register event
            return false;
        });
    })();


    // Centrold factor extration button listener
    (function () {
        $("#factorExtractionButton").on("click", function () {

            var button2;
            // callCentroidFromLocalDemoData();
            fireFactorExtraction();
            $(this).removeClass("blackHover").addClass("buttonActionComplete").prop('value', 'Centroid Factors').prop('disabled', true);

            button2 = $("#PcaExtractionButton");
            button2.prop('disabled', true);

            $("#resetAnalysisButton").prop('disabled', false);

            CENTROID.drawExtractedFactorsTable();
            // required for firefox to register event
            return false;
        });
    })();

    // clear view for reset analysis
    (function () {
        $("#resetAnalysisButton").on("click", function () {

            VIEW.destroyExtractionTables();
            $(this).prop('disabled', true);

            VIEW.clearSections_4_5_6();

            // reset state
            localStorage.setItem("rotFacStateArray", "");
            localStorage.setItem("tempRotFacStateArray", "");
            localStorage.setItem("numberFactorsExtracted", "");
            localStorage.setItem("fSigCriterion", "");
            localStorage.setItem("rowH2", "");
            localStorage.setItem("fSigCriterionResults", "");
            localStorage.setItem("expVar", "");
            localStorage.setItem("columnHeadersArray", "");
            localStorage.setItem("saveRotationCounter", "");
            localStorage.setItem("rotFacStateArrayArchive1", "");
            localStorage.setItem("centroidFactors", "");
            localStorage.setItem("analysisOutput", "");
            localStorage.setItem("factorMatrixTransposed", "");

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
    // **** SECTION 4 **** 
    //
    */

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

            // set state numFactors
            QAV.numFactorsRetained = numFactors;

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

                var button = $(this);
                button.removeClass("blackHover");
                button.addClass("buttonActionComplete");
                button.prop('value', (numFactors + ' Factors kept'));
                button.prop('disabled', true);


                // get the right data according to factor type
                if (QAV.typeOfFactor === "PCA") {
                    // get state eigenVecs
                    data = _.cloneDeep(QAV.eigenVecs);
                    loopLen = data.length;

                    // get just the factors selected from data
                    for (i = 0; i < loopLen; i++) {
                        data[i] = data[i].slice(0, numFactors);
                    }

                } else {
                    // get state centroidFactors
                    data = _.cloneDeep(QAV.centroidFactors);
                    loopLen = data.length;

                    // get just the factors selected from data
                    for (i = 0; i < loopLen; i++) {
                        data[i] = data[i].slice(0, numFactors);
                    }
                }

                // send data to state matrix and then to chart 
                localStorage.setItem("rotFacStateArray", JSON.stringify(data));

                // prep for chart
                calculateCommunalities(data);


                $("#rotationHistoryList").append('<li>' + numFactors + ' factors kept for rotation</li>');


                // gets array for fSig testing from LS of calculateCommunalities - sets fSigCriterionResults
                calculatefSigCriterionValues("noFlag");

                localStorage.setItem("tempRotFacStateArray", JSON.stringify(data));

                //draw rotation table for the first time
                var isRotatedFactorsTableUpdate = "no";
                drawRotatedFactorsTable2(isRotatedFactorsTableUpdate, "noFlag");

                // archive rotation matrix state and factor rotation table
                saveRotationArchiveCounter("reset");
                archiveFactorScoreStateMatrixAndDatatable();

                // format for use with varimax
                centroidFactors = _.zip.apply(_, data);

                // todo - convert to send to state matrix
                localStorage.setItem("centroidFactors", JSON.stringify(centroidFactors));



            }
        });
    })();

    // display rotation chart options in DOM
    (function () {
        $("#factorJudgementRotButton").on("click", function () {
            var testForSplit = localStorage.getItem("hasSplitFactor");
            if (testForSplit > 0) {
                VIEW.showDisabledFunctionsAfterSplitModal();
            } else {

                // set state typeOfRotation
                QAV.typeOfRotation = "judgemental";

                var button = $(this);
                button.removeClass("blackHover");
                button.addClass("buttonActionComplete");
                button.prop('value', 'Judgemental Rotation');
                button.prop('disabled', true);

                // get number of checkboxes from UI and append to DOM
                UTIL.addFactorSelectCheckboxesRotation(QAV.numFactorsRetained);

                $("#judgementalRotationContainer").show();
            }
        });

    })();


}(window.CONTROLERS = window.CONTROLERS || {}, QAV));





// set up datatable for PCs
//            var configObj = {};
//            configObj.fixed = "";
//            configObj.headers = "";
//            configObj.data = results[3];
//            configObj.domElement = "#factorRotationTable2";
//            configObj.colDefs = {
//                'targets': [4, 6, 8, 10, 12, 14, 16, 18],
//                'searchable': false,
//                'orderable': true,
//                'render': function (data) { // (data, type, full, meta) {
//                    if (data === "") {
//                        return "";
//                    } else {
//                        return '<input type="checkbox" class="sigCheckbox" name="d' + data + '" value="' + data + '" defaultChecked="' + (data === 'true' ? 'checked' : '') + '"' + (data === 'true' ? 'checked="checked"' : '') + ' />';
//                    }
//                }
//            };
//
//            UTIL.drawDatatable(configObj);