// import "./BrowserInfo.css";
import React from "react";
import chromeImage from "./../S1-images/Google.png";
import firefoxImage from "./../S1-images/firefox.png";
import chromiumImage from "./../S1-images/Chromium.png";
// import safariImage from "./../S1-images/Safari.png";
// import edgeImage from "./../S1-images/edge.png";

const BrowserInfo = () => {
  return (
    <div className="flex items-start min-w-[1000px] mb-8 mt-8 justify-around">
      <div className="flex flex-col items-center">
        <img
          src={chromeImage}
          alt="Chrome"
          className="object-contain max-w-[100px]"
        />
        <p>Google Chrome</p>
        <p className="browserSubText">macOS, Windows</p>
        <p> version 53 or newer </p>
      </div>
      <div className="flex flex-col items-center">
        <img
          src={firefoxImage}
          alt="Firefox"
          className="object-contain max-w-[100px]"
        />
        <p>Mozilla Firefox</p>
        <p className="browserSubText">macOS, Windows, Linux</p>
        <p> version 58 or newer</p>
      </div>
      <div className="flex flex-col items-center">
        <img
          src={chromiumImage}
          alt="Chromium"
          className="object-contain max-w-[100px]"
        />
        <p>Google Chromium</p>
        <p className="browserSubText">Linux</p>
        <p>version 53 or newer</p>
      </div>

      {/* <div className="flex-item">
          <img src={safariImage} alt="Safari" />
          <p>Apple Safari</p>
          <p className="browserSubText">
            macOS
            <br /> version 11 or newer
          </p>
        </div>
        <div className="flex-item">
          <img src={edgeImage} alt="Edge" />
          <p>Microsoft Edge</p>
          <p className="browserSubText">
            Windows 10
            <br /> version 16 or newer
          </p>
        </div> */}
    </div>
  );
};

export default BrowserInfo;
