import React, { Component } from "react";
import EasyHtmlButton from "./EasyHTML";
import KenQDataButton from "./KenQDataButton";

class OtherTools extends Component {
  render() {
    return (
      <div style={{ marginTop: 100, maxWidth: 1170, marginBottom: 100 }}>
        <span>
          <strong>Other Q Methodology Tools:</strong>
        </span>
        <div className="flex-container">
          <div style={{ maxWidth: 200 }}>
            <EasyHtmlButton />
            <p style={{ fontSize: 18, fontWeight: "normal" }}>
              A fork of HTMLQ that uses Google Firebase as the backend server
            </p>
          </div>
          <div style={{ maxWidth: 200, marginLeft: 75 }}>
            <KenQDataButton />
            <p style={{ fontSize: 18, fontWeight: "normal" }}>
              A web app for participant Q-sort data input and visualization
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default OtherTools;
