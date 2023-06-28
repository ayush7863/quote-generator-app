const express = require("express");
const axios = require("axios");
require("dotenv").config();
const app = express();
const cors = require("cors");

const apiKey = process.env.API_KEY;
const port = process.env.PORT || 4040;

app.use(express.json());
app.use(cors());

app.get("/api/quote", async (req, res) => {
  try {
    const keyword = req.query.keyword;
    const response = await axios.post(
      // "https://api.openai.com/v1/engines/gpt-3.5-turbo/completions",
      "https://api.openai.com/v1/engines/davinci/completions",
      {
        prompt: `Generate a quote about ${keyword}.`,
        max_tokens: 50,
        temperature: 0.7,
        n: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const quote = response.data.choices[0].text.trim();
    res.json({ quote });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the quote." });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
