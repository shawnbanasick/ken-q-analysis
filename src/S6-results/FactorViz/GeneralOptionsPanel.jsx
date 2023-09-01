import React from "react";
import UserSelectionSwitch from "./UserSelectionSwitch";

const GeneralOptionsPanel = () => {
  return (
    <React.Fragment>
      <span className="text-xl select-none">{"General"}</span>
      <hr className="w-full mb-6 border border-gray-700" />
      <div className="flex items-center mb-[12px] pl-[10px]">
        <div className="text-base select-none">
          {`1. ${"Include legend with visualization"}?`}
        </div>
        <UserSelectionSwitch
          name="willIncludeLegend"
          value="willIncludeLegend"
          toggle={true}
        />
      </div>
      <div className="flex items-center mb-[12px] pl-[10px]">
        <div className="text-base select-none">
          {`2. ${"Prepend statement numbers"}?`}
        </div>
        <UserSelectionSwitch
          name="willPrependStateNums"
          value="willPrependStateNums"
          toggle={false}
        />
      </div>

      <div className="flex items-center mb-[12px] pl-[10px]">
        <div className="text-base select-none">
          {`3. ${"Display only statement numbers"}?`}
        </div>
        <UserSelectionSwitch
          name="willDisplayOnlyStateNums"
          value="willDisplayOnlyStateNums"
          toggle={false}
        />
      </div>
    </React.Fragment>
  );
};

export default GeneralOptionsPanel;

/*
<div className="flex items-center mb-[12px] pl-[10px]">
  <div className="text-base select-none">
    {`4. ${"Add custom names to factor visualizations"}?`}
  </div>
  <UserSelectionSwitch
    name="willAddCustomNames"
    value="willAddCustomNames"
    toggle={false}
  />
</div>
<div style={{ marginTop: 10 }}>
  <UserTextInput
    name={"customFactorNames"}
    label="names"
    placeholder={"Input custom factor names separated by commas"}
    width="w-[700px]"
    left="ml-[28px]"
  />
</div>

const OptionStatementRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding-left: 10px;
`;

const OptionStatementText = styled.div`
  user-select: none;
  font-size: 16px;
`;
*/
