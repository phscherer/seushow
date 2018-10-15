import React from 'react';
import { Header, Icon, Button, Title, Body, Left, Right } from 'native-base';
import { withNavigation } from 'react-navigation';

const DefaultHeaderBack = ({ title, pageName, backSearchPage, navigation }) => {
  return (
    <Header style={{ backgroundColor: '#AB3737' }}>
      <Left>
        <Button transparent onPress={() => navigation.navigate(pageName)}>
          <Icon type='EvilIcons' name='arrow-left' />
        </Button>
      </Left>
      <Body>
        <Title>{ title }</Title>
      </Body>
      <Right style={{ flex: 1 }}>
        <Button transparent onPress={() => navigation.navigate('Search', { backSearchPage })}>
          <Icon type='EvilIcons' name='search' />
        </Button>
        <Button transparent onPress={() => navigation.navigate('Home')}>
          <Icon type='EvilIcons' name='share-apple' />
        </Button>
      </Right>
    </Header>
  );
}
  
export default withNavigation(DefaultHeaderBack);