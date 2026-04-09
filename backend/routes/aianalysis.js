const express = require('express');
const path = require('path');
const fs = require('fs');
const Papa = require('papaparse');
const { OpenAI } = require('openai');

const router = express.Router()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/analysis', async (req, res) => {
  try {
    const uploadDir = path.join(__dirname, 'uploads');

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
    const parsedData = Papa.parse(csvString, { 
      header: true, 
      skipEmptyLines: true 
    });
    
    // Grab first 30 rows for OpenAI context
    const dataSummary = JSON.stringify(parsedData.data.slice(0, 30));

    // 5. OpenAI Analysis
    const completion = await openai.chat.completions.create({
      model: "gpt-5.4",
      messages: [
        { 
          role: "system", 
          content: `You are a professional data analyst. Analyze the following data for ${req.body.insight} and return a JSON object with: 1. '''chartData''': Array of {label, value} for a ${req.body.charttype} chart. 2. '''valueDescription''': A short string explaining what the 'value' represents. 3. '''analysis''': A summary of the findings`
        },
        { 
          role: "user", 
          content: `Data from ${firstFileName}: ${dataSummary}` 
        }
      ],
    });

    res.json({
      processedFile: firstFileName,
      analysis: completion.choices[0].message.content,
      rowCount: parsedData.data.length
    });

  } catch (error) {
    console.error("Analysis Error:", error);
    res.status(500).json({ error: "Server error during automatic file analysis." });
  }
});

module.exports = router