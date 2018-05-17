import React, { Component } from "react";
import { easyComp } from "react-easy-state";
// import store from "../../store";

class StatementList extends Component {
    render() {
        return (
            <ol>
              { this.props.statements.map(function(listValue, index) {
                    return <li key={ index }>
                             { listValue }
                           </li>;
                }) }
            </ol>
            );
    }
}

export default easyComp(StatementList);
