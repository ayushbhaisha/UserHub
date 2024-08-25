import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyD3YDiZLCQw-y0tx2BEnTaSqIpRkR9l4BQ",
  authDomain: "userhub-14d02.firebaseapp.com",
  projectId: "userhub-14d02",
  storageBucket: "userhub-14d02.appspot.com",
  messagingSenderId: "766017285369",
  appId: "1:766017285369:web:31daa66e0f6e00e98a8628"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
