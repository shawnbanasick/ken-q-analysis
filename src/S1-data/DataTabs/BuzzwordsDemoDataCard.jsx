import React from "react";
import BuzzwordsButton from "../DemoData/BuzzwordsButton";
import { Card, Icon } from "semantic-ui-react";

const BuzzwordsDemoDataCard = () => (
    <Card style={ { margin: 10 } }>
      <Card.Content>
        <Card.Header>Corporate Buzzwords</Card.Header>
        <Card.Meta>
          <span className="date">50 statements</span>
        </Card.Meta>
        <Card.Description>
          <Icon name="user" /> 60 Participants
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <BuzzwordsButton />
      </Card.Content>
    </Card>
);

export default BuzzwordsDemoDataCard;
