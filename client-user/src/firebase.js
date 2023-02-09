// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADp1twKUUbQWJc4NMzfHI59PB-XtAyVBI",
  authDomain: "project-ec571.firebaseapp.com",
  projectId: "project-ec571",
  storageBucket: "project-ec571.appspot.com",
  messagingSenderId: "396699217847",
  appId: "1:396699217847:web:8c0436f5050770a8294232"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore(app)