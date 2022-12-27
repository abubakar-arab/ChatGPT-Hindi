import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import bodyParser from "body-parser";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
const port = 5000;
app.use(cors());
app.use(bodyParser.json());

app.post("/", async (req, res) => {
  const message = req.body;/// This is prompt coming from UI written by user as a message.
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message.message}`,
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
  });
  res.json({
    // data:response.data
    message: response.data.choices[0].text,
  });
});


app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));

