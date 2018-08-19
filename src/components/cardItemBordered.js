import React, { Component } from 'react';
import { Text, Container, Header, Content, Card, CardItem, Body } from 'native-base';

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
                  {this.props.description === '' ? 'Sem informações.' : this.props.description}
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