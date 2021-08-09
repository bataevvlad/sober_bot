const {botAPI} = require("./constants/apiKeys");
const { Telegraf } = require('telegraf')
const {generateWeatherMessage} = require("./common/weatherManager");
const {getWeatherData} = require("./common/weatherManager");

const bot = new Telegraf(botAPI);

const main = async () => {
    bot.start((ctx) => {
        if (ctx.message.from.language_code === 'ru') {
            ctx.reply(`Привет русскоговорящий юзер по имени ${ctx.message.from.first_name}`)
            ctx.reply('Напиши мне "погода" и узнаешь ее ;)')
        } else {
            ctx.reply(`Welcome ${ctx.message.from.first_name}`)
            ctx.reply('Write "weather" for forecast')
        }
    })

    bot.command('oldschool', (ctx) => ctx.reply('Hello'))

    bot.hears(/погода|Погода|weather|Weather/, async (ctx) => {
        const weatherData = await getWeatherData();
        const weatherString = generateWeatherMessage(weatherData);
        console.log(weatherString);
        ctx.reply(weatherString)
    })

    bot.launch()
}

main();
