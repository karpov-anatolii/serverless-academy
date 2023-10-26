const TelegramBot = require('node-telegram-bot-api');
const {
  getWeather3Hours,
  getWeather6Hours,
  getWind3Hours,
  getWind6Hours,
} = require('./weather');
const {
  getExchangeRatePrivat,
  getExchangeRateMono,
} = require('./cur_exchange');
const fs = require('fs');
const path = require('path');
const myCache = require('./cache.js');

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

let options1 = {
  reply_markup: JSON.stringify({
    keyboard: [['/Погода'], ['/Курс валют']],
    resize_keyboard: true,
    //one_time_keyboard: true,
  }),
};

let options2 = {
  reply_markup: JSON.stringify({
    keyboard: [
      ['Кожні 3 години', 'Кожні 6 годин'],
      ['Вітер'],
      ['Попереднє меню'],
    ],
    resize_keyboard: true,
  }),
};

let options3 = {
  reply_markup: JSON.stringify({
    keyboard: [['USD', 'EUR'], ['Попереднє меню']],
    resize_keyboard: true,
  }),
};

function startBot(str) {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Вибиріть варіант:', options1);
  });

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const choice = msg.text;

    if (choice === 'Попереднє меню') {
      bot.sendMessage(chatId, 'Ви вибрали: ' + choice, options1);
    }
    if (choice === '/Погода') {
      bot.sendMessage(chatId, 'Ви вибрали: ' + choice, options2);
    }
    if (choice === 'Кожні 3 години') {
      myCache.set('forecastMode', 3);
      getWeather3Hours(process.env.KYIV_LAT, process.env.KYIV_LON).then((res) =>
        bot.sendMessage(chatId, res)
      );
    }
    if (choice === 'Кожні 6 годин') {
      myCache.set('forecastMode', 6);
      getWeather6Hours(process.env.KYIV_LAT, process.env.KYIV_LON).then((res) =>
        bot.sendMessage(chatId, res)
      );
    }
    if (choice === 'Вітер') {
      console.log('forecastMode=', myCache.get('forecastMode'));
      if (myCache.get('forecastMode') == 3) {
        getWind3Hours(process.env.KYIV_LAT, process.env.KYIV_LON).then((res) =>
          bot.sendMessage(chatId, res)
        );
      }
      if (myCache.get('forecastMode') == 6) {
        getWind6Hours(process.env.KYIV_LAT, process.env.KYIV_LON).then((res) =>
          bot.sendMessage(chatId, res)
        );
      }
    }
    if (choice === '/Курс валют') {
      bot.sendMessage(chatId, 'Вы выбрали: ' + choice, options3);
    }

    if (choice === 'USD') {
      getExchangeRatePrivat().then((res) => {
        if (res) {
          myCache.set('saleRate_UAH_USD_Privat', res.saleRate_UAH_USD_Privat);
          myCache.set(
            'purchaseRate_UAH_USD_Privat',
            res.purchaseRate_UAH_USD_Privat
          );
        }
        getExchangeRateMono().then((res) => {
          if (res) {
            myCache.set('saleRate_UAH_USD_Mono', res.saleRate_UAH_USD_Mono);
            myCache.set(
              'purchaseRate_UAH_USD_Mono',
              res.purchaseRate_UAH_USD_Mono
            );
          }

          bot.sendMessage(
            chatId,
            `USD 
          ПриватБанк
          Купівля:${myCache.get('purchaseRate_UAH_USD_Privat')}
          Продаж:${myCache.get('saleRate_UAH_USD_Privat')}
          
          МоноБанк
          Купівля:${myCache.get('purchaseRate_UAH_USD_Mono')}
          Продаж:${myCache.get('saleRate_UAH_USD_Mono')}
          `
          );
        });
      });
    }

    if (choice === 'EUR') {
      getExchangeRatePrivat().then((res) => {
        if (res) {
          myCache.set('saleRate_UAH_EUR_Privat', res.saleRate_UAH_EUR_Privat);
          myCache.set(
            'purchaseRate_UAH_EUR_Privat',
            res.purchaseRate_UAH_EUR_Privat
          );
        }
        getExchangeRateMono().then((res) => {
          if (res) {
            myCache.set('saleRate_UAH_EUR_Mono', res.saleRate_UAH_EUR_Mono);
            myCache.set(
              'purchaseRate_UAH_EUR_Mono',
              res.purchaseRate_UAH_EUR_Mono
            );
          }

          bot.sendMessage(
            chatId,
            `EUR 
          ПриватБанк
          Купівля:${myCache.get('purchaseRate_UAH_EUR_Privat')}
          Продаж:${myCache.get('saleRate_UAH_EUR_Privat')}
          
          МоноБанк
          Купівля:${myCache.get('purchaseRate_UAH_EUR_Mono')}
          Продаж:${myCache.get('saleRate_UAH_EUR_Mono')}
          `
          );
        });
      });
    }
  });
}

module.exports = {
  startBot,
};
