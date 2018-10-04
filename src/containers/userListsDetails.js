import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import ShowsItem from '../components/showsItem';
import * as firebase from 'firebase';

export default class UserListsDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      shows: [],
    };
    this.routeParams = props.navigation.state.params;
  }

  componentWillMount() {
    const currentList = this.routeParams.currentList;
    firebase.database()
      .ref(`/users/${emailBase64}/${currentList}/`)
      .on('value', snapshot => {
        const userValues = _.values(snapshot.val());
        this.setState({
          isLoading: false
        });
      });
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
          renderItem={(show) => <ShowsItem tvShow={show} /> }
        />
      </View>
    );
  }
}