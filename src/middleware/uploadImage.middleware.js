const multer = require('multer');
const path = require('path');
const fs = require('fs');
// Cấu hình đường dẫn và tên file
const uploadDir = path.join(__dirname, '../uploads/images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        // cb(null, '/Users/Cuonga/Desktop/20232/project1/laptop-store-backend/src/uploads/images'); // Đường dẫn lưu ảnh
        cb(null, uploadDir); // Đường dẫn lưu ảnh
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;