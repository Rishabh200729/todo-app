import firebase from "firebase/app";
import "firebase/firestore";

//options and config info
const firebaseConfig = {
  apiKey: "AIzaSyBSe0QjKdpTxkvNUxL9WjpTOdAIcEOXFXY",
  authDomain: "task-tracker-65a4d.firebaseapp.com",
  projectId: "task-tracker-65a4d",
  storageBucket: "task-tracker-65a4d.appspot.com",
  messagingSenderId: "199087630591",
  appId: "1:199087630591:web:c3781196f2bd40e04e04ca"
};
//init app
firebase.initializeApp(firebaseConfig);
//export db
export default firebase ;
