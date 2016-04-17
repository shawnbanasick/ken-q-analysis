//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// navigation = "single page Nav"  https://github.com/ChrisWojcik/single-page-nav
/*jslint browser: true*/
/*global $, jQuery, alert*/


// todo - remove reminants of way.js from all files

$(document).ready(function () {


    // ***********************************************************************  view
    // ******* persist radio button selections    ***********************************
    // *****************************************************************************

    $(function () {
        $('#section2 input[type=radio]').each(function () {
            var state = JSON.parse(localStorage.getItem('radio_' + this.id));
            if (state) this.checked = state.checked;
            var radioValue = $("input[name='radio']:checked").attr("id");
            inputTypeDisplay(radioValue);
        });
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
        inputTypeDisplay(radioValue);
    });


    // ***********************************************************************  view
    // ******* control D3 checkboxes       *****************************************
    // *****************************************************************************

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

    // Single Page navigation
    $('.single-page-nav').singlePageNav({
        offset: $('.single-page-nav').outerHeight(),
        filter: ':not(.external)',
        updateHash: true,
        beforeStart: function () {},
        onComplete: function () {}
    });

    // auto scroll
    $("#heroSection")[0].click();

    // ***********************************************************************  view
    // ******* modal boxes *********************************************************
    // *****************************************************************************

    $('#invertModal .button-submit').on('click', function (e) {
        e.preventDefault();
        var inputValue = $("#invertModal input").val();
        if (inputValue === false || inputValue === "") {
            return false;
        }
        // todo - change to list of available factors and remove max and min from index.html
        if (inputValue > 8 || inputValue < 1) {
            return false;
        } else {
            var currentRotationTable = JSON.parse(localStorage.getItem("rotFacStateArray"));
            factorInvertFunction(inputValue, currentRotationTable);
            $('#invertModal').toggleClass('active');
            $('.successModal').toggleClass('active');
            setTimeout(function () {
                $('.successModal').toggleClass('active');
            }, 2000);
        }
    });

    $('#splitModal .button-submit').on('click', function (e) {
        e.preventDefault();
        var inputValue = $("#splitModal input").val();
        if (inputValue === false || inputValue === "") {
            return false;
        }
        // todo - change to list of available factors and remove max and min from index.html
        if (inputValue > 8 || inputValue < 1) {
            return false;
        } else {
            factorSplitFunction(inputValue);
            $('#splitModal').toggleClass('active');
            $('.successModal').toggleClass('active');
            setTimeout(function () {
                $('.successModal').toggleClass('active');
            }, 2000);
        }
    });

    // cancel and close button across all modal windows
    $('.button-cancel').on('click', function (e) {
        e.preventDefault();
        $(this).closest("div.modal").toggleClass('active');
    });



    // display the first div by default.
    $("#accordion div").first().css('display', 'block');


    // Get all the links.
    var link = $("#accordion a");

    // On clicking of the links do something.
    link.on('click', function (e) {

        e.preventDefault();

        var a = $(this).attr("href");

        $(a).slideDown('fast');

        //$(a).slideToggle('fast');
        $("#accordion div").not(a).slideUp('fast');

    });


});

/****************************************************************  view control
 ********* Pull variables helper functions ************************************
 ******************************************************************************/

function pullStatementsIntoAnalysis(statementTextareaId) {

    var statementInput1 = document.getElementById(statementTextareaId).value;

    var statementInput = statementInput1.trim();
    var arr = statementInput.split(/\r\n|\r|\n/g);

    var cleanStatements = [];

    $.each(arr, function () {
        var temp1 = sanitizeUserInputText(this);
        cleanStatements.push($.trim(temp1));
    });
    return cleanStatements;
}

function pullProjectNameIntoAnalysis(projectNameInputId) {
    var dataSetName = document.getElementById(projectNameInputId).value;
    return dataSetName;
}

// ***********************************************************************  view
// ******* show / hide input methods   *****************************************
// *****************************************************************************

function inputTypeDisplay(inputType) {
    switch (inputType) {
    case "radio4":
        $("#manualInputContainer").hide(300);
        $("#databaseSelectDiv").hide(300);
        $("#rawSorts").hide(300);
        $("#pasteExcelDataDiv").show(300);
        $(".analysisDataDiv").show(300);
        break;
    case "radio3":
        $("#manualInputContainer").hide(300);
        $("#databaseSelectDiv").hide(300);
        $("#pasteExcelDataDiv").hide(300);
        $("#rawSorts").show(300);
        $(".analysisDataDiv").hide(300);
        break;
    case "radio2":
        $("#databaseSelectDiv").hide(300);
        $("#rawSorts").hide(300);
        $("#pasteExcelDataDiv").hide(300);
        $("#manualInputContainer").show(300);
        $(".analysisDataDiv").show(300);
        break;
    default:
        $("#manualInputContainer").hide(300);
        $("#rawSorts").hide(300);
        $("#pasteExcelDataDiv").hide(300);
        $("#databaseSelectDiv").show(300);
    }
}