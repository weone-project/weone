// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBveLNQZ4N8hVfZ10LO_6ipX7_kkB3si4k",
    authDomain: "we-one-chat.firebaseapp.com",
    projectId: "we-one-chat",
    storageBucket: "we-one-chat.appspot.com",
    messagingSenderId: "722358974791",
    appId: "1:722358974791:web:7769888288617c98abb462"
  };

initializeApp(firebaseConfig);
export const auth = getAuth()
export const database = getFirestore()