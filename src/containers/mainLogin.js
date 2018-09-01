import React, { Component } from 'react';
import { StyleSheet, Platform, Image, Text, View } from 'react-native';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class MainLogin extends Component {
  state = { currentUser: null };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <View>
        <Text>
          Bem-vindo { currentUser && currentUser.email}!
        </Text>
      </View>
    );
  }
}
