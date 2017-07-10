//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.


// JSlint declarations
/* global window, $, _ */

// QAV is the global state data store
(function (QAV, undefined) {
    'use strict';
    // check if platform is up-to-date 

    // set default language
    QAV.language = "en-us";

    QAV.setState = function (key, value) {
        var value2 = _.cloneDeep(value);
        QAV[key] = value2;
    };

    QAV.getState = function (key) {
        var value = _.cloneDeep(QAV[key]);
        return value;
    };

    // set defaults for composite factor visualizations
    QAV.vizConfig = {};
    QAV.vizConfig.consensusCustomColor = "#D6D6D6";
    QAV.vizConfig.matchCountCustomColor = "#D6D6D6";
    QAV.vizConfig.overlapCustomColor = "#D6D6D6";
    QAV.vizConfig.shouldUseToIndicateOverlap = "crosshatch";
    QAV.vizConfig.shouldUseToIndicateConsensus = "stripe";
    QAV.vizConfig.shouldUseToIndicateMatchCaution = "stripe";
    QAV.vizConfig.shouldIndicateDistinguishing = true;
    QAV.vizConfig.shouldUseUnicode = true;
    QAV.vizConfig.shouldShowZscoreArrows = true;
    QAV.vizConfig.shouldHaveLegend = true;

    QAV.rotChartConfig = {};
    QAV.rotChartConfig.significanceColorAPrep = "aquamarine";
    QAV.rotChartConfig.significanceColorBPrep = "#ffe4b2";
    QAV.rotChartConfig.significanceColorA = "aquamarine";
    QAV.rotChartConfig.significanceColorB = "#ffe4b2";
    QAV.rotChartConfig.identifierNumber = true;

    $('#prependStateNoDiv .vizButtonYes').addClass("active");
    $('#showSignificanceSymbolsDiv .vizButtonYes').addClass("active");
    $('#useUnicodeSymbolsDiv .vizButtonYes').addClass("selected");
    $('#zscoreArrowDirectionDiv .vizButtonYes').addClass("active");
    $('#includeLegendDiv .vizButtonYes').addClass("active");

    // initial component show / hide
    $("#section4 > div.row.factorExtrafactorExtractionButtonDiv").hide();
    $("#section5 > div.row.factorsToKeepForRotationDiv").hide();
    $("#selectFactorsForOutputButton").hide();


}(window.QAV = window.QAV || {}));