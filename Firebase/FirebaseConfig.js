import * as firebase from "firebase";

export const firebaseConfig = {
  apiKey: "AIzaSyDn80Fg26YqMLWQJXICZQ1ylwL5ZWO2_ZE",
  authDomain: "practice-238d2.firebaseapp.com",
  databaseURL: 'https://practice-238d2-default-rtdb.firebaseio.com',
  projectId: "practice-238d2",
  storageBucket: "practice-238d2.appspot.com",
  messagingSenderId: "785190836514",
  appId: "1:785190836514:web:c7c985f57bf9e18590ed7b",
  measurementId: "G-CDL3XN5DHD",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
};

export default firebase;