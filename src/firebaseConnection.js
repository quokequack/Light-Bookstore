// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcFLtSRefVFLxy24K214wOphll862aSPM",
  authDomain: "bookstore-821a3.firebaseapp.com",
  projectId: "bookstore-821a3",
  storageBucket: "bookstore-821a3.appspot.com",
  messagingSenderId: "480343989976",
  appId: "1:480343989976:web:9ab180a945454fae2c01ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebase;