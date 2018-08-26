import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import SerieItem from '../components/seriesItem';
import { API_KEY } from '../actionTypes/app';

class SeriesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shows: [],
      isLoading: true
    };
  }
  
  componentWillMount() {
    axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=pt-BR`)
      .then((response) => {
        this.setState({ shows: response.data, isLoading: false });
      }).catch(() => console.log('Error getting tv show data!'));
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
    const { shows, isLoading } = this.state;
    if (isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" color="#800020" />
        </View>
      );
    }
    return (
      <View
        containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
      >
        <FlatList
          data={shows.results}
          keyExtractor={show => `show-${show.id}`}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={(show) => <SerieItem tvShow={show} /> }
        />
      </View>
    );
  }
}

export default SeriesList;