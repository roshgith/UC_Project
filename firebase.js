// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, signInWithRedirect } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDw2XOyT0MFvQzZCrgCSJlbfaOFFX674E8",
  authDomain: "university-companion-89b78.firebaseapp.com",
  projectId: "university-companion-89b78",
  storageBucket: "university-companion-89b78.appspot.com",
  messagingSenderId: "595144912696",
  appId: "1:595144912696:web:1ae89cf4a528a8d0e55bcd",
  measurementId: "G-0TR52JVRH6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut, onAuthStateChanged };

export { storage };