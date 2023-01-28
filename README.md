# AI-PROMPTER 🤖⏱

This is a prototype for a node.js project that integrates Open AI's GPT-3 to allow the system periodically send prompts. It was initially built as a joke AI girlfriend that sent love messages periodically every morning, but it can be adapted to send any information at all periodically by changing the prompt.

## Integrated Systems
- **Google's API** It uses Google's OAuth system and Gmail API to send emails to a user.
- **OpenAI's GPT-3** It uses this to generate text based on a randomly selected list of JSON prompts.
- **Crontab** It uses a crontab on a server or even a laptop to periodically send the mails at the time the user chooses.

## Installation Steps
1. Fork the project
1. Clone the project locally
1. Create a Google App and an OpenAI account to receive the credentials needed to run the project
1. Choose an email that would be the sender of prompts
1. Replace the details in the .env.example file with your own OpenAI credentials and Google App credentials
1. Run the express application and click the button on the page to grant OAuth access to the email account chosen as the sender
1. Run `node send-text.js` in your terminal to see a message being sent
1. Create a crontab to periodically run `node send-text.js` whenever you want either on a server or your system
