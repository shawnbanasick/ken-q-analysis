import React from "react";
import ReferenceManualDownloadButton from "../OtherTools/ReferenceManualDownloadButton";
import ChangeLog from "./accordionChangeLog/ChangeLog";

const ReferenceManualText = () => {
  return (
    <div className="flex flex-col w-[1200px] mb-8 items-center p-4 rounded-lg bg-gray-300">
      <span className="py-5 font-bold">Change Log</span>
      <ChangeLog />
      <span className="py-5 font-bold">
        Reference Manual / Help File / FAQ:
      </span>
      <ReferenceManualDownloadButton />
      <div></div>
    </div>
  );
};

export default ReferenceManualText;
