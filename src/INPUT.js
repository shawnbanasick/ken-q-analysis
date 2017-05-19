//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global window, clearTimeout, resources, setTimeout, alasql, Blob, saveAs, PASTE, QAV, $, document, UTIL, localStorage, _ */

(function(INPUT, QAV, undefined) {

    // to force number input types on mobile devices
    (function() {
        $('input[type="text"]').on('touchstart', function() {
            $(this).attr('type', 'number');
        });
    })();

    (function() {
        $('input[type="text"]').on('keydown blur', function() {
            $(this).attr('type', 'text');
        });
    })();


    // *********************************************************************   view
    // ******* Set range of Pyramid Shape  ****************************************
    // *****************************************************************************
    (function() {
        $("#dataRangeSelect").change(function() {
            var optionSelected = $(this).val();
            $(".pyramidShaper").prop('selected', function() {
                return this.defaultSelected;
            });
            localStorage.setItem("maxRange", optionSelected);
            setupSelectDropdowns(optionSelected);
            createPyramid();
        });
    })();

    (function() {
        // reset max range on page load
        if (localStorage.getItem("maxRange")) {
            var optionSelected2 = String(localStorage.getItem("maxRange"));
            setupSelectDropdowns(optionSelected2);
        }
    })();


    // *********************************************************************   view
    // ******* observe changes to Q-sort pyramid shape selectors *****************
    // *****************************************************************************
    (function() {
        $(".pyramidShaper").change(function() {
            var qsortPatternShape = [];
            $(".pyramidShaper").each(function() {
                var pushValue = $(this).val();
                if (pushValue === null || undefined || NaN) {
                    pushValue = 0;
                } else {
                    pushValue = _.parseInt(pushValue);
                }
                qsortPatternShape.push(pushValue);
            });
            localStorage.setItem("pyramidShapeArrayStored", JSON.stringify(qsortPatternShape));

            var testArray1 = _.cloneDeep(qsortPatternShape);
            var totalStatements = _.reduce(testArray1, function(sum, n) {
                return sum + n;
            });
            QAV.setState("qavTotalStatements", totalStatements);
            localStorage.setItem("qavTotalStatements", totalStatements);
            createPyramid();
        });
    })();

    // *********************************************************************   view
    // ******* observe changes to Q-sort statement number input text fields ********
    // *****************************************************************************
    (function() {
        $('#cardInputContainerDiv input[type=text]').on("change keyup paste", function() {
            var testArray1 = JSON.parse(localStorage.getItem("pyramidShapeArrayStored"));

            var misshapenQsort = [];

            $('#cardInputContainerDiv input[type=text]').each(function(index) {

                var testValue = $(this).val();
                var testValue1 = testValue.trim();
                var testValue2 = String(testValue1);
                testValue2 = testValue2.replace(/\s{2,}/g, ' '); // remove 2 spaces
                var testValue3 = testValue2.split(" ");


                for (var j = 0; j < testValue3.length; j++) {
                    testValue3[j] = +testValue3[j];
                }

                while (_.last(testValue3) === 0) {
                    testValue3.pop();
                }

                var testForNanArray = [];
                var m = index + 1;
                for (var k = 0; k < testValue3.length; k++) {
                    $("#card" + m + k).html(String(testValue3[k]));
                    var testForNan = isNaN(testValue3[k]);
                    if (testForNan === true) {
                        testForNanArray.push(testValue3[k]);
                    }
                }
                if (testForNanArray.length > 0 || testValue3.length > testArray1[index]) {
                    var doBeep = QAV.getState("doErrorSound") || "true";
                    $(this).css("border", "red solid 3px");
                    if (doBeep === "true") {
                        beep();
                    }
                    misshapenQsort.push(1);
                } else {
                    $(this).css("border", "red solid 0px");
                }
            });

            var qsortWellShaped;
            if (misshapenQsort.length > 0) {
                qsortWellShaped = false;
            } else {
                qsortWellShaped = true;
            }
            localStorage.setItem("goodInput", qsortWellShaped);
        });
    })();


    // set and reset multiple dropdown selections on page re-load
    (function() {
        $('.useLocalSelect').change(function() {
            var key = $(this).attr('id');
            var value = $(this).val();
            localStorage.setItem(key, value);
        });
    })();

    // input delay
    (function() {
        var t = '';
        $('.useLocalInput').keyup(function() {
            clearTimeout(t);
            var key = $(this).attr('id');
            var value = $(this).val();
            t = setTimeout(function() {
                localStorage.setItem(key, value);
            }, 2000);
        });
    })();

    // redraw on page reload
    (function() {
        $('.useLocal').each(function() {
            var key = $(this).attr('id');
            if (localStorage.getItem(key)) {
                $(this).val(localStorage.getItem(key));
            }
        });
    })();

    // clear sort triangle shape
    (function() {
        $('.clearLocalSelect').click(function() {
            $('.pyramidShaper').each(function() {
                $(this).val('');
                var key = $(this).attr('id');
                localStorage.removeItem(key);
                clearPreviousPyramid();
            });
        });
    })();

    // set and store dataRangeSelect dropdown selection
    (function() {
        $("#dataRangeSelect").on('change', function() {
            localStorage.setItem('dataRangeSelect', $("#dataRangeSelect").val());
        });
    })();

    // recall data range on page load
    (function() {
        if (localStorage.getItem('dataRangeSelect')) {
            var storedValue = (localStorage.getItem('dataRangeSelect'));
            $("#dataRangeSelect").val(storedValue);
            createPyramid();
        }
    })();

    // delete sort from respondent sort list
    (function() {
        $("#respondentList").on("click", "button", function(e) {
            // e.preventDefault();    
            e.stopPropagation();
            $(this).parent().remove();
            //      var temp1 = $("#respondentList");
            //      localStorage.setItem('CurrentRespondentList', JSON.stringify(temp1));
            saveRespondentListToLocalstorage();
        });
    })();


    // click handlers respondent sort list
    (function() {
        $("#beginMIAnalysis").on("click", function() {
            beginMIAnalysis();
            $(".jsonDownloadPQ").show();
        });
    })();

    // re-draw respondent list on page load
    (function() {
        manualInputRespondentList();
    })();
    // todo - make delete sort button removals on respondent list permanent in localstorage
    // todo - disable submit buttton is not working

    // disable submit button on manual input form
    (function() {
        $('input[type="submit"]').prop('disabled', true);
        $('.tabable').change(function() {
            if ($(this).val() !== '') {
                $('input[type="submit"]').prop('disabled', false);
            }
        });
    })();

    // persist q sort statement paste textarea
    (function() {
        var input = document.getElementById('statementsInputBoxMI');
        // analysisVariable
        input.value = localStorage.getItem("statementsInputBoxMI");
        $('#statementsInputBoxMI').on('input propertychange change', function() {
            localStorage.setItem("statementsInputBoxMI", this.value);
        });
    })();

    INPUT.sanitizeRespondentName = function(e) {
        e = e.replace(/ /g, "_");
        if (e.length > 8) {
            e = e.substring(0, 8);
        }
        while (e.length < 8) {
            e += " ";
        }
        return e;
    };

    /**********************************************************************   model
     ********* Input Error Audio **************************************************
     ******************************************************************************/

    function beep() {
        var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
        snd.play();
    }


    function beginMIAnalysis() {

        var temp6 = JSON.parse(localStorage.getItem("pyramidShapeArrayStored"));
        QAV.setState("multiplierArray", temp6);

        // get project name and set qav
        var qavProjectName1 = $("#projectNameMI").val();
        var qavProjectName = UTIL.sanitizeUserInputText(qavProjectName1);

        QAV.setState("qavProjectName", qavProjectName);

        // get user input for sorts, shift for respondent names array and raw sorts array
        var userStatementsInput = PASTE.pullStatementsIntoAnalysis("statementsInputBoxMI");
        QAV.setState("qavCurrentStatements", userStatementsInput);

        //  pull user input sorts
        var namesAndSorts = [];
        $(".respondentList li").each(function() {
            var temp1 = ($(this).text());
            var temp2 = temp1.replace("delete sort", "");
            var temp3 = temp2.split(',');
            var temp4 = _.map(temp3, convertToNumber);
            namesAndSorts.push(temp4);
        });

        // helper function
        function convertToNumber(n) {
            if (isNaN(Number(n))) {
                return n;
            } else {
                return Number(n);
            }
        }

        // set up and store 2 qav arrays - respondent names and raw sorts
        var qavRespondentNames = [];
        for (var i = 0; i < namesAndSorts.length; i++) {
            var temp1 = namesAndSorts[i].shift();
            qavRespondentNames.push(temp1);
        }

        QAV.setState("qavRespondentNames", qavRespondentNames);
        QAV.setState("respondentNames", qavRespondentNames);
        QAV.setState("qavRespondentSortsFromDbStored", namesAndSorts);

        // calculate and set the qavSortTriangleShape values
        var qavSortTriangleShape1 = JSON.parse(localStorage.getItem("pyramidShapeArrayStored"));
        UTIL.calculateSortTriangleShape(qavSortTriangleShape1);

        // paste the statements in the data staging area
        for (var k = 0; k < userStatementsInput.length; k++) {
            var sortStatement = userStatementsInput[k];
            $("#existingDatabaseStatementList").append("<li>" + sortStatement + "</li>");
        }

        // pull and set length using array - already checked during input so no check here
        var originalSortSize = namesAndSorts[0].length;
        QAV.setState("qavOriginalSortSize", originalSortSize);
        QAV.originalSortSize = originalSortSize;

        // stage sorts for analysis
        for (var j = 0; j < namesAndSorts.length; j++) {
            var sortItem = namesAndSorts[j];
            var respondent = qavRespondentNames[j];
            $("#existingDatabaseRespondentList").append("<li>" + respondent + "," + sortItem + "</li>");
        }
    }

    function checkSortCondition(duplicates, missingIncomplete, goodInput2) {
        if (duplicates === true && missingIncomplete === true && goodInput2 === "true") {
            $("#manualInputErrorMessagesDiv").hide();

            var displayedSortArray3a = JSON.parse(localStorage.getItem("displayedSortArray"));
            var displayedSortArray3 = _.sortBy(displayedSortArray3a, "statementNum");
            var displayedSortArray2 = _.pluck(displayedSortArray3, "qValue");
            var respondentSort1 = displayedSortArray2.toString();
            var respondentName = $("#respondentNameInput1").val();
            var respondentName1 = UTIL.sanitizeUserInputText(respondentName);

            var respondentListResult = respondentName1 + "," + respondentSort1;
            $("#respondentList").append('<li>' + respondentListResult + '<button class="deleteButtonSort">delete sort</button></li>');

            saveRespondentListToLocalstorage();

            document.getElementById("inputForm2").reset();
            clearPreviousPyramid();
            createPyramid();

            var language = QAV.getState("language");
            var titleText = resources[language].translation["Sort Added"];

            // flash the success modal
            $('#addSortModal').iziModal({
                title: titleText,
                subtitle: '',
                headerColor: '#00b700', // '#88A0B9',
                theme: '', // light
                attached: 'bottom', // bottom, top
                width: '100%',
                padding: 0,
                radius: 3,
                zindex: 999,
                focusInput: true,
                history: true,
                restoreDefaultContent: false,
                overlay: false,
                overlayClose: true,
                overlayColor: 'rgba(0, 0, 0, 0.4)',
                timeout: 2000, // or false
                timeoutProgressbar: true,
                pauseOnHover: false,
                timeoutProgressbarColor: 'rgba(255,255,255,0.5)',
                transitionIn: 'comingIn',
                transitionOut: 'comingOut',
                transitionInOverlay: 'fadeIn',
                transitionOutOverlay: 'fadeOut',
            });

            $('#addSortModal').iziModal('open');


        } else { // closes all true conditional
            $("#manualInputErrorMessagesDiv").show();
        }
    }

    // **********************************************************************   view
    // ******* generate sort pyramid for visuals ***********************************
    // *****************************************************************************
    function createPyramid() {
        clearPreviousPyramid();
        var pyramidShapeArray = JSON.parse(localStorage.getItem("pyramidShapeArrayStored"));
        var maxNumberBlocks = _.max(pyramidShapeArray);
        var pyramidContainerHeight = maxNumberBlocks * 35;
        $("#pyramidContainer").css("height", pyramidContainerHeight);

        if (pyramidShapeArray) {
            for (var i = 0; i < 20; i++) {
                // adjustment for div targeting
                var k = i + 1;
                for (var j = 0; j < pyramidShapeArray[i]; j++) {
                    $("<div />", {
                            "class": "flex-item",
                            id: "card" + k + j
                        })
                        .appendTo("#rstack" + k);
                }
            }
        }
    }

    // save additions to respondent list
    function saveRespondentListToLocalstorage() {
        var listContents = [];
        $("#respondentList").each(function() {
            listContents.push(this.innerHTML);
        });
        localStorage.setItem('currentRespondentList', JSON.stringify(listContents));
    }

    /******************************************************************   view-model
     ********* sort condition testers **********************************************
     ******************************************************************************/

    INPUT.isSortSymmetric = function() {
        var valuesArray = [];
        var duplicateCheckArray1 = [];

        // grab values from all of the input fields
        $('#cardInputContainerDiv input[type=text]').each(function(index) {
            // todo repeated functionality - convert to function
            if ($(this).val().length === 0) {} else {
                var getValue = $(this).val();
                var getValue22 = getValue.trim();
                var getValue2 = String(getValue22);
                var getValue3 = getValue2.replace(/\s{2,}/g, ' '); // remove 2 spac
                var getValue4 = getValue3.split(" ");

                for (var k = 0; k < getValue4.length; k++) {
                    var number = _.parseInt(getValue4[k]);
                    duplicateCheckArray1.push(number);
                    var valueIndex = {};
                    valueIndex.statementNum = number;
                    valueIndex.qValue = -6 + index;
                    valuesArray.push(valueIndex);
                }
                localStorage.setItem("displayedSortArray", JSON.stringify(valuesArray));
            }
        });

        //  clear error list
        $("#errorList").empty();

        var duplicates = findDuplicateValues(duplicateCheckArray1);
        var missingIncomplete = findMissingValues(duplicateCheckArray1);
        formatResults(valuesArray);

        // todo - move this test somewhere else
        var goodInput2 = localStorage.getItem("goodInput");
        if (goodInput2 === "true") {} else {
            $("#errorList").append("<li>Q-sort Pattern is Incorrect</li>");
        }

        checkSortCondition(duplicates, missingIncomplete, goodInput2);
        $("#respondentNameInput1").focus();

    };

    // ***************************************************************    view-model
    // ******* pull results from current input *************************************
    // *****************************************************************************
    function formatResults(valuesArray) {
        var step1 = _.cloneDeep(valuesArray);
        var sortedArray = _.sortBy(step1, "statementNum");
        var sortedResultsArray = _.pluck(sortedArray, "qValue");
        sortedResultsArray = sortedResultsArray.join("");
        return sortedResultsArray;
    }

    // ********************************************************************    model
    // ******* check for duplicate values in current input *************************
    // *****************************************************************************
    function findDuplicateValues(duplicateCheckArray1) {
        var duplicateCheckArray = _.cloneDeep(duplicateCheckArray1);

        var noStatementNumberRepeats;
        duplicateCheckArray = duplicateCheckArray.filter(function(n) {
            if (isNaN(n)) {} else {
                return n;
            }
        });

        duplicateCheckArray.sort();

        if (duplicateCheckArray.length === 0) {
            noStatementNumberRepeats = true;
        } else {
            var repeatedValues = [];
            for (var k = 0; k < duplicateCheckArray.length; k++) {
                if (duplicateCheckArray[k + 1] === duplicateCheckArray[k]) {
                    repeatedValues.push(duplicateCheckArray[k]);
                } else {}
            }
            if (repeatedValues.length) {
                var repeatedValues2 = repeatedValues.join(", ");
                noStatementNumberRepeats = false;
                $("#errorList").append("<li>Repeated Statement Numbers: " + repeatedValues2 + "</li>");
            } else {
                noStatementNumberRepeats = true;
            }
        }
        return noStatementNumberRepeats;
    }

    // ***************************************************************    view-model
    // ******* check current input for missing statement numbers *******************
    // *****************************************************************************

    function findMissingValues(duplicateCheckArray1) {
        var missingStatementCheckArray = _.cloneDeep(duplicateCheckArray1);
        //  var totalStatements = QAV.getState("qavTotalStatements");
        var totalStatements = localStorage.getItem("qavTotalStatements");

        var comparisonArray = [];
        for (var i = 0; i < totalStatements; i++) {
            var j = i + 1;
            comparisonArray.push(j);
        }

        var missingValueCheckStep = _.xor(missingStatementCheckArray, comparisonArray);
        var incorrectStatementNumbers = _.filter(missingValueCheckStep, function(n) {
            return n > totalStatements;
        });
        var missingStatementNumbers = _.filter(missingValueCheckStep, function(n) {
            return n <= totalStatements;
        });
        var noMissingValues;
        if (missingStatementNumbers.length > 0) {
            noMissingValues = false;
            var missingStatementNumbers2 = missingStatementNumbers.join(", ");
            $("#errorList").append("<li>Missing statements: " + missingStatementNumbers2 + "</li>");
        } else {
            noMissingValues = true;
        }

        var noIncorrectStatements;
        if (incorrectStatementNumbers.length) {
            $("#errorList").append("<li>Incorrect statement numbers: " + incorrectStatementNumbers + "</li>");
            noIncorrectStatements = false;
        } else {
            noIncorrectStatements = true;
        }

        var noMissingIncorrect;
        if (noIncorrectStatements === false || noMissingValues === false) {
            noMissingIncorrect = false;
        } else {
            noMissingIncorrect = true;
        }
        return noMissingIncorrect;
    }


    // **********************************************************************  view
    // ******* display manual input respondent list if exits ***********************
    // *****************************************************************************
    function manualInputRespondentList() {
        if (localStorage.getItem('currentRespondentList')) {
            var listContents = JSON.parse(localStorage.getItem('currentRespondentList'));
            $("#respondentList").each(function(i) {
                this.innerHTML = listContents[i];
            });
        }
    }

    // *****************************************************************       view
    // ******* clear a previously created pyramid  *********************************
    // *****************************************************************************
    function clearPreviousPyramid() {
        $("[id^=rstack]").each(function() {
            $(this).children("div").remove();
        });
    }

    // **********************************************************************   view
    // ******* show / hide #statements dropdowns ***********************************
    // *****************************************************************************
    function setupSelectDropdowns(optionSelected) {

        localStorage.setItem("pyramidRange", optionSelected);

        switch (optionSelected) {
            case "-3,3":
                range33();
                break;
            case "-4,4":
                range44();
                break;
            case "-6,6":
                range66();
                break;
            case "1,5":
                rangep5();
                break;
            case "1,6":
                rangep6();
                break;
            case "1,7":
                rangep7();
                break;
            case "1,8":
                rangep8();
                break;
            case "1,9":
                rangep9();
                break;
            case "1,10":
                rangep10();
                break;
            case "1,11":
                rangep11();
                break;
            case "1,12":
                rangep12();
                break;
            case "1,13":
                rangep13();
                break;
            default:
                range55();
        }

    }

    // todo - check if this useful - dynamic appending elements http: //jsfiddle.net/nick_craver/TTHDQ/12/
    // todo - add check to prevent change in sort range while data in memory

    // *********************************************************************   view
    // ******* modify display of Q-sort Column Dropdowns  **************************
    // *****************************************************************************

    function range33() {
        $("#pyramidShape1, #neg6state, #label-6").hide();
        $("#pyramidShape2, #neg5state, #label-5").hide();
        $("#pyramidShape3, #neg4state, #label-4").hide();

        $("#pyramidShape4, #neg3state, #label-3").show();
        $("#pyramidShape5, #neg2state, #label-2").show();
        $("#pyramidShape6, #neg1state, #label-1").show();
        $("#pyramidShape7, #neg0state, #label-0").show();
        $("#pyramidShape8, #pos1state, #label1").show();
        $("#pyramidShape9, #pos2state, #label2").show();
        $("#pyramidShape10, #pos3state, #label3").show();

        $("#pyramidShape11, #pos4state, #label4").hide();
        $("#pyramidShape12, #pos5state, #label5").hide();
        $("#pyramidShape13, #pos6state, #label6").hide();
        $("#pyramidShape14, #pos7state, #label7").hide();
        $("#pyramidShape15, #pos8state, #label8").hide();
        $("#pyramidShape16, #pos9state, #label9").hide();
        $("#pyramidShape17, #pos10state, #label10").hide();
        $("#pyramidShape18, #pos11state, #label11").hide();
        $("#pyramidShape19, #pos12state, #label12").hide();
        $("#pyramidShape20, #pos13state, #label13").hide();
    }

    function range44() {
        $("#pyramidShape1, #neg6state, #label-6").hide();
        $("#pyramidShape2, #neg5state, #label-5").hide();

        $("#pyramidShape3, #neg4state, #label-4").show();
        $("#pyramidShape4, #neg3state, #label-3").show();
        $("#pyramidShape5, #neg2state, #label-2").show();
        $("#pyramidShape6, #neg1state, #label-1").show();
        $("#pyramidShape7, #neg0state, #label-0").show();
        $("#pyramidShape8, #pos1state, #label1").show();
        $("#pyramidShape9, #pos2state, #label2").show();
        $("#pyramidShape10, #pos3state, #label3").show();
        $("#pyramidShape11, #pos4state, #label4").show();

        $("#pyramidShape12, #pos5state, #label5").hide();
        $("#pyramidShape13, #pos6state, #label6").hide();
        $("#pyramidShape14, #pos7state, #label7").hide();
        $("#pyramidShape15, #pos8state, #label8").hide();
        $("#pyramidShape16, #pos9state, #label9").hide();
        $("#pyramidShape17, #pos10state, #label10").hide();
        $("#pyramidShape18, #pos11state, #label11").hide();
        $("#pyramidShape19, #pos12state, #label12").hide();
        $("#pyramidShape20, #pos13state, #label13").hide();

    }

    function range55() {
        $("#pyramidShape1, #neg6state, #label-6").hide();
        $("#pyramidShape2, #neg5state, #label-5").show();
        $("#pyramidShape3, #neg4state, #label-4").show();
        $("#pyramidShape4, #neg3state, #label-3").show();
        $("#pyramidShape5, #neg2state, #label-2").show();
        $("#pyramidShape6, #neg1state, #label-1").show();
        $("#pyramidShape7, #neg0state, #label-0").show();
        $("#pyramidShape8, #pos1state, #label1").show();
        $("#pyramidShape9, #pos2state, #label2").show();
        $("#pyramidShape10, #pos3state, #label3").show();
        $("#pyramidShape11, #pos4state, #label4").show();
        $("#pyramidShape12, #pos5state, #label5").show();

        $("#pyramidShape13, #pos6state, #label6").hide();
        $("#pyramidShape14, #pos7state, #label7").hide();
        $("#pyramidShape15, #pos8state, #label8").hide();
        $("#pyramidShape16, #pos9state, #label9").hide();
        $("#pyramidShape17, #pos10state, #label10").hide();
        $("#pyramidShape18, #pos11state, #label11").hide();
        $("#pyramidShape19, #pos12state, #label12").hide();
        $("#pyramidShape20, #pos13state, #label13").hide();

    }

    function range66() {
        $("#pyramidShape1, #neg6state, #label-6").show();
        $("#pyramidShape2, #neg5state, #label-5").show();
        $("#pyramidShape3, #neg4state, #label-4").show();
        $("#pyramidShape4, #neg3state, #label-3").show();
        $("#pyramidShape5, #neg2state, #label-2").show();
        $("#pyramidShape6, #neg1state, #label-1").show();
        $("#pyramidShape7, #neg0state, #label-0").show();
        $("#pyramidShape8, #pos1state, #label1").show();
        $("#pyramidShape9, #pos2state, #label2").show();
        $("#pyramidShape10, #pos3state, #label3").show();
        $("#pyramidShape11, #pos4state, #label4").show();
        $("#pyramidShape12, #pos5state, #label5").show();
        $("#pyramidShape13, #pos6state, #label6").show();

        $("#pyramidShape14, #pos7state, #label7").hide();
        $("#pyramidShape15, #pos8state, #label8").hide();
        $("#pyramidShape16, #pos9state, #label9").hide();
        $("#pyramidShape17, #pos10state, #label10").hide();
        $("#pyramidShape18, #pos11state, #label11").hide();
        $("#pyramidShape19, #pos12state, #label12").hide();
        $("#pyramidShape20, #pos13state, #label13").hide();

    }

    function rangep5() {
        $("#pyramidShape1, #neg6state, #label-6").hide();
        $("#pyramidShape2, #neg5state, #label-5").hide();
        $("#pyramidShape3, #neg4state, #label-4").hide();
        $("#pyramidShape4, #neg3state, #label-3").hide();
        $("#pyramidShape5, #neg2state, #label-2").hide();
        $("#pyramidShape6, #neg1state, #label-1").hide();
        $("#pyramidShape7, #neg0state, #label-0").hide();

        $("#pyramidShape8, #pos1state, #label1").show();
        $("#pyramidShape9, #pos2state, #label2").show();
        $("#pyramidShape10, #pos3state, #label3").show();
        $("#pyramidShape11, #pos4state, #label4").show();
        $("#pyramidShape12, #pos5state, #label5").show();

        $("#pyramidShape13, #pos6state, #label6").hide();
        $("#pyramidShape14, #pos7state, #label7").hide();
        $("#pyramidShape15, #pos8state, #label8").hide();
        $("#pyramidShape16, #pos9state, #label9").hide();
        $("#pyramidShape17, #pos10state, #label10").hide();
        $("#pyramidShape18, #pos11state, #label11").hide();
        $("#pyramidShape19, #pos12state, #label12").hide();
        $("#pyramidShape20, #pos13state, #label13").hide();
    }

    function rangep6() {
        $("#pyramidShape1, #neg6state, #label-6").hide();
        $("#pyramidShape2, #neg5state, #label-5").hide();
        $("#pyramidShape3, #neg4state, #label-4").hide();
        $("#pyramidShape4, #neg3state, #label-3").hide();
        $("#pyramidShape5, #neg2state, #label-2").hide();
        $("#pyramidShape6, #neg1state, #label-1").hide();
        $("#pyramidShape7, #neg0state, #label-0").hide();

        $("#pyramidShape8, #pos1state, #label1").show();
        $("#pyramidShape9, #pos2state, #label2").show();
        $("#pyramidShape10, #pos3state, #label3").show();
        $("#pyramidShape11, #pos4state, #label4").show();
        $("#pyramidShape12, #pos5state, #label5").show();
        $("#pyramidShape13, #pos6state, #label6").show();

        $("#pyramidShape14, #pos7state, #label7").hide();
        $("#pyramidShape15, #pos8state, #label8").hide();
        $("#pyramidShape16, #pos9state, #label9").hide();
        $("#pyramidShape17, #pos10state, #label10").hide();
        $("#pyramidShape18, #pos11state, #label11").hide();
        $("#pyramidShape19, #pos12state, #label12").hide();
        $("#pyramidShape20, #pos13state, #label13").hide();
    }

    function rangep7() {
        $("#pyramidShape1, #neg6state, #label-6").hide();
        $("#pyramidShape2, #neg5state, #label-5").hide();
        $("#pyramidShape3, #neg4state, #label-4").hide();
        $("#pyramidShape4, #neg3state, #label-3").hide();
        $("#pyramidShape5, #neg2state, #label-2").hide();
        $("#pyramidShape6, #neg1state, #label-1").hide();
        $("#pyramidShape7, #neg0state, #label-0").hide();

        $("#pyramidShape8, #pos1state, #label1").show();
        $("#pyramidShape9, #pos2state, #label2").show();
        $("#pyramidShape10, #pos3state, #label3").show();
        $("#pyramidShape11, #pos4state, #label4").show();
        $("#pyramidShape12, #pos5state, #label5").show();
        $("#pyramidShape13, #pos6state, #label6").show();
        $("#pyramidShape14, #pos7state, #label7").show();

        $("#pyramidShape15, #pos8state, #label8").hide();
        $("#pyramidShape16, #pos9state, #label9").hide();
        $("#pyramidShape17, #pos10state, #label10").hide();
        $("#pyramidShape18, #pos11state, #label11").hide();
        $("#pyramidShape19, #pos12state, #label12").hide();
        $("#pyramidShape20, #pos13state, #label13").hide();
    }

    function rangep8() {
        $("#pyramidShape1, #neg6state, #label-6").hide();
        $("#pyramidShape2, #neg5state, #label-5").hide();
        $("#pyramidShape3, #neg4state, #label-4").hide();
        $("#pyramidShape4, #neg3state, #label-3").hide();
        $("#pyramidShape5, #neg2state, #label-2").hide();
        $("#pyramidShape6, #neg1state, #label-1").hide();
        $("#pyramidShape7, #neg0state, #label-0").hide();

        $("#pyramidShape8, #pos1state, #label1").show();
        $("#pyramidShape9, #pos2state, #label2").show();
        $("#pyramidShape10, #pos3state, #label3").show();
        $("#pyramidShape11, #pos4state, #label4").show();
        $("#pyramidShape12, #pos5state, #label5").show();
        $("#pyramidShape13, #pos6state, #label6").show();
        $("#pyramidShape14, #pos7state, #label7").show();
        $("#pyramidShape15, #pos8state, #label8").show();

        $("#pyramidShape16, #pos9state, #label9").hide();
        $("#pyramidShape17, #pos10state, #label10").hide();
        $("#pyramidShape18, #pos11state, #label11").hide();
        $("#pyramidShape19, #pos12state, #label12").hide();
        $("#pyramidShape20, #pos13state, #label13").hide();
    }

    function rangep9() {
        $("#pyramidShape1, #neg6state, #label-6").hide();
        $("#pyramidShape2, #neg5state, #label-5").hide();
        $("#pyramidShape3, #neg4state, #label-4").hide();
        $("#pyramidShape4, #neg3state, #label-3").hide();
        $("#pyramidShape5, #neg2state, #label-2").hide();
        $("#pyramidShape6, #neg1state, #label-1").hide();
        $("#pyramidShape7, #neg0state, #label-0").hide();

        $("#pyramidShape8, #pos1state, #label1").show();
        $("#pyramidShape9, #pos2state, #label2").show();
        $("#pyramidShape10, #pos3state, #label3").show();
        $("#pyramidShape11, #pos4state, #label4").show();
        $("#pyramidShape12, #pos5state, #label5").show();
        $("#pyramidShape13, #pos6state, #label6").show();
        $("#pyramidShape14, #pos7state, #label7").show();
        $("#pyramidShape15, #pos8state, #label8").show();
        $("#pyramidShape16, #pos9state, #label9").show();

        $("#pyramidShape17, #pos10state, #label10").hide();
        $("#pyramidShape18, #pos11state, #label11").hide();
        $("#pyramidShape19, #pos12state, #label12").hide();
        $("#pyramidShape20, #pos13state, #label13").hide();
    }

    function rangep10() {
        $("#pyramidShape1, #neg6state, #label-6").hide();
        $("#pyramidShape2, #neg5state, #label-5").hide();
        $("#pyramidShape3, #neg4state, #label-4").hide();
        $("#pyramidShape4, #neg3state, #label-3").hide();
        $("#pyramidShape5, #neg2state, #label-2").hide();
        $("#pyramidShape6, #neg1state, #label-1").hide();
        $("#pyramidShape7, #neg0state, #label-0").hide();

        $("#pyramidShape8, #pos1state, #label1").show();
        $("#pyramidShape9, #pos2state, #label2").show();
        $("#pyramidShape10, #pos3state, #label3").show();
        $("#pyramidShape11, #pos4state, #label4").show();
        $("#pyramidShape12, #pos5state, #label5").show();
        $("#pyramidShape13, #pos6state, #label6").show();
        $("#pyramidShape14, #pos7state, #label7").show();
        $("#pyramidShape15, #pos8state, #label8").show();
        $("#pyramidShape16, #pos9state, #label9").show();
        $("#pyramidShape17, #pos10state, #label10").show();

        $("#pyramidShape18, #pos11state, #label11").hide();
        $("#pyramidShape19, #pos12state, #label12").hide();
        $("#pyramidShape20, #pos13state, #label13").hide();
    }

    function rangep11() {
        $("#pyramidShape1, #neg6state, #label-6").hide();
        $("#pyramidShape2, #neg5state, #label-5").hide();
        $("#pyramidShape3, #neg4state, #label-4").hide();
        $("#pyramidShape4, #neg3state, #label-3").hide();
        $("#pyramidShape5, #neg2state, #label-2").hide();
        $("#pyramidShape6, #neg1state, #label-1").hide();
        $("#pyramidShape7, #neg0state, #label-0").hide();

        $("#pyramidShape8, #pos1state, #label1").show();
        $("#pyramidShape9, #pos2state, #label2").show();
        $("#pyramidShape10, #pos3state, #label3").show();
        $("#pyramidShape11, #pos4state, #label4").show();
        $("#pyramidShape12, #pos5state, #label5").show();
        $("#pyramidShape13, #pos6state, #label6").show();
        $("#pyramidShape14, #pos7state, #label7").show();
        $("#pyramidShape15, #pos8state, #label8").show();
        $("#pyramidShape16, #pos9state, #label9").show();
        $("#pyramidShape17, #pos10state, #label10").show();
        $("#pyramidShape18, #pos11state, #label11").show();

        $("#pyramidShape19, #pos12state, #label12").hide();
        $("#pyramidShape20, #pos13state, #label13").hide();
    }

    function rangep12() {
        $("#pyramidShape1, #neg6state, #label-6").hide();
        $("#pyramidShape2, #neg5state, #label-5").hide();
        $("#pyramidShape3, #neg4state, #label-4").hide();
        $("#pyramidShape4, #neg3state, #label-3").hide();
        $("#pyramidShape5, #neg2state, #label-2").hide();
        $("#pyramidShape6, #neg1state, #label-1").hide();
        $("#pyramidShape7, #neg0state, #label-0").hide();

        $("#pyramidShape8, #pos1state, #label1").show();
        $("#pyramidShape9, #pos2state, #label2").show();
        $("#pyramidShape10, #pos3state, #label3").show();
        $("#pyramidShape11, #pos4state, #label4").show();
        $("#pyramidShape12, #pos5state, #label5").show();
        $("#pyramidShape13, #pos6state, #label6").show();
        $("#pyramidShape14, #pos7state, #label7").show();
        $("#pyramidShape15, #pos8state, #label8").show();
        $("#pyramidShape16, #pos9state, #label9").show();
        $("#pyramidShape17, #pos10state, #label10").show();
        $("#pyramidShape18, #pos11state, #label11").show();
        $("#pyramidShape19, #pos12state, #label12").show();
        $("#pyramidShape20, #pos13state, #label13").hide();
    }

    function rangep13() {
        $("#pyramidShape1, #neg6state, #label-6").hide();
        $("#pyramidShape2, #neg5state, #label-5").hide();
        $("#pyramidShape3, #neg4state, #label-4").hide();
        $("#pyramidShape4, #neg3state, #label-3").hide();
        $("#pyramidShape5, #neg2state, #label-2").hide();
        $("#pyramidShape6, #neg1state, #label-1").hide();
        $("#pyramidShape7, #neg0state, #label-0").hide();

        $("#pyramidShape8, #pos1state, #label1").show();
        $("#pyramidShape9, #pos2state, #label2").show();
        $("#pyramidShape10, #pos3state, #label3").show();
        $("#pyramidShape11, #pos4state, #label4").show();
        $("#pyramidShape12, #pos5state, #label5").show();
        $("#pyramidShape13, #pos6state, #label6").show();
        $("#pyramidShape14, #pos7state, #label7").show();
        $("#pyramidShape15, #pos8state, #label8").show();
        $("#pyramidShape16, #pos9state, #label9").show();
        $("#pyramidShape17, #pos10state, #label10").show();
        $("#pyramidShape18, #pos11state, #label11").show();
        $("#pyramidShape19, #pos12state, #label12").show();
        $("#pyramidShape20, #pos13state, #label13").show();
    }

}(window.INPUT = window.INPUT || {}, QAV));
