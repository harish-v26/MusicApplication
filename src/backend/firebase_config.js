import { initializeApp } from "firebase/app";

//!Authentication services from Firebase
import { getAuth } from "firebase/auth";

// Database Services from firebase
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW27uZUjDuRydbadbCjuv54OnFobVDNqA",
  authDomain: "music-application-5ca2d.firebaseapp.com",
  projectId: "music-application-5ca2d",
  storageBucket: "music-application-5ca2d.firebasestorage.app",
  messagingSenderId: "596135483938",
  appId: "1:596135483938:web:3ea9c59becc2a2ea62c87b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export let __AUTH = getAuth(firebaseApp);
export let __DB = getFirestore(firebaseApp);

export default firebaseApp;