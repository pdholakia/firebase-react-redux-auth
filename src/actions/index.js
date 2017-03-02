import request from 'superagent';
import { browserHistory } from 'react-router';
import firebase from 'firebase';

export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';

var config = {
    apiKey: "AIzaSyB0JH2ZPeDkN4qSLeyfa3t5zM5pGM0PFQk",
    authDomain: "clubm-c7bd3.firebaseapp.com",
    databaseURL: "https://clubm-c7bd3.firebaseio.com",
    storageBucket: "clubm-c7bd3.appspot.com",
    messagingSenderId: "959362795721"
};

firebase.initializeApp(config);

export function authOut() {
  return {
    type: SIGN_OUT_USER
  }
}

export function authUser() {
  return {
    type: AUTH_USER
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}