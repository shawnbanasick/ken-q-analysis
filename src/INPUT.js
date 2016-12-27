//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global window, clearTimeout, setTimeout, download, alasql, Blob, saveAs, PASTE, QAV, $, document, UTIL, localStorage, _ */

(function (INPUT, QAV, undefined) {



  // to force number keypad on ipad
  (function () {
    $('input[type="text"]').on('touchstart', function () {
      $(this).attr('type', 'number');
    });
  })();

  (function () {
    $('input[type="text"]').on('keydown blur', function () {
      $(this).attr('type', 'text');
    });
  })();


  // *********************************************************************   view
  // ******* Set range of Pyramid Shape  ****************************************
  // *****************************************************************************
  (function () {
    $("#dataRangeSelect").change(function () {
      var optionSelected = $(this).val();
      $(".pyramidShaper").prop('selected', function () {
        return this.defaultSelected;
      });
      localStorage.setItem("maxRange", optionSelected);
      setupSelectDropdowns(optionSelected);
      createPyramid();
    });
  })();

  (function () {
    // reset max range on page load
    if (localStorage.getItem("maxRange")) {
      var optionSelected2 = String(localStorage.getItem("maxRange"));
      setupSelectDropdowns(optionSelected2);
    }
  })();


  // *********************************************************************   view
  // ******* observe changes to Q-sort pyramid shape selectors *****************
  // *****************************************************************************
  (function () {
    $(".pyramidShaper").change(function () {
      var qsortPatternShape = [];
      $(".pyramidShaper").each(function () {
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
      var totalStatements = _.reduce(testArray1, function (sum, n) {
        return sum + n;
      });
      QAV.setState("qavTotalStatements", totalStatements);
      createPyramid();
    });
  })();

  // *********************************************************************   view
  // ******* observe changes to Q-sort statement number input text fields ********
  // *****************************************************************************
  (function () {
    $('#cardInputContainerDiv input[type=text]').on("change keyup paste", function () {
      var testArray1 = JSON.parse(localStorage.getItem("pyramidShapeArrayStored"));

      var misshapenQsort = [];

      $('#cardInputContainerDiv input[type=text]').each(function (index) {

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
          $(this).css("border", "red solid 3px");
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
  (function () {
    $('.useLocalSelect').change(function () {
      var key = $(this).attr('id');
      var value = $(this).val();
      localStorage.setItem(key, value);
    });
  })();

  // input delay
  (function () {
    var t = '';
    $('.useLocalInput').keyup(function () {
      clearTimeout(t);
      var key = $(this).attr('id');
      var value = $(this).val();
      t = setTimeout(function () {
        localStorage.setItem(key, value);
      }, 2000);
    });
  })();

  // redraw on page reload
  (function () {
    $('.useLocal').each(function () {
      var key = $(this).attr('id');
      if (localStorage.getItem(key)) {
        $(this).val(localStorage.getItem(key));
      }
    });
  })();

  // clear sort triangle shape
  (function () {
    $('.clearLocalSelect').click(function () {
      $('.pyramidShaper').each(function () {
        $(this).val('');
        var key = $(this).attr('id');
        localStorage.removeItem(key);
        clearPreviousPyramid();
      });
    });
  })();

  // set and store dataRangeSelect dropdown selection
  (function () {
    $("#dataRangeSelect").on('change', function () {
      localStorage.setItem('dataRangeSelect', $("#dataRangeSelect").val());
    });
  })();

  // recall data range on page load
  (function () {
    if (localStorage.getItem('dataRangeSelect')) {
      var storedValue = (localStorage.getItem('dataRangeSelect'));
      $("#dataRangeSelect").val(storedValue);
      createPyramid();
    }
  })();

  // delete sort from respondent sort list
  (function () {
    $("#respondentList").on("click", "button", function (e) {
      e.preventDefault();
      $(this).parent().remove();
    });
  })();


  // click handlers respondent sort list
  (function () {
    $("#exportSortsExcel").on("click", function () {
      exportSortsExcel();
    });
  })();

  (function () {
    $("#exportSortsPQM").on("click", function () {
      exportSortsPQM();
    });
  })();

  (function () {
    $("#beginMIAnalysis").on("click", function () {
      beginMIAnalysis();
    });
  })();

  //  (function () {
  //    $("#beginAnalysisPqmethod").on("click", function (e) {
  //      e.preventDefault();
  //      beginAnalysisPqmethod();
  //    });
  //  })();

  // re-draw respondent list on page load
  (function () {
    manualInputRespondentList();
  })();
  // todo - make delete sort button removals on respondent list permanent in localstorage
  // todo - disable submit buttton is not working

  // disable submit button on manual input form
  (function () {
    $('input[type="submit"]').prop('disabled', true);
    $('.tabable').change(function () {
      if ($(this).val() !== '') {
        $('input[type="submit"]').prop('disabled', false);
      }
    });
  })();
  // persist q sort statement paste textarea
  (function () {
    var input = document.getElementById('statementsInputBoxMI');

    // analysisVariable
    input.value = localStorage.getItem("statementsInputBoxMI");

    $('#statementsInputBoxMI').on('input propertychange change', function () {
      localStorage.setItem("statementsInputBoxMI", this.value);
    });
  })();

  INPUT.sanitizeRespondentName = function (e) {
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
   ********* Export Functions ***************************************************
   ******************************************************************************/

  // todo - combine with export functions in qAnalysis.js to DRY this code
  function exportSortsExcel() {
    var timeStamp = UTIL.currentDate1() + "-" + UTIL.currentTime1();
    var projectName3 = $('#projectNameMI').val();
    var projectName2 = UTIL.sanitizeUserInputText(projectName3);
    var projectName = projectName2.replace(/ /g, "_");

    // set sheetnames
    var sheetNames = {
      sheetid: "Sorts",
      header: false,
    };

    //  pull output
    var output = [];
    $(".respondentList li").each(function () {
      var temp1 = ($(this).text());
      var temp2 = temp1.replace("delete sort", "");
      var temp3 = temp2.split(',');
      var temp4 = _.map(temp3, convertToNumber);
      output.push(temp4);
    });

    function convertToNumber(n) {
      if (isNaN(Number(n))) {
        return n;
      } else {
        return Number(n);
      }
    }

    var fileName = 'SELECT INTO XLSX("Exported_Sorts_' + projectName + '_' + timeStamp + '.xlsx", ?) FROM ?';

    var download = alasql(fileName, [sheetNames, output]);
  }


  // todo - add clearing of export setup box on change to max sort range
  // todo - add prompt for export filename
  function exportSortsPQM() {

    var output = [];
    $(".respondentList li").each(function () {
      var temp11 = ($(this).text());
      var temp21 = temp11.replace("delete sort", "");
      output.push(temp21);
    });

    // export file line #1
    var temp1, temp1a, temp2, temp3, temp3a, temp3c, temp3b, temp3d;
    temp1 = output.length;
    temp1a = String(UTIL.threeDigitPadding(temp1));

    temp2 = $("#projectNameMI").val();
    temp3 = $("#statementsInputBoxMI").val();
    temp3d = temp3.trim();
    temp3c = temp3d.split("\n");
    temp3a = temp3c.length;
    temp3b = String(UTIL.threeDigitPadding(temp3a));

    var temp5 = localStorage.getItem("maxRange");
    var temp5a = temp5.split(",");
    var temp5b = temp5a[0];
    var temp5c = temp5a[1];
    var temp5d = String(UTIL.threeDigitPadding(+temp5b));
    var temp5e = String(UTIL.threeDigitPadding(+temp5c));

    var temp6 = JSON.parse(localStorage.getItem("pyramidShapeArrayStored"));
    var temp6a = "";
    var temp6b = "";
    for (var i = 0; i < 20; i++) {
      temp6a = String(UTIL.threeDigitPadding(temp6[i]));
      temp6b += temp6a;
    }

    var line2 = temp5d + temp5e + temp6b;

    $("#sortExportBox").append("  0" + temp1a + temp3b + " " + temp2);
    $("#sortExportBox").append("\n");
    $("#sortExportBox").append(line2);
    $("#sortExportBox").append("\n");

    for (var j = 0; j < output.length; j++) {
      var temp8 = output[j].split(",");
      var respondentName = temp8[0];
      var temp8a = INPUT.sanitizeRespondentName(respondentName);
      var temp8c = temp8.slice(1, temp8.length);
      var temp8d = temp8c.toString();

      var temp8e = temp8d.replace(/,/g, " ");
      var temp8f = temp8e.replace(/ -/g, "-");
      var temp8g = temp8f.replace(/[\[\]']+/g, '');

      if (temp8[1] < 0) {
        temp8g = "  " + temp8g;
      } else {
        temp8g = "   " + temp8g;
      }
      var temp9 = temp8a + temp8g;
      $("#sortExportBox").append(temp9);
      $("#sortExportBox").append("\n");
    }

    // todo - add check to match statements.length with pyramid sort entry sum

    // pull data from export prep box
    var exportData = $('#sortExportBox').val();

    var timeStamp = UTIL.currentDate1() + "-" + UTIL.currentTime1();

    var blob = new Blob([exportData], {
      type: "text/plain;charset=us-ascii"
    });
    saveAs(blob, "Ken-Q_PQMethod_Export_" + timeStamp + ".DAT");

    $("#sortExportBox").html("");
  }

  function beginMIAnalysis() {
    // get project name and set qav
    var qavProjectName1 = $("#projectNameMI").val();
    var qavProjectName = UTIL.sanitizeUserInputText(qavProjectName1);

    QAV.setState("qavProjectName", qavProjectName);

    // get user input for sorts, shift for respondent names array and raw sorts array
    var userStatementsInput = PASTE.pullStatementsIntoAnalysis("statementsInputBoxMI");
    QAV.setState("qavCurrentStatements", userStatementsInput);

    //  pull user input sorts
    var namesAndSorts = [];
    $(".respondentList li").each(function () {
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
      $("#existingDatabaseRespondentList").append("<li>" + respondent + "&nbsp;&nbsp;&nbsp" + sortItem + "</li>");
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

      // flash the success modal
      $('#addSortModal').toggleClass('active');
      setTimeout(function () {
        $('#addSortModal').toggleClass('active');
      }, 1500);
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
    $("#respondentList").each(function () {
      listContents.push(this.innerHTML);
    });
    localStorage.setItem('currentRespondentList', JSON.stringify(listContents));
  }

  /******************************************************************   view-model
   ********* sort condition testers **********************************************
   ******************************************************************************/

  INPUT.isSortSymmetric = function () {

    var valuesArray = [];
    var duplicateCheckArray1 = [];

    // grab values from all of the input fields
    $('#cardInputContainerDiv input[type=text]').each(function (index) {

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
    var getFormattedResults = formatResults(valuesArray);

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
    duplicateCheckArray = duplicateCheckArray.filter(function (n) {
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
    var totalStatements = QAV.getState("qavTotalStatements");

    var comparisonArray = [];
    for (var i = 0; i < totalStatements; i++) {
      var j = i + 1;
      comparisonArray.push(j);
    }

    var missingValueCheckStep = _.xor(missingStatementCheckArray, comparisonArray);

    var incorrectStatementNumbers = _.filter(missingValueCheckStep, function (n) {
      return n > totalStatements;
    });
    var missingStatementNumbers = _.filter(missingValueCheckStep, function (n) {
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
      $("#respondentList").each(function (i) {
        this.innerHTML = listContents[i];
      });
    }
  }

  // *****************************************************************       view
  // ******* clear a previously created pyramid  *********************************
  // *****************************************************************************
  function clearPreviousPyramid() {
    $("[id^=rstack]").each(function () {
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