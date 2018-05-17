import React from "react";
import { Card, Image } from "semantic-ui-react";
import csvStatementsImage from "../../../images/csvSampleSortsImage.png";
import DropzoneCsvQsorts from "../../UploadFile/Dropzones/DropzoneCsvQsorts";

const styles = {
  width: 250,
  height: 175,
  margin: 10
};

const CsvStatementCard = () => (
  <Card style={{ margin: 10 }}>
    <Card.Content>
      <Card.Header>
        <Image style={styles} src={csvStatementsImage} />
      </Card.Header>
      <Card.Meta>
        <span className="date" />
      </Card.Meta>
      <Card.Description>
        <DropzoneCsvQsorts />
      </Card.Description>
    </Card.Content>
    <Card.Content extra />
  </Card>
);

export default CsvStatementCard;
