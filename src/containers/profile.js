import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Container } from 'native-base';
import * as firebase from 'firebase';
import b64 from 'base-64';
import DefaultHeaderBack from '../components/defaultHeaderBack';

const userAvatar = require('../../images/avatar.png');
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#DCDCDC',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: '#000000',
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 16,
    color: '#778899',
    fontWeight: '600',
  },
  body: {
    backgroundColor: '#778899',
    height: 500,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: '#FFFFFF',
  },
});

export default class Profile extends Component {
  render() {
    let user = firebase.auth().currentUser;
    let emailBase64 = b64.encode(user.email);
    firebase.database()
      .ref(`/users/${emailBase64}/`)
      .on('value', snapshot => {
        console.log(snapshot);
      });
    return (
      <Container>
        <DefaultHeaderBack title={'Meu Perfil'} pageName={'Home'} />
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Image style={styles.avatar} source={userAvatar} />
              <Text style={styles.name}>Paulo Scherer</Text>
              <Text style={styles.userInfo}>Episódios vistos: 3102</Text>
              <Text style={styles.userInfo}>Filmes na lista: 122</Text>
            </View>
          </View>
          <View style={styles.body}>
          </View>
        </View>
      </Container>
    );
  }
}