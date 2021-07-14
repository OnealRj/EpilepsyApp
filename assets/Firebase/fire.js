import * as firebase from 'firebase';
// Optionally import the services that you want to use
// import * as firebase from "firebase/app"
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// Add the Firebase products that you want to use
import "firebase/auth";

const firebaseConfig =
{
    apiKey: "AIzaSyBmrvKPukjFRKnJjnCupWnAG88XNLnqkGE",
    authDomain: "epliapp.firebaseapp.com",
    databaseURL: "https://epliapp-default-rtdb.firebaseio.com",
    projectId: "epliapp",
    storageBucket: "epliapp.appspot.com",
    messagingSenderId: "426202671280",
    appId: "1:426202671280:web:b2ae17377a60be3537f375",
    measurementId: "G-SSFYK2MWJD"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  else
  {
    firebase.app(firebaseConfig);
  }

 export default firebase;
