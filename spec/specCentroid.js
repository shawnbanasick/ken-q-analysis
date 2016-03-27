// JSlint declarations
/* global localStorage: false, sessionStorage: false, console: false, $: false, _: false, d3: false, Handsontable:false, document: false, describe: false, expect: false, it:false,
 */



//// Tests
//describe("getManagerName tests", function () {
//    it('returns correct value', function () {
//        var name = getManagerName();
//        expect(name).toBe('Roberto Martinez');
//    });
//});

describe("Centroid - getDataColumnTotals", function () {
    var dataArray = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
    var result = [2, 5, 8];
    var test = getDataColumnTotals(dataArray);

    it("should calc and return column sums minus one", function () {
        expect(test).toEqual(result);
    });

});

describe("Centroid - calculateColumnSums", function () {
    var sumArray = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
    var result = [2, 5, 8];
    var test = calculateColumnSums(sumArray);

    it("should calc and return column sums minus one", function () {
        expect(test).toEqual(result);
    });

});

describe("Centroid - calculateMinValueAndIndex", function () {
    var columnTotals = [2, 1, 5, 8];
    var test = calculateMinValueAndIndex(columnTotals);
    var result = [1, 1];
    it("should find the minimum value in array and return value and index value", function () {
        expect(test).toEqual(result);
    });

});

describe("Centroid - getPqmethodCorrelation", function () {
    var x = [4, 5, 3, 5, 3, 6, 5, 4, 5, 4, 6, 6, 7, 8, 4, 1, 2, 2, 4, 1, 8, 7, 8, 6, 6, 5, 9, 7, 7, 2, 3, 3, 9];
    var y = [7, 3, 3, 9, 4, 5, 1, 2, 6, 1, 2, 8, 8, 7, 5, 2, 7, 4, 6, 5, 6, 3, 5, 7, 3, 8, 6, 4, 5, 4, 4, 9, 6];
    var test = getPqmethodCorrelation(x, y);
    var result = [0.20625, 21];
    it("should calc the correlation value of two arrays for centroid calcs array", function () {
        expect(test[1]).toEqual(result[1]);
    });
    it("should calc the correlation value of two arrays for display array", function () {
        expect(test[0]).toEqual(result[0]);
    });
});

describe("Centroid - convertSortsTextToNumbers", function () {
    var originalSortSize = 33;
    var sortsTextFromDb = ["-1 0-2 0-2 1 0-1 0-1 1 1 2 3-1-4-3-3-1-4 3 2 3 1 1 0 4 2 2-3-2-2 4", "-1 0-1-3 2 3 1 1-4 0 2-1 4-1 1-3 0-2-2 0 3-2 1 0 2 1 2 3-1-4-2-3 4"];

    var test = convertSortsTextToNumbers(sortsTextFromDb, originalSortSize);

    var result = [[4, 5, 3, 5, 3, 6, 5, 4, 5, 4, 6, 6, 7, 8, 4, 1, 2, 2, 4, 1, 8, 7, 8, 6, 6, 5, 9, 7, 7, 2, 3, 3, 9], [4, 5, 4, 2, 7, 8, 6, 6, 1, 5, 7, 4, 9, 4, 6, 2, 5, 3, 3, 5, 8, 3, 6, 5, 7, 6, 7, 8, 4, 1, 3, 2, 9]];

    it("should convert array of strings to 2 dim array AND shift to positive", function () {
        expect(test).toEqual(result);
    });
});

