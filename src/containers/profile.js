import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native';
import { Container, Button, Icon } from 'native-base';
import * as firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash';
import DefaultHeaderBack from '../components/defaultHeaderBack';
import { cardButton } from '../styles/index';

const userAvatar = require('../../images/avatar.png');
const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
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
    borderColor: 'gray',
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
    backgroundColor: '#DCDCDC',
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

const stylesButton = StyleSheet.create(cardButton);

export default class Profile extends Component {
  state = {
    nome: '',
    episodiosAssistidos: 0,
    quantidadeShows: 0,
    isLoading: true,
  };

  componentDidMount() {
    let user = firebase.auth().currentUser;
    let emailBase64 = b64.encode(user.email);
    firebase.database()
      .ref(`/users/${emailBase64}/`)
      .on('value', snapshot => {
        const userValues = _.values(snapshot.val());
        episodios = snapshot.val().episodiosAssistidos !== undefined
          ? snapshot.val().episodiosAssistidos : 0;
        qtdeShows = snapshot.val().quantidadeShows !== undefined
          ? snapshot.val().quantidadeShows : 0;
        this.setState({
          nome: userValues[0].nome,
          episodiosAssistidos: episodios,
          quantidadeShows: qtdeShows,
          isLoading: false,
        });
      });
  }

  render() {
    const {
      nome,
      episodiosAssistidos,
      quantidadeShows,
      isLoading
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
        <DefaultHeaderBack title={'Meu Perfil'} pageName={'Home'} backSearchPage={'Profile'} />
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Image style={styles.avatar} source={userAvatar} />
              <Text style={styles.name}>{nome}</Text>
              <Text style={styles.userInfo}>Episódios assistidos: {episodiosAssistidos}</Text>
              <Text style={styles.userInfo}>Filmes na lista: {quantidadeShows}</Text>
            </View>
          </View>
          <View style={styles.body}>
            <View style={stylesButton.buttonView}>
              <Button
                danger
                style={stylesButton.button}
                onPress={() => this.props.navigation.navigate('UserLists')}
              >
                <Icon
                  name='ios-list-box'
                  style={stylesButton.buttonIcon}
                />
                <Text style={{ fontSize: 14, color: 'white' }}>Listas</Text>
              </Button>
              <Button danger style={stylesButton.button}>
                <Icon
                  name='ios-contacts'
                  style={stylesButton.buttonIcon}
                />
                <Text style={{ fontSize: 14, color: 'white' }}>Amigos</Text>
              </Button>
            </View>
          </View>
        </View>
      </Container>
    );
  }
}