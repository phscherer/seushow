import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Container } from 'native-base';
import axios from 'axios';
import { API_KEY } from '../actionTypes/app';
import SeasonsItem from '../components/seasonsItem'
import DefaultHeaderBack from '../components/defaultHeaderBack';

class Seasons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seasons: [],
      isLoading: true
    };
    this.routeParams = props.navigation.state.params;
  }

  componentWillMount() {
    axios.get(`https://api.themoviedb.org/3/tv/${this.routeParams.showId}?api_key=${API_KEY}&language=pt-BR`)
      .then((response) => {
        this.setState({ seasons: response.data.seasons, isLoading: false });
      }).catch(() => console.log('Erro ao obter as temporadas do seriado!'));
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
    const { seasons, isLoading } = this.state;
    if (isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="#800020" />
        </View>
      );
    }
    return (
      <Container>
        <DefaultHeaderBack
          title={'Temporadas'}
          pageName={this.routeParams.backPage}
          backSearchPage={'Seasons'}
        />
        <View containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          {
            seasons.length === 0 &&
            <Text>Esse seriado ainda não possui temporadas.</Text>
          }
          {
            seasons.length > 0 &&
            <FlatList
              data={seasons}
              keyExtractor={season => `season-${season.id}`}
              ItemSeparatorComponent={this.renderSeparator}
              renderItem={(season) => <SeasonsItem seasonDetail={season} showId={this.routeParams.showId} /> }
            />
          }
        </View>
      </Container>
    );
  }
}

export default Seasons;