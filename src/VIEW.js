//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global window, $, localStorage, QAV, setTimeout, PCA, document, performance*/


(function (VIEW, QAV, undefined) {


    // **** SECTION 3 **** //
    VIEW.destroyExtractionTables = function () {

        var table = $('#factorRotationTable1').DataTable();
        if (table) {
            table.destroy();
            $('#factorRotationTable1').empty();
            var footerTable = $('#factorRotationTable1Footer').DataTable();
            footerTable.destroy();
            $('#factorRotationTable1Footer').empty();
            $("#rotationHistoryList").empty();

            var factorExtractionButton = $("#factorExtractionButton");
            if (factorExtractionButton.hasClass("buttonActionComplete")) {
                factorExtractionButton.removeClass("buttonActionComplete");
                factorExtractionButton.addClass("blackHover");
            }
            factorExtractionButton.prop('value', 'Centroid Factors');
            factorExtractionButton.prop('disabled', false);

            var PcaExtractionButton = $("#PcaExtractionButton");
            if (PcaExtractionButton.hasClass("buttonActionComplete")) {
                PcaExtractionButton.removeClass("buttonActionComplete");
                PcaExtractionButton.addClass("blackHover");
            }
            PcaExtractionButton.prop('value', 'Principal Components');
            PcaExtractionButton.prop('disabled', false);

        }
    };

    // 
    VIEW.clearSections_4_5_6 = function () {

        $("#judgementalRotationContainer").hide();

        var varimaxButton = $("#factorVarimaxButton");
        if (varimaxButton.hasClass("buttonActionComplete")) {
            varimaxButton.removeClass("buttonActionComplete");
            varimaxButton.addClass("blackHover");
            varimaxButton.prop('value', 'apply varimax rotation');
            varimaxButton.prop('disabled', false);
        }
        $("#factorVarimaxButton").hide();

        var judgeButton = $("#factorJudgementRotButton");
        if (judgeButton.hasClass("buttonActionComplete")) {
            judgeButton.removeClass("buttonActionComplete");
            judgeButton.addClass("blackHover");
            judgeButton.prop('disabled', false);
        }
        $("#factorJudgementRotButton").hide();

        $("#chartAndTableDisplayContainer").hide();

        // for some reason caching the selector causes error on analysis restart
        if ($.fn.DataTable.isDataTable('#factorRotationTable2')) {
            $('#factorRotationTable2').DataTable().destroy();
            $('#factorRotationTable2').html("");
        }
        var button = $("#sendToRotationButton");
        if (button.hasClass("buttonActionComplete")) {
            button.removeClass("buttonActionComplete");
            button.addClass("blackHover");
            button.prop('value', "Submit");
            button.prop('disabled', false);
        }

        // destroy quick results tables if present
        clearPreviousTables();

        // remove checkboxes
        removeOutputFactorCheckboxes();

        $("#downloadResultsButton").hide();

        $("#clearStorageButton").hide();

    };

    VIEW.showDisabledFunctionsAfterSplitModal = function () {
        $('.functionDisabledModal').toggleClass('active');
        setTimeout(function () {
            $('.functionDisabledModal').toggleClass('active');
        }, 1500);
    };


}(window.VIEW = window.VIEW || {}, QAV));