const multer = require('multer');
const path = require('path');
const fs = require('fs');
const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname).toLowerCase());
  }
});
const fileFilter = (req, file, cb) => {
  const allowedExt = /\.(pdf|jpg|jpeg|png)$/i;
  if (allowedExt.test(path.extname(file.originalname))) cb(null, true);
  else cb(new Error('Only pdf/jpg/png allowed'));
};
const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });
module.exports = upload;