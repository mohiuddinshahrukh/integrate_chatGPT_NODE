import express from "express";
import { OpenAI } from "openai";
import "dotenv/config";
const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from hanna",
  });
});

app.post("/post_request_gpt", async (req, res) => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",

      messages: [
        {
          role: "user",
          content: "Write me a story about Kung fu panda but only 50 words long",
        },
      ],
    });
    if (res) {
      console.log(response.data);
      return res.status(200).json({
        message: "working / gpt-ing :P",
        success: true,
        data: response,
      });
    } else {
      return res.status(400).json({
        message: "not working  / not gpt-ing :(",
        success: false,
        data: null,
      });
    }
  } catch (error) {
    console.log("error");
    console.log(error);
    return;
  }
});

const port = 3000;
app.listen(port, () => {
  console.log("Server listening on port ", port);
});
