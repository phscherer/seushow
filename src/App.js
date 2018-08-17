import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import MoviesList from './containers/moviesList';


export default createStackNavigator(
  {
    MoviesList: {
      screen: MoviesList,
    },
  },
  {
    initialRouteName: 'MoviesList',
    navigationOptions: {
      title: 'Em alta',
      headerStyle: {
        backgroundColor: '#D64545',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);