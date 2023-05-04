import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1M1c8rfJ1DV034tBoAz8zY_BKpaLa-oY",
  authDomain: "quitter-c5a7c.firebaseapp.com",
  projectId: "quitter-c5a7c",
  storageBucket: "quitter-c5a7c.appspot.com",
  messagingSenderId: "1002027911396",
  appId: "1:1002027911396:web:92c726783de9d2015a84f1",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// access firebase database with db variable
const db = firebase.firestore();

db.enablePersistence().catch((err) => {
  if (err.code == "failed-precondition") {
    console.log("persistance failed");
  } else if (err.code == "unimplemented") {
    console.log("persistance unvailable");
  }
});

export default db;
