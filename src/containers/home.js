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
        <DefaultHeader titlePage={'Seu Show'} backSearchPage={'Home'} />
        <Tabs initialPage={0} tabBarUnderlineStyle={{ borderBottomWidth:2 }}>
          <Tab
            heading="Filmes"
            tabStyle={{ backgroundColor: '#e26761' }}
            activeTabStyle={{ backgroundColor: '#e26761' }}
            textStyle={{ color: 'white' }}
            activeTextStyle={{ color: 'white', fontWeight: 'normal' }}
          >
            <MoviesList />
          </Tab>
          <Tab
            heading="Séries"
            tabStyle={{ backgroundColor: '#e26761' }}
            activeTabStyle={{ backgroundColor: '#e26761' }}
            textStyle={{ color: 'white' }}
            activeTextStyle={{ color: 'white', fontWeight: 'normal' }}
          >
            <SeriesList />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Home;