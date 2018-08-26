import React, { Component } from 'react';
import { Container, Tabs, Tab, Text } from 'native-base';

import DefaultHeader from '../components/defaultHeader';
import MoviesList from './moviesList';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <DefaultHeader titlePage={'Seu Show'} />
        <Tabs initialPage={0}>
          <Tab heading="Em alta">
            <MoviesList />
          </Tab>
          <Tab heading="Séries">
            <Text>work in progress</Text>
          </Tab>
          <Tab heading="Filmes">
            <Text>work in progress</Text>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Home;