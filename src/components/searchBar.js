import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { Container, Header, Icon, Button, Title, Body, Left, Right } from 'native-base';
import _ from 'lodash';
import axios from 'axios';
import { API_KEY, SEARCH_PATH } from '../actionTypes/app';
import SearchItem from '../components/searchItem';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.routeParams = props.navigation.state.params;
    this.state = {
      searchResults: [],
      isLoading: false,
    }
  }

  handleSearch = _.debounce((text) => {
      axios.get(`${SEARCH_PATH}api_key=${API_KEY}&language=pt-BR&page=1&include_adult=false&query=${text}`)
      .then((response) => { this.setState({ searchResults: response.data, isLoading: false }); })
      .catch(() => {
        console.log('Error searching data!');
        this.setState({ isLoading: false, searchResults: [] });
      });
    },
    500,
  )

  onSearch = (text) => {
    this.setState({ isLoading: true });
    this.handleSearch(text);
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  }

  render() {
    const { isLoading, searchResults } = this.state;
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
          onChangeText={this.onSearch}
          inputStyle={{ backgroundColor: 'white' }}
          containerStyle={{ backgroundColor: 'white', borderWidth: 1 }}
          cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
          
          placeholder='Busque por séries, filmes, animes...'
        />
        { isLoading &&
          <View style={{ flex: 1, padding: 20 }}>
            <ActivityIndicator size="large" color="#800020" />
          </View>
        }
        {
          !isLoading && searchResults.length === 0 &&
          <Text>Nenhum resultado encontrado.</Text>
        }
        {
          !isLoading &&
          <View containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={searchResults.results}
              keyExtractor={result => `search-${result.id}`}
              ItemSeparatorComponent={this.renderSeparator}
              renderItem={(result) => <SearchItem tvShow={result} /> }
            />
          </View>
        }
      </Container>
    );
  }
}