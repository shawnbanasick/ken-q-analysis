import UserNumberInput from "./UserNumberInput";
import ColorSelector from "./ColorSelector2";
import UserSelectionSwitch from "./UserSelectionSwitch";
import S6DataSlice from "../../State/S6DataSlice";

const DistinguishingPanel = () => {
  const {
    showDistinguishingAs,
    factorVizOptionsHolder,
    setShowDistinguishingAs,
    setFactorVizOptionsHolder,
    setUpdateFactorVisualizationsButtonColor,
  } = S6DataSlice();

  function handleChange(e) {
    let value = e.target.value;
    setShowDistinguishingAs(value);
    factorVizOptionsHolder.showDistinguishingAs = value;
    setFactorVizOptionsHolder(factorVizOptionsHolder);
    setUpdateFactorVisualizationsButtonColor("bg-orange-300");
  }

  return (
    <div style={{ marginTop: 30 }}>
      <span style={{ fontSize: 22, userSelect: "none" }}>
        {"Distinguishing and Consensus Statements"}
      </span>
      <hr className="w-full mb-6 border border-gray-700" />
      <div className="flex items-center mb-[12px] pl-[10px]">
        <div className="text-base select-none">
          {`12. ${"Indicate distinguishing"}?`}
        </div>
        <UserSelectionSwitch
          name="willIndicateDistinguishing"
          value="willIndicateDistinguishing"
          toggle
        />
        <div>
          <form className="flex flex-row justify-center">
            <p className="ml-2 mr-3">{"with"}</p>
            <label className="mr-4">
              <input
                type="radio"
                name="radioGroup1"
                value="symbol"
                checked={showDistinguishingAs === "symbol"}
                onChange={handleChange}
              />{" "}
              Symbol
            </label>
            <label className="mr-2">
              <input
                type="radio"
                name="radioGroup1"
                value="distinguishingColor"
                checked={showDistinguishingAs === "distinguishingColor"}
                onChange={handleChange}
              />{" "}
              Color - 05:
            </label>
          </form>
        </div>
        <ColorSelector
          id="distinguishingIndicator05"
          style={{ marginLeft: 5 }}
          defaultColor={"#ededed"}
        />
        <div className="text-base select-none ml-[5px] mr-[5px]">01:</div>
        <ColorSelector
          id="distinguishingIndicator01"
          style={{ marginLeft: 5 }}
          defaultColor={"#bdbdbd"}
        />
      </div>
      <div className="flex items-center mb-[12px] pl-[10px]">
        <div className="text-base select-none pl-[10px]">
          {`-- ${"Adjust distinguishing statement indicator size"}?`}
        </div>
        <UserSelectionSwitch
          name="willAdjustDistIndicatorSize"
          value="willAdjustDistIndicatorSize"
          toggle={false}
        />
        <div>
          <UserNumberInput
            name={"willAdjustDistIndicatorSizeBy"}
            lowerLimit={1}
            upperLimit={200}
            value={12}
            step={0.5}
          />
        </div>
      </div>
      <div className="flex items-center mb-[12px] pl-[10px]">
        <div className="text-base select-none pl-[10px]">
          {`-- ${"Display distinguishing statement comparison triangles"}?`}
        </div>
        <UserSelectionSwitch
          name="willDisplayDistingCompareSymbols"
          value="willDisplayDistingCompareSymbols"
          toggle
        />
      </div>
      <div className="flex items-center mb-[12px] pl-[10px]">
        <div className="text-base select-none">
          {`13. ${"Display consensus statement indicator color"}?`}
        </div>
        <UserSelectionSwitch
          name="willDisplayConsensusStates"
          value="willDisplayConsensusStates"
          toggle={false}
        />
        <div className="text-base select-none pl-[10px] mr-[10px]">
          {`${"Color"}: `}
        </div>
        <ColorSelector id="consensusIndicator" defaultColor={"#d9effe"} />
      </div>
    </div>
  );
};

export default DistinguishingPanel;
