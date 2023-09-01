import React from "react";
import SortsHeader from "../DataDisplay/SortsHeader";
import SortsList from "./SortsList";
// import StartAnalysisModalButton from "../StartAnalysisModalButton";
import generateDisplaySortMaps from "../Downloads/DataBook/generateDisplaySortMaps";
import S1DataSlice from "../../State/S1DataSlice";

const qSortsContainer = () => {
  const {
    qSortPattern,
    respondentNames,
    mainDataObject,
    statementNumArray,
    multiplierArray,
    hasImportedSorts,
    hasImportedStatements,
  } = S1DataSlice();

  //   console.log(multiplierArray);

  let sortMapsArray = generateDisplaySortMaps(
    qSortPattern,
    mainDataObject,
    statementNumArray,
    multiplierArray
  );

  if (hasImportedSorts && hasImportedStatements) {
    return (
      <div className="mt-8 text-center w-full">
        <SortsHeader />
        <div className="text-left">
          <SortsList
            sortsDisplayText={sortMapsArray}
            respondentNames={respondentNames}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default qSortsContainer;
