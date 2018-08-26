import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import {  Container, Tabs, Tab } from 'native-base';
import axios from 'axios';
import { API_KEY } from '../actionTypes/app';
import { DISCOVER_PATH } from '../actionTypes/movies';
import MovieItem from '../components/moviesItem';
import DefaultHeader from '../components/defaultHeader';

class MoviesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      isLoading: true,
    };
  }

  componentWillMount() {
    axios.get(`${DISCOVER_PATH}movie?sort_by=popularity.desc&api_key=${API_KEY}&language=pt-BR`)
      .then((response) => { this.setState({ movies: response.data, isLoading: false }); })
      .catch(() => console.log('Error!'));
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
    const { movies, isLoading } = this.state;
    if (isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="#800020" />
        </View>
      );
    }
    return (
      <Container>
        <DefaultHeader titlePage={'Em alta'} />
        <View
          containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
        >
          <FlatList
            data={movies.results}
            keyExtractor={movie => `movie-${movie.id}`}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={(movie) => <MovieItem movie={movie} /> }
          />
        </View>
      </Container>
    );
  }
}

export default MoviesList;