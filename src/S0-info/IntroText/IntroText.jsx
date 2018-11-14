import React, { Component } from "react";

const styles = {
  marginTop: 50,
  marginBottom: 50,
  width: 1200
};

class IntroText extends Component {
  render() {
    return (
      <div style={ styles }>
        <span>
                Ken-Q Analysis brings the interactivity and convenience of the web to
                Q-methodology. It is a desktop web application, so after the page has
                loaded there is no further communication with the server. All matrix
                calculations, factor rotations, and file downloads are processed in
                your browser.{ " " }
                <strong>Your data never leave your web browser. </strong>
                Therefore, the speed of the matrix calculations, table updates, and
                image displays will depend on the processing power of your computer.
                Analyzing smaller datasets will likely be quick and responsive, but
                when working with large datasets you may experience some delays.
              </span>
      </div>
      );
  }
}

export default IntroText;
