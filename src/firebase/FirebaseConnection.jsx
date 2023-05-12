import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import 'firebase/auth';
import 'firebase/database';

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyAcFLtSRefVFLxy24K214wOphll862aSPM",
    authDomain: "bookstore-821a3.firebaseapp.com",
    projectId: "bookstore-821a3",
    storageBucket: "bookstore-821a3.appspot.com",
    messagingSenderId: "480343989976",
    appId: "1:480343989976:web:9ab180a945454fae2c01ad"
  
  });
  export const storage = getStorage(firebaseApp);
  export const auth = getAuth(firebaseApp);
