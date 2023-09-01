import React, { Component } from "react";

class Accordian extends Component {
  state = {
    isActive: false,
  };
  setIsActive = (status) => {
    this.setState({ isActive: status });
  };

  render() {
    return (
      <div className="accordion-item">
        <div
          className="accordion-title"
          onClick={() => this.setIsActive(!this.state.isActive)}
        >
          <div>{this.props.title}</div>
          <div>{this.state.isActive ? "-" : "+"}</div>
        </div>
        {this.state.isActive && (
          <div className="accordion-content">
            <ul>
              {this.props.content.map(function (item) {
                return <li key={item}>{item}</li>;
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Accordian;
