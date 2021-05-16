import firebase from "firebase/app";
import "firebase/firestore"; 
//options and config info
const firebaseConfig = {
  apiKey: process.env.React_App_API_KEY,
  authDomain: process.env.React_App_AUTH_DOMAIN,
  projectId: process.env.React_App_PROJECT_ID,
  storageBucket:process.env.React_App_STORAGE_BUCKET ,
  messagingSenderId: process.env.React_App_MESSAGE_SENDER_ID,
  appId: process.env.React_App_APP_ID
};
//init app
firebase.initializeApp(firebaseConfig);
//export db
export default firebase ;
