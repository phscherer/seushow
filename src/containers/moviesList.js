import React, { Component } from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import { Text, Button } from 'native-base';
import axios from 'axios';
import { API_KEY, IMAGE_PATH } from '../actionTypes/app';
import { DISCOVER_PATH } from '../actionTypes/movies';

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    backgroundColor: "#D3D3D3",
    flexGrow: 1,
    flexBasis: 0,
    margin: 4,
    padding: 20
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
    const columns = 2;
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
            return (
              <View style={styles.item}>
                <Text style={styles.text}>{movie.item.title}</Text>
              </View>
            );
          }}
        />
      </SafeAreaView>
    );
  }
}

export default MoviesList;