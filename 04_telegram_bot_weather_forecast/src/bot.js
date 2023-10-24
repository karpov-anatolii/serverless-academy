const TelegramBot = require('node-telegram-bot-api');
const { getWeather3Hours, getWeather6Hours } = require('./weather');
const fs = require('fs');
const path = require('path');

const envFilePath = path.join(__dirname, '..', '.env');

//Reading data from .env file and pass them to process.env
try {
  const envFile = fs.readFileSync(envFilePath, 'utf8');
  const envLines = envFile.split('\n');
  envLines.forEach((line) => {
    const [key, value] = line.split('=');
    process.env[key] = value.trim();
  });
} catch (err) {
  console.error('Error reading .env:', err);
}

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

function startBot(str) {
  bot.on('callback_query', (callbackQuery) => {
    const message = callbackQuery.message;
    const chatId = message.chat.id;

    if (callbackQuery.data === 'qStart') {
      const newKeyboard = {
        inline_keyboard: [
          [
            {
              text: '3 hours forecast for 5 days',
              callback_data: 'qForecast3',
            },
            {
              text: '6 hours forecast for 5 days',
              callback_data: 'qForecast6',
            },
          ],
        ],
      };

      bot.editMessageReplyMarkup(newKeyboard, {
        chat_id: message.chat.id,
        message_id: message.message_id,
      });
    }
    if (callbackQuery.data === 'qForecast3') {
      getWeather3Hours(process.env.KYIV_LAT, process.env.KYIV_LON).then((res) =>
        bot.sendMessage(chatId, res)
      );
    }
    if (callbackQuery.data === 'qForecast6') {
      getWeather6Hours(process.env.KYIV_LAT, process.env.KYIV_LON).then((res) =>
        bot.sendMessage(chatId, res)
      );
    }
  });

  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const options = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [
            {
              text: 'Forecast in Kyiv',
              callback_data: 'qStart',
            },
          ],
        ],
      }),
    };
    bot.sendMessage(
      chatId,
      'Welcome to Kyiv Weather Forecast!\nClick button to select the option.',
      options
    );
  });
}

module.exports = {
  startBot,
};
