import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Container, Header, Content, Form, Title, Button, Item, Text, Input, Icon } from 'native-base';
import * as firebase from 'firebase';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import { SocialIcon } from 'react-native-elements';
import b64 from 'base-64';

const seuShowLogo = require('../../images/seushow-logotipo.png');

const InputItem = props => (
  <Item>
    <Input {...props} />
  </Item>
);

const styles = StyleSheet.create({
  avatar: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  headerContent: {
    padding: 10,
    alignItems: 'center',
  },
});

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: null
  };

  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({ errorMessage: error.message }));
  }

  handleFacebookLogin = () => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then((result) => {
      if (result.isCancelled) {
        alert('Login cancelado!');
      } else {
        AccessToken.getCurrentAccessToken().then((accessTokenData) => {
          const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken);
          firebase.auth().signInWithCredential(credential)
          .then((user) => {
            let emailBase64 = b64.encode(user.email);
            firebase.database()
              .ref(`/users/${emailBase64}/`)
              .on('value', snapshot => {
                if (snapshot.val() !== null) {
                  this.props.navigation.navigate('Home');
                } else {
                  firebase.database()
                    .ref(`/users/${emailBase64}/`)
                    .push({
                      nome: user.displayName
                    })
                    .then(() => this.props.navigation.navigate('Home'))
                    .catch(error => this.setState({ errorMessage: error.message }));
                }
              });
          }).catch(error => alert('Erro na autenticação! ', error));
        });
      }
    }).catch(error => alert('Erro! ', error));
  }

  render() {
    return (
      <Container>
        <Content style={{ backgroundColor: 'white' }} padder>
          <Form>
            <View style={styles.headerContent}>
              <Image style={styles.avatar} source={seuShowLogo} />
            </View>
            <View>
              { this.state.errorMessage &&
                <Text style={{ color: 'red' }}>
                  {this.state.errorMessage}
                </Text>
              }
              <InputItem
                placeholder="Email"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
              <InputItem
                secureTextEntry
                placeholder="Senha"
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
              <View style={{ marginTop: 10 }}>
                <Button transparent block dark onPress={() => this.props.navigation.navigate('SignUp')}>
                  <Icon name='ios-create' />
                  <Text>
                    Não tem uma conta? Cadastre-se
                  </Text>
                </Button>
              </View>
              <View style={{ marginTop: 50 }}>
                <Button block dark onPress={this.handleLogin}>
                  <Text>Acessar</Text>
                </Button>
              </View>
              <View style={{ marginTop: 10 }}>
                <SocialIcon
                  title='Acessar com Facebook'
                  button
                  type='facebook'
                  onPress={this.handleFacebookLogin}
                />
              </View>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}