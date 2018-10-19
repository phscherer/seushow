import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { Container } from 'native-base';
import ListsItem from '../components/listsItem';
import * as firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash';
import axios from 'axios';
import { API_KEY } from '../actionTypes/app';
import DefaultHeaderBack from '../components/defaultHeaderBack';

export default class UserListsDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      showsId: [],
      shows: [],
    };
    this.routeParams = props.navigation.state.params;
  }

  componentWillMount() {
    let user = firebase.auth().currentUser;
    let emailBase64 = b64.encode(user.email);
    let userValues = [], listShows = [];;
    const { currentList, typeShow } = this.routeParams;
    firebase.database()
      .ref(`/users/${emailBase64}/${currentList}/`)
      .on('value', snapshot => {
        userValues = _.values(snapshot.val());
      });
    if (typeShow === 'serie') {
      userValues.map((id) => {
        let show = _.values(id);
        axios.get(`https://api.themoviedb.org/3/tv/${show[0].showId}?api_key=${API_KEY}&language=pt-BR`)
          .then((response) => {
            listShows.push(response.data);
            this.setState({ shows: [...listShows] });
          })
          .catch(() => console.log('Error getting list data!'));
      });
    }
    if (typeShow === 'filme') {
      userValues.map((id) => {
        let show = _.values(id);
        axios.get(`https://api.themoviedb.org/3/movie/${show[0].showId}?api_key=${API_KEY}&language=pt-BR`)
          .then((response) => {
            listShows.push(response.data);
            this.setState({ shows: [...listShows] });
          })
          .catch(() => console.log('Error getting list data!'));
      });
    }
    this.setState({ isLoading: false });
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

  normalizeCurrentList = (currentList, typeShow) => {
    if (typeShow === 'serie') {
      if (currentList === 'paraAssistir') {
        return 'Para assistir';
      }
      if (currentList === 'ativas') {
        return 'Séries ativas';
      }
      if (currentList === 'finalizadas') {
        return 'Finalizadas';
      }
      if (currentList === 'favoritos') {
        return 'Favoritas';
      }
    }
    if (typeShow === 'filme') {
      if (currentList === 'paraAssistir') {
        return 'Para assistir';
      }
      if (currentList === 'filmesAssistidos') {
        return 'Finalizados';
      }
      if (currentList === 'favoritos') {
        return 'Favoritos';
      }
    }
  }

  render() {
    const { shows, isLoading } = this.state;
    const { currentList, typeShow } = this.routeParams;
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
          title={this.normalizeCurrentList(currentList, typeShow)}
          pageName={'UserLists'}
          backSearchPage={'UserListsDetails'}
        />
        <View
          containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}
        >
          {
            shows.length === 0 &&
            <Text>Não há shows nessa lista.</Text>
          }
          {
            shows.length > 0 &&
            <FlatList
              data={shows}
              keyExtractor={show => `show-${show.id}`}
              ItemSeparatorComponent={this.renderSeparator}
              renderItem={(show) => <ListsItem tvShow={show} backPage={'UserLists'} />}
            />
          }
        </View>
      </Container>
    );
  }
}