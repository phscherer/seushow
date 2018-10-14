import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Container } from 'native-base';
import axios from 'axios';
import _ from 'lodash';
import { API_KEY, IMAGE_PATH } from '../actionTypes/app';
import DefaultHeaderBack from '../components/defaultHeaderBack';

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 0,
    margin: 1,
  }
});

export default class Episodes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      episodes: [],
      touchableIcons: [],
    };
    this.routeParams = props.navigation.state.params;
  }

  componentWillMount() {
    const seasonNumber = this.routeParams.seasonItem.item.season_number;
    const showId = this.routeParams.showId;
    axios.get(`https://api.themoviedb.org/3/tv/${showId}/season/${seasonNumber}?api_key=${API_KEY}&language=pt-BR`)
      .then((response) => {
        this.setState({ episodes: response.data, isLoading: false });
      }).catch(() => console.log(`Erro ao obter os episódios da temporada ${this.routeParams.seasonItem.season_number}!`));
  }

  toggleIcon = (itemIndex) => {
    if (this.state.touchableIcons.includes(itemIndex)) {
      _.pull(this.state.touchableIcons, itemIndex);
    } else {
      this.state.touchableIcons.push(itemIndex);
    }
    this.setState({ touchableIcons: [ ...this.state.touchableIcons ] });
  }

  render() {
    const {
      episodes,
      isLoading,
      touchableIcons
    } = this.state;
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
          title={'Episódios'}
          pageName={'Seasons'}
          backSearchPage={'Episodes'}
        />
        <View containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <ScrollView>
            {
              episodes.episodes.map((episode, i) => (
                <ListItem
                  roundAvatar
                  key={i}
                  title={`${episode.episode_number} - ${episode.name}`}
                  subtitle={episode.overview}
                  avatar={{ uri: `${IMAGE_PATH}${episode.still_path}` }}
                  containerStyle={styles.item}
                  rightIcon={{
                    name: 'check-circle',
                    color: touchableIcons.includes(i) ? 'green' : 'gray'
                  }}
                  onPress={() => this.toggleIcon(i)}
                />
              ))
            }
          </ScrollView>
        </View>
      </Container>
    );
  }
}
