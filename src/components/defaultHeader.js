import React, { Component } from 'react';
import { Header, Icon, Button, Title, Body, Right, Left } from 'native-base';

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Header hasTabs style={{ backgroundColor: '#AB3737' }}>
        <Left style={{ flex: 1 }}>
          <Button transparent>
            <Icon type='EvilIcons' name='user' />
          </Button>
        </Left>
        <Body style={{ flex: 1 }}>
          <Title>{this.props.titlePage}</Title>
        </Body>
        <Right style={{ flex: 1 }}>
          <Button transparent>
            <Icon type='EvilIcons' name='search' />
          </Button>
        </Right>
      </Header>
    );
  }
}

export default DefaultHeader;