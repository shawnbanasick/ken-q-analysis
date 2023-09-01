import React from "react";
import OnGrayGeneralButton from "../../ReusableComponents/OnGrayGeneralButton";

const EasyHtmlButton = () => (
  <div className="flex flex-row justify-center w-[280px]">
    <a
      href="https://github.com/shawnbanasick/eq-web-sort"
      target="_blank"
      rel="noopener noreferrer"
    >
      <OnGrayGeneralButton id="eqWebSortLink" buttonText="EQ Web Sort" />
    </a>
  </div>
);

export default EasyHtmlButton;
