const workerCorr = function() {
    console.log("worker function called");

    /*
    const threads = require('threads');
    // const config = threads.config;
    const spawn = threads.spawn;

    // config.set({
    //   basepath: {
    //     web: '../../wrkrs'
    //   }
    // });

    const thread = spawn(function(input, done) {
        console.log('input from worker: ' + JSON.stringify(input));

        // Everything we do here will be run in parallel in another execution context.
        // Remember that this function will be executed in the thread's context,
        // so you cannot reference any value of the surrounding code.
        done({
            string: input.string,
            integer: parseInt(input.string, 10)
        });
    });

    thread
        .send({
            string: '123'
        })
        // The handlers come here: (none of them is mandatory)
        .on('message', function(response) {
            console.log('123 * 2 = ', response.integer * 2);
            thread.kill();
        })
        .on('error', function(error) {
            console.error('Worker errored:', error);
        })
        .on('exit', function() {
            console.log('Worker has been terminated.');
        });

*/


    const threads = require('threads');
    const spawn = threads.spawn;
    const thread = spawn(function() {});

    thread
        .run(function minmax(int, done) {
            if (typeof this.min === 'undefined') {
                this.min = int;
                this.max = int;
            } else {
                this.min = Math.min(this.min, int);
                this.max = Math.max(this.max, int);
            }
            done({
                min: this.min,
                max: this.max
            });
        })

        .on('message', function(minmax) {
            console.log(JSON.stringify(minmax));
        })
        .send(2)
        .send(3)
        .send(4)
        .send(1)
        .send(5)
        .on('done', function() {
            thread.kill();
        });










}

export default workerCorr;


/*
module.exports = function(input, done) {

    //console.log('input is : ' + JSON.stringify(input));
    done('Awesome thread script may run in the browser');

    //var rawSortsArray = workerMessageArray.data[0];

    //console.log('in worker data: ' + JSON.stringify(rawSortsArray));


    //var originalSortSize2 = workerMessageArray.data[0];
    // var sortsFromExistingData = workerMessageArray.data[1];
    //var namesFromExistingData = workerMessageArray.data[2];


    // importScripts('../wrkrs/lodash.core.js');


    /*

    // convert sorts to arrays 
    var sortsAsNumbers = convertSortsTextToNumbers(sortsFromExistingData, originalSortSize2);
    var sortsAsNumbers2 = sortsAsNumbers[0];
    var sortsToShiftPositive = sortsAsNumbers[1];

    // do the calcuations
    var createCorrelationTable2 = calculateCorrelations(sortsAsNumbers2, namesFromExistingData);
    var correlationTableArrayFormatted = createCorrelationTable2[0];
    var names = createCorrelationTable2[1];
    var correlationTableArray = createCorrelationTable2[2];

    var returnData = [sortsAsNumbers2, sortsToShiftPositive, correlationTableArrayFormatted, names, correlationTableArray];
    postMessage(returnData);
};


// helper functions
var convertSortsTextToNumbers = function (sortsTextFromDb, originalSortSize) {
    // console.time("convertNumbers");
    var sortsAsNumbers = [];
    var maxArrayValue;

    // skip conversion if data coming from somewhere other than pasted data
    if (_.isArray(sortsTextFromDb[0]) === false) {
        _(sortsTextFromDb).forEach(function (element) {
            var startPoint = 0;
            var endPoint = 2;
            var tempArray = [];
            var loopLen = originalSortSize;
            var i, numberFragment, convertedNumber;

            for (i = 0; i < loopLen; i++) {
                numberFragment = element.slice(startPoint, endPoint);
                convertedNumber = +numberFragment;
                tempArray.push(convertedNumber);
                startPoint = startPoint + 2;
                endPoint = endPoint + 2;
            }
            sortsAsNumbers.push(tempArray);
        }).value();

        // continue if not pasted text -
    } else {
        sortsAsNumbers = _.cloneDeep(sortsTextFromDb);
    }


    //  QAV.setState("sortsAsNumbers", sortsAsNumbers);


    var sortsToShiftPositive = _.cloneDeep(sortsAsNumbers);
    // shift sorts to positive range
    maxArrayValue = _.max(sortsToShiftPositive[0]);
    _(sortsToShiftPositive).forEach(function (element) {
        var j;
        var loopLen = originalSortSize;

        for (j = 0; j < loopLen; j++) {
            element[j] = element[j] + maxArrayValue + 1;
        }
    }).value();

    // QAV.setState("positiveShiftedRawSorts", sortsToShiftPositive);

    // console.timeEnd("convertNumbers");
    return [sortsAsNumbers, sortsToShiftPositive];
};

var calculateCorrelations = function (sortsAsNumbers, names) {
    // console.time("correlation calculations and table display ");

    // todo - get a proper read of the length and add missing name error testing
    var totalSorts = names.length;
    var sortsAsNumbersCloned = _.cloneDeep(sortsAsNumbers);
    var correlationTableArray = [];
    var correlationTableArrayFormatted = [];

    for (var m = 0; m < totalSorts; m++) {
        correlationTableArray[m] = [];
        correlationTableArrayFormatted[m] = [];
    }

    for (var i = 0; i < totalSorts; i++) {
        var pullX = sortsAsNumbersCloned[i];
        var correlationValue = getPqmethodCorrelation(sortsAsNumbersCloned[i], sortsAsNumbersCloned[i]);

        correlationTableArray[0][0] = correlationValue[0];
        correlationTableArrayFormatted[0][0] = correlationValue[1];

        for (var k = i; k < totalSorts; k++) {
            var correlationValue2 = getPqmethodCorrelation(pullX, sortsAsNumbersCloned[k]);

            correlationTableArray[i][k] = correlationValue2[0];
            correlationTableArrayFormatted[i][k] = correlationValue2[1];

            if (k !== i) {
                // var nextArray = k + 1;
                correlationTableArray[k][i] = correlationValue2[0];
                correlationTableArrayFormatted[k][i] = correlationValue2[1];
            }
        } // end of k loop
    } //  end of i loop

    for (var j = 0; j < totalSorts; j++) {
        var pullName = names[j];
        correlationTableArrayFormatted[j].unshift(pullName);
    }
    names.unshift("");
    correlationTableArrayFormatted.unshift(names);
    /*
        QAV.setState("correlationTableArrayFormatted", correlationTableArrayFormatted);
        QAV.setState("respondentNames", names);
        QAV.setState("originalCorrelationValues", correlationTableArray);
    */
