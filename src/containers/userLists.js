import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Container } from 'native-base';
import DefaultHeaderBack from '../components/defaultHeaderBack';

export default class UserLists extends Component {
  render() {
    return (
      <Container>
        <DefaultHeaderBack title={'Minhas Listas'} pageName={'Profile'} backSearchPage={'UserLists'} />
      </Container>
    );
  }
}