describe("Centroid - checkPositiveManifold", function () {
    var dataArray = [[1, 0.5375, 0.20625, 0.225, 0.1, -0.225, -0.31875, 0.2375, 0.05], [0.5375, 1, -0.075, 0.0875, 0.175, -0.025, -0.1625, 0.38125, 0.06875], [0.20625, -0.075, 1, 0.4, -0.54375, 0.0875, 0.05, -0.09375, 0.1125], [0.225, 0.0875, 0.4, 1, -0.5625, 0.275, 0.16875, 0.05625, 0.025], [0.1, 0.175, -0.54375, -0.5625, 1, -0.0625, -0.13125, 0.01875, -0.03125], [-0.225, -0.025, 0.0875, 0.275, -0.0625, 1, 0.61875, -0.36875, -0.2125], [-0.31875, -0.1625, 0.05, 0.16875, -0.13125, 0.61875, 1, -0.2875, -0.03125], [0.2375, 0.38125, -0.09375, 0.05625, 0.01875, -0.36875, -0.2875, 1, -0.2125], [0.05, 0.06875, 0.1125, 0.025, -0.03125, -0.2125, -0.03125, -0.2125, 1]];

    var test = checkPositiveManifold(dataArray);

    var result = [[[1, 0.5375, -0.20625, -0.225, 0.1, 0.225, 0.31875, 0.2375, -0.05], [0.5375, 1, 0.075, -0.0875, 0.175, 0.025, 0.1625, 0.38125, -0.06875], [-0.20625, 0.075, 1, 0.4, 0.54375, 0.0875, 0.05, 0.09375, 0.1125], [-0.225, -0.0875, 0.4, 1, 0.5625, 0.275, 0.16875, -0.05625, 0.025], [0.1, 0.175, 0.54375, 0.5625, 1, 0.0625, 0.13125, 0.01875, 0.03125], [0.225, 0.025, 0.0875, 0.275, 0.0625, 1, 0.61875, 0.36875, -0.2125], [0.31875, 0.1625, 0.05, 0.16875, 0.13125, 0.61875, 1, 0.2875, -0.03125], [0.2375, 0.38125, 0.09375, -0.05625, 0.01875, 0.36875, 0.2875, 1, 0.2125], [-0.05, -0.06875, 0.1125, 0.025, 0.03125, -0.2125, -0.03125, 0.2125, 1]], [0.9375, 1.2, 1.15625, 1.0625, 1.625, 1.45, 1.70625, 1.54375, 0.01875], [4, 7, 1, 0]];

    it("should check to see if the dataArray is positive shifted", function () {
        expect(test).toEqual(result);
    });
});

describe("Centroid - calculatePositiveManifold", function () {
    var manifoldArray = [[1, 0.5375, 0.20625, 0.225, 0.1, -0.225, -0.31875, 0.2375, 0.05], [0.5375, 1, -0.075, 0.0875, 0.175, -0.025, -0.1625, 0.38125, 0.06875], [0.20625, -0.075, 1, 0.4, -0.54375, 0.0875, 0.05, -0.09375, 0.1125], [0.225, 0.0875, 0.4, 1, -0.5625, 0.275, 0.16875, 0.05625, 0.025], [0.1, 0.175, -0.54375, -0.5625, 1, -0.0625, -0.13125, 0.01875, -0.03125], [-0.225, -0.025, 0.0875, 0.275, -0.0625, 1, 0.61875, -0.36875, -0.2125], [-0.31875, -0.1625, 0.05, 0.16875, -0.13125, 0.61875, 1, -0.2875, -0.03125], [0.2375, 0.38125, -0.09375, 0.05625, 0.01875, -0.36875, -0.2875, 1, -0.2125], [0.05, 0.06875, 0.1125, 0.025, -0.03125, -0.2125, -0.03125, -0.2125, 1]];

    var minColumnSum = -1.0375;

    var test = calculatePositiveManifold(manifoldArray, minColumnSum);

    var result = [[[1, 0.5375, -0.20625, -0.225, 0.1, 0.225, 0.31875, 0.2375, -0.05], [0.5375, 1, 0.075, -0.0875, 0.175, 0.025, 0.1625, 0.38125, -0.06875], [-0.20625, 0.075, 1, 0.4, 0.54375, 0.0875, 0.05, 0.09375, 0.1125], [-0.225, -0.0875, 0.4, 1, 0.5625, 0.275, 0.16875, -0.05625, 0.025], [0.1, 0.175, 0.54375, 0.5625, 1, 0.0625, 0.13125, 0.01875, 0.03125], [0.225, 0.025, 0.0875, 0.275, 0.0625, 1, 0.61875, 0.36875, -0.2125], [0.31875, 0.1625, 0.05, 0.16875, 0.13125, 0.61875, 1, 0.2875, -0.03125], [0.2375, 0.38125, 0.09375, -0.05625, 0.01875, 0.36875, 0.2875, 1, 0.2125], [-0.05, -0.06875, 0.1125, 0.025, 0.03125, -0.2125, -0.03125, 0.2125, 1]], [0.9375, 1.2, 1.15625, 1.0625, 1.625, 1.45, 1.70625, 1.54375, 0.01875], [4, 7, 1, 0]];

    it("should shift values to positive manifold", function () {
        expect(test).toEqual(result);
    });
});


