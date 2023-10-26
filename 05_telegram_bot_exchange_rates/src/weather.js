const axios = require('axios');
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

const apiKey = process.env.API_KEY;

const getWeather3Hours = async (lat, lon) => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const data = res.data;

    if (data.cod !== '200') {
      console.log('ERROR cod=' + data.cod + ' message=' + data.message);
      return;
    }
    let weather = 'Kyiv 5/3 days forecast.\n\n';
    data.list.forEach((it) => {
      weather +=
        it.dt_txt.slice(0, -3) +
        '\ntemp=' +
        it.main.temp +
        '°C ' +
        it.weather[0].main +
        '\n' +
        it.weather[0].description +
        '\n\n';
    });
    return weather;
  } catch (err) {
    console.log(err);
  }
};

const getWeather6Hours = async (lat, lon) => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const data = res.data;

    if (data.cod !== '200') {
      console.log('ERROR cod=' + data.cod + ' message=' + data.message);
      return;
    }
    let weather = 'Kyiv 5/6 days forecast.\n\n';
    data.list.forEach((it, index) => {
      if (index % 2 == 0) {
        weather +=
          it.dt_txt.slice(0, -3) +
          '\ntemp=' +
          it.main.temp +
          '°C ' +
          it.weather[0].main +
          '\n' +
          it.weather[0].description +
          '\n\n';
      }
    });
    return weather;
  } catch (err) {
    console.log(err);
  }
};

const getWind3Hours = async (lat, lon) => {
  
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const data = res.data;

    if (data.cod !== '200') {
      console.log('ERROR cod=' + data.cod + ' message=' + data.message);
      return;
    }
    let wind = 'Kyiv 5/3 days WIND forecast.\n\n';
    data.list.forEach((it) => {
      wind +=
        it.dt_txt.slice(0, -3) +
        '\nspeed=' +
        it.wind.speed +
        '\ndeg=' +
        it.wind.deg +
        '\ngust=' +
        it.wind.gust +
        '\n\n';
    });
    return wind;
  } catch (err) {
    console.log(err);
  }
};

const getWind6Hours = async (lat, lon) => {
 
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const data = res.data;

    if (data.cod !== '200') {
      console.log('ERROR cod=' + data.cod + ' message=' + data.message);
      return;
    }
    let wind = 'Kyiv 5/6 days WIND forecast.\n\n';
    data.list.forEach((it, index) => {
      if (index % 2 == 0) {
        wind +=
          it.dt_txt.slice(0, -3) +
          '\nspeed=' +
          it.wind.speed +
          '\ndeg=' +
          it.wind.deg +
          '\ngust=' +
          it.wind.gust +
          '\n\n';
      }
    });
    return wind;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getWeather3Hours,
  getWeather6Hours,
  getWind3Hours,
  getWind6Hours,
};
