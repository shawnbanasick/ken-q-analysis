import React, { Component } from "react";

class BetaLinkText extends Component {
  render() {
    return (
      <div className="bg-gray-300 w-[1200px] rounded-lg m-8 w-10/12 py-5">
        <div className="text-center">
          <span>
            <strong>Change Log</strong>
          </span>
          <div className="text-left p-4">
            v 1.0.7 - fixed bug in CSV Q-sort file data import. Version 1.0.6
            gave incorrect correlation values for the last participant in the
            data set when importing CSV data.
          </div>
        </div>
      </div>
    );
  }
}

export default BetaLinkText;
