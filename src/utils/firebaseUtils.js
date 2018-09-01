import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyC1ouPRZdU1iQ92-niTBXm9A9lluTL8djY",
  authDomain: "seu-show.firebaseapp.com",
  databaseURL: "https://seu-show.firebaseio.com",
  projectId: "seu-show",
  storageBucket: "seu-show.appspot.com",
  messagingSenderId: "922970501074"
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();