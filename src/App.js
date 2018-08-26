import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Home from './containers/home';
import MoviesList from './containers/moviesList';
import MoviesDetails from './containers/moviesDetails';
import SeriesDetails from './containers/seriesDetails';
import SeriesList from './containers/seriesList';

export default createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    MoviesList: {
      screen: MoviesList,
      header: null,
    },
    MoviesDetails: {
      screen: MoviesDetails,
    },
    SeriesList: {
      screen: SeriesList,
    },
    SeriesDetails: {
      screen: SeriesDetails,
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      header: null,
    },
  },
);