// console.timeEnd("correlation calculations and table display ");

//return //[rawSortsArray];
// return [correlationTableArrayFormatted, names, correlationTableArray];
// };


/*
var getPqmethodCorrelation = function (x, y) {

    /**
     *  @fileoverview Pearson correlation score algorithm.
     *  @author matt.west@kojilabs.com (Matt West)
     *  @license Copyright 2013 Matt West.
     *  Licensed under MIT (http://opensource.org/licenses/MIT).
     */
/*
    var n = x.length;

    if (n === 0) {
        return 0;
    }

    var sum1 = 0;
    for (var i = 0; i < n; i++) {
        sum1 += x[i];
    }

    var sum2 = 0;
    for (var j = 0; j < n; j++) {
        sum2 += y[j];
    }

    var sum1Sq = 0;
    for (var k = 0; k < n; k++) {
        sum1Sq += Math.pow(x[k], 2);
    }

    var sum2Sq = 0;
    for (var m = 0; m < n; m++) {
        sum2Sq += Math.pow(y[m], 2);
    }

    var pSum = 0;
    for (var p = 0; p < n; p++) {
        pSum += x[p] * y[p];
    }

    var num = pSum - (sum1 * sum2 / n);
    var den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / n) *
        (sum2Sq - Math.pow(sum2, 2) / n));

    if (den === 0) {
        return 0;
    }

    var answer = num / den;

    var answer1 = [evenRound((answer), 5), evenRound((answer * 100), 0)];

    return answer1;

    
};

function evenRound(num, decimalPlaces) {
    var d = decimalPlaces || 0;
    var m = Math.pow(10, d);
    var n = +(d ? num * m : num).toFixed(8); // Avoid rounding errors
    var i = Math.floor(n),
        f = n - i;
    var e = 1e-8; // Allow for rounding errors in f
    var r = (f > 0.5 - e && f < 0.5 + e) ?
        ((i % 2 === 0) ? i : i + 1) : Math.round(n);
    return d ? r / m : r;
}
*/