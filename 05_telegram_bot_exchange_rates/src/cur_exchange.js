const axios = require('axios');

const today = new Date();

const day = String(today.getDate()).padStart(2, '0'); // Получаем день и добавляем ведущий ноль при необходимости
const month = String(today.getMonth() + 1).padStart(2, '0'); // Получаем месяц с учетом коррекции на 1 и добавляем ведущий ноль при необходимости
const year = today.getFullYear(); // Получаем год

const formattedDate = `${day}.${month}.${year}`;

const getExchangeRatePrivat = async () => {
  try {
    const res = await axios.get(
      `https://api.privatbank.ua/p24api/exchange_rates?json&date=${formattedDate}`
    );
    const data = res.data;
    const saleRate_UAH_USD_Privat = data.exchangeRate.filter(
      (it) => it.currency === 'USD'
    )[0].saleRate;
    const purchaseRate_UAH_USD_Privat = data.exchangeRate.filter(
      (it) => it.currency === 'USD'
    )[0].purchaseRate;

    const saleRate_UAH_EUR_Privat = data.exchangeRate.filter(
      (it) => it.currency === 'EUR'
    )[0].saleRate;
    const purchaseRate_UAH_EUR_Privat = data.exchangeRate.filter(
      (it) => it.currency === 'EUR'
    )[0].purchaseRate;

    return {
      saleRate_UAH_USD_Privat,
      purchaseRate_UAH_USD_Privat,
      saleRate_UAH_EUR_Privat,
      purchaseRate_UAH_EUR_Privat,
    };
  } catch (err) {
    console.log(err);
  }
};

const getExchangeRateMono = async () => {
  try {
    const res = await axios.get('https://api.monobank.ua/bank/currency');
    const data = res.data;
    const saleRate_UAH_USD_Mono = data.filter(
      (it) => it.currencyCodeA === 840
    )[0].rateSell;
    const purchaseRate_UAH_USD_Mono = data.filter(
      (it) => it.currencyCodeA === 840
    )[0].rateBuy;

    const saleRate_UAH_EUR_Mono = data.filter(
      (it) => it.currencyCodeA === 978
    )[0].rateSell;
    const purchaseRate_UAH_EUR_Mono = data.filter(
      (it) => it.currencyCodeA === 978
    )[0].rateBuy;

    return {
      saleRate_UAH_USD_Mono,
      purchaseRate_UAH_USD_Mono,
      saleRate_UAH_EUR_Mono,
      purchaseRate_UAH_EUR_Mono,
    };
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getExchangeRatePrivat, getExchangeRateMono };
