import app from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLsUEgW-w3GKVORM7qOFYQLgx_Fs4MHyM",

  authDomain: "crud-react-a8352.firebaseapp.com",

  projectId: "crud-react-a8352",

  storageBucket: "crud-react-a8352.appspot.com",

  messagingSenderId: "964997033115",

  appId: "1:964997033115:web:b78d713e8d526e16af2a3e",
};

// Initialize Firebase

app.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

export { db, auth };
