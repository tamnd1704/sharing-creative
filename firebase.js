import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyD87j3wuUiUpoO5wuE_o0rezNGsYZ3Sn4E",
  authDomain: "sharing-file-57833.firebaseapp.com",
  projectId: "sharing-file-57833",
  storageBucket: "sharing-file-57833.appspot.com",
  messagingSenderId: "68012015480",
  appId: "1:68012015480:web:256e949001a6f6cd61928d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  db, storage,
  auth, provider,
  signInWithPopup, onAuthStateChanged,
  collection, addDoc, getDocs, query, orderBy, serverTimestamp,
  ref, uploadBytes, getDownloadURL
};
