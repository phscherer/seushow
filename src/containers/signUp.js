import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  },
});

export default class SignUp extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: null
  };

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({ errorMessage: error.message }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Cadastre-se</Text>
        { this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            { this.state.errorMessage }
          </Text>
        }
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          placeholder="Senha"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Cadastrar" onPress={this.handleSignUp} />
        <Button
          title="Já tem uma conta? Logue-se"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    );
  }
}
