import React from "react";
import StatementsHeader from "./StatementsHeader";
import StatementList from "./StatementList";
import S1DataSlice from "../../State/S1DataSlice";

const StatementsContainer = () => {
  const { statements } = S1DataSlice();

  // let statements = store.getState("statements");

  return (
    <div className="mt-8 w-full text-center transition-opacity duration-700 ease-in opacity-100">
      <StatementsHeader />
      <div className="flex flex-col  items-center p-4">
        <div className="text-left">
          <StatementList statements={statements} />
        </div>
      </div>
    </div>
  );
};

export default StatementsContainer;
