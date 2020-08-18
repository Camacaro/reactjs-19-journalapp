
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCwFeEJnUJ0rICXFVgKzv2U-ro7JJSNs9Y",
  authDomain: "react-journalapp-ed770.firebaseapp.com",
  databaseURL: "https://react-journalapp-ed770.firebaseio.com",
  projectId: "react-journalapp-ed770",
  storageBucket: "react-journalapp-ed770.appspot.com",
  messagingSenderId: "31635282791",
  appId: "1:31635282791:web:9004ee4f5c03ac3d7e6dc2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Referencia hacia firestore
const db = firebase.firestore();
// auth con google o con cualquiera 
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
  firebase
}