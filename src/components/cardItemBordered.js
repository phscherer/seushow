import React, { Component } from 'react';
import { Text, Container, Content, Card, CardItem, Body } from 'native-base';
import _ from 'lodash';

class CardItemBordered extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Card style={{ borderColor: '#AB3737' }}>
            <CardItem header bordered>
              <Text style={{ color: '#AB3737' }}>Sobre</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  {this.props.description === '' ? 'Sem informações.' : _.slice(this.props.description, 0, 700)}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default CardItemBordered;