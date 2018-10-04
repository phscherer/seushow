import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Home from './containers/home';
import MoviesList from './containers/moviesList';
import ShowsDetails from './containers/showsDetails';
import SeriesList from './containers/seriesList';
import SignUp from './containers/signUp';
import Login from './containers/login';
import MainLogin from './containers/mainLogin';
import Loading from './components/loading';
import Profile from './containers/profile';
import Search from './components/searchBar';
import SearchDetails from './containers/searchDetails';
import UserLists from './containers/userLists';
import UserListsDetails from './containers/userListsDetails';

export default createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Loading: {
      screen: Loading,
    },
    SignUp: {
      screen: SignUp,
    },
    Login: {
      screen: Login,
    },
    MainLogin: {
      screen: MainLogin,
    },
    Profile: {
      screen: Profile,
    },
    MoviesList: {
      screen: MoviesList,
      header: null,
    },
    SeriesList: {
      screen: SeriesList,
    },
    ShowsDetails: {
      screen: ShowsDetails,
    },
    Search: {
      screen: Search,
    },
    SearchDetails: {
      screen: SearchDetails,
    },
    UserLists: {
      screen: UserLists,
    },
    UserListsDetails: {
      screen: UserListsDetails,
    },
  },
  {
    initialRouteName: 'Loading',
    navigationOptions: {
      header: null,
    },
  },
);