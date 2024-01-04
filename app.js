const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

let apiKey = ''; // Initialize the API key

app.use(express.json());

app.use((req, res, next) => {
  // Middleware to extract API key from URL parameter
  const apiKeyParam = req.query.apiKey;
  
  if (apiKeyParam) {
    apiKey = apiKeyParam;
  }

  next();
});

app.get('/generate-text', async (req, res) => {
  try {
    const prompt = req.query.prompt || 'Hi'; // Set default prompt to 'Hi' if not provided in the URL

    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci/completions',
      {
        prompt: prompt,
        max_tokens: 100, // You can adjust this based on your needs
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    const generatedText = response.data.choices[0].text;
    res.json({ generatedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
