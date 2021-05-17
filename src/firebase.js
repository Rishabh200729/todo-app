import firebase from "firebase/app";
import "firebase/firestore"; 
//options and config info
console.log(process.env);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket:process.env.REACT_APP_STORAGE_BUCKET ,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_ID
};
//init app
firebase.initializeApp(firebaseConfig);
//export db
export default firebase ;
