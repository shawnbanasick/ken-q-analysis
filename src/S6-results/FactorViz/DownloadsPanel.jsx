import React from "react";
import UserTextInput from "./UserTextInput";
import UserSelectionSwitch from "./UserSelectionSwitch";
import CustomFileNameLocation from "./CustomFileNameLocation";

const DistinguishingPanel = () => {
  return (
    <div style={{ marginTop: 30 }}>
      <span style={{ fontSize: 22, userSelect: "none" }}>{"Downloads"}</span>
      <hr style={{ width: "100%", marginBottom: 15 }} />
      <div className="flex items-center mb-[25px] pl-[10px]">
        <div className="text-base select-none">
          {`15. ${"Add custom name to visualization downloads"}?`}
        </div>
        <UserSelectionSwitch
          name="willAddCustomNameToDownload"
          value="willAddCustomNameToDownload"
          toggle={false}
        />
      </div>
      <div>
        <UserTextInput
          name={"customDownloadFileNames"}
          label="names"
          placeholder={"Input custom file name"}
          width={800}
        />
      </div>
      <CustomFileNameLocation />
    </div>
  );
};

export default DistinguishingPanel;
