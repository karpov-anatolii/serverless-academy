const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

try {
  const envFile = fs.readFileSync('.env', 'utf8');
  const envLines = envFile.split('\n');
  envLines.forEach((line) => {
    const [key, value] = line.split('=');
    process.env[key] = value;
  });
} catch (err) {
  console.error('Error reading .env:', err);
}

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

function sendMessage(str) {
  bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, str).then(() => process.exit(0));
  });
}

function sendPhoto(str) {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot
      .sendPhoto(chatId, str, { caption: 'This is your image!' })
      .then(() => {
        process.exit(0);
      })
      .catch((error) => {
        console.error('Error sending image:', error);
      });
  });
}

module.exports = {
  sendMessage,
  sendPhoto,
};
