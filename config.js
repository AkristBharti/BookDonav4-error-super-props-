import * as firebase from 'firebase';
require('@firebase/firestore')
var firebaseConfig = {
  apiKey: "AIzaSyCiVEa_ybKkVONF_lLiOMRHq-3NMpMRo5A",
  authDomain: "bookdonav4-9f7f4.firebaseapp.com",
  databaseURL: "https://bookdonav4-9f7f4.firebaseio.com",
  projectId: "bookdonav4-9f7f4",
  storageBucket: "bookdonav4-9f7f4.appspot.com",
  messagingSenderId: "189392848696",
  appId: "1:189392848696:web:81c446e96322f2f03223cd",
  measurementId: "G-98KQFD3Q3F"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();