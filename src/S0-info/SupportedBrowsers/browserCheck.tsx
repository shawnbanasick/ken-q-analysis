import React from "react";
import Platform from "react-platform-js";
import S1DataSlice from "../../State/S1DataSlice";

const BrowserCheck = () => {
  const version = Platform.BrowserVersion;
  // console.log("version " + JSON.stringify(version));

  let shortVersion = Number.parseInt(version.slice(0, 3), 10);
  console.log("short version " + JSON.stringify(shortVersion));

  // const opSystem = Platform.OS;
  // console.log("opsystem " + JSON.stringify(opSystem));

  // const userAgent = Platform.UA;
  // console.log("useragent " + JSON.stringify(userAgent));

  let browser = Platform.Browser;
  S1DataSlice.setState({
    browser: browser,
  });

  // testing
  // browser = "Edge";
  // shortVersion = 44;
  // check chrome
  if (browser === "Chrome") {
    if (+shortVersion < 53) {
      return (
        <div
          className="flex flex-col items-center text-4xl bg-yellow-300 
        rounded-lg p-4 border-2 border-gray-400"
        >
          <p className="mb-2">Your browser:</p>
          <p>{` ${browser} ${shortVersion}`}</p>
          <p className="mt-4">Please update your browser </p>
          <p>before using Ken-Q Analysis</p>
        </div>
      );
    } else {
      return (
        <div
          className="flex flex-col items-center text-4xl bg-green-300 
        rounded-lg p-4 border-2 border-gray-400"
        >
          <p className="mb-2">Your browser:</p>
          <p>{` ${browser} ${shortVersion}`}</p>
          <p className="mt-4">Ready for analysis</p>
        </div>
      );
    }
  }
  // check firefox
  if (browser === "Firefox") {
    if (+shortVersion < 98) {
      return (
        <div
          className="flex flex-col items-center text-4xl bg-yellow-300 
      rounded-lg p-4 border-2 border-gray-400"
        >
          <p className="mb-2">Your browser:</p>
          <p>{` ${browser} ${shortVersion}`}</p>
          <p className="mt-4">Please update your browser </p>
          <p>before using Ken-Q Analysis</p>
        </div>
      );
    } else {
      return (
        <div
          className="flex flex-col items-center text-4xl bg-green-300 
        rounded-lg p-4 border-2 border-gray-400"
        >
          <p className="mb-2">Your browser:</p>
          <p>{` ${browser} ${shortVersion}`}</p>
          <p className="mt-4">Ready for analysis</p>
        </div>
      );
    }
  }
  // check chromium
  if (browser === "Chromium") {
    if (+shortVersion < 53) {
      return (
        <div
          className="flex flex-col items-center text-4xl bg-yellow-300 
        rounded-lg p-4 border-2 border-gray-400"
        >
          <p className="mb-2">Your browser:</p>
          <p>{` ${browser} ${shortVersion}`}</p>
          <p className="mt-4">Please update your browser </p>
          <p>before using Ken-Q Analysis</p>
        </div>
      );
    } else {
      return (
        <div
          className="flex flex-col items-center text-4xl bg-green-300 
        rounded-lg p-4 border-2 border-gray-400"
        >
          <p className="mb-2">Your browser:</p>
          <p>{` ${browser} ${shortVersion}`}</p>
          <p className="mt-4">Ready for analysis</p>
        </div>
      );
    }
  }
  // check safari
  // if (browser === "Safari") {
  //   if (+shortVersion < 11) {
  //     return (
  //       <div className="shouldUpdate">
  //         <p>
  //           Your browser:
  //           {" " + browser + " " + shortVersion}
  //           <br />Please update your browser before using Ken-Q Analysis
  //         </p>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="goodToGo">
  //         <p>
  //           Your browser:
  //           {" " + browser + " " + shortVersion}
  //           <br />Ready for analysis
  //         </p>
  //       </div>
  //     );
  //   }
  // }
  // check edge
  // if (browser === "Edge") {
  //   if (+shortVersion < 16) {
  //     return (
  //       <div className="shouldUpdate">
  //         <p>
  //           Your browser:
  //           {" " + browser + " " + shortVersion}
  //           <br />Please update your browser before using Ken-Q Analysis
  //         </p>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="goodToGo">
  //         <p>
  //           Your browser:
  //           {" " + browser + " " + shortVersion}
  //           <br />Ready for analysis
  //         </p>
  //       </div>
  //     );
  //   }
  // }
  // unsupported browsers
  return (
    <div className="shouldUpdate">
      <p>
        You seem to be using
        {" " + browser + " " + shortVersion}
        <br />
        Please use one of the supported browsers.
      </p>
    </div>
  );
};

export default BrowserCheck;
