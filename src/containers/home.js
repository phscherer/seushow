import React, { Component } from 'react';
import { Container, Tabs, Tab, Text } from 'native-base';

import DefaultHeader from '../components/defaultHeader';
import MoviesList from './moviesList';
import SeriesList from './seriesList';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <DefaultHeader titlePage={'Seu Show'} />
        <Tabs initialPage={0}>
          <Tab heading="Filmes">
            <MoviesList />
          </Tab>
          <Tab heading="Séries">
            <SeriesList />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Home;