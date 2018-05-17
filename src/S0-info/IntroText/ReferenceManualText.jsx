import React, { Component } from "react";
import ReferenceManualDownloadButton from "../OtherTools/ReferenceManualDownloadButton";

const styles = {
  marginBottom: 20,
  width: 250,
  marginLeft: 340,
  textAlign: "center"
};

class ReferenceManualText extends Component {
  render() {
    return (
      <div style={{ marginTop: 70 }}>
        <span>
          <strong>Reference Manual / Help File / FAQ:</strong>
        </span>
        <div style={styles}>
          <ReferenceManualDownloadButton />
          <p style={{ fontSize: 18, fontWeight: "normal" }}>
            The Reference Manual is web-based, but it can also be downloaded as
            a PDF, EPUB, or MOBI file.
          </p>
        </div>
      </div>
    );
  }
}

export default ReferenceManualText;
