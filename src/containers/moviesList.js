import React, { Component } from 'react';
import { View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { List } from 'react-native-elements';
import axios from 'axios';
import { API_KEY, IMAGE_PATH } from '../actionTypes/app';
import { DISCOVER_PATH } from '../actionTypes/movies';
import MovieItem from '../components/moviesItem';

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
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <View
        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
      >
        <FlatList
          data={movies.results}
          keyExtractor={movie => movie.id}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={(movie) => <MovieItem movie={movie} /> }
        />
      </View>
    );
  }
}

export default MoviesList;