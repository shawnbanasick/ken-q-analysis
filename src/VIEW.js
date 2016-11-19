//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global window, LOAD, $, localStorage, QAV, setTimeout, PCA, document, performance*/


(function(VIEW, QAV, undefined) {


    // ************************************************************  view
    // ******* SECTION 1 - intro   ******+++++++++++++++*****************
    // ******************************************************************

    $(function() {
        // Single Page navigation
        $('.single-page-nav').singlePageNav({
            offset: $('.single-page-nav').outerHeight(),
            filter: ':not(.external)',
            updateHash: true,
            beforeStart: function() {},
            onComplete: function() {}
        });
    });

    // auto scroll to top of page on reload
    $(function() {
        $("#heroSection")[0].click();
    });

    $(function() {
        // display the first div by default.
        $("#accordion div").first().css('display', 'block');

        // Get all the links.
        var link = $("#accordion a");

        // On clicking of the links open / close.
        link.on('click', function(e) {
            e.preventDefault();
            var a = $(this).attr("href");
            $(a).slideDown('fast');

            $("#accordion div").not(a).slideUp('fast');

        });
    });


    // ************************************************************  view
    // ******* SECTION 2 - persist radio button selections     **********
    // ******************************************************************

    $(function() {
        $('#section2 input[type=radio]').each(function() {
            var state = JSON.parse(localStorage.getItem('radio_' + this.id));
            if (state) {
                this.checked = state.checked;
                var radioValue = $("input[name='radio']:checked").attr("id");
                $("#"+radioValue).parent().addClass("selected");
                inputTypeDisplay(radioValue);
            }
        });

        $(window).bind('unload', function() {
            $('#section2 input[type=radio]').each(function() {
                localStorage.setItem(
                    'radio_' + this.id, JSON.stringify({
                        checked: this.checked
                    })
                );
            });
        });

        $("#section2 input[type='radio']").click(function() {
            var radioValue = $("input[name='radio']:checked").attr("id");
            $("#existingDatabaseStatementList").empty();
            $("#existingDatabaseRespondentList").empty();

            // destroy datatable if present
            if ($.fn.DataTable.isDataTable('#correlationTable2')) {
                $('#correlationTable2').DataTable().destroy();
                $('#correlationTable2').html("");
            }
            $('#section2 .radioHighlight2').removeClass("selected");
            inputTypeDisplay(radioValue);
        });
    });

    // **** SECTION 3 **** //
    VIEW.destroyExtractionTables = function() {

        var language = QAV.getState("language");
        var centFacButText = resources[language].translation["Extract centroid factors"];
        var PcaButText = resources[language].translation["Extract principal components"];

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
            factorExtractionButton.prop('value', centFacButText);
            factorExtractionButton.prop('disabled', false);

            var PcaExtractionButton = $("#PcaExtractionButton");
            if (PcaExtractionButton.hasClass("buttonActionComplete")) {
                PcaExtractionButton.removeClass("buttonActionComplete");
                PcaExtractionButton.addClass("blackHover");
            }
            PcaExtractionButton.prop('value', PcaButText);
            PcaExtractionButton.prop('disabled', false);
        }
    };

    // SECTION 4

    // ***********************************************************************  view
    // ******* control D3 checkboxes       *****************************************
    // *****************************************************************************

    $(function() {
        $("input[name=radioCheck]").change(function() {
            var max = 2;
            if ($("input[name=radioCheck]:checked").length == max) {
                $("input[name=radioCheck]").attr('disabled', 'disabled');
                $("input[name=radioCheck]:checked").removeAttr('disabled');
            } else {
                $("input[name=radioCheck]").removeAttr('disabled');
            }

            var tempArrayChartFactors = [];
            $('input[name="radioCheck"]:checked').each(function() {
                var numberify = parseInt((this.value), 10);
                tempArrayChartFactors.push(numberify);
                localStorage.chartSelectedFactors = JSON.stringify(tempArrayChartFactors);
            });
        });
    });

    VIEW.clearSections_4_5_6 = function() {

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
        VIEW.clearPreviousTables();

        // remove checkboxes
        VIEW.removeOutputFactorCheckboxes();

        $("#downloadResultsButton").hide();
        $("#clearStorageButton").hide();
    };

    VIEW.showDisabledFunctionsAfterSplitModal = function() {
        $('.functionDisabledModal').toggleClass('active');
        setTimeout(function() {
            $('.functionDisabledModal').toggleClass('active');
        }, 1500);
    };

    // ******* helper function to show / hide input methods   ************************

    function inputTypeDisplay(inputType) {
      //
        $("label[for='" + inputType + "']").addClass("selected");
        switch (inputType) {
            case "radio4":
                $("#manualInputContainer").hide(300);
                $("#databaseSelectDiv").hide(300);
                $("#rawSorts").hide(300);
                $(".firebaseDataInputDiv").hide(300);
                $("#pasteExcelDataDiv").show(300);
                $(".analysisDataDiv").show(300);
                break;
            case "radio3": // pqmethod pasted data
                $("#manualInputContainer").hide(300);
                $("#databaseSelectDiv").hide(300);
                $("#pasteExcelDataDiv").hide(300);
                $(".firebaseDataInputDiv").hide(300);
                $("#rawSorts").show(300);
                $(".analysisDataDiv").show(300);
                break;
            case "radio2":
                $("#databaseSelectDiv").hide(300);
                $("#rawSorts").hide(300);
                $("#pasteExcelDataDiv").hide(300);
                $(".firebaseDataInputDiv").hide(300);
                $("#manualInputContainer").show(300);
                $(".analysisDataDiv").show(300);
                break;
            case "radio5":
                $("#databaseSelectDiv").hide(300);
                $("#rawSorts").hide(300);
                $("#pasteExcelDataDiv").hide(300);
                $("#manualInputContainer").hide(300);
                $(".analysisDataDiv").show(300);
                $(".firebaseDataInputDiv").show(300);
                break;

            default:
                $("#manualInputContainer").hide(300);
                $("#rawSorts").hide(300);
                $("#pasteExcelDataDiv").hide(300);
                $(".firebaseDataInputDiv").hide(300);
                $("#databaseSelectDiv").show(300);
        }
    }

    // ************************************************************  view
    // ******* SECTION 5 - factor loadings table  ***********************
    // ******************************************************************


    // ***********************************************************************  view
    // ******* modal boxes *********************************************************
    // *****************************************************************************

    $(function() {
        $('#invertModal .button-submit').on('click', function(e) {
            e.preventDefault();
            var inputValue = $("#invertModal input").val();
            if (inputValue === false || inputValue === "") {
                return false;
            }
            // todo - change to list of available factors and remove max and min from index.html
            if (inputValue > 8 || inputValue < 1) {
                return false;
            } else {
                var currentRotationTable = QAV.getState("rotFacStateArray");
                LOAD.factorInvertFunction(inputValue, currentRotationTable);
                $('#invertModal').toggleClass('active');
                $('.successModal').toggleClass('active');
                setTimeout(function() {
                    $('.successModal').toggleClass('active');
                }, 2000);
            }
        });
    });

    $(function() {
        $('#splitModal .button-submit').on('click', function(e) {
            e.preventDefault();
            var inputValue = $("#splitModal input").val();
            if (inputValue === false || inputValue === "") {
                return false;
            }
            // todo - change to list of available factors and remove max and min from index.html
            if (inputValue > 8 || inputValue < 1) {
                return false;
            } else {
                LOAD.factorSplitFunction(inputValue);
                $('#splitModal').toggleClass('active');
                $('.successModal').toggleClass('active');
                setTimeout(function() {
                    $('.successModal').toggleClass('active');
                }, 2000);
            }
        });
    });

    // cancel and close button across all modal windows
    $(function() {
        $('.button-cancel').on('click', function(e) {
            e.preventDefault();
            $(this).closest("div.modal").toggleClass('active');
        });
    });

    // ************************************************************  view
    // ******* SECTION 6 - output tables  *******************************
    // ******************************************************************

    VIEW.removeOutputFactorCheckboxes = function() {
        var temp = document.getElementById("selectFactorsForOutputDiv");
        if (temp) {
            while (temp.firstChild) {
                temp.removeChild(temp.firstChild);
            }
        }
    };

    // ***********************************************************************  view
    // ******  remove previous tables from the DOM  ********************************
    // *****************************************************************************
    // todo - dry and clean-up this block

    VIEW.clearPreviousTables = function() {

        var temp99 = $('#synSortSvgNo1');
        if (temp99) {
            d3.selectAll("#synFactorVizDiv svg").remove();
        }

        $(".vizTitles").remove();
        $(".svgDownloadButton").remove();

        var $temp = $("#factorCorrelationTableTitle");
        var $temp3 = $("#factorCorrelationTableDiv");
        if ($temp) {
            $temp.empty();
            $temp3.empty();
        }
        var $temp2 = $("#factorTables");
        if ($temp2) {
            $temp2.empty();
        }
    };

}(window.VIEW = window.VIEW || {}, QAV));
