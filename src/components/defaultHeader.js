import React from 'react';
import { View, Header, Icon, Button, Title, Body, Right, Left } from 'native-base';
import { withNavigation } from 'react-navigation';

const DefaultHeader = ({ titlePage, backSearchPage, navigation }) => {
  return (
    <Header hasTabs style={{ backgroundColor: '#AB3737' }}>
      <Left style={{ flex: 1 }}>
        <Button transparent onPress={() => navigation.navigate('Profile')}>
          <Icon type='EvilIcons' name='user' />
        </Button>
      </Left>
      <Body style={{ flex: 1 }}>
        <Title>{ titlePage }</Title>
      </Body>
      <Right style={{ flex: 1 }}>
        <Button transparent onPress={() => navigation.navigate('Search', { backSearchPage })}>
          <Icon type='EvilIcons' name='search' />
        </Button>
      </Right>
    </Header>
  );
}

export default withNavigation(DefaultHeader);