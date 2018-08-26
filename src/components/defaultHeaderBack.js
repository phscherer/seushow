import React from 'react';
import { Header, Icon, Button, Title, Body, Left } from 'native-base';
import { withNavigation } from 'react-navigation';

const DefaultHeaderBack = ({ title, pageName, navigation }) => {
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
    </Header>
  );
}
  
export default withNavigation(DefaultHeaderBack);