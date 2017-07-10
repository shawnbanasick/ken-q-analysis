//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global window, LOAD, $, localStorage, QAV, d3, resources, document*/


(function (VIEW, QAV, undefined) {


    // ************************************************************  view
    // ******* SECTION 1 - intro   ******+++++++++++++++*****************
    // ******************************************************************

    $(function () {
        // Single Page navigation
        $('.single-page-nav').singlePageNav({
            offset: $('.single-page-nav').outerHeight(),
            filter: ':not(.external)',
            updateHash: true,
            beforeStart: function () {},
            onComplete: function () {}
        });
    });

    // auto scroll to top of page on reload
    $(function () {
        $("#heroSection")[0].click();
    });


    (function () {
        var language = QAV.getState("language");
        var YouSeemToBeUsing = resources[language].translation["You seem to be using"];
        var readyForAnalysis = resources[language].translation["Ready to begin analysis"];
        var YouShouldUpdate = resources[language].translation["Please update your browser before using Ken-Q Analysis"];
        var YouShouldSwitch = resources[language].translation["This browser is not supported by Ken-Q Analysis <br> Please use one of the browsers listed above"];

        var message, Linux;
        var versionLong = platform.version;
        var version = versionLong.slice(0, 2);
        var opSystem = platform.os.family;
        var userAgent = platform.ua;
        var browser = platform.name;

        if (userAgent.indexOf('Linux') >= 0) {
            Linux = true;
        }


        if (opSystem === "OS X") {
            if (browser === "Firefox") {
                if (+version >= 51) {
                    message = goodToGo();
                } else {
                    message = updateYourBrowser();
                }
            } else if (browser === "Chrome") {
                if (+version >= 55) {
                    message = goodToGo();
                } else {
                    message = updateYourBrowser();
                }
            } else {
                message = changeYourBrowser();
            }
        } else if (opSystem === "Windows") {
            if (browser === "Firefox") {
                if (+version >= 51) {
                    message = goodToGo();
                } else {
                    message = updateYourBrowser();
                }
            } else if (browser === "Chrome") {
                if (+version >= 55) {
                    message = goodToGo();
                } else {
                    message = updateYourBrowser();
                }
            } else if (browser === "Microsoft Edge") {
                if (+version >= 14) {
                    message = goodToGo();
                } else {
                    message = updateYourBrowser();
                }
            } else {
                message = changeYourBrowser();
            }
        } else if (Linux) {
            if (browser === "Firefox") {
                if (+version >= 50) {
                    $(".browserDetection .flex-item").css("background-color", "#ccffcc");
                    message = YouSeemToBeUsing + "Firefox version " + version + "<br><br>-- ready for analysis";
                } else {
                    message = updateYourBrowser();
                }
            } else if (browser === "Chrome") {
                if (+version >= 55) {
                    $(".browserDetection .flex-item").css("background-color", "#ccffcc");
                    message = YouSeemToBeUsing + "Chromium version " + version + "<br><br>-- ready for analysis";
                } else {
                    message = updateYourBrowser();
                }
            } else {
                message = changeYourBrowser();
            }
        }

        // #section1 > div.browserDetection.flex-container > div > h3
        function goodToGo() {
            $(".browserDetection .flex-item").css("background-color", "#ccffcc");
            var messageReply = YouSeemToBeUsing + platform.name + " version " + version + "<br><br>" + readyForAnalysis;
            return messageReply;
        }

        function updateYourBrowser() {
            var messageReply = YouSeemToBeUsing + platform.name + " version " + version + "<br><br>" + YouShouldUpdate;
            $(".browserDetection .flex-item").css("background-color", "yellow");
            return messageReply;
        }

        function changeYourBrowser() {
            var messageReply = YouSeemToBeUsing + platform.name + " version " + version + "<br><br>" + YouShouldSwitch;
            $(".browserDetection .flex-item").css("background-color", "yellow");
            return messageReply;
        }
        $("#browserMessage").html(message);
    })();


    // ************************************************************  view
    // ******* SECTION 2 - persist radio button selections     **********
    // ******************************************************************
    // DATA SECTION

    $(function () {
        $('#section2 input[type=radio]').each(function () {
            var state = JSON.parse(localStorage.getItem('radio_' + this.id));
            if (state) {
                this.checked = state.checked;
                var radioValue = $("input[name='radio']:checked").attr("id");
                $("#" + radioValue).parent().addClass("selected");
                inputTypeDisplay(radioValue);
            }
        });

        $(window).bind('unload', function () {
            $('#section2 input[type=radio]').each(function () {
                localStorage.setItem(
                    'radio_' + this.id, JSON.stringify({
                        checked: this.checked
                    })
                );
            });
        });

        $("#section2 input[type='radio']").click(function () {
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
    VIEW.destroyExtractionTables = function () {

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
    VIEW.changePcaExtractionButtonDisplay = function () {
        var language = QAV.getState("language");
        var PcaButText = resources[language].translation["Principal components"];
        var button = $("#PcaExtractionButton");
        button.removeClass("blackHover");
        button.addClass("buttonActionComplete");
        button.prop('value', PcaButText);
        button.prop('disabled', true);

        button2 = $("#factorExtractionButton");
        button2.prop('disabled', true);

        $("#resetAnalysisButton").prop('disabled', false);
    };


    // ***********************************************************************  view
    // ******* control D3 checkboxes       *****************************************
    // *****************************************************************************

    $(function () {
        $("input[name=radioCheck]").change(function () {
            var max = 2;
            if ($("input[name=radioCheck]:checked").length == max) {
                $("input[name=radioCheck]").attr('disabled', 'disabled');
                $("input[name=radioCheck]:checked").removeAttr('disabled');
            } else {
                $("input[name=radioCheck]").removeAttr('disabled');
            }

            var tempArrayChartFactors = [];
            $('input[name="radioCheck"]:checked').each(function () {
                var numberify = parseInt((this.value), 10);
                tempArrayChartFactors.push(numberify);
                localStorage.chartSelectedFactors = JSON.stringify(tempArrayChartFactors);
            });
        });
    });

    VIEW.clearSections_4_5_6 = function () {

        $("#judgementalRotationContainer").hide();
        $("#factorLoadingContainerDiv").hide();
        $("#selectFactorsForOutputButton").hide();
        $("#downloadCsvResultsButton").hide();
        $("#displayQuickResultsButton").hide();
        $("#factorVizOptionsDiv").hide();


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
                $(".pqmButton").hide();
                break;

            case "radio3": // pqmethod pasted data
                $("#manualInputContainer").hide(300);
                $("#databaseSelectDiv").hide(300);
                $("#pasteExcelDataDiv").hide(300);
                $(".firebaseDataInputDiv").hide(300);
                $("#rawSorts").show(300);
                $(".analysisDataDiv").show(300);
                $(".pqmButton").hide();
                break;

            case "radio2":
                $("#databaseSelectDiv").hide(300);
                $("#rawSorts").hide(300);
                $("#pasteExcelDataDiv").hide(300);
                $(".firebaseDataInputDiv").hide(300);
                $("#manualInputContainer").show(300);
                $(".analysisDataDiv").show(300);
                $(".pqmButton").hide();
                break;

            case "radio1": // radio5
                $("#databaseSelectDiv").hide(300);
                $("#rawSorts").hide(300);
                $("#pasteExcelDataDiv").hide(300);
                $("#manualInputContainer").hide(300);
                $(".analysisDataDiv").show(300);
                $(".firebaseDataInputDiv").show(300);
                $(".pqmButton").hide();
                break;

            default:
                $("#manualInputContainer").hide(300);
                $("#rawSorts").hide(300);
                $("#pasteExcelDataDiv").hide(300);
                $(".firebaseDataInputDiv").hide(300);
                $(".analysisDataDiv").show(300);
                $("#databaseSelectDiv").show(300);
                $(".pqmButton").hide();
                $("#radio5").parent().addClass("selected");
        }
    }

    // ************************************************************  view
    // ******* SECTION 5 - factor loadings table  ***********************
    // ******************************************************************
    // #section2 > div.row > div:nth-child(5) > div > label

    // ************************************************************  view
    // ******* SECTION 6 - output tables  *******************************
    // ******************************************************************

    VIEW.removeOutputFactorCheckboxes = function () {
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

    VIEW.clearPreviousTables = function () {

        var temp99 = $('#synSortSvgNo1');
        if (temp99) {
            d3.selectAll("#synFactorVizDiv svg").remove();
        }

        $(".vizTitles").remove();
        $(".svgDownloadButton").remove();
        $(".pngDownloadButton").remove();

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




    // ***********************************************************************  view
    // ******* control iziModal Displays      *****************************************
    // *****************************************************************************


    // ***********************************************************************  view
    // ******* old modal box controllers  ******************************************
    // *****************************************************************************

    // SUBMIT BUTTON event listeners
    $(function () {
        $('#invertModal').on('click', '.button-submit', function (e) {
            // e.preventDefault();
            e.stopPropagation();
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
                $('#invertModal').iziModal('close');
            }
        });
    });

    // SUBMIT BUTTON event listeners
    $(function () {
        $('#splitModal').on('click', '.button-submit', function (e) {
            // e.preventDefault();
            var inputValue = $("#splitModal input").val();
            if (inputValue === false || inputValue === "") {
                return false;
            }
            // todo - change to list of available factors and remove max and min from index.html
            if (inputValue > 8 || inputValue < 1) {
                return false;
            } else {
                LOAD.factorSplitFunction(inputValue);
                $('#splitModal').iziModal('close');
            }
        });
    });

    // cancel and close button across all modal windows
    $(function () {
        $('.button-cancel').on('click', function (e) {
            // e.preventDefault();
            $(this).closest("div.modal").toggleClass('active');
        });
    });


    VIEW.showDisabledFunctionsAfterSplitModal = function () {
        var language = QAV.getState("language");
        var title = resources[language].translation.Warning;

        $('#functionDisabledModal').iziModal({
            title: title,
            subtitle: '',
            headerColor: '#ffff00', // '#88A0B9',
            theme: 'light', // light
            attached: '', // bottom, top
            width: '80%',
            padding: 20,
            radius: 3,
        });
        $("#functionDisabledModal").iziModal('open');
    };

    VIEW.showNoSortsFlaggedOnFactorModal = function () {
        var language = QAV.getState("language");
        var title = resources[language].translation.Error;
        $('#noFactorLoadingModal').iziModal({
            title: title,
            headerColor: '#e50000', // '#88A0B9',
            width: '80%',
            padding: 20,
            radius: 3,
        });
        $("#noFactorLoadingModal").iziModal('open');
    };

    VIEW.showSortFlaggedOnMultipleFactorsModal = function () {
        var language = QAV.getState("language");
        var title = resources[language].translation.Error;
        $('#sortLoadingMultipleFactorsModal').iziModal({
            title: title,
            subtitle: '',
            headerColor: '#e50000', // '#88A0B9',
            theme: '', // light
            attached: '', // bottom, top
            width: '80%',
            padding: 20,
            radius: 3,
        });
        $("#sortLoadingMultipleFactorsModal").iziModal('open');
    };

    VIEW.showInvertModal = function () {
        var language = QAV.getState("language");
        var title = resources[language].translation["Select Factor to Invert"];

        $('#invertModal').iziModal({
            title: title,
            subtitle: '',
            headerColor: '#6d7d8d', // '#88A0B9',
            width: '80%',
            bodyOverflow: true,
            closeOnEscape: true,
            overlay: true,
            timeout: false, // or false
            timeoutProgressbar: false,
            pauseOnHover: false,
            timeoutProgressbarColor: 'rgba(255,255,255,0.5)',
        });
        $('#invertModal').iziModal('open');
    };

    VIEW.showlocalDataDeleteSuccessModal = function () {
        var language = QAV.getState("language");
        var title = resources[language].translation["Permanently delete all locally-stored data"];
        $('#localDataDeleteSuccessfulModal').iziModal({
            title: title,
            subtitle: '',
            headerColor: '#4CBB17', // '#88A0B9',
            width: '80%',
            padding: 20,
            overlay: true,
            timeout: 1500, // or false
            timeoutProgressbar: true,
            pauseOnHover: true,
            timeoutProgressbarColor: 'rgba(255,255,255,0.5)',
        });
        $('#localDataDeleteSuccessfulModal').iziModal('open');
    };


    VIEW.showDeleteKenqData = function () {
        var language = QAV.getState("language");
        var title = resources[language].translation["Delete local data"];
        $('#deleteLocalDataModal').iziModal({
            title: title,
            subtitle: '',
            padding: 20,
            headerColor: '#e50000', // '#88A0B9',
            width: '80%',
        });
        $('#deleteLocalDataModal').iziModal('open');
    };

    VIEW.showSplitBipolarFactorModal = function () {
        var language = QAV.getState("language");
        var title = resources[language].translation["Split Bipolar Factor"];
        $('#splitModal').iziModal({
            title: title,
            subtitle: '',
            headerColor: '#6d7d8d', // '#88A0B9',
            width: '80%',
            padding: 20,
        });
        $('#splitModal').iziModal('open');
    };

    VIEW.showRotationChartOptionsModal = function () {
        var language = QAV.getState("language");
        var title = resources[language].translation["Rotation Chart Options"];
        $('#rotationChartOptionsModal').iziModal({
            title: title,
            headerColor: '#6d7d8d', // '#88A0B9',
            width: '80%',
            padding: 20,
            radius: 3,
        });
        $("#rotationChartOptionsModal").iziModal('open');
    };

    VIEW.showGenericErrorModal = function () {
        var language = QAV.getState("language");
        var title = resources[language].translation.Error;
        $('#genericErrorModal').iziModal({
            title: title,
            subtitle: '',
            padding: 20,
            headerColor: '#e50000', // '#88A0B9',
            width: '80%',
        });
        $('#genericErrorModal').iziModal('open');

    };

}(window.VIEW = window.VIEW || {}, QAV));