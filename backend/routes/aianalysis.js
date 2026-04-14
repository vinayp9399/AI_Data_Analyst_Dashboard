const express = require('express');
const path = require('path');
const fs = require('fs');
const Papa = require('papaparse');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/analysis', async (req, res) => {
  try {
    const uploadDir = path.join(__dirname, '../uploads');

    const files = fs.readdirSync(uploadDir);
    const csvFiles = files.filter(file => path.extname(file).toLowerCase() === '.csv');

    if (csvFiles.length === 0) {
      return res.status(404).json({ error: "No CSV files found in the uploads folder." });
    }

    const firstFileName = csvFiles[0];
    const filePath = path.join(uploadDir, firstFileName);

    const csvString = fs.readFileSync(filePath, 'utf8');
    const parsedData = Papa.parse(csvString, { 
      header: true, 
      skipEmptyLines: true 
    });
    
    const dataSummary = JSON.stringify(parsedData.data.slice(0, 30));

const model = genAI.getGenerativeModel({ 
    model: "models/gemini-3-flash-preview",
    generationConfig: { responseMimeType: "application/json" }
});

    const prompt = `
      You are a professional data analyst. 
      Analyze the following data based on this query: ${req.body.userquery}.

      Data from ${firstFileName}: ${dataSummary}

      Return a JSON object with exactly these keys:
      1. "labels": Array of label for a chart.
      2. "values": Array of values for a chart.
      3. "valueDescription": A short string explaining what the 'value' represents.
      4. "overallanalysis": A summary of the findings.
      5. "title": A short title for the chart
      6. "specificanalysis": 3 analysis point in json format {analysis1:{numberinsight,one_short_positive_detail}, analysis2:{numberinsight, one_short_negetive_detail}, analysis 3: {numberinsight, one_short_random_detail}}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      processedFile: firstFileName,
      analysis: JSON.parse(text),
      rowCount: parsedData.data.length
    });

  } catch (error) {
    console.error("Analysis Error:", error);
    res.status(500).json({ error: "Server error during automatic file analysis." });
  }
});

module.exports = router;