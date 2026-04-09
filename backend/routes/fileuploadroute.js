const express = require('express')
const multer = require('multer');
const router = express.Router()

const path = require('path');
const fs = require('fs');
const Papa = require('papaparse');

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

router.get('/getfile', (req, res) => {
  const uploadDir = path.join(__dirname, '../uploads');
  
      // 1. Read the directory and find all CSV files
      const files = fs.readdirSync(uploadDir);
      const csvFiles = files.filter(file => path.extname(file).toLowerCase() === '.csv');
  
      // 2. Error handling if folder is empty
      if (csvFiles.length === 0) {
        return res.status(404).json({ error: "No CSV files found in the uploads folder." });
      }
  
      // 3. Take the first file from the list
      const firstFileName = csvFiles[0];
      const filePath = path.join(uploadDir, firstFileName);
  
      // 4. Read and Parse the CSV
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