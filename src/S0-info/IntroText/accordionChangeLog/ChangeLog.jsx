import React, { Component } from "react";
import Accordion from "./Accordion";
import { accordionData } from "./accordionData";
import "./accordionStyles.css";

class BetaLinkText extends Component {
  render() {
    return (
      <div style={{ maxWidth: 850 }}>
        <div>
          <div className="accordion">
            {accordionData.map(({ title, content }) => (
              <Accordion key={title} title={title} content={content} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default BetaLinkText;

/*
<div style={styles}>
            v 1.0.7 - fixed bug in CSV Q-sort file data import. Version 1.0.6
            gave incorrect correlation values for the last participant in the
            data set when importing CSV data.
          </div>

*/
