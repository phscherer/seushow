import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, Form, Title, Button, Item, Text, Input, Icon, Body, Left } from 'native-base';
import * as firebase from 'firebase';
import b64 from 'base-64';

const InputItem = props => (
  <Item>
    <Input {...props} />
  </Item>
);

export default class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    errorMessage: null
  };

  handleSignUp = () => {
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ errorMessage: 'As senhas não conferem!' });
    } else if (this.state.name === '') {
      this.setState({ errorMessage: 'O nome deve ser preenchido!' });
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((user) => {
          let emailBase64 = b64.encode(this.state.email);
          firebase.database()
            .ref(`/users/${emailBase64}/`)
            .push({
              nome: this.state.name,
              episodiosAssistidos: 0,
              quantidadeShows: 0
            })
            .then(() => this.props.navigation.navigate('Login'))
            .catch(error => this.setState({ errorMessage: error.message }));
        })
        .catch(error => this.setState({ errorMessage: error.message }));
    }
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#AB3737' }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate('Login')}>
              <Icon type='EvilIcons' name='arrow-left' />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: 'white' }}>Cadastro</Title>
          </Body>
        </Header>
        <Content style={{ backgroundColor: 'white' }} padder>
          <View>
            <Form>
              { this.state.errorMessage &&
                <Text style={{ color: 'red' }}>
                  { this.state.errorMessage }
                </Text>
              }
              <InputItem
                placeholder="Nome"
                onChangeText={name => this.setState({ name, errorMessage: null })}
                value={this.state.name}
              />
              <InputItem
                placeholder="Email"
                onChangeText={email => this.setState({ email, errorMessage: null })}
                value={this.state.email}
              />
              <InputItem
                secureTextEntry
                placeholder="Senha"
                onChangeText={password => this.setState({ password, errorMessage: null })}
                value={this.state.password}
              />
              <InputItem
                secureTextEntry
                placeholder="Confirme sua senha"
                onChangeText={confirmPassword => this.setState({ confirmPassword, errorMessage: null })}
                value={this.state.confirmPassword}
              />
              <View style={{ marginTop: 20 }}>
                <Button block dark onPress={this.handleSignUp}>
                  <Text>Cadastrar</Text>
                </Button>
              </View>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}
