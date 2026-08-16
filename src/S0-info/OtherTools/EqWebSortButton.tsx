import React from "react";
import OnGrayGeneralButton from "../../ReusableComponents/OnGrayGeneralButton";

const EasyHtmlButton = () => (
  <div className="flex flex-row justify-center w-[280px]">
    <a href="https://quince-config.netlify.app/" target="_blank" rel="noopener noreferrer">
      <OnGrayGeneralButton id="eqWebSortLink" buttonText="Quince" />
    </a>
  </div>
);

export default EasyHtmlButton;
