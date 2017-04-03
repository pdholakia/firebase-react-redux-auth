import request from 'superagent';
import { browserHistory } from 'react-router';
import firebase from 'firebase';

export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';
export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_ERROR = 'RESET_ERROR';


var config = {
    apiKey: "AIzaSyB0JH2ZPeDkN4qSLeyfa3t5zM5pGM0PFQk",
    authDomain: "clubm-c7bd3.firebaseapp.com",
    databaseURL: "https://clubm-c7bd3.firebaseio.com",
    storageBucket: "clubm-c7bd3.appspot.com",
    messagingSenderId: "959362795721"
};

firebase.initializeApp(config);

export function signUpUser(providerName, credentials = "") {

  let provider = "";

  switch (providerName) {
    case "google":
      provider = new firebase.auth.GoogleAuthProvider();
      break;
    case "facebook":
      provider = new firebase.auth.FacebookAuthProvider();
      break;
    case "twitter":
      provider = new firebase.auth.TwitterAuthProvider();
      break;
    case "email":
      provider = new firebase.auth.EmailAuthProvider();
      break;      
  }

  return function(dispatch) {
    let authPromise = "";
    if (providerName === "email") {
      authPromise = firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password);
    } else {
      authPromise = firebase.auth().signInWithPopup(provider);
    }
    
      authPromise.then(response => {
        dispatch(authUser());
        browserHistory.push('/profile');
        console.log(response.user);
      })
      .catch(error => {
        console.log(error);
        dispatch(authError(error));
      });
  }
}

export function signInUser(providerName, credentials = "") {

  let provider = "";

  switch (providerName) {
    case "google":
      provider = new firebase.auth.GoogleAuthProvider();
      break;
    case "facebook":
      provider = new firebase.auth.FacebookAuthProvider();
      break;
    case "twitter":
      provider = new firebase.auth.TwitterAuthProvider();
      break;
    case "email":
      provider = new firebase.auth.EmailAuthProvider();
      break;      
  }

  return function(dispatch) {
    let authPromise = "";
    if (providerName === "email") {
      authPromise = firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
    } else {
      authPromise = firebase.auth().signInWithPopup(provider);
    }
    
      authPromise.then(response => {
        dispatch(authUser());
        browserHistory.push('/profile');
        console.log(response.user);
      })
      .catch(error => {
        console.log(error);
        dispatch(authError(error));
      });
  }
}

export function signOutUser()
{
  // browserHistory.push('/');
  // firebase.auth().signOut();
  return function(dispatch) {
    firebase.auth().signOut()
      .then( () => {
        // Sign-out successful.
        browserHistory.push('/');
        dispatch(authOut());
      })
      .catch(error => {
        dispatch(authError(error));
        console.log(error);
      });
  }
}

export function sendPwdResetMail(user) {

  return function(dispatch) {
    firebase.auth().sendPasswordResetEmail(user.email)
      .then(() => {
        dispatch(resetSuccess("Password reset link is sent to the given email address."));
      })
      .catch(error => {
        dispatch(resetError(error));
        console.log(error);
      });
  }

}

export function confirmPasswordReset(code, user) {

  return function(dispatch) {
    firebase.auth().confirmPasswordReset(code, user.password)
      .then(() => {
        dispatch(resetSuccess("Password reset successfully."));
      })
      .catch(error => {
        dispatch(resetError(error));
        console.log(error);
      });
  }

}

export function resetSuccess(success) {
  return {
    type: RESET_SUCCESS,
    payload: success
  }
}

export function resetSuccessMessage() {
  browserHistory.push('/login');
  return {
    type: RESET_SUCCESS,
    payload: null
  }
}

export function resetError(error) {
  return {
    type: RESET_ERROR,
    payload: error
  }
}

export function verifyAuth() {
  return function (dispatch) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(authUser());
      } else {
        dispatch(signOutUser());
      }
    });
  }
}

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