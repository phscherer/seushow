import React, { Component } from 'react';
import {
  Container, Content, ListItem, Text,
  Separator, Icon, Left, Body, Right, Button } from 'native-base';
import DefaultHeaderBack from '../components/defaultHeaderBack';

export default class UserLists extends Component {
  goToPage = (currentList) => {
    this.props.navigation.navigate('UserListsDetails', { currentList });
  }

  render() {
    return (
      <Container>
        <DefaultHeaderBack title={'Minhas Listas'} pageName={'Profile'} backSearchPage={'UserLists'} />
        <Content>
          <Separator bordered>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Seriados e Animes</Text>
          </Separator>
          <ListItem icon button={true} onPress={() => this.goToPage('paraAssistir')}>
            <Left>
              <Button style={{ backgroundColor: "#AB3737" }}>
                <Icon active name="ios-bookmark" />
              </Button>
            </Left>
            <Body>
              <Text>Para Assistir</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon button={true} onPress={() => this.goToPage('ativas')}>
            <Left>
              <Button style={{ backgroundColor: "#AB3737" }}>
                <Icon active name="ios-calendar" />
              </Button>
            </Left>
            <Body>
              <Text>Ativas</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon button={true} onPress={() => this.goToPage('finalizadas')}>
            <Left>
              <Button style={{ backgroundColor: "#AB3737" }}>
                <Icon active name="ios-checkmark-circle" />
              </Button>
            </Left>
            <Body>
              <Text>Finalizadas</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon button={true} onPress={() => this.goToPage('favoritos')}>
            <Left>
              <Button style={{ backgroundColor: "#AB3737" }}>
                <Icon active name="ios-heart" />
              </Button>
            </Left>
            <Body>
              <Text>Favoritos</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <Separator bordered>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Filmes</Text>
          </Separator>
          <ListItem icon button={true} onPress={() => this.goToPage('paraAssistir')}>
            <Left>
              <Button style={{ backgroundColor: "#AB3737" }}>
                <Icon active name="ios-bookmark" />
              </Button>
            </Left>
            <Body>
              <Text>Para Assistir</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon button={true} onPress={() => this.goToPage('finalizadas')}>
            <Left>
              <Button style={{ backgroundColor: "#AB3737" }}>
                <Icon active name="ios-checkmark-circle" />
              </Button>
            </Left>
            <Body>
              <Text>Finalizadas</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon button={true} onPress={() => this.goToPage('favoritos')}>
            <Left>
              <Button style={{ backgroundColor: "#AB3737" }}>
                <Icon active name="ios-heart" />
              </Button>
            </Left>
            <Body>
              <Text>Favoritos</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
