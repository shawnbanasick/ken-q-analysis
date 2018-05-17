import React, { Component } from "react";
import BetaLinkButton from "../OtherTools/BetaLinkButton";

const styles = {
    marginBottom: 20,
    width: 250,
    marginLeft: 340,
    textAlign: "center"
};

class BetaLinkText extends Component {
    render() {
        return (
            <div style={ { marginTop: 70 } }>
              <span>
                                                                      <strong>Ken-Q Analysis Beta Version</strong>
                                                                    </span>
              <div style={ styles }>
                <BetaLinkButton />
                <p style={ { fontSize: 18, fontWeight: "normal" } }>
                  The beta version is available at a new address if you still need to access it.
                </p>
              </div>
            </div>
            );
    }
}

export default BetaLinkText;
