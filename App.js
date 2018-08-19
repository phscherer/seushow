import React, { Component } from 'react';
import { withAuthenticator } from 'aws-amplify-react-native';
import SeuShow from './src/App.js';

class App extends Component {
  render() {
    return (
      <SeuShow />
    );
  }
}

export default withAuthenticator(App);