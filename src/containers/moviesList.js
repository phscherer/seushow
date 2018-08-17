import React, { Component } from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import { Text, Button } from 'native-base';
import { List, ListItem, SearchBar } from 'react-native-elements';
import axios from 'axios';
import { API_KEY, IMAGE_PATH } from '../actionTypes/app';
import { DISCOVER_PATH } from '../actionTypes/movies';

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 0,
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
    const { movies } = this.state;
    return (
      <List
        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
      >
        <FlatList
          data={movies.results}
          keyExtractor={movie => movie.id}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={(movie) => {
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
      </List>
    );
  }
}

export default MoviesList;