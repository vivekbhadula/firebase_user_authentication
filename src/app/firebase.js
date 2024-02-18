import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCj5SYEgj-cc4QN_44BzJBFS7lxdtKPqgo",

    authDomain: "vivekproject-6c7b0.firebaseapp.com",
  
    projectId: "vivekproject-6c7b0",
  
    storageBucket: "vivekproject-6c7b0.appspot.com",
  
    messagingSenderId: "773408200067",
  
    appId: "1:773408200067:web:7565f2776ff9f9a03792b6"
  
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();