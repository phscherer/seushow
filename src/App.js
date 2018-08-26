import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import Home from './containers/home';
import MoviesList from './containers/moviesList';
import MoviesDetails from './containers/moviesDetails';

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
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      header: null,
    },
  },
);