// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{ getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlDBtvMmOj68KdjmCB4FlUrc9HQypfLVM",
  authDomain: "pantryproject-84a12.firebaseapp.com",
  projectId: "pantryproject-84a12",
  storageBucket: "pantryproject-84a12.appspot.com",
  messagingSenderId: "510482159375",
  appId: "1:510482159375:web:940614999248cf897b107a",
  measurementId: "G-DMR3QBY0ZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);