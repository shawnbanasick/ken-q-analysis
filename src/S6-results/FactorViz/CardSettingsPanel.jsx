import React from "react";
import UserNumberInput from "./UserNumberInput";
import UserSelectionSwitch from "./UserSelectionSwitch";

const styles = {
  width: 150,
};

const CardSettingsPanel = () => {
  return (
    <div style={{ marginTop: 30 }}>
      <span style={{ fontSize: 22, userSelect: "none" }}>{"Cards"}</span>
      <hr className="w-full mb-6 border border-gray-700" />
      <div className="flex items-center mb-[12px] pl-[10px]">
        <div className="text-base select-none">
          {`4. ${"Adjust card height"}?`}
        </div>
        <UserSelectionSwitch
          name="willAdjustCardHeight"
          value="willAdjustCardHeight"
          toggle={false}
        />
        <div style={styles}>
          <UserNumberInput
            name={"willAdjustCardHeightBy"}
            lowerLimit={15}
            upperLimit={500}
            value={110}
          />
        </div>
      </div>
      <div className="flex items-center mb-[12px] pl-[10px]">
        <div className="text-base select-none">
          {`5. ${"Adjust card width"}?`}
        </div>
        <UserSelectionSwitch
          name="willAdjustCardWidth"
          value="willAdjustCardWidth"
          toggle={false}
        />
        <div style={styles}>
          <UserNumberInput
            name={"willAdjustCardWidthBy"}
            lowerLimit={15}
            upperLimit={500}
            value={110}
          />
        </div>
      </div>
      <div className="flex items-center mb-[12px] pl-[10px]">
        <div className="text-base select-none">
          {`6. ${"Adjust font size"}?`}
        </div>
        <UserSelectionSwitch
          name="willAdjustCardFontSize"
          value="willAdjustCardFontSize"
          toggle={false}
        />
        <div style={styles}>
          <UserNumberInput
            name={"willAdjustCardFontSizeBy"}
            lowerLimit={5}
            upperLimit={80}
            value={13}
          />
        </div>
      </div>
    </div>
  );
};

export default CardSettingsPanel;

/*
const OptionStatementRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding-left: 10px;
`;

const OptionStatementText = styled.div`
  font-size: 16px;
  user-select: none;
`;

// import styled from "styled-components";
*/
