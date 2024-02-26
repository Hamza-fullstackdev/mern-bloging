// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-bfa9b.firebaseapp.com",
  projectId: "mern-blog-bfa9b",
  storageBucket: "mern-blog-bfa9b.appspot.com",
  messagingSenderId: "241990641935",
  appId: "1:241990641935:web:80b19a5c927ef4db00767a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);