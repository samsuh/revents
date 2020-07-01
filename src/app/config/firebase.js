import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD9DuD0xzymrrVNQh_OJ2xElhQBerYSpmg",
  authDomain: "revents-743c5.firebaseapp.com",
  databaseURL: "https://revents-743c5.firebaseio.com",
  projectId: "revents-743c5",
  storageBucket: "revents-743c5.appspot.com",
  messagingSenderId: "288811872157",
  appId: "1:288811872157:web:87a5499c4975e98ba78974",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;
