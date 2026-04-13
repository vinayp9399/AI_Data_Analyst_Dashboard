const express = require('express');
const path = require('path');
const fs = require('fs');
const Papa = require('papaparse');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/analysis', async (req, res) => {
  try {
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
    const parsedData = Papa.parse(csvString, { 
      header: true, 
      skipEmptyLines: true 
    });
    
    // Grab first 30 rows for Gemini context
    const dataSummary = JSON.stringify(parsedData.data.slice(0, 30));

    // 5. Gemini Analysis
    // 1. Try changing the model string to include the 'models/' prefix
const model = genAI.getGenerativeModel({ 
    model: "models/gemini-3-flash-preview", // Adding the prefix helps the SDK locate it
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
      analysis: JSON.parse(text), // Parsing text because Gemini returns it as a string
      rowCount: parsedData.data.length
    });

  } catch (error) {
    console.error("Analysis Error:", error);
    res.status(500).json({ error: "Server error during automatic file analysis." });
  }
});

module.exports = router;






// {processedFile: '1775806221483-134162380-products.csv', analysis: {…}, rowCount: 200}
// analysis
// : 
// analysis
// : 
// "The analysis of the 30 products shows that 70% is the most common cocoa concentration, representing approximately 36.7% of the inventory (11 items). The second most frequent concentration is 50% (8 items), while high-intensity 90% cocoa products are also significant (6 items). Concentrations of 60% and 80% are relatively rare. A notable trend in the data is the presence of 'White' and 'Milk' labeled chocolates with unusually high cocoa percentages (up to 90%), suggesting a non-traditional product catalog or specialized formulations."
// chartData
// : 
// Array(5)
// 0
// : 
// {label: '50%', value: 8}
// 1
// : 
// {label: '60%', value: 3}
// 2
// : 
// {label: '70%', value: 11}
// 3
// : 
// {label: '80%', value: 2}
// 4
// : 
// {label: '90%', value: 6}
// length
// : 
// 5
// [[Prototype]]
// : 
// Array(0)
// valueDescription
// : 
// "The count of chocolate products for each cocoa percentage level."
// [[Prototype]]
// : 
// Object
// processedFile
// : 
// "1775806221483-134162380-products.csv"
// rowCount
// : 
// 200
// [[Prototype]]
// : 
// Object