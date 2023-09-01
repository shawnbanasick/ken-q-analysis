import React from "react";
import IntroText from "./IntroText/IntroText";
// import store from "../store";
// let showUpdateMessage = window.showUpdateMessage;

const S0Header = () => {
  // todo - update version number
  return (
    <div className="">
      <div className="flex justify-center">
        <div className="flex flex-col text-center justify-center">
          <div className=""></div>
          <p className="text-8xl my-4">Ken-Q Analysis</p>
          <p className="text-4xl my-4 pt-2">
            A Web Application for Q Methodology &nbsp;&nbsp;&nbsp; Version 2.0.0
          </p>
        </div>
        {/* <div>
            {showUpdateMessage && (
              <Button size="huge" color="orange">
                An update has been released!
                <br /> Reload the page to install.
              </Button>
            )}
          </div> */}
      </div>

      {/* <span style={styles}>version {version}</span> */}
      <IntroText />
    </div>
  );
};

export default S0Header;
