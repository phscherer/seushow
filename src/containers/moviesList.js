import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'native-base';
import axios from 'axios';
import { API_KEY, IMAGE_PATH } from '../actionTypes/app';
import { DISCOVER_PATH } from '../actionTypes/movies';

class MoviesList extends Component {
  constructor(props) {
    super(props);

    this.state = { movies: [] };
  }

  componentWillMount() {
    axios.get(`${DISCOVER_PATH}movie?sort_by=popularity.desc&api_key=${API_KEY}&language=pt_BR`)
      .then((response) => { this.setState({ movies: response.data }); })
      .catch(() => console.log('Error!'));
  }

  render() {
    const { movies } = this.state;
    return (
      <View>
        { console.log(movies) }
      </View>
    );
  }
}

export default MoviesList;