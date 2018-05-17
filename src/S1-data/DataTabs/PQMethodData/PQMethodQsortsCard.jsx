import React from "react";
import { Card, Image } from "semantic-ui-react";
import SortsDropzone from "../../UploadFile/Dropzones/DropzonePqmSorts";
import pqmethodQsortsImage from "../../../images/lipsetDataImage1.png";

const styles = {
    width: 250,
    height: 175,
    margin: 10
};

const PQMethodStatementCard = () => (
    <Card style={ { margin: 10 } }>
      <Card.Content>
        <Card.Header>
          <Image style={ styles } src={ pqmethodQsortsImage } />
        </Card.Header>
        <Card.Meta>
          <span className="date" />
        </Card.Meta>
        <Card.Description>
          <SortsDropzone />
        </Card.Description>
      </Card.Content>
      <Card.Content extra />
    </Card>
);

export default PQMethodStatementCard;

