const NodeCache = require('node-cache');
const myCache = new NodeCache();

myCache.set('forecastMode', 3); // 3 or 6
myCache.set('saleRate_UAH_USD_Privat', 'Error. Try again in 1 min.');
myCache.set('purchaseRate_UAH_USD_Privat', 'Error. Try again in 1 min.');
myCache.set('saleRate_UAH_USD_Mono', 'Error. Try again in 1 min.');
myCache.set('purchaseRate_UAH_USD_Mono', 'Error. Try again in 1 min.');
myCache.set('saleRate_UAH_EUR_Privat', 'Error. Try again in 1 min.');
myCache.set('purchaseRate_UAH_EUR_Privat', 'Error. Try again in 1 min.');
myCache.set('saleRate_UAH_EUR_Mono', 'Error. Try again in 1 min.');
myCache.set('purchaseRate_UAH_EUR_Mono', 'Error. Try again in 1 min.');

module.exports = myCache;
