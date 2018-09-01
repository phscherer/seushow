import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, Form, Title, Button, Item, Text, Input } from 'native-base';
import * as firebase from 'firebase';

const InputItem = props => (
  <Item>
    <Input {...props} />
  </Item>
);

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

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#AB3737' }}>
          <Title style={{ color: 'black', alignSelf: 'center' }}>Login</Title>
        </Header>
        <Content style={{ backgroundColor: 'white' }} padder>
          <Form>
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
                <Button block dark onPress={this.handleLogin}>
                  <Text>Login</Text>
                </Button>
              </View>
              <View style={{ marginTop: 10 }}>
                <Button block dark onPress={() => this.props.navigation.navigate('SignUp')}>
                  <Text>Não tem uma conta? Cadastre-se</Text>
                </Button>
              </View>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}