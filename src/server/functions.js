const fetch = require('node-fetch')

const weatherBits_BaseUrl_forecast = 'https://api.weatherbit.io/v2.0/forecast/daily'
const weatherBits_BaseUrl_history = 'https://api.weatherbit.io/v2.0/history/daily'

const geonames_BaseUrl = 'http://api.geonames.org/searchJSON'

const Pixabay_BaseURL = "https://pixabay.com/api/";

const dotenv = require('dotenv');
dotenv.config();

const geonames_ = async (loca) => {
    let location = encodeURI(loca);
    let url = `${geonames_BaseUrl}?q=${location}&maxRows=1&username=${process.env.GEONAMES_USER}`
    console.log('geonames url ', url)

    const response = await fetch(url)

    let data = response.json()
    return data
}

const weatherBits_ = async (lat, long, date) => {
    let url = `${weatherBits_BaseUrl_forecast}?lat=${lat}&lon=${long}&key=${process.env.WEATHER_BIT_KEY}`
    console.log('Weather bits url ', url)

    const response = await fetch(url)
    const data = await response.json()

    //pass country, so as to chain to next promise
    return data
}

const pixaBay_ = async (search) => {
    var search = encodeURI(search);
    let url = `${Pixabay_BaseURL}?key=${process.env.PIXABAY_KEY}&q=${search}`
    console.log("PixaBay url ", url)

    const response = await fetch(url)

    return response.json()
}

module.exports = {
    geonames_,
    weatherBits_,
    pixaBay_
}