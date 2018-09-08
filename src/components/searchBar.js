import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import { Container, Header, Icon, Button, Title, Body, Left, Right } from 'native-base';
import _ from 'lodash';
import DefaultHeaderBack from './defaultHeaderBack';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.routeParams = props.navigation.state.params;
  }

  handleSearch = _.debounce((text) => {
      //const { jwt } = this.props;
      //this.props.productsActions.search(jwt, text);
    },
    500,
  )

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#AB3737' }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate(this.routeParams.backSearchPage)}>
              <Icon type='EvilIcons' name='arrow-left' />
            </Button>
          </Left>
          <Body>
            <Title>Descubra</Title>
          </Body>
        </Header>
        <SearchBar
          showLoading
          inputStyle={{ backgroundColor: 'white' }}
          containerStyle={{ backgroundColor: 'white', borderWidth: 1 }}
          cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
          
          placeholder='Busque por séries, filmes, animes...'
        />
      </Container>
    );
  }
}