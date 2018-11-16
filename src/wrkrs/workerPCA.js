//Ken-Q Analysis
//Copyright (C) 2016 Shawn Banasick
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.

onmessage = function(workerMessageArray) {
  'use strict';

  var numberOfSorts = workerMessageArray.data[0];
  var numberOfPrincipalComps = workerMessageArray.data[1];
  var X = workerMessageArray.data[2];
  importScripts('../lib/numeric-1.2.6.min.js');


  var svd, eigens, eigenValuesSorted, getEigenCumulPercentArray;
  var eigenValuesAsPercents;
  var doEigenVecsCalcs, eigenVecs, inflectionArray, eigenValuesCumulPercentArray;



  // HELPER FUNCTIONS

  var evenRound = function(num, decimalPlaces) {
    var d = decimalPlaces || 0;
    var m = Math.pow(10, d);
    var n = +(d ? num * m : num).toFixed(8); // Avoid rounding errors
    var i = Math.floor(n),
      f = n - i;
    var e = 1e-8; // Allow for rounding errors in f
    var r = (f > 0.5 - e && f < 0.5 + e) ?
      ((i % 2 === 0) ? i : i + 1) : Math.round(n);
    return d ? r / m : r;
  };

  var inflectPrincipalComponents = function(eigenVecs, inflectionArray) {
    // check and inflect components if necessary
    for (var s = 0; s < eigenVecs[0].length; s++) {
      if (inflectionArray[s] < 0.0) {
        for (var t = 0; t < eigenVecs.length; t++) {
          eigenVecs[t][s] = -eigenVecs[t][s];
        }
      }
    }
    return eigenVecs;
  };

  var calcEigenVectors = function(numberOfSorts, numberofPrincipalComps, eigenValuesSorted, svd) {
    var inflectionArray = [];
    var temp1, critInflectionValue, temp3, temp4;
    // setup empty array
    var eigenVecs = [];
    for (var p = 0; p < numberOfSorts; p++) {
      eigenVecs.push([]);
    }
    // loop through each component
    for (var i = 0, iLen = numberofPrincipalComps; i < iLen; i++) {
      temp1 = Math.sqrt(eigenValuesSorted[i]);
      critInflectionValue = 0;

      // loop through each QSort to get loading and also calc CRIT
      for (var j = 0, jLen = svd.length; j < jLen; j++) {
        temp3 = evenRound((svd[j][i] * temp1), 8);
        eigenVecs[j][i] = temp3;
        // set up data for influection test
        temp4 = evenRound((temp3 * Math.abs(temp3)), 8);
        critInflectionValue = critInflectionValue + temp4;
      }
      inflectionArray.push(evenRound(critInflectionValue, 8));
    }
    return [eigenVecs, inflectionArray];
  };

  var calcEigenCumulPercentArray = function(eigenValuesSorted, numberOfSorts) {
    var percentNumber = 100 / numberOfSorts;
    var eigenValuesAsPercents = [];
    var eigenValuesPercent;
    var eigenValuesCumulPercentArray = [];
    var eigenValueCumulPercentAccum = 0;

    for (var k = 0, kLen = eigenValuesSorted.length; k < kLen; k++) {
      eigenValuesSorted[k] = evenRound((eigenValuesSorted[k]), 8);
      eigenValuesPercent = evenRound((eigenValuesSorted[k] * percentNumber), 0);
      eigenValuesAsPercents.push(eigenValuesPercent);
      eigenValueCumulPercentAccum = eigenValueCumulPercentAccum + eigenValuesPercent;
      eigenValuesCumulPercentArray.push(eigenValueCumulPercentAccum);
    }
    return [eigenValuesAsPercents, eigenValuesCumulPercentArray];
  };

  var sortEigenValues = function(values) {
    // sort eigenValues from numeric
    // eigenValuesSorted = eigens.lambda.x;
    values.sort(function(a, b) {
      return (b - a);
    });
    return values;
  };

  var calcSvd = function(X) {
    // svd = matrix of all principle components as column vectors
    var m, sigma, svd;
    m = X.length;
    sigma = numeric.div(numeric.dot(numeric.transpose(X), X), m);
    svd = numeric.svd(sigma).U;
    jlog("svd", svd);
    return svd;
  };

  var calcEigens = function(X) {
    // eigens = eigenvalues for data X
    var eigens = numeric.eig(X);
    return eigens;
  };

  // svd = matrix of all principle components as column vectors
  svd = calcSvd(X);

  // eigens = eigenvalues for data X
  eigens = calcEigens(X);

  // sort eigenValues from numeric
  eigenValuesSorted = sortEigenValues(eigens.lambda.x);

  // convert to percents and push to array
  getEigenCumulPercentArray = calcEigenCumulPercentArray(eigenValuesSorted, numberOfSorts);

  eigenValuesAsPercents = getEigenCumulPercentArray[0];
  eigenValuesCumulPercentArray = getEigenCumulPercentArray[1];

  // variable reassign to fix weird error - "numberOfPrincipalComps is undefined"
  var numFactors = numberOfPrincipalComps;
  doEigenVecsCalcs = calcEigenVectors(numberOfSorts, numFactors, eigenValuesSorted, svd);

  eigenVecs = doEigenVecsCalcs[0];
  inflectionArray = doEigenVecsCalcs[1];

  eigenVecs = inflectPrincipalComponents(eigenVecs, inflectionArray);

  var returnData = [eigenVecs, eigenValuesSorted, eigenValuesAsPercents, eigenValuesCumulPercentArray];

  postMessage(returnData);

};
