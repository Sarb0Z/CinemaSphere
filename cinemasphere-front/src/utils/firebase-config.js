// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBDyX892Rf0hXljdDDoKBh6UeA9LYKfhRs",
  authDomain: "netflix-clone-83048.firebaseapp.com",
  projectId: "netflix-clone-83048",
  storageBucket: "netflix-clone-83048.appspot.com",
  messagingSenderId: "950198371823",
  appId: "1:950198371823:web:c7446bff0986aa7448621a",
  measurementId: "G-G6XMGEZ790"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app)
