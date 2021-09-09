import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAgcJVcdNSE-dFxDhQzFuCQXAnttkd2FIw",
    authDomain: "discord-clone-5df52.firebaseapp.com",
    projectId: "discord-clone-5df52",
    storageBucket: "discord-clone-5df52.appspot.com",
    messagingSenderId: "570908362526",
    appId: "1:570908362526:web:e6e1b4ffe973ab01a56b0f",
    measurementId: "G-038XMBJYTR"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;