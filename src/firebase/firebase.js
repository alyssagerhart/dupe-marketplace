import { getFirestore } from "@firebase/firestore";
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
export const application = initializeApp(firebaseConfig);
export const db = getFirestore();