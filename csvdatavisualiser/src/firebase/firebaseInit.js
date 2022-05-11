// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASzmCt2DMRK6EYaNO_BBoUlictT2KN-58",
  authDomain: "csvdatavisualiser.firebaseapp.com",
  projectId: "csvdatavisualiser",
  storageBucket: "csvdatavisualiser.appspot.com",
  messagingSenderId: "1090710358770",
  appId: "1:1090710358770:web:177a9b3ffc209bc5641e6b",
  measurementId: "G-MH057M0FBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);