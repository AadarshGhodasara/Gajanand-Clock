import  firebase from "firebase/app";
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';

var firebaseConfig = {
  apiKey: "AIzaSyDB-9gDavlUpDwNrpP3YN1gPazFS1bZqQM",
  authDomain: "react-js-web-31093.firebaseapp.com",
  databaseURL: "https://react-js-web-31093-default-rtdb.firebaseio.com",
  projectId: "react-js-web-31093",
  storageBucket: "react-js-web-31093.appspot.com",
  messagingSenderId: "1087500234803",
  appId: "1:1087500234803:web:8adcc489c200dfe1ab3346",
  measurementId: "G-KY1ST75J3D"
  };

  firebase.initializeApp(firebaseConfig);


  const storage = firebase.storage();
  const store = firebase.firestore();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  export{
    storage , 
    store,
    timestamp , 
    firebase as default
  } 

  
