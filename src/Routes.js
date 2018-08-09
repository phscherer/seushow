import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import MoviesList from './components/moviesList';

export default props => (
  <Router>
    <Stack key="root">
      <Scene key='moviesList' component={MoviesList} title="MoviesList" />
    </Stack>
  </Router>
);
