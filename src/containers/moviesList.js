import React, { Component } from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import { Text, Button } from 'native-base';
import { ListItem } from 'react-native-elements';
import axios from 'axios';
import { API_KEY, IMAGE_PATH } from '../actionTypes/app';
import { DISCOVER_PATH } from '../actionTypes/movies';

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#ffffff",
    margin: 1,
  },
  itemEmpty: {
    backgroundColor: "transparent"
  },
  text: {
    color: "#333333"
  }
});

class MoviesList extends Component {
  constructor(props) {
    super(props);

    this.state = { movies: [] };
  }

  componentWillMount() {
    axios.get(`${DISCOVER_PATH}movie?sort_by=popularity.desc&api_key=${API_KEY}&language=pt-BR`)
      .then((response) => { this.setState({ movies: response.data }); })
      .catch(() => console.log('Error!'));
  }

  render() {
    const { movies } = this.state;
    const columns = 1;
    return (
      <SafeAreaView>
        <FlatList
          data={movies.results}
          numColumns={columns}
          keyExtractor={movie => movie.id}
          renderItem={(movie) => {
            if (movie.empty) {
              return <View style={[styles.item, styles.itemEmpty]} />;
            }
            const uriImagePath = `${IMAGE_PATH}${movie.item.poster_path}`;
            return (
              <ListItem
                roundAvatar
                title={movie.item.title}
                subtitle={movie.item.overview}
                avatar={{ uri: uriImagePath }}
                containerStyle={styles.item}
              />
            );
          }}
        />
      </SafeAreaView>
    );
  }
}

export default MoviesList;