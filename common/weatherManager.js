const fetch = require('node-fetch');
const {weatherAPI} = require("../constants/apiKeys");

const weatherURL = new URL('https://api.openweathermap.org/data/2.5/weather');
weatherURL.searchParams.set('id', '625143'); //setting city id of Minsk, which is 625143
weatherURL.searchParams.set('APPID', weatherAPI);  //set apikey
weatherURL.searchParams.set('units', 'metric'); // units converted
weatherURL.searchParams.set('lang', 'ru'); // units converted

const getWeatherData = async () => {
    console.log(weatherURL.toString());
    const resp = await fetch(weatherURL.toString());
    return await resp.json();
}

const generateWeatherMessage = (weatherData) => `Погода в ${weatherData.name}е: ${weatherData.weather[0].description}. Текущая температура ${weatherData.main.temp} градусов.`;


module.exports = { getWeatherData, generateWeatherMessage }
