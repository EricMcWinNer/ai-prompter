const mssgs = require("./assets/mssgs.json");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const path = require("path");
const { google } = require("googleapis");
const { authenticate } = require("@google-cloud/local-auth");
const tokens = require("./assets/tokens.json");
const gmail = google.gmail("v1");

async function main() {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3000/oauthcallback"
  );
  auth.setCredentials(tokens);

  google.options({ auth });
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: mssgs[Math.floor(Math.random() * mssgs.length)],
    temperature: 0.81,
    max_tokens: 350,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  // You can use UTF-8 encoding for the subject using the method below.
  // You can also just use a plain string if you don't need anything fancy.
  const subject = "❤️ Hello My Love 🥰";
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString("base64")}?=`;
  const messageParts = [
    "From: Eric's Girlfriend <mcwinners.girlfriend69@gmail.com>",
    "To: Eric Aprioku <eapriok@gmail.com>",
    "Content-Type: text/html; charset=utf-8",
    "MIME-Version: 1.0",
    `Subject: ${utf8Subject}`,
    "",
    response.data.choices[0].text,
    ,
  ];
  const message = messageParts.join("\n");

  // The body needs to be base64url encoded.
  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const res = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: encodedMessage,
    },
  });
  console.log(res.data);
}

main();
