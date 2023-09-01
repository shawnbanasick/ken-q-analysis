import React, { Component } from "react";
import Section2HelpButton from "./Section2HelpButton";

class S2Header extends Component {
  render() {
    return (
      <div className="m-8 w-10/12">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <p className="text-6xl my-4">2. Correlations</p>
          </div>
          <Section2HelpButton />
        </div>
      </div>
    );
  }
}

export default S2Header;
