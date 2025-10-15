// src/middleware/uploadVideo.middleware.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 🧩 Tạo thư mục nếu chưa tồn tại
const uploadDir = path.join(__dirname, "../uploads/videos");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 🧩 Cấu hình multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["video/mp4", "video/mkv", "video/webm", "video/avi"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Invalid video type! Only mp4/mkv/webm/avi allowed."));
};

const uploadVideo = multer({ storage, fileFilter });

module.exports = uploadVideo;
