<!-- Firebase SDK (nên dùng CDN cho GitHub Pages) -->
<script src="https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js"></script>

<script>
  // Cấu hình Firebase của bạn
  const firebaseConfig = {
    apiKey: "AIzaSyD87j3wuUiUpoO5wuE_o0rezNGsYZ3Sn4E",
    authDomain: "sharing-file-57833.firebaseapp.com",
    projectId: "sharing-file-57833",
    storageBucket: "sharing-file-57833.appspot.com",
    messagingSenderId: "68012015480",
    appId: "1:68012015480:web:256e949001a6f6cd61928d"
  };

  // Khởi tạo Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const storage = firebase.storage();
</script>

<script>
  // Ghi đè lại các hàm xử lý lưu trữ bằng Firebase
  document.addEventListener('DOMContentLoaded', () => {
    // Ghi đè hàm submit form
    const uploadForm = document.getElementById('uploadForm');
    const thumbnailFile = document.getElementById('thumbnailFile');
    const attachmentFile = document.getElementById('attachmentFile');
    const uploaderNameInput = document.getElementById('uploaderName');
    const demoLinkInput = document.getElementById('demoLink');

    uploadForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const uploaderName = uploaderNameInput.value.trim();
      const demoLink = demoLinkInput.value.trim();
      const thumbnail = thumbnailFile.files[0];
      const attachment = attachmentFile.files[0];
      const uploadTime = new Date();

      if (!uploaderName || !thumbnail || !attachment) {
        alert("Vui lòng nhập đủ thông tin");
        return;
      }

      const uniqueId = Date.now().toString();
      const thumbnailRef = storage.ref(`thumbnails/${uniqueId}-${thumbnail.name}`);
      const attachmentRef = storage.ref(`attachments/${uniqueId}-${attachment.name}`);

      try {
        // Upload thumbnail
        await thumbnailRef.put(thumbnail);
        const thumbnailURL = await thumbnailRef.getDownloadURL();

        // Upload attachment
        await attachmentRef.put(attachment);
        const attachmentURL = await attachmentRef.getDownloadURL();

        // Save metadata to Firestore
        await db.collection("contents").add({
          uploaderName,
          demoLink,
          thumbnailURL,
          attachmentURL,
          attachmentName: attachment.name,
          attachmentType: attachment.type,
          uploadTime: uploadTime.toISOString()
        });

        alert("✅ Tải lên thành công!");
        window.location.reload();
      } catch (err) {
        console.error(err);
        alert("❌ Lỗi khi tải lên");
      }
    });

    // Hàm hiển thị danh sách file
    async function renderContentItems() {
      const snapshot = await db.collection("contents").orderBy("uploadTime", "desc").get();
      const contentCards = document.getElementById('contentCards');
      contentCards.innerHTML = '';

      if (snapshot.empty) {
        document.getElementById('emptyState').classList.remove('hidden');
        contentCards.classList.add('hidden');
        return;
      }

      document.getElementById('emptyState').classList.add('hidden');
      contentCards.classList.remove('hidden');

      snapshot.forEach(doc => {
        const data = doc.data();
        const card = document.createElement('div');
        card.className = 'card bg-white rounded-xl shadow-md overflow-hidden fadeIn';

        const uploadDate = new Date(data.uploadTime);
        const formattedDate = uploadDate.toLocaleDateString('vi-VN', {
          day: '2-digit', month: '2-digit', year: 'numeric'
        });

        card.innerHTML = `
          <div class="thumbnail-container">
            <img src="${data.thumbnailURL}" alt="Thumbnail" class="thumbnail-preview">
            <div class="thumbnail-overlay"></div>
          </div>
          <div class="p-4">
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-semibold text-gray-800 truncate">${data.attachmentName}</h3>
              <span class="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1">${getFileTypeLabel(data.attachmentType)}</span>
            </div>
            <div class="flex items-center text-gray-500 text-sm mb-4">
              <i class="fas fa-user mr-2"></i>
              <span>${data.uploaderName}</span>
              <span class="mx-2">•</span>
              <i class="far fa-calendar-alt mr-2"></i>
              <span>${formattedDate}</span>
            </div>
            <div class="flex flex-wrap gap-2 mt-4">
              <a href="${data.attachmentURL}" target="_blank" download class="btn flex-1 bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 px-3 rounded-lg text-sm font-medium">
                <i class="fas fa-download mr-1"></i> Tải về
              </a>
              ${data.demoLink ? `
                <a href="${data.demoLink}" target="_blank" class="btn flex-1 bg-purple-100 hover:bg-purple-200 text-purple-800 py-2 px-3 rounded-lg text-sm font-medium text-center">
                  <i class="fas fa-link mr-1"></i> Xem demo
                </a>` : ''}
            </div>
          </div>
        `;

        contentCards.appendChild(card);
      });
    }

    function getFileTypeLabel(mimeType) {
      if (mimeType.includes('image')) return 'Hình ảnh';
      if (mimeType.includes('text')) return 'Văn bản';
      if (mimeType.includes('json')) return 'JSON';
      if (mimeType.includes('zip')) return 'ZIP';
      if (mimeType.includes('pdf')) return 'PDF';
      if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) return 'Excel';
      if (mimeType.includes('video')) return 'Video';
      if (mimeType.includes('audio')) return 'Audio';
      return 'File';
    }

    // Khởi động hiển thị ban đầu
    renderContentItems();
  });
</script>

