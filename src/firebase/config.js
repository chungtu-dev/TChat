import Firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyDK2IVukAsQwMe0x6VF09JbOKhdH7jHf-Y",
  authDomain: "tchat-14cbf.firebaseapp.com",
  databaseURL: "https://tchat-14cbf-default-rtdb.firebaseio.com",
  projectId: "tchat-14cbf",
  storageBucket: "tchat-14cbf.appspot.com",
  messagingSenderId: "836254297828",
  appId: "1:836254297828:web:f3c2653b8aa550b23446f1",
  measurementId: "G-3B011G50LT"
};

export default Firebase.initializeApp(firebaseConfig);

