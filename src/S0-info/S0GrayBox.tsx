import React from "react";
import S0Header from "./S0Header";
import SupportedBrowsers from "./SupportedBrowsers/SupportedBrowsers";
import OtherTools from "./OtherTools/OtherTools";
import ReferenceManualText from "./IntroText/ReferenceManualText";
import Citation from "./OtherTools/Citation";

const S0GrayBox = () => {
  return (
    <div className="flex flex-col items-center text-2xl bg-blue-100 rounded-md p-6">
      <S0Header />
      <SupportedBrowsers />
      <ReferenceManualText />
      <Citation />
      <OtherTools />
    </div>
  );
};

export default S0GrayBox;
