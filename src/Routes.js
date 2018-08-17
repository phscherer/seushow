import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import MoviesList from './containers/moviesList';
import { StackNavigator } from 'react-navigation';

/*const MoviesNavigator = StackNavigator({
  MoviesListPage: {
    screen: MoviesList,
    navigationOptions: {
      visible: false,
      header: null,
      gesturesEnabled: false,
    }
  }
});

export const AppNavigator = StackNavigator({
  MoviePage: { screen: MoviesNavigator },
});

export default { AppNavigator };*/

export default props => (
  <Router>
    <Stack key="root">
      <Scene key='moviesList' component={MoviesList} title="Em alta" />
    </Stack>
  </Router>
);
