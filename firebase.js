// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

// Thay thế bằng thông tin dự án Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyD87j3wuUiUpoO5wuE_o0rezNGsYZ3Sn4E",
  authDomain: "sharing-file-57833.firebaseapp.com",
  projectId: "sharing-file-57833",
  storageBucket: "sharing-file-57833.appspot.com",
  messagingSenderId: "68012015480",
  appId: "1:68012015480:web:256e949001a6f6cd61928d"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Firestore & Storage
const db = getFirestore(app);
const storage = getStorage(app);

// Xuất ra cho file index.html dùng
export { db, storage };
