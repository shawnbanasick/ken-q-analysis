import React, { Component } from "react";
import { easyComp } from "react-easy-state";

class SortsList extends Component {
    render() {
        return (
            <ol>
              { this.props.sortsDisplayText.map(function(listValue, index) {
                    return (
                        <li style={ { width: 1150, wordWrap: "break-word" } } key={ index }>
                          { listValue }
                        </li>
                        );
                }) }
            </ol>
            );
    }
}

export default easyComp(SortsList);
