import React from "react";
import { Card, Image } from "semantic-ui-react";
import StatementDropzone from "../../UploadFile/Dropzones/DropzonePqmStatements";
import pqmethodStatementsImage from "../../../images/pqmethodStatementsImage.png";

const styles = {
  width: 250,
  height: 175,
  margin: 10
};

const PQMethodStatementCard = () => (
  <Card style={{ margin: 10 }}>
    <Card.Content>
      <Card.Header>
        <Image style={styles} src={pqmethodStatementsImage} />
      </Card.Header>
      <Card.Meta>
        <span className="date" />
      </Card.Meta>
      <Card.Description>
        <StatementDropzone />
      </Card.Description>
    </Card.Content>
    <Card.Content extra />
  </Card>
);

export default PQMethodStatementCard;
