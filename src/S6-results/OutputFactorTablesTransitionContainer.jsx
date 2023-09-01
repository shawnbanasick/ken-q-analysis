import React from "react";
import FactorCorrelationsTable from "./Factor Info/FactorCorrelationsTable";
import FactorCharacteristicsTable from "./Factor Info/FactorCharacteristicsTable";
import StandardErrorsDifferencesTable from "./Factor Info/StandardErrorsDifferencesTable";
import "./OutputFactorTablesTransitionContainer.css";
import S6DataSlice from "../State/S6DataSlice";

const OutputFactorTablesTranstionContainer = () => {
  let showFactorCorrelationsTable =
    S6DataSlice.getState().showFactorCorrelationsTable;
  if (showFactorCorrelationsTable === true) {
    return (
      <div className="section">
        <div className="outputFactorTables">
          <span className="outputFactorTablesSpan3">
            Correlations between Factor Scores
          </span>
          <FactorCorrelationsTable />
        </div>
        <div className="outputFactorTables">
          <span className="outputFactorTablesSpan3">
            Factor Characteristics
          </span>
          <FactorCharacteristicsTable />
        </div>
        <div className="outputFactorTables">
          <span className="outputFactorTablesSpan3">
            Standard Errors for Differences in Factor Z-scores
          </span>
          <span className="outputFactorTablesSpan2">
            (Diagonal Entries Are S.E. Within Factors)
          </span>
          <StandardErrorsDifferencesTable />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default OutputFactorTablesTranstionContainer;
