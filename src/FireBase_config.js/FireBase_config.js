// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHd4MyQsgWDGnC1BWZfBqBSQnMAzq1NRE",
  authDomain: "e-mail-password-authentication.firebaseapp.com",
  projectId: "e-mail-password-authentication",
  storageBucket: "e-mail-password-authentication.appspot.com",
  messagingSenderId: "888382532518",
  appId: "1:888382532518:web:e7142bf78301a8ba59bd67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;