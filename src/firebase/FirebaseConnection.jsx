import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import 'firebase/auth';
import 'firebase/database';

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyCPKbG_UPrUZE1MdRnCjt7O3t6-1tLEMr4",
  authDomain: "light-bookstore.firebaseapp.com",
  projectId: "light-bookstore",
  storageBucket: "light-bookstore.appspot.com",
  messagingSenderId: "752799958501",
  appId: "1:752799958501:web:292df89fd702ccb9219b0c"

});
export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);
