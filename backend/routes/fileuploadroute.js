const express = require('express')
const multer = require('multer');
const router = express.Router()

const path = require('path');
const fs = require('fs');
const Papa = require('papaparse');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';

    if (fs.existsSync(uploadDir)) {
      const files = fs.readdirSync(uploadDir);
      for (const file of files) {
        fs.unlinkSync(path.join(uploadDir, file));
      }
    } else {
      fs.mkdirSync(uploadDir);
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully!');
});

router.get('/getfile', (req, res) => {
  const uploadDir = path.join(__dirname, '../uploads');
  
  const files = fs.readdirSync(uploadDir);
  const csvFiles = files.filter(file => path.extname(file).toLowerCase() === '.csv');
  
  if (csvFiles.length === 0) {
    return res.status(404).json({ error: "No CSV files found in the uploads folder." });
  }
  
  const firstFileName = csvFiles[0];
  const filePath = path.join(uploadDir, firstFileName);
  
  const csvString = fs.readFileSync(filePath, 'utf8');

  Papa.parse(csvString, {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      if (results.data.length > 0) {
        res.send({columns:Object.keys(results.data[0]), data:results.data});
      }
    },
  });
});

module.exports = router