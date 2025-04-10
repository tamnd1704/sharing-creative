<!-- Đảm bảo file này được nhúng sau khi Firebase compat đã được import -->

<script>
  // Khởi tạo Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyD87j3wuUiUpoO5wuE_o0rezNGsYZ3Sn4E",
    authDomain: "sharing-file-57833.firebaseapp.com",
    projectId: "sharing-file-57833",
    storageBucket: "sharing-file-57833.appspot.com",
    messagingSenderId: "68012015480",
    appId: "1:68012015480:web:256e949001a6f6cd61928d"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const storage = firebase.storage();

  // Nếu cần export cho global
  window.db = db;
  window.storage = storage;
</script>
