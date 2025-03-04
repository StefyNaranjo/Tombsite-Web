
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbS_9HkSj9bLkd6Cag1mNx38apa5uN5Pg",
  authDomain: "tombsiteapp.firebaseapp.com",
  //databaseURL: "https://tombsiteapp-default-rtdb.firebaseio.com",
  projectId: "tombsiteapp",
  storageBucket: "tombsiteapp.appspot.com",
  messagingSenderId: "475660216407",
  appId: "1:475660216407:web:904800858525bb750a9b12",
  measurementId: "G-40P3S8XJL2"
};


const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