describe("Centroid - calculateCorrelations (formatted correlation matrix)", function () {
    var sortsAsNumbers = [[4, 5, 3, 5, 3, 6, 5, 4, 5, 4, 6, 6, 7, 8, 4, 1, 2, 2, 4, 1, 8, 7, 8, 6, 6, 5, 9, 7, 7, 2, 3, 3, 9], [4, 5, 4, 2, 7, 8, 6, 6, 1, 5, 7, 4, 9, 4, 6, 2, 5, 3, 3, 5, 8, 3, 6, 5, 7, 6, 7, 8, 4, 1, 3, 2, 9], [7, 3, 3, 9, 4, 5, 1, 2, 6, 1, 2, 8, 8, 7, 5, 2, 7, 4, 6, 5, 6, 3, 5, 7, 3, 8, 6, 4, 5, 4, 4, 9, 6], [8, 6, 2, 4, 4, 8, 2, 3, 5, 1, 4, 5, 8, 3, 2, 1, 4, 7, 9, 3, 9, 6, 6, 3, 5, 6, 4, 7, 5, 7, 6, 7, 5], [1, 4, 8, 4, 6, 6, 9, 7, 1, 9, 7, 5, 4, 8, 5, 7, 5, 3, 3, 5, 4, 7, 6, 2, 2, 2, 8, 5, 6, 3, 6, 3, 4], [6, 2, 5, 8, 8, 9, 3, 5, 3, 3, 6, 4, 6, 5, 1, 8, 4, 5, 6, 4, 3, 2, 4, 1, 7, 7, 5, 9, 4, 7, 6, 7, 2], [7, 5, 3, 6, 5, 6, 4, 2, 5, 4, 6, 4, 6, 7, 1, 9, 8, 7, 5, 7, 3, 4, 2, 1, 8, 3, 5, 9, 2, 6, 4, 8, 3], [3, 7, 5, 2, 1, 9, 5, 4, 4, 4, 6, 4, 6, 4, 9, 5, 5, 6, 2, 6, 7, 7, 8, 8, 2, 6, 1, 8, 5, 3, 3, 3, 7], [8, 6, 5, 6, 1, 2, 7, 7, 3, 5, 5, 3, 6, 9, 4, 3, 7, 4, 7, 6, 8, 2, 2, 3, 6, 5, 4, 1, 5, 4, 8, 4, 9]];

    var names = ["US1", "US2", "US3", "US4", "JP5", "CA6", "UK7", "US8", "FR9"];

    var test = calculateCorrelations(sortsAsNumbers, names);

    var result = [["", "US1", "US2", "US3", "US4", "JP5", "CA6", "UK7", "US8", "FR9"], ["US1", 100, 54, 21, 22, 10, -22, -32, 24, 5], ["US2", 54, 100, -8, 9, 18, -2, -16, 38, 7], ["US3", 21, -8, 100, 40, -54, 9, 5, -9, 11], ["US4", 22, 9, 40, 100, -56, 28, 17, 6, 2], ["JP5", 10, 18, -54, -56, 100, -6, -13, 2, -3], ["CA6", -22, -2, 9, 28, -6, 100, 62, -37, -21], ["UK7", -32, -16, 5, 17, -13, 62, 100, -29, -3], ["US8", 24, 38, -9, 6, 2, -37, -29, 100, -21], ["FR9", 5, 7, 11, 2, -3, -21, -3, -21, 100]];

    it("should convert 2d array of pos shift sorts to correlation table-format 2d array", function () {
        expect(test).toEqual(result);
    });
});
