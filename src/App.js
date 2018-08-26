import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import MoviesList from './containers/moviesList';
import MoviesDetails from './containers/moviesDetails';

export default createStackNavigator(
  {
    MoviesList: {
      screen: MoviesList,
      header: null,
    },
    MoviesDetails: {
      screen: MoviesDetails,
    },
  },
  {
    initialRouteName: 'MoviesList',
    navigationOptions: {
      header: null,
    },
  },
);