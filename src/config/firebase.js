// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUgmYxNNlBjTW5G8Pv30NbVGK9NtpUSb4",
  authDomain: "webapp-ei1039-48-2022-23.firebaseapp.com",
  projectId: "webapp-ei1039-48-2022-23",
  storageBucket: "webapp-ei1039-48-2022-23.appspot.com",
  messagingSenderId: "186487167397",
  appId: "1:186487167397:web:afa61abd9e66350473704c",
  measurementId: "G-CH0Z2ZCDCK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;