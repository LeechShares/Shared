const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());

// Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
const apiKey = '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';

app.post('/generate-text', async (req, res) => {
  try {
    const { prompt } = req.body;

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