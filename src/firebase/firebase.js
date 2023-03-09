// firebase.js

// import Firebase from "firebase/compat/app";
// import "firebase/compat/firestore";
// import "firebase/compat/auth";
// import "firebase/compat/storage";
// import { getStorage} from "firebase/storage";
// import { getDatabase } from "firebase/database";
import {initializeApp, getApps, getApp} from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDtw3Ci7QXHhhVSU8wpxBroxGa1xO8H6Eg',
  authDomain: 'dupe-48e3a.firebaseapp.com',
  databaseURL: 'https://dupe-48e3a-default-rtdb.firebaseio.com',
  projectId: 'dupe-48e3a',
  storageBucket: 'dupe-48e3a.appspot.com',
  messagingSenderId: '835064937038',
  appId: '1:835064937038:web:aa2361160d4497ceece11f',
  measurementId: 'G-037QTCJCRS',
}

let app
if (getApps().length === 0) {
  // Initialize Firebase app
  app = initializeApp(firebaseConfig)
} else {
  // Use existing app if already initialized
  app = getApp()
}

export const firebaseApp = app

// const firebase = Firebase.initializeApp(firebaseConfig);
// const storage = getStorage(firebase);
// const database = getDatabase(firebase);
// var db = firebase.firestore(firebase);

// export { db, storage, database, firebase as default };