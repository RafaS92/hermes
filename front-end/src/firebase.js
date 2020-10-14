import firebase from "firebase/";

const firebaseConfig = {
  apiKey: "AIzaSyCkt0GKLH4-4i483ci-EJ9lvHLkIjiaBCw",
  authDomain: "hermes-65215.firebaseapp.com",
  databaseURL: "https://hermes-65215.firebaseio.com",
  projectId: "hermes-65215",
  storageBucket: "hermes-65215.appspot.com",
  messagingSenderId: "339173569115",
  appId: "1:339173569115:web:9147a9088e80bb6415457e",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
