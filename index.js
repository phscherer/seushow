import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyC1ouPRZdU1iQ92-niTBXm9A9lluTL8djY",
  authDomain: "seu-show.firebaseapp.com",
  databaseURL: "https://seu-show.firebaseio.com",
  projectId: "seu-show",
  storageBucket: "seu-show.appspot.com",
  messagingSenderId: "922970501074"
});

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
