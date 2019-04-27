import React, { Component } from "react";
import KadeButton from "../OtherTools/KadeButton";

const styles = {
  marginBottom: 20,
  width: 250,
  marginLeft: 340,
  textAlign: "center"
};

class BetaLinkText extends Component {
  render() {
    return (
      <div
        style={{
          marginTop: 70,
          backgroundColor: "lightgray",
          maxWidth: 1000
        }}
      >
        <span style={{ fontSize: 28, marginLeft: 20 }}>
          <strong>KADE (Ken-Q Analysis Desktop Edition)</strong>
        </span>
        <div style={styles}>
          <KadeButton />
          <p style={{ fontSize: 18, fontWeight: "normal" }}>
            A desktop version that runs on Windows, macOS, and Linux.
          </p>
        </div>
      </div>
    );
  }
}

export default BetaLinkText;
