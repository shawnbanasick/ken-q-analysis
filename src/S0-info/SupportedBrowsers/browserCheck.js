import "./BrowserCheck.css";
import store from "../../store";
import React, { Component } from "react";
import Platform from "react-platform-js";

class BrowserCheck extends Component {
  render() {
    const version = Platform.BrowserVersion;
    // console.log("version " + JSON.stringify(version));

    let shortVersion = Number.parseInt(version.slice(0, 2), 10);
    console.log("short version " + JSON.stringify(shortVersion));

    // const opSystem = Platform.OS;
    // console.log("opsystem " + JSON.stringify(opSystem));

    // const userAgent = Platform.UA;
    // console.log("useragent " + JSON.stringify(userAgent));

    let browser = Platform.Browser;
    console.log("browser " + JSON.stringify(browser));
    store.setState({
      browser: browser
    });

    // testing
    // browser = "Edge";
    // shortVersion = 44;
    // check chrome
    if (browser === "Chrome") {
      if (+shortVersion < 53) {
        return (
          <div className="shouldUpdate">
            <p>
              Your browser:
              {" " + browser + " " + shortVersion}
              <br />Please update your browser before using Ken-Q Analysis
            </p>
          </div>
        );
      } else {
        return (
          <div className="goodToGo">
            <p>
              Your browser:
              {" " + browser + " " + shortVersion}
              <br />Ready for analysis
            </p>
          </div>
        );
      }
    }
    // check firefox
    if (browser === "Firefox") {
      if (+shortVersion < 58) {
        return (
          <div className="shouldUpdate">
            <p>
              Your browser:
              {" " + browser + " " + shortVersion}
              <br />Please update your browser before using Ken-Q Analysis
            </p>
          </div>
        );
      } else {
        return (
          <div className="goodToGo">
            <p>
              Your browser:
              {" " + browser + " " + shortVersion}
              <br />Ready for analysis
            </p>
          </div>
        );
      }
    }
    // check chromium
    if (browser === "Chromium") {
      if (+shortVersion < 53) {
        return (
          <div className="shouldUpdate">
            <p>
              Your browser:
              {" " + browser + " " + shortVersion}
              <br />Please update your browser before using Ken-Q Analysis
            </p>
          </div>
        );
      } else {
        return (
          <div className="goodToGo">
            <p>
              Your browser:
              {" " + browser + " " + shortVersion}
              <br />Ready for analysis
            </p>
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
          <br />Please use one of the supported browsers.
        </p>
      </div>
    );
  }
}

export default BrowserCheck;
