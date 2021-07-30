import * as firebase from "firebase";

// export const firebaseConfig = {
//   apiKey: "AIzaSyDn80Fg26YqMLWQJXICZQ1ylwL5ZWO2_ZE",
//   authDomain: "practice-238d2.firebaseapp.com",
//   databaseURL: 'https://practice-238d2-default-rtdb.firebaseio.com',
//   projectId: "practice-238d2",
//   storageBucket: "practice-238d2.appspot.com",
//   messagingSenderId: "785190836514",
//   appId: "1:785190836514:web:c7c985f57bf9e18590ed7b",
//   measurementId: "G-CDL3XN5DHD",
// };
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDm549CWCUHBH4Swu55OQqn3M_19viyyBs",
  authDomain: "theshop-062021.firebaseapp.com",
  databaseURL: "https://theshop-062021-default-rtdb.firebaseio.com",
  projectId: "theshop-062021",
  storageBucket: "theshop-062021.appspot.com",
  messagingSenderId: "363414935951",
  appId: "1:363414935951:web:2f247d2d8db5e7ffd793fa",
  measurementId: "G-L41SZK0YXH"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
};

export default firebase;