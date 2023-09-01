import React from "react";
import UserNumberInput from "./UserNumberInput";
import UserSelectionSwitch from "./UserSelectionSwitch";

const StatementsSettingsPanel = () => {
  return (
    <div className="mt-[30px]">
      <p className="text-xl select-none">{"Statements"}</p>
      <hr className="w-full mb-6 border border-gray-700" />
      <div className="flex items-center mb-[12px] pl-[10px]">
        <div className="text-base select-none">
          {`7. ${"Adjust line spacing"}?`}
        </div>
        <UserSelectionSwitch
          name="willAdjustLineSpacing"
          value="willAdjustLineSpacing"
          toggle={false}
        />
        <div className="w-[150px]">
          <UserNumberInput
            name={"willAdjustLineSpacingBy"}
            step="0.1"
            lowerLimit={0.1}
            upperLimit={10.0}
            value={1.4}
          />
        </div>
      </div>
      <div className="flex items-center mb-[12px] pl-[10px]">
        <div className="text-base select-none">
          {`8. ${"Adjust top margin"}?`}
        </div>
        <UserSelectionSwitch
          name="willAdjustTopMargin"
          value="willAdjustTopMargin"
          toggle={false}
        />
        <div className="w-[150px]">
          <UserNumberInput
            name={"willAdjustTopMarginBy"}
            lowerLimit={5}
            upperLimit={80}
            value={15}
          />
        </div>
      </div>
      <div className="flex items-center mb-[12px] pl-[10px]">
        <div className="text-base select-none">
          {`9. ${"Limit number of lines to prevent overflow"}?`}
        </div>
        <UserSelectionSwitch
          name="willTrimStatement"
          value="willTrimStatement"
          toggle
        />
        <div className="text-base select-none">{`${"max num lines"} =  `}</div>
        <div className="w-[150px]">
          <UserNumberInput
            name={"willTrimStatementBy"}
            lowerLimit={1}
            upperLimit={20}
            value={5}
          />
        </div>
      </div>
      <div className="flex items-center mb-[12px] pl-[10px]">
        <div className="text-base select-none">
          {`10. ${"Adjust statement width"}?`}
        </div>
        <UserSelectionSwitch
          name="willAdjustStatementWidth"
          value="willAdjustStatementWidth"
          toggle={false}
        />
        <div className="w-[150px]">
          <UserNumberInput
            name={"willAdjustStatementWidthBy"}
            lowerLimit={5}
            upperLimit={200}
            value={15}
          />
        </div>
      </div>
      <div className="flex items-center mb-[12px] pl-[10px]">
        <div className="text-base select-none">
          {`11. (${"Asian languages only"}) ${"Adjust width of statement rows"}?`}
        </div>
        <UserSelectionSwitch
          name="willAdjustWidthAsian"
          value="willAdjustWidthAsian"
          toggle={false}
        />
        <div className="w-[150px]">
          <UserNumberInput
            name={"willAdjustWidthAsianBy"}
            lowerLimit={1}
            upperLimit={200}
            value={12}
          />
        </div>
      </div>
    </div>
  );
};

export default StatementsSettingsPanel;
