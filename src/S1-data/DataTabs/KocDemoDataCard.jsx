import React from 'react'
import KocButton from '../DemoData/kocButton';
import { Card, Icon, Image } from 'semantic-ui-react'
import kocDataImage from '../../images/kocDataImage.png'

const styles = {
    width: 250,
    height: 175,
    margin: 10
}

const KocDemoDataCard = () => (
    <Card style={ { margin: 10 } }>
      <Image style={ styles } src={ kocDataImage } />
      <Card.Content>
        <Card.Header>
          KOC Demo Data
        </Card.Header>
        <Card.Meta>
          <span className='date'>
                                                                                      36 statements
                                                                                    </span>
        </Card.Meta>
        <Card.Description>
          <Icon name='user' /> 38 Participants
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <KocButton />
      </Card.Content>
    </Card>
)

export default KocDemoDataCard;