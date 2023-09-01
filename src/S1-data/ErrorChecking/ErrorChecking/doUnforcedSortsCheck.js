const doUnforcedSortsCheck = (
  mainDataObject,
  qSortPattern,
  respondentNames
) => {
  let qSortPatternValueCheck2 = [...qSortPattern];
  let projectArray = qSortPatternValueCheck2.sort().join(",");
  let nonSymmetricSortsArray = [];

  mainDataObject.forEach((element, i) => {
    let rawSort = [...element.rawSort];
    let testVal = rawSort.sort().join(",");
    if (projectArray !== testVal) {
      nonSymmetricSortsArray.push(respondentNames[i]);
    }
  });
  return nonSymmetricSortsArray;
};

export default doUnforcedSortsCheck;

/*

  // *** FINAL CHECK - are there unforced sorts?
  rawSortsArray.forEach((element, i) => {
    let testArray2 = [...element];
    let testArrayString = testArray2.sort().join(",");
    if (testArrayString !== qSortPatternValueCheck) {
      nonSymmetricSortsArray.push(respondentNames[i]);
    }
  });

  console.log("nonSymmetricSortsArray", nonSymmetricSortsArray);
  if (nonSymmetricSortsArray.length > 0) {
    console.log("called");
    S1DataSlice.setState({ unforcedSorts: nonSymmetricSortsArray });
  }

  */
