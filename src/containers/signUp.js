import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, Form, Title, Button, Item, Text, Input } from 'native-base';
import * as firebase from 'firebase';

const InputItem = props => (
  <Item>
    <Input {...props} />
  </Item>
);

export default class SignUp extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    errorMessage: null
  };

  handleSignUp = () => {
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ errorMessage: 'As senhas não conferem!' })
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.props.navigation.navigate('Home'))
        .catch(error => this.setState({ errorMessage: error.message }));
    }
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#AB3737' }}>
          <Title style={{ color: 'white', alignSelf: 'center' }}>Cadastro</Title>
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
              <View style={{ marginTop: 10 }}>
                <Button block dark onPress={this.handleSignUp}>
                  <Text>Cadastrar</Text>
                </Button>
              </View>
              <View style={{ marginTop: 10 }}>
                <Button block dark onPress={() => this.props.navigation.navigate('Login')}>
                  <Text>Já tem uma conta? Logue-se</Text>
                </Button>
              </View>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}
