var path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const { geonames_ } = require('./functions')
const { weatherBits_ } = require('./functions')
const { pixaBay_ } = require('./functions')

const dotenv = require('dotenv');
dotenv.config();

const app = express()

const port = 3000;

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve('src/client/views/index.html'))
})

//post route to add new entry
app.post('/post_location', (req, res) => {
  console.log(req.body)
  geonames_(req.body.location)
    .then((res) => {
      const lat = res.geonames[0].lat || 47.01;
      const long = res.geonames[0].lng || 10.2;
      const country = res.geonames[0].countryName || '';
      console.log("Res ", lat, long, country)

      weatherBits_(lat, long, req.body.date)
      .then((res) => {
        console.log("WeatherBits successful ")
      }).catch((error) => {
        console.log("WeatherBits error ")
      })

      pixaBay_(country)
      .then((res) => {
        const image_url = res.hits[0].largeImageURL
        console.log("Pixabay successful ", image_url)
      }).catch(() => {
        console.log("Pixabay has an error")
      })
    })
  res.send()
})


// designates what port the app will listen to for incoming requests
app.listen(port, function () {
  console.log(`Example app listening on port ${port} !`)
})