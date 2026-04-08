const express = require('express')
const multer = require('multer');
const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // Folder location
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });


router.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully!');
});

module.exports = router