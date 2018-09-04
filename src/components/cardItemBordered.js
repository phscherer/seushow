import React, { Component } from 'react';
import { Text, Container, Content, Card, CardItem, Body, Button, Icon } from 'native-base';
import { StyleSheet, View } from 'react-native';
import _ from 'lodash';
import { cardButton } from '../styles/index';

const styles = StyleSheet.create(cardButton);

class CardItemBordered extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={{ flex: 1 }}>
        <Content padder style={{ flex: 1 }}>
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
          <View style={styles.buttonView}>
            <Button success style={styles.button}>
              <Icon
                name='ios-add-circle'
                style={styles.buttonIcon}
              />
            </Button>
            <Button danger style={styles.button}>
              <Icon
                name='md-trash'
                style={styles.buttonIcon}
              />
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default CardItemBordered;