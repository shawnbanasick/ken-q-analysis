import React from "react";

const StatementList = (props) => {
  return (
    <ol className="list-decimal">
      {props.statements.map(function (listValue, index) {
        return <li key={index}>{listValue}</li>;
      })}
    </ol>
  );
};

export default StatementList;
