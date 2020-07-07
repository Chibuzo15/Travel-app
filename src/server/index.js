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

let projectData = {
  image: null,
  weather: null,
}
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

      //pass values to next chain
      return {
        lat, long, country
      }
    }).then((res) => {
      //return nested promise, In other to get value of weather data
      weatherBits_(res.lat, res.long, req.body.date, res.country)
        .then((res) => {
          console.log("WeatherBits successful ")

          //Add weather data to projectData object
          projectData.weather = res
        }).catch((error) => {
          console.log("WeatherBits error ")
        })

        //pass country to next chain
      return res.country
    }).then((pixa_res) => {
      console.log(pixa_res, "country")
      pixaBay_(pixa_res)
        .then((pixa_res) => {
          const image_url = pixa_res.hits[0].largeImageURL
          console.log("Pixabay successful ", image_url)
          //set projectData image Values
          projectData.image = image_url
          res.send(projectData)
        }).catch((error) => {

          console.log("Pixabay has an error")
          res.send(error)
        })

    }).catch((error) => {
      res.status(400).send(error)
    })

})


// designates what port the app will listen to for incoming requests
app.listen(port, function () {
  console.log(`Example app listening on port ${port} !`)
